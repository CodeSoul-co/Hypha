# `@codesoul-co/hypha-adapters-local` / `sqlite-driver`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadSqlite` | 函数 | <code>loadSqlite(required?: boolean): SqliteModule &#124; null</code> | 加载 Sqlite。 |
| `SqliteDatabaseSync` | 接口 | <code>interface SqliteDatabaseSync</code> | Sqlite Database Sync 的字段契约；完整字段见下表。 |
| `SqliteModule` | 接口 | <code>interface SqliteModule</code> | Sqlite Module 的字段契约；完整字段见下表。 |
| `SqliteStatementSync` | 接口 | <code>interface SqliteStatementSync</code> | Sqlite Statement Sync 的字段契约；完整字段见下表。 |

## `SqliteDatabaseSync` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `exec` | 方法 | <code>exec(sql: string): void</code> | exec 的公开运行时操作。 |
| `prepare` | 方法 | <code>prepare(sql: string): SqliteStatementSync</code> | prepare 的公开运行时操作。 |

## `SqliteModule` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DatabaseSync` | 属性 | <code>DatabaseSync: new (filename: string) =&gt; SqliteDatabaseSync</code> | Database Sync 字段。 |

## `SqliteStatementSync` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `all` | 方法 | <code>all(...params: unknown[]): Array&lt;Record&lt;string, unknown&gt;&gt;</code> | all 的公开运行时操作。 |
| `get` | 方法 | <code>get(...params: unknown[]): Record&lt;string, unknown&gt; &#124; undefined</code> | 读取 get。 |
| `run` | 方法 | <code>run(...params: unknown[]): unknown</code> | run 的公开运行时操作。 |
