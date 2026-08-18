# `@codesoul-co/hypha-adapters-local` / `session-queue`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Session queue 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteSessionQueue,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteSessionQueueOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteSessionQueue` | 类 | <code>new SQLiteSessionQueue(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | SQLite Session Queue 类，共公开 15 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteSessionQueueOptions` | 接口 | <code>interface SQLiteSessionQueueOptions</code> | SQLite Session Queue Options 接口，共包含 10 个公开字段或方法。 |

## `SQLiteSessionQueue`

SQLite Session Queue 类，共公开 15 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteSessionQueue } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)

### 声明

```text
export declare class SQLiteSessionQueue implements SessionQueue {
    constructor(options: SQLiteSessionQueueOptions);
    enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord>;
    claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
    renew(request: RenewSessionCommandRequest): Promise<SessionCommandClaim>;
    complete(request: CompleteSessionCommandRequest): Promise<void>;
    fail(request: FailSessionCommandRequest): Promise<void>;
    release(request: ReleaseSessionCommandRequest): Promise<void>;
    list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
    cancelPending(request: CancelSessionCommandsRequest): Promise<CancelSessionCommandsResult>;
    redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    listStuck(request: ListStuckSessionCommandsRequest): Promise<StuckSessionCommand[]>;
    drain(scope: SessionQueueScope): Promise<void>;
    health(): Promise<ProviderHealth & {
            details: SessionQueueHealthSnapshot;
        }>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteSessionQueueOptions`

SQLite Session Queue Options 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteSessionQueueOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)

### 声明

```text
export interface SQLiteSessionQueueOptions {
    filename: string;
    now?: () => string;
    duplicatePolicy?: 'reuse' | 'reject';
    maxPendingPerSession?: number;
    maxPendingPerUser?: number;
    maxPendingGlobal?: number;
    maxConcurrentSessions?: number;
    maxConcurrentSessionsPerUser?: number;
    priorityAgingMs?: number;
    drainPollMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `drainPollMs` | 属性 | <code>drainPollMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `duplicatePolicy` | 属性 | <code>duplicatePolicy?: "reuse" &#124; "reject"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConcurrentSessions` | 属性 | <code>maxConcurrentSessions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConcurrentSessionsPerUser` | 属性 | <code>maxConcurrentSessionsPerUser?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingGlobal` | 属性 | <code>maxPendingGlobal?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingPerSession` | 属性 | <code>maxPendingPerSession?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingPerUser` | 属性 | <code>maxPendingPerUser?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `priorityAgingMs` | 属性 | <code>priorityAgingMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
