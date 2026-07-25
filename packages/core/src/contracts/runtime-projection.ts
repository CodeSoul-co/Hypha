import type { RuntimeRunStatus } from './runtime';
import type { RuntimeJsonValue, RuntimeWaitIntentType } from './runtime-helpers';
import type { JsonSchema } from '../specs';

export type RuntimeOrchestrationRunStatus = 'not_created' | RuntimeRunStatus;

export interface RuntimePendingTransitionProjection {
  eventId: string;
  from: string;
  to: string;
}

export interface RuntimePendingWaitProjection {
  waitId: string;
  stateId: string;
  stateAttempt: number;
  type: RuntimeWaitIntentType;
  key?: string;
  pendingActionRef?: string;
  reason?: string;
  expectedSchema?: JsonSchema;
  expiresAt?: string;
  createdAt: string;
}

export interface RuntimeResumeProjection {
  commandId: string;
  kind: 'manual' | 'signal' | 'timer';
  waitId: string;
  principalId: string;
  key?: string;
  payload?: RuntimeJsonValue;
  resumedAt: string;
}

export interface RuntimeCancellationProjection {
  commandId: string;
  principalId: string;
  reason: string;
  requestedAt: string;
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
  pendingHumanActionRef?: string;
  pendingWait?: RuntimePendingWaitProjection;
  lastResume?: RuntimeResumeProjection;
  cancellation?: RuntimeCancellationProjection;
  pendingActivityIds: string[];
}
