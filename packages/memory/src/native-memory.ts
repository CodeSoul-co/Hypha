import type {
  ManagedMemoryRecord,
  MemoryManagementCapabilities,
  MemoryProfileSpec,
} from './contracts';
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
import type { MemoryMaintenancePolicySpec, ExtractedMemoryCandidate } from './lifecycle-contracts';
import {
  InMemoryMemoryIdempotencyStore,
  InMemoryMemoryPersistenceUnitOfWork,
  type MemoryIdempotencyStore,
  type MemoryPersistenceUnitOfWork,
} from './managed-store';
import type { MemoryEventPublisher, MemoryEventType } from './memory-events';
import { DeterministicMemoryMaintenancePlanner } from './native-maintenance';
import { hashMemoryContent, hashMemoryScope, normalizeMemoryError, sha256 } from './memory-utils';
import {
  DefaultMemoryRetrievalPipeline,
  KeywordMemoryCandidateGenerator,
  StructuredMemoryCandidateGenerator,
  normalizeMemoryQuery,
} from './retrieval';

export interface NativeMemoryProviderOptions {
  profile: MemoryProfileSpec;
  maintenancePolicy?: MemoryMaintenancePolicySpec;
  persistence?: MemoryPersistenceUnitOfWork;
  idempotencyStore?: MemoryIdempotencyStore;
  events?: MemoryEventPublisher;
  now?: () => string;
}

const nativeCapabilities: MemoryManagementCapabilities = {
  add: true,
  search: true,
  get: true,
  list: true,
  update: true,
  delete: true,
  deleteByFilter: true,
  history: true,
  summarize: false,
  consolidate: false,
  decay: false,
  reinforce: false,
  conflictDetection: true,
  hybridSearch: true,
  graphRelations: false,
  asyncWrite: true,
  batchOperations: true,
};

const defaultMaintenancePolicy: MemoryMaintenancePolicySpec = {
  id: 'memory.maintenance.native',
  version: '1.0.0',
  revision: 'native-v1',
  preWriteRetrieval: { enabled: true, exactKeyLookup: true, maxCandidates: 25 },
  duplicateResolution: 'reuse_existing',
  updateResolution: 'create_version',
  conflictResolution: 'prefer_latest',
};

export class NativeMemoryManagementProvider implements MemoryManagementProvider {
  readonly id: string;
  readonly persistence: MemoryPersistenceUnitOfWork;
  readonly recordStore: MemoryPersistenceUnitOfWork['recordStore'];
  readonly outboxStore: MemoryPersistenceUnitOfWork['outboxStore'];
  private readonly idempotencyStore: MemoryIdempotencyStore;
  private readonly now: () => string;
  private readonly planner: DeterministicMemoryMaintenancePlanner;
  readonly retrieval: DefaultMemoryRetrievalPipeline;

  constructor(private readonly options: NativeMemoryProviderOptions) {
    this.id = options.profile.managementProviderRef.id;
    this.persistence = options.persistence ?? new InMemoryMemoryPersistenceUnitOfWork();
    this.recordStore = this.persistence.recordStore;
    this.outboxStore = this.persistence.outboxStore;
    this.idempotencyStore = options.idempotencyStore ?? new InMemoryMemoryIdempotencyStore();
    this.now = options.now ?? (() => new Date().toISOString());
    this.planner = new DeterministicMemoryMaintenancePlanner(undefined, this.now);
    this.retrieval = new DefaultMemoryRetrievalPipeline({
      recordStore: this.recordStore,
      generators: [
        new StructuredMemoryCandidateGenerator(this.recordStore),
        new KeywordMemoryCandidateGenerator(this.recordStore),
      ],
      rankingPolicy: {
        ...options.profile.retrievalPolicy,
        normalization: 'provider_normalized',
        weights: {
          exact: 0.35,
          keyword: 0.35,
          recency: options.profile.retrievalPolicy.recencyWeight ?? 0.1,
          importance: options.profile.retrievalPolicy.importanceWeight ?? 0.05,
          confidence: options.profile.retrievalPolicy.confidenceWeight ?? 0.1,
          reinforcement: options.profile.retrievalPolicy.reinforcementWeight ?? 0.05,
        },
        stableTieBreak: 'updated_at_then_id',
      },
      now: this.now,
    });
  }

  async capabilities(): Promise<MemoryManagementCapabilities> {
    return nativeCapabilities;
  }

  async add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult> {
    this.assertProfile(request.profileRef.id);
    const scopeHash = hashMemoryScope(request.scope);
    const key = request.idempotencyKey;
    if (key) {
      const reused = await this.idempotencyStore.get(scopeHash, key);
      if (reused) return structuredClone(reused) as ManagedMemoryWriteResult;
    }
    await this.trace('memory.write.requested', request.operationId, request.scope.runId, {
      scopeHash,
    });
    try {
      const candidate = candidateFromAdd(
        request,
        this.options.profile.revision ?? this.options.profile.version
      );
      const existing = await this.recordStore.list({ scope: request.scope, limit: 25 });
      const decision = await this.planner.plan({
        operationId: request.operationId,
        scope: request.scope,
        candidate,
        existingRecords: existing,
        policy: this.options.maintenancePolicy ?? defaultMaintenancePolicy,
      });
      if (decision.action === 'reject' || decision.action === 'require_review') {
        const result: ManagedMemoryWriteResult = {
          operationId: request.operationId,
          status: 'rejected',
          records: [],
          rejectedItems: [{ itemId: candidate.candidateId, reason: decision.reasonCode }],
        };
        if (key) await this.idempotencyStore.set(scopeHash, key, result);
        return result;
      }
      if (decision.action === 'reuse' || decision.action === 'noop') {
        const records = existing.filter((record) => decision.targetMemoryIds.includes(record.id));
        const result: ManagedMemoryWriteResult = {
          operationId: request.operationId,
          status: 'reused',
          records,
        };
        if (key) await this.idempotencyStore.set(scopeHash, key, result);
        return result;
      }

      const record = buildRecord(
        request,
        candidate,
        decision.targetMemoryIds[0],
        existing,
        this.now()
      );
      await this.persistence.transaction(async ({ recordStore, outboxStore }) => {
        if (record.revision === 1) await recordStore.create(record);
        else await recordStore.createVersion(record, record.revision - 1);
        await outboxStore.enqueue({
          id: `${request.operationId}:${record.versionId}:index`,
          operationId: request.operationId,
          memoryId: record.id,
          memoryVersionId: record.versionId,
          scopeHash: record.scopeHash,
          action: 'upsert',
          targetVectorStoreIds: this.options.profile.vectorStoreRefs?.map((ref) => ref.id) ?? [],
          state: 'pending',
          attempts: 0,
          availableAt: this.now(),
          createdAt: this.now(),
          updatedAt: this.now(),
        });
      });
      const result: ManagedMemoryWriteResult = {
        operationId: request.operationId,
        status: 'committed',
        records: [record],
        indexJobs: [{ id: `${request.operationId}:${record.versionId}:index`, state: 'pending' }],
      };
      if (key) await this.idempotencyStore.set(scopeHash, key, result);
      await this.trace('memory.write.committed', request.operationId, request.scope.runId, {
        scopeHash,
        memoryId: record.id,
        memoryVersionId: record.versionId,
      });
      return structuredClone(result);
    } catch (error) {
      await this.trace('memory.write.rejected', request.operationId, request.scope.runId, {
        scopeHash,
        error: normalizeMemoryError(error),
      });
      throw error;
    }
  }

  async search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]> {
    this.assertProfile(request.profileRef.id);
    const scopeHash = hashMemoryScope(request.scope);
    await this.trace('memory.search.requested', request.operationId, request.scope.runId, {
      scopeHash,
    });
    try {
      const query = normalizeMemoryQuery({
        operationId: request.operationId,
        scope: request.scope,
        principal: request.principal,
        rawQuery: request.query,
        normalizedQuery: request.query?.trim().toLowerCase(),
        queryEmbedding: request.queryEmbedding,
        requestedTypes: request.memoryTypes,
        profileRevision: this.options.profile.revision ?? this.options.profile.version,
      });
      const retrieval = await this.retrieval.retrieve({
        query,
        profileRef: request.profileRef,
        filter: request.filters,
        topK: request.topK ?? this.options.profile.retrievalPolicy.defaultTopK,
        scoreThreshold: request.scoreThreshold,
        includeSuperseded: request.includeSuperseded,
        includeInvalidated: false,
      });
      await this.trace('memory.search.completed', request.operationId, request.scope.runId, {
        scopeHash,
        count: retrieval.results.length,
        retrievalSnapshotId: retrieval.snapshot.id,
      });
      return retrieval.results;
    } catch (error) {
      await this.trace('memory.search.failed', request.operationId, request.scope.runId, {
        scopeHash,
        error: normalizeMemoryError(error, 'MEMORY_RANKING_FAILED'),
      });
      throw error;
    }
  }

  get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null> {
    return this.recordStore.get(request.memoryId, request.scope);
  }

  async list(request: MemoryListRequest): Promise<MemoryListResult> {
    const records = await this.recordStore.list({
      scope: request.scope,
      filter: request.filter,
      limit: request.pagination?.limit,
    });
    return { records, hasMore: false };
  }

  async update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult> {
    const scopeHash = hashMemoryScope(request.scope);
    if (request.idempotencyKey) {
      const reused = await this.idempotencyStore.get(scopeHash, request.idempotencyKey);
      if (reused) return structuredClone(reused) as ManagedMemoryWriteResult;
    }
    const current = await this.recordStore.get(request.memoryId, request.scope);
    if (!current)
      throw normalizeMemoryError(
        new Error(`Memory not found: ${request.memoryId}`),
        'MEMORY_NOT_FOUND'
      );
    if (request.expectedRevision === undefined)
      throw normalizeMemoryError(
        new Error('expectedRevision is required'),
        'MEMORY_REVISION_CONFLICT'
      );
    const updated: ManagedMemoryRecord = {
      ...current,
      ...request.patch,
      versionId: `${current.id}:v${request.expectedRevision + 1}`,
      revision: request.expectedRevision + 1,
      contentHash: hashMemoryContent(request.patch.content ?? current.content),
      updatedAt: this.now(),
      relations: [
        ...(current.relations ?? []),
        { type: 'supersedes', targetMemoryId: current.versionId },
      ],
    };
    const indexJobId = `${request.operationId}:${updated.versionId}:index`;
    await this.persistence.transaction(async ({ recordStore, outboxStore }) => {
      await recordStore.createVersion(updated, request.expectedRevision!);
      await outboxStore.enqueue({
        id: indexJobId,
        operationId: request.operationId,
        memoryId: updated.id,
        memoryVersionId: updated.versionId,
        scopeHash,
        action: 'upsert',
        targetVectorStoreIds: this.options.profile.vectorStoreRefs?.map((ref) => ref.id) ?? [],
        state: 'pending',
        attempts: 0,
        availableAt: this.now(),
        createdAt: this.now(),
        updatedAt: this.now(),
      });
    });
    const result: ManagedMemoryWriteResult = {
      operationId: request.operationId,
      status: 'committed',
      records: [updated],
      indexJobs: [{ id: indexJobId, state: 'pending' }],
    };
    if (request.idempotencyKey) {
      await this.idempotencyStore.set(scopeHash, request.idempotencyKey, result);
    }
    return structuredClone(result);
  }

  async delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult> {
    const scopeHash = hashMemoryScope(request.scope);
    if (request.idempotencyKey) {
      const reused = await this.idempotencyStore.get(scopeHash, request.idempotencyKey);
      if (reused) return structuredClone(reused) as ManagedMemoryDeleteResult;
    }
    const targets =
      request.memoryIds ??
      (await this.recordStore.list({ scope: request.scope, filter: request.filter })).map(
        (record) => record.id
      );
    const deleted: string[] = [];
    for (const id of targets) {
      const current = await this.recordStore.get(id, request.scope);
      if (!current) continue;
      await this.persistence.transaction(async ({ recordStore, outboxStore }) => {
        let versionId = current.versionId;
        if (request.mode === 'hard') {
          await recordStore.delete(id, request.scope);
        } else {
          const tombstone = await recordStore.updateStatus(
            id,
            request.scope,
            current.revision,
            'deleted',
            this.now()
          );
          versionId = tombstone.versionId;
        }
        await outboxStore.enqueue({
          id: `${request.operationId}:${id}:delete`,
          operationId: request.operationId,
          memoryId: id,
          memoryVersionId: versionId,
          scopeHash: current.scopeHash,
          action: 'delete',
          targetVectorStoreIds: this.options.profile.vectorStoreRefs?.map((ref) => ref.id) ?? [],
          state: 'pending',
          attempts: 0,
          availableAt: this.now(),
          createdAt: this.now(),
          updatedAt: this.now(),
        });
      });
      deleted.push(id);
    }
    const result: ManagedMemoryDeleteResult = {
      operationId: request.operationId,
      status: 'completed',
      deletedMemoryIds: deleted,
    };
    if (request.idempotencyKey) {
      await this.idempotencyStore.set(scopeHash, request.idempotencyKey, result);
    }
    return structuredClone(result);
  }

  async history(request: MemoryHistoryRequest): Promise<MemoryVersion[]> {
    const records = await this.recordStore.history(request.memoryId, request.scope);
    return records.map((record) => ({
      memoryId: record.id,
      versionId: record.versionId,
      revision: record.revision,
      record,
    }));
  }

  health(): Promise<ProviderHealth> {
    return this.recordStore.health();
  }
  async close(): Promise<void> {}

  private assertProfile(id: string): void {
    if (id !== this.options.profile.id) throw new Error(`Unknown memory profile: ${id}`);
  }

  private async trace(
    type: MemoryEventType,
    operationId: string,
    runId: string | undefined,
    payload: Record<string, unknown>
  ): Promise<void> {
    if (!this.options.events) return;
    const scopeHash = typeof payload.scopeHash === 'string' ? payload.scopeHash : 'unknown';
    await this.options.events.publish(
      type,
      {
        operationId,
        providerId: this.id,
        scopeHash,
        memoryId: typeof payload.memoryId === 'string' ? payload.memoryId : undefined,
        memoryVersionId:
          typeof payload.memoryVersionId === 'string' ? payload.memoryVersionId : undefined,
        error: payload.error as import('./contracts').NormalizedMemoryError | undefined,
        metadata: { ...payload, scopeHash: undefined },
      },
      { runId: runId ?? 'memory-runtime' }
    );
  }
}

function candidateFromAdd(request: MemoryAddRequest, revision: string): ExtractedMemoryCandidate {
  const text = typeof request.input === 'string' ? request.input : JSON.stringify(request.input);
  return {
    candidateId: `${request.operationId}:candidate`,
    type: request.memoryType ?? 'semantic',
    content: request.input,
    canonicalText: text,
    confidence: 1,
    canonicalKey:
      typeof request.metadata?.canonicalKey === 'string'
        ? request.metadata.canonicalKey
        : sha256(text.trim().toLowerCase()),
    evidence: [
      {
        sourceRef: {
          type: sourceType(request.source.type),
          sourceId: request.source.sourceId ?? request.operationId,
        },
        supportType: 'direct',
        confidence: 1,
      },
    ],
    extractionProfileRevision: revision,
    sourceHash: sha256(request.source),
  };
}

function buildRecord(
  request: MemoryAddRequest,
  candidate: ExtractedMemoryCandidate,
  targetId: string | undefined,
  existing: ManagedMemoryRecord[],
  now: string
): ManagedMemoryRecord {
  const previous = targetId ? existing.find((record) => record.id === targetId) : undefined;
  const id =
    previous?.id ??
    `memory:${sha256({ scope: request.scope, key: candidate.canonicalKey }).slice(7, 31)}`;
  const revision = (previous?.revision ?? 0) + 1;
  return {
    id,
    versionId: `${id}:v${revision}`,
    revision,
    type: candidate.type,
    content: candidate.content,
    canonicalText: candidate.canonicalText,
    scope: request.scope,
    visibility: 'private',
    source: request.source,
    provenance: {
      createdBy: request.principal.principalId,
      providerId: 'memory.provider.native',
      sourceEventIds: request.source.sourceEventId ? [request.source.sourceEventId] : [],
      createdAt: now,
    },
    confidence: candidate.confidence,
    importance: candidate.importance,
    accessCount: previous?.accessCount ?? 0,
    status: 'active',
    tags: request.tags,
    entities: candidate.entities,
    relations: previous
      ? [{ type: 'supersedes', targetMemoryId: previous.versionId }]
      : candidate.relations,
    indexStatus: { state: 'pending', attempts: 0 },
    contentHash: hashMemoryContent(candidate.content),
    scopeHash: hashMemoryScope(request.scope),
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
    metadata: { ...request.metadata, canonicalKey: candidate.canonicalKey },
  };
}

function sourceType(
  type: import('./contracts').MemorySource['type']
): import('./lifecycle-contracts').MemoryExtractionSourceType {
  if (type === 'user_message' || type === 'assistant_message') return 'conversation';
  if (type === 'tool_result') return 'tool_observation';
  if (type === 'artifact') return 'artifact';
  if (type === 'workflow_state') return 'runtime_event';
  return 'structured_record';
}
