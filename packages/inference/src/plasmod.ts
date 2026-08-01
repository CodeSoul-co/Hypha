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

export class InMemoryPlasmodHotLayer implements PlasmodHotLayer {
  private readonly prefixRegistry = new Map<string, PrefixSegment>();
  private readonly cacheMetadata = new Map<string, PlasmodCacheMetadata>();
  private readonly sessionState = new Map<string, PlasmodSessionState>();
  private readonly invalidationGraph = new Map<string, Set<string>>();
  private readonly registryByReuseKey = new Map<string, string>();
  private readonly segmentAliases = new Map<string, string>();

  constructor(private readonly now: () => Date = () => new Date()) {}

  async prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult> {
    const policy = normalizeReusePolicy(input.reusePolicy);
    const now = this.now().toISOString();
    const prefixRefs: PrefixCacheRef[] = [];
    const reusedSegmentIds: string[] = [];

    for (const segment of input.segmentation.segments) {
      if (!this.isReusable(segment, policy)) continue;
      if (prefixRefs.length >= policy.maxPrefixRefs) break;

      const segmentId = this.segmentId(segment);
      const reuseKey = this.reuseKey(segment, input, policy);
      const existingSegmentId = this.registryByReuseKey.get(reuseKey);
      const existing = existingSegmentId ? this.cacheMetadata.get(existingSegmentId) : undefined;
      const reused = Boolean(
        existing && (!policy.requireExactHash || existing.contentHash === segment.contentHash)
      );
      const refId = reused && existingSegmentId ? existingSegmentId : segmentId;

      this.segmentAliases.set(segment.id, refId);
      this.prefixRegistry.set(refId, segment);
      this.registryByReuseKey.set(reuseKey, refId);
      this.recordInvalidationEdges(refId, segment.dependencies ?? []);
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
        },
      });

      if (reused) reusedSegmentIds.push(refId);
      prefixRefs.push({
        id: refId,
        version: `${input.backendId}:${input.modelAlias}`,
        contentHash: segment.contentHash,
        tokenCount: segment.tokenCount,
        metadata: {
          kind: segment.kind,
          scope: segment.scope,
          reused,
          backendId: input.backendId,
          source: 'plasmod',
        },
      });
    }

    const kvCacheRef = input.kvCache ?? createKvCacheRef(input);
    const stateId = this.stateId(input);
    this.sessionState.set(stateId, {
      id: stateId,
      sessionId: input.sessionId,
      runId: input.runId,
      agentId: input.agentId,
      modelAlias: input.modelAlias,
      backendId: input.backendId,
      prefixRefs,
      kvCacheRef,
      updatedAt: now,
      metadata: input.metadata,
    });

    return {
      prefixRefs,
      kvCacheRef,
      physicalKvCache: input.resolvedKvCacheValue,
      reusedSegmentIds,
      invalidatedSegmentIds: [],
      metadata: {
        stateId,
        reusedSegmentCount: reusedSegmentIds.length,
        reusedTokens: prefixRefs
          .filter((ref) => reusedSegmentIds.includes(ref.id))
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
    return this.sessionState.get(stateId) ?? null;
  }

  getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null {
    return this.cacheMetadata.get(segmentId) ?? null;
  }

  snapshot(): {
    prefixRegistrySize: number;
    cacheMetadataSize: number;
    sessionStateSize: number;
    invalidationGraphSize: number;
  } {
    return {
      prefixRegistrySize: this.prefixRegistry.size,
      cacheMetadataSize: this.cacheMetadata.size,
      sessionStateSize: this.sessionState.size,
      invalidationGraphSize: this.invalidationGraph.size,
    };
  }

  private isReusable(segment: PrefixSegment, policy: Required<PlasmodReusePolicy>): boolean {
    return segment.cacheable && (segment.tokenCount ?? 0) >= policy.minTokenCount;
  }

  private segmentId(segment: PrefixSegment): string {
    return `prefix:${segment.scope}:${segment.kind}:${segment.contentHash.slice(0, 24)}`;
  }

  private stateId(input: PlasmodHotLayerPrepareInput): string {
    const sessionKey = input.sessionId ?? 'no-session';
    const agentKey = input.agentId ?? 'no-agent';
    return `${sessionKey}:${input.runId}:${agentKey}:${input.backendId}:${input.modelAlias}`;
  }

  private reuseKey(
    segment: PrefixSegment,
    input: PlasmodHotLayerPrepareInput,
    policy: Required<PlasmodReusePolicy>
  ): string {
    const parts = [
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

  private recordInvalidationEdges(segmentId: string, dependencies: string[]): void {
    for (const dependency of dependencies) {
      const normalizedDependencyId = this.normalizeDependencyId(dependency);
      const dependents = this.invalidationGraph.get(normalizedDependencyId) ?? new Set<string>();
      dependents.add(segmentId);
      this.invalidationGraph.set(normalizedDependencyId, dependents);
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

    this.prefixRegistry.delete(segmentId);
    this.cacheMetadata.delete(segmentId);
    for (const [key, value] of Array.from(this.registryByReuseKey.entries())) {
      if (value === segmentId) this.registryByReuseKey.delete(key);
    }
    for (const [key, value] of Array.from(this.segmentAliases.entries())) {
      if (value === segmentId) this.segmentAliases.delete(key);
    }

    const dependents = this.invalidationGraph.get(segmentId) ?? new Set<string>();
    this.invalidationGraph.delete(segmentId);
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
  return {
    id: `kv:${input.backendId}:${input.modelAlias}:${scope}:${input.sessionId ?? input.runId}`,
    provider: input.backendId,
    modelAlias: input.modelAlias,
    scope,
    metadata: {
      source: 'plasmod',
      runId: input.runId,
      sessionId: input.sessionId,
      agentId: input.agentId,
    },
  };
}
