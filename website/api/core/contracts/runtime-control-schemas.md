# `@codesoul-co/hypha-core` / `contracts/runtime-control-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-control-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)
- Exports: **15**

## Using this module

Use the Runtime control schemas module for declaring and runtime-validating contracts. It exports 13 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  runtimeControlContractDefinitions,
  runtimeControlContractJsonSchemas,
  runtimePauseCommandSchema,
  runtimeResumeCommandSchema,
  runtimeRunControlCommandDefinition,
  runtimeRunControlCommandExample,
  runtimeRunControlCommandJsonSchema,
  runtimeRunControlCommandSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimePauseCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimePauseCommandSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeControlContractDefinitions` | constant | <code>const runtimeControlContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;, SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;]</code> | Runtime Control Contract Definitions constant exported by the `contracts/runtime-control-schemas` module. |
| `runtimeControlContractJsonSchemas` | constant | <code>const runtimeControlContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Control Contract JSON Schemas constant exported by the `contracts/runtime-control-schemas` module. |
| `runtimePauseCommandSchema` | constant | <code>const runtimePauseCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { ...</code> | Runtime schema for Runtime Pause Command. |
| `runtimeResumeCommandSchema` | constant | <code>const runtimeResumeCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"resume"&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; payload: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentI...</code> | Runtime schema for Runtime Resume Command. |
| `runtimeRunControlCommandDefinition` | constant | <code>const runtimeRunControlCommandDefinition: SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;</code> | Runtime Run Control Command Definition constant exported by the `contracts/runtime-control-schemas` module. |
| `runtimeRunControlCommandExample` | constant | <code>const runtimeRunControlCommandExample: RuntimeRunControlCommand</code> | Valid example value for Runtime Run Control Command. |
| `runtimeRunControlCommandJsonSchema` | constant | <code>const runtimeRunControlCommandJsonSchema: JsonSchema</code> | JSON Schema for Runtime Run Control Command. |
| `runtimeRunControlCommandSchema` | constant | <code>const runtimeRunControlCommandSchema: z.ZodDiscriminatedUnion&lt;"kind", [z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for Runtime Run Control Command. |
| `runtimeRunControlResultDefinition` | constant | <code>const runtimeRunControlResultDefinition: SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;</code> | Runtime Run Control Result Definition constant exported by the `contracts/runtime-control-schemas` module. |
| `runtimeRunControlResultExample` | constant | <code>const runtimeRunControlResultExample: RuntimeRunControlResult</code> | Valid example value for Runtime Run Control Result. |
| `runtimeRunControlResultJsonSchema` | constant | <code>const runtimeRunControlResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Run Control Result. |
| `runtimeRunControlResultSchema` | constant | <code>const runtimeRunControlResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; kind: z.ZodEnum&lt;["pause", "resume", "signal"]&gt;; disposition: z.ZodEnum&lt;["applied", "reused", "lease_unavailable"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; runRevision: z.ZodNumber; projection: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./r...</code> | Runtime schema for Runtime Run Control Result. |
| `runtimeSignalCommandSchema` | constant | <code>const runtimeSignalCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"signal"&gt;; key: z.ZodString; payload: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; sentAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "...</code> | Runtime schema for Runtime Signal Command. |
| `validateRuntimeRunControlCommand` | function | <code>validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand</code> | Validate Runtime Run Control Command function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeRunControlResult` | function | <code>validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult</code> | Validate Runtime Run Control Result function with 1 public call signature; parameters and return types are listed below. |

## `runtimeControlContractDefinitions`

Runtime Control Contract Definitions constant exported by the `contracts/runtime-control-schemas` module.

- Kind: constant
- Import: `import { runtimeControlContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeControlContractDefinitions: readonly [SpecSchemaDefinition<RuntimeRunControlCommand>, SpecSchemaDefinition<RuntimeRunControlResult>];
```

## `runtimeControlContractJsonSchemas`

Runtime Control Contract JSON Schemas constant exported by the `contracts/runtime-control-schemas` module.

- Kind: constant
- Import: `import { runtimeControlContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeControlContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimePauseCommandSchema`

Runtime schema for Runtime Pause Command.

- Kind: constant
- Import: `import { runtimePauseCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimePauseCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimePauseCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeResumeCommandSchema`

Runtime schema for Runtime Resume Command.

- Kind: constant
- Import: `import { runtimeResumeCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeResumeCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeResumeCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRunControlCommandDefinition`

Runtime Run Control Command Definition constant exported by the `contracts/runtime-control-schemas` module.

- Kind: constant
- Import: `import { runtimeRunControlCommandDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlCommandDefinition: SpecSchemaDefinition<RuntimeRunControlCommand>;
```

## `runtimeRunControlCommandExample`

Valid example value for Runtime Run Control Command.

- Kind: constant
- Import: `import { runtimeRunControlCommandExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlCommandExample: RuntimeRunControlCommand;
```

## `runtimeRunControlCommandJsonSchema`

JSON Schema for Runtime Run Control Command.

- Kind: constant
- Import: `import { runtimeRunControlCommandJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlCommandJsonSchema: JsonSchema;
```

## `runtimeRunControlCommandSchema`

Runtime schema for Runtime Run Control Command.

- Kind: constant
- Import: `import { runtimeRunControlCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRunControlCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunControlCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeRunControlResultDefinition`

Runtime Run Control Result Definition constant exported by the `contracts/runtime-control-schemas` module.

- Kind: constant
- Import: `import { runtimeRunControlResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlResultDefinition: SpecSchemaDefinition<RuntimeRunControlResult>;
```

## `runtimeRunControlResultExample`

Valid example value for Runtime Run Control Result.

- Kind: constant
- Import: `import { runtimeRunControlResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlResultExample: RuntimeRunControlResult;
```

## `runtimeRunControlResultJsonSchema`

JSON Schema for Runtime Run Control Result.

- Kind: constant
- Import: `import { runtimeRunControlResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare const runtimeRunControlResultJsonSchema: JsonSchema;
```

## `runtimeRunControlResultSchema`

Runtime schema for Runtime Run Control Result.

- Kind: constant
- Import: `import { runtimeRunControlResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeRunControlResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeRunControlResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeSignalCommandSchema`

Runtime schema for Runtime Signal Command.

- Kind: constant
- Import: `import { runtimeSignalCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeSignalCommandSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeSignalCommandSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeRunControlCommand`

Validate Runtime Run Control Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRunControlCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand;
```

### Call signature

```text
validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRunControlCommand`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeRunControlResult`

Validate Runtime Run Control Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeRunControlResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)

### Declaration

```text
export declare function validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult;
```

### Call signature

```text
validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRunControlResult`
- Description: The return contract is defined by the type shown above.
