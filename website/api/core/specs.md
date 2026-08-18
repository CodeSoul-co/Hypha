# `@codesoul-co/hypha-core` / `specs`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/specs.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)
- Exports: **28**

## Using this module

Use the Specs module for declaring and runtime-validating contracts. It exports 2 constants, 2 functions, 22 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  allowAllPolicyEngine,
  denyExternalEffectsPolicyEngine,
  assertVersionedSpec,
  createPolicySpecEngine,
} from '@codesoul-co/hypha-core';

import type {
  AuditPolicySpec,
  ContextSourceSpec,
  ContextSpec,
  DeploymentSpec,
  EvaluationSpec,
  HarnessedAgentSystemSpec,
  HumanReviewPolicySpec,
  JsonSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 24 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowAllPolicyEngine` | constant | <code>const allowAllPolicyEngine: PolicyEngine</code> | Allow All Policy Engine constant exported by the `specs` module. |
| `denyExternalEffectsPolicyEngine` | constant | <code>const denyExternalEffectsPolicyEngine: PolicyEngine</code> | Deny External Effects Policy Engine constant exported by the `specs` module. |
| `assertVersionedSpec` | function | <code>assertVersionedSpec(spec: VersionedSpec, label?: string): void</code> | Assert Versioned Spec function with 1 public call signature; parameters and return types are listed below. |
| `createPolicySpecEngine` | function | <code>createPolicySpecEngine(policy: PolicySpec): PolicyEngine</code> | Create Policy Spec Engine function with 1 public call signature; parameters and return types are listed below. |
| `AuditPolicySpec` | interface | <code>interface AuditPolicySpec</code> | Audit Policy Spec interface with 4 public fields or methods. |
| `ContextSourceSpec` | interface | <code>interface ContextSourceSpec extends VersionedSpec, SpecMetadata</code> | Context Source Spec interface with 11 public fields or methods. |
| `ContextSpec` | interface | <code>interface ContextSpec extends VersionedSpec, SpecMetadata</code> | Context Spec interface with 12 public fields or methods. |
| `DeploymentSpec` | interface | <code>interface DeploymentSpec extends VersionedSpec, SpecMetadata</code> | Deployment Spec interface with 11 public fields or methods. |
| `EvaluationSpec` | interface | <code>interface EvaluationSpec extends VersionedSpec, SpecMetadata</code> | Evaluation Spec interface with 11 public fields or methods. |
| `HarnessedAgentSystemSpec` | interface | <code>interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata</code> | Harnessed Agent System Spec interface with 25 public fields or methods. |
| `HumanReviewPolicySpec` | interface | <code>interface HumanReviewPolicySpec</code> | Human Review Policy Spec interface with 4 public fields or methods. |
| `JsonSchema` | interface | <code>interface JsonSchema</code> | JSON Schema for . |
| `OutputContractSpec` | interface | <code>interface OutputContractSpec extends VersionedSpec, SpecMetadata</code> | Output Contract Spec interface with 9 public fields or methods. |
| `PolicyDecision` | interface | <code>interface PolicyDecision</code> | Policy Decision interface with 6 public fields or methods. |
| `PolicyEngine` | interface | <code>interface PolicyEngine</code> | Policy Engine interface with 1 public fields or methods. |
| `PolicyEvaluationContext` | interface | <code>interface PolicyEvaluationContext</code> | Policy Evaluation Context interface with 7 public fields or methods. |
| `PolicyRuleSpec` | interface | <code>interface PolicyRuleSpec extends VersionedSpec, SpecMetadata</code> | Policy Rule Spec interface with 12 public fields or methods. |
| `PolicySpec` | interface | <code>interface PolicySpec extends VersionedSpec, SpecMetadata</code> | Policy Spec interface with 10 public fields or methods. |
| `RegressionSpec` | interface | <code>interface RegressionSpec extends VersionedSpec, SpecMetadata</code> | Regression Spec interface with 10 public fields or methods. |
| `ReplaySpec` | interface | <code>interface ReplaySpec extends VersionedSpec, SpecMetadata</code> | Replay Spec interface with 13 public fields or methods. |
| `RetryPolicySpec` | interface | <code>interface RetryPolicySpec</code> | Retry Policy Spec interface with 6 public fields or methods. |
| `SpecMetadata` | interface | <code>interface SpecMetadata</code> | Spec Metadata interface with 6 public fields or methods. |
| `SpecRef` | interface | <code>interface SpecRef</code> | Spec Ref interface with 3 public fields or methods. |
| `TimeoutPolicySpec` | interface | <code>interface TimeoutPolicySpec</code> | Timeout Policy Spec interface with 2 public fields or methods. |
| `TraceSpec` | interface | <code>interface TraceSpec extends VersionedSpec, SpecMetadata</code> | Trace Spec interface with 11 public fields or methods. |
| `VersionedSpec` | interface | <code>interface VersionedSpec</code> | Versioned Spec interface with 2 public fields or methods. |
| `RiskLevel` | type | <code>type RiskLevel = 'low' &#124; 'medium' &#124; 'high' &#124; 'critical'</code> | Public type alias for Risk Level; the declaration contains its complete type expression. |
| `SideEffectLevel` | type | <code>type SideEffectLevel = 'none' &#124; 'read' &#124; 'write' &#124; 'external_effect' &#124; 'irreversible'</code> | Public type alias for Side Effect Level; the declaration contains its complete type expression. |

## `allowAllPolicyEngine`

Allow All Policy Engine constant exported by the `specs` module.

- Kind: constant
- Import: `import { allowAllPolicyEngine } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export declare const allowAllPolicyEngine: PolicyEngine;
```

## `denyExternalEffectsPolicyEngine`

Deny External Effects Policy Engine constant exported by the `specs` module.

- Kind: constant
- Import: `import { denyExternalEffectsPolicyEngine } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export declare const denyExternalEffectsPolicyEngine: PolicyEngine;
```

## `assertVersionedSpec`

Assert Versioned Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertVersionedSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export declare function assertVersionedSpec(spec: VersionedSpec, label?: string): void;
```

### Call signature

```text
assertVersionedSpec(spec: VersionedSpec, label?: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>VersionedSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `label` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `createPolicySpecEngine`

Create Policy Spec Engine function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createPolicySpecEngine } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export declare function createPolicySpecEngine(policy: PolicySpec): PolicyEngine;
```

### Call signature

```text
createPolicySpecEngine(policy: PolicySpec): PolicyEngine
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `policy` | <code>PolicySpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PolicyEngine`
- Description: The return contract is defined by the type shown above.

## `AuditPolicySpec`

Audit Policy Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { AuditPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface AuditPolicySpec {
    enabled: boolean;
    includeInput?: boolean;
    includeOutput?: boolean;
    redactPaths?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeInput` | property | <code>includeInput?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeOutput` | property | <code>includeOutput?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactPaths` | property | <code>redactPaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceSpec`

Context Source Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface ContextSourceSpec extends VersionedSpec, SpecMetadata {
    type: 'memory' | 'artifact' | 'skill' | 'domain' | 'mcp' | 'user_input' | 'system';
    provenanceRequired?: boolean;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenanceRequired` | property | <code>provenanceRequired?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "memory" &#124; "artifact" &#124; "skill" &#124; "domain" &#124; "mcp" &#124; "user_input" &#124; "system"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSpec`

Context Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ContextSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface ContextSpec extends VersionedSpec, SpecMetadata {
    sources: ContextSourceSpec[];
    tokenBudget?: number;
    provenancePolicy?: 'required' | 'best_effort' | 'none';
    instructionBoundaryPolicy?: 'strict' | 'tagged' | 'none';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructionBoundaryPolicy` | property | <code>instructionBoundaryPolicy?: "none" &#124; "strict" &#124; "tagged"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenancePolicy` | property | <code>provenancePolicy?: "none" &#124; "required" &#124; "best_effort"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sources` | property | <code>sources: ContextSourceSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenBudget` | property | <code>tokenBudget?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DeploymentSpec`

Deployment Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { DeploymentSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface DeploymentSpec extends VersionedSpec, SpecMetadata {
    mode: 'local' | 'self_hosted' | 'managed';
    runtimeMode?: 'single-user' | 'multi-user';
    configRefs?: SpecRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `configRefs` | property | <code>configRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "local" &#124; "self_hosted" &#124; "managed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeMode` | property | <code>runtimeMode?: "single-user" &#124; "multi-user"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationSpec`

Evaluation Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { EvaluationSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface EvaluationSpec extends VersionedSpec, SpecMetadata {
    type: 'schema' | 'output_contract' | 'tool_trace' | 'policy' | 'process' | 'cost' | 'latency' | 'regression' | 'human';
    rubric?: JsonSchema;
    deterministic?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deterministic` | property | <code>deterministic?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rubric` | property | <code>rubric?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "schema" &#124; "output_contract" &#124; "tool_trace" &#124; "policy" &#124; "process" &#124; "cost" &#124; "latency" &#124; "regression" &#124; "human"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HarnessedAgentSystemSpec`

Harnessed Agent System Spec interface with 25 public fields or methods.

- Kind: interface
- Import: `import type { HarnessedAgentSystemSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata {
    agentRef: SpecRef;
    fsmProcessRef: SpecRef;
    traceRef: SpecRef;
    policyRefs?: SpecRef[];
    memoryRefs?: SpecRef[];
    toolRefs?: SpecRef[];
    skillRefs?: SpecRef[];
    mcpRefs?: SpecRef[];
    contextRefs?: SpecRef[];
    reasoningRefs?: SpecRef[];
    outputContractRefs?: SpecRef[];
    businessRuleRefs?: SpecRef[];
    modelProfileRef?: SpecRef;
    evaluationRefs?: SpecRef[];
    replayRef?: SpecRef;
    regressionRef?: SpecRef;
    deploymentRef?: SpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `businessRuleRefs` | property | <code>businessRuleRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextRefs` | property | <code>contextRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deploymentRef` | property | <code>deploymentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmProcessRef` | property | <code>fsmProcessRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpRefs` | property | <code>mcpRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryRefs` | property | <code>memoryRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelProfileRef` | property | <code>modelProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractRefs` | property | <code>outputContractRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningRefs` | property | <code>reasoningRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `regressionRef` | property | <code>regressionRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replayRef` | property | <code>replayRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceRef` | property | <code>traceRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HumanReviewPolicySpec`

Human Review Policy Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { HumanReviewPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface HumanReviewPolicySpec {
    required: boolean;
    reason?: string;
    approverRole?: string;
    timeoutPolicy?: TimeoutPolicySpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approverRole` | property | <code>approverRole?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutPolicy` | property | <code>timeoutPolicy?: TimeoutPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `JsonSchema`

JSON Schema for .

- Kind: interface
- Import: `import type { JsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface JsonSchema {
    type?: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    enum?: unknown[];
    additionalProperties?: boolean | JsonSchema;
    [key: string]: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `additionalProperties` | property | <code>additionalProperties?: boolean &#124; JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enum` | property | <code>enum?: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `items` | property | <code>items?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `properties` | property | <code>properties?: Record&lt;string, JsonSchema&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OutputContractSpec`

Output Contract Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { OutputContractSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface OutputContractSpec extends VersionedSpec, SpecMetadata {
    schema: JsonSchema;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schema` | property | <code>schema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PolicyDecision`

Policy Decision interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PolicyDecision } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface PolicyDecision {
    allowed: boolean;
    requiresHumanReview?: boolean;
    policyId?: string;
    ruleId?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyId` | property | <code>policyId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresHumanReview` | property | <code>requiresHumanReview?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ruleId` | property | <code>ruleId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PolicyEngine`

Policy Engine interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PolicyEngine } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface PolicyEngine {
    evaluate(context: PolicyEvaluationContext): Promise<PolicyDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(context: PolicyEvaluationContext): Promise&lt;PolicyDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PolicyEvaluationContext`

Policy Evaluation Context interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PolicyEvaluationContext } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface PolicyEvaluationContext<TInput = unknown> {
    runId: string;
    stepId?: string;
    userId?: string;
    capabilityId?: string;
    sideEffectLevel?: SideEffectLevel;
    input?: TInput;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PolicyRuleSpec`

Policy Rule Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { PolicyRuleSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface PolicyRuleSpec extends VersionedSpec, SpecMetadata {
    effect: 'allow' | 'deny' | 'require_human_review';
    expression?: string;
    sideEffectLevels?: SideEffectLevel[];
    scopes?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effect` | property | <code>effect: "allow" &#124; "deny" &#124; "require_human_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expression` | property | <code>expression?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopes` | property | <code>scopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevels` | property | <code>sideEffectLevels?: SideEffectLevel[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PolicySpec`

Policy Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { PolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface PolicySpec extends VersionedSpec, SpecMetadata {
    rules: PolicyRuleSpec[];
    defaultEffect?: 'allow' | 'deny';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultEffect` | property | <code>defaultEffect?: "allow" &#124; "deny"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rules` | property | <code>rules: PolicyRuleSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionSpec`

Regression Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RegressionSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface RegressionSpec extends VersionedSpec, SpecMetadata {
    fixtureRefs: SpecRef[];
    requiredChecks: Array<'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract'>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtureRefs` | property | <code>fixtureRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredChecks` | property | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplaySpec`

Replay Spec interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { ReplaySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface ReplaySpec extends VersionedSpec, SpecMetadata {
    captureModelIO?: boolean;
    captureToolIO?: boolean;
    captureMemoryReadSet?: boolean;
    capturePolicyDecisions?: boolean;
    snapshotPolicy?: 'none' | 'state_path' | 'full';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captureMemoryReadSet` | property | <code>captureMemoryReadSet?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `captureModelIO` | property | <code>captureModelIO?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capturePolicyDecisions` | property | <code>capturePolicyDecisions?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `captureToolIO` | property | <code>captureToolIO?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotPolicy` | property | <code>snapshotPolicy?: "none" &#124; "state_path" &#124; "full"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RetryPolicySpec`

Retry Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RetryPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface RetryPolicySpec {
    maxAttempts: number;
    backoffMs?: number;
    maxBackoffMs?: number;
    jitterRatio?: number;
    maxElapsedMs?: number;
    retryableCodes?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backoffMs` | property | <code>backoffMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jitterRatio` | property | <code>jitterRatio?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBackoffMs` | property | <code>maxBackoffMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxElapsedMs` | property | <code>maxElapsedMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryableCodes` | property | <code>retryableCodes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SpecMetadata`

Spec Metadata interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SpecMetadata } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface SpecMetadata {
    name?: string;
    description?: string;
    owner?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SpecRef`

Spec Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SpecRef } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface SpecRef {
    id: string;
    version?: string;
    revision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TimeoutPolicySpec`

Timeout Policy Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { TimeoutPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface TimeoutPolicySpec {
    timeoutMs: number;
    onTimeout?: 'fail' | 'retry' | 'human_review';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onTimeout` | property | <code>onTimeout?: "fail" &#124; "retry" &#124; "human_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceSpec`

Trace Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { TraceSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface TraceSpec extends VersionedSpec, SpecMetadata {
    eventTypes: string[];
    retentionPolicy?: string;
    redactionPolicy?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactionPolicy` | property | <code>redactionPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retentionPolicy` | property | <code>retentionPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VersionedSpec`

Versioned Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { VersionedSpec } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export interface VersionedSpec {
    id: string;
    version: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RiskLevel`

Public type alias for Risk Level; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RiskLevel } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
```

## `SideEffectLevel`

Public type alias for Side Effect Level; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SideEffectLevel } from '@codesoul-co/hypha-core';`
- Source module: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### Declaration

```text
export type SideEffectLevel = 'none' | 'read' | 'write' | 'external_effect' | 'irreversible';
```
