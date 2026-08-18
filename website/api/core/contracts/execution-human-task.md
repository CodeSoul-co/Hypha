# `@codesoul-co/hypha-core` / `contracts/execution-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)
- Exports: **10**

## Using this module

Use the Execution human task module for declaring and runtime-validating contracts. It exports 1 constant, 9 interfaces.

### Import from the package entrypoint

```ts
import {
  EXECUTION_HUMAN_TASK_SUBJECT_VERSION,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionHumanTaskActivityIdentity,
  ExecutionHumanTaskCommandSnapshot,
  ExecutionHumanTaskEnvironmentSnapshot,
  ExecutionHumanTaskExpectedEffects,
  ExecutionHumanTaskNetworkSnapshot,
  ExecutionHumanTaskRiskSnapshot,
  ExecutionHumanTaskSubject,
  ExecutionHumanTaskSubjectEnvelope,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_HUMAN_TASK_SUBJECT_VERSION` | constant | <code>const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0"</code> | EXECUTION HUMAN TASK SUBJECT VERSION constant exported by the `contracts/execution-human-task` module. |
| `ExecutionHumanTaskActivityIdentity` | interface | <code>interface ExecutionHumanTaskActivityIdentity</code> | Execution Human Task Activity Identity interface with 7 public fields or methods. |
| `ExecutionHumanTaskCommandSnapshot` | interface | <code>interface ExecutionHumanTaskCommandSnapshot</code> | Execution Human Task Command Snapshot interface with 12 public fields or methods. |
| `ExecutionHumanTaskEnvironmentSnapshot` | interface | <code>interface ExecutionHumanTaskEnvironmentSnapshot</code> | Execution Human Task Environment Snapshot interface with 11 public fields or methods. |
| `ExecutionHumanTaskExpectedEffects` | interface | <code>interface ExecutionHumanTaskExpectedEffects</code> | Execution Human Task Expected Effects interface with 4 public fields or methods. |
| `ExecutionHumanTaskNetworkSnapshot` | interface | <code>interface ExecutionHumanTaskNetworkSnapshot</code> | Execution Human Task Network Snapshot interface with 7 public fields or methods. |
| `ExecutionHumanTaskRiskSnapshot` | interface | <code>interface ExecutionHumanTaskRiskSnapshot</code> | Execution Human Task Risk Snapshot interface with 5 public fields or methods. |
| `ExecutionHumanTaskSubject` | interface | <code>interface ExecutionHumanTaskSubject</code> | Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent. |
| `ExecutionHumanTaskSubjectEnvelope` | interface | <code>interface ExecutionHumanTaskSubjectEnvelope</code> | Execution Human Task Subject Envelope interface with 3 public fields or methods. |
| `ExecutionHumanTaskToolIdentity` | interface | <code>interface ExecutionHumanTaskToolIdentity</code> | Execution Human Task Tool Identity interface with 6 public fields or methods. |

## `EXECUTION_HUMAN_TASK_SUBJECT_VERSION`

EXECUTION HUMAN TASK SUBJECT VERSION constant exported by the `contracts/execution-human-task` module.

- Kind: constant
- Import: `import { EXECUTION_HUMAN_TASK_SUBJECT_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export declare const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0";
```

## `ExecutionHumanTaskActivityIdentity`

Execution Human Task Activity Identity interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskActivityIdentity } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskActivityIdentity {
    activityId: string;
    operationId: string;
    runId: string;
    stateAttemptId: string;
    workspaceId: string;
    fencingToken: number;
    deadlineAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskCommandSnapshot`

Execution Human Task Command Snapshot interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskCommandSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskCommandSnapshot {
    executable: string;
    args: string[];
    cwd?: string;
    shell: boolean;
    environmentVariableNames: string[];
    secretRefs: string[];
    networkAuthorizationRef?: string;
    expectedWorkspaceSnapshotHash?: string;
    timeoutMs?: number;
    idleTimeoutMs?: number;
    maxStdoutBytes?: number;
    maxStderrBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentVariableNames` | property | <code>environmentVariableNames: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkAuthorizationRef` | property | <code>networkAuthorizationRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretRefs` | property | <code>secretRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shell` | property | <code>shell: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskEnvironmentSnapshot`

Execution Human Task Environment Snapshot interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskEnvironmentSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskEnvironmentSnapshot {
    id: string;
    version: string;
    revision: string;
    provider: 'mock' | 'local_process' | 'docker' | 'remote_sandbox' | 'custom';
    providerRef?: string;
    providerId: string;
    providerRevision: string;
    imageDigest?: string;
    mounts: SandboxMountSpec[];
    network: ExecutionHumanTaskNetworkSnapshot;
    resources: ResourceLimitSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigest` | property | <code>imageDigest?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mounts` | property | <code>mounts: SandboxMountSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `network` | property | <code>network: ExecutionHumanTaskNetworkSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>resources: ResourceLimitSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskExpectedEffects`

Execution Human Task Expected Effects interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskExpectedEffects } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskExpectedEffects {
    workspaceWrite: boolean;
    networkAccess: boolean;
    secretAccess: boolean;
    artifactCapture: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactCapture` | property | <code>artifactCapture: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkAccess` | property | <code>networkAccess: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretAccess` | property | <code>secretAccess: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceWrite` | property | <code>workspaceWrite: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskNetworkSnapshot`

Execution Human Task Network Snapshot interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskNetworkSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskNetworkSnapshot {
    mode: 'disabled' | 'restricted' | 'enabled' | 'task_authorized';
    allowedDomains: string[];
    allowedCidrs: string[];
    allowedPorts: number[];
    allowedProtocols: Array<'tcp' | 'udp' | 'http' | 'https' | 'dns'>;
    proxyRef?: string;
    authorizationRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCidrs` | property | <code>allowedCidrs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedDomains` | property | <code>allowedDomains: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPorts` | property | <code>allowedPorts: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedProtocols` | property | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorizationRef` | property | <code>authorizationRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `proxyRef` | property | <code>proxyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskRiskSnapshot`

Execution Human Task Risk Snapshot interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskRiskSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskRiskSnapshot {
    assessmentId: string;
    level: RiskLevel;
    reasons: string[];
    matchedRules: string[];
    policyDecisionRef: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessmentId` | property | <code>assessmentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `level` | property | <code>level: RiskLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchedRules` | property | <code>matchedRules: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasons` | property | <code>reasons: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskSubject`

Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent.

- Kind: interface
- Import: `import type { ExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskSubject {
    id: string;
    version: typeof EXECUTION_HUMAN_TASK_SUBJECT_VERSION;
    kind: 'execution';
    capturedAt: string;
    principalId: string;
    inputHash: string;
    activity: ExecutionHumanTaskActivityIdentity;
    tool: ExecutionHumanTaskToolIdentity;
    command: ExecutionHumanTaskCommandSnapshot;
    environment: ExecutionHumanTaskEnvironmentSnapshot;
    risk: ExecutionHumanTaskRiskSnapshot;
    expectedEffects: ExecutionHumanTaskExpectedEffects;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionHumanTaskActivityIdentity</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capturedAt` | property | <code>capturedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command: ExecutionHumanTaskCommandSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: ExecutionHumanTaskEnvironmentSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedEffects` | property | <code>expectedEffects: ExecutionHumanTaskExpectedEffects</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `risk` | property | <code>risk: ExecutionHumanTaskRiskSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tool` | property | <code>tool: ExecutionHumanTaskToolIdentity</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskSubjectEnvelope`

Execution Human Task Subject Envelope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskSubjectEnvelope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskSubjectEnvelope {
    subjectRef: string;
    subjectHash: string;
    subject: ExecutionHumanTaskSubject;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `subject` | property | <code>subject: ExecutionHumanTaskSubject</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionHumanTaskToolIdentity`

Execution Human Task Tool Identity interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionHumanTaskToolIdentity } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### Declaration

```text
export interface ExecutionHumanTaskToolIdentity {
    toolId: string;
    toolRevision?: string;
    operation: ExecutionToolOperation;
    executionProfileRef: string;
    sideEffectLevel: ExecutionToolSideEffectLevel;
    humanReviewPolicyRef: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionProfileRef` | property | <code>executionProfileRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReviewPolicyRef` | property | <code>humanReviewPolicyRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
