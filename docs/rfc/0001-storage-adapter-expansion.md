# RFC 0001: Storage Adapter Expansion

## Summary

hypha should add concrete adapters behind the storage taxonomy without changing DomainPack, Session, Run, or Event contracts.

## Proposed Direction

Adapters should attach to functional interfaces:

- Messaging: Redis streams first, Kafka later for async worker queues and pub/sub.
- Relational: SQLite for local, Postgres for production relational state, optional pgvector when relational and vector deployment are colocated.
- Vector: local JSON for tests/dev, Qdrant/Chroma for self-hosted, Pinecone/Weaviate for managed cloud.
- Artifacts: filesystem for local, S3-compatible stores for managed deployments.

## Compatibility

Existing MongoDB and Redis startup remains available through `dbConfig()` and `redisConfig()`. New deployments should configure `storage.document.mongodb` and `storage.messaging.redis` instead of top-level provider keys.

## Open Questions

- Whether Kafka should be a required runtime dependency or an optional worker-plane adapter.
- Whether Postgres becomes the default production relational store before or after event projection tables are formalized.
- How vector index rebuild jobs should be scheduled and traced.
