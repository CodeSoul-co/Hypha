import type { RuntimeActivityPort, RuntimeActivityType } from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { EventAppendResult, EventStreamHead, EventStreamScope } from './event-store';
import type { DurableEventRuntime } from './event-runtime';
import {
  EventSourcedActivityRuntime,
  type RuntimeActivityRecord,
  type RuntimeActivityReconciliationResult,
} from './activity-runtime';

export interface RuntimeActivityWorkerRequest {
  scope: EventStreamScope;
  activityId: string;
  fencingToken: number;
  operationId: string;
  idempotencyKey: string;
}

export interface RuntimeActivityWorkerResult {
  action: 'executed' | 'reconciled' | 'cancellation_dispatched' | 'already_terminal';
  activity: RuntimeActivityRecord;
  appends: EventAppendResult[];
  disposition?: RuntimeActivityReconciliationResult['disposition'];
  unresolvedExternalOperation?: boolean;
}

export interface RuntimeActivityWorkerOptions {
  events: DurableEventRuntime;
  activities: EventSourcedActivityRuntime;
  ports: Partial<Record<RuntimeActivityType, RuntimeActivityPort>>;
  cancellationGraceMs?: number;
}

export class RuntimeActivityWorker {
  constructor(private readonly options: RuntimeActivityWorkerOptions) {
    if (
      options.cancellationGraceMs !== undefined &&
      (!Number.isInteger(options.cancellationGraceMs) || options.cancellationGraceMs < 0)
    ) {
      invalid('cancellationGraceMs must be a non-negative integer.');
    }
  }

  async dispatch(request: RuntimeActivityWorkerRequest): Promise<RuntimeActivityWorkerResult> {
    validateWorkerRequest(request);
    const activity = await this.requireActivity(request);
    if (isTerminal(activity)) return terminalResult(activity);
    if (activity.status !== 'requested') return this.reconcile(request);

    const port = this.requirePort(activity);
    const started = await this.options.activities.markStarted(
      await this.command(request, 'started')
    );
    const result = await port.execute(started.activity.request);
    if (result.activityId !== activity.id)
      invalid('Activity Port returned a different Activity id.');
    if (result.status === 'unknown') {
      const reconciled = await this.options.activities.reconcile(
        await this.command(request, 'execute-unknown-reconcile')
      );
      return {
        action: 'reconciled',
        activity: reconciled.activity,
        appends: [started.append, reconciled.append],
        disposition: reconciled.disposition,
      };
    }
    const applied = await this.options.activities.applyResult(
      await this.command(request, 'result'),
      result
    );
    return {
      action: 'executed',
      activity: applied.activity,
      appends: [started.append, applied.append],
    };
  }

  async cancel(
    request: RuntimeActivityWorkerRequest,
    reason?: string
  ): Promise<RuntimeActivityWorkerResult> {
    validateWorkerRequest(request);
    let activity = await this.requireActivity(request);
    if (isTerminal(activity)) return terminalResult(activity);
    const appends: EventAppendResult[] = [];
    if (activity.status !== 'cancelling') {
      const requested = await this.options.activities.requestCancellation({
        ...(await this.command(request, 'cancellation-requested')),
        reason,
      });
      appends.push(requested.append);
      activity = requested.activity;
    }
    const port = this.requirePort(activity);
    const cancellationAcknowledged = await waitForCancellation(
      port.cancel(activity.id, reason),
      this.options.cancellationGraceMs
    );
    if (!cancellationAcknowledged) {
      const unresolved = await this.options.activities.markCancellationUnresolved({
        ...(await this.command(request, 'cancellation-unresolved')),
        reason: 'cancellation_grace_exceeded',
        ...(this.options.cancellationGraceMs === undefined
          ? {}
          : { graceMs: this.options.cancellationGraceMs }),
      });
      appends.push(unresolved.append);
      return {
        action: 'cancellation_dispatched',
        activity: unresolved.activity,
        appends,
        disposition: 'waiting',
        unresolvedExternalOperation: true,
      };
    }
    const reconciled = await this.options.activities.reconcile(
      await this.command(request, 'cancellation-reconcile')
    );
    appends.push(reconciled.append);
    return {
      action: 'cancellation_dispatched',
      activity: reconciled.activity,
      appends,
      disposition: reconciled.disposition,
    };
  }

  private async reconcile(
    request: RuntimeActivityWorkerRequest
  ): Promise<RuntimeActivityWorkerResult> {
    const reconciled = await this.options.activities.reconcile(
      await this.command(request, 'reconcile')
    );
    return {
      action: 'reconciled',
      activity: reconciled.activity,
      appends: [reconciled.append],
      disposition: reconciled.disposition,
    };
  }

  private async command(request: RuntimeActivityWorkerRequest, phase: string) {
    const head = await this.requireHead(request.scope);
    return {
      scope: request.scope,
      activityId: request.activityId,
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: request.fencingToken,
      operationId: `${request.operationId}:${phase}`,
      idempotencyKey: `${request.idempotencyKey}:${phase}`,
    };
  }

  private async requireActivity(
    request: RuntimeActivityWorkerRequest
  ): Promise<RuntimeActivityRecord> {
    const activity = await this.options.activities.get(request.scope, request.activityId);
    if (!activity) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_NOT_FOUND',
        message: `Activity not found: ${request.activityId}`,
      });
    }
    return activity;
  }

  private requirePort(activity: RuntimeActivityRecord): RuntimeActivityPort {
    const port = this.options.ports[activity.request.activityType];
    if (!port) {
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: `Activity Port is unavailable: ${activity.request.activityType}`,
      });
    }
    return port;
  }

  private async requireHead(scope: EventStreamScope): Promise<EventStreamHead> {
    const head = await this.options.events.getStreamHead(scope);
    if (!head) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_NOT_FOUND',
        message: `Runtime event stream not found: ${scope.runId}`,
      });
    }
    return head;
  }
}

function isTerminal(activity: RuntimeActivityRecord): boolean {
  return ['completed', 'failed', 'cancelled', 'manual_review'].includes(activity.status);
}

function terminalResult(activity: RuntimeActivityRecord): RuntimeActivityWorkerResult {
  return { action: 'already_terminal', activity, appends: [] };
}

function validateWorkerRequest(request: RuntimeActivityWorkerRequest): void {
  required(request.activityId, 'activityId');
  required(request.operationId, 'operationId');
  required(request.idempotencyKey, 'idempotencyKey');
  if (!Number.isInteger(request.fencingToken) || request.fencingToken < 1) {
    invalid('fencingToken must be positive.');
  }
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

async function waitForCancellation(
  cancellation: Promise<void>,
  graceMs: number | undefined
): Promise<boolean> {
  if (graceMs === undefined) {
    await cancellation;
    return true;
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      cancellation.then(() => true),
      new Promise<boolean>((resolve) => {
        timer = setTimeout(() => resolve(false), graceMs);
      }),
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
