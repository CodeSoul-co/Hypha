# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-checkpoint-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)
- Exports: **32**

## Using this module

Use the Runtime checkpoint schemas module for declaring and runtime-validating contracts. It exports 26 constants, 6 functions.

### Import from the package entrypoint

```ts
import {
  runtimeCheckpointContractDefinitions,
  runtimeCheckpointContractJsonSchemas,
  runtimeCheckpointCreateCommandDefinition,
  runtimeCheckpointCreateCommandExample,
  runtimeCheckpointCreateCommandJsonSchema,
  runtimeCheckpointCreateCommandSchema,
  runtimeCheckpointCreateResultDefinition,
  runtimeCheckpointCreateResultExample,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 26 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { runtimeCheckpointCreateCommandSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeCheckpointCreateCommandSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeCheckpointContractDefinitions` | constant | <code>const runtimeCheckpointContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCheckpointPolicySpec&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointRecord&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointCreateCommand&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointCreateResult&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointLoadRequest&gt;, SpecSchemaDefinition&lt;RuntimeCheckpointLoadResult&gt;]</code> | Runtime Checkpoint Contract Definitions constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointContractJsonSchemas` | constant | <code>const runtimeCheckpointContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Runtime Checkpoint Contract JSON Schemas constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointCreateCommandDefinition` | constant | <code>const runtimeCheckpointCreateCommandDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointCreateCommand&gt;</code> | Runtime Checkpoint Create Command Definition constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointCreateCommandExample` | constant | <code>const runtimeCheckpointCreateCommandExample: RuntimeCheckpointCreateCommand</code> | Valid example value for Runtime Checkpoint Create Command. |
| `runtimeCheckpointCreateCommandJsonSchema` | constant | <code>const runtimeCheckpointCreateCommandJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Create Command. |
| `runtimeCheckpointCreateCommandSchema` | constant | <code>const runtimeCheckpointCreateCommandSchema: z.ZodObject&lt;{ checkpointId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string ...</code> | Runtime schema for Runtime Checkpoint Create Command. |
| `runtimeCheckpointCreateResultDefinition` | constant | <code>const runtimeCheckpointCreateResultDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointCreateResult&gt;</code> | Runtime Checkpoint Create Result Definition constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointCreateResultExample` | constant | <code>const runtimeCheckpointCreateResultExample: RuntimeCheckpointCreateResult</code> | Valid example value for Runtime Checkpoint Create Result. |
| `runtimeCheckpointCreateResultJsonSchema` | constant | <code>const runtimeCheckpointCreateResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Create Result. |
| `runtimeCheckpointCreateResultSchema` | constant | <code>const runtimeCheckpointCreateResultSchema: z.ZodObject&lt;{ checkpointId: z.ZodString; disposition: z.ZodEnum&lt;["applied", "reused", "lease_unavailable"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; record: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.Zo...</code> | Runtime schema for Runtime Checkpoint Create Result. |
| `runtimeCheckpointLoadRequestDefinition` | constant | <code>const runtimeCheckpointLoadRequestDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointLoadRequest&gt;</code> | Runtime Checkpoint Load Request Definition constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointLoadRequestExample` | constant | <code>const runtimeCheckpointLoadRequestExample: RuntimeCheckpointLoadRequest</code> | Valid example value for Runtime Checkpoint Load Request. |
| `runtimeCheckpointLoadRequestJsonSchema` | constant | <code>const runtimeCheckpointLoadRequestJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Load Request. |
| `runtimeCheckpointLoadRequestSchema` | constant | <code>const runtimeCheckpointLoadRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: strin...</code> | Runtime schema for Runtime Checkpoint Load Request. |
| `runtimeCheckpointLoadResultDefinition` | constant | <code>const runtimeCheckpointLoadResultDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointLoadResult&gt;</code> | Runtime Checkpoint Load Result Definition constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointLoadResultExample` | constant | <code>const runtimeCheckpointLoadResultExample: RuntimeCheckpointLoadResult</code> | Valid example value for Runtime Checkpoint Load Result. |
| `runtimeCheckpointLoadResultJsonSchema` | constant | <code>const runtimeCheckpointLoadResultJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Load Result. |
| `runtimeCheckpointLoadResultSchema` | constant | <code>const runtimeCheckpointLoadResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: st...</code> | Runtime schema for Runtime Checkpoint Load Result. |
| `runtimeCheckpointPolicySpecDefinition` | constant | <code>const runtimeCheckpointPolicySpecDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointPolicySpec&gt;</code> | Runtime validation entrypoint for the Runtime Checkpoint Policy spec, combining its parser, example and JSON Schema. |
| `runtimeCheckpointPolicySpecExample` | constant | <code>const runtimeCheckpointPolicySpecExample: RuntimeCheckpointPolicySpec</code> | Valid example value for Runtime Checkpoint Policy Spec. |
| `runtimeCheckpointPolicySpecJsonSchema` | constant | <code>const runtimeCheckpointPolicySpecJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Policy Spec. |
| `runtimeCheckpointPolicySpecSchema` | constant | <code>const runtimeCheckpointPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]&gt;; everyNEvents: z.ZodOptional&lt;z.ZodNumber&gt;; retainLast: z.ZodOptional&lt;z.ZodNumber&gt;; persistWorkspaceSnapshot: z.ZodOptional&lt;z.ZodBoolean&gt;; persistContextRefs: z.ZodOptional&lt;z.ZodBoolean&gt;; compression: z.ZodOptional&lt;z.ZodEnum&lt;["none", "gzip", "zstd"]&gt;&gt;; }, "stri...</code> | Runtime schema for Runtime Checkpoint Policy Spec. |
| `runtimeCheckpointRecordDefinition` | constant | <code>const runtimeCheckpointRecordDefinition: SpecSchemaDefinition&lt;RuntimeCheckpointRecord&gt;</code> | Runtime Checkpoint Record Definition constant exported by the `contracts/runtime-checkpoint-schemas` module. |
| `runtimeCheckpointRecordExample` | constant | <code>const runtimeCheckpointRecordExample: RuntimeCheckpointRecord</code> | Valid example value for Runtime Checkpoint Record. |
| `runtimeCheckpointRecordJsonSchema` | constant | <code>const runtimeCheckpointRecordJsonSchema: JsonSchema</code> | JSON Schema for Runtime Checkpoint Record. |
| `runtimeCheckpointRecordSchema` | constant | <code>const runtimeCheckpointRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; un...</code> | Runtime schema for Runtime Checkpoint Record. |
| `validateRuntimeCheckpointCreateCommand` | function | <code>validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand</code> | Validate Runtime Checkpoint Create Command function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCheckpointCreateResult` | function | <code>validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult</code> | Validate Runtime Checkpoint Create Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCheckpointLoadRequest` | function | <code>validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest</code> | Validate Runtime Checkpoint Load Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCheckpointLoadResult` | function | <code>validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult</code> | Validate Runtime Checkpoint Load Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCheckpointPolicySpec` | function | <code>validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec</code> | Validate Runtime Checkpoint Policy Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateRuntimeCheckpointRecord` | function | <code>validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord</code> | Validate Runtime Checkpoint Record function with 1 public call signature; parameters and return types are listed below. |

## `runtimeCheckpointContractDefinitions`

Runtime Checkpoint Contract Definitions constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointContractDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointContractDefinitions: readonly [SpecSchemaDefinition<RuntimeCheckpointPolicySpec>, SpecSchemaDefinition<RuntimeCheckpointRecord>, SpecSchemaDefinition<RuntimeCheckpointCreateCommand>, SpecSchemaDefinition<RuntimeCheckpointCreateResult>, SpecSchemaDefinition<RuntimeCheckpointLoadRequest>, SpecSchemaDefinition<RuntimeCheckpointLoadResult>];
```

## `runtimeCheckpointContractJsonSchemas`

Runtime Checkpoint Contract JSON Schemas constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeCheckpointCreateCommandDefinition`

Runtime Checkpoint Create Command Definition constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointCreateCommandDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateCommandDefinition: SpecSchemaDefinition<RuntimeCheckpointCreateCommand>;
```

## `runtimeCheckpointCreateCommandExample`

Valid example value for Runtime Checkpoint Create Command.

- Kind: constant
- Import: `import { runtimeCheckpointCreateCommandExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateCommandExample: RuntimeCheckpointCreateCommand;
```

## `runtimeCheckpointCreateCommandJsonSchema`

JSON Schema for Runtime Checkpoint Create Command.

- Kind: constant
- Import: `import { runtimeCheckpointCreateCommandJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateCommandJsonSchema: JsonSchema;
```

## `runtimeCheckpointCreateCommandSchema`

Runtime schema for Runtime Checkpoint Create Command.

- Kind: constant
- Import: `import { runtimeCheckpointCreateCommandSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateCommandSchema: z.ZodObject<{ checkpointId: z.ZodString; scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; workflowRevision: z.ZodString; processHash: z.ZodString; variablesHash: z.ZodString; dependencySnapshotRef: z.ZodString; toolContractSnapshotRef: z.ZodOptional<z.ZodString>; workspaceSnapshotRef: z.ZodOptional<z.ZodString>; contextSnapshotRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; reason: z.ZodEnum<["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]>; createdAt: z.ZodString; idempotencyKey: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue>>>; }, "strict", z.ZodTypeAny, { reason: "manual" | "state_boundary" | "human_wait" | "signal_wait" | "timer_wait" | "failure"; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; createdAt: string; checkpointId: string; workflowRevision: string; processHash: string; variablesHash: string; dependencySnapshotRef: string; ownerId: string; leaseTtlMs: number; metadata?: Record<string, RuntimeJsonValue> | undefined; idempotencyKey?: string | undefined; toolContractSnapshotRef?: string | undefined; workspaceSnapshotRef?: string | undefined; contextSnapshotRefs?: string[] | undefined; }, { reason: "manual" | "state_boundary" | "human_wait" | "signal_wait" | "timer_wait" | "failure"; scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; createdAt: string; checkpointId: string; workflowRevision: string; processHash: string; variablesHash: string; dependencySnapshotRef: string; ownerId: string; leaseTtlMs: number; metadata?: Record<string, RuntimeJsonValue> | undefined; idempotencyKey?: string | undefined; toolContractSnapshotRef?: string | undefined; workspaceSnapshotRef?: string | undefined; contextSnapshotRefs?: string[] | undefined; }>;
```

## `runtimeCheckpointCreateResultDefinition`

Runtime Checkpoint Create Result Definition constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointCreateResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateResultDefinition: SpecSchemaDefinition<RuntimeCheckpointCreateResult>;
```

## `runtimeCheckpointCreateResultExample`

Valid example value for Runtime Checkpoint Create Result.

- Kind: constant
- Import: `import { runtimeCheckpointCreateResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateResultExample: RuntimeCheckpointCreateResult;
```

## `runtimeCheckpointCreateResultJsonSchema`

JSON Schema for Runtime Checkpoint Create Result.

- Kind: constant
- Import: `import { runtimeCheckpointCreateResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointCreateResultJsonSchema: JsonSchema;
```

## `runtimeCheckpointCreateResultSchema`

Runtime schema for Runtime Checkpoint Create Result.

- Kind: constant
- Import: `import { runtimeCheckpointCreateResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCheckpointCreateResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointCreateResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeCheckpointLoadRequestDefinition`

Runtime Checkpoint Load Request Definition constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointLoadRequestDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadRequestDefinition: SpecSchemaDefinition<RuntimeCheckpointLoadRequest>;
```

## `runtimeCheckpointLoadRequestExample`

Valid example value for Runtime Checkpoint Load Request.

- Kind: constant
- Import: `import { runtimeCheckpointLoadRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadRequestExample: RuntimeCheckpointLoadRequest;
```

## `runtimeCheckpointLoadRequestJsonSchema`

JSON Schema for Runtime Checkpoint Load Request.

- Kind: constant
- Import: `import { runtimeCheckpointLoadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadRequestJsonSchema: JsonSchema;
```

## `runtimeCheckpointLoadRequestSchema`

Runtime schema for Runtime Checkpoint Load Request.

- Kind: constant
- Import: `import { runtimeCheckpointLoadRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadRequestSchema: z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }, { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }>; checkpointId: z.ZodOptional<z.ZodString>; checkedAt: z.ZodString; }, "strict", z.ZodTypeAny, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; checkedAt: string; checkpointId?: string | undefined; }, { scope: { sessionId: string; runId: string; userId: string; workspaceId?: string | undefined; agentId?: string | undefined; tenantId?: string | undefined; }; checkedAt: string; checkpointId?: string | undefined; }>;
```

## `runtimeCheckpointLoadResultDefinition`

Runtime Checkpoint Load Result Definition constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointLoadResultDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadResultDefinition: SpecSchemaDefinition<RuntimeCheckpointLoadResult>;
```

## `runtimeCheckpointLoadResultExample`

Valid example value for Runtime Checkpoint Load Result.

- Kind: constant
- Import: `import { runtimeCheckpointLoadResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadResultExample: RuntimeCheckpointLoadResult;
```

## `runtimeCheckpointLoadResultJsonSchema`

JSON Schema for Runtime Checkpoint Load Result.

- Kind: constant
- Import: `import { runtimeCheckpointLoadResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointLoadResultJsonSchema: JsonSchema;
```

## `runtimeCheckpointLoadResultSchema`

Runtime schema for Runtime Checkpoint Load Result.

- Kind: constant
- Import: `import { runtimeCheckpointLoadResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCheckpointLoadResultSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointLoadResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `runtimeCheckpointPolicySpecDefinition`

Runtime validation entrypoint for the Runtime Checkpoint Policy spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { runtimeCheckpointPolicySpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointPolicySpecDefinition: SpecSchemaDefinition<RuntimeCheckpointPolicySpec>;
```

## `runtimeCheckpointPolicySpecExample`

Valid example value for Runtime Checkpoint Policy Spec.

- Kind: constant
- Import: `import { runtimeCheckpointPolicySpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointPolicySpecExample: RuntimeCheckpointPolicySpec;
```

## `runtimeCheckpointPolicySpecJsonSchema`

JSON Schema for Runtime Checkpoint Policy Spec.

- Kind: constant
- Import: `import { runtimeCheckpointPolicySpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointPolicySpecJsonSchema: JsonSchema;
```

## `runtimeCheckpointPolicySpecSchema`

Runtime schema for Runtime Checkpoint Policy Spec.

- Kind: constant
- Import: `import { runtimeCheckpointPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]>; everyNEvents: z.ZodOptional<z.ZodNumber>; retainLast: z.ZodOptional<z.ZodNumber>; persistWorkspaceSnapshot: z.ZodOptional<z.ZodBoolean>; persistContextRefs: z.ZodOptional<z.ZodBoolean>; compression: z.ZodOptional<z.ZodEnum<["none", "gzip", "zstd"]>>; }, "strict", z.ZodTypeAny, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }>, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }, { mode: "custom" | "state_boundary" | "none" | "every_n_events" | "wait_boundary"; everyNEvents?: number | undefined; retainLast?: number | undefined; persistWorkspaceSnapshot?: boolean | undefined; persistContextRefs?: boolean | undefined; compression?: "none" | "gzip" | "zstd" | undefined; }>;
```

## `runtimeCheckpointRecordDefinition`

Runtime Checkpoint Record Definition constant exported by the `contracts/runtime-checkpoint-schemas` module.

- Kind: constant
- Import: `import { runtimeCheckpointRecordDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointRecordDefinition: SpecSchemaDefinition<RuntimeCheckpointRecord>;
```

## `runtimeCheckpointRecordExample`

Valid example value for Runtime Checkpoint Record.

- Kind: constant
- Import: `import { runtimeCheckpointRecordExample } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointRecordExample: RuntimeCheckpointRecord;
```

## `runtimeCheckpointRecordJsonSchema`

JSON Schema for Runtime Checkpoint Record.

- Kind: constant
- Import: `import { runtimeCheckpointRecordJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare const runtimeCheckpointRecordJsonSchema: JsonSchema;
```

## `runtimeCheckpointRecordSchema`

Runtime schema for Runtime Checkpoint Record.

- Kind: constant
- Import: `import { runtimeCheckpointRecordSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const runtimeCheckpointRecordSchema: (typeof import('@codesoul-co/hypha-core'))['runtimeCheckpointRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `validateRuntimeCheckpointCreateCommand`

Validate Runtime Checkpoint Create Command function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointCreateCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand;
```

### Call signature

```text
validateRuntimeCheckpointCreateCommand(input: unknown): RuntimeCheckpointCreateCommand
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointCreateCommand`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCheckpointCreateResult`

Validate Runtime Checkpoint Create Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointCreateResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult;
```

### Call signature

```text
validateRuntimeCheckpointCreateResult(input: unknown): RuntimeCheckpointCreateResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointCreateResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCheckpointLoadRequest`

Validate Runtime Checkpoint Load Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointLoadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest;
```

### Call signature

```text
validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointLoadRequest`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCheckpointLoadResult`

Validate Runtime Checkpoint Load Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointLoadResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult;
```

### Call signature

```text
validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointLoadResult`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCheckpointPolicySpec`

Validate Runtime Checkpoint Policy Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec;
```

### Call signature

```text
validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointPolicySpec`
- Description: The return contract is defined by the type shown above.

## `validateRuntimeCheckpointRecord`

Validate Runtime Checkpoint Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRuntimeCheckpointRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-checkpoint-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint-schemas.ts)

### Declaration

```text
export declare function validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord;
```

### Call signature

```text
validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeCheckpointRecord`
- Description: The return contract is defined by the type shown above.
