# `@codesoul-co/hypha-memory` / `mem0-platform-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/mem0-platform-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)
- Exports: **3**

## Using this module

Use the Mem0 platform client module for binding external or local providers to Hypha ports. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  Mem0PlatformClient,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0PlatformClientOptions,
  Mem0PlatformEvent,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `Mem0PlatformClient` | class | <code>new Mem0PlatformClient(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Client for the documented Mem0 Platform v3 additive/search/list protocol. |
| `Mem0PlatformClientOptions` | interface | <code>interface Mem0PlatformClientOptions</code> | Mem0 Platform Client Options interface with 15 public fields or methods. |
| `Mem0PlatformEvent` | interface | <code>interface Mem0PlatformEvent</code> | Mem0 Platform Event interface with 4 public fields or methods. |

## `Mem0PlatformClient`

Client for the documented Mem0 Platform v3 additive/search/list protocol.

- Kind: class
- Import: `import { Mem0PlatformClient } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### Declaration

```text
export declare class Mem0PlatformClient implements ExternalMemoryClient {
    constructor(options: Mem0PlatformClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
    getEvent(eventId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent>;
    resumeEvent(operationId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent | null>;
    reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getEvent` | method | <code>getEvent(eventId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resumeEvent` | method | <code>resumeEvent(operationId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `Mem0PlatformClientOptions`

Mem0 Platform Client Options interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { Mem0PlatformClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### Declaration

```text
export interface Mem0PlatformClientOptions {
    baseUrl?: string;
    apiToken?: string;
    credentialProvider?: RenewableCredentialProvider;
    fetch?: Mem0HttpFetch;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationDeadlineMs?: number;
    maxOperationAttempts?: number;
    providerVersion?: string;
    expectedProviderVersion?: string;
    expectedCapabilities?: Partial<MemoryManagementCapabilities>;
    now?: () => Date;
    allowInsecureForTests?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `apiToken` | property | <code>apiToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `credentialProvider` | property | <code>credentialProvider?: RenewableCredentialProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedCapabilities` | property | <code>expectedCapabilities?: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedProviderVersion` | property | <code>expectedProviderVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOperationAttempts` | property | <code>maxOperationAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationStore` | property | <code>operationStore?: ExternalProviderOperationStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerVersion` | property | <code>providerVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `Mem0PlatformEvent`

Mem0 Platform Event interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { Mem0PlatformEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### Declaration

```text
export interface Mem0PlatformEvent {
    id: string;
    status: 'PENDING' | 'RUNNING' | 'FAILED' | 'SUCCEEDED';
    results?: unknown[];
    payload?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `results` | property | <code>results?: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "PENDING" &#124; "RUNNING" &#124; "FAILED" &#124; "SUCCEEDED"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
