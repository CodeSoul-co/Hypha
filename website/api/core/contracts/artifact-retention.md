# `@codesoul-co/hypha-core` / `contracts/artifact-retention`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/artifact-retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactRetentionDecision` | interface | <code>interface ArtifactRetentionDecision</code> | Field contract for Artifact Retention Decision; see all contract members below. |
| `ArtifactRetentionEvaluationRequest` | interface | <code>interface ArtifactRetentionEvaluationRequest</code> | Field contract for Artifact Retention Evaluation Request; see all contract members below. |
| `ArtifactRetentionEvaluator` | interface | <code>interface ArtifactRetentionEvaluator</code> | Field contract for Artifact Retention Evaluator; see all contract members below. |
| `ArtifactRetentionProcessor` | interface | <code>interface ArtifactRetentionProcessor</code> | Field contract for Artifact Retention Processor; see all contract members below. |
| `ArtifactRetentionProcessRequest` | interface | <code>interface ArtifactRetentionProcessRequest</code> | Field contract for Artifact Retention Process Request; see all contract members below. |
| `ArtifactRetentionProcessResult` | interface | <code>interface ArtifactRetentionProcessResult</code> | Field contract for Artifact Retention Process Result; see all contract members below. |
| `DefaultArtifactRetentionProcessorOptions` | interface | <code>interface DefaultArtifactRetentionProcessorOptions</code> | Field contract for Default Artifact Retention Processor Options; see all contract members below. |
| `ArtifactRetentionAction` | type | <code>type ArtifactRetentionAction = 'retain' &#124; 'archive' &#124; 'delete'</code> | Public type alias for Artifact Retention Action. |
| `ArtifactRetentionDecisionReason` | type | <code>type ArtifactRetentionDecisionReason = 'not_due' &#124; 'already_terminal' &#124; 'archive_after' &#124; 'delete_after' &#124; 'expired' &#124; 'legal_hold' &#124; 'referenced' &#124; 'retain_final' &#124; 'retain_failure'</code> | Public type alias for Artifact Retention Decision Reason. |

## `ArtifactRetentionDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: ArtifactRetentionAction</code> | Public action property. |
| `effectiveAt` | property | <code>effectiveAt: string</code> | Public effective At property. |
| `reason` | property | <code>reason: ArtifactRetentionDecisionReason</code> | Public reason property. |

## `ArtifactRetentionEvaluationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `profile` | property | <code>profile: ArtifactProfileSpec</code> | Public profile property. |
| `record` | property | <code>record: ArtifactRecord</code> | Public record property. |

## `ArtifactRetentionEvaluator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | Evaluates evaluate at this module boundary. |

## `ArtifactRetentionProcessor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `process` | method | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public runtime operation for process. |

## `ArtifactRetentionProcessRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |

## `ArtifactRetentionProcessResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applied` | property | <code>applied: boolean</code> | True when this invocation applied the retention mutation. |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `decision` | property | <code>decision: ArtifactRetentionDecision</code> | Public decision property. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public dry Run property. |
| `replayed` | property | <code>replayed: boolean</code> | True when the same idempotent mutation was committed by an earlier attempt. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `DefaultArtifactRetentionProcessorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluator` | property | <code>evaluator: ArtifactRetentionEvaluator</code> | Public evaluator property. |
| `manager` | property | <code>manager: ArtifactManager</code> | Public manager property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public repository property. |
