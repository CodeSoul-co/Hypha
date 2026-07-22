import { describe, expect, it } from 'vitest';
import {
  runCanonicalConsumerMigrationAcceptance,
  runMemoryServerMigrationAcceptance,
  runPermanentMemoryMigrationAcceptance,
  runRedisWorkingMemoryMigrationAcceptance,
} from './memory-server-migration-acceptance';
import { memoryServerMigrationAcceptance } from './memory-server-migration-contract';
import {
  compliantMemoryServerSkeletonPorts,
  legacyMemoryServerGapPorts,
} from './memory-server-migration-fixtures';
import {
  memoryServerMigrationAcceptanceJsonSchema,
  validateMemoryServerMigrationAcceptance,
} from './memory-server-migration-schema';

describe('P0 Server migration acceptance contract', () => {
  it('keeps the versioned TypeScript, Zod, JSON Schema and fixture surface aligned', () => {
    expect(validateMemoryServerMigrationAcceptance(memoryServerMigrationAcceptance)).toEqual(
      memoryServerMigrationAcceptance
    );
    expect(memoryServerMigrationAcceptance.contractRef).toEqual({
      id: 'memory.server-migration-acceptance',
      version: '1.0.0',
      revision: 'p0-123-stage-1',
    });
    expect(memoryServerMigrationAcceptanceJsonSchema).toMatchObject({
      type: 'object',
      additionalProperties: false,
      required: expect.arrayContaining(['contractRef', 'sharedFixture', 'permanentMemory']),
    });
  });

  it('runs through injected ports without importing Server implementation', async () => {
    await expect(
      runMemoryServerMigrationAcceptance(compliantMemoryServerSkeletonPorts)
    ).resolves.toMatchObject({ passed: true });
  });
});

describe('P0-1 legacy product path failure baseline', () => {
  it('detects missing canonical consumers, legacy dependencies and direct store access', async () => {
    const report = await runCanonicalConsumerMigrationAcceptance(
      legacyMemoryServerGapPorts.canonicalConsumer
    );
    expect(report.passed).toBe(false);
    expect(report.findings.map((finding) => finding.code)).toEqual(
      expect.arrayContaining([
        'NON_CANONICAL_SERVICE_INSTANCE',
        'MISSING_CANONICAL_CONSUMER',
        'LEGACY_RUNTIME_DEPENDENCY',
        'DIRECT_STORE_CONSUMER',
      ])
    );
  });
});

describe('P0-2 Redis semantics failure baseline', () => {
  it('detects deletion-count trim, forward newest read and blocking KEYS', async () => {
    const report = await runRedisWorkingMemoryMigrationAcceptance(
      legacyMemoryServerGapPorts.redisWorkingMemory
    );
    expect(report.passed).toBe(false);
    expect(report.findings.map((finding) => finding.code)).toEqual([
      'REDIS_TRIM_USES_DELETION_COUNT',
      'REDIS_NEWEST_READ_DIRECTION',
      'REDIS_BLOCKING_KEYS',
    ]);
  });
});

describe('P0-3 swallowed provider failure baseline', () => {
  it('detects empty-result conversion, missing normalization and missing recovery', async () => {
    const report = await runPermanentMemoryMigrationAcceptance(
      legacyMemoryServerGapPorts.permanentMemory
    );
    expect(report.passed).toBe(false);
    expect(report.findings.map((finding) => finding.code)).toEqual([
      'PROVIDER_FAILURE_SWALLOWED',
      'NORMALIZED_ERROR_MISSING',
      'FAILURE_RECOVERY_MISSING',
    ]);
  });
});
