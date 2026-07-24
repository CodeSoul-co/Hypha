import { describe, expect, it } from 'vitest';
import {
  ExternalMemoryManagementAdapter,
  StructuredExternalMemoryMappingStore,
  hashMemoryScope,
  memoryProfileSpecExample,
  type ExternalMemoryClient,
  type ManagedMemoryScope,
  type MemoryPrincipal,
  type StructuredQuery,
  type StructuredStoreProvider,
} from './index';

class TestStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, unknown>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    const value = this.table(table).get(id);
    return value === undefined ? null : structuredClone(value as T);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    this.table(table).set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id);
    if (current) this.table(table).set(id, structuredClone({ ...(current as object), ...patch }));
  }

  async delete(table: string, id: string): Promise<void> {
    this.table(table).delete(id);
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return Array.from(this.table(table).values())
      .filter((value) =>
        Object.entries(query.where ?? {}).every(
          ([key, expected]) => (value as Record<string, unknown>)[key] === expected
        )
      )
      .map((value) => structuredClone(value as T));
  }

  transaction<T>(fn: (transaction: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return fn(this);
  }

  private table(name: string): Map<string, unknown> {
    let table = this.tables.get(name);
    if (!table) {
      table = new Map();
      this.tables.set(name, table);
    }
    return table;
  }
}

const principal: MemoryPrincipal = {
  principalId: 'user:external-reliability',
  type: 'user',
  userId: 'user:external-reliability',
  permissionScopes: ['memory:read'],
};
const scope: ManagedMemoryScope = {
  userId: 'user:external-reliability',
  workspaceId: 'workspace:external-reliability',
};

describe('external provider governance and reliability', () => {
  it('persists bidirectional provider mappings across store instances', async () => {
    const database = new TestStructuredStore();
    const first = new StructuredExternalMemoryMappingStore({ store: database });
    const mapping = {
      memoryId: 'memory:external:stable',
      providerId: 'memory.provider.remote',
      externalId: 'remote:42',
      binding: {
        scopeHash: hashMemoryScope(scope),
        profileRef: {
          id: memoryProfileSpecExample.id,
          version: memoryProfileSpecExample.version,
          revision: memoryProfileSpecExample.revision,
        },
        recordRevision: 1,
        provenance: {
          createdBy: 'external-reliability-test',
          providerId: 'memory.provider.remote',
          createdAt: '2026-07-21T00:00:00.000Z',
        },
      },
      lastSyncedAt: '2026-07-21T00:00:00.000Z',
      syncState: 'synced' as const,
    };
    await first.set(mapping);

    const restarted = new StructuredExternalMemoryMappingStore({ store: database });
    await expect(restarted.get(mapping.providerId, mapping.memoryId)).resolves.toEqual(mapping);
    await expect(
      restarted.getByExternalId(mapping.providerId, mapping.externalId)
    ).resolves.toEqual(mapping);
  });

  it('aborts the concrete client when the adapter timeout expires', async () => {
    let observedSignal: AbortSignal | undefined;
    const unavailable = async (): Promise<never> => {
      throw new Error('not used');
    };
    const client: ExternalMemoryClient = {
      capabilities: async () => ({ search: true }),
      add: unavailable,
      search: async (_request, signal) => {
        observedSignal = signal;
        return new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => reject(signal.reason), { once: true });
        });
      },
      get: unavailable,
      list: unavailable,
      delete: unavailable,
      health: async () => ({ status: 'healthy', checkedAt: '2026-07-21T00:00:00.000Z' }),
    };
    const adapter = new ExternalMemoryManagementAdapter({
      id: 'memory.provider.remote',
      client,
      timeoutMs: 5,
      retryAttempts: 0,
      circuitBreaker: { failureThreshold: 10, resetAfterMs: 1_000 },
    });

    await expect(
      adapter.search({
        operationId: 'operation:external:timeout',
        principal,
        scope,
        profileRef: {
          id: memoryProfileSpecExample.id,
          version: memoryProfileSpecExample.version,
          revision: memoryProfileSpecExample.revision,
        },
        query: 'timeout',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_TIMEOUT' });
    expect(observedSignal?.aborted).toBe(true);
  });
});
