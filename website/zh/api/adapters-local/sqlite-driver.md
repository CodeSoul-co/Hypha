# `@codesoul-co/hypha-adapters-local` / `sqlite-driver`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Sqlite driver 模块公开 1 函数、3 接口。

### 从包入口导入

```ts
import {
  loadSqlite,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SqliteDatabaseSync,
  SqliteModule,
  SqliteStatementSync,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadSqlite` | 函数 | <code>loadSqlite(required?: boolean): SqliteModule &#124; null</code> | Load Sqlite 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `SqliteDatabaseSync` | 接口 | <code>interface SqliteDatabaseSync</code> | Sqlite Database Sync 接口，共包含 3 个公开字段或方法。 |
| `SqliteModule` | 接口 | <code>interface SqliteModule</code> | Sqlite Module 接口，共包含 1 个公开字段或方法。 |
| `SqliteStatementSync` | 接口 | <code>interface SqliteStatementSync</code> | Sqlite Statement Sync 接口，共包含 3 个公开字段或方法。 |

## `loadSqlite`

Load Sqlite 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { loadSqlite } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### 声明

```text
export declare function loadSqlite(required?: boolean): SqliteModule | null;
```

### 调用签名

```text
loadSqlite(required?: boolean): SqliteModule | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `required` | <code>boolean</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SqliteModule`
- 说明: 返回值契约由上述类型定义。

## `SqliteDatabaseSync`

Sqlite Database Sync 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SqliteDatabaseSync } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### 声明

```text
export interface SqliteDatabaseSync {
    exec(sql: string): void;
    prepare(sql: string): SqliteStatementSync;
    close?(): void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close?(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `exec` | 方法 | <code>exec(sql: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `prepare` | 方法 | <code>prepare(sql: string): SqliteStatementSync</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SqliteModule`

Sqlite Module 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SqliteModule } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### 声明

```text
export interface SqliteModule {
    DatabaseSync: new (filename: string) => SqliteDatabaseSync;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DatabaseSync` | 属性 | <code>DatabaseSync: new (filename: string) =&gt; SqliteDatabaseSync</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SqliteStatementSync`

Sqlite Statement Sync 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SqliteStatementSync } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### 声明

```text
export interface SqliteStatementSync {
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Array<Record<string, unknown>>;
    run(...params: unknown[]): unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `all` | 方法 | <code>all(...params: unknown[]): Array&lt;Record&lt;string, unknown&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(...params: unknown[]): Record&lt;string, unknown&gt; &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `run` | 方法 | <code>run(...params: unknown[]): unknown</code> | 公开方法；参数与返回类型以签名列为准。 |
