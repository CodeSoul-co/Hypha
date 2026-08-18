# `@codesoul-co/hypha-adapters-local` / `local-process-execution-provider`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessExecutionProvider` | 类 | <code>new LocalProcessExecutionProvider(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Trusted-development provider. Workspace checks are confinement, not OS isolation. |
| `LocalProcessExecutionProviderOptions` | 接口 | <code>interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions</code> | Local Process Execution Provider Options 的字段契约；完整字段见下表。 |

## `LocalProcessExecutionProvider` 公开成员

Trusted-development provider. Workspace checks are confinement, not OS isolation.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `cleanup` | 方法 | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | cleanup 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 创建 create。 |
| `execute` | 方法 | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `start` | 方法 | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | status 的公开运行时操作。 |
| `streamOutput` | 方法 | <code>streamOutput(input: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | stream Output 的公开运行时操作。 |
| `terminate` | 方法 | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | terminate 的公开运行时操作。 |

## `LocalProcessExecutionProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBestEffortWindowsProcessTreeKill` | 属性 | <code>allowBestEffortWindowsProcessTreeKill: boolean</code> | allow Best Effort Windows Process Tree Kill 字段。 |
| `baseEnvironment` | 属性 | <code>baseEnvironment: Record&lt;string, string&gt;</code> | base Environment 字段。 |
| `executables` | 属性 | <code>executables: Record&lt;string, string&gt;</code> | executables 字段。 |
| `executionId` | 方法 | <code>executionId(request: CommandExecutionRequest): string</code> | execution Id 的公开运行时操作。 |
| `gracefulTerminationMs` | 属性 | <code>gracefulTerminationMs: number</code> | graceful Termination Ms 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inheritEnvironment` | 属性 | <code>inheritEnvironment: string[]</code> | inherit Environment 字段。 |
| `maxArgumentBytes` | 属性 | <code>maxArgumentBytes: number</code> | max Argument Bytes 字段。 |
| `maxArgumentCount` | 属性 | <code>maxArgumentCount: number</code> | max Argument Count 字段。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | max Combined Output Bytes 字段。 |
| `maxEnvironmentValueBytes` | 属性 | <code>maxEnvironmentValueBytes: number</code> | max Environment Value Bytes 字段。 |
| `maxEnvironmentVariables` | 属性 | <code>maxEnvironmentVariables: number</code> | max Environment Variables 字段。 |
| `maxExecutionTimeoutMs` | 属性 | <code>maxExecutionTimeoutMs: number</code> | max Execution Timeout Ms 字段。 |
| `maxRetainedOutputChunks` | 属性 | <code>maxRetainedOutputChunks: number</code> | max Retained Output Chunks 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `maxTotalArgumentBytes` | 属性 | <code>maxTotalArgumentBytes: number</code> | max Total Argument Bytes 字段。 |
| `maxTotalEnvironmentBytes` | 属性 | <code>maxTotalEnvironmentBytes: number</code> | max Total Environment Bytes 字段。 |
| `maxTrackedBytes` | 属性 | <code>maxTrackedBytes: number</code> | max Tracked Bytes 字段。 |
| `maxTrackedFiles` | 属性 | <code>maxTrackedFiles: number</code> | max Tracked Files 字段。 |
| `maxTrackedOutputStreams` | 属性 | <code>maxTrackedOutputStreams: number</code> | max Tracked Output Streams 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts: LocalProcessOutputArtifactPort</code> | output Artifacts 字段。 |
| `sandboxId` | 方法 | <code>sandboxId(request: SandboxCreateRequest): string</code> | sandbox Id 的公开运行时操作。 |
| `supervisor` | 属性 | <code>supervisor: LocalProcessSupervisor</code> | supervisor 字段。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |
