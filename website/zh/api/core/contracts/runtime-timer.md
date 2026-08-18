# `@codesoul-co/hypha-core` / `contracts/runtime-timer`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-timer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_TIMER_SWEEP_DISPOSITIONS` | 常量 | <code>const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"]</code> | 由 `contracts/runtime-timer` 模块导出的 RUNTIME TIMER SWEEP DISPOSITIONS 常量。 |
| `RuntimeTimerStreamScope` | 接口 | <code>interface RuntimeTimerStreamScope</code> | Runtime Timer Stream Scope 的字段契约；完整字段见下表。 |
| `RuntimeTimerSweepRequest` | 接口 | <code>interface RuntimeTimerSweepRequest</code> | Runtime Timer Sweep Request 的字段契约；完整字段见下表。 |
| `RuntimeTimerSweepResult` | 接口 | <code>interface RuntimeTimerSweepResult</code> | Runtime Timer Sweep Result 的字段契约；完整字段见下表。 |
| `RuntimeTimerSweepRunResult` | 接口 | <code>interface RuntimeTimerSweepRunResult</code> | Runtime Timer Sweep Run Result 的字段契约；完整字段见下表。 |
| `RuntimeTimerSweepDisposition` | 类型 | <code>type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number]</code> | Runtime Timer Sweep Disposition 的公共类型别名。 |

## `RuntimeTimerStreamScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeTimerSweepRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `firedAt` | 属性 | <code>firedAt: string</code> | fired At 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `RuntimeTimerSweepResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alreadyResolved` | 属性 | <code>alreadyResolved: number</code> | already Resolved 字段。 |
| `fired` | 属性 | <code>fired: number</code> | fired 字段。 |
| `leaseUnavailable` | 属性 | <code>leaseUnavailable: number</code> | lease Unavailable 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |
| `notDue` | 属性 | <code>notDue: number</code> | not Due 字段。 |
| `results` | 属性 | <code>results: RuntimeTimerSweepRunResult[]</code> | results 字段。 |
| `scanned` | 属性 | <code>scanned: number</code> | scanned 字段。 |

## `RuntimeTimerSweepRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "lease_unavailable" &#124; "fired" &#124; "not_due" &#124; "already_resolved"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `scope` | 属性 | <code>scope: RuntimeTimerStreamScope</code> | scope 字段。 |
