# `@codesoul-co/hypha-core` / `modules/artifact/eventing`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/eventing.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)
- Exports: **6**

## Using this module

Use the Eventing module for creating, recording, or reading Event contracts. It exports 3 classes, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  EventingArtifactGarbageCollector,
  EventingArtifactManager,
  EventingArtifactRetentionProcessor,
} from '@codesoul-co/hypha-core';

import type {
  EventingArtifactGarbageCollectorOptions,
  EventingArtifactManagerOptions,
  EventingArtifactRetentionProcessorOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EventingArtifactGarbageCollector` | class | <code>new EventingArtifactGarbageCollector(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Eventing Artifact Garbage Collector class with 2 public constructor or member entries; its exact declarations are listed below. |
| `EventingArtifactManager` | class | <code>new EventingArtifactManager(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Eventing Artifact Manager class with 17 public constructor or member entries; its exact declarations are listed below. |
| `EventingArtifactRetentionProcessor` | class | <code>new EventingArtifactRetentionProcessor(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Eventing Artifact Retention Processor class with 2 public constructor or member entries; its exact declarations are listed below. |
| `EventingArtifactGarbageCollectorOptions` | interface | <code>interface EventingArtifactGarbageCollectorOptions</code> | Eventing Artifact Garbage Collector Options interface with 8 public fields or methods. |
| `EventingArtifactManagerOptions` | interface | <code>interface EventingArtifactManagerOptions</code> | Eventing Artifact Manager Options interface with 4 public fields or methods. |
| `EventingArtifactRetentionProcessorOptions` | interface | <code>interface EventingArtifactRetentionProcessorOptions</code> | Eventing Artifact Retention Processor Options interface with 8 public fields or methods. |

## `EventingArtifactGarbageCollector`

Eventing Artifact Garbage Collector class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { EventingArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export declare class EventingArtifactGarbageCollector implements ArtifactGarbageCollector {
    constructor(options: EventingArtifactGarbageCollectorOptions);
    collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Creates an instance of this class. |

## `EventingArtifactManager`

Eventing Artifact Manager class with 17 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { EventingArtifactManager } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export declare class EventingArtifactManager implements ArtifactManager {
    constructor(options: EventingArtifactManagerOptions);
    create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
    read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise<ArtifactReadResult>;
    createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    list(request: ArtifactListRequest): Promise<ArtifactRecord[]>;
    finalize(input: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
    archive(input: ArtifactArchiveRequest): Promise<ArtifactRecord>;
    invalidate(input: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
    delete(input: ArtifactDeleteRequest): Promise<void>;
    traceLineage(request: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
    latest(request: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
    previous(request: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
    profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
    health(): Promise<Record<string, ProviderHealth>>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(input: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createDownloadAccess` | method | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createFromWorkspace` | method | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createVersion` | method | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `finalize` | method | <code>finalize(input: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(input: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `previous` | method | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `traceLineage` | method | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventingArtifactRetentionProcessor`

Eventing Artifact Retention Processor class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { EventingArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export declare class EventingArtifactRetentionProcessor implements ArtifactRetentionProcessor {
    constructor(options: EventingArtifactRetentionProcessorOptions);
    process(request: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Creates an instance of this class. |
| `process` | method | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventingArtifactGarbageCollectorOptions`

Eventing Artifact Garbage Collector Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { EventingArtifactGarbageCollectorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export interface EventingArtifactGarbageCollectorOptions {
    collector: ArtifactGarbageCollector;
    publisher: ArtifactEventPublisher;
    idGenerator: () => string;
    now?: () => string;
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `collector` | property | <code>collector: ArtifactGarbageCollector</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventingArtifactManagerOptions`

Eventing Artifact Manager Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { EventingArtifactManagerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export interface EventingArtifactManagerOptions {
    manager: ArtifactManager;
    publisher: ArtifactEventPublisher;
    idGenerator: () => string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public method; parameters and return type are shown in the signature. |
| `manager` | property | <code>manager: ArtifactManager</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventingArtifactRetentionProcessorOptions`

Eventing Artifact Retention Processor Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { EventingArtifactRetentionProcessorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### Declaration

```text
export interface EventingArtifactRetentionProcessorOptions {
    processor: ArtifactRetentionProcessor;
    publisher: ArtifactEventPublisher;
    idGenerator: () => string;
    now?: () => string;
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `processor` | property | <code>processor: ArtifactRetentionProcessor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publisher` | property | <code>publisher: ArtifactEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
