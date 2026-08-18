# `@codesoul-co/hypha-core` / `modules/execution-store/registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-store/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/registry.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionStoreRegistry` | class | <code>new ExecutionStoreRegistry(): ExecutionStoreRegistry</code> | Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter. |
| `ExecutionStoreRegistration` | interface | <code>interface ExecutionStoreRegistration</code> | Field contract for Execution Store Registration; see all contract members below. |

## `ExecutionStoreRegistry` public members

Provider-neutral DI registry for durable Execution stores. Core selects a factory but never imports a concrete database adapter.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ExecutionStoreRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(storeId: string): Promise&lt;ExecutionStore&gt;</code> | Creates create at this module boundary. |
| `list` | method | <code>list(): ExecutionStoreRegistration[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(factory: ExecutionStoreFactory): void</code> | Registers register at this module boundary. |
| `resolve` | method | <code>resolve(storeId: string): ExecutionStoreFactory</code> | Resolves resolve at this module boundary. |
| `unregister` | method | <code>unregister(storeId: string): boolean</code> | Public runtime operation for unregister. |

## `ExecutionStoreRegistration` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `storeId` | property | <code>storeId: string</code> | Public store Id property. |
