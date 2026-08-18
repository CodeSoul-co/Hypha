# `@codesoul-co/hypha-core` / `modules/runtime/projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryProjectionStore` | 类 | <code>new InMemoryProjectionStore&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | In Memory Projection Store 的运行时实现；公开构造函数与成员见下表。 |
| `ProjectionEngine` | 类 | <code>new ProjectionEngine(options: ProjectionEngineOptions): ProjectionEngine</code> | Projection Engine 的运行时实现；公开构造函数与成员见下表。 |
| `validateProjectionRecord` | 函数 | <code>validateProjectionRecord&lt;TState&gt;(record: ProjectionRecord&lt;TState&gt;): void</code> | 校验 Projection Record。 |
| `ProjectionDefinition` | 接口 | <code>interface ProjectionDefinition</code> | Projection Definition 的字段契约；完整字段见下表。 |
| `ProjectionEngineOptions` | 接口 | <code>interface ProjectionEngineOptions</code> | Projection Engine Options 的字段契约；完整字段见下表。 |
| `ProjectionRecord` | 接口 | <code>interface ProjectionRecord</code> | Projection Record 的字段契约；完整字段见下表。 |
| `ProjectionStore` | 接口 | <code>interface ProjectionStore</code> | Projection Store 的字段契约；完整字段见下表。 |

## `InMemoryProjectionStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |

## `ProjectionEngine` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ProjectionEngineOptions): ProjectionEngine</code> | 创建该类的实例。 |
| `rebuild` | 方法 | <code>rebuild&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | rebuild 的公开运行时操作。 |
| `update` | 方法 | <code>update&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | update 的公开运行时操作。 |

## `ProjectionDefinition` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applies` | 方法 | <code>applies(event: PersistedFrameworkEvent): boolean</code> | applies 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `initialState` | 方法 | <code>initialState(): TState</code> | initial State 的公开运行时操作。 |
| `reduce` | 方法 | <code>reduce(state: TState, event: PersistedFrameworkEvent): TState</code> | reduce 的公开运行时操作。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ProjectionEngineOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | events 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |

## `ProjectionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | last Sequence 字段。 |
| `projectionId` | 属性 | <code>projectionId: string</code> | projection Id 字段。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | projection Version 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `state` | 属性 | <code>state: TState</code> | state 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `ProjectionStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |
