# `@codesoul-co/hypha-core` / `modules/execution-port/contracts`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-port/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)
- 导出数: **13**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 10 常量、3 函数。

### 从包入口导入

```ts
import {
  executionAuthorizationEvidenceExample,
  executionAuthorizationEvidenceJsonSchema,
  executionAuthorizationEvidenceSchema,
  executionAuthorizationVerificationResultExample,
  executionAuthorizationVerificationResultJsonSchema,
  executionAuthorizationVerificationResultSchema,
  executionDispatchRequestExample,
  executionDispatchRequestJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionAuthorizationEvidenceSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionAuthorizationEvidenceSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionAuthorizationEvidenceExample` | 常量 | <code>const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence</code> | Execution Authorization Evidence 的有效示例值。 |
| `executionAuthorizationEvidenceJsonSchema` | 常量 | <code>const executionAuthorizationEvidenceJsonSchema: JsonSchema</code> | Execution Authorization Evidence 的 JSON Schema。 |
| `executionAuthorizationEvidenceSchema` | 常量 | <code>const executionAuthorizationEvidenceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional&lt;z.Zod...</code> | Execution Authorization Evidence 的运行时 Schema。 |
| `executionAuthorizationVerificationResultExample` | 常量 | <code>const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult</code> | Execution Authorization Verification Result 的有效示例值。 |
| `executionAuthorizationVerificationResultJsonSchema` | 常量 | <code>const executionAuthorizationVerificationResultJsonSchema: JsonSchema</code> | Execution Authorization Verification Result 的 JSON Schema。 |
| `executionAuthorizationVerificationResultSchema` | 常量 | <code>const executionAuthorizationVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string &#124; undefined; expiresAt?: string &#124; undefined; }, { valid: boolean; verificationR...</code> | Execution Authorization Verification Result 的运行时 Schema。 |
| `executionDispatchRequestExample` | 常量 | <code>const executionDispatchRequestExample: ExecutionDispatchRequest</code> | Execution Dispatch Request 的有效示例值。 |
| `executionDispatchRequestJsonSchema` | 常量 | <code>const executionDispatchRequestJsonSchema: JsonSchema</code> | Execution Dispatch Request 的 JSON Schema。 |
| `executionDispatchRequestSchema` | 常量 | <code>const executionDispatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activity: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user"...</code> | Execution Dispatch Request 的运行时 Schema。 |
| `executionPortJsonSchemas` | 常量 | <code>const executionPortJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-port/contracts` 模块导出的 Execution Port JSON Schemas 常量。 |
| `validateExecutionAuthorizationEvidence` | 函数 | <code>validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence</code> | Validate Execution Authorization Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionAuthorizationVerificationResult` | 函数 | <code>validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult</code> | Validate Execution Authorization Verification Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionDispatchRequest` | 函数 | <code>validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest</code> | Validate Execution Dispatch Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionAuthorizationEvidenceExample`

Execution Authorization Evidence 的有效示例值。

- 种类: 常量
- 导入: `import { executionAuthorizationEvidenceExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence;
```

## `executionAuthorizationEvidenceJsonSchema`

Execution Authorization Evidence 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionAuthorizationEvidenceJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationEvidenceJsonSchema: JsonSchema;
```

## `executionAuthorizationEvidenceSchema`

Execution Authorization Evidence 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionAuthorizationEvidenceSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationEvidenceSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional<z.ZodString>; contractSnapshotRef: z.ZodOptional<z.ZodString>; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional<z.ZodString>; authorizedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }>, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }, { id: string; runId: string; principalId: string; activityId: string; inputHash: string; invocationId: string; toolId: string; policyDecisionRef: string; riskAssessmentId: string; authorizedAt: string; approvalRef?: string | undefined; expiresAt?: string | undefined; toolRevision?: string | undefined; contractSnapshotRef?: string | undefined; }>;
```

## `executionAuthorizationVerificationResultExample`

Execution Authorization Verification Result 的有效示例值。

- 种类: 常量
- 导入: `import { executionAuthorizationVerificationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult;
```

## `executionAuthorizationVerificationResultJsonSchema`

Execution Authorization Verification Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionAuthorizationVerificationResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationVerificationResultJsonSchema: JsonSchema;
```

## `executionAuthorizationVerificationResultSchema`

Execution Authorization Verification Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionAuthorizationVerificationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionAuthorizationVerificationResultSchema: z.ZodEffects<z.ZodObject<{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }>, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string | undefined; expiresAt?: string | undefined; }>;
```

## `executionDispatchRequestExample`

Execution Dispatch Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionDispatchRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionDispatchRequestExample: ExecutionDispatchRequest;
```

## `executionDispatchRequestJsonSchema`

Execution Dispatch Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionDispatchRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionDispatchRequestJsonSchema: JsonSchema;
```

## `executionDispatchRequestSchema`

Execution Dispatch Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionDispatchRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionDispatchRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionDispatchRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionPortJsonSchemas`

由 `modules/execution-port/contracts` 模块导出的 Execution Port JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionPortJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare const executionPortJsonSchemas: Record<string, JsonSchema>;
```

## `validateExecutionAuthorizationEvidence`

Validate Execution Authorization Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionAuthorizationEvidence } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare function validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence;
```

### 调用签名

```text
validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionAuthorizationEvidence`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionAuthorizationVerificationResult`

Validate Execution Authorization Verification Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionAuthorizationVerificationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare function validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult;
```

### 调用签名

```text
validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionAuthorizationVerificationResult`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionDispatchRequest`

Validate Execution Dispatch Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionDispatchRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-port/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)

### 声明

```text
export declare function validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest;
```

### 调用签名

```text
validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionDispatchRequest`
- 说明: 返回值契约由上述类型定义。
