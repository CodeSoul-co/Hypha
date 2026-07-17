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
  | 'recovery.case.opened'
  | 'recovery.strategy.selected'
  | 'recovery.attempt.started'
  | 'recovery.attempt.completed'
  | 'recovery.progress.detected'
  | 'recovery.case.resolved'
  | 'recovery.case.escalated'
  | 'recovery.knowledge.invalidated'
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
  | 'tool.authorization.checked'
  | 'tool.invocation.state.changed'
  | 'tool.policy.checked'
  | 'tool.call.approved'
  | 'tool.call.rejected'
  | 'tool.call.started'
  | 'tool.call.completed'
  | 'tool.call.failed'
  | 'tool.call.timeout'
  | 'tool.call.retrying'
  | 'tool.call.cancellation.requested'
  | 'tool.call.cancelled'
  | 'tool.call.late_result'
  | 'tool.output.validated'
  | 'tool.output.invalid'
  | 'tool.resolved'
  | 'tool.contract.snapshot.created'
  | 'tool.contract.snapshot.resolved'
  | 'tool.idempotency.reused'
  | 'tool.idempotency.conflict'
  | 'tool.external_receipt.reconciled'
  | 'tool.cache.lookup'
  | 'tool.cache.hit'
  | 'tool.cache.miss'
  | 'tool.cache.write'
  | 'tool.cache.bypass'
  | 'mcp.capability.discovered'
  | 'mcp.capability.trust.evaluated'
  | 'mcp.capability.drift.detected'
  | 'mcp.capability.quarantined'
  | 'mcp.catalog.updated'
  | 'mcp.server.state.changed'
  | 'mcp.connection.starting'
  | 'mcp.connection.initialized'
  | 'mcp.connection.ready'
  | 'mcp.connection.degraded'
  | 'mcp.connection.reconnecting'
  | 'mcp.connection.closed'
  | 'mcp.connection.failed'
  | 'mcp.capability.discovery.started'
  | 'mcp.capability.normalized'
  | 'mcp.capability.imported'
  | 'mcp.capability.removed'
  | 'mcp.capability.approved'
  | 'mcp.catalog.refreshed'
  | 'mcp.request.started'
  | 'mcp.request.cancelled'
  | 'mcp.request.completed'
  | 'mcp.request.failed'
  | 'mcp.tool.normalized'
  | 'mcp.resource.normalized'
  | 'mcp.call.started'
  | 'mcp.call.completed'
  | 'mcp.call.failed'
  | 'tool.target.resolved'
  | 'tool.preview.generated'
  | 'tool.progress.reported'
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
  | 'human.review.expired'
  | 'human.review.cancelled'
  | 'human.review.resume.started'
  | 'human.review.resume.revalidated'
  | 'human.review.resume.failed'
  | 'human.review.resolved'
  | 'message.enqueued'
  | 'message.delivered'
  | 'message.acknowledged'
  | 'message.failed'
  | 'message.retrying'
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
  | 'workspace.create.requested'
  | 'workspace.created'
  | 'workspace.ready'
  | 'workspace.busy'
  | 'workspace.path.resolved'
  | 'workspace.path.denied'
  | 'workspace.quota.exceeded'
  | 'workspace.snapshot.requested'
  | 'workspace.snapshot.created'
  | 'workspace.snapshot.failed'
  | 'workspace.restore.requested'
  | 'workspace.restored'
  | 'workspace.restore.failed'
  | 'workspace.patch.checked'
  | 'workspace.patch.applied'
  | 'workspace.patch.conflict'
  | 'workspace.cleanup.started'
  | 'workspace.cleanup.completed'
  | 'workspace.cleanup.failed'
  | 'sandbox.create.requested'
  | 'sandbox.created'
  | 'sandbox.started'
  | 'sandbox.ready'
  | 'sandbox.degraded'
  | 'sandbox.terminate.requested'
  | 'sandbox.terminated'
  | 'sandbox.cleanup.completed'
  | 'sandbox.cleanup.failed'
  | 'command.execution.requested'
  | 'command.execution.validated'
  | 'command.execution.approval.required'
  | 'command.execution.queued'
  | 'command.execution.started'
  | 'command.execution.output.truncated'
  | 'command.execution.resource.exceeded'
  | 'command.execution.oom_killed'
  | 'command.execution.timeout'
  | 'command.execution.cancellation.requested'
  | 'command.execution.cancelled'
  | 'command.execution.completed'
  | 'command.execution.failed'
  | 'command.execution.result.unknown'
  | 'command.execution.recovered'
  | 'network.authorization.requested'
  | 'network.authorization.granted'
  | 'network.authorization.denied'
  | 'network.authorization.revoked'
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
