# `@codesoul-co/hypha-inference` / `reasoning-registry`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/reasoning-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ReasoningStrategyRegistry` | 类 | <code>new ReasoningStrategyRegistry(): ReasoningStrategyRegistry</code> | Reasoning Strategy Registry 的运行时实现；公开构造函数与成员见下表。 |
| `ReasoningStrategy` | 接口 | <code>interface ReasoningStrategy</code> | Reasoning Strategy 的字段契约；完整字段见下表。 |
| `ReasoningStrategyContext` | 接口 | <code>interface ReasoningStrategyContext</code> | Reasoning Strategy Context 的字段契约；完整字段见下表。 |
| `ReasoningStrategyDescriptor` | 接口 | <code>interface ReasoningStrategyDescriptor</code> | Reasoning Strategy Descriptor 的字段契约；完整字段见下表。 |
| `ReasoningStrategyReference` | 接口 | <code>interface ReasoningStrategyReference</code> | Reasoning Strategy Reference 的字段契约；完整字段见下表。 |
| `ReasoningStrategyRuntime` | 接口 | <code>interface ReasoningStrategyRuntime</code> | Reasoning Strategy Runtime 的字段契约；完整字段见下表。 |

## `ReasoningStrategyRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ReasoningStrategyRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(idOrAlias: string): ReasoningStrategy &#124; null</code> | 读取 get。 |
| `has` | 方法 | <code>has(idOrAlias: string): boolean</code> | 判断是否存在 has。 |
| `list` | 方法 | <code>list(): ReasoningStrategyDescriptor[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(strategy: ReasoningStrategy, options?: { replace?: boolean; }): void</code> | 注册 register。 |
| `require` | 方法 | <code>require(idOrAlias: string): ReasoningStrategy</code> | require 的公开运行时操作。 |
| `unregister` | 方法 | <code>unregister(id: string): boolean</code> | unregister 的公开运行时操作。 |

## `ReasoningStrategy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `descriptor` | 属性 | <code>descriptor: ReasoningStrategyDescriptor</code> | descriptor 字段。 |
| `execute` | 方法 | <code>execute(context: ReasoningStrategyContext): Promise&lt;InferenceResponse&gt;</code> | execute 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(context: ReasoningStrategyContext): AsyncIterable&lt;InferenceResponse&gt;</code> | stream 的公开运行时操作。 |

## `ReasoningStrategyContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `options` | 属性 | <code>options: ReasoningOptions</code> | options 字段。 |
| `request` | 属性 | <code>request: ReasoningRequest&lt;unknown&gt;</code> | request 字段。 |
| `runtime` | 属性 | <code>runtime: ReasoningStrategyRuntime</code> | runtime 字段。 |

## `ReasoningStrategyDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases: string[]</code> | aliases 字段。 |
| `capabilities` | 属性 | <code>capabilities: { branching: boolean; graph: boolean; aggregation: boolean; streaming: boolean; toolLoop: boolean; }</code> | capabilities 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `method` | 属性 | <code>method: ReasoningMethod</code> | method 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `references` | 属性 | <code>references: ReasoningStrategyReference[]</code> | references 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ReasoningStrategyReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: "repository" &#124; "paper" &#124; "documentation"</code> | kind 字段。 |
| `license` | 属性 | <code>license: string</code> | license 字段。 |
| `notes` | 属性 | <code>notes: string</code> | notes 字段。 |
| `official` | 属性 | <code>official: boolean</code> | official 字段。 |
| `repository` | 属性 | <code>repository: string</code> | repository 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |
| `usage` | 属性 | <code>usage: "referenced" &#124; "adapted"</code> | usage 字段。 |

## `ReasoningStrategyRuntime` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aggregate` | 方法 | <code>aggregate(responses: InferenceResponse[], defaultAggregation?: ReasoningOptions["aggregation"]): Promise&lt;InferenceResponse&gt;</code> | aggregate 的公开运行时操作。 |
| `assertBudget` | 方法 | <code>assertBudget(nodeCount?: number): void</code> | 断言 Budget。 |
| `callProvider` | 方法 | <code>callProvider(metadata: Record&lt;string, unknown&gt;): Promise&lt;InferenceResponse&gt;</code> | call Provider 的公开运行时操作。 |
| `maxNodes` | 属性 | <code>maxNodes: number</code> | max Nodes 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: number</code> | model Calls 字段。 |
| `score` | 方法 | <code>score(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt;</code> | score 的公开运行时操作。 |
| `trace` | 方法 | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt;</code> | trace 的公开运行时操作。 |
| `withReasoningMetadata` | 方法 | <code>withReasoningMetadata(response: InferenceResponse, reasoning: Record&lt;string, unknown&gt;): InferenceResponse</code> | with Reasoning Metadata 的公开运行时操作。 |
