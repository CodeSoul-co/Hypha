import { describe, expect, it, vi } from 'vitest';
import type { RuntimeActivityPort, RuntimeActivityRequest } from '../../contracts/runtime';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { DurableEventRuntime } from './event-runtime';
import { EventSourcedActivityRuntime } from './activity-runtime';
import { EventSourcedRunManager } from './run-manager';

const scope: EventStreamScope = {
  tenantId: 'tenant.activity',
  userId: 'user.activity',
  runId: 'run.activity',
};

function command(expectedLastSequence: number, expectedRunRevision: number, name: string) {
  return {
    scope,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

async function fixture(reconcileResult: Awaited<ReturnType<RuntimeActivityPort['reconcile']>>) {
  const store = new InMemoryEventStoreV2();
  const events = new DurableEventRuntime({ store });
  const runs = new EventSourcedRunManager({ events });
  await runs.create({
    ...command(0, 0, 'run-create'),
    sessionId: 'session.activity',
    workflowRef: { id: 'workflow.activity', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.activity',
    processHash: 'sha256:process-activity',
    input: {},
  });
  await runs.start(command(1, 1, 'run-start'));
  const port: RuntimeActivityPort = {
    execute: vi.fn(),
    cancel: vi.fn(),
    reconcile: vi.fn().mockResolvedValue(reconcileResult),
  };
  const runtime = new EventSourcedActivityRuntime({
    events,
    ports: { tool: port },
    now: () => '2026-07-17T10:00:00.000Z',
  });
  const activity: RuntimeActivityRequest = {
    activityId: 'activity.tool.1',
    activityType: 'tool',
    runId: scope.runId,
    sessionId: 'session.activity',
    stateAttemptId: 'attempt.1',
    operationId: 'activity.operation.1',
    input: { query: 'runtime' },
    idempotencyKey: 'activity.tool.1',
    fencingToken: 1,
  };
  return { activity, port, runtime, runs, store };
}

async function requestAndStart(
  runtime: EventSourcedActivityRuntime,
  activity: RuntimeActivityRequest,
  effect: 'idempotent' | 'external_effect'
) {
  await runtime.request({ ...command(2, 2, 'activity-request'), activity, effect });
  return runtime.markStarted({
    ...command(3, 3, 'activity-start'),
    activityId: activity.activityId,
  });
}

describe('EventSourcedActivityRuntime', () => {
  it('reconciles a stable completed result into the Event stream', async () => {
    const completed = {
      activityId: 'activity.tool.1',
      status: 'completed' as const,
      output: { result: 'done' },
      eventIds: ['provider.event.completed'],
    };
    const { activity, port, runtime, runs, store } = await fixture(completed);
    await requestAndStart(runtime, activity, 'external_effect');

    const reconciled = await runtime.reconcile({
      ...command(4, 4, 'activity-reconcile'),
      activityId: activity.activityId,
    });

    expect(reconciled.disposition).toBe('applied');
    expect(reconciled.append.events.map((event) => event.type)).toEqual([
      'runtime.activity.reconciled',
      'runtime.activity.completed',
    ]);
    expect(reconciled.activity).toMatchObject({
      status: 'completed',
      result: completed,
      completedAt: '2026-07-17T10:00:00.000Z',
    });
    expect(port.reconcile).toHaveBeenCalledWith(activity.activityId);
    await expect(runs.get(scope)).resolves.toMatchObject({ revision: 5 });
    await expect(store.readStream(scope)).resolves.toHaveLength(6);
  });

  it('requires manual review when an external side effect is unknown', async () => {
    const { activity, runtime } = await fixture({
      activityId: 'activity.tool.1',
      status: 'unknown',
      eventIds: ['provider.event.unknown'],
    });
    await requestAndStart(runtime, activity, 'external_effect');

    const reconciled = await runtime.reconcile({
      ...command(4, 4, 'activity-reconcile-unknown'),
      activityId: activity.activityId,
    });

    expect(reconciled).toMatchObject({
      disposition: 'manual_review',
      activity: {
        status: 'manual_review',
        reconciliationReason: 'external_state_unknown',
      },
    });
    expect(reconciled.append.events.map((event) => event.type)).toEqual([
      'runtime.activity.reconciled',
      'runtime.activity.reconciliation.required',
    ]);
  });

  it('marks an unknown idempotent Activity as safe to retry without executing it', async () => {
    const { activity, port, runtime } = await fixture({
      activityId: 'activity.tool.1',
      status: 'unknown',
      eventIds: [],
    });
    await requestAndStart(runtime, activity, 'idempotent');

    const reconciled = await runtime.reconcile({
      ...command(4, 4, 'activity-reconcile-safe-retry'),
      activityId: activity.activityId,
    });

    expect(reconciled).toMatchObject({
      disposition: 'safe_retry',
      activity: { status: 'running', reconciliationReason: 'external_state_unknown' },
    });
    expect(port.execute).not.toHaveBeenCalled();
  });

  it('reuses an identical Activity result append', async () => {
    const result = {
      activityId: 'activity.tool.1',
      status: 'completed' as const,
      output: { ok: true },
      eventIds: ['provider.completed'],
    };
    const { activity, runtime, store } = await fixture(result);
    await requestAndStart(runtime, activity, 'idempotent');
    const commandInput = {
      ...command(4, 4, 'activity-result'),
      activityId: activity.activityId,
    };

    const first = await runtime.applyResult(commandInput, result);
    const reused = await runtime.applyResult(commandInput, result);

    expect(first.append.reused).toBe(false);
    expect(reused.append.reused).toBe(true);
    await expect(store.readStream(scope)).resolves.toHaveLength(5);
  });

  it('omits undefined optional Activity result fields before persistence', async () => {
    const result = {
      activityId: 'activity.tool.1',
      status: 'completed' as const,
      output: { ok: true },
      artifactRefs: undefined,
      retryable: undefined,
      error: undefined,
      eventIds: [],
    };
    const { activity, runtime } = await fixture(result);
    await requestAndStart(runtime, activity, 'idempotent');

    const committed = await runtime.applyResult(
      {
        ...command(4, 4, 'activity-result-with-undefined'),
        activityId: activity.activityId,
      },
      result
    );

    expect(committed.append.events[0].payload).toEqual({
      activityId: activity.activityId,
      result: {
        activityId: activity.activityId,
        status: 'completed',
        output: { ok: true },
        eventIds: [],
      },
    });
  });
});
