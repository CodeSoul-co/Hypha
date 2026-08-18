# `@codesoul-co/hypha-adapters-local` / `index`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)
- Exports: **26**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-adapters-local`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  ArtifactStoreToolPort,
  FileArtifactStore,
  FileMCPCapabilityCatalogStore,
  FileToolContractSnapshotStore,
  FileToolObservationStore,
  FileToolRuntimeStore,
  InMemoryArtifactStore,
  InMemoryStructuredStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  FileArtifactStoreOptions,
  FileToolRuntimeStoreOptions,
  LocalAdapterProfile,
  LocalHashEmbeddingProviderOptions,
  LocalStorageBackbone,
  LocalStorageBackboneOptions,
  LocalVectorIndexProviderOptions,
  SQLiteEventStoreOptions,
} from '@codesoul-co/hypha-adapters-local';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 14 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactStoreToolPort` | class | <code>new ArtifactStoreToolPort(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Artifact Store Tool Port class with 2 public constructor or member entries; its exact declarations are listed below. |
| `FileArtifactStore` | class | <code>new FileArtifactStore(options: FileArtifactStoreOptions): FileArtifactStore</code> | File Artifact Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `FileMCPCapabilityCatalogStore` | class | <code>new FileMCPCapabilityCatalogStore(filename: string): FileMCPCapabilityCatalogStore</code> | File MCP Capability Catalog Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `FileToolContractSnapshotStore` | class | <code>new FileToolContractSnapshotStore(rootPath: string): FileToolContractSnapshotStore</code> | File Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `FileToolObservationStore` | class | <code>new FileToolObservationStore(rootPath: string): FileToolObservationStore</code> | File Tool Observation Store class with 2 public constructor or member entries; its exact declarations are listed below. |
| `FileToolRuntimeStore` | class | <code>new FileToolRuntimeStore(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | File Tool Runtime Store class with 13 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryArtifactStore` | class | <code>new InMemoryArtifactStore(): InMemoryArtifactStore</code> | In Memory Artifact Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryStructuredStore` | class | <code>new InMemoryStructuredStore(): InMemoryStructuredStore</code> | In Memory Structured Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryVectorIndexProvider` | class | <code>new InMemoryVectorIndexProvider(): InMemoryVectorIndexProvider</code> | In Memory Vector Index Provider class with 4 public constructor or member entries; its exact declarations are listed below. |
| `LocalHashEmbeddingProvider` | class | <code>new LocalHashEmbeddingProvider(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`. |
| `LocalVectorIndexProvider` | class | <code>new LocalVectorIndexProvider(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Local Vector Index Provider class with 4 public constructor or member entries; its exact declarations are listed below. |
| `MockEmbeddingProvider` | class | <code>new MockEmbeddingProvider(): MockEmbeddingProvider</code> | Mock Embedding Provider class with 2 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteEventStore` | class | <code>new SQLiteEventStore(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | SQLite Event Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteStructuredStore` | class | <code>new SQLiteStructuredStore(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | SQLite Structured Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `LOCAL_ADAPTER_TYPES` | constant | <code>const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"]</code> | LOCAL ADAPTER TYPES constant exported by the `index` module. |
| `createLocalStorageBackbone` | function | <code>createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone</code> | Create Local Storage Backbone function with 1 public call signature; parameters and return types are listed below. |
| `createLocalStorageProfiles` | function | <code>createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]</code> | Create Local Storage Profiles function with 1 public call signature; parameters and return types are listed below. |
| `FileArtifactStoreOptions` | interface | <code>interface FileArtifactStoreOptions</code> | File Artifact Store Options interface with 1 public fields or methods. |
| `FileToolRuntimeStoreOptions` | interface | <code>interface FileToolRuntimeStoreOptions</code> | File Tool Runtime Store Options interface with 1 public fields or methods. |
| `LocalAdapterProfile` | interface | <code>interface LocalAdapterProfile</code> | Local Adapter Profile interface with 4 public fields or methods. |
| `LocalHashEmbeddingProviderOptions` | interface | <code>interface LocalHashEmbeddingProviderOptions</code> | Local Hash Embedding Provider Options interface with 1 public fields or methods. |
| `LocalStorageBackbone` | interface | <code>interface LocalStorageBackbone</code> | Local Storage Backbone interface with 7 public fields or methods. |
| `LocalStorageBackboneOptions` | interface | <code>interface LocalStorageBackboneOptions</code> | Local Storage Backbone Options interface with 8 public fields or methods. |
| `LocalVectorIndexProviderOptions` | interface | <code>interface LocalVectorIndexProviderOptions</code> | Local Vector Index Provider Options interface with 1 public fields or methods. |
| `SQLiteEventStoreOptions` | interface | <code>interface SQLiteEventStoreOptions</code> | SQLite Event Store Options interface with 3 public fields or methods. |
| `SQLiteStructuredStoreOptions` | interface | <code>interface SQLiteStructuredStoreOptions</code> | SQLite Structured Store Options interface with 3 public fields or methods. |

## `ArtifactStoreToolPort`

Artifact Store Tool Port class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ArtifactStoreToolPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class ArtifactStoreToolPort implements ToolArtifactPort {
    constructor(artifacts: ArtifactStoreProvider);
    store(request: {
            invocationId: string;
            toolId: string;
            value: unknown;
            mimeType?: string;
            metadata?: Record<string, unknown>;
        }): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Creates an instance of this class. |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FileArtifactStore`

File Artifact Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class FileArtifactStore implements ArtifactStoreProvider {
    constructor(options: FileArtifactStoreOptions);
    put(filePath: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FileArtifactStoreOptions): FileArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(filePath: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FileMCPCapabilityCatalogStore`

File MCP Capability Catalog Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileMCPCapabilityCatalogStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class FileMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    constructor(filename: string);
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(filename: string): FileMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FileToolContractSnapshotStore`

File Tool Contract Snapshot Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileToolContractSnapshotStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class FileToolContractSnapshotStore implements ToolContractSnapshotStore {
    constructor(rootPath: string);
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(rootPath: string): FileToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FileToolObservationStore`

File Tool Observation Store class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileToolObservationStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class FileToolObservationStore implements ToolObservationPort {
    constructor(rootPath: string);
    record(request: {
            invocationId: string;
            toolId: string;
            toolRevision: string;
            runId: string;
            stepId: string;
            inputHash: string;
            outputHash: string;
            value: unknown;
            artifactRefs?: string[];
            provenance: Record<string, unknown>;
        }): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(rootPath: string): FileToolObservationStore</code> | Creates an instance of this class. |
| `record` | method | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FileToolRuntimeStore`

File Tool Runtime Store class with 13 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FileToolRuntimeStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class FileToolRuntimeStore implements ToolInvocationStore, ToolApprovalStore {
    constructor(options: FileToolRuntimeStoreOptions);
    get(invocationId: string): Promise<ToolInvocationRecord | null>;
    findByIdempotency(request: ToolIdempotencyLookup): Promise<ToolInvocationRecord | null>;
    list(request?: ToolInvocationListRequest): Promise<ToolInvocationRecord[]>;
    create(record: ToolInvocationRecord): Promise<ToolInvocationRecord>;
    update(invocationId: string, patch: ToolInvocationPatch, options?: {
            expectedStatuses?: readonly ToolInvocationStatus[];
            expectedRevision?: number;
        }): Promise<ToolInvocationRecord>;
    getCompleted(invocationId: string): Promise<ToolCallResult | null>;
    saveCompleted(invocationId: string, result: ToolCallResult): Promise<void>;
    getRequest(invocationId: string): Promise<ToolApprovalRequest | null>;
    requestApproval(request: ToolApprovalRequest): Promise<ToolApprovalRequest>;
    getGrant(invocationId: string): Promise<ToolApprovalGrant | null>;
    approve(invocationId: string, approvedBy: string, options?: {
            approvedAt?: string;
            expiresAt?: string;
        }): Promise<ToolApprovalGrant>;
    reject(invocationId: string): Promise<ToolApprovalRequest>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryArtifactStore`

In Memory Artifact Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class InMemoryArtifactStore implements ArtifactStoreProvider {
    put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryStructuredStore`

In Memory Structured Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryStructuredStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class InMemoryStructuredStore implements StructuredStoreProvider {
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
            id: string;
        }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryStructuredStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryVectorIndexProvider`

In Memory Vector Index Provider class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryVectorIndexProvider } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class InMemoryVectorIndexProvider implements VectorIndexProvider {
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryVectorIndexProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalHashEmbeddingProvider`

Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`.

- Kind: class
- Import: `import { LocalHashEmbeddingProvider } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class LocalHashEmbeddingProvider implements EmbeddingProvider {
    constructor(options?: LocalHashEmbeddingProviderOptions);
    embed(input: string[]): Promise<number[][]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Creates an instance of this class. |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalVectorIndexProvider`

Local Vector Index Provider class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalVectorIndexProvider } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class LocalVectorIndexProvider implements VectorIndexProvider {
    constructor(options: LocalVectorIndexProviderOptions);
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MockEmbeddingProvider`

Mock Embedding Provider class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockEmbeddingProvider } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class MockEmbeddingProvider implements EmbeddingProvider {
    embed(input: string[]): Promise<number[][]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MockEmbeddingProvider</code> | Creates an instance of this class. |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteEventStore`

SQLite Event Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteEventStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class SQLiteEventStore implements EventStore, TraceRecorder {
    constructor(options: SQLiteEventStoreOptions);
    append(event: FrameworkEvent): Promise<void>;
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
    exportJsonl(filename: string, filter?: EventFilter): Promise<number>;
    importJsonl(filename: string): Promise<number>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | Creates an instance of this class. |
| `exportJsonl` | method | <code>exportJsonl(filename: string, filter?: EventFilter): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `importJsonl` | method | <code>importJsonl(filename: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteStructuredStore`

SQLite Structured Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteStructuredStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare class SQLiteStructuredStore implements StructuredStoreProvider {
    constructor(options: SQLiteStructuredStoreOptions);
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
            id: string;
        }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LOCAL_ADAPTER_TYPES`

LOCAL ADAPTER TYPES constant exported by the `index` module.

- Kind: constant
- Import: `import { LOCAL_ADAPTER_TYPES } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"];
```

## `createLocalStorageBackbone`

Create Local Storage Backbone function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare function createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone;
```

### Call signature

```text
createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>LocalStorageBackboneOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `LocalStorageBackbone`
- Description: The return contract is defined by the type shown above.

## `createLocalStorageProfiles`

Create Local Storage Profiles function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export declare function createLocalStorageProfiles(input: {
    eventDbFilename: string;
    structuredDbFilename: string;
    vectorFilename: string;
    artifactRootPath: string;
}): StorageProviderProfile[];
```

### Call signature

```text
createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile[]`
- Description: The return contract is defined by the type shown above.

## `FileArtifactStoreOptions`

File Artifact Store Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { FileArtifactStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface FileArtifactStoreOptions {
    rootPath: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `rootPath` | property | <code>rootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FileToolRuntimeStoreOptions`

File Tool Runtime Store Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { FileToolRuntimeStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface FileToolRuntimeStoreOptions {
    filename: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalAdapterProfile`

Local Adapter Profile interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalAdapterProfile } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface LocalAdapterProfile {
    id: string;
    type: 'sqlite' | 'local-vector' | 'file-artifact';
    rootPath?: string;
    options?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootPath` | property | <code>rootPath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "sqlite" &#124; "local-vector" &#124; "file-artifact"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalHashEmbeddingProviderOptions`

Local Hash Embedding Provider Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LocalHashEmbeddingProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface LocalHashEmbeddingProviderOptions {
    dimensions?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dimensions` | property | <code>dimensions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalStorageBackbone`

Local Storage Backbone interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { LocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface LocalStorageBackbone {
    profiles: StorageProviderProfile[];
    eventStore: SQLiteEventStore;
    structured: SQLiteStructuredStore;
    vector: LocalVectorIndexProvider;
    artifacts: FileArtifactStore;
    embeddings: EmbeddingProvider;
    memory: HybridMemoryProvider;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: FileArtifactStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventStore` | property | <code>eventStore: SQLiteEventStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memory` | property | <code>memory: HybridMemoryProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profiles` | property | <code>profiles: StorageProviderProfile[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structured` | property | <code>structured: SQLiteStructuredStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector: LocalVectorIndexProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalStorageBackboneOptions`

Local Storage Backbone Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { LocalStorageBackboneOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface LocalStorageBackboneOptions {
    rootPath: string;
    sqliteMode?: SQLiteEventStoreOptions['mode'];
    eventDbFilename?: string;
    structuredDbFilename?: string;
    vectorFilename?: string;
    artifactRootPath?: string;
    memoryTableName?: string;
    embeddings?: EmbeddingProvider;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRootPath` | property | <code>artifactRootPath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddings` | property | <code>embeddings?: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventDbFilename` | property | <code>eventDbFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTableName` | property | <code>memoryTableName?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootPath` | property | <code>rootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sqliteMode` | property | <code>sqliteMode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `structuredDbFilename` | property | <code>structuredDbFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorFilename` | property | <code>vectorFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalVectorIndexProviderOptions`

Local Vector Index Provider Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LocalVectorIndexProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface LocalVectorIndexProviderOptions {
    filename: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SQLiteEventStoreOptions`

SQLite Event Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteEventStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface SQLiteEventStoreOptions {
    filename: string;
    mode?: 'auto' | 'sqlite' | 'node-sqlite' | 'json';
    jsonFallbackFilename?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jsonFallbackFilename` | property | <code>jsonFallbackFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SQLiteStructuredStoreOptions`

SQLite Structured Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteStructuredStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### Declaration

```text
export interface SQLiteStructuredStoreOptions {
    filename: string;
    mode?: 'auto' | 'sqlite' | 'node-sqlite' | 'json';
    jsonFallbackFilename?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jsonFallbackFilename` | property | <code>jsonFallbackFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
