import { describe, expect, it } from 'vitest';
import {
  InMemoryLocalVectorStoreAdapter,
  createNativeMemoryManagementProviderFactory,
  hashMemoryScope,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  type MemoryAddRequest,
  type NativeMemoryRuntimeResources,
  type RedisLikeWorkingMemoryClient,
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
    if (this.table(table).has(record.id)) throw new Error(`duplicate ${record.id}`);
    this.table(table).set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id);
    if (!current) return;
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
    const existing = this.tables.get(name);
    if (existing) return existing;
    const created = new Map<string, unknown>();
    this.tables.set(name, created);
    return created;
  }
}

class TestRedisClient implements RedisLikeWorkingMemoryClient {
  private readonly values = new Map<string, string>();
  get(key: string): Promise<string | null> {
    return Promise.resolve(this.values.get(key) ?? null);
  }
  set(key: string, value: string): Promise<unknown> {
    this.values.set(key, value);
    return Promise.resolve('OK');
  }
  del(...keys: string[]): Promise<number> {
    let deleted = 0;
    for (const key of keys) deleted += Number(this.values.delete(key));
    return Promise.resolve(deleted);
  }
  scan(_cursor: string, _match: 'MATCH', pattern: string): Promise<[string, string[]]> {
    const prefix = pattern.slice(0, -1);
    return Promise.resolve(['0', [...this.values.keys()].filter((key) => key.startsWith(prefix))]);
  }
  ping(): Promise<string> {
    return Promise.resolve('PONG');
  }
}

function addRequest(): MemoryAddRequest {
  return {
    operationId: 'operation:native:restart',
    principal: {
      principalId: 'user:native',
      type: 'user',
      userId: 'user:native',
      permissionScopes: ['memory:write'],
    },
    scope: { userId: 'user:native', runId: 'run:native' },
    profileRef: memoryProfileSpecExample,
    input: 'durable native memory',
    inputType: 'text',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: 'message:native' },
    extractionMode: 'none',
    writeMode: 'sync',
    idempotencyKey: 'native:restart',
  };
}

describe('Native Memory durable runtime', () => {
  it('recovers durable outbox and idempotency state after runtime restart', async () => {
    const structuredStore = new TestStructuredStore();
    const vectors = new InMemoryLocalVectorStoreAdapter('memory.vector.local');
    const dependencies = {
      structuredStore,
      redisClient: new TestRedisClient(),
      embeddingProvider: { embed: async () => [[1, 0, 0]] },
      vectorStores: [vectors],
      ownerId: 'worker:native',
    };
    const firstCreated = await createNativeMemoryManagementProviderFactory(dependencies).create({
      profile: memoryProfileSpecExample,
      spec: memoryManagementProviderSpecExample,
    });
    if (!('provider' in firstCreated)) throw new Error('Expected a Native provider installation.');
    const firstResult = await firstCreated.provider.add(addRequest());
    const resources = firstCreated.resources as NativeMemoryRuntimeResources;
    expect(resources.supervisor.status()).toBe('running');
    await resources.workingStore.set({
      id: 'working:restart',
      scope: addRequest().scope,
      value: 'working value',
      createdAt: '2026-07-21T00:00:00.000Z',
      updatedAt: '2026-07-21T00:00:00.000Z',
    });
    await firstCreated.close?.();
    expect(resources.supervisor.status()).toBe('stopped');

    const restartedCreated = await createNativeMemoryManagementProviderFactory(dependencies).create(
      {
        profile: memoryProfileSpecExample,
        spec: memoryManagementProviderSpecExample,
      }
    );
    if (!('provider' in restartedCreated))
      throw new Error('Expected a Native provider installation.');
    await expect(restartedCreated.provider.add(addRequest())).resolves.toEqual(firstResult);
    await expect(
      vectors.search({
        vector: [1, 0, 0],
        topK: 1,
        filter: { scopeHash: hashMemoryScope(addRequest().scope) },
      })
    ).resolves.toHaveLength(1);
    await expect(
      (restartedCreated.resources as NativeMemoryRuntimeResources).workingStore.get(
        addRequest().scope,
        'working:restart'
      )
    ).resolves.toMatchObject({ value: 'working value' });
    await restartedCreated.close?.();
  });
});
