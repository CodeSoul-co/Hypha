# `@codesoul-co/hypha-testing` / `mock-execution-provider`

- 包索引: [`@codesoul-co/hypha-testing`](/zh/api/testing)
- 源码: [`packages/testing/src/mock-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)
- 导出数: **4**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Mock execution provider 模块公开 2 类、2 接口。

### 从包入口导入

```ts
import {
  MockExecutionProvider,
  MockExecutionProviderError,
} from '@codesoul-co/hypha-testing';

import type {
  MockExecutionBehavior,
  MockExecutionProviderOptions,
} from '@codesoul-co/hypha-testing';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockExecutionProvider` | 类 | <code>new MockExecutionProvider(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace. |
| `MockExecutionProviderError` | 类 | <code>new MockExecutionProviderError(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Mock Execution Provider Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MockExecutionBehavior` | 接口 | <code>interface MockExecutionBehavior</code> | Mock Execution Behavior 接口，共包含 17 个公开字段或方法。 |
| `MockExecutionProviderOptions` | 接口 | <code>interface MockExecutionProviderOptions</code> | Mock Execution Provider Options 接口，共包含 8 个公开字段或方法。 |

## `MockExecutionProvider`

Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace.

- 种类: 类
- 导入: `import { MockExecutionProvider } from '@codesoul-co/hypha-testing';`
- 源码模块: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### 声明

```text
export declare class MockExecutionProvider implements SandboxProvider {
    readonly id: string;
    constructor(options?: MockExecutionProviderOptions);
    enqueue(behavior: MockExecutionBehavior): void;
    setHealth(health: ProviderHealth): void;
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(input: SandboxCreateRequest): Promise<SandboxRecord>;
    start(input: SandboxStartRequest): Promise<SandboxRecord>;
    execute(input: CommandExecutionRequest): Promise<CommandExecutionResult>;
    cancel(input: ExecutionCancelRequest): Promise<void>;
    terminate(input: SandboxTerminateRequest): Promise<void>;
    status(input: SandboxStatusRequest): Promise<SandboxRecord | null>;
    cleanup(input: SandboxCleanupRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cleanup` | 方法 | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(behavior: MockExecutionBehavior): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `setHealth` | 方法 | <code>setHealth(health: ProviderHealth): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `terminate` | 方法 | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MockExecutionProviderError`

Mock Execution Provider Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockExecutionProviderError } from '@codesoul-co/hypha-testing';`
- 源码模块: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### 声明

```text
export declare class MockExecutionProviderError extends Error {
    readonly normalizedError: NormalizedExecutionError;
    constructor(normalizedError: NormalizedExecutionError);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedError` | 属性 | <code>readonly normalizedError: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `MockExecutionBehavior`

Mock Execution Behavior 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MockExecutionBehavior } from '@codesoul-co/hypha-testing';`
- 源码模块: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### 声明

```text
export interface MockExecutionBehavior {
    delayMs?: number;
    status?: Extract<CommandExecutionStatus, 'completed' | 'failed' | 'timed_out' | 'oom_killed' | 'resource_exceeded' | 'quarantined'>;
    exitCode?: number | null;
    signal?: string;
    stdout?: string;
    stderr?: string;
    stdoutTruncated?: boolean;
    stderrTruncated?: boolean;
    stdoutArtifactRef?: string;
    stderrArtifactRef?: string;
    changedFiles?: FileMutation[];
    generatedArtifactRefs?: string[];
    snapshotBeforeRef?: string;
    snapshotAfterRef?: string;
    resourceUsage?: ExecutionResourceUsage;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles?: FileMutation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delayMs` | 属性 | <code>delayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exitCode` | 属性 | <code>exitCode?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generatedArtifactRefs` | 属性 | <code>generatedArtifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotAfterRef` | 属性 | <code>snapshotAfterRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotBeforeRef` | 属性 | <code>snapshotBeforeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: "completed" &#124; "failed" &#124; "timed_out" &#124; "oom_killed" &#124; "resource_exceeded" &#124; "quarantined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderr` | 属性 | <code>stderr?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderrArtifactRef` | 属性 | <code>stderrArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderrTruncated` | 属性 | <code>stderrTruncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdout` | 属性 | <code>stdout?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdoutArtifactRef` | 属性 | <code>stdoutArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdoutTruncated` | 属性 | <code>stdoutTruncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MockExecutionProviderOptions`

Mock Execution Provider Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MockExecutionProviderOptions } from '@codesoul-co/hypha-testing';`
- 源码模块: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### 声明

```text
export interface MockExecutionProviderOptions {
    id?: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
    executionId?: (request: CommandExecutionRequest) => string;
    capabilities?: Partial<SandboxProviderCapabilities>;
    health?: ProviderHealth;
    behaviors?: MockExecutionBehavior[];
    defaultBehavior?: MockExecutionBehavior;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `behaviors` | 属性 | <code>behaviors?: MockExecutionBehavior[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities?: Partial&lt;SandboxProviderCapabilities&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultBehavior` | 属性 | <code>defaultBehavior?: MockExecutionBehavior</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 方法 | <code>executionId?(request: CommandExecutionRequest): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 属性 | <code>health?: ProviderHealth</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sandboxId` | 方法 | <code>sandboxId?(request: SandboxCreateRequest): string</code> | 公开方法；参数与返回类型以签名列为准。 |
