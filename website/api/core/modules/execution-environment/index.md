# `@codesoul-co/hypha-core` / `modules/execution-environment/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-environment/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)
- Exports: **18**

## Using this module

Use the Index module for executing runtime behavior at this boundary. It exports 17 constants, 1 function.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 17 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { executionEnvironmentSpecSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionEnvironmentSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionEnvironmentSpecDefinition` | constant | <code>const executionEnvironmentSpecDefinition: SpecSchemaDefinition&lt;ExecutionEnvironmentSpec&gt;</code> | Runtime validation entrypoint for the Execution Environment spec, combining its parser, example and JSON Schema. |
| `executionEnvironmentSpecDefinitions` | constant | <code>const executionEnvironmentSpecDefinitions: readonly [SpecSchemaDefinition&lt;ExecutionEnvironmentSpec&gt;]</code> | Execution Environment Spec Definitions constant exported by the `modules/execution-environment/index` module. |
| `executionEnvironmentSpecExample` | constant | <code>const executionEnvironmentSpecExample: ExecutionEnvironmentSpec</code> | Valid example value for Execution Environment Spec. |
| `executionEnvironmentSpecJsonSchema` | constant | <code>const executionEnvironmentSpecJsonSchema: JsonSchema</code> | JSON Schema for Execution Environment Spec. |
| `executionEnvironmentSpecJsonSchemas` | constant | <code>const executionEnvironmentSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Execution Environment Spec JSON Schemas constant exported by the `modules/execution-environment/index` module. |
| `executionEnvironmentSpecSchema` | constant | <code>const executionEnvironmentSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; provider: z.ZodEnum&lt;[...</code> | Runtime schema for Execution Environment Spec. |
| `executionImageSpecSchema` | constant | <code>const executionImageSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ reference: z.ZodString; digest: z.ZodOptional&lt;z.ZodString&gt;; platform: z.ZodOptional&lt;z.ZodString&gt;; pullPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["never", "if_not_present", "always"]&gt;&gt;; trustedRegistryRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requireDigestPin: z.ZodOptional&lt;z.ZodBoolean&gt;; sbomRef: z.ZodOptional&lt;z.ZodString&gt;; signaturePolicyRef: z.ZodOptio...</code> | Runtime schema for Execution Image Spec. |
| `executionLoggingPolicySpecSchema` | constant | <code>const executionLoggingPolicySpecSchema: z.ZodObject&lt;{ captureStdout: z.ZodBoolean; captureStderr: z.ZodBoolean; streamOutput: z.ZodOptional&lt;z.ZodBoolean&gt;; includeTimestamps: z.ZodOptional&lt;z.ZodBoolean&gt;; maxLineBytes: z.ZodOptional&lt;z.ZodNumber&gt;; redactPatterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; persistOutputAsArtifact: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { captureStdout: boolean; c...</code> | Runtime schema for Execution Logging Policy Spec. |
| `networkPolicySpecSchema` | constant | <code>const networkPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ mode: z.ZodEnum&lt;["disabled", "restricted", "enabled", "task_authorized"]&gt;; allowedDomains: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedDomains: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedCidrs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedCidrs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedPorts: z.ZodOptional&lt;z.ZodA...</code> | Runtime schema for Network Policy Spec. |
| `processPolicySpecSchema` | constant | <code>const processPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ shellEnabled: z.ZodBoolean; allowedShells: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; allowedExecutables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; deniedExecutables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; executableResolution: z.ZodEnum&lt;["absolute_allowlist", "path_allowlist", "container_path"]&gt;; maxProcesses: z.ZodOptional&lt;z.ZodNumber&gt;...</code> | Runtime schema for Process Policy Spec. |
| `resourceLimitSpecSchema` | constant | <code>const resourceLimitSpecSchema: z.ZodObject&lt;{ cpuCores: z.ZodOptional&lt;z.ZodNumber&gt;; cpuQuotaMicros: z.ZodOptional&lt;z.ZodNumber&gt;; cpuPeriodMicros: z.ZodOptional&lt;z.ZodNumber&gt;; cpuShares: z.ZodOptional&lt;z.ZodNumber&gt;; maxCpuSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; memoryMb: z.ZodOptional&lt;z.ZodNumber&gt;; memorySwapMb: z.ZodOptional&lt;z.ZodNumber&gt;; oomKillDisable: z.ZodDefault&lt;z.ZodOptional&lt;z.ZodBoolean&gt;&gt;; diskBytes: z.ZodOptional...</code> | Runtime schema for Resource Limit Spec. |
| `sandboxFilesystemPolicySpecSchema` | constant | <code>const sandboxFilesystemPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ rootFilesystem: z.ZodEnum&lt;["read_only", "writable"]&gt;; mounts: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ sourceRef: z.ZodString; targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; mode: z.ZodEnum&lt;["ro", "rw"]&gt;; type: z.ZodEnum&lt;["bind", "volume", "artifact", "workspace", "tmpfs"]&gt;; propagation: z.ZodOptional&lt;z.ZodEnum&lt;["private", "rprivate"]&gt;&gt;; noEx...</code> | Runtime schema for Sandbox Filesystem Policy Spec. |
| `sandboxLifecyclePolicySpecSchema` | constant | <code>const sandboxLifecyclePolicySpecSchema: z.ZodObject&lt;{ reuse: z.ZodEnum&lt;["never", "run", "session", "pool"]&gt;; idleTtlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; maxLifetimeSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; maxExecutions: z.ZodOptional&lt;z.ZodNumber&gt;; createTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; startTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; stopTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; cleanupTimeoutMs: z.ZodOptional&lt;z.ZodNumb...</code> | Runtime schema for Sandbox Lifecycle Policy Spec. |
| `sandboxMountSpecSchema` | constant | <code>const sandboxMountSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRef: z.ZodString; targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; mode: z.ZodEnum&lt;["ro", "rw"]&gt;; type: z.ZodEnum&lt;["bind", "volume", "artifact", "workspace", "tmpfs"]&gt;; propagation: z.ZodOptional&lt;z.ZodEnum&lt;["private", "rprivate"]&gt;&gt;; noExec: z.ZodOptional&lt;z.ZodBoolean&gt;; noSuid: z.ZodOptional&lt;z.ZodBoolean&gt;; noDev: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "s...</code> | Runtime schema for Sandbox Mount Spec. |
| `sandboxSecurityPolicySpecSchema` | constant | <code>const sandboxSecurityPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runAsUser: z.ZodOptional&lt;z.ZodString&gt;; runAsGroup: z.ZodOptional&lt;z.ZodString&gt;; nonRootRequired: z.ZodLiteral&lt;true&gt;; noNewPrivileges: z.ZodLiteral&lt;true&gt;; privileged: z.ZodLiteral&lt;false&gt;; dropCapabilities: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; addCapabilities: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; seccompProfileRef: z.ZodOptional&lt;z...</code> | Runtime schema for Sandbox Security Policy Spec. |
| `sandboxTmpfsSpecSchema` | constant | <code>const sandboxTmpfsSpecSchema: z.ZodObject&lt;{ targetPath: z.ZodEffects&lt;z.ZodString, string, string&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; mode: z.ZodOptional&lt;z.ZodNumber&gt;; noExec: z.ZodOptional&lt;z.ZodBoolean&gt;; noSuid: z.ZodOptional&lt;z.ZodBoolean&gt;; noDev: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { targetPath: string; sizeBytes?: number &#124; undefined; mode?: number &#124; undefined; noExec?: boolean &#124; undefine...</code> | Runtime schema for Sandbox Tmpfs Spec. |
| `secretInjectionPolicySpecSchema` | constant | <code>const secretInjectionPolicySpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ allowedSecretRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; injectionMode: z.ZodEnum&lt;["none", "environment", "file", "brokered"]&gt;; exposeNamesOnly: z.ZodOptional&lt;z.ZodBoolean&gt;; redactFromOutput: z.ZodLiteral&lt;true&gt;; redactFromEvents: z.ZodLiteral&lt;true&gt;; ttlSeconds: z.ZodOptional&lt;z.ZodNumber&gt;; revokeOnExecutionEnd: z.ZodOptional&lt;z.ZodBoolean&gt;; ...</code> | Runtime schema for Secret Injection Policy Spec. |
| `validateExecutionEnvironmentSpec` | function | <code>validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec</code> | Validate Execution Environment Spec function with 1 public call signature; parameters and return types are listed below. |

## `executionEnvironmentSpecDefinition`

Runtime validation entrypoint for the Execution Environment spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { executionEnvironmentSpecDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionEnvironmentSpecDefinition: SpecSchemaDefinition<ExecutionEnvironmentSpec>;
```

## `executionEnvironmentSpecDefinitions`

Execution Environment Spec Definitions constant exported by the `modules/execution-environment/index` module.

- Kind: constant
- Import: `import { executionEnvironmentSpecDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionEnvironmentSpecDefinitions: readonly [SpecSchemaDefinition<ExecutionEnvironmentSpec>];
```

## `executionEnvironmentSpecExample`

Valid example value for Execution Environment Spec.

- Kind: constant
- Import: `import { executionEnvironmentSpecExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionEnvironmentSpecExample: ExecutionEnvironmentSpec;
```

## `executionEnvironmentSpecJsonSchema`

JSON Schema for Execution Environment Spec.

- Kind: constant
- Import: `import { executionEnvironmentSpecJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionEnvironmentSpecJsonSchema: JsonSchema;
```

## `executionEnvironmentSpecJsonSchemas`

Execution Environment Spec JSON Schemas constant exported by the `modules/execution-environment/index` module.

- Kind: constant
- Import: `import { executionEnvironmentSpecJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionEnvironmentSpecJsonSchemas: Record<string, JsonSchema>;
```

## `executionEnvironmentSpecSchema`

Runtime schema for Execution Environment Spec.

- Kind: constant
- Import: `import { executionEnvironmentSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const executionEnvironmentSpecSchema: (typeof import('@codesoul-co/hypha-core'))['executionEnvironmentSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `executionImageSpecSchema`

Runtime schema for Execution Image Spec.

- Kind: constant
- Import: `import { executionImageSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionImageSpecSchema: z.ZodEffects<z.ZodObject<{ reference: z.ZodString; digest: z.ZodOptional<z.ZodString>; platform: z.ZodOptional<z.ZodString>; pullPolicy: z.ZodOptional<z.ZodEnum<["never", "if_not_present", "always"]>>; trustedRegistryRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requireDigestPin: z.ZodOptional<z.ZodBoolean>; sbomRef: z.ZodOptional<z.ZodString>; signaturePolicyRef: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }>, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }, { reference: string; platform?: string | undefined; digest?: string | undefined; pullPolicy?: "never" | "if_not_present" | "always" | undefined; trustedRegistryRefs?: string[] | undefined; requireDigestPin?: boolean | undefined; sbomRef?: string | undefined; signaturePolicyRef?: string | undefined; }>;
```

## `executionLoggingPolicySpecSchema`

Runtime schema for Execution Logging Policy Spec.

- Kind: constant
- Import: `import { executionLoggingPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const executionLoggingPolicySpecSchema: z.ZodObject<{ captureStdout: z.ZodBoolean; captureStderr: z.ZodBoolean; streamOutput: z.ZodOptional<z.ZodBoolean>; includeTimestamps: z.ZodOptional<z.ZodBoolean>; maxLineBytes: z.ZodOptional<z.ZodNumber>; redactPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; persistOutputAsArtifact: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { captureStdout: boolean; captureStderr: boolean; streamOutput?: boolean | undefined; includeTimestamps?: boolean | undefined; maxLineBytes?: number | undefined; redactPatterns?: string[] | undefined; persistOutputAsArtifact?: boolean | undefined; }, { captureStdout: boolean; captureStderr: boolean; streamOutput?: boolean | undefined; includeTimestamps?: boolean | undefined; maxLineBytes?: number | undefined; redactPatterns?: string[] | undefined; persistOutputAsArtifact?: boolean | undefined; }>;
```

## `networkPolicySpecSchema`

Runtime schema for Network Policy Spec.

- Kind: constant
- Import: `import { networkPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const networkPolicySpecSchema: z.ZodEffects<z.ZodObject<{ mode: z.ZodEnum<["disabled", "restricted", "enabled", "task_authorized"]>; allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedCidrs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedCidrs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedPorts: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>; allowedProtocols: z.ZodOptional<z.ZodArray<z.ZodEnum<["tcp", "udp", "http", "https", "dns"]>, "many">>; dnsPolicy: z.ZodOptional<z.ZodEnum<["disabled", "system", "managed"]>>; proxyRef: z.ZodOptional<z.ZodString>; blockPrivateNetworks: z.ZodOptional<z.ZodBoolean>; blockMetadataEndpoints: z.ZodOptional<z.ZodBoolean>; resolveAndPinDns: z.ZodOptional<z.ZodBoolean>; taskAuthorizationTtlSeconds: z.ZodOptional<z.ZodNumber>; maxConnections: z.ZodOptional<z.ZodNumber>; maxBytesSent: z.ZodOptional<z.ZodNumber>; maxBytesReceived: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }>, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }, { mode: "enabled" | "disabled" | "restricted" | "task_authorized"; allowedDomains?: string[] | undefined; allowedCidrs?: string[] | undefined; allowedPorts?: number[] | undefined; allowedProtocols?: ("tcp" | "udp" | "http" | "https" | "dns")[] | undefined; proxyRef?: string | undefined; deniedDomains?: string[] | undefined; deniedCidrs?: string[] | undefined; dnsPolicy?: "system" | "managed" | "disabled" | undefined; blockPrivateNetworks?: boolean | undefined; blockMetadataEndpoints?: boolean | undefined; resolveAndPinDns?: boolean | undefined; taskAuthorizationTtlSeconds?: number | undefined; maxConnections?: number | undefined; maxBytesSent?: number | undefined; maxBytesReceived?: number | undefined; }>;
```

## `processPolicySpecSchema`

Runtime schema for Process Policy Spec.

- Kind: constant
- Import: `import { processPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const processPolicySpecSchema: z.ZodEffects<z.ZodObject<{ shellEnabled: z.ZodBoolean; allowedShells: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedExecutables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; deniedExecutables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; executableResolution: z.ZodEnum<["absolute_allowlist", "path_allowlist", "container_path"]>; maxProcesses: z.ZodOptional<z.ZodNumber>; maxThreads: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; allowBackgroundProcesses: z.ZodOptional<z.ZodBoolean>; allowDaemonization: z.ZodOptional<z.ZodBoolean>; killProcessTreeOnExit: z.ZodLiteral<true>; environmentAllowList: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; environmentDenyList: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; inheritHostEnvironment: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; defaultUmask: z.ZodOptional<z.ZodString>; locale: z.ZodOptional<z.ZodString>; timezone: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; inheritHostEnvironment: boolean; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; inheritHostEnvironment?: boolean | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }>, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; inheritHostEnvironment: boolean; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }, { shellEnabled: boolean; executableResolution: "absolute_allowlist" | "path_allowlist" | "container_path"; killProcessTreeOnExit: true; maxOpenFiles?: number | undefined; allowedShells?: string[] | undefined; allowedExecutables?: string[] | undefined; deniedExecutables?: string[] | undefined; maxProcesses?: number | undefined; maxThreads?: number | undefined; allowBackgroundProcesses?: boolean | undefined; allowDaemonization?: boolean | undefined; environmentAllowList?: string[] | undefined; environmentDenyList?: string[] | undefined; inheritHostEnvironment?: boolean | undefined; defaultUmask?: string | undefined; locale?: string | undefined; timezone?: string | undefined; }>;
```

## `resourceLimitSpecSchema`

Runtime schema for Resource Limit Spec.

- Kind: constant
- Import: `import { resourceLimitSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const resourceLimitSpecSchema: z.ZodObject<{ cpuCores: z.ZodOptional<z.ZodNumber>; cpuQuotaMicros: z.ZodOptional<z.ZodNumber>; cpuPeriodMicros: z.ZodOptional<z.ZodNumber>; cpuShares: z.ZodOptional<z.ZodNumber>; maxCpuSeconds: z.ZodOptional<z.ZodNumber>; memoryMb: z.ZodOptional<z.ZodNumber>; memorySwapMb: z.ZodOptional<z.ZodNumber>; oomKillDisable: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; diskBytes: z.ZodOptional<z.ZodNumber>; tempBytes: z.ZodOptional<z.ZodNumber>; maxWriteBytes: z.ZodOptional<z.ZodNumber>; blockIoWeight: z.ZodOptional<z.ZodNumber>; pidsLimit: z.ZodOptional<z.ZodNumber>; maxOpenFiles: z.ZodOptional<z.ZodNumber>; maxStdoutBytes: z.ZodOptional<z.ZodNumber>; maxStderrBytes: z.ZodOptional<z.ZodNumber>; maxCombinedOutputBytes: z.ZodOptional<z.ZodNumber>; maxExecutionSeconds: z.ZodOptional<z.ZodNumber>; maxIdleSeconds: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { oomKillDisable: boolean; pidsLimit?: number | undefined; maxStdoutBytes?: number | undefined; maxStderrBytes?: number | undefined; cpuCores?: number | undefined; cpuQuotaMicros?: number | undefined; cpuPeriodMicros?: number | undefined; cpuShares?: number | undefined; maxCpuSeconds?: number | undefined; memoryMb?: number | undefined; memorySwapMb?: number | undefined; diskBytes?: number | undefined; tempBytes?: number | undefined; maxWriteBytes?: number | undefined; blockIoWeight?: number | undefined; maxOpenFiles?: number | undefined; maxCombinedOutputBytes?: number | undefined; maxExecutionSeconds?: number | undefined; maxIdleSeconds?: number | undefined; }, { pidsLimit?: number | undefined; maxStdoutBytes?: number | undefined; maxStderrBytes?: number | undefined; cpuCores?: number | undefined; cpuQuotaMicros?: number | undefined; cpuPeriodMicros?: number | undefined; cpuShares?: number | undefined; maxCpuSeconds?: number | undefined; memoryMb?: number | undefined; memorySwapMb?: number | undefined; oomKillDisable?: boolean | undefined; diskBytes?: number | undefined; tempBytes?: number | undefined; maxWriteBytes?: number | undefined; blockIoWeight?: number | undefined; maxOpenFiles?: number | undefined; maxCombinedOutputBytes?: number | undefined; maxExecutionSeconds?: number | undefined; maxIdleSeconds?: number | undefined; }>;
```

## `sandboxFilesystemPolicySpecSchema`

Runtime schema for Sandbox Filesystem Policy Spec.

- Kind: constant
- Import: `import { sandboxFilesystemPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const sandboxFilesystemPolicySpecSchema: (typeof import('@codesoul-co/hypha-core'))['sandboxFilesystemPolicySpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `sandboxLifecyclePolicySpecSchema`

Runtime schema for Sandbox Lifecycle Policy Spec.

- Kind: constant
- Import: `import { sandboxLifecyclePolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const sandboxLifecyclePolicySpecSchema: z.ZodObject<{ reuse: z.ZodEnum<["never", "run", "session", "pool"]>; idleTtlSeconds: z.ZodOptional<z.ZodNumber>; maxLifetimeSeconds: z.ZodOptional<z.ZodNumber>; maxExecutions: z.ZodOptional<z.ZodNumber>; createTimeoutMs: z.ZodOptional<z.ZodNumber>; startTimeoutMs: z.ZodOptional<z.ZodNumber>; stopTimeoutMs: z.ZodOptional<z.ZodNumber>; cleanupTimeoutMs: z.ZodOptional<z.ZodNumber>; snapshotOnFailure: z.ZodOptional<z.ZodBoolean>; cleanupOnSuccess: z.ZodOptional<z.ZodBoolean>; cleanupOnFailure: z.ZodOptional<z.ZodBoolean>; retainForDebugSeconds: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { reuse: "never" | "session" | "run" | "pool"; idleTtlSeconds?: number | undefined; maxLifetimeSeconds?: number | undefined; maxExecutions?: number | undefined; createTimeoutMs?: number | undefined; startTimeoutMs?: number | undefined; stopTimeoutMs?: number | undefined; cleanupTimeoutMs?: number | undefined; snapshotOnFailure?: boolean | undefined; cleanupOnSuccess?: boolean | undefined; cleanupOnFailure?: boolean | undefined; retainForDebugSeconds?: number | undefined; }, { reuse: "never" | "session" | "run" | "pool"; idleTtlSeconds?: number | undefined; maxLifetimeSeconds?: number | undefined; maxExecutions?: number | undefined; createTimeoutMs?: number | undefined; startTimeoutMs?: number | undefined; stopTimeoutMs?: number | undefined; cleanupTimeoutMs?: number | undefined; snapshotOnFailure?: boolean | undefined; cleanupOnSuccess?: boolean | undefined; cleanupOnFailure?: boolean | undefined; retainForDebugSeconds?: number | undefined; }>;
```

## `sandboxMountSpecSchema`

Runtime schema for Sandbox Mount Spec.

- Kind: constant
- Import: `import { sandboxMountSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const sandboxMountSpecSchema: z.ZodEffects<z.ZodObject<{ sourceRef: z.ZodString; targetPath: z.ZodEffects<z.ZodString, string, string>; mode: z.ZodEnum<["ro", "rw"]>; type: z.ZodEnum<["bind", "volume", "artifact", "workspace", "tmpfs"]>; propagation: z.ZodOptional<z.ZodEnum<["private", "rprivate"]>>; noExec: z.ZodOptional<z.ZodBoolean>; noSuid: z.ZodOptional<z.ZodBoolean>; noDev: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { type: "workspace" | "artifact" | "bind" | "volume" | "tmpfs"; mode: "ro" | "rw"; sourceRef: string; targetPath: string; propagation?: "private" | "rprivate" | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>;
```

## `sandboxSecurityPolicySpecSchema`

Runtime schema for Sandbox Security Policy Spec.

- Kind: constant
- Import: `import { sandboxSecurityPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const sandboxSecurityPolicySpecSchema: z.ZodEffects<z.ZodObject<{ runAsUser: z.ZodOptional<z.ZodString>; runAsGroup: z.ZodOptional<z.ZodString>; nonRootRequired: z.ZodLiteral<true>; noNewPrivileges: z.ZodLiteral<true>; privileged: z.ZodLiteral<false>; dropCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; addCapabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; seccompProfileRef: z.ZodOptional<z.ZodString>; appArmorProfileRef: z.ZodOptional<z.ZodString>; selinuxLabelRef: z.ZodOptional<z.ZodString>; userNamespace: z.ZodOptional<z.ZodBoolean>; pidNamespace: z.ZodOptional<z.ZodBoolean>; networkNamespace: z.ZodOptional<z.ZodBoolean>; ipcNamespace: z.ZodOptional<z.ZodBoolean>; utsNamespace: z.ZodOptional<z.ZodBoolean>; readOnlyProc: z.ZodOptional<z.ZodBoolean>; maskHostProc: z.ZodOptional<z.ZodBoolean>; preventPtrace: z.ZodOptional<z.ZodBoolean>; allowNestedContainers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { nonRootRequired: true; noNewPrivileges: true; privileged: false; allowNestedContainers: boolean; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; }, { nonRootRequired: true; noNewPrivileges: true; privileged: false; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; allowNestedContainers?: boolean | undefined; }>, { nonRootRequired: true; noNewPrivileges: true; privileged: false; allowNestedContainers: boolean; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; }, { nonRootRequired: true; noNewPrivileges: true; privileged: false; metadata?: Record<string, unknown> | undefined; runAsUser?: string | undefined; runAsGroup?: string | undefined; dropCapabilities?: string[] | undefined; addCapabilities?: string[] | undefined; seccompProfileRef?: string | undefined; appArmorProfileRef?: string | undefined; selinuxLabelRef?: string | undefined; userNamespace?: boolean | undefined; pidNamespace?: boolean | undefined; networkNamespace?: boolean | undefined; ipcNamespace?: boolean | undefined; utsNamespace?: boolean | undefined; readOnlyProc?: boolean | undefined; maskHostProc?: boolean | undefined; preventPtrace?: boolean | undefined; allowNestedContainers?: boolean | undefined; }>;
```

## `sandboxTmpfsSpecSchema`

Runtime schema for Sandbox Tmpfs Spec.

- Kind: constant
- Import: `import { sandboxTmpfsSpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const sandboxTmpfsSpecSchema: z.ZodObject<{ targetPath: z.ZodEffects<z.ZodString, string, string>; sizeBytes: z.ZodOptional<z.ZodNumber>; mode: z.ZodOptional<z.ZodNumber>; noExec: z.ZodOptional<z.ZodBoolean>; noSuid: z.ZodOptional<z.ZodBoolean>; noDev: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { targetPath: string; sizeBytes?: number | undefined; mode?: number | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }, { targetPath: string; sizeBytes?: number | undefined; mode?: number | undefined; noExec?: boolean | undefined; noSuid?: boolean | undefined; noDev?: boolean | undefined; }>;
```

## `secretInjectionPolicySpecSchema`

Runtime schema for Secret Injection Policy Spec.

- Kind: constant
- Import: `import { secretInjectionPolicySpecSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare const secretInjectionPolicySpecSchema: z.ZodEffects<z.ZodObject<{ allowedSecretRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; injectionMode: z.ZodEnum<["none", "environment", "file", "brokered"]>; exposeNamesOnly: z.ZodOptional<z.ZodBoolean>; redactFromOutput: z.ZodLiteral<true>; redactFromEvents: z.ZodLiteral<true>; ttlSeconds: z.ZodOptional<z.ZodNumber>; revokeOnExecutionEnd: z.ZodOptional<z.ZodBoolean>; allowChildProcessInheritance: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }>, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }, { injectionMode: "none" | "file" | "environment" | "brokered"; redactFromOutput: true; redactFromEvents: true; allowedSecretRefs?: string[] | undefined; exposeNamesOnly?: boolean | undefined; ttlSeconds?: number | undefined; revokeOnExecutionEnd?: boolean | undefined; allowChildProcessInheritance?: boolean | undefined; }>;
```

## `validateExecutionEnvironmentSpec`

Validate Execution Environment Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateExecutionEnvironmentSpec } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-environment/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-environment/index.ts)

### Declaration

```text
export declare function validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec;
```

### Call signature

```text
validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionEnvironmentSpec`
- Description: The return contract is defined by the type shown above.
