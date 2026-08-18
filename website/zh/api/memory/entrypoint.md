# `@codesoul-co/hypha-memory` / `index`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)
- 导出数: **40**

## 模块用法

聚合 `@codesoul-co/hypha-memory` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  MemoryManager,
  memoryProviderProfileSchema,
  memoryRetrievalPolicySchema,
  memorySpecDefinition,
  memorySpecDefinitions,
  memorySpecExample,
  memorySpecJsonSchema,
  memorySpecJsonSchemas,
} from '@codesoul-co/hypha-memory';

import type {
  ArtifactMeta,
  ArtifactRef,
  ArtifactStoreProvider,
  EmbeddingProvider,
  MemoryAuditOptions,
  MemoryAuditReport,
  MemoryManagerOptions,
  MemoryManagerRecoveryOptions,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 29 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 9 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { memoryProviderProfileSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = memoryProviderProfileSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryManager` | 类 | <code>new MemoryManager(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Memory Manager 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `memoryProviderProfileSchema` | 常量 | <code>const memoryProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "vector", "artifact", "hybrid"]&gt;; providerRef: z.ZodString; configSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"; providerRef: string; configSchema?: JsonSchema &#124; undefined; }, { id: string; type: "art...</code> | Memory Provider Profile 的运行时 Schema。 |
| `memoryRetrievalPolicySchema` | 常量 | <code>const memoryRetrievalPolicySchema: z.ZodObject&lt;{ defaultTopK: z.ZodOptional&lt;z.ZodNumber&gt;; vectorWeight: z.ZodOptional&lt;z.ZodNumber&gt;; textWeight: z.ZodOptional&lt;z.ZodNumber&gt;; requireScope: z.ZodOptional&lt;z.ZodBoolean&gt;; allowedTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { defaultTopK?: number &#124; undefined; vec...</code> | Memory Retrieval Policy 的运行时 Schema。 |
| `memorySpecDefinition` | 常量 | <code>const memorySpecDefinition: SpecSchemaDefinition&lt;MemorySpec&gt;</code> | Memory Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memorySpecDefinitions` | 常量 | <code>const memorySpecDefinitions: readonly [SpecSchemaDefinition&lt;MemorySpec&gt;]</code> | 由 `index` 模块导出的 Memory Spec Definitions 常量。 |
| `memorySpecExample` | 常量 | <code>const memorySpecExample: MemorySpec</code> | Memory Spec 的有效示例值。 |
| `memorySpecJsonSchema` | 常量 | <code>const memorySpecJsonSchema: JsonSchema</code> | Memory Spec 的 JSON Schema。 |
| `memorySpecJsonSchemas` | 常量 | <code>const memorySpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Memory Spec JSON Schemas 常量。 |
| `memorySpecSchema` | 常量 | <code>const memorySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "v...</code> | Memory Spec 的运行时 Schema。 |
| `memoryTypeSchema` | 常量 | <code>const memoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;</code> | Memory Type 的运行时 Schema。 |
| `validateMemorySpec` | 函数 | <code>validateMemorySpec(input: unknown): MemorySpec</code> | Validate Memory Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ArtifactMeta` | 接口 | <code>interface ArtifactMeta</code> | Artifact Meta 接口，共包含 4 个公开字段或方法。 |
| `ArtifactRef` | 接口 | <code>interface ArtifactRef</code> | Artifact Ref 接口，共包含 3 个公开字段或方法。 |
| `ArtifactStoreProvider` | 接口 | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider 接口，共包含 3 个公开字段或方法。 |
| `EmbeddingProvider` | 接口 | <code>interface EmbeddingProvider</code> | Embedding Provider 接口，共包含 1 个公开字段或方法。 |
| `MemoryAuditOptions` | 接口 | <code>interface MemoryAuditOptions</code> | Memory Audit Options 接口，共包含 2 个公开字段或方法。 |
| `MemoryAuditReport` | 接口 | <code>interface MemoryAuditReport</code> | Memory Audit Report 接口，共包含 3 个公开字段或方法。 |
| `MemoryManagerOptions` | 接口 | <code>interface MemoryManagerOptions</code> | Memory Manager Options 接口，共包含 4 个公开字段或方法。 |
| `MemoryManagerRecoveryOptions` | 接口 | <code>interface MemoryManagerRecoveryOptions</code> | Memory Manager Recovery Options 接口，共包含 5 个公开字段或方法。 |
| `MemoryProvider` | 接口 | <code>interface MemoryProvider</code> | Memory Provider 接口，共包含 7 个公开字段或方法。 |
| `MemoryProviderProfile` | 接口 | <code>interface MemoryProviderProfile</code> | Memory Provider Profile 接口，共包含 4 个公开字段或方法。 |
| `MemoryReadQuery` | 接口 | <code>interface MemoryReadQuery</code> | Memory Read Query 接口，共包含 3 个公开字段或方法。 |
| `MemoryRecord` | 接口 | <code>interface MemoryRecord</code> | Memory Record 接口，共包含 10 个公开字段或方法。 |
| `MemoryRetrievalPolicy` | 接口 | <code>interface MemoryRetrievalPolicy</code> | Memory Retrieval Policy 接口，共包含 5 个公开字段或方法。 |
| `MemoryScope` | 接口 | <code>interface MemoryScope</code> | Memory Scope 接口，共包含 4 个公开字段或方法。 |
| `MemorySearchQuery` | 接口 | <code>interface MemorySearchQuery</code> | Memory Search Query 接口，共包含 4 个公开字段或方法。 |
| `MemorySearchResult` | 接口 | <code>interface MemorySearchResult</code> | Memory Search Result 接口，共包含 3 个公开字段或方法。 |
| `MemorySpec` | 接口 | <code>interface MemorySpec extends VersionedSpec, SpecMetadata</code> | Memory Spec 接口，共包含 23 个公开字段或方法。 |
| `MemorySummary` | 接口 | <code>interface MemorySummary</code> | Memory Summary 接口，共包含 3 个公开字段或方法。 |
| `MemorySummaryOptions` | 接口 | <code>interface MemorySummaryOptions</code> | Memory Summary Options 接口，共包含 2 个公开字段或方法。 |
| `MemoryTraceContext` | 接口 | <code>interface MemoryTraceContext</code> | Memory Trace Context 接口，共包含 7 个公开字段或方法。 |
| `MemoryWritePolicy` | 接口 | <code>interface MemoryWritePolicy</code> | Memory Write Policy 接口，共包含 4 个公开字段或方法。 |
| `MemoryWriteResult` | 接口 | <code>interface MemoryWriteResult</code> | Memory Write Result 接口，共包含 3 个公开字段或方法。 |
| `StructuredQuery` | 接口 | <code>interface StructuredQuery</code> | Structured Query 接口，共包含 3 个公开字段或方法。 |
| `StructuredStoreProvider` | 接口 | <code>interface StructuredStoreProvider</code> | Structured Store Provider 接口，共包含 7 个公开字段或方法。 |
| `VectorIndexProvider` | 接口 | <code>interface VectorIndexProvider</code> | Vector Index Provider 接口，共包含 3 个公开字段或方法。 |
| `VectorQuery` | 接口 | <code>interface VectorQuery</code> | Vector Query 接口，共包含 3 个公开字段或方法。 |
| `VectorRecord` | 接口 | <code>interface VectorRecord</code> | Vector Record 接口，共包含 3 个公开字段或方法。 |
| `VectorSearchResult` | 接口 | <code>interface VectorSearchResult</code> | Vector Search Result 接口，共包含 3 个公开字段或方法。 |
| `MemoryType` | 类型 | <code>type MemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'artifact' &#124; 'governance'</code> | Memory Type 公共类型别名；完整类型表达式见声明。 |

## `MemoryManager`

Memory Manager 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryManager } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare class MemoryManager {
    constructor(provider: MemoryProvider | MemoryManagementProvider, options?: MemoryManagerOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
    get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest): Promise<MemoryListResult>;
    delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `audit` | 方法 | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt; &#124; search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt; &#124; update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `memoryProviderProfileSchema`

Memory Provider Profile 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryProviderProfileSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memoryProviderProfileSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["structured", "vector", "artifact", "hybrid"]>; providerRef: z.ZodString; configSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" | "structured" | "vector" | "hybrid"; providerRef: string; configSchema?: JsonSchema | undefined; }, { id: string; type: "artifact" | "structured" | "vector" | "hybrid"; providerRef: string; configSchema?: JsonSchema | undefined; }>;
```

## `memoryRetrievalPolicySchema`

Memory Retrieval Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRetrievalPolicySchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memoryRetrievalPolicySchema: z.ZodObject<{ defaultTopK: z.ZodOptional<z.ZodNumber>; vectorWeight: z.ZodOptional<z.ZodNumber>; textWeight: z.ZodOptional<z.ZodNumber>; requireScope: z.ZodOptional<z.ZodBoolean>; allowedTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["working", "episodic", "semantic", "procedural", "artifact", "governance"]>, "many">>; }, "strip", z.ZodTypeAny, { defaultTopK?: number | undefined; vectorWeight?: number | undefined; textWeight?: number | undefined; requireScope?: boolean | undefined; allowedTypes?: ("working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance")[] | undefined; }, { defaultTopK?: number | undefined; vectorWeight?: number | undefined; textWeight?: number | undefined; requireScope?: boolean | undefined; allowedTypes?: ("working" | "episodic" | "semantic" | "procedural" | "artifact" | "governance")[] | undefined; }>;
```

## `memorySpecDefinition`

Memory Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { memorySpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memorySpecDefinition: SpecSchemaDefinition<MemorySpec>;
```

## `memorySpecDefinitions`

由 `index` 模块导出的 Memory Spec Definitions 常量。

- 种类: 常量
- 导入: `import { memorySpecDefinitions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memorySpecDefinitions: readonly [SpecSchemaDefinition<MemorySpec>];
```

## `memorySpecExample`

Memory Spec 的有效示例值。

- 种类: 常量
- 导入: `import { memorySpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memorySpecExample: MemorySpec;
```

## `memorySpecJsonSchema`

Memory Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { memorySpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memorySpecJsonSchema: JsonSchema;
```

## `memorySpecJsonSchemas`

由 `index` 模块导出的 Memory Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { memorySpecJsonSchemas } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memorySpecJsonSchemas: Record<string, JsonSchema>;
```

## `memorySpecSchema`

Memory Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memorySpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const memorySpecSchema: (typeof import('@codesoul-co/hypha-memory'))['memorySpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `memoryTypeSchema`

Memory Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryTypeSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare const memoryTypeSchema: z.ZodEnum<["working", "episodic", "semantic", "procedural", "artifact", "governance"]>;
```

## `validateMemorySpec`

Validate Memory Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemorySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export declare function validateMemorySpec(input: unknown): MemorySpec;
```

### 调用签名

```text
validateMemorySpec(input: unknown): MemorySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemorySpec`
- 说明: 返回值契约由上述类型定义。

## `ArtifactMeta`

Artifact Meta 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactMeta } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface ArtifactMeta {
    contentType?: string;
    sizeBytes?: number;
    hash?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentType` | 属性 | <code>contentType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hash` | 属性 | <code>hash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRef`

Artifact Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface ArtifactRef {
    id: string;
    path: string;
    meta?: ArtifactMeta;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `meta` | 属性 | <code>meta?: ArtifactMeta</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactStoreProvider`

Artifact Store Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactStoreProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface ArtifactStoreProvider {
    put(path: string, content: Buffer | string, meta?: ArtifactMeta): Promise<ArtifactRef>;
    get(ref: ArtifactRef): Promise<Buffer>;
    delete(ref: ArtifactRef): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EmbeddingProvider`

Embedding Provider 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EmbeddingProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface EmbeddingProvider {
    embed(input: string[]): Promise<number[][]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryAuditOptions`

Memory Audit Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryAuditOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryAuditOptions {
    since?: string;
    until?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `since` | 属性 | <code>since?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `until` | 属性 | <code>until?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryAuditReport`

Memory Audit Report 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryAuditReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryAuditReport {
    scope: MemoryScope;
    recordsChecked: number;
    missingProvenance: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `missingProvenance` | 属性 | <code>missingProvenance: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordsChecked` | 属性 | <code>recordsChecked: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagerOptions`

Memory Manager Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryManagerOptions {
    trace?: TraceRecorder;
    traceContext?: MemoryTraceContext;
    now?: () => string;
    recovery?: MemoryManagerRecoveryOptions;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recovery` | 属性 | <code>recovery?: MemoryManagerRecoveryOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceContext` | 属性 | <code>traceContext?: MemoryTraceContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagerRecoveryOptions`

Memory Manager Recovery Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagerRecoveryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryManagerRecoveryOptions {
    providerId?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    onFailure?: (failure: RecoveryFailure) => void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onFailure` | 方法 | <code>onFailure?(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProvider`

Memory Provider 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryProvider {
    read(scope: MemoryScope, query: MemoryReadQuery): Promise<MemoryRecord[]>;
    search(scope: MemoryScope, query: MemorySearchQuery): Promise<MemorySearchResult[]>;
    write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise<MemoryWriteResult>;
    update(scope: MemoryScope, recordId: string, patch: Partial<MemoryRecord>): Promise<void>;
    invalidate(scope: MemoryScope, recordId: string, reason: string): Promise<void>;
    summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise<MemorySummary>;
    audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise<MemoryAuditReport>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `audit` | 方法 | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProviderProfile`

Memory Provider Profile 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderProfile } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryProviderProfile {
    id: string;
    type: 'structured' | 'vector' | 'artifact' | 'hybrid';
    providerRef: string;
    configSchema?: JsonSchema;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `configSchema` | 属性 | <code>configSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryReadQuery`

Memory Read Query 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryReadQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryReadQuery {
    ids?: string[];
    type?: MemoryType;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ids` | 属性 | <code>ids?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: MemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecord`

Memory Record 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryRecord<TValue = unknown> {
    id: string;
    type: MemoryType;
    value: TValue;
    source?: string;
    confidence?: number;
    provenance: Record<string, unknown>;
    visibility?: 'private' | 'workspace' | 'public';
    expiresAt?: string;
    createdAt: string;
    updatedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: MemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: TValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility?: "workspace" &#124; "private" &#124; "public"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalPolicy`

Memory Retrieval Policy 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalPolicy } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryRetrievalPolicy {
    defaultTopK?: number;
    vectorWeight?: number;
    textWeight?: number;
    requireScope?: boolean;
    allowedTypes?: MemoryType[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTypes` | 属性 | <code>allowedTypes?: MemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTopK` | 属性 | <code>defaultTopK?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireScope` | 属性 | <code>requireScope?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `textWeight` | 属性 | <code>textWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorWeight` | 属性 | <code>vectorWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryScope`

Memory Scope 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryScope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryScope {
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    userId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchQuery`

Memory Search Query 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemorySearchQuery {
    text?: string;
    vector?: number[];
    type?: MemoryType;
    topK?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `text` | 属性 | <code>text?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: MemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector?: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchResult`

Memory Search Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemorySearchResult {
    record: MemoryRecord;
    score?: number;
    provenance: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: MemoryRecord&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySpec`

Memory Spec 接口，共包含 23 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemorySpec extends VersionedSpec, SpecMetadata {
    providers: MemoryProviderProfile[];
    memoryTypes: MemoryType[];
    structuredStoreRef?: string;
    vectorIndexRef?: string;
    artifactStoreRef?: string;
    embeddingProviderRef?: string;
    readPolicy?: string;
    writePolicy?: string;
    freshnessPolicy?: string;
    provenancePolicy?: 'required' | 'best_effort';
    retentionPolicy?: string;
    privacyPolicy?: string;
    retrievalStrategy?: string;
    retrievalPolicy?: MemoryRetrievalPolicy;
    writePolicyConfig?: MemoryWritePolicy;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStoreRef` | 属性 | <code>artifactStoreRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingProviderRef` | 属性 | <code>embeddingProviderRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `freshnessPolicy` | 属性 | <code>freshnessPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTypes` | 属性 | <code>memoryTypes: MemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `privacyPolicy` | 属性 | <code>privacyPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenancePolicy` | 属性 | <code>provenancePolicy?: "required" &#124; "best_effort"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providers` | 属性 | <code>providers: MemoryProviderProfile[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readPolicy` | 属性 | <code>readPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrievalPolicy` | 属性 | <code>retrievalPolicy?: MemoryRetrievalPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrievalStrategy` | 属性 | <code>retrievalStrategy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structuredStoreRef` | 属性 | <code>structuredStoreRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorIndexRef` | 属性 | <code>vectorIndexRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePolicy` | 属性 | <code>writePolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePolicyConfig` | 属性 | <code>writePolicyConfig?: MemoryWritePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySummary`

Memory Summary 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySummary } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemorySummary {
    scope: MemoryScope;
    recordCount: number;
    types: Partial<Record<MemoryType, number>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recordCount` | 属性 | <code>recordCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `types` | 属性 | <code>types: Partial&lt;Record&lt;MemoryType, number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySummaryOptions`

Memory Summary Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySummaryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemorySummaryOptions {
    type?: MemoryType;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: MemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryTraceContext`

Memory Trace Context 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryTraceContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryTraceContext {
    runId?: string;
    stepId?: string;
    sessionId?: string;
    userId?: string;
    agentId?: string;
    workspaceId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryWritePolicy`

Memory Write Policy 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryWritePolicy } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryWritePolicy {
    allowLongTerm?: boolean;
    requireProvenance?: boolean;
    decision?: PolicyDecision;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowLongTerm` | 属性 | <code>allowLongTerm?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision?: PolicyDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireProvenance` | 属性 | <code>requireProvenance?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryWriteResult`

Memory Write Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryWriteResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface MemoryWriteResult {
    recordId: string;
    vectorIndexed?: boolean;
    artifactRef?: ArtifactRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef?: ArtifactRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordId` | 属性 | <code>recordId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorIndexed` | 属性 | <code>vectorIndexed?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StructuredQuery`

Structured Query 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface StructuredQuery {
    where?: Record<string, unknown>;
    limit?: number;
    orderBy?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `orderBy` | 属性 | <code>orderBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `where` | 属性 | <code>where?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StructuredStoreProvider`

Structured Store Provider 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredStoreProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface StructuredStoreProvider {
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
        id: string;
    }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    compareAndSet?<T>(table: string, id: string, expected: Partial<T>, patch: Partial<T>): Promise<boolean>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(fn: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compareAndSet` | 方法 | <code>compareAndSet?&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VectorIndexProvider`

Vector Index Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorIndexProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface VectorIndexProvider {
    upsert(records: VectorRecord[]): Promise<void>;
    search(query: VectorQuery): Promise<VectorSearchResult[]>;
    delete(ids: string[]): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VectorQuery`

Vector Query 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface VectorQuery {
    vector: number[];
    topK: number;
    filter?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VectorRecord`

Vector Record 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface VectorRecord {
    id: string;
    vector: number[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VectorSearchResult`

Vector Search Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorSearchResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export interface VectorSearchResult {
    id: string;
    score: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryType`

Memory Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)

### 声明

```text
export type MemoryType = 'working' | 'episodic' | 'semantic' | 'procedural' | 'artifact' | 'governance';
```
