# `@codesoul-co/hypha-core` / `modules/runtime/session-command-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/session-command-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)
- Exports: **7**

## Using this module

Use the Session command worker module for executing runtime behavior at this boundary. It exports 1 class, 3 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  DurableSessionCommandWorker,
} from '@codesoul-co/hypha-core';

import type {
  DurableSessionCommandWorkerOptions,
  SessionCommandHandlerContext,
  SessionCommandWorkerResult,
  SessionCommandHandler,
  SessionCommandHandlerResult,
  SessionCommandWorkerDisposition,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableSessionCommandWorker` | class | <code>new DurableSessionCommandWorker(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes. |
| `DurableSessionCommandWorkerOptions` | interface | <code>interface DurableSessionCommandWorkerOptions</code> | Durable Session Command Worker Options interface with 11 public fields or methods. |
| `SessionCommandHandlerContext` | interface | <code>interface SessionCommandHandlerContext</code> | Session Command Handler Context interface with 4 public fields or methods. |
| `SessionCommandWorkerResult` | interface | <code>interface SessionCommandWorkerResult</code> | Session Command Worker Result interface with 5 public fields or methods. |
| `SessionCommandHandler` | type | <code>type SessionCommandHandler = (context: Readonly&lt;SessionCommandHandlerContext&gt;) =&gt; Promise&lt;SessionCommandHandlerResult&gt;</code> | Public type alias for Session Command Handler; the declaration contains its complete type expression. |
| `SessionCommandHandlerResult` | type | <code>type SessionCommandHandlerResult = { disposition: 'applied'; resultRunId?: string; resultEventIds?: string[]; } &#124; { disposition: 'retry'; availableAt?: string; } &#124; { disposition: 'failed'; rejectionCode: string; deadLetter?: boolean; }</code> | Public type alias for Session Command Handler Result; the declaration contains its complete type expression. |
| `SessionCommandWorkerDisposition` | type | <code>type SessionCommandWorkerDisposition = 'idle' &#124; 'applied' &#124; 'retry_scheduled' &#124; 'failed' &#124; 'dead_lettered' &#124; 'lease_lost' &#124; 'aborted'</code> | Public type alias for Session Command Worker Disposition; the declaration contains its complete type expression. |

## `DurableSessionCommandWorker`

Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes.

- Kind: class
- Import: `import { DurableSessionCommandWorker } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export declare class DurableSessionCommandWorker {
    constructor(options: DurableSessionCommandWorkerOptions);
    processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise<SessionCommandWorkerResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Creates an instance of this class. |
| `processNext` | method | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableSessionCommandWorkerOptions`

Durable Session Command Worker Options interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { DurableSessionCommandWorkerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export interface DurableSessionCommandWorkerOptions {
    queue: SessionQueue;
    workerId: string;
    leaseMs: number;
    handlers: Partial<Record<SessionCommandType, SessionCommandHandler>>;
    now?: () => string;
    renewalIntervalMs?: number;
    maxHandlerDurationMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, claim: Readonly<SessionCommandClaim>) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handlers` | property | <code>handlers: Partial&lt;Record&lt;"user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session", SessionCommandHandler&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxHandlerDurationMs` | property | <code>maxHandlerDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `monotonicNow` | method | <code>monotonicNow?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure?(error: unknown, claim: Readonly&lt;SessionCommandClaim&gt;): void</code> | Public method; parameters and return type are shown in the signature. |
| `operationalTelemetry` | property | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queue` | property | <code>queue: SessionQueue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `wait` | method | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandHandlerContext`

Session Command Handler Context interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandHandlerContext } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export interface SessionCommandHandlerContext {
    command: Readonly<SessionCommandRecord>;
    signal: AbortSignal;
    claimToken: string;
    leaseEpoch: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandWorkerResult`

Session Command Worker Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandWorkerResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export interface SessionCommandWorkerResult {
    disposition: SessionCommandWorkerDisposition;
    commandId?: string;
    commandType?: SessionCommandType;
    attempts?: number;
    rejectionCode?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandType` | property | <code>commandType?: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: SessionCommandWorkerDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectionCode` | property | <code>rejectionCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandHandler`

Public type alias for Session Command Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SessionCommandHandler } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export type SessionCommandHandler = (context: Readonly<SessionCommandHandlerContext>) => Promise<SessionCommandHandlerResult>;
```

## `SessionCommandHandlerResult`

Public type alias for Session Command Handler Result; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SessionCommandHandlerResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export type SessionCommandHandlerResult = {
    disposition: 'applied';
    resultRunId?: string;
    resultEventIds?: string[];
} | {
    disposition: 'retry';
    availableAt?: string;
} | {
    disposition: 'failed';
    rejectionCode: string;
    deadLetter?: boolean;
};
```

## `SessionCommandWorkerDisposition`

Public type alias for Session Command Worker Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SessionCommandWorkerDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)

### Declaration

```text
export type SessionCommandWorkerDisposition = 'idle' | 'applied' | 'retry_scheduled' | 'failed' | 'dead_lettered' | 'lease_lost' | 'aborted';
```
