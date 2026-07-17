import {
  FrameworkError,
  hashCanonicalJson,
  type ClaimSessionCommandRequest,
  type CompleteSessionCommandRequest,
  type EnqueueSessionCommandRequest,
  type EnqueueSessionCommandResult,
  type FailSessionCommandRequest,
  type InboxClaimResult,
  type ListSessionCommandsRequest,
  type ProviderHealth,
  type ReleaseSessionCommandRequest,
  type RunLease,
  type RunLeaseAcquireRequest,
  type RunLeaseHeartbeatRequest,
  type RunLeaseStore,
  type RuntimeMessageInboxRecord,
  type RuntimeMessageInboxStore,
  type RuntimeMessageOutboxRecord,
  type RuntimeMessageOutboxStore,
  type SessionCommandRecord,
  type SessionQueueV2,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteRuntimeCoordinationOptions {
  filename: string;
  now?: () => string;
}

export class SQLiteRuntimeMessageInboxStore implements RuntimeMessageInboxStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteRuntimeCoordinationOptions) {
    this.db = openDatabase(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_message_inbox (' +
        'consumer_id TEXT NOT NULL, message_id TEXT NOT NULL, payload_hash TEXT NOT NULL, ' +
        'status TEXT NOT NULL, record_json TEXT NOT NULL, ' +
        'PRIMARY KEY(consumer_id, message_id))'
    );
  }

  async claim(input: {
    consumerId: string;
    messageId: string;
    payloadHash: string;
    receivedAt: string;
    expiresAt?: string;
  }): Promise<InboxClaimResult> {
    required(input.consumerId, 'consumerId');
    required(input.messageId, 'messageId');
    timestamp(input.receivedAt, 'receivedAt');
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db
        .prepare(
          'SELECT record_json FROM runtime_message_inbox ' +
            'WHERE consumer_id = ? AND message_id = ?'
        )
        .get(input.consumerId, input.messageId);
      if (row) {
        const record = parse<RuntimeMessageInboxRecord>(row.record_json);
        record.lastReceivedAt = input.receivedAt;
        record.attempts += 1;
        let disposition: InboxClaimResult['disposition'];
        if (record.payloadHash !== input.payloadHash) disposition = 'conflict';
        else if (record.status === 'applied' || record.status === 'ignored') {
          disposition = 'duplicate';
        } else if (record.status === 'processing') disposition = 'busy';
        else {
          disposition = 'claimed';
          record.status = 'processing';
          delete record.lastError;
        }
        this.write(record);
        this.db.exec('COMMIT');
        return { disposition, record: clone(record) };
      }
      const record: RuntimeMessageInboxRecord = {
        consumerId: input.consumerId,
        messageId: input.messageId,
        payloadHash: input.payloadHash,
        status: 'processing',
        firstReceivedAt: input.receivedAt,
        lastReceivedAt: input.receivedAt,
        attempts: 1,
        ...(input.expiresAt === undefined ? {} : { expiresAt: input.expiresAt }),
      };
      this.write(record);
      this.db.exec('COMMIT');
      return { disposition: 'claimed', record: clone(record) };
    } catch (error) {
      rollback(this.db);
      throw coordinationFailure('SQLite Inbox claim failed.', error);
    }
  }

  async complete(
    consumerId: string,
    messageId: string,
    appliedEventIds: string[],
    completedAt: string
  ): Promise<void> {
    const record = this.require(consumerId, messageId);
    record.status = 'applied';
    record.appliedEventIds = [...appliedEventIds];
    record.lastReceivedAt = completedAt;
    delete record.lastError;
    this.write(record);
  }

  async fail(
    consumerId: string,
    messageId: string,
    error: string,
    failedAt: string
  ): Promise<void> {
    const record = this.require(consumerId, messageId);
    record.status = 'failed';
    record.lastError = error;
    record.lastReceivedAt = failedAt;
    this.write(record);
  }

  async get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null> {
    const row = this.db
      .prepare(
        'SELECT record_json FROM runtime_message_inbox WHERE consumer_id = ? AND message_id = ?'
      )
      .get(consumerId, messageId);
    return row ? parse<RuntimeMessageInboxRecord>(row.record_json) : null;
  }

  private require(consumerId: string, messageId: string): RuntimeMessageInboxRecord {
    const row = this.db
      .prepare(
        'SELECT record_json FROM runtime_message_inbox WHERE consumer_id = ? AND message_id = ?'
      )
      .get(consumerId, messageId);
    if (!row) conflict('RUNTIME_INTERNAL_ERROR', 'Inbox record not found.');
    return parse<RuntimeMessageInboxRecord>(row.record_json);
  }

  private write(record: RuntimeMessageInboxRecord): void {
    this.db
      .prepare(
        'INSERT INTO runtime_message_inbox ' +
          '(consumer_id, message_id, payload_hash, status, record_json) VALUES (?, ?, ?, ?, ?) ' +
          'ON CONFLICT(consumer_id, message_id) DO UPDATE SET ' +
          'payload_hash = excluded.payload_hash, status = excluded.status, ' +
          'record_json = excluded.record_json'
      )
      .run(
        record.consumerId,
        record.messageId,
        record.payloadHash,
        record.status,
        JSON.stringify(record)
      );
  }
}

export class SQLiteRuntimeMessageOutboxStore implements RuntimeMessageOutboxStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteRuntimeCoordinationOptions) {
    this.db = openDatabase(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_message_outbox (' +
        'id TEXT PRIMARY KEY, message_id TEXT NOT NULL UNIQUE, envelope_hash TEXT NOT NULL, ' +
        'state TEXT NOT NULL, available_at TEXT NOT NULL, lease_owner TEXT, lease_expires_at TEXT, ' +
        'created_at TEXT NOT NULL, record_json TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS idx_runtime_message_outbox_claim ' +
        'ON runtime_message_outbox(state, available_at, lease_expires_at)'
    );
  }

  async enqueue(input: {
    id: string;
    eventId?: string;
    envelope: RuntimeMessageOutboxRecord['envelope'];
    availableAt?: string;
    createdAt: string;
  }): Promise<RuntimeMessageOutboxRecord> {
    required(input.id, 'outbox.id');
    timestamp(input.createdAt, 'createdAt');
    const envelopeHash = hashCanonicalJson(input.envelope);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.db
        .prepare(
          'SELECT envelope_hash, record_json FROM runtime_message_outbox WHERE message_id = ?'
        )
        .get(input.envelope.messageId);
      if (prior) {
        if (String(prior.envelope_hash) !== envelopeHash) {
          conflict(
            'RUNTIME_IDEMPOTENCY_CONFLICT',
            'Outbox message id was reused with different content.'
          );
        }
        this.db.exec('COMMIT');
        return parse<RuntimeMessageOutboxRecord>(prior.record_json);
      }
      if (this.db.prepare('SELECT id FROM runtime_message_outbox WHERE id = ?').get(input.id)) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', `Outbox id already exists: ${input.id}`);
      }
      const availableAt = input.availableAt ?? input.createdAt;
      timestamp(availableAt, 'availableAt');
      const record: RuntimeMessageOutboxRecord = {
        id: input.id,
        ...(input.eventId === undefined ? {} : { eventId: input.eventId }),
        messageId: input.envelope.messageId,
        topic: input.envelope.topic,
        partitionKey: input.envelope.partitionKey,
        envelope: clone(input.envelope),
        state: 'pending',
        attempts: 0,
        availableAt,
        createdAt: input.createdAt,
        updatedAt: input.createdAt,
      };
      this.write(record, envelopeHash);
      this.db.exec('COMMIT');
      return clone(record);
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw coordinationFailure('SQLite Outbox enqueue failed.', error);
    }
  }

  async claim(input: {
    ownerId: string;
    now: string;
    leaseMs: number;
    limit: number;
  }): Promise<RuntimeMessageOutboxRecord[]> {
    required(input.ownerId, 'ownerId');
    timestamp(input.now, 'now');
    positive(input.leaseMs, 'leaseMs');
    positive(input.limit, 'limit');
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const rows = this.db
        .prepare(
          'SELECT envelope_hash, record_json FROM runtime_message_outbox WHERE ' +
            "((state IN ('pending', 'failed') AND available_at <= ?) OR " +
            "(state = 'publishing' AND lease_expires_at <= ? AND available_at <= ?)) " +
            'ORDER BY available_at ASC, created_at ASC, id ASC LIMIT ?'
        )
        .all(input.now, input.now, input.now, input.limit);
      const records = rows.map((row) => ({
        hash: String(row.envelope_hash),
        record: parse<RuntimeMessageOutboxRecord>(row.record_json),
      }));
      for (const item of records) {
        item.record.state = 'publishing';
        item.record.attempts += 1;
        item.record.leaseOwner = input.ownerId;
        item.record.leaseExpiresAt = addMs(input.now, input.leaseMs);
        item.record.updatedAt = input.now;
        this.write(item.record, item.hash);
      }
      this.db.exec('COMMIT');
      return records.map((item) => clone(item.record));
    } catch (error) {
      rollback(this.db);
      throw coordinationFailure('SQLite Outbox claim failed.', error);
    }
  }

  async markPublished(id: string, ownerId: string, publishedAt: string): Promise<void> {
    const { record, hash } = this.requireOwned(id, ownerId);
    record.state = 'published';
    record.updatedAt = publishedAt;
    delete record.leaseOwner;
    delete record.leaseExpiresAt;
    delete record.lastError;
    this.write(record, hash);
  }

  async markFailed(input: {
    id: string;
    ownerId: string;
    failedAt: string;
    error: string;
    retryAt?: string;
    deadLetter?: boolean;
  }): Promise<void> {
    const { record, hash } = this.requireOwned(input.id, input.ownerId);
    record.state = input.deadLetter ? 'dead_letter' : 'failed';
    record.availableAt = input.retryAt ?? input.failedAt;
    record.updatedAt = input.failedAt;
    record.lastError = input.error;
    delete record.leaseOwner;
    delete record.leaseExpiresAt;
    this.write(record, hash);
  }

  async get(id: string): Promise<RuntimeMessageOutboxRecord | null> {
    const row = this.db
      .prepare('SELECT record_json FROM runtime_message_outbox WHERE id = ?')
      .get(id);
    return row ? parse<RuntimeMessageOutboxRecord>(row.record_json) : null;
  }

  private requireOwned(
    id: string,
    ownerId: string
  ): { record: RuntimeMessageOutboxRecord; hash: string } {
    const row = this.db
      .prepare('SELECT envelope_hash, record_json FROM runtime_message_outbox WHERE id = ?')
      .get(id);
    if (!row) conflict('RUNTIME_INTERNAL_ERROR', `Outbox record not found: ${id}`);
    const record = parse<RuntimeMessageOutboxRecord>(row.record_json);
    if (record.state !== 'publishing' || record.leaseOwner !== ownerId) {
      conflict('RUNTIME_LEASE_CONFLICT', `Outbox lease is not owned: ${id}`);
    }
    return { record, hash: String(row.envelope_hash) };
  }

  private write(record: RuntimeMessageOutboxRecord, envelopeHash: string): void {
    this.db
      .prepare(
        'INSERT INTO runtime_message_outbox ' +
          '(id, message_id, envelope_hash, state, available_at, lease_owner, lease_expires_at, ' +
          'created_at, record_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(id) DO UPDATE SET state = excluded.state, ' +
          'available_at = excluded.available_at, lease_owner = excluded.lease_owner, ' +
          'lease_expires_at = excluded.lease_expires_at, record_json = excluded.record_json'
      )
      .run(
        record.id,
        record.messageId,
        envelopeHash,
        record.state,
        record.availableAt,
        record.leaseOwner ?? null,
        record.leaseExpiresAt ?? null,
        record.createdAt,
        JSON.stringify(record)
      );
  }
}

export interface SQLiteSessionQueueOptions extends SQLiteRuntimeCoordinationOptions {
  maxPendingPerSession?: number;
}

export class SQLiteSessionQueueV2 implements SessionQueueV2 {
  private readonly db: SqliteDatabaseSync;
  private readonly maxPendingPerSession: number;
  private readonly now: () => string;

  constructor(options: SQLiteSessionQueueOptions) {
    this.db = openDatabase(options.filename);
    this.maxPendingPerSession = positive(
      options.maxPendingPerSession ?? 100,
      'maxPendingPerSession'
    );
    this.now = options.now ?? (() => new Date().toISOString());
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_sequences (' +
        'scope_key TEXT PRIMARY KEY, last_sequence INTEGER NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_commands (' +
        'id TEXT PRIMARY KEY, scope_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, ' +
        'request_hash TEXT NOT NULL, enqueue_sequence INTEGER NOT NULL, priority INTEGER NOT NULL, ' +
        'status TEXT NOT NULL, available_at TEXT NOT NULL, expires_at TEXT, ' +
        'claimed_by TEXT, claim_token INTEGER, lease_expires_at TEXT, record_json TEXT NOT NULL, ' +
        'UNIQUE(scope_key, idempotency_key), UNIQUE(scope_key, enqueue_sequence))'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_session_claim_tokens (' +
        'singleton INTEGER PRIMARY KEY CHECK(singleton = 1), last_token INTEGER NOT NULL)'
    );
    this.db
      .prepare(
        'INSERT INTO runtime_session_claim_tokens(singleton, last_token) VALUES (1, 0) ' +
          'ON CONFLICT(singleton) DO NOTHING'
      )
      .run();
  }

  async enqueue(request: EnqueueSessionCommandRequest): Promise<EnqueueSessionCommandResult> {
    validateSessionRequest(request);
    const scope = sessionScope(request);
    const requestHash = hashCanonicalJson(jsonValue(request));
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.db
        .prepare(
          'SELECT request_hash, record_json FROM runtime_session_commands ' +
            'WHERE scope_key = ? AND idempotency_key = ?'
        )
        .get(scope, request.idempotencyKey);
      if (prior) {
        if (String(prior.request_hash) !== requestHash) {
          conflict(
            'RUNTIME_IDEMPOTENCY_CONFLICT',
            'Session command idempotency key was reused with different input.'
          );
        }
        this.db.exec('COMMIT');
        return { record: parse<SessionCommandRecord>(prior.record_json), reused: true };
      }
      if (this.db.prepare('SELECT id FROM runtime_session_commands WHERE id = ?').get(request.id)) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', `Command id already exists: ${request.id}`);
      }
      const count = this.db
        .prepare(
          'SELECT COUNT(*) AS value FROM runtime_session_commands WHERE scope_key = ? ' +
            "AND status IN ('queued', 'claimed')"
        )
        .get(scope);
      if (Number(count?.value ?? 0) >= this.maxPendingPerSession) {
        conflict('RUNTIME_SESSION_QUEUE_OVERFLOW', 'Session command queue limit reached.');
      }
      const sequenceRow = this.db
        .prepare('SELECT last_sequence FROM runtime_session_sequences WHERE scope_key = ?')
        .get(scope);
      const enqueueSequence = Number(sequenceRow?.last_sequence ?? 0) + 1;
      this.db
        .prepare(
          'INSERT INTO runtime_session_sequences(scope_key, last_sequence) VALUES (?, ?) ' +
            'ON CONFLICT(scope_key) DO UPDATE SET last_sequence = excluded.last_sequence'
        )
        .run(scope, enqueueSequence);
      const record = sessionRecord(request, enqueueSequence);
      this.writeCommand(record, scope, requestHash);
      this.db.exec('COMMIT');
      return { record: clone(record), reused: false };
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw coordinationFailure('SQLite Session Queue enqueue failed.', error);
    }
  }

  async claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null> {
    required(request.workerId, 'workerId');
    timestamp(request.now, 'now');
    positive(request.leaseMs, 'leaseMs');
    const scope = sessionScope(request);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const expiredClaims = this.db
        .prepare(
          'SELECT request_hash, record_json FROM runtime_session_commands WHERE scope_key = ? ' +
            "AND status = 'claimed' AND lease_expires_at <= ?"
        )
        .all(scope, request.now);
      for (const row of expiredClaims) {
        const record = parse<SessionCommandRecord>(row.record_json);
        record.status = 'queued';
        record.availableAt = request.now;
        clearClaim(record);
        this.writeCommand(record, scope, String(row.request_hash));
      }
      const active = this.db
        .prepare(
          "SELECT id FROM runtime_session_commands WHERE scope_key = ? AND status = 'claimed' " +
            'AND lease_expires_at > ? LIMIT 1'
        )
        .get(scope, request.now);
      if (active) {
        this.db.exec('COMMIT');
        return null;
      }
      const rows = this.db
        .prepare(
          'SELECT request_hash, record_json FROM runtime_session_commands WHERE scope_key = ? ' +
            "AND status = 'queued' AND available_at <= ? " +
            'ORDER BY priority DESC, enqueue_sequence ASC'
        )
        .all(scope, request.now);
      for (const row of rows) {
        const record = parse<SessionCommandRecord>(row.record_json);
        if (record.expiresAt && record.expiresAt <= request.now) {
          record.status = 'expired';
          record.completedAt = request.now;
          this.writeCommand(record, scope, String(row.request_hash));
          continue;
        }
        const tokenRow = this.db
          .prepare('SELECT last_token FROM runtime_session_claim_tokens WHERE singleton = 1')
          .get();
        const claimToken = Number(tokenRow?.last_token ?? 0) + 1;
        this.db
          .prepare('UPDATE runtime_session_claim_tokens SET last_token = ? WHERE singleton = 1')
          .run(claimToken);
        record.status = 'claimed';
        record.claimedBy = request.workerId;
        record.claimToken = claimToken;
        record.leaseExpiresAt = addMs(request.now, request.leaseMs);
        record.attempts += 1;
        this.writeCommand(record, scope, String(row.request_hash));
        this.db.exec('COMMIT');
        return clone(record);
      }
      this.db.exec('COMMIT');
      return null;
    } catch (error) {
      rollback(this.db);
      throw coordinationFailure('SQLite Session Queue claim failed.', error);
    }
  }

  async complete(request: CompleteSessionCommandRequest): Promise<void> {
    const item = this.requireClaim(request.id, request.workerId, request.claimToken);
    item.record.status = 'applied';
    item.record.completedAt = request.completedAt;
    item.record.resultEventIds = [...request.resultEventIds];
    if (request.resultRunId !== undefined) item.record.resultRunId = request.resultRunId;
    clearClaim(item.record);
    this.writeCommand(item.record, item.scope, item.hash);
  }

  async fail(request: FailSessionCommandRequest): Promise<void> {
    const item = this.requireClaim(request.id, request.workerId, request.claimToken);
    item.record.status = request.deadLetter ? 'dead_letter' : request.retryAt ? 'queued' : 'failed';
    item.record.rejectionCode = request.rejectionCode;
    if (request.retryAt) item.record.availableAt = request.retryAt;
    if (item.record.status !== 'queued') item.record.completedAt = request.failedAt;
    clearClaim(item.record);
    this.writeCommand(item.record, item.scope, item.hash);
  }

  async release(request: ReleaseSessionCommandRequest): Promise<void> {
    const item = this.requireClaim(request.id, request.workerId, request.claimToken);
    item.record.status = 'queued';
    item.record.availableAt = request.availableAt;
    clearClaim(item.record);
    this.writeCommand(item.record, item.scope, item.hash);
  }

  async list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]> {
    const scope = sessionScope(request);
    const rows = request.status
      ? this.db
          .prepare(
            'SELECT record_json FROM runtime_session_commands ' +
              'WHERE scope_key = ? AND status = ? ORDER BY enqueue_sequence ASC'
          )
          .all(scope, request.status)
      : this.db
          .prepare(
            'SELECT record_json FROM runtime_session_commands ' +
              'WHERE scope_key = ? ORDER BY enqueue_sequence ASC'
          )
          .all(scope);
    return rows.map((row) => parse<SessionCommandRecord>(row.record_json));
  }

  async drain(request: { tenantId?: string; userId: string; sessionId: string }): Promise<void> {
    const pending = this.db
      .prepare(
        "SELECT id FROM runtime_session_commands WHERE scope_key = ? AND status IN ('queued', 'claimed') " +
          'LIMIT 1'
      )
      .get(sessionScope(request));
    if (pending) {
      conflict('RUNTIME_SESSION_QUEUE_CONFLICT', 'Cannot drain a session with pending commands.');
    }
  }

  async health(): Promise<ProviderHealth> {
    return sqliteHealth(this.db, this.now());
  }

  private requireClaim(
    id: string,
    workerId: string,
    claimToken: number
  ): { record: SessionCommandRecord; scope: string; hash: string } {
    const row = this.db
      .prepare(
        'SELECT scope_key, request_hash, record_json FROM runtime_session_commands WHERE id = ?'
      )
      .get(id);
    if (!row) conflict('RUNTIME_INVALID_INPUT', `Command not found: ${id}`);
    const record = parse<SessionCommandRecord>(row.record_json);
    if (
      record.status !== 'claimed' ||
      record.claimedBy !== workerId ||
      record.claimToken !== claimToken
    ) {
      conflict('RUNTIME_FENCING_REJECTED', `Session command claim is stale: ${id}`);
    }
    return { record, scope: String(row.scope_key), hash: String(row.request_hash) };
  }

  private writeCommand(record: SessionCommandRecord, scope: string, requestHash: string): void {
    this.db
      .prepare(
        'INSERT INTO runtime_session_commands ' +
          '(id, scope_key, idempotency_key, request_hash, enqueue_sequence, priority, status, ' +
          'available_at, expires_at, claimed_by, claim_token, lease_expires_at, record_json) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(id) DO UPDATE SET status = excluded.status, ' +
          'available_at = excluded.available_at, expires_at = excluded.expires_at, ' +
          'claimed_by = excluded.claimed_by, claim_token = excluded.claim_token, ' +
          'lease_expires_at = excluded.lease_expires_at, record_json = excluded.record_json'
      )
      .run(
        record.id,
        scope,
        record.idempotencyKey,
        requestHash,
        record.enqueueSequence,
        record.priority,
        record.status,
        record.availableAt,
        record.expiresAt ?? null,
        record.claimedBy ?? null,
        record.claimToken ?? null,
        record.leaseExpiresAt ?? null,
        JSON.stringify(record)
      );
  }
}

export class SQLiteRunLeaseStore implements RunLeaseStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteRuntimeCoordinationOptions) {
    this.db = openDatabase(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_run_leases (' +
        'run_id TEXT PRIMARY KEY, lease_id TEXT NOT NULL UNIQUE, owner_id TEXT NOT NULL, ' +
        'expires_at TEXT NOT NULL, record_json TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_run_fencing (' +
        'run_id TEXT PRIMARY KEY, last_token INTEGER NOT NULL)'
    );
  }

  async acquire(request: RunLeaseAcquireRequest): Promise<RunLease | null> {
    validateLease(request.runId, request.ownerId, request.now, request.ttlMs);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const currentRow = this.db
        .prepare('SELECT record_json FROM runtime_run_leases WHERE run_id = ?')
        .get(request.runId);
      if (currentRow) {
        const current = parse<RunLease>(currentRow.record_json);
        if (current.expiresAt > request.now) {
          this.db.exec('COMMIT');
          return current.ownerId === request.ownerId ? current : null;
        }
      }
      const fencingRow = this.db
        .prepare('SELECT last_token FROM runtime_run_fencing WHERE run_id = ?')
        .get(request.runId);
      const fencingToken = Number(fencingRow?.last_token ?? 0) + 1;
      this.db
        .prepare(
          'INSERT INTO runtime_run_fencing(run_id, last_token) VALUES (?, ?) ' +
            'ON CONFLICT(run_id) DO UPDATE SET last_token = excluded.last_token'
        )
        .run(request.runId, fencingToken);
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
      this.writeLease(lease);
      this.db.exec('COMMIT');
      return clone(lease);
    } catch (error) {
      rollback(this.db);
      throw coordinationFailure('SQLite Run Lease acquire failed.', error);
    }
  }

  async heartbeat(request: RunLeaseHeartbeatRequest): Promise<RunLease> {
    const row = this.db
      .prepare('SELECT record_json FROM runtime_run_leases WHERE lease_id = ?')
      .get(request.leaseId);
    if (!row) conflict('RUNTIME_FENCING_REJECTED', 'Run lease heartbeat is stale.');
    const lease = parse<RunLease>(row.record_json);
    if (
      lease.ownerId !== request.ownerId ||
      lease.revision !== request.expectedRevision ||
      lease.expiresAt <= request.now
    ) {
      conflict('RUNTIME_FENCING_REJECTED', 'Run lease heartbeat is stale.');
    }
    lease.revision += 1;
    lease.heartbeatAt = request.now;
    lease.expiresAt = addMs(request.now, request.ttlMs);
    this.writeLease(lease);
    return clone(lease);
  }

  async release(leaseId: string, ownerId: string): Promise<void> {
    const row = this.db
      .prepare('SELECT owner_id FROM runtime_run_leases WHERE lease_id = ?')
      .get(leaseId);
    if (!row) return;
    if (String(row.owner_id) !== ownerId) {
      conflict('RUNTIME_FENCING_REJECTED', 'Run lease release is not owned.');
    }
    this.db.prepare('DELETE FROM runtime_run_leases WHERE lease_id = ?').run(leaseId);
  }

  async get(runId: string): Promise<RunLease | null> {
    const row = this.db
      .prepare('SELECT record_json FROM runtime_run_leases WHERE run_id = ?')
      .get(runId);
    return row ? parse<RunLease>(row.record_json) : null;
  }

  private writeLease(lease: RunLease): void {
    this.db
      .prepare(
        'INSERT INTO runtime_run_leases ' +
          '(run_id, lease_id, owner_id, expires_at, record_json) VALUES (?, ?, ?, ?, ?) ' +
          'ON CONFLICT(run_id) DO UPDATE SET lease_id = excluded.lease_id, ' +
          'owner_id = excluded.owner_id, expires_at = excluded.expires_at, ' +
          'record_json = excluded.record_json'
      )
      .run(lease.runId, lease.id, lease.ownerId, lease.expiresAt, JSON.stringify(lease));
  }
}

function openDatabase(filename: string): SqliteDatabaseSync {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const sqlite = loadSqlite(true);
  if (!sqlite) throw new Error('SQLite driver is unavailable');
  const db = new sqlite.DatabaseSync(filename);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000');
  return db;
}

function sessionRecord(
  request: EnqueueSessionCommandRequest,
  enqueueSequence: number
): SessionCommandRecord {
  return {
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
}

function validateSessionRequest(request: EnqueueSessionCommandRequest): void {
  required(request.id, 'id');
  required(request.idempotencyKey, 'idempotencyKey');
  required(request.userId, 'userId');
  required(request.sessionId, 'sessionId');
  required(request.payloadHash, 'payloadHash');
  timestamp(request.createdAt, 'createdAt');
}

function validateLease(runId: string, ownerId: string, now: string, ttlMs: number): void {
  required(runId, 'runId');
  required(ownerId, 'ownerId');
  timestamp(now, 'now');
  positive(ttlMs, 'ttlMs');
}

function sessionScope(value: { tenantId?: string; userId: string; sessionId: string }): string {
  return `${value.tenantId ?? ''}\u0000${value.userId}\u0000${value.sessionId}`;
}

function clearClaim(record: SessionCommandRecord): void {
  delete record.claimedBy;
  delete record.claimToken;
  delete record.leaseExpiresAt;
}

function sqliteHealth(db: SqliteDatabaseSync, checkedAt: string): ProviderHealth {
  try {
    db.prepare('SELECT 1 AS ok').get();
    return { status: 'healthy', checkedAt };
  } catch (error) {
    return {
      status: 'unhealthy',
      checkedAt,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

function parse<T>(value: unknown): T {
  return JSON.parse(String(value)) as T;
}

function jsonValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function addMs(value: string, milliseconds: number): string {
  return new Date(Date.parse(value) + milliseconds).toISOString();
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    conflict('RUNTIME_INVALID_INPUT', `${label} must be a non-empty string.`);
  }
}

function positive(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) {
    conflict('RUNTIME_INVALID_INPUT', `${label} must be a positive integer.`);
  }
  return value;
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    conflict('RUNTIME_INVALID_INPUT', `${label} must be a valid timestamp.`);
  }
}

function conflict(code: string, message: string): never {
  throw new FrameworkError({ code, message });
}

function coordinationFailure(message: string, cause: unknown): FrameworkError {
  if (cause instanceof FrameworkError) return cause;
  return new FrameworkError({ code: 'RUNTIME_INTERNAL_ERROR', message, cause });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // Ignore when SQLite rejected work before opening a transaction.
  }
}
