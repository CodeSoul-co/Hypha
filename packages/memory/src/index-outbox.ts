import type { EmbeddingProvider, VectorIndexProvider } from './index';
import type { ManagedMemoryRecord, NormalizedMemoryError } from './contracts';
import type { ProviderHealth } from './operations';
import type {
  ManagedMemoryRecordStore,
  MemoryIndexOutboxRecord,
  MemoryIndexOutboxStore,
} from './managed-store';
import { normalizeMemoryError } from './memory-utils';

export interface ManagedVectorPoint {
  id: string;
  vector: number[];
  metadata: Record<string, unknown>;
}

export interface ManagedVectorSearchRequest {
  vector: number[];
  topK: number;
  filter?: Record<string, unknown>;
  scoreThreshold?: number;
}

export interface ManagedVectorSearchResult {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface ManagedVectorStoreAdapter {
  readonly id: string;
  upsert(points: ManagedVectorPoint[]): Promise<void>;
  delete(ids: string[]): Promise<void>;
  search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
  health(): Promise<ProviderHealth>;
}

export class InMemoryLocalVectorStoreAdapter implements ManagedVectorStoreAdapter {
  readonly id: string;
  private readonly points = new Map<string, ManagedVectorPoint>();

  constructor(id = 'vector.local.in-memory') {
    this.id = id;
  }

  async upsert(points: ManagedVectorPoint[]): Promise<void> {
    for (const point of points) {
      this.points.set(point.id, structuredClone(point));
    }
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) this.points.delete(id);
  }

  async search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]> {
    return Array.from(this.points.values())
      .filter((point) => metadataMatches(point.metadata, request.filter))
      .map((point) => ({
        id: point.id,
        score: cosineSimilarity(point.vector, request.vector),
        metadata: structuredClone(point.metadata),
      }))
      .filter((result) => result.score >= (request.scoreThreshold ?? -1))
      .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
      .slice(0, request.topK);
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: new Date().toISOString(),
      details: { points: this.points.size },
    };
  }
}

export class LegacyVectorIndexStoreAdapter implements ManagedVectorStoreAdapter {
  constructor(
    readonly id: string,
    private readonly provider: VectorIndexProvider
  ) {}

  async upsert(points: ManagedVectorPoint[]): Promise<void> {
    await this.provider.upsert(points);
  }

  async delete(ids: string[]): Promise<void> {
    await this.provider.delete(ids);
  }

  async search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]> {
    return this.provider.search(request);
  }

  async health(): Promise<ProviderHealth> {
    return { status: 'healthy', checkedAt: new Date().toISOString() };
  }
}

export interface IndexOutboxWorkerEvent {
  type:
    | 'memory.index.started'
    | 'memory.index.completed'
    | 'memory.index.partial'
    | 'memory.index.failed';
  operationId: string;
  outboxId: string;
  memoryId: string;
  memoryVersionId: string;
  scopeHash: string;
  error?: NormalizedMemoryError;
}

export interface IndexOutboxWorkerOptions {
  ownerId: string;
  outboxStore: MemoryIndexOutboxStore;
  recordStore: ManagedMemoryRecordStore;
  embeddingProvider: EmbeddingProvider;
  vectorStores: ManagedVectorStoreAdapter[];
  batchSize?: number;
  leaseMs?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
  pollIntervalMs?: number;
  now?: () => Date;
  onEvent?: (event: IndexOutboxWorkerEvent) => void | Promise<void>;
  onError?: (error: NormalizedMemoryError) => void | Promise<void>;
}

export interface IndexOutboxWorkerRunResult {
  leased: number;
  completed: number;
  failed: number;
  deadLettered: number;
}

export class IndexOutboxWorker {
  private running = false;
  private timer?: ReturnType<typeof setTimeout>;
  private activeRun?: Promise<IndexOutboxWorkerRunResult>;
  private readonly stores: Map<string, ManagedVectorStoreAdapter>;
  private readonly now: () => Date;

  constructor(private readonly options: IndexOutboxWorkerOptions) {
    this.stores = new Map(options.vectorStores.map((store) => [store.id, store]));
    this.now = options.now ?? (() => new Date());
  }

  async runOnce(): Promise<IndexOutboxWorkerRunResult> {
    const now = this.now();
    const leaseUntil = new Date(now.getTime() + (this.options.leaseMs ?? 30_000));
    const records = await this.options.outboxStore.lease(
      this.options.ownerId,
      now.toISOString(),
      leaseUntil.toISOString(),
      this.options.batchSize ?? 25
    );
    const result: IndexOutboxWorkerRunResult = {
      leased: records.length,
      completed: 0,
      failed: 0,
      deadLettered: 0,
    };

    for (const record of records) {
      await this.emit('memory.index.started', record);
      try {
        await this.process(record);
        const completed = await this.options.outboxStore.complete(
          record.id,
          this.options.ownerId,
          requiredLeaseToken(record),
          this.now().toISOString()
        );
        if (!completed) throw new Error('Memory index outbox lease was lost.');
        result.completed += 1;
        await this.emit('memory.index.completed', record);
      } catch (error) {
        const normalized = normalizeMemoryError(error, 'MEMORY_INDEX_FAILED');
        const deadLetter = record.attempts >= (this.options.maxAttempts ?? 5);
        const retryAt = new Date(
          this.now().getTime() + (this.options.retryDelayMs ?? 1_000) * Math.max(1, record.attempts)
        ).toISOString();
        const failed = await this.options.outboxStore.fail(
          record.id,
          this.options.ownerId,
          requiredLeaseToken(record),
          normalized,
          retryAt,
          deadLetter
        );
        if (!failed) {
          await this.options.onError?.(
            normalizeMemoryError(new Error('Memory index outbox lease was lost.'))
          );
        }
        if (deadLetter) result.deadLettered += 1;
        else result.failed += 1;
        await this.emit(
          deadLetter ? 'memory.index.failed' : 'memory.index.partial',
          record,
          normalized
        );
      }
    }
    return result;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    const poll = async (): Promise<void> => {
      if (!this.running) return;
      try {
        this.activeRun = this.runOnce();
        await this.activeRun;
      } catch (error) {
        await this.options.onError?.(normalizeMemoryError(error));
      } finally {
        this.activeRun = undefined;
        if (this.running) {
          this.timer = setTimeout(poll, this.options.pollIntervalMs ?? 1_000);
        }
      }
    };
    void poll();
  }

  stop(): void {
    this.running = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
  }

  async drain(): Promise<void> {
    await this.activeRun;
  }

  async stopAndDrain(): Promise<void> {
    this.stop();
    await this.drain();
  }

  private async process(record: MemoryIndexOutboxRecord): Promise<void> {
    const targets = record.targetVectorStoreIds.map((id) => {
      const store = this.stores.get(id);
      if (!store) throw new Error(`Vector store is not registered: ${id}`);
      return store;
    });
    if (record.action === 'delete') {
      await Promise.all(targets.map((store) => store.delete([record.memoryId])));
      return;
    }
    const memory = await this.options.recordStore.getVersionByScopeHash(
      record.memoryId,
      record.memoryVersionId,
      record.scopeHash
    );
    if (!memory) {
      throw new Error(
        `Memory version is unavailable for indexing: ${record.memoryId}@${record.memoryVersionId}`
      );
    }
    const text = memory.canonicalText ?? stringify(memory.content);
    const [vector] = await this.options.embeddingProvider.embed([text]);
    if (!vector) throw new Error('Embedding provider returned no vector.');
    const point = vectorPoint(memory, vector);
    await Promise.all(targets.map((store) => store.upsert([point])));
  }

  private async emit(
    type: IndexOutboxWorkerEvent['type'],
    record: MemoryIndexOutboxRecord,
    error?: NormalizedMemoryError
  ): Promise<void> {
    await this.options.onEvent?.({
      type,
      operationId: record.operationId,
      outboxId: record.id,
      memoryId: record.memoryId,
      memoryVersionId: record.memoryVersionId,
      scopeHash: record.scopeHash,
      error,
    });
  }
}

function vectorPoint(record: ManagedMemoryRecord, vector: number[]): ManagedVectorPoint {
  return {
    id: record.id,
    vector,
    metadata: {
      memoryId: record.id,
      memoryVersionId: record.versionId,
      scopeHash: record.scopeHash,
      type: record.type,
      status: record.status,
      contentHash: record.contentHash,
      tags: record.tags,
      updatedAt: record.updatedAt,
    },
  };
}

function metadataMatches(
  metadata: Record<string, unknown>,
  filter?: Record<string, unknown>
): boolean {
  if (!filter) return true;
  return Object.entries(filter).every(([key, expected]) => {
    const actual = metadata[key];
    if (Array.isArray(expected)) return expected.includes(actual);
    return actual === expected;
  });
}

function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length === 0 || left.length !== right.length) return 0;
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  for (let index = 0; index < left.length; index += 1) {
    const a = left[index] ?? 0;
    const b = right[index] ?? 0;
    dot += a * b;
    leftMagnitude += a * a;
    rightMagnitude += b * b;
  }
  if (leftMagnitude === 0 || rightMagnitude === 0) return 0;
  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function stringify(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function requiredLeaseToken(record: MemoryIndexOutboxRecord): string {
  if (!record.leaseToken) throw new Error('Leased Memory index record is missing its lease token.');
  return record.leaseToken;
}
