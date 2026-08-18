# `@codesoul-co/hypha-models` / `index`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 源码: [`packages/models/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)
- 导出数: **36**

## 模块用法

聚合 `@codesoul-co/hypha-models` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  MockModelProvider,
  ModelRegistry,
  modelAliasSpecDefinition,
  modelAliasSpecExample,
  modelAliasSpecJsonSchema,
  modelAliasSpecSchema,
  modelCapabilitiesSchema,
  modelProviderSpecDefinition,
} from '@codesoul-co/hypha-models';

import type {
  ModelAliasSpec,
  ModelCacheControl,
  ModelCapabilities,
  ModelMessage,
  ModelProvider,
  ModelProviderSpec,
  ModelRequest,
  ModelResponse,
} from '@codesoul-co/hypha-models';

// 完整导出列表见下方。
```

### 使用要点

- 15 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 16 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { modelAliasSpecSchema } from '@codesoul-co/hypha-models';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = modelAliasSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MockModelProvider` | 类 | <code>new MockModelProvider(id?: string): MockModelProvider</code> | Mock Model Provider 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ModelRegistry` | 类 | <code>new ModelRegistry(): ModelRegistry</code> | Model Registry 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `modelAliasSpecDefinition` | 常量 | <code>const modelAliasSpecDefinition: SpecSchemaDefinition&lt;ModelAliasSpec&gt;</code> | Model Alias Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelAliasSpecExample` | 常量 | <code>const modelAliasSpecExample: ModelAliasSpec</code> | Model Alias Spec 的有效示例值。 |
| `modelAliasSpecJsonSchema` | 常量 | <code>const modelAliasSpecJsonSchema: JsonSchema</code> | Model Alias Spec 的 JSON Schema。 |
| `modelAliasSpecSchema` | 常量 | <code>const modelAliasSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip...</code> | Model Alias Spec 的运行时 Schema。 |
| `modelCapabilitiesSchema` | 常量 | <code>const modelCapabilitiesSchema: z.ZodObject&lt;{ chat: z.ZodOptional&lt;z.ZodBoolean&gt;; streaming: z.ZodOptional&lt;z.ZodBoolean&gt;; toolCalling: z.ZodOptional&lt;z.ZodBoolean&gt;; jsonMode: z.ZodOptional&lt;z.ZodBoolean&gt;; embeddings: z.ZodOptional&lt;z.ZodBoolean&gt;; reasoning: z.ZodOptional&lt;z.ZodBoolean&gt;; prefixCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; kvCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strip", z.ZodTypeAny, { chat?: boolean &#124; undefi...</code> | Model Capabilities 的运行时 Schema。 |
| `modelProviderSpecDefinition` | 常量 | <code>const modelProviderSpecDefinition: SpecSchemaDefinition&lt;ModelProviderSpec&gt;</code> | Model Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelProviderSpecExample` | 常量 | <code>const modelProviderSpecExample: ModelProviderSpec</code> | Model Provider Spec 的有效示例值。 |
| `modelProviderSpecJsonSchema` | 常量 | <code>const modelProviderSpecJsonSchema: JsonSchema</code> | Model Provider Spec 的 JSON Schema。 |
| `modelProviderSpecSchema` | 常量 | <code>const modelProviderSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodString; defaultModelAlias: z.ZodOptional&lt;z.ZodString&gt;; capabilities:...</code> | Model Provider Spec 的运行时 Schema。 |
| `modelRequestSchema` | 常量 | <code>const modelRequestSchema: z.ZodObject&lt;{ runId: z.ZodString; stepId: z.ZodString; modelAlias: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodUnknown; tools: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; name: z.ZodString; description: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodTypeAny, { id: string; name: string; description: string; inp...</code> | Model Request 的运行时 Schema。 |
| `modelRoutingSpecDefinition` | 常量 | <code>const modelRoutingSpecDefinition: SpecSchemaDefinition&lt;ModelRoutingSpec&gt;</code> | Model Routing Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `modelRoutingSpecExample` | 常量 | <code>const modelRoutingSpecExample: ModelRoutingSpec</code> | Model Routing Spec 的有效示例值。 |
| `modelRoutingSpecJsonSchema` | 常量 | <code>const modelRoutingSpecJsonSchema: JsonSchema</code> | Model Routing Spec 的 JSON Schema。 |
| `modelRoutingSpecSchema` | 常量 | <code>const modelRoutingSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { defaultAlias: z.ZodString; aliases: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ve...</code> | Model Routing Spec 的运行时 Schema。 |
| `modelSpecDefinitions` | 常量 | <code>const modelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ModelProviderSpec&gt;, SpecSchemaDefinition&lt;ModelAliasSpec&gt;, SpecSchemaDefinition&lt;ModelRoutingSpec&gt;]</code> | 由 `index` 模块导出的 Model Spec Definitions 常量。 |
| `modelSpecJsonSchemas` | 常量 | <code>const modelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Model Spec JSON Schemas 常量。 |
| `validateModelAliasSpec` | 函数 | <code>validateModelAliasSpec(input: unknown): ModelAliasSpec</code> | Validate Model Alias Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateModelProviderSpec` | 函数 | <code>validateModelProviderSpec(input: unknown): ModelProviderSpec</code> | Validate Model Provider Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateModelRoutingSpec` | 函数 | <code>validateModelRoutingSpec(input: unknown): ModelRoutingSpec</code> | Validate Model Routing Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ModelAliasSpec` | 接口 | <code>interface ModelAliasSpec extends VersionedSpec, SpecMetadata</code> | Model Alias Spec 接口，共包含 11 个公开字段或方法。 |
| `ModelCacheControl` | 接口 | <code>interface ModelCacheControl</code> | Model Cache Control 接口，共包含 4 个公开字段或方法。 |
| `ModelCapabilities` | 接口 | <code>interface ModelCapabilities</code> | Model Capabilities 接口，共包含 8 个公开字段或方法。 |
| `ModelMessage` | 接口 | <code>interface ModelMessage</code> | Model Message 接口，共包含 4 个公开字段或方法。 |
| `ModelProvider` | 接口 | <code>interface ModelProvider</code> | Model Provider 接口，共包含 5 个公开字段或方法。 |
| `ModelProviderSpec` | 接口 | <code>interface ModelProviderSpec extends VersionedSpec, SpecMetadata</code> | Model Provider Spec 接口，共包含 14 个公开字段或方法。 |
| `ModelRequest` | 接口 | <code>interface ModelRequest</code> | Model Request 接口，共包含 12 个公开字段或方法。 |
| `ModelResponse` | 接口 | <code>interface ModelResponse</code> | Model Response 接口，共包含 8 个公开字段或方法。 |
| `ModelRoutingSpec` | 接口 | <code>interface ModelRoutingSpec extends VersionedSpec, SpecMetadata</code> | Model Routing Spec 接口，共包含 11 个公开字段或方法。 |
| `ModelStreamEvent` | 接口 | <code>interface ModelStreamEvent</code> | Model Stream Event 接口，共包含 5 个公开字段或方法。 |
| `ModelToolDescriptor` | 接口 | <code>interface ModelToolDescriptor</code> | Model Tool Descriptor 接口，共包含 4 个公开字段或方法。 |
| `ModelUsage` | 接口 | <code>interface ModelUsage</code> | Model Usage 接口，共包含 5 个公开字段或方法。 |
| `NormalizedToolCall` | 接口 | <code>interface NormalizedToolCall</code> | Normalized Tool Call 接口，共包含 3 个公开字段或方法。 |
| `ReasoningOptions` | 接口 | <code>interface ReasoningOptions</code> | Reasoning Options 接口，共包含 2 个公开字段或方法。 |
| `ModelProviderType` | 类型 | <code>type ModelProviderType = 'openai' &#124; 'openai-compatible' &#124; 'mock' &#124; string</code> | Model Provider Type 公共类型别名；完整类型表达式见声明。 |

## `MockModelProvider`

Mock Model Provider 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockModelProvider } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare class MockModelProvider implements ModelProvider {
    readonly id: string;
    constructor(id?: string);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
    countTokens(input: unknown): Promise<ModelUsage>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(id?: string): MockModelProvider</code> | 创建该类的实例。 |
| `countTokens` | 方法 | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ModelRegistry`

Model Registry 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ModelRegistry } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare class ModelRegistry {
    register(provider: ModelProvider): void;
    get(providerId: string): ModelProvider | null;
    list(): ModelProvider[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ModelRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(providerId: string): ModelProvider &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): ModelProvider[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(provider: ModelProvider): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `modelAliasSpecDefinition`

Model Alias Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { modelAliasSpecDefinition } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelAliasSpecDefinition: SpecSchemaDefinition<ModelAliasSpec>;
```

## `modelAliasSpecExample`

Model Alias Spec 的有效示例值。

- 种类: 常量
- 导入: `import { modelAliasSpecExample } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelAliasSpecExample: ModelAliasSpec;
```

## `modelAliasSpecJsonSchema`

Model Alias Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { modelAliasSpecJsonSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelAliasSpecJsonSchema: JsonSchema;
```

## `modelAliasSpecSchema`

Model Alias Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { modelAliasSpecSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelAliasSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }>;
```

## `modelCapabilitiesSchema`

Model Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { modelCapabilitiesSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelCapabilitiesSchema: z.ZodObject<{ chat: z.ZodOptional<z.ZodBoolean>; streaming: z.ZodOptional<z.ZodBoolean>; toolCalling: z.ZodOptional<z.ZodBoolean>; jsonMode: z.ZodOptional<z.ZodBoolean>; embeddings: z.ZodOptional<z.ZodBoolean>; reasoning: z.ZodOptional<z.ZodBoolean>; prefixCaching: z.ZodOptional<z.ZodBoolean>; kvCaching: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }>;
```

## `modelProviderSpecDefinition`

Model Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { modelProviderSpecDefinition } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelProviderSpecDefinition: SpecSchemaDefinition<ModelProviderSpec>;
```

## `modelProviderSpecExample`

Model Provider Spec 的有效示例值。

- 种类: 常量
- 导入: `import { modelProviderSpecExample } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelProviderSpecExample: ModelProviderSpec;
```

## `modelProviderSpecJsonSchema`

Model Provider Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { modelProviderSpecJsonSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelProviderSpecJsonSchema: JsonSchema;
```

## `modelProviderSpecSchema`

Model Provider Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { modelProviderSpecSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelProviderSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodString; defaultModelAlias: z.ZodOptional<z.ZodString>; capabilities: z.ZodOptional<z.ZodObject<{ chat: z.ZodOptional<z.ZodBoolean>; streaming: z.ZodOptional<z.ZodBoolean>; toolCalling: z.ZodOptional<z.ZodBoolean>; jsonMode: z.ZodOptional<z.ZodBoolean>; embeddings: z.ZodOptional<z.ZodBoolean>; reasoning: z.ZodOptional<z.ZodBoolean>; prefixCaching: z.ZodOptional<z.ZodBoolean>; kvCaching: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }>>; apiKeyEnv: z.ZodOptional<z.ZodString>; baseUrl: z.ZodOptional<z.ZodString>; timeoutMs: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { type: string; id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; defaultModelAlias?: string | undefined; capabilities?: { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; } | undefined; apiKeyEnv?: string | undefined; baseUrl?: string | undefined; timeoutMs?: number | undefined; }, { type: string; id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; defaultModelAlias?: string | undefined; capabilities?: { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; } | undefined; apiKeyEnv?: string | undefined; baseUrl?: string | undefined; timeoutMs?: number | undefined; }>;
```

## `modelRequestSchema`

Model Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { modelRequestSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const modelRequestSchema: (typeof import('@codesoul-co/hypha-models'))['modelRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `modelRoutingSpecDefinition`

Model Routing Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { modelRoutingSpecDefinition } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelRoutingSpecDefinition: SpecSchemaDefinition<ModelRoutingSpec>;
```

## `modelRoutingSpecExample`

Model Routing Spec 的有效示例值。

- 种类: 常量
- 导入: `import { modelRoutingSpecExample } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelRoutingSpecExample: ModelRoutingSpec;
```

## `modelRoutingSpecJsonSchema`

Model Routing Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { modelRoutingSpecJsonSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelRoutingSpecJsonSchema: JsonSchema;
```

## `modelRoutingSpecSchema`

Model Routing Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { modelRoutingSpecSchema } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelRoutingSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { defaultAlias: z.ZodString; aliases: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }>, "many">; fallbackAliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; defaultAlias: string; aliases: { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }[]; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; fallbackAliases?: string[] | undefined; }, { id: string; version: string; defaultAlias: string; aliases: { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }[]; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; fallbackAliases?: string[] | undefined; }>;
```

## `modelSpecDefinitions`

由 `index` 模块导出的 Model Spec Definitions 常量。

- 种类: 常量
- 导入: `import { modelSpecDefinitions } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelSpecDefinitions: readonly [SpecSchemaDefinition<ModelProviderSpec>, SpecSchemaDefinition<ModelAliasSpec>, SpecSchemaDefinition<ModelRoutingSpec>];
```

## `modelSpecJsonSchemas`

由 `index` 模块导出的 Model Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { modelSpecJsonSchemas } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare const modelSpecJsonSchemas: Record<string, JsonSchema>;
```

## `validateModelAliasSpec`

Validate Model Alias Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateModelAliasSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare function validateModelAliasSpec(input: unknown): ModelAliasSpec;
```

### 调用签名

```text
validateModelAliasSpec(input: unknown): ModelAliasSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelAliasSpec`
- 说明: 返回值契约由上述类型定义。

## `validateModelProviderSpec`

Validate Model Provider Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateModelProviderSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare function validateModelProviderSpec(input: unknown): ModelProviderSpec;
```

### 调用签名

```text
validateModelProviderSpec(input: unknown): ModelProviderSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelProviderSpec`
- 说明: 返回值契约由上述类型定义。

## `validateModelRoutingSpec`

Validate Model Routing Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateModelRoutingSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export declare function validateModelRoutingSpec(input: unknown): ModelRoutingSpec;
```

### 调用签名

```text
validateModelRoutingSpec(input: unknown): ModelRoutingSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelRoutingSpec`
- 说明: 返回值契约由上述类型定义。

## `ModelAliasSpec`

Model Alias Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelAliasSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelAliasSpec extends VersionedSpec, SpecMetadata {
    alias: string;
    providerId: string;
    providerModel: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alias` | 属性 | <code>alias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerModel` | 属性 | <code>providerModel: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelCacheControl`

Model Cache Control 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelCacheControl } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelCacheControl {
    prefixContent?: string;
    kvCacheValue?: unknown;
    kvCacheRef?: {
        id: string;
        provider: string;
        modelAlias: string;
        scope: 'run' | 'session' | 'workspace';
        expiresAt?: string;
        metadata?: Record<string, unknown>;
    };
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kvCacheRef` | 属性 | <code>kvCacheRef?: { id: string; provider: string; modelAlias: string; scope: "run" &#124; "session" &#124; "workspace"; expiresAt?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheValue` | 属性 | <code>kvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixContent` | 属性 | <code>prefixContent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelCapabilities`

Model Capabilities 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelCapabilities } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelCapabilities {
    chat?: boolean;
    streaming?: boolean;
    toolCalling?: boolean;
    jsonMode?: boolean;
    embeddings?: boolean;
    reasoning?: boolean;
    prefixCaching?: boolean;
    kvCaching?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `chat` | 属性 | <code>chat?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddings` | 属性 | <code>embeddings?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jsonMode` | 属性 | <code>jsonMode?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCaching` | 属性 | <code>kvCaching?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixCaching` | 属性 | <code>prefixCaching?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoning` | 属性 | <code>reasoning?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streaming` | 属性 | <code>streaming?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalling` | 属性 | <code>toolCalling?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelMessage`

Model Message 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelMessage } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelMessage {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    name?: string;
    toolCallId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCallId` | 属性 | <code>toolCallId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelProvider`

Model Provider 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelProvider } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelProvider<TRequest = ModelRequest, TResponse = ModelResponse> {
    id: string;
    capabilities(): ModelCapabilities;
    generate(request: TRequest): Promise<TResponse>;
    stream?(request: TRequest): AsyncIterable<ModelStreamEvent>;
    countTokens?(input: unknown): Promise<ModelUsage>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `countTokens` | 方法 | <code>countTokens?(input: unknown): Promise&lt;ModelUsage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `generate` | 方法 | <code>generate(request: TRequest): Promise&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream?(request: TRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ModelProviderSpec`

Model Provider Spec 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelProviderSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelProviderSpec extends VersionedSpec, SpecMetadata {
    id: string;
    type: ModelProviderType;
    defaultModelAlias?: string;
    capabilities?: ModelCapabilities;
    apiKeyEnv?: string;
    baseUrl?: string;
    timeoutMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities?: ModelCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultModelAlias` | 属性 | <code>defaultModelAlias?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelRequest`

Model Request 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelRequest } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelRequest<TInput = unknown> {
    runId: string;
    stepId: string;
    modelAlias: string;
    instructions?: string;
    input: TInput;
    tools?: ModelToolDescriptor[];
    responseFormat?: SpecRef | JsonSchema;
    reasoning?: ReasoningOptions;
    temperature?: number;
    maxTokens?: number;
    cache?: ModelCacheControl;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache?: ModelCacheControl</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTokens` | 属性 | <code>maxTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoning` | 属性 | <code>reasoning?: ReasoningOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseFormat` | 属性 | <code>responseFormat?: SpecRef &#124; JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temperature` | 属性 | <code>temperature?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: ModelToolDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelResponse`

Model Response 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelResponse } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelResponse<TContent = string> {
    id: string;
    providerId?: string;
    model?: string;
    content: TContent;
    toolCalls?: NormalizedToolCall[];
    usage?: ModelUsage;
    metadata?: Record<string, unknown>;
    raw?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: TContent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `raw` | 属性 | <code>raw?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls?: NormalizedToolCall[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: ModelUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelRoutingSpec`

Model Routing Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelRoutingSpec } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelRoutingSpec extends VersionedSpec, SpecMetadata {
    defaultAlias: string;
    aliases: ModelAliasSpec[];
    fallbackAliases?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases: ModelAliasSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultAlias` | 属性 | <code>defaultAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackAliases` | 属性 | <code>fallbackAliases?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelStreamEvent`

Model Stream Event 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelStreamEvent } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelStreamEvent<TContent = string> {
    type: 'delta' | 'tool_call' | 'usage' | 'done' | 'error';
    content?: TContent;
    toolCall?: NormalizedToolCall;
    usage?: ModelUsage;
    error?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content?: TContent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCall` | 属性 | <code>toolCall?: NormalizedToolCall</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "error" &#124; "delta" &#124; "tool_call" &#124; "usage" &#124; "done"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: ModelUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelToolDescriptor`

Model Tool Descriptor 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelToolDescriptor } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelToolDescriptor {
    id: string;
    name: string;
    description: string;
    inputSchema: JsonSchema;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelUsage`

Model Usage 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelUsage } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ModelUsage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    cacheHitTokens?: number;
    cacheMissTokens?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheHitTokens` | 属性 | <code>cacheHitTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheMissTokens` | 属性 | <code>cacheMissTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputTokens` | 属性 | <code>inputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputTokens` | 属性 | <code>outputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedToolCall`

Normalized Tool Call 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedToolCall } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface NormalizedToolCall {
    id: string;
    toolId: string;
    arguments: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `arguments` | 属性 | <code>arguments: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningOptions`

Reasoning Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningOptions } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export interface ReasoningOptions {
    effort?: 'low' | 'medium' | 'high';
    budgetTokens?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budgetTokens` | 属性 | <code>budgetTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effort` | 属性 | <code>effort?: "low" &#124; "medium" &#124; "high"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelProviderType`

Model Provider Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ModelProviderType } from '@codesoul-co/hypha-models';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### 声明

```text
export type ModelProviderType = 'openai' | 'openai-compatible' | 'mock' | string;
```
