import type { StructuredQuery, StructuredStoreProvider } from './index';
import { memoryError } from './memory-utils';

export interface MongoOperationOptionsLike {
  session?: MongoSessionLike;
}

export interface MongoCursorLike<T> {
  sort?(order: Record<string, 1 | -1>): MongoCursorLike<T>;
  limit?(limit: number): MongoCursorLike<T>;
  toArray(): Promise<T[]>;
}

export interface MongoCollectionLike {
  findOne<T>(
    filter: Record<string, unknown>,
    options?: MongoOperationOptionsLike
  ): Promise<T | null>;
  insertOne<T extends object>(document: T, options?: MongoOperationOptionsLike): Promise<unknown>;
  updateOne(
    filter: Record<string, unknown>,
    update: { $set: Record<string, unknown> },
    options?: MongoOperationOptionsLike
  ): Promise<{ matchedCount?: number }>;
  deleteOne(
    filter: Record<string, unknown>,
    options?: MongoOperationOptionsLike
  ): Promise<{ deletedCount?: number }>;
  find<T>(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): MongoCursorLike<T>;
  createIndex?(
    keys: Record<string, 1 | -1>,
    options?: { unique?: boolean; name?: string }
  ): Promise<unknown>;
}

export interface MongoSessionLike {
  withTransaction<T>(operation: () => Promise<T>): Promise<T>;
  endSession(): Promise<void>;
}

export interface MongoDatabaseLike {
  collection(name: string): MongoCollectionLike;
  startSession?(): MongoSessionLike;
  command?(command: Record<string, unknown>): Promise<unknown>;
}

export type MongoTransactionMode = 'required' | 'preferred' | 'disabled';

export interface MongoStructuredStoreProviderOptions {
  database: MongoDatabaseLike;
  transactionMode?: MongoTransactionMode;
  collectionPrefix?: string;
}

export interface MongoStructuredStoreHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  transactions: boolean;
  message?: string;
}

/** Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts. */
export class MongoStructuredStoreProvider implements StructuredStoreProvider {
  private readonly transactionMode: MongoTransactionMode;
  private readonly collectionPrefix: string;

  constructor(
    private readonly options: MongoStructuredStoreProviderOptions,
    private readonly session?: MongoSessionLike
  ) {
    this.transactionMode = options.transactionMode ?? 'required';
    this.collectionPrefix = options.collectionPrefix ?? '';
  }

  get<T>(table: string, id: string): Promise<T | null> {
    return this.collection(table).findOne<T>({ id }, this.operationOptions());
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    await this.collection(table).insertOne(structuredClone(record), this.operationOptions());
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const result = await this.collection(table).updateOne(
      { id },
      { $set: structuredClone(patch) as Record<string, unknown> },
      this.operationOptions()
    );
    if (result.matchedCount === 0) {
      throw memoryError('MEMORY_NOT_FOUND', `Structured record not found: ${table}/${id}`);
    }
  }

  async delete(table: string, id: string): Promise<void> {
    await this.collection(table).deleteOne({ id }, this.operationOptions());
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    let cursor = this.collection(table).find<T>(query.where ?? {}, this.operationOptions());
    const order = parseOrderBy(query.orderBy);
    if (order && cursor.sort) cursor = cursor.sort(order);
    if (query.limit !== undefined && cursor.limit) cursor = cursor.limit(query.limit);
    const records = await cursor.toArray();
    return records.map((record) => structuredClone(record));
  }

  async transaction<T>(operation: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    if (this.session || this.transactionMode === 'disabled') return operation(this);
    const session = this.options.database.startSession?.();
    if (!session) {
      if (this.transactionMode === 'preferred') return operation(this);
      throw memoryError(
        'MEMORY_STORE_UNAVAILABLE',
        'Mongo transactions are required for atomic Memory record and outbox commits.'
      );
    }
    try {
      return await session.withTransaction(() =>
        operation(new MongoStructuredStoreProvider(this.options, session))
      );
    } finally {
      await session.endSession();
    }
  }

  supportsTransactions(): boolean {
    return this.transactionMode !== 'disabled' && Boolean(this.options.database.startSession);
  }

  async initialize(collections: readonly string[]): Promise<void> {
    for (const table of collections) {
      const collection = this.collection(table);
      await collection.createIndex?.({ id: 1 }, { unique: true, name: 'memory_id_unique' });
    }
  }

  async health(): Promise<MongoStructuredStoreHealth> {
    try {
      await this.options.database.command?.({ ping: 1 });
      const transactions = this.supportsTransactions();
      return {
        status: this.transactionMode === 'required' && !transactions ? 'degraded' : 'healthy',
        transactions,
        message:
          this.transactionMode === 'required' && !transactions
            ? 'Mongo transactions are required but unavailable.'
            : undefined,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        transactions: this.supportsTransactions(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private collection(table: string): MongoCollectionLike {
    return this.options.database.collection(`${this.collectionPrefix}${table}`);
  }

  private operationOptions(): MongoOperationOptionsLike | undefined {
    return this.session ? { session: this.session } : undefined;
  }
}

function parseOrderBy(orderBy?: string): Record<string, 1 | -1> | undefined {
  if (!orderBy) return undefined;
  const [field, direction] = orderBy.trim().split(/\s+/);
  if (!field) return undefined;
  return { [field]: direction?.toLowerCase() === 'desc' ? -1 : 1 };
}
