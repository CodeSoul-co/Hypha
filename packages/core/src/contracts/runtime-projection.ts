import type { RuntimeRunStatus } from './runtime';

export type RuntimeOrchestrationRunStatus = 'not_created' | RuntimeRunStatus;

export interface RuntimePendingTransitionProjection {
  eventId: string;
  from: string;
  to: string;
}

export interface RuntimeOrchestrationProjection {
  runId: string;
  runStatus: RuntimeOrchestrationRunStatus;
  currentState?: string;
  terminalState?: string;
  statePath: string[];
  stateVisitCounts: Record<string, number>;
  stateAttempt: number;
  pendingTransition?: RuntimePendingTransitionProjection;
  pendingActivityIds: string[];
}
