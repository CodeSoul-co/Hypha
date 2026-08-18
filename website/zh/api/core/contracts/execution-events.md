# `@codesoul-co/hypha-core` / `contracts/execution-events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CommandExecutionEventPayload` | 接口 | <code>interface CommandExecutionEventPayload extends ExecutionEventPayloadBase</code> | Command Execution Event Payload 的字段契约；完整字段见下表。 |
| `ExecutionEventPayloadBase` | 接口 | <code>interface ExecutionEventPayloadBase</code> | Execution Event Payload Base 的字段契约；完整字段见下表。 |
| `NetworkAuthorizationEventPayload` | 接口 | <code>interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase</code> | Network Authorization Event Payload 的字段契约；完整字段见下表。 |
| `SandboxLifecycleEventPayload` | 接口 | <code>interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase</code> | Sandbox Lifecycle Event Payload 的字段契约；完整字段见下表。 |
| `CommandExecutionFrameworkEventType` | 类型 | <code>type CommandExecutionFrameworkEventType = 'command.execution.requested' &#124; 'command.execution.validated' &#124; 'command.execution.approval.required' &#124; 'command.execution.queued' &#124; 'command.execution.started' &#124; 'command.execution.output.truncated' &#124; 'command.execution.resource.exceeded' &#124; 'command.execution.oom_killed' &#124; 'command.execution.timeout' &#124; 'command.execution.cancellation.requested' &#124; 'command.execution.cancel...</code> | Command Execution Framework Event Type 的公共类型别名。 |
| `ExecutionEventCreateInput` | 类型 | <code>type ExecutionEventCreateInput = Omit&lt;EventCreateInput&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Execution Event Create Input 的公共类型别名。 |
| `ExecutionEventPayloadMap` | 类型 | <code>type ExecutionEventPayloadMap = { [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload; } &amp; { [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload; } &amp; { [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload; }</code> | Execution Event Payload Map 的公共类型别名。 |
| `ExecutionFrameworkEvent` | 类型 | <code>type ExecutionFrameworkEvent = Omit&lt;FrameworkEvent&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Execution Framework Event 的公共类型别名。 |
| `ExecutionFrameworkEventType` | 类型 | <code>type ExecutionFrameworkEventType = SandboxFrameworkEventType &#124; CommandExecutionFrameworkEventType &#124; NetworkAuthorizationFrameworkEventType</code> | Execution Framework Event Type 的公共类型别名。 |
| `NetworkAuthorizationFrameworkEventType` | 类型 | <code>type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' &#124; 'network.authorization.granted' &#124; 'network.authorization.denied' &#124; 'network.authorization.revoked'</code> | Network Authorization Framework Event Type 的公共类型别名。 |
| `SandboxFrameworkEventType` | 类型 | <code>type SandboxFrameworkEventType = 'sandbox.create.requested' &#124; 'sandbox.created' &#124; 'sandbox.started' &#124; 'sandbox.ready' &#124; 'sandbox.degraded' &#124; 'sandbox.terminate.requested' &#124; 'sandbox.terminated' &#124; 'sandbox.cleanup.completed' &#124; 'sandbox.cleanup.failed'</code> | Sandbox Framework Event Type 的公共类型别名。 |

## `CommandExecutionEventPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRef` | 属性 | <code>approvalRef: string</code> | approval Ref 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `environmentId` | 属性 | <code>environmentId: string</code> | environment Id 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | exit Code 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `outputStream` | 属性 | <code>outputStream: "stdout" &#124; "stderr"</code> | output Stream 字段。 |
| `outputTruncated` | 属性 | <code>outputTruncated: boolean</code> | output Truncated 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `recoveryDisposition` | 属性 | <code>recoveryDisposition: ExecutionRecoveryDisposition</code> | recovery Disposition 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `signal` | 属性 | <code>signal: string</code> | signal 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | status 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionEventPayloadBase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `environmentId` | 属性 | <code>environmentId: string</code> | environment Id 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `status` | 属性 | <code>status: string</code> | status 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `NetworkAuthorizationEventPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `authorizationId` | 属性 | <code>authorizationId: string</code> | authorization Id 字段。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `decision` | 属性 | <code>decision: "requested" &#124; "granted" &#124; "denied" &#124; "revoked"</code> | decision 字段。 |
| `environmentId` | 属性 | <code>environmentId: string</code> | environment Id 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | network Policy Hash 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `status` | 属性 | <code>status: string</code> | status 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `SandboxLifecycleEventPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `environmentId` | 属性 | <code>environmentId: string</code> | environment Id 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `missingCapabilities` | 属性 | <code>missingCapabilities: (keyof import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/sandbox").SandboxProviderCapabilities)[]</code> | missing Capabilities 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerSandboxRef` | 属性 | <code>providerSandboxRef: string</code> | provider Sandbox Ref 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `status` | 属性 | <code>status: "degraded" &#124; SandboxStatus</code> | status 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
