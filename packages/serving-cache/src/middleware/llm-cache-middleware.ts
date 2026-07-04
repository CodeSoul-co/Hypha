import type {
  ModelProvider,
  ModelRequest,
  ModelResponse,
  ModelStreamEvent,
  ModelUsage,
} from '@hypha/models';
import { buildPromptPrefixMetadata, hashStableJson } from '../key';
import { cacheModeAllowsRead, cacheModeAllowsWrite, normalizeCachePolicy } from '../policies';
import { ServingCacheManager } from '../cache-manager';
import type {
  CachedLLMProviderOptions,
  CacheMetadata,
  CachePolicy,
  CacheScope,
  LLMCacheKeyInput,
  ModelRequestCacheControl,
  PromptPrefixBlockInput,
  ServingCacheEvent,
  ServingCacheMissReason,
  ServingCacheTraceSink,
} from '../types';

export class CachedLLMProvider implements ModelProvider<ModelRequest, ModelResponse> {
  readonly id: string;
  private readonly policy: CachePolicy;
  private readonly trace?: ServingCacheTraceSink;

  constructor(
    private readonly inner: ModelProvider<ModelRequest, ModelResponse>,
    private readonly cache: ServingCacheManager,
    options: CachedLLMProviderOptions = {}
  ) {
    this.id = `${inner.id}:serving-cache`;
    this.policy = normalizeCachePolicy(options.policy ?? cache.policy);
    this.trace = options.trace;
    this.providerResolver = options.providerResolver ?? defaultProviderResolver;
    this.modelResolver = options.modelResolver ?? defaultModelResolver;
    this.scopeResolver = options.scopeResolver ?? defaultScopeResolver;
    this.paramsResolver = options.paramsResolver ?? defaultParamsResolver;
    this.promptBlocksResolver = options.promptBlocksResolver ?? defaultPromptBlocksResolver;
  }

  private readonly providerResolver: NonNullable<CachedLLMProviderOptions['providerResolver']>;
  private readonly modelResolver: NonNullable<CachedLLMProviderOptions['modelResolver']>;
  private readonly scopeResolver: NonNullable<CachedLLMProviderOptions['scopeResolver']>;
  private readonly paramsResolver: NonNullable<CachedLLMProviderOptions['paramsResolver']>;
  private readonly promptBlocksResolver: NonNullable<
    CachedLLMProviderOptions['promptBlocksResolver']
  >;

  capabilities(): ReturnType<ModelProvider['capabilities']> {
    return this.inner.capabilities();
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const provider = this.providerResolver(request, this.inner);
    const model = this.modelResolver(request, this.inner);
    const scope = this.scopeResolver(request);
    const control = resolveRequestCacheControl(request);
    const bypassReason = this.resolveBypassReason(request, control);
    if (bypassReason) {
      await this.emit({
        type: 'llm.cache.bypass',
        reason: bypassReason,
        provider,
        model,
        scope,
        runId: request.runId,
        stepId: request.stepId,
      });
      const response = await this.inner.generate(request);
      return attachServingCacheMetadata(response, {
        hit: false,
        source: 'provider',
        bypassReason,
      });
    }

    const keyInput = this.keyInputFor(request, provider, model, scope);
    const key = this.cache.keyFor(keyInput);
    await this.emit({
      type: 'llm.cache.lookup',
      key,
      provider,
      model,
      scope,
      runId: request.runId,
      stepId: request.stepId,
    });

    if (cacheModeAllowsRead(this.policy.mode)) {
      const cached = await this.cache.lookup<ModelResponse>(key);
      if (cached.hit) {
        await this.emit({
          type: 'llm.cache.hit',
          key,
          ageMs: cached.ageMs,
          provider,
          model,
          scope,
          runId: request.runId,
          stepId: request.stepId,
        });
        return attachServingCacheMetadata(cached.entry.value, {
          hit: true,
          key,
          source: 'hypha-serving-cache',
          ageMs: cached.ageMs,
        });
      }
      await this.emit({
        type: 'llm.cache.miss',
        key,
        reason: cached.reason,
        provider,
        model,
        scope,
        runId: request.runId,
        stepId: request.stepId,
      });
    } else {
      await this.emit({
        type: 'llm.cache.miss',
        key,
        reason: 'read_disabled',
        provider,
        model,
        scope,
        runId: request.runId,
        stepId: request.stepId,
      });
    }

    const response = await this.inner.generate(request);

    if (cacheModeAllowsWrite(this.policy.mode)) {
      const prefixMetadata = buildPromptPrefixMetadata(keyInput);
      const metadata: CacheMetadata = {
        provider,
        model,
        cacheType: 'exact',
        promptHash: prefixMetadata.prefixHash,
        toolSchemaHash: prefixMetadata.toolSchemaHash,
        requestHash: prefixMetadata.requestHash,
        prefixMetadata,
      };
      await this.cache.set(key, stripServingCacheMetadata(response), metadata, this.policy.ttlMs);
      await this.emit({
        type: 'llm.cache.write',
        key,
        ttlMs: this.policy.ttlMs,
        provider,
        model,
        scope,
        prefixMetadata,
        runId: request.runId,
        stepId: request.stepId,
      });
    }

    return attachServingCacheMetadata(response, {
      hit: false,
      key,
      source: 'provider',
    });
  }

  async *stream(request: ModelRequest): AsyncIterable<ModelStreamEvent> {
    const provider = this.providerResolver(request, this.inner);
    const model = this.modelResolver(request, this.inner);
    await this.emit({
      type: 'llm.cache.bypass',
      reason: 'streaming',
      provider,
      model,
      scope: this.scopeResolver(request),
      runId: request.runId,
      stepId: request.stepId,
    });
    if (!this.inner.stream) {
      throw new Error(`Model provider does not support streaming: ${this.inner.id}`);
    }
    yield* this.inner.stream(request);
  }

  async countTokens(input: unknown): Promise<ModelUsage> {
    if (!this.inner.countTokens) {
      throw new Error(`Model provider does not support token counting: ${this.inner.id}`);
    }
    return this.inner.countTokens(input);
  }

  private resolveBypassReason(
    request: ModelRequest,
    control: ModelRequestCacheControl | undefined
  ): ServingCacheMissReason | null {
    if (!this.policy.enabled || this.policy.mode === 'off') return 'disabled';
    if (control?.mode === 'off') return 'mode_off';
    if (this.policy.respectNoCache !== false && control?.noCache) return 'no_cache';
    if (isStreamingRequest(request)) return 'streaming';
    return null;
  }

  private keyInputFor(
    request: ModelRequest,
    provider: string,
    model: string,
    scope: CacheScope | undefined
  ): LLMCacheKeyInput {
    return {
      provider,
      model,
      system:
        [request.cache?.prefixContent, request.instructions].filter(Boolean).join('\n\n') ||
        undefined,
      messages: Array.isArray(request.input) ? request.input : [request.input],
      tools: request.tools,
      params: this.paramsResolver(request),
      cacheScope: scope,
      promptBlocks: this.promptBlocksResolver(request),
    };
  }

  private async emit(event: ServingCacheEvent): Promise<void> {
    await this.trace?.(event);
  }
}

function defaultProviderResolver(
  request: ModelRequest,
  inner: ModelProvider<ModelRequest, ModelResponse>
): string {
  const metadataProvider = stringFromMetadata(request.metadata, 'provider');
  return metadataProvider ?? inner.id;
}

function defaultModelResolver(request: ModelRequest): string {
  return request.modelAlias;
}

function defaultScopeResolver(request: ModelRequest): CacheScope | undefined {
  const metadata = {
    ...recordFromUnknown(request.cache?.metadata),
    ...recordFromUnknown(request.metadata),
  };
  const scope: CacheScope = {};
  copyScopeString(metadata, scope, 'tenantId');
  copyScopeString(metadata, scope, 'userId');
  copyScopeString(metadata, scope, 'projectId');
  copyScopeString(metadata, scope, 'sessionId');
  copyScopeString(metadata, scope, 'domainPackId');
  return Object.keys(scope).length ? scope : undefined;
}

function defaultParamsResolver(request: ModelRequest): Record<string, unknown> {
  return {
    temperature: request.temperature,
    maxTokens: request.maxTokens,
    responseFormat: request.responseFormat,
    reasoning: request.reasoning,
  };
}

function defaultPromptBlocksResolver(request: ModelRequest): PromptPrefixBlockInput[] | undefined {
  const cacheMetadata = recordFromUnknown(request.cache?.metadata);
  const requestMetadata = recordFromUnknown(request.metadata);
  const promptMetadata = recordFromUnknown(requestMetadata?.prompt);
  const metadataCandidates = [
    cacheMetadata?.promptBlocks,
    requestMetadata?.promptBlocks,
    promptMetadata?.blocks,
  ];
  for (const candidate of metadataCandidates) {
    if (Array.isArray(candidate)) {
      return candidate
        .filter((item): item is PromptPrefixBlockInput => isPromptBlockInput(item))
        .map((item) => ({ ...item }));
    }
  }
  return undefined;
}

function resolveRequestCacheControl(request: ModelRequest): ModelRequestCacheControl | undefined {
  const structural = request as ModelRequest & { cacheControl?: ModelRequestCacheControl };
  const direct = structural.cacheControl;
  const metadataControl = recordFromUnknown(request.metadata?.servingCache);
  const cacheMetadataControl = recordFromUnknown(request.cache?.metadata?.servingCache);
  return {
    ...cacheMetadataControl,
    ...metadataControl,
    ...direct,
  } as ModelRequestCacheControl;
}

function isStreamingRequest(request: ModelRequest): boolean {
  const input = recordFromUnknown(request.input);
  const options = recordFromUnknown(input?.options);
  return Boolean(request.metadata?.streaming || input?.stream || options?.stream);
}

function isPromptBlockInput(value: unknown): value is PromptPrefixBlockInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === 'string' && typeof record.type === 'string';
}

function attachServingCacheMetadata(
  response: ModelResponse,
  servingCache: Record<string, unknown>
): ModelResponse {
  return {
    ...response,
    metadata: {
      ...response.metadata,
      servingCache,
    },
  };
}

function stripServingCacheMetadata(response: ModelResponse): ModelResponse {
  const { servingCache, ...metadata } = response.metadata ?? {};
  return {
    ...response,
    metadata: Object.keys(metadata).length ? metadata : undefined,
  };
}

function recordFromUnknown(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function stringFromMetadata(
  metadata: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = metadata?.[key];
  return typeof value === 'string' && value ? value : undefined;
}

function copyScopeString(
  source: Record<string, unknown>,
  target: CacheScope,
  key: keyof CacheScope
): void {
  const value = source[key];
  if (typeof value === 'string' && value) {
    target[key] = value;
  }
}

export function servingCacheResponseMetadata(
  response: ModelResponse
): Record<string, unknown> | undefined {
  return recordFromUnknown(response.metadata?.servingCache);
}

export function requestHashForModelRequest(request: ModelRequest): string {
  return hashStableJson({
    instructions: request.instructions,
    input: request.input,
    tools: request.tools,
    responseFormat: request.responseFormat,
    reasoning: request.reasoning,
    temperature: request.temperature,
    maxTokens: request.maxTokens,
  });
}
