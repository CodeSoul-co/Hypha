# Storage Runtime

hypha separates storage by runtime function and deployment mode.

## Functional Groups

| Group | Current Stores | Runtime Use |
| --- | --- | --- |
| `document` | MongoDB | User-owned records and permanent conversation memory. |
| `messaging` | Redis, Kafka-ready config | Temporary memory streams, cache, queue, pub/sub, and future async workers. |
| `relational` | SQLite, Postgres-ready config | Event logs, structured source-of-truth records, projections, and evaluation state. |
| `vector` | Local JSON index, Qdrant/Chroma/Pinecone-ready config | Semantic retrieval indexes. |
| `artifacts` | Filesystem, S3-ready config | Files, snapshots, large tool outputs, and exports. |

Local records live under `data/` by function: `runtime/events`, `runtime/structured`, `storage/vector`, `storage/artifacts`, and `logs/system.log`.

## Local and Cloud

Each store declares a `deployment` value:

- `local`: single-machine development or self-hosted local process.
- `self_hosted`: externally managed by the operator, such as a private Redis or Kafka cluster.
- `managed`: provider-managed service with explicit credentials.
- `cloud`: cloud endpoint selected by URL or provider environment.

The `.env` file supplies deployment-specific URLs and credentials. `config.yaml` supplies the typed topology and safe defaults.

## Source of Truth

Events are append-only facts and drive trace, replay, audit, regression, and state projection. Vector stores are indexes over selected memory values. They must be rebuildable from structured records and events.

MongoDB and Redis are still used by the current server startup path. Their config is now exposed through `storage.document.mongodb` and `storage.messaging.redis`, with legacy top-level config kept only as a compatibility bridge.
