# `@codesoul-co/hypha-core` / `modules/artifact/retention`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/retention.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactRetentionEvaluator` | 类 | <code>new DefaultArtifactRetentionEvaluator(): DefaultArtifactRetentionEvaluator</code> | Default Artifact Retention Evaluator 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultArtifactRetentionProcessor` | 类 | <code>new DefaultArtifactRetentionProcessor(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | Default Artifact Retention Processor 的运行时实现；公开构造函数与成员见下表。 |
| `artifactRetentionContractJsonSchemas` | 常量 | <code>const artifactRetentionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/retention` 模块导出的 artifact Retention Contract Json Schemas 常量。 |
| `artifactRetentionDecisionJsonSchema` | 常量 | <code>const artifactRetentionDecisionJsonSchema: JsonSchema</code> | artifact Retention Decision 的 JSON Schema。 |
| `artifactRetentionDecisionSchema` | 常量 | <code>const artifactRetentionDecisionSchema: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { reason: "expired" &#124; "already_terminal" &#124; "not_due" &#124; "archive_after" &#124; "delete_after...</code> | artifact Retention Decision 的运行时 Schema。 |
| `artifactRetentionEvaluationRequestJsonSchema` | 常量 | <code>const artifactRetentionEvaluationRequestJsonSchema: JsonSchema</code> | artifact Retention Evaluation Request 的 JSON Schema。 |
| `artifactRetentionEvaluationRequestSchema` | 常量 | <code>const artifactRetentionEvaluationRequestSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; versionNumber: z.ZodNumber; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; sessionId: z.ZodOptional&lt;z.ZodString&gt;; runId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodString; description: ...</code> | artifact Retention Evaluation Request 的运行时 Schema。 |
| `artifactRetentionProcessRequestJsonSchema` | 常量 | <code>const artifactRetentionProcessRequestJsonSchema: JsonSchema</code> | artifact Retention Process Request 的 JSON Schema。 |
| `artifactRetentionProcessRequestSchema` | 常量 | <code>const artifactRetentionProcessRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadat...</code> | artifact Retention Process Request 的运行时 Schema。 |
| `artifactRetentionProcessResultJsonSchema` | 常量 | <code>const artifactRetentionProcessResultJsonSchema: JsonSchema</code> | artifact Retention Process Result 的 JSON Schema。 |
| `artifactRetentionProcessResultSchema` | 常量 | <code>const artifactRetentionProcessResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ artifactId: z.ZodString; versionId: z.ZodString; workspaceId: z.ZodString; decision: z.ZodObject&lt;{ action: z.ZodEnum&lt;["retain", "archive", "delete"]&gt;; reason: z.ZodEnum&lt;["not_due", "already_terminal", "archive_after", "delete_after", "expired", "legal_hold", "referenced", "retain_final", "retain_failure"]&gt;; effectiveAt: z.ZodOptional&lt;z.ZodStrin...</code> | artifact Retention Process Result 的运行时 Schema。 |
| `validateArtifactRetentionEvaluationRequest` | 函数 | <code>validateArtifactRetentionEvaluationRequest(input: unknown): ArtifactRetentionEvaluationRequest</code> | 校验 Artifact Retention Evaluation Request。 |
| `validateArtifactRetentionProcessRequest` | 函数 | <code>validateArtifactRetentionProcessRequest(input: unknown): ArtifactRetentionProcessRequest</code> | 校验 Artifact Retention Process Request。 |
| `validateArtifactRetentionProcessResult` | 函数 | <code>validateArtifactRetentionProcessResult(input: unknown): ArtifactRetentionProcessResult</code> | 校验 Artifact Retention Process Result。 |

## `DefaultArtifactRetentionEvaluator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultArtifactRetentionEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | 评估 evaluate。 |

## `DefaultArtifactRetentionProcessor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactRetentionProcessorOptions): DefaultArtifactRetentionProcessor</code> | 创建该类的实例。 |
| `process` | 方法 | <code>process(input: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | process 的公开运行时操作。 |
