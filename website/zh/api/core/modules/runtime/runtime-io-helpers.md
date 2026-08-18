# `@codesoul-co/hypha-core` / `modules/runtime/runtime-io-helpers`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-io-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeEventHelper` | 类 | <code>new DefaultRuntimeEventHelper(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Default Runtime Event Helper 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultRuntimeResourceHelper` | 类 | <code>new DefaultRuntimeResourceHelper(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Default Runtime Resource Helper 的运行时实现；公开构造函数与成员见下表。 |
| `DurableRuntimeEventCommitPort` | 类 | <code>new DurableRuntimeEventCommitPort(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Durable Runtime Event Commit Port 的运行时实现；公开构造函数与成员见下表。 |
| `createRuntimeIoHelperSdk` | 函数 | <code>createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk</code> | 创建 Runtime Io Helper Sdk。 |
| `DefaultRuntimeEventHelperOptions` | 接口 | <code>interface DefaultRuntimeEventHelperOptions</code> | Default Runtime Event Helper Options 的字段契约；完整字段见下表。 |

## `DefaultRuntimeEventHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;T extends RuntimeJsonValue&gt;(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | 追加 append。 |
| `appendBatch` | 方法 | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | 追加 Batch。 |
| `constructor` | 构造函数 | <code>(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | 创建该类的实例。 |
| `readSince` | 方法 | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | read Since 的公开运行时操作。 |

## `DefaultRuntimeResourceHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | 断言 Current。 |
| `constructor` | 构造函数 | <code>(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | renew 的公开运行时操作。 |

## `DurableRuntimeEventCommitPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | 创建该类的实例。 |
| `readSince` | 方法 | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | read Since 的公开运行时操作。 |

## `DefaultRuntimeEventHelperOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>clock: { now(): Promise&lt;string&gt;; }</code> | clock 字段。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | execution 字段。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | ids 字段。 |
| `port` | 属性 | <code>port: RuntimeEventCommitPort</code> | port 字段。 |
