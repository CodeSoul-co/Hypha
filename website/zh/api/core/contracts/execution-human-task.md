# `@codesoul-co/hypha-core` / `contracts/execution-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)
- 导出数: **10**

## 模块用法

用于声明并运行时校验契约。Execution human task 模块公开 1 常量、9 接口。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_HUMAN_TASK_SUBJECT_VERSION` | 常量 | <code>const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0"</code> | 由 `contracts/execution-human-task` 模块导出的 EXECUTION HUMAN TASK SUBJECT VERSION 常量。 |
| `ExecutionHumanTaskActivityIdentity` | 接口 | <code>interface ExecutionHumanTaskActivityIdentity</code> | Execution Human Task Activity Identity 接口，共包含 7 个公开字段或方法。 |
| `ExecutionHumanTaskCommandSnapshot` | 接口 | <code>interface ExecutionHumanTaskCommandSnapshot</code> | Execution Human Task Command Snapshot 接口，共包含 12 个公开字段或方法。 |
| `ExecutionHumanTaskEnvironmentSnapshot` | 接口 | <code>interface ExecutionHumanTaskEnvironmentSnapshot</code> | Execution Human Task Environment Snapshot 接口，共包含 11 个公开字段或方法。 |
| `ExecutionHumanTaskExpectedEffects` | 接口 | <code>interface ExecutionHumanTaskExpectedEffects</code> | Execution Human Task Expected Effects 接口，共包含 4 个公开字段或方法。 |
| `ExecutionHumanTaskNetworkSnapshot` | 接口 | <code>interface ExecutionHumanTaskNetworkSnapshot</code> | Execution Human Task Network Snapshot 接口，共包含 7 个公开字段或方法。 |
| `ExecutionHumanTaskRiskSnapshot` | 接口 | <code>interface ExecutionHumanTaskRiskSnapshot</code> | Execution Human Task Risk Snapshot 接口，共包含 5 个公开字段或方法。 |
| `ExecutionHumanTaskSubject` | 接口 | <code>interface ExecutionHumanTaskSubject</code> | Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent. |
| `ExecutionHumanTaskSubjectEnvelope` | 接口 | <code>interface ExecutionHumanTaskSubjectEnvelope</code> | Execution Human Task Subject Envelope 接口，共包含 3 个公开字段或方法。 |
| `ExecutionHumanTaskToolIdentity` | 接口 | <code>interface ExecutionHumanTaskToolIdentity</code> | Execution Human Task Tool Identity 接口，共包含 6 个公开字段或方法。 |

## `EXECUTION_HUMAN_TASK_SUBJECT_VERSION`

由 `contracts/execution-human-task` 模块导出的 EXECUTION HUMAN TASK SUBJECT VERSION 常量。

- 种类: 常量
- 导入: `import { EXECUTION_HUMAN_TASK_SUBJECT_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

```text
export declare const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0";
```

## `ExecutionHumanTaskActivityIdentity`

Execution Human Task Activity Identity 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskActivityIdentity } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskCommandSnapshot`

Execution Human Task Command Snapshot 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskCommandSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentVariableNames` | 属性 | <code>environmentVariableNames: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkAuthorizationRef` | 属性 | <code>networkAuthorizationRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretRefs` | 属性 | <code>secretRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shell` | 属性 | <code>shell: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskEnvironmentSnapshot`

Execution Human Task Environment Snapshot 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskEnvironmentSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigest` | 属性 | <code>imageDigest?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mounts` | 属性 | <code>mounts: SandboxMountSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `network` | 属性 | <code>network: ExecutionHumanTaskNetworkSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>resources: ResourceLimitSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskExpectedEffects`

Execution Human Task Expected Effects 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskExpectedEffects } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

```text
export interface ExecutionHumanTaskExpectedEffects {
    workspaceWrite: boolean;
    networkAccess: boolean;
    secretAccess: boolean;
    artifactCapture: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactCapture` | 属性 | <code>artifactCapture: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkAccess` | 属性 | <code>networkAccess: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretAccess` | 属性 | <code>secretAccess: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceWrite` | 属性 | <code>workspaceWrite: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskNetworkSnapshot`

Execution Human Task Network Snapshot 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskNetworkSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCidrs` | 属性 | <code>allowedCidrs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedDomains` | 属性 | <code>allowedDomains: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPorts` | 属性 | <code>allowedPorts: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedProtocols` | 属性 | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorizationRef` | 属性 | <code>authorizationRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `proxyRef` | 属性 | <code>proxyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskRiskSnapshot`

Execution Human Task Risk Snapshot 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskRiskSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

```text
export interface ExecutionHumanTaskRiskSnapshot {
    assessmentId: string;
    level: RiskLevel;
    reasons: string[];
    matchedRules: string[];
    policyDecisionRef: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessmentId` | 属性 | <code>assessmentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `level` | 属性 | <code>level: RiskLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchedRules` | 属性 | <code>matchedRules: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskSubject`

Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent.

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskSubject } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionHumanTaskActivityIdentity</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capturedAt` | 属性 | <code>capturedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command: ExecutionHumanTaskCommandSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: ExecutionHumanTaskEnvironmentSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedEffects` | 属性 | <code>expectedEffects: ExecutionHumanTaskExpectedEffects</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `risk` | 属性 | <code>risk: ExecutionHumanTaskRiskSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tool` | 属性 | <code>tool: ExecutionHumanTaskToolIdentity</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskSubjectEnvelope`

Execution Human Task Subject Envelope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskSubjectEnvelope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

```text
export interface ExecutionHumanTaskSubjectEnvelope {
    subjectRef: string;
    subjectHash: string;
    subject: ExecutionHumanTaskSubject;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `subject` | 属性 | <code>subject: ExecutionHumanTaskSubject</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionHumanTaskToolIdentity`

Execution Human Task Tool Identity 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionHumanTaskToolIdentity } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionProfileRef` | 属性 | <code>executionProfileRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReviewPolicyRef` | 属性 | <code>humanReviewPolicyRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
