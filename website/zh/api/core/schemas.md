# `@codesoul-co/hypha-core` / `schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)
- 导出数: **65**

## 模块用法

用于声明并运行时校验契约。Schemas 模块公开 52 常量、12 函数、1 接口。

### 从包入口导入

```ts
import {
  auditPolicySpecSchema,
  contextSourceSpecJsonSchema,
  contextSourceSpecSchema,
  contextSpecDefinition,
  contextSpecExample,
  contextSpecJsonSchema,
  contextSpecSchema,
  coreSpecDefinitions,
} from '@codesoul-co/hypha-core';

import type {
  SpecSchemaDefinition,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 12 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 52 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { auditPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = auditPolicySpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `auditPolicySpecSchema` | 常量 | <code>const auditPolicySpecSchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; includeInput: z.ZodOptional&lt;z.ZodBoolean&gt;; includeOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; redactPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean &#124; undefined; includeOutput?: boolean &#124; undefined; redactPaths?: string[] &#124; undefined; }, { enabled: boolean; includeInput?: boolean &#124; ...</code> | Audit Policy Spec 的运行时 Schema。 |
| `contextSourceSpecJsonSchema` | 常量 | <code>const contextSourceSpecJsonSchema: JsonSchema</code> | Context Source Spec 的 JSON Schema。 |
| `contextSourceSpecSchema` | 常量 | <code>const contextSourceSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodEnum&lt;["memory", "artifact", "skill", "domain", "mcp", "user_input", ...</code> | Context Source Spec 的运行时 Schema。 |
| `contextSpecDefinition` | 常量 | <code>const contextSpecDefinition: SpecSchemaDefinition&lt;ContextSpec&gt;</code> | Context Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `contextSpecExample` | 常量 | <code>const contextSpecExample: ContextSpec</code> | Context Spec 的有效示例值。 |
| `contextSpecJsonSchema` | 常量 | <code>const contextSpecJsonSchema: JsonSchema</code> | Context Spec 的 JSON Schema。 |
| `contextSpecSchema` | 常量 | <code>const contextSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { sources: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: ...</code> | Context Spec 的运行时 Schema。 |
| `coreSpecDefinitions` | 常量 | <code>const coreSpecDefinitions: readonly [SpecSchemaDefinition&lt;PolicySpec&gt;, SpecSchemaDefinition&lt;OutputContractSpec&gt;, SpecSchemaDefinition&lt;ContextSpec&gt;, SpecSchemaDefinition&lt;TraceSpec&gt;, SpecSchemaDefinition&lt;EvaluationSpec&gt;, SpecSchemaDefinition&lt;ReplaySpec&gt;, SpecSchemaDefinition&lt;RegressionSpec&gt;, SpecSchemaDefinition&lt;DeploymentSpec&gt;, SpecSchemaDefinition&lt;HarnessedAgentSystemSpec&gt;]</code> | 由 `schemas` 模块导出的 Core Spec Definitions 常量。 |
| `coreSpecJsonSchemas` | 常量 | <code>const coreSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `schemas` 模块导出的 Core Spec JSON Schemas 常量。 |
| `deploymentSpecDefinition` | 常量 | <code>const deploymentSpecDefinition: SpecSchemaDefinition&lt;DeploymentSpec&gt;</code> | Deployment Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `deploymentSpecExample` | 常量 | <code>const deploymentSpecExample: DeploymentSpec</code> | Deployment Spec 的有效示例值。 |
| `deploymentSpecJsonSchema` | 常量 | <code>const deploymentSpecJsonSchema: JsonSchema</code> | Deployment Spec 的 JSON Schema。 |
| `deploymentSpecSchema` | 常量 | <code>const deploymentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { mode: z.ZodEnum&lt;["local", "self_hosted", "managed"]&gt;; runtimeMode: z.ZodOptional&lt;z...</code> | Deployment Spec 的运行时 Schema。 |
| `evaluationSpecDefinition` | 常量 | <code>const evaluationSpecDefinition: SpecSchemaDefinition&lt;EvaluationSpec&gt;</code> | Evaluation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `evaluationSpecExample` | 常量 | <code>const evaluationSpecExample: EvaluationSpec</code> | Evaluation Spec 的有效示例值。 |
| `evaluationSpecJsonSchema` | 常量 | <code>const evaluationSpecJsonSchema: { allOf: { if: { properties: { type: { const: string; }; }; }; then: { required: string[]; }; }[]; type?: string; properties?: Record&lt;string, JsonSchema&gt;; required?: string[]; items?: JsonSchema; enum?: unknown[]; additionalProperties?: boolean &#124; JsonSchema; }</code> | Evaluation Spec 的 JSON Schema。 |
| `evaluationSpecSchema` | 常量 | <code>const evaluationSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodEnum&lt;["schema", "output_contract", "tool_trace", "policy",...</code> | Evaluation Spec 的运行时 Schema。 |
| `harnessedAgentSystemSpecDefinition` | 常量 | <code>const harnessedAgentSystemSpecDefinition: SpecSchemaDefinition&lt;HarnessedAgentSystemSpec&gt;</code> | Harnessed Agent System Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `harnessedAgentSystemSpecExample` | 常量 | <code>const harnessedAgentSystemSpecExample: HarnessedAgentSystemSpec</code> | Harnessed Agent System Spec 的有效示例值。 |
| `harnessedAgentSystemSpecJsonSchema` | 常量 | <code>const harnessedAgentSystemSpecJsonSchema: JsonSchema</code> | Harnessed Agent System Spec 的 JSON Schema。 |
| `harnessedAgentSystemSpecSchema` | 常量 | <code>const harnessedAgentSystemSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodStr...</code> | Harnessed Agent System Spec 的运行时 Schema。 |
| `humanReviewPolicySpecSchema` | 常量 | <code>const humanReviewPolicySpecSchema: z.ZodObject&lt;{ required: z.ZodBoolean; reason: z.ZodOptional&lt;z.ZodString&gt;; approverRole: z.ZodOptional&lt;z.ZodString&gt;; timeoutPolicy: z.ZodOptional&lt;z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: numbe...</code> | Human Review Policy Spec 的运行时 Schema。 |
| `jsonSchemaSchema` | 常量 | <code>const jsonSchemaSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;</code> | JSON schema 的运行时 Schema。 |
| `outputContractSpecDefinition` | 常量 | <code>const outputContractSpecDefinition: SpecSchemaDefinition&lt;OutputContractSpec&gt;</code> | Output Contract Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `outputContractSpecExample` | 常量 | <code>const outputContractSpecExample: OutputContractSpec</code> | Output Contract Spec 的有效示例值。 |
| `outputContractSpecJsonSchema` | 常量 | <code>const outputContractSpecJsonSchema: JsonSchema</code> | Output Contract Spec 的 JSON Schema。 |
| `outputContractSpecSchema` | 常量 | <code>const outputContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { schema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodType...</code> | Output Contract Spec 的运行时 Schema。 |
| `policyRuleSpecJsonSchema` | 常量 | <code>const policyRuleSpecJsonSchema: JsonSchema</code> | Policy Rule Spec 的 JSON Schema。 |
| `policyRuleSpecSchema` | 常量 | <code>const policyRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { effect: z.ZodEnum&lt;["allow", "deny", "require_human_review"]&gt;; expression: z.ZodOpt...</code> | Policy Rule Spec 的运行时 Schema。 |
| `policySpecDefinition` | 常量 | <code>const policySpecDefinition: SpecSchemaDefinition&lt;PolicySpec&gt;</code> | Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `policySpecExample` | 常量 | <code>const policySpecExample: PolicySpec</code> | Policy Spec 的有效示例值。 |
| `policySpecJsonSchema` | 常量 | <code>const policySpecJsonSchema: JsonSchema</code> | Policy Spec 的 JSON Schema。 |
| `policySpecSchema` | 常量 | <code>const policySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { rules: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.Z...</code> | Policy Spec 的运行时 Schema。 |
| `regressionSpecDefinition` | 常量 | <code>const regressionSpecDefinition: SpecSchemaDefinition&lt;RegressionSpec&gt;</code> | Regression Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `regressionSpecExample` | 常量 | <code>const regressionSpecExample: RegressionSpec</code> | Regression Spec 的有效示例值。 |
| `regressionSpecJsonSchema` | 常量 | <code>const regressionSpecJsonSchema: JsonSchema</code> | Regression Spec 的 JSON Schema。 |
| `regressionSpecSchema` | 常量 | <code>const regressionSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { fixtureRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.Zo...</code> | Regression Spec 的运行时 Schema。 |
| `replaySpecDefinition` | 常量 | <code>const replaySpecDefinition: SpecSchemaDefinition&lt;ReplaySpec&gt;</code> | Replay Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `replaySpecExample` | 常量 | <code>const replaySpecExample: ReplaySpec</code> | Replay Spec 的有效示例值。 |
| `replaySpecJsonSchema` | 常量 | <code>const replaySpecJsonSchema: JsonSchema</code> | Replay Spec 的 JSON Schema。 |
| `replaySpecSchema` | 常量 | <code>const replaySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { captureModelIO: z.ZodOptional&lt;z.ZodBoolean&gt;; captureToolIO: z.ZodOptional&lt;z.ZodBoolean...</code> | Replay Spec 的运行时 Schema。 |
| `retryPolicySpecSchema` | 常量 | <code>const retryPolicySpecSchema: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoffMs: z.ZodOptional&lt;z.ZodNumber&gt;; maxBackoffMs: z.ZodOptional&lt;z.ZodNumber&gt;; jitterRatio: z.ZodOptional&lt;z.ZodNumber&gt;; maxElapsedMs: z.ZodOptional&lt;z.ZodNumber&gt;; retryableCodes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { maxAttempts: number; backoffMs?: number &#124; undefined; maxBackoffMs?: number &#124; undefined; jitt...</code> | Retry Policy Spec 的运行时 Schema。 |
| `riskLevelSchema` | 常量 | <code>const riskLevelSchema: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;</code> | Risk Level 的运行时 Schema。 |
| `sideEffectLevelSchema` | 常量 | <code>const sideEffectLevelSchema: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;</code> | Side Effect Level 的运行时 Schema。 |
| `specMetadataSchema` | 常量 | <code>const specMetadataSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name?: string &#124; undefined; description?: string &#124; undefined; tags?: string[] &#124; undefined; createdAt?: strin...</code> | Spec Metadata 的运行时 Schema。 |
| `specRefSchema` | 常量 | <code>const specRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }&gt;</code> | Spec Ref 的运行时 Schema。 |
| `timeoutPolicySpecSchema` | 常量 | <code>const timeoutPolicySpecSchema: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;</code> | Timeout Policy Spec 的运行时 Schema。 |
| `traceSpecDefinition` | 常量 | <code>const traceSpecDefinition: SpecSchemaDefinition&lt;TraceSpec&gt;</code> | Trace Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `traceSpecExample` | 常量 | <code>const traceSpecExample: TraceSpec</code> | Trace Spec 的有效示例值。 |
| `traceSpecJsonSchema` | 常量 | <code>const traceSpecJsonSchema: JsonSchema</code> | Trace Spec 的 JSON Schema。 |
| `traceSpecSchema` | 常量 | <code>const traceSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { eventTypes: z.ZodArray&lt;z.ZodString, "many"&gt;; retentionPolicy: z.ZodOptional&lt;z.ZodString...</code> | Trace Spec 的运行时 Schema。 |
| `versionedSpecSchema` | 常量 | <code>const versionedSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; }, { id: string; version: string; }&gt;</code> | Versioned Spec 的运行时 Schema。 |
| `assertSpecSchemaDefinition` | 函数 | <code>assertSpecSchemaDefinition(definition: SpecSchemaDefinition&lt;unknown&gt;): void</code> | Assert Spec Schema Definition 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `defineSpecSchema` | 函数 | <code>defineSpecSchema&lt;TSpec&gt;(definition: { id: string; zod: ZodType&lt;TSpec&gt;; jsonSchema: JsonSchema; example: TSpec; }): SpecSchemaDefinition&lt;TSpec&gt;</code> | Define Spec 的运行时 Schema。 |
| `exportSpecJsonSchemas` | 函数 | <code>exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition&lt;unknown&gt;[]): Record&lt;string, JsonSchema&gt;</code> | Export Spec JSON Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateContextSpec` | 函数 | <code>validateContextSpec(input: unknown): ContextSpec</code> | Validate Context Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateDeploymentSpec` | 函数 | <code>validateDeploymentSpec(input: unknown): DeploymentSpec</code> | Validate Deployment Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateEvaluationSpec` | 函数 | <code>validateEvaluationSpec(input: unknown): EvaluationSpec</code> | Validate Evaluation Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateHarnessedAgentSystemSpec` | 函数 | <code>validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec</code> | Validate Harnessed Agent System Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateOutputContractSpec` | 函数 | <code>validateOutputContractSpec(input: unknown): OutputContractSpec</code> | Validate Output Contract Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validatePolicySpec` | 函数 | <code>validatePolicySpec(input: unknown): PolicySpec</code> | Validate Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRegressionSpec` | 函数 | <code>validateRegressionSpec(input: unknown): RegressionSpec</code> | Validate Regression Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReplaySpec` | 函数 | <code>validateReplaySpec(input: unknown): ReplaySpec</code> | Validate Replay Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateTraceSpec` | 函数 | <code>validateTraceSpec(input: unknown): TraceSpec</code> | Validate Trace Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `SpecSchemaDefinition` | 接口 | <code>interface SpecSchemaDefinition</code> | Spec Schema Definition 接口，共包含 5 个公开字段或方法。 |

## `auditPolicySpecSchema`

Audit Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { auditPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const auditPolicySpecSchema: z.ZodObject<{ enabled: z.ZodBoolean; includeInput: z.ZodOptional<z.ZodBoolean>; includeOutput: z.ZodOptional<z.ZodBoolean>; redactPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }>;
```

## `contextSourceSpecJsonSchema`

Context Source Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { contextSourceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSourceSpecJsonSchema: JsonSchema;
```

## `contextSourceSpecSchema`

Context Source Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextSourceSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSourceSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["memory", "artifact", "skill", "domain", "mcp", "user_input", "system"]>; provenanceRequired: z.ZodOptional<z.ZodBoolean>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>;
```

## `contextSpecDefinition`

Context Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { contextSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSpecDefinition: SpecSchemaDefinition<ContextSpec>;
```

## `contextSpecExample`

Context Spec 的有效示例值。

- 种类: 常量
- 导入: `import { contextSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSpecExample: ContextSpec;
```

## `contextSpecJsonSchema`

Context Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { contextSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSpecJsonSchema: JsonSchema;
```

## `contextSpecSchema`

Context Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { contextSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const contextSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { sources: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["memory", "artifact", "skill", "domain", "mcp", "user_input", "system"]>; provenanceRequired: z.ZodOptional<z.ZodBoolean>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>, "many">; tokenBudget: z.ZodOptional<z.ZodNumber>; provenancePolicy: z.ZodOptional<z.ZodEnum<["required", "best_effort", "none"]>>; instructionBoundaryPolicy: z.ZodOptional<z.ZodEnum<["strict", "tagged", "none"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; sources: { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; tokenBudget?: number | undefined; provenancePolicy?: "required" | "none" | "best_effort" | undefined; instructionBoundaryPolicy?: "strict" | "none" | "tagged" | undefined; }, { id: string; version: string; sources: { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; tokenBudget?: number | undefined; provenancePolicy?: "required" | "none" | "best_effort" | undefined; instructionBoundaryPolicy?: "strict" | "none" | "tagged" | undefined; }>;
```

## `coreSpecDefinitions`

由 `schemas` 模块导出的 Core Spec Definitions 常量。

- 种类: 常量
- 导入: `import { coreSpecDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const coreSpecDefinitions: readonly [SpecSchemaDefinition<PolicySpec>, SpecSchemaDefinition<OutputContractSpec>, SpecSchemaDefinition<ContextSpec>, SpecSchemaDefinition<TraceSpec>, SpecSchemaDefinition<EvaluationSpec>, SpecSchemaDefinition<ReplaySpec>, SpecSchemaDefinition<RegressionSpec>, SpecSchemaDefinition<DeploymentSpec>, SpecSchemaDefinition<HarnessedAgentSystemSpec>];
```

## `coreSpecJsonSchemas`

由 `schemas` 模块导出的 Core Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { coreSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const coreSpecJsonSchemas: Record<string, JsonSchema>;
```

## `deploymentSpecDefinition`

Deployment Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { deploymentSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const deploymentSpecDefinition: SpecSchemaDefinition<DeploymentSpec>;
```

## `deploymentSpecExample`

Deployment Spec 的有效示例值。

- 种类: 常量
- 导入: `import { deploymentSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const deploymentSpecExample: DeploymentSpec;
```

## `deploymentSpecJsonSchema`

Deployment Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { deploymentSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const deploymentSpecJsonSchema: JsonSchema;
```

## `deploymentSpecSchema`

Deployment Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { deploymentSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const deploymentSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { mode: z.ZodEnum<["local", "self_hosted", "managed"]>; runtimeMode: z.ZodOptional<z.ZodEnum<["single-user", "multi-user"]>>; configRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; mode: "managed" | "local" | "self_hosted"; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; runtimeMode?: "single-user" | "multi-user" | undefined; configRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }, { id: string; version: string; mode: "managed" | "local" | "self_hosted"; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; runtimeMode?: "single-user" | "multi-user" | undefined; configRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }>;
```

## `evaluationSpecDefinition`

Evaluation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { evaluationSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const evaluationSpecDefinition: SpecSchemaDefinition<EvaluationSpec>;
```

## `evaluationSpecExample`

Evaluation Spec 的有效示例值。

- 种类: 常量
- 导入: `import { evaluationSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const evaluationSpecExample: EvaluationSpec;
```

## `evaluationSpecJsonSchema`

Evaluation Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { evaluationSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const evaluationSpecJsonSchema: { allOf: { if: { properties: { type: { const: string; }; }; }; then: { required: string[]; }; }[]; type?: string; properties?: Record<string, JsonSchema>; required?: string[]; items?: JsonSchema; enum?: unknown[]; additionalProperties?: boolean | JsonSchema; };
```

## `evaluationSpecSchema`

Evaluation Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { evaluationSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const evaluationSpecSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["schema", "output_contract", "tool_trace", "policy", "process", "cost", "latency", "regression", "human"]>; rubric: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; deterministic: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }>, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }>;
```

## `harnessedAgentSystemSpecDefinition`

Harnessed Agent System Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const harnessedAgentSystemSpecDefinition: SpecSchemaDefinition<HarnessedAgentSystemSpec>;
```

## `harnessedAgentSystemSpecExample`

Harnessed Agent System Spec 的有效示例值。

- 种类: 常量
- 导入: `import { harnessedAgentSystemSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const harnessedAgentSystemSpecExample: HarnessedAgentSystemSpec;
```

## `harnessedAgentSystemSpecJsonSchema`

Harnessed Agent System Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { harnessedAgentSystemSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const harnessedAgentSystemSpecJsonSchema: JsonSchema;
```

## `harnessedAgentSystemSpecSchema`

Harnessed Agent System Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { harnessedAgentSystemSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const harnessedAgentSystemSpecSchema: (typeof import('@codesoul-co/hypha-core'))['harnessedAgentSystemSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `humanReviewPolicySpecSchema`

Human Review Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { humanReviewPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const humanReviewPolicySpecSchema: z.ZodObject<{ required: z.ZodBoolean; reason: z.ZodOptional<z.ZodString>; approverRole: z.ZodOptional<z.ZodString>; timeoutPolicy: z.ZodOptional<z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>>; }, "strip", z.ZodTypeAny, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }>;
```

## `jsonSchemaSchema`

JSON schema 的运行时 Schema。

- 种类: 常量
- 导入: `import { jsonSchemaSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const jsonSchemaSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>;
```

## `outputContractSpecDefinition`

Output Contract Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { outputContractSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const outputContractSpecDefinition: SpecSchemaDefinition<OutputContractSpec>;
```

## `outputContractSpecExample`

Output Contract Spec 的有效示例值。

- 种类: 常量
- 导入: `import { outputContractSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const outputContractSpecExample: OutputContractSpec;
```

## `outputContractSpecJsonSchema`

Output Contract Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { outputContractSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const outputContractSpecJsonSchema: JsonSchema;
```

## `outputContractSpecSchema`

Output Contract Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { outputContractSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const outputContractSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { schema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; }, "strip", z.ZodTypeAny, { id: string; schema: JsonSchema; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { id: string; schema: JsonSchema; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `policyRuleSpecJsonSchema`

Policy Rule Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { policyRuleSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policyRuleSpecJsonSchema: JsonSchema;
```

## `policyRuleSpecSchema`

Policy Rule Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { policyRuleSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policyRuleSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { effect: z.ZodEnum<["allow", "deny", "require_human_review"]>; expression: z.ZodOptional<z.ZodString>; sideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }>;
```

## `policySpecDefinition`

Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { policySpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policySpecDefinition: SpecSchemaDefinition<PolicySpec>;
```

## `policySpecExample`

Policy Spec 的有效示例值。

- 种类: 常量
- 导入: `import { policySpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policySpecExample: PolicySpec;
```

## `policySpecJsonSchema`

Policy Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { policySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policySpecJsonSchema: JsonSchema;
```

## `policySpecSchema`

Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { policySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const policySpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { rules: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { effect: z.ZodEnum<["allow", "deny", "require_human_review"]>; expression: z.ZodOptional<z.ZodString>; sideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }>, "many">; defaultEffect: z.ZodOptional<z.ZodEnum<["allow", "deny"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; rules: { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; defaultEffect?: "allow" | "deny" | undefined; }, { id: string; version: string; rules: { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; defaultEffect?: "allow" | "deny" | undefined; }>;
```

## `regressionSpecDefinition`

Regression Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { regressionSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const regressionSpecDefinition: SpecSchemaDefinition<RegressionSpec>;
```

## `regressionSpecExample`

Regression Spec 的有效示例值。

- 种类: 常量
- 导入: `import { regressionSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const regressionSpecExample: RegressionSpec;
```

## `regressionSpecJsonSchema`

Regression Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { regressionSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const regressionSpecJsonSchema: JsonSchema;
```

## `regressionSpecSchema`

Regression Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { regressionSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const regressionSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { fixtureRefs: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">; requiredChecks: z.ZodArray<z.ZodEnum<["event_types", "state_path", "tool_calls", "policy_decisions", "output_contract"]>, "many">; }, "strip", z.ZodTypeAny, { id: string; version: string; fixtureRefs: { id: string; revision?: string | undefined; version?: string | undefined; }[]; requiredChecks: ("output_contract" | "state_path" | "event_types" | "tool_calls" | "policy_decisions")[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { id: string; version: string; fixtureRefs: { id: string; revision?: string | undefined; version?: string | undefined; }[]; requiredChecks: ("output_contract" | "state_path" | "event_types" | "tool_calls" | "policy_decisions")[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `replaySpecDefinition`

Replay Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { replaySpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const replaySpecDefinition: SpecSchemaDefinition<ReplaySpec>;
```

## `replaySpecExample`

Replay Spec 的有效示例值。

- 种类: 常量
- 导入: `import { replaySpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const replaySpecExample: ReplaySpec;
```

## `replaySpecJsonSchema`

Replay Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { replaySpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const replaySpecJsonSchema: JsonSchema;
```

## `replaySpecSchema`

Replay Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { replaySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const replaySpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { captureModelIO: z.ZodOptional<z.ZodBoolean>; captureToolIO: z.ZodOptional<z.ZodBoolean>; captureMemoryReadSet: z.ZodOptional<z.ZodBoolean>; capturePolicyDecisions: z.ZodOptional<z.ZodBoolean>; snapshotPolicy: z.ZodOptional<z.ZodEnum<["none", "state_path", "full"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; captureModelIO?: boolean | undefined; captureToolIO?: boolean | undefined; captureMemoryReadSet?: boolean | undefined; capturePolicyDecisions?: boolean | undefined; snapshotPolicy?: "none" | "full" | "state_path" | undefined; }, { id: string; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; captureModelIO?: boolean | undefined; captureToolIO?: boolean | undefined; captureMemoryReadSet?: boolean | undefined; capturePolicyDecisions?: boolean | undefined; snapshotPolicy?: "none" | "full" | "state_path" | undefined; }>;
```

## `retryPolicySpecSchema`

Retry Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { retryPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const retryPolicySpecSchema: z.ZodObject<{ maxAttempts: z.ZodNumber; backoffMs: z.ZodOptional<z.ZodNumber>; maxBackoffMs: z.ZodOptional<z.ZodNumber>; jitterRatio: z.ZodOptional<z.ZodNumber>; maxElapsedMs: z.ZodOptional<z.ZodNumber>; retryableCodes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { maxAttempts: number; backoffMs?: number | undefined; maxBackoffMs?: number | undefined; jitterRatio?: number | undefined; maxElapsedMs?: number | undefined; retryableCodes?: string[] | undefined; }, { maxAttempts: number; backoffMs?: number | undefined; maxBackoffMs?: number | undefined; jitterRatio?: number | undefined; maxElapsedMs?: number | undefined; retryableCodes?: string[] | undefined; }>;
```

## `riskLevelSchema`

Risk Level 的运行时 Schema。

- 种类: 常量
- 导入: `import { riskLevelSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const riskLevelSchema: z.ZodEnum<["low", "medium", "high", "critical"]>;
```

## `sideEffectLevelSchema`

Side Effect Level 的运行时 Schema。

- 种类: 常量
- 导入: `import { sideEffectLevelSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const sideEffectLevelSchema: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>;
```

## `specMetadataSchema`

Spec Metadata 的运行时 Schema。

- 种类: 常量
- 导入: `import { specMetadataSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const specMetadataSchema: z.ZodObject<{ name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `specRefSchema`

Spec Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { specRefSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const specRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>;
```

## `timeoutPolicySpecSchema`

Timeout Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { timeoutPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const timeoutPolicySpecSchema: z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>;
```

## `traceSpecDefinition`

Trace Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { traceSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const traceSpecDefinition: SpecSchemaDefinition<TraceSpec>;
```

## `traceSpecExample`

Trace Spec 的有效示例值。

- 种类: 常量
- 导入: `import { traceSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const traceSpecExample: TraceSpec;
```

## `traceSpecJsonSchema`

Trace Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { traceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const traceSpecJsonSchema: JsonSchema;
```

## `traceSpecSchema`

Trace Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { traceSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const traceSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { eventTypes: z.ZodArray<z.ZodString, "many">; retentionPolicy: z.ZodOptional<z.ZodString>; redactionPolicy: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version: string; eventTypes: string[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; retentionPolicy?: string | undefined; redactionPolicy?: string | undefined; }, { id: string; version: string; eventTypes: string[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; retentionPolicy?: string | undefined; redactionPolicy?: string | undefined; }>;
```

## `versionedSpecSchema`

Versioned Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { versionedSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare const versionedSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; }, { id: string; version: string; }>;
```

## `assertSpecSchemaDefinition`

Assert Spec Schema Definition 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertSpecSchemaDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function assertSpecSchemaDefinition(definition: SpecSchemaDefinition<unknown>): void;
```

### 调用签名

```text
assertSpecSchemaDefinition(definition: SpecSchemaDefinition<unknown>): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `definition` | <code>SpecSchemaDefinition&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `defineSpecSchema`

Define Spec 的运行时 Schema。

- 种类: 函数
- 导入: `import { defineSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function defineSpecSchema<TSpec>(definition: {
    id: string;
    zod: ZodType<TSpec>;
    jsonSchema: JsonSchema;
    example: TSpec;
}): SpecSchemaDefinition<TSpec>;
```

### 调用签名

```text
defineSpecSchema<TSpec>(definition: { id: string; zod: ZodType<TSpec>; jsonSchema: JsonSchema; example: TSpec; }): SpecSchemaDefinition<TSpec>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `definition` | <code>{ id: string; zod: ZodType&lt;TSpec&gt;; jsonSchema: JsonSchema; example: TSpec; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SpecSchemaDefinition<TSpec>`
- 说明: 返回值契约由上述类型定义。

## `exportSpecJsonSchemas`

Export Spec JSON Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { exportSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition<unknown>[]): Record<string, JsonSchema>;
```

### 调用签名

```text
exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition<unknown>[]): Record<string, JsonSchema>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `definitions` | <code>readonly SpecSchemaDefinition&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, JsonSchema>`
- 说明: 返回值契约由上述类型定义。

## `validateContextSpec`

Validate Context Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContextSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateContextSpec(input: unknown): ContextSpec;
```

### 调用签名

```text
validateContextSpec(input: unknown): ContextSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ContextSpec`
- 说明: 返回值契约由上述类型定义。

## `validateDeploymentSpec`

Validate Deployment Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateDeploymentSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateDeploymentSpec(input: unknown): DeploymentSpec;
```

### 调用签名

```text
validateDeploymentSpec(input: unknown): DeploymentSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DeploymentSpec`
- 说明: 返回值契约由上述类型定义。

## `validateEvaluationSpec`

Validate Evaluation Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateEvaluationSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateEvaluationSpec(input: unknown): EvaluationSpec;
```

### 调用签名

```text
validateEvaluationSpec(input: unknown): EvaluationSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `EvaluationSpec`
- 说明: 返回值契约由上述类型定义。

## `validateHarnessedAgentSystemSpec`

Validate Harnessed Agent System Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateHarnessedAgentSystemSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec;
```

### 调用签名

```text
validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `HarnessedAgentSystemSpec`
- 说明: 返回值契约由上述类型定义。

## `validateOutputContractSpec`

Validate Output Contract Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateOutputContractSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateOutputContractSpec(input: unknown): OutputContractSpec;
```

### 调用签名

```text
validateOutputContractSpec(input: unknown): OutputContractSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `OutputContractSpec`
- 说明: 返回值契约由上述类型定义。

## `validatePolicySpec`

Validate Policy Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validatePolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validatePolicySpec(input: unknown): PolicySpec;
```

### 调用签名

```text
validatePolicySpec(input: unknown): PolicySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PolicySpec`
- 说明: 返回值契约由上述类型定义。

## `validateRegressionSpec`

Validate Regression Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRegressionSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateRegressionSpec(input: unknown): RegressionSpec;
```

### 调用签名

```text
validateRegressionSpec(input: unknown): RegressionSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RegressionSpec`
- 说明: 返回值契约由上述类型定义。

## `validateReplaySpec`

Validate Replay Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReplaySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateReplaySpec(input: unknown): ReplaySpec;
```

### 调用签名

```text
validateReplaySpec(input: unknown): ReplaySpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReplaySpec`
- 说明: 返回值契约由上述类型定义。

## `validateTraceSpec`

Validate Trace Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateTraceSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export declare function validateTraceSpec(input: unknown): TraceSpec;
```

### 调用签名

```text
validateTraceSpec(input: unknown): TraceSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TraceSpec`
- 说明: 返回值契约由上述类型定义。

## `SpecSchemaDefinition`

Spec Schema Definition 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SpecSchemaDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### 声明

```text
export interface SpecSchemaDefinition<TSpec> {
    id: string;
    zod: ZodType<TSpec>;
    jsonSchema: JsonSchema;
    example: TSpec;
    parse(input: unknown): TSpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `example` | 属性 | <code>example: TSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jsonSchema` | 属性 | <code>jsonSchema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parse` | 方法 | <code>parse(input: unknown): TSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `zod` | 属性 | <code>zod: z.ZodType&lt;TSpec, z.ZodTypeDef, TSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
