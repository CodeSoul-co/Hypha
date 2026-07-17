import {
  createPersistedEventBatch,
  eventStreamKey,
  FrameworkError,
  hashEventAppendRequest,
  streamHeadListLimit,
  validateEventAppendRequest,
  type EventAppendRequestV2,
  type EventAppendResult,
  type EventStoreV2,
  type EventStreamHead,
  type EventStreamScope,
  type ListEventStreamHeadsRequest,
  type ListEventStreamHeadsResult,
  type PersistedFrameworkEvent,
  type ProviderHealth,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteEventStoreV2Options {
  filename: string;
  now?: () => string;
}

export class SQLiteEventStoreV2 implements EventStoreV2 {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;

  constructor(options: SQLiteEventStoreV2Options) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async append(request: EventAppendRequestV2): Promise<EventAppendResult> {
    validateEventAppendRequest(request);
    const streamKey = eventStreamKey(request.scope);
    const requestHash = hashEventAppendRequest(request);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.db
        .prepare(
          'SELECT request_hash, result_json FROM runtime_event_append_idempotency ' +
            'WHERE stream_key = ? AND idempotency_key = ?'
        )
        .get(streamKey, request.idempotencyKey);
      if (prior) {
        if (String(prior.request_hash) !== requestHash) {
          conflict(
            'RUNTIME_IDEMPOTENCY_CONFLICT',
            'Idempotency key was already used for a different append request',
            { ...request.scope }
          );
        }
        const reused = {
          ...(JSON.parse(String(prior.result_json)) as EventAppendResult),
          reused: true,
        };
        this.db.exec('COMMIT');
        return clone(reused);
      }

      const headRow = this.db
        .prepare(
          'SELECT last_sequence, run_revision, fencing_token FROM runtime_event_streams ' +
            'WHERE stream_key = ?'
        )
        .get(streamKey);
      const lastSequence = Number(headRow?.last_sequence ?? 0);
      const runRevision = Number(headRow?.run_revision ?? 0);
      const currentFencingToken = optionalNumber(headRow?.fencing_token);
      assertAppendPosition(request, lastSequence, runRevision, currentFencingToken);
      assertUniqueEventIds(this.db, request);

      const globalRow = this.db
        .prepare('SELECT COALESCE(MAX(global_sequence), 0) AS value FROM runtime_events')
        .get();
      const firstGlobalSequence = Number(globalRow?.value ?? 0) + 1;
      const recordedAt = this.now();
      const events = createPersistedEventBatch(
        request,
        lastSequence + 1,
        firstGlobalSequence,
        recordedAt
      );
      const insertEvent = this.db.prepare(
        'INSERT INTO runtime_events ' +
          '(event_id, stream_key, run_id, user_id, tenant_id, sequence, global_sequence, type, ' +
          'schema_version, timestamp, recorded_at, correlation_id, causation_id, idempotency_key, ' +
          'payload_hash, event_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      );
      for (const event of events) {
        insertEvent.run(
          event.id,
          streamKey,
          event.runId,
          event.userId,
          event.tenantId ?? null,
          event.sequence,
          event.globalSequence,
          event.type,
          event.version,
          event.timestamp,
          event.recordedAt,
          event.correlationId ?? null,
          event.causationId ?? null,
          event.idempotencyKey ?? request.idempotencyKey,
          event.payloadHash,
          JSON.stringify(event)
        );
      }

      const nextRevision = runRevision + 1;
      const nextLastSequence = lastSequence + events.length;
      const nextFencingToken = request.fencingToken ?? currentFencingToken;
      this.db
        .prepare(
          'INSERT INTO runtime_event_streams ' +
            '(stream_key, tenant_id, user_id, run_id, last_sequence, run_revision, fencing_token, updated_at) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?) ' +
            'ON CONFLICT(stream_key) DO UPDATE SET ' +
            'last_sequence = excluded.last_sequence, run_revision = excluded.run_revision, ' +
            'fencing_token = excluded.fencing_token, updated_at = excluded.updated_at'
        )
        .run(
          streamKey,
          request.scope.tenantId ?? null,
          request.scope.userId,
          request.scope.runId,
          nextLastSequence,
          nextRevision,
          nextFencingToken ?? null,
          recordedAt
        );

      const result: EventAppendResult = {
        events,
        firstSequence: events[0].sequence,
        lastSequence: events[events.length - 1].sequence,
        runRevision: nextRevision,
        reused: false,
      };
      this.db
        .prepare(
          'INSERT INTO runtime_event_append_idempotency ' +
            '(stream_key, idempotency_key, request_hash, first_sequence, last_sequence, result_json) ' +
            'VALUES (?, ?, ?, ?, ?, ?)'
        )
        .run(
          streamKey,
          request.idempotencyKey,
          requestHash,
          result.firstSequence,
          result.lastSequence,
          JSON.stringify(result)
        );
      this.db.exec('COMMIT');
      return clone(result);
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_APPEND_FAILED',
        message: 'SQLite event append transaction failed',
        context: { ...request.scope },
        cause: error,
      });
    }
  }

  async readStream(scope: EventStreamScope, fromSequence = 1): Promise<PersistedFrameworkEvent[]> {
    const streamKey = eventStreamKey(scope);
    assertPositiveSequence(fromSequence);
    return this.db
      .prepare(
        'SELECT event_json FROM runtime_events ' +
          'WHERE stream_key = ? AND sequence >= ? ORDER BY sequence ASC'
      )
      .all(streamKey, fromSequence)
      .map((row) => JSON.parse(String(row.event_json)) as PersistedFrameworkEvent);
  }

  async readById(
    scope: EventStreamScope,
    eventId: string
  ): Promise<PersistedFrameworkEvent | null> {
    const row = this.db
      .prepare('SELECT event_json FROM runtime_events WHERE stream_key = ? AND event_id = ?')
      .get(eventStreamKey(scope), eventId);
    return row ? (JSON.parse(String(row.event_json)) as PersistedFrameworkEvent) : null;
  }

  async getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null> {
    const row = this.db
      .prepare(
        'SELECT tenant_id, user_id, run_id, last_sequence, run_revision, fencing_token, updated_at ' +
          'FROM runtime_event_streams WHERE stream_key = ?'
      )
      .get(eventStreamKey(scope));
    if (!row) return null;
    return {
      scope: {
        tenantId: optionalString(row.tenant_id),
        userId: String(row.user_id),
        runId: String(row.run_id),
      },
      lastSequence: Number(row.last_sequence),
      runRevision: Number(row.run_revision),
      fencingToken: optionalNumber(row.fencing_token),
      updatedAt: String(row.updated_at),
    };
  }

  async listStreamHeads(
    request: ListEventStreamHeadsRequest = {}
  ): Promise<ListEventStreamHeadsResult> {
    const limit = streamHeadListLimit(request.limit);
    const rows = request.cursor
      ? this.db
          .prepare(
            'SELECT stream_key, tenant_id, user_id, run_id, last_sequence, run_revision, ' +
              'fencing_token, updated_at FROM runtime_event_streams WHERE stream_key > ? ' +
              'ORDER BY stream_key ASC LIMIT ?'
          )
          .all(request.cursor, limit + 1)
      : this.db
          .prepare(
            'SELECT stream_key, tenant_id, user_id, run_id, last_sequence, run_revision, ' +
              'fencing_token, updated_at FROM runtime_event_streams ' +
              'ORDER BY stream_key ASC LIMIT ?'
          )
          .all(limit + 1);
    const page = rows.slice(0, limit);
    return {
      heads: page.map(streamHeadFromRow),
      ...(rows.length > limit && page.length > 0
        ? { nextCursor: String(page[page.length - 1].stream_key) }
        : {}),
    };
  }

  async health(): Promise<ProviderHealth> {
    const checkedAt = this.now();
    try {
      this.db.prepare('SELECT 1 AS ok').get();
      return { status: 'healthy', checkedAt };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt,
        message: error instanceof Error ? error.message : 'SQLite health check failed',
      };
    }
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_event_streams (' +
        'stream_key TEXT PRIMARY KEY, tenant_id TEXT, user_id TEXT NOT NULL, run_id TEXT NOT NULL, ' +
        'last_sequence INTEGER NOT NULL, run_revision INTEGER NOT NULL, fencing_token INTEGER, ' +
        'updated_at TEXT NOT NULL, UNIQUE(tenant_id, user_id, run_id))'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_events (' +
        'event_id TEXT PRIMARY KEY, stream_key TEXT NOT NULL, run_id TEXT NOT NULL, user_id TEXT NOT NULL, ' +
        'tenant_id TEXT, sequence INTEGER NOT NULL, global_sequence INTEGER NOT NULL UNIQUE, ' +
        'type TEXT NOT NULL, schema_version TEXT NOT NULL, timestamp TEXT NOT NULL, recorded_at TEXT NOT NULL, ' +
        'correlation_id TEXT, causation_id TEXT, idempotency_key TEXT NOT NULL, payload_hash TEXT NOT NULL, ' +
        'event_json TEXT NOT NULL, UNIQUE(stream_key, sequence), ' +
        'FOREIGN KEY(stream_key) REFERENCES runtime_event_streams(stream_key) ' +
        'DEFERRABLE INITIALLY DEFERRED)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_event_append_idempotency (' +
        'stream_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL, ' +
        'first_sequence INTEGER NOT NULL, last_sequence INTEGER NOT NULL, result_json TEXT NOT NULL, ' +
        'PRIMARY KEY(stream_key, idempotency_key))'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS idx_runtime_events_stream_sequence ' +
        'ON runtime_events(stream_key, sequence); ' +
        'CREATE INDEX IF NOT EXISTS idx_runtime_events_correlation ' +
        'ON runtime_events(correlation_id); ' +
        'CREATE INDEX IF NOT EXISTS idx_runtime_events_type ' +
        'ON runtime_events(type)'
    );
  }
}

function assertAppendPosition(
  request: EventAppendRequestV2,
  lastSequence: number,
  runRevision: number,
  currentFencingToken?: number
): void {
  if (request.expectedLastSequence !== lastSequence) {
    conflict('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict', {
      ...request.scope,
      expectedLastSequence: request.expectedLastSequence,
      actualLastSequence: lastSequence,
    });
  }
  if (request.expectedRunRevision !== undefined && request.expectedRunRevision !== runRevision) {
    conflict('RUNTIME_RUN_CONFLICT', 'Run revision conflict', {
      ...request.scope,
      expectedRunRevision: request.expectedRunRevision,
      actualRunRevision: runRevision,
    });
  }
  if (
    request.fencingToken !== undefined &&
    currentFencingToken !== undefined &&
    request.fencingToken < currentFencingToken
  ) {
    conflict('RUNTIME_FENCING_REJECTED', 'Stale fencing token rejected', {
      ...request.scope,
      fencingToken: request.fencingToken,
      currentFencingToken,
    });
  }
}

function assertUniqueEventIds(db: SqliteDatabaseSync, request: EventAppendRequestV2): void {
  const ids = new Set<string>();
  const find = db.prepare('SELECT event_id FROM runtime_events WHERE event_id = ?');
  for (const event of request.events) {
    if (ids.has(event.id) || find.get(event.id)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Event id already exists', {
        eventId: event.id,
      });
    }
    ids.add(event.id);
  }
}

function assertPositiveSequence(sequence: number): void {
  if (!Number.isInteger(sequence) || sequence < 1) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: 'fromSequence must be a positive integer',
    });
  }
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // The transaction may already have been committed on an idempotent read.
  }
}

function optionalNumber(value: unknown): number | undefined {
  return value === undefined || value === null ? undefined : Number(value);
}

function optionalString(value: unknown): string | undefined {
  return value === undefined || value === null ? undefined : String(value);
}

function streamHeadFromRow(row: Record<string, unknown>): EventStreamHead {
  return {
    scope: {
      ...(optionalString(row.tenant_id) === undefined
        ? {}
        : { tenantId: optionalString(row.tenant_id) }),
      userId: String(row.user_id),
      runId: String(row.run_id),
    },
    lastSequence: Number(row.last_sequence),
    runRevision: Number(row.run_revision),
    ...(optionalNumber(row.fencing_token) === undefined
      ? {}
      : { fencingToken: optionalNumber(row.fencing_token) }),
    updatedAt: String(row.updated_at),
  };
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
