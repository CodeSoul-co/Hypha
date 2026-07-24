import type { RuntimePrincipal, RuntimeScope } from './runtime';

export const RUNTIME_HUMAN_TASK_KINDS = [
  'tool',
  'skill',
  'prompt',
  'memory',
  'execution',
  'mcp',
  'policy',
] as const;

export const RUNTIME_HUMAN_TASK_STATUSES = [
  'pending',
  'approved',
  'rejected',
  'expired',
  'cancelled',
] as const;

export const RUNTIME_HUMAN_TASK_DECISIONS = ['approved', 'rejected', 'cancelled'] as const;

export type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number];
export type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number];
export type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number];

export interface RuntimeHumanTask {
  taskId: string;
  runId: string;
  stateId: string;
  stateAttempt: number;
  kind: RuntimeHumanTaskKind;
  subjectRef: string;
  subjectHash: string;
  status: RuntimeHumanTaskStatus;
  requestedBy: string;
  allowedDecisionScopes: string[];
  requestedAt: string;
  expiresAt?: string;
  revision: number;
  checkpointRef?: string;
  policyRef?: string;
  providerRevision?: string;
  decidedBy?: string;
  decidedAt?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeHumanTaskRequest {
  taskId: string;
  kind: RuntimeHumanTaskKind;
  subjectRef: string;
  subjectHash: string;
  requestedBy: string;
  allowedDecisionScopes: string[];
  requestedAt: string;
  expiresAt?: string;
  checkpointRef?: string;
  policyRef?: string;
  providerRevision?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeHumanTaskDecisionCommand {
  commandId: string;
  scope: RuntimeScope;
  principal: RuntimePrincipal;
  taskId: string;
  expectedRevision: number;
  expectedSubjectHash: string;
  decision: RuntimeHumanTaskDecision;
  decidedAt: string;
  reason?: string;
  idempotencyKey?: string;
}
