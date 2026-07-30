import { randomUUID } from 'crypto';
import { isDeepStrictEqual } from 'node:util';
import type {
  ExecutionReceipt,
  CommandExecutionResult,
  CommandExecutionStatus,
} from '../../contracts/command-execution';
import type {
  ExecutionLeaseGuard,
  ExecutionRecord,
  ExecutionRecoveryAssessment,
  ExecutionStore,
} from '../../contracts/execution-store';
import { executionReceiptSchema, validateCommandExecutionResult } from '../command-execution';
import { validateExecutionRecord, validateExecutionRecoveryAssessment } from './index';

const terminalStatuses = new Set<CommandExecutionStatus>([
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
]);

const claimConflictCodes = new Set([
  'EXECUTION_STORE_REVISION_CONFLICT',
  'EXECUTION_STORE_LEASE_HELD',
  'EXECUTION_STORE_TERMINAL',
]);

export interface DurableExecutionWorkerOptions {
  store: ExecutionStore;
  workerId: string;
  recoveryReconciler?: DurableExecutionRecoveryReconciler;
  leaseTtlMs?: number;
  claimBatchSize?: number;
  now?: () => string;
  leaseId?: (executionId: string, workerId: string) => string;
}

export interface DurableExecutionRecoveryReconciler {
  assess(record: ExecutionRecord): Promise<ExecutionRecoveryAssessment>;
}

/**
 * Provider-neutral lease/fencing coordinator for durable Execution workers.
 *
 * Provider execution remains behind the Execution activity boundary. This
 * class only claims persisted work and supplies fenced renew/commit/release
 * operations so Server composition does not reimplement Store semantics.
 */
export class DurableExecutionWorker {
  private readonly store: ExecutionStore;
  private readonly workerId: string;
  private readonly leaseTtlMs: number;
  private readonly claimBatchSize: number;
  private readonly now: () => string;
  private readonly leaseId: (executionId: string, workerId: string) => string;
  private readonly recoveryReconciler?: DurableExecutionRecoveryReconciler;
  private acceptingClaims = true;

  constructor(options: DurableExecutionWorkerOptions) {
    this.store = options.store;
    this.workerId = requiredIdentifier(options.workerId, 'workerId');
    this.leaseTtlMs = positiveInteger(options.leaseTtlMs ?? 30_000, 'leaseTtlMs');
    this.claimBatchSize = positiveInteger(options.claimBatchSize ?? 32, 'claimBatchSize');
    this.now = options.now ?? (() => new Date().toISOString());
    this.recoveryReconciler = options.recoveryReconciler;
    this.leaseId =
      options.leaseId ??
      ((executionId, workerId) => `lease:${workerId}:${executionId}:${randomUUID()}`);
  }

  startClaiming(): void {
    this.acceptingClaims = true;
  }

  stopClaiming(): void {
    this.acceptingClaims = false;
  }

  async claimNext(): Promise<ExecutionRecord | null> {
    if (!this.acceptingClaims) return null;
    const observedAt = validTimestamp(this.now(), 'now');
    const [queued, recoverable] = await Promise.all([
      this.store.list({ statuses: ['queued'], limit: this.claimBatchSize }),
      this.store.list({
        statuses: ['starting', 'running', 'cancelling'],
        leaseExpiresBefore: observedAt,
        limit: this.claimBatchSize,
      }),
    ]);
    const candidates = uniqueCandidates([...queued.records, ...recoverable.records]).sort(
      compareCandidates
    );

    for (const candidateValue of candidates) {
      if (!this.acceptingClaims) return null;
      const candidate = validateExecutionRecord(candidateValue);
      await this.assertRecoverySafe(candidate);
      const acquiredAt = timestampAfter(candidate.updatedAt, observedAt);
      const requestedLeaseId = requiredIdentifier(
        this.leaseId(candidate.id, this.workerId),
        'leaseId'
      );
      try {
        return validateExecutionRecord(
          await this.store.acquireLease({
            operationId: `worker.claim:${this.workerId}:${candidate.id}:${candidate.revision}`,
            executionId: candidate.id,
            expectedRevision: candidate.revision,
            requestedLeaseId,
            ownerId: this.workerId,
            ttlMs: this.leaseTtlMs,
            acquiredAt,
            idempotencyKey: `worker.claim:${requestedLeaseId}`,
          })
        );
      } catch (error) {
        if (claimConflictCodes.has(errorCode(error) ?? '')) continue;
        throw error;
      }
    }
    return null;
  }

  private async assertRecoverySafe(record: ExecutionRecord): Promise<void> {
    if (record.status === 'queued' || record.terminalReceipt) return;
    if (!this.recoveryReconciler) {
      throw new ExecutionWorkerReconciliationRequiredError(
        record.id,
        'recovery_reconciler_missing'
      );
    }

    const assessment = validateExecutionRecoveryAssessment(
      await this.recoveryReconciler.assess(record)
    );
    if (assessment.executionId !== record.id || assessment.recordRevision !== record.revision) {
      throw new ExecutionWorkerReconciliationRequiredError(
        record.id,
        'recovery_assessment_identity_mismatch'
      );
    }
    if (assessment.disposition !== 'not_started') {
      throw new ExecutionWorkerReconciliationRequiredError(record.id, assessment.disposition);
    }
  }

  async renew(recordValue: ExecutionRecord): Promise<ExecutionRecord> {
    const record = validateExecutionRecord(recordValue);
    const guard = this.leaseGuard(record);
    const heartbeatAt = timestampAfter(record.updatedAt, validTimestamp(this.now(), 'now'));
    return validateExecutionRecord(
      await this.store.renewLease({
        operationId: `worker.renew:${this.workerId}:${record.id}:${record.revision}`,
        executionId: record.id,
        expectedRevision: record.revision,
        leaseGuard: guard,
        ttlMs: this.leaseTtlMs,
        heartbeatAt,
        idempotencyKey: `worker.renew:${guard.leaseId}:${record.revision}`,
      })
    );
  }

  async commit(
    recordValue: ExecutionRecord,
    resultValue: CommandExecutionResult
  ): Promise<ExecutionRecord> {
    const record = validateExecutionRecord(recordValue);
    const result = validateCommandExecutionResult(resultValue);
    const guard = this.leaseGuard(record);
    if (!terminalStatuses.has(result.status)) {
      throw new TypeError('Worker can only commit a terminal Execution result.');
    }
    if (result.executionId !== record.id) {
      throw new TypeError('Execution result identity does not match the claimed record.');
    }
    if (record.terminalReceipt && !result.externalReceipt) {
      throw new TypeError('Terminal result must preserve the durable Provider receipt checkpoint.');
    }
    if (result.externalReceipt) {
      if (!record.terminalReceipt) {
        throw new TypeError(
          'Provider terminal receipt must be durably checkpointed before terminal commit.'
        );
      }
      if (!sameReceipt(record.terminalReceipt, result.externalReceipt)) {
        throw new TypeError(
          'Execution result receipt does not match the durable terminal receipt checkpoint.'
        );
      }
    }

    const updatedAt = timestampAfter(record.updatedAt, validTimestamp(this.now(), 'now'));
    const revision = record.revision + 1;
    const completed = validateExecutionRecord({
      ...record,
      revision,
      status: result.status,
      sandboxId: result.sandboxId,
      result: { ...result, revision },
      updatedAt,
    });
    const committed = validateExecutionRecord(
      await this.store.compareAndSet({
        operationId: `worker.commit:${this.workerId}:${record.id}:${record.revision}`,
        executionId: record.id,
        expectedRevision: record.revision,
        leaseGuard: guard,
        next: completed,
        idempotencyKey: `worker.commit:${guard.leaseId}:${record.revision}`,
      })
    );
    return this.release(committed, 'terminal_committed');
  }

  async checkpointTerminalReceipt(
    recordValue: ExecutionRecord,
    receiptValue: ExecutionReceipt
  ): Promise<ExecutionRecord> {
    const record = validateExecutionRecord(recordValue);
    const receipt = executionReceiptSchema.parse(receiptValue);
    const guard = this.leaseGuard(record);
    if (terminalStatuses.has(record.status)) {
      throw new TypeError('Cannot checkpoint a receipt after Execution terminal commit.');
    }
    if (receipt.status !== 'completed' && receipt.status !== 'rejected') {
      throw new TypeError('Worker can checkpoint only a terminal Provider receipt.');
    }
    if (receipt.executionId !== record.id || receipt.providerId !== record.providerId) {
      throw new TypeError('Provider receipt identity does not match the claimed record.');
    }
    if (record.terminalReceipt) {
      if (!sameReceipt(record.terminalReceipt, receipt)) {
        throw new TypeError('Durable terminal receipt checkpoint is immutable.');
      }
      return record;
    }

    const updatedAt = timestampAfter(record.updatedAt, validTimestamp(this.now(), 'now'));
    const checkpointed = validateExecutionRecord({
      ...record,
      revision: record.revision + 1,
      terminalReceipt: receipt,
      updatedAt,
    });
    return validateExecutionRecord(
      await this.store.compareAndSet({
        operationId: `worker.receipt:${this.workerId}:${record.id}:${receipt.id}`,
        executionId: record.id,
        expectedRevision: record.revision,
        leaseGuard: guard,
        next: checkpointed,
        idempotencyKey: `worker.receipt:${guard.leaseId}:${receipt.id}:${receipt.receiptHash}`,
      })
    );
  }

  async release(
    recordValue: ExecutionRecord,
    reason = 'worker_released'
  ): Promise<ExecutionRecord> {
    const record = validateExecutionRecord(recordValue);
    const guard = this.leaseGuard(record);
    const releasedAt = timestampAfter(record.updatedAt, validTimestamp(this.now(), 'now'));
    return validateExecutionRecord(
      await this.store.releaseLease({
        operationId: `worker.release:${this.workerId}:${record.id}:${record.revision}`,
        executionId: record.id,
        expectedRevision: record.revision,
        leaseGuard: guard,
        releasedAt,
        reason,
        idempotencyKey: `worker.release:${guard.leaseId}:${record.revision}`,
      })
    );
  }

  private leaseGuard(record: ExecutionRecord): ExecutionLeaseGuard {
    const lease = record.lease;
    if (!lease || lease.ownerId !== this.workerId) {
      throw new ExecutionWorkerLeaseLostError(record.id, this.workerId);
    }
    return {
      leaseId: lease.id,
      ownerId: lease.ownerId,
      fencingToken: lease.fencingToken,
    };
  }
}

export class ExecutionWorkerLeaseLostError extends Error {
  readonly code = 'EXECUTION_WORKER_LEASE_LOST';

  constructor(executionId: string, workerId: string) {
    super(`Worker ${workerId} no longer owns the lease for Execution ${executionId}.`);
    this.name = 'ExecutionWorkerLeaseLostError';
  }
}

export class ExecutionWorkerReconciliationRequiredError extends Error {
  readonly code = 'EXECUTION_WORKER_RECONCILIATION_REQUIRED';
  readonly reason: string;

  constructor(executionId: string, reason: string) {
    super(`Execution ${executionId} requires Provider reconciliation before worker takeover.`);
    this.name = 'ExecutionWorkerReconciliationRequiredError';
    this.reason = reason;
  }
}

function uniqueCandidates(records: ExecutionRecord[]): ExecutionRecord[] {
  const candidates = new Map<string, ExecutionRecord>();
  for (const record of records) candidates.set(record.id, record);
  return [...candidates.values()];
}

function compareCandidates(left: ExecutionRecord, right: ExecutionRecord): number {
  return left.createdAt.localeCompare(right.createdAt) || left.id.localeCompare(right.id);
}

function timestampAfter(previous: string, candidate: string): string {
  const previousTime = Date.parse(validTimestamp(previous, 'previous timestamp'));
  const candidateTime = Date.parse(validTimestamp(candidate, 'candidate timestamp'));
  return new Date(Math.max(candidateTime, previousTime + 1)).toISOString();
}

function validTimestamp(value: string, name: string): string {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) {
    throw new TypeError(`${name} must be an ISO timestamp.`);
  }
  return value;
}

function requiredIdentifier(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim() !== value || value.length === 0) {
    throw new TypeError(`${name} must be a non-empty, trimmed string.`);
  }
  return value;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}

function errorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('code' in error)) return undefined;
  return typeof error.code === 'string' ? error.code : undefined;
}

function sameReceipt(left: ExecutionReceipt, right: ExecutionReceipt): boolean {
  return isDeepStrictEqual(left, right);
}
