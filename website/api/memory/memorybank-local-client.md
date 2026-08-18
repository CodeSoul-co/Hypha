# `@codesoul-co/hypha-memory` / `memorybank-local-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memorybank-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)
- Exports: **4**

## Using this module

Use the Memorybank local client module for binding external or local providers to Hypha ports. It exports 1 class, 1 constant, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  MemoryBankLocalClient,
  MEMORYBANK_LOCAL_PROTOCOL,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryBankClient,
  MemoryBankLocalClientOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryBankLocalClient` | class | <code>new MemoryBankLocalClient(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Memory Bank Local Client class with 13 public constructor or member entries; its exact declarations are listed below. |
| `MEMORYBANK_LOCAL_PROTOCOL` | constant | <code>const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1"</code> | MEMORYBANK LOCAL PROTOCOL constant exported by the `memorybank-local-client` module. |
| `MemoryBankClient` | interface | <code>interface MemoryBankClient extends ExternalMemoryClient</code> | Memory Bank Client interface with 12 public fields or methods. |
| `MemoryBankLocalClientOptions` | interface | <code>interface MemoryBankLocalClientOptions</code> | Memory Bank Local Client Options interface with 7 public fields or methods. |

## `MemoryBankLocalClient`

Memory Bank Local Client class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryBankLocalClient } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### Declaration

```text
export declare class MemoryBankLocalClient implements MemoryBankClient {
    readonly protocol: "hypha.memorybank.v1";
    constructor(options: MemoryBankLocalClientOptions);
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
    reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `protocol` | property | <code>readonly protocol: "hypha.memorybank.v1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconcile` | method | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MEMORYBANK_LOCAL_PROTOCOL`

MEMORYBANK LOCAL PROTOCOL constant exported by the `memorybank-local-client` module.

- Kind: constant
- Import: `import { MEMORYBANK_LOCAL_PROTOCOL } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### Declaration

```text
export declare const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1";
```

## `MemoryBankClient`

Memory Bank Client interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryBankClient } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### Declaration

```text
export interface MemoryBankClient extends ExternalMemoryClient {
    readonly protocol: string;
    reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
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
| `protocol` | property | <code>readonly protocol: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconcile` | method | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryBankLocalClientOptions`

Memory Bank Local Client Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryBankLocalClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### Declaration

```text
export interface MemoryBankLocalClientOptions {
    baseUrl: string;
    fetch?: Mem0HttpFetch;
    apiKey?: string;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    now?: () => Date;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
