# `@codesoul-co/hypha-core` / `modules/workspace/events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/workspace/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)
- Exports: **9**

## Using this module

Use the Events module for declaring and enforcing workspace scope boundaries. It exports 6 constants, 3 functions.

### Import from the package entrypoint

```ts
import {
  workspaceEventJsonSchemas,
  workspaceEventPayloadRequirements,
  workspaceFrameworkEventExample,
  workspaceFrameworkEventJsonSchema,
  workspaceFrameworkEventTypes,
  workspaceFrameworkEventTypeSchema,
  createWorkspaceFrameworkEvent,
  validateWorkspaceEventPayloadForType,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 6 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { workspaceFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceFrameworkEventTypeSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workspaceEventJsonSchemas` | constant | <code>const workspaceEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Workspace Event JSON Schemas constant exported by the `modules/workspace/events` module. |
| `workspaceEventPayloadRequirements` | constant | <code>const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: reado...</code> | Workspace Event Payload Requirements constant exported by the `modules/workspace/events` module. |
| `workspaceFrameworkEventExample` | constant | <code>const workspaceFrameworkEventExample: WorkspaceFrameworkEvent&lt;"workspace.ready"&gt;</code> | Valid example value for Workspace Framework Event. |
| `workspaceFrameworkEventJsonSchema` | constant | <code>const workspaceFrameworkEventJsonSchema: JsonSchema</code> | JSON Schema for Workspace Framework Event. |
| `workspaceFrameworkEventTypes` | constant | <code>const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "wor...</code> | Workspace Framework Event Types constant exported by the `modules/workspace/events` module. |
| `workspaceFrameworkEventTypeSchema` | constant | <code>const workspaceFrameworkEventTypeSchema: z.ZodEnum&lt;["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked"...</code> | Runtime schema for Workspace Framework Event Type. |
| `createWorkspaceFrameworkEvent` | function | <code>createWorkspaceFrameworkEvent&lt;TType extends WorkspaceFrameworkEventType&gt;(input: WorkspaceEventCreateInput&lt;TType&gt;): WorkspaceFrameworkEvent&lt;TType&gt;</code> | Create Workspace Framework Event function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceEventPayloadForType` | function | <code>validateWorkspaceEventPayloadForType&lt;TType extends WorkspaceFrameworkEventType&gt;(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]</code> | Validate Workspace Event Payload For Type function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkspaceFrameworkEvent` | function | <code>validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent</code> | Validate Workspace Framework Event function with 1 public call signature; parameters and return types are listed below. |

## `workspaceEventJsonSchemas`

Workspace Event JSON Schemas constant exported by the `modules/workspace/events` module.

- Kind: constant
- Import: `import { workspaceEventJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceEventJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceEventPayloadRequirements`

Workspace Event Payload Requirements constant exported by the `modules/workspace/events` module.

- Kind: constant
- Import: `import { workspaceEventPayloadRequirements } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: readonly ["operationId", "status"]; readonly status: "busy"; }; readonly 'workspace.path.resolved': { readonly required: readonly ["operationId"]; }; readonly 'workspace.path.denied': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.quota.exceeded': { readonly required: readonly ["operationId"]; readonly atLeastOne: readonly ["bytes", "files"]; }; readonly 'workspace.snapshot.requested': { readonly required: readonly ["operationId"]; }; readonly 'workspace.snapshot.created': { readonly required: readonly ["operationId", "snapshotManifestHash", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'workspace.snapshot.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.restore.requested': { readonly required: readonly ["operationId", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'workspace.restored': { readonly required: readonly ["operationId", "workspaceSnapshotHash"]; }; readonly 'workspace.restore.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.patch.checked': { readonly required: readonly ["operationId"]; }; readonly 'workspace.patch.applied': { readonly required: readonly ["operationId", "workspaceSnapshotHash"]; }; readonly 'workspace.patch.conflict': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.started': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.completed': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.failed': { readonly required: readonly ["operationId", "error"]; }; };
```

## `workspaceFrameworkEventExample`

Valid example value for Workspace Framework Event.

- Kind: constant
- Import: `import { workspaceFrameworkEventExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceFrameworkEventExample: WorkspaceFrameworkEvent<"workspace.ready">;
```

## `workspaceFrameworkEventJsonSchema`

JSON Schema for Workspace Framework Event.

- Kind: constant
- Import: `import { workspaceFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceFrameworkEventJsonSchema: JsonSchema;
```

## `workspaceFrameworkEventTypes`

Workspace Framework Event Types constant exported by the `modules/workspace/events` module.

- Kind: constant
- Import: `import { workspaceFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "workspace.patch.applied", "workspace.patch.conflict", "workspace.cleanup.started", "workspace.cleanup.completed", "workspace.cleanup.failed"];
```

## `workspaceFrameworkEventTypeSchema`

Runtime schema for Workspace Framework Event Type.

- Kind: constant
- Import: `import { workspaceFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare const workspaceFrameworkEventTypeSchema: z.ZodEnum<["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "workspace.patch.applied", "workspace.patch.conflict", "workspace.cleanup.started", "workspace.cleanup.completed", "workspace.cleanup.failed"]>;
```

## `createWorkspaceFrameworkEvent`

Create Workspace Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createWorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare function createWorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType>(input: WorkspaceEventCreateInput<TType>): WorkspaceFrameworkEvent<TType>;
```

### Call signature

```text
createWorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType>(input: WorkspaceEventCreateInput<TType>): WorkspaceFrameworkEvent<TType>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>WorkspaceEventCreateInput&lt;TType&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceFrameworkEvent<TType>`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceEventPayloadForType`

Validate Workspace Event Payload For Type function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceEventPayloadForType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare function validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(type: TType, input: unknown): WorkspaceEventPayloadMap[TType];
```

### Call signature

```text
validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceEventPayloadMap[TType]`
- Description: The return contract is defined by the type shown above.

## `validateWorkspaceFrameworkEvent`

Validate Workspace Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### Declaration

```text
export declare function validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent;
```

### Call signature

```text
validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkspaceFrameworkEvent`
- Description: The return contract is defined by the type shown above.
