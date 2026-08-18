# `@codesoul-co/hypha-core` / `contracts/runtime-projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)
- 导出数: **6**

## 模块用法

用于声明并运行时校验契约。Runtime projection 模块公开 5 接口、1 类型。

### 从包入口导入

```ts
import type {
  RuntimeCancellationProjection,
  RuntimeOrchestrationProjection,
  RuntimePendingTransitionProjection,
  RuntimePendingWaitProjection,
  RuntimeResumeProjection,
  RuntimeOrchestrationRunStatus,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCancellationProjection` | 接口 | <code>interface RuntimeCancellationProjection</code> | Runtime Cancellation Projection 接口，共包含 4 个公开字段或方法。 |
| `RuntimeOrchestrationProjection` | 接口 | <code>interface RuntimeOrchestrationProjection</code> | Runtime Orchestration Projection 接口，共包含 13 个公开字段或方法。 |
| `RuntimePendingTransitionProjection` | 接口 | <code>interface RuntimePendingTransitionProjection</code> | Runtime Pending Transition Projection 接口，共包含 3 个公开字段或方法。 |
| `RuntimePendingWaitProjection` | 接口 | <code>interface RuntimePendingWaitProjection</code> | Runtime Pending Wait Projection 接口，共包含 10 个公开字段或方法。 |
| `RuntimeResumeProjection` | 接口 | <code>interface RuntimeResumeProjection</code> | Runtime Resume Projection 接口，共包含 7 个公开字段或方法。 |
| `RuntimeOrchestrationRunStatus` | 类型 | <code>type RuntimeOrchestrationRunStatus = 'not_created' &#124; RuntimeRunStatus</code> | Runtime Orchestration Run Status 公共类型别名；完整类型表达式见声明。 |

## `RuntimeCancellationProjection`

Runtime Cancellation Projection 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancellationProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export interface RuntimeCancellationProjection {
    commandId: string;
    principalId: string;
    reason: string;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeOrchestrationProjection`

Runtime Orchestration Projection 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export interface RuntimeOrchestrationProjection {
    runId: string;
    runStatus: RuntimeOrchestrationRunStatus;
    currentState?: string;
    terminalState?: string;
    statePath: string[];
    stateVisitCounts: Record<string, number>;
    stateAttempt: number;
    pendingTransition?: RuntimePendingTransitionProjection;
    pendingHumanActionRef?: string;
    pendingWait?: RuntimePendingWaitProjection;
    lastResume?: RuntimeResumeProjection;
    cancellation?: RuntimeCancellationProjection;
    pendingActivityIds: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation?: RuntimeCancellationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentState` | 属性 | <code>currentState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastResume` | 属性 | <code>lastResume?: RuntimeResumeProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActivityIds` | 属性 | <code>pendingActivityIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingHumanActionRef` | 属性 | <code>pendingHumanActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingTransition` | 属性 | <code>pendingTransition?: RuntimePendingTransitionProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingWait` | 属性 | <code>pendingWait?: RuntimePendingWaitProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runStatus` | 属性 | <code>runStatus: RuntimeOrchestrationRunStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateVisitCounts` | 属性 | <code>stateVisitCounts: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalState` | 属性 | <code>terminalState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimePendingTransitionProjection`

Runtime Pending Transition Projection 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimePendingTransitionProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export interface RuntimePendingTransitionProjection {
    eventId: string;
    from: string;
    to: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventId` | 属性 | <code>eventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimePendingWaitProjection`

Runtime Pending Wait Projection 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimePendingWaitProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export interface RuntimePendingWaitProjection {
    waitId: string;
    stateId: string;
    stateAttempt: number;
    type: RuntimeWaitIntentType;
    key?: string;
    pendingActionRef?: string;
    reason?: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSchema` | 属性 | <code>expectedSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeResumeProjection`

Runtime Resume Projection 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeResumeProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export interface RuntimeResumeProjection {
    commandId: string;
    kind: 'manual' | 'signal' | 'timer';
    waitId: string;
    principalId: string;
    key?: string;
    payload?: RuntimeJsonValue;
    resumedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "manual" &#124; "signal" &#124; "timer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload?: RuntimeJsonValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumedAt` | 属性 | <code>resumedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeOrchestrationRunStatus`

Runtime Orchestration Run Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeOrchestrationRunStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### 声明

```text
export type RuntimeOrchestrationRunStatus = 'not_created' | RuntimeRunStatus;
```
