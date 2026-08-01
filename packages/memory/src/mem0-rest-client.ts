import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryManagementCapabilities,
  MemorySource,
} from './contracts';
import { matchesFilter } from './managed-store';
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
import {
  createExternalProviderOperation,
  resolveExternalProviderOperationStore,
  type ExternalProviderOperationStore,
} from './external-provider-operations';
import { createExternalMemoryId } from './external-memory-identity';
import { beginProviderPage, finishProviderPage } from './provider-pagination';
import { normalizeExternalProviderBaseUrl } from './external-provider-url';
import { hashMemoryContent, hashMemoryScope, memoryError, stableStringify } from './memory-utils';

export interface Mem0HttpResponse {
  ok: boolean;
  status: number;
  statusText: string;
  headers?: { get(name: string): string | null };
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export type Mem0HttpFetch = (
  url: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
  }
) => Promise<Mem0HttpResponse>;

export interface Mem0OssClientOptions {
  baseUrl: string;
  apiKey?: string;
  authMode?: 'x-api-key' | 'bearer' | 'none';
  fetch?: Mem0HttpFetch;
  providerId?: string;
  healthPath?: string;
  now?: () => Date;
  mappingStore?: ExternalMemoryMappingStore;
  mappingProfile?: ExternalMemoryMappingRuntimeProfile;
  operationStore?: ExternalProviderOperationStore;
  operationProfile?: ExternalMemoryMappingRuntimeProfile;
  providerVersion?: string;
  expectedProviderVersion?: string;
  expectedCapabilities?: Partial<MemoryManagementCapabilities>;
  listPaginationMode?: 'top-k-offset' | 'provider-cursor';
  allowInsecureForTests?: boolean;
}

const mem0RestCapabilities: MemoryManagementCapabilities = {
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
  hybridSearch: false,
  graphRelations: false,
  asyncWrite: false,
  batchOperations: false,
};

export class Mem0OssClient implements ExternalMemoryClient {
  private readonly baseUrl: string;
  private readonly fetcher: Mem0HttpFetch;
  private readonly providerId: string;
  private readonly now: () => Date;
  private readonly mappingStore: ExternalMemoryMappingStore;
  private readonly operationStore: ExternalProviderOperationStore;
  private readonly inFlight = new Set<AbortController>();
  private closed = false;

  constructor(private readonly options: Mem0OssClientOptions) {
    if (
      options.expectedProviderVersion &&
      options.providerVersion !== options.expectedProviderVersion
    ) {
      throw memoryError(
        'MEMORY_PROVIDER_NOT_INSTALLED',
        'Mem0 OSS version mismatch: expected ' +
          options.expectedProviderVersion +
          ', observed ' +
          (options.providerVersion ?? '<missing>') +
          '.'
      );
    }
    for (const [capability, expected] of Object.entries(options.expectedCapabilities ?? {})) {
      const observed = mem0RestCapabilities[
        capability as keyof MemoryManagementCapabilities
      ] as boolean;
      if (observed !== expected) {
        throw memoryError(
          'MEMORY_PROVIDER_NOT_INSTALLED',
          'Mem0 OSS capability drift: ' +
            capability +
            ' expected ' +
            String(expected) +
            ', observed ' +
            String(observed) +
            '.'
        );
      }
    }
    this.baseUrl = normalizeExternalProviderBaseUrl(options.baseUrl, {
      providerName: 'Mem0 OSS',
      allowLoopbackHttp: true,
      allowInsecureForTests: options.allowInsecureForTests,
    });
    const runtimeFetch = (globalThis as unknown as { fetch?: Mem0HttpFetch }).fetch;
    const fetcher = options.fetch ?? runtimeFetch;
    if (!fetcher) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'No Fetch-compatible HTTP transport is available for Mem0.'
      );
    }
    this.fetcher = fetcher;
    this.providerId = options.providerId ?? 'memory.provider.mem0.rest';
    this.now = options.now ?? (() => new Date());
    const persistenceProfile = options.mappingProfile ?? 'ephemeral';
    this.mappingStore = resolveExternalMemoryMappingStore(options.mappingStore, persistenceProfile);
    this.operationStore = resolveExternalProviderOperationStore(
      options.operationStore,
      options.operationProfile ?? 'ephemeral'
    );
  }

  async capabilities(): Promise<Partial<MemoryManagementCapabilities>> {
    return { ...mem0RestCapabilities };
  }

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    try {
      return await this.addOnce(request, signal);
    } catch (error) {
      if (isUnknownWriteOutcome(error)) {
        await this.operationStore.set(
          createExternalProviderOperation({
            providerId: this.providerId,
            operationId: request.operationId,
            kind: 'unknown_write',
            state: 'reconcile_required',
            scope: request.scope,
            profileRef: request.profileRef,
            principal: {
              principalId: request.principal.principalId,
              userId: request.principal.userId,
            },
            now: this.now().toISOString(),
          })
        );
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Mem0 OSS write outcome is unknown and quarantined for reconciliation.',
          false,
          { operationId: request.operationId, quarantined: true }
        );
      }
      throw error;
    }
  }

  private async addOnce(
    request: MemoryAddRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const scopeHash = hashMemoryScope(request.scope);
    const metadata = {
      ...request.metadata,
      _hypha_scope_hash: scopeHash,
      _hypha_scope: request.scope,
      _hypha_operation_id: request.operationId,
      _hypha_memory_type: request.memoryType ?? 'semantic',
      _hypha_source: request.source,
    };
    const body = await this.request('/memories', {
      method: 'POST',
      body: {
        messages: toMem0Messages(request.input),
        ...toMem0Scope(request.scope),
        metadata,
        infer: request.extractionMode !== 'none',
      },
      signal,
    });
    const records = this.toRecords(body, request.scope, {
      source: request.source,
      type: request.memoryType ?? 'semantic',
      metadata,
      requireScopeMetadata: false,
    });
    await this.rememberMappings(records);
    const eventId = readString(asObject(body), 'event_id');
    return {
      operationId: request.operationId,
      status: records.length > 0 ? 'committed' : eventId ? 'queued' : 'partial',
      records,
      events: eventId ? [eventId] : undefined,
      warnings:
        records.length === 0 && !eventId
          ? ['Mem0 accepted the request but returned no record identifiers.']
          : undefined,
    };
  }

  async search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    const body = await this.request('/search', {
      method: 'POST',
      body: {
        query: request.query ?? '',
        filters: toMem0SearchScope(request.scope),
        top_k: request.topK,
      },
      signal,
    });
    const results = extractItems(body)
      .map((item) => {
        const record = this.toRecord(item, request.scope, {
          source: { type: 'derived', sourceId: 'mem0:search' },
          type: request.memoryTypes?.[0] ?? 'semantic',
          requireScopeMetadata: true,
        });
        if (!record || !matchesFilter(record, request.filters)) return null;
        const result: ManagedMemorySearchResult = {
          record,
          reasons: ['mem0_rest_search'],
        };
        const score = readNumber(item, 'score');
        if (score !== undefined) {
          result.score = score;
          result.semanticScore = score;
        }
        return result;
      })
      .filter((result): result is ManagedMemorySearchResult => result !== null)
      .slice(0, request.topK ?? Number.POSITIVE_INFINITY);
    await this.rememberMappings(results.map((result) => result.record));
    return results;
  }

  async get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    const externalId = await this.resolveExternalId(request.memoryId, request.scope);
    const body = await this.request('/memories/' + encodeURIComponent(externalId), {
      signal,
    });
    const record = this.toRecord(asObject(body), request.scope, {
      source: { type: 'derived', sourceId: 'mem0:get' },
      type: 'semantic',
      requireScopeMetadata: true,
    });
    await this.rememberMappings(record ? [record] : []);
    return record;
  }

  async list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    const page = beginProviderPage(
      this.providerId,
      request.scope,
      request.pagination,
      this.now().getTime()
    );
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(toMem0Scope(request.scope))) {
      if (value) query.set(key, value);
    }
    const limit = request.pagination?.limit;
    const providerCursorPagination = this.options.listPaginationMode === 'provider-cursor';
    const offset = providerCursorPagination
      ? 0
      : page.providerCursor
        ? Number(page.providerCursor)
        : 0;
    if (!Number.isSafeInteger(offset) || offset < 0) {
      throw memoryError('MEMORY_INVALID_INPUT', 'Mem0 pagination offset is malformed.');
    }
    if (providerCursorPagination) {
      if (limit) query.set('page_size', String(limit));
      if (page.providerCursor) query.set('cursor', page.providerCursor);
    } else if (limit) {
      const topK = offset + limit + 1;
      if (topK > 1_000) {
        throw memoryError('MEMORY_INVALID_INPUT', 'Mem0 pagination exceeds the top_k limit.');
      }
      query.set('top_k', String(topK));
    }
    const body = await this.request('/memories' + (query.size > 0 ? '?' + query.toString() : ''), {
      signal,
    });
    const records = this.toRecords(body, request.scope, {
      source: { type: 'derived', sourceId: 'mem0:list' },
      type: 'semantic',
      requireScopeMetadata: true,
    });
    await this.rememberMappings(records);
    const filtered = records.filter((record) => matchesFilter(record, request.filter));
    const pageRecords =
      limit && !providerCursorPagination ? filtered.slice(offset, offset + limit) : filtered;
    const nextProviderCursor = providerCursorPagination
      ? readProviderCursor(body)
      : limit && filtered.length > offset + limit
        ? String(offset + limit)
        : undefined;
    const pagination = finishProviderPage(
      page,
      this.providerId,
      request.scope,
      pageRecords,
      nextProviderCursor,
      this.now().getTime()
    );
    return { records: pageRecords, ...pagination };
  }
  async update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const revision = (request.expectedRevision ?? 0) + 1;
    const metadata = {
      ...request.patch.metadata,
      _hypha_scope_hash: hashMemoryScope(request.scope),
      _hypha_scope: request.scope,
      _hypha_operation_id: request.operationId,
      _hypha_revision: revision,
    };
    const externalId = await this.resolveExternalId(request.memoryId, request.scope);
    const body = await this.request('/memories/' + encodeURIComponent(externalId), {
      method: 'PUT',
      body: {
        text: request.patch.canonicalText ?? toText(request.patch.content),
        metadata,
      },
      signal,
    });
    const records = this.toRecords(body, request.scope, {
      source: { type: 'human_review', sourceId: request.operationId },
      type: 'semantic',
      metadata,
      revision,
      requireScopeMetadata: false,
    });
    if (records.length === 0) {
      const verified = await this.get(
        {
          operationId: request.operationId + ':verify',
          principal: request.principal,
          scope: request.scope,
          memoryId: request.memoryId,
        },
        signal
      );
      const expectedText = request.patch.canonicalText ?? toText(request.patch.content);
      if (verified && (!expectedText || verified.canonicalText === expectedText)) {
        records.push(verified);
      }
    }
    await this.rememberMappings(records);
    return {
      operationId: request.operationId,
      status: records.length > 0 ? 'committed' : 'partial',
      records,
      warnings:
        records.length === 0 ? ['Mem0 update could not be verified by read-back.'] : undefined,
    };
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    const memoryIds =
      request.memoryIds ??
      (
        await this.list(
          {
            operationId: request.operationId + ':resolve',
            principal: request.principal,
            scope: request.scope,
            filter: request.filter,
          },
          signal
        )
      ).records.map((record) => record.id);
    const deleted: string[] = [];
    const warnings: string[] = [];
    for (const memoryId of memoryIds) {
      const mapping = await this.mappingStore.get(this.providerId, memoryId);
      if (!mapping || mapping.syncState === 'deleted') {
        warnings.push(`No active Mem0 mapping exists for Hypha memory ${memoryId}.`);
        continue;
      }
      this.assertScope(mapping.binding.scopeHash, request.scope);
      await this.mappingStore.set({
        ...mapping,
        syncState: 'pending',
        lastSyncedAt: this.now().toISOString(),
      });
      try {
        await this.request('/memories/' + encodeURIComponent(mapping.externalId), {
          method: 'DELETE',
          signal,
        });
        await this.mappingStore.set({
          ...mapping,
          syncState: 'deleted',
          lastSyncedAt: this.now().toISOString(),
        });
        deleted.push(memoryId);
      } catch (error) {
        await this.mappingStore.set({
          ...mapping,
          syncState: 'failed',
          lastSyncedAt: this.now().toISOString(),
        });
        warnings.push(error instanceof Error ? error.message : String(error));
      }
    }
    return {
      operationId: request.operationId,
      status: warnings.length === 0 ? 'completed' : 'partial',
      deletedMemoryIds: deleted,
      pendingProviderIds: warnings.length > 0 ? [this.providerId] : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  async history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    const externalId = await this.resolveExternalId(request.memoryId, request.scope);
    const body = await this.request('/memories/' + encodeURIComponent(externalId) + '/history', {
      signal,
    });
    const records = this.toRecords(body, request.scope, {
      source: { type: 'derived', sourceId: 'mem0:history' },
      type: 'semantic',
      requireScopeMetadata: true,
    });
    await this.rememberMappings(records);
    return records
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt))
      .map((record, index) => {
        const revision = readRevision(record, index + 1);
        const versioned = {
          ...record,
          revision,
          versionId: record.id + ':v' + revision,
        };
        return {
          memoryId: versioned.id,
          versionId: versioned.versionId,
          revision,
          record: versioned,
        };
      });
  }

  async reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]> {
    const operation = await this.operationStore.get(this.providerId, operationId);
    if (!operation || operation.state !== 'reconcile_required') return [];
    const listed = await this.list(
      {
        operationId: operationId + ':reconcile',
        principal: {
          principalId: operation.principal.principalId,
          type: 'user',
          userId: operation.principal.userId,
          permissionScopes: ['memory:read'],
        },
        scope: operation.scope,
        filter: { metadata: { _hypha_operation_id: operationId } },
        pagination: { limit: 100, maxPages: 1, maxCalls: 1 },
      },
      signal
    );
    const results = listed.records.map((record) => ({
      record,
      reasons: ['mem0_oss_unknown_write_reconciled'],
    }));
    if (results.length > 0) {
      await this.operationStore.set({
        ...operation,
        state: 'succeeded',
        attempts: operation.attempts + 1,
        updatedAt: this.now().toISOString(),
      });
    }
    return results;
  }

  async health(signal?: AbortSignal): Promise<ProviderHealth> {
    const startedAt = this.now().getTime();
    try {
      await this.request(this.options.healthPath ?? '/auth/setup-status', { signal });
      return {
        status: 'healthy',
        checkedAt: this.now().toISOString(),
        latencyMs: Math.max(0, this.now().getTime() - startedAt),
        details: { transport: 'rest', deployment: 'self_hosted', protocol: 'mem0-oss-rest' },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    this.closed = true;
    for (const controller of this.inFlight) controller.abort(new Error('Mem0 client closed.'));
    this.inFlight.clear();
  }

  private async request(
    path: string,
    options: { method?: string; body?: Record<string, unknown>; signal?: AbortSignal } = {}
  ): Promise<unknown> {
    if (this.closed) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Mem0 client is closed.');
    }
    if (options.signal?.aborted) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Mem0 request was cancelled.', false, {
        cancelled: true,
      });
    }
    const controller = new AbortController();
    const onAbort = (): void => controller.abort(options.signal?.reason);
    options.signal?.addEventListener('abort', onAbort, { once: true });
    this.inFlight.add(controller);
    try {
      const headers: Record<string, string> = { Accept: 'application/json' };
      if (options.body) headers['Content-Type'] = 'application/json';
      if (this.options.apiKey && this.options.authMode !== 'none') {
        if (this.options.authMode === 'bearer')
          headers.Authorization = 'Bearer ' + this.options.apiKey;
        else headers['X-API-Key'] = this.options.apiKey;
      }
      const response = await this.fetcher(this.baseUrl + path, {
        method: options.method ?? 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await safeResponseText(response);
        const code =
          response.status === 400
            ? 'MEMORY_INVALID_INPUT'
            : response.status === 401 || response.status === 403
              ? 'MEMORY_PERMISSION_DENIED'
              : response.status === 404
                ? 'MEMORY_NOT_FOUND'
                : response.status === 409
                  ? 'MEMORY_REVISION_CONFLICT'
                  : 'MEMORY_PROVIDER_UNAVAILABLE';
        throw memoryError(
          code,
          'Mem0 HTTP ' + response.status + ': ' + (body || response.statusText),
          response.status === 429 || response.status >= 500,
          { status: response.status }
        );
      }
      if (response.status === 204) return {};
      try {
        return await response.json();
      } catch {
        throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Mem0 returned invalid JSON.', false, {
          schemaDrift: true,
        });
      }
    } catch (error) {
      if (controller.signal.aborted && !this.closed) {
        throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Mem0 request was cancelled.', false, {
          cancelled: true,
        });
      }
      throw error;
    } finally {
      options.signal?.removeEventListener('abort', onAbort);
      this.inFlight.delete(controller);
    }
  }
  private async rememberMappings(records: ManagedMemoryRecord[]): Promise<void> {
    for (const record of records) {
      const externalId = record.metadata?.providerExternalId;
      if (typeof externalId !== 'string') continue;
      await this.mappingStore.set({
        memoryId: record.id,
        providerId: this.providerId,
        externalId,
        binding: {
          scopeHash: record.scopeHash,
          recordRevision: record.revision,
          provenance: record.provenance,
        },
        externalVersion:
          typeof record.metadata?.providerExternalVersion === 'string'
            ? record.metadata.providerExternalVersion
            : undefined,
        lastSyncedAt: this.now().toISOString(),
        syncState: 'synced',
      });
    }
  }

  private async resolveExternalId(memoryId: string, scope: ManagedMemoryScope): Promise<string> {
    const mapping = await this.mappingStore.get(this.providerId, memoryId);
    if (!mapping || mapping.syncState === 'deleted') {
      throw memoryError(
        'MEMORY_NOT_FOUND',
        `No active Mem0 mapping exists for Hypha memory ${memoryId}.`
      );
    }
    this.assertScope(mapping.binding.scopeHash, scope);
    return mapping.externalId;
  }

  private assertScope(boundScopeHash: string, scope: ManagedMemoryScope): void {
    if (boundScopeHash !== hashMemoryScope(scope)) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'The requested Mem0 memory is bound to a different Hypha scope.'
      );
    }
  }

  private toRecords(
    body: unknown,
    scope: ManagedMemoryScope,
    defaults: RecordDefaults
  ): ManagedMemoryRecord[] {
    return extractItems(body)
      .map((item) => this.toRecord(item, scope, defaults))
      .filter((record): record is ManagedMemoryRecord => record !== null);
  }

  private toRecord(
    item: Record<string, unknown>,
    scope: ManagedMemoryScope,
    defaults: RecordDefaults
  ): ManagedMemoryRecord | null {
    const externalId = readString(item, 'id') ?? readString(item, 'memory_id');
    if (!externalId) return null;
    const rawMetadata = asObject(item.metadata);
    const metadata = { ...rawMetadata, ...defaults.metadata };
    const scopeHash = hashMemoryScope(scope);
    if (defaults.requireScopeMetadata && metadata._hypha_scope_hash !== scopeHash) return null;
    const content = item.memory ?? item.text ?? item.content ?? item.data ?? '';
    const revision = defaults.revision ?? readNumber(metadata, '_hypha_revision') ?? 1;
    const observedAt = this.now().toISOString();
    const createdAt = normalizeProviderDateTime(
      readString(item, 'created_at') ?? readString(item, 'createdAt'),
      observedAt
    );
    const updatedAt = normalizeProviderDateTime(
      readString(item, 'updated_at') ?? readString(item, 'updatedAt'),
      createdAt
    );
    const memoryId = createExternalMemoryId(this.providerId, externalId);
    return {
      id: memoryId,
      versionId: memoryId + ':v' + revision,
      revision,
      type: defaults.type,
      content,
      canonicalText: typeof content === 'string' ? content : stableStringify(content),
      scope,
      visibility: 'private',
      source: defaults.source,
      provenance: {
        createdBy: 'mem0',
        providerId: this.providerId,
        createdAt,
        metadata: { transport: 'rest' },
      },
      confidence: readNumber(item, 'score'),
      accessCount: 0,
      status: 'active',
      indexStatus: { state: 'indexed', attempts: 0 },
      contentHash: readString(item, 'hash') ?? hashMemoryContent(content),
      scopeHash,
      createdAt,
      updatedAt,
      metadata: {
        ...metadata,
        providerExternalId: externalId,
      },
    };
  }
}

/** @deprecated Use Mem0OssClient. Platform v3 is represented by Mem0PlatformClient. */
export type Mem0RestClientOptions = Mem0OssClientOptions & {
  deployment?: 'self_hosted';
};

/** @deprecated Transitional OSS-only alias. It never represents Mem0 Platform. */
export class Mem0RestClient extends Mem0OssClient {
  constructor(options: Mem0RestClientOptions) {
    super(options);
  }
}

interface RecordDefaults {
  source: MemorySource;
  type: ManagedMemoryRecord['type'];
  metadata?: Record<string, unknown>;
  revision?: number;
  requireScopeMetadata: boolean;
}

function toMem0Scope(scope: ManagedMemoryScope): Record<string, string> {
  return Object.fromEntries(
    [
      ['user_id', scope.userId],
      ['agent_id', scope.agentId],
      ['app_id', scope.workspaceId],
      ['run_id', scope.runId],
    ].filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
}

function isUnknownWriteOutcome(error: unknown): boolean {
  if (error instanceof Error) return error.name === 'AbortError' || error.name === 'TimeoutError';
  if (!error || typeof error !== 'object') return false;
  const value = error as { code?: string; details?: Record<string, unknown> };
  return value.code === 'MEMORY_PROVIDER_TIMEOUT' || value.details?.status === undefined;
}

function toMem0SearchScope(scope: ManagedMemoryScope): Record<string, string> {
  const { app_id: _unsupportedWorkspaceFilter, ...searchScope } = toMem0Scope(scope);
  return searchScope;
}

function toMem0Messages(input: unknown): Array<{ role: string; content: string }> {
  if (Array.isArray(input)) {
    const messages = input
      .map((item) => asObject(item))
      .filter((item) => typeof item.role === 'string' && typeof item.content === 'string')
      .map((item) => ({ role: String(item.role), content: String(item.content) }));
    if (messages.length > 0) return messages;
  }
  return [{ role: 'user', content: toText(input) }];
}

function toText(value: unknown): string {
  return typeof value === 'string' ? value : stableStringify(value);
}

function extractItems(body: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(body)) return body.map(asObject);
  const object = asObject(body);
  for (const key of ['results', 'memories', 'data']) {
    if (Array.isArray(object[key])) return (object[key] as unknown[]).map(asObject);
  }
  return Object.keys(object).length > 0 ? [object] : [];
}

function readProviderCursor(body: unknown): string | undefined {
  const value = asObject(body);
  for (const key of ['next_cursor', 'nextCursor', 'cursor', 'next_page_token']) {
    const cursor = readString(value, key);
    if (cursor) return cursor;
  }
  const next = readString(value, 'next');
  if (!next) return undefined;
  try {
    const url = new URL(next);
    return url.searchParams.get('cursor') ?? url.searchParams.get('page') ?? undefined;
  } catch {
    return next;
  }
}
function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' ? (value[key] as string) : undefined;
}

function readNumber(value: Record<string, unknown>, key: string): number | undefined {
  return typeof value[key] === 'number' ? (value[key] as number) : undefined;
}

function normalizeProviderDateTime(value: string | undefined, fallback: string): string {
  const raw = value?.trim();
  if (!raw) return fallback;
  const hasTimezone = /(Z|[+-]\d{2}:?\d{2})$/iu.test(raw);
  const isTimezoneLessDateTime = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/u.test(raw);
  const candidate = isTimezoneLessDateTime && !hasTimezone ? raw.replace(' ', 'T') + 'Z' : raw;
  const timestamp = Date.parse(candidate);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : fallback;
}

function readRevision(record: ManagedMemoryRecord, fallback: number): number {
  const value = record.metadata?._hypha_revision;
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : fallback;
}

async function safeResponseText(response: Mem0HttpResponse): Promise<string> {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return '';
  }
}
