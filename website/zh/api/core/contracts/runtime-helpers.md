# `@codesoul-co/hypha-core` / `contracts/runtime-helpers`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)
- 导出数: **33**

## 模块用法

用于声明并运行时校验契约。Runtime helpers 模块公开 2 常量、27 接口、4 类型。

### 从包入口导入

```ts
import {
  RUNTIME_DETERMINISTIC_OBSERVATION_KINDS,
  RUNTIME_WAIT_INTENT_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  HumanWaitRequest,
  PauseRequest,
  RuntimeClockHelper,
  RuntimeDeterminismResolution,
  RuntimeDeterminismResolveRequest,
  RuntimeDeterminismScope,
  RuntimeDeterminismStore,
  RuntimeDeterministicObservation,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 31 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS` | 常量 | <code>const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"]</code> | 由 `contracts/runtime-helpers` 模块导出的 RUNTIME DETERMINISTIC OBSERVATION KINDS 常量。 |
| `RUNTIME_WAIT_INTENT_TYPES` | 常量 | <code>const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"]</code> | 由 `contracts/runtime-helpers` 模块导出的 RUNTIME WAIT INTENT TYPES 常量。 |
| `HumanWaitRequest` | 接口 | <code>interface HumanWaitRequest</code> | Human Wait Request 接口，共包含 5 个公开字段或方法。 |
| `PauseRequest` | 接口 | <code>interface PauseRequest</code> | Pause Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeClockHelper` | 接口 | <code>interface RuntimeClockHelper</code> | Runtime Clock Helper 接口，共包含 2 个公开字段或方法。 |
| `RuntimeDeterminismResolution` | 接口 | <code>interface RuntimeDeterminismResolution</code> | Runtime Determinism Resolution 接口，共包含 2 个公开字段或方法。 |
| `RuntimeDeterminismResolveRequest` | 接口 | <code>interface RuntimeDeterminismResolveRequest</code> | Runtime Determinism Resolve Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeDeterminismScope` | 接口 | <code>interface RuntimeDeterminismScope</code> | Runtime Determinism Scope 接口，共包含 5 个公开字段或方法。 |
| `RuntimeDeterminismStore` | 接口 | <code>interface RuntimeDeterminismStore</code> | Runtime Determinism Store 接口，共包含 1 个公开字段或方法。 |
| `RuntimeDeterministicObservation` | 接口 | <code>interface RuntimeDeterministicObservation</code> | Runtime Deterministic Observation 接口，共包含 4 个公开字段或方法。 |
| `RuntimeEventAppendOptions` | 接口 | <code>interface RuntimeEventAppendOptions</code> | Runtime Event Append Options 接口，共包含 4 个公开字段或方法。 |
| `RuntimeEventCommitPort` | 接口 | <code>interface RuntimeEventCommitPort</code> | Runtime Event Commit Port 接口，共包含 2 个公开字段或方法。 |
| `RuntimeEventCommitRequest` | 接口 | <code>interface RuntimeEventCommitRequest</code> | Runtime Event Commit Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeEventHelper` | 接口 | <code>interface RuntimeEventHelper</code> | Runtime Event Helper 接口，共包含 3 个公开字段或方法。 |
| `RuntimeHelperExecutionScope` | 接口 | <code>interface RuntimeHelperExecutionScope</code> | Runtime Helper Execution Scope 接口，共包含 6 个公开字段或方法。 |
| `RuntimeHelperSdk` | 接口 | <code>interface RuntimeHelperSdk</code> | Runtime Helper Sdk 接口，共包含 4 个公开字段或方法。 |
| `RuntimeIdHelper` | 接口 | <code>interface RuntimeIdHelper</code> | Runtime ID Helper 接口，共包含 1 个公开字段或方法。 |
| `RuntimeIoHelperSdk` | 接口 | <code>interface RuntimeIoHelperSdk</code> | Runtime Io Helper Sdk 接口，共包含 2 个公开字段或方法。 |
| `RuntimeObservationEventInput` | 接口 | <code>interface RuntimeObservationEventInput</code> | Runtime Observation Event Input 接口，共包含 3 个公开字段或方法。 |
| `RuntimeResourceAcquireOptions` | 接口 | <code>interface RuntimeResourceAcquireOptions</code> | Runtime Resource Acquire Options 接口，共包含 2 个公开字段或方法。 |
| `RuntimeResourceHelper` | 接口 | <code>interface RuntimeResourceHelper</code> | Runtime Resource Helper 接口，共包含 4 个公开字段或方法。 |
| `RuntimeResourceHelperDependencies` | 接口 | <code>interface RuntimeResourceHelperDependencies</code> | Runtime Resource Helper Dependencies 接口，共包含 5 个公开字段或方法。 |
| `RuntimeResourceRenewOptions` | 接口 | <code>interface RuntimeResourceRenewOptions</code> | Runtime Resource Renew Options 接口，共包含 1 个公开字段或方法。 |
| `RuntimeTransitionHelper` | 接口 | <code>interface RuntimeTransitionHelper</code> | Runtime Transition Helper 接口，共包含 4 个公开字段或方法。 |
| `RuntimeTransitionProposal` | 接口 | <code>interface RuntimeTransitionProposal</code> | Runtime Transition Proposal 接口，共包含 3 个公开字段或方法。 |
| `RuntimeWaitHelper` | 接口 | <code>interface RuntimeWaitHelper</code> | Runtime Wait Helper 接口，共包含 4 个公开字段或方法。 |
| `RuntimeWaitIntent` | 接口 | <code>interface RuntimeWaitIntent</code> | Runtime Wait Intent 接口，共包含 8 个公开字段或方法。 |
| `SignalWaitRequest` | 接口 | <code>interface SignalWaitRequest</code> | Signal Wait Request 接口，共包含 5 个公开字段或方法。 |
| `TimerWaitRequest` | 接口 | <code>interface TimerWaitRequest</code> | Timer Wait Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeDeterministicObservationKind` | 类型 | <code>type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number]</code> | Runtime Deterministic Observation Kind 公共类型别名；完整类型表达式见声明。 |
| `RuntimeJsonValue` | 类型 | <code>type RuntimeJsonValue = null &#124; boolean &#124; number &#124; string &#124; RuntimeJsonValue[] &#124; { [key: string]: RuntimeJsonValue; }</code> | Runtime JSON Value 公共类型别名；完整类型表达式见声明。 |
| `RuntimeStateExecutionResult` | 类型 | <code>type RuntimeStateExecutionResult = { kind: 'completed'; output?: RuntimeJsonValue; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;; } &#124; { kind: 'continued'; observation?: RuntimeJsonValue; } &#124; { kind: 'failed'; error: NormalizedRuntimeError; } &#124; { kind: 'waiting'; wait: RuntimeWaitIntent; }</code> | Runtime State Execution Result 公共类型别名；完整类型表达式见声明。 |
| `RuntimeWaitIntentType` | 类型 | <code>type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number]</code> | Runtime Wait Intent Type 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS`

由 `contracts/runtime-helpers` 模块导出的 RUNTIME DETERMINISTIC OBSERVATION KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_DETERMINISTIC_OBSERVATION_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export declare const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"];
```

## `RUNTIME_WAIT_INTENT_TYPES`

由 `contracts/runtime-helpers` 模块导出的 RUNTIME WAIT INTENT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_WAIT_INTENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export declare const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"];
```

## `HumanWaitRequest`

Human Wait Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HumanWaitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface HumanWaitRequest {
    key?: string;
    expiresAt?: string;
    timeoutTransitionId?: string;
    pendingActionRef?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PauseRequest`

Pause Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PauseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface PauseRequest {
    reason: string;
    resumeKey?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumeKey` | 属性 | <code>resumeKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeClockHelper`

Runtime Clock Helper 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeClockHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeClockHelper {
    now(): Promise<string>;
    sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sleepUntil` | 方法 | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeDeterminismResolution`

Runtime Determinism Resolution 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeDeterminismResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeDeterminismResolution<T extends RuntimeJsonValue = RuntimeJsonValue> {
    observation: RuntimeDeterministicObservation<T>;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observation` | 属性 | <code>observation: RuntimeDeterministicObservation&lt;T&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeDeterminismResolveRequest`

Runtime Determinism Resolve Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeDeterminismResolveRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeDeterminismResolveRequest {
    scope: RuntimeDeterminismScope;
    key: string;
    kind: RuntimeDeterministicObservationKind;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "clock" &#124; "id"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeDeterminismScope`

Runtime Determinism Scope 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeDeterminismScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeDeterminismScope {
    tenantId?: string;
    userId: string;
    runId: string;
    stateId: string;
    stateAttempt: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeDeterminismStore`

Runtime Determinism Store 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeDeterminismStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeDeterminismStore {
    resolve<T extends RuntimeJsonValue>(request: RuntimeDeterminismResolveRequest, produce: () => T | Promise<T>): Promise<RuntimeDeterminismResolution<T>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeDeterministicObservation`

Runtime Deterministic Observation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeDeterministicObservation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeDeterministicObservation<T extends RuntimeJsonValue = RuntimeJsonValue> {
    scope: RuntimeDeterminismScope;
    key: string;
    kind: RuntimeDeterministicObservationKind;
    value: T;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "clock" &#124; "id"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: T</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeEventAppendOptions`

Runtime Event Append Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeEventAppendOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeEventAppendOptions {
    idempotencyKey?: string;
    causationId?: string;
    parentEventId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeEventCommitPort`

Runtime Event Commit Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeEventCommitPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeEventCommitPort {
    append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]>;
    readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readSince` | 方法 | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeEventCommitRequest`

Runtime Event Commit Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeEventCommitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeEventCommitRequest {
    scope: RuntimeHelperExecutionScope;
    events: EventCreateInput[];
    fencingToken: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeHelperExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeEventHelper`

Runtime Event Helper 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeEventHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeEventHelper {
    append<T extends RuntimeJsonValue>(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise<FrameworkEvent<T>>;
    appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]>;
    readSince(sequence: number): Promise<FrameworkEvent[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;T extends RuntimeJsonValue&gt;(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `appendBatch` | 方法 | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readSince` | 方法 | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeHelperExecutionScope`

Runtime Helper Execution Scope 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHelperExecutionScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeHelperExecutionScope {
    scope: RuntimeScope;
    stateId: string;
    stateAttempt: number;
    fencingToken: number;
    correlationId: string;
    causationId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHelperSdk`

Runtime Helper Sdk 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHelperSdk } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeHelperSdk {
    readonly transitions: RuntimeTransitionHelper;
    readonly waits: RuntimeWaitHelper;
    readonly clock: RuntimeClockHelper;
    readonly ids: RuntimeIdHelper;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>readonly clock: RuntimeClockHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>readonly ids: RuntimeIdHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitions` | 属性 | <code>readonly transitions: RuntimeTransitionHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waits` | 属性 | <code>readonly waits: RuntimeWaitHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeIdHelper`

Runtime ID Helper 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIdHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeIdHelper {
    next(namespace: string): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `next` | 方法 | <code>next(namespace: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeIoHelperSdk`

Runtime Io Helper Sdk 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIoHelperSdk } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeIoHelperSdk {
    readonly events: RuntimeEventHelper;
    readonly resources: RuntimeResourceHelper;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>readonly events: RuntimeEventHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>readonly resources: RuntimeResourceHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeObservationEventInput`

Runtime Observation Event Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeObservationEventInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeObservationEventInput<T extends RuntimeJsonValue = RuntimeJsonValue> {
    type: RuntimeObservationEventType;
    payload: T;
    options?: RuntimeEventAppendOptions;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `options` | 属性 | <code>options?: RuntimeEventAppendOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: T</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: `runtime.observation.${string}`</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResourceAcquireOptions`

Runtime Resource Acquire Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceAcquireOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeResourceAcquireOptions {
    ttlMs: number;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResourceHelper`

Runtime Resource Helper 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeResourceHelper {
    acquire(resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[], options: RuntimeResourceAcquireOptions): Promise<RuntimeResourceClaim[]>;
    renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise<RuntimeResourceClaim[]>;
    release(claims: RuntimeResourceClaim[]): Promise<void>;
    assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeResourceHelperDependencies`

Runtime Resource Helper Dependencies 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceHelperDependencies } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeResourceHelperDependencies {
    runLease: RunLeaseAuthorization;
    coordinator: RuntimeResourceCoordinator;
    ids: RuntimeIdHelper;
    clock: RuntimeClockHelper;
    stateId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>clock: RuntimeClockHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `coordinator` | 属性 | <code>coordinator: RuntimeResourceCoordinator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResourceRenewOptions`

Runtime Resource Renew Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResourceRenewOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeResourceRenewOptions {
    ttlMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTransitionHelper`

Runtime Transition Helper 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTransitionHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeTransitionHelper {
    propose(to: string, reason?: string, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeTransitionProposal;
    complete(output?: RuntimeJsonValue, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeStateExecutionResult;
    continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult;
    fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `continue` | 方法 | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `propose` | 方法 | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeTransitionProposal`

Runtime Transition Proposal 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTransitionProposal } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeTransitionProposal {
    to: string;
    reason?: string;
    variablesPatch?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variablesPatch` | 属性 | <code>variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeWaitHelper`

Runtime Wait Helper 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeWaitHelper } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeWaitHelper {
    human(request: HumanWaitRequest): RuntimeStateExecutionResult;
    signal(request: SignalWaitRequest): RuntimeStateExecutionResult;
    timer(request: TimerWaitRequest): RuntimeStateExecutionResult;
    pause(request: PauseRequest): RuntimeStateExecutionResult;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `human` | 方法 | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pause` | 方法 | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `signal` | 方法 | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `timer` | 方法 | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeWaitIntent`

Runtime Wait Intent 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeWaitIntent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface RuntimeWaitIntent {
    type: RuntimeWaitIntentType;
    key?: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    timeoutTransitionId?: string;
    pendingActionRef?: string;
    reason?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SignalWaitRequest`

Signal Wait Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SignalWaitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface SignalWaitRequest {
    key: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    timeoutTransitionId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TimerWaitRequest`

Timer Wait Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TimerWaitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export interface TimerWaitRequest {
    fireAt: string;
    timeoutTransitionId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fireAt` | 属性 | <code>fireAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeDeterministicObservationKind`

Runtime Deterministic Observation Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeDeterministicObservationKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number];
```

## `RuntimeJsonValue`

Runtime JSON Value 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeJsonValue } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export type RuntimeJsonValue = null | boolean | number | string | RuntimeJsonValue[] | {
    [key: string]: RuntimeJsonValue;
};
```

## `RuntimeStateExecutionResult`

Runtime State Execution Result 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeStateExecutionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export type RuntimeStateExecutionResult = {
    kind: 'completed';
    output?: RuntimeJsonValue;
    variablesPatch?: Record<string, RuntimeJsonValue>;
} | {
    kind: 'continued';
    observation?: RuntimeJsonValue;
} | {
    kind: 'failed';
    error: NormalizedRuntimeError;
} | {
    kind: 'waiting';
    wait: RuntimeWaitIntent;
};
```

## `RuntimeWaitIntentType`

Runtime Wait Intent Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeWaitIntentType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### 声明

```text
export type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number];
```
