# `@codesoul-co/hypha-tools` / `execution-adapter`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/execution-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)
- Exports: **18**

## Using this module

Use the Execution adapter module for binding external or local providers to Hypha ports. It exports 2 classes, 1 constant, 3 functions, 10 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  ExecutionToolAdapter,
  ExecutionToolTerminalError,
  EXECUTION_TOOL_TERMINAL_STATES,
  hashExecutionToolInput,
  normalizeExecutionToolInput,
  validateExecutionToolRuntimeRequest,
} from '@codesoul-co/hypha-tools';

import type {
  ExecutionToolAdapterOptions,
  ExecutionToolDispatchFactoryRequest,
  ExecutionToolDispatchPlan,
  ExecutionToolEvidence,
  ExecutionToolObservation,
  ExecutionToolProvenance,
  ExecutionToolRuntimePort,
  ExecutionToolRuntimeRequest,
} from '@codesoul-co/hypha-tools';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionToolAdapter` | class | <code>new ExecutionToolAdapter&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Execution Tool Adapter class with 8 public constructor or member entries; its exact declarations are listed below. |
| `ExecutionToolTerminalError` | class | <code>new ExecutionToolTerminalError(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Execution Tool Terminal Error class with 13 public constructor or member entries; its exact declarations are listed below. |
| `EXECUTION_TOOL_TERMINAL_STATES` | constant | <code>const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"]</code> | EXECUTION TOOL TERMINAL STATES constant exported by the `execution-adapter` module. |
| `hashExecutionToolInput` | function | <code>hashExecutionToolInput(input: unknown): string</code> | Hash Execution Tool Input function with 1 public call signature; parameters and return types are listed below. |
| `normalizeExecutionToolInput` | function | <code>normalizeExecutionToolInput&lt;TInput&gt;(input: TInput): TInput</code> | Normalize Execution Tool Input function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionToolRuntimeRequest` | function | <code>validateExecutionToolRuntimeRequest&lt;TInput&gt;(input: ExecutionToolRuntimeRequest&lt;TInput&gt;): ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider. |
| `ExecutionToolAdapterOptions` | interface | <code>interface ExecutionToolAdapterOptions</code> | Execution Tool Adapter Options interface with 6 public fields or methods. |
| `ExecutionToolDispatchFactoryRequest` | interface | <code>interface ExecutionToolDispatchFactoryRequest extends AdapterExecutionRequest&lt;TInput&gt;</code> | Execution Tool Dispatch Factory Request interface with 6 public fields or methods. |
| `ExecutionToolDispatchPlan` | interface | <code>interface ExecutionToolDispatchPlan</code> | Execution Tool Dispatch Plan interface with 3 public fields or methods. |
| `ExecutionToolEvidence` | interface | <code>interface ExecutionToolEvidence</code> | Execution Tool Evidence interface with 4 public fields or methods. |
| `ExecutionToolObservation` | interface | <code>interface ExecutionToolObservation extends ExecutionToolRuntimeResult</code> | Execution Tool Observation interface with 14 public fields or methods. |
| `ExecutionToolProvenance` | interface | <code>interface ExecutionToolProvenance</code> | Execution Tool Provenance interface with 7 public fields or methods. |
| `ExecutionToolRuntimePort` | interface | <code>interface ExecutionToolRuntimePort</code> | Execution Tool Runtime Port interface with 3 public fields or methods. |
| `ExecutionToolRuntimeRequest` | interface | <code>interface ExecutionToolRuntimeRequest</code> | Execution Tool Runtime Request interface with 4 public fields or methods. |
| `ExecutionToolRuntimeResult` | interface | <code>interface ExecutionToolRuntimeResult</code> | Execution Tool Runtime Result interface with 13 public fields or methods. |
| `ExecutionToolRuntimeScope` | interface | <code>interface ExecutionToolRuntimeScope</code> | Execution Tool Runtime Scope interface with 6 public fields or methods. |
| `ExecutionToolDispatchFactory` | type | <code>type ExecutionToolDispatchFactory = (request: ExecutionToolDispatchFactoryRequest&lt;TInput&gt;) =&gt; Promise&lt;ExecutionToolDispatchPlan&gt; &#124; ExecutionToolDispatchPlan</code> | Public type alias for Execution Tool Dispatch Factory; the declaration contains its complete type expression. |
| `ExecutionToolTerminalState` | type | <code>type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number]</code> | Public type alias for Execution Tool Terminal State; the declaration contains its complete type expression. |

## `ExecutionToolAdapter`

Execution Tool Adapter class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ExecutionToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare class ExecutionToolAdapter<TInput = unknown> implements ToolAdapter<TInput, ExecutionToolObservation> {
    readonly id: string;
    readonly source: ToolSource;
    constructor(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory<TInput>, options: ExecutionToolAdapterOptions);
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<ExecutionToolObservation>>;
    cancel(request: AdapterCancellationRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>&lt;TInput = unknown&gt;(id: string, port: ExecutionToolRuntimePort, createDispatch: ExecutionToolDispatchFactory&lt;TInput&gt;, options: ExecutionToolAdapterOptions): ExecutionToolAdapter&lt;TInput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;ExecutionToolObservation&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolTerminalError`

Execution Tool Terminal Error class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ExecutionToolTerminalError } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare class ExecutionToolTerminalError extends FrameworkError {
    readonly terminalState: Exclude<ExecutionToolTerminalState, 'completed'>;
    readonly executionError: NormalizedExecutionError;
    readonly observation: ExecutionToolObservation;
    constructor(observation: ExecutionToolObservation);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>readonly cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(observation: ExecutionToolObservation): ExecutionToolTerminalError</code> | Creates an instance of this class. |
| `context` | property | <code>readonly context?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionError` | property | <code>readonly executionError: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observation` | property | <code>readonly observation: ExecutionToolObservation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `terminalState` | property | <code>readonly terminalState: "unknown" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EXECUTION_TOOL_TERMINAL_STATES`

EXECUTION TOOL TERMINAL STATES constant exported by the `execution-adapter` module.

- Kind: constant
- Import: `import { EXECUTION_TOOL_TERMINAL_STATES } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare const EXECUTION_TOOL_TERMINAL_STATES: readonly ["completed", "failed", "timed_out", "cancelled", "unknown", "quarantined"];
```

## `hashExecutionToolInput`

Hash Execution Tool Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashExecutionToolInput } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare function hashExecutionToolInput(input: unknown): string;
```

### Call signature

```text
hashExecutionToolInput(input: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `normalizeExecutionToolInput`

Normalize Execution Tool Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeExecutionToolInput } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare function normalizeExecutionToolInput<TInput>(input: TInput): TInput;
```

### Call signature

```text
normalizeExecutionToolInput<TInput>(input: TInput): TInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>TInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TInput`
- Description: The return contract is defined by the type shown above.

## `validateExecutionToolRuntimeRequest`

Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider.

- Kind: function
- Import: `import { validateExecutionToolRuntimeRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export declare function validateExecutionToolRuntimeRequest<TInput>(input: ExecutionToolRuntimeRequest<TInput>): ExecutionToolRuntimeRequest<TInput>;
```

### Call signature

```text
validateExecutionToolRuntimeRequest<TInput>(input: ExecutionToolRuntimeRequest<TInput>): ExecutionToolRuntimeRequest<TInput>
```

Recomputes the normalized input digest at the Execution boundary. Runtime-port implementations must call this validator before delegating to a provider.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ExecutionToolRuntimeRequest&lt;TInput&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionToolRuntimeRequest<TInput>`
- Description: The return contract is defined by the type shown above.

## `ExecutionToolAdapterOptions`

Execution Tool Adapter Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolAdapterOptions } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolAdapterOptions {
    toolRevision: string;
    binding: ExecutionToolBinding;
    providerId: string;
    healthTimeoutMs?: number;
    maxEvidenceBytes?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthTimeoutMs` | property | <code>healthTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEvidenceBytes` | property | <code>maxEvidenceBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolDispatchFactoryRequest`

Execution Tool Dispatch Factory Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolDispatchFactoryRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolDispatchFactoryRequest<TInput> extends AdapterExecutionRequest<TInput> {
    normalizedInput: TInput;
    inputHash: string;
    signal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedInput` | property | <code>normalizedInput: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolDispatchPlan`

Execution Tool Dispatch Plan interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolDispatchPlan } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolDispatchPlan {
    dispatch: ExecutionDispatchRequest;
    expectedRevision: number;
    approvalExpiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalExpiresAt` | property | <code>approvalExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dispatch` | property | <code>dispatch: ExecutionDispatchRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolEvidence`

Execution Tool Evidence interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolEvidence } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolEvidence {
    kind: 'authorization' | 'event' | 'receipt' | 'artifact' | 'snapshot' | 'trace';
    ref: string;
    hash?: string;
    recordedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hash` | property | <code>hash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "artifact" &#124; "event" &#124; "snapshot" &#124; "authorization" &#124; "trace" &#124; "receipt"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordedAt` | property | <code>recordedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolObservation`

Execution Tool Observation interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolObservation } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolObservation extends ExecutionToolRuntimeResult {
    evidenceHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityResult` | property | <code>activityResult: ExecutionActivityResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence: ExecutionToolEvidence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ExecutionToolProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionToolRuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalState` | property | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolOperation` | property | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolProvenance`

Execution Tool Provenance interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolProvenance } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolProvenance {
    providerId: string;
    authorizationEvidenceId: string;
    authorizationVerificationRef: string;
    terminalEventId: string;
    receivedAt: string;
    resultHash: string;
    receiptRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorizationEvidenceId` | property | <code>authorizationEvidenceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorizationVerificationRef` | property | <code>authorizationVerificationRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptRef` | property | <code>receiptRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultHash` | property | <code>resultHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalEventId` | property | <code>terminalEventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolRuntimePort`

Execution Tool Runtime Port interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolRuntimePort } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolRuntimePort {
    execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise<unknown>;
    health(signal: AbortSignal): Promise<unknown>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal: AbortSignal): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionToolRuntimeRequest`

Execution Tool Runtime Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolRuntimeRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolRuntimeRequest<TInput = unknown> {
    dispatch: ExecutionDispatchRequest;
    normalizedInput: TInput;
    inputHash: string;
    expectedRevision: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | property | <code>dispatch: ExecutionDispatchRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedInput` | property | <code>normalizedInput: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolRuntimeResult`

Execution Tool Runtime Result interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolRuntimeResult } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolRuntimeResult {
    activityResult: ExecutionActivityResult;
    scope: ExecutionToolRuntimeScope;
    toolId: string;
    toolRevision: string;
    contractSnapshotRef: string;
    toolOperation: ExecutionDispatchRequest['binding']['operation'];
    operationId: string;
    inputHash: string;
    revision: number;
    fencingToken: number;
    terminalState: ExecutionToolTerminalState;
    provenance: ExecutionToolProvenance;
    evidence: ExecutionToolEvidence[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityResult` | property | <code>activityResult: ExecutionActivityResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence: ExecutionToolEvidence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ExecutionToolProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionToolRuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalState` | property | <code>terminalState: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "quarantined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolOperation` | property | <code>toolOperation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolRuntimeScope`

Execution Tool Runtime Scope interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionToolRuntimeScope } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export interface ExecutionToolRuntimeScope {
    principalId: string;
    userId?: string;
    tenantId?: string;
    sessionId?: string;
    runId: string;
    workspaceId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionToolDispatchFactory`

Public type alias for Execution Tool Dispatch Factory; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionToolDispatchFactory } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export type ExecutionToolDispatchFactory<TInput = unknown> = (request: ExecutionToolDispatchFactoryRequest<TInput>) => Promise<ExecutionToolDispatchPlan> | ExecutionToolDispatchPlan;
```

## `ExecutionToolTerminalState`

Public type alias for Execution Tool Terminal State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionToolTerminalState } from '@codesoul-co/hypha-tools';`
- Source module: [`execution-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts)

### Declaration

```text
export type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number];
```
