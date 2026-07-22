import type { ManagedMemoryScope, MemoryContractSpecRef, NormalizedMemoryError } from './contracts';

export type MemoryServerMigrationIssue = 'P0-1' | 'P0-2' | 'P0-3';
export type MemoryServerConsumer = 'chat' | 'memory-routes' | 'tool' | 'workflow' | 'harness';

export interface MemoryServerMigrationSharedFixture {
  scope: ManagedMemoryScope;
  observedAt: string;
  canonicalServiceInstanceId: string;
  migration: {
    revision: string;
    phase: 'planned';
    deadlineAt: string;
  };
  failure: {
    operation: 'get';
    providerId: string;
    expectedError: NormalizedMemoryError;
  };
}

/**
 * Framework-owned handoff contract for the Server/dev composition migration.
 * It contains no Server implementation and can be consumed by integration tests.
 */
export interface MemoryServerMigrationAcceptance {
  contractRef: MemoryContractSpecRef;
  issues: readonly ['P0-1', 'P0-2', 'P0-3'];
  canonicalService: '@hypha/memory.MemoryApplicationService';
  requiredConsumers: readonly ['chat', 'memory-routes', 'tool', 'workflow', 'harness'];
  prohibitedRuntimeDependencies: readonly ['TemporaryMemory', 'PermanentMemory'];
  canonicalConsumption: {
    serviceRegistration: 'single';
    minimumProfileSwitchCases: 2;
    compositionReceiptRequired: true;
    allowedLegacyAdapterResponsibilities: readonly ['delegate', 'scope_mapping', 'error_mapping'];
    prohibitedLegacyAdapterResponsibilities: readonly [
      'business_rules',
      'provider_selection',
      'independent_persistence',
    ];
  };
  migration: {
    phases: readonly [
      'planned',
      'shadow_read',
      'bounded_dual_write',
      'verify',
      'cutover',
      'retire',
      'rollback',
    ];
    dualWriteRequirements: readonly ['deadlineAt', 'revision', 'idempotencyKey', 'checkpointRef'];
    requiredEventFields: readonly ['migrationRevision', 'activePath', 'shadowResult', 'reason'];
    retirementConditions: readonly [
      'legacyReadTraffic',
      'legacyWriteTraffic',
      'reconciliationPassed',
      'rollbackWindowClosed',
      'legacyImports',
      'legacyRegistrations',
    ];
  };
  sharedFixture: MemoryServerMigrationSharedFixture;
  redisWorkingMemory: {
    trimMode: 'MAXLEN';
    trimArgumentSemantics: 'target_max_length';
    trimPrecision: 'exact';
    maxZeroBehavior: 'clear';
    newestReadCommand: 'XREVRANGE';
    emptyLatestResult: 'null';
    cleanupCommand: 'SCAN';
    scanBudgetRequired: true;
    requiredBoundaryCases: readonly [
      'max_zero',
      'empty_to_one',
      'at_max',
      'max_plus_one',
      'large_batch',
      'concurrent',
      'scope_isolation',
      'restart_latest',
      'empty_latest',
      'scan_multi_page',
      'repeated_cursor',
    ];
    prohibitedCommands: readonly ['XTRIM MAXLEN with deletion count', 'XRANGE + -', 'KEYS'];
    retentionCases: readonly RedisWorkingMemoryRetentionCase[];
  };
  permanentMemory: {
    emptyResultCause: 'not_found_only';
    providerFailureResult: 'normalized_error';
    requiredFailureDisposition: 'retry_reconcile_or_quarantine';
  };
}

export interface RedisWorkingMemoryRetentionCase {
  beforeAppend: number;
  maxMessages: number;
  expectedAfterAppend: number;
}

export const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance = {
  contractRef: {
    id: 'memory.server-migration-acceptance',
    version: '1.0.0',
    revision: 'p0-2-stage-3',
  },
  issues: ['P0-1', 'P0-2', 'P0-3'],
  canonicalService: '@hypha/memory.MemoryApplicationService',
  requiredConsumers: ['chat', 'memory-routes', 'tool', 'workflow', 'harness'],
  prohibitedRuntimeDependencies: ['TemporaryMemory', 'PermanentMemory'],
  canonicalConsumption: {
    serviceRegistration: 'single',
    minimumProfileSwitchCases: 2,
    compositionReceiptRequired: true,
    allowedLegacyAdapterResponsibilities: ['delegate', 'scope_mapping', 'error_mapping'],
    prohibitedLegacyAdapterResponsibilities: [
      'business_rules',
      'provider_selection',
      'independent_persistence',
    ],
  },
  migration: {
    phases: [
      'planned',
      'shadow_read',
      'bounded_dual_write',
      'verify',
      'cutover',
      'retire',
      'rollback',
    ],
    dualWriteRequirements: ['deadlineAt', 'revision', 'idempotencyKey', 'checkpointRef'],
    requiredEventFields: ['migrationRevision', 'activePath', 'shadowResult', 'reason'],
    retirementConditions: [
      'legacyReadTraffic',
      'legacyWriteTraffic',
      'reconciliationPassed',
      'rollbackWindowClosed',
      'legacyImports',
      'legacyRegistrations',
    ],
  },
  sharedFixture: {
    scope: {
      tenantId: 'tenant:p0-acceptance',
      userId: 'user:p0-acceptance',
      workspaceId: 'workspace:p0-acceptance',
      sessionId: 'session:p0-acceptance',
    },
    observedAt: '2026-07-22T00:00:00.000Z',
    canonicalServiceInstanceId: 'memory-application-service:primary',
    migration: {
      revision: 'memory-server-migration:p0-123:v1',
      phase: 'planned',
      deadlineAt: '2026-08-22T00:00:00.000Z',
    },
    failure: {
      operation: 'get',
      providerId: 'mongodb:memory',
      expectedError: {
        code: 'MEMORY_STORE_UNAVAILABLE',
        message: 'Structured memory store is unavailable.',
        retryable: true,
        providerCode: 'MONGO_NETWORK_ERROR',
      },
    },
  },
  redisWorkingMemory: {
    trimMode: 'MAXLEN',
    trimArgumentSemantics: 'target_max_length',
    trimPrecision: 'exact',
    maxZeroBehavior: 'clear',
    newestReadCommand: 'XREVRANGE',
    emptyLatestResult: 'null',
    cleanupCommand: 'SCAN',
    scanBudgetRequired: true,
    requiredBoundaryCases: [
      'max_zero',
      'empty_to_one',
      'at_max',
      'max_plus_one',
      'large_batch',
      'concurrent',
      'scope_isolation',
      'restart_latest',
      'empty_latest',
      'scan_multi_page',
      'repeated_cursor',
    ],
    prohibitedCommands: ['XTRIM MAXLEN with deletion count', 'XRANGE + -', 'KEYS'],
    retentionCases: [
      { beforeAppend: 99, maxMessages: 100, expectedAfterAppend: 100 },
      { beforeAppend: 100, maxMessages: 100, expectedAfterAppend: 100 },
      { beforeAppend: 101, maxMessages: 100, expectedAfterAppend: 100 },
    ],
  },
  permanentMemory: {
    emptyResultCause: 'not_found_only',
    providerFailureResult: 'normalized_error',
    requiredFailureDisposition: 'retry_reconcile_or_quarantine',
  },
};

export function verifyRedisWorkingMemoryRetention(
  observedCounts: readonly number[],
  acceptance = memoryServerMigrationAcceptance
): string[] {
  const cases = acceptance.redisWorkingMemory.retentionCases;
  if (observedCounts.length !== cases.length) {
    return [`Expected ${cases.length} retention observations, received ${observedCounts.length}.`];
  }
  return cases.flatMap((testCase, index) =>
    observedCounts[index] === testCase.expectedAfterAppend
      ? []
      : [
          `Retention case ${index} expected ${testCase.expectedAfterAppend}, received ${observedCounts[index]}.`,
        ]
  );
}
