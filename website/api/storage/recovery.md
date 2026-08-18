# `@codesoul-co/hypha-storage` / `recovery`

- Package index: [`@codesoul-co/hypha-storage`](/api/storage)
- Package guide: [learning and composition guide](/packages/storage)
- Source: [`packages/storage/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseStorageRecovery` | function | <code>adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice</code> | Public runtime operation for advise Storage Recovery. |
| `classifyStorageFailure` | function | <code>classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure</code> | Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect. |
| `StorageFailureContext` | interface | <code>interface StorageFailureContext</code> | Field contract for Storage Failure Context; see all contract members below. |
| `StorageRecoveryAdvice` | interface | <code>interface StorageRecoveryAdvice</code> | Field contract for Storage Recovery Advice; see all contract members below. |
| `StorageRecoveryOperation` | type | <code>type StorageRecoveryOperation = 'read' &#124; 'query' &#124; 'list' &#124; 'write' &#124; 'update' &#124; 'delete' &#124; 'transaction_begin' &#124; 'transaction_commit' &#124; 'transaction_rollback' &#124; 'event_append' &#124; 'artifact_write' &#124; 'artifact_delete' &#124; 'lease_acquire' &#124; 'lease_renew' &#124; 'lease_release' &#124; 'snapshot' &#124; 'restore'</code> | Public type alias for Storage Recovery Operation. |

## `StorageFailureContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `engine` | property | <code>engine: StorageEngine</code> | Public engine property. |
| `expectedRevision` | property | <code>expectedRevision: string &#124; number</code> | Public expected Revision property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observedRevision` | property | <code>observedRevision: string &#124; number</code> | Public observed Revision property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `operation` | property | <code>operation: StorageRecoveryOperation</code> | Public operation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public resource Key property. |
| `role` | property | <code>role: StorageRole</code> | Public role property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `StorageRecoveryAdvice` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidateDerivedCaches` | property | <code>invalidateDerivedCaches: boolean</code> | Public invalidate Derived Caches property. |
| `mayUseCompatibleReplica` | property | <code>mayUseCompatibleReplica: boolean</code> | Public may Use Compatible Replica property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `refreshRevisionBeforeRetry` | property | <code>refreshRevisionBeforeRetry: boolean</code> | Public refresh Revision Before Retry property. |
| `requireReconciliation` | property | <code>requireReconciliation: boolean</code> | Public require Reconciliation property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |
