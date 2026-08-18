# `@codesoul-co/hypha-core` / `modules/runtime/state-execution-claim-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryStateExecutionClaimStore` | 类 | <code>new InMemoryStateExecutionClaimStore(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | In Memory State Execution Claim Store 的运行时实现；公开构造函数与成员见下表。 |
| `stateExecutionClaimGuard` | 函数 | <code>stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard</code> | state Execution Claim Guard 的公开运行时操作。 |
| `stateExecutionClaimScopeKey` | 函数 | <code>stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string</code> | state Execution Claim Scope Key 的公开运行时操作。 |
| `InMemoryStateExecutionClaimStoreOptions` | 接口 | <code>interface InMemoryStateExecutionClaimStoreOptions</code> | In Memory State Execution Claim Store Options 的字段契约；完整字段见下表。 |

## `InMemoryStateExecutionClaimStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 断言 Current。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 读取 get。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | renew 的公开运行时操作。 |

## `InMemoryStateExecutionClaimStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | run Lease Store 字段。 |
