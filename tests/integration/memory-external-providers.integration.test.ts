import mongoose from 'mongoose';
import {
  MongoStructuredStoreProvider,
  StructuredExternalMemoryMappingStore,
  StructuredExternalProviderOperationStore,
  Mem0OssClient,
  Mem0PlatformClient,
  MemoryBankManagedClient,
  memoryProfileSpecExample,
  runExternalProviderAcceptance,
  sha256,
  type ExternalProviderAcceptanceEvidenceInput,
  type ExternalMemoryClient,
  type ExternalProviderAcceptanceFixture,
  type ManagedMemoryDeleteRequest,
  type MongoDatabaseLike,
  type MemoryListRequest,
} from '../../packages/memory/src';

const acceptanceMode = process.env.HYPHA_MEMORY_EXTERNAL_ACCEPTANCE_MODE ?? 'development';
const explicitlyRequired = new Set(
  (process.env.HYPHA_MEMORY_EXTERNAL_ACCEPTANCE_REQUIRED_PROVIDERS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
);

function liveFixture(prefix: string): ExternalProviderAcceptanceFixture {
  const suffix = Date.now().toString(36);
  const userId = prefix + '-user-' + suffix;
  const scope = { userId, workspaceId: prefix + '-workspace' };
  const principal = {
    principalId: userId,
    type: 'user' as const,
    userId,
    permissionScopes: ['memory:read', 'memory:write'],
  };
  return {
    add: {
      operationId: prefix + ':add:' + suffix,
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      input: 'Hypha live contract ' + suffix,
      memoryType: 'semantic',
      source: { type: 'user_message', sourceId: prefix + ':message:' + suffix },
      metadata: { testRun: suffix },
    },
    search: {
      operationId: prefix + ':search:' + suffix,
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      query: 'Hypha live contract ' + suffix,
      topK: 10,
    },
    list: {
      operationId: prefix + ':list:' + suffix,
      principal,
      scope,
      pagination: { limit: 10, maxPages: 20, maxCalls: 20 },
    },
    get: (memoryId) => ({
      operationId: prefix + ':get:' + suffix,
      principal,
      scope,
      memoryId,
    }),
    update: (memoryId) => ({
      operationId: prefix + ':update:' + suffix,
      principal,
      scope,
      memoryId,
      patch: { canonicalText: 'Hypha live contract updated ' + suffix },
      reason: 'live-contract',
    }),
    history: (memoryId) => ({
      operationId: prefix + ':history:' + suffix,
      principal,
      scope,
      memoryId,
    }),
    forbiddenGet: (memoryId) => ({
      operationId: prefix + ':forbidden-get:' + suffix,
      principal: { ...principal, userId: userId + ':other' },
      scope: { ...scope, userId: userId + ':other' },
      memoryId,
    }),
    delete: (memoryId) => ({
      operationId: prefix + ':delete:' + suffix,
      principal,
      scope,
      memoryIds: [memoryId],
      mode: 'hard',
      reason: 'live-contract-cleanup',
    }),
    resolveMemoryId: ({ addedIds, searchedIds, listedIds }) =>
      addedIds[0] ?? searchedIds[0] ?? listedIds[0],
  };
}

async function createDurableAcceptanceStores(prefix: string) {
  const mongoUrl =
    process.env.HYPHA_TEST_MONGODB_URI ??
    process.env.MONGODB_URI ??
    'mongodb://127.0.0.1:27017/hypha_memory_external_acceptance';
  const connection = mongoose.createConnection(mongoUrl, {
    serverSelectionTimeoutMS: 5_000,
    maxPoolSize: 2,
  });
  await connection.asPromise();
  if (!connection.db) throw new Error('MongoDB connection has no database.');
  const collectionPrefix = `${prefix.replace(/[^a-z0-9]/giu, '_')}_${Date.now()}_`;
  const client = connection.getClient();
  const database: MongoDatabaseLike = {
    collection: (name) => connection.db!.collection(name) as never,
    startSession: () => client.startSession() as never,
    command: (command) => connection.db!.command(command),
  };
  const store = new MongoStructuredStoreProvider({
    database,
    collectionPrefix,
    transactionMode: 'preferred',
  });
  const mappingStore = new StructuredExternalMemoryMappingStore({ store });
  const operationStore = new StructuredExternalProviderOperationStore({ store });
  return {
    mappingStore,
    operationStore,
    close: async () => {
      if (connection.readyState === 1 && connection.db) {
        for (const collection of await connection.db.collections()) {
          if (collection.collectionName.startsWith(collectionPrefix)) await collection.drop();
        }
      }
      await connection.close();
    },
  };
}
function managedLiveFixture(prefix: string): ExternalProviderAcceptanceFixture {
  const fixture = liveFixture(prefix);
  return {
    ...fixture,
    list: {
      ...fixture.list,
      pagination: { limit: 1, maxPages: 20, maxCalls: 20 },
    },
  };
}

async function pollSettlement<T>(input: {
  poll(): Promise<T | null>;
  isSettled(value: T): boolean;
  isFailed(value: T): boolean;
  signal?: AbortSignal;
  maxCalls?: number;
  timeoutMs?: number;
}): Promise<T> {
  const maxCalls = input.maxCalls ?? 60;
  const deadline = Date.now() + (input.timeoutMs ?? 120_000);
  for (let call = 0; call < maxCalls && Date.now() <= deadline; call += 1) {
    if (input.signal?.aborted) throw input.signal.reason ?? new Error('Acceptance aborted.');
    const value = await input.poll();
    if (value && input.isFailed(value)) throw new Error('External provider operation failed.');
    if (value && input.isSettled(value)) return value;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 1_000);
      input.signal?.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);
          reject(input.signal?.reason ?? new Error('Acceptance aborted.'));
        },
        { once: true }
      );
    });
  }
  throw new Error('External provider settlement exceeded its call/time budget.');
}

async function cleanupAcceptanceScope(
  client: ExternalMemoryClient,
  list: MemoryListRequest,
  deleteRequest: (memoryIds: string[]) => ManagedMemoryDeleteRequest,
  signal?: AbortSignal
): Promise<void> {
  const ids: string[] = [];
  let request = { ...list, pagination: { ...list.pagination, limit: 100 } };
  for (let page = 0; page < 20; page += 1) {
    const result = await client.list(request, signal);
    ids.push(...result.records.map((record) => record.id));
    if (!result.hasMore || !result.nextCursor) break;
    request = { ...request, pagination: { ...request.pagination, cursor: result.nextCursor } };
  }
  if (ids.length > 0) await client.delete(deleteRequest([...new Set(ids)]), signal);
}
function isRequired(provider: string): boolean {
  return acceptanceMode === 'required' || explicitlyRequired.has(provider);
}

function registerExternalCase(name: string, ready: boolean, run: () => Promise<void>): void {
  if (ready) {
    it(name, run);
    return;
  }
  if (isRequired(name)) {
    it(name + ' has all required live configuration', () => {
      throw new Error(
        `Required external Provider ${name} is not configured; acceptance cannot be recorded as passed.`
      );
    });
    return;
  }
  it.skip(name + ' not run because its external service is not configured', run);
}

function evidence(
  providerId: string,
  versionVariable: string
): ExternalProviderAcceptanceEvidenceInput {
  const commitSha = process.env.HYPHA_ACCEPTANCE_COMMIT_SHA ?? process.env.GITHUB_SHA;
  const providerVersion = process.env[versionVariable];
  if (!commitSha || !providerVersion) {
    throw new Error(
      `Live acceptance requires HYPHA_ACCEPTANCE_COMMIT_SHA and ${versionVariable} for auditable evidence.`
    );
  }
  return {
    commitSha,
    providerId,
    providerVersion,
    profileHash: sha256(memoryProfileSpecExample),
    environmentHash: sha256({
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      acceptanceMode,
    }),
  };
}

function emitEvidence(report: unknown): void {
  console.info('HYPHA_MEMORY_EXTERNAL_ACCEPTANCE ' + JSON.stringify(report));
}

describe('external memory real integration entry points', () => {
  registerExternalCase('mem0-oss', Boolean(process.env.HYPHA_TEST_MEM0_OSS_URL), async () => {
    const report = await runExternalProviderAcceptance(
      new Mem0OssClient({
        baseUrl: process.env.HYPHA_TEST_MEM0_OSS_URL!,
        apiKey: process.env.HYPHA_TEST_MEM0_OSS_API_KEY,
      }),
      liveFixture('mem0-oss'),
      undefined,
      evidence('memory.provider.mem0.rest', 'HYPHA_TEST_MEM0_OSS_VERSION')
    );
    expect(report).toMatchObject({
      status: 'passed',
      searchCount: expect.any(Number),
      listCount: expect.any(Number),
      deleteStatus: 'completed',
      healthStatus: 'healthy',
      evidence: {
        commitSha: expect.any(String),
        providerVersion: expect.any(String),
        profileHash: expect.stringMatching(/^sha256:/u),
        capabilitySnapshot: expect.any(Object),
        environmentHash: expect.stringMatching(/^sha256:/u),
      },
    });
    expect(report.searchCount).toBeGreaterThan(0);
    expect(report.listCount).toBeGreaterThan(0);
    emitEvidence(report);
  });

  registerExternalCase(
    'mem0-platform-v3',
    Boolean(process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN),
    async () => {
      const fixture = managedLiveFixture('mem0-platform-v3');
      const stores = await createDurableAcceptanceStores('mem0-platform-v3');
      const { mappingStore, operationStore } = stores;
      const createClient = (token = process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN!) =>
        new Mem0PlatformClient({
          baseUrl: process.env.HYPHA_TEST_MEM0_PLATFORM_URL,
          apiToken: token,
          mappingStore,
          operationStore,
          mappingProfile: 'test',
        });
      const client = createClient();
      const settle = (operationId: string, signal?: AbortSignal) =>
        pollSettlement({
          poll: () => client.resumeEvent(operationId, signal),
          isSettled: (event) => event.status === 'SUCCEEDED',
          isFailed: (event) => event.status === 'FAILED',
          signal,
        });
      const report = await runExternalProviderAcceptance(
        client,
        fixture,
        undefined,
        evidence('memory.provider.mem0.platform.v3', 'HYPHA_TEST_MEM0_PLATFORM_VERSION'),
        {
          settleAdd: (_result, signal) => settle(fixture.add.operationId, signal),
          preparePagination: async (signal) => {
            const operationId = fixture.add.operationId + ':pagination';
            await client.add(
              {
                ...fixture.add,
                operationId,
                input: String(fixture.add.input) + ' pagination companion',
                idempotencyKey: operationId,
              },
              signal
            );
            await settle(operationId, signal);
          },
          verifyRestart: async (memoryId, signal) => {
            const restarted = createClient();
            try {
              await expect(restarted.get(fixture.get(memoryId), signal)).resolves.toBeTruthy();
              await expect(restarted.list(fixture.list, signal)).resolves.toMatchObject({
                records: expect.any(Array),
              });
            } finally {
              await restarted.close();
            }
          },
          failureProbes: [
            {
              id: 'invalid-token',
              expectedCodes: ['MEMORY_PERMISSION_DENIED'],
              run: async (signal) => {
                const denied = createClient('hypha-invalid-live-probe-token');
                try {
                  await denied.search(
                    {
                      ...fixture.search,
                      operationId: fixture.search.operationId + ':invalid-token',
                    },
                    signal
                  );
                } finally {
                  await denied.close();
                }
              },
            },
          ],
          cleanup: async (signal) => {
            try {
              await cleanupAcceptanceScope(
                client,
                fixture.list,
                (memoryIds) => ({
                  ...fixture.delete(memoryIds[0]),
                  operationId: fixture.delete(memoryIds[0]).operationId + ':scope-cleanup',
                  memoryIds,
                }),
                signal
              );
            } finally {
              await stores.close();
            }
          },
        }
      );
      expect(report).toMatchObject({
        status: 'passed',
        scopeIsolationVerified: true,
        restartVerified: true,
        failureProbeCount: 1,
        deleteStatus: 'completed',
        healthStatus: 'healthy',
        evidence: {
          commitSha: expect.any(String),
          providerVersion: expect.any(String),
          profileHash: expect.stringMatching(/^sha256:/u),
          capabilitySnapshot: expect.any(Object),
          environmentHash: expect.stringMatching(/^sha256:/u),
        },
      });
      expect(report.paginationPageCount).toBeGreaterThan(1);
      expect(report.searchCount).toBeGreaterThan(0);
      expect(report.listCount).toBeGreaterThan(1);
    }
  );
  const vertexReady = Boolean(
    process.env.HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN &&
    process.env.HYPHA_TEST_MEMORYBANK_PROJECT &&
    process.env.HYPHA_TEST_MEMORYBANK_LOCATION &&
    process.env.HYPHA_TEST_MEMORYBANK_ENGINE
  );
  registerExternalCase('memorybank-managed', vertexReady, async () => {
    const startedAt = new Date().toISOString();
    const metadata = evidence(
      'memory.provider.memorybank.vertex-ai',
      'HYPHA_TEST_MEMORYBANK_MANAGED_VERSION'
    );
    const client = new MemoryBankManagedClient({
      projectId: process.env.HYPHA_TEST_MEMORYBANK_PROJECT!,
      location: process.env.HYPHA_TEST_MEMORYBANK_LOCATION!,
      reasoningEngineId: process.env.HYPHA_TEST_MEMORYBANK_ENGINE!,
      accessToken: process.env.HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN!,
      mappingProfile: 'test',
    });
    try {
      const capabilitySnapshot = await client.capabilities();
      const health = await client.health();
      expect(capabilitySnapshot).toBeTruthy();
      expect(health).toHaveProperty('status');
      emitEvidence({
        status: 'passed',
        ...metadata,
        capabilitySnapshot,
        startedAt,
        finishedAt: new Date().toISOString(),
        healthStatus: health.status,
      });
    } finally {
      await client.close();
    }
  });
});
