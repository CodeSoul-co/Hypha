# `@codesoul-co/hypha-core` / `contracts/runtime-activities`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)
- 导出数: **20**

## 模块用法

用于声明并运行时校验契约。Runtime activities 模块公开 3 常量、9 接口、8 类型。

### 从包入口导入

```ts
import {
  RUNTIME_ACTIVITY_EFFECTS,
  RUNTIME_ACTIVITY_OBSERVATION_STATUSES,
  RUNTIME_ACTIVITY_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityDispatchPort,
  RuntimeActivityHelper,
  RuntimeActivityInvocation,
  RuntimeActivityLifecycleCommitPort,
  RuntimeActivityLifecycleCommitRequest,
  RuntimeActivityObservation,
  RuntimeActivityOptions,
  RuntimeActivityRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 17 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_EFFECTS` | 常量 | <code>const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY EFFECTS 常量。 |
| `RUNTIME_ACTIVITY_OBSERVATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY OBSERVATION STATUSES 常量。 |
| `RUNTIME_ACTIVITY_TYPES` | 常量 | <code>const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY TYPES 常量。 |
| `RuntimeActivityDispatchPort` | 接口 | <code>interface RuntimeActivityDispatchPort</code> | Runtime Activity Dispatch Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeActivityHelper` | 接口 | <code>interface RuntimeActivityHelper</code> | Runtime Activity Helper 接口，共包含 5 个公开字段或方法。 |
| `RuntimeActivityInvocation` | 接口 | <code>interface RuntimeActivityInvocation</code> | Runtime Activity Invocation 接口，共包含 17 个公开字段或方法。 |
| `RuntimeActivityLifecycleCommitPort` | 接口 | <code>interface RuntimeActivityLifecycleCommitPort</code> | Runtime Activity Lifecycle Commit Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeActivityLifecycleCommitRequest` | 接口 | <code>interface RuntimeActivityLifecycleCommitRequest</code> | Runtime Activity Lifecycle Commit Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeActivityObservation` | 接口 | <code>interface RuntimeActivityObservation</code> | Runtime Activity Observation 接口，共包含 8 个公开字段或方法。 |
| `RuntimeActivityOptions` | 接口 | <code>interface RuntimeActivityOptions</code> | Runtime Activity Options 接口，共包含 6 个公开字段或方法。 |
| `RuntimeActivityRequest` | 接口 | <code>interface RuntimeActivityRequest</code> | Runtime Activity Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeActivityRetryOptions` | 接口 | <code>interface RuntimeActivityRetryOptions</code> | Runtime Activity Retry Options 接口，共包含 3 个公开字段或方法。 |
| `RuntimeActivityEffect` | 类型 | <code>type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number]</code> | Runtime Activity Effect 公共类型别名；完整类型表达式见声明。 |
| `RuntimeActivityObservationStatus` | 类型 | <code>type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number]</code> | Runtime Activity Observation Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeActivityType` | 类型 | <code>type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number]</code> | Runtime Activity Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCustomActivityRequest` | 类型 | <code>type RuntimeCustomActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Custom Activity Request 公共类型别名；完整类型表达式见声明。 |
| `RuntimeExecutionActivityRequest` | 类型 | <code>type RuntimeExecutionActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Execution Activity Request 公共类型别名；完整类型表达式见声明。 |
| `RuntimeMemoryActivityRequest` | 类型 | <code>type RuntimeMemoryActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Memory Activity Request 公共类型别名；完整类型表达式见声明。 |
| `RuntimeModelActivityRequest` | 类型 | <code>type RuntimeModelActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Model Activity Request 公共类型别名；完整类型表达式见声明。 |
| `RuntimeToolActivityRequest` | 类型 | <code>type RuntimeToolActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Tool Activity Request 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_ACTIVITY_EFFECTS`

由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY EFFECTS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_EFFECTS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"];
```

## `RUNTIME_ACTIVITY_OBSERVATION_STATUSES`

由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY OBSERVATION STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_OBSERVATION_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"];
```

## `RUNTIME_ACTIVITY_TYPES`

由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"];
```

## `RuntimeActivityDispatchPort`

Runtime Activity Dispatch Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityDispatchPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityDispatchPort {
    dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise<RuntimeActivityObservation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityHelper`

Runtime Activity Helper 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityHelper {
    tool(request: RuntimeToolActivityRequest): Promise<RuntimeActivityObservation>;
    memory(request: RuntimeMemoryActivityRequest): Promise<RuntimeActivityObservation>;
    model(request: RuntimeModelActivityRequest): Promise<RuntimeActivityObservation>;
    execution(request: RuntimeExecutionActivityRequest): Promise<RuntimeActivityObservation>;
    custom(request: RuntimeCustomActivityRequest): Promise<RuntimeActivityObservation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `custom` | 方法 | <code>custom(request: RuntimeCustomActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execution` | 方法 | <code>execution(request: RuntimeExecutionActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `memory` | 方法 | <code>memory(request: RuntimeMemoryActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `model` | 方法 | <code>model(request: RuntimeModelActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `tool` | 方法 | <code>tool(request: RuntimeToolActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityInvocation`

Runtime Activity Invocation 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityInvocation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityInvocation<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
    activityId: string;
    operationId: string;
    activityType: RuntimeActivityType;
    target: string;
    input: TInput;
    scope: RuntimeScope;
    stateId: string;
    stateAttempt: number;
    fencingToken: number;
    correlationId: string;
    causationId?: string;
    idempotencyKey: string;
    requestedAt: string;
    effect: RuntimeActivityEffect;
    timeoutMs?: number;
    retry?: RuntimeActivityRetryOptions;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityType` | 属性 | <code>activityType: "memory" &#124; "tool" &#124; "model" &#124; "custom" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effect` | 属性 | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retry` | 属性 | <code>retry?: RuntimeActivityRetryOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityLifecycleCommitPort`

Runtime Activity Lifecycle Commit Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityLifecycleCommitPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityLifecycleCommitPort {
    append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityLifecycleCommitRequest`

Runtime Activity Lifecycle Commit Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityLifecycleCommitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityLifecycleCommitRequest {
    execution: RuntimeHelperExecutionScope;
    event: EventCreateInput;
    fencingToken: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: EventCreateInput&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityObservation`

Runtime Activity Observation 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityObservation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityObservation<TOutput extends RuntimeJsonValue = RuntimeJsonValue> {
    activityId: string;
    status: RuntimeActivityObservationStatus;
    eventIds: string[];
    output?: TOutput;
    artifactRefs?: string[];
    retryable?: boolean;
    error?: NormalizedRuntimeError;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedRuntimeError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "waiting"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityOptions`

Runtime Activity Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityOptions {
    effect?: RuntimeActivityEffect;
    timeoutMs?: number;
    retry?: RuntimeActivityRetryOptions;
    idempotencyKey?: string;
    causationId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effect` | 属性 | <code>effect?: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retry` | 属性 | <code>retry?: RuntimeActivityRetryOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRequest`

Runtime Activity Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
    target: string;
    input: TInput;
    options?: RuntimeActivityOptions;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: RuntimeActivityOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRetryOptions`

Runtime Activity Retry Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRetryOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export interface RuntimeActivityRetryOptions {
    maxAttempts: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialDelayMs` | 属性 | <code>initialDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDelayMs` | 属性 | <code>maxDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityEffect`

Runtime Activity Effect 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityEffect } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number];
```

## `RuntimeActivityObservationStatus`

Runtime Activity Observation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityObservationStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number];
```

## `RuntimeActivityType`

Runtime Activity Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number];
```

## `RuntimeCustomActivityRequest`

Runtime Custom Activity Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCustomActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeCustomActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeExecutionActivityRequest`

Runtime Execution Activity Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeExecutionActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeMemoryActivityRequest`

Runtime Memory Activity Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeMemoryActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeMemoryActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeModelActivityRequest`

Runtime Model Activity Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeModelActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeModelActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeToolActivityRequest`

Runtime Tool Activity Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeToolActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### 声明

```text
export type RuntimeToolActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```
