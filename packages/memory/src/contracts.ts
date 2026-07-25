import type { SpecRef } from '@hypha/core';

export interface MemoryContractSpecRef extends SpecRef {
  revision?: string;
}

export interface ManagedMemoryScope {
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  projectId?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  domainPackId?: string;
}

export interface MemoryPrincipal {
  principalId: string;
  type: 'user' | 'agent' | 'service' | 'system';
  tenantId?: string;
  userId?: string;
  agentId?: string;
  roles?: string[];
  permissionScopes: string[];
  metadata?: Record<string, unknown>;
}

export type ManagedMemoryType =
  | 'working'
  | 'episodic'
  | 'semantic'
  | 'procedural'
  | 'preference'
  | 'artifact'
  | 'governance'
  | 'reflection'
  | 'custom';

export type MemoryStatus =
  | 'pending'
  | 'active'
  | 'dormant'
  | 'superseded'
  | 'invalidated'
  | 'deletion_pending'
  | 'deleted'
  | 'failed';

export interface MemorySource {
  type:
    | 'user_message'
    | 'assistant_message'
    | 'tool_result'
    | 'artifact'
    | 'workflow_state'
    | 'human_review'
    | 'import'
    | 'derived'
    | 'system';
  sourceId?: string;
  sourceEventId?: string;
  sourceRunId?: string;
  sourceMessageId?: string;
  sourceArtifactId?: string;
}

export interface MemoryProvenance {
  createdBy: string;
  providerId: string;
  extractorVersion?: string;
  sourceEventIds?: string[];
  sourceMemoryIds?: string[];
  transformation?: string;
  humanDecisionId?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface MemoryEntityRef {
  entityId: string;
  label?: string;
  type?: string;
  confidence?: number;
}

export interface MemoryRelation {
  type:
    | 'supports'
    | 'contradicts'
    | 'supersedes'
    | 'derived_from'
    | 'related_to'
    | 'same_as'
    | 'part_of';
  targetMemoryId: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface MemoryIndexStatus {
  state: 'none' | 'pending' | 'indexing' | 'indexed' | 'partial' | 'failed' | 'deleted';
  attempts: number;
  lastAttemptAt?: string;
  lastError?: NormalizedMemoryError;
}

export interface MemoryVectorRef {
  vectorStoreId: string;
  indexName: string;
  vectorId: string;
  embeddingProviderId: string;
  embeddingModel: string;
  embeddingRevision?: string;
  dimensions?: number;
  indexedAt: string;
}

export interface ManagedMemoryRecord<TContent = unknown> {
  id: string;
  versionId: string;
  revision: number;
  type: ManagedMemoryType;
  subtype?: string;
  content: TContent;
  canonicalText?: string;
  summary?: string;
  language?: string;
  scope: ManagedMemoryScope;
  visibility: 'private' | 'session' | 'workspace' | 'tenant' | 'shared';
  source: MemorySource;
  provenance: MemoryProvenance;
  confidence?: number;
  importance?: number;
  strength?: number;
  salience?: number;
  accessCount: number;
  lastAccessedAt?: string;
  lastReinforcedAt?: string;
  decayScore?: number;
  status: MemoryStatus;
  immutable?: boolean;
  humanVerified?: boolean;
  sensitive?: boolean;
  tags?: string[];
  entities?: MemoryEntityRef[];
  relations?: MemoryRelation[];
  indexStatus: MemoryIndexStatus;
  vectorRefs?: MemoryVectorRef[];
  artifactRefs?: string[];
  contentHash: string;
  scopeHash: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface MemoryScopePolicySpec {
  requiredDimensions: Array<keyof ManagedMemoryScope>;
  allowedReadScopes: Array<keyof ManagedMemoryScope>;
  allowedWriteScopes: Array<keyof ManagedMemoryScope>;
  inheritanceOrder?: Array<keyof ManagedMemoryScope>;
  crossUserRead?: 'deny' | 'policy';
  crossWorkspaceRead?: 'deny' | 'policy';
  enforceTenantBoundary?: boolean;
}

export interface MemoryRetrievalPolicySpec {
  defaultMode: 'structured' | 'semantic' | 'keyword' | 'hybrid';
  maxCandidates: number;
  defaultTopK: number;
  scoreThreshold?: number;
  memoryTypePriority?: Partial<Record<ManagedMemoryType, number>>;
  sourcePriority?: Partial<Record<MemorySource['type'], number>>;
  recencyWeight?: number;
  importanceWeight?: number;
  confidenceWeight?: number;
  reinforcementWeight?: number;
  deduplication: 'none' | 'id' | 'hash' | 'semantic';
  semanticDedupThreshold?: number;
  conflictHandling?: 'include_marked' | 'prefer_latest' | 'prefer_verified' | 'exclude_conflicts';
  rerank?: 'none' | 'score_fusion' | 'provider' | 'custom';
}

export interface MemoryWritePolicySpec {
  allowedTypes: ManagedMemoryType[];
  autoCaptureSources?: MemorySource['type'][];
  requireHumanVerificationFor?: ManagedMemoryType[];
  minConfidence?: number;
  deduplicateBeforeWrite?: boolean;
  conflictDetection?: boolean;
  immutableTypes?: ManagedMemoryType[];
  maxContentBytes?: number;
  sensitiveDataMode?: 'reject' | 'redact' | 'encrypt' | 'allow_by_policy';
}

export interface MemoryRetentionPolicySpec {
  defaultTtlSeconds?: number;
  ttlByType?: Partial<Record<ManagedMemoryType, number>>;
  archiveAfterSeconds?: number;
  deleteAfterSeconds?: number;
  retainHistory?: boolean;
  maxVersions?: number;
  legalHoldSupported?: boolean;
  deletionMode?: 'soft' | 'hard';
}

export interface MemoryConsolidationPolicySpec {
  enabled: boolean;
  trigger: 'scheduled' | 'count' | 'token_pressure' | 'manual';
  minRecords?: number;
  intervalSeconds?: number;
  similarityThreshold?: number;
  preserveSourceRecords?: boolean;
  summaryMemoryType?: ManagedMemoryType;
  requireVerification?: boolean;
}

export interface MemoryConflictPolicySpec {
  detectOnWrite: boolean;
  matchingMode: 'same_key' | 'semantic' | 'entity_relation' | 'custom';
  resolution: 'keep_both' | 'prefer_latest' | 'prefer_verified' | 'require_human' | 'custom';
  markRelations?: boolean;
}

export interface MemoryPrivacyPolicySpec {
  sensitiveDataMode: 'reject' | 'redact' | 'encrypt' | 'allow_by_policy';
  encryptionRef?: MemoryContractSpecRef;
  redactFields?: string[];
  allowCrossUserRead?: boolean;
  allowCrossWorkspaceRead?: boolean;
  complianceDelete?: boolean;
}

export interface MemoryIndexingPolicySpec {
  mode: 'sync' | 'async_outbox' | 'disabled';
  batchSize?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
  deadLetterAfterAttempts?: number;
  rebuildable: boolean;
}

export interface MemoryFallbackPolicySpec {
  onProviderUnavailable: 'fail' | 'native' | 'record_store_only' | 'skip';
  onVectorUnavailable: 'structured_only' | 'keyword' | 'fail';
  onRerankerUnavailable: 'score_fusion' | 'no_rerank' | 'fail';
  maxFallbackDepth?: number;
}

export interface MemoryManagementCapabilities {
  add: boolean;
  search: boolean;
  get: boolean;
  list: boolean;
  update: boolean;
  delete: boolean;
  deleteByFilter: boolean;
  history: boolean;
  summarize: boolean;
  consolidate: boolean;
  decay: boolean;
  reinforce: boolean;
  conflictDetection: boolean;
  hybridSearch: boolean;
  graphRelations: boolean;
  asyncWrite: boolean;
  batchOperations: boolean;
}

export interface MemoryManagementProviderSpec {
  id: string;
  version: string;
  revision?: string;
  name?: string;
  type: 'native' | 'mem0' | 'memorybank' | 'custom';
  deployment: 'embedded' | 'local' | 'self_hosted' | 'managed' | 'remote';
  connectionRef?: string;
  config?: Record<string, unknown>;
  capabilities: MemoryManagementCapabilities;
  timeoutPolicy?: {
    timeoutMs: number;
    operationTimeouts?: Partial<
      Record<'add' | 'search' | 'get' | 'list' | 'update' | 'delete', number>
    >;
  };
  retryPolicy?: {
    maxAttempts: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoff?: 'fixed' | 'exponential';
  };
  circuitBreakerPolicy?: {
    failureThreshold: number;
    resetAfterMs: number;
  };
  healthCheckPolicy?: {
    intervalMs?: number;
    timeoutMs?: number;
  };
  metadata?: Record<string, unknown>;
}

export interface WorkingMemoryStoreSpec {
  id: string;
  version: string;
  type: 'in_memory' | 'redis' | 'custom';
  connectionRef?: string;
  namespace?: string;
  defaultTtlSeconds?: number;
  maxItemBytes?: number;
  serialization?: 'json' | 'msgpack';
  encryptionRef?: string;
  metadata?: Record<string, unknown>;
}

export interface EmbeddingProviderSpec {
  id: string;
  version: string;
  provider: string;
  model: string;
  dimensions?: number;
  normalized?: boolean;
  maxBatchSize?: number;
  maxInputTokens?: number;
  connectionRef?: string;
  timeoutMs?: number;
  metadata?: Record<string, unknown>;
}

export interface MemoryRecordStoreSpec {
  id: string;
  version: string;
  type: 'mongodb' | 'sqlite' | 'postgres' | 'custom';
  connectionRef?: string;
  database?: string;
  collectionOrTable?: string;
  transactional?: boolean;
  historyMode?: 'embedded_versions' | 'separate_versions' | 'event_projection';
  encryptionRef?: string;
  metadata?: Record<string, unknown>;
}

export interface VectorStoreCapabilities {
  denseSearch: boolean;
  sparseSearch: boolean;
  hybridSearch: boolean;
  metadataFilter: boolean;
  fullTextFilter: boolean;
  namespaces: boolean;
  multiVector: boolean;
  batchUpsert: boolean;
  deleteByFilter: boolean;
  payloadUpdate: boolean;
  scoreThreshold: boolean;
  localDeployment: boolean;
}

export interface VectorStoreSpec {
  id: string;
  version: string;
  type: 'local' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'pgvector' | 'custom';
  connectionRef?: string;
  collection: string;
  namespaceStrategy?: 'scope_hash' | 'metadata_filter' | 'collection_per_tenant';
  dimensions?: number;
  distance?: 'cosine' | 'dot' | 'l2';
  indexType?: string;
  capabilities: VectorStoreCapabilities;
  writeMode?: 'sync' | 'async_outbox' | 'dual_write';
  metadata?: Record<string, unknown>;
}

export interface MemoryProfileSpec {
  id: string;
  version: string;
  revision?: string;
  name?: string;
  description?: string;
  enabled?: boolean;
  managementProviderRef: MemoryContractSpecRef;
  workingStoreRef?: MemoryContractSpecRef;
  recordStoreRef: MemoryContractSpecRef;
  vectorStoreRefs?: MemoryContractSpecRef[];
  artifactStoreRef?: MemoryContractSpecRef;
  embeddingProviderRef?: MemoryContractSpecRef;
  rerankerProviderRef?: MemoryContractSpecRef;
  scopePolicy: MemoryScopePolicySpec;
  retrievalPolicy: MemoryRetrievalPolicySpec;
  writePolicy: MemoryWritePolicySpec;
  retentionPolicy: MemoryRetentionPolicySpec;
  consolidationPolicy?: MemoryConsolidationPolicySpec;
  conflictPolicy?: MemoryConflictPolicySpec;
  fallbackPolicy?: MemoryFallbackPolicySpec;
  privacyPolicy?: MemoryPrivacyPolicySpec;
  indexingPolicy?: MemoryIndexingPolicySpec;
  contextProfileRef?: MemoryContractSpecRef;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface NormalizedMemoryError {
  code:
    | 'MEMORY_INVALID_INPUT'
    | 'MEMORY_EXTRACTION_SOURCE_UNAVAILABLE'
    | 'MEMORY_EXTRACTION_FAILED'
    | 'MEMORY_EXTRACTION_CURSOR_CONFLICT'
    | 'MEMORY_MAINTENANCE_CONFLICT'
    | 'MEMORY_RANKING_FAILED'
    | 'MEMORY_IDEMPOTENCY_CONFLICT'
    | 'MEMORY_SCOPE_DENIED'
    | 'MEMORY_PERMISSION_DENIED'
    | 'MEMORY_NOT_FOUND'
    | 'MEMORY_REVISION_CONFLICT'
    | 'MEMORY_PROVIDER_NOT_INSTALLED'
    | 'MEMORY_PROVIDER_UNAVAILABLE'
    | 'MEMORY_PROVIDER_TIMEOUT'
    | 'MEMORY_STORE_UNAVAILABLE'
    | 'MEMORY_VECTOR_UNAVAILABLE'
    | 'MEMORY_INDEX_FAILED'
    | 'MEMORY_DELETE_PARTIAL'
    | 'MEMORY_POLICY_REJECTED'
    | 'MEMORY_CONTEXT_BUDGET_EXCEEDED'
    | 'MEMORY_INTERNAL_ERROR';
  message: string;
  retryable: boolean;
  providerCode?: string;
  details?: Record<string, unknown>;
  causeRef?: string;
}
