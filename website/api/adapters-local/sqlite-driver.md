# `@codesoul-co/hypha-adapters-local` / `sqlite-driver`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadSqlite` | function | <code>loadSqlite(required?: boolean): SqliteModule &#124; null</code> | Loads Sqlite at this module boundary. |
| `SqliteDatabaseSync` | interface | <code>interface SqliteDatabaseSync</code> | Field contract for Sqlite Database Sync; see all contract members below. |
| `SqliteModule` | interface | <code>interface SqliteModule</code> | Field contract for Sqlite Module; see all contract members below. |
| `SqliteStatementSync` | interface | <code>interface SqliteStatementSync</code> | Field contract for Sqlite Statement Sync; see all contract members below. |

## `SqliteDatabaseSync` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `exec` | method | <code>exec(sql: string): void</code> | Public runtime operation for exec. |
| `prepare` | method | <code>prepare(sql: string): SqliteStatementSync</code> | Public runtime operation for prepare. |

## `SqliteModule` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DatabaseSync` | property | <code>DatabaseSync: new (filename: string) =&gt; SqliteDatabaseSync</code> | Public Database Sync property. |

## `SqliteStatementSync` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `all` | method | <code>all(...params: unknown[]): Array&lt;Record&lt;string, unknown&gt;&gt;</code> | Public runtime operation for all. |
| `get` | method | <code>get(...params: unknown[]): Record&lt;string, unknown&gt; &#124; undefined</code> | Gets get at this module boundary. |
| `run` | method | <code>run(...params: unknown[]): unknown</code> | Public runtime operation for run. |
