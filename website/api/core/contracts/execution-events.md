# `@codesoul-co/hypha-core` / `contracts/execution-events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)
- Exports: **11**

## Using this module

Use the Execution events module for declaring and runtime-validating contracts. It exports 4 interfaces, 7 types.

### Import from the package entrypoint

```ts
import type {
  CommandExecutionEventPayload,
  ExecutionEventPayloadBase,
  NetworkAuthorizationEventPayload,
  SandboxLifecycleEventPayload,
  CommandExecutionFrameworkEventType,
  ExecutionEventCreateInput,
  ExecutionEventPayloadMap,
  ExecutionFrameworkEvent,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CommandExecutionEventPayload` | interface | <code>interface CommandExecutionEventPayload extends ExecutionEventPayloadBase</code> | Command Execution Event Payload interface with 22 public fields or methods. |
| `ExecutionEventPayloadBase` | interface | <code>interface ExecutionEventPayloadBase</code> | Execution Event Payload Base interface with 14 public fields or methods. |
| `NetworkAuthorizationEventPayload` | interface | <code>interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase</code> | Network Authorization Event Payload interface with 19 public fields or methods. |
| `SandboxLifecycleEventPayload` | interface | <code>interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase</code> | Sandbox Lifecycle Event Payload interface with 17 public fields or methods. |
| `CommandExecutionFrameworkEventType` | type | <code>type CommandExecutionFrameworkEventType = 'command.execution.requested' &#124; 'command.execution.validated' &#124; 'command.execution.approval.required' &#124; 'command.execution.queued' &#124; 'command.execution.started' &#124; 'command.execution.output.truncated' &#124; 'command.execution.resource.exceeded' &#124; 'command.execution.oom_killed' &#124; 'command.execution.timeout' &#124; 'command.execution.cancellation.requested' &#124; 'command.execution.cancel...</code> | Public type alias for Command Execution Framework Event Type; the declaration contains its complete type expression. |
| `ExecutionEventCreateInput` | type | <code>type ExecutionEventCreateInput = Omit&lt;EventCreateInput&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Execution Event Create Input; the declaration contains its complete type expression. |
| `ExecutionEventPayloadMap` | type | <code>type ExecutionEventPayloadMap = { [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload; } &amp; { [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload; } &amp; { [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload; }</code> | Public type alias for Execution Event Payload Map; the declaration contains its complete type expression. |
| `ExecutionFrameworkEvent` | type | <code>type ExecutionFrameworkEvent = Omit&lt;FrameworkEvent&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Execution Framework Event; the declaration contains its complete type expression. |
| `ExecutionFrameworkEventType` | type | <code>type ExecutionFrameworkEventType = SandboxFrameworkEventType &#124; CommandExecutionFrameworkEventType &#124; NetworkAuthorizationFrameworkEventType</code> | Public type alias for Execution Framework Event Type; the declaration contains its complete type expression. |
| `NetworkAuthorizationFrameworkEventType` | type | <code>type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' &#124; 'network.authorization.granted' &#124; 'network.authorization.denied' &#124; 'network.authorization.revoked'</code> | Public type alias for Network Authorization Framework Event Type; the declaration contains its complete type expression. |
| `SandboxFrameworkEventType` | type | <code>type SandboxFrameworkEventType = 'sandbox.create.requested' &#124; 'sandbox.created' &#124; 'sandbox.started' &#124; 'sandbox.ready' &#124; 'sandbox.degraded' &#124; 'sandbox.terminate.requested' &#124; 'sandbox.terminated' &#124; 'sandbox.cleanup.completed' &#124; 'sandbox.cleanup.failed'</code> | Public type alias for Sandbox Framework Event Type; the declaration contains its complete type expression. |

## `CommandExecutionEventPayload`

Command Execution Event Payload interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { CommandExecutionEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export interface CommandExecutionEventPayload extends ExecutionEventPayloadBase {
    executionId: string;
    revision?: number;
    providerId?: string;
    status?: CommandExecutionStatus;
    exitCode?: number | null;
    signal?: string;
    outputStream?: 'stdout' | 'stderr';
    outputTruncated?: boolean;
    approvalRef?: string;
    recoveryDisposition?: ExecutionRecoveryDisposition;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRef` | property | <code>approvalRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandHash` | property | <code>commandHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentId` | property | <code>environmentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exitCode` | property | <code>exitCode?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputStream` | property | <code>outputStream?: "stdout" &#124; "stderr"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputTruncated` | property | <code>outputTruncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recoveryDisposition` | property | <code>recoveryDisposition?: ExecutionRecoveryDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: CommandExecutionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionEventPayloadBase`

Execution Event Payload Base interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionEventPayloadBase } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export interface ExecutionEventPayloadBase {
    operationId?: string;
    executionId?: string;
    sandboxId?: string;
    workspaceId?: string;
    environmentId?: string;
    environmentRevision?: string;
    commandHash?: string;
    sourceTreeHash?: string;
    artifactRefs?: string[];
    status?: string;
    latencyMs?: number;
    resourceUsage?: ExecutionResourceUsage;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandHash` | property | <code>commandHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentId` | property | <code>environmentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NetworkAuthorizationEventPayload`

Network Authorization Event Payload interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { NetworkAuthorizationEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase {
    authorizationId: string;
    networkPolicyHash: string;
    decision: 'requested' | 'granted' | 'denied' | 'revoked';
    expiresAt?: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorizationId` | property | <code>authorizationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandHash` | property | <code>commandHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: "requested" &#124; "granted" &#124; "denied" &#124; "revoked"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentId` | property | <code>environmentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxLifecycleEventPayload`

Sandbox Lifecycle Event Payload interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { SandboxLifecycleEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase {
    sandboxId?: string;
    providerId?: string;
    providerSandboxRef?: string;
    status?: SandboxStatus | 'degraded';
    missingCapabilities?: SandboxCapabilityName[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandHash` | property | <code>commandHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentId` | property | <code>environmentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingCapabilities` | property | <code>missingCapabilities?: (keyof import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/sandbox").SandboxProviderCapabilities)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerSandboxRef` | property | <code>providerSandboxRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: "degraded" &#124; SandboxStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommandExecutionFrameworkEventType`

Public type alias for Command Execution Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CommandExecutionFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type CommandExecutionFrameworkEventType = 'command.execution.requested' | 'command.execution.validated' | 'command.execution.approval.required' | 'command.execution.queued' | 'command.execution.started' | 'command.execution.output.truncated' | 'command.execution.resource.exceeded' | 'command.execution.oom_killed' | 'command.execution.timeout' | 'command.execution.cancellation.requested' | 'command.execution.cancelled' | 'command.execution.completed' | 'command.execution.failed' | 'command.execution.result.unknown' | 'command.execution.recovered';
```

## `ExecutionEventCreateInput`

Public type alias for Execution Event Create Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionEventCreateInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type ExecutionEventCreateInput<TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType> = Omit<EventCreateInput<ExecutionEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ExecutionEventPayloadMap`

Public type alias for Execution Event Payload Map; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionEventPayloadMap } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type ExecutionEventPayloadMap = {
    [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload;
} & {
    [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload;
} & {
    [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload;
};
```

## `ExecutionFrameworkEvent`

Public type alias for Execution Framework Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type ExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType> = Omit<FrameworkEvent<ExecutionEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ExecutionFrameworkEventType`

Public type alias for Execution Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type ExecutionFrameworkEventType = SandboxFrameworkEventType | CommandExecutionFrameworkEventType | NetworkAuthorizationFrameworkEventType;
```

## `NetworkAuthorizationFrameworkEventType`

Public type alias for Network Authorization Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { NetworkAuthorizationFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' | 'network.authorization.granted' | 'network.authorization.denied' | 'network.authorization.revoked';
```

## `SandboxFrameworkEventType`

Public type alias for Sandbox Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SandboxFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### Declaration

```text
export type SandboxFrameworkEventType = 'sandbox.create.requested' | 'sandbox.created' | 'sandbox.started' | 'sandbox.ready' | 'sandbox.degraded' | 'sandbox.terminate.requested' | 'sandbox.terminated' | 'sandbox.cleanup.completed' | 'sandbox.cleanup.failed';
```
