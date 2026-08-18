# `@codesoul-co/hypha-memory` / `context-source-resolver`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-source-resolver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)
- 导出数: **5**

## 模块用法

用于使用该功能边界的公共契约与操作。Context source resolver 模块公开 3 类、1 接口、1 类型。

### 从包入口导入

```ts
import {
  CallbackContextSourceResolver,
  DefaultContextSourceResolverRegistry,
  SourceResolvingMemoryContextBuilder,
} from '@codesoul-co/hypha-memory';

import type {
  CallbackContextSourceResolverOptions,
  ContextSourceLoader,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CallbackContextSourceResolver` | 类 | <code>new CallbackContextSourceResolver(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Callback Context Source Resolver 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultContextSourceResolverRegistry` | 类 | <code>new DefaultContextSourceResolverRegistry(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Default Context Source Resolver Registry 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SourceResolvingMemoryContextBuilder` | 类 | <code>new SourceResolvingMemoryContextBuilder(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Source Resolving Memory Context Builder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `CallbackContextSourceResolverOptions` | 接口 | <code>interface CallbackContextSourceResolverOptions</code> | Callback Context Source Resolver Options 接口，共包含 3 个公开字段或方法。 |
| `ContextSourceLoader` | 类型 | <code>type ContextSourceLoader = (request: ContextSourceResolutionInput) =&gt; Promise&lt;ContextItem[]&gt;</code> | Context Source Loader 公共类型别名；完整类型表达式见声明。 |

## `CallbackContextSourceResolver`

Callback Context Source Resolver 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { CallbackContextSourceResolver } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### 声明

```text
export declare class CallbackContextSourceResolver implements ContextSourceResolver {
    readonly id: string;
    constructor(options: CallbackContextSourceResolverOptions);
    supports(source: ContextSourceSpec): boolean;
    resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolve` | 方法 | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supports` | 方法 | <code>supports(source: ContextSourceSpec): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultContextSourceResolverRegistry`

Default Context Source Resolver Registry 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultContextSourceResolverRegistry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### 声明

```text
export declare class DefaultContextSourceResolverRegistry implements ContextSourceResolverRegistry {
    constructor(resolvers: readonly ContextSourceResolver[]);
    resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SourceResolvingMemoryContextBuilder`

Source Resolving Memory Context Builder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SourceResolvingMemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### 声明

```text
export declare class SourceResolvingMemoryContextBuilder {
    constructor(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder);
    build(request: ResolvedContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ResolvedContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `CallbackContextSourceResolverOptions`

Callback Context Source Resolver Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CallbackContextSourceResolverOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### 声明

```text
export interface CallbackContextSourceResolverOptions {
    id: string;
    sourceTypes: ContextSourceType[];
    load: ContextSourceLoader;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `load` | 方法 | <code>load(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sourceTypes` | 属性 | <code>sourceTypes: ContextSourceType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceLoader`

Context Source Loader 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ContextSourceLoader } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### 声明

```text
export type ContextSourceLoader = (request: ContextSourceResolutionInput) => Promise<ContextItem[]>;
```
