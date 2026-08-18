# `@codesoul-co/hypha-core` / `contracts/runtime-control`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CONTROL_DISPOSITIONS` | 常量 | <code>const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | 由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL DISPOSITIONS 常量。 |
| `RUNTIME_CONTROL_KINDS` | 常量 | <code>const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"]</code> | 由 `contracts/runtime-control` 模块导出的 RUNTIME CONTROL KINDS 常量。 |
| `RuntimePauseCommand` | 接口 | <code>interface RuntimePauseCommand extends RuntimeRunControlCommandBase</code> | Runtime Pause Command 的字段契约；完整字段见下表。 |
| `RuntimeResumeCommand` | 接口 | <code>interface RuntimeResumeCommand extends RuntimeRunControlCommandBase</code> | Runtime Resume Command 的字段契约；完整字段见下表。 |
| `RuntimeRunControlResult` | 接口 | <code>interface RuntimeRunControlResult</code> | Runtime Run Control Result 的字段契约；完整字段见下表。 |
| `RuntimeSignalCommand` | 接口 | <code>interface RuntimeSignalCommand extends RuntimeRunControlCommandBase</code> | Runtime Signal Command 的字段契约；完整字段见下表。 |
| `RuntimeControlDisposition` | 类型 | <code>type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number]</code> | Runtime Control Disposition 的公共类型别名。 |
| `RuntimeControlKind` | 类型 | <code>type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number]</code> | Runtime Control Kind 的公共类型别名。 |
| `RuntimeRunControlCommand` | 类型 | <code>type RuntimeRunControlCommand = RuntimePauseCommand &#124; RuntimeResumeCommand &#124; RuntimeSignalCommand</code> | Runtime Run Control Command 的公共类型别名。 |

## `RuntimePauseCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `kind` | 属性 | <code>kind: "pause"</code> | kind 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `resumeKey` | 属性 | <code>resumeKey: string</code> | resume Key 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeResumeCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `kind` | 属性 | <code>kind: "resume"</code> | kind 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `payload` | 属性 | <code>payload: RuntimeJsonValue</code> | payload 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeRunControlResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `kind` | 属性 | <code>kind: "signal" &#124; "resume" &#124; "pause"</code> | kind 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |

## `RuntimeSignalCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `kind` | 属性 | <code>kind: "signal"</code> | kind 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `payload` | 属性 | <code>payload: RuntimeJsonValue</code> | payload 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `sentAt` | 属性 | <code>sentAt: string</code> | sent At 字段。 |
