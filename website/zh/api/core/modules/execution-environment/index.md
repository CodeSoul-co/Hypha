# `@codesoul-co/hypha-core` / `modules/execution-environment/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-environment/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)
- 导出数: **18**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 17 常量、1 函数。

### 从包入口导入

```ts
import {
  executionEnvironmentSpecDefinition,
  executionEnvironmentSpecDefinitions,
  executionEnvironmentSpecExample,
  executionEnvironmentSpecJsonSchema,
  executionEnvironmentSpecJsonSchemas,
  executionEnvironmentSpecSchema,
  executionImageSpecSchema,
  executionLoggingPolicySpecSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 17 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionEnvironmentSpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionEnvironmentSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionEnvironmentSpecDefinition` | 常量 | <code>const executionEnvironmentSpecDefinition: SpecSchemaDefinition&lt;ExecutionEnvironmentSpec&gt;</code> | Execution Environment Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `executionEnvironmentSpecDefinitions` | 常量 | <code>const executionEnvironmentSpecDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionEnvironmentSpec&gt;]</code> | 由 `modules/execution-environment/index` 模块导出的 Execution Environment Spec Definitions 常量。 |
| `executionEnvironmentSpecExample` | 常量 | <code>const executionEnvironmentSpecExample: ExecutionEnvironmentSpec</code> | Execution Environment Spec 的有效示例值。 |
| `executionEnvironmentSpecJsonSchema` | 常量 | <code>const executionEnvironmentSpecJsonSchema: JsonSchema</code> | Execution Environment Spec 的 JSON Schema。 |
| `executionEnvironmentSpecJsonSchemas` | 常量 | <code>const executionEnvironmentSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-environment/index` 模块导出的 Execution Environment Spec JSON Schemas 常量。 |
| `executionEnvironmentSpecSchema` | 常量 | <code>const executionEnvironmentSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; provider: z.ZodEnum&lt;[...</code> | Execution Environment Spec 的运行时 Schema。 |
| `executionImageSpecSchema` | 常量 | <code>const executionImageSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ reference: z.ZodString; digest: z.ZodOptional&lt;z.ZodString&gt;; platform: z.ZodOptional&lt;z.ZodString&gt;; pullPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["never", "if_not_present", "always"]&gt;&gt;; trustedRegistryRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireDigestPin: z.ZodOptional&lt;z.ZodBoolean&gt;; sbomRef: z.ZodOptional&lt;z.ZodString&gt;; signaturePolicyRef: z.ZodOptio...</code> | Execution Image Spec 的运行时 Schema。 |
| `executionLoggingPolicySpecSchema` | 常量 | <code>const executionLoggingPolicySpecSchema: z.ZodObject&lt;{ captureStdout: z.ZodBoolean; captureStderr: z.ZodBoolean; streamOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; includeTimestamps: z.ZodOptional&lt;z.ZodBoolean&gt;; maxLineBytes: z.ZodOptional&lt;z.ZodNumber&gt;; redactPatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; persistOutputAsArtifact: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { captureStdout: boolean; c...</code> | Execution Logging Policy Spec 的运行时 Schema。 |
| `networkPolicySpecSchema` | 常量 | <code>const networkPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "restricted", "enabled", "task_authorized"]&gt;; allowedDomains: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedDomains: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedCidrs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedCidrs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPorts: z.ZodOptional&lt;z.ZodA...</code> | Network Policy Spec 的运行时 Schema。 |
| `processPolicySpecSchema` | 常量 | <code>const processPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ shellEnabled: z.ZodBoolean; allowedShells: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedExecutables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedExecutables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; executableResolution: z.ZodEnum&lt;["absolute_allowlist", "path_allowlist", "container_path"]&gt;; maxProcesses: z.ZodOptional&lt;z.ZodNumber&gt;...</code> | Process Policy Spec 的运行时 Schema。 |
| `resourceLimitSpecSchema` | 常量 | <code>const resourceLimitSpecSchema: z.ZodObject&lt;{ cpuCores: z.ZodOptional&lt;z.ZodNumber&gt;; cpuQuotaMicros: z.ZodOptional&lt;z.ZodNumber&gt;; cpuPeriodMicros: z.ZodOptional&lt;z.ZodNumber&gt;; cpuShares: z.ZodOptional&lt;z.ZodNumber&gt;; maxCpuSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; memoryMb: z.ZodOptional&lt;z.ZodNumber&gt;; memorySwapMb: z.ZodOptional&lt;z.ZodNumber&gt;; oomKillDisable: z.ZodDefault&lt;z.ZodOptional&lt;z.ZodBoolean&gt;&gt;; diskBytes: z.ZodOptional...</code> | Resource Limit Spec 的运行时 Schema。 |
| `sandboxFilesystemPolicySpecSchema` | 常量 | <code>const sandboxFilesystemPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ rootFilesystem: z.ZodEnum&lt;["read_only", "writable"]&gt;; mounts: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ sourceRef: z.ZodString; targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; mode: z.ZodEnum&lt;["ro", "rw"]&gt;; type: z.ZodEnum&lt;["bind", "volume", "artifact", "workspace", "tmpfs"]&gt;; propagation: z.ZodOptional&lt;z.ZodEnum&lt;["private", "rprivate"]&gt;&gt;; noEx...</code> | Sandbox Filesystem Policy Spec 的运行时 Schema。 |
| `sandboxLifecyclePolicySpecSchema` | 常量 | <code>const sandboxLifecyclePolicySpecSchema: z.ZodObject&lt;{ reuse: z.ZodEnum&lt;["never", "run", "session", "pool"]&gt;; idleTtlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; maxLifetimeSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; maxExecutions: z.ZodOptional&lt;z.ZodNumber&gt;; createTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; startTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; stopTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; cleanupTimeoutMs: z.ZodOptional&lt;z.ZodNumb...</code> | Sandbox Lifecycle Policy Spec 的运行时 Schema。 |
| `sandboxMountSpecSchema` | 常量 | <code>const sandboxMountSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRef: z.ZodString; targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; mode: z.ZodEnum&lt;["ro", "rw"]&gt;; type: z.ZodEnum&lt;["bind", "volume", "artifact", "workspace", "tmpfs"]&gt;; propagation: z.ZodOptional&lt;z.ZodEnum&lt;["private", "rprivate"]&gt;&gt;; noExec: z.ZodOptional&lt;z.ZodBoolean&gt;; noSuid: z.ZodOptional&lt;z.ZodBoolean&gt;; noDev: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "s...</code> | Sandbox Mount Spec 的运行时 Schema。 |
| `sandboxSecurityPolicySpecSchema` | 常量 | <code>const sandboxSecurityPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runAsUser: z.ZodOptional&lt;z.ZodString&gt;; runAsGroup: z.ZodOptional&lt;z.ZodString&gt;; nonRootRequired: z.ZodLiteral&lt;true&gt;; noNewPrivileges: z.ZodLiteral&lt;true&gt;; privileged: z.ZodLiteral&lt;false&gt;; dropCapabilities: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; addCapabilities: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; seccompProfileRef: z.ZodOptional&lt;z...</code> | Sandbox Security Policy Spec 的运行时 Schema。 |
| `sandboxTmpfsSpecSchema` | 常量 | <code>const sandboxTmpfsSpecSchema: z.ZodObject&lt;{ targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; noExec: z.ZodOptional&lt;z.ZodBoolean&gt;; noSuid: z.ZodOptional&lt;z.ZodBoolean&gt;; noDev: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { targetPath: string; sizeBytes?: number &#124; undefined; mode?: number &#124; undefined; noExec?: boolean &#124; undefine...</code> | Sandbox Tmpfs Spec 的运行时 Schema。 |
| `secretInjectionPolicySpecSchema` | 常量 | <code>const secretInjectionPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ allowedSecretRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; injectionMode: z.ZodEnum&lt;["none", "environment", "file", "brokered"]&gt;; exposeNamesOnly: z.ZodOptional&lt;z.ZodBoolean&gt;; redactFromOutput: z.ZodLiteral&lt;true&gt;; redactFromEvents: z.ZodLiteral&lt;true&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; revokeOnExecutionEnd: z.ZodOptional&lt;z.ZodBoolean&gt;; ...</code> | Secret Injection Policy Spec 的运行时 Schema。 |
| `validateExecutionEnvironmentSpec` | 函数 | <code>validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec</code> | Validate Execution Environment Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionEnvironmentSpecDefinition`

Execution Environment Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionEnvironmentSpecDefinition: SpecSchemaDefinition<ExecutionEnvironmentSpec>;
```

## `executionEnvironmentSpecDefinitions`

由 `modules/execution-environment/index` 模块导出的 Execution Environment Spec Definitions 常量。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionEnvironmentSpecDefinitions: readonly [SpecSchemaDefinition<ExecutionEnvironmentSpec>];
```

## `executionEnvironmentSpecExample`

Execution Environment Spec 的有效示例值。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionEnvironmentSpecExample: ExecutionEnvironmentSpec;
```

## `executionEnvironmentSpecJsonSchema`

Execution Environment Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionEnvironmentSpecJsonSchema: JsonSchema;
```

## `executionEnvironmentSpecJsonSchemas`

由 `modules/execution-environment/index` 模块导出的 Execution Environment Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionEnvironmentSpecJsonSchemas: Record<string, JsonSchema>;
```

## `executionEnvironmentSpecSchema`

Execution Environment Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionEnvironmentSpecSchema: (typeof import('@codesoul-co/hypha-core'))['executionEnvironmentSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionImageSpecSchema`

Execution Image Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionImageSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionImageSpecSchema: z.ZodEffects<z.ZodObject<{ reference: z.ZodString; digest: z.ZodOptional<z.ZodString>; platform: z.ZodOptional<z.ZodString>; pullPolicy: z.ZodOptional<z.ZodEnum<["never", "if_not_present", "always"]>>; trustedRegistryRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requireDigestPin: z.ZodOptional<z.ZodBoolean>; sbomRef: z.ZodOptional<z.ZodString>; signaturePolicyRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }>, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }>;
```

## `executionLoggingPolicySpecSchema`

Execution Logging Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionLoggingPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const executionLoggingPolicySpecSchema: z.ZodObject<{ captureStdout: z.ZodBoolean; captureStderr: z.ZodBoolean; streamOutput: z.ZodOptional<z.ZodBoolean>; includeTimestamps: z.ZodOptional<z.ZodBoolean>; maxLineBytes: z.ZodOptional<z.ZodNumber>; redactPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; persistOutputAsArtifact: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { captureStdout: boolean; captureStderr: boolean; streamOutput?: boolean | undefined; includeTimestamps?: boolean | undefined; maxLineBytes?: number | undefined; redactPatterns?: string[] | undefined; persistOutputAsArtifact?: boolean | undefined; }, { captureStdout: boolean; captureStderr: boolean; streamOutput?: boolean | undefined; includeTimestamps?: boolean | undefined; maxLineBytes?: number | undefined; redactPatterns?: string[] | undefined; persistOutputAsArtifact?: boolean | undefined; }>;
```

## `networkPolicySpecSchema`

Network Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { networkPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const networkPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["disabled", "restricted", "enabled", "task_authorized"]>; allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedCidrs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedCidrs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedPorts: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>; allowedProtocols: z.ZodOptional<z.ZodArray<z.ZodEnum<["tcp", "udp", "http", "https", "dns"]>, "many">>; dnsPolicy: z.ZodOptional<z.ZodEnum<["disabled", "system", "managed"]>>; proxyRef: z.ZodOptional<z.ZodString>; blockPrivateNetworks: z.ZodOptional<z.ZodBoolean>; blockMetadataEndpoints: z.ZodOptional<z.ZodBoolean>; resolveAndPinDns: z.ZodOptional<z.ZodBoolean>; taskAuthorizationTtlSeconds: z.ZodOptional<z.ZodNumber>; maxConnections: z.ZodOptional<z.ZodNumber>; maxBytesSent: z.ZodOptional<z.ZodNumber>; maxBytesReceived: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }>, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }>;
```

## `processPolicySpecSchema`

Process Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { processPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const processPolicySpecSchema: z.ZodEffects<z.ZodObject<{ shellEnabled: z.ZodBoolean; allowedShells: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedExecutables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedExecutables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; executableResolution: z.ZodEnum<["absolute_allowlist", "path_allowlist", "container_path"]>; maxProcesses: z.ZodOptional<z.ZodNumber>; maxThreads: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; allowBackgroundProcesses: z.ZodOptional<z.ZodBoolean>; allowDaemonization: z.ZodOptional<z.ZodBoolean>; killProcessTreeOnExit: z.ZodLiteral<true>; environmentAllowList: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; environmentDenyList: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; inheritHostEnvironment: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; defaultUmask: z.ZodOptional<z.ZodString>; locale: z.ZodOptional<z.ZodString>; timezone: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; inheritHostEnvironment: boolean; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; inheritHostEnvironment?: boolean | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }>, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; inheritHostEnvironment: boolean; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; inheritHostEnvironment?: boolean | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }>;
```

## `resourceLimitSpecSchema`

Resource Limit Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { resourceLimitSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const resourceLimitSpecSchema: z.ZodObject<{ cpuCores: z.ZodOptional<z.ZodNumber>; cpuQuotaMicros: z.ZodOptional<z.ZodNumber>; cpuPeriodMicros: z.ZodOptional<z.ZodNumber>; cpuShares: z.ZodOptional<z.ZodNumber>; maxCpuSeconds: z.ZodOptional<z.ZodNumber>; memoryMb: z.ZodOptional<z.ZodNumber>; memorySwapMb: z.ZodOptional<z.ZodNumber>; oomKillDisable: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; diskBytes: z.ZodOptional<z.ZodNumber>; tempBytes: z.ZodOptional<z.ZodNumber>; maxWriteBytes: z.ZodOptional<z.ZodNumber>; blockIoWeight: z.ZodOptional<z.ZodNumber>; pidsLimit: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; maxStdoutBytes: z.ZodOptional<z.ZodNumber>; maxStderrBytes: z.ZodOptional<z.ZodNumber>; maxCombinedOutputBytes: z.ZodOptional<z.ZodNumber>; maxExecutionSeconds: z.ZodOptional<z.ZodNumber>; maxIdleSeconds: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { oomKillDisable: boolean; pidsLimit?: number | undefined; maxStdoutBytes?: number | undefined; maxStderrBytes?: number | undefined; cpuCores?: number | undefined; cpuQuotaMicros?: number | undefined; cpuPeriodMicros?: number | undefined; cpuShares?: number | undefined; maxCpuSeconds?: number | undefined; memoryMb?: number | undefined; memorySwapMb?: number | undefined; diskBytes?: number | undefined; tempBytes?: number | undefined; maxWriteBytes?: number | undefined; blockIoWeight?: number | undefined; maxOpenFiles?: number | undefined; maxCombinedOutputBytes?: number | undefined; maxExecutionSeconds?: number | undefined; maxIdleSeconds?: number | undefined; }, { pidsLimit?: number | undefined; maxStdoutBytes?: number | undefined; maxStderrBytes?: number | undefined; cpuCores?: number | undefined; cpuQuotaMicros?: number | undefined; cpuPeriodMicros?: number | undefined; cpuShares?: number | undefined; maxCpuSeconds?: number | undefined; memoryMb?: number | undefined; memorySwapMb?: number | undefined; oomKillDisable?: boolean | undefined; diskBytes?: number | undefined; tempBytes?: number | undefined; maxWriteBytes?: number | undefined; blockIoWeight?: number | undefined; maxOpenFiles?: number | undefined; maxCombinedOutputBytes?: number | undefined; maxExecutionSeconds?: number | undefined; maxIdleSeconds?: number | undefined; }>;
```

## `sandboxFilesystemPolicySpecSchema`

Sandbox Filesystem Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxFilesystemPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const sandboxFilesystemPolicySpecSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxFilesystemPolicySpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `sandboxLifecyclePolicySpecSchema`

Sandbox Lifecycle Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxLifecyclePolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const sandboxLifecyclePolicySpecSchema: z.ZodObject<{ reuse: z.ZodEnum<["never", "run", "session", "pool"]>; idleTtlSeconds: z.ZodOptional<z.ZodNumber>; maxLifetimeSeconds: z.ZodOptional<z.ZodNumber>; maxExecutions: z.ZodOptional<z.ZodNumber>; createTimeoutMs: z.ZodOptional<z.ZodNumber>; startTimeoutMs: z.ZodOptional<z.ZodNumber>; stopTimeoutMs: z.ZodOptional<z.ZodNumber>; cleanupTimeoutMs: z.ZodOptional<z.ZodNumber>; snapshotOnFailure: z.ZodOptional<z.ZodBoolean>; cleanupOnSuccess: z.ZodOptional<z.ZodBoolean>; cleanupOnFailure: z.ZodOptional<z.ZodBoolean>; retainForDebugSeconds: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { reuse: "never" | "session" | "run" | "pool"; idleTtlSeconds?: number | undefined; maxLifetimeSeconds?: number | undefined; maxExecutions?: number | undefined; createTimeoutMs?: number | undefined; startTimeoutMs?: number | undefined; stopTimeoutMs?: number | undefined; cleanupTimeoutMs?: number | undefined; snapshotOnFailure?: boolean | undefined; cleanupOnSuccess?: boolean | undefined; cleanupOnFailure?: boolean | undefined; retainForDebugSeconds?: number | undefined; }, { reuse: "never" | "session" | "run" | "pool"; idleTtlSeconds?: number | undefined; maxLifetimeSeconds?: number | undefined; maxExecutions?: number | undefined; createTimeoutMs?: number | undefined; startTimeoutMs?: number | undefined; stopTimeoutMs?: number | undefined; cleanupTimeoutMs?: number | undefined; snapshotOnFailure?: boolean | undefined; cleanupOnSuccess?: boolean | undefined; cleanupOnFailure?: boolean | undefined; retainForDebugSeconds?: number | undefined; }>;
```

## `sandboxMountSpecSchema`

Sandbox Mount Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxMountSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const sandboxMountSpecSchema: z.ZodEffects<z.ZodObject<{ sourceRef: z.ZodString; targetPath: z.ZodEffects<z.ZodString, string, string>; mode: z.ZodEnum<["ro", "rw"]>; type: z.ZodEnum<["bind", "volume", "artifact", "workspace", "tmpfs"]>; propagation: z.ZodOptional<z.ZodEnum<["private", "rprivate"]>>; noExec: z.ZodOptional<z.ZodBoolean>; noSuid: z.ZodOptional<z.ZodBoolean>; noDev: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>;
```

## `sandboxSecurityPolicySpecSchema`

Sandbox Security Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxSecurityPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const sandboxSecurityPolicySpecSchema: z.ZodEffects<z.ZodObject<{ runAsUser: z.ZodOptional<z.ZodString>; runAsGroup: z.ZodOptional<z.ZodString>; nonRootRequired: z.ZodLiteral<true>; noNewPrivileges: z.ZodLiteral<true>; privileged: z.ZodLiteral<false>; dropCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; addCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; seccompProfileRef: z.ZodOptional<z.ZodString>; appArmorProfileRef: z.ZodOptional<z.ZodString>; selinuxLabelRef: z.ZodOptional<z.ZodString>; userNamespace: z.ZodOptional<z.ZodBoolean>; pidNamespace: z.ZodOptional<z.ZodBoolean>; networkNamespace: z.ZodOptional<z.ZodBoolean>; ipcNamespace: z.ZodOptional<z.ZodBoolean>; utsNamespace: z.ZodOptional<z.ZodBoolean>; readOnlyProc: z.ZodOptional<z.ZodBoolean>; maskHostProc: z.ZodOptional<z.ZodBoolean>; preventPtrace: z.ZodOptional<z.ZodBoolean>; allowNestedContainers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { nonRootRequired: true; noNewPrivileges: true; privileged: false; allowNestedContainers: boolean; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; }, { nonRootRequired: true; noNewPrivileges: true; privileged: false; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; allowNestedContainers?: boolean | undefined; }>, { nonRootRequired: true; noNewPrivileges: true; privileged: false; allowNestedContainers: boolean; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; }, { nonRootRequired: true; noNewPrivileges: true; privileged: false; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; allowNestedContainers?: boolean | undefined; }>;
```

## `sandboxTmpfsSpecSchema`

Sandbox Tmpfs Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sandboxTmpfsSpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const sandboxTmpfsSpecSchema: z.ZodObject<{ targetPath: z.ZodEffects<z.ZodString, string, string>; sizeBytes: z.ZodOptional<z.ZodNumber>; mode: z.ZodOptional<z.ZodNumber>; noExec: z.ZodOptional<z.ZodBoolean>; noSuid: z.ZodOptional<z.ZodBoolean>; noDev: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { targetPath: string; sizeBytes?: number | undefined; mode?: number | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { targetPath: string; sizeBytes?: number | undefined; mode?: number | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>;
```

## `secretInjectionPolicySpecSchema`

Secret Injection Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { secretInjectionPolicySpecSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare const secretInjectionPolicySpecSchema: z.ZodEffects<z.ZodObject<{ allowedSecretRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; injectionMode: z.ZodEnum<["none", "environment", "file", "brokered"]>; exposeNamesOnly: z.ZodOptional<z.ZodBoolean>; redactFromOutput: z.ZodLiteral<true>; redactFromEvents: z.ZodLiteral<true>; ttlSeconds: z.ZodOptional<z.ZodNumber>; revokeOnExecutionEnd: z.ZodOptional<z.ZodBoolean>; allowChildProcessInheritance: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }>, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }>;
```

## `validateExecutionEnvironmentSpec`

Validate Execution Environment Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionEnvironmentSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### 声明

```text
export declare function validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec;
```

### 调用签名

```text
validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionEnvironmentSpec`
- 说明: 返回值契约由上述类型定义。
