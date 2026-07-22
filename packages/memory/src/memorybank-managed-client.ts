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
  resolveExternalProviderOperationStore,
  type ExternalProviderOperationStore,
} from './external-provider-operations';
import type { Mem0HttpFetch } from './mem0-rest-client';
import { beginProviderPage, finishProviderPage } from './provider-pagination';
import { hashMemoryContent, hashMemoryScope, memoryError, stableStringify } from './memory-utils';

export interface MemoryBankManagedClientOptions {
  projectId: string;
  location: string;
  reasoningEngineId: string;
  accessToken: string;
  fetch?: Mem0HttpFetch;
  baseUrl?: string;
  providerId?: string;
  mappingStore?: ExternalMemoryMappingStore;
  mappingProfile?: ExternalMemoryMappingRuntimeProfile;
  profileRef?: MemoryContractSpecRef;
  operationStore?: ExternalProviderOperationStore;
  operationDeadlineMs?: number;
  maxOperationAttempts?: number;
  now?: () => Date;
  allowInsecureForTests?: boolean;
}

const capabilities: MemoryManagementCapabilities = {
  add: true,
  search: true,
  get: true,
  list: true,
  update: true,
  delete: true,
  deleteByFilter: false,
  history: true,
  summarize: true,
  consolidate: true,
  decay: false,
  reinforce: false,
  conflictDetection: true,
  hybridSearch: true,
  graphRelations: false,
  asyncWrite: true,
  batchOperations: false,
};

/** Google Vertex AI Agent Engine Memory Bank managed client. */
export class MemoryBankManagedClient implements ExternalMemoryClient {
  private readonly fetcher: Mem0HttpFetch;
  private readonly baseUrl: string;
  private readonly parent: string;
  private readonly providerId: string;
  private readonly mappingStore: ExternalMemoryMappingStore;
  private readonly operationStore: ExternalProviderOperationStore;
  private readonly profileRef: MemoryContractSpecRef;
  private readonly operationDeadlineMs: number;
  private readonly maxOperationAttempts: number;
  private readonly now: () => Date;

  constructor(private readonly options: MemoryBankManagedClientOptions) {
    if (!options.accessToken.trim()) {
      throw memoryError(
        'MEMORY_PERMISSION_DENIED',
        'Managed MemoryBank requires an injected OAuth token.'
      );
    }
    this.baseUrl = (
      options.baseUrl ?? `https://${options.location}-aiplatform.googleapis.com/v1`
    ).replace(/\/$/, '');
    if (!options.allowInsecureForTests && !this.baseUrl.startsWith('https://')) {
      throw memoryError('MEMORY_INVALID_INPUT', 'Managed MemoryBank requires TLS.');
    }
    const runtimeFetch = (globalThis as unknown as { fetch?: Mem0HttpFetch }).fetch;
    const fetcher = options.fetch ?? runtimeFetch;
    if (!fetcher)
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'No managed MemoryBank HTTP transport.');
    this.fetcher = fetcher;
    this.parent = `projects/${options.projectId}/locations/${options.location}/reasoningEngines/${options.reasoningEngineId}`;
    this.providerId = options.providerId ?? 'memory.provider.memorybank.vertex-ai';
    const mappingProfile = options.mappingProfile ?? 'production';
    this.mappingStore = resolveExternalMemoryMappingStore(options.mappingStore, mappingProfile);
    this.operationStore = resolveExternalProviderOperationStore(
      options.operationStore,
      mappingProfile
    );
    if (mappingProfile === 'production' && !options.profileRef) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        'Managed production mappings require an explicit Memory profile reference.'
      );
    }
    this.profileRef = options.profileRef ?? { id: 'memory.profile.ephemeral' };
    this.operationDeadlineMs = options.operationDeadlineMs ?? 300_000;
    this.maxOperationAttempts = options.maxOperationAttempts ?? 5;
    this.now = options.now ?? (() => new Date());
  }

  async capabilities(): Promise<Partial<MemoryManagementCapabilities>> {
    return { ...capabilities };
  }

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    const fact = typeof request.input === 'string' ? request.input : stableStringify(request.input);
    let body: unknown;
    try {
      body = await this.request('/' + this.parent + '/memories:generate', {
        method: 'POST',
        signal,
        body: {
          directMemoriesSource: { directMemories: [{ fact }] },
          scope: toVertexScope(request.scope),
          revisionLabels: { hypha_operation_id: request.operationId },
          metadata: toVertexMetadata(request.metadata),
        },
      });
    } catch (error) {
      if (isUnknownWriteOutcome(error)) {
        await this.persistOperation(request, undefined, 'unknown_write', 'reconcile_required');
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Managed MemoryBank write outcome is unknown and requires reconciliation.',
          false,
          { operationId: request.operationId, quarantined: true }
        );
      }
      throw error;
    }
    const operation = asObject(body);
    const operationName = readString(operation, 'name');
    const records = extractVertexMemories(operation.response).map((item) =>
      this.toRecord(item, request.scope, request.source)
    );
    await this.remember(records);
    if (operation.done !== true) {
      if (!operationName) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Managed MemoryBank returned an asynchronous response without an operation name.'
        );
      }
      await this.persistOperation(request, operationName, 'vertex_lro', 'pending');
    }
    return {
      operationId: request.operationId,
      status: operation.done === true ? 'committed' : 'queued',
      records,
      events: operationName ? [operationName] : undefined,
    };
  }

  async reconcileOperation(
    operationId: string,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult | null> {
    const operation = await this.operationStore.get(this.providerId, operationId);
    if (!operation || !['pending', 'running', 'reconcile_required'].includes(operation.state)) {
      return null;
    }
    const now = this.now().toISOString();
    if (operation.cancellationRequestedAt || signal?.aborted) {
      await this.operationStore.set({ ...operation, state: 'cancelled', updatedAt: now });
      return null;
    }
    if (operation.deadlineAt && operation.deadlineAt <= now) {
      await this.operationStore.set({ ...operation, state: 'dead_letter', updatedAt: now });
      return null;
    }
    if (!operation.externalOperationId) {
      return {
        operationId,
        status: 'queued',
        records: [],
        warnings: ['Unknown write outcome remains quarantined for provider-side reconciliation.'],
      };
    }
    try {
      const response = asObject(
        await this.request('/' + operation.externalOperationId, { signal })
      );
      if (response.done !== true) {
        await this.operationStore.set({
          ...operation,
          state: 'running',
          attempts: operation.attempts + 1,
          updatedAt: now,
        });
        return {
          operationId,
          status: 'queued',
          records: [],
          events: [operation.externalOperationId],
        };
      }
      if (response.error) {
        throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Managed MemoryBank operation failed.');
      }
      const records = extractVertexMemories(response.response).map((item) =>
        this.toRecord(item, operation.scope, {
          type: 'derived',
          sourceId: 'vertex-memory-bank:operation',
        })
      );
      await this.remember(records);
      await this.operationStore.set({
        ...operation,
        state: 'succeeded',
        attempts: operation.attempts + 1,
        updatedAt: now,
      });
      return { operationId, status: 'committed', records, events: [operation.externalOperationId] };
    } catch (error) {
      const attempts = operation.attempts + 1;
      await this.operationStore.set({
        ...operation,
        state: attempts >= this.maxOperationAttempts ? 'dead_letter' : 'running',
        attempts,
        updatedAt: now,
      });
      throw error;
    }
  }

  private persistOperation(
    request: MemoryAddRequest,
    externalOperationId: string | undefined,
    kind: 'vertex_lro' | 'unknown_write',
    state: 'pending' | 'reconcile_required'
  ): Promise<void> {
    return this.operationStore.set(
      createExternalProviderOperation({
        providerId: this.providerId,
        operationId: request.operationId,
        externalOperationId,
        kind,
        state,
        scope: request.scope,
        profileRef: request.profileRef,
        principal: {
          principalId: request.principal.principalId,
          userId: request.principal.userId,
        },
        deadlineAt: new Date(this.now().getTime() + this.operationDeadlineMs).toISOString(),
        now: this.now().toISOString(),
      })
    );
  }
  async search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    const body = await this.request('/' + this.parent + '/memories:retrieve', {
      method: 'POST',
      signal,
      body: {
        scope: toVertexScope(request.scope),
        ...(request.query
          ? {
              similaritySearchParams: { searchQuery: request.query, topK: request.topK ?? 3 },
            }
          : {}),
      },
    });
    const items = asArray(asObject(body).retrievedMemories);
    const results = items.map((entry) => {
      const value = asObject(entry);
      const record = this.toRecord(asObject(value.memory), request.scope, {
        type: 'derived',
        sourceId: 'vertex-memory-bank:retrieve',
      });
      const distance = typeof value.distance === 'number' ? value.distance : undefined;
      return {
        record,
        score: distance === undefined ? undefined : 1 / (1 + distance),
        semanticScore: distance === undefined ? undefined : 1 / (1 + distance),
        reasons: ['vertex_memory_bank_exact_scope'],
      };
    });
    await this.remember(results.map((item) => item.record));
    return results;
  }

  async get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    const name = await this.resolveName(request.memoryId, request.scope);
    const body = await this.request('/' + name, { signal });
    const record = this.toRecord(asObject(body), request.scope, {
      type: 'derived',
      sourceId: 'vertex-memory-bank:get',
    });
    await this.remember([record]);
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
    query.set('filter', 'scope = ' + JSON.stringify(stableStringify(toVertexScope(request.scope))));
    if (request.pagination?.limit) query.set('pageSize', String(request.pagination.limit));
    if (page.providerCursor) query.set('pageToken', page.providerCursor);
    const body = asObject(
      await this.request('/' + this.parent + '/memories' + (query.size ? '?' + query : ''), {
        signal,
      })
    );
    const records = asArray(body.memories).map((item) =>
      this.toRecord(asObject(item), request.scope, {
        type: 'derived',
        sourceId: 'vertex-memory-bank:list',
      })
    );
    await this.remember(records);
    const pagination = finishProviderPage(
      page,
      this.providerId,
      request.scope,
      records,
      readString(body, 'nextPageToken'),
      this.now().getTime()
    );
    return { records, ...pagination };
  }
  async update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const name = await this.resolveName(request.memoryId, request.scope);
    const body = await this.request('/' + name + '?updateMask=fact', {
      method: 'PATCH',
      signal,
      body: { fact: request.patch.canonicalText ?? stableStringify(request.patch.content) },
    });
    const record = this.toRecord(asObject(body), request.scope, {
      type: 'human_review',
      sourceId: request.operationId,
    });
    await this.remember([record]);
    return { operationId: request.operationId, status: 'committed', records: [record] };
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    if (!request.memoryIds) {
      return {
        operationId: request.operationId,
        status: 'rejected',
        deletedMemoryIds: [],
        warnings: ['Managed MemoryBank filter deletion requires an explicit purge workflow.'],
      };
    }
    const deleted: string[] = [];
    for (const id of request.memoryIds) {
      await this.request('/' + (await this.resolveName(id, request.scope)), {
        method: 'DELETE',
        signal,
      });
      deleted.push(id);
    }
    return { operationId: request.operationId, status: 'completed', deletedMemoryIds: deleted };
  }

  async history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    const name = await this.resolveName(request.memoryId, request.scope);
    const body = asObject(await this.request('/' + name + '/revisions', { signal }));
    return asArray(body.memoryRevisions).map((item, index) => {
      const revision = asObject(item);
      const record = this.toRecord(
        {
          name,
          fact: revision.fact,
          createTime: revision.createTime,
          scope: toVertexScope(request.scope),
          metadata: { providerExternalVersion: revision.name },
        },
        request.scope,
        { type: 'derived', sourceId: 'vertex-memory-bank:revision' }
      );
      return {
        memoryId: record.id,
        versionId: readString(revision, 'name') ?? record.versionId,
        revision: index + 1,
        record: { ...record, revision: index + 1 },
      };
    });
  }

  async health(signal?: AbortSignal): Promise<ProviderHealth> {
    const started = this.now().getTime();
    try {
      await this.request('/' + this.parent + '/memories?pageSize=1', { signal });
      return {
        status: 'healthy',
        checkedAt: this.now().toISOString(),
        latencyMs: Math.max(0, this.now().getTime() - started),
        details: { deployment: 'managed', service: 'vertex-ai-memory-bank' },
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
    input: {
      method?: string;
      body?: Record<string, unknown>;
      signal?: AbortSignal;
    }
  ): Promise<unknown> {
    const response = await this.fetcher(this.baseUrl + path, {
      method: input.method ?? 'GET',
      signal: input.signal,
      headers: {
        Authorization: 'Bearer ' + this.options.accessToken,
        Accept: 'application/json',
        ...(input.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: input.body ? JSON.stringify(input.body) : undefined,
    });
    if (!response.ok) {
      const code =
        response.status === 401 || response.status === 403
          ? 'MEMORY_PERMISSION_DENIED'
          : response.status === 404
            ? 'MEMORY_NOT_FOUND'
            : response.status === 409 || response.status === 412
              ? 'MEMORY_REVISION_CONFLICT'
              : 'MEMORY_PROVIDER_UNAVAILABLE';
      throw memoryError(
        code,
        'Managed MemoryBank HTTP ' + response.status,
        response.status === 429 || response.status >= 500,
        { status: response.status }
      );
    }
    if (response.status === 204) return {};
    try {
      return await response.json();
    } catch {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Managed MemoryBank returned invalid JSON.');
    }
  }

  private toRecord(
    item: Record<string, unknown>,
    scope: ManagedMemoryScope,
    source: MemorySource
  ): ManagedMemoryRecord {
    const name = readString(item, 'name');
    if (!name)
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Managed MemoryBank memory lacks name.');
    const fact = readString(item, 'fact') ?? '';
    const id = createExternalMemoryId(this.providerId, name);
    const createdAt = readString(item, 'createTime') ?? this.now().toISOString();
    const updatedAt = readString(item, 'updateTime') ?? createdAt;
    const providerScope = parseVertexScope(item.scope);
    assertExactScope(providerScope, scope);
    return {
      id,
      versionId: id + ':v1',
      revision: 1,
      type: 'semantic',
      content: fact,
      canonicalText: fact,
      scope: providerScope,
      visibility: 'private',
      source,
      provenance: { createdBy: 'vertex-ai-memory-bank', providerId: this.providerId, createdAt },
      accessCount: 0,
      status: 'active',
      indexStatus: { state: 'indexed', attempts: 0 },
      contentHash: hashMemoryContent(fact),
      scopeHash: hashMemoryScope(scope),
      createdAt,
      updatedAt,
      metadata: { ...asObject(item.metadata), providerExternalId: name },
    };
  }

  private async remember(records: ManagedMemoryRecord[]): Promise<void> {
    for (const record of records)
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
        syncState: 'synced',
        metadata: {
          scopeHash: record.scopeHash,
          scope: record.scope,
          profileRevision: record.versionId,
          provenance: record.provenance,
        },
      });
  }

  private async resolveName(id: string, scope: ManagedMemoryScope): Promise<string> {
    const mapping = await this.mappingStore.get(this.providerId, id);
    if (!mapping) throw memoryError('MEMORY_NOT_FOUND', 'No managed MemoryBank mapping for ' + id);
    if (mapping.binding.scopeHash !== hashMemoryScope(scope)) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Managed MemoryBank mapping does not belong to the requested scope.',
        false,
        { memoryId: id }
      );
    }
    if (
      mapping.binding.profileRef &&
      !sameProfileRef(mapping.binding.profileRef, this.profileRef)
    ) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Managed MemoryBank mapping does not belong to the requested profile.',
        false,
        { memoryId: id }
      );
    }
    return mapping.externalId;
  }
}

function sameProfileRef(left: MemoryContractSpecRef, right: MemoryContractSpecRef): boolean {
  return left.id === right.id && left.version === right.version && left.revision === right.revision;
}
function toVertexScope(scope: ManagedMemoryScope): Record<string, string> {
  return Object.fromEntries(
    Object.entries({
      tenant_id: scope.tenantId,
      user_id: scope.userId,
      workspace_id: scope.workspaceId,
      project_id: scope.projectId,
      session_id: scope.sessionId,
      run_id: scope.runId,
      agent_id: scope.agentId,
      domain_pack_id: scope.domainPackId,
    }).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
}
const vertexScopeKeys = {
  tenant_id: 'tenantId',
  user_id: 'userId',
  workspace_id: 'workspaceId',
  project_id: 'projectId',
  session_id: 'sessionId',
  run_id: 'runId',
  agent_id: 'agentId',
  domain_pack_id: 'domainPackId',
} as const satisfies Record<string, keyof ManagedMemoryScope>;

function parseVertexScope(value: unknown): ManagedMemoryScope {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw scopeError('Managed MemoryBank memory lacks an immutable scope.');
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) throw scopeError('Managed MemoryBank memory has an empty scope.');
  const scope: Partial<ManagedMemoryScope> = {};
  for (const [key, raw] of entries) {
    const dimension = vertexScopeKeys[key as keyof typeof vertexScopeKeys];
    if (!dimension || typeof raw !== 'string' || raw.length === 0) {
      throw scopeError('Managed MemoryBank memory has an invalid immutable scope.');
    }
    scope[dimension] = raw;
  }
  if (!scope.userId) throw scopeError('Managed MemoryBank memory scope lacks user_id.');
  return scope as ManagedMemoryScope;
}

function assertExactScope(actual: ManagedMemoryScope, expected: ManagedMemoryScope): void {
  if (hashMemoryScope(actual) !== hashMemoryScope(expected)) {
    throw scopeError('Managed MemoryBank returned a memory outside the requested scope.');
  }
}

function scopeError(message: string) {
  return memoryError('MEMORY_SCOPE_DENIED', message, false, { providerScopeRejected: true });
}
function toVertexMetadata(metadata?: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(metadata ?? {}).map(([key, value]) => [
      key,
      typeof value === 'number'
        ? { doubleValue: value }
        : typeof value === 'boolean'
          ? { boolValue: value }
          : { stringValue: String(value) },
    ])
  );
}
function isUnknownWriteOutcome(error: unknown): boolean {
  if (error instanceof Error) return error.name === 'AbortError' || error.name === 'TimeoutError';
  if (!error || typeof error !== 'object') return false;
  const value = error as { code?: string; details?: Record<string, unknown> };
  return value.code === 'MEMORY_PROVIDER_TIMEOUT' || value.details?.status === undefined;
}

function extractVertexMemories(response: unknown): Record<string, unknown>[] {
  return asArray(asObject(response).generatedMemories).map((item) =>
    asObject(asObject(item).memory)
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
