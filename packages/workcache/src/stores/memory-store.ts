import type { CacheBlock, CacheBlockUtility, CacheTreeType, WorkCacheStore } from '../types';
import { validateCacheBlock } from '../schemas';

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
  private readonly maxEntries: number;
  private readonly maxBytes: number;
  private sizeBytes = 0;

  constructor(options: { maxEntries?: number; maxBytes?: number } = {}) {
    this.maxEntries = Math.max(1, options.maxEntries ?? 8000);
    this.maxBytes = Math.max(1, options.maxBytes ?? 128 * 1024 * 1024);
  }

  async get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    const block = this.blocks.get(blockId);
    if (!block) return null;
    this.blocks.delete(blockId);
    this.blocks.set(blockId, block);
    return block as CacheBlock<T>;
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
    validateCacheBlock(block);
    const existing = this.blocks.get(block.id);
    if (existing) this.sizeBytes -= blockSize(existing);
    this.blocks.delete(block.id);
    this.blocks.set(block.id, block as CacheBlock);
    this.sizeBytes += blockSize(block);
    this.evictIfNeeded();
  }

  async delete(blockId: string): Promise<void> {
    const existing = this.blocks.get(blockId);
    if (existing) this.sizeBytes -= blockSize(existing);
    this.blocks.delete(blockId);
  }

  async list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    return Array.from(this.blocks.values())
      .filter((block) => !treeType || block.treeType === treeType)
      .sort((left, right) => left.createdAt - right.createdAt) as Array<CacheBlock<T>>;
  }

  async clear(): Promise<void> {
    this.blocks.clear();
    this.sizeBytes = 0;
  }

  async touch(blockId: string, timestamp: number): Promise<void> {
    const block = this.blocks.get(blockId);
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
    const block = this.blocks.get(blockId);
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

  private evictIfNeeded(): void {
    while (this.blocks.size > this.maxEntries || this.sizeBytes > this.maxBytes) {
      const blockId = this.blocks.keys().next().value as string | undefined;
      if (!blockId) return;
      const block = this.blocks.get(blockId);
      if (block) this.sizeBytes -= blockSize(block);
      this.blocks.delete(blockId);
    }
  }
}

function blockSize(block: CacheBlock): number {
  return block.sizeBytes ?? Buffer.byteLength(JSON.stringify(block), 'utf8');
}
