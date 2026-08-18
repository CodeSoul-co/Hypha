# `@codesoul-co/hypha-core` / `modules/artifact/retention`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)
- 导出数: **14**

## 模块用法

用于使用该功能边界的公共契约与操作。Retention 模块公开 2 类、9 常量、3 函数。

### 从包入口导入

```ts
import {
  DefaultArtifactRetentionEvaluator,
  DefaultArtifactRetentionProcessor,
  artifactRetentionContractJsonSchemas,
  artifactRetentionDecisionJsonSchema,
  artifactRetentionDecisionSchema,
  artifactRetentionEvaluationRequestJsonSchema,
  artifactRetentionEvaluationRequestSchema,
  artifactRetentionProcessRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 9 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { artifactRetentionDecisionSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactRetentionDecisionSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactRetentionEvaluator` | 类 | <code>new DefaultArtifactRetentionEvaluator(): DefaultArtifactRetentionEvaluator</code> | Default Artifact Retention Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultArtifactRetentionProcessor` | 类 | <code>new DefaultArtifactRetentionProcessor(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Default Artifact Retention Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `artifactRetentionContractJsonSchemas` | 常量 | <code>const artifactRetentionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/retention` 模块导出的 Artifact Retention Contract JSON Schemas 常量。 |
| `artifactRetentionDecisionJsonSchema` | 常量 | <code>const artifactRetentionDecisionJsonSchema: JsonSchema</code> | Artifact Retention Decision 的 JSON Schema。 |
| `artifactRetentionDecisionSchema` | 常量 | <code>const artifactRetentionDecisionSchema: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { reason: "expired" &#124; "already_terminal" &#124; "not_due" &#124; "archive_after" &#124; "delete_after...</code> | Artifact Retention Decision 的运行时 Schema。 |
| `artifactRetentionEvaluationRequestJsonSchema` | 常量 | <code>const artifactRetentionEvaluationRequestJsonSchema: JsonSchema</code> | Artifact Retention Evaluation Request 的 JSON Schema。 |
| `artifactRetentionEvaluationRequestSchema` | 常量 | <code>const artifactRetentionEvaluationRequestSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: ...</code> | Artifact Retention Evaluation Request 的运行时 Schema。 |
| `artifactRetentionProcessRequestJsonSchema` | 常量 | <code>const artifactRetentionProcessRequestJsonSchema: JsonSchema</code> | Artifact Retention Process Request 的 JSON Schema。 |
| `artifactRetentionProcessRequestSchema` | 常量 | <code>const artifactRetentionProcessRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadat...</code> | Artifact Retention Process Request 的运行时 Schema。 |
| `artifactRetentionProcessResultJsonSchema` | 常量 | <code>const artifactRetentionProcessResultJsonSchema: JsonSchema</code> | Artifact Retention Process Result 的 JSON Schema。 |
| `artifactRetentionProcessResultSchema` | 常量 | <code>const artifactRetentionProcessResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodStrin...</code> | Artifact Retention Process Result 的运行时 Schema。 |
| `validateArtifactRetentionEvaluationRequest` | 函数 | <code>validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest</code> | Validate Artifact Retention Evaluation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactRetentionProcessRequest` | 函数 | <code>validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest</code> | Validate Artifact Retention Process Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactRetentionProcessResult` | 函数 | <code>validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult</code> | Validate Artifact Retention Process Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `DefaultArtifactRetentionEvaluator`

Default Artifact Retention Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultArtifactRetentionEvaluator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare class DefaultArtifactRetentionEvaluator implements ArtifactRetentionEvaluator {
    evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultArtifactRetentionEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultArtifactRetentionProcessor`

Default Artifact Retention Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare class DefaultArtifactRetentionProcessor implements ArtifactRetentionProcessor {
    constructor(options: DefaultArtifactRetentionProcessorOptions);
    process(input: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | 创建该类的实例。 |
| `process` | 方法 | <code>process(input: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `artifactRetentionContractJsonSchemas`

由 `modules/artifact/retention` 模块导出的 Artifact Retention Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { artifactRetentionContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactRetentionDecisionJsonSchema`

Artifact Retention Decision 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionDecisionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionDecisionJsonSchema: JsonSchema;
```

## `artifactRetentionDecisionSchema`

Artifact Retention Decision 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionDecisionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionDecisionSchema: z.ZodObject<{ action: z.ZodEnum<["retain", "archive", "delete"]>; reason: z.ZodEnum<["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]>; effectiveAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }>;
```

## `artifactRetentionEvaluationRequestJsonSchema`

Artifact Retention Evaluation Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionEvaluationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionEvaluationRequestJsonSchema: JsonSchema;
```

## `artifactRetentionEvaluationRequestSchema`

Artifact Retention Evaluation Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionEvaluationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactRetentionEvaluationRequestSchema: (typeof import('@codesoul-co/hypha-core'))['artifactRetentionEvaluationRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactRetentionProcessRequestJsonSchema`

Artifact Retention Process Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionProcessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionProcessRequestJsonSchema: JsonSchema;
```

## `artifactRetentionProcessRequestSchema`

Artifact Retention Process Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionProcessRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionProcessRequestSchema: z.ZodObject<{ operationId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactId: z.ZodString; evaluatedAt: z.ZodOptional<z.ZodString>; dryRun: z.ZodOptional<z.ZodBoolean>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; idempotencyKey?: string | undefined; evaluatedAt?: string | undefined; dryRun?: boolean | undefined; }, { operationId: string; artifactId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; idempotencyKey?: string | undefined; evaluatedAt?: string | undefined; dryRun?: boolean | undefined; }>;
```

## `artifactRetentionProcessResultJsonSchema`

Artifact Retention Process Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactRetentionProcessResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionProcessResultJsonSchema: JsonSchema;
```

## `artifactRetentionProcessResultSchema`

Artifact Retention Process Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactRetentionProcessResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare const artifactRetentionProcessResultSchema: z.ZodEffects<z.ZodObject<{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject<{ action: z.ZodEnum<["retain", "archive", "delete"]>; reason: z.ZodEnum<["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]>; effectiveAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }, { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }>; applied: z.ZodBoolean; replayed: z.ZodBoolean; dryRun: z.ZodBoolean; }, "strict", z.ZodTypeAny, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }>, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }, { artifactId: string; versionId: string; workspaceId: string; decision: { reason: "expired" | "already_terminal" | "not_due" | "archive_after" | "delete_after" | "legal_hold" | "referenced" | "retain_final" | "retain_failure"; action: "retain" | "delete" | "archive"; effectiveAt?: string | undefined; }; applied: boolean; dryRun: boolean; replayed: boolean; }>;
```

## `validateArtifactRetentionEvaluationRequest`

Validate Artifact Retention Evaluation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactRetentionEvaluationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare function validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest;
```

### 调用签名

```text
validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactRetentionEvaluationRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactRetentionProcessRequest`

Validate Artifact Retention Process Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactRetentionProcessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare function validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest;
```

### 调用签名

```text
validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactRetentionProcessRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactRetentionProcessResult`

Validate Artifact Retention Process Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactRetentionProcessResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)

### 声明

```text
export declare function validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult;
```

### 调用签名

```text
validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactRetentionProcessResult`
- 说明: 返回值契约由上述类型定义。
