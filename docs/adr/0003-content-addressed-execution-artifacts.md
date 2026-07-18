# ADR 0003: Content-Addressed Execution Artifacts

## Status

Accepted

## Context

Execution output must survive retries, replay, cache reuse, recovery, deduplication, and movement
between local and remote storage. A path-derived identifier can change meaning when a file is
overwritten, while a caller-supplied hash can disagree with the bytes that were persisted. Events
and cache records also need a stable identity without embedding large content.

## Decision

1. Persisted Artifact blobs use an algorithm-qualified digest such as `sha256:<hex>` as their
   immutable content identity.
2. The store computes the digest while streaming bytes and verifies it before publishing the blob.
   Reads that include an expected digest are verified and fail closed on mismatch.
3. Logical Artifact identity and version are separate from blob identity. A new logical version may
   point to an existing blob when content is identical, while lineage and retention remain attached
   to the logical record.
4. Manifests use a canonical serialization and contain bounded metadata, content digests, sizes,
   media types, lineage references, and access-policy references. They never contain plaintext
   secrets or host paths.
5. Events, command results, snapshots, and cache records carry Artifact references and digests, not
   raw bytes. Cache reuse revalidates Artifact existence, access, retention, and digest.
6. A digest collision, content mismatch, incomplete upload, or publication race is an integrity
   failure. The store must not silently overwrite or alias conflicting bytes.
7. Eventing retention requires an idempotency key. Its result distinguishes a mutation applied by
   the current attempt from a previously committed mutation so the same deterministic lifecycle
   event can be republished without deleting content twice.
8. Artifact code defines bounded event payloads and publication ids. The Runtime-owned publisher
   remains responsible for durable, idempotent acceptance and for Bus/Outbox retry transport. An
   Artifact store or manager must not implement a competing event transport.

## Consequences

- Identical output can be deduplicated without conflating logical versions or access scopes.
- Replay and recovery can verify the exact bytes referenced by historical evidence.
- Providers and stores must support streaming hash calculation, atomic publication, and integrity
  checks; path-and-length identifiers are not conforming content identities.
- Garbage collection operates on logical reachability and retention before deleting unreferenced
  blobs.
- A retention worker must retry with the same operation id, evaluation inputs, and idempotency key
  after an event-publication failure.
