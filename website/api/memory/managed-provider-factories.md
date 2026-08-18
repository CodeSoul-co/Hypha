# `@codesoul-co/hypha-memory` / `managed-provider-factories`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/managed-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)
- Exports: **5**

## Using this module

Use the Managed provider factories module for binding external or local providers to Hypha ports. It exports 2 constants, 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  MEM0_PLATFORM_FACTORY_ID,
  MEMORYBANK_MANAGED_FACTORY_ID,
  createMem0PlatformMemoryProviderFactory,
  createMemoryBankManagedProviderFactory,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedExternalProviderFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MEM0_PLATFORM_FACTORY_ID` | constant | <code>const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3"</code> | MEM0 PLATFORM FACTORY ID constant exported by the `managed-provider-factories` module. |
| `MEMORYBANK_MANAGED_FACTORY_ID` | constant | <code>const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed"</code> | MEMORYBANK MANAGED FACTORY ID constant exported by the `managed-provider-factories` module. |
| `createMem0PlatformMemoryProviderFactory` | function | <code>createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Mem0 Platform Memory Provider Factory function with 1 public call signature; parameters and return types are listed below. |
| `createMemoryBankManagedProviderFactory` | function | <code>createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Memory Bank Managed Provider Factory function with 1 public call signature; parameters and return types are listed below. |
| `ManagedExternalProviderFactoryOptions` | interface | <code>interface ManagedExternalProviderFactoryOptions</code> | Managed External Provider Factory Options interface with 1 public fields or methods. |

## `MEM0_PLATFORM_FACTORY_ID`

MEM0 PLATFORM FACTORY ID constant exported by the `managed-provider-factories` module.

- Kind: constant
- Import: `import { MEM0_PLATFORM_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### Declaration

```text
export declare const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3";
```

## `MEMORYBANK_MANAGED_FACTORY_ID`

MEMORYBANK MANAGED FACTORY ID constant exported by the `managed-provider-factories` module.

- Kind: constant
- Import: `import { MEMORYBANK_MANAGED_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### Declaration

```text
export declare const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed";
```

## `createMem0PlatformMemoryProviderFactory`

Create Mem0 Platform Memory Provider Factory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMem0PlatformMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### Declaration

```text
export declare function createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory;
```

### Call signature

```text
createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>ManagedExternalProviderFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderFactory`
- Description: The return contract is defined by the type shown above.

## `createMemoryBankManagedProviderFactory`

Create Memory Bank Managed Provider Factory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryBankManagedProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### Declaration

```text
export declare function createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory;
```

### Call signature

```text
createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>ManagedExternalProviderFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderFactory`
- Description: The return contract is defined by the type shown above.

## `ManagedExternalProviderFactoryOptions`

Managed External Provider Factory Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ManagedExternalProviderFactoryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### Declaration

```text
export interface ManagedExternalProviderFactoryOptions {
    fetch?: Mem0HttpFetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
