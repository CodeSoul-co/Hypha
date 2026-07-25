import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  CommandExecutionStatus,
} from './command-execution';

export interface ExecutionLease {
  id: string;
  executionId: string;
  ownerId: string;
  fencingToken: number;
  acquiredAt: string;
  expiresAt: string;
  heartbeatAt: string;
}

export interface ExecutionRecord {
  id: string;
  revision: number;
  request: CommandExecutionRequest;
  status: CommandExecutionStatus;
  providerId: string;
  providerExecutionRef?: string;
  sandboxId?: string;
  attempt: number;
  idempotencyFingerprint?: string;
  result?: CommandExecutionResult;
  lease?: ExecutionLease;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionLeaseGuard {
  leaseId: string;
  ownerId: string;
  fencingToken: number;
}

export interface ExecutionRecordCreateRequest {
  operationId: string;
  record: ExecutionRecord;
  idempotencyKey?: string;
}

export interface ExecutionRecordCompareAndSetRequest {
  operationId: string;
  executionId: string;
  expectedRevision: number;
  leaseGuard?: ExecutionLeaseGuard;
  next: ExecutionRecord;
  idempotencyKey?: string;
}

export interface ExecutionLeaseAcquireRequest {
  operationId: string;
  executionId: string;
  expectedRevision: number;
  requestedLeaseId: string;
  ownerId: string;
  ttlMs: number;
  acquiredAt: string;
  idempotencyKey?: string;
}

export interface ExecutionLeaseRenewRequest {
  operationId: string;
  executionId: string;
  expectedRevision: number;
  leaseGuard: ExecutionLeaseGuard;
  ttlMs: number;
  heartbeatAt: string;
  idempotencyKey?: string;
}

export interface ExecutionLeaseReleaseRequest {
  operationId: string;
  executionId: string;
  expectedRevision: number;
  leaseGuard: ExecutionLeaseGuard;
  releasedAt: string;
  reason?: string;
  idempotencyKey?: string;
}

export interface ExecutionRecordQuery {
  tenantId?: string;
  userId?: string;
  workspaceId?: string;
  runId?: string;
  providerId?: string;
  statuses?: CommandExecutionStatus[];
  leaseExpiresBefore?: string;
  updatedBefore?: string;
  limit?: number;
  cursor?: string;
}

export interface ExecutionRecordPage {
  records: ExecutionRecord[];
  cursor?: string;
}

export interface ExecutionIdempotencyQuery {
  tenantId?: string;
  userId: string;
  workspaceId: string;
  idempotencyKey: string;
  fingerprint: string;
}

export type ExecutionIdempotencyResolution =
  | { status: 'miss' }
  | { status: 'match'; record: ExecutionRecord }
  | {
      status: 'conflict';
      recordId: string;
      existingFingerprint: string;
    };

export type ExecutionRecoveryDisposition =
  | 'not_started'
  | 'provider_queryable'
  | 'provider_completed_result_missing'
  | 'provider_state_unknown';

export interface ExecutionRecoveryAssessment {
  executionId: string;
  recordRevision: number;
  disposition: ExecutionRecoveryDisposition;
  assessedAt: string;
  providerStatusRef?: string;
  reason?: string;
}

export interface ExecutionStore {
  create(request: ExecutionRecordCreateRequest): Promise<ExecutionRecord>;
  get(executionId: string): Promise<ExecutionRecord | null>;
  list(query?: ExecutionRecordQuery): Promise<ExecutionRecordPage>;
  resolveIdempotency(query: ExecutionIdempotencyQuery): Promise<ExecutionIdempotencyResolution>;
  compareAndSet(request: ExecutionRecordCompareAndSetRequest): Promise<ExecutionRecord>;
  acquireLease(request: ExecutionLeaseAcquireRequest): Promise<ExecutionRecord>;
  renewLease(request: ExecutionLeaseRenewRequest): Promise<ExecutionRecord>;
  releaseLease(request: ExecutionLeaseReleaseRequest): Promise<ExecutionRecord>;
  close?(): Promise<void>;
}
