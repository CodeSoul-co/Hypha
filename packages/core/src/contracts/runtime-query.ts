import type { FrameworkEventType, PersistedFrameworkEvent } from '../events';
import type {
  RuntimeOrchestrationProjection,
  RuntimePendingWaitProjection,
} from './runtime-projection';
import type { RuntimeScope } from './runtime';

export interface RuntimeQueryRequest {
  scope: RuntimeScope;
}

export interface RuntimeTimelineRequest extends RuntimeQueryRequest {
  fromSequence?: number;
  toSequence?: number;
  types?: FrameworkEventType[];
  limit?: number;
}

export interface RuntimeTimelineResult {
  scope: RuntimeScope;
  events: PersistedFrameworkEvent[];
  eventCount: number;
  eventHeadSequence: number;
  refreshedAt: string;
}

export interface RuntimeRunView {
  scope: RuntimeScope;
  projectionVersion: string;
  projection: RuntimeOrchestrationProjection;
  projectionLastSequence: number;
  eventHeadSequence: number;
  projectionLag: number;
  refreshedAt: string;
}

export interface RuntimeStateExplanation {
  scope: RuntimeScope;
  runStatus: RuntimeOrchestrationProjection['runStatus'];
  currentState?: string;
  stateAttempt: number;
  statePath: string[];
  pendingWaitId?: string;
  pendingTransitionEventId?: string;
  pendingActivityIds: string[];
  lastEventSequence: number;
  source: 'runtime.orchestration.projection';
}

export interface RuntimeQueryServiceContract {
  getRun(request: RuntimeQueryRequest): Promise<RuntimeRunView | null>;
  getFSM(request: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null>;
  getTimeline(request: RuntimeTimelineRequest): Promise<RuntimeTimelineResult>;
  getPendingWaits(request: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]>;
  explainState(request: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null>;
}
