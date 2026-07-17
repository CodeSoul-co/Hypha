import {
  FrameworkError,
  type NormalizedRuntimeError,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
} from '@hypha/core';
import type {
  ToolCallContext,
  ToolCallError,
  ToolCallRequest,
  ToolCallResult,
  ToolExecutionScope,
  ToolInvocationRecord,
  ToolInvocationStore,
  ToolPrincipal,
  ToolRunner,
} from './index';

export interface ToolRuntimeActivityContext {
  userId?: string;
  tenantId?: string;
  workspaceId?: string;
  agentId?: string;
  fsmState?: string;
  parentEventId?: string;
  contractSnapshotRef?: string;
  principal?: ToolPrincipal;
  executionScope?: ToolExecutionScope;
  metadata?: Record<string, unknown>;
}

export interface ToolRuntimeActivityInput<TInput = unknown> {
  toolId: string;
  input: TInput;
  context?: ToolRuntimeActivityContext;
}

export interface ToolRuntimeActivityPortOptions {
  runner: ToolRunner;
  invocations: ToolInvocationStore;
  eventIds?: (invocationId: string) => readonly string[] | Promise<readonly string[]>;
}

export class ToolRuntimeActivityPort implements RuntimeActivityPort<
  ToolRuntimeActivityInput,
  ToolCallResult
> {
  constructor(private readonly options: ToolRuntimeActivityPortOptions) {}

  async execute(
    request: RuntimeActivityRequest<ToolRuntimeActivityInput>
  ): Promise<RuntimeActivityResult<ToolCallResult>> {
    validateRequest(request);
    const result = await this.options.runner.run(toToolCallRequest(request));
    return this.toRuntimeResult(request.activityId, result);
  }

  async cancel(activityId: string, reason?: string): Promise<void> {
    required(activityId, 'activityId');
    if (!this.options.runner.cancelInvocation) {
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: 'The configured ToolRunner does not support cancellation.',
        context: { activityId },
      });
    }
    await this.options.runner.cancelInvocation(activityId, reason);
  }

  async reconcile(activityId: string): Promise<RuntimeActivityResult<ToolCallResult>> {
    required(activityId, 'activityId');
    const invocation = await this.options.invocations.get(activityId);
    if (!invocation) return this.result(activityId, 'unknown');

    const persisted =
      invocation.result ?? (await this.options.invocations.getCompleted(activityId));
    if (persisted) return this.toRuntimeResult(activityId, persisted);

    if (invocation.status === 'waiting_approval') {
      return this.result(activityId, 'waiting', {
        output: {
          toolId: invocation.toolId,
          invocationId: invocation.id,
          status: 'human_review_required',
          approvalRequest: invocation.approvalRequest,
        },
      });
    }
    if (ACTIVE_TOOL_STATUSES.has(invocation.status)) {
      return this.result(activityId, 'waiting');
    }
    if (invocation.status === 'cancelled') {
      return this.result(activityId, 'cancelled');
    }
    if (invocation.status === 'completed') {
      return this.result(activityId, 'unknown');
    }
    return this.result(activityId, 'failed', {
      error: errorFromInvocation(invocation),
      retryable: invocation.status === 'timed_out',
    });
  }

  private async toRuntimeResult(
    activityId: string,
    result: ToolCallResult
  ): Promise<RuntimeActivityResult<ToolCallResult>> {
    if (result.status === 'completed') {
      return this.result(activityId, 'completed', {
        output: result,
        artifactRefs: result.artifactRefs,
      });
    }
    if (result.status === 'human_review_required') {
      return this.result(activityId, 'waiting', { output: result });
    }
    if (result.status === 'cancelled') {
      return this.result(activityId, 'cancelled', { output: result });
    }
    const error = errorFromToolResult(result);
    return this.result(activityId, 'failed', {
      output: result,
      error,
      retryable: error.retryable,
    });
  }

  private async result(
    activityId: string,
    status: RuntimeActivityResult['status'],
    fields: Omit<RuntimeActivityResult<ToolCallResult>, 'activityId' | 'status' | 'eventIds'> = {}
  ): Promise<RuntimeActivityResult<ToolCallResult>> {
    const eventIds = this.options.eventIds ? [...(await this.options.eventIds(activityId))] : [];
    return { activityId, status, eventIds, ...fields };
  }
}

const ACTIVE_TOOL_STATUSES = new Set<ToolInvocationRecord['status']>([
  'created',
  'validating',
  'validated',
  'policy_checked',
  'approved',
  'queued',
  'running',
  'cancelling',
]);

function toToolCallRequest(
  request: RuntimeActivityRequest<ToolRuntimeActivityInput>
): ToolCallRequest {
  const context = request.input.context;
  const toolContext: ToolCallContext = {
    runId: request.runId,
    stepId: request.stateAttemptId,
    invocationId: request.activityId,
    sessionId: request.sessionId,
    operationId: request.operationId,
    idempotencyKey: request.idempotencyKey,
    deadlineAt: request.deadlineAt,
    correlationId: request.correlationId,
    causationId: request.causationId,
    userId: context?.userId,
    tenantId: context?.tenantId,
    workspaceId: context?.workspaceId,
    agentId: context?.agentId,
    fsmState: context?.fsmState,
    parentEventId: context?.parentEventId,
    contractSnapshotRef: context?.contractSnapshotRef,
    principal: context?.principal,
    executionScope: context?.executionScope,
    metadata: context?.metadata,
  };
  return { toolId: request.input.toolId, input: request.input.input, context: toolContext };
}

function errorFromToolResult(result: ToolCallResult): NormalizedRuntimeError {
  const toolError = isToolCallError(result.error) ? result.error : undefined;
  return {
    code: result.status === 'conflict' ? 'RUNTIME_RESOURCE_CONFLICT' : 'RUNTIME_INTERNAL_ERROR',
    message:
      toolError?.message ??
      (typeof result.error === 'string'
        ? result.error
        : `Tool activity ended with status ${result.status}.`),
    retryable: toolError?.retryable ?? false,
    details: {
      toolId: result.toolId,
      invocationId: result.invocationId,
      toolStatus: result.status,
      ...(toolError?.code === undefined ? {} : { toolErrorCode: toolError.code }),
      ...(toolError?.phase === undefined ? {} : { phase: toolError.phase }),
      ...(toolError?.details === undefined ? {} : { toolDetails: toolError.details }),
    },
  };
}

function errorFromInvocation(invocation: ToolInvocationRecord): NormalizedRuntimeError {
  return {
    code:
      invocation.status === 'conflict'
        ? 'RUNTIME_RESOURCE_CONFLICT'
        : invocation.status === 'timed_out' || invocation.status === 'expired'
          ? 'RUNTIME_STATE_TIMEOUT'
          : 'RUNTIME_INTERNAL_ERROR',
    message: `Tool invocation ${invocation.id} ended with status ${invocation.status}.`,
    retryable: invocation.status === 'timed_out',
    details: {
      toolId: invocation.toolId,
      invocationId: invocation.id,
      toolStatus: invocation.status,
      revision: invocation.revision,
    },
  };
}

function isToolCallError(error: ToolCallResult['error']): error is ToolCallError {
  return Boolean(
    error &&
    typeof error === 'object' &&
    typeof error.code === 'string' &&
    typeof error.message === 'string'
  );
}

function validateRequest(request: RuntimeActivityRequest<ToolRuntimeActivityInput>): void {
  if (request.activityType !== 'tool')
    invalid('ToolRuntimeActivityPort only accepts tool activities.');
  required(request.activityId, 'activityId');
  required(request.input?.toolId, 'input.toolId');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
