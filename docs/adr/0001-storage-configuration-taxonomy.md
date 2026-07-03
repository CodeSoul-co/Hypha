# ADR 0001: Storage Configuration Taxonomy

## Status

Accepted

## Context

hypha needs local and cloud deployments without tying framework specs to a specific provider. The runtime also has different storage roles: document records, message streams, relational source-of-truth records, vector indexes, and artifacts.

Provider-first configuration makes these roles ambiguous. Redis, for example, can be cache, stream, queue, or pub/sub infrastructure. MongoDB is a document store, not a relational source of truth. Vector databases are retrieval indexes and should not own factual memory records.

## Decision

Configuration is organized by storage function first:

- `storage.document.mongodb`
- `storage.messaging.redis`
- `storage.messaging.kafka`
- `storage.relational.sqlite`
- `storage.relational.postgres`
- `storage.vector.local`, `storage.vector.qdrant`, `storage.vector.chroma`, `storage.vector.pinecone`
- `storage.artifacts.local`, `storage.artifacts.s3`

Each function can declare `deployment` as `local`, `self_hosted`, `managed`, or `cloud`. Stable `storage.profiles` expose ids for specs and adapters, while concrete URLs, credentials, and local paths live in `.env` or deployment configuration.

## Consequences

Runtime code resolves MongoDB and Redis through compatibility accessors, but new configuration should use the `storage.*` taxonomy. Provider SDK details remain outside framework core. Vector stores remain indexes; structured records and events stay in relational or document stores.

Legacy top-level `database.mongodb` and `redis` inputs may be read as fallback while existing deployments migrate.
