# `@codesoul-co/hypha-memory` / `recovery`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseMemoryRecovery` | 函数 | <code>adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice</code> | advise Memory Recovery 的公开运行时操作。 |
| `classifyMemoryFailure` | 函数 | <code>classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure</code> | classify Memory Failure 的公开运行时操作。 |
| `MemoryFailureContext` | 接口 | <code>interface MemoryFailureContext</code> | Memory Failure Context 的字段契约；完整字段见下表。 |
| `MemoryRecoveryAdvice` | 接口 | <code>interface MemoryRecoveryAdvice</code> | Memory Recovery Advice 的字段契约；完整字段见下表。 |
| `MemoryRecoveryScope` | 接口 | <code>interface MemoryRecoveryScope</code> | Memory Recovery Scope 的字段契约；完整字段见下表。 |
| `MemoryRecoveryOperation` | 类型 | <code>type MemoryRecoveryOperation = 'read' &#124; 'search' &#124; 'write' &#124; 'update' &#124; 'invalidate' &#124; 'summarize' &#124; 'audit'</code> | Memory Recovery Operation 的公共类型别名。 |

## `MemoryFailureContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensationAvailable` | 属性 | <code>compensationAvailable: boolean</code> | compensation Available 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `operation` | 属性 | <code>operation: MemoryRecoveryOperation</code> | operation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `recordId` | 属性 | <code>recordId: string</code> | record Id 字段。 |
| `scope` | 属性 | <code>scope: MemoryRecoveryScope</code> | scope 字段。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | side Effect State 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `MemoryRecoveryAdvice` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBoundedEmptyResult` | 属性 | <code>allowBoundedEmptyResult: boolean</code> | allow Bounded Empty Result 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |

## `MemoryRecoveryScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
