import {
  Mem0OssClient,
  Mem0PlatformClient,
  MemoryBankLocalClient,
  MemoryBankManagedClient,
} from '../../packages/memory/src';

describe('external memory real integration entry points', () => {
  const cases = [
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
      'mem0-platform-v3',
      process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN,
      () =>
        new Mem0PlatformClient({
          apiToken: process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN!,
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
  ] as const;

  for (const [name, enabled, create] of cases) {
    const testCase = enabled ? it : it.skip;
    testCase(name + ' exposes health and capabilities', async () => {
      const client = create();
      await expect(client.capabilities()).resolves.toBeTruthy();
      await expect(client.health()).resolves.toHaveProperty('status');
      await client.close?.();
    });
  }
});
