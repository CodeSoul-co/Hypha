import type { SpecMetadata, VersionedSpec } from '../specs';

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

export interface SandboxTmpfsSpec {
  targetPath: string;
  sizeBytes?: number;
  mode?: number;
  noExec?: boolean;
  noSuid?: boolean;
  noDev?: boolean;
}

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

export interface ExecutionLoggingPolicySpec {
  captureStdout: boolean;
  captureStderr: boolean;
  streamOutput?: boolean;
  includeTimestamps?: boolean;
  maxLineBytes?: number;
  redactPatterns?: string[];
  persistOutputAsArtifact?: boolean;
}

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
