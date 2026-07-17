import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  specRefSchema,
  versionedSpecSchema,
  type JsonSchema,
} from '@hypha/core';
import { managedMemoryTypeSchema, memorySourceSchema } from './record-contract';
import type {
  EmbeddingProviderSpec,
  MemoryConflictPolicySpec,
  MemoryConsolidationPolicySpec,
  MemoryContractSpecRef,
  MemoryFallbackPolicySpec,
  MemoryIndexingPolicySpec,
  MemoryPrivacyPolicySpec,
  MemoryManagementCapabilities,
  MemoryManagementProviderSpec,
  MemoryProfileSpec,
  MemoryRecordStoreSpec,
  MemoryRetrievalPolicySpec,
  MemoryRetentionPolicySpec,
  MemoryScopePolicySpec,
  MemoryWritePolicySpec,
  VectorStoreCapabilities,
  VectorStoreSpec,
  WorkingMemoryStoreSpec,
} from './contracts';

const metadataSchema = z.record(z.unknown());
const unitIntervalSchema = z.number().min(0).max(1);

export const memoryContractSpecRefSchema = specRefSchema.extend({
  revision: z.string().min(1).optional(),
}) satisfies ZodType<MemoryContractSpecRef>;

const scopeDimensionSchema = z.enum([
  'tenantId',
  'userId',
  'workspaceId',
  'projectId',
  'sessionId',
  'runId',
  'agentId',
  'domainPackId',
]);

export const memoryScopePolicySpecSchema: ZodType<MemoryScopePolicySpec> = z.object({
  requiredDimensions: z.array(scopeDimensionSchema).min(1),
  allowedReadScopes: z.array(scopeDimensionSchema).min(1),
  allowedWriteScopes: z.array(scopeDimensionSchema).min(1),
  inheritanceOrder: z.array(scopeDimensionSchema).optional(),
  crossUserRead: z.enum(['deny', 'policy']).optional(),
  crossWorkspaceRead: z.enum(['deny', 'policy']).optional(),
  enforceTenantBoundary: z.boolean().optional(),
});

export const memoryRetrievalPolicySpecSchema: ZodType<MemoryRetrievalPolicySpec> = z.object({
  defaultMode: z.enum(['structured', 'semantic', 'keyword', 'hybrid']),
  maxCandidates: z.number().int().positive(),
  defaultTopK: z.number().int().positive(),
  scoreThreshold: unitIntervalSchema.optional(),
  memoryTypePriority: z.record(managedMemoryTypeSchema, z.number()).optional(),
  sourcePriority: z.record(memorySourceSchema.shape.type, z.number()).optional(),
  recencyWeight: z.number().min(0).optional(),
  importanceWeight: z.number().min(0).optional(),
  confidenceWeight: z.number().min(0).optional(),
  reinforcementWeight: z.number().min(0).optional(),
  deduplication: z.enum(['none', 'id', 'hash', 'semantic']),
  semanticDedupThreshold: unitIntervalSchema.optional(),
  conflictHandling: z
    .enum(['include_marked', 'prefer_latest', 'prefer_verified', 'exclude_conflicts'])
    .optional(),
  rerank: z.enum(['none', 'score_fusion', 'provider', 'custom']).optional(),
});

export const memoryWritePolicySpecSchema: ZodType<MemoryWritePolicySpec> = z.object({
  allowedTypes: z.array(managedMemoryTypeSchema).min(1),
  autoCaptureSources: z.array(memorySourceSchema.shape.type).optional(),
  requireHumanVerificationFor: z.array(managedMemoryTypeSchema).optional(),
  minConfidence: unitIntervalSchema.optional(),
  deduplicateBeforeWrite: z.boolean().optional(),
  conflictDetection: z.boolean().optional(),
  immutableTypes: z.array(managedMemoryTypeSchema).optional(),
  maxContentBytes: z.number().int().positive().optional(),
  sensitiveDataMode: z.enum(['reject', 'redact', 'encrypt', 'allow_by_policy']).optional(),
});

export const memoryRetentionPolicySpecSchema: ZodType<MemoryRetentionPolicySpec> = z.object({
  defaultTtlSeconds: z.number().int().positive().optional(),
  ttlByType: z.record(managedMemoryTypeSchema, z.number().int().positive()).optional(),
  archiveAfterSeconds: z.number().int().positive().optional(),
  deleteAfterSeconds: z.number().int().positive().optional(),
  retainHistory: z.boolean().optional(),
  maxVersions: z.number().int().positive().optional(),
  legalHoldSupported: z.boolean().optional(),
  deletionMode: z.enum(['soft', 'hard']).optional(),
});

export const memoryConsolidationPolicySpecSchema: ZodType<MemoryConsolidationPolicySpec> = z.object(
  {
    enabled: z.boolean(),
    trigger: z.enum(['scheduled', 'count', 'token_pressure', 'manual']),
    minRecords: z.number().int().positive().optional(),
    intervalSeconds: z.number().int().positive().optional(),
    similarityThreshold: unitIntervalSchema.optional(),
    preserveSourceRecords: z.boolean().optional(),
    summaryMemoryType: managedMemoryTypeSchema.optional(),
    requireVerification: z.boolean().optional(),
  }
);

export const memoryConflictPolicySpecSchema: ZodType<MemoryConflictPolicySpec> = z.object({
  detectOnWrite: z.boolean(),
  matchingMode: z.enum(['same_key', 'semantic', 'entity_relation', 'custom']),
  resolution: z.enum(['keep_both', 'prefer_latest', 'prefer_verified', 'require_human', 'custom']),
  markRelations: z.boolean().optional(),
});

export const memoryPrivacyPolicySpecSchema: ZodType<MemoryPrivacyPolicySpec> = z.object({
  sensitiveDataMode: z.enum(['reject', 'redact', 'encrypt', 'allow_by_policy']),
  encryptionRef: memoryContractSpecRefSchema.optional(),
  redactFields: z.array(z.string()).optional(),
  allowCrossUserRead: z.boolean().optional(),
  allowCrossWorkspaceRead: z.boolean().optional(),
  complianceDelete: z.boolean().optional(),
});

export const memoryIndexingPolicySpecSchema: ZodType<MemoryIndexingPolicySpec> = z.object({
  mode: z.enum(['sync', 'async_outbox', 'disabled']),
  batchSize: z.number().int().positive().optional(),
  maxAttempts: z.number().int().positive().optional(),
  retryDelayMs: z.number().int().min(0).optional(),
  deadLetterAfterAttempts: z.number().int().positive().optional(),
  rebuildable: z.boolean(),
});

export const memoryFallbackPolicySpecSchema: ZodType<MemoryFallbackPolicySpec> = z.object({
  onProviderUnavailable: z.enum(['fail', 'native', 'record_store_only', 'skip']),
  onVectorUnavailable: z.enum(['structured_only', 'keyword', 'fail']),
  onRerankerUnavailable: z.enum(['score_fusion', 'no_rerank', 'fail']),
  maxFallbackDepth: z.number().int().min(0).optional(),
});

export const memoryManagementCapabilitiesSchema: ZodType<MemoryManagementCapabilities> = z.object({
  add: z.boolean(),
  search: z.boolean(),
  get: z.boolean(),
  list: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
  deleteByFilter: z.boolean(),
  history: z.boolean(),
  summarize: z.boolean(),
  consolidate: z.boolean(),
  decay: z.boolean(),
  reinforce: z.boolean(),
  conflictDetection: z.boolean(),
  hybridSearch: z.boolean(),
  graphRelations: z.boolean(),
  asyncWrite: z.boolean(),
  batchOperations: z.boolean(),
});

export const memoryManagementProviderSpecSchema: ZodType<MemoryManagementProviderSpec> =
  versionedSpecSchema.extend({
    revision: z.string().optional(),
    name: z.string().optional(),
    type: z.enum(['native', 'mem0', 'memorybank', 'custom']),
    deployment: z.enum(['embedded', 'local', 'self_hosted', 'managed', 'remote']),
    connectionRef: z.string().optional(),
    config: metadataSchema.optional(),
    capabilities: memoryManagementCapabilitiesSchema,
    timeoutPolicy: z
      .object({
        timeoutMs: z.number().int().positive(),
        operationTimeouts: z
          .record(
            z.enum(['add', 'search', 'get', 'list', 'update', 'delete']),
            z.number().int().positive()
          )
          .optional(),
      })
      .optional(),
    retryPolicy: z
      .object({
        maxAttempts: z.number().int().positive(),
        initialDelayMs: z.number().int().min(0).optional(),
        maxDelayMs: z.number().int().min(0).optional(),
        backoff: z.enum(['fixed', 'exponential']).optional(),
      })
      .optional(),
    circuitBreakerPolicy: z
      .object({
        failureThreshold: z.number().int().positive(),
        resetAfterMs: z.number().int().positive(),
      })
      .optional(),
    healthCheckPolicy: z
      .object({
        intervalMs: z.number().int().positive().optional(),
        timeoutMs: z.number().int().positive().optional(),
      })
      .optional(),
    metadata: metadataSchema.optional(),
  });

export const workingMemoryStoreSpecSchema: ZodType<WorkingMemoryStoreSpec> =
  versionedSpecSchema.extend({
    type: z.enum(['in_memory', 'redis', 'custom']),
    connectionRef: z.string().optional(),
    namespace: z.string().optional(),
    defaultTtlSeconds: z.number().int().positive().optional(),
    maxItemBytes: z.number().int().positive().optional(),
    serialization: z.enum(['json', 'msgpack']).optional(),
    encryptionRef: z.string().optional(),
    metadata: metadataSchema.optional(),
  });

export const embeddingProviderSpecSchema: ZodType<EmbeddingProviderSpec> =
  versionedSpecSchema.extend({
    provider: z.string().min(1),
    model: z.string().min(1),
    dimensions: z.number().int().positive().optional(),
    normalized: z.boolean().optional(),
    maxBatchSize: z.number().int().positive().optional(),
    maxInputTokens: z.number().int().positive().optional(),
    connectionRef: z.string().optional(),
    timeoutMs: z.number().int().positive().optional(),
    metadata: metadataSchema.optional(),
  });

export const memoryRecordStoreSpecSchema: ZodType<MemoryRecordStoreSpec> =
  versionedSpecSchema.extend({
    type: z.enum(['mongodb', 'sqlite', 'postgres', 'custom']),
    connectionRef: z.string().optional(),
    database: z.string().optional(),
    collectionOrTable: z.string().optional(),
    transactional: z.boolean().optional(),
    historyMode: z.enum(['embedded_versions', 'separate_versions', 'event_projection']).optional(),
    encryptionRef: z.string().optional(),
    metadata: metadataSchema.optional(),
  });

export const vectorStoreCapabilitiesSchema: ZodType<VectorStoreCapabilities> = z.object({
  denseSearch: z.boolean(),
  sparseSearch: z.boolean(),
  hybridSearch: z.boolean(),
  metadataFilter: z.boolean(),
  fullTextFilter: z.boolean(),
  namespaces: z.boolean(),
  multiVector: z.boolean(),
  batchUpsert: z.boolean(),
  deleteByFilter: z.boolean(),
  payloadUpdate: z.boolean(),
  scoreThreshold: z.boolean(),
  localDeployment: z.boolean(),
});

export const vectorStoreSpecSchema: ZodType<VectorStoreSpec> = versionedSpecSchema.extend({
  type: z.enum(['local', 'qdrant', 'milvus', 'chroma', 'pinecone', 'pgvector', 'custom']),
  connectionRef: z.string().optional(),
  collection: z.string().min(1),
  namespaceStrategy: z.enum(['scope_hash', 'metadata_filter', 'collection_per_tenant']).optional(),
  dimensions: z.number().int().positive().optional(),
  distance: z.enum(['cosine', 'dot', 'l2']).optional(),
  indexType: z.string().optional(),
  capabilities: vectorStoreCapabilitiesSchema,
  writeMode: z.enum(['sync', 'async_outbox', 'dual_write']).optional(),
  metadata: metadataSchema.optional(),
});

export const memoryProfileSpecSchema: ZodType<MemoryProfileSpec> = versionedSpecSchema.extend({
  revision: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  managementProviderRef: memoryContractSpecRefSchema,
  workingStoreRef: memoryContractSpecRefSchema.optional(),
  recordStoreRef: memoryContractSpecRefSchema,
  vectorStoreRefs: z.array(memoryContractSpecRefSchema).optional(),
  artifactStoreRef: memoryContractSpecRefSchema.optional(),
  embeddingProviderRef: memoryContractSpecRefSchema.optional(),
  rerankerProviderRef: memoryContractSpecRefSchema.optional(),
  scopePolicy: memoryScopePolicySpecSchema,
  retrievalPolicy: memoryRetrievalPolicySpecSchema,
  writePolicy: memoryWritePolicySpecSchema,
  retentionPolicy: memoryRetentionPolicySpecSchema,
  consolidationPolicy: memoryConsolidationPolicySpecSchema.optional(),
  conflictPolicy: memoryConflictPolicySpecSchema.optional(),
  fallbackPolicy: memoryFallbackPolicySpecSchema.optional(),
  privacyPolicy: memoryPrivacyPolicySpecSchema.optional(),
  indexingPolicy: memoryIndexingPolicySpecSchema.optional(),
  contextProfileRef: memoryContractSpecRefSchema.optional(),
  tags: z.array(z.string()).optional(),
  metadata: metadataSchema.optional(),
});

const allCapabilities: MemoryManagementCapabilities = {
  add: true,
  search: true,
  get: true,
  list: true,
  update: true,
  delete: true,
  deleteByFilter: true,
  history: true,
  summarize: true,
  consolidate: true,
  decay: true,
  reinforce: true,
  conflictDetection: true,
  hybridSearch: true,
  graphRelations: true,
  asyncWrite: true,
  batchOperations: true,
};

export const memoryManagementProviderSpecExample: MemoryManagementProviderSpec = {
  id: 'memory.provider.native',
  version: '1.0.0',
  revision: 'native-v1',
  type: 'native',
  deployment: 'embedded',
  capabilities: allCapabilities,
};

export const memoryProfileSpecExample: MemoryProfileSpec = {
  id: 'memory.default',
  version: '1.0.0',
  revision: 'memory-default-v1',
  enabled: true,
  managementProviderRef: { id: 'memory.provider.native', version: '1.0.0' },
  recordStoreRef: { id: 'memory.store.record.sqlite', version: '1.0.0' },
  vectorStoreRefs: [{ id: 'memory.vector.local', version: '1.0.0' }],
  scopePolicy: {
    requiredDimensions: ['userId'],
    allowedReadScopes: ['userId', 'workspaceId', 'sessionId', 'runId'],
    allowedWriteScopes: ['userId', 'workspaceId', 'sessionId', 'runId'],
    crossUserRead: 'deny',
    crossWorkspaceRead: 'deny',
    enforceTenantBoundary: true,
  },
  retrievalPolicy: {
    defaultMode: 'hybrid',
    maxCandidates: 100,
    defaultTopK: 10,
    deduplication: 'hash',
    conflictHandling: 'prefer_verified',
    rerank: 'score_fusion',
  },
  writePolicy: {
    allowedTypes: ['working', 'episodic', 'semantic', 'procedural', 'preference', 'artifact'],
    deduplicateBeforeWrite: true,
    conflictDetection: true,
    sensitiveDataMode: 'reject',
  },
  retentionPolicy: {
    retainHistory: true,
    legalHoldSupported: true,
    deletionMode: 'soft',
  },
  fallbackPolicy: {
    onProviderUnavailable: 'record_store_only',
    onVectorUnavailable: 'structured_only',
    onRerankerUnavailable: 'score_fusion',
    maxFallbackDepth: 1,
  },
};

const providerJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'type', 'deployment', 'capabilities'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    revision: { type: 'string' },
    name: { type: 'string' },
    type: { enum: ['native', 'mem0', 'memorybank', 'custom'] },
    deployment: { enum: ['embedded', 'local', 'self_hosted', 'managed', 'remote'] },
    connectionRef: { type: 'string' },
    config: { type: 'object' },
    capabilities: { type: 'object' },
    timeoutPolicy: { type: 'object' },
    retryPolicy: { type: 'object' },
    circuitBreakerPolicy: { type: 'object' },
    healthCheckPolicy: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const memoryProfileSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'managementProviderRef',
    'recordStoreRef',
    'scopePolicy',
    'retrievalPolicy',
    'writePolicy',
    'retentionPolicy',
  ],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    revision: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    enabled: { type: 'boolean' },
    managementProviderRef: { type: 'object' },
    workingStoreRef: { type: 'object' },
    recordStoreRef: { type: 'object' },
    vectorStoreRefs: { type: 'array', items: { type: 'object' } },
    artifactStoreRef: { type: 'object' },
    embeddingProviderRef: { type: 'object' },
    rerankerProviderRef: { type: 'object' },
    scopePolicy: { type: 'object' },
    retrievalPolicy: { type: 'object' },
    writePolicy: { type: 'object' },
    retentionPolicy: { type: 'object' },
    consolidationPolicy: { type: 'object' },
    conflictPolicy: { type: 'object' },
    fallbackPolicy: { type: 'object' },
    privacyPolicy: { type: 'object' },
    indexingPolicy: { type: 'object' },
    contextProfileRef: { type: 'object' },
    tags: { type: 'array', items: { type: 'string' } },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec = {
  id: 'memory.store.working.redis',
  version: '1.0.0',
  type: 'redis',
  connectionRef: 'storage.redis.working',
  namespace: 'hypha:memory:working',
  defaultTtlSeconds: 3600,
  serialization: 'json',
};

export const memoryRecordStoreSpecExample: MemoryRecordStoreSpec = {
  id: 'memory.store.record.sqlite',
  version: '1.0.0',
  type: 'sqlite',
  connectionRef: 'storage.sqlite.structured',
  collectionOrTable: 'memory_records',
  transactional: true,
  historyMode: 'separate_versions',
};

export const vectorStoreSpecExample: VectorStoreSpec = {
  id: 'memory.vector.local',
  version: '1.0.0',
  type: 'local',
  collection: 'memory_vectors',
  namespaceStrategy: 'scope_hash',
  distance: 'cosine',
  capabilities: {
    denseSearch: true,
    sparseSearch: false,
    hybridSearch: false,
    metadataFilter: true,
    fullTextFilter: false,
    namespaces: true,
    multiVector: false,
    batchUpsert: true,
    deleteByFilter: true,
    payloadUpdate: true,
    scoreThreshold: true,
    localDeployment: true,
  },
  writeMode: 'async_outbox',
};

export const embeddingProviderSpecExample: EmbeddingProviderSpec = {
  id: 'memory.embedding.default',
  version: '1.0.0',
  provider: 'local',
  model: 'deterministic-fixture',
  dimensions: 3,
  normalized: true,
  maxBatchSize: 64,
};

const workingMemoryStoreSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'type'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    type: { enum: ['in_memory', 'redis', 'custom'] },
    connectionRef: { type: 'string' },
    namespace: { type: 'string' },
    defaultTtlSeconds: { type: 'integer' },
    maxItemBytes: { type: 'integer' },
    serialization: { enum: ['json', 'msgpack'] },
    encryptionRef: { type: 'string' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

const memoryRecordStoreSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'type'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    type: { enum: ['mongodb', 'sqlite', 'postgres', 'custom'] },
    connectionRef: { type: 'string' },
    database: { type: 'string' },
    collectionOrTable: { type: 'string' },
    transactional: { type: 'boolean' },
    historyMode: { enum: ['embedded_versions', 'separate_versions', 'event_projection'] },
    encryptionRef: { type: 'string' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

const vectorStoreSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'type', 'collection', 'capabilities'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    type: { enum: ['local', 'qdrant', 'milvus', 'chroma', 'pinecone', 'pgvector', 'custom'] },
    connectionRef: { type: 'string' },
    collection: { type: 'string' },
    namespaceStrategy: { enum: ['scope_hash', 'metadata_filter', 'collection_per_tenant'] },
    dimensions: { type: 'integer' },
    distance: { enum: ['cosine', 'dot', 'l2'] },
    indexType: { type: 'string' },
    capabilities: { type: 'object' },
    writeMode: { enum: ['sync', 'async_outbox', 'dual_write'] },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

const embeddingProviderSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'provider', 'model'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    provider: { type: 'string' },
    model: { type: 'string' },
    dimensions: { type: 'integer' },
    normalized: { type: 'boolean' },
    maxBatchSize: { type: 'integer' },
    maxInputTokens: { type: 'integer' },
    connectionRef: { type: 'string' },
    timeoutMs: { type: 'integer' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};
export const memoryProfileSpecDefinition = defineSpecSchema<MemoryProfileSpec>({
  id: 'MemoryProfileSpec',
  zod: memoryProfileSpecSchema,
  jsonSchema: memoryProfileSpecJsonSchema,
  example: memoryProfileSpecExample,
});

export const memoryManagementProviderSpecDefinition =
  defineSpecSchema<MemoryManagementProviderSpec>({
    id: 'MemoryManagementProviderSpec',
    zod: memoryManagementProviderSpecSchema,
    jsonSchema: providerJsonSchema,
    example: memoryManagementProviderSpecExample,
  });

export const workingMemoryStoreSpecDefinition = defineSpecSchema<WorkingMemoryStoreSpec>({
  id: 'WorkingMemoryStoreSpec',
  zod: workingMemoryStoreSpecSchema,
  jsonSchema: workingMemoryStoreSpecJsonSchema,
  example: workingMemoryStoreSpecExample,
});

export const memoryRecordStoreSpecDefinition = defineSpecSchema<MemoryRecordStoreSpec>({
  id: 'MemoryRecordStoreSpec',
  zod: memoryRecordStoreSpecSchema,
  jsonSchema: memoryRecordStoreSpecJsonSchema,
  example: memoryRecordStoreSpecExample,
});

export const vectorStoreSpecDefinition = defineSpecSchema<VectorStoreSpec>({
  id: 'VectorStoreSpec',
  zod: vectorStoreSpecSchema,
  jsonSchema: vectorStoreSpecJsonSchema,
  example: vectorStoreSpecExample,
});

export const embeddingProviderSpecDefinition = defineSpecSchema<EmbeddingProviderSpec>({
  id: 'EmbeddingProviderSpec',
  zod: embeddingProviderSpecSchema,
  jsonSchema: embeddingProviderSpecJsonSchema,
  example: embeddingProviderSpecExample,
});

export const memoryContractSpecDefinitions = [
  memoryProfileSpecDefinition,
  memoryManagementProviderSpecDefinition,
  workingMemoryStoreSpecDefinition,
  memoryRecordStoreSpecDefinition,
  vectorStoreSpecDefinition,
  embeddingProviderSpecDefinition,
] as const;

export const memoryContractJsonSchemas = exportSpecJsonSchemas(memoryContractSpecDefinitions);

export function validateMemoryProfileSpec(input: unknown): MemoryProfileSpec {
  return memoryProfileSpecDefinition.parse(input);
}

export function validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec {
  return workingMemoryStoreSpecDefinition.parse(input);
}

export function validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec {
  return memoryRecordStoreSpecDefinition.parse(input);
}

export function validateVectorStoreSpec(input: unknown): VectorStoreSpec {
  return vectorStoreSpecDefinition.parse(input);
}

export function validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec {
  return embeddingProviderSpecDefinition.parse(input);
}
