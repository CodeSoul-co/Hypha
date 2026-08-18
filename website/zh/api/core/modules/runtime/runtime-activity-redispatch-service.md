# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-redispatch-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)
- 导出数: **9**

## 模块用法

用于执行该边界的运行时行为。Runtime activity redispatch service 模块公开 1 类、1 函数、6 接口、1 类型。

### 从包入口导入

```ts
import {
  RuntimeActivityRedispatchService,
  runtimeActivityRedispatchIdentity,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityRedispatchAttempt,
  RuntimeActivityRedispatchCommand,
  RuntimeActivityRedispatchPort,
  RuntimeActivityRedispatchResult,
  RuntimeActivityRedispatchServiceOptions,
  RuntimeActivityRevisionValidator,
  RuntimeActivityRedispatchReconciliation,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeActivityRedispatchService` | 类 | <code>new RuntimeActivityRedispatchService(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched. |
| `runtimeActivityRedispatchIdentity` | 函数 | <code>runtimeActivityRedispatchIdentity(command: Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;): string</code> | Runtime Activity Redispatch Identity 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RuntimeActivityRedispatchAttempt` | 接口 | <code>interface RuntimeActivityRedispatchAttempt</code> | Runtime Activity Redispatch Attempt 接口，共包含 9 个公开字段或方法。 |
| `RuntimeActivityRedispatchCommand` | 接口 | <code>interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference</code> | Runtime Activity Redispatch Command 接口，共包含 12 个公开字段或方法。 |
| `RuntimeActivityRedispatchPort` | 接口 | <code>interface RuntimeActivityRedispatchPort</code> | Runtime Activity Redispatch Port 接口，共包含 2 个公开字段或方法。 |
| `RuntimeActivityRedispatchResult` | 接口 | <code>interface RuntimeActivityRedispatchResult</code> | Runtime Activity Redispatch Result 接口，共包含 8 个公开字段或方法。 |
| `RuntimeActivityRedispatchServiceOptions` | 接口 | <code>interface RuntimeActivityRedispatchServiceOptions</code> | Runtime Activity Redispatch Service Options 接口，共包含 12 个公开字段或方法。 |
| `RuntimeActivityRevisionValidator` | 接口 | <code>interface RuntimeActivityRevisionValidator</code> | Runtime Activity Revision Validator 接口，共包含 1 个公开字段或方法。 |
| `RuntimeActivityRedispatchReconciliation` | 类型 | <code>type RuntimeActivityRedispatchReconciliation = { status: 'accepted'; commandId: string; } &#124; { status: 'safe_to_dispatch'; } &#124; { status: 'unknown'; reason: string; }</code> | Runtime Activity Redispatch Reconciliation 公共类型别名；完整类型表达式见声明。 |

## `RuntimeActivityRedispatchService`

Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched.

- 种类: 类
- 导入: `import { RuntimeActivityRedispatchService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export declare class RuntimeActivityRedispatchService {
    constructor(options: RuntimeActivityRedispatchServiceOptions);
    redispatch(command: RuntimeActivityRedispatchCommand): Promise<RuntimeActivityRedispatchResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | 创建该类的实例。 |
| `redispatch` | 方法 | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `runtimeActivityRedispatchIdentity`

Runtime Activity Redispatch Identity 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runtimeActivityRedispatchIdentity } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export declare function runtimeActivityRedispatchIdentity(command: Pick<RuntimeActivityRedispatchCommand, 'scope' | 'taskId' | 'expectedTaskRevision'>): string;
```

### 调用签名

```text
runtimeActivityRedispatchIdentity(command: Pick<RuntimeActivityRedispatchCommand, "scope" | "taskId" | "expectedTaskRevision">): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `command` | <code>Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `RuntimeActivityRedispatchAttempt`

Runtime Activity Redispatch Attempt 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchAttempt } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchAttempt {
    scope: Readonly<RuntimeScope>;
    task: Readonly<RuntimeHumanTask>;
    descriptor: Readonly<RuntimeActivityDescriptor>;
    redispatchCommandId: string;
    redispatchIdempotencyKey: string;
    approvalEventId: string;
    requestEventId: string;
    fencingToken: number;
    signal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalEventId` | 属性 | <code>approvalEventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `descriptor` | 属性 | <code>descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redispatchCommandId` | 属性 | <code>redispatchCommandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redispatchIdempotencyKey` | 属性 | <code>redispatchIdempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestEventId` | 属性 | <code>requestEventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `task` | 属性 | <code>task: Readonly&lt;RuntimeHumanTask&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRedispatchCommand`

Runtime Activity Redispatch Command 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    taskId: string;
    expectedTaskRevision: number;
    expectedSubjectHash: string;
    requestedAt: string;
    idempotencyKey?: string;
    signal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSubjectHash` | 属性 | <code>expectedSubjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedTaskRevision` | 属性 | <code>expectedTaskRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRedispatchPort`

Runtime Activity Redispatch Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchPort {
    dispatch(input: RuntimeActivityRedispatchAttempt): Promise<{
        commandId: string;
        reused: boolean;
    }>;
    /**
     * Resolves the crash window between an accepted external dispatch and its
     * durable Runtime receipt. `safe_to_dispatch` is an authoritative absence
     * result; uncertainty must be returned as `unknown`.
     */
    reconcile(input: RuntimeActivityRedispatchAttempt): Promise<RuntimeActivityRedispatchReconciliation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(input: RuntimeActivityRedispatchAttempt): Promise&lt;{ commandId: string; reused: boolean; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(input: RuntimeActivityRedispatchAttempt): Promise&lt;RuntimeActivityRedispatchReconciliation&gt;</code> | Resolves the crash window between an accepted external dispatch and its durable Runtime receipt. `safe_to_dispatch` is an authoritative absence result; uncertainty must be returned as `unknown`. |

## `RuntimeActivityRedispatchResult`

Runtime Activity Redispatch Result 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchResult {
    commandId: string;
    requestEventId: string;
    receiptEventId: string;
    activityCommandId: string;
    eventReused: boolean;
    receiptReused: boolean;
    commandReused: boolean;
    reconciled: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityCommandId` | 属性 | <code>activityCommandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandReused` | 属性 | <code>commandReused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventReused` | 属性 | <code>eventReused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptEventId` | 属性 | <code>receiptEventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptReused` | 属性 | <code>receiptReused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciled` | 属性 | <code>reconciled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestEventId` | 属性 | <code>requestEventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRedispatchServiceOptions`

Runtime Activity Redispatch Service Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchServiceOptions {
    events: EventRuntime;
    runLeases: RunLeaseStore;
    descriptors: RuntimeActivityDescriptorStore;
    revisions: RuntimeActivityRevisionValidator;
    dispatcher: RuntimeActivityRedispatchPort;
    renewalIntervalMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, commandId: string) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
    nextId?: (namespace: string) => string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `descriptors` | 属性 | <code>descriptors: RuntimeActivityDescriptorStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dispatcher` | 属性 | <code>dispatcher: RuntimeActivityRedispatchPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `monotonicNow` | 方法 | <code>monotonicNow?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure?(error: unknown, commandId: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revisions` | 属性 | <code>revisions: RuntimeActivityRevisionValidator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `wait` | 方法 | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityRevisionValidator`

Runtime Activity Revision Validator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRevisionValidator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export interface RuntimeActivityRevisionValidator {
    validate(input: {
        task: Readonly<RuntimeHumanTask>;
        descriptor: Readonly<RuntimeActivityDescriptor>;
    }): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `validate` | 方法 | <code>validate(input: { task: Readonly&lt;RuntimeHumanTask&gt;; descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityRedispatchReconciliation`

Runtime Activity Redispatch Reconciliation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityRedispatchReconciliation } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### 声明

```text
export type RuntimeActivityRedispatchReconciliation = {
    status: 'accepted';
    commandId: string;
} | {
    status: 'safe_to_dispatch';
} | {
    status: 'unknown';
    reason: string;
};
```
