# Memory provider profiles

`configs/memory-profiles.yaml` is the canonical runtime-profile document. It contains one
`activeProfile` and a strict `{ profile, management }` entry for every selectable profile. Load it
through `CanonicalMemoryRuntimeLoader`; do not translate it into a second configuration shape.

The loader validates profile/provider identity and resolves connection, secret, Store, Vector,
Artifact, Embedding, and other dependency references before creating a runtime. Server clients,
containers, cloud accounts, and secret values remain deployment responsibilities.

## Deployment profiles

| Profile                      | Intended use                    | Required dependencies                                         | Runtime boundary                          |
| ---------------------------- | ------------------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| `native-lite`                | Single-process Memory contract  | local adapters plus the Server storage bootstrap              | not yet a standalone offline Server mode  |
| `native-default`             | Shared structured Memory        | Redis, MongoDB, configured vector and artifact adapters       | distributed stores; not HA by default     |
| `mem0-oss`                   | Self-hosted external Memory     | Mem0 endpoint and optional API credential                     | Mem0 OSS REST dialect                     |
| `mem0-platform`              | Mem0 managed service            | Platform token, durable mapping and operation stores          | Mem0 Platform v3 dialect                  |
| `memorybank-managed`         | Vertex AI Memory Bank           | Google project/location/engine credentials and stores         | Vertex resource names remain in adapter   |
| `memorybank-hindsight-local` | Self-hosted Hindsight candidate | Hindsight 0.8.x endpoint and durable mapping/operation stores | disabled candidate; explicit factory only |

## Native topology

`native-lite` keeps working state and vector search inside one process. SQLite provides local
structured-record durability, but the profile must not be used by multiple writer processes.

`native-default` uses Redis for working state and MongoDB for records, history, outbox, and
coordination. Its vector and artifact references must resolve to adapters appropriate for the
selected deployment. The repository default uses a process-local vector adapter, so selecting the
profile alone does not provide high availability. Multi-instance deployments require shared vector
and artifact services in addition to Redis and MongoDB.

Workers use fenced lease tokens. Completion and failure updates must match the current owner and
attempt token, and shutdown must drain supervised workers before closing Store and Provider clients.
Readiness must fail when a required dependency, transaction capability, Provider, or profile
reference cannot be resolved.

## External provider selection

Mem0 OSS and Mem0 Platform are separate protocol dialects and must use their corresponding clients.
Deployment type is never inferred from a URL.

`mem0-oss` targets the official self-hosted FastAPI service. Hypha sends current Mem0 scope
selectors in `filters`, uses `top_k`, preserves immutable Hypha scope evidence in provider
metadata, and keeps external-ID mappings in a durable Store. Loopback HTTP is allowed for local
development; non-loopback endpoints must use HTTPS.

`memorybank-managed` targets Google Vertex AI Agent Engine Memory Bank. Vertex project, location,
reasoning-engine, operation, and memory resource names stay inside the adapter.
Set `HYPHA_MEMORYBANK_AUTH_MODE=environment` to supply a short-lived, externally rotated
`HYPHA_MEMORYBANK_ACCESS_TOKEN`. On Cloud Run, GKE Workload Identity, or Compute Engine, set
`HYPHA_MEMORYBANK_AUTH_MODE=google-metadata`; Hypha then obtains renewable OAuth credentials only
from Google's fixed metadata endpoint and verifies the `Metadata-Flavor: Google` response evidence.
Service-account JSON and long-lived cloud secrets are not accepted in the profile.

`memorybank-hindsight-local` targets the self-hosted Hindsight HTTP 0.8 dialect through
`HindsightLocalMemoryBankClient`. Its candidate profile is stored separately at
`configs/memory/hindsight-local/memory-profile.candidate.yaml` and remains disabled until the
pinned image completes required live acceptance. `hypha.memorybank.v1` remains an internal protocol
compatibility fixture and must not be used as deployment configuration.

## Hindsight local deployment

The repository pins both the Hindsight image tag and OCI digest. Copy the environment template,
provide the selected LLM configuration, and start the service from the repository root:

```powershell
Copy-Item configs/memory/hindsight-local/.env.example configs/memory/hindsight-local/.env
docker compose --env-file configs/memory/hindsight-local/.env `
  -f configs/memory/hindsight-local/compose.yaml up -d
```

The API binds to `127.0.0.1:8888` and the UI to `127.0.0.1:9999` by default. The named Docker volume
persists Hindsight data across container restarts. Do not commit `.env`, API keys, Provider data, or
a third-party source checkout. Remote endpoints require HTTPS; cleartext HTTP is accepted only for
loopback addresses.

Runtime composition must register `createHindsightLocalMemoryProviderFactory` and resolve
`memory.connection.hindsight-local`, `memory.mapping.durable`, and `memory.operation.durable`.
Production composition fails when either store is ephemeral or the pinned API version drifts.

## Mem0 OSS local deployment

The Mem0 Compose template builds the official upstream repository at an exact Git commit and pins
the pgvector image digest. It does not vendor third-party implementation code into Hypha.

```powershell
Copy-Item configs/memory/mem0-oss/.env.example configs/memory/mem0-oss/.env
# Set OPENAI_API_KEY, POSTGRES_PASSWORD, JWT_SECRET, and HYPHA_MEM0_OSS_API_KEY.
docker compose --env-file configs/memory/mem0-oss/.env `
  -f configs/memory/mem0-oss/compose.yaml up -d --build
```

Select `mem0-oss` in `configs/memory-profiles.yaml`, set
`HYPHA_MEM0_OSS_URL=http://127.0.0.1:8888`, and provide the same API key through
`HYPHA_MEM0_OSS_API_KEY`. The service binds only to loopback by default, keeps authentication
enabled, persists PostgreSQL data in a named volume, and opts out of upstream telemetry in the
provided environment template. Update the pinned upstream commit only through a separately
reviewed dependency change and rerun live-provider acceptance before release.

Production external profiles require durable `StructuredExternalMemoryMappingStore` and
`StructuredExternalProviderOperationStore` implementations. In-memory stores are permitted only
when the runtime profile explicitly selects `test` or `ephemeral` behavior.

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
provider work. Vertex Memory Bank create, update, and delete operations use durable long-running
operation receipts; a pending or unknown provider response is never reported as a completed write.
