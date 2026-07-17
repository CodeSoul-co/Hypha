import { describe, expect, it, vi } from 'vitest';
import type {
  RuntimeActivityPort,
  RuntimeActivityRequest,
  RuntimeActivityResult,
} from '../../contracts/runtime';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { EventSourcedRunManager } from './run-manager';
import { EventSourcedActivityRuntime } from './activity-runtime';
import { RuntimeActivityWorker } from './activity-worker';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

const activityRequest: RuntimeActivityRequest = {
  activityId: 'activity.tool.example',
  activityType: 'tool',
  runId: scope.runId,
  sessionId: 'session.example',
  stateAttemptId: 'state-attempt.example.1',
  operationId: 'operation.tool.example',
  idempotencyKey: 'idempotency.tool.example',
  fencingToken: 1,
  input: { value: 1 },
};

describe('RuntimeActivityWorker', () => {
  it('persists started before execution and never repeats a terminal Activity', async () => {
    const execute = vi.fn(async () => completedResult());
    const fixture = await runtimeFixture(port({ execute }));

    const first = await fixture.worker.dispatch(workerRequest('dispatch-completed'));
    const repeated = await fixture.worker.dispatch(workerRequest('dispatch-repeated'));

    expect(first).toMatchObject({ action: 'executed', activity: { status: 'completed' } });
    expect(first.appends.map((append) => append.events.map((event) => event.type))).toEqual([
      ['runtime.activity.started'],
      ['runtime.activity.completed'],
    ]);
    expect(repeated).toMatchObject({ action: 'already_terminal', appends: [] });
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it('reconciles after an execution crash instead of repeating the external call', async () => {
    const execute = vi.fn(async () => {
      throw new Error('connection lost after provider accepted request');
    });
    const reconcile = vi.fn(async () => completedResult());
    const fixture = await runtimeFixture(port({ execute, reconcile }));

    await expect(fixture.worker.dispatch(workerRequest('dispatch-crash'))).rejects.toThrow(
      'connection lost'
    );
    await expect(fixture.activities.get(scope, activityRequest.activityId)).resolves.toMatchObject({
      status: 'running',
    });

    const recovered = await fixture.worker.dispatch(workerRequest('dispatch-recovery'));

    expect(recovered).toMatchObject({
      action: 'reconciled',
      disposition: 'applied',
      activity: { status: 'completed' },
    });
    expect(execute).toHaveBeenCalledTimes(1);
    expect(reconcile).toHaveBeenCalledTimes(1);
  });

  it('persists cancellation intent before calling the external Port', async () => {
    const holder: { fixture?: Awaited<ReturnType<typeof runtimeFixture>> } = {};
    const cancel = vi.fn(async () => {
      const current = holder.fixture;
      if (!current) throw new Error('Runtime fixture is not initialized.');
      await expect(
        current.activities.get(scope, activityRequest.activityId)
      ).resolves.toMatchObject({
        status: 'cancelling',
        cancellationReason: 'parent_run_cancelled',
      });
    });
    const reconcile = vi.fn(async () => ({
      activityId: activityRequest.activityId,
      status: 'cancelled' as const,
      eventIds: ['event.provider.cancelled'],
    }));
    const fixture = await runtimeFixture(port({ cancel, reconcile }));
    holder.fixture = fixture;

    const cancelled = await fixture.worker.cancel(
      workerRequest('cancel-activity'),
      'parent_run_cancelled'
    );

    expect(cancelled).toMatchObject({
      action: 'cancellation_dispatched',
      disposition: 'applied',
      activity: { status: 'cancelled' },
    });
    expect(cancelled.appends.map((append) => append.events.map((event) => event.type))).toEqual([
      ['runtime.activity.cancellation.requested'],
      ['runtime.activity.reconciled', 'runtime.activity.cancelled'],
    ]);
    expect(cancel).toHaveBeenCalledWith(activityRequest.activityId, 'parent_run_cancelled');
  });

  it('records an unresolved external operation when cancellation exceeds its grace period', async () => {
    const cancel = vi.fn(() => new Promise<void>(() => undefined));
    const fixture = await runtimeFixture(port({ cancel }), 1);

    const result = await fixture.worker.cancel(
      workerRequest('cancel-unresponsive-activity'),
      'parent_run_cancelled'
    );

    expect(result).toMatchObject({
      action: 'cancellation_dispatched',
      disposition: 'waiting',
      unresolvedExternalOperation: true,
      activity: {
        status: 'cancelling',
        cancellationUnresolvedReason: 'cancellation_grace_exceeded',
        cancellationGraceMs: 1,
      },
    });
    expect(result.appends.map((append) => append.events.map((event) => event.type))).toEqual([
      ['runtime.activity.cancellation.requested'],
      ['runtime.activity.cancellation.unresolved'],
    ]);
  });
});

async function runtimeFixture(activityPort: RuntimeActivityPort, cancellationGraceMs?: number) {
  const events = new DurableEventRuntime({
    store: new InMemoryEventStoreV2({ now: () => '2026-07-17T10:00:00.000Z' }),
  });
  const runs = new EventSourcedRunManager({
    events,
    now: () => '2026-07-17T10:00:01.000Z',
  });
  await runs.create({
    ...command(0, 0, 'run-create'),
    sessionId: activityRequest.sessionId,
    workflowRef: { id: 'workflow.example', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.example',
    processHash: 'sha256:process-example',
    input: {},
  });
  await runs.start(command(1, 1, 'run-start'));
  const activities = new EventSourcedActivityRuntime({
    events,
    ports: { tool: activityPort },
    now: () => '2026-07-17T10:00:02.000Z',
  });
  await activities.request({
    ...command(2, 2, 'activity-request'),
    activity: activityRequest,
    effect: 'external_effect',
  });
  return {
    activities,
    worker: new RuntimeActivityWorker({
      events,
      activities,
      ports: { tool: activityPort },
      ...(cancellationGraceMs === undefined ? {} : { cancellationGraceMs }),
    }),
  };
}

function port(overrides: Partial<RuntimeActivityPort> = {}): RuntimeActivityPort {
  return {
    execute: vi.fn(async () => completedResult()),
    cancel: vi.fn(async () => undefined),
    reconcile: vi.fn(async () => ({
      activityId: activityRequest.activityId,
      status: 'unknown' as const,
      eventIds: [],
    })),
    ...overrides,
  };
}

function completedResult(): RuntimeActivityResult {
  return {
    activityId: activityRequest.activityId,
    status: 'completed',
    output: { ok: true },
    eventIds: ['event.provider.completed'],
  };
}

function workerRequest(name: string) {
  return {
    scope,
    activityId: activityRequest.activityId,
    fencingToken: 1,
    operationId: `operation.worker.${name}`,
    idempotencyKey: `idempotency.worker.${name}`,
  };
}

function command(expectedLastSequence: number, expectedRunRevision: number, name: string) {
  return {
    scope,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    operationId: `operation.${name}`,
    idempotencyKey: `idempotency.${name}`,
  };
}
