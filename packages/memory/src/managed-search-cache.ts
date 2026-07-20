import { z } from 'zod';
import { managedMemoryRecordSchema } from './record-contract';
import { validateManagedMemorySearchRequest } from './operation-contract';
import { hashMemoryScope, sha256 } from './memory-utils';
import type { ManagedMemoryScope } from './contracts';
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

const nonEmptyString = z.string().min(1);

export const managedMemorySearchResultSchema = z
  .object({
    record: managedMemoryRecordSchema,
    score: z.number().finite().optional(),
    semanticScore: z.number().finite().optional(),
    keywordScore: z.number().finite().optional(),
    graphScore: z.number().finite().optional(),
    rerankScore: z.number().finite().optional(),
    reasons: z.array(nonEmptyString).optional(),
  })
  .strict();

export const memorySearchCacheRecordSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    keyVersion: z.literal('1'),
    key: nonEmptyString,
    scopeHash: nonEmptyString,
    scopeRevision: nonEmptyString,
    requestHash: nonEmptyString,
    profileRevision: nonEmptyString,
    providerRevision: nonEmptyString,
    results: z.array(managedMemorySearchResultSchema),
    selectedMemoryVersionIds: z.array(nonEmptyString),
    createdAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().positive(),
    sizeBytes: z.number().int().positive().optional(),
  })
  .strict()
  .superRefine((record, context) => {
    if (record.expiresAt <= record.createdAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'must be later than createdAt',
      });
    }
    const actual = record.results.map((result) => result.record.versionId).sort();
    const declared = [...record.selectedMemoryVersionIds].sort();
    if (JSON.stringify(actual) !== JSON.stringify(declared)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedMemoryVersionIds'],
        message: 'must match the cached result record versions',
      });
    }
  });

export type MemorySearchCacheRecord = z.infer<typeof memorySearchCacheRecordSchema>;

export interface MemorySearchCacheStore {
  getScopeRevision(scopeHash: string): Promise<string>;
  get(key: string): Promise<MemorySearchCacheRecord | null>;
  set(key: string, record: MemorySearchCacheRecord): Promise<void>;
  delete(key: string): Promise<void>;
  invalidateScope(scopeHash: string): Promise<number>;
  clear?(): Promise<void>;
  close?(): Promise<void>;
}

export type MemorySearchCacheFailureMode = 'bypass' | 'strict';

export interface MemorySearchCacheEvent {
  type:
    | 'memory.cache.lookup'
    | 'memory.cache.hit'
    | 'memory.cache.miss'
    | 'memory.cache.write'
    | 'memory.cache.invalidate'
    | 'memory.cache.bypass';
  providerId: string;
  scopeHash: string;
  key?: string;
  reason?:
    | 'not_found'
    | 'expired'
    | 'corrupt'
    | 'scope_mismatch'
    | 'revision_changed'
    | 'access_stats_requested'
    | 'profile_revision_missing'
    | 'invalidation_pending'
    | 'entry_oversized'
    | 'store_unavailable';
  ageMs?: number;
}

export interface CachedMemoryManagementProviderOptions {
  provider: MemoryManagementProvider;
  cache: MemorySearchCacheStore;
  providerRevision: string;
  failureMode?: MemorySearchCacheFailureMode;
  operationTimeoutMs?: number;
  ttlMs?: number;
  maxEntryBytes?: number;
  singleflight?: boolean;
  maxScopeRevisionRetries?: number;
  now?: () => number;
  trace?: (event: MemorySearchCacheEvent) => Promise<void> | void;
}

/**
 * Managed-memory read-through cache. Mutations always execute against the
 * provider first and then invalidate the exact scope. Access-stat searches are
 * never cached because a hit would skip their intended write side effect.
 */
export class CachedMemoryManagementProvider implements MemoryManagementProvider {
  readonly id: string;
  private readonly provider: MemoryManagementProvider;
  private readonly cache: MemorySearchCacheStore;
  private readonly providerRevision: string;
  private readonly failureMode: MemorySearchCacheFailureMode;
  private readonly operationTimeoutMs: number;
  private readonly ttlMs: number;
  private readonly maxEntryBytes: number;
  private readonly singleflight: boolean;
  private readonly maxScopeRevisionRetries: number;
  private readonly now: () => number;
  private readonly inFlight = new Map<string, Promise<ManagedMemorySearchResult[]>>();
  private readonly pendingInvalidationScopes = new Set<string>();

  constructor(private readonly options: CachedMemoryManagementProviderOptions) {
    this.provider = options.provider;
    this.cache = options.cache;
    this.providerRevision = requiredString(options.providerRevision, 'providerRevision');
    this.failureMode = options.failureMode ?? 'bypass';
    this.operationTimeoutMs = positiveInteger(
      options.operationTimeoutMs ?? 250,
      'operationTimeoutMs'
    );
    this.ttlMs = positiveInteger(options.ttlMs ?? 60_000, 'ttlMs');
    this.maxEntryBytes = positiveInteger(options.maxEntryBytes ?? 2 * 1024 * 1024, 'maxEntryBytes');
    this.singleflight = options.singleflight ?? true;
    this.maxScopeRevisionRetries = nonNegativeInteger(
      options.maxScopeRevisionRetries ?? 1,
      'maxScopeRevisionRetries'
    );
    this.now = options.now ?? Date.now;
    this.id = `memory-search-cached:${this.provider.id}`;
  }

  capabilities() {
    return this.provider.capabilities();
  }

  async add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult> {
    const result = await this.provider.add(request);
    await this.invalidateAfterMutation(request.scope);
    return result;
  }

  async search(rawRequest: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]> {
    const request = validateManagedMemorySearchRequest(rawRequest);
    const scopeHash = hashMemoryScope(request.scope);
    if (this.pendingInvalidationScopes.has(scopeHash)) {
      try {
        await this.cacheOperation('invalidateScope', this.cache.invalidateScope(scopeHash));
        this.pendingInvalidationScopes.delete(scopeHash);
        await this.emit({
          type: 'memory.cache.invalidate',
          providerId: this.provider.id,
          scopeHash,
        });
      } catch {
        await this.emit({
          type: 'memory.cache.bypass',
          providerId: this.provider.id,
          scopeHash,
          reason: 'invalidation_pending',
        });
        return this.provider.search(request);
      }
    }
    if (request.updateAccessStats !== false) {
      await this.emit({
        type: 'memory.cache.bypass',
        providerId: this.provider.id,
        scopeHash,
        reason: 'access_stats_requested',
      });
      return this.provider.search(request);
    }
    const profileRevision = request.profileRef.revision ?? request.profileRef.version;
    if (!profileRevision) {
      await this.emit({
        type: 'memory.cache.bypass',
        providerId: this.provider.id,
        scopeHash,
        reason: 'profile_revision_missing',
      });
      return this.provider.search(request);
    }
    let scopeRevision: string;
    let identity: ReturnType<typeof searchIdentity>;
    try {
      scopeRevision = await this.cacheOperation(
        'getScopeRevision',
        this.cache.getScopeRevision(scopeHash)
      );
      identity = searchIdentity(request, this.providerRevision, profileRevision, scopeRevision);
      await this.emit({
        type: 'memory.cache.lookup',
        providerId: this.provider.id,
        scopeHash,
        key: identity.key,
      });
      const cached = await this.lookupCached(identity, scopeHash, scopeRevision, profileRevision);
      if (cached) return cached;
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
      await this.emit({
        type: 'memory.cache.bypass',
        providerId: this.provider.id,
        scopeHash,
        reason: 'store_unavailable',
      });
      return this.provider.search(request);
    }
    return this.computeAndCache(request, identity, scopeHash, scopeRevision, profileRevision, 0);
  }

  get(request: MemoryGetRequest) {
    return this.provider.get(request);
  }

  list(request: MemoryListRequest): Promise<MemoryListResult> {
    return this.provider.list(request);
  }

  async update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult> {
    const result = await this.provider.update(request);
    await this.invalidateAfterMutation(request.scope);
    return result;
  }

  async delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult> {
    const result = await this.provider.delete(request);
    await this.invalidateAfterMutation(request.scope);
    return result;
  }

  history(request: MemoryHistoryRequest): Promise<MemoryVersion[]> {
    if (!this.provider.history) {
      return Promise.reject(
        new Error(`Memory provider ${this.provider.id} does not support history.`)
      );
    }
    return this.provider.history(request);
  }

  health(): Promise<ProviderHealth> {
    return this.provider.health();
  }

  async close(): Promise<void> {
    await this.provider.close?.();
    try {
      await this.cacheOperation('close', this.cache.close?.() ?? Promise.resolve());
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  private async lookupCached(
    identity: ReturnType<typeof searchIdentity>,
    scopeHash: string,
    scopeRevision: string,
    profileRevision: string
  ): Promise<ManagedMemorySearchResult[] | null> {
    const rawRecord = await this.cacheOperation('get', this.cache.get(identity.key));
    if (!rawRecord) {
      await this.emitMiss(scopeHash, identity.key, 'not_found');
      return null;
    }
    let record: MemorySearchCacheRecord;
    try {
      record = validateMemorySearchCacheRecord(rawRecord);
    } catch {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'corrupt');
      return null;
    }
    if (record.key !== identity.key || record.requestHash !== identity.requestHash) {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'corrupt');
      return null;
    }
    if (record.scopeHash !== scopeHash) {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'scope_mismatch');
      return null;
    }
    if (
      record.scopeRevision !== scopeRevision ||
      (await this.cacheOperation('getScopeRevision', this.cache.getScopeRevision(scopeHash))) !==
        scopeRevision
    ) {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'revision_changed');
      return null;
    }
    if (
      record.profileRevision !== profileRevision ||
      record.providerRevision !== this.providerRevision
    ) {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'revision_changed');
      return null;
    }
    if (record.expiresAt <= this.now()) {
      await this.safeDelete(identity.key);
      await this.emitMiss(scopeHash, identity.key, 'expired');
      return null;
    }
    await this.emit({
      type: 'memory.cache.hit',
      providerId: this.provider.id,
      scopeHash,
      key: identity.key,
      ageMs: Math.max(0, this.now() - record.createdAt),
    });
    return clone(record.results) as ManagedMemorySearchResult[];
  }

  private async computeAndCache(
    request: ManagedMemorySearchRequest,
    identity: ReturnType<typeof searchIdentity>,
    scopeHash: string,
    scopeRevision: string,
    profileRevision: string,
    scopeRevisionRetry: number
  ): Promise<ManagedMemorySearchResult[]> {
    const pending = this.singleflight ? this.inFlight.get(identity.key) : undefined;
    if (pending) return clone(await pending);

    const computation = this.provider.search(request);
    if (this.singleflight) this.inFlight.set(identity.key, computation);
    try {
      const rawResults = await computation;
      const results = validateManagedMemorySearchResults(rawResults);
      if (!results.every((result) => sameHardMemoryBoundary(request.scope, result.record.scope))) {
        throw new Error(
          'Memory provider returned a search record outside the requested user boundary.'
        );
      }
      let currentScopeRevision: string;
      try {
        currentScopeRevision = await this.cacheOperation(
          'getScopeRevision',
          this.cache.getScopeRevision(scopeHash)
        );
      } catch (error) {
        if (this.failureMode === 'strict') throw error;
        await this.emit({
          type: 'memory.cache.bypass',
          providerId: this.provider.id,
          scopeHash,
          key: identity.key,
          reason: 'store_unavailable',
        });
        return results;
      }
      if (currentScopeRevision !== scopeRevision) {
        await this.emitMiss(scopeHash, identity.key, 'revision_changed');
        if (scopeRevisionRetry < this.maxScopeRevisionRetries) {
          return this.computeAndCache(
            request,
            searchIdentity(request, this.providerRevision, profileRevision, currentScopeRevision),
            scopeHash,
            currentScopeRevision,
            profileRevision,
            scopeRevisionRetry + 1
          );
        }
        return results;
      }
      const createdAt = this.now();
      const record: MemorySearchCacheRecord = {
        schemaVersion: '1.0',
        keyVersion: '1',
        key: identity.key,
        scopeHash,
        scopeRevision,
        requestHash: identity.requestHash,
        profileRevision,
        providerRevision: this.providerRevision,
        results,
        selectedMemoryVersionIds: results.map((result) => result.record.versionId).sort(),
        createdAt,
        expiresAt: createdAt + this.ttlMs,
      };
      const sizeBytes = Buffer.byteLength(JSON.stringify(record), 'utf8');
      if (sizeBytes > this.maxEntryBytes) {
        await this.emit({
          type: 'memory.cache.bypass',
          providerId: this.provider.id,
          scopeHash,
          key: identity.key,
          reason: 'entry_oversized',
        });
        return results;
      }
      try {
        await this.cacheOperation(
          'set',
          this.cache.set(identity.key, validateMemorySearchCacheRecord({ ...record, sizeBytes }))
        );
        await this.emit({
          type: 'memory.cache.write',
          providerId: this.provider.id,
          scopeHash,
          key: identity.key,
        });
      } catch (error) {
        if (this.failureMode === 'strict') throw error;
        await this.emit({
          type: 'memory.cache.bypass',
          providerId: this.provider.id,
          scopeHash,
          key: identity.key,
          reason: 'store_unavailable',
        });
      }
      return results;
    } finally {
      if (this.inFlight.get(identity.key) === computation) this.inFlight.delete(identity.key);
    }
  }

  private async invalidateAfterMutation(scope: ManagedMemoryScope): Promise<void> {
    const scopeHash = hashMemoryScope(scope);
    try {
      await this.cacheOperation('invalidateScope', this.cache.invalidateScope(scopeHash));
      await this.emit({
        type: 'memory.cache.invalidate',
        providerId: this.provider.id,
        scopeHash,
      });
    } catch (error) {
      this.pendingInvalidationScopes.add(scopeHash);
      await this.emit({
        type: 'memory.cache.bypass',
        providerId: this.provider.id,
        scopeHash,
        reason: 'store_unavailable',
      });
    }
  }

  private async safeDelete(key: string): Promise<void> {
    try {
      await this.cacheOperation('delete', this.cache.delete(key));
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  private cacheOperation<T>(operation: string, promise: Promise<T>): Promise<T> {
    return withTimeout(promise, this.operationTimeoutMs, operation);
  }

  private emitMiss(
    scopeHash: string,
    key: string,
    reason: NonNullable<MemorySearchCacheEvent['reason']>
  ): Promise<void> {
    return this.emit({
      type: 'memory.cache.miss',
      providerId: this.provider.id,
      scopeHash,
      key,
      reason,
    });
  }

  private async emit(event: MemorySearchCacheEvent): Promise<void> {
    try {
      await this.options.trace?.(event);
    } catch {
      // Cache observability cannot alter Memory provider behavior.
    }
  }
}

export interface InMemoryMemorySearchCacheOptions {
  maxEntries?: number;
  maxBytes?: number;
}

export class InMemoryMemorySearchCacheStore implements MemorySearchCacheStore {
  private readonly records = new Map<string, MemorySearchCacheRecord>();
  private readonly scopeKeys = new Map<string, Set<string>>();
  private readonly scopeRevisions = new Map<string, number>();
  private readonly maxEntries: number;
  private readonly maxBytes: number;
  private sizeBytes = 0;
  private evictions = 0;

  constructor(options: InMemoryMemorySearchCacheOptions = {}) {
    this.maxEntries = positiveInteger(options.maxEntries ?? 1000, 'maxEntries');
    this.maxBytes = positiveInteger(options.maxBytes ?? 64 * 1024 * 1024, 'maxBytes');
  }

  async getScopeRevision(scopeHash: string): Promise<string> {
    return String(this.scopeRevisions.get(scopeHash) ?? 0);
  }

  async get(key: string): Promise<MemorySearchCacheRecord | null> {
    const record = this.records.get(key);
    if (!record) return null;
    this.records.delete(key);
    this.records.set(key, record);
    return clone(record);
  }

  async set(key: string, rawRecord: MemorySearchCacheRecord): Promise<void> {
    const record = validateMemorySearchCacheRecord(rawRecord);
    if (record.key !== key) {
      throw new Error('Memory Search Cache store key does not match record.key.');
    }
    if (record.scopeRevision !== (await this.getScopeRevision(record.scopeHash))) {
      throw new Error('Memory Search Cache scope revision changed before the write completed.');
    }
    await this.delete(key);
    this.records.set(key, clone(record));
    const keys = this.scopeKeys.get(record.scopeHash) ?? new Set<string>();
    keys.add(key);
    this.scopeKeys.set(record.scopeHash, keys);
    this.sizeBytes += cacheRecordSize(record);
    await this.prune();
  }

  async delete(key: string): Promise<void> {
    const record = this.records.get(key);
    if (!record) return;
    this.records.delete(key);
    this.sizeBytes -= cacheRecordSize(record);
    const keys = this.scopeKeys.get(record.scopeHash);
    keys?.delete(key);
    if (keys?.size === 0) this.scopeKeys.delete(record.scopeHash);
  }

  async invalidateScope(scopeHash: string): Promise<number> {
    this.scopeRevisions.set(scopeHash, (this.scopeRevisions.get(scopeHash) ?? 0) + 1);
    const keys = [...(this.scopeKeys.get(scopeHash) ?? [])];
    for (const key of keys) await this.delete(key);
    return keys.length;
  }

  async clear(): Promise<void> {
    for (const scopeHash of this.scopeRevisions.keys()) {
      this.scopeRevisions.set(scopeHash, (this.scopeRevisions.get(scopeHash) ?? 0) + 1);
    }
    this.records.clear();
    this.scopeKeys.clear();
    this.sizeBytes = 0;
  }

  stats(): { entries: number; sizeBytes: number; evictions: number } {
    return { entries: this.records.size, sizeBytes: this.sizeBytes, evictions: this.evictions };
  }

  private async prune(): Promise<void> {
    while (this.records.size > this.maxEntries || this.sizeBytes > this.maxBytes) {
      const key = this.records.keys().next().value as string | undefined;
      if (!key) return;
      await this.delete(key);
      this.evictions += 1;
    }
  }
}

export interface RedisLikeMemorySearchCacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: 'PX', durationMilliseconds: number): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  sadd(key: string, ...members: string[]): Promise<number>;
  srem(key: string, ...members: string[]): Promise<number>;
  smembers(key: string): Promise<string[]>;
  incr(key: string): Promise<number>;
  pexpire(key: string, durationMilliseconds: number): Promise<number>;
}

export interface RedisMemorySearchCacheOptions {
  client: RedisLikeMemorySearchCacheClient;
  namespace?: string;
  maxEntryBytes?: number;
  now?: () => number;
}

/** Shared Store for local, self-hosted, or managed Redis-compatible deployments. */
export class RedisMemorySearchCacheStore implements MemorySearchCacheStore {
  private readonly namespace: string;
  private readonly maxEntryBytes: number;
  private readonly now: () => number;

  constructor(private readonly options: RedisMemorySearchCacheOptions) {
    this.namespace = (options.namespace ?? 'hypha:memory-search-cache:v1').replace(/:+$/, '');
    this.maxEntryBytes = positiveInteger(options.maxEntryBytes ?? 2 * 1024 * 1024, 'maxEntryBytes');
    this.now = options.now ?? Date.now;
  }

  async getScopeRevision(scopeHash: string): Promise<string> {
    return (await this.options.client.get(this.scopeRevisionKey(scopeHash))) ?? '0';
  }

  async get(key: string): Promise<MemorySearchCacheRecord | null> {
    const physicalKey = this.recordKey(key);
    const raw = await this.options.client.get(physicalKey);
    if (raw === null) return null;
    try {
      if (Buffer.byteLength(raw, 'utf8') > this.maxEntryBytes) {
        throw new Error('Memory Search Cache entry exceeds its configured read limit.');
      }
      const record = validateMemorySearchCacheRecord(JSON.parse(raw), this.maxEntryBytes);
      if (record.key !== key) {
        throw new Error('Memory Search Cache physical and logical keys do not match.');
      }
      return record;
    } catch {
      await this.options.client.del(physicalKey).catch(() => 0);
      return null;
    }
  }

  async set(key: string, input: MemorySearchCacheRecord): Promise<void> {
    const record = validateMemorySearchCacheRecord(input, this.maxEntryBytes);
    if (record.key !== key) {
      throw new Error('Memory Search Cache store key does not match record.key.');
    }
    if (record.scopeRevision !== (await this.getScopeRevision(record.scopeHash))) {
      throw new Error('Memory Search Cache scope revision changed before the write completed.');
    }
    const ttlMs = record.expiresAt - this.now();
    if (ttlMs <= 0) {
      await this.delete(key);
      return;
    }
    const physicalKey = this.recordKey(key);
    const scopeIndexKey = this.scopeIndexKey(record.scopeHash);
    await this.options.client.set(physicalKey, JSON.stringify(record), 'PX', ttlMs);
    await this.options.client.sadd(scopeIndexKey, key);
    await this.options.client.pexpire(scopeIndexKey, ttlMs);
  }

  async delete(key: string): Promise<void> {
    const record = await this.get(key);
    await this.options.client.del(this.recordKey(key));
    if (record) await this.options.client.srem(this.scopeIndexKey(record.scopeHash), key);
  }

  async invalidateScope(scopeHash: string): Promise<number> {
    await this.options.client.incr(this.scopeRevisionKey(scopeHash));
    const scopeIndexKey = this.scopeIndexKey(scopeHash);
    const keys = await this.options.client.smembers(scopeIndexKey);
    if (keys.length > 0) {
      await this.options.client.del(...keys.map((key) => this.recordKey(key)));
    }
    await this.options.client.del(scopeIndexKey);
    return keys.length;
  }

  private recordKey(key: string): string {
    return `${this.namespace}:record:${key}`;
  }

  private scopeIndexKey(scopeHash: string): string {
    return `${this.namespace}:scope:${scopeHash}:keys`;
  }

  private scopeRevisionKey(scopeHash: string): string {
    return `${this.namespace}:scope:${scopeHash}:revision`;
  }
}

export function validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[] {
  return z.array(managedMemorySearchResultSchema).parse(input) as ManagedMemorySearchResult[];
}

export function validateMemorySearchCacheRecord(
  input: unknown,
  maxEntryBytes = 2 * 1024 * 1024
): MemorySearchCacheRecord {
  let serialized: string;
  try {
    serialized = JSON.stringify(input);
  } catch (error) {
    throw new Error(
      `Memory Search Cache entry is not JSON-safe: ${error instanceof Error ? error.message : String(error)}`
    );
  }
  if (!serialized) throw new Error('Memory Search Cache entry is empty.');
  const actualBytes = Buffer.byteLength(serialized, 'utf8');
  if (actualBytes > positiveInteger(maxEntryBytes, 'maxEntryBytes')) {
    throw new Error(
      `Memory Search Cache entry is ${actualBytes} bytes; limit is ${maxEntryBytes} bytes.`
    );
  }
  return memorySearchCacheRecordSchema.parse(JSON.parse(serialized));
}

function searchIdentity(
  request: ManagedMemorySearchRequest,
  providerRevision: string,
  profileRevision: string,
  scopeRevision: string
): { key: string; requestHash: string } {
  const requestHash = sha256({
    principal: {
      principalId: request.principal.principalId,
      type: request.principal.type,
      tenantId: request.principal.tenantId,
      userId: request.principal.userId,
      agentId: request.principal.agentId,
      roles: [...(request.principal.roles ?? [])].sort(),
      permissionScopes: [...request.principal.permissionScopes].sort(),
    },
    scope: request.scope,
    profileRef: {
      id: request.profileRef.id,
      version: request.profileRef.version,
      revision: profileRevision,
    },
    query: request.query,
    queryEmbedding: request.queryEmbedding,
    filters: request.filters,
    memoryTypes: [...(request.memoryTypes ?? [])].sort(),
    mode: request.mode,
    topK: request.topK,
    scoreThreshold: request.scoreThreshold,
    includeDormant: request.includeDormant,
    includeSuperseded: request.includeSuperseded,
    includeContent: request.includeContent,
    includeProvenance: request.includeProvenance,
    includeRelations: request.includeRelations,
    rerank: request.rerank,
    pagination: request.pagination,
    providerRevision,
    scopeRevision,
  });
  return { key: `memory-search-cache:v1:${requestHash}`, requestHash };
}

function sameHardMemoryBoundary(left: ManagedMemoryScope, right: ManagedMemoryScope): boolean {
  if (left.userId !== right.userId) return false;
  if (left.tenantId || right.tenantId) return left.tenantId === right.tenantId;
  return true;
}

function cacheRecordSize(record: MemorySearchCacheRecord): number {
  return record.sizeBytes ?? Buffer.byteLength(JSON.stringify(record), 'utf8');
}

function requiredString(value: string, field: string): string {
  if (!value) throw new TypeError(`${field} must be a non-empty string.`);
  return value;
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive integer.`);
  }
  return value;
}

function nonNegativeInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative integer.`);
  }
  return value;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operation: string
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`Memory Search Cache ${operation} exceeded ${timeoutMs}ms.`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
