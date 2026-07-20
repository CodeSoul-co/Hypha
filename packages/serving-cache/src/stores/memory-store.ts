import type { CacheEntry, CacheStore, CacheStoreHealth, CacheStoreStats } from '../types';
import { validateCacheEntry } from '../schemas';

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
  private readonly maxEntries: number;
  private readonly maxBytes: number;
  private sizeBytes = 0;
  private evictions = 0;

  constructor(options: { maxEntries?: number; maxBytes?: number } = {}) {
    this.maxEntries = Math.max(1, options.maxEntries ?? 5000);
    this.maxBytes = Math.max(1, options.maxBytes ?? 64 * 1024 * 1024);
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const entry = this.entries.get(key);
    if (!entry) return null;
    this.entries.delete(key);
    this.entries.set(key, entry);
    return entry as CacheEntry<T>;
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    validateCacheEntry(entry);
    const existing = this.entries.get(key);
    if (existing) this.sizeBytes -= entrySize(existing);
    this.entries.delete(key);
    this.entries.set(key, entry as CacheEntry);
    this.sizeBytes += entrySize(entry);
    this.evictIfNeeded();
  }

  async delete(key: string): Promise<void> {
    const existing = this.entries.get(key);
    if (existing) this.sizeBytes -= entrySize(existing);
    this.entries.delete(key);
  }

  async clear(): Promise<void> {
    this.entries.clear();
    this.sizeBytes = 0;
  }

  async touch(key: string): Promise<void> {
    const entry = this.entries.get(key);
    if (!entry) return;
    this.entries.delete(key);
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

  async stats(): Promise<CacheStoreStats> {
    return { entries: this.entries.size, sizeBytes: this.sizeBytes, evictions: this.evictions };
  }

  async health(): Promise<CacheStoreHealth> {
    return { status: 'healthy', checkedAt: new Date().toISOString() };
  }

  private evictIfNeeded(): void {
    while (this.entries.size > this.maxEntries || this.sizeBytes > this.maxBytes) {
      const oldestKey = this.entries.keys().next().value as string | undefined;
      if (!oldestKey) break;
      const entry = this.entries.get(oldestKey);
      if (entry) this.sizeBytes -= entrySize(entry);
      this.entries.delete(oldestKey);
      this.evictions += 1;
    }
  }
}

function entrySize(entry: CacheEntry): number {
  return entry.sizeBytes ?? Buffer.byteLength(JSON.stringify(entry.value), 'utf8');
}
