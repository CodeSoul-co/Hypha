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
import { memoryError } from './memory-utils';

export const MEMORYBANK_LOCAL_PROTOCOL = 'hypha.memorybank.v1' as const;

export interface MemoryBankClient extends ExternalMemoryClient {
  readonly protocol: string;
  reconcile(
    operationId: string,
    request: MemoryAddRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]>;
}

export interface MemoryBankLocalClientOptions {
  baseUrl: string;
  fetch?: Mem0HttpFetch;
  apiKey?: string;
  providerId?: string;
  mappingStore?: ExternalMemoryMappingStore;
  mappingProfile?: ExternalMemoryMappingRuntimeProfile;
  now?: () => Date;
}

const defaults: MemoryManagementCapabilities = {
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
  graphRelations: false,
  asyncWrite: false,
  batchOperations: false,
};

/** Concrete HTTP client for a local service implementing hypha.memorybank.v1. */
export class MemoryBankLocalClient implements MemoryBankClient {
  readonly protocol = MEMORYBANK_LOCAL_PROTOCOL;
  private readonly delegate: Mem0OssClient;
  private readonly fetcher: Mem0HttpFetch;
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private negotiated?: MemoryManagementCapabilities;

  constructor(options: MemoryBankLocalClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    const runtimeFetch = (globalThis as unknown as { fetch?: Mem0HttpFetch }).fetch;
    const fetcher = options.fetch ?? runtimeFetch;
    if (!fetcher) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'No HTTP transport is available for local MemoryBank.'
      );
    }
    this.fetcher = fetcher;
    this.apiKey = options.apiKey;
    this.delegate = new Mem0OssClient({
      baseUrl: this.baseUrl,
      providerId: options.providerId ?? 'memory.provider.memorybank.local',
      fetch: (url, init) => this.localFetch(url, init),
      authMode: 'none',
      mappingStore: options.mappingStore,
      mappingProfile: options.mappingProfile ?? 'ephemeral',
      now: options.now,
      healthPath: '/health',
    });
  }

  async capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>> {
    if (this.negotiated) return { ...this.negotiated };
    const response = await this.localFetch(this.baseUrl + '/capabilities', { signal });
    const body = await response.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'MemoryBank capability response is invalid.'
      );
    }
    this.negotiated = { ...defaults, ...(body as Partial<MemoryManagementCapabilities>) };
    return { ...this.negotiated };
  }

  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    return this.delegate.add(request, signal);
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
  close(): Promise<void> {
    return this.delegate.close();
  }

  reconcile(
    operationId: string,
    request: MemoryAddRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    return this.search(
      {
        operationId: operationId + ':reconcile',
        principal: request.principal,
        scope: request.scope,
        profileRef: request.profileRef,
        filters: { metadata: { _hypha_operation_id: operationId } },
        topK: 100,
      },
      signal
    );
  }

  private async localFetch(
    rawUrl: string,
    init: Parameters<Mem0HttpFetch>[1] = {}
  ): Promise<Mem0HttpResponse> {
    const url = new URL(rawUrl);
    if (!url.pathname.startsWith('/hypha-memorybank/v1')) {
      url.pathname = '/hypha-memorybank/v1' + url.pathname;
    }
    const headers: Record<string, string> = {
      ...init?.headers,
      'MemoryBank-Protocol-Version': MEMORYBANK_LOCAL_PROTOCOL,
    };
    if (this.apiKey) headers['X-API-Key'] = this.apiKey;
    const response = await this.fetcher(url.toString(), { ...init, headers });
    if (!response.ok) {
      const code =
        response.status === 401 || response.status === 403
          ? 'MEMORY_PERMISSION_DENIED'
          : response.status === 404
            ? 'MEMORY_NOT_FOUND'
            : response.status === 409
              ? 'MEMORY_REVISION_CONFLICT'
              : 'MEMORY_PROVIDER_UNAVAILABLE';
      throw memoryError(
        code,
        'MemoryBank Local HTTP ' + response.status,
        response.status === 429 || response.status >= 500,
        { status: response.status }
      );
    }
    return response;
  }
}
