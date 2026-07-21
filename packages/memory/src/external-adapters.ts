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
  getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
  set(mapping: ExternalMemoryMapping): Promise<void>;
  list(providerId: string): Promise<ExternalMemoryMapping[]>;
}

export class InMemoryExternalMemoryMappingStore implements ExternalMemoryMappingStore {
  private readonly values = new Map<string, ExternalMemoryMapping>();

  async get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null> {
    const mapping = this.values.get(`${providerId}:${memoryId}`);
    return mapping ? structuredClone(mapping) : null;
  }

  async getByExternalId(
    providerId: string,
    externalId: string
  ): Promise<ExternalMemoryMapping | null> {
    const mapping = Array.from(this.values.values()).find(
      (value) => value.providerId === providerId && value.externalId === externalId
    );
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
  capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]>;
  get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
  update?(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult>;
  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult>;
  history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
  health(signal?: AbortSignal): Promise<ProviderHealth>;
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

  async add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    const result = await this.execute(
      'add',
      (operationSignal) => this.options.client.add(request, operationSignal),
      (operationSignal) => this.options.fallback?.add(request, operationSignal),
      'write',
      signal
    );
    await Promise.all(result.records.map((record) => this.captureMapping(record)));
    return result;
  }

  async search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    const results = await this.execute(
      'search',
      (operationSignal) => this.options.client.search(request, operationSignal),
      (operationSignal) => this.options.fallback?.search(request, operationSignal),
      'read',
      signal
    );
    return results.filter(
      (result) => !this.tombstones.has(tombstoneKey(request, result.record.id))
    );
  }

  async get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    if (this.tombstones.has(tombstoneKey(request, request.memoryId))) return null;
    return this.execute(
      'get',
      (operationSignal) => this.options.client.get(request, operationSignal),
      (operationSignal) => this.options.fallback?.get(request, operationSignal),
      'read',
      signal
    );
  }

  async list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    const result = await this.execute(
      'list',
      (operationSignal) => this.options.client.list(request, operationSignal),
      (operationSignal) => this.options.fallback?.list(request, operationSignal),
      'read',
      signal
    );
    return {
      ...result,
      records: result.records.filter(
        (record) => !this.tombstones.has(tombstoneKey(request, record.id))
      ),
    };
  }

  async update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const result = await this.execute(
      'update',
      (operationSignal) => {
        if (!this.options.client.update) throw unsupportedError(this.id, 'update');
        return this.options.client.update(request, operationSignal);
      },
      (operationSignal) => this.options.fallback?.update(request, operationSignal),
      'write',
      signal
    );
    await Promise.all(result.records.map((record) => this.captureMapping(record)));
    return result;
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
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
        (operationSignal) => this.options.client.delete(request, operationSignal),
        (operationSignal) => this.options.fallback?.delete(request, operationSignal),
        'write',
        signal
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

  async history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    return this.execute(
      'history',
      (operationSignal) => {
        if (!this.options.client.history) throw unsupportedError(this.id, 'history');
        return this.options.client.history(request, operationSignal);
      },
      (operationSignal) => this.options.fallback?.history?.(request, operationSignal),
      'read',
      signal
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
      return await this.withTimeout((signal) => this.options.client.health(signal));
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
    primary: (signal?: AbortSignal) => Promise<T>,
    fallback: (signal?: AbortSignal) => Promise<T> | undefined,
    mode: 'read' | 'write',
    signal?: AbortSignal
  ): Promise<T> {
    let primaryStarted = false;
    try {
      const capabilities = await this.capabilities();
      if (!capabilities[capability]) throw unsupportedError(this.id, capability);
      primaryStarted = true;
      return await this.callWithResilience(primary, mode === 'read', signal);
    } catch (error) {
      if (this.shouldFallback() && (mode === 'read' || !primaryStarted)) {
        const alternative = fallback(signal);
        if (alternative) return alternative;
      }
      throw normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE');
    }
  }

  private async callWithResilience<T>(
    call: (signal?: AbortSignal) => Promise<T>,
    retryAllowed = true,
    signal?: AbortSignal
  ): Promise<T> {
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
        const value = await this.withTimeout(call, signal);
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

  private async withTimeout<T>(
    call: (signal: AbortSignal) => Promise<T>,
    parentSignal?: AbortSignal
  ): Promise<T> {
    if (parentSignal?.aborted) {
      throw (
        parentSignal.reason ??
        memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Memory provider request was cancelled.')
      );
    }
    const timeoutMs = this.options.timeoutMs ?? 5_000;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onAbort = (): void => controller.abort(parentSignal?.reason);
    try {
      if (parentSignal?.aborted) controller.abort(parentSignal.reason);
      else parentSignal?.addEventListener('abort', onAbort, { once: true });
      return await Promise.race([
        call(controller.signal),
        new Promise<T>((_resolve, reject) => {
          controller.signal.addEventListener('abort', () => reject(controller.signal.reason), {
            once: true,
          });
          timer = setTimeout(() => {
            controller.abort(
              memoryError(
                'MEMORY_PROVIDER_TIMEOUT',
                `Memory provider timed out after ${timeoutMs}ms: ${this.id}`,
                true
              )
            );
          }, timeoutMs);
        }),
      ]);
    } finally {
      if (timer) clearTimeout(timer);
      parentSignal?.removeEventListener('abort', onAbort);
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
