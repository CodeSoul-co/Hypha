import { z } from 'zod';
import type {
  WorkspaceEventPayload,
  WorkspaceEventCreateInput,
  WorkspaceEventPayloadMap,
  WorkspaceFrameworkEvent,
  WorkspaceFrameworkEventType,
} from '../../contracts/workspace';
import { createFrameworkEvent } from '../../events';
import type { JsonSchema } from '../../specs';
import {
  validateWorkspaceEventPayload,
  workspaceEventMetadataSchema,
  workspaceEventPayloadExample,
  workspaceEventPayloadJsonSchema,
} from './index';

export const workspaceFrameworkEventTypes = [
  'workspace.create.requested',
  'workspace.created',
  'workspace.ready',
  'workspace.busy',
  'workspace.path.resolved',
  'workspace.path.denied',
  'workspace.quota.exceeded',
  'workspace.snapshot.requested',
  'workspace.snapshot.created',
  'workspace.snapshot.failed',
  'workspace.restore.requested',
  'workspace.restored',
  'workspace.restore.failed',
  'workspace.patch.checked',
  'workspace.patch.applied',
  'workspace.patch.conflict',
  'workspace.cleanup.started',
  'workspace.cleanup.completed',
  'workspace.cleanup.failed',
] as const satisfies readonly WorkspaceFrameworkEventType[];

export const workspaceFrameworkEventTypeSchema = z.enum(workspaceFrameworkEventTypes);

interface WorkspaceEventPayloadRequirement {
  required: readonly (keyof WorkspaceEventPayload)[];
  status?: 'ready' | 'busy';
  atLeastOne?: readonly (keyof WorkspaceEventPayload)[];
  nonEmptyArtifactRefs?: boolean;
}

export const workspaceEventPayloadRequirements = {
  'workspace.create.requested': { required: ['operationId', 'profileRef'] },
  'workspace.created': { required: ['operationId', 'profileRef', 'status'] },
  'workspace.ready': { required: ['operationId', 'status'], status: 'ready' },
  'workspace.busy': { required: ['operationId', 'status'], status: 'busy' },
  'workspace.path.resolved': { required: ['operationId'] },
  'workspace.path.denied': { required: ['operationId', 'error'] },
  'workspace.quota.exceeded': {
    required: ['operationId'],
    atLeastOne: ['bytes', 'files'],
  },
  'workspace.snapshot.requested': { required: ['operationId'] },
  'workspace.snapshot.created': {
    required: ['operationId', 'snapshotManifestHash', 'artifactRefs'],
    nonEmptyArtifactRefs: true,
  },
  'workspace.snapshot.failed': { required: ['operationId', 'error'] },
  'workspace.restore.requested': {
    required: ['operationId', 'artifactRefs'],
    nonEmptyArtifactRefs: true,
  },
  'workspace.restored': { required: ['operationId', 'workspaceSnapshotHash'] },
  'workspace.restore.failed': { required: ['operationId', 'error'] },
  'workspace.patch.checked': { required: ['operationId'] },
  'workspace.patch.applied': { required: ['operationId', 'workspaceSnapshotHash'] },
  'workspace.patch.conflict': { required: ['operationId'] },
  'workspace.cleanup.started': { required: ['operationId'] },
  'workspace.cleanup.completed': { required: ['operationId'] },
  'workspace.cleanup.failed': { required: ['operationId', 'error'] },
} as const satisfies Record<WorkspaceFrameworkEventType, WorkspaceEventPayloadRequirement>;

const nonEmptyString = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });

const workspaceFrameworkEventEnvelopeSchema = z
  .object({
    id: nonEmptyString,
    type: workspaceFrameworkEventTypeSchema,
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    stepId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    fsmState: nonEmptyString.optional(),
    timestamp: timestampSchema,
    payload: z.unknown(),
    metadata: workspaceEventMetadataSchema.optional(),
  })
  .strict();

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };

export const workspaceFrameworkEventJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'type', 'workspaceId', 'runId', 'timestamp', 'payload'],
  properties: {
    id: nonEmptyStringJsonSchema,
    type: { enum: [...workspaceFrameworkEventTypes] },
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stepId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    fsmState: nonEmptyStringJsonSchema,
    timestamp: { type: 'string', format: 'date-time' },
    payload: workspaceEventPayloadJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
  allOf: Object.entries(workspaceEventPayloadRequirements).map(([type, requirement]) => {
    const payloadConstraint: JsonSchema = { required: [...requirement.required] };
    const payloadProperties: Record<string, JsonSchema> = {};
    if ('status' in requirement) payloadProperties.status = { const: requirement.status };
    if ('nonEmptyArtifactRefs' in requirement && requirement.nonEmptyArtifactRefs) {
      payloadProperties.artifactRefs = { minItems: 1 };
    }
    if (Object.keys(payloadProperties).length > 0) {
      payloadConstraint.properties = payloadProperties;
    }
    if ('atLeastOne' in requirement && requirement.atLeastOne) {
      payloadConstraint.anyOf = requirement.atLeastOne.map((field) => ({ required: [field] }));
    }
    return {
      if: { properties: { type: { const: type } }, required: ['type'] },
      then: { properties: { payload: payloadConstraint } },
    };
  }),
};

export const workspaceEventJsonSchemas: Record<string, JsonSchema> = {
  WorkspaceEventPayload: workspaceEventPayloadJsonSchema,
  WorkspaceFrameworkEvent: workspaceFrameworkEventJsonSchema,
};

export const workspaceFrameworkEventExample: WorkspaceFrameworkEvent<'workspace.ready'> = {
  id: 'event.workspace.ready.example',
  type: 'workspace.ready',
  workspaceId: workspaceEventPayloadExample.workspaceId,
  runId: 'run.example',
  timestamp: '2026-07-17T00:00:01.000Z',
  payload: {
    ...workspaceEventPayloadExample,
    operationId: 'operation:workspace-ready',
    status: 'ready',
  },
};

export function validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(
  type: TType,
  input: unknown
): WorkspaceEventPayloadMap[TType] {
  workspaceFrameworkEventTypeSchema.parse(type);
  const payload = validateWorkspaceEventPayload(input);
  const requirement = workspaceEventPayloadRequirements[type];
  const issues: z.ZodIssue[] = [];

  for (const field of requirement.required) {
    if (payload[field] === undefined) {
      issues.push({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `is required for ${type}`,
      });
    }
  }
  if ('status' in requirement && payload.status !== requirement.status) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['status'],
      message: `must be ${requirement.status} for ${type}`,
    });
  }
  if (
    'atLeastOne' in requirement &&
    requirement.atLeastOne &&
    !requirement.atLeastOne.some((field) => payload[field] !== undefined)
  ) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: [],
      message: `requires at least one of ${requirement.atLeastOne.join(', ')}`,
    });
  }
  if (
    'nonEmptyArtifactRefs' in requirement &&
    requirement.nonEmptyArtifactRefs &&
    payload.artifactRefs?.length === 0
  ) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['artifactRefs'],
      message: `must contain snapshot or patch evidence for ${type}`,
    });
  }
  if (issues.length > 0) throw new z.ZodError(issues);

  return payload as WorkspaceEventPayloadMap[TType];
}

export function validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent {
  const event = workspaceFrameworkEventEnvelopeSchema.parse(input);
  const payload = validateWorkspaceEventPayloadForType(event.type, event.payload);
  if (event.workspaceId !== payload.workspaceId) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: ['payload', 'workspaceId'],
        message: 'must match the event workspaceId',
      },
    ]);
  }
  return { ...event, payload } as WorkspaceFrameworkEvent;
}

export function createWorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType>(
  input: WorkspaceEventCreateInput<TType>
): WorkspaceFrameworkEvent<TType> {
  const event = createFrameworkEvent(input);
  return validateWorkspaceFrameworkEvent(event) as WorkspaceFrameworkEvent<TType>;
}
