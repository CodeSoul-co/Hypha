# `@codesoul-co/hypha-memory` / `context-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)
- 导出数: **18**

## 模块用法

用于声明并运行时校验契约。Context schema 模块公开 15 常量、3 函数。

### 从包入口导入

```ts
import {
  contextArtifactRefSchema,
  contextBudgetPlanSchema,
  contextBuildRequestSchema,
  contextConflictSchema,
  contextEnvelopeSchema,
  contextItemSchema,
  contextProfileSpecDefinition,
  contextProfileSpecExample,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 15 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { contextArtifactRefSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = contextArtifactRefSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextArtifactRefSchema` | 常量 | <code>const contextArtifactRefSchema: z.ZodObject&lt;{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral&lt;"text/plain; charset=utf-8"&gt;; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: ...</code> | Context Artifact Ref 的运行时 Schema。 |
| `contextBudgetPlanSchema` | 常量 | <code>const contextBudgetPlanSchema: z.ZodObject&lt;{ totalAvailableTokens: z.ZodNumber; fixedTokens: z.ZodNumber; dynamicTokens: z.ZodNumber; sourceBudgets: z.ZodArray&lt;z.ZodObject&lt;{ sourceId: z.ZodString; minTokens: z.ZodOptional&lt;z.ZodNumber&gt;; targetTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact", "fail"]&gt;; ...</code> | Context Budget Plan 的运行时 Schema。 |
| `contextBuildRequestSchema` | 常量 | <code>const contextBuildRequestSchema: z.ZodType&lt;ContextBuildRequest, z.ZodTypeDef, ContextBuildRequest&gt;</code> | Context Build Request 的运行时 Schema。 |
| `contextConflictSchema` | 常量 | <code>const contextConflictSchema: z.ZodObject&lt;{ conflictGroupId: z.ZodString; itemIds: z.ZodArray&lt;z.ZodString, "many"&gt;; resolution: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { conflictGroupId: string; itemIds: string[]; resolution?: string &#124; undefined; }, { conflictGroupId: string; itemIds: string[]; resolution?: string &#124; undefined; }&gt;</code> | Context Conflict 的运行时 Schema。 |
| `contextEnvelopeSchema` | 常量 | <code>const contextEnvelopeSchema: z.ZodType&lt;ContextEnvelope, z.ZodTypeDef, ContextEnvelope&gt;</code> | Context Envelope 的运行时 Schema。 |
| `contextItemSchema` | 常量 | <code>const contextItemSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; sourceType: z.ZodEnum&lt;["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]&gt;; sourceId: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; text: z.ZodString; tokenEstimate: z.ZodNumber; priority: z.ZodNumber; score: z.ZodOptional&lt;z.ZodNumber&gt;; required: z.ZodOption...</code> | Context Item 的运行时 Schema。 |
| `contextProfileSpecDefinition` | 常量 | <code>const contextProfileSpecDefinition: SpecSchemaDefinition&lt;ContextProfileSpec&gt;</code> | Context Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `contextProfileSpecExample` | 常量 | <code>const contextProfileSpecExample: ContextProfileSpec</code> | Context Profile Spec 的有效示例值。 |
| `contextProfileSpecJsonSchema` | 常量 | <code>const contextProfileSpecJsonSchema: JsonSchema</code> | Context Profile Spec 的 JSON Schema。 |
| `contextProfileSpecSchema` | 常量 | <code>const contextProfileSpecSchema: z.ZodType&lt;ContextProfileSpec, z.ZodTypeDef, ContextProfileSpec&gt;</code> | Context Profile Spec 的运行时 Schema。 |
| `contextProvenanceLabelSchema` | 常量 | <code>const contextProvenanceLabelSchema: z.ZodObject&lt;{ sourceType: z.ZodEnum&lt;["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]&gt;; sourceId: z.ZodString; memoryId: z.ZodOptional&lt;z.ZodString&gt;; memoryVersionId: z.ZodOptional&lt;z.ZodString&gt;; authority: z.ZodOptional&lt;z.ZodEnum&lt;["unverified", "user_asserted", "system_observed", "verified", "a...</code> | Context Provenance Label 的运行时 Schema。 |
| `contextSourceBudgetSchema` | 常量 | <code>const contextSourceBudgetSchema: z.ZodObject&lt;{ sourceId: z.ZodString; minTokens: z.ZodOptional&lt;z.ZodNumber&gt;; targetTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact", "fail"]&gt;; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" &#124; "fail" &#124; "dro...</code> | Context Source Budget 的运行时 Schema。 |
| `contextSourceSpecSchema` | 常量 | <code>const contextSourceSpecSchema: z.ZodType&lt;ContextSourceSpec, z.ZodTypeDef, ContextSourceSpec&gt;</code> | Context Source Spec 的运行时 Schema。 |
| `contextTruncationRecordSchema` | 常量 | <code>const contextTruncationRecordSchema: z.ZodObject&lt;{ itemId: z.ZodString; originalTokens: z.ZodNumber; retainedTokens: z.ZodNumber; method: z.ZodEnum&lt;["drop", "truncate", "summarize", "spill_to_artifact"]&gt;; reason: z.ZodString; }, "strip", z.ZodTypeAny, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"; }, { reason: strin...</code> | Context Truncation Record 的运行时 Schema。 |
| `promptSegmentSchema` | 常量 | <code>const promptSegmentSchema: z.ZodObject&lt;{ id: z.ZodString; role: z.ZodEnum&lt;["system", "developer", "user", "assistant", "tool", "data"]&gt;; text: z.ZodString; tokenCount: z.ZodNumber; trustLevel: z.ZodEnum&lt;["trusted_instruction", "trusted_data", "untrusted_data"]&gt;; sourceRefs: z.ZodArray&lt;z.ZodString, "many"&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ...</code> | Prompt Segment 的运行时 Schema。 |
| `validateContextEnvelope` | 函数 | <code>validateContextEnvelope(input: unknown): ContextEnvelope</code> | Validate Context Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateContextItem` | 函数 | <code>validateContextItem(input: unknown): ContextItem</code> | Validate Context Item 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateContextProfileSpec` | 函数 | <code>validateContextProfileSpec(input: unknown): ContextProfileSpec</code> | Validate Context Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `contextArtifactRefSchema`

Context Artifact Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextArtifactRefSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextArtifactRefSchema: z.ZodObject<{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral<"text/plain; charset=utf-8">; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }>;
```

## `contextBudgetPlanSchema`

Context Budget Plan 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextBudgetPlanSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextBudgetPlanSchema: z.ZodObject<{ totalAvailableTokens: z.ZodNumber; fixedTokens: z.ZodNumber; dynamicTokens: z.ZodNumber; sourceBudgets: z.ZodArray<z.ZodObject<{ sourceId: z.ZodString; minTokens: z.ZodOptional<z.ZodNumber>; targetTokens: z.ZodOptional<z.ZodNumber>; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact", "fail"]>; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }>, "many">; tokenizerRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; } & { revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>; safetyMarginTokens: z.ZodNumber; }, "strip", z.ZodTypeAny, { totalAvailableTokens: number; fixedTokens: number; dynamicTokens: number; sourceBudgets: { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }[]; tokenizerRef: { id: string; version?: string | undefined; revision?: string | undefined; }; safetyMarginTokens: number; }, { totalAvailableTokens: number; fixedTokens: number; dynamicTokens: number; sourceBudgets: { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }[]; tokenizerRef: { id: string; version?: string | undefined; revision?: string | undefined; }; safetyMarginTokens: number; }>;
```

## `contextBuildRequestSchema`

Context Build Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextBuildRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextBuildRequestSchema: z.ZodType<ContextBuildRequest, z.ZodTypeDef, ContextBuildRequest>;
```

## `contextConflictSchema`

Context Conflict 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextConflictSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextConflictSchema: z.ZodObject<{ conflictGroupId: z.ZodString; itemIds: z.ZodArray<z.ZodString, "many">; resolution: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { conflictGroupId: string; itemIds: string[]; resolution?: string | undefined; }, { conflictGroupId: string; itemIds: string[]; resolution?: string | undefined; }>;
```

## `contextEnvelopeSchema`

Context Envelope 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextEnvelopeSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextEnvelopeSchema: z.ZodType<ContextEnvelope, z.ZodTypeDef, ContextEnvelope>;
```

## `contextItemSchema`

Context Item 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextItemSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const contextItemSchema: (typeof import('@codesoul-co/hypha-memory'))['contextItemSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `contextProfileSpecDefinition`

Context Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { contextProfileSpecDefinition } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextProfileSpecDefinition: SpecSchemaDefinition<ContextProfileSpec>;
```

## `contextProfileSpecExample`

Context Profile Spec 的有效示例值。

- 种类: 常量
- 导入: `import { contextProfileSpecExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextProfileSpecExample: ContextProfileSpec;
```

## `contextProfileSpecJsonSchema`

Context Profile Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { contextProfileSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextProfileSpecJsonSchema: JsonSchema;
```

## `contextProfileSpecSchema`

Context Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextProfileSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextProfileSpecSchema: z.ZodType<ContextProfileSpec, z.ZodTypeDef, ContextProfileSpec>;
```

## `contextProvenanceLabelSchema`

Context Provenance Label 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextProvenanceLabelSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextProvenanceLabelSchema: z.ZodObject<{ sourceType: z.ZodEnum<["system", "workflow_state", "messages", "working_memory", "long_term_memory", "tool_observation", "artifact", "human_review", "custom"]>; sourceId: z.ZodString; memoryId: z.ZodOptional<z.ZodString>; memoryVersionId: z.ZodOptional<z.ZodString>; authority: z.ZodOptional<z.ZodEnum<["unverified", "user_asserted", "system_observed", "verified", "authoritative"]>>; observedAt: z.ZodOptional<z.ZodString>; citationLabel: z.ZodString; }, "strip", z.ZodTypeAny, { sourceType: "artifact" | "custom" | "human_review" | "tool_observation" | "workflow_state" | "system" | "messages" | "working_memory" | "long_term_memory"; sourceId: string; citationLabel: string; memoryId?: string | undefined; memoryVersionId?: string | undefined; authority?: "unverified" | "user_asserted" | "system_observed" | "verified" | "authoritative" | undefined; observedAt?: string | undefined; }, { sourceType: "artifact" | "custom" | "human_review" | "tool_observation" | "workflow_state" | "system" | "messages" | "working_memory" | "long_term_memory"; sourceId: string; citationLabel: string; memoryId?: string | undefined; memoryVersionId?: string | undefined; authority?: "unverified" | "user_asserted" | "system_observed" | "verified" | "authoritative" | undefined; observedAt?: string | undefined; }>;
```

## `contextSourceBudgetSchema`

Context Source Budget 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextSourceBudgetSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextSourceBudgetSchema: z.ZodObject<{ sourceId: z.ZodString; minTokens: z.ZodOptional<z.ZodNumber>; targetTokens: z.ZodOptional<z.ZodNumber>; maxTokens: z.ZodNumber; required: z.ZodBoolean; overflowPolicy: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact", "fail"]>; }, "strip", z.ZodTypeAny, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }, { required: boolean; sourceId: string; maxTokens: number; overflowPolicy: "summarize" | "fail" | "drop" | "truncate" | "spill_to_artifact"; minTokens?: number | undefined; targetTokens?: number | undefined; }>;
```

## `contextSourceSpecSchema`

Context Source Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextSourceSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextSourceSpecSchema: z.ZodType<ContextSourceSpec, z.ZodTypeDef, ContextSourceSpec>;
```

## `contextTruncationRecordSchema`

Context Truncation Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextTruncationRecordSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const contextTruncationRecordSchema: z.ZodObject<{ itemId: z.ZodString; originalTokens: z.ZodNumber; retainedTokens: z.ZodNumber; method: z.ZodEnum<["drop", "truncate", "summarize", "spill_to_artifact"]>; reason: z.ZodString; }, "strip", z.ZodTypeAny, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" | "drop" | "truncate" | "spill_to_artifact"; }, { reason: string; itemId: string; originalTokens: number; retainedTokens: number; method: "summarize" | "drop" | "truncate" | "spill_to_artifact"; }>;
```

## `promptSegmentSchema`

Prompt Segment 的运行时 Schema。

- 种类: 常量
- 导入: `import { promptSegmentSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare const promptSegmentSchema: z.ZodObject<{ id: z.ZodString; role: z.ZodEnum<["system", "developer", "user", "assistant", "tool", "data"]>; text: z.ZodString; tokenCount: z.ZodNumber; trustLevel: z.ZodEnum<["trusted_instruction", "trusted_data", "untrusted_data"]>; sourceRefs: z.ZodArray<z.ZodString, "many">; required: z.ZodOptional<z.ZodBoolean>; artifactRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; path: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; contentType: z.ZodLiteral<"text/plain; charset=utf-8">; scopeHash: z.ZodString; profileRevision: z.ZodString; sourceItemId: z.ZodString; createdAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }, { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; text: string; role: "tool" | "system" | "developer" | "user" | "assistant" | "data"; tokenCount: number; trustLevel: "trusted_instruction" | "trusted_data" | "untrusted_data"; sourceRefs: string[]; required?: boolean | undefined; artifactRefs?: { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }[] | undefined; }, { id: string; text: string; role: "tool" | "system" | "developer" | "user" | "assistant" | "data"; tokenCount: number; trustLevel: "trusted_instruction" | "trusted_data" | "untrusted_data"; sourceRefs: string[]; required?: boolean | undefined; artifactRefs?: { id: string; path: string; createdAt: string; scopeHash: string; contentType: "text/plain; charset=utf-8"; sizeBytes: number; profileRevision: string; sourceItemId: string; contentHash: string; expiresAt?: string | undefined; }[] | undefined; }>;
```

## `validateContextEnvelope`

Validate Context Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContextEnvelope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare function validateContextEnvelope(input: unknown): ContextEnvelope;
```

### 调用签名

```text
validateContextEnvelope(input: unknown): ContextEnvelope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContextEnvelope`
- 说明: 返回值契约由上述类型定义。

## `validateContextItem`

Validate Context Item 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContextItem } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare function validateContextItem(input: unknown): ContextItem;
```

### 调用签名

```text
validateContextItem(input: unknown): ContextItem
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContextItem`
- 说明: 返回值契约由上述类型定义。

## `validateContextProfileSpec`

Validate Context Profile Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContextProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-schema.ts)

### 声明

```text
export declare function validateContextProfileSpec(input: unknown): ContextProfileSpec;
```

### 调用签名

```text
validateContextProfileSpec(input: unknown): ContextProfileSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContextProfileSpec`
- 说明: 返回值契约由上述类型定义。
