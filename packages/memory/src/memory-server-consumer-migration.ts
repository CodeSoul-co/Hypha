import type { MemoryServerConsumer } from './memory-server-migration-contract';
import { memoryError } from './memory-utils';

export type MemoryServerMigrationPhase =
  | 'planned'
  | 'shadow_read'
  | 'bounded_dual_write'
  | 'verify'
  | 'cutover'
  | 'retire'
  | 'rollback';

export interface MemoryServerMigrationReconciliation {
  status: 'not_run' | 'passed' | 'failed';
  comparedRecords: number;
  mismatchCount: number;
  shadowResult: 'not_run' | 'matched' | 'mismatched';
}

export interface MemoryServerMigrationRetirementEvidence {
  legacyReadTraffic: number;
  legacyWriteTraffic: number;
  legacyImports: number;
  legacyRegistrations: number;
  rollbackWindowEndsAt: string;
}

export interface MemoryServerCanonicalMigrationState {
  migrationId: string;
  revision: string;
  phase: MemoryServerMigrationPhase;
  activePath: 'legacy' | 'dual' | 'canonical';
  updatedAt: string;
  dualWrite?: {
    deadlineAt: string;
    idempotencyKey: string;
    checkpointRef: string;
  };
  reconciliation: MemoryServerMigrationReconciliation;
  retirement?: MemoryServerMigrationRetirementEvidence;
}

export interface MemoryServerMigrationTransitionInput {
  targetPhase: Exclude<MemoryServerMigrationPhase, 'planned'>;
  expectedRevision: string;
  occurredAt: string;
  reason: string;
  dualWrite?: {
    deadlineAt: string;
    idempotencyKey: string;
    checkpointRef: string;
  };
  reconciliation?: MemoryServerMigrationReconciliation;
  retirement?: MemoryServerMigrationRetirementEvidence;
}

export interface MemoryServerMigrationTransitionEvent {
  type: 'memory.server_migration.transitioned';
  migrationId: string;
  migrationRevision: string;
  fromPhase: MemoryServerMigrationPhase;
  toPhase: MemoryServerMigrationPhase;
  activePath: 'legacy' | 'dual' | 'canonical';
  shadowResult: MemoryServerMigrationReconciliation['shadowResult'];
  checkpointRef?: string;
  reason: string;
  occurredAt: string;
}

export interface MemoryServerMigrationTransitionResult {
  state: MemoryServerCanonicalMigrationState;
  event: MemoryServerMigrationTransitionEvent;
}

export interface CanonicalProfileSwitchObservation {
  profileId: string;
  expectedProviderId: string;
  observedReadProviderId: string;
  observedWriteProviderId: string;
}

export const allowedLegacyAdapterResponsibilities = [
  'delegate',
  'scope_mapping',
  'error_mapping',
] as const;

export type AllowedLegacyAdapterResponsibility =
  (typeof allowedLegacyAdapterResponsibilities)[number];

const allowedTransitions: Record<
  MemoryServerMigrationPhase,
  readonly MemoryServerMigrationPhase[]
> = {
  planned: ['shadow_read'],
  shadow_read: ['bounded_dual_write', 'rollback'],
  bounded_dual_write: ['verify', 'rollback'],
  verify: ['cutover', 'rollback'],
  cutover: ['retire', 'rollback'],
  retire: [],
  rollback: [],
};

export function createMemoryServerCanonicalMigrationState(input: {
  migrationId: string;
  revision: string;
  createdAt: string;
}): MemoryServerCanonicalMigrationState {
  if (!input.migrationId || !input.revision) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Migration id and revision are required.');
  }
  timestamp(input.createdAt, 'createdAt');
  return {
    migrationId: input.migrationId,
    revision: input.revision,
    phase: 'planned',
    activePath: 'legacy',
    updatedAt: input.createdAt,
    reconciliation: {
      status: 'not_run',
      comparedRecords: 0,
      mismatchCount: 0,
      shadowResult: 'not_run',
    },
  };
}

export function transitionMemoryServerCanonicalMigration(
  current: MemoryServerCanonicalMigrationState,
  input: MemoryServerMigrationTransitionInput
): MemoryServerMigrationTransitionResult {
  const occurredAt = timestamp(input.occurredAt, 'occurredAt');
  if (input.expectedRevision !== current.revision) {
    throw conflict('Migration revision does not match the active checkpoint.');
  }
  if (!allowedTransitions[current.phase].includes(input.targetPhase)) {
    throw conflict(`Migration cannot transition from ${current.phase} to ${input.targetPhase}.`);
  }
  if (
    current.phase === 'bounded_dual_write' &&
    input.targetPhase !== 'rollback' &&
    occurredAt > timestamp(requireDualWrite(current).deadlineAt, 'dualWrite.deadlineAt')
  ) {
    throw conflict('Bounded dual-write deadline has expired; only rollback is allowed.');
  }

  if (input.targetPhase === 'bounded_dual_write') validateDualWrite(input);

  const reconciliation = input.reconciliation ?? current.reconciliation;
  if (input.targetPhase === 'cutover' && reconciliationHasMismatch(reconciliation)) {
    return completeTransition(
      current,
      {
        ...input,
        targetPhase: 'rollback',
        reason: `reconciliation_failed: ${input.reason}`,
      },
      reconciliation
    );
  }
  if (
    input.targetPhase === 'cutover' &&
    (reconciliation.status !== 'passed' || reconciliation.shadowResult !== 'matched')
  ) {
    throw conflict('Cutover requires a passed reconciliation checkpoint.');
  }
  if (input.targetPhase === 'retire') validateRetirement(input, reconciliation);

  return completeTransition(current, input, reconciliation);
}

export function assertCanonicalConsumerSet(
  bindings: Partial<Record<MemoryServerConsumer, string>>,
  expectedServiceInstanceId: string,
  consumers: readonly MemoryServerConsumer[]
): void {
  for (const consumer of consumers) {
    if (bindings[consumer] !== expectedServiceInstanceId) {
      throw conflict(`${consumer} is not bound to the canonical Memory service instance.`);
    }
  }
}

function completeTransition(
  current: MemoryServerCanonicalMigrationState,
  input: MemoryServerMigrationTransitionInput,
  reconciliation: MemoryServerMigrationReconciliation
): MemoryServerMigrationTransitionResult {
  const target = input.targetPhase;
  const dualWrite = input.dualWrite ?? current.dualWrite;
  const activePath = phaseActivePath(target);
  const state: MemoryServerCanonicalMigrationState = {
    ...current,
    phase: target,
    activePath,
    updatedAt: input.occurredAt,
    dualWrite,
    reconciliation,
    retirement: input.retirement ?? current.retirement,
  };
  return {
    state,
    event: {
      type: 'memory.server_migration.transitioned',
      migrationId: current.migrationId,
      migrationRevision: current.revision,
      fromPhase: current.phase,
      toPhase: target,
      activePath,
      shadowResult: reconciliation.shadowResult,
      checkpointRef: dualWrite?.checkpointRef,
      reason: input.reason,
      occurredAt: input.occurredAt,
    },
  };
}

function validateDualWrite(input: MemoryServerMigrationTransitionInput): void {
  const dualWrite = input.dualWrite;
  if (
    !dualWrite?.idempotencyKey ||
    !dualWrite.checkpointRef ||
    timestamp(dualWrite.deadlineAt, 'dualWrite.deadlineAt') <=
      timestamp(input.occurredAt, 'occurredAt')
  ) {
    throw conflict(
      'Bounded dual-write requires a future deadline, idempotency key and rollback checkpoint.'
    );
  }
}

function validateRetirement(
  input: MemoryServerMigrationTransitionInput,
  reconciliation: MemoryServerMigrationReconciliation
): void {
  const evidence = input.retirement;
  if (!evidence) throw conflict('Retirement evidence is required.');
  if (reconciliation.status !== 'passed' || reconciliation.mismatchCount !== 0) {
    throw conflict('Retirement requires reconciliation without mismatches.');
  }
  if (
    evidence.legacyReadTraffic !== 0 ||
    evidence.legacyWriteTraffic !== 0 ||
    evidence.legacyImports !== 0 ||
    evidence.legacyRegistrations !== 0
  ) {
    throw conflict('Retirement requires zero legacy traffic, imports and registrations.');
  }
  if (
    timestamp(input.occurredAt, 'occurredAt') <
    timestamp(evidence.rollbackWindowEndsAt, 'retirement.rollbackWindowEndsAt')
  ) {
    throw conflict('Retirement cannot occur before the rollback window closes.');
  }
}

function reconciliationHasMismatch(reconciliation: MemoryServerMigrationReconciliation): boolean {
  return (
    reconciliation.status === 'failed' ||
    reconciliation.mismatchCount > 0 ||
    reconciliation.shadowResult === 'mismatched'
  );
}

function timestamp(value: string, field: string): number {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) {
    throw memoryError('MEMORY_INVALID_INPUT', `${field} must be a valid timestamp.`);
  }
  return parsed;
}

function requireDualWrite(state: MemoryServerCanonicalMigrationState) {
  if (!state.dualWrite) throw conflict('Dual-write checkpoint is missing.');
  return state.dualWrite;
}

function phaseActivePath(
  phase: MemoryServerMigrationPhase
): MemoryServerCanonicalMigrationState['activePath'] {
  if (phase === 'bounded_dual_write' || phase === 'verify') return 'dual';
  if (phase === 'cutover' || phase === 'retire') return 'canonical';
  return 'legacy';
}

function conflict(message: string) {
  return memoryError('MEMORY_MAINTENANCE_CONFLICT', message, false);
}
