import type {
  MemoryServerCanonicalMigrationState,
  MemoryServerMigrationReconciliation,
  MemoryServerMigrationRetirementEvidence,
  MemoryServerMigrationTransitionEvent,
  MemoryServerMigrationTransitionInput,
} from './memory-server-consumer-migration';
import {
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
} from './memory-server-consumer-migration';
import { memoryError } from './memory-utils';

export interface MemoryServerMigrationInventoryRecord {
  key: string;
  digest: string;
}

export interface MemoryServerMigrationRehearsalDataPort {
  listLegacy(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
  listCanonical(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
  importCanonical(
    record: MemoryServerMigrationInventoryRecord,
    idempotencyKey: string
  ): Promise<{ canonicalId: string }>;
  writeDualProbe(idempotencyKey: string): Promise<{
    record: MemoryServerMigrationInventoryRecord;
    canonicalId: string;
  }>;
  removeCanonical(canonicalIds: readonly string[]): Promise<void>;
  observeRetirement(): Promise<
    Omit<MemoryServerMigrationRetirementEvidence, 'rollbackWindowEndsAt'>
  >;
}

export interface MemoryServerMigrationRehearsalCheckpoint {
  state: MemoryServerCanonicalMigrationState;
  events: readonly MemoryServerMigrationTransitionEvent[];
  importedCanonicalIds: readonly string[];
  reconciliation: MemoryServerMigrationReconciliation;
}

export interface MemoryServerMigrationRehearsalCheckpointStore {
  load(migrationId: string): Promise<MemoryServerMigrationRehearsalCheckpoint | null>;
  save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise<void>;
}

export interface MemoryServerMigrationPrepareInput {
  migrationId: string;
  revision: string;
  occurredAt: string;
  dualWriteDeadlineAt: string;
  checkpointRef: string;
}

export interface MemoryServerMigrationFinishInput {
  migrationId: string;
  expectedRevision: string;
  occurredAt: string;
}

export class MemoryServerMigrationRehearsal {
  constructor(
    private readonly data: MemoryServerMigrationRehearsalDataPort,
    private readonly store: MemoryServerMigrationRehearsalCheckpointStore
  ) {}

  async prepare(
    input: MemoryServerMigrationPrepareInput
  ): Promise<MemoryServerMigrationRehearsalCheckpoint> {
    const existing = await this.store.load(input.migrationId);
    if (existing) return existing;
    let checkpoint: MemoryServerMigrationRehearsalCheckpoint = {
      state: createMemoryServerCanonicalMigrationState({
        migrationId: input.migrationId,
        revision: input.revision,
        createdAt: input.occurredAt,
      }),
      events: [],
      importedCanonicalIds: [],
      reconciliation: notRun(),
    };
    checkpoint = await this.move(checkpoint, {
      targetPhase: 'shadow_read',
      expectedRevision: input.revision,
      occurredAt: input.occurredAt,
      reason: 'shadow inventory captured',
    });
    checkpoint = {
      ...checkpoint,
      reconciliation: compare(await this.data.listLegacy(), await this.data.listCanonical()),
    };
    await this.store.save(input.migrationId, checkpoint);
    checkpoint = await this.move(checkpoint, {
      targetPhase: 'bounded_dual_write',
      expectedRevision: input.revision,
      occurredAt: input.occurredAt,
      reason: 'bounded dual write started',
      dualWrite: {
        deadlineAt: input.dualWriteDeadlineAt,
        idempotencyKey: `memory-migration:${input.migrationId}:dual`,
        checkpointRef: input.checkpointRef,
      },
    });
    for (const record of unique(await this.data.listLegacy(), 'legacy')) {
      const imported = await this.data.importCanonical(
        record,
        `memory-migration:${input.migrationId}:import:${record.key}`
      );
      checkpoint = await this.recordImport(checkpoint, imported.canonicalId);
    }
    const probe = await this.data.writeDualProbe(`memory-migration:${input.migrationId}:probe`);
    checkpoint = await this.recordImport(checkpoint, probe.canonicalId);
    const reconciliation = compare(await this.data.listLegacy(), await this.data.listCanonical());
    checkpoint = { ...checkpoint, reconciliation };
    checkpoint = await this.move(checkpoint, {
      targetPhase: 'verify',
      expectedRevision: input.revision,
      occurredAt: input.occurredAt,
      reason: 'inventories reconciled',
      reconciliation,
    });
    checkpoint = await this.move(checkpoint, {
      targetPhase: 'cutover',
      expectedRevision: input.revision,
      occurredAt: input.occurredAt,
      reason: 'reconciliation gate evaluated',
      reconciliation,
    });
    if (checkpoint.state.phase === 'rollback') {
      await this.data.removeCanonical(checkpoint.importedCanonicalIds);
      await this.store.save(input.migrationId, checkpoint);
    }
    return checkpoint;
  }

  async rollback(input: MemoryServerMigrationFinishInput) {
    const checkpoint = await this.required(input.migrationId);
    if (checkpoint.state.phase === 'rollback') return checkpoint;
    if (checkpoint.state.phase !== 'cutover') throw conflict('Rollback requires cutover state.');
    await this.data.removeCanonical(checkpoint.importedCanonicalIds);
    return this.move(checkpoint, {
      targetPhase: 'rollback',
      expectedRevision: input.expectedRevision,
      occurredAt: input.occurredAt,
      reason: 'canonical imports removed',
    });
  }

  async retire(input: MemoryServerMigrationFinishInput & { rollbackWindowEndsAt: string }) {
    const checkpoint = await this.required(input.migrationId);
    if (checkpoint.state.phase === 'retire') return checkpoint;
    if (checkpoint.state.phase !== 'cutover') throw conflict('Retirement requires cutover state.');
    const observed = await this.data.observeRetirement();
    return this.move(checkpoint, {
      targetPhase: 'retire',
      expectedRevision: input.expectedRevision,
      occurredAt: input.occurredAt,
      reason: 'rollback window closed with no legacy activity',
      retirement: { ...observed, rollbackWindowEndsAt: input.rollbackWindowEndsAt },
    });
  }

  private async required(id: string) {
    const checkpoint = await this.store.load(id);
    if (!checkpoint) throw conflict(`Migration checkpoint ${id} was not found.`);
    return checkpoint;
  }

  private async recordImport(
    checkpoint: MemoryServerMigrationRehearsalCheckpoint,
    canonicalId: string
  ) {
    if (!canonicalId) throw conflict('Canonical import returned an empty id.');
    const next = checkpoint.importedCanonicalIds.includes(canonicalId)
      ? checkpoint
      : { ...checkpoint, importedCanonicalIds: [...checkpoint.importedCanonicalIds, canonicalId] };
    await this.store.save(checkpoint.state.migrationId, next);
    return next;
  }

  private async move(
    checkpoint: MemoryServerMigrationRehearsalCheckpoint,
    input: MemoryServerMigrationTransitionInput
  ) {
    const result = transitionMemoryServerCanonicalMigration(checkpoint.state, input);
    const next = {
      ...checkpoint,
      state: result.state,
      events: [...checkpoint.events, result.event],
      reconciliation: result.state.reconciliation,
    };
    await this.store.save(result.state.migrationId, next);
    return next;
  }
}

function compare(
  legacyInput: readonly MemoryServerMigrationInventoryRecord[],
  canonicalInput: readonly MemoryServerMigrationInventoryRecord[]
): MemoryServerMigrationReconciliation {
  const legacy = unique(legacyInput, 'legacy');
  const canonical = new Map(unique(canonicalInput, 'canonical').map((item) => [item.key, item]));
  const legacyKeys = new Set(legacy.map((item) => item.key));
  let mismatchCount = legacy.filter(
    (item) => canonical.get(item.key)?.digest !== item.digest
  ).length;
  mismatchCount += [...canonical.keys()].filter((key) => !legacyKeys.has(key)).length;
  return {
    status: mismatchCount === 0 ? 'passed' : 'failed',
    comparedRecords: legacy.length,
    mismatchCount,
    shadowResult: mismatchCount === 0 ? 'matched' : 'mismatched',
  };
}

function unique(records: readonly MemoryServerMigrationInventoryRecord[], source: string) {
  const result = new Map<string, MemoryServerMigrationInventoryRecord>();
  for (const record of records) {
    if (!record.key || !record.digest) throw conflict(`${source} inventory is incomplete.`);
    const previous = result.get(record.key);
    if (previous && previous.digest !== record.digest) {
      throw conflict(`${source} inventory conflicts at ${record.key}.`);
    }
    result.set(record.key, record);
  }
  return [...result.values()].sort((left, right) => left.key.localeCompare(right.key));
}

function notRun(): MemoryServerMigrationReconciliation {
  return { status: 'not_run', comparedRecords: 0, mismatchCount: 0, shadowResult: 'not_run' };
}

function conflict(message: string) {
  return memoryError('MEMORY_MAINTENANCE_CONFLICT', message);
}
