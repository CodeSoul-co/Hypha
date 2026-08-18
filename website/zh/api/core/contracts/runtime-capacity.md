# `@codesoul-co/hypha-core` / `contracts/runtime-capacity`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-capacity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CAPACITY_KINDS` | 常量 | <code>const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"]</code> | 由 `contracts/runtime-capacity` 模块导出的 RUNTIME CAPACITY KINDS 常量。 |
| `RuntimeCapacityAcquireRequest` | 接口 | <code>interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope</code> | Runtime Capacity Acquire Request 的字段契约；完整字段见下表。 |
| `RuntimeCapacityAssertionRequest` | 接口 | <code>interface RuntimeCapacityAssertionRequest</code> | Runtime Capacity Assertion Request 的字段契约；完整字段见下表。 |
| `RuntimeCapacityLease` | 接口 | <code>interface RuntimeCapacityLease extends RuntimeCapacityScope</code> | Runtime Capacity Lease 的字段契约；完整字段见下表。 |
| `RuntimeCapacityLeaseGuard` | 接口 | <code>interface RuntimeCapacityLeaseGuard</code> | Runtime Capacity Lease Guard 的字段契约；完整字段见下表。 |
| `RuntimeCapacityLimit` | 接口 | <code>interface RuntimeCapacityLimit</code> | Runtime Capacity Limit 的字段契约；完整字段见下表。 |
| `RuntimeCapacityPolicy` | 接口 | <code>interface RuntimeCapacityPolicy</code> | Runtime Capacity Policy 的字段契约；完整字段见下表。 |
| `RuntimeCapacityReleaseRequest` | 接口 | <code>interface RuntimeCapacityReleaseRequest</code> | Runtime Capacity Release Request 的字段契约；完整字段见下表。 |
| `RuntimeCapacityRenewRequest` | 接口 | <code>interface RuntimeCapacityRenewRequest</code> | Runtime Capacity Renew Request 的字段契约；完整字段见下表。 |
| `RuntimeCapacityScope` | 接口 | <code>interface RuntimeCapacityScope</code> | Runtime Capacity Scope 的字段契约；完整字段见下表。 |
| `RuntimeCapacitySemaphore` | 接口 | <code>interface RuntimeCapacitySemaphore</code> | Runtime Capacity Semaphore 的字段契约；完整字段见下表。 |
| `RuntimeCapacityUsage` | 接口 | <code>interface RuntimeCapacityUsage</code> | Runtime Capacity Usage 的字段契约；完整字段见下表。 |
| `RuntimeCapacityUsageRequest` | 接口 | <code>interface RuntimeCapacityUsageRequest</code> | Runtime Capacity Usage Request 的字段契约；完整字段见下表。 |
| `RuntimeCapacityKind` | 类型 | <code>type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number]</code> | Runtime Capacity Kind 的公共类型别名。 |

## `RuntimeCapacityAcquireRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | requested Lease Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeCapacityAssertionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | guard 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | scope 字段。 |

## `RuntimeCapacityLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | acquired At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | heartbeat At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeCapacityLeaseGuard` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `leaseId` | 属性 | <code>leaseId: string</code> | lease Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |

## `RuntimeCapacityLimit` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `global` | 属性 | <code>global: number</code> | global 字段。 |
| `perUser` | 属性 | <code>perUser: number</code> | per User 字段。 |

## `RuntimeCapacityPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limits` | 属性 | <code>limits: Record&lt;"tool" &#124; "model" &#124; "execution", RuntimeCapacityLimit&gt;</code> | limits 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `RuntimeCapacityReleaseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | guard 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | scope 字段。 |

## `RuntimeCapacityRenewRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | guard 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | renewed At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | scope 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `RuntimeCapacityScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeCapacitySemaphore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 断言 Current。 |
| `release` | 方法 | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | renew 的公开运行时操作。 |
| `usage` | 方法 | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | usage 的公开运行时操作。 |

## `RuntimeCapacityUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `globalActive` | 属性 | <code>globalActive: number</code> | global Active 字段。 |
| `globalLimit` | 属性 | <code>globalLimit: number</code> | global Limit 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `userActive` | 属性 | <code>userActive: number</code> | user Active 字段。 |
| `userLimit` | 属性 | <code>userLimit: number</code> | user Limit 字段。 |

## `RuntimeCapacityUsageRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | kind 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
