# `@codesoul-co/hypha-storage` / `index`

- Package index: [`@codesoul-co/hypha-storage`](/api/storage)
- Source: [`packages/storage/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)
- Exports: **46**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-storage`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 17 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 17 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { storageCapabilitySchema } from '@codesoul-co/hypha-storage';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = storageCapabilitySchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `storageCapabilitySchema` | constant | <code>const storageCapabilitySchema: z.ZodEnum&lt;["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]&gt;</code> | Runtime schema for Storage Capability. |
| `storageConnectionSpecSchema` | constant | <code>const storageConnectionSpecSchema: z.ZodObject&lt;{ uri: z.ZodOptional&lt;z.ZodString&gt;; uriEnv: z.ZodOptional&lt;z.ZodString&gt;; host: z.ZodOptional&lt;z.ZodString&gt;; port: z.ZodOptional&lt;z.ZodNumber&gt;; database: z.ZodOptional&lt;z.ZodString&gt;; username: z.ZodOptional&lt;z.ZodString&gt;; usernameEnv: z.ZodOptional&lt;z.ZodString&gt;; passwordEnv: z.ZodOptional&lt;z.ZodString&gt;; tls: z.ZodOptional&lt;z.ZodBoolean&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; opt...</code> | Runtime schema for Storage Connection Spec. |
| `storageDeploymentModeSchema` | constant | <code>const storageDeploymentModeSchema: z.ZodEnum&lt;["local", "self_hosted", "managed", "cloud"]&gt;</code> | Runtime schema for Storage Deployment Mode. |
| `storageEngineSchema` | constant | <code>const storageEngineSchema: z.ZodEnum&lt;["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]&gt;</code> | Runtime schema for Storage Engine. |
| `storageProviderKindSchema` | constant | <code>const storageProviderKindSchema: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]&gt;</code> | Runtime schema for Storage Provider Kind. |
| `storageProviderProfileDefinition` | constant | <code>const storageProviderProfileDefinition: SpecSchemaDefinition&lt;StorageProviderProfile&gt;</code> | Storage Provider Profile Definition constant exported by the `index` module. |
| `storageProviderProfileExample` | constant | <code>const storageProviderProfileExample: StorageProviderProfile</code> | Valid example value for Storage Provider Profile. |
| `storageProviderProfileJsonSchema` | constant | <code>const storageProviderProfileJsonSchema: JsonSchema</code> | JSON Schema for Storage Provider Profile. |
| `storageProviderProfileSchema` | constant | <code>const storageProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { kind: z.ZodEnum&lt;["relational", "document", "messaging", "cache", "vector",...</code> | Runtime schema for Storage Provider Profile. |
| `storageRoleSchema` | constant | <code>const storageRoleSchema: z.ZodEnum&lt;["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]&gt;</code> | Runtime schema for Storage Role. |
| `storageSecretRefSchema` | constant | <code>const storageSecretRefSchema: z.ZodObject&lt;{ env: z.ZodOptional&lt;z.ZodString&gt;; secretRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }, { env?: string &#124; undefined; secretRef?: string &#124; undefined; }&gt;</code> | Runtime schema for Storage Secret Ref. |
| `storageSpecDefinitions` | constant | <code>const storageSpecDefinitions: readonly [SpecSchemaDefinition&lt;StorageProviderProfile&gt;, SpecSchemaDefinition&lt;StorageTopologySpec&gt;]</code> | Storage Spec Definitions constant exported by the `index` module. |
| `storageSpecJsonSchemas` | constant | <code>const storageSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Storage Spec JSON Schemas constant exported by the `index` module. |
| `storageTopologySpecDefinition` | constant | <code>const storageTopologySpecDefinition: SpecSchemaDefinition&lt;StorageTopologySpec&gt;</code> | Runtime validation entrypoint for the Storage Topology spec, combining its parser, example and JSON Schema. |
| `storageTopologySpecExample` | constant | <code>const storageTopologySpecExample: StorageTopologySpec</code> | Valid example value for Storage Topology Spec. |
| `storageTopologySpecJsonSchema` | constant | <code>const storageTopologySpecJsonSchema: JsonSchema</code> | JSON Schema for Storage Topology Spec. |
| `storageTopologySpecSchema` | constant | <code>const storageTopologySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } ...</code> | Runtime schema for Storage Topology Spec. |
| `assertStorageCapability` | function | <code>assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void</code> | Assert Storage Capability function with 1 public call signature; parameters and return types are listed below. |
| `createChromaStorageProfile` | function | <code>createChromaStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Chroma Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createFileArtifactStorageProfile` | function | <code>createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile</code> | Create File Artifact Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createKafkaStorageProfile` | function | <code>createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile</code> | Create Kafka Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createLocalVectorStorageProfile` | function | <code>createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile</code> | Create Local Vector Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createMongoStorageProfile` | function | <code>createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Create Mongo Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createPineconeStorageProfile` | function | <code>createPineconeStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Pinecone Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createQdrantStorageProfile` | function | <code>createQdrantStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Qdrant Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createRedisStorageProfile` | function | <code>createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile</code> | Create Redis Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createSQLiteStorageProfile` | function | <code>createSQLiteStorageProfile(input?: { id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }): StorageProviderProfile</code> | Create SQLite Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createVectorStorageProfile` | function | <code>createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }): StorageProviderProfile</code> | Create Vector Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `createWeaviateStorageProfile` | function | <code>createWeaviateStorageProfile(input?: Omit&lt;Parameters&lt;typeof createVectorStorageProfile&gt;[0], "engine"&gt;): StorageProviderProfile</code> | Create Weaviate Storage Profile function with 1 public call signature; parameters and return types are listed below. |
| `inferStorageDeployment` | function | <code>inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode</code> | Infer Storage Deployment function with 1 public call signature; parameters and return types are listed below. |
| `redactStorageConnection` | function | <code>redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection</code> | Redact Storage Connection function with 1 public call signature; parameters and return types are listed below. |
| `resolveStorageConnection` | function | <code>resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection</code> | Resolve Storage Connection function with 1 public call signature; parameters and return types are listed below. |
| `validateStorageProviderProfile` | function | <code>validateStorageProviderProfile(input: unknown): StorageProviderProfile</code> | Validate Storage Provider Profile function with 1 public call signature; parameters and return types are listed below. |
| `validateStorageTopologySpec` | function | <code>validateStorageTopologySpec(input: unknown): StorageTopologySpec</code> | Validate Storage Topology Spec function with 1 public call signature; parameters and return types are listed below. |
| `ResolvedStorageConnection` | interface | <code>interface ResolvedStorageConnection</code> | Resolved Storage Connection interface with 12 public fields or methods. |
| `StorageConnectionSpec` | interface | <code>interface StorageConnectionSpec</code> | Storage Connection Spec interface with 11 public fields or methods. |
| `StorageProviderProfile` | interface | <code>interface StorageProviderProfile extends VersionedSpec, SpecMetadata</code> | Storage Provider Profile interface with 17 public fields or methods. |
| `StorageSecretRef` | interface | <code>interface StorageSecretRef</code> | Storage Secret Ref interface with 2 public fields or methods. |
| `StorageTopologySpec` | interface | <code>interface StorageTopologySpec extends VersionedSpec, SpecMetadata</code> | Storage Topology Spec interface with 10 public fields or methods. |
| `EnvSource` | type | <code>type EnvSource = Record&lt;string, string &#124; undefined&gt;</code> | Public type alias for Env Source; the declaration contains its complete type expression. |
| `StorageCapability` | type | <code>type StorageCapability = 'structured' &#124; 'transactions' &#124; 'events' &#124; 'cache' &#124; 'queue' &#124; 'pubsub' &#124; 'streams' &#124; 'vector_search' &#124; 'metadata_filter' &#124; 'artifact_bytes' &#124; 'managed_backup' &#124; 'tls' &#124; 'multi_region'</code> | Public type alias for Storage Capability; the declaration contains its complete type expression. |
| `StorageDeploymentMode` | type | <code>type StorageDeploymentMode = 'local' &#124; 'self_hosted' &#124; 'managed' &#124; 'cloud'</code> | Public type alias for Storage Deployment Mode; the declaration contains its complete type expression. |
| `StorageEngine` | type | <code>type StorageEngine = 'sqlite' &#124; 'postgres' &#124; 'mysql' &#124; 'mongodb' &#124; 'redis' &#124; 'kafka' &#124; 'local-vector' &#124; 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate' &#124; 'file-artifact' &#124; 's3' &#124; 'gcs' &#124; 'azure-blob' &#124; 'json'</code> | Public type alias for Storage Engine; the declaration contains its complete type expression. |
| `StorageProviderKind` | type | <code>type StorageProviderKind = 'relational' &#124; 'document' &#124; 'messaging' &#124; 'cache' &#124; 'vector' &#124; 'object' &#124; 'event' &#124; 'hybrid'</code> | Public type alias for Storage Provider Kind; the declaration contains its complete type expression. |
| `StorageRole` | type | <code>type StorageRole = 'source_of_truth' &#124; 'event_log' &#124; 'semantic_index' &#124; 'cache' &#124; 'message_queue' &#124; 'artifact_store' &#124; 'document_store' &#124; 'hybrid_memory'</code> | Public type alias for Storage Role; the declaration contains its complete type expression. |
| `VectorStorageEngine` | type | <code>type VectorStorageEngine = Extract&lt;StorageEngine, 'pgvector' &#124; 'qdrant' &#124; 'milvus' &#124; 'chroma' &#124; 'pinecone' &#124; 'weaviate'&gt;</code> | Public type alias for Vector Storage Engine; the declaration contains its complete type expression. |

## `storageCapabilitySchema`

Runtime schema for Storage Capability.

- Kind: constant
- Import: `import { storageCapabilitySchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageCapabilitySchema: z.ZodEnum<["structured", "transactions", "events", "cache", "queue", "pubsub", "streams", "vector_search", "metadata_filter", "artifact_bytes", "managed_backup", "tls", "multi_region"]>;
```

## `storageConnectionSpecSchema`

Runtime schema for Storage Connection Spec.

- Kind: constant
- Import: `import { storageConnectionSpecSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageConnectionSpecSchema: z.ZodObject<{ uri: z.ZodOptional<z.ZodString>; uriEnv: z.ZodOptional<z.ZodString>; host: z.ZodOptional<z.ZodString>; port: z.ZodOptional<z.ZodNumber>; database: z.ZodOptional<z.ZodString>; username: z.ZodOptional<z.ZodString>; usernameEnv: z.ZodOptional<z.ZodString>; passwordEnv: z.ZodOptional<z.ZodString>; tls: z.ZodOptional<z.ZodBoolean>; region: z.ZodOptional<z.ZodString>; options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { tls?: boolean | undefined; options?: Record<string, unknown> | undefined; uri?: string | undefined; uriEnv?: string | undefined; host?: string | undefined; port?: number | undefined; database?: string | undefined; username?: string | undefined; usernameEnv?: string | undefined; passwordEnv?: string | undefined; region?: string | undefined; }, { tls?: boolean | undefined; options?: Record<string, unknown> | undefined; uri?: string | undefined; uriEnv?: string | undefined; host?: string | undefined; port?: number | undefined; database?: string | undefined; username?: string | undefined; usernameEnv?: string | undefined; passwordEnv?: string | undefined; region?: string | undefined; }>;
```

## `storageDeploymentModeSchema`

Runtime schema for Storage Deployment Mode.

- Kind: constant
- Import: `import { storageDeploymentModeSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageDeploymentModeSchema: z.ZodEnum<["local", "self_hosted", "managed", "cloud"]>;
```

## `storageEngineSchema`

Runtime schema for Storage Engine.

- Kind: constant
- Import: `import { storageEngineSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageEngineSchema: z.ZodEnum<["sqlite", "postgres", "mysql", "mongodb", "redis", "kafka", "local-vector", "pgvector", "qdrant", "milvus", "chroma", "pinecone", "weaviate", "file-artifact", "s3", "gcs", "azure-blob", "json"]>;
```

## `storageProviderKindSchema`

Runtime schema for Storage Provider Kind.

- Kind: constant
- Import: `import { storageProviderKindSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageProviderKindSchema: z.ZodEnum<["relational", "document", "messaging", "cache", "vector", "object", "event", "hybrid"]>;
```

## `storageProviderProfileDefinition`

Storage Provider Profile Definition constant exported by the `index` module.

- Kind: constant
- Import: `import { storageProviderProfileDefinition } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageProviderProfileDefinition: SpecSchemaDefinition<StorageProviderProfile>;
```

## `storageProviderProfileExample`

Valid example value for Storage Provider Profile.

- Kind: constant
- Import: `import { storageProviderProfileExample } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageProviderProfileExample: StorageProviderProfile;
```

## `storageProviderProfileJsonSchema`

JSON Schema for Storage Provider Profile.

- Kind: constant
- Import: `import { storageProviderProfileJsonSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageProviderProfileJsonSchema: JsonSchema;
```

## `storageProviderProfileSchema`

Runtime schema for Storage Provider Profile.

- Kind: constant
- Import: `import { storageProviderProfileSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const storageProviderProfileSchema: (typeof import('@codesoul-co/hypha-storage'))['storageProviderProfileSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `storageRoleSchema`

Runtime schema for Storage Role.

- Kind: constant
- Import: `import { storageRoleSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageRoleSchema: z.ZodEnum<["source_of_truth", "event_log", "semantic_index", "cache", "message_queue", "artifact_store", "document_store", "hybrid_memory"]>;
```

## `storageSecretRefSchema`

Runtime schema for Storage Secret Ref.

- Kind: constant
- Import: `import { storageSecretRefSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageSecretRefSchema: z.ZodObject<{ env: z.ZodOptional<z.ZodString>; secretRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { env?: string | undefined; secretRef?: string | undefined; }, { env?: string | undefined; secretRef?: string | undefined; }>;
```

## `storageSpecDefinitions`

Storage Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { storageSpecDefinitions } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageSpecDefinitions: readonly [SpecSchemaDefinition<StorageProviderProfile>, SpecSchemaDefinition<StorageTopologySpec>];
```

## `storageSpecJsonSchemas`

Storage Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { storageSpecJsonSchemas } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageSpecJsonSchemas: Record<string, JsonSchema>;
```

## `storageTopologySpecDefinition`

Runtime validation entrypoint for the Storage Topology spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { storageTopologySpecDefinition } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageTopologySpecDefinition: SpecSchemaDefinition<StorageTopologySpec>;
```

## `storageTopologySpecExample`

Valid example value for Storage Topology Spec.

- Kind: constant
- Import: `import { storageTopologySpecExample } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageTopologySpecExample: StorageTopologySpec;
```

## `storageTopologySpecJsonSchema`

JSON Schema for Storage Topology Spec.

- Kind: constant
- Import: `import { storageTopologySpecJsonSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare const storageTopologySpecJsonSchema: JsonSchema;
```

## `storageTopologySpecSchema`

Runtime schema for Storage Topology Spec.

- Kind: constant
- Import: `import { storageTopologySpecSchema } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const storageTopologySpecSchema: (typeof import('@codesoul-co/hypha-storage'))['storageTopologySpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `assertStorageCapability`

Assert Storage Capability function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertStorageCapability } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void;
```

### Call signature

```text
assertStorageCapability(profile: StorageProviderProfile, capability: StorageCapability): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `capability` | <code>StorageCapability</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `createChromaStorageProfile`

Create Chroma Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createChromaStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createChromaStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### Call signature

```text
createChromaStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createFileArtifactStorageProfile`

Create File Artifact Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createFileArtifactStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createFileArtifactStorageProfile(input?: {
    id?: string;
    uri?: string;
    rootPath?: string;
}): StorageProviderProfile;
```

### Call signature

```text
createFileArtifactStorageProfile(input?: { id?: string; uri?: string; rootPath?: string; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; uri?: string; rootPath?: string; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createKafkaStorageProfile`

Create Kafka Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createKafkaStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Call signature

```text
createKafkaStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; tls?: boolean; region?: string; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createLocalVectorStorageProfile`

Create Local Vector Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createLocalVectorStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createLocalVectorStorageProfile(input?: {
    id?: string;
    uri?: string;
    database?: string;
}): StorageProviderProfile;
```

### Call signature

```text
createLocalVectorStorageProfile(input?: { id?: string; uri?: string; database?: string; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; uri?: string; database?: string; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createMongoStorageProfile`

Create Mongo Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMongoStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Call signature

```text
createMongoStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createPineconeStorageProfile`

Create Pinecone Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createPineconeStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createPineconeStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### Call signature

```text
createPineconeStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createQdrantStorageProfile`

Create Qdrant Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createQdrantStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createQdrantStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### Call signature

```text
createQdrantStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createRedisStorageProfile`

Create Redis Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRedisStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Call signature

```text
createRedisStorageProfile(input?: { id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createSQLiteStorageProfile`

Create SQLite Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createSQLiteStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createSQLiteStorageProfile(input?: {
    id?: string;
    role?: Extract<StorageRole, 'source_of_truth' | 'event_log'>;
    uri?: string;
    database?: string;
}): StorageProviderProfile;
```

### Call signature

```text
createSQLiteStorageProfile(input?: { id?: string; role?: Extract<StorageRole, "source_of_truth" | "event_log">; uri?: string; database?: string; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ id?: string; role?: Extract&lt;StorageRole, "source_of_truth" &#124; "event_log"&gt;; uri?: string; database?: string; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createVectorStorageProfile`

Create Vector Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createVectorStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Call signature

```text
createVectorStorageProfile(input: { engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record<string, unknown>; }): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `createWeaviateStorageProfile`

Create Weaviate Storage Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createWeaviateStorageProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function createWeaviateStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], 'engine'>): StorageProviderProfile;
```

### Call signature

```text
createWeaviateStorageProfile(input?: Omit<Parameters<typeof createVectorStorageProfile>[0], "engine">): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;{ engine: VectorStorageEngine; id?: string; deployment?: StorageDeploymentMode; uriEnv?: string; uri?: string; host?: string; port?: number; database?: string; tls?: boolean; region?: string; apiKeyEnv?: string; options?: Record&lt;string, unknown&gt;; }, "engine"&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `inferStorageDeployment`

Infer Storage Deployment function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { inferStorageDeployment } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode;
```

### Call signature

```text
inferStorageDeployment(profile: StorageProviderProfile, uri?: string): StorageDeploymentMode
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `uri` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageDeploymentMode`
- Description: The return contract is defined by the type shown above.

## `redactStorageConnection`

Redact Storage Connection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { redactStorageConnection } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection;
```

### Call signature

```text
redactStorageConnection(connection: ResolvedStorageConnection): ResolvedStorageConnection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `connection` | <code>ResolvedStorageConnection</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResolvedStorageConnection`
- Description: The return contract is defined by the type shown above.

## `resolveStorageConnection`

Resolve Storage Connection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveStorageConnection } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection;
```

### Call signature

```text
resolveStorageConnection(profile: StorageProviderProfile, env?: EnvSource): ResolvedStorageConnection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>StorageProviderProfile</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `env` | <code>EnvSource</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResolvedStorageConnection`
- Description: The return contract is defined by the type shown above.

## `validateStorageProviderProfile`

Validate Storage Provider Profile function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStorageProviderProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function validateStorageProviderProfile(input: unknown): StorageProviderProfile;
```

### Call signature

```text
validateStorageProviderProfile(input: unknown): StorageProviderProfile
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageProviderProfile`
- Description: The return contract is defined by the type shown above.

## `validateStorageTopologySpec`

Validate Storage Topology Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateStorageTopologySpec } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export declare function validateStorageTopologySpec(input: unknown): StorageTopologySpec;
```

### Call signature

```text
validateStorageTopologySpec(input: unknown): StorageTopologySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageTopologySpec`
- Description: The return contract is defined by the type shown above.

## `ResolvedStorageConnection`

Resolved Storage Connection interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedStorageConnection } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `database` | property | <code>database?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deployment` | property | <code>deployment: StorageDeploymentMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `engine` | property | <code>engine: StorageEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `host` | property | <code>host?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `port` | property | <code>port?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `region` | property | <code>region?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tls` | property | <code>tls?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `uri` | property | <code>uri?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `uriSource` | property | <code>uriSource?: "env" &#124; "inline" &#124; "composed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `username` | property | <code>username?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageConnectionSpec`

Storage Connection Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { StorageConnectionSpec } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `database` | property | <code>database?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `host` | property | <code>host?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passwordEnv` | property | <code>passwordEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `port` | property | <code>port?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `region` | property | <code>region?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tls` | property | <code>tls?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `uri` | property | <code>uri?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `uriEnv` | property | <code>uriEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `username` | property | <code>username?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usernameEnv` | property | <code>usernameEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageProviderProfile`

Storage Provider Profile interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { StorageProviderProfile } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities?: StorageCapability[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `configSchema` | property | <code>configSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `connection` | property | <code>connection?: StorageConnectionSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consistency` | property | <code>consistency?: "strong" &#124; "eventual"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deployment` | property | <code>deployment: StorageDeploymentMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `engine` | property | <code>engine: StorageEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: StorageProviderKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: StorageRole</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secrets` | property | <code>secrets?: { apiKey?: StorageSecretRef; username?: StorageSecretRef; password?: StorageSecretRef; token?: StorageSecretRef; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageSecretRef`

Storage Secret Ref interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { StorageSecretRef } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export interface StorageSecretRef {
    env?: string;
    secretRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `env` | property | <code>env?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretRef` | property | <code>secretRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageTopologySpec`

Storage Topology Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { StorageTopologySpec } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaults` | property | <code>defaults: { relationalRef?: SpecRef; documentRef?: SpecRef; messagingRef?: SpecRef; cacheRef?: SpecRef; vectorRef?: SpecRef; artifactRef?: SpecRef; eventRef?: SpecRef; memoryRef?: SpecRef; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providers` | property | <code>providers: StorageProviderProfile[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EnvSource`

Public type alias for Env Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { EnvSource } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type EnvSource = Record<string, string | undefined>;
```

## `StorageCapability`

Public type alias for Storage Capability; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageCapability } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type StorageCapability = 'structured' | 'transactions' | 'events' | 'cache' | 'queue' | 'pubsub' | 'streams' | 'vector_search' | 'metadata_filter' | 'artifact_bytes' | 'managed_backup' | 'tls' | 'multi_region';
```

## `StorageDeploymentMode`

Public type alias for Storage Deployment Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageDeploymentMode } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type StorageDeploymentMode = 'local' | 'self_hosted' | 'managed' | 'cloud';
```

## `StorageEngine`

Public type alias for Storage Engine; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageEngine } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type StorageEngine = 'sqlite' | 'postgres' | 'mysql' | 'mongodb' | 'redis' | 'kafka' | 'local-vector' | 'pgvector' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'weaviate' | 'file-artifact' | 's3' | 'gcs' | 'azure-blob' | 'json';
```

## `StorageProviderKind`

Public type alias for Storage Provider Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageProviderKind } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type StorageProviderKind = 'relational' | 'document' | 'messaging' | 'cache' | 'vector' | 'object' | 'event' | 'hybrid';
```

## `StorageRole`

Public type alias for Storage Role; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageRole } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type StorageRole = 'source_of_truth' | 'event_log' | 'semantic_index' | 'cache' | 'message_queue' | 'artifact_store' | 'document_store' | 'hybrid_memory';
```

## `VectorStorageEngine`

Public type alias for Vector Storage Engine; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { VectorStorageEngine } from '@codesoul-co/hypha-storage';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts)

### Declaration

```text
export type VectorStorageEngine = Extract<StorageEngine, 'pgvector' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'weaviate'>;
```
