import { FrameworkError } from '@hypha/core';
import { createDefaultInferenceBackendRegistry, InferenceBackendRegistry } from './backends';
import { InMemoryPlasmodHotLayer } from './plasmod';
import { DefaultPrefixSegmenter } from './prefix';
import { DefaultPromptCompiler, normalizePromptInputFromInferenceRequest } from './prompt';
import type {
  InferenceBackend,
  InferenceBackendRequest,
  InferenceBackendResponse,
  InferenceProvider,
  InferenceRequest,
  InferenceResponse,
  PlasmodHotLayer,
  PlasmodHotLayerPrepareResult,
  PlasmodReusePolicy,
  PrefixSegmentationResult,
  PrefixSegmenter,
  PromptCompiler,
} from './types';

export interface HyphaInferencePipelineOptions {
  id?: string;
  defaultBackendId?: string;
  compiler?: PromptCompiler;
  segmenter?: PrefixSegmenter;
  hotLayer?: PlasmodHotLayer;
  backends?: InferenceBackendRegistry;
  reusePolicy?: PlasmodReusePolicy;
}

interface PreparedPipelineRequest {
  backend: InferenceBackend;
  backendRequest: InferenceBackendRequest;
  segmentation: PrefixSegmentationResult;
  hotLayerResult: PlasmodHotLayerPrepareResult;
}

export class HyphaInferencePipeline implements InferenceProvider {
  readonly id: string;
  private readonly defaultBackendId: string;
  private readonly compiler: PromptCompiler;
  private readonly segmenter: PrefixSegmenter;
  private readonly hotLayer: PlasmodHotLayer;
  private readonly backends: InferenceBackendRegistry;
  private readonly reusePolicy?: PlasmodReusePolicy;

  constructor(options: HyphaInferencePipelineOptions = {}) {
    this.id = options.id ?? 'hypha-inference-pipeline';
    this.defaultBackendId = options.defaultBackendId ?? 'sglang';
    this.compiler = options.compiler ?? new DefaultPromptCompiler();
    this.segmenter = options.segmenter ?? new DefaultPrefixSegmenter();
    this.hotLayer = options.hotLayer ?? new InMemoryPlasmodHotLayer();
    this.backends =
      options.backends ??
      createDefaultInferenceBackendRegistry({
        defaultBackendId: this.defaultBackendId,
      });
    this.reusePolicy = options.reusePolicy;
  }

  async infer(request: InferenceRequest): Promise<InferenceResponse> {
    const prepared = await this.prepare(request);
    const response = await prepared.backend.infer(prepared.backendRequest);
    return this.normalizeResponse(response, prepared, request);
  }

  async *stream(request: InferenceRequest): AsyncIterable<InferenceResponse> {
    const prepared = await this.prepare(request);
    if (!prepared.backend.stream) {
      throw new FrameworkError({
        code: 'INFERENCE_BACKEND_STREAM_NOT_SUPPORTED',
        message: `Inference backend does not support streaming: ${prepared.backend.id}`,
        context: {
          backendId: prepared.backend.id,
          runId: request.runId,
          stepId: request.stepId,
        },
      });
    }
    for await (const response of prepared.backend.stream(prepared.backendRequest)) {
      yield this.normalizeResponse(response, prepared, request);
    }
  }

  private async prepare(request: InferenceRequest): Promise<PreparedPipelineRequest> {
    const backendId = request.backendId ?? request.providerId ?? this.defaultBackendId;
    const backend = this.backends.require(backendId);
    const compiledPrompt = await this.compiler.compile(
      normalizePromptInputFromInferenceRequest(request)
    );
    const segmentation = await this.segmenter.segment(compiledPrompt);
    const hotLayerResult = await this.hotLayer.prepare({
      runId: request.runId,
      stepId: request.stepId,
      sessionId: request.sessionId,
      agentId: request.agentId,
      modelAlias: request.modelAlias,
      backendId: backend.id,
      cacheScope: request.cacheScope ?? inferenceCacheScopeFromMetadata(request.metadata),
      segmentation,
      kvCache: request.cachePolicy?.kvCache ?? request.kvCache,
      resolvedKvCacheValue: request.resolvedKvCacheValue,
      reusePolicy: this.reusePolicy,
      metadata: request.metadata,
    });

    return {
      backend,
      segmentation,
      hotLayerResult,
      backendRequest: {
        runId: request.runId,
        stepId: request.stepId,
        sessionId: request.sessionId,
        agentId: request.agentId,
        modelAlias: request.modelAlias,
        compiledPrompt,
        segmentation,
        prefixRefs: hotLayerResult.prefixRefs,
        kvCache: hotLayerResult.kvCacheRef,
        resolvedKvCacheValue: request.resolvedKvCacheValue,
        physicalKvCache: hotLayerResult.physicalKvCache,
        options: request.options,
        tools: request.tools,
        metadata: {
          ...request.metadata,
          backendId: backend.id,
          backendKind: backend.kind,
          plasmod: hotLayerResult.metadata,
        },
      },
    };
  }

  private normalizeResponse(
    response: InferenceBackendResponse,
    prepared: PreparedPipelineRequest,
    request: InferenceRequest
  ): InferenceResponse {
    return {
      id: response.id,
      output: response.output,
      usage: response.usage,
      cache: {
        prefixHit: prepared.hotLayerResult.reusedSegmentIds.length > 0,
        kvCacheHit: request.resolvedKvCacheValue !== undefined,
        prefixRef: prepared.hotLayerResult.prefixRefs[0],
        kvCacheRef: prepared.hotLayerResult.kvCacheRef,
        reusedTokens: numberFromMetadata(prepared.hotLayerResult.metadata?.reusedTokens),
      },
      nextKvCacheValue: response.physicalKvCache,
      metadata: {
        ...response.metadata,
        backendId: prepared.backend.id,
        backendKind: prepared.backend.kind,
        plasmod: prepared.hotLayerResult.metadata,
        segmentation: prepared.segmentation.metadata,
      },
      raw: response.raw,
    };
  }
}

function inferenceCacheScopeFromMetadata(
  metadata: Record<string, unknown> | undefined
): InferenceRequest['cacheScope'] {
  const userId = stringMetadata(metadata?.userId);
  if (!userId) return undefined;
  return {
    userId,
    tenantId: stringMetadata(metadata?.tenantId),
    workspaceId: stringMetadata(metadata?.workspaceId),
  };
}

function stringMetadata(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberFromMetadata(value: unknown): number | undefined {
  return typeof value === 'number' ? value : undefined;
}
