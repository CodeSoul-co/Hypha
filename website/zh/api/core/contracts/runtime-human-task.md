# `@codesoul-co/hypha-core` / `contracts/runtime-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_HUMAN_TASK_DECISIONS` | 常量 | <code>const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK DECISIONS 常量。 |
| `RUNTIME_HUMAN_TASK_KINDS` | 常量 | <code>const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK KINDS 常量。 |
| `RUNTIME_HUMAN_TASK_STATUSES` | 常量 | <code>const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK STATUSES 常量。 |
| `RuntimeHumanTask` | 接口 | <code>interface RuntimeHumanTask</code> | Runtime Human Task 的字段契约；完整字段见下表。 |
| `RuntimeHumanTaskDecisionCommand` | 接口 | <code>interface RuntimeHumanTaskDecisionCommand</code> | Runtime Human Task Decision Command 的字段契约；完整字段见下表。 |
| `RuntimeHumanTaskRequest` | 接口 | <code>interface RuntimeHumanTaskRequest</code> | Runtime Human Task Request 的字段契约；完整字段见下表。 |
| `RuntimeHumanTaskDecision` | 类型 | <code>type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number]</code> | Runtime Human Task Decision 的公共类型别名。 |
| `RuntimeHumanTaskKind` | 类型 | <code>type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number]</code> | Runtime Human Task Kind 的公共类型别名。 |
| `RuntimeHumanTaskStatus` | 类型 | <code>type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number]</code> | Runtime Human Task Status 的公共类型别名。 |

## `RuntimeHumanTask` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | activity Descriptor Hash 字段。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | activity Descriptor Ref 字段。 |
| `allowedDecisionScopes` | 属性 | <code>allowedDecisionScopes: string[]</code> | allowed Decision Scopes 字段。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | decided At 字段。 |
| `decidedBy` | 属性 | <code>decidedBy: string</code> | decided By 字段。 |
| `decisionCommandId` | 属性 | <code>decisionCommandId: string</code> | decision Command Id 字段。 |
| `decisionEventId` | 属性 | <code>decisionEventId: string</code> | decision Event Id 字段。 |
| `decisionIdempotencyKey` | 属性 | <code>decisionIdempotencyKey: string</code> | decision Idempotency Key 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `kind` | 属性 | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | kind 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyRef` | 属性 | <code>policyRef: string</code> | policy Ref 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | requested By 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved" &#124; "superseded"</code> | status 字段。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | subject Hash 字段。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | subject Ref 字段。 |
| `supersededByTaskId` | 属性 | <code>supersededByTaskId: string</code> | superseded By Task Id 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |

## `RuntimeHumanTaskDecisionCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | decided At 字段。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved" &#124; "superseded"</code> | decision 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `expectedSubjectHash` | 属性 | <code>expectedSubjectHash: string</code> | expected Subject Hash 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `supersededByTaskId` | 属性 | <code>supersededByTaskId: string</code> | superseded By Task Id 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |

## `RuntimeHumanTaskRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | activity Descriptor Hash 字段。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | activity Descriptor Ref 字段。 |
| `allowedDecisionScopes` | 属性 | <code>allowedDecisionScopes: string[]</code> | allowed Decision Scopes 字段。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `kind` | 属性 | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | kind 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyRef` | 属性 | <code>policyRef: string</code> | policy Ref 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | requested By 字段。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | subject Hash 字段。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | subject Ref 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |
