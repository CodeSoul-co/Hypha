# `@codesoul-co/hypha-adapters-local` / `state-execution-claim-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteStateExecutionClaimStore` | 类 | <code>new SQLiteStateExecutionClaimStore(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | SQ Lite State Execution Claim Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteStateExecutionClaimStoreOptions` | 接口 | <code>interface SQLiteStateExecutionClaimStoreOptions</code> | SQ Lite State Execution Claim Store Options 的字段契约；完整字段见下表。 |

## `SQLiteStateExecutionClaimStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 断言 Current。 |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 读取 get。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | renew 的公开运行时操作。 |

## `SQLiteStateExecutionClaimStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | run Lease Store 字段。 |
