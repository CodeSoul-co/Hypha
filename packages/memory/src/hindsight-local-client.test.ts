import { describe, expect, it } from 'vitest';
import type {
  ExternalMemoryMapping,
  ExternalMemoryMappingStore,
  ExternalProviderOperation,
  ExternalProviderOperationStore,
  ManagedMemoryScope,
  MemoryManagementProviderSpec,
  MemoryProfileSpec,
  Mem0HttpFetch,
  Mem0HttpResponse,
} from './index';
import {
  HINDSIGHT_LOCAL_FACTORY_ID,
  HINDSIGHT_LOCAL_PROTOCOL,
  HindsightLocalMemoryBankClient,
  bankIdForScope,
  createHindsightLocalMemoryProviderFactory,
  documentIdForOperation,
} from './index';

function response(body: unknown, status = 200): Mem0HttpResponse {
  const text = body === undefined ? '' : JSON.stringify(body);
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => body,
    text: async () => text,
  };
}

const principal = {
  principalId: 'principal-1',
  type: 'user' as const,
  userId: 'user-1',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = {
  tenantId: 'tenant-1',
  workspaceId: 'workspace-1',
  userId: 'user-1',
  sessionId: 'session-1',
};
const profileRef = {
  id: 'memorybank-hindsight-local',
  version: '1.0.0',
  revision: 'hindsight-0.8.5',
};

function addRequest() {
  return {
    operationId: 'operation-1',
    principal,
    scope,
    input: 'Alice works on the Hypha memory subsystem.',
    source: { type: 'user_message' as const, sourceId: 'message-1' },
    profileRef,
    tags: ['engineering'],
    metadata: {
      stringValue: 'kept',
      structuredValue: { nested: true },
      _hypha_operation_id: 'must-not-override-reserved-key',
    },
  };
}

class DurableMappingStore implements ExternalMemoryMappingStore {
  readonly durability = 'durable' as const;
  private readonly values = new Map<string, ExternalMemoryMapping>();

  async get(providerId: string, memoryId: string) {
    return this.values.get(`${providerId}:${memoryId}`) ?? null;
  }
  async getByExternalId(providerId: string, externalId: string) {
    return (
      [...this.values.values()].find(
        (value) => value.providerId === providerId && value.externalId === externalId
      ) ?? null
    );
  }
  async set(mapping: ExternalMemoryMapping) {
    this.values.set(`${mapping.providerId}:${mapping.memoryId}`, structuredClone(mapping));
  }
  async list(providerId: string) {
    return [...this.values.values()].filter((value) => value.providerId === providerId);
  }
}

class DurableOperationStore implements ExternalProviderOperationStore {
  readonly durability = 'durable' as const;
  private readonly values = new Map<string, ExternalProviderOperation>();

  async get(providerId: string, operationId: string) {
    return this.values.get(`${providerId}:${operationId}`) ?? null;
  }
  async claim(operation: ExternalProviderOperation) {
    const current = this.values.get(operation.id);
    if (current) return { operation: structuredClone(current), created: false };
    this.values.set(operation.id, structuredClone(operation));
    return { operation: structuredClone(operation), created: true };
  }
  async set(operation: ExternalProviderOperation) {
    this.values.set(operation.id, structuredClone(operation));
  }
  async listRecoverable(providerId?: string) {
    return [...this.values.values()].filter(
      (value) =>
        (!providerId || value.providerId === providerId) &&
        ['pending', 'running', 'reconcile_required'].includes(value.state)
    );
  }
}

describe('HindsightLocalMemoryBankClient', () => {
  it('negotiates the pinned native Hindsight dialect and forwards bearer auth', async () => {
    const calls: Array<{ url: string; headers?: Record<string, string> }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      calls.push({ url, headers: init?.headers });
      return response({ api_version: '0.8.5', features: { worker: true } });
    };
    const client = new HindsightLocalMemoryBankClient({
      baseUrl: 'http://localhost:8888',
      bearerToken: 'test-token',
      fetch: fetcher,
    });

    await expect(client.capabilities()).resolves.toMatchObject({
      add: true,
      search: true,
      asyncWrite: true,
      deleteByFilter: false,
    });
    expect(client.protocol).toBe(HINDSIGHT_LOCAL_PROTOCOL);
    expect(calls[0]).toEqual({
      url: 'http://localhost:8888/version',
      headers: expect.objectContaining({ Authorization: 'Bearer test-token' }),
    });
  });

  it('retains asynchronously with stable bank/document identities and reconciles the receipt', async () => {
    const mappingStore = new DurableMappingStore();
    const operationStore = new DurableOperationStore();
    const calls: Array<{ url: string; method?: string; body?: Record<string, unknown> }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      const body = init?.body ? (JSON.parse(init.body) as Record<string, unknown>) : undefined;
      calls.push({ url, method: init?.method, body });
      if (url.endsWith('/memories') && init?.method === 'POST') {
        return response({ success: true, async: true, operation_id: 'retain-123' });
      }
      if (url.endsWith('/operations/retain-123')) {
        return response({ operation_id: 'retain-123', status: 'completed' });
      }
      if (url.includes('/memories/list?')) {
        return response({
          items: [
            {
              id: 'memory-123',
              text: 'Alice works on the Hypha memory subsystem.',
              type: 'world',
              date: '2026-07-24T00:00:00.123456+00:00',
              metadata: { _hypha_scope_hash: expect.anything },
            },
          ],
          total: 1,
          limit: 100,
          offset: 0,
        });
      }
      throw new Error(`Unexpected request ${init?.method ?? 'GET'} ${url}`);
    };
    const client = new HindsightLocalMemoryBankClient({
      baseUrl: 'http://localhost:8888',
      fetch: fetcher,
      mappingStore,
      mappingProfile: 'production',
      operationStore,
      operationProfile: 'production',
      profileRef,
      now: () => new Date('2026-07-24T00:00:00.000Z'),
    });

    await expect(client.add(addRequest())).resolves.toMatchObject({
      operationId: 'operation-1',
      status: 'queued',
      events: ['retain-123'],
    });
    await expect(client.add(addRequest())).resolves.toMatchObject({
      operationId: 'operation-1',
      status: 'queued',
      events: ['retain-123'],
    });
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
    const retain = calls[0];
    expect(retain.url).toContain(`/banks/${bankIdForScope(scope)}/memories`);
    expect(retain.body).toMatchObject({
      async: true,
      items: [
        expect.objectContaining({
          document_id: documentIdForOperation('operation-1'),
          content: 'Alice works on the Hypha memory subsystem.',
          metadata: {
            stringValue: 'kept',
            structuredValue: '{"nested":true}',
            _hypha_operation_id: 'operation-1',
            _hypha_scope_hash: expect.any(String),
            _hypha_source: '{"sourceId":"message-1","type":"user_message"}',
          },
        }),
      ],
    });

    const reconciled = await client.reconcileOperation('operation-1');
    expect(reconciled).toMatchObject({ status: 'committed' });
    expect(reconciled?.records).toHaveLength(1);
    expect(reconciled?.records[0]).toMatchObject({
      canonicalText: 'Alice works on the Hypha memory subsystem.',
      createdAt: '2026-07-24T00:00:00.123Z',
      updatedAt: '2026-07-24T00:00:00.123Z',
      scope,
      metadata: { providerExternalId: 'memory-123' },
    });

    const restarted = new HindsightLocalMemoryBankClient({
      baseUrl: 'http://localhost:8888',
      fetch: fetcher,
      mappingStore,
      mappingProfile: 'production',
      operationStore,
      operationProfile: 'production',
      profileRef,
      now: () => new Date('2026-07-24T00:00:00.000Z'),
    });
    await expect(restarted.add(addRequest())).resolves.toMatchObject({
      status: 'committed',
      records: [
        expect.objectContaining({ canonicalText: 'Alice works on the Hypha memory subsystem.' }),
      ],
    });
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
    await expect(
      restarted.add({ ...addRequest(), input: 'Conflicting replay content.' })
    ).rejects.toMatchObject({ code: 'MEMORY_IDEMPOTENCY_CONFLICT' });
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
  });

  it('dead-letters expired operations and normalizes cancellation without replaying writes', async () => {
    const mappingStore = new DurableMappingStore();
    const operationStore = new DurableOperationStore();
    let now = new Date('2026-07-24T00:00:00.000Z');
    let postCount = 0;
    const client = new HindsightLocalMemoryBankClient({
      baseUrl: 'http://localhost:8888',
      fetch: async (_url, init) => {
        if (init?.method === 'POST') postCount += 1;
        return response({ operation_id: 'retain-expiring' });
      },
      mappingStore,
      mappingProfile: 'production',
      operationStore,
      operationProfile: 'production',
      profileRef,
      operationDeadlineMs: 1_000,
      now: () => now,
    });
    await expect(
      client.add({ ...addRequest(), operationId: 'operation-expiring' })
    ).resolves.toMatchObject({
      status: 'queued',
    });
    now = new Date('2026-07-24T00:00:02.000Z');
    await expect(client.reconcileOperation('operation-expiring')).resolves.toMatchObject({
      status: 'failed',
      warnings: ['Hindsight operation exceeded its reconciliation deadline.'],
    });
    await expect(
      client.add({ ...addRequest(), operationId: 'operation-expiring' })
    ).resolves.toMatchObject({
      status: 'failed',
    });
    expect(postCount).toBe(1);

    const controller = new AbortController();
    controller.abort(new Error('acceptance cancellation'));
    await expect(
      client.search(
        {
          operationId: 'cancelled-search',
          principal,
          scope,
          profileRef,
          query: 'cancel me',
        },
        controller.signal
      )
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { cancelled: true },
    });
  });
  it('uses exact-scope banks and rejects a mapping reused from another scope', async () => {
    const mappingStore = new DurableMappingStore();
    const operationStore = new DurableOperationStore();
    const client = new HindsightLocalMemoryBankClient({
      baseUrl: 'http://localhost:8888',
      fetch: async () => response({}),
      mappingStore,
      mappingProfile: 'production',
      operationStore,
      operationProfile: 'production',
      profileRef,
    });
    const otherScope = { ...scope, sessionId: 'session-2' };
    expect(bankIdForScope(otherScope)).not.toBe(bankIdForScope(scope));
    await mappingStore.set({
      memoryId: 'memory:external:test',
      providerId: 'memory.provider.memorybank.hindsight-local',
      externalId: 'memory-123',
      binding: {
        scopeHash: 'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        profileRef,
        recordRevision: 1,
        provenance: {
          createdBy: 'test',
          providerId: 'memory.provider.memorybank.hindsight-local',
          createdAt: '2026-07-24T00:00:00.000Z',
        },
      },
      lastSyncedAt: '2026-07-24T00:00:00.000Z',
      syncState: 'synced',
    });

    await expect(
      client.get({
        operationId: 'get-1',
        principal,
        scope,
        memoryId: 'memory:external:test',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_SCOPE_DENIED' });
  });

  it('fails closed on API version drift and non-loopback cleartext endpoints', async () => {
    expect(
      () =>
        new HindsightLocalMemoryBankClient({
          baseUrl: 'http://memory.internal:8888',
          fetch: async () => response({}),
        })
    ).toThrow();
    const client = new HindsightLocalMemoryBankClient({
      baseUrl: 'https://memory.internal',
      fetch: async () => response({ api_version: '0.9.0', features: {} }),
    });
    await expect(client.capabilities()).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { schemaDrift: true },
    });
  });
});

describe('Hindsight local provider factory', () => {
  it('matches only the explicit self-hosted Hindsight protocol and requires durable stores', async () => {
    const factory = createHindsightLocalMemoryProviderFactory({
      fetch: async () => response({ api_version: '0.8.5', features: {} }),
    });
    expect(factory.id).toBe(HINDSIGHT_LOCAL_FACTORY_ID);
    const spec = {
      id: 'memory.provider.memorybank.hindsight-local',
      version: '1.0.0',
      revision: 'hindsight-0.8.5',
      type: 'memorybank',
      deployment: 'self_hosted',
      connectionRef: 'memory.connection.hindsight-local',
      config: {
        protocol: 'hindsight-http-v0.8',
        mappingStoreRef: 'memory.mapping.durable',
        operationStoreRef: 'memory.operation.durable',
      },
      capabilities: {
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
        hybridSearch: true,
        graphRelations: false,
        asyncWrite: true,
        batchOperations: false,
      },
    } as MemoryManagementProviderSpec;
    const profile = {
      id: 'memorybank-hindsight-local',
      version: '1.0.0',
      revision: 'hindsight-0.8.5',
    } as MemoryProfileSpec;
    expect(factory.supports(spec)).toBe(true);
    expect(factory.supports({ ...spec, deployment: 'managed' })).toBe(false);

    await expect(factory.create({ profile, spec, references: new Map() })).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_NOT_INSTALLED',
    });

    const installation = await factory.create({
      profile,
      spec,
      references: new Map<string, unknown>([
        ['memory.connection.hindsight-local', { baseUrl: 'http://localhost:8888' }],
        ['memory.mapping.durable', new DurableMappingStore()],
        ['memory.operation.durable', new DurableOperationStore()],
      ]),
    });
    expect(installation).toHaveProperty('provider');
  });
});
