# Storage Reference

hypha uses a storage-profile model. Framework specs reference storage by stable profile ids; concrete connection details live in provider profiles or deployment config.

## Local Storage Backbone

The local backbone is designed for a complete local harness:

| Component          | Provider                   | Role                                                                                    |
| ------------------ | -------------------------- | --------------------------------------------------------------------------------------- |
| Events             | `SQLiteEventStore`         | Trace, replay, audit, regression, and runtime projection source.                        |
| Structured records | `SQLiteStructuredStore`    | Source of truth for runs, memory records, policies, evaluations, and task state.        |
| Semantic recall    | `LocalVectorIndexProvider` | Vector index with metadata filters.                                                     |
| Artifacts          | `FileArtifactStore`        | Files, snapshots, large tool outputs, and exports.                                      |
| Memory             | `HybridMemoryProvider`     | Simple composition of structured source of truth plus optional vector/artifact indexes. |

Create the full local stack:

```ts
import { createLocalStorageBackbone } from '@hypha/adapters-local';

const storage = createLocalStorageBackbone({
  rootPath: './data/storage',
  sqliteMode: 'auto',
});
```

`sqliteMode: "auto"` uses a real SQLite engine (`node:sqlite` when available, otherwise `better-sqlite3`) and falls back to JSON sidecar files only when no SQLite engine can be loaded. Use `"sqlite"` when SQLite is required and `"json"` for deterministic test fixtures. `"node-sqlite"` is accepted as a compatibility alias for required SQLite mode.

`SQLiteEventStore` also supports trace exchange as JSONL:

```ts
const count = await storage.eventStore.exportJsonl(
  './data/runtime/events/run_1.events.jsonl',
  { runId: 'run_1' }
);

await storage.eventStore.importJsonl('./data/runtime/events/run_1.events.jsonl');
```

Use JSONL exports for replay fixtures, audits, regression snapshots, and local
debugging. The event log remains the source of truth; exported files are
portable snapshots.

## Storage Provider Profile

`StorageProviderProfile` declares:

| Field          | Description                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`         | Store category: `relational`, `document`, `messaging`, `cache`, `vector`, `object`, `event`, or `hybrid`.                                                           |
| `engine`       | Concrete engine: `sqlite`, `postgres`, `mongodb`, `redis`, `kafka`, `local-vector`, `pgvector`, `qdrant`, `milvus`, `chroma`, `file-artifact`, `s3`, and others.    |
| `deployment`   | `local`, `self_hosted`, `managed`, or `cloud`.                                                                                                                      |
| `role`         | How the runtime uses the store: `source_of_truth`, `event_log`, `semantic_index`, `cache`, `message_queue`, `artifact_store`, `document_store`, or `hybrid_memory`. |
| `connection`   | URI/env/host/port/database/TLS metadata.                                                                                                                            |
| `capabilities` | Declared features such as `structured`, `transactions`, `events`, `cache`, `queue`, `pubsub`, `streams`, `vector_search`, `metadata_filter`, or `artifact_bytes`.   |

Use `StorageTopologySpec` to group profiles and declare default refs for relational, document, messaging, cache, vector, artifact, event, and memory stores. `messagingRef` is the primary queue/stream/pub-sub default; `cacheRef` can point to the same Redis profile when cache behavior is colocated.

Common profile factories are exported from `@hypha/storage`:

```ts
import {
  createSQLiteStorageProfile,
  createMongoStorageProfile,
  createRedisStorageProfile,
  createKafkaStorageProfile,
  createQdrantStorageProfile,
  createPineconeStorageProfile,
} from '@hypha/storage';

const eventStore = createSQLiteStorageProfile({ role: 'event_log' });
const mongo = createMongoStorageProfile({ deployment: 'cloud', tls: true });
const redis = createRedisStorageProfile({ deployment: 'cloud', tls: true });
const kafka = createKafkaStorageProfile({ deployment: 'self_hosted' });
const qdrant = createQdrantStorageProfile({ host: 'localhost', port: 6333 });
const pinecone = createPineconeStorageProfile();
```

## Configuration Taxonomy

Runtime configuration is grouped by function before provider:

| Config Path          | Function                                  | Examples                                      |
| -------------------- | ----------------------------------------- | --------------------------------------------- |
| `storage.document`   | Document records                          | MongoDB local or Atlas.                       |
| `storage.messaging`  | Cache, streams, queues, pub/sub           | Redis local/cloud, Kafka self-hosted/managed. |
| `storage.relational` | Event logs and structured source of truth | SQLite local, Postgres production.            |
| `storage.vector`     | Semantic indexes                          | Local JSON, Qdrant, Chroma, Pinecone.         |
| `storage.artifacts`  | File/blob payloads                        | Local filesystem, S3-compatible stores.       |

Each store declares a deployment mode: `local`, `self_hosted`, `managed`, or `cloud`. Use `.env` for deployment-specific URLs, credentials, and local paths. Use `config.yaml` for typed structure and safe defaults.

Local defaults are organized under `data/`: events in `data/runtime/events/`, structured records in `data/runtime/structured/`, vector indexes in `data/storage/vector/`, artifacts in `data/storage/artifacts/`, and system logs in `data/logs/system.log`.

## Document Storage

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

## Messaging Storage

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

Kafka config is available under `storage.messaging.kafka` for queue/pub-sub adapters. It is optional and not required for the current API startup path.

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

The current `HybridMemoryProvider` writes scoped records to structured storage, embeds indexable memory types, writes vectors when a vector provider is configured, and reads back full records from structured storage after vector search. Search merges vector candidates with text matches from structured storage, deduplicates by record id, and returns the highest-ranked bounded result set.

Use `MemoryManager` above a provider when agent code reads or writes memory. The manager applies `MemoryWritePolicy` and records memory events when a trace recorder is provided:

```ts
const storage = createLocalStorageBackbone({ rootPath: './data/storage' });
const memory = new MemoryManager(storage.memory, { trace: storage.eventStore });
```

`MemoryContextBuilder` is the kernel-level bridge from memory to model context. It searches memory by text or vector, enforces configured memory type filters, applies budget limits, records provenance for each selected item, and injects memory as tagged context data rather than executable instructions.
