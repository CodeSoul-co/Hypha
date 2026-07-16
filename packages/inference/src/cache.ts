import { createHash } from 'crypto';
import type {
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
  metadata?: Record<string, unknown>;
}

export interface KvCacheCreateInput {
  id: string;
  provider: string;
  modelAlias: string;
  scope: KvCacheScope;
  ttlMs?: number;
  metadata?: Record<string, unknown>;
}

export interface InferenceCacheManagerOptions {
  prefixCache: PrefixCacheProvider;
  kvCache: KvCacheProvider;
  now?: () => Date;
}

export class InferenceCacheManager {
  private readonly now: () => Date;

  constructor(private readonly options: InferenceCacheManagerOptions) {
    this.now = options.now ?? (() => new Date());
  }

  async putPrefix(input: PrefixCacheCreateInput): Promise<PrefixCacheRef> {
    const ref: PrefixCacheRef = {
      id: input.id,
      version: input.version,
      contentHash: hashContent(input.content),
      tokenCount: input.tokenCount,
      metadata: input.metadata,
    };
    await this.options.prefixCache.put(ref, input.content);
    return ref;
  }

  async getPrefix(ref: PrefixCacheRef): Promise<string | null> {
    return this.options.prefixCache.get(ref);
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
      expiresAt,
      metadata: input.metadata,
    };
    await this.options.kvCache.put(ref, value);
    return ref;
  }

  async getKv(ref: KvCacheRef): Promise<unknown | null> {
    if (isKvCacheExpired(ref, this.now())) {
      await this.options.kvCache.invalidate(ref, 'expired');
      return null;
    }
    return this.options.kvCache.get(ref);
  }
}

export function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function isKvCacheExpired(ref: KvCacheRef, now: Date = new Date()): boolean {
  return Boolean(ref.expiresAt && new Date(ref.expiresAt).getTime() <= now.getTime());
}
