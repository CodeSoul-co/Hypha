import type { ModelProvider, ModelRequest, ModelResponse } from '@hypha/models';

export type CacheType = 'exact' | 'prefix-metadata' | 'semantic';
export type CacheMode = 'off' | 'read' | 'write' | 'readwrite';
export type ServingCacheStoreKind = 'off' | 'noop' | 'memory' | 'sqlite';

export interface CacheStore<T = unknown> {
  get<TValue = T>(key: string): Promise<CacheEntry<TValue> | null>;
  set<TValue = T>(key: string, entry: CacheEntry<TValue>): Promise<void>;
  delete(key: string): Promise<void>;
  clear?(): Promise<void>;
  touch?(key: string, timestamp: number): Promise<void>;
}

export interface CacheEntry<T = unknown> {
  key: string;
  value: T;
  createdAt: number;
  expiresAt?: number;
  metadata?: CacheMetadata;
}

export interface CacheMetadata {
  provider: string;
  model: string;
  cacheType: CacheType;
  promptHash?: string;
  toolSchemaHash?: string;
  requestHash?: string;
  hitCount?: number;
  tags?: string[];
  prefixMetadata?: PromptPrefixMetadata;
}

export interface CacheScope {
  tenantId?: string;
  userId?: string;
  projectId?: string;
  sessionId?: string;
  domainPackId?: string;
}

export interface LLMCacheKeyInput {
  provider: string;
  model: string;
  messages: unknown[];
  system?: string;
  tools?: unknown[];
  params?: Record<string, unknown>;
  cacheScope?: CacheScope;
  promptBlocks?: PromptPrefixBlockInput[];
}

export type PromptPrefixBlockType =
  | 'system'
  | 'tool-schema'
  | 'project-context'
  | 'domain-pack'
  | 'memory'
  | 'prompt-template';

export interface PromptPrefixBlockInput {
  id: string;
  type: PromptPrefixBlockType;
  stable?: boolean;
  hash?: string;
  content?: string;
  tokenEstimate?: number;
  order?: number;
  source?: string;
  templateId?: string;
  templateVersion?: string;
  metadata?: Record<string, unknown>;
}

export interface PromptPrefixMetadata {
  prefixHash: string;
  prefixTokenEstimate?: number;
  dynamicSuffixHash?: string;
  requestHash?: string;
  toolSchemaHash?: string;
  domainPackHash?: string;
  blocks: PromptPrefixBlock[];
}

export interface PromptPrefixBlock extends Required<Pick<PromptPrefixBlockInput, 'id' | 'type' | 'hash'>> {
  stable: boolean;
  content?: string;
  tokenEstimate?: number;
  order?: number;
  source?: string;
  templateId?: string;
  templateVersion?: string;
  metadata?: Record<string, unknown>;
}

export type PrefixCacheChangeReason =
  | 'first_request'
  | 'prefix_changed'
  | 'tool_schema_changed'
  | 'domain_pack_changed'
  | 'dynamic_suffix_changed'
  | 'unchanged';

export interface PrefixCacheShapeObservation {
  provider: string;
  model: string;
  prefixHash: string;
  previousPrefixHash?: string;
  toolSchemaHash?: string;
  previousToolSchemaHash?: string;
  domainPackHash?: string;
  previousDomainPackHash?: string;
  dynamicSuffixHash?: string;
  previousDynamicSuffixHash?: string;
  requestHash?: string;
  prefixTokenEstimate?: number;
  blockCount: number;
  stablePrefixChanged: boolean;
  dynamicSuffixChanged: boolean;
  changedReasons: PrefixCacheChangeReason[];
  scope?: CacheScope;
}

export interface ProviderPrefixCacheUsage {
  source: 'provider-usage' | 'hypha-serving-cache' | 'unknown';
  inputTokens?: number;
  hitTokens?: number;
  missTokens?: number;
  hitRate?: number;
}

export interface CachePolicy {
  enabled: boolean;
  mode: CacheMode;
  ttlMs?: number;
  cacheErrors?: boolean;
  cacheStreaming?: boolean;
  respectNoCache?: boolean;
}

export type ServingCacheMissReason =
  | 'not_found'
  | 'expired'
  | 'disabled'
  | 'streaming'
  | 'no_cache'
  | 'mode_off'
  | 'read_disabled';

export type ServingCacheEvent =
  | {
      type: 'llm.cache.lookup';
      key: string;
      provider: string;
      model: string;
      scope?: CacheScope;
      prefixCache?: PrefixCacheShapeObservation;
      runId?: string;
      stepId?: string;
    }
  | {
      type: 'llm.cache.hit';
      key: string;
      ageMs: number;
      provider: string;
      model: string;
      scope?: CacheScope;
      prefixCache?: PrefixCacheShapeObservation;
      runId?: string;
      stepId?: string;
    }
  | {
      type: 'llm.cache.miss';
      key: string;
      reason: ServingCacheMissReason;
      provider: string;
      model: string;
      scope?: CacheScope;
      prefixCache?: PrefixCacheShapeObservation;
      runId?: string;
      stepId?: string;
    }
  | {
      type: 'llm.cache.write';
      key: string;
      ttlMs?: number;
      provider: string;
      model: string;
      scope?: CacheScope;
      prefixMetadata?: PromptPrefixMetadata;
      prefixCache?: PrefixCacheShapeObservation;
      providerPrefixCache?: ProviderPrefixCacheUsage;
      runId?: string;
      stepId?: string;
    }
  | {
      type: 'llm.cache.bypass';
      reason: ServingCacheMissReason;
      provider?: string;
      model?: string;
      scope?: CacheScope;
      runId?: string;
      stepId?: string;
    };

export type ServingCacheTraceSink = (event: ServingCacheEvent) => void | Promise<void>;

export interface CacheLookupHit<T = unknown> {
  hit: true;
  key: string;
  entry: CacheEntry<T>;
  ageMs: number;
}

export interface CacheLookupMiss {
  hit: false;
  key: string;
  reason: 'not_found' | 'expired';
}

export type CacheLookupResult<T = unknown> = CacheLookupHit<T> | CacheLookupMiss;

export interface ModelRequestCacheControl {
  mode?: CacheMode;
  noCache?: boolean;
}

export interface CachedLLMProviderOptions {
  policy?: Partial<CachePolicy>;
  trace?: ServingCacheTraceSink;
  providerResolver?: (
    request: ModelRequest,
    inner: ModelProvider<ModelRequest, ModelResponse>
  ) => string;
  modelResolver?: (
    request: ModelRequest,
    inner: ModelProvider<ModelRequest, ModelResponse>
  ) => string;
  scopeResolver?: (request: ModelRequest) => CacheScope | undefined;
  paramsResolver?: (request: ModelRequest) => Record<string, unknown> | undefined;
  promptBlocksResolver?: (request: ModelRequest) => PromptPrefixBlockInput[] | undefined;
}
