import {
  Mem0OssClient,
  Mem0PlatformClient,
  MemoryBankManagedClient,
  memoryProfileSpecExample,
  runExternalProviderAcceptance,
  sha256,
  type ExternalProviderAcceptanceEvidenceInput,
  type ExternalProviderAcceptanceFixture,
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
      const startedAt = new Date().toISOString();
      const metadata = evidence(
        'memory.provider.mem0.platform.v3',
        'HYPHA_TEST_MEM0_PLATFORM_VERSION'
      );
      const client = new Mem0PlatformClient({
        apiToken: process.env.HYPHA_TEST_MEM0_PLATFORM_TOKEN!,
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
