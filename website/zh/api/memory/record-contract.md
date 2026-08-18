# `@codesoul-co/hypha-memory` / `record-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/record-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)
- 导出数: **14**

## 模块用法

用于声明并运行时校验契约。Record contract 模块公开 13 常量、1 函数。

### 从包入口导入

```ts
import {
  managedMemoryRecordExample,
  managedMemoryRecordSchema,
  managedMemoryScopeSchema,
  managedMemoryTypeSchema,
  memoryEntityRefSchema,
  memoryIndexStatusSchema,
  memoryPrincipalSchema,
  memoryProvenanceSchema,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { managedMemoryRecordSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemoryRecordSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `managedMemoryRecordExample` | 常量 | <code>const managedMemoryRecordExample: ManagedMemoryRecord&lt;unknown&gt;</code> | Managed Memory Record 的有效示例值。 |
| `managedMemoryRecordSchema` | 常量 | <code>const managedMemoryRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; language: z.ZodOption...</code> | Managed Memory Record 的运行时 Schema。 |
| `managedMemoryScopeSchema` | 常量 | <code>const managedMemoryScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { userId: string; workspaceId?: string &#124; undefined; s...</code> | Managed Memory Scope 的运行时 Schema。 |
| `managedMemoryTypeSchema` | 常量 | <code>const managedMemoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;</code> | Managed Memory Type 的运行时 Schema。 |
| `memoryEntityRefSchema` | 常量 | <code>const memoryEntityRefSchema: z.ZodObject&lt;{ entityId: z.ZodString; label: z.ZodOptional&lt;z.ZodString&gt;; type: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { entityId: string; type?: string &#124; undefined; confidence?: number &#124; undefined; label?: string &#124; undefined; }, { entityId: string; type?: string &#124; undefined; confidence?: number &#124; undefined; label?: string &#124; undefine...</code> | Memory Entity Ref 的运行时 Schema。 |
| `memoryIndexStatusSchema` | 常量 | <code>const memoryIndexStatusSchema: z.ZodObject&lt;{ state: z.ZodEnum&lt;["none", "pending", "indexing", "indexed", "partial", "failed", "deleted"]&gt;; attempts: z.ZodNumber; lastAttemptAt: z.ZodOptional&lt;z.ZodString&gt;; lastError: z.ZodOptional&lt;z.ZodType&lt;NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError&gt;&gt;; }, "strip", z.ZodTypeAny, { state: "none" &#124; "pending" &#124; "failed" &#124; "deleted" &#124; "partial" &#124; "indexing" &#124; "indexed"; ...</code> | Memory Index Status 的运行时 Schema。 |
| `memoryPrincipalSchema` | 常量 | <code>const memoryPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip...</code> | Memory Principal 的运行时 Schema。 |
| `memoryProvenanceSchema` | 常量 | <code>const memoryProvenanceSchema: z.ZodObject&lt;{ createdBy: z.ZodString; providerId: z.ZodString; extractorVersion: z.ZodOptional&lt;z.ZodString&gt;; sourceEventIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; sourceMemoryIds: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; transformation: z.ZodOptional&lt;z.ZodString&gt;; humanDecisionId: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; metadata: z.ZodOptional&lt;z.ZodRecord&lt;...</code> | Memory Provenance 的运行时 Schema。 |
| `memoryRelationSchema` | 常量 | <code>const memoryRelationSchema: z.ZodObject&lt;{ type: z.ZodEnum&lt;["supports", "contradicts", "supersedes", "derived_from", "related_to", "same_as", "part_of"]&gt;; targetMemoryId: z.ZodString; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { type: "supersedes" &#124; "supports" &#124; "contradicts" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_o...</code> | Memory Relation 的运行时 Schema。 |
| `memorySourceSchema` | 常量 | <code>const memorySourceSchema: z.ZodObject&lt;{ type: z.ZodEnum&lt;["user_message", "assistant_message", "tool_result", "artifact", "workflow_state", "human_review", "import", "derived", "system"]&gt;; sourceId: z.ZodOptional&lt;z.ZodString&gt;; sourceEventId: z.ZodOptional&lt;z.ZodString&gt;; sourceRunId: z.ZodOptional&lt;z.ZodString&gt;; sourceMessageId: z.ZodOptional&lt;z.ZodString&gt;; sourceArtifactId: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.Zo...</code> | Memory Source 的运行时 Schema。 |
| `memoryStatusSchema` | 常量 | <code>const memoryStatusSchema: z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "deleted", "failed"]&gt;</code> | Memory Status 的运行时 Schema。 |
| `memoryVectorRefSchema` | 常量 | <code>const memoryVectorRefSchema: z.ZodObject&lt;{ vectorStoreId: z.ZodString; indexName: z.ZodString; vectorId: z.ZodString; embeddingProviderId: z.ZodString; embeddingModel: z.ZodString; embeddingRevision: z.ZodOptional&lt;z.ZodString&gt;; dimensions: z.ZodOptional&lt;z.ZodNumber&gt;; indexedAt: z.ZodString; }, "strip", z.ZodTypeAny, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddin...</code> | Memory Vector Ref 的运行时 Schema。 |
| `normalizedMemoryErrorSchema` | 常量 | <code>const normalizedMemoryErrorSchema: z.ZodType&lt;NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError&gt;</code> | Normalized Memory Error 的运行时 Schema。 |
| `validateManagedMemoryRecord` | 函数 | <code>validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord</code> | Validate Managed Memory Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `managedMemoryRecordExample`

Managed Memory Record 的有效示例值。

- 种类: 常量
- 导入: `import { managedMemoryRecordExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const managedMemoryRecordExample: ManagedMemoryRecord<unknown>;
```

## `managedMemoryRecordSchema`

Managed Memory Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemoryRecordSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const managedMemoryRecordSchema: (typeof import('@codesoul-co/hypha-memory'))['managedMemoryRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `managedMemoryScopeSchema`

Managed Memory Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemoryScopeSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const managedMemoryScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; projectId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; projectId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `managedMemoryTypeSchema`

Managed Memory Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemoryTypeSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const managedMemoryTypeSchema: z.ZodEnum<["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]>;
```

## `memoryEntityRefSchema`

Memory Entity Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryEntityRefSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryEntityRefSchema: z.ZodObject<{ entityId: z.ZodString; label: z.ZodOptional<z.ZodString>; type: z.ZodOptional<z.ZodString>; confidence: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }, { entityId: string; type?: string | undefined; confidence?: number | undefined; label?: string | undefined; }>;
```

## `memoryIndexStatusSchema`

Memory Index Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryIndexStatusSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryIndexStatusSchema: z.ZodObject<{ state: z.ZodEnum<["none", "pending", "indexing", "indexed", "partial", "failed", "deleted"]>; attempts: z.ZodNumber; lastAttemptAt: z.ZodOptional<z.ZodString>; lastError: z.ZodOptional<z.ZodType<NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError>>; }, "strip", z.ZodTypeAny, { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }, { state: "none" | "pending" | "failed" | "deleted" | "partial" | "indexing" | "indexed"; attempts: number; lastError?: NormalizedMemoryError | undefined; lastAttemptAt?: string | undefined; }>;
```

## `memoryPrincipalSchema`

Memory Principal 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryPrincipalSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryPrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "system" | "user" | "agent" | "service"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; userId?: string | undefined; tenantId?: string | undefined; agentId?: string | undefined; roles?: string[] | undefined; }, { type: "system" | "user" | "agent" | "service"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; userId?: string | undefined; tenantId?: string | undefined; agentId?: string | undefined; roles?: string[] | undefined; }>;
```

## `memoryProvenanceSchema`

Memory Provenance 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryProvenanceSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryProvenanceSchema: z.ZodObject<{ createdBy: z.ZodString; providerId: z.ZodString; extractorVersion: z.ZodOptional<z.ZodString>; sourceEventIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; sourceMemoryIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; transformation: z.ZodOptional<z.ZodString>; humanDecisionId: z.ZodOptional<z.ZodString>; createdAt: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }, { createdAt: string; providerId: string; createdBy: string; metadata?: Record<string, unknown> | undefined; extractorVersion?: string | undefined; sourceEventIds?: string[] | undefined; sourceMemoryIds?: string[] | undefined; transformation?: string | undefined; humanDecisionId?: string | undefined; }>;
```

## `memoryRelationSchema`

Memory Relation 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRelationSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryRelationSchema: z.ZodObject<{ type: z.ZodEnum<["supports", "contradicts", "supersedes", "derived_from", "related_to", "same_as", "part_of"]>; targetMemoryId: z.ZodString; confidence: z.ZodOptional<z.ZodNumber>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }, { type: "supersedes" | "supports" | "contradicts" | "derived_from" | "related_to" | "same_as" | "part_of"; targetMemoryId: string; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; }>;
```

## `memorySourceSchema`

Memory Source 的运行时 Schema。

- 种类: 常量
- 导入: `import { memorySourceSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memorySourceSchema: z.ZodObject<{ type: z.ZodEnum<["user_message", "assistant_message", "tool_result", "artifact", "workflow_state", "human_review", "import", "derived", "system"]>; sourceId: z.ZodOptional<z.ZodString>; sourceEventId: z.ZodOptional<z.ZodString>; sourceRunId: z.ZodOptional<z.ZodString>; sourceMessageId: z.ZodOptional<z.ZodString>; sourceArtifactId: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }, { type: "artifact" | "human_review" | "user_message" | "assistant_message" | "tool_result" | "workflow_state" | "import" | "derived" | "system"; sourceId?: string | undefined; sourceEventId?: string | undefined; sourceRunId?: string | undefined; sourceMessageId?: string | undefined; sourceArtifactId?: string | undefined; }>;
```

## `memoryStatusSchema`

Memory Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryStatusSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryStatusSchema: z.ZodEnum<["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "deleted", "failed"]>;
```

## `memoryVectorRefSchema`

Memory Vector Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryVectorRefSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const memoryVectorRefSchema: z.ZodObject<{ vectorStoreId: z.ZodString; indexName: z.ZodString; vectorId: z.ZodString; embeddingProviderId: z.ZodString; embeddingModel: z.ZodString; embeddingRevision: z.ZodOptional<z.ZodString>; dimensions: z.ZodOptional<z.ZodNumber>; indexedAt: z.ZodString; }, "strip", z.ZodTypeAny, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }, { vectorStoreId: string; indexName: string; vectorId: string; embeddingProviderId: string; embeddingModel: string; indexedAt: string; embeddingRevision?: string | undefined; dimensions?: number | undefined; }>;
```

## `normalizedMemoryErrorSchema`

Normalized Memory Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedMemoryErrorSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare const normalizedMemoryErrorSchema: z.ZodType<NormalizedMemoryError, z.ZodTypeDef, NormalizedMemoryError>;
```

## `validateManagedMemoryRecord`

Validate Managed Memory Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateManagedMemoryRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`record-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/record-contract.ts)

### 声明

```text
export declare function validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord;
```

### 调用签名

```text
validateManagedMemoryRecord(input: unknown): ManagedMemoryRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ManagedMemoryRecord<unknown>`
- 说明: 返回值契约由上述类型定义。
