# `@codesoul-co/hypha-core` / `schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)
- Exports: **65**

## Using this module

Use the Schemas module for declaring and runtime-validating contracts. It exports 52 constants, 12 functions, 1 interface.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 12 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 52 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { auditPolicySpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = auditPolicySpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `auditPolicySpecSchema` | constant | <code>const auditPolicySpecSchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; includeInput: z.ZodOptional&lt;z.ZodBoolean&gt;; includeOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; redactPaths: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean &#124; undefined; includeOutput?: boolean &#124; undefined; redactPaths?: string[] &#124; undefined; }, { enabled: boolean; includeInput?: boolean &#124; ...</code> | Runtime schema for Audit Policy Spec. |
| `contextSourceSpecJsonSchema` | constant | <code>const contextSourceSpecJsonSchema: JsonSchema</code> | JSON Schema for Context Source Spec. |
| `contextSourceSpecSchema` | constant | <code>const contextSourceSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodEnum&lt;["memory", "artifact", "skill", "domain", "mcp", "user_input", ...</code> | Runtime schema for Context Source Spec. |
| `contextSpecDefinition` | constant | <code>const contextSpecDefinition: SpecSchemaDefinition&lt;ContextSpec&gt;</code> | Runtime validation entrypoint for the Context spec, combining its parser, example and JSON Schema. |
| `contextSpecExample` | constant | <code>const contextSpecExample: ContextSpec</code> | Valid example value for Context Spec. |
| `contextSpecJsonSchema` | constant | <code>const contextSpecJsonSchema: JsonSchema</code> | JSON Schema for Context Spec. |
| `contextSpecSchema` | constant | <code>const contextSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { sources: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: ...</code> | Runtime schema for Context Spec. |
| `coreSpecDefinitions` | constant | <code>const coreSpecDefinitions: readonly [SpecSchemaDefinition&lt;PolicySpec&gt;, SpecSchemaDefinition&lt;OutputContractSpec&gt;, SpecSchemaDefinition&lt;ContextSpec&gt;, SpecSchemaDefinition&lt;TraceSpec&gt;, SpecSchemaDefinition&lt;EvaluationSpec&gt;, SpecSchemaDefinition&lt;ReplaySpec&gt;, SpecSchemaDefinition&lt;RegressionSpec&gt;, SpecSchemaDefinition&lt;DeploymentSpec&gt;, SpecSchemaDefinition&lt;HarnessedAgentSystemSpec&gt;]</code> | Core Spec Definitions constant exported by the `schemas` module. |
| `coreSpecJsonSchemas` | constant | <code>const coreSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Core Spec JSON Schemas constant exported by the `schemas` module. |
| `deploymentSpecDefinition` | constant | <code>const deploymentSpecDefinition: SpecSchemaDefinition&lt;DeploymentSpec&gt;</code> | Runtime validation entrypoint for the Deployment spec, combining its parser, example and JSON Schema. |
| `deploymentSpecExample` | constant | <code>const deploymentSpecExample: DeploymentSpec</code> | Valid example value for Deployment Spec. |
| `deploymentSpecJsonSchema` | constant | <code>const deploymentSpecJsonSchema: JsonSchema</code> | JSON Schema for Deployment Spec. |
| `deploymentSpecSchema` | constant | <code>const deploymentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { mode: z.ZodEnum&lt;["local", "self_hosted", "managed"]&gt;; runtimeMode: z.ZodOptional&lt;z...</code> | Runtime schema for Deployment Spec. |
| `evaluationSpecDefinition` | constant | <code>const evaluationSpecDefinition: SpecSchemaDefinition&lt;EvaluationSpec&gt;</code> | Runtime validation entrypoint for the Evaluation spec, combining its parser, example and JSON Schema. |
| `evaluationSpecExample` | constant | <code>const evaluationSpecExample: EvaluationSpec</code> | Valid example value for Evaluation Spec. |
| `evaluationSpecJsonSchema` | constant | <code>const evaluationSpecJsonSchema: { allOf: { if: { properties: { type: { const: string; }; }; }; then: { required: string[]; }; }[]; type?: string; properties?: Record&lt;string, JsonSchema&gt;; required?: string[]; items?: JsonSchema; enum?: unknown[]; additionalProperties?: boolean &#124; JsonSchema; }</code> | JSON Schema for Evaluation Spec. |
| `evaluationSpecSchema` | constant | <code>const evaluationSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodEnum&lt;["schema", "output_contract", "tool_trace", "policy",...</code> | Runtime schema for Evaluation Spec. |
| `harnessedAgentSystemSpecDefinition` | constant | <code>const harnessedAgentSystemSpecDefinition: SpecSchemaDefinition&lt;HarnessedAgentSystemSpec&gt;</code> | Runtime validation entrypoint for the Harnessed Agent System spec, combining its parser, example and JSON Schema. |
| `harnessedAgentSystemSpecExample` | constant | <code>const harnessedAgentSystemSpecExample: HarnessedAgentSystemSpec</code> | Valid example value for Harnessed Agent System Spec. |
| `harnessedAgentSystemSpecJsonSchema` | constant | <code>const harnessedAgentSystemSpecJsonSchema: JsonSchema</code> | JSON Schema for Harnessed Agent System Spec. |
| `harnessedAgentSystemSpecSchema` | constant | <code>const harnessedAgentSystemSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodStr...</code> | Runtime schema for Harnessed Agent System Spec. |
| `humanReviewPolicySpecSchema` | constant | <code>const humanReviewPolicySpecSchema: z.ZodObject&lt;{ required: z.ZodBoolean; reason: z.ZodOptional&lt;z.ZodString&gt;; approverRole: z.ZodOptional&lt;z.ZodString&gt;; timeoutPolicy: z.ZodOptional&lt;z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: numbe...</code> | Runtime schema for Human Review Policy Spec. |
| `jsonSchemaSchema` | constant | <code>const jsonSchemaSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;</code> | Runtime schema for JSON schema. |
| `outputContractSpecDefinition` | constant | <code>const outputContractSpecDefinition: SpecSchemaDefinition&lt;OutputContractSpec&gt;</code> | Runtime validation entrypoint for the Output Contract spec, combining its parser, example and JSON Schema. |
| `outputContractSpecExample` | constant | <code>const outputContractSpecExample: OutputContractSpec</code> | Valid example value for Output Contract Spec. |
| `outputContractSpecJsonSchema` | constant | <code>const outputContractSpecJsonSchema: JsonSchema</code> | JSON Schema for Output Contract Spec. |
| `outputContractSpecSchema` | constant | <code>const outputContractSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { schema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodType...</code> | Runtime schema for Output Contract Spec. |
| `policyRuleSpecJsonSchema` | constant | <code>const policyRuleSpecJsonSchema: JsonSchema</code> | JSON Schema for Policy Rule Spec. |
| `policyRuleSpecSchema` | constant | <code>const policyRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { effect: z.ZodEnum&lt;["allow", "deny", "require_human_review"]&gt;; expression: z.ZodOpt...</code> | Runtime schema for Policy Rule Spec. |
| `policySpecDefinition` | constant | <code>const policySpecDefinition: SpecSchemaDefinition&lt;PolicySpec&gt;</code> | Runtime validation entrypoint for the Policy spec, combining its parser, example and JSON Schema. |
| `policySpecExample` | constant | <code>const policySpecExample: PolicySpec</code> | Valid example value for Policy Spec. |
| `policySpecJsonSchema` | constant | <code>const policySpecJsonSchema: JsonSchema</code> | JSON Schema for Policy Spec. |
| `policySpecSchema` | constant | <code>const policySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { rules: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.Z...</code> | Runtime schema for Policy Spec. |
| `regressionSpecDefinition` | constant | <code>const regressionSpecDefinition: SpecSchemaDefinition&lt;RegressionSpec&gt;</code> | Runtime validation entrypoint for the Regression spec, combining its parser, example and JSON Schema. |
| `regressionSpecExample` | constant | <code>const regressionSpecExample: RegressionSpec</code> | Valid example value for Regression Spec. |
| `regressionSpecJsonSchema` | constant | <code>const regressionSpecJsonSchema: JsonSchema</code> | JSON Schema for Regression Spec. |
| `regressionSpecSchema` | constant | <code>const regressionSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { fixtureRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for Regression Spec. |
| `replaySpecDefinition` | constant | <code>const replaySpecDefinition: SpecSchemaDefinition&lt;ReplaySpec&gt;</code> | Runtime validation entrypoint for the Replay spec, combining its parser, example and JSON Schema. |
| `replaySpecExample` | constant | <code>const replaySpecExample: ReplaySpec</code> | Valid example value for Replay Spec. |
| `replaySpecJsonSchema` | constant | <code>const replaySpecJsonSchema: JsonSchema</code> | JSON Schema for Replay Spec. |
| `replaySpecSchema` | constant | <code>const replaySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { captureModelIO: z.ZodOptional&lt;z.ZodBoolean&gt;; captureToolIO: z.ZodOptional&lt;z.ZodBoolean...</code> | Runtime schema for Replay Spec. |
| `retryPolicySpecSchema` | constant | <code>const retryPolicySpecSchema: z.ZodObject&lt;{ maxAttempts: z.ZodNumber; backoffMs: z.ZodOptional&lt;z.ZodNumber&gt;; maxBackoffMs: z.ZodOptional&lt;z.ZodNumber&gt;; jitterRatio: z.ZodOptional&lt;z.ZodNumber&gt;; maxElapsedMs: z.ZodOptional&lt;z.ZodNumber&gt;; retryableCodes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { maxAttempts: number; backoffMs?: number &#124; undefined; maxBackoffMs?: number &#124; undefined; jitt...</code> | Runtime schema for Retry Policy Spec. |
| `riskLevelSchema` | constant | <code>const riskLevelSchema: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;</code> | Runtime schema for Risk Level. |
| `sideEffectLevelSchema` | constant | <code>const sideEffectLevelSchema: z.ZodEnum&lt;["none", "read", "write", "external_effect", "irreversible"]&gt;</code> | Runtime schema for Side Effect Level. |
| `specMetadataSchema` | constant | <code>const specMetadataSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name?: string &#124; undefined; description?: string &#124; undefined; tags?: string[] &#124; undefined; createdAt?: strin...</code> | Runtime schema for Spec Metadata. |
| `specRefSchema` | constant | <code>const specRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }&gt;</code> | Runtime schema for Spec Ref. |
| `timeoutPolicySpecSchema` | constant | <code>const timeoutPolicySpecSchema: z.ZodObject&lt;{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional&lt;z.ZodEnum&lt;["fail", "retry", "human_review"]&gt;&gt;; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }, { timeoutMs: number; onTimeout?: "fail" &#124; "retry" &#124; "human_review" &#124; undefined; }&gt;</code> | Runtime schema for Timeout Policy Spec. |
| `traceSpecDefinition` | constant | <code>const traceSpecDefinition: SpecSchemaDefinition&lt;TraceSpec&gt;</code> | Runtime validation entrypoint for the Trace spec, combining its parser, example and JSON Schema. |
| `traceSpecExample` | constant | <code>const traceSpecExample: TraceSpec</code> | Valid example value for Trace Spec. |
| `traceSpecJsonSchema` | constant | <code>const traceSpecJsonSchema: JsonSchema</code> | JSON Schema for Trace Spec. |
| `traceSpecSchema` | constant | <code>const traceSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { eventTypes: z.ZodArray&lt;z.ZodString, "many"&gt;; retentionPolicy: z.ZodOptional&lt;z.ZodString...</code> | Runtime schema for Trace Spec. |
| `versionedSpecSchema` | constant | <code>const versionedSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; }, { id: string; version: string; }&gt;</code> | Runtime schema for Versioned Spec. |
| `assertSpecSchemaDefinition` | function | <code>assertSpecSchemaDefinition(definition: SpecSchemaDefinition&lt;unknown&gt;): void</code> | Assert Spec Schema Definition function with 1 public call signature; parameters and return types are listed below. |
| `defineSpecSchema` | function | <code>defineSpecSchema&lt;TSpec&gt;(definition: { id: string; zod: ZodType&lt;TSpec&gt;; jsonSchema: JsonSchema; example: TSpec; }): SpecSchemaDefinition&lt;TSpec&gt;</code> | Runtime schema for Define Spec. |
| `exportSpecJsonSchemas` | function | <code>exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition&lt;unknown&gt;[]): Record&lt;string, JsonSchema&gt;</code> | Export Spec JSON Schemas function with 1 public call signature; parameters and return types are listed below. |
| `validateContextSpec` | function | <code>validateContextSpec(input: unknown): ContextSpec</code> | Validate Context Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateDeploymentSpec` | function | <code>validateDeploymentSpec(input: unknown): DeploymentSpec</code> | Validate Deployment Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateEvaluationSpec` | function | <code>validateEvaluationSpec(input: unknown): EvaluationSpec</code> | Validate Evaluation Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateHarnessedAgentSystemSpec` | function | <code>validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec</code> | Validate Harnessed Agent System Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateOutputContractSpec` | function | <code>validateOutputContractSpec(input: unknown): OutputContractSpec</code> | Validate Output Contract Spec function with 1 public call signature; parameters and return types are listed below. |
| `validatePolicySpec` | function | <code>validatePolicySpec(input: unknown): PolicySpec</code> | Validate Policy Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateRegressionSpec` | function | <code>validateRegressionSpec(input: unknown): RegressionSpec</code> | Validate Regression Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateReplaySpec` | function | <code>validateReplaySpec(input: unknown): ReplaySpec</code> | Validate Replay Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateTraceSpec` | function | <code>validateTraceSpec(input: unknown): TraceSpec</code> | Validate Trace Spec function with 1 public call signature; parameters and return types are listed below. |
| `SpecSchemaDefinition` | interface | <code>interface SpecSchemaDefinition</code> | Spec Schema Definition interface with 5 public fields or methods. |

## `auditPolicySpecSchema`

Runtime schema for Audit Policy Spec.

- Kind: constant
- Import: `import { auditPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const auditPolicySpecSchema: z.ZodObject<{ enabled: z.ZodBoolean; includeInput: z.ZodOptional<z.ZodBoolean>; includeOutput: z.ZodOptional<z.ZodBoolean>; redactPaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }, { enabled: boolean; includeInput?: boolean | undefined; includeOutput?: boolean | undefined; redactPaths?: string[] | undefined; }>;
```

## `contextSourceSpecJsonSchema`

JSON Schema for Context Source Spec.

- Kind: constant
- Import: `import { contextSourceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSourceSpecJsonSchema: JsonSchema;
```

## `contextSourceSpecSchema`

Runtime schema for Context Source Spec.

- Kind: constant
- Import: `import { contextSourceSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSourceSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["memory", "artifact", "skill", "domain", "mcp", "user_input", "system"]>; provenanceRequired: z.ZodOptional<z.ZodBoolean>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>;
```

## `contextSpecDefinition`

Runtime validation entrypoint for the Context spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { contextSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSpecDefinition: SpecSchemaDefinition<ContextSpec>;
```

## `contextSpecExample`

Valid example value for Context Spec.

- Kind: constant
- Import: `import { contextSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSpecExample: ContextSpec;
```

## `contextSpecJsonSchema`

JSON Schema for Context Spec.

- Kind: constant
- Import: `import { contextSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSpecJsonSchema: JsonSchema;
```

## `contextSpecSchema`

Runtime schema for Context Spec.

- Kind: constant
- Import: `import { contextSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const contextSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { sources: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["memory", "artifact", "skill", "domain", "mcp", "user_input", "system"]>; provenanceRequired: z.ZodOptional<z.ZodBoolean>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; }, "strip", z.ZodTypeAny, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>, "many">; tokenBudget: z.ZodOptional<z.ZodNumber>; provenancePolicy: z.ZodOptional<z.ZodEnum<["required", "best_effort", "none"]>>; instructionBoundaryPolicy: z.ZodOptional<z.ZodEnum<["strict", "tagged", "none"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; sources: { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; tokenBudget?: number | undefined; provenancePolicy?: "required" | "none" | "best_effort" | undefined; instructionBoundaryPolicy?: "strict" | "none" | "tagged" | undefined; }, { id: string; version: string; sources: { id: string; type: "system" | "memory" | "artifact" | "skill" | "mcp" | "user_input" | "domain"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; provenanceRequired?: boolean | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; tokenBudget?: number | undefined; provenancePolicy?: "required" | "none" | "best_effort" | undefined; instructionBoundaryPolicy?: "strict" | "none" | "tagged" | undefined; }>;
```

## `coreSpecDefinitions`

Core Spec Definitions constant exported by the `schemas` module.

- Kind: constant
- Import: `import { coreSpecDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const coreSpecDefinitions: readonly [SpecSchemaDefinition<PolicySpec>, SpecSchemaDefinition<OutputContractSpec>, SpecSchemaDefinition<ContextSpec>, SpecSchemaDefinition<TraceSpec>, SpecSchemaDefinition<EvaluationSpec>, SpecSchemaDefinition<ReplaySpec>, SpecSchemaDefinition<RegressionSpec>, SpecSchemaDefinition<DeploymentSpec>, SpecSchemaDefinition<HarnessedAgentSystemSpec>];
```

## `coreSpecJsonSchemas`

Core Spec JSON Schemas constant exported by the `schemas` module.

- Kind: constant
- Import: `import { coreSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const coreSpecJsonSchemas: Record<string, JsonSchema>;
```

## `deploymentSpecDefinition`

Runtime validation entrypoint for the Deployment spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { deploymentSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const deploymentSpecDefinition: SpecSchemaDefinition<DeploymentSpec>;
```

## `deploymentSpecExample`

Valid example value for Deployment Spec.

- Kind: constant
- Import: `import { deploymentSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const deploymentSpecExample: DeploymentSpec;
```

## `deploymentSpecJsonSchema`

JSON Schema for Deployment Spec.

- Kind: constant
- Import: `import { deploymentSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const deploymentSpecJsonSchema: JsonSchema;
```

## `deploymentSpecSchema`

Runtime schema for Deployment Spec.

- Kind: constant
- Import: `import { deploymentSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const deploymentSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { mode: z.ZodEnum<["local", "self_hosted", "managed"]>; runtimeMode: z.ZodOptional<z.ZodEnum<["single-user", "multi-user"]>>; configRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; mode: "managed" | "local" | "self_hosted"; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; runtimeMode?: "single-user" | "multi-user" | undefined; configRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }, { id: string; version: string; mode: "managed" | "local" | "self_hosted"; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; runtimeMode?: "single-user" | "multi-user" | undefined; configRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }>;
```

## `evaluationSpecDefinition`

Runtime validation entrypoint for the Evaluation spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { evaluationSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const evaluationSpecDefinition: SpecSchemaDefinition<EvaluationSpec>;
```

## `evaluationSpecExample`

Valid example value for Evaluation Spec.

- Kind: constant
- Import: `import { evaluationSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const evaluationSpecExample: EvaluationSpec;
```

## `evaluationSpecJsonSchema`

JSON Schema for Evaluation Spec.

- Kind: constant
- Import: `import { evaluationSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const evaluationSpecJsonSchema: { allOf: { if: { properties: { type: { const: string; }; }; }; then: { required: string[]; }; }[]; type?: string; properties?: Record<string, JsonSchema>; required?: string[]; items?: JsonSchema; enum?: unknown[]; additionalProperties?: boolean | JsonSchema; };
```

## `evaluationSpecSchema`

Runtime schema for Evaluation Spec.

- Kind: constant
- Import: `import { evaluationSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const evaluationSpecSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodEnum<["schema", "output_contract", "tool_trace", "policy", "process", "cost", "latency", "regression", "human"]>; rubric: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; deterministic: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }>, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }, { id: string; type: "schema" | "human" | "policy" | "process" | "output_contract" | "tool_trace" | "cost" | "latency" | "regression"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; deterministic?: boolean | undefined; owner?: string | undefined; rubric?: JsonSchema | undefined; }>;
```

## `harnessedAgentSystemSpecDefinition`

Runtime validation entrypoint for the Harnessed Agent System spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const harnessedAgentSystemSpecDefinition: SpecSchemaDefinition<HarnessedAgentSystemSpec>;
```

## `harnessedAgentSystemSpecExample`

Valid example value for Harnessed Agent System Spec.

- Kind: constant
- Import: `import { harnessedAgentSystemSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const harnessedAgentSystemSpecExample: HarnessedAgentSystemSpec;
```

## `harnessedAgentSystemSpecJsonSchema`

JSON Schema for Harnessed Agent System Spec.

- Kind: constant
- Import: `import { harnessedAgentSystemSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const harnessedAgentSystemSpecJsonSchema: JsonSchema;
```

## `harnessedAgentSystemSpecSchema`

Runtime schema for Harnessed Agent System Spec.

- Kind: constant
- Import: `import { harnessedAgentSystemSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const harnessedAgentSystemSpecSchema: (typeof import('@codesoul-co/hypha-core'))['harnessedAgentSystemSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `humanReviewPolicySpecSchema`

Runtime schema for Human Review Policy Spec.

- Kind: constant
- Import: `import { humanReviewPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const humanReviewPolicySpecSchema: z.ZodObject<{ required: z.ZodBoolean; reason: z.ZodOptional<z.ZodString>; approverRole: z.ZodOptional<z.ZodString>; timeoutPolicy: z.ZodOptional<z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>>; }, "strip", z.ZodTypeAny, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }, { required: boolean; reason?: string | undefined; approverRole?: string | undefined; timeoutPolicy?: { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; } | undefined; }>;
```

## `jsonSchemaSchema`

Runtime schema for JSON schema.

- Kind: constant
- Import: `import { jsonSchemaSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const jsonSchemaSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>;
```

## `outputContractSpecDefinition`

Runtime validation entrypoint for the Output Contract spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { outputContractSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const outputContractSpecDefinition: SpecSchemaDefinition<OutputContractSpec>;
```

## `outputContractSpecExample`

Valid example value for Output Contract Spec.

- Kind: constant
- Import: `import { outputContractSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const outputContractSpecExample: OutputContractSpec;
```

## `outputContractSpecJsonSchema`

JSON Schema for Output Contract Spec.

- Kind: constant
- Import: `import { outputContractSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const outputContractSpecJsonSchema: JsonSchema;
```

## `outputContractSpecSchema`

Runtime schema for Output Contract Spec.

- Kind: constant
- Import: `import { outputContractSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const outputContractSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { schema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; }, "strip", z.ZodTypeAny, { id: string; schema: JsonSchema; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { id: string; schema: JsonSchema; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `policyRuleSpecJsonSchema`

JSON Schema for Policy Rule Spec.

- Kind: constant
- Import: `import { policyRuleSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policyRuleSpecJsonSchema: JsonSchema;
```

## `policyRuleSpecSchema`

Runtime schema for Policy Rule Spec.

- Kind: constant
- Import: `import { policyRuleSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policyRuleSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { effect: z.ZodEnum<["allow", "deny", "require_human_review"]>; expression: z.ZodOptional<z.ZodString>; sideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }>;
```

## `policySpecDefinition`

Runtime validation entrypoint for the Policy spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { policySpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policySpecDefinition: SpecSchemaDefinition<PolicySpec>;
```

## `policySpecExample`

Valid example value for Policy Spec.

- Kind: constant
- Import: `import { policySpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policySpecExample: PolicySpec;
```

## `policySpecJsonSchema`

JSON Schema for Policy Spec.

- Kind: constant
- Import: `import { policySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policySpecJsonSchema: JsonSchema;
```

## `policySpecSchema`

Runtime schema for Policy Spec.

- Kind: constant
- Import: `import { policySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const policySpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { rules: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { effect: z.ZodEnum<["allow", "deny", "require_human_review"]>; expression: z.ZodOptional<z.ZodString>; sideEffectLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>, "many">>; scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }, { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }>, "many">; defaultEffect: z.ZodOptional<z.ZodEnum<["allow", "deny"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; rules: { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; defaultEffect?: "allow" | "deny" | undefined; }, { id: string; version: string; rules: { id: string; effect: "allow" | "deny" | "require_human_review"; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; expression?: string | undefined; sideEffectLevels?: ("external_effect" | "irreversible" | "read" | "write" | "none")[] | undefined; scopes?: string[] | undefined; }[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; defaultEffect?: "allow" | "deny" | undefined; }>;
```

## `regressionSpecDefinition`

Runtime validation entrypoint for the Regression spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { regressionSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const regressionSpecDefinition: SpecSchemaDefinition<RegressionSpec>;
```

## `regressionSpecExample`

Valid example value for Regression Spec.

- Kind: constant
- Import: `import { regressionSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const regressionSpecExample: RegressionSpec;
```

## `regressionSpecJsonSchema`

JSON Schema for Regression Spec.

- Kind: constant
- Import: `import { regressionSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const regressionSpecJsonSchema: JsonSchema;
```

## `regressionSpecSchema`

Runtime schema for Regression Spec.

- Kind: constant
- Import: `import { regressionSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const regressionSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { fixtureRefs: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">; requiredChecks: z.ZodArray<z.ZodEnum<["event_types", "state_path", "tool_calls", "policy_decisions", "output_contract"]>, "many">; }, "strip", z.ZodTypeAny, { id: string; version: string; fixtureRefs: { id: string; revision?: string | undefined; version?: string | undefined; }[]; requiredChecks: ("output_contract" | "state_path" | "event_types" | "tool_calls" | "policy_decisions")[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { id: string; version: string; fixtureRefs: { id: string; revision?: string | undefined; version?: string | undefined; }[]; requiredChecks: ("output_contract" | "state_path" | "event_types" | "tool_calls" | "policy_decisions")[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `replaySpecDefinition`

Runtime validation entrypoint for the Replay spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { replaySpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const replaySpecDefinition: SpecSchemaDefinition<ReplaySpec>;
```

## `replaySpecExample`

Valid example value for Replay Spec.

- Kind: constant
- Import: `import { replaySpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const replaySpecExample: ReplaySpec;
```

## `replaySpecJsonSchema`

JSON Schema for Replay Spec.

- Kind: constant
- Import: `import { replaySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const replaySpecJsonSchema: JsonSchema;
```

## `replaySpecSchema`

Runtime schema for Replay Spec.

- Kind: constant
- Import: `import { replaySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const replaySpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { captureModelIO: z.ZodOptional<z.ZodBoolean>; captureToolIO: z.ZodOptional<z.ZodBoolean>; captureMemoryReadSet: z.ZodOptional<z.ZodBoolean>; capturePolicyDecisions: z.ZodOptional<z.ZodBoolean>; snapshotPolicy: z.ZodOptional<z.ZodEnum<["none", "state_path", "full"]>>; }, "strip", z.ZodTypeAny, { id: string; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; captureModelIO?: boolean | undefined; captureToolIO?: boolean | undefined; captureMemoryReadSet?: boolean | undefined; capturePolicyDecisions?: boolean | undefined; snapshotPolicy?: "none" | "full" | "state_path" | undefined; }, { id: string; version: string; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; captureModelIO?: boolean | undefined; captureToolIO?: boolean | undefined; captureMemoryReadSet?: boolean | undefined; capturePolicyDecisions?: boolean | undefined; snapshotPolicy?: "none" | "full" | "state_path" | undefined; }>;
```

## `retryPolicySpecSchema`

Runtime schema for Retry Policy Spec.

- Kind: constant
- Import: `import { retryPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const retryPolicySpecSchema: z.ZodObject<{ maxAttempts: z.ZodNumber; backoffMs: z.ZodOptional<z.ZodNumber>; maxBackoffMs: z.ZodOptional<z.ZodNumber>; jitterRatio: z.ZodOptional<z.ZodNumber>; maxElapsedMs: z.ZodOptional<z.ZodNumber>; retryableCodes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { maxAttempts: number; backoffMs?: number | undefined; maxBackoffMs?: number | undefined; jitterRatio?: number | undefined; maxElapsedMs?: number | undefined; retryableCodes?: string[] | undefined; }, { maxAttempts: number; backoffMs?: number | undefined; maxBackoffMs?: number | undefined; jitterRatio?: number | undefined; maxElapsedMs?: number | undefined; retryableCodes?: string[] | undefined; }>;
```

## `riskLevelSchema`

Runtime schema for Risk Level.

- Kind: constant
- Import: `import { riskLevelSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const riskLevelSchema: z.ZodEnum<["low", "medium", "high", "critical"]>;
```

## `sideEffectLevelSchema`

Runtime schema for Side Effect Level.

- Kind: constant
- Import: `import { sideEffectLevelSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const sideEffectLevelSchema: z.ZodEnum<["none", "read", "write", "external_effect", "irreversible"]>;
```

## `specMetadataSchema`

Runtime schema for Spec Metadata.

- Kind: constant
- Import: `import { specMetadataSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const specMetadataSchema: z.ZodObject<{ name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }, { name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; }>;
```

## `specRefSchema`

Runtime schema for Spec Ref.

- Kind: constant
- Import: `import { specRefSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const specRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>;
```

## `timeoutPolicySpecSchema`

Runtime schema for Timeout Policy Spec.

- Kind: constant
- Import: `import { timeoutPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const timeoutPolicySpecSchema: z.ZodObject<{ timeoutMs: z.ZodNumber; onTimeout: z.ZodOptional<z.ZodEnum<["fail", "retry", "human_review"]>>; }, "strip", z.ZodTypeAny, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }, { timeoutMs: number; onTimeout?: "fail" | "retry" | "human_review" | undefined; }>;
```

## `traceSpecDefinition`

Runtime validation entrypoint for the Trace spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { traceSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const traceSpecDefinition: SpecSchemaDefinition<TraceSpec>;
```

## `traceSpecExample`

Valid example value for Trace Spec.

- Kind: constant
- Import: `import { traceSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const traceSpecExample: TraceSpec;
```

## `traceSpecJsonSchema`

JSON Schema for Trace Spec.

- Kind: constant
- Import: `import { traceSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const traceSpecJsonSchema: JsonSchema;
```

## `traceSpecSchema`

Runtime schema for Trace Spec.

- Kind: constant
- Import: `import { traceSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const traceSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { eventTypes: z.ZodArray<z.ZodString, "many">; retentionPolicy: z.ZodOptional<z.ZodString>; redactionPolicy: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version: string; eventTypes: string[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; retentionPolicy?: string | undefined; redactionPolicy?: string | undefined; }, { id: string; version: string; eventTypes: string[]; name?: string | undefined; description?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; owner?: string | undefined; retentionPolicy?: string | undefined; redactionPolicy?: string | undefined; }>;
```

## `versionedSpecSchema`

Runtime schema for Versioned Spec.

- Kind: constant
- Import: `import { versionedSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare const versionedSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; }, { id: string; version: string; }>;
```

## `assertSpecSchemaDefinition`

Assert Spec Schema Definition function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertSpecSchemaDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function assertSpecSchemaDefinition(definition: SpecSchemaDefinition<unknown>): void;
```

### Call signature

```text
assertSpecSchemaDefinition(definition: SpecSchemaDefinition<unknown>): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `definition` | <code>SpecSchemaDefinition&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `defineSpecSchema`

Runtime schema for Define Spec.

- Kind: function
- Import: `import { defineSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function defineSpecSchema<TSpec>(definition: {
    id: string;
    zod: ZodType<TSpec>;
    jsonSchema: JsonSchema;
    example: TSpec;
}): SpecSchemaDefinition<TSpec>;
```

### Call signature

```text
defineSpecSchema<TSpec>(definition: { id: string; zod: ZodType<TSpec>; jsonSchema: JsonSchema; example: TSpec; }): SpecSchemaDefinition<TSpec>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `definition` | <code>{ id: string; zod: ZodType&lt;TSpec&gt;; jsonSchema: JsonSchema; example: TSpec; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SpecSchemaDefinition<TSpec>`
- Description: The return contract is defined by the type shown above.

## `exportSpecJsonSchemas`

Export Spec JSON Schemas function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { exportSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition<unknown>[]): Record<string, JsonSchema>;
```

### Call signature

```text
exportSpecJsonSchemas(definitions: readonly SpecSchemaDefinition<unknown>[]): Record<string, JsonSchema>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `definitions` | <code>readonly SpecSchemaDefinition&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, JsonSchema>`
- Description: The return contract is defined by the type shown above.

## `validateContextSpec`

Validate Context Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContextSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateContextSpec(input: unknown): ContextSpec;
```

### Call signature

```text
validateContextSpec(input: unknown): ContextSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ContextSpec`
- Description: The return contract is defined by the type shown above.

## `validateDeploymentSpec`

Validate Deployment Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateDeploymentSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateDeploymentSpec(input: unknown): DeploymentSpec;
```

### Call signature

```text
validateDeploymentSpec(input: unknown): DeploymentSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DeploymentSpec`
- Description: The return contract is defined by the type shown above.

## `validateEvaluationSpec`

Validate Evaluation Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateEvaluationSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateEvaluationSpec(input: unknown): EvaluationSpec;
```

### Call signature

```text
validateEvaluationSpec(input: unknown): EvaluationSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `EvaluationSpec`
- Description: The return contract is defined by the type shown above.

## `validateHarnessedAgentSystemSpec`

Validate Harnessed Agent System Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateHarnessedAgentSystemSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec;
```

### Call signature

```text
validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `HarnessedAgentSystemSpec`
- Description: The return contract is defined by the type shown above.

## `validateOutputContractSpec`

Validate Output Contract Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateOutputContractSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateOutputContractSpec(input: unknown): OutputContractSpec;
```

### Call signature

```text
validateOutputContractSpec(input: unknown): OutputContractSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `OutputContractSpec`
- Description: The return contract is defined by the type shown above.

## `validatePolicySpec`

Validate Policy Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validatePolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validatePolicySpec(input: unknown): PolicySpec;
```

### Call signature

```text
validatePolicySpec(input: unknown): PolicySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PolicySpec`
- Description: The return contract is defined by the type shown above.

## `validateRegressionSpec`

Validate Regression Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRegressionSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateRegressionSpec(input: unknown): RegressionSpec;
```

### Call signature

```text
validateRegressionSpec(input: unknown): RegressionSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RegressionSpec`
- Description: The return contract is defined by the type shown above.

## `validateReplaySpec`

Validate Replay Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReplaySpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateReplaySpec(input: unknown): ReplaySpec;
```

### Call signature

```text
validateReplaySpec(input: unknown): ReplaySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReplaySpec`
- Description: The return contract is defined by the type shown above.

## `validateTraceSpec`

Validate Trace Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateTraceSpec } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export declare function validateTraceSpec(input: unknown): TraceSpec;
```

### Call signature

```text
validateTraceSpec(input: unknown): TraceSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TraceSpec`
- Description: The return contract is defined by the type shown above.

## `SpecSchemaDefinition`

Spec Schema Definition interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SpecSchemaDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/schemas.ts)

### Declaration

```text
export interface SpecSchemaDefinition<TSpec> {
    id: string;
    zod: ZodType<TSpec>;
    jsonSchema: JsonSchema;
    example: TSpec;
    parse(input: unknown): TSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `example` | property | <code>example: TSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jsonSchema` | property | <code>jsonSchema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parse` | method | <code>parse(input: unknown): TSpec</code> | Public method; parameters and return type are shown in the signature. |
| `zod` | property | <code>zod: z.ZodType&lt;TSpec, z.ZodTypeDef, TSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
