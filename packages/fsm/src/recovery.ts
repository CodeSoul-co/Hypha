import { z } from 'zod';

export const FSM_ANOMALY_SOURCES = [
  'fsm',
  'inference',
  'tool',
  'memory',
  'mcp',
  'workspace',
  'storage',
  'message_bus',
  'policy',
  'domain',
  'unknown',
] as const;

export const FSM_ANOMALY_CATEGORIES = [
  'validation',
  'policy_denied',
  'authentication',
  'authorization',
  'rate_limit',
  'timeout',
  'transient_dependency',
  'permanent_dependency',
  'concurrency_conflict',
  'resource_exhausted',
  'tool_failure',
  'inference_failure',
  'memory_failure',
  'storage_failure',
  'message_failure',
  'invariant_violation',
  'cancellation',
  'unknown',
] as const;

export const FSM_RECOVERY_ACTIONS = [
  'retry',
  'wait',
  'compensate',
  'human_review',
  'quarantine',
  'fail',
  'cancel',
] as const;

export type FSMAnomalySource = (typeof FSM_ANOMALY_SOURCES)[number];
export type FSMAnomalyCategory = (typeof FSM_ANOMALY_CATEGORIES)[number];
export type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number];
export type FSMSideEffectState = 'none' | 'not_started' | 'committed' | 'unknown';
export type FSMCircuitStatus = 'closed' | 'open' | 'half_open';

export interface FSMAnomaly {
  id: string;
  source: FSMAnomalySource;
  category: FSMAnomalyCategory;
  code: string;
  message: string;
  occurredAt: string;
  retryable?: boolean;
  retryAfterMs?: number;
  circuitKey?: string;
  sideEffectState?: FSMSideEffectState;
  compensationAvailable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface FSMRecoveryBackoffPolicy {
  initialDelayMs: number;
  maxDelayMs: number;
  multiplier: number;
  jitterRatio: number;
}

export interface FSMCircuitBreakerPolicy {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMaxAttempts: number;
}

export interface FSMRecoveryStateTargets {
  recovering: string;
  compensating: string;
  humanReview: string;
  quarantined: string;
  failed: string;
  cancelled: string;
}

export interface FSMRecoveryPolicySpec {
  maxAttemptsPerState: number;
  maxTotalAttempts: number;
  maxElapsedMs: number;
  retryableCategories: FSMAnomalyCategory[];
  nonRetryableCodes?: string[];
  backoff: FSMRecoveryBackoffPolicy;
  circuitBreaker: FSMCircuitBreakerPolicy;
  stateTargets: FSMRecoveryStateTargets;
  onExhausted: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
  afterCompensation: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
}

export interface FSMCircuitSnapshot {
  status: FSMCircuitStatus;
  consecutiveFailures: number;
  halfOpenAttempts: number;
  openedAt?: string;
}

export interface FSMRecoverySnapshot {
  startedAt: string;
  updatedAt: string;
  totalAttempts: number;
  attemptsByState: Record<string, number>;
  circuits: Record<string, FSMCircuitSnapshot>;
  lastAnomalyId?: string;
  lastAction?: FSMRecoveryAction;
}

export interface FSMRecoveryDecision {
  anomaly: FSMAnomaly;
  action: FSMRecoveryAction;
  fromState: string;
  transitionState: string;
  resumeState?: string;
  attempt: number;
  totalAttempts: number;
  delayMs: number;
  decidedAt: string;
  nextEligibleAt?: string;
  circuitKey: string;
  circuitStatus: FSMCircuitStatus;
  reason: string;
  quarantineState: string;
  afterCompensationAction?: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
  afterCompensationState?: string;
}

export interface FSMRecoveryPlan {
  decision: FSMRecoveryDecision;
  snapshot: FSMRecoverySnapshot;
}

export interface FSMAnomalyClassificationInput {
  id: string;
  source?: FSMAnomalySource;
  occurredAt?: string;
  sideEffectState?: FSMSideEffectState;
  compensationAvailable?: boolean;
  retryable?: boolean;
  retryAfterMs?: number;
  circuitKey?: string;
  metadata?: Record<string, unknown>;
}

export const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec = {
  maxAttemptsPerState: 3,
  maxTotalAttempts: 8,
  maxElapsedMs: 5 * 60_000,
  retryableCategories: [
    'rate_limit',
    'timeout',
    'transient_dependency',
    'concurrency_conflict',
    'resource_exhausted',
    'tool_failure',
    'inference_failure',
    'memory_failure',
    'storage_failure',
    'message_failure',
  ],
  nonRetryableCodes: [],
  backoff: {
    initialDelayMs: 250,
    maxDelayMs: 30_000,
    multiplier: 2,
    jitterRatio: 0.2,
  },
  circuitBreaker: {
    failureThreshold: 3,
    resetTimeoutMs: 30_000,
    halfOpenMaxAttempts: 1,
  },
  stateTargets: {
    recovering: 'Recovering',
    compensating: 'Compensating',
    humanReview: 'HumanReview',
    quarantined: 'Quarantined',
    failed: 'Failed',
    cancelled: 'Cancelled',
  },
  onExhausted: 'human_review',
  afterCompensation: 'human_review',
};

const anomalySourceSchema = z.enum(FSM_ANOMALY_SOURCES);
const anomalyCategorySchema = z.enum(FSM_ANOMALY_CATEGORIES);
const recoveryActionSchema = z.enum(FSM_RECOVERY_ACTIONS);

export const fsmAnomalySchema = z.object({
  id: z.string().min(1),
  source: anomalySourceSchema,
  category: anomalyCategorySchema,
  code: z.string().min(1),
  message: z.string(),
  occurredAt: z.string().datetime(),
  retryable: z.boolean().optional(),
  retryAfterMs: z.number().int().nonnegative().optional(),
  circuitKey: z.string().min(1).optional(),
  sideEffectState: z.enum(['none', 'not_started', 'committed', 'unknown']).optional(),
  compensationAvailable: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const fsmRecoveryPolicySpecSchema = z.object({
  maxAttemptsPerState: z.number().int().positive(),
  maxTotalAttempts: z.number().int().positive(),
  maxElapsedMs: z.number().int().positive(),
  retryableCategories: z.array(anomalyCategorySchema),
  nonRetryableCodes: z.array(z.string().min(1)).optional(),
  backoff: z.object({
    initialDelayMs: z.number().int().nonnegative(),
    maxDelayMs: z.number().int().nonnegative(),
    multiplier: z.number().min(1),
    jitterRatio: z.number().min(0).max(1),
  }),
  circuitBreaker: z.object({
    failureThreshold: z.number().int().positive(),
    resetTimeoutMs: z.number().int().positive(),
    halfOpenMaxAttempts: z.number().int().positive(),
  }),
  stateTargets: z.object({
    recovering: z.string().min(1),
    compensating: z.string().min(1),
    humanReview: z.string().min(1),
    quarantined: z.string().min(1),
    failed: z.string().min(1),
    cancelled: z.string().min(1),
  }),
  onExhausted: recoveryActionSchema.extract(['human_review', 'quarantine', 'fail']),
  afterCompensation: recoveryActionSchema.extract(['human_review', 'quarantine', 'fail']),
});

export const fsmRecoverySnapshotSchema = z.object({
  startedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  totalAttempts: z.number().int().nonnegative(),
  attemptsByState: z.record(z.number().int().nonnegative()),
  circuits: z.record(
    z.object({
      status: z.enum(['closed', 'open', 'half_open']),
      consecutiveFailures: z.number().int().nonnegative(),
      halfOpenAttempts: z.number().int().nonnegative(),
      openedAt: z.string().datetime().optional(),
    })
  ),
  lastAnomalyId: z.string().min(1).optional(),
  lastAction: recoveryActionSchema.optional(),
});

export function createInitialFSMRecoverySnapshot(
  now = new Date().toISOString()
): FSMRecoverySnapshot {
  assertTimestamp(now, 'recovery snapshot');
  return {
    startedAt: now,
    updatedAt: now,
    totalAttempts: 0,
    attemptsByState: {},
    circuits: {},
  };
}

export function classifyFSMAnomaly(
  error: unknown,
  input: FSMAnomalyClassificationInput
): FSMAnomaly {
  const record = errorRecord(error);
  const code = normalizedErrorCode(record);
  const message = errorMessage(error, record);
  const source = input.source ?? 'unknown';
  const category = classifyCategory(code, record, source);
  const retryable =
    input.retryable ?? booleanField(record, 'retryable') ?? defaultRetryable(category);

  return fsmAnomalySchema.parse({
    id: input.id,
    source,
    category,
    code,
    message,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    retryable,
    retryAfterMs: input.retryAfterMs ?? retryAfterMs(record),
    circuitKey: input.circuitKey,
    sideEffectState: input.sideEffectState ?? 'none',
    compensationAvailable: input.compensationAvailable,
    metadata: input.metadata,
  });
}

export function planFSMRecovery(input: {
  anomaly: FSMAnomaly;
  stateId: string;
  policy?: FSMRecoveryPolicySpec;
  snapshot?: FSMRecoverySnapshot;
  now?: string;
}): FSMRecoveryPlan {
  const policy = fsmRecoveryPolicySpecSchema.parse(input.policy ?? defaultFSMRecoveryPolicy);
  const anomaly = fsmAnomalySchema.parse(input.anomaly);
  const now = input.now ?? new Date().toISOString();
  assertTimestamp(now, 'recovery decision');
  const previous = cloneRecoverySnapshot(
    fsmRecoverySnapshotSchema.parse(
      input.snapshot ?? createInitialFSMRecoverySnapshot(anomaly.occurredAt)
    )
  );
  const circuitKey = anomaly.circuitKey ?? anomaly.source;
  const currentCircuit = previous.circuits[circuitKey] ?? closedCircuit();
  const circuit = refreshCircuit(currentCircuit, policy, now);
  const attempt = (previous.attemptsByState[input.stateId] ?? 0) + 1;
  const totalAttempts = previous.totalAttempts + 1;
  const elapsedMs = Math.max(0, Date.parse(now) - Date.parse(previous.startedAt));
  const snapshot: FSMRecoverySnapshot = {
    ...previous,
    updatedAt: now,
    totalAttempts,
    attemptsByState: { ...previous.attemptsByState, [input.stateId]: attempt },
    circuits: { ...previous.circuits, [circuitKey]: circuit },
    lastAnomalyId: anomaly.id,
  };

  const decide = (
    action: FSMRecoveryAction,
    reason: string,
    delayMs = 0,
    circuitOverride: FSMCircuitSnapshot = circuit
  ): FSMRecoveryPlan => {
    const transitionState = transitionStateFor(action, policy);
    const boundedDelay = Math.max(0, Math.min(delayMs, policy.backoff.maxDelayMs));
    snapshot.circuits[circuitKey] = circuitOverride;
    snapshot.lastAction = action;
    return {
      decision: {
        anomaly,
        action,
        fromState: input.stateId,
        transitionState,
        resumeState: action === 'retry' || action === 'wait' ? input.stateId : undefined,
        attempt,
        totalAttempts,
        delayMs: boundedDelay,
        decidedAt: now,
        nextEligibleAt:
          boundedDelay > 0 ? new Date(Date.parse(now) + boundedDelay).toISOString() : undefined,
        circuitKey,
        circuitStatus: circuitOverride.status,
        reason,
        quarantineState: policy.stateTargets.quarantined,
        afterCompensationAction: action === 'compensate' ? policy.afterCompensation : undefined,
        afterCompensationState:
          action === 'compensate'
            ? transitionStateFor(policy.afterCompensation, policy)
            : undefined,
      },
      snapshot,
    };
  };

  if (anomaly.category === 'cancellation') {
    return decide('cancel', 'Cancellation is terminal and must not be retried.');
  }
  if (anomaly.sideEffectState === 'unknown') {
    return decide('quarantine', 'External side-effect commit state is unknown.');
  }
  if (anomaly.sideEffectState === 'committed' && anomaly.compensationAvailable) {
    return decide('compensate', 'A committed side effect requires an explicit compensation step.');
  }
  if (anomaly.category === 'invariant_violation') {
    return decide(
      'quarantine',
      'Invariant violations require evidence preservation and inspection.'
    );
  }
  if (
    ['validation', 'policy_denied', 'authentication', 'authorization'].includes(anomaly.category)
  ) {
    return decide('human_review', 'The anomaly requires corrected input, authority, or policy.');
  }
  if (policy.nonRetryableCodes?.includes(anomaly.code) || anomaly.retryable === false) {
    return decide('fail', 'The anomaly is explicitly non-retryable.');
  }
  if (circuit.status === 'open') {
    const openedAt = circuit.openedAt ? Date.parse(circuit.openedAt) : Date.parse(now);
    const remainingMs = Math.max(
      0,
      policy.circuitBreaker.resetTimeoutMs - (Date.parse(now) - openedAt)
    );
    return decide('wait', 'The dependency circuit is open.', remainingMs, circuit);
  }
  if (
    attempt > policy.maxAttemptsPerState ||
    totalAttempts > policy.maxTotalAttempts ||
    elapsedMs > policy.maxElapsedMs
  ) {
    return decide(policy.onExhausted, 'The bounded recovery budget is exhausted.');
  }
  if (!policy.retryableCategories.includes(anomaly.category)) {
    return decide('fail', 'The anomaly category is not included in the retry policy.');
  }
  if (
    circuit.status === 'half_open' &&
    circuit.halfOpenAttempts >= policy.circuitBreaker.halfOpenMaxAttempts
  ) {
    const reopened = openCircuit(circuit, now);
    return decide(
      'wait',
      'The half-open probe budget is exhausted.',
      policy.circuitBreaker.resetTimeoutMs,
      reopened
    );
  }

  const failedCircuit: FSMCircuitSnapshot = {
    ...circuit,
    consecutiveFailures: circuit.consecutiveFailures + 1,
    halfOpenAttempts: circuit.status === 'half_open' ? circuit.halfOpenAttempts + 1 : 0,
  };
  if (failedCircuit.consecutiveFailures >= policy.circuitBreaker.failureThreshold) {
    const opened = openCircuit(failedCircuit, now);
    return decide(
      'wait',
      'The dependency failure threshold opened the circuit.',
      policy.circuitBreaker.resetTimeoutMs,
      opened
    );
  }

  const delayMs = Math.max(
    anomaly.retryAfterMs ?? 0,
    computeFSMRecoveryDelay(policy.backoff, attempt, `${anomaly.id}:${input.stateId}`)
  );
  return decide('retry', 'A bounded, idempotency-aware retry is allowed.', delayMs, failedCircuit);
}

export function registerFSMRecoverySuccess(
  snapshot: FSMRecoverySnapshot,
  circuitKey: string,
  now = new Date().toISOString()
): FSMRecoverySnapshot {
  assertTimestamp(now, 'recovery success');
  return {
    ...cloneRecoverySnapshot(snapshot),
    updatedAt: now,
    circuits: {
      ...snapshot.circuits,
      [circuitKey]: closedCircuit(),
    },
  };
}

export function computeFSMRecoveryDelay(
  policy: FSMRecoveryBackoffPolicy,
  attempt: number,
  seed: string
): number {
  const exponential = Math.min(
    policy.maxDelayMs,
    policy.initialDelayMs * policy.multiplier ** Math.max(0, attempt - 1)
  );
  if (exponential <= 0 || policy.jitterRatio <= 0) return Math.round(exponential);
  const unit = deterministicUnit(seed);
  const jitter = exponential * policy.jitterRatio * (unit * 2 - 1);
  return Math.max(0, Math.min(policy.maxDelayMs, Math.round(exponential + jitter)));
}

function classifyCategory(
  code: string,
  record: Record<string, unknown>,
  source: FSMAnomalySource
): FSMAnomalyCategory {
  const status = numberField(record, 'status') ?? numberField(record, 'statusCode');
  if (code === 'ABORT_ERR' || code === 'ABORTERROR' || code.includes('CANCEL'))
    return 'cancellation';
  if (status === 429 || code.includes('RATE_LIMIT') || code === 'HTTP_429') return 'rate_limit';
  if (status === 401 || code.includes('AUTHENTICATION') || code.includes('UNAUTHENTICATED')) {
    return 'authentication';
  }
  if (status === 403 || code.includes('AUTHORIZATION') || code.includes('FORBIDDEN')) {
    return 'authorization';
  }
  if (code.includes('POLICY') || code.includes('DENIED')) return 'policy_denied';
  if (status === 409 || code.includes('CONFLICT') || code.includes('VERSION_MISMATCH')) {
    return 'concurrency_conflict';
  }
  if (code.includes('TIMEOUT') || code === 'ETIMEDOUT') return 'timeout';
  if (['ENOMEM', 'ENOSPC', 'RESOURCE_EXHAUSTED'].some((value) => code.includes(value))) {
    return 'resource_exhausted';
  }
  if (
    code.includes('VALIDATION') ||
    code.includes('INVALID_') ||
    status === 400 ||
    status === 422
  ) {
    return 'validation';
  }
  if (code.includes('INVARIANT') || code.includes('CORRUPT')) return 'invariant_violation';
  if (
    [
      'ECONNRESET',
      'ECONNREFUSED',
      'EAI_AGAIN',
      'ENOTFOUND',
      'HTTP_502',
      'HTTP_503',
      'HTTP_504',
    ].some((value) => code.includes(value)) ||
    (status !== null && status >= 500)
  ) {
    return 'transient_dependency';
  }
  const sourceFallbacks: Partial<Record<FSMAnomalySource, FSMAnomalyCategory>> = {
    inference: 'inference_failure',
    tool: 'tool_failure',
    memory: 'memory_failure',
    storage: 'storage_failure',
    message_bus: 'message_failure',
    policy: 'policy_denied',
  };
  return sourceFallbacks[source] ?? 'unknown';
}

function transitionStateFor(action: FSMRecoveryAction, policy: FSMRecoveryPolicySpec): string {
  switch (action) {
    case 'retry':
    case 'wait':
      return policy.stateTargets.recovering;
    case 'compensate':
      return policy.stateTargets.compensating;
    case 'human_review':
      return policy.stateTargets.humanReview;
    case 'quarantine':
      return policy.stateTargets.quarantined;
    case 'fail':
      return policy.stateTargets.failed;
    case 'cancel':
      return policy.stateTargets.cancelled;
  }
}

function refreshCircuit(
  circuit: FSMCircuitSnapshot,
  policy: FSMRecoveryPolicySpec,
  now: string
): FSMCircuitSnapshot {
  if (circuit.status !== 'open' || !circuit.openedAt) return { ...circuit };
  if (Date.parse(now) - Date.parse(circuit.openedAt) < policy.circuitBreaker.resetTimeoutMs) {
    return { ...circuit };
  }
  return {
    status: 'half_open',
    consecutiveFailures: circuit.consecutiveFailures,
    halfOpenAttempts: 0,
  };
}

function openCircuit(circuit: FSMCircuitSnapshot, now: string): FSMCircuitSnapshot {
  return {
    ...circuit,
    status: 'open',
    openedAt: now,
  };
}

function closedCircuit(): FSMCircuitSnapshot {
  return { status: 'closed', consecutiveFailures: 0, halfOpenAttempts: 0 };
}

function defaultRetryable(category: FSMAnomalyCategory): boolean {
  return defaultFSMRecoveryPolicy.retryableCategories.includes(category);
}

function errorRecord(error: unknown): Record<string, unknown> {
  if (error && typeof error === 'object') return error as Record<string, unknown>;
  return {};
}

function normalizedErrorCode(record: Record<string, unknown>): string {
  const raw = record.code ?? record.name ?? record.status ?? record.statusCode ?? 'UNKNOWN';
  return (
    String(raw)
      .trim()
      .replace(/[\s-]+/g, '_')
      .toUpperCase() || 'UNKNOWN'
  );
}

function errorMessage(error: unknown, record: Record<string, unknown>): string {
  if (typeof record.message === 'string') return record.message;
  if (typeof error === 'string') return error;
  return String(error);
}

function retryAfterMs(record: Record<string, unknown>): number | undefined {
  const direct = numberField(record, 'retryAfterMs');
  if (direct !== null && direct >= 0) return Math.round(direct);
  return undefined;
}

function booleanField(record: Record<string, unknown>, key: string): boolean | undefined {
  return typeof record[key] === 'boolean' ? record[key] : undefined;
}

function numberField(record: Record<string, unknown>, key: string): number | null {
  return typeof record[key] === 'number' && Number.isFinite(record[key])
    ? (record[key] as number)
    : null;
}

function deterministicUnit(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 0xffffffff;
}

function cloneRecoverySnapshot(snapshot: FSMRecoverySnapshot): FSMRecoverySnapshot {
  return {
    ...snapshot,
    attemptsByState: { ...snapshot.attemptsByState },
    circuits: Object.fromEntries(
      Object.entries(snapshot.circuits).map(([key, value]) => [key, { ...value }])
    ),
  };
}

function assertTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw new Error(`Invalid ISO timestamp for ${label}: ${value}`);
  }
}
