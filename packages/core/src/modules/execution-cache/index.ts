import { z, type ZodType } from 'zod';
import type {
  ExecutionCacheArtifactReference,
  ExecutionCacheEntryProjection,
  ExecutionCacheResultMetadata,
  ExecutionCacheRecord,
  ExecutionCacheScope,
  ExecutionCacheReuseAssessment,
  ExecutionCacheReuseAssessmentInput,
  ExecutionCacheValidityInput,
  ExecutionCommandFingerprintInput,
  ExecutionEnvironmentFingerprint,
  ExecutionEnvironmentFingerprintResolution,
} from '../../contracts/execution-cache';
import { specRefSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';
import { sideEffectLevelSchema } from '../../schemas';
import {
  commandExecutionStatusSchema,
  executionResourceUsageJsonSchema,
  executionResourceUsageSchema,
} from '../command-execution';

const nonEmptyString = z.string().min(1).max(16_384);
const timestampSchema = z.string().datetime({ offset: true });
const hashSchema = nonEmptyString.regex(
  /^[a-z0-9][a-z0-9+._-]*:[^\s]+$/iu,
  'must be an algorithm-qualified hash such as sha256:<digest>'
);

export const executionCacheValidityInputSchema = z
  .object({
    executable: nonEmptyString,
    argsHash: hashSchema,
    sourceTreeHash: hashSchema,
    workspaceSnapshotHash: hashSchema.optional(),
    environmentHash: hashSchema,
    imageDigest: hashSchema.optional(),
    dependencyLockHash: hashSchema.optional(),
    networkPolicyHash: hashSchema,
    secretVersionSetHash: hashSchema.optional(),
    commandPolicyRevision: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionCacheValidityInput>;

export const executionEnvironmentFingerprintSchema = z
  .object({
    environmentRef: specRefSchema,
    environmentRevision: nonEmptyString,
    providerId: nonEmptyString,
    imageDigest: hashSchema.optional(),
    platform: nonEmptyString.optional(),
    executableVersions: z.record(nonEmptyString).optional(),
    dependencyLockHash: hashSchema.optional(),
    resourcePolicyHash: hashSchema,
    networkPolicyHash: hashSchema,
    mountPolicyHash: hashSchema,
    secretVersionSetHash: hashSchema.optional(),
    fingerprintHash: hashSchema,
  })
  .strict()
  .superRefine((value, context) => {
    const executableVersionCount = Object.keys(value.executableVersions ?? {}).length;
    if (value.executableVersions && executableVersionCount === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['executableVersions'],
        message: 'must contain at least one detected executable version when present',
      });
    }
    if (!value.imageDigest && (!value.platform || executableVersionCount === 0)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fingerprintHash'],
        message: 'requires an image digest or both platform and detected executable versions',
      });
    }
  }) satisfies ZodType<ExecutionEnvironmentFingerprint>;

export const executionEnvironmentFingerprintResolutionSchema = z.discriminatedUnion('status', [
  z
    .object({
      status: z.literal('resolved'),
      fingerprint: executionEnvironmentFingerprintSchema,
    })
    .strict(),
  z
    .object({
      status: z.literal('unavailable'),
      reason: nonEmptyString,
    })
    .strict(),
]) satisfies ZodType<ExecutionEnvironmentFingerprintResolution>;

export const executionCommandFingerprintInputSchema = z
  .object({
    executable: nonEmptyString,
    argsHash: hashSchema,
    cwd: nonEmptyString.optional(),
    relevantEnvHash: hashSchema,
    sourceTreeHash: hashSchema,
    environmentHash: hashSchema,
    networkPolicyHash: hashSchema,
    secretVersionSetHash: hashSchema.optional(),
    idempotencyKey: nonEmptyString,
  })
  .strict() satisfies ZodType<ExecutionCommandFingerprintInput>;

export const executionCacheArtifactReferenceSchema = z
  .object({
    artifactRef: nonEmptyString,
    contentHash: hashSchema,
  })
  .strict() satisfies ZodType<ExecutionCacheArtifactReference>;

export const executionCacheResultMetadataSchema = z
  .object({
    executionId: nonEmptyString,
    status: commandExecutionStatusSchema,
    exitCode: z.number().int().nullable(),
    signal: nonEmptyString.optional(),
    resourceUsage: executionResourceUsageSchema.optional(),
    providerReceiptHash: hashSchema.optional(),
    startedAt: timestampSchema,
    completedAt: timestampSchema.optional(),
    latencyMs: z.number().int().nonnegative().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.completedAt && Date.parse(value.completedAt) < Date.parse(value.startedAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'must not be earlier than startedAt',
      });
    }
  }) satisfies ZodType<ExecutionCacheResultMetadata>;

export const executionCacheEntryProjectionSchema = z
  .object({
    commandHash: hashSchema,
    validityHash: hashSchema,
    validity: executionCacheValidityInputSchema,
    resultMetadata: executionCacheResultMetadataSchema,
    artifacts: z.array(executionCacheArtifactReferenceSchema).max(1_000),
  })
  .strict()
  .superRefine((value, context) => {
    const refs = value.artifacts.map((artifact) => artifact.artifactRef);
    const hashes = value.artifacts.map((artifact) => artifact.contentHash);
    if (new Set(refs).size !== refs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artifacts'],
        message: 'must not contain duplicate Artifact references',
      });
    }
    if (new Set(hashes).size !== hashes.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artifacts'],
        message: 'must not contain duplicate Artifact content hashes',
      });
    }
  }) satisfies ZodType<ExecutionCacheEntryProjection>;

export const executionCacheScopeSchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString,
  })
  .strict() satisfies ZodType<ExecutionCacheScope>;

export const executionCacheRecordSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    keyVersion: z.literal('1'),
    key: nonEmptyString,
    scope: executionCacheScopeSchema,
    projection: executionCacheEntryProjectionSchema,
    createdAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().nonnegative().optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.expiresAt !== undefined && value.expiresAt <= value.createdAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'must be later than createdAt',
      });
    }
  }) satisfies ZodType<ExecutionCacheRecord>;

const hashJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  maxLength: 16_384,
  pattern: '^[A-Za-z0-9][A-Za-z0-9+._-]*:[^\\s]+$',
};
const nonEmptyStringJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  maxLength: 16_384,
};
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const executionCacheValidityInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['executable', 'argsHash', 'sourceTreeHash', 'environmentHash', 'networkPolicyHash'],
  properties: {
    executable: nonEmptyStringJsonSchema,
    argsHash: hashJsonSchema,
    sourceTreeHash: hashJsonSchema,
    workspaceSnapshotHash: hashJsonSchema,
    environmentHash: hashJsonSchema,
    imageDigest: hashJsonSchema,
    dependencyLockHash: hashJsonSchema,
    networkPolicyHash: hashJsonSchema,
    secretVersionSetHash: hashJsonSchema,
    commandPolicyRevision: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionEnvironmentFingerprintJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'environmentRef',
    'environmentRevision',
    'providerId',
    'resourcePolicyHash',
    'networkPolicyHash',
    'mountPolicyHash',
    'fingerprintHash',
  ],
  properties: {
    environmentRef: {
      type: 'object',
      required: ['id'],
      properties: {
        id: nonEmptyStringJsonSchema,
        version: nonEmptyStringJsonSchema,
      },
      additionalProperties: false,
    },
    environmentRevision: nonEmptyStringJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    imageDigest: hashJsonSchema,
    platform: nonEmptyStringJsonSchema,
    executableVersions: {
      type: 'object',
      minProperties: 1,
      additionalProperties: nonEmptyStringJsonSchema,
    },
    dependencyLockHash: hashJsonSchema,
    resourcePolicyHash: hashJsonSchema,
    networkPolicyHash: hashJsonSchema,
    mountPolicyHash: hashJsonSchema,
    secretVersionSetHash: hashJsonSchema,
    fingerprintHash: hashJsonSchema,
  },
  anyOf: [{ required: ['imageDigest'] }, { required: ['platform', 'executableVersions'] }],
  additionalProperties: false,
};

export const executionCommandFingerprintInputJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'executable',
    'argsHash',
    'relevantEnvHash',
    'sourceTreeHash',
    'environmentHash',
    'networkPolicyHash',
    'idempotencyKey',
  ],
  properties: {
    executable: nonEmptyStringJsonSchema,
    argsHash: hashJsonSchema,
    cwd: nonEmptyStringJsonSchema,
    relevantEnvHash: hashJsonSchema,
    sourceTreeHash: hashJsonSchema,
    environmentHash: hashJsonSchema,
    networkPolicyHash: hashJsonSchema,
    secretVersionSetHash: hashJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionCacheArtifactReferenceJsonSchema: JsonSchema = {
  type: 'object',
  required: ['artifactRef', 'contentHash'],
  properties: {
    artifactRef: nonEmptyStringJsonSchema,
    contentHash: hashJsonSchema,
  },
  additionalProperties: false,
};

export const executionCacheResultMetadataJsonSchema: JsonSchema = {
  type: 'object',
  required: ['executionId', 'status', 'exitCode', 'startedAt'],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    status: { enum: commandExecutionStatusSchema.options },
    exitCode: { anyOf: [{ type: 'integer' }, { type: 'null' }] },
    signal: nonEmptyStringJsonSchema,
    resourceUsage: executionResourceUsageJsonSchema,
    providerReceiptHash: hashJsonSchema,
    startedAt: timestampJsonSchema,
    completedAt: timestampJsonSchema,
    latencyMs: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
};

export const executionCacheEntryProjectionJsonSchema: JsonSchema = {
  type: 'object',
  required: ['commandHash', 'validityHash', 'validity', 'resultMetadata', 'artifacts'],
  properties: {
    commandHash: hashJsonSchema,
    validityHash: hashJsonSchema,
    validity: executionCacheValidityInputJsonSchema,
    resultMetadata: executionCacheResultMetadataJsonSchema,
    artifacts: {
      type: 'array',
      maxItems: 1000,
      items: executionCacheArtifactReferenceJsonSchema,
    },
  },
  additionalProperties: false,
};

export const executionCacheScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'workspaceId'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionCacheRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: ['schemaVersion', 'keyVersion', 'key', 'scope', 'projection', 'createdAt'],
  properties: {
    schemaVersion: { const: '1.0' },
    keyVersion: { const: '1' },
    key: nonEmptyStringJsonSchema,
    scope: executionCacheScopeJsonSchema,
    projection: executionCacheEntryProjectionJsonSchema,
    createdAt: { type: 'integer', minimum: 0 },
    expiresAt: { type: 'integer', minimum: 0 },
    sizeBytes: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
};

export const executionEnvironmentFingerprintResolutionJsonSchema: JsonSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['status', 'fingerprint'],
      properties: {
        status: { const: 'resolved' },
        fingerprint: executionEnvironmentFingerprintJsonSchema,
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['status', 'reason'],
      properties: {
        status: { const: 'unavailable' },
        reason: nonEmptyStringJsonSchema,
      },
      additionalProperties: false,
    },
  ],
};

export const executionCacheJsonSchemas: Record<string, JsonSchema> = {
  ExecutionCacheValidityInput: executionCacheValidityInputJsonSchema,
  ExecutionEnvironmentFingerprint: executionEnvironmentFingerprintJsonSchema,
  ExecutionEnvironmentFingerprintResolution: executionEnvironmentFingerprintResolutionJsonSchema,
  ExecutionCommandFingerprintInput: executionCommandFingerprintInputJsonSchema,
  ExecutionCacheArtifactReference: executionCacheArtifactReferenceJsonSchema,
  ExecutionCacheResultMetadata: executionCacheResultMetadataJsonSchema,
  ExecutionCacheEntryProjection: executionCacheEntryProjectionJsonSchema,
  ExecutionCacheScope: executionCacheScopeJsonSchema,
  ExecutionCacheRecord: executionCacheRecordJsonSchema,
};

export const executionCacheValidityInputExample: ExecutionCacheValidityInput = {
  executable: 'node',
  argsHash: 'sha256:args-example',
  sourceTreeHash: 'sha256:source-tree-example',
  workspaceSnapshotHash: 'sha256:workspace-snapshot-example',
  environmentHash: 'sha256:environment-example',
  imageDigest: 'sha256:image-example',
  dependencyLockHash: 'sha256:dependency-lock-example',
  networkPolicyHash: 'sha256:network-policy-example',
  secretVersionSetHash: 'sha256:secret-version-set-example',
  commandPolicyRevision: 'command-policy.revision.3',
};

export const executionEnvironmentFingerprintExample: ExecutionEnvironmentFingerprint = {
  environmentRef: { id: 'execution-environment.node.safe', version: '1.0.0' },
  environmentRevision: 'environment.revision.7',
  providerId: 'provider.mock',
  imageDigest: 'sha256:image-example',
  platform: 'linux/amd64',
  executableVersions: { node: '22.17.0', npm: '10.9.2' },
  dependencyLockHash: 'sha256:dependency-lock-example',
  resourcePolicyHash: 'sha256:resource-policy-example',
  networkPolicyHash: 'sha256:network-policy-example',
  mountPolicyHash: 'sha256:mount-policy-example',
  secretVersionSetHash: 'sha256:secret-version-set-example',
  fingerprintHash: 'sha256:environment-example',
};

export const executionCommandFingerprintInputExample: ExecutionCommandFingerprintInput = {
  executable: 'node',
  argsHash: 'sha256:args-example',
  cwd: 'working',
  relevantEnvHash: 'sha256:relevant-env-example',
  sourceTreeHash: 'sha256:source-tree-example',
  environmentHash: executionEnvironmentFingerprintExample.fingerprintHash,
  networkPolicyHash: executionEnvironmentFingerprintExample.networkPolicyHash,
  secretVersionSetHash: executionEnvironmentFingerprintExample.secretVersionSetHash,
  idempotencyKey: 'command:run.example:step.example',
};

export const executionCacheEntryProjectionExample: ExecutionCacheEntryProjection = {
  commandHash: 'sha256:command-example',
  validityHash: 'sha256:validity-example',
  validity: executionCacheValidityInputExample,
  resultMetadata: {
    executionId: 'execution.example',
    status: 'completed',
    exitCode: 0,
    resourceUsage: { cpuTimeMs: 100, peakMemoryBytes: 16_777_216 },
    providerReceiptHash: 'sha256:provider-receipt-example',
    startedAt: '2026-07-16T00:00:00.000Z',
    completedAt: '2026-07-16T00:00:01.000Z',
    latencyMs: 1_000,
  },
  artifacts: [
    {
      artifactRef: 'artifact:execution.example:report',
      contentHash: 'sha256:artifact-report-example',
    },
  ],
};

export function validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput {
  return executionCacheValidityInputSchema.parse(input);
}

export function validateExecutionEnvironmentFingerprint(
  input: unknown
): ExecutionEnvironmentFingerprint {
  return executionEnvironmentFingerprintSchema.parse(input);
}

export function validateExecutionEnvironmentFingerprintResolution(
  input: unknown
): ExecutionEnvironmentFingerprintResolution {
  return executionEnvironmentFingerprintResolutionSchema.parse(input);
}

export function validateExecutionCommandFingerprintInput(
  input: unknown
): ExecutionCommandFingerprintInput {
  return executionCommandFingerprintInputSchema.parse(input);
}

export function validateExecutionCacheEntryProjection(
  input: unknown
): ExecutionCacheEntryProjection {
  return executionCacheEntryProjectionSchema.parse(input);
}

export function validateExecutionCacheScope(input: unknown): ExecutionCacheScope {
  return executionCacheScopeSchema.parse(input);
}

export function validateExecutionCacheRecord(
  input: unknown,
  maxEntryBytes = 1024 * 1024
): ExecutionCacheRecord {
  let serialized: string;
  try {
    serialized = JSON.stringify(input);
  } catch (error) {
    throw new Error(
      `Execution Cache record is not JSON-safe: ${error instanceof Error ? error.message : String(error)}`
    );
  }
  if (!serialized) throw new Error('Execution Cache record is empty.');
  const limit = positiveInteger(maxEntryBytes, 'maxEntryBytes');
  const actualBytes = Buffer.byteLength(serialized, 'utf8');
  if (actualBytes > limit) {
    throw new Error(`Execution Cache record is ${actualBytes} bytes; limit is ${limit} bytes.`);
  }
  return executionCacheRecordSchema.parse(JSON.parse(serialized));
}

export function canonicalizeExecutionFingerprintInput(
  input: ExecutionCommandFingerprintInput | ExecutionCacheValidityInput
): string {
  const parsed =
    'idempotencyKey' in input
      ? executionCommandFingerprintInputSchema.parse(input)
      : executionCacheValidityInputSchema.parse(input);
  return JSON.stringify(canonicalizeJsonValue(parsed));
}

export function assessExecutionCacheReuse(
  input: ExecutionCacheReuseAssessmentInput
): ExecutionCacheReuseAssessment {
  const parsed = z
    .object({
      sideEffectLevel: sideEffectLevelSchema,
      environmentFingerprintStatus: z.enum(['resolved', 'unavailable']),
    })
    .strict()
    .parse(input);
  if (parsed.environmentFingerprintStatus === 'unavailable') {
    return { reusable: false, reason: 'environment_fingerprint_unavailable' };
  }
  if (parsed.sideEffectLevel === 'write') {
    return { reusable: false, reason: 'workspace_write' };
  }
  if (parsed.sideEffectLevel === 'external_effect') {
    return { reusable: false, reason: 'external_side_effect' };
  }
  if (parsed.sideEffectLevel === 'irreversible') {
    return { reusable: false, reason: 'irreversible_side_effect' };
  }
  return { reusable: true };
}

function canonicalizeJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalizeJsonValue);
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record)
        .sort()
        .filter((key) => record[key] !== undefined)
        .map((key) => [key, canonicalizeJsonValue(record[key])])
    );
  }
  return value;
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive integer.`);
  }
  return value;
}

export * from './runtime';
