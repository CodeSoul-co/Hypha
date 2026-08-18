# `@codesoul-co/hypha-core` / `modules/execution-output/contracts`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-output/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)
- 导出数: **21**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 17 常量、4 函数。

### 从包入口导入

```ts
import {
  collectedExecutionOutputJsonSchema,
  collectedExecutionOutputSchema,
  executionOutputCollectionItemJsonSchema,
  executionOutputCollectionItemSchema,
  executionOutputCollectionPlanExample,
  executionOutputCollectionPlanJsonSchema,
  executionOutputCollectionPlanSchema,
  executionOutputCollectionPolicyExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 17 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { collectedExecutionOutputSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = collectedExecutionOutputSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collectedExecutionOutputJsonSchema` | 常量 | <code>const collectedExecutionOutputJsonSchema: JsonSchema</code> | Collected Execution Output 的 JSON Schema。 |
| `collectedExecutionOutputSchema` | 常量 | <code>const collectedExecutionOutputSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum&lt;["draft", "final"]&gt;; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" &#124; "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versio...</code> | Collected Execution Output 的运行时 Schema。 |
| `executionOutputCollectionItemJsonSchema` | 常量 | <code>const executionOutputCollectionItemJsonSchema: JsonSchema</code> | Execution Output Collection Item 的 JSON Schema。 |
| `executionOutputCollectionItemSchema` | 常量 | <code>const executionOutputCollectionItemSchema: z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum&lt;["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; exis...</code> | Execution Output Collection Item 的运行时 Schema。 |
| `executionOutputCollectionPlanExample` | 常量 | <code>const executionOutputCollectionPlanExample: ExecutionOutputCollectionPlan</code> | Execution Output Collection Plan 的有效示例值。 |
| `executionOutputCollectionPlanJsonSchema` | 常量 | <code>const executionOutputCollectionPlanJsonSchema: JsonSchema</code> | Execution Output Collection Plan 的 JSON Schema。 |
| `executionOutputCollectionPlanSchema` | 常量 | <code>const executionOutputCollectionPlanSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; items: z.ZodArray&lt;z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum&lt;["document", "code", "dataset", "image", "audi...</code> | Execution Output Collection Plan 的运行时 Schema。 |
| `executionOutputCollectionPolicyExample` | 常量 | <code>const executionOutputCollectionPolicyExample: ExecutionOutputCollectionPolicy</code> | Execution Output Collection Policy 的有效示例值。 |
| `executionOutputCollectionPolicyJsonSchema` | 常量 | <code>const executionOutputCollectionPolicyJsonSchema: JsonSchema</code> | Execution Output Collection Policy 的 JSON Schema。 |
| `executionOutputCollectionPolicySchema` | 常量 | <code>const executionOutputCollectionPolicySchema: z.ZodEffects&lt;z.ZodObject&lt;{ includePatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; excludePatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEffects&lt;z.ZodString, string, string&gt;, "many"&gt;&gt;; maxArtifacts: z.ZodOptional&lt;z.ZodNumber&gt;; maxTotalBytes: z.ZodOptional&lt;z.ZodNumber&gt;; classifyByExtension: z.ZodOptional&lt;z.ZodBoolean&gt;; finalizeOnSuccess: z...</code> | Execution Output Collection Policy 的运行时 Schema。 |
| `executionOutputCollectionResultJsonSchema` | 常量 | <code>const executionOutputCollectionResultJsonSchema: JsonSchema</code> | Execution Output Collection Result 的 JSON Schema。 |
| `executionOutputCollectionResultSchema` | 常量 | <code>const executionOutputCollectionResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; collected: z.ZodArray&lt;z.ZodObject&lt;{ relativePath: z.ZodEffects&lt;z.ZodString, string, string&gt;; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum&lt;["draft", "final"]&gt;; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" &#124; "final"; contentHash:...</code> | Execution Output Collection Result 的运行时 Schema。 |
| `executionOutputJsonSchemas` | 常量 | <code>const executionOutputJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-output/contracts` 模块导出的 Execution Output JSON Schemas 常量。 |
| `executionOutputPatternSchema` | 常量 | <code>const executionOutputPatternSchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Execution Output Pattern 的运行时 Schema。 |
| `executionOutputSkippedSchema` | 常量 | <code>const executionOutputSkippedSchema: z.ZodObject&lt;{ not_included: z.ZodNumber; excluded: z.ZodNumber; unsupported_mutation: z.ZodNumber; missing_integrity_evidence: z.ZodNumber; artifact_limit: z.ZodNumber; byte_limit: z.ZodNumber; }, "strict", z.ZodTypeAny, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }, { not...</code> | Execution Output Skipped 的运行时 Schema。 |
| `executionOutputSkipReasonSchema` | 常量 | <code>const executionOutputSkipReasonSchema: z.ZodEnum&lt;["not_included", "excluded", "unsupported_mutation", "missing_integrity_evidence", "artifact_limit", "byte_limit"]&gt;</code> | Execution Output Skip Reason 的运行时 Schema。 |
| `executionOutputTerminalStatusSchema` | 常量 | <code>const executionOutputTerminalStatusSchema: z.ZodEnum&lt;["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;</code> | Execution Output Terminal Status 的运行时 Schema。 |
| `emptyExecutionOutputSkipCounts` | 函数 | <code>emptyExecutionOutputSkipCounts(): Record&lt;ExecutionOutputSkipReason, number&gt;</code> | Empty Execution Output Skip Counts 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionOutputCollectionPlan` | 函数 | <code>validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan</code> | Validate Execution Output Collection Plan 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionOutputCollectionPolicy` | 函数 | <code>validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy</code> | Validate Execution Output Collection Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionOutputCollectionResult` | 函数 | <code>validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult</code> | Validate Execution Output Collection Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `collectedExecutionOutputJsonSchema`

Collected Execution Output 的 JSON Schema。

- 种类: 常量
- 导入: `import { collectedExecutionOutputJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const collectedExecutionOutputJsonSchema: JsonSchema;
```

## `collectedExecutionOutputSchema`

Collected Execution Output 的运行时 Schema。

- 种类: 常量
- 导入: `import { collectedExecutionOutputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const collectedExecutionOutputSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum<["draft", "final"]>; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }>;
```

## `executionOutputCollectionItemJsonSchema`

Execution Output Collection Item 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionItemJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionItemJsonSchema: JsonSchema;
```

## `executionOutputCollectionItemSchema`

Execution Output Collection Item 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionItemSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionItemSchema: z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; contentHash: z.ZodString; sizeBytes: z.ZodNumber; kind: z.ZodEnum<["document", "code", "dataset", "image", "audio", "video", "table", "report", "archive", "patch", "snapshot", "test_report", "build_output", "log", "tool_output", "execution_receipt", "other"]>; mimeType: z.ZodOptional<z.ZodString>; existingArtifactRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { contentHash: string; sizeBytes: number; kind: "code" | "log" | "snapshot" | "other" | "image" | "document" | "dataset" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "test_report" | "build_output" | "tool_output" | "execution_receipt"; relativePath: string; mimeType?: string | undefined; existingArtifactRef?: string | undefined; }, { contentHash: string; sizeBytes: number; kind: "code" | "log" | "snapshot" | "other" | "image" | "document" | "dataset" | "audio" | "video" | "table" | "report" | "archive" | "patch" | "test_report" | "build_output" | "tool_output" | "execution_receipt"; relativePath: string; mimeType?: string | undefined; existingArtifactRef?: string | undefined; }>;
```

## `executionOutputCollectionPlanExample`

Execution Output Collection Plan 的有效示例值。

- 种类: 常量
- 导入: `import { executionOutputCollectionPlanExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionPlanExample: ExecutionOutputCollectionPlan;
```

## `executionOutputCollectionPlanJsonSchema`

Execution Output Collection Plan 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionPlanJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionPlanJsonSchema: JsonSchema;
```

## `executionOutputCollectionPlanSchema`

Execution Output Collection Plan 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionPlanSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionOutputCollectionPlanSchema: (typeof import('@codesoul-co/hypha-core'))['executionOutputCollectionPlanSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionOutputCollectionPolicyExample`

Execution Output Collection Policy 的有效示例值。

- 种类: 常量
- 导入: `import { executionOutputCollectionPolicyExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionPolicyExample: ExecutionOutputCollectionPolicy;
```

## `executionOutputCollectionPolicyJsonSchema`

Execution Output Collection Policy 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionPolicyJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionPolicyJsonSchema: JsonSchema;
```

## `executionOutputCollectionPolicySchema`

Execution Output Collection Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionPolicySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionPolicySchema: z.ZodEffects<z.ZodObject<{ includePatterns: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; excludePatterns: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>; maxArtifacts: z.ZodOptional<z.ZodNumber>; maxTotalBytes: z.ZodOptional<z.ZodNumber>; classifyByExtension: z.ZodOptional<z.ZodBoolean>; finalizeOnSuccess: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }>, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }, { excludePatterns?: string[] | undefined; includePatterns?: string[] | undefined; maxArtifacts?: number | undefined; maxTotalBytes?: number | undefined; classifyByExtension?: boolean | undefined; finalizeOnSuccess?: boolean | undefined; }>;
```

## `executionOutputCollectionResultJsonSchema`

Execution Output Collection Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionResultJsonSchema: JsonSchema;
```

## `executionOutputCollectionResultSchema`

Execution Output Collection Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputCollectionResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputCollectionResultSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; collected: z.ZodArray<z.ZodObject<{ relativePath: z.ZodEffects<z.ZodString, string, string>; artifactRef: z.ZodString; versionId: z.ZodString; contentHash: z.ZodString; sizeBytes: z.ZodNumber; status: z.ZodEnum<["draft", "final"]>; }, "strict", z.ZodTypeAny, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }, { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }>, "many">; existingArtifactRefs: z.ZodArray<z.ZodString, "many">; artifactRefs: z.ZodArray<z.ZodString, "many">; finalizedArtifactRefs: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }>, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }, { executionId: string; artifactRefs: string[]; existingArtifactRefs: string[]; collected: { versionId: string; status: "draft" | "final"; contentHash: string; sizeBytes: number; relativePath: string; artifactRef: string; }[]; finalizedArtifactRefs: string[]; }>;
```

## `executionOutputJsonSchemas`

由 `modules/execution-output/contracts` 模块导出的 Execution Output JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionOutputJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputJsonSchemas: Record<string, JsonSchema>;
```

## `executionOutputPatternSchema`

Execution Output Pattern 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputPatternSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputPatternSchema: z.ZodEffects<z.ZodString, string, string>;
```

## `executionOutputSkippedSchema`

Execution Output Skipped 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputSkippedSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputSkippedSchema: z.ZodObject<{ not_included: z.ZodNumber; excluded: z.ZodNumber; unsupported_mutation: z.ZodNumber; missing_integrity_evidence: z.ZodNumber; artifact_limit: z.ZodNumber; byte_limit: z.ZodNumber; }, "strict", z.ZodTypeAny, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }, { not_included: number; excluded: number; unsupported_mutation: number; missing_integrity_evidence: number; artifact_limit: number; byte_limit: number; }>;
```

## `executionOutputSkipReasonSchema`

Execution Output Skip Reason 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputSkipReasonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputSkipReasonSchema: z.ZodEnum<["not_included", "excluded", "unsupported_mutation", "missing_integrity_evidence", "artifact_limit", "byte_limit"]>;
```

## `executionOutputTerminalStatusSchema`

Execution Output Terminal Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionOutputTerminalStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare const executionOutputTerminalStatusSchema: z.ZodEnum<["cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>;
```

## `emptyExecutionOutputSkipCounts`

Empty Execution Output Skip Counts 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { emptyExecutionOutputSkipCounts } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare function emptyExecutionOutputSkipCounts(): Record<ExecutionOutputSkipReason, number>;
```

### 调用签名

```text
emptyExecutionOutputSkipCounts(): Record<ExecutionOutputSkipReason, number>
```

#### 参数

无参数。

#### 返回值

- 类型: `Record<ExecutionOutputSkipReason, number>`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionOutputCollectionPlan`

Validate Execution Output Collection Plan 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionOutputCollectionPlan } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare function validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan;
```

### 调用签名

```text
validateExecutionOutputCollectionPlan(input: unknown): ExecutionOutputCollectionPlan
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionOutputCollectionPlan`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionOutputCollectionPolicy`

Validate Execution Output Collection Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionOutputCollectionPolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare function validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy;
```

### 调用签名

```text
validateExecutionOutputCollectionPolicy(input: unknown): ExecutionOutputCollectionPolicy
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionOutputCollectionPolicy`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionOutputCollectionResult`

Validate Execution Output Collection Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionOutputCollectionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/contracts.ts)

### 声明

```text
export declare function validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult;
```

### 调用签名

```text
validateExecutionOutputCollectionResult(input: unknown): ExecutionOutputCollectionResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionOutputCollectionResult`
- 说明: 返回值契约由上述类型定义。
