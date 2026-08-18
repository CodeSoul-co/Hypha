# `@codesoul-co/hypha-adapters-local` / `index`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)
- 导出数: **26**

## 模块用法

聚合 `@codesoul-co/hypha-adapters-local` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 14 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactStoreToolPort` | 类 | <code>new ArtifactStoreToolPort(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Artifact Store Tool Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `FileArtifactStore` | 类 | <code>new FileArtifactStore(options: FileArtifactStoreOptions): FileArtifactStore</code> | File Artifact Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `FileMCPCapabilityCatalogStore` | 类 | <code>new FileMCPCapabilityCatalogStore(filename: string): FileMCPCapabilityCatalogStore</code> | File MCP Capability Catalog Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `FileToolContractSnapshotStore` | 类 | <code>new FileToolContractSnapshotStore(rootPath: string): FileToolContractSnapshotStore</code> | File Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `FileToolObservationStore` | 类 | <code>new FileToolObservationStore(rootPath: string): FileToolObservationStore</code> | File Tool Observation Store 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `FileToolRuntimeStore` | 类 | <code>new FileToolRuntimeStore(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | File Tool Runtime Store 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryArtifactStore` | 类 | <code>new InMemoryArtifactStore(): InMemoryArtifactStore</code> | In Memory Artifact Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryStructuredStore` | 类 | <code>new InMemoryStructuredStore(): InMemoryStructuredStore</code> | In Memory Structured Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryVectorIndexProvider` | 类 | <code>new InMemoryVectorIndexProvider(): InMemoryVectorIndexProvider</code> | In Memory Vector Index Provider 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalHashEmbeddingProvider` | 类 | <code>new LocalHashEmbeddingProvider(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`. |
| `LocalVectorIndexProvider` | 类 | <code>new LocalVectorIndexProvider(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Local Vector Index Provider 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MockEmbeddingProvider` | 类 | <code>new MockEmbeddingProvider(): MockEmbeddingProvider</code> | Mock Embedding Provider 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteEventStore` | 类 | <code>new SQLiteEventStore(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | SQLite Event Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteStructuredStore` | 类 | <code>new SQLiteStructuredStore(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | SQLite Structured Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LOCAL_ADAPTER_TYPES` | 常量 | <code>const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"]</code> | 由 `index` 模块导出的 LOCAL ADAPTER TYPES 常量。 |
| `createLocalStorageBackbone` | 函数 | <code>createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone</code> | Create Local Storage Backbone 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createLocalStorageProfiles` | 函数 | <code>createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]</code> | Create Local Storage Profiles 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `FileArtifactStoreOptions` | 接口 | <code>interface FileArtifactStoreOptions</code> | File Artifact Store Options 接口，共包含 1 个公开字段或方法。 |
| `FileToolRuntimeStoreOptions` | 接口 | <code>interface FileToolRuntimeStoreOptions</code> | File Tool Runtime Store Options 接口，共包含 1 个公开字段或方法。 |
| `LocalAdapterProfile` | 接口 | <code>interface LocalAdapterProfile</code> | Local Adapter Profile 接口，共包含 4 个公开字段或方法。 |
| `LocalHashEmbeddingProviderOptions` | 接口 | <code>interface LocalHashEmbeddingProviderOptions</code> | Local Hash Embedding Provider Options 接口，共包含 1 个公开字段或方法。 |
| `LocalStorageBackbone` | 接口 | <code>interface LocalStorageBackbone</code> | Local Storage Backbone 接口，共包含 7 个公开字段或方法。 |
| `LocalStorageBackboneOptions` | 接口 | <code>interface LocalStorageBackboneOptions</code> | Local Storage Backbone Options 接口，共包含 8 个公开字段或方法。 |
| `LocalVectorIndexProviderOptions` | 接口 | <code>interface LocalVectorIndexProviderOptions</code> | Local Vector Index Provider Options 接口，共包含 1 个公开字段或方法。 |
| `SQLiteEventStoreOptions` | 接口 | <code>interface SQLiteEventStoreOptions</code> | SQLite Event Store Options 接口，共包含 3 个公开字段或方法。 |
| `SQLiteStructuredStoreOptions` | 接口 | <code>interface SQLiteStructuredStoreOptions</code> | SQLite Structured Store Options 接口，共包含 3 个公开字段或方法。 |

## `ArtifactStoreToolPort`

Artifact Store Tool Port 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ArtifactStoreToolPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | 创建该类的实例。 |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FileArtifactStore`

File Artifact Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class FileArtifactStore implements ArtifactStoreProvider {
    constructor(options: FileArtifactStoreOptions);
    put(filePath: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FileArtifactStoreOptions): FileArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(filePath: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FileMCPCapabilityCatalogStore`

File MCP Capability Catalog Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileMCPCapabilityCatalogStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class FileMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
    constructor(filename: string);
    list(serverId?: string): Promise<MCPCapabilityRecord[]>;
    save(record: MCPCapabilityRecord, options?: {
            expected?: MCPCapabilityRecord | null;
        }): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(filename: string): FileMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FileToolContractSnapshotStore`

File Tool Contract Snapshot Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileToolContractSnapshotStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class FileToolContractSnapshotStore implements ToolContractSnapshotStore {
    constructor(rootPath: string);
    get(snapshotId: string): Promise<ToolContractSnapshot | null>;
    save(snapshot: ToolContractSnapshot): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(rootPath: string): FileToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FileToolObservationStore`

File Tool Observation Store 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileToolObservationStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(rootPath: string): FileToolObservationStore</code> | 创建该类的实例。 |
| `record` | 方法 | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FileToolRuntimeStore`

File Tool Runtime Store 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FileToolRuntimeStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryArtifactStore`

In Memory Artifact Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryArtifactStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class InMemoryArtifactStore implements ArtifactStoreProvider {
    put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryStructuredStore`

In Memory Structured Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryStructuredStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryStructuredStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryVectorIndexProvider`

In Memory Vector Index Provider 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryVectorIndexProvider } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class InMemoryVectorIndexProvider implements VectorIndexProvider {
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryVectorIndexProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalHashEmbeddingProvider`

Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`.

- 种类: 类
- 导入: `import { LocalHashEmbeddingProvider } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class LocalHashEmbeddingProvider implements EmbeddingProvider {
    constructor(options?: LocalHashEmbeddingProviderOptions);
    embed(input: string[]): Promise<number[][]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | 创建该类的实例。 |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalVectorIndexProvider`

Local Vector Index Provider 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalVectorIndexProvider } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class LocalVectorIndexProvider implements VectorIndexProvider {
    constructor(options: LocalVectorIndexProviderOptions);
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MockEmbeddingProvider`

Mock Embedding Provider 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockEmbeddingProvider } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare class MockEmbeddingProvider implements EmbeddingProvider {
    embed(input: string[]): Promise<number[][]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MockEmbeddingProvider</code> | 创建该类的实例。 |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteEventStore`

SQLite Event Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteEventStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | 创建该类的实例。 |
| `exportJsonl` | 方法 | <code>exportJsonl(filename: string, filter?: EventFilter): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `importJsonl` | 方法 | <code>importJsonl(filename: string): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteStructuredStore`

SQLite Structured Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteStructuredStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LOCAL_ADAPTER_TYPES`

由 `index` 模块导出的 LOCAL ADAPTER TYPES 常量。

- 种类: 常量
- 导入: `import { LOCAL_ADAPTER_TYPES } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"];
```

## `createLocalStorageBackbone`

Create Local Storage Backbone 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare function createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone;
```

### 调用签名

```text
createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>LocalStorageBackboneOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `LocalStorageBackbone`
- 说明: 返回值契约由上述类型定义。

## `createLocalStorageProfiles`

Create Local Storage Profiles 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export declare function createLocalStorageProfiles(input: {
    eventDbFilename: string;
    structuredDbFilename: string;
    vectorFilename: string;
    artifactRootPath: string;
}): StorageProviderProfile[];
```

### 调用签名

```text
createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile[]`
- 说明: 返回值契约由上述类型定义。

## `FileArtifactStoreOptions`

File Artifact Store Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FileArtifactStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface FileArtifactStoreOptions {
    rootPath: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `rootPath` | 属性 | <code>rootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FileToolRuntimeStoreOptions`

File Tool Runtime Store Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FileToolRuntimeStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface FileToolRuntimeStoreOptions {
    filename: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalAdapterProfile`

Local Adapter Profile 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalAdapterProfile } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface LocalAdapterProfile {
    id: string;
    type: 'sqlite' | 'local-vector' | 'file-artifact';
    rootPath?: string;
    options?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootPath` | 属性 | <code>rootPath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "sqlite" &#124; "local-vector" &#124; "file-artifact"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalHashEmbeddingProviderOptions`

Local Hash Embedding Provider Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalHashEmbeddingProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface LocalHashEmbeddingProviderOptions {
    dimensions?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dimensions` | 属性 | <code>dimensions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalStorageBackbone`

Local Storage Backbone 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: FileArtifactStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventStore` | 属性 | <code>eventStore: SQLiteEventStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memory` | 属性 | <code>memory: HybridMemoryProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profiles` | 属性 | <code>profiles: StorageProviderProfile[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structured` | 属性 | <code>structured: SQLiteStructuredStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector: LocalVectorIndexProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalStorageBackboneOptions`

Local Storage Backbone Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalStorageBackboneOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRootPath` | 属性 | <code>artifactRootPath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddings` | 属性 | <code>embeddings?: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventDbFilename` | 属性 | <code>eventDbFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTableName` | 属性 | <code>memoryTableName?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sqliteMode` | 属性 | <code>sqliteMode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structuredDbFilename` | 属性 | <code>structuredDbFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorFilename` | 属性 | <code>vectorFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalVectorIndexProviderOptions`

Local Vector Index Provider Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalVectorIndexProviderOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface LocalVectorIndexProviderOptions {
    filename: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SQLiteEventStoreOptions`

SQLite Event Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteEventStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface SQLiteEventStoreOptions {
    filename: string;
    mode?: 'auto' | 'sqlite' | 'node-sqlite' | 'json';
    jsonFallbackFilename?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jsonFallbackFilename` | 属性 | <code>jsonFallbackFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SQLiteStructuredStoreOptions`

SQLite Structured Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteStructuredStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)

### 声明

```text
export interface SQLiteStructuredStoreOptions {
    filename: string;
    mode?: 'auto' | 'sqlite' | 'node-sqlite' | 'json';
    jsonFallbackFilename?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jsonFallbackFilename` | 属性 | <code>jsonFallbackFilename?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
