export type RuntimeObservationEventType = `runtime.observation.${string}`;

export type RuntimeActivityEventType =
  | 'runtime.activity.requested'
  | 'runtime.activity.completed'
  | 'runtime.activity.failed'
  | 'runtime.activity.waiting'
  | 'runtime.activity.cancelled';

export type FrameworkEventType =
  | 'session.created'
  | 'session.updated'
  | 'session.closed'
  | 'run.created'
  | 'run.started'
  | 'run.resume.requested'
  | 'run.resumed'
  | 'run.cancel.requested'
  | 'run.cancelling'
  | 'run.waiting_human'
  | 'run.waiting_signal'
  | 'run.waiting_timer'
  | 'run.paused'
  | 'run.completed'
  | 'run.failed'
  | 'run.cancelled'
  | 'runtime.wait.created'
  | 'runtime.wait.resolved'
  | 'runtime.signal.received'
  | 'runtime.timer.created'
  | 'runtime.timer.fired'
  | 'runtime.checkpoint.created'
  | 'runtime.checkpoint.failed'
  | 'runtime.cancellation.propagated'
  | 'runtime.cancellation.failed'
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
  | 'memory.extraction.requested'
  | 'memory.extraction.queued'
  | 'memory.extraction.started'
  | 'memory.extraction.candidate.extracted'
  | 'memory.extraction.candidate.rejected'
  | 'memory.extraction.awaiting_review'
  | 'memory.extraction.completed'
  | 'memory.extraction.failed'
  | 'memory.extraction.cancelled'
  | 'memory.extraction.cursor.advanced'
  | 'memory.maintenance.lookup.started'
  | 'memory.maintenance.lookup.completed'
  | 'memory.maintenance.decision.planned'
  | 'memory.maintenance.decision.applied'
  | 'memory.maintenance.decision.conflict'
  | 'memory.maintenance.review.requested'
  | 'memory.retrieval.candidates.generated'
  | 'memory.retrieval.ranking.completed'
  | 'memory.retrieval.rerank.failed'
  | 'memory.activity.requested'
  | 'memory.activity.completed'
  | 'memory.activity.failed'
  | 'memory.activity.cancelled'
  | 'memory.search.requested'
  | 'memory.search.completed'
  | 'memory.search.failed'
  | 'memory.write.reused'
  | 'memory.write.failed'
  | 'memory.update.requested'
  | 'memory.update.committed'
  | 'memory.update.conflict'
  | 'memory.update.failed'
  | 'memory.delete.requested'
  | 'memory.delete.partial'
  | 'memory.delete.completed'
  | 'memory.delete.failed'
  | 'memory.index.requested'
  | 'memory.index.started'
  | 'memory.index.completed'
  | 'memory.index.partial'
  | 'memory.index.failed'
  | 'memory.consolidation.started'
  | 'memory.consolidation.completed'
  | 'memory.consolidation.failed'
  | 'memory.decay.evaluated'
  | 'memory.reinforced'
  | 'memory.superseded'
  | 'memory.invalidated'
  | 'memory.retention.expired'
  | 'memory.context.build.requested'
  | 'memory.context.source.collected'
  | 'memory.context.item.filtered'
  | 'memory.context.item.ranked'
  | 'memory.context.item.truncated'
  | 'memory.context.item.compacted'
  | 'memory.context.provenance.attached'
  | 'memory.context.build.completed'
  | 'memory.context.build.failed'
  | 'context.source.loaded'
  | 'context.item.selected'
  | 'context.item.rejected'
  | 'context.build.failed'
  | 'memory.worker.started'
  | 'memory.worker.stopped'
  | 'memory.worker.failed'
  | 'memory.worker.dead_lettered'
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
  | 'artifact.versioned'
  | RuntimeObservationEventType
  | RuntimeActivityEventType;

export interface FrameworkEvent<TPayload = unknown> {
  id: string;
  type: FrameworkEventType;
  version?: string;
  tenantId?: string;
  userId?: string;
  workspaceId?: string;
  sessionId?: string;
  runId: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  branchId?: string;
  sequence?: number;
  globalSequence?: number;
  correlationId?: string;
  causationId?: string;
  parentEventId?: string;
  idempotencyKey?: string;
  operationId?: string;
  timestamp: string;
  recordedAt?: string;
  payload: TPayload;
  payloadHash?: string;
  metadata?: Record<string, unknown>;
}

export interface EventCreateInput<TPayload = unknown> {
  id: string;
  type: FrameworkEventType;
  version?: string;
  tenantId?: string;
  userId?: string;
  runId: string;
  payload: TPayload;
  workspaceId?: string;
  sessionId?: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  branchId?: string;
  correlationId?: string;
  causationId?: string;
  parentEventId?: string;
  idempotencyKey?: string;
  operationId?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface PersistedFrameworkEvent<TPayload = unknown> extends FrameworkEvent<TPayload> {
  version: string;
  userId: string;
  sequence: number;
  globalSequence: number;
  recordedAt: string;
  payloadHash: string;
}

export interface EventStore {
  append(event: FrameworkEvent): Promise<void>;
  list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}

export interface EventFilter {
  tenantId?: string;
  userId?: string;
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
    ...(input.version === undefined ? {} : { version: input.version }),
    ...(input.tenantId === undefined ? {} : { tenantId: input.tenantId }),
    ...(input.userId === undefined ? {} : { userId: input.userId }),
    ...(input.workspaceId === undefined ? {} : { workspaceId: input.workspaceId }),
    ...(input.sessionId === undefined ? {} : { sessionId: input.sessionId }),
    runId: input.runId,
    ...(input.stepId === undefined ? {} : { stepId: input.stepId }),
    ...(input.agentId === undefined ? {} : { agentId: input.agentId }),
    ...(input.fsmState === undefined ? {} : { fsmState: input.fsmState }),
    ...(input.branchId === undefined ? {} : { branchId: input.branchId }),
    ...(input.correlationId === undefined ? {} : { correlationId: input.correlationId }),
    ...(input.causationId === undefined ? {} : { causationId: input.causationId }),
    ...(input.parentEventId === undefined ? {} : { parentEventId: input.parentEventId }),
    ...(input.idempotencyKey === undefined ? {} : { idempotencyKey: input.idempotencyKey }),
    ...(input.operationId === undefined ? {} : { operationId: input.operationId }),
    timestamp: input.timestamp ?? new Date().toISOString(),
    payload: input.payload,
    ...(input.metadata === undefined ? {} : { metadata: input.metadata }),
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
      if (filter.tenantId && event.tenantId !== filter.tenantId) return false;
      if (filter.userId && event.userId !== filter.userId) return false;
      if (filter.workspaceId && event.workspaceId !== filter.workspaceId) return false;
      if (filter.sessionId && event.sessionId !== filter.sessionId) return false;
      if (filter.runId && event.runId !== filter.runId) return false;
      if (filter.type && event.type !== filter.type) return false;
      return true;
    });
  }
}
