# `@codesoul-co/hypha-core` / `modules/execution-activities/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-activities/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)
- 导出数: **14**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 11 常量、3 函数。

### 从包入口导入

```ts
import {
  executionActivityJsonSchemas,
  executionActivityRequestExample,
  executionActivityRequestJsonSchema,
  executionActivityRequestSchema,
  executionActivityResultExample,
  executionActivityResultJsonSchema,
  executionActivityResultSchema,
  executionActivityStatusSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 11 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionActivityRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionActivityRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionActivityJsonSchemas` | 常量 | <code>const executionActivityJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-activities/index` 模块导出的 Execution Activity JSON Schemas 常量。 |
| `executionActivityRequestExample` | 常量 | <code>const executionActivityRequestExample: ExecutionActivityRequest</code> | Execution Activity Request 的有效示例值。 |
| `executionActivityRequestJsonSchema` | 常量 | <code>const executionActivityRequestJsonSchema: JsonSchema</code> | Execution Activity Request 的 JSON Schema。 |
| `executionActivityRequestSchema` | 常量 | <code>const executionActivityRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; ten...</code> | Execution Activity Request 的运行时 Schema。 |
| `executionActivityResultExample` | 常量 | <code>const executionActivityResultExample: ExecutionActivityResult</code> | Execution Activity Result 的有效示例值。 |
| `executionActivityResultJsonSchema` | 常量 | <code>const executionActivityResultJsonSchema: JsonSchema</code> | Execution Activity Result 的 JSON Schema。 |
| `executionActivityResultSchema` | 常量 | <code>const executionActivityResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; snapshotRef: z.ZodOptional&lt;z.ZodString&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION...</code> | Execution Activity Result 的运行时 Schema。 |
| `executionActivityStatusSchema` | 常量 | <code>const executionActivityStatusSchema: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;</code> | Execution Activity Status 的运行时 Schema。 |
| `workspaceExecutionActivityRequestExample` | 常量 | <code>const workspaceExecutionActivityRequestExample: ExecutionActivityRequest</code> | Workspace Execution Activity Request 的有效示例值。 |
| `workspaceOperationRequestJsonSchema` | 常量 | <code>const workspaceOperationRequestJsonSchema: JsonSchema</code> | Workspace Operation Request 的 JSON Schema。 |
| `workspaceOperationRequestSchema` | 常量 | <code>const workspaceOperationRequestSchema: z.ZodUnion&lt;[z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; m...</code> | Workspace Operation Request 的运行时 Schema。 |
| `validateExecutionActivityRequest` | 函数 | <code>validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest</code> | Validate Execution Activity Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionActivityResult` | 函数 | <code>validateExecutionActivityResult(input: unknown): ExecutionActivityResult</code> | Validate Execution Activity Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceOperationRequest` | 函数 | <code>validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest</code> | Validate Workspace Operation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionActivityJsonSchemas`

由 `modules/execution-activities/index` 模块导出的 Execution Activity JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionActivityJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityJsonSchemas: Record<string, JsonSchema>;
```

## `executionActivityRequestExample`

Execution Activity Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionActivityRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityRequestExample: ExecutionActivityRequest;
```

## `executionActivityRequestJsonSchema`

Execution Activity Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionActivityRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityRequestJsonSchema: JsonSchema;
```

## `executionActivityRequestSchema`

Execution Activity Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionActivityRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionActivityRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionActivityRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionActivityResultExample`

Execution Activity Result 的有效示例值。

- 种类: 常量
- 导入: `import { executionActivityResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityResultExample: ExecutionActivityResult;
```

## `executionActivityResultJsonSchema`

Execution Activity Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionActivityResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityResultJsonSchema: JsonSchema;
```

## `executionActivityResultSchema`

Execution Activity Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionActivityResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionActivityResultSchema: (typeof import('@codesoul-co/hypha-core'))['executionActivityResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionActivityStatusSchema`

Execution Activity Status 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionActivityStatusSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const executionActivityStatusSchema: z.ZodEnum<["completed", "failed", "timeout", "cancelled", "unknown"]>;
```

## `workspaceExecutionActivityRequestExample`

Workspace Execution Activity Request 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceExecutionActivityRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const workspaceExecutionActivityRequestExample: ExecutionActivityRequest;
```

## `workspaceOperationRequestJsonSchema`

Workspace Operation Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceOperationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare const workspaceOperationRequestJsonSchema: JsonSchema;
```

## `workspaceOperationRequestSchema`

Workspace Operation Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceOperationRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workspaceOperationRequestSchema: (typeof import('@codesoul-co/hypha-core'))['workspaceOperationRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateExecutionActivityRequest`

Validate Execution Activity Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare function validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest;
```

### 调用签名

```text
validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionActivityRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionActivityResult`

Validate Execution Activity Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionActivityResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare function validateExecutionActivityResult(input: unknown): ExecutionActivityResult;
```

### 调用签名

```text
validateExecutionActivityResult(input: unknown): ExecutionActivityResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionActivityResult`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceOperationRequest`

Validate Workspace Operation Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceOperationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-activities/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)

### 声明

```text
export declare function validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest;
```

### 调用签名

```text
validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceOperationRequest`
- 说明: 返回值契约由上述类型定义。
