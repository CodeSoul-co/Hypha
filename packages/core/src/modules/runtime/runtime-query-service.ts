import type {
  RuntimeQueryRequest,
  RuntimeQueryServiceContract,
  RuntimeRunView,
  RuntimeStateExplanation,
  RuntimeTimelineRequest,
  RuntimeTimelineResult,
} from '../../contracts/runtime-query';
import {
  validateRuntimeQueryRequest,
  validateRuntimeRunView,
  validateRuntimeStateExplanation,
  validateRuntimeTimelineRequest,
} from '../../contracts/runtime-query-schemas';
import type {
  RuntimeOrchestrationProjection,
  RuntimePendingWaitProjection,
} from '../../contracts/runtime-projection';
import { FrameworkError } from '../../errors';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';

export interface RuntimeQueryServiceOptions {
  events: Pick<EventRuntime, 'read' | 'getStreamHead'>;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  now?: () => string;
}

export class RuntimeQueryService implements RuntimeQueryServiceContract {
  private readonly now: () => string;

  constructor(private readonly options: RuntimeQueryServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async getRun(input: RuntimeQueryRequest): Promise<RuntimeRunView | null> {
    const request = validateRuntimeQueryRequest(input);
    const scope = streamScope(request);
    if (!(await this.options.events.getStreamHead(scope))) return null;
    const projection = await this.options.projections.update(
      createRuntimeOrchestrationProjectionDefinition(request.scope.runId),
      this.options.projectionStore,
      scope
    );
    const head = await this.options.events.getStreamHead(scope);
    if (!head || projection.lastSequence > head.lastSequence) {
      projectionFailed('Runtime Projection is ahead of its Event stream', request);
    }
    if (projection.state.runStatus === 'not_created') {
      corrupt('Runtime Event stream has no run.created fact', request);
    }
    return validateRuntimeRunView({
      scope: request.scope,
      projectionVersion: projection.projectionVersion,
      projection: projection.state,
      projectionLastSequence: projection.lastSequence,
      eventHeadSequence: head.lastSequence,
      projectionLag: head.lastSequence - projection.lastSequence,
      refreshedAt: this.timestamp(),
    });
  }

  async getFSM(input: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null> {
    const view = await this.getRun(input);
    return view ? structuredClone(view.projection) : null;
  }

  async getTimeline(input: RuntimeTimelineRequest): Promise<RuntimeTimelineResult> {
    const request = validateRuntimeTimelineRequest(input);
    const scope = streamScope(request);
    const head = await this.options.events.getStreamHead(scope);
    const events = await this.options.events.read({
      scope,
      ...(request.fromSequence === undefined ? {} : { fromSequence: request.fromSequence }),
      ...(request.toSequence === undefined && head === null
        ? {}
        : { toSequence: request.toSequence ?? head!.lastSequence }),
      ...(request.types === undefined ? {} : { types: request.types }),
    });
    const limited = events.slice(0, request.limit ?? 1_000);
    return {
      scope: structuredClone(request.scope),
      events: structuredClone(limited),
      eventCount: limited.length,
      eventHeadSequence: head?.lastSequence ?? 0,
      refreshedAt: this.timestamp(),
    };
  }

  async getPendingWaits(input: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]> {
    const projection = await this.getFSM(input);
    return projection?.pendingWait ? [structuredClone(projection.pendingWait)] : [];
  }

  async explainState(input: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null> {
    const request = validateRuntimeQueryRequest(input);
    const view = await this.getRun(request);
    if (!view) return null;
    return validateRuntimeStateExplanation({
      scope: request.scope,
      runStatus: view.projection.runStatus,
      ...(view.projection.currentState === undefined
        ? {}
        : { currentState: view.projection.currentState }),
      stateAttempt: view.projection.stateAttempt,
      statePath: view.projection.statePath,
      ...(view.projection.pendingWait === undefined
        ? {}
        : { pendingWaitId: view.projection.pendingWait.waitId }),
      ...(view.projection.pendingTransition === undefined
        ? {}
        : { pendingTransitionEventId: view.projection.pendingTransition.eventId }),
      pendingActivityIds: view.projection.pendingActivityIds,
      lastEventSequence: view.projectionLastSequence,
      source: 'runtime.orchestration.projection',
    });
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value)))
      invalid('Runtime Query clock must be a valid date-time');
    return value;
  }
}

function streamScope(request: RuntimeQueryRequest): EventStreamScope {
  return {
    ...(request.scope.tenantId === undefined ? {} : { tenantId: request.scope.tenantId }),
    userId: request.scope.userId,
    runId: request.scope.runId,
  };
}

function corrupt(message: string, request: RuntimeQueryRequest): never {
  throw new FrameworkError({
    code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    message,
    context: { runId: request.scope.runId },
  });
}

function projectionFailed(message: string, request: RuntimeQueryRequest): never {
  throw new FrameworkError({
    code: 'RUNTIME_PROJECTION_FAILED',
    message,
    context: { runId: request.scope.runId },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
