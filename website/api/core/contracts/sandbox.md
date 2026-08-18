# `@codesoul-co/hypha-core` / `contracts/sandbox`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/sandbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionEnvironmentSpec` | interface | <code>interface ExecutionEnvironmentSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Execution Environment Spec; see all contract members below. |
| `ExecutionImageSpec` | interface | <code>interface ExecutionImageSpec</code> | Field contract for Execution Image Spec; see all contract members below. |
| `ExecutionLoggingPolicySpec` | interface | <code>interface ExecutionLoggingPolicySpec</code> | Field contract for Execution Logging Policy Spec; see all contract members below. |
| `NetworkPolicySpec` | interface | <code>interface NetworkPolicySpec</code> | Field contract for Network Policy Spec; see all contract members below. |
| `ProcessPolicySpec` | interface | <code>interface ProcessPolicySpec</code> | Field contract for Process Policy Spec; see all contract members below. |
| `ResourceLimitSpec` | interface | <code>interface ResourceLimitSpec</code> | Field contract for Resource Limit Spec; see all contract members below. |
| `SandboxCleanupRequest` | interface | <code>interface SandboxCleanupRequest</code> | Field contract for Sandbox Cleanup Request; see all contract members below. |
| `SandboxCreateRequest` | interface | <code>interface SandboxCreateRequest</code> | Field contract for Sandbox Create Request; see all contract members below. |
| `SandboxFilesystemPolicySpec` | interface | <code>interface SandboxFilesystemPolicySpec</code> | Field contract for Sandbox Filesystem Policy Spec; see all contract members below. |
| `SandboxLifecyclePolicySpec` | interface | <code>interface SandboxLifecyclePolicySpec</code> | Field contract for Sandbox Lifecycle Policy Spec; see all contract members below. |
| `SandboxMountSpec` | interface | <code>interface SandboxMountSpec</code> | Field contract for Sandbox Mount Spec; see all contract members below. |
| `SandboxProviderCapabilities` | interface | <code>interface SandboxProviderCapabilities</code> | Field contract for Sandbox Provider Capabilities; see all contract members below. |
| `SandboxRecord` | interface | <code>interface SandboxRecord</code> | Field contract for Sandbox Record; see all contract members below. |
| `SandboxSecurityPolicySpec` | interface | <code>interface SandboxSecurityPolicySpec</code> | Field contract for Sandbox Security Policy Spec; see all contract members below. |
| `SandboxStartRequest` | interface | <code>interface SandboxStartRequest</code> | Field contract for Sandbox Start Request; see all contract members below. |
| `SandboxStatusRequest` | interface | <code>interface SandboxStatusRequest</code> | Field contract for Sandbox Status Request; see all contract members below. |
| `SandboxTerminateRequest` | interface | <code>interface SandboxTerminateRequest</code> | Field contract for Sandbox Terminate Request; see all contract members below. |
| `SandboxTmpfsSpec` | interface | <code>interface SandboxTmpfsSpec</code> | Field contract for Sandbox Tmpfs Spec; see all contract members below. |
| `SecretInjectionPolicySpec` | interface | <code>interface SecretInjectionPolicySpec</code> | Field contract for Secret Injection Policy Spec; see all contract members below. |
| `SandboxStatus` | type | <code>type SandboxStatus = 'creating' &#124; 'created' &#124; 'starting' &#124; 'ready' &#124; 'busy' &#124; 'stopping' &#124; 'stopped' &#124; 'terminating' &#124; 'terminated' &#124; 'cleaning' &#124; 'cleaned' &#124; 'failed'</code> | Public type alias for Sandbox Status. |

## `ExecutionEnvironmentSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultTimeoutMs` | property | <code>defaultTimeoutMs: number</code> | Public default Timeout Ms property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `filesystem` | property | <code>filesystem: SandboxFilesystemPolicySpec</code> | Public filesystem property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `image` | property | <code>image: ExecutionImageSpec</code> | Public image property. |
| `lifecycle` | property | <code>lifecycle: SandboxLifecyclePolicySpec</code> | Public lifecycle property. |
| `logging` | property | <code>logging: ExecutionLoggingPolicySpec</code> | Public logging property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `network` | property | <code>network: NetworkPolicySpec</code> | Public network property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `process` | property | <code>process: ProcessPolicySpec</code> | Public process property. |
| `provider` | property | <code>provider: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public provider property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `resources` | property | <code>resources: ResourceLimitSpec</code> | Public resources property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `secrets` | property | <code>secrets: SecretInjectionPolicySpec</code> | Public secrets property. |
| `security` | property | <code>security: SandboxSecurityPolicySpec</code> | Public security property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workingDirectoryPolicy` | property | <code>workingDirectoryPolicy: "workspace_only" &#124; "configured_paths"</code> | Public working Directory Policy property. |

## `ExecutionImageSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `digest` | property | <code>digest: string</code> | Public digest property. |
| `platform` | property | <code>platform: string</code> | Public platform property. |
| `pullPolicy` | property | <code>pullPolicy: "never" &#124; "if_not_present" &#124; "always"</code> | Public pull Policy property. |
| `reference` | property | <code>reference: string</code> | Public reference property. |
| `requireDigestPin` | property | <code>requireDigestPin: boolean</code> | Public require Digest Pin property. |
| `sbomRef` | property | <code>sbomRef: string</code> | Public sbom Ref property. |
| `signaturePolicyRef` | property | <code>signaturePolicyRef: string</code> | Public signature Policy Ref property. |
| `trustedRegistryRefs` | property | <code>trustedRegistryRefs: string[]</code> | Public trusted Registry Refs property. |

## `ExecutionLoggingPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captureStderr` | property | <code>captureStderr: boolean</code> | Public capture Stderr property. |
| `captureStdout` | property | <code>captureStdout: boolean</code> | Public capture Stdout property. |
| `includeTimestamps` | property | <code>includeTimestamps: boolean</code> | Public include Timestamps property. |
| `maxLineBytes` | property | <code>maxLineBytes: number</code> | Public max Line Bytes property. |
| `persistOutputAsArtifact` | property | <code>persistOutputAsArtifact: boolean</code> | Public persist Output As Artifact property. |
| `redactPatterns` | property | <code>redactPatterns: string[]</code> | Public redact Patterns property. |
| `streamOutput` | property | <code>streamOutput: boolean</code> | Public stream Output property. |

## `NetworkPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedCidrs` | property | <code>allowedCidrs: string[]</code> | Public allowed Cidrs property. |
| `allowedDomains` | property | <code>allowedDomains: string[]</code> | Public allowed Domains property. |
| `allowedPorts` | property | <code>allowedPorts: number[]</code> | Public allowed Ports property. |
| `allowedProtocols` | property | <code>allowedProtocols: ("tcp" &#124; "udp" &#124; "http" &#124; "https" &#124; "dns")[]</code> | Public allowed Protocols property. |
| `blockMetadataEndpoints` | property | <code>blockMetadataEndpoints: boolean</code> | Public block Metadata Endpoints property. |
| `blockPrivateNetworks` | property | <code>blockPrivateNetworks: boolean</code> | Public block Private Networks property. |
| `deniedCidrs` | property | <code>deniedCidrs: string[]</code> | Public denied Cidrs property. |
| `deniedDomains` | property | <code>deniedDomains: string[]</code> | Public denied Domains property. |
| `dnsPolicy` | property | <code>dnsPolicy: "system" &#124; "managed" &#124; "disabled"</code> | Public dns Policy property. |
| `maxBytesReceived` | property | <code>maxBytesReceived: number</code> | Public max Bytes Received property. |
| `maxBytesSent` | property | <code>maxBytesSent: number</code> | Public max Bytes Sent property. |
| `maxConnections` | property | <code>maxConnections: number</code> | Public max Connections property. |
| `mode` | property | <code>mode: "disabled" &#124; "restricted" &#124; "enabled" &#124; "task_authorized"</code> | Public mode property. |
| `proxyRef` | property | <code>proxyRef: string</code> | Public proxy Ref property. |
| `resolveAndPinDns` | property | <code>resolveAndPinDns: boolean</code> | Public resolve And Pin Dns property. |
| `taskAuthorizationTtlSeconds` | property | <code>taskAuthorizationTtlSeconds: number</code> | Public task Authorization Ttl Seconds property. |

## `ProcessPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBackgroundProcesses` | property | <code>allowBackgroundProcesses: boolean</code> | Public allow Background Processes property. |
| `allowDaemonization` | property | <code>allowDaemonization: boolean</code> | Public allow Daemonization property. |
| `allowedExecutables` | property | <code>allowedExecutables: string[]</code> | Public allowed Executables property. |
| `allowedShells` | property | <code>allowedShells: string[]</code> | Public allowed Shells property. |
| `defaultUmask` | property | <code>defaultUmask: string</code> | Public default Umask property. |
| `deniedExecutables` | property | <code>deniedExecutables: string[]</code> | Public denied Executables property. |
| `environmentAllowList` | property | <code>environmentAllowList: string[]</code> | Public environment Allow List property. |
| `environmentDenyList` | property | <code>environmentDenyList: string[]</code> | Public environment Deny List property. |
| `executableResolution` | property | <code>executableResolution: "absolute_allowlist" &#124; "path_allowlist" &#124; "container_path"</code> | Public executable Resolution property. |
| `inheritHostEnvironment` | property | <code>inheritHostEnvironment: boolean</code> | Public inherit Host Environment property. |
| `killProcessTreeOnExit` | property | <code>killProcessTreeOnExit: boolean</code> | Public kill Process Tree On Exit property. |
| `locale` | property | <code>locale: string</code> | Public locale property. |
| `maxOpenFiles` | property | <code>maxOpenFiles: number</code> | Public max Open Files property. |
| `maxProcesses` | property | <code>maxProcesses: number</code> | Public max Processes property. |
| `maxThreads` | property | <code>maxThreads: number</code> | Public max Threads property. |
| `shellEnabled` | property | <code>shellEnabled: boolean</code> | Public shell Enabled property. |
| `timezone` | property | <code>timezone: string</code> | Public timezone property. |

## `ResourceLimitSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blockIoWeight` | property | <code>blockIoWeight: number</code> | Public block Io Weight property. |
| `cpuCores` | property | <code>cpuCores: number</code> | Public cpu Cores property. |
| `cpuPeriodMicros` | property | <code>cpuPeriodMicros: number</code> | Public cpu Period Micros property. |
| `cpuQuotaMicros` | property | <code>cpuQuotaMicros: number</code> | Public cpu Quota Micros property. |
| `cpuShares` | property | <code>cpuShares: number</code> | Public cpu Shares property. |
| `diskBytes` | property | <code>diskBytes: number</code> | Public disk Bytes property. |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public max Combined Output Bytes property. |
| `maxCpuSeconds` | property | <code>maxCpuSeconds: number</code> | Public max Cpu Seconds property. |
| `maxExecutionSeconds` | property | <code>maxExecutionSeconds: number</code> | Public max Execution Seconds property. |
| `maxIdleSeconds` | property | <code>maxIdleSeconds: number</code> | Public max Idle Seconds property. |
| `maxOpenFiles` | property | <code>maxOpenFiles: number</code> | Public max Open Files property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |
| `maxWriteBytes` | property | <code>maxWriteBytes: number</code> | Public max Write Bytes property. |
| `memoryMb` | property | <code>memoryMb: number</code> | Public memory Mb property. |
| `memorySwapMb` | property | <code>memorySwapMb: number</code> | Public memory Swap Mb property. |
| `oomKillDisable` | property | <code>oomKillDisable: boolean</code> | Public oom Kill Disable property. |
| `pidsLimit` | property | <code>pidsLimit: number</code> | Public pids Limit property. |
| `tempBytes` | property | <code>tempBytes: number</code> | Public temp Bytes property. |

## `SandboxCleanupRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `SandboxCreateRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public environment property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `SandboxFilesystemPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowDeviceAccess` | property | <code>allowDeviceAccess: boolean</code> | Public allow Device Access property. |
| `allowedDevices` | property | <code>allowedDevices: string[]</code> | Public allowed Devices property. |
| `allowHostPathMounts` | property | <code>allowHostPathMounts: boolean</code> | Public allow Host Path Mounts property. |
| `maskPaths` | property | <code>maskPaths: string[]</code> | Public mask Paths property. |
| `maxMounts` | property | <code>maxMounts: number</code> | Public max Mounts property. |
| `mounts` | property | <code>mounts: SandboxMountSpec[]</code> | Public mounts property. |
| `readonlyPaths` | property | <code>readonlyPaths: string[]</code> | Public readonly Paths property. |
| `rootFilesystem` | property | <code>rootFilesystem: "read_only" &#124; "writable"</code> | Public root Filesystem property. |
| `tmpfs` | property | <code>tmpfs: SandboxTmpfsSpec[]</code> | Public tmpfs property. |
| `writablePaths` | property | <code>writablePaths: string[]</code> | Public writable Paths property. |

## `SandboxLifecyclePolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanupOnFailure` | property | <code>cleanupOnFailure: boolean</code> | Public cleanup On Failure property. |
| `cleanupOnSuccess` | property | <code>cleanupOnSuccess: boolean</code> | Public cleanup On Success property. |
| `cleanupTimeoutMs` | property | <code>cleanupTimeoutMs: number</code> | Public cleanup Timeout Ms property. |
| `createTimeoutMs` | property | <code>createTimeoutMs: number</code> | Public create Timeout Ms property. |
| `idleTtlSeconds` | property | <code>idleTtlSeconds: number</code> | Public idle Ttl Seconds property. |
| `maxExecutions` | property | <code>maxExecutions: number</code> | Public max Executions property. |
| `maxLifetimeSeconds` | property | <code>maxLifetimeSeconds: number</code> | Public max Lifetime Seconds property. |
| `retainForDebugSeconds` | property | <code>retainForDebugSeconds: number</code> | Public retain For Debug Seconds property. |
| `reuse` | property | <code>reuse: "session" &#124; "run" &#124; "never" &#124; "pool"</code> | Public reuse property. |
| `snapshotOnFailure` | property | <code>snapshotOnFailure: boolean</code> | Public snapshot On Failure property. |
| `startTimeoutMs` | property | <code>startTimeoutMs: number</code> | Public start Timeout Ms property. |
| `stopTimeoutMs` | property | <code>stopTimeoutMs: number</code> | Public stop Timeout Ms property. |

## `SandboxMountSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: "ro" &#124; "rw"</code> | Public mode property. |
| `noDev` | property | <code>noDev: boolean</code> | Public no Dev property. |
| `noExec` | property | <code>noExec: boolean</code> | Public no Exec property. |
| `noSuid` | property | <code>noSuid: boolean</code> | Public no Suid property. |
| `propagation` | property | <code>propagation: "private" &#124; "rprivate"</code> | Public propagation property. |
| `sourceRef` | property | <code>sourceRef: string</code> | Public source Ref property. |
| `targetPath` | property | <code>targetPath: string</code> | Public target Path property. |
| `type` | property | <code>type: "artifact" &#124; "workspace" &#124; "bind" &#124; "volume" &#124; "tmpfs"</code> | Public type property. |

## `SandboxProviderCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: boolean</code> | Public cancellation property. |
| `cpuLimits` | property | <code>cpuLimits: boolean</code> | Public cpu Limits property. |
| `diskLimits` | property | <code>diskLimits: boolean</code> | Public disk Limits property. |
| `filesystemIsolation` | property | <code>filesystemIsolation: boolean</code> | Public filesystem Isolation property. |
| `imageDigestPinning` | property | <code>imageDigestPinning: boolean</code> | Public image Digest Pinning property. |
| `memoryLimits` | property | <code>memoryLimits: boolean</code> | Public memory Limits property. |
| `networkIsolation` | property | <code>networkIsolation: boolean</code> | Public network Isolation property. |
| `pidsLimit` | property | <code>pidsLimit: boolean</code> | Public pids Limit property. |
| `processIsolation` | property | <code>processIsolation: boolean</code> | Public process Isolation property. |
| `processTreeKill` | property | <code>processTreeKill: boolean</code> | Public process Tree Kill property. |
| `remoteExecution` | property | <code>remoteExecution: boolean</code> | Public remote Execution property. |
| `snapshots` | property | <code>snapshots: boolean</code> | Public snapshots property. |

## `SandboxRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeExecutionIds` | property | <code>activeExecutionIds: string[]</code> | Public active Execution Ids property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `cleanedAt` | property | <code>cleanedAt: string</code> | Public cleaned At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public environment Ref property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `error` | property | <code>error: NormalizedExecutionError</code> | Public error property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `imageDigest` | property | <code>imageDigest: string</code> | Public image Digest property. |
| `lastUsedAt` | property | <code>lastUsedAt: string</code> | Public last Used At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mountPolicyHash` | property | <code>mountPolicyHash: string</code> | Public mount Policy Hash property. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public network Policy Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerSandboxRef` | property | <code>providerSandboxRef: string</code> | Public provider Sandbox Ref property. |
| `readyAt` | property | <code>readyAt: string</code> | Public ready At property. |
| `resourceLimits` | property | <code>resourceLimits: ResourceLimitSpec</code> | Public resource Limits property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: SandboxStatus</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `terminatedAt` | property | <code>terminatedAt: string</code> | Public terminated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `SandboxSecurityPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `addCapabilities` | property | <code>addCapabilities: string[]</code> | Public add Capabilities property. |
| `allowNestedContainers` | property | <code>allowNestedContainers: boolean</code> | Public allow Nested Containers property. |
| `appArmorProfileRef` | property | <code>appArmorProfileRef: string</code> | Public app Armor Profile Ref property. |
| `dropCapabilities` | property | <code>dropCapabilities: string[]</code> | Public drop Capabilities property. |
| `ipcNamespace` | property | <code>ipcNamespace: boolean</code> | Public ipc Namespace property. |
| `maskHostProc` | property | <code>maskHostProc: boolean</code> | Public mask Host Proc property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `networkNamespace` | property | <code>networkNamespace: boolean</code> | Public network Namespace property. |
| `noNewPrivileges` | property | <code>noNewPrivileges: boolean</code> | Public no New Privileges property. |
| `nonRootRequired` | property | <code>nonRootRequired: boolean</code> | Public non Root Required property. |
| `pidNamespace` | property | <code>pidNamespace: boolean</code> | Public pid Namespace property. |
| `preventPtrace` | property | <code>preventPtrace: boolean</code> | Public prevent Ptrace property. |
| `privileged` | property | <code>privileged: boolean</code> | Public privileged property. |
| `readOnlyProc` | property | <code>readOnlyProc: boolean</code> | Public read Only Proc property. |
| `runAsGroup` | property | <code>runAsGroup: string</code> | Public run As Group property. |
| `runAsUser` | property | <code>runAsUser: string</code> | Public run As User property. |
| `seccompProfileRef` | property | <code>seccompProfileRef: string</code> | Public seccomp Profile Ref property. |
| `selinuxLabelRef` | property | <code>selinuxLabelRef: string</code> | Public selinux Label Ref property. |
| `userNamespace` | property | <code>userNamespace: boolean</code> | Public user Namespace property. |
| `utsNamespace` | property | <code>utsNamespace: boolean</code> | Public uts Namespace property. |

## `SandboxStartRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `SandboxStatusRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `SandboxTerminateRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `SandboxTmpfsSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: number</code> | Public mode property. |
| `noDev` | property | <code>noDev: boolean</code> | Public no Dev property. |
| `noExec` | property | <code>noExec: boolean</code> | Public no Exec property. |
| `noSuid` | property | <code>noSuid: boolean</code> | Public no Suid property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `targetPath` | property | <code>targetPath: string</code> | Public target Path property. |

## `SecretInjectionPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowChildProcessInheritance` | property | <code>allowChildProcessInheritance: boolean</code> | Public allow Child Process Inheritance property. |
| `allowedSecretRefs` | property | <code>allowedSecretRefs: string[]</code> | Public allowed Secret Refs property. |
| `exposeNamesOnly` | property | <code>exposeNamesOnly: boolean</code> | Public expose Names Only property. |
| `injectionMode` | property | <code>injectionMode: "none" &#124; "environment" &#124; "file" &#124; "brokered"</code> | Public injection Mode property. |
| `redactFromEvents` | property | <code>redactFromEvents: boolean</code> | Public redact From Events property. |
| `redactFromOutput` | property | <code>redactFromOutput: boolean</code> | Public redact From Output property. |
| `revokeOnExecutionEnd` | property | <code>revokeOnExecutionEnd: boolean</code> | Public revoke On Execution End property. |
| `ttlSeconds` | property | <code>ttlSeconds: number</code> | Public ttl Seconds property. |
