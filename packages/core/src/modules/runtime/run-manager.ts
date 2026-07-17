import type { SpecRef } from '../../specs';
import {
  type NormalizedRuntimeError,
  type RunSignalRequest,
  type RuntimePrincipal,
  type RuntimeRun,
  type RuntimeWaitRecord,
  type RuntimeWaitRequest,
} from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { EventCreateInput, FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import { hashCanonicalJson } from './canonical-json';
import type { EventAppendResult, EventStreamScope } from './event-store';
import type { DurableEventRuntime } from './event-runtime';

interface RunCommandBase {
  scope: EventStreamScope;
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken: number;
  idempotencyKey: string;
  operationId: string;
  correlationId?: string;
}

export interface CreateRuntimeRunRequest extends RunCommandBase {
  sessionId: string;
  workspaceId?: string;
  domainPackRef?: SpecRef;
  workflowRef: SpecRef;
  workflowRevision: string;
  processSpecRef: string;
  processHash: string;
  rootAgentRef?: SpecRef;
  runtimeProfileRef?: SpecRef;
  input: unknown;
  inputHash?: string;
  deadlineAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeRunCommand extends RunCommandBase {}

export interface PauseRuntimeRunRequest extends RunCommandBase {
  reason?: string;
}

export interface ResumeRuntimeRunRequest extends RunCommandBase {
  reason?: string;
}

export interface RegisterRuntimeWaitRequest extends RunCommandBase {
  waitId: string;
  stateId: string;
  wait: RuntimeWaitRequest;
}

export interface SignalRuntimeRunRequest extends RunCommandBase {
  waitId: string;
  signal: RunSignalRequest;
}

export interface FireRuntimeTimerRequest extends RunCommandBase {
  waitId: string;
  firedAt: string;
}

export interface ExpireRuntimeWaitRequest extends RunCommandBase {
  waitId: string;
  expiredAt: string;
  terminalState?: string;
}

export interface CancelRuntimeRunRequest extends RunCommandBase {
  reason: string;
}

export interface FinalizeRuntimeCancellationRequest extends RunCommandBase {
  terminalState?: string;
  unresolvedActivityRefs?: string[];
}

export interface CompleteRuntimeRunRequest extends RunCommandBase {
  terminalState: string;
  output?: unknown;
  outputHash?: string;
}

export interface FailRuntimeRunRequest extends RunCommandBase {
  terminalState: string;
  error: NormalizedRuntimeError;
}

export interface RuntimeRunCommitResult {
  append: EventAppendResult;
  run: RuntimeRun;
}

export interface EventSourcedRunManagerOptions {
  events: DurableEventRuntime;
  now?: () => string;
  authorizeSignal?: (
    principal: Readonly<RuntimePrincipal>,
    wait: Readonly<RuntimeWaitRecord>
  ) => Promise<boolean> | boolean;
  validateSignalPayload?: (
    payload: unknown,
    expectedSchema: Readonly<Record<string, unknown>> | undefined
  ) => Promise<void> | void;
  onCancelRequested?: (run: Readonly<RuntimeRun>, reason: string) => Promise<void> | void;
}

export interface RunManagerV2 {
  create(request: CreateRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  queue(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult>;
  start(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult>;
  pause(request: PauseRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  resume(request: ResumeRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  wait(request: RegisterRuntimeWaitRequest): Promise<RuntimeRunCommitResult>;
  signal(request: SignalRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  fireTimer(request: FireRuntimeTimerRequest): Promise<RuntimeRunCommitResult>;
  expireWait(request: ExpireRuntimeWaitRequest): Promise<RuntimeRunCommitResult>;
  beginRecovery(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult>;
  requestCancellation(request: CancelRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  finalizeCancellation(
    request: FinalizeRuntimeCancellationRequest
  ): Promise<RuntimeRunCommitResult>;
  complete(request: CompleteRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  fail(request: FailRuntimeRunRequest): Promise<RuntimeRunCommitResult>;
  get(scope: EventStreamScope): Promise<RuntimeRun | null>;
  getPendingWait(scope: EventStreamScope): Promise<RuntimeWaitRecord | null>;
}

export class EventSourcedRunManager implements RunManagerV2 {
  private readonly events: DurableEventRuntime;
  private readonly now: () => string;

  constructor(private readonly options: EventSourcedRunManagerOptions) {
    this.events = options.events;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async create(request: CreateRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    required(request.sessionId, 'sessionId');
    required(request.workflowRef.id, 'workflowRef.id');
    required(request.workflowRevision, 'workflowRevision');
    required(request.processSpecRef, 'processSpecRef');
    required(request.processHash, 'processHash');
    const prior = await this.reuse(request);
    if (prior) return prior;
    if (request.expectedLastSequence !== 0) {
      conflict('RUNTIME_EVENT_APPEND_FAILED', 'Run creation requires an empty event stream.');
    }
    const createdAt = this.now();
    const run: RuntimeRun = {
      id: request.scope.runId,
      revision: 1,
      ...(request.scope.tenantId === undefined ? {} : { tenantId: request.scope.tenantId }),
      userId: request.scope.userId,
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      sessionId: request.sessionId,
      ...(request.domainPackRef === undefined
        ? {}
        : { domainPackRef: clone(request.domainPackRef) }),
      workflowRef: clone(request.workflowRef),
      workflowRevision: request.workflowRevision,
      processSpecRef: request.processSpecRef,
      processHash: request.processHash,
      ...(request.rootAgentRef === undefined ? {} : { rootAgentRef: clone(request.rootAgentRef) }),
      ...(request.runtimeProfileRef === undefined
        ? {}
        : { runtimeProfileRef: clone(request.runtimeProfileRef) }),
      status: 'created',
      input: clone(request.input),
      inputHash: request.inputHash ?? hashCanonicalJson(request.input),
      correlationId: request.correlationId ?? request.operationId,
      idempotencyKey: request.idempotencyKey,
      ...(request.deadlineAt === undefined ? {} : { deadlineAt: request.deadlineAt }),
      createdAt,
      updatedAt: createdAt,
      ...(request.metadata === undefined ? {} : { metadata: clone(request.metadata) }),
    };
    const append = await this.append(request, [
      event(request, createdAt, 'run.created', 1, { run }),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async queue(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult> {
    return this.transition(request, ['created'], 'run.queued', {});
  }

  async start(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult> {
    return this.transition(request, ['created', 'queued', 'acquiring'], 'run.started', {});
  }

  async pause(request: PauseRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    const prior = await this.reuse(request);
    if (prior) return prior;
    const { run } = await this.loadCurrent(request, ['running']);
    const at = this.now();
    const common = { ...(request.reason === undefined ? {} : { reason: request.reason }) };
    const append = await this.append(request, [
      event(request, at, 'run.pausing', 1, common),
      event(request, at, 'run.paused', 2, common),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async resume(request: ResumeRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, ['paused']);
    const at = this.now();
    const payload = { ...(request.reason === undefined ? {} : { reason: request.reason }) };
    const append = await this.append(request, [
      event(request, at, 'run.resume.requested', 1, payload),
      event(request, at, 'run.resumed', 2, payload),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async wait(request: RegisterRuntimeWaitRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    required(request.waitId, 'waitId');
    required(request.stateId, 'stateId');
    validateWaitRequest(request.wait);
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, ['running']);
    if (await this.getPendingWait(request.scope)) {
      conflict('RUNTIME_RUN_CONFLICT', 'Run already has a pending wait.');
    }
    const at = this.now();
    const waitRecord: RuntimeWaitRecord = {
      id: request.waitId,
      runId: request.scope.runId,
      stateId: request.stateId,
      type: request.wait.type,
      ...(request.wait.key === undefined ? {} : { key: request.wait.key }),
      status: 'waiting',
      ...(request.wait.expectedSchema === undefined
        ? {}
        : { expectedSchemaHash: hashCanonicalJson(request.wait.expectedSchema) }),
      createdAt: at,
      ...(request.wait.expiresAt === undefined ? {} : { expiresAt: request.wait.expiresAt }),
    };
    const type = waitRunEvent(request.wait.type);
    const events: EventCreateInput[] = [
      event(request, at, 'runtime.wait.created', 1, {
        wait: waitRecord,
        request: clone(request.wait),
      }),
    ];
    if (request.wait.type === 'timer') {
      events.push(event(request, at, 'runtime.timer.registered', 2, { wait: waitRecord }));
    }
    events.push(event(request, at, type, 3, { waitId: request.waitId, stateId: request.stateId }));
    const append = await this.append(request, events);
    return { append, run: await this.requireRun(request.scope) };
  }

  async signal(request: SignalRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    required(request.waitId, 'waitId');
    validateSignal(request.signal, request.scope.runId);
    const prior = await this.reuse(request);
    if (prior) return prior;
    const stream = await this.events.read({ scope: request.scope });
    const received = findReceivedSignal(stream, request.signal.signalId);
    if (received) {
      if (hashCanonicalJson(received.signal) !== hashCanonicalJson(request.signal)) {
        conflict(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          'Signal id was already used with different content.'
        );
      }
      const at = this.now();
      const append = await this.append(request, [
        event(request, at, 'runtime.signal.duplicate', 1, {
          waitId: received.waitId,
          signalId: request.signal.signalId,
          receivedEventId: received.eventId,
        }),
      ]);
      return { append, run: await this.requireRun(request.scope) };
    }
    await this.loadCurrent(request, ['waiting_signal', 'waiting_human']);
    const wait = await this.requirePendingWait(request.scope, request.waitId, ['signal', 'human']);
    if (wait.key !== undefined && wait.key !== request.signal.key) {
      conflict('RUNTIME_SIGNAL_INVALID', 'Signal key does not match the pending wait.');
    }
    if (wait.expiresAt && request.signal.sentAt > wait.expiresAt) {
      conflict('RUNTIME_SIGNAL_EXPIRED', 'Signal arrived after the wait expired.');
    }
    const authorized = this.options.authorizeSignal
      ? await this.options.authorizeSignal(clone(request.signal.principal), clone(wait))
      : defaultSignalAuthorization(request.signal.principal);
    if (!authorized) conflict('RUNTIME_SIGNAL_INVALID', 'Signal principal is not authorized.');
    const waitIntent = findWaitIntent(await this.events.read({ scope: request.scope }), wait.id);
    await this.options.validateSignalPayload?.(
      clone(request.signal.payload),
      waitIntent?.expectedSchema
    );
    const at = this.now();
    const signalRef = `signal:${request.signal.signalId}`;
    const append = await this.append(request, [
      event(request, at, 'runtime.signal.received', 1, {
        waitId: wait.id,
        signal: clone(request.signal),
        payloadHash: hashCanonicalJson(request.signal.payload),
      }),
      event(request, at, 'runtime.wait.resolved', 2, {
        waitId: wait.id,
        resolution: 'received',
        signalRef,
      }),
      event(request, at, 'run.resumed', 3, { waitId: wait.id, signalRef }),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async fireTimer(request: FireRuntimeTimerRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    timestamp(request.firedAt, 'firedAt');
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, ['waiting_timer']);
    const wait = await this.requirePendingWait(request.scope, request.waitId, ['timer']);
    if (!wait.expiresAt || request.firedAt < wait.expiresAt) {
      conflict('RUNTIME_SIGNAL_INVALID', 'Timer cannot fire before its due time.');
    }
    const append = await this.append(request, [
      event(request, request.firedAt, 'runtime.timer.fired', 1, { waitId: wait.id }),
      event(request, request.firedAt, 'runtime.wait.resolved', 2, {
        waitId: wait.id,
        resolution: 'received',
      }),
      event(request, request.firedAt, 'run.resumed', 3, { waitId: wait.id }),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async expireWait(request: ExpireRuntimeWaitRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    required(request.waitId, 'waitId');
    timestamp(request.expiredAt, 'expiredAt');
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, ['waiting', 'waiting_human', 'waiting_signal']);
    const wait = await this.requirePendingWait(request.scope, request.waitId, [
      'human',
      'signal',
      'external_operation',
    ]);
    if (!wait.expiresAt || request.expiredAt < wait.expiresAt) {
      conflict('RUNTIME_SIGNAL_INVALID', 'Wait cannot expire before its deadline.');
    }
    const waitIntent = findWaitIntent(await this.events.read({ scope: request.scope }), wait.id);
    const timeoutTransitionId = waitIntent?.timeoutTransitionId;
    const lifecycleType: FrameworkEventType = timeoutTransitionId ? 'run.resumed' : 'run.timed_out';
    const lifecyclePayload = timeoutTransitionId
      ? { waitId: wait.id, timeoutTransitionId }
      : { terminalState: request.terminalState ?? 'TimedOut', waitId: wait.id };
    const append = await this.append(request, [
      event(request, request.expiredAt, 'runtime.wait.expired', 1, { waitId: wait.id }),
      event(request, request.expiredAt, lifecycleType, 2, lifecyclePayload),
    ]);
    return { append, run: await this.requireRun(request.scope) };
  }

  async beginRecovery(request: RuntimeRunCommand): Promise<RuntimeRunCommitResult> {
    return this.transition(request, ['running', 'retry_scheduled'], 'run.recovering', {});
  }

  async requestCancellation(request: CancelRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    required(request.reason, 'reason');
    const prior = await this.reuse(request);
    if (prior) {
      await this.options.onCancelRequested?.(clone(prior.run), request.reason);
      return prior;
    }
    const { run } = await this.loadCurrent(request, [
      'created',
      'queued',
      'acquiring',
      'running',
      'waiting',
      'waiting_human',
      'waiting_signal',
      'waiting_timer',
      'pausing',
      'paused',
      'retry_scheduled',
      'recovering',
    ]);
    const at = this.now();
    const append = await this.append(request, [
      event(request, at, 'run.cancel.requested', 1, { reason: request.reason }),
      event(request, at, 'run.cancelling', 2, { reason: request.reason }),
    ]);
    const next = await this.requireRun(request.scope);
    await this.options.onCancelRequested?.(clone(run), request.reason);
    return { append, run: next };
  }

  async finalizeCancellation(
    request: FinalizeRuntimeCancellationRequest
  ): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, ['cancelling']);
    const wait = await this.getPendingWait(request.scope);
    const at = this.now();
    const events: EventCreateInput[] = [];
    if (wait) {
      events.push(event(request, at, 'runtime.wait.cancelled', 1, { waitId: wait.id }));
      if (wait.type === 'timer') {
        events.push(event(request, at, 'runtime.timer.cancelled', 2, { waitId: wait.id }));
      }
    }
    events.push(
      event(request, at, 'run.cancelled', 3, {
        terminalState: request.terminalState ?? 'Cancelled',
        ...(request.unresolvedActivityRefs === undefined
          ? {}
          : { unresolvedActivityRefs: [...request.unresolvedActivityRefs] }),
      })
    );
    const append = await this.append(request, events);
    return { append, run: await this.requireRun(request.scope) };
  }

  async complete(request: CompleteRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    return this.terminate(request, ['running'], 'run.completed', {
      terminalState: request.terminalState,
      ...(request.output === undefined ? {} : { output: clone(request.output) }),
      ...(request.outputHash === undefined ? {} : { outputHash: request.outputHash }),
    });
  }

  async fail(request: FailRuntimeRunRequest): Promise<RuntimeRunCommitResult> {
    return this.terminate(
      request,
      [
        'created',
        'queued',
        'acquiring',
        'running',
        'waiting',
        'waiting_human',
        'waiting_signal',
        'waiting_timer',
        'pausing',
        'paused',
        'retry_scheduled',
        'recovering',
        'cancelling',
      ],
      'run.failed',
      { terminalState: request.terminalState, error: clone(request.error) }
    );
  }

  async get(scope: EventStreamScope): Promise<RuntimeRun | null> {
    return projectRuntimeRun(await this.events.read({ scope }));
  }

  async getPendingWait(scope: EventStreamScope): Promise<RuntimeWaitRecord | null> {
    const waits = projectRuntimeWaits(await this.events.read({ scope }));
    return clone(waits.filter((wait) => wait.status === 'waiting').at(-1) ?? null);
  }

  private async transition(
    request: RuntimeRunCommand,
    allowed: RuntimeRun['status'][],
    type: FrameworkEventType,
    payload: Record<string, unknown>
  ): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, allowed);
    const append = await this.append(request, [event(request, this.now(), type, 1, payload)]);
    return { append, run: await this.requireRun(request.scope) };
  }

  private async terminate(
    request: RunCommandBase,
    allowed: RuntimeRun['status'][],
    type: FrameworkEventType,
    payload: Record<string, unknown>
  ): Promise<RuntimeRunCommitResult> {
    validateCommand(request);
    const prior = await this.reuse(request);
    if (prior) return prior;
    await this.loadCurrent(request, allowed);
    const at = this.now();
    const wait = await this.getPendingWait(request.scope);
    const events: EventCreateInput[] = [];
    if (wait) events.push(event(request, at, 'runtime.wait.cancelled', 1, { waitId: wait.id }));
    events.push(event(request, at, type, 2, payload));
    const append = await this.append(request, events);
    return { append, run: await this.requireRun(request.scope) };
  }

  private async loadCurrent(
    request: RunCommandBase,
    allowed: RuntimeRun['status'][]
  ): Promise<{ run: RuntimeRun; events: PersistedFrameworkEvent[] }> {
    const events = await this.events.read({ scope: request.scope });
    const run = projectRuntimeRun(events);
    if (!run) conflict('RUNTIME_RUN_NOT_FOUND', `Run not found: ${request.scope.runId}`);
    if (!allowed.includes(run.status)) {
      conflict('RUNTIME_RUN_CONFLICT', `Run status ${run.status} does not allow this command.`);
    }
    const actualSequence = events.at(-1)?.sequence ?? 0;
    if (actualSequence !== request.expectedLastSequence) {
      conflict('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict.');
    }
    return { run, events };
  }

  private async requirePendingWait(
    scope: EventStreamScope,
    waitId: string,
    types: RuntimeWaitRecord['type'][]
  ): Promise<RuntimeWaitRecord> {
    const wait = await this.getPendingWait(scope);
    if (!wait || wait.id !== waitId || !types.includes(wait.type)) {
      conflict('RUNTIME_SIGNAL_INVALID', 'Pending wait does not match the request.');
    }
    return wait;
  }

  private async requireRun(scope: EventStreamScope): Promise<RuntimeRun> {
    const run = await this.get(scope);
    if (!run) conflict('RUNTIME_RUN_NOT_FOUND', `Run not found: ${scope.runId}`);
    return run;
  }

  private async reuse(request: RunCommandBase): Promise<RuntimeRunCommitResult | null> {
    const stream = await this.events.read({ scope: request.scope });
    const prior = stream.filter(
      (item) =>
        item.operationId === request.operationId && item.idempotencyKey === request.idempotencyKey
    );
    if (prior.length === 0) return null;
    const append = await this.events.append({
      scope: clone(request.scope),
      events: prior.map(toCreateInput),
      expectedLastSequence: request.expectedLastSequence,
      ...(request.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: request.expectedRunRevision }),
      fencingToken: request.fencingToken,
      idempotencyKey: request.idempotencyKey,
      transactionGroupId: request.operationId,
    });
    const run = projectRuntimeRun(stream);
    if (!run) conflict('RUNTIME_RUN_NOT_FOUND', `Run not found: ${request.scope.runId}`);
    return { append, run };
  }

  private append(request: RunCommandBase, events: EventCreateInput[]): Promise<EventAppendResult> {
    return this.events.append({
      scope: clone(request.scope),
      events,
      expectedLastSequence: request.expectedLastSequence,
      ...(request.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: request.expectedRunRevision }),
      fencingToken: request.fencingToken,
      idempotencyKey: request.idempotencyKey,
      transactionGroupId: request.operationId,
    });
  }
}

export function projectRuntimeRun(events: readonly PersistedFrameworkEvent[]): RuntimeRun | null {
  let run: RuntimeRun | null = null;
  let lastLifecycleOperationId: string | undefined;
  for (const item of events) {
    if (item.type === 'run.created') {
      if (run) conflict('RUNTIME_REPLAY_DIVERGENCE', 'Run was created more than once.');
      const payload = recordPayload(item);
      run = clone(payload.run as RuntimeRun);
      lastLifecycleOperationId = item.operationId;
      continue;
    }
    if (!run) continue;
    const startsLifecycleOperation =
      item.operationId === undefined || item.operationId !== lastLifecycleOperationId;
    run = {
      ...run,
      revision: run.revision + (startsLifecycleOperation ? 1 : 0),
      updatedAt: item.timestamp,
    };
    lastLifecycleOperationId = item.operationId;
    if (!item.type.startsWith('run.')) continue;
    if (isTerminal(run.status)) {
      conflict('RUNTIME_REPLAY_DIVERGENCE', 'Terminal Run contains later lifecycle events.');
    }
    const payload = recordPayload(item);
    if (item.type === 'run.queued') run = { ...run, status: 'queued', queuedAt: item.timestamp };
    else if (item.type === 'run.acquiring') run = { ...run, status: 'acquiring' };
    else if (item.type === 'run.started') {
      run = { ...run, status: 'running', startedAt: run.startedAt ?? item.timestamp };
    } else if (item.type === 'run.waiting') run = { ...run, status: 'waiting' };
    else if (item.type === 'run.waiting_human') run = { ...run, status: 'waiting_human' };
    else if (item.type === 'run.waiting_signal') run = { ...run, status: 'waiting_signal' };
    else if (item.type === 'run.waiting_timer') run = { ...run, status: 'waiting_timer' };
    else if (item.type === 'run.pausing') run = { ...run, status: 'pausing' };
    else if (item.type === 'run.paused') run = { ...run, status: 'paused' };
    else if (item.type === 'run.retry_scheduled') run = { ...run, status: 'retry_scheduled' };
    else if (item.type === 'run.recovering') run = { ...run, status: 'recovering' };
    else if (item.type === 'run.resumed') run = { ...run, status: 'running' };
    else if (item.type === 'run.cancel.requested') {
      run = {
        ...run,
        cancelRequestedAt: item.timestamp,
        ...(optionalString(payload.reason) === undefined
          ? {}
          : { cancelReason: optionalString(payload.reason) }),
      };
    } else if (item.type === 'run.cancelling') run = { ...run, status: 'cancelling' };
    else if (item.type === 'run.completed') {
      run = terminalRun(run, 'completed', item, payload);
    } else if (item.type === 'run.failed') {
      run = {
        ...terminalRun(run, 'failed', item, payload),
        error: clone(payload.error as NormalizedRuntimeError),
      };
    } else if (item.type === 'run.cancelled') {
      run = terminalRun(run, 'cancelled', item, payload);
    } else if (item.type === 'run.timed_out') {
      run = terminalRun(run, 'timed_out', item, payload);
    }
  }
  return run ? clone(run) : null;
}

export function projectRuntimeWaits(
  events: readonly PersistedFrameworkEvent[]
): RuntimeWaitRecord[] {
  const waits = new Map<string, RuntimeWaitRecord>();
  for (const item of events) {
    const payload = item.payload && typeof item.payload === 'object' ? recordPayload(item) : {};
    if (item.type === 'runtime.wait.created') {
      const wait = clone(payload.wait as RuntimeWaitRecord);
      if (!wait?.id || waits.has(wait.id)) {
        conflict('RUNTIME_REPLAY_DIVERGENCE', 'Invalid or duplicate wait creation event.');
      }
      waits.set(wait.id, wait);
    } else if (
      item.type === 'runtime.wait.resolved' ||
      item.type === 'runtime.wait.expired' ||
      item.type === 'runtime.wait.cancelled'
    ) {
      const id = requiredPayloadString(payload, 'waitId');
      const wait = waits.get(id);
      if (!wait || wait.status !== 'waiting') {
        conflict('RUNTIME_REPLAY_DIVERGENCE', `Wait is not pending: ${id}`);
      }
      wait.status =
        item.type === 'runtime.wait.resolved'
          ? 'received'
          : item.type === 'runtime.wait.expired'
            ? 'expired'
            : 'cancelled';
      wait.resolvedAt = item.timestamp;
      if (typeof payload.signalRef === 'string') wait.signalRef = payload.signalRef;
    }
  }
  return Array.from(waits.values()).map(clone);
}

function event(
  request: RunCommandBase,
  at: string,
  type: FrameworkEventType,
  ordinal: number,
  payload: Record<string, unknown>
): EventCreateInput {
  return {
    id: `${request.operationId}:${ordinal}:${type}`,
    type,
    version: '1.0.0',
    ...(request.scope.tenantId === undefined ? {} : { tenantId: request.scope.tenantId }),
    userId: request.scope.userId,
    runId: request.scope.runId,
    operationId: request.operationId,
    idempotencyKey: request.idempotencyKey,
    ...(request.correlationId === undefined ? {} : { correlationId: request.correlationId }),
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

function terminalRun(
  run: RuntimeRun,
  status: 'completed' | 'failed' | 'cancelled' | 'timed_out',
  item: PersistedFrameworkEvent,
  payload: Record<string, unknown>
): RuntimeRun {
  return {
    ...run,
    status,
    terminalState: requiredPayloadString(payload, 'terminalState'),
    ...(payload.output === undefined ? {} : { output: clone(payload.output) }),
    ...(typeof payload.outputHash === 'string' ? { outputHash: payload.outputHash } : {}),
    completedAt: item.timestamp,
  };
}

function findWaitIntent(
  events: readonly PersistedFrameworkEvent[],
  waitId: string
): RuntimeWaitRequest | null {
  for (const item of events) {
    if (item.type !== 'runtime.wait.created') continue;
    const payload = recordPayload(item);
    const wait = payload.wait as RuntimeWaitRecord | undefined;
    if (wait?.id === waitId) return clone(payload.request as RuntimeWaitRequest);
  }
  return null;
}

function findReceivedSignal(
  events: readonly PersistedFrameworkEvent[],
  signalId: string
): { eventId: string; waitId: string; signal: RunSignalRequest } | null {
  for (const item of events) {
    if (item.type !== 'runtime.signal.received') continue;
    const payload = recordPayload(item);
    const signal = payload.signal as RunSignalRequest | undefined;
    if (signal?.signalId === signalId) {
      return {
        eventId: item.id,
        waitId: requiredPayloadString(payload, 'waitId'),
        signal: clone(signal),
      };
    }
  }
  return null;
}

function waitRunEvent(type: RuntimeWaitRequest['type']): FrameworkEventType {
  if (type === 'human') return 'run.waiting_human';
  if (type === 'signal') return 'run.waiting_signal';
  if (type === 'timer') return 'run.waiting_timer';
  return 'run.waiting';
}

function validateWaitRequest(request: RuntimeWaitRequest): void {
  if (request.type === 'signal' && !request.key) {
    conflict('RUNTIME_INVALID_INPUT', 'Signal wait requires a key.');
  }
  if (request.type === 'timer' && !request.expiresAt) {
    conflict('RUNTIME_INVALID_INPUT', 'Timer wait requires expiresAt.');
  }
  if (request.expiresAt) timestamp(request.expiresAt, 'wait.expiresAt');
  if (request.expectedSchema !== undefined) hashCanonicalJson(request.expectedSchema);
}

function validateSignal(signal: RunSignalRequest, runId: string): void {
  required(signal.signalId, 'signalId');
  required(signal.key, 'signal.key');
  if (signal.runId !== runId)
    conflict('RUNTIME_SIGNAL_INVALID', 'Signal Run does not match scope.');
  timestamp(signal.sentAt, 'signal.sentAt');
  hashCanonicalJson(signal.payload);
}

function defaultSignalAuthorization(principal: RuntimePrincipal): boolean {
  return (
    principal.permissionScopes.includes('*') ||
    principal.permissionScopes.includes('runtime:signal')
  );
}

function validateCommand(request: RunCommandBase): void {
  required(request.scope.userId, 'scope.userId');
  required(request.scope.runId, 'scope.runId');
  required(request.idempotencyKey, 'idempotencyKey');
  required(request.operationId, 'operationId');
  if (!Number.isInteger(request.expectedLastSequence) || request.expectedLastSequence < 0) {
    conflict('RUNTIME_INVALID_INPUT', 'expectedLastSequence must be non-negative.');
  }
  if (!Number.isInteger(request.fencingToken) || request.fencingToken < 1) {
    conflict('RUNTIME_INVALID_INPUT', 'fencingToken must be positive.');
  }
}

function recordPayload(item: PersistedFrameworkEvent): Record<string, unknown> {
  if (!item.payload || typeof item.payload !== 'object' || Array.isArray(item.payload)) {
    conflict('RUNTIME_REPLAY_DIVERGENCE', `Invalid payload for ${item.type}.`);
  }
  return item.payload as Record<string, unknown>;
}

function requiredPayloadString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];
  if (typeof value !== 'string' || value.length === 0) {
    conflict('RUNTIME_REPLAY_DIVERGENCE', `Missing event payload field: ${key}.`);
  }
  return value;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    conflict('RUNTIME_INVALID_INPUT', `${label} must be a non-empty string.`);
  }
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    conflict('RUNTIME_INVALID_INPUT', `${label} must be a valid timestamp.`);
  }
}

function isTerminal(status: RuntimeRun['status']): boolean {
  return ['completed', 'failed', 'cancelled', 'timed_out'].includes(status);
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function conflict(code: string, message: string): never {
  throw new FrameworkError({ code, message });
}
