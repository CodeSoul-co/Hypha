import { describe, expect, it } from 'vitest';
import {
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
} from './memory-server-consumer-migration';
import { compliantMemoryServerSkeletonPorts } from './memory-server-migration-fixtures';
import {
  memoryServerMigrationPackageSpec,
  runMemoryServerMigrationPackageAcceptance,
  runRuntimeLifecycleAcceptance,
  type MemoryServerMigrationPackagePorts,
} from './memory-server-migration-package';
import {
  memoryServerMigrationPackageSpecJsonSchema,
  validateMemoryServerMigrationPackageSpec,
} from './memory-server-migration-package-schema';
import { createReferencePermanentMemoryMigrationHarness } from './memory-server-permanent-migration-fixtures';
import { createInMemoryWorkingMemoryMigrationHarness } from './memory-server-redis-migration-fixtures';

function compliantPorts(): MemoryServerMigrationPackagePorts {
  return {
    contract: compliantMemoryServerSkeletonPorts,
    redisBehavior: () => createInMemoryWorkingMemoryMigrationHarness(),
    permanentBehavior: createReferencePermanentMemoryMigrationHarness,
    migrationStateMachine: {
      create: createMemoryServerCanonicalMigrationState,
      transition: transitionMemoryServerCanonicalMigration,
    },
    runtimeLifecycle: {
      observe: async () => ({
        closeInvocations: 3,
        providerCloseCount: 1,
        installationCloseCount: 1,
        openHandleCount: 0,
        failures: memoryServerMigrationPackageSpec.lifecycleFailurePoints.map((point) => ({
          point,
          rejected: true,
          resourcesCreated: point === 'provider_create' ? 0 : 2,
          resourcesClosed: point === 'provider_create' ? 0 : 2,
          openHandleCount: 0,
        })),
      }),
    },
  };
}

describe('Memory Server migration acceptance package', () => {
  it('keeps TypeScript, Zod and JSON Schema on the same versioned suite', () => {
    expect(validateMemoryServerMigrationPackageSpec(memoryServerMigrationPackageSpec)).toEqual(
      memoryServerMigrationPackageSpec
    );
    expect(memoryServerMigrationPackageSpec).toMatchObject({
      contractRef: {
        id: 'memory.server-migration-package',
        version: '1.0.0',
        revision: 'migration-acceptance-v1',
      },
      requiredSuites: [
        'consumer_contract',
        'redis_behavior',
        'permanent_behavior',
        'migration_state_machine',
        'runtime_lifecycle',
      ],
    });
    expect(memoryServerMigrationPackageSpecJsonSchema).toMatchObject({
      type: 'object',
      additionalProperties: false,
      required: expect.arrayContaining(['contractRef', 'requiredSuites']),
    });
  });

  it('runs every behavior suite through public injected ports', async () => {
    const report = await runMemoryServerMigrationPackageAcceptance(compliantPorts());
    expect(report).toMatchObject({
      passed: true,
      contractRef: memoryServerMigrationPackageSpec.contractRef,
      baseAcceptanceRef: memoryServerMigrationPackageSpec.baseAcceptanceRef,
    });
    expect(report.suites.map((suite) => suite.id)).toEqual(
      memoryServerMigrationPackageSpec.requiredSuites
    );
    expect(report.suites.every((suite) => suite.cases > 0)).toBe(true);
    expect(report.suites.flatMap((suite) => suite.findings)).toEqual([]);
  });

  it('rejects incomplete lifecycle evidence instead of accepting a fake close', async () => {
    const report = await runRuntimeLifecycleAcceptance({
      observe: async () => ({
        closeInvocations: 2,
        providerCloseCount: 2,
        installationCloseCount: 0,
        openHandleCount: 1,
        failures: [],
      }),
    });
    expect(report.passed).toBe(false);
    expect(report.findings.map((finding) => finding.code)).toEqual(
      expect.arrayContaining([
        'RUNTIME_CLOSE_NOT_IDEMPOTENT',
        'RUNTIME_OPEN_HANDLES',
        'RUNTIME_FAILURE_POINT_MISSING',
      ])
    );
  });
});
