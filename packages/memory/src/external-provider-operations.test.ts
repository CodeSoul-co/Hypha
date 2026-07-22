import { describe, expect, it } from 'vitest';
import {
  Mem0PlatformClient,
  MemoryBankManagedClient,
  StructuredExternalProviderOperationStore,
  memoryProfileSpecExample,
  type Mem0HttpResponse,
  type StructuredQuery,
  type StructuredStoreProvider,
} from './index';

class Store implements StructuredStoreProvider {
  readonly values = new Map<string, Map<string, unknown>>();
  async get<T>(table: string, id: string): Promise<T | null> {
    return (this.values.get(table)?.get(id) as T | undefined) ?? null;
  }
  async insert<T extends { id: string }>(table: string, value: T): Promise<void> {
    this.table(table).set(value.id, structuredClone(value));
  }
  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id) as object;
    this.table(table).set(id, structuredClone({ ...current, ...patch }));
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
      .map((value) => structuredClone(value as T));
  }
  transaction<T>(run: (store: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return run(this);
  }
  private table(name: string): Map<string, unknown> {
    const current = this.values.get(name) ?? new Map<string, unknown>();
    this.values.set(name, current);
    return current;
  }
}

const principal = {
  principalId: 'user:operation',
  type: 'user' as const,
  userId: 'user:operation',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope = { userId: 'user:operation', workspaceId: 'workspace:operation' };
const response = (body: unknown): Mem0HttpResponse => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => body,
  text: async () => JSON.stringify(body),
});

describe('durable external provider operations', () => {
  it('persists Mem0 events across client restarts without storing the access token', async () => {
    const database = new Store();
    const operations = new StructuredExternalProviderOperationStore({ store: database });
    const client = new Mem0PlatformClient({
      apiToken: 'must-not-persist',
      mappingProfile: 'test',
      operationStore: operations,
      fetch: async () => response({ status: 'PENDING', event_id: 'event:1' }),
    });
    await client.add({
      operationId: 'operation:mem0:1',
      principal,
      scope,
      input: 'remember blue',
      source: { type: 'user_message', sourceId: 'message:1' },
      profileRef: memoryProfileSpecExample,
    });

    const restarted = new StructuredExternalProviderOperationStore({ store: database });
    await expect(restarted.listRecoverable()).resolves.toMatchObject([
      {
        operationId: 'operation:mem0:1',
        externalOperationId: 'event:1',
        kind: 'mem0_event',
        state: 'pending',
      },
    ]);
    expect(JSON.stringify([...database.values.values()])).not.toContain('must-not-persist');

    const resumed = new Mem0PlatformClient({
      apiToken: 'fresh-process-token',
      mappingProfile: 'test',
      operationStore: restarted,
      fetch: async () => response({ id: 'event:1', status: 'SUCCEEDED', results: [] }),
    });
    await expect(resumed.resumeEvent('operation:mem0:1')).resolves.toMatchObject({
      id: 'event:1',
      status: 'SUCCEEDED',
    });
    await expect(
      restarted.get('memory.provider.mem0.platform.v3', 'operation:mem0:1')
    ).resolves.toMatchObject({
      state: 'succeeded',
      attempts: 1,
    });
  });

  it('resumes a Vertex LRO after restart and commits its provider-scoped result', async () => {
    const database = new Store();
    const operations = new StructuredExternalProviderOperationStore({ store: database });
    let calls = 0;
    const fetch = async (): Promise<Mem0HttpResponse> => {
      calls += 1;
      return response(
        calls === 1
          ? { name: 'operations/write-1', done: false }
          : {
              name: 'operations/write-1',
              done: true,
              response: {
                generatedMemories: [
                  {
                    memory: {
                      name: 'projects/p/locations/l/reasoningEngines/e/memories/1',
                      fact: 'blue',
                      scope: { user_id: scope.userId, workspace_id: scope.workspaceId },
                    },
                  },
                ],
              },
            }
      );
    };
    const options = {
      projectId: 'p',
      location: 'l',
      reasoningEngineId: 'e',
      accessToken: 'token',
      mappingProfile: 'test' as const,
      operationStore: operations,
      fetch,
    };
    const first = new MemoryBankManagedClient(options);
    await expect(
      first.add({
        operationId: 'operation:vertex:1',
        principal,
        scope,
        input: 'blue',
        source: { type: 'user_message' as const, sourceId: 'message:1' },
        profileRef: memoryProfileSpecExample,
      })
    ).resolves.toMatchObject({ status: 'queued' });

    const restarted = new MemoryBankManagedClient(options);
    await expect(restarted.reconcileOperation('operation:vertex:1')).resolves.toMatchObject({
      status: 'committed',
      records: [{ canonicalText: 'blue', scope }],
    });
    await expect(
      operations.get('memory.provider.memorybank.vertex-ai', 'operation:vertex:1')
    ).resolves.toMatchObject({
      state: 'succeeded',
      attempts: 1,
    });
  });
});
