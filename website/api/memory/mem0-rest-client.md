# `@codesoul-co/hypha-memory` / `mem0-rest-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/mem0-rest-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)
- Exports: **6**

## Using this module

Use the Mem0 rest client module for binding external or local providers to Hypha ports. It exports 2 classes, 2 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  Mem0OssClient,
  Mem0RestClient,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0HttpResponse,
  Mem0OssClientOptions,
  Mem0HttpFetch,
  Mem0RestClientOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `Mem0OssClient` | class | <code>new Mem0OssClient(options: Mem0OssClientOptions): Mem0OssClient</code> | Mem0 Oss Client class with 12 public constructor or member entries; its exact declarations are listed below. |
| `Mem0RestClient` | class | <code>new Mem0RestClient(options: Mem0RestClientOptions): Mem0RestClient</code> | Mem0 Rest Client class with 12 public constructor or member entries; its exact declarations are listed below. |
| `Mem0HttpResponse` | interface | <code>interface Mem0HttpResponse</code> | Mem0 Http Response interface with 6 public fields or methods. |
| `Mem0OssClientOptions` | interface | <code>interface Mem0OssClientOptions</code> | Mem0 Oss Client Options interface with 16 public fields or methods. |
| `Mem0HttpFetch` | type | <code>type Mem0HttpFetch = (url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }) =&gt; Promise&lt;Mem0HttpResponse&gt;</code> | Public type alias for Mem0 Http Fetch; the declaration contains its complete type expression. |
| `Mem0RestClientOptions` | type | <code>type Mem0RestClientOptions = Mem0OssClientOptions &amp; { deployment?: 'self_hosted'; }</code> | Public type alias for Mem0 Rest Client Options; the declaration contains its complete type expression. |

## `Mem0OssClient`

Mem0 Oss Client class with 12 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { Mem0OssClient } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export declare class Mem0OssClient implements ExternalMemoryClient {
    constructor(options: Mem0OssClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: Mem0OssClientOptions): Mem0OssClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `Mem0RestClient`

Mem0 Rest Client class with 12 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { Mem0RestClient } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export declare class Mem0RestClient extends Mem0OssClient {
    constructor(options: Mem0RestClientOptions);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: Mem0RestClientOptions): Mem0RestClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `Mem0HttpResponse`

Mem0 Http Response interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { Mem0HttpResponse } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export interface Mem0HttpResponse {
    ok: boolean;
    status: number;
    statusText: string;
    headers?: {
        get(name: string): string | null;
    };
    json(): Promise<unknown>;
    text(): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `headers` | property | <code>headers?: { get(name: string): string &#124; null; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `json` | method | <code>json(): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ok` | property | <code>ok: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statusText` | property | <code>statusText: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | method | <code>text(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `Mem0OssClientOptions`

Mem0 Oss Client Options interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { Mem0OssClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export interface Mem0OssClientOptions {
    baseUrl: string;
    apiKey?: string;
    authMode?: 'x-api-key' | 'bearer' | 'none';
    fetch?: Mem0HttpFetch;
    providerId?: string;
    healthPath?: string;
    now?: () => Date;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationProfile?: ExternalMemoryMappingRuntimeProfile;
    providerVersion?: string;
    expectedProviderVersion?: string;
    expectedCapabilities?: Partial<MemoryManagementCapabilities>;
    listPaginationMode?: 'top-k-offset' | 'provider-cursor';
    allowInsecureForTests?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authMode` | property | <code>authMode?: "none" &#124; "x-api-key" &#124; "bearer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedCapabilities` | property | <code>expectedCapabilities?: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedProviderVersion` | property | <code>expectedProviderVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `healthPath` | property | <code>healthPath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `listPaginationMode` | property | <code>listPaginationMode?: "top-k-offset" &#124; "provider-cursor"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `operationProfile` | property | <code>operationProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationStore` | property | <code>operationStore?: ExternalProviderOperationStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerVersion` | property | <code>providerVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `Mem0HttpFetch`

Public type alias for Mem0 Http Fetch; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { Mem0HttpFetch } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export type Mem0HttpFetch = (url: string, init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
}) => Promise<Mem0HttpResponse>;
```

## `Mem0RestClientOptions`

Public type alias for Mem0 Rest Client Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { Mem0RestClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### Declaration

```text
export type Mem0RestClientOptions = Mem0OssClientOptions & {
    deployment?: 'self_hosted';
};
```
