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
v3 additive/search/list pipeline. Use independent `MemoryBankLocalClient` and
`MemoryBankManagedClient` instances. Deployment semantics are never inferred from a URL. Secrets and customer endpoints remain application
configuration and must not be embedded in Framework profiles or fixtures.

See the [adapter and operations guide](./memory-provider-adapter-and-operations.md) and
[validated profile templates](./memory-provider-profiles.md).
