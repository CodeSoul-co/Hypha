import { FrameworkError } from './errors';

export type FrameworkEventType =
  | 'session.created'
  | 'session.updated'
  | 'session.closed'
  | 'run.created'
  | 'run.started'
  | 'run.waiting_human'
  | 'run.completed'
  | 'run.failed'
  | 'run.cancelled'
  | 'runtime.loop.started'
  | 'runtime.loop.completed'
  | 'runtime.turn.started'
  | 'runtime.turn.completed'
  | 'runtime.command.enqueued'
  | 'runtime.command.applied'
  | 'runtime.command.rejected'
  | 'runtime.state_attempt.started'
  | 'runtime.state_attempt.waiting'
  | 'runtime.state_attempt.completed'
  | 'runtime.state_attempt.failed'
  | 'runtime.state_attempt.cancelled'
  | 'runtime.state_attempt.reconciled'
  | 'runtime.steering.drained'
  | 'runtime.follow_up.drained'
  | 'runtime.context.transformed'
  | 'runtime.context.converted'
  | 'runtime.message.started'
  | 'runtime.message.updated'
  | 'runtime.message.completed'
  | 'runtime.activity.prepared'
  | 'runtime.activity.finalized'
  | 'runtime.activity.reconciled'
  | 'fsm.transition.requested'
  | 'fsm.transition.accepted'
  | 'fsm.transition.rejected'
  | 'fsm.state.entered'
  | 'fsm.state.exited'
  | 'thinking.started'
  | 'thinking.completed'
  | 'agent.deliberation.started'
  | 'agent.deliberation.completed'
  | 'reasoning.decision.recorded'
  | 'agent.reasoning.started'
  | 'agent.reasoning.completed'
  | 'agent.action.selected'
  | 'react.step.completed'
  | 'inference.requested'
  | 'inference.completed'
  | 'inference.failed'
  | 'model.call.started'
  | 'model.call.completed'
  | 'model.call.failed'
  | 'llm.cache.lookup'
  | 'llm.cache.hit'
  | 'llm.cache.miss'
  | 'llm.cache.write'
  | 'llm.cache.bypass'
  | 'tool.call.requested'
  | 'tool.policy.checked'
  | 'tool.call.approved'
  | 'tool.call.rejected'
  | 'tool.call.started'
  | 'tool.call.completed'
  | 'tool.call.failed'
  | 'tool.call.timeout'
  | 'tool.call.retrying'
  | 'mcp.capability.discovered'
  | 'mcp.tool.normalized'
  | 'mcp.resource.normalized'
  | 'mcp.call.started'
  | 'mcp.call.completed'
  | 'mcp.call.failed'
  | 'skill.selected'
  | 'skill.loaded'
  | 'skill.executed'
  | 'skill.completed'
  | 'skill.failed'
  | 'workflow.stage.started'
  | 'workflow.stage.completed'
  | 'workflow.stage.failed'
  | 'workflow.condition.evaluated'
  | 'memory.read.requested'
  | 'memory.read.completed'
  | 'memory.read.failed'
  | 'memory.write.requested'
  | 'memory.write.validated'
  | 'memory.write.committed'
  | 'memory.write.rejected'
  | 'context.build.started'
  | 'context.build.completed'
  | 'context.compacted'
  | 'human.review.requested'
  | 'human.review.approved'
  | 'human.review.rejected'
  | 'human.review.resolved'
  | 'eval.started'
  | 'eval.completed'
  | 'eval.failed'
  | 'replay.started'
  | 'replay.completed'
  | 'replay.failed'
  | 'regression.started'
  | 'regression.completed'
  | 'regression.failed'
  | 'artifact.created'
  | 'artifact.updated'
  | 'artifact.versioned';

export interface FrameworkEvent<TPayload = unknown> {
  id: string;
  type: FrameworkEventType;
  streamId?: string;
  streamSequence?: number;
  globalSequence?: number;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  workspaceId?: string;
  sessionId?: string;
  runId: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  timestamp: string;
  payload: TPayload;
  metadata?: Record<string, unknown>;
}

export interface EventCreateInput<TPayload = unknown> {
  id: string;
  type: FrameworkEventType;
  runId: string;
  payload: TPayload;
  streamId?: string;
  streamSequence?: number;
  globalSequence?: number;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  workspaceId?: string;
  sessionId?: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface EventStore {
  append(event: FrameworkEvent): Promise<void>;
  list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}

export type EventAppendStatus = 'appended' | 'duplicate';

export interface EventAppendOptions {
  streamId?: string;
  expectedStreamSequence?: number;
  idempotencyKey?: string;
}

export interface EventAppendResult {
  status: EventAppendStatus;
  event: FrameworkEvent;
  streamId: string;
  streamSequence: number;
  globalSequence: number;
}

export interface AppendOnlyEventStore extends EventStore {
  appendToStream(event: FrameworkEvent, options?: EventAppendOptions): Promise<EventAppendResult>;
  getStream(streamId: string): Promise<FrameworkEvent[]>;
  getStreamRevision(streamId: string): Promise<number>;
}

export interface EventFilter {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  type?: FrameworkEventType;
  streamId?: string;
  correlationId?: string;
  causationId?: string;
  idempotencyKey?: string;
}

export interface TraceRecorder {
  record(event: FrameworkEvent): Promise<void>;
}

export function createFrameworkEvent<TPayload = unknown>(
  input: EventCreateInput<TPayload>
): FrameworkEvent<TPayload> {
  return {
    id: input.id,
    type: input.type,
    streamId: input.streamId,
    streamSequence: input.streamSequence,
    globalSequence: input.globalSequence,
    idempotencyKey: input.idempotencyKey,
    correlationId: input.correlationId,
    causationId: input.causationId,
    workspaceId: input.workspaceId,
    sessionId: input.sessionId,
    runId: input.runId,
    stepId: input.stepId,
    agentId: input.agentId,
    fsmState: input.fsmState,
    timestamp: input.timestamp ?? new Date().toISOString(),
    payload: input.payload,
    metadata: input.metadata,
  };
}

export class InMemoryEventStore implements EventStore, TraceRecorder {
  private readonly events: FrameworkEvent[] = [];

  async append(event: FrameworkEvent): Promise<void> {
    this.events.push(event);
  }

  async record(event: FrameworkEvent): Promise<void> {
    await this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    return this.events.filter((event) => {
      if (filter.workspaceId && event.workspaceId !== filter.workspaceId) return false;
      if (filter.sessionId && event.sessionId !== filter.sessionId) return false;
      if (filter.runId && event.runId !== filter.runId) return false;
      if (filter.type && event.type !== filter.type) return false;
      if (filter.streamId && event.streamId !== filter.streamId) return false;
      if (filter.correlationId && event.correlationId !== filter.correlationId) return false;
      if (filter.causationId && event.causationId !== filter.causationId) return false;
      if (filter.idempotencyKey && event.idempotencyKey !== filter.idempotencyKey) return false;
      return true;
    });
  }
}

export class InMemoryAppendOnlyEventStore implements AppendOnlyEventStore, TraceRecorder {
  private readonly events: FrameworkEvent[] = [];
  private readonly eventIds = new Map<string, FrameworkEvent>();
  private readonly idempotency = new Map<string, FrameworkEvent>();
  private readonly streamRevisions = new Map<string, number>();
  private globalSequence = 0;

  async append(event: FrameworkEvent): Promise<void> {
    await this.appendToStream(event);
  }

  async record(event: FrameworkEvent): Promise<void> {
    await this.append(event);
  }

  async appendToStream(
    event: FrameworkEvent,
    options: EventAppendOptions = {}
  ): Promise<EventAppendResult> {
    const streamId = options.streamId ?? event.streamId ?? defaultEventStreamId(event);
    const idempotencyKey = options.idempotencyKey ?? event.idempotencyKey;
    const dedupeKey = idempotencyKey ? `${streamId}:${idempotencyKey}` : undefined;
    if (dedupeKey) {
      const existing = this.idempotency.get(dedupeKey);
      if (existing) {
        return this.result('duplicate', existing);
      }
    }
    if (this.eventIds.has(event.id)) {
      throw new FrameworkError({
        code: 'EVENT_DUPLICATE_ID',
        message: `Event id already exists: ${event.id}`,
        context: { eventId: event.id, streamId },
      });
    }

    const currentRevision = this.streamRevisions.get(streamId) ?? 0;
    if (
      options.expectedStreamSequence !== undefined &&
      options.expectedStreamSequence !== currentRevision
    ) {
      throw new FrameworkError({
        code: 'EVENT_STREAM_REVISION_CONFLICT',
        message: `Event stream revision conflict for ${streamId}`,
        context: {
          streamId,
          expectedStreamSequence: options.expectedStreamSequence,
          actualStreamSequence: currentRevision,
        },
      });
    }

    const streamSequence = currentRevision + 1;
    this.globalSequence += 1;
    const stored: FrameworkEvent = {
      ...event,
      streamId,
      streamSequence,
      globalSequence: this.globalSequence,
      idempotencyKey,
    };
    this.events.push(stored);
    this.eventIds.set(stored.id, stored);
    if (dedupeKey) this.idempotency.set(dedupeKey, stored);
    this.streamRevisions.set(streamId, streamSequence);
    return this.result('appended', stored);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    return this.events.filter((event) => {
      if (filter.workspaceId && event.workspaceId !== filter.workspaceId) return false;
      if (filter.sessionId && event.sessionId !== filter.sessionId) return false;
      if (filter.runId && event.runId !== filter.runId) return false;
      if (filter.type && event.type !== filter.type) return false;
      if (filter.streamId && event.streamId !== filter.streamId) return false;
      if (filter.correlationId && event.correlationId !== filter.correlationId) return false;
      if (filter.causationId && event.causationId !== filter.causationId) return false;
      if (filter.idempotencyKey && event.idempotencyKey !== filter.idempotencyKey) return false;
      return true;
    });
  }

  async getStream(streamId: string): Promise<FrameworkEvent[]> {
    return this.list({ streamId });
  }

  async getStreamRevision(streamId: string): Promise<number> {
    return this.streamRevisions.get(streamId) ?? 0;
  }

  private result(status: EventAppendStatus, event: FrameworkEvent): EventAppendResult {
    return {
      status,
      event,
      streamId: event.streamId ?? defaultEventStreamId(event),
      streamSequence: event.streamSequence ?? 0,
      globalSequence: event.globalSequence ?? 0,
    };
  }
}

export function defaultEventStreamId(event: Pick<FrameworkEvent, 'runId' | 'sessionId'>): string {
  return event.runId || event.sessionId || 'runtime';
}
