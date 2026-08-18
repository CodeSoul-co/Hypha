# `@codesoul-co/hypha-memory` / `dead-letter-management`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/dead-letter-management.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)
- 导出数: **10**

## 模块用法

用于使用该功能边界的公共契约与操作。Dead letter management 模块公开 2 类、2 函数、5 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryMemoryDeadLetterRepository,
  MemoryDeadLetterManager,
  deadLetterFromTask,
  inspectMemoryLifecycleDeadLetters,
} from '@codesoul-co/hypha-memory';

import type {
  DeadLetterDispositionRequest,
  MemoryDeadLetterInspection,
  MemoryDeadLetterQuery,
  MemoryDeadLetterRecord,
  MemoryDeadLetterRepository,
  MemoryDeadLetterState,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryDeadLetterRepository` | 类 | <code>new InMemoryMemoryDeadLetterRepository(): InMemoryMemoryDeadLetterRepository</code> | In Memory Memory Dead Letter Repository 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryDeadLetterManager` | 类 | <code>new MemoryDeadLetterManager(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Memory Dead Letter Manager 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `deadLetterFromTask` | 函数 | <code>deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord</code> | Dead Letter From Task 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `inspectMemoryLifecycleDeadLetters` | 函数 | <code>inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise&lt;MemoryDeadLetterInspection[]&gt;</code> | Returns operator-safe DLQ metadata without exposing task payloads or Provider messages. |
| `DeadLetterDispositionRequest` | 接口 | <code>interface DeadLetterDispositionRequest</code> | Dead Letter Disposition Request 接口，共包含 7 个公开字段或方法。 |
| `MemoryDeadLetterInspection` | 接口 | <code>interface MemoryDeadLetterInspection</code> | Memory Dead Letter Inspection 接口，共包含 9 个公开字段或方法。 |
| `MemoryDeadLetterQuery` | 接口 | <code>interface MemoryDeadLetterQuery</code> | Memory Dead Letter Query 接口，共包含 4 个公开字段或方法。 |
| `MemoryDeadLetterRecord` | 接口 | <code>interface MemoryDeadLetterRecord</code> | Memory Dead Letter Record 接口，共包含 14 个公开字段或方法。 |
| `MemoryDeadLetterRepository` | 接口 | <code>interface MemoryDeadLetterRepository</code> | Memory Dead Letter Repository 接口，共包含 3 个公开字段或方法。 |
| `MemoryDeadLetterState` | 类型 | <code>type MemoryDeadLetterState = 'dead_letter' &#124; 'replay_queued' &#124; 'discarded'</code> | Memory Dead Letter State 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMemoryDeadLetterRepository`

In Memory Memory Dead Letter Repository 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryDeadLetterRepository } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export declare class InMemoryMemoryDeadLetterRepository implements MemoryDeadLetterRepository {
    get(id: string): Promise<MemoryDeadLetterRecord | null>;
    list(query?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    set(record: MemoryDeadLetterRecord): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryDeadLetterRepository</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryDeadLetterManager`

Memory Dead Letter Manager 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryDeadLetterManager } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export declare class MemoryDeadLetterManager {
    constructor(repository: MemoryDeadLetterRepository);
    query(input?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    replay(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord>;
    discard(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | 创建该类的实例。 |
| `discard` | 方法 | <code>discard(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 方法 | <code>query(input?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `replay` | 方法 | <code>replay(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `deadLetterFromTask`

Dead Letter From Task 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { deadLetterFromTask } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export declare function deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord;
```

### 调用签名

```text
deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `task` | <code>MemoryLifecycleTask&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `occurredAt` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryDeadLetterRecord`
- 说明: 返回值契约由上述类型定义。

## `inspectMemoryLifecycleDeadLetters`

Returns operator-safe DLQ metadata without exposing task payloads or Provider messages.

- 种类: 函数
- 导入: `import { inspectMemoryLifecycleDeadLetters } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export declare function inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: {
    workerType?: MemoryLifecycleWorkerType;
    scopeHash?: string;
}): Promise<MemoryDeadLetterInspection[]>;
```

### 调用签名

```text
inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise<MemoryDeadLetterInspection[]>
```

Returns operator-safe DLQ metadata without exposing task payloads or Provider messages.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `store` | <code>MemoryLifecycleTaskStore</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `query` | <code>{ workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryDeadLetterInspection[]>`
- 说明: 返回值契约由上述类型定义。

## `DeadLetterDispositionRequest`

Dead Letter Disposition Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DeadLetterDispositionRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export interface DeadLetterDispositionRequest {
    deadLetterId: string;
    actorId: string;
    reason: string;
    expectedFailureFingerprint: string;
    confirmation: 'replay' | 'discard';
    idempotencyKey?: string;
    occurredAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actorId` | 属性 | <code>actorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confirmation` | 属性 | <code>confirmation: "replay" &#124; "discard"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetterId` | 属性 | <code>deadLetterId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedFailureFingerprint` | 属性 | <code>expectedFailureFingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDeadLetterInspection`

Memory Dead Letter Inspection 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDeadLetterInspection } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export interface MemoryDeadLetterInspection {
    taskId: string;
    operationId: string;
    workerType: MemoryLifecycleWorkerType;
    scopeHash: string;
    attempts: number;
    error: Pick<NormalizedMemoryError, 'code' | 'retryable' | 'providerCode'>;
    payloadHash: string;
    createdAt: string;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error: Pick&lt;NormalizedMemoryError, "code" &#124; "retryable" &#124; "providerCode"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDeadLetterQuery`

Memory Dead Letter Query 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDeadLetterQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export interface MemoryDeadLetterQuery {
    workerType?: MemoryLifecycleWorkerType;
    scopeHash?: string;
    state?: MemoryDeadLetterState;
    failureFingerprint?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureFingerprint` | 属性 | <code>failureFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state?: MemoryDeadLetterState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerType` | 属性 | <code>workerType?: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDeadLetterRecord`

Memory Dead Letter Record 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDeadLetterRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export interface MemoryDeadLetterRecord {
    id: string;
    taskId: string;
    operationId: string;
    workerType: MemoryLifecycleWorkerType;
    scopeHash: string;
    state: MemoryDeadLetterState;
    attempts: number;
    failure: NormalizedMemoryError;
    failureFingerprint: string;
    payload: unknown;
    idempotencyKey?: string;
    createdAt: string;
    updatedAt: string;
    disposition?: {
        actorId: string;
        reason: string;
        occurredAt: string;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition?: { actorId: string; reason: string; occurredAt: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: MemoryDeadLetterState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDeadLetterRepository`

Memory Dead Letter Repository 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDeadLetterRepository } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export interface MemoryDeadLetterRepository {
    get(id: string): Promise<MemoryDeadLetterRecord | null>;
    list(query?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    set(record: MemoryDeadLetterRecord): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryDeadLetterState`

Memory Dead Letter State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryDeadLetterState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### 声明

```text
export type MemoryDeadLetterState = 'dead_letter' | 'replay_queued' | 'discarded';
```
