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
  InMemoryExternalMemoryMappingStore,
  type ExternalMemoryClient,
  type ExternalMemoryMappingStore,
} from './external-adapters';
import { createExternalMemoryId } from './external-memory-identity';
import { hashMemoryContent, hashMemoryScope, memoryError, stableStringify } from './memory-utils';

export interface Mem0HttpResponse {
  ok: boolean;
  status: number;
  statusText: string;
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

export interface Mem0RestClientOptions {
  baseUrl: string;
  apiKey?: string;
  authMode?: 'x-api-key' | 'bearer' | 'none';
  fetch?: Mem0HttpFetch;
  providerId?: string;
  healthPath?: string;
  now?: () => Date;
  deployment?: 'managed' | 'self_hosted';
  mappingStore?: ExternalMemoryMappingStore;
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

export class Mem0RestClient implements ExternalMemoryClient {
  private readonly baseUrl: string;
  private readonly fetcher: Mem0HttpFetch;
  private readonly providerId: string;
  private readonly now: () => Date;
  private readonly deployment: 'managed' | 'self_hosted';
  private readonly mappingStore: ExternalMemoryMappingStore;

  constructor(private readonly options: Mem0RestClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
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
    this.deployment = options.deployment ?? 'self_hosted';
    this.mappingStore = options.mappingStore ?? new InMemoryExternalMemoryMappingStore();
  }

  async capabilities(): Promise<Partial<MemoryManagementCapabilities>> {
    return { ...mem0RestCapabilities };
  }

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
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
        ...toMem0Scope(request.scope),
        limit: request.topK,
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
    const externalId = await this.resolveExternalId(request.memoryId);
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
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(toMem0Scope(request.scope))) {
      if (value) query.set(key, value);
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
    const limit = request.pagination?.limit ?? filtered.length;
    return {
      records: filtered.slice(0, limit),
      hasMore: filtered.length > limit,
    };
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
    const externalId = await this.resolveExternalId(request.memoryId);
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
    await this.rememberMappings(records);
    return {
      operationId: request.operationId,
      status: records.length > 0 ? 'committed' : 'partial',
      records,
      warnings: records.length === 0 ? ['Mem0 returned no updated record.'] : undefined,
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
    const externalId = await this.resolveExternalId(request.memoryId);
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

  async health(signal?: AbortSignal): Promise<ProviderHealth> {
    const startedAt = this.now().getTime();
    try {
      await this.request(this.options.healthPath ?? '/', { signal });
      return {
        status: 'healthy',
        checkedAt: this.now().toISOString(),
        latencyMs: Math.max(0, this.now().getTime() - startedAt),
        details: { transport: 'rest', deployment: this.deployment },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {}

  private async request(
    path: string,
    options: { method?: string; body?: Record<string, unknown>; signal?: AbortSignal } = {}
  ): Promise<unknown> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (options.body) headers['Content-Type'] = 'application/json';
    if (this.options.apiKey && this.options.authMode !== 'none') {
      if (this.options.authMode === 'bearer') {
        headers.Authorization = 'Bearer ' + this.options.apiKey;
      } else {
        headers['X-API-Key'] = this.options.apiKey;
      }
    }
    const response = await this.fetcher(this.baseUrl + path, {
      method: options.method ?? 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });
    if (!response.ok) {
      const body = await safeResponseText(response);
      const code =
        response.status === 401 || response.status === 403
          ? 'MEMORY_PERMISSION_DENIED'
          : response.status === 404
            ? 'MEMORY_NOT_FOUND'
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
      return {};
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
        externalVersion:
          typeof record.metadata?.providerExternalVersion === 'string'
            ? record.metadata.providerExternalVersion
            : undefined,
        lastSyncedAt: this.now().toISOString(),
        syncState: 'synced',
      });
    }
  }

  private async resolveExternalId(memoryId: string): Promise<string> {
    const mapping = await this.mappingStore.get(this.providerId, memoryId);
    if (!mapping || mapping.syncState === 'deleted') {
      throw memoryError(
        'MEMORY_NOT_FOUND',
        `No active Mem0 mapping exists for Hypha memory ${memoryId}.`
      );
    }
    return mapping.externalId;
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
    const createdAt =
      readString(item, 'created_at') ?? readString(item, 'createdAt') ?? this.now().toISOString();
    const updatedAt = readString(item, 'updated_at') ?? readString(item, 'updatedAt') ?? createdAt;
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
      ['run_id', scope.runId],
    ].filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
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
