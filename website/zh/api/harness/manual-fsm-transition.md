# `@codesoul-co/hypha-harness` / `manual-fsm-transition`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/manual-fsm-transition.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)
- 导出数: **6**

## 模块用法

用于使用该功能边界的公共契约与操作。Manual FSM transition 模块公开 1 类、1 常量、4 接口。

### 从包入口导入

```ts
import {
  GovernedFSMTransitionService,
  MANUAL_FSM_TRANSITION_PERMISSION,
} from '@codesoul-co/hypha-harness';

import type {
  GovernedFSMTransitionServiceOptions,
  ManualFSMRunView,
  ManualFSMTransitionCommand,
  ManualFSMTransitionResult,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedFSMTransitionService` | 类 | <code>new GovernedFSMTransitionService(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly. |
| `MANUAL_FSM_TRANSITION_PERMISSION` | 常量 | <code>const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition"</code> | 由 `manual-fsm-transition` 模块导出的 MANUAL FSM TRANSITION PERMISSION 常量。 |
| `GovernedFSMTransitionServiceOptions` | 接口 | <code>interface GovernedFSMTransitionServiceOptions</code> | Governed FSM Transition Service Options 接口，共包含 7 个公开字段或方法。 |
| `ManualFSMRunView` | 接口 | <code>interface ManualFSMRunView</code> | Manual FSM Run View 接口，共包含 10 个公开字段或方法。 |
| `ManualFSMTransitionCommand` | 接口 | <code>interface ManualFSMTransitionCommand</code> | Manual FSM Transition Command 接口，共包含 15 个公开字段或方法。 |
| `ManualFSMTransitionResult` | 接口 | <code>interface ManualFSMTransitionResult</code> | Manual FSM Transition Result 接口，共包含 5 个公开字段或方法。 |

## `GovernedFSMTransitionService`

Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly.

- 种类: 类
- 导入: `import { GovernedFSMTransitionService } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export declare class GovernedFSMTransitionService {
    constructor(options: GovernedFSMTransitionServiceOptions);
    inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise<ManualFSMRunView>;
    transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise<ManualFSMTransitionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | 创建该类的实例。 |
| `inspect` | 方法 | <code>inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise&lt;ManualFSMRunView&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transition` | 方法 | <code>transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise&lt;ManualFSMTransitionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MANUAL_FSM_TRANSITION_PERMISSION`

由 `manual-fsm-transition` 模块导出的 MANUAL FSM TRANSITION PERMISSION 常量。

- 种类: 常量
- 导入: `import { MANUAL_FSM_TRANSITION_PERMISSION } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export declare const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition";
```

## `GovernedFSMTransitionServiceOptions`

Governed FSM Transition Service Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedFSMTransitionServiceOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export interface GovernedFSMTransitionServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    policy?: PolicyEngine;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy?: PolicyEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManualFSMRunView`

Manual FSM Run View 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManualFSMRunView } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export interface ManualFSMRunView {
    runId: string;
    processId: string;
    processVersion: string;
    runRevision: number;
    runStatus: RuntimeOrchestrationProjection['runStatus'];
    currentState?: string;
    statePath: string[];
    stateAttempt: number;
    terminalStates: string[];
    allowedTransitions: Array<{
        to: string;
        guard?: string;
        description?: string;
    }>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTransitions` | 属性 | <code>allowedTransitions: { to: string; guard?: string; description?: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentState` | 属性 | <code>currentState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processVersion` | 属性 | <code>processVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runStatus` | 属性 | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeOrchestrationRunStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManualFSMTransitionCommand`

Manual FSM Transition Command 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManualFSMTransitionCommand } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export interface ManualFSMTransitionCommand {
    commandId: string;
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    ownerId: string;
    leaseTtlMs: number;
    processId: string;
    processVersion: string;
    expectedState: string;
    expectedRunRevision: number;
    targetState: string;
    reason: string;
    requestedAt: string;
    guardContext?: FSMGuardContext;
    variablesPatch?: Record<string, RuntimeJsonValue>;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedState` | 属性 | <code>expectedState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guardContext` | 属性 | <code>guardContext?: FSMGuardContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processVersion` | 属性 | <code>processVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetState` | 属性 | <code>targetState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variablesPatch` | 属性 | <code>variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManualFSMTransitionResult`

Manual FSM Transition Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManualFSMTransitionResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### 声明

```text
export interface ManualFSMTransitionResult {
    commandId: string;
    disposition: 'applied' | 'reused' | 'lease_unavailable';
    eventIds: string[];
    runRevision: number;
    view: ManualFSMRunView;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `view` | 属性 | <code>view: ManualFSMRunView</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
