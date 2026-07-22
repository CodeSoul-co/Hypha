import type { NormalizedMemoryError } from './contracts';
import type { StructuredStoreProvider } from './index';
import type {
  MemoryIndexOutboxRecord,
  MemoryIndexOutboxStore,
  MemoryPersistenceCapabilities,
  MemoryPersistenceTransaction,
  MemoryPersistenceUnitOfWork,
} from './managed-store';
import { StructuredManagedMemoryRecordStore } from './structured-managed-store';

export interface StructuredMemoryIndexOutboxStoreOptions {
  provider: StructuredStoreProvider;
  table?: string;
  inTransaction?: boolean;
}

export class StructuredMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
  private readonly table: string;

  constructor(private readonly options: StructuredMemoryIndexOutboxStoreOptions) {
    this.table = options.table ?? 'managed_memory_index_outbox';
  }

  async enqueue(record: MemoryIndexOutboxRecord): Promise<void> {
    await this.mutate(async (provider) => {
      if (await provider.get<MemoryIndexOutboxRecord>(this.table, record.id)) return;
      await provider.insert(this.table, structuredClone(record));
    });
  }

  async lease(
    owner: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryIndexOutboxRecord[]> {
    return this.mutate(async (provider) => {
      const records = await provider.query<MemoryIndexOutboxRecord>(this.table, {});
      const available = records
        .filter(
          (record) =>
            record.availableAt <= now &&
            (record.state === 'pending' ||
              record.state === 'failed' ||
              (record.state === 'processing' && (record.leaseExpiresAt ?? '') <= now))
        )
        .sort((left, right) =>
          left.availableAt === right.availableAt
            ? left.id.localeCompare(right.id)
            : left.availableAt.localeCompare(right.availableAt)
        )
        .slice(0, limit);
      for (const record of available) {
        await provider.update<MemoryIndexOutboxRecord>(this.table, record.id, {
          state: 'processing',
          leaseOwner: owner,
          leaseToken: outboxLeaseToken(owner, record.id, record.attempts + 1, leaseUntil),
          leaseExpiresAt: leaseUntil,
          attempts: record.attempts + 1,
          updatedAt: now,
        });
      }
      return available.map((record) => ({
        ...structuredClone(record),
        state: 'processing',
        leaseOwner: owner,
        leaseToken: outboxLeaseToken(owner, record.id, record.attempts + 1, leaseUntil),
        leaseExpiresAt: leaseUntil,
        attempts: record.attempts + 1,
        updatedAt: now,
      }));
    });
  }

  async complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean> {
    return this.mutate(async (provider) => {
      const record = await provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken)) return false;
      await provider.update<MemoryIndexOutboxRecord>(this.table, id, {
        state: 'completed',
        updatedAt: now,
        leaseOwner: undefined,
        leaseToken: undefined,
        leaseExpiresAt: undefined,
      });
      return true;
    });
  }

  async fail(
    id: string,
    owner: string,
    leaseToken: string,
    error: NormalizedMemoryError,
    retryAt: string,
    deadLetter = false
  ): Promise<boolean> {
    return this.mutate(async (provider) => {
      const record = await provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken)) return false;
      await provider.update<MemoryIndexOutboxRecord>(this.table, id, {
        state: deadLetter ? 'dead_letter' : 'failed',
        lastError: error,
        availableAt: retryAt,
        updatedAt: retryAt,
        leaseOwner: undefined,
        leaseToken: undefined,
        leaseExpiresAt: undefined,
      });
      return true;
    });
  }

  async list(): Promise<MemoryIndexOutboxRecord[]> {
    const records = await this.options.provider.query<MemoryIndexOutboxRecord>(this.table, {});
    return records
      .sort(
        (left, right) =>
          left.createdAt.localeCompare(right.createdAt) || left.id.localeCompare(right.id)
      )
      .map((record) => structuredClone(record));
  }

  transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T> {
    if (this.options.inTransaction) return fn(this);
    return this.options.provider.transaction((provider) =>
      fn(new StructuredMemoryIndexOutboxStore({ ...this.options, provider, inTransaction: true }))
    );
  }

  private mutate<T>(operation: (provider: StructuredStoreProvider) => Promise<T>): Promise<T> {
    if (this.options.inTransaction) return operation(this.options.provider);
    return this.options.provider.transaction(operation);
  }
}

export interface StructuredMemoryPersistenceUnitOfWorkOptions {
  provider: StructuredStoreProvider;
  currentTable?: string;
  versionsTable?: string;
  outboxTable?: string;
}

export class StructuredMemoryPersistenceUnitOfWork implements MemoryPersistenceUnitOfWork {
  readonly capabilities: MemoryPersistenceCapabilities = {
    durable: true,
    atomicRecordAndOutbox: true,
  };
  readonly recordStore: StructuredManagedMemoryRecordStore;
  readonly outboxStore: StructuredMemoryIndexOutboxStore;

  constructor(private readonly options: StructuredMemoryPersistenceUnitOfWorkOptions) {
    this.recordStore = this.createRecordStore(options.provider, false);
    this.outboxStore = this.createOutboxStore(options.provider, false);
  }

  transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T> {
    return this.options.provider.transaction((provider) =>
      fn({
        recordStore: this.createRecordStore(provider, true),
        outboxStore: this.createOutboxStore(provider, true),
      })
    );
  }

  private createRecordStore(
    provider: StructuredStoreProvider,
    inTransaction: boolean
  ): StructuredManagedMemoryRecordStore {
    return new StructuredManagedMemoryRecordStore({
      provider,
      currentTable: this.options.currentTable,
      versionsTable: this.options.versionsTable,
      inTransaction,
    });
  }

  private createOutboxStore(
    provider: StructuredStoreProvider,
    inTransaction: boolean
  ): StructuredMemoryIndexOutboxStore {
    return new StructuredMemoryIndexOutboxStore({
      provider,
      table: this.options.outboxTable,
      inTransaction,
    });
  }
}

function outboxLeaseToken(owner: string, id: string, attempt: number, leaseUntil: string): string {
  return owner + ':' + id + ':' + attempt + ':' + leaseUntil;
}

function hasOutboxLease(
  record: MemoryIndexOutboxRecord | null,
  owner: string,
  leaseToken: string
): record is MemoryIndexOutboxRecord {
  return (
    record?.state === 'processing' &&
    record.leaseOwner === owner &&
    record.leaseToken === leaseToken
  );
}
