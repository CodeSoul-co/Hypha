# `@codesoul-co/hypha-memory` / `structured-external-mapping-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-external-mapping-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)
- Exports: **2**

## Using this module

Use the Structured external mapping store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredExternalMemoryMappingStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredExternalMemoryMappingStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredExternalMemoryMappingStore` | class | <code>new StructuredExternalMemoryMappingStore(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Persistent, restart-safe mapping between Hypha memory IDs and provider IDs. |
| `StructuredExternalMemoryMappingStoreOptions` | interface | <code>interface StructuredExternalMemoryMappingStoreOptions</code> | Structured External Memory Mapping Store Options interface with 2 public fields or methods. |

## `StructuredExternalMemoryMappingStore`

Persistent, restart-safe mapping between Hypha memory IDs and provider IDs.

- Kind: class
- Import: `import { StructuredExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-external-mapping-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)

### Declaration

```text
export declare class StructuredExternalMemoryMappingStore implements ExternalMemoryMappingStore {
    readonly durability: "durable";
    constructor(options: StructuredExternalMemoryMappingStoreOptions);
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredExternalMemoryMappingStoreOptions`

Structured External Memory Mapping Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { StructuredExternalMemoryMappingStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-external-mapping-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)

### Declaration

```text
export interface StructuredExternalMemoryMappingStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `table` | property | <code>table?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
