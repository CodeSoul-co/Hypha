# `@codesoul-co/hypha-memory` / `context-source-resolver`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-source-resolver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)
- Exports: **5**

## Using this module

Use the Context source resolver module for using the public contracts and operations for this capability boundary. It exports 3 classes, 1 interface, 1 type.

### Import from the package entrypoint

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

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CallbackContextSourceResolver` | class | <code>new CallbackContextSourceResolver(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Callback Context Source Resolver class with 4 public constructor or member entries; its exact declarations are listed below. |
| `DefaultContextSourceResolverRegistry` | class | <code>new DefaultContextSourceResolverRegistry(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Default Context Source Resolver Registry class with 2 public constructor or member entries; its exact declarations are listed below. |
| `SourceResolvingMemoryContextBuilder` | class | <code>new SourceResolvingMemoryContextBuilder(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Source Resolving Memory Context Builder class with 3 public constructor or member entries; its exact declarations are listed below. |
| `CallbackContextSourceResolverOptions` | interface | <code>interface CallbackContextSourceResolverOptions</code> | Callback Context Source Resolver Options interface with 3 public fields or methods. |
| `ContextSourceLoader` | type | <code>type ContextSourceLoader = (request: ContextSourceResolutionInput) =&gt; Promise&lt;ContextItem[]&gt;</code> | Public type alias for Context Source Loader; the declaration contains its complete type expression. |

## `CallbackContextSourceResolver`

Callback Context Source Resolver class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { CallbackContextSourceResolver } from '@codesoul-co/hypha-memory';`
- Source module: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### Declaration

```text
export declare class CallbackContextSourceResolver implements ContextSourceResolver {
    readonly id: string;
    constructor(options: CallbackContextSourceResolverOptions);
    supports(source: ContextSourceSpec): boolean;
    resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: CallbackContextSourceResolverOptions): CallbackContextSourceResolver</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolve` | method | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `supports` | method | <code>supports(source: ContextSourceSpec): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultContextSourceResolverRegistry`

Default Context Source Resolver Registry class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultContextSourceResolverRegistry } from '@codesoul-co/hypha-memory';`
- Source module: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### Declaration

```text
export declare class DefaultContextSourceResolverRegistry implements ContextSourceResolverRegistry {
    constructor(resolvers: readonly ContextSourceResolver[]);
    resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(resolvers: readonly ContextSourceResolver[]): DefaultContextSourceResolverRegistry</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SourceResolvingMemoryContextBuilder`

Source Resolving Memory Context Builder class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SourceResolvingMemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- Source module: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### Declaration

```text
export declare class SourceResolvingMemoryContextBuilder {
    constructor(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder);
    build(request: ResolvedContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ResolvedContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(sources: ContextSourceResolverRegistry, builder?: MemoryContextBuilder): SourceResolvingMemoryContextBuilder</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `CallbackContextSourceResolverOptions`

Callback Context Source Resolver Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CallbackContextSourceResolverOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### Declaration

```text
export interface CallbackContextSourceResolverOptions {
    id: string;
    sourceTypes: ContextSourceType[];
    load: ContextSourceLoader;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `load` | method | <code>load(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sourceTypes` | property | <code>sourceTypes: ContextSourceType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceLoader`

Public type alias for Context Source Loader; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ContextSourceLoader } from '@codesoul-co/hypha-memory';`
- Source module: [`context-source-resolver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-source-resolver.ts)

### Declaration

```text
export type ContextSourceLoader = (request: ContextSourceResolutionInput) => Promise<ContextItem[]>;
```
