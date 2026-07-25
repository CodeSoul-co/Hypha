import { describe, expect, it } from 'vitest';
import type { MemoryManagementCapabilities, NormalizedMemoryError } from './contracts';
import type { StructuredQuery, StructuredStoreProvider } from './index';
import {
  StructuredMemoryRuntimeControlStore,
  type MemoryRuntimeActiveState,
  type MemoryRuntimeRevisionState,
} from './memory-runtime-coordinator';
import { sha256 } from './memory-utils';

describe('StructuredMemoryRuntimeControlStore', () => {
  it('atomically fences active revision changes and persists revision history', async () => {
    const provider = new TestStructuredStore();
    const first = new StructuredMemoryRuntimeControlStore({ provider });
    const second = new StructuredMemoryRuntimeControlStore({ provider });
    const revisionOne = state('profile:r1', 1);

    await expect(first.activate('memory:shared', null, revisionOne)).resolves.toBe(true);
    await expect(second.activate('memory:shared', null, state('profile:stale', 1))).resolves.toBe(
      false
    );

    const draining: MemoryRuntimeRevisionState = {
      ...revisionOne,
      id: revisionId('profile:r1'),
      status: 'draining',
    };
    const revisionTwo = state('profile:r2', 2);
    await expect(second.activate('memory:shared', 1, revisionTwo, draining)).resolves.toBe(true);
    await expect(first.getActive('memory:shared')).resolves.toMatchObject({
      profileRevision: 'profile:r2',
      generation: 2,
      status: 'active',
    });
    await expect(first.listRevisions('memory:shared')).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ profileRevision: 'profile:r1', status: 'draining' }),
        expect.objectContaining({ profileRevision: 'profile:r2', status: 'active' }),
      ])
    );
  });

  it('persists quarantine as a fenced active generation', async () => {
    const provider = new TestStructuredStore();
    const store = new StructuredMemoryRuntimeControlStore({ provider });
    const active = state('profile:r1', 1);
    await store.activate('memory:shared', null, active);
    const quarantineError: NormalizedMemoryError = {
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      message: 'capability drift',
      retryable: false,
      details: { quarantined: true, capabilityDrift: true },
    };
    const quarantined: MemoryRuntimeActiveState = {
      ...active,
      generation: 2,
      status: 'quarantined',
      quarantineError,
    };

    await expect(store.activate('memory:shared', 1, quarantined)).resolves.toBe(true);
    await expect(store.getActive('memory:shared')).resolves.toMatchObject({
      status: 'quarantined',
      generation: 2,
      quarantineError: { details: { capabilityDrift: true } },
    });
    await expect(store.getRevision('memory:shared', 'profile:r1')).resolves.toMatchObject({
      status: 'quarantined',
      generation: 2,
    });
  });
});

class TestStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, unknown>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    const value = this.table(table).get(id);
    return value === undefined ? null : structuredClone(value as T);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    if (this.table(table).has(record.id)) throw new Error(`duplicate record: ${record.id}`);
    this.table(table).set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id);
    if (!current) throw new Error(`record not found: ${table}/${id}`);
    this.table(table).set(id, structuredClone({ ...(current as object), ...(patch as object) }));
  }

  async delete(table: string, id: string): Promise<void> {
    this.table(table).delete(id);
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return [...this.table(table).values()]
      .filter((value) =>
        Object.entries(query.where ?? {}).every(
          ([key, expected]) => (value as Record<string, unknown>)[key] === expected
        )
      )
      .slice(0, query.limit)
      .map((value) => structuredClone(value as T));
  }

  transaction<T>(operation: (transaction: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return operation(this);
  }

  private table(name: string): Map<string, unknown> {
    const current = this.tables.get(name);
    if (current) return current;
    const created = new Map<string, unknown>();
    this.tables.set(name, created);
    return created;
  }
}

function state(revision: string, generation: number): MemoryRuntimeActiveState {
  const capabilities = capabilitySnapshot();
  return {
    id: 'memory:shared',
    coordinatorId: 'memory:shared',
    profileId: 'memory.profile.default',
    profileRevision: revision,
    providerId: `provider:${revision}`,
    providerRevision: `provider-revision:${revision}`,
    runtimeId: `runtime:${revision}`,
    profileHash: sha256(revision),
    capabilityHash: sha256(capabilities),
    capabilitySnapshot: capabilities,
    status: 'active',
    generation,
    observedAt: '2026-07-24T00:00:00.000Z',
  };
}

function revisionId(revision: string): string {
  return `memory:shared:revision:${sha256(revision).slice(7, 31)}`;
}

function capabilitySnapshot(): MemoryManagementCapabilities {
  return {
    add: true,
    search: true,
    get: true,
    list: true,
    update: true,
    delete: true,
    deleteByFilter: false,
    history: true,
    summarize: false,
    consolidate: false,
    decay: false,
    reinforce: false,
    conflictDetection: false,
    hybridSearch: false,
    graphRelations: false,
    asyncWrite: false,
    batchOperations: false,
  };
}
