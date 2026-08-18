# `@codesoul-co/hypha-memory` / `provider-reconciliation`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-reconciliation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createProviderReconciliationHandler` | function | <code>createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler</code> | Creates Provider Reconciliation Handler at this module boundary. |
| `enqueueProviderDeleteReconciliation` | function | <code>enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise&lt;MemoryLifecycleTask&lt;ProviderDeleteReconciliationPayload&gt;[]&gt;</code> | Public runtime operation for enqueue Provider Delete Reconciliation. |
| `ProviderDeleteReconciliationPayload` | interface | <code>interface ProviderDeleteReconciliationPayload</code> | Field contract for Provider Delete Reconciliation Payload; see all contract members below. |
| `ProviderReconciliationHandlerOptions` | interface | <code>interface ProviderReconciliationHandlerOptions</code> | Field contract for Provider Reconciliation Handler Options; see all contract members below. |

## `ProviderDeleteReconciliationPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operation` | property | <code>operation: "delete"</code> | Public operation property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `request` | property | <code>request: ManagedMemoryDeleteRequest</code> | Public request property. |

## `ProviderReconciliationHandlerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolveProvider` | method | <code>resolveProvider(providerId: string): MemoryManagementProvider &#124; undefined</code> | Resolves Provider at this module boundary. |
