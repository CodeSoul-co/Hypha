# `@codesoul-co/hypha-memory` / `memory-application-service`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-application-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)
- Exports: **3**

## Using this module

Use the Memory application service module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  DefaultMemoryApplicationService,
} from '@codesoul-co/hypha-memory';

import type {
  DefaultMemoryApplicationServiceOptions,
  MemoryApplicationService,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryApplicationService` | class | <code>new DefaultMemoryApplicationService(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store. |
| `DefaultMemoryApplicationServiceOptions` | interface | <code>interface DefaultMemoryApplicationServiceOptions</code> | Default Memory Application Service Options interface with 6 public fields or methods. |
| `MemoryApplicationService` | interface | <code>interface MemoryApplicationService</code> | Memory Application Service interface with 12 public fields or methods. |

## `DefaultMemoryApplicationService`

Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store.

- Kind: class
- Import: `import { DefaultMemoryApplicationService } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### Declaration

```text
export declare class DefaultMemoryApplicationService implements MemoryApplicationService {
    constructor(options: DefaultMemoryApplicationServiceOptions);
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope>;
    explainContext(contextHash: string): Promise<ContextBuildExplanation | null>;
    providerCapabilities(): Promise<MemoryManagementCapabilities>;
    providerHealth(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `buildContext` | method | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `explainContext` | method | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerCapabilities` | method | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerHealth` | method | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultMemoryApplicationServiceOptions`

Default Memory Application Service Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DefaultMemoryApplicationServiceOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### Declaration

```text
export interface DefaultMemoryApplicationServiceOptions {
    manager: GovernedMemoryManager;
    activities: MemoryActivityPort;
    provider: MemoryManagementProvider;
    contextBuilder?: MemoryContextBuilder;
    eventContext: MemoryEventContext | ((request: ContextBuildInput) => MemoryEventContext);
    contextTimeoutMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: MemoryActivityPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBuilder` | property | <code>contextBuilder?: MemoryContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextTimeoutMs` | property | <code>contextTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventContext` | property | <code>eventContext: MemoryEventContext &#124; ((request: ContextBuildInput) =&gt; MemoryEventContext)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manager` | property | <code>manager: GovernedMemoryManager</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryApplicationService`

Memory Application Service interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryApplicationService } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### Declaration

```text
export interface MemoryApplicationService {
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope>;
    explainContext(contextHash: string): Promise<ContextBuildExplanation | null>;
    providerCapabilities(): Promise<MemoryManagementCapabilities>;
    providerHealth(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `buildContext` | method | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `explainContext` | method | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerCapabilities` | method | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerHealth` | method | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
