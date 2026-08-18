# `@codesoul-co/hypha-tools` / `execution-adapter`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/execution-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)
- 导出数: **18**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Execution adapter 模块公开 2 类、1 常量、3 函数、10 接口、2 类型。

### 从包入口导入

```ts
import {
  ExecutionToolAdapter,
  ExecutionToolTerminalError,
  EXECUTION_TOOL_TERMINAL_STATES,
  hashExecutionToolInput,
  normalizeExecutionToolInput,
  validateExecutionToolRuntimeRequest,
} from '@codesoul-co/hypha-tools';

import type {
  ExecutionToolAdapterOptions,
  ExecutionToolDispatchFactoryRequest,
  ExecutionToolDispatchPlan,
  ExecutionToolEvidence,
  ExecutionToolObservation,
  ExecutionToolProvenance,
  ExecutionToolRuntimePort,
  ExecutionToolRuntimeRequest,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionToolAdapter` | 类 | <code>new ExecutionToolAdapter&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Execution Tool Adapter 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ExecutionToolTerminalError` | 类 | <code>new ExecutionToolTerminalError(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Execution Tool Terminal Error 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EXECUTION_TOOL_TERMINAL_STATES` | 常量 | <code>const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"]</code> | 由 `execution-adapter` 模块导出的 EXECUTION TOOL TERMINAL STATES 常量。 |
| `hashExecutionToolInput` | 函数 | <code>hashExecutionToolInput(input: unknown): string</code> | Hash Execution Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeExecutionToolInput` | 函数 | <code>normalizeExecutionToolInput&lt;TInput&gt;(input: TInput): TInput</code> | Normalize Execution Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionToolRuntimeRequest` | 函数 | <code>validateExecutionToolRuntimeRequest&lt;TInput&gt;(input: ExecutionToolRuntimeRequest&lt;TInput&gt;): ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider. |
| `ExecutionToolAdapterOptions` | 接口 | <code>interface ExecutionToolAdapterOptions</code> | Execution Tool Adapter Options 接口，共包含 6 个公开字段或方法。 |
| `ExecutionToolDispatchFactoryRequest` | 接口 | <code>interface ExecutionToolDispatchFactoryRequest extends AdapterExecutionRequest&lt;TInput&gt;</code> | Execution Tool Dispatch Factory Request 接口，共包含 6 个公开字段或方法。 |
| `ExecutionToolDispatchPlan` | 接口 | <code>interface ExecutionToolDispatchPlan</code> | Execution Tool Dispatch Plan 接口，共包含 3 个公开字段或方法。 |
| `ExecutionToolEvidence` | 接口 | <code>interface ExecutionToolEvidence</code> | Execution Tool Evidence 接口，共包含 4 个公开字段或方法。 |
| `ExecutionToolObservation` | 接口 | <code>interface ExecutionToolObservation extends ExecutionToolRuntimeResult</code> | Execution Tool Observation 接口，共包含 14 个公开字段或方法。 |
| `ExecutionToolProvenance` | 接口 | <code>interface ExecutionToolProvenance</code> | Execution Tool Provenance 接口，共包含 7 个公开字段或方法。 |
| `ExecutionToolRuntimePort` | 接口 | <code>interface ExecutionToolRuntimePort</code> | Execution Tool Runtime Port 接口，共包含 3 个公开字段或方法。 |
| `ExecutionToolRuntimeRequest` | 接口 | <code>interface ExecutionToolRuntimeRequest</code> | Execution Tool Runtime Request 接口，共包含 4 个公开字段或方法。 |
| `ExecutionToolRuntimeResult` | 接口 | <code>interface ExecutionToolRuntimeResult</code> | Execution Tool Runtime Result 接口，共包含 13 个公开字段或方法。 |
| `ExecutionToolRuntimeScope` | 接口 | <code>interface ExecutionToolRuntimeScope</code> | Execution Tool Runtime Scope 接口，共包含 6 个公开字段或方法。 |
| `ExecutionToolDispatchFactory` | 类型 | <code>type ExecutionToolDispatchFactory = (request: ExecutionToolDispatchFactoryRequest&lt;TInput&gt;) =&gt; Promise&lt;ExecutionToolDispatchPlan&gt; &#124; ExecutionToolDispatchPlan</code> | Execution Tool Dispatch Factory 公共类型别名；完整类型表达式见声明。 |
| `ExecutionToolTerminalState` | 类型 | <code>type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number]</code> | Execution Tool Terminal State 公共类型别名；完整类型表达式见声明。 |

## `ExecutionToolAdapter`

Execution Tool Adapter 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ExecutionToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare class ExecutionToolAdapter<TInput = unknown> implements ToolAdapter<TInput, ExecutionToolObservation> {
    readonly id: string;
    readonly source: ToolSource;
    constructor(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory<TInput>, options: ExecutionToolAdapterOptions);
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<ExecutionToolObservation>>;
    cancel(request: AdapterCancellationRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;ExecutionToolObservation&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolTerminalError`

Execution Tool Terminal Error 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ExecutionToolTerminalError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare class ExecutionToolTerminalError extends FrameworkError {
    readonly terminalState: Exclude<ExecutionToolTerminalState, 'completed'>;
    readonly executionError: NormalizedExecutionError;
    readonly observation: ExecutionToolObservation;
    constructor(observation: ExecutionToolObservation);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>readonly cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | 创建该类的实例。 |
| `context` | 属性 | <code>readonly context?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionError` | 属性 | <code>readonly executionError: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observation` | 属性 | <code>readonly observation: ExecutionToolObservation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `terminalState` | 属性 | <code>readonly terminalState: "unknown" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EXECUTION_TOOL_TERMINAL_STATES`

由 `execution-adapter` 模块导出的 EXECUTION TOOL TERMINAL STATES 常量。

- 种类: 常量
- 导入: `import { EXECUTION_TOOL_TERMINAL_STATES } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"];
```

## `hashExecutionToolInput`

Hash Execution Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashExecutionToolInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare function hashExecutionToolInput(input: unknown): string;
```

### 调用签名

```text
hashExecutionToolInput(input: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `normalizeExecutionToolInput`

Normalize Execution Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeExecutionToolInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare function normalizeExecutionToolInput<TInput>(input: TInput): TInput;
```

### 调用签名

```text
normalizeExecutionToolInput<TInput>(input: TInput): TInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>TInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TInput`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionToolRuntimeRequest`

Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider.

- 种类: 函数
- 导入: `import { validateExecutionToolRuntimeRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export declare function validateExecutionToolRuntimeRequest<TInput>(input: ExecutionToolRuntimeRequest<TInput>): ExecutionToolRuntimeRequest<TInput>;
```

### 调用签名

```text
validateExecutionToolRuntimeRequest<TInput>(input: ExecutionToolRuntimeRequest<TInput>): ExecutionToolRuntimeRequest<TInput>
```

Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionToolRuntimeRequest<TInput>`
- 说明: 返回值契约由上述类型定义。

## `ExecutionToolAdapterOptions`

Execution Tool Adapter Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolAdapterOptions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolAdapterOptions {
    toolRevision: string;
    binding: ExecutionToolBinding;
    providerId: string;
    healthTimeoutMs?: number;
    maxEvidenceBytes?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthTimeoutMs` | 属性 | <code>healthTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEvidenceBytes` | 属性 | <code>maxEvidenceBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolDispatchFactoryRequest`

Execution Tool Dispatch Factory Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolDispatchFactoryRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolDispatchFactoryRequest<TInput> extends AdapterExecutionRequest<TInput> {
    normalizedInput: TInput;
    inputHash: string;
    signal: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedInput` | 属性 | <code>normalizedInput: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolDispatchPlan`

Execution Tool Dispatch Plan 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolDispatchPlan } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolDispatchPlan {
    dispatch: ExecutionDispatchRequest;
    expectedRevision: number;
    approvalExpiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dispatch` | 属性 | <code>dispatch: ExecutionDispatchRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolEvidence`

Execution Tool Evidence 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolEvidence } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolEvidence {
    kind: 'authorization' | 'event' | 'receipt' | 'artifact' | 'snapshot' | 'trace';
    ref: string;
    hash?: string;
    recordedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hash` | 属性 | <code>hash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "artifact" &#124; "event" &#124; "snapshot" &#124; "authorization" &#124; "trace" &#124; "receipt"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordedAt` | 属性 | <code>recordedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolObservation`

Execution Tool Observation 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolObservation } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolObservation extends ExecutionToolRuntimeResult {
    evidenceHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityResult` | 属性 | <code>activityResult: ExecutionActivityResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence: ExecutionToolEvidence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ExecutionToolProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionToolRuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalState` | 属性 | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolOperation` | 属性 | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolProvenance`

Execution Tool Provenance 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolProvenance } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolProvenance {
    providerId: string;
    authorizationEvidenceId: string;
    authorizationVerificationRef: string;
    terminalEventId: string;
    receivedAt: string;
    resultHash: string;
    receiptRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorizationEvidenceId` | 属性 | <code>authorizationEvidenceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorizationVerificationRef` | 属性 | <code>authorizationVerificationRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptRef` | 属性 | <code>receiptRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultHash` | 属性 | <code>resultHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalEventId` | 属性 | <code>terminalEventId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolRuntimePort`

Execution Tool Runtime Port 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolRuntimePort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolRuntimePort {
    execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise<unknown>;
    health(signal: AbortSignal): Promise<unknown>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal: AbortSignal): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionToolRuntimeRequest`

Execution Tool Runtime Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolRuntimeRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolRuntimeRequest<TInput = unknown> {
    dispatch: ExecutionDispatchRequest;
    normalizedInput: TInput;
    inputHash: string;
    expectedRevision: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 属性 | <code>dispatch: ExecutionDispatchRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedInput` | 属性 | <code>normalizedInput: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolRuntimeResult`

Execution Tool Runtime Result 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolRuntimeResult } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolRuntimeResult {
    activityResult: ExecutionActivityResult;
    scope: ExecutionToolRuntimeScope;
    toolId: string;
    toolRevision: string;
    contractSnapshotRef: string;
    toolOperation: ExecutionDispatchRequest['binding']['operation'];
    operationId: string;
    inputHash: string;
    revision: number;
    fencingToken: number;
    terminalState: ExecutionToolTerminalState;
    provenance: ExecutionToolProvenance;
    evidence: ExecutionToolEvidence[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityResult` | 属性 | <code>activityResult: ExecutionActivityResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence: ExecutionToolEvidence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: ExecutionToolProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionToolRuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalState` | 属性 | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolOperation` | 属性 | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolRuntimeScope`

Execution Tool Runtime Scope 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionToolRuntimeScope } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export interface ExecutionToolRuntimeScope {
    principalId: string;
    userId?: string;
    tenantId?: string;
    sessionId?: string;
    runId: string;
    workspaceId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionToolDispatchFactory`

Execution Tool Dispatch Factory 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionToolDispatchFactory } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export type ExecutionToolDispatchFactory<TInput = unknown> = (request: ExecutionToolDispatchFactoryRequest<TInput>) => Promise<ExecutionToolDispatchPlan> | ExecutionToolDispatchPlan;
```

## `ExecutionToolTerminalState`

Execution Tool Terminal State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionToolTerminalState } from '@codesoul-co/hypha-tools';`
- 源码模块: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### 声明

```text
export type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number];
```
