import type { RuntimeRun, RuntimeRunStatus, RuntimeWaitRecord } from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { RunLease, RunLeaseStore } from './durable-coordination';
import type { EventStreamHead, EventStreamScope, ListEventStreamHeadsRequest } from './event-store';
import type { DurableEventRuntime } from './event-runtime';
import { projectRuntimeRun, projectRuntimeWaits } from './run-manager';

export const RECOVERY_REASONS = [
  'LEASE_EXPIRED',
  'STATE_CLAIM_EXPIRED',
  'PROJECTION_BEHIND',
  'CHECKPOINT_BEHIND',
  'ACTIVITY_RESULT_UNAPPLIED',
  'MESSAGE_UNACKED',
  'OUTBOX_UNPUBLISHED',
  'WAIT_WITHOUT_REGISTRATION',
  'TIMER_OVERDUE',
  'SESSION_COMMAND_INCOMPLETE',
  'RUN_PROJECTION_CONFLICT',
  'CUSTOM',
] as const;

export const RECOVERY_SAFE_ACTIONS = [
  'rebuild_projection',
  'requeue',
  'apply_observation',
  'restore_wait',
  'fire_timer',
  'republish_message',
  'mark_failed',
  'manual_review',
] as const;

export type RecoveryReason = (typeof RECOVERY_REASONS)[number];
export type RecoverySafeAction = (typeof RECOVERY_SAFE_ACTIONS)[number];

export interface RecoveryCandidateV2 {
  id: string;
  scope: EventStreamScope;
  reason: RecoveryReason;
  safeAction: RecoverySafeAction;
  runStatus?: RuntimeRunStatus;
  eventHeadSequence: number;
  runRevision: number;
  projectionSequence?: number;
  checkpointSequence?: number;
  currentLease?: RunLease;
  wait?: RuntimeWaitRecord;
  details?: Record<string, unknown>;
}

export interface RecoveryScanRequest extends ListEventStreamHeadsRequest {
  now: string;
}

export interface RecoveryScanResult {
  candidates: RecoveryCandidateV2[];
  scannedStreams: number;
  nextCursor?: string;
}

export interface EventFirstRecoveryScannerOptions {
  events: DurableEventRuntime;
  leases?: RunLeaseStore;
}

export class EventFirstRecoveryScanner {
  private readonly events: DurableEventRuntime;

  constructor(private readonly options: EventFirstRecoveryScannerOptions) {
    this.events = options.events;
  }

  async scan(request: RecoveryScanRequest): Promise<RecoveryScanResult> {
    timestamp(request.now, 'now');
    const page = await this.events.listStreamHeads({
      ...(request.cursor === undefined ? {} : { cursor: request.cursor }),
      ...(request.limit === undefined ? {} : { limit: request.limit }),
    });
    const candidates: RecoveryCandidateV2[] = [];
    for (const head of page.heads) {
      const candidate = await this.inspect(head, request.now);
      if (candidate) candidates.push(candidate);
    }
    return {
      candidates,
      scannedStreams: page.heads.length,
      ...(page.nextCursor === undefined ? {} : { nextCursor: page.nextCursor }),
    };
  }

  async inspectScope(scope: EventStreamScope, now: string): Promise<RecoveryCandidateV2 | null> {
    timestamp(now, 'now');
    const head = await this.events.getStreamHead(scope);
    return head ? this.inspect(head, now) : null;
  }

  private async inspect(head: EventStreamHead, now: string): Promise<RecoveryCandidateV2 | null> {
    const stream = await this.events.read({ scope: head.scope });
    let run: RuntimeRun | null;
    let waits: RuntimeWaitRecord[];
    try {
      run = projectRuntimeRun(stream);
      waits = projectRuntimeWaits(stream);
    } catch (error) {
      return candidate(head, 'RUN_PROJECTION_CONFLICT', 'rebuild_projection', {
        details: {
          error: error instanceof Error ? error.message : 'Event projection failed',
        },
      });
    }
    if (!run) {
      return candidate(head, 'RUN_PROJECTION_CONFLICT', 'manual_review', {
        details: { error: 'Event stream does not contain a Run creation event' },
      });
    }
    if (run.revision !== head.runRevision) {
      return candidate(head, 'RUN_PROJECTION_CONFLICT', 'rebuild_projection', {
        runStatus: run.status,
        details: {
          projectionRevision: run.revision,
          streamRevision: head.runRevision,
        },
      });
    }

    const pendingWait = waits.filter((wait) => wait.status === 'waiting').at(-1);
    if (isWaiting(run.status)) {
      if (!pendingWait || !waitMatchesStatus(pendingWait, run.status)) {
        return candidate(head, 'WAIT_WITHOUT_REGISTRATION', 'manual_review', {
          runStatus: run.status,
          ...(pendingWait === undefined ? {} : { pendingWaitType: pendingWait.type }),
        });
      }
      if (
        run.status === 'waiting_timer' &&
        pendingWait.expiresAt !== undefined &&
        Date.parse(pendingWait.expiresAt) <= Date.parse(now)
      ) {
        return candidate(head, 'TIMER_OVERDUE', 'fire_timer', {
          runStatus: run.status,
          wait: pendingWait,
          details: { dueAt: pendingWait.expiresAt, observedAt: now },
        });
      }
      return candidate(head, 'CUSTOM', 'restore_wait', {
        runStatus: run.status,
        wait: pendingWait,
        details: { recoveryKind: 'durable_wait_registration' },
      });
    }

    if (run.status === 'running') {
      const lease = await this.options.leases?.get(run.id);
      if (!lease || Date.parse(lease.expiresAt) <= Date.parse(now)) {
        return candidate(head, 'LEASE_EXPIRED', 'requeue', {
          runStatus: run.status,
          ...(lease === null || lease === undefined ? {} : { currentLease: lease }),
        });
      }
      return null;
    }

    if (run.status === 'cancelling') {
      return candidate(head, 'CUSTOM', 'requeue', {
        runStatus: run.status,
        details: { recoveryKind: 'continue_cancellation' },
      });
    }
    if (run.status === 'recovering' || run.status === 'retry_scheduled') {
      return candidate(head, 'CUSTOM', 'requeue', {
        runStatus: run.status,
        details: { recoveryKind: 'continue_runtime_progress' },
      });
    }
    return null;
  }
}

function candidate(
  head: EventStreamHead,
  reason: RecoveryReason,
  safeAction: RecoverySafeAction,
  additions: Pick<RecoveryCandidateV2, 'runStatus' | 'currentLease' | 'wait' | 'details'> = {}
): RecoveryCandidateV2 {
  return {
    id: [
      'recovery',
      reason,
      head.scope.tenantId ?? '_',
      head.scope.userId,
      head.scope.runId,
      String(head.lastSequence),
    ].join(':'),
    scope: clone(head.scope),
    reason,
    safeAction,
    eventHeadSequence: head.lastSequence,
    runRevision: head.runRevision,
    ...clone(additions),
  };
}

function isWaiting(status: RuntimeRunStatus): boolean {
  return ['waiting', 'waiting_human', 'waiting_signal', 'waiting_timer'].includes(status);
}

function waitMatchesStatus(wait: RuntimeWaitRecord, status: RuntimeRunStatus): boolean {
  if (status === 'waiting_human') return wait.type === 'human';
  if (status === 'waiting_signal') return wait.type === 'signal';
  if (status === 'waiting_timer') return wait.type === 'timer';
  return status === 'waiting' && wait.type === 'external_operation';
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `${label} must be a valid timestamp.`,
    });
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
