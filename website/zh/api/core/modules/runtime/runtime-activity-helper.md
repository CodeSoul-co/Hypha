# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-helper`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-helper.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeActivityHelper` | 类 | <code>new DefaultRuntimeActivityHelper(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Default Runtime Activity Helper 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeEventActivityLifecycleCommitPort` | 类 | <code>new RuntimeEventActivityLifecycleCommitPort(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Runtime Event Activity Lifecycle Commit Port 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultRuntimeActivityHelperOptions` | 接口 | <code>interface DefaultRuntimeActivityHelperOptions</code> | Default Runtime Activity Helper Options 的字段契约；完整字段见下表。 |

## `DefaultRuntimeActivityHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | 创建该类的实例。 |
| `custom` | 方法 | <code>custom(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | custom 的公开运行时操作。 |
| `execution` | 方法 | <code>execution(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | execution 的公开运行时操作。 |
| `memory` | 方法 | <code>memory(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | memory 的公开运行时操作。 |
| `model` | 方法 | <code>model(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | model 的公开运行时操作。 |
| `tool` | 方法 | <code>tool(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | tool 的公开运行时操作。 |

## `RuntimeEventActivityLifecycleCommitPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | 创建该类的实例。 |

## `DefaultRuntimeActivityHelperOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `clock` | 属性 | <code>clock: { now(): Promise&lt;string&gt;; }</code> | clock 字段。 |
| `dispatch` | 属性 | <code>dispatch: RuntimeActivityDispatchPort</code> | dispatch 字段。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | execution 字段。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | ids 字段。 |
| `lifecycle` | 属性 | <code>lifecycle: RuntimeActivityLifecycleCommitPort</code> | lifecycle 字段。 |
