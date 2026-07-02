import type {
  ArtifactMeta,
  ArtifactRef,
  ArtifactStoreProvider,
  StructuredQuery,
  StructuredStoreProvider,
  VectorIndexProvider,
  VectorQuery,
  VectorRecord,
  VectorSearchResult,
} from '@hypha/memory';

export interface LocalAdapterProfile {
  id: string;
  type: 'sqlite' | 'local-vector' | 'file-artifact';
  rootPath?: string;
  options?: Record<string, unknown>;
}

export const LOCAL_ADAPTER_TYPES = ['sqlite', 'local-vector', 'file-artifact'] as const;

export class InMemoryStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, Record<string, unknown>>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    return (this.tables.get(table)?.get(id) as T | undefined) ?? null;
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    const records = this.tables.get(table) ?? new Map<string, Record<string, unknown>>();
    records.set(record.id, record as Record<string, unknown>);
    this.tables.set(table, records);
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const records = this.tables.get(table);
    const existing = records?.get(id);
    if (!records || !existing) return;
    records.set(id, { ...existing, ...(patch as Record<string, unknown>) });
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    const records = Array.from(this.tables.get(table)?.values() ?? []);
    const filtered = records.filter((record) => {
      if (!query.where) return true;
      return Object.entries(query.where).every(([key, value]) => record[key] === value);
    });
    return filtered.slice(0, query.limit ?? filtered.length) as T[];
  }

  async transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return fn(this);
  }
}

export class InMemoryVectorIndexProvider implements VectorIndexProvider {
  private readonly records = new Map<string, VectorRecord>();

  async upsert(records: VectorRecord[]): Promise<void> {
    for (const record of records) {
      this.records.set(record.id, record);
    }
  }

  async search(query: VectorQuery): Promise<VectorSearchResult[]> {
    return Array.from(this.records.values())
      .map((record) => ({
        id: record.id,
        score: cosineSimilarity(query.vector, record.vector),
        metadata: record.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, query.topK);
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) {
      this.records.delete(id);
    }
  }
}

export class InMemoryArtifactStore implements ArtifactStoreProvider {
  private readonly records = new Map<string, Buffer>();

  async put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef> {
    const id = `artifact:${path}`;
    this.records.set(id, Buffer.isBuffer(content) ? content : Buffer.from(content));
    return { id, path, meta };
  }

  async get(ref: ArtifactRef): Promise<Buffer> {
    return this.records.get(ref.id) ?? Buffer.alloc(0);
  }

  async delete(ref: ArtifactRef): Promise<void> {
    this.records.delete(ref.id);
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;
  for (let index = 0; index < length; index += 1) {
    dot += a[index] * b[index];
    aNorm += a[index] * a[index];
    bNorm += b[index] * b[index];
  }
  if (aNorm === 0 || bNorm === 0) return 0;
  return dot / Math.sqrt(aNorm * bNorm);
}
