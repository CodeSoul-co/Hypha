import type {
  NormalizedRuntimeError,
  RuntimeActionProposal,
  RuntimeActionType,
  RuntimePrincipal,
  RuntimeRun,
  RuntimeScope,
  RuntimeTransitionProposal,
  RuntimeWaitRequest,
  StateExecutionResult,
} from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { EventStreamScope } from './event-store';
import type { DurableEventRuntime } from './event-runtime';
import { hashCanonicalJson } from './canonical-json';

export type RuntimeObservationKind = 'clock' | 'id';
export type RuntimeObservationMode = 'live' | 'replay';

export interface RuntimeObservationResult<T> {
  value: T;
  eventId: string;
  reused: boolean;
}

export interface RuntimeObservationPort {
  getOrRecord<T>(request: {
    observationKey: string;
    kind: RuntimeObservationKind;
    produce: () => Promise<T> | T;
  }): Promise<RuntimeObservationResult<T>>;
}

export interface EventSourcedRuntimeObservationPortOptions {
  events: DurableEventRuntime;
  scope: EventStreamScope;
  fencingToken: number;
  operationPrefix: string;
  mode?: RuntimeObservationMode;
  now?: () => string;
}

export class EventSourcedRuntimeObservationPort implements RuntimeObservationPort {
  private readonly mode: RuntimeObservationMode;
  private readonly now: () => string;

  constructor(private readonly options: EventSourcedRuntimeObservationPortOptions) {
    required(options.operationPrefix, 'operationPrefix');
    if (!Number.isInteger(options.fencingToken) || options.fencingToken < 1) {
      invalid('fencingToken must be positive.');
    }
    this.mode = options.mode ?? 'live';
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async getOrRecord<T>(request: {
    observationKey: string;
    kind: RuntimeObservationKind;
    produce: () => Promise<T> | T;
  }): Promise<RuntimeObservationResult<T>> {
    required(request.observationKey, 'observationKey');
    const stream = await this.options.events.read({ scope: this.options.scope });
    const prior = stream.filter((event) => {
      if (event.type !== 'runtime.observation.recorded') return false;
      const payload = event.payload as Record<string, unknown>;
      return payload.observationKey === request.observationKey;
    });
    if (prior.length > 1) {
      throw new FrameworkError({
        code: 'RUNTIME_REPLAY_DIVERGENCE',
        message: `Observation was recorded more than once: ${request.observationKey}`,
      });
    }
    if (prior.length === 1) {
      const payload = prior[0].payload as Record<string, unknown>;
      if (payload.kind !== request.kind) {
        throw new FrameworkError({
          code: 'RUNTIME_REPLAY_DIVERGENCE',
          message: `Observation kind changed for ${request.observationKey}`,
        });
      }
      return {
        value: clone(payload.value as T),
        eventId: prior[0].id,
        reused: true,
      };
    }
    if (this.mode === 'replay') {
      throw new FrameworkError({
        code: 'RUNTIME_REPLAY_DIVERGENCE',
        message: `Replay observation is missing: ${request.observationKey}`,
      });
    }

    const value = clone(await request.produce());
    hashCanonicalJson(value);
    const head = await this.options.events.getStreamHead(this.options.scope);
    const operationId = `${this.options.operationPrefix}:observation:${hashCanonicalJson({
      observationKey: request.observationKey,
    })}`;
    const eventId = `${operationId}:recorded`;
    const timestamp = this.now();
    assertTimestamp(timestamp);
    const append = await this.options.events.append({
      scope: clone(this.options.scope),
      events: [
        {
          id: eventId,
          type: 'runtime.observation.recorded',
          version: '1.0.0',
          ...(this.options.scope.tenantId === undefined
            ? {}
            : { tenantId: this.options.scope.tenantId }),
          userId: this.options.scope.userId,
          runId: this.options.scope.runId,
          operationId,
          idempotencyKey: operationId,
          timestamp,
          payload: {
            observationKey: request.observationKey,
            kind: request.kind,
            value,
          },
        },
      ],
      expectedLastSequence: head?.lastSequence ?? 0,
      expectedRunRevision: head?.runRevision ?? 0,
      fencingToken: this.options.fencingToken,
      idempotencyKey: operationId,
      transactionGroupId: operationId,
    });
    return { value: clone(value), eventId: append.events[0].id, reused: append.reused };
  }
}

export interface RuntimeTransitionHelper {
  propose(
    to: string,
    reason?: string,
    variablesPatch?: Record<string, unknown>
  ): RuntimeTransitionProposal;
  complete(output?: unknown, variablesPatch?: Record<string, unknown>): StateExecutionResult;
  continue(observation?: unknown): StateExecutionResult;
  fail(error: NormalizedRuntimeError): StateExecutionResult;
}

export class DefaultRuntimeTransitionHelper implements RuntimeTransitionHelper {
  propose(
    to: string,
    reason?: string,
    variablesPatch?: Record<string, unknown>
  ): RuntimeTransitionProposal {
    required(to, 'transition.to');
    return {
      to,
      ...(reason === undefined ? {} : { reason }),
      ...(variablesPatch === undefined ? {} : { variablesPatch: cloneJsonRecord(variablesPatch) }),
    };
  }

  complete(output?: unknown, variablesPatch?: Record<string, unknown>): StateExecutionResult {
    return {
      status: 'completed',
      ...(output === undefined
        ? {}
        : { output: clone(output), outputHash: hashCanonicalJson(output) }),
      ...(variablesPatch === undefined ? {} : { variablesPatch: cloneJsonRecord(variablesPatch) }),
    };
  }

  continue(observation?: unknown): StateExecutionResult {
    return {
      status: 'continue',
      ...(observation === undefined ? {} : { output: clone(observation) }),
    };
  }

  fail(error: NormalizedRuntimeError): StateExecutionResult {
    return { status: 'failed', failure: clone(error) };
  }
}

export interface HumanWaitRequest extends Omit<RuntimeWaitRequest, 'type'> {}
export interface SignalWaitRequest extends Omit<RuntimeWaitRequest, 'type' | 'key'> {
  key: string;
}
export interface TimerWaitRequest extends Omit<RuntimeWaitRequest, 'type' | 'expiresAt'> {
  expiresAt: string;
}
export interface PauseRequest {
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeWaitHelper {
  human(request: HumanWaitRequest): StateExecutionResult;
  signal(request: SignalWaitRequest): StateExecutionResult;
  timer(request: TimerWaitRequest): StateExecutionResult;
  pause(request?: PauseRequest): StateExecutionResult;
}

export class DefaultRuntimeWaitHelper implements RuntimeWaitHelper {
  human(request: HumanWaitRequest): StateExecutionResult {
    return waitResult('waiting_human', { ...clone(request), type: 'human' });
  }

  signal(request: SignalWaitRequest): StateExecutionResult {
    required(request.key, 'signal.key');
    return waitResult('waiting_signal', { ...clone(request), type: 'signal' });
  }

  timer(request: TimerWaitRequest): StateExecutionResult {
    assertTimestamp(request.expiresAt);
    return waitResult('waiting_timer', { ...clone(request), type: 'timer' });
  }

  pause(request: PauseRequest = {}): StateExecutionResult {
    return {
      status: 'paused',
      ...(request.reason === undefined && request.metadata === undefined
        ? {}
        : {
            metadata: {
              ...(request.reason === undefined ? {} : { reason: request.reason }),
              ...(request.metadata === undefined ? {} : cloneJsonRecord(request.metadata)),
            },
          }),
    };
  }
}

export interface RuntimeClockHelper {
  now(): Promise<string>;
  sleepUntil(isoTime: string): Promise<StateExecutionResult>;
}

export class ObservedRuntimeClockHelper implements RuntimeClockHelper {
  private sequence = 0;

  constructor(
    private readonly observations: RuntimeObservationPort,
    private readonly contextKey: string,
    private readonly wallClock: () => string = () => new Date().toISOString()
  ) {
    required(contextKey, 'contextKey');
  }

  async now(): Promise<string> {
    const observation = await this.observations.getOrRecord({
      observationKey: `${this.contextKey}:clock:${++this.sequence}`,
      kind: 'clock',
      produce: () => {
        const value = this.wallClock();
        assertTimestamp(value);
        return value;
      },
    });
    assertTimestamp(observation.value);
    return observation.value;
  }

  async sleepUntil(isoTime: string): Promise<StateExecutionResult> {
    assertTimestamp(isoTime);
    return waitResult('waiting_timer', { type: 'timer', expiresAt: isoTime });
  }
}

export interface RuntimeIdHelper {
  next(namespace: string): Promise<string>;
}

export class ObservedRuntimeIdHelper implements RuntimeIdHelper {
  private readonly sequences = new Map<string, number>();

  constructor(
    private readonly observations: RuntimeObservationPort,
    private readonly contextKey: string,
    private readonly generate: (namespace: string) => string
  ) {
    required(contextKey, 'contextKey');
  }

  async next(namespace: string): Promise<string> {
    required(namespace, 'namespace');
    const sequence = (this.sequences.get(namespace) ?? 0) + 1;
    this.sequences.set(namespace, sequence);
    const observation = await this.observations.getOrRecord({
      observationKey: `${this.contextKey}:id:${namespace}:${sequence}`,
      kind: 'id',
      produce: () => {
        const value = this.generate(namespace);
        required(value, 'generated id');
        return value;
      },
    });
    required(observation.value, 'observed id');
    return observation.value;
  }
}

export interface RuntimeActionProposalHelper {
  propose(
    request: Omit<RuntimeActionProposal, 'id'> & { idNamespace?: string }
  ): Promise<RuntimeActionProposal>;
}

export class DefaultRuntimeActionProposalHelper implements RuntimeActionProposalHelper {
  constructor(private readonly ids: RuntimeIdHelper) {}

  async propose(
    request: Omit<RuntimeActionProposal, 'id'> & { idNamespace?: string }
  ): Promise<RuntimeActionProposal> {
    assertActionType(request.type);
    const { idNamespace, ...proposal } = request;
    return {
      id: await this.ids.next(idNamespace ?? 'action-proposal'),
      ...clone(proposal),
    };
  }
}

export interface RuntimeHelperFacade {
  readonly transitions: RuntimeTransitionHelper;
  readonly waits: RuntimeWaitHelper;
  readonly clock: RuntimeClockHelper;
  readonly ids: RuntimeIdHelper;
  readonly actions: RuntimeActionProposalHelper;
}

export interface CreateRuntimeHelperFacadeOptions {
  observations: RuntimeObservationPort;
  contextKey: string;
  wallClock?: () => string;
  generateId: (namespace: string) => string;
}

export function createRuntimeHelperFacade(
  options: CreateRuntimeHelperFacadeOptions
): RuntimeHelperFacade {
  const ids = new ObservedRuntimeIdHelper(
    options.observations,
    options.contextKey,
    options.generateId
  );
  return Object.freeze({
    transitions: new DefaultRuntimeTransitionHelper(),
    waits: new DefaultRuntimeWaitHelper(),
    clock: new ObservedRuntimeClockHelper(
      options.observations,
      options.contextKey,
      options.wallClock
    ),
    ids,
    actions: new DefaultRuntimeActionProposalHelper(ids),
  });
}

export interface RuntimeExecutionContext<TSnapshot, TProcess, TState> {
  readonly scope: RuntimeScope;
  readonly principal: Readonly<RuntimePrincipal>;
  readonly run: Readonly<RuntimeRun>;
  readonly snapshot: Readonly<TSnapshot>;
  readonly process: Readonly<TProcess>;
  readonly state: Readonly<TState>;
  readonly attempt: number;
  readonly fencingToken: number;
  readonly abortSignal: AbortSignal;
  readonly helpers: RuntimeHelperFacade;
}

function waitResult(
  status: 'waiting_human' | 'waiting_signal' | 'waiting_timer',
  wait: RuntimeWaitRequest
): StateExecutionResult {
  if (wait.expectedSchema !== undefined) hashCanonicalJson(wait.expectedSchema);
  if (wait.metadata !== undefined) hashCanonicalJson(wait.metadata);
  return { status, wait: clone(wait) };
}

function assertActionType(type: RuntimeActionType): void {
  const allowed: RuntimeActionType[] = [
    'tool',
    'memory_read',
    'memory_write',
    'model',
    'workspace',
    'execution',
    'human_review',
    'transition',
    'finish_state',
  ];
  if (!allowed.includes(type)) invalid(`Unsupported Runtime action type: ${type}`);
}

function cloneJsonRecord(value: Record<string, unknown>): Record<string, unknown> {
  hashCanonicalJson(value);
  return clone(value);
}

function assertTimestamp(value: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid('Timestamp must be valid.');
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty.`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
