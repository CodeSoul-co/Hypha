import { z } from 'zod';
import type {
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
  payload: workspaceEventPayloadExample,
};

export function validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(
  type: TType,
  input: unknown
): WorkspaceEventPayloadMap[TType] {
  workspaceFrameworkEventTypeSchema.parse(type);
  return validateWorkspaceEventPayload(input);
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
