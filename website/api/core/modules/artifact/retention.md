# `@codesoul-co/hypha-core` / `modules/artifact/retention`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactRetentionEvaluator` | class | <code>new DefaultArtifactRetentionEvaluator(): DefaultArtifactRetentionEvaluator</code> | Runtime implementation for Default Artifact Retention Evaluator; see its public constructor and members below. |
| `DefaultArtifactRetentionProcessor` | class | <code>new DefaultArtifactRetentionProcessor(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Runtime implementation for Default Artifact Retention Processor; see its public constructor and members below. |
| `artifactRetentionContractJsonSchemas` | constant | <code>const artifactRetentionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | artifact Retention Contract Json Schemas constant exported by the `modules/artifact/retention` module. |
| `artifactRetentionDecisionJsonSchema` | constant | <code>const artifactRetentionDecisionJsonSchema: JsonSchema</code> | JSON Schema for artifact Retention Decision. |
| `artifactRetentionDecisionSchema` | constant | <code>const artifactRetentionDecisionSchema: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { reason: "expired" &#124; "already_terminal" &#124; "not_due" &#124; "archive_after" &#124; "delete_after...</code> | Runtime schema for artifact Retention Decision. |
| `artifactRetentionEvaluationRequestJsonSchema` | constant | <code>const artifactRetentionEvaluationRequestJsonSchema: JsonSchema</code> | JSON Schema for artifact Retention Evaluation Request. |
| `artifactRetentionEvaluationRequestSchema` | constant | <code>const artifactRetentionEvaluationRequestSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: ...</code> | Runtime schema for artifact Retention Evaluation Request. |
| `artifactRetentionProcessRequestJsonSchema` | constant | <code>const artifactRetentionProcessRequestJsonSchema: JsonSchema</code> | JSON Schema for artifact Retention Process Request. |
| `artifactRetentionProcessRequestSchema` | constant | <code>const artifactRetentionProcessRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadat...</code> | Runtime schema for artifact Retention Process Request. |
| `artifactRetentionProcessResultJsonSchema` | constant | <code>const artifactRetentionProcessResultJsonSchema: JsonSchema</code> | JSON Schema for artifact Retention Process Result. |
| `artifactRetentionProcessResultSchema` | constant | <code>const artifactRetentionProcessResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodStrin...</code> | Runtime schema for artifact Retention Process Result. |
| `validateArtifactRetentionEvaluationRequest` | function | <code>validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest</code> | Validates Artifact Retention Evaluation Request at this module boundary. |
| `validateArtifactRetentionProcessRequest` | function | <code>validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest</code> | Validates Artifact Retention Process Request at this module boundary. |
| `validateArtifactRetentionProcessResult` | function | <code>validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult</code> | Validates Artifact Retention Process Result at this module boundary. |

## `DefaultArtifactRetentionEvaluator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultArtifactRetentionEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | Evaluates evaluate at this module boundary. |

## `DefaultArtifactRetentionProcessor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Creates an instance of this class. |
| `process` | method | <code>process(input: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public runtime operation for process. |
