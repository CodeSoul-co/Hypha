import fs from 'fs';
import path from 'path';
import { validateCacheBlock } from '../schemas';
import type { CacheBlock, CacheBlockUtility, CacheTreeType, WorkCacheStore } from '../types';

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

export interface SQLiteWorkCacheStoreOptions {
  filename: string;
  required?: boolean;
}

export class SQLiteWorkCacheStore implements WorkCacheStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteWorkCacheStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(options.required ?? true);
    if (!sqlite) {
      throw new Error('SQLite WorkCache store requires node:sqlite or better-sqlite3.');
    }
    this.db = new sqlite.DatabaseSync(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS workcache_blocks (' +
        'id TEXT PRIMARY KEY, ' +
        'tree_type TEXT NOT NULL, ' +
        'node_type TEXT NOT NULL, ' +
        'cache_key TEXT NOT NULL, ' +
        'value_json TEXT NOT NULL, ' +
        'block_json TEXT NOT NULL, ' +
        'created_at INTEGER NOT NULL, ' +
        'updated_at INTEGER NOT NULL, ' +
        'expires_at INTEGER, ' +
        'source_event_id TEXT NOT NULL, ' +
        'source_event_type TEXT NOT NULL)'
    );
    this.db.exec(
      [
        'CREATE INDEX IF NOT EXISTS idx_workcache_tree_key ON workcache_blocks(tree_type, cache_key)',
        'CREATE INDEX IF NOT EXISTS idx_workcache_expires_at ON workcache_blocks(expires_at)',
        'CREATE INDEX IF NOT EXISTS idx_workcache_source_event ON workcache_blocks(source_event_id, source_event_type)',
      ].join('; ')
    );
  }

  async get<T = unknown>(blockId: string): Promise<CacheBlock<T> | null> {
    const row = this.db
      .prepare('SELECT block_json FROM workcache_blocks WHERE id = ?')
      .get(blockId);
    if (!row) return null;
    try {
      return parseBlock<T>(row.block_json);
    } catch {
      await this.delete(blockId);
      return null;
    }
  }

  async getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    const row = this.db
      .prepare(
        'SELECT block_json FROM workcache_blocks WHERE tree_type = ? AND cache_key = ? ORDER BY updated_at DESC LIMIT 1'
      )
      .get(treeType, cacheKey);
    if (!row) return null;
    try {
      return parseBlock<T>(row.block_json);
    } catch {
      const raw = row.block_json;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw) as { id?: unknown };
          if (typeof parsed.id === 'string') await this.delete(parsed.id);
        } catch {}
      }
      return null;
    }
  }

  async set<T = unknown>(block: CacheBlock<T>): Promise<void> {
    validateCacheBlock(block);
    this.db
      .prepare(
        'INSERT OR REPLACE INTO workcache_blocks ' +
          '(id, tree_type, node_type, cache_key, value_json, block_json, created_at, updated_at, expires_at, source_event_id, source_event_type) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .run(
        block.id,
        block.treeType,
        block.nodeType,
        block.cacheKey,
        JSON.stringify(block.value),
        JSON.stringify(block),
        block.createdAt,
        block.updatedAt,
        block.expiresAt ?? null,
        block.sourceEventId,
        block.sourceEventType
      );
  }

  async delete(blockId: string): Promise<void> {
    this.db.prepare('DELETE FROM workcache_blocks WHERE id = ?').run(blockId);
  }

  async list<T = unknown>(treeType?: CacheTreeType): Promise<Array<CacheBlock<T>>> {
    const rows = treeType
      ? this.db
          .prepare(
            'SELECT block_json FROM workcache_blocks WHERE tree_type = ? ORDER BY created_at ASC'
          )
          .all(treeType)
      : this.db.prepare('SELECT block_json FROM workcache_blocks ORDER BY created_at ASC').all();
    const blocks: Array<CacheBlock<T>> = [];
    for (const row of rows) {
      try {
        blocks.push(parseBlock<T>(row.block_json));
      } catch {
        // Corrupt rows are quarantined from reads; point lookups remove them by id.
      }
    }
    return blocks;
  }

  async clear(): Promise<void> {
    this.db.prepare('DELETE FROM workcache_blocks').run();
  }

  async touch(blockId: string, timestamp: number): Promise<void> {
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: {
        ...block.utility,
        reuseCount: (block.utility.reuseCount ?? 0) + 1,
      },
    });
  }

  async updateUtility(
    blockId: string,
    utility: Partial<CacheBlockUtility>,
    timestamp: number
  ): Promise<void> {
    const block = await this.get(blockId);
    if (!block) return;
    await this.set({
      ...block,
      updatedAt: timestamp,
      utility: {
        ...block.utility,
        ...utility,
      },
    });
  }
}

function parseBlock<T>(value: unknown): CacheBlock<T> {
  if (typeof value !== 'string') {
    throw new Error('Invalid WorkCache SQLite block payload.');
  }
  return validateCacheBlock<T>(JSON.parse(value));
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
      throw new Error('SQLite WorkCache store requires node:sqlite or better-sqlite3.', {
        cause: { nodeSqliteError, betterSqliteError },
      });
    }
  }
}
