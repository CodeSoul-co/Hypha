import { createHash } from 'crypto';
import type {
  KvCacheRef,
  PlasmodCacheMetadata,
  PlasmodHotLayer,
  PlasmodHotLayerPrepareInput,
  PlasmodHotLayerPrepareResult,
  PlasmodReusePolicy,
  PlasmodSessionState,
  PrefixCacheRef,
  PrefixSegment,
} from './types';

const DEFAULT_REUSE_POLICY: Required<PlasmodReusePolicy> = {
  allowCrossSession: false,
  allowCrossAgent: false,
  minTokenCount: 1,
  requireExactHash: true,
  maxPrefixRefs: 32,
};

export interface InMemoryPlasmodHotLayerOptions {
  now?: () => Date;
  maxSegments?: number;
  maxSessionStates?: number;
  maxAliases?: number;
  maxReuseKeys?: number;
  maxDependenciesPerSegment?: number;
}

export class InMemoryPlasmodHotLayer implements PlasmodHotLayer {
  private readonly prefixRegistry = new Map<string, PrefixSegment>();
  private readonly cacheMetadata = new Map<string, PlasmodCacheMetadata>();
  private readonly sessionState = new Map<string, PlasmodSessionState>();
  private readonly invalidationGraph = new Map<string, Set<string>>();
  private readonly registryByReuseKey = new Map<string, string>();
  private readonly segmentAliases = new Map<string, string>();
  private readonly now: () => Date;
  private readonly maxSegments: number;
  private readonly maxSessionStates: number;
  private readonly maxAliases: number;
  private readonly maxReuseKeys: number;
  private readonly maxDependenciesPerSegment: number;

  constructor(nowOrOptions: (() => Date) | InMemoryPlasmodHotLayerOptions = {}) {
    const options = typeof nowOrOptions === 'function' ? { now: nowOrOptions } : nowOrOptions;
    this.now = options.now ?? (() => new Date());
    this.maxSegments = Math.max(1, options.maxSegments ?? 10_000);
    this.maxSessionStates = Math.max(1, options.maxSessionStates ?? 10_000);
    this.maxAliases = Math.max(1, options.maxAliases ?? this.maxSegments * 4);
    this.maxReuseKeys = Math.max(1, options.maxReuseKeys ?? this.maxSegments * 4);
    this.maxDependenciesPerSegment = Math.max(0, options.maxDependenciesPerSegment ?? 64);
  }

  async prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult> {
    const policy = normalizeReusePolicy(input.reusePolicy);
    const now = this.now().toISOString();
    const prefixRefs: PrefixCacheRef[] = [];
    const reusedSegmentIds: string[] = [];
    const invalidatedSegmentIds = new Set<string>();

    for (const segment of input.segmentation.segments) {
      if (!this.isReusable(segment, policy)) continue;
      if (prefixRefs.length >= policy.maxPrefixRefs) break;

      const reuseKey = this.reuseKey(segment, input, policy);
      const segmentId = this.segmentId(segment, reuseKey);
      const existingSegmentId = this.registryByReuseKey.get(reuseKey);
      const existing = existingSegmentId ? this.cacheMetadata.get(existingSegmentId) : undefined;
      const reused = Boolean(
        existing && (!policy.requireExactHash || existing.contentHash === segment.contentHash)
      );
      const refId = reused && existingSegmentId ? existingSegmentId : segmentId;

      this.touchBounded(this.segmentAliases, segment.id, refId, this.maxAliases);
      this.prefixRegistry.delete(refId);
      this.prefixRegistry.set(refId, segment);
      this.touchBounded(this.registryByReuseKey, reuseKey, refId, this.maxReuseKeys);
      this.removeIncomingEdges(refId);
      this.recordInvalidationEdges(refId, segment.dependencies ?? []);
      this.cacheMetadata.delete(refId);
      this.cacheMetadata.set(refId, {
        segmentId: refId,
        contentHash: segment.contentHash,
        backendId: input.backendId,
        modelAlias: input.modelAlias,
        scope: segment.scope,
        tokenCount: segment.tokenCount,
        reused,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
        metadata: {
          ...segment.metadata,
          originalSegmentId: segment.id,
          reuseKey,
          sessionId: input.sessionId,
          runId: input.runId,
          agentId: input.agentId,
          cacheScopeHash: this.scopeId(input),
        },
      });

      for (const evicted of this.enforceSegmentLimit()) invalidatedSegmentIds.add(evicted);

      if (reused) reusedSegmentIds.push(refId);
      prefixRefs.push({
        id: refId,
        version: `${input.backendId}:${input.modelAlias}`,
        contentHash: segment.contentHash,
        tokenCount: segment.tokenCount,
        cacheScope: input.cacheScope,
        metadata: {
          kind: segment.kind,
          scope: segment.scope,
          reused,
          backendId: input.backendId,
          source: 'plasmod',
        },
      });
    }

    const activePrefixRefs = prefixRefs.filter((ref) => !invalidatedSegmentIds.has(ref.id));
    const activeReusedSegmentIds = reusedSegmentIds.filter(
      (segmentId) => !invalidatedSegmentIds.has(segmentId)
    );
    const kvCacheRef = input.kvCache ?? createKvCacheRef(input);
    const stateId = this.stateId(input);
    this.sessionState.delete(stateId);
    this.sessionState.set(stateId, {
      id: stateId,
      sessionId: input.sessionId,
      runId: input.runId,
      agentId: input.agentId,
      modelAlias: input.modelAlias,
      backendId: input.backendId,
      prefixRefs: activePrefixRefs,
      kvCacheRef,
      updatedAt: now,
      metadata: input.metadata,
    });
    this.enforceSessionStateLimit();

    return {
      prefixRefs: activePrefixRefs,
      kvCacheRef,
      physicalKvCache: input.resolvedKvCacheValue,
      reusedSegmentIds: activeReusedSegmentIds,
      invalidatedSegmentIds: Array.from(invalidatedSegmentIds),
      metadata: {
        stateId,
        reusedSegmentCount: activeReusedSegmentIds.length,
        reusedTokens: activePrefixRefs
          .filter((ref) => activeReusedSegmentIds.includes(ref.id))
          .reduce((sum, ref) => sum + (ref.tokenCount ?? 0), 0),
        prefixRegistrySize: this.prefixRegistry.size,
        cacheMetadataSize: this.cacheMetadata.size,
      },
    };
  }

  async invalidateSegment(segmentId: string, _reason: string): Promise<void> {
    const visited = new Set<string>();
    this.invalidateRecursive(this.normalizeDependencyId(segmentId), visited);
  }

  getSessionState(stateId: string): PlasmodSessionState | null {
    const state = this.sessionState.get(stateId);
    if (!state) return null;
    this.sessionState.delete(stateId);
    this.sessionState.set(stateId, state);
    return state;
  }

  getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null {
    const metadata = this.cacheMetadata.get(segmentId);
    if (!metadata) return null;
    const segment = this.prefixRegistry.get(segmentId);
    if (segment) {
      this.prefixRegistry.delete(segmentId);
      this.prefixRegistry.set(segmentId, segment);
    }
    this.cacheMetadata.delete(segmentId);
    this.cacheMetadata.set(segmentId, metadata);
    return metadata;
  }

  snapshot(): {
    prefixRegistrySize: number;
    cacheMetadataSize: number;
    sessionStateSize: number;
    invalidationGraphSize: number;
    segmentAliasSize: number;
    reuseKeySize: number;
  } {
    return {
      prefixRegistrySize: this.prefixRegistry.size,
      cacheMetadataSize: this.cacheMetadata.size,
      sessionStateSize: this.sessionState.size,
      invalidationGraphSize: this.invalidationGraph.size,
      segmentAliasSize: this.segmentAliases.size,
      reuseKeySize: this.registryByReuseKey.size,
    };
  }

  private isReusable(segment: PrefixSegment, policy: Required<PlasmodReusePolicy>): boolean {
    return (
      segment.cacheable &&
      (segment.tokenCount ?? 0) >= policy.minTokenCount &&
      (segment.dependencies?.length ?? 0) <= this.maxDependenciesPerSegment
    );
  }

  private segmentId(segment: PrefixSegment, reuseKey: string): string {
    return `prefix:${segment.scope}:${segment.kind}:${segment.contentHash.slice(0, 24)}:${shortHash(reuseKey)}`;
  }

  private stateId(input: PlasmodHotLayerPrepareInput): string {
    const sessionKey = input.sessionId ?? 'no-session';
    const agentKey = input.agentId ?? 'no-agent';
    return `${this.scopeId(input)}:${sessionKey}:${input.runId}:${agentKey}:${input.backendId}:${input.modelAlias}`;
  }

  private reuseKey(
    segment: PrefixSegment,
    input: PlasmodHotLayerPrepareInput,
    policy: Required<PlasmodReusePolicy>
  ): string {
    const parts = [
      this.scopeId(input),
      input.backendId,
      input.modelAlias,
      segment.scope,
      segment.kind,
      policy.requireExactHash ? segment.contentHash : segment.contentHash.slice(0, 16),
    ];
    if (!policy.allowCrossSession) parts.push(input.sessionId ?? input.runId);
    if (!policy.allowCrossAgent) parts.push(input.agentId ?? 'no-agent');
    if (segment.scope === 'run') parts.push(input.runId);
    return parts.join(':');
  }

  private scopeId(input: PlasmodHotLayerPrepareInput): string {
    return plasmodScopeId(input);
  }

  private recordInvalidationEdges(segmentId: string, dependencies: string[]): void {
    for (const dependency of dependencies) {
      const normalizedDependencyId = this.normalizeDependencyId(dependency);
      const dependents = this.invalidationGraph.get(normalizedDependencyId) ?? new Set<string>();
      dependents.add(segmentId);
      this.invalidationGraph.set(normalizedDependencyId, dependents);
    }
  }

  private removeIncomingEdges(segmentId: string): void {
    for (const [dependencyId, dependents] of this.invalidationGraph) {
      dependents.delete(segmentId);
      if (dependents.size === 0) this.invalidationGraph.delete(dependencyId);
    }
  }

  private enforceSegmentLimit(): Set<string> {
    const invalidated = new Set<string>();
    while (this.prefixRegistry.size > this.maxSegments) {
      const oldestSegmentId = this.prefixRegistry.keys().next().value as string | undefined;
      if (!oldestSegmentId) break;
      this.invalidateRecursive(oldestSegmentId, invalidated);
    }
    return invalidated;
  }

  private enforceSessionStateLimit(): void {
    while (this.sessionState.size > this.maxSessionStates) {
      const oldestStateId = this.sessionState.keys().next().value as string | undefined;
      if (!oldestStateId) break;
      this.sessionState.delete(oldestStateId);
    }
  }

  private touchBounded<TKey, TValue>(
    target: Map<TKey, TValue>,
    key: TKey,
    value: TValue,
    limit: number
  ): void {
    target.delete(key);
    target.set(key, value);
    while (target.size > limit) {
      const oldestKey = target.keys().next().value as TKey | undefined;
      if (oldestKey === undefined) break;
      target.delete(oldestKey);
    }
  }

  private normalizeDependencyId(segmentId: string): string {
    const alias = this.segmentAliases.get(segmentId);
    if (alias) return alias;
    const metadata = this.cacheMetadata.get(segmentId);
    return metadata?.segmentId ?? segmentId;
  }

  private invalidateRecursive(segmentId: string, visited: Set<string>): void {
    if (visited.has(segmentId)) return;
    visited.add(segmentId);

    const dependents = new Set(this.invalidationGraph.get(segmentId) ?? []);
    this.invalidationGraph.delete(segmentId);
    this.removeIncomingEdges(segmentId);
    this.prefixRegistry.delete(segmentId);
    this.cacheMetadata.delete(segmentId);
    for (const [key, value] of Array.from(this.registryByReuseKey.entries())) {
      if (value === segmentId) this.registryByReuseKey.delete(key);
    }
    for (const [key, value] of Array.from(this.segmentAliases.entries())) {
      if (value === segmentId) this.segmentAliases.delete(key);
    }
    for (const [stateId, state] of this.sessionState) {
      const prefixRefs = state.prefixRefs.filter((ref) => ref.id !== segmentId);
      if (prefixRefs.length !== state.prefixRefs.length) {
        this.sessionState.set(stateId, { ...state, prefixRefs });
      }
    }
    for (const dependent of dependents) {
      this.invalidateRecursive(dependent, visited);
    }
  }
}

function normalizeReusePolicy(policy: PlasmodReusePolicy = {}): Required<PlasmodReusePolicy> {
  return {
    ...DEFAULT_REUSE_POLICY,
    ...policy,
  };
}

function createKvCacheRef(input: PlasmodHotLayerPrepareInput): KvCacheRef {
  const scope = input.sessionId ? 'session' : 'run';
  const cacheScopeHash = plasmodScopeId(input);
  return {
    id: `kv:${input.backendId}:${input.modelAlias}:${cacheScopeHash}:${scope}:${input.sessionId ?? input.runId}`,
    provider: input.backendId,
    modelAlias: input.modelAlias,
    scope,
    cacheScope: input.cacheScope,
    metadata: {
      source: 'plasmod',
      runId: input.runId,
      sessionId: input.sessionId,
      agentId: input.agentId,
      cacheScopeHash,
    },
  };
}

function plasmodScopeId(input: PlasmodHotLayerPrepareInput): string {
  const scope = input.cacheScope;
  if (!scope?.userId) return `run-${shortHash(input.runId)}`;
  return `user-${shortHash(
    [scope.tenantId ?? '', scope.userId, scope.workspaceId ?? ''].join('\u0000')
  )}`;
}

function shortHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}
