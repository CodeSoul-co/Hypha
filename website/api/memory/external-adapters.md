# `@codesoul-co/hypha-memory` / `external-adapters`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/external-adapters.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)
- Exports: **19**

## Using this module

Use the External adapters module for binding external or local providers to Hypha ports. It exports 4 classes, 2 constants, 2 functions, 9 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  ExternalMemoryManagementAdapter,
  InMemoryExternalMemoryMappingStore,
  Mem0MemoryManagementAdapter,
  MemoryBankMemoryManagementAdapter,
  externalMemoryMappingSchema,
  unsupportedMemoryManagementCapabilities,
  negotiateMemoryManagementCapabilities,
  resolveExternalMemoryMappingStore,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalMemoryAdapterOptions,
  ExternalMemoryClient,
  ExternalMemoryMapping,
  ExternalMemoryMappingBinding,
  ExternalMemoryMappingStore,
  ExternalProviderStateChange,
  Mem0MemoryManagementAdapterOptions,
  MemoryBankMemoryManagementAdapterOptions,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExternalMemoryManagementAdapter` | class | <code>new ExternalMemoryManagementAdapter(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | External Memory Management Adapter class with 12 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryExternalMemoryMappingStore` | class | <code>new InMemoryExternalMemoryMappingStore(): InMemoryExternalMemoryMappingStore</code> | In Memory External Memory Mapping Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `Mem0MemoryManagementAdapter` | class | <code>new Mem0MemoryManagementAdapter(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Mem0 Memory Management Adapter class with 13 public constructor or member entries; its exact declarations are listed below. |
| `MemoryBankMemoryManagementAdapter` | class | <code>new MemoryBankMemoryManagementAdapter(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Memory Bank Memory Management Adapter class with 13 public constructor or member entries; its exact declarations are listed below. |
| `externalMemoryMappingSchema` | constant | <code>const externalMemoryMappingSchema: ZodType&lt;ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping&gt;</code> | Runtime schema for External Memory Mapping. |
| `unsupportedMemoryManagementCapabilities` | constant | <code>const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities</code> | Unsupported Memory Management Capabilities constant exported by the `external-adapters` module. |
| `negotiateMemoryManagementCapabilities` | function | <code>negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities</code> | Negotiate Memory Management Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `resolveExternalMemoryMappingStore` | function | <code>resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore &#124; undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore</code> | Resolve External Memory Mapping Store function with 1 public call signature; parameters and return types are listed below. |
| `ExternalMemoryAdapterOptions` | interface | <code>interface ExternalMemoryAdapterOptions</code> | External Memory Adapter Options interface with 11 public fields or methods. |
| `ExternalMemoryClient` | interface | <code>interface ExternalMemoryClient</code> | External Memory Client interface with 10 public fields or methods. |
| `ExternalMemoryMapping` | interface | <code>interface ExternalMemoryMapping</code> | External Memory Mapping interface with 8 public fields or methods. |
| `ExternalMemoryMappingBinding` | interface | <code>interface ExternalMemoryMappingBinding</code> | External Memory Mapping Binding interface with 4 public fields or methods. |
| `ExternalMemoryMappingStore` | interface | <code>interface ExternalMemoryMappingStore</code> | External Memory Mapping Store interface with 5 public fields or methods. |
| `ExternalProviderStateChange` | interface | <code>interface ExternalProviderStateChange</code> | External Provider State Change interface with 4 public fields or methods. |
| `Mem0MemoryManagementAdapterOptions` | interface | <code>interface Mem0MemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Mem0 Memory Management Adapter Options interface with 12 public fields or methods. |
| `MemoryBankMemoryManagementAdapterOptions` | interface | <code>interface MemoryBankMemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Memory Bank Memory Management Adapter Options interface with 12 public fields or methods. |
| `MemoryBankPolicySpec` | interface | <code>interface MemoryBankPolicySpec</code> | Memory Bank Policy Spec interface with 8 public fields or methods. |
| `ExternalMemoryMappingRuntimeProfile` | type | <code>type ExternalMemoryMappingRuntimeProfile = 'production' &#124; 'test' &#124; 'ephemeral'</code> | Public type alias for External Memory Mapping Runtime Profile; the declaration contains its complete type expression. |
| `ExternalMemoryMappingStoreDurability` | type | <code>type ExternalMemoryMappingStoreDurability = 'ephemeral' &#124; 'durable'</code> | Public type alias for External Memory Mapping Store Durability; the declaration contains its complete type expression. |

## `ExternalMemoryManagementAdapter`

External Memory Management Adapter class with 12 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ExternalMemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare class ExternalMemoryManagementAdapter implements MemoryManagementProvider {
    readonly id: string;
    constructor(options: ExternalMemoryAdapterOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryExternalMemoryMappingStore`

In Memory External Memory Mapping Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare class InMemoryExternalMemoryMappingStore implements ExternalMemoryMappingStore {
    readonly durability: "ephemeral";
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryExternalMemoryMappingStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "ephemeral"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `Mem0MemoryManagementAdapter`

Mem0 Memory Management Adapter class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { Mem0MemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare class Mem0MemoryManagementAdapter extends ExternalMemoryManagementAdapter {
    readonly deployment: 'managed' | 'self_hosted';
    constructor(options: Mem0MemoryManagementAdapterOptions);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `deployment` | property | <code>readonly deployment: "self_hosted" &#124; "managed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryBankMemoryManagementAdapter`

Memory Bank Memory Management Adapter class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryBankMemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare class MemoryBankMemoryManagementAdapter extends ExternalMemoryManagementAdapter {
    readonly policy: MemoryBankPolicySpec;
    constructor(options: MemoryBankMemoryManagementAdapterOptions);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>readonly policy: MemoryBankPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `externalMemoryMappingSchema`

Runtime schema for External Memory Mapping.

- Kind: constant
- Import: `import { externalMemoryMappingSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare const externalMemoryMappingSchema: ZodType<ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping>;
```

## `unsupportedMemoryManagementCapabilities`

Unsupported Memory Management Capabilities constant exported by the `external-adapters` module.

- Kind: constant
- Import: `import { unsupportedMemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities;
```

## `negotiateMemoryManagementCapabilities`

Negotiate Memory Management Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { negotiateMemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare function negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities;
```

### Call signature

```text
negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryManagementCapabilities`
- Description: The return contract is defined by the type shown above.

## `resolveExternalMemoryMappingStore`

Resolve External Memory Mapping Store function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export declare function resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore | undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore;
```

### Call signature

```text
resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore | undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `store` | <code>ExternalMemoryMappingStore</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `profile` | <code>ExternalMemoryMappingRuntimeProfile</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExternalMemoryMappingStore`
- Description: The return contract is defined by the type shown above.

## `ExternalMemoryAdapterOptions`

External Memory Adapter Options interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ExternalMemoryAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalMemoryAdapterOptions {
    id: string;
    client: ExternalMemoryClient;
    fallback?: MemoryManagementProvider;
    fallbackPolicy?: MemoryFallbackPolicySpec;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    timeoutMs?: number;
    retryAttempts?: number;
    circuitBreaker?: {
        failureThreshold: number;
        resetAfterMs: number;
    };
    now?: () => Date;
    onStateChange?: (event: ExternalProviderStateChange) => void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallback` | property | <code>fallback?: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackPolicy` | property | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onStateChange` | method | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retryAttempts` | property | <code>retryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalMemoryClient`

External Memory Client interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ExternalMemoryClient } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalMemoryClient {
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExternalMemoryMapping`

External Memory Mapping interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExternalMemoryMapping } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalMemoryMapping {
    memoryId: string;
    providerId: string;
    externalId: string;
    externalVersion?: string;
    binding: ExternalMemoryMappingBinding;
    lastSyncedAt: string;
    syncState: 'synced' | 'pending' | 'failed' | 'deleted';
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding: ExternalMemoryMappingBinding</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalId` | property | <code>externalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalVersion` | property | <code>externalVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSyncedAt` | property | <code>lastSyncedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `syncState` | property | <code>syncState: "failed" &#124; "deleted" &#124; "pending" &#124; "synced"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalMemoryMappingBinding`

External Memory Mapping Binding interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExternalMemoryMappingBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalMemoryMappingBinding {
    scopeHash: string;
    profileRef?: MemoryContractSpecRef;
    recordRevision: number;
    provenance: MemoryProvenance;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profileRef` | property | <code>profileRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: MemoryProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordRevision` | property | <code>recordRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalMemoryMappingStore`

External Memory Mapping Store interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalMemoryMappingStore {
    readonly durability: ExternalMemoryMappingStoreDurability;
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `durability` | property | <code>readonly durability: ExternalMemoryMappingStoreDurability</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExternalProviderStateChange`

External Provider State Change interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderStateChange } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface ExternalProviderStateChange {
    type: 'degraded' | 'recovered' | 'circuit_opened' | 'quarantined';
    providerId: string;
    occurredAt: string;
    error?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "degraded" &#124; "quarantined" &#124; "recovered" &#124; "circuit_opened"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `Mem0MemoryManagementAdapterOptions`

Mem0 Memory Management Adapter Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { Mem0MemoryManagementAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface Mem0MemoryManagementAdapterOptions extends Omit<ExternalMemoryAdapterOptions, 'id'> {
    id?: string;
    deployment?: 'managed' | 'self_hosted';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deployment` | property | <code>deployment?: "self_hosted" &#124; "managed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallback` | property | <code>fallback?: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackPolicy` | property | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onStateChange` | method | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retryAttempts` | property | <code>retryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryBankMemoryManagementAdapterOptions`

Memory Bank Memory Management Adapter Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryBankMemoryManagementAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface MemoryBankMemoryManagementAdapterOptions extends Omit<ExternalMemoryAdapterOptions, 'id'> {
    id?: string;
    policy: MemoryBankPolicySpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallback` | property | <code>fallback?: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackPolicy` | property | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onStateChange` | method | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy: MemoryBankPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAttempts` | property | <code>retryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryBankPolicySpec`

Memory Bank Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryBankPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export interface MemoryBankPolicySpec {
    extractionProfileRef?: import('./contracts').MemoryContractSpecRef;
    importanceThreshold?: number;
    reinforcementFactor?: number;
    decayFunction?: 'exponential' | 'linear' | 'custom';
    decayHalfLifeSeconds?: number;
    consolidationThreshold?: number;
    consolidationMinItems?: number;
    preserveOriginals?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consolidationMinItems` | property | <code>consolidationMinItems?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consolidationThreshold` | property | <code>consolidationThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decayFunction` | property | <code>decayFunction?: "custom" &#124; "exponential" &#124; "linear"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decayHalfLifeSeconds` | property | <code>decayHalfLifeSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractionProfileRef` | property | <code>extractionProfileRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceThreshold` | property | <code>importanceThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveOriginals` | property | <code>preserveOriginals?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reinforcementFactor` | property | <code>reinforcementFactor?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalMemoryMappingRuntimeProfile`

Public type alias for External Memory Mapping Runtime Profile; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExternalMemoryMappingRuntimeProfile } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export type ExternalMemoryMappingRuntimeProfile = 'production' | 'test' | 'ephemeral';
```

## `ExternalMemoryMappingStoreDurability`

Public type alias for External Memory Mapping Store Durability; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExternalMemoryMappingStoreDurability } from '@codesoul-co/hypha-memory';`
- Source module: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### Declaration

```text
export type ExternalMemoryMappingStoreDurability = 'ephemeral' | 'durable';
```
