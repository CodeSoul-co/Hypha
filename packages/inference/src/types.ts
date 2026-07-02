export interface InferenceRequest<TInput = unknown> {
  runId: string;
  stepId: string;
  agentId?: string;
  modelAlias: string;
  providerId?: string;
  input: TInput;
  cachePolicy?: InferenceCachePolicy;
  prefix?: PrefixCacheRef;
  resolvedPrefixContent?: string;
  kvCache?: KvCacheRef;
  resolvedKvCacheValue?: unknown;
  trace?: boolean;
  metadata?: Record<string, unknown>;
}

export interface InferenceResponse<TOutput = unknown> {
  id: string;
  output: TOutput;
  usage?: InferenceUsage;
  cache?: InferenceCacheUsage;
  nextKvCacheValue?: unknown;
  raw?: unknown;
}

export interface InferenceUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface PrefixCacheRef {
  id: string;
  version: string;
  contentHash: string;
  tokenCount?: number;
  metadata?: Record<string, unknown>;
}

export interface KvCacheRef {
  id: string;
  provider: string;
  modelAlias: string;
  scope: KvCacheScope;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export type KvCacheScope = 'run' | 'session' | 'workspace';

export type InferenceCacheMissReason = 'missing' | 'expired' | 'not_configured';

export type KvCacheWriteMode = 'write_through' | 'write_if_missing' | 'refresh';

export interface KvCacheWritePolicy {
  ref: KvCacheRef;
  value?: unknown;
  mode?: KvCacheWriteMode;
}

export interface InferenceCachePolicy {
  prefix?: PrefixCacheRef;
  kvCache?: KvCacheRef;
  writeKvCache?: KvCacheWritePolicy;
}

export interface InferenceCacheUsage {
  prefixHit?: boolean;
  kvCacheHit?: boolean;
  prefixRef?: PrefixCacheRef;
  kvCacheRef?: KvCacheRef;
  kvCacheMissReason?: InferenceCacheMissReason;
  kvCacheWritten?: boolean;
  kvCacheWriteRef?: KvCacheRef;
  reusedTokens?: number;
}

export interface InferenceProvider {
  id: string;
  infer(request: InferenceRequest): Promise<InferenceResponse>;
  stream?(request: InferenceRequest): AsyncIterable<InferenceResponse>;
}

export interface PrefixCacheProvider {
  get(ref: PrefixCacheRef): Promise<string | null>;
  put(ref: PrefixCacheRef, content: string): Promise<void>;
  invalidate(ref: PrefixCacheRef, reason: string): Promise<void>;
}

export interface KvCacheProvider {
  get(ref: KvCacheRef): Promise<unknown | null>;
  put(ref: KvCacheRef, value: unknown): Promise<void>;
  invalidate(ref: KvCacheRef, reason: string): Promise<void>;
}

export interface InferenceManagerOptions {
  prefixCache?: PrefixCacheProvider;
  kvCache?: KvCacheProvider;
}
