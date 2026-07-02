import { FrameworkError } from '@hypha/core';
import { isKvCacheExpired } from './cache';
import type {
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
  prefixHit: boolean;
  kvCacheHit: boolean;
  prefixRef?: PrefixCacheRef;
  kvCacheRef?: KvCacheRef;
  kvCacheMissReason?: InferenceCacheMissReason;
}

export class InferenceManager {
  private readonly providers = new Map<string, InferenceProvider>();
  private readonly prefixCache?: PrefixCacheProvider;
  private readonly kvCache?: KvCacheProvider;

  constructor(options: InferenceManagerOptions = {}) {
    this.prefixCache = options.prefixCache;
    this.kvCache = options.kvCache;
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

    const prepared = await this.prepareRequest(request);

    const response = await provider.infer(prepared.request);

    return this.finalizeResponse(response, prepared);
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

    const prepared = await this.prepareRequest(request);
    for await (const response of provider.stream(prepared.request)) {
      yield await this.finalizeResponse(response, prepared);
    }
  }

  private async prepareRequest(request: InferenceRequest): Promise<PreparedInferenceRequest> {
    const prefixRef = request.cachePolicy?.prefix ?? request.prefix;
    const kvCacheRef = request.cachePolicy?.kvCache ?? request.kvCache;
    const [prefixContent, kvCacheValue] = await Promise.all([
      prefixRef && this.prefixCache ? this.prefixCache.get(prefixRef) : Promise.resolve(null),
      this.resolveKvCache(kvCacheRef),
    ]);
    const kvCacheHit = kvCacheValue.value !== null;
    return {
      request: {
        ...request,
        prefix: prefixRef,
        kvCache: kvCacheRef,
        resolvedPrefixContent: prefixContent ?? undefined,
        resolvedKvCacheValue: kvCacheValue.value ?? undefined,
        metadata: {
          ...request.metadata,
          prefixCacheHit: prefixContent !== null,
          kvCacheHit,
          ...(kvCacheValue.missReason ? { kvCacheMissReason: kvCacheValue.missReason } : {}),
        },
      },
      prefixHit: prefixContent !== null,
      kvCacheHit,
      prefixRef,
      kvCacheRef,
      kvCacheMissReason: kvCacheValue.missReason,
    };
  }

  private async resolveKvCache(ref: KvCacheRef | undefined): Promise<{
    value: unknown | null;
    missReason?: InferenceCacheMissReason;
  }> {
    if (!ref) return { value: null };
    if (isKvCacheExpired(ref)) {
      await this.kvCache?.invalidate(ref, 'expired');
      return { value: null, missReason: 'expired' };
    }
    if (!this.kvCache) return { value: null, missReason: 'not_configured' };
    const value = await this.kvCache.get(ref);
    return value === null
      ? { value: null, missReason: 'missing' }
      : { value };
  }

  private async finalizeResponse(
    response: InferenceResponse,
    prepared: PreparedInferenceRequest
  ): Promise<InferenceResponse> {
    const write = await this.writeKvCache(response, prepared);
    return {
      ...response,
      cache: {
        ...response.cache,
        prefixHit: response.cache?.prefixHit ?? prepared.prefixHit,
        kvCacheHit: response.cache?.kvCacheHit ?? prepared.kvCacheHit,
        ...(prepared.prefixRef && !response.cache?.prefixRef ? { prefixRef: prepared.prefixRef } : {}),
        ...(prepared.kvCacheRef && !response.cache?.kvCacheRef ? { kvCacheRef: prepared.kvCacheRef } : {}),
        ...(prepared.kvCacheMissReason && !response.cache?.kvCacheMissReason
          ? { kvCacheMissReason: prepared.kvCacheMissReason }
          : {}),
        ...(write.ref || response.cache?.kvCacheWritten !== undefined
          ? {
              kvCacheWritten: response.cache?.kvCacheWritten ?? write.written,
              ...(write.ref && !response.cache?.kvCacheWriteRef ? { kvCacheWriteRef: write.ref } : {}),
            }
          : {}),
      },
    };
  }

  private async writeKvCache(
    response: InferenceResponse,
    prepared: PreparedInferenceRequest
  ): Promise<{ written: boolean; ref?: KvCacheRef }> {
    const policy = prepared.request.cachePolicy?.writeKvCache;
    if (!policy) return { written: false };
    const ref = policy.ref;
    if (!this.kvCache) return { written: false, ref };
    if ((policy.mode ?? 'write_through') === 'write_if_missing' && prepared.kvCacheHit) {
      return { written: false, ref };
    }
    if (isKvCacheExpired(ref)) {
      await this.kvCache.invalidate(ref, 'expired');
      return { written: false, ref };
    }
    const value = policy.value !== undefined ? policy.value : response.nextKvCacheValue;
    if (value === undefined) return { written: false, ref };
    await this.kvCache.put(ref, value);
    return { written: true, ref };
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
