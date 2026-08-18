# `@codesoul-co/hypha-core` / `contracts/runtime-replay`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_REPLAY_DIVERGENCE_KINDS` | 常量 | <code>const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"]</code> | 由 `contracts/runtime-replay` 模块导出的 RUNTIME REPLAY DIVERGENCE KINDS 常量。 |
| `RuntimeReplayDivergence` | 接口 | <code>interface RuntimeReplayDivergence</code> | Runtime Replay Divergence 的字段契约；完整字段见下表。 |
| `RuntimeReplayRequest` | 接口 | <code>interface RuntimeReplayRequest</code> | Runtime Replay Request 的字段契约；完整字段见下表。 |
| `RuntimeReplayResult` | 接口 | <code>interface RuntimeReplayResult</code> | Runtime Replay Result 的字段契约；完整字段见下表。 |
| `RuntimeReplayServiceContract` | 接口 | <code>interface RuntimeReplayServiceContract</code> | Runtime Replay Service Contract 的字段契约；完整字段见下表。 |
| `RuntimeReplayVerificationRequest` | 接口 | <code>interface RuntimeReplayVerificationRequest</code> | Runtime Replay Verification Request 的字段契约；完整字段见下表。 |
| `RuntimeReplayVerificationResult` | 接口 | <code>interface RuntimeReplayVerificationResult</code> | Runtime Replay Verification Result 的字段契约；完整字段见下表。 |
| `RuntimeReplayDivergenceKind` | 类型 | <code>type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number]</code> | Runtime Replay Divergence Kind 的公共类型别名。 |

## `RuntimeReplayDivergence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: string</code> | actual 字段。 |
| `expected` | 属性 | <code>expected: string</code> | expected 字段。 |
| `kind` | 属性 | <code>kind: "workflow_revision" &#124; "process_hash" &#124; "dependency_snapshot" &#124; "projection_version" &#124; "snapshot_checksum"</code> | kind 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |

## `RuntimeReplayRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | checkpoint Id 字段。 |
| `expectedDependencySnapshotRef` | 属性 | <code>expectedDependencySnapshotRef: string</code> | expected Dependency Snapshot Ref 字段。 |
| `expectedProcessHash` | 属性 | <code>expectedProcessHash: string</code> | expected Process Hash 字段。 |
| `expectedWorkflowRevision` | 属性 | <code>expectedWorkflowRevision: string</code> | expected Workflow Revision 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `toSequence` | 属性 | <code>toSequence: number</code> | to Sequence 字段。 |

## `RuntimeReplayResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appliedEventCount` | 属性 | <code>appliedEventCount: number</code> | applied Event Count 字段。 |
| `baseEventSequence` | 属性 | <code>baseEventSequence: number</code> | base Event Sequence 字段。 |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | checkpoint Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | dependency Snapshot Ref 字段。 |
| `divergences` | 属性 | <code>divergences: RuntimeReplayDivergence[]</code> | divergences 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `finalSnapshot` | 属性 | <code>finalSnapshot: RuntimeOrchestrationProjection</code> | final Snapshot 字段。 |
| `finalSnapshotChecksum` | 属性 | <code>finalSnapshotChecksum: string</code> | final Snapshot Checksum 字段。 |
| `mode` | 属性 | <code>mode: "deterministic"</code> | mode 字段。 |
| `processHash` | 属性 | <code>processHash: string</code> | process Hash 字段。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | projection Version 字段。 |
| `replayedEventCount` | 属性 | <code>replayedEventCount: number</code> | replayed Event Count 字段。 |
| `sourceRunId` | 属性 | <code>sourceRunId: string</code> | source Run Id 字段。 |
| `targetEventSequence` | 属性 | <code>targetEventSequence: number</code> | target Event Sequence 字段。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | workflow Revision 字段。 |

## `RuntimeReplayServiceContract` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `replay` | 方法 | <code>replay(request: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | replay 的公开运行时操作。 |
| `verify` | 方法 | <code>verify(request: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | verify 的公开运行时操作。 |

## `RuntimeReplayVerificationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSnapshotChecksum` | 属性 | <code>expectedSnapshotChecksum: string</code> | expected Snapshot Checksum 字段。 |
| `replay` | 属性 | <code>replay: RuntimeReplayRequest</code> | replay 字段。 |

## `RuntimeReplayVerificationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `divergences` | 属性 | <code>divergences: RuntimeReplayDivergence[]</code> | divergences 字段。 |
| `matches` | 属性 | <code>matches: boolean</code> | matches 字段。 |
| `replay` | 属性 | <code>replay: RuntimeReplayResult</code> | replay 字段。 |
