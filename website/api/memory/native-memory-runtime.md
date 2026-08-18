# `@codesoul-co/hypha-memory` / `native-memory-runtime`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/native-memory-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)
- Exports: **3**

## Using this module

Use the Native memory runtime module for executing runtime behavior at this boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  createNativeMemoryManagementProviderFactory,
} from '@codesoul-co/hypha-memory';

import type {
  NativeMemoryRuntimeDependencies,
  NativeMemoryRuntimeResources,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createNativeMemoryManagementProviderFactory` | function | <code>createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory</code> | Create Native Memory Management Provider Factory function with 1 public call signature; parameters and return types are listed below. |
| `NativeMemoryRuntimeDependencies` | interface | <code>interface NativeMemoryRuntimeDependencies</code> | Native Memory Runtime Dependencies interface with 15 public fields or methods. |
| `NativeMemoryRuntimeResources` | interface | <code>interface NativeMemoryRuntimeResources</code> | Native Memory Runtime Resources interface with 3 public fields or methods. |

## `createNativeMemoryManagementProviderFactory`

Create Native Memory Management Provider Factory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createNativeMemoryManagementProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### Declaration

```text
export declare function createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory;
```

### Call signature

```text
createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `dependencies` | <code>NativeMemoryRuntimeDependencies</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderFactory`
- Description: The return contract is defined by the type shown above.

## `NativeMemoryRuntimeDependencies`

Native Memory Runtime Dependencies interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { NativeMemoryRuntimeDependencies } from '@codesoul-co/hypha-memory';`
- Source module: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### Declaration

```text
export interface NativeMemoryRuntimeDependencies {
    structuredStore: StructuredStoreProvider;
    structuredStoreId: string;
    redisClient?: RedisLikeWorkingMemoryClient;
    embeddingProvider?: EmbeddingProvider;
    embeddingProviderId?: string;
    vectorStores: ManagedVectorStoreAdapter[];
    lifecycleHandlers?: Partial<Record<MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler>>;
    ownerId: string;
    workingMemoryNamespace?: string;
    workingMemoryTtlSeconds?: number;
    events?: MemoryEventPublisher;
    onIndexEvent?: (event: IndexOutboxWorkerEvent) => void | Promise<void>;
    onLifecycleEvent?: (event: MemoryLifecycleWorkerEvent) => void | Promise<void>;
    now?: () => Date;
    close?: () => Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `embeddingProvider` | property | <code>embeddingProvider?: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingProviderId` | property | <code>embeddingProviderId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events?: MemoryEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lifecycleHandlers` | property | <code>lifecycleHandlers?: Partial&lt;Record&lt;MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onIndexEvent` | method | <code>onIndexEvent?(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onLifecycleEvent` | method | <code>onLifecycleEvent?(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redisClient` | property | <code>redisClient?: RedisLikeWorkingMemoryClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structuredStore` | property | <code>structuredStore: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structuredStoreId` | property | <code>structuredStoreId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorStores` | property | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingMemoryNamespace` | property | <code>workingMemoryNamespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingMemoryTtlSeconds` | property | <code>workingMemoryTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NativeMemoryRuntimeResources`

Native Memory Runtime Resources interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { NativeMemoryRuntimeResources } from '@codesoul-co/hypha-memory';`
- Source module: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### Declaration

```text
export interface NativeMemoryRuntimeResources {
    workingStore: WorkingMemoryStore;
    lifecycleStore: StructuredMemoryLifecycleTaskStore;
    supervisor: MemoryWorkerSupervisor;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `lifecycleStore` | property | <code>lifecycleStore: StructuredMemoryLifecycleTaskStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supervisor` | property | <code>supervisor: MemoryWorkerSupervisor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingStore` | property | <code>workingStore: WorkingMemoryStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
