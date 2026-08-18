# `@codesoul-co/hypha-adapters-local` / `run-lease-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRunLeaseStore` | 类 | <code>new SQLiteRunLeaseStore(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | SQ Lite Run Lease Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteRunLeaseStoreOptions` | 接口 | <code>interface SQLiteRunLeaseStoreOptions</code> | SQ Lite Run Lease Store Options 的字段契约；完整字段见下表。 |

## `SQLiteRunLeaseStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 断言 Current。 |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 读取 get。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | heartbeat 的公开运行时操作。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | preempt 的公开运行时操作。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |

## `SQLiteRunLeaseStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
