import type { EventCreateInput } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type {
  FencedRunLease,
  RunLeaseAuthorization,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import type {
  RuntimeTimerStreamScope,
  RuntimeTimerSweepDisposition,
  RuntimeTimerSweepRequest,
  RuntimeTimerSweepResult,
  RuntimeTimerSweepRunResult,
} from '../../contracts/runtime-timer';
import {
  validateRuntimeTimerSweepRequest,
  validateRuntimeTimerSweepResult,
} from '../../contracts/runtime-timer-schemas';
import { FrameworkError } from '../../errors';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';

export interface DurableRuntimeTimerWorkerOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class DurableRuntimeTimerWorker {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: DurableRuntimeTimerWorkerOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async sweep(input: RuntimeTimerSweepRequest): Promise<RuntimeTimerSweepResult> {
    const request = validateRuntimeTimerSweepRequest(input);
    const page = await this.options.events.listStreamHeads({
      limit: request.limit,
      ...(request.cursor === undefined ? {} : { cursor: request.cursor }),
    });
    const results: RuntimeTimerSweepRunResult[] = [];
    for (const head of page.heads) {
      const projection = await this.project(head.scope);
      if (!isDueTimer(projection, request.firedAt)) {
        results.push(result(head.scope, 'not_due'));
        continue;
      }
      results.push(await this.fire(head.scope, request));
    }
    return validateRuntimeTimerSweepResult({
      scanned: results.length,
      fired: count(results, 'fired'),
      notDue: count(results, 'not_due'),
      leaseUnavailable: count(results, 'lease_unavailable'),
      alreadyResolved: count(results, 'already_resolved'),
      results,
      ...(page.nextCursor === undefined ? {} : { nextCursor: page.nextCursor }),
    });
  }

  private async fire(
    scope: EventStreamScope,
    request: RuntimeTimerSweepRequest
  ): Promise<RuntimeTimerSweepRunResult> {
    const lease = await this.acquireRunLease(scope, request);
    if (!lease) return result(scope, 'lease_unavailable');
    const authorization = authorizationFor(lease);
    try {
      const projection = await this.project(scope);
      if (projection.runStatus !== 'waiting_timer' || projection.pendingWait?.type !== 'timer') {
        return result(scope, 'already_resolved');
      }
      if (!isDueTimer(projection, request.firedAt)) return result(scope, 'not_due');
      const pendingWait = projection.pendingWait;
      if (!pendingWait.expiresAt) {
        throw new FrameworkError({
          code: 'RUNTIME_EVENT_STREAM_CORRUPT',
          message: 'Pending Timer Wait has no expiry',
          context: { runId: scope.runId, waitId: pendingWait.waitId },
        });
      }
      const events = this.fireEvents(scope, projection, request.firedAt);
      const head = await this.options.events.getStreamHead(scope);
      if (!head) {
        throw new FrameworkError({
          code: 'RUNTIME_RUN_NOT_FOUND',
          message: `Timer Run Event stream does not exist: ${scope.runId}`,
        });
      }
      const appended = await this.options.events.append({
        scope,
        events,
        expectedLastSequence: head.lastSequence,
        expectedRunRevision: head.runRevision,
        fencingToken: authorization.guard.fencingToken,
        idempotencyKey: `runtime-timer-fire:${pendingWait.waitId}`,
        transactionGroupId: `runtime-timer-fire:${pendingWait.waitId}`,
      });
      await this.project(scope);
      return result(
        scope,
        appended.reused ? 'already_resolved' : 'fired',
        appended.events.map((event) => event.id)
      );
    } finally {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Timer Worker Lease release'),
      });
    }
  }

  private fireEvents(
    scope: EventStreamScope,
    projection: RuntimeOrchestrationProjection,
    firedAt: string
  ): EventCreateInput[] {
    const pendingWait = projection.pendingWait;
    if (!pendingWait || pendingWait.type !== 'timer' || !pendingWait.expiresAt) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: 'Timer fire requires a complete pending Timer Wait',
        context: { runId: scope.runId },
      });
    }
    const operationId = `runtime-timer:${pendingWait.waitId}`;
    const resume = {
      commandId: operationId,
      kind: 'timer' as const,
      waitId: pendingWait.waitId,
      principalId: 'runtime.timer',
      ...(pendingWait.key === undefined ? {} : { key: pendingWait.key }),
      payload: { scheduledFor: pendingWait.expiresAt, firedAt },
      resumedAt: firedAt,
    };
    const nextAttempt = projection.stateAttempt + 1;
    return [
      this.event(
        scope,
        'runtime.timer.fired',
        {
          timerId: pendingWait.waitId,
          waitId: pendingWait.waitId,
          scheduledFor: pendingWait.expiresAt,
          firedAt,
        },
        projection,
        operationId,
        firedAt
      ),
      this.event(
        scope,
        'run.resume.requested',
        { commandId: operationId, waitId: pendingWait.waitId },
        projection,
        operationId,
        firedAt
      ),
      this.event(
        scope,
        'runtime.wait.resolved',
        {
          commandId: operationId,
          waitId: pendingWait.waitId,
          resolution: 'timer',
          resolvedAt: firedAt,
        },
        projection,
        operationId,
        firedAt
      ),
      this.event(
        scope,
        'run.resumed',
        { commandId: operationId, resume },
        projection,
        operationId,
        firedAt
      ),
      this.event(
        scope,
        'fsm.state.entered',
        {
          commandId: operationId,
          stateId: projection.currentState,
          reason: 'timer_fired',
        },
        projection,
        operationId,
        firedAt,
        nextAttempt
      ),
    ];
  }

  private event(
    scope: EventStreamScope,
    type: EventCreateInput['type'],
    payload: Record<string, unknown>,
    projection: RuntimeOrchestrationProjection,
    operationId: string,
    timestamp: string,
    stateAttempt = projection.stateAttempt
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-timer-event'),
      type,
      version: '1.0.0',
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      runId: scope.runId,
      ...(projection.currentState === undefined ? {} : { fsmState: projection.currentState }),
      correlationId: scope.runId,
      operationId,
      idempotencyKey: operationId,
      timestamp,
      payload,
      metadata: { stateAttempt, principalId: 'runtime.timer' },
    };
  }

  private async acquireRunLease(
    scope: EventStreamScope,
    request: RuntimeTimerSweepRequest
  ): Promise<FencedRunLease | null> {
    const acquiredAt = this.timestamp('Timer Worker Lease acquisition');
    const requestedLeaseId = this.nextId('runtime-timer-lease');
    return this.options.runLeases.acquire({
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      runId: scope.runId,
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId,
      ownerId: request.ownerId,
      ttlMs: request.leaseTtlMs,
      acquiredAt,
      idempotencyKey: `runtime-timer-lease:${scope.runId}:${requestedLeaseId}`,
    });
  }

  private project(scope: EventStreamScope): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        this.options.projectionStore,
        scope
      )
      .then((record) => record.state);
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: `${label} must be a valid date-time`,
      });
    }
    return value;
  }
}

function isDueTimer(projection: RuntimeOrchestrationProjection, firedAt: string): boolean {
  return (
    projection.runStatus === 'waiting_timer' &&
    projection.pendingWait?.type === 'timer' &&
    projection.pendingWait.expiresAt !== undefined &&
    Date.parse(projection.pendingWait.expiresAt) <= Date.parse(firedAt)
  );
}

function result(
  scope: RuntimeTimerStreamScope,
  disposition: RuntimeTimerSweepDisposition,
  eventIds: string[] = []
): RuntimeTimerSweepRunResult {
  return {
    scope: structuredClone(scope),
    disposition,
    eventIds: [...eventIds],
  };
}

function count(
  results: RuntimeTimerSweepRunResult[],
  disposition: RuntimeTimerSweepDisposition
): number {
  return results.filter((item) => item.disposition === disposition).length;
}

function authorizationFor(lease: FencedRunLease): RunLeaseAuthorization {
  return {
    scope: {
      ...(lease.tenantId === undefined ? {} : { tenantId: lease.tenantId }),
      userId: lease.userId,
      runId: lease.runId,
      partitionKey: lease.partitionKey,
    },
    guard: {
      leaseId: lease.id,
      ownerId: lease.ownerId,
      fencingToken: lease.fencingToken,
    },
  };
}
