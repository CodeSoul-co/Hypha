# `@codesoul-co/hypha-core` / `contracts/execution-port`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionAuthorizationEvidence` | 接口 | <code>interface ExecutionAuthorizationEvidence</code> | Execution Authorization Evidence 的字段契约；完整字段见下表。 |
| `ExecutionAuthorizationVerificationResult` | 接口 | <code>interface ExecutionAuthorizationVerificationResult</code> | Execution Authorization Verification Result 的字段契约；完整字段见下表。 |
| `ExecutionAuthorizationVerifier` | 接口 | <code>interface ExecutionAuthorizationVerifier</code> | Execution Authorization Verifier 的字段契约；完整字段见下表。 |
| `ExecutionDispatchRequest` | 接口 | <code>interface ExecutionDispatchRequest</code> | Execution Dispatch Request 的字段契约；完整字段见下表。 |
| `ExecutionOperationDispatcher` | 接口 | <code>interface ExecutionOperationDispatcher</code> | Execution Operation Dispatcher 的字段契约；完整字段见下表。 |
| `ExecutionPort` | 接口 | <code>interface ExecutionPort</code> | Execution Port 的字段契约；完整字段见下表。 |

## `ExecutionAuthorizationEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `approvalRef` | 属性 | <code>approvalRef: string</code> | approval Ref 字段。 |
| `authorizedAt` | 属性 | <code>authorizedAt: string</code> | authorized At 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `riskAssessmentId` | 属性 | <code>riskAssessmentId: string</code> | risk Assessment Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ExecutionAuthorizationVerificationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `valid` | 属性 | <code>valid: boolean</code> | valid 字段。 |
| `verificationRef` | 属性 | <code>verificationRef: string</code> | verification Ref 字段。 |
| `verifiedAt` | 属性 | <code>verifiedAt: string</code> | verified At 字段。 |

## `ExecutionAuthorizationVerifier` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionAuthorizationVerificationResult&gt;</code> | verify 的公开运行时操作。 |

## `ExecutionDispatchRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionActivityRequest</code> | activity 字段。 |
| `authorization` | 属性 | <code>authorization: ExecutionAuthorizationEvidence</code> | authorization 字段。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | binding 字段。 |
| `riskAssessment` | 属性 | <code>riskAssessment: ExecutionRiskAssessment</code> | risk Assessment 字段。 |

## `ExecutionOperationDispatcher` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | dispatch 的公开运行时操作。 |

## `ExecutionPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | execute 的公开运行时操作。 |
