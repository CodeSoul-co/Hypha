# `@codesoul-co/hypha-core` / `contracts/sandbox`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/sandbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)
- Exports: **20**

## Using this module

Use the Sandbox module for declaring and runtime-validating contracts. It exports 19 interfaces, 1 type.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 20 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionEnvironmentSpec` | interface | <code>interface ExecutionEnvironmentSpec extends VersionedSpec, SpecMetadata</code> | Execution Environment Spec interface with 23 public fields or methods. |
| `ExecutionImageSpec` | interface | <code>interface ExecutionImageSpec</code> | Execution Image Spec interface with 8 public fields or methods. |
| `ExecutionLoggingPolicySpec` | interface | <code>interface ExecutionLoggingPolicySpec</code> | Execution Logging Policy Spec interface with 7 public fields or methods. |
| `NetworkPolicySpec` | interface | <code>interface NetworkPolicySpec</code> | Network Policy Spec interface with 16 public fields or methods. |
| `ProcessPolicySpec` | interface | <code>interface ProcessPolicySpec</code> | Process Policy Spec interface with 17 public fields or methods. |
| `ResourceLimitSpec` | interface | <code>interface ResourceLimitSpec</code> | Resource Limit Spec interface with 19 public fields or methods. |
| `SandboxCleanupRequest` | interface | <code>interface SandboxCleanupRequest</code> | Sandbox Cleanup Request interface with 6 public fields or methods. |
| `SandboxCreateRequest` | interface | <code>interface SandboxCreateRequest</code> | Sandbox Create Request interface with 12 public fields or methods. |
| `SandboxFilesystemPolicySpec` | interface | <code>interface SandboxFilesystemPolicySpec</code> | Sandbox Filesystem Policy Spec interface with 10 public fields or methods. |
| `SandboxLifecyclePolicySpec` | interface | <code>interface SandboxLifecyclePolicySpec</code> | Sandbox Lifecycle Policy Spec interface with 12 public fields or methods. |
| `SandboxMountSpec` | interface | <code>interface SandboxMountSpec</code> | Sandbox Mount Spec interface with 8 public fields or methods. |
| `SandboxProviderCapabilities` | interface | <code>interface SandboxProviderCapabilities</code> | Sandbox Provider Capabilities interface with 12 public fields or methods. |
| `SandboxRecord` | interface | <code>interface SandboxRecord</code> | Sandbox Record interface with 26 public fields or methods. |
| `SandboxSecurityPolicySpec` | interface | <code>interface SandboxSecurityPolicySpec</code> | Sandbox Security Policy Spec interface with 20 public fields or methods. |
| `SandboxStartRequest` | interface | <code>interface SandboxStartRequest</code> | Sandbox Start Request interface with 5 public fields or methods. |
| `SandboxStatusRequest` | interface | <code>interface SandboxStatusRequest</code> | Sandbox Status Request interface with 2 public fields or methods. |
| `SandboxTerminateRequest` | interface | <code>interface SandboxTerminateRequest</code> | Sandbox Terminate Request interface with 6 public fields or methods. |
| `SandboxTmpfsSpec` | interface | <code>interface SandboxTmpfsSpec</code> | Sandbox Tmpfs Spec interface with 6 public fields or methods. |
| `SecretInjectionPolicySpec` | interface | <code>interface SecretInjectionPolicySpec</code> | Secret Injection Policy Spec interface with 8 public fields or methods. |
| `SandboxStatus` | type | <code>type SandboxStatus = 'creating' &#124; 'created' &#124; 'starting' &#124; 'ready' &#124; 'busy' &#124; 'stopping' &#124; 'stopped' &#124; 'terminating' &#124; 'terminated' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Public type alias for Sandbox Status; the declaration contains its complete type expression. |

## `ExecutionEnvironmentSpec`

Execution Environment Spec interface with 23 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionEnvironmentSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTimeoutMs` | property | <code>defaultTimeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filesystem` | property | <code>filesystem: SandboxFilesystemPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `image` | property | <code>image?: ExecutionImageSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lifecycle` | property | <code>lifecycle: SandboxLifecyclePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logging` | property | <code>logging: ExecutionLoggingPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `network` | property | <code>network: NetworkPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `process` | property | <code>process: ProcessPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>resources: ResourceLimitSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secrets` | property | <code>secrets: SecretInjectionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `security` | property | <code>security: SandboxSecurityPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingDirectoryPolicy` | property | <code>workingDirectoryPolicy: "workspace_only" &#124; "configured_paths"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionImageSpec`

Execution Image Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionImageSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `digest` | property | <code>digest?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `platform` | property | <code>platform?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pullPolicy` | property | <code>pullPolicy?: "never" &#124; "if_not_present" &#124; "always"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reference` | property | <code>reference: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireDigestPin` | property | <code>requireDigestPin?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sbomRef` | property | <code>sbomRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signaturePolicyRef` | property | <code>signaturePolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustedRegistryRefs` | property | <code>trustedRegistryRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionLoggingPolicySpec`

Execution Logging Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionLoggingPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captureStderr` | property | <code>captureStderr: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `captureStdout` | property | <code>captureStdout: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeTimestamps` | property | <code>includeTimestamps?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxLineBytes` | property | <code>maxLineBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persistOutputAsArtifact` | property | <code>persistOutputAsArtifact?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactPatterns` | property | <code>redactPatterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streamOutput` | property | <code>streamOutput?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NetworkPolicySpec`

Network Policy Spec interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { NetworkPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCidrs` | property | <code>allowedCidrs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedDomains` | property | <code>allowedDomains?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPorts` | property | <code>allowedPorts?: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedProtocols` | property | <code>allowedProtocols?: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `blockMetadataEndpoints` | property | <code>blockMetadataEndpoints?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `blockPrivateNetworks` | property | <code>blockPrivateNetworks?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedCidrs` | property | <code>deniedCidrs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedDomains` | property | <code>deniedDomains?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dnsPolicy` | property | <code>dnsPolicy?: "system" &#124; "managed" &#124; "disabled"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytesReceived` | property | <code>maxBytesReceived?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytesSent` | property | <code>maxBytesSent?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConnections` | property | <code>maxConnections?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `proxyRef` | property | <code>proxyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveAndPinDns` | property | <code>resolveAndPinDns?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskAuthorizationTtlSeconds` | property | <code>taskAuthorizationTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProcessPolicySpec`

Process Policy Spec interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { ProcessPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBackgroundProcesses` | property | <code>allowBackgroundProcesses?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowDaemonization` | property | <code>allowDaemonization?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedExecutables` | property | <code>allowedExecutables?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedShells` | property | <code>allowedShells?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultUmask` | property | <code>defaultUmask?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedExecutables` | property | <code>deniedExecutables?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentAllowList` | property | <code>environmentAllowList?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentDenyList` | property | <code>environmentDenyList?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executableResolution` | property | <code>executableResolution: "absolute_allowlist" &#124; "path_allowlist" &#124; "container_path"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inheritHostEnvironment` | property | <code>inheritHostEnvironment?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `killProcessTreeOnExit` | property | <code>killProcessTreeOnExit: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `locale` | property | <code>locale?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOpenFiles` | property | <code>maxOpenFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxProcesses` | property | <code>maxProcesses?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxThreads` | property | <code>maxThreads?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shellEnabled` | property | <code>shellEnabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timezone` | property | <code>timezone?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceLimitSpec`

Resource Limit Spec interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ResourceLimitSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blockIoWeight` | property | <code>blockIoWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuCores` | property | <code>cpuCores?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuPeriodMicros` | property | <code>cpuPeriodMicros?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuQuotaMicros` | property | <code>cpuQuotaMicros?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuShares` | property | <code>cpuShares?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `diskBytes` | property | <code>diskBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCpuSeconds` | property | <code>maxCpuSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxExecutionSeconds` | property | <code>maxExecutionSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIdleSeconds` | property | <code>maxIdleSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOpenFiles` | property | <code>maxOpenFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStderrBytes` | property | <code>maxStderrBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxWriteBytes` | property | <code>maxWriteBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryMb` | property | <code>memoryMb?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memorySwapMb` | property | <code>memorySwapMb?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `oomKillDisable` | property | <code>oomKillDisable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pidsLimit` | property | <code>pidsLimit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tempBytes` | property | <code>tempBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCleanupRequest`

Sandbox Cleanup Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCleanupRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCreateRequest`

Sandbox Create Request interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxFilesystemPolicySpec`

Sandbox Filesystem Policy Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { SandboxFilesystemPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDeviceAccess` | property | <code>allowDeviceAccess?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedDevices` | property | <code>allowedDevices?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowHostPathMounts` | property | <code>allowHostPathMounts?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maskPaths` | property | <code>maskPaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMounts` | property | <code>maxMounts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mounts` | property | <code>mounts: SandboxMountSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readonlyPaths` | property | <code>readonlyPaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootFilesystem` | property | <code>rootFilesystem: "read_only" &#124; "writable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tmpfs` | property | <code>tmpfs?: SandboxTmpfsSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writablePaths` | property | <code>writablePaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxLifecyclePolicySpec`

Sandbox Lifecycle Policy Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { SandboxLifecyclePolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanupOnFailure` | property | <code>cleanupOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cleanupOnSuccess` | property | <code>cleanupOnSuccess?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cleanupTimeoutMs` | property | <code>cleanupTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createTimeoutMs` | property | <code>createTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idleTtlSeconds` | property | <code>idleTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxExecutions` | property | <code>maxExecutions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxLifetimeSeconds` | property | <code>maxLifetimeSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainForDebugSeconds` | property | <code>retainForDebugSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reuse` | property | <code>reuse: "session" &#124; "run" &#124; "never" &#124; "pool"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startTimeoutMs` | property | <code>startTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stopTimeoutMs` | property | <code>stopTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxMountSpec`

Sandbox Mount Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { SandboxMountSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "ro" &#124; "rw"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noDev` | property | <code>noDev?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noExec` | property | <code>noExec?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noSuid` | property | <code>noSuid?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `propagation` | property | <code>propagation?: "private" &#124; "rprivate"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetPath` | property | <code>targetPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "artifact" &#124; "workspace" &#124; "bind" &#124; "volume" &#124; "tmpfs"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxProviderCapabilities`

Sandbox Provider Capabilities interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { SandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuLimits` | property | <code>cpuLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `diskLimits` | property | <code>diskLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filesystemIsolation` | property | <code>filesystemIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigestPinning` | property | <code>imageDigestPinning: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryLimits` | property | <code>memoryLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkIsolation` | property | <code>networkIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pidsLimit` | property | <code>pidsLimit: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processIsolation` | property | <code>processIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processTreeKill` | property | <code>processTreeKill: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remoteExecution` | property | <code>remoteExecution: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshots` | property | <code>snapshots: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxRecord`

Sandbox Record interface with 26 public fields or methods.

- Kind: interface
- Import: `import type { SandboxRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeExecutionIds` | property | <code>activeExecutionIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cleanedAt` | property | <code>cleanedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigest` | property | <code>imageDigest?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastUsedAt` | property | <code>lastUsedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mountPolicyHash` | property | <code>mountPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerSandboxRef` | property | <code>providerSandboxRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readyAt` | property | <code>readyAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceLimits` | property | <code>resourceLimits: ResourceLimitSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: SandboxStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminatedAt` | property | <code>terminatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxSecurityPolicySpec`

Sandbox Security Policy Spec interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { SandboxSecurityPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `addCapabilities` | property | <code>addCapabilities?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowNestedContainers` | property | <code>allowNestedContainers?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `appArmorProfileRef` | property | <code>appArmorProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dropCapabilities` | property | <code>dropCapabilities?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ipcNamespace` | property | <code>ipcNamespace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maskHostProc` | property | <code>maskHostProc?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkNamespace` | property | <code>networkNamespace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noNewPrivileges` | property | <code>noNewPrivileges: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nonRootRequired` | property | <code>nonRootRequired: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pidNamespace` | property | <code>pidNamespace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preventPtrace` | property | <code>preventPtrace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `privileged` | property | <code>privileged: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readOnlyProc` | property | <code>readOnlyProc?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runAsGroup` | property | <code>runAsGroup?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runAsUser` | property | <code>runAsUser?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `seccompProfileRef` | property | <code>seccompProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selinuxLabelRef` | property | <code>selinuxLabelRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userNamespace` | property | <code>userNamespace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `utsNamespace` | property | <code>utsNamespace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxStartRequest`

Sandbox Start Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SandboxStartRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

```text
export interface SandboxStartRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    expectedRevision: number;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxStatusRequest`

Sandbox Status Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SandboxStatusRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

```text
export interface SandboxStatusRequest {
    sandboxId: string;
    principal: ExecutionPrincipal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxTerminateRequest`

Sandbox Terminate Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SandboxTerminateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxTmpfsSpec`

Sandbox Tmpfs Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SandboxTmpfsSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noDev` | property | <code>noDev?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noExec` | property | <code>noExec?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `noSuid` | property | <code>noSuid?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetPath` | property | <code>targetPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SecretInjectionPolicySpec`

Secret Injection Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { SecretInjectionPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowChildProcessInheritance` | property | <code>allowChildProcessInheritance?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSecretRefs` | property | <code>allowedSecretRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exposeNamesOnly` | property | <code>exposeNamesOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `injectionMode` | property | <code>injectionMode: "none" &#124; "environment" &#124; "file" &#124; "brokered"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactFromEvents` | property | <code>redactFromEvents: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactFromOutput` | property | <code>redactFromOutput: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revokeOnExecutionEnd` | property | <code>revokeOnExecutionEnd?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlSeconds` | property | <code>ttlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxStatus`

Public type alias for Sandbox Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SandboxStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)

### Declaration

```text
export type SandboxStatus = 'creating' | 'created' | 'starting' | 'ready' | 'busy' | 'stopping' | 'stopped' | 'terminating' | 'terminated' | 'cleaning' | 'cleaned' | 'failed';
```
