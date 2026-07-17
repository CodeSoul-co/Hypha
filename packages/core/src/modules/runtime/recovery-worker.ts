import type { RuntimeWaitRecord } from '../../contracts/runtime';
import type { RunLease, RunLeaseStore } from './durable-coordination';
import type { EventStreamScope } from './event-store';
import type { EventSourcedRunManager } from './run-manager';
import { type EventFirstRecoveryScanner, type RecoveryCandidateV2 } from './recovery-scanner';

export interface RecoveryWaitRestorer {
  restore(request: {
    candidate: RecoveryCandidateV2;
    wait: RuntimeWaitRecord;
  }): Promise<{ reused: boolean }>;
}

export interface RecoveryRunQueue {
  requeue(request: {
    candidate: RecoveryCandidateV2;
    lease: RunLease;
    mode: 'resume_run' | 'continue_cancellation';
    recoveryEventIds: string[];
  }): Promise<{ reused: boolean }>;
}

export interface RecoveryProjectionRebuilder {
  rebuild(request: { candidate: RecoveryCandidateV2 }): Promise<{ projectionSequence: number }>;
}

export interface RecoveryManualReviewSink {
  requireReview(request: {
    candidate: RecoveryCandidateV2;
  }): Promise<{ reused: boolean; reviewRef?: string }>;
}

export type RecoveryExecutionStatus =
  | 'recovered'
  | 'reused'
  | 'deferred'
  | 'manual_review'
  | 'stale';

export interface RecoveryExecutionResult {
  candidateId: string;
  status: RecoveryExecutionStatus;
  safeAction: RecoveryCandidateV2['safeAction'];
  eventIds: string[];
  lease?: RunLease;
  details?: Record<string, unknown>;
}

export interface RuntimeReconciliationResult {
  scope: EventStreamScope;
  consistent: boolean;
  candidate?: RecoveryCandidateV2;
  checkedAt: string;
}

export interface EventFirstRecoveryWorkerOptions {
  scanner: EventFirstRecoveryScanner;
  runs: EventSourcedRunManager;
  leases: RunLeaseStore;
  workerId: string;
  leaseTtlMs: number;
  waits?: RecoveryWaitRestorer;
  queue?: RecoveryRunQueue;
  projections?: RecoveryProjectionRebuilder;
  reviews?: RecoveryManualReviewSink;
}

export class EventFirstRecoveryWorker {
  constructor(private readonly options: EventFirstRecoveryWorkerOptions) {
    if (!options.workerId) throw new Error('Recovery workerId is required.');
    if (!Number.isInteger(options.leaseTtlMs) || options.leaseTtlMs < 1) {
      throw new Error('Recovery leaseTtlMs must be positive.');
    }
  }

  async recover(candidate: RecoveryCandidateV2, now: string): Promise<RecoveryExecutionResult> {
    const current = await this.options.scanner.inspectScope(candidate.scope, now);
    if (!current || current.id !== candidate.id) {
      return result(candidate, 'stale', [], {
        reason: current ? 'candidate_changed' : 'candidate_resolved',
        ...(current === null ? {} : { currentCandidateId: current.id }),
      });
    }

    try {
      if (current.safeAction === 'fire_timer') return this.fireTimer(current, now);
      if (current.safeAction === 'restore_wait') return this.restoreWait(current);
      if (current.safeAction === 'requeue') return this.requeue(current, now);
      if (current.safeAction === 'rebuild_projection') {
        return this.rebuildProjection(current);
      }
      if (current.safeAction === 'manual_review') return this.requireReview(current);
      return result(current, 'deferred', [], { reason: 'unsupported_safe_action' });
    } catch (error) {
      return result(current, 'deferred', [], {
        error: error instanceof Error ? error.message : 'Recovery action failed',
      });
    }
  }

  async reconcile(scope: EventStreamScope, now: string): Promise<RuntimeReconciliationResult> {
    const candidate = await this.options.scanner.inspectScope(scope, now);
    return {
      scope: clone(scope),
      consistent: candidate === null,
      ...(candidate === null ? {} : { candidate }),
      checkedAt: now,
    };
  }

  private async fireTimer(
    candidate: RecoveryCandidateV2,
    now: string
  ): Promise<RecoveryExecutionResult> {
    if (!candidate.wait || candidate.wait.type !== 'timer') {
      return result(candidate, 'deferred', [], { reason: 'timer_wait_missing' });
    }
    const lease = await this.acquire(candidate, now);
    if (!lease) return result(candidate, 'deferred', [], { reason: 'lease_not_acquired' });
    const committed = await this.options.runs.fireTimer({
      scope: clone(candidate.scope),
      expectedLastSequence: candidate.eventHeadSequence,
      expectedRunRevision: candidate.runRevision,
      fencingToken: lease.fencingToken,
      idempotencyKey: `${candidate.id}:fire-timer`,
      operationId: `${candidate.id}:fire-timer`,
      waitId: candidate.wait.id,
      firedAt: now,
    });
    return result(
      candidate,
      committed.append.reused ? 'reused' : 'recovered',
      committed.append.events.map((event) => event.id),
      undefined,
      lease
    );
  }

  private async restoreWait(candidate: RecoveryCandidateV2): Promise<RecoveryExecutionResult> {
    if (!candidate.wait) {
      return result(candidate, 'deferred', [], { reason: 'wait_missing' });
    }
    if (!this.options.waits) {
      return result(candidate, 'deferred', [], { reason: 'wait_restorer_unavailable' });
    }
    const restored = await this.options.waits.restore({
      candidate: clone(candidate),
      wait: clone(candidate.wait),
    });
    return result(candidate, restored.reused ? 'reused' : 'recovered', []);
  }

  private async requeue(
    candidate: RecoveryCandidateV2,
    now: string
  ): Promise<RecoveryExecutionResult> {
    if (!this.options.queue) {
      return result(candidate, 'deferred', [], { reason: 'recovery_queue_unavailable' });
    }
    const lease = await this.acquire(candidate, now);
    if (!lease) return result(candidate, 'deferred', [], { reason: 'lease_not_acquired' });

    let eventIds: string[] = [];
    if (candidate.runStatus === 'running' || candidate.runStatus === 'retry_scheduled') {
      const recovering = await this.options.runs.beginRecovery({
        scope: clone(candidate.scope),
        expectedLastSequence: candidate.eventHeadSequence,
        expectedRunRevision: candidate.runRevision,
        fencingToken: lease.fencingToken,
        idempotencyKey: `${candidate.id}:begin-recovery`,
        operationId: `${candidate.id}:begin-recovery`,
      });
      eventIds = recovering.append.events.map((event) => event.id);
    }
    const queued = await this.options.queue.requeue({
      candidate: clone(candidate),
      lease: clone(lease),
      mode: candidate.runStatus === 'cancelling' ? 'continue_cancellation' : 'resume_run',
      recoveryEventIds: [...eventIds],
    });
    return result(candidate, queued.reused ? 'reused' : 'recovered', eventIds, undefined, lease);
  }

  private async rebuildProjection(
    candidate: RecoveryCandidateV2
  ): Promise<RecoveryExecutionResult> {
    if (!this.options.projections) {
      return result(candidate, 'deferred', [], { reason: 'projection_rebuilder_unavailable' });
    }
    const rebuilt = await this.options.projections.rebuild({ candidate: clone(candidate) });
    return result(candidate, 'recovered', [], {
      projectionSequence: rebuilt.projectionSequence,
    });
  }

  private async requireReview(candidate: RecoveryCandidateV2): Promise<RecoveryExecutionResult> {
    if (!this.options.reviews) {
      return result(candidate, 'deferred', [], { reason: 'manual_review_sink_unavailable' });
    }
    const review = await this.options.reviews.requireReview({ candidate: clone(candidate) });
    return result(candidate, 'manual_review', [], {
      reused: review.reused,
      ...(review.reviewRef === undefined ? {} : { reviewRef: review.reviewRef }),
    });
  }

  private acquire(candidate: RecoveryCandidateV2, now: string): Promise<RunLease | null> {
    return this.options.leases.acquire({
      runId: candidate.scope.runId,
      ownerId: this.options.workerId,
      now,
      ttlMs: this.options.leaseTtlMs,
    });
  }
}

function result(
  candidate: RecoveryCandidateV2,
  status: RecoveryExecutionStatus,
  eventIds: string[],
  details?: Record<string, unknown>,
  lease?: RunLease
): RecoveryExecutionResult {
  return {
    candidateId: candidate.id,
    status,
    safeAction: candidate.safeAction,
    eventIds: [...eventIds],
    ...(lease === undefined ? {} : { lease: clone(lease) }),
    ...(details === undefined ? {} : { details: clone(details) }),
  };
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
