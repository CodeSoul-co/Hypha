# `@codesoul-co/hypha-core` / `contracts/runtime-replay`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_REPLAY_DIVERGENCE_KINDS` | constant | <code>const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"]</code> | RUNTIME REPLAY DIVERGENCE KINDS constant exported by the `contracts/runtime-replay` module. |
| `RuntimeReplayDivergence` | interface | <code>interface RuntimeReplayDivergence</code> | Field contract for Runtime Replay Divergence; see all contract members below. |
| `RuntimeReplayRequest` | interface | <code>interface RuntimeReplayRequest</code> | Field contract for Runtime Replay Request; see all contract members below. |
| `RuntimeReplayResult` | interface | <code>interface RuntimeReplayResult</code> | Field contract for Runtime Replay Result; see all contract members below. |
| `RuntimeReplayServiceContract` | interface | <code>interface RuntimeReplayServiceContract</code> | Field contract for Runtime Replay Service Contract; see all contract members below. |
| `RuntimeReplayVerificationRequest` | interface | <code>interface RuntimeReplayVerificationRequest</code> | Field contract for Runtime Replay Verification Request; see all contract members below. |
| `RuntimeReplayVerificationResult` | interface | <code>interface RuntimeReplayVerificationResult</code> | Field contract for Runtime Replay Verification Result; see all contract members below. |
| `RuntimeReplayDivergenceKind` | type | <code>type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number]</code> | Public type alias for Runtime Replay Divergence Kind. |

## `RuntimeReplayDivergence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual: string</code> | Public actual property. |
| `expected` | property | <code>expected: string</code> | Public expected property. |
| `kind` | property | <code>kind: "workflow_revision" &#124; "process_hash" &#124; "dependency_snapshot" &#124; "projection_version" &#124; "snapshot_checksum"</code> | Public kind property. |
| `message` | property | <code>message: string</code> | Public message property. |

## `RuntimeReplayRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId: string</code> | Public checkpoint Id property. |
| `expectedDependencySnapshotRef` | property | <code>expectedDependencySnapshotRef: string</code> | Public expected Dependency Snapshot Ref property. |
| `expectedProcessHash` | property | <code>expectedProcessHash: string</code> | Public expected Process Hash property. |
| `expectedWorkflowRevision` | property | <code>expectedWorkflowRevision: string</code> | Public expected Workflow Revision property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `toSequence` | property | <code>toSequence: number</code> | Public to Sequence property. |

## `RuntimeReplayResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appliedEventCount` | property | <code>appliedEventCount: number</code> | Public applied Event Count property. |
| `baseEventSequence` | property | <code>baseEventSequence: number</code> | Public base Event Sequence property. |
| `checkpointId` | property | <code>checkpointId: string</code> | Public checkpoint Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public dependency Snapshot Ref property. |
| `divergences` | property | <code>divergences: RuntimeReplayDivergence[]</code> | Public divergences property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `finalSnapshot` | property | <code>finalSnapshot: RuntimeOrchestrationProjection</code> | Public final Snapshot property. |
| `finalSnapshotChecksum` | property | <code>finalSnapshotChecksum: string</code> | Public final Snapshot Checksum property. |
| `mode` | property | <code>mode: "deterministic"</code> | Public mode property. |
| `processHash` | property | <code>processHash: string</code> | Public process Hash property. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public projection Version property. |
| `replayedEventCount` | property | <code>replayedEventCount: number</code> | Public replayed Event Count property. |
| `sourceRunId` | property | <code>sourceRunId: string</code> | Public source Run Id property. |
| `targetEventSequence` | property | <code>targetEventSequence: number</code> | Public target Event Sequence property. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public workflow Revision property. |

## `RuntimeReplayServiceContract` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `replay` | method | <code>replay(request: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | Public runtime operation for replay. |
| `verify` | method | <code>verify(request: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | Public runtime operation for verify. |

## `RuntimeReplayVerificationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSnapshotChecksum` | property | <code>expectedSnapshotChecksum: string</code> | Public expected Snapshot Checksum property. |
| `replay` | property | <code>replay: RuntimeReplayRequest</code> | Public replay property. |

## `RuntimeReplayVerificationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `divergences` | property | <code>divergences: RuntimeReplayDivergence[]</code> | Public divergences property. |
| `matches` | property | <code>matches: boolean</code> | Public matches property. |
| `replay` | property | <code>replay: RuntimeReplayResult</code> | Public replay property. |
