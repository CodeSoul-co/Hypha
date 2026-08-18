# `@codesoul-co/hypha-core` / `contracts/command-execution`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/command-execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CommandExecutionRequest` | 接口 | <code>interface CommandExecutionRequest</code> | Command Execution Request 的字段契约；完整字段见下表。 |
| `CommandExecutionResult` | 接口 | <code>interface CommandExecutionResult</code> | Command Execution Result 的字段契约；完整字段见下表。 |
| `CommandOutputChunk` | 接口 | <code>interface CommandOutputChunk</code> | Command Output Chunk 的字段契约；完整字段见下表。 |
| `ExecutionCancelRequest` | 接口 | <code>interface ExecutionCancelRequest</code> | Execution Cancel Request 的字段契约；完整字段见下表。 |
| `ExecutionReceipt` | 接口 | <code>interface ExecutionReceipt</code> | Execution Receipt 的字段契约；完整字段见下表。 |
| `ExecutionResourceUsage` | 接口 | <code>interface ExecutionResourceUsage</code> | Execution Resource Usage 的字段契约；完整字段见下表。 |
| `CommandExecutionStatus` | 类型 | <code>type CommandExecutionStatus = 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'oom_killed' &#124; 'resource_exceeded' &#124; 'quarantined'</code> | Command Execution Status 的公共类型别名。 |

## `CommandExecutionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `captureArtifacts` | 属性 | <code>captureArtifacts: boolean</code> | capture Artifacts 字段。 |
| `captureFileMutations` | 属性 | <code>captureFileMutations: boolean</code> | capture File Mutations 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `env` | 属性 | <code>env: Record&lt;string, string&gt;</code> | env 字段。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | environment Ref 字段。 |
| `executable` | 属性 | <code>executable: string</code> | executable 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash: string</code> | expected Workspace Snapshot Hash 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs: number</code> | idle Timeout Ms 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `networkAuthorizationRef` | 属性 | <code>networkAuthorizationRef: string</code> | network Authorization Ref 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `secretRefs` | 属性 | <code>secretRefs: string[]</code> | secret Refs 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `shell` | 属性 | <code>shell: boolean</code> | shell 字段。 |
| `snapshotAfter` | 属性 | <code>snapshotAfter: boolean</code> | snapshot After 字段。 |
| `snapshotBefore` | 属性 | <code>snapshotBefore: boolean</code> | snapshot Before 字段。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure: boolean</code> | snapshot On Failure 字段。 |
| `stdin` | 属性 | <code>stdin: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | stdin 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `CommandExecutionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles: FileMutation[]</code> | changed Files 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | exit Code 字段。 |
| `externalReceipt` | 属性 | <code>externalReceipt: ExecutionReceipt</code> | external Receipt 字段。 |
| `generatedArtifactRefs` | 属性 | <code>generatedArtifactRefs: string[]</code> | generated Artifact Refs 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `signal` | 属性 | <code>signal: string</code> | signal 字段。 |
| `snapshotAfterRef` | 属性 | <code>snapshotAfterRef: string</code> | snapshot After Ref 字段。 |
| `snapshotBeforeRef` | 属性 | <code>snapshotBeforeRef: string</code> | snapshot Before Ref 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | status 字段。 |
| `stderr` | 属性 | <code>stderr: string</code> | stderr 字段。 |
| `stderrArtifactRef` | 属性 | <code>stderrArtifactRef: string</code> | stderr Artifact Ref 字段。 |
| `stderrContentHash` | 属性 | <code>stderrContentHash: string</code> | SHA-256 content hash of the bounded inline stderr value. |
| `stderrTruncated` | 属性 | <code>stderrTruncated: boolean</code> | stderr Truncated 字段。 |
| `stdout` | 属性 | <code>stdout: string</code> | stdout 字段。 |
| `stdoutArtifactRef` | 属性 | <code>stdoutArtifactRef: string</code> | stdout Artifact Ref 字段。 |
| `stdoutContentHash` | 属性 | <code>stdoutContentHash: string</code> | SHA-256 content hash of the bounded inline stdout value. |
| `stdoutTruncated` | 属性 | <code>stdoutTruncated: boolean</code> | stdout Truncated 字段。 |

## `CommandOutputChunk` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `byteLength` | 属性 | <code>byteLength: number</code> | byte Length 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `emittedAt` | 属性 | <code>emittedAt: string</code> | emitted At 字段。 |
| `encoding` | 属性 | <code>encoding: "utf8" &#124; "base64"</code> | encoding 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `stream` | 属性 | <code>stream: "stdout" &#124; "stderr"</code> | stream 字段。 |
| `truncated` | 属性 | <code>truncated: boolean</code> | truncated 字段。 |

## `ExecutionCancelRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `gracePeriodMs` | 属性 | <code>gracePeriodMs: number</code> | grace Period Ms 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `ExecutionReceipt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | issued At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef: string</code> | provider Execution Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `receiptHash` | 属性 | <code>receiptHash: string</code> | receipt Hash 字段。 |
| `status` | 属性 | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | status 字段。 |

## `ExecutionResourceUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cpuTimeMs` | 属性 | <code>cpuTimeMs: number</code> | cpu Time Ms 字段。 |
| `networkBytesReceived` | 属性 | <code>networkBytesReceived: number</code> | network Bytes Received 字段。 |
| `networkBytesSent` | 属性 | <code>networkBytesSent: number</code> | network Bytes Sent 字段。 |
| `outputBytes` | 属性 | <code>outputBytes: number</code> | output Bytes 字段。 |
| `peakMemoryBytes` | 属性 | <code>peakMemoryBytes: number</code> | peak Memory Bytes 字段。 |
| `processCountPeak` | 属性 | <code>processCountPeak: number</code> | process Count Peak 字段。 |
| `readBytes` | 属性 | <code>readBytes: number</code> | read Bytes 字段。 |
| `writtenBytes` | 属性 | <code>writtenBytes: number</code> | written Bytes 字段。 |
