# Memory provider profiles

The templates in `configs/memory-profiles.yaml` describe Framework profiles. They do not assemble
Server clients, resolve secrets, start containers, or create cloud accounts.

## Support matrix

| Profile              | Status             | Persistence                              | Real test entry                       |
| -------------------- | ------------------ | ---------------------------------------- | ------------------------------------- |
| `native-lite`        | validated          | process-local test/preview state         | package suite                         |
| `native-default`     | validated          | structured store plus recoverable outbox | package suite                         |
| `mem0-oss`           | validated contract | self-hosted Mem0                         | `HYPHA_TEST_MEM0_OSS_URL`             |
| `mem0-platform`      | controlled test    | Mem0 Platform v3                         | `HYPHA_TEST_MEM0_PLATFORM_TOKEN`      |
| `memorybank-local`   | validated contract | service-defined                          | `HYPHA_TEST_MEMORYBANK_LOCAL_URL`     |
| `memorybank-managed` | controlled test    | Vertex AI Memory Bank                    | `HYPHA_TEST_MEMORYBANK_MANAGED_TOKEN` |

“Validated contract” means mock protocol, error, scope, cancellation, receipt, and management
contract tests pass. “Controlled test” additionally means the live-cloud entry exists but is not run
without explicit credentials. It is not a claim that a particular cloud account has passed release
acceptance.

## Minimal selection

Select exactly one management profile. If its concrete factory is not installed,
`MemoryManagementProviderRegistry.resolve` fails startup with
`MEMORY_PROVIDER_NOT_INSTALLED`; it never silently switches providers.

Credentials are references only. Runtime assembly resolves the named environment variable or secret
manager reference and passes the value to the concrete client. Do not put tokens, service-account
JSON, certificates, customer endpoints, or user data in a profile.

## Migration and rollback

Before changing providers, export structured records and external-id mappings, capture profile and
provider revisions, and stop new writes. Migrate with stable Hypha memory IDs and scope hashes,
rebuild derived vector indexes, and reconcile provider receipts. Rollback selects the previous
profile revision and restores mappings; it must not copy stale vector results back into the
structured source of truth.

Unknown external writes remain quarantined until reconciliation proves their outcome. Deletion is
complete only when `MemoryDeletionEvidence` verifies all requested IDs or lists the outstanding
provider work.
