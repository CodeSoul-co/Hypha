# `@codesoul-co/hypha-core` / `modules/runtime/runtime-capacity-semaphore`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeCapacitySemaphore` | 类 | <code>new InMemoryRuntimeCapacitySemaphore(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | In Memory Runtime Capacity Semaphore 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryRuntimeCapacitySemaphoreOptions` | 接口 | <code>interface InMemoryRuntimeCapacitySemaphoreOptions</code> | In Memory Runtime Capacity Semaphore Options 的字段契约；完整字段见下表。 |

## `InMemoryRuntimeCapacitySemaphore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 断言 Current。 |
| `constructor` | 构造函数 | <code>(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | renew 的公开运行时操作。 |
| `usage` | 方法 | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | usage 的公开运行时操作。 |

## `InMemoryRuntimeCapacitySemaphoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `policy` | 属性 | <code>policy: RuntimeCapacityPolicy</code> | policy 字段。 |
