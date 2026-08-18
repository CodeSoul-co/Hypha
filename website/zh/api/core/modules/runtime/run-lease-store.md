# `@codesoul-co/hypha-core` / `modules/runtime/run-lease-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRunLeaseStore` | 类 | <code>new InMemoryRunLeaseStore(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | In Memory Run Lease Store 的运行时实现；公开构造函数与成员见下表。 |
| `runLeaseGuard` | 函数 | <code>runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }</code> | run Lease Guard 的公开运行时操作。 |
| `runLeaseScopeKey` | 函数 | <code>runLeaseScopeKey(scope: RunLeaseScope): string</code> | run Lease Scope Key 的公开运行时操作。 |
| `InMemoryRunLeaseStoreOptions` | 接口 | <code>interface InMemoryRunLeaseStoreOptions</code> | In Memory Run Lease Store Options 的字段契约；完整字段见下表。 |

## `InMemoryRunLeaseStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 断言 Current。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 读取 get。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | heartbeat 的公开运行时操作。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | preempt 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |

## `InMemoryRunLeaseStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
