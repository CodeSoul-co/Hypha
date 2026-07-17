import type { FrameworkEvent, FrameworkEventType, RecoveryKnowledge } from '@hypha/core';

export type WorkNodeType =
  | 'plan'
  | 'computation'
  | 'tool'
  | 'observation'
  | 'verification'
  | 'memory'
  | 'recovery'
  | 'prompt_prefix';

export type CacheTreeType =
  | 'PlanTree'
  | 'ComputationTree'
  | 'ToolTree'
  | 'ObservationTree'
  | 'VerificationTree'
  | 'MemoryTree'
  | 'RecoveryTree'
  | 'PromptPrefixTree';

export type WorkCacheStoreKind = 'off' | 'memory' | 'sqlite';

export type WorkCacheUnknownEventPolicy = 'ignore' | 'reject';

export type WorkCacheAuditEventType =
  | 'workcache.lookup'
  | 'workcache.hit'
  | 'workcache.miss'
  | 'workcache.write'
  | 'workcache.invalidate'
  | 'workcache.bypass'
  | 'workcache.prefix.materialized';

export interface WorkCacheAuditPayload {
  sourceEventId: string;
  sourceEventType: FrameworkEventType;
  treeType: CacheTreeType;
  nodeType?: WorkNodeType;
  blockId: string;
  cacheKey: string;
  reason?: string;
  ageMs?: number;
  ttlMs?: number;
  prefixHash?: string;
}

export interface WorkCacheAuditEvent {
  type: WorkCacheAuditEventType;
  runId: string;
  stepId?: string;
  timestamp?: string;
  payload: WorkCacheAuditPayload;
}

export interface RuntimeTypeDefinition {
  id: string;
  sourceEventTypes: FrameworkEventType[];
  nodeType: WorkNodeType;
  treeType: CacheTreeType;
  materialize(event: NormalizedWorkEvent): CacheBlock[];
}

export interface NormalizedWorkEvent<TPayload = unknown> {
  sourceEvent: FrameworkEvent<TPayload>;
  sourceEventId: string;
  sourceEventType: FrameworkEventType;
  nodeType: WorkNodeType;
  treeType: CacheTreeType;
  payload: TPayload;
  metadata?: Record<string, unknown>;
}

export interface WorkGraphNode {
  nodeId: string;
  id: string;
  runId: string;
  sessionId?: string;
  projectId?: string;
  agentId?: string;
  eventType: FrameworkEventType;
  nodeType: WorkNodeType;
  primaryTreeType: CacheTreeType;
  operation: string;
  inputRefs: string[];
  outputBlockIds: string[];
  stepIndex: number;
  status: WorkNodeStatus;
  estimatedCost?: CostProfile;
  recomputeCost?: number;
  validationCost?: number;
  stepsToExecution?: number;
  futureDemand?: number;
  branchProbability?: number;
  criticality?: number;
  environmentDeps?: DependencyRef[];
  cacheDeps?: string[];
  sourceEventId: string;
  sourceEventType: FrameworkEventType;
  cacheKey?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkGraphEdge {
  edgeId: string;
  id: string;
  from: string;
  to: string;
  edgeType: WorkEdgeType;
  weight?: number;
  condition?: string;
  metadata?: Record<string, unknown>;
}

export type WorkNodeStatus = 'pending' | 'running' | 'done' | 'failed' | 'skipped';

export type WorkEdgeType = 'control' | 'data' | 'cache' | 'environment' | 'agent';

export interface CostProfile {
  llmCost?: number;
  tokenCost?: number;
  toolCost?: number;
  latencyMs?: number;
  validationCost?: number;
}

export interface DependencyRef {
  depType: 'file' | 'repo' | 'db' | 'web' | 'env' | 'tool' | 'prompt' | 'block';
  key: string;
  version?: string;
  hash?: string;
}

export interface WorkGraph {
  graphId: string;
  runId: string;
  sessionId?: string;
  nodes: Map<string, WorkGraphNode>;
  edges: Map<string, WorkGraphEdge>;
  activeNodeIds: string[];
  frontierNodeIds: string[];
}

export interface DemandSignal {
  signalId: string;
  sourceNodeId: string;
  targetTreeType: CacheTreeType;
  targetKey?: string;
  targetBlockId?: string;
  stepsToUse: number;
  demandScore: number;
  reason: string;
  expiresAt?: number;
  metadata?: Record<string, unknown>;
}

export interface WorkGraphUpdate {
  graph: WorkGraph;
  node: WorkGraphNode;
  edges: WorkGraphEdge[];
  demandSignals: DemandSignal[];
}

export interface CacheBlockValidity {
  status: 'valid' | 'invalid' | 'unknown';
  proof?: Record<string, unknown>;
  sourceHashes?: Record<string, string>;
  provenanceHash?: string;
  expiresAt?: number;
}

export interface CacheBlockUtility {
  score: number;
  reuseCount?: number;
  recomputeCost?: number;
  staleRisk?: number;
  futureDemand?: number;
  downstreamFanout?: number;
  validationCost?: number;
}

export interface CacheBlock<T = unknown> {
  id: string;
  treeType: CacheTreeType;
  nodeType: WorkNodeType;
  cacheKey: string;
  value: T;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  sourceEventId: string;
  sourceEventType: FrameworkEventType;
  provenance?: Record<string, unknown>;
  validity: CacheBlockValidity;
  utility: CacheBlockUtility;
  metadata?: Record<string, unknown>;
  tags?: string[];
}

export interface CacheTree<T = unknown> {
  readonly type: CacheTreeType;
  lookup(cacheKey: string): Promise<CacheBlock<T> | null>;
  write(block: CacheBlock<T>): Promise<void>;
  invalidate(blockId: string): Promise<void>;
  list(): Promise<Array<CacheBlock<T>>>;
}

export interface WorkCacheStore {
  get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null>;
  getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null>;
  set<T = unknown>(block: CacheBlock<T>): Promise<void>;
  delete(blockId: string): Promise<void>;
  list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>>;
  clear?(): Promise<void>;
  touch?(blockId: string, timestamp: number): Promise<void>;
  updateUtility?(
    blockId: string,
    utility: Partial<CacheBlockUtility>,
    timestamp: number
  ): Promise<void>;
}

export interface WorkCacheTreePolicy {
  enabled: boolean;
  ttlMs?: number;
  maxEntries?: number;
}

export interface WorkCachePolicy {
  enabled: boolean;
  store: WorkCacheStoreKind;
  promptBudgetTokens: number;
  unknownEventPolicy: WorkCacheUnknownEventPolicy;
  allowExtensionEvents: boolean;
  trees: Record<CacheTreeType, WorkCacheTreePolicy>;
}

export interface WorkCacheManagerOptions {
  store: WorkCacheStore;
  policy?: PartialWorkCachePolicy;
  registry?: RuntimeTypeRegistryLike;
  workGraph?: WorkGraphIndexLike;
  hotIndex?: boolean;
  now?: () => number;
}

export type PartialWorkCachePolicy = Partial<
  Omit<WorkCachePolicy, 'trees'> & {
    trees: Partial<Record<CacheTreeType, Partial<WorkCacheTreePolicy>>>;
  }
>;

export interface RuntimeTypeRegistryLike {
  getDefinition(sourceEventType: FrameworkEventType): RuntimeTypeDefinition | null;
  normalize<TPayload = unknown>(
    event: FrameworkEvent<TPayload>,
    options?: { unknownEventPolicy?: WorkCacheUnknownEventPolicy }
  ): NormalizedWorkEvent<TPayload> | null;
}

export interface WorkGraphIndexLike {
  ingest(event: NormalizedWorkEvent, blocks: CacheBlock[]): WorkGraphUpdate;
  getGraph(runId: string): WorkGraph | null;
  listDemandSignals(runId?: string): DemandSignal[];
}

export interface WorkCacheLookupQuery {
  treeType: CacheTreeType;
  cacheKey: string;
}

export type WorkCacheLookupResult<T = unknown> =
  | { hit: true; block: CacheBlock<T>; ageMs: number }
  | { hit: false; reason: 'not_found' | 'expired' | 'invalid' | 'disabled' };

export interface PromptPrefixMaterialization {
  prefix: string;
  prefixHash: string;
  blocks: Array<CacheBlock<PromptPrefixBlockValue>>;
}

export interface PromptPrefixBlockValue {
  id: string;
  type: string;
  hash: string;
  stable: boolean;
  content: string;
  tokenEstimate?: number;
  order: number;
  prefixHash: string;
  source?: string;
  templateId?: string;
  templateVersion?: string;
  metadata?: Record<string, unknown>;
}

export type RecoveryKnowledgeBlockValue = RecoveryKnowledge;
