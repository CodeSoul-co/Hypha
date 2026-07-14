import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import { createWorkCacheKey, hashStableJson } from './key';
import type { WorkCacheAuditEvent } from './types';
import { WorkCacheManager } from './manager';

export type ReasoningInferenceCacheTraceSink = (event: WorkCacheAuditEvent) => Promise<void> | void;

export interface WorkCachedInferenceProviderOptions {
  provider: InferenceProvider;
  manager: WorkCacheManager;
  trace?: ReasoningInferenceCacheTraceSink;
  now?: () => number;
}

interface CachedInferenceValue {
  response: InferenceResponse;
  identityHash: string;
}

/**
 * Reuses complete inference calls made by a reasoning strategy. The
 * ReasoningOrchestrator gives every direct call, thought node, and GoT merge
 * node a reasoningCacheIdentity, so this adapter can reuse an identical node
 * without coupling WorkCache to a specific reasoning algorithm.
 */
export class WorkCachedInferenceProvider implements InferenceProvider {
  readonly id: string;
  private readonly provider: InferenceProvider;
  private readonly manager: WorkCacheManager;
  private readonly trace?: ReasoningInferenceCacheTraceSink;
  private readonly now: () => number;
  private readonly inFlight = new Map<string, Promise<InferenceResponse>>();

  constructor(options: WorkCachedInferenceProviderOptions) {
    this.provider = options.provider;
    this.manager = options.manager;
    this.trace = options.trace;
    this.now = options.now ?? Date.now;
    this.id = `workcached:${options.provider.id}`;
  }

  async infer(request: InferenceRequest): Promise<InferenceResponse> {
    if (
      !this.manager.policy.enabled ||
      this.manager.policy.store === 'off' ||
      !this.manager.policy.trees.ComputationTree.enabled
    ) {
      return this.provider.infer(request);
    }
    const identity = reasoningInferenceIdentity(request, this.provider.id);
    if (!identity) return this.provider.infer(request);

    const cacheKey = createWorkCacheKey({
      treeType: 'ComputationTree',
      nodeType: 'computation',
      identity,
    });
    const identityHash = hashStableJson(identity);
    const sourceEventId = `${request.runId}:${request.stepId}:reasoning-inference`;
    const lookup = await this.manager.lookup<CachedInferenceValue>({
      treeType: 'ComputationTree',
      cacheKey,
    });
    await this.emit('workcache.lookup', request, sourceEventId, cacheKey, {
      blockId: lookup.hit ? lookup.block.id : blockId(identityHash),
    });

    if (lookup.hit) {
      await this.emit('workcache.hit', request, sourceEventId, cacheKey, {
        blockId: lookup.block.id,
        ageMs: lookup.ageMs,
      });
      return withWorkCacheMetadata(lookup.block.value.response, {
        hit: true,
        cacheKey,
        blockId: lookup.block.id,
        ageMs: lookup.ageMs,
      });
    }

    await this.emit('workcache.miss', request, sourceEventId, cacheKey, {
      blockId: blockId(identityHash),
      reason: lookup.reason,
    });
    const pending = this.inFlight.get(cacheKey);
    if (pending) {
      const response = await pending;
      return withWorkCacheMetadata(response, {
        hit: true,
        source: 'in_flight',
        cacheKey,
        blockId: blockId(identityHash),
      });
    }

    const call = this.provider.infer(request);
    this.inFlight.set(cacheKey, call);
    try {
      const response = await call;
      const createdAt = this.now();
      const ttlMs = this.manager.policy.trees.ComputationTree.ttlMs;
      const id = blockId(identityHash);
      try {
        await this.manager.forest.write<CachedInferenceValue>({
          id,
          treeType: 'ComputationTree',
          nodeType: 'computation',
          cacheKey,
          value: { response, identityHash },
          createdAt,
          updatedAt: createdAt,
          expiresAt: ttlMs ? createdAt + ttlMs : undefined,
          sourceEventId,
          sourceEventType: 'inference.requested',
          provenance: {
            providerId: request.providerId ?? this.provider.id,
            backendId: request.backendId,
            modelAlias: request.modelAlias,
            reasoningCacheIdentity: request.metadata?.reasoningCacheIdentity,
          },
          validity: {
            status: 'valid',
            provenanceHash: identityHash,
            proof: {
              modelAlias: request.modelAlias,
              reasoningStrategy: request.metadata?.reasoningStrategy,
            },
          },
          utility: {
            score: 1,
            recomputeCost: response.usage?.totalTokens,
            reuseCount: 0,
          },
          metadata: reasoningNodeMetadata(request),
          tags: ['reasoning', String(request.metadata?.reasoningMethod ?? 'direct')],
        });
        await this.emit('workcache.write', request, sourceEventId, cacheKey, {
          blockId: id,
          ttlMs,
        });
      } catch (error) {
        await this.emit('workcache.bypass', request, sourceEventId, cacheKey, {
          blockId: id,
          reason: error instanceof Error ? `write_failed:${error.message}` : 'write_failed',
        });
      }
      return withWorkCacheMetadata(response, {
        hit: false,
        cacheKey,
        blockId: id,
      });
    } finally {
      this.inFlight.delete(cacheKey);
    }
  }

  async *stream(request: InferenceRequest): AsyncIterable<InferenceResponse> {
    if (!this.provider.stream) {
      yield await this.infer(request);
      return;
    }
    yield* this.provider.stream(request);
  }

  private async emit(
    type: WorkCacheAuditEvent['type'],
    request: InferenceRequest,
    sourceEventId: string,
    cacheKey: string,
    payload: Pick<WorkCacheAuditEvent['payload'], 'blockId' | 'reason' | 'ageMs' | 'ttlMs'>
  ): Promise<void> {
    await this.trace?.({
      type,
      runId: request.runId,
      stepId: request.stepId,
      timestamp: new Date(this.now()).toISOString(),
      payload: {
        sourceEventId,
        sourceEventType: 'inference.requested',
        treeType: 'ComputationTree',
        nodeType: 'computation',
        cacheKey,
        ...payload,
      },
    });
  }
}

function reasoningInferenceIdentity(
  request: InferenceRequest,
  providerNamespace: string
): Record<string, unknown> | null {
  const reasoningCacheIdentity = request.metadata?.reasoningCacheIdentity;
  if (typeof reasoningCacheIdentity !== 'string' || !reasoningCacheIdentity) return null;
  return {
    scope: {
      userId: request.metadata?.userId,
      sessionId: request.metadata?.sessionId ?? request.sessionId,
      agentId: request.agentId,
      domainPackId: request.metadata?.domainPackId,
    },
    providerId: request.providerId ?? providerNamespace,
    provider: request.metadata?.provider,
    backendId: request.backendId,
    modelAlias: request.modelAlias,
    input: request.input,
    options: request.options,
    tools: request.tools,
    prefix: request.prefix,
    resolvedPrefixContent: request.resolvedPrefixContent,
    kvCache: request.kvCache,
    reasoningCacheIdentity: semanticReasoningIdentity(request, reasoningCacheIdentity),
    reasoningStrategy: request.metadata?.reasoningStrategy,
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

function blockId(identityHash: string): string {
  return `workcache:reasoning-inference:${identityHash}`;
}

function withWorkCacheMetadata(
  response: InferenceResponse,
  cache: Record<string, unknown>
): InferenceResponse {
  return {
    ...response,
    cache: {
      ...response.cache,
      servingCache: {
        ...response.cache?.servingCache,
        reasoningWorkCache: cache,
      },
    },
    metadata: {
      ...response.metadata,
      reasoningWorkCache: cache,
    },
  };
}
