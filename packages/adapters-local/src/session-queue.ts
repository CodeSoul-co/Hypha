import {
  FrameworkError,
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_TYPES,
  hashCanonicalJson,
  validateSessionCommandRecord,
  type ClaimSessionCommandRequest,
  type CompleteSessionCommandRequest,
  type EnqueueSessionCommandRequest,
  type FailSessionCommandRequest,
  type ListSessionCommandsRequest,
  type ProviderHealth,
  type ReleaseSessionCommandRequest,
  type SessionCommandRecord,
  type SessionQueue,
  type SessionQueueScope,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteSessionQueueOptions {
  filename: string;
  now?: () => string;
  duplicatePolicy?: 'reuse' | 'reject';
  maxPendingPerSession?: number;
  maxConcurrentSessions?: number;
  priorityAgingMs?: number;
  drainPollMs?: number;
}

export class SQLiteSessionQueue implements SessionQueue {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;
  private readonly duplicatePolicy: 'reuse' | 'reject';
  private readonly maxPendingPerSession: number;
  private readonly maxConcurrentSessions: number;
  private readonly priorityAgingMs: number;
  private readonly drainPollMs: number;
  private closed = false;

  constructor(options: SQLiteSessionQueueOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.duplicatePolicy = options.duplicatePolicy ?? 'reuse';
    this.maxPendingPerSession = positiveInteger(
      options.maxPendingPerSession ?? 100,
      'maxPendingPerSession'
    );
    this.maxConcurrentSessions = positiveInteger(
      options.maxConcurrentSessions ?? Number.MAX_SAFE_INTEGER,
      'maxConcurrentSessions'
    );
    this.priorityAgingMs = positiveInteger(options.priorityAgingMs ?? 30_000, 'priorityAgingMs');
    this.drainPollMs = positiveInteger(options.drainPollMs ?? 50, 'drainPollMs');
    this.initialize();
  }

  async enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord> {
    validateEnqueueRequest(request);
    const scope = scopeFromCommand(request);
    const scopeKey = sessionKey(scope);
    const fingerprint = enqueueFingerprint(request);
    return this.transaction('enqueue', () => {
      const prior = this.db
        .prepare(
          'SELECT command_id, fingerprint FROM runtime_session_command_idempotency ' +
            'WHERE scope_key = ? AND idempotency_key = ?'
        )
        .get(scopeKey, request.idempotencyKey);
      if (prior) {
        if (String(prior.fingerprint) !== fingerprint || this.duplicatePolicy === 'reject') {
          conflict(
            'RUNTIME_IDEMPOTENCY_CONFLICT',
            'Session command idempotency key is already used',
            {
              idempotencyKey: request.idempotencyKey,
            }
          );
        }
        return { ...this.requireRecord(String(prior.command_id)), status: 'reused' };
      }
      if (this.readRecord(request.id)) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', `Session command id exists: ${request.id}`);
      }
      const pending = Number(
        this.db
          .prepare(
            "SELECT COUNT(*) AS count FROM runtime_session_commands WHERE scope_key = ? AND status IN ('queued', 'claimed')"
          )
          .get(scopeKey)?.count ?? 0
      );
      if (pending >= this.maxPendingPerSession) {
        conflict('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Session queue depth limit reached', {
          sessionId: request.sessionId,
          maxPendingPerSession: this.maxPendingPerSession,
        });
      }
      const createdAt = request.createdAt ?? this.timestamp('enqueue.createdAt');
      const availableAt = request.availableAt ?? createdAt;
      validTimestamp(createdAt, 'createdAt');
      validTimestamp(availableAt, 'availableAt');
      if (request.expiresAt) validTimestamp(request.expiresAt, 'expiresAt');
      const enqueueSequence = this.nextSequence(scopeKey);
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
      this.insertRecord(scopeKey, record);
      this.db
        .prepare(
          'INSERT INTO runtime_session_command_idempotency ' +
            '(scope_key, idempotency_key, command_id, fingerprint) VALUES (?, ?, ?, ?)'
        )
        .run(scopeKey, request.idempotencyKey, request.id, fingerprint);
      return structuredClone(record);
    });
  }

  async claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null> {
    nonEmpty(request.workerId, 'workerId');
    validTimestamp(request.now, 'claim.now');
    positiveInteger(request.leaseMs, 'leaseMs');
    if (request.scope) validateScope(request.scope);
    return this.transaction('claim', () => {
      this.recover(request.now);
      const pending = this.pendingRecords(request.scope);
      const activeSessions = new Set(
        this.pendingRecords()
          .filter((record) => record.status === 'claimed')
          .map((record) => sessionKey(scopeFromCommand(record)))
      );
      if (activeSessions.size >= this.maxConcurrentSessions) return null;
      const heads = new Map<string, SessionCommandRecord>();
      for (const record of pending) {
        const key = sessionKey(scopeFromCommand(record));
        const current = heads.get(key);
        if (!current || record.enqueueSequence < current.enqueueSequence) heads.set(key, record);
      }
      const candidate = [...heads.values()]
        .filter(
          (record) =>
            record.status === 'queued' && Date.parse(record.availableAt) <= Date.parse(request.now)
        )
        .sort((left, right) =>
          compareCandidates(left, right, request.now, this.priorityAgingMs)
        )[0];
      if (!candidate) return null;
      const claimed = validateSessionCommandRecord({
        ...candidate,
        status: 'claimed',
        attempts: candidate.attempts + 1,
        claimedBy: request.workerId,
        leaseExpiresAt: addMilliseconds(request.now, request.leaseMs),
      });
      this.updateRecord(claimed);
      return structuredClone(claimed);
    });
  }

  async complete(request: CompleteSessionCommandRequest): Promise<void> {
    validTimestamp(request.completedAt, 'completedAt');
    if (request.resultRunId !== undefined) nonEmpty(request.resultRunId, 'resultRunId');
    if (request.resultEventIds?.some((eventId) => eventId.length === 0)) {
      invalid('resultEventIds must not contain empty ids');
    }
    this.transaction('complete', () => {
      const record = this.requireOwnedClaim(
        request.commandId,
        request.workerId,
        request.completedAt
      );
      this.updateRecord(
        validateSessionCommandRecord({
          ...withoutClaim(record),
          status: 'applied',
          completedAt: request.completedAt,
          ...(request.resultRunId === undefined ? {} : { resultRunId: request.resultRunId }),
          ...(request.resultEventIds === undefined
            ? {}
            : { resultEventIds: [...request.resultEventIds] }),
        })
      );
    });
  }

  async fail(request: FailSessionCommandRequest): Promise<void> {
    nonEmpty(request.rejectionCode, 'rejectionCode');
    validTimestamp(request.failedAt, 'failedAt');
    this.transaction('fail', () => {
      const record = this.requireOwnedClaim(request.commandId, request.workerId, request.failedAt);
      this.updateRecord(
        validateSessionCommandRecord({
          ...withoutClaim(record),
          status: request.deadLetter ? 'dead_letter' : 'failed',
          rejectionCode: request.rejectionCode,
          completedAt: request.failedAt,
        })
      );
    });
  }

  async release(request: ReleaseSessionCommandRequest): Promise<void> {
    validTimestamp(request.releasedAt, 'releasedAt');
    if (request.availableAt) validTimestamp(request.availableAt, 'availableAt');
    this.transaction('release', () => {
      const record = this.requireOwnedClaim(
        request.commandId,
        request.workerId,
        request.releasedAt
      );
      const exhausted = record.attempts >= record.maxAttempts;
      this.updateRecord(
        validateSessionCommandRecord({
          ...withoutClaim(record),
          status: exhausted ? 'dead_letter' : 'queued',
          availableAt: request.availableAt ?? request.releasedAt,
          ...(exhausted
            ? { rejectionCode: 'attempt_budget_exhausted', completedAt: request.releasedAt }
            : {}),
        })
      );
    });
  }

  async list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]> {
    validateScope(request.scope);
    const fromSequence = request.fromSequence ?? 1;
    const limit = request.limit ?? 100;
    if (!Number.isInteger(fromSequence) || fromSequence < 1) {
      invalid('fromSequence must be a positive integer');
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      invalid('limit must be between 1 and 1000');
    }
    if (
      request.statuses?.some(
        (status) => !(SESSION_COMMAND_STATUSES as readonly string[]).includes(status)
      )
    ) {
      invalid('statuses contains an invalid status');
    }
    return this.transaction('list', () => {
      this.recover(this.timestamp('list.now'));
      return this.rowsForScope(sessionKey(request.scope))
        .map((row) => parseRecord(row))
        .filter(
          (record) =>
            record.enqueueSequence >= fromSequence &&
            (request.statuses === undefined || request.statuses.includes(record.status))
        )
        .sort((left, right) => left.enqueueSequence - right.enqueueSequence)
        .slice(0, limit)
        .map((record) => structuredClone(record));
    });
  }

  async drain(scope: SessionQueueScope): Promise<void> {
    validateScope(scope);
    while (!this.closed) {
      const drained = this.transaction('drain', () => {
        this.recover(this.timestamp('drain.now'));
        return this.pendingRecords(scope).length === 0;
      });
      if (drained) return;
      await delay(this.drainPollMs);
    }
  }

  async health(): Promise<ProviderHealth> {
    return this.transaction('health', () => {
      const checkedAt = this.timestamp('health.checkedAt');
      this.recover(checkedAt);
      const rows = this.pendingRecords();
      return {
        status: 'healthy',
        checkedAt,
        details: {
          commands: Number(
            this.db.prepare('SELECT COUNT(*) AS count FROM runtime_session_commands').get()
              ?.count ?? 0
          ),
          queued: rows.filter((record) => record.status === 'queued').length,
          claimed: rows.filter((record) => record.status === 'claimed').length,
        },
      };
    });
  }

  close(): void {
    this.closed = true;
    this.db.close?.();
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_commands (' +
        'id TEXT PRIMARY KEY, scope_key TEXT NOT NULL, enqueue_sequence INTEGER NOT NULL, ' +
        'priority INTEGER NOT NULL, status TEXT NOT NULL, available_at TEXT NOT NULL, ' +
        'expires_at TEXT, claimed_by TEXT, lease_expires_at TEXT, record_json TEXT NOT NULL, ' +
        'record_hash TEXT NOT NULL, UNIQUE(scope_key, enqueue_sequence))'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS runtime_session_commands_claim_idx ON runtime_session_commands ' +
        '(status, available_at, priority, enqueue_sequence)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_command_sequences (' +
        'scope_key TEXT PRIMARY KEY, last_sequence INTEGER NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_command_idempotency (' +
        'scope_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, command_id TEXT NOT NULL, ' +
        'fingerprint TEXT NOT NULL, PRIMARY KEY(scope_key, idempotency_key))'
    );
  }

  private recover(now: string): void {
    for (const record of this.pendingRecords()) {
      let changed = false;
      if (
        record.status === 'claimed' &&
        record.leaseExpiresAt !== undefined &&
        Date.parse(record.leaseExpiresAt) <= Date.parse(now)
      ) {
        const exhausted = record.attempts >= record.maxAttempts;
        record.status = exhausted ? 'dead_letter' : 'queued';
        if (exhausted) {
          record.rejectionCode = 'claim_lease_expired_after_attempt_budget';
          record.completedAt = now;
        }
        delete record.claimedBy;
        delete record.leaseExpiresAt;
        changed = true;
      }
      if (
        record.status === 'queued' &&
        record.expiresAt !== undefined &&
        Date.parse(record.expiresAt) <= Date.parse(now)
      ) {
        record.status = 'expired';
        record.completedAt = now;
        changed = true;
      }
      if (changed) this.updateRecord(validateSessionCommandRecord(record));
    }
  }

  private pendingRecords(scope?: SessionQueueScope): SessionCommandRecord[] {
    const rows = scope
      ? this.db
          .prepare(
            "SELECT record_json, record_hash FROM runtime_session_commands WHERE scope_key = ? AND status IN ('queued', 'claimed')"
          )
          .all(sessionKey(scope))
      : this.db
          .prepare(
            "SELECT record_json, record_hash FROM runtime_session_commands WHERE status IN ('queued', 'claimed')"
          )
          .all();
    return rows.map((row) => parseRecord(row));
  }

  private rowsForScope(scopeKey: string): Array<Record<string, unknown>> {
    return this.db
      .prepare('SELECT record_json, record_hash FROM runtime_session_commands WHERE scope_key = ?')
      .all(scopeKey);
  }

  private nextSequence(scopeKey: string): number {
    const current = Number(
      this.db
        .prepare('SELECT last_sequence FROM runtime_session_command_sequences WHERE scope_key = ?')
        .get(scopeKey)?.last_sequence ?? 0
    );
    const next = current + 1;
    this.db
      .prepare(
        'INSERT INTO runtime_session_command_sequences (scope_key, last_sequence) VALUES (?, ?) ' +
          'ON CONFLICT(scope_key) DO UPDATE SET last_sequence = excluded.last_sequence'
      )
      .run(scopeKey, next);
    return next;
  }

  private insertRecord(scopeKey: string, record: SessionCommandRecord): void {
    const json = JSON.stringify(record);
    this.db
      .prepare(
        'INSERT INTO runtime_session_commands ' +
          '(id, scope_key, enqueue_sequence, priority, status, available_at, expires_at, ' +
          'claimed_by, lease_expires_at, record_json, record_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .run(
        record.id,
        scopeKey,
        record.enqueueSequence,
        record.priority,
        record.status,
        record.availableAt,
        record.expiresAt ?? null,
        record.claimedBy ?? null,
        record.leaseExpiresAt ?? null,
        json,
        hashCanonicalJson(record)
      );
  }

  private updateRecord(record: SessionCommandRecord): void {
    const json = JSON.stringify(record);
    this.db
      .prepare(
        'UPDATE runtime_session_commands SET priority = ?, status = ?, available_at = ?, ' +
          'expires_at = ?, claimed_by = ?, lease_expires_at = ?, record_json = ?, record_hash = ? WHERE id = ?'
      )
      .run(
        record.priority,
        record.status,
        record.availableAt,
        record.expiresAt ?? null,
        record.claimedBy ?? null,
        record.leaseExpiresAt ?? null,
        json,
        hashCanonicalJson(record),
        record.id
      );
  }

  private readRecord(id: string): SessionCommandRecord | null {
    const row = this.db
      .prepare('SELECT record_json, record_hash FROM runtime_session_commands WHERE id = ?')
      .get(id);
    return row ? parseRecord(row) : null;
  }

  private requireRecord(id: string): SessionCommandRecord {
    const record = this.readRecord(id);
    if (!record) conflict('RUNTIME_SESSION_QUEUE_CONFLICT', `Session command not found: ${id}`);
    return record;
  }

  private requireOwnedClaim(commandId: string, workerId: string, at: string): SessionCommandRecord {
    const record = this.requireRecord(commandId);
    if (
      record.status !== 'claimed' ||
      record.claimedBy !== workerId ||
      record.leaseExpiresAt === undefined ||
      Date.parse(record.leaseExpiresAt) <= Date.parse(at)
    ) {
      conflict('RUNTIME_SESSION_QUEUE_CONFLICT', 'Session command claim is not owned', {
        commandId,
        workerId,
      });
    }
    return record;
  }

  private transaction<T>(operation: string, action: () => T): T {
    if (this.closed) invalid('SQLite Session Queue is closed');
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result = action();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      try {
        this.db.exec('ROLLBACK');
      } catch {
        // Preserve the original failure.
      }
      if (error instanceof FrameworkError) throw error;
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: `SQLite Session Queue ${operation} failed`,
        cause: error,
      });
    }
  }

  private timestamp(label: string): string {
    return validTimestamp(this.now(), label);
  }
}

function parseRecord(row: Record<string, unknown>): SessionCommandRecord {
  const json = String(row.record_json);
  const persisted: unknown = JSON.parse(json);
  if (hashCanonicalJson(persisted) !== String(row.record_hash)) {
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: `SQLite Session command integrity mismatch: ${recordId(persisted)}`,
    });
  }

  // R1b records predate durable attempt budgets. Verify their original hash before adding defaults.
  const migrated = isRecord(persisted)
    ? {
        ...persisted,
        attempts: persisted.attempts ?? (persisted.status === 'claimed' ? 1 : 0),
        maxAttempts: persisted.maxAttempts ?? DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
      }
    : persisted;
  return validateSessionCommandRecord(migrated);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function recordId(value: unknown): string {
  return isRecord(value) && typeof value.id === 'string' ? value.id : 'unknown';
}

function validateEnqueueRequest(request: EnqueueSessionCommandRequest): void {
  nonEmpty(request.id, 'command.id');
  nonEmpty(request.idempotencyKey, 'idempotencyKey');
  validateScope(scopeFromCommand(request));
  if (!SESSION_COMMAND_TYPES.includes(request.commandType)) invalid('commandType is invalid');
  if (!/^sha256:[a-f0-9]{64}$/u.test(request.payloadHash)) invalid('payloadHash is invalid');
  if (
    request.priority !== undefined &&
    (!Number.isInteger(request.priority) || request.priority < 0 || request.priority > 100)
  ) {
    invalid('priority must be an integer between 0 and 100');
  }
  if (
    request.maxAttempts !== undefined &&
    (!Number.isInteger(request.maxAttempts) ||
      request.maxAttempts < 1 ||
      request.maxAttempts > SESSION_COMMAND_MAX_ATTEMPTS_LIMIT)
  ) {
    invalid(`maxAttempts must be an integer between 1 and ${SESSION_COMMAND_MAX_ATTEMPTS_LIMIT}`);
  }
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

function compareCandidates(
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

function effectivePriority(record: SessionCommandRecord, now: string, agingMs: number): number {
  const waitingMs = Math.max(0, Date.parse(now) - Date.parse(record.availableAt));
  return Math.min(Number.MAX_SAFE_INTEGER, record.priority + Math.floor(waitingMs / agingMs));
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

function withoutClaim(record: SessionCommandRecord): SessionCommandRecord {
  const clone = structuredClone(record);
  delete clone.claimedBy;
  delete clone.leaseExpiresAt;
  return clone;
}

function addMilliseconds(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function nonEmpty(value: string, label: string): string {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must not be empty`);
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) invalid(`${label} must be a positive integer`);
  return value;
}

function validTimestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
  return value;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(
  code:
    | 'RUNTIME_IDEMPOTENCY_CONFLICT'
    | 'RUNTIME_SESSION_QUEUE_OVERFLOW'
    | 'RUNTIME_SESSION_QUEUE_CONFLICT',
  message: string,
  context?: Record<string, unknown>
): never {
  throw new FrameworkError({ code, message, context });
}
