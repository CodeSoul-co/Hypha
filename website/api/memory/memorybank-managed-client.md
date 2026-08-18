# `@codesoul-co/hypha-memory` / `memorybank-managed-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memorybank-managed-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)
- Exports: **2**

## Using this module

Use the Memorybank managed client module for binding external or local providers to Hypha ports. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  MemoryBankManagedClient,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryBankManagedClientOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryBankManagedClient` | class | <code>new MemoryBankManagedClient(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Google Vertex AI Agent Engine Memory Bank managed client. |
| `MemoryBankManagedClientOptions` | interface | <code>interface MemoryBankManagedClientOptions</code> | Memory Bank Managed Client Options interface with 16 public fields or methods. |

## `MemoryBankManagedClient`

Google Vertex AI Agent Engine Memory Bank managed client.

- Kind: class
- Import: `import { MemoryBankManagedClient } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-managed-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)

### Declaration

```text
export declare class MemoryBankManagedClient implements ExternalMemoryClient {
    constructor(options: MemoryBankManagedClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    reconcileOperation(operationId: string, signal?: AbortSignal): Promise<ManagedMemoryWriteResult | null>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
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
| `constructor` | constructor | <code>(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcileOperation` | method | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryBankManagedClientOptions`

Memory Bank Managed Client Options interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { MemoryBankManagedClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memorybank-managed-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)

### Declaration

```text
export interface MemoryBankManagedClientOptions {
    projectId: string;
    location: string;
    reasoningEngineId: string;
    accessToken?: string;
    credentialProvider?: RenewableCredentialProvider;
    fetch?: Mem0HttpFetch;
    baseUrl?: string;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    profileRef?: MemoryContractSpecRef;
    operationStore?: ExternalProviderOperationStore;
    operationDeadlineMs?: number;
    maxOperationAttempts?: number;
    now?: () => Date;
    allowInsecureForTests?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessToken` | property | <code>accessToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowInsecureForTests` | property | <code>allowInsecureForTests?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `credentialProvider` | property | <code>credentialProvider?: RenewableCredentialProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `location` | property | <code>location: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOperationAttempts` | property | <code>maxOperationAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationStore` | property | <code>operationStore?: ExternalProviderOperationStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectId` | property | <code>projectId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningEngineId` | property | <code>reasoningEngineId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
