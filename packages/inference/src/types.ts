export interface InferenceRequest<TInput = unknown> {
  runId: string;
  stepId: string;
  sessionId?: string;
  agentId?: string;
  modelAlias: string;
  providerId?: string;
  backendId?: string;
  input: TInput;
  options?: InferenceGenerationOptions;
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
  metadata?: Record<string, unknown>;
  raw?: unknown;
}

export interface InferenceGenerationOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  stop?: string[];
  seed?: number;
  stream?: boolean;
  responseFormat?: 'text' | 'json_object' | { type: string; schema?: unknown };
  extra?: Record<string, unknown>;
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

export type PromptRole =
  | 'system'
  | 'developer'
  | 'user'
  | 'assistant'
  | 'tool'
  | 'context'
  | 'memory';

export interface PromptMessage {
  role: PromptRole;
  content: string;
  name?: string;
  metadata?: Record<string, unknown>;
}

export interface PromptCompileInput<TInput = unknown> {
  runId: string;
  stepId: string;
  sessionId?: string;
  agentId?: string;
  modelAlias: string;
  instructions?: string;
  messages?: PromptMessage[];
  input: TInput;
  context?: Record<string, unknown>;
  resolvedPrefixContent?: string;
  metadata?: Record<string, unknown>;
}

export interface CompiledPrompt {
  id: string;
  messages: PromptMessage[];
  text: string;
  metadata?: Record<string, unknown>;
}

export interface PromptCompiler {
  compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt>;
}

export type PrefixSegmentKind =
  | 'system'
  | 'developer'
  | 'context'
  | 'memory'
  | 'tool'
  | 'user'
  | 'assistant';
export type PrefixSegmentScope = 'global' | 'agent' | 'session' | 'run' | 'dynamic';

export interface PrefixSegment {
  id: string;
  kind: PrefixSegmentKind;
  scope: PrefixSegmentScope;
  content: string;
  contentHash: string;
  tokenCount?: number;
  cacheable: boolean;
  dependencies?: string[];
  metadata?: Record<string, unknown>;
}

export interface PrefixSegmentationResult {
  compiled: CompiledPrompt;
  segments: PrefixSegment[];
  stablePrefix: string;
  dynamicPrompt: string;
  metadata?: Record<string, unknown>;
}

export interface PrefixSegmenter {
  segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult>;
}

export interface PlasmodReusePolicy {
  allowCrossSession?: boolean;
  allowCrossAgent?: boolean;
  minTokenCount?: number;
  requireExactHash?: boolean;
  maxPrefixRefs?: number;
}

export interface PlasmodCacheMetadata {
  segmentId: string;
  contentHash: string;
  backendId: string;
  modelAlias: string;
  scope: PrefixSegmentScope;
  tokenCount?: number;
  reused: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface PlasmodSessionState {
  id: string;
  sessionId?: string;
  runId: string;
  agentId?: string;
  modelAlias: string;
  backendId: string;
  prefixRefs: PrefixCacheRef[];
  kvCacheRef?: KvCacheRef;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface PlasmodHotLayerPrepareInput {
  runId: string;
  stepId: string;
  sessionId?: string;
  agentId?: string;
  modelAlias: string;
  backendId: string;
  segmentation: PrefixSegmentationResult;
  kvCache?: KvCacheRef;
  resolvedKvCacheValue?: unknown;
  reusePolicy?: PlasmodReusePolicy;
  metadata?: Record<string, unknown>;
}

export interface PlasmodHotLayerPrepareResult {
  prefixRefs: PrefixCacheRef[];
  kvCacheRef?: KvCacheRef;
  physicalKvCache?: unknown;
  reusedSegmentIds: string[];
  invalidatedSegmentIds: string[];
  metadata?: Record<string, unknown>;
}

export interface PlasmodHotLayer {
  prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult>;
  invalidateSegment(segmentId: string, reason: string): Promise<void>;
  getSessionState(stateId: string): PlasmodSessionState | null;
  getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null;
}

export type InferenceBackendKind = 'sglang' | 'vllm' | 'llama.cpp' | 'openai-api';

export interface InferenceBackendCapabilities {
  streaming: boolean;
  chatCompletions: boolean;
  textCompletions: boolean;
  prefixCaching: boolean;
  kvCaching: boolean;
  cacheInvalidation: boolean;
}

export interface InferenceBackendRequest {
  runId: string;
  stepId: string;
  sessionId?: string;
  agentId?: string;
  modelAlias: string;
  compiledPrompt: CompiledPrompt;
  segmentation: PrefixSegmentationResult;
  prefixRefs: PrefixCacheRef[];
  kvCache?: KvCacheRef;
  resolvedKvCacheValue?: unknown;
  physicalKvCache?: unknown;
  options?: InferenceGenerationOptions;
  metadata?: Record<string, unknown>;
}

export interface InferenceBackendResponse<TOutput = unknown> {
  id: string;
  output: TOutput;
  usage?: InferenceUsage;
  physicalKvCache?: unknown;
  metadata?: Record<string, unknown>;
  raw?: unknown;
}

export interface InferenceBackend {
  id: string;
  kind: InferenceBackendKind;
  capabilities(): InferenceBackendCapabilities;
  infer(request: InferenceBackendRequest): Promise<InferenceBackendResponse>;
  stream?(request: InferenceBackendRequest): AsyncIterable<InferenceBackendResponse>;
}

export interface InferenceBackendRegistryEntry {
  id: string;
  backend: InferenceBackend;
  default?: boolean;
}
