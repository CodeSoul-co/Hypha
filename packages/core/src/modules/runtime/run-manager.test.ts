import { describe, expect, it, vi } from 'vitest';
import type { RuntimePrincipal } from '../../contracts/runtime';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import {
  EventSourcedRunManager,
  type CreateRuntimeRunRequest,
  type EventSourcedRunManagerOptions,
  type RuntimeRunCommand,
} from './run-manager';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

const principal: RuntimePrincipal = {
  principalId: 'user.example',
  type: 'user',
  tenantId: scope.tenantId,
  userId: scope.userId,
  permissionScopes: ['runtime:signal'],
};

function fixture(options: Omit<EventSourcedRunManagerOptions, 'events'> = {}) {
  const store = new InMemoryEventStoreV2({ now: () => '2026-07-17T02:00:00.000Z' });
  const events = new DurableEventRuntime({
    store,
    now: () => '2026-07-17T02:00:00.000Z',
  });
  const manager = new EventSourcedRunManager({
    now: () => '2026-07-17T01:00:00.000Z',
    ...options,
    events,
  });
  return { events, manager, store };
}

function command(
  expectedLastSequence: number,
  expectedRunRevision: number,
  name: string
): RuntimeRunCommand {
  return {
    scope,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

function createRequest(): CreateRuntimeRunRequest {
  return {
    ...command(0, 0, 'create'),
    sessionId: 'session.example',
    workflowRef: { id: 'workflow.example', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.example',
    processHash: 'sha256:process',
    input: { objective: 'Build a study plan' },
  };
}

async function createAndStart(manager: EventSourcedRunManager): Promise<void> {
  await manager.create(createRequest());
  await manager.start(command(1, 1, 'start'));
}

describe('EventSourcedRunManager', () => {
  it('creates and reuses a Run without duplicating its event', async () => {
    const { manager, store } = fixture();
    const request = createRequest();

    const created = await manager.create(request);
    const reused = await manager.create(request);

    expect(created.append).toMatchObject({ runRevision: 1, lastSequence: 1, reused: false });
    expect(created.run).toMatchObject({ status: 'created', revision: 1 });
    expect(reused.append.reused).toBe(true);
    await expect(store.readStream(scope)).resolves.toHaveLength(1);
  });

  it('increments revision once per atomic pause and resume command', async () => {
    const { manager, store } = fixture();
    await createAndStart(manager);

    const paused = await manager.pause({ ...command(2, 2, 'pause'), reason: 'operator review' });
    const resumed = await manager.resume({ ...command(4, 3, 'resume'), reason: 'approved' });

    expect(paused.append.events.map((event) => event.type)).toEqual(['run.pausing', 'run.paused']);
    expect(paused.run).toMatchObject({ status: 'paused', revision: 3 });
    expect(resumed.run).toMatchObject({ status: 'running', revision: 4 });
    await expect(store.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 6,
      runRevision: 4,
    });
  });

  it('resolves an authorized signal wait and resumes atomically', async () => {
    const { manager, store } = fixture({
      validateSignalPayload: (payload, schema) => {
        expect(payload).toEqual({ approved: true });
        expect(schema).toEqual({ type: 'object' });
      },
    });
    await createAndStart(manager);
    const waiting = await manager.wait({
      ...command(2, 2, 'wait-signal'),
      waitId: 'wait.signal.1',
      stateId: 'AwaitApproval',
      wait: {
        type: 'signal',
        key: 'approval.received',
        expectedSchema: { type: 'object' },
        expiresAt: '2026-07-18T01:00:00.000Z',
      },
    });

    expect(waiting.run).toMatchObject({ status: 'waiting_signal', revision: 3 });
    const signal = {
      signalId: 'signal.1',
      runId: scope.runId,
      key: 'approval.received',
      payload: { approved: true },
      principal,
      sentAt: '2026-07-17T01:30:00.000Z',
    };
    const signalled = await manager.signal({
      ...command(4, 3, 'signal'),
      waitId: 'wait.signal.1',
      signal,
    });

    expect(signalled.run).toMatchObject({ status: 'running', revision: 4 });
    await expect(manager.getPendingWait(scope)).resolves.toBeNull();
    const duplicate = await manager.signal({
      ...command(7, 4, 'signal-duplicate'),
      waitId: 'wait.signal.1',
      signal,
    });
    expect(duplicate.append.events).toMatchObject([{ type: 'runtime.signal.duplicate' }]);
    expect(duplicate.run).toMatchObject({ status: 'running', revision: 5 });
    await expect(store.readStream(scope)).resolves.toHaveLength(8);
  });

  it('rejects unauthorized and expired signals without appending events', async () => {
    const { manager, store } = fixture();
    await createAndStart(manager);
    await manager.wait({
      ...command(2, 2, 'wait-signal'),
      waitId: 'wait.signal.1',
      stateId: 'AwaitApproval',
      wait: {
        type: 'signal',
        key: 'approval.received',
        expiresAt: '2026-07-17T01:15:00.000Z',
      },
    });
    const unauthorized = { ...principal, permissionScopes: [] };

    await expect(
      manager.signal({
        ...command(4, 3, 'signal-unauthorized'),
        waitId: 'wait.signal.1',
        signal: {
          signalId: 'signal.unauthorized',
          runId: scope.runId,
          key: 'approval.received',
          payload: {},
          principal: unauthorized,
          sentAt: '2026-07-17T01:10:00.000Z',
        },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_INVALID' });
    await expect(
      manager.signal({
        ...command(4, 3, 'signal-expired'),
        waitId: 'wait.signal.1',
        signal: {
          signalId: 'signal.expired',
          runId: scope.runId,
          key: 'approval.received',
          payload: {},
          principal,
          sentAt: '2026-07-17T01:16:00.000Z',
        },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_EXPIRED' });
    await expect(store.readStream(scope)).resolves.toHaveLength(4);
  });

  it('fires a durable timer only after its due time', async () => {
    const { manager, store } = fixture();
    await createAndStart(manager);
    await manager.wait({
      ...command(2, 2, 'wait-timer'),
      waitId: 'wait.timer.1',
      stateId: 'CoolingDown',
      wait: { type: 'timer', expiresAt: '2026-07-17T01:30:00.000Z' },
    });

    await expect(
      manager.fireTimer({
        ...command(5, 3, 'timer-early'),
        waitId: 'wait.timer.1',
        firedAt: '2026-07-17T01:29:59.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_INVALID' });
    const fired = await manager.fireTimer({
      ...command(5, 3, 'timer-fire'),
      waitId: 'wait.timer.1',
      firedAt: '2026-07-17T01:30:00.000Z',
    });

    expect(fired.run).toMatchObject({ status: 'running', revision: 4 });
    await expect(store.readStream(scope)).resolves.toHaveLength(8);
  });

  it('expires a wait into its deterministic timeout transition', async () => {
    const { manager, store } = fixture();
    await createAndStart(manager);
    await manager.wait({
      ...command(2, 2, 'wait-expiring-signal'),
      waitId: 'wait.signal.expiring',
      stateId: 'AwaitApproval',
      wait: {
        type: 'signal',
        key: 'approval.received',
        expiresAt: '2026-07-17T01:30:00.000Z',
        timeoutTransitionId: 'transition.approval-timeout',
      },
    });

    await expect(
      manager.expireWait({
        ...command(4, 3, 'expire-early'),
        waitId: 'wait.signal.expiring',
        expiredAt: '2026-07-17T01:29:59.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_INVALID' });
    const expired = await manager.expireWait({
      ...command(4, 3, 'expire-due'),
      waitId: 'wait.signal.expiring',
      expiredAt: '2026-07-17T01:30:00.000Z',
    });

    expect(expired.append.events).toMatchObject([
      { type: 'runtime.wait.expired' },
      {
        type: 'run.resumed',
        payload: { timeoutTransitionId: 'transition.approval-timeout' },
      },
    ]);
    expect(expired.run).toMatchObject({ status: 'running', revision: 4 });
    await expect(store.readStream(scope)).resolves.toHaveLength(6);
  });

  it('moves an expired wait without a timeout route into timed_out', async () => {
    const { manager } = fixture();
    await createAndStart(manager);
    await manager.wait({
      ...command(2, 2, 'wait-expiring-external'),
      waitId: 'wait.external.expiring',
      stateId: 'ExternalOperation',
      wait: {
        type: 'external_operation',
        expiresAt: '2026-07-17T01:30:00.000Z',
      },
    });

    const expired = await manager.expireWait({
      ...command(4, 3, 'expire-external'),
      waitId: 'wait.external.expiring',
      expiredAt: '2026-07-17T01:30:00.000Z',
      terminalState: 'ExternalOperationTimedOut',
    });

    expect(expired.run).toMatchObject({
      status: 'timed_out',
      revision: 4,
      terminalState: 'ExternalOperationTimedOut',
      completedAt: '2026-07-17T01:30:00.000Z',
    });
    await expect(manager.getPendingWait(scope)).resolves.toBeNull();
  });

  it('persists cancellation intent before external abort and finalizes pending waits', async () => {
    const onCancelRequested = vi.fn().mockRejectedValueOnce(new Error('abort unavailable'));
    const { manager, store } = fixture({ onCancelRequested });
    await createAndStart(manager);
    await manager.wait({
      ...command(2, 2, 'wait-signal'),
      waitId: 'wait.signal.1',
      stateId: 'AwaitApproval',
      wait: { type: 'signal', key: 'approval.received' },
    });
    const cancellation = {
      ...command(4, 3, 'cancel-request'),
      reason: 'user requested cancellation',
    };

    await expect(manager.requestCancellation(cancellation)).rejects.toThrow(/abort unavailable/u);
    await expect(manager.get(scope)).resolves.toMatchObject({
      status: 'cancelling',
      revision: 4,
      cancelReason: cancellation.reason,
    });
    const retried = await manager.requestCancellation(cancellation);
    expect(retried.append.reused).toBe(true);
    expect(onCancelRequested).toHaveBeenCalledTimes(2);

    const cancelled = await manager.finalizeCancellation({
      ...command(6, 4, 'cancel-finalize'),
      terminalState: 'Cancelled',
      unresolvedActivityRefs: ['activity.tool.unresponsive'],
    });
    expect(cancelled.run).toMatchObject({ status: 'cancelled', revision: 5 });
    expect(cancelled.append.events.at(-1)?.payload).toMatchObject({
      terminalState: 'Cancelled',
      unresolvedActivityRefs: ['activity.tool.unresponsive'],
    });
    await expect(manager.getPendingWait(scope)).resolves.toBeNull();
    await expect(store.readStream(scope)).resolves.toHaveLength(8);
  });

  it('detects lifecycle events appended after a terminal Run', async () => {
    const { manager, store } = fixture();
    await createAndStart(manager);
    await manager.complete({
      ...command(2, 2, 'complete'),
      terminalState: 'Completed',
      output: { ok: true },
    });
    await store.append({
      scope,
      events: [
        {
          id: 'event.invalid.after-terminal',
          type: 'run.paused',
          runId: scope.runId,
          operationId: 'operation.invalid',
          timestamp: '2026-07-17T03:00:00.000Z',
          payload: {},
        },
      ],
      expectedLastSequence: 3,
      expectedRunRevision: 3,
      fencingToken: 1,
      idempotencyKey: 'idempotency.invalid-after-terminal',
    });

    await expect(manager.get(scope)).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
    });
  });
});
