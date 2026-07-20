import { createHash } from 'crypto';
import type {
  InferenceCacheScope,
  KvCacheProvider,
  KvCacheRef,
  KvCacheScope,
  PrefixCacheProvider,
  PrefixCacheRef,
} from './types';

export interface PrefixCacheCreateInput {
  id: string;
  version: string;
  content: string;
  tokenCount?: number;
  cacheScope?: InferenceCacheScope;
  metadata?: Record<string, unknown>;
}

export interface KvCacheCreateInput {
  id: string;
  provider: string;
  modelAlias: string;
  scope: KvCacheScope;
  cacheScope?: InferenceCacheScope;
  ttlMs?: number;
  metadata?: Record<string, unknown>;
}

export interface InferenceCacheManagerOptions {
  prefixCache: PrefixCacheProvider;
  kvCache: KvCacheProvider;
  now?: () => Date;
  operationTimeoutMs?: number;
}

export type InferenceCacheOperation =
  | 'prefix_read'
  | 'prefix_write'
  | 'kv_read'
  | 'kv_write'
  | 'invalidate';

export class InferenceCacheOperationTimeoutError extends Error {
  readonly code = 'INFERENCE_CACHE_OPERATION_TIMEOUT';

  constructor(
    readonly operation: InferenceCacheOperation,
    readonly timeoutMs: number
  ) {
    super(`Inference cache ${operation} timed out after ${timeoutMs}ms.`);
    this.name = 'InferenceCacheOperationTimeoutError';
  }
}

export class InferenceCacheManager {
  private readonly now: () => Date;
  private readonly operationTimeoutMs: number;

  constructor(private readonly options: InferenceCacheManagerOptions) {
    this.now = options.now ?? (() => new Date());
    this.operationTimeoutMs = Math.max(1, options.operationTimeoutMs ?? 1_000);
  }

  async putPrefix(input: PrefixCacheCreateInput): Promise<PrefixCacheRef> {
    const ref: PrefixCacheRef = {
      id: input.id,
      version: input.version,
      contentHash: hashContent(input.content),
      tokenCount: input.tokenCount,
      cacheScope: input.cacheScope,
      metadata: input.metadata,
    };
    await runInferenceCacheOperation(
      'prefix_write',
      () => this.options.prefixCache.put(ref, input.content),
      this.operationTimeoutMs
    );
    return ref;
  }

  async getPrefix(ref: PrefixCacheRef): Promise<string | null> {
    return runInferenceCacheOperation(
      'prefix_read',
      () => this.options.prefixCache.get(ref),
      this.operationTimeoutMs
    );
  }

  async putKv(input: KvCacheCreateInput, value: unknown): Promise<KvCacheRef> {
    const expiresAt =
      input.ttlMs !== undefined
        ? new Date(this.now().getTime() + input.ttlMs).toISOString()
        : undefined;
    const ref: KvCacheRef = {
      id: input.id,
      provider: input.provider,
      modelAlias: input.modelAlias,
      scope: input.scope,
      cacheScope: input.cacheScope,
      expiresAt,
      metadata: input.metadata,
    };
    await runInferenceCacheOperation(
      'kv_write',
      () => this.options.kvCache.put(ref, value),
      this.operationTimeoutMs
    );
    return ref;
  }

  async getKv(ref: KvCacheRef): Promise<unknown | null> {
    if (isKvCacheExpired(ref, this.now())) {
      await runInferenceCacheOperation(
        'invalidate',
        () => this.options.kvCache.invalidate(ref, 'expired'),
        this.operationTimeoutMs
      );
      return null;
    }
    return runInferenceCacheOperation(
      'kv_read',
      () => this.options.kvCache.get(ref),
      this.operationTimeoutMs
    );
  }
}

export function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function inferenceCacheScopeHash(scope: InferenceCacheScope | undefined): string {
  if (!scope?.userId) return 'unscoped';
  return createHash('sha256')
    .update([scope.tenantId ?? '', scope.userId, scope.workspaceId ?? ''].join('\u0000'))
    .digest('hex');
}

export async function runInferenceCacheOperation<T>(
  operation: InferenceCacheOperation,
  task: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      task(),
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(
          () => reject(new InferenceCacheOperationTimeoutError(operation, timeoutMs)),
          Math.max(1, timeoutMs)
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export function isKvCacheExpired(ref: KvCacheRef, now: Date = new Date()): boolean {
  return Boolean(ref.expiresAt && new Date(ref.expiresAt).getTime() <= now.getTime());
}
