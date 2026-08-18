# `@codesoul-co/hypha-core` / `modules/runtime/session-queue`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)
- 导出数: **4**

## 模块用法

用于执行该边界的运行时行为。Session queue 模块公开 1 类、1 函数、2 接口。

### 从包入口导入

```ts
import {
  InMemorySessionQueue,
  createSessionQueueHealthSnapshot,
} from '@codesoul-co/hypha-core';

import type {
  InMemorySessionQueueOptions,
  SessionQueue,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemorySessionQueue` | 类 | <code>new InMemorySessionQueue(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | In Memory Session Queue 类，共公开 14 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createSessionQueueHealthSnapshot` | 函数 | <code>createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot</code> | Create Session Queue Health Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InMemorySessionQueueOptions` | 接口 | <code>interface InMemorySessionQueueOptions</code> | In Memory Session Queue Options 接口，共包含 8 个公开字段或方法。 |
| `SessionQueue` | 接口 | <code>interface SessionQueue</code> | Session Queue 接口，共包含 13 个公开字段或方法。 |

## `InMemorySessionQueue`

In Memory Session Queue 类，共公开 14 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemorySessionQueue } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### 声明

```text
export declare class InMemorySessionQueue implements SessionQueue {
    constructor(options?: InMemorySessionQueueOptions);
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
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createSessionQueueHealthSnapshot`

Create Session Queue Health Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createSessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### 声明

```text
export declare function createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot;
```

### 调用签名

```text
createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `records` | <code>readonly SessionCommandRecord[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `checkedAt` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `recoveredExpiredLeases` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SessionQueueHealthSnapshot`
- 说明: 返回值契约由上述类型定义。

## `InMemorySessionQueueOptions`

In Memory Session Queue Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemorySessionQueueOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### 声明

```text
export interface InMemorySessionQueueOptions {
    now?: () => string;
    duplicatePolicy?: 'reuse' | 'reject';
    maxPendingPerSession?: number;
    maxPendingPerUser?: number;
    maxPendingGlobal?: number;
    maxConcurrentSessions?: number;
    maxConcurrentSessionsPerUser?: number;
    priorityAgingMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `duplicatePolicy` | 属性 | <code>duplicatePolicy?: "reuse" &#124; "reject"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConcurrentSessions` | 属性 | <code>maxConcurrentSessions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConcurrentSessionsPerUser` | 属性 | <code>maxConcurrentSessionsPerUser?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingGlobal` | 属性 | <code>maxPendingGlobal?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingPerSession` | 属性 | <code>maxPendingPerSession?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPendingPerUser` | 属性 | <code>maxPendingPerUser?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `priorityAgingMs` | 属性 | <code>priorityAgingMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionQueue`

Session Queue 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionQueue } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### 声明

```text
export interface SessionQueue {
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
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelPending` | 方法 | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `claim` | 方法 | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `closeDeadLetter` | 方法 | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `drain` | 方法 | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStuck` | 方法 | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `redriveDeadLetter` | 方法 | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
