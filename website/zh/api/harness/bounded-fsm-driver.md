# `@codesoul-co/hypha-harness` / `bounded-fsm-driver`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/bounded-fsm-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)
- 导出数: **7**

## 模块用法

用于使用该功能边界的公共契约与操作。Bounded FSM driver 模块公开 1 类、5 接口、1 类型。

### 从包入口导入

```ts
import {
  FencedBoundedFSMDriver,
} from '@codesoul-co/hypha-harness';

import type {
  BoundedFSMDriverResult,
  BoundedFSMDriverRunInput,
  BoundedStateExecutionDecision,
  BoundedStateExecutorInput,
  FencedBoundedFSMDriverOptions,
  BoundedFSMDriverDisposition,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FencedBoundedFSMDriver` | 类 | <code>new FencedBoundedFSMDriver(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Fenced Bounded FSM Driver 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `BoundedFSMDriverResult` | 接口 | <code>interface BoundedFSMDriverResult</code> | Bounded FSM Driver Result 接口，共包含 4 个公开字段或方法。 |
| `BoundedFSMDriverRunInput` | 接口 | <code>interface BoundedFSMDriverRunInput</code> | Bounded FSM Driver Run Input 接口，共包含 9 个公开字段或方法。 |
| `BoundedStateExecutionDecision` | 接口 | <code>interface BoundedStateExecutionDecision</code> | Bounded State Execution Decision 接口，共包含 3 个公开字段或方法。 |
| `BoundedStateExecutorInput` | 接口 | <code>interface BoundedStateExecutorInput</code> | Bounded State Executor Input 接口，共包含 7 个公开字段或方法。 |
| `FencedBoundedFSMDriverOptions` | 接口 | <code>interface FencedBoundedFSMDriverOptions</code> | Fenced Bounded FSM Driver Options 接口，共包含 9 个公开字段或方法。 |
| `BoundedFSMDriverDisposition` | 类型 | <code>type BoundedFSMDriverDisposition = 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'waiting' &#124; 'budget_exhausted' &#124; 'lease_unavailable' &#124; 'state_claim_unavailable'</code> | Bounded FSM Driver Disposition 公共类型别名；完整类型表达式见声明。 |

## `FencedBoundedFSMDriver`

Fenced Bounded FSM Driver 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FencedBoundedFSMDriver } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export declare class FencedBoundedFSMDriver {
    constructor(options: FencedBoundedFSMDriverOptions);
    run(input: BoundedFSMDriverRunInput): Promise<BoundedFSMDriverResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: BoundedFSMDriverRunInput): Promise&lt;BoundedFSMDriverResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `BoundedFSMDriverResult`

Bounded FSM Driver Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BoundedFSMDriverResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export interface BoundedFSMDriverResult {
    disposition: BoundedFSMDriverDisposition;
    steps: number;
    projection: RuntimeOrchestrationProjection;
    wait?: RuntimeWaitIntent;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: BoundedFSMDriverDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `steps` | 属性 | <code>steps: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `wait` | 属性 | <code>wait?: RuntimeWaitIntent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BoundedFSMDriverRunInput`

Bounded FSM Driver Run Input 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BoundedFSMDriverRunInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export interface BoundedFSMDriverRunInput {
    scope: RuntimeScope;
    process: FSMProcessSpec;
    ownerId: string;
    commandId?: string;
    maxSteps: number;
    leaseTtlMs: number;
    stateClaimTtlMs: number;
    deadlineAt?: string;
    abortSignal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSteps` | 属性 | <code>maxSteps: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `process` | 属性 | <code>process: FSMProcessSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateClaimTtlMs` | 属性 | <code>stateClaimTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BoundedStateExecutionDecision`

Bounded State Execution Decision 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BoundedStateExecutionDecision } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export interface BoundedStateExecutionDecision {
    result: RuntimeStateExecutionResult;
    transition?: RuntimeTransitionProposal;
    guardContext?: FSMGuardContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext?: FSMGuardContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result: RuntimeStateExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transition` | 属性 | <code>transition?: RuntimeTransitionProposal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BoundedStateExecutorInput`

Bounded State Executor Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BoundedStateExecutorInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export interface BoundedStateExecutorInput {
    scope: Readonly<RuntimeScope>;
    process: Readonly<FSMProcessSpec>;
    state: Readonly<FSMStateSpec>;
    projection: Readonly<RuntimeOrchestrationProjection>;
    runLease: Readonly<FencedRunLease>;
    stateClaim: Readonly<StateExecutionClaim>;
    abortSignal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `process` | 属性 | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: Readonly&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: Readonly&lt;FencedRunLease&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateClaim` | 属性 | <code>stateClaim: Readonly&lt;StateExecutionClaim&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FencedBoundedFSMDriverOptions`

Fenced Bounded FSM Driver Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FencedBoundedFSMDriverOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export interface FencedBoundedFSMDriverOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    stateClaims: StateExecutionClaimStore;
    executeState(input: BoundedStateExecutorInput): Promise<BoundedStateExecutionDecision>;
    evaluateGuard?: (transition: Readonly<FSMTransitionSpec>, context: Readonly<FSMGuardContext>) => Promise<boolean> | boolean;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluateGuard` | 方法 | <code>evaluateGuard?(transition: Readonly&lt;FSMTransitionSpec&gt;, context: Readonly&lt;FSMGuardContext&gt;): Promise&lt;boolean&gt; &#124; boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executeState` | 方法 | <code>executeState(input: BoundedStateExecutorInput): Promise&lt;BoundedStateExecutionDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateClaims` | 属性 | <code>stateClaims: StateExecutionClaimStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BoundedFSMDriverDisposition`

Bounded FSM Driver Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { BoundedFSMDriverDisposition } from '@codesoul-co/hypha-harness';`
- 源码模块: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### 声明

```text
export type BoundedFSMDriverDisposition = 'completed' | 'failed' | 'cancelled' | 'waiting' | 'budget_exhausted' | 'lease_unavailable' | 'state_claim_unavailable';
```
