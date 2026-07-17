import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryContractSpecRef,
  MemoryEntityRef,
  MemoryPrincipal,
  MemoryRelation,
  NormalizedMemoryError,
} from './contracts';
import type {
  ManagedMemoryWriteResult,
  MemoryPatch,
  MemoryRejectedItem,
  ProviderHealth,
} from './operations';

export type MemoryExtractionSourceType =
  | 'conversation'
  | 'truth'
  | 'episodic_record'
  | 'runtime_event'
  | 'tool_observation'
  | 'artifact'
  | 'structured_record'
  | 'custom';

export interface MemoryExtractionSourceRef {
  type: MemoryExtractionSourceType;
  sourceId: string;
  sourceVersion?: string;
  sourceHash?: string;
  sessionId?: string;
  runId?: string;
  messageIds?: string[];
  eventIds?: string[];
  artifactRefs?: string[];
  observedAt?: string;
  validFrom?: string;
  validTo?: string;
  authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
  trustScore?: number;
  metadata?: Record<string, unknown>;
}

export interface TruthAssertion {
  assertionId: string;
  subject: string;
  predicate: string;
  object: unknown;
  authority: 'user_confirmed' | 'human_reviewed' | 'system_of_record' | 'policy_defined';
  confidence: number;
  validFrom?: string;
  validTo?: string;
  supersedesAssertionId?: string;
  evidenceRefs: string[];
  metadata?: Record<string, unknown>;
}

export interface EpisodicRecordInput {
  episodeId: string;
  title?: string;
  startAt: string;
  endAt?: string;
  actors?: string[];
  goal?: string;
  actions?: string[];
  observations?: string[];
  outcome?: unknown;
  success?: boolean;
  failureCode?: string;
  causalEventIds?: string[];
  artifactRefs?: string[];
  metadata?: Record<string, unknown>;
}
export interface MemoryExtractionStageSpec {
  id: string;
  type: 'normalize' | 'classify' | 'extract' | 'validate' | 'enrich' | 'custom';
  handlerRef: MemoryContractSpecRef;
  optional?: boolean;
  timeoutMs?: number;
  retryPolicy?: Record<string, unknown>;
}

export interface MemoryExtractionProfileSpec {
  id: string;
  version: string;
  revision?: string;
  acceptedSourceTypes: MemoryExtractionSourceType[];
  outputMemoryTypes: ManagedMemoryType[];
  extractor:
    | { type: 'deterministic'; extractorRef: MemoryContractSpecRef }
    | {
        type: 'model';
        modelProfileRef: MemoryContractSpecRef;
        promptTemplateRef: MemoryContractSpecRef;
      }
    | { type: 'provider'; providerRef: MemoryContractSpecRef }
    | { type: 'hybrid'; stages: MemoryExtractionStageSpec[] };
  conversation?: {
    maxMessagesPerWindow: number;
    overlapMessages?: number;
    includeSystemMessages?: boolean;
    includeToolMessages?: boolean;
    extractionTrigger: 'each_turn' | 'window' | 'run_end' | 'session_idle' | 'manual';
  };
  episodic?: {
    boundary: 'run' | 'workflow_state' | 'task' | 'time_window' | 'custom';
    includeFailedEpisodes?: boolean;
    includeIntermediateObservations?: boolean;
  };
  truth?: {
    minimumAuthority: TruthAssertion['authority'];
    requireEvidence?: boolean;
    preserveValidityInterval?: boolean;
  };
  sensitiveDataPolicyRef?: MemoryContractSpecRef;
  candidateValidation: {
    minConfidence: number;
    requireCanonicalText: boolean;
    requireEvidence: boolean;
    maxCandidatesPerJob?: number;
    rejectInstructionLikeContent?: boolean;
  };
  writePolicyRef: MemoryContractSpecRef;
  maintenancePolicyRef: MemoryContractSpecRef;
  metadata?: Record<string, unknown>;
}

export interface MemoryExtractionRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  profileRef: MemoryContractSpecRef;
  sources: MemoryExtractionSourceRef[];
  mode: 'sync' | 'async';
  force?: boolean;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface MemoryExtractionCursor {
  sourceType: MemoryExtractionSourceType;
  sourceId: string;
  sequence?: number;
  timestamp?: string;
  sourceHash?: string;
  opaqueCursor?: string;
}

export interface MemoryExtractionJob {
  id: string;
  operationId: string;
  scopeHash: string;
  profileRef: MemoryContractSpecRef;
  profileRevision: string;
  sourceRefs: MemoryExtractionSourceRef[];
  status:
    | 'queued'
    | 'running'
    | 'awaiting_review'
    | 'completed'
    | 'partial'
    | 'failed'
    | 'cancelled';
  cursorBefore?: MemoryExtractionCursor;
  cursorAfter?: MemoryExtractionCursor;
  attempts: number;
  leaseOwner?: string;
  leaseExpiresAt?: string;
  lastError?: NormalizedMemoryError;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ExtractedMemoryEvidence {
  sourceRef: MemoryExtractionSourceRef;
  sourceSpan?: {
    messageId?: string;
    eventId?: string;
    artifactRef?: string;
    start?: number;
    end?: number;
    quoteHash?: string;
  };
  supportType: 'direct' | 'derived' | 'contradicting';
  confidence?: number;
}

export interface ExtractedMemoryCandidate {
  candidateId: string;
  type: ManagedMemoryType;
  content: unknown;
  canonicalText: string;
  summary?: string;
  confidence: number;
  importance?: number;
  canonicalKey?: string;
  subject?: string;
  predicate?: string;
  object?: unknown;
  temporal?: {
    observedAt?: string;
    validFrom?: string;
    validTo?: string;
    temporalConfidence?: number;
  };
  entities?: MemoryEntityRef[];
  relations?: MemoryRelation[];
  sensitive?: boolean;
  authority?: MemoryExtractionSourceRef['authority'];
  evidence: ExtractedMemoryEvidence[];
  extractionRationale?: string;
  extractionProfileRevision: string;
  sourceHash: string;
}

export interface MemoryExtractionBatch {
  id: string;
  jobId: string;
  sourceRefs: MemoryExtractionSourceRef[];
  candidates: ExtractedMemoryCandidate[];
  rejectedCandidates: MemoryRejectedItem[];
  sourceHash: string;
  extractorVersion: string;
  modelObservationRef?: string;
  createdAt: string;
}

export interface NormalizedExtractionInput {
  sourceRef: MemoryExtractionSourceRef;
  value: unknown;
  canonicalText?: string;
}

export interface MemoryExtractionSourceBatch<T = unknown> {
  sourceRefs: MemoryExtractionSourceRef[];
  items: Array<{ sourceRef: MemoryExtractionSourceRef; value: T }>;
  nextCursor?: MemoryExtractionCursor;
}

export interface MemoryExtractionSourceAdapter<T = unknown> {
  readonly type: MemoryExtractionSourceType;
  load(
    refs: MemoryExtractionSourceRef[],
    cursor?: MemoryExtractionCursor
  ): Promise<MemoryExtractionSourceBatch<T>>;
  normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]>;
  health(): Promise<ProviderHealth>;
}

export interface MemoryExtractor {
  readonly id: string;
  extract(
    inputs: NormalizedExtractionInput[],
    profile: MemoryExtractionProfileSpec
  ): Promise<ExtractedMemoryCandidate[]>;
  health(): Promise<ProviderHealth>;
}

export type MemoryMaintenanceAction =
  | 'create'
  | 'noop'
  | 'reuse'
  | 'update'
  | 'merge'
  | 'supersede'
  | 'invalidate'
  | 'reject'
  | 'require_review';

export interface MemoryMaintenancePolicySpec {
  id: string;
  version: string;
  revision?: string;
  preWriteRetrieval: {
    enabled: boolean;
    exactKeyLookup: boolean;
    semanticLookup?: boolean;
    maxCandidates: number;
    semanticThreshold?: number;
    includeSuperseded?: boolean;
    includeInvalidated?: boolean;
  };
  duplicateResolution: 'reuse_existing' | 'increase_support' | 'create_version' | 'require_review';
  updateResolution: 'patch_current' | 'create_version' | 'supersede' | 'require_review';
  conflictResolution:
    | 'keep_both_marked'
    | 'prefer_authoritative'
    | 'prefer_verified'
    | 'prefer_latest'
    | 'invalidate_old'
    | 'require_review';
  metadata?: Record<string, unknown>;
}

export interface MemoryMaintenanceDecision {
  id: string;
  operationId: string;
  candidateId: string;
  scopeHash: string;
  action: MemoryMaintenanceAction;
  targetMemoryIds: string[];
  expectedRevisions: Record<string, number>;
  duplicateScore?: number;
  conflictScore?: number;
  authorityComparison?: 'candidate_higher' | 'existing_higher' | 'equal' | 'unknown';
  mergedContent?: unknown;
  patch?: MemoryPatch;
  relationsToCreate?: MemoryRelation[];
  recordsToInvalidate?: string[];
  reasonCode:
    | 'NEW_FACT'
    | 'EXACT_DUPLICATE'
    | 'SEMANTIC_DUPLICATE'
    | 'ADDITIONAL_EVIDENCE'
    | 'FACT_CORRECTION'
    | 'TEMPORAL_UPDATE'
    | 'AUTHORITY_OVERRIDE'
    | 'CONFLICT_REQUIRES_REVIEW'
    | 'LOW_CONFIDENCE'
    | 'POLICY_REJECTED'
    | 'CUSTOM';
  explanation?: string;
  policyRevision: string;
  createdAt: string;
}

export interface MemoryMaintenancePlanRequest {
  operationId: string;
  scope: ManagedMemoryScope;
  candidate: ExtractedMemoryCandidate;
  existingRecords: ManagedMemoryRecord[];
  policy: MemoryMaintenancePolicySpec;
}

export interface MemoryMaintenanceApplyRequest {
  decision: MemoryMaintenanceDecision;
  candidate: ExtractedMemoryCandidate;
  scope: ManagedMemoryScope;
}

export interface MemoryMaintenancePlanner {
  plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision>;
  apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult>;
  explain(decisionId: string): Promise<MemoryMaintenanceDecision | null>;
}
