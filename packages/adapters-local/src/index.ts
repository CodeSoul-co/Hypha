import type {
  EventFilter,
  EventStore,
  FrameworkEvent,
  TraceRecorder,
} from '@hypha/core';
import type {
  ArtifactMeta,
  ArtifactRef,
  ArtifactStoreProvider,
  EmbeddingProvider,
  StructuredQuery,
  StructuredStoreProvider,
  VectorIndexProvider,
  VectorQuery,
  VectorRecord,
  VectorSearchResult,
} from '@hypha/memory';
import {
  createFileArtifactStorageProfile,
  createLocalVectorStorageProfile,
  createSQLiteStorageProfile,
  type StorageProviderProfile,
} from '@hypha/storage';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { HybridMemoryProvider } from '@hypha/memory';

interface SqliteDatabaseSync {
  exec(sql: string): void;
  prepare(sql: string): {
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Array<Record<string, unknown>>;
    run(...params: unknown[]): unknown;
  };
}

interface SqliteModule {
  DatabaseSync: new (filename: string) => SqliteDatabaseSync;
}

export interface LocalAdapterProfile {
  id: string;
  type: 'sqlite' | 'local-vector' | 'file-artifact';
  rootPath?: string;
  options?: Record<string, unknown>;
}

export const LOCAL_ADAPTER_TYPES = ['sqlite', 'local-vector', 'file-artifact'] as const;

export interface LocalStorageBackboneOptions {
  rootPath: string;
  sqliteMode?: SQLiteEventStoreOptions['mode'];
  eventDbFilename?: string;
  structuredDbFilename?: string;
  vectorFilename?: string;
  artifactRootPath?: string;
  memoryTableName?: string;
  embeddings?: EmbeddingProvider;
}

export interface LocalStorageBackbone {
  profiles: StorageProviderProfile[];
  eventStore: SQLiteEventStore;
  structured: SQLiteStructuredStore;
  vector: LocalVectorIndexProvider;
  artifacts: FileArtifactStore;
  embeddings: EmbeddingProvider;
  memory: HybridMemoryProvider;
}

export function createLocalStorageBackbone(
  options: LocalStorageBackboneOptions
): LocalStorageBackbone {
  const rootPath = path.resolve(options.rootPath);
  const eventDbFilename = options.eventDbFilename ?? path.join(rootPath, 'events.sqlite');
  const structuredDbFilename = options.structuredDbFilename ?? path.join(rootPath, 'structured.sqlite');
  const vectorFilename = options.vectorFilename ?? path.join(rootPath, 'vectors.json');
  const artifactRootPath = options.artifactRootPath ?? path.join(rootPath, 'artifacts');
  const embeddings = options.embeddings ?? new MockEmbeddingProvider();
  const structured = new SQLiteStructuredStore({
    filename: structuredDbFilename,
    mode: options.sqliteMode,
  });
  const vector = new LocalVectorIndexProvider({ filename: vectorFilename });
  const artifacts = new FileArtifactStore({ rootPath: artifactRootPath });
  const eventStore = new SQLiteEventStore({
    filename: eventDbFilename,
    mode: options.sqliteMode,
  });
  return {
    profiles: createLocalStorageProfiles({
      eventDbFilename,
      structuredDbFilename,
      vectorFilename,
      artifactRootPath,
    }),
    eventStore,
    structured,
    vector,
    artifacts,
    embeddings,
    memory: new HybridMemoryProvider({
      structured,
      vector,
      artifacts,
      embeddings,
      tableName: options.memoryTableName,
    }),
  };
}

export function createLocalStorageProfiles(input: {
  eventDbFilename: string;
  structuredDbFilename: string;
  vectorFilename: string;
  artifactRootPath: string;
}): StorageProviderProfile[] {
  return [
    createSQLiteStorageProfile({
      id: 'storage.sqlite.events',
      role: 'event_log',
      uri: `file:${input.eventDbFilename}`,
      database: input.eventDbFilename,
    }),
    createSQLiteStorageProfile({
      id: 'storage.sqlite.structured',
      role: 'source_of_truth',
      uri: `file:${input.structuredDbFilename}`,
      database: input.structuredDbFilename,
    }),
    createLocalVectorStorageProfile({
      id: 'storage.local-vector.semantic',
      uri: `file:${input.vectorFilename}`,
      database: input.vectorFilename,
    }),
    createFileArtifactStorageProfile({
      id: 'storage.file-artifact.local',
      uri: `file:${input.artifactRootPath}`,
      rootPath: input.artifactRootPath,
    }),
  ];
}

export interface SQLiteEventStoreOptions {
  filename: string;
  mode?: 'auto' | 'node-sqlite' | 'json';
  jsonFallbackFilename?: string;
}

export class SQLiteEventStore implements EventStore, TraceRecorder {
  private readonly backend: EventStore & TraceRecorder;

  constructor(options: SQLiteEventStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = options.mode === 'json' ? null : loadNodeSqlite(options.mode === 'node-sqlite');
    this.backend = sqlite
      ? new NodeSQLiteEventStoreBackend(options.filename, sqlite)
      : new JsonEventStoreBackend(options.jsonFallbackFilename ?? `${options.filename}.json`);
  }

  async append(event: FrameworkEvent): Promise<void> {
    await this.backend.append(event);
  }

  async record(event: FrameworkEvent): Promise<void> {
    await this.backend.record(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    return this.backend.list(filter);
  }
}

export interface SQLiteStructuredStoreOptions {
  filename: string;
  mode?: 'auto' | 'node-sqlite' | 'json';
  jsonFallbackFilename?: string;
}

export class SQLiteStructuredStore implements StructuredStoreProvider {
  private readonly backend: StructuredStoreProvider;

  constructor(options: SQLiteStructuredStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = options.mode === 'json' ? null : loadNodeSqlite(options.mode === 'node-sqlite');
    this.backend = sqlite
      ? new NodeSQLiteStructuredStoreBackend(options.filename, sqlite)
      : new JsonStructuredStoreBackend(options.jsonFallbackFilename ?? `${options.filename}.json`);
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    return this.backend.get(table, id);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    await this.backend.insert(table, record);
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    await this.backend.update(table, id, patch);
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return this.backend.query(table, query);
  }

  async transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return this.backend.transaction(fn);
  }
}

class NodeSQLiteEventStoreBackend implements EventStore, TraceRecorder {
  private readonly db: SqliteDatabaseSync;

  constructor(filename: string, sqlite: SqliteModule) {
    this.db = new sqlite.DatabaseSync(filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS framework_events (' +
        'id TEXT PRIMARY KEY, ' +
        'workspace_id TEXT, ' +
        'session_id TEXT, ' +
        'run_id TEXT NOT NULL, ' +
        'type TEXT NOT NULL, ' +
        'timestamp TEXT NOT NULL, ' +
        'event TEXT NOT NULL)'
    );
  }

  async append(event: FrameworkEvent): Promise<void> {
    this.db
      .prepare(
        'INSERT OR REPLACE INTO framework_events ' +
          '(id, workspace_id, session_id, run_id, type, timestamp, event) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .run(
        event.id,
        event.workspaceId ?? null,
        event.sessionId ?? null,
        event.runId,
        event.type,
        event.timestamp,
        JSON.stringify(event)
      );
  }

  async record(event: FrameworkEvent): Promise<void> {
    await this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    const rows = this.db
      .prepare('SELECT event FROM framework_events ORDER BY timestamp ASC, id ASC')
      .all();
    return filterEvents(
      rows.map((row) => JSON.parse(String(row.event)) as FrameworkEvent),
      filter
    );
  }
}

class JsonEventStoreBackend implements EventStore, TraceRecorder {
  private events: FrameworkEvent[];

  constructor(private readonly filename: string) {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    this.events = readJsonFile<FrameworkEvent[]>(filename, []);
  }

  async append(event: FrameworkEvent): Promise<void> {
    const existingIndex = this.events.findIndex((candidate) => candidate.id === event.id);
    if (existingIndex >= 0) {
      this.events[existingIndex] = event;
    } else {
      this.events.push(event);
    }
    this.flush();
  }

  async record(event: FrameworkEvent): Promise<void> {
    await this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    return filterEvents([...this.events].sort(compareEvents), filter);
  }

  private flush(): void {
    writeJsonFile(this.filename, this.events);
  }
}

class NodeSQLiteStructuredStoreBackend implements StructuredStoreProvider {
  private readonly db: SqliteDatabaseSync;
  private readonly initializedTables = new Set<string>();

  constructor(filename: string, sqlite: SqliteModule) {
    this.db = new sqlite.DatabaseSync(filename);
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    this.ensureTable(table);
    const row = this.db.prepare(`SELECT record FROM ${quoteIdentifier(table)} WHERE id = ?`).get(id);
    return row?.record ? (JSON.parse(String(row.record)) as T) : null;
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    this.ensureTable(table);
    this.db
      .prepare(`INSERT OR REPLACE INTO ${quoteIdentifier(table)} (id, record) VALUES (?, ?)`)
      .run(record.id, JSON.stringify(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const existing = await this.get<Record<string, unknown>>(table, id);
    if (!existing) return;
    await this.insert(table, { ...existing, ...(patch as Record<string, unknown>), id });
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    this.ensureTable(table);
    const rows = this.db.prepare(`SELECT record FROM ${quoteIdentifier(table)}`).all();
    const records = rows.map((row) => JSON.parse(String(row.record)) as Record<string, unknown>);
    const filtered = filterRecords(records, query.where);
    return filtered.slice(0, query.limit ?? filtered.length) as T[];
  }

  async transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    this.db.exec('BEGIN');
    try {
      const value = await fn(this);
      this.db.exec('COMMIT');
      return value;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  private ensureTable(table: string): void {
    validateIdentifier(table);
    if (this.initializedTables.has(table)) return;
    this.db.exec(
      `CREATE TABLE IF NOT EXISTS ${quoteIdentifier(table)} (` +
        'id TEXT PRIMARY KEY, record TEXT NOT NULL)'
    );
    this.initializedTables.add(table);
  }
}

class JsonStructuredStoreBackend implements StructuredStoreProvider {
  private tables: Record<string, Record<string, Record<string, unknown>>>;

  constructor(private readonly filename: string) {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    this.tables = readJsonFile<Record<string, Record<string, Record<string, unknown>>>>(
      filename,
      {}
    );
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    validateIdentifier(table);
    return (this.tables[table]?.[id] as T | undefined) ?? null;
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    validateIdentifier(table);
    this.tables[table] = this.tables[table] ?? {};
    this.tables[table][record.id] = record as Record<string, unknown>;
    this.flush();
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const existing = await this.get<Record<string, unknown>>(table, id);
    if (!existing) return;
    await this.insert(table, { ...existing, ...(patch as Record<string, unknown>), id });
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    validateIdentifier(table);
    const records = Object.values(this.tables[table] ?? {});
    const filtered = filterRecords(records, query.where);
    return filtered.slice(0, query.limit ?? filtered.length) as T[];
  }

  async transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    const snapshot = JSON.parse(JSON.stringify(this.tables)) as typeof this.tables;
    try {
      const value = await fn(this);
      this.flush();
      return value;
    } catch (error) {
      this.tables = snapshot;
      this.flush();
      throw error;
    }
  }

  private flush(): void {
    writeJsonFile(this.filename, this.tables);
  }
}

export class InMemoryStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, Record<string, unknown>>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    return (this.tables.get(table)?.get(id) as T | undefined) ?? null;
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    const records = this.tables.get(table) ?? new Map<string, Record<string, unknown>>();
    records.set(record.id, record as Record<string, unknown>);
    this.tables.set(table, records);
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const records = this.tables.get(table);
    const existing = records?.get(id);
    if (!records || !existing) return;
    records.set(id, { ...existing, ...(patch as Record<string, unknown>) });
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    const records = Array.from(this.tables.get(table)?.values() ?? []);
    const filtered = filterRecords(records, query.where);
    return filtered.slice(0, query.limit ?? filtered.length) as T[];
  }

  async transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return fn(this);
  }
}

export class InMemoryVectorIndexProvider implements VectorIndexProvider {
  private readonly records = new Map<string, VectorRecord>();

  async upsert(records: VectorRecord[]): Promise<void> {
    for (const record of records) {
      this.records.set(record.id, record);
    }
  }

  async search(query: VectorQuery): Promise<VectorSearchResult[]> {
    return Array.from(this.records.values())
      .filter((record) => matchesWhere(record.metadata, query.filter))
      .map((record) => ({
        id: record.id,
        score: cosineSimilarity(query.vector, record.vector),
        metadata: record.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, query.topK);
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) {
      this.records.delete(id);
    }
  }
}

export interface LocalVectorIndexProviderOptions {
  filename: string;
}

export class LocalVectorIndexProvider implements VectorIndexProvider {
  private readonly records = new Map<string, VectorRecord>();

  constructor(private readonly options: LocalVectorIndexProviderOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    this.load();
  }

  async upsert(records: VectorRecord[]): Promise<void> {
    for (const record of records) {
      this.records.set(record.id, record);
    }
    this.flush();
  }

  async search(query: VectorQuery): Promise<VectorSearchResult[]> {
    return Array.from(this.records.values())
      .filter((record) => matchesWhere(record.metadata, query.filter))
      .map((record) => ({
        id: record.id,
        score: cosineSimilarity(query.vector, record.vector),
        metadata: record.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, query.topK);
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) {
      this.records.delete(id);
    }
    this.flush();
  }

  private load(): void {
    if (!fs.existsSync(this.options.filename)) return;
    const raw = JSON.parse(fs.readFileSync(this.options.filename, 'utf-8')) as VectorRecord[];
    for (const record of raw) {
      this.records.set(record.id, record);
    }
  }

  private flush(): void {
    fs.writeFileSync(
      this.options.filename,
      JSON.stringify(Array.from(this.records.values()), null, 2)
    );
  }
}

export class InMemoryArtifactStore implements ArtifactStoreProvider {
  private readonly records = new Map<string, Buffer>();

  async put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef> {
    const id = `artifact:${path}`;
    this.records.set(id, Buffer.isBuffer(content) ? content : Buffer.from(content));
    return { id, path, meta };
  }

  async get(ref: ArtifactRef): Promise<Buffer> {
    return this.records.get(ref.id) ?? Buffer.alloc(0);
  }

  async delete(ref: ArtifactRef): Promise<void> {
    this.records.delete(ref.id);
  }
}

export interface FileArtifactStoreOptions {
  rootPath: string;
}

export class FileArtifactStore implements ArtifactStoreProvider {
  constructor(private readonly options: FileArtifactStoreOptions) {
    fs.mkdirSync(options.rootPath, { recursive: true });
  }

  async put(filePath: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef> {
    const absolutePath = this.resolvePath(filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
    fs.writeFileSync(absolutePath, buffer);
    return {
      id: `artifact:${hash(`${filePath}:${buffer.length}`)}`,
      path: path.relative(this.options.rootPath, absolutePath),
      meta: {
        ...meta,
        sizeBytes: meta?.sizeBytes ?? buffer.length,
        hash: meta?.hash ?? hash(buffer),
      },
    };
  }

  async get(ref: ArtifactRef): Promise<Buffer> {
    return fs.readFileSync(this.resolvePath(ref.path));
  }

  async delete(ref: ArtifactRef): Promise<void> {
    const absolutePath = this.resolvePath(ref.path);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }

  private resolvePath(filePath: string): string {
    const absolutePath = path.resolve(this.options.rootPath, filePath);
    const root = path.resolve(this.options.rootPath);
    if (absolutePath !== root && !absolutePath.startsWith(`${root}${path.sep}`)) {
      throw new Error(`Artifact path escapes root: ${filePath}`);
    }
    return absolutePath;
  }
}

export class MockEmbeddingProvider implements EmbeddingProvider {
  async embed(input: string[]): Promise<number[][]> {
    return input.map((value) => deterministicVector(value));
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;
  for (let index = 0; index < length; index += 1) {
    dot += a[index] * b[index];
    aNorm += a[index] * a[index];
    bNorm += b[index] * b[index];
  }
  if (aNorm === 0 || bNorm === 0) return 0;
  return dot / Math.sqrt(aNorm * bNorm);
}

function loadNodeSqlite(required = false): SqliteModule | null {
  try {
    return require('node:sqlite') as SqliteModule;
  } catch (error) {
    if (!required) return null;
    throw new Error(
      'SQLite local adapters require a Node.js runtime with node:sqlite support when mode is node-sqlite.',
      { cause: error }
    );
  }
}

function filterEvents(events: FrameworkEvent[], filter: EventFilter = {}): FrameworkEvent[] {
  return events.filter((event) => {
    if (filter.workspaceId && event.workspaceId !== filter.workspaceId) return false;
    if (filter.sessionId && event.sessionId !== filter.sessionId) return false;
    if (filter.runId && event.runId !== filter.runId) return false;
    if (filter.type && event.type !== filter.type) return false;
    return true;
  });
}

function compareEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  return left.timestamp.localeCompare(right.timestamp) || left.id.localeCompare(right.id);
}

function readJsonFile<T>(filename: string, fallback: T): T {
  if (!fs.existsSync(filename)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile(filename: string, value: unknown): void {
  const tempFile = `${filename}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(value, null, 2));
  fs.renameSync(tempFile, filename);
}

function validateIdentifier(identifier: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
    throw new Error(`Invalid SQLite identifier: ${identifier}`);
  }
}

function quoteIdentifier(identifier: string): string {
  validateIdentifier(identifier);
  return `"${identifier}"`;
}

function filterRecords(
  records: Array<Record<string, unknown>>,
  where?: Record<string, unknown>
): Array<Record<string, unknown>> {
  return records.filter((record) => matchesWhere(record, where));
}

function matchesWhere(
  value: Record<string, unknown> | undefined,
  where?: Record<string, unknown>
): boolean {
  if (!where) return true;
  if (!value) return false;
  return Object.entries(where).every(([key, expected]) => value[key] === expected);
}

function hash(content: Buffer | string): string {
  return createHash('sha256').update(content).digest('hex');
}

function deterministicVector(value: string): number[] {
  const digest = createHash('sha256').update(value).digest();
  return Array.from({ length: 8 }, (_unused, index) => digest[index] / 255);
}
