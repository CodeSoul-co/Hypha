# `@codesoul-co/hypha-core` / `modules/execution/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)
- 导出数: **7**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 5 常量、2 函数。

### 从包入口导入

```ts
import {
  executionErrorCodes,
  executionPrincipalJsonSchema,
  executionPrincipalSchema,
  normalizedExecutionErrorJsonSchema,
  normalizedExecutionErrorSchema,
  validateExecutionPrincipal,
  validateNormalizedExecutionError,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 5 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionPrincipalSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionPrincipalSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionErrorCodes` | 常量 | <code>const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWO...</code> | 由 `modules/execution/index` 模块导出的 Execution Error Codes 常量。 |
| `executionPrincipalJsonSchema` | 常量 | <code>const executionPrincipalJsonSchema: JsonSchema</code> | Execution Principal 的 JSON Schema。 |
| `executionPrincipalSchema` | 常量 | <code>const executionPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "st...</code> | Execution Principal 的运行时 Schema。 |
| `normalizedExecutionErrorJsonSchema` | 常量 | <code>const normalizedExecutionErrorJsonSchema: JsonSchema</code> | Normalized Execution Error 的 JSON Schema。 |
| `normalizedExecutionErrorSchema` | 常量 | <code>const normalizedExecutionErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IM...</code> | Normalized Execution Error 的运行时 Schema。 |
| `validateExecutionPrincipal` | 函数 | <code>validateExecutionPrincipal(input: unknown): ExecutionPrincipal</code> | Validate Execution Principal 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateNormalizedExecutionError` | 函数 | <code>validateNormalizedExecutionError(input: unknown): NormalizedExecutionError</code> | Validate Normalized Execution Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionErrorCodes`

由 `modules/execution/index` 模块导出的 Execution Error Codes 常量。

- 种类: 常量
- 导入: `import { executionErrorCodes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWORK_DENIED", "EXECUTION_SECRET_DENIED", "EXECUTION_PROCESS_START_FAILED", "EXECUTION_TIMEOUT", "EXECUTION_IDLE_TIMEOUT", "EXECUTION_CANCELLED", "EXECUTION_OOM_KILLED", "EXECUTION_RESOURCE_EXCEEDED", "EXECUTION_OUTPUT_LIMIT", "EXECUTION_RESULT_UNKNOWN", "EXECUTION_REVISION_CONFLICT", "EXECUTION_LEASE_HELD", "EXECUTION_LEASE_LOST", "EXECUTION_IDEMPOTENCY_CONFLICT", "EXECUTION_CLEANUP_FAILED", "EXECUTION_INTERNAL_ERROR"];
```

## `executionPrincipalJsonSchema`

Execution Principal 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionPrincipalJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare const executionPrincipalJsonSchema: JsonSchema;
```

## `executionPrincipalSchema`

Execution Principal 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionPrincipalSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare const executionPrincipalSchema: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>;
```

## `normalizedExecutionErrorJsonSchema`

Normalized Execution Error 的 JSON Schema。

- 种类: 常量
- 导入: `import { normalizedExecutionErrorJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare const normalizedExecutionErrorJsonSchema: JsonSchema;
```

## `normalizedExecutionErrorSchema`

Normalized Execution Error 的运行时 Schema。

- 种类: 常量
- 导入: `import { normalizedExecutionErrorSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare const normalizedExecutionErrorSchema: z.ZodObject<{ code: z.ZodEnum<["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWORK_DENIED", "EXECUTION_SECRET_DENIED", "EXECUTION_PROCESS_START_FAILED", "EXECUTION_TIMEOUT", "EXECUTION_IDLE_TIMEOUT", "EXECUTION_CANCELLED", "EXECUTION_OOM_KILLED", "EXECUTION_RESOURCE_EXCEEDED", "EXECUTION_OUTPUT_LIMIT", "EXECUTION_RESULT_UNKNOWN", "EXECUTION_REVISION_CONFLICT", "EXECUTION_LEASE_HELD", "EXECUTION_LEASE_LOST", "EXECUTION_IDEMPOTENCY_CONFLICT", "EXECUTION_CLEANUP_FAILED", "EXECUTION_INTERNAL_ERROR"]>; message: z.ZodString; retryable: z.ZodBoolean; providerCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>; details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; causeRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { code: "EXECUTION_INVALID_REQUEST" | "EXECUTION_PERMISSION_DENIED" | "EXECUTION_POLICY_DENIED" | "EXECUTION_APPROVAL_REQUIRED" | "EXECUTION_WORKSPACE_NOT_FOUND" | "EXECUTION_PATH_ESCAPE" | "EXECUTION_PATH_DENIED" | "EXECUTION_QUOTA_EXCEEDED" | "EXECUTION_ENVIRONMENT_UNAVAILABLE" | "EXECUTION_SANDBOX_CREATE_FAILED" | "EXECUTION_SANDBOX_START_FAILED" | "EXECUTION_IMAGE_UNTRUSTED" | "EXECUTION_NETWORK_DENIED" | "EXECUTION_SECRET_DENIED" | "EXECUTION_PROCESS_START_FAILED" | "EXECUTION_TIMEOUT" | "EXECUTION_IDLE_TIMEOUT" | "EXECUTION_CANCELLED" | "EXECUTION_OOM_KILLED" | "EXECUTION_RESOURCE_EXCEEDED" | "EXECUTION_OUTPUT_LIMIT" | "EXECUTION_RESULT_UNKNOWN" | "EXECUTION_REVISION_CONFLICT" | "EXECUTION_LEASE_HELD" | "EXECUTION_LEASE_LOST" | "EXECUTION_IDEMPOTENCY_CONFLICT" | "EXECUTION_CLEANUP_FAILED" | "EXECUTION_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; providerCode?: string | number | undefined; }, { code: "EXECUTION_INVALID_REQUEST" | "EXECUTION_PERMISSION_DENIED" | "EXECUTION_POLICY_DENIED" | "EXECUTION_APPROVAL_REQUIRED" | "EXECUTION_WORKSPACE_NOT_FOUND" | "EXECUTION_PATH_ESCAPE" | "EXECUTION_PATH_DENIED" | "EXECUTION_QUOTA_EXCEEDED" | "EXECUTION_ENVIRONMENT_UNAVAILABLE" | "EXECUTION_SANDBOX_CREATE_FAILED" | "EXECUTION_SANDBOX_START_FAILED" | "EXECUTION_IMAGE_UNTRUSTED" | "EXECUTION_NETWORK_DENIED" | "EXECUTION_SECRET_DENIED" | "EXECUTION_PROCESS_START_FAILED" | "EXECUTION_TIMEOUT" | "EXECUTION_IDLE_TIMEOUT" | "EXECUTION_CANCELLED" | "EXECUTION_OOM_KILLED" | "EXECUTION_RESOURCE_EXCEEDED" | "EXECUTION_OUTPUT_LIMIT" | "EXECUTION_RESULT_UNKNOWN" | "EXECUTION_REVISION_CONFLICT" | "EXECUTION_LEASE_HELD" | "EXECUTION_LEASE_LOST" | "EXECUTION_IDEMPOTENCY_CONFLICT" | "EXECUTION_CLEANUP_FAILED" | "EXECUTION_INTERNAL_ERROR"; message: string; retryable: boolean; details?: Record<string, unknown> | undefined; causeRef?: string | undefined; providerCode?: string | number | undefined; }>;
```

## `validateExecutionPrincipal`

Validate Execution Principal 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionPrincipal } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare function validateExecutionPrincipal(input: unknown): ExecutionPrincipal;
```

### 调用签名

```text
validateExecutionPrincipal(input: unknown): ExecutionPrincipal
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionPrincipal`
- 说明: 返回值契约由上述类型定义。

## `validateNormalizedExecutionError`

Validate Normalized Execution Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateNormalizedExecutionError } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)

### 声明

```text
export declare function validateNormalizedExecutionError(input: unknown): NormalizedExecutionError;
```

### 调用签名

```text
validateNormalizedExecutionError(input: unknown): NormalizedExecutionError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedExecutionError`
- 说明: 返回值契约由上述类型定义。
