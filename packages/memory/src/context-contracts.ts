import type {
  ManagedMemoryScope,
  MemoryContractSpecRef,
  MemoryPrincipal,
  MemoryProvenance,
} from './contracts';

export type ContextSourceType =
  | 'system'
  | 'workflow_state'
  | 'messages'
  | 'working_memory'
  | 'long_term_memory'
  | 'tool_observation'
  | 'artifact'
  | 'human_review'
  | 'custom';

export interface ContextSourceSpec {
  id: string;
  type: ContextSourceType;
  ref?: MemoryContractSpecRef;
  required?: boolean;
  priority: number;
  maxItems?: number;
  maxTokens?: number;
  filters?: Record<string, unknown>;
}

export interface ContextRankingPolicySpec {
  method: 'priority' | 'score_fusion' | 'reranker' | 'custom';
  recencyWeight?: number;
  relevanceWeight?: number;
  importanceWeight?: number;
  confidenceWeight?: number;
  provenanceWeight?: number;
  sourceWeights?: Record<string, number>;
  rerankerProviderRef?: MemoryContractSpecRef;
}

export interface ContextTruncationPolicySpec {
  method: 'drop_lowest' | 'truncate_items' | 'summarize' | 'hybrid';
  preserveRequiredSources: boolean;
  preserveLatestMessages?: number;
  minItemTokens?: number;
  truncationMarker?: string;
}

export interface ContextCompactionPolicySpec {
  enabled: boolean;
  triggerRatio: number;
  summaryProviderRef?: MemoryContractSpecRef;
  preserveLastMessages?: number;
  persistSummaryAsMemory?: boolean;
  summaryMemoryType?: import('./contracts').ManagedMemoryType;
}

export interface ContextProfileSpec {
  id: string;
  version: string;
  revision?: string;
  name?: string;
  description?: string;
  sources: ContextSourceSpec[];
  maxItems?: number;
  maxCharacters?: number;
  maxTokens: number;
  reservedOutputTokens?: number;
  reservedSystemTokens?: number;
  deduplication: 'none' | 'id' | 'hash' | 'semantic';
  semanticDedupThreshold?: number;
  ranking: ContextRankingPolicySpec;
  truncation: ContextTruncationPolicySpec;
  conflictPolicy?: 'include_marked' | 'prefer_latest' | 'prefer_verified';
  includeProvenance: boolean;
  includeScores?: boolean;
  instructionBoundary: 'strict' | 'tagged' | 'quoted';
  untrustedContentPolicy: 'escape' | 'tag' | 'reject';
  compactionPolicy?: ContextCompactionPolicySpec;
  metadata?: Record<string, unknown>;
}

export interface ContextItem {
  id: string;
  sourceType: ContextSourceType;
  sourceId?: string;
  content: unknown;
  text: string;
  tokenEstimate: number;
  priority: number;
  score?: number;
  required?: boolean;
  untrusted?: boolean;
  provenance?: MemoryProvenance | Record<string, unknown>;
  conflictGroupId?: string;
  metadata?: Record<string, unknown>;
}

export interface ContextRejectedItem {
  itemId: string;
  reason:
    | 'scope_denied'
    | 'policy_denied'
    | 'invalid_status'
    | 'duplicate'
    | 'budget_exceeded'
    | 'untrusted_rejected'
    | 'invalid_input';
}

export interface ContextConflict {
  conflictGroupId: string;
  itemIds: string[];
  resolution?: string;
}

export interface ContextBundle {
  id: string;
  runId: string;
  stepId?: string;
  profileRef: MemoryContractSpecRef;
  profileRevision: string;
  items: ContextItem[];
  totalTokens: number;
  totalCharacters: number;
  omittedItemIds: string[];
  rejectedItems: ContextRejectedItem[];
  conflicts: ContextConflict[];
  sourceHashes: Record<string, string>;
  contextHash: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface ContextSourceBudget {
  sourceId: string;
  minTokens?: number;
  targetTokens?: number;
  maxTokens: number;
  required: boolean;
  overflowPolicy: 'drop' | 'truncate' | 'summarize' | 'spill_to_artifact' | 'fail';
}

export interface ContextBudgetPlan {
  totalAvailableTokens: number;
  fixedTokens: number;
  dynamicTokens: number;
  sourceBudgets: ContextSourceBudget[];
  tokenizerRef: MemoryContractSpecRef;
  safetyMarginTokens: number;
}

export interface PromptSegment {
  id: string;
  role: 'system' | 'developer' | 'user' | 'assistant' | 'tool' | 'data';
  text: string;
  tokenCount: number;
  trustLevel: 'trusted_instruction' | 'trusted_data' | 'untrusted_data';
  sourceRefs: string[];
  required?: boolean;
}

export interface ContextProvenanceLabel {
  sourceType: ContextSourceType;
  sourceId: string;
  memoryId?: string;
  memoryVersionId?: string;
  authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
  observedAt?: string;
  citationLabel: string;
}

export interface ContextTruncationRecord {
  itemId: string;
  originalTokens: number;
  retainedTokens: number;
  method: 'drop' | 'truncate' | 'summarize';
  reason: string;
}

export interface ContextEnvelope {
  id: string;
  runId: string;
  stepId?: string;
  contextHash: string;
  profileRevision: string;
  budgetPlan: ContextBudgetPlan;
  systemSegments: PromptSegment[];
  instructionSegments: PromptSegment[];
  dataSegments: PromptSegment[];
  includedSourceRefs: string[];
  omittedSourceRefs: string[];
  truncationRecords: ContextTruncationRecord[];
  provenanceIndex: Record<string, ContextProvenanceLabel>;
  conflicts: ContextConflict[];
  totalTokens: number;
  createdAt: string;
}

export interface ContextBuildRequest {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  runId: string;
  stepId?: string;
  stateId?: string;
  profileRef: MemoryContractSpecRef;
  modelContextWindowTokens: number;
  reservedSystemTokens: number;
  reservedInstructionTokens: number;
  reservedOutputTokens: number;
  runtimeStateRef?: string;
  messageCursor?: string;
  explicitSourceRefs?: string[];
  query?: string;
  previousContextHash?: string;
  metadata?: Record<string, unknown>;
}

export interface ContextBuildInput extends ContextBuildRequest {
  profile: ContextProfileSpec;
  sourceItems: ContextItem[];
  tokenizerRef?: MemoryContractSpecRef;
}

export interface ResolvedContextBuildInput extends ContextBuildRequest {
  profile: ContextProfileSpec;
  tokenizerRef?: MemoryContractSpecRef;
}

export interface ContextSourceResolutionInput extends ResolvedContextBuildInput {
  source: ContextSourceSpec;
}

export interface ContextSourceResolver {
  readonly id: string;
  supports(source: ContextSourceSpec): boolean;
  resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]>;
}

export interface ContextSourceResolverRegistry {
  resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]>;
}

export interface ContextItemPolicyInput {
  operationId: string;
  principal: MemoryPrincipal;
  scope: ManagedMemoryScope;
  profileRef: MemoryContractSpecRef;
  item: ContextItem;
}

export interface ContextItemPolicyDecision {
  allowed: boolean;
  reason?: string;
}

export interface ContextItemPolicyEvaluator {
  evaluate(input: ContextItemPolicyInput): Promise<ContextItemPolicyDecision>;
}

export interface ContextBuildExplanation {
  contextHash: string;
  selectedItemIds: string[];
  omittedItemIds: string[];
  rejectedItems: ContextRejectedItem[];
  ranking: Array<{ itemId: string; score: number; reasons: string[] }>;
  budgetPlan: ContextBudgetPlan;
}

export interface TokenEstimator {
  readonly id: string;
  estimate(text: string): number;
}

export interface MemoryContextBuilder {
  build(request: ContextBuildInput): Promise<ContextBundle>;
  explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}

export interface ContextInjectionGateway {
  buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise<ContextEnvelope>;
}
