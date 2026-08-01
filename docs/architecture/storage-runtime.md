# Storage Runtime

hypha separates storage by runtime function and deployment mode.

## Functional Groups

| Group | Stock Server Adapters | Extension Contracts | Runtime Use |
| --- | --- | --- | --- |
| `document` | MongoDB | Additional document providers | User-owned records and permanent conversation memory. |
| `messaging` | Redis | Kafka | Temporary memory streams, cache, queue, and pub/sub. |
| `relational` | SQLite/JSON fallback | Postgres | Event logs, structured source-of-truth records, projections, and evaluation state. |
| `vector` | Local JSON index | Qdrant, Chroma, Pinecone | Semantic retrieval indexes. |
| `artifacts` | Filesystem | S3-compatible stores | Files, snapshots, large tool outputs, and exports. |

Local records live under `data/` by function: `runtime/events`, `runtime/structured`, `storage/vector`, `storage/artifacts`, and `logs/system.log`.

## Local and Cloud

Each store declares a `deployment` value:

- `local`: single-machine development or self-hosted local process.
- `self_hosted`: externally managed by the operator, such as a private Redis or Kafka cluster.
- `managed`: provider-managed service with explicit credentials.
- `cloud`: cloud endpoint selected by URL or provider environment.

The `.env` file supplies deployment-specific URLs and credentials. `config.yaml` supplies the typed topology and safe defaults.

An extension contract is not a running integration. The stock Server rejects enabled Kafka, Postgres, Qdrant, Chroma, Pinecone, and S3 configuration until a concrete adapter, lifecycle ownership, readiness probe, and acceptance evidence are registered. This prevents an unused URL or profile from appearing healthy.

## Source of Truth

Events are append-only facts and drive trace, replay, audit, regression, and state projection. Vector stores are indexes over selected memory values. They must be rebuildable from structured records and events.

MongoDB and Redis are still used by the current server startup path. Their config is now exposed through `storage.document.mongodb` and `storage.messaging.redis`, with legacy top-level config kept only as a compatibility bridge.
