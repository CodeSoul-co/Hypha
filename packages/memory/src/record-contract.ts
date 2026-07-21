import { z, type ZodType } from 'zod';
import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryEntityRef,
  MemoryIndexStatus,
  MemoryPrincipal,
  MemoryProvenance,
  MemoryRelation,
  MemorySource,
  MemoryVectorRef,
  NormalizedMemoryError,
} from './contracts';

const metadataSchema = z.record(z.unknown());
const unitIntervalSchema = z.number().min(0).max(1);

export const managedMemoryScopeSchema = z.object({
  tenantId: z.string().min(1).optional(),
  userId: z.string().min(1),
  workspaceId: z.string().min(1).optional(),
  projectId: z.string().min(1).optional(),
  sessionId: z.string().min(1).optional(),
  runId: z.string().min(1).optional(),
  agentId: z.string().min(1).optional(),
  domainPackId: z.string().min(1).optional(),
}) satisfies ZodType<ManagedMemoryScope>;

export const memoryPrincipalSchema = z.object({
  principalId: z.string().min(1),
  type: z.enum(['user', 'agent', 'service', 'system']),
  tenantId: z.string().min(1).optional(),
  userId: z.string().min(1).optional(),
  agentId: z.string().min(1).optional(),
  roles: z.array(z.string().min(1)).optional(),
  permissionScopes: z.array(z.string().min(1)),
  metadata: metadataSchema.optional(),
}) satisfies ZodType<MemoryPrincipal>;

export const managedMemoryTypeSchema = z.enum([
  'working',
  'episodic',
  'semantic',
  'procedural',
  'preference',
  'artifact',
  'governance',
  'reflection',
  'custom',
]);

export const memoryStatusSchema = z.enum([
  'pending',
  'active',
  'dormant',
  'superseded',
  'invalidated',
  'deletion_pending',
  'deleted',
  'failed',
]);

export const memorySourceSchema = z.object({
  type: z.enum([
    'user_message',
    'assistant_message',
    'tool_result',
    'artifact',
    'workflow_state',
    'human_review',
    'import',
    'derived',
    'system',
  ]),
  sourceId: z.string().optional(),
  sourceEventId: z.string().optional(),
  sourceRunId: z.string().optional(),
  sourceMessageId: z.string().optional(),
  sourceArtifactId: z.string().optional(),
}) satisfies ZodType<MemorySource>;

export const memoryProvenanceSchema = z.object({
  createdBy: z.string().min(1),
  providerId: z.string().min(1),
  extractorVersion: z.string().optional(),
  sourceEventIds: z.array(z.string()).optional(),
  sourceMemoryIds: z.array(z.string()).optional(),
  transformation: z.string().optional(),
  humanDecisionId: z.string().optional(),
  createdAt: z.string().datetime(),
  metadata: metadataSchema.optional(),
}) satisfies ZodType<MemoryProvenance>;

export const normalizedMemoryErrorSchema: ZodType<NormalizedMemoryError> = z.object({
  code: z.enum([
    'MEMORY_INVALID_INPUT',
    'MEMORY_EXTRACTION_SOURCE_UNAVAILABLE',
    'MEMORY_EXTRACTION_FAILED',
    'MEMORY_EXTRACTION_CURSOR_CONFLICT',
    'MEMORY_MAINTENANCE_CONFLICT',
    'MEMORY_RANKING_FAILED',
    'MEMORY_IDEMPOTENCY_CONFLICT',
    'MEMORY_SCOPE_DENIED',
    'MEMORY_PERMISSION_DENIED',
    'MEMORY_NOT_FOUND',
    'MEMORY_REVISION_CONFLICT',
    'MEMORY_PROVIDER_NOT_INSTALLED',
    'MEMORY_PROVIDER_UNAVAILABLE',
    'MEMORY_PROVIDER_TIMEOUT',
    'MEMORY_STORE_UNAVAILABLE',
    'MEMORY_VECTOR_UNAVAILABLE',
    'MEMORY_INDEX_FAILED',
    'MEMORY_DELETE_PARTIAL',
    'MEMORY_POLICY_REJECTED',
    'MEMORY_CONTEXT_BUDGET_EXCEEDED',
    'MEMORY_INTERNAL_ERROR',
  ]),
  message: z.string().min(1),
  retryable: z.boolean(),
  providerCode: z.string().optional(),
  details: metadataSchema.optional(),
  causeRef: z.string().optional(),
});

export const memoryEntityRefSchema = z.object({
  entityId: z.string().min(1),
  label: z.string().optional(),
  type: z.string().optional(),
  confidence: unitIntervalSchema.optional(),
}) satisfies ZodType<MemoryEntityRef>;

export const memoryRelationSchema = z.object({
  type: z.enum([
    'supports',
    'contradicts',
    'supersedes',
    'derived_from',
    'related_to',
    'same_as',
    'part_of',
  ]),
  targetMemoryId: z.string().min(1),
  confidence: unitIntervalSchema.optional(),
  metadata: metadataSchema.optional(),
}) satisfies ZodType<MemoryRelation>;

export const memoryIndexStatusSchema = z.object({
  state: z.enum(['none', 'pending', 'indexing', 'indexed', 'partial', 'failed', 'deleted']),
  attempts: z.number().int().min(0),
  lastAttemptAt: z.string().datetime().optional(),
  lastError: normalizedMemoryErrorSchema.optional(),
}) satisfies ZodType<MemoryIndexStatus>;

export const memoryVectorRefSchema = z.object({
  vectorStoreId: z.string().min(1),
  indexName: z.string().min(1),
  vectorId: z.string().min(1),
  embeddingProviderId: z.string().min(1),
  embeddingModel: z.string().min(1),
  embeddingRevision: z.string().optional(),
  dimensions: z.number().int().positive().optional(),
  indexedAt: z.string().datetime(),
}) satisfies ZodType<MemoryVectorRef>;

export const managedMemoryRecordSchema = z
  .object({
    id: z.string().min(1),
    versionId: z.string().min(1),
    revision: z.number().int().positive(),
    type: managedMemoryTypeSchema,
    subtype: z.string().optional(),
    content: z.unknown(),
    canonicalText: z.string().optional(),
    summary: z.string().optional(),
    language: z.string().optional(),
    scope: managedMemoryScopeSchema,
    visibility: z.enum(['private', 'session', 'workspace', 'tenant', 'shared']),
    source: memorySourceSchema,
    provenance: memoryProvenanceSchema,
    confidence: unitIntervalSchema.optional(),
    importance: unitIntervalSchema.optional(),
    strength: unitIntervalSchema.optional(),
    salience: unitIntervalSchema.optional(),
    accessCount: z.number().int().min(0),
    lastAccessedAt: z.string().datetime().optional(),
    lastReinforcedAt: z.string().datetime().optional(),
    decayScore: unitIntervalSchema.optional(),
    status: memoryStatusSchema,
    immutable: z.boolean().optional(),
    humanVerified: z.boolean().optional(),
    sensitive: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    entities: z.array(memoryEntityRefSchema).optional(),
    relations: z.array(memoryRelationSchema).optional(),
    indexStatus: memoryIndexStatusSchema,
    vectorRefs: z.array(memoryVectorRefSchema).optional(),
    artifactRefs: z.array(z.string()).optional(),
    contentHash: z.string().min(1),
    scopeHash: z.string().min(1),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    expiresAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().optional(),
    metadata: metadataSchema.optional(),
  })
  .refine((record) => Object.prototype.hasOwnProperty.call(record, 'content'), {
    message: 'Memory content is required.',
    path: ['content'],
  });

export const managedMemoryRecordExample: ManagedMemoryRecord = {
  id: 'memory_01',
  versionId: 'memory_01:v1',
  revision: 1,
  type: 'preference',
  content: { statement: 'Prefer concise answers.' },
  canonicalText: 'User prefers concise answers.',
  scope: { userId: 'user_01', workspaceId: 'workspace_01' },
  visibility: 'private',
  source: { type: 'user_message', sourceMessageId: 'message_01' },
  provenance: {
    createdBy: 'agent_01',
    providerId: 'memory.provider.native',
    sourceEventIds: ['event_01'],
    createdAt: '2026-07-16T00:00:00.000Z',
  },
  confidence: 1,
  accessCount: 0,
  status: 'active',
  indexStatus: { state: 'pending', attempts: 0 },
  contentHash: 'sha256:content',
  scopeHash: 'sha256:scope',
  createdAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
};

export function validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord {
  return managedMemoryRecordSchema.parse(input) as ManagedMemoryRecord;
}
