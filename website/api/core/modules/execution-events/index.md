# `@codesoul-co/hypha-core` / `modules/execution-events/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-events/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)
- Exports: **22**

## Using this module

Use the Index module for creating, recording, or reading Event contracts. It exports 19 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  commandExecutionEventExample,
  commandExecutionEventPayloadJsonSchema,
  commandExecutionEventPayloadSchema,
  commandExecutionFrameworkEventTypes,
  executionEventJsonSchemas,
  executionEventPayloadBaseJsonSchema,
  executionEventPayloadBaseSchema,
  executionFrameworkEventEnvelopeSchema,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 19 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { commandExecutionEventPayloadSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = commandExecutionEventPayloadSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandExecutionEventExample` | constant | <code>const commandExecutionEventExample: ExecutionFrameworkEvent&lt;"command.execution.completed"&gt;</code> | Valid example value for Command Execution Event. |
| `commandExecutionEventPayloadJsonSchema` | constant | <code>const commandExecutionEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for Command Execution Event Payload. |
| `commandExecutionEventPayloadSchema` | constant | <code>const commandExecutionEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString...</code> | Runtime schema for Command Execution Event Payload. |
| `commandExecutionFrameworkEventTypes` | constant | <code>const commandExecutionFrameworkEventTypes: readonly ["command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cance...</code> | Command Execution Framework Event Types constant exported by the `modules/execution-events/index` module. |
| `executionEventJsonSchemas` | constant | <code>const executionEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Event JSON Schemas constant exported by the `modules/execution-events/index` module. |
| `executionEventPayloadBaseJsonSchema` | constant | <code>const executionEventPayloadBaseJsonSchema: JsonSchema</code> | JSON Schema for Execution Event Payload Base. |
| `executionEventPayloadBaseSchema` | constant | <code>const executionEventPayloadBaseSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs...</code> | Runtime schema for Execution Event Payload Base. |
| `executionFrameworkEventEnvelopeSchema` | constant | <code>const executionFrameworkEventEnvelopeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required",...</code> | Runtime schema for Execution Framework Event Envelope. |
| `executionFrameworkEventJsonSchema` | constant | <code>const executionFrameworkEventJsonSchema: JsonSchema</code> | JSON Schema for Execution Framework Event. |
| `executionFrameworkEventTypes` | constant | <code>const executionFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "c...</code> | Execution Framework Event Types constant exported by the `modules/execution-events/index` module. |
| `executionFrameworkEventTypeSchema` | constant | <code>const executionFrameworkEventTypeSchema: z.ZodEnum&lt;["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.starte...</code> | Runtime schema for Execution Framework Event Type. |
| `networkAuthorizationEventExample` | constant | <code>const networkAuthorizationEventExample: ExecutionFrameworkEvent&lt;"network.authorization.granted"&gt;</code> | Valid example value for Network Authorization Event. |
| `networkAuthorizationEventPayloadJsonSchema` | constant | <code>const networkAuthorizationEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for Network Authorization Event Payload. |
| `networkAuthorizationEventPayloadSchema` | constant | <code>const networkAuthorizationEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; sandboxId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artif...</code> | Runtime schema for Network Authorization Event Payload. |
| `networkAuthorizationFrameworkEventTypes` | constant | <code>const networkAuthorizationFrameworkEventTypes: readonly ["network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"]</code> | Network Authorization Framework Event Types constant exported by the `modules/execution-events/index` module. |
| `sandboxFrameworkEventTypes` | constant | <code>const sandboxFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed"]</code> | Sandbox Framework Event Types constant exported by the `modules/execution-events/index` module. |
| `sandboxLifecycleEventExample` | constant | <code>const sandboxLifecycleEventExample: ExecutionFrameworkEvent&lt;"sandbox.ready"&gt;</code> | Valid example value for Sandbox Lifecycle Event. |
| `sandboxLifecycleEventPayloadJsonSchema` | constant | <code>const sandboxLifecycleEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for Sandbox Lifecycle Event Payload. |
| `sandboxLifecycleEventPayloadSchema` | constant | <code>const sandboxLifecycleEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; environmentId: z.ZodOptional&lt;z.ZodString&gt;; environmentRevision: z.ZodOptional&lt;z.ZodString&gt;; commandHash: z.ZodOptional&lt;z.ZodString&gt;; sourceTreeHash: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for Sandbox Lifecycle Event Payload. |
| `createExecutionFrameworkEvent` | function | <code>createExecutionFrameworkEvent&lt;TType extends ExecutionFrameworkEventType&gt;(input: ExecutionEventCreateInput&lt;TType&gt;): ExecutionFrameworkEvent&lt;TType&gt;</code> | Create Execution Framework Event function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionEventPayload` | function | <code>validateExecutionEventPayload&lt;TType extends ExecutionFrameworkEventType&gt;(type: TType, input: unknown): ExecutionEventPayloadMap[TType]</code> | Validate Execution Event Payload function with 1 public call signature; parameters and return types are listed below. |
| `validateExecutionFrameworkEvent` | function | <code>validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent</code> | Validate Execution Framework Event function with 1 public call signature; parameters and return types are listed below. |

## `commandExecutionEventExample`

Valid example value for Command Execution Event.

- Kind: constant
- Import: `import { commandExecutionEventExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const commandExecutionEventExample: ExecutionFrameworkEvent<"command.execution.completed">;
```

## `commandExecutionEventPayloadJsonSchema`

JSON Schema for Command Execution Event Payload.

- Kind: constant
- Import: `import { commandExecutionEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const commandExecutionEventPayloadJsonSchema: JsonSchema;
```

## `commandExecutionEventPayloadSchema`

Runtime schema for Command Execution Event Payload.

- Kind: constant
- Import: `import { commandExecutionEventPayloadSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const commandExecutionEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['commandExecutionEventPayloadSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `commandExecutionFrameworkEventTypes`

Command Execution Framework Event Types constant exported by the `modules/execution-events/index` module.

- Kind: constant
- Import: `import { commandExecutionFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const commandExecutionFrameworkEventTypes: readonly ["command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered"];
```

## `executionEventJsonSchemas`

Execution Event JSON Schemas constant exported by the `modules/execution-events/index` module.

- Kind: constant
- Import: `import { executionEventJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const executionEventJsonSchemas: Record<string, JsonSchema>;
```

## `executionEventPayloadBaseJsonSchema`

JSON Schema for Execution Event Payload Base.

- Kind: constant
- Import: `import { executionEventPayloadBaseJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const executionEventPayloadBaseJsonSchema: JsonSchema;
```

## `executionEventPayloadBaseSchema`

Runtime schema for Execution Event Payload Base.

- Kind: constant
- Import: `import { executionEventPayloadBaseSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionEventPayloadBaseSchema: (typeof import('@codesoul-co/hypha-core'))['executionEventPayloadBaseSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionFrameworkEventEnvelopeSchema`

Runtime schema for Execution Framework Event Envelope.

- Kind: constant
- Import: `import { executionFrameworkEventEnvelopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionFrameworkEventEnvelopeSchema: (typeof import('@codesoul-co/hypha-core'))['executionFrameworkEventEnvelopeSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionFrameworkEventJsonSchema`

JSON Schema for Execution Framework Event.

- Kind: constant
- Import: `import { executionFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const executionFrameworkEventJsonSchema: JsonSchema;
```

## `executionFrameworkEventTypes`

Execution Framework Event Types constant exported by the `modules/execution-events/index` module.

- Kind: constant
- Import: `import { executionFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const executionFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered", "network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"];
```

## `executionFrameworkEventTypeSchema`

Runtime schema for Execution Framework Event Type.

- Kind: constant
- Import: `import { executionFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const executionFrameworkEventTypeSchema: z.ZodEnum<["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed", "command.execution.requested", "command.execution.validated", "command.execution.approval.required", "command.execution.queued", "command.execution.started", "command.execution.output.truncated", "command.execution.resource.exceeded", "command.execution.oom_killed", "command.execution.timeout", "command.execution.cancellation.requested", "command.execution.cancelled", "command.execution.completed", "command.execution.failed", "command.execution.result.unknown", "command.execution.recovered", "network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"]>;
```

## `networkAuthorizationEventExample`

Valid example value for Network Authorization Event.

- Kind: constant
- Import: `import { networkAuthorizationEventExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const networkAuthorizationEventExample: ExecutionFrameworkEvent<"network.authorization.granted">;
```

## `networkAuthorizationEventPayloadJsonSchema`

JSON Schema for Network Authorization Event Payload.

- Kind: constant
- Import: `import { networkAuthorizationEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const networkAuthorizationEventPayloadJsonSchema: JsonSchema;
```

## `networkAuthorizationEventPayloadSchema`

Runtime schema for Network Authorization Event Payload.

- Kind: constant
- Import: `import { networkAuthorizationEventPayloadSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const networkAuthorizationEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['networkAuthorizationEventPayloadSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `networkAuthorizationFrameworkEventTypes`

Network Authorization Framework Event Types constant exported by the `modules/execution-events/index` module.

- Kind: constant
- Import: `import { networkAuthorizationFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const networkAuthorizationFrameworkEventTypes: readonly ["network.authorization.requested", "network.authorization.granted", "network.authorization.denied", "network.authorization.revoked"];
```

## `sandboxFrameworkEventTypes`

Sandbox Framework Event Types constant exported by the `modules/execution-events/index` module.

- Kind: constant
- Import: `import { sandboxFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const sandboxFrameworkEventTypes: readonly ["sandbox.create.requested", "sandbox.created", "sandbox.started", "sandbox.ready", "sandbox.degraded", "sandbox.terminate.requested", "sandbox.terminated", "sandbox.cleanup.completed", "sandbox.cleanup.failed"];
```

## `sandboxLifecycleEventExample`

Valid example value for Sandbox Lifecycle Event.

- Kind: constant
- Import: `import { sandboxLifecycleEventExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const sandboxLifecycleEventExample: ExecutionFrameworkEvent<"sandbox.ready">;
```

## `sandboxLifecycleEventPayloadJsonSchema`

JSON Schema for Sandbox Lifecycle Event Payload.

- Kind: constant
- Import: `import { sandboxLifecycleEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare const sandboxLifecycleEventPayloadJsonSchema: JsonSchema;
```

## `sandboxLifecycleEventPayloadSchema`

Runtime schema for Sandbox Lifecycle Event Payload.

- Kind: constant
- Import: `import { sandboxLifecycleEventPayloadSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxLifecycleEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxLifecycleEventPayloadSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `createExecutionFrameworkEvent`

Create Execution Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare function createExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType>(input: ExecutionEventCreateInput<TType>): ExecutionFrameworkEvent<TType>;
```

### Call signature

```text
createExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType>(input: ExecutionEventCreateInput<TType>): ExecutionFrameworkEvent<TType>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ExecutionEventCreateInput&lt;TType&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionFrameworkEvent<TType>`
- Description: The return contract is defined by the type shown above.

## `validateExecutionEventPayload`

Validate Execution Event Payload function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare function validateExecutionEventPayload<TType extends ExecutionFrameworkEventType>(type: TType, input: unknown): ExecutionEventPayloadMap[TType];
```

### Call signature

```text
validateExecutionEventPayload<TType extends ExecutionFrameworkEventType>(type: TType, input: unknown): ExecutionEventPayloadMap[TType]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionEventPayloadMap[TType]`
- Description: The return contract is defined by the type shown above.

## `validateExecutionFrameworkEvent`

Validate Execution Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-events/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-events/index.ts)

### Declaration

```text
export declare function validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent;
```

### Call signature

```text
validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionFrameworkEvent`
- Description: The return contract is defined by the type shown above.
