import { hashStableJson } from './key';
import type {
  CacheBlock,
  CostProfile,
  DemandSignal,
  DependencyRef,
  NormalizedWorkEvent,
  WorkGraph,
  WorkGraphEdge,
  WorkGraphIndexLike,
  WorkGraphNode,
  WorkGraphUpdate,
  WorkNodeStatus,
} from './types';

export interface WorkGraphIndexOptions {
  maxActiveNodes?: number;
  now?: () => number;
}

export class WorkGraphIndex implements WorkGraphIndexLike {
  private readonly graphs = new Map<string, WorkGraph>();
  private readonly demandSignals: DemandSignal[] = [];
  private readonly maxActiveNodes: number;
  private readonly now: () => number;

  constructor(options: WorkGraphIndexOptions = {}) {
    this.maxActiveNodes = options.maxActiveNodes ?? 64;
    this.now = options.now ?? Date.now;
  }

  ingest(event: NormalizedWorkEvent, blocks: CacheBlock[]): WorkGraphUpdate {
    const source = event.sourceEvent;
    const graph = this.ensureGraph(source.runId, source.sessionId);
    const payload = recordFromUnknown(event.payload);
    const nodeId = createWorkNodeId(source.runId, source.id, source.type);
    const node: WorkGraphNode = {
      id: nodeId,
      nodeId,
      runId: source.runId,
      sessionId: source.sessionId,
      projectId: source.workspaceId,
      agentId: source.agentId,
      eventType: source.type,
      nodeType: event.nodeType,
      primaryTreeType: event.treeType,
      operation: operationFrom(source.type, payload),
      inputRefs: inputRefsFrom(payload),
      outputBlockIds: blocks.map((block) => block.id),
      stepIndex: graph.nodes.size,
      status: statusFrom(source.type),
      estimatedCost: costProfileFrom(payload),
      recomputeCost: numberValue(payload.recomputeCost),
      validationCost: numberValue(payload.validationCost),
      stepsToExecution:
        numberValue(payload.stepsToExecution ?? payload.stepsToUse ?? payload.stepsToCacheUse) ?? 0,
      futureDemand: numberValue(payload.futureDemand),
      branchProbability: numberValue(payload.branchProbability) ?? 1,
      criticality: numberValue(payload.criticality) ?? 1,
      environmentDeps: dependencyRefsFrom(payload),
      cacheDeps: cacheDepsFrom(payload),
      sourceEventId: source.id,
      sourceEventType: source.type,
      cacheKey: blocks[0]?.cacheKey,
      metadata: {
        sourceTimestamp: source.timestamp,
        blockCount: blocks.length,
      },
    };

    const edges = this.createEdges(graph, node, blocks);
    graph.nodes.set(nodeId, node);
    for (const edge of edges) {
      graph.edges.set(edge.id, edge);
    }
    graph.activeNodeIds = [...graph.activeNodeIds, nodeId].slice(-this.maxActiveNodes);
    graph.frontierNodeIds = [nodeId];

    const demandSignals = blocks.map((block) => this.createDemandSignal(node, block, graph));
    this.demandSignals.push(...demandSignals);
    return { graph, node, edges, demandSignals };
  }

  getGraph(runId: string): WorkGraph | null {
    return this.graphs.get(runId) ?? null;
  }

  listDemandSignals(runId?: string): DemandSignal[] {
    if (!runId) return [...this.demandSignals];
    return this.demandSignals.filter((signal) => {
      const graph = this.graphs.get(runId);
      return Boolean(graph?.nodes.has(signal.sourceNodeId));
    });
  }

  clear(): void {
    this.graphs.clear();
    this.demandSignals.length = 0;
  }

  private ensureGraph(runId: string, sessionId?: string): WorkGraph {
    const existing = this.graphs.get(runId);
    if (existing) return existing;
    const graph: WorkGraph = {
      graphId: `workgraph:${hashStableJson({ runId })}`,
      runId,
      sessionId,
      nodes: new Map(),
      edges: new Map(),
      activeNodeIds: [],
      frontierNodeIds: [],
    };
    this.graphs.set(runId, graph);
    return graph;
  }

  private createEdges(graph: WorkGraph, node: WorkGraphNode, blocks: CacheBlock[]): WorkGraphEdge[] {
    const edges: WorkGraphEdge[] = [];
    const previousNodeId = graph.frontierNodeIds[graph.frontierNodeIds.length - 1];
    if (previousNodeId) {
      edges.push(edge('control', previousNodeId, node.id, { stepIndex: node.stepIndex }));
    }
    for (const inputRef of node.inputRefs) {
      edges.push(edge('data', inputRef, node.id));
    }
    for (const cacheDep of node.cacheDeps ?? []) {
      edges.push(edge('cache', cacheDep, node.id));
    }
    for (const dependency of node.environmentDeps ?? []) {
      edges.push(edge('environment', `${dependency.depType}:${dependency.key}`, node.id, {
        dependency,
      }));
    }
    for (const block of blocks) {
      edges.push(edge('cache', node.id, block.id, { cacheKey: block.cacheKey }));
    }
    return edges;
  }

  private createDemandSignal(
    node: WorkGraphNode,
    block: CacheBlock,
    graph: WorkGraph
  ): DemandSignal {
    const downstreamFanout = Array.from(graph.edges.values()).filter(
      (edge) => edge.from === node.id
    ).length;
    const recomputeCost =
      node.recomputeCost ??
      block.utility.recomputeCost ??
      costToRecomputeScore(node.estimatedCost);
    const stalenessRisk = block.utility.staleRisk ?? staleRiskFrom(block);
    const validationCost = node.validationCost ?? block.utility.validationCost ?? 0;
    const branchProbability = node.branchProbability ?? 1;
    const criticality = node.criticality ?? 1;
    const stepsToUse = node.stepsToExecution ?? 0;
    const explicitFutureDemand = node.futureDemand ?? block.utility.futureDemand ?? 0;
    const proximity = 100 / (1 + stepsToUse);
    const demandScore = Math.max(
      0,
      proximity * branchProbability +
        explicitFutureDemand +
        recomputeCost +
        downstreamFanout * 5 +
        criticality * 10 -
        stalenessRisk -
        validationCost
    );
    return {
      signalId: `demand:${hashStableJson({
        nodeId: node.id,
        blockId: block.id,
        createdAt: this.now(),
      })}`,
      sourceNodeId: node.id,
      targetTreeType: block.treeType,
      targetKey: block.cacheKey,
      targetBlockId: block.id,
      stepsToUse,
      demandScore,
      reason: 'source_event_materialized',
      expiresAt: block.expiresAt,
      metadata: {
        downstreamFanout,
        recomputeCost,
        stalenessRisk,
        validationCost,
        futureDemand: explicitFutureDemand,
        branchProbability,
        criticality,
      },
    };
  }
}

export function createWorkNodeId(runId: string, sourceEventId: string, eventType: string): string {
  return `worknode:${hashStableJson({ runId, sourceEventId, eventType })}`;
}

function edge(
  edgeType: WorkGraphEdge['edgeType'],
  from: string,
  to: string,
  metadata?: Record<string, unknown>
): WorkGraphEdge {
  const edgeId = `workedge:${hashStableJson({ edgeType, from, to, metadata })}`;
  return { id: edgeId, edgeId, from, to, edgeType, metadata };
}

function operationFrom(eventType: string, payload: Record<string, unknown>): string {
  return (
    stringValue(payload.operation) ??
    stringValue(payload.toolId) ??
    stringValue(payload.capabilityId) ??
    stringValue(payload.action) ??
    stringValue(payload.target) ??
    providerOperation(payload) ??
    eventType
  );
}

function providerOperation(payload: Record<string, unknown>): string | undefined {
  const provider = stringValue(payload.provider);
  const model = stringValue(payload.model);
  if (!provider && !model) return undefined;
  return [provider, model].filter(Boolean).join(':');
}

function statusFrom(eventType: string): WorkNodeStatus {
  if (eventType.endsWith('.failed')) return 'failed';
  if (eventType.endsWith('.started') || eventType.endsWith('.requested')) return 'running';
  if (eventType.endsWith('.rejected')) return 'skipped';
  return 'done';
}

function costProfileFrom(payload: Record<string, unknown>): CostProfile | undefined {
  const cost = recordFromUnknown(payload.cost ?? payload.estimatedCost ?? payload.usage);
  const profile: CostProfile = {
    llmCost: numberValue(cost.llmCost),
    tokenCost: numberValue(cost.tokenCost ?? cost.totalTokens),
    toolCost: numberValue(cost.toolCost),
    latencyMs: numberValue(cost.latencyMs ?? payload.latencyMs),
    validationCost: numberValue(cost.validationCost ?? payload.validationCost),
  };
  return Object.values(profile).some((value) => value !== undefined) ? profile : undefined;
}

function inputRefsFrom(payload: Record<string, unknown>): string[] {
  return uniqueStrings([
    ...stringArray(payload.inputRefs),
    ...stringArray(payload.upstreamEventIds),
    ...stringArray(payload.dependsOn),
    stringValue(payload.inputRef),
  ]);
}

function cacheDepsFrom(payload: Record<string, unknown>): string[] {
  return uniqueStrings([
    ...stringArray(payload.cacheDeps),
    ...stringArray(payload.cacheKeys),
    stringValue(payload.cacheKey),
  ]);
}

function dependencyRefsFrom(payload: Record<string, unknown>): DependencyRef[] {
  const refs: DependencyRef[] = [];
  for (const item of arrayFromUnknown(payload.environmentDeps ?? payload.dependencies)) {
    const record = recordFromUnknown(item);
    const depType = dependencyType(record.depType ?? record.type);
    const key = stringValue(record.key ?? record.path ?? record.url ?? record.name);
    if (!depType || !key) continue;
    refs.push({
      depType,
      key,
      version: stringValue(record.version),
      hash: stringValue(record.hash ?? record.sourceHash ?? record.contentHash),
    });
  }

  const provenance = recordFromUnknown(payload.provenance);
  const provenanceKey = stringValue(provenance.path ?? provenance.resourceId ?? payload.resourceId);
  const provenanceHash = stringValue(
    provenance.hash ?? provenance.sourceHash ?? provenance.contentHash ?? payload.sourceHash
  );
  if (provenanceKey) {
    refs.push({ depType: 'file', key: provenanceKey, hash: provenanceHash });
  }

  const sourceHashes = recordFromUnknown(payload.sourceHashes ?? provenance.sourceHashes);
  for (const [key, value] of Object.entries(sourceHashes)) {
    const hash = stringValue(value);
    if (hash) refs.push({ depType: 'file', key, hash });
  }
  return dedupeDependencies(refs);
}

function costToRecomputeScore(cost?: CostProfile): number {
  if (!cost) return 0;
  return (
    (cost.llmCost ?? 0) * 100 +
    (cost.tokenCost ?? 0) / 100 +
    (cost.toolCost ?? 0) * 10 +
    (cost.latencyMs ?? 0) / 1000
  );
}

function staleRiskFrom(block: CacheBlock): number {
  if (block.validity.status === 'unknown') return 25;
  if (!block.validity.sourceHashes && !block.validity.provenanceHash) return 10;
  return 0;
}

function dependencyType(value: unknown): DependencyRef['depType'] | null {
  const text = stringValue(value);
  if (
    text === 'file' ||
    text === 'repo' ||
    text === 'db' ||
    text === 'web' ||
    text === 'env' ||
    text === 'tool' ||
    text === 'prompt' ||
    text === 'block'
  ) {
    return text;
  }
  return null;
}

function dedupeDependencies(refs: DependencyRef[]): DependencyRef[] {
  const seen = new Set<string>();
  return refs.filter((ref) => {
    const key = `${ref.depType}:${ref.key}:${ref.hash ?? ''}:${ref.version ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function uniqueStrings(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => stringValue(item)).filter((item): item is string => Boolean(item));
}

function arrayFromUnknown(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function recordFromUnknown(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
