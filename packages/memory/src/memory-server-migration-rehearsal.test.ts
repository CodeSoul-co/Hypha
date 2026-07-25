import { describe, expect, it } from 'vitest';
import type {
  MemoryServerMigrationInventoryRecord,
  MemoryServerMigrationRehearsalCheckpoint,
  MemoryServerMigrationRehearsalCheckpointStore,
  MemoryServerMigrationRehearsalDataPort,
} from './memory-server-migration-rehearsal';
import { MemoryServerMigrationRehearsal } from './memory-server-migration-rehearsal';

class Checkpoints implements MemoryServerMigrationRehearsalCheckpointStore {
  readonly values = new Map<string, MemoryServerMigrationRehearsalCheckpoint>();
  async load(id: string) {
    return this.values.get(id) ?? null;
  }
  async save(id: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint) {
    this.values.set(id, structuredClone(checkpoint));
  }
}

class DataPort implements MemoryServerMigrationRehearsalDataPort {
  readonly legacy = new Map([
    ['message:1', 'digest:1'],
    ['conversation:1', 'digest:2'],
  ]);
  readonly canonical = new Map<string, { digest: string; id: string }>();
  readonly removed: string[] = [];
  retirementTraffic = 0;

  async listLegacy() {
    return inventory(this.legacy);
  }
  async listCanonical() {
    return [...this.canonical].map(([key, value]) => ({ key, digest: value.digest }));
  }
  async importCanonical(record: MemoryServerMigrationInventoryRecord) {
    const id = `canonical:${record.key}`;
    this.canonical.set(record.key, { digest: record.digest, id });
    return { canonicalId: id };
  }
  async writeDualProbe() {
    const record = { key: 'message:probe', digest: 'digest:probe' };
    this.legacy.set(record.key, record.digest);
    const canonicalId = `canonical:${record.key}`;
    this.canonical.set(record.key, { digest: record.digest, id: canonicalId });
    return { record, canonicalId };
  }
  async removeCanonical(ids: readonly string[]) {
    this.removed.push(...ids);
    for (const [key, value] of this.canonical) {
      if (ids.includes(value.id)) this.canonical.delete(key);
    }
  }
  async observeRetirement() {
    return {
      legacyReadTraffic: this.retirementTraffic,
      legacyWriteTraffic: 0,
      legacyImports: 0,
      legacyRegistrations: 0,
    };
  }
}

describe('MemoryServerMigrationRehearsal', () => {
  it('persists cutover and rolls back after process restart', async () => {
    const data = new DataPort();
    const checkpoints = new Checkpoints();
    const prepared = await new MemoryServerMigrationRehearsal(data, checkpoints).prepare(
      prepareInput('rollback-run')
    );
    expect(prepared.state).toMatchObject({
      phase: 'cutover',
      activePath: 'canonical',
      reconciliation: { status: 'passed', mismatchCount: 0 },
    });
    expect(prepared.events.map((event) => event.toPhase)).toEqual([
      'shadow_read',
      'bounded_dual_write',
      'verify',
      'cutover',
    ]);

    const rolledBack = await new MemoryServerMigrationRehearsal(data, checkpoints).rollback({
      migrationId: 'rollback-run',
      expectedRevision: 'revision:1',
      occurredAt: '2026-07-25T00:03:00.000Z',
    });
    expect(rolledBack.state).toMatchObject({ phase: 'rollback', activePath: 'legacy' });
    expect(data.canonical.size).toBe(0);
    expect(data.removed).toHaveLength(3);
  });

  it('retires only after the rollback window and zero legacy traffic', async () => {
    const data = new DataPort();
    const rehearsal = new MemoryServerMigrationRehearsal(data, new Checkpoints());
    await rehearsal.prepare(prepareInput('retire-run'));
    data.retirementTraffic = 1;
    await expect(
      rehearsal.retire({
        migrationId: 'retire-run',
        expectedRevision: 'revision:1',
        occurredAt: '2026-07-25T00:05:00.000Z',
        rollbackWindowEndsAt: '2026-07-25T00:04:00.000Z',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_MAINTENANCE_CONFLICT' });
    data.retirementTraffic = 0;
    const retired = await rehearsal.retire({
      migrationId: 'retire-run',
      expectedRevision: 'revision:1',
      occurredAt: '2026-07-25T00:05:00.000Z',
      rollbackWindowEndsAt: '2026-07-25T00:04:00.000Z',
    });
    expect(retired.state).toMatchObject({ phase: 'retire', activePath: 'canonical' });
  });

  it('fails closed and removes imports when reconciliation detects drift', async () => {
    const data = new DataPort();
    data.listCanonical = async () =>
      [...data.canonical].map(([key, value]) => ({
        key,
        digest: key === 'message:1' ? 'drifted' : value.digest,
      }));
    const result = await new MemoryServerMigrationRehearsal(data, new Checkpoints()).prepare(
      prepareInput('drift-run')
    );
    expect(result.state).toMatchObject({ phase: 'rollback', activePath: 'legacy' });
    expect(result.reconciliation).toMatchObject({ status: 'failed', mismatchCount: 1 });
    expect(data.canonical.size).toBe(0);
  });
});

function prepareInput(migrationId: string) {
  return {
    migrationId,
    revision: 'revision:1',
    occurredAt: '2026-07-25T00:00:00.000Z',
    dualWriteDeadlineAt: '2026-07-25T00:10:00.000Z',
    checkpointRef: `checkpoint:${migrationId}`,
  };
}

function inventory(values: Map<string, string>) {
  return [...values].map(([key, digest]) => ({ key, digest }));
}
