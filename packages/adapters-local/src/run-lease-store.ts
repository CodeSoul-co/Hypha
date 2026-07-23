import {
  FrameworkError,
  hashCanonicalJson,
  runLeaseScopeKey,
  runLeaseScopeSchema,
  validateFencedRunLease,
  validateRunLeaseAcquireRequest,
  validateRunLeaseAssertionRequest,
  validateRunLeaseHeartbeatRequest,
  validateRunLeasePreemptRequest,
  validateRunLeaseReleaseRequest,
  type FencedRunLease,
  type RunLeaseAcquireRequest,
  type RunLeaseAssertionRequest,
  type RunLeaseHeartbeatRequest,
  type RunLeasePreemptRequest,
  type RunLeaseReleaseRequest,
  type RunLeaseScope,
  type RunLeaseStore,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

interface LeaseSlot {
  partitionKey: string;
  fencingTokenHighWater: number;
  revisionHighWater: number;
  active?: FencedRunLease;
}

export interface SQLiteRunLeaseStoreOptions {
  filename: string;
  now?: () => string;
}

export class SQLiteRunLeaseStore implements RunLeaseStore {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;

  constructor(options: SQLiteRunLeaseStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null> {
    const validated = validateRunLeaseAcquireRequest(request);
    const scope = scopeFromAcquire(validated);
    const scopeKey = runLeaseScopeKey(scope);
    const requestHash = hashCanonicalJson(withoutUndefined(validated));

    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.readIdempotency(scopeKey, 'acquire', validated.idempotencyKey);
      if (prior) {
        if (prior.requestHash !== requestHash) {
          conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Lease idempotency key was reused', {
            runId: validated.runId,
            idempotencyKey: validated.idempotencyKey,
          });
        }
        const result = prior.resultJson
          ? parseLease(prior.resultJson, scope, prior.resultHash)
          : null;
        this.db.exec('COMMIT');
        return result;
      }

      let slot = this.readSlot(scopeKey, scope);
      if (slot) assertPartition(slot, scope);
      if (slot?.active && !isExpired(slot.active, validated.acquiredAt)) {
        this.writeIdempotency(scopeKey, 'acquire', validated.idempotencyKey, requestHash, null);
        this.db.exec('COMMIT');
        return null;
      }
      this.assertLeaseIdUnused(validated.requestedLeaseId, validated.runId);

      slot ??= {
        partitionKey: validated.partitionKey,
        fencingTokenHighWater: 0,
        revisionHighWater: 0,
      };
      const lease = createLease(validated, slot);
      slot.active = lease;
      slot.fencingTokenHighWater = lease.fencingToken;
      slot.revisionHighWater = lease.revision;
      this.writeSlot(scopeKey, scope, slot);
      this.recordLeaseId(lease.id, scopeKey);
      this.writeIdempotency(scopeKey, 'acquire', validated.idempotencyKey, requestHash, lease);
      this.db.exec('COMMIT');
      return structuredClone(lease);
    } catch (error) {
      return this.rollbackAndThrow(error, scope);
    }
  }

  async preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease> {
    const validated = validateRunLeasePreemptRequest(request);
    const scope = scopeFromAcquire(validated);
    const scopeKey = runLeaseScopeKey(scope);
    const requestHash = hashCanonicalJson(withoutUndefined(validated));

    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.readIdempotency(scopeKey, 'preempt', validated.idempotencyKey);
      if (prior) {
        if (prior.requestHash !== requestHash || !prior.resultJson) {
          conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Lease preemption idempotency key was reused', {
            runId: validated.runId,
            idempotencyKey: validated.idempotencyKey,
          });
        }
        const result = parseLease(prior.resultJson, scope, prior.resultHash);
        this.db.exec('COMMIT');
        return result;
      }
      this.assertLeaseIdUnused(validated.requestedLeaseId, validated.runId);
      let slot = this.readSlot(scopeKey, scope);
      if (slot) assertPartition(slot, scope);
      slot ??= {
        partitionKey: validated.partitionKey,
        fencingTokenHighWater: 0,
        revisionHighWater: 0,
      };
      const lease = createLease(validated, slot);
      slot.active = lease;
      slot.fencingTokenHighWater = lease.fencingToken;
      slot.revisionHighWater = lease.revision;
      this.writeSlot(scopeKey, scope, slot);
      this.recordLeaseId(lease.id, scopeKey);
      this.writeIdempotency(scopeKey, 'preempt', validated.idempotencyKey, requestHash, lease);
      this.db.exec('COMMIT');
      return structuredClone(lease);
    } catch (error) {
      return this.rollbackAndThrow(error, scope);
    }
  }

  async heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease> {
    const validated = validateRunLeaseHeartbeatRequest(request);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const slotKey = runLeaseScopeKey(validated.scope);
      const slot = this.requireSlot(slotKey, validated.scope);
      const current = requireCurrent(slot, validated, validated.heartbeatAt);
      if (Date.parse(validated.heartbeatAt) < Date.parse(current.heartbeatAt)) {
        invalid('heartbeatAt must not precede the current heartbeat');
      }
      const next = validateFencedRunLease({
        ...current,
        heartbeatAt: validated.heartbeatAt,
        expiresAt: expiryFrom(validated.heartbeatAt, validated.ttlMs),
        revision: slot.revisionHighWater + 1,
      });
      slot.active = structuredClone(next);
      slot.revisionHighWater = next.revision;
      this.writeSlot(slotKey, validated.scope, slot);
      this.db.exec('COMMIT');
      return structuredClone(next);
    } catch (error) {
      return this.rollbackAndThrow(error, validated.scope);
    }
  }

  async release(request: RunLeaseReleaseRequest): Promise<void> {
    const validated = validateRunLeaseReleaseRequest(request);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const slotKey = runLeaseScopeKey(validated.scope);
      const slot = this.requireSlot(slotKey, validated.scope);
      requireCurrent(slot, validated, validated.releasedAt);
      delete slot.active;
      this.writeSlot(slotKey, validated.scope, slot);
      this.db.exec('COMMIT');
    } catch (error) {
      this.rollbackAndThrow(error, validated.scope);
    }
  }

  async get(scope: RunLeaseScope, checkedAt = this.now()): Promise<FencedRunLease | null> {
    const validatedScope = runLeaseScopeSchema.parse(scope);
    validTimestamp(checkedAt, 'checkedAt');
    const slot = this.readSlot(runLeaseScopeKey(validatedScope), validatedScope);
    if (!slot) return null;
    assertPartition(slot, validatedScope);
    if (
      !slot.active ||
      Date.parse(checkedAt) < Date.parse(slot.active.acquiredAt) ||
      isExpired(slot.active, checkedAt)
    ) {
      return null;
    }
    return structuredClone(slot.active);
  }

  async assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease> {
    const validated = validateRunLeaseAssertionRequest(request);
    const slot = this.requireSlot(runLeaseScopeKey(validated.scope), validated.scope);
    return structuredClone(requireCurrent(slot, validated, validated.checkedAt));
  }

  close(): void {
    this.db.close?.();
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_schema_migrations (' +
        'version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_run_lease_slots (' +
        'scope_key TEXT PRIMARY KEY, tenant_id TEXT, user_id TEXT NOT NULL, run_id TEXT NOT NULL, ' +
        'partition_key TEXT NOT NULL, fencing_high_water INTEGER NOT NULL, revision_high_water INTEGER NOT NULL, ' +
        'active_json TEXT, active_hash TEXT)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_run_lease_ids (' +
        'lease_id TEXT PRIMARY KEY, scope_key TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_run_lease_idempotency (' +
        'scope_key TEXT NOT NULL, operation TEXT NOT NULL, idempotency_key TEXT NOT NULL, ' +
        'request_hash TEXT NOT NULL, result_json TEXT, result_hash TEXT, ' +
        'PRIMARY KEY(scope_key, operation, idempotency_key))'
    );
    this.db
      .prepare(
        'INSERT OR IGNORE INTO runtime_schema_migrations (version, applied_at) VALUES (?, ?)'
      )
      .run(4, validTimestamp(this.now(), 'Run Lease migration clock'));
  }

  private readSlot(scopeKey: string, scope: RunLeaseScope): LeaseSlot | null {
    const row = this.db
      .prepare(
        'SELECT partition_key, fencing_high_water, revision_high_water, active_json, active_hash ' +
          'FROM runtime_run_lease_slots WHERE scope_key = ?'
      )
      .get(scopeKey);
    if (!row) return null;
    const active = row.active_json
      ? parseLease(row.active_json, scope, optionalString(row.active_hash))
      : undefined;
    const slot: LeaseSlot = {
      partitionKey: String(row.partition_key),
      fencingTokenHighWater: Number(row.fencing_high_water),
      revisionHighWater: Number(row.revision_high_water),
      ...(active ? { active } : {}),
    };
    if (
      !Number.isInteger(slot.fencingTokenHighWater) ||
      slot.fencingTokenHighWater < 0 ||
      !Number.isInteger(slot.revisionHighWater) ||
      slot.revisionHighWater < 0 ||
      (active &&
        (active.fencingToken > slot.fencingTokenHighWater ||
          active.revision > slot.revisionHighWater))
    ) {
      corrupt('Run Lease slot high-water marks are invalid', scope);
    }
    return slot;
  }

  private requireSlot(scopeKey: string, scope: RunLeaseScope): LeaseSlot {
    const slot = this.readSlot(scopeKey, scope);
    if (!slot) fencingRejected(scope, undefined, 'No run lease exists');
    assertPartition(slot, scope);
    return slot;
  }

  private writeSlot(scopeKey: string, scope: RunLeaseScope, slot: LeaseSlot): void {
    const activeJson = slot.active ? JSON.stringify(slot.active) : null;
    const activeHash = slot.active ? hashCanonicalJson(slot.active) : null;
    this.db
      .prepare(
        'INSERT INTO runtime_run_lease_slots ' +
          '(scope_key, tenant_id, user_id, run_id, partition_key, fencing_high_water, ' +
          'revision_high_water, active_json, active_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(scope_key) DO UPDATE SET partition_key = excluded.partition_key, ' +
          'fencing_high_water = excluded.fencing_high_water, revision_high_water = excluded.revision_high_water, ' +
          'active_json = excluded.active_json, active_hash = excluded.active_hash'
      )
      .run(
        scopeKey,
        scope.tenantId ?? null,
        scope.userId,
        scope.runId,
        slot.partitionKey,
        slot.fencingTokenHighWater,
        slot.revisionHighWater,
        activeJson,
        activeHash
      );
  }

  private readIdempotency(
    scopeKey: string,
    operation: 'acquire' | 'preempt',
    idempotencyKey: string
  ): { requestHash: string; resultJson?: string; resultHash?: string } | null {
    const row = this.db
      .prepare(
        'SELECT request_hash, result_json, result_hash FROM runtime_run_lease_idempotency ' +
          'WHERE scope_key = ? AND operation = ? AND idempotency_key = ?'
      )
      .get(scopeKey, operation, idempotencyKey);
    if (!row) return null;
    return {
      requestHash: String(row.request_hash),
      ...(optionalString(row.result_json) === undefined
        ? {}
        : { resultJson: optionalString(row.result_json) }),
      ...(optionalString(row.result_hash) === undefined
        ? {}
        : { resultHash: optionalString(row.result_hash) }),
    };
  }

  private writeIdempotency(
    scopeKey: string,
    operation: 'acquire' | 'preempt',
    idempotencyKey: string,
    requestHash: string,
    result: FencedRunLease | null
  ): void {
    this.db
      .prepare(
        'INSERT INTO runtime_run_lease_idempotency ' +
          '(scope_key, operation, idempotency_key, request_hash, result_json, result_hash) ' +
          'VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(
        scopeKey,
        operation,
        idempotencyKey,
        requestHash,
        result ? JSON.stringify(result) : null,
        result ? hashCanonicalJson(result) : null
      );
  }

  private assertLeaseIdUnused(leaseId: string, runId: string): void {
    if (
      this.db.prepare('SELECT lease_id FROM runtime_run_lease_ids WHERE lease_id = ?').get(leaseId)
    ) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Run lease id cannot be reused', {
        leaseId,
        runId,
      });
    }
  }

  private recordLeaseId(leaseId: string, scopeKey: string): void {
    this.db
      .prepare('INSERT INTO runtime_run_lease_ids (lease_id, scope_key) VALUES (?, ?)')
      .run(leaseId, scopeKey);
  }

  private rollbackAndThrow(error: unknown, scope: RunLeaseScope): never {
    rollback(this.db);
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_INTERNAL_ERROR',
      message: 'SQLite Run Lease transaction failed',
      context: { runId: scope.runId, partitionKey: scope.partitionKey },
      cause: error,
    });
  }
}

function createLease(request: RunLeaseAcquireRequest, slot: LeaseSlot): FencedRunLease {
  return validateFencedRunLease({
    id: request.requestedLeaseId,
    ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
    userId: request.userId,
    runId: request.runId,
    partitionKey: request.partitionKey,
    ownerId: request.ownerId,
    acquiredAt: request.acquiredAt,
    heartbeatAt: request.acquiredAt,
    expiresAt: expiryFrom(request.acquiredAt, request.ttlMs),
    revision: slot.revisionHighWater + 1,
    fencingToken: slot.fencingTokenHighWater + 1,
  });
}

function parseLease(value: unknown, scope: RunLeaseScope, expectedHash?: string): FencedRunLease {
  try {
    const parsed = JSON.parse(String(value));
    const lease = validateFencedRunLease(parsed);
    if (
      lease.tenantId !== scope.tenantId ||
      lease.userId !== scope.userId ||
      lease.runId !== scope.runId ||
      lease.partitionKey !== scope.partitionKey ||
      (expectedHash !== undefined && hashCanonicalJson(lease) !== expectedHash)
    ) {
      corrupt('Run Lease record failed integrity validation', scope);
    }
    return structuredClone(lease);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: 'Run Lease record is corrupt',
      context: { runId: scope.runId, partitionKey: scope.partitionKey },
      cause: error,
    });
  }
}

function requireCurrent(
  slot: LeaseSlot,
  request: RunLeaseHeartbeatRequest | RunLeaseReleaseRequest | RunLeaseAssertionRequest,
  checkedAt: string
): FencedRunLease {
  const current = slot.active;
  if (!current) fencingRejected(request.scope, request.guard, 'No active run lease exists');
  if (Date.parse(checkedAt) < Date.parse(current.acquiredAt)) {
    invalid('Lease operation time must not precede acquiredAt');
  }
  if (isExpired(current, checkedAt)) {
    fencingRejected(request.scope, request.guard, 'Run lease has expired', current);
  }
  if (
    request.guard.leaseId !== current.id ||
    request.guard.ownerId !== current.ownerId ||
    request.guard.fencingToken !== current.fencingToken
  ) {
    fencingRejected(request.scope, request.guard, 'Stale run lease guard rejected', current);
  }
  return current;
}

function scopeFromAcquire(request: RunLeaseAcquireRequest): RunLeaseScope {
  return {
    ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
    userId: request.userId,
    runId: request.runId,
    partitionKey: request.partitionKey,
  };
}

function assertPartition(slot: LeaseSlot, scope: RunLeaseScope): void {
  if (slot.partitionKey !== scope.partitionKey) {
    conflict('RUNTIME_RUN_CONFLICT', 'Run lease partition key cannot change', {
      runId: scope.runId,
      expectedPartitionKey: slot.partitionKey,
      actualPartitionKey: scope.partitionKey,
    });
  }
}

function isExpired(lease: FencedRunLease, checkedAt: string): boolean {
  validTimestamp(checkedAt, 'checkedAt');
  return Date.parse(lease.expiresAt) <= Date.parse(checkedAt);
}

function expiryFrom(timestamp: string, ttlMs: number): string {
  validTimestamp(timestamp, 'lease timestamp');
  const expiresAt = Date.parse(timestamp) + ttlMs;
  if (!Number.isSafeInteger(expiresAt)) invalid('Lease expiry is outside the supported range');
  try {
    return new Date(expiresAt).toISOString();
  } catch {
    return invalid('Lease expiry is outside the supported range');
  }
}

function validTimestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
  return value;
}

function withoutUndefined(value: object): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function optionalString(value: unknown): string | undefined {
  return value === undefined || value === null ? undefined : String(value);
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // SQLite may reject work before opening a transaction.
  }
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function corrupt(message: string, scope: RunLeaseScope): never {
  throw new FrameworkError({
    code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    message,
    context: { runId: scope.runId, partitionKey: scope.partitionKey },
  });
}

function fencingRejected(
  scope: RunLeaseScope,
  guard: { leaseId: string; ownerId: string; fencingToken: number } | undefined,
  message: string,
  current?: FencedRunLease
): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message,
    context: {
      runId: scope.runId,
      partitionKey: scope.partitionKey,
      leaseId: guard?.leaseId,
      ownerId: guard?.ownerId,
      fencingToken: guard?.fencingToken,
      currentLeaseId: current?.id,
      currentOwnerId: current?.ownerId,
      currentFencingToken: current?.fencingToken,
    },
  });
}
