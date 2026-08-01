import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryContractSpecRef,
  MemoryManagementCapabilities,
  MemorySource,
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
  MemoryVersion,
  ProviderHealth,
} from './operations';
import {
  resolveExternalMemoryMappingStore,
  type ExternalMemoryClient,
  type ExternalMemoryMappingRuntimeProfile,
  type ExternalMemoryMappingStore,
} from './external-adapters';
import { createExternalMemoryId } from './external-memory-identity';
import {
  createExternalProviderOperation,
  fingerprintExternalOperationFailure,
  resolveExternalProviderOperationStore,
  type ExternalProviderOperation,
  type ExternalProviderOperationStore,
} from './external-provider-operations';
import type { Mem0HttpFetch, Mem0HttpResponse } from './mem0-rest-client';
import { beginProviderPage, finishProviderPage } from './provider-pagination';
import {
  hashMemoryContent,
  hashMemoryScope,
  memoryError,
  normalizeMemoryError,
  sha256,
  stableStringify,
} from './memory-utils';

export const HINDSIGHT_LOCAL_PROTOCOL = 'hindsight.http.v0.8' as const;
export const HINDSIGHT_LOCAL_VERSION = '0.8.5' as const;

const hindsightCapabilities: MemoryManagementCapabilities = {
  add: true,
  search: true,
  get: true,
  list: true,
  update: true,
  delete: true,
  deleteByFilter: false,
  history: true,
  summarize: false,
  consolidate: false,
  decay: false,
  reinforce: false,
  conflictDetection: false,
  hybridSearch: true,
  graphRelations: false,
  asyncWrite: true,
  batchOperations: false,
};

export interface HindsightLocalMemoryBankClientOptions {
  baseUrl: string;
  bearerToken?: string;
  fetch?: Mem0HttpFetch;
  providerId?: string;
  mappingStore?: ExternalMemoryMappingStore;
  mappingProfile?: ExternalMemoryMappingRuntimeProfile;
  operationStore?: ExternalProviderOperationStore;
  operationProfile?: ExternalMemoryMappingRuntimeProfile;
  profileRef?: MemoryContractSpecRef;
  operationDeadlineMs?: number;
  now?: () => Date;
  expectedApiVersion?: string;
}

/** Native adapter for Hindsight Self-hosted HTTP API 0.8. */
export class HindsightLocalMemoryBankClient implements ExternalMemoryClient {
  readonly protocol = HINDSIGHT_LOCAL_PROTOCOL;
  private readonly baseUrl: string;
  private readonly fetcher: Mem0HttpFetch;
  private readonly providerId: string;
  private readonly mappingStore: ExternalMemoryMappingStore;
  private readonly operationStore: ExternalProviderOperationStore;
  private readonly profileRef: MemoryContractSpecRef;
  private readonly now: () => Date;
  private readonly operationDeadlineMs: number;
  private readonly expectedApiVersion: string;
  private readonly inFlight = new Set<AbortController>();
  private closed = false;

  constructor(private readonly options: HindsightLocalMemoryBankClientOptions) {
    if (!isSecureOrLoopback(options.baseUrl)) {
      throw memoryError(
        'MEMORY_PERMISSION_DENIED',
        'Hindsight Local requires HTTPS unless it is bound to a loopback address.'
      );
    }
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    const runtimeFetch = (globalThis as unknown as { fetch?: Mem0HttpFetch }).fetch;
    const fetcher = options.fetch ?? runtimeFetch;
    if (!fetcher) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'No Fetch-compatible transport is available for Hindsight Local.'
      );
    }
    this.fetcher = fetcher;
    this.providerId = options.providerId ?? 'memory.provider.memorybank.hindsight-local';
    this.now = options.now ?? (() => new Date());
    this.mappingStore = resolveExternalMemoryMappingStore(
      options.mappingStore,
      options.mappingProfile ?? 'ephemeral'
    );
    this.operationStore = resolveExternalProviderOperationStore(
      options.operationStore,
      options.operationProfile ?? options.mappingProfile ?? 'ephemeral'
    );
    this.profileRef = options.profileRef ?? { id: 'memorybank-hindsight-local' };
    if (
      (options.mappingProfile === 'production' || options.operationProfile === 'production') &&
      !options.profileRef
    ) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        'Production Hindsight mappings require an explicit profile reference.'
      );
    }
    this.operationDeadlineMs = options.operationDeadlineMs ?? 300_000;
    this.expectedApiVersion = options.expectedApiVersion ?? '0.8';
  }

  async capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>> {
    await this.assertVersion(signal);
    return { ...hindsightCapabilities };
  }

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    assertPrincipalScope(request.principal.userId, request.scope);
    const bankId = bankIdForScope(request.scope);
    const documentId = documentIdForOperation(request.operationId);
    const requestHash = sha256(request);
    const now = this.now().toISOString();
    const candidate = createExternalProviderOperation({
      providerId: this.providerId,
      operationId: request.operationId,
      kind: 'hindsight_operation',
      state: 'reconcile_required',
      scope: request.scope,
      profileRef: request.profileRef,
      principal: {
        principalId: request.principal.principalId,
        userId: request.principal.userId,
      },
      deadlineAt: new Date(this.now().getTime() + this.operationDeadlineMs).toISOString(),
      metadata: { bankId, documentId, requestHash, providerRevision: HINDSIGHT_LOCAL_VERSION },
      now,
    });
    const claimed = await this.operationStore.claim(candidate);
    if (!claimed.created) return this.replayAdd(claimed.operation, requestHash, signal);
    const operation = claimed.operation;

    const text = typeof request.input === 'string' ? request.input : stableStringify(request.input);
    let body: Record<string, unknown>;
    try {
      body = asObject(
        await this.request(`/v1/default/banks/${encodeURIComponent(bankId)}/memories`, {
          method: 'POST',
          signal,
          body: {
            items: [
              {
                content: text,
                document_id: documentId,
                context: stableStringify({
                  source: request.source,
                  inputType: request.inputType,
                  memoryType: request.memoryType,
                }),
                timestamp: now,
                tags: scopeTags(request.scope, request.tags),
                metadata: hindsightMetadata(request.metadata, {
                  _hypha_operation_id: request.operationId,
                  _hypha_scope_hash: hashMemoryScope(request.scope),
                  _hypha_source: stableStringify(request.source),
                }),
              },
            ],
            async: true,
          },
        })
      );
    } catch (error) {
      const normalized = normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE');
      const cancelled = signal?.aborted === true;
      if (cancelled || isDefiniteProviderRejection(normalized)) {
        const failure = cancelled
          ? memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Hindsight retain was cancelled.', false, {
              cancelled: true,
            })
          : normalized;
        await this.operationStore.set({
          ...operation,
          state: cancelled ? 'cancelled' : 'failed',
          attempts: operation.attempts + 1,
          cancellationRequestedAt: cancelled ? this.now().toISOString() : undefined,
          failure,
          failureFingerprint: fingerprintExternalOperationFailure(failure),
          updatedAt: this.now().toISOString(),
        });
        throw failure;
      }
      await this.operationStore.set({
        ...operation,
        state: 'reconcile_required',
        attempts: operation.attempts + 1,
        failure: normalized,
        failureFingerprint: fingerprintExternalOperationFailure(normalized),
        updatedAt: this.now().toISOString(),
      });
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Hindsight retain outcome is unknown and must be reconciled by document identity.',
        false,
        { operationId: request.operationId, documentId, quarantined: true }
      );
    }
    const externalOperationId =
      readString(body, 'operation_id') ?? readStringArray(body, 'operation_ids')[0];
    if (!externalOperationId) {
      await this.operationStore.set({
        ...operation,
        state: 'reconcile_required',
        attempts: operation.attempts + 1,
        updatedAt: this.now().toISOString(),
      });
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Hindsight async retain did not return an operation receipt.',
        false,
        { schemaDrift: true }
      );
    }
    await this.operationStore.set({
      ...operation,
      externalOperationId,
      state: 'pending',
      updatedAt: this.now().toISOString(),
    });
    return {
      operationId: request.operationId,
      status: 'queued',
      records: [],
      events: [externalOperationId],
    };
  }
  private async replayAdd(
    operation: ExternalProviderOperation,
    requestHash: string,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const metadata = asObject(operation.metadata);
    const storedHash = readString(metadata, 'requestHash');
    const bankId = readString(metadata, 'bankId');
    const documentId = readString(metadata, 'documentId');
    if (
      storedHash !== requestHash ||
      operation.scopeHash !== hashMemoryScope(operation.scope) ||
      bankId !== bankIdForScope(operation.scope) ||
      documentId !== documentIdForOperation(operation.operationId)
    ) {
      throw memoryError(
        'MEMORY_IDEMPOTENCY_CONFLICT',
        'Hindsight operationId was already claimed by a different request.',
        false,
        { operationId: operation.operationId }
      );
    }
    if (operation.state === 'succeeded') {
      const records = await this.listDocument(bankId, documentId, operation.scope, signal);
      if (records.length === 0) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Hindsight succeeded operation has no durable document evidence.',
          false,
          { operationId: operation.operationId, reconciliationRequired: true }
        );
      }
      await this.remember(records);
      return { operationId: operation.operationId, status: 'committed', records };
    }
    if (['failed', 'cancelled', 'dead_letter'].includes(operation.state)) {
      return {
        operationId: operation.operationId,
        status: 'failed',
        records: [],
        warnings: [operation.failure?.message ?? `Operation is ${operation.state}.`],
      };
    }
    return {
      operationId: operation.operationId,
      status: 'queued',
      records: [],
      events: operation.externalOperationId ? [operation.externalOperationId] : undefined,
    };
  }
  async reconcileOperation(
    operationId: string,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult | null> {
    const operation = await this.operationStore.get(this.providerId, operationId);
    if (!operation) return null;
    const reconciliationTime = this.now().toISOString();
    const metadata = asObject(operation.metadata);
    const bankId = readString(metadata, 'bankId');
    const documentId = readString(metadata, 'documentId');
    if (!bankId || !documentId || bankId !== bankIdForScope(operation.scope)) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Hindsight operation evidence does not match its canonical scope.'
      );
    }
    if (operation.state === 'succeeded') {
      const records = await this.listDocument(bankId, documentId, operation.scope, signal);
      await this.remember(records);
      return { operationId, status: 'committed', records };
    }
    if (['failed', 'cancelled', 'dead_letter'].includes(operation.state)) {
      return {
        operationId,
        status: 'failed',
        records: [],
        warnings: [operation.failure?.message ?? `Operation is ${operation.state}.`],
      };
    }
    if (operation.cancellationRequestedAt || signal?.aborted) {
      const failure = memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Hindsight operation was cancelled.',
        false,
        { cancelled: true }
      );
      await this.operationStore.set({
        ...operation,
        state: 'cancelled',
        cancellationRequestedAt: operation.cancellationRequestedAt ?? reconciliationTime,
        failure,
        failureFingerprint: fingerprintExternalOperationFailure(failure),
        updatedAt: reconciliationTime,
      });
      return { operationId, status: 'failed', records: [], warnings: [failure.message] };
    }
    if (operation.deadlineAt && operation.deadlineAt <= reconciliationTime) {
      const failure = memoryError(
        'MEMORY_PROVIDER_TIMEOUT',
        'Hindsight operation exceeded its reconciliation deadline.',
        false,
        { operationId, deadlineAt: operation.deadlineAt }
      );
      await this.operationStore.set({
        ...operation,
        state: 'dead_letter',
        failure,
        failureFingerprint: fingerprintExternalOperationFailure(failure),
        updatedAt: reconciliationTime,
      });
      return { operationId, status: 'failed', records: [], warnings: [failure.message] };
    }

    if (!operation.externalOperationId) {
      const records = await this.listDocument(bankId, documentId, operation.scope, signal);
      if (records.length === 0) {
        return {
          operationId,
          status: 'queued',
          records: [],
          warnings: ['Unknown retain outcome remains quarantined; document evidence is absent.'],
        };
      }
      await this.remember(records);
      await this.operationStore.set({
        ...operation,
        state: 'succeeded',
        updatedAt: this.now().toISOString(),
      });
      return { operationId, status: 'committed', records };
    }
    let receipt: Record<string, unknown>;
    try {
      receipt = asObject(
        await this.request(
          `/v1/default/banks/${encodeURIComponent(bankId)}/operations/${encodeURIComponent(operation.externalOperationId)}`,
          { signal }
        )
      );
    } catch (error) {
      if (!isMemoryCode(error, 'MEMORY_NOT_FOUND')) throw error;
      const records = await this.listDocument(bankId, documentId, operation.scope, signal);
      if (records.length === 0) {
        return {
          operationId,
          status: 'queued',
          records: [],
          warnings: ['Operation receipt expired and document evidence is not yet available.'],
        };
      }
      await this.remember(records);
      await this.operationStore.set({
        ...operation,
        state: 'succeeded',
        attempts: operation.attempts + 1,
        updatedAt: this.now().toISOString(),
      });
      return { operationId, status: 'committed', records };
    }
    const state = readString(receipt, 'status');
    if (state === 'pending' || state === 'processing') {
      await this.operationStore.set({
        ...operation,
        state: state === 'processing' ? 'running' : 'pending',
        attempts: operation.attempts + 1,
        updatedAt: this.now().toISOString(),
      });
      return {
        operationId,
        status: 'queued',
        records: [],
        events: [operation.externalOperationId],
      };
    }
    if (state === 'failed' || state === 'cancelled') {
      const failure = memoryError(
        state === 'cancelled' ? 'MEMORY_PROVIDER_UNAVAILABLE' : 'MEMORY_INTERNAL_ERROR',
        state === 'cancelled'
          ? 'Hindsight operation was cancelled by the provider.'
          : 'Hindsight retain operation failed.',
        false,
        { operationId, providerState: state }
      );
      await this.operationStore.set({
        ...operation,
        state: state === 'cancelled' ? 'cancelled' : 'failed',
        attempts: operation.attempts + 1,
        failure,
        failureFingerprint: fingerprintExternalOperationFailure(failure),
        updatedAt: this.now().toISOString(),
      });
      return {
        operationId,
        status: 'failed',
        records: [],
        events: [operation.externalOperationId],
        warnings: [failure.message],
      };
    }
    if (state !== 'completed') {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Hindsight operation returned unsupported state ${state ?? 'unknown'}.`,
        false,
        { schemaDrift: true, operationId }
      );
    }
    const records = await this.listDocument(bankId, documentId, operation.scope, signal);
    await this.remember(records);
    await this.operationStore.set({
      ...operation,
      state: 'succeeded',
      attempts: operation.attempts + 1,
      updatedAt: this.now().toISOString(),
    });
    return {
      operationId,
      status: 'committed',
      records,
      events: [operation.externalOperationId],
    };
  }

  async search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    assertPrincipalScope(request.principal.userId, request.scope);
    if (!request.query) {
      const listed = await this.list(
        {
          operationId: request.operationId,
          principal: request.principal,
          scope: request.scope,
          filter: request.filters,
          pagination: { limit: request.topK ?? request.pagination?.limit },
        },
        signal
      );
      return listed.records.map((record) => ({ record, reasons: ['hindsight_exact_bank'] }));
    }
    const bankId = bankIdForScope(request.scope);
    const body = asObject(
      await this.request(`/v1/default/banks/${encodeURIComponent(bankId)}/memories/recall`, {
        method: 'POST',
        signal,
        body: {
          query: request.query,
          types: ['world', 'experience'],
          tags: scopeTags(request.scope, request.filters?.tagsAll),
          tags_match: 'all_strict',
        },
      })
    );
    const values = asArray(body.results ?? body.memories ?? body.items);
    const candidates = values
      .map((entry) => {
        const wrapper = asObject(entry);
        return { wrapper, item: asObject(wrapper.memory ?? entry) };
      })
      .filter(({ item }) => isCuratableHindsightMemory(item))
      .slice(0, request.topK ?? values.length);
    const results = candidates.map(({ wrapper, item }) => {
      const record = this.toRecord(item, request.scope, {
        type: 'derived',
        sourceId: 'hindsight:recall',
      });
      const score = readNumber(wrapper, 'score') ?? readNumber(item, 'score');
      return {
        record,
        score,
        semanticScore: score,
        reasons: ['hindsight_exact_bank', 'hindsight_recall'],
      };
    });
    await this.remember(results.map((result) => result.record));
    return results;
  }

  async get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    assertPrincipalScope(request.principal.userId, request.scope);
    const externalId = await this.resolveExternalId(request.memoryId, request.scope);
    let body: unknown;
    try {
      body = await this.request(
        `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/${encodeURIComponent(externalId)}`,
        { signal }
      );
    } catch (error) {
      if (isMemoryCode(error, 'MEMORY_NOT_FOUND')) return null;
      throw error;
    }
    const record = this.toRecord(asObject(body), request.scope, {
      type: 'derived',
      sourceId: 'hindsight:get',
    });
    await this.remember([record]);
    return record;
  }

  async list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    assertPrincipalScope(request.principal.userId, request.scope);
    const page = beginProviderPage(
      this.providerId,
      request.scope,
      request.pagination,
      this.now().getTime()
    );
    let scanOffset = page.providerCursor ? parseOffset(page.providerCursor) : 0;
    const limit = request.pagination?.limit ?? 100;
    const batchSize = Math.max(25, Math.min(100, limit * 4));
    const maxScanCalls = Math.max(1, request.pagination?.maxCalls ?? 100);
    const records: ManagedMemoryRecord[] = [];
    let total: number | undefined;
    let scanCalls = 0;
    while (records.length < limit && (total === undefined || scanOffset < total)) {
      if (scanCalls >= maxScanCalls) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Hindsight list scan exhausted its upstream call budget.'
        );
      }
      scanCalls += 1;
      const query = new URLSearchParams({
        limit: String(batchSize),
        offset: String(scanOffset),
        tags_match: 'all_strict',
      });
      for (const tag of scopeTags(request.scope, request.filter?.tagsAll)) {
        query.append('tags', tag);
      }
      if (request.filter?.statuses?.length === 1) query.set('state', request.filter.statuses[0]);
      const body = asObject(
        await this.request(
          `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/list?${query}`,
          { signal }
        )
      );
      const values = asArray(body.items);
      total = readNumber(body, 'total') ?? scanOffset + values.length;
      if (values.length === 0) break;
      for (const value of values) {
        scanOffset += 1;
        const item = asObject(value);
        if (isCuratableHindsightMemory(item)) {
          records.push(
            this.toRecord(item, request.scope, {
              type: 'derived',
              sourceId: 'hindsight:list',
            })
          );
        }
        if (records.length >= limit) break;
      }
    }
    await this.remember(records);
    const nextOffset = scanOffset;
    const pagination = finishProviderPage(
      page,
      this.providerId,
      request.scope,
      records,
      total !== undefined && nextOffset < total ? String(nextOffset) : undefined,
      this.now().getTime()
    );
    return { records, ...pagination };
  }

  async update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    assertPrincipalScope(request.principal.userId, request.scope);
    const mapping = await this.resolveMapping(request.memoryId, request.scope);
    if (
      request.expectedRevision !== undefined &&
      mapping.binding.recordRevision !== request.expectedRevision
    ) {
      throw memoryError(
        'MEMORY_REVISION_CONFLICT',
        'Hindsight mapping revision does not match expectedRevision.',
        false,
        {
          expectedRevision: request.expectedRevision,
          actualRevision: mapping.binding.recordRevision,
        }
      );
    }
    const patch: Record<string, unknown> = {};
    if (request.patch.canonicalText !== undefined || request.patch.content !== undefined) {
      patch.text =
        request.patch.canonicalText ??
        (typeof request.patch.content === 'string'
          ? request.patch.content
          : stableStringify(request.patch.content));
    }
    if (request.patch.status === 'invalidated') {
      patch.state = 'invalidated';
      patch.reason = request.reason;
    } else if (request.patch.status === 'active') {
      patch.state = 'valid';
      patch.reason = request.reason;
    }
    let body = asObject(
      await this.request(
        `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/${encodeURIComponent(mapping.externalId)}`,
        { method: 'PATCH', signal, body: patch }
      )
    );
    if (Object.keys(body).length === 0) {
      body = asObject(
        await this.request(
          `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/${encodeURIComponent(mapping.externalId)}`,
          { signal }
        )
      );
    }
    const record: ManagedMemoryRecord = {
      ...this.toRecord(body, request.scope, {
        type: 'human_review',
        sourceId: request.operationId,
      }),
      revision: mapping.binding.recordRevision + 1,
    };
    record.versionId = `${record.id}:v${record.revision}`;
    await this.remember([record]);
    return { operationId: request.operationId, status: 'committed', records: [record] };
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    assertPrincipalScope(request.principal.userId, request.scope);
    if (request.mode !== 'soft' || !request.memoryIds) {
      return {
        operationId: request.operationId,
        status: 'rejected',
        deletedMemoryIds: [],
        warnings: ['Hindsight hard/filter deletion is restricted to the governed purge workflow.'],
      };
    }
    const deleted: string[] = [];
    for (const memoryId of request.memoryIds) {
      const mapping = await this.resolveMapping(memoryId, request.scope);
      await this.request(
        `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/${encodeURIComponent(mapping.externalId)}`,
        {
          method: 'PATCH',
          signal,
          body: { state: 'invalidated', reason: request.reason },
        }
      );
      await this.mappingStore.set({
        ...mapping,
        syncState: 'deleted',
        lastSyncedAt: this.now().toISOString(),
      });
      deleted.push(memoryId);
    }
    return { operationId: request.operationId, status: 'completed', deletedMemoryIds: deleted };
  }

  async history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    assertPrincipalScope(request.principal.userId, request.scope);
    const externalId = await this.resolveExternalId(request.memoryId, request.scope);
    const body = await this.request(
      `/v1/default/banks/${encodeURIComponent(bankIdForScope(request.scope))}/memories/${encodeURIComponent(externalId)}/history`,
      { signal }
    );
    const object = asObject(body);
    const values = Array.isArray(body)
      ? body
      : asArray(object.items ?? object.history ?? object.versions);
    return values.map((item, index) => {
      const record = this.toRecord(asObject(item), request.scope, {
        type: 'derived',
        sourceId: 'hindsight:history',
      });
      const revision = readNumber(asObject(item), 'revision') ?? index + 1;
      return {
        memoryId: request.memoryId,
        versionId: readString(asObject(item), 'version_id') ?? `${request.memoryId}:v${revision}`,
        revision,
        record: { ...record, id: request.memoryId, revision },
      };
    });
  }

  async health(signal?: AbortSignal): Promise<ProviderHealth> {
    const started = this.now().getTime();
    try {
      await this.request('/health', { signal });
      const version = asObject(await this.request('/version', { signal }));
      const apiVersion = readString(version, 'api_version');
      const compatible = Boolean(apiVersion?.startsWith(this.expectedApiVersion + '.'));
      return {
        status: compatible ? 'healthy' : 'unhealthy',
        checkedAt: this.now().toISOString(),
        latencyMs: Math.max(0, this.now().getTime() - started),
        message: compatible ? undefined : 'Hindsight API version is outside the pinned dialect.',
        details: {
          deployment: 'self_hosted',
          service: 'hindsight',
          apiVersion,
          expectedApiVersion: `${this.expectedApiVersion}.x`,
          features: asObject(version.features),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        latencyMs: Math.max(0, this.now().getTime() - started),
        message: isMemoryError(error) ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    this.closed = true;
    for (const controller of this.inFlight) controller.abort();
    this.inFlight.clear();
  }

  private async assertVersion(signal?: AbortSignal): Promise<void> {
    const version = asObject(await this.request('/version', { signal }));
    const actual = readString(version, 'api_version');
    if (!actual || !actual.startsWith(this.expectedApiVersion + '.')) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Hindsight API version ${actual ?? 'unknown'} is outside the pinned ${this.expectedApiVersion}.x dialect.`,
        false,
        { schemaDrift: true, expectedApiVersion: this.expectedApiVersion, actualApiVersion: actual }
      );
    }
  }

  private async listDocument(
    bankId: string,
    documentId: string,
    scope: ManagedMemoryScope,
    signal?: AbortSignal
  ): Promise<ManagedMemoryRecord[]> {
    const query = new URLSearchParams({ document_id: documentId, limit: '100', offset: '0' });
    const body = asObject(
      await this.request(`/v1/default/banks/${encodeURIComponent(bankId)}/memories/list?${query}`, {
        signal,
      })
    );
    return asArray(body.items)
      .map(asObject)
      .filter(isCuratableHindsightMemory)
      .map((item) =>
        this.toRecord(item, scope, {
          type: 'derived',
          sourceId: 'hindsight:reconcile',
        })
      );
  }

  private toRecord(
    item: Record<string, unknown>,
    scope: ManagedMemoryScope,
    source: MemorySource
  ): ManagedMemoryRecord {
    const externalId = readString(item, 'id') ?? readString(item, 'memory_id');
    if (!externalId) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Hindsight memory unit lacks an id.',
        false,
        { schemaDrift: true }
      );
    }
    const text = readString(item, 'text') ?? readString(item, 'content') ?? '';
    const id = createExternalMemoryId(this.providerId, externalId);
    const createdAt = normalizeHindsightTimestamp(
      readString(item, 'created_at') ?? readString(item, 'date'),
      this.now().toISOString()
    );
    const updatedAt = normalizeHindsightTimestamp(readString(item, 'updated_at'), createdAt);
    const metadata = asObject(item.metadata);
    const declaredScopeHash = readString(metadata, '_hypha_scope_hash');
    if (declaredScopeHash && declaredScopeHash !== hashMemoryScope(scope)) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Hindsight response metadata belongs to a different Hypha scope.'
      );
    }
    const hindsightType = readString(item, 'type');
    const status = readString(item, 'state') === 'invalidated' ? 'invalidated' : 'active';
    const revision = readNumber(item, 'revision') ?? 1;
    return {
      id,
      versionId: `${id}:v${revision}`,
      revision,
      type:
        hindsightType === 'experience'
          ? 'episodic'
          : hindsightType === 'observation'
            ? 'reflection'
            : 'semantic',
      content: text,
      canonicalText: text,
      scope,
      visibility: 'private',
      source,
      provenance: { createdBy: 'hindsight', providerId: this.providerId, createdAt },
      accessCount: 0,
      status,
      tags: readStringArray(item, 'tags'),
      indexStatus: { state: status === 'invalidated' ? 'deleted' : 'indexed', attempts: 0 },
      contentHash: hashMemoryContent(text),
      scopeHash: hashMemoryScope(scope),
      createdAt,
      updatedAt,
      metadata: {
        ...metadata,
        providerExternalId: externalId,
        hindsightType,
        hindsightContext: item.context,
        hindsightEntities: item.entities,
      },
    };
  }

  private async remember(records: ManagedMemoryRecord[]): Promise<void> {
    for (const record of records) {
      await this.mappingStore.set({
        memoryId: record.id,
        providerId: this.providerId,
        externalId: String(record.metadata?.providerExternalId),
        binding: {
          scopeHash: record.scopeHash,
          profileRef: this.profileRef,
          recordRevision: record.revision,
          provenance: record.provenance,
        },
        lastSyncedAt: this.now().toISOString(),
        syncState: record.status === 'invalidated' ? 'deleted' : 'synced',
        metadata: {
          scope: record.scope,
          bankId: bankIdForScope(record.scope),
          providerRevision: HINDSIGHT_LOCAL_VERSION,
        },
      });
    }
  }

  private async resolveMapping(memoryId: string, scope: ManagedMemoryScope) {
    const mapping = await this.mappingStore.get(this.providerId, memoryId);
    if (!mapping) {
      throw memoryError('MEMORY_NOT_FOUND', `No Hindsight mapping exists for ${memoryId}.`);
    }
    if (mapping.binding.scopeHash !== hashMemoryScope(scope)) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Hindsight mapping does not belong to the requested scope.'
      );
    }
    return mapping;
  }

  private async resolveExternalId(memoryId: string, scope: ManagedMemoryScope): Promise<string> {
    return (await this.resolveMapping(memoryId, scope)).externalId;
  }

  private async request(
    path: string,
    init: { method?: string; body?: unknown; signal?: AbortSignal } = {}
  ): Promise<unknown> {
    if (this.closed) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Hindsight Local client is closed.');
    }
    if (init.signal?.aborted) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Hindsight request was cancelled.', false, {
        cancelled: true,
      });
    }
    const controller = new AbortController();
    const abort = () => controller.abort(init.signal?.reason);
    init.signal?.addEventListener('abort', abort, { once: true });
    this.inFlight.add(controller);
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (this.options.bearerToken) headers.Authorization = `Bearer ${this.options.bearerToken}`;
      const response = await this.fetcher(this.baseUrl + path, {
        method: init.method,
        headers,
        body: init.body === undefined ? undefined : JSON.stringify(init.body),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw normalizeHttpError(
          response,
          init.method ?? 'GET',
          classifyHindsightRoute(path, init.body)
        );
      }
      if (response.status === 204) return {};
      const text = await response.text();
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Hindsight returned malformed JSON.',
          false,
          { schemaDrift: true }
        );
      }
    } finally {
      init.signal?.removeEventListener('abort', abort);
      this.inFlight.delete(controller);
    }
  }
}

export function bankIdForScope(scope: ManagedMemoryScope): string {
  return `hypha-${sha256(scope)
    .replace(/^sha256:/, '')
    .slice(0, 40)}`;
}

export function documentIdForOperation(operationId: string): string {
  return `hypha-op-${sha256(operationId)
    .replace(/^sha256:/, '')
    .slice(0, 40)}`;
}

function scopeTags(scope: ManagedMemoryScope, additional: string[] = []): string[] {
  return [
    ...new Set([
      `hypha-scope:${hashMemoryScope(scope).replace(/^sha256:/, '')}`,
      ...Object.entries(scope).map(
        ([key, value]) =>
          `hypha-${key}:${sha256(value)
            .replace(/^sha256:/, '')
            .slice(0, 24)}`
      ),
      ...additional,
    ]),
  ].sort();
}

function isCuratableHindsightMemory(item: Record<string, unknown>): boolean {
  const type = readString(item, 'type') ?? readString(item, 'fact_type');
  return type !== 'observation';
}

function normalizeHindsightTimestamp(value: string | undefined, fallback: string): string {
  const parsed = new Date(value ?? fallback);
  if (Number.isNaN(parsed.getTime())) {
    throw memoryError(
      'MEMORY_PROVIDER_UNAVAILABLE',
      'Hindsight returned an invalid timestamp.',
      false,
      { schemaDrift: true }
    );
  }
  return parsed.toISOString();
}

function hindsightMetadata(
  metadata: Record<string, unknown> | undefined,
  reserved: Record<string, string>
): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata ?? {})) {
    if (value !== undefined) {
      normalized[key] = typeof value === 'string' ? value : stableStringify(value);
    }
  }
  return { ...normalized, ...reserved };
}

function assertPrincipalScope(
  principalUserId: string | undefined,
  scope: ManagedMemoryScope
): void {
  if (principalUserId && principalUserId !== scope.userId) {
    throw memoryError(
      'MEMORY_SCOPE_DENIED',
      'Hindsight principal user does not match the requested Memory scope.'
    );
  }
}
function isSecureOrLoopback(baseUrl: string): boolean {
  return (
    /^https:\/\//.test(baseUrl) ||
    /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/.test(baseUrl)
  );
}

function classifyHindsightRoute(path: string, body?: unknown): string {
  if (path === '/version') return 'version';
  if (path === '/health') return 'health';
  if (path.includes('/operations/')) return 'operation';
  if (path.endsWith('/memories/recall')) return 'memory.recall';
  if (path.includes('/memories/list')) return 'memory.list';
  if (path.endsWith('/history')) return 'memory.history';
  if (path.includes('/memories/')) {
    const state = readString(asObject(body), 'state');
    if (state === 'invalidated') return 'memory.invalidate';
    if (state === 'valid') return 'memory.restore';
    return 'memory.update';
  }
  if (path.endsWith('/memories')) return 'memory.retain';
  return 'unknown';
}

function normalizeHttpError(
  response: Mem0HttpResponse,
  method: string,
  route: string
) {
  const code =
    response.status === 401 || response.status === 403
      ? 'MEMORY_PERMISSION_DENIED'
      : response.status === 404
        ? 'MEMORY_NOT_FOUND'
        : response.status === 409
          ? 'MEMORY_REVISION_CONFLICT'
          : response.status === 408 || response.status === 504
            ? 'MEMORY_PROVIDER_TIMEOUT'
            : 'MEMORY_PROVIDER_UNAVAILABLE';
  return memoryError(
    code,
    `Hindsight ${method} ${route} HTTP ${response.status} ${response.statusText}`,
    response.status === 408 || response.status === 429 || response.status >= 500,
    { status: response.status, method, route }
  );
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' ? (value[key] as string) : undefined;
}

function readNumber(value: Record<string, unknown>, key: string): number | undefined {
  return typeof value[key] === 'number' && Number.isFinite(value[key])
    ? (value[key] as number)
    : undefined;
}

function readStringArray(value: Record<string, unknown>, key: string): string[] {
  return asArray(value[key]).filter((item): item is string => typeof item === 'string');
}

function parseOffset(value: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Hindsight pagination offset is invalid.');
  }
  return parsed;
}

function isMemoryError(value: unknown): value is { code: string; message: string } {
  return Boolean(
    value &&
    typeof value === 'object' &&
    typeof (value as { code?: unknown }).code === 'string' &&
    typeof (value as { message?: unknown }).message === 'string'
  );
}

function isDefiniteProviderRejection(value: unknown): boolean {
  if (!isMemoryError(value)) return false;
  const status = (value as { details?: { status?: unknown } }).details?.status;
  return (
    typeof status === 'number' && status >= 400 && status < 500 && status !== 408 && status !== 429
  );
}
function isMemoryCode(value: unknown, code: string): boolean {
  return isMemoryError(value) && value.code === code;
}
