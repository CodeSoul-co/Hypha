import type { ProviderHealth } from '../../contracts/execution';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_RUN_CANCELLED_CODE,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_TYPES,
  type CancelSessionCommandsRequest,
  type CancelSessionCommandsResult,
  type ClaimSessionCommandRequest,
  type CloseDeadLetterSessionCommandRequest,
  type CompleteSessionCommandRequest,
  type EnqueueSessionCommandRequest,
  type FailSessionCommandRequest,
  type ListSessionCommandsRequest,
  type ListStuckSessionCommandsRequest,
  type RedriveDeadLetterSessionCommandRequest,
  type ReleaseSessionCommandRequest,
  type RenewSessionCommandRequest,
  type SessionCommandClaim,
  type SessionCommandRecord,
  type SessionQueueHealthSnapshot,
  type SessionQueueScope,
  type StuckSessionCommand,
} from '../../contracts/session-queue';
import {
  validateCancelSessionCommandsRequest,
  validateCancelSessionCommandsResult,
  validateCloseDeadLetterSessionCommandRequest,
  validateListStuckSessionCommandsRequest,
  validateRedriveDeadLetterSessionCommandRequest,
  validateSessionCommandRecord,
  validateSessionQueueHealthSnapshot,
  validateStuckSessionCommand,
} from '../../contracts/session-queue-schemas';
import { hashCanonicalJson } from './canonical-json';
import { addMilliseconds, busError, isAtOrBefore, nonEmpty, positive } from './message-bus';

export interface SessionQueue {
  enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord>;
  claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
  renew(request: RenewSessionCommandRequest): Promise<SessionCommandClaim>;
  complete(request: CompleteSessionCommandRequest): Promise<void>;
  fail(request: FailSessionCommandRequest): Promise<void>;
  release(request: ReleaseSessionCommandRequest): Promise<void>;
  list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
  cancelPending(request: CancelSessionCommandsRequest): Promise<CancelSessionCommandsResult>;
  redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
  closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
  listStuck(request: ListStuckSessionCommandsRequest): Promise<StuckSessionCommand[]>;
  drain(scope: SessionQueueScope): Promise<void>;
  health(): Promise<ProviderHealth & { details: SessionQueueHealthSnapshot }>;
}

export interface InMemorySessionQueueOptions {
  now?: () => string;
  duplicatePolicy?: 'reuse' | 'reject';
  maxPendingPerSession?: number;
  maxPendingPerUser?: number;
  maxPendingGlobal?: number;
  maxConcurrentSessions?: number;
  maxConcurrentSessionsPerUser?: number;
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
  private readonly maxPendingPerUser: number;
  private readonly maxPendingGlobal: number;
  private readonly maxConcurrentSessions: number;
  private readonly maxConcurrentSessionsPerUser: number;
  private readonly priorityAgingMs: number;

  constructor(options: InMemorySessionQueueOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.duplicatePolicy = options.duplicatePolicy ?? 'reuse';
    this.maxPendingPerSession = positive(
      options.maxPendingPerSession ?? 100,
      'maxPendingPerSession'
    );
    this.maxPendingPerUser = positive(
      options.maxPendingPerUser ?? Number.MAX_SAFE_INTEGER,
      'maxPendingPerUser'
    );
    this.maxPendingGlobal = positive(
      options.maxPendingGlobal ?? Number.MAX_SAFE_INTEGER,
      'maxPendingGlobal'
    );
    this.maxConcurrentSessions = positive(
      options.maxConcurrentSessions ?? Number.MAX_SAFE_INTEGER,
      'maxConcurrentSessions'
    );
    this.maxConcurrentSessionsPerUser = positive(
      options.maxConcurrentSessionsPerUser ?? Number.MAX_SAFE_INTEGER,
      'maxConcurrentSessionsPerUser'
    );
    this.priorityAgingMs = positive(options.priorityAgingMs ?? 30_000, 'priorityAgingMs');
    if (
      !Number.isInteger(this.maxPendingPerSession) ||
      !Number.isInteger(this.maxPendingPerUser) ||
      !Number.isInteger(this.maxPendingGlobal) ||
      !Number.isInteger(this.maxConcurrentSessions) ||
      !Number.isInteger(this.maxConcurrentSessionsPerUser) ||
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
    const pending = [...this.records.values()].filter(isPending);
    const pendingForSession = pending.filter(
      (record) => sessionKey(scopeFromCommand(record)) === key
    ).length;
    if (pendingForSession >= this.maxPendingPerSession) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Session queue depth limit reached', {
        sessionId: request.sessionId,
        maxPendingPerSession: this.maxPendingPerSession,
      });
    }
    const owner = userKey(scope);
    const pendingForUser = pending.filter(
      (record) => userKey(scopeFromCommand(record)) === owner
    ).length;
    if (pendingForUser >= this.maxPendingPerUser) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'User queue depth limit reached', {
        userId: request.userId,
        maxPendingPerUser: this.maxPendingPerUser,
      });
    }
    if (pending.length >= this.maxPendingGlobal) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Global queue depth limit reached', {
        maxPendingGlobal: this.maxPendingGlobal,
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
      leaseEpoch: 0,
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

    const active = [...this.records.values()].filter((record) => record.status === 'claimed');
    const activeSessions = new Set(active.map((record) => sessionKey(scopeFromCommand(record))));
    if (activeSessions.size >= this.maxConcurrentSessions) return null;
    const activeSessionsByUser = active.reduce((counts, record) => {
      const owner = userKey(scopeFromCommand(record));
      counts.set(owner, (counts.get(owner) ?? 0) + 1);
      return counts;
    }, new Map<string, number>());

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
        (record) =>
          record.status === 'queued' &&
          isAtOrBefore(record.availableAt, request.now) &&
          (activeSessionsByUser.get(userKey(scopeFromCommand(record))) ?? 0) <
            this.maxConcurrentSessionsPerUser
      )
      .sort((left, right) =>
        compareClaimCandidates(left, right, request.now, this.priorityAgingMs)
      )[0];
    if (!candidate) return null;

    candidate.status = 'claimed';
    candidate.attempts += 1;
    candidate.leaseEpoch += 1;
    candidate.claimedBy = request.workerId;
    candidate.claimToken = claimToken(candidate, request.workerId, request.now);
    candidate.leaseExpiresAt = addMilliseconds(request.now, request.leaseMs);
    validateSessionCommandRecord(candidate);
    return structuredClone(candidate);
  }

  async renew(request: RenewSessionCommandRequest): Promise<SessionCommandClaim> {
    timestamp(request.renewedAt, 'renewedAt');
    positiveInteger(request.leaseMs, 'leaseMs');
    const record = this.requireOwnedClaim(request, request.renewedAt);
    record.leaseExpiresAt = addMilliseconds(request.renewedAt, request.leaseMs);
    validateSessionCommandRecord(record);
    return claimFromRecord(record);
  }

  async complete(request: CompleteSessionCommandRequest): Promise<void> {
    timestamp(request.completedAt, 'completedAt');
    if (request.resultRunId !== undefined) nonEmpty(request.resultRunId, 'resultRunId');
    if (request.resultEventIds?.some((eventId) => eventId.length === 0)) {
      throw busError('RUNTIME_INVALID_INPUT', 'resultEventIds must not contain empty ids');
    }
    const record = this.requireOwnedClaim(request, request.completedAt);
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
    const record = this.requireOwnedClaim(request, request.failedAt);
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
    const record = this.requireOwnedClaim(request, request.releasedAt);
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

  async cancelPending(request: CancelSessionCommandsRequest): Promise<CancelSessionCommandsResult> {
    const validated = validateCancelSessionCommandsRequest(request);
    this.recover(validated.cancelledAt);
    const result: CancelSessionCommandsResult = {
      targetRunId: validated.targetRunId,
      cancelledCommandIds: [],
      alreadyCancelledCommandIds: [],
      alreadyTerminalCommandIds: [],
    };
    const records = [...this.records.values()]
      .filter(
        (record) =>
          sameScope(scopeFromCommand(record), validated.scope) &&
          record.targetRunId === validated.targetRunId &&
          record.id !== validated.cancellationCommandId
      )
      .sort((left, right) => left.enqueueSequence - right.enqueueSequence);
    for (const record of records) {
      if (record.rejectionCode === SESSION_COMMAND_RUN_CANCELLED_CODE) {
        result.alreadyCancelledCommandIds.push(record.id);
        continue;
      }
      if (!isPending(record)) {
        result.alreadyTerminalCommandIds.push(record.id);
        continue;
      }
      record.status = 'rejected';
      record.rejectionCode = SESSION_COMMAND_RUN_CANCELLED_CODE;
      record.completedAt = validated.cancelledAt;
      delete record.claimedBy;
      delete record.claimToken;
      delete record.leaseExpiresAt;
      this.records.set(record.id, validateSessionCommandRecord(record));
      result.cancelledCommandIds.push(record.id);
      this.notifyIfDrained(scopeFromCommand(record));
    }
    return validateCancelSessionCommandsResult(result);
  }

  async redriveDeadLetter(
    request: RedriveDeadLetterSessionCommandRequest
  ): Promise<SessionCommandRecord> {
    const validated = validateRedriveDeadLetterSessionCommandRequest(request);
    const key = sessionKey(validated.scope);
    const idempotencyKey = `${key}\u0000${validated.idempotencyKey}`;
    const fingerprint = hashCanonicalJson(validated);
    const prior = this.idempotency.get(idempotencyKey);
    if (prior) {
      if (prior.fingerprint !== fingerprint || this.duplicatePolicy === 'reject') {
        throw busError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Session command idempotency key is already used: ${validated.idempotencyKey}`
        );
      }
      const existing = this.records.get(prior.commandId);
      if (!existing) throw busError('RUNTIME_INTERNAL_ERROR', 'Session command index is corrupt');
      return { ...structuredClone(existing), status: 'reused' };
    }
    if (this.records.has(validated.id)) {
      throw busError('RUNTIME_IDEMPOTENCY_CONFLICT', `Session command id exists: ${validated.id}`);
    }
    const source = this.records.get(validated.sourceCommandId);
    if (
      !source ||
      !sameScope(scopeFromCommand(source), validated.scope) ||
      source.status !== 'dead_letter'
    ) {
      throw busError(
        'RUNTIME_SESSION_QUEUE_CONFLICT',
        'Only a dead-letter command in the requested scope can be redriven',
        { sourceCommandId: validated.sourceCommandId }
      );
    }
    this.assertCapacity(validated.scope);
    const requestedAt = validated.requestedAt ?? this.now();
    const availableAt = validated.availableAt ?? requestedAt;
    const enqueueSequence = (this.sessionSequences.get(key) ?? 0) + 1;
    const record = validateSessionCommandRecord({
      id: validated.id,
      commandType: source.commandType,
      idempotencyKey: validated.idempotencyKey,
      ...(source.tenantId === undefined ? {} : { tenantId: source.tenantId }),
      userId: source.userId,
      ...(source.workspaceId === undefined ? {} : { workspaceId: source.workspaceId }),
      sessionId: source.sessionId,
      ...(source.targetRunId === undefined ? {} : { targetRunId: source.targetRunId }),
      enqueueSequence,
      priority: validated.priority ?? source.priority,
      attempts: 0,
      maxAttempts: validated.maxAttempts ?? source.maxAttempts,
      leaseEpoch: 0,
      ...(source.payloadRef === undefined ? {} : { payloadRef: source.payloadRef }),
      payloadHash: source.payloadHash,
      status: 'queued',
      createdAt: requestedAt,
      availableAt,
      ...(validated.expiresAt === undefined ? {} : { expiresAt: validated.expiresAt }),
      redrive: {
        version: '1.0.0',
        sourceCommandId: source.id,
        operatorId: validated.operatorId,
        reason: validated.reason,
        requestedAt,
      },
    });
    const resolvedSource = validateSessionCommandRecord({
      ...source,
      status: 'dead_letter_resolved',
      deadLetterResolution: {
        version: '1.0.0',
        disposition: 'redriven',
        operatorId: validated.operatorId,
        reason: validated.reason,
        resolvedAt: requestedAt,
        redriveCommandId: record.id,
      },
    });
    this.records.set(resolvedSource.id, resolvedSource);
    this.records.set(record.id, record);
    this.idempotency.set(idempotencyKey, { commandId: record.id, fingerprint });
    this.sessionSequences.set(key, enqueueSequence);
    return structuredClone(record);
  }

  async closeDeadLetter(
    request: CloseDeadLetterSessionCommandRequest
  ): Promise<SessionCommandRecord> {
    const validated = validateCloseDeadLetterSessionCommandRequest(request);
    const record = this.records.get(validated.commandId);
    const resolution = {
      version: '1.0.0' as const,
      disposition: 'closed' as const,
      operatorId: validated.operatorId,
      reason: validated.reason,
      resolvedAt: validated.closedAt,
    };
    if (
      record &&
      sameScope(scopeFromCommand(record), validated.scope) &&
      record.status === 'dead_letter_resolved' &&
      record.deadLetterResolution?.disposition === 'closed' &&
      hashCanonicalJson(record.deadLetterResolution) === hashCanonicalJson(resolution)
    ) {
      return structuredClone(record);
    }
    if (
      !record ||
      !sameScope(scopeFromCommand(record), validated.scope) ||
      record.status !== 'dead_letter'
    ) {
      throw busError(
        'RUNTIME_SESSION_QUEUE_CONFLICT',
        'Only an unresolved dead-letter command in the requested scope can be closed',
        { commandId: validated.commandId }
      );
    }
    const updated = validateSessionCommandRecord({
      ...record,
      status: 'dead_letter_resolved',
      deadLetterResolution: resolution,
    });
    this.records.set(updated.id, updated);
    return structuredClone(updated);
  }

  async listStuck(request: ListStuckSessionCommandsRequest): Promise<StuckSessionCommand[]> {
    const validated = validateListStuckSessionCommandsRequest(request);
    const graceMs = validated.graceMs ?? 0;
    const limit = validated.limit ?? 100;
    const checkedAtMs = Date.parse(validated.checkedAt);
    return [...this.records.values()]
      .filter(
        (record) =>
          sameScope(scopeFromCommand(record), validated.scope) &&
          record.status === 'claimed' &&
          record.leaseExpiresAt !== undefined &&
          Date.parse(record.leaseExpiresAt) + graceMs <= checkedAtMs
      )
      .sort((left, right) => left.leaseExpiresAt!.localeCompare(right.leaseExpiresAt!))
      .slice(0, limit)
      .map((command) =>
        validateStuckSessionCommand({
          command: structuredClone(command),
          detectedAt: validated.checkedAt,
          overdueMs: checkedAtMs - Date.parse(command.leaseExpiresAt!),
        })
      );
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

  async health(): Promise<ProviderHealth & { details: SessionQueueHealthSnapshot }> {
    const checkedAt = this.now();
    const recoveredExpiredLeases = this.recover(checkedAt);
    const records = [...this.records.values()];
    return {
      status: 'healthy',
      checkedAt,
      details: createSessionQueueHealthSnapshot(records, checkedAt, recoveredExpiredLeases),
    };
  }

  private requireOwnedClaim(
    claim: Pick<SessionCommandClaim, 'commandId' | 'workerId' | 'claimToken' | 'leaseEpoch'>,
    at: string
  ): SessionCommandRecord {
    nonEmpty(claim.commandId, 'commandId');
    nonEmpty(claim.workerId, 'workerId');
    nonEmpty(claim.claimToken, 'claimToken');
    positiveInteger(claim.leaseEpoch, 'leaseEpoch');
    const record = this.records.get(claim.commandId);
    if (!record) {
      throw busError(
        'RUNTIME_SESSION_QUEUE_CONFLICT',
        `Session command not found: ${claim.commandId}`
      );
    }
    if (
      record.status !== 'claimed' ||
      record.claimedBy !== claim.workerId ||
      record.claimToken !== claim.claimToken ||
      record.leaseEpoch !== claim.leaseEpoch ||
      record.leaseExpiresAt === undefined ||
      isAtOrBefore(record.leaseExpiresAt, at)
    ) {
      throw busError('RUNTIME_SESSION_QUEUE_CONFLICT', 'Session command claim is not owned', {
        commandId: claim.commandId,
        workerId: claim.workerId,
        leaseEpoch: claim.leaseEpoch,
      });
    }
    return record;
  }

  private assertCapacity(scope: SessionQueueScope): void {
    const pending = [...this.records.values()].filter(isPending);
    const pendingForSession = pending.filter(
      (record) => sessionKey(scopeFromCommand(record)) === sessionKey(scope)
    ).length;
    if (pendingForSession >= this.maxPendingPerSession) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Session queue depth limit reached', {
        sessionId: scope.sessionId,
        maxPendingPerSession: this.maxPendingPerSession,
      });
    }
    const pendingForUser = pending.filter(
      (record) => userKey(scopeFromCommand(record)) === userKey(scope)
    ).length;
    if (pendingForUser >= this.maxPendingPerUser) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'User queue depth limit reached', {
        userId: scope.userId,
        maxPendingPerUser: this.maxPendingPerUser,
      });
    }
    if (pending.length >= this.maxPendingGlobal) {
      throw busError('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Global queue depth limit reached', {
        maxPendingGlobal: this.maxPendingGlobal,
      });
    }
  }

  private recover(now: string): number {
    timestamp(now, 'recovery.now');
    const affected = new Map<string, SessionQueueScope>();
    let recoveredExpiredLeases = 0;
    for (const record of this.records.values()) {
      if (
        record.status === 'claimed' &&
        record.leaseExpiresAt !== undefined &&
        isAtOrBefore(record.leaseExpiresAt, now)
      ) {
        recoveredExpiredLeases += 1;
        const exhausted = record.attempts >= record.maxAttempts;
        record.leaseRecoveries = [
          ...(record.leaseRecoveries ?? []),
          {
            version: '1.0.0',
            previousWorkerId: record.claimedBy!,
            previousLeaseEpoch: record.leaseEpoch,
            leaseExpiredAt: record.leaseExpiresAt,
            recoveredAt: now,
            disposition: exhausted ? 'dead_lettered' : 'requeued',
          },
        ];
        record.status = exhausted ? 'dead_letter' : 'queued';
        if (exhausted) {
          record.rejectionCode = 'claim_lease_expired_after_attempt_budget';
          record.completedAt = now;
          affected.set(sessionKey(scopeFromCommand(record)), scopeFromCommand(record));
        }
        delete record.claimedBy;
        delete record.claimToken;
        delete record.leaseExpiresAt;
        validateSessionCommandRecord(record);
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
    return recoveredExpiredLeases;
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

export function createSessionQueueHealthSnapshot(
  records: readonly SessionCommandRecord[],
  checkedAt: string,
  recoveredExpiredLeases = 0
): SessionQueueHealthSnapshot {
  timestamp(checkedAt, 'health.checkedAt');
  const pending = records.filter(isPending);
  const oldestCreatedAtMs =
    pending.length === 0
      ? undefined
      : Math.min(...pending.map((record) => Date.parse(record.createdAt)));
  return validateSessionQueueHealthSnapshot({
    version: '1.0.0',
    totalCommands: records.length,
    pendingCommands: pending.length,
    queuedCommands: pending.filter((record) => record.status === 'queued').length,
    claimedCommands: pending.filter((record) => record.status === 'claimed').length,
    deadLetterCommands: records.filter((record) => record.status === 'dead_letter').length,
    resolvedDeadLetterCommands: records.filter((record) => record.status === 'dead_letter_resolved')
      .length,
    retryingCommands: pending.filter((record) => record.attempts > 0).length,
    redeliveredCommands: records.filter((record) => record.leaseEpoch > 1).length,
    recoveredExpiredLeases,
    leaseRecoveryCount: records.reduce(
      (count, record) => count + (record.leaseRecoveries?.length ?? 0),
      0
    ),
    ...(oldestCreatedAtMs === undefined
      ? {}
      : { oldestPendingAgeMs: Math.max(0, Date.parse(checkedAt) - oldestCreatedAtMs) }),
  });
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

function userKey(scope: Pick<SessionQueueScope, 'tenantId' | 'userId'>): string {
  return `${scope.tenantId ?? ''}\u0000${scope.userId}`;
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
  delete clone.claimToken;
  delete clone.leaseExpiresAt;
  return clone;
}

function claimToken(
  record: Pick<SessionCommandRecord, 'id' | 'attempts' | 'leaseEpoch'>,
  workerId: string,
  claimedAt: string
): string {
  return hashCanonicalJson({
    commandId: record.id,
    workerId,
    attempts: record.attempts,
    leaseEpoch: record.leaseEpoch,
    claimedAt,
  });
}

function claimFromRecord(record: SessionCommandRecord): SessionCommandClaim {
  if (
    record.status !== 'claimed' ||
    record.claimedBy === undefined ||
    record.claimToken === undefined ||
    record.leaseExpiresAt === undefined
  ) {
    throw busError('RUNTIME_INTERNAL_ERROR', 'Session command claim is incomplete');
  }
  return {
    commandId: record.id,
    workerId: record.claimedBy,
    claimToken: record.claimToken,
    leaseEpoch: record.leaseEpoch,
    leaseExpiresAt: record.leaseExpiresAt,
  };
}

function positiveInteger(value: number, label: string): void {
  positive(value, label);
  if (!Number.isInteger(value)) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be a positive integer`);
  }
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be a valid timestamp`);
  }
}
