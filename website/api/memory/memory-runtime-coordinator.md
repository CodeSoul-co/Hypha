# `@codesoul-co/hypha-memory` / `memory-runtime-coordinator`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-runtime-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)
- Exports: **12**

## Using this module

Use the Memory runtime coordinator module for executing runtime behavior at this boundary. It exports 3 classes, 8 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InMemoryMemoryRuntimeControlStore,
  MemoryRuntimeCoordinator,
  StructuredMemoryRuntimeControlStore,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryRuntimeActiveState,
  MemoryRuntimeControlStore,
  MemoryRuntimeCoordinatorOptions,
  MemoryRuntimeCreator,
  MemoryRuntimeGeneration,
  MemoryRuntimeRevisionState,
  MemoryRuntimeSwitchResult,
  StructuredMemoryRuntimeControlStoreOptions,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryRuntimeControlStore` | class | <code>new InMemoryMemoryRuntimeControlStore(): InMemoryMemoryRuntimeControlStore</code> | In Memory Memory Runtime Control Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `MemoryRuntimeCoordinator` | class | <code>new MemoryRuntimeCoordinator(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Memory Runtime Coordinator class with 8 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryRuntimeControlStore` | class | <code>new StructuredMemoryRuntimeControlStore(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Structured Memory Runtime Control Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `MemoryRuntimeActiveState` | interface | <code>interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState</code> | Memory Runtime Active State interface with 14 public fields or methods. |
| `MemoryRuntimeControlStore` | interface | <code>interface MemoryRuntimeControlStore</code> | Memory Runtime Control Store interface with 6 public fields or methods. |
| `MemoryRuntimeCoordinatorOptions` | interface | <code>interface MemoryRuntimeCoordinatorOptions</code> | Memory Runtime Coordinator Options interface with 6 public fields or methods. |
| `MemoryRuntimeCreator` | interface | <code>interface MemoryRuntimeCreator</code> | Memory Runtime Creator interface with 1 public fields or methods. |
| `MemoryRuntimeGeneration` | interface | <code>interface MemoryRuntimeGeneration</code> | Memory Runtime Generation interface with 6 public fields or methods. |
| `MemoryRuntimeRevisionState` | interface | <code>interface MemoryRuntimeRevisionState</code> | Memory Runtime Revision State interface with 14 public fields or methods. |
| `MemoryRuntimeSwitchResult` | interface | <code>interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration</code> | Memory Runtime Switch Result interface with 7 public fields or methods. |
| `StructuredMemoryRuntimeControlStoreOptions` | interface | <code>interface StructuredMemoryRuntimeControlStoreOptions</code> | Structured Memory Runtime Control Store Options interface with 3 public fields or methods. |
| `MemoryRuntimeRevisionStatus` | type | <code>type MemoryRuntimeRevisionStatus = 'active' &#124; 'draining' &#124; 'retired' &#124; 'quarantined'</code> | Public type alias for Memory Runtime Revision Status; the declaration contains its complete type expression. |

## `InMemoryMemoryRuntimeControlStore`

In Memory Memory Runtime Control Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export declare class InMemoryMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
    readonly durability: "ephemeral";
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryMemoryRuntimeControlStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "ephemeral"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRuntimeCoordinator`

Memory Runtime Coordinator class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryRuntimeCoordinator } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export declare class MemoryRuntimeCoordinator {
    constructor(options: MemoryRuntimeCoordinatorOptions);
    initialize(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntimeSwitchResult>;
    switchRevision(input: unknown, references?: ReadonlyMap<string, unknown>, expectedProfileRevision?: string): Promise<MemoryRuntimeSwitchResult>;
    withRuntime<T>(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) => Promise<T>): Promise<T>;
    probeActive(): Promise<MemoryRuntimeRevisionState>;
    current(): MemoryRuntimeGeneration | null;
    drain(): Promise<void>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Creates an instance of this class. |
| `current` | method | <code>current(): MemoryRuntimeGeneration &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `initialize` | method | <code>initialize(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `probeActive` | method | <code>probeActive(): Promise&lt;MemoryRuntimeRevisionState&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `switchRevision` | method | <code>switchRevision(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;, expectedProfileRevision?: string): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `withRuntime` | method | <code>withRuntime&lt;T&gt;(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryRuntimeControlStore`

Structured Memory Runtime Control Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export declare class StructuredMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
    readonly durability: "durable";
    constructor(options: StructuredMemoryRuntimeControlStoreOptions);
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRuntimeActiveState`

Memory Runtime Active State interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeActiveState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState {
    id: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `coordinatorId` | property | <code>coordinatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generation` | property | <code>generation: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantineError` | property | <code>quarantineError?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: MemoryRuntimeRevisionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeControlStore`

Memory Runtime Control Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeControlStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeControlStore {
    readonly durability: 'ephemeral' | 'durable';
    getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
    activate(coordinatorId: string, expectedGeneration: number | null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise<boolean>;
    getRevision(coordinatorId: string, profileRevision: string): Promise<MemoryRuntimeRevisionState | null>;
    setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
    listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `durability` | property | <code>readonly durability: "ephemeral" &#124; "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRuntimeCoordinatorOptions`

Memory Runtime Coordinator Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeCoordinatorOptions {
    id: string;
    factory: MemoryRuntimeFactory | MemoryRuntimeCreator;
    store: MemoryRuntimeControlStore;
    requireDurableStore?: boolean;
    now?: () => Date;
    capabilityProbeIntervalMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityProbeIntervalMs` | property | <code>capabilityProbeIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `factory` | property | <code>factory: MemoryRuntimeFactory &#124; MemoryRuntimeCreator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `requireDurableStore` | property | <code>requireDurableStore?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: MemoryRuntimeControlStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeCreator`

Memory Runtime Creator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeCreator } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeCreator {
    create(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntime>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRuntimeGeneration`

Memory Runtime Generation interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeGeneration } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeGeneration {
    generation: number;
    profileId: string;
    profileRevision: string;
    providerId: string;
    providerRevision: string;
    runtimeId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generation` | property | <code>generation: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeRevisionState`

Memory Runtime Revision State interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeRevisionState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeRevisionState {
    id: string;
    coordinatorId: string;
    profileId: string;
    profileRevision: string;
    providerId: string;
    providerRevision: string;
    runtimeId: string;
    profileHash: string;
    capabilityHash: string;
    capabilitySnapshot: MemoryManagementCapabilities;
    status: MemoryRuntimeRevisionStatus;
    generation: number;
    observedAt: string;
    quarantineError?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `coordinatorId` | property | <code>coordinatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generation` | property | <code>generation: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantineError` | property | <code>quarantineError?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: MemoryRuntimeRevisionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeSwitchResult`

Memory Runtime Switch Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeSwitchResult } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration {
    previousProfileRevision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generation` | property | <code>generation: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousProfileRevision` | property | <code>previousProfileRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StructuredMemoryRuntimeControlStoreOptions`

Structured Memory Runtime Control Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryRuntimeControlStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export interface StructuredMemoryRuntimeControlStoreOptions {
    provider: StructuredStoreProvider;
    activeTable?: string;
    revisionTable?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeTable` | property | <code>activeTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revisionTable` | property | <code>revisionTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeRevisionStatus`

Public type alias for Memory Runtime Revision Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryRuntimeRevisionStatus } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)

### Declaration

```text
export type MemoryRuntimeRevisionStatus = 'active' | 'draining' | 'retired' | 'quarantined';
```
