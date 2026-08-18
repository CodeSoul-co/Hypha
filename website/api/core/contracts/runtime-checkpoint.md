# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-checkpoint.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CHECKPOINT_COMPRESSIONS` | constant | <code>const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"]</code> | RUNTIME CHECKPOINT COMPRESSIONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_DISPOSITIONS` | constant | <code>const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | RUNTIME CHECKPOINT DISPOSITIONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_MODES` | constant | <code>const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]</code> | RUNTIME CHECKPOINT MODES constant exported by the `contracts/runtime-checkpoint` module. |
| `RUNTIME_CHECKPOINT_REASONS` | constant | <code>const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]</code> | RUNTIME CHECKPOINT REASONS constant exported by the `contracts/runtime-checkpoint` module. |
| `RuntimeCheckpointCreateCommand` | interface | <code>interface RuntimeCheckpointCreateCommand</code> | Field contract for Runtime Checkpoint Create Command; see all contract members below. |
| `RuntimeCheckpointCreateResult` | interface | <code>interface RuntimeCheckpointCreateResult</code> | Field contract for Runtime Checkpoint Create Result; see all contract members below. |
| `RuntimeCheckpointLoadRequest` | interface | <code>interface RuntimeCheckpointLoadRequest</code> | Field contract for Runtime Checkpoint Load Request; see all contract members below. |
| `RuntimeCheckpointLoadResult` | interface | <code>interface RuntimeCheckpointLoadResult</code> | Field contract for Runtime Checkpoint Load Result; see all contract members below. |
| `RuntimeCheckpointPolicySpec` | interface | <code>interface RuntimeCheckpointPolicySpec</code> | Field contract for Runtime Checkpoint Policy Spec; see all contract members below. |
| `RuntimeCheckpointPutResult` | interface | <code>interface RuntimeCheckpointPutResult</code> | Field contract for Runtime Checkpoint Put Result; see all contract members below. |
| `RuntimeCheckpointRecord` | interface | <code>interface RuntimeCheckpointRecord</code> | Field contract for Runtime Checkpoint Record; see all contract members below. |
| `RuntimeCheckpointStore` | interface | <code>interface RuntimeCheckpointStore</code> | Field contract for Runtime Checkpoint Store; see all contract members below. |
| `RuntimeCheckpointCompression` | type | <code>type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number]</code> | Public type alias for Runtime Checkpoint Compression. |
| `RuntimeCheckpointDisposition` | type | <code>type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number]</code> | Public type alias for Runtime Checkpoint Disposition. |
| `RuntimeCheckpointMode` | type | <code>type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number]</code> | Public type alias for Runtime Checkpoint Mode. |
| `RuntimeCheckpointReason` | type | <code>type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number]</code> | Public type alias for Runtime Checkpoint Reason. |

## `RuntimeCheckpointCreateCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId: string</code> | Public checkpoint Id property. |
| `contextSnapshotRefs` | property | <code>contextSnapshotRefs: string[]</code> | Public context Snapshot Refs property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public dependency Snapshot Ref property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `processHash` | property | <code>processHash: string</code> | Public process Hash property. |
| `reason` | property | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | Public reason property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `toolContractSnapshotRef` | property | <code>toolContractSnapshotRef: string</code> | Public tool Contract Snapshot Ref property. |
| `variablesHash` | property | <code>variablesHash: string</code> | Public variables Hash property. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public workflow Revision property. |
| `workspaceSnapshotRef` | property | <code>workspaceSnapshotRef: string</code> | Public workspace Snapshot Ref property. |

## `RuntimeCheckpointCreateResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointId` | property | <code>checkpointId: string</code> | Public checkpoint Id property. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public disposition property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `record` | property | <code>record: RuntimeCheckpointRecord</code> | Public record property. |

## `RuntimeCheckpointLoadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `checkpointId` | property | <code>checkpointId: string</code> | Public checkpoint Id property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |

## `RuntimeCheckpointLoadResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentHeadSequence` | property | <code>currentHeadSequence: number</code> | Public current Head Sequence property. |
| `deltaEventCount` | property | <code>deltaEventCount: number</code> | Public delta Event Count property. |
| `deltaFromSequence` | property | <code>deltaFromSequence: number</code> | Public delta From Sequence property. |
| `record` | property | <code>record: RuntimeCheckpointRecord</code> | Public record property. |

## `RuntimeCheckpointPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compression` | property | <code>compression: "none" &#124; "gzip" &#124; "zstd"</code> | Public compression property. |
| `everyNEvents` | property | <code>everyNEvents: number</code> | Public every N Events property. |
| `mode` | property | <code>mode: "none" &#124; "custom" &#124; "state_boundary" &#124; "every_n_events" &#124; "wait_boundary"</code> | Public mode property. |
| `persistContextRefs` | property | <code>persistContextRefs: boolean</code> | Public persist Context Refs property. |
| `persistWorkspaceSnapshot` | property | <code>persistWorkspaceSnapshot: boolean</code> | Public persist Workspace Snapshot property. |
| `retainLast` | property | <code>retainLast: number</code> | Public retain Last property. |

## `RuntimeCheckpointPutResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | property | <code>record: RuntimeCheckpointRecord</code> | Public record property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |

## `RuntimeCheckpointRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checksum` | property | <code>checksum: string</code> | Public checksum property. |
| `contextSnapshotRefs` | property | <code>contextSnapshotRefs: string[]</code> | Public context Snapshot Refs property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `dependencySnapshotRef` | property | <code>dependencySnapshotRef: string</code> | Public dependency Snapshot Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastEventSequence` | property | <code>lastEventSequence: number</code> | Public last Event Sequence property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `pendingWaitRef` | property | <code>pendingWaitRef: string</code> | Public pending Wait Ref property. |
| `processHash` | property | <code>processHash: string</code> | Public process Hash property. |
| `projectionSnapshot` | property | <code>projectionSnapshot: RuntimeOrchestrationProjection</code> | Public projection Snapshot property. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public projection Version property. |
| `reason` | property | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | Public reason property. |
| `requestHash` | property | <code>requestHash: string</code> | Public request Hash property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `toolContractSnapshotRef` | property | <code>toolContractSnapshotRef: string</code> | Public tool Contract Snapshot Ref property. |
| `variablesHash` | property | <code>variablesHash: string</code> | Public variables Hash property. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public workflow Revision property. |
| `workspaceSnapshotRef` | property | <code>workspaceSnapshotRef: string</code> | Public workspace Snapshot Ref property. |

## `RuntimeCheckpointStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Lists list at this module boundary. |
| `put` | method | <code>put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public runtime operation for put. |
