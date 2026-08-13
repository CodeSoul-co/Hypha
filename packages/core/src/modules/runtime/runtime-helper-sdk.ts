import { randomUUID } from 'node:crypto';
import type {
  HumanWaitRequest,
  PauseRequest,
  RuntimeClockHelper,
  RuntimeDeterminismResolveRequest,
  RuntimeDeterminismResolution,
  RuntimeDeterminismScope,
  RuntimeDeterminismStore,
  RuntimeDeterministicObservation,
  RuntimeHelperSdk,
  RuntimeIdHelper,
  RuntimeJsonValue,
  RuntimeStateExecutionResult,
  RuntimeTransitionHelper,
  RuntimeTransitionProposal,
  RuntimeWaitHelper,
  SignalWaitRequest,
  TimerWaitRequest,
} from '../../contracts/runtime-helpers';
import {
  runtimeDeterminismScopeSchema,
  validateRuntimeDeterministicObservation,
  validateRuntimeStateExecutionResult,
  validateRuntimeTransitionProposal,
  validateRuntimeWaitIntent,
} from '../../contracts/runtime-helper-schemas';
import type { NormalizedRuntimeError } from '../../contracts/runtime';
import { validateNormalizedRuntimeError } from '../../contracts/runtime-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

export interface CreateRuntimeHelperSdkOptions {
  scope: RuntimeDeterminismScope;
  determinismStore: RuntimeDeterminismStore;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class InMemoryRuntimeDeterminismStore implements RuntimeDeterminismStore {
  private readonly observations = new Map<string, RuntimeDeterministicObservation>();
  private writeBarrier = Promise.resolve();

  async resolve<T extends RuntimeJsonValue>(
    request: RuntimeDeterminismResolveRequest,
    produce: () => T | Promise<T>
  ): Promise<RuntimeDeterminismResolution<T>> {
    const scope = runtimeDeterminismScopeSchema.parse(request.scope);
    nonEmpty(request.key, 'observation key');
    if (request.kind !== 'clock' && request.kind !== 'id') {
      invalid('Unsupported deterministic observation kind');
    }
    const snapshot = { ...request, scope };
    return this.exclusive(async () => {
      const key = deterministicObservationKey(snapshot.scope, snapshot.key);
      const prior = this.observations.get(key);
      if (prior) {
        if (prior.kind !== snapshot.kind) {
          conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Observation key kind cannot change', {
            key: snapshot.key,
            expectedKind: prior.kind,
            actualKind: snapshot.kind,
          });
        }
        return {
          observation: cloneObservation(prior) as RuntimeDeterministicObservation<T>,
          reused: true,
        };
      }

      const value = await produce();
      hashCanonicalJson(value);
      const observation = validateRuntimeDeterministicObservation({
        scope: snapshot.scope,
        key: snapshot.key,
        kind: snapshot.kind,
        value,
      }) as RuntimeDeterministicObservation<T>;
      this.observations.set(key, cloneObservation(observation));
      return { observation: cloneObservation(observation), reused: false };
    });
  }

  private async exclusive<T>(operation: () => T | Promise<T>): Promise<T> {
    const previousWrite = this.writeBarrier;
    let releaseWrite = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    await previousWrite;
    try {
      return await operation();
    } finally {
      releaseWrite();
    }
  }
}

export class DefaultRuntimeTransitionHelper implements RuntimeTransitionHelper {
  propose(
    to: string,
    reason?: string,
    variablesPatch?: Record<string, RuntimeJsonValue>
  ): RuntimeTransitionProposal {
    return immutable(
      validateRuntimeTransitionProposal({
        to,
        ...(reason === undefined ? {} : { reason }),
        ...(variablesPatch === undefined ? {} : { variablesPatch }),
      })
    );
  }

  complete(
    output?: RuntimeJsonValue,
    variablesPatch?: Record<string, RuntimeJsonValue>
  ): RuntimeStateExecutionResult {
    return immutable(
      validateRuntimeStateExecutionResult({
        kind: 'completed',
        ...(output === undefined ? {} : { output }),
        ...(variablesPatch === undefined ? {} : { variablesPatch }),
      })
    );
  }

  continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult {
    return immutable(
      validateRuntimeStateExecutionResult({
        kind: 'continued',
        ...(observation === undefined ? {} : { observation }),
      })
    );
  }

  fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult {
    return immutable({ kind: 'failed', error: validateNormalizedRuntimeError(error) });
  }
}

export class DefaultRuntimeWaitHelper implements RuntimeWaitHelper {
  human(request: HumanWaitRequest): RuntimeStateExecutionResult {
    return this.wait({ type: 'human', ...request });
  }

  signal(request: SignalWaitRequest): RuntimeStateExecutionResult {
    return this.wait({ type: 'signal', ...request });
  }

  timer(request: TimerWaitRequest): RuntimeStateExecutionResult {
    const { fireAt, ...options } = request;
    return this.wait({ type: 'timer', expiresAt: fireAt, ...options });
  }

  pause(request: PauseRequest): RuntimeStateExecutionResult {
    const { resumeKey, ...options } = request;
    return this.wait({
      type: 'pause',
      ...(resumeKey === undefined ? {} : { key: resumeKey }),
      ...options,
    });
  }

  private wait(intent: unknown): RuntimeStateExecutionResult {
    return immutable({ kind: 'waiting', wait: validateRuntimeWaitIntent(intent) });
  }
}

export class DeterministicRuntimeClockHelper implements RuntimeClockHelper {
  private sequence = 0;

  constructor(
    private readonly scope: RuntimeDeterminismScope,
    private readonly store: RuntimeDeterminismStore,
    private readonly waits: RuntimeWaitHelper,
    private readonly source: () => string = () => new Date().toISOString()
  ) {}

  async now(): Promise<string> {
    const sequence = ++this.sequence;
    const resolution = await this.store.resolve(
      { scope: this.scope, key: `clock.now:${sequence}`, kind: 'clock' },
      () => {
        const value = this.source();
        validTimestamp(value, 'Runtime clock');
        return value;
      }
    );
    const value = resolution.observation.value;
    if (typeof value !== 'string') invalid('Recorded clock observation must be a string');
    validTimestamp(value, 'Recorded runtime clock');
    return value;
  }

  async sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult> {
    validTimestamp(isoTime, 'sleepUntil');
    return this.waits.timer({ fireAt: isoTime });
  }
}

export class DeterministicRuntimeIdHelper implements RuntimeIdHelper {
  private readonly namespaceSequences = new Map<string, number>();

  constructor(
    private readonly scope: RuntimeDeterminismScope,
    private readonly store: RuntimeDeterminismStore,
    private readonly source: (namespace: string) => string = (namespace) =>
      `${namespace}.${randomUUID()}`
  ) {}

  async next(namespace: string): Promise<string> {
    nonEmpty(namespace, 'ID namespace');
    const sequence = (this.namespaceSequences.get(namespace) ?? 0) + 1;
    this.namespaceSequences.set(namespace, sequence);
    const resolution = await this.store.resolve(
      { scope: this.scope, key: `id:${namespace}:${sequence}`, kind: 'id' },
      () => {
        const value = this.source(namespace);
        nonEmpty(value, 'Generated ID');
        return value;
      }
    );
    const value = resolution.observation.value;
    if (typeof value !== 'string') invalid('Recorded ID observation must be a string');
    nonEmpty(value, 'Recorded ID');
    return value;
  }
}

export function createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk {
  const scope = runtimeDeterminismScopeSchema.parse(options.scope);
  const transitions = new DefaultRuntimeTransitionHelper();
  const waits = new DefaultRuntimeWaitHelper();
  return Object.freeze({
    transitions,
    waits,
    clock: new DeterministicRuntimeClockHelper(scope, options.determinismStore, waits, options.now),
    ids: new DeterministicRuntimeIdHelper(scope, options.determinismStore, options.nextId),
  });
}

export function deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string {
  const validated = runtimeDeterminismScopeSchema.parse(scope);
  nonEmpty(key, 'observation key');
  return `${validated.tenantId ?? ''}\u0000${validated.userId}\u0000${validated.runId}\u0000${validated.stateId}\u0000${validated.stateAttempt}\u0000${key}`;
}

function immutable<T>(value: T): T {
  return deepFreeze(structuredClone(value));
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

function cloneObservation<T extends RuntimeJsonValue>(
  observation: RuntimeDeterministicObservation<T>
): RuntimeDeterministicObservation<T> {
  return structuredClone(observation);
}

function nonEmpty(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}
