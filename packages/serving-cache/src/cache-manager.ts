import { createLLMCacheKey } from './key';
import { normalizeCachePolicy } from './policies';
import { validateServingCacheJsonValue } from './schemas';
import type {
  CacheEntry,
  CacheLookupResult,
  CacheMetadata,
  CachePolicy,
  CacheStore,
  LLMCacheKeyInput,
} from './types';

export interface ServingCacheManagerOptions {
  store: CacheStore;
  policy?: Partial<CachePolicy>;
  now?: () => number;
}

export class CacheEntryTooLargeError extends Error {
  readonly code = 'CACHE_ENTRY_TOO_LARGE';

  constructor(
    readonly sizeBytes: number,
    readonly maxEntryBytes: number
  ) {
    super(`Cache entry is ${sizeBytes} bytes; maximum is ${maxEntryBytes} bytes.`);
    this.name = 'CacheEntryTooLargeError';
  }
}

export class ServingCacheManager {
  private readonly store: CacheStore;
  readonly policy: CachePolicy;
  private readonly now: () => number;

  constructor(options: ServingCacheManagerOptions) {
    this.store = options.store;
    this.policy = normalizeCachePolicy(options.policy);
    this.now = options.now ?? Date.now;
  }

  keyFor(input: LLMCacheKeyInput): string {
    return createLLMCacheKey(input);
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const lookup = await this.lookup<T>(key);
    return lookup.hit ? lookup.entry : null;
  }

  async lookup<T>(key: string): Promise<CacheLookupResult<T>> {
    const entry = await this.store.get<T>(key);
    if (!entry) {
      return { hit: false, key, reason: 'not_found' };
    }
    const timestamp = this.now();
    if (entry.expiresAt !== undefined && entry.expiresAt <= timestamp) {
      await this.store.delete(key);
      return { hit: false, key, reason: 'expired' };
    }
    await this.store.touch?.(key, timestamp);
    return {
      hit: true,
      key,
      entry,
      ageMs: Math.max(0, timestamp - entry.createdAt),
    };
  }

  async set<T>(
    key: string,
    value: T,
    metadata: CacheMetadata,
    ttlMs: number | undefined = this.policy.ttlMs
  ): Promise<void> {
    assertNoUnsupportedJson(value);
    const serializedValue = JSON.stringify(value);
    if (serializedValue === undefined) {
      throw new TypeError('Cache values must be JSON serializable.');
    }
    const normalizedValue = JSON.parse(serializedValue) as T;
    validateServingCacheJsonValue(normalizedValue);
    const createdAt = this.now();
    const candidate: CacheEntry<T> = {
      schemaVersion: '1.0',
      keyVersion: '1',
      key,
      value: normalizedValue,
      createdAt,
      expiresAt: ttlMs ? createdAt + ttlMs : undefined,
      metadata: {
        ...metadata,
        hitCount: metadata.hitCount ?? 0,
      },
    };
    const serializedEntry = JSON.stringify(candidate);
    const sizeBytes = Buffer.byteLength(serializedEntry, 'utf8');
    const maxEntryBytes = this.policy.maxEntryBytes;
    if (maxEntryBytes !== undefined && sizeBytes > maxEntryBytes) {
      throw new CacheEntryTooLargeError(sizeBytes, maxEntryBytes);
    }
    const entry = { ...(JSON.parse(serializedEntry) as CacheEntry<T>), sizeBytes };
    await this.store.set(key, entry);
  }

  async delete(key: string): Promise<void> {
    await this.store.delete(key);
  }

  async clear(): Promise<void> {
    await this.store.clear?.();
  }
}

function assertNoUnsupportedJson(
  value: unknown,
  inArray = false,
  ancestors = new Set<object>()
): void {
  if (value === undefined) {
    if (inArray) throw new TypeError('Cache arrays cannot contain undefined values.');
    return;
  }
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
    throw new TypeError(`Cache values cannot contain ${typeof value} values.`);
  }
  if (Array.isArray(value)) {
    if (ancestors.has(value)) throw new TypeError('Cache values cannot contain cycles.');
    ancestors.add(value);
    for (const item of value) assertNoUnsupportedJson(item, true, ancestors);
    ancestors.delete(value);
    return;
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    if (ancestors.has(value)) throw new TypeError('Cache values cannot contain cycles.');
    ancestors.add(value);
    for (const item of Object.values(value as Record<string, unknown>)) {
      assertNoUnsupportedJson(item, false, ancestors);
    }
    ancestors.delete(value);
  }
}
