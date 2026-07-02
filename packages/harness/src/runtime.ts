import {
  createFrameworkEvent,
  FrameworkError,
  InMemoryEventStore,
  type EventStore,
  type FrameworkEvent,
  type SpecRef,
} from '@hypha/core';

export interface RuntimeSession {
  id: string;
  userId: string;
  domainPackRef?: SpecRef;
  sessionProfileRef?: SpecRef;
  metadata: Record<string, unknown>;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeRun {
  id: string;
  sessionId: string;
  userId: string;
  domainPackRef?: SpecRef;
  workflowRef?: SpecRef;
  agentRef?: SpecRef;
  status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  input?: unknown;
  output?: unknown;
}

export interface CreateSessionInput {
  id: string;
  userId: string;
  domainPackRef?: SpecRef;
  sessionProfileRef?: SpecRef;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}

export interface CreateRunInput {
  id: string;
  sessionId: string;
  userId: string;
  domainPackRef?: SpecRef;
  workflowRef?: SpecRef;
  agentRef?: SpecRef;
  input?: unknown;
  timestamp?: string;
}

export interface AppendRunEventInput<TPayload = unknown> {
  id: string;
  type: FrameworkEvent['type'];
  runId: string;
  sessionId: string;
  userId: string;
  payload: TPayload;
  stepId?: string;
  fsmState?: string;
  agentId?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface ReplayProjection {
  runId: string;
  events: FrameworkEvent[];
  statePath: string[];
  toolCallEventIds: string[];
  policyDecisionEventIds: string[];
  memoryEventIds: string[];
}

export interface AuditProjection {
  runId: string;
  eventCount: number;
  policyDecisionCount: number;
  memoryWriteCount: number;
  toolCallCount: number;
  missingRunIds: string[];
}

export interface RegressionProjection {
  runId: string;
  eventTypes: string[];
  statePath: string[];
}

export class EventFirstRuntime {
  constructor(private readonly events: EventStore = new InMemoryEventStore()) {}

  async createSession(input: CreateSessionInput): Promise<RuntimeSession> {
    const timestamp = input.timestamp ?? new Date().toISOString();
    const session: RuntimeSession = {
      id: input.id,
      userId: input.userId,
      domainPackRef: input.domainPackRef,
      sessionProfileRef: input.sessionProfileRef,
      metadata: input.metadata ?? {},
      status: 'active',
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await this.events.append(
      createFrameworkEvent({
        id: `${input.userId}:${input.id}:created`,
        type: 'session.created',
        runId: 'session-bootstrap',
        sessionId: input.id,
        timestamp,
        payload: session,
        metadata: { userId: input.userId },
      })
    );
    return session;
  }

  async createRun(input: CreateRunInput): Promise<RuntimeRun> {
    const timestamp = input.timestamp ?? new Date().toISOString();
    const run: RuntimeRun = {
      id: input.id,
      sessionId: input.sessionId,
      userId: input.userId,
      domainPackRef: input.domainPackRef,
      workflowRef: input.workflowRef,
      agentRef: input.agentRef,
      status: 'queued',
      createdAt: timestamp,
      updatedAt: timestamp,
      input: input.input,
    };
    await this.events.append(
      createFrameworkEvent({
        id: `${input.id}:created`,
        type: 'run.created',
        runId: input.id,
        sessionId: input.sessionId,
        timestamp,
        payload: run,
        metadata: { userId: input.userId },
      })
    );
    return run;
  }

  async appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent> {
    if (!input.runId || !input.sessionId) {
      throw new FrameworkError({
        code: 'EVENT_REQUIRES_RUN_AND_SESSION',
        message: 'Run events must include runId and sessionId',
      });
    }
    const event = createFrameworkEvent({
      id: input.id,
      type: input.type,
      runId: input.runId,
      sessionId: input.sessionId,
      stepId: input.stepId,
      agentId: input.agentId,
      fsmState: input.fsmState,
      timestamp: input.timestamp,
      payload: input.payload,
      metadata: { ...input.metadata, userId: input.userId },
    });
    await this.events.append(event);
    return event;
  }

  async projectSession(sessionId: string): Promise<RuntimeSession | null> {
    const events = await this.events.list({ sessionId });
    return projectSession(events);
  }

  async projectRun(runId: string): Promise<RuntimeRun | null> {
    const events = await this.events.list({ runId });
    return projectRun(events);
  }

  async projectReplay(runId: string): Promise<ReplayProjection> {
    return projectReplay(await this.events.list({ runId }));
  }

  async projectAudit(runId: string): Promise<AuditProjection> {
    return projectAudit(await this.events.list({ runId }));
  }

  async projectRegression(runId: string): Promise<RegressionProjection> {
    const replay = await this.projectReplay(runId);
    return {
      runId,
      eventTypes: replay.events.map((event) => event.type),
      statePath: replay.statePath,
    };
  }

  async listEvents(runId: string): Promise<FrameworkEvent[]> {
    return this.events.list({ runId });
  }
}

export function projectSession(events: FrameworkEvent[]): RuntimeSession | null {
  const created = events.find((event) => event.type === 'session.created');
  if (!created) return null;
  const session = created.payload as RuntimeSession;
  const closed = events.find((event) => event.type === 'session.closed');
  const last = events[events.length - 1] ?? created;
  return {
    ...session,
    status: closed ? 'closed' : session.status,
    updatedAt: last.timestamp,
  };
}

export function projectRun(events: FrameworkEvent[]): RuntimeRun | null {
  const created = events.find((event) => event.type === 'run.created');
  if (!created) return null;
  const run = created.payload as RuntimeRun;
  const last = events[events.length - 1] ?? created;
  const terminal = [...events]
    .reverse()
    .find((event) =>
      ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type)
    );
  return {
    ...run,
    status: terminal ? statusFromRunEvent(terminal.type) : statusFromEvents(events, run.status),
    updatedAt: last.timestamp,
    completedAt: terminal?.timestamp,
    output: terminal ? (terminal.payload as Record<string, unknown>).output : run.output,
  };
}

export function projectReplay(events: FrameworkEvent[]): ReplayProjection {
  const runId = events.find((event) => event.runId)?.runId ?? '';
  return {
    runId,
    events,
    statePath: events
      .filter((event) => event.type === 'fsm.state.entered')
      .map((event) => String((event.payload as Record<string, unknown>).stateId)),
    toolCallEventIds: events
      .filter((event) => event.type.startsWith('tool.'))
      .map((event) => event.id),
    policyDecisionEventIds: events
      .filter((event) => event.type === 'tool.policy.checked')
      .map((event) => event.id),
    memoryEventIds: events
      .filter((event) => event.type.startsWith('memory.'))
      .map((event) => event.id),
  };
}

export function projectAudit(events: FrameworkEvent[]): AuditProjection {
  const runId = events.find((event) => event.runId)?.runId ?? '';
  return {
    runId,
    eventCount: events.length,
    policyDecisionCount: events.filter((event) => event.type.includes('policy')).length,
    memoryWriteCount: events.filter((event) => event.type === 'memory.write.committed').length,
    toolCallCount: events.filter((event) => event.type === 'tool.call.completed').length,
    missingRunIds: events.filter((event) => !event.runId).map((event) => event.id),
  };
}

function statusFromEvents(
  events: FrameworkEvent[],
  fallback: RuntimeRun['status']
): RuntimeRun['status'] {
  if (events.some((event) => event.type === 'run.started')) return 'running';
  return fallback;
}

function statusFromRunEvent(type: FrameworkEvent['type']): RuntimeRun['status'] {
  if (type === 'run.failed') return 'failed';
  if (type === 'run.cancelled') return 'cancelled';
  return 'completed';
}
