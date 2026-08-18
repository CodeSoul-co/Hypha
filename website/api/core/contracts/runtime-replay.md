# `@codesoul-co/hypha-core` / `contracts/runtime-replay`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)
- Exports: **8**

## Using this module

Use the Runtime replay module for declaring and runtime-validating contracts. It exports 1 constant, 6 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  RUNTIME_REPLAY_DIVERGENCE_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeReplayDivergence,
  RuntimeReplayRequest,
  RuntimeReplayResult,
  RuntimeReplayServiceContract,
  RuntimeReplayVerificationRequest,
  RuntimeReplayVerificationResult,
  RuntimeReplayDivergenceKind,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_REPLAY_DIVERGENCE_KINDS` | constant | <code>const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"]</code> | RUNTIME REPLAY DIVERGENCE KINDS constant exported by the `contracts/runtime-replay` module. |
| `RuntimeReplayDivergence` | interface | <code>interface RuntimeReplayDivergence</code> | Runtime Replay Divergence interface with 4 public fields or methods. |
| `RuntimeReplayRequest` | interface | <code>interface RuntimeReplayRequest</code> | Runtime Replay Request interface with 7 public fields or methods. |
| `RuntimeReplayResult` | interface | <code>interface RuntimeReplayResult</code> | Runtime Replay Result interface with 16 public fields or methods. |
| `RuntimeReplayServiceContract` | interface | <code>interface RuntimeReplayServiceContract</code> | Runtime Replay Service Contract interface with 2 public fields or methods. |
| `RuntimeReplayVerificationRequest` | interface | <code>interface RuntimeReplayVerificationRequest</code> | Runtime Replay Verification Request interface with 2 public fields or methods. |
| `RuntimeReplayVerificationResult` | interface | <code>interface RuntimeReplayVerificationResult</code> | Runtime Replay Verification Result interface with 3 public fields or methods. |
| `RuntimeReplayDivergenceKind` | type | <code>type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number]</code> | Public type alias for Runtime Replay Divergence Kind; the declaration contains its complete type expression. |

## `RUNTIME_REPLAY_DIVERGENCE_KINDS`

RUNTIME REPLAY DIVERGENCE KINDS constant exported by the `contracts/runtime-replay` module.

- Kind: constant
- Import: `import { RUNTIME_REPLAY_DIVERGENCE_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export declare const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"];
```

## `RuntimeReplayDivergence`

Runtime Replay Divergence interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayDivergence } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayDivergence {
    kind: RuntimeReplayDivergenceKind;
    expected: string;
    actual: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expected` | property | <code>expected: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "workflow_revision" &#124; "process_hash" &#124; "dependency_snapshot" &#124; "projection_version" &#124; "snapshot_checksum"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeReplayRequest`

Runtime Replay Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayRequest {
    scope: RuntimeScope;
    checkpointId?: string;
    expectedWorkflowRevision: string;
    expectedProcessHash: string;
    expectedDependencySnapshotRef: string;
    toSequence?: number;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedDependencySnapshotRef` | property | <code>expectedDependencySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedProcessHash` | property | <code>expectedProcessHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedWorkflowRevision` | property | <code>expectedWorkflowRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toSequence` | property | <code>toSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeReplayResult`

Runtime Replay Result interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayResult {
    sourceRunId: string;
    mode: 'deterministic';
    checkpointId: string;
    baseEventSequence: number;
    targetEventSequence: number;
    replayedEventCount: number;
    appliedEventCount: number;
    eventIds: string[];
    workflowRevision: string;
    processHash: string;
    dependencySnapshotRef: string;
    projectionVersion: string;
    finalSnapshot: RuntimeOrchestrationProjection;
    finalSnapshotChecksum: string;
    divergences: RuntimeReplayDivergence[];
    completedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appliedEventCount` | property | <code>appliedEventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseEventSequence` | property | <code>baseEventSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointId` | property | <code>checkpointId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `divergences` | property | <code>divergences: RuntimeReplayDivergence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalSnapshot` | property | <code>finalSnapshot: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalSnapshotChecksum` | property | <code>finalSnapshotChecksum: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "deterministic"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processHash` | property | <code>processHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replayedEventCount` | property | <code>replayedEventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRunId` | property | <code>sourceRunId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetEventSequence` | property | <code>targetEventSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeReplayServiceContract`

Runtime Replay Service Contract interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayServiceContract } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayServiceContract {
    replay(request: RuntimeReplayRequest): Promise<RuntimeReplayResult>;
    verify(request: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `replay` | method | <code>replay(request: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verify` | method | <code>verify(request: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeReplayVerificationRequest`

Runtime Replay Verification Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayVerificationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayVerificationRequest {
    replay: RuntimeReplayRequest;
    expectedSnapshotChecksum: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSnapshotChecksum` | property | <code>expectedSnapshotChecksum: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replay` | property | <code>replay: RuntimeReplayRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeReplayVerificationResult`

Runtime Replay Verification Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayVerificationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export interface RuntimeReplayVerificationResult {
    replay: RuntimeReplayResult;
    matches: boolean;
    divergences: RuntimeReplayDivergence[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `divergences` | property | <code>divergences: RuntimeReplayDivergence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matches` | property | <code>matches: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replay` | property | <code>replay: RuntimeReplayResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeReplayDivergenceKind`

Public type alias for Runtime Replay Divergence Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeReplayDivergenceKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### Declaration

```text
export type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number];
```
