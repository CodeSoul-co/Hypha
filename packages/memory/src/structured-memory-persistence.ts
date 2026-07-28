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
    if (this.options.provider.compareAndSet) {
      const records = await this.options.provider.query<MemoryIndexOutboxRecord>(this.table, {});
      const available = availableOutboxRecords(records, now, limit);
      const leased: MemoryIndexOutboxRecord[] = [];
      for (const record of available) {
        const next = leasedOutboxRecord(record, owner, now, leaseUntil);
        const claimed = await this.options.provider.compareAndSet<MemoryIndexOutboxRecord>(
          this.table,
          record.id,
          outboxRecordVersion(record),
          next
        );
        if (claimed) leased.push(next);
      }
      return leased.map((record) => structuredClone(record));
    }
    return this.mutate(async (provider) => {
      const records = await provider.query<MemoryIndexOutboxRecord>(this.table, {});
      const available = availableOutboxRecords(records, now, limit);
      for (const record of available) {
        await provider.update<MemoryIndexOutboxRecord>(
          this.table,
          record.id,
          leasedOutboxRecord(record, owner, now, leaseUntil)
        );
      }
      return available.map((record) => leasedOutboxRecord(record, owner, now, leaseUntil));
    });
  }

  async renew(
    id: string,
    owner: string,
    leaseToken: string,
    now: string,
    leaseUntil: string
  ): Promise<boolean> {
    if (this.options.provider.compareAndSet) {
      const record = await this.options.provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now) || leaseUntil <= now) return false;
      return this.options.provider.compareAndSet<MemoryIndexOutboxRecord>(
        this.table,
        id,
        outboxLeaseVersion(record),
        { leaseExpiresAt: leaseUntil, updatedAt: now }
      );
    }
    return this.mutate(async (provider) => {
      const record = await provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now) || leaseUntil <= now) return false;
      await provider.update<MemoryIndexOutboxRecord>(this.table, id, {
        leaseExpiresAt: leaseUntil,
        updatedAt: now,
      });
      return true;
    });
  }

  async complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean> {
    if (this.options.provider.compareAndSet) {
      const record = await this.options.provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now)) return false;
      return this.options.provider.compareAndSet<MemoryIndexOutboxRecord>(
        this.table,
        id,
        outboxLeaseVersion(record),
        {
          state: 'completed',
          updatedAt: now,
          leaseOwner: undefined,
          leaseToken: undefined,
          leaseExpiresAt: undefined,
        }
      );
    }
    return this.mutate(async (provider) => {
      const record = await provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now)) return false;
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
    now: string,
    error: NormalizedMemoryError,
    retryAt: string,
    deadLetter = false
  ): Promise<boolean> {
    if (this.options.provider.compareAndSet) {
      const record = await this.options.provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now)) return false;
      return this.options.provider.compareAndSet<MemoryIndexOutboxRecord>(
        this.table,
        id,
        outboxLeaseVersion(record),
        {
          state: deadLetter ? 'dead_letter' : 'failed',
          lastError: error,
          availableAt: retryAt,
          updatedAt: retryAt,
          leaseOwner: undefined,
          leaseToken: undefined,
          leaseExpiresAt: undefined,
        }
      );
    }
    return this.mutate(async (provider) => {
      const record = await provider.get<MemoryIndexOutboxRecord>(this.table, id);
      if (!hasOutboxLease(record, owner, leaseToken, now)) return false;
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

function outboxLeaseToken(owner: string, id: string, fencingToken: number): string {
  return owner + ':' + id + ':' + fencingToken;
}

function availableOutboxRecords(
  records: MemoryIndexOutboxRecord[],
  now: string,
  limit: number
): MemoryIndexOutboxRecord[] {
  return records
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
}

function leasedOutboxRecord(
  record: MemoryIndexOutboxRecord,
  owner: string,
  now: string,
  leaseUntil: string
): MemoryIndexOutboxRecord {
  const fencingToken = (record.fencingToken ?? 0) + 1;
  return {
    ...structuredClone(record),
    state: 'processing',
    leaseOwner: owner,
    leaseToken: outboxLeaseToken(owner, record.id, fencingToken),
    leaseExpiresAt: leaseUntil,
    fencingToken,
    attempts: record.attempts + 1,
    updatedAt: now,
  };
}

function outboxRecordVersion(record: MemoryIndexOutboxRecord): Partial<MemoryIndexOutboxRecord> {
  return {
    state: record.state,
    attempts: record.attempts,
    updatedAt: record.updatedAt,
    ...(record.fencingToken === undefined ? {} : { fencingToken: record.fencingToken }),
  };
}

function outboxLeaseVersion(record: MemoryIndexOutboxRecord): Partial<MemoryIndexOutboxRecord> {
  return {
    ...outboxRecordVersion(record),
    leaseOwner: record.leaseOwner,
    leaseToken: record.leaseToken,
    leaseExpiresAt: record.leaseExpiresAt,
  };
}
function hasOutboxLease(
  record: MemoryIndexOutboxRecord | null,
  owner: string,
  leaseToken: string,
  now: string
): record is MemoryIndexOutboxRecord {
  return (
    record?.state === 'processing' &&
    record.leaseOwner === owner &&
    record.leaseToken === leaseToken &&
    (record.leaseExpiresAt ?? '') > now
  );
}
