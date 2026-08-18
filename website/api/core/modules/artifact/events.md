# `@codesoul-co/hypha-core` / `modules/artifact/events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)
- Exports: **16**

## Using this module

Use the Events module for creating, recording, or reading Event contracts. It exports 11 constants, 4 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  artifactEventJsonSchemas,
  artifactEventPayloadJsonSchema,
  artifactEventPayloadRequirements,
  artifactEventPayloadSchema,
  artifactEventPublicationJsonSchema,
  artifactEventPublicationSchema,
  artifactFrameworkEventEnvelopeSchema,
  artifactFrameworkEventExample,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactEventPayloadRequirement,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 11 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { artifactEventPayloadSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactEventPayloadSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactEventJsonSchemas` | constant | <code>const artifactEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Artifact Event JSON Schemas constant exported by the `modules/artifact/events` module. |
| `artifactEventPayloadJsonSchema` | constant | <code>const artifactEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for Artifact Event Payload. |
| `artifactEventPayloadRequirements` | constant | <code>const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", ...</code> | Artifact Event Payload Requirements constant exported by the `modules/artifact/events` module. |
| `artifactEventPayloadSchema` | constant | <code>const artifactEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; artifactId: z.ZodOptional&lt;z.ZodString&gt;; versionId: z.ZodOptional&lt;z.ZodString&gt;; logicalArtifactId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string ...</code> | Runtime schema for Artifact Event Payload. |
| `artifactEventPublicationJsonSchema` | constant | <code>const artifactEventPublicationJsonSchema: JsonSchema</code> | JSON Schema for Artifact Event Publication. |
| `artifactEventPublicationSchema` | constant | <code>const artifactEventPublicationSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artif...</code> | Runtime schema for Artifact Event Publication. |
| `artifactFrameworkEventEnvelopeSchema` | constant | <code>const artifactFrameworkEventEnvelopeSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", ...</code> | Runtime schema for Artifact Framework Event Envelope. |
| `artifactFrameworkEventExample` | constant | <code>const artifactFrameworkEventExample: ArtifactFrameworkEvent&lt;"artifact.created"&gt;</code> | Valid example value for Artifact Framework Event. |
| `artifactFrameworkEventJsonSchema` | constant | <code>const artifactFrameworkEventJsonSchema: JsonSchema</code> | JSON Schema for Artifact Framework Event. |
| `artifactFrameworkEventTypes` | constant | <code>const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.rec...</code> | Artifact Framework Event Types constant exported by the `modules/artifact/events` module. |
| `artifactFrameworkEventTypeSchema` | constant | <code>const artifactFrameworkEventTypeSchema: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.linea...</code> | Runtime schema for Artifact Framework Event Type. |
| `createArtifactFrameworkEvent` | function | <code>createArtifactFrameworkEvent&lt;TType extends ArtifactFrameworkEventType&gt;(input: ArtifactEventCreateInput&lt;TType&gt;): ArtifactFrameworkEvent&lt;TType&gt;</code> | Create Artifact Framework Event function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactEventPayloadForType` | function | <code>validateArtifactEventPayloadForType&lt;TType extends ArtifactFrameworkEventType&gt;(type: TType, input: unknown): ArtifactEventPayloadMap[TType]</code> | Validate Artifact Event Payload For Type function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactEventPublication` | function | <code>validateArtifactEventPublication(input: unknown): ArtifactEventPublication</code> | Validate Artifact Event Publication function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactFrameworkEvent` | function | <code>validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent</code> | Validate Artifact Framework Event function with 1 public call signature; parameters and return types are listed below. |
| `ArtifactEventPayloadRequirement` | interface | <code>interface ArtifactEventPayloadRequirement</code> | Artifact Event Payload Requirement interface with 5 public fields or methods. |

## `artifactEventJsonSchemas`

Artifact Event JSON Schemas constant exported by the `modules/artifact/events` module.

- Kind: constant
- Import: `import { artifactEventJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactEventJsonSchemas: Record<string, JsonSchema>;
```

## `artifactEventPayloadJsonSchema`

JSON Schema for Artifact Event Payload.

- Kind: constant
- Import: `import { artifactEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactEventPayloadJsonSchema: JsonSchema;
```

## `artifactEventPayloadRequirements`

Artifact Event Payload Requirements constant exported by the `modules/artifact/events` module.

- Kind: constant
- Import: `import { artifactEventPayloadRequirements } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", "artifactId", "versionId", "contentHash", "deduplicated"]; readonly deduplicated: true; }; readonly 'artifact.create.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'artifact.read.requested': { readonly required: readonly ["artifactId"]; }; readonly 'artifact.read.completed': { readonly required: readonly ["artifactId", "versionId", "contentHash", "sizeBytes"]; }; readonly 'artifact.version.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; }; readonly 'artifact.finalized': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "final"; }; readonly 'artifact.archived': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "archived"; }; readonly 'artifact.invalidated': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "invalidated"; }; readonly 'artifact.delete.requested': { readonly required: readonly ["operationId", "artifactId"]; }; readonly 'artifact.delete.blocked': { readonly required: readonly ["operationId", "artifactId", "error"]; readonly errorCodes: readonly ["ARTIFACT_DELETE_BLOCKED"]; }; readonly 'artifact.deleted': { readonly required: readonly ["operationId", "artifactId", "status"]; readonly status: "deleted"; }; readonly 'artifact.delete.failed': { readonly required: readonly ["operationId", "artifactId", "error"]; }; readonly 'artifact.lineage.recorded': { readonly required: readonly ["artifactId", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'artifact.retention.expired': { readonly required: readonly ["artifactId", "versionId"]; }; readonly 'artifact.gc.completed': { readonly required: readonly ["operationId", "candidateObjects", "deletedObjects", "missingObjects", "reclaimedBytes"]; }; readonly 'artifact.gc.failed': { readonly required: readonly ["operationId", "error"]; }; };
```

## `artifactEventPayloadSchema`

Runtime schema for Artifact Event Payload.

- Kind: constant
- Import: `import { artifactEventPayloadSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const artifactEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['artifactEventPayloadSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `artifactEventPublicationJsonSchema`

JSON Schema for Artifact Event Publication.

- Kind: constant
- Import: `import { artifactEventPublicationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactEventPublicationJsonSchema: JsonSchema;
```

## `artifactEventPublicationSchema`

Runtime schema for Artifact Event Publication.

- Kind: constant
- Import: `import { artifactEventPublicationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactEventPublicationSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>; timestamp: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; payload: z.ZodEffects<z.ZodUnknown, {} | null, unknown>; }, "strict", z.ZodTypeAny, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; timestamp: string; payload: {} | null; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; agentId?: string | undefined; }, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; timestamp: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; agentId?: string | undefined; payload?: unknown; }>;
```

## `artifactFrameworkEventEnvelopeSchema`

Runtime schema for Artifact Framework Event Envelope.

- Kind: constant
- Import: `import { artifactFrameworkEventEnvelopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactFrameworkEventEnvelopeSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodString; stepId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; fsmState: z.ZodOptional<z.ZodString>; timestamp: z.ZodString; payload: z.ZodEffects<z.ZodUnknown, {} | null, unknown>; metadata: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>; }, "strict", z.ZodTypeAny, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; runId: string; timestamp: string; payload: {} | null; workspaceId?: string | undefined; metadata?: Record<string, unknown> | undefined; sessionId?: string | undefined; stepId?: string | undefined; agentId?: string | undefined; fsmState?: string | undefined; }, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; runId: string; timestamp: string; workspaceId?: string | undefined; metadata?: Record<string, unknown> | undefined; sessionId?: string | undefined; stepId?: string | undefined; agentId?: string | undefined; fsmState?: string | undefined; payload?: unknown; }>;
```

## `artifactFrameworkEventExample`

Valid example value for Artifact Framework Event.

- Kind: constant
- Import: `import { artifactFrameworkEventExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactFrameworkEventExample: ArtifactFrameworkEvent<"artifact.created">;
```

## `artifactFrameworkEventJsonSchema`

JSON Schema for Artifact Framework Event.

- Kind: constant
- Import: `import { artifactFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactFrameworkEventJsonSchema: JsonSchema;
```

## `artifactFrameworkEventTypes`

Artifact Framework Event Types constant exported by the `modules/artifact/events` module.

- Kind: constant
- Import: `import { artifactFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"];
```

## `artifactFrameworkEventTypeSchema`

Runtime schema for Artifact Framework Event Type.

- Kind: constant
- Import: `import { artifactFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare const artifactFrameworkEventTypeSchema: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>;
```

## `createArtifactFrameworkEvent`

Create Artifact Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare function createArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType>(input: ArtifactEventCreateInput<TType>): ArtifactFrameworkEvent<TType>;
```

### Call signature

```text
createArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType>(input: ArtifactEventCreateInput<TType>): ArtifactFrameworkEvent<TType>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ArtifactEventCreateInput&lt;TType&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactFrameworkEvent<TType>`
- Description: The return contract is defined by the type shown above.

## `validateArtifactEventPayloadForType`

Validate Artifact Event Payload For Type function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactEventPayloadForType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare function validateArtifactEventPayloadForType<TType extends ArtifactFrameworkEventType>(type: TType, input: unknown): ArtifactEventPayloadMap[TType];
```

### Call signature

```text
validateArtifactEventPayloadForType<TType extends ArtifactFrameworkEventType>(type: TType, input: unknown): ArtifactEventPayloadMap[TType]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactEventPayloadMap[TType]`
- Description: The return contract is defined by the type shown above.

## `validateArtifactEventPublication`

Validate Artifact Event Publication function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactEventPublication } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare function validateArtifactEventPublication(input: unknown): ArtifactEventPublication;
```

### Call signature

```text
validateArtifactEventPublication(input: unknown): ArtifactEventPublication
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactEventPublication`
- Description: The return contract is defined by the type shown above.

## `validateArtifactFrameworkEvent`

Validate Artifact Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export declare function validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent;
```

### Call signature

```text
validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactFrameworkEvent`
- Description: The return contract is defined by the type shown above.

## `ArtifactEventPayloadRequirement`

Artifact Event Payload Requirement interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactEventPayloadRequirement } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### Declaration

```text
export interface ArtifactEventPayloadRequirement {
    required: readonly (keyof ArtifactEventPayload)[];
    status?: ArtifactEventPayload['status'];
    deduplicated?: true;
    nonEmptyArtifactRefs?: boolean;
    errorCodes?: readonly string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deduplicated` | property | <code>deduplicated?: true</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `errorCodes` | property | <code>errorCodes?: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nonEmptyArtifactRefs` | property | <code>nonEmptyArtifactRefs?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required: readonly (keyof ArtifactEventPayload)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").ArtifactStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
