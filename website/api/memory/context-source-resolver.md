# `@codesoul-co/hypha-memory` / `context-source-resolver`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-source-resolver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CallbackContextSourceResolver` | class | <code>new CallbackContextSourceResolver(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Runtime implementation for Callback Context Source Resolver; see its public constructor and members below. |
| `DefaultContextSourceResolverRegistry` | class | <code>new DefaultContextSourceResolverRegistry(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Runtime implementation for Default Context Source Resolver Registry; see its public constructor and members below. |
| `SourceResolvingMemoryContextBuilder` | class | <code>new SourceResolvingMemoryContextBuilder(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Runtime implementation for Source Resolving Memory Context Builder; see its public constructor and members below. |
| `CallbackContextSourceResolverOptions` | interface | <code>interface CallbackContextSourceResolverOptions</code> | Field contract for Callback Context Source Resolver Options; see all contract members below. |
| `ContextSourceLoader` | type | <code>type ContextSourceLoader = (request: ContextSourceResolutionInput) =&gt; Promise&lt;ContextItem[]&gt;</code> | Public type alias for Context Source Loader. |

## `CallbackContextSourceResolver` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `resolve` | method | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Resolves resolve at this module boundary. |
| `supports` | method | <code>supports(source: ContextSourceSpec): boolean</code> | Public runtime operation for supports. |

## `DefaultContextSourceResolverRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | Resolves resolve at this module boundary. |

## `SourceResolvingMemoryContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ResolvedContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public runtime operation for explain. |

## `CallbackContextSourceResolverOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `load` | method | <code>load(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Loads load at this module boundary. |
| `sourceTypes` | property | <code>sourceTypes: ContextSourceType[]</code> | Public source Types property. |
