# `@codesoul-co/hypha-core` / `contracts/execution-events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)
- 导出数: **11**

## 模块用法

用于声明并运行时校验契约。Execution events 模块公开 4 接口、7 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CommandExecutionEventPayload` | 接口 | <code>interface CommandExecutionEventPayload extends ExecutionEventPayloadBase</code> | Command Execution Event Payload 接口，共包含 22 个公开字段或方法。 |
| `ExecutionEventPayloadBase` | 接口 | <code>interface ExecutionEventPayloadBase</code> | Execution Event Payload Base 接口，共包含 14 个公开字段或方法。 |
| `NetworkAuthorizationEventPayload` | 接口 | <code>interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase</code> | Network Authorization Event Payload 接口，共包含 19 个公开字段或方法。 |
| `SandboxLifecycleEventPayload` | 接口 | <code>interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase</code> | Sandbox Lifecycle Event Payload 接口，共包含 17 个公开字段或方法。 |
| `CommandExecutionFrameworkEventType` | 类型 | <code>type CommandExecutionFrameworkEventType = 'command.execution.requested' &#124; 'command.execution.validated' &#124; 'command.execution.approval.required' &#124; 'command.execution.queued' &#124; 'command.execution.started' &#124; 'command.execution.output.truncated' &#124; 'command.execution.resource.exceeded' &#124; 'command.execution.oom_killed' &#124; 'command.execution.timeout' &#124; 'command.execution.cancellation.requested' &#124; 'command.execution.cancel...</code> | Command Execution Framework Event Type 公共类型别名；完整类型表达式见声明。 |
| `ExecutionEventCreateInput` | 类型 | <code>type ExecutionEventCreateInput = Omit&lt;EventCreateInput&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Execution Event Create Input 公共类型别名；完整类型表达式见声明。 |
| `ExecutionEventPayloadMap` | 类型 | <code>type ExecutionEventPayloadMap = { [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload; } &amp; { [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload; } &amp; { [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload; }</code> | Execution Event Payload Map 公共类型别名；完整类型表达式见声明。 |
| `ExecutionFrameworkEvent` | 类型 | <code>type ExecutionFrameworkEvent = Omit&lt;FrameworkEvent&lt;ExecutionEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Execution Framework Event 公共类型别名；完整类型表达式见声明。 |
| `ExecutionFrameworkEventType` | 类型 | <code>type ExecutionFrameworkEventType = SandboxFrameworkEventType &#124; CommandExecutionFrameworkEventType &#124; NetworkAuthorizationFrameworkEventType</code> | Execution Framework Event Type 公共类型别名；完整类型表达式见声明。 |
| `NetworkAuthorizationFrameworkEventType` | 类型 | <code>type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' &#124; 'network.authorization.granted' &#124; 'network.authorization.denied' &#124; 'network.authorization.revoked'</code> | Network Authorization Framework Event Type 公共类型别名；完整类型表达式见声明。 |
| `SandboxFrameworkEventType` | 类型 | <code>type SandboxFrameworkEventType = 'sandbox.create.requested' &#124; 'sandbox.created' &#124; 'sandbox.started' &#124; 'sandbox.ready' &#124; 'sandbox.degraded' &#124; 'sandbox.terminate.requested' &#124; 'sandbox.terminated' &#124; 'sandbox.cleanup.completed' &#124; 'sandbox.cleanup.failed'</code> | Sandbox Framework Event Type 公共类型别名；完整类型表达式见声明。 |

## `CommandExecutionEventPayload`

Command Execution Event Payload 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommandExecutionEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRef` | 属性 | <code>approvalRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandHash` | 属性 | <code>commandHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentId` | 属性 | <code>environmentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exitCode` | 属性 | <code>exitCode?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputStream` | 属性 | <code>outputStream?: "stdout" &#124; "stderr"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputTruncated` | 属性 | <code>outputTruncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recoveryDisposition` | 属性 | <code>recoveryDisposition?: ExecutionRecoveryDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: CommandExecutionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionEventPayloadBase`

Execution Event Payload Base 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionEventPayloadBase } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandHash` | 属性 | <code>commandHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentId` | 属性 | <code>environmentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NetworkAuthorizationEventPayload`

Network Authorization Event Payload 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NetworkAuthorizationEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase {
    authorizationId: string;
    networkPolicyHash: string;
    decision: 'requested' | 'granted' | 'denied' | 'revoked';
    expiresAt?: string;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorizationId` | 属性 | <code>authorizationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandHash` | 属性 | <code>commandHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: "requested" &#124; "granted" &#124; "denied" &#124; "revoked"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentId` | 属性 | <code>environmentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxLifecycleEventPayload`

Sandbox Lifecycle Event Payload 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxLifecycleEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase {
    sandboxId?: string;
    providerId?: string;
    providerSandboxRef?: string;
    status?: SandboxStatus | 'degraded';
    missingCapabilities?: SandboxCapabilityName[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandHash` | 属性 | <code>commandHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentId` | 属性 | <code>environmentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingCapabilities` | 属性 | <code>missingCapabilities?: (keyof import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/sandbox").SandboxProviderCapabilities)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerSandboxRef` | 属性 | <code>providerSandboxRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: "degraded" &#124; SandboxStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommandExecutionFrameworkEventType`

Command Execution Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { CommandExecutionFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type CommandExecutionFrameworkEventType = 'command.execution.requested' | 'command.execution.validated' | 'command.execution.approval.required' | 'command.execution.queued' | 'command.execution.started' | 'command.execution.output.truncated' | 'command.execution.resource.exceeded' | 'command.execution.oom_killed' | 'command.execution.timeout' | 'command.execution.cancellation.requested' | 'command.execution.cancelled' | 'command.execution.completed' | 'command.execution.failed' | 'command.execution.result.unknown' | 'command.execution.recovered';
```

## `ExecutionEventCreateInput`

Execution Event Create Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionEventCreateInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type ExecutionEventCreateInput<TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType> = Omit<EventCreateInput<ExecutionEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ExecutionEventPayloadMap`

Execution Event Payload Map 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionEventPayloadMap } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

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

Execution Framework Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type ExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType> = Omit<FrameworkEvent<ExecutionEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ExecutionFrameworkEventType`

Execution Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type ExecutionFrameworkEventType = SandboxFrameworkEventType | CommandExecutionFrameworkEventType | NetworkAuthorizationFrameworkEventType;
```

## `NetworkAuthorizationFrameworkEventType`

Network Authorization Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { NetworkAuthorizationFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type NetworkAuthorizationFrameworkEventType = 'network.authorization.requested' | 'network.authorization.granted' | 'network.authorization.denied' | 'network.authorization.revoked';
```

## `SandboxFrameworkEventType`

Sandbox Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SandboxFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-events.ts)

### 声明

```text
export type SandboxFrameworkEventType = 'sandbox.create.requested' | 'sandbox.created' | 'sandbox.started' | 'sandbox.ready' | 'sandbox.degraded' | 'sandbox.terminate.requested' | 'sandbox.terminated' | 'sandbox.cleanup.completed' | 'sandbox.cleanup.failed';
```
