import {
  createFrameworkEvent,
  FrameworkError,
  InMemoryAppendOnlyEventStore,
  type AppendOnlyEventStore,
  type EventAppendResult,
  type FrameworkEvent,
  type FrameworkEventType,
} from '@hypha/core';
import {
  createRuntimeActivityRequest,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
  type RuntimeActivityType,
  type RuntimeScope,
  type RuntimeStateAttempt,
  type RuntimeStateAttemptStatus,
} from './contracts';
import {
  InMemoryRuntimeLeaseCoordinator,
  type RuntimeLease,
  type RuntimeLeaseCoordinator,
} from './delivery-runtime';
import { createRuntimeActivityLifecycleEvents } from './loop-runtime';

export interface RuntimeStateAttemptPlan<TInput = unknown> {
  scope: RuntimeScope;
  fsmProcessId: string;
  stateId: string;
  attempt: number;
  activityType: RuntimeActivityType;
  operationId: string;
  input: TInput;
  activityId?: string;
  deadlineAt?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export type RuntimeStateAttemptExecutionStatus =
  | 'completed'
  | 'waiting'
  | 'failed'
  | 'cancelled'
  | 'busy';

export interface RuntimeStateAttemptExecutionResult<TOutput = unknown> {
  status: RuntimeStateAttemptExecutionStatus;
  attempt?: RuntimeStateAttempt;
  request?: RuntimeActivityRequest;
  activityResult?: RuntimeActivityResult<TOutput>;
  eventAppends: EventAppendResult[];
  lease?: RuntimeLease;
}

export interface RuntimeStateAttemptRecoveryInput {
  attempt: RuntimeStateAttempt;
  activityId: string;
  recoveryId?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeActivityPortResolver {
  resolve(
    attempt: RuntimeStateAttempt,
    activityId: string
  ): Promise<Pick<RuntimeActivityPort<unknown, unknown>, 'reconcile'>>;
}

export interface RuntimeRecoveryScanPolicy {
  limit?: number;
  includeRunIds?: string[];
  excludeStateIds?: string[];
  minWaitMs?: number;
}

export interface RuntimeRecoveryScannerOptions extends RuntimeStateAttemptExecutorOptions {
  policy?: RuntimeRecoveryScanPolicy;
}

export interface RuntimeRecoveryScanResult {
  scanId?: string;
  scanned: number;
  selected: number;
  recovered: RuntimeStateAttemptExecutionResult[];
}

export interface RuntimeStateAttemptExecutorOptions {
  events?: AppendOnlyEventStore;
  leaseCoordinator?: RuntimeLeaseCoordinator;
  workerId?: string;
  leaseTtlMs?: number;
  now?: () => string;
}

export interface RuntimeRecoveryWorkerRunOptions {
  scanId?: string;
  policy?: RuntimeRecoveryScanPolicy;
}

export interface RuntimeRecoveryWorkerRunResult {
  workerId: string;
  status: 'completed' | 'busy';
  scan?: RuntimeRecoveryScanResult;
  lease?: RuntimeLease;
}

export interface RuntimeRecoveryWorkerOptions extends RuntimeRecoveryScannerOptions {
  resolver: RuntimeActivityPortResolver;
  resourceId?: string;
}

export class RuntimeStateAttemptExecutor {
  private readonly events: AppendOnlyEventStore;
  private readonly leaseCoordinator: RuntimeLeaseCoordinator;
  private readonly workerId: string;
  private readonly leaseTtlMs: number;
  private readonly now: () => string;

  constructor(options: RuntimeStateAttemptExecutorOptions = {}) {
    this.events = options.events ?? new InMemoryAppendOnlyEventStore();
    this.leaseCoordinator =
      options.leaseCoordinator ?? new InMemoryRuntimeLeaseCoordinator({ now: options.now });
    this.workerId = options.workerId ?? 'runtime-state-attempt-executor';
    this.leaseTtlMs = options.leaseTtlMs ?? 30000;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async execute<TInput = unknown, TOutput = unknown>(
    plan: RuntimeStateAttemptPlan<TInput>,
    activityPort: RuntimeActivityPort<TInput, TOutput>
  ): Promise<RuntimeStateAttemptExecutionResult<TOutput>> {
    const resourceId = runtimeStateAttemptLeaseResource(plan);
    const acquired = await this.leaseCoordinator.acquire(resourceId, this.workerId, this.leaseTtlMs, {
      runId: plan.scope.runId,
      stateId: plan.stateId,
      attempt: plan.attempt,
    });
    if (acquired.status === 'busy') {
      return { status: 'busy', eventAppends: [], lease: acquired.current };
    }
    const lease = acquired.lease!;
    const startedAt = this.now();
    const attempt = createRuntimeStateAttempt(plan, lease.fencingToken, startedAt, 'started');
    const eventAppends: EventAppendResult[] = [];

    try {
      eventAppends.push(await this.appendAttemptEvent(attempt, 'runtime.state_attempt.started'));
      const request = createRuntimeActivityRequest({
        activityId: plan.activityId ?? runtimeStateAttemptActivityId(plan),
        activityType: plan.activityType,
        scope: plan.scope,
        stateAttemptId: attempt.id,
        operationId: plan.operationId,
        payload: plan.input,
        fencingToken: lease.fencingToken,
        deadlineAt: plan.deadlineAt,
        idempotencyKey: plan.idempotencyKey ?? attempt.id,
        correlationId: plan.correlationId ?? plan.scope.runId,
        causationId: plan.causationId ?? attempt.id,
        metadata: plan.metadata,
      }) as RuntimeActivityRequest<TInput>;

      for (const event of createRuntimeActivityLifecycleEvents({ scope: plan.scope, request })) {
        eventAppends.push(await this.appendEvent(event));
      }

      const activityResult = await activityPort.execute(request);
      for (const event of createRuntimeActivityLifecycleEvents({
        scope: plan.scope,
        request,
        result: activityResult,
      }).slice(1)) {
        eventAppends.push(await this.appendEvent(event));
      }

      const status = stateAttemptStatusFromActivityResult(activityResult);
      const completed = {
        ...attempt,
        status,
        completedAt: status === 'waiting' ? undefined : this.now(),
        activityIds: [request.activityId],
      };
      eventAppends.push(await this.appendAttemptEvent(completed, eventTypeForStateAttemptStatus(status)));
      return {
        status,
        attempt: completed,
        request,
        activityResult,
        eventAppends,
        lease,
      };
    } catch (error) {
      const failed = {
        ...attempt,
        status: 'failed' as const,
        completedAt: this.now(),
      };
      eventAppends.push(
        await this.appendAttemptEvent(failed, 'runtime.state_attempt.failed', {
          error: error instanceof Error ? error.message : String(error),
        })
      );
      return { status: 'failed', attempt: failed, eventAppends, lease };
    } finally {
      await this.leaseCoordinator.release(resourceId, this.workerId, lease.fencingToken);
    }
  }

  private async appendAttemptEvent(
    attempt: RuntimeStateAttempt,
    type: RuntimeStateAttemptFrameworkEventType,
    extraPayload: Record<string, unknown> = {},
    suffix?: string
  ): Promise<EventAppendResult> {
    return this.appendEvent(
      createFrameworkEvent({
        id: suffix ? `${attempt.id}:${type}:${suffix}` : `${attempt.id}:${type}`,
        type: type as FrameworkEventType,
        runId: attempt.scope.runId,
        sessionId: attempt.scope.sessionId,
        workspaceId: attempt.scope.workspaceId,
        agentId: attempt.scope.agentId,
        streamId: attempt.scope.runId,
        idempotencyKey: suffix ? `${attempt.id}:${type}:${suffix}` : `${attempt.id}:${type}`,
        correlationId: attempt.scope.runId,
        causationId: attempt.id,
        timestamp: this.now(),
        payload: {
          ...extraPayload,
          attempt,
          stateAttemptId: attempt.id,
          stateId: attempt.stateId,
          attemptNumber: attempt.attempt,
          status: attempt.status,
          fencingToken: attempt.fencingToken,
        },
        metadata: {
          tenantId: attempt.scope.tenantId,
          userId: attempt.scope.userId,
        },
      })
    );
  }

  private async appendEvent(event: FrameworkEvent): Promise<EventAppendResult> {
    return this.events.appendToStream(event, {
      streamId: event.streamId ?? event.runId,
      idempotencyKey: event.idempotencyKey ?? event.id,
    });
  }
}

export class RuntimeStateAttemptRecoveryExecutor {
  private readonly events: AppendOnlyEventStore;
  private readonly leaseCoordinator: RuntimeLeaseCoordinator;
  private readonly workerId: string;
  private readonly leaseTtlMs: number;
  private readonly now: () => string;

  constructor(options: RuntimeStateAttemptExecutorOptions = {}) {
    this.events = options.events ?? new InMemoryAppendOnlyEventStore();
    this.leaseCoordinator =
      options.leaseCoordinator ?? new InMemoryRuntimeLeaseCoordinator({ now: options.now });
    this.workerId = options.workerId ?? 'runtime-state-attempt-recovery';
    this.leaseTtlMs = options.leaseTtlMs ?? 30000;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async recover<TOutput = unknown>(
    input: RuntimeStateAttemptRecoveryInput,
    activityPort: Pick<RuntimeActivityPort<unknown, TOutput>, 'reconcile'>
  ): Promise<RuntimeStateAttemptExecutionResult<TOutput>> {
    if (input.attempt.status !== 'waiting') {
      throw new FrameworkError({
        code: 'RUNTIME_STATE_ATTEMPT_NOT_WAITING',
        message: `State attempt is not waiting: ${input.attempt.id}`,
        context: { stateAttemptId: input.attempt.id, status: input.attempt.status },
      });
    }

    const resourceId = runtimeStateAttemptLeaseResource(input.attempt);
    const acquired = await this.leaseCoordinator.acquire(resourceId, this.workerId, this.leaseTtlMs, {
      stateAttemptId: input.attempt.id,
      activityId: input.activityId,
      recoveryId: input.recoveryId,
    });
    if (acquired.status === 'busy') {
      return { status: 'busy', attempt: input.attempt, eventAppends: [], lease: acquired.current };
    }

    const lease = acquired.lease!;
    const recoveryId = input.recoveryId ?? `${input.attempt.id}:recovery:${lease.fencingToken}`;
    const eventAppends: EventAppendResult[] = [];
    try {
      eventAppends.push(
        await this.appendAttemptEvent(
          {
            ...input.attempt,
            fencingToken: lease.fencingToken,
          },
          'runtime.state_attempt.reconciled',
          {
            activityId: input.activityId,
            recoveryId,
            metadata: input.metadata,
          },
          recoveryId
        )
      );

      const activityResult = await activityPort.reconcile(input.activityId);
      eventAppends.push(
        await this.appendEvent(
          createFrameworkEvent({
            id: `${input.activityId}:runtime.activity.reconciled:${recoveryId}`,
            type: 'runtime.activity.reconciled' as FrameworkEventType,
            runId: input.attempt.scope.runId,
            sessionId: input.attempt.scope.sessionId,
            workspaceId: input.attempt.scope.workspaceId,
            agentId: input.attempt.scope.agentId,
            streamId: input.attempt.scope.runId,
            idempotencyKey: `${input.activityId}:runtime.activity.reconciled:${recoveryId}`,
            correlationId: input.correlationId ?? input.attempt.scope.runId,
            causationId: input.causationId ?? input.attempt.id,
            timestamp: this.now(),
            payload: {
              activityId: input.activityId,
              recoveryId,
              status: activityResult.status,
              eventIds: activityResult.eventIds,
              retryable: activityResult.retryable,
              error: activityResult.error,
            },
            metadata: {
              ...input.metadata,
              tenantId: input.attempt.scope.tenantId,
              userId: input.attempt.scope.userId,
            },
          })
        )
      );

      const status = stateAttemptStatusFromActivityResult(activityResult);
      const recovered: RuntimeStateAttempt = {
        ...input.attempt,
        status,
        fencingToken: lease.fencingToken,
        completedAt: status === 'waiting' ? undefined : this.now(),
        activityIds: mergeActivityIds(input.attempt.activityIds, input.activityId),
      };
      eventAppends.push(
        await this.appendAttemptEvent(
          recovered,
          eventTypeForStateAttemptStatus(status),
          {
            activityId: input.activityId,
            recoveryId,
          },
          recoveryId
        )
      );
      return { status, attempt: recovered, activityResult, eventAppends, lease };
    } catch (error) {
      const failed: RuntimeStateAttempt = {
        ...input.attempt,
        status: 'failed',
        fencingToken: lease.fencingToken,
        completedAt: this.now(),
      };
      eventAppends.push(
        await this.appendAttemptEvent(
          failed,
          'runtime.state_attempt.failed',
          {
            activityId: input.activityId,
            recoveryId,
            error: error instanceof Error ? error.message : String(error),
          },
          recoveryId
        )
      );
      return { status: 'failed', attempt: failed, eventAppends, lease };
    } finally {
      await this.leaseCoordinator.release(resourceId, this.workerId, lease.fencingToken);
    }
  }

  private async appendAttemptEvent(
    attempt: RuntimeStateAttempt,
    type: RuntimeStateAttemptFrameworkEventType,
    extraPayload: Record<string, unknown> = {},
    suffix?: string
  ): Promise<EventAppendResult> {
    return this.appendEvent(
      createFrameworkEvent({
        id: suffix ? `${attempt.id}:${type}:${suffix}` : `${attempt.id}:${type}`,
        type: type as FrameworkEventType,
        runId: attempt.scope.runId,
        sessionId: attempt.scope.sessionId,
        workspaceId: attempt.scope.workspaceId,
        agentId: attempt.scope.agentId,
        streamId: attempt.scope.runId,
        idempotencyKey: suffix ? `${attempt.id}:${type}:${suffix}` : `${attempt.id}:${type}`,
        correlationId: attempt.scope.runId,
        causationId: attempt.id,
        timestamp: this.now(),
        payload: {
          ...extraPayload,
          attempt,
          stateAttemptId: attempt.id,
          stateId: attempt.stateId,
          attemptNumber: attempt.attempt,
          status: attempt.status,
          fencingToken: attempt.fencingToken,
        },
        metadata: {
          tenantId: attempt.scope.tenantId,
          userId: attempt.scope.userId,
        },
      })
    );
  }

  private async appendEvent(event: FrameworkEvent): Promise<EventAppendResult> {
    return this.events.appendToStream(event, {
      streamId: event.streamId ?? event.runId,
      idempotencyKey: event.idempotencyKey ?? event.id,
    });
  }
}

export class RuntimeRecoveryScanner {
  private readonly events: AppendOnlyEventStore;
  private readonly recovery: RuntimeStateAttemptRecoveryExecutor;
  private readonly policy: RuntimeRecoveryScanPolicy;
  private readonly now: () => string;
  private scanSequence = 0;

  constructor(options: RuntimeRecoveryScannerOptions = {}) {
    this.events = options.events ?? new InMemoryAppendOnlyEventStore();
    this.recovery = new RuntimeStateAttemptRecoveryExecutor(options);
    this.policy = options.policy ?? {};
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async scanAndRecover(
    resolver: RuntimeActivityPortResolver,
    options: RuntimeRecoveryWorkerRunOptions = {}
  ): Promise<RuntimeRecoveryScanResult> {
    const scanId = options.scanId ?? this.nextScanId();
    const events = await this.events.list();
    const waiting = projectWaitingRuntimeStateAttempts(events);
    const selected = this.select(waiting, options.policy);
    const recovered: RuntimeStateAttemptExecutionResult[] = [];
    for (const attempt of selected) {
      const activityId = latestActivityId(attempt);
      if (!activityId) continue;
      const port = await resolver.resolve(attempt, activityId);
      recovered.push(
        await this.recovery.recover(
          {
            attempt,
            activityId,
            recoveryId: `${attempt.id}:scan:${scanId}:${recovered.length + 1}`,
          },
          port
        )
      );
    }
    return {
      scanId,
      scanned: waiting.length,
      selected: selected.length,
      recovered,
    };
  }

  private select(
    attempts: RuntimeStateAttempt[],
    policy: RuntimeRecoveryScanPolicy = this.policy
  ): RuntimeStateAttempt[] {
    const nowMs = Date.parse(this.now());
    const filtered = attempts
      .filter((attempt) => {
        if (policy.includeRunIds && !policy.includeRunIds.includes(attempt.scope.runId)) {
          return false;
        }
        if (policy.excludeStateIds?.includes(attempt.stateId)) return false;
        if (policy.minWaitMs !== undefined) {
          return nowMs - Date.parse(attempt.startedAt) >= policy.minWaitMs;
        }
        return true;
      })
      .sort((left, right) => left.startedAt.localeCompare(right.startedAt));
    return filtered.slice(0, policy.limit ?? filtered.length);
  }

  private nextScanId(): string {
    this.scanSequence += 1;
    return `${this.now()}:scan:${this.scanSequence}`;
  }
}

export class RuntimeRecoveryWorker {
  private readonly scanner: RuntimeRecoveryScanner;
  private readonly resolver: RuntimeActivityPortResolver;
  private readonly leaseCoordinator: RuntimeLeaseCoordinator;
  private readonly workerId: string;
  private readonly leaseTtlMs: number;
  private readonly resourceId: string;

  constructor(options: RuntimeRecoveryWorkerOptions) {
    this.scanner = new RuntimeRecoveryScanner(options);
    this.resolver = options.resolver;
    this.leaseCoordinator =
      options.leaseCoordinator ?? new InMemoryRuntimeLeaseCoordinator({ now: options.now });
    this.workerId = options.workerId ?? 'runtime-recovery-worker';
    this.leaseTtlMs = options.leaseTtlMs ?? 30000;
    this.resourceId = options.resourceId ?? 'runtime.recovery.worker';
  }

  async runOnce(options: RuntimeRecoveryWorkerRunOptions = {}): Promise<RuntimeRecoveryWorkerRunResult> {
    const acquired = await this.leaseCoordinator.acquire(
      this.resourceId,
      this.workerId,
      this.leaseTtlMs,
      { scanId: options.scanId }
    );
    if (acquired.status === 'busy') {
      return {
        workerId: this.workerId,
        status: 'busy',
        lease: acquired.current,
      };
    }

    const lease = acquired.lease!;
    try {
      return {
        workerId: this.workerId,
        status: 'completed',
        lease,
        scan: await this.scanner.scanAndRecover(this.resolver, options),
      };
    } finally {
      await this.leaseCoordinator.release(this.resourceId, this.workerId, lease.fencingToken);
    }
  }
}

export type RuntimeStateAttemptFrameworkEventType =
  | 'runtime.state_attempt.started'
  | 'runtime.state_attempt.waiting'
  | 'runtime.state_attempt.completed'
  | 'runtime.state_attempt.failed'
  | 'runtime.state_attempt.cancelled'
  | 'runtime.state_attempt.reconciled';

export function projectRuntimeStateAttempts(events: FrameworkEvent[]): RuntimeStateAttempt[] {
  const attempts = new Map<string, RuntimeStateAttempt>();
  for (const event of events) {
    if (!String(event.type).startsWith('runtime.state_attempt.')) continue;
    const attempt = readAttemptFromEvent(event);
    if (!attempt) continue;
    attempts.set(attempt.id, attempt);
  }
  return Array.from(attempts.values());
}

export function projectWaitingRuntimeStateAttempts(events: FrameworkEvent[]): RuntimeStateAttempt[] {
  return projectRuntimeStateAttempts(events).filter((attempt) => attempt.status === 'waiting');
}

export function createRuntimeStateAttempt<TInput = unknown>(
  plan: RuntimeStateAttemptPlan<TInput>,
  fencingToken: number,
  startedAt: string,
  status: RuntimeStateAttemptStatus = 'started'
): RuntimeStateAttempt {
  return {
    id: runtimeStateAttemptId(plan),
    scope: plan.scope,
    fsmProcessId: plan.fsmProcessId,
    stateId: plan.stateId,
    attempt: plan.attempt,
    status,
    fencingToken,
    startedAt,
    metadata: plan.metadata,
  };
}

export function runtimeStateAttemptId(input: {
  scope: Pick<RuntimeScope, 'runId'>;
  fsmProcessId: string;
  stateId: string;
  attempt: number;
}): string {
  return `${input.scope.runId}:${input.fsmProcessId}:${input.stateId}:${input.attempt}`;
}

export function runtimeStateAttemptActivityId(input: {
  scope: Pick<RuntimeScope, 'runId'>;
  stateId: string;
  attempt: number;
  operationId: string;
}): string {
  return `${input.scope.runId}:${input.stateId}:${input.attempt}:${input.operationId}`;
}

export function runtimeStateAttemptLeaseResource(input: {
  scope: Pick<RuntimeScope, 'runId'>;
  fsmProcessId: string;
  stateId: string;
  attempt: number;
}): string {
  return `runtime.state_attempt:${runtimeStateAttemptId(input)}`;
}

function stateAttemptStatusFromActivityResult(
  result: RuntimeActivityResult
): Exclude<RuntimeStateAttemptExecutionStatus, 'busy'> {
  switch (result.status) {
    case 'completed':
      return 'completed';
    case 'waiting':
      return 'waiting';
    case 'cancelled':
      return 'cancelled';
    case 'failed':
    case 'unknown':
      return 'failed';
  }
}

function eventTypeForStateAttemptStatus(
  status: RuntimeStateAttemptStatus
): RuntimeStateAttemptFrameworkEventType {
  switch (status) {
    case 'started':
      return 'runtime.state_attempt.started';
    case 'waiting':
      return 'runtime.state_attempt.waiting';
    case 'completed':
      return 'runtime.state_attempt.completed';
    case 'failed':
      return 'runtime.state_attempt.failed';
    case 'cancelled':
      return 'runtime.state_attempt.cancelled';
  }
}

function readAttemptFromEvent(event: FrameworkEvent): RuntimeStateAttempt | null {
  if (!event.payload || typeof event.payload !== 'object') return null;
  const attempt = (event.payload as Record<string, unknown>).attempt;
  return attempt && typeof attempt === 'object' ? (attempt as RuntimeStateAttempt) : null;
}

function mergeActivityIds(existing: string[] | undefined, activityId: string): string[] {
  const ids = existing ?? [];
  return ids.includes(activityId) ? ids : [...ids, activityId];
}

function latestActivityId(attempt: RuntimeStateAttempt): string | null {
  const ids = attempt.activityIds ?? [];
  return ids[ids.length - 1] ?? null;
}
