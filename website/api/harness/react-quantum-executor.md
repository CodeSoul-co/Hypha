# `@codesoul-co/hypha-harness` / `react-quantum-executor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/react-quantum-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)
- Exports: **19**

## Using this module

Use the React quantum executor module for executing runtime behavior at this boundary. It exports 3 classes, 1 constant, 1 function, 13 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  ArtifactReActContextSnapshotStore,
  ContinuationIdentityValidator,
  ReActQuantumExecutor,
  REACT_CONTEXT_SNAPSHOT_VERSION,
  createContinuationReActQuantumDescriptor,
} from '@codesoul-co/hypha-harness';

import type {
  ArtifactReActContextSnapshotStoreOptions,
  ExecuteReActQuantumRequest,
  ExecuteReActQuantumResult,
  ReActContextSnapshot,
  ReActContextSnapshotPutResult,
  ReActContextSnapshotStore,
  ReActOperationReceiptReconciler,
  ReActQuantumExecutorOptions,
} from '@codesoul-co/hypha-harness';

// The complete export list is documented below.
```

### Usage patterns

- Use the 14 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactReActContextSnapshotStore` | class | <code>new ArtifactReActContextSnapshotStore(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Durable content-addressed Context snapshots selected by the checkpoint scope hash. |
| `ContinuationIdentityValidator` | class | <code>new ContinuationIdentityValidator(): ContinuationIdentityValidator</code> | Continuation Identity Validator class with 5 public constructor or member entries; its exact declarations are listed below. |
| `ReActQuantumExecutor` | class | <code>new ReActQuantumExecutor(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence. |
| `REACT_CONTEXT_SNAPSHOT_VERSION` | constant | <code>const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0"</code> | REACT CONTEXT SNAPSHOT VERSION constant exported by the `react-quantum-executor` module. |
| `createContinuationReActQuantumDescriptor` | function | <code>createContinuationReActQuantumDescriptor(command: Readonly&lt;SessionCommandRecord&gt;, input: unknown): ContinuationReActQuantumDescriptor</code> | Create Continuation ReAct Quantum Descriptor function with 1 public call signature; parameters and return types are listed below. |
| `ArtifactReActContextSnapshotStoreOptions` | interface | <code>interface ArtifactReActContextSnapshotStoreOptions</code> | Artifact ReAct Context Snapshot Store Options interface with 2 public fields or methods. |
| `ExecuteReActQuantumRequest` | interface | <code>interface ExecuteReActQuantumRequest</code> | Execute ReAct Quantum Request interface with 3 public fields or methods. |
| `ExecuteReActQuantumResult` | interface | <code>interface ExecuteReActQuantumResult</code> | Execute ReAct Quantum Result interface with 2 public fields or methods. |
| `ReActContextSnapshot` | interface | <code>interface ReActContextSnapshot</code> | ReAct Context Snapshot interface with 7 public fields or methods. |
| `ReActContextSnapshotPutResult` | interface | <code>interface ReActContextSnapshotPutResult</code> | ReAct Context Snapshot Put Result interface with 3 public fields or methods. |
| `ReActContextSnapshotStore` | interface | <code>interface ReActContextSnapshotStore</code> | ReAct Context Snapshot Store interface with 3 public fields or methods. |
| `ReActOperationReceiptReconciler` | interface | <code>interface ReActOperationReceiptReconciler</code> | ReAct Operation Receipt Reconciler interface with 1 public fields or methods. |
| `ReActQuantumExecutorOptions` | interface | <code>interface ReActQuantumExecutorOptions</code> | ReAct Quantum Executor Options interface with 10 public fields or methods. |
| `ReActQuantumOutcomeRecorder` | interface | <code>interface ReActQuantumOutcomeRecorder</code> | ReAct Quantum Outcome Recorder interface with 1 public fields or methods. |
| `ReActQuantumRevisionValidator` | interface | <code>interface ReActQuantumRevisionValidator</code> | ReAct Quantum Revision Validator interface with 1 public fields or methods. |
| `ReActQuantumRunnerFactory` | interface | <code>interface ReActQuantumRunnerFactory</code> | ReAct Quantum Runner Factory interface with 1 public fields or methods. |
| `ReActQuantumRuntimeReader` | interface | <code>interface ReActQuantumRuntimeReader</code> | ReAct Quantum Runtime Reader interface with 1 public fields or methods. |
| `ReActQuantumRuntimeState` | interface | <code>interface ReActQuantumRuntimeState</code> | ReAct Quantum Runtime State interface with 10 public fields or methods. |
| `ReActQuantumRuntimeStatus` | type | <code>type ReActQuantumRuntimeStatus = 'created' &#124; 'running' &#124; 'waiting_human' &#124; 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for ReAct Quantum Runtime Status; the declaration contains its complete type expression. |

## `ArtifactReActContextSnapshotStore`

Durable content-addressed Context snapshots selected by the checkpoint scope hash.

- Kind: class
- Import: `import { ArtifactReActContextSnapshotStore } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export declare class ArtifactReActContextSnapshotStore implements ReActContextSnapshotStore {
    constructor(options: ArtifactReActContextSnapshotStoreOptions);
    put(input: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult>;
    get(scopeHash: string): Promise<ReActContextSnapshot | null>;
    delete(scopeHash: string): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContinuationIdentityValidator`

Continuation Identity Validator class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ContinuationIdentityValidator } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export declare class ContinuationIdentityValidator {
    validateCommand(command: Readonly<SessionCommandRecord>, descriptor: Readonly<ContinuationReActQuantumDescriptor>): void;
    validateCheckpoint(descriptor: Readonly<ContinuationReActQuantumDescriptor>, checkpoint: Readonly<ReActContinuationCheckpoint>, checkpointRef: string): void;
    validateSnapshot(descriptor: Readonly<ReActQuantumDescriptor>, snapshot: Readonly<ReActContextSnapshot>): void;
    validateRuntimeState(descriptor: Readonly<ReActQuantumDescriptor>, state: Readonly<ReActQuantumRuntimeState>): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ContinuationIdentityValidator</code> | Creates an instance of this class. |
| `validateCheckpoint` | method | <code>validateCheckpoint(descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;, checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;, checkpointRef: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `validateCommand` | method | <code>validateCommand(command: Readonly&lt;SessionCommandRecord&gt;, descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;): void</code> | Public method; parameters and return type are shown in the signature. |
| `validateRuntimeState` | method | <code>validateRuntimeState(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): void</code> | Public method; parameters and return type are shown in the signature. |
| `validateSnapshot` | method | <code>validateSnapshot(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, snapshot: Readonly&lt;ReActContextSnapshot&gt;): void</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumExecutor`

Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence.

- Kind: class
- Import: `import { ReActQuantumExecutor } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export declare class ReActQuantumExecutor {
    constructor(options: ReActQuantumExecutorOptions);
    runOneQuantum(input: ExecuteReActQuantumRequest): Promise<ExecuteReActQuantumResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Creates an instance of this class. |
| `runOneQuantum` | method | <code>runOneQuantum(input: ExecuteReActQuantumRequest): Promise&lt;ExecuteReActQuantumResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `REACT_CONTEXT_SNAPSHOT_VERSION`

REACT CONTEXT SNAPSHOT VERSION constant exported by the `react-quantum-executor` module.

- Kind: constant
- Import: `import { REACT_CONTEXT_SNAPSHOT_VERSION } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export declare const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0";
```

## `createContinuationReActQuantumDescriptor`

Create Continuation ReAct Quantum Descriptor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createContinuationReActQuantumDescriptor } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export declare function createContinuationReActQuantumDescriptor(command: Readonly<SessionCommandRecord>, input: unknown): ContinuationReActQuantumDescriptor;
```

### Call signature

```text
createContinuationReActQuantumDescriptor(command: Readonly<SessionCommandRecord>, input: unknown): ContinuationReActQuantumDescriptor
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | <code>Readonly&lt;SessionCommandRecord&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContinuationReActQuantumDescriptor`
- Description: The return contract is defined by the type shown above.

## `ArtifactReActContextSnapshotStoreOptions`

Artifact ReAct Context Snapshot Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactReActContextSnapshotStoreOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ArtifactReActContextSnapshotStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxSnapshotBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSnapshotBytes` | property | <code>maxSnapshotBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecuteReActQuantumRequest`

Execute ReAct Quantum Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecuteReActQuantumRequest } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ExecuteReActQuantumRequest {
    command?: Readonly<SessionCommandRecord>;
    descriptor: ReActQuantumDescriptor;
    signal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command?: Readonly&lt;SessionCommandRecord&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `descriptor` | property | <code>descriptor: ReActQuantumDescriptor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecuteReActQuantumResult`

Execute ReAct Quantum Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ExecuteReActQuantumResult } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ExecuteReActQuantumResult {
    disposition: 'completed' | 'suspended' | 'waiting_human' | 'cancelled' | 'failed' | 'terminal';
    react?: ReActRunResult;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "waiting_human" &#124; "terminal"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `react` | property | <code>react?: ReActRunResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContextSnapshot`

ReAct Context Snapshot interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ReActContextSnapshot } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActContextSnapshot {
    version: typeof REACT_CONTEXT_SNAPSHOT_VERSION;
    runId: string;
    stepId: string;
    scopeHash: string;
    agentRef: SpecRef;
    context: ReActRunContext;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: ReActRunContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContextSnapshotPutResult`

ReAct Context Snapshot Put Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReActContextSnapshotPutResult } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActContextSnapshotPutResult {
    snapshot: ReActContextSnapshot;
    snapshotHash: string;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: ReActContextSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContextSnapshotStore`

ReAct Context Snapshot Store interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReActContextSnapshotStore } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActContextSnapshotStore {
    put(snapshot: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult>;
    get(scopeHash: string): Promise<ReActContextSnapshot | null>;
    delete(scopeHash: string): Promise<boolean>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(snapshot: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActOperationReceiptReconciler`

ReAct Operation Receipt Reconciler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActOperationReceiptReconciler } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActOperationReceiptReconciler {
    reconcile(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        receiptRefs: readonly string[];
        signal: AbortSignal;
    }): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reconcile` | method | <code>reconcile(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; receiptRefs: readonly string[]; signal: AbortSignal; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumExecutorOptions`

ReAct Quantum Executor Options interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumExecutorOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumExecutorOptions {
    checkpoints: ReActContinuationCheckpointStore;
    contextSnapshots: ReActContextSnapshotStore;
    runtime: ReActQuantumRuntimeReader;
    runnerFactory: ReActQuantumRunnerFactory;
    outcomeRecorder: ReActQuantumOutcomeRecorder;
    revisionValidator?: ReActQuantumRevisionValidator;
    receiptReconciler?: ReActOperationReceiptReconciler;
    checkpointReferenceFor?: (checkpoint: Readonly<ReActContinuationCheckpoint>) => string;
    quantumIterations: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointReferenceFor` | method | <code>checkpointReferenceFor?(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): string</code> | Public method; parameters and return type are shown in the signature. |
| `checkpoints` | property | <code>checkpoints: ReActContinuationCheckpointStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSnapshots` | property | <code>contextSnapshots: ReActContextSnapshotStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `outcomeRecorder` | property | <code>outcomeRecorder: ReActQuantumOutcomeRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quantumIterations` | property | <code>quantumIterations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptReconciler` | property | <code>receiptReconciler?: ReActOperationReceiptReconciler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revisionValidator` | property | <code>revisionValidator?: ReActQuantumRevisionValidator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runnerFactory` | property | <code>runnerFactory: ReActQuantumRunnerFactory</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtime` | property | <code>runtime: ReActQuantumRuntimeReader</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActQuantumOutcomeRecorder`

ReAct Quantum Outcome Recorder interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumOutcomeRecorder } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumOutcomeRecorder {
    record(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        state: Readonly<ReActQuantumRuntimeState>;
        react: Readonly<ReActRunResult>;
        disposition: Exclude<ExecuteReActQuantumResult['disposition'], 'terminal'>;
        signal: AbortSignal;
    }): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; react: Readonly&lt;ReActRunResult&gt;; disposition: Exclude&lt;ExecuteReActQuantumResult["disposition"], "terminal"&gt;; signal: AbortSignal; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumRevisionValidator`

ReAct Quantum Revision Validator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumRevisionValidator } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumRevisionValidator {
    validate(descriptor: Readonly<ReActQuantumDescriptor>, state: Readonly<ReActQuantumRuntimeState>): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `validate` | method | <code>validate(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumRunnerFactory`

ReAct Quantum Runner Factory interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumRunnerFactory } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumRunnerFactory {
    create(input: {
        descriptor: Readonly<ReActQuantumDescriptor>;
        state: Readonly<ReActQuantumRuntimeState>;
        snapshot: Readonly<ReActContextSnapshot>;
        signal: AbortSignal;
    }): Promise<Pick<ReActRunner, 'run'>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; snapshot: Readonly&lt;ReActContextSnapshot&gt;; signal: AbortSignal; }): Promise&lt;Pick&lt;ReActRunner, "run"&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumRuntimeReader`

ReAct Quantum Runtime Reader interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumRuntimeReader } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumRuntimeReader {
    replay(descriptor: Readonly<ReActQuantumDescriptor>): Promise<ReActQuantumRuntimeState>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `replay` | method | <code>replay(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;): Promise&lt;ReActQuantumRuntimeState&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActQuantumRuntimeState`

ReAct Quantum Runtime State interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumRuntimeState } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export interface ReActQuantumRuntimeState {
    runId: string;
    sessionId: string;
    userId: string;
    status: ReActQuantumRuntimeStatus;
    cancellationRevision: number;
    agentRef: SpecRef;
    domainPackRef: SpecRef;
    workflowRef?: SpecRef;
    promptSnapshotHash: string;
    capabilitySnapshotHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: ReActQuantumRuntimeStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActQuantumRuntimeStatus`

Public type alias for ReAct Quantum Runtime Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReActQuantumRuntimeStatus } from '@codesoul-co/hypha-harness';`
- Source module: [`react-quantum-executor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)

### Declaration

```text
export type ReActQuantumRuntimeStatus = 'created' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
```
