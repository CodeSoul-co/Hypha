# `@codesoul-co/hypha-core` / `modules/execution-governance/contracts`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-governance/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)
- Exports: **12**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 10 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  executionGovernanceJsonSchemas,
  executionRiskAssessmentExample,
  executionRiskAssessmentJsonSchema,
  executionRiskAssessmentSchema,
  executionSandboxLevelSchema,
  executionToolBindingExample,
  executionToolBindingJsonSchema,
  executionToolBindingSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionRiskAssessmentSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionRiskAssessmentSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionGovernanceJsonSchemas` | constant | <code>const executionGovernanceJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Governance JSON Schemas constant exported by the `modules/execution-governance/contracts` module. |
| `executionRiskAssessmentExample` | constant | <code>const executionRiskAssessmentExample: ExecutionRiskAssessment</code> | Valid example value for Execution Risk Assessment. |
| `executionRiskAssessmentJsonSchema` | constant | <code>const executionRiskAssessmentJsonSchema: JsonSchema</code> | JSON Schema for Execution Risk Assessment. |
| `executionRiskAssessmentSchema` | constant | <code>const executionRiskAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; level: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; reasons: z.ZodArray&lt;z.ZodString, "many"&gt;; matchedRules: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional&lt;z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;&gt;; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeA...</code> | Runtime schema for Execution Risk Assessment. |
| `executionSandboxLevelSchema` | constant | <code>const executionSandboxLevelSchema: z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;</code> | Runtime schema for Execution Sandbox Level. |
| `executionToolBindingExample` | constant | <code>const executionToolBindingExample: ExecutionToolBinding</code> | Valid example value for Execution Tool Binding. |
| `executionToolBindingJsonSchema` | constant | <code>const executionToolBindingJsonSchema: JsonSchema</code> | JSON Schema for Execution Tool Binding. |
| `executionToolBindingSchema` | constant | <code>const executionToolBindingSchema: z.ZodEffects&lt;z.ZodObject&lt;{ toolId: z.ZodString; operation: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; sideEffectLevel: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;; humanReviewPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operat...</code> | Runtime schema for Execution Tool Binding. |
| `executionToolOperationSchema` | constant | <code>const executionToolOperationSchema: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;</code> | Runtime schema for Execution Tool Operation. |
| `executionToolSideEffectLevelSchema` | constant | <code>const executionToolSideEffectLevelSchema: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;</code> | Runtime schema for Execution Tool Side Effect Level. |
| `validateExecutionRiskAssessment` | function | <code>validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment</code> | Validate Execution Risk Assessment function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionToolBinding` | function | <code>validateExecutionToolBinding(input: unknown): ExecutionToolBinding</code> | Validate Execution Tool Binding function with 1 public call signature; parameters and return types are listed below. |

## `executionGovernanceJsonSchemas`

Execution Governance JSON Schemas constant exported by the `modules/execution-governance/contracts` module.

- Kind: constant
- Import: `import { executionGovernanceJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionGovernanceJsonSchemas: Record<string, JsonSchema>;
```

## `executionRiskAssessmentExample`

Valid example value for Execution Risk Assessment.

- Kind: constant
- Import: `import { executionRiskAssessmentExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionRiskAssessmentExample: ExecutionRiskAssessment;
```

## `executionRiskAssessmentJsonSchema`

JSON Schema for Execution Risk Assessment.

- Kind: constant
- Import: `import { executionRiskAssessmentJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionRiskAssessmentJsonSchema: JsonSchema;
```

## `executionRiskAssessmentSchema`

Runtime schema for Execution Risk Assessment.

- Kind: constant
- Import: `import { executionRiskAssessmentSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionRiskAssessmentSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; level: z.ZodEnum<["low", "medium", "high", "critical"]>; reasons: z.ZodArray<z.ZodString, "many">; matchedRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional<z.ZodEnum<["local", "container", "remote_isolated"]>>; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeAny, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }>, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }, { id: string; evaluatedAt: string; level: "low" | "medium" | "high" | "critical"; reasons: string[]; requiresApproval: boolean; matchedRules?: string[] | undefined; recommendedSandboxLevel?: "local" | "container" | "remote_isolated" | undefined; }>;
```

## `executionSandboxLevelSchema`

Runtime schema for Execution Sandbox Level.

- Kind: constant
- Import: `import { executionSandboxLevelSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionSandboxLevelSchema: z.ZodEnum<["local", "container", "remote_isolated"]>;
```

## `executionToolBindingExample`

Valid example value for Execution Tool Binding.

- Kind: constant
- Import: `import { executionToolBindingExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionToolBindingExample: ExecutionToolBinding;
```

## `executionToolBindingJsonSchema`

JSON Schema for Execution Tool Binding.

- Kind: constant
- Import: `import { executionToolBindingJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionToolBindingJsonSchema: JsonSchema;
```

## `executionToolBindingSchema`

Runtime schema for Execution Tool Binding.

- Kind: constant
- Import: `import { executionToolBindingSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionToolBindingSchema: z.ZodEffects<z.ZodObject<{ toolId: z.ZodString; operation: z.ZodEnum<["file_read", "file_write", "command", "sandbox", "artifact"]>; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray<z.ZodString, "many">; sideEffectLevel: z.ZodEnum<["read", "write", "external_effect", "irreversible"]>; humanReviewPolicyRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }>, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }, { operation: "command" | "artifact" | "file_read" | "file_write" | "sandbox"; toolId: string; sideEffectLevel: "external_effect" | "irreversible" | "read" | "write"; executionProfileRef: string; requiredScopes: string[]; humanReviewPolicyRef?: string | undefined; }>;
```

## `executionToolOperationSchema`

Runtime schema for Execution Tool Operation.

- Kind: constant
- Import: `import { executionToolOperationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionToolOperationSchema: z.ZodEnum<["file_read", "file_write", "command", "sandbox", "artifact"]>;
```

## `executionToolSideEffectLevelSchema`

Runtime schema for Execution Tool Side Effect Level.

- Kind: constant
- Import: `import { executionToolSideEffectLevelSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare const executionToolSideEffectLevelSchema: z.ZodEnum<["read", "write", "external_effect", "irreversible"]>;
```

## `validateExecutionRiskAssessment`

Validate Execution Risk Assessment function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionRiskAssessment } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare function validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment;
```

### Call signature

```text
validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRiskAssessment`
- Description: The return contract is defined by the type shown above.

## `validateExecutionToolBinding`

Validate Execution Tool Binding function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionToolBinding } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)

### Declaration

```text
export declare function validateExecutionToolBinding(input: unknown): ExecutionToolBinding;
```

### Call signature

```text
validateExecutionToolBinding(input: unknown): ExecutionToolBinding
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionToolBinding`
- Description: The return contract is defined by the type shown above.
