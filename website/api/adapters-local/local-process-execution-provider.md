# `@codesoul-co/hypha-adapters-local` / `local-process-execution-provider`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-execution-provider.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessExecutionProvider` | class | <code>new LocalProcessExecutionProvider(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Trusted-development provider. Workspace checks are confinement, not OS isolation. |
| `LocalProcessExecutionProviderOptions` | interface | <code>interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions</code> | Field contract for Local Process Execution Provider Options; see all contract members below. |

## `LocalProcessExecutionProvider` public members

Trusted-development provider. Workspace checks are confinement, not OS isolation.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public runtime operation for cleanup. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: LocalProcessExecutionProviderOptions): LocalProcessExecutionProvider</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Creates create at this module boundary. |
| `execute` | method | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `start` | method | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public runtime operation for status. |
| `streamOutput` | method | <code>streamOutput(input: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public runtime operation for stream Output. |
| `terminate` | method | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public runtime operation for terminate. |

## `LocalProcessExecutionProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBestEffortWindowsProcessTreeKill` | property | <code>allowBestEffortWindowsProcessTreeKill: boolean</code> | Public allow Best Effort Windows Process Tree Kill property. |
| `baseEnvironment` | property | <code>baseEnvironment: Record&lt;string, string&gt;</code> | Public base Environment property. |
| `executables` | property | <code>executables: Record&lt;string, string&gt;</code> | Public executables property. |
| `executionId` | method | <code>executionId(request: CommandExecutionRequest): string</code> | Public runtime operation for execution Id. |
| `gracefulTerminationMs` | property | <code>gracefulTerminationMs: number</code> | Public graceful Termination Ms property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inheritEnvironment` | property | <code>inheritEnvironment: string[]</code> | Public inherit Environment property. |
| `maxArgumentBytes` | property | <code>maxArgumentBytes: number</code> | Public max Argument Bytes property. |
| `maxArgumentCount` | property | <code>maxArgumentCount: number</code> | Public max Argument Count property. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public max Combined Output Bytes property. |
| `maxEnvironmentValueBytes` | property | <code>maxEnvironmentValueBytes: number</code> | Public max Environment Value Bytes property. |
| `maxEnvironmentVariables` | property | <code>maxEnvironmentVariables: number</code> | Public max Environment Variables property. |
| `maxExecutionTimeoutMs` | property | <code>maxExecutionTimeoutMs: number</code> | Public max Execution Timeout Ms property. |
| `maxRetainedOutputChunks` | property | <code>maxRetainedOutputChunks: number</code> | Public max Retained Output Chunks property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `maxTotalArgumentBytes` | property | <code>maxTotalArgumentBytes: number</code> | Public max Total Argument Bytes property. |
| `maxTotalEnvironmentBytes` | property | <code>maxTotalEnvironmentBytes: number</code> | Public max Total Environment Bytes property. |
| `maxTrackedBytes` | property | <code>maxTrackedBytes: number</code> | Public max Tracked Bytes property. |
| `maxTrackedFiles` | property | <code>maxTrackedFiles: number</code> | Public max Tracked Files property. |
| `maxTrackedOutputStreams` | property | <code>maxTrackedOutputStreams: number</code> | Public max Tracked Output Streams property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `outputArtifacts` | property | <code>outputArtifacts: LocalProcessOutputArtifactPort</code> | Public output Artifacts property. |
| `sandboxId` | method | <code>sandboxId(request: SandboxCreateRequest): string</code> | Public runtime operation for sandbox Id. |
| `supervisor` | property | <code>supervisor: LocalProcessSupervisor</code> | Public supervisor property. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |
