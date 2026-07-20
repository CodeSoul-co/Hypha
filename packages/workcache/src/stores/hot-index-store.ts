import type { CacheBlock, CacheBlockUtility, CacheTreeType, WorkCacheStore } from '../types';

export interface HotIndexedWorkCacheStoreOptions {
  maxEntries?: number;
}

export class HotIndexedWorkCacheStore implements WorkCacheStore {
  private readonly blocks = new Map<string, CacheBlock>();
  private readonly keyIndex = new Map<string, string>();
  private readonly maxEntries: number;

  constructor(
    private readonly backing: WorkCacheStore,
    options: HotIndexedWorkCacheStoreOptions = {}
  ) {
    this.maxEntries = options.maxEntries ?? 5000;
  }

  async get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    const hot = this.blocks.get(blockId);
    if (hot) {
      this.blocks.delete(blockId);
      this.blocks.set(blockId, hot);
      return hot as CacheBlock<T>;
    }
    const block = await this.backing.get<T>(blockId);
    if (block) this.index(block);
    return block;
  }

  async getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    const hotId = this.keyIndex.get(indexKey(treeType, cacheKey));
    if (hotId) {
      const hot = this.blocks.get(hotId);
      if (hot) {
        this.blocks.delete(hotId);
        this.blocks.set(hotId, hot);
        return hot as CacheBlock<T>;
      }
      this.keyIndex.delete(indexKey(treeType, cacheKey));
    }
    const block = await this.backing.getByCacheKey<T>(treeType, cacheKey);
    if (block) this.index(block);
    return block;
  }

  async set<T = unknown>(block: CacheBlock<T>): Promise<void> {
    await this.backing.set(block);
    this.index(block);
  }

  async delete(blockId: string): Promise<void> {
    const hot = this.blocks.get(blockId);
    if (hot) this.keyIndex.delete(indexKey(hot.treeType, hot.cacheKey));
    this.blocks.delete(blockId);
    await this.backing.delete(blockId);
  }

  async list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    const backingBlocks = await this.backing.list<T>(treeType);
    for (const block of backingBlocks) this.index(block);
    const merged = new Map<string, CacheBlock<T>>();
    for (const block of backingBlocks) merged.set(block.id, block);
    for (const block of this.blocks.values()) {
      if (!treeType || block.treeType === treeType) merged.set(block.id, block as CacheBlock<T>);
    }
    return Array.from(merged.values()).sort((left, right) => left.createdAt - right.createdAt);
  }

  async clear(): Promise<void> {
    this.blocks.clear();
    this.keyIndex.clear();
    await this.backing.clear?.();
  }

  async touch(blockId: string, timestamp: number): Promise<void> {
    if (this.backing.touch) {
      await this.backing.touch(blockId, timestamp);
      const updated = await this.backing.get(blockId);
      if (updated) this.index(updated);
      return;
    }
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: {
        ...block.utility,
        reuseCount: (block.utility.reuseCount ?? 0) + 1,
      },
    });
  }

  async updateUtility(
    blockId: string,
    utility: Partial<CacheBlockUtility>,
    timestamp: number
  ): Promise<void> {
    if (this.backing.updateUtility) {
      await this.backing.updateUtility(blockId, utility, timestamp);
      const updated = await this.backing.get(blockId);
      if (updated) this.index(updated);
      return;
    }
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: {
        ...block.utility,
        ...utility,
      },
    });
  }

  private index<T>(block: CacheBlock<T>): void {
    this.blocks.set(block.id, block as CacheBlock);
    this.keyIndex.set(indexKey(block.treeType, block.cacheKey), block.id);
    this.evictIfNeeded();
  }

  private evictIfNeeded(): void {
    while (this.blocks.size > this.maxEntries) {
      const candidate = Array.from(this.blocks.values()).sort((left, right) => {
        const leftScore = left.utility.futureDemand ?? left.utility.score ?? 0;
        const rightScore = right.utility.futureDemand ?? right.utility.score ?? 0;
        if (leftScore !== rightScore) return leftScore - rightScore;
        return left.updatedAt - right.updatedAt;
      })[0];
      if (!candidate) return;
      this.blocks.delete(candidate.id);
      this.keyIndex.delete(indexKey(candidate.treeType, candidate.cacheKey));
    }
  }
}

function indexKey(treeType: CacheTreeType, cacheKey: string): string {
  return `${treeType}:${cacheKey}`;
}
