import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryContractSpecRef,
  MemoryEntityRef,
  MemoryPrincipal,
  MemoryRelation,
  MemoryRetrievalPolicySpec,
  MemorySource,
} from './contracts';
import type { ManagedMemorySearchResult, MemorySearchFilter } from './operations';
import type { MemoryExtractionSourceRef } from './lifecycle-contracts';
import type { ManagedMemoryRecordStore } from './managed-store';
import { hashMemoryScope, memoryError, sha256 } from './memory-utils';

export interface NormalizedMemoryQuery {
  operationId: string;
  scope: ManagedMemoryScope;
  principal: MemoryPrincipal;
  rawQuery?: string;
  normalizedQuery?: string;
  queryEmbedding?: number[];
  entities?: MemoryEntityRef[];
  temporalIntent?: {
    at?: string;
    from?: string;
    to?: string;
  };
  requestedTypes?: ManagedMemoryType[];
  profileRevision: string;
  queryHash: string;
}

export interface MemorySearchFilterV2 extends MemorySearchFilter {
  excludeTags?: string[];
  authorities?: NonNullable<MemoryExtractionSourceRef['authority']>[];
  validAt?: string;
  validFromBefore?: string;
  validToAfter?: string;
  relationTypes?: MemoryRelation['type'][];
  legalHoldOnly?: boolean;
}

export interface MemoryMatchedFragment {
  field: string;
  text?: string;
  start?: number;
  end?: number;
  fragmentHash?: string;
}

export type MemoryCandidateGeneratorType =
  | 'structured'
  | 'keyword'
  | 'dense'
  | 'sparse'
  | 'graph'
  | 'recent'
  | 'custom';

export interface MemoryCandidateGenerationRequest {
  query: NormalizedMemoryQuery;
  filter?: MemorySearchFilterV2;
  limit: number;
}

export interface MemoryCandidate {
  memoryId: string;
  generatorId: string;
  generatorType?: MemoryCandidateGeneratorType;
  rawScore?: number;
  normalizedScore?: number;
  matchedFields?: string[];
  matchedFragments?: MemoryMatchedFragment[];
  reasons?: string[];
}

export interface MemoryCandidateGenerator {
  readonly id: string;
  readonly type: MemoryCandidateGeneratorType;
  generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}

export interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec {
  normalization: 'min_max' | 'z_score' | 'rank' | 'provider_normalized';
  weights: {
    semantic?: number;
    keyword?: number;
    exact?: number;
    graph?: number;
    recency?: number;
    importance?: number;
    confidence?: number;
    authority?: number;
    verified?: number;
    reinforcement?: number;
  };
  freshnessHalfLifeSeconds?: number;
  diversity?: {
    method: 'none' | 'mmr' | 'per_entity_cap' | 'per_source_cap';
    lambda?: number;
    maxPerEntity?: number;
    maxPerSource?: number;
  };
  stableTieBreak: 'memory_id' | 'updated_at_then_id' | 'created_at_then_id';
}

export interface MemoryRetrievalSnapshot {
  id: string;
  operationId: string;
  queryHash: string;
  profileRef: MemoryContractSpecRef;
  profileRevision: string;
  filterHash: string;
  generatorIds: string[];
  candidateCount: number;
  rankingPolicyHash: string;
  rerankerRef?: MemoryContractSpecRef;
  resultMemoryIds: string[];
  createdAt: string;
}

export interface MemoryRetrievalExplanation {
  memoryId: string;
  finalRank: number;
  finalScore: number;
  componentScores: Record<string, number>;
  filtersPassed: string[];
  filtersRejected?: string[];
  selectedBecause: string[];
  conflictMarkers?: string[];
}

export interface MemoryRetrievalRequest {
  query: NormalizedMemoryQuery;
  profileRef: MemoryContractSpecRef;
  filter?: MemorySearchFilterV2;
  topK: number;
  scoreThreshold?: number;
  includeSuperseded?: boolean;
  includeInvalidated?: boolean;
}

export interface MemoryRetrievalResult {
  results: ManagedMemorySearchResult[];
  snapshot: MemoryRetrievalSnapshot;
  explanations: MemoryRetrievalExplanation[];
}

export interface MemoryRetrievalPipeline {
  retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult>;
  explain(snapshotId: string): Promise<MemoryRetrievalResult | null>;
}

export interface DefaultMemoryRetrievalPipelineOptions {
  recordStore: ManagedMemoryRecordStore;
  generators: MemoryCandidateGenerator[];
  rankingPolicy: MemoryRankingPolicySpecV2;
  now?: () => string;
}

interface AggregatedCandidate {
  record: ManagedMemoryRecord;
  componentScores: Record<string, number>;
  reasons: string[];
  filtersPassed: string[];
  finalScore: number;
}

export class DefaultMemoryRetrievalPipeline implements MemoryRetrievalPipeline {
  private readonly snapshots = new Map<string, MemoryRetrievalResult>();
  private readonly now: () => string;

  constructor(private readonly options: DefaultMemoryRetrievalPipelineOptions) {
    if (options.generators.length === 0) {
      throw new Error('At least one memory candidate generator is required.');
    }
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult> {
    assertPrincipalScope(request.query.principal, request.query.scope);
    const generated = await Promise.all(
      this.options.generators.map(async (generator) => ({
        generator,
        candidates: await generator.generate({
          query: request.query,
          filter: request.filter,
          limit: this.options.rankingPolicy.maxCandidates,
        }),
      }))
    );
    const normalized = generated.flatMap(({ generator, candidates }) =>
      normalizeCandidates(candidates, generator, this.options.rankingPolicy.normalization)
    );
    const aggregated = new Map<string, AggregatedCandidate>();

    for (const candidate of normalized) {
      const record = await this.options.recordStore.get(candidate.memoryId, request.query.scope);
      if (!record) continue;
      const hardFilter = evaluateHardFilters(record, request);
      if (!hardFilter.allowed) continue;
      const current = aggregated.get(record.id) ?? {
        record,
        componentScores: recordComponentScores(record, this.options.rankingPolicy, this.now()),
        reasons: [],
        filtersPassed: hardFilter.passed,
        finalScore: 0,
      };
      const component = generatorScoreComponent(candidate.generatorType);
      current.componentScores[component] = Math.max(
        current.componentScores[component] ?? 0,
        clamp(candidate.normalizedScore ?? candidate.rawScore ?? 0)
      );
      current.reasons.push(...(candidate.reasons ?? []));
      aggregated.set(record.id, current);
    }

    const ranked = Array.from(aggregated.values())
      .map((candidate) => ({
        ...candidate,
        finalScore: fuseScores(candidate.componentScores, this.options.rankingPolicy.weights),
      }))
      .filter((candidate) => candidate.finalScore >= (request.scoreThreshold ?? 0))
      .sort((left, right) => compareCandidates(left, right, this.options.rankingPolicy))
      .slice(0, request.topK);

    const explanations: MemoryRetrievalExplanation[] = ranked.map((candidate, index) => ({
      memoryId: candidate.record.id,
      finalRank: index + 1,
      finalScore: candidate.finalScore,
      componentScores: candidate.componentScores,
      filtersPassed: candidate.filtersPassed,
      selectedBecause: Array.from(
        new Set([
          ...candidate.reasons,
          ...Object.entries(candidate.componentScores)
            .filter(([, value]) => value > 0)
            .map(([key]) => key),
        ])
      ),
      conflictMarkers: candidate.record.relations
        ?.filter((relation) => relation.type === 'contradicts')
        .map((relation) => relation.targetMemoryId),
    }));
    const snapshot: MemoryRetrievalSnapshot = {
      id: `retrieval:${sha256({
        operationId: request.query.operationId,
        queryHash: request.query.queryHash,
        results: ranked.map((item) => item.record.versionId),
      }).slice(7, 31)}`,
      operationId: request.query.operationId,
      queryHash: request.query.queryHash,
      profileRef: request.profileRef,
      profileRevision: request.query.profileRevision,
      filterHash: sha256(request.filter ?? {}),
      generatorIds: this.options.generators.map((generator) => generator.id),
      candidateCount: aggregated.size,
      rankingPolicyHash: sha256(this.options.rankingPolicy),
      resultMemoryIds: ranked.map((candidate) => candidate.record.id),
      createdAt: this.now(),
    };
    const result: MemoryRetrievalResult = {
      results: ranked.map((candidate) => ({
        record: candidate.record,
        score: candidate.finalScore,
        semanticScore: candidate.componentScores.semantic,
        keywordScore: candidate.componentScores.keyword,
        graphScore: candidate.componentScores.graph,
        reasons: Array.from(new Set(candidate.reasons)),
      })),
      snapshot,
      explanations,
    };
    this.snapshots.set(snapshot.id, structuredClone(result));
    return result;
  }

  async explain(snapshotId: string): Promise<MemoryRetrievalResult | null> {
    const result = this.snapshots.get(snapshotId);
    return result ? structuredClone(result) : null;
  }
}

export class StructuredMemoryCandidateGenerator implements MemoryCandidateGenerator {
  readonly id = 'memory.generator.structured';
  readonly type = 'structured' as const;

  constructor(private readonly store: ManagedMemoryRecordStore) {}

  async generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]> {
    const records = await this.store.list({
      scope: request.query.scope,
      filter: request.filter,
      includeSuperseded: true,
      includeInvalidated: true,
      limit: request.limit,
    });
    return records.map((record) => ({
      memoryId: record.id,
      generatorId: this.id,
      generatorType: this.type,
      rawScore: structuredMatchScore(record, request),
      matchedFields: ['scope', 'status'],
      reasons: ['structured-hard-filter-candidate'],
    }));
  }
}

export class KeywordMemoryCandidateGenerator implements MemoryCandidateGenerator {
  readonly id = 'memory.generator.keyword';
  readonly type = 'keyword' as const;

  constructor(private readonly store: ManagedMemoryRecordStore) {}

  async generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]> {
    const query = request.query.normalizedQuery?.trim().toLowerCase();
    if (!query) return [];
    const records = await this.store.list({
      scope: request.query.scope,
      includeSuperseded: true,
      includeInvalidated: true,
      limit: request.limit,
    });
    return records
      .map((record) => {
        const text =
          `${record.canonicalText ?? ''} ${record.summary ?? ''} ${stringify(record.content)}`
            .toLowerCase()
            .replace(/\s+/g, ' ');
        const terms = Array.from(new Set(query.split(/\s+/).filter(Boolean)));
        const matches = terms.filter((term) => text.includes(term));
        const score = terms.length === 0 ? 0 : matches.length / terms.length;
        return {
          memoryId: record.id,
          generatorId: this.id,
          generatorType: this.type,
          rawScore: score,
          normalizedScore: score,
          matchedFields: matches.length ? ['canonicalText', 'content'] : [],
          reasons: matches.length ? [`keyword:${matches.join(',')}`] : [],
        };
      })
      .filter((candidate) => (candidate.rawScore ?? 0) > 0);
  }
}

export function normalizeMemoryQuery(
  input: Omit<NormalizedMemoryQuery, 'queryHash'>
): NormalizedMemoryQuery {
  const normalizedQuery =
    input.normalizedQuery ?? input.rawQuery?.trim().toLowerCase().replace(/\s+/g, ' ');
  return {
    ...input,
    normalizedQuery,
    queryHash: sha256({
      scopeHash: hashMemoryScope(input.scope),
      principal: input.principal.principalId,
      query: normalizedQuery,
      embedding: input.queryEmbedding,
      entities: input.entities,
      temporalIntent: input.temporalIntent,
      requestedTypes: input.requestedTypes,
      profileRevision: input.profileRevision,
    }),
  };
}

function normalizeCandidates(
  candidates: MemoryCandidate[],
  generator: MemoryCandidateGenerator,
  normalization: MemoryRankingPolicySpecV2['normalization']
): MemoryCandidate[] {
  if (candidates.length === 0) return [];
  const raw = candidates.map((candidate) => candidate.rawScore ?? 0);
  const min = Math.min(...raw);
  const max = Math.max(...raw);
  const mean = raw.reduce((sum, value) => sum + value, 0) / raw.length;
  const deviation = Math.sqrt(
    raw.reduce((sum, value) => sum + (value - mean) ** 2, 0) / raw.length
  );
  return candidates.map((candidate, index) => {
    let normalizedScore = candidate.normalizedScore;
    if (normalizedScore === undefined) {
      if (normalization === 'min_max') {
        normalizedScore =
          max === min ? (max > 0 ? 1 : 0) : ((candidate.rawScore ?? 0) - min) / (max - min);
      } else if (normalization === 'z_score') {
        const z = deviation === 0 ? 0 : ((candidate.rawScore ?? 0) - mean) / deviation;
        normalizedScore = 1 / (1 + Math.exp(-z));
      } else if (normalization === 'rank') {
        normalizedScore = 1 - index / Math.max(1, candidates.length);
      } else {
        normalizedScore = clamp(candidate.rawScore ?? 0);
      }
    }
    return {
      ...candidate,
      generatorId: candidate.generatorId || generator.id,
      generatorType: candidate.generatorType ?? generator.type,
      normalizedScore: clamp(normalizedScore),
    };
  });
}

function evaluateHardFilters(
  record: ManagedMemoryRecord,
  request: MemoryRetrievalRequest
): { allowed: boolean; passed: string[] } {
  const filter = request.filter;
  const passed = ['scope', 'permission', 'not_deleted'];
  if (record.scopeHash !== hashMemoryScope(request.query.scope)) return { allowed: false, passed };
  if (record.status === 'deleted' || record.status === 'deletion_pending') {
    return { allowed: false, passed };
  }
  if (record.status === 'superseded' && !request.includeSuperseded) {
    return { allowed: false, passed };
  }
  if (record.status === 'invalidated' && !request.includeInvalidated) {
    return { allowed: false, passed };
  }
  const now = filter?.validAt ?? request.query.temporalIntent?.at ?? new Date().toISOString();
  if (record.expiresAt && record.expiresAt <= now) return { allowed: false, passed };
  const validFrom = stringMetadata(record, 'validFrom');
  const validTo = stringMetadata(record, 'validTo');
  if (validFrom && validFrom > now) return { allowed: false, passed };
  if (validTo && validTo < now) return { allowed: false, passed };
  if (request.query.requestedTypes && !request.query.requestedTypes.includes(record.type)) {
    return { allowed: false, passed };
  }
  if (filter?.ids && !filter.ids.includes(record.id)) return { allowed: false, passed };
  if (filter?.excludeIds?.includes(record.id)) return { allowed: false, passed };
  if (filter?.statuses && !filter.statuses.includes(record.status))
    return { allowed: false, passed };
  if (filter?.sourceTypes && !filter.sourceTypes.includes(record.source.type)) {
    return { allowed: false, passed };
  }
  if (filter?.visibility && !filter.visibility.includes(record.visibility)) {
    return { allowed: false, passed };
  }
  if (filter?.tagsAny && !filter.tagsAny.some((tag) => record.tags?.includes(tag))) {
    return { allowed: false, passed };
  }
  if (filter?.tagsAll && !filter.tagsAll.every((tag) => record.tags?.includes(tag))) {
    return { allowed: false, passed };
  }
  if (filter?.excludeTags?.some((tag) => record.tags?.includes(tag))) {
    return { allowed: false, passed };
  }
  if (filter?.verifiedOnly && !record.humanVerified) return { allowed: false, passed };
  if (
    filter?.conflictFreeOnly &&
    record.relations?.some((relation) => relation.type === 'contradicts')
  ) {
    return { allowed: false, passed };
  }
  if (
    filter?.canonicalKeys &&
    !filter.canonicalKeys.includes(String(record.metadata?.canonicalKey ?? ''))
  ) {
    return { allowed: false, passed };
  }
  if (
    filter?.relationTypes &&
    !record.relations?.some((relation) => filter.relationTypes?.includes(relation.type))
  ) {
    return { allowed: false, passed };
  }
  if (filter?.legalHoldOnly && record.metadata?.legalHold !== true) {
    return { allowed: false, passed };
  }
  return {
    allowed: true,
    passed: [...passed, 'status', 'validity', 'type', 'source', 'visibility', 'policy'],
  };
}

function recordComponentScores(
  record: ManagedMemoryRecord,
  policy: MemoryRankingPolicySpecV2,
  now: string
): Record<string, number> {
  const ageSeconds = Math.max(0, (Date.parse(now) - Date.parse(record.updatedAt)) / 1000);
  const halfLife = Math.max(1, policy.freshnessHalfLifeSeconds ?? 30 * 24 * 60 * 60);
  return {
    recency: Math.exp((-Math.log(2) * ageSeconds) / halfLife),
    importance: clamp(record.importance ?? 0),
    confidence: clamp(record.confidence ?? 0),
    authority: authorityScore(record.source),
    verified: record.humanVerified ? 1 : 0,
    reinforcement: clamp(record.strength ?? 0),
  };
}

function generatorScoreComponent(type?: MemoryCandidateGeneratorType): string {
  if (type === 'dense' || type === 'sparse') return 'semantic';
  if (type === 'keyword') return 'keyword';
  if (type === 'structured') return 'exact';
  if (type === 'graph') return 'graph';
  if (type === 'recent') return 'recency';
  return 'semantic';
}

function fuseScores(
  scores: Record<string, number>,
  weights: MemoryRankingPolicySpecV2['weights']
): number {
  const configured = Object.entries(weights).filter(
    (entry): entry is [string, number] => entry[1] !== undefined
  );
  if (configured.length === 0) {
    const values = Object.values(scores);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }
  const totalWeight = configured.reduce((sum, [, weight]) => sum + Math.max(0, weight), 0);
  if (totalWeight === 0) return 0;
  return (
    configured.reduce(
      (sum, [component, weight]) => sum + (scores[component] ?? 0) * Math.max(0, weight),
      0
    ) / totalWeight
  );
}

function compareCandidates(
  left: AggregatedCandidate,
  right: AggregatedCandidate,
  policy: MemoryRankingPolicySpecV2
): number {
  const score = right.finalScore - left.finalScore;
  if (Math.abs(score) > Number.EPSILON) return score;
  if (policy.stableTieBreak === 'updated_at_then_id') {
    const updated = right.record.updatedAt.localeCompare(left.record.updatedAt);
    if (updated) return updated;
  }
  if (policy.stableTieBreak === 'created_at_then_id') {
    const created = right.record.createdAt.localeCompare(left.record.createdAt);
    if (created) return created;
  }
  return left.record.id.localeCompare(right.record.id);
}

function structuredMatchScore(
  record: ManagedMemoryRecord,
  request: MemoryCandidateGenerationRequest
): number {
  if (request.filter?.ids?.includes(record.id)) return 1;
  if (request.filter?.canonicalKeys?.includes(String(record.metadata?.canonicalKey ?? ''))) {
    return 1;
  }
  return 0.5;
}

function assertPrincipalScope(principal: MemoryPrincipal, scope: ManagedMemoryScope): void {
  if (principal.tenantId && scope.tenantId && principal.tenantId !== scope.tenantId) {
    throw memoryError('MEMORY_SCOPE_DENIED', 'Principal tenant does not match memory scope.');
  }
  if (
    principal.userId &&
    principal.userId !== scope.userId &&
    !principal.permissionScopes.includes('memory:read:any')
  ) {
    throw memoryError('MEMORY_PERMISSION_DENIED', 'Principal cannot read another user scope.');
  }
}

function authorityScore(source: MemorySource): number {
  if (source.type === 'human_review') return 1;
  if (source.type === 'system' || source.type === 'workflow_state') return 0.9;
  if (source.type === 'tool_result') return 0.8;
  if (source.type === 'user_message') return 0.7;
  return 0.6;
}

function stringMetadata(record: ManagedMemoryRecord, key: string): string | undefined {
  const value = record.metadata?.[key];
  return typeof value === 'string' ? value : undefined;
}

function stringify(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
}
