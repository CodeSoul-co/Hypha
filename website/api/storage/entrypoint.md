# `@codesoul-co/hypha-storage` / `index`

- Package index: [`@codesoul-co/hypha-storage`](/api/storage)
- Package guide: [learning and composition guide](/packages/storage)
- Source: [`packages/storage/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)
- Exports: **46**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `storageCapabilitySchema` | constant | <code>const storageCapabilitySchema: z.ZodEnum&lt;["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]&gt;</code> | Runtime schema for storage Capability. |
| `storageConnectionSpecSchema` | constant | <code>const storageConnectionSpecSchema: z.ZodObject&lt;{ uri: z.ZodOptional&lt;z.ZodString&gt;; uriEnv: z.ZodOptional&lt;z.ZodString&gt;; host: z.ZodOptional&lt;z.ZodString&gt;; port: z.ZodOptional&lt;z.ZodNumber&gt;; database: z.ZodOptional&lt;z.ZodString&gt;; username: z.ZodOptional&lt;z.ZodString&gt;; usernameEnv: z.ZodOptional&lt;z.ZodString&gt;; passwordEnv: z.ZodOptional&lt;z.ZodString&gt;; tls: z.ZodOptional&lt;z.ZodBoolean&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; opt...</code> | Runtime schema for storage Connection Spec. |
| `storageDeploymentModeSchema` | constant | <code>const storageDeploymentModeSchema: z.ZodEnum&lt;["local", "self_hosted", "managed", "cloud"]&gt;</code> | Runtime schema for storage Deployment Mode. |
| `storageEngineSchema` | constant | <code>const storageEngineSchema: z.ZodEnum&lt;["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]&gt;</code> | Runtime schema for storage Engine. |
| `storageProviderKindSchema` | constant | <code>const storageProviderKindSchema: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]&gt;</code> | Runtime schema for storage Provider Kind. |
| `storageProviderProfileDefinition` | constant | <code>const storageProviderProfileDefinition: SpecSchemaDefinition&lt;StorageProviderProfile&gt;</code> | storage Provider Profile Definition constant exported by the `index` module. |
| `storageProviderProfileExample` | constant | <code>const storageProviderProfileExample: StorageProviderProfile</code> | Valid example value for storage Provider Profile. |
| `storageProviderProfileJsonSchema` | constant | <code>const storageProviderProfileJsonSchema: JsonSchema</code> | JSON Schema for storage Provider Profile. |
| `storageProviderProfileSchema` | constant | <code>const storageProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { kind: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector",...</code> | Runtime schema for storage Provider Profile. |
| `storageRoleSchema` | constant | <code>const storageRoleSchema: z.ZodEnum&lt;["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]&gt;</code> | Runtime schema for storage Role. |
| `storageSecretRefSchema` | constant | <code>const storageSecretRefSchema: z.ZodObject&lt;{ env: z.ZodOptional&lt;z.ZodString&gt;; secretRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }&gt;</code> | Runtime schema for storage Secret Ref. |
| `storageSpecDefinitions` | constant | <code>const storageSpecDefinitions: readonly [SpecSchemaDefinition&lt;StorageProviderProfile&gt;, SpecSchemaDefinition&lt;StorageTopologySpec&gt;]</code> | storage Spec Definitions constant exported by the `index` module. |
| `storageSpecJsonSchemas` | constant | <code>const storageSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | storage Spec Json Schemas constant exported by the `index` module. |
| `storageTopologySpecDefinition` | constant | <code>const storageTopologySpecDefinition: SpecSchemaDefinition&lt;StorageTopologySpec&gt;</code> | Runtime validation entrypoint for the storage Topology spec, combining its parser, example and JSON Schema. |
| `storageTopologySpecExample` | constant | <code>const storageTopologySpecExample: StorageTopologySpec</code> | Valid example value for storage Topology Spec. |
| `storageTopologySpecJsonSchema` | constant | <code>const storageTopologySpecJsonSchema: JsonSchema</code> | JSON Schema for storage Topology Spec. |
| `storageTopologySpecSchema` | constant | <code>const storageTopologySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } ...</code> | Runtime schema for storage Topology Spec. |
| `assertStorageCapability` | function | <code>assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void</code> | Asserts Storage Capability at this module boundary. |
| `createChromaStorageProfile` | function | <code>createChromaStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Creates Chroma Storage Profile at this module boundary. |
| `createFileArtifactStorageProfile` | function | <code>createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile</code> | Creates File Artifact Storage Profile at this module boundary. |
| `createKafkaStorageProfile` | function | <code>createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile</code> | Creates Kafka Storage Profile at this module boundary. |
| `createLocalVectorStorageProfile` | function | <code>createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile</code> | Creates Local Vector Storage Profile at this module boundary. |
| `createMongoStorageProfile` | function | <code>createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Creates Mongo Storage Profile at this module boundary. |
| `createPineconeStorageProfile` | function | <code>createPineconeStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Creates Pinecone Storage Profile at this module boundary. |
| `createQdrantStorageProfile` | function | <code>createQdrantStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Creates Qdrant Storage Profile at this module boundary. |
| `createRedisStorageProfile` | function | <code>createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Creates Redis Storage Profile at this module boundary. |
| `createSQLiteStorageProfile` | function | <code>createSQLiteStorageProfile(input?: { id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }): StorageProviderProfile</code> | Creates SQ Lite Storage Profile at this module boundary. |
| `createVectorStorageProfile` | function | <code>createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }): StorageProviderProfile</code> | Creates Vector Storage Profile at this module boundary. |
| `createWeaviateStorageProfile` | function | <code>createWeaviateStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Creates Weaviate Storage Profile at this module boundary. |
| `inferStorageDeployment` | function | <code>inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode</code> | Public runtime operation for infer Storage Deployment. |
| `redactStorageConnection` | function | <code>redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection</code> | Public runtime operation for redact Storage Connection. |
| `resolveStorageConnection` | function | <code>resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection</code> | Resolves Storage Connection at this module boundary. |
| `validateStorageProviderProfile` | function | <code>validateStorageProviderProfile(input: unknown): StorageProviderProfile</code> | Validates Storage Provider Profile at this module boundary. |
| `validateStorageTopologySpec` | function | <code>validateStorageTopologySpec(input: unknown): StorageTopologySpec</code> | Validates Storage Topology Spec at this module boundary. |
| `ResolvedStorageConnection` | interface | <code>interface ResolvedStorageConnection</code> | Field contract for Resolved Storage Connection; see all contract members below. |
| `StorageConnectionSpec` | interface | <code>interface StorageConnectionSpec</code> | Field contract for Storage Connection Spec; see all contract members below. |
| `StorageProviderProfile` | interface | <code>interface StorageProviderProfile extends VersionedSpec, SpecMetadata</code> | Field contract for Storage Provider Profile; see all contract members below. |
| `StorageSecretRef` | interface | <code>interface StorageSecretRef</code> | Field contract for Storage Secret Ref; see all contract members below. |
| `StorageTopologySpec` | interface | <code>interface StorageTopologySpec extends VersionedSpec, SpecMetadata</code> | Field contract for Storage Topology Spec; see all contract members below. |
| `EnvSource` | type | <code>type EnvSource = Record&lt;string, string &#124; undefined&gt;</code> | Public type alias for Env Source. |
| `StorageCapability` | type | <code>type StorageCapability = 'structured' &#124; 'transactions' &#124; 'events' &#124; 'cache' &#124; 'queue' &#124; 'pubsub' &#124; 'streams' &#124; 'vector_search' &#124; 'metadata_filter' &#124; 'artifact_bytes' &#124; 'managed_backup' &#124; 'tls' &#124; 'multi_region'</code> | Public type alias for Storage Capability. |
| `StorageDeploymentMode` | type | <code>type StorageDeploymentMode = 'local' &#124; 'self_hosted' &#124; 'managed' &#124; 'cloud'</code> | Public type alias for Storage Deployment Mode. |
| `StorageEngine` | type | <code>type StorageEngine = 'sqlite' &#124; 'postgres' &#124; 'mysql' &#124; 'mongodb' &#124; 'redis' &#124; 'kafka' &#124; 'local-vector' &#124; 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate' &#124; 'file-artifact' &#124; 's3' &#124; 'gcs' &#124; 'azure-blob' &#124; 'json'</code> | Public type alias for Storage Engine. |
| `StorageProviderKind` | type | <code>type StorageProviderKind = 'relational' &#124; 'document' &#124; 'messaging' &#124; 'cache' &#124; 'vector' &#124; 'object' &#124; 'event' &#124; 'hybrid'</code> | Public type alias for Storage Provider Kind. |
| `StorageRole` | type | <code>type StorageRole = 'source_of_truth' &#124; 'event_log' &#124; 'semantic_index' &#124; 'cache' &#124; 'message_queue' &#124; 'artifact_store' &#124; 'document_store' &#124; 'hybrid_memory'</code> | Public type alias for Storage Role. |
| `VectorStorageEngine` | type | <code>type VectorStorageEngine = Extract&lt;StorageEngine, 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate'&gt;</code> | Public type alias for Vector Storage Engine. |

## `ResolvedStorageConnection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `database` | property | <code>database: string</code> | Public database property. |
| `deployment` | property | <code>deployment: StorageDeploymentMode</code> | Public deployment property. |
| `engine` | property | <code>engine: StorageEngine</code> | Public engine property. |
| `host` | property | <code>host: string</code> | Public host property. |
| `options` | property | <code>options: Record&lt;string, unknown&gt;</code> | Public options property. |
| `port` | property | <code>port: number</code> | Public port property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `region` | property | <code>region: string</code> | Public region property. |
| `tls` | property | <code>tls: boolean</code> | Public tls property. |
| `uri` | property | <code>uri: string</code> | Public uri property. |
| `uriSource` | property | <code>uriSource: "env" &#124; "inline" &#124; "composed"</code> | Public uri Source property. |
| `username` | property | <code>username: string</code> | Public username property. |

## `StorageConnectionSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `database` | property | <code>database: string</code> | Public database property. |
| `host` | property | <code>host: string</code> | Public host property. |
| `options` | property | <code>options: Record&lt;string, unknown&gt;</code> | Public options property. |
| `passwordEnv` | property | <code>passwordEnv: string</code> | Public password Env property. |
| `port` | property | <code>port: number</code> | Public port property. |
| `region` | property | <code>region: string</code> | Public region property. |
| `tls` | property | <code>tls: boolean</code> | Public tls property. |
| `uri` | property | <code>uri: string</code> | Public uri property. |
| `uriEnv` | property | <code>uriEnv: string</code> | Public uri Env property. |
| `username` | property | <code>username: string</code> | Public username property. |
| `usernameEnv` | property | <code>usernameEnv: string</code> | Public username Env property. |

## `StorageProviderProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: StorageCapability[]</code> | Public capabilities property. |
| `configSchema` | property | <code>configSchema: JsonSchema</code> | Public config schema property. |
| `connection` | property | <code>connection: StorageConnectionSpec</code> | Public connection property. |
| `consistency` | property | <code>consistency: "strong" &#124; "eventual"</code> | Public consistency property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deployment` | property | <code>deployment: StorageDeploymentMode</code> | Public deployment property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `engine` | property | <code>engine: StorageEngine</code> | Public engine property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: StorageProviderKind</code> | Public kind property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `role` | property | <code>role: StorageRole</code> | Public role property. |
| `secrets` | property | <code>secrets: { apiKey?: StorageSecretRef; username?: StorageSecretRef; password?: StorageSecretRef; token?: StorageSecretRef; }</code> | Public secrets property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `StorageSecretRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `env` | property | <code>env: string</code> | Public env property. |
| `secretRef` | property | <code>secretRef: string</code> | Public secret Ref property. |

## `StorageTopologySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaults` | property | <code>defaults: { relationalRef?: SpecRef; documentRef?: SpecRef; messagingRef?: SpecRef; cacheRef?: SpecRef; vectorRef?: SpecRef; artifactRef?: SpecRef; eventRef?: SpecRef; memoryRef?: SpecRef; }</code> | Public defaults property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `providers` | property | <code>providers: StorageProviderProfile[]</code> | Public providers property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |
