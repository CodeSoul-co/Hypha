import { z, type ZodType } from 'zod';
import type {
  ArtifactEventCreateInput,
  ArtifactEventPayload,
  ArtifactEventPayloadMap,
  ArtifactFrameworkEvent,
  ArtifactFrameworkEventType,
} from '../../contracts/artifact-events';
import { createFrameworkEvent } from '../../events';
import { specRefSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';
import { artifactContentHashSchema, artifactStatusSchema } from './index';
import { normalizedArtifactErrorJsonSchema, normalizedArtifactErrorSchema } from './manager';

export const artifactFrameworkEventTypes = [
  'artifact.create.requested',
  'artifact.created',
  'artifact.deduplicated',
  'artifact.create.failed',
  'artifact.read.requested',
  'artifact.read.completed',
  'artifact.version.created',
  'artifact.finalized',
  'artifact.archived',
  'artifact.invalidated',
  'artifact.delete.requested',
  'artifact.delete.blocked',
  'artifact.deleted',
  'artifact.delete.failed',
  'artifact.lineage.recorded',
  'artifact.retention.expired',
  'artifact.gc.completed',
  'artifact.gc.failed',
] as const satisfies readonly ArtifactFrameworkEventType[];

export const artifactFrameworkEventTypeSchema = z.enum(artifactFrameworkEventTypes);

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const timestampSchema = z.string().datetime({ offset: true });
const eventMetadataSchema = z.record(z.unknown()).superRefine(addSensitiveFieldIssues);

export const artifactEventPayloadSchema = z
  .object({
    operationId: nonEmptyString.optional(),
    artifactId: nonEmptyString.optional(),
    versionId: nonEmptyString.optional(),
    logicalArtifactId: nonEmptyString.optional(),
    profileRef: specRefSchema.optional(),
    workspaceId: nonEmptyString.optional(),
    executionId: nonEmptyString.optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    contentHash: artifactContentHashSchema.optional(),
    sizeBytes: nonNegativeInteger.optional(),
    status: artifactStatusSchema.optional(),
    deduplicated: z.boolean().optional(),
    candidateObjects: nonNegativeInteger.optional(),
    deletedObjects: nonNegativeInteger.optional(),
    missingObjects: nonNegativeInteger.optional(),
    reclaimedBytes: nonNegativeInteger.optional(),
    reason: nonEmptyString.optional(),
    error: normalizedArtifactErrorSchema.optional(),
    metadata: eventMetadataSchema.optional(),
  })
  .strict()
  .superRefine(addPayloadSecurityIssues) satisfies ZodType<ArtifactEventPayload>;

export interface ArtifactEventPayloadRequirement {
  required: readonly (keyof ArtifactEventPayload)[];
  status?: ArtifactEventPayload['status'];
  deduplicated?: true;
  nonEmptyArtifactRefs?: boolean;
  errorCodes?: readonly string[];
}

export const artifactEventPayloadRequirements = {
  'artifact.create.requested': {
    required: ['operationId', 'workspaceId', 'profileRef'],
  },
  'artifact.created': {
    required: [
      'operationId',
      'artifactId',
      'versionId',
      'logicalArtifactId',
      'contentHash',
      'status',
    ],
    status: 'draft',
  },
  'artifact.deduplicated': {
    required: ['operationId', 'artifactId', 'versionId', 'contentHash', 'deduplicated'],
    deduplicated: true,
  },
  'artifact.create.failed': { required: ['operationId', 'error'] },
  'artifact.read.requested': { required: ['artifactId'] },
  'artifact.read.completed': {
    required: ['artifactId', 'versionId', 'contentHash', 'sizeBytes'],
  },
  'artifact.version.created': {
    required: [
      'operationId',
      'artifactId',
      'versionId',
      'logicalArtifactId',
      'contentHash',
      'status',
    ],
  },
  'artifact.finalized': {
    required: ['operationId', 'artifactId', 'versionId', 'status'],
    status: 'final',
  },
  'artifact.archived': {
    required: ['operationId', 'artifactId', 'versionId', 'status'],
    status: 'archived',
  },
  'artifact.invalidated': {
    required: ['operationId', 'artifactId', 'versionId', 'status'],
    status: 'invalidated',
  },
  'artifact.delete.requested': { required: ['operationId', 'artifactId'] },
  'artifact.delete.blocked': {
    required: ['operationId', 'artifactId', 'error'],
    errorCodes: ['ARTIFACT_DELETE_BLOCKED'],
  },
  'artifact.deleted': {
    required: ['operationId', 'artifactId', 'versionId', 'status'],
    status: 'deleted',
  },
  'artifact.delete.failed': { required: ['operationId', 'artifactId', 'error'] },
  'artifact.lineage.recorded': {
    required: ['artifactId', 'artifactRefs'],
    nonEmptyArtifactRefs: true,
  },
  'artifact.retention.expired': { required: ['artifactId', 'versionId'] },
  'artifact.gc.completed': {
    required: [
      'operationId',
      'candidateObjects',
      'deletedObjects',
      'missingObjects',
      'reclaimedBytes',
    ],
  },
  'artifact.gc.failed': { required: ['operationId', 'error'] },
} as const satisfies Record<ArtifactFrameworkEventType, ArtifactEventPayloadRequirement>;

export const artifactFrameworkEventEnvelopeSchema = z
  .object({
    id: nonEmptyString,
    type: artifactFrameworkEventTypeSchema,
    workspaceId: nonEmptyString.optional(),
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    stepId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    fsmState: nonEmptyString.optional(),
    timestamp: timestampSchema,
    payload: z.unknown().refine((value) => value !== undefined, {
      message: 'payload is required',
    }),
    metadata: eventMetadataSchema.optional(),
  })
  .strict();

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
    revision: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const artifactEventPayloadJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    operationId: nonEmptyStringJsonSchema,
    artifactId: nonEmptyStringJsonSchema,
    versionId: nonEmptyStringJsonSchema,
    logicalArtifactId: nonEmptyStringJsonSchema,
    profileRef: specRefJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema, uniqueItems: true },
    contentHash: { type: 'string', pattern: '^(sha256|blake3):[0-9a-f]{64}$' },
    sizeBytes: nonNegativeIntegerJsonSchema,
    status: { enum: artifactStatusSchema.options },
    deduplicated: { type: 'boolean' },
    candidateObjects: nonNegativeIntegerJsonSchema,
    deletedObjects: nonNegativeIntegerJsonSchema,
    missingObjects: nonNegativeIntegerJsonSchema,
    reclaimedBytes: nonNegativeIntegerJsonSchema,
    reason: nonEmptyStringJsonSchema,
    error: normalizedArtifactErrorJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const artifactFrameworkEventJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'type', 'runId', 'timestamp', 'payload'],
  properties: {
    id: nonEmptyStringJsonSchema,
    type: { enum: [...artifactFrameworkEventTypes] },
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stepId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    fsmState: nonEmptyStringJsonSchema,
    timestamp: { type: 'string', format: 'date-time' },
    payload: artifactEventPayloadJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
  allOf: Object.entries(artifactEventPayloadRequirements).map(([type, rawRequirement]) => {
    const requirement: ArtifactEventPayloadRequirement = rawRequirement;
    const payload: JsonSchema = { required: [...requirement.required] };
    const properties: Record<string, JsonSchema> = {};
    if (requirement.status) properties.status = { const: requirement.status };
    if (requirement.deduplicated) properties.deduplicated = { const: true };
    if (requirement.nonEmptyArtifactRefs) properties.artifactRefs = { minItems: 1 };
    if (requirement.errorCodes) {
      properties.error = { properties: { code: { enum: [...requirement.errorCodes] } } };
    }
    if (Object.keys(properties).length > 0) payload.properties = properties;
    return {
      if: { properties: { type: { const: type } }, required: ['type'] },
      then: { properties: { payload } },
    };
  }),
};

export const artifactEventJsonSchemas: Record<string, JsonSchema> = {
  ArtifactEventPayload: artifactEventPayloadJsonSchema,
  ArtifactFrameworkEvent: artifactFrameworkEventJsonSchema,
};

export const artifactFrameworkEventExample: ArtifactFrameworkEvent<'artifact.created'> = {
  id: 'event.artifact.created.example',
  type: 'artifact.created',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  timestamp: '2026-07-18T08:00:00.000Z',
  payload: {
    operationId: 'operation.artifact.create.example',
    artifactId: 'artifact.example',
    versionId: 'artifact.example:v1:sha256-example',
    logicalArtifactId: 'artifact.logical.example',
    workspaceId: 'workspace.example',
    contentHash: `sha256:${'a'.repeat(64)}`,
    status: 'draft',
  },
};

export function validateArtifactEventPayloadForType<TType extends ArtifactFrameworkEventType>(
  type: TType,
  input: unknown
): ArtifactEventPayloadMap[TType] {
  artifactFrameworkEventTypeSchema.parse(type);
  const payload = artifactEventPayloadSchema.parse(input);
  const requirement: ArtifactEventPayloadRequirement = artifactEventPayloadRequirements[type];
  const issues: z.ZodIssue[] = [];
  const record = payload as Record<string, unknown>;
  for (const field of requirement.required) {
    if (record[field] === undefined || record[field] === null || record[field] === '') {
      issues.push({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `is required for ${type}`,
      });
    }
  }
  if (requirement.status && payload.status !== requirement.status) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['status'],
      message: `must be ${requirement.status} for ${type}`,
    });
  }
  if (requirement.deduplicated && payload.deduplicated !== true) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['deduplicated'],
      message: `must be true for ${type}`,
    });
  }
  if (requirement.nonEmptyArtifactRefs && payload.artifactRefs?.length === 0) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['artifactRefs'],
      message: `must contain lineage evidence for ${type}`,
    });
  }
  if (
    requirement.errorCodes &&
    payload.error &&
    !requirement.errorCodes.includes(payload.error.code)
  ) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['error', 'code'],
      message: `must match ${type}`,
    });
  }
  if (issues.length > 0) throw new z.ZodError(issues);
  return payload as ArtifactEventPayloadMap[TType];
}

export function validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent {
  const event = artifactFrameworkEventEnvelopeSchema.parse(input);
  const payload = validateArtifactEventPayloadForType(event.type, event.payload);
  if (event.workspaceId && payload.workspaceId && event.workspaceId !== payload.workspaceId) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: ['payload', 'workspaceId'],
        message: 'must match the event workspaceId',
      },
    ]);
  }
  return { ...event, payload } as ArtifactFrameworkEvent;
}

export function createArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType>(
  input: ArtifactEventCreateInput<TType>
): ArtifactFrameworkEvent<TType> {
  return validateArtifactFrameworkEvent(createFrameworkEvent(input)) as ArtifactFrameworkEvent<TType>;
}

function addPayloadSecurityIssues(value: ArtifactEventPayload, context: z.RefinementCtx): void {
  if (value.artifactRefs && new Set(value.artifactRefs).size !== value.artifactRefs.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['artifactRefs'],
      message: 'must not contain duplicate Artifact references',
    });
  }
  addSensitiveFieldIssues(value, context);
}

const forbiddenEventFieldNames = new Set([
  'secret',
  'secrets',
  'secretvalue',
  'secretvalues',
  'plaintextsecret',
  'stdout',
  'stderr',
  'rawoutput',
  'outputcontent',
  'filecontent',
  'binarycontent',
  'hostpath',
  'hostabsolutepath',
  'environmentvariables',
  'envvalues',
  'rawenv',
]);

function addSensitiveFieldIssues(
  value: unknown,
  context: z.RefinementCtx,
  path: Array<string | number> = []
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => addSensitiveFieldIssues(item, context, [...path, index]));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.replace(/[^A-Za-z0-9]/gu, '').toLowerCase();
    if (forbiddenEventFieldNames.has(normalized)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [...path, key],
        message: 'sensitive or unbounded content fields are forbidden in Artifact events',
      });
      continue;
    }
    addSensitiveFieldIssues(child, context, [...path, key]);
  }
}
