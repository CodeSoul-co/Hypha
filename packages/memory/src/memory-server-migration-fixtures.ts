import type { MemoryServerMigrationAcceptancePorts } from './memory-server-migration-acceptance';
import { memoryServerMigrationAcceptance } from './memory-server-migration-contract';

const canonicalId = memoryServerMigrationAcceptance.sharedFixture.canonicalServiceInstanceId;
const canonicalReceipt = {
  runtimeId: 'memory-runtime:acceptance',
  serviceInstanceId: canonicalId,
  serviceContract: '@hypha/memory.MemoryApplicationService' as const,
  activeProfileId: 'memory.profile.native',
  providerId: 'memory.provider.native',
  providerSpecId: 'memory.provider.native',
  configHash: 'sha256:acceptance-config',
  profileHash: 'sha256:acceptance-profile',
  resolvedDependencyRefs: [],
  createdAt: '2026-07-23T00:00:00.000Z',
};

/** Reproduces the three audited legacy gaps without importing Server-owned code. */
export const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts = {
  canonicalConsumer: {
    async observe() {
      return {
        consumerServiceInstanceIds: {
          chat: 'legacy:TemporaryMemory',
          'memory-routes': 'legacy:PermanentMemory',
        },
        serviceRegistrationCount: 2,
        runtimeDependencies: ['TemporaryMemory', 'PermanentMemory'],
        unresolvedDependencyRefs: ['memory.mapping.missing'],
        directStoreConsumers: ['chat', 'memory-routes'],
        secondWritePaths: ['legacy:PermanentMemory.write'],
        profileSwitches: [
          {
            profileId: 'memory.profile.native',
            expectedProviderId: 'memory.provider.native',
            observedReadProviderId: 'legacy:PermanentMemory',
            observedWriteProviderId: 'legacy:PermanentMemory',
          },
        ],
        legacyAdapterResponsibilities: ['provider_selection', 'business_rules'],
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
        compositionReceipt: canonicalReceipt,
        consumerServiceInstanceIds: {
          chat: canonicalId,
          'memory-routes': canonicalId,
          tool: canonicalId,
          workflow: canonicalId,
          harness: canonicalId,
        },
        serviceRegistrationCount: 1,
        runtimeDependencies: [],
        unresolvedDependencyRefs: [],
        directStoreConsumers: [],
        secondWritePaths: [],
        profileSwitches: [
          {
            profileId: 'memory.profile.native',
            expectedProviderId: 'memory.provider.native',
            observedReadProviderId: 'memory.provider.native',
            observedWriteProviderId: 'memory.provider.native',
          },
          {
            profileId: 'memory.profile.mem0',
            expectedProviderId: 'memory.provider.mem0',
            observedReadProviderId: 'memory.provider.mem0',
            observedWriteProviderId: 'memory.provider.mem0',
          },
        ],
        legacyAdapterResponsibilities: ['delegate', 'scope_mapping', 'error_mapping'],
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
        failureDisposition: 'retry_reconcile_quarantine_or_dlq',
      };
    },
  },
};
