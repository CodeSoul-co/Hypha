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

For Mem0, configure `deployment` explicitly as `managed` or `self_hosted`; do not infer deployment
semantics from the URL. Deployment-specific endpoint and capability negotiation belongs to the
external-provider implementation stage. Secrets and customer endpoints remain application
configuration and must not be embedded in Framework profiles or fixtures.
