import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import { ThinkingCache, type ThinkingCacheTraceSink } from './thinking-cache';
import type { WorkCacheManager } from './manager';

export type ReasoningInferenceCacheTraceSink = ThinkingCacheTraceSink;

export interface WorkCachedInferenceProviderOptions {
  provider: InferenceProvider;
  thinkingCache?: ThinkingCache;
  manager?: WorkCacheManager;
  trace?: ReasoningInferenceCacheTraceSink;
  now?: () => number;
}

/**
 * Backward-compatible provider adapter for per-node reuse. New integrations
 * should share one ThinkingCache between this adapter and the path adapter.
 */
export class WorkCachedInferenceProvider implements InferenceProvider {
  readonly id: string;
  private readonly provider: InferenceProvider;
  private readonly thinkingCache: ThinkingCache;

  constructor(options: WorkCachedInferenceProviderOptions) {
    this.provider = options.provider;
    if (!options.thinkingCache && !options.manager) {
      throw new Error('WorkCachedInferenceProvider requires thinkingCache or manager.');
    }
    this.thinkingCache =
      options.thinkingCache ??
      new ThinkingCache({ manager: options.manager!, trace: options.trace, now: options.now });
    this.id = `thinking-node-cached:${options.provider.id}`;
  }

  async infer(request: InferenceRequest): Promise<InferenceResponse> {
    const identity = reasoningInferenceIdentity(request, this.provider.id);
    if (!identity || !this.thinkingCache.enabled) return this.provider.infer(request);

    const result = await this.thinkingCache.getOrCompute({
      identity,
      context: thinkingContext(request, 'node'),
      compute: () => this.provider.infer(request),
      projectForCache: projectInferenceResponse,
      hydrateCached: (response) => hydrateInferenceResponse(response, request),
      provenance: {
        providerId: request.providerId ?? this.provider.id,
        backendId: request.backendId,
        modelAlias: request.modelAlias,
        reasoningCacheIdentity: request.metadata?.reasoningCacheIdentity,
      },
      metadata: reasoningNodeMetadata(request),
      tags: ['reasoning', String(request.metadata?.reasoningMethod ?? 'direct')],
    });
    return withThinkingCacheMetadata(result.value, { ...result.metadata });
  }

  async *stream(request: InferenceRequest): AsyncIterable<InferenceResponse> {
    if (!this.provider.stream) {
      yield await this.infer(request);
      return;
    }
    yield* this.provider.stream(request);
  }
}

export function projectInferenceResponse(response: InferenceResponse): InferenceResponse {
  return {
    id: 'thinking-cache-projection',
    output: response.output,
    usage: response.usage,
  };
}

export function hydrateInferenceResponse(
  response: InferenceResponse,
  request: InferenceRequest
): InferenceResponse {
  return {
    id: `${request.runId}:${request.stepId}:thinking-cache`,
    output: response.output,
    usage: response.usage,
  };
}

function reasoningInferenceIdentity(request: InferenceRequest, providerNamespace: string) {
  const reasoningCacheIdentity = request.metadata?.reasoningCacheIdentity;
  if (typeof reasoningCacheIdentity !== 'string' || !reasoningCacheIdentity) return null;
  return {
    kind: 'node' as const,
    scope: {
      userId: stringValue(request.metadata?.userId),
      sessionId: stringValue(request.metadata?.sessionId) ?? request.sessionId,
      agentId: request.agentId,
      domainPackId: stringValue(request.metadata?.domainPackId),
    },
    providerId: request.providerId ?? providerNamespace,
    backendId: request.backendId,
    modelAlias: request.modelAlias,
    strategy: recordValue(request.metadata?.reasoningStrategy) ?? {},
    prompt: promptIdentity(request.metadata?.prompt),
    input: request.input,
    options: request.options,
    tools: request.tools,
    semantic: semanticReasoningIdentity(request, reasoningCacheIdentity),
  };
}

function semanticReasoningIdentity(request: InferenceRequest, fallbackIdentity: string): unknown {
  if (typeof request.metadata?.thoughtNodeId !== 'string') return fallbackIdentity;
  return {
    reasoningMethod: request.metadata.reasoningMethod,
    reasoningInstruction: request.metadata.reasoningInstruction,
    depth: request.metadata.depth,
    branchIndex: request.metadata.branchIndex,
    maxDepth: request.metadata.maxDepth,
    operation: request.metadata.operation,
    parentOutputSummary: request.metadata.parentOutputSummary,
    candidateSummaries: request.metadata.candidateSummaries,
  };
}

function reasoningNodeMetadata(request: InferenceRequest): Record<string, unknown> {
  return {
    reasoningMethod: request.metadata?.reasoningMethod,
    reasoningStrategy: request.metadata?.reasoningStrategy,
    thoughtGraphId: request.metadata?.thoughtGraphId,
    thoughtNodeId: request.metadata?.thoughtNodeId,
    parentThoughtIds: request.metadata?.parentThoughtIds,
    operation: request.metadata?.operation,
  };
}

function thinkingContext(request: InferenceRequest, suffix: string) {
  return {
    runId: request.runId,
    stepId: request.stepId,
    sourceEventId: `${request.runId}:${request.stepId}:thinking-${suffix}`,
    sourceEventType: 'inference.requested' as const,
  };
}

export function withThinkingCacheMetadata(
  response: InferenceResponse,
  cache: Record<string, unknown>
): InferenceResponse {
  return {
    ...response,
    cache: {
      ...response.cache,
      servingCache: {
        ...response.cache?.servingCache,
        thinkingCache: cache,
      },
    },
    metadata: {
      ...response.metadata,
      thinkingCache: cache,
    },
  };
}

function promptIdentity(value: unknown): unknown {
  const prompt = recordValue(value);
  const blocks = Array.isArray(prompt?.blocks) ? prompt.blocks : [];
  return {
    refs: prompt?.refs,
    blocks: blocks.map((block) => {
      const record = recordValue(block);
      return {
        id: record?.id,
        version: record?.version,
        hash: record?.hash ?? record?.contentHash,
        templateVersion: record?.templateVersion,
        stable: record?.stable,
        cacheable: record?.cacheable,
      };
    }),
  };
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}
