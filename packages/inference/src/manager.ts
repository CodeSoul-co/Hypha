import { FrameworkError } from '@hypha/core';
import type {
  InferenceManagerOptions,
  InferenceProvider,
  InferenceRequest,
  InferenceResponse,
  KvCacheProvider,
  KvCacheRef,
  PrefixCacheProvider,
  PrefixCacheRef,
} from './types';

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

    return {
      ...response,
      cache: {
        ...response.cache,
        prefixHit: response.cache?.prefixHit ?? prepared.prefixHit,
        kvCacheHit: response.cache?.kvCacheHit ?? prepared.kvCacheHit,
      },
    };
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
      yield {
        ...response,
        cache: {
          ...response.cache,
          prefixHit: response.cache?.prefixHit ?? prepared.prefixHit,
          kvCacheHit: response.cache?.kvCacheHit ?? prepared.kvCacheHit,
        },
      };
    }
  }

  private async prepareRequest(request: InferenceRequest): Promise<{
    request: InferenceRequest;
    prefixHit: boolean;
    kvCacheHit: boolean;
  }> {
    const [prefixContent, kvCacheValue] = await Promise.all([
      request.prefix && this.prefixCache ? this.prefixCache.get(request.prefix) : Promise.resolve(null),
      request.kvCache && this.kvCache ? this.kvCache.get(request.kvCache) : Promise.resolve(null),
    ]);
    return {
      request: {
        ...request,
        resolvedPrefixContent: prefixContent ?? undefined,
        resolvedKvCacheValue: kvCacheValue ?? undefined,
        metadata: {
          ...request.metadata,
          prefixCacheHit: prefixContent !== null,
          kvCacheHit: kvCacheValue !== null,
        },
      },
      prefixHit: prefixContent !== null,
      kvCacheHit: kvCacheValue !== null,
    };
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
