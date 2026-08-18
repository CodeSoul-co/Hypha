# `@codesoul-co/hypha-core` / `modules/artifact/events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactEventJsonSchemas` | 常量 | <code>const artifactEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/events` 模块导出的 artifact Event Json Schemas 常量。 |
| `artifactEventPayloadJsonSchema` | 常量 | <code>const artifactEventPayloadJsonSchema: JsonSchema</code> | artifact Event Payload 的 JSON Schema。 |
| `artifactEventPayloadRequirements` | 常量 | <code>const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", ...</code> | 由 `modules/artifact/events` 模块导出的 artifact Event Payload Requirements 常量。 |
| `artifactEventPayloadSchema` | 常量 | <code>const artifactEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; artifactId: z.ZodOptional&lt;z.ZodString&gt;; versionId: z.ZodOptional&lt;z.ZodString&gt;; logicalArtifactId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string ...</code> | artifact Event Payload 的运行时 Schema。 |
| `artifactEventPublicationJsonSchema` | 常量 | <code>const artifactEventPublicationJsonSchema: JsonSchema</code> | artifact Event Publication 的 JSON Schema。 |
| `artifactEventPublicationSchema` | 常量 | <code>const artifactEventPublicationSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artif...</code> | artifact Event Publication 的运行时 Schema。 |
| `artifactFrameworkEventEnvelopeSchema` | 常量 | <code>const artifactFrameworkEventEnvelopeSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", ...</code> | artifact Framework Event Envelope 的运行时 Schema。 |
| `artifactFrameworkEventExample` | 常量 | <code>const artifactFrameworkEventExample: ArtifactFrameworkEvent&lt;"artifact.created"&gt;</code> | artifact Framework Event 的有效示例值。 |
| `artifactFrameworkEventJsonSchema` | 常量 | <code>const artifactFrameworkEventJsonSchema: JsonSchema</code> | artifact Framework Event 的 JSON Schema。 |
| `artifactFrameworkEventTypes` | 常量 | <code>const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.rec...</code> | 由 `modules/artifact/events` 模块导出的 artifact Framework Event Types 常量。 |
| `artifactFrameworkEventTypeSchema` | 常量 | <code>const artifactFrameworkEventTypeSchema: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.linea...</code> | artifact Framework Event Type 的运行时 Schema。 |
| `createArtifactFrameworkEvent` | 函数 | <code>createArtifactFrameworkEvent&lt;TType extends ArtifactFrameworkEventType&gt;(input: ArtifactEventCreateInput&lt;TType&gt;): ArtifactFrameworkEvent&lt;TType&gt;</code> | 创建 Artifact Framework Event。 |
| `validateArtifactEventPayloadForType` | 函数 | <code>validateArtifactEventPayloadForType&lt;TType extends ArtifactFrameworkEventType&gt;(type: TType, input: unknown): ArtifactEventPayloadMap[TType]</code> | 校验 Artifact Event Payload For Type。 |
| `validateArtifactEventPublication` | 函数 | <code>validateArtifactEventPublication(input: unknown): ArtifactEventPublication</code> | 校验 Artifact Event Publication。 |
| `validateArtifactFrameworkEvent` | 函数 | <code>validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent</code> | 校验 Artifact Framework Event。 |
| `ArtifactEventPayloadRequirement` | 接口 | <code>interface ArtifactEventPayloadRequirement</code> | Artifact Event Payload Requirement 的字段契约；完整字段见下表。 |

## `ArtifactEventPayloadRequirement` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deduplicated` | 属性 | <code>deduplicated: true</code> | deduplicated 字段。 |
| `errorCodes` | 属性 | <code>errorCodes: readonly string[]</code> | error Codes 字段。 |
| `nonEmptyArtifactRefs` | 属性 | <code>nonEmptyArtifactRefs: boolean</code> | non Empty Artifact Refs 字段。 |
| `required` | 属性 | <code>required: readonly (keyof ArtifactEventPayload)[]</code> | required 字段。 |
| `status` | 属性 | <code>status: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").ArtifactStatus</code> | status 字段。 |
