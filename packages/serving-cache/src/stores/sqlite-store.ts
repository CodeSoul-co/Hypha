import fs from 'fs';
import path from 'path';
import type { CacheEntry, CacheMetadata, CacheStore } from '../types';

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

export interface SQLiteCacheStoreOptions {
  filename: string;
  required?: boolean;
}

export class SQLiteCacheStore implements CacheStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteCacheStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(options.required ?? true);
    if (!sqlite) {
      throw new Error('SQLite cache store requires node:sqlite or better-sqlite3.');
    }
    this.db = new sqlite.DatabaseSync(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS cache_entries (' +
        'key TEXT PRIMARY KEY, ' +
        'value_json TEXT NOT NULL, ' +
        'metadata_json TEXT, ' +
        'created_at INTEGER NOT NULL, ' +
        'expires_at INTEGER, ' +
        'hit_count INTEGER DEFAULT 0, ' +
        'last_hit_at INTEGER)'
    );
    this.db.exec(
      [
        'CREATE INDEX IF NOT EXISTS idx_cache_entries_expires_at ON cache_entries(expires_at)',
        'CREATE INDEX IF NOT EXISTS idx_cache_entries_created_at ON cache_entries(created_at)',
      ].join('; ')
    );
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const row = this.db
      .prepare(
        'SELECT key, value_json, metadata_json, created_at, expires_at, hit_count FROM cache_entries WHERE key = ?'
      )
      .get(key);
    if (!row) return null;
    const metadata = parseJson<CacheMetadata | undefined>(row.metadata_json, undefined);
    return {
      key: String(row.key),
      value: parseJson<T>(row.value_json, null as T),
      createdAt: Number(row.created_at),
      expiresAt:
        row.expires_at === null || row.expires_at === undefined
          ? undefined
          : Number(row.expires_at),
      metadata: metadata
        ? {
            ...metadata,
            hitCount: Number(row.hit_count ?? metadata.hitCount ?? 0),
          }
        : undefined,
    };
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    this.db
      .prepare(
        'INSERT OR REPLACE INTO cache_entries ' +
          '(key, value_json, metadata_json, created_at, expires_at, hit_count, last_hit_at) ' +
          'VALUES (?, ?, ?, ?, ?, ?, COALESCE((SELECT last_hit_at FROM cache_entries WHERE key = ?), NULL))'
      )
      .run(
        key,
        JSON.stringify(entry.value),
        entry.metadata ? JSON.stringify(entry.metadata) : null,
        entry.createdAt,
        entry.expiresAt ?? null,
        entry.metadata?.hitCount ?? 0,
        key
      );
  }

  async delete(key: string): Promise<void> {
    this.db.prepare('DELETE FROM cache_entries WHERE key = ?').run(key);
  }

  async clear(): Promise<void> {
    this.db.prepare('DELETE FROM cache_entries').run();
  }

  async touch(key: string, timestamp: number): Promise<void> {
    this.db
      .prepare('UPDATE cache_entries SET hit_count = hit_count + 1, last_hit_at = ? WHERE key = ?')
      .run(timestamp, key);
  }
}

function loadSqlite(required = false): SqliteModule | null {
  try {
    return require('node:sqlite') as SqliteModule;
  } catch (nodeSqliteError) {
    try {
      const BetterSqliteDatabase = require('better-sqlite3') as new (
        filename: string
      ) => SqliteDatabaseSync;
      return { DatabaseSync: BetterSqliteDatabase };
    } catch (betterSqliteError) {
      if (!required) return null;
      throw new Error('SQLite cache store requires node:sqlite or better-sqlite3.', {
        cause: { nodeSqliteError, betterSqliteError },
      });
    }
  }
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== 'string') return fallback;
  return JSON.parse(value) as T;
}
