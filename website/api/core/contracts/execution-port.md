# `@codesoul-co/hypha-core` / `contracts/execution-port`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)
- Exports: **6**

## Using this module

Use the Execution port module for declaring and runtime-validating contracts. It exports 6 interfaces.

### Import from the package entrypoint

```ts
import type {
  ExecutionAuthorizationEvidence,
  ExecutionAuthorizationVerificationResult,
  ExecutionAuthorizationVerifier,
  ExecutionDispatchRequest,
  ExecutionOperationDispatcher,
  ExecutionPort,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionAuthorizationEvidence` | interface | <code>interface ExecutionAuthorizationEvidence</code> | Execution Authorization Evidence interface with 14 public fields or methods. |
| `ExecutionAuthorizationVerificationResult` | interface | <code>interface ExecutionAuthorizationVerificationResult</code> | Execution Authorization Verification Result interface with 5 public fields or methods. |
| `ExecutionAuthorizationVerifier` | interface | <code>interface ExecutionAuthorizationVerifier</code> | Execution Authorization Verifier interface with 1 public fields or methods. |
| `ExecutionDispatchRequest` | interface | <code>interface ExecutionDispatchRequest</code> | Execution Dispatch Request interface with 4 public fields or methods. |
| `ExecutionOperationDispatcher` | interface | <code>interface ExecutionOperationDispatcher</code> | Execution Operation Dispatcher interface with 1 public fields or methods. |
| `ExecutionPort` | interface | <code>interface ExecutionPort</code> | Execution Port interface with 1 public fields or methods. |

## `ExecutionAuthorizationEvidence`

Execution Authorization Evidence interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionAuthorizationEvidence } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionAuthorizationEvidence {
    id: string;
    invocationId: string;
    activityId: string;
    runId: string;
    toolId: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    principalId: string;
    inputHash: string;
    policyDecisionRef: string;
    riskAssessmentId: string;
    approvalRef?: string;
    authorizedAt: string;
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvalRef` | property | <code>approvalRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorizedAt` | property | <code>authorizedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskAssessmentId` | property | <code>riskAssessmentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionAuthorizationVerificationResult`

Execution Authorization Verification Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionAuthorizationVerificationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionAuthorizationVerificationResult {
    valid: boolean;
    verificationRef: string;
    verifiedAt: string;
    expiresAt?: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `valid` | property | <code>valid: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verificationRef` | property | <code>verificationRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifiedAt` | property | <code>verifiedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionAuthorizationVerifier`

Execution Authorization Verifier interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionAuthorizationVerifier } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionAuthorizationVerifier {
    verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionAuthorizationVerificationResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionAuthorizationVerificationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionDispatchRequest`

Execution Dispatch Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionDispatchRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionDispatchRequest {
    activity: ExecutionActivityRequest;
    binding: ExecutionToolBinding;
    riskAssessment: ExecutionRiskAssessment;
    authorization: ExecutionAuthorizationEvidence;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionActivityRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorization` | property | <code>authorization: ExecutionAuthorizationEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskAssessment` | property | <code>riskAssessment: ExecutionRiskAssessment</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOperationDispatcher`

Execution Operation Dispatcher interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionOperationDispatcher } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionOperationDispatcher {
    dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(request: ExecutionActivityRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionPort`

Execution Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-port.ts)

### Declaration

```text
export interface ExecutionPort {
    execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
