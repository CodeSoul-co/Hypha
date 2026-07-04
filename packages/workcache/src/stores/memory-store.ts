import type { CacheBlock, CacheTreeType, WorkCacheStore } from '../types';

export class NoopWorkCacheStore implements WorkCacheStore {
  async get<T = unknown>(): Promise<CacheBlock<T> | null> {
    return null;
  }

  async getByCacheKey<T = unknown>(): Promise<CacheBlock<T> | null> {
    return null;
  }

  async set<T = unknown>(): Promise<void> {}

  async delete(): Promise<void> {}

  async list<T = unknown>(): Promise<Array<CacheBlock<T>>> {
    return [];
  }

  async clear(): Promise<void> {}
}

export class MemoryWorkCacheStore implements WorkCacheStore {
  private readonly blocks = new Map<string, CacheBlock>();

  async get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    return (this.blocks.get(blockId) as CacheBlock<T> | undefined) ?? null;
  }

  async getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    const matches = Array.from(this.blocks.values())
      .filter((block) => block.treeType === treeType && block.cacheKey === cacheKey)
      .sort((left, right) => right.updatedAt - left.updatedAt);
    return (matches[0] as CacheBlock<T> | undefined) ?? null;
  }

  async set<T = unknown>(block: CacheBlock<T>): Promise<void> {
    this.blocks.set(block.id, block as CacheBlock);
  }

  async delete(blockId: string): Promise<void> {
    this.blocks.delete(blockId);
  }

  async list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    return Array.from(this.blocks.values())
      .filter((block) => !treeType || block.treeType === treeType)
      .sort((left, right) => left.createdAt - right.createdAt) as Array<CacheBlock<T>>;
  }

  async clear(): Promise<void> {
    this.blocks.clear();
  }

  async touch(blockId: string, timestamp: number): Promise<void> {
    const block = this.blocks.get(blockId);
    if (!block) return;
    this.blocks.set(blockId, {
      ...block,
      updatedAt: timestamp,
      utility: {
        ...block.utility,
        reuseCount: (block.utility.reuseCount ?? 0) + 1,
      },
    });
  }
}
