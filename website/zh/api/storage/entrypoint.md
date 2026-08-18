# `@codesoul-co/hypha-storage` / `index`

- 包索引: [`@codesoul-co/hypha-storage`](/zh/api/storage)
- 模块指南: [学习与组合说明](/zh/packages/storage)
- 源码: [`packages/storage/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)
- 导出数: **46**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `storageCapabilitySchema` | 常量 | <code>const storageCapabilitySchema: z.ZodEnum&lt;["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]&gt;</code> | storage Capability 的运行时 Schema。 |
| `storageConnectionSpecSchema` | 常量 | <code>const storageConnectionSpecSchema: z.ZodObject&lt;{ uri: z.ZodOptional&lt;z.ZodString&gt;; uriEnv: z.ZodOptional&lt;z.ZodString&gt;; host: z.ZodOptional&lt;z.ZodString&gt;; port: z.ZodOptional&lt;z.ZodNumber&gt;; database: z.ZodOptional&lt;z.ZodString&gt;; username: z.ZodOptional&lt;z.ZodString&gt;; usernameEnv: z.ZodOptional&lt;z.ZodString&gt;; passwordEnv: z.ZodOptional&lt;z.ZodString&gt;; tls: z.ZodOptional&lt;z.ZodBoolean&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; opt...</code> | storage Connection Spec 的运行时 Schema。 |
| `storageDeploymentModeSchema` | 常量 | <code>const storageDeploymentModeSchema: z.ZodEnum&lt;["local", "self_hosted", "managed", "cloud"]&gt;</code> | storage Deployment Mode 的运行时 Schema。 |
| `storageEngineSchema` | 常量 | <code>const storageEngineSchema: z.ZodEnum&lt;["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]&gt;</code> | storage Engine 的运行时 Schema。 |
| `storageProviderKindSchema` | 常量 | <code>const storageProviderKindSchema: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]&gt;</code> | storage Provider Kind 的运行时 Schema。 |
| `storageProviderProfileDefinition` | 常量 | <code>const storageProviderProfileDefinition: SpecSchemaDefinition&lt;StorageProviderProfile&gt;</code> | 由 `index` 模块导出的 storage Provider Profile Definition 常量。 |
| `storageProviderProfileExample` | 常量 | <code>const storageProviderProfileExample: StorageProviderProfile</code> | storage Provider Profile 的有效示例值。 |
| `storageProviderProfileJsonSchema` | 常量 | <code>const storageProviderProfileJsonSchema: JsonSchema</code> | storage Provider Profile 的 JSON Schema。 |
| `storageProviderProfileSchema` | 常量 | <code>const storageProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { kind: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector",...</code> | storage Provider Profile 的运行时 Schema。 |
| `storageRoleSchema` | 常量 | <code>const storageRoleSchema: z.ZodEnum&lt;["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]&gt;</code> | storage Role 的运行时 Schema。 |
| `storageSecretRefSchema` | 常量 | <code>const storageSecretRefSchema: z.ZodObject&lt;{ env: z.ZodOptional&lt;z.ZodString&gt;; secretRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }&gt;</code> | storage Secret Ref 的运行时 Schema。 |
| `storageSpecDefinitions` | 常量 | <code>const storageSpecDefinitions: readonly [SpecSchemaDefinition&lt;StorageProviderProfile&gt;, SpecSchemaDefinition&lt;StorageTopologySpec&gt;]</code> | 由 `index` 模块导出的 storage Spec Definitions 常量。 |
| `storageSpecJsonSchemas` | 常量 | <code>const storageSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 storage Spec Json Schemas 常量。 |
| `storageTopologySpecDefinition` | 常量 | <code>const storageTopologySpecDefinition: SpecSchemaDefinition&lt;StorageTopologySpec&gt;</code> | storage Topology Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `storageTopologySpecExample` | 常量 | <code>const storageTopologySpecExample: StorageTopologySpec</code> | storage Topology Spec 的有效示例值。 |
| `storageTopologySpecJsonSchema` | 常量 | <code>const storageTopologySpecJsonSchema: JsonSchema</code> | storage Topology Spec 的 JSON Schema。 |
| `storageTopologySpecSchema` | 常量 | <code>const storageTopologySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } ...</code> | storage Topology Spec 的运行时 Schema。 |
| `assertStorageCapability` | 函数 | <code>assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void</code> | 断言 Storage Capability。 |
| `createChromaStorageProfile` | 函数 | <code>createChromaStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | 创建 Chroma Storage Profile。 |
| `createFileArtifactStorageProfile` | 函数 | <code>createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile</code> | 创建 File Artifact Storage Profile。 |
| `createKafkaStorageProfile` | 函数 | <code>createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile</code> | 创建 Kafka Storage Profile。 |
| `createLocalVectorStorageProfile` | 函数 | <code>createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile</code> | 创建 Local Vector Storage Profile。 |
| `createMongoStorageProfile` | 函数 | <code>createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | 创建 Mongo Storage Profile。 |
| `createPineconeStorageProfile` | 函数 | <code>createPineconeStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | 创建 Pinecone Storage Profile。 |
| `createQdrantStorageProfile` | 函数 | <code>createQdrantStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | 创建 Qdrant Storage Profile。 |
| `createRedisStorageProfile` | 函数 | <code>createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | 创建 Redis Storage Profile。 |
| `createSQLiteStorageProfile` | 函数 | <code>createSQLiteStorageProfile(input?: { id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }): StorageProviderProfile</code> | 创建 SQ Lite Storage Profile。 |
| `createVectorStorageProfile` | 函数 | <code>createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }): StorageProviderProfile</code> | 创建 Vector Storage Profile。 |
| `createWeaviateStorageProfile` | 函数 | <code>createWeaviateStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | 创建 Weaviate Storage Profile。 |
| `inferStorageDeployment` | 函数 | <code>inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode</code> | infer Storage Deployment 的公开运行时操作。 |
| `redactStorageConnection` | 函数 | <code>redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection</code> | redact Storage Connection 的公开运行时操作。 |
| `resolveStorageConnection` | 函数 | <code>resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection</code> | 解析 Storage Connection。 |
| `validateStorageProviderProfile` | 函数 | <code>validateStorageProviderProfile(input: unknown): StorageProviderProfile</code> | 校验 Storage Provider Profile。 |
| `validateStorageTopologySpec` | 函数 | <code>validateStorageTopologySpec(input: unknown): StorageTopologySpec</code> | 校验 Storage Topology Spec。 |
| `ResolvedStorageConnection` | 接口 | <code>interface ResolvedStorageConnection</code> | Resolved Storage Connection 的字段契约；完整字段见下表。 |
| `StorageConnectionSpec` | 接口 | <code>interface StorageConnectionSpec</code> | Storage Connection Spec 的字段契约；完整字段见下表。 |
| `StorageProviderProfile` | 接口 | <code>interface StorageProviderProfile extends VersionedSpec, SpecMetadata</code> | Storage Provider Profile 的字段契约；完整字段见下表。 |
| `StorageSecretRef` | 接口 | <code>interface StorageSecretRef</code> | Storage Secret Ref 的字段契约；完整字段见下表。 |
| `StorageTopologySpec` | 接口 | <code>interface StorageTopologySpec extends VersionedSpec, SpecMetadata</code> | Storage Topology Spec 的字段契约；完整字段见下表。 |
| `EnvSource` | 类型 | <code>type EnvSource = Record&lt;string, string &#124; undefined&gt;</code> | Env Source 的公共类型别名。 |
| `StorageCapability` | 类型 | <code>type StorageCapability = 'structured' &#124; 'transactions' &#124; 'events' &#124; 'cache' &#124; 'queue' &#124; 'pubsub' &#124; 'streams' &#124; 'vector_search' &#124; 'metadata_filter' &#124; 'artifact_bytes' &#124; 'managed_backup' &#124; 'tls' &#124; 'multi_region'</code> | Storage Capability 的公共类型别名。 |
| `StorageDeploymentMode` | 类型 | <code>type StorageDeploymentMode = 'local' &#124; 'self_hosted' &#124; 'managed' &#124; 'cloud'</code> | Storage Deployment Mode 的公共类型别名。 |
| `StorageEngine` | 类型 | <code>type StorageEngine = 'sqlite' &#124; 'postgres' &#124; 'mysql' &#124; 'mongodb' &#124; 'redis' &#124; 'kafka' &#124; 'local-vector' &#124; 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate' &#124; 'file-artifact' &#124; 's3' &#124; 'gcs' &#124; 'azure-blob' &#124; 'json'</code> | Storage Engine 的公共类型别名。 |
| `StorageProviderKind` | 类型 | <code>type StorageProviderKind = 'relational' &#124; 'document' &#124; 'messaging' &#124; 'cache' &#124; 'vector' &#124; 'object' &#124; 'event' &#124; 'hybrid'</code> | Storage Provider Kind 的公共类型别名。 |
| `StorageRole` | 类型 | <code>type StorageRole = 'source_of_truth' &#124; 'event_log' &#124; 'semantic_index' &#124; 'cache' &#124; 'message_queue' &#124; 'artifact_store' &#124; 'document_store' &#124; 'hybrid_memory'</code> | Storage Role 的公共类型别名。 |
| `VectorStorageEngine` | 类型 | <code>type VectorStorageEngine = Extract&lt;StorageEngine, 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate'&gt;</code> | Vector Storage Engine 的公共类型别名。 |

## `ResolvedStorageConnection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `database` | 属性 | <code>database: string</code> | database 字段。 |
| `deployment` | 属性 | <code>deployment: StorageDeploymentMode</code> | deployment 字段。 |
| `engine` | 属性 | <code>engine: StorageEngine</code> | engine 字段。 |
| `host` | 属性 | <code>host: string</code> | host 字段。 |
| `options` | 属性 | <code>options: Record&lt;string, unknown&gt;</code> | options 字段。 |
| `port` | 属性 | <code>port: number</code> | port 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `region` | 属性 | <code>region: string</code> | region 字段。 |
| `tls` | 属性 | <code>tls: boolean</code> | tls 字段。 |
| `uri` | 属性 | <code>uri: string</code> | uri 字段。 |
| `uriSource` | 属性 | <code>uriSource: "env" &#124; "inline" &#124; "composed"</code> | uri Source 字段。 |
| `username` | 属性 | <code>username: string</code> | username 字段。 |

## `StorageConnectionSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `database` | 属性 | <code>database: string</code> | database 字段。 |
| `host` | 属性 | <code>host: string</code> | host 字段。 |
| `options` | 属性 | <code>options: Record&lt;string, unknown&gt;</code> | options 字段。 |
| `passwordEnv` | 属性 | <code>passwordEnv: string</code> | password Env 字段。 |
| `port` | 属性 | <code>port: number</code> | port 字段。 |
| `region` | 属性 | <code>region: string</code> | region 字段。 |
| `tls` | 属性 | <code>tls: boolean</code> | tls 字段。 |
| `uri` | 属性 | <code>uri: string</code> | uri 字段。 |
| `uriEnv` | 属性 | <code>uriEnv: string</code> | uri Env 字段。 |
| `username` | 属性 | <code>username: string</code> | username 字段。 |
| `usernameEnv` | 属性 | <code>usernameEnv: string</code> | username Env 字段。 |

## `StorageProviderProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: StorageCapability[]</code> | capabilities 字段。 |
| `configSchema` | 属性 | <code>configSchema: JsonSchema</code> | config schema 字段。 |
| `connection` | 属性 | <code>connection: StorageConnectionSpec</code> | connection 字段。 |
| `consistency` | 属性 | <code>consistency: "strong" &#124; "eventual"</code> | consistency 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deployment` | 属性 | <code>deployment: StorageDeploymentMode</code> | deployment 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `engine` | 属性 | <code>engine: StorageEngine</code> | engine 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: StorageProviderKind</code> | kind 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `role` | 属性 | <code>role: StorageRole</code> | role 字段。 |
| `secrets` | 属性 | <code>secrets: { apiKey?: StorageSecretRef; username?: StorageSecretRef; password?: StorageSecretRef; token?: StorageSecretRef; }</code> | secrets 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `StorageSecretRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `env` | 属性 | <code>env: string</code> | env 字段。 |
| `secretRef` | 属性 | <code>secretRef: string</code> | secret Ref 字段。 |

## `StorageTopologySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaults` | 属性 | <code>defaults: { relationalRef?: SpecRef; documentRef?: SpecRef; messagingRef?: SpecRef; cacheRef?: SpecRef; vectorRef?: SpecRef; artifactRef?: SpecRef; eventRef?: SpecRef; memoryRef?: SpecRef; }</code> | defaults 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `providers` | 属性 | <code>providers: StorageProviderProfile[]</code> | providers 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
