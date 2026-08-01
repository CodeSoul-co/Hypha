export const RECOVERY_MODULES = [
  'fsm',
  'inference',
  'tool',
  'memory',
  'execution',
  'mcp',
  'workspace',
  'storage',
  'message_bus',
  'cache',
  'policy',
  'domain',
  'unknown',
] as const;

export const RECOVERY_CATEGORIES = [
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
  'execution_failure',
  'storage_failure',
  'message_failure',
  'cache_failure',
  'invariant_violation',
  'cancellation',
  'unknown',
] as const;

export const RECOVERY_STRATEGIES = [
  'retry',
  'reconcile',
  'fallback',
  'degrade',
  'compensate',
  'wait',
  'human_review',
  'quarantine',
  'fail',
  'cancel',
] as const;

export type RecoveryModule = (typeof RECOVERY_MODULES)[number];
export type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number];
export type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number];
export type RecoverySideEffectState = 'none' | 'not_started' | 'committed' | 'unknown';
export type RecoveryCaseStatus =
  | 'active'
  | 'suspended'
  | 'recovered'
  | 'degraded'
  | 'compensated'
  | 'quarantined'
  | 'failed'
  | 'cancelled';

/**
 * Facts that can prove whether a recovery attempt changed the underlying state.
 * Callers should prefer stable revisions, receipts, checksums, and provider state
 * over human-readable messages.
 */
export interface RecoveryEvidence {
  observedAt: string;
  operationKey: string;
  dependencyKey?: string;
  state?: string;
  revision?: string | number;
  receiptStatus?: 'accepted' | 'completed' | 'rejected' | 'unknown';
  idempotencyKey?: string;
  inputHash?: string;
  outputHash?: string;
  policyRevision?: string;
  specRevision?: string;
  providerRevision?: string;
  sourceHashes?: Record<string, string>;
  markers?: Record<string, string | number | boolean | null>;
}

export interface RecoveryFailure {
  id: string;
  module: RecoveryModule;
  category: RecoveryCategory;
  code: string;
  message: string;
  occurredAt: string;
  retryable: boolean;
  sideEffectState: RecoverySideEffectState;
  compensationAvailable?: boolean;
  retryAfterMs?: number;
  circuitKey?: string;
  rootCauseKey?: string;
  evidence: RecoveryEvidence;
  metadata?: Record<string, unknown>;
}

export interface RecoveryAttemptRecord {
  cycle: number;
  participantId: string;
  module: RecoveryModule;
  strategy: RecoveryStrategy;
  fingerprint: string;
  startedAt: string;
  completedAt?: string;
  status: 'started' | 'succeeded' | 'failed' | 'no_progress' | 'skipped';
  evidenceBeforeHash: string;
  evidenceAfterHash?: string;
  errorCode?: string;
  metadata?: Record<string, unknown>;
}

export interface RecoveryCaseSnapshot {
  id: string;
  runId: string;
  fsmState: string;
  rootFingerprint: string;
  status: RecoveryCaseStatus;
  openedAt: string;
  updatedAt: string;
  cycles: number;
  noProgressCycles: number;
  lastEvidenceHash: string;
  lastFailure?: RecoveryFailure;
  attempts: RecoveryAttemptRecord[];
  outputs: Record<string, unknown>;
  degradedParticipants: string[];
  metadata?: Record<string, unknown>;
}

export interface RecoveryConvergencePolicy {
  maxCycles: number;
  maxNoProgressCycles: number;
  maxSameStrategyAttempts: number;
  maxElapsedMs: number;
  onNoProgress: Extract<
    RecoveryStrategy,
    'fallback' | 'degrade' | 'human_review' | 'quarantine' | 'fail'
  >;
  onExhausted: Extract<RecoveryStrategy, 'human_review' | 'quarantine' | 'fail'>;
}

export const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy = {
  maxCycles: 8,
  maxNoProgressCycles: 2,
  maxSameStrategyAttempts: 2,
  maxElapsedMs: 5 * 60_000,
  onNoProgress: 'degrade',
  onExhausted: 'human_review',
};

export interface RecoveryKnowledgeScope {
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId?: string;
  agentId?: string;
  domainPackId?: string;
}

export interface RecoveryKnowledgeKey {
  fingerprint: string;
  participantId: string;
  /**
   * New runtime writes always include scope. Absence is accepted only for
   * legacy Provider migration and must not be persisted by strict adapters.
   */
  scope?: RecoveryKnowledgeScope;
  policyRevision?: string;
  specRevision?: string;
  providerRevision?: string;
}

export interface RecoveryKnowledge {
  key: RecoveryKnowledgeKey;
  strategy: RecoveryStrategy;
  outcome: Extract<RecoveryCaseStatus, 'recovered' | 'degraded' | 'compensated' | 'failed'>;
  evidenceHash: string;
  learnedAt: string;
  expiresAt?: string;
  validation: {
    status: 'verified' | 'negative';
    sourceEventId?: string;
    proof?: Record<string, unknown>;
  };
}

/** Cache implementations are hints only. The supervisor must revalidate a hit. */
export interface RecoveryKnowledgePort {
  get(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null>;
  put(knowledge: RecoveryKnowledge): Promise<void>;
  invalidate(key: RecoveryKnowledgeKey, reason: string): Promise<void>;
}

export function recoveryEvidenceHash(evidence: RecoveryEvidence): string {
  return stableRecoveryHash({
    ...evidence,
    observedAt: undefined,
  });
}

export function recoveryFailureFingerprint(failure: RecoveryFailure): string {
  return stableRecoveryHash({
    module: failure.module,
    category: failure.category,
    code: failure.code,
    rootCauseKey: failure.rootCauseKey,
    operationKey: failure.evidence.operationKey,
    dependencyKey: failure.evidence.dependencyKey,
    inputHash: failure.evidence.inputHash,
    policyRevision: failure.evidence.policyRevision,
    specRevision: failure.evidence.specRevision,
    providerRevision: failure.evidence.providerRevision,
  });
}

export function recoveryKnowledgeKeyMatches(
  expected: RecoveryKnowledgeKey,
  actual: RecoveryKnowledgeKey
): boolean {
  return (
    expected.fingerprint === actual.fingerprint &&
    expected.participantId === actual.participantId &&
    recoveryKnowledgeScopeMatches(expected.scope, actual.scope) &&
    expected.policyRevision === actual.policyRevision &&
    expected.specRevision === actual.specRevision &&
    expected.providerRevision === actual.providerRevision
  );
}

export function recoveryKnowledgeScopeMatches(
  expected: RecoveryKnowledgeScope | undefined,
  actual: RecoveryKnowledgeScope | undefined
): boolean {
  if (!expected || !actual) return expected === actual;
  return (
    expected.tenantId === actual.tenantId &&
    expected.userId === actual.userId &&
    expected.workspaceId === actual.workspaceId &&
    expected.sessionId === actual.sessionId &&
    expected.agentId === actual.agentId &&
    expected.domainPackId === actual.domainPackId
  );
}

export function stableRecoveryHash(value: unknown): string {
  const json = stableRecoveryJson(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < json.length; index += 1) {
    hash ^= json.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function stableRecoveryJson(value: unknown): string {
  return JSON.stringify(normalizeRecoveryValue(value));
}

function normalizeRecoveryValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeRecoveryValue);
  if (!value || typeof value !== 'object') return value;
  return Object.keys(value as Record<string, unknown>)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      const normalized = normalizeRecoveryValue((value as Record<string, unknown>)[key]);
      if (normalized !== undefined) result[key] = normalized;
      return result;
    }, {});
}
