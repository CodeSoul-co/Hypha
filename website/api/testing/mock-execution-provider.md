# `@codesoul-co/hypha-testing` / `mock-execution-provider`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Source: [`packages/testing/src/mock-execution-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)
- Exports: **4**

## Using this module

Use the Mock execution provider module for binding external or local providers to Hypha ports. It exports 2 classes, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  MockExecutionProvider,
  MockExecutionProviderError,
} from '@codesoul-co/hypha-testing';

import type {
  MockExecutionBehavior,
  MockExecutionProviderOptions,
} from '@codesoul-co/hypha-testing';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockExecutionProvider` | class | <code>new MockExecutionProvider(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace. |
| `MockExecutionProviderError` | class | <code>new MockExecutionProviderError(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Mock Execution Provider Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `MockExecutionBehavior` | interface | <code>interface MockExecutionBehavior</code> | Mock Execution Behavior interface with 17 public fields or methods. |
| `MockExecutionProviderOptions` | interface | <code>interface MockExecutionProviderOptions</code> | Mock Execution Provider Options interface with 8 public fields or methods. |

## `MockExecutionProvider`

Deterministic, in-memory SandboxProvider for contract tests, replay fixtures, and failure injection. It never starts a process or mutates a real Workspace.

- Kind: class
- Import: `import { MockExecutionProvider } from '@codesoul-co/hypha-testing';`
- Source module: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### Declaration

```text
export declare class MockExecutionProvider implements SandboxProvider {
    readonly id: string;
    constructor(options?: MockExecutionProviderOptions);
    enqueue(behavior: MockExecutionBehavior): void;
    setHealth(health: ProviderHealth): void;
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(input: SandboxCreateRequest): Promise<SandboxRecord>;
    start(input: SandboxStartRequest): Promise<SandboxRecord>;
    execute(input: CommandExecutionRequest): Promise<CommandExecutionResult>;
    cancel(input: ExecutionCancelRequest): Promise<void>;
    terminate(input: SandboxTerminateRequest): Promise<void>;
    status(input: SandboxStatusRequest): Promise<SandboxRecord | null>;
    cleanup(input: SandboxCleanupRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: MockExecutionProviderOptions): MockExecutionProvider</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(behavior: MockExecutionBehavior): void</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(input: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `setHealth` | method | <code>setHealth(health: ProviderHealth): void</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(input: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(input: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `terminate` | method | <code>terminate(input: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MockExecutionProviderError`

Mock Execution Provider Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockExecutionProviderError } from '@codesoul-co/hypha-testing';`
- Source module: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### Declaration

```text
export declare class MockExecutionProviderError extends Error {
    readonly normalizedError: NormalizedExecutionError;
    constructor(normalizedError: NormalizedExecutionError);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(normalizedError: NormalizedExecutionError): MockExecutionProviderError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedError` | property | <code>readonly normalizedError: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `MockExecutionBehavior`

Mock Execution Behavior interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { MockExecutionBehavior } from '@codesoul-co/hypha-testing';`
- Source module: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### Declaration

```text
export interface MockExecutionBehavior {
    delayMs?: number;
    status?: Extract<CommandExecutionStatus, 'completed' | 'failed' | 'timed_out' | 'oom_killed' | 'resource_exceeded' | 'quarantined'>;
    exitCode?: number | null;
    signal?: string;
    stdout?: string;
    stderr?: string;
    stdoutTruncated?: boolean;
    stderrTruncated?: boolean;
    stdoutArtifactRef?: string;
    stderrArtifactRef?: string;
    changedFiles?: FileMutation[];
    generatedArtifactRefs?: string[];
    snapshotBeforeRef?: string;
    snapshotAfterRef?: string;
    resourceUsage?: ExecutionResourceUsage;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles?: FileMutation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delayMs` | property | <code>delayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exitCode` | property | <code>exitCode?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generatedArtifactRefs` | property | <code>generatedArtifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotAfterRef` | property | <code>snapshotAfterRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotBeforeRef` | property | <code>snapshotBeforeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: "completed" &#124; "failed" &#124; "timed_out" &#124; "oom_killed" &#124; "resource_exceeded" &#124; "quarantined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderr` | property | <code>stderr?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderrArtifactRef` | property | <code>stderrArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stderrTruncated` | property | <code>stderrTruncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdout` | property | <code>stdout?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdoutArtifactRef` | property | <code>stdoutArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdoutTruncated` | property | <code>stdoutTruncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MockExecutionProviderOptions`

Mock Execution Provider Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MockExecutionProviderOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`mock-execution-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts)

### Declaration

```text
export interface MockExecutionProviderOptions {
    id?: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
    executionId?: (request: CommandExecutionRequest) => string;
    capabilities?: Partial<SandboxProviderCapabilities>;
    health?: ProviderHealth;
    behaviors?: MockExecutionBehavior[];
    defaultBehavior?: MockExecutionBehavior;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `behaviors` | property | <code>behaviors?: MockExecutionBehavior[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities?: Partial&lt;SandboxProviderCapabilities&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultBehavior` | property | <code>defaultBehavior?: MockExecutionBehavior</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | method | <code>executionId?(request: CommandExecutionRequest): string</code> | Public method; parameters and return type are shown in the signature. |
| `health` | property | <code>health?: ProviderHealth</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `sandboxId` | method | <code>sandboxId?(request: SandboxCreateRequest): string</code> | Public method; parameters and return type are shown in the signature. |
