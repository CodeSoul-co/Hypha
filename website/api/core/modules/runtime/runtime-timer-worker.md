# `@codesoul-co/hypha-core` / `modules/runtime/runtime-timer-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-timer-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)
- Exports: **2**

## Using this module

Use the Runtime timer worker module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  DurableRuntimeTimerWorker,
} from '@codesoul-co/hypha-core';

import type {
  DurableRuntimeTimerWorkerOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableRuntimeTimerWorker` | class | <code>new DurableRuntimeTimerWorker(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Durable Runtime Timer Worker class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DurableRuntimeTimerWorkerOptions` | interface | <code>interface DurableRuntimeTimerWorkerOptions</code> | Durable Runtime Timer Worker Options interface with 11 public fields or methods. |

## `DurableRuntimeTimerWorker`

Durable Runtime Timer Worker class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DurableRuntimeTimerWorker } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-timer-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)

### Declaration

```text
export declare class DurableRuntimeTimerWorker {
    constructor(options: DurableRuntimeTimerWorkerOptions);
    sweep(input: RuntimeTimerSweepRequest): Promise<RuntimeTimerSweepResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Creates an instance of this class. |
| `sweep` | method | <code>sweep(input: RuntimeTimerSweepRequest): Promise&lt;RuntimeTimerSweepResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableRuntimeTimerWorkerOptions`

Durable Runtime Timer Worker Options interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { DurableRuntimeTimerWorkerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-timer-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)

### Declaration

```text
export interface DurableRuntimeTimerWorkerOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    renewalIntervalMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, runId: string) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `monotonicNow` | method | <code>monotonicNow?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure?(error: unknown, runId: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `operationalTelemetry` | property | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `wait` | method | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
