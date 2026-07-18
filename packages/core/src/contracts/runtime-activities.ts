import type { EventCreateInput, FrameworkEvent } from '../events';
import type { NormalizedRuntimeError, RuntimeScope } from './runtime';
import type { RuntimeHelperExecutionScope, RuntimeJsonValue } from './runtime-helpers';

export const RUNTIME_ACTIVITY_TYPES = ['tool', 'memory', 'model', 'execution', 'custom'] as const;

export const RUNTIME_ACTIVITY_EFFECTS = [
  'pure',
  'idempotent',
  'external_effect',
  'irreversible',
] as const;

export const RUNTIME_ACTIVITY_OBSERVATION_STATUSES = [
  'completed',
  'failed',
  'waiting',
  'cancelled',
] as const;

export type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number];
export type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number];
export type RuntimeActivityObservationStatus =
  (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number];

export interface RuntimeActivityRetryOptions {
  maxAttempts: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
}

export interface RuntimeActivityOptions {
  effect?: RuntimeActivityEffect;
  timeoutMs?: number;
  retry?: RuntimeActivityRetryOptions;
  idempotencyKey?: string;
  causationId?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
  target: string;
  input: TInput;
  options?: RuntimeActivityOptions;
}

export type RuntimeToolActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> =
  RuntimeActivityRequest<TInput>;
export type RuntimeMemoryActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> =
  RuntimeActivityRequest<TInput>;
export type RuntimeModelActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> =
  RuntimeActivityRequest<TInput>;
export type RuntimeExecutionActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> =
  RuntimeActivityRequest<TInput>;
export type RuntimeCustomActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> =
  RuntimeActivityRequest<TInput>;

export interface RuntimeActivityInvocation<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
  activityId: string;
  operationId: string;
  activityType: RuntimeActivityType;
  target: string;
  input: TInput;
  scope: RuntimeScope;
  stateId: string;
  stateAttempt: number;
  fencingToken: number;
  correlationId: string;
  causationId?: string;
  idempotencyKey: string;
  requestedAt: string;
  effect: RuntimeActivityEffect;
  timeoutMs?: number;
  retry?: RuntimeActivityRetryOptions;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeActivityObservation<TOutput extends RuntimeJsonValue = RuntimeJsonValue> {
  activityId: string;
  status: RuntimeActivityObservationStatus;
  eventIds: string[];
  output?: TOutput;
  artifactRefs?: string[];
  retryable?: boolean;
  error?: NormalizedRuntimeError;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeActivityDispatchPort {
  dispatch(
    invocation: RuntimeActivityInvocation,
    abortSignal: AbortSignal
  ): Promise<RuntimeActivityObservation>;
}

export interface RuntimeActivityLifecycleCommitRequest {
  execution: RuntimeHelperExecutionScope;
  event: EventCreateInput;
  fencingToken: number;
  idempotencyKey: string;
}

export interface RuntimeActivityLifecycleCommitPort {
  append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent>;
}

export interface RuntimeActivityHelper {
  tool(request: RuntimeToolActivityRequest): Promise<RuntimeActivityObservation>;
  memory(request: RuntimeMemoryActivityRequest): Promise<RuntimeActivityObservation>;
  model(request: RuntimeModelActivityRequest): Promise<RuntimeActivityObservation>;
  execution(request: RuntimeExecutionActivityRequest): Promise<RuntimeActivityObservation>;
  custom(request: RuntimeCustomActivityRequest): Promise<RuntimeActivityObservation>;
}
