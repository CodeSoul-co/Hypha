import { describe, expect, it, vi } from 'vitest';
import type { RuntimeActivityRequest, RuntimeActivityResult } from '@hypha/core';
import { InferenceManager } from './manager';
import { ModelRuntimeActivityPort, type ModelRuntimeActivityInput } from './runtime-activity-port';
import type { InferenceProvider, InferenceResponse } from './types';

const request: RuntimeActivityRequest<ModelRuntimeActivityInput<{ prompt: string }>> = {
  activityId: 'activity.model.plan',
  activityType: 'model',
  runId: 'run.example',
  sessionId: 'session.example',
  stateAttemptId: 'state-attempt.plan.1',
  operationId: 'operation.model.plan',
  idempotencyKey: 'idempotency.model.plan',
  fencingToken: 4,
  correlationId: 'correlation.example',
  causationId: 'event.state.entered',
  input: {
    providerId: 'provider.fixture',
    request: {
      modelAlias: 'model.fixture',
      input: { prompt: 'plan' },
      metadata: { source: 'runtime-port-test' },
    },
  },
};

describe('ModelRuntimeActivityPort', () => {
  it('delegates inference with Runtime-owned identity and returns a completed Activity result', async () => {
    const infer = vi.fn<InferenceProvider['infer']>(async (input) => ({
      id: 'response.fixture',
      output: { answer: input.input },
    }));
    const manager = new InferenceManager();
    manager.register({ id: request.input.providerId, infer });
    const port = new ModelRuntimeActivityPort({
      manager,
      eventIds: () => ['event.model.completed'],
    });

    await expect(port.execute(request)).resolves.toMatchObject({
      activityId: request.activityId,
      status: 'completed',
      output: { id: 'response.fixture' },
      eventIds: ['event.model.completed'],
    });
    expect(infer).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: request.runId,
        sessionId: request.sessionId,
        stepId: request.stateAttemptId,
        metadata: expect.objectContaining({
          runtimeActivityId: request.activityId,
          runtimeOperationId: request.operationId,
          runtimeIdempotencyKey: request.idempotencyKey,
          runtimeFencingToken: request.fencingToken,
        }),
      })
    );
  });

  it('does not repeat inference during reconciliation and delegates explicit cancellation', async () => {
    const infer = vi.fn<InferenceProvider['infer']>();
    const manager = new InferenceManager();
    manager.register({ id: request.input.providerId, infer });
    const cancel = vi.fn(async () => undefined);
    const port = new ModelRuntimeActivityPort({ manager, cancel });

    await expect(port.reconcile(request.activityId)).resolves.toEqual({
      activityId: request.activityId,
      status: 'unknown',
      eventIds: [],
    });
    await port.cancel(request.activityId, 'run_cancelled');

    expect(infer).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledWith(request.activityId, 'run_cancelled');
  });

  it('uses the configured durable reconciler result', async () => {
    const manager = new InferenceManager();
    const reconciled: RuntimeActivityResult<InferenceResponse> = {
      activityId: request.activityId,
      status: 'completed',
      output: { id: 'response.reconciled', output: { answer: 'stable' } },
      eventIds: ['event.provider.completed'],
    };
    const reconcile = vi.fn(async () => reconciled);
    const port = new ModelRuntimeActivityPort({ manager, reconciler: { reconcile } });

    await expect(port.reconcile(request.activityId)).resolves.toEqual(reconciled);
    expect(reconcile).toHaveBeenCalledWith(request.activityId);
  });
});
