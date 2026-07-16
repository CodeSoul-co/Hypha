import type {
  ArtifactStoreProvider,
  EmbeddingProvider,
  MemoryAuditOptions,
  MemoryAuditReport,
  MemoryProvider,
  MemoryReadQuery,
  MemoryRecord,
  MemoryScope,
  MemorySearchQuery,
  MemorySearchResult,
  MemorySummary,
  MemorySummaryOptions,
  MemoryWritePolicy,
  MemoryWriteResult,
  StructuredStoreProvider,
  VectorIndexProvider,
} from './index';

export interface HybridMemoryProviderOptions {
  structured: StructuredStoreProvider;
  vector?: VectorIndexProvider;
  artifacts?: ArtifactStoreProvider;
  embeddings?: EmbeddingProvider;
  tableName?: string;
}

export class HybridMemoryProvider implements MemoryProvider {
  private readonly tableName: string;

  constructor(private readonly options: HybridMemoryProviderOptions) {
    this.tableName = options.tableName ?? 'memory_records';
  }

  async read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]> {
    if (query.ids?.length) {
      const records = await Promise.all(
        query.ids.map((id) => this.options.structured.get<MemoryRecord>(this.tableName, id))
      );
      return records.filter((record): record is MemoryRecord => Boolean(record));
    }
    return this.options.structured.query<MemoryRecord>(this.tableName, {
      where: { ...scope, ...(query.type ? { type: query.type } : {}) },
      limit: query.limit,
    });
  }

  async search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]> {
    const topK = query.topK ?? 5;
    const candidates = new Map<string, RankedMemorySearchResult>();

    if (query.vector && this.options.vector) {
      const vectorResults = await this.options.vector.search({
        vector: query.vector,
        topK,
        filter: { ...scope, ...(query.type ? { type: query.type } : {}) },
      });
      const records = await Promise.all(
        vectorResults.map((result) => this.options.structured.get<MemoryRecord>(this.tableName, result.id))
      );
      records.forEach((record, index) => {
        if (!record) return;
        addSearchCandidate(
          candidates,
          {
            record,
            score: vectorResults[index].score,
            provenance: record.provenance,
          },
          vectorResults[index].score
        );
      });
    }

    if (query.text) {
      const textResults = await this.searchByText(scope, query);
      for (const result of textResults) {
        addSearchCandidate(candidates, result, result.score ?? 0);
      }
    }

    if (candidates.size > 0) {
      return Array.from(candidates.values())
        .sort(compareRankedMemoryResults)
        .slice(0, topK)
        .map((result) => result.searchResult);
    }

    const records = await this.read(scope, { type: query.type, limit: topK });
    return records.map((record) => ({ record, provenance: record.provenance }));
  }

  async write(
    scope: MemoryScope,
    record: MemoryRecord,
    policy: MemoryWritePolicy
  ): Promise<MemoryWriteResult> {
    if (policy.requireProvenance && Object.keys(record.provenance ?? {}).length === 0) {
      throw new Error(`Memory record ${record.id} requires provenance`);
    }

    const scopedRecord = {
      ...record,
      ...scope,
      updatedAt: record.updatedAt ?? record.createdAt,
    };
    await this.options.structured.insert(this.tableName, scopedRecord);

    let vectorIndexed = false;
    if (this.options.vector && this.options.embeddings && shouldIndex(record)) {
      const [vector] = await this.options.embeddings.embed([String(record.value)]);
      await this.options.vector.upsert([
        {
          id: record.id,
          vector,
          metadata: { ...scope, type: record.type },
        },
      ]);
      vectorIndexed = true;
    }

    return { recordId: record.id, vectorIndexed };
  }

  async update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void> {
    await this.options.structured.update(this.tableName, recordId, {
      ...patch,
      ...scope,
      updatedAt: new Date().toISOString(),
    });
  }

  async invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void> {
    await this.update(scope, recordId, {
      expiresAt: new Date().toISOString(),
      provenance: { invalidatedReason: reason },
    });
    await this.options.vector?.delete([recordId]);
  }

  async summarize(scope: MemoryScope, options: MemorySummaryOptions = {}): Promise<MemorySummary> {
    const records = await this.read(scope, { type: options.type, limit: options.limit });
    return {
      scope,
      recordCount: records.length,
      types: records.reduce<MemorySummary['types']>((acc, record) => {
        acc[record.type] = (acc[record.type] ?? 0) + 1;
        return acc;
      }, {}),
    };
  }

  async audit(scope: MemoryScope, _options: MemoryAuditOptions = {}): Promise<MemoryAuditReport> {
    const records = await this.read(scope, {});
    return {
      scope,
      recordsChecked: records.length,
      missingProvenance: records
        .filter((record) => Object.keys(record.provenance ?? {}).length === 0)
        .map((record) => record.id),
    };
  }

  private async searchByText(
    scope: MemoryScope,
    query: MemorySearchQuery
  ): Promise<MemorySearchResult[]> {
    const records = await this.read(scope, { type: query.type });
    return records
      .map((record) => ({
        record,
        score: scoreMemoryText(record, query.text ?? ''),
        provenance: record.provenance,
      }))
      .filter((result) => (result.score ?? 0) > 0);
  }
}

function shouldIndex(record: MemoryRecord): boolean {
  return record.type === 'semantic' || record.type === 'episodic' || record.type === 'procedural';
}

interface RankedMemorySearchResult {
  searchResult: MemorySearchResult;
  rankScore: number;
}

function addSearchCandidate(
  candidates: Map<string, RankedMemorySearchResult>,
  searchResult: MemorySearchResult,
  rankScore: number
): void {
  const existing = candidates.get(searchResult.record.id);
  if (!existing) {
    candidates.set(searchResult.record.id, { searchResult, rankScore });
    return;
  }

  existing.rankScore += rankScore;
  existing.searchResult = {
    ...existing.searchResult,
    score: Math.max(existing.searchResult.score ?? 0, searchResult.score ?? 0),
    provenance: {
      ...searchResult.provenance,
      ...existing.searchResult.provenance,
    },
  };
}

function compareRankedMemoryResults(
  left: RankedMemorySearchResult,
  right: RankedMemorySearchResult
): number {
  return (
    right.rankScore - left.rankScore ||
    (right.searchResult.score ?? 0) - (left.searchResult.score ?? 0) ||
    left.searchResult.record.id.localeCompare(right.searchResult.record.id)
  );
}

function scoreMemoryText(record: MemoryRecord, queryText: string): number {
  const haystack = normalizeSearchText(
    [record.id, record.type, record.source, stringifySearchValue(record.value)].join(' ')
  );
  const needle = normalizeSearchText(queryText);
  if (!needle) return 0;
  if (haystack.includes(needle)) return 1;

  const terms = needle
    .split(/[\s,.;:!?，。！？；：、]+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);
  if (terms.length === 0) return 0;

  const matchedTerms = terms.filter((term) => haystack.includes(term)).length;
  return matchedTerms === 0 ? 0 : matchedTerms / terms.length;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function stringifySearchValue(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}
