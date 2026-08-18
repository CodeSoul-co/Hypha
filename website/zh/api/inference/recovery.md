# `@codesoul-co/hypha-inference` / `recovery`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)
- 导出数: **6**

## 模块用法

用于处理有界恢复、重试或降级。Recovery 模块公开 3 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  adviseInferenceRecovery,
  classifyInferenceCacheFailure,
  classifyInferenceFailure,
} from '@codesoul-co/hypha-inference';

import type {
  InferenceFailureContext,
  InferenceRecoveryAdvice,
  InferenceRecoveryOperation,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseInferenceRecovery` | 函数 | <code>adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice</code> | Advise Inference Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `classifyInferenceCacheFailure` | 函数 | <code>classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Classify Inference Cache Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `classifyInferenceFailure` | 函数 | <code>classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Classify Inference Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InferenceFailureContext` | 接口 | <code>interface InferenceFailureContext</code> | Inference Failure Context 接口，共包含 9 个公开字段或方法。 |
| `InferenceRecoveryAdvice` | 接口 | <code>interface InferenceRecoveryAdvice</code> | Inference Recovery Advice 接口，共包含 4 个公开字段或方法。 |
| `InferenceRecoveryOperation` | 类型 | <code>type InferenceRecoveryOperation = 'infer' &#124; 'stream' &#124; 'prefix_cache_read' &#124; 'kv_cache_read' &#124; 'kv_cache_write' &#124; 'cache_invalidate'</code> | Inference Recovery Operation 公共类型别名；完整类型表达式见声明。 |

## `adviseInferenceRecovery`

Advise Inference Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { adviseInferenceRecovery } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export declare function adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice;
```

### 调用签名

```text
adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `InferenceRecoveryAdvice`
- 说明: 返回值契约由上述类型定义。

## `classifyInferenceCacheFailure`

Classify Inference Cache Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyInferenceCacheFailure } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export declare function classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure;
```

### 调用签名

```text
classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>InferenceFailureContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryFailure`
- 说明: 返回值契约由上述类型定义。

## `classifyInferenceFailure`

Classify Inference Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyInferenceFailure } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export declare function classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure;
```

### 调用签名

```text
classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>InferenceFailureContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryFailure`
- 说明: 返回值契约由上述类型定义。

## `InferenceFailureContext`

Inference Failure Context 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceFailureContext } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export interface InferenceFailureContext {
    id: string;
    operation: InferenceRecoveryOperation;
    request: InferenceRequest;
    providerId: string;
    occurredAt?: string;
    providerRevision?: string;
    policyRevision?: string;
    specRevision?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: InferenceRecoveryOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: InferenceRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceRecoveryAdvice`

Inference Recovery Advice 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceRecoveryAdvice } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export interface InferenceRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    mayUseCompatibleProviderFallback: boolean;
    mayBypassCache: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mayBypassCache` | 属性 | <code>mayBypassCache: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mayUseCompatibleProviderFallback` | 属性 | <code>mayUseCompatibleProviderFallback: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceRecoveryOperation`

Inference Recovery Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { InferenceRecoveryOperation } from '@codesoul-co/hypha-inference';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### 声明

```text
export type InferenceRecoveryOperation = 'infer' | 'stream' | 'prefix_cache_read' | 'kv_cache_read' | 'kv_cache_write' | 'cache_invalidate';
```
