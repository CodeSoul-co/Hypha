# `@codesoul-co/hypha-core` / `modules/artifact/eventing`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/eventing.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)
- 导出数: **6**

## 模块用法

用于创建、记录或读取 Event 契约。Eventing 模块公开 3 类、3 接口。

### 从包入口导入

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

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EventingArtifactGarbageCollector` | 类 | <code>new EventingArtifactGarbageCollector(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | Eventing Artifact Garbage Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EventingArtifactManager` | 类 | <code>new EventingArtifactManager(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | Eventing Artifact Manager 类，共公开 17 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EventingArtifactRetentionProcessor` | 类 | <code>new EventingArtifactRetentionProcessor(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | Eventing Artifact Retention Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EventingArtifactGarbageCollectorOptions` | 接口 | <code>interface EventingArtifactGarbageCollectorOptions</code> | Eventing Artifact Garbage Collector Options 接口，共包含 8 个公开字段或方法。 |
| `EventingArtifactManagerOptions` | 接口 | <code>interface EventingArtifactManagerOptions</code> | Eventing Artifact Manager Options 接口，共包含 4 个公开字段或方法。 |
| `EventingArtifactRetentionProcessorOptions` | 接口 | <code>interface EventingArtifactRetentionProcessorOptions</code> | Eventing Artifact Retention Processor Options 接口，共包含 8 个公开字段或方法。 |

## `EventingArtifactGarbageCollector`

Eventing Artifact Garbage Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { EventingArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

```text
export declare class EventingArtifactGarbageCollector implements ArtifactGarbageCollector {
    constructor(options: EventingArtifactGarbageCollectorOptions);
    collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: EventingArtifactGarbageCollectorOptions): EventingArtifactGarbageCollector</code> | 创建该类的实例。 |

## `EventingArtifactManager`

Eventing Artifact Manager 类，共公开 17 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { EventingArtifactManager } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archive` | 方法 | <code>archive(input: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: EventingArtifactManagerOptions): EventingArtifactManager</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createDownloadAccess` | 方法 | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(input: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `createVersion` | 方法 | <code>createVersion(input: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(input: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `finalize` | 方法 | <code>finalize(input: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(input: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `previous` | 方法 | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profile` | 方法 | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(input: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `traceLineage` | 方法 | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventingArtifactRetentionProcessor`

Eventing Artifact Retention Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { EventingArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

```text
export declare class EventingArtifactRetentionProcessor implements ArtifactRetentionProcessor {
    constructor(options: EventingArtifactRetentionProcessorOptions);
    process(request: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: EventingArtifactRetentionProcessorOptions): EventingArtifactRetentionProcessor</code> | 创建该类的实例。 |
| `process` | 方法 | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventingArtifactGarbageCollectorOptions`

Eventing Artifact Garbage Collector Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventingArtifactGarbageCollectorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `collector` | 属性 | <code>collector: ArtifactGarbageCollector</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventingArtifactManagerOptions`

Eventing Artifact Manager Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventingArtifactManagerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

```text
export interface EventingArtifactManagerOptions {
    manager: ArtifactManager;
    publisher: ArtifactEventPublisher;
    idGenerator: () => string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `manager` | 属性 | <code>manager: ArtifactManager</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventingArtifactRetentionProcessorOptions`

Eventing Artifact Retention Processor Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventingArtifactRetentionProcessorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/eventing`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/eventing.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idGenerator` | 方法 | <code>idGenerator(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `processor` | 属性 | <code>processor: ArtifactRetentionProcessor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publisher` | 属性 | <code>publisher: ArtifactEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
