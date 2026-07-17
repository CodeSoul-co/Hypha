import type { ProviderHealth } from '../../contracts/execution';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

export const SESSION_COMMAND_TYPES = [
  'start_run',
  'user_input',
  'resume',
  'signal',
  'cancel',
  'close_session',
] as const;

export type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number];
export type SessionCommandStatus =
  | 'queued'
  | 'claimed'
  | 'applied'
  | 'reused'
  | 'rejected'
  | 'expired'
  | 'failed'
  | 'dead_letter';

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
  payloadRef?: string;
  payloadHash: string;
  status: SessionCommandStatus;
  claimedBy?: string;
  claimToken?: number;
  leaseExpiresAt?: string;
  resultRunId?: string;
  resultEventIds?: string[];
  rejectionCode?: string;
  attempts: number;
  createdAt: string;
  availableAt: string;
  expiresAt?: string;
  completedAt?: string;
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
  payloadRef?: string;
  payloadHash: string;
  createdAt: string;
  availableAt?: string;
  expiresAt?: string;
}

export interface EnqueueSessionCommandResult {
  record: SessionCommandRecord;
  reused: boolean;
}

export interface ClaimSessionCommandRequest {
  tenantId?: string;
  userId: string;
  sessionId: string;
  workerId: string;
  now: string;
  leaseMs: number;
}

export interface CompleteSessionCommandRequest {
  id: string;
  workerId: string;
  claimToken: number;
  completedAt: string;
  resultRunId?: string;
  resultEventIds: string[];
}

export interface FailSessionCommandRequest {
  id: string;
  workerId: string;
  claimToken: number;
  failedAt: string;
  rejectionCode: string;
  retryAt?: string;
  deadLetter?: boolean;
}

export interface ReleaseSessionCommandRequest {
  id: string;
  workerId: string;
  claimToken: number;
  availableAt: string;
}

export interface ListSessionCommandsRequest {
  tenantId?: string;
  userId: string;
  sessionId: string;
  status?: SessionCommandStatus;
}

export interface SessionQueueV2 {
  enqueue(request: EnqueueSessionCommandRequest): Promise<EnqueueSessionCommandResult>;
  claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
  complete(request: CompleteSessionCommandRequest): Promise<void>;
  fail(request: FailSessionCommandRequest): Promise<void>;
  release(request: ReleaseSessionCommandRequest): Promise<void>;
  list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
  drain(request: { tenantId?: string; userId: string; sessionId: string }): Promise<void>;
  health(): Promise<ProviderHealth>;
}

export interface InMemorySessionQueueOptions {
  maxPendingPerSession?: number;
  now?: () => string;
}

interface SessionIdempotencyRecord {
  requestHash: string;
  commandId: string;
}

export class InMemorySessionQueueV2 implements SessionQueueV2 {
  private readonly records = new Map<string, SessionCommandRecord>();
  private readonly sequences = new Map<string, number>();
  private readonly idempotency = new Map<string, SessionIdempotencyRecord>();
  private readonly maxPendingPerSession: number;
  private readonly now: () => string;
  private nextClaimToken = 0;

  constructor(options: InMemorySessionQueueOptions = {}) {
    this.maxPendingPerSession = positiveInteger(
      options.maxPendingPerSession ?? 100,
      'maxPendingPerSession'
    );
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async enqueue(request: EnqueueSessionCommandRequest): Promise<EnqueueSessionCommandResult> {
    validateEnqueue(request);
    const scope = sessionScope(request);
    const idempotencyKey = `${scope}\u0000${request.idempotencyKey}`;
    const requestHash = hashCanonicalJson(request);
    const prior = this.idempotency.get(idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        throw coordinationError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          'Session command idempotency key was reused with different input.'
        );
      }
      return { record: structuredClone(this.require(prior.commandId)), reused: true };
    }
    if (this.records.has(request.id)) {
      throw coordinationError('RUNTIME_IDEMPOTENCY_CONFLICT', `Command id exists: ${request.id}`);
    }
    const pending = Array.from(this.records.values()).filter(
      (record) => sessionScope(record) === scope && isPendingCommand(record.status)
    ).length;
    if (pending >= this.maxPendingPerSession) {
      throw coordinationError(
        'RUNTIME_SESSION_QUEUE_OVERFLOW',
        'Session command queue limit reached.',
        { maxPendingPerSession: this.maxPendingPerSession }
      );
    }
    const enqueueSequence = (this.sequences.get(scope) ?? 0) + 1;
    this.sequences.set(scope, enqueueSequence);
    const record: SessionCommandRecord = {
      id: request.id,
      commandType: request.commandType,
      idempotencyKey: request.idempotencyKey,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      sessionId: request.sessionId,
      ...(request.targetRunId === undefined ? {} : { targetRunId: request.targetRunId }),
      enqueueSequence,
      priority: request.priority ?? 0,
      ...(request.payloadRef === undefined ? {} : { payloadRef: request.payloadRef }),
      payloadHash: request.payloadHash,
      status: 'queued',
      attempts: 0,
      createdAt: request.createdAt,
      availableAt: request.availableAt ?? request.createdAt,
      ...(request.expiresAt === undefined ? {} : { expiresAt: request.expiresAt }),
    };
    this.records.set(record.id, record);
    this.idempotency.set(idempotencyKey, { requestHash, commandId: record.id });
    return { record: structuredClone(record), reused: false };
  }

  async claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null> {
    validateClaim(request);
    const scope = sessionScope(request);
    this.recoverExpiredClaims(scope, request.now);
    const active = Array.from(this.records.values()).some(
      (record) =>
        sessionScope(record) === scope &&
        record.status === 'claimed' &&
        record.leaseExpiresAt !== undefined &&
        record.leaseExpiresAt > request.now
    );
    if (active) return null;
    const candidates = Array.from(this.records.values())
      .filter(
        (record) =>
          sessionScope(record) === scope &&
          record.status === 'queued' &&
          record.availableAt <= request.now
      )
      .sort(
        (left, right) =>
          right.priority - left.priority || left.enqueueSequence - right.enqueueSequence
      );
    for (const record of candidates) {
      if (record.expiresAt && record.expiresAt <= request.now) {
        record.status = 'expired';
        record.completedAt = request.now;
        continue;
      }
      record.status = 'claimed';
      record.claimedBy = request.workerId;
      record.claimToken = ++this.nextClaimToken;
      record.leaseExpiresAt = addMs(request.now, request.leaseMs);
      record.attempts += 1;
      return structuredClone(record);
    }
    return null;
  }

  async complete(request: CompleteSessionCommandRequest): Promise<void> {
    validateTimestamp(request.completedAt, 'completedAt');
    const record = this.requireClaim(request.id, request.workerId, request.claimToken);
    record.status = 'applied';
    record.completedAt = request.completedAt;
    record.resultEventIds = [...request.resultEventIds];
    if (request.resultRunId !== undefined) record.resultRunId = request.resultRunId;
    clearCommandClaim(record);
  }

  async fail(request: FailSessionCommandRequest): Promise<void> {
    validateTimestamp(request.failedAt, 'failedAt');
    if (request.retryAt) validateTimestamp(request.retryAt, 'retryAt');
    const record = this.requireClaim(request.id, request.workerId, request.claimToken);
    record.status = request.deadLetter ? 'dead_letter' : request.retryAt ? 'queued' : 'failed';
    record.rejectionCode = request.rejectionCode;
    if (request.retryAt) record.availableAt = request.retryAt;
    if (record.status !== 'queued') record.completedAt = request.failedAt;
    clearCommandClaim(record);
  }

  async release(request: ReleaseSessionCommandRequest): Promise<void> {
    validateTimestamp(request.availableAt, 'availableAt');
    const record = this.requireClaim(request.id, request.workerId, request.claimToken);
    record.status = 'queued';
    record.availableAt = request.availableAt;
    clearCommandClaim(record);
  }

  async list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]> {
    const scope = sessionScope(request);
    return Array.from(this.records.values())
      .filter(
        (record) =>
          sessionScope(record) === scope &&
          (request.status === undefined || record.status === request.status)
      )
      .sort((left, right) => left.enqueueSequence - right.enqueueSequence)
      .map((record) => structuredClone(record));
  }

  async drain(request: { tenantId?: string; userId: string; sessionId: string }): Promise<void> {
    const pending = await this.list(request);
    if (pending.some((record) => isPendingCommand(record.status))) {
      throw coordinationError(
        'RUNTIME_SESSION_QUEUE_CONFLICT',
        'Cannot drain a session with pending commands.'
      );
    }
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: this.now(),
      details: { commands: this.records.size },
    };
  }

  private recoverExpiredClaims(scope: string, now: string): void {
    for (const record of this.records.values()) {
      if (
        sessionScope(record) === scope &&
        record.status === 'claimed' &&
        record.leaseExpiresAt !== undefined &&
        record.leaseExpiresAt <= now
      ) {
        record.status = 'queued';
        record.availableAt = now;
        clearCommandClaim(record);
      }
    }
  }

  private requireClaim(id: string, workerId: string, claimToken: number): SessionCommandRecord {
    const record = this.require(id);
    if (
      record.status !== 'claimed' ||
      record.claimedBy !== workerId ||
      record.claimToken !== claimToken
    ) {
      throw coordinationError('RUNTIME_FENCING_REJECTED', `Session command claim is stale: ${id}`);
    }
    return record;
  }

  private require(id: string): SessionCommandRecord {
    const record = this.records.get(id);
    if (!record) throw coordinationError('RUNTIME_INVALID_INPUT', `Command not found: ${id}`);
    return record;
  }
}

export interface RunLease {
  id: string;
  runId: string;
  ownerId: string;
  acquiredAt: string;
  expiresAt: string;
  heartbeatAt: string;
  revision: number;
  fencingToken: number;
}

export interface RunLeaseAcquireRequest {
  runId: string;
  ownerId: string;
  now: string;
  ttlMs: number;
}

export interface RunLeaseHeartbeatRequest {
  leaseId: string;
  ownerId: string;
  expectedRevision: number;
  now: string;
  ttlMs: number;
}

export interface RunLeaseStore {
  acquire(request: RunLeaseAcquireRequest): Promise<RunLease | null>;
  heartbeat(request: RunLeaseHeartbeatRequest): Promise<RunLease>;
  release(leaseId: string, ownerId: string): Promise<void>;
  get(runId: string): Promise<RunLease | null>;
}

export class InMemoryRunLeaseStore implements RunLeaseStore {
  private readonly leasesByRun = new Map<string, RunLease>();
  private readonly runByLeaseId = new Map<string, string>();
  private readonly fencingTokens = new Map<string, number>();

  async acquire(request: RunLeaseAcquireRequest): Promise<RunLease | null> {
    validateLeaseRequest(request.runId, request.ownerId, request.now, request.ttlMs);
    const current = this.leasesByRun.get(request.runId);
    if (current && current.expiresAt > request.now) {
      return current.ownerId === request.ownerId ? structuredClone(current) : null;
    }
    if (current) this.runByLeaseId.delete(current.id);
    const fencingToken = (this.fencingTokens.get(request.runId) ?? 0) + 1;
    this.fencingTokens.set(request.runId, fencingToken);
    const lease: RunLease = {
      id: `${request.runId}:lease:${fencingToken}`,
      runId: request.runId,
      ownerId: request.ownerId,
      acquiredAt: request.now,
      expiresAt: addMs(request.now, request.ttlMs),
      heartbeatAt: request.now,
      revision: 1,
      fencingToken,
    };
    this.leasesByRun.set(request.runId, lease);
    this.runByLeaseId.set(lease.id, request.runId);
    return structuredClone(lease);
  }

  async heartbeat(request: RunLeaseHeartbeatRequest): Promise<RunLease> {
    validateLeaseRequest(request.leaseId, request.ownerId, request.now, request.ttlMs);
    const runId = this.runByLeaseId.get(request.leaseId);
    const lease = runId ? this.leasesByRun.get(runId) : undefined;
    if (
      !lease ||
      lease.id !== request.leaseId ||
      lease.ownerId !== request.ownerId ||
      lease.revision !== request.expectedRevision ||
      lease.expiresAt <= request.now
    ) {
      throw coordinationError('RUNTIME_FENCING_REJECTED', 'Run lease heartbeat is stale.');
    }
    lease.revision += 1;
    lease.heartbeatAt = request.now;
    lease.expiresAt = addMs(request.now, request.ttlMs);
    return structuredClone(lease);
  }

  async release(leaseId: string, ownerId: string): Promise<void> {
    const runId = this.runByLeaseId.get(leaseId);
    const lease = runId ? this.leasesByRun.get(runId) : undefined;
    if (!lease) return;
    if (lease.ownerId !== ownerId) {
      throw coordinationError('RUNTIME_FENCING_REJECTED', 'Run lease release is not owned.');
    }
    this.leasesByRun.delete(lease.runId);
    this.runByLeaseId.delete(lease.id);
  }

  async get(runId: string): Promise<RunLease | null> {
    const lease = this.leasesByRun.get(runId);
    return lease ? structuredClone(lease) : null;
  }
}

function validateEnqueue(request: EnqueueSessionCommandRequest): void {
  assertNonEmpty(request.id, 'id');
  assertNonEmpty(request.idempotencyKey, 'idempotencyKey');
  assertNonEmpty(request.userId, 'userId');
  assertNonEmpty(request.sessionId, 'sessionId');
  assertNonEmpty(request.payloadHash, 'payloadHash');
  validateTimestamp(request.createdAt, 'createdAt');
  if (request.availableAt) validateTimestamp(request.availableAt, 'availableAt');
  if (request.expiresAt) validateTimestamp(request.expiresAt, 'expiresAt');
  if (request.priority !== undefined && !Number.isInteger(request.priority)) {
    throw coordinationError('RUNTIME_INVALID_INPUT', 'priority must be an integer.');
  }
}

function validateClaim(request: ClaimSessionCommandRequest): void {
  assertNonEmpty(request.userId, 'userId');
  assertNonEmpty(request.sessionId, 'sessionId');
  assertNonEmpty(request.workerId, 'workerId');
  validateTimestamp(request.now, 'now');
  positiveInteger(request.leaseMs, 'leaseMs');
}

function validateLeaseRequest(
  resourceId: string,
  ownerId: string,
  now: string,
  ttlMs: number
): void {
  assertNonEmpty(resourceId, 'resourceId');
  assertNonEmpty(ownerId, 'ownerId');
  validateTimestamp(now, 'now');
  positiveInteger(ttlMs, 'ttlMs');
}

function sessionScope(value: { tenantId?: string; userId: string; sessionId: string }): string {
  return `${value.tenantId ?? ''}\u0000${value.userId}\u0000${value.sessionId}`;
}

function isPendingCommand(status: SessionCommandStatus): boolean {
  return status === 'queued' || status === 'claimed';
}

function clearCommandClaim(record: SessionCommandRecord): void {
  delete record.claimedBy;
  delete record.claimToken;
  delete record.leaseExpiresAt;
}

function addMs(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function assertNonEmpty(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw coordinationError('RUNTIME_INVALID_INPUT', `${label} must be a non-empty string.`);
  }
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) {
    throw coordinationError('RUNTIME_INVALID_INPUT', `${label} must be a positive integer.`);
  }
  return value;
}

function validateTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw coordinationError('RUNTIME_INVALID_INPUT', `${label} must be a valid timestamp.`);
  }
}

function coordinationError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, ...(context === undefined ? {} : { context }) });
}
