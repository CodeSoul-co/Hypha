# `@codesoul-co/hypha-memory` / `bounded-recovery`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/bounded-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)
- 导出数: **5**

## 模块用法

用于处理有界恢复、重试或降级。Bounded recovery 模块公开 2 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  createMemoryFailureFingerprint,
  resolveBoundedMemoryRecovery,
} from '@codesoul-co/hypha-memory';

import type {
  BoundedMemoryRecoveryOutcome,
  MemoryRecoveryBudget,
  MemoryRunRecoveryState,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createMemoryFailureFingerprint` | 函数 | <code>createMemoryFailureFingerprint(failure: RecoveryFailure): string</code> | Create Memory Failure Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveBoundedMemoryRecovery` | 函数 | <code>resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome</code> | Resolve Bounded Memory Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `BoundedMemoryRecoveryOutcome` | 接口 | <code>interface BoundedMemoryRecoveryOutcome</code> | Bounded Memory Recovery Outcome 接口，共包含 7 个公开字段或方法。 |
| `MemoryRecoveryBudget` | 接口 | <code>interface MemoryRecoveryBudget</code> | Memory Recovery Budget 接口，共包含 5 个公开字段或方法。 |
| `MemoryRunRecoveryState` | 类型 | <code>type MemoryRunRecoveryState = 'degraded' &#124; 'waiting' &#124; 'review' &#124; 'quarantined' &#124; 'failed'</code> | Memory Run Recovery State 公共类型别名；完整类型表达式见声明。 |

## `createMemoryFailureFingerprint`

Create Memory Failure Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryFailureFingerprint } from '@codesoul-co/hypha-memory';`
- 源码模块: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### 声明

```text
export declare function createMemoryFailureFingerprint(failure: RecoveryFailure): string;
```

### 调用签名

```text
createMemoryFailureFingerprint(failure: RecoveryFailure): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `resolveBoundedMemoryRecovery`

Resolve Bounded Memory Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveBoundedMemoryRecovery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### 声明

```text
export declare function resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome;
```

### 调用签名

```text
resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `budget` | <code>MemoryRecoveryBudget</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `BoundedMemoryRecoveryOutcome`
- 说明: 返回值契约由上述类型定义。

## `BoundedMemoryRecoveryOutcome`

Bounded Memory Recovery Outcome 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BoundedMemoryRecoveryOutcome } from '@codesoul-co/hypha-memory';`
- 源码模块: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### 声明

```text
export interface BoundedMemoryRecoveryOutcome {
    state: MemoryRunRecoveryState;
    strategy: ReturnType<typeof adviseMemoryRecovery>['strategy'];
    retryAllowed: boolean;
    boundedEmptyResultAllowed: boolean;
    failureFingerprint: string;
    reason: string;
    nextAttempt?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `boundedEmptyResultAllowed` | 属性 | <code>boundedEmptyResultAllowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextAttempt` | 属性 | <code>nextAttempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAllowed` | 属性 | <code>retryAllowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: MemoryRunRecoveryState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecoveryBudget`

Memory Recovery Budget 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRecoveryBudget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### 声明

```text
export interface MemoryRecoveryBudget {
    maxAttempts: number;
    attemptsUsed: number;
    deadline?: string;
    now?: string;
    seenFailureFingerprints?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attemptsUsed` | 属性 | <code>attemptsUsed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadline` | 属性 | <code>deadline?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `seenFailureFingerprints` | 属性 | <code>seenFailureFingerprints?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRunRecoveryState`

Memory Run Recovery State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryRunRecoveryState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### 声明

```text
export type MemoryRunRecoveryState = 'degraded' | 'waiting' | 'review' | 'quarantined' | 'failed';
```
