# `@codesoul-co/hypha-inference` / `reasoning-registry`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/reasoning-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)
- 导出数: **6**

## 模块用法

用于注册并解析版本化能力或实现。Reasoning registry 模块公开 1 类、5 接口。

### 从包入口导入

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

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ReasoningStrategyRegistry` | 类 | <code>new ReasoningStrategyRegistry(): ReasoningStrategyRegistry</code> | Reasoning Strategy Registry 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReasoningStrategy` | 接口 | <code>interface ReasoningStrategy</code> | Reasoning Strategy 接口，共包含 3 个公开字段或方法。 |
| `ReasoningStrategyContext` | 接口 | <code>interface ReasoningStrategyContext</code> | Reasoning Strategy Context 接口，共包含 3 个公开字段或方法。 |
| `ReasoningStrategyDescriptor` | 接口 | <code>interface ReasoningStrategyDescriptor</code> | Reasoning Strategy Descriptor 接口，共包含 9 个公开字段或方法。 |
| `ReasoningStrategyReference` | 接口 | <code>interface ReasoningStrategyReference</code> | Reasoning Strategy Reference 接口，共包含 9 个公开字段或方法。 |
| `ReasoningStrategyRuntime` | 接口 | <code>interface ReasoningStrategyRuntime</code> | Reasoning Strategy Runtime 接口，共包含 8 个公开字段或方法。 |

## `ReasoningStrategyRegistry`

Reasoning Strategy Registry 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReasoningStrategyRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ReasoningStrategyRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(idOrAlias: string): ReasoningStrategy &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `has` | 方法 | <code>has(idOrAlias: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): ReasoningStrategyDescriptor[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(strategy: ReasoningStrategy, options?: { replace?: boolean; }): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `require` | 方法 | <code>require(idOrAlias: string): ReasoningStrategy</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unregister` | 方法 | <code>unregister(id: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReasoningStrategy`

Reasoning Strategy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningStrategy } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

```text
export interface ReasoningStrategy {
    descriptor: ReasoningStrategyDescriptor;
    execute(context: ReasoningStrategyContext): Promise<InferenceResponse>;
    stream?(context: ReasoningStrategyContext): AsyncIterable<InferenceResponse>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `descriptor` | 属性 | <code>descriptor: ReasoningStrategyDescriptor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execute` | 方法 | <code>execute(context: ReasoningStrategyContext): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream?(context: ReasoningStrategyContext): AsyncIterable&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReasoningStrategyContext`

Reasoning Strategy Context 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningStrategyContext } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

```text
export interface ReasoningStrategyContext {
    request: ReasoningRequest;
    options: ReasoningOptions;
    runtime: ReasoningStrategyRuntime;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `options` | 属性 | <code>options: ReasoningOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: ReasoningRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtime` | 属性 | <code>runtime: ReasoningStrategyRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningStrategyDescriptor`

Reasoning Strategy Descriptor 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningStrategyDescriptor } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities: { branching: boolean; graph: boolean; aggregation: boolean; streaming: boolean; toolLoop: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: ReasoningMethod</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `references` | 属性 | <code>references: ReasoningStrategyReference[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningStrategyReference`

Reasoning Strategy Reference 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningStrategyReference } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: "repository" &#124; "paper" &#124; "documentation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `license` | 属性 | <code>license?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `notes` | 属性 | <code>notes?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `official` | 属性 | <code>official: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repository` | 属性 | <code>repository?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage: "referenced" &#124; "adapted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningStrategyRuntime`

Reasoning Strategy Runtime 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningStrategyRuntime } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aggregate` | 方法 | <code>aggregate(responses: InferenceResponse[], defaultAggregation?: ReasoningOptions["aggregation"]): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertBudget` | 方法 | <code>assertBudget(nodeCount?: number): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `callProvider` | 方法 | <code>callProvider(metadata: Record&lt;string, unknown&gt;): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `maxNodes` | 属性 | <code>readonly maxNodes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>readonly modelCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 方法 | <code>score(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `trace` | 方法 | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `withReasoningMetadata` | 方法 | <code>withReasoningMetadata(response: InferenceResponse, reasoning: Record&lt;string, unknown&gt;): InferenceResponse</code> | 公开方法；参数与返回类型以签名列为准。 |
