import { z, type ZodType } from 'zod';
import type {
  SandboxCapabilityDerivationInput,
  SandboxCapabilityName,
  SandboxCapabilityNegotiationRequest,
  SandboxCapabilityNegotiationResult,
  SandboxCapabilityRequirement,
} from '../../contracts/sandbox-provider';
import type { ExecutionEnvironmentSpec, ResourceLimitSpec } from '../../contracts/sandbox';
import type { JsonSchema } from '../../specs';
import {
  executionEnvironmentSpecJsonSchema,
  executionEnvironmentSpecSchema,
} from '../execution-environment';
import {
  sandboxProviderCapabilitiesJsonSchema,
  sandboxProviderCapabilitiesSchema,
} from '../sandbox';

export * from './registry';

export const sandboxCapabilityNames = [
  'processIsolation',
  'filesystemIsolation',
  'networkIsolation',
  'cpuLimits',
  'memoryLimits',
  'diskLimits',
  'pidsLimit',
  'cancellation',
  'processTreeKill',
  'snapshots',
  'imageDigestPinning',
  'remoteExecution',
] as const satisfies readonly SandboxCapabilityName[];

export const sandboxCapabilityNameSchema = z.enum(sandboxCapabilityNames);

export const sandboxCapabilityRequirementSchema = z
  .object({
    capability: sandboxCapabilityNameSchema,
    source: z.enum(['environment', 'command', 'policy', 'runtime']),
    reason: z.string().min(1),
  })
  .strict() satisfies ZodType<SandboxCapabilityRequirement>;

export const sandboxCapabilityNegotiationRequestSchema = z
  .object({
    providerId: z.string().min(1),
    capabilities: sandboxProviderCapabilitiesSchema,
    requirements: z.array(sandboxCapabilityRequirementSchema),
    evaluatedAt: z.string().datetime({ offset: true }),
  })
  .strict() satisfies ZodType<SandboxCapabilityNegotiationRequest>;

export const sandboxCapabilityNegotiationResultSchema = z
  .object({
    providerId: z.string().min(1),
    compatible: z.boolean(),
    capabilities: sandboxProviderCapabilitiesSchema,
    requirements: z.array(sandboxCapabilityRequirementSchema),
    missingCapabilities: z.array(sandboxCapabilityNameSchema),
    evaluatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .superRefine((value, context) => {
    const expectedMissing = uniqueCapabilities(
      value.requirements
        .filter((requirement) => !value.capabilities[requirement.capability])
        .map((requirement) => requirement.capability)
    );
    if (!sameCapabilities(value.missingCapabilities, expectedMissing)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['missingCapabilities'],
        message: 'must exactly match unmet requirements',
      });
    }
    if (value.compatible !== (expectedMissing.length === 0)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['compatible'],
        message: 'must be false when required capabilities are missing',
      });
    }
  }) satisfies ZodType<SandboxCapabilityNegotiationResult>;

const commandCapabilityRequirementSchema = z
  .object({
    snapshotBefore: z.boolean().optional(),
    snapshotAfter: z.boolean().optional(),
    snapshotOnFailure: z.boolean().optional(),
  })
  .strict();

export const sandboxCapabilityDerivationInputSchema = z
  .object({
    environment: executionEnvironmentSpecSchema,
    command: commandCapabilityRequirementSchema.optional(),
    additionalRequirements: z.array(sandboxCapabilityRequirementSchema).optional(),
  })
  .strict() satisfies ZodType<SandboxCapabilityDerivationInput>;

const capabilityNameJsonSchema: JsonSchema = { enum: [...sandboxCapabilityNames] };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const sandboxCapabilityRequirementJsonSchema: JsonSchema = {
  type: 'object',
  required: ['capability', 'source', 'reason'],
  properties: {
    capability: capabilityNameJsonSchema,
    source: { enum: ['environment', 'command', 'policy', 'runtime'] },
    reason: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

export const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['providerId', 'capabilities', 'requirements', 'evaluatedAt'],
  properties: {
    providerId: { type: 'string', minLength: 1 },
    capabilities: sandboxProviderCapabilitiesJsonSchema,
    requirements: { type: 'array', items: sandboxCapabilityRequirementJsonSchema },
    evaluatedAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'providerId',
    'compatible',
    'capabilities',
    'requirements',
    'missingCapabilities',
    'evaluatedAt',
  ],
  properties: {
    providerId: { type: 'string', minLength: 1 },
    compatible: { type: 'boolean' },
    capabilities: sandboxProviderCapabilitiesJsonSchema,
    requirements: { type: 'array', items: sandboxCapabilityRequirementJsonSchema },
    missingCapabilities: {
      type: 'array',
      items: capabilityNameJsonSchema,
      uniqueItems: true,
    },
    evaluatedAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const sandboxCapabilityDerivationInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['environment'],
  properties: {
    environment: executionEnvironmentSpecJsonSchema,
    command: {
      type: 'object',
      properties: {
        snapshotBefore: { type: 'boolean' },
        snapshotAfter: { type: 'boolean' },
        snapshotOnFailure: { type: 'boolean' },
      },
      additionalProperties: false,
    },
    additionalRequirements: {
      type: 'array',
      items: sandboxCapabilityRequirementJsonSchema,
    },
  },
  additionalProperties: false,
};

export const sandboxProviderContractJsonSchemas: Record<string, JsonSchema> = {
  SandboxCapabilityRequirement: sandboxCapabilityRequirementJsonSchema,
  SandboxCapabilityNegotiationRequest: sandboxCapabilityNegotiationRequestJsonSchema,
  SandboxCapabilityNegotiationResult: sandboxCapabilityNegotiationResultJsonSchema,
  SandboxCapabilityDerivationInput: sandboxCapabilityDerivationInputJsonSchema,
};

export const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest = {
  providerId: 'provider.docker.example',
  capabilities: {
    processIsolation: true,
    filesystemIsolation: true,
    networkIsolation: true,
    cpuLimits: true,
    memoryLimits: true,
    diskLimits: true,
    pidsLimit: true,
    cancellation: true,
    processTreeKill: true,
    snapshots: false,
    imageDigestPinning: true,
    remoteExecution: false,
  },
  requirements: [
    {
      capability: 'processIsolation',
      source: 'environment',
      reason: 'Docker execution requires process isolation',
    },
    {
      capability: 'snapshots',
      source: 'command',
      reason: 'Command requests a Workspace snapshot',
    },
  ],
  evaluatedAt: '2026-07-16T00:00:00.000Z',
};

export const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult = {
  ...sandboxCapabilityNegotiationRequestExample,
  compatible: false,
  missingCapabilities: ['snapshots'],
};

export function deriveSandboxCapabilityRequirements(
  input: SandboxCapabilityDerivationInput
): SandboxCapabilityRequirement[] {
  const parsed = sandboxCapabilityDerivationInputSchema.parse(input);
  const requirements = new Map<SandboxCapabilityName, SandboxCapabilityRequirement>();
  const add = (
    capability: SandboxCapabilityName,
    source: SandboxCapabilityRequirement['source'],
    reason: string
  ): void => {
    if (!requirements.has(capability)) {
      requirements.set(capability, { capability, source, reason });
    }
  };

  const environment = parsed.environment;
  if (environment.provider !== 'mock') {
    deriveEnvironmentRequirements(environment, add);
    add('cancellation', 'runtime', 'Executable commands must support cancellation');
    add('processTreeKill', 'runtime', 'Cancellation and timeout must terminate the process tree');
  }

  if (
    parsed.command?.snapshotBefore ||
    parsed.command?.snapshotAfter ||
    parsed.command?.snapshotOnFailure ||
    environment.lifecycle.snapshotOnFailure
  ) {
    add('snapshots', 'command', 'Command or lifecycle policy requests a Workspace snapshot');
  }

  for (const requirement of parsed.additionalRequirements ?? []) {
    add(requirement.capability, requirement.source, requirement.reason);
  }

  return [...requirements.values()];
}

export function negotiateSandboxCapabilities(
  request: SandboxCapabilityNegotiationRequest
): SandboxCapabilityNegotiationResult {
  const parsed = sandboxCapabilityNegotiationRequestSchema.parse(request);
  const missingCapabilities = uniqueCapabilities(
    parsed.requirements
      .filter((requirement) => !parsed.capabilities[requirement.capability])
      .map((requirement) => requirement.capability)
  );
  return sandboxCapabilityNegotiationResultSchema.parse({
    ...parsed,
    compatible: missingCapabilities.length === 0,
    missingCapabilities,
  });
}

export function validateSandboxCapabilityNegotiationRequest(
  input: unknown
): SandboxCapabilityNegotiationRequest {
  return sandboxCapabilityNegotiationRequestSchema.parse(input);
}

export function validateSandboxCapabilityNegotiationResult(
  input: unknown
): SandboxCapabilityNegotiationResult {
  return sandboxCapabilityNegotiationResultSchema.parse(input);
}

function deriveEnvironmentRequirements(
  environment: ExecutionEnvironmentSpec,
  add: (
    capability: SandboxCapabilityName,
    source: SandboxCapabilityRequirement['source'],
    reason: string
  ) => void
): void {
  if (environment.provider === 'docker' || environment.provider === 'remote_sandbox') {
    add('processIsolation', 'environment', `${environment.provider} requires process isolation`);
    add(
      'filesystemIsolation',
      'environment',
      `${environment.provider} requires filesystem isolation`
    );
  }
  if (environment.provider === 'remote_sandbox') {
    add('remoteExecution', 'environment', 'Environment selects a remote Sandbox Provider');
  }
  if (environment.network.mode !== 'enabled') {
    add(
      'networkIsolation',
      'environment',
      `Network mode ${environment.network.mode} requires enforceable isolation`
    );
  }
  if (requiresFilesystemIsolation(environment)) {
    add(
      'filesystemIsolation',
      'environment',
      'Filesystem policy requires enforceable mount or path isolation'
    );
  }
  deriveResourceRequirements(environment.resources, add);
  if (environment.process.maxProcesses !== undefined) {
    add('pidsLimit', 'environment', 'Process policy declares a maximum process count');
  }
  if (environment.image?.requireDigestPin || environment.image?.digest) {
    add('imageDigestPinning', 'environment', 'Environment requires an immutable image digest');
  }
}

function deriveResourceRequirements(
  resources: ResourceLimitSpec,
  add: (
    capability: SandboxCapabilityName,
    source: SandboxCapabilityRequirement['source'],
    reason: string
  ) => void
): void {
  if (
    resources.cpuCores !== undefined ||
    resources.cpuQuotaMicros !== undefined ||
    resources.cpuPeriodMicros !== undefined ||
    resources.cpuShares !== undefined ||
    resources.maxCpuSeconds !== undefined
  ) {
    add('cpuLimits', 'environment', 'Environment declares CPU limits');
  }
  if (resources.memoryMb !== undefined || resources.memorySwapMb !== undefined) {
    add('memoryLimits', 'environment', 'Environment declares memory limits');
  }
  if (
    resources.diskBytes !== undefined ||
    resources.tempBytes !== undefined ||
    resources.maxWriteBytes !== undefined ||
    resources.blockIoWeight !== undefined
  ) {
    add('diskLimits', 'environment', 'Environment declares disk or write limits');
  }
  if (resources.pidsLimit !== undefined) {
    add('pidsLimit', 'environment', 'Environment declares a PID limit');
  }
}

function requiresFilesystemIsolation(environment: ExecutionEnvironmentSpec): boolean {
  const filesystem = environment.filesystem;
  return Boolean(
    filesystem.rootFilesystem === 'read_only' ||
    filesystem.mounts.length ||
    filesystem.tmpfs?.length ||
    filesystem.maskPaths?.length ||
    filesystem.readonlyPaths?.length ||
    filesystem.writablePaths?.length
  );
}

function uniqueCapabilities(capabilities: SandboxCapabilityName[]): SandboxCapabilityName[] {
  return [...new Set(capabilities)];
}

function sameCapabilities(left: SandboxCapabilityName[], right: SandboxCapabilityName[]): boolean {
  return left.length === right.length && left.every((capability) => right.includes(capability));
}
