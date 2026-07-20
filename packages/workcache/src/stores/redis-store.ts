import { validateCacheBlock } from '../schemas';
import type {
  CacheBlock,
  CacheBlockUtility,
  CacheTreeType,
  WorkCacheStore,
  WorkCacheStoreHealth,
} from '../types';

export interface RedisWorkCacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: Array<string | number>): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  scan(cursor: string, ...args: Array<string | number>): Promise<[string, string[]]>;
  eval?(script: string, numberOfKeys: number, ...args: Array<string | number>): Promise<unknown>;
  ping?(): Promise<string>;
  quit?(): Promise<unknown>;
}

export interface RedisWorkCacheStoreOptions {
  client: RedisWorkCacheClient;
  prefix?: string;
  closeClient?: boolean;
  now?: () => number;
}

export class RedisWorkCacheStore implements WorkCacheStore {
  private readonly prefix: string;
  private readonly now: () => number;

  constructor(private readonly options: RedisWorkCacheStoreOptions) {
    this.prefix = options.prefix ?? 'hypha:workcache:v1:';
    this.now = options.now ?? Date.now;
  }

  async get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    return this.readBlock<T>(this.blockKey(blockId));
  }

  async getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    const indexKey = this.indexKey(treeType, cacheKey);
    const blockId = await this.options.client.get(indexKey);
    if (!blockId) return null;
    const block = await this.get<T>(blockId);
    if (!block) await this.options.client.del(indexKey);
    return block;
  }

  async set<T = unknown>(block: CacheBlock<T>): Promise<void> {
    validateCacheBlock(block);
    const ttlMs = block.expiresAt === undefined ? undefined : block.expiresAt - this.now();
    if (ttlMs !== undefined && ttlMs <= 0) {
      await this.delete(block.id);
      return;
    }
    const blockKey = this.blockKey(block.id);
    const indexKey = this.indexKey(block.treeType, block.cacheKey);
    if (this.options.client.eval) {
      await this.options.client.eval(
        "redis.call('SET', KEYS[1], ARGV[1]); " +
          "redis.call('SET', KEYS[2], ARGV[2]); " +
          "if tonumber(ARGV[3]) > 0 then redis.call('PEXPIRE', KEYS[1], ARGV[3]); redis.call('PEXPIRE', KEYS[2], ARGV[3]); end; " +
          'return 1',
        2,
        blockKey,
        indexKey,
        JSON.stringify(block),
        block.id,
        ttlMs ?? -1
      );
      return;
    }
    const args: Array<string | number> = ttlMs === undefined ? [] : ['PX', ttlMs];
    await this.options.client.set(blockKey, JSON.stringify(block), ...args);
    await this.options.client.set(indexKey, block.id, ...args);
  }

  async delete(blockId: string): Promise<void> {
    const block = await this.get(blockId);
    const blockKey = this.blockKey(blockId);
    if (!block) {
      await this.options.client.del(blockKey);
      return;
    }
    const indexKey = this.indexKey(block.treeType, block.cacheKey);
    if (this.options.client.eval) {
      await this.options.client.eval(
        "if redis.call('GET', KEYS[2]) == ARGV[1] then redis.call('DEL', KEYS[2]); end; " +
          "return redis.call('DEL', KEYS[1])",
        2,
        blockKey,
        indexKey,
        blockId
      );
      return;
    }
    const indexedBlockId = await this.options.client.get(indexKey);
    await this.options.client.del(
      ...(indexedBlockId === blockId ? [blockKey, indexKey] : [blockKey])
    );
  }

  async list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    const blocks: Array<CacheBlock<T>> = [];
    let cursor = '0';
    do {
      const [next, keys] = await this.options.client.scan(
        cursor,
        'MATCH',
        `${this.prefix}block:*`,
        'COUNT',
        200
      );
      cursor = next;
      for (const key of keys) {
        const block = await this.readBlock<T>(key);
        if (block && (!treeType || block.treeType === treeType)) blocks.push(block);
      }
    } while (cursor !== '0');
    return blocks.sort((left, right) => left.createdAt - right.createdAt);
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

  async touch(blockId: string, timestamp: number): Promise<void> {
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: { ...block.utility, reuseCount: (block.utility.reuseCount ?? 0) + 1 },
    });
  }

  async updateUtility(
    blockId: string,
    utility: Partial<CacheBlockUtility>,
    timestamp: number
  ): Promise<void> {
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: { ...block.utility, ...utility },
    });
  }

  async health(): Promise<WorkCacheStoreHealth> {
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

  private async readBlock<T>(key: string): Promise<CacheBlock<T> | null> {
    const raw = await this.options.client.get(key);
    if (!raw) return null;
    try {
      return validateCacheBlock<T>(JSON.parse(raw));
    } catch {
      await this.options.client.del(key);
      return null;
    }
  }

  private blockKey(blockId: string): string {
    return `${this.prefix}block:${blockId}`;
  }

  private indexKey(treeType: CacheTreeType, cacheKey: string): string {
    return `${this.prefix}index:${treeType}:${cacheKey}`;
  }
}
