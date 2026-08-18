# `@codesoul-co/hypha-storage` / `index`

- 包索引: [`@codesoul-co/hypha-storage`](/zh/api/storage)
- 源码: [`packages/storage/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)
- 导出数: **46**

## 模块用法

聚合 `@codesoul-co/hypha-storage` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  storageCapabilitySchema,
  storageConnectionSpecSchema,
  storageDeploymentModeSchema,
  storageEngineSchema,
  storageProviderKindSchema,
  storageProviderProfileDefinition,
  storageProviderProfileExample,
  storageProviderProfileJsonSchema,
} from '@codesoul-co/hypha-storage';

import type {
  ResolvedStorageConnection,
  StorageConnectionSpec,
  StorageProviderProfile,
  StorageSecretRef,
  StorageTopologySpec,
  EnvSource,
  StorageCapability,
  StorageDeploymentMode,
} from '@codesoul-co/hypha-storage';

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 17 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 17 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { storageCapabilitySchema } from '@codesoul-co/hypha-storage';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = storageCapabilitySchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `storageCapabilitySchema` | 常量 | <code>const storageCapabilitySchema: z.ZodEnum&lt;["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]&gt;</code> | Storage Capability 的运行时 Schema。 |
| `storageConnectionSpecSchema` | 常量 | <code>const storageConnectionSpecSchema: z.ZodObject&lt;{ uri: z.ZodOptional&lt;z.ZodString&gt;; uriEnv: z.ZodOptional&lt;z.ZodString&gt;; host: z.ZodOptional&lt;z.ZodString&gt;; port: z.ZodOptional&lt;z.ZodNumber&gt;; database: z.ZodOptional&lt;z.ZodString&gt;; username: z.ZodOptional&lt;z.ZodString&gt;; usernameEnv: z.ZodOptional&lt;z.ZodString&gt;; passwordEnv: z.ZodOptional&lt;z.ZodString&gt;; tls: z.ZodOptional&lt;z.ZodBoolean&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; opt...</code> | Storage Connection Spec 的运行时 Schema。 |
| `storageDeploymentModeSchema` | 常量 | <code>const storageDeploymentModeSchema: z.ZodEnum&lt;["local", "self_hosted", "managed", "cloud"]&gt;</code> | Storage Deployment Mode 的运行时 Schema。 |
| `storageEngineSchema` | 常量 | <code>const storageEngineSchema: z.ZodEnum&lt;["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]&gt;</code> | Storage Engine 的运行时 Schema。 |
| `storageProviderKindSchema` | 常量 | <code>const storageProviderKindSchema: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]&gt;</code> | Storage Provider Kind 的运行时 Schema。 |
| `storageProviderProfileDefinition` | 常量 | <code>const storageProviderProfileDefinition: SpecSchemaDefinition&lt;StorageProviderProfile&gt;</code> | 由 `index` 模块导出的 Storage Provider Profile Definition 常量。 |
| `storageProviderProfileExample` | 常量 | <code>const storageProviderProfileExample: StorageProviderProfile</code> | Storage Provider Profile 的有效示例值。 |
| `storageProviderProfileJsonSchema` | 常量 | <code>const storageProviderProfileJsonSchema: JsonSchema</code> | Storage Provider Profile 的 JSON Schema。 |
| `storageProviderProfileSchema` | 常量 | <code>const storageProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { kind: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector",...</code> | Storage Provider Profile 的运行时 Schema。 |
| `storageRoleSchema` | 常量 | <code>const storageRoleSchema: z.ZodEnum&lt;["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]&gt;</code> | Storage Role 的运行时 Schema。 |
| `storageSecretRefSchema` | 常量 | <code>const storageSecretRefSchema: z.ZodObject&lt;{ env: z.ZodOptional&lt;z.ZodString&gt;; secretRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }&gt;</code> | Storage Secret Ref 的运行时 Schema。 |
| `storageSpecDefinitions` | 常量 | <code>const storageSpecDefinitions: readonly [SpecSchemaDefinition&lt;StorageProviderProfile&gt;, SpecSchemaDefinition&lt;StorageTopologySpec&gt;]</code> | 由 `index` 模块导出的 Storage Spec Definitions 常量。 |
| `storageSpecJsonSchemas` | 常量 | <code>const storageSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Storage Spec JSON Schemas 常量。 |
| `storageTopologySpecDefinition` | 常量 | <code>const storageTopologySpecDefinition: SpecSchemaDefinition&lt;StorageTopologySpec&gt;</code> | Storage Topology Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `storageTopologySpecExample` | 常量 | <code>const storageTopologySpecExample: StorageTopologySpec</code> | Storage Topology Spec 的有效示例值。 |
| `storageTopologySpecJsonSchema` | 常量 | <code>const storageTopologySpecJsonSchema: JsonSchema</code> | Storage Topology Spec 的 JSON Schema。 |
| `storageTopologySpecSchema` | 常量 | <code>const storageTopologySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } ...</code> | Storage Topology Spec 的运行时 Schema。 |
| `assertStorageCapability` | 函数 | <code>assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void</code> | Assert Storage Capability 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createChromaStorageProfile` | 函数 | <code>createChromaStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Chroma Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createFileArtifactStorageProfile` | 函数 | <code>createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile</code> | Create File Artifact Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createKafkaStorageProfile` | 函数 | <code>createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile</code> | Create Kafka Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createLocalVectorStorageProfile` | 函数 | <code>createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile</code> | Create Local Vector Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createMongoStorageProfile` | 函数 | <code>createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Create Mongo Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createPineconeStorageProfile` | 函数 | <code>createPineconeStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Pinecone Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createQdrantStorageProfile` | 函数 | <code>createQdrantStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Qdrant Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createRedisStorageProfile` | 函数 | <code>createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Create Redis Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createSQLiteStorageProfile` | 函数 | <code>createSQLiteStorageProfile(input?: { id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }): StorageProviderProfile</code> | Create SQLite Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createVectorStorageProfile` | 函数 | <code>createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }): StorageProviderProfile</code> | Create Vector Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createWeaviateStorageProfile` | 函数 | <code>createWeaviateStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Weaviate Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `inferStorageDeployment` | 函数 | <code>inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode</code> | Infer Storage Deployment 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `redactStorageConnection` | 函数 | <code>redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection</code> | Redact Storage Connection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveStorageConnection` | 函数 | <code>resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection</code> | Resolve Storage Connection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStorageProviderProfile` | 函数 | <code>validateStorageProviderProfile(input: unknown): StorageProviderProfile</code> | Validate Storage Provider Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStorageTopologySpec` | 函数 | <code>validateStorageTopologySpec(input: unknown): StorageTopologySpec</code> | Validate Storage Topology Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ResolvedStorageConnection` | 接口 | <code>interface ResolvedStorageConnection</code> | Resolved Storage Connection 接口，共包含 12 个公开字段或方法。 |
| `StorageConnectionSpec` | 接口 | <code>interface StorageConnectionSpec</code> | Storage Connection Spec 接口，共包含 11 个公开字段或方法。 |
| `StorageProviderProfile` | 接口 | <code>interface StorageProviderProfile extends VersionedSpec, SpecMetadata</code> | Storage Provider Profile 接口，共包含 17 个公开字段或方法。 |
| `StorageSecretRef` | 接口 | <code>interface StorageSecretRef</code> | Storage Secret Ref 接口，共包含 2 个公开字段或方法。 |
| `StorageTopologySpec` | 接口 | <code>interface StorageTopologySpec extends VersionedSpec, SpecMetadata</code> | Storage Topology Spec 接口，共包含 10 个公开字段或方法。 |
| `EnvSource` | 类型 | <code>type EnvSource = Record&lt;string, string &#124; undefined&gt;</code> | Env Source 公共类型别名；完整类型表达式见声明。 |
| `StorageCapability` | 类型 | <code>type StorageCapability = 'structured' &#124; 'transactions' &#124; 'events' &#124; 'cache' &#124; 'queue' &#124; 'pubsub' &#124; 'streams' &#124; 'vector_search' &#124; 'metadata_filter' &#124; 'artifact_bytes' &#124; 'managed_backup' &#124; 'tls' &#124; 'multi_region'</code> | Storage Capability 公共类型别名；完整类型表达式见声明。 |
| `StorageDeploymentMode` | 类型 | <code>type StorageDeploymentMode = 'local' &#124; 'self_hosted' &#124; 'managed' &#124; 'cloud'</code> | Storage Deployment Mode 公共类型别名；完整类型表达式见声明。 |
| `StorageEngine` | 类型 | <code>type StorageEngine = 'sqlite' &#124; 'postgres' &#124; 'mysql' &#124; 'mongodb' &#124; 'redis' &#124; 'kafka' &#124; 'local-vector' &#124; 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate' &#124; 'file-artifact' &#124; 's3' &#124; 'gcs' &#124; 'azure-blob' &#124; 'json'</code> | Storage Engine 公共类型别名；完整类型表达式见声明。 |
| `StorageProviderKind` | 类型 | <code>type StorageProviderKind = 'relational' &#124; 'document' &#124; 'messaging' &#124; 'cache' &#124; 'vector' &#124; 'object' &#124; 'event' &#124; 'hybrid'</code> | Storage Provider Kind 公共类型别名；完整类型表达式见声明。 |
| `StorageRole` | 类型 | <code>type StorageRole = 'source_of_truth' &#124; 'event_log' &#124; 'semantic_index' &#124; 'cache' &#124; 'message_queue' &#124; 'artifact_store' &#124; 'document_store' &#124; 'hybrid_memory'</code> | Storage Role 公共类型别名；完整类型表达式见声明。 |
| `VectorStorageEngine` | 类型 | <code>type VectorStorageEngine = Extract&lt;StorageEngine, 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate'&gt;</code> | Vector Storage Engine 公共类型别名；完整类型表达式见声明。 |

## `storageCapabilitySchema`

Storage Capability 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageCapabilitySchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageCapabilitySchema: z.ZodEnum<["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]>;
```

## `storageConnectionSpecSchema`

Storage Connection Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageConnectionSpecSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageConnectionSpecSchema: z.ZodObject<{ uri: z.ZodOptional<z.ZodString>; uriEnv: z.ZodOptional<z.ZodString>; host: z.ZodOptional<z.ZodString>; port: z.ZodOptional<z.ZodNumber>; database: z.ZodOptional<z.ZodString>; username: z.ZodOptional<z.ZodString>; usernameEnv: z.ZodOptional<z.ZodString>; passwordEnv: z.ZodOptional<z.ZodString>; tls: z.ZodOptional<z.ZodBoolean>; region: z.ZodOptional<z.ZodString>; options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { tls?: boolean | undefined; options?: Record<string, unknown> | undefined; uri?: string | undefined; uriEnv?: string | undefined; host?: string | undefined; port?: number | undefined; database?: string | undefined; username?: string | undefined; usernameEnv?: string | undefined; passwordEnv?: string | undefined; region?: string | undefined; }, { tls?: boolean | undefined; options?: Record<string, unknown> | undefined; uri?: string | undefined; uriEnv?: string | undefined; host?: string | undefined; port?: number | undefined; database?: string | undefined; username?: string | undefined; usernameEnv?: string | undefined; passwordEnv?: string | undefined; region?: string | undefined; }>;
```

## `storageDeploymentModeSchema`

Storage Deployment Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageDeploymentModeSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageDeploymentModeSchema: z.ZodEnum<["local", "self_hosted", "managed", "cloud"]>;
```

## `storageEngineSchema`

Storage Engine 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageEngineSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageEngineSchema: z.ZodEnum<["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]>;
```

## `storageProviderKindSchema`

Storage Provider Kind 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageProviderKindSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageProviderKindSchema: z.ZodEnum<["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]>;
```

## `storageProviderProfileDefinition`

由 `index` 模块导出的 Storage Provider Profile Definition 常量。

- 种类: 常量
- 导入: `import { storageProviderProfileDefinition } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageProviderProfileDefinition: SpecSchemaDefinition<StorageProviderProfile>;
```

## `storageProviderProfileExample`

Storage Provider Profile 的有效示例值。

- 种类: 常量
- 导入: `import { storageProviderProfileExample } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageProviderProfileExample: StorageProviderProfile;
```

## `storageProviderProfileJsonSchema`

Storage Provider Profile 的 JSON Schema。

- 种类: 常量
- 导入: `import { storageProviderProfileJsonSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageProviderProfileJsonSchema: JsonSchema;
```

## `storageProviderProfileSchema`

Storage Provider Profile 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageProviderProfileSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const storageProviderProfileSchema: (typeof import('@codesoul-co/hypha-storage'))['storageProviderProfileSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `storageRoleSchema`

Storage Role 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageRoleSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageRoleSchema: z.ZodEnum<["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]>;
```

## `storageSecretRefSchema`

Storage Secret Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageSecretRefSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageSecretRefSchema: z.ZodObject<{ env: z.ZodOptional<z.ZodString>; secretRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { env?: string | undefined; secretRef?: string | undefined; }, { env?: string | undefined; secretRef?: string | undefined; }>;
```

## `storageSpecDefinitions`

由 `index` 模块导出的 Storage Spec Definitions 常量。

- 种类: 常量
- 导入: `import { storageSpecDefinitions } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageSpecDefinitions: readonly [SpecSchemaDefinition<StorageProviderProfile>, SpecSchemaDefinition<StorageTopologySpec>];
```

## `storageSpecJsonSchemas`

由 `index` 模块导出的 Storage Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { storageSpecJsonSchemas } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageSpecJsonSchemas: Record<string, JsonSchema>;
```

## `storageTopologySpecDefinition`

Storage Topology Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { storageTopologySpecDefinition } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageTopologySpecDefinition: SpecSchemaDefinition<StorageTopologySpec>;
```

## `storageTopologySpecExample`

Storage Topology Spec 的有效示例值。

- 种类: 常量
- 导入: `import { storageTopologySpecExample } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageTopologySpecExample: StorageTopologySpec;
```

## `storageTopologySpecJsonSchema`

Storage Topology Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { storageTopologySpecJsonSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare const storageTopologySpecJsonSchema: JsonSchema;
```

## `storageTopologySpecSchema`

Storage Topology Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { storageTopologySpecSchema } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const storageTopologySpecSchema: (typeof import('@codesoul-co/hypha-storage'))['storageTopologySpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `assertStorageCapability`

Assert Storage Capability 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertStorageCapability } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void;
```

### 调用签名

```text
assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `capability` | <code>StorageCapability</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `createChromaStorageProfile`

Create Chroma Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createChromaStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createChromaStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### 调用签名

```text
createChromaStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createFileArtifactStorageProfile`

Create File Artifact Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createFileArtifactStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createFileArtifactStorageProfile(input?: {
    id?: string;
    uri?: string;
    rootPath?: string;
}): StorageProviderProfile;
```

### 调用签名

```text
createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; uri?: string; rootPath?: string; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createKafkaStorageProfile`

Create Kafka Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createKafkaStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createKafkaStorageProfile(input?: {
    id?: string;
    deployment?: StorageDeploymentMode;
    uriEnv?: string;
    uri?: string;
    host?: string;
    port?: number;
    tls?: boolean;
    region?: string;
}): StorageProviderProfile;
```

### 调用签名

```text
createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createLocalVectorStorageProfile`

Create Local Vector Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createLocalVectorStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createLocalVectorStorageProfile(input?: {
    id?: string;
    uri?: string;
    database?: string;
}): StorageProviderProfile;
```

### 调用签名

```text
createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; uri?: string; database?: string; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createMongoStorageProfile`

Create Mongo Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMongoStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createMongoStorageProfile(input?: {
    id?: string;
    deployment?: StorageDeploymentMode;
    uriEnv?: string;
    uri?: string;
    host?: string;
    port?: number;
    database?: string;
    tls?: boolean;
}): StorageProviderProfile;
```

### 调用签名

```text
createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createPineconeStorageProfile`

Create Pinecone Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createPineconeStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createPineconeStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### 调用签名

```text
createPineconeStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createQdrantStorageProfile`

Create Qdrant Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createQdrantStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createQdrantStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### 调用签名

```text
createQdrantStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createRedisStorageProfile`

Create Redis Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRedisStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createRedisStorageProfile(input?: {
    id?: string;
    deployment?: StorageDeploymentMode;
    uriEnv?: string;
    uri?: string;
    host?: string;
    port?: number;
    database?: string;
    tls?: boolean;
}): StorageProviderProfile;
```

### 调用签名

```text
createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createSQLiteStorageProfile`

Create SQLite Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createSQLiteStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createSQLiteStorageProfile(input?: {
    id?: string;
    role?: Extract<StorageRole, 'source_of_truth' | 'event_log'>;
    uri?: string;
    database?: string;
}): StorageProviderProfile;
```

### 调用签名

```text
createSQLiteStorageProfile(input?: { id?: string; role?: Extract<StorageRole, "source_of_truth" | "event_log">; uri?: string; database?: string; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createVectorStorageProfile`

Create Vector Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createVectorStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createVectorStorageProfile(input: {
    engine: VectorStorageEngine;
    id?: string;
    deployment?: StorageDeploymentMode;
    uriEnv?: string;
    uri?: string;
    host?: string;
    port?: number;
    database?: string;
    tls?: boolean;
    region?: string;
    apiKeyEnv?: string;
    options?: Record<string, unknown>;
}): StorageProviderProfile;
```

### 调用签名

```text
createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record<string, unknown>; }): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `createWeaviateStorageProfile`

Create Weaviate Storage Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createWeaviateStorageProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function createWeaviateStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### 调用签名

```text
createWeaviateStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `inferStorageDeployment`

Infer Storage Deployment 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { inferStorageDeployment } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode;
```

### 调用签名

```text
inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `uri` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageDeploymentMode`
- 说明: 返回值契约由上述类型定义。

## `redactStorageConnection`

Redact Storage Connection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { redactStorageConnection } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection;
```

### 调用签名

```text
redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `connection` | <code>ResolvedStorageConnection</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResolvedStorageConnection`
- 说明: 返回值契约由上述类型定义。

## `resolveStorageConnection`

Resolve Storage Connection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveStorageConnection } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection;
```

### 调用签名

```text
resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `env` | <code>EnvSource</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResolvedStorageConnection`
- 说明: 返回值契约由上述类型定义。

## `validateStorageProviderProfile`

Validate Storage Provider Profile 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStorageProviderProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function validateStorageProviderProfile(input: unknown): StorageProviderProfile;
```

### 调用签名

```text
validateStorageProviderProfile(input: unknown): StorageProviderProfile
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageProviderProfile`
- 说明: 返回值契约由上述类型定义。

## `validateStorageTopologySpec`

Validate Storage Topology Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStorageTopologySpec } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export declare function validateStorageTopologySpec(input: unknown): StorageTopologySpec;
```

### 调用签名

```text
validateStorageTopologySpec(input: unknown): StorageTopologySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StorageTopologySpec`
- 说明: 返回值契约由上述类型定义。

## `ResolvedStorageConnection`

Resolved Storage Connection 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedStorageConnection } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export interface ResolvedStorageConnection {
    profileId: string;
    engine: StorageEngine;
    deployment: StorageDeploymentMode;
    uri?: string;
    uriSource?: 'env' | 'inline' | 'composed';
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    tls?: boolean;
    region?: string;
    options?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `database` | 属性 | <code>database?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deployment` | 属性 | <code>deployment: StorageDeploymentMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `engine` | 属性 | <code>engine: StorageEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `host` | 属性 | <code>host?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `port` | 属性 | <code>port?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `region` | 属性 | <code>region?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tls` | 属性 | <code>tls?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `uri` | 属性 | <code>uri?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `uriSource` | 属性 | <code>uriSource?: "env" &#124; "inline" &#124; "composed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `username` | 属性 | <code>username?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageConnectionSpec`

Storage Connection Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageConnectionSpec } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export interface StorageConnectionSpec {
    uri?: string;
    uriEnv?: string;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    usernameEnv?: string;
    passwordEnv?: string;
    tls?: boolean;
    region?: string;
    options?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `database` | 属性 | <code>database?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `host` | 属性 | <code>host?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passwordEnv` | 属性 | <code>passwordEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `port` | 属性 | <code>port?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `region` | 属性 | <code>region?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tls` | 属性 | <code>tls?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `uri` | 属性 | <code>uri?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `uriEnv` | 属性 | <code>uriEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `username` | 属性 | <code>username?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usernameEnv` | 属性 | <code>usernameEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageProviderProfile`

Storage Provider Profile 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageProviderProfile } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export interface StorageProviderProfile extends VersionedSpec, SpecMetadata {
    kind: StorageProviderKind;
    engine: StorageEngine;
    deployment: StorageDeploymentMode;
    role: StorageRole;
    connection?: StorageConnectionSpec;
    capabilities?: StorageCapability[];
    consistency?: 'strong' | 'eventual';
    secrets?: {
        apiKey?: StorageSecretRef;
        username?: StorageSecretRef;
        password?: StorageSecretRef;
        token?: StorageSecretRef;
    };
    configSchema?: JsonSchema;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities?: StorageCapability[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `configSchema` | 属性 | <code>configSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `connection` | 属性 | <code>connection?: StorageConnectionSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consistency` | 属性 | <code>consistency?: "strong" &#124; "eventual"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deployment` | 属性 | <code>deployment: StorageDeploymentMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `engine` | 属性 | <code>engine: StorageEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: StorageProviderKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: StorageRole</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secrets` | 属性 | <code>secrets?: { apiKey?: StorageSecretRef; username?: StorageSecretRef; password?: StorageSecretRef; token?: StorageSecretRef; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageSecretRef`

Storage Secret Ref 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageSecretRef } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export interface StorageSecretRef {
    env?: string;
    secretRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `env` | 属性 | <code>env?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretRef` | 属性 | <code>secretRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StorageTopologySpec`

Storage Topology Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StorageTopologySpec } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export interface StorageTopologySpec extends VersionedSpec, SpecMetadata {
    providers: StorageProviderProfile[];
    defaults: {
        relationalRef?: SpecRef;
        documentRef?: SpecRef;
        messagingRef?: SpecRef;
        cacheRef?: SpecRef;
        vectorRef?: SpecRef;
        artifactRef?: SpecRef;
        eventRef?: SpecRef;
        memoryRef?: SpecRef;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaults` | 属性 | <code>defaults: { relationalRef?: SpecRef; documentRef?: SpecRef; messagingRef?: SpecRef; cacheRef?: SpecRef; vectorRef?: SpecRef; artifactRef?: SpecRef; eventRef?: SpecRef; memoryRef?: SpecRef; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providers` | 属性 | <code>providers: StorageProviderProfile[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EnvSource`

Env Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { EnvSource } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type EnvSource = Record<string, string | undefined>;
```

## `StorageCapability`

Storage Capability 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageCapability } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type StorageCapability = 'structured' | 'transactions' | 'events' | 'cache' | 'queue' | 'pubsub' | 'streams' | 'vector_search' | 'metadata_filter' | 'artifact_bytes' | 'managed_backup' | 'tls' | 'multi_region';
```

## `StorageDeploymentMode`

Storage Deployment Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageDeploymentMode } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type StorageDeploymentMode = 'local' | 'self_hosted' | 'managed' | 'cloud';
```

## `StorageEngine`

Storage Engine 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageEngine } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type StorageEngine = 'sqlite' | 'postgres' | 'mysql' | 'mongodb' | 'redis' | 'kafka' | 'local-vector' | 'pgvector' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'weaviate' | 'file-artifact' | 's3' | 'gcs' | 'azure-blob' | 'json';
```

## `StorageProviderKind`

Storage Provider Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageProviderKind } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type StorageProviderKind = 'relational' | 'document' | 'messaging' | 'cache' | 'vector' | 'object' | 'event' | 'hybrid';
```

## `StorageRole`

Storage Role 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { StorageRole } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type StorageRole = 'source_of_truth' | 'event_log' | 'semantic_index' | 'cache' | 'message_queue' | 'artifact_store' | 'document_store' | 'hybrid_memory';
```

## `VectorStorageEngine`

Vector Storage Engine 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { VectorStorageEngine } from '@codesoul-co/hypha-storage';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### 声明

```text
export type VectorStorageEngine = Extract<StorageEngine, 'pgvector' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'weaviate'>;
```
