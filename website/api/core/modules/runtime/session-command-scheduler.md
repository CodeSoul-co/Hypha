# `@codesoul-co/hypha-core` / `modules/runtime/session-command-scheduler`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/session-command-scheduler.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)
- Exports: **5**

## Using this module

Use the Session command scheduler module for executing runtime behavior at this boundary. It exports 1 class, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  DurableSessionCommandScheduler,
} from '@codesoul-co/hypha-core';

import type {
  DurableSessionCommandSchedulerOptions,
  RunSessionCommandSchedulerRequest,
  SessionCommandProcessor,
  SessionCommandSchedulerResult,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableSessionCommandScheduler` | class | <code>new DurableSessionCommandScheduler(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain. |
| `DurableSessionCommandSchedulerOptions` | interface | <code>interface DurableSessionCommandSchedulerOptions</code> | Durable Session Command Scheduler Options interface with 7 public fields or methods. |
| `RunSessionCommandSchedulerRequest` | interface | <code>interface RunSessionCommandSchedulerRequest</code> | Run Session Command Scheduler Request interface with 2 public fields or methods. |
| `SessionCommandProcessor` | interface | <code>interface SessionCommandProcessor</code> | Session Command Processor interface with 1 public fields or methods. |
| `SessionCommandSchedulerResult` | interface | <code>interface SessionCommandSchedulerResult</code> | Session Command Scheduler Result interface with 3 public fields or methods. |

## `DurableSessionCommandScheduler`

Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain.

- Kind: class
- Import: `import { DurableSessionCommandScheduler } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### Declaration

```text
export declare class DurableSessionCommandScheduler {
    constructor(options: DurableSessionCommandSchedulerOptions);
    run(request: RunSessionCommandSchedulerRequest): Promise<SessionCommandSchedulerResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Creates an instance of this class. |
| `run` | method | <code>run(request: RunSessionCommandSchedulerRequest): Promise&lt;SessionCommandSchedulerResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableSessionCommandSchedulerOptions`

Durable Session Command Scheduler Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { DurableSessionCommandSchedulerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### Declaration

```text
export interface DurableSessionCommandSchedulerOptions {
    worker: SessionCommandProcessor;
    pollIntervalMs?: number;
    errorBackoffMs?: number;
    shutdownDrainMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onResult?: (result: SessionCommandWorkerResult) => void;
    onError?: (error: unknown) => void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errorBackoffMs` | property | <code>errorBackoffMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onError` | method | <code>onError?(error: unknown): void</code> | Public method; parameters and return type are shown in the signature. |
| `onResult` | method | <code>onResult?(result: SessionCommandWorkerResult): void</code> | Public method; parameters and return type are shown in the signature. |
| `pollIntervalMs` | property | <code>pollIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shutdownDrainMs` | property | <code>shutdownDrainMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `wait` | method | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `worker` | property | <code>worker: SessionCommandProcessor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunSessionCommandSchedulerRequest`

Run Session Command Scheduler Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RunSessionCommandSchedulerRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### Declaration

```text
export interface RunSessionCommandSchedulerRequest {
    signal: AbortSignal;
    scope?: SessionQueueScope;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scope` | property | <code>scope?: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandProcessor`

Session Command Processor interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandProcessor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### Declaration

```text
export interface SessionCommandProcessor {
    processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise<SessionCommandWorkerResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `processNext` | method | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SessionCommandSchedulerResult`

Session Command Scheduler Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandSchedulerResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### Declaration

```text
export interface SessionCommandSchedulerResult {
    processed: number;
    idlePolls: number;
    errors: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errors` | property | <code>errors: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idlePolls` | property | <code>idlePolls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processed` | property | <code>processed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
