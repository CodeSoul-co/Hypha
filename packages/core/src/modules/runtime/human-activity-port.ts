import type {
  NormalizedRuntimeError,
  RuntimeActivityPort,
  RuntimeActivityRequest,
  RuntimeActivityResult,
} from '../../contracts/runtime';
import { FrameworkError } from '../../errors';

export interface HumanRuntimeActivityInput {
  summary: string;
  details?: unknown;
  expectedDecisionSchema?: Record<string, unknown>;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeHumanReviewRequest extends HumanRuntimeActivityInput {
  reviewId: string;
  runId: string;
  sessionId: string;
  stateAttemptId: string;
  operationId: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
}

export interface RuntimeHumanReviewState<TDecision = unknown> {
  reviewId: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled' | 'unknown';
  decision?: TDecision;
  reviewerId?: string;
  reason?: string;
  decidedAt?: string;
  eventIds: string[];
  metadata?: Record<string, unknown>;
}

export interface RuntimeHumanReviewProvider<TDecision = unknown> {
  request(request: RuntimeHumanReviewRequest): Promise<RuntimeHumanReviewState<TDecision>>;
  cancel(reviewId: string, reason?: string): Promise<void>;
  get(reviewId: string): Promise<RuntimeHumanReviewState<TDecision> | null>;
}

export class HumanRuntimeActivityPort<TDecision = unknown> implements RuntimeActivityPort<
  HumanRuntimeActivityInput,
  RuntimeHumanReviewState<TDecision>
> {
  constructor(private readonly provider: RuntimeHumanReviewProvider<TDecision>) {}

  async execute(
    request: RuntimeActivityRequest<HumanRuntimeActivityInput>
  ): Promise<RuntimeActivityResult<RuntimeHumanReviewState<TDecision>>> {
    validateRequest(request);
    const state = await this.provider.request(toReviewRequest(request));
    return toRuntimeResult(request.activityId, state);
  }

  async cancel(activityId: string, reason?: string): Promise<void> {
    required(activityId, 'activityId');
    await this.provider.cancel(activityId, reason);
  }

  async reconcile(
    activityId: string
  ): Promise<RuntimeActivityResult<RuntimeHumanReviewState<TDecision>>> {
    required(activityId, 'activityId');
    const state = await this.provider.get(activityId);
    return state
      ? toRuntimeResult(activityId, state)
      : { activityId, status: 'unknown', eventIds: [] };
  }
}

function toReviewRequest(
  request: RuntimeActivityRequest<HumanRuntimeActivityInput>
): RuntimeHumanReviewRequest {
  return {
    ...request.input,
    reviewId: request.activityId,
    runId: request.runId,
    sessionId: request.sessionId,
    stateAttemptId: request.stateAttemptId,
    operationId: request.operationId,
    idempotencyKey: request.idempotencyKey,
    correlationId: request.correlationId,
    causationId: request.causationId,
  };
}

function toRuntimeResult<TDecision>(
  activityId: string,
  state: RuntimeHumanReviewState<TDecision>
): RuntimeActivityResult<RuntimeHumanReviewState<TDecision>> {
  if (state.reviewId !== activityId)
    invalid('Human review Provider returned a different review id.');
  if (state.status === 'pending') {
    return { activityId, status: 'waiting', output: state, eventIds: [...state.eventIds] };
  }
  if (state.status === 'approved') {
    return { activityId, status: 'completed', output: state, eventIds: [...state.eventIds] };
  }
  if (state.status === 'cancelled') {
    return { activityId, status: 'cancelled', output: state, eventIds: [...state.eventIds] };
  }
  if (state.status === 'unknown') {
    return { activityId, status: 'unknown', output: state, eventIds: [...state.eventIds] };
  }
  const error = reviewError(state);
  return {
    activityId,
    status: 'failed',
    output: state,
    eventIds: [...state.eventIds],
    error,
    retryable: false,
  };
}

function reviewError<TDecision>(state: RuntimeHumanReviewState<TDecision>): NormalizedRuntimeError {
  return {
    code: state.status === 'expired' ? 'RUNTIME_STATE_TIMEOUT' : 'RUNTIME_GUARD_FAILED',
    message:
      state.reason ??
      (state.status === 'expired' ? 'Human review expired.' : 'Human review was rejected.'),
    retryable: false,
    details: {
      reviewId: state.reviewId,
      reviewStatus: state.status,
      reviewerId: state.reviewerId,
      decidedAt: state.decidedAt,
    },
  };
}

function validateRequest(request: RuntimeActivityRequest<HumanRuntimeActivityInput>): void {
  if (request.activityType !== 'human') {
    invalid('HumanRuntimeActivityPort only accepts human activities.');
  }
  required(request.activityId, 'activityId');
  required(request.input?.summary, 'input.summary');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
