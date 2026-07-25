import { describe, expect, it } from 'vitest';
import {
  canonicalNativeMemoryServerMigrationPackagePorts,
  compliantFrameworkMemoryServerMigrationPackagePorts,
  legacyMemoryServerMigrationPackagePorts,
} from './memory-server-migration-package-fixtures';
import { runMemoryServerMigrationPackageAcceptance } from './memory-server-migration-package';

describe('Memory Server migration package paired fixtures', () => {
  it('keeps one legacy failure baseline across all five suites', async () => {
    const report = await runMemoryServerMigrationPackageAcceptance(
      legacyMemoryServerMigrationPackagePorts
    );
    expect(report.passed).toBe(false);
    expect(report.suites.map((suite) => [suite.id, suite.passed])).toEqual([
      ['consumer_contract', false],
      ['redis_behavior', false],
      ['permanent_behavior', false],
      ['migration_state_machine', false],
      ['runtime_lifecycle', false],
    ]);
    expect(report.suites.flatMap((suite) => suite.findings.map((finding) => finding.code))).toEqual(
      expect.arrayContaining([
        'COMPOSITION_RECEIPT_MISSING',
        'REDIS_RETENTION_LENGTH_MISMATCH',
        'PROVIDER_FAILURE_NOT_PROPAGATED',
        'MIGRATION_REVISION_NOT_FENCED',
        'RUNTIME_CLOSE_NOT_IDEMPOTENT',
      ])
    );
  });

  it('passes the adapter-neutral Framework reference through the same runner', async () => {
    await expect(
      runMemoryServerMigrationPackageAcceptance(compliantFrameworkMemoryServerMigrationPackagePorts)
    ).resolves.toMatchObject({ passed: true });
  });

  it('passes canonical Native runtime and concrete migration adapters through the same runner', async () => {
    const report = await runMemoryServerMigrationPackageAcceptance(
      canonicalNativeMemoryServerMigrationPackagePorts
    );
    expect(report.passed).toBe(true);
    expect(report.suites.flatMap((suite) => suite.findings)).toEqual([]);
  });
});
