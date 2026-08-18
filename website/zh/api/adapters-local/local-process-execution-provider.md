# `@codesoul-co/hypha-adapters-local` / `local-process-execution-provider`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)
- 导出数: **2**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Local process execution provider 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalProcessExecutionProvider,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessExecutionProviderOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessExecutionProvider` | 类 | <code>new LocalProcessExecutionProvider(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Trusted-development provider. Workspace checks are confinement, not OS isolation. |
| `LocalProcessExecutionProviderOptions` | 接口 | <code>interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions</code> | Local Process Execution Provider Options 接口，共包含 26 个公开字段或方法。 |

## `LocalProcessExecutionProvider`

Trusted-development provider. Workspace checks are confinement, not OS isolation.

- 种类: 类
- 导入: `import { LocalProcessExecutionProvider } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)

### 声明

```text
export declare class LocalProcessExecutionProvider implements SandboxProvider {
    readonly id: string;
    constructor(options: LocalProcessExecutionProviderOptions);
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(input: SandboxCreateRequest): Promise<SandboxRecord>;
    start(input: SandboxStartRequest): Promise<SandboxRecord>;
    execute(input: CommandExecutionRequest): Promise<CommandExecutionResult>;
    streamOutput(input: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
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
| `constructor` | 构造函数 | <code>(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamOutput` | 方法 | <code>streamOutput(input: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `terminate` | 方法 | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalProcessExecutionProviderOptions`

Local Process Execution Provider Options 接口，共包含 26 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessExecutionProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)

### 声明

```text
export interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions {
    gracefulTerminationMs?: number;
    maxTrackedFiles?: number;
    maxTrackedBytes?: number;
    allowBestEffortWindowsProcessTreeKill?: boolean;
    id?: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
    executionId?: (request: CommandExecutionRequest) => string;
    supervisor?: LocalProcessSupervisor;
    outputArtifacts?: LocalProcessOutputArtifactPort;
    maxRetainedOutputChunks?: number;
    maxTrackedOutputStreams?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBestEffortWindowsProcessTreeKill` | 属性 | <code>allowBestEffortWindowsProcessTreeKill?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseEnvironment` | 属性 | <code>baseEnvironment?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executables` | 属性 | <code>executables: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 方法 | <code>executionId?(request: CommandExecutionRequest): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `gracefulTerminationMs` | 属性 | <code>gracefulTerminationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inheritEnvironment` | 属性 | <code>inheritEnvironment?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArgumentBytes` | 属性 | <code>maxArgumentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArgumentCount` | 属性 | <code>maxArgumentCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEnvironmentValueBytes` | 属性 | <code>maxEnvironmentValueBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEnvironmentVariables` | 属性 | <code>maxEnvironmentVariables?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxExecutionTimeoutMs` | 属性 | <code>maxExecutionTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRetainedOutputChunks` | 属性 | <code>maxRetainedOutputChunks?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalArgumentBytes` | 属性 | <code>maxTotalArgumentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalEnvironmentBytes` | 属性 | <code>maxTotalEnvironmentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedBytes` | 属性 | <code>maxTrackedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedFiles` | 属性 | <code>maxTrackedFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedOutputStreams` | 属性 | <code>maxTrackedOutputStreams?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts?: LocalProcessOutputArtifactPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 方法 | <code>sandboxId?(request: SandboxCreateRequest): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supervisor` | 属性 | <code>supervisor?: LocalProcessSupervisor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
