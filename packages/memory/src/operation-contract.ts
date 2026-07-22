import { z, type ZodType } from 'zod';
import { memoryContractSpecRefSchema } from './profile-contract';
import {
  managedMemoryScopeSchema,
  managedMemoryTypeSchema,
  memoryPrincipalSchema,
  memorySourceSchema,
  memoryStatusSchema,
} from './record-contract';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemorySearchRequest,
  ManagedMemoryUpdateRequest,
  MemoryAddRequest,
  MemoryPatch,
  MemorySearchFilter,
  PaginationRequest,
} from './operations';

const metadataSchema = z.record(z.unknown());
const unitIntervalSchema = z.number().min(0).max(1);

export const paginationRequestSchema: ZodType<PaginationRequest> = z
  .object({
    cursor: z.string().min(1).optional(),
    limit: z.number().int().positive().optional(),
    maxPages: z.number().int().positive().optional(),
    maxItems: z.number().int().positive().optional(),
    maxBytes: z.number().int().positive().optional(),
    maxDurationMs: z.number().int().positive().optional(),
    maxCalls: z.number().int().positive().optional(),
  })
  .strict();

export const memorySearchFilterSchema: ZodType<MemorySearchFilter> = z.object({
  ids: z.array(z.string().min(1)).optional(),
  excludeIds: z.array(z.string().min(1)).optional(),
  statuses: z.array(memoryStatusSchema).optional(),
  tagsAny: z.array(z.string()).optional(),
  tagsAll: z.array(z.string()).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
  updatedAfter: z.string().datetime().optional(),
  expiresAfter: z.string().datetime().optional(),
  confidenceGte: unitIntervalSchema.optional(),
  importanceGte: unitIntervalSchema.optional(),
  sourceTypes: z.array(memorySourceSchema.shape.type).optional(),
  entityIds: z.array(z.string().min(1)).optional(),
  visibility: z.array(z.enum(['private', 'session', 'workspace', 'tenant', 'shared'])).optional(),
  verifiedOnly: z.boolean().optional(),
  conflictFreeOnly: z.boolean().optional(),
  canonicalKeys: z.array(z.string().min(1)).optional(),
  metadata: metadataSchema.optional(),
});

export const memoryAddRequestSchema = z
  .object({
    operationId: z.string().min(1),
    principal: memoryPrincipalSchema,
    scope: managedMemoryScopeSchema,
    input: z.unknown(),
    inputType: z.enum(['message', 'text', 'structured', 'artifact_ref', 'event_ref']).optional(),
    memoryType: managedMemoryTypeSchema.optional(),
    source: memorySourceSchema,
    extractionMode: z.enum(['none', 'native', 'provider', 'custom']).optional(),
    writeMode: z.enum(['sync', 'async']).optional(),
    idempotencyKey: z.string().min(1).optional(),
    profileRef: memoryContractSpecRefSchema,
    tags: z.array(z.string()).optional(),
    metadata: metadataSchema.optional(),
  })
  .refine((request) => Object.prototype.hasOwnProperty.call(request, 'input'), {
    message: 'Memory add input is required.',
    path: ['input'],
  });

export const managedMemorySearchRequestSchema: ZodType<ManagedMemorySearchRequest> = z
  .object({
    operationId: z.string().min(1),
    principal: memoryPrincipalSchema,
    scope: managedMemoryScopeSchema,
    profileRef: memoryContractSpecRefSchema,
    query: z.string().optional(),
    queryEmbedding: z.array(z.number()).min(1).optional(),
    filters: memorySearchFilterSchema.optional(),
    memoryTypes: z.array(managedMemoryTypeSchema).optional(),
    mode: z.enum(['structured', 'semantic', 'keyword', 'hybrid', 'graph']).optional(),
    topK: z.number().int().positive().optional(),
    scoreThreshold: unitIntervalSchema.optional(),
    includeDormant: z.boolean().optional(),
    includeSuperseded: z.boolean().optional(),
    includeContent: z.boolean().optional(),
    includeProvenance: z.boolean().optional(),
    includeRelations: z.boolean().optional(),
    rerank: z.boolean().optional(),
    updateAccessStats: z.boolean().optional(),
    pagination: paginationRequestSchema.optional(),
    metadata: metadataSchema.optional(),
  })
  .refine(
    (request) =>
      Boolean(request.query?.trim()) ||
      Boolean(request.queryEmbedding?.length) ||
      Boolean(request.filters),
    { message: 'Memory search requires a query, embedding, or filter.' }
  );

export const memoryPatchSchema = z
  .object({
    content: z.unknown().optional(),
    canonicalText: z.string().optional(),
    summary: z.string().optional(),
    confidence: unitIntervalSchema.optional(),
    importance: unitIntervalSchema.optional(),
    tags: z.array(z.string()).optional(),
    status: z
      .enum([
        'pending',
        'active',
        'dormant',
        'superseded',
        'invalidated',
        'deletion_pending',
        'failed',
      ])
      .optional(),
    metadata: metadataSchema.optional(),
  })
  .refine((patch) => Object.keys(patch).length > 0, {
    message: 'Memory update patch must not be empty.',
  });

export const managedMemoryUpdateRequestSchema: ZodType<ManagedMemoryUpdateRequest> = z.object({
  operationId: z.string().min(1),
  principal: memoryPrincipalSchema,
  scope: managedMemoryScopeSchema,
  memoryId: z.string().min(1),
  expectedRevision: z.number().int().positive().optional(),
  patch: memoryPatchSchema as ZodType<MemoryPatch>,
  reason: z.string().min(1),
  idempotencyKey: z.string().min(1).optional(),
});

export const managedMemoryDeleteRequestSchema: ZodType<ManagedMemoryDeleteRequest> = z
  .object({
    operationId: z.string().min(1),
    principal: memoryPrincipalSchema,
    scope: managedMemoryScopeSchema,
    memoryIds: z.array(z.string().min(1)).min(1).optional(),
    filter: memorySearchFilterSchema.optional(),
    mode: z.enum(['soft', 'hard', 'compliance']),
    reason: z.string().min(1),
    idempotencyKey: z.string().min(1).optional(),
  })
  .refine((request) => Boolean(request.memoryIds?.length) !== Boolean(request.filter), {
    message: 'Memory delete requires exactly one of memoryIds or filter.',
  });

export const memoryAddRequestExample: MemoryAddRequest = {
  operationId: 'operation_add_01',
  principal: {
    principalId: 'user_01',
    type: 'user',
    userId: 'user_01',
    permissionScopes: ['memory:write'],
  },
  scope: { userId: 'user_01', workspaceId: 'workspace_01' },
  input: 'Prefer concise answers.',
  inputType: 'text',
  memoryType: 'preference',
  source: { type: 'user_message', sourceMessageId: 'message_01' },
  extractionMode: 'native',
  writeMode: 'sync',
  idempotencyKey: 'memory-add-01',
  profileRef: { id: 'memory.default', version: '1.0.0', revision: 'memory-default-v1' },
};

export function validateMemoryAddRequest(input: unknown): MemoryAddRequest {
  return memoryAddRequestSchema.parse(input) as MemoryAddRequest;
}

export function validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest {
  return managedMemorySearchRequestSchema.parse(input);
}

export function validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest {
  return managedMemoryUpdateRequestSchema.parse(input);
}

export function validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest {
  return managedMemoryDeleteRequestSchema.parse(input);
}
