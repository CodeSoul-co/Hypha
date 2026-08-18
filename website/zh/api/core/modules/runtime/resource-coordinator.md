# `@codesoul-co/hypha-core` / `modules/runtime/resource-coordinator`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/resource-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeResourceCoordinator` | 类 | <code>new InMemoryRuntimeResourceCoordinator(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | In Memory Runtime Resource Coordinator 的运行时实现；公开构造函数与成员见下表。 |
| `resourceClaimGuard` | 函数 | <code>resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }</code> | resource Claim Guard 的公开运行时操作。 |
| `InMemoryRuntimeResourceCoordinatorOptions` | 接口 | <code>interface InMemoryRuntimeResourceCoordinatorOptions</code> | In Memory Runtime Resource Coordinator Options 的字段契约；完整字段见下表。 |

## `InMemoryRuntimeResourceCoordinator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | 断言 Current。 |
| `constructor` | 构造函数 | <code>(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 列出 list。 |
| `release` | 方法 | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | renew 的公开运行时操作。 |

## `InMemoryRuntimeResourceCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | run Lease Store 字段。 |
