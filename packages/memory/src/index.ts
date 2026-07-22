import { z, type ZodType } from 'zod';
import {
  createFrameworkEvent,
  defineSpecSchema,
  exportSpecJsonSchemas,
  FrameworkError,
  type FrameworkEventType,
  jsonSchemaSchema,
  specMetadataSchema,
  type TraceRecorder,
  versionedSpecSchema,
  type JsonSchema,
  type PolicyDecision,
  type RecoveryFailure,
  type SpecMetadata,
  type VersionedSpec,
} from '@hypha/core';
import { classifyMemoryFailure, type MemoryRecoveryOperation } from './recovery';
import type { ManagedMemoryRecord, MemoryManagementCapabilities } from './contracts';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemoryDeleteResult,
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  ManagedMemoryUpdateRequest,
  ManagedMemoryWriteResult,
  MemoryAddRequest,
  MemoryGetRequest,
  MemoryHistoryRequest,
  MemoryListRequest,
  MemoryListResult,
  MemoryManagementProvider,
  MemoryVersion,
  ProviderHealth,
} from './operations';

export * from './recovery';
export * from './bounded-recovery';

/**
 * @deprecated Use ManagedMemoryScope for new integrations.
 */
export interface MemoryScope {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  userId?: string;
}

export type MemoryType =
  | 'working'
  | 'episodic'
  | 'semantic'
  | 'procedural'
  | 'artifact'
  | 'governance';

/**
 * @deprecated Use ManagedMemoryRecord for new integrations.
 */
export interface MemoryRecord<TValue = unknown> {
  id: string;
  type: MemoryType;
  value: TValue;
  source?: string;
  confidence?: number;
  provenance: Record<string, unknown>;
  visibility?: 'private' | 'workspace' | 'public';
  expiresAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MemorySpec extends VersionedSpec, SpecMetadata {
  providers: MemoryProviderProfile[];
  memoryTypes: MemoryType[];
  structuredStoreRef?: string;
  vectorIndexRef?: string;
  artifactStoreRef?: string;
  embeddingProviderRef?: string;
  readPolicy?: string;
  writePolicy?: string;
  freshnessPolicy?: string;
  provenancePolicy?: 'required' | 'best_effort';
  retentionPolicy?: string;
  privacyPolicy?: string;
  retrievalStrategy?: string;
  retrievalPolicy?: MemoryRetrievalPolicy;
  writePolicyConfig?: MemoryWritePolicy;
}

export interface MemoryRetrievalPolicy {
  defaultTopK?: number;
  vectorWeight?: number;
  textWeight?: number;
  requireScope?: boolean;
  allowedTypes?: MemoryType[];
}

export interface MemoryProviderProfile {
  id: string;
  type: 'structured' | 'vector' | 'artifact' | 'hybrid';
  providerRef: string;
  configSchema?: JsonSchema;
}

export interface StructuredQuery {
  where?: Record<string, unknown>;
  limit?: number;
  orderBy?: string;
}

export interface StructuredStoreProvider {
  get<T>(table: string, id: string): Promise<T | null>;
  insert<T extends { id: string }>(table: string, record: T): Promise<void>;
  update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
  delete(table: string, id: string): Promise<void>;
  query<T>(table: string, query: StructuredQuery): Promise<T[]>;
  transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}

export interface VectorRecord {
  id: string;
  vector: number[];
  metadata?: Record<string, unknown>;
}

export interface VectorQuery {
  vector: number[];
  topK: number;
  filter?: Record<string, unknown>;
}

export interface VectorSearchResult {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface VectorIndexProvider {
  upsert(records: VectorRecord[]): Promise<void>;
  search(query: VectorQuery): Promise<VectorSearchResult[]>;
  delete(ids: string[]): Promise<void>;
}

export interface ArtifactMeta {
  contentType?: string;
  sizeBytes?: number;
  hash?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactRef {
  id: string;
  path: string;
  meta?: ArtifactMeta;
}

export interface ArtifactStoreProvider {
  put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
  get(ref: ArtifactRef): Promise<Buffer>;
  delete(ref: ArtifactRef): Promise<void>;
}

export interface EmbeddingProvider {
  embed(input: string[]): Promise<number[][]>;
}

export interface MemoryReadQuery {
  ids?: string[];
  type?: MemoryType;
  limit?: number;
}

export interface MemorySearchQuery {
  text?: string;
  vector?: number[];
  type?: MemoryType;
  topK?: number;
}

export interface MemoryWritePolicy {
  allowLongTerm?: boolean;
  requireProvenance?: boolean;
  decision?: PolicyDecision;
  idempotencyKey?: string;
}

export interface MemoryWriteResult {
  recordId: string;
  vectorIndexed?: boolean;
  artifactRef?: ArtifactRef;
}

export interface MemorySearchResult {
  record: MemoryRecord;
  score?: number;
  provenance: Record<string, unknown>;
}

export interface MemorySummaryOptions {
  type?: MemoryType;
  limit?: number;
}

export interface MemorySummary {
  scope: MemoryScope;
  recordCount: number;
  types: Partial<Record<MemoryType, number>>;
}

export interface MemoryAuditOptions {
  since?: string;
  until?: string;
}

export interface MemoryAuditReport {
  scope: MemoryScope;
  recordsChecked: number;
  missingProvenance: string[];
}

/**
 * @deprecated Use MemoryManagementProvider behind GovernedMemoryManager.
 */
export interface MemoryProvider {
  read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
  search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
  write(
    scope: MemoryScope,
    record: MemoryRecord,
    policy: MemoryWritePolicy
  ): Promise<MemoryWriteResult>;
  update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
  invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
  summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
  audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}

export interface MemoryTraceContext {
  runId?: string;
  stepId?: string;
  sessionId?: string;
  userId?: string;
  agentId?: string;
  workspaceId?: string;
  metadata?: Record<string, unknown>;
}

export interface MemoryManagerOptions {
  trace?: TraceRecorder;
  traceContext?: MemoryTraceContext;
  now?: () => string;
  recovery?: MemoryManagerRecoveryOptions;
}

export interface MemoryManagerRecoveryOptions {
  providerId?: string;
  providerRevision?: string;
  specRevision?: string;
  policyRevision?: string;
  onFailure?: (failure: RecoveryFailure) => void | Promise<void>;
}

/**
 * @deprecated Use GovernedMemoryManager for managed operations. This class remains for legacy
 * MemoryProvider compatibility during the documented migration window.
 */
export class MemoryManager {
  private sequence = 0;

  constructor(
    private readonly provider: MemoryProvider | MemoryManagementProvider,
    private readonly options: MemoryManagerOptions = {}
  ) {}

  capabilities(): Promise<MemoryManagementCapabilities> {
    return this.requireManagedProvider().capabilities();
  }

  add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult> {
    return this.requireManagedProvider().add(request);
  }

  async read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]> {
    await this.recordTrace(scope, 'memory.read.requested', {
      operation: 'read',
      query,
    });
    try {
      const records = await this.requireLegacyProvider().read(scope, query);
      await this.recordTrace(scope, 'memory.read.completed', {
        operation: 'read',
        count: records.length,
        recordIds: records.map((record) => record.id),
      });
      return records;
    } catch (error) {
      const failure = await this.handleFailure(scope, 'read', error);
      await this.recordTrace(scope, 'memory.read.failed', {
        operation: 'read',
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
  search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
  async search(
    scopeOrRequest: MemoryScope | ManagedMemorySearchRequest,
    query?: MemorySearchQuery
  ): Promise<MemorySearchResult[] | ManagedMemorySearchResult[]> {
    if (isManagedMemorySearchRequest(scopeOrRequest)) {
      return this.requireManagedProvider().search(scopeOrRequest);
    }
    if (!query) {
      throw new FrameworkError({
        code: 'MEMORY_QUERY_REQUIRED',
        message: 'Legacy memory search requires an explicit query.',
      });
    }
    await this.recordTrace(scopeOrRequest, 'memory.read.requested', {
      operation: 'search',
      query: {
        ...query,
        vector: query.vector ? { dimensions: query.vector.length } : undefined,
      },
    });
    try {
      const results = await this.requireLegacyProvider().search(scopeOrRequest, query);
      await this.recordTrace(scopeOrRequest, 'memory.read.completed', {
        operation: 'search',
        count: results.length,
        recordIds: results.map((result) => result.record.id),
        scores: results.map((result) => result.score).filter((score) => score !== undefined),
      });
      return results;
    } catch (error) {
      const failure = await this.handleFailure(scopeOrRequest, 'search', error);
      await this.recordTrace(scopeOrRequest, 'memory.read.failed', {
        operation: 'search',
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  async write(
    scope: MemoryScope,
    record: MemoryRecord,
    policy: MemoryWritePolicy
  ): Promise<MemoryWriteResult> {
    let providerStarted = false;
    await this.recordTrace(scope, 'memory.write.requested', {
      recordId: record.id,
      type: record.type,
      source: record.source,
      visibility: record.visibility,
      expiresAt: record.expiresAt,
      policy: summarizeWritePolicy(policy),
    });
    try {
      validateMemoryWrite(scope, record, policy);
      await this.recordTrace(scope, 'memory.write.validated', {
        recordId: record.id,
        type: record.type,
      });
      providerStarted = true;
      const result = await this.requireLegacyProvider().write(scope, record, policy);
      await this.recordTrace(scope, 'memory.write.committed', {
        recordId: result.recordId,
        type: record.type,
        vectorIndexed: result.vectorIndexed,
        artifactRef: result.artifactRef,
      });
      return result;
    } catch (error) {
      const failure = await this.handleFailure(scope, 'write', error, {
        recordId: record.id,
        idempotencyKey: policy.idempotencyKey,
        sideEffectState: providerStarted ? undefined : 'not_started',
      });
      await this.recordTrace(scope, 'memory.write.rejected', {
        recordId: record.id,
        type: record.type,
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
  update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
  async update(
    scopeOrRequest: MemoryScope | ManagedMemoryUpdateRequest,
    recordId?: string,
    patch?: Partial<MemoryRecord>
  ): Promise<void | ManagedMemoryWriteResult> {
    if (isManagedMemoryUpdateRequest(scopeOrRequest)) {
      return this.requireManagedProvider().update(scopeOrRequest);
    }
    if (!recordId || !patch) {
      throw new FrameworkError({
        code: 'MEMORY_UPDATE_ARGUMENTS_REQUIRED',
        message: 'Legacy memory update requires recordId and patch.',
      });
    }
    await this.recordTrace(scopeOrRequest, 'memory.write.requested', {
      operation: 'update',
      recordId,
      patchKeys: Object.keys(patch),
    });
    try {
      await this.requireLegacyProvider().update(scopeOrRequest, recordId, patch);
      await this.recordTrace(scopeOrRequest, 'memory.write.committed', {
        operation: 'update',
        recordId,
      });
    } catch (error) {
      const failure = await this.handleFailure(scopeOrRequest, 'update', error, { recordId });
      await this.recordTrace(scopeOrRequest, 'memory.write.rejected', {
        operation: 'update',
        recordId,
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null> {
    return this.requireManagedProvider().get(request);
  }

  list(request: MemoryListRequest): Promise<MemoryListResult> {
    return this.requireManagedProvider().list(request);
  }

  delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult> {
    return this.requireManagedProvider().delete(request);
  }

  history(request: MemoryHistoryRequest): Promise<MemoryVersion[]> {
    const provider = this.requireManagedProvider();
    if (!provider.history) {
      throw new FrameworkError({
        code: 'MEMORY_CAPABILITY_UNSUPPORTED',
        message: `Memory provider ${provider.id} does not support history.`,
      });
    }
    return provider.history(request);
  }

  health(): Promise<ProviderHealth> {
    return this.requireManagedProvider().health();
  }

  async close(): Promise<void> {
    if (isMemoryManagementProvider(this.provider)) await this.provider.close?.();
  }

  async invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void> {
    await this.recordTrace(scope, 'memory.write.requested', {
      operation: 'invalidate',
      recordId,
      reason,
    });
    try {
      await this.requireLegacyProvider().invalidate(scope, recordId, reason);
      await this.recordTrace(scope, 'memory.write.committed', {
        operation: 'invalidate',
        recordId,
        reason,
      });
    } catch (error) {
      const failure = await this.handleFailure(scope, 'invalidate', error, { recordId });
      await this.recordTrace(scope, 'memory.write.rejected', {
        operation: 'invalidate',
        recordId,
        reason,
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  async summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary> {
    await this.recordTrace(scope, 'memory.read.requested', { operation: 'summarize', options });
    try {
      const summary = await this.requireLegacyProvider().summarize(scope, options);
      await this.recordTrace(scope, 'memory.read.completed', {
        operation: 'summarize',
        recordCount: summary.recordCount,
      });
      return summary;
    } catch (error) {
      const failure = await this.handleFailure(scope, 'summarize', error);
      await this.recordTrace(scope, 'memory.read.failed', {
        operation: 'summarize',
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  async audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport> {
    await this.recordTrace(scope, 'memory.read.requested', { operation: 'audit', options });
    try {
      const report = await this.requireLegacyProvider().audit(scope, options);
      await this.recordTrace(scope, 'memory.read.completed', {
        operation: 'audit',
        recordsChecked: report.recordsChecked,
        missingProvenanceCount: report.missingProvenance.length,
      });
      return report;
    } catch (error) {
      const failure = await this.handleFailure(scope, 'audit', error);
      await this.recordTrace(scope, 'memory.read.failed', {
        operation: 'audit',
        error: error instanceof Error ? error.message : String(error),
        recovery: failure,
      });
      throw error;
    }
  }

  private requireManagedProvider(): MemoryManagementProvider {
    if (!isMemoryManagementProvider(this.provider)) {
      throw new FrameworkError({
        code: 'MEMORY_MANAGED_PROVIDER_REQUIRED',
        message: 'This operation requires a managed memory provider.',
      });
    }
    return this.provider;
  }

  private requireLegacyProvider(): MemoryProvider {
    if (isMemoryManagementProvider(this.provider)) {
      throw new FrameworkError({
        code: 'MEMORY_LEGACY_PROVIDER_REQUIRED',
        message: 'This compatibility operation requires a legacy memory provider.',
      });
    }
    return this.provider;
  }

  private async handleFailure(
    scope: MemoryScope,
    operation: MemoryRecoveryOperation,
    error: unknown,
    input: {
      recordId?: string;
      idempotencyKey?: string;
      sideEffectState?: 'none' | 'not_started' | 'committed' | 'unknown';
    } = {}
  ): Promise<RecoveryFailure> {
    const occurredAt = this.options.now?.() ?? new Date().toISOString();
    const recovery = this.options.recovery;
    const failure = classifyMemoryFailure(error, {
      id: `${scope.runId ?? 'memory-runtime'}:memory:${operation}:${this.sequence + 1}`,
      operation,
      scope,
      occurredAt,
      providerId: recovery?.providerId,
      providerRevision: recovery?.providerRevision,
      specRevision: recovery?.specRevision,
      policyRevision: recovery?.policyRevision,
      recordId: input.recordId,
      idempotencyKey: input.idempotencyKey,
      sideEffectState: input.sideEffectState,
    });
    await recovery?.onFailure?.(failure);
    return failure;
  }

  private async recordTrace(
    scope: MemoryScope,
    type: FrameworkEventType,
    payload: Record<string, unknown>
  ): Promise<void> {
    if (!this.options.trace) return;
    const context = this.options.traceContext ?? {};
    const runId = scope.runId ?? context.runId ?? 'memory-runtime';
    const sessionId = scope.sessionId ?? context.sessionId;
    const userId = scope.userId ?? context.userId;
    const workspaceId = scope.workspaceId ?? context.workspaceId;
    this.sequence += 1;
    const sequenceId = String(this.sequence).padStart(6, '0');
    await this.options.trace.record(
      createFrameworkEvent({
        id: `${runId}:memory:${sequenceId}:${type}`,
        type,
        runId,
        sessionId,
        workspaceId,
        stepId: context.stepId,
        agentId: context.agentId,
        timestamp: this.options.now?.(),
        payload: {
          ...payload,
          scope,
        },
        metadata: {
          ...context.metadata,
          userId,
        },
      })
    );
  }
}

function isMemoryManagementProvider(
  provider: MemoryProvider | MemoryManagementProvider
): provider is MemoryManagementProvider {
  return (
    'capabilities' in provider &&
    'add' in provider &&
    'get' in provider &&
    'list' in provider &&
    'health' in provider
  );
}

function isManagedMemorySearchRequest(
  value: MemoryScope | ManagedMemorySearchRequest
): value is ManagedMemorySearchRequest {
  return 'operationId' in value && 'principal' in value && 'profileRef' in value;
}

function isManagedMemoryUpdateRequest(
  value: MemoryScope | ManagedMemoryUpdateRequest
): value is ManagedMemoryUpdateRequest {
  return 'operationId' in value && 'principal' in value && 'memoryId' in value;
}

function summarizeWritePolicy(policy: MemoryWritePolicy): Record<string, unknown> {
  return {
    allowLongTerm: policy.allowLongTerm,
    requireProvenance: policy.requireProvenance,
    idempotencyKey: policy.idempotencyKey,
    decision: policy.decision
      ? {
          allowed: policy.decision.allowed,
          requiresHumanReview: policy.decision.requiresHumanReview,
          policyId: policy.decision.policyId,
          ruleId: policy.decision.ruleId,
          reason: policy.decision.reason,
        }
      : undefined,
  };
}

function validateMemoryWrite(
  scope: MemoryScope,
  record: MemoryRecord,
  policy: MemoryWritePolicy
): void {
  if (!scope.userId && !scope.sessionId && !scope.runId && !scope.workspaceId) {
    throw new FrameworkError({
      code: 'MEMORY_SCOPE_REQUIRED',
      message: 'Memory writes require at least one explicit scope boundary.',
      context: { recordId: record.id },
    });
  }
  if (policy.decision && !policy.decision.allowed) {
    throw new FrameworkError({
      code: 'MEMORY_POLICY_DENIED',
      message: policy.decision.reason ?? `Memory write denied: ${record.id}`,
      context: { recordId: record.id, decision: policy.decision },
    });
  }
  if (policy.decision?.requiresHumanReview) {
    throw new FrameworkError({
      code: 'MEMORY_HUMAN_REVIEW_REQUIRED',
      message: policy.decision.reason ?? `Memory write requires human review: ${record.id}`,
      context: { recordId: record.id, decision: policy.decision },
    });
  }
  if (policy.requireProvenance && Object.keys(record.provenance ?? {}).length === 0) {
    throw new FrameworkError({
      code: 'MEMORY_PROVENANCE_REQUIRED',
      message: `Memory record ${record.id} requires provenance.`,
      context: { recordId: record.id },
    });
  }
  if (isLongTermMemory(record) && !policy.allowLongTerm) {
    throw new FrameworkError({
      code: 'MEMORY_LONG_TERM_WRITE_DENIED',
      message: `Long-term memory write requires allowLongTerm: ${record.id}`,
      context: { recordId: record.id, type: record.type },
    });
  }
}

function isLongTermMemory(record: MemoryRecord): boolean {
  return record.type !== 'working';
}

export const memoryTypeSchema = z.enum([
  'working',
  'episodic',
  'semantic',
  'procedural',
  'artifact',
  'governance',
]);

export const memoryProviderProfileSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['structured', 'vector', 'artifact', 'hybrid']),
  providerRef: z.string().min(1),
  configSchema: jsonSchemaSchema.optional(),
});

export const memoryRetrievalPolicySchema = z.object({
  defaultTopK: z.number().int().positive().optional(),
  vectorWeight: z.number().min(0).max(1).optional(),
  textWeight: z.number().min(0).max(1).optional(),
  requireScope: z.boolean().optional(),
  allowedTypes: z.array(memoryTypeSchema).optional(),
}) satisfies ZodType<MemoryRetrievalPolicy>;

export const memorySpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  providers: z.array(memoryProviderProfileSchema).min(1),
  memoryTypes: z.array(memoryTypeSchema).min(1),
  structuredStoreRef: z.string().optional(),
  vectorIndexRef: z.string().optional(),
  artifactStoreRef: z.string().optional(),
  embeddingProviderRef: z.string().optional(),
  readPolicy: z.string().optional(),
  writePolicy: z.string().optional(),
  freshnessPolicy: z.string().optional(),
  provenancePolicy: z.enum(['required', 'best_effort']).optional(),
  retentionPolicy: z.string().optional(),
  privacyPolicy: z.string().optional(),
  retrievalStrategy: z.string().optional(),
  retrievalPolicy: memoryRetrievalPolicySchema.optional(),
  writePolicyConfig: z
    .object({
      allowLongTerm: z.boolean().optional(),
      requireProvenance: z.boolean().optional(),
      idempotencyKey: z.string().min(1).optional(),
      decision: z
        .object({
          allowed: z.boolean(),
          requiresHumanReview: z.boolean().optional(),
          policyId: z.string().optional(),
          ruleId: z.string().optional(),
          reason: z.string().optional(),
          metadata: z.record(z.unknown()).optional(),
        })
        .optional(),
    })
    .optional(),
}) satisfies ZodType<MemorySpec>;

export const memorySpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'providers', 'memoryTypes'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    providers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'providerRef'],
        properties: {
          id: { type: 'string' },
          type: { enum: ['structured', 'vector', 'artifact', 'hybrid'] },
          providerRef: { type: 'string' },
          configSchema: { type: 'object' },
        },
      },
    },
    memoryTypes: {
      type: 'array',
      items: {
        enum: ['working', 'episodic', 'semantic', 'procedural', 'artifact', 'governance'],
      },
    },
    structuredStoreRef: { type: 'string' },
    vectorIndexRef: { type: 'string' },
    artifactStoreRef: { type: 'string' },
    embeddingProviderRef: { type: 'string' },
    readPolicy: { type: 'string' },
    writePolicy: { type: 'string' },
    writePolicyConfig: { type: 'object' },
    freshnessPolicy: { type: 'string' },
    provenancePolicy: { enum: ['required', 'best_effort'] },
    retentionPolicy: { type: 'string' },
    privacyPolicy: { type: 'string' },
    retrievalStrategy: { type: 'string' },
    retrievalPolicy: { type: 'object' },
  },
  additionalProperties: false,
};

export const memorySpecExample: MemorySpec = {
  id: 'memory.default',
  version: '0.0.0',
  name: 'Default Hybrid Memory',
  providers: [
    {
      id: 'local-hybrid',
      type: 'hybrid',
      providerRef: 'local',
      configSchema: { type: 'object' },
    },
  ],
  memoryTypes: ['working', 'episodic', 'semantic', 'artifact'],
  structuredStoreRef: 'storage.sqlite.structured',
  vectorIndexRef: 'storage.local-vector.semantic',
  artifactStoreRef: 'storage.file-artifact.local',
  embeddingProviderRef: 'embedding.mock',
  provenancePolicy: 'required',
  retrievalStrategy: 'hybrid-recent-first',
  retrievalPolicy: {
    defaultTopK: 5,
    requireScope: true,
    allowedTypes: ['working', 'episodic', 'semantic', 'artifact'],
  },
  writePolicyConfig: {
    requireProvenance: true,
    allowLongTerm: true,
  },
};

export const memorySpecDefinition = defineSpecSchema<MemorySpec>({
  id: 'MemorySpec',
  zod: memorySpecSchema,
  jsonSchema: memorySpecJsonSchema,
  example: memorySpecExample,
});

export const memorySpecDefinitions = [memorySpecDefinition] as const;
export const memorySpecJsonSchemas = exportSpecJsonSchemas(memorySpecDefinitions);

export function validateMemorySpec(input: unknown): MemorySpec {
  return memorySpecDefinition.parse(input);
}

export * from './contracts';
export * from './record-contract';
export * from './profile-contract';
export * from './operations';
export * from './operation-contract';
export * from './lifecycle-contracts';
export * from './lifecycle-schema';
export * from './governed-memory-manager';
export * from './memory-application-service';
export * from './memory-runtime-factory';
export * from './native-memory-runtime';
export * from './memory-worker-supervisor';
export * from './memory-data-migration';
export * from './mongo-structured-store';
export * from './structured-idempotency-store';
export * from './memory-server-migration-contract';
export * from './provider-reconciliation';
export * from './provider-operational-health';
export * from './provider-governance';
export * from './memory-utils';
export * from './managed-store';
export * from './structured-managed-store';
export * from './structured-memory-persistence';
export * from './index-outbox';
export * from './lifecycle-workers';
export * from './dead-letter-management';
export * from './external-provider-operations';
export * from './native-maintenance';
export * from './native-memory';
export * from './extraction';
export * from './structured-extraction-state-store';
export * from './working-store';
export * from './structured-lifecycle-task-store';
export * from './external-adapters';
export * from './external-provider-acceptance';
export * from './external-memory-identity';
export * from './structured-external-mapping-store';
export * from './mem0-rest-client';
export * from './mem0-platform-client';
export * from './memorybank-local-client';
export * from './memorybank-managed-client';
export * from './memory-events';
export * from './context-contracts';
export * from './context-schema';
export * from './context-builder';
export * from './context-gateway';
export * from './context-source-resolver';
export * from './context-compaction';
export * from './retrieval';
export * from './integration-contracts';
export * from './integration-schema';
export * from './integration-json-schema';
export * from './managed-search-cache';
export * from './context-cache-validity';

export * from './hybrid';
