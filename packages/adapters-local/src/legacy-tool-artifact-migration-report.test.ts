import { describe, expect, it } from 'vitest';
import {
  legacyToolArtifactMigrationExecutionReportId,
  legacyToolArtifactMigrationPlanHash,
} from './legacy-tool-artifact-migration-report';

describe('legacy Tool Artifact migration report evidence', () => {
  it('hashes equivalent plain-object evidence independently of property insertion order', () => {
    const left = {
      imports: [{ metadata: { batch: 'e1', owner: 'agent.report' } }],
      skipped: [],
      totalEntries: 1,
      totalBytes: 7,
    };
    const right = {
      imports: [{ metadata: { owner: 'agent.report', batch: 'e1' } }],
      skipped: [],
      totalEntries: 1,
      totalBytes: 7,
    };

    expect(legacyToolArtifactMigrationPlanHash(left)).toBe(
      legacyToolArtifactMigrationPlanHash(right)
    );
  });

  it('binds an execution report ID to every reported revision', () => {
    const report = {
      planHash: `sha256:${'1'.repeat(64)}`,
      mode: 'execute' as const,
      items: [{ artifactId: 'artifact.report', revision: 0 }],
      skipped: [],
      summary: { planned: 1, imported: 1, failed: 0 },
    };
    const reportId = legacyToolArtifactMigrationExecutionReportId(report);

    expect(reportId).toMatch(/^legacy-migration-execution:[a-f0-9]{64}$/u);
    expect(
      legacyToolArtifactMigrationExecutionReportId({
        ...report,
        items: [{ artifactId: 'artifact.report', revision: 1 }],
      })
    ).not.toBe(reportId);
  });

  it('rejects cyclic or non-finite evidence instead of emitting an ambiguous hash', () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;

    expect(() =>
      legacyToolArtifactMigrationPlanHash({
        imports: [cyclic],
        skipped: [],
        totalEntries: 1,
        totalBytes: 0,
      })
    ).toThrow(/cycles/u);
    expect(() =>
      legacyToolArtifactMigrationPlanHash({
        imports: [],
        skipped: [],
        totalEntries: 0,
        totalBytes: Number.NaN,
      })
    ).toThrow(/finite/u);
  });
});
