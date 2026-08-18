# `@codesoul-co/hypha-core` / `contracts/execution-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_HUMAN_TASK_SUBJECT_VERSION` | 常量 | <code>const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0"</code> | 由 `contracts/execution-human-task` 模块导出的 EXECUTION HUMAN TASK SUBJECT VERSION 常量。 |
| `ExecutionHumanTaskActivityIdentity` | 接口 | <code>interface ExecutionHumanTaskActivityIdentity</code> | Execution Human Task Activity Identity 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskCommandSnapshot` | 接口 | <code>interface ExecutionHumanTaskCommandSnapshot</code> | Execution Human Task Command Snapshot 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskEnvironmentSnapshot` | 接口 | <code>interface ExecutionHumanTaskEnvironmentSnapshot</code> | Execution Human Task Environment Snapshot 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskExpectedEffects` | 接口 | <code>interface ExecutionHumanTaskExpectedEffects</code> | Execution Human Task Expected Effects 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskNetworkSnapshot` | 接口 | <code>interface ExecutionHumanTaskNetworkSnapshot</code> | Execution Human Task Network Snapshot 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskRiskSnapshot` | 接口 | <code>interface ExecutionHumanTaskRiskSnapshot</code> | Execution Human Task Risk Snapshot 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskSubject` | 接口 | <code>interface ExecutionHumanTaskSubject</code> | Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent. |
| `ExecutionHumanTaskSubjectEnvelope` | 接口 | <code>interface ExecutionHumanTaskSubjectEnvelope</code> | Execution Human Task Subject Envelope 的字段契约；完整字段见下表。 |
| `ExecutionHumanTaskToolIdentity` | 接口 | <code>interface ExecutionHumanTaskToolIdentity</code> | Execution Human Task Tool Identity 的字段契约；完整字段见下表。 |

## `ExecutionHumanTaskActivityIdentity` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | state Attempt Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionHumanTaskCommandSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `environmentVariableNames` | 属性 | <code>environmentVariableNames: string[]</code> | environment Variable Names 字段。 |
| `executable` | 属性 | <code>executable: string</code> | executable 字段。 |
| `expectedWorkspaceSnapshotHash` | 属性 | <code>expectedWorkspaceSnapshotHash: string</code> | expected Workspace Snapshot Hash 字段。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs: number</code> | idle Timeout Ms 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `networkAuthorizationRef` | 属性 | <code>networkAuthorizationRef: string</code> | network Authorization Ref 字段。 |
| `secretRefs` | 属性 | <code>secretRefs: string[]</code> | secret Refs 字段。 |
| `shell` | 属性 | <code>shell: boolean</code> | shell 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `ExecutionHumanTaskEnvironmentSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `imageDigest` | 属性 | <code>imageDigest: string</code> | image Digest 字段。 |
| `mounts` | 属性 | <code>mounts: SandboxMountSpec[]</code> | mounts 字段。 |
| `network` | 属性 | <code>network: ExecutionHumanTaskNetworkSnapshot</code> | network 字段。 |
| `provider` | 属性 | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | provider 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `resources` | 属性 | <code>resources: ResourceLimitSpec</code> | resources 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ExecutionHumanTaskExpectedEffects` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactCapture` | 属性 | <code>artifactCapture: boolean</code> | artifact Capture 字段。 |
| `networkAccess` | 属性 | <code>networkAccess: boolean</code> | network Access 字段。 |
| `secretAccess` | 属性 | <code>secretAccess: boolean</code> | secret Access 字段。 |
| `workspaceWrite` | 属性 | <code>workspaceWrite: boolean</code> | workspace Write 字段。 |

## `ExecutionHumanTaskNetworkSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCidrs` | 属性 | <code>allowedCidrs: string[]</code> | allowed Cidrs 字段。 |
| `allowedDomains` | 属性 | <code>allowedDomains: string[]</code> | allowed Domains 字段。 |
| `allowedPorts` | 属性 | <code>allowedPorts: number[]</code> | allowed Ports 字段。 |
| `allowedProtocols` | 属性 | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | allowed Protocols 字段。 |
| `authorizationRef` | 属性 | <code>authorizationRef: string</code> | authorization Ref 字段。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | mode 字段。 |
| `proxyRef` | 属性 | <code>proxyRef: string</code> | proxy Ref 字段。 |

## `ExecutionHumanTaskRiskSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessmentId` | 属性 | <code>assessmentId: string</code> | assessment Id 字段。 |
| `level` | 属性 | <code>level: RiskLevel</code> | level 字段。 |
| `matchedRules` | 属性 | <code>matchedRules: string[]</code> | matched Rules 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | reasons 字段。 |

## `ExecutionHumanTaskSubject` 契约字段

Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: ExecutionHumanTaskActivityIdentity</code> | activity 字段。 |
| `capturedAt` | 属性 | <code>capturedAt: string</code> | captured At 字段。 |
| `command` | 属性 | <code>command: ExecutionHumanTaskCommandSnapshot</code> | command 字段。 |
| `environment` | 属性 | <code>environment: ExecutionHumanTaskEnvironmentSnapshot</code> | environment 字段。 |
| `expectedEffects` | 属性 | <code>expectedEffects: ExecutionHumanTaskExpectedEffects</code> | expected Effects 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `kind` | 属性 | <code>kind: "execution"</code> | kind 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `risk` | 属性 | <code>risk: ExecutionHumanTaskRiskSnapshot</code> | risk 字段。 |
| `tool` | 属性 | <code>tool: ExecutionHumanTaskToolIdentity</code> | tool 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `ExecutionHumanTaskSubjectEnvelope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `subject` | 属性 | <code>subject: ExecutionHumanTaskSubject</code> | subject 字段。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | subject Hash 字段。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | subject Ref 字段。 |

## `ExecutionHumanTaskToolIdentity` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionProfileRef` | 属性 | <code>executionProfileRef: string</code> | execution Profile Ref 字段。 |
| `humanReviewPolicyRef` | 属性 | <code>humanReviewPolicyRef: string</code> | human Review Policy Ref 字段。 |
| `operation` | 属性 | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | operation 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | side Effect Level 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
