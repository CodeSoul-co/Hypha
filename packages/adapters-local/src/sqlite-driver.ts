export interface SqliteDatabaseSync {
  exec(sql: string): void;
  prepare(sql: string): {
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Array<Record<string, unknown>>;
    run(...params: unknown[]): unknown;
  };
}

export interface SqliteModule {
  DatabaseSync: new (filename: string) => SqliteDatabaseSync;
}

export function loadSqlite(required = false): SqliteModule | null {
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
      throw new Error(
        'SQLite local adapters require node:sqlite or better-sqlite3 when mode is sqlite.',
        { cause: { nodeSqliteError, betterSqliteError } }
      );
    }
  }
}
