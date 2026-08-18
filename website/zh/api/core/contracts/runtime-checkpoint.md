# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-checkpoint.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CHECKPOINT_COMPRESSIONS` | 常量 | <code>const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT COMPRESSIONS 常量。 |
| `RUNTIME_CHECKPOINT_DISPOSITIONS` | 常量 | <code>const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT DISPOSITIONS 常量。 |
| `RUNTIME_CHECKPOINT_MODES` | 常量 | <code>const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT MODES 常量。 |
| `RUNTIME_CHECKPOINT_REASONS` | 常量 | <code>const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT REASONS 常量。 |
| `RuntimeCheckpointCreateCommand` | 接口 | <code>interface RuntimeCheckpointCreateCommand</code> | Runtime Checkpoint Create Command 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointCreateResult` | 接口 | <code>interface RuntimeCheckpointCreateResult</code> | Runtime Checkpoint Create Result 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointLoadRequest` | 接口 | <code>interface RuntimeCheckpointLoadRequest</code> | Runtime Checkpoint Load Request 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointLoadResult` | 接口 | <code>interface RuntimeCheckpointLoadResult</code> | Runtime Checkpoint Load Result 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointPolicySpec` | 接口 | <code>interface RuntimeCheckpointPolicySpec</code> | Runtime Checkpoint Policy Spec 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointPutResult` | 接口 | <code>interface RuntimeCheckpointPutResult</code> | Runtime Checkpoint Put Result 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointRecord` | 接口 | <code>interface RuntimeCheckpointRecord</code> | Runtime Checkpoint Record 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointStore` | 接口 | <code>interface RuntimeCheckpointStore</code> | Runtime Checkpoint Store 的字段契约；完整字段见下表。 |
| `RuntimeCheckpointCompression` | 类型 | <code>type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number]</code> | Runtime Checkpoint Compression 的公共类型别名。 |
| `RuntimeCheckpointDisposition` | 类型 | <code>type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number]</code> | Runtime Checkpoint Disposition 的公共类型别名。 |
| `RuntimeCheckpointMode` | 类型 | <code>type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number]</code> | Runtime Checkpoint Mode 的公共类型别名。 |
| `RuntimeCheckpointReason` | 类型 | <code>type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number]</code> | Runtime Checkpoint Reason 的公共类型别名。 |

## `RuntimeCheckpointCreateCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | checkpoint Id 字段。 |
| `contextSnapshotRefs` | 属性 | <code>contextSnapshotRefs: string[]</code> | context Snapshot Refs 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | dependency Snapshot Ref 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `processHash` | 属性 | <code>processHash: string</code> | process Hash 字段。 |
| `reason` | 属性 | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `toolContractSnapshotRef` | 属性 | <code>toolContractSnapshotRef: string</code> | tool Contract Snapshot Ref 字段。 |
| `variablesHash` | 属性 | <code>variablesHash: string</code> | variables Hash 字段。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | workflow Revision 字段。 |
| `workspaceSnapshotRef` | 属性 | <code>workspaceSnapshotRef: string</code> | workspace Snapshot Ref 字段。 |

## `RuntimeCheckpointCreateResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | checkpoint Id 字段。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `record` | 属性 | <code>record: RuntimeCheckpointRecord</code> | record 字段。 |

## `RuntimeCheckpointLoadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | checkpoint Id 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeCheckpointLoadResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentHeadSequence` | 属性 | <code>currentHeadSequence: number</code> | current Head Sequence 字段。 |
| `deltaEventCount` | 属性 | <code>deltaEventCount: number</code> | delta Event Count 字段。 |
| `deltaFromSequence` | 属性 | <code>deltaFromSequence: number</code> | delta From Sequence 字段。 |
| `record` | 属性 | <code>record: RuntimeCheckpointRecord</code> | record 字段。 |

## `RuntimeCheckpointPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compression` | 属性 | <code>compression: "none" &#124; "gzip" &#124; "zstd"</code> | compression 字段。 |
| `everyNEvents` | 属性 | <code>everyNEvents: number</code> | every N Events 字段。 |
| `mode` | 属性 | <code>mode: "none" &#124; "custom" &#124; "state_boundary" &#124; "every_n_events" &#124; "wait_boundary"</code> | mode 字段。 |
| `persistContextRefs` | 属性 | <code>persistContextRefs: boolean</code> | persist Context Refs 字段。 |
| `persistWorkspaceSnapshot` | 属性 | <code>persistWorkspaceSnapshot: boolean</code> | persist Workspace Snapshot 字段。 |
| `retainLast` | 属性 | <code>retainLast: number</code> | retain Last 字段。 |

## `RuntimeCheckpointPutResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 属性 | <code>record: RuntimeCheckpointRecord</code> | record 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |

## `RuntimeCheckpointRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checksum` | 属性 | <code>checksum: string</code> | checksum 字段。 |
| `contextSnapshotRefs` | 属性 | <code>contextSnapshotRefs: string[]</code> | context Snapshot Refs 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | dependency Snapshot Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastEventSequence` | 属性 | <code>lastEventSequence: number</code> | last Event Sequence 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `pendingWaitRef` | 属性 | <code>pendingWaitRef: string</code> | pending Wait Ref 字段。 |
| `processHash` | 属性 | <code>processHash: string</code> | process Hash 字段。 |
| `projectionSnapshot` | 属性 | <code>projectionSnapshot: RuntimeOrchestrationProjection</code> | projection Snapshot 字段。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | projection Version 字段。 |
| `reason` | 属性 | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | reason 字段。 |
| `requestHash` | 属性 | <code>requestHash: string</code> | request Hash 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `toolContractSnapshotRef` | 属性 | <code>toolContractSnapshotRef: string</code> | tool Contract Snapshot Ref 字段。 |
| `variablesHash` | 属性 | <code>variablesHash: string</code> | variables Hash 字段。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | workflow Revision 字段。 |
| `workspaceSnapshotRef` | 属性 | <code>workspaceSnapshotRef: string</code> | workspace Snapshot Ref 字段。 |

## `RuntimeCheckpointStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 读取 get。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 列出 list。 |
| `put` | 方法 | <code>put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |
