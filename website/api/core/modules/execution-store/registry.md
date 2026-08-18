# `@codesoul-co/hypha-core` / `modules/execution-store/registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-store/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)
- Exports: **2**

## Using this module

Use the Registry module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  ExecutionStoreRegistry,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionStoreRegistration,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionStoreRegistry` | class | <code>new ExecutionStoreRegistry(): ExecutionStoreRegistry</code> | Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter. |
| `ExecutionStoreRegistration` | interface | <code>interface ExecutionStoreRegistration</code> | Execution Store Registration interface with 1 public fields or methods. |

## `ExecutionStoreRegistry`

Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter.

- Kind: class
- Import: `import { ExecutionStoreRegistry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)

### Declaration

```text
export declare class ExecutionStoreRegistry {
    register(factory: ExecutionStoreFactory): void;
    unregister(storeId: string): boolean;
    list(): ExecutionStoreRegistration[];
    resolve(storeId: string): ExecutionStoreFactory;
    create(storeId: string): Promise<ExecutionStore>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ExecutionStoreRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(storeId: string): Promise&lt;ExecutionStore&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): ExecutionStoreRegistration[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(factory: ExecutionStoreFactory): void</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(storeId: string): ExecutionStoreFactory</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(storeId: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionStoreRegistration`

Execution Store Registration interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionStoreRegistration } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)

### Declaration

```text
export interface ExecutionStoreRegistration {
    storeId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `storeId` | property | <code>storeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
