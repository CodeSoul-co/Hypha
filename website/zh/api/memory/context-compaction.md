# `@codesoul-co/hypha-memory` / `context-compaction`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-compaction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicExtractiveContextCompactor` | 类 | <code>new DeterministicExtractiveContextCompactor(): DeterministicExtractiveContextCompactor</code> | Deterministic Extractive Context Compactor 的运行时实现；公开构造函数与成员见下表。 |
| `ContextCompactionRequest` | 接口 | <code>interface ContextCompactionRequest</code> | Context Compaction Request 的字段契约；完整字段见下表。 |
| `ContextCompactor` | 接口 | <code>interface ContextCompactor</code> | Context Compactor 的字段契约；完整字段见下表。 |

## `DeterministicExtractiveContextCompactor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compact` | 方法 | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | compact 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): DeterministicExtractiveContextCompactor</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: "context.compactor.extractive-v1"</code> | id 字段。 |

## `ContextCompactionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: ContextItem[]</code> | items 字段。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `tokenizer` | 属性 | <code>tokenizer: TokenEstimator</code> | tokenizer 字段。 |

## `ContextCompactor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compact` | 方法 | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | compact 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
