# `@codesoul-co/hypha-core` / `contracts/sandbox`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/sandbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionEnvironmentSpec` | 接口 | <code>interface ExecutionEnvironmentSpec extends VersionedSpec, SpecMetadata</code> | Execution Environment Spec 的字段契约；完整字段见下表。 |
| `ExecutionImageSpec` | 接口 | <code>interface ExecutionImageSpec</code> | Execution Image Spec 的字段契约；完整字段见下表。 |
| `ExecutionLoggingPolicySpec` | 接口 | <code>interface ExecutionLoggingPolicySpec</code> | Execution Logging Policy Spec 的字段契约；完整字段见下表。 |
| `NetworkPolicySpec` | 接口 | <code>interface NetworkPolicySpec</code> | Network Policy Spec 的字段契约；完整字段见下表。 |
| `ProcessPolicySpec` | 接口 | <code>interface ProcessPolicySpec</code> | Process Policy Spec 的字段契约；完整字段见下表。 |
| `ResourceLimitSpec` | 接口 | <code>interface ResourceLimitSpec</code> | Resource Limit Spec 的字段契约；完整字段见下表。 |
| `SandboxCleanupRequest` | 接口 | <code>interface SandboxCleanupRequest</code> | Sandbox Cleanup Request 的字段契约；完整字段见下表。 |
| `SandboxCreateRequest` | 接口 | <code>interface SandboxCreateRequest</code> | Sandbox Create Request 的字段契约；完整字段见下表。 |
| `SandboxFilesystemPolicySpec` | 接口 | <code>interface SandboxFilesystemPolicySpec</code> | Sandbox Filesystem Policy Spec 的字段契约；完整字段见下表。 |
| `SandboxLifecyclePolicySpec` | 接口 | <code>interface SandboxLifecyclePolicySpec</code> | Sandbox Lifecycle Policy Spec 的字段契约；完整字段见下表。 |
| `SandboxMountSpec` | 接口 | <code>interface SandboxMountSpec</code> | Sandbox Mount Spec 的字段契约；完整字段见下表。 |
| `SandboxProviderCapabilities` | 接口 | <code>interface SandboxProviderCapabilities</code> | Sandbox Provider Capabilities 的字段契约；完整字段见下表。 |
| `SandboxRecord` | 接口 | <code>interface SandboxRecord</code> | Sandbox Record 的字段契约；完整字段见下表。 |
| `SandboxSecurityPolicySpec` | 接口 | <code>interface SandboxSecurityPolicySpec</code> | Sandbox Security Policy Spec 的字段契约；完整字段见下表。 |
| `SandboxStartRequest` | 接口 | <code>interface SandboxStartRequest</code> | Sandbox Start Request 的字段契约；完整字段见下表。 |
| `SandboxStatusRequest` | 接口 | <code>interface SandboxStatusRequest</code> | Sandbox Status Request 的字段契约；完整字段见下表。 |
| `SandboxTerminateRequest` | 接口 | <code>interface SandboxTerminateRequest</code> | Sandbox Terminate Request 的字段契约；完整字段见下表。 |
| `SandboxTmpfsSpec` | 接口 | <code>interface SandboxTmpfsSpec</code> | Sandbox Tmpfs Spec 的字段契约；完整字段见下表。 |
| `SecretInjectionPolicySpec` | 接口 | <code>interface SecretInjectionPolicySpec</code> | Secret Injection Policy Spec 的字段契约；完整字段见下表。 |
| `SandboxStatus` | 类型 | <code>type SandboxStatus = 'creating' &#124; 'created' &#124; 'starting' &#124; 'ready' &#124; 'busy' &#124; 'stopping' &#124; 'stopped' &#124; 'terminating' &#124; 'terminated' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Sandbox Status 的公共类型别名。 |

## `ExecutionEnvironmentSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultTimeoutMs` | 属性 | <code>defaultTimeoutMs: number</code> | default Timeout Ms 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `filesystem` | 属性 | <code>filesystem: SandboxFilesystemPolicySpec</code> | filesystem 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `image` | 属性 | <code>image: ExecutionImageSpec</code> | image 字段。 |
| `lifecycle` | 属性 | <code>lifecycle: SandboxLifecyclePolicySpec</code> | lifecycle 字段。 |
| `logging` | 属性 | <code>logging: ExecutionLoggingPolicySpec</code> | logging 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `network` | 属性 | <code>network: NetworkPolicySpec</code> | network 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `process` | 属性 | <code>process: ProcessPolicySpec</code> | process 字段。 |
| `provider` | 属性 | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | provider 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `resources` | 属性 | <code>resources: ResourceLimitSpec</code> | resources 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `secrets` | 属性 | <code>secrets: SecretInjectionPolicySpec</code> | secrets 字段。 |
| `security` | 属性 | <code>security: SandboxSecurityPolicySpec</code> | security 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workingDirectoryPolicy` | 属性 | <code>workingDirectoryPolicy: "workspace_only" &#124; "configured_paths"</code> | working Directory Policy 字段。 |

## `ExecutionImageSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `digest` | 属性 | <code>digest: string</code> | digest 字段。 |
| `platform` | 属性 | <code>platform: string</code> | platform 字段。 |
| `pullPolicy` | 属性 | <code>pullPolicy: "never" &#124; "if_not_present" &#124; "always"</code> | pull Policy 字段。 |
| `reference` | 属性 | <code>reference: string</code> | reference 字段。 |
| `requireDigestPin` | 属性 | <code>requireDigestPin: boolean</code> | require Digest Pin 字段。 |
| `sbomRef` | 属性 | <code>sbomRef: string</code> | sbom Ref 字段。 |
| `signaturePolicyRef` | 属性 | <code>signaturePolicyRef: string</code> | signature Policy Ref 字段。 |
| `trustedRegistryRefs` | 属性 | <code>trustedRegistryRefs: string[]</code> | trusted Registry Refs 字段。 |

## `ExecutionLoggingPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captureStderr` | 属性 | <code>captureStderr: boolean</code> | capture Stderr 字段。 |
| `captureStdout` | 属性 | <code>captureStdout: boolean</code> | capture Stdout 字段。 |
| `includeTimestamps` | 属性 | <code>includeTimestamps: boolean</code> | include Timestamps 字段。 |
| `maxLineBytes` | 属性 | <code>maxLineBytes: number</code> | max Line Bytes 字段。 |
| `persistOutputAsArtifact` | 属性 | <code>persistOutputAsArtifact: boolean</code> | persist Output As Artifact 字段。 |
| `redactPatterns` | 属性 | <code>redactPatterns: string[]</code> | redact Patterns 字段。 |
| `streamOutput` | 属性 | <code>streamOutput: boolean</code> | stream Output 字段。 |

## `NetworkPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedCidrs` | 属性 | <code>allowedCidrs: string[]</code> | allowed Cidrs 字段。 |
| `allowedDomains` | 属性 | <code>allowedDomains: string[]</code> | allowed Domains 字段。 |
| `allowedPorts` | 属性 | <code>allowedPorts: number[]</code> | allowed Ports 字段。 |
| `allowedProtocols` | 属性 | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | allowed Protocols 字段。 |
| `blockMetadataEndpoints` | 属性 | <code>blockMetadataEndpoints: boolean</code> | block Metadata Endpoints 字段。 |
| `blockPrivateNetworks` | 属性 | <code>blockPrivateNetworks: boolean</code> | block Private Networks 字段。 |
| `deniedCidrs` | 属性 | <code>deniedCidrs: string[]</code> | denied Cidrs 字段。 |
| `deniedDomains` | 属性 | <code>deniedDomains: string[]</code> | denied Domains 字段。 |
| `dnsPolicy` | 属性 | <code>dnsPolicy: "system" &#124; "managed" &#124; "disabled"</code> | dns Policy 字段。 |
| `maxBytesReceived` | 属性 | <code>maxBytesReceived: number</code> | max Bytes Received 字段。 |
| `maxBytesSent` | 属性 | <code>maxBytesSent: number</code> | max Bytes Sent 字段。 |
| `maxConnections` | 属性 | <code>maxConnections: number</code> | max Connections 字段。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | mode 字段。 |
| `proxyRef` | 属性 | <code>proxyRef: string</code> | proxy Ref 字段。 |
| `resolveAndPinDns` | 属性 | <code>resolveAndPinDns: boolean</code> | resolve And Pin Dns 字段。 |
| `taskAuthorizationTtlSeconds` | 属性 | <code>taskAuthorizationTtlSeconds: number</code> | task Authorization Ttl Seconds 字段。 |

## `ProcessPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowBackgroundProcesses` | 属性 | <code>allowBackgroundProcesses: boolean</code> | allow Background Processes 字段。 |
| `allowDaemonization` | 属性 | <code>allowDaemonization: boolean</code> | allow Daemonization 字段。 |
| `allowedExecutables` | 属性 | <code>allowedExecutables: string[]</code> | allowed Executables 字段。 |
| `allowedShells` | 属性 | <code>allowedShells: string[]</code> | allowed Shells 字段。 |
| `defaultUmask` | 属性 | <code>defaultUmask: string</code> | default Umask 字段。 |
| `deniedExecutables` | 属性 | <code>deniedExecutables: string[]</code> | denied Executables 字段。 |
| `environmentAllowList` | 属性 | <code>environmentAllowList: string[]</code> | environment Allow List 字段。 |
| `environmentDenyList` | 属性 | <code>environmentDenyList: string[]</code> | environment Deny List 字段。 |
| `executableResolution` | 属性 | <code>executableResolution: "absolute_allowlist" &#124; "path_allowlist" &#124; "container_path"</code> | executable Resolution 字段。 |
| `inheritHostEnvironment` | 属性 | <code>inheritHostEnvironment: boolean</code> | inherit Host Environment 字段。 |
| `killProcessTreeOnExit` | 属性 | <code>killProcessTreeOnExit: boolean</code> | kill Process Tree On Exit 字段。 |
| `locale` | 属性 | <code>locale: string</code> | locale 字段。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles: number</code> | max Open Files 字段。 |
| `maxProcesses` | 属性 | <code>maxProcesses: number</code> | max Processes 字段。 |
| `maxThreads` | 属性 | <code>maxThreads: number</code> | max Threads 字段。 |
| `shellEnabled` | 属性 | <code>shellEnabled: boolean</code> | shell Enabled 字段。 |
| `timezone` | 属性 | <code>timezone: string</code> | timezone 字段。 |

## `ResourceLimitSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blockIoWeight` | 属性 | <code>blockIoWeight: number</code> | block Io Weight 字段。 |
| `cpuCores` | 属性 | <code>cpuCores: number</code> | cpu Cores 字段。 |
| `cpuPeriodMicros` | 属性 | <code>cpuPeriodMicros: number</code> | cpu Period Micros 字段。 |
| `cpuQuotaMicros` | 属性 | <code>cpuQuotaMicros: number</code> | cpu Quota Micros 字段。 |
| `cpuShares` | 属性 | <code>cpuShares: number</code> | cpu Shares 字段。 |
| `diskBytes` | 属性 | <code>diskBytes: number</code> | disk Bytes 字段。 |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | max Combined Output Bytes 字段。 |
| `maxCpuSeconds` | 属性 | <code>maxCpuSeconds: number</code> | max Cpu Seconds 字段。 |
| `maxExecutionSeconds` | 属性 | <code>maxExecutionSeconds: number</code> | max Execution Seconds 字段。 |
| `maxIdleSeconds` | 属性 | <code>maxIdleSeconds: number</code> | max Idle Seconds 字段。 |
| `maxOpenFiles` | 属性 | <code>maxOpenFiles: number</code> | max Open Files 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |
| `maxWriteBytes` | 属性 | <code>maxWriteBytes: number</code> | max Write Bytes 字段。 |
| `memoryMb` | 属性 | <code>memoryMb: number</code> | memory Mb 字段。 |
| `memorySwapMb` | 属性 | <code>memorySwapMb: number</code> | memory Swap Mb 字段。 |
| `oomKillDisable` | 属性 | <code>oomKillDisable: boolean</code> | oom Kill Disable 字段。 |
| `pidsLimit` | 属性 | <code>pidsLimit: number</code> | pids Limit 字段。 |
| `tempBytes` | 属性 | <code>tempBytes: number</code> | temp Bytes 字段。 |

## `SandboxCleanupRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `SandboxCreateRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | environment 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `SandboxFilesystemPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowDeviceAccess` | 属性 | <code>allowDeviceAccess: boolean</code> | allow Device Access 字段。 |
| `allowedDevices` | 属性 | <code>allowedDevices: string[]</code> | allowed Devices 字段。 |
| `allowHostPathMounts` | 属性 | <code>allowHostPathMounts: boolean</code> | allow Host Path Mounts 字段。 |
| `maskPaths` | 属性 | <code>maskPaths: string[]</code> | mask Paths 字段。 |
| `maxMounts` | 属性 | <code>maxMounts: number</code> | max Mounts 字段。 |
| `mounts` | 属性 | <code>mounts: SandboxMountSpec[]</code> | mounts 字段。 |
| `readonlyPaths` | 属性 | <code>readonlyPaths: string[]</code> | readonly Paths 字段。 |
| `rootFilesystem` | 属性 | <code>rootFilesystem: "read_only" &#124; "writable"</code> | root Filesystem 字段。 |
| `tmpfs` | 属性 | <code>tmpfs: SandboxTmpfsSpec[]</code> | tmpfs 字段。 |
| `writablePaths` | 属性 | <code>writablePaths: string[]</code> | writable Paths 字段。 |

## `SandboxLifecyclePolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanupOnFailure` | 属性 | <code>cleanupOnFailure: boolean</code> | cleanup On Failure 字段。 |
| `cleanupOnSuccess` | 属性 | <code>cleanupOnSuccess: boolean</code> | cleanup On Success 字段。 |
| `cleanupTimeoutMs` | 属性 | <code>cleanupTimeoutMs: number</code> | cleanup Timeout Ms 字段。 |
| `createTimeoutMs` | 属性 | <code>createTimeoutMs: number</code> | create Timeout Ms 字段。 |
| `idleTtlSeconds` | 属性 | <code>idleTtlSeconds: number</code> | idle Ttl Seconds 字段。 |
| `maxExecutions` | 属性 | <code>maxExecutions: number</code> | max Executions 字段。 |
| `maxLifetimeSeconds` | 属性 | <code>maxLifetimeSeconds: number</code> | max Lifetime Seconds 字段。 |
| `retainForDebugSeconds` | 属性 | <code>retainForDebugSeconds: number</code> | retain For Debug Seconds 字段。 |
| `reuse` | 属性 | <code>reuse: "session" &#124; "run" &#124; "never" &#124; "pool"</code> | reuse 字段。 |
| `snapshotOnFailure` | 属性 | <code>snapshotOnFailure: boolean</code> | snapshot On Failure 字段。 |
| `startTimeoutMs` | 属性 | <code>startTimeoutMs: number</code> | start Timeout Ms 字段。 |
| `stopTimeoutMs` | 属性 | <code>stopTimeoutMs: number</code> | stop Timeout Ms 字段。 |

## `SandboxMountSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: "ro" &#124; "rw"</code> | mode 字段。 |
| `noDev` | 属性 | <code>noDev: boolean</code> | no Dev 字段。 |
| `noExec` | 属性 | <code>noExec: boolean</code> | no Exec 字段。 |
| `noSuid` | 属性 | <code>noSuid: boolean</code> | no Suid 字段。 |
| `propagation` | 属性 | <code>propagation: "private" &#124; "rprivate"</code> | propagation 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: string</code> | source Ref 字段。 |
| `targetPath` | 属性 | <code>targetPath: string</code> | target Path 字段。 |
| `type` | 属性 | <code>type: "artifact" &#124; "workspace" &#124; "bind" &#124; "volume" &#124; "tmpfs"</code> | type 字段。 |

## `SandboxProviderCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: boolean</code> | cancellation 字段。 |
| `cpuLimits` | 属性 | <code>cpuLimits: boolean</code> | cpu Limits 字段。 |
| `diskLimits` | 属性 | <code>diskLimits: boolean</code> | disk Limits 字段。 |
| `filesystemIsolation` | 属性 | <code>filesystemIsolation: boolean</code> | filesystem Isolation 字段。 |
| `imageDigestPinning` | 属性 | <code>imageDigestPinning: boolean</code> | image Digest Pinning 字段。 |
| `memoryLimits` | 属性 | <code>memoryLimits: boolean</code> | memory Limits 字段。 |
| `networkIsolation` | 属性 | <code>networkIsolation: boolean</code> | network Isolation 字段。 |
| `pidsLimit` | 属性 | <code>pidsLimit: boolean</code> | pids Limit 字段。 |
| `processIsolation` | 属性 | <code>processIsolation: boolean</code> | process Isolation 字段。 |
| `processTreeKill` | 属性 | <code>processTreeKill: boolean</code> | process Tree Kill 字段。 |
| `remoteExecution` | 属性 | <code>remoteExecution: boolean</code> | remote Execution 字段。 |
| `snapshots` | 属性 | <code>snapshots: boolean</code> | snapshots 字段。 |

## `SandboxRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeExecutionIds` | 属性 | <code>activeExecutionIds: string[]</code> | active Execution Ids 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `cleanedAt` | 属性 | <code>cleanedAt: string</code> | cleaned At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | environment Ref 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `error` | 属性 | <code>error: NormalizedExecutionError</code> | error 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `imageDigest` | 属性 | <code>imageDigest: string</code> | image Digest 字段。 |
| `lastUsedAt` | 属性 | <code>lastUsedAt: string</code> | last Used At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mountPolicyHash` | 属性 | <code>mountPolicyHash: string</code> | mount Policy Hash 字段。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | network Policy Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerSandboxRef` | 属性 | <code>providerSandboxRef: string</code> | provider Sandbox Ref 字段。 |
| `readyAt` | 属性 | <code>readyAt: string</code> | ready At 字段。 |
| `resourceLimits` | 属性 | <code>resourceLimits: ResourceLimitSpec</code> | resource Limits 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: SandboxStatus</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `terminatedAt` | 属性 | <code>terminatedAt: string</code> | terminated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `SandboxSecurityPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `addCapabilities` | 属性 | <code>addCapabilities: string[]</code> | add Capabilities 字段。 |
| `allowNestedContainers` | 属性 | <code>allowNestedContainers: boolean</code> | allow Nested Containers 字段。 |
| `appArmorProfileRef` | 属性 | <code>appArmorProfileRef: string</code> | app Armor Profile Ref 字段。 |
| `dropCapabilities` | 属性 | <code>dropCapabilities: string[]</code> | drop Capabilities 字段。 |
| `ipcNamespace` | 属性 | <code>ipcNamespace: boolean</code> | ipc Namespace 字段。 |
| `maskHostProc` | 属性 | <code>maskHostProc: boolean</code> | mask Host Proc 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `networkNamespace` | 属性 | <code>networkNamespace: boolean</code> | network Namespace 字段。 |
| `noNewPrivileges` | 属性 | <code>noNewPrivileges: boolean</code> | no New Privileges 字段。 |
| `nonRootRequired` | 属性 | <code>nonRootRequired: boolean</code> | non Root Required 字段。 |
| `pidNamespace` | 属性 | <code>pidNamespace: boolean</code> | pid Namespace 字段。 |
| `preventPtrace` | 属性 | <code>preventPtrace: boolean</code> | prevent Ptrace 字段。 |
| `privileged` | 属性 | <code>privileged: boolean</code> | privileged 字段。 |
| `readOnlyProc` | 属性 | <code>readOnlyProc: boolean</code> | read Only Proc 字段。 |
| `runAsGroup` | 属性 | <code>runAsGroup: string</code> | run As Group 字段。 |
| `runAsUser` | 属性 | <code>runAsUser: string</code> | run As User 字段。 |
| `seccompProfileRef` | 属性 | <code>seccompProfileRef: string</code> | seccomp Profile Ref 字段。 |
| `selinuxLabelRef` | 属性 | <code>selinuxLabelRef: string</code> | selinux Label Ref 字段。 |
| `userNamespace` | 属性 | <code>userNamespace: boolean</code> | user Namespace 字段。 |
| `utsNamespace` | 属性 | <code>utsNamespace: boolean</code> | uts Namespace 字段。 |

## `SandboxStartRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `SandboxStatusRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `SandboxTerminateRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `SandboxTmpfsSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: number</code> | mode 字段。 |
| `noDev` | 属性 | <code>noDev: boolean</code> | no Dev 字段。 |
| `noExec` | 属性 | <code>noExec: boolean</code> | no Exec 字段。 |
| `noSuid` | 属性 | <code>noSuid: boolean</code> | no Suid 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `targetPath` | 属性 | <code>targetPath: string</code> | target Path 字段。 |

## `SecretInjectionPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowChildProcessInheritance` | 属性 | <code>allowChildProcessInheritance: boolean</code> | allow Child Process Inheritance 字段。 |
| `allowedSecretRefs` | 属性 | <code>allowedSecretRefs: string[]</code> | allowed Secret Refs 字段。 |
| `exposeNamesOnly` | 属性 | <code>exposeNamesOnly: boolean</code> | expose Names Only 字段。 |
| `injectionMode` | 属性 | <code>injectionMode: "none" &#124; "environment" &#124; "file" &#124; "brokered"</code> | injection Mode 字段。 |
| `redactFromEvents` | 属性 | <code>redactFromEvents: boolean</code> | redact From Events 字段。 |
| `redactFromOutput` | 属性 | <code>redactFromOutput: boolean</code> | redact From Output 字段。 |
| `revokeOnExecutionEnd` | 属性 | <code>revokeOnExecutionEnd: boolean</code> | revoke On Execution End 字段。 |
| `ttlSeconds` | 属性 | <code>ttlSeconds: number</code> | ttl Seconds 字段。 |
