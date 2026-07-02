export type FrameworkEventType =
  | 'session.created'
  | 'session.updated'
  | 'session.closed'
  | 'run.created'
  | 'run.started'
  | 'run.completed'
  | 'run.failed'
  | 'run.cancelled'
  | 'fsm.transition.requested'
  | 'fsm.transition.accepted'
  | 'fsm.transition.rejected'
  | 'fsm.state.entered'
  | 'fsm.state.exited'
  | 'agent.reasoning.started'
  | 'agent.reasoning.completed'
  | 'agent.action.selected'
  | 'inference.requested'
  | 'inference.completed'
  | 'inference.failed'
  | 'model.call.started'
  | 'model.call.completed'
  | 'model.call.failed'
  | 'tool.call.requested'
  | 'tool.policy.checked'
  | 'tool.call.completed'
  | 'mcp.capability.discovered'
  | 'skill.selected'
  | 'skill.loaded'
  | 'memory.read.completed'
  | 'memory.write.requested'
  | 'memory.write.committed'
  | 'context.build.started'
  | 'context.build.completed'
  | 'human.review.requested'
  | 'human.review.resolved'
  | 'eval.completed'
  | 'replay.completed'
  | 'regression.completed'
  | 'artifact.created';

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
