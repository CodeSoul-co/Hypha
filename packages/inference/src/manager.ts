import { FrameworkError, type RecoveryFailure } from '@hypha/core';
import { isKvCacheExpired } from './cache';
import { classifyInferenceCacheFailure, classifyInferenceFailure } from './recovery';
import type {
  InferenceCacheIssue,
  InferenceCacheMissReason,
  InferenceManagerOptions,
  InferenceProvider,
  InferenceRequest,
  InferenceResponse,
  KvCacheProvider,
  KvCacheRef,
  PrefixCacheProvider,
  PrefixCacheRef,
} from './types';

interface PreparedInferenceRequest {
  request: InferenceRequest;
  providerId: string;
  prefixHit: boolean;
  kvCacheHit: boolean;
  prefixRef?: PrefixCacheRef;
  kvCacheRef?: KvCacheRef;
  kvCacheMissReason?: InferenceCacheMissReason;
  cacheIssues: InferenceCacheIssue[];
}

interface CacheResolution<TValue> {
  value: TValue | null;
  missReason?: InferenceCacheMissReason;
  issues: InferenceCacheIssue[];
}

export class InferenceManager {
  private readonly providers = new Map<string, InferenceProvider>();
  private readonly prefixCache?: PrefixCacheProvider;
  private readonly kvCache?: KvCacheProvider;
  private readonly cacheFailureMode: 'bypass' | 'strict';

  constructor(private readonly options: InferenceManagerOptions = {}) {
    this.prefixCache = options.prefixCache;
    this.kvCache = options.kvCache;
    this.cacheFailureMode = options.cacheFailureMode ?? 'bypass';
  }

  register(provider: InferenceProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(providerId: string): InferenceProvider | null {
    return this.providers.get(providerId) ?? null;
  }

  async infer(providerId: string, request: InferenceRequest): Promise<InferenceResponse> {
    const provider = this.get(providerId);
    if (!provider) {
      throw new FrameworkError({
        code: 'INFERENCE_PROVIDER_NOT_FOUND',
        message: `Inference provider not found: ${providerId}`,
        context: { providerId, runId: request.runId, stepId: request.stepId },
      });
    }

    const prepared = await this.prepareRequest(providerId, request);
    try {
      const response = await provider.infer(prepared.request);
      return this.finalizeResponse(response, prepared);
    } catch (error) {
      await this.reportInferenceFailure(error, providerId, 'infer', request);
      throw error;
    }
  }

  async *stream(providerId: string, request: InferenceRequest): AsyncIterable<InferenceResponse> {
    const provider = this.get(providerId);
    if (!provider) {
      throw new FrameworkError({
        code: 'INFERENCE_PROVIDER_NOT_FOUND',
        message: `Inference provider not found: ${providerId}`,
        context: { providerId, runId: request.runId, stepId: request.stepId },
      });
    }
    if (!provider.stream) {
      throw new FrameworkError({
        code: 'INFERENCE_STREAM_NOT_SUPPORTED',
        message: `Inference provider does not support streaming: ${providerId}`,
        context: { providerId, runId: request.runId, stepId: request.stepId },
      });
    }

    const prepared = await this.prepareRequest(providerId, request);
    try {
      for await (const response of provider.stream(prepared.request)) {
        yield await this.finalizeResponse(response, prepared);
      }
    } catch (error) {
      await this.reportInferenceFailure(error, providerId, 'stream', request);
      throw error;
    }
  }

  private async prepareRequest(
    providerId: string,
    request: InferenceRequest
  ): Promise<PreparedInferenceRequest> {
    const prefixRef = request.cachePolicy?.prefix ?? request.prefix;
    const kvCacheRef = request.cachePolicy?.kvCache ?? request.kvCache;
    const [prefix, kvCache] = await Promise.all([
      this.resolvePrefixCache(providerId, request, prefixRef),
      this.resolveKvCache(providerId, request, kvCacheRef),
    ]);
    const cacheIssues = [...prefix.issues, ...kvCache.issues];
    const kvCacheHit = kvCache.value !== null;
    return {
      request: {
        ...request,
        prefix: prefixRef,
        kvCache: kvCacheRef,
        resolvedPrefixContent: prefix.value ?? undefined,
        resolvedKvCacheValue: kvCache.value ?? undefined,
        metadata: {
          ...request.metadata,
          prefixCacheHit: prefix.value !== null,
          kvCacheHit,
          ...(kvCache.missReason ? { kvCacheMissReason: kvCache.missReason } : {}),
          ...(cacheIssues.length > 0 ? { inferenceCacheIssues: cacheIssues } : {}),
        },
      },
      providerId,
      prefixHit: prefix.value !== null,
      kvCacheHit,
      prefixRef,
      kvCacheRef,
      kvCacheMissReason: kvCache.missReason,
      cacheIssues,
    };
  }

  private async resolvePrefixCache(
    providerId: string,
    request: InferenceRequest,
    ref: PrefixCacheRef | undefined
  ): Promise<CacheResolution<string>> {
    if (!ref || !this.prefixCache) return { value: null, issues: [] };
    try {
      return { value: await this.prefixCache.get(ref), issues: [] };
    } catch (error) {
      const issue = await this.handleCacheFailure(error, providerId, 'prefix_cache_read', request);
      return { value: null, missReason: 'error', issues: [issue] };
    }
  }

  private async resolveKvCache(
    providerId: string,
    request: InferenceRequest,
    ref: KvCacheRef | undefined
  ): Promise<CacheResolution<unknown>> {
    if (!ref) return { value: null, issues: [] };
    if (!this.kvCache) return { value: null, missReason: 'not_configured', issues: [] };
    if (isKvCacheExpired(ref)) {
      try {
        await this.kvCache.invalidate(ref, 'expired');
        return { value: null, missReason: 'expired', issues: [] };
      } catch (error) {
        const issue = await this.handleCacheFailure(error, providerId, 'cache_invalidate', request);
        return { value: null, missReason: 'error', issues: [issue] };
      }
    }
    try {
      const value = await this.kvCache.get(ref);
      return value === null
        ? { value: null, missReason: 'missing', issues: [] }
        : { value, issues: [] };
    } catch (error) {
      const issue = await this.handleCacheFailure(error, providerId, 'kv_cache_read', request);
      return { value: null, missReason: 'error', issues: [issue] };
    }
  }

  private async finalizeResponse(
    response: InferenceResponse,
    prepared: PreparedInferenceRequest
  ): Promise<InferenceResponse> {
    const write = await this.writeKvCache(response, prepared);
    const cacheIssues = [...prepared.cacheIssues, ...write.issues];
    return {
      ...response,
      cache: {
        ...response.cache,
        prefixHit: response.cache?.prefixHit ?? prepared.prefixHit,
        kvCacheHit: response.cache?.kvCacheHit ?? prepared.kvCacheHit,
        ...(prepared.prefixRef && !response.cache?.prefixRef
          ? { prefixRef: prepared.prefixRef }
          : {}),
        ...(prepared.kvCacheRef && !response.cache?.kvCacheRef
          ? { kvCacheRef: prepared.kvCacheRef }
          : {}),
        ...(prepared.kvCacheMissReason && !response.cache?.kvCacheMissReason
          ? { kvCacheMissReason: prepared.kvCacheMissReason }
          : {}),
        ...(write.ref || response.cache?.kvCacheWritten !== undefined
          ? {
              kvCacheWritten: response.cache?.kvCacheWritten ?? write.written,
              ...(write.ref && !response.cache?.kvCacheWriteRef
                ? { kvCacheWriteRef: write.ref }
                : {}),
            }
          : {}),
        ...(cacheIssues.length > 0
          ? {
              bypassed: true,
              issues: [...(response.cache?.issues ?? []), ...cacheIssues],
            }
          : {}),
      },
    };
  }

  private async writeKvCache(
    response: InferenceResponse,
    prepared: PreparedInferenceRequest
  ): Promise<{ written: boolean; ref?: KvCacheRef; issues: InferenceCacheIssue[] }> {
    const policy = prepared.request.cachePolicy?.writeKvCache;
    if (!policy) return { written: false, issues: [] };
    const ref = policy.ref;
    if (!this.kvCache) return { written: false, ref, issues: [] };
    if (isKvCacheExpired(ref)) {
      try {
        await this.kvCache.invalidate(ref, 'expired');
        return { written: false, ref, issues: [] };
      } catch (error) {
        const issue = await this.handleCacheFailure(
          error,
          prepared.providerId,
          'cache_invalidate',
          prepared.request
        );
        return { written: false, ref, issues: [issue] };
      }
    }
    if ((policy.mode ?? 'write_through') === 'write_if_missing') {
      if (prepared.kvCacheHit) return { written: false, ref, issues: [] };
      try {
        const existing = await this.kvCache.get(ref);
        if (existing !== null) return { written: false, ref, issues: [] };
      } catch (error) {
        const issue = await this.handleCacheFailure(
          error,
          prepared.providerId,
          'kv_cache_read',
          prepared.request
        );
        return { written: false, ref, issues: [issue] };
      }
    }
    const value = policy.value !== undefined ? policy.value : response.nextKvCacheValue;
    if (value === undefined) return { written: false, ref, issues: [] };
    try {
      await this.kvCache.put(ref, value);
      return { written: true, ref, issues: [] };
    } catch (error) {
      const issue = await this.handleCacheFailure(
        error,
        prepared.providerId,
        'kv_cache_write',
        prepared.request
      );
      return { written: false, ref, issues: [issue] };
    }
  }

  private async reportInferenceFailure(
    error: unknown,
    providerId: string,
    operation: 'infer' | 'stream',
    request: InferenceRequest
  ): Promise<void> {
    await this.notifyRecoveryFailure(
      classifyInferenceFailure(error, {
        id: `${request.runId}:${request.stepId}:inference:${operation}`,
        operation,
        request,
        providerId,
        providerRevision: this.options.providerRevision,
        policyRevision: this.options.policyRevision,
        specRevision: this.options.specRevision,
      })
    );
  }

  private async handleCacheFailure(
    error: unknown,
    providerId: string,
    operation: 'prefix_cache_read' | 'kv_cache_read' | 'kv_cache_write' | 'cache_invalidate',
    request: InferenceRequest
  ): Promise<InferenceCacheIssue> {
    if (this.cacheFailureMode === 'strict') throw error;
    const failure = classifyInferenceCacheFailure(error, {
      id: `${request.runId}:${request.stepId}:cache:${operation}`,
      operation,
      request,
      providerId,
      providerRevision: this.options.providerRevision,
      policyRevision: this.options.policyRevision,
      specRevision: this.options.specRevision,
    });
    await this.notifyRecoveryFailure(failure);
    return {
      operation:
        operation === 'prefix_cache_read'
          ? 'prefix_read'
          : operation === 'kv_cache_read'
            ? 'kv_read'
            : operation === 'kv_cache_write'
              ? 'kv_write'
              : 'invalidate',
      code: failure.code,
      message: failure.message,
      bypassed: true,
    };
  }

  private async notifyRecoveryFailure(failure: RecoveryFailure): Promise<void> {
    try {
      await this.options.onRecoveryFailure?.(failure);
    } catch {
      // Observability sinks must not mask the provider or cache outcome.
    }
  }
}

export class InMemoryPrefixCacheProvider implements PrefixCacheProvider {
  private readonly records = new Map<string, string>();

  async get(ref: PrefixCacheRef): Promise<string | null> {
    return this.records.get(this.key(ref)) ?? null;
  }

  async put(ref: PrefixCacheRef, content: string): Promise<void> {
    this.records.set(this.key(ref), content);
  }

  async invalidate(ref: PrefixCacheRef): Promise<void> {
    this.records.delete(this.key(ref));
  }

  private key(ref: PrefixCacheRef): string {
    return `${ref.id}:${ref.version}:${ref.contentHash}`;
  }
}

export class InMemoryKvCacheProvider implements KvCacheProvider {
  private readonly records = new Map<string, unknown>();

  async get(ref: KvCacheRef): Promise<unknown | null> {
    const value = this.records.get(this.key(ref));
    return value === undefined ? null : value;
  }

  async put(ref: KvCacheRef, value: unknown): Promise<void> {
    this.records.set(this.key(ref), value);
  }

  async invalidate(ref: KvCacheRef): Promise<void> {
    this.records.delete(this.key(ref));
  }

  private key(ref: KvCacheRef): string {
    return `${ref.scope}:${ref.provider}:${ref.modelAlias}:${ref.id}`;
  }
}
