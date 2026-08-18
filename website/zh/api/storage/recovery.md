# `@codesoul-co/hypha-storage` / `recovery`

- 包索引: [`@codesoul-co/hypha-storage`](/zh/api/storage)
- 源码: [`packages/storage/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)
- 导出数: **5**

## 模块用法

用于处理有界恢复、重试或降级。Recovery 模块公开 2 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  adviseStorageRecovery,
  classifyStorageFailure,
} from '@codesoul-co/hypha-storage';

import type {
  StorageFailureContext,
  StorageRecoveryAdvice,
  StorageRecoveryOperation,
} from '@codesoul-co/hypha-storage';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseStorageRecovery` | 函数 | <code>adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice</code> | Advise Storage Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `classifyStorageFailure` | 函数 | <code>classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure</code> | Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect. |
| `StorageFailureContext` | 接口 | <code>interface StorageFailureContext</code> | Storage Failure Context 接口，共包含 17 个公开字段或方法。 |
| `StorageRecoveryAdvice` | 接口 | <code>interface StorageRecoveryAdvice</code> | Storage Recovery Advice 接口，共包含 6 个公开字段或方法。 |
| `StorageRecoveryOperation` | 类型 | <code>type StorageRecoveryOperation = 'read' &#124; 'query' &#124; 'list' &#124; 'write' &#124; 'update' &#124; 'delete' &#124; 'transaction_begin' &#124; 'transaction_commit' &#124; 'transaction_rollback' &#124; 'event_append' &#124; 'artifact_write' &#124; 'artifact_delete' &#124; 'lease_acquire' &#124; 'lease_renew' &#124; 'lease_release' &#124; 'snapshot' &#124; 'restore'</code> | Storage Recovery Operation 公共类型别名；完整类型表达式见声明。 |

## `adviseStorageRecovery`

Advise Storage Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { adviseStorageRecovery } from '@codesoul-co/hypha-storage';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### 声明

```text
export declare function adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice;
```

### 调用签名

```text
adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageRecoveryAdvice`
- 说明: 返回值契约由上述类型定义。

## `classifyStorageFailure`

Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect.

- 种类: 函数
- 导入: `import { classifyStorageFailure } from '@codesoul-co/hypha-storage';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### 声明

```text
export declare function classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure;
```

### 调用签名

```text
classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure
```

Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>StorageFailureContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryFailure`
- 说明: 返回值契约由上述类型定义。

## `StorageFailureContext`

Storage Failure Context 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageFailureContext } from '@codesoul-co/hypha-storage';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### 声明

```text
export interface StorageFailureContext {
    id: string;
    operation: StorageRecoveryOperation;
    providerId: string;
    role: StorageRole;
    engine?: StorageEngine;
    resourceKey?: string;
    occurredAt?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    expectedRevision?: string | number;
    observedRevision?: string | number;
    idempotencyKey?: string;
    input?: unknown;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `engine` | 属性 | <code>engine?: StorageEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedRevision` | 属性 | <code>observedRevision?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: StorageRecoveryOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceKey` | 属性 | <code>resourceKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: StorageRole</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState?: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageRecoveryAdvice`

Storage Recovery Advice 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageRecoveryAdvice } from '@codesoul-co/hypha-storage';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### 声明

```text
export interface StorageRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    requireReconciliation: boolean;
    refreshRevisionBeforeRetry: boolean;
    mayUseCompatibleReplica: boolean;
    invalidateDerivedCaches: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidateDerivedCaches` | 属性 | <code>invalidateDerivedCaches: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mayUseCompatibleReplica` | 属性 | <code>mayUseCompatibleReplica: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshRevisionBeforeRetry` | 属性 | <code>refreshRevisionBeforeRetry: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireReconciliation` | 属性 | <code>requireReconciliation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageRecoveryOperation`

Storage Recovery Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageRecoveryOperation } from '@codesoul-co/hypha-storage';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### 声明

```text
export type StorageRecoveryOperation = 'read' | 'query' | 'list' | 'write' | 'update' | 'delete' | 'transaction_begin' | 'transaction_commit' | 'transaction_rollback' | 'event_append' | 'artifact_write' | 'artifact_delete' | 'lease_acquire' | 'lease_renew' | 'lease_release' | 'snapshot' | 'restore';
```
