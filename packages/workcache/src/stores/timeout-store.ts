import type {
  CacheBlock,
  CacheBlockUtility,
  CacheTreeType,
  WorkCacheStore,
  WorkCacheStoreHealth,
} from '../types';

export class WorkCacheStoreTimeoutError extends Error {
  readonly code = 'WORKCACHE_STORE_TIMEOUT';

  constructor(
    readonly operation: string,
    readonly timeoutMs: number
  ) {
    super(`WorkCache store ${operation} exceeded ${timeoutMs}ms.`);
    this.name = 'WorkCacheStoreTimeoutError';
  }
}

export class TimeoutWorkCacheStore implements WorkCacheStore {
  constructor(
    private readonly inner: WorkCacheStore,
    private readonly timeoutMs: number
  ) {}

  get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    return this.run('get', this.inner.get<T>(blockId));
  }

  getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    return this.run('getByCacheKey', this.inner.getByCacheKey<T>(treeType, cacheKey));
  }

  set<T = unknown>(block: CacheBlock<T>): Promise<void> {
    return this.run('set', this.inner.set(block));
  }

  delete(blockId: string): Promise<void> {
    return this.run('delete', this.inner.delete(blockId));
  }

  list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    return this.run('list', this.inner.list<T>(treeType));
  }

  clear(): Promise<void> {
    return this.inner.clear ? this.run('clear', this.inner.clear()) : Promise.resolve();
  }

  touch(blockId: string, timestamp: number): Promise<void> {
    return this.inner.touch
      ? this.run('touch', this.inner.touch(blockId, timestamp))
      : Promise.resolve();
  }

  updateUtility(
    blockId: string,
    utility: Partial<CacheBlockUtility>,
    timestamp: number
  ): Promise<void> {
    return this.inner.updateUtility
      ? this.run('updateUtility', this.inner.updateUtility(blockId, utility, timestamp))
      : Promise.resolve();
  }

  health(): Promise<WorkCacheStoreHealth> {
    return this.inner.health
      ? this.run('health', this.inner.health())
      : Promise.resolve({ status: 'healthy', checkedAt: new Date().toISOString() });
  }

  close(): Promise<void> {
    return this.inner.close ? this.run('close', this.inner.close()) : Promise.resolve();
  }

  private run<T>(operation: string, promise: Promise<T>): Promise<T> {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const rejection = new Promise<never>((_, reject) => {
      timeout = setTimeout(
        () => reject(new WorkCacheStoreTimeoutError(operation, this.timeoutMs)),
        this.timeoutMs
      );
    });
    return Promise.race([promise, rejection]).finally(() => {
      if (timeout) clearTimeout(timeout);
    });
  }
}
