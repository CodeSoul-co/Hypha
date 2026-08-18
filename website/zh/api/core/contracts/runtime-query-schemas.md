# `@codesoul-co/hypha-core` / `contracts/runtime-query-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-query-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)
- 导出数: **22**

## 模块用法

用于声明并运行时校验契约。Runtime query schemas 模块公开 18 常量、4 函数。

### 从包入口导入

```ts
import {
  runtimeQueryContractDefinitions,
  runtimeQueryContractJsonSchemas,
  runtimeQueryRequestDefinition,
  runtimeQueryRequestExample,
  runtimeQueryRequestJsonSchema,
  runtimeQueryRequestSchema,
  runtimeRunViewDefinition,
  runtimeRunViewExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 18 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeQueryRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeQueryRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeQueryContractDefinitions` | 常量 | <code>const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;, SpecSchemaDefinition&lt;RuntimeRunView&gt;, SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;]</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Contract Definitions 常量。 |
| `runtimeQueryContractJsonSchemas` | 常量 | <code>const runtimeQueryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Contract JSON Schemas 常量。 |
| `runtimeQueryRequestDefinition` | 常量 | <code>const runtimeQueryRequestDefinition: SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Request Definition 常量。 |
| `runtimeQueryRequestExample` | 常量 | <code>const runtimeQueryRequestExample: RuntimeQueryRequest</code> | Runtime Query Request 的有效示例值。 |
| `runtimeQueryRequestJsonSchema` | 常量 | <code>const runtimeQueryRequestJsonSchema: JsonSchema</code> | Runtime Query Request 的 JSON Schema。 |
| `runtimeQueryRequestSchema` | 常量 | <code>const runtimeQueryRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; undef...</code> | Runtime Query Request 的运行时 Schema。 |
| `runtimeRunViewDefinition` | 常量 | <code>const runtimeRunViewDefinition: SpecSchemaDefinition&lt;RuntimeRunView&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime Run View Definition 常量。 |
| `runtimeRunViewExample` | 常量 | <code>const runtimeRunViewExample: RuntimeRunView</code> | Runtime Run View 的有效示例值。 |
| `runtimeRunViewJsonSchema` | 常量 | <code>const runtimeRunViewJsonSchema: JsonSchema</code> | Runtime Run View 的 JSON Schema。 |
| `runtimeRunViewSchema` | 常量 | <code>const runtimeRunViewSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | Runtime Run View 的运行时 Schema。 |
| `runtimeStateExplanationDefinition` | 常量 | <code>const runtimeStateExplanationDefinition: SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime State Explanation Definition 常量。 |
| `runtimeStateExplanationExample` | 常量 | <code>const runtimeStateExplanationExample: RuntimeStateExplanation</code> | Runtime State Explanation 的有效示例值。 |
| `runtimeStateExplanationJsonSchema` | 常量 | <code>const runtimeStateExplanationJsonSchema: JsonSchema</code> | Runtime State Explanation 的 JSON Schema。 |
| `runtimeStateExplanationSchema` | 常量 | <code>const runtimeStateExplanationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; u...</code> | Runtime State Explanation 的运行时 Schema。 |
| `runtimeTimelineRequestDefinition` | 常量 | <code>const runtimeTimelineRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 Runtime Timeline Request Definition 常量。 |
| `runtimeTimelineRequestExample` | 常量 | <code>const runtimeTimelineRequestExample: RuntimeTimelineRequest</code> | Runtime Timeline Request 的有效示例值。 |
| `runtimeTimelineRequestJsonSchema` | 常量 | <code>const runtimeTimelineRequestJsonSchema: JsonSchema</code> | Runtime Timeline Request 的 JSON Schema。 |
| `runtimeTimelineRequestSchema` | 常量 | <code>const runtimeTimelineRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?...</code> | Runtime Timeline Request 的运行时 Schema。 |
| `validateRuntimeQueryRequest` | 函数 | <code>validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest</code> | Validate Runtime Query Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRunView` | 函数 | <code>validateRuntimeRunView(input: unknown): RuntimeRunView</code> | Validate Runtime Run View 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeStateExplanation` | 函数 | <code>validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation</code> | Validate Runtime State Explanation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeTimelineRequest` | 函数 | <code>validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest</code> | Validate Runtime Timeline Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeQueryContractDefinitions`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeQueryContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition<RuntimeQueryRequest>, SpecSchemaDefinition<RuntimeTimelineRequest>, SpecSchemaDefinition<RuntimeRunView>, SpecSchemaDefinition<RuntimeStateExplanation>];
```

## `runtimeQueryContractJsonSchemas`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeQueryContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeQueryRequestDefinition`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime Query Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeQueryRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryRequestDefinition: SpecSchemaDefinition<RuntimeQueryRequest>;
```

## `runtimeQueryRequestExample`

Runtime Query Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeQueryRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryRequestExample: RuntimeQueryRequest;
```

## `runtimeQueryRequestJsonSchema`

Runtime Query Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeQueryRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryRequestJsonSchema: JsonSchema;
```

## `runtimeQueryRequestSchema`

Runtime Query Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeQueryRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeQueryRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; }>;
```

## `runtimeRunViewDefinition`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime Run View Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRunViewDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeRunViewDefinition: SpecSchemaDefinition<RuntimeRunView>;
```

## `runtimeRunViewExample`

Runtime Run View 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRunViewExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeRunViewExample: RuntimeRunView;
```

## `runtimeRunViewJsonSchema`

Runtime Run View 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRunViewJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeRunViewJsonSchema: JsonSchema;
```

## `runtimeRunViewSchema`

Runtime Run View 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRunViewSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRunViewSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunViewSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeStateExplanationDefinition`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime State Explanation Definition 常量。

- 种类: 常量
- 导入: `import { runtimeStateExplanationDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeStateExplanationDefinition: SpecSchemaDefinition<RuntimeStateExplanation>;
```

## `runtimeStateExplanationExample`

Runtime State Explanation 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeStateExplanationExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeStateExplanationExample: RuntimeStateExplanation;
```

## `runtimeStateExplanationJsonSchema`

Runtime State Explanation 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeStateExplanationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeStateExplanationJsonSchema: JsonSchema;
```

## `runtimeStateExplanationSchema`

Runtime State Explanation 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeStateExplanationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeStateExplanationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; runStatus: z.ZodEnum<[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./runtime-projection").RuntimeOrchestrationRunStatus[]]>; currentState: z.ZodOptional<z.ZodString>; stateAttempt: z.ZodNumber; statePath: z.ZodArray<z.ZodString, "many">; pendingWaitId: z.ZodOptional<z.ZodString>; pendingTransitionEventId: z.ZodOptional<z.ZodString>; pendingActivityIds: z.ZodArray<z.ZodString, "many">; lastEventSequence: z.ZodNumber; source: z.ZodLiteral<"runtime.orchestration.projection">; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; runStatus: import("./runtime-projection").RuntimeOrchestrationRunStatus; statePath: string[]; stateAttempt: number; pendingActivityIds: string[]; lastEventSequence: number; source: "runtime.orchestration.projection"; currentState?: string | undefined; pendingWaitId?: string | undefined; pendingTransitionEventId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; runStatus: import("./runtime-projection").RuntimeOrchestrationRunStatus; statePath: string[]; stateAttempt: number; pendingActivityIds: string[]; lastEventSequence: number; source: "runtime.orchestration.projection"; currentState?: string | undefined; pendingWaitId?: string | undefined; pendingTransitionEventId?: string | undefined; }>;
```

## `runtimeTimelineRequestDefinition`

由 `contracts/runtime-query-schemas` 模块导出的 Runtime Timeline Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeTimelineRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeTimelineRequestDefinition: SpecSchemaDefinition<RuntimeTimelineRequest>;
```

## `runtimeTimelineRequestExample`

Runtime Timeline Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeTimelineRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeTimelineRequestExample: RuntimeTimelineRequest;
```

## `runtimeTimelineRequestJsonSchema`

Runtime Timeline Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeTimelineRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeTimelineRequestJsonSchema: JsonSchema;
```

## `runtimeTimelineRequestSchema`

Runtime Timeline Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeTimelineRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare const runtimeTimelineRequestSchema: z.ZodEffects<z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; fromSequence: z.ZodOptional<z.ZodNumber>; toSequence: z.ZodOptional<z.ZodNumber>; types: z.ZodOptional<z.ZodArray<z.ZodType<FrameworkEventType, z.ZodTypeDef, FrameworkEventType>, "many">>; limit: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }>, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; fromSequence?: number | undefined; toSequence?: number | undefined; types?: FrameworkEventType[] | undefined; limit?: number | undefined; }>;
```

## `validateRuntimeQueryRequest`

Validate Runtime Query Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeQueryRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare function validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest;
```

### 调用签名

```text
validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeQueryRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRunView`

Validate Runtime Run View 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRunView } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare function validateRuntimeRunView(input: unknown): RuntimeRunView;
```

### 调用签名

```text
validateRuntimeRunView(input: unknown): RuntimeRunView
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRunView`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeStateExplanation`

Validate Runtime State Explanation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeStateExplanation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare function validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation;
```

### 调用签名

```text
validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeStateExplanation`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeTimelineRequest`

Validate Runtime Timeline Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeTimelineRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)

### 声明

```text
export declare function validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest;
```

### 调用签名

```text
validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeTimelineRequest`
- 说明: 返回值契约由上述类型定义。
