import type { MemoryManagementCapabilities } from './contracts';
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
import type {
  ExternalMemoryClient,
  ExternalMemoryMappingRuntimeProfile,
  ExternalMemoryMappingStore,
} from './external-adapters';
import { Mem0OssClient, type Mem0HttpFetch, type Mem0HttpResponse } from './mem0-rest-client';
import {
  createExternalProviderOperation,
  resolveExternalProviderOperationStore,
  type ExternalProviderOperationStore,
} from './external-provider-operations';
import {
  RenewableCredentialManager,
  staticCredentialProvider,
  type RenewableCredentialProvider,
} from './managed-credentials';
import { memoryError } from './memory-utils';

export interface Mem0PlatformClientOptions {
  baseUrl?: string;
  apiToken?: string;
  credentialProvider?: RenewableCredentialProvider;
  fetch?: Mem0HttpFetch;
  providerId?: string;
  mappingStore?: ExternalMemoryMappingStore;
  mappingProfile?: ExternalMemoryMappingRuntimeProfile;
  operationStore?: ExternalProviderOperationStore;
  operationDeadlineMs?: number;
  maxOperationAttempts?: number;
  now?: () => Date;
}

export interface Mem0PlatformEvent {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'FAILED' | 'SUCCEEDED';
  results?: unknown[];
  payload?: Record<string, unknown>;
}

const platformCapabilities: MemoryManagementCapabilities = {
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
  batchOperations: false,
};

/** Client for the documented Mem0 Platform v3 additive/search/list protocol. */
export class Mem0PlatformClient implements ExternalMemoryClient {
  private readonly delegate: Mem0OssClient;
  private readonly fetcher: Mem0HttpFetch;
  private readonly baseUrl: string;
  private readonly credentials: RenewableCredentialManager;
  private readonly providerId: string;
  private readonly operationStore: ExternalProviderOperationStore;
  private readonly operationDeadlineMs: number;
  private readonly maxOperationAttempts: number;
  private readonly now: () => Date;

  constructor(options: Mem0PlatformClientOptions) {
    if (Boolean(options.apiToken) === Boolean(options.credentialProvider)) {
      throw memoryError(
        'MEMORY_PERMISSION_DENIED',
        'Mem0 Platform requires exactly one API token or renewable credential provider.'
      );
    }
    this.baseUrl = (options.baseUrl ?? 'https://api.mem0.ai').replace(/\/$/, '');
    this.credentials = new RenewableCredentialManager({
      provider:
        options.credentialProvider ?? staticCredentialProvider(options.apiToken ?? '', 'api_token'),
      now: options.now,
    });
    this.providerId = options.providerId ?? 'memory.provider.mem0.platform.v3';
    const mappingProfile = options.mappingProfile ?? 'production';
    this.operationStore = resolveExternalProviderOperationStore(
      options.operationStore,
      mappingProfile
    );
    this.operationDeadlineMs = options.operationDeadlineMs ?? 300_000;
    this.maxOperationAttempts = options.maxOperationAttempts ?? 5;
    this.now = options.now ?? (() => new Date());
    const runtimeFetch = (globalThis as unknown as { fetch?: Mem0HttpFetch }).fetch;
    const fetcher = options.fetch ?? runtimeFetch;
    if (!fetcher) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'No HTTP transport is available for Mem0 Platform.'
      );
    }
    this.fetcher = fetcher;
    this.delegate = new Mem0OssClient({
      baseUrl: this.baseUrl,
      providerId: this.providerId,
      fetch: (url, init) => this.platformFetch(url, init),
      authMode: 'none',
      mappingStore: options.mappingStore,
      mappingProfile,
      now: options.now,
      healthPath: '/v1/events/?page=1&page_size=1',
    });
  }

  async capabilities(): Promise<Partial<MemoryManagementCapabilities>> {
    return { ...platformCapabilities };
  }

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    try {
      const result = await this.delegate.add(request, signal);
      if (result.status !== 'queued' || !result.events?.[0]) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Mem0 Platform v3 add did not return the required asynchronous event receipt.'
        );
      }
      await this.operationStore.set(
        createExternalProviderOperation({
          providerId: this.providerId,
          operationId: request.operationId,
          externalOperationId: result.events[0],
          kind: 'mem0_event',
          state: 'pending',
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
      return result;
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
            deadlineAt: new Date(this.now().getTime() + this.operationDeadlineMs).toISOString(),
            now: this.now().toISOString(),
          })
        );
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Mem0 Platform write outcome is unknown and quarantined for reconciliation.',
          false,
          { operationId: request.operationId, quarantined: true }
        );
      }
      throw error;
    }
  }

  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    return this.delegate.search(request, signal);
  }
  get(request: MemoryGetRequest, signal?: AbortSignal) {
    return this.delegate.get(request, signal);
  }
  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    return this.delegate.list(request, signal);
  }
  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    return this.delegate.update(request, signal);
  }
  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    return this.delegate.delete(request, signal);
  }
  history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    return this.delegate.history(request, signal);
  }
  health(signal?: AbortSignal): Promise<ProviderHealth> {
    return this.delegate.health(signal);
  }
  async close(): Promise<void> {
    try {
      await this.delegate.close();
    } finally {
      await this.credentials.close();
    }
  }

  async getEvent(eventId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent> {
    const response = await this.platformFetch(
      this.baseUrl + '/v1/event/' + encodeURIComponent(eventId) + '/',
      { signal }
    );
    const value = asObject(await response.json());
    const id = readString(value, 'id');
    const status = readString(value, 'status');
    if (!id || !isEventStatus(status)) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Mem0 event response schema is invalid.');
    }
    return {
      id,
      status,
      results: Array.isArray(value.results) ? value.results : undefined,
      payload: asObject(value.payload),
    };
  }

  async resumeEvent(operationId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent | null> {
    const operation = await this.operationStore.get(this.providerId, operationId);
    if (
      !operation ||
      operation.kind !== 'mem0_event' ||
      !operation.externalOperationId ||
      !['pending', 'running'].includes(operation.state)
    ) {
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
    try {
      const event = await this.getEvent(operation.externalOperationId, signal);
      const settledAt = this.now().toISOString();
      if (operation.cancellationRequestedAt || signal?.aborted) {
        await this.operationStore.set({ ...operation, state: 'cancelled', updatedAt: settledAt });
        return null;
      }
      if (operation.deadlineAt && operation.deadlineAt <= settledAt) {
        await this.operationStore.set({ ...operation, state: 'dead_letter', updatedAt: settledAt });
        return null;
      }
      const attempts = operation.attempts + 1;
      const state =
        event.status === 'SUCCEEDED'
          ? 'succeeded'
          : event.status === 'FAILED' || attempts >= this.maxOperationAttempts
            ? 'dead_letter'
            : event.status === 'RUNNING'
              ? 'running'
              : 'pending';
      await this.operationStore.set({ ...operation, state, attempts, updatedAt: settledAt });
      return event;
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
  async reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]> {
    const operation = await this.operationStore.get(this.providerId, operationId);
    if (!operation || operation.state !== 'reconcile_required') return [];
    const results = await this.search(
      {
        operationId: operationId + ':reconcile',
        principal: {
          principalId: operation.principal.principalId,
          type: 'user',
          userId: operation.principal.userId,
          permissionScopes: ['memory:read'],
        },
        scope: operation.scope,
        profileRef: operation.profileRef,
        filters: { metadata: { _hypha_operation_id: operationId } },
        topK: 100,
      },
      signal
    );
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

  private async platformFetch(
    rawUrl: string,
    init: Parameters<Mem0HttpFetch>[1] = {}
  ): Promise<Mem0HttpResponse> {
    const url = new URL(rawUrl);
    let body = init?.body ? (JSON.parse(init.body) as Record<string, unknown>) : undefined;
    let method = init?.method ?? 'GET';
    if (url.pathname === '/memories' && method === 'POST') {
      url.pathname = '/v3/memories/add/';
    } else if (url.pathname === '/search') {
      url.pathname = '/v3/memories/search/';
      body = toV3SearchBody(body ?? {});
    } else if (url.pathname === '/memories' && method === 'GET') {
      const params = Object.fromEntries(url.searchParams.entries());
      const { cursor, page_size: pageSize, ...filters } = params;
      url.pathname = '/v3/memories/';
      url.search = '';
      body = {
        filters,
        page: cursor ?? '1',
        page_size: pageSize ? Number(pageSize) : 50,
      };
      method = 'POST';
    } else if (url.pathname.startsWith('/memories/')) {
      url.pathname = '/v1' + url.pathname + (url.pathname.endsWith('/') ? '' : '/');
    }
    const credential = await this.credentials.get(init?.signal);
    const response = await this.fetcher(url.toString(), {
      ...init,
      method,
      headers: {
        ...init?.headers,
        Authorization: 'Token ' + credential.token,
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) this.credentials.invalidate();
      const retryable = response.status === 429 || response.status >= 500;
      const code =
        response.status === 401 || response.status === 403
          ? 'MEMORY_PERMISSION_DENIED'
          : response.status === 404
            ? 'MEMORY_NOT_FOUND'
            : response.status === 409
              ? 'MEMORY_REVISION_CONFLICT'
              : 'MEMORY_PROVIDER_UNAVAILABLE';
      throw memoryError(code, 'Mem0 Platform HTTP ' + response.status, retryable, {
        status: response.status,
      });
    }
    return response;
  }
}

function toV3SearchBody(input: Record<string, unknown>): Record<string, unknown> {
  const filters: Record<string, unknown> = {};
  for (const key of ['user_id', 'agent_id', 'app_id', 'run_id']) {
    if (input[key] !== undefined) filters[key] = input[key];
  }
  return { query: input.query, filters, top_k: input.limit };
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' ? (value[key] as string) : undefined;
}
function isEventStatus(value: string | undefined): value is Mem0PlatformEvent['status'] {
  return value === 'PENDING' || value === 'RUNNING' || value === 'FAILED' || value === 'SUCCEEDED';
}
function isUnknownWriteOutcome(error: unknown): boolean {
  if (error instanceof Error) return error.name === 'AbortError' || error.name === 'TimeoutError';
  if (!error || typeof error !== 'object') return false;
  const value = error as { code?: string; details?: Record<string, unknown> };
  return value.code === 'MEMORY_PROVIDER_TIMEOUT' || value.details?.status === undefined;
}
