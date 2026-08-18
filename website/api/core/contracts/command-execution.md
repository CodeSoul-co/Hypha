# `@codesoul-co/hypha-core` / `contracts/command-execution`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/command-execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CommandExecutionRequest` | interface | <code>interface CommandExecutionRequest</code> | Field contract for Command Execution Request; see all contract members below. |
| `CommandExecutionResult` | interface | <code>interface CommandExecutionResult</code> | Field contract for Command Execution Result; see all contract members below. |
| `CommandOutputChunk` | interface | <code>interface CommandOutputChunk</code> | Field contract for Command Output Chunk; see all contract members below. |
| `ExecutionCancelRequest` | interface | <code>interface ExecutionCancelRequest</code> | Field contract for Execution Cancel Request; see all contract members below. |
| `ExecutionReceipt` | interface | <code>interface ExecutionReceipt</code> | Field contract for Execution Receipt; see all contract members below. |
| `ExecutionResourceUsage` | interface | <code>interface ExecutionResourceUsage</code> | Field contract for Execution Resource Usage; see all contract members below. |
| `CommandExecutionStatus` | type | <code>type CommandExecutionStatus = 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'oom_killed' &#124; 'resource_exceeded' &#124; 'quarantined'</code> | Public type alias for Command Execution Status. |

## `CommandExecutionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `captureArtifacts` | property | <code>captureArtifacts: boolean</code> | Public capture Artifacts property. |
| `captureFileMutations` | property | <code>captureFileMutations: boolean</code> | Public capture File Mutations property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `env` | property | <code>env: Record&lt;string, string&gt;</code> | Public env property. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public environment Ref property. |
| `executable` | property | <code>executable: string</code> | Public executable property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash: string</code> | Public expected Workspace Snapshot Hash property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs: number</code> | Public idle Timeout Ms property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `networkAuthorizationRef` | property | <code>networkAuthorizationRef: string</code> | Public network Authorization Ref property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `secretRefs` | property | <code>secretRefs: string[]</code> | Public secret Refs property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `shell` | property | <code>shell: boolean</code> | Public shell property. |
| `snapshotAfter` | property | <code>snapshotAfter: boolean</code> | Public snapshot After property. |
| `snapshotBefore` | property | <code>snapshotBefore: boolean</code> | Public snapshot Before property. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure: boolean</code> | Public snapshot On Failure property. |
| `stdin` | property | <code>stdin: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | Public stdin property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `CommandExecutionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles: FileMutation[]</code> | Public changed Files property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `exitCode` | property | <code>exitCode: number</code> | Public exit Code property. |
| `externalReceipt` | property | <code>externalReceipt: ExecutionReceipt</code> | Public external Receipt property. |
| `generatedArtifactRefs` | property | <code>generatedArtifactRefs: string[]</code> | Public generated Artifact Refs property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `signal` | property | <code>signal: string</code> | Public signal property. |
| `snapshotAfterRef` | property | <code>snapshotAfterRef: string</code> | Public snapshot After Ref property. |
| `snapshotBeforeRef` | property | <code>snapshotBeforeRef: string</code> | Public snapshot Before Ref property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public status property. |
| `stderr` | property | <code>stderr: string</code> | Public stderr property. |
| `stderrArtifactRef` | property | <code>stderrArtifactRef: string</code> | Public stderr Artifact Ref property. |
| `stderrContentHash` | property | <code>stderrContentHash: string</code> | SHA-256 content hash of the bounded inline stderr value. |
| `stderrTruncated` | property | <code>stderrTruncated: boolean</code> | Public stderr Truncated property. |
| `stdout` | property | <code>stdout: string</code> | Public stdout property. |
| `stdoutArtifactRef` | property | <code>stdoutArtifactRef: string</code> | Public stdout Artifact Ref property. |
| `stdoutContentHash` | property | <code>stdoutContentHash: string</code> | SHA-256 content hash of the bounded inline stdout value. |
| `stdoutTruncated` | property | <code>stdoutTruncated: boolean</code> | Public stdout Truncated property. |

## `CommandOutputChunk` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `byteLength` | property | <code>byteLength: number</code> | Public byte Length property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `emittedAt` | property | <code>emittedAt: string</code> | Public emitted At property. |
| `encoding` | property | <code>encoding: "utf8" &#124; "base64"</code> | Public encoding property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `stream` | property | <code>stream: "stdout" &#124; "stderr"</code> | Public stream property. |
| `truncated` | property | <code>truncated: boolean</code> | Public truncated property. |

## `ExecutionCancelRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `gracePeriodMs` | property | <code>gracePeriodMs: number</code> | Public grace Period Ms property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `ExecutionReceipt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public issued At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `providerExecutionRef` | property | <code>providerExecutionRef: string</code> | Public provider Execution Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `receiptHash` | property | <code>receiptHash: string</code> | Public receipt Hash property. |
| `status` | property | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public status property. |

## `ExecutionResourceUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cpuTimeMs` | property | <code>cpuTimeMs: number</code> | Public cpu Time Ms property. |
| `networkBytesReceived` | property | <code>networkBytesReceived: number</code> | Public network Bytes Received property. |
| `networkBytesSent` | property | <code>networkBytesSent: number</code> | Public network Bytes Sent property. |
| `outputBytes` | property | <code>outputBytes: number</code> | Public output Bytes property. |
| `peakMemoryBytes` | property | <code>peakMemoryBytes: number</code> | Public peak Memory Bytes property. |
| `processCountPeak` | property | <code>processCountPeak: number</code> | Public process Count Peak property. |
| `readBytes` | property | <code>readBytes: number</code> | Public read Bytes property. |
| `writtenBytes` | property | <code>writtenBytes: number</code> | Public written Bytes property. |
