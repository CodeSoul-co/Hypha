# External memory provider runtime

External memory providers must preserve two identifiers:

- `ManagedMemoryRecord.id` is a stable Hypha-owned identifier.
- `metadata.providerExternalId` is the provider-owned identifier.

Use `createExternalMemoryId(providerId, externalId)` when adapting provider records. Persist the
association with `StructuredExternalMemoryMappingStore` in production so get, update, history and
delete operations can resolve the provider identifier after a process restart. The in-memory
mapping store is intended for tests and ephemeral deployments only.

`ExternalMemoryClient` operations accept an optional `AbortSignal`. Provider clients must pass it
to their HTTP or SDK transport. `ExternalMemoryManagementAdapter` derives a child signal for each
attempt and aborts it when either the caller cancels or the configured provider timeout expires.

Use `Mem0OssClient` for the unprefixed self-hosted REST API and `Mem0PlatformClient` for the
v3 additive/search/list pipeline. `MemoryBankManagedClient` represents Vertex AI Memory Bank.
`MemoryBankLocalClient` is retained only as a package-level protocol compatibility fixture; it is
not a supported product runtime or live acceptance target. Deployment semantics are never inferred
from a URL. Secrets and customer endpoints remain application configuration and must not be
embedded in Framework profiles or fixtures.

## Live acceptance

`tests/integration/memory-external-providers.integration.test.ts` is the release acceptance entry.
Without external service configuration it reports the corresponding case as not run (skipped). Set
`HYPHA_MEMORY_EXTERNAL_ACCEPTANCE_MODE=required` to require every declared external Provider, or
set `HYPHA_MEMORY_EXTERNAL_ACCEPTANCE_REQUIRED_PROVIDERS` to a comma-separated subset such as
`mem0-oss,memorybank-managed`. A required but unconfigured Provider fails the suite.

Every executed live case also requires `HYPHA_ACCEPTANCE_COMMIT_SHA` (or `GITHUB_SHA`) and its
Provider version variable. The emitted evidence binds the commit, Provider id and version, profile
hash, capability snapshot, non-secret environment hash, start/end time, health, and explicit passed
status. Credentials and resource identifiers remain Provider-specific environment variables; never
reuse a Mem0 credential for Vertex or the reverse.

See the [adapter and operations guide](./memory-provider-adapter-and-operations.md) and
[validated profile templates](./memory-provider-profiles.md).
