import {
  InMemoryMemoryLifecycleTaskStore,
  canonicalMemoryRuntimeConfigExample,
  type MemoryServerMigrationInventoryPlan,
} from '@hypha/memory';
import {
  ServerMemoryAdministration,
  validateServerMemoryConfiguration,
} from './ServerMemoryAdministration';

const inventory: MemoryServerMigrationInventoryPlan = {
  legacyRecords: 2,
  canonicalRecords: 1,
  matchingRecords: 1,
  missingCanonicalKeys: ['message:2'],
  unexpectedCanonicalKeys: [],
  digestMismatchKeys: [],
  reconciliation: {
    status: 'failed',
    comparedRecords: 2,
    mismatchCount: 1,
    shadowResult: 'mismatched',
  },
};

describe('ServerMemoryAdministration', () => {
  it('strictly validates profiles and reports whether the Server factory is installed', () => {
    expect(validateServerMemoryConfiguration(canonicalMemoryRuntimeConfigExample)).toMatchObject({
      valid: true,
      activeProfile: canonicalMemoryRuntimeConfigExample.activeProfile,
      provider: { type: 'native', deployment: 'embedded', installed: true },
      issues: [],
    });
    const unsupported = structuredClone(canonicalMemoryRuntimeConfigExample);
    unsupported.profiles[unsupported.activeProfile].management = {
      ...unsupported.profiles[unsupported.activeProfile].management,
      type: 'mem0',
      deployment: 'self_hosted',
      connectionRef: 'memory.connection.mem0-oss',
      config: { protocol: 'mem0-oss-rest' },
    };
    expect(validateServerMemoryConfiguration(unsupported)).toMatchObject({
      valid: true,
      provider: { type: 'mem0', deployment: 'self_hosted', installed: false },
    });

    const invalid = structuredClone(canonicalMemoryRuntimeConfigExample);
    invalid.profiles[invalid.activeProfile].management.config = {
      apiKey: 'inline-secret',
    };
    const result = validateServerMemoryConfiguration(invalid);
    expect(result.valid).toBe(false);
    expect(result.issues).toEqual([
      expect.objectContaining({
        path: expect.stringContaining('management.config.apiKey'),
        message: expect.stringContaining('credentials must be resolved'),
      }),
    ]);
    expect(JSON.stringify(result)).not.toContain('inline-secret');
  });

  it('returns read-only migration reconciliation and operator-safe DLQ inspection', async () => {
    const lifecycle = new InMemoryMemoryLifecycleTaskStore();
    await lifecycle.enqueue({
      id: 'task-1',
      operationId: 'operation-1',
      type: 'provider_reconciliation',
      scopeHash: 'scope-1',
      payload: { token: 'must-not-return' },
      state: 'dead_letter',
      attempts: 3,
      availableAt: '2026-07-25T00:00:00.000Z',
      lastError: {
        code: 'MEMORY_PROVIDER_UNAVAILABLE',
        message: 'sensitive Provider response',
        retryable: true,
      },
      createdAt: '2026-07-25T00:00:00.000Z',
      updatedAt: '2026-07-25T00:01:00.000Z',
    });
    const administration = new ServerMemoryAdministration({
      operationalSnapshot: async () => ({ receipt: { providerId: 'provider-1' } }) as never,
      readConfiguration: async () => canonicalMemoryRuntimeConfigExample,
      migrationContext: () => ({
        rehearsal: { plan: async () => inventory },
        checkpoints: { load: async () => null },
      }),
      lifecycleTaskStore: () => lifecycle,
    });

    await expect(
      administration.migrationPlan({ migrationId: 'migration-1', userId: 'user-1' })
    ).resolves.toEqual({ migrationId: 'migration-1', inventory, checkpoint: null });
    await expect(
      administration.reconcile({ migrationId: 'migration-1', userId: 'user-1' })
    ).resolves.toEqual({ migrationId: 'migration-1', inventory, checkpoint: null });
    const deadLetters = await administration.inspectDeadLetters({
      workerType: 'provider_reconciliation',
    });
    expect(deadLetters).toEqual([
      expect.objectContaining({
        taskId: 'task-1',
        operationId: 'operation-1',
        payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/),
      }),
    ]);
    expect(JSON.stringify(deadLetters)).not.toContain('must-not-return');
    expect(JSON.stringify(deadLetters)).not.toContain('sensitive Provider response');
  });
});
