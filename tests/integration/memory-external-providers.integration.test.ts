import {
  Mem0OssClient,
  Mem0PlatformClient,
  MemoryBankLocalClient,
  MemoryBankManagedClient,
  memoryProfileSpecExample,
  runExternalProviderAcceptance,
  type ExternalMemoryClient,
  type ExternalProviderAcceptanceFixture,
} from '../../packages/memory/src';

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
      pagination: { limit: 10 },
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

describe('external memory real integration entry points', () => {
  const lifecycleCases: Array<[string, string | undefined, () => ExternalMemoryClient]> = [
    [
      'mem0-oss',
      process.env.HYPHA_TEST_MEM0_OSS_URL,
      () =>
        new Mem0OssClient({
          baseUrl: process.env.HYPHA_TEST_MEM0_OSS_URL!,
          apiKey: process.env.HYPHA_TEST_MEM0_OSS_API_KEY,
        }),
    ],
    [
      'memorybank-local',
      process.env.HYPHA_TEST_MEMORYBANK_LOCAL_URL,
      () =>
        new MemoryBankLocalClient({
          baseUrl: process.env.HYPHA_TEST_MEMORYBANK_LOCAL_URL!,
          apiKey: process.env.HYPHA_TEST_MEMORYBANK_LOCAL_API_KEY,
        }),
    ],
  ];

  for (const [name, enabled, create] of lifecycleCases) {
    const testCase = enabled ? it : it.skip;
    testCase(name + ' completes the shared management lifecycle', async () => {
      const report = await runExternalProviderAcceptance(create(), liveFixture(name));
      expect(report).toMatchObject({
        searchCount: expect.any(Number),
        listCount: expect.any(Number),
        deleteStatus: 'completed',
        healthStatus: 'healthy',
      });
      expect(report.searchCount).toBeGreaterThan(0);
      expect(report.listCount).toBeGreaterThan(0);
    });
  }

  const controlledCases: Array<[string, string | undefined, () => ExternalMemoryClient]> = [
    [
      'mem0-platform-v3',
      process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN,
      () =>
        new Mem0PlatformClient({
          apiToken: process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN!,
        }),
    ],
    [
      'memorybank-managed',
      process.env.HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN,
      () =>
        new MemoryBankManagedClient({
          projectId: process.env.HYPHA_TEST_MEMORYBANK_PROJECT!,
          location: process.env.HYPHA_TEST_MEMORYBANK_LOCATION!,
          reasoningEngineId: process.env.HYPHA_TEST_MEMORYBANK_ENGINE!,
          accessToken: process.env.HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN!,
        }),
    ],
  ];

  for (const [name, enabled, create] of controlledCases) {
    const testCase = enabled ? it : it.skip;
    testCase(name + ' exposes controlled-cloud health and capabilities', async () => {
      const client = create();
      await expect(client.capabilities()).resolves.toBeTruthy();
      await expect(client.health()).resolves.toHaveProperty('status');
      await client.close?.();
    });
  }
});
