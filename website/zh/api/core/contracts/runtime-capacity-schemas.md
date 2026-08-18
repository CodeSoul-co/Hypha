# `@codesoul-co/hypha-core` / `contracts/runtime-capacity-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-capacity-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)
- 导出数: **22**

## 模块用法

用于声明并运行时校验契约。Runtime capacity schemas 模块公开 22 常量。

### 从包入口导入

```ts
import {
  runtimeCapacityAcquireRequestSchema,
  runtimeCapacityAssertionRequestSchema,
  runtimeCapacityContractDefinitions,
  runtimeCapacityContractJsonSchemas,
  runtimeCapacityLeaseDefinition,
  runtimeCapacityLeaseGuardSchema,
  runtimeCapacityLeaseSchema,
  runtimeCapacityPolicyDefinition,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 22 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeCapacityAcquireRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCapacityAcquireRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeCapacityAcquireRequestSchema` | 常量 | <code>const runtimeCapacityAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; } &amp; { kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; operationId: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; ttlMs: z.ZodNumber; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; kind: "tool" ...</code> | Runtime Capacity Acquire Request 的运行时 Schema。 |
| `runtimeCapacityAssertionRequestSchema` | 常量 | <code>const runtimeCapacityAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; owne...</code> | Runtime Capacity Assertion Request 的运行时 Schema。 |
| `runtimeCapacityContractDefinitions` | 常量 | <code>const runtimeCapacityContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCapacityPolicy&gt;, SpecSchemaDefinition&lt;RuntimeCapacityLease&gt;]</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Contract Definitions 常量。 |
| `runtimeCapacityContractJsonSchemas` | 常量 | <code>const runtimeCapacityContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Contract JSON Schemas 常量。 |
| `runtimeCapacityLeaseDefinition` | 常量 | <code>const runtimeCapacityLeaseDefinition: SpecSchemaDefinition&lt;RuntimeCapacityLease&gt;</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Lease Definition 常量。 |
| `runtimeCapacityLeaseGuardSchema` | 常量 | <code>const runtimeCapacityLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Runtime Capacity Lease Guard 的运行时 Schema。 |
| `runtimeCapacityLeaseSchema` | 常量 | <code>const runtimeCapacityLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; } &amp; { id: z.ZodString; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; operationId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; policyRevision: z.ZodString; acquiredAt: z.ZodString; heartbeatAt: z.ZodString; expiresAt: z.ZodString; }, "strict", z.ZodTypeAny,...</code> | Runtime Capacity Lease 的运行时 Schema。 |
| `runtimeCapacityPolicyDefinition` | 常量 | <code>const runtimeCapacityPolicyDefinition: SpecSchemaDefinition&lt;RuntimeCapacityPolicy&gt;</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Policy Definition 常量。 |
| `runtimeCapacityPolicySchema` | 常量 | <code>const runtimeCapacityPolicySchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; revision: z.ZodString; limits: z.ZodObject&lt;{ model: z.ZodEffects&lt;z.ZodObject&lt;{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }&gt;, { global: number; perUser: number; }, { global: number; perUser: number; }&gt;; tool: z.ZodEffects&lt;z.ZodObject&lt;{ ...</code> | Runtime Capacity Policy 的运行时 Schema。 |
| `runtimeCapacityReleaseRequestSchema` | 常量 | <code>const runtimeCapacityReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerI...</code> | Runtime Capacity Release Request 的运行时 Schema。 |
| `runtimeCapacityRenewRequestSchema` | 常量 | <code>const runtimeCapacityRenewRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; guard: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId:...</code> | Runtime Capacity Renew Request 的运行时 Schema。 |
| `runtimeCapacityScopeSchema` | 常量 | <code>const runtimeCapacityScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; tenantId?: string &#124; undefined; }&gt;</code> | Runtime Capacity Scope 的运行时 Schema。 |
| `runtimeCapacityUsageRequestSchema` | 常量 | <code>const runtimeCapacityUsageRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; tenantId?: string &#124; undefined; }, { userId: string; kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; tenantId?: string &#124;...</code> | Runtime Capacity Usage Request 的运行时 Schema。 |
| `runtimeCapacityUsageSchema` | 常量 | <code>const runtimeCapacityUsageSchema: z.ZodObject&lt;{ kind: z.ZodEnum&lt;["model", "tool", "execution"]&gt;; policyRevision: z.ZodString; globalActive: z.ZodNumber; userActive: z.ZodNumber; globalLimit: z.ZodNumber; userLimit: z.ZodNumber; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" &#124; "model" &#124; "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: ...</code> | Runtime Capacity Usage 的运行时 Schema。 |
| `validateRuntimeCapacityAcquireRequest` | 常量 | <code>const validateRuntimeCapacityAcquireRequest: (input: unknown) =&gt; RuntimeCapacityAcquireRequest</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Acquire Request 常量。 |
| `validateRuntimeCapacityAssertionRequest` | 常量 | <code>const validateRuntimeCapacityAssertionRequest: (input: unknown) =&gt; RuntimeCapacityAssertionRequest</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Assertion Request 常量。 |
| `validateRuntimeCapacityLease` | 常量 | <code>const validateRuntimeCapacityLease: (input: unknown) =&gt; RuntimeCapacityLease</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Lease 常量。 |
| `validateRuntimeCapacityPolicy` | 常量 | <code>const validateRuntimeCapacityPolicy: (input: unknown) =&gt; RuntimeCapacityPolicy</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Policy 常量。 |
| `validateRuntimeCapacityReleaseRequest` | 常量 | <code>const validateRuntimeCapacityReleaseRequest: (input: unknown) =&gt; RuntimeCapacityReleaseRequest</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Release Request 常量。 |
| `validateRuntimeCapacityRenewRequest` | 常量 | <code>const validateRuntimeCapacityRenewRequest: (input: unknown) =&gt; RuntimeCapacityRenewRequest</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Renew Request 常量。 |
| `validateRuntimeCapacityUsage` | 常量 | <code>const validateRuntimeCapacityUsage: (input: unknown) =&gt; RuntimeCapacityUsage</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Usage 常量。 |
| `validateRuntimeCapacityUsageRequest` | 常量 | <code>const validateRuntimeCapacityUsageRequest: (input: unknown) =&gt; RuntimeCapacityUsageRequest</code> | 由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Usage Request 常量。 |

## `runtimeCapacityAcquireRequestSchema`

Runtime Capacity Acquire Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; } & { kind: z.ZodEnum<["model", "tool", "execution"]>; operationId: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; ttlMs: z.ZodNumber; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; kind: "tool" | "model" | "execution"; operationId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; tenantId?: string | undefined; }, { userId: string; runId: string; kind: "tool" | "model" | "execution"; operationId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; tenantId?: string | undefined; }>;
```

## `runtimeCapacityAssertionRequestSchema`

Runtime Capacity Assertion Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runtimeCapacityContractDefinitions`

由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeCapacityContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCapacityPolicy>, SpecSchemaDefinition<RuntimeCapacityLease>];
```

## `runtimeCapacityContractJsonSchemas`

由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeCapacityContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCapacityLeaseDefinition`

由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Lease Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCapacityLeaseDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityLeaseDefinition: SpecSchemaDefinition<RuntimeCapacityLease>;
```

## `runtimeCapacityLeaseGuardSchema`

Runtime Capacity Lease Guard 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `runtimeCapacityLeaseSchema`

Runtime Capacity Lease 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityLeaseSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityLeaseSchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; } & { id: z.ZodString; kind: z.ZodEnum<["model", "tool", "execution"]>; operationId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; policyRevision: z.ZodString; acquiredAt: z.ZodString; heartbeatAt: z.ZodString; expiresAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }>, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }, { id: string; userId: string; runId: string; kind: "tool" | "model" | "execution"; expiresAt: string; operationId: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; policyRevision: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityPolicyDefinition`

由 `contracts/runtime-capacity-schemas` 模块导出的 Runtime Capacity Policy Definition 常量。

- 种类: 常量
- 导入: `import { runtimeCapacityPolicyDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityPolicyDefinition: SpecSchemaDefinition<RuntimeCapacityPolicy>;
```

## `runtimeCapacityPolicySchema`

Runtime Capacity Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityPolicySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityPolicySchema: z.ZodObject<{ version: z.ZodLiteral<"1.0.0">; revision: z.ZodString; limits: z.ZodObject<{ model: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; tool: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; execution: z.ZodEffects<z.ZodObject<{ global: z.ZodNumber; perUser: z.ZodNumber; }, "strict", z.ZodTypeAny, { global: number; perUser: number; }, { global: number; perUser: number; }>, { global: number; perUser: number; }, { global: number; perUser: number; }>; }, "strict", z.ZodTypeAny, { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }, { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }>; }, "strict", z.ZodTypeAny, { revision: string; version: "1.0.0"; limits: { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }; }, { revision: string; version: "1.0.0"; limits: { tool: { global: number; perUser: number; }; model: { global: number; perUser: number; }; execution: { global: number; perUser: number; }; }; }>;
```

## `runtimeCapacityReleaseRequestSchema`

Runtime Capacity Release Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }>;
```

## `runtimeCapacityRenewRequestSchema`

Runtime Capacity Renew Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityRenewRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityRenewRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; kind: z.ZodEnum<["model", "tool", "execution"]>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; renewedAt: z.ZodString; ttlMs: z.ZodNumber; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; renewedAt: string; }, { kind: "tool" | "model" | "execution"; scope: { userId: string; runId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; ttlMs: number; renewedAt: string; }>;
```

## `runtimeCapacityScopeSchema`

Runtime Capacity Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityUsageRequestSchema`

Runtime Capacity Usage Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityUsageRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityUsageRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; kind: z.ZodEnum<["model", "tool", "execution"]>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; kind: "tool" | "model" | "execution"; checkedAt: string; tenantId?: string | undefined; }, { userId: string; kind: "tool" | "model" | "execution"; checkedAt: string; tenantId?: string | undefined; }>;
```

## `runtimeCapacityUsageSchema`

Runtime Capacity Usage 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeCapacityUsageSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const runtimeCapacityUsageSchema: z.ZodObject<{ kind: z.ZodEnum<["model", "tool", "execution"]>; policyRevision: z.ZodString; globalActive: z.ZodNumber; userActive: z.ZodNumber; globalLimit: z.ZodNumber; userLimit: z.ZodNumber; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { kind: "tool" | "model" | "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: number; userLimit: number; }, { kind: "tool" | "model" | "execution"; checkedAt: string; policyRevision: string; globalActive: number; userActive: number; globalLimit: number; userLimit: number; }>;
```

## `validateRuntimeCapacityAcquireRequest`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Acquire Request 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityAcquireRequest: (input: unknown) => RuntimeCapacityAcquireRequest;
```

## `validateRuntimeCapacityAssertionRequest`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Assertion Request 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityAssertionRequest: (input: unknown) => RuntimeCapacityAssertionRequest;
```

## `validateRuntimeCapacityLease`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Lease 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityLease: (input: unknown) => RuntimeCapacityLease;
```

## `validateRuntimeCapacityPolicy`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Policy 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityPolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityPolicy: (input: unknown) => RuntimeCapacityPolicy;
```

## `validateRuntimeCapacityReleaseRequest`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Release Request 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityReleaseRequest: (input: unknown) => RuntimeCapacityReleaseRequest;
```

## `validateRuntimeCapacityRenewRequest`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Renew Request 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityRenewRequest: (input: unknown) => RuntimeCapacityRenewRequest;
```

## `validateRuntimeCapacityUsage`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Usage 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityUsage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityUsage: (input: unknown) => RuntimeCapacityUsage;
```

## `validateRuntimeCapacityUsageRequest`

由 `contracts/runtime-capacity-schemas` 模块导出的 Validate Runtime Capacity Usage Request 常量。

- 种类: 常量
- 导入: `import { validateRuntimeCapacityUsageRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity-schemas.ts)

### 声明

```text
export declare const validateRuntimeCapacityUsageRequest: (input: unknown) => RuntimeCapacityUsageRequest;
```
