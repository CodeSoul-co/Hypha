import type { ManagedMemoryRecord, ManagedMemoryScope, MemoryStatus } from './contracts';
import type { StructuredStoreProvider } from './index';
import {
  matchesFilter,
  type ManagedMemoryRecordQuery,
  type ManagedMemoryRecordStore,
} from './managed-store';
import type { ProviderHealth } from './operations';
import { hashMemoryScope, memoryError } from './memory-utils';

interface StoredManagedMemoryRow {
  id: string;
  memoryId: string;
  versionId: string;
  revision: number;
  scopeHash: string;
  record: ManagedMemoryRecord;
}

export interface StructuredManagedMemoryRecordStoreOptions {
  provider: StructuredStoreProvider;
  currentTable?: string;
  versionsTable?: string;
  inTransaction?: boolean;
  now?: () => Date;
}

export class StructuredManagedMemoryRecordStore implements ManagedMemoryRecordStore {
  private readonly currentTable: string;
  private readonly versionsTable: string;
  private readonly now: () => Date;

  constructor(private readonly options: StructuredManagedMemoryRecordStoreOptions) {
    this.currentTable = options.currentTable ?? 'managed_memory_current';
    this.versionsTable = options.versionsTable ?? 'managed_memory_versions';
    this.now = options.now ?? (() => new Date());
  }

  async create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord> {
    this.assertScopeHash(record);
    return this.mutate(async (provider) => {
      const id = currentRowId(record.scopeHash, record.id);
      if (await provider.get<StoredManagedMemoryRow>(this.currentTable, id)) {
        throw memoryError('MEMORY_IDEMPOTENCY_CONFLICT', 'Memory already exists: ' + record.id);
      }
      const row = toRow(record, id);
      await provider.insert(this.currentTable, row);
      await provider.insert(
        this.versionsTable,
        toRow(record, versionRowId(record.scopeHash, record.id, record.versionId))
      );
      return cloneRecord(record);
    });
  }

  async get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null> {
    const row = await this.options.provider.get<StoredManagedMemoryRow>(
      this.currentTable,
      currentRowId(hashMemoryScope(scope), id)
    );
    return row ? cloneRecord(row.record) : null;
  }

  async getVersionByScopeHash(
    id: string,
    versionId: string,
    scopeHash: string
  ): Promise<ManagedMemoryRecord | null> {
    const row = await this.options.provider.get<StoredManagedMemoryRow>(
      this.versionsTable,
      versionRowId(scopeHash, id, versionId)
    );
    return row ? cloneRecord(row.record) : null;
  }

  async list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]> {
    const scopeHash = hashMemoryScope(request.scope);
    const rows = await this.options.provider.query<StoredManagedMemoryRow>(this.currentTable, {
      where: { scopeHash },
    });
    return rows
      .map((row) => row.record)
      .filter((record) => request.includeSuperseded || record.status !== 'superseded')
      .filter((record) => request.includeInvalidated || record.status !== 'invalidated')
      .filter((record) => record.status !== 'deleted')
      .filter((record) => matchesFilter(record, request.filter))
      .sort(compareRecords)
      .slice(0, request.limit ?? rows.length)
      .map(cloneRecord);
  }

  async createVersion(
    record: ManagedMemoryRecord,
    expectedRevision: number
  ): Promise<ManagedMemoryRecord> {
    this.assertScopeHash(record);
    return this.mutate(async (provider) => {
      const id = currentRowId(record.scopeHash, record.id);
      const current = await provider.get<StoredManagedMemoryRow>(this.currentTable, id);
      if (!current) throw memoryError('MEMORY_NOT_FOUND', 'Memory not found: ' + record.id);
      if (current.record.revision !== expectedRevision) {
        throw memoryError(
          'MEMORY_REVISION_CONFLICT',
          'Expected revision ' + expectedRevision + ', found ' + current.record.revision
        );
      }
      if (record.revision !== expectedRevision + 1) {
        throw memoryError(
          'MEMORY_REVISION_CONFLICT',
          'New revision must be ' + (expectedRevision + 1)
        );
      }
      const versionId = versionRowId(record.scopeHash, record.id, record.versionId);
      if (await provider.get<StoredManagedMemoryRow>(this.versionsTable, versionId)) {
        throw memoryError(
          'MEMORY_IDEMPOTENCY_CONFLICT',
          'Memory version already exists: ' + record.versionId
        );
      }
      const next = toRow(record, id);
      await provider.update<StoredManagedMemoryRow>(this.currentTable, id, next);
      await provider.insert(this.versionsTable, toRow(record, versionId));
      return cloneRecord(record);
    });
  }

  async updateStatus(
    id: string,
    scope: ManagedMemoryScope,
    expectedRevision: number,
    status: MemoryStatus,
    updatedAt: string
  ): Promise<ManagedMemoryRecord> {
    const current = await this.get(id, scope);
    if (!current) throw memoryError('MEMORY_NOT_FOUND', 'Memory not found: ' + id);
    return this.createVersion(
      {
        ...current,
        versionId: id + ':v' + (expectedRevision + 1),
        revision: expectedRevision + 1,
        status,
        updatedAt,
      },
      expectedRevision
    );
  }

  async delete(id: string, scope: ManagedMemoryScope): Promise<void> {
    const scopeHash = hashMemoryScope(scope);
    await this.mutate(async (provider) => {
      await provider.delete(this.currentTable, currentRowId(scopeHash, id));
      const versions = await provider.query<StoredManagedMemoryRow>(this.versionsTable, {
        where: { scopeHash, memoryId: id },
      });
      for (const version of versions) await provider.delete(this.versionsTable, version.id);
    });
  }

  async history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]> {
    const rows = await this.options.provider.query<StoredManagedMemoryRow>(this.versionsTable, {
      where: { scopeHash: hashMemoryScope(scope), memoryId: id },
    });
    return rows
      .sort((left, right) => left.revision - right.revision)
      .map((row) => cloneRecord(row.record));
  }

  async transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T> {
    if (this.options.inTransaction) return fn(this);
    return this.options.provider.transaction((provider) =>
      fn(
        new StructuredManagedMemoryRecordStore({
          ...this.options,
          provider,
          inTransaction: true,
        })
      )
    );
  }

  async health(): Promise<ProviderHealth> {
    try {
      await this.options.provider.query(this.currentTable, { limit: 1 });
      return {
        status: 'healthy',
        checkedAt: this.now().toISOString(),
        details: {
          provider: 'structured',
          currentTable: this.currentTable,
          versionsTable: this.versionsTable,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now().toISOString(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private mutate<T>(operation: (provider: StructuredStoreProvider) => Promise<T>): Promise<T> {
    if (this.options.inTransaction) return operation(this.options.provider);
    return this.options.provider.transaction(operation);
  }

  private assertScopeHash(record: ManagedMemoryRecord): void {
    const expected = hashMemoryScope(record.scope);
    if (record.scopeHash !== expected) {
      throw memoryError(
        'MEMORY_SCOPE_DENIED',
        'Memory scope hash does not match its explicit scope.'
      );
    }
  }
}

function toRow(record: ManagedMemoryRecord, id: string): StoredManagedMemoryRow {
  return {
    id,
    memoryId: record.id,
    versionId: record.versionId,
    revision: record.revision,
    scopeHash: record.scopeHash,
    record: cloneRecord(record),
  };
}

function currentRowId(scopeHash: string, memoryId: string): string {
  return scopeHash + ':' + encodeURIComponent(memoryId);
}

function versionRowId(scopeHash: string, memoryId: string, versionId: string): string {
  return currentRowId(scopeHash, memoryId) + ':' + encodeURIComponent(versionId);
}

function compareRecords(left: ManagedMemoryRecord, right: ManagedMemoryRecord): number {
  const time = right.updatedAt.localeCompare(left.updatedAt);
  return time !== 0 ? time : left.id.localeCompare(right.id);
}

function cloneRecord(record: ManagedMemoryRecord): ManagedMemoryRecord {
  return structuredClone(record);
}
