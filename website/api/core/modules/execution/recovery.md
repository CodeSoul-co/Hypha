# `@codesoul-co/hypha-core` / `modules/execution/recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseExecutionRecovery` | function | <code>adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice</code> | Public runtime operation for advise Execution Recovery. |
| `classifyExecutionFailure` | function | <code>classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure</code> | Public runtime operation for classify Execution Failure. |
| `ExecutionFailureContext` | interface | <code>interface ExecutionFailureContext</code> | Field contract for Execution Failure Context; see all contract members below. |
| `ExecutionRecoveryAdvice` | interface | <code>interface ExecutionRecoveryAdvice</code> | Field contract for Execution Recovery Advice; see all contract members below. |
| `ExecutionRecoveryOperation` | type | <code>type ExecutionRecoveryOperation = 'validate' &#124; 'queue' &#124; 'start' &#124; 'poll' &#124; 'cancel' &#124; 'persist' &#124; 'cleanup'</code> | Public type alias for Execution Recovery Operation. |

## `ExecutionFailureContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessment` | property | <code>assessment: ExecutionRecoveryAssessment</code> | Public assessment property. |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `operation` | property | <code>operation: ExecutionRecoveryOperation</code> | Public operation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `record` | property | <code>record: ExecutionRecord</code> | Public record property. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public request property. |
| `result` | property | <code>result: CommandExecutionResult</code> | Public result property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `ExecutionRecoveryAdvice` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `refreshRecordBeforeRetry` | property | <code>refreshRecordBeforeRetry: boolean</code> | Public refresh Record Before Retry property. |
| `requireReceiptReconciliation` | property | <code>requireReceiptReconciliation: boolean</code> | Public require Receipt Reconciliation property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |
