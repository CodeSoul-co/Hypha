# `@codesoul-co/hypha-harness` / `runtime`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)
- 导出数: **20**

## 模块用法

用于执行该边界的运行时行为。Runtime 模块公开 3 类、4 函数、13 接口。

### 从包入口导入

```ts
import {
  EventFirstRuntime,
  HarnessedReActFSMRunner,
  RunManager,
  projectAudit,
  projectReplay,
  projectRun,
  projectSession,
} from '@codesoul-co/hypha-harness';

import type {
  AppendRunEventInput,
  AuditProjection,
  CreateRunInput,
  CreateSessionInput,
  HarnessedReActFSMRunInput,
  HarnessedReActFSMRunnerOptions,
  HarnessedReActFSMRunResult,
  RegressionProjection,
} from '@codesoul-co/hypha-harness';

// 完整导出列表见下方。
```

### 使用要点

- 13 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EventFirstRuntime` | 类 | <code>new EventFirstRuntime(events?: EventStore): EventFirstRuntime</code> | Event First Runtime 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `HarnessedReActFSMRunner` | 类 | <code>new HarnessedReActFSMRunner(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Harnessed ReAct FSM Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RunManager` | 类 | <code>new RunManager(options?: RunManagerOptions): RunManager</code> | Run Manager 类，共公开 36 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `projectAudit` | 函数 | <code>projectAudit(events: FrameworkEvent[]): AuditProjection</code> | Project Audit 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `projectReplay` | 函数 | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Project Replay 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `projectRun` | 函数 | <code>projectRun(events: FrameworkEvent[]): RuntimeRun &#124; null</code> | Project Run 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `projectSession` | 函数 | <code>projectSession(events: FrameworkEvent[]): RuntimeSession &#124; null</code> | Project Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AppendRunEventInput` | 接口 | <code>interface AppendRunEventInput</code> | Append Run Event Input 接口，共包含 11 个公开字段或方法。 |
| `AuditProjection` | 接口 | <code>interface AuditProjection</code> | Audit Projection 接口，共包含 8 个公开字段或方法。 |
| `CreateRunInput` | 接口 | <code>interface CreateRunInput</code> | Create Run Input 接口，共包含 9 个公开字段或方法。 |
| `CreateSessionInput` | 接口 | <code>interface CreateSessionInput</code> | Create Session Input 接口，共包含 6 个公开字段或方法。 |
| `HarnessedReActFSMRunInput` | 接口 | <code>interface HarnessedReActFSMRunInput extends ContextBuildInput&lt;TInput&gt;</code> | Harnessed ReAct FSM Run Input 接口，共包含 16 个公开字段或方法。 |
| `HarnessedReActFSMRunnerOptions` | 接口 | <code>interface HarnessedReActFSMRunnerOptions</code> | Harnessed ReAct FSM Runner Options 接口，共包含 22 个公开字段或方法。 |
| `HarnessedReActFSMRunResult` | 接口 | <code>interface HarnessedReActFSMRunResult</code> | Harnessed ReAct FSM Run Result 接口，共包含 4 个公开字段或方法。 |
| `RegressionProjection` | 接口 | <code>interface RegressionProjection</code> | Regression Projection 接口，共包含 8 个公开字段或方法。 |
| `ReplayProjection` | 接口 | <code>interface ReplayProjection</code> | Replay Projection 接口，共包含 16 个公开字段或方法。 |
| `RunExecutionContext` | 接口 | <code>interface RunExecutionContext</code> | Run Execution Context 接口，共包含 4 个公开字段或方法。 |
| `RunManagerOptions` | 接口 | <code>interface RunManagerOptions</code> | Run Manager Options 接口，共包含 2 个公开字段或方法。 |
| `RuntimeRun` | 接口 | <code>interface RuntimeRun</code> | Runtime Run 接口，共包含 12 个公开字段或方法。 |
| `RuntimeSession` | 接口 | <code>interface RuntimeSession</code> | Runtime Session 接口，共包含 8 个公开字段或方法。 |

## `EventFirstRuntime`

Event First Runtime 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { EventFirstRuntime } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare class EventFirstRuntime {
    constructor(events?: EventStore);
    createSession(input: CreateSessionInput): Promise<RuntimeSession>;
    createRun(input: CreateRunInput): Promise<RuntimeRun>;
    appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent>;
    projectSession(sessionId: string): Promise<RuntimeSession | null>;
    projectRun(runId: string): Promise<RuntimeRun | null>;
    projectReplay(runId: string): Promise<ReplayProjection>;
    projectAudit(runId: string): Promise<AuditProjection>;
    projectRegression(runId: string): Promise<RegressionProjection>;
    listEvents(runId: string): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendRunEvent` | 方法 | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(events?: EventStore): EventFirstRuntime</code> | 创建该类的实例。 |
| `createRun` | 方法 | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createSession` | 方法 | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listEvents` | 方法 | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectAudit` | 方法 | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectRegression` | 方法 | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectReplay` | 方法 | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectRun` | 方法 | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectSession` | 方法 | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HarnessedReActFSMRunner`

Harnessed ReAct FSM Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { HarnessedReActFSMRunner } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare class HarnessedReActFSMRunner {
    constructor(options: HarnessedReActFSMRunnerOptions);
    run(input: HarnessedReActFSMRunInput): Promise<HarnessedReActFSMRunResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: HarnessedReActFSMRunInput): Promise&lt;HarnessedReActFSMRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RunManager`

Run Manager 类，共公开 36 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RunManager } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare class RunManager {
    constructor(options?: RunManagerOptions);
    eventRuntime(): EventFirstRuntime;
    createSession(input: CreateSessionInput): Promise<RuntimeSession>;
    createRun(input: CreateRunInput): Promise<RuntimeRun>;
    appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent>;
    startRun(run: RuntimeRun, timestamp?: string): Promise<FrameworkEvent>;
    recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise<FrameworkEvent>;
    recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise<FrameworkEvent>;
    recordContextBuildStarted(context: RunExecutionContext): Promise<FrameworkEvent>;
    recordContextBuildCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillSelected(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillLoaded(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordThinkingStarted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordThinkingCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordReasoningDecision(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordReactStep(context: RunExecutionContext, step: ReActStep): Promise<FrameworkEvent>;
    recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise<FrameworkEvent>;
    recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise<FrameworkEvent>;
    recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise<FrameworkEvent>;
    completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise<FrameworkEvent>;
    waitForHumanReview(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewRequested(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewApproved(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewRejected(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordContextCompacted(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise<FrameworkEvent>;
    failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise<FrameworkEvent>;
    listEvents(runId: string): Promise<FrameworkEvent[]>;
    projectRun(runId: string): Promise<RuntimeRun | null>;
    projectSession(sessionId: string): Promise<RuntimeSession | null>;
    projectReplay(runId: string): Promise<ReplayProjection>;
    projectAudit(runId: string): Promise<AuditProjection>;
    projectRegression(runId: string): Promise<RegressionProjection>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendRunEvent` | 方法 | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cancelRun` | 方法 | <code>cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `completeRun` | 方法 | <code>completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: RunManagerOptions): RunManager</code> | 创建该类的实例。 |
| `createRun` | 方法 | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createSession` | 方法 | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `eventRuntime` | 方法 | <code>eventRuntime(): EventFirstRuntime</code> | 公开方法；参数与返回类型以签名列为准。 |
| `failRun` | 方法 | <code>failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listEvents` | 方法 | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectAudit` | 方法 | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectRegression` | 方法 | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectReplay` | 方法 | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectRun` | 方法 | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projectSession` | 方法 | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordAgentDeliberationCompleted` | 方法 | <code>recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordAgentDeliberationStarted` | 方法 | <code>recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordContextBuildCompleted` | 方法 | <code>recordContextBuildCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordContextBuildStarted` | 方法 | <code>recordContextBuildStarted(context: RunExecutionContext): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordContextCompacted` | 方法 | <code>recordContextCompacted(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordHumanReviewApproved` | 方法 | <code>recordHumanReviewApproved(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordHumanReviewRejected` | 方法 | <code>recordHumanReviewRejected(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordHumanReviewRequested` | 方法 | <code>recordHumanReviewRequested(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordReactContinuationCheckpoint` | 方法 | <code>recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordReactContinuationResumed` | 方法 | <code>recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordReactContinuationSuspended` | 方法 | <code>recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordReactStep` | 方法 | <code>recordReactStep(context: RunExecutionContext, step: ReActStep): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordReasoningDecision` | 方法 | <code>recordReasoningDecision(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordSkillCompleted` | 方法 | <code>recordSkillCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordSkillLoaded` | 方法 | <code>recordSkillLoaded(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordSkillSelected` | 方法 | <code>recordSkillSelected(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordStateEntered` | 方法 | <code>recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordThinkingCompleted` | 方法 | <code>recordThinkingCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordThinkingStarted` | 方法 | <code>recordThinkingStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordTransitionAccepted` | 方法 | <code>recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `startRun` | 方法 | <code>startRun(run: RuntimeRun, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `waitForHumanReview` | 方法 | <code>waitForHumanReview(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `projectAudit`

Project Audit 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectAudit } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare function projectAudit(events: FrameworkEvent[]): AuditProjection;
```

### 调用签名

```text
projectAudit(events: FrameworkEvent[]): AuditProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `AuditProjection`
- 说明: 返回值契约由上述类型定义。

## `projectReplay`

Project Replay 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectReplay } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare function projectReplay(events: FrameworkEvent[]): ReplayProjection;
```

### 调用签名

```text
projectReplay(events: FrameworkEvent[]): ReplayProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReplayProjection`
- 说明: 返回值契约由上述类型定义。

## `projectRun`

Project Run 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectRun } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare function projectRun(events: FrameworkEvent[]): RuntimeRun | null;
```

### 调用签名

```text
projectRun(events: FrameworkEvent[]): RuntimeRun | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRun`
- 说明: 返回值契约由上述类型定义。

## `projectSession`

Project Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectSession } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export declare function projectSession(events: FrameworkEvent[]): RuntimeSession | null;
```

### 调用签名

```text
projectSession(events: FrameworkEvent[]): RuntimeSession | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeSession`
- 说明: 返回值契约由上述类型定义。

## `AppendRunEventInput`

Append Run Event Input 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AppendRunEventInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface AppendRunEventInput<TPayload = unknown> {
    id: string;
    type: FrameworkEvent['type'];
    runId: string;
    sessionId: string;
    userId: string;
    payload: TPayload;
    stepId?: string;
    fsmState?: string;
    agentId?: string;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/events").FrameworkEventType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AuditProjection`

Audit Projection 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AuditProjection } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface AuditProjection {
    runId: string;
    eventCount: number;
    policyDecisionCount: number;
    memoryWriteCount: number;
    reasoningDecisionCount: number;
    skillActivationCount: number;
    toolCallCount: number;
    missingRunIds: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventCount` | 属性 | <code>eventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryWriteCount` | 属性 | <code>memoryWriteCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingRunIds` | 属性 | <code>missingRunIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionCount` | 属性 | <code>policyDecisionCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningDecisionCount` | 属性 | <code>reasoningDecisionCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillActivationCount` | 属性 | <code>skillActivationCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCallCount` | 属性 | <code>toolCallCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CreateRunInput`

Create Run Input 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CreateRunInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface CreateRunInput {
    id: string;
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    agentRef?: SpecRef;
    input?: unknown;
    metadata?: Record<string, unknown>;
    timestamp?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CreateSessionInput`

Create Session Input 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CreateSessionInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface CreateSessionInput {
    id: string;
    userId: string;
    domainPackRef?: SpecRef;
    sessionProfileRef?: SpecRef;
    metadata?: Record<string, unknown>;
    timestamp?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HarnessedReActFSMRunInput`

Harnessed ReAct FSM Run Input 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HarnessedReActFSMRunInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface HarnessedReActFSMRunInput<TInput = unknown> extends ContextBuildInput<TInput> {
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    createSession?: boolean;
    resumeFromCheckpoint?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSpec` | 属性 | <code>contextSpec?: ContextSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createSession` | 属性 | <code>createSession?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryScope` | 属性 | <code>memoryScope?: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages?: ModelMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumeFromCheckpoint` | 属性 | <code>resumeFromCheckpoint?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HarnessedReActFSMRunnerOptions`

Harnessed ReAct FSM Runner Options 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HarnessedReActFSMRunnerOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface HarnessedReActFSMRunnerOptions {
    inference: InferenceProvider;
    toolRunner?: ToolRunner;
    runManager?: RunManager;
    fsmSpec?: FSMProcessSpec;
    contextBuilder?: ContextBuilder;
    skillRegistry?: SkillRegistry;
    skillSelector?: SkillSelector;
    skillContextLoader?: SkillContextLoader;
    skillPolicy?: SkillPolicy;
    allowedSkills?: SkillContextBuilderOptions['allowedSkills'];
    requiredSkills?: SkillContextBuilderOptions['requiredSkills'];
    thinkingPlanner?: ThinkingPlanner;
    agenticReasoner?: AgenticReasoner;
    reasoningConfig?: ReasoningConfig;
    verifier?: Verifier;
    reactRuntime?: ReActAgentRuntime;
    maxIterations?: number;
    executionBudget?: Partial<ReActExecutionBudget>;
    reactCheckpointStore?: ReActContinuationCheckpointStore;
    continueAfterTool?: boolean;
    resolveToolExecutionScope?: (input: {
        fsmState: string;
        context: BuiltAgentContext;
        toolId: string;
    }) => ToolExecutionScope | undefined;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticReasoner` | 属性 | <code>agenticReasoner?: AgenticReasoner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBuilder` | 属性 | <code>contextBuilder?: ContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionBudget` | 属性 | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmSpec` | 属性 | <code>fsmSpec?: FSMProcessSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIterations` | 属性 | <code>maxIterations?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reactCheckpointStore` | 属性 | <code>reactCheckpointStore?: ReActContinuationCheckpointStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reactRuntime` | 属性 | <code>reactRuntime?: ReActAgentRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope?(input: { fsmState: string; context: BuiltAgentContext; toolId: string; }): ToolExecutionScope &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runManager` | 属性 | <code>runManager?: RunManager</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillContextLoader` | 属性 | <code>skillContextLoader?: SkillContextLoader</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicy` | 属性 | <code>skillPolicy?: SkillPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRegistry` | 属性 | <code>skillRegistry?: SkillRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillSelector` | 属性 | <code>skillSelector?: SkillSelector</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingPlanner` | 属性 | <code>thinkingPlanner?: ThinkingPlanner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRunner` | 属性 | <code>toolRunner?: ToolRunner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifier` | 属性 | <code>verifier?: Verifier</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HarnessedReActFSMRunResult`

Harnessed ReAct FSM Run Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HarnessedReActFSMRunResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface HarnessedReActFSMRunResult {
    run: RuntimeRun;
    react: ReActRunResult;
    fsmSnapshot: ReturnType<FSMRuntime['getSnapshot']>;
    events: FrameworkEvent[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmSnapshot` | 属性 | <code>fsmSnapshot: import("/Users/erwin/Downloads/codespace/Hypha/packages/fsm/dist/index").FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `run` | 属性 | <code>run: RuntimeRun</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionProjection`

Regression Projection 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionProjection } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface RegressionProjection {
    runId: string;
    eventTypes: string[];
    statePath: string[];
    toolCalls: Array<{
        toolId?: unknown;
        status: string;
    }>;
    memoryWriteCount: number;
    reasoningDecisionCount: number;
    skillActivationCount: number;
    finalOutput?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalOutput` | 属性 | <code>finalOutput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryWriteCount` | 属性 | <code>memoryWriteCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningDecisionCount` | 属性 | <code>reasoningDecisionCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillActivationCount` | 属性 | <code>skillActivationCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: { toolId?: unknown; status: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayProjection`

Replay Projection 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayProjection } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface ReplayProjection {
    runId: string;
    events: FrameworkEvent[];
    statePath: string[];
    toolCallEventIds: string[];
    policyDecisionEventIds: string[];
    memoryEventIds: string[];
    reasoningEventIds: string[];
    skillEventIds: string[];
    modelCalls: FrameworkEvent[];
    toolCalls: FrameworkEvent[];
    memoryReads: FrameworkEvent[];
    memoryWrites: FrameworkEvent[];
    reasoningEvents: FrameworkEvent[];
    skillEvents: FrameworkEvent[];
    policyDecisions: FrameworkEvent[];
    finalOutput?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalOutput` | 属性 | <code>finalOutput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryEventIds` | 属性 | <code>memoryEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryReads` | 属性 | <code>memoryReads: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryWrites` | 属性 | <code>memoryWrites: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionEventIds` | 属性 | <code>policyDecisionEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisions` | 属性 | <code>policyDecisions: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningEventIds` | 属性 | <code>reasoningEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningEvents` | 属性 | <code>reasoningEvents: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillEventIds` | 属性 | <code>skillEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillEvents` | 属性 | <code>skillEvents: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCallEventIds` | 属性 | <code>toolCallEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunExecutionContext`

Run Execution Context 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunExecutionContext } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface RunExecutionContext {
    runId: string;
    sessionId: string;
    userId: string;
    agentId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunManagerOptions`

Run Manager Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunManagerOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface RunManagerOptions {
    runtime?: EventFirstRuntime;
    operationalTelemetry?: RuntimeOperationalTelemetry;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtime` | 属性 | <code>runtime?: EventFirstRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRun`

Runtime Run 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRun } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface RuntimeRun {
    id: string;
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    agentRef?: SpecRef;
    status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    input?: unknown;
    output?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeSession`

Runtime Session 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeSession } from '@codesoul-co/hypha-harness';`
- 源码模块: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### 声明

```text
export interface RuntimeSession {
    id: string;
    userId: string;
    domainPackRef?: SpecRef;
    sessionProfileRef?: SpecRef;
    metadata: Record<string, unknown>;
    status: 'active' | 'closed';
    createdAt: string;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "active" &#124; "closed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
