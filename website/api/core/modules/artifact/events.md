# `@codesoul-co/hypha-core` / `modules/artifact/events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactEventJsonSchemas` | constant | <code>const artifactEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | artifact Event Json Schemas constant exported by the `modules/artifact/events` module. |
| `artifactEventPayloadJsonSchema` | constant | <code>const artifactEventPayloadJsonSchema: JsonSchema</code> | JSON Schema for artifact Event Payload. |
| `artifactEventPayloadRequirements` | constant | <code>const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", ...</code> | artifact Event Payload Requirements constant exported by the `modules/artifact/events` module. |
| `artifactEventPayloadSchema` | constant | <code>const artifactEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; artifactId: z.ZodOptional&lt;z.ZodString&gt;; versionId: z.ZodOptional&lt;z.ZodString&gt;; logicalArtifactId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string ...</code> | Runtime schema for artifact Event Payload. |
| `artifactEventPublicationJsonSchema` | constant | <code>const artifactEventPublicationJsonSchema: JsonSchema</code> | JSON Schema for artifact Event Publication. |
| `artifactEventPublicationSchema` | constant | <code>const artifactEventPublicationSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artif...</code> | Runtime schema for artifact Event Publication. |
| `artifactFrameworkEventEnvelopeSchema` | constant | <code>const artifactFrameworkEventEnvelopeSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", ...</code> | Runtime schema for artifact Framework Event Envelope. |
| `artifactFrameworkEventExample` | constant | <code>const artifactFrameworkEventExample: ArtifactFrameworkEvent&lt;"artifact.created"&gt;</code> | Valid example value for artifact Framework Event. |
| `artifactFrameworkEventJsonSchema` | constant | <code>const artifactFrameworkEventJsonSchema: JsonSchema</code> | JSON Schema for artifact Framework Event. |
| `artifactFrameworkEventTypes` | constant | <code>const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.rec...</code> | artifact Framework Event Types constant exported by the `modules/artifact/events` module. |
| `artifactFrameworkEventTypeSchema` | constant | <code>const artifactFrameworkEventTypeSchema: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.linea...</code> | Runtime schema for artifact Framework Event Type. |
| `createArtifactFrameworkEvent` | function | <code>createArtifactFrameworkEvent&lt;TType extends ArtifactFrameworkEventType&gt;(input: ArtifactEventCreateInput&lt;TType&gt;): ArtifactFrameworkEvent&lt;TType&gt;</code> | Creates Artifact Framework Event at this module boundary. |
| `validateArtifactEventPayloadForType` | function | <code>validateArtifactEventPayloadForType&lt;TType extends ArtifactFrameworkEventType&gt;(type: TType, input: unknown): ArtifactEventPayloadMap[TType]</code> | Validates Artifact Event Payload For Type at this module boundary. |
| `validateArtifactEventPublication` | function | <code>validateArtifactEventPublication(input: unknown): ArtifactEventPublication</code> | Validates Artifact Event Publication at this module boundary. |
| `validateArtifactFrameworkEvent` | function | <code>validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent</code> | Validates Artifact Framework Event at this module boundary. |
| `ArtifactEventPayloadRequirement` | interface | <code>interface ArtifactEventPayloadRequirement</code> | Field contract for Artifact Event Payload Requirement; see all contract members below. |

## `ArtifactEventPayloadRequirement` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deduplicated` | property | <code>deduplicated: true</code> | Public deduplicated property. |
| `errorCodes` | property | <code>errorCodes: readonly string[]</code> | Public error Codes property. |
| `nonEmptyArtifactRefs` | property | <code>nonEmptyArtifactRefs: boolean</code> | Public non Empty Artifact Refs property. |
| `required` | property | <code>required: readonly (keyof ArtifactEventPayload)[]</code> | Public required property. |
| `status` | property | <code>status: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").ArtifactStatus</code> | Public status property. |
