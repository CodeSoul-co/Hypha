# `@codesoul-co/hypha-core` / `modules/execution/recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseExecutionRecovery` | 函数 | <code>adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice</code> | advise Execution Recovery 的公开运行时操作。 |
| `classifyExecutionFailure` | 函数 | <code>classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure</code> | classify Execution Failure 的公开运行时操作。 |
| `ExecutionFailureContext` | 接口 | <code>interface ExecutionFailureContext</code> | Execution Failure Context 的字段契约；完整字段见下表。 |
| `ExecutionRecoveryAdvice` | 接口 | <code>interface ExecutionRecoveryAdvice</code> | Execution Recovery Advice 的字段契约；完整字段见下表。 |
| `ExecutionRecoveryOperation` | 类型 | <code>type ExecutionRecoveryOperation = 'validate' &#124; 'queue' &#124; 'start' &#124; 'poll' &#124; 'cancel' &#124; 'persist' &#124; 'cleanup'</code> | Execution Recovery Operation 的公共类型别名。 |

## `ExecutionFailureContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessment` | 属性 | <code>assessment: ExecutionRecoveryAssessment</code> | assessment 字段。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `operation` | 属性 | <code>operation: ExecutionRecoveryOperation</code> | operation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | record 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | request 字段。 |
| `result` | 属性 | <code>result: CommandExecutionResult</code> | result 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `ExecutionRecoveryAdvice` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `refreshRecordBeforeRetry` | 属性 | <code>refreshRecordBeforeRetry: boolean</code> | refresh Record Before Retry 字段。 |
| `requireReceiptReconciliation` | 属性 | <code>requireReceiptReconciliation: boolean</code> | require Receipt Reconciliation 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |
