# `@codesoul-co/hypha-harness` / `recovery-supervisor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/recovery-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)
- 导出数: **8**

## 模块用法

用于处理有界恢复、重试或降级。Recovery supervisor 模块公开 1 函数、6 接口、1 类型。

### 从包入口导入

```ts
import {
  runRecoverySupervisor,
} from '@codesoul-co/hypha-harness';

import type {
  RecoveryParticipant,
  RecoveryParticipantContext,
  RecoveryParticipantResult,
  RecoverySupervisorOptions,
  RecoverySupervisorResult,
  RecoverySupervisorScheduler,
  RecoveryParticipantAction,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runRecoverySupervisor` | 函数 | <code>runRecoverySupervisor(options: RecoverySupervisorOptions): Promise&lt;RecoverySupervisorResult&gt;</code> | Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated. |
| `RecoveryParticipant` | 接口 | <code>interface RecoveryParticipant</code> | Recovery Participant 接口，共包含 9 个公开字段或方法。 |
| `RecoveryParticipantContext` | 接口 | <code>interface RecoveryParticipantContext</code> | Recovery Participant Context 接口，共包含 10 个公开字段或方法。 |
| `RecoveryParticipantResult` | 接口 | <code>interface RecoveryParticipantResult</code> | Recovery Participant Result 接口，共包含 3 个公开字段或方法。 |
| `RecoverySupervisorOptions` | 接口 | <code>interface RecoverySupervisorOptions</code> | Recovery Supervisor Options 接口，共包含 18 个公开字段或方法。 |
| `RecoverySupervisorResult` | 接口 | <code>interface RecoverySupervisorResult</code> | Recovery Supervisor Result 接口，共包含 5 个公开字段或方法。 |
| `RecoverySupervisorScheduler` | 接口 | <code>interface RecoverySupervisorScheduler</code> | Recovery Supervisor Scheduler 接口，共包含 1 个公开字段或方法。 |
| `RecoveryParticipantAction` | 类型 | <code>type RecoveryParticipantAction = (context: RecoveryParticipantContext) =&gt; Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Recovery Participant Action 公共类型别名；完整类型表达式见声明。 |

## `runRecoverySupervisor`

Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated.

- 种类: 函数
- 导入: `import { runRecoverySupervisor } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export declare function runRecoverySupervisor(options: RecoverySupervisorOptions): Promise<RecoverySupervisorResult>;
```

### 调用签名

```text
runRecoverySupervisor(options: RecoverySupervisorOptions): Promise<RecoverySupervisorResult>
```

Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>RecoverySupervisorOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<RecoverySupervisorResult>`
- 说明: 返回值契约由上述类型定义。

## `RecoveryParticipant`

Recovery Participant 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryParticipant } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoveryParticipant<TOutput = unknown> {
    id: string;
    module: RecoveryModule;
    dependsOn?: string[];
    execute: RecoveryParticipantAction<TOutput>;
    classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure | Promise<RecoveryFailure>;
    reconcile?: RecoveryParticipantAction<TOutput>;
    fallback?: RecoveryParticipantAction<TOutput>;
    degrade?: RecoveryParticipantAction<TOutput>;
    compensate?: RecoveryParticipantAction<TOutput>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classify` | 方法 | <code>classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure &#124; Promise&lt;RecoveryFailure&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compensate` | 方法 | <code>compensate?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `degrade` | 方法 | <code>degrade?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `dependsOn` | 属性 | <code>dependsOn?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execute` | 方法 | <code>execute(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fallback` | 方法 | <code>fallback?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile?(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RecoveryParticipantContext`

Recovery Participant Context 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryParticipantContext } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoveryParticipantContext {
    caseId: string;
    runId: string;
    scope: RecoveryKnowledgeScope;
    participantId: string;
    module: RecoveryModule;
    cycle: number;
    outputs: Readonly<Record<string, unknown>>;
    snapshot?: Readonly<RecoveryCaseSnapshot>;
    failure?: RecoveryFailure;
    signal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseId` | 属性 | <code>caseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cycle` | 属性 | <code>cycle: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure?: RecoveryFailure</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputs` | 属性 | <code>outputs: Readonly&lt;Record&lt;string, unknown&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `participantId` | 属性 | <code>participantId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RecoveryKnowledgeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot?: Readonly&lt;RecoveryCaseSnapshot&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryParticipantResult`

Recovery Participant Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryParticipantResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoveryParticipantResult<TOutput = unknown> {
    output: TOutput;
    evidence: RecoveryEvidence;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidence` | 属性 | <code>evidence: RecoveryEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoverySupervisorOptions`

Recovery Supervisor Options 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoverySupervisorOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoverySupervisorOptions {
    fsm: FSMRuntime;
    caseId: string;
    userId: string;
    tenantId?: string;
    participants: RecoveryParticipant[];
    policy?: Partial<RecoveryConvergencePolicy>;
    knowledge?: RecoveryKnowledgePort;
    trace?: TraceRecorder;
    sessionId?: string;
    workspaceId?: string;
    stepId?: string;
    agentId?: string;
    domainPackId?: string;
    scheduler?: RecoverySupervisorScheduler;
    maxInlineDelayMs?: number;
    signal?: AbortSignal;
    now?: () => string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `caseId` | 属性 | <code>caseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackId` | 属性 | <code>domainPackId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsm` | 属性 | <code>fsm: FSMRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `knowledge` | 属性 | <code>knowledge?: RecoveryKnowledgePort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInlineDelayMs` | 属性 | <code>maxInlineDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `participants` | 属性 | <code>participants: RecoveryParticipant&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy?: Partial&lt;RecoveryConvergencePolicy&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scheduler` | 属性 | <code>scheduler?: RecoverySupervisorScheduler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoverySupervisorResult`

Recovery Supervisor Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoverySupervisorResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoverySupervisorResult {
    status: 'succeeded' | 'degraded' | 'compensated' | 'suspended' | 'quarantined' | 'failed' | 'cancelled';
    outputs: Record<string, unknown>;
    snapshot?: RecoveryCaseSnapshot;
    failure?: RecoveryFailure;
    error?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure?: RecoveryFailure</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputs` | 属性 | <code>outputs: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot?: RecoveryCaseSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "quarantined" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoverySupervisorScheduler`

Recovery Supervisor Scheduler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoverySupervisorScheduler } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export interface RecoverySupervisorScheduler {
    wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `wait` | 方法 | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RecoveryParticipantAction`

Recovery Participant Action 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoveryParticipantAction } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)

### 声明

```text
export type RecoveryParticipantAction<TOutput = unknown> = (context: RecoveryParticipantContext) => Promise<RecoveryParticipantResult<TOutput>>;
```
