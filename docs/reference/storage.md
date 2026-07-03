# Storage Reference

hypha uses a storage-profile model. Framework specs reference storage by stable profile ids; concrete connection details live in provider profiles or deployment config.

## Local Storage Backbone

The local backbone is designed for a complete local harness:

| Component | Provider | Role |
| --- | --- | --- |
| Events | `SQLiteEventStore` | Trace, replay, audit, regression, and runtime projection source. |
| Structured records | `SQLiteStructuredStore` | Source of truth for runs, memory records, policies, evaluations, and task state. |
| Semantic recall | `LocalVectorIndexProvider` | Vector index with metadata filters. |
| Artifacts | `FileArtifactStore` | Files, snapshots, large tool outputs, and exports. |
| Memory | `HybridMemoryProvider` | Simple composition of structured source of truth plus optional vector/artifact indexes. |

Create the full local stack:

```ts
import { createLocalStorageBackbone } from '@hypha/adapters-local';

const storage = createLocalStorageBackbone({
  rootPath: './data/storage',
  sqliteMode: 'auto',
});
```

`sqliteMode: "auto"` uses `node:sqlite` when available and falls back to JSON sidecar files otherwise. Use `"json"` for deterministic test fixtures and `"node-sqlite"` when SQLite support is required.

Local path overrides use namespaced env vars:

```bash
HYPHA_STORAGE_EVENT_DB=./data/hypha-runtime-events.sqlite
HYPHA_STORAGE_STRUCTURED_DB=./data/hypha-structured.sqlite
HYPHA_STORAGE_VECTOR_INDEX=./data/hypha-vectors.json
HYPHA_STORAGE_ARTIFACT_ROOT=./data/artifacts
```

## Storage Provider Profile

`StorageProviderProfile` declares:

| Field | Description |
| --- | --- |
| `kind` | Store category: `relational`, `document`, `cache`, `vector`, `object`, `event`, or `hybrid`. |
| `engine` | Concrete engine: `sqlite`, `postgres`, `mongodb`, `redis`, `local-vector`, `pgvector`, `qdrant`, `milvus`, `chroma`, `file-artifact`, `s3`, and others. |
| `deployment` | `local`, `self_hosted`, `managed`, or `cloud`. |
| `role` | How the runtime uses the store: `source_of_truth`, `event_log`, `semantic_index`, `cache`, `artifact_store`, `document_store`, or `hybrid_memory`. |
| `connection` | URI/env/host/port/database/TLS metadata. |
| `capabilities` | Declared features such as `structured`, `transactions`, `events`, `cache`, `streams`, `vector_search`, `metadata_filter`, or `artifact_bytes`. |

Use `StorageTopologySpec` to group profiles and declare default refs for relational, document, cache, vector, artifact, event, and memory stores.

Common profile factories are exported from `@hypha/storage`:

```ts
import {
  createSQLiteStorageProfile,
  createMongoStorageProfile,
  createRedisStorageProfile,
  createQdrantStorageProfile,
  createPineconeStorageProfile,
} from '@hypha/storage';

const eventStore = createSQLiteStorageProfile({ role: 'event_log' });
const mongo = createMongoStorageProfile({ deployment: 'cloud', tls: true });
const redis = createRedisStorageProfile({ deployment: 'cloud', tls: true });
const qdrant = createQdrantStorageProfile({ host: 'localhost', port: 6333 });
const pinecone = createPineconeStorageProfile();
```

## MongoDB

MongoDB is currently used by the API server for permanent conversation memory. Local deployment uses host/port settings:

```bash
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=hypha
MONGODB_DEPLOYMENT=local
```

Cloud deployment should use a provider URI, such as MongoDB Atlas:

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.example.mongodb.net/hypha
MONGODB_DEPLOYMENT=cloud
MONGODB_TLS=true
```

`MONGODB_URI` takes precedence over host/port config. Optional fields include `MONGODB_AUTH_SOURCE`, `MONGODB_REPLICA_SET`, and `MONGODB_DIRECT_CONNECTION`.

## Redis

Redis is currently used for temporary chat memory, session-scoped streams, and API runtime cache behavior. Local deployment:

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_KEY_PREFIX=hypha:
REDIS_DEPLOYMENT=local
```

Cloud deployment should use a provider URL:

```bash
REDIS_URL=rediss://default:password@redis.example.com:6380/0
REDIS_DEPLOYMENT=cloud
REDIS_TLS=true
```

`REDIS_URL` takes precedence over host/port config. `KV_URL` and `RENDER_REDIS_URL` are also recognized as compatibility fallbacks.

## Relational and Vector Extension Points

`StructuredStoreProvider` is the relational/source-of-truth interface. `SQLiteStructuredStore` is the local implementation. Future providers such as Postgres or MySQL should implement the same methods: `get`, `insert`, `update`, `query`, and `transaction`.

`VectorIndexProvider` is the vector retrieval interface. `LocalVectorIndexProvider` is the local implementation. Provider profiles already cover `pgvector`, Qdrant, Milvus, Chroma, Pinecone, and Weaviate; concrete adapters should implement `upsert`, `search`, and `delete`.

Vector stores are retrieval indexes, not the full source of truth. Persist factual memory records in structured storage, then index selected semantic or episodic values in a vector provider.

## Memory Composition

`MemorySpec` can reference:

```text
structuredStoreRef
vectorIndexRef
artifactStoreRef
embeddingProviderRef
retrievalPolicy
writePolicyConfig
```

The current `HybridMemoryProvider` is intentionally simple: it writes scoped records to structured storage, embeds indexable memory types, writes vectors when a vector provider is configured, and reads back full records from structured storage after vector search. This keeps the memory layer easy to replace with richer policies later.
