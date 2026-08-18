# `@codesoul-co/hypha-memory` / `context-source-resolver`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-source-resolver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CallbackContextSourceResolver` | 类 | <code>new CallbackContextSourceResolver(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Callback Context Source Resolver 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultContextSourceResolverRegistry` | 类 | <code>new DefaultContextSourceResolverRegistry(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Default Context Source Resolver Registry 的运行时实现；公开构造函数与成员见下表。 |
| `SourceResolvingMemoryContextBuilder` | 类 | <code>new SourceResolvingMemoryContextBuilder(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Source Resolving Memory Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `CallbackContextSourceResolverOptions` | 接口 | <code>interface CallbackContextSourceResolverOptions</code> | Callback Context Source Resolver Options 的字段契约；完整字段见下表。 |
| `ContextSourceLoader` | 类型 | <code>type ContextSourceLoader = (request: ContextSourceResolutionInput) =&gt; Promise&lt;ContextItem[]&gt;</code> | Context Source Loader 的公共类型别名。 |

## `CallbackContextSourceResolver` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `resolve` | 方法 | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 解析 resolve。 |
| `supports` | 方法 | <code>supports(source: ContextSourceSpec): boolean</code> | supports 的公开运行时操作。 |

## `DefaultContextSourceResolverRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | 解析 resolve。 |

## `SourceResolvingMemoryContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ResolvedContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | explain 的公开运行时操作。 |

## `CallbackContextSourceResolverOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `load` | 方法 | <code>load(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 加载 load。 |
| `sourceTypes` | 属性 | <code>sourceTypes: ContextSourceType[]</code> | source Types 字段。 |
