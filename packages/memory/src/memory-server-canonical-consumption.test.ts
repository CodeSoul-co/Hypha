import { describe, expect, it } from 'vitest';
import {
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
  type MemoryServerCanonicalMigrationState,
  type MemoryServerMigrationReconciliation,
} from './memory-server-consumer-migration';
import { runCanonicalConsumerMigrationAcceptance } from './memory-server-migration-acceptance';
import {
  compliantMemoryServerSkeletonPorts,
  legacyMemoryServerGapPorts,
} from './memory-server-migration-fixtures';

const revision = 'memory-server-migration:p0-1:v1';
const reconciliationPassed: MemoryServerMigrationReconciliation = {
  status: 'passed',
  comparedRecords: 20,
  mismatchCount: 0,
  shadowResult: 'matched',
};

function stateAtVerify(): MemoryServerCanonicalMigrationState {
  let state = createMemoryServerCanonicalMigrationState({
    migrationId: 'migration:p0-1',
    revision,
    createdAt: '2026-07-22T00:00:00.000Z',
  });
  state = transitionMemoryServerCanonicalMigration(state, {
    targetPhase: 'shadow_read',
    expectedRevision: revision,
    occurredAt: '2026-07-22T00:10:00.000Z',
    reason: 'shadow reads enabled',
  }).state;
  state = transitionMemoryServerCanonicalMigration(state, {
    targetPhase: 'bounded_dual_write',
    expectedRevision: revision,
    occurredAt: '2026-07-22T00:20:00.000Z',
    reason: 'bounded comparison window',
    dualWrite: {
      deadlineAt: '2026-07-22T02:00:00.000Z',
      idempotencyKey: 'migration:p0-1:dual-write',
      checkpointRef: 'memory.checkpoint:p0-1',
    },
  }).state;
  return transitionMemoryServerCanonicalMigration(state, {
    targetPhase: 'verify',
    expectedRevision: revision,
    occurredAt: '2026-07-22T01:00:00.000Z',
    reason: 'compare bounded results',
    reconciliation: reconciliationPassed,
  }).state;
}

describe('P0-1 canonical consumer acceptance', () => {
  it('accepts a single service, resolved dependencies, effective profile switches and thin adapter', async () => {
    await expect(
      runCanonicalConsumerMigrationAcceptance(compliantMemoryServerSkeletonPorts.canonicalConsumer)
    ).resolves.toMatchObject({ passed: true, findings: [] });
  });

  it('fails closed for duplicate services, unresolved refs, second writes and fat adapters', async () => {
    const report = await runCanonicalConsumerMigrationAcceptance(
      legacyMemoryServerGapPorts.canonicalConsumer
    );
    expect(report.findings.map((finding) => finding.code)).toEqual(
      expect.arrayContaining([
        'NON_UNIQUE_SERVICE_REGISTRATION',
        'UNRESOLVED_MEMORY_DEPENDENCY',
        'SECOND_MEMORY_WRITE_PATH',
        'PROFILE_SWITCH_EVIDENCE_MISSING',
        'PROFILE_SWITCH_NOT_EFFECTIVE',
        'LEGACY_ADAPTER_OWNS_BUSINESS_LOGIC',
      ])
    );
  });
});

describe('P0-1 bounded migration state machine', () => {
  it('moves through verify, cutover and retirement with revisioned audit events', () => {
    let state = stateAtVerify();
    const cutover = transitionMemoryServerCanonicalMigration(state, {
      targetPhase: 'cutover',
      expectedRevision: revision,
      occurredAt: '2026-07-22T01:10:00.000Z',
      reason: 'reconciliation passed',
      reconciliation: reconciliationPassed,
    });
    expect(cutover.event).toMatchObject({
      migrationRevision: revision,
      activePath: 'canonical',
      shadowResult: 'matched',
      checkpointRef: 'memory.checkpoint:p0-1',
      reason: 'reconciliation passed',
    });
    state = cutover.state;

    const retired = transitionMemoryServerCanonicalMigration(state, {
      targetPhase: 'retire',
      expectedRevision: revision,
      occurredAt: '2026-07-30T00:00:00.000Z',
      reason: 'rollback window completed',
      retirement: {
        legacyReadTraffic: 0,
        legacyWriteTraffic: 0,
        legacyImports: 0,
        legacyRegistrations: 0,
        rollbackWindowEndsAt: '2026-07-29T00:00:00.000Z',
      },
    });
    expect(retired.state).toMatchObject({ phase: 'retire', activePath: 'canonical' });
  });

  it('rejects an expired dual-write window and revision mismatch', () => {
    const state = stateAtVerify();
    expect(() =>
      transitionMemoryServerCanonicalMigration(
        { ...state, phase: 'bounded_dual_write' },
        {
          targetPhase: 'verify',
          expectedRevision: revision,
          occurredAt: '2026-07-22T03:00:00.000Z',
          reason: 'late verification',
        }
      )
    ).toThrow('deadline has expired');
    expect(() =>
      transitionMemoryServerCanonicalMigration(state, {
        targetPhase: 'cutover',
        expectedRevision: 'stale-revision',
        occurredAt: '2026-07-22T01:10:00.000Z',
        reason: 'stale operator request',
        reconciliation: reconciliationPassed,
      })
    ).toThrow('revision does not match');
  });

  it('turns reconciliation failure into rollback instead of silent cutover', () => {
    const result = transitionMemoryServerCanonicalMigration(stateAtVerify(), {
      targetPhase: 'cutover',
      expectedRevision: revision,
      occurredAt: '2026-07-22T01:10:00.000Z',
      reason: 'verification completed',
      reconciliation: {
        status: 'failed',
        comparedRecords: 20,
        mismatchCount: 2,
        shadowResult: 'mismatched',
      },
    });
    expect(result.state).toMatchObject({ phase: 'rollback', activePath: 'legacy' });
    expect(result.event).toMatchObject({
      toPhase: 'rollback',
      shadowResult: 'mismatched',
      reason: 'reconciliation_failed: verification completed',
    });
  });

  it('refuses retirement while legacy traffic or rollback window remains', () => {
    const cutover = transitionMemoryServerCanonicalMigration(stateAtVerify(), {
      targetPhase: 'cutover',
      expectedRevision: revision,
      occurredAt: '2026-07-22T01:10:00.000Z',
      reason: 'reconciliation passed',
      reconciliation: reconciliationPassed,
    }).state;
    expect(() =>
      transitionMemoryServerCanonicalMigration(cutover, {
        targetPhase: 'retire',
        expectedRevision: revision,
        occurredAt: '2026-07-23T00:00:00.000Z',
        reason: 'premature retirement',
        retirement: {
          legacyReadTraffic: 1,
          legacyWriteTraffic: 0,
          legacyImports: 0,
          legacyRegistrations: 0,
          rollbackWindowEndsAt: '2026-07-29T00:00:00.000Z',
        },
      })
    ).toThrow('zero legacy traffic');
  });
});
