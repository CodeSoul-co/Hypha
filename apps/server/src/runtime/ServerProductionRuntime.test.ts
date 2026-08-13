import { defaultReActFSMProcessSpec } from '@codesoul-co/fsm';
import type { InferenceProvider } from '@codesoul-co/inference';
import type { ToolRunner } from '@codesoul-co/tools';
import { createServerProductionRuntime } from './ServerProductionRuntime';

describe('ServerProductionRuntime', () => {
  it('binds configured durable workers to the Server execution adapters', () => {
    const inference = { id: 'inference.test', infer: jest.fn() } as InferenceProvider;
    const toolRunner = { run: jest.fn() } as ToolRunner;
    const cancellations = { cancel: jest.fn() };

    const product = createServerProductionRuntime({
      inference,
      toolRunner,
      fsmSpec: defaultReActFSMProcessSpec,
      workerId: 'runtime.node.1',
      leaseTtlMs: 30_000,
      pageLimit: 50,
      timerPollIntervalMs: 1_000,
      timerErrorBackoffMs: 5_000,
      recoveryPollIntervalMs: 2_000,
      recoveryErrorBackoffMs: 10_000,
      autoRecoverReasons: ['PROJECTION_BEHIND'],
      cancellations,
    });

    expect(product.execution).toMatchObject({
      inference,
      toolRunner,
      fsmSpec: defaultReActFSMProcessSpec,
      recoveryCancellations: cancellations,
    });
    expect(product.workers).toEqual({
      timer: {
        ownerId: 'runtime.node.1:timer',
        leaseTtlMs: 30_000,
        pageLimit: 50,
        pollIntervalMs: 1_000,
        errorBackoffMs: 5_000,
      },
      recovery: {
        ownerId: 'runtime.node.1:recovery',
        leaseTtlMs: 30_000,
        pageLimit: 50,
        pollIntervalMs: 2_000,
        errorBackoffMs: 10_000,
        autoRecoverReasons: ['PROJECTION_BEHIND'],
      },
    });
  });

  it('treats unbound side-effect recovery as unknown and fails retries closed', async () => {
    const product = createServerProductionRuntime({
      inference: { id: 'inference.test', infer: jest.fn() } as InferenceProvider,
      toolRunner: { run: jest.fn() } as ToolRunner,
      fsmSpec: defaultReActFSMProcessSpec,
      workerId: 'runtime.node.1',
      leaseTtlMs: 30_000,
      pageLimit: 50,
      timerPollIntervalMs: 1_000,
      timerErrorBackoffMs: 5_000,
      recoveryPollIntervalMs: 2_000,
      recoveryErrorBackoffMs: 10_000,
      autoRecoverReasons: ['PROJECTION_BEHIND'],
      cancellations: { cancel: jest.fn() },
    });
    const invocation = {
      activityId: 'activity.1',
      operationId: 'operation.1',
      activityType: 'tool' as const,
      target: 'tool.1',
      input: {},
      scope: {
        userId: 'user.1',
        sessionId: 'session.1',
        runId: 'run.1',
      },
      stateId: 'Acting',
      stateAttempt: 1,
      fencingToken: 1,
      correlationId: 'correlation.1',
      idempotencyKey: 'activity.1',
      requestedAt: '2026-08-01T00:00:00.000Z',
      effect: 'external_effect' as const,
    };

    await expect(
      product.execution.recoveryActivities.reconcile({
        invocation,
        checkedAt: '2026-08-01T00:00:01.000Z',
        idempotencyKey: 'reconcile.1',
      })
    ).resolves.toEqual({ activityId: 'activity.1', status: 'unknown' });
    await expect(
      product.execution.recoveryActivities.retry({
        invocation,
        checkedAt: '2026-08-01T00:00:01.000Z',
        idempotencyKey: 'retry.1',
        fencingToken: 2,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE' });
  });
});
