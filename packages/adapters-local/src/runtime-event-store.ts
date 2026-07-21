import {
  FrameworkError,
  createPersistedEventBatch,
  eventStreamKey,
  hashCanonicalJson,
  hashEventAppendRequest,
  streamHeadListLimit,
  validateEventAppendRequest,
  validateEventAppendSchemas,
  type DurableEventStore,
  type EventAppendRequest,
  type EventAppendResult,
  type EventSchemaRegistry,
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

export interface SQLiteDurableEventStoreOptions {
  filename: string;
  schemaRegistry: EventSchemaRegistry;
  now?: () => string;
}

export class SQLiteDurableEventStore implements DurableEventStore {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;

  constructor(private readonly options: SQLiteDurableEventStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async append(request: EventAppendRequest): Promise<EventAppendResult> {
    validateEventAppendRequest(request);
    await validateEventAppendSchemas(this.options.schemaRegistry, request);
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
        const reused = parseAppendResult(prior.result_json, request.scope);
        this.db.exec('COMMIT');
        return clone({ ...reused, reused: true });
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
      const recordedAt = validTimestamp(this.now(), 'Event store clock');
      const events = createPersistedEventBatch(
        request,
        lastSequence + 1,
        firstGlobalSequence,
        recordedAt
      );
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
    const events = this.db
      .prepare(
        'SELECT event_json FROM runtime_events ' +
          'WHERE stream_key = ? AND sequence >= ? ORDER BY sequence ASC'
      )
      .all(streamKey, fromSequence)
      .map((row) => parseEvent(row.event_json, scope));
    assertContiguous(events);
    return events;
  }

  async readById(
    scope: EventStreamScope,
    eventId: string
  ): Promise<PersistedFrameworkEvent | null> {
    const streamKey = eventStreamKey(scope);
    if (!eventId.trim()) invalid('eventId is required');
    const row = this.db
      .prepare('SELECT event_json FROM runtime_events WHERE stream_key = ? AND event_id = ?')
      .get(streamKey, eventId);
    return row ? parseEvent(row.event_json, scope) : null;
  }

  async getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null> {
    const row = this.db
      .prepare(
        'SELECT tenant_id, user_id, run_id, last_sequence, run_revision, fencing_token, updated_at ' +
          'FROM runtime_event_streams WHERE stream_key = ?'
      )
      .get(eventStreamKey(scope));
    return row ? streamHeadFromRow(row) : null;
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
      const row = this.db.prepare('PRAGMA quick_check(1)').get();
      const result = String(row?.quick_check ?? row?.integrity_check ?? '');
      if (result !== 'ok') throw new Error(`SQLite quick_check returned ${result || 'no result'}`);
      return { status: 'healthy', checkedAt };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt,
        message: error instanceof Error ? error.message : 'SQLite health check failed',
      };
    }
  }

  close(): void {
    this.db.close?.();
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec('BEGIN IMMEDIATE');
    try {
      this.db.exec(
        'CREATE TABLE IF NOT EXISTS runtime_schema_migrations (' +
          'version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL)'
      );
      this.db.exec(
        'CREATE TABLE IF NOT EXISTS runtime_event_streams (' +
          'stream_key TEXT PRIMARY KEY, tenant_id TEXT, user_id TEXT NOT NULL, run_id TEXT NOT NULL, ' +
          'last_sequence INTEGER NOT NULL, run_revision INTEGER NOT NULL, fencing_token INTEGER, ' +
          'updated_at TEXT NOT NULL)'
      );
      this.db.exec(
        'CREATE TABLE IF NOT EXISTS runtime_events (' +
          'event_id TEXT PRIMARY KEY, stream_key TEXT NOT NULL, run_id TEXT NOT NULL, user_id TEXT NOT NULL, ' +
          'tenant_id TEXT, sequence INTEGER NOT NULL, global_sequence INTEGER NOT NULL UNIQUE, ' +
          'type TEXT NOT NULL, schema_version TEXT NOT NULL, timestamp TEXT NOT NULL, recorded_at TEXT NOT NULL, ' +
          'correlation_id TEXT, causation_id TEXT, idempotency_key TEXT NOT NULL, payload_hash TEXT NOT NULL, ' +
          'event_json TEXT NOT NULL, UNIQUE(stream_key, sequence), ' +
          'FOREIGN KEY(stream_key) REFERENCES runtime_event_streams(stream_key))'
      );
      this.db.exec(
        'CREATE TABLE IF NOT EXISTS runtime_event_append_idempotency (' +
          'stream_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL, ' +
          'first_sequence INTEGER NOT NULL, last_sequence INTEGER NOT NULL, result_json TEXT NOT NULL, ' +
          'PRIMARY KEY(stream_key, idempotency_key), ' +
          'FOREIGN KEY(stream_key) REFERENCES runtime_event_streams(stream_key))'
      );
      this.db.exec(
        'CREATE INDEX IF NOT EXISTS idx_runtime_events_stream_sequence ' +
          'ON runtime_events(stream_key, sequence); ' +
          'CREATE INDEX IF NOT EXISTS idx_runtime_events_correlation ' +
          'ON runtime_events(correlation_id); ' +
          'CREATE INDEX IF NOT EXISTS idx_runtime_events_type ON runtime_events(type)'
      );
      this.db
        .prepare(
          'INSERT OR IGNORE INTO runtime_schema_migrations (version, applied_at) VALUES (?, ?)'
        )
        .run(1, validTimestamp(this.now(), 'Runtime migration clock'));
      this.db.exec('COMMIT');
    } catch (error) {
      rollback(this.db);
      throw error;
    }
  }
}

function assertAppendPosition(
  request: EventAppendRequest,
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
    currentFencingToken !== undefined &&
    (request.fencingToken === undefined || request.fencingToken < currentFencingToken)
  ) {
    conflict('RUNTIME_FENCING_REJECTED', 'Missing or stale fencing token rejected', {
      ...request.scope,
      fencingToken: request.fencingToken,
      currentFencingToken,
    });
  }
}

function assertUniqueEventIds(db: SqliteDatabaseSync, request: EventAppendRequest): void {
  const ids = new Set<string>();
  const find = db.prepare('SELECT event_id FROM runtime_events WHERE event_id = ?');
  for (const event of request.events) {
    if (ids.has(event.id) || find.get(event.id)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Event id already exists', { eventId: event.id });
    }
    ids.add(event.id);
  }
}

function parseAppendResult(value: unknown, scope: EventStreamScope): EventAppendResult {
  try {
    const result = JSON.parse(String(value)) as EventAppendResult;
    if (!Array.isArray(result.events) || result.events.length === 0) {
      corrupt('Stored idempotency result contains no events', scope);
    }
    const events = result.events.map((event) => parseEvent(JSON.stringify(event), scope));
    if (
      result.firstSequence !== events[0].sequence ||
      result.lastSequence !== events[events.length - 1].sequence ||
      !Number.isInteger(result.runRevision)
    ) {
      corrupt('Stored idempotency result metadata is inconsistent', scope);
    }
    return { ...result, events };
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    corrupt('Stored idempotency result is not valid JSON', scope, error);
  }
}

function parseEvent(value: unknown, scope: EventStreamScope): PersistedFrameworkEvent {
  try {
    const event = JSON.parse(String(value)) as PersistedFrameworkEvent;
    if (
      !event ||
      typeof event !== 'object' ||
      !event.id ||
      !event.type ||
      !event.version ||
      event.userId !== scope.userId ||
      event.runId !== scope.runId ||
      event.tenantId !== scope.tenantId ||
      !Number.isInteger(event.sequence) ||
      event.sequence < 1 ||
      !Number.isInteger(event.globalSequence) ||
      event.globalSequence < 1 ||
      !event.recordedAt ||
      hashCanonicalJson(event.payload) !== event.payloadHash
    ) {
      corrupt('Stored Event failed integrity validation', scope, undefined, { eventId: event?.id });
    }
    return clone(event);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    corrupt('Stored Event is not valid JSON', scope, error);
  }
}

function assertContiguous(events: PersistedFrameworkEvent[]): void {
  for (let index = 1; index < events.length; index += 1) {
    if (events[index].sequence !== events[index - 1].sequence + 1) {
      corrupt('Stored Event stream sequence is not contiguous', {
        userId: events[index].userId,
        runId: events[index].runId,
        ...(events[index].tenantId === undefined ? {} : { tenantId: events[index].tenantId }),
      });
    }
  }
}

function assertPositiveSequence(sequence: number): void {
  if (!Number.isInteger(sequence) || sequence < 1)
    invalid('fromSequence must be a positive integer');
}

function streamHeadFromRow(row: Record<string, unknown>): EventStreamHead {
  const tenantId = optionalString(row.tenant_id);
  const fencingToken = optionalNumber(row.fencing_token);
  return {
    scope: {
      ...(tenantId === undefined ? {} : { tenantId }),
      userId: String(row.user_id),
      runId: String(row.run_id),
    },
    lastSequence: Number(row.last_sequence),
    runRevision: Number(row.run_revision),
    ...(fencingToken === undefined ? {} : { fencingToken }),
    updatedAt: String(row.updated_at),
  };
}

function validTimestamp(value: string, label: string): string {
  if (Number.isNaN(Date.parse(value))) invalid(`${label} must return a valid date-time`);
  return value;
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // The transaction may already have committed an idempotent read.
  }
}

function optionalNumber(value: unknown): number | undefined {
  return value === undefined || value === null ? undefined : Number(value);
}

function optionalString(value: unknown): string | undefined {
  return value === undefined || value === null ? undefined : String(value);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function corrupt(
  message: string,
  scope: EventStreamScope,
  cause?: unknown,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    message,
    context: { ...scope, ...context },
    cause,
  });
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
