# `@codesoul-co/hypha-memory` / `provider-reconciliation`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-reconciliation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)
- Exports: **4**

## Using this module

Use the Provider reconciliation module for binding external or local providers to Hypha ports. It exports 2 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  createProviderReconciliationHandler,
  enqueueProviderDeleteReconciliation,
} from '@codesoul-co/hypha-memory';

import type {
  ProviderDeleteReconciliationPayload,
  ProviderReconciliationHandlerOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createProviderReconciliationHandler` | function | <code>createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler</code> | Create Provider Reconciliation Handler function with 1 public call signature; parameters and return types are listed below. |
| `enqueueProviderDeleteReconciliation` | function | <code>enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise&lt;MemoryLifecycleTask&lt;ProviderDeleteReconciliationPayload&gt;[]&gt;</code> | Enqueue Provider Delete Reconciliation function with 1 public call signature; parameters and return types are listed below. |
| `ProviderDeleteReconciliationPayload` | interface | <code>interface ProviderDeleteReconciliationPayload</code> | Provider Delete Reconciliation Payload interface with 3 public fields or methods. |
| `ProviderReconciliationHandlerOptions` | interface | <code>interface ProviderReconciliationHandlerOptions</code> | Provider Reconciliation Handler Options interface with 1 public fields or methods. |

## `createProviderReconciliationHandler`

Create Provider Reconciliation Handler function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createProviderReconciliationHandler } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### Declaration

```text
export declare function createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler;
```

### Call signature

```text
createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>ProviderReconciliationHandlerOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryLifecycleTaskHandler`
- Description: The return contract is defined by the type shown above.

## `enqueueProviderDeleteReconciliation`

Enqueue Provider Delete Reconciliation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { enqueueProviderDeleteReconciliation } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### Declaration

```text
export declare function enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>;
```

### Call signature

```text
enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>ManagedMemoryDeleteRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `result` | <code>ManagedMemoryDeleteResult</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `store` | <code>MemoryLifecycleTaskStore</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>`
- Description: The return contract is defined by the type shown above.

## `ProviderDeleteReconciliationPayload`

Provider Delete Reconciliation Payload interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ProviderDeleteReconciliationPayload } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### Declaration

```text
export interface ProviderDeleteReconciliationPayload {
    operation: 'delete';
    providerId: string;
    request: ManagedMemoryDeleteRequest;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operation` | property | <code>operation: "delete"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: ManagedMemoryDeleteRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderReconciliationHandlerOptions`

Provider Reconciliation Handler Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ProviderReconciliationHandlerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### Declaration

```text
export interface ProviderReconciliationHandlerOptions {
    resolveProvider(providerId: string): MemoryManagementProvider | undefined;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolveProvider` | method | <code>resolveProvider(providerId: string): MemoryManagementProvider &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
