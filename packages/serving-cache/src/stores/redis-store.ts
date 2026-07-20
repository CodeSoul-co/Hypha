import { validateCacheEntry } from '../schemas';
import type { CacheEntry, CacheStore, CacheStoreHealth } from '../types';

export interface RedisCacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: Array<string | number>): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  scan(cursor: string, ...args: Array<string | number>): Promise<[string, string[]]>;
  ping?(): Promise<string>;
  quit?(): Promise<unknown>;
}

export interface RedisCacheStoreOptions {
  client: RedisCacheClient;
  prefix?: string;
  closeClient?: boolean;
  now?: () => number;
}

export class RedisCacheStore implements CacheStore {
  private readonly prefix: string;
  private readonly now: () => number;

  constructor(private readonly options: RedisCacheStoreOptions) {
    this.prefix = options.prefix ?? 'hypha:serving-cache:v1:';
    this.now = options.now ?? Date.now;
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const raw = await this.options.client.get(this.key(key));
    if (!raw) return null;
    try {
      const entry = validateCacheEntry<T>(JSON.parse(raw));
      if (entry.key !== key) {
        await this.options.client.del(this.key(key));
        return null;
      }
      return entry;
    } catch {
      await this.options.client.del(this.key(key));
      return null;
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    validateCacheEntry(entry);
    if (entry.key !== key) {
      throw new Error('Serving Cache store key does not match CacheEntry.key.');
    }
    const ttlMs = entry.expiresAt === undefined ? undefined : entry.expiresAt - this.now();
    if (ttlMs !== undefined && ttlMs <= 0) {
      await this.delete(key);
      return;
    }
    const args: Array<string | number> = ttlMs === undefined ? [] : ['PX', ttlMs];
    await this.options.client.set(this.key(key), JSON.stringify(entry), ...args);
  }

  async delete(key: string): Promise<void> {
    await this.options.client.del(this.key(key));
  }

  async clear(): Promise<void> {
    let cursor = '0';
    do {
      const [next, keys] = await this.options.client.scan(
        cursor,
        'MATCH',
        `${this.prefix}*`,
        'COUNT',
        200
      );
      cursor = next;
      if (keys.length) await this.options.client.del(...keys);
    } while (cursor !== '0');
  }

  async health(): Promise<CacheStoreHealth> {
    try {
      const pong = await this.options.client.ping?.();
      return {
        status: !this.options.client.ping || pong === 'PONG' ? 'healthy' : 'degraded',
        checkedAt: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unavailable',
        checkedAt: new Date().toISOString(),
        details: { error: error instanceof Error ? error.message : String(error) },
      };
    }
  }

  async close(): Promise<void> {
    if (this.options.closeClient) await this.options.client.quit?.();
  }

  private key(key: string): string {
    return `${this.prefix}${key}`;
  }
}
