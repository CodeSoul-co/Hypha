import type { CacheBlock, CacheTree, CacheTreeType, WorkCacheStore } from './types';

export class StoreBackedCacheTree<T = unknown> implements CacheTree<T> {
  constructor(
    readonly type: CacheTreeType,
    private readonly store: WorkCacheStore
  ) {}

  lookup(cacheKey: string): Promise<CacheBlock<T> | null> {
    return this.store.getByCacheKey<T>(this.type, cacheKey);
  }

  async write(block: CacheBlock<T>): Promise<void> {
    await this.store.set(block);
  }

  async invalidate(blockId: string): Promise<void> {
    await this.store.delete(blockId);
  }

  list(): Promise<Array<CacheBlock<T>>> {
    return this.store.list<T>(this.type);
  }
}

export class TypedCacheForest {
  private readonly trees = new Map<CacheTreeType, StoreBackedCacheTree>();

  constructor(private readonly store: WorkCacheStore) {}

  tree<T = unknown>(type: CacheTreeType): CacheTree<T> {
    let tree = this.trees.get(type);
    if (!tree) {
      tree = new StoreBackedCacheTree(type, this.store);
      this.trees.set(type, tree);
    }
    return tree as CacheTree<T>;
  }

  lookup<T = unknown>(treeType: CacheTreeType, cacheKey: string): Promise<CacheBlock<T> | null> {
    return this.tree<T>(treeType).lookup(cacheKey);
  }

  write<T = unknown>(block: CacheBlock<T>): Promise<void> {
    return this.tree<T>(block.treeType).write(block);
  }

  invalidate(treeType: CacheTreeType, blockId: string): Promise<void> {
    return this.tree(treeType).invalidate(blockId);
  }

  list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    return this.store.list<T>(treeType);
  }
}
