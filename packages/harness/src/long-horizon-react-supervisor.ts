import { FrameworkError, hashCanonicalJson, type SessionQueue } from '@hypha/core';
import type { ReActRunContext, ReActRunControl, ReActRunResult, ReActRunner } from '@hypha/kernel';

export interface ReActContinuationContextReference {
  ref: string;
  hash: string;
}

export interface ReActContinuationScheduleRequest {
  version: '1.0.0';
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  runId: string;
  stepId: string;
  checkpointStepSequence: number;
  checkpointHash: string;
  context: ReActContinuationContextReference;
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

export interface SessionQueueReActContinuationSchedulerOptions {
  queue: SessionQueue;
  now?: () => string;
}

/**
 * Maps a ReAct quantum continuation onto the durable, per-Session command queue.
 * The queue stores only a bounded Artifact reference and its integrity hash.
 */
export class SessionQueueReActContinuationScheduler implements ReActContinuationScheduler {
  private readonly now: () => string;

  constructor(private readonly options: SessionQueueReActContinuationSchedulerOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async schedule(
    input: ReActContinuationScheduleRequest
  ): Promise<ReActContinuationScheduleResult> {
    const request = validateScheduleRequest(input);
    const idempotencyKey = hashCanonicalJson({
      version: request.version,
      runId: request.runId,
      stepId: request.stepId,
      checkpointStepSequence: request.checkpointStepSequence,
      checkpointHash: request.checkpointHash,
      contextHash: request.context.hash,
    });
    const record = await this.options.queue.enqueue({
      id: `react-continuation:${idempotencyKey.slice('sha256:'.length)}`,
      commandType: 'continue_react',
      idempotencyKey,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      sessionId: request.sessionId,
      targetRunId: request.runId,
      priority: request.priority,
      maxAttempts: request.maxAttempts,
      payloadRef: request.context.ref,
      payloadHash: request.context.hash,
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
  continuation?: {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    context: ReActContinuationContextReference;
    availableAt?: string;
    priority?: number;
    maxAttempts?: number;
  };
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
    const scheduled = await this.options.scheduler.schedule({
      version: '1.0.0',
      ...(input.continuation.tenantId === undefined
        ? {}
        : { tenantId: input.continuation.tenantId }),
      userId: input.continuation.userId,
      ...(input.continuation.workspaceId === undefined
        ? {}
        : { workspaceId: input.continuation.workspaceId }),
      sessionId: input.continuation.sessionId,
      runId: react.runId,
      stepId: react.checkpoint.stepId,
      checkpointStepSequence: react.checkpoint.stepSequence,
      checkpointHash: hashCanonicalJson(react.checkpoint),
      context: input.continuation.context,
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
  for (const [label, value] of [
    ['userId', request.userId],
    ['sessionId', request.sessionId],
    ['runId', request.runId],
    ['stepId', request.stepId],
    ['checkpointHash', request.checkpointHash],
    ['context.ref', request.context.ref],
    ['context.hash', request.context.hash],
  ] as const) {
    if (!value.trim()) invalid(`${label} must be non-empty`);
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(request.checkpointHash)) {
    invalid('checkpointHash must be a sha256 digest');
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(request.context.hash)) {
    invalid('context.hash must be a sha256 digest');
  }
  if (!Number.isInteger(request.checkpointStepSequence) || request.checkpointStepSequence < 0) {
    invalid('checkpointStepSequence must be a non-negative integer');
  }
  assertTimestamp(request.availableAt, 'availableAt');
  return structuredClone(request);
}

function assertTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be an ISO date-time`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
