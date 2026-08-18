# `@codesoul-co/hypha-storage` / `recovery`

- 包索引: [`@codesoul-co/hypha-storage`](/zh/api/storage)
- 模块指南: [学习与组合说明](/zh/packages/storage)
- 源码: [`packages/storage/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseStorageRecovery` | 函数 | <code>adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice</code> | advise Storage Recovery 的公开运行时操作。 |
| `classifyStorageFailure` | 函数 | <code>classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure</code> | Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect. |
| `StorageFailureContext` | 接口 | <code>interface StorageFailureContext</code> | Storage Failure Context 的字段契约；完整字段见下表。 |
| `StorageRecoveryAdvice` | 接口 | <code>interface StorageRecoveryAdvice</code> | Storage Recovery Advice 的字段契约；完整字段见下表。 |
| `StorageRecoveryOperation` | 类型 | <code>type StorageRecoveryOperation = 'read' &#124; 'query' &#124; 'list' &#124; 'write' &#124; 'update' &#124; 'delete' &#124; 'transaction_begin' &#124; 'transaction_commit' &#124; 'transaction_rollback' &#124; 'event_append' &#124; 'artifact_write' &#124; 'artifact_delete' &#124; 'lease_acquire' &#124; 'lease_renew' &#124; 'lease_release' &#124; 'snapshot' &#124; 'restore'</code> | Storage Recovery Operation 的公共类型别名。 |

## `StorageFailureContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `engine` | 属性 | <code>engine: StorageEngine</code> | engine 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: string &#124; number</code> | expected Revision 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observedRevision` | 属性 | <code>observedRevision: string &#124; number</code> | observed Revision 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `operation` | 属性 | <code>operation: StorageRecoveryOperation</code> | operation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `resourceKey` | 属性 | <code>resourceKey: string</code> | resource Key 字段。 |
| `role` | 属性 | <code>role: StorageRole</code> | role 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `StorageRecoveryAdvice` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidateDerivedCaches` | 属性 | <code>invalidateDerivedCaches: boolean</code> | invalidate Derived Caches 字段。 |
| `mayUseCompatibleReplica` | 属性 | <code>mayUseCompatibleReplica: boolean</code> | may Use Compatible Replica 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `refreshRevisionBeforeRetry` | 属性 | <code>refreshRevisionBeforeRetry: boolean</code> | refresh Revision Before Retry 字段。 |
| `requireReconciliation` | 属性 | <code>requireReconciliation: boolean</code> | require Reconciliation 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |
