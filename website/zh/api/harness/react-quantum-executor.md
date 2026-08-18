# `@codesoul-co/hypha-harness` / `react-quantum-executor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/react-quantum-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)
- 导出数: **19**

## 模块用法

用于执行该边界的运行时行为。React quantum executor 模块公开 3 类、1 常量、1 函数、13 接口、1 类型。

### 从包入口导入

```ts
import {
  ArtifactReActContextSnapshotStore,
  ContinuationIdentityValidator,
  ReActQuantumExecutor,
  REACT_CONTEXT_SNAPSHOT_VERSION,
  createContinuationReActQuantumDescriptor,
} from '@codesoul-co/hypha-harness';

import type {
  ArtifactReActContextSnapshotStoreOptions,
  ExecuteReActQuantumRequest,
  ExecuteReActQuantumResult,
  ReActContextSnapshot,
  ReActContextSnapshotPutResult,
  ReActContextSnapshotStore,
  ReActOperationReceiptReconciler,
  ReActQuantumExecutorOptions,
} from '@codesoul-co/hypha-harness';

// 完整导出列表见下方。
```

### 使用要点

- 14 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactReActContextSnapshotStore` | 类 | <code>new ArtifactReActContextSnapshotStore(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Durable content-addressed Context snapshots selected by the checkpoint scope hash. |
| `ContinuationIdentityValidator` | 类 | <code>new ContinuationIdentityValidator(): ContinuationIdentityValidator</code> | Continuation Identity Validator 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReActQuantumExecutor` | 类 | <code>new ReActQuantumExecutor(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence. |
| `REACT_CONTEXT_SNAPSHOT_VERSION` | 常量 | <code>const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0"</code> | 由 `react-quantum-executor` 模块导出的 REACT CONTEXT SNAPSHOT VERSION 常量。 |
| `createContinuationReActQuantumDescriptor` | 函数 | <code>createContinuationReActQuantumDescriptor(command: Readonly&lt;SessionCommandRecord&gt;, input: unknown): ContinuationReActQuantumDescriptor</code> | Create Continuation ReAct Quantum Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ArtifactReActContextSnapshotStoreOptions` | 接口 | <code>interface ArtifactReActContextSnapshotStoreOptions</code> | Artifact ReAct Context Snapshot Store Options 接口，共包含 2 个公开字段或方法。 |
| `ExecuteReActQuantumRequest` | 接口 | <code>interface ExecuteReActQuantumRequest</code> | Execute ReAct Quantum Request 接口，共包含 3 个公开字段或方法。 |
| `ExecuteReActQuantumResult` | 接口 | <code>interface ExecuteReActQuantumResult</code> | Execute ReAct Quantum Result 接口，共包含 2 个公开字段或方法。 |
| `ReActContextSnapshot` | 接口 | <code>interface ReActContextSnapshot</code> | ReAct Context Snapshot 接口，共包含 7 个公开字段或方法。 |
| `ReActContextSnapshotPutResult` | 接口 | <code>interface ReActContextSnapshotPutResult</code> | ReAct Context Snapshot Put Result 接口，共包含 3 个公开字段或方法。 |
| `ReActContextSnapshotStore` | 接口 | <code>interface ReActContextSnapshotStore</code> | ReAct Context Snapshot Store 接口，共包含 3 个公开字段或方法。 |
| `ReActOperationReceiptReconciler` | 接口 | <code>interface ReActOperationReceiptReconciler</code> | ReAct Operation Receipt Reconciler 接口，共包含 1 个公开字段或方法。 |
| `ReActQuantumExecutorOptions` | 接口 | <code>interface ReActQuantumExecutorOptions</code> | ReAct Quantum Executor Options 接口，共包含 10 个公开字段或方法。 |
| `ReActQuantumOutcomeRecorder` | 接口 | <code>interface ReActQuantumOutcomeRecorder</code> | ReAct Quantum Outcome Recorder 接口，共包含 1 个公开字段或方法。 |
| `ReActQuantumRevisionValidator` | 接口 | <code>interface ReActQuantumRevisionValidator</code> | ReAct Quantum Revision Validator 接口，共包含 1 个公开字段或方法。 |
| `ReActQuantumRunnerFactory` | 接口 | <code>interface ReActQuantumRunnerFactory</code> | ReAct Quantum Runner Factory 接口，共包含 1 个公开字段或方法。 |
| `ReActQuantumRuntimeReader` | 接口 | <code>interface ReActQuantumRuntimeReader</code> | ReAct Quantum Runtime Reader 接口，共包含 1 个公开字段或方法。 |
| `ReActQuantumRuntimeState` | 接口 | <code>interface ReActQuantumRuntimeState</code> | ReAct Quantum Runtime State 接口，共包含 10 个公开字段或方法。 |
| `ReActQuantumRuntimeStatus` | 类型 | <code>type ReActQuantumRuntimeStatus = 'created' &#124; 'running' &#124; 'waiting_human' &#124; 'completed' &#124; 'failed' &#124; 'cancelled'</code> | ReAct Quantum Runtime Status 公共类型别名；完整类型表达式见声明。 |

## `ArtifactReActContextSnapshotStore`

Durable content-addressed Context snapshots selected by the checkpoint scope hash.

- 种类: 类
- 导入: `import { ArtifactReActContextSnapshotStore } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export declare class ArtifactReActContextSnapshotStore implements ReActContextSnapshotStore {
    constructor(options: ArtifactReActContextSnapshotStoreOptions);
    put(input: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult>;
    get(scopeHash: string): Promise<ReActContextSnapshot | null>;
    delete(scopeHash: string): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContinuationIdentityValidator`

Continuation Identity Validator 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ContinuationIdentityValidator } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export declare class ContinuationIdentityValidator {
    validateCommand(command: Readonly<SessionCommandRecord>, descriptor: Readonly<ContinuationReActQuantumDescriptor>): void;
    validateCheckpoint(descriptor: Readonly<ContinuationReActQuantumDescriptor>, checkpoint: Readonly<ReActContinuationCheckpoint>, checkpointRef: string): void;
    validateSnapshot(descriptor: Readonly<ReActQuantumDescriptor>, snapshot: Readonly<ReActContextSnapshot>): void;
    validateRuntimeState(descriptor: Readonly<ReActQuantumDescriptor>, state: Readonly<ReActQuantumRuntimeState>): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ContinuationIdentityValidator</code> | 创建该类的实例。 |
| `validateCheckpoint` | 方法 | <code>validateCheckpoint(descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;, checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;, checkpointRef: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validateCommand` | 方法 | <code>validateCommand(command: Readonly&lt;SessionCommandRecord&gt;, descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validateRuntimeState` | 方法 | <code>validateRuntimeState(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validateSnapshot` | 方法 | <code>validateSnapshot(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, snapshot: Readonly&lt;ReActContextSnapshot&gt;): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumExecutor`

Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence.

- 种类: 类
- 导入: `import { ReActQuantumExecutor } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export declare class ReActQuantumExecutor {
    constructor(options: ReActQuantumExecutorOptions);
    runOneQuantum(input: ExecuteReActQuantumRequest): Promise<ExecuteReActQuantumResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | 创建该类的实例。 |
| `runOneQuantum` | 方法 | <code>runOneQuantum(input: ExecuteReActQuantumRequest): Promise&lt;ExecuteReActQuantumResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `REACT_CONTEXT_SNAPSHOT_VERSION`

由 `react-quantum-executor` 模块导出的 REACT CONTEXT SNAPSHOT VERSION 常量。

- 种类: 常量
- 导入: `import { REACT_CONTEXT_SNAPSHOT_VERSION } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export declare const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0";
```

## `createContinuationReActQuantumDescriptor`

Create Continuation ReAct Quantum Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createContinuationReActQuantumDescriptor } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export declare function createContinuationReActQuantumDescriptor(command: Readonly<SessionCommandRecord>, input: unknown): ContinuationReActQuantumDescriptor;
```

### 调用签名

```text
createContinuationReActQuantumDescriptor(command: Readonly<SessionCommandRecord>, input: unknown): ContinuationReActQuantumDescriptor
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `command` | <code>Readonly&lt;SessionCommandRecord&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContinuationReActQuantumDescriptor`
- 说明: 返回值契约由上述类型定义。

## `ArtifactReActContextSnapshotStoreOptions`

Artifact ReAct Context Snapshot Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactReActContextSnapshotStoreOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ArtifactReActContextSnapshotStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxSnapshotBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSnapshotBytes` | 属性 | <code>maxSnapshotBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecuteReActQuantumRequest`

Execute ReAct Quantum Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecuteReActQuantumRequest } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ExecuteReActQuantumRequest {
    command?: Readonly<SessionCommandRecord>;
    descriptor: ReActQuantumDescriptor;
    signal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command?: Readonly&lt;SessionCommandRecord&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `descriptor` | 属性 | <code>descriptor: ReActQuantumDescriptor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecuteReActQuantumResult`

Execute ReAct Quantum Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecuteReActQuantumResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ExecuteReActQuantumResult {
    disposition: 'completed' | 'suspended' | 'waiting_human' | 'cancelled' | 'failed' | 'terminal';
    react?: ReActRunResult;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "waiting_human" &#124; "terminal"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `react` | 属性 | <code>react?: ReActRunResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContextSnapshot`

ReAct Context Snapshot 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContextSnapshot } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActContextSnapshot {
    version: typeof REACT_CONTEXT_SNAPSHOT_VERSION;
    runId: string;
    stepId: string;
    scopeHash: string;
    agentRef: SpecRef;
    context: ReActRunContext;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: ReActRunContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContextSnapshotPutResult`

ReAct Context Snapshot Put Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContextSnapshotPutResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActContextSnapshotPutResult {
    snapshot: ReActContextSnapshot;
    snapshotHash: string;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: ReActContextSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContextSnapshotStore`

ReAct Context Snapshot Store 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContextSnapshotStore } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActContextSnapshotStore {
    put(snapshot: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult>;
    get(scopeHash: string): Promise<ReActContextSnapshot | null>;
    delete(scopeHash: string): Promise<boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(snapshot: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActOperationReceiptReconciler`

ReAct Operation Receipt Reconciler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActOperationReceiptReconciler } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActOperationReceiptReconciler {
    reconcile(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        receiptRefs: readonly string[];
        signal: AbortSignal;
    }): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reconcile` | 方法 | <code>reconcile(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; receiptRefs: readonly string[]; signal: AbortSignal; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumExecutorOptions`

ReAct Quantum Executor Options 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumExecutorOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumExecutorOptions {
    checkpoints: ReActContinuationCheckpointStore;
    contextSnapshots: ReActContextSnapshotStore;
    runtime: ReActQuantumRuntimeReader;
    runnerFactory: ReActQuantumRunnerFactory;
    outcomeRecorder: ReActQuantumOutcomeRecorder;
    revisionValidator?: ReActQuantumRevisionValidator;
    receiptReconciler?: ReActOperationReceiptReconciler;
    checkpointReferenceFor?: (checkpoint: Readonly<ReActContinuationCheckpoint>) => string;
    quantumIterations: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointReferenceFor` | 方法 | <code>checkpointReferenceFor?(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `checkpoints` | 属性 | <code>checkpoints: ReActContinuationCheckpointStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSnapshots` | 属性 | <code>contextSnapshots: ReActContextSnapshotStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outcomeRecorder` | 属性 | <code>outcomeRecorder: ReActQuantumOutcomeRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quantumIterations` | 属性 | <code>quantumIterations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptReconciler` | 属性 | <code>receiptReconciler?: ReActOperationReceiptReconciler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revisionValidator` | 属性 | <code>revisionValidator?: ReActQuantumRevisionValidator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runnerFactory` | 属性 | <code>runnerFactory: ReActQuantumRunnerFactory</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtime` | 属性 | <code>runtime: ReActQuantumRuntimeReader</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActQuantumOutcomeRecorder`

ReAct Quantum Outcome Recorder 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumOutcomeRecorder } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumOutcomeRecorder {
    record(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        state: Readonly<ReActQuantumRuntimeState>;
        react: Readonly<ReActRunResult>;
        disposition: Exclude<ExecuteReActQuantumResult['disposition'], 'terminal'>;
        signal: AbortSignal;
    }): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; react: Readonly&lt;ReActRunResult&gt;; disposition: Exclude&lt;ExecuteReActQuantumResult["disposition"], "terminal"&gt;; signal: AbortSignal; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumRevisionValidator`

ReAct Quantum Revision Validator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumRevisionValidator } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumRevisionValidator {
    validate(descriptor: Readonly<ReActQuantumDescriptor>, state: Readonly<ReActQuantumRuntimeState>): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `validate` | 方法 | <code>validate(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumRunnerFactory`

ReAct Quantum Runner Factory 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumRunnerFactory } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumRunnerFactory {
    create(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        state: Readonly<ReActQuantumRuntimeState>;
        snapshot: Readonly<ReActContextSnapshot>;
        signal: AbortSignal;
    }): Promise<Pick<ReActRunner, 'run'>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; snapshot: Readonly&lt;ReActContextSnapshot&gt;; signal: AbortSignal; }): Promise&lt;Pick&lt;ReActRunner, "run"&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumRuntimeReader`

ReAct Quantum Runtime Reader 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumRuntimeReader } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumRuntimeReader {
    replay(descriptor: Readonly<ReActQuantumDescriptor>): Promise<ReActQuantumRuntimeState>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `replay` | 方法 | <code>replay(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;): Promise&lt;ReActQuantumRuntimeState&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActQuantumRuntimeState`

ReAct Quantum Runtime State 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumRuntimeState } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export interface ReActQuantumRuntimeState {
    runId: string;
    sessionId: string;
    userId: string;
    status: ReActQuantumRuntimeStatus;
    cancellationRevision: number;
    agentRef: SpecRef;
    domainPackRef: SpecRef;
    workflowRef?: SpecRef;
    promptSnapshotHash: string;
    capabilitySnapshotHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: ReActQuantumRuntimeStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActQuantumRuntimeStatus`

ReAct Quantum Runtime Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReActQuantumRuntimeStatus } from '@codesoul-co/hypha-harness';`
- 源码模块: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### 声明

```text
export type ReActQuantumRuntimeStatus = 'created' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
```
