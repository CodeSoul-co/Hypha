# `@codesoul-co/hypha-memory` / `hindsight-local-factory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/hindsight-local-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)
- Exports: **5**

## Using this module

Use the Hindsight local factory module for using the public contracts and operations for this capability boundary. It exports 1 constant, 2 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  HINDSIGHT_LOCAL_FACTORY_ID,
  createHindsightLocalMemoryProviderFactory,
  registerHindsightLocalMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  HindsightLocalConnection,
  HindsightLocalFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HINDSIGHT_LOCAL_FACTORY_ID` | constant | <code>const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local"</code> | HINDSIGHT LOCAL FACTORY ID constant exported by the `hindsight-local-factory` module. |
| `createHindsightLocalMemoryProviderFactory` | function | <code>createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory</code> | Create Hindsight Local Memory Provider Factory function with 1 public call signature; parameters and return types are listed below. |
| `registerHindsightLocalMemoryProvider` | function | <code>registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry</code> | Register Hindsight Local Memory Provider function with 1 public call signature; parameters and return types are listed below. |
| `HindsightLocalConnection` | interface | <code>interface HindsightLocalConnection</code> | Hindsight Local Connection interface with 3 public fields or methods. |
| `HindsightLocalFactoryOptions` | interface | <code>interface HindsightLocalFactoryOptions</code> | Hindsight Local Factory Options interface with 2 public fields or methods. |

## `HINDSIGHT_LOCAL_FACTORY_ID`

HINDSIGHT LOCAL FACTORY ID constant exported by the `hindsight-local-factory` module.

- Kind: constant
- Import: `import { HINDSIGHT_LOCAL_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### Declaration

```text
export declare const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local";
```

## `createHindsightLocalMemoryProviderFactory`

Create Hindsight Local Memory Provider Factory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createHindsightLocalMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### Declaration

```text
export declare function createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory;
```

### Call signature

```text
createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>HindsightLocalFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderFactory`
- Description: The return contract is defined by the type shown above.

## `registerHindsightLocalMemoryProvider`

Register Hindsight Local Memory Provider function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerHindsightLocalMemoryProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### Declaration

```text
export declare function registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry;
```

### Call signature

```text
registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `registry` | <code>MemoryManagementProviderRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>HindsightLocalFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderRegistry`
- Description: The return contract is defined by the type shown above.

## `HindsightLocalConnection`

Hindsight Local Connection interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { HindsightLocalConnection } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### Declaration

```text
export interface HindsightLocalConnection {
    baseUrl: string;
    bearerToken?: string;
    fetch?: Mem0HttpFetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bearerToken` | property | <code>bearerToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HindsightLocalFactoryOptions`

Hindsight Local Factory Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { HindsightLocalFactoryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### Declaration

```text
export interface HindsightLocalFactoryOptions {
    fetch?: Mem0HttpFetch;
    operationDeadlineMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
