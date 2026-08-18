# `@codesoul-co/hypha-memory` / `recovery`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseMemoryRecovery` | function | <code>adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice</code> | Public runtime operation for advise Memory Recovery. |
| `classifyMemoryFailure` | function | <code>classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure</code> | Public runtime operation for classify Memory Failure. |
| `MemoryFailureContext` | interface | <code>interface MemoryFailureContext</code> | Field contract for Memory Failure Context; see all contract members below. |
| `MemoryRecoveryAdvice` | interface | <code>interface MemoryRecoveryAdvice</code> | Field contract for Memory Recovery Advice; see all contract members below. |
| `MemoryRecoveryScope` | interface | <code>interface MemoryRecoveryScope</code> | Field contract for Memory Recovery Scope; see all contract members below. |
| `MemoryRecoveryOperation` | type | <code>type MemoryRecoveryOperation = 'read' &#124; 'search' &#124; 'write' &#124; 'update' &#124; 'invalidate' &#124; 'summarize' &#124; 'audit'</code> | Public type alias for Memory Recovery Operation. |

## `MemoryFailureContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensationAvailable` | property | <code>compensationAvailable: boolean</code> | Public compensation Available property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `operation` | property | <code>operation: MemoryRecoveryOperation</code> | Public operation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `recordId` | property | <code>recordId: string</code> | Public record Id property. |
| `scope` | property | <code>scope: MemoryRecoveryScope</code> | Public scope property. |
| `sideEffectState` | property | <code>sideEffectState: RecoverySideEffectState</code> | Public side Effect State property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `MemoryRecoveryAdvice` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBoundedEmptyResult` | property | <code>allowBoundedEmptyResult: boolean</code> | Public allow Bounded Empty Result property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |

## `MemoryRecoveryScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
