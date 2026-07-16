import type { FrameworkEvent } from '@hypha/core';
import {
  RuntimeLoopProjector,
  type RuntimeLoopView,
  type RuntimeRenderEvent,
} from './loop-runtime';
import {
  projectRuntimeStateAttempts,
  projectWaitingRuntimeStateAttempts,
} from './state-runtime';
import type { RuntimeStateAttempt } from './contracts';

export interface ServerRuntimeEventSource {
  listEvents(runId: string): Promise<FrameworkEvent[]>;
}

export interface ServerRuntimeLoopProjection {
  runId: string;
  view: RuntimeLoopView;
  renderEvents: RuntimeRenderEvent[];
}

export interface ServerRuntimeStateAttemptProjection {
  runId: string;
  attempts: RuntimeStateAttempt[];
  waiting: RuntimeStateAttempt[];
}

export class ServerRuntimeAdapter {
  constructor(private readonly source: ServerRuntimeEventSource) {}

  async projectLoop(runId: string): Promise<ServerRuntimeLoopProjection> {
    const events = await this.source.listEvents(runId);
    const projected = new RuntimeLoopProjector().project(events);
    return {
      runId,
      view: projected.view,
      renderEvents: projected.renderEvents,
    };
  }

  async projectStateAttempts(runId: string): Promise<ServerRuntimeStateAttemptProjection> {
    const events = await this.source.listEvents(runId);
    return {
      runId,
      attempts: projectRuntimeStateAttempts(events),
      waiting: projectWaitingRuntimeStateAttempts(events),
    };
  }
}
