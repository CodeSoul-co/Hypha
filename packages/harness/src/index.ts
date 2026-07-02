import {
  createFrameworkEvent,
  InMemoryEventStore,
  type EventFilter,
  type FrameworkEvent,
  type TraceRecorder,
} from '@hypha/core';
import type { FSMSnapshot } from '@hypha/fsm';

export * from './runtime';

export interface RunRecord<TInput = unknown, TOutput = unknown> {
  id: string;
  sessionId?: string;
  userId?: string;
  agentSystemId: string;
  status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
  input: TInput;
  output?: TOutput;
  fsmSnapshot?: FSMSnapshot;
  createdAt: string;
  completedAt?: string;
}

export interface SessionView {
  id: string;
  userId: string;
  runIds: string[];
  status: 'active' | 'closed';
  updatedAt: string;
}

export interface ReplayFixture {
  id: string;
  version: string;
  runId: string;
  statePath: string[];
  events: FrameworkEvent[];
  memoryReadSet?: unknown[];
  policyDecisions?: unknown[];
}

export interface RegressionCase {
  id: string;
  fixture: ReplayFixture;
  expectedEventTypes?: string[];
  expectedStatePath?: string[];
}

export class InMemoryTraceRecorder implements TraceRecorder {
  private readonly store = new InMemoryEventStore();

  async record(event: FrameworkEvent): Promise<void> {
    await this.store.record(event);
  }

  async list(filter?: EventFilter): Promise<FrameworkEvent[]> {
    return this.store.list(filter);
  }
}

export class SessionProjector {
  project(events: FrameworkEvent[]): SessionView[] {
    const sessions = new Map<string, SessionView>();
    for (const event of events) {
      if (!event.sessionId) continue;
      const payloadUserId = getStringField(event.payload, 'userId');
      const metadataUserId = getStringField(event.metadata, 'userId');
      const existing = sessions.get(event.sessionId) ?? {
        id: event.sessionId,
        userId: metadataUserId ?? payloadUserId ?? 'owner',
        runIds: [],
        status: 'active' as const,
        updatedAt: event.timestamp,
      };
      if (!existing.runIds.includes(event.runId)) {
        existing.runIds.push(event.runId);
      }
      existing.updatedAt = event.timestamp;
      if (event.type === 'session.closed') {
        existing.status = 'closed';
      }
      sessions.set(event.sessionId, existing);
    }
    return Array.from(sessions.values());
  }
}

function getStringField(value: unknown, key: string): string | null {
  if (!value || typeof value !== 'object') return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === 'string' ? field : null;
}

export interface QueueTask<T = unknown> {
  id: string;
  userId: string;
  sessionId: string;
  payload: T;
}

export class UserScopedSessionQueue<T = unknown> {
  private readonly queues = new Map<string, QueueTask<T>[]>();

  enqueue(task: QueueTask<T>): number {
    const key = this.key(task.userId, task.sessionId);
    const queue = this.queues.get(key) ?? [];
    queue.push(task);
    this.queues.set(key, queue);
    return queue.length;
  }

  dequeue(userId: string, sessionId: string): QueueTask<T> | null {
    const key = this.key(userId, sessionId);
    const queue = this.queues.get(key) ?? [];
    const task = queue.shift() ?? null;
    if (queue.length === 0) {
      this.queues.delete(key);
    } else {
      this.queues.set(key, queue);
    }
    return task;
  }

  size(userId: string, sessionId: string): number {
    return this.queues.get(this.key(userId, sessionId))?.length ?? 0;
  }

  private key(userId: string, sessionId: string): string {
    return `${userId}:${sessionId}`;
  }
}

export function createRunStartedEvent(run: RunRecord): FrameworkEvent {
  return createFrameworkEvent({
    id: `${run.id}:started`,
    type: 'run.started',
    runId: run.id,
    sessionId: run.sessionId,
    payload: { run },
    metadata: { userId: run.userId },
  });
}
