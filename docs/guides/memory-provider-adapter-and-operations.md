# Memory provider adapter and operations guide

## Adapter contract

A provider adapter implements `ExternalMemoryClient` and is wrapped by
`ExternalMemoryManagementAdapter`. Define the stable Hypha contract before transport code:

1. Map every external item to a stable Hypha ID and persist the external-id association.
2. Include the complete scope hash in writes and reject records returned for another scope.
3. Normalize receipts for add, update, and delete. Preserve asynchronous event or operation IDs.
4. Normalize authentication, authorization, not-found, revision-conflict, rate-limit, timeout, and dependency failures.
5. Accept `AbortSignal`, cancel in-flight transport work on `close()`, and expose health.
6. Negotiate capabilities; do not claim optional operations that the service did not advertise.
7. Reconcile an unknown write by operation/idempotency metadata. Quarantine it if the result cannot be proven.
8. Pass `runExternalProviderAcceptance` plus a controlled real-service test before changing a profile status.

Provider SDK response types remain inside the adapter. Framework routing selects a provider through
a profile and registry; it must not branch on Mem0, MemoryBank, Native, local, or managed names.

## Operations

Use `MemoryOperationalHealthService` for Framework readiness/liveness snapshots. HTTP health
routes and metrics exporters belong to Server/runtime assembly. Required unhealthy providers make
the Memory runtime not ready; an old queue or exhausted retry budget makes it stalled.

Every provider needs an independent retry budget, circuit, bulkhead/pool, queue, rate limit, and
quota snapshot. `InMemoryMemoryProviderQuota` is a deterministic reference implementation; a
production deployment must persist or atomically meter shared quotas.

Lifecycle and index workers may dead-letter exhausted work. Import it with
`deadLetterFromTask`, then use `MemoryDeadLetterManager`:

- Query by worker, scope, state, or failure fingerprint.
- Replay only after an operator confirms the unchanged fingerprint and supplies an idempotency key.
- Discard only with explicit confirmation and a meaningful reason.
- Never replay an unknown write before provider reconciliation proves it safe.

Deletion produces `MemoryDeletionEvidence`. A partial receipt lists pending IDs and is not proof of
complete erasure. Compliance workflows retain the proof hash and provider receipt reference without
embedding secrets or deleted content.

## Context and cache

Chat, Workflow, and Harness use `DefaultMemoryContextGateway`. It resolves sources, builds the
bundle, applies the injection boundary, emits the shared Activity Hook lifecycle, and returns the
explanation/provenance alongside the envelope.

Only cache a context through `VersionValidContextCache`. Reuse requires exact scope, Memory and
Context profile revisions, provider/policy revisions, selected memory version IDs, and source
hashes. The structured record/version store remains the recovery truth; cache content never does.

## Backup, restore, migration, and rollback

A backup-capable provider declares `MemoryProviderBackupRestoreCapabilities`. Export records,
versions, scope hashes, stable Hypha IDs, external-id mappings, profile revisions, and provider
receipts. Vector indexes are derived and may be rebuilt.

During restore or migration:

1. Fence new writes and drain workers.
2. Validate the backup profile, provider, and policy revisions.
3. Restore structured records and versions first.
4. Restore external mappings only after checking scope hashes.
5. Rebuild indexes and reconcile asynchronous receipts.
6. Run the external-provider acceptance suite.
7. Resume writes after readiness is `ready`.

Rollback selects the previous versioned profile and mapping snapshot. Do not silently fall back to a
different provider, reissue quarantined writes, or treat cached results as restored records.

## Known limitations

- `native-lite` is non-durable and intended for tests or previews.
- Mem0 Platform and Vertex AI Memory Bank live tests require explicit cloud credentials and remain controlled-test profiles until a release environment records acceptance.
- `hypha.memorybank.v1` is a Hypha-defined local protocol because the MemoryBank research implementation does not publish a stable interoperable HTTP standard.
- Framework contracts do not start services, inject secrets, expose HTTP endpoints, or schedule deployment backup jobs.
