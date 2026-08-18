# `@codesoul-co/hypha-core` / `modules/execution/recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)
- 导出数: **5**

## 模块用法

用于执行该边界的运行时行为。Recovery 模块公开 2 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  adviseExecutionRecovery,
  classifyExecutionFailure,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionFailureContext,
  ExecutionRecoveryAdvice,
  ExecutionRecoveryOperation,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseExecutionRecovery` | 函数 | <code>adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice</code> | Advise Execution Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `classifyExecutionFailure` | 函数 | <code>classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure</code> | Classify Execution Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ExecutionFailureContext` | 接口 | <code>interface ExecutionFailureContext</code> | Execution Failure Context 接口，共包含 14 个公开字段或方法。 |
| `ExecutionRecoveryAdvice` | 接口 | <code>interface ExecutionRecoveryAdvice</code> | Execution Recovery Advice 接口，共包含 4 个公开字段或方法。 |
| `ExecutionRecoveryOperation` | 类型 | <code>type ExecutionRecoveryOperation = 'validate' &#124; 'queue' &#124; 'start' &#124; 'poll' &#124; 'cancel' &#124; 'persist' &#124; 'cleanup'</code> | Execution Recovery Operation 公共类型别名；完整类型表达式见声明。 |

## `adviseExecutionRecovery`

Advise Execution Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { adviseExecutionRecovery } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### 声明

```text
export declare function adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice;
```

### 调用签名

```text
adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecoveryAdvice`
- 说明: 返回值契约由上述类型定义。

## `classifyExecutionFailure`

Classify Execution Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyExecutionFailure } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### 声明

```text
export declare function classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure;
```

### 调用签名

```text
classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>ExecutionFailureContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryFailure`
- 说明: 返回值契约由上述类型定义。

## `ExecutionFailureContext`

Execution Failure Context 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionFailureContext } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### 声明

```text
export interface ExecutionFailureContext {
    id: string;
    operation: ExecutionRecoveryOperation;
    occurredAt?: string;
    request?: CommandExecutionRequest;
    record?: ExecutionRecord;
    result?: CommandExecutionResult;
    assessment?: ExecutionRecoveryAssessment;
    providerId?: string;
    providerRevision?: string;
    policyRevision?: string;
    specRevision?: string;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessment` | 属性 | <code>assessment?: ExecutionRecoveryAssessment</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: ExecutionRecoveryOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record?: ExecutionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request?: CommandExecutionRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result?: CommandExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState?: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecoveryAdvice`

Execution Recovery Advice 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionRecoveryAdvice } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### 声明

```text
export interface ExecutionRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    refreshRecordBeforeRetry: boolean;
    requireReceiptReconciliation: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshRecordBeforeRetry` | 属性 | <code>refreshRecordBeforeRetry: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireReceiptReconciliation` | 属性 | <code>requireReceiptReconciliation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionRecoveryOperation`

Execution Recovery Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionRecoveryOperation } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### 声明

```text
export type ExecutionRecoveryOperation = 'validate' | 'queue' | 'start' | 'poll' | 'cancel' | 'persist' | 'cleanup';
```
