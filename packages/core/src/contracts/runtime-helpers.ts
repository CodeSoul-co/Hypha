import type { JsonSchema } from '../specs';
import type { NormalizedRuntimeError } from './runtime';

export type RuntimeJsonValue =
  | null
  | boolean
  | number
  | string
  | RuntimeJsonValue[]
  | { [key: string]: RuntimeJsonValue };

export interface RuntimeTransitionProposal {
  to: string;
  reason?: string;
  variablesPatch?: Record<string, RuntimeJsonValue>;
}

export const RUNTIME_WAIT_INTENT_TYPES = ['human', 'signal', 'timer', 'pause'] as const;
export type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number];

export interface RuntimeWaitIntent {
  type: RuntimeWaitIntentType;
  key?: string;
  expectedSchema?: JsonSchema;
  expiresAt?: string;
  timeoutTransitionId?: string;
  pendingActionRef?: string;
  reason?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export type RuntimeStateExecutionResult =
  | {
      kind: 'completed';
      output?: RuntimeJsonValue;
      variablesPatch?: Record<string, RuntimeJsonValue>;
    }
  | { kind: 'continued'; observation?: RuntimeJsonValue }
  | { kind: 'failed'; error: NormalizedRuntimeError }
  | { kind: 'waiting'; wait: RuntimeWaitIntent };

export interface HumanWaitRequest {
  key?: string;
  expiresAt?: string;
  timeoutTransitionId?: string;
  pendingActionRef?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface SignalWaitRequest {
  key: string;
  expectedSchema?: JsonSchema;
  expiresAt?: string;
  timeoutTransitionId?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface TimerWaitRequest {
  fireAt: string;
  timeoutTransitionId?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface PauseRequest {
  reason: string;
  resumeKey?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeTransitionHelper {
  propose(
    to: string,
    reason?: string,
    variablesPatch?: Record<string, RuntimeJsonValue>
  ): RuntimeTransitionProposal;
  complete(
    output?: RuntimeJsonValue,
    variablesPatch?: Record<string, RuntimeJsonValue>
  ): RuntimeStateExecutionResult;
  continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult;
  fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult;
}

export interface RuntimeWaitHelper {
  human(request: HumanWaitRequest): RuntimeStateExecutionResult;
  signal(request: SignalWaitRequest): RuntimeStateExecutionResult;
  timer(request: TimerWaitRequest): RuntimeStateExecutionResult;
  pause(request: PauseRequest): RuntimeStateExecutionResult;
}

export interface RuntimeClockHelper {
  now(): Promise<string>;
  sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult>;
}

export interface RuntimeIdHelper {
  next(namespace: string): Promise<string>;
}

export interface RuntimeDeterminismScope {
  tenantId?: string;
  userId: string;
  runId: string;
  stateId: string;
  stateAttempt: number;
}

export const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS = ['clock', 'id'] as const;
export type RuntimeDeterministicObservationKind =
  (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number];

export interface RuntimeDeterministicObservation<T extends RuntimeJsonValue = RuntimeJsonValue> {
  scope: RuntimeDeterminismScope;
  key: string;
  kind: RuntimeDeterministicObservationKind;
  value: T;
}

export interface RuntimeDeterminismResolution<T extends RuntimeJsonValue = RuntimeJsonValue> {
  observation: RuntimeDeterministicObservation<T>;
  reused: boolean;
}

export interface RuntimeDeterminismResolveRequest {
  scope: RuntimeDeterminismScope;
  key: string;
  kind: RuntimeDeterministicObservationKind;
}

export interface RuntimeDeterminismStore {
  resolve<T extends RuntimeJsonValue>(
    request: RuntimeDeterminismResolveRequest,
    produce: () => T | Promise<T>
  ): Promise<RuntimeDeterminismResolution<T>>;
}

export interface RuntimeHelperSdk {
  readonly transitions: RuntimeTransitionHelper;
  readonly waits: RuntimeWaitHelper;
  readonly clock: RuntimeClockHelper;
  readonly ids: RuntimeIdHelper;
}
