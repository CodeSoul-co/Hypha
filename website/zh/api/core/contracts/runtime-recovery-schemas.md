# `@codesoul-co/hypha-core` / `contracts/runtime-recovery-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-recovery-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)
- 导出数: **36**

## 模块用法

用于声明并运行时校验契约。Runtime recovery schemas 模块公开 29 常量、7 函数。

### 从包入口导入

```ts
import {
  runtimeActivityCompensationResultDefinition,
  runtimeActivityCompensationResultExample,
  runtimeActivityCompensationResultSchema,
  runtimeActivityReconciliationResultDefinition,
  runtimeActivityReconciliationResultExample,
  runtimeActivityReconciliationResultJsonSchema,
  runtimeActivityReconciliationResultSchema,
  runtimeRecoveryCandidateDefinition,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 7 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 29 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeActivityCompensationResultSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeActivityCompensationResultSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeActivityCompensationResultDefinition` | 常量 | <code>const runtimeActivityCompensationResultDefinition: SpecSchemaDefinition&lt;RuntimeActivityCompensationResult&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Activity Compensation Result Definition 常量。 |
| `runtimeActivityCompensationResultExample` | 常量 | <code>const runtimeActivityCompensationResultExample: RuntimeActivityCompensationResult</code> | Runtime Activity Compensation Result 的有效示例值。 |
| `runtimeActivityCompensationResultSchema` | 常量 | <code>const runtimeActivityCompensationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "requires_review"]&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; receiptId: z.ZodOptional&lt;z.ZodString&gt;; errorCode: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { status: "failed" &#124; "completed" &#124; "requires_review"; activityId: string; providerRevision?: string &#124; un...</code> | Runtime Activity Compensation Result 的运行时 Schema。 |
| `runtimeActivityReconciliationResultDefinition` | 常量 | <code>const runtimeActivityReconciliationResultDefinition: SpecSchemaDefinition&lt;RuntimeActivityReconciliationResult&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Activity Reconciliation Result Definition 常量。 |
| `runtimeActivityReconciliationResultExample` | 常量 | <code>const runtimeActivityReconciliationResultExample: RuntimeActivityReconciliationResult</code> | Runtime Activity Reconciliation Result 的有效示例值。 |
| `runtimeActivityReconciliationResultJsonSchema` | 常量 | <code>const runtimeActivityReconciliationResultJsonSchema: JsonSchema</code> | Runtime Activity Reconciliation Result 的 JSON Schema。 |
| `runtimeActivityReconciliationResultSchema` | 常量 | <code>const runtimeActivityReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]&gt;; observation: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;...</code> | Runtime Activity Reconciliation Result 的运行时 Schema。 |
| `runtimeRecoveryCandidateDefinition` | 常量 | <code>const runtimeRecoveryCandidateDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryCandidate&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Candidate Definition 常量。 |
| `runtimeRecoveryCandidateExample` | 常量 | <code>const runtimeRecoveryCandidateExample: RuntimeRecoveryCandidate</code> | Runtime Recovery Candidate 的有效示例值。 |
| `runtimeRecoveryCandidateJsonSchema` | 常量 | <code>const runtimeRecoveryCandidateJsonSchema: JsonSchema</code> | Runtime Recovery Candidate 的 JSON Schema。 |
| `runtimeRecoveryCandidateSchema` | 常量 | <code>const runtimeRecoveryCandidateSchema: z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJ...</code> | Runtime Recovery Candidate 的运行时 Schema。 |
| `runtimeRecoveryCommandDefinition` | 常量 | <code>const runtimeRecoveryCommandDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryCommand&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Command Definition 常量。 |
| `runtimeRecoveryCommandExample` | 常量 | <code>const runtimeRecoveryCommandExample: RuntimeRecoveryCommand</code> | Runtime Recovery Command 的有效示例值。 |
| `runtimeRecoveryCommandJsonSchema` | 常量 | <code>const runtimeRecoveryCommandJsonSchema: JsonSchema</code> | Runtime Recovery Command 的 JSON Schema。 |
| `runtimeRecoveryCommandSchema` | 常量 | <code>const runtimeRecoveryCommandSchema: z.ZodObject&lt;{ candidate: z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_EXPIRED", "STAT...</code> | Runtime Recovery Command 的运行时 Schema。 |
| `runtimeRecoveryContractDefinitions` | 常量 | <code>const runtimeRecoveryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeRecoveryCandidate&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryScanRequest&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryScanResult&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryCommand&gt;, SpecSchemaDefinition&lt;RuntimeRecoveryResult&gt;, SpecSchemaDefinition&lt;RuntimeActivityReconciliationResult&gt;, SpecSchemaDefinition&lt;RuntimeActivityCompensationResult&gt;]</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Contract Definitions 常量。 |
| `runtimeRecoveryContractJsonSchemas` | 常量 | <code>const runtimeRecoveryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Contract JSON Schemas 常量。 |
| `runtimeRecoveryResultDefinition` | 常量 | <code>const runtimeRecoveryResultDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryResult&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Result Definition 常量。 |
| `runtimeRecoveryResultExample` | 常量 | <code>const runtimeRecoveryResultExample: RuntimeRecoveryResult</code> | Runtime Recovery Result 的有效示例值。 |
| `runtimeRecoveryResultJsonSchema` | 常量 | <code>const runtimeRecoveryResultJsonSchema: JsonSchema</code> | Runtime Recovery Result 的 JSON Schema。 |
| `runtimeRecoveryResultSchema` | 常量 | <code>const runtimeRecoveryResultSchema: z.ZodObject&lt;{ candidateId: z.ZodString; disposition: z.ZodEnum&lt;["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; projection: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./runt...</code> | Runtime Recovery Result 的运行时 Schema。 |
| `runtimeRecoveryScanRequestDefinition` | 常量 | <code>const runtimeRecoveryScanRequestDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryScanRequest&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Scan Request Definition 常量。 |
| `runtimeRecoveryScanRequestExample` | 常量 | <code>const runtimeRecoveryScanRequestExample: RuntimeRecoveryScanRequest</code> | Runtime Recovery Scan Request 的有效示例值。 |
| `runtimeRecoveryScanRequestJsonSchema` | 常量 | <code>const runtimeRecoveryScanRequestJsonSchema: JsonSchema</code> | Runtime Recovery Scan Request 的 JSON Schema。 |
| `runtimeRecoveryScanRequestSchema` | 常量 | <code>const runtimeRecoveryScanRequestSchema: z.ZodObject&lt;{ checkedAt: z.ZodString; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { limit: number; checkedAt: string; cursor?: string &#124; undefined; }, { limit: number; checkedAt: string; cursor?: string &#124; undefined; }&gt;</code> | Runtime Recovery Scan Request 的运行时 Schema。 |
| `runtimeRecoveryScanResultDefinition` | 常量 | <code>const runtimeRecoveryScanResultDefinition: SpecSchemaDefinition&lt;RuntimeRecoveryScanResult&gt;</code> | 由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Scan Result Definition 常量。 |
| `runtimeRecoveryScanResultExample` | 常量 | <code>const runtimeRecoveryScanResultExample: RuntimeRecoveryScanResult</code> | Runtime Recovery Scan Result 的有效示例值。 |
| `runtimeRecoveryScanResultJsonSchema` | 常量 | <code>const runtimeRecoveryScanResultJsonSchema: JsonSchema</code> | Runtime Recovery Scan Result 的 JSON Schema。 |
| `runtimeRecoveryScanResultSchema` | 常量 | <code>const runtimeRecoveryScanResultSchema: z.ZodObject&lt;{ candidates: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ candidateId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { runId: string; userId: string; tenantId?: string &#124; undefined; }, { runId: string; userId: string; tenantId?: string &#124; undefined; }&gt;; reason: z.ZodEnum&lt;["LEASE_...</code> | Runtime Recovery Scan Result 的运行时 Schema。 |
| `validateRuntimeActivityCompensationResult` | 函数 | <code>validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult</code> | Validate Runtime Activity Compensation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeActivityReconciliationResult` | 函数 | <code>validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult</code> | Validate Runtime Activity Reconciliation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRecoveryCandidate` | 函数 | <code>validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate</code> | Validate Runtime Recovery Candidate 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRecoveryCommand` | 函数 | <code>validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand</code> | Validate Runtime Recovery Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRecoveryResult` | 函数 | <code>validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult</code> | Validate Runtime Recovery Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRecoveryScanRequest` | 函数 | <code>validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest</code> | Validate Runtime Recovery Scan Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeRecoveryScanResult` | 函数 | <code>validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult</code> | Validate Runtime Recovery Scan Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeActivityCompensationResultDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Activity Compensation Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeActivityCompensationResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityCompensationResultDefinition: SpecSchemaDefinition<RuntimeActivityCompensationResult>;
```

## `runtimeActivityCompensationResultExample`

Runtime Activity Compensation Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeActivityCompensationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityCompensationResultExample: RuntimeActivityCompensationResult;
```

## `runtimeActivityCompensationResultSchema`

Runtime Activity Compensation Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityCompensationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityCompensationResultSchema: z.ZodEffects<z.ZodObject<{ activityId: z.ZodString; status: z.ZodEnum<["completed", "failed", "requires_review"]>; providerRevision: z.ZodOptional<z.ZodString>; receiptId: z.ZodOptional<z.ZodString>; errorCode: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }>, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }, { status: "failed" | "completed" | "requires_review"; activityId: string; providerRevision?: string | undefined; receiptId?: string | undefined; errorCode?: string | undefined; }>;
```

## `runtimeActivityReconciliationResultDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Activity Reconciliation Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeActivityReconciliationResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityReconciliationResultDefinition: SpecSchemaDefinition<RuntimeActivityReconciliationResult>;
```

## `runtimeActivityReconciliationResultExample`

Runtime Activity Reconciliation Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeActivityReconciliationResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityReconciliationResultExample: RuntimeActivityReconciliationResult;
```

## `runtimeActivityReconciliationResultJsonSchema`

Runtime Activity Reconciliation Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeActivityReconciliationResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeActivityReconciliationResultJsonSchema: JsonSchema;
```

## `runtimeActivityReconciliationResultSchema`

Runtime Activity Reconciliation Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeActivityReconciliationResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeActivityReconciliationResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeActivityReconciliationResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRecoveryCandidateDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Candidate Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryCandidateDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCandidateDefinition: SpecSchemaDefinition<RuntimeRecoveryCandidate>;
```

## `runtimeRecoveryCandidateExample`

Runtime Recovery Candidate 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRecoveryCandidateExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCandidateExample: RuntimeRecoveryCandidate;
```

## `runtimeRecoveryCandidateJsonSchema`

Runtime Recovery Candidate 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryCandidateJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCandidateJsonSchema: JsonSchema;
```

## `runtimeRecoveryCandidateSchema`

Runtime Recovery Candidate 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryCandidateSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRecoveryCandidateSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryCandidateSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRecoveryCommandDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Command Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryCommandDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCommandDefinition: SpecSchemaDefinition<RuntimeRecoveryCommand>;
```

## `runtimeRecoveryCommandExample`

Runtime Recovery Command 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRecoveryCommandExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCommandExample: RuntimeRecoveryCommand;
```

## `runtimeRecoveryCommandJsonSchema`

Runtime Recovery Command 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryCommandJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryCommandJsonSchema: JsonSchema;
```

## `runtimeRecoveryCommandSchema`

Runtime Recovery Command 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryCommandSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRecoveryCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryCommandSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRecoveryContractDefinitions`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryContractDefinitions: readonly [SpecSchemaDefinition<RuntimeRecoveryCandidate>, SpecSchemaDefinition<RuntimeRecoveryScanRequest>, SpecSchemaDefinition<RuntimeRecoveryScanResult>, SpecSchemaDefinition<RuntimeRecoveryCommand>, SpecSchemaDefinition<RuntimeRecoveryResult>, SpecSchemaDefinition<RuntimeActivityReconciliationResult>, SpecSchemaDefinition<RuntimeActivityCompensationResult>];
```

## `runtimeRecoveryContractJsonSchemas`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeRecoveryResultDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryResultDefinition: SpecSchemaDefinition<RuntimeRecoveryResult>;
```

## `runtimeRecoveryResultExample`

Runtime Recovery Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRecoveryResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryResultExample: RuntimeRecoveryResult;
```

## `runtimeRecoveryResultJsonSchema`

Runtime Recovery Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryResultJsonSchema: JsonSchema;
```

## `runtimeRecoveryResultSchema`

Runtime Recovery Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRecoveryResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `runtimeRecoveryScanRequestDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Scan Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanRequestDefinition: SpecSchemaDefinition<RuntimeRecoveryScanRequest>;
```

## `runtimeRecoveryScanRequestExample`

Runtime Recovery Scan Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanRequestExample: RuntimeRecoveryScanRequest;
```

## `runtimeRecoveryScanRequestJsonSchema`

Runtime Recovery Scan Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanRequestJsonSchema: JsonSchema;
```

## `runtimeRecoveryScanRequestSchema`

Runtime Recovery Scan Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanRequestSchema: z.ZodObject<{ checkedAt: z.ZodString; limit: z.ZodNumber; cursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { limit: number; checkedAt: string; cursor?: string | undefined; }, { limit: number; checkedAt: string; cursor?: string | undefined; }>;
```

## `runtimeRecoveryScanResultDefinition`

由 `contracts/runtime-recovery-schemas` 模块导出的 Runtime Recovery Scan Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanResultDefinition: SpecSchemaDefinition<RuntimeRecoveryScanResult>;
```

## `runtimeRecoveryScanResultExample`

Runtime Recovery Scan Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanResultExample: RuntimeRecoveryScanResult;
```

## `runtimeRecoveryScanResultJsonSchema`

Runtime Recovery Scan Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare const runtimeRecoveryScanResultJsonSchema: JsonSchema;
```

## `runtimeRecoveryScanResultSchema`

Runtime Recovery Scan Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeRecoveryScanResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const runtimeRecoveryScanResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRecoveryScanResultSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `validateRuntimeActivityCompensationResult`

Validate Runtime Activity Compensation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityCompensationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult;
```

### 调用签名

```text
validateRuntimeActivityCompensationResult(input: unknown): RuntimeActivityCompensationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityCompensationResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeActivityReconciliationResult`

Validate Runtime Activity Reconciliation Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeActivityReconciliationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult;
```

### 调用签名

```text
validateRuntimeActivityReconciliationResult(input: unknown): RuntimeActivityReconciliationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeActivityReconciliationResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRecoveryCandidate`

Validate Runtime Recovery Candidate 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRecoveryCandidate } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate;
```

### 调用签名

```text
validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRecoveryCandidate`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRecoveryCommand`

Validate Runtime Recovery Command 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRecoveryCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand;
```

### 调用签名

```text
validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRecoveryCommand`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRecoveryResult`

Validate Runtime Recovery Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRecoveryResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult;
```

### 调用签名

```text
validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRecoveryResult`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRecoveryScanRequest`

Validate Runtime Recovery Scan Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRecoveryScanRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest;
```

### 调用签名

```text
validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRecoveryScanRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeRecoveryScanResult`

Validate Runtime Recovery Scan Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeRecoveryScanResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery-schemas.ts)

### 声明

```text
export declare function validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult;
```

### 调用签名

```text
validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeRecoveryScanResult`
- 说明: 返回值契约由上述类型定义。
