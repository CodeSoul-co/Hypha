export const SESSION_COMMAND_TYPES = [
  'start_run',
  'user_input',
  'resume',
  'signal',
  'cancel',
  'transition',
  'continue_react',
  'close_session',
] as const;

export const SESSION_COMMAND_STATUSES = [
  'queued',
  'claimed',
  'applied',
  'reused',
  'rejected',
  'expired',
  'failed',
  'dead_letter',
] as const;

export const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS = 5;
export const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT = 100;

export type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number];
export type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number];

export interface SessionQueueScope {
  tenantId?: string;
  userId: string;
  sessionId: string;
}

export interface SessionCommandRedrive {
  version: '1.0.0';
  sourceCommandId: string;
  operatorId: string;
  reason: string;
  requestedAt: string;
}

export interface SessionCommandRecord {
  id: string;
  commandType: SessionCommandType;
  idempotencyKey: string;
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  targetRunId?: string;
  enqueueSequence: number;
  priority: number;
  attempts: number;
  maxAttempts: number;
  leaseEpoch: number;
  payloadRef?: string;
  payloadHash: string;
  status: SessionCommandStatus;
  claimedBy?: string;
  claimToken?: string;
  leaseExpiresAt?: string;
  resultRunId?: string;
  resultEventIds?: string[];
  rejectionCode?: string;
  createdAt: string;
  availableAt: string;
  expiresAt?: string;
  completedAt?: string;
  redrive?: SessionCommandRedrive;
}

export interface EnqueueSessionCommandRequest {
  id: string;
  commandType: SessionCommandType;
  idempotencyKey: string;
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  targetRunId?: string;
  priority?: number;
  maxAttempts?: number;
  payloadRef?: string;
  payloadHash: string;
  createdAt?: string;
  availableAt?: string;
  expiresAt?: string;
}

export interface ClaimSessionCommandRequest {
  workerId: string;
  now: string;
  leaseMs: number;
  scope?: SessionQueueScope;
}

export interface SessionCommandClaim {
  commandId: string;
  workerId: string;
  claimToken: string;
  leaseEpoch: number;
  leaseExpiresAt: string;
}

export interface RenewSessionCommandRequest {
  commandId: string;
  workerId: string;
  claimToken: string;
  leaseEpoch: number;
  renewedAt: string;
  leaseMs: number;
}

export interface CompleteSessionCommandRequest {
  commandId: string;
  workerId: string;
  claimToken: string;
  leaseEpoch: number;
  completedAt: string;
  resultRunId?: string;
  resultEventIds?: string[];
}

export interface FailSessionCommandRequest {
  commandId: string;
  workerId: string;
  claimToken: string;
  leaseEpoch: number;
  failedAt: string;
  rejectionCode: string;
  deadLetter?: boolean;
}

export interface ReleaseSessionCommandRequest {
  commandId: string;
  workerId: string;
  claimToken: string;
  leaseEpoch: number;
  releasedAt: string;
  availableAt?: string;
}

export interface ListSessionCommandsRequest {
  scope: SessionQueueScope;
  statuses?: SessionCommandStatus[];
  fromSequence?: number;
  limit?: number;
}

export interface RedriveDeadLetterSessionCommandRequest {
  version: '1.0.0';
  scope: SessionQueueScope;
  sourceCommandId: string;
  id: string;
  idempotencyKey: string;
  operatorId: string;
  reason: string;
  requestedAt?: string;
  availableAt?: string;
  expiresAt?: string;
  priority?: number;
  maxAttempts?: number;
}

export interface ListStuckSessionCommandsRequest {
  scope: SessionQueueScope;
  checkedAt: string;
  graceMs?: number;
  limit?: number;
}

export interface StuckSessionCommand {
  command: SessionCommandRecord;
  detectedAt: string;
  overdueMs: number;
}
