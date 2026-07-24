import type { StructuredQuery, StructuredStoreProvider } from './index';
import { isNormalizedMemoryError, memoryError, sha256 } from './memory-utils';

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

  async get<T>(table: string, id: string): Promise<T | null> {
    const record = await this.execute('get', () =>
      this.collection(table).findOne<T>({ id }, this.operationOptions())
    );
    return record === null ? null : stripMongoInternalId(record);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    await this.execute('insert', () =>
      this.collection(table).insertOne(structuredClone(record), this.operationOptions())
    );
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const result = await this.execute('update', () =>
      this.collection(table).updateOne(
        { id },
        { $set: structuredClone(patch) as Record<string, unknown> },
        this.operationOptions()
      )
    );
    if (result.matchedCount === 0) {
      throw memoryError('MEMORY_NOT_FOUND', `Structured record not found: ${table}/${id}`);
    }
  }

  async delete(table: string, id: string): Promise<void> {
    await this.execute('delete', () =>
      this.collection(table).deleteOne({ id }, this.operationOptions())
    );
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return this.execute('query', async () => {
      let cursor = this.collection(table).find<T>(query.where ?? {}, this.operationOptions());
      const order = parseOrderBy(query.orderBy);
      if (order && cursor.sort) cursor = cursor.sort(order);
      if (query.limit !== undefined && cursor.limit) cursor = cursor.limit(query.limit);
      const records = await cursor.toArray();
      return records.map((record) => stripMongoInternalId(record));
    });
  }

  async transaction<T>(operation: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    if (this.session || this.transactionMode === 'disabled') {
      return this.execute('transaction', () => operation(this));
    }
    let session: MongoSessionLike | undefined;
    let result: T | undefined;
    let failure: unknown;
    try {
      session = this.options.database.startSession?.();
      if (!session) {
        if (this.transactionMode === 'preferred') return await operation(this);
        throw memoryError(
          'MEMORY_STORE_UNAVAILABLE',
          'Mongo transactions are required for atomic Memory record and outbox commits.'
        );
      }
      result = await session.withTransaction(() =>
        operation(new MongoStructuredStoreProvider(this.options, session))
      );
    } catch (error) {
      failure = normalizeMongoStructuredStoreError(error, 'transaction');
    }
    if (session) {
      try {
        await session.endSession();
      } catch (error) {
        if (!failure) failure = normalizeMongoStructuredStoreError(error, 'end_session');
      }
    }
    if (failure) throw failure;
    return result as T;
  }

  supportsTransactions(): boolean {
    return this.transactionMode !== 'disabled' && Boolean(this.options.database.startSession);
  }

  async initialize(collections: readonly string[]): Promise<void> {
    for (const table of collections) {
      await this.execute('initialize', async () => {
        const collection = this.collection(table);
        await collection.createIndex?.({ id: 1 }, { unique: true, name: 'memory_id_unique' });
      });
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
        message: normalizeMongoStructuredStoreError(error, 'health').message,
      };
    }
  }

  private async execute<T>(operation: string, run: () => Promise<T>): Promise<T> {
    try {
      return await run();
    } catch (error) {
      throw normalizeMongoStructuredStoreError(error, operation);
    }
  }
  private collection(table: string): MongoCollectionLike {
    return this.options.database.collection(`${this.collectionPrefix}${table}`);
  }

  private operationOptions(): MongoOperationOptionsLike | undefined {
    return this.session ? { session: this.session } : undefined;
  }
}

function stripMongoInternalId<T>(record: T): T {
  if (!record || typeof record !== 'object' || Array.isArray(record))
    return structuredClone(record);
  const { _id: _mongoId, ...value } = record as Record<string, unknown>;
  return structuredClone(value) as T;
}
function parseOrderBy(orderBy?: string): Record<string, 1 | -1> | undefined {
  if (!orderBy) return undefined;
  const [field, direction] = orderBy.trim().split(/\s+/);
  if (!field) return undefined;
  return { [field]: direction?.toLowerCase() === 'desc' ? -1 : 1 };
}
interface MongoErrorLike {
  code?: unknown;
  name?: unknown;
  status?: unknown;
  statusCode?: unknown;
}

export function normalizeMongoStructuredStoreError(error: unknown, operation: string) {
  if (isNormalizedMemoryError(error)) return error;
  const record = error && typeof error === 'object' ? (error as MongoErrorLike) : {};
  const providerCode = normalizeMongoProviderCode(
    record.code ?? record.name ?? 'UNKNOWN_MONGO_ERROR'
  );
  const status =
    typeof (record.status ?? record.statusCode) === 'number'
      ? ((record.status ?? record.statusCode) as number)
      : undefined;
  let code: Parameters<typeof memoryError>[0] = 'MEMORY_STORE_UNAVAILABLE';
  let retryable = true;
  if (providerCode === 'MONGO_CODE_50' || providerCode.includes('TIMEOUT')) {
    code = 'MEMORY_PROVIDER_TIMEOUT';
  } else if (
    providerCode === 'MONGO_CODE_18' ||
    providerCode === 'MONGO_CODE_13' ||
    providerCode.includes('AUTHENTICATION') ||
    providerCode.includes('AUTHORIZATION') ||
    status === 401 ||
    status === 403
  ) {
    code = 'MEMORY_PERMISSION_DENIED';
    retryable = false;
  } else if (
    providerCode === 'MONGO_CODE_11000' ||
    providerCode === 'MONGO_CODE_112' ||
    providerCode.includes('DUPLICATE') ||
    providerCode.includes('WRITE_CONFLICT') ||
    status === 409
  ) {
    code = 'MEMORY_REVISION_CONFLICT';
  } else if (
    providerCode === 'MONGO_CODE_121' ||
    providerCode.includes('VALIDATION') ||
    status === 400
  ) {
    code = 'MEMORY_INVALID_INPUT';
    retryable = false;
  }
  return {
    ...memoryError(code, mongoSafeMessage(code), retryable, {
      operation,
      provider: 'mongodb',
      providerCode,
    }),
    providerCode,
    causeRef: sha256({ providerCode, operation }),
  };
}

function normalizeMongoProviderCode(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) return `MONGO_CODE_${value}`;
  return (
    String(value)
      .toUpperCase()
      .replace(/[^A-Z0-9_]/g, '_')
      .slice(0, 64) || 'UNKNOWN_MONGO_ERROR'
  );
}

function mongoSafeMessage(code: Parameters<typeof memoryError>[0]): string {
  if (code === 'MEMORY_PROVIDER_TIMEOUT') return 'Mongo Memory store operation timed out.';
  if (code === 'MEMORY_PERMISSION_DENIED') return 'Mongo Memory store denied access.';
  if (code === 'MEMORY_REVISION_CONFLICT') return 'Mongo Memory store reported a write conflict.';
  if (code === 'MEMORY_INVALID_INPUT') return 'Mongo Memory store rejected invalid input.';
  return 'Mongo Memory store is unavailable.';
}
