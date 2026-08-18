# `@codesoul-co/hypha-core` / `contracts/sandbox`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/sandbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)
- 导出数: **20**

## 模块用法

用于声明并运行时校验契约。Sandbox 模块公开 19 接口、1 类型。

### 从包入口导入

```ts
import type {
  ExecutionEnvironmentSpec,
  ExecutionImageSpec,
  ExecutionLoggingPolicySpec,
  NetworkPolicySpec,
  ProcessPolicySpec,
  ResourceLimitSpec,
  SandboxCleanupRequest,
  SandboxCreateRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 20 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionEnvironmentSpec` | 接口 | <code>interface ExecutionEnvironmentSpec extends VersionedSpec, SpecMetadata</code> | Execution Environment Spec 接口，共包含 23 个公开字段或方法。 |
| `ExecutionImageSpec` | 接口 | <code>interface ExecutionImageSpec</code> | Execution Image Spec 接口，共包含 8 个公开字段或方法。 |
| `ExecutionLoggingPolicySpec` | 接口 | <code>interface ExecutionLoggingPolicySpec</code> | Execution Logging Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `NetworkPolicySpec` | 接口 | <code>interface NetworkPolicySpec</code> | Network Policy Spec 接口，共包含 16 个公开字段或方法。 |
| `ProcessPolicySpec` | 接口 | <code>interface ProcessPolicySpec</code> | Process Policy Spec 接口，共包含 17 个公开字段或方法。 |
| `ResourceLimitSpec` | 接口 | <code>interface ResourceLimitSpec</code> | Resource Limit Spec 接口，共包含 19 个公开字段或方法。 |
| `SandboxCleanupRequest` | 接口 | <code>interface SandboxCleanupRequest</code> | Sandbox Cleanup Request 接口，共包含 6 个公开字段或方法。 |
| `SandboxCreateRequest` | 接口 | <code>interface SandboxCreateRequest</code> | Sandbox Create Request 接口，共包含 12 个公开字段或方法。 |
| `SandboxFilesystemPolicySpec` | 接口 | <code>interface SandboxFilesystemPolicySpec</code> | Sandbox Filesystem Policy Spec 接口，共包含 10 个公开字段或方法。 |
| `SandboxLifecyclePolicySpec` | 接口 | <code>interface SandboxLifecyclePolicySpec</code> | Sandbox Lifecycle Policy Spec 接口，共包含 12 个公开字段或方法。 |
| `SandboxMountSpec` | 接口 | <code>interface SandboxMountSpec</code> | Sandbox Mount Spec 接口，共包含 8 个公开字段或方法。 |
| `SandboxProviderCapabilities` | 接口 | <code>interface SandboxProviderCapabilities</code> | Sandbox Provider Capabilities 接口，共包含 12 个公开字段或方法。 |
| `SandboxRecord` | 接口 | <code>interface SandboxRecord</code> | Sandbox Record 接口，共包含 26 个公开字段或方法。 |
| `SandboxSecurityPolicySpec` | 接口 | <code>interface SandboxSecurityPolicySpec</code> | Sandbox Security Policy Spec 接口，共包含 20 个公开字段或方法。 |
| `SandboxStartRequest` | 接口 | <code>interface SandboxStartRequest</code> | Sandbox Start Request 接口，共包含 5 个公开字段或方法。 |
| `SandboxStatusRequest` | 接口 | <code>interface SandboxStatusRequest</code> | Sandbox Status Request 接口，共包含 2 个公开字段或方法。 |
| `SandboxTerminateRequest` | 接口 | <code>interface SandboxTerminateRequest</code> | Sandbox Terminate Request 接口，共包含 6 个公开字段或方法。 |
| `SandboxTmpfsSpec` | 接口 | <code>interface SandboxTmpfsSpec</code> | Sandbox Tmpfs Spec 接口，共包含 6 个公开字段或方法。 |
| `SecretInjectionPolicySpec` | 接口 | <code>interface SecretInjectionPolicySpec</code> | Secret Injection Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `SandboxStatus` | 类型 | <code>type SandboxStatus = 'creating' &#124; 'created' &#124; 'starting' &#124; 'ready' &#124; 'busy' &#124; 'stopping' &#124; 'stopped' &#124; 'terminating' &#124; 'terminated' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Sandbox Status 公共类型别名；完整类型表达式见声明。 |

## `ExecutionEnvironmentSpec`

Execution Environment Spec 接口，共包含 23 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionEnvironmentSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface ExecutionEnvironmentSpec extends VersionedSpec, SpecMetadata {
    revision?: string;
    provider: 'mock' | 'local_process' | 'docker' | 'remote_sandbox' | 'custom';
    providerRef?: string;
    image?: ExecutionImageSpec;
    process: ProcessPolicySpec;
    resources: ResourceLimitSpec;
    filesystem: SandboxFilesystemPolicySpec;
    network: NetworkPolicySpec;
    security: SandboxSecurityPolicySpec;
    secrets: SecretInjectionPolicySpec;
    logging: ExecutionLoggingPolicySpec;
    lifecycle: SandboxLifecyclePolicySpec;
    workingDirectoryPolicy: 'workspace_only' | 'configured_paths';
    defaultTimeoutMs: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTimeoutMs` | 属性 | <code>defaultTimeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filesystem` | 属性 | <code>filesystem: SandboxFilesystemPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `image` | 属性 | <code>image?: ExecutionImageSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lifecycle` | 属性 | <code>lifecycle: SandboxLifecyclePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logging` | 属性 | <code>logging: ExecutionLoggingPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `network` | 属性 | <code>network: NetworkPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `process` | 属性 | <code>process: ProcessPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRef` | 属性 | <code>providerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>resources: ResourceLimitSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secrets` | 属性 | <code>secrets: SecretInjectionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `security` | 属性 | <code>security: SandboxSecurityPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingDirectoryPolicy` | 属性 | <code>workingDirectoryPolicy: "workspace_only" &#124; "configured_paths"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionImageSpec`

Execution Image Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionImageSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface ExecutionImageSpec {
    reference: string;
    digest?: string;
    platform?: string;
    pullPolicy?: 'never' | 'if_not_present' | 'always';
    trustedRegistryRefs?: string[];
    requireDigestPin?: boolean;
    sbomRef?: string;
    signaturePolicyRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `digest` | 属性 | <code>digest?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `platform` | 属性 | <code>platform?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pullPolicy` | 属性 | <code>pullPolicy?: "never" &#124; "if_not_present" &#124; "always"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reference` | 属性 | <code>reference: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireDigestPin` | 属性 | <code>requireDigestPin?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sbomRef` | 属性 | <code>sbomRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signaturePolicyRef` | 属性 | <code>signaturePolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustedRegistryRefs` | 属性 | <code>trustedRegistryRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionLoggingPolicySpec`

Execution Logging Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionLoggingPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface ExecutionLoggingPolicySpec {
    captureStdout: boolean;
    captureStderr: boolean;
    streamOutput?: boolean;
    includeTimestamps?: boolean;
    maxLineBytes?: number;
    redactPatterns?: string[];
    persistOutputAsArtifact?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captureStderr` | 属性 | <code>captureStderr: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `captureStdout` | 属性 | <code>captureStdout: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeTimestamps` | 属性 | <code>includeTimestamps?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxLineBytes` | 属性 | <code>maxLineBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persistOutputAsArtifact` | 属性 | <code>persistOutputAsArtifact?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactPatterns` | 属性 | <code>redactPatterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streamOutput` | 属性 | <code>streamOutput?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NetworkPolicySpec`

Network Policy Spec 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NetworkPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface NetworkPolicySpec {
    mode: 'disabled' | 'restricted' | 'enabled' | 'task_authorized';
    allowedDomains?: string[];
    deniedDomains?: string[];
    allowedCidrs?: string[];
    deniedCidrs?: string[];
    allowedPorts?: number[];
    allowedProtocols?: Array<'tcp' | 'udp' | 'http' | 'https' | 'dns'>;
    dnsPolicy?: 'disabled' | 'system' | 'managed';
    proxyRef?: string;
    blockPrivateNetworks?: boolean;
    blockMetadataEndpoints?: boolean;
    resolveAndPinDns?: boolean;
    taskAuthorizationTtlSeconds?: number;
    maxConnections?: number;
    maxBytesSent?: number;
    maxBytesReceived?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCidrs` | 属性 | <code>allowedCidrs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedDomains` | 属性 | <code>allowedDomains?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPorts` | 属性 | <code>allowedPorts?: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedProtocols` | 属性 | <code>allowedProtocols?: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `blockMetadataEndpoints` | 属性 | <code>blockMetadataEndpoints?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `blockPrivateNetworks` | 属性 | <code>blockPrivateNetworks?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedCidrs` | 属性 | <code>deniedCidrs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedDomains` | 属性 | <code>deniedDomains?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dnsPolicy` | 属性 | <code>dnsPolicy?: "system" &#124; "managed" &#124; "disabled"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytesReceived` | 属性 | <code>maxBytesReceived?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytesSent` | 属性 | <code>maxBytesSent?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConnections` | 属性 | <code>maxConnections?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `proxyRef` | 属性 | <code>proxyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveAndPinDns` | 属性 | <code>resolveAndPinDns?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskAuthorizationTtlSeconds` | 属性 | <code>taskAuthorizationTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProcessPolicySpec`

Process Policy Spec 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProcessPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface ProcessPolicySpec {
    shellEnabled: boolean;
    allowedShells?: string[];
    allowedExecutables?: string[];
    deniedExecutables?: string[];
    executableResolution: 'absolute_allowlist' | 'path_allowlist' | 'container_path';
    maxProcesses?: number;
    maxThreads?: number;
    maxOpenFiles?: number;
    allowBackgroundProcesses?: boolean;
    allowDaemonization?: boolean;
    killProcessTreeOnExit: boolean;
    environmentAllowList?: string[];
    environmentDenyList?: string[];
    inheritHostEnvironment?: boolean;
    defaultUmask?: string;
    locale?: string;
    timezone?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBackgroundProcesses` | 属性 | <code>allowBackgroundProcesses?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowDaemonization` | 属性 | <code>allowDaemonization?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedExecutables` | 属性 | <code>allowedExecutables?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedShells` | 属性 | <code>allowedShells?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultUmask` | 属性 | <code>defaultUmask?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedExecutables` | 属性 | <code>deniedExecutables?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentAllowList` | 属性 | <code>environmentAllowList?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentDenyList` | 属性 | <code>environmentDenyList?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executableResolution` | 属性 | <code>executableResolution: "absolute_allowlist" &#124; "path_allowlist" &#124; "container_path"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inheritHostEnvironment` | 属性 | <code>inheritHostEnvironment?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `killProcessTreeOnExit` | 属性 | <code>killProcessTreeOnExit: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `locale` | 属性 | <code>locale?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxProcesses` | 属性 | <code>maxProcesses?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxThreads` | 属性 | <code>maxThreads?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shellEnabled` | 属性 | <code>shellEnabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timezone` | 属性 | <code>timezone?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResourceLimitSpec`

Resource Limit Spec 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResourceLimitSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface ResourceLimitSpec {
    cpuCores?: number;
    cpuQuotaMicros?: number;
    cpuPeriodMicros?: number;
    cpuShares?: number;
    maxCpuSeconds?: number;
    memoryMb?: number;
    memorySwapMb?: number;
    oomKillDisable?: boolean;
    diskBytes?: number;
    tempBytes?: number;
    maxWriteBytes?: number;
    blockIoWeight?: number;
    pidsLimit?: number;
    maxOpenFiles?: number;
    maxStdoutBytes?: number;
    maxStderrBytes?: number;
    maxCombinedOutputBytes?: number;
    maxExecutionSeconds?: number;
    maxIdleSeconds?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blockIoWeight` | 属性 | <code>blockIoWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuCores` | 属性 | <code>cpuCores?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuPeriodMicros` | 属性 | <code>cpuPeriodMicros?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuQuotaMicros` | 属性 | <code>cpuQuotaMicros?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuShares` | 属性 | <code>cpuShares?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `diskBytes` | 属性 | <code>diskBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCpuSeconds` | 属性 | <code>maxCpuSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxExecutionSeconds` | 属性 | <code>maxExecutionSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIdleSeconds` | 属性 | <code>maxIdleSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxWriteBytes` | 属性 | <code>maxWriteBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryMb` | 属性 | <code>memoryMb?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memorySwapMb` | 属性 | <code>memorySwapMb?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `oomKillDisable` | 属性 | <code>oomKillDisable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pidsLimit` | 属性 | <code>pidsLimit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tempBytes` | 属性 | <code>tempBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCleanupRequest`

Sandbox Cleanup Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCleanupRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxCleanupRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    expectedRevision: number;
    reason?: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxCreateRequest`

Sandbox Create Request 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxCreateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxCreateRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    environment: ExecutionEnvironmentSpec;
    environmentRevision: string;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId: string;
    agentId?: string;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxFilesystemPolicySpec`

Sandbox Filesystem Policy Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxFilesystemPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxFilesystemPolicySpec {
    rootFilesystem: 'read_only' | 'writable';
    mounts: SandboxMountSpec[];
    tmpfs?: SandboxTmpfsSpec[];
    maskPaths?: string[];
    readonlyPaths?: string[];
    writablePaths?: string[];
    allowDeviceAccess?: boolean;
    allowedDevices?: string[];
    allowHostPathMounts?: boolean;
    maxMounts?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDeviceAccess` | 属性 | <code>allowDeviceAccess?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedDevices` | 属性 | <code>allowedDevices?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowHostPathMounts` | 属性 | <code>allowHostPathMounts?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maskPaths` | 属性 | <code>maskPaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMounts` | 属性 | <code>maxMounts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mounts` | 属性 | <code>mounts: SandboxMountSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readonlyPaths` | 属性 | <code>readonlyPaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootFilesystem` | 属性 | <code>rootFilesystem: "read_only" &#124; "writable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tmpfs` | 属性 | <code>tmpfs?: SandboxTmpfsSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writablePaths` | 属性 | <code>writablePaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxLifecyclePolicySpec`

Sandbox Lifecycle Policy Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxLifecyclePolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxLifecyclePolicySpec {
    reuse: 'never' | 'run' | 'session' | 'pool';
    idleTtlSeconds?: number;
    maxLifetimeSeconds?: number;
    maxExecutions?: number;
    createTimeoutMs?: number;
    startTimeoutMs?: number;
    stopTimeoutMs?: number;
    cleanupTimeoutMs?: number;
    snapshotOnFailure?: boolean;
    cleanupOnSuccess?: boolean;
    cleanupOnFailure?: boolean;
    retainForDebugSeconds?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanupOnFailure` | 属性 | <code>cleanupOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cleanupOnSuccess` | 属性 | <code>cleanupOnSuccess?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cleanupTimeoutMs` | 属性 | <code>cleanupTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createTimeoutMs` | 属性 | <code>createTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idleTtlSeconds` | 属性 | <code>idleTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxExecutions` | 属性 | <code>maxExecutions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxLifetimeSeconds` | 属性 | <code>maxLifetimeSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainForDebugSeconds` | 属性 | <code>retainForDebugSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reuse` | 属性 | <code>reuse: "session" &#124; "run" &#124; "never" &#124; "pool"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startTimeoutMs` | 属性 | <code>startTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stopTimeoutMs` | 属性 | <code>stopTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxMountSpec`

Sandbox Mount Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxMountSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxMountSpec {
    sourceRef: string;
    targetPath: string;
    mode: 'ro' | 'rw';
    type: 'bind' | 'volume' | 'artifact' | 'workspace' | 'tmpfs';
    propagation?: 'private' | 'rprivate';
    noExec?: boolean;
    noSuid?: boolean;
    noDev?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "ro" &#124; "rw"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noDev` | 属性 | <code>noDev?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noExec` | 属性 | <code>noExec?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noSuid` | 属性 | <code>noSuid?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `propagation` | 属性 | <code>propagation?: "private" &#124; "rprivate"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetPath` | 属性 | <code>targetPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "artifact" &#124; "workspace" &#124; "bind" &#124; "volume" &#124; "tmpfs"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxProviderCapabilities`

Sandbox Provider Capabilities 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxProviderCapabilities {
    processIsolation: boolean;
    filesystemIsolation: boolean;
    networkIsolation: boolean;
    cpuLimits: boolean;
    memoryLimits: boolean;
    diskLimits: boolean;
    pidsLimit: boolean;
    cancellation: boolean;
    processTreeKill: boolean;
    snapshots: boolean;
    imageDigestPinning: boolean;
    remoteExecution: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuLimits` | 属性 | <code>cpuLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `diskLimits` | 属性 | <code>diskLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filesystemIsolation` | 属性 | <code>filesystemIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigestPinning` | 属性 | <code>imageDigestPinning: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryLimits` | 属性 | <code>memoryLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkIsolation` | 属性 | <code>networkIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pidsLimit` | 属性 | <code>pidsLimit: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processIsolation` | 属性 | <code>processIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processTreeKill` | 属性 | <code>processTreeKill: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remoteExecution` | 属性 | <code>remoteExecution: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshots` | 属性 | <code>snapshots: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxRecord`

Sandbox Record 接口，共包含 26 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxRecord {
    id: string;
    revision: number;
    providerId: string;
    environmentRef: SpecRef;
    environmentRevision: string;
    tenantId?: string;
    userId: string;
    workspaceId: string;
    sessionId?: string;
    runId: string;
    agentId?: string;
    status: SandboxStatus;
    providerSandboxRef?: string;
    imageDigest?: string;
    activeExecutionIds: string[];
    resourceLimits: ResourceLimitSpec;
    networkPolicyHash: string;
    mountPolicyHash: string;
    createdAt: string;
    readyAt?: string;
    lastUsedAt?: string;
    expiresAt?: string;
    terminatedAt?: string;
    cleanedAt?: string;
    error?: NormalizedExecutionError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeExecutionIds` | 属性 | <code>activeExecutionIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cleanedAt` | 属性 | <code>cleanedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigest` | 属性 | <code>imageDigest?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastUsedAt` | 属性 | <code>lastUsedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mountPolicyHash` | 属性 | <code>mountPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerSandboxRef` | 属性 | <code>providerSandboxRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readyAt` | 属性 | <code>readyAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceLimits` | 属性 | <code>resourceLimits: ResourceLimitSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: SandboxStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminatedAt` | 属性 | <code>terminatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxSecurityPolicySpec`

Sandbox Security Policy Spec 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxSecurityPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxSecurityPolicySpec {
    runAsUser?: string;
    runAsGroup?: string;
    nonRootRequired: boolean;
    noNewPrivileges: boolean;
    privileged: boolean;
    dropCapabilities?: string[];
    addCapabilities?: string[];
    seccompProfileRef?: string;
    appArmorProfileRef?: string;
    selinuxLabelRef?: string;
    userNamespace?: boolean;
    pidNamespace?: boolean;
    networkNamespace?: boolean;
    ipcNamespace?: boolean;
    utsNamespace?: boolean;
    readOnlyProc?: boolean;
    maskHostProc?: boolean;
    preventPtrace?: boolean;
    allowNestedContainers?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `addCapabilities` | 属性 | <code>addCapabilities?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowNestedContainers` | 属性 | <code>allowNestedContainers?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `appArmorProfileRef` | 属性 | <code>appArmorProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dropCapabilities` | 属性 | <code>dropCapabilities?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ipcNamespace` | 属性 | <code>ipcNamespace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maskHostProc` | 属性 | <code>maskHostProc?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkNamespace` | 属性 | <code>networkNamespace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noNewPrivileges` | 属性 | <code>noNewPrivileges: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nonRootRequired` | 属性 | <code>nonRootRequired: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pidNamespace` | 属性 | <code>pidNamespace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preventPtrace` | 属性 | <code>preventPtrace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `privileged` | 属性 | <code>privileged: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readOnlyProc` | 属性 | <code>readOnlyProc?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runAsGroup` | 属性 | <code>runAsGroup?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runAsUser` | 属性 | <code>runAsUser?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `seccompProfileRef` | 属性 | <code>seccompProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selinuxLabelRef` | 属性 | <code>selinuxLabelRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userNamespace` | 属性 | <code>userNamespace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `utsNamespace` | 属性 | <code>utsNamespace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxStartRequest`

Sandbox Start Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxStartRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxStartRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    expectedRevision: number;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxStatusRequest`

Sandbox Status Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxStatusRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxStatusRequest {
    sandboxId: string;
    principal: ExecutionPrincipal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxTerminateRequest`

Sandbox Terminate Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxTerminateRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxTerminateRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    expectedRevision: number;
    reason?: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxTmpfsSpec`

Sandbox Tmpfs Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxTmpfsSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SandboxTmpfsSpec {
    targetPath: string;
    sizeBytes?: number;
    mode?: number;
    noExec?: boolean;
    noSuid?: boolean;
    noDev?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noDev` | 属性 | <code>noDev?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noExec` | 属性 | <code>noExec?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noSuid` | 属性 | <code>noSuid?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetPath` | 属性 | <code>targetPath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SecretInjectionPolicySpec`

Secret Injection Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SecretInjectionPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export interface SecretInjectionPolicySpec {
    allowedSecretRefs?: string[];
    injectionMode: 'none' | 'environment' | 'file' | 'brokered';
    exposeNamesOnly?: boolean;
    redactFromOutput: boolean;
    redactFromEvents: boolean;
    ttlSeconds?: number;
    revokeOnExecutionEnd?: boolean;
    allowChildProcessInheritance?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowChildProcessInheritance` | 属性 | <code>allowChildProcessInheritance?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSecretRefs` | 属性 | <code>allowedSecretRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exposeNamesOnly` | 属性 | <code>exposeNamesOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `injectionMode` | 属性 | <code>injectionMode: "none" &#124; "environment" &#124; "file" &#124; "brokered"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactFromEvents` | 属性 | <code>redactFromEvents: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactFromOutput` | 属性 | <code>redactFromOutput: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revokeOnExecutionEnd` | 属性 | <code>revokeOnExecutionEnd?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SandboxStatus`

Sandbox Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SandboxStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### 声明

```text
export type SandboxStatus = 'creating' | 'created' | 'starting' | 'ready' | 'busy' | 'stopping' | 'stopped' | 'terminating' | 'terminated' | 'cleaning' | 'cleaned' | 'failed';
```
