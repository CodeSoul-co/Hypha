# `@codesoul-co/hypha-memory` / `recovery`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)
- 导出数: **6**

## 模块用法

用于处理有界恢复、重试或降级。Recovery 模块公开 2 函数、3 接口、1 类型。

### 从包入口导入

```ts
import {
  adviseMemoryRecovery,
  classifyMemoryFailure,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryFailureContext,
  MemoryRecoveryAdvice,
  MemoryRecoveryScope,
  MemoryRecoveryOperation,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseMemoryRecovery` | 函数 | <code>adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice</code> | Advise Memory Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `classifyMemoryFailure` | 函数 | <code>classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure</code> | Classify Memory Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryFailureContext` | 接口 | <code>interface MemoryFailureContext</code> | Memory Failure Context 接口，共包含 13 个公开字段或方法。 |
| `MemoryRecoveryAdvice` | 接口 | <code>interface MemoryRecoveryAdvice</code> | Memory Recovery Advice 接口，共包含 3 个公开字段或方法。 |
| `MemoryRecoveryScope` | 接口 | <code>interface MemoryRecoveryScope</code> | Memory Recovery Scope 接口，共包含 4 个公开字段或方法。 |
| `MemoryRecoveryOperation` | 类型 | <code>type MemoryRecoveryOperation = 'read' &#124; 'search' &#124; 'write' &#124; 'update' &#124; 'invalidate' &#124; 'summarize' &#124; 'audit'</code> | Memory Recovery Operation 公共类型别名；完整类型表达式见声明。 |

## `adviseMemoryRecovery`

Advise Memory Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { adviseMemoryRecovery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export declare function adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice;
```

### 调用签名

```text
adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryRecoveryAdvice`
- 说明: 返回值契约由上述类型定义。

## `classifyMemoryFailure`

Classify Memory Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyMemoryFailure } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export declare function classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure;
```

### 调用签名

```text
classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>MemoryFailureContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryFailure`
- 说明: 返回值契约由上述类型定义。

## `MemoryFailureContext`

Memory Failure Context 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryFailureContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export interface MemoryFailureContext {
    id: string;
    operation: MemoryRecoveryOperation;
    scope: MemoryRecoveryScope;
    occurredAt?: string;
    providerId?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    recordId?: string;
    idempotencyKey?: string;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: MemoryRecoveryOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordId` | 属性 | <code>recordId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: MemoryRecoveryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState?: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecoveryAdvice`

Memory Recovery Advice 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRecoveryAdvice } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export interface MemoryRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    allowBoundedEmptyResult: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBoundedEmptyResult` | 属性 | <code>allowBoundedEmptyResult: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecoveryScope`

Memory Recovery Scope 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRecoveryScope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export interface MemoryRecoveryScope {
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    userId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecoveryOperation`

Memory Recovery Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryRecoveryOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### 声明

```text
export type MemoryRecoveryOperation = 'read' | 'search' | 'write' | 'update' | 'invalidate' | 'summarize' | 'audit';
```
