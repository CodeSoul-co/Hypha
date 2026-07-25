import type {
  ManagedMemoryRecord,
  MemoryFallbackPolicySpec,
  MemoryManagementCapabilities,
  NormalizedMemoryError,
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
import { hashMemoryScope, memoryError, normalizeMemoryError } from './memory-utils';

export interface ExternalMemoryMapping {
  memoryId: string;
  providerId: string;
  externalId: string;
  externalVersion?: string;
  lastSyncedAt: string;
  syncState: 'synced' | 'pending' | 'failed' | 'deleted';
  metadata?: Record<string, unknown>;
}

export interface ExternalMemoryMappingStore {
  get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
  set(mapping: ExternalMemoryMapping): Promise<void>;
  list(providerId: string): Promise<ExternalMemoryMapping[]>;
}

export class InMemoryExternalMemoryMappingStore implements ExternalMemoryMappingStore {
  private readonly values = new Map<string, ExternalMemoryMapping>();

  async get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null> {
    const mapping = this.values.get(`${providerId}:${memoryId}`);
    return mapping ? structuredClone(mapping) : null;
  }

  async set(mapping: ExternalMemoryMapping): Promise<void> {
    this.values.set(`${mapping.providerId}:${mapping.memoryId}`, structuredClone(mapping));
  }

  async list(providerId: string): Promise<ExternalMemoryMapping[]> {
    return Array.from(this.values.values())
      .filter((mapping) => mapping.providerId === providerId)
      .map((mapping) => structuredClone(mapping));
  }
}

export interface ExternalMemoryClient {
  capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
  add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
  search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
  get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null>;
  list(request: MemoryListRequest): Promise<MemoryListResult>;
  update?(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
  delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
  history?(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}

export interface ExternalMemoryAdapterOptions {
  id: string;
  client: ExternalMemoryClient;
  fallback?: MemoryManagementProvider;
  fallbackPolicy?: MemoryFallbackPolicySpec;
  mappingStore?: ExternalMemoryMappingStore;
  timeoutMs?: number;
  retryAttempts?: number;
  circuitBreaker?: {
    failureThreshold: number;
    resetAfterMs: number;
  };
  now?: () => Date;
  onStateChange?: (event: ExternalProviderStateChange) => void | Promise<void>;
}

export interface ExternalProviderStateChange {
  type: 'degraded' | 'recovered' | 'circuit_opened';
  providerId: string;
  occurredAt: string;
  error?: NormalizedMemoryError;
}

const unsupportedCapabilities: MemoryManagementCapabilities = {
  add: false,
  search: false,
  get: false,
  list: false,
  update: false,
  delete: false,
  deleteByFilter: false,
  history: false,
  summarize: false,
  consolidate: false,
  decay: false,
  reinforce: false,
  conflictDetection: false,
  hybridSearch: false,
  graphRelations: false,
  asyncWrite: false,
  batchOperations: false,
};

type CapabilityName = keyof MemoryManagementCapabilities;

export class ExternalMemoryManagementAdapter implements MemoryManagementProvider {
  readonly id: string;
  private negotiated?: MemoryManagementCapabilities;
  private readonly tombstones = new Set<string>();
  private readonly mappingStore: ExternalMemoryMappingStore;
  private readonly now: () => Date;
  private consecutiveFailures = 0;
  private circuitOpenUntil = 0;

  constructor(protected readonly options: ExternalMemoryAdapterOptions) {
    this.id = options.id;
    this.mappingStore = options.mappingStore ?? new InMemoryExternalMemoryMappingStore();
    this.now = options.now ?? (() => new Date());
  }

  async capabilities(): Promise<MemoryManagementCapabilities> {
    if (this.negotiated) return { ...this.negotiated };
    const discovered = await this.callWithResilience(() => this.options.client.capabilities());
    this.negotiated = { ...unsupportedCapabilities, ...discovered };
    return { ...this.negotiated };
  }

  async add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult> {
    const result = await this.execute(
      'add',
      () => this.options.client.add(request),
      () => this.options.fallback?.add(request),
      'write'
    );
    await Promise.all(result.records.map((record) => this.captureMapping(record)));
    return result;
  }

  async search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]> {
    const results = await this.execute(
      'search',
      () => this.options.client.search(request),
      () => this.options.fallback?.search(request),
      'read'
    );
    return results.filter(
      (result) => !this.tombstones.has(tombstoneKey(request, result.record.id))
    );
  }

  async get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null> {
    if (this.tombstones.has(tombstoneKey(request, request.memoryId))) return null;
    return this.execute(
      'get',
      () => this.options.client.get(request),
      () => this.options.fallback?.get(request),
      'read'
    );
  }

  async list(request: MemoryListRequest): Promise<MemoryListResult> {
    const result = await this.execute(
      'list',
      () => this.options.client.list(request),
      () => this.options.fallback?.list(request),
      'read'
    );
    return {
      ...result,
      records: result.records.filter(
        (record) => !this.tombstones.has(tombstoneKey(request, record.id))
      ),
    };
  }

  async update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult> {
    const result = await this.execute(
      'update',
      () => {
        if (!this.options.client.update) throw unsupportedError(this.id, 'update');
        return this.options.client.update(request);
      },
      () => this.options.fallback?.update(request),
      'write'
    );
    await Promise.all(result.records.map((record) => this.captureMapping(record)));
    return result;
  }

  async delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult> {
    for (const memoryId of request.memoryIds ?? []) {
      this.tombstones.add(tombstoneKey(request, memoryId));
      const mapping = await this.mappingStore.get(this.id, memoryId);
      if (mapping) {
        await this.mappingStore.set({
          ...mapping,
          syncState: 'pending',
          lastSyncedAt: this.now().toISOString(),
        });
      }
    }
    try {
      const result = await this.execute(
        'delete',
        () => this.options.client.delete(request),
        () => this.options.fallback?.delete(request),
        'write'
      );
      await Promise.all(
        result.deletedMemoryIds.map(async (memoryId) => {
          const mapping = await this.mappingStore.get(this.id, memoryId);
          if (mapping) {
            await this.mappingStore.set({
              ...mapping,
              syncState: 'deleted',
              lastSyncedAt: this.now().toISOString(),
            });
          }
        })
      );
      return result;
    } catch (error) {
      const normalized = normalizeMemoryError(error, 'MEMORY_DELETE_PARTIAL');
      return {
        operationId: request.operationId,
        status: 'partial',
        deletedMemoryIds: request.memoryIds ?? [],
        pendingProviderIds: [this.id],
        warnings: [normalized.message],
      };
    }
  }

  async history(request: MemoryHistoryRequest): Promise<MemoryVersion[]> {
    return this.execute(
      'history',
      () => {
        if (!this.options.client.history) throw unsupportedError(this.id, 'history');
        return this.options.client.history(request);
      },
      () => this.options.fallback?.history?.(request),
      'read'
    );
  }

  async health(): Promise<ProviderHealth> {
    if (this.circuitOpenUntil > this.now().getTime()) {
      return {
        status: 'degraded',
        checkedAt: this.now().toISOString(),
        message: 'Circuit breaker is open.',
        details: { circuitOpenUntil: new Date(this.circuitOpenUntil).toISOString() },
      };
    }
    try {
      return await this.withTimeout(this.options.client.health());
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        message: normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE').message,
      };
    }
  }

  async close(): Promise<void> {
    await this.options.client.close?.();
    await this.options.fallback?.close?.();
  }

  protected async execute<T>(
    capability: CapabilityName,
    primary: () => Promise<T>,
    fallback: () => Promise<T> | undefined,
    mode: 'read' | 'write'
  ): Promise<T> {
    let primaryStarted = false;
    try {
      const capabilities = await this.capabilities();
      if (!capabilities[capability]) throw unsupportedError(this.id, capability);
      primaryStarted = true;
      return await this.callWithResilience(primary, mode === 'read');
    } catch (error) {
      if (this.shouldFallback() && (mode === 'read' || !primaryStarted)) {
        const alternative = fallback();
        if (alternative) return alternative;
      }
      throw normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE');
    }
  }

  private async callWithResilience<T>(call: () => Promise<T>, retryAllowed = true): Promise<T> {
    if (this.circuitOpenUntil > this.now().getTime()) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Memory provider circuit is open: ${this.id}`,
        true
      );
    }
    const attempts = retryAllowed ? Math.max(1, (this.options.retryAttempts ?? 1) + 1) : 1;
    let lastError: unknown;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        const value = await this.withTimeout(call());
        const recovered = this.consecutiveFailures > 0;
        this.consecutiveFailures = 0;
        this.circuitOpenUntil = 0;
        if (recovered) {
          await this.options.onStateChange?.({
            type: 'recovered',
            providerId: this.id,
            occurredAt: this.now().toISOString(),
          });
        }
        return value;
      } catch (error) {
        lastError = error;
        this.consecutiveFailures += 1;
        const breaker = this.options.circuitBreaker ?? {
          failureThreshold: 3,
          resetAfterMs: 30_000,
        };
        const normalized = normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE');
        await this.options.onStateChange?.({
          type: 'degraded',
          providerId: this.id,
          occurredAt: this.now().toISOString(),
          error: normalized,
        });
        if (this.consecutiveFailures >= breaker.failureThreshold) {
          this.circuitOpenUntil = this.now().getTime() + breaker.resetAfterMs;
          await this.options.onStateChange?.({
            type: 'circuit_opened',
            providerId: this.id,
            occurredAt: this.now().toISOString(),
            error: normalized,
          });
          break;
        }
      }
    }
    throw normalizeMemoryError(lastError, 'MEMORY_PROVIDER_UNAVAILABLE');
  }

  private async withTimeout<T>(promise: Promise<T>): Promise<T> {
    const timeoutMs = this.options.timeoutMs ?? 5_000;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        promise,
        new Promise<T>((_resolve, reject) => {
          timer = setTimeout(
            () =>
              reject(
                memoryError(
                  'MEMORY_PROVIDER_TIMEOUT',
                  `Memory provider timed out after ${timeoutMs}ms: ${this.id}`,
                  true
                )
              ),
            timeoutMs
          );
        }),
      ]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  private shouldFallback(): boolean {
    return (
      Boolean(this.options.fallback) &&
      this.options.fallbackPolicy?.onProviderUnavailable !== 'fail'
    );
  }

  private async captureMapping(record: ManagedMemoryRecord): Promise<void> {
    const externalId = record.metadata?.providerExternalId;
    if (typeof externalId !== 'string') return;
    await this.mappingStore.set({
      memoryId: record.id,
      providerId: this.id,
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

export interface Mem0MemoryManagementAdapterOptions extends Omit<
  ExternalMemoryAdapterOptions,
  'id'
> {
  id?: string;
  deployment?: 'managed' | 'self_hosted';
}

export class Mem0MemoryManagementAdapter extends ExternalMemoryManagementAdapter {
  readonly deployment: 'managed' | 'self_hosted';

  constructor(options: Mem0MemoryManagementAdapterOptions) {
    super({ ...options, id: options.id ?? 'memory.provider.mem0' });
    this.deployment = options.deployment ?? 'managed';
  }
}

export interface MemoryBankPolicySpec {
  extractionProfileRef?: import('./contracts').MemoryContractSpecRef;
  importanceThreshold?: number;
  reinforcementFactor?: number;
  decayFunction?: 'exponential' | 'linear' | 'custom';
  decayHalfLifeSeconds?: number;
  consolidationThreshold?: number;
  consolidationMinItems?: number;
  preserveOriginals?: boolean;
}

export interface MemoryBankMemoryManagementAdapterOptions extends Omit<
  ExternalMemoryAdapterOptions,
  'id'
> {
  id?: string;
  policy: MemoryBankPolicySpec;
}

export class MemoryBankMemoryManagementAdapter extends ExternalMemoryManagementAdapter {
  readonly policy: MemoryBankPolicySpec;

  constructor(options: MemoryBankMemoryManagementAdapterOptions) {
    super({ ...options, id: options.id ?? 'memory.provider.memorybank' });
    this.policy = options.policy;
  }
}

function tombstoneKey(
  request: { scope: import('./contracts').ManagedMemoryScope },
  memoryId: string
): string {
  return `${hashMemoryScope(request.scope)}:${memoryId}`;
}

function unsupportedError(providerId: string, capability: CapabilityName): NormalizedMemoryError {
  return memoryError(
    'MEMORY_PROVIDER_UNAVAILABLE',
    `Provider ${providerId} does not support ${capability}.`
  );
}
