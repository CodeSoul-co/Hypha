import type { ManagedMemoryRecord, ManagedMemoryScope, MemoryStatus } from './contracts';
import type { MemorySearchFilter, ProviderHealth } from './operations';
import { hashMemoryScope, memoryError } from './memory-utils';

export interface ManagedMemoryRecordQuery {
  scope: ManagedMemoryScope;
  filter?: MemorySearchFilter;
  includeSuperseded?: boolean;
  includeInvalidated?: boolean;
  limit?: number;
}

export interface ManagedMemoryRecordStore {
  create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord>;
  get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null>;
  getVersionByScopeHash(
    id: string,
    versionId: string,
    scopeHash: string
  ): Promise<ManagedMemoryRecord | null>;
  list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]>;
  createVersion(
    record: ManagedMemoryRecord,
    expectedRevision: number
  ): Promise<ManagedMemoryRecord>;
  updateStatus(
    id: string,
    scope: ManagedMemoryScope,
    expectedRevision: number,
    status: MemoryStatus,
    updatedAt: string
  ): Promise<ManagedMemoryRecord>;
  delete(id: string, scope: ManagedMemoryScope): Promise<void>;
  history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]>;
  transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T>;
  health(): Promise<ProviderHealth>;
}

export interface MemoryIdempotencyStore {
  get(scopeHash: string, key: string): Promise<unknown | null>;
  set(scopeHash: string, key: string, result: unknown): Promise<void>;
}

export interface MemoryIndexOutboxRecord {
  id: string;
  operationId: string;
  memoryId: string;
  memoryVersionId: string;
  scopeHash: string;
  action: 'upsert' | 'delete' | 'reindex';
  targetVectorStoreIds: string[];
  state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed' | 'dead_letter';
  attempts: number;
  availableAt: string;
  completedVectorStoreIds?: string[];
  leaseOwner?: string;
  leaseExpiresAt?: string;
  lastError?: import('./contracts').NormalizedMemoryError;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryIndexOutboxStore {
  enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
  lease(
    owner: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryIndexOutboxRecord[]>;
  complete(id: string, now: string): Promise<void>;
  fail(
    id: string,
    error: import('./contracts').NormalizedMemoryError,
    retryAt: string,
    deadLetter?: boolean
  ): Promise<void>;
  list(): Promise<MemoryIndexOutboxRecord[]>;
}

export class InMemoryManagedMemoryRecordStore implements ManagedMemoryRecordStore {
  private records = new Map<string, ManagedMemoryRecord>();
  private versions = new Map<string, ManagedMemoryRecord[]>();

  async create(record: ManagedMemoryRecord): Promise<ManagedMemoryRecord> {
    const key = recordKey(record.scope, record.id);
    if (this.records.has(key))
      throw memoryError('MEMORY_IDEMPOTENCY_CONFLICT', `Memory already exists: ${record.id}`);
    const copy = cloneRecord(record);
    this.records.set(key, copy);
    this.versions.set(key, [copy]);
    return cloneRecord(copy);
  }

  async get(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord | null> {
    const record = this.records.get(recordKey(scope, id));
    return record ? cloneRecord(record) : null;
  }

  async getVersionByScopeHash(
    id: string,
    versionId: string,
    scopeHash: string
  ): Promise<ManagedMemoryRecord | null> {
    const records = this.versions.get(`${scopeHash}:${id}`);
    const record = records?.find((candidate) => candidate.versionId === versionId);
    return record ? cloneRecord(record) : null;
  }

  async list(request: ManagedMemoryRecordQuery): Promise<ManagedMemoryRecord[]> {
    const scopeHash = hashMemoryScope(request.scope);
    const records = Array.from(this.records.values())
      .filter((record) => record.scopeHash === scopeHash)
      .filter((record) => request.includeSuperseded || record.status !== 'superseded')
      .filter((record) => request.includeInvalidated || record.status !== 'invalidated')
      .filter((record) => record.status !== 'deleted')
      .filter((record) => matchesFilter(record, request.filter));
    return records.slice(0, request.limit ?? records.length).map(cloneRecord);
  }

  async createVersion(
    record: ManagedMemoryRecord,
    expectedRevision: number
  ): Promise<ManagedMemoryRecord> {
    const key = recordKey(record.scope, record.id);
    const current = this.records.get(key);
    if (!current) throw memoryError('MEMORY_NOT_FOUND', `Memory not found: ${record.id}`);
    if (current.revision !== expectedRevision) {
      throw memoryError(
        'MEMORY_REVISION_CONFLICT',
        `Expected revision ${expectedRevision}, found ${current.revision}`
      );
    }
    if (record.revision !== expectedRevision + 1) {
      throw memoryError('MEMORY_REVISION_CONFLICT', `New revision must be ${expectedRevision + 1}`);
    }
    const copy = cloneRecord(record);
    this.records.set(key, copy);
    const history = this.versions.get(key) ?? [];
    history.push(copy);
    this.versions.set(key, history);
    return cloneRecord(copy);
  }

  async updateStatus(
    id: string,
    scope: ManagedMemoryScope,
    expectedRevision: number,
    status: MemoryStatus,
    updatedAt: string
  ): Promise<ManagedMemoryRecord> {
    const current = await this.get(id, scope);
    if (!current) throw memoryError('MEMORY_NOT_FOUND', `Memory not found: ${id}`);
    return this.createVersion(
      {
        ...current,
        versionId: `${id}:v${expectedRevision + 1}`,
        revision: expectedRevision + 1,
        status,
        updatedAt,
      },
      expectedRevision
    );
  }

  async delete(id: string, scope: ManagedMemoryScope): Promise<void> {
    const key = recordKey(scope, id);
    this.records.delete(key);
  }

  async history(id: string, scope: ManagedMemoryScope): Promise<ManagedMemoryRecord[]> {
    return (this.versions.get(recordKey(scope, id)) ?? []).map(cloneRecord);
  }

  async transaction<T>(fn: (store: ManagedMemoryRecordStore) => Promise<T>): Promise<T> {
    const recordsSnapshot = new Map(this.records);
    const versionsSnapshot = new Map(
      Array.from(this.versions.entries()).map(([key, records]) => [key, [...records]])
    );
    try {
      return await fn(this);
    } catch (error) {
      this.records = recordsSnapshot;
      this.versions = versionsSnapshot;
      throw error;
    }
  }

  async health(): Promise<ProviderHealth> {
    return { status: 'healthy', checkedAt: new Date().toISOString() };
  }
}

export class InMemoryMemoryIdempotencyStore implements MemoryIdempotencyStore {
  private readonly values = new Map<string, unknown>();
  async get(scopeHash: string, key: string): Promise<unknown | null> {
    return this.values.get(`${scopeHash}:${key}`) ?? null;
  }
  async set(scopeHash: string, key: string, result: unknown): Promise<void> {
    this.values.set(`${scopeHash}:${key}`, result);
  }
}

export class InMemoryMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
  private readonly records = new Map<string, MemoryIndexOutboxRecord>();
  async enqueue(record: MemoryIndexOutboxRecord): Promise<void> {
    if (!this.records.has(record.id)) this.records.set(record.id, { ...record });
  }
  async lease(
    owner: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryIndexOutboxRecord[]> {
    const leased = Array.from(this.records.values())
      .filter(
        (record) =>
          record.state === 'pending' ||
          record.state === 'failed' ||
          (record.state === 'processing' && (record.leaseExpiresAt ?? '') <= now)
      )
      .filter((record) => record.availableAt <= now)
      .slice(0, limit);
    for (const record of leased) {
      record.state = 'processing';
      record.leaseOwner = owner;
      record.leaseExpiresAt = leaseUntil;
      record.attempts += 1;
      record.updatedAt = now;
    }
    return leased.map((record) => ({ ...record }));
  }
  async complete(id: string, now: string): Promise<void> {
    const record = this.records.get(id);
    if (!record) return;
    record.state = 'completed';
    record.updatedAt = now;
    record.leaseOwner = undefined;
    record.leaseExpiresAt = undefined;
  }
  async fail(
    id: string,
    error: import('./contracts').NormalizedMemoryError,
    retryAt: string,
    deadLetter = false
  ): Promise<void> {
    const record = this.records.get(id);
    if (!record) return;
    record.state = deadLetter ? 'dead_letter' : 'failed';
    record.lastError = error;
    record.availableAt = retryAt;
    record.updatedAt = new Date().toISOString();
    record.leaseOwner = undefined;
    record.leaseExpiresAt = undefined;
  }
  async list(): Promise<MemoryIndexOutboxRecord[]> {
    return Array.from(this.records.values()).map((record) => ({ ...record }));
  }
}

function recordKey(scope: ManagedMemoryScope, id: string): string {
  return `${hashMemoryScope(scope)}:${id}`;
}

function cloneRecord(record: ManagedMemoryRecord): ManagedMemoryRecord {
  return structuredClone(record);
}

export function matchesFilter(record: ManagedMemoryRecord, filter?: MemorySearchFilter): boolean {
  if (!filter) return true;
  if (filter.ids && !filter.ids.includes(record.id)) return false;
  if (filter.excludeIds?.includes(record.id)) return false;
  if (filter.statuses && !filter.statuses.includes(record.status)) return false;
  if (filter.visibility && !filter.visibility.includes(record.visibility)) return false;
  if (filter.tagsAny && !filter.tagsAny.some((tag) => record.tags?.includes(tag))) return false;
  if (filter.tagsAll && !filter.tagsAll.every((tag) => record.tags?.includes(tag))) return false;
  if (filter.confidenceGte !== undefined && (record.confidence ?? 0) < filter.confidenceGte)
    return false;
  if (filter.importanceGte !== undefined && (record.importance ?? 0) < filter.importanceGte)
    return false;
  if (filter.verifiedOnly && !record.humanVerified) return false;
  return true;
}
