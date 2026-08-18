# `@codesoul-co/hypha-core` / `contracts/sandbox-provider`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Sandbox provider 模块公开 6 接口、3 类型。

### 从包入口导入

```ts
import type {
  SandboxCapabilityDerivationInput,
  SandboxCapabilityNegotiationRequest,
  SandboxCapabilityNegotiationResult,
  SandboxCapabilityRequirement,
  SandboxProvider,
  SandboxProviderFactory,
  SandboxCapabilityName,
  SandboxProviderSelection,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SandboxCapabilityDerivationInput` | 接口 | <code>interface SandboxCapabilityDerivationInput</code> | Sandbox Capability Derivation Input 接口，共包含 3 个公开字段或方法。 |
| `SandboxCapabilityNegotiationRequest` | 接口 | <code>interface SandboxCapabilityNegotiationRequest</code> | Sandbox Capability Negotiation Request 接口，共包含 4 个公开字段或方法。 |
| `SandboxCapabilityNegotiationResult` | 接口 | <code>interface SandboxCapabilityNegotiationResult</code> | Sandbox Capability Negotiation Result 接口，共包含 6 个公开字段或方法。 |
| `SandboxCapabilityRequirement` | 接口 | <code>interface SandboxCapabilityRequirement</code> | Sandbox Capability Requirement 接口，共包含 3 个公开字段或方法。 |
| `SandboxProvider` | 接口 | <code>interface SandboxProvider</code> | Sandbox Provider 接口，共包含 11 个公开字段或方法。 |
| `SandboxProviderFactory` | 接口 | <code>interface SandboxProviderFactory</code> | Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id. |
| `SandboxCapabilityName` | 类型 | <code>type SandboxCapabilityName = keyof SandboxProviderCapabilities</code> | Sandbox Capability Name 公共类型别名；完整类型表达式见声明。 |
| `SandboxProviderSelection` | 类型 | <code>type SandboxProviderSelection = Pick&lt;ExecutionEnvironmentSpec, 'provider' &#124; 'providerRef'&gt;</code> | Sandbox Provider Selection 公共类型别名；完整类型表达式见声明。 |
| `SandboxProviderType` | 类型 | <code>type SandboxProviderType = ExecutionEnvironmentSpec['provider']</code> | Sandbox Provider Type 公共类型别名；完整类型表达式见声明。 |

## `SandboxCapabilityDerivationInput`

Sandbox Capability Derivation Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCapabilityDerivationInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxCapabilityDerivationInput {
    environment: ExecutionEnvironmentSpec;
    command?: Pick<CommandExecutionRequest, 'snapshotBefore' | 'snapshotAfter' | 'snapshotOnFailure'>;
    additionalRequirements?: SandboxCapabilityRequirement[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `additionalRequirements` | 属性 | <code>additionalRequirements?: SandboxCapabilityRequirement[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command?: Pick&lt;CommandExecutionRequest, "snapshotBefore" &#124; "snapshotAfter" &#124; "snapshotOnFailure"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCapabilityNegotiationRequest`

Sandbox Capability Negotiation Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCapabilityNegotiationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxCapabilityNegotiationRequest {
    providerId: string;
    capabilities: SandboxProviderCapabilities;
    requirements: SandboxCapabilityRequirement[];
    evaluatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: SandboxProviderCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requirements` | 属性 | <code>requirements: SandboxCapabilityRequirement[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCapabilityNegotiationResult`

Sandbox Capability Negotiation Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCapabilityNegotiationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxCapabilityNegotiationResult {
    providerId: string;
    compatible: boolean;
    capabilities: SandboxProviderCapabilities;
    requirements: SandboxCapabilityRequirement[];
    missingCapabilities: SandboxCapabilityName[];
    evaluatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: SandboxProviderCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compatible` | 属性 | <code>compatible: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingCapabilities` | 属性 | <code>missingCapabilities: (keyof SandboxProviderCapabilities)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requirements` | 属性 | <code>requirements: SandboxCapabilityRequirement[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCapabilityRequirement`

Sandbox Capability Requirement 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCapabilityRequirement } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxCapabilityRequirement {
    capability: SandboxCapabilityName;
    source: 'environment' | 'command' | 'policy' | 'runtime';
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capability` | 属性 | <code>capability: keyof SandboxProviderCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "policy" &#124; "environment" &#124; "command" &#124; "runtime"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxProvider`

Sandbox Provider 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxProvider } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxProvider {
    readonly id: string;
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(request: SandboxCreateRequest): Promise<SandboxRecord>;
    start(request: SandboxStartRequest): Promise<SandboxRecord>;
    execute(request: CommandExecutionRequest): Promise<CommandExecutionResult>;
    cancel(request: ExecutionCancelRequest): Promise<void>;
    terminate(request: SandboxTerminateRequest): Promise<void>;
    status(request: SandboxStatusRequest): Promise<SandboxRecord | null>;
    cleanup(request: SandboxCleanupRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cleanup` | 方法 | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `create` | 方法 | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `start` | 方法 | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `terminate` | 方法 | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SandboxProviderFactory`

Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id.

- 种类: 接口
- 导入: `import type { SandboxProviderFactory } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export interface SandboxProviderFactory {
    readonly providerType: SandboxProviderType;
    readonly providerId: string;
    create(): SandboxProvider | Promise<SandboxProvider>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): SandboxProvider &#124; Promise&lt;SandboxProvider&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerType` | 属性 | <code>readonly providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCapabilityName`

Sandbox Capability Name 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SandboxCapabilityName } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export type SandboxCapabilityName = keyof SandboxProviderCapabilities;
```

## `SandboxProviderSelection`

Sandbox Provider Selection 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SandboxProviderSelection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export type SandboxProviderSelection = Pick<ExecutionEnvironmentSpec, 'provider' | 'providerRef'>;
```

## `SandboxProviderType`

Sandbox Provider Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SandboxProviderType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### 声明

```text
export type SandboxProviderType = ExecutionEnvironmentSpec['provider'];
```
