# `@codesoul-co/hypha-core` / `contracts/execution-activities`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_ACTIVITY_STATUSES` | 常量 | <code>const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"]</code> | 由 `contracts/execution-activities` 模块导出的 EXECUTION ACTIVITY STATUSES 常量。 |
| `ExecutionActivityRequest` | 接口 | <code>interface ExecutionActivityRequest</code> | Execution Activity Request 的字段契约；完整字段见下表。 |
| `ExecutionActivityResult` | 接口 | <code>interface ExecutionActivityResult</code> | Execution Activity Result 的字段契约；完整字段见下表。 |
| `ExecutionActivityStatus` | 类型 | <code>type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number]</code> | Execution Activity Status 的公共类型别名。 |
| `WorkspaceOperationRequest` | 类型 | <code>type WorkspaceOperationRequest = WorkspacePathRequest &#124; WorkspaceListRequest &#124; WorkspaceReadRequest &#124; WorkspaceWriteRequest &#124; WorkspaceDeleteRequest &#124; WorkspaceSnapshotRequest &#124; WorkspaceRestoreRequest &#124; WorkspaceDiffRequest &#124; WorkspacePatchRequest</code> | Workspace Operation Request 的公共类型别名。 |

## `ExecutionActivityRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | request 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | state Attempt Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionActivityResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `snapshotRef` | 属性 | <code>snapshotRef: string</code> | snapshot Ref 字段。 |
| `status` | 属性 | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timeout"</code> | status 字段。 |
