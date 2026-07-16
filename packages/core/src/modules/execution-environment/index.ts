import { z, type ZodType } from 'zod';
import type {
  ExecutionEnvironmentSpec,
  ExecutionImageSpec,
  ExecutionLoggingPolicySpec,
  NetworkPolicySpec,
  ProcessPolicySpec,
  ResourceLimitSpec,
  SandboxFilesystemPolicySpec,
  SandboxLifecyclePolicySpec,
  SandboxMountSpec,
  SandboxSecurityPolicySpec,
  SandboxTmpfsSpec,
  SecretInjectionPolicySpec,
} from '../../contracts/sandbox';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  specMetadataSchema,
  versionedSpecSchema,
} from '../../schemas';
import type { JsonSchema } from '../../specs';

const positiveNumber = z.number().positive();
const positiveInteger = z.number().int().positive();
const nonNegativeInteger = z.number().int().nonnegative();
const nonEmptyString = z.string().min(1);

const sandboxPathSchema = z
  .string()
  .min(1)
  .superRefine((value, context) => {
    const normalized = normalizePolicyPath(value);
    if (normalized.includes('\0') || normalized.split(/[\\/]+/u).includes('..')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'must not contain null or traversal segments',
      });
    }
  });

export const executionImageSpecSchema = z
  .object({
    reference: nonEmptyString,
    digest: nonEmptyString.optional(),
    platform: nonEmptyString.optional(),
    pullPolicy: z.enum(['never', 'if_not_present', 'always']).optional(),
    trustedRegistryRefs: z.array(nonEmptyString).optional(),
    requireDigestPin: z.boolean().optional(),
    sbomRef: nonEmptyString.optional(),
    signaturePolicyRef: nonEmptyString.optional(),
  })
  .superRefine((value, context) => {
    if (value.requireDigestPin && !value.digest) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['digest'],
        message: 'is required when requireDigestPin is true',
      });
    }
  }) satisfies ZodType<ExecutionImageSpec>;

export const processPolicySpecSchema = z
  .object({
    shellEnabled: z.boolean(),
    allowedShells: z.array(nonEmptyString).optional(),
    allowedExecutables: z.array(nonEmptyString).optional(),
    deniedExecutables: z.array(nonEmptyString).optional(),
    executableResolution: z.enum(['absolute_allowlist', 'path_allowlist', 'container_path']),
    maxProcesses: positiveInteger.optional(),
    maxThreads: positiveInteger.optional(),
    maxOpenFiles: positiveInteger.optional(),
    allowBackgroundProcesses: z.boolean().optional(),
    allowDaemonization: z.boolean().optional(),
    killProcessTreeOnExit: z.literal(true),
    environmentAllowList: z.array(nonEmptyString).optional(),
    environmentDenyList: z.array(nonEmptyString).optional(),
    inheritHostEnvironment: z.boolean().optional().default(false),
    defaultUmask: nonEmptyString.optional(),
    locale: nonEmptyString.optional(),
    timezone: nonEmptyString.optional(),
  })
  .superRefine((value, context) => {
    if (!value.shellEnabled && value.allowedShells?.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['allowedShells'],
        message: 'must be empty when shell execution is disabled',
      });
    }
    addOverlapIssue(
      value.allowedExecutables,
      value.deniedExecutables,
      context,
      'deniedExecutables'
    );
    addOverlapIssue(
      value.environmentAllowList,
      value.environmentDenyList,
      context,
      'environmentDenyList'
    );
  }) satisfies ZodType<ProcessPolicySpec>;

export const resourceLimitSpecSchema = z.object({
  cpuCores: positiveNumber.optional(),
  cpuQuotaMicros: positiveInteger.optional(),
  cpuPeriodMicros: positiveInteger.optional(),
  cpuShares: positiveInteger.optional(),
  maxCpuSeconds: positiveNumber.optional(),
  memoryMb: positiveNumber.optional(),
  memorySwapMb: positiveNumber.optional(),
  oomKillDisable: z.boolean().optional().default(false),
  diskBytes: positiveInteger.optional(),
  tempBytes: positiveInteger.optional(),
  maxWriteBytes: positiveInteger.optional(),
  blockIoWeight: positiveInteger.optional(),
  pidsLimit: positiveInteger.optional(),
  maxOpenFiles: positiveInteger.optional(),
  maxStdoutBytes: positiveInteger.optional(),
  maxStderrBytes: positiveInteger.optional(),
  maxCombinedOutputBytes: positiveInteger.optional(),
  maxExecutionSeconds: positiveNumber.optional(),
  maxIdleSeconds: positiveNumber.optional(),
}) satisfies ZodType<ResourceLimitSpec>;

export const sandboxMountSpecSchema = z
  .object({
    sourceRef: nonEmptyString,
    targetPath: sandboxPathSchema,
    mode: z.enum(['ro', 'rw']),
    type: z.enum(['bind', 'volume', 'artifact', 'workspace', 'tmpfs']),
    propagation: z.enum(['private', 'rprivate']).optional(),
    noExec: z.boolean().optional(),
    noSuid: z.boolean().optional(),
    noDev: z.boolean().optional(),
  })
  .superRefine((value, context) => {
    if (isDockerSocketReference(value.sourceRef) || isDockerSocketReference(value.targetPath)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sourceRef'],
        message: 'Docker socket mounts are forbidden',
      });
    }
  }) satisfies ZodType<SandboxMountSpec>;

export const sandboxTmpfsSpecSchema = z.object({
  targetPath: sandboxPathSchema,
  sizeBytes: positiveInteger.optional(),
  mode: nonNegativeInteger.optional(),
  noExec: z.boolean().optional(),
  noSuid: z.boolean().optional(),
  noDev: z.boolean().optional(),
}) satisfies ZodType<SandboxTmpfsSpec>;

export const sandboxFilesystemPolicySpecSchema = z
  .object({
    rootFilesystem: z.enum(['read_only', 'writable']),
    mounts: z.array(sandboxMountSpecSchema),
    tmpfs: z.array(sandboxTmpfsSpecSchema).optional(),
    maskPaths: z.array(sandboxPathSchema).optional(),
    readonlyPaths: z.array(sandboxPathSchema).optional(),
    writablePaths: z.array(sandboxPathSchema).optional(),
    allowDeviceAccess: z.boolean().optional(),
    allowedDevices: z.array(nonEmptyString).optional(),
    allowHostPathMounts: z.boolean().optional(),
    maxMounts: positiveInteger.optional(),
  })
  .superRefine((value, context) => {
    if (value.allowedDevices?.length && !value.allowDeviceAccess) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['allowedDevices'],
        message: 'requires allowDeviceAccess to be true',
      });
    }
    if (value.mounts.some((mount) => mount.type === 'bind') && !value.allowHostPathMounts) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['mounts'],
        message: 'bind mounts require allowHostPathMounts to be true',
      });
    }
    const totalMounts = value.mounts.length + (value.tmpfs?.length ?? 0);
    if (value.maxMounts !== undefined && totalMounts > value.maxMounts) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['maxMounts'],
        message: 'must be at least the number of declared mounts',
      });
    }
    const targets = new Set<string>();
    for (const [index, targetPath] of [
      ...value.mounts.map((mount) => mount.targetPath),
      ...(value.tmpfs ?? []).map((entry) => entry.targetPath),
    ].entries()) {
      const normalized = normalizePolicyPath(targetPath).toLowerCase();
      if (targets.has(normalized)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['mounts', index, 'targetPath'],
          message: 'mount target paths must be unique',
        });
      }
      targets.add(normalized);
    }
  }) satisfies ZodType<SandboxFilesystemPolicySpec>;

export const networkPolicySpecSchema = z
  .object({
    mode: z.enum(['disabled', 'restricted', 'enabled', 'task_authorized']),
    allowedDomains: z.array(nonEmptyString).optional(),
    deniedDomains: z.array(nonEmptyString).optional(),
    allowedCidrs: z.array(nonEmptyString).optional(),
    deniedCidrs: z.array(nonEmptyString).optional(),
    allowedPorts: z.array(z.number().int().min(1).max(65_535)).optional(),
    allowedProtocols: z.array(z.enum(['tcp', 'udp', 'http', 'https', 'dns'])).optional(),
    dnsPolicy: z.enum(['disabled', 'system', 'managed']).optional(),
    proxyRef: nonEmptyString.optional(),
    blockPrivateNetworks: z.boolean().optional(),
    blockMetadataEndpoints: z.boolean().optional(),
    resolveAndPinDns: z.boolean().optional(),
    taskAuthorizationTtlSeconds: positiveInteger.optional(),
    maxConnections: positiveInteger.optional(),
    maxBytesSent: positiveInteger.optional(),
    maxBytesReceived: positiveInteger.optional(),
  })
  .superRefine((value, context) => {
    addOverlapIssue(value.allowedDomains, value.deniedDomains, context, 'deniedDomains');
    addOverlapIssue(value.allowedCidrs, value.deniedCidrs, context, 'deniedCidrs');
    if (value.mode === 'disabled') {
      const accessDeclared = Boolean(
        value.allowedDomains?.length ||
        value.allowedCidrs?.length ||
        value.allowedPorts?.length ||
        value.allowedProtocols?.length ||
        value.proxyRef
      );
      if (accessDeclared || (value.dnsPolicy && value.dnsPolicy !== 'disabled')) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['mode'],
          message: 'disabled networking cannot declare access or DNS',
        });
      }
    }
    if (value.mode === 'task_authorized' && !value.taskAuthorizationTtlSeconds) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['taskAuthorizationTtlSeconds'],
        message: 'is required for task_authorized networking',
      });
    }
  }) satisfies ZodType<NetworkPolicySpec>;

export const sandboxSecurityPolicySpecSchema = z
  .object({
    runAsUser: nonEmptyString.optional(),
    runAsGroup: nonEmptyString.optional(),
    nonRootRequired: z.literal(true),
    noNewPrivileges: z.literal(true),
    privileged: z.literal(false),
    dropCapabilities: z.array(nonEmptyString).optional(),
    addCapabilities: z.array(nonEmptyString).optional(),
    seccompProfileRef: nonEmptyString.optional(),
    appArmorProfileRef: nonEmptyString.optional(),
    selinuxLabelRef: nonEmptyString.optional(),
    userNamespace: z.boolean().optional(),
    pidNamespace: z.boolean().optional(),
    networkNamespace: z.boolean().optional(),
    ipcNamespace: z.boolean().optional(),
    utsNamespace: z.boolean().optional(),
    readOnlyProc: z.boolean().optional(),
    maskHostProc: z.boolean().optional(),
    preventPtrace: z.boolean().optional(),
    allowNestedContainers: z.boolean().optional().default(false),
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    addOverlapIssue(value.dropCapabilities, value.addCapabilities, context, 'addCapabilities');
  }) satisfies ZodType<SandboxSecurityPolicySpec>;

export const secretInjectionPolicySpecSchema = z
  .object({
    allowedSecretRefs: z.array(nonEmptyString).optional(),
    injectionMode: z.enum(['none', 'environment', 'file', 'brokered']),
    exposeNamesOnly: z.boolean().optional(),
    redactFromOutput: z.literal(true),
    redactFromEvents: z.literal(true),
    ttlSeconds: positiveInteger.optional(),
    revokeOnExecutionEnd: z.boolean().optional(),
    allowChildProcessInheritance: z.boolean().optional(),
  })
  .superRefine((value, context) => {
    if (value.injectionMode === 'none' && value.allowedSecretRefs?.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['allowedSecretRefs'],
        message: 'must be empty when Secret injection is disabled',
      });
    }
    if (value.injectionMode !== 'none' && !value.ttlSeconds) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ttlSeconds'],
        message: 'is required when injecting Secrets',
      });
    }
  }) satisfies ZodType<SecretInjectionPolicySpec>;

export const executionLoggingPolicySpecSchema = z.object({
  captureStdout: z.boolean(),
  captureStderr: z.boolean(),
  streamOutput: z.boolean().optional(),
  includeTimestamps: z.boolean().optional(),
  maxLineBytes: positiveInteger.optional(),
  redactPatterns: z.array(nonEmptyString).optional(),
  persistOutputAsArtifact: z.boolean().optional(),
}) satisfies ZodType<ExecutionLoggingPolicySpec>;

export const sandboxLifecyclePolicySpecSchema = z.object({
  reuse: z.enum(['never', 'run', 'session', 'pool']),
  idleTtlSeconds: positiveInteger.optional(),
  maxLifetimeSeconds: positiveInteger.optional(),
  maxExecutions: positiveInteger.optional(),
  createTimeoutMs: positiveInteger.optional(),
  startTimeoutMs: positiveInteger.optional(),
  stopTimeoutMs: positiveInteger.optional(),
  cleanupTimeoutMs: positiveInteger.optional(),
  snapshotOnFailure: z.boolean().optional(),
  cleanupOnSuccess: z.boolean().optional(),
  cleanupOnFailure: z.boolean().optional(),
  retainForDebugSeconds: nonNegativeInteger.optional(),
}) satisfies ZodType<SandboxLifecyclePolicySpec>;

export const executionEnvironmentSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    revision: nonEmptyString.optional(),
    provider: z.enum(['mock', 'local_process', 'docker', 'remote_sandbox', 'custom']),
    providerRef: nonEmptyString.optional(),
    image: executionImageSpecSchema.optional(),
    process: processPolicySpecSchema,
    resources: resourceLimitSpecSchema,
    filesystem: sandboxFilesystemPolicySpecSchema,
    network: networkPolicySpecSchema,
    security: sandboxSecurityPolicySpecSchema,
    secrets: secretInjectionPolicySpecSchema,
    logging: executionLoggingPolicySpecSchema,
    lifecycle: sandboxLifecyclePolicySpecSchema,
    workingDirectoryPolicy: z.enum(['workspace_only', 'configured_paths']),
    defaultTimeoutMs: positiveInteger,
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    if (value.provider === 'docker') {
      if (!value.image) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['image'],
          message: 'is required for Docker environments',
        });
      } else {
        if (!value.image.digest) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['image', 'digest'],
            message: 'is required for Docker environments',
          });
        }
        if (value.image.requireDigestPin !== true) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['image', 'requireDigestPin'],
            message: 'must be true for Docker environments',
          });
        }
      }
      if (value.filesystem.rootFilesystem !== 'read_only') {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['filesystem', 'rootFilesystem'],
          message: 'must be read_only for Docker environments',
        });
      }
      if (!value.filesystem.mounts.some((mount) => mount.type === 'workspace')) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['filesystem', 'mounts'],
          message: 'must include an explicit Workspace mount for Docker environments',
        });
      }
      if (
        !value.resources.cpuCores &&
        !value.resources.cpuQuotaMicros &&
        !value.resources.maxCpuSeconds
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['resources'],
          message: 'must include a CPU limit for Docker environments',
        });
      }
      if (!value.resources.memoryMb || !value.resources.pidsLimit) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['resources'],
          message: 'must include memory and PID limits for Docker environments',
        });
      }
      if (
        !value.resources.maxCombinedOutputBytes &&
        !(value.resources.maxStdoutBytes && value.resources.maxStderrBytes)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['resources'],
          message: 'must include output limits for Docker environments',
        });
      }
      if (!value.security.dropCapabilities?.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['security', 'dropCapabilities'],
          message: 'is required for Docker environments',
        });
      }
      if (value.security.allowNestedContainers) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['security', 'allowNestedContainers'],
          message: 'must be false for Docker environments',
        });
      }
      if (value.process.inheritHostEnvironment) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['process', 'inheritHostEnvironment'],
          message: 'must be false for Docker environments',
        });
      }
    }
    if (value.provider === 'local_process' && value.process.inheritHostEnvironment) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['process', 'inheritHostEnvironment'],
        message: 'must be false for Local Process environments',
      });
    }
  }) satisfies ZodType<ExecutionEnvironmentSpec>;

const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const positiveNumberJsonSchema: JsonSchema = { type: 'number', exclusiveMinimum: 0 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const stringArrayJsonSchema: JsonSchema = {
  type: 'array',
  items: { type: 'string', minLength: 1 },
};
const sandboxPathJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  description: 'Sandbox-internal path without null or traversal segments.',
};

const executionImageJsonSchema: JsonSchema = {
  type: 'object',
  required: ['reference'],
  properties: {
    reference: { type: 'string', minLength: 1 },
    digest: { type: 'string', minLength: 1 },
    platform: { type: 'string', minLength: 1 },
    pullPolicy: { enum: ['never', 'if_not_present', 'always'] },
    trustedRegistryRefs: stringArrayJsonSchema,
    requireDigestPin: { type: 'boolean' },
    sbomRef: { type: 'string', minLength: 1 },
    signaturePolicyRef: { type: 'string', minLength: 1 },
  },
  allOf: [
    {
      if: { properties: { requireDigestPin: { const: true } }, required: ['requireDigestPin'] },
      then: { required: ['digest'] },
    },
  ],
  additionalProperties: false,
};

const processPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['shellEnabled', 'executableResolution', 'killProcessTreeOnExit'],
  properties: {
    shellEnabled: { type: 'boolean' },
    allowedShells: stringArrayJsonSchema,
    allowedExecutables: stringArrayJsonSchema,
    deniedExecutables: stringArrayJsonSchema,
    executableResolution: { enum: ['absolute_allowlist', 'path_allowlist', 'container_path'] },
    maxProcesses: positiveIntegerJsonSchema,
    maxThreads: positiveIntegerJsonSchema,
    maxOpenFiles: positiveIntegerJsonSchema,
    allowBackgroundProcesses: { type: 'boolean' },
    allowDaemonization: { type: 'boolean' },
    killProcessTreeOnExit: { const: true },
    environmentAllowList: stringArrayJsonSchema,
    environmentDenyList: stringArrayJsonSchema,
    inheritHostEnvironment: { type: 'boolean', default: false },
    defaultUmask: { type: 'string', minLength: 1 },
    locale: { type: 'string', minLength: 1 },
    timezone: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

const resourceLimitJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    cpuCores: positiveNumberJsonSchema,
    cpuQuotaMicros: positiveIntegerJsonSchema,
    cpuPeriodMicros: positiveIntegerJsonSchema,
    cpuShares: positiveIntegerJsonSchema,
    maxCpuSeconds: positiveNumberJsonSchema,
    memoryMb: positiveNumberJsonSchema,
    memorySwapMb: positiveNumberJsonSchema,
    oomKillDisable: { type: 'boolean', default: false },
    diskBytes: positiveIntegerJsonSchema,
    tempBytes: positiveIntegerJsonSchema,
    maxWriteBytes: positiveIntegerJsonSchema,
    blockIoWeight: positiveIntegerJsonSchema,
    pidsLimit: positiveIntegerJsonSchema,
    maxOpenFiles: positiveIntegerJsonSchema,
    maxStdoutBytes: positiveIntegerJsonSchema,
    maxStderrBytes: positiveIntegerJsonSchema,
    maxCombinedOutputBytes: positiveIntegerJsonSchema,
    maxExecutionSeconds: positiveNumberJsonSchema,
    maxIdleSeconds: positiveNumberJsonSchema,
  },
  additionalProperties: false,
};

const mountJsonSchema: JsonSchema = {
  type: 'object',
  required: ['sourceRef', 'targetPath', 'mode', 'type'],
  properties: {
    sourceRef: { type: 'string', minLength: 1 },
    targetPath: sandboxPathJsonSchema,
    mode: { enum: ['ro', 'rw'] },
    type: { enum: ['bind', 'volume', 'artifact', 'workspace', 'tmpfs'] },
    propagation: { enum: ['private', 'rprivate'] },
    noExec: { type: 'boolean' },
    noSuid: { type: 'boolean' },
    noDev: { type: 'boolean' },
  },
  additionalProperties: false,
};

const tmpfsJsonSchema: JsonSchema = {
  type: 'object',
  required: ['targetPath'],
  properties: {
    targetPath: sandboxPathJsonSchema,
    sizeBytes: positiveIntegerJsonSchema,
    mode: nonNegativeIntegerJsonSchema,
    noExec: { type: 'boolean' },
    noSuid: { type: 'boolean' },
    noDev: { type: 'boolean' },
  },
  additionalProperties: false,
};

const filesystemPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['rootFilesystem', 'mounts'],
  properties: {
    rootFilesystem: { enum: ['read_only', 'writable'] },
    mounts: { type: 'array', items: mountJsonSchema },
    tmpfs: { type: 'array', items: tmpfsJsonSchema },
    maskPaths: { type: 'array', items: sandboxPathJsonSchema },
    readonlyPaths: { type: 'array', items: sandboxPathJsonSchema },
    writablePaths: { type: 'array', items: sandboxPathJsonSchema },
    allowDeviceAccess: { type: 'boolean' },
    allowedDevices: stringArrayJsonSchema,
    allowHostPathMounts: { type: 'boolean' },
    maxMounts: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

const networkPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['mode'],
  properties: {
    mode: { enum: ['disabled', 'restricted', 'enabled', 'task_authorized'] },
    allowedDomains: stringArrayJsonSchema,
    deniedDomains: stringArrayJsonSchema,
    allowedCidrs: stringArrayJsonSchema,
    deniedCidrs: stringArrayJsonSchema,
    allowedPorts: {
      type: 'array',
      items: { type: 'integer', minimum: 1, maximum: 65_535 },
    },
    allowedProtocols: {
      type: 'array',
      items: { enum: ['tcp', 'udp', 'http', 'https', 'dns'] },
    },
    dnsPolicy: { enum: ['disabled', 'system', 'managed'] },
    proxyRef: { type: 'string', minLength: 1 },
    blockPrivateNetworks: { type: 'boolean' },
    blockMetadataEndpoints: { type: 'boolean' },
    resolveAndPinDns: { type: 'boolean' },
    taskAuthorizationTtlSeconds: positiveIntegerJsonSchema,
    maxConnections: positiveIntegerJsonSchema,
    maxBytesSent: positiveIntegerJsonSchema,
    maxBytesReceived: positiveIntegerJsonSchema,
  },
  allOf: [
    {
      if: { properties: { mode: { const: 'task_authorized' } }, required: ['mode'] },
      then: { required: ['taskAuthorizationTtlSeconds'] },
    },
  ],
  additionalProperties: false,
};

const securityPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['nonRootRequired', 'noNewPrivileges', 'privileged'],
  properties: {
    runAsUser: { type: 'string', minLength: 1 },
    runAsGroup: { type: 'string', minLength: 1 },
    nonRootRequired: { const: true },
    noNewPrivileges: { const: true },
    privileged: { const: false },
    dropCapabilities: stringArrayJsonSchema,
    addCapabilities: stringArrayJsonSchema,
    seccompProfileRef: { type: 'string', minLength: 1 },
    appArmorProfileRef: { type: 'string', minLength: 1 },
    selinuxLabelRef: { type: 'string', minLength: 1 },
    userNamespace: { type: 'boolean' },
    pidNamespace: { type: 'boolean' },
    networkNamespace: { type: 'boolean' },
    ipcNamespace: { type: 'boolean' },
    utsNamespace: { type: 'boolean' },
    readOnlyProc: { type: 'boolean' },
    maskHostProc: { type: 'boolean' },
    preventPtrace: { type: 'boolean' },
    allowNestedContainers: { type: 'boolean', default: false },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

const secretPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['injectionMode', 'redactFromOutput', 'redactFromEvents'],
  properties: {
    allowedSecretRefs: stringArrayJsonSchema,
    injectionMode: { enum: ['none', 'environment', 'file', 'brokered'] },
    exposeNamesOnly: { type: 'boolean' },
    redactFromOutput: { const: true },
    redactFromEvents: { const: true },
    ttlSeconds: positiveIntegerJsonSchema,
    revokeOnExecutionEnd: { type: 'boolean' },
    allowChildProcessInheritance: { type: 'boolean' },
  },
  allOf: [
    {
      if: {
        not: { properties: { injectionMode: { const: 'none' } }, required: ['injectionMode'] },
      },
      then: { required: ['ttlSeconds'] },
    },
  ],
  additionalProperties: false,
};

const loggingPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['captureStdout', 'captureStderr'],
  properties: {
    captureStdout: { type: 'boolean' },
    captureStderr: { type: 'boolean' },
    streamOutput: { type: 'boolean' },
    includeTimestamps: { type: 'boolean' },
    maxLineBytes: positiveIntegerJsonSchema,
    redactPatterns: stringArrayJsonSchema,
    persistOutputAsArtifact: { type: 'boolean' },
  },
  additionalProperties: false,
};

const lifecyclePolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['reuse'],
  properties: {
    reuse: { enum: ['never', 'run', 'session', 'pool'] },
    idleTtlSeconds: positiveIntegerJsonSchema,
    maxLifetimeSeconds: positiveIntegerJsonSchema,
    maxExecutions: positiveIntegerJsonSchema,
    createTimeoutMs: positiveIntegerJsonSchema,
    startTimeoutMs: positiveIntegerJsonSchema,
    stopTimeoutMs: positiveIntegerJsonSchema,
    cleanupTimeoutMs: positiveIntegerJsonSchema,
    snapshotOnFailure: { type: 'boolean' },
    cleanupOnSuccess: { type: 'boolean' },
    cleanupOnFailure: { type: 'boolean' },
    retainForDebugSeconds: nonNegativeIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const executionEnvironmentSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'provider',
    'process',
    'resources',
    'filesystem',
    'network',
    'security',
    'secrets',
    'logging',
    'lifecycle',
    'workingDirectoryPolicy',
    'defaultTimeoutMs',
  ],
  properties: {
    id: { type: 'string', minLength: 1 },
    version: { type: 'string', minLength: 1 },
    revision: { type: 'string', minLength: 1 },
    name: { type: 'string' },
    description: { type: 'string' },
    owner: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    provider: { enum: ['mock', 'local_process', 'docker', 'remote_sandbox', 'custom'] },
    providerRef: { type: 'string', minLength: 1 },
    image: executionImageJsonSchema,
    process: processPolicyJsonSchema,
    resources: resourceLimitJsonSchema,
    filesystem: filesystemPolicyJsonSchema,
    network: networkPolicyJsonSchema,
    security: securityPolicyJsonSchema,
    secrets: secretPolicyJsonSchema,
    logging: loggingPolicyJsonSchema,
    lifecycle: lifecyclePolicyJsonSchema,
    workingDirectoryPolicy: { enum: ['workspace_only', 'configured_paths'] },
    defaultTimeoutMs: positiveIntegerJsonSchema,
    metadata: { type: 'object' },
  },
  allOf: [
    {
      if: { properties: { provider: { const: 'docker' } }, required: ['provider'] },
      then: {
        required: ['image'],
        properties: {
          image: {
            required: ['digest', 'requireDigestPin'],
            properties: { requireDigestPin: { const: true } },
          },
          filesystem: {
            properties: {
              rootFilesystem: { const: 'read_only' },
              mounts: {
                contains: {
                  properties: { type: { const: 'workspace' } },
                  required: ['type'],
                },
              },
            },
          },
          process: {
            properties: { inheritHostEnvironment: { const: false } },
          },
          resources: {
            required: ['memoryMb', 'pidsLimit'],
            allOf: [
              {
                anyOf: [
                  { required: ['cpuCores'] },
                  { required: ['cpuQuotaMicros'] },
                  { required: ['maxCpuSeconds'] },
                ],
              },
              {
                anyOf: [
                  { required: ['maxCombinedOutputBytes'] },
                  { required: ['maxStdoutBytes', 'maxStderrBytes'] },
                ],
              },
            ],
          },
          security: {
            required: ['dropCapabilities'],
            properties: {
              dropCapabilities: { type: 'array', minItems: 1 },
              allowNestedContainers: { const: false },
            },
          },
        },
      },
    },
    {
      if: { properties: { provider: { const: 'local_process' } }, required: ['provider'] },
      then: {
        properties: {
          process: { properties: { inheritHostEnvironment: { const: false } } },
        },
      },
    },
  ],
  additionalProperties: false,
};

export const executionEnvironmentSpecExample: ExecutionEnvironmentSpec = {
  id: 'execution-environment.docker-safe',
  version: '0.1.0',
  name: 'Safe Docker execution environment',
  provider: 'docker',
  image: {
    reference: 'registry.example.invalid/hypha/execution',
    digest: 'sha256:example-pinned-digest',
    pullPolicy: 'if_not_present',
    requireDigestPin: true,
  },
  process: {
    shellEnabled: false,
    allowedExecutables: ['node', 'npm'],
    executableResolution: 'container_path',
    maxProcesses: 64,
    maxThreads: 128,
    maxOpenFiles: 256,
    allowBackgroundProcesses: false,
    allowDaemonization: false,
    killProcessTreeOnExit: true,
    environmentAllowList: ['PATH', 'LANG'],
    inheritHostEnvironment: false,
  },
  resources: {
    cpuCores: 2,
    memoryMb: 1_024,
    diskBytes: 2 * 1024 * 1024 * 1024,
    pidsLimit: 128,
    maxStdoutBytes: 4 * 1024 * 1024,
    maxStderrBytes: 4 * 1024 * 1024,
    maxCombinedOutputBytes: 8 * 1024 * 1024,
    maxExecutionSeconds: 300,
    maxIdleSeconds: 60,
    oomKillDisable: false,
  },
  filesystem: {
    rootFilesystem: 'read_only',
    mounts: [
      {
        sourceRef: 'workspace:current',
        targetPath: '/workspace',
        mode: 'rw',
        type: 'workspace',
        propagation: 'private',
        noSuid: true,
        noDev: true,
      },
    ],
    tmpfs: [{ targetPath: '/tmp', sizeBytes: 64 * 1024 * 1024, noSuid: true, noDev: true }],
    allowDeviceAccess: false,
    allowHostPathMounts: false,
    maxMounts: 4,
  },
  network: {
    mode: 'disabled',
    dnsPolicy: 'disabled',
    blockPrivateNetworks: true,
    blockMetadataEndpoints: true,
  },
  security: {
    runAsUser: '65532',
    runAsGroup: '65532',
    nonRootRequired: true,
    noNewPrivileges: true,
    privileged: false,
    dropCapabilities: ['ALL'],
    readOnlyProc: true,
    maskHostProc: true,
    preventPtrace: true,
    allowNestedContainers: false,
  },
  secrets: {
    injectionMode: 'none',
    exposeNamesOnly: true,
    redactFromOutput: true,
    redactFromEvents: true,
    revokeOnExecutionEnd: true,
    allowChildProcessInheritance: false,
  },
  logging: {
    captureStdout: true,
    captureStderr: true,
    streamOutput: true,
    includeTimestamps: true,
    maxLineBytes: 64 * 1024,
    persistOutputAsArtifact: true,
  },
  lifecycle: {
    reuse: 'never',
    createTimeoutMs: 30_000,
    startTimeoutMs: 30_000,
    stopTimeoutMs: 10_000,
    cleanupTimeoutMs: 30_000,
    snapshotOnFailure: true,
    cleanupOnSuccess: true,
    cleanupOnFailure: true,
  },
  workingDirectoryPolicy: 'workspace_only',
  defaultTimeoutMs: 300_000,
};

export const executionEnvironmentSpecDefinition = defineSpecSchema<ExecutionEnvironmentSpec>({
  id: 'ExecutionEnvironmentSpec',
  zod: executionEnvironmentSpecSchema,
  jsonSchema: executionEnvironmentSpecJsonSchema,
  example: executionEnvironmentSpecExample,
});

export const executionEnvironmentSpecDefinitions = [executionEnvironmentSpecDefinition] as const;
export const executionEnvironmentSpecJsonSchemas = exportSpecJsonSchemas(
  executionEnvironmentSpecDefinitions
);

export function validateExecutionEnvironmentSpec(input: unknown): ExecutionEnvironmentSpec {
  return executionEnvironmentSpecDefinition.parse(input);
}

function addOverlapIssue(
  allowed: string[] | undefined,
  denied: string[] | undefined,
  context: z.RefinementCtx,
  path: string
): void {
  const allowedSet = new Set((allowed ?? []).map(normalizeListValue));
  const overlap = (denied ?? []).map(normalizeListValue).find((value) => allowedSet.has(value));
  if (overlap) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [path],
      message: `${overlap} cannot be both allowed and denied`,
    });
  }
}

function normalizeListValue(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePolicyPath(value: string): string {
  let normalized = value.normalize('NFKC');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) break;
      normalized = decoded.normalize('NFKC');
    } catch {
      break;
    }
  }
  return normalized;
}

function isDockerSocketReference(value: string): boolean {
  return normalizePolicyPath(value).replace(/\\/gu, '/').toLowerCase().includes('docker.sock');
}
