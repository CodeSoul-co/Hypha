import {
  createFrameworkEvent,
  InMemoryAppendOnlyEventStore,
  type AppendOnlyEventStore,
  type EventAppendResult,
  type FrameworkEvent,
  type FrameworkEventType,
} from '@hypha/core';
import {
  FSMRuntime,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';
import type {
  RuntimeActivityRequest,
  RuntimeActivityPort,
  RuntimeActivityResult,
  RuntimeScope,
} from './contracts';
import {
  RuntimeStateAttemptExecutor,
  type RuntimeStateAttemptExecutionResult,
} from './state-runtime';

export type RuntimeLoopMessageRole = 'user' | 'assistant' | 'tool_result' | 'system' | 'internal';

export interface RuntimeLoopMessage<TContent = unknown> {
  id: string;
  role: RuntimeLoopMessageRole;
  content: TContent;
  partial?: boolean;
  createdAt: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeModelMessage<TContent = unknown> {
  role: Exclude<RuntimeLoopMessageRole, 'internal'>;
  content: TContent;
  metadata?: Record<string, unknown>;
}

export interface RuntimeLoopContext {
  scope: RuntimeScope;
  messages: RuntimeLoopMessage[];
  steeringMessages: RuntimeLoopMessage[];
  followUpMessages: RuntimeLoopMessage[];
  turn: number;
  metadata?: Record<string, unknown>;
}

export interface RuntimeLoopContextTransformer {
  transform(context: RuntimeLoopContext): Promise<RuntimeLoopContext> | RuntimeLoopContext;
}

export interface RuntimeModelMessageConverter {
  convert(context: RuntimeLoopContext): Promise<RuntimeModelMessage[]> | RuntimeModelMessage[];
}

export type RuntimeLoopStreamChunkType =
  | 'message_start'
  | 'message_delta'
  | 'message_end'
  | 'activity_required'
  | 'activity_update';

export type RuntimeLoopFrameworkEventType =
  | 'runtime.loop.started'
  | 'runtime.loop.completed'
  | 'runtime.turn.started'
  | 'runtime.turn.completed'
  | 'runtime.steering.drained'
  | 'runtime.follow_up.drained'
  | 'runtime.context.transformed'
  | 'runtime.context.converted'
  | 'runtime.message.started'
  | 'runtime.message.updated'
  | 'runtime.message.completed'
  | 'runtime.activity.prepared'
  | 'runtime.activity.finalized';

export interface RuntimeLoopStreamChunk<TPayload = unknown> {
  type: RuntimeLoopStreamChunkType;
  message?: RuntimeLoopMessage;
  activity?: RuntimeActivityRequest;
  payload?: TPayload;
  emittedAt?: string;
}

export type RuntimeRenderEventType =
  | 'agent_start'
  | 'agent_end'
  | 'turn_start'
  | 'turn_end'
  | 'message_start'
  | 'message_update'
  | 'message_end'
  | 'activity_start'
  | 'activity_update'
  | 'activity_end';

export interface RuntimeRenderEvent<TPayload = unknown> {
  type: RuntimeRenderEventType;
  scope: RuntimeScope;
  payload: TPayload;
  stateVersion: number;
  sourceEventId: string;
  emittedAt: string;
}

export interface RuntimeLoopView {
  scope?: RuntimeScope;
  isRunning: boolean;
  currentTurn?: number;
  streamingMessage?: RuntimeLoopMessage;
  messages: RuntimeLoopMessage[];
  pendingActivityIds: string[];
  stateVersion: number;
}

export interface RuntimeLoopRunnerInput {
  context: RuntimeLoopContext;
  modelPort: RuntimeActivityPort<{ messages: RuntimeModelMessage[] }, unknown>;
}

export interface RuntimeLoopRunnerOptions {
  events?: AppendOnlyEventStore;
  stateAttemptExecutor?: RuntimeStateAttemptExecutor;
  transformer?: RuntimeLoopContextTransformer;
  converter?: RuntimeModelMessageConverter;
  now?: () => string;
}

export interface RuntimeLoopRunnerResult {
  context: RuntimeLoopContext;
  fsmSnapshot: FSMSnapshot;
  stateAttempt: RuntimeStateAttemptExecutionResult;
  eventAppends: EventAppendResult[];
  view: RuntimeLoopView;
  renderEvents: RuntimeRenderEvent[];
}

export const defaultRuntimeLoopFSMProcessSpec: FSMProcessSpec = {
  id: 'fsm.runtime.loop.default',
  version: '0.0.0',
  name: 'Default Runtime Loop FSM',
  description:
    'FSM-controlled loop for input, steering drain, context transform, model stream, activity lifecycle, follow-up drain, and completion.',
  initialState: 'Idle',
  states: [
    { id: 'Idle', kind: 'idle' },
    { id: 'InputAccepted', kind: 'run_initialized' },
    { id: 'SteeringDrain', kind: 'domain' },
    { id: 'ContextTransform', kind: 'context_built' },
    { id: 'ModelStreaming', kind: 'reasoning' },
    { id: 'ActivityPrepare', kind: 'policy_checked' },
    { id: 'ActivityExecute', kind: 'acting' },
    { id: 'ActivityFinalize', kind: 'observation_recorded' },
    { id: 'FollowUpDrain', kind: 'domain' },
    { id: 'Completed', kind: 'completed' },
    { id: 'Failed', kind: 'failed' },
    { id: 'Cancelled', kind: 'cancelled' },
  ],
  transitions: [
    { from: 'Idle', to: 'InputAccepted' },
    { from: 'InputAccepted', to: 'SteeringDrain' },
    { from: 'SteeringDrain', to: 'ContextTransform' },
    { from: 'ContextTransform', to: 'ModelStreaming' },
    { from: 'ModelStreaming', to: 'ActivityPrepare' },
    { from: 'ModelStreaming', to: 'FollowUpDrain' },
    { from: 'ActivityPrepare', to: 'ActivityExecute' },
    { from: 'ActivityExecute', to: 'ActivityFinalize' },
    { from: 'ActivityFinalize', to: 'SteeringDrain' },
    { from: 'ActivityFinalize', to: 'FollowUpDrain' },
    { from: 'FollowUpDrain', to: 'SteeringDrain' },
    { from: 'FollowUpDrain', to: 'Completed' },
    { from: 'Idle', to: 'Failed' },
    { from: 'InputAccepted', to: 'Failed' },
    { from: 'SteeringDrain', to: 'Failed' },
    { from: 'ContextTransform', to: 'Failed' },
    { from: 'ModelStreaming', to: 'Failed' },
    { from: 'ActivityPrepare', to: 'Failed' },
    { from: 'ActivityExecute', to: 'Failed' },
    { from: 'ActivityFinalize', to: 'Failed' },
    { from: 'FollowUpDrain', to: 'Failed' },
    { from: 'Idle', to: 'Cancelled' },
    { from: 'InputAccepted', to: 'Cancelled' },
    { from: 'SteeringDrain', to: 'Cancelled' },
    { from: 'ContextTransform', to: 'Cancelled' },
    { from: 'ModelStreaming', to: 'Cancelled' },
    { from: 'ActivityPrepare', to: 'Cancelled' },
    { from: 'ActivityExecute', to: 'Cancelled' },
    { from: 'ActivityFinalize', to: 'Cancelled' },
    { from: 'FollowUpDrain', to: 'Cancelled' },
  ],
  terminalStates: ['Completed', 'Failed', 'Cancelled'],
};

export class RuntimeLoopProjector {
  private view: RuntimeLoopView = {
    isRunning: false,
    messages: [],
    pendingActivityIds: [],
    stateVersion: 0,
  };

  project(events: FrameworkEvent[]): { view: RuntimeLoopView; renderEvents: RuntimeRenderEvent[] } {
    this.view = {
      isRunning: false,
      messages: [],
      pendingActivityIds: [],
      stateVersion: 0,
    };
    const renderEvents: RuntimeRenderEvent[] = [];
    for (const event of events) {
      const render = this.apply(event);
      if (render) renderEvents.push(render);
    }
    return { view: this.snapshot(), renderEvents };
  }

  apply(event: FrameworkEvent): RuntimeRenderEvent | null {
    const scope = scopeFromEvent(event);
    const eventType = event.type as string;
    this.view = {
      ...this.view,
      scope: scope ?? this.view.scope,
      stateVersion: this.view.stateVersion + 1,
    };

    switch (eventType) {
      case 'runtime.loop.started':
        this.view.isRunning = true;
        return this.render(event, 'agent_start', event.payload, scope);
      case 'runtime.loop.completed':
        this.view.isRunning = false;
        return this.render(event, 'agent_end', event.payload, scope);
      case 'runtime.turn.started':
        this.view.currentTurn = numberField(event.payload, 'turn') ?? this.view.currentTurn;
        return this.render(event, 'turn_start', event.payload, scope);
      case 'runtime.turn.completed':
        return this.render(event, 'turn_end', event.payload, scope);
      case 'runtime.message.started':
        this.view.streamingMessage = messageFromPayload(event.payload);
        return this.render(event, 'message_start', event.payload, scope);
      case 'runtime.message.updated':
        this.view.streamingMessage = messageFromPayload(event.payload);
        return this.render(event, 'message_update', event.payload, scope);
      case 'runtime.message.completed': {
        const message = messageFromPayload(event.payload);
        this.view.streamingMessage = undefined;
        this.view.messages = replaceOrAppendMessage(this.view.messages, message);
        return this.render(event, 'message_end', event.payload, scope);
      }
      case 'runtime.activity.prepared': {
        const activityId = stringField(event.payload, 'activityId');
        if (activityId && !this.view.pendingActivityIds.includes(activityId)) {
          this.view.pendingActivityIds = [...this.view.pendingActivityIds, activityId];
        }
        return this.render(event, 'activity_start', event.payload, scope);
      }
      case 'runtime.activity.finalized': {
        const activityId = stringField(event.payload, 'activityId');
        if (activityId) {
          this.view.pendingActivityIds = this.view.pendingActivityIds.filter((id) => id !== activityId);
        }
        return this.render(event, 'activity_end', event.payload, scope);
      }
      default:
        return null;
    }
  }

  snapshot(): RuntimeLoopView {
    return {
      ...this.view,
      messages: [...this.view.messages],
      pendingActivityIds: [...this.view.pendingActivityIds],
    };
  }

  private render(
    event: FrameworkEvent,
    type: RuntimeRenderEventType,
    payload: unknown,
    scope?: RuntimeScope
  ): RuntimeRenderEvent {
    return {
      type,
      scope: scope ?? this.view.scope ?? scopeFromEvent(event)!,
      payload,
      stateVersion: this.view.stateVersion,
      sourceEventId: event.id,
      emittedAt: event.timestamp,
    };
  }
}

export class RuntimeLoopRunner {
  private readonly events: AppendOnlyEventStore;
  private readonly stateAttemptExecutor: RuntimeStateAttemptExecutor;
  private readonly transformer: RuntimeLoopContextTransformer;
  private readonly converter: RuntimeModelMessageConverter;
  private readonly now: () => string;

  constructor(options: RuntimeLoopRunnerOptions = {}) {
    this.events = options.events ?? new InMemoryAppendOnlyEventStore();
    this.now = options.now ?? (() => new Date().toISOString());
    this.stateAttemptExecutor =
      options.stateAttemptExecutor ??
      new RuntimeStateAttemptExecutor({ events: this.events, now: this.now });
    this.transformer = options.transformer ?? { transform: defaultTransformRuntimeContext };
    this.converter = options.converter ?? { convert: defaultConvertRuntimeContextToModelMessages };
  }

  async run(input: RuntimeLoopRunnerInput): Promise<RuntimeLoopRunnerResult> {
    const eventAppends: EventAppendResult[] = [];
    const scope = input.context.scope;
    const fsm = createRuntimeLoopFSM(scope, { now: this.now });
    await fsm.start({ phase: 'loop' });

    eventAppends.push(
      await this.appendLoopEvent('runtime.loop.started', scope, {
        turn: input.context.turn,
      })
    );
    await fsm.transition('InputAccepted');
    eventAppends.push(
      await this.appendLoopEvent('runtime.turn.started', scope, {
        turn: input.context.turn,
      })
    );

    await fsm.transition('SteeringDrain');
    const withSteering = drainLoopMessages(input.context, 'steering');
    eventAppends.push(
      await this.appendLoopEvent('runtime.steering.drained', scope, {
        turn: withSteering.turn,
        drained: input.context.steeringMessages.length,
      })
    );

    await fsm.transition('ContextTransform');
    const transformed = await this.transformer.transform(withSteering);
    eventAppends.push(
      await this.appendLoopEvent('runtime.context.transformed', scope, {
        turn: transformed.turn,
        messageCount: transformed.messages.length,
      })
    );

    const modelMessages = await this.converter.convert(transformed);
    eventAppends.push(
      await this.appendLoopEvent('runtime.context.converted', scope, {
        turn: transformed.turn,
        modelMessageCount: modelMessages.length,
      })
    );

    await fsm.transition('ModelStreaming');
    const stateAttempt = await this.stateAttemptExecutor.execute(
      {
        scope,
        fsmProcessId: defaultRuntimeLoopFSMProcessSpec.id,
        stateId: 'ModelStreaming',
        attempt: 1,
        activityType: 'model',
        operationId: 'stream',
        input: { messages: modelMessages },
        idempotencyKey: `${scope.runId}:ModelStreaming:1`,
      },
      input.modelPort
    );
    eventAppends.push(...stateAttempt.eventAppends);

    await fsm.transition('FollowUpDrain');
    const completedContext = drainLoopMessages(transformed, 'follow_up');
    eventAppends.push(
      await this.appendLoopEvent('runtime.follow_up.drained', scope, {
        turn: completedContext.turn,
        drained: transformed.followUpMessages.length,
      })
    );
    await fsm.transition('Completed');
    eventAppends.push(
      await this.appendLoopEvent('runtime.turn.completed', scope, {
        turn: completedContext.turn,
        status: stateAttempt.status,
      })
    );
    eventAppends.push(
      await this.appendLoopEvent('runtime.loop.completed', scope, {
        turn: completedContext.turn,
        status: stateAttempt.status,
      })
    );

    const projector = new RuntimeLoopProjector();
    const projected = projector.project(await this.events.list({ streamId: scope.runId }));
    return {
      context: completedContext,
      fsmSnapshot: fsm.getSnapshot(),
      stateAttempt,
      eventAppends,
      view: projected.view,
      renderEvents: projected.renderEvents,
    };
  }

  private async appendLoopEvent(
    type: RuntimeLoopFrameworkEventType,
    scope: RuntimeScope,
    payload: Record<string, unknown>
  ): Promise<EventAppendResult> {
    const event = createRuntimeLoopEvent({
      id: `${scope.runId}:${type}:${payload.turn ?? 'loop'}`,
      type,
      scope,
      payload,
      timestamp: this.now(),
      idempotencyKey: `${scope.runId}:${type}:${payload.turn ?? 'loop'}`,
    });
    return this.events.appendToStream(event, {
      streamId: scope.runId,
      idempotencyKey: event.idempotencyKey ?? event.id,
    });
  }
}

export function createRuntimeLoopFSM(
  scope: Pick<RuntimeScope, 'runId'>,
  options: ConstructorParameters<typeof FSMRuntime>[2] = {}
): FSMRuntime {
  return new FSMRuntime(defaultRuntimeLoopFSMProcessSpec, scope.runId, options);
}

export function createRuntimeLoopEvent<TPayload = unknown>(input: {
  id: string;
  type: RuntimeLoopFrameworkEventType;
  scope: RuntimeScope;
  payload: TPayload;
  timestamp?: string;
  streamId?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}): FrameworkEvent<TPayload> {
  return createFrameworkEvent({
    id: input.id,
    type: input.type as FrameworkEventType,
    runId: input.scope.runId,
    sessionId: input.scope.sessionId,
    workspaceId: input.scope.workspaceId,
    agentId: input.scope.agentId,
    streamId: input.streamId ?? input.scope.runId,
    idempotencyKey: input.idempotencyKey,
    correlationId: input.correlationId,
    causationId: input.causationId,
    timestamp: input.timestamp,
    payload: input.payload,
    metadata: {
      ...input.metadata,
      tenantId: input.scope.tenantId,
      userId: input.scope.userId,
    },
  });
}

export function createRuntimeMessageEvent(input: {
  id: string;
  type: Extract<
    RuntimeLoopFrameworkEventType,
    'runtime.message.started' | 'runtime.message.updated' | 'runtime.message.completed'
  >;
  scope: RuntimeScope;
  message: RuntimeLoopMessage;
  timestamp?: string;
  correlationId?: string;
  causationId?: string;
}): FrameworkEvent {
  return createRuntimeLoopEvent({
    id: input.id,
    type: input.type,
    scope: input.scope,
    payload: { message: input.message, messageId: input.message.id },
    timestamp: input.timestamp,
    idempotencyKey: `${input.message.id}:${input.type}`,
    correlationId: input.correlationId,
    causationId: input.causationId,
  });
}

export function createRuntimeActivityLifecycleEvents(input: {
  scope: RuntimeScope;
  request: RuntimeActivityRequest;
  result?: RuntimeActivityResult;
  timestamp?: string;
}): FrameworkEvent[] {
  const prepared = createRuntimeLoopEvent({
    id: `${input.request.activityId}:runtime.activity.prepared`,
    type: 'runtime.activity.prepared',
    scope: input.scope,
    payload: {
      activityId: input.request.activityId,
      activityType: input.request.activityType,
      stateAttemptId: input.request.stateAttemptId,
      operationId: input.request.operationId,
      fencingToken: input.request.fencingToken,
    },
    timestamp: input.timestamp,
    idempotencyKey: `${input.request.idempotencyKey ?? input.request.activityId}:prepared`,
    correlationId: input.request.correlationId,
    causationId: input.request.causationId,
  });
  if (!input.result) return [prepared];
  return [
    prepared,
    createRuntimeLoopEvent({
      id: `${input.request.activityId}:runtime.activity.finalized`,
      type: 'runtime.activity.finalized',
      scope: input.scope,
      payload: {
        activityId: input.request.activityId,
        status: input.result.status,
        eventIds: input.result.eventIds,
        retryable: input.result.retryable,
        error: input.result.error,
      },
      timestamp: input.timestamp,
      idempotencyKey: `${input.request.idempotencyKey ?? input.request.activityId}:finalized`,
      correlationId: input.request.correlationId,
      causationId: prepared.id,
    }),
  ];
}

export function defaultTransformRuntimeContext(context: RuntimeLoopContext): RuntimeLoopContext {
  return {
    ...context,
    messages: context.messages.filter((message) => message.role !== 'internal'),
  };
}

export function defaultConvertRuntimeContextToModelMessages(
  context: RuntimeLoopContext
): RuntimeModelMessage[] {
  return context.messages
    .filter((message) => message.role !== 'internal')
    .map((message) => ({
      role: message.role as RuntimeModelMessage['role'],
      content: message.content,
      metadata: message.metadata,
    }));
}

export function applyPartialRuntimeMessage(
  messages: RuntimeLoopMessage[],
  partial: RuntimeLoopMessage
): RuntimeLoopMessage[] {
  if (messages.length === 0) return [partial];
  const last = messages[messages.length - 1];
  if (last.id !== partial.id) return [...messages, partial];
  return [...messages.slice(0, -1), partial];
}

export function drainLoopMessages(
  context: RuntimeLoopContext,
  queue: 'steering' | 'follow_up'
): RuntimeLoopContext {
  if (queue === 'steering') {
    return {
      ...context,
      messages: [...context.messages, ...context.steeringMessages],
      steeringMessages: [],
    };
  }
  return {
    ...context,
    messages: [...context.messages, ...context.followUpMessages],
    followUpMessages: [],
  };
}

function scopeFromEvent(event: FrameworkEvent): RuntimeScope | undefined {
  const userId = stringField(event.metadata, 'userId');
  if (!userId || !event.sessionId) return undefined;
  return {
    tenantId: stringField(event.metadata, 'tenantId') ?? undefined,
    userId,
    workspaceId: event.workspaceId,
    sessionId: event.sessionId,
    runId: event.runId,
    agentId: event.agentId,
  };
}

function messageFromPayload(payload: unknown): RuntimeLoopMessage | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const message = (payload as Record<string, unknown>).message;
  return message && typeof message === 'object' ? (message as RuntimeLoopMessage) : undefined;
}

function replaceOrAppendMessage(
  messages: RuntimeLoopMessage[],
  message: RuntimeLoopMessage | undefined
): RuntimeLoopMessage[] {
  if (!message) return messages;
  const index = messages.findIndex((candidate) => candidate.id === message.id);
  if (index < 0) return [...messages, message];
  return [...messages.slice(0, index), message, ...messages.slice(index + 1)];
}

function stringField(value: unknown, key: string): string | null {
  if (!value || typeof value !== 'object') return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === 'string' ? field : null;
}

function numberField(value: unknown, key: string): number | null {
  if (!value || typeof value !== 'object') return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === 'number' ? field : null;
}
