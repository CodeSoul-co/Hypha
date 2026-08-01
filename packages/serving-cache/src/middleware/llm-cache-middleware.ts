import type {
  ModelProvider,
  ModelRequest,
  ModelResponse,
  ModelStreamEvent,
  ModelUsage,
} from '@hypha/models';
import { CacheEntryTooLargeError, ServingCacheManager } from '../cache-manager';
import { buildPromptPrefixMetadata, hashStableJson } from '../key';
import { cacheModeAllowsRead, cacheModeAllowsWrite, normalizeCachePolicy } from '../policies';
import { PrefixCacheShapeTracker } from '../prefix-shape';
import { validateCachedModelResponseProjection } from '../schemas';
import type {
  CachedLLMProviderOptions,
  CachedModelResponseProjection,
  CacheMetadata,
  CachePolicy,
  CacheScope,
  LLMCacheKeyInput,
  ModelRequestCacheControl,
  PromptPrefixBlockInput,
  ProviderPrefixCacheUsage,
  ServingCacheEvent,
  ServingCacheMissReason,
  ServingCacheTraceSink,
} from '../types';

export class CachedLLMProvider implements ModelProvider<ModelRequest, ModelResponse> {
  readonly id: string;
  private readonly policy: CachePolicy;
  private readonly trace?: ServingCacheTraceSink;
  private readonly prefixShapeTracker = new PrefixCacheShapeTracker();
  private readonly inFlight = new Map<string, Promise<ModelResponse>>();
  private circuitFailures = 0;
  private circuitOpenedAt?: number;

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
    this.responseIdFactory = options.responseIdFactory ?? defaultResponseIdFactory;
  }

  private readonly providerResolver: NonNullable<CachedLLMProviderOptions['providerResolver']>;
  private readonly modelResolver: NonNullable<CachedLLMProviderOptions['modelResolver']>;
  private readonly scopeResolver: NonNullable<CachedLLMProviderOptions['scopeResolver']>;
  private readonly paramsResolver: NonNullable<CachedLLMProviderOptions['paramsResolver']>;
  private readonly promptBlocksResolver: NonNullable<
    CachedLLMProviderOptions['promptBlocksResolver']
  >;
  private readonly responseIdFactory: NonNullable<CachedLLMProviderOptions['responseIdFactory']>;

  capabilities(): ReturnType<ModelProvider['capabilities']> {
    return this.inner.capabilities();
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const provider = this.providerResolver(request, this.inner);
    const model = this.modelResolver(request, this.inner);
    const scope = this.scopeResolver(request);
    const control = resolveRequestCacheControl(request);
    const bypassReason = this.resolveBypassReason(request, control, scope);
    if (bypassReason) {
      await this.safeEmit({
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
    const prefixMetadata = buildPromptPrefixMetadata(keyInput);
    const prefixCache = this.prefixShapeTracker.observe({
      provider,
      model,
      scope,
      prefixMetadata,
    });
    await this.safeEmit({
      type: 'llm.cache.lookup',
      key,
      provider,
      model,
      scope,
      prefixCache,
      runId: request.runId,
      stepId: request.stepId,
    });

    if (cacheModeAllowsRead(this.policy.mode)) {
      const cached = await this.cacheOperation(
        'lookup',
        () => this.cache.lookup<CachedModelResponseProjection>(key),
        { key, provider, model, scope, request }
      );
      if (cached?.hit) {
        try {
          const projection = validateCachedModelResponseProjection(cached.entry.value);
          await this.safeEmit({
            type: 'llm.cache.hit',
            key,
            ageMs: cached.ageMs,
            provider,
            model,
            scope,
            prefixCache,
            runId: request.runId,
            stepId: request.stepId,
          });
          return attachServingCacheMetadata(this.hydrate(projection, request, key), {
            hit: true,
            key,
            source: 'hypha-serving-cache',
            ageMs: cached.ageMs,
            prefixCache,
            providerPrefixCache: { source: 'hypha-serving-cache' },
          });
        } catch (error) {
          await this.cacheOperation('delete', () => this.cache.delete(key), {
            key,
            provider,
            model,
            scope,
            request,
          });
          await this.safeEmit({
            type: 'llm.cache.miss',
            key,
            reason: 'corrupt',
            provider,
            model,
            scope,
            prefixCache,
            runId: request.runId,
            stepId: request.stepId,
          });
        }
      } else {
        await this.safeEmit({
          type: 'llm.cache.miss',
          key,
          reason: cached?.reason ?? 'store_unavailable',
          provider,
          model,
          scope,
          prefixCache,
          runId: request.runId,
          stepId: request.stepId,
        });
      }
    } else {
      await this.safeEmit({
        type: 'llm.cache.miss',
        key,
        reason: 'read_disabled',
        provider,
        model,
        scope,
        prefixCache,
        runId: request.runId,
        stepId: request.stepId,
      });
    }

    const pending = this.policy.singleflight === false ? undefined : this.inFlight.get(key);
    if (pending) {
      const response = await pending;
      return attachServingCacheMetadata(this.hydrate(projectResponse(response), request, key), {
        hit: true,
        key,
        source: 'in_flight',
        prefixCache,
      });
    }

    const computation = this.generateAndCache({
      request,
      key,
      provider,
      model,
      scope,
      prefixMetadata,
      prefixCache,
    });
    if (this.policy.singleflight !== false) this.inFlight.set(key, computation);
    try {
      return await computation;
    } finally {
      if (this.inFlight.get(key) === computation) this.inFlight.delete(key);
    }
  }

  async *stream(request: ModelRequest): AsyncIterable<ModelStreamEvent> {
    const provider = this.providerResolver(request, this.inner);
    const model = this.modelResolver(request, this.inner);
    await this.safeEmit({
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

  private async generateAndCache(input: {
    request: ModelRequest;
    key: string;
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixMetadata: ReturnType<typeof buildPromptPrefixMetadata>;
    prefixCache: ReturnType<PrefixCacheShapeTracker['observe']>;
  }): Promise<ModelResponse> {
    const response = await this.inner.generate(input.request);
    const providerPrefixCache = providerPrefixCacheUsage(response);
    if (cacheModeAllowsWrite(this.policy.mode)) {
      const metadata: CacheMetadata = {
        provider: input.provider,
        model: input.model,
        cacheType: 'exact',
        promptHash: input.prefixMetadata.prefixHash,
        toolSchemaHash: input.prefixMetadata.toolSchemaHash,
        requestHash: input.prefixMetadata.requestHash,
        prefixMetadata: input.prefixMetadata,
        scope: input.scope,
        projectionType: 'CachedModelResponseProjection@1.0',
        classification: 'confidential',
      };
      const wrote = await this.cacheOperation(
        'write',
        async () => {
          await this.cache.set(input.key, projectResponse(response), metadata, this.policy.ttlMs);
          return true;
        },
        { ...input, request: input.request }
      );
      if (wrote) {
        await this.safeEmit({
          type: 'llm.cache.write',
          key: input.key,
          ttlMs: this.policy.ttlMs,
          provider: input.provider,
          model: input.model,
          scope: input.scope,
          prefixMetadata: input.prefixMetadata,
          prefixCache: input.prefixCache,
          providerPrefixCache,
          runId: input.request.runId,
          stepId: input.request.stepId,
        });
      }
    }

    return attachServingCacheMetadata(response, {
      hit: false,
      key: input.key,
      source: 'provider',
      prefixCache: input.prefixCache,
      providerPrefixCache,
    });
  }

  private resolveBypassReason(
    request: ModelRequest,
    control: ModelRequestCacheControl | undefined,
    scope: CacheScope | undefined
  ): ServingCacheMissReason | null {
    if (!this.policy.enabled || this.policy.mode === 'off') return 'disabled';
    if (control?.mode === 'off') return 'mode_off';
    if (this.policy.respectNoCache !== false && control?.noCache) return 'no_cache';
    if (isStreamingRequest(request)) return 'streaming';
    if (!scopeSatisfies(scope, this.policy.scopeRequirement ?? 'user')) return 'scope_missing';
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

  private hydrate(
    projection: CachedModelResponseProjection,
    request: ModelRequest,
    key: string
  ): ModelResponse {
    return {
      id: this.responseIdFactory(request, key),
      providerId: projection.providerId,
      model: projection.model,
      content: projection.content,
      toolCalls: projection.toolCalls,
      usage: projection.usage,
    };
  }

  private async cacheOperation<T>(
    operation: 'lookup' | 'write' | 'delete',
    action: () => Promise<T>,
    context: {
      key: string;
      provider: string;
      model: string;
      scope?: CacheScope;
      request: ModelRequest;
    }
  ): Promise<T | undefined> {
    if (this.circuitIsOpen()) {
      await this.safeEmit({
        type: 'llm.cache.bypass',
        reason: 'store_unavailable',
        operation,
        code: 'CACHE_CIRCUIT_OPEN',
        key: context.key,
        provider: context.provider,
        model: context.model,
        scope: context.scope,
        runId: context.request.runId,
        stepId: context.request.stepId,
      });
      return undefined;
    }
    try {
      const result = await withTimeout(action(), this.policy.operationTimeoutMs ?? 250);
      this.circuitFailures = 0;
      this.circuitOpenedAt = undefined;
      return result;
    } catch (error) {
      this.circuitFailures += 1;
      if (this.circuitFailures >= (this.policy.circuitBreaker?.failureThreshold ?? 3)) {
        this.circuitOpenedAt = Date.now();
      }
      await this.safeEmit({
        type: 'llm.cache.bypass',
        reason: 'store_unavailable',
        operation,
        code: cacheErrorCode(error),
        key: context.key,
        provider: context.provider,
        model: context.model,
        scope: context.scope,
        runId: context.request.runId,
        stepId: context.request.stepId,
      });
      if (this.policy.failureMode === 'strict') throw error;
      return undefined;
    }
  }

  private circuitIsOpen(): boolean {
    if (this.circuitOpenedAt === undefined) return false;
    if (
      Date.now() - this.circuitOpenedAt >=
      (this.policy.circuitBreaker?.resetTimeoutMs ?? 30000)
    ) {
      this.circuitOpenedAt = undefined;
      this.circuitFailures = 0;
      return false;
    }
    return true;
  }

  private async safeEmit(event: ServingCacheEvent): Promise<void> {
    try {
      await this.trace?.(event);
    } catch {
      // Cache observability is best effort and must never mask the primary provider result.
    }
  }
}

function defaultProviderResolver(
  request: ModelRequest,
  inner: ModelProvider<ModelRequest, ModelResponse>
): string {
  return stringFromMetadata(request.metadata, 'provider') ?? inner.id;
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
  const candidates = [
    cacheMetadata?.promptBlocks,
    requestMetadata?.promptBlocks,
    promptMetadata?.blocks,
  ];
  for (const candidate of candidates) {
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
  return {
    ...recordFromUnknown(request.cache?.metadata?.servingCache),
    ...recordFromUnknown(request.metadata?.servingCache),
    ...structural.cacheControl,
  } as ModelRequestCacheControl;
}

function isStreamingRequest(request: ModelRequest): boolean {
  const input = recordFromUnknown(request.input);
  const options = recordFromUnknown(input?.options);
  return Boolean(
    request.metadata?.streaming || request.metadata?.stream || input?.stream || options?.stream
  );
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
  return { ...response, metadata: { ...response.metadata, servingCache } };
}

function projectResponse(response: ModelResponse): CachedModelResponseProjection {
  return {
    schemaVersion: '1.0',
    providerId: response.providerId,
    model: response.model,
    content: response.content,
    toolCalls: response.toolCalls,
    usage: response.usage,
  };
}

function providerPrefixCacheUsage(response: ModelResponse): ProviderPrefixCacheUsage {
  const inputTokens = response.usage?.inputTokens;
  const hitTokens = response.usage?.cacheHitTokens;
  const missTokens =
    response.usage?.cacheMissTokens ??
    (typeof inputTokens === 'number' && typeof hitTokens === 'number'
      ? Math.max(0, inputTokens - hitTokens)
      : undefined);
  const denominator =
    typeof hitTokens === 'number' && typeof missTokens === 'number'
      ? hitTokens + missTokens
      : inputTokens;
  return {
    source:
      typeof hitTokens === 'number' || typeof missTokens === 'number'
        ? 'provider-usage'
        : 'unknown',
    inputTokens,
    hitTokens,
    missTokens,
    hitRate:
      typeof denominator === 'number' && denominator > 0 && typeof hitTokens === 'number'
        ? hitTokens / denominator
        : undefined,
  };
}

function scopeSatisfies(
  scope: CacheScope | undefined,
  requirement: CachePolicy['scopeRequirement']
): boolean {
  if (requirement === 'none') return true;
  if (requirement === 'session') return Boolean(scope?.userId && scope.sessionId);
  return Boolean(scope?.userId);
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
  if (typeof value === 'string' && value) target[key] = value;
}

function defaultResponseIdFactory(request: ModelRequest, key: string): string {
  return `${request.runId}:${request.stepId}:cache:${key.slice(-16)}`;
}

function cacheErrorCode(error: unknown): string {
  if (error instanceof CacheEntryTooLargeError) return error.code;
  if (error instanceof Error && error.name === 'TimeoutError') return 'CACHE_OPERATION_TIMEOUT';
  return 'CACHE_STORE_UNAVAILABLE';
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          const error = new Error(`Cache operation timed out after ${timeoutMs}ms.`);
          error.name = 'TimeoutError';
          reject(error);
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
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
