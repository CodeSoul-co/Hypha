# `@codesoul-co/hypha-core` / `contracts/execution-port`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionAuthorizationEvidence` | interface | <code>interface ExecutionAuthorizationEvidence</code> | Field contract for Execution Authorization Evidence; see all contract members below. |
| `ExecutionAuthorizationVerificationResult` | interface | <code>interface ExecutionAuthorizationVerificationResult</code> | Field contract for Execution Authorization Verification Result; see all contract members below. |
| `ExecutionAuthorizationVerifier` | interface | <code>interface ExecutionAuthorizationVerifier</code> | Field contract for Execution Authorization Verifier; see all contract members below. |
| `ExecutionDispatchRequest` | interface | <code>interface ExecutionDispatchRequest</code> | Field contract for Execution Dispatch Request; see all contract members below. |
| `ExecutionOperationDispatcher` | interface | <code>interface ExecutionOperationDispatcher</code> | Field contract for Execution Operation Dispatcher; see all contract members below. |
| `ExecutionPort` | interface | <code>interface ExecutionPort</code> | Field contract for Execution Port; see all contract members below. |

## `ExecutionAuthorizationEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `approvalRef` | property | <code>approvalRef: string</code> | Public approval Ref property. |
| `authorizedAt` | property | <code>authorizedAt: string</code> | Public authorized At property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `riskAssessmentId` | property | <code>riskAssessmentId: string</code> | Public risk Assessment Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ExecutionAuthorizationVerificationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `valid` | property | <code>valid: boolean</code> | Public valid property. |
| `verificationRef` | property | <code>verificationRef: string</code> | Public verification Ref property. |
| `verifiedAt` | property | <code>verifiedAt: string</code> | Public verified At property. |

## `ExecutionAuthorizationVerifier` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionAuthorizationVerificationResult&gt;</code> | Public runtime operation for verify. |

## `ExecutionDispatchRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionActivityRequest</code> | Public activity property. |
| `authorization` | property | <code>authorization: ExecutionAuthorizationEvidence</code> | Public authorization property. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public binding property. |
| `riskAssessment` | property | <code>riskAssessment: ExecutionRiskAssessment</code> | Public risk Assessment property. |

## `ExecutionOperationDispatcher` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public runtime operation for dispatch. |

## `ExecutionPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public runtime operation for execute. |
