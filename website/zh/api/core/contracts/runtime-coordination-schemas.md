# `@codesoul-co/hypha-core` / `contracts/runtime-coordination-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-coordination-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)
- 导出数: **56**

## 模块用法

用于声明并运行时校验契约。Runtime coordination schemas 模块公开 38 常量、18 函数。

### 从包入口导入

```ts
import {
  fencedRunLeaseDefinition,
  fencedRunLeaseExample,
  fencedRunLeaseJsonSchema,
  fencedRunLeaseSchema,
  resourceAcquireRequestSchema,
  resourceClaimAssertionRequestSchema,
  resourceListRequestSchema,
  resourceReleaseRequestSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 18 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 38 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { fencedRunLeaseSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fencedRunLeaseSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencedRunLeaseDefinition` | 常量 | <code>const fencedRunLeaseDefinition: SpecSchemaDefinition&lt;FencedRunLease&gt;</code> | 由 `contracts/runtime-coordination-schemas` 模块导出的 Fenced Run Lease Definition 常量。 |
| `fencedRunLeaseExample` | 常量 | <code>const fencedRunLeaseExample: FencedRunLease</code> | Fenced Run Lease 的有效示例值。 |
| `fencedRunLeaseJsonSchema` | 常量 | <code>const fencedRunLeaseJsonSchema: JsonSchema</code> | Fenced Run Lease 的 JSON Schema。 |
| `fencedRunLeaseSchema` | 常量 | <code>const fencedRunLeaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; revision: z.ZodNumber; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; runId: string; ex...</code> | Fenced Run Lease 的运行时 Schema。 |
| `resourceAcquireRequestSchema` | 常量 | <code>const resourceAcquireRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Z...</code> | Resource Acquire Request 的运行时 Schema。 |
| `resourceClaimAssertionRequestSchema` | 常量 | <code>const resourceClaimAssertionRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; checkedAt: z.ZodString; } &amp; { claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; checkedAt: string; ownerId: stri...</code> | Resource Claim Assertion Request 的运行时 Schema。 |
| `resourceListRequestSchema` | 常量 | <code>const resourceListRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { checkedAt: string; resourceType: "custom" &#124; "workspace" &#124; "artifact" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"; resourceKey: strin...</code> | Resource List Request 的运行时 Schema。 |
| `resourceReleaseRequestSchema` | 常量 | <code>const resourceReleaseRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Z...</code> | Resource Release Request 的运行时 Schema。 |
| `resourceRenewRequestSchema` | 常量 | <code>const resourceRenewRequestSchema: z.ZodObject&lt;{ runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.Zod...</code> | Resource Renew Request 的运行时 Schema。 |
| `runLeaseAcquireRequestSchema` | 常量 | <code>const runLeaseAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeas...</code> | Run Lease Acquire Request 的运行时 Schema。 |
| `runLeaseAssertionRequestSchema` | 常量 | <code>const runLeaseAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z....</code> | Run Lease Assertion Request 的运行时 Schema。 |
| `runLeaseAuthorizationSchema` | 常量 | <code>const runLeaseAuthorizationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z.Zod...</code> | Run Lease Authorization 的运行时 Schema。 |
| `runLeaseGuardJsonSchema` | 常量 | <code>const runLeaseGuardJsonSchema: JsonSchema</code> | Run Lease Guard 的 JSON Schema。 |
| `runLeaseGuardSchema` | 常量 | <code>const runLeaseGuardSchema: z.ZodObject&lt;{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }&gt;</code> | Run Lease Guard 的运行时 Schema。 |
| `runLeaseHeartbeatRequestSchema` | 常量 | <code>const runLeaseHeartbeatRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z....</code> | Run Lease Heartbeat Request 的运行时 Schema。 |
| `runLeasePreemptRequestSchema` | 常量 | <code>const runLeasePreemptRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; } &amp; { reason: z.ZodLiteral&lt;"cancellation"&gt;; }, "strict", z.ZodTypeAny, { userId: string; runId: string; reason: "cancellation"; idempo...</code> | Run Lease Preempt Request 的运行时 Schema。 |
| `runLeaseReleaseRequestSchema` | 常量 | <code>const runLeaseReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;; guard: z.ZodObject&lt;{ leaseId: z.Zo...</code> | Run Lease Release Request 的运行时 Schema。 |
| `runLeaseScopeJsonSchema` | 常量 | <code>const runLeaseScopeJsonSchema: JsonSchema</code> | Run Lease Scope 的 JSON Schema。 |
| `runLeaseScopeSchema` | 常量 | <code>const runLeaseScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string &#124; undefined; }&gt;</code> | Run Lease Scope 的运行时 Schema。 |
| `runtimeCoordinationContractDefinitions` | 常量 | <code>const runtimeCoordinationContractDefinitions: readonly [SpecSchemaDefinition&lt;FencedRunLease&gt;, SpecSchemaDefinition&lt;StateExecutionClaim&gt;, SpecSchemaDefinition&lt;RuntimeResourceClaim&gt;]</code> | 由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Coordination Contract Definitions 常量。 |
| `runtimeCoordinationContractJsonSchemas` | 常量 | <code>const runtimeCoordinationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Coordination Contract JSON Schemas 常量。 |
| `runtimeResourceClaimDefinition` | 常量 | <code>const runtimeResourceClaimDefinition: SpecSchemaDefinition&lt;RuntimeResourceClaim&gt;</code> | 由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Resource Claim Definition 常量。 |
| `runtimeResourceClaimExample` | 常量 | <code>const runtimeResourceClaimExample: RuntimeResourceClaim</code> | Runtime Resource Claim 的有效示例值。 |
| `runtimeResourceClaimJsonSchema` | 常量 | <code>const runtimeResourceClaimJsonSchema: JsonSchema</code> | Runtime Resource Claim 的 JSON Schema。 |
| `runtimeResourceClaimModeSchema` | 常量 | <code>const runtimeResourceClaimModeSchema: z.ZodEnum&lt;["shared", "exclusive"]&gt;</code> | Runtime Resource Claim Mode 的运行时 Schema。 |
| `runtimeResourceClaimSchema` | 常量 | <code>const runtimeResourceClaimSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; resourceType: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;; resourceKey: z.ZodString; mode: z.ZodEnum&lt;["shared", "exclusive"]&gt;; runId: z.ZodString; stateId: z.ZodOptional&lt;z.ZodString&gt;; ownerId: z.ZodString; fencingToken: z.ZodNu...</code> | Runtime Resource Claim 的运行时 Schema。 |
| `runtimeResourceTypeSchema` | 常量 | <code>const runtimeResourceTypeSchema: z.ZodEnum&lt;["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]&gt;</code> | Runtime Resource Type 的运行时 Schema。 |
| `stateExecutionClaimAcquireRequestSchema` | 常量 | <code>const stateExecutionClaimAcquireRequestSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; requestedClaimId: z.ZodString; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; runLease: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; partition...</code> | State Execution Claim Acquire Request 的运行时 Schema。 |
| `stateExecutionClaimAssertionRequestSchema` | 常量 | <code>const stateExecutionClaimAssertionRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; ...</code> | State Execution Claim Assertion Request 的运行时 Schema。 |
| `stateExecutionClaimCompleteRequestSchema` | 常量 | <code>const stateExecutionClaimCompleteRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; t...</code> | State Execution Claim Complete Request 的运行时 Schema。 |
| `stateExecutionClaimDefinition` | 常量 | <code>const stateExecutionClaimDefinition: SpecSchemaDefinition&lt;StateExecutionClaim&gt;</code> | 由 `contracts/runtime-coordination-schemas` 模块导出的 State Execution Claim Definition 常量。 |
| `stateExecutionClaimExample` | 常量 | <code>const stateExecutionClaimExample: StateExecutionClaim</code> | State Execution Claim 的有效示例值。 |
| `stateExecutionClaimGuardSchema` | 常量 | <code>const stateExecutionClaimGuardSchema: z.ZodObject&lt;{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }&gt;</code> | State Execution Claim Guard 的运行时 Schema。 |
| `stateExecutionClaimJsonSchema` | 常量 | <code>const stateExecutionClaimJsonSchema: JsonSchema</code> | State Execution Claim 的 JSON Schema。 |
| `stateExecutionClaimReleaseRequestSchema` | 常量 | <code>const stateExecutionClaimReleaseRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; te...</code> | State Execution Claim Release Request 的运行时 Schema。 |
| `stateExecutionClaimRenewRequestSchema` | 常量 | <code>const stateExecutionClaimRenewRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tena...</code> | State Execution Claim Renew Request 的运行时 Schema。 |
| `stateExecutionClaimSchema` | 常量 | <code>const stateExecutionClaimSchema: z.ZodEffects&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; claimId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; fencingToken: z.ZodNumber; ownerId: z.ZodString; status: z.ZodEnum&lt;["claimed", "completed", "released", "expired"]&gt;; acquiredAt: z.ZodString; e...</code> | State Execution Claim 的运行时 Schema。 |
| `stateExecutionClaimScopeSchema` | 常量 | <code>const stateExecutionClaimScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string &#124; undefined; }&gt;</code> | State Execution Claim Scope 的运行时 Schema。 |
| `validateFencedRunLease` | 函数 | <code>validateFencedRunLease(input: unknown): FencedRunLease</code> | Validate Fenced Run Lease 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResourceAcquireRequest` | 函数 | <code>validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest</code> | Validate Resource Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResourceClaimAssertionRequest` | 函数 | <code>validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest</code> | Validate Resource Claim Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResourceListRequest` | 函数 | <code>validateResourceListRequest(input: unknown): ResourceListRequest</code> | Validate Resource List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResourceReleaseRequest` | 函数 | <code>validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest</code> | Validate Resource Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateResourceRenewRequest` | 函数 | <code>validateResourceRenewRequest(input: unknown): ResourceRenewRequest</code> | Validate Resource Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunLeaseAcquireRequest` | 函数 | <code>validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest</code> | Validate Run Lease Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunLeaseAssertionRequest` | 函数 | <code>validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest</code> | Validate Run Lease Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunLeaseHeartbeatRequest` | 函数 | <code>validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest</code> | Validate Run Lease Heartbeat Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunLeasePreemptRequest` | 函数 | <code>validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest</code> | Validate Run Lease Preempt Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRunLeaseReleaseRequest` | 函数 | <code>validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest</code> | Validate Run Lease Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeResourceClaim` | 函数 | <code>validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim</code> | Validate Runtime Resource Claim 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaim` | 函数 | <code>validateStateExecutionClaim(input: unknown): StateExecutionClaim</code> | Validate State Execution Claim 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaimAcquireRequest` | 函数 | <code>validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest</code> | Validate State Execution Claim Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaimAssertionRequest` | 函数 | <code>validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest</code> | Validate State Execution Claim Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaimCompleteRequest` | 函数 | <code>validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest</code> | Validate State Execution Claim Complete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaimReleaseRequest` | 函数 | <code>validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest</code> | Validate State Execution Claim Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateStateExecutionClaimRenewRequest` | 函数 | <code>validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest</code> | Validate State Execution Claim Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `fencedRunLeaseDefinition`

由 `contracts/runtime-coordination-schemas` 模块导出的 Fenced Run Lease Definition 常量。

- 种类: 常量
- 导入: `import { fencedRunLeaseDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const fencedRunLeaseDefinition: SpecSchemaDefinition<FencedRunLease>;
```

## `fencedRunLeaseExample`

Fenced Run Lease 的有效示例值。

- 种类: 常量
- 导入: `import { fencedRunLeaseExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const fencedRunLeaseExample: FencedRunLease;
```

## `fencedRunLeaseJsonSchema`

Fenced Run Lease 的 JSON Schema。

- 种类: 常量
- 导入: `import { fencedRunLeaseJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const fencedRunLeaseJsonSchema: JsonSchema;
```

## `fencedRunLeaseSchema`

Fenced Run Lease 的运行时 Schema。

- 种类: 常量
- 导入: `import { fencedRunLeaseSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const fencedRunLeaseSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; ownerId: z.ZodString; acquiredAt: z.ZodString; expiresAt: z.ZodString; heartbeatAt: z.ZodString; revision: z.ZodNumber; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }>, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }, { id: string; revision: number; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; acquiredAt: string; heartbeatAt: string; partitionKey: string; tenantId?: string | undefined; }>;
```

## `resourceAcquireRequestSchema`

Resource Acquire Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const resourceAcquireRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; stateId: z.ZodOptional<z.ZodString>; resources: z.ZodArray<z.ZodObject<{ requestedClaimId: z.ZodString; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; mode: z.ZodEnum<["shared", "exclusive"]>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }, { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }>, "many">; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; resources: { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }[]; acquiredAt: string; ttlMs: number; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; stateId?: string | undefined; }, { idempotencyKey: string; resources: { requestedClaimId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; metadata?: Record<string, JsonValue> | undefined; }[]; acquiredAt: string; ttlMs: number; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; stateId?: string | undefined; }>;
```

## `resourceClaimAssertionRequestSchema`

Resource Claim Assertion Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceClaimAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const resourceClaimAssertionRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; checkedAt: z.ZodString; } & { claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; checkedAt: string; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; claimId: string; tenantId?: string | undefined; }, { fencingToken: number; checkedAt: string; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; claimId: string; tenantId?: string | undefined; }>;
```

## `resourceListRequestSchema`

Resource List Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceListRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const resourceListRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { checkedAt: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; tenantId?: string | undefined; }, { checkedAt: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; tenantId?: string | undefined; }>;
```

## `resourceReleaseRequestSchema`

Resource Release Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const resourceReleaseRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; claimIds: z.ZodArray<z.ZodString, "many">; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }, { releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }>;
```

## `resourceRenewRequestSchema`

Resource Renew Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceRenewRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const resourceRenewRequestSchema: z.ZodObject<{ runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; claimIds: z.ZodArray<z.ZodString, "many">; ttlMs: z.ZodNumber; renewedAt: z.ZodString; }, "strict", z.ZodTypeAny, { ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }, { ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; claimIds: string[]; }>;
```

## `runLeaseAcquireRequestSchema`

Run Lease Acquire Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runLeaseAssertionRequestSchema`

Run Lease Assertion Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runLeaseAuthorizationSchema`

Run Lease Authorization 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseAuthorizationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseAuthorizationSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>;
```

## `runLeaseGuardJsonSchema`

Run Lease Guard 的 JSON Schema。

- 种类: 常量
- 导入: `import { runLeaseGuardJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseGuardJsonSchema: JsonSchema;
```

## `runLeaseGuardSchema`

Run Lease Guard 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseGuardSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseGuardSchema: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>;
```

## `runLeaseHeartbeatRequestSchema`

Run Lease Heartbeat Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseHeartbeatRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseHeartbeatRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; ttlMs: z.ZodNumber; heartbeatAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; heartbeatAt: string; ttlMs: number; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; heartbeatAt: string; ttlMs: number; }>;
```

## `runLeasePreemptRequestSchema`

Run Lease Preempt Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeasePreemptRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeasePreemptRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; requestedLeaseId: z.ZodString; ownerId: z.ZodString; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; } & { reason: z.ZodLiteral<"cancellation">; }, "strict", z.ZodTypeAny, { userId: string; runId: string; reason: "cancellation"; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; reason: "cancellation"; idempotencyKey: string; ownerId: string; acquiredAt: string; requestedLeaseId: string; ttlMs: number; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runLeaseReleaseRequestSchema`

Run Lease Release Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; releasedAt: string; }>;
```

## `runLeaseScopeJsonSchema`

Run Lease Scope 的 JSON Schema。

- 种类: 常量
- 导入: `import { runLeaseScopeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseScopeJsonSchema: JsonSchema;
```

## `runLeaseScopeSchema`

Run Lease Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { runLeaseScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runLeaseScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>;
```

## `runtimeCoordinationContractDefinitions`

由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Coordination Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeCoordinationContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeCoordinationContractDefinitions: readonly [SpecSchemaDefinition<FencedRunLease>, SpecSchemaDefinition<StateExecutionClaim>, SpecSchemaDefinition<RuntimeResourceClaim>];
```

## `runtimeCoordinationContractJsonSchemas`

由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Coordination Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeCoordinationContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeCoordinationContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeResourceClaimDefinition`

由 `contracts/runtime-coordination-schemas` 模块导出的 Runtime Resource Claim Definition 常量。

- 种类: 常量
- 导入: `import { runtimeResourceClaimDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceClaimDefinition: SpecSchemaDefinition<RuntimeResourceClaim>;
```

## `runtimeResourceClaimExample`

Runtime Resource Claim 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeResourceClaimExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceClaimExample: RuntimeResourceClaim;
```

## `runtimeResourceClaimJsonSchema`

Runtime Resource Claim 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeResourceClaimJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceClaimJsonSchema: JsonSchema;
```

## `runtimeResourceClaimModeSchema`

Runtime Resource Claim Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeResourceClaimModeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceClaimModeSchema: z.ZodEnum<["shared", "exclusive"]>;
```

## `runtimeResourceClaimSchema`

Runtime Resource Claim 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeResourceClaimSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceClaimSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; resourceType: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>; resourceKey: z.ZodString; mode: z.ZodEnum<["shared", "exclusive"]>; runId: z.ZodString; stateId: z.ZodOptional<z.ZodString>; ownerId: z.ZodString; fencingToken: z.ZodNumber; runFencingToken: z.ZodNumber; acquiredAt: z.ZodString; expiresAt: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<JsonValue, z.ZodTypeDef, JsonValue>>>; }, "strict", z.ZodTypeAny, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }>, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }, { id: string; userId: string; runId: string; expiresAt: string; fencingToken: number; ownerId: string; resourceType: "custom" | "workspace" | "artifact" | "tool_scope" | "memory_scope" | "external_account"; resourceKey: string; mode: "shared" | "exclusive"; acquiredAt: string; runFencingToken: number; tenantId?: string | undefined; metadata?: Record<string, JsonValue> | undefined; stateId?: string | undefined; }>;
```

## `runtimeResourceTypeSchema`

Runtime Resource Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeResourceTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const runtimeResourceTypeSchema: z.ZodEnum<["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]>;
```

## `stateExecutionClaimAcquireRequestSchema`

State Execution Claim Acquire Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimAcquireRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimAcquireRequestSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; requestedClaimId: z.ZodString; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; ttlMs: z.ZodNumber; acquiredAt: z.ZodString; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; expectedRunRevision: number; requestedClaimId: string; acquiredAt: string; ttlMs: number; processRevision: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; tenantId?: string | undefined; }, { userId: string; runId: string; idempotencyKey: string; stateAttempt: number; stateId: string; expectedRunRevision: number; requestedClaimId: string; acquiredAt: string; ttlMs: number; processRevision: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; tenantId?: string | undefined; }>;
```

## `stateExecutionClaimAssertionRequestSchema`

State Execution Claim Assertion Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimAssertionRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimAssertionRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; claimId: string; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; checkedAt: string; guard: { fencingToken: number; ownerId: string; claimId: string; }; }>;
```

## `stateExecutionClaimCompleteRequestSchema`

State Execution Claim Complete Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimCompleteRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimCompleteRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; completedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; completedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; completedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimDefinition`

由 `contracts/runtime-coordination-schemas` 模块导出的 State Execution Claim Definition 常量。

- 种类: 常量
- 导入: `import { stateExecutionClaimDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimDefinition: SpecSchemaDefinition<StateExecutionClaim>;
```

## `stateExecutionClaimExample`

State Execution Claim 的有效示例值。

- 种类: 常量
- 导入: `import { stateExecutionClaimExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimExample: StateExecutionClaim;
```

## `stateExecutionClaimGuardSchema`

State Execution Claim Guard 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimGuardSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimGuardSchema: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>;
```

## `stateExecutionClaimJsonSchema`

State Execution Claim 的 JSON Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimJsonSchema: JsonSchema;
```

## `stateExecutionClaimReleaseRequestSchema`

State Execution Claim Release Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimReleaseRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimReleaseRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; releasedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; releasedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimRenewRequestSchema`

State Execution Claim Renew Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimRenewRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimRenewRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ claimId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; claimId: string; }, { fencingToken: number; ownerId: string; claimId: string; }>; runLease: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; partitionKey: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }, { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }>; guard: z.ZodObject<{ leaseId: z.ZodString; ownerId: z.ZodString; fencingToken: z.ZodNumber; }, "strict", z.ZodTypeAny, { fencingToken: number; ownerId: string; leaseId: string; }, { fencingToken: number; ownerId: string; leaseId: string; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }, { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }>; ttlMs: z.ZodNumber; renewedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }, { scope: { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; claimId: string; }; ttlMs: number; renewedAt: string; runLease: { scope: { userId: string; runId: string; partitionKey: string; tenantId?: string | undefined; }; guard: { fencingToken: number; ownerId: string; leaseId: string; }; }; }>;
```

## `stateExecutionClaimSchema`

State Execution Claim 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimSchema: z.ZodEffects<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; claimId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; processRevision: z.ZodString; expectedRunRevision: z.ZodNumber; fencingToken: z.ZodNumber; ownerId: z.ZodString; status: z.ZodEnum<["claimed", "completed", "released", "expired"]>; acquiredAt: z.ZodString; expiresAt: z.ZodString; completedAt: z.ZodOptional<z.ZodString>; releasedAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }>, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }, { userId: string; runId: string; status: "expired" | "completed" | "claimed" | "released"; expiresAt: string; stateAttempt: number; stateId: string; fencingToken: number; ownerId: string; expectedRunRevision: number; acquiredAt: string; claimId: string; processRevision: string; tenantId?: string | undefined; completedAt?: string | undefined; releasedAt?: string | undefined; }>;
```

## `stateExecutionClaimScopeSchema`

State Execution Claim Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { stateExecutionClaimScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare const stateExecutionClaimScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; }, "strict", z.ZodTypeAny, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }, { userId: string; runId: string; stateAttempt: number; stateId: string; tenantId?: string | undefined; }>;
```

## `validateFencedRunLease`

Validate Fenced Run Lease 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateFencedRunLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateFencedRunLease(input: unknown): FencedRunLease;
```

### 调用签名

```text
validateFencedRunLease(input: unknown): FencedRunLease
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FencedRunLease`
- 说明: 返回值契约由上述类型定义。

## `validateResourceAcquireRequest`

Validate Resource Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResourceAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest;
```

### 调用签名

```text
validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResourceAcquireRequest`
- 说明: 返回值契约由上述类型定义。

## `validateResourceClaimAssertionRequest`

Validate Resource Claim Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResourceClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest;
```

### 调用签名

```text
validateResourceClaimAssertionRequest(input: unknown): ResourceClaimAssertionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResourceClaimAssertionRequest`
- 说明: 返回值契约由上述类型定义。

## `validateResourceListRequest`

Validate Resource List Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResourceListRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateResourceListRequest(input: unknown): ResourceListRequest;
```

### 调用签名

```text
validateResourceListRequest(input: unknown): ResourceListRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResourceListRequest`
- 说明: 返回值契约由上述类型定义。

## `validateResourceReleaseRequest`

Validate Resource Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResourceReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest;
```

### 调用签名

```text
validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResourceReleaseRequest`
- 说明: 返回值契约由上述类型定义。

## `validateResourceRenewRequest`

Validate Resource Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateResourceRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateResourceRenewRequest(input: unknown): ResourceRenewRequest;
```

### 调用签名

```text
validateResourceRenewRequest(input: unknown): ResourceRenewRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResourceRenewRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRunLeaseAcquireRequest`

Validate Run Lease Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest;
```

### 调用签名

```text
validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunLeaseAcquireRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRunLeaseAssertionRequest`

Validate Run Lease Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunLeaseAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest;
```

### 调用签名

```text
validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunLeaseAssertionRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRunLeaseHeartbeatRequest`

Validate Run Lease Heartbeat Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunLeaseHeartbeatRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest;
```

### 调用签名

```text
validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunLeaseHeartbeatRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRunLeasePreemptRequest`

Validate Run Lease Preempt Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunLeasePreemptRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest;
```

### 调用签名

```text
validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunLeasePreemptRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRunLeaseReleaseRequest`

Validate Run Lease Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRunLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest;
```

### 调用签名

```text
validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RunLeaseReleaseRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeResourceClaim`

Validate Runtime Resource Claim 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeResourceClaim } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim;
```

### 调用签名

```text
validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeResourceClaim`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaim`

Validate State Execution Claim 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaim } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaim(input: unknown): StateExecutionClaim;
```

### 调用签名

```text
validateStateExecutionClaim(input: unknown): StateExecutionClaim
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaim`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaimAcquireRequest`

Validate State Execution Claim Acquire Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaimAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest;
```

### 调用签名

```text
validateStateExecutionClaimAcquireRequest(input: unknown): StateExecutionClaimAcquireRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimAcquireRequest`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaimAssertionRequest`

Validate State Execution Claim Assertion Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest;
```

### 调用签名

```text
validateStateExecutionClaimAssertionRequest(input: unknown): StateExecutionClaimAssertionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimAssertionRequest`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaimCompleteRequest`

Validate State Execution Claim Complete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaimCompleteRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest;
```

### 调用签名

```text
validateStateExecutionClaimCompleteRequest(input: unknown): StateExecutionClaimCompleteRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimCompleteRequest`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaimReleaseRequest`

Validate State Execution Claim Release Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaimReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest;
```

### 调用签名

```text
validateStateExecutionClaimReleaseRequest(input: unknown): StateExecutionClaimReleaseRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimReleaseRequest`
- 说明: 返回值契约由上述类型定义。

## `validateStateExecutionClaimRenewRequest`

Validate State Execution Claim Renew Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateStateExecutionClaimRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-coordination-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination-schemas.ts)

### 声明

```text
export declare function validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest;
```

### 调用签名

```text
validateStateExecutionClaimRenewRequest(input: unknown): StateExecutionClaimRenewRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimRenewRequest`
- 说明: 返回值契约由上述类型定义。
