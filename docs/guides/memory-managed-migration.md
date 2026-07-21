# Managed Memory API Migration

`GovernedMemoryManager` is the canonical entry point for managed Memory operations. It executes
every add, search, get, list, update, delete, and history request through `MemoryActivityPort`, so
policy, harness hooks, bounded events, cancellation, timeout, and normalized failures are applied
before a provider is invoked.

The older `MemoryManager` plus `MemoryProvider` API remains available as a compatibility surface for
existing Kernel integrations. New managed integrations must not call a `MemoryManagementProvider`
directly or use the managed forwarding methods on the compatibility manager.

## Assembly

```ts
const activities = new DefaultMemoryActivityPort({ policy, events, harness });
registerMemoryManagementProviderHandlers(activities, provider);

const memory = new GovernedMemoryManager({
  activities,
  profileRef: memoryProfileRef,
  eventContext: (request) => ({
    runId: request.scope.runId ?? request.operationId,
    workspaceId: request.scope.workspaceId,
  }),
  reconciliationStore: lifecycleTaskStore,
});
```

When deletion is only partially confirmed, the manager writes one deterministic
`provider_reconciliation` task per pending provider. Production assembly should use
`StructuredMemoryLifecycleTaskStore`; the in-memory store is intended for deterministic tests.

Extraction jobs, batches, and cursors can be persisted with
`StructuredMemoryExtractionStateStore`. Cursor updates use compare-and-set semantics inside the
provided `StructuredStoreProvider` transaction.

## Compatibility window

- Existing `MemoryProvider` consumers may continue using `MemoryManager` during migration.
- New code should use managed request/record/scope types and `GovernedMemoryManager`.
- Provider implementations should accept the optional `AbortSignal` and stop remote work when the
  signal is aborted.
- Provider-specific SDK types must remain inside adapters.
- Domain binding, Runtime orchestration, Cache runtime, EventStore, and Server handlers remain owned
  by their corresponding branches; this migration changes no other Owner implementation.
