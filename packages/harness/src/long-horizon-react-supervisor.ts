import {
  FrameworkError,
  hashCanonicalJson,
  validateContinueReActCommandPayload,
  type ContinueReActCommandPayloadV1,
  type SessionCommandRecord,
} from '@hypha/core';
import type {
  ReActContinuationCheckpoint,
  ReActRunContext,
  ReActRunControl,
  ReActRunResult,
  ReActRunner,
} from '@hypha/kernel';

export interface ReActContinuationScheduleRequest {
  version: '1.0.0';
  tenantId?: string;
  workspaceId?: string;
  payload: ContinueReActCommandPayloadV1;
  availableAt: string;
  priority?: number;
  maxAttempts?: number;
}

export interface ReActContinuationScheduleResult {
  taskId: string;
  reused: boolean;
}

export interface ReActContinuationScheduler {
  schedule(request: ReActContinuationScheduleRequest): Promise<ReActContinuationScheduleResult>;
}

export interface EnqueueReActContinuationCommandRequest {
  id: string;
  commandType: 'continue_react';
  idempotencyKey: string;
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  targetRunId: string;
  priority?: number;
  maxAttempts?: number;
  payload: ContinueReActCommandPayloadV1;
  createdAt: string;
  availableAt: string;
}

export interface ReActContinuationCommandIngress {
  enqueue(
    request: EnqueueReActContinuationCommandRequest
  ): Promise<Pick<SessionCommandRecord, 'id' | 'status'>>;
}

export interface ServerIngressReActContinuationSchedulerOptions {
  ingress: ReActContinuationCommandIngress;
  now?: () => string;
}

/**
 * Sends a complete continuation envelope through the Server command ingress.
 * The ingress owns payload persistence and Queue reference/hash generation.
 */
export class ServerIngressReActContinuationScheduler implements ReActContinuationScheduler {
  private readonly now: () => string;

  constructor(private readonly options: ServerIngressReActContinuationSchedulerOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async schedule(
    input: ReActContinuationScheduleRequest
  ): Promise<ReActContinuationScheduleResult> {
    const request = validateScheduleRequest(input);
    const idempotencyKey = reActContinuationIdempotencyKey(request.payload);
    const record = await this.options.ingress.enqueue({
      id: `react-continuation:${idempotencyKey.slice('sha256:'.length)}`,
      commandType: 'continue_react',
      idempotencyKey,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.payload.userId,
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      sessionId: request.payload.sessionId,
      targetRunId: request.payload.runId,
      priority: request.priority,
      maxAttempts: request.maxAttempts,
      payload: request.payload,
      createdAt: this.timestamp(),
      availableAt: request.availableAt,
    });
    return {
      taskId: record.id,
      reused: record.status === 'reused',
    };
  }

  private timestamp(): string {
    const value = this.now();
    assertTimestamp(value, 'scheduler now');
    return value;
  }
}

export function reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string {
  const payload = validateContinueReActCommandPayload(input);
  return hashCanonicalJson({
    version: payload.version,
    runId: payload.runId,
    stepId: payload.stepId,
    checkpointSequence: payload.checkpointSequence,
    checkpointHash: payload.checkpointHash,
    scopeHash: payload.scopeHash,
  });
}

export type LongHorizonReActDisposition =
  | 'completed'
  | 'continuation_scheduled'
  | 'continuation_required'
  | 'waiting_human'
  | 'cancelled'
  | 'failed';

export interface LongHorizonReActQuantumInput {
  context: ReActRunContext;
  control?: ReActRunControl;
  continuation?: ReActContinuationIntent;
}

export interface ReActContinuationIntent {
  tenantId?: string;
  workspaceId?: string;
  availableAt?: string;
  priority?: number;
  maxAttempts?: number;
  buildPayload(
    checkpoint: Readonly<ReActContinuationCheckpoint>
  ): ContinueReActCommandPayloadV1 | Promise<ContinueReActCommandPayloadV1>;
}

export interface CoordinateReActQuantumResultInput {
  react: ReActRunResult;
  continuation?: ReActContinuationIntent;
}

export interface LongHorizonReActQuantumResult {
  disposition: LongHorizonReActDisposition;
  react: ReActRunResult;
  scheduledTaskId?: string;
  scheduleReused?: boolean;
}

export interface LongHorizonReActSupervisorOptions {
  runner: Pick<ReActRunner, 'run'>;
  scheduler?: ReActContinuationScheduler;
  now?: () => string;
}

/**
 * Executes exactly one bounded ReAct quantum.
 *
 * It never hides an unbounded loop. A retryable quantum boundary is handed to
 * a durable scheduler; global budget, deadline, and non-progress boundaries
 * require an explicit operator/workflow decision.
 */
export class LongHorizonReActSupervisor {
  private readonly now: () => string;

  constructor(private readonly options: LongHorizonReActSupervisorOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async runQuantum(input: LongHorizonReActQuantumInput): Promise<LongHorizonReActQuantumResult> {
    const react = await this.options.runner.run(input.context, input.control);
    return this.coordinateResult({
      react,
      ...(input.continuation === undefined ? {} : { continuation: input.continuation }),
    });
  }

  async coordinateResult(
    input: CoordinateReActQuantumResultInput
  ): Promise<LongHorizonReActQuantumResult> {
    const { react } = input;
    if (react.status === 'completed') return { disposition: 'completed', react };
    if (react.status === 'cancelled') return { disposition: 'cancelled', react };
    if (react.status === 'failed') return { disposition: 'failed', react };
    if (react.status === 'human_review_required') {
      return { disposition: 'waiting_human', react };
    }
    if (
      !react.suspension?.retryable ||
      react.suspension.requiresHumanReview ||
      react.suspension.reason !== 'quantum_exhausted'
    ) {
      return { disposition: 'waiting_human', react };
    }
    if (!this.options.scheduler || !input.continuation) {
      return { disposition: 'continuation_required', react };
    }
    if (!react.checkpoint) {
      throw new FrameworkError({
        code: 'RUNTIME_CHECKPOINT_FAILED',
        message: 'Retryable ReAct suspension does not contain a checkpoint',
      });
    }
    const payload = validateContinueReActCommandPayload(
      await input.continuation.buildPayload(react.checkpoint)
    );
    assertPayloadMatchesCheckpoint(payload, react.checkpoint);
    const scheduled = await this.options.scheduler.schedule({
      version: '1.0.0',
      ...(input.continuation.tenantId === undefined
        ? {}
        : { tenantId: input.continuation.tenantId }),
      ...(input.continuation.workspaceId === undefined
        ? {}
        : { workspaceId: input.continuation.workspaceId }),
      payload,
      availableAt: input.continuation.availableAt ?? this.timestamp(),
      ...(input.continuation.priority === undefined
        ? {}
        : { priority: input.continuation.priority }),
      ...(input.continuation.maxAttempts === undefined
        ? {}
        : { maxAttempts: input.continuation.maxAttempts }),
    });
    return {
      disposition: 'continuation_scheduled',
      react,
      scheduledTaskId: scheduled.taskId,
      scheduleReused: scheduled.reused,
    };
  }

  private timestamp(): string {
    const value = this.now();
    assertTimestamp(value, 'supervisor now');
    return value;
  }
}

function validateScheduleRequest(
  request: ReActContinuationScheduleRequest
): ReActContinuationScheduleRequest {
  if (request.version !== '1.0.0') invalid('Unsupported ReAct continuation schedule version');
  validateContinueReActCommandPayload(request.payload);
  assertTimestamp(request.availableAt, 'availableAt');
  return structuredClone(request);
}

function assertPayloadMatchesCheckpoint(
  payload: ContinueReActCommandPayloadV1,
  checkpoint: ReActContinuationCheckpoint
): void {
  if (
    payload.runId !== checkpoint.runId ||
    payload.stepId !== checkpoint.stepId ||
    payload.scopeHash !== checkpoint.scopeHash ||
    payload.checkpointSequence !== checkpoint.stepSequence ||
    payload.checkpointHash !== hashCanonicalJson(checkpoint)
  ) {
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Continuation envelope does not match the suspended checkpoint',
    });
  }
}

function assertTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be an ISO date-time`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
