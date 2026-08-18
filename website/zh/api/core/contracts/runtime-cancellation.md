# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-cancellation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)
- 导出数: **18**

## 模块用法

用于声明并运行时校验契约。Runtime cancellation 模块公开 4 常量、10 接口、4 类型。

### 从包入口导入

```ts
import {
  RUNTIME_CANCELLATION_DISPOSITIONS,
  RUNTIME_CANCELLATION_PROPAGATIONS,
  RUNTIME_CANCELLATION_TARGET_STATUSES,
  RUNTIME_CANCELLATION_TARGET_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityCancellationPort,
  RuntimeActivityCancellationRequest,
  RuntimeCancelCommand,
  RuntimeCancellationPolicy,
  RuntimeCancellationTargetResult,
  RuntimeCancelResult,
  RuntimeChildRunCancellationPort,
  RuntimeChildRunCancellationRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 14 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CANCELLATION_DISPOSITIONS` | 常量 | <code>const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION DISPOSITIONS 常量。 |
| `RUNTIME_CANCELLATION_PROPAGATIONS` | 常量 | <code>const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION PROPAGATIONS 常量。 |
| `RUNTIME_CANCELLATION_TARGET_STATUSES` | 常量 | <code>const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET STATUSES 常量。 |
| `RUNTIME_CANCELLATION_TARGET_TYPES` | 常量 | <code>const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET TYPES 常量。 |
| `RuntimeActivityCancellationPort` | 接口 | <code>interface RuntimeActivityCancellationPort</code> | Runtime Activity Cancellation Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeActivityCancellationRequest` | 接口 | <code>interface RuntimeActivityCancellationRequest</code> | Runtime Activity Cancellation Request 接口，共包含 7 个公开字段或方法。 |
| `RuntimeCancelCommand` | 接口 | <code>interface RuntimeCancelCommand</code> | Runtime Cancel Command 接口，共包含 9 个公开字段或方法。 |
| `RuntimeCancellationPolicy` | 接口 | <code>interface RuntimeCancellationPolicy</code> | Runtime Cancellation Policy 接口，共包含 3 个公开字段或方法。 |
| `RuntimeCancellationTargetResult` | 接口 | <code>interface RuntimeCancellationTargetResult</code> | Runtime Cancellation Target Result 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCancelResult` | 接口 | <code>interface RuntimeCancelResult</code> | Runtime Cancel Result 接口，共包含 6 个公开字段或方法。 |
| `RuntimeChildRunCancellationPort` | 接口 | <code>interface RuntimeChildRunCancellationPort</code> | Runtime Child Run Cancellation Port 接口，共包含 2 个公开字段或方法。 |
| `RuntimeChildRunCancellationRequest` | 接口 | <code>interface RuntimeChildRunCancellationRequest</code> | Runtime Child Run Cancellation Request 接口，共包含 8 个公开字段或方法。 |
| `RuntimeChildRunListRequest` | 接口 | <code>interface RuntimeChildRunListRequest</code> | Runtime Child Run List Request 接口，共包含 2 个公开字段或方法。 |
| `RuntimeChildRunReference` | 接口 | <code>interface RuntimeChildRunReference</code> | Runtime Child Run Reference 接口，共包含 1 个公开字段或方法。 |
| `RuntimeCancellationDisposition` | 类型 | <code>type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number]</code> | Runtime Cancellation Disposition 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCancellationPropagation` | 类型 | <code>type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number]</code> | Runtime Cancellation Propagation 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCancellationTargetStatus` | 类型 | <code>type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number]</code> | Runtime Cancellation Target Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCancellationTargetType` | 类型 | <code>type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number]</code> | Runtime Cancellation Target Type 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_CANCELLATION_DISPOSITIONS`

由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION DISPOSITIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CANCELLATION_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export declare const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"];
```

## `RUNTIME_CANCELLATION_PROPAGATIONS`

由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION PROPAGATIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CANCELLATION_PROPAGATIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export declare const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"];
```

## `RUNTIME_CANCELLATION_TARGET_STATUSES`

由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CANCELLATION_TARGET_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export declare const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"];
```

## `RUNTIME_CANCELLATION_TARGET_TYPES`

由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CANCELLATION_TARGET_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export declare const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"];
```

## `RuntimeActivityCancellationPort`

Runtime Activity Cancellation Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityCancellationPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeActivityCancellationPort {
    cancel(request: RuntimeActivityCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: RuntimeActivityCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityCancellationRequest`

Runtime Activity Cancellation Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityCancellationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeActivityCancellationRequest {
    scope: RuntimeScope;
    activityId: string;
    reason: string;
    requestedAt: string;
    deadlineAt?: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancelCommand`

Runtime Cancel Command 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancelCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeCancelCommand {
    commandId: string;
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    ownerId: string;
    leaseTtlMs: number;
    reason: string;
    policy: RuntimeCancellationPolicy;
    requestedAt: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy: RuntimeCancellationPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancellationPolicy`

Runtime Cancellation Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancellationPolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeCancellationPolicy {
    propagation: RuntimeCancellationPropagation;
    cancelRunningActivities: boolean;
    waitGraceMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelRunningActivities` | 属性 | <code>cancelRunningActivities: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `propagation` | 属性 | <code>propagation: "none" &#124; "children" &#124; "all_descendants"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitGraceMs` | 属性 | <code>waitGraceMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancellationTargetResult`

Runtime Cancellation Target Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancellationTargetResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeCancellationTargetResult {
    targetType: RuntimeCancellationTargetType;
    targetId: string;
    status: RuntimeCancellationTargetStatus;
    error?: NormalizedRuntimeError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedRuntimeError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "cancelled" &#124; "failed" &#124; "not_found" &#124; "already_terminal"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetId` | 属性 | <code>targetId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetType` | 属性 | <code>targetType: "activity" &#124; "child_run" &#124; "session_command"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancelResult`

Runtime Cancel Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancelResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeCancelResult {
    commandId: string;
    disposition: RuntimeCancellationDisposition;
    eventIds: string[];
    targetResults: RuntimeCancellationTargetResult[];
    unresolvedActivityIds: string[];
    projection: RuntimeOrchestrationProjection;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetResults` | 属性 | <code>targetResults: RuntimeCancellationTargetResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `unresolvedActivityIds` | 属性 | <code>unresolvedActivityIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeChildRunCancellationPort`

Runtime Child Run Cancellation Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeChildRunCancellationPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeChildRunCancellationPort {
    listChildren(request: RuntimeChildRunListRequest): Promise<RuntimeChildRunReference[]>;
    cancel(request: RuntimeChildRunCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: RuntimeChildRunCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listChildren` | 方法 | <code>listChildren(request: RuntimeChildRunListRequest): Promise&lt;RuntimeChildRunReference[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeChildRunCancellationRequest`

Runtime Child Run Cancellation Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeChildRunCancellationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeChildRunCancellationRequest {
    parentScope: RuntimeScope;
    childRunId: string;
    reason: string;
    propagation: Exclude<RuntimeCancellationPropagation, 'none'>;
    requestedAt: string;
    deadlineAt?: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `childRunId` | 属性 | <code>childRunId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentScope` | 属性 | <code>parentScope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `propagation` | 属性 | <code>propagation: "children" &#124; "all_descendants"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeChildRunListRequest`

Runtime Child Run List Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeChildRunListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeChildRunListRequest {
    scope: RuntimeScope;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeChildRunReference`

Runtime Child Run Reference 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeChildRunReference } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export interface RuntimeChildRunReference {
    runId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancellationDisposition`

Runtime Cancellation Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCancellationDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number];
```

## `RuntimeCancellationPropagation`

Runtime Cancellation Propagation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCancellationPropagation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number];
```

## `RuntimeCancellationTargetStatus`

Runtime Cancellation Target Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCancellationTargetStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number];
```

## `RuntimeCancellationTargetType`

Runtime Cancellation Target Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCancellationTargetType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### 声明

```text
export type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number];
```
