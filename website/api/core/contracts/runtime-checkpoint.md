# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-checkpoint.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)
- Exports: **16**

## Using this module

Use the Runtime checkpoint module for declaring and runtime-validating contracts. It exports 4 constants, 8 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_CHECKPOINT_COMPRESSIONS,
  RUNTIME_CHECKPOINT_DISPOSITIONS,
  RUNTIME_CHECKPOINT_MODES,
  RUNTIME_CHECKPOINT_REASONS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCheckpointCreateCommand,
  RuntimeCheckpointCreateResult,
  RuntimeCheckpointLoadRequest,
  RuntimeCheckpointLoadResult,
  RuntimeCheckpointPolicySpec,
  RuntimeCheckpointPutResult,
  RuntimeCheckpointRecord,
  RuntimeCheckpointStore,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CHECKPOINT_COMPRESSIONS` | constant | <code>const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"]</code> | RUNTIME CHECKPOINT COMPRESSIONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_DISPOSITIONS` | constant | <code>const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | RUNTIME CHECKPOINT DISPOSITIONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_MODES` | constant | <code>const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]</code> | RUNTIME CHECKPOINT MODES constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_REASONS` | constant | <code>const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]</code> | RUNTIME CHECKPOINT REASONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RuntimeCheckpointCreateCommand` | interface | <code>interface RuntimeCheckpointCreateCommand</code> | Runtime Checkpoint Create Command interface with 15 public fields or methods. |
| `RuntimeCheckpointCreateResult` | interface | <code>interface RuntimeCheckpointCreateResult</code> | Runtime Checkpoint Create Result interface with 4 public fields or methods. |
| `RuntimeCheckpointLoadRequest` | interface | <code>interface RuntimeCheckpointLoadRequest</code> | Runtime Checkpoint Load Request interface with 3 public fields or methods. |
| `RuntimeCheckpointLoadResult` | interface | <code>interface RuntimeCheckpointLoadResult</code> | Runtime Checkpoint Load Result interface with 4 public fields or methods. |
| `RuntimeCheckpointPolicySpec` | interface | <code>interface RuntimeCheckpointPolicySpec</code> | Runtime Checkpoint Policy Spec interface with 6 public fields or methods. |
| `RuntimeCheckpointPutResult` | interface | <code>interface RuntimeCheckpointPutResult</code> | Runtime Checkpoint Put Result interface with 2 public fields or methods. |
| `RuntimeCheckpointRecord` | interface | <code>interface RuntimeCheckpointRecord</code> | Runtime Checkpoint Record interface with 20 public fields or methods. |
| `RuntimeCheckpointStore` | interface | <code>interface RuntimeCheckpointStore</code> | Runtime Checkpoint Store interface with 4 public fields or methods. |
| `RuntimeCheckpointCompression` | type | <code>type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number]</code> | Public type alias for Runtime Checkpoint Compression; the declaration contains its complete type expression. |
| `RuntimeCheckpointDisposition` | type | <code>type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number]</code> | Public type alias for Runtime Checkpoint Disposition; the declaration contains its complete type expression. |
| `RuntimeCheckpointMode` | type | <code>type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number]</code> | Public type alias for Runtime Checkpoint Mode; the declaration contains its complete type expression. |
| `RuntimeCheckpointReason` | type | <code>type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number]</code> | Public type alias for Runtime Checkpoint Reason; the declaration contains its complete type expression. |

## `RUNTIME_CHECKPOINT_COMPRESSIONS`

RUNTIME CHECKPOINT COMPRESSIONS constant exported by the `contracts/runtime-checkpoint` module.

- Kind: constant
- Import: `import { RUNTIME_CHECKPOINT_COMPRESSIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export declare const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"];
```

## `RUNTIME_CHECKPOINT_DISPOSITIONS`

RUNTIME CHECKPOINT DISPOSITIONS constant exported by the `contracts/runtime-checkpoint` module.

- Kind: constant
- Import: `import { RUNTIME_CHECKPOINT_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export declare const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"];
```

## `RUNTIME_CHECKPOINT_MODES`

RUNTIME CHECKPOINT MODES constant exported by the `contracts/runtime-checkpoint` module.

- Kind: constant
- Import: `import { RUNTIME_CHECKPOINT_MODES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export declare const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"];
```

## `RUNTIME_CHECKPOINT_REASONS`

RUNTIME CHECKPOINT REASONS constant exported by the `contracts/runtime-checkpoint` module.

- Kind: constant
- Import: `import { RUNTIME_CHECKPOINT_REASONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export declare const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"];
```

## `RuntimeCheckpointCreateCommand`

Runtime Checkpoint Create Command interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointCreateCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointCreateCommand {
    checkpointId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    workflowRevision: string;
    processHash: string;
    variablesHash: string;
    dependencySnapshotRef: string;
    toolContractSnapshotRef?: string;
    workspaceSnapshotRef?: string;
    contextSnapshotRefs?: string[];
    reason: RuntimeCheckpointReason;
    createdAt: string;
    idempotencyKey?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSnapshotRefs` | property | <code>contextSnapshotRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processHash` | property | <code>processHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolContractSnapshotRef` | property | <code>toolContractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variablesHash` | property | <code>variablesHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceSnapshotRef` | property | <code>workspaceSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointCreateResult`

Runtime Checkpoint Create Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointCreateResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointCreateResult {
    checkpointId: string;
    disposition: RuntimeCheckpointDisposition;
    eventIds: string[];
    record?: RuntimeCheckpointRecord;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record?: RuntimeCheckpointRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointLoadRequest`

Runtime Checkpoint Load Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointLoadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointLoadRequest {
    scope: RuntimeScope;
    checkpointId?: string;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointId` | property | <code>checkpointId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointLoadResult`

Runtime Checkpoint Load Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointLoadResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointLoadResult {
    record: RuntimeCheckpointRecord;
    currentHeadSequence: number;
    deltaFromSequence: number;
    deltaEventCount: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentHeadSequence` | property | <code>currentHeadSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deltaEventCount` | property | <code>deltaEventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deltaFromSequence` | property | <code>deltaFromSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: RuntimeCheckpointRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointPolicySpec`

Runtime Checkpoint Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointPolicySpec {
    mode: RuntimeCheckpointMode;
    everyNEvents?: number;
    retainLast?: number;
    persistWorkspaceSnapshot?: boolean;
    persistContextRefs?: boolean;
    compression?: RuntimeCheckpointCompression;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compression` | property | <code>compression?: "none" &#124; "gzip" &#124; "zstd"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `everyNEvents` | property | <code>everyNEvents?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "none" &#124; "custom" &#124; "state_boundary" &#124; "every_n_events" &#124; "wait_boundary"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persistContextRefs` | property | <code>persistContextRefs?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persistWorkspaceSnapshot` | property | <code>persistWorkspaceSnapshot?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainLast` | property | <code>retainLast?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointPutResult`

Runtime Checkpoint Put Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointPutResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointPutResult {
    record: RuntimeCheckpointRecord;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | property | <code>record: RuntimeCheckpointRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointRecord`

Runtime Checkpoint Record interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointRecord {
    id: string;
    scope: RuntimeScope;
    sequence: number;
    workflowRevision: string;
    processHash: string;
    currentState: string;
    variablesHash: string;
    projectionVersion: string;
    projectionSnapshot: RuntimeOrchestrationProjection;
    dependencySnapshotRef: string;
    toolContractSnapshotRef?: string;
    workspaceSnapshotRef?: string;
    contextSnapshotRefs?: string[];
    pendingWaitRef?: string;
    lastEventSequence: number;
    reason: RuntimeCheckpointReason;
    requestHash: string;
    checksum: string;
    createdAt: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checksum` | property | <code>checksum: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSnapshotRefs` | property | <code>contextSnapshotRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentState` | property | <code>currentState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastEventSequence` | property | <code>lastEventSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingWaitRef` | property | <code>pendingWaitRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processHash` | property | <code>processHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionSnapshot` | property | <code>projectionSnapshot: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestHash` | property | <code>requestHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolContractSnapshotRef` | property | <code>toolContractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variablesHash` | property | <code>variablesHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceSnapshotRef` | property | <code>workspaceSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCheckpointStore`

Runtime Checkpoint Store interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export interface RuntimeCheckpointStore {
    put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeCheckpointCompression`

Public type alias for Runtime Checkpoint Compression; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCheckpointCompression } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number];
```

## `RuntimeCheckpointDisposition`

Public type alias for Runtime Checkpoint Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCheckpointDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number];
```

## `RuntimeCheckpointMode`

Public type alias for Runtime Checkpoint Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCheckpointMode } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number];
```

## `RuntimeCheckpointReason`

Public type alias for Runtime Checkpoint Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCheckpointReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### Declaration

```text
export type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number];
```
