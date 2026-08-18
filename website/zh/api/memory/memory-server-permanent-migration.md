# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)
- 导出数: **14**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server permanent migration 模块公开 1 类、3 函数、7 接口、3 类型。

### 从包入口导入

```ts
import {
  PermanentMemoryMigrationAdapter,
  decidePermanentMemoryFailure,
  isExplicitPermanentMemoryNotFound,
  normalizePermanentMemoryProviderError,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryFailureDecision,
  PermanentMemoryFailureEvent,
  PermanentMemoryFailureObserver,
  PermanentMemoryMigrationAdapterOptions,
  PermanentMemoryMigrationPort,
  PermanentMemoryMigrationProvider,
  PermanentMemoryMigrationRequest,
  PermanentMemoryFailureDisposition,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 10 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PermanentMemoryMigrationAdapter` | 类 | <code>new PermanentMemoryMigrationAdapter(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Permanent Memory Migration Adapter 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `decidePermanentMemoryFailure` | 函数 | <code>decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision</code> | Decide Permanent Memory Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isExplicitPermanentMemoryNotFound` | 函数 | <code>isExplicitPermanentMemoryNotFound(error: unknown): boolean</code> | Is Explicit Permanent Memory Not Found 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizePermanentMemoryProviderError` | 函数 | <code>normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError</code> | Normalize Permanent Memory Provider Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `PermanentMemoryFailureDecision` | 接口 | <code>interface PermanentMemoryFailureDecision</code> | Permanent Memory Failure Decision 接口，共包含 6 个公开字段或方法。 |
| `PermanentMemoryFailureEvent` | 接口 | <code>interface PermanentMemoryFailureEvent</code> | Permanent Memory Failure Event 接口，共包含 10 个公开字段或方法。 |
| `PermanentMemoryFailureObserver` | 接口 | <code>interface PermanentMemoryFailureObserver</code> | Permanent Memory Failure Observer 接口，共包含 1 个公开字段或方法。 |
| `PermanentMemoryMigrationAdapterOptions` | 接口 | <code>interface PermanentMemoryMigrationAdapterOptions</code> | Permanent Memory Migration Adapter Options 接口，共包含 2 个公开字段或方法。 |
| `PermanentMemoryMigrationPort` | 接口 | <code>interface PermanentMemoryMigrationPort</code> | Permanent Memory Migration Port 接口，共包含 4 个公开字段或方法。 |
| `PermanentMemoryMigrationProvider` | 接口 | <code>interface PermanentMemoryMigrationProvider</code> | Permanent Memory Migration Provider 接口，共包含 4 个公开字段或方法。 |
| `PermanentMemoryMigrationRequest` | 接口 | <code>interface PermanentMemoryMigrationRequest</code> | Permanent Memory Migration Request 接口，共包含 7 个公开字段或方法。 |
| `PermanentMemoryFailureDisposition` | 类型 | <code>type PermanentMemoryFailureDisposition = 'retry' &#124; 'reconcile' &#124; 'quarantine' &#124; 'dlq'</code> | Permanent Memory Failure Disposition 公共类型别名；完整类型表达式见声明。 |
| `PermanentMemoryFailureFinalState` | 类型 | <code>type PermanentMemoryFailureFinalState = 'waiting' &#124; 'reconciling' &#124; 'quarantined' &#124; 'dead_lettered'</code> | Permanent Memory Failure Final State 公共类型别名；完整类型表达式见声明。 |
| `PermanentMemoryMigrationOperation` | 类型 | <code>type PermanentMemoryMigrationOperation = 'get' &#124; 'list' &#124; 'delete' &#124; 'write'</code> | Permanent Memory Migration Operation 公共类型别名；完整类型表达式见声明。 |

## `PermanentMemoryMigrationAdapter`

Permanent Memory Migration Adapter 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { PermanentMemoryMigrationAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export declare class PermanentMemoryMigrationAdapter implements PermanentMemoryMigrationPort {
    constructor(options: PermanentMemoryMigrationAdapterOptions);
    get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null>;
    list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]>;
    delete(request: PermanentMemoryMigrationRequest): Promise<boolean>;
    write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `decidePermanentMemoryFailure`

Decide Permanent Memory Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { decidePermanentMemoryFailure } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export declare function decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision;
```

### 调用签名

```text
decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>NormalizedMemoryError</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `request` | <code>PermanentMemoryMigrationRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `operation` | <code>PermanentMemoryMigrationOperation</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PermanentMemoryFailureDecision`
- 说明: 返回值契约由上述类型定义。

## `isExplicitPermanentMemoryNotFound`

Is Explicit Permanent Memory Not Found 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isExplicitPermanentMemoryNotFound } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export declare function isExplicitPermanentMemoryNotFound(error: unknown): boolean;
```

### 调用签名

```text
isExplicitPermanentMemoryNotFound(error: unknown): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `normalizePermanentMemoryProviderError`

Normalize Permanent Memory Provider Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizePermanentMemoryProviderError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export declare function normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError;
```

### 调用签名

```text
normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `providerError` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `request` | <code>PermanentMemoryMigrationRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `operation` | <code>PermanentMemoryMigrationOperation</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `PermanentMemoryFailureDecision`

Permanent Memory Failure Decision 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryFailureDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryFailureDecision {
    disposition: PermanentMemoryFailureDisposition;
    finalState: PermanentMemoryFailureFinalState;
    retryable: boolean;
    attempt: number;
    maxAttempts: number;
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: PermanentMemoryFailureDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalState` | 属性 | <code>finalState: PermanentMemoryFailureFinalState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryFailureEvent`

Permanent Memory Failure Event 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryFailureEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryFailureEvent {
    type: 'permanent_memory.operation_failed';
    operationId: string;
    operation: PermanentMemoryMigrationOperation;
    providerRef: string;
    profileRef: string;
    scopeHash: string;
    attempt: number;
    error: NormalizedMemoryError;
    disposition: PermanentMemoryFailureDisposition;
    finalState: PermanentMemoryFailureFinalState;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: PermanentMemoryFailureDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalState` | 属性 | <code>finalState: PermanentMemoryFailureFinalState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: PermanentMemoryMigrationOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "permanent_memory.operation_failed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryFailureObserver`

Permanent Memory Failure Observer 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryFailureObserver } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryFailureObserver {
    record(event: PermanentMemoryFailureEvent): void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: PermanentMemoryFailureEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PermanentMemoryMigrationAdapterOptions`

Permanent Memory Migration Adapter Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryMigrationAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryMigrationAdapterOptions {
    provider: PermanentMemoryMigrationProvider;
    observer?: PermanentMemoryFailureObserver;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observer` | 属性 | <code>observer?: PermanentMemoryFailureObserver</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: PermanentMemoryMigrationProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryMigrationPort`

Permanent Memory Migration Port 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryMigrationPort {
    get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null>;
    list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]>;
    delete(request: PermanentMemoryMigrationRequest): Promise<boolean>;
    write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PermanentMemoryMigrationProvider`

Permanent Memory Migration Provider 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryMigrationProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryMigrationProvider {
    get<TValue = unknown>(scope: ManagedMemoryScope, recordId: string): Promise<TValue | null>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<TValue[]>;
    delete(scope: ManagedMemoryScope, recordId: string): Promise<boolean>;
    write<TValue = unknown>(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, recordId: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string): Promise&lt;TValue &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;TValue[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PermanentMemoryMigrationRequest`

Permanent Memory Migration Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryMigrationRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export interface PermanentMemoryMigrationRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    providerRef: string;
    profileRef: string;
    recordId?: string;
    attempt?: number;
    maxAttempts?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordId` | 属性 | <code>recordId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryFailureDisposition`

Permanent Memory Failure Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PermanentMemoryFailureDisposition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export type PermanentMemoryFailureDisposition = 'retry' | 'reconcile' | 'quarantine' | 'dlq';
```

## `PermanentMemoryFailureFinalState`

Permanent Memory Failure Final State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PermanentMemoryFailureFinalState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export type PermanentMemoryFailureFinalState = 'waiting' | 'reconciling' | 'quarantined' | 'dead_lettered';
```

## `PermanentMemoryMigrationOperation`

Permanent Memory Migration Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PermanentMemoryMigrationOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### 声明

```text
export type PermanentMemoryMigrationOperation = 'get' | 'list' | 'delete' | 'write';
```
