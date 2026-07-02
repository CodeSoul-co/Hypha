export interface InferenceRequest<TInput = unknown> {
  runId: string;
  stepId: string;
  agentId?: string;
  modelAlias: string;
  providerId?: string;
  input: TInput;
  prefix?: PrefixCacheRef;
  kvCache?: KvCacheRef;
  trace?: boolean;
  metadata?: Record<string, unknown>;
}

export interface InferenceResponse<TOutput = unknown> {
  id: string;
  output: TOutput;
  usage?: InferenceUsage;
  cache?: InferenceCacheUsage;
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
  scope: 'run' | 'session' | 'workspace';
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface InferenceCacheUsage {
  prefixHit?: boolean;
  kvCacheHit?: boolean;
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
