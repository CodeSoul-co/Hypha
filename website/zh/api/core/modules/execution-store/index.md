# `@codesoul-co/hypha-core` / `modules/execution-store/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-store/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)
- 导出数: **48**

## 模块用法

用于持久化并读取该边界的数据。Index 模块公开 37 常量、11 函数。

### 从包入口导入

```ts
import {
  executionIdempotencyQueryJsonSchema,
  executionIdempotencyQuerySchema,
  executionIdempotencyResolutionJsonSchema,
  executionIdempotencyResolutionSchema,
  executionLeaseAcquireRequestExample,
  executionLeaseAcquireRequestJsonSchema,
  executionLeaseAcquireRequestSchema,
  executionLeaseExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 11 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 37 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionIdempotencyQuerySchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionIdempotencyQuerySchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionIdempotencyQueryJsonSchema` | 常量 | <code>const executionIdempotencyQueryJsonSchema: JsonSchema</code> | Execution Idempotency Query 的 JSON Schema。 |
| `executionIdempotencyQuerySchema` | 常量 | <code>const executionIdempotencyQuerySchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; idempotencyKey: z.ZodString; fingerprint: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: str...</code> | Execution Idempotency Query 的运行时 Schema。 |
| `executionIdempotencyResolutionJsonSchema` | 常量 | <code>const executionIdempotencyResolutionJsonSchema: JsonSchema</code> | Execution Idempotency Resolution 的 JSON Schema。 |
| `executionIdempotencyResolutionSchema` | 常量 | <code>const executionIdempotencyResolutionSchema: z.ZodDiscriminatedUnion&lt;"status", [z.ZodObject&lt;{ status: z.ZodLiteral&lt;"miss"&gt;; }, "strict", z.ZodTypeAny, { status: "miss"; }, { status: "miss"; }&gt;, z.ZodObject&lt;{ status: z.ZodLiteral&lt;"match"&gt;; record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; p...</code> | Execution Idempotency Resolution 的运行时 Schema。 |
| `executionLeaseAcquireRequestExample` | 常量 | <code>const executionLeaseAcquireRequestExample: ExecutionLeaseAcquireRequest</code> | Execution Lease Acquire Request 的有效示例值。 |
| `executionLeaseAcquireRequestJsonSchema` | 常量 | <code>const executionLeaseAcquireRequestJsonSchema: JsonSchema</code> | Execution Lease Acquire Request 的 JSON Schema。 |
| `executionLeaseAcquireRequestSchema` | 常量 | <code>const executionLeaseAcquireRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; re...</code> | Execution Lease Acquire Request 的运行时 Schema。 |
| `executionLeaseExample` | 常量 | <code>const executionLeaseExample: ExecutionLease</code> | Execution Lease 的有效示例值。 |
| `executionLeaseGuardExample` | 常量 | <code>const executionLeaseGuardExample: ExecutionLeaseGuard</code> | Execution Lease Guard 的有效示例值。 |
| `executionLeaseGuardJsonSchema` | 常量 | <code>const executionLeaseGuardJsonSchema: JsonSchema</code> | Execution Lease Guard 的 JSON Schema。 |
| `executionLeaseGuardSchema` | 常量 | <code>const executionLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Execution Lease Guard 的运行时 Schema。 |
| `executionLeaseJsonSchema` | 常量 | <code>const executionLeaseJsonSchema: JsonSchema</code> | Execution Lease 的 JSON Schema。 |
| `executionLeaseReleaseRequestExample` | 常量 | <code>const executionLeaseReleaseRequestExample: ExecutionLeaseReleaseRequest</code> | Execution Lease Release Request 的有效示例值。 |
| `executionLeaseReleaseRequestJsonSchema` | 常量 | <code>const executionLeaseReleaseRequestJsonSchema: JsonSchema</code> | Execution Lease Release Request 的 JSON Schema。 |
| `executionLeaseReleaseRequestSchema` | 常量 | <code>const executionLeaseReleaseRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;; releasedAt: z.ZodString; reason...</code> | Execution Lease Release Request 的运行时 Schema。 |
| `executionLeaseRenewRequestExample` | 常量 | <code>const executionLeaseRenewRequestExample: ExecutionLeaseRenewRequest</code> | Execution Lease Renew Request 的有效示例值。 |
| `executionLeaseRenewRequestJsonSchema` | 常量 | <code>const executionLeaseRenewRequestJsonSchema: JsonSchema</code> | Execution Lease Renew Request 的 JSON Schema。 |
| `executionLeaseRenewRequestSchema` | 常量 | <code>const executionLeaseRenewRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;; ttlMs: z.ZodNumber; heartbeatAt: ...</code> | Execution Lease Renew Request 的运行时 Schema。 |
| `executionLeaseSchema` | 常量 | <code>const executionLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; executionId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: stri...</code> | Execution Lease 的运行时 Schema。 |
| `executionRecordCompareAndSetRequestExample` | 常量 | <code>const executionRecordCompareAndSetRequestExample: ExecutionRecordCompareAndSetRequest</code> | Execution Record Compare And Set Request 的有效示例值。 |
| `executionRecordCompareAndSetRequestJsonSchema` | 常量 | <code>const executionRecordCompareAndSetRequestJsonSchema: JsonSchema</code> | Execution Record Compare And Set Request 的 JSON Schema。 |
| `executionRecordCompareAndSetRequestSchema` | 常量 | <code>const executionRecordCompareAndSetRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodOptional&lt;z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }...</code> | Execution Record Compare And Set Request 的运行时 Schema。 |
| `executionRecordCreateRequestExample` | 常量 | <code>const executionRecordCreateRequestExample: ExecutionRecordCreateRequest</code> | Execution Record Create Request 的有效示例值。 |
| `executionRecordCreateRequestJsonSchema` | 常量 | <code>const executionRecordCreateRequestJsonSchema: JsonSchema</code> | Execution Record Create Request 的 JSON Schema。 |
| `executionRecordCreateRequestSchema` | 常量 | <code>const executionRecordCreateRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;...</code> | Execution Record Create Request 的运行时 Schema。 |
| `executionRecordExample` | 常量 | <code>const executionRecordExample: ExecutionRecord</code> | Execution Record 的有效示例值。 |
| `executionRecordJsonSchema` | 常量 | <code>const executionRecordJsonSchema: JsonSchema</code> | Execution Record 的 JSON Schema。 |
| `executionRecordPageJsonSchema` | 常量 | <code>const executionRecordPageJsonSchema: JsonSchema</code> | Execution Record Page 的 JSON Schema。 |
| `executionRecordPageSchema` | 常量 | <code>const executionRecordPageSchema: z.ZodObject&lt;{ records: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;...</code> | Execution Record Page 的运行时 Schema。 |
| `executionRecordQueryJsonSchema` | 常量 | <code>const executionRecordQueryJsonSchema: JsonSchema</code> | Execution Record Query 的 JSON Schema。 |
| `executionRecordQuerySchema` | 常量 | <code>const executionRecordQuerySchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; statuses: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_...</code> | Execution Record Query 的运行时 Schema。 |
| `executionRecordSchema` | 常量 | <code>const executionRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; request: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;;...</code> | Execution Record 的运行时 Schema。 |
| `executionRecoveryAssessmentExample` | 常量 | <code>const executionRecoveryAssessmentExample: ExecutionRecoveryAssessment</code> | Execution Recovery Assessment 的有效示例值。 |
| `executionRecoveryAssessmentJsonSchema` | 常量 | <code>const executionRecoveryAssessmentJsonSchema: JsonSchema</code> | Execution Recovery Assessment 的 JSON Schema。 |
| `executionRecoveryAssessmentSchema` | 常量 | <code>const executionRecoveryAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; recordRevision: z.ZodNumber; disposition: z.ZodEnum&lt;["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]&gt;; assessedAt: z.ZodString; providerStatusRef: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { executionId: string; dispositio...</code> | Execution Recovery Assessment 的运行时 Schema。 |
| `executionRecoveryDispositionSchema` | 常量 | <code>const executionRecoveryDispositionSchema: z.ZodEnum&lt;["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]&gt;</code> | Execution Recovery Disposition 的运行时 Schema。 |
| `executionStoreJsonSchemas` | 常量 | <code>const executionStoreJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-store/index` 模块导出的 Execution Store JSON Schemas 常量。 |
| `validateExecutionIdempotencyQuery` | 函数 | <code>validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery</code> | Validate Execution Idempotency Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionIdempotencyResolution` | 函数 | <code>validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution</code> | Validate Execution Idempotency Resolution 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionLease` | 函数 | <code>validateExecutionLease(input: unknown): ExecutionLease</code> | Validate Execution Lease 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionLeaseAcquireRequest` | 函数 | <code>validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest</code> | Validate Execution Lease Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionLeaseReleaseRequest` | 函数 | <code>validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest</code> | Validate Execution Lease Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionLeaseRenewRequest` | 函数 | <code>validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest</code> | Validate Execution Lease Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionRecord` | 函数 | <code>validateExecutionRecord(input: unknown): ExecutionRecord</code> | Validate Execution Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionRecordCompareAndSetRequest` | 函数 | <code>validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest</code> | Validate Execution Record Compare And Set Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionRecordCreateRequest` | 函数 | <code>validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest</code> | Validate Execution Record Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionRecordQuery` | 函数 | <code>validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery</code> | Validate Execution Record Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionRecoveryAssessment` | 函数 | <code>validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment</code> | Validate Execution Recovery Assessment 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionIdempotencyQueryJsonSchema`

Execution Idempotency Query 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionIdempotencyQueryJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionIdempotencyQueryJsonSchema: JsonSchema;
```

## `executionIdempotencyQuerySchema`

Execution Idempotency Query 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionIdempotencyQuerySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionIdempotencyQuerySchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodString; idempotencyKey: z.ZodString; fingerprint: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string | undefined; }, { workspaceId: string; userId: string; idempotencyKey: string; fingerprint: string; tenantId?: string | undefined; }>;
```

## `executionIdempotencyResolutionJsonSchema`

Execution Idempotency Resolution 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionIdempotencyResolutionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionIdempotencyResolutionJsonSchema: JsonSchema;
```

## `executionIdempotencyResolutionSchema`

Execution Idempotency Resolution 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionIdempotencyResolutionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionIdempotencyResolutionSchema: (typeof import('@codesoul-co/hypha-core'))['executionIdempotencyResolutionSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionLeaseAcquireRequestExample`

Execution Lease Acquire Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionLeaseAcquireRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseAcquireRequestExample: ExecutionLeaseAcquireRequest;
```

## `executionLeaseAcquireRequestJsonSchema`

Execution Lease Acquire Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionLeaseAcquireRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseAcquireRequestJsonSchema: JsonSchema;
```

## `executionLeaseAcquireRequestSchema`

Execution Lease Acquire Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLeaseAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseAcquireRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; requestedLeaseId: string; ttlMs: number; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; ownerId: string; expectedRevision: number; acquiredAt: string; requestedLeaseId: string; ttlMs: number; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseExample`

Execution Lease 的有效示例值。

- 种类: 常量
- 导入: `import { executionLeaseExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseExample: ExecutionLease;
```

## `executionLeaseGuardExample`

Execution Lease Guard 的有效示例值。

- 种类: 常量
- 导入: `import { executionLeaseGuardExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseGuardExample: ExecutionLeaseGuard;
```

## `executionLeaseGuardJsonSchema`

Execution Lease Guard 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionLeaseGuardJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseGuardJsonSchema: JsonSchema;
```

## `executionLeaseGuardSchema`

Execution Lease Guard 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `executionLeaseJsonSchema`

Execution Lease 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionLeaseJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseJsonSchema: JsonSchema;
```

## `executionLeaseReleaseRequestExample`

Execution Lease Release Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionLeaseReleaseRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseReleaseRequestExample: ExecutionLeaseReleaseRequest;
```

## `executionLeaseReleaseRequestJsonSchema`

Execution Lease Release Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionLeaseReleaseRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseReleaseRequestJsonSchema: JsonSchema;
```

## `executionLeaseReleaseRequestSchema`

Execution Lease Release Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLeaseReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseReleaseRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; reason: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; expectedRevision: number; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; reason?: string | undefined; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; expectedRevision: number; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; reason?: string | undefined; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseRenewRequestExample`

Execution Lease Renew Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionLeaseRenewRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseRenewRequestExample: ExecutionLeaseRenewRequest;
```

## `executionLeaseRenewRequestJsonSchema`

Execution Lease Renew Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionLeaseRenewRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseRenewRequestJsonSchema: JsonSchema;
```

## `executionLeaseRenewRequestSchema`

Execution Lease Renew Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLeaseRenewRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseRenewRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; expectedRevision: z.ZodNumber; leaseGuard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; ttlMs: z.ZodNumber; heartbeatAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; expectedRevision: number; heartbeatAt: string; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; idempotencyKey?: string | undefined; }, { operationId: string; executionId: string; expectedRevision: number; heartbeatAt: string; leaseGuard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; idempotencyKey?: string | undefined; }>;
```

## `executionLeaseSchema`

Execution Lease 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLeaseSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionLeaseSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; executionId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }>, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }, { id: string; executionId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; }>;
```

## `executionRecordCompareAndSetRequestExample`

Execution Record Compare And Set Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionRecordCompareAndSetRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordCompareAndSetRequestExample: ExecutionRecordCompareAndSetRequest;
```

## `executionRecordCompareAndSetRequestJsonSchema`

Execution Record Compare And Set Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecordCompareAndSetRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordCompareAndSetRequestJsonSchema: JsonSchema;
```

## `executionRecordCompareAndSetRequestSchema`

Execution Record Compare And Set Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecordCompareAndSetRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionRecordCompareAndSetRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordCompareAndSetRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionRecordCreateRequestExample`

Execution Record Create Request 的有效示例值。

- 种类: 常量
- 导入: `import { executionRecordCreateRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordCreateRequestExample: ExecutionRecordCreateRequest;
```

## `executionRecordCreateRequestJsonSchema`

Execution Record Create Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecordCreateRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordCreateRequestJsonSchema: JsonSchema;
```

## `executionRecordCreateRequestSchema`

Execution Record Create Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecordCreateRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionRecordCreateRequestSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordCreateRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionRecordExample`

Execution Record 的有效示例值。

- 种类: 常量
- 导入: `import { executionRecordExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordExample: ExecutionRecord;
```

## `executionRecordJsonSchema`

Execution Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordJsonSchema: JsonSchema;
```

## `executionRecordPageJsonSchema`

Execution Record Page 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecordPageJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordPageJsonSchema: JsonSchema;
```

## `executionRecordPageSchema`

Execution Record Page 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecordPageSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionRecordPageSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordPageSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionRecordQueryJsonSchema`

Execution Record Query 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecordQueryJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordQueryJsonSchema: JsonSchema;
```

## `executionRecordQuerySchema`

Execution Record Query 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecordQuerySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecordQuerySchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; workspaceId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; providerId: z.ZodOptional<z.ZodString>; statuses: z.ZodOptional<z.ZodArray<z.ZodEnum<["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]>, "many">>; leaseExpiresBefore: z.ZodOptional<z.ZodString>; updatedBefore: z.ZodOptional<z.ZodString>; limit: z.ZodOptional<z.ZodNumber>; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }>, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }, { workspaceId?: string | undefined; runId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; providerId?: string | undefined; limit?: number | undefined; cursor?: string | undefined; leaseExpiresBefore?: string | undefined; statuses?: ("failed" | "starting" | "queued" | "running" | "cancelling" | "cancelled" | "completed" | "timed_out" | "oom_killed" | "resource_exceeded" | "quarantined")[] | undefined; updatedBefore?: string | undefined; }>;
```

## `executionRecordSchema`

Execution Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionRecordSchema: (typeof import('@codesoul-co/hypha-core'))['executionRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionRecoveryAssessmentExample`

Execution Recovery Assessment 的有效示例值。

- 种类: 常量
- 导入: `import { executionRecoveryAssessmentExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecoveryAssessmentExample: ExecutionRecoveryAssessment;
```

## `executionRecoveryAssessmentJsonSchema`

Execution Recovery Assessment 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionRecoveryAssessmentJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecoveryAssessmentJsonSchema: JsonSchema;
```

## `executionRecoveryAssessmentSchema`

Execution Recovery Assessment 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecoveryAssessmentSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecoveryAssessmentSchema: z.ZodEffects<z.ZodObject<{ executionId: z.ZodString; recordRevision: z.ZodNumber; disposition: z.ZodEnum<["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]>; assessedAt: z.ZodString; providerStatusRef: z.ZodOptional<z.ZodString>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }>, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }, { executionId: string; disposition: "not_started" | "provider_queryable" | "provider_completed_result_missing" | "provider_state_unknown"; recordRevision: number; assessedAt: string; reason?: string | undefined; providerStatusRef?: string | undefined; }>;
```

## `executionRecoveryDispositionSchema`

Execution Recovery Disposition 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionRecoveryDispositionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionRecoveryDispositionSchema: z.ZodEnum<["not_started", "provider_queryable", "provider_completed_result_missing", "provider_state_unknown"]>;
```

## `executionStoreJsonSchemas`

由 `modules/execution-store/index` 模块导出的 Execution Store JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionStoreJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare const executionStoreJsonSchemas: Record<string, JsonSchema>;
```

## `validateExecutionIdempotencyQuery`

Validate Execution Idempotency Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionIdempotencyQuery } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery;
```

### 调用签名

```text
validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionIdempotencyQuery`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionIdempotencyResolution`

Validate Execution Idempotency Resolution 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionIdempotencyResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution;
```

### 调用签名

```text
validateExecutionIdempotencyResolution(input: unknown): ExecutionIdempotencyResolution
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionIdempotencyResolution`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionLease`

Validate Execution Lease 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionLease(input: unknown): ExecutionLease;
```

### 调用签名

```text
validateExecutionLease(input: unknown): ExecutionLease
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionLease`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionLeaseAcquireRequest`

Validate Execution Lease Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest;
```

### 调用签名

```text
validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionLeaseAcquireRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionLeaseReleaseRequest`

Validate Execution Lease Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest;
```

### 调用签名

```text
validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionLeaseReleaseRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionLeaseRenewRequest`

Validate Execution Lease Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionLeaseRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest;
```

### 调用签名

```text
validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionLeaseRenewRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionRecord`

Validate Execution Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionRecord(input: unknown): ExecutionRecord;
```

### 调用签名

```text
validateExecutionRecord(input: unknown): ExecutionRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecord`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionRecordCompareAndSetRequest`

Validate Execution Record Compare And Set Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRecordCompareAndSetRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest;
```

### 调用签名

```text
validateExecutionRecordCompareAndSetRequest(input: unknown): ExecutionRecordCompareAndSetRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecordCompareAndSetRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionRecordCreateRequest`

Validate Execution Record Create Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRecordCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest;
```

### 调用签名

```text
validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecordCreateRequest`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionRecordQuery`

Validate Execution Record Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRecordQuery } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery;
```

### 调用签名

```text
validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecordQuery`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionRecoveryAssessment`

Validate Execution Recovery Assessment 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionRecoveryAssessment } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/index.ts)

### 声明

```text
export declare function validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment;
```

### 调用签名

```text
validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionRecoveryAssessment`
- 说明: 返回值契约由上述类型定义。
