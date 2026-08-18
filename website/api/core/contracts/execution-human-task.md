# `@codesoul-co/hypha-core` / `contracts/execution-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-human-task.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_HUMAN_TASK_SUBJECT_VERSION` | constant | <code>const EXECUTION_HUMAN_TASK_SUBJECT_VERSION: "1.0.0"</code> | EXECUTION HUMAN TASK SUBJECT VERSION constant exported by the `contracts/execution-human-task` module. |
| `ExecutionHumanTaskActivityIdentity` | interface | <code>interface ExecutionHumanTaskActivityIdentity</code> | Field contract for Execution Human Task Activity Identity; see all contract members below. |
| `ExecutionHumanTaskCommandSnapshot` | interface | <code>interface ExecutionHumanTaskCommandSnapshot</code> | Field contract for Execution Human Task Command Snapshot; see all contract members below. |
| `ExecutionHumanTaskEnvironmentSnapshot` | interface | <code>interface ExecutionHumanTaskEnvironmentSnapshot</code> | Field contract for Execution Human Task Environment Snapshot; see all contract members below. |
| `ExecutionHumanTaskExpectedEffects` | interface | <code>interface ExecutionHumanTaskExpectedEffects</code> | Field contract for Execution Human Task Expected Effects; see all contract members below. |
| `ExecutionHumanTaskNetworkSnapshot` | interface | <code>interface ExecutionHumanTaskNetworkSnapshot</code> | Field contract for Execution Human Task Network Snapshot; see all contract members below. |
| `ExecutionHumanTaskRiskSnapshot` | interface | <code>interface ExecutionHumanTaskRiskSnapshot</code> | Field contract for Execution Human Task Risk Snapshot; see all contract members below. |
| `ExecutionHumanTaskSubject` | interface | <code>interface ExecutionHumanTaskSubject</code> | Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent. |
| `ExecutionHumanTaskSubjectEnvelope` | interface | <code>interface ExecutionHumanTaskSubjectEnvelope</code> | Field contract for Execution Human Task Subject Envelope; see all contract members below. |
| `ExecutionHumanTaskToolIdentity` | interface | <code>interface ExecutionHumanTaskToolIdentity</code> | Field contract for Execution Human Task Tool Identity; see all contract members below. |

## `ExecutionHumanTaskActivityIdentity` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public state Attempt Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionHumanTaskCommandSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `environmentVariableNames` | property | <code>environmentVariableNames: string[]</code> | Public environment Variable Names property. |
| `executable` | property | <code>executable: string</code> | Public executable property. |
| `expectedWorkspaceSnapshotHash` | property | <code>expectedWorkspaceSnapshotHash: string</code> | Public expected Workspace Snapshot Hash property. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs: number</code> | Public idle Timeout Ms property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `networkAuthorizationRef` | property | <code>networkAuthorizationRef: string</code> | Public network Authorization Ref property. |
| `secretRefs` | property | <code>secretRefs: string[]</code> | Public secret Refs property. |
| `shell` | property | <code>shell: boolean</code> | Public shell property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `ExecutionHumanTaskEnvironmentSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `imageDigest` | property | <code>imageDigest: string</code> | Public image Digest property. |
| `mounts` | property | <code>mounts: SandboxMountSpec[]</code> | Public mounts property. |
| `network` | property | <code>network: ExecutionHumanTaskNetworkSnapshot</code> | Public network property. |
| `provider` | property | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public provider property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `resources` | property | <code>resources: ResourceLimitSpec</code> | Public resources property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ExecutionHumanTaskExpectedEffects` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactCapture` | property | <code>artifactCapture: boolean</code> | Public artifact Capture property. |
| `networkAccess` | property | <code>networkAccess: boolean</code> | Public network Access property. |
| `secretAccess` | property | <code>secretAccess: boolean</code> | Public secret Access property. |
| `workspaceWrite` | property | <code>workspaceWrite: boolean</code> | Public workspace Write property. |

## `ExecutionHumanTaskNetworkSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCidrs` | property | <code>allowedCidrs: string[]</code> | Public allowed Cidrs property. |
| `allowedDomains` | property | <code>allowedDomains: string[]</code> | Public allowed Domains property. |
| `allowedPorts` | property | <code>allowedPorts: number[]</code> | Public allowed Ports property. |
| `allowedProtocols` | property | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | Public allowed Protocols property. |
| `authorizationRef` | property | <code>authorizationRef: string</code> | Public authorization Ref property. |
| `mode` | property | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | Public mode property. |
| `proxyRef` | property | <code>proxyRef: string</code> | Public proxy Ref property. |

## `ExecutionHumanTaskRiskSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessmentId` | property | <code>assessmentId: string</code> | Public assessment Id property. |
| `level` | property | <code>level: RiskLevel</code> | Public level property. |
| `matchedRules` | property | <code>matchedRules: string[]</code> | Public matched Rules property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `reasons` | property | <code>reasons: string[]</code> | Public reasons property. |

## `ExecutionHumanTaskSubject` contract members

Versioned, redacted subject approved by a Runtime HumanTask before command dispatch. Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: ExecutionHumanTaskActivityIdentity</code> | Public activity property. |
| `capturedAt` | property | <code>capturedAt: string</code> | Public captured At property. |
| `command` | property | <code>command: ExecutionHumanTaskCommandSnapshot</code> | Public command property. |
| `environment` | property | <code>environment: ExecutionHumanTaskEnvironmentSnapshot</code> | Public environment property. |
| `expectedEffects` | property | <code>expectedEffects: ExecutionHumanTaskExpectedEffects</code> | Public expected Effects property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `kind` | property | <code>kind: "execution"</code> | Public kind property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `risk` | property | <code>risk: ExecutionHumanTaskRiskSnapshot</code> | Public risk property. |
| `tool` | property | <code>tool: ExecutionHumanTaskToolIdentity</code> | Public tool property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `ExecutionHumanTaskSubjectEnvelope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `subject` | property | <code>subject: ExecutionHumanTaskSubject</code> | Public subject property. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public subject Hash property. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public subject Ref property. |

## `ExecutionHumanTaskToolIdentity` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionProfileRef` | property | <code>executionProfileRef: string</code> | Public execution Profile Ref property. |
| `humanReviewPolicyRef` | property | <code>humanReviewPolicyRef: string</code> | Public human Review Policy Ref property. |
| `operation` | property | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public operation property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | Public side Effect Level property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
