import type { MemoryServerMigrationAcceptancePorts } from './memory-server-migration-acceptance';
import { memoryServerMigrationAcceptance } from './memory-server-migration-contract';

const canonicalId = memoryServerMigrationAcceptance.sharedFixture.canonicalServiceInstanceId;

/** Reproduces the three audited legacy gaps without importing Server-owned code. */
export const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts = {
  canonicalConsumer: {
    async observe() {
      return {
        consumerServiceInstanceIds: {
          chat: 'legacy:TemporaryMemory',
          'memory-routes': 'legacy:PermanentMemory',
        },
        runtimeDependencies: ['TemporaryMemory', 'PermanentMemory'],
        directStoreConsumers: ['chat', 'memory-routes'],
      };
    },
  },
  redisWorkingMemory: {
    async observe() {
      return {
        trimArgumentSemantics: 'deletion_count',
        newestReadStrategy: 'forward_range',
        cleanupStrategy: 'keys',
      };
    },
  },
  permanentMemory: {
    async observe() {
      return {
        notFoundReturnsEmpty: true,
        providerFailureResult: 'empty_result',
        failureDisposition: 'empty_result',
      };
    },
  },
};

/** Minimal positive fixture proving that the acceptance runner is adapter-neutral. */
export const compliantMemoryServerSkeletonPorts: MemoryServerMigrationAcceptancePorts = {
  canonicalConsumer: {
    async observe() {
      return {
        consumerServiceInstanceIds: {
          chat: canonicalId,
          'memory-routes': canonicalId,
          tool: canonicalId,
          workflow: canonicalId,
          harness: canonicalId,
        },
        runtimeDependencies: [],
        directStoreConsumers: [],
      };
    },
  },
  redisWorkingMemory: {
    async observe() {
      return {
        trimArgumentSemantics: 'target_max_length',
        newestReadStrategy: 'reverse_range',
        cleanupStrategy: 'scan',
      };
    },
  },
  permanentMemory: {
    async observe(fixture) {
      return {
        notFoundReturnsEmpty: true,
        providerFailureResult: 'normalized_error',
        normalizedFailure: fixture.failure.expectedError,
        failureDisposition: 'retry_reconcile_or_quarantine',
      };
    },
  },
};
