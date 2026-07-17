import type {
  RuntimeActivityPort,
  RuntimeActivityRequest,
  RuntimeActivityResult,
  RuntimeActivityType,
} from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { EventCreateInput, FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import type { EventAppendResult, EventStreamScope } from './event-store';
import type { DurableEventRuntime } from './event-runtime';

export const RUNTIME_ACTIVITY_EFFECTS = [
  'pure',
  'idempotent',
  'external_effect',
  'irreversible',
] as const;
export type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number];
export type RuntimeActivityRecordStatus =
  | 'requested'
  | 'running'
  | 'cancelling'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'manual_review';

interface ActivityCommandBase {
  scope: EventStreamScope;
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken: number;
  idempotencyKey: string;
  operationId: string;
}

export interface RequestRuntimeActivityCommand extends ActivityCommandBase {
  activity: RuntimeActivityRequest;
  effect: RuntimeActivityEffect;
}

export interface RuntimeActivityCommand extends ActivityCommandBase {
  activityId: string;
}

export interface CancelRuntimeActivityCommand extends RuntimeActivityCommand {
  reason?: string;
}

export interface MarkRuntimeActivityCancellationUnresolvedCommand extends RuntimeActivityCommand {
  reason: string;
  graceMs?: number;
}

export interface RuntimeActivityRecord {
  id: string;
  effect: RuntimeActivityEffect;
  request: RuntimeActivityRequest;
  status: RuntimeActivityRecordStatus;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: RuntimeActivityResult;
  reconciliationReason?: string;
  cancellationReason?: string;
  cancellationUnresolvedAt?: string;
  cancellationUnresolvedReason?: string;
  cancellationGraceMs?: number;
}

export interface RuntimeActivityCommitResult {
  append: EventAppendResult;
  activity: RuntimeActivityRecord;
}

export interface RuntimeActivityReconciliationResult extends RuntimeActivityCommitResult {
  disposition: 'applied' | 'waiting' | 'safe_retry' | 'manual_review';
}

export interface EventSourcedActivityRuntimeOptions {
  events: DurableEventRuntime;
  ports: Partial<Record<RuntimeActivityType, RuntimeActivityPort>>;
  now?: () => string;
}

export class EventSourcedActivityRuntime {
  private readonly now: () => string;

  constructor(private readonly options: EventSourcedActivityRuntimeOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async request(command: RequestRuntimeActivityCommand): Promise<RuntimeActivityCommitResult> {
    validateCommand(command);
    validateActivityRequest(command.activity, command.scope);
    if (!RUNTIME_ACTIVITY_EFFECTS.includes(command.effect)) invalid('Unsupported Activity effect.');
    const prior = await this.reuse(command, command.activity.activityId);
    if (prior) return prior;
    const stream = await this.loadAtExpected(command);
    if (projectRuntimeActivities(stream).some((item) => item.id === command.activity.activityId)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Activity id already exists.');
    }
    const at = this.now();
    const activity: RuntimeActivityRecord = {
      id: command.activity.activityId,
      effect: command.effect,
      request: clone(command.activity),
      status: 'requested',
      createdAt: at,
      updatedAt: at,
    };
    const append = await this.append(command, [
      event(command, at, 'runtime.activity.requested', 1, { activity }),
    ]);
    return { append, activity: await this.require(command.scope, activity.id) };
  }

  async markStarted(command: RuntimeActivityCommand): Promise<RuntimeActivityCommitResult> {
    validateCommand(command);
    required(command.activityId, 'activityId');
    const prior = await this.reuse(command, command.activityId);
    if (prior) return prior;
    const activity = await this.load(command);
    if (activity.status !== 'requested') {
      conflict('RUNTIME_RUN_CONFLICT', `Activity cannot start from ${activity.status}.`);
    }
    const append = await this.append(command, [
      event(command, this.now(), 'runtime.activity.started', 1, {
        activityId: activity.id,
      }),
    ]);
    return { append, activity: await this.require(command.scope, command.activityId) };
  }

  async applyResult(
    command: RuntimeActivityCommand,
    result: RuntimeActivityResult
  ): Promise<RuntimeActivityCommitResult> {
    validateCommand(command);
    validateResult(result, command.activityId);
    const prior = await this.reuse(command, command.activityId);
    if (prior) return prior;
    const activity = await this.load(command);
    if (!['requested', 'running', 'cancelling', 'waiting'].includes(activity.status)) {
      conflict('RUNTIME_RUN_CONFLICT', `Activity is already terminal: ${activity.id}`);
    }
    const append = await this.append(command, [resultEvent(command, this.now(), result, 1)]);
    return { append, activity: await this.require(command.scope, command.activityId) };
  }

  async requestCancellation(
    command: CancelRuntimeActivityCommand
  ): Promise<RuntimeActivityCommitResult> {
    validateCommand(command);
    required(command.activityId, 'activityId');
    const prior = await this.reuse(command, command.activityId);
    if (prior) return prior;
    const activity = await this.load(command);
    if (!['requested', 'running', 'waiting'].includes(activity.status)) {
      conflict('RUNTIME_RUN_CONFLICT', `Activity cannot be cancelled from ${activity.status}.`);
    }
    const append = await this.append(command, [
      event(command, this.now(), 'runtime.activity.cancellation.requested', 1, {
        activityId: activity.id,
        ...(command.reason === undefined ? {} : { reason: command.reason }),
      }),
    ]);
    return { append, activity: await this.require(command.scope, command.activityId) };
  }

  async markCancellationUnresolved(
    command: MarkRuntimeActivityCancellationUnresolvedCommand
  ): Promise<RuntimeActivityCommitResult> {
    validateCommand(command);
    required(command.activityId, 'activityId');
    required(command.reason, 'reason');
    if (
      command.graceMs !== undefined &&
      (!Number.isInteger(command.graceMs) || command.graceMs < 0)
    ) {
      invalid('graceMs must be a non-negative integer.');
    }
    const prior = await this.reuse(command, command.activityId);
    if (prior) return prior;
    const activity = await this.load(command);
    if (activity.status !== 'cancelling') {
      conflict(
        'RUNTIME_RUN_CONFLICT',
        `Unresolved cancellation cannot be recorded from ${activity.status}.`
      );
    }
    const append = await this.append(command, [
      event(command, this.now(), 'runtime.activity.cancellation.unresolved', 1, {
        activityId: activity.id,
        reason: command.reason,
        ...(command.graceMs === undefined ? {} : { graceMs: command.graceMs }),
      }),
    ]);
    return { append, activity: await this.require(command.scope, command.activityId) };
  }

  async reconcile(command: RuntimeActivityCommand): Promise<RuntimeActivityReconciliationResult> {
    validateCommand(command);
    const prior = await this.reuse(command, command.activityId);
    if (prior) return { ...prior, disposition: disposition(prior.activity) };
    const activity = await this.load(command);
    if (!['requested', 'running', 'cancelling', 'waiting'].includes(activity.status)) {
      conflict('RUNTIME_RUN_CONFLICT', `Activity does not require reconciliation: ${activity.id}`);
    }
    const port = this.options.ports[activity.request.activityType];
    if (!port) conflict('RUNTIME_INTERNAL_ERROR', 'Activity reconciliation port is unavailable.');
    const reconciled = await port.reconcile(activity.id);
    validateResult(reconciled, activity.id);
    const at = this.now();
    const events: EventCreateInput[] = [
      event(command, at, 'runtime.activity.reconciled', 1, {
        activityId: activity.id,
        observedStatus: reconciled.status,
        evidenceEventIds: [...reconciled.eventIds],
      }),
    ];
    let nextDisposition: RuntimeActivityReconciliationResult['disposition'];
    if (reconciled.status === 'unknown') {
      nextDisposition =
        activity.effect === 'pure' || activity.effect === 'idempotent'
          ? 'safe_retry'
          : 'manual_review';
      events.push(
        event(command, at, 'runtime.activity.reconciliation.required', 2, {
          activityId: activity.id,
          disposition: nextDisposition,
          reason: 'external_state_unknown',
        })
      );
    } else {
      nextDisposition = reconciled.status === 'waiting' ? 'waiting' : 'applied';
      events.push(resultEvent(command, at, reconciled, 2));
    }
    const append = await this.append(command, events);
    return {
      append,
      activity: await this.require(command.scope, activity.id),
      disposition: nextDisposition,
    };
  }

  async get(scope: EventStreamScope, activityId: string): Promise<RuntimeActivityRecord | null> {
    return (
      projectRuntimeActivities(await this.options.events.read({ scope })).find(
        (item) => item.id === activityId
      ) ?? null
    );
  }

  private async load(command: RuntimeActivityCommand): Promise<RuntimeActivityRecord> {
    const stream = await this.loadAtExpected(command);
    const activity = projectRuntimeActivities(stream).find(
      (item) => item.id === command.activityId
    );
    if (!activity) conflict('RUNTIME_RUN_NOT_FOUND', `Activity not found: ${command.activityId}`);
    return activity;
  }

  private async require(scope: EventStreamScope, id: string): Promise<RuntimeActivityRecord> {
    const activity = await this.get(scope, id);
    if (!activity) conflict('RUNTIME_RUN_NOT_FOUND', `Activity not found: ${id}`);
    return activity;
  }

  private async loadAtExpected(command: ActivityCommandBase): Promise<PersistedFrameworkEvent[]> {
    const stream = await this.options.events.read({ scope: command.scope });
    if ((stream.at(-1)?.sequence ?? 0) !== command.expectedLastSequence) {
      conflict('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict.');
    }
    return stream;
  }

  private async reuse(
    command: ActivityCommandBase,
    activityId: string
  ): Promise<RuntimeActivityCommitResult | null> {
    const stream = await this.options.events.read({ scope: command.scope });
    const prior = stream.filter(
      (item) =>
        item.operationId === command.operationId && item.idempotencyKey === command.idempotencyKey
    );
    if (prior.length === 0) return null;
    const append = await this.append(command, prior.map(toCreateInput));
    const activity = projectRuntimeActivities(stream).find((item) => item.id === activityId);
    if (!activity) conflict('RUNTIME_RUN_NOT_FOUND', `Activity not found: ${activityId}`);
    return { append, activity };
  }

  private append(
    command: ActivityCommandBase,
    events: EventCreateInput[]
  ): Promise<EventAppendResult> {
    return this.options.events.append({
      scope: clone(command.scope),
      events,
      expectedLastSequence: command.expectedLastSequence,
      ...(command.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: command.expectedRunRevision }),
      fencingToken: command.fencingToken,
      idempotencyKey: command.idempotencyKey,
      transactionGroupId: command.operationId,
    });
  }
}

export function projectRuntimeActivities(
  events: readonly PersistedFrameworkEvent[]
): RuntimeActivityRecord[] {
  const records = new Map<string, RuntimeActivityRecord>();
  for (const item of events) {
    if (!item.type.startsWith('runtime.activity.')) continue;
    const payload = payloadRecord(item);
    if (item.type === 'runtime.activity.requested') {
      const record = clone(payload.activity as RuntimeActivityRecord);
      if (!record?.id || records.has(record.id)) {
        conflict('RUNTIME_REPLAY_DIVERGENCE', 'Invalid or duplicate Activity request.');
      }
      records.set(record.id, record);
      continue;
    }
    const id = requiredPayloadString(payload, 'activityId');
    const record = records.get(id);
    if (!record) conflict('RUNTIME_REPLAY_DIVERGENCE', `Activity event precedes request: ${id}`);
    if (item.type === 'runtime.activity.started') {
      if (record.status !== 'requested')
        conflict('RUNTIME_REPLAY_DIVERGENCE', 'Activity started twice.');
      record.status = 'running';
      record.startedAt = item.timestamp;
    } else if (item.type === 'runtime.activity.cancellation.requested') {
      if (!['requested', 'running', 'waiting'].includes(record.status)) {
        conflict('RUNTIME_REPLAY_DIVERGENCE', `Activity cancelled from ${record.status}.`);
      }
      record.status = 'cancelling';
      if (typeof payload.reason === 'string') record.cancellationReason = payload.reason;
    } else if (item.type === 'runtime.activity.cancellation.unresolved') {
      if (record.status !== 'cancelling') {
        conflict(
          'RUNTIME_REPLAY_DIVERGENCE',
          `Unresolved Activity cancellation recorded from ${record.status}.`
        );
      }
      record.cancellationUnresolvedAt = item.timestamp;
      record.cancellationUnresolvedReason = requiredPayloadString(payload, 'reason');
      if (typeof payload.graceMs === 'number') record.cancellationGraceMs = payload.graceMs;
    } else if (item.type === 'runtime.activity.reconciliation.required') {
      record.status = payload.disposition === 'manual_review' ? 'manual_review' : record.status;
      record.reconciliationReason = requiredPayloadString(payload, 'reason');
    } else if (item.type !== 'runtime.activity.reconciled') {
      record.result = clone(payload.result as RuntimeActivityResult);
      const nextStatus = statusFromEvent(item.type);
      record.status =
        record.status === 'cancelling' && nextStatus === 'waiting' ? 'cancelling' : nextStatus;
      if (['completed', 'failed', 'cancelled'].includes(record.status)) {
        record.completedAt = item.timestamp;
      }
    }
    record.updatedAt = item.timestamp;
  }
  return Array.from(records.values()).map(clone);
}

function resultEvent(
  command: ActivityCommandBase,
  at: string,
  result: RuntimeActivityResult,
  ordinal: number
): EventCreateInput {
  const type = `runtime.activity.${result.status}` as FrameworkEventType;
  if (!['completed', 'failed', 'waiting', 'cancelled'].includes(result.status)) {
    invalid(`Cannot persist Activity result status: ${result.status}`);
  }
  return event(command, at, type, ordinal, {
    activityId: result.activityId,
    result: persistableResult(result),
  });
}

function persistableResult(result: RuntimeActivityResult): RuntimeActivityResult {
  return {
    activityId: result.activityId,
    status: result.status,
    eventIds: [...result.eventIds],
    ...(result.output === undefined ? {} : { output: clone(result.output) }),
    ...(result.artifactRefs === undefined ? {} : { artifactRefs: [...result.artifactRefs] }),
    ...(result.retryable === undefined ? {} : { retryable: result.retryable }),
    ...(result.error === undefined ? {} : { error: clone(result.error) }),
  };
}

function statusFromEvent(type: FrameworkEventType): RuntimeActivityRecordStatus {
  if (type === 'runtime.activity.completed') return 'completed';
  if (type === 'runtime.activity.failed') return 'failed';
  if (type === 'runtime.activity.waiting') return 'waiting';
  if (type === 'runtime.activity.cancelled') return 'cancelled';
  conflict('RUNTIME_REPLAY_DIVERGENCE', `Unsupported Activity result event: ${type}`);
}

function disposition(
  activity: RuntimeActivityRecord
): RuntimeActivityReconciliationResult['disposition'] {
  if (activity.status === 'manual_review') return 'manual_review';
  if (activity.status === 'waiting') return 'waiting';
  if (['completed', 'failed', 'cancelled'].includes(activity.status)) return 'applied';
  return activity.effect === 'pure' || activity.effect === 'idempotent'
    ? 'safe_retry'
    : 'manual_review';
}

function validateActivityRequest(request: RuntimeActivityRequest, scope: EventStreamScope): void {
  required(request.activityId, 'activityId');
  required(request.operationId, 'activity.operationId');
  if (request.runId !== scope.runId) invalid('Activity runId must match stream scope.');
}

function validateResult(result: RuntimeActivityResult, activityId: string): void {
  if (result.activityId !== activityId) invalid('Activity result id does not match request.');
  if (!Array.isArray(result.eventIds)) invalid('Activity result eventIds are required.');
}

function validateCommand(command: ActivityCommandBase): void {
  required(command.operationId, 'operationId');
  required(command.idempotencyKey, 'idempotencyKey');
  if (!Number.isInteger(command.expectedLastSequence) || command.expectedLastSequence < 0) {
    invalid('expectedLastSequence must be non-negative.');
  }
  if (!Number.isInteger(command.fencingToken) || command.fencingToken < 1) {
    invalid('fencingToken must be positive.');
  }
}

function event(
  command: ActivityCommandBase,
  at: string,
  type: FrameworkEventType,
  ordinal: number,
  payload: Record<string, unknown>
): EventCreateInput {
  return {
    id: `${command.operationId}:${ordinal}:${type}`,
    type,
    version: '1.0.0',
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    runId: command.scope.runId,
    operationId: command.operationId,
    idempotencyKey: command.idempotencyKey,
    timestamp: at,
    payload: clone(payload),
  };
}

function toCreateInput(item: PersistedFrameworkEvent): EventCreateInput {
  const { sequence, globalSequence, recordedAt, payloadHash, ...input } = item;
  void sequence;
  void globalSequence;
  void recordedAt;
  void payloadHash;
  return clone(input);
}

function payloadRecord(item: PersistedFrameworkEvent): Record<string, unknown> {
  if (!item.payload || typeof item.payload !== 'object' || Array.isArray(item.payload)) {
    conflict('RUNTIME_REPLAY_DIVERGENCE', `Invalid payload for ${item.type}.`);
  }
  return item.payload as Record<string, unknown>;
}

function requiredPayloadString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];
  if (typeof value !== 'string' || value.length === 0) {
    conflict('RUNTIME_REPLAY_DIVERGENCE', `Missing Activity payload field: ${key}`);
  }
  return value;
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string): never {
  throw new FrameworkError({ code, message });
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
