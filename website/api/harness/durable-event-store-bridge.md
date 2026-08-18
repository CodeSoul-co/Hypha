# `@codesoul-co/hypha-harness` / `durable-event-store-bridge`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/durable-event-store-bridge.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)
- Exports: **3**

## Using this module

Use the Durable event store bridge module for creating, recording, or reading Event contracts. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  DurableEventStoreBridge,
} from '@codesoul-co/hypha-harness';

import type {
  DurableEventStoreBridgeCoordination,
  DurableEventStoreBridgeOptions,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableEventStoreBridge` | class | <code>new DurableEventStoreBridge(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime. |
| `DurableEventStoreBridgeCoordination` | interface | <code>interface DurableEventStoreBridgeCoordination</code> | Durable Event Store Bridge Coordination interface with 5 public fields or methods. |
| `DurableEventStoreBridgeOptions` | interface | <code>interface DurableEventStoreBridgeOptions</code> | Durable Event Store Bridge Options interface with 4 public fields or methods. |

## `DurableEventStoreBridge`

Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime.

- Kind: class
- Import: `import { DurableEventStoreBridge } from '@codesoul-co/hypha-harness';`
- Source module: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### Declaration

```text
export declare class DurableEventStoreBridge implements EventStore, TraceRecorder {
    constructor(options: DurableEventStoreBridgeOptions);
    append(event: FrameworkEvent): Promise<void>;
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableEventStoreBridgeCoordination`

Durable Event Store Bridge Coordination interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { DurableEventStoreBridgeCoordination } from '@codesoul-co/hypha-harness';`
- Source module: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### Declaration

```text
export interface DurableEventStoreBridgeCoordination {
    runLeases: RunLeaseStore;
    ownerId: string;
    leaseTtlMs: number;
    nextId(namespace: string): string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DurableEventStoreBridgeOptions`

Durable Event Store Bridge Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DurableEventStoreBridgeOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### Declaration

```text
export interface DurableEventStoreBridgeOptions {
    events: EventRuntime;
    coordination?: DurableEventStoreBridgeCoordination;
    maxAppendAttempts?: number;
    streamHeadPageSize?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `coordination` | property | <code>coordination?: DurableEventStoreBridgeCoordination</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAppendAttempts` | property | <code>maxAppendAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streamHeadPageSize` | property | <code>streamHeadPageSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
