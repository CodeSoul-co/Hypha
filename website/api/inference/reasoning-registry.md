# `@codesoul-co/hypha-inference` / `reasoning-registry`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/reasoning-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)
- Exports: **6**

## Using this module

Use the Reasoning registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 5 interfaces.

### Import from the package entrypoint

```ts
import {
  ReasoningStrategyRegistry,
} from '@codesoul-co/hypha-inference';

import type {
  ReasoningStrategy,
  ReasoningStrategyContext,
  ReasoningStrategyDescriptor,
  ReasoningStrategyReference,
  ReasoningStrategyRuntime,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ReasoningStrategyRegistry` | class | <code>new ReasoningStrategyRegistry(): ReasoningStrategyRegistry</code> | Reasoning Strategy Registry class with 7 public constructor or member entries; its exact declarations are listed below. |
| `ReasoningStrategy` | interface | <code>interface ReasoningStrategy</code> | Reasoning Strategy interface with 3 public fields or methods. |
| `ReasoningStrategyContext` | interface | <code>interface ReasoningStrategyContext</code> | Reasoning Strategy Context interface with 3 public fields or methods. |
| `ReasoningStrategyDescriptor` | interface | <code>interface ReasoningStrategyDescriptor</code> | Reasoning Strategy Descriptor interface with 9 public fields or methods. |
| `ReasoningStrategyReference` | interface | <code>interface ReasoningStrategyReference</code> | Reasoning Strategy Reference interface with 9 public fields or methods. |
| `ReasoningStrategyRuntime` | interface | <code>interface ReasoningStrategyRuntime</code> | Reasoning Strategy Runtime interface with 8 public fields or methods. |

## `ReasoningStrategyRegistry`

Reasoning Strategy Registry class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReasoningStrategyRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export declare class ReasoningStrategyRegistry {
    register(strategy: ReasoningStrategy, options?: {
            replace?: boolean;
        }): void;
    unregister(id: string): boolean;
    get(idOrAlias: string): ReasoningStrategy | null;
    require(idOrAlias: string): ReasoningStrategy;
    has(idOrAlias: string): boolean;
    list(): ReasoningStrategyDescriptor[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ReasoningStrategyRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(idOrAlias: string): ReasoningStrategy &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `has` | method | <code>has(idOrAlias: string): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): ReasoningStrategyDescriptor[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(strategy: ReasoningStrategy, options?: { replace?: boolean; }): void</code> | Public method; parameters and return type are shown in the signature. |
| `require` | method | <code>require(idOrAlias: string): ReasoningStrategy</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(id: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `ReasoningStrategy`

Reasoning Strategy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningStrategy } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export interface ReasoningStrategy {
    descriptor: ReasoningStrategyDescriptor;
    execute(context: ReasoningStrategyContext): Promise<InferenceResponse>;
    stream?(context: ReasoningStrategyContext): AsyncIterable<InferenceResponse>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `descriptor` | property | <code>descriptor: ReasoningStrategyDescriptor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execute` | method | <code>execute(context: ReasoningStrategyContext): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream?(context: ReasoningStrategyContext): AsyncIterable&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReasoningStrategyContext`

Reasoning Strategy Context interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningStrategyContext } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export interface ReasoningStrategyContext {
    request: ReasoningRequest;
    options: ReasoningOptions;
    runtime: ReasoningStrategyRuntime;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `options` | property | <code>options: ReasoningOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: ReasoningRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtime` | property | <code>runtime: ReasoningStrategyRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningStrategyDescriptor`

Reasoning Strategy Descriptor interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningStrategyDescriptor } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export interface ReasoningStrategyDescriptor {
    id: string;
    version: string;
    method: ReasoningMethod;
    name: string;
    description: string;
    aliases?: string[];
    references: ReasoningStrategyReference[];
    capabilities: {
        branching: boolean;
        graph: boolean;
        aggregation: boolean;
        streaming: boolean;
        toolLoop: boolean;
    };
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities: { branching: boolean; graph: boolean; aggregation: boolean; streaming: boolean; toolLoop: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: ReasoningMethod</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `references` | property | <code>references: ReasoningStrategyReference[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningStrategyReference`

Reasoning Strategy Reference interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningStrategyReference } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export interface ReasoningStrategyReference {
    kind: 'repository' | 'paper' | 'documentation';
    title: string;
    url: string;
    repository?: string;
    revision?: string;
    license?: string;
    official: boolean;
    usage: 'adapted' | 'referenced';
    notes?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: "repository" &#124; "paper" &#124; "documentation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `license` | property | <code>license?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `notes` | property | <code>notes?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `official` | property | <code>official: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repository` | property | <code>repository?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage: "referenced" &#124; "adapted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningStrategyRuntime`

Reasoning Strategy Runtime interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningStrategyRuntime } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### Declaration

```text
export interface ReasoningStrategyRuntime {
    callProvider(metadata: Record<string, unknown>): Promise<InferenceResponse>;
    aggregate(responses: InferenceResponse[], defaultAggregation?: ReasoningOptions['aggregation']): Promise<InferenceResponse>;
    score(response: InferenceResponse, node: ThoughtNode): Promise<number>;
    withReasoningMetadata(response: InferenceResponse, reasoning: Record<string, unknown>): InferenceResponse;
    trace(event: ReasoningTraceEvent): Promise<void>;
    assertBudget(nodeCount?: number): void;
    readonly modelCalls: number;
    readonly maxNodes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aggregate` | method | <code>aggregate(responses: InferenceResponse[], defaultAggregation?: ReasoningOptions["aggregation"]): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertBudget` | method | <code>assertBudget(nodeCount?: number): void</code> | Public method; parameters and return type are shown in the signature. |
| `callProvider` | method | <code>callProvider(metadata: Record&lt;string, unknown&gt;): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `maxNodes` | property | <code>readonly maxNodes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>readonly modelCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | method | <code>score(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `trace` | method | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `withReasoningMetadata` | method | <code>withReasoningMetadata(response: InferenceResponse, reasoning: Record&lt;string, unknown&gt;): InferenceResponse</code> | Public method; parameters and return type are shown in the signature. |
