import {
  FrameworkError,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
} from '@hypha/core';
import type { InferenceManager } from './manager';
import type { InferenceRequest, InferenceResponse } from './types';

export interface ModelRuntimeActivityInput<TInput = unknown> {
  providerId: string;
  request: Omit<InferenceRequest<TInput>, 'runId' | 'stepId' | 'sessionId'>;
}

export interface ModelRuntimeActivityReconciler<TOutput = unknown> {
  reconcile(activityId: string): Promise<RuntimeActivityResult<InferenceResponse<TOutput>>>;
}

export interface ModelRuntimeActivityPortOptions<TOutput = unknown> {
  manager: InferenceManager;
  cancel?: (activityId: string, reason?: string) => Promise<void>;
  reconciler?: ModelRuntimeActivityReconciler<TOutput>;
  eventIds?: (activityId: string) => readonly string[] | Promise<readonly string[]>;
}

export class ModelRuntimeActivityPort<
  TInput = unknown,
  TOutput = unknown,
> implements RuntimeActivityPort<ModelRuntimeActivityInput<TInput>, InferenceResponse<TOutput>> {
  constructor(private readonly options: ModelRuntimeActivityPortOptions<TOutput>) {}

  async execute(
    request: RuntimeActivityRequest<ModelRuntimeActivityInput<TInput>>
  ): Promise<RuntimeActivityResult<InferenceResponse<TOutput>>> {
    validateRequest(request);
    const response = (await this.options.manager.infer(
      request.input.providerId,
      toInferenceRequest(request)
    )) as InferenceResponse<TOutput>;
    return {
      activityId: request.activityId,
      status: 'completed',
      output: response,
      eventIds: await this.eventIds(request.activityId),
    };
  }

  async cancel(activityId: string, reason?: string): Promise<void> {
    required(activityId, 'activityId');
    if (!this.options.cancel) {
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: 'The configured InferenceManager does not expose model cancellation.',
        context: { activityId },
      });
    }
    await this.options.cancel(activityId, reason);
  }

  async reconcile(activityId: string): Promise<RuntimeActivityResult<InferenceResponse<TOutput>>> {
    required(activityId, 'activityId');
    if (!this.options.reconciler) {
      return { activityId, status: 'unknown', eventIds: await this.eventIds(activityId) };
    }
    const result = await this.options.reconciler.reconcile(activityId);
    if (result.activityId !== activityId) {
      invalid('Model reconciler returned a different Activity id.');
    }
    return result;
  }

  private async eventIds(activityId: string): Promise<string[]> {
    return this.options.eventIds ? [...(await this.options.eventIds(activityId))] : [];
  }
}

function toInferenceRequest<TInput>(
  request: RuntimeActivityRequest<ModelRuntimeActivityInput<TInput>>
): InferenceRequest<TInput> {
  return {
    ...request.input.request,
    runId: request.runId,
    stepId: request.stateAttemptId,
    sessionId: request.sessionId,
    metadata: {
      ...request.input.request.metadata,
      runtimeActivityId: request.activityId,
      runtimeOperationId: request.operationId,
      runtimeIdempotencyKey: request.idempotencyKey,
      runtimeFencingToken: request.fencingToken,
      runtimeCorrelationId: request.correlationId,
      runtimeCausationId: request.causationId,
    },
  };
}

function validateRequest(request: RuntimeActivityRequest<ModelRuntimeActivityInput>): void {
  if (request.activityType !== 'model') {
    invalid('ModelRuntimeActivityPort only accepts model activities.');
  }
  required(request.activityId, 'activityId');
  required(request.input?.providerId, 'input.providerId');
  required(request.input?.request?.modelAlias, 'input.request.modelAlias');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
