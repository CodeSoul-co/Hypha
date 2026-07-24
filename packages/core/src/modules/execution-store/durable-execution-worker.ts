import { randomUUID } from 'crypto';
import type {
  CommandExecutionResult,
  CommandExecutionStatus,
} from '../../contracts/command-execution';
import type {
  ExecutionLeaseGuard,
  ExecutionRecord,
  ExecutionStore,
} from '../../contracts/execution-store';
import {
  validateCommandExecutionResult,
} from '../command-execution';
import { validateExecutionRecord } from './index';

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
  leaseTtlMs?: number;
  claimBatchSize?: number;
  now?: () => string;
  leaseId?: (executionId: string, workerId: string) => string;
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
  private acceptingClaims = true;

  constructor(options: DurableExecutionWorkerOptions) {
    this.store = options.store;
    this.workerId = requiredIdentifier(options.workerId, 'workerId');
    this.leaseTtlMs = positiveInteger(options.leaseTtlMs ?? 30_000, 'leaseTtlMs');
    this.claimBatchSize = positiveInteger(options.claimBatchSize ?? 32, 'claimBatchSize');
    this.now = options.now ?? (() => new Date().toISOString());
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

  async release(recordValue: ExecutionRecord, reason = 'worker_released'): Promise<ExecutionRecord> {
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
