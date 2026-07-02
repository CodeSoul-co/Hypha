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
    if (query.vector && this.options.vector) {
      const vectorResults = await this.options.vector.search({
        vector: query.vector,
        topK: query.topK ?? 5,
        filter: { ...scope, ...(query.type ? { type: query.type } : {}) },
      });
      const records = await Promise.all(
        vectorResults.map((result) => this.options.structured.get<MemoryRecord>(this.tableName, result.id))
      );
      const results: MemorySearchResult[] = [];
      records.forEach((record, index) => {
        if (!record) return;
        results.push({
          record,
          score: vectorResults[index].score,
          provenance: record.provenance,
        });
      });
      return results;
    }

    const records = await this.read(scope, { type: query.type, limit: query.topK });
    const text = query.text?.toLowerCase();
    return records
      .filter((record) => !text || JSON.stringify(record.value).toLowerCase().includes(text))
      .map((record) => ({ record, provenance: record.provenance }));
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
}

function shouldIndex(record: MemoryRecord): boolean {
  return record.type === 'semantic' || record.type === 'episodic' || record.type === 'procedural';
}
