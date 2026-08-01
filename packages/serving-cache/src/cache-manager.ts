import { createLLMCacheKey } from './key';
import { normalizeCachePolicy } from './policies';
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
    const createdAt = this.now();
    const entry: CacheEntry<T> = {
      key,
      value,
      createdAt,
      expiresAt: ttlMs ? createdAt + ttlMs : undefined,
      metadata: {
        ...metadata,
        hitCount: metadata.hitCount ?? 0,
      },
    };
    await this.store.set(key, entry);
  }

  async delete(key: string): Promise<void> {
    await this.store.delete(key);
  }

  async clear(): Promise<void> {
    await this.store.clear?.();
  }
}
