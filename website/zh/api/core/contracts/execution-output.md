# `@codesoul-co/hypha-core` / `contracts/execution-output`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-output.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CollectedExecutionOutput` | 接口 | <code>interface CollectedExecutionOutput</code> | Collected Execution Output 的字段契约；完整字段见下表。 |
| `ExecutionOutputArtifactManager` | 接口 | <code>interface ExecutionOutputArtifactManager</code> | Minimal Artifact Manager port required by output collection. |
| `ExecutionOutputCollectionContext` | 接口 | <code>interface ExecutionOutputCollectionContext</code> | Identity and Artifact policy context supplied by the Execution composition root. |
| `ExecutionOutputCollectionItem` | 接口 | <code>interface ExecutionOutputCollectionItem</code> | A bounded, content-addressed file that may be handed to Artifact collection. |
| `ExecutionOutputCollectionPlan` | 接口 | <code>interface ExecutionOutputCollectionPlan</code> | Deterministic output of policy evaluation; creating Artifact records is a later side effect. |
| `ExecutionOutputCollectionPolicy` | 接口 | <code>interface ExecutionOutputCollectionPolicy</code> | Framework-level rules for collecting files produced by an Execution. |
| `ExecutionOutputCollectionResult` | 接口 | <code>interface ExecutionOutputCollectionResult</code> | Execution Output Collection Result 的字段契约；完整字段见下表。 |
| `ExecutionOutputCollector` | 接口 | <code>interface ExecutionOutputCollector</code> | Execution Output Collector 的字段契约；完整字段见下表。 |
| `ExecutionOutputPlanner` | 接口 | <code>interface ExecutionOutputPlanner</code> | Execution Output Planner 的字段契约；完整字段见下表。 |
| `ExecutionOutputSkipReason` | 类型 | <code>type ExecutionOutputSkipReason = 'not_included' &#124; 'excluded' &#124; 'unsupported_mutation' &#124; 'missing_integrity_evidence' &#124; 'artifact_limit' &#124; 'byte_limit'</code> | Execution Output Skip Reason 的公共类型别名。 |
| `ExecutionOutputTerminalStatus` | 类型 | <code>type ExecutionOutputTerminalStatus = Exclude&lt;CommandExecutionStatus, 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling'&gt;</code> | Execution Output Terminal Status 的公共类型别名。 |

## `CollectedExecutionOutput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `status` | 属性 | <code>status: ArtifactStatus</code> | status 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `ExecutionOutputArtifactManager` 契约字段

Minimal Artifact Manager port required by output collection.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise&lt;ArtifactRecord&gt;</code> | 创建 From Workspace。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | finalize 的公开运行时操作。 |

## `ExecutionOutputCollectionContext` 契约字段

Identity and Artifact policy context supplied by the Execution composition root.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `idempotencyKeyPrefix` | 属性 | <code>idempotencyKeyPrefix: string</code> | idempotency Key Prefix 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionOutputCollectionItem` 契约字段

A bounded, content-addressed file that may be handed to Artifact collection.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `existingArtifactRef` | 属性 | <code>existingArtifactRef: string</code> | existing Artifact Ref 字段。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | kind 字段。 |
| `mimeType` | 属性 | <code>mimeType: string</code> | mime Type 字段。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | relative Path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ExecutionOutputCollectionPlan` 契约字段

Deterministic output of policy evaluation; creating Artifact records is a later side effect.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `existingArtifactRefs` | 属性 | <code>existingArtifactRefs: string[]</code> | existing Artifact Refs 字段。 |
| `finalize` | 属性 | <code>finalize: boolean</code> | finalize 字段。 |
| `items` | 属性 | <code>items: ExecutionOutputCollectionItem[]</code> | items 字段。 |
| `skipped` | 属性 | <code>skipped: Record&lt;ExecutionOutputSkipReason, number&gt;</code> | skipped 字段。 |
| `status` | 属性 | <code>status: ExecutionOutputTerminalStatus</code> | status 字段。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | total Bytes 字段。 |

## `ExecutionOutputCollectionPolicy` 契约字段

Framework-level rules for collecting files produced by an Execution.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classifyByExtension` | 属性 | <code>classifyByExtension: boolean</code> | classify By Extension 字段。 |
| `excludePatterns` | 属性 | <code>excludePatterns: string[]</code> | exclude Patterns 字段。 |
| `finalizeOnSuccess` | 属性 | <code>finalizeOnSuccess: boolean</code> | finalize On Success 字段。 |
| `includePatterns` | 属性 | <code>includePatterns: string[]</code> | include Patterns 字段。 |
| `maxArtifacts` | 属性 | <code>maxArtifacts: number</code> | max Artifacts 字段。 |
| `maxTotalBytes` | 属性 | <code>maxTotalBytes: number</code> | max Total Bytes 字段。 |

## `ExecutionOutputCollectionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `collected` | 属性 | <code>collected: CollectedExecutionOutput[]</code> | collected 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `existingArtifactRefs` | 属性 | <code>existingArtifactRefs: string[]</code> | existing Artifact Refs 字段。 |
| `finalizedArtifactRefs` | 属性 | <code>finalizedArtifactRefs: string[]</code> | finalized Artifact Refs 字段。 |

## `ExecutionOutputCollector` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | collect 的公开运行时操作。 |

## `ExecutionOutputPlanner` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `plan` | 方法 | <code>plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | 规划 plan。 |
