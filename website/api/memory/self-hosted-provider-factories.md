# `@codesoul-co/hypha-memory` / `self-hosted-provider-factories`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/self-hosted-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)
- Exports: **5**

## Using this module

Use the Self hosted provider factories module for binding external or local providers to Hypha ports. It exports 1 constant, 2 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  MEM0_OSS_FACTORY_ID,
  createMem0OssMemoryProviderFactory,
  registerMem0OssMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0OssConnection,
  Mem0OssProviderFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MEM0_OSS_FACTORY_ID` | constant | <code>const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest"</code> | MEM0 OSS FACTORY ID constant exported by the `self-hosted-provider-factories` module. |
| `createMem0OssMemoryProviderFactory` | function | <code>createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Mem0 Oss Memory Provider Factory function with 1 public call signature; parameters and return types are listed below. |
| `registerMem0OssMemoryProvider` | function | <code>registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry</code> | Register Mem0 Oss Memory Provider function with 1 public call signature; parameters and return types are listed below. |
| `Mem0OssConnection` | interface | <code>interface Mem0OssConnection</code> | Mem0 Oss Connection interface with 5 public fields or methods. |
| `Mem0OssProviderFactoryOptions` | interface | <code>interface Mem0OssProviderFactoryOptions</code> | Mem0 Oss Provider Factory Options interface with 1 public fields or methods. |

## `MEM0_OSS_FACTORY_ID`

MEM0 OSS FACTORY ID constant exported by the `self-hosted-provider-factories` module.

- Kind: constant
- Import: `import { MEM0_OSS_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- Source module: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### Declaration

```text
export declare const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest";
```

## `createMem0OssMemoryProviderFactory`

Create Mem0 Oss Memory Provider Factory function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMem0OssMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### Declaration

```text
export declare function createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory;
```

### Call signature

```text
createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>Mem0OssProviderFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderFactory`
- Description: The return contract is defined by the type shown above.

## `registerMem0OssMemoryProvider`

Register Mem0 Oss Memory Provider function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerMem0OssMemoryProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### Declaration

```text
export declare function registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry;
```

### Call signature

```text
registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `registry` | <code>MemoryManagementProviderRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>Mem0OssProviderFactoryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementProviderRegistry`
- Description: The return contract is defined by the type shown above.

## `Mem0OssConnection`

Mem0 Oss Connection interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { Mem0OssConnection } from '@codesoul-co/hypha-memory';`
- Source module: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### Declaration

```text
export interface Mem0OssConnection {
    baseUrl: string;
    apiKey?: string;
    authMode?: Mem0OssClientOptions['authMode'];
    providerVersion?: string;
    fetch?: Mem0HttpFetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authMode` | property | <code>authMode?: "none" &#124; "x-api-key" &#124; "bearer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerVersion` | property | <code>providerVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `Mem0OssProviderFactoryOptions`

Mem0 Oss Provider Factory Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { Mem0OssProviderFactoryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### Declaration

```text
export interface Mem0OssProviderFactoryOptions {
    fetch?: Mem0HttpFetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
