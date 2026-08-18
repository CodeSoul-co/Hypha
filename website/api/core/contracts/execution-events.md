# `@codesoul-co/hypha-core` / `contracts/execution-events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CommandExecutionEventPayload` | interface | <code>interface CommandExecutionEventPayload extends ExecutionEventPayloadBase</code> | Field contract for Command Execution Event Payload; see all contract members below. |
| `ExecutionEventPayloadBase` | interface | <code>interface ExecutionEventPayloadBase</code> | Field contract for Execution Event Payload Base; see all contract members below. |
| `NetworkAuthorizationEventPayload` | interface | <code>interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase</code> | Field contract for Network Authorization Event Payload; see all contract members below. |
| `SandboxLifecycleEventPayload` | interface | <code>interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase</code> | Field contract for Sandbox Lifecycle Event Payload; see all contract members below. |
| `CommandExecutionFrameworkEventType` | type | <code>type CommandExecutionFrameworkEventType = 'command.execution.requested' &#124; 'command.execution.validated' &#124; 'command.execution.approval.required' &#124; 'command.execution.queued' &#124; 'command.execution.started' &#124; 'command.execution.output.truncated' &#124; 'command.execution.resource.exceeded' &#124; 'command.execution.oom_killed' &#124; 'command.execution.timeout' &#124; 'command.execution.cancellation.requested' &#124; 'command.execution.cancel...</code> | Public type alias for Command Execution Framework Event Type. |
| `ExecutionEventCreateInput` | type | <code>type ExecutionEventCreateInput = Omit&lt;EventCreateInput&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Execution Event Create Input. |
| `ExecutionEventPayloadMap` | type | <code>type ExecutionEventPayloadMap = { [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload; } &amp; { [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload; } &amp; { [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload; }</code> | Public type alias for Execution Event Payload Map. |
| `ExecutionFrameworkEvent` | type | <code>type ExecutionFrameworkEvent = Omit&lt;FrameworkEvent&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Execution Framework Event. |
| `ExecutionFrameworkEventType` | type | <code>type ExecutionFrameworkEventType = SandboxFrameworkEventType &#124; CommandExecutionFrameworkEventType &#124; NetworkAuthorizationFrameworkEventType</code> | Public type alias for Execution Framework Event Type. |
| `NetworkAuthorizationFrameworkEventType` | type | <code>type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' &#124; 'network.authorization.granted' &#124; 'network.authorization.denied' &#124; 'network.authorization.revoked'</code> | Public type alias for Network Authorization Framework Event Type. |
| `SandboxFrameworkEventType` | type | <code>type SandboxFrameworkEventType = 'sandbox.create.requested' &#124; 'sandbox.created' &#124; 'sandbox.started' &#124; 'sandbox.ready' &#124; 'sandbox.degraded' &#124; 'sandbox.terminate.requested' &#124; 'sandbox.terminated' &#124; 'sandbox.cleanup.completed' &#124; 'sandbox.cleanup.failed'</code> | Public type alias for Sandbox Framework Event Type. |

## `CommandExecutionEventPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRef` | property | <code>approvalRef: string</code> | Public approval Ref property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `environmentId` | property | <code>environmentId: string</code> | Public environment Id property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `exitCode` | property | <code>exitCode: number</code> | Public exit Code property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `outputStream` | property | <code>outputStream: "stdout" &#124; "stderr"</code> | Public output Stream property. |
| `outputTruncated` | property | <code>outputTruncated: boolean</code> | Public output Truncated property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `recoveryDisposition` | property | <code>recoveryDisposition: ExecutionRecoveryDisposition</code> | Public recovery Disposition property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `signal` | property | <code>signal: string</code> | Public signal property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public status property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionEventPayloadBase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `environmentId` | property | <code>environmentId: string</code> | Public environment Id property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `status` | property | <code>status: string</code> | Public status property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `NetworkAuthorizationEventPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `authorizationId` | property | <code>authorizationId: string</code> | Public authorization Id property. |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `decision` | property | <code>decision: "requested" &#124; "granted" &#124; "denied" &#124; "revoked"</code> | Public decision property. |
| `environmentId` | property | <code>environmentId: string</code> | Public environment Id property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public network Policy Hash property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `status` | property | <code>status: string</code> | Public status property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `SandboxLifecycleEventPayload` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `environmentId` | property | <code>environmentId: string</code> | Public environment Id property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `missingCapabilities` | property | <code>missingCapabilities: (keyof import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/sandbox").SandboxProviderCapabilities)[]</code> | Public missing Capabilities property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerSandboxRef` | property | <code>providerSandboxRef: string</code> | Public provider Sandbox Ref property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `status` | property | <code>status: "degraded" &#124; SandboxStatus</code> | Public status property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
