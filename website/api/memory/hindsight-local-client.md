# `@codesoul-co/hypha-memory` / `hindsight-local-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/hindsight-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)
- Exports: **6**

## Using this module

Use the Hindsight local client module for binding external or local providers to Hypha ports. It exports 1 class, 2 constants, 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  HindsightLocalMemoryBankClient,
  HINDSIGHT_LOCAL_PROTOCOL,
  HINDSIGHT_LOCAL_VERSION,
  bankIdForScope,
  documentIdForOperation,
} from '@codesoul-co/hypha-memory';

import type {
  HindsightLocalMemoryBankClientOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HindsightLocalMemoryBankClient` | class | <code>new HindsightLocalMemoryBankClient(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Native adapter for Hindsight Self-hosted HTTP API 0.8. |
| `HINDSIGHT_LOCAL_PROTOCOL` | constant | <code>const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8"</code> | HINDSIGHT LOCAL PROTOCOL constant exported by the `hindsight-local-client` module. |
| `HINDSIGHT_LOCAL_VERSION` | constant | <code>const HINDSIGHT_LOCAL_VERSION: "0.8.5"</code> | HINDSIGHT LOCAL VERSION constant exported by the `hindsight-local-client` module. |
| `bankIdForScope` | function | <code>bankIdForScope(scope: ManagedMemoryScope): string</code> | Bank ID For Scope function with 1 public call signature; parameters and return types are listed below. |
| `documentIdForOperation` | function | <code>documentIdForOperation(operationId: string): string</code> | Document ID For Operation function with 1 public call signature; parameters and return types are listed below. |
| `HindsightLocalMemoryBankClientOptions` | interface | <code>interface HindsightLocalMemoryBankClientOptions</code> | Hindsight Local Memory Bank Client Options interface with 12 public fields or methods. |

## `HindsightLocalMemoryBankClient`

Native adapter for Hindsight Self-hosted HTTP API 0.8.

- Kind: class
- Import: `import { HindsightLocalMemoryBankClient } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export declare class HindsightLocalMemoryBankClient implements ExternalMemoryClient {
    readonly protocol: "hindsight.http.v0.8";
    constructor(options: HindsightLocalMemoryBankClientOptions);
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
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
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `protocol` | property | <code>readonly protocol: "hindsight.http.v0.8"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconcileOperation` | method | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HINDSIGHT_LOCAL_PROTOCOL`

HINDSIGHT LOCAL PROTOCOL constant exported by the `hindsight-local-client` module.

- Kind: constant
- Import: `import { HINDSIGHT_LOCAL_PROTOCOL } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export declare const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8";
```

## `HINDSIGHT_LOCAL_VERSION`

HINDSIGHT LOCAL VERSION constant exported by the `hindsight-local-client` module.

- Kind: constant
- Import: `import { HINDSIGHT_LOCAL_VERSION } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export declare const HINDSIGHT_LOCAL_VERSION: "0.8.5";
```

## `bankIdForScope`

Bank ID For Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { bankIdForScope } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export declare function bankIdForScope(scope: ManagedMemoryScope): string;
```

### Call signature

```text
bankIdForScope(scope: ManagedMemoryScope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>ManagedMemoryScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `documentIdForOperation`

Document ID For Operation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { documentIdForOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export declare function documentIdForOperation(operationId: string): string;
```

### Call signature

```text
documentIdForOperation(operationId: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `operationId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `HindsightLocalMemoryBankClientOptions`

Hindsight Local Memory Bank Client Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { HindsightLocalMemoryBankClientOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### Declaration

```text
export interface HindsightLocalMemoryBankClientOptions {
    baseUrl: string;
    bearerToken?: string;
    fetch?: Mem0HttpFetch;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationProfile?: ExternalMemoryMappingRuntimeProfile;
    profileRef?: MemoryContractSpecRef;
    operationDeadlineMs?: number;
    now?: () => Date;
    expectedApiVersion?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bearerToken` | property | <code>bearerToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedApiVersion` | property | <code>expectedApiVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `mappingProfile` | property | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mappingStore` | property | <code>mappingStore?: ExternalMemoryMappingStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationProfile` | property | <code>operationProfile?: ExternalMemoryMappingRuntimeProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationStore` | property | <code>operationStore?: ExternalProviderOperationStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
