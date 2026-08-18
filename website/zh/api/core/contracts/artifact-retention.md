# `@codesoul-co/hypha-core` / `contracts/artifact-retention`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/artifact-retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactRetentionDecision` | 接口 | <code>interface ArtifactRetentionDecision</code> | Artifact Retention Decision 的字段契约；完整字段见下表。 |
| `ArtifactRetentionEvaluationRequest` | 接口 | <code>interface ArtifactRetentionEvaluationRequest</code> | Artifact Retention Evaluation Request 的字段契约；完整字段见下表。 |
| `ArtifactRetentionEvaluator` | 接口 | <code>interface ArtifactRetentionEvaluator</code> | Artifact Retention Evaluator 的字段契约；完整字段见下表。 |
| `ArtifactRetentionProcessor` | 接口 | <code>interface ArtifactRetentionProcessor</code> | Artifact Retention Processor 的字段契约；完整字段见下表。 |
| `ArtifactRetentionProcessRequest` | 接口 | <code>interface ArtifactRetentionProcessRequest</code> | Artifact Retention Process Request 的字段契约；完整字段见下表。 |
| `ArtifactRetentionProcessResult` | 接口 | <code>interface ArtifactRetentionProcessResult</code> | Artifact Retention Process Result 的字段契约；完整字段见下表。 |
| `DefaultArtifactRetentionProcessorOptions` | 接口 | <code>interface DefaultArtifactRetentionProcessorOptions</code> | Default Artifact Retention Processor Options 的字段契约；完整字段见下表。 |
| `ArtifactRetentionAction` | 类型 | <code>type ArtifactRetentionAction = 'retain' &#124; 'archive' &#124; 'delete'</code> | Artifact Retention Action 的公共类型别名。 |
| `ArtifactRetentionDecisionReason` | 类型 | <code>type ArtifactRetentionDecisionReason = 'not_due' &#124; 'already_terminal' &#124; 'archive_after' &#124; 'delete_after' &#124; 'expired' &#124; 'legal_hold' &#124; 'referenced' &#124; 'retain_final' &#124; 'retain_failure'</code> | Artifact Retention Decision Reason 的公共类型别名。 |

## `ArtifactRetentionDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: ArtifactRetentionAction</code> | action 字段。 |
| `effectiveAt` | 属性 | <code>effectiveAt: string</code> | effective At 字段。 |
| `reason` | 属性 | <code>reason: ArtifactRetentionDecisionReason</code> | reason 字段。 |

## `ArtifactRetentionEvaluationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `profile` | 属性 | <code>profile: ArtifactProfileSpec</code> | profile 字段。 |
| `record` | 属性 | <code>record: ArtifactRecord</code> | record 字段。 |

## `ArtifactRetentionEvaluator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | 评估 evaluate。 |

## `ArtifactRetentionProcessor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `process` | 方法 | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | process 的公开运行时操作。 |

## `ArtifactRetentionProcessRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | dry Run 字段。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |

## `ArtifactRetentionProcessResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applied` | 属性 | <code>applied: boolean</code> | True when this invocation applied the retention mutation. |
| `artifactId` | 属性 | <code>artifactId: string</code> | artifact Id 字段。 |
| `decision` | 属性 | <code>decision: ArtifactRetentionDecision</code> | decision 字段。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | dry Run 字段。 |
| `replayed` | 属性 | <code>replayed: boolean</code> | True when the same idempotent mutation was committed by an earlier attempt. |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `DefaultArtifactRetentionProcessorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluator` | 属性 | <code>evaluator: ArtifactRetentionEvaluator</code> | evaluator 字段。 |
| `manager` | 属性 | <code>manager: ArtifactManager</code> | manager 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `repository` | 属性 | <code>repository: ArtifactRecordRepository</code> | repository 字段。 |
