# `@codesoul-co/hypha-core` / `contracts/runtime-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_HUMAN_TASK_DECISIONS` | constant | <code>const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"]</code> | RUNTIME HUMAN TASK DECISIONS constant exported by the `contracts/runtime-human-task` module. |
| `RUNTIME_HUMAN_TASK_KINDS` | constant | <code>const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]</code> | RUNTIME HUMAN TASK KINDS constant exported by the `contracts/runtime-human-task` module. |
| `RUNTIME_HUMAN_TASK_STATUSES` | constant | <code>const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"]</code> | RUNTIME HUMAN TASK STATUSES constant exported by the `contracts/runtime-human-task` module. |
| `RuntimeHumanTask` | interface | <code>interface RuntimeHumanTask</code> | Field contract for Runtime Human Task; see all contract members below. |
| `RuntimeHumanTaskDecisionCommand` | interface | <code>interface RuntimeHumanTaskDecisionCommand</code> | Field contract for Runtime Human Task Decision Command; see all contract members below. |
| `RuntimeHumanTaskRequest` | interface | <code>interface RuntimeHumanTaskRequest</code> | Field contract for Runtime Human Task Request; see all contract members below. |
| `RuntimeHumanTaskDecision` | type | <code>type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number]</code> | Public type alias for Runtime Human Task Decision. |
| `RuntimeHumanTaskKind` | type | <code>type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number]</code> | Public type alias for Runtime Human Task Kind. |
| `RuntimeHumanTaskStatus` | type | <code>type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number]</code> | Public type alias for Runtime Human Task Status. |

## `RuntimeHumanTask` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public activity Descriptor Hash property. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public activity Descriptor Ref property. |
| `allowedDecisionScopes` | property | <code>allowedDecisionScopes: string[]</code> | Public allowed Decision Scopes property. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `decidedAt` | property | <code>decidedAt: string</code> | Public decided At property. |
| `decidedBy` | property | <code>decidedBy: string</code> | Public decided By property. |
| `decisionCommandId` | property | <code>decisionCommandId: string</code> | Public decision Command Id property. |
| `decisionEventId` | property | <code>decisionEventId: string</code> | Public decision Event Id property. |
| `decisionIdempotencyKey` | property | <code>decisionIdempotencyKey: string</code> | Public decision Idempotency Key property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `kind` | property | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | Public kind property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyRef` | property | <code>policyRef: string</code> | Public policy Ref property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public requested By property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved" &#124; "superseded"</code> | Public status property. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public subject Hash property. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public subject Ref property. |
| `supersededByTaskId` | property | <code>supersededByTaskId: string</code> | Public superseded By Task Id property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |

## `RuntimeHumanTaskDecisionCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `decidedAt` | property | <code>decidedAt: string</code> | Public decided At property. |
| `decision` | property | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved" &#124; "superseded"</code> | Public decision property. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `expectedSubjectHash` | property | <code>expectedSubjectHash: string</code> | Public expected Subject Hash property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `supersededByTaskId` | property | <code>supersededByTaskId: string</code> | Public superseded By Task Id property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |

## `RuntimeHumanTaskRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public activity Descriptor Hash property. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public activity Descriptor Ref property. |
| `allowedDecisionScopes` | property | <code>allowedDecisionScopes: string[]</code> | Public allowed Decision Scopes property. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `kind` | property | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | Public kind property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyRef` | property | <code>policyRef: string</code> | Public policy Ref property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public requested By property. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public subject Hash property. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public subject Ref property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |
