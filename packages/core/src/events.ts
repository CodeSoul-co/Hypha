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
  | 'message.enqueued'
  | 'message.delivered'
  | 'message.acknowledged'
  | 'message.failed'
  | 'message.dead_lettered'
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

export interface EventFilter {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  type?: FrameworkEventType;
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
      return true;
    });
  }
}
