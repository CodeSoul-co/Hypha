import type { JsonSchema } from '../specs';
import type { EventCreateInput, FrameworkEvent, RuntimeObservationEventType } from '../events';
import type {
  RuntimeResourceClaim,
  RuntimeResourceCoordinator,
  RuntimeResourceRequest,
  RunLeaseAuthorization,
} from './runtime-coordination';
import type { NormalizedRuntimeError, RuntimeScope } from './runtime';

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

export interface RuntimeHelperExecutionScope {
  scope: RuntimeScope;
  stateId: string;
  stateAttempt: number;
  fencingToken: number;
  correlationId: string;
  causationId?: string;
}

export interface RuntimeEventAppendOptions {
  idempotencyKey?: string;
  causationId?: string;
  parentEventId?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeObservationEventInput<T extends RuntimeJsonValue = RuntimeJsonValue> {
  type: RuntimeObservationEventType;
  payload: T;
  options?: RuntimeEventAppendOptions;
}

export interface RuntimeEventCommitRequest {
  scope: RuntimeHelperExecutionScope;
  events: EventCreateInput[];
  fencingToken: number;
  idempotencyKey: string;
}

export interface RuntimeEventCommitPort {
  append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]>;
  readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]>;
}

export interface RuntimeEventHelper {
  append<T extends RuntimeJsonValue>(
    type: RuntimeObservationEventType,
    payload: T,
    options?: RuntimeEventAppendOptions
  ): Promise<FrameworkEvent<T>>;
  appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]>;
  readSince(sequence: number): Promise<FrameworkEvent[]>;
}

export interface RuntimeResourceAcquireOptions {
  ttlMs: number;
  idempotencyKey?: string;
}

export interface RuntimeResourceRenewOptions {
  ttlMs: number;
}

export interface RuntimeResourceHelper {
  acquire(
    resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[],
    options: RuntimeResourceAcquireOptions
  ): Promise<RuntimeResourceClaim[]>;
  renew(
    claims: RuntimeResourceClaim[],
    options: RuntimeResourceRenewOptions
  ): Promise<RuntimeResourceClaim[]>;
  release(claims: RuntimeResourceClaim[]): Promise<void>;
  assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim>;
}

export interface RuntimeIoHelperSdk {
  readonly events: RuntimeEventHelper;
  readonly resources: RuntimeResourceHelper;
}

export interface RuntimeResourceHelperDependencies {
  runLease: RunLeaseAuthorization;
  coordinator: RuntimeResourceCoordinator;
  ids: RuntimeIdHelper;
  clock: RuntimeClockHelper;
  stateId: string;
}
