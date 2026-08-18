# `@codesoul-co/hypha-core` / `contracts/command-execution`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/command-execution.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)
- Exports: **7**

## Using this module

Use the Command execution module for declaring and runtime-validating contracts. It exports 6 interfaces, 1 type.

### Import from the package entrypoint

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

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CommandExecutionRequest` | interface | <code>interface CommandExecutionRequest</code> | Command Execution Request interface with 35 public fields or methods. |
| `CommandExecutionResult` | interface | <code>interface CommandExecutionResult</code> | Command Execution Result interface with 25 public fields or methods. |
| `CommandOutputChunk` | interface | <code>interface CommandOutputChunk</code> | Command Output Chunk interface with 9 public fields or methods. |
| `ExecutionCancelRequest` | interface | <code>interface ExecutionCancelRequest</code> | Execution Cancel Request interface with 9 public fields or methods. |
| `ExecutionReceipt` | interface | <code>interface ExecutionReceipt</code> | Execution Receipt interface with 8 public fields or methods. |
| `ExecutionResourceUsage` | interface | <code>interface ExecutionResourceUsage</code> | Execution Resource Usage interface with 8 public fields or methods. |
| `CommandExecutionStatus` | type | <code>type CommandExecutionStatus = 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling' &#124; 'cancelled' &#124; 'completed' &#124; 'failed' &#124; 'timed_out' &#124; 'oom_killed' &#124; 'resource_exceeded' &#124; 'quarantined'</code> | Public type alias for Command Execution Status; the declaration contains its complete type expression. |

## `CommandExecutionRequest`

Command Execution Request interface with 35 public fields or methods.

- Kind: interface
- Import: `import type { CommandExecutionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `args` | property | <code>args?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `captureArtifacts` | property | <code>captureArtifacts?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `captureFileMutations` | property | <code>captureFileMutations?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `env` | property | <code>env?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkAuthorizationRef` | property | <code>networkAuthorizationRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretRefs` | property | <code>secretRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shell` | property | <code>shell?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotAfter` | property | <code>snapshotAfter?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotBefore` | property | <code>snapshotBefore?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdin` | property | <code>stdin?: string &#124; Uint8Array&lt;ArrayBufferLike&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommandExecutionResult`

Command Execution Result interface with 25 public fields or methods.

- Kind: interface
- Import: `import type { CommandExecutionResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles: FileMutation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exitCode` | property | <code>exitCode: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalReceipt` | property | <code>externalReceipt?: ExecutionReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generatedArtifactRefs` | property | <code>generatedArtifactRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotAfterRef` | property | <code>snapshotAfterRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotBeforeRef` | property | <code>snapshotBeforeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderr` | property | <code>stderr?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderrArtifactRef` | property | <code>stderrArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderrContentHash` | property | <code>stderrContentHash?: string</code> | SHA-256 content hash of the bounded inline stderr value. |
| `stderrTruncated` | property | <code>stderrTruncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdout` | property | <code>stdout?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdoutArtifactRef` | property | <code>stdoutArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdoutContentHash` | property | <code>stdoutContentHash?: string</code> | SHA-256 content hash of the bounded inline stdout value. |
| `stdoutTruncated` | property | <code>stdoutTruncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommandOutputChunk`

Command Output Chunk interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { CommandOutputChunk } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `byteLength` | property | <code>byteLength: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `emittedAt` | property | <code>emittedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encoding` | property | <code>encoding: "utf8" &#124; "base64"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | property | <code>stream: "stdout" &#124; "stderr"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncated` | property | <code>truncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCancelRequest`

Execution Cancel Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCancelRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `gracePeriodMs` | property | <code>gracePeriodMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionReceipt`

Execution Receipt interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionReceipt } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerExecutionRef` | property | <code>providerExecutionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptHash` | property | <code>receiptHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionResourceUsage`

Execution Resource Usage interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionResourceUsage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cpuTimeMs` | property | <code>cpuTimeMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkBytesReceived` | property | <code>networkBytesReceived?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkBytesSent` | property | <code>networkBytesSent?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputBytes` | property | <code>outputBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `peakMemoryBytes` | property | <code>peakMemoryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processCountPeak` | property | <code>processCountPeak?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readBytes` | property | <code>readBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writtenBytes` | property | <code>writtenBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommandExecutionStatus`

Public type alias for Command Execution Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CommandExecutionStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/command-execution`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/command-execution.ts)

### Declaration

```text
export type CommandExecutionStatus = 'queued' | 'starting' | 'running' | 'cancelling' | 'cancelled' | 'completed' | 'failed' | 'timed_out' | 'oom_killed' | 'resource_exceeded' | 'quarantined';
```
