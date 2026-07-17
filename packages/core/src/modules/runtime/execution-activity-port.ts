import type {
  CommandExecutionRequest,
  CommandExecutionResult,
} from '../../contracts/command-execution';
import type { ExecutionRecord, ExecutionStore } from '../../contracts/execution-store';
import type { NormalizedExecutionError } from '../../contracts/execution';
import type {
  NormalizedRuntimeError,
  RuntimeActivityPort,
  RuntimeActivityRequest,
  RuntimeActivityResult,
} from '../../contracts/runtime';
import type { SandboxProvider } from '../../contracts/sandbox-provider';
import { FrameworkError } from '../../errors';

type RuntimeControlledExecutionFields =
  | 'executionId'
  | 'operationId'
  | 'runId'
  | 'sessionId'
  | 'stepId'
  | 'idempotencyKey'
  | 'correlationId'
  | 'causationId';

export interface ExecutionRuntimeActivityInput {
  request: Omit<CommandExecutionRequest, RuntimeControlledExecutionFields>;
}

export interface ExecutionRuntimeActivityPortOptions {
  provider: SandboxProvider;
  store: ExecutionStore;
  eventIds?: (executionId: string) => readonly string[] | Promise<readonly string[]>;
}

export class ExecutionRuntimeActivityPort implements RuntimeActivityPort<
  ExecutionRuntimeActivityInput,
  CommandExecutionResult
> {
  constructor(private readonly options: ExecutionRuntimeActivityPortOptions) {}

  async execute(
    request: RuntimeActivityRequest<ExecutionRuntimeActivityInput>
  ): Promise<RuntimeActivityResult<CommandExecutionResult>> {
    validateRequest(request);
    const result = await this.options.provider.execute(toExecutionRequest(request));
    if (result.executionId !== request.activityId) {
      invalid('Execution Provider returned a different execution id.');
    }
    return this.toRuntimeResult(request.activityId, result);
  }

  async cancel(activityId: string, reason?: string): Promise<void> {
    required(activityId, 'activityId');
    const record = await this.options.store.get(activityId);
    if (!record) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_NOT_FOUND',
        message: `Execution record not found: ${activityId}`,
      });
    }
    await this.options.provider.cancel({
      operationId: `runtime:execution:cancel:${activityId}:${record.revision}`,
      executionId: activityId,
      principal: record.request.principal,
      expectedRevision: record.revision,
      reason,
      idempotencyKey: `runtime:execution:cancel:${activityId}:${record.revision}`,
      correlationId: record.request.correlationId,
      causationId: record.request.causationId,
    });
  }

  async reconcile(activityId: string): Promise<RuntimeActivityResult<CommandExecutionResult>> {
    required(activityId, 'activityId');
    const record = await this.options.store.get(activityId);
    if (!record) return this.result(activityId, 'unknown');
    if (record.result) {
      if (record.result.executionId !== activityId || record.result.status !== record.status) {
        return this.result(activityId, 'unknown');
      }
      return this.toRuntimeResult(activityId, record.result);
    }
    if (ACTIVE_EXECUTION_STATUSES.has(record.status)) {
      return this.result(activityId, 'waiting');
    }
    return this.result(activityId, 'unknown');
  }

  private async toRuntimeResult(
    activityId: string,
    result: CommandExecutionResult
  ): Promise<RuntimeActivityResult<CommandExecutionResult>> {
    if (result.status === 'completed') {
      return this.result(activityId, 'completed', {
        output: result,
        artifactRefs: artifactRefs(result),
      });
    }
    if (ACTIVE_EXECUTION_STATUSES.has(result.status)) {
      return this.result(activityId, 'waiting', { output: result });
    }
    if (result.status === 'cancelled') {
      return this.result(activityId, 'cancelled', { output: result });
    }
    const error = executionError(result);
    return this.result(activityId, 'failed', {
      output: result,
      error,
      retryable: error.retryable,
      artifactRefs: artifactRefs(result),
    });
  }

  private async result(
    activityId: string,
    status: RuntimeActivityResult['status'],
    fields: Omit<
      RuntimeActivityResult<CommandExecutionResult>,
      'activityId' | 'status' | 'eventIds'
    > = {}
  ): Promise<RuntimeActivityResult<CommandExecutionResult>> {
    return {
      activityId,
      status,
      eventIds: this.options.eventIds ? [...(await this.options.eventIds(activityId))] : [],
      ...fields,
    };
  }
}

const ACTIVE_EXECUTION_STATUSES = new Set<ExecutionRecord['status']>([
  'queued',
  'starting',
  'running',
  'cancelling',
]);

function toExecutionRequest(
  request: RuntimeActivityRequest<ExecutionRuntimeActivityInput>
): CommandExecutionRequest {
  return {
    ...request.input.request,
    executionId: request.activityId,
    operationId: request.operationId,
    runId: request.runId,
    sessionId: request.sessionId,
    stepId: request.stateAttemptId,
    idempotencyKey: request.idempotencyKey,
    correlationId: request.correlationId,
    causationId: request.causationId,
    metadata: {
      ...request.input.request.metadata,
      runtimeFencingToken: request.fencingToken,
    },
  };
}

function artifactRefs(result: CommandExecutionResult): string[] {
  return Array.from(
    new Set(
      [
        ...result.generatedArtifactRefs,
        result.stdoutArtifactRef,
        result.stderrArtifactRef,
        result.snapshotBeforeRef,
        result.snapshotAfterRef,
      ].filter((value): value is string => typeof value === 'string' && value.length > 0)
    )
  );
}

function executionError(result: CommandExecutionResult): NormalizedRuntimeError {
  const error = result.error;
  return {
    code: runtimeErrorCode(result.status, error),
    message: error?.message ?? `Execution ended with status ${result.status}.`,
    retryable: error?.retryable ?? result.status === 'timed_out',
    details: {
      executionId: result.executionId,
      executionStatus: result.status,
      exitCode: result.exitCode,
      ...(error?.code === undefined ? {} : { executionErrorCode: error.code }),
      ...(error?.providerCode === undefined ? {} : { providerCode: error.providerCode }),
      ...(error?.details === undefined ? {} : { executionDetails: error.details }),
    },
    ...(error?.causeRef === undefined ? {} : { causeRef: error.causeRef }),
  };
}

function runtimeErrorCode(
  status: CommandExecutionResult['status'],
  error?: NormalizedExecutionError
): NormalizedRuntimeError['code'] {
  if (status === 'timed_out' || error?.code === 'EXECUTION_TIMEOUT') return 'RUNTIME_STATE_TIMEOUT';
  if (status === 'oom_killed' || status === 'resource_exceeded') return 'RUNTIME_RESOURCE_CONFLICT';
  if (error?.code === 'EXECUTION_IDEMPOTENCY_CONFLICT') return 'RUNTIME_IDEMPOTENCY_CONFLICT';
  if (error?.code === 'EXECUTION_REVISION_CONFLICT' || error?.code === 'EXECUTION_LEASE_LOST') {
    return 'RUNTIME_FENCING_REJECTED';
  }
  return 'RUNTIME_INTERNAL_ERROR';
}

function validateRequest(request: RuntimeActivityRequest<ExecutionRuntimeActivityInput>): void {
  if (request.activityType !== 'execution') {
    invalid('ExecutionRuntimeActivityPort only accepts execution activities.');
  }
  required(request.activityId, 'activityId');
  required(request.input?.request?.workspaceId, 'input.request.workspaceId');
  required(request.input?.request?.executable, 'input.request.executable');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
