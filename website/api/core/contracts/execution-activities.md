# `@codesoul-co/hypha-core` / `contracts/execution-activities`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_ACTIVITY_STATUSES` | constant | <code>const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"]</code> | EXECUTION ACTIVITY STATUSES constant exported by the `contracts/execution-activities` module. |
| `ExecutionActivityRequest` | interface | <code>interface ExecutionActivityRequest</code> | Field contract for Execution Activity Request; see all contract members below. |
| `ExecutionActivityResult` | interface | <code>interface ExecutionActivityResult</code> | Field contract for Execution Activity Result; see all contract members below. |
| `ExecutionActivityStatus` | type | <code>type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number]</code> | Public type alias for Execution Activity Status. |
| `WorkspaceOperationRequest` | type | <code>type WorkspaceOperationRequest = WorkspacePathRequest &#124; WorkspaceListRequest &#124; WorkspaceReadRequest &#124; WorkspaceWriteRequest &#124; WorkspaceDeleteRequest &#124; WorkspaceSnapshotRequest &#124; WorkspaceRestoreRequest &#124; WorkspaceDiffRequest &#124; WorkspacePatchRequest</code> | Public type alias for Workspace Operation Request. |

## `ExecutionActivityRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `request` | property | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | Public request property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public state Attempt Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionActivityResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `snapshotRef` | property | <code>snapshotRef: string</code> | Public snapshot Ref property. |
| `status` | property | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timeout"</code> | Public status property. |
