import type { ProviderHealth } from '../../contracts/execution';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_TYPES,
  type ClaimSessionCommandRequest,
  type CompleteSessionCommandRequest,
  type EnqueueSessionCommandRequest,
  type FailSessionCommandRequest,
  type ListSessionCommandsRequest,
  type ReleaseSessionCommandRequest,
  type SessionCommandRecord,
  type SessionQueueScope,
} from '../../contracts/session-queue';
import { validateSessionCommandRecord } from '../../contracts/session-queue-schemas';
import { hashCanonicalJson } from './canonical-json';
import { addMilliseconds, busError, isAtOrBefore, nonEmpty, positive } from './message-bus';

export interface SessionQueue {
  enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord>;
  claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
  complete(request: CompleteSessionCommandRequest): Promise<void>;
  fail(request: FailSessionCommandRequest): Promise<void>;
  release(request: ReleaseSessionCommandRequest): Promise<void>;
  list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
  drain(scope: SessionQueueScope): Promise<void>;
  health(): Promise<ProviderHealth>;
}

export interface InMemorySessionQueueOptions {
  now?: () => string;
  duplicatePolicy?: 'reuse' | 'reject';
  maxPendingPerSession?: number;
  maxConcurrentSessions?: number;
  priorityAgingMs?: number;
}

interface IdempotencyRecord {
  commandId: string;
  fingerprint: string;
}

type DrainWaiter = () => void;

export class InMemorySessionQueue implements SessionQueue {
  private readonly records = new Map<string, SessionCommandRecord>();
  private readonly idempotency = new Map<string, IdempotencyRecord>();
  private readonly sessionSequences = new Map<string, number>();
  private readonly drainWaiters = new Map<string, Set<DrainWaiter>>();
  private readonly now: () => string;
  private readonly duplicatePolicy: 'reuse' | 'reject';
  private readonly maxPendingPerSession: number;
  private readonly maxConcurrentSessions: number;
  private readonly priorityAgingMs: number;

  constructor(options: InMemorySessionQueueOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.duplicatePolicy = options.duplicatePolicy ?? 'reuse';
    this.maxPendingPerSession = positive(
      options.maxPendingPerSession ?? 100,
      'maxPendingPerSession'
    );
    this.maxConcurrentSessions = positive(
      options.maxConcurrentSessions ?? Number.MAX_SAFE_INTEGER,
      'maxConcurrentSessions'
    );
    this.priorityAgingMs = positive(options.priorityAgingMs ?? 30_000, 'priorityAgingMs');
    if (
      !Number.isInteger(this.maxPendingPerSession) ||
      !Number.isInteger(this.maxConcurrentSessions) ||
      !Number.isInteger(this.priorityAgingMs)
    ) {
      throw busError('RUNTIME_INVALID_INPUT', 'Session queue limits must be integers');
    }
  }

  async enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord> {
    validateEnqueueRequest(request);
    const scope = scopeFromCommand(request);
    const key = sessionKey(scope);
    const idempotencyKey = `${key}\u0000${request.idempotencyKey}`;
    const fingerprint = enqueueFingerprint(request);
    const prior = this.idempotency.get(idempotencyKey);
    if (prior) {
      if (prior.fingerprint !== fingerprint || this.duplicatePolicy === 'reject') {
        throw busError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Session command idempotency key is already used: ${request.idempotencyKey}`
        );
      }
      const existing = this.records.get(prior.commandId);
      if (!existing) throw busError('RUNTIME_INTERNAL_ERROR', 'Session command index is corrupt');
      return { ...structuredClone(existing), status: 'reused' };
    }
    if (this.records.has(request.id)) {
      throw busError('RUNTIME_IDEMPOTENCY_CONFLICT', `Session command id exists: ${request.id}`);
    }
    const pending = [...this.records.values()].filter(
      (record) => sessionKey(scopeFromCommand(record)) === key && isPending(record)
    ).length;
    if (pending >= this.maxPendingPerSession) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Session queue depth limit reached', {
        sessionId: request.sessionId,
        maxPendingPerSession: this.maxPendingPerSession,
      });
    }

    const createdAt = request.createdAt ?? this.now();
    const availableAt = request.availableAt ?? createdAt;
    timestamp(createdAt, 'createdAt');
    timestamp(availableAt, 'availableAt');
    if (request.expiresAt) timestamp(request.expiresAt, 'expiresAt');
    const enqueueSequence = (this.sessionSequences.get(key) ?? 0) + 1;
    const record = validateSessionCommandRecord({
      id: request.id,
      commandType: request.commandType,
      idempotencyKey: request.idempotencyKey,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      sessionId: request.sessionId,
      ...(request.targetRunId === undefined ? {} : { targetRunId: request.targetRunId }),
      enqueueSequence,
      priority: request.priority ?? 50,
      attempts: 0,
      maxAttempts: request.maxAttempts ?? DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
      ...(request.payloadRef === undefined ? {} : { payloadRef: request.payloadRef }),
      payloadHash: request.payloadHash,
      status: 'queued',
      createdAt,
      availableAt,
      ...(request.expiresAt === undefined ? {} : { expiresAt: request.expiresAt }),
    });
    this.records.set(record.id, record);
    this.idempotency.set(idempotencyKey, { commandId: record.id, fingerprint });
    this.sessionSequences.set(key, enqueueSequence);
    return structuredClone(record);
  }

  async claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null> {
    nonEmpty(request.workerId, 'workerId');
    timestamp(request.now, 'claim.now');
    positive(request.leaseMs, 'leaseMs');
    if (request.scope) validateScope(request.scope);
    this.recover(request.now);

    const activeSessions = new Set(
      [...this.records.values()]
        .filter((record) => record.status === 'claimed')
        .map((record) => sessionKey(scopeFromCommand(record)))
    );
    if (activeSessions.size >= this.maxConcurrentSessions) return null;

    const heads = new Map<string, SessionCommandRecord>();
    for (const record of this.records.values()) {
      if (!isPending(record)) continue;
      if (request.scope && !sameScope(scopeFromCommand(record), request.scope)) continue;
      const key = sessionKey(scopeFromCommand(record));
      const current = heads.get(key);
      if (!current || record.enqueueSequence < current.enqueueSequence) heads.set(key, record);
    }
    const candidate = [...heads.values()]
      .filter(
        (record) => record.status === 'queued' && isAtOrBefore(record.availableAt, request.now)
      )
      .sort((left, right) =>
        compareClaimCandidates(left, right, request.now, this.priorityAgingMs)
      )[0];
    if (!candidate) return null;

    candidate.status = 'claimed';
    candidate.attempts += 1;
    candidate.claimedBy = request.workerId;
    candidate.leaseExpiresAt = addMilliseconds(request.now, request.leaseMs);
    validateSessionCommandRecord(candidate);
    return structuredClone(candidate);
  }

  async complete(request: CompleteSessionCommandRequest): Promise<void> {
    timestamp(request.completedAt, 'completedAt');
    if (request.resultRunId !== undefined) nonEmpty(request.resultRunId, 'resultRunId');
    if (request.resultEventIds?.some((eventId) => eventId.length === 0)) {
      throw busError('RUNTIME_INVALID_INPUT', 'resultEventIds must not contain empty ids');
    }
    const record = this.requireOwnedClaim(request.commandId, request.workerId, request.completedAt);
    const updated = validateSessionCommandRecord({
      ...withoutClaim(record),
      status: 'applied',
      completedAt: request.completedAt,
      ...(request.resultRunId === undefined ? {} : { resultRunId: request.resultRunId }),
      ...(request.resultEventIds === undefined
        ? {}
        : { resultEventIds: [...request.resultEventIds] }),
    });
    this.records.set(updated.id, updated);
    this.notifyIfDrained(scopeFromCommand(updated));
  }

  async fail(request: FailSessionCommandRequest): Promise<void> {
    nonEmpty(request.rejectionCode, 'rejectionCode');
    timestamp(request.failedAt, 'failedAt');
    const record = this.requireOwnedClaim(request.commandId, request.workerId, request.failedAt);
    const updated = validateSessionCommandRecord({
      ...withoutClaim(record),
      status: request.deadLetter ? 'dead_letter' : 'failed',
      rejectionCode: request.rejectionCode,
      completedAt: request.failedAt,
    });
    this.records.set(updated.id, updated);
    this.notifyIfDrained(scopeFromCommand(updated));
  }

  async release(request: ReleaseSessionCommandRequest): Promise<void> {
    timestamp(request.releasedAt, 'releasedAt');
    if (request.availableAt) timestamp(request.availableAt, 'availableAt');
    const record = this.requireOwnedClaim(request.commandId, request.workerId, request.releasedAt);
    const exhausted = record.attempts >= record.maxAttempts;
    const updated = validateSessionCommandRecord({
      ...withoutClaim(record),
      status: exhausted ? 'dead_letter' : 'queued',
      availableAt: request.availableAt ?? request.releasedAt,
      ...(exhausted
        ? { rejectionCode: 'attempt_budget_exhausted', completedAt: request.releasedAt }
        : {}),
    });
    this.records.set(updated.id, updated);
    if (exhausted) this.notifyIfDrained(scopeFromCommand(updated));
  }

  async list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]> {
    validateScope(request.scope);
    this.recover(this.now());
    const fromSequence = request.fromSequence ?? 1;
    const limit = request.limit ?? 100;
    if (!Number.isInteger(fromSequence) || fromSequence < 1) {
      throw busError('RUNTIME_INVALID_INPUT', 'fromSequence must be a positive integer');
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      throw busError('RUNTIME_INVALID_INPUT', 'limit must be between 1 and 1000');
    }
    if (
      request.statuses?.some(
        (status) => !(SESSION_COMMAND_STATUSES as readonly string[]).includes(status)
      )
    ) {
      throw busError('RUNTIME_INVALID_INPUT', 'statuses contains an invalid status');
    }
    return [...this.records.values()]
      .filter(
        (record) =>
          sameScope(scopeFromCommand(record), request.scope) &&
          record.enqueueSequence >= fromSequence &&
          (request.statuses === undefined || request.statuses.includes(record.status))
      )
      .sort((left, right) => left.enqueueSequence - right.enqueueSequence)
      .slice(0, limit)
      .map((record) => structuredClone(record));
  }

  async drain(scope: SessionQueueScope): Promise<void> {
    validateScope(scope);
    this.recover(this.now());
    if (this.isDrained(scope)) return;
    const key = sessionKey(scope);
    return new Promise<void>((resolve) => {
      const waiters = this.drainWaiters.get(key) ?? new Set<DrainWaiter>();
      waiters.add(resolve);
      this.drainWaiters.set(key, waiters);
    });
  }

  async health(): Promise<ProviderHealth> {
    this.recover(this.now());
    const records = [...this.records.values()];
    return {
      status: 'healthy',
      checkedAt: this.now(),
      details: {
        commands: records.length,
        queued: records.filter((record) => record.status === 'queued').length,
        claimed: records.filter((record) => record.status === 'claimed').length,
      },
    };
  }

  private requireOwnedClaim(commandId: string, workerId: string, at: string): SessionCommandRecord {
    const record = this.records.get(commandId);
    if (!record) {
      throw busError('RUNTIME_SESSION_QUEUE_CONFLICT', `Session command not found: ${commandId}`);
    }
    if (
      record.status !== 'claimed' ||
      record.claimedBy !== workerId ||
      record.leaseExpiresAt === undefined ||
      isAtOrBefore(record.leaseExpiresAt, at)
    ) {
      throw busError('RUNTIME_SESSION_QUEUE_CONFLICT', 'Session command claim is not owned', {
        commandId,
        workerId,
      });
    }
    return record;
  }

  private recover(now: string): void {
    timestamp(now, 'recovery.now');
    const affected = new Map<string, SessionQueueScope>();
    for (const record of this.records.values()) {
      if (
        record.status === 'claimed' &&
        record.leaseExpiresAt !== undefined &&
        isAtOrBefore(record.leaseExpiresAt, now)
      ) {
        const exhausted = record.attempts >= record.maxAttempts;
        record.status = exhausted ? 'dead_letter' : 'queued';
        if (exhausted) {
          record.rejectionCode = 'claim_lease_expired_after_attempt_budget';
          record.completedAt = now;
          affected.set(sessionKey(scopeFromCommand(record)), scopeFromCommand(record));
        }
        delete record.claimedBy;
        delete record.leaseExpiresAt;
      }
      if (
        record.status === 'queued' &&
        record.expiresAt !== undefined &&
        isAtOrBefore(record.expiresAt, now)
      ) {
        record.status = 'expired';
        record.completedAt = now;
        validateSessionCommandRecord(record);
        affected.set(sessionKey(scopeFromCommand(record)), scopeFromCommand(record));
      }
    }
    for (const scope of affected.values()) this.notifyIfDrained(scope);
  }

  private isDrained(scope: SessionQueueScope): boolean {
    return ![...this.records.values()].some(
      (record) => sameScope(scopeFromCommand(record), scope) && isPending(record)
    );
  }

  private notifyIfDrained(scope: SessionQueueScope): void {
    if (!this.isDrained(scope)) return;
    const key = sessionKey(scope);
    const waiters = this.drainWaiters.get(key);
    if (!waiters) return;
    this.drainWaiters.delete(key);
    for (const resolve of waiters) resolve();
  }
}

function validateEnqueueRequest(request: EnqueueSessionCommandRequest): void {
  nonEmpty(request.id, 'command.id');
  nonEmpty(request.idempotencyKey, 'idempotencyKey');
  validateScope(scopeFromCommand(request));
  if (!SESSION_COMMAND_TYPES.includes(request.commandType)) {
    throw busError('RUNTIME_INVALID_INPUT', 'commandType is invalid');
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(request.payloadHash)) {
    throw busError('RUNTIME_INVALID_INPUT', 'payloadHash is invalid');
  }
  if (
    request.priority !== undefined &&
    (!Number.isInteger(request.priority) || request.priority < 0 || request.priority > 100)
  ) {
    throw busError('RUNTIME_INVALID_INPUT', 'priority must be an integer between 0 and 100');
  }
  if (
    request.maxAttempts !== undefined &&
    (!Number.isInteger(request.maxAttempts) ||
      request.maxAttempts < 1 ||
      request.maxAttempts > SESSION_COMMAND_MAX_ATTEMPTS_LIMIT)
  ) {
    throw busError(
      'RUNTIME_INVALID_INPUT',
      `maxAttempts must be an integer between 1 and ${SESSION_COMMAND_MAX_ATTEMPTS_LIMIT}`
    );
  }
  if (request.createdAt) timestamp(request.createdAt, 'createdAt');
  if (request.availableAt) timestamp(request.availableAt, 'availableAt');
  if (request.expiresAt) timestamp(request.expiresAt, 'expiresAt');
}

function enqueueFingerprint(request: EnqueueSessionCommandRequest): string {
  return hashCanonicalJson({
    commandType: request.commandType,
    tenantId: request.tenantId ?? null,
    userId: request.userId,
    workspaceId: request.workspaceId ?? null,
    sessionId: request.sessionId,
    targetRunId: request.targetRunId ?? null,
    priority: request.priority ?? 50,
    maxAttempts: request.maxAttempts ?? DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
    payloadRef: request.payloadRef ?? null,
    payloadHash: request.payloadHash,
    availableAt: request.availableAt ?? null,
    expiresAt: request.expiresAt ?? null,
  });
}

function compareClaimCandidates(
  left: SessionCommandRecord,
  right: SessionCommandRecord,
  now: string,
  priorityAgingMs: number
): number {
  return (
    effectivePriority(right, now, priorityAgingMs) -
      effectivePriority(left, now, priorityAgingMs) ||
    Date.parse(left.availableAt) - Date.parse(right.availableAt) ||
    Date.parse(left.createdAt) - Date.parse(right.createdAt) ||
    sessionKey(scopeFromCommand(left)).localeCompare(sessionKey(scopeFromCommand(right)))
  );
}

function effectivePriority(
  record: SessionCommandRecord,
  now: string,
  priorityAgingMs: number
): number {
  const waitingMs = Math.max(0, Date.parse(now) - Date.parse(record.availableAt));
  return Math.min(
    Number.MAX_SAFE_INTEGER,
    record.priority + Math.floor(waitingMs / priorityAgingMs)
  );
}

function scopeFromCommand(command: {
  tenantId?: string;
  userId: string;
  sessionId: string;
}): SessionQueueScope {
  return {
    ...(command.tenantId === undefined ? {} : { tenantId: command.tenantId }),
    userId: command.userId,
    sessionId: command.sessionId,
  };
}

function validateScope(scope: SessionQueueScope): void {
  nonEmpty(scope.userId, 'userId');
  nonEmpty(scope.sessionId, 'sessionId');
  if (scope.tenantId !== undefined) nonEmpty(scope.tenantId, 'tenantId');
}

function sessionKey(scope: SessionQueueScope): string {
  validateScope(scope);
  return `${scope.tenantId ?? ''}\u0000${scope.userId}\u0000${scope.sessionId}`;
}

function sameScope(left: SessionQueueScope, right: SessionQueueScope): boolean {
  return sessionKey(left) === sessionKey(right);
}

function isPending(record: SessionCommandRecord): boolean {
  return record.status === 'queued' || record.status === 'claimed';
}

function withoutClaim(record: SessionCommandRecord): SessionCommandRecord {
  const clone = structuredClone(record);
  delete clone.claimedBy;
  delete clone.leaseExpiresAt;
  return clone;
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be a valid timestamp`);
  }
}
