# Memory provider profiles

The templates in `configs/memory-profiles.yaml` describe Framework profiles. They do not assemble
Server clients, resolve secrets, start containers, or create cloud accounts. A Framework status is
not a claim that the current Server default path uses the profile.

## Support matrix

| Profile              | Framework status       | Store/deployment contract                                  | Live evidence |
| -------------------- | ---------------------- | ---------------------------------------------------------- | ------------- |
| `native-lite`        | framework-validated    | bounded working state + SQLite records + local vector/file | package suite |
| `native-default`     | framework-validated    | Redis working + Mongo records + local vector/file          | Server E2E deferred to `dev` |
| `mem0-oss`           | contract-validated     | self-hosted Mem0                                           | `HYPHA_TEST_MEM0_OSS_URL`; not run without endpoint |
| `mem0-platform`      | controlled-test        | Mem0 Platform v3                                          | `HYPHA_TEST_MEM0_PLATFORM_TOKEN`; not run without credential |
| `memorybank-local`   | contract-validated     | `hypha.memorybank.v1` local service                       | `HYPHA_TEST_MEMORYBANK_LOCAL_URL`; not run without endpoint |
| `memorybank-managed` | controlled-test        | Vertex AI Agent Engine Memory Bank                         | `HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN`; not run without credential |

Status meanings:

- **framework-validated**: public contracts, strict configuration, consumer composition, lifecycle,
  and package tests pass. Server assembly and deployment dependencies are separate acceptance gates.
- **contract-validated**: the concrete client runs the shared add/search/get/list/update/delete/history
  lifecycle against its protocol transport fixture. It is not evidence that a live service passed.
- **controlled-test**: the protocol client and credential-gated integration entry exist, but no live
  cloud pass is claimed without an explicit release account.
- **live-validated**: reserved for a recorded real-service lifecycle report. No external profile in
  this document currently claims this status.

Skipped credential-gated tests are recorded as **not run**, never as passed.

## Native topology

`native-lite` is the offline/single-process profile:

```text
working: bounded in-memory state
record/history: SQLite
vector: local in-memory
artifact: local filesystem
coordination: single process only
```

Its structured records are locally durable; its working state and coordination are not
multi-process services. It must not be described as a production distributed database.

`native-default` is the distributed deployment contract:

```text
working: Redis
record/history: MongoDB
vector: configured local or cloud adapter
artifact: configured local or cloud adapter
outbox: enabled
coordination: distributed
```

The Memory Framework provides the store/runtime contracts and worker supervision. Server creation
of Redis/Mongo clients, migrations, readiness, credentials, and shutdown drain belongs to `dev`.

## External protocol evidence

Mem0 Platform is an independent v3 dialect using versioned add/search endpoints, Token
authentication, filters, asynchronous event receipts, and controlled-cloud reconciliation. It does
not infer its dialect from the base URL.

Managed MemoryBank targets the Google Vertex AI Agent Engine Memory Bank contract. The client keeps
Vertex resource names inside the adapter and maps Hypha scope and stable IDs at the boundary.
`hypha.memorybank.v1` remains a separate Hypha-defined local protocol and is never presented as the
Vertex managed protocol.

The shared concrete-client test is
`packages/memory/src/external-provider-concrete-contract.test.ts`. Credential-gated live entry
points are in `tests/integration/memory-external-providers.integration.test.ts`. Local endpoints run
the full shared lifecycle; managed-cloud entries remain health/capability smoke tests until a release
account is explicitly enabled.

## Minimal selection

Select exactly one management profile. If its concrete factory is not installed,
`MemoryManagementProviderRegistry.resolve` fails startup with
`MEMORY_PROVIDER_NOT_INSTALLED`; it never silently switches providers.

Credentials are references only. Valid `*Env` fields contain uppercase environment-variable names;
valid `*Ref` fields use an explicit `secret:`, `env:`, `vault:`, or `credential:` reference.
Runtime assembly resolves the reference and passes the value to the concrete client. Do not put
tokens, service-account JSON, certificates, customer endpoints, or user data in a profile.

## Migration and rollback

Before changing providers, export structured records and external-ID mappings, capture profile and
provider revisions, and stop new writes. Migrate with stable Hypha memory IDs and scope hashes,
rebuild derived vector indexes, and reconcile provider receipts. Rollback selects the previous
profile revision and restores mappings; it must not copy stale vector results back into the
structured source of truth.

Unknown external writes remain quarantined until reconciliation proves their outcome. Deletion is
complete only when `MemoryDeletionEvidence` verifies all requested IDs or lists the outstanding
provider work.

## Stage A handoff boundary

Stage A is ready for review when the package suite, concrete-client lifecycle suite, public consumer
composition fixture, strict configuration tests, and documentation evidence agree. This handoff does
not claim that Server routes, Chat, Workflow, Redis/Mongo deployment, or cloud accounts are already
integrated. Those remain explicit `dev` and release gates.
