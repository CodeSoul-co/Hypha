# `@codesoul-co/hypha-core` / `modules/runtime/projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)
- Exports: **7**

## Using this module

Use the Projection module for executing runtime behavior at this boundary. It exports 2 classes, 1 function, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryProjectionStore,
  ProjectionEngine,
  validateProjectionRecord,
} from '@codesoul-co/hypha-core';

import type {
  ProjectionDefinition,
  ProjectionEngineOptions,
  ProjectionRecord,
  ProjectionStore,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryProjectionStore` | class | <code>new InMemoryProjectionStore&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | In Memory Projection Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `ProjectionEngine` | class | <code>new ProjectionEngine(options: ProjectionEngineOptions): ProjectionEngine</code> | Projection Engine class with 3 public constructor or member entries; its exact declarations are listed below. |
| `validateProjectionRecord` | function | <code>validateProjectionRecord&lt;TState&gt;(record: ProjectionRecord&lt;TState&gt;): void</code> | Validate Projection Record function with 1 public call signature; parameters and return types are listed below. |
| `ProjectionDefinition` | interface | <code>interface ProjectionDefinition</code> | Projection Definition interface with 5 public fields or methods. |
| `ProjectionEngineOptions` | interface | <code>interface ProjectionEngineOptions</code> | Projection Engine Options interface with 2 public fields or methods. |
| `ProjectionRecord` | interface | <code>interface ProjectionRecord</code> | Projection Record interface with 7 public fields or methods. |
| `ProjectionStore` | interface | <code>interface ProjectionStore</code> | Projection Store interface with 3 public fields or methods. |

## `InMemoryProjectionStore`

In Memory Projection Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryProjectionStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export declare class InMemoryProjectionStore<TState = unknown> implements ProjectionStore<TState> {
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete(projectionId: string, key: string): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ProjectionEngine`

Projection Engine class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ProjectionEngine } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export declare class ProjectionEngine {
    constructor(options: ProjectionEngineOptions);
    update<TState>(definition: ProjectionDefinition<TState>, store: ProjectionStore<TState>, scope: EventStreamScope, key?: string): Promise<ProjectionRecord<TState>>;
    rebuild<TState>(definition: ProjectionDefinition<TState>, store: ProjectionStore<TState>, scope: EventStreamScope, key?: string): Promise<ProjectionRecord<TState>>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ProjectionEngineOptions): ProjectionEngine</code> | Creates an instance of this class. |
| `rebuild` | method | <code>rebuild&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `validateProjectionRecord`

Validate Projection Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateProjectionRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export declare function validateProjectionRecord<TState>(record: ProjectionRecord<TState>): void;
```

### Call signature

```text
validateProjectionRecord<TState>(record: ProjectionRecord<TState>): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | <code>ProjectionRecord&lt;TState&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `ProjectionDefinition`

Projection Definition interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProjectionDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export interface ProjectionDefinition<TState> {
    id: string;
    version: string;
    initialState(): TState;
    applies(event: PersistedFrameworkEvent): boolean;
    reduce(state: TState, event: PersistedFrameworkEvent): TState;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applies` | method | <code>applies(event: PersistedFrameworkEvent): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initialState` | method | <code>initialState(): TState</code> | Public method; parameters and return type are shown in the signature. |
| `reduce` | method | <code>reduce(state: TState, event: PersistedFrameworkEvent): TState</code> | Public method; parameters and return type are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProjectionEngineOptions`

Projection Engine Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ProjectionEngineOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export interface ProjectionEngineOptions {
    events: Pick<EventRuntime, 'read'>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |

## `ProjectionRecord`

Projection Record interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ProjectionRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export interface ProjectionRecord<TState = unknown> {
    projectionId: string;
    projectionVersion: string;
    key: string;
    state: TState;
    lastSequence: number;
    revision: number;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionId` | property | <code>projectionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: TState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProjectionStore`

Projection Store interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ProjectionStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)

### Declaration

```text
export interface ProjectionStore<TState = unknown> {
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete?(projectionId: string, key: string): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete?(projectionId: string, key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
