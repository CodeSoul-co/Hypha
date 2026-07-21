import {
  FrameworkError,
  hashCanonicalJson,
  stateExecutionClaimScopeKey,
  stateExecutionClaimScopeSchema,
  validateStateExecutionClaim,
  validateStateExecutionClaimAcquireRequest,
  validateStateExecutionClaimAssertionRequest,
  validateStateExecutionClaimCompleteRequest,
  validateStateExecutionClaimReleaseRequest,
  validateStateExecutionClaimRenewRequest,
  type FencedRunLease,
  type RunLeaseAuthorization,
  type RunLeaseStore,
  type StateExecutionClaim,
  type StateExecutionClaimAcquireRequest,
  type StateExecutionClaimAssertionRequest,
  type StateExecutionClaimCompleteRequest,
  type StateExecutionClaimGuard,
  type StateExecutionClaimReleaseRequest,
  type StateExecutionClaimRenewRequest,
  type StateExecutionClaimScope,
  type StateExecutionClaimStore,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

interface StateClaimSlot {
  processRevision: string;
  current: StateExecutionClaim;
}

interface AcquireIdempotencyRecord {
  requestHash: string;
  resultJson?: string;
  resultHash?: string;
}

export interface SQLiteStateExecutionClaimStoreOptions {
  filename: string;
  runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
  now?: () => string;
}

export class SQLiteStateExecutionClaimStore implements StateExecutionClaimStore {
  private readonly db: SqliteDatabaseSync;
  private readonly runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
  private readonly now: () => string;

  constructor(options: SQLiteStateExecutionClaimStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.runLeaseStore = options.runLeaseStore;
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null> {
    const validated = validateStateExecutionClaimAcquireRequest(request);
    const scope = scopeFromAcquire(validated);
    const scopeKey = stateExecutionClaimScopeKey(scope);
    const requestHash = hashCanonicalJson(withoutUndefined(validated));
    const prior = this.readIdempotency(scopeKey, validated.idempotencyKey);
    if (prior) return resolveIdempotency(prior, requestHash, scope);

    const runLease = await this.authorizeRunLease(scope, validated.runLease, validated.acquiredAt);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const concurrentPrior = this.readIdempotency(scopeKey, validated.idempotencyKey);
      if (concurrentPrior) {
        const result = resolveIdempotency(concurrentPrior, requestHash, scope);
        this.db.exec('COMMIT');
        return result;
      }

      const existing = this.readSlot(scopeKey, scope);
      if (existing && existing.processRevision !== validated.processRevision) {
        conflict('RUNTIME_RUN_CONFLICT', 'State attempt process revision cannot change', {
          runId: validated.runId,
          stateId: validated.stateId,
          stateAttempt: validated.stateAttempt,
          expectedProcessRevision: existing.processRevision,
          actualProcessRevision: validated.processRevision,
        });
      }
      if (existing?.current.status === 'completed') {
        conflict('RUNTIME_RUN_CONFLICT', 'Completed state attempt cannot be claimed again', {
          runId: validated.runId,
          stateId: validated.stateId,
          stateAttempt: validated.stateAttempt,
        });
      }
      if (
        existing?.current.status === 'claimed' &&
        Date.parse(existing.current.expiresAt) > Date.parse(validated.acquiredAt)
      ) {
        this.writeIdempotency(scopeKey, validated.idempotencyKey, requestHash, null);
        this.db.exec('COMMIT');
        return null;
      }
      this.assertClaimIdUnused(validated.requestedClaimId, scope);

      const claim = validateStateExecutionClaim({
        ...(validated.tenantId === undefined ? {} : { tenantId: validated.tenantId }),
        userId: validated.userId,
        claimId: validated.requestedClaimId,
        runId: validated.runId,
        stateId: validated.stateId,
        stateAttempt: validated.stateAttempt,
        processRevision: validated.processRevision,
        expectedRunRevision: validated.expectedRunRevision,
        fencingToken: runLease.fencingToken,
        ownerId: runLease.ownerId,
        status: 'claimed',
        acquiredAt: validated.acquiredAt,
        expiresAt: boundedExpiry(validated.acquiredAt, validated.ttlMs, runLease.expiresAt),
      });
      this.writeSlot(scopeKey, scope, {
        processRevision: validated.processRevision,
        current: claim,
      });
      this.recordClaimId(claim.claimId, scopeKey);
      this.writeIdempotency(scopeKey, validated.idempotencyKey, requestHash, claim);
      this.db.exec('COMMIT');
      return structuredClone(claim);
    } catch (error) {
      return this.rollbackAndThrow(error, scope);
    }
  }

  async renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimRenewRequest(request);
    const runLease = await this.authorizeRunLease(
      validated.scope,
      validated.runLease,
      validated.renewedAt
    );
    return this.updateCurrent(validated.scope, validated.guard, validated.renewedAt, (current) => {
      assertRunFencing(current, runLease);
      return validateStateExecutionClaim({
        ...current,
        expiresAt: boundedExpiry(validated.renewedAt, validated.ttlMs, runLease.expiresAt),
      });
    });
  }

  async complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimCompleteRequest(request);
    const runLease = await this.authorizeRunLease(
      validated.scope,
      validated.runLease,
      validated.completedAt
    );
    return this.updateCurrent(
      validated.scope,
      validated.guard,
      validated.completedAt,
      (current) => {
        assertRunFencing(current, runLease);
        return validateStateExecutionClaim({
          ...current,
          status: 'completed',
          completedAt: validated.completedAt,
        });
      }
    );
  }

  async release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimReleaseRequest(request);
    const runLease = await this.authorizeRunLease(
      validated.scope,
      validated.runLease,
      validated.releasedAt
    );
    return this.updateCurrent(validated.scope, validated.guard, validated.releasedAt, (current) => {
      assertRunFencing(current, runLease);
      return validateStateExecutionClaim({
        ...current,
        status: 'released',
        releasedAt: validated.releasedAt,
      });
    });
  }

  async get(
    scope: StateExecutionClaimScope,
    checkedAt = this.now()
  ): Promise<StateExecutionClaim | null> {
    const validated = stateExecutionClaimScopeSchema.parse(scope);
    validTimestamp(checkedAt, 'checkedAt');
    const slot = this.readSlot(stateExecutionClaimScopeKey(validated), validated);
    if (!slot || Date.parse(checkedAt) < Date.parse(slot.current.acquiredAt)) return null;
    return structuredClone(effectiveClaim(slot.current, checkedAt));
  }

  async assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimAssertionRequest(request);
    const slot = this.requireSlot(validated.scope);
    return structuredClone(requireCurrentClaim(slot, validated.guard, validated.checkedAt));
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
      'CREATE TABLE IF NOT EXISTS runtime_state_claim_slots (' +
        'scope_key TEXT PRIMARY KEY, tenant_id TEXT, user_id TEXT NOT NULL, run_id TEXT NOT NULL, ' +
        'state_id TEXT NOT NULL, state_attempt INTEGER NOT NULL, process_revision TEXT NOT NULL, ' +
        'current_json TEXT NOT NULL, current_hash TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_state_claim_ids (' +
        'claim_id TEXT PRIMARY KEY, scope_key TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_state_claim_idempotency (' +
        'scope_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL, ' +
        'result_json TEXT, result_hash TEXT, PRIMARY KEY(scope_key, idempotency_key))'
    );
    this.db
      .prepare(
        'INSERT OR IGNORE INTO runtime_schema_migrations (version, applied_at) VALUES (?, ?)'
      )
      .run(5, validTimestamp(this.now(), 'State Claim migration clock'));
  }

  private async authorizeRunLease(
    scope: StateExecutionClaimScope,
    authorization: RunLeaseAuthorization,
    checkedAt: string
  ): Promise<FencedRunLease> {
    assertRunScope(scope, authorization);
    return this.runLeaseStore.assertCurrent({
      scope: authorization.scope,
      guard: authorization.guard,
      checkedAt,
    });
  }

  private updateCurrent(
    scope: StateExecutionClaimScope,
    guard: StateExecutionClaimGuard,
    checkedAt: string,
    update: (current: StateExecutionClaim) => StateExecutionClaim
  ): StateExecutionClaim {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const scopeKey = stateExecutionClaimScopeKey(scope);
      const slot = this.requireSlot(scope);
      const current = requireCurrentClaim(slot, guard, checkedAt);
      const next = update(current);
      this.writeSlot(scopeKey, scope, { ...slot, current: next });
      this.db.exec('COMMIT');
      return structuredClone(next);
    } catch (error) {
      return this.rollbackAndThrow(error, scope);
    }
  }

  private readSlot(scopeKey: string, scope: StateExecutionClaimScope): StateClaimSlot | null {
    const row = this.db
      .prepare(
        'SELECT process_revision, current_json, current_hash FROM runtime_state_claim_slots ' +
          'WHERE scope_key = ?'
      )
      .get(scopeKey);
    if (!row) return null;
    const current = parseClaim(row.current_json, scope, String(row.current_hash));
    const processRevision = String(row.process_revision);
    if (processRevision !== current.processRevision) {
      corrupt('State Claim process revision failed integrity validation', scope);
    }
    return { processRevision, current };
  }

  private requireSlot(scope: StateExecutionClaimScope): StateClaimSlot {
    const slot = this.readSlot(stateExecutionClaimScopeKey(scope), scope);
    if (!slot) claimRejected(scope, undefined, 'No state execution claim exists');
    return slot;
  }

  private writeSlot(scopeKey: string, scope: StateExecutionClaimScope, slot: StateClaimSlot): void {
    const currentJson = JSON.stringify(slot.current);
    this.db
      .prepare(
        'INSERT INTO runtime_state_claim_slots ' +
          '(scope_key, tenant_id, user_id, run_id, state_id, state_attempt, process_revision, ' +
          'current_json, current_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(scope_key) DO UPDATE SET process_revision = excluded.process_revision, ' +
          'current_json = excluded.current_json, current_hash = excluded.current_hash'
      )
      .run(
        scopeKey,
        scope.tenantId ?? null,
        scope.userId,
        scope.runId,
        scope.stateId,
        scope.stateAttempt,
        slot.processRevision,
        currentJson,
        hashCanonicalJson(slot.current)
      );
  }

  private readIdempotency(
    scopeKey: string,
    idempotencyKey: string
  ): AcquireIdempotencyRecord | null {
    const row = this.db
      .prepare(
        'SELECT request_hash, result_json, result_hash FROM runtime_state_claim_idempotency ' +
          'WHERE scope_key = ? AND idempotency_key = ?'
      )
      .get(scopeKey, idempotencyKey);
    if (!row) return null;
    const resultJson = optionalString(row.result_json);
    const resultHash = optionalString(row.result_hash);
    return {
      requestHash: String(row.request_hash),
      ...(resultJson === undefined ? {} : { resultJson }),
      ...(resultHash === undefined ? {} : { resultHash }),
    };
  }

  private writeIdempotency(
    scopeKey: string,
    idempotencyKey: string,
    requestHash: string,
    result: StateExecutionClaim | null
  ): void {
    this.db
      .prepare(
        'INSERT INTO runtime_state_claim_idempotency ' +
          '(scope_key, idempotency_key, request_hash, result_json, result_hash) ' +
          'VALUES (?, ?, ?, ?, ?)'
      )
      .run(
        scopeKey,
        idempotencyKey,
        requestHash,
        result ? JSON.stringify(result) : null,
        result ? hashCanonicalJson(result) : null
      );
  }

  private assertClaimIdUnused(claimId: string, scope: StateExecutionClaimScope): void {
    if (
      this.db
        .prepare('SELECT claim_id FROM runtime_state_claim_ids WHERE claim_id = ?')
        .get(claimId)
    ) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'State execution claim id cannot be reused', {
        claimId,
        runId: scope.runId,
        stateId: scope.stateId,
        stateAttempt: scope.stateAttempt,
      });
    }
  }

  private recordClaimId(claimId: string, scopeKey: string): void {
    this.db
      .prepare('INSERT INTO runtime_state_claim_ids (claim_id, scope_key) VALUES (?, ?)')
      .run(claimId, scopeKey);
  }

  private rollbackAndThrow(error: unknown, scope: StateExecutionClaimScope): never {
    rollback(this.db);
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_INTERNAL_ERROR',
      message: 'SQLite State Execution Claim transaction failed',
      context: {
        runId: scope.runId,
        stateId: scope.stateId,
        stateAttempt: scope.stateAttempt,
      },
      cause: error,
    });
  }
}

function resolveIdempotency(
  record: AcquireIdempotencyRecord,
  requestHash: string,
  scope: StateExecutionClaimScope
): StateExecutionClaim | null {
  if (record.requestHash !== requestHash) {
    conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'State claim idempotency key was reused', {
      runId: scope.runId,
      stateId: scope.stateId,
      stateAttempt: scope.stateAttempt,
    });
  }
  return record.resultJson ? parseClaim(record.resultJson, scope, record.resultHash) : null;
}

function parseClaim(
  value: unknown,
  scope: StateExecutionClaimScope,
  expectedHash?: string
): StateExecutionClaim {
  try {
    const claim = validateStateExecutionClaim(JSON.parse(String(value)));
    if (
      claim.tenantId !== scope.tenantId ||
      claim.userId !== scope.userId ||
      claim.runId !== scope.runId ||
      claim.stateId !== scope.stateId ||
      claim.stateAttempt !== scope.stateAttempt ||
      (expectedHash !== undefined && hashCanonicalJson(claim) !== expectedHash)
    ) {
      corrupt('State Claim record failed integrity validation', scope);
    }
    return structuredClone(claim);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: 'State Claim record is corrupt',
      context: {
        runId: scope.runId,
        stateId: scope.stateId,
        stateAttempt: scope.stateAttempt,
      },
      cause: error,
    });
  }
}

function scopeFromAcquire(request: StateExecutionClaimAcquireRequest): StateExecutionClaimScope {
  return {
    ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
    userId: request.userId,
    runId: request.runId,
    stateId: request.stateId,
    stateAttempt: request.stateAttempt,
  };
}

function scopeFromClaim(claim: StateExecutionClaim): StateExecutionClaimScope {
  return {
    ...(claim.tenantId === undefined ? {} : { tenantId: claim.tenantId }),
    userId: claim.userId,
    runId: claim.runId,
    stateId: claim.stateId,
    stateAttempt: claim.stateAttempt,
  };
}

function assertRunScope(
  scope: StateExecutionClaimScope,
  authorization: RunLeaseAuthorization
): void {
  if (
    scope.tenantId !== authorization.scope.tenantId ||
    scope.userId !== authorization.scope.userId ||
    scope.runId !== authorization.scope.runId
  ) {
    invalid('State execution claim scope must match its run lease scope');
  }
  if (authorization.guard.ownerId.trim().length === 0) invalid('Run lease owner is required');
}

function requireCurrentClaim(
  slot: StateClaimSlot,
  guard: StateExecutionClaimGuard,
  checkedAt: string
): StateExecutionClaim {
  validTimestamp(checkedAt, 'checkedAt');
  const current = slot.current;
  if (Date.parse(checkedAt) < Date.parse(current.acquiredAt)) {
    invalid('State claim operation time must not precede acquiredAt');
  }
  if (current.status !== 'claimed' || Date.parse(current.expiresAt) <= Date.parse(checkedAt)) {
    claimRejected(scopeFromClaim(current), guard, 'State execution claim is not active', current);
  }
  if (
    guard.claimId !== current.claimId ||
    guard.ownerId !== current.ownerId ||
    guard.fencingToken !== current.fencingToken
  ) {
    claimRejected(scopeFromClaim(current), guard, 'Stale state execution claim rejected', current);
  }
  return current;
}

function assertRunFencing(claim: StateExecutionClaim, runLease: FencedRunLease): void {
  if (claim.ownerId !== runLease.ownerId || claim.fencingToken !== runLease.fencingToken) {
    claimRejected(
      scopeFromClaim(claim),
      stateExecutionClaimGuard(claim),
      'State claim does not belong to the current run lease',
      claim
    );
  }
}

function stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard {
  return {
    claimId: claim.claimId,
    ownerId: claim.ownerId,
    fencingToken: claim.fencingToken,
  };
}

function effectiveClaim(claim: StateExecutionClaim, checkedAt: string): StateExecutionClaim {
  if (claim.status === 'claimed' && Date.parse(claim.expiresAt) <= Date.parse(checkedAt)) {
    return { ...claim, status: 'expired' };
  }
  return claim;
}

function boundedExpiry(start: string, ttlMs: number, leaseExpiresAt: string): string {
  const startMs = Date.parse(start);
  const leaseExpiryMs = Date.parse(leaseExpiresAt);
  const requestedExpiryMs = startMs + ttlMs;
  if (!Number.isSafeInteger(requestedExpiryMs)) invalid('State claim expiry is unsupported');
  const expiryMs = Math.min(requestedExpiryMs, leaseExpiryMs);
  if (expiryMs <= startMs) invalid('Run lease has no remaining lifetime for a state claim');
  return new Date(expiryMs).toISOString();
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

function corrupt(message: string, scope: StateExecutionClaimScope): never {
  throw new FrameworkError({
    code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    message,
    context: {
      runId: scope.runId,
      stateId: scope.stateId,
      stateAttempt: scope.stateAttempt,
    },
  });
}

function claimRejected(
  scope: StateExecutionClaimScope,
  guard: StateExecutionClaimGuard | undefined,
  message: string,
  current?: StateExecutionClaim
): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message,
    context: {
      runId: scope.runId,
      stateId: scope.stateId,
      stateAttempt: scope.stateAttempt,
      claimId: guard?.claimId,
      ownerId: guard?.ownerId,
      fencingToken: guard?.fencingToken,
      currentClaimId: current?.claimId,
      currentOwnerId: current?.ownerId,
      currentFencingToken: current?.fencingToken,
    },
  });
}
