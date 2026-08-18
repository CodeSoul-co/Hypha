# `@codesoul-co/hypha-core` / `contracts/command-execution`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/command-execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)
- 导出数: **7**

## 模块用法

用于声明并运行时校验契约。Command execution 模块公开 6 接口、1 类型。

### 从包入口导入

```ts
import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  CommandOutputChunk,
  ExecutionCancelRequest,
  ExecutionReceipt,
  ExecutionResourceUsage,
  CommandExecutionStatus,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CommandExecutionRequest` | 接口 | <code>interface CommandExecutionRequest</code> | Command Execution Request 接口，共包含 35 个公开字段或方法。 |
| `CommandExecutionResult` | 接口 | <code>interface CommandExecutionResult</code> | Command Execution Result 接口，共包含 25 个公开字段或方法。 |
| `CommandOutputChunk` | 接口 | <code>interface CommandOutputChunk</code> | Command Output Chunk 接口，共包含 9 个公开字段或方法。 |
| `ExecutionCancelRequest` | 接口 | <code>interface ExecutionCancelRequest</code> | Execution Cancel Request 接口，共包含 9 个公开字段或方法。 |
| `ExecutionReceipt` | 接口 | <code>interface ExecutionReceipt</code> | Execution Receipt 接口，共包含 8 个公开字段或方法。 |
| `ExecutionResourceUsage` | 接口 | <code>interface ExecutionResourceUsage</code> | Execution Resource Usage 接口，共包含 8 个公开字段或方法。 |
| `CommandExecutionStatus` | 类型 | <code>type CommandExecutionStatus = 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'oom_killed' &#124; 'resource_exceeded' &#124; 'quarantined'</code> | Command Execution Status 公共类型别名；完整类型表达式见声明。 |

## `CommandExecutionRequest`

Command Execution Request 接口，共包含 35 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommandExecutionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface CommandExecutionRequest {
    executionId?: string;
    operationId: string;
    principal: ExecutionPrincipal;
    tenantId?: string;
    userId: string;
    workspaceId: string;
    sessionId?: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    sandboxId?: string;
    environmentRef: SpecRef;
    executable: string;
    args?: string[];
    cwd?: string;
    env?: Record<string, string>;
    secretRefs?: string[];
    shell?: boolean;
    stdin?: string | Uint8Array;
    timeoutMs?: number;
    idleTimeoutMs?: number;
    maxStdoutBytes?: number;
    maxStderrBytes?: number;
    captureArtifacts?: boolean;
    captureFileMutations?: boolean;
    snapshotBefore?: boolean;
    snapshotAfter?: boolean;
    snapshotOnFailure?: boolean;
    networkAuthorizationRef?: string;
    idempotencyKey?: string;
    expectedWorkspaceSnapshotHash?: string;
    correlationId?: string;
    causationId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `args` | 属性 | <code>args?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `captureArtifacts` | 属性 | <code>captureArtifacts?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `captureFileMutations` | 属性 | <code>captureFileMutations?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `env` | 属性 | <code>env?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkAuthorizationRef` | 属性 | <code>networkAuthorizationRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretRefs` | 属性 | <code>secretRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shell` | 属性 | <code>shell?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotAfter` | 属性 | <code>snapshotAfter?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotBefore` | 属性 | <code>snapshotBefore?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdin` | 属性 | <code>stdin?: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommandExecutionResult`

Command Execution Result 接口，共包含 25 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommandExecutionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface CommandExecutionResult {
    executionId: string;
    revision: number;
    sandboxId: string;
    status: CommandExecutionStatus;
    exitCode: number | null;
    signal?: string;
    stdout?: string;
    stderr?: string;
    /** SHA-256 content hash of the bounded inline stdout value. */
    stdoutContentHash?: string;
    /** SHA-256 content hash of the bounded inline stderr value. */
    stderrContentHash?: string;
    stdoutTruncated?: boolean;
    stderrTruncated?: boolean;
    stdoutArtifactRef?: string;
    stderrArtifactRef?: string;
    changedFiles: FileMutation[];
    generatedArtifactRefs: string[];
    snapshotBeforeRef?: string;
    snapshotAfterRef?: string;
    resourceUsage?: ExecutionResourceUsage;
    externalReceipt?: ExecutionReceipt;
    startedAt: string;
    completedAt?: string;
    latencyMs?: number;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles: FileMutation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalReceipt` | 属性 | <code>externalReceipt?: ExecutionReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generatedArtifactRefs` | 属性 | <code>generatedArtifactRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotAfterRef` | 属性 | <code>snapshotAfterRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotBeforeRef` | 属性 | <code>snapshotBeforeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderr` | 属性 | <code>stderr?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderrArtifactRef` | 属性 | <code>stderrArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stderrContentHash` | 属性 | <code>stderrContentHash?: string</code> | SHA-256 content hash of the bounded inline stderr value. |
| `stderrTruncated` | 属性 | <code>stderrTruncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdout` | 属性 | <code>stdout?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdoutArtifactRef` | 属性 | <code>stdoutArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdoutContentHash` | 属性 | <code>stdoutContentHash?: string</code> | SHA-256 content hash of the bounded inline stdout value. |
| `stdoutTruncated` | 属性 | <code>stdoutTruncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommandOutputChunk`

Command Output Chunk 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommandOutputChunk } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface CommandOutputChunk {
    executionId: string;
    sequence: number;
    stream: 'stdout' | 'stderr';
    encoding: 'utf8' | 'base64';
    content: string;
    byteLength: number;
    contentHash: string;
    emittedAt: string;
    truncated?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `byteLength` | 属性 | <code>byteLength: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `emittedAt` | 属性 | <code>emittedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encoding` | 属性 | <code>encoding: "utf8" &#124; "base64"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 属性 | <code>stream: "stdout" &#124; "stderr"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncated` | 属性 | <code>truncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCancelRequest`

Execution Cancel Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCancelRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface ExecutionCancelRequest {
    operationId: string;
    executionId: string;
    principal: ExecutionPrincipal;
    expectedRevision: number;
    reason?: string;
    gracePeriodMs?: number;
    idempotencyKey?: string;
    correlationId?: string;
    causationId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `gracePeriodMs` | 属性 | <code>gracePeriodMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionReceipt`

Execution Receipt 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionReceipt } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface ExecutionReceipt {
    id: string;
    providerId: string;
    executionId: string;
    providerExecutionRef?: string;
    status: 'accepted' | 'completed' | 'rejected' | 'unknown';
    issuedAt: string;
    receiptHash: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptHash` | 属性 | <code>receiptHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionResourceUsage`

Execution Resource Usage 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionResourceUsage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export interface ExecutionResourceUsage {
    cpuTimeMs?: number;
    peakMemoryBytes?: number;
    readBytes?: number;
    writtenBytes?: number;
    networkBytesSent?: number;
    networkBytesReceived?: number;
    processCountPeak?: number;
    outputBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cpuTimeMs` | 属性 | <code>cpuTimeMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkBytesReceived` | 属性 | <code>networkBytesReceived?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkBytesSent` | 属性 | <code>networkBytesSent?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputBytes` | 属性 | <code>outputBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `peakMemoryBytes` | 属性 | <code>peakMemoryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processCountPeak` | 属性 | <code>processCountPeak?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readBytes` | 属性 | <code>readBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writtenBytes` | 属性 | <code>writtenBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommandExecutionStatus`

Command Execution Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CommandExecutionStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### 声明

```text
export type CommandExecutionStatus = 'queued' | 'starting' | 'running' | 'cancelling' | 'cancelled' | 'completed' | 'failed' | 'timed_out' | 'oom_killed' | 'resource_exceeded' | 'quarantined';
```
