# `@codesoul-co/hypha-core` / `contracts/execution-output`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-output.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CollectedExecutionOutput` | interface | <code>interface CollectedExecutionOutput</code> | Field contract for Collected Execution Output; see all contract members below. |
| `ExecutionOutputArtifactManager` | interface | <code>interface ExecutionOutputArtifactManager</code> | Minimal Artifact Manager port required by output collection. |
| `ExecutionOutputCollectionContext` | interface | <code>interface ExecutionOutputCollectionContext</code> | Identity and Artifact policy context supplied by the Execution composition root. |
| `ExecutionOutputCollectionItem` | interface | <code>interface ExecutionOutputCollectionItem</code> | A bounded, content-addressed file that may be handed to Artifact collection. |
| `ExecutionOutputCollectionPlan` | interface | <code>interface ExecutionOutputCollectionPlan</code> | Deterministic output of policy evaluation; creating Artifact records is a later side effect. |
| `ExecutionOutputCollectionPolicy` | interface | <code>interface ExecutionOutputCollectionPolicy</code> | Framework-level rules for collecting files produced by an Execution. |
| `ExecutionOutputCollectionResult` | interface | <code>interface ExecutionOutputCollectionResult</code> | Field contract for Execution Output Collection Result; see all contract members below. |
| `ExecutionOutputCollector` | interface | <code>interface ExecutionOutputCollector</code> | Field contract for Execution Output Collector; see all contract members below. |
| `ExecutionOutputPlanner` | interface | <code>interface ExecutionOutputPlanner</code> | Field contract for Execution Output Planner; see all contract members below. |
| `ExecutionOutputSkipReason` | type | <code>type ExecutionOutputSkipReason = 'not_included' &#124; 'excluded' &#124; 'unsupported_mutation' &#124; 'missing_integrity_evidence' &#124; 'artifact_limit' &#124; 'byte_limit'</code> | Public type alias for Execution Output Skip Reason. |
| `ExecutionOutputTerminalStatus` | type | <code>type ExecutionOutputTerminalStatus = Exclude&lt;CommandExecutionStatus, 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling'&gt;</code> | Public type alias for Execution Output Terminal Status. |

## `CollectedExecutionOutput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `status` | property | <code>status: ArtifactStatus</code> | Public status property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `ExecutionOutputArtifactManager` contract members

Minimal Artifact Manager port required by output collection.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createFromWorkspace` | method | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise&lt;ArtifactRecord&gt;</code> | Creates From Workspace at this module boundary. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public runtime operation for finalize. |

## `ExecutionOutputCollectionContext` contract members

Identity and Artifact policy context supplied by the Execution composition root.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `idempotencyKeyPrefix` | property | <code>idempotencyKeyPrefix: string</code> | Public idempotency Key Prefix property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionOutputCollectionItem` contract members

A bounded, content-addressed file that may be handed to Artifact collection.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `existingArtifactRef` | property | <code>existingArtifactRef: string</code> | Public existing Artifact Ref property. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public kind property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ExecutionOutputCollectionPlan` contract members

Deterministic output of policy evaluation; creating Artifact records is a later side effect.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `existingArtifactRefs` | property | <code>existingArtifactRefs: string[]</code> | Public existing Artifact Refs property. |
| `finalize` | property | <code>finalize: boolean</code> | Public finalize property. |
| `items` | property | <code>items: ExecutionOutputCollectionItem[]</code> | Public items property. |
| `skipped` | property | <code>skipped: Record&lt;ExecutionOutputSkipReason, number&gt;</code> | Public skipped property. |
| `status` | property | <code>status: ExecutionOutputTerminalStatus</code> | Public status property. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public total Bytes property. |

## `ExecutionOutputCollectionPolicy` contract members

Framework-level rules for collecting files produced by an Execution.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classifyByExtension` | property | <code>classifyByExtension: boolean</code> | Public classify By Extension property. |
| `excludePatterns` | property | <code>excludePatterns: string[]</code> | Public exclude Patterns property. |
| `finalizeOnSuccess` | property | <code>finalizeOnSuccess: boolean</code> | Public finalize On Success property. |
| `includePatterns` | property | <code>includePatterns: string[]</code> | Public include Patterns property. |
| `maxArtifacts` | property | <code>maxArtifacts: number</code> | Public max Artifacts property. |
| `maxTotalBytes` | property | <code>maxTotalBytes: number</code> | Public max Total Bytes property. |

## `ExecutionOutputCollectionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `collected` | property | <code>collected: CollectedExecutionOutput[]</code> | Public collected property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `existingArtifactRefs` | property | <code>existingArtifactRefs: string[]</code> | Public existing Artifact Refs property. |
| `finalizedArtifactRefs` | property | <code>finalizedArtifactRefs: string[]</code> | Public finalized Artifact Refs property. |

## `ExecutionOutputCollector` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | Public runtime operation for collect. |

## `ExecutionOutputPlanner` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `plan` | method | <code>plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | Plans plan at this module boundary. |
