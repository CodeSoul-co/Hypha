import type { EventCreateInput, FrameworkEvent, RuntimeActivityEventType } from '../../events';
import type {
  RuntimeActivityDispatchPort,
  RuntimeActivityEffect,
  RuntimeActivityHelper,
  RuntimeActivityInvocation,
  RuntimeActivityLifecycleCommitPort,
  RuntimeActivityLifecycleCommitRequest,
  RuntimeActivityObservation,
  RuntimeActivityRequest,
  RuntimeActivityType,
} from '../../contracts/runtime-activities';
import {
  validateRuntimeActivityInvocation,
  validateRuntimeActivityObservation,
  validateRuntimeActivityRequest,
} from '../../contracts/runtime-activity-schemas';
import type {
  RuntimeEventCommitPort,
  RuntimeHelperExecutionScope,
  RuntimeIdHelper,
} from '../../contracts/runtime-helpers';
import { validateRuntimeHelperExecutionScope } from '../../contracts/runtime-helper-schemas';
import { FrameworkError } from '../../errors';

const DEFAULT_ACTIVITY_EFFECTS: Record<RuntimeActivityType, RuntimeActivityEffect> = {
  tool: 'external_effect',
  memory: 'idempotent',
  model: 'idempotent',
  execution: 'external_effect',
  custom: 'external_effect',
};

export interface DefaultRuntimeActivityHelperOptions {
  execution: RuntimeHelperExecutionScope;
  ids: RuntimeIdHelper;
  clock: { now(): Promise<string> };
  dispatch: RuntimeActivityDispatchPort;
  lifecycle: RuntimeActivityLifecycleCommitPort;
  abortSignal: AbortSignal;
}

export class RuntimeEventActivityLifecycleCommitPort implements RuntimeActivityLifecycleCommitPort {
  constructor(private readonly events: RuntimeEventCommitPort) {}

  async append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent> {
    const [event] = await this.events.append({
      scope: request.execution,
      events: [request.event],
      fencingToken: request.fencingToken,
      idempotencyKey: request.idempotencyKey,
    });
    if (!event) internal('Activity lifecycle commit returned no event');
    return event;
  }
}

export class DefaultRuntimeActivityHelper implements RuntimeActivityHelper {
  private readonly executionScope: RuntimeHelperExecutionScope;

  constructor(private readonly options: DefaultRuntimeActivityHelperOptions) {
    this.executionScope = validateRuntimeHelperExecutionScope(options.execution);
  }

  tool(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation> {
    return this.invoke('tool', request);
  }

  memory(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation> {
    return this.invoke('memory', request);
  }

  model(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation> {
    return this.invoke('model', request);
  }

  execution(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation> {
    return this.invoke('execution', request);
  }

  custom(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation> {
    return this.invoke('custom', request);
  }

  private async invoke(
    activityType: RuntimeActivityType,
    input: RuntimeActivityRequest
  ): Promise<RuntimeActivityObservation> {
    this.assertNotAborted();
    const request = validateRuntimeActivityRequest(input);
    const activityId = await this.options.ids.next('activity');
    const operationId = await this.options.ids.next('operation');
    const requestedAt = await this.options.clock.now();
    const idempotencyKey = request.options?.idempotencyKey ?? `runtime-activity:${activityId}`;
    const invocation = validateRuntimeActivityInvocation({
      activityId,
      operationId,
      activityType,
      target: request.target,
      input: request.input,
      scope: this.executionScope.scope,
      stateId: this.executionScope.stateId,
      stateAttempt: this.executionScope.stateAttempt,
      fencingToken: this.executionScope.fencingToken,
      correlationId: this.executionScope.correlationId,
      ...((request.options?.causationId ?? this.executionScope.causationId)
        ? { causationId: request.options?.causationId ?? this.executionScope.causationId }
        : {}),
      idempotencyKey,
      requestedAt,
      effect: request.options?.effect ?? DEFAULT_ACTIVITY_EFFECTS[activityType],
      ...(request.options?.timeoutMs === undefined ? {} : { timeoutMs: request.options.timeoutMs }),
      ...(request.options?.retry === undefined ? {} : { retry: request.options.retry }),
      ...(request.options?.metadata === undefined ? {} : { metadata: request.options.metadata }),
    });

    const requestedEvent = this.lifecycleEvent(
      invocation,
      'runtime.activity.requested',
      requestedAt,
      { invocation }
    );
    await this.options.lifecycle.append({
      execution: this.executionScope,
      event: requestedEvent,
      fencingToken: this.executionScope.fencingToken,
      idempotencyKey: `${idempotencyKey}:event:requested`,
    });

    this.assertNotAborted();
    const observation = validateRuntimeActivityObservation(
      await this.options.dispatch.dispatch(structuredClone(invocation), this.options.abortSignal)
    );
    if (observation.activityId !== activityId) {
      invalid('Activity observation id does not match its invocation');
    }
    const observedAt = await this.options.clock.now();
    const eventType: RuntimeActivityEventType = `runtime.activity.${observation.status}`;
    await this.options.lifecycle.append({
      execution: this.executionScope,
      event: this.lifecycleEvent(invocation, eventType, observedAt, {
        activityId,
        observation,
      }),
      fencingToken: this.executionScope.fencingToken,
      idempotencyKey: `${idempotencyKey}:event:${observation.status}`,
    });
    return immutable(observation);
  }

  private lifecycleEvent(
    invocation: RuntimeActivityInvocation,
    type: RuntimeActivityEventType,
    timestamp: string,
    payload: Record<string, unknown>
  ): EventCreateInput {
    const scope = this.executionScope.scope;
    const suffix = type.slice('runtime.activity.'.length);
    return {
      id: `${invocation.activityId}:${suffix}`,
      type,
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      ...(scope.workspaceId === undefined ? {} : { workspaceId: scope.workspaceId }),
      sessionId: scope.sessionId,
      runId: scope.runId,
      stepId: `${this.executionScope.stateId}:${this.executionScope.stateAttempt}`,
      ...(scope.agentId === undefined ? {} : { agentId: scope.agentId }),
      fsmState: this.executionScope.stateId,
      correlationId: this.executionScope.correlationId,
      ...(type === 'runtime.activity.requested'
        ? invocation.causationId === undefined
          ? {}
          : { causationId: invocation.causationId }
        : { causationId: `${invocation.activityId}:requested` }),
      operationId: invocation.operationId,
      idempotencyKey: `${invocation.idempotencyKey}:event:${suffix}`,
      timestamp,
      payload,
      metadata: {
        activityType: invocation.activityType,
        stateAttempt: this.executionScope.stateAttempt,
        fencingToken: this.executionScope.fencingToken,
      },
    };
  }

  private assertNotAborted(): void {
    if (this.options.abortSignal.aborted) {
      throw new FrameworkError({
        code: 'RUNTIME_CANCELLED',
        message: 'Activity dispatch was cancelled before execution',
      });
    }
  }
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

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function internal(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INTERNAL_ERROR', message });
}
