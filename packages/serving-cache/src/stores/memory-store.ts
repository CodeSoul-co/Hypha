import type { CacheEntry, CacheStore } from '../types';

export class NoopCacheStore implements CacheStore {
  async get<T>(): Promise<CacheEntry<T> | null> {
    return null;
  }

  async set<T>(): Promise<void> {}

  async delete(): Promise<void> {}

  async clear(): Promise<void> {}
}

export class MemoryCacheStore implements CacheStore {
  private readonly entries = new Map<string, CacheEntry>();

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    return (this.entries.get(key) as CacheEntry<T> | undefined) ?? null;
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    this.entries.set(key, entry as CacheEntry);
  }

  async delete(key: string): Promise<void> {
    this.entries.delete(key);
  }

  async clear(): Promise<void> {
    this.entries.clear();
  }

  async touch(key: string): Promise<void> {
    const entry = this.entries.get(key);
    if (!entry) return;
    this.entries.set(key, {
      ...entry,
      metadata: entry.metadata
        ? {
            ...entry.metadata,
            hitCount: (entry.metadata.hitCount ?? 0) + 1,
          }
        : undefined,
    });
  }
}
