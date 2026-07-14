import type {
  InferenceProvider,
  InferenceResponse,
  ReasoningRequest,
  ReasoningStrategyDescriptor,
} from '@hypha/inference';
import { ThinkingCache, type ThinkingCacheEntryKind } from './thinking-cache';
import { withThinkingCacheMetadata } from './reasoning-inference-cache';

export interface ThinkingCachedReasoningProviderOptions {
  provider: InferenceProvider;
  thinkingCache: ThinkingCache;
  resolveStrategy?: (id: string) => ReasoningStrategyDescriptor | undefined;
}

/** Caches the selected path for tree search and reusable subgraph for GoT. */
export class ThinkingCachedReasoningProvider implements InferenceProvider {
  readonly id: string;
  private readonly provider: InferenceProvider;
  private readonly thinkingCache: ThinkingCache;
  private readonly resolveStrategy?: ThinkingCachedReasoningProviderOptions['resolveStrategy'];

  constructor(options: ThinkingCachedReasoningProviderOptions) {
    this.provider = options.provider;
    this.thinkingCache = options.thinkingCache;
    this.resolveStrategy = options.resolveStrategy;
    this.id = `thinking-path-cached:${options.provider.id}`;
  }

  async infer(request: ReasoningRequest): Promise<InferenceResponse> {
    if (!this.thinkingCache.enabled || !canCacheReasoningPath(request)) {
      return this.provider.infer(request);
    }
    const kind = reasoningEntryKind(request);
    const result = await this.thinkingCache.getOrCompute({
      identity: reasoningPathIdentity(request, kind, this.resolveStrategy, this.provider.id),
      context: {
        runId: request.runId,
        stepId: request.stepId,
        sourceEventId: `${request.runId}:${request.stepId}:thinking-${kind}`,
        sourceEventType: 'inference.requested',
      },
      compute: () => this.provider.infer(request),
      provenance: {
        providerId: request.providerId ?? this.provider.id,
        backendId: request.backendId,
        modelAlias: request.modelAlias,
        strategyRef: request.reasoning?.strategyRef ?? request.reasoning?.method ?? 'direct',
      },
      metadata: {
        reasoningMethod: request.reasoning?.method ?? 'direct',
        strategyRef: request.reasoning?.strategyRef,
      },
      tags: [String(request.reasoning?.method ?? 'direct')],
    });
    const nodeCache = recordValue(result.value.metadata?.thinkingCache);
    return withThinkingCacheMetadata(result.value, {
      ...result.metadata,
      ...(nodeCache ? { selectedNode: nodeCache } : {}),
    });
  }

  async *stream(request: ReasoningRequest): AsyncIterable<InferenceResponse> {
    if (!this.provider.stream) {
      yield await this.infer(request);
      return;
    }
    // Streaming chunks are deliberately not persisted as a reasoning path.
    yield* this.provider.stream(request);
  }
}

function canCacheReasoningPath(request: ReasoningRequest): boolean {
  const options = request.reasoning;
  return typeof options?.evaluator !== 'function' && typeof options?.scorer !== 'function';
}

function reasoningEntryKind(request: ReasoningRequest): ThinkingCacheEntryKind {
  return request.reasoning?.method === 'got' ? 'subgraph' : 'path';
}

function reasoningPathIdentity(
  request: ReasoningRequest,
  kind: ThinkingCacheEntryKind,
  resolveStrategy?: (id: string) => ReasoningStrategyDescriptor | undefined,
  providerNamespace?: string
) {
  const strategyId = request.reasoning?.strategyRef ?? request.reasoning?.method ?? 'direct';
  const descriptor = resolveStrategy?.(strategyId);
  return {
    kind,
    scope: {
      userId: stringValue(request.metadata?.userId),
      sessionId: stringValue(request.metadata?.sessionId) ?? request.sessionId,
      agentId: request.agentId,
      domainPackId: stringValue(request.metadata?.domainPackId),
    },
    providerId: request.providerId ?? providerNamespace,
    backendId: request.backendId,
    modelAlias: request.modelAlias,
    strategy: {
      id: descriptor?.id ?? strategyId,
      definitionVersion: descriptor?.version,
      method: descriptor?.method ?? request.reasoning?.method ?? 'direct',
      executionVersion: request.reasoning?.strategyVersion ?? '1',
      references: descriptor?.references.map((reference) => ({
        repository: reference.repository,
        revision: reference.revision,
        url: reference.url,
      })),
      options: request.reasoning,
    },
    prompt: promptIdentity(request.metadata?.prompt),
    input: request.input,
    options: request.options,
    tools: request.tools,
    semantic: {
      cachePolicy: request.cachePolicy,
      prefix: request.prefix,
      resolvedPrefixContent: request.resolvedPrefixContent,
      kvCache: request.kvCache,
    },
  };
}

function promptIdentity(value: unknown): unknown {
  const prompt = recordValue(value);
  const blocks = Array.isArray(prompt?.blocks) ? prompt.blocks : [];
  return {
    refs: prompt?.refs,
    missing: prompt?.missing,
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
