import type { StructuredStoreProvider } from './index';
import type {
  ManagedVectorPoint,
  ManagedVectorSearchRequest,
  ManagedVectorSearchResult,
  ManagedVectorStoreAdapter,
  ManagedVectorWriteOptions,
} from './index-outbox';
import type { ProviderHealth } from './operations';
import { memoryError } from './memory-utils';

interface StructuredVectorRecord extends ManagedVectorPoint {
  scopeHash?: string;
  revision: number;
  memoryRevision?: number;
  fencingToken?: number;
  deleted?: boolean;
  updatedAt: string;
}

export interface StructuredManagedVectorStoreAdapterOptions {
  id?: string;
  table?: string;
  maxScanPoints?: number;
  now?: () => string;
}

/** Durable, bounded vector projection backed by the configured Structured Store. */
export class StructuredManagedVectorStoreAdapter implements ManagedVectorStoreAdapter {
  readonly id: string;
  private readonly table: string;
  private readonly maxScanPoints: number;
  private readonly now: () => string;

  constructor(
    private readonly store: StructuredStoreProvider,
    options: StructuredManagedVectorStoreAdapterOptions = {}
  ) {
    this.id = options.id ?? 'memory.vector.structured';
    this.table = options.table ?? 'managed_memory_vectors';
    this.maxScanPoints = boundedPositiveInteger(options.maxScanPoints ?? 10_000, 'maxScanPoints');
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async initialize(): Promise<void> {
    const initializable = this.store as StructuredStoreProvider & {
      initialize?(tables: readonly string[]): Promise<void>;
    };
    await initializable.initialize?.([this.table]);
  }

  async upsert(
    points: ManagedVectorPoint[],
    options: ManagedVectorWriteOptions = {}
  ): Promise<void> {
    for (const point of points) {
      validatePoint(point);
      await this.upsertOne(point, options);
    }
  }

  async delete(ids: string[], options: ManagedVectorWriteOptions = {}): Promise<void> {
    for (const id of ids) {
      await this.deleteOne(id, options);
    }
  }

  async search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]> {
    validateSearch(request);
    const scopeHash = stringMetadata(request.filter, 'scopeHash');
    const records = await this.store.query<StructuredVectorRecord>(this.table, {
      ...(scopeHash === undefined ? {} : { where: { scopeHash } }),
      limit: this.maxScanPoints + 1,
    });
    if (records.length > this.maxScanPoints) {
      throw memoryError(
        'MEMORY_VECTOR_UNAVAILABLE',
        `Structured vector scan exceeded ${this.maxScanPoints} points.`
      );
    }
    return records
      .filter((record) => !record.deleted && metadataMatches(record.metadata, request.filter))
      .map((record) => ({
        id: record.id,
        score: cosineSimilarity(record.vector, request.vector),
        metadata: structuredClone(record.metadata),
      }))
      .filter((result) => result.score >= (request.scoreThreshold ?? -1))
      .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
      .slice(0, request.topK);
  }

  async health(): Promise<ProviderHealth> {
    try {
      await this.store.query(this.table, { limit: 1 });
      return {
        status: 'healthy',
        checkedAt: this.now(),
        details: { durable: true, boundedScanPoints: this.maxScanPoints },
      };
    } catch {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'Structured Memory vector projection is unavailable.',
      };
    }
  }

  private async upsertOne(
    point: ManagedVectorPoint,
    options: ManagedVectorWriteOptions
  ): Promise<void> {
    const { fencingToken, memoryRevision } = options;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const current = await this.store.get<StructuredVectorRecord>(this.table, point.id);
      if (!current) {
        try {
          await this.store.insert(this.table, {
            ...structuredClone(point),
            ...(stringMetadata(point.metadata, 'scopeHash') === undefined
              ? {}
              : { scopeHash: stringMetadata(point.metadata, 'scopeHash') }),
            revision: 1,
            deleted: false,
            ...(fencingToken === undefined ? {} : { fencingToken }),
            ...(memoryRevision === undefined ? {} : { memoryRevision }),
            updatedAt: timestamp(this.now()),
          });
          return;
        } catch (error) {
          if (attempt === 2) throw error;
          continue;
        }
      }
      if (isStaleRevision(memoryRevision, current.memoryRevision)) return;
      if (
        memoryRevision === current.memoryRevision &&
        isStale(fencingToken, current.fencingToken)
      ) {
        return;
      }
      const patch: Partial<StructuredVectorRecord> = {
        vector: structuredClone(point.vector),
        metadata: structuredClone(point.metadata),
        ...(stringMetadata(point.metadata, 'scopeHash') === undefined
          ? {}
          : { scopeHash: stringMetadata(point.metadata, 'scopeHash') }),
        revision: current.revision + 1,
        deleted: false,
        ...(memoryRevision === undefined ? {} : { memoryRevision }),
        ...(fencingToken === undefined ? {} : { fencingToken }),
        updatedAt: timestamp(this.now()),
      };
      if (this.store.compareAndSet) {
        if (
          await this.store.compareAndSet<StructuredVectorRecord>(
            this.table,
            point.id,
            { revision: current.revision },
            patch
          )
        ) {
          return;
        }
        continue;
      }
      await this.store.update(this.table, point.id, patch);
      return;
    }
    throw memoryError(
      'MEMORY_REVISION_CONFLICT',
      `Structured vector projection changed concurrently: ${point.id}`,
      true
    );
  }

  private async deleteOne(id: string, options: ManagedVectorWriteOptions): Promise<void> {
    if (!id.trim()) {
      throw memoryError('MEMORY_INVALID_INPUT', 'Vector point id is required.');
    }
    const { fencingToken, memoryRevision } = options;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const current = await this.store.get<StructuredVectorRecord>(this.table, id);
      if (!current) {
        try {
          await this.store.insert(this.table, {
            id,
            vector: [],
            metadata: {},
            revision: 1,
            deleted: true,
            ...(fencingToken === undefined ? {} : { fencingToken }),
            ...(memoryRevision === undefined ? {} : { memoryRevision }),
            updatedAt: timestamp(this.now()),
          });
          return;
        } catch (error) {
          if (attempt === 2) throw error;
          continue;
        }
      }
      if (isStaleRevision(memoryRevision, current.memoryRevision)) return;
      if (
        memoryRevision === current.memoryRevision &&
        isStale(fencingToken, current.fencingToken)
      ) {
        return;
      }
      const patch: Partial<StructuredVectorRecord> = {
        deleted: true,
        revision: current.revision + 1,
        ...(memoryRevision === undefined ? {} : { memoryRevision }),
        ...(fencingToken === undefined ? {} : { fencingToken }),
        updatedAt: timestamp(this.now()),
      };
      if (this.store.compareAndSet) {
        if (
          await this.store.compareAndSet<StructuredVectorRecord>(
            this.table,
            id,
            { revision: current.revision },
            patch
          )
        ) {
          return;
        }
        continue;
      }
      await this.store.update(this.table, id, patch);
      return;
    }
    throw memoryError(
      'MEMORY_REVISION_CONFLICT',
      `Structured vector projection changed concurrently: ${id}`,
      true
    );
  }
}

function validatePoint(point: ManagedVectorPoint): void {
  if (
    !point.id.trim() ||
    point.vector.length === 0 ||
    point.vector.some((value) => !Number.isFinite(value))
  ) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Vector point id and finite vector are required.');
  }
}

function validateSearch(request: ManagedVectorSearchRequest): void {
  if (
    request.vector.length === 0 ||
    request.vector.some((value) => !Number.isFinite(value)) ||
    !Number.isSafeInteger(request.topK) ||
    request.topK < 1 ||
    request.topK > 1_000
  ) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Vector search requires a finite vector and topK 1..1000.'
    );
  }
}

function isStale(incoming?: number, current?: number): boolean {
  return incoming !== undefined && current !== undefined && incoming < current;
}

function isStaleRevision(incoming?: number, current?: number): boolean {
  return incoming !== undefined && current !== undefined && incoming < current;
}

function metadataMatches(
  metadata: Record<string, unknown>,
  filter?: Record<string, unknown>
): boolean {
  if (!filter) return true;
  return Object.entries(filter).every(([key, expected]) => metadata[key] === expected);
}

function stringMetadata(
  metadata: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = metadata?.[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length === 0 || left.length !== right.length) return 0;
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  for (let index = 0; index < left.length; index += 1) {
    const leftValue = left[index] ?? 0;
    const rightValue = right[index] ?? 0;
    dot += leftValue * rightValue;
    leftMagnitude += leftValue * leftValue;
    rightMagnitude += rightValue * rightValue;
  }
  if (leftMagnitude === 0 || rightMagnitude === 0) return 0;
  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function timestamp(value: string): string {
  if (!Number.isFinite(Date.parse(value))) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Vector Store clock must return an ISO date-time.');
  }
  return value;
}

function boundedPositiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1 || value > 1_000_000) {
    throw memoryError('MEMORY_INVALID_INPUT', `${label} must be between 1 and 1000000.`);
  }
  return value;
}
