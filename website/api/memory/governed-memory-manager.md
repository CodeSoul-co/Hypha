# `@codesoul-co/hypha-memory` / `governed-memory-manager`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/governed-memory-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)
- Exports: **6**

## Using this module

Use the Governed memory manager module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  GovernedMemoryManager,
  governedMemoryProviderCapabilities,
  governedMemoryProviderHealth,
  registerMemoryManagementProviderHandlers,
} from '@codesoul-co/hypha-memory';

import type {
  GovernedMemoryManagerOptions,
  MemoryActivityRegistrar,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedMemoryManager` | class | <code>new GovernedMemoryManager(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort. |
| `governedMemoryProviderCapabilities` | function | <code>governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise&lt;MemoryManagementCapabilities&gt;</code> | Governed Memory Provider Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `governedMemoryProviderHealth` | function | <code>governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise&lt;ProviderHealth&gt;</code> | Governed Memory Provider Health function with 1 public call signature; parameters and return types are listed below. |
| `registerMemoryManagementProviderHandlers` | function | <code>registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar &#124; DefaultMemoryActivityPort, provider: MemoryManagementProvider): void</code> | Register Memory Management Provider Handlers function with 1 public call signature; parameters and return types are listed below. |
| `GovernedMemoryManagerOptions` | interface | <code>interface GovernedMemoryManagerOptions</code> | Governed Memory Manager Options interface with 8 public fields or methods. |
| `MemoryActivityRegistrar` | interface | <code>interface MemoryActivityRegistrar</code> | Memory Activity Registrar interface with 1 public fields or methods. |

## `GovernedMemoryManager`

Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort.

- Kind: class
- Import: `import { GovernedMemoryManager } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export declare class GovernedMemoryManager {
    constructor(options: GovernedMemoryManagerOptions);
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `governedMemoryProviderCapabilities`

Governed Memory Provider Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { governedMemoryProviderCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export declare function governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise<MemoryManagementCapabilities>;
```

### Call signature

```text
governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise<MemoryManagementCapabilities>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryManagementCapabilities>`
- Description: The return contract is defined by the type shown above.

## `governedMemoryProviderHealth`

Governed Memory Provider Health function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { governedMemoryProviderHealth } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export declare function governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise<ProviderHealth>;
```

### Call signature

```text
governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise<ProviderHealth>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<ProviderHealth>`
- Description: The return contract is defined by the type shown above.

## `registerMemoryManagementProviderHandlers`

Register Memory Management Provider Handlers function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerMemoryManagementProviderHandlers } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export declare function registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar | DefaultMemoryActivityPort, provider: MemoryManagementProvider): void;
```

### Call signature

```text
registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar | DefaultMemoryActivityPort, provider: MemoryManagementProvider): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `activities` | <code>MemoryActivityRegistrar &#124; DefaultMemoryActivityPort</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `provider` | <code>MemoryManagementProvider</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `GovernedMemoryManagerOptions`

Governed Memory Manager Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { GovernedMemoryManagerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export interface GovernedMemoryManagerOptions {
    activities: MemoryActivityPort;
    providerId: string;
    profileRef: MemoryContractSpecRef | ((request: GovernedMemoryRequest) => MemoryContractSpecRef);
    eventContext: MemoryEventContext | ((request: GovernedMemoryRequest) => MemoryEventContext);
    timeoutMs?: number;
    reconciliationStore?: MemoryLifecycleTaskStore;
    projectionInvalidation?: MemoryProjectionInvalidationPort;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: MemoryActivityPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventContext` | property | <code>eventContext: MemoryEventContext &#124; ((request: GovernedMemoryRequest) =&gt; MemoryEventContext)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef &#124; ((request: GovernedMemoryRequest) =&gt; MemoryContractSpecRef)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionInvalidation` | property | <code>projectionInvalidation?: MemoryProjectionInvalidationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliationStore` | property | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryActivityRegistrar`

Memory Activity Registrar interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityRegistrar } from '@codesoul-co/hypha-memory';`
- Source module: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### Declaration

```text
export interface MemoryActivityRegistrar {
    register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `register` | method | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown</code> | Public method; parameters and return type are shown in the signature. |
