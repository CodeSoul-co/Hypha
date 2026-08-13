import {
  FrameworkError,
  hashCanonicalJson,
  validateRuntimeCapacityAcquireRequest,
  validateRuntimeCapacityAssertionRequest,
  validateRuntimeCapacityLease,
  validateRuntimeCapacityPolicy,
  validateRuntimeCapacityReleaseRequest,
  validateRuntimeCapacityRenewRequest,
  validateRuntimeCapacityUsage,
  validateRuntimeCapacityUsageRequest,
  type RuntimeCapacityAcquireRequest,
  type RuntimeCapacityAssertionRequest,
  type RuntimeCapacityLease,
  type RuntimeCapacityLeaseGuard,
  type RuntimeCapacityPolicy,
  type RuntimeCapacityReleaseRequest,
  type RuntimeCapacityRenewRequest,
  type RuntimeCapacityScope,
  type RuntimeCapacitySemaphore,
  type RuntimeCapacityUsage,
  type RuntimeCapacityUsageRequest,
} from '@codesoul-co/hypha-core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteRuntimeCapacitySemaphoreOptions {
  filename: string;
  policy: RuntimeCapacityPolicy;
}

export class SQLiteRuntimeCapacitySemaphore implements RuntimeCapacitySemaphore {
  private readonly db: SqliteDatabaseSync;
  private readonly policy: RuntimeCapacityPolicy;
  private closed = false;

  constructor(options: SQLiteRuntimeCapacitySemaphoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.policy = validateRuntimeCapacityPolicy(options.policy);
    try {
      this.initialize();
      this.assertPolicy();
    } catch (error) {
      this.db.close?.();
      throw error;
    }
  }

  async acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null> {
    const validated = validateRuntimeCapacityAcquireRequest(request);
    return this.transaction('acquire', () => {
      const identity = idempotencyIdentity(validated);
      const requestHash = hashCanonicalJson(validated);
      const prior = this.db
        .prepare(
          'SELECT request_hash, lease_id FROM runtime_capacity_idempotency WHERE identity = ?'
        )
        .get(identity);
      if (prior) {
        if (String(prior.request_hash) !== requestHash) {
          idempotencyConflict(validated.idempotencyKey);
        }
        return this.requireLease(String(prior.lease_id));
      }
      if (this.readLease(validated.requestedLeaseId)) {
        idempotencyConflict(validated.requestedLeaseId);
      }
      this.purge(validated.acquiredAt);
      const tenantKey = validated.tenantId ?? '';
      const limits = this.policy.limits[validated.kind];
      const globalActive = this.activeCount(
        'tenant_key = ? AND kind = ?',
        tenantKey,
        validated.kind
      );
      const userActive = this.activeCount(
        'tenant_key = ? AND kind = ? AND user_id = ?',
        tenantKey,
        validated.kind,
        validated.userId
      );
      if (globalActive >= limits.global || userActive >= limits.perUser) return null;

      const fencingToken = this.nextFencingToken(tenantKey, validated.kind);
      const lease = validateRuntimeCapacityLease({
        id: validated.requestedLeaseId,
        ...(validated.tenantId === undefined ? {} : { tenantId: validated.tenantId }),
        userId: validated.userId,
        runId: validated.runId,
        kind: validated.kind,
        operationId: validated.operationId,
        ownerId: validated.ownerId,
        fencingToken,
        policyRevision: this.policy.revision,
        acquiredAt: validated.acquiredAt,
        heartbeatAt: validated.acquiredAt,
        expiresAt: addMilliseconds(validated.acquiredAt, validated.ttlMs),
      });
      this.insertLease(lease);
      this.db
        .prepare(
          'INSERT INTO runtime_capacity_idempotency ' +
            '(identity, request_hash, lease_id) VALUES (?, ?, ?)'
        )
        .run(identity, requestHash, lease.id);
      return clone(lease);
    });
  }

  async renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease> {
    const validated = validateRuntimeCapacityRenewRequest(request);
    return this.transaction('renew', () => {
      const lease = this.requireCurrent(
        validated.scope,
        validated.kind,
        validated.guard,
        validated.renewedAt
      );
      const renewed = validateRuntimeCapacityLease({
        ...lease,
        heartbeatAt: validated.renewedAt,
        expiresAt: addMilliseconds(validated.renewedAt, validated.ttlMs),
      });
      this.updateLease(renewed, true);
      return clone(renewed);
    });
  }

  async release(request: RuntimeCapacityReleaseRequest): Promise<void> {
    const validated = validateRuntimeCapacityReleaseRequest(request);
    this.transaction('release', () => {
      const lease = this.requireCurrent(
        validated.scope,
        validated.kind,
        validated.guard,
        validated.releasedAt
      );
      this.db.prepare('UPDATE runtime_capacity_leases SET active = 0 WHERE id = ?').run(lease.id);
    });
  }

  async assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease> {
    const validated = validateRuntimeCapacityAssertionRequest(request);
    return this.transaction('assert current', () =>
      clone(
        this.requireCurrent(validated.scope, validated.kind, validated.guard, validated.checkedAt)
      )
    );
  }

  async usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage> {
    const validated = validateRuntimeCapacityUsageRequest(request);
    return this.transaction('usage', () => {
      this.purge(validated.checkedAt);
      const tenantKey = validated.tenantId ?? '';
      const limits = this.policy.limits[validated.kind];
      return validateRuntimeCapacityUsage({
        kind: validated.kind,
        policyRevision: this.policy.revision,
        globalActive: this.activeCount('tenant_key = ? AND kind = ?', tenantKey, validated.kind),
        userActive: this.activeCount(
          'tenant_key = ? AND kind = ? AND user_id = ?',
          tenantKey,
          validated.kind,
          validated.userId
        ),
        globalLimit: limits.global,
        userLimit: limits.perUser,
        checkedAt: validated.checkedAt,
      });
    });
  }

  close(): void {
    this.closed = true;
    this.db.close?.();
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_capacity_policy (' +
        'singleton INTEGER PRIMARY KEY CHECK (singleton = 1), policy_json TEXT NOT NULL, ' +
        'policy_hash TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_capacity_leases (' +
        'id TEXT PRIMARY KEY, tenant_key TEXT NOT NULL, user_id TEXT NOT NULL, run_id TEXT NOT NULL, ' +
        'kind TEXT NOT NULL, owner_id TEXT NOT NULL, fencing_token INTEGER NOT NULL, ' +
        'active INTEGER NOT NULL, expires_at TEXT NOT NULL, record_json TEXT NOT NULL, ' +
        'record_hash TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS runtime_capacity_active_idx ON runtime_capacity_leases ' +
        '(tenant_key, kind, active, expires_at)'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS runtime_capacity_user_active_idx ON runtime_capacity_leases ' +
        '(tenant_key, kind, user_id, active, expires_at)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_capacity_idempotency (' +
        'identity TEXT PRIMARY KEY, request_hash TEXT NOT NULL, lease_id TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_capacity_fencing (' +
        'tenant_key TEXT NOT NULL, kind TEXT NOT NULL, high_water INTEGER NOT NULL, ' +
        'PRIMARY KEY (tenant_key, kind))'
    );
  }

  private assertPolicy(): void {
    const policyJson = JSON.stringify(this.policy);
    const policyHash = hashCanonicalJson(this.policy);
    const stored = this.db
      .prepare('SELECT policy_hash FROM runtime_capacity_policy WHERE singleton = 1')
      .get();
    if (!stored) {
      this.db
        .prepare(
          'INSERT INTO runtime_capacity_policy (singleton, policy_json, policy_hash) VALUES (1, ?, ?)'
        )
        .run(policyJson, policyHash);
      return;
    }
    if (String(stored.policy_hash) !== policyHash) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_CONFLICT',
        message: 'SQLite Runtime capacity policy does not match the persisted policy',
        context: {
          configuredRevision: this.policy.revision,
          configuredHash: policyHash,
          persistedHash: String(stored.policy_hash),
        },
      });
    }
  }

  private requireCurrent(
    scope: RuntimeCapacityScope,
    kind: RuntimeCapacityLease['kind'],
    guard: RuntimeCapacityLeaseGuard,
    checkedAt: string
  ): RuntimeCapacityLease {
    const row = this.db
      .prepare('SELECT active, record_json, record_hash FROM runtime_capacity_leases WHERE id = ?')
      .get(guard.leaseId);
    const lease = row ? parseLease(row) : null;
    if (
      !row ||
      Number(row.active) !== 1 ||
      !lease ||
      lease.tenantId !== scope.tenantId ||
      lease.userId !== scope.userId ||
      lease.runId !== scope.runId ||
      lease.kind !== kind ||
      lease.ownerId !== guard.ownerId ||
      lease.fencingToken !== guard.fencingToken ||
      Date.parse(lease.expiresAt) <= Date.parse(checkedAt)
    ) {
      fencingRejected(guard.leaseId);
    }
    return lease;
  }

  private purge(checkedAt: string): void {
    this.db
      .prepare('UPDATE runtime_capacity_leases SET active = 0 WHERE active = 1 AND expires_at <= ?')
      .run(checkedAt);
  }

  private activeCount(predicate: string, ...params: unknown[]): number {
    return Number(
      this.db
        .prepare(
          'SELECT COUNT(*) AS count FROM runtime_capacity_leases WHERE active = 1 AND ' + predicate
        )
        .get(...params)?.count ?? 0
    );
  }

  private nextFencingToken(tenantKey: string, kind: RuntimeCapacityLease['kind']): number {
    const current = Number(
      this.db
        .prepare(
          'SELECT high_water FROM runtime_capacity_fencing WHERE tenant_key = ? AND kind = ?'
        )
        .get(tenantKey, kind)?.high_water ?? 0
    );
    const next = current + 1;
    this.db
      .prepare(
        'INSERT INTO runtime_capacity_fencing (tenant_key, kind, high_water) VALUES (?, ?, ?) ' +
          'ON CONFLICT(tenant_key, kind) DO UPDATE SET high_water = excluded.high_water'
      )
      .run(tenantKey, kind, next);
    return next;
  }

  private insertLease(lease: RuntimeCapacityLease): void {
    const json = JSON.stringify(lease);
    this.db
      .prepare(
        'INSERT INTO runtime_capacity_leases ' +
          '(id, tenant_key, user_id, run_id, kind, owner_id, fencing_token, active, expires_at, ' +
          'record_json, record_hash) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)'
      )
      .run(
        lease.id,
        lease.tenantId ?? '',
        lease.userId,
        lease.runId,
        lease.kind,
        lease.ownerId,
        lease.fencingToken,
        lease.expiresAt,
        json,
        hashCanonicalJson(lease)
      );
  }

  private updateLease(lease: RuntimeCapacityLease, active: boolean): void {
    const json = JSON.stringify(lease);
    this.db
      .prepare(
        'UPDATE runtime_capacity_leases SET active = ?, expires_at = ?, record_json = ?, ' +
          'record_hash = ? WHERE id = ?'
      )
      .run(active ? 1 : 0, lease.expiresAt, json, hashCanonicalJson(lease), lease.id);
  }

  private readLease(id: string): RuntimeCapacityLease | null {
    const row = this.db
      .prepare('SELECT record_json, record_hash FROM runtime_capacity_leases WHERE id = ?')
      .get(id);
    return row ? parseLease(row) : null;
  }

  private requireLease(id: string): RuntimeCapacityLease {
    const lease = this.readLease(id);
    if (!lease) {
      throw new FrameworkError({
        code: 'RUNTIME_INTERNAL_ERROR',
        message: `Runtime capacity idempotency record references a missing lease: ${id}`,
      });
    }
    return clone(lease);
  }

  private transaction<T>(operation: string, action: () => T): T {
    if (this.closed) invalid('SQLite Runtime capacity semaphore is closed');
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
        message: `SQLite Runtime capacity ${operation} failed`,
        cause: error,
      });
    }
  }
}

function parseLease(row: Record<string, unknown>): RuntimeCapacityLease {
  const persisted: unknown = JSON.parse(String(row.record_json));
  if (hashCanonicalJson(persisted) !== String(row.record_hash)) {
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: 'SQLite Runtime capacity lease integrity mismatch',
    });
  }
  return validateRuntimeCapacityLease(persisted);
}

function idempotencyIdentity(request: RuntimeCapacityAcquireRequest): string {
  return `${request.tenantId ?? ''}\u0000${request.userId}\u0000${request.runId}\u0000${request.idempotencyKey}`;
}

function addMilliseconds(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function clone(lease: RuntimeCapacityLease): RuntimeCapacityLease {
  return structuredClone(lease);
}

function idempotencyConflict(identity: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message: 'Runtime capacity acquisition identity was reused with different input',
    context: { identity },
  });
}

function fencingRejected(leaseId: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message: 'Runtime capacity lease is stale or not owned',
    context: { leaseId },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
