import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  RUNTIME_MESSAGE_TYPES,
  type RuntimeMessageEnvelope,
  type RuntimeMessageEnvelopeInput,
} from './runtime-messages';
import { runtimePrincipalJsonSchema, runtimePrincipalSchema } from './runtime-schemas';

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const jsonValueSchema: ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number().finite(),
    z.string(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);

export const runtimeMessageTypeSchema = z.enum(RUNTIME_MESSAGE_TYPES);

const envelopeShape = {
  messageId: nonEmptyStringSchema,
  messageType: runtimeMessageTypeSchema,
  schemaVersion: nonEmptyStringSchema,
  topic: nonEmptyStringSchema,
  partitionKey: nonEmptyStringSchema,
  orderingKey: nonEmptyStringSchema.optional(),
  sequence: z.number().int().positive().optional(),
  tenantId: nonEmptyStringSchema.optional(),
  workspaceId: nonEmptyStringSchema.optional(),
  userId: nonEmptyStringSchema.optional(),
  sessionId: nonEmptyStringSchema.optional(),
  runId: nonEmptyStringSchema.optional(),
  stepId: nonEmptyStringSchema.optional(),
  activityId: nonEmptyStringSchema.optional(),
  agentId: nonEmptyStringSchema.optional(),
  correlationId: nonEmptyStringSchema.optional(),
  causationId: nonEmptyStringSchema.optional(),
  traceId: nonEmptyStringSchema.optional(),
  principal: runtimePrincipalSchema.optional(),
  payload: jsonValueSchema,
  priority: z.number().int().min(0).max(100).optional(),
  availableAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  publishedAt: timestampSchema,
  producerId: nonEmptyStringSchema,
  producerRevision: nonEmptyStringSchema.optional(),
  metadata: z.record(jsonValueSchema).optional(),
};

export const runtimeMessageEnvelopeSchema = z
  .object({ ...envelopeShape, payloadHash: hashSchema })
  .strict() satisfies ZodType<RuntimeMessageEnvelope>;

export const runtimeMessageEnvelopeInputSchema = z
  .object({ ...envelopeShape, payloadHash: hashSchema.optional() })
  .strict() satisfies ZodType<RuntimeMessageEnvelopeInput>;

const jsonValueJsonSchema: JsonSchema = {
  anyOf: [
    { type: 'null' },
    { type: 'boolean' },
    { type: 'number' },
    { type: 'string' },
    { type: 'array', items: {} },
    { type: 'object', additionalProperties: {} },
  ],
};

export const runtimeMessageEnvelopeJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'messageId',
    'messageType',
    'schemaVersion',
    'topic',
    'partitionKey',
    'payload',
    'payloadHash',
    'publishedAt',
    'producerId',
  ],
  properties: {
    messageId: { type: 'string', minLength: 1 },
    messageType: { type: 'string', enum: [...RUNTIME_MESSAGE_TYPES] },
    schemaVersion: { type: 'string', minLength: 1 },
    topic: { type: 'string', minLength: 1 },
    partitionKey: { type: 'string', minLength: 1 },
    orderingKey: { type: 'string', minLength: 1 },
    sequence: { type: 'integer', minimum: 1 },
    tenantId: { type: 'string', minLength: 1 },
    workspaceId: { type: 'string', minLength: 1 },
    userId: { type: 'string', minLength: 1 },
    sessionId: { type: 'string', minLength: 1 },
    runId: { type: 'string', minLength: 1 },
    stepId: { type: 'string', minLength: 1 },
    activityId: { type: 'string', minLength: 1 },
    agentId: { type: 'string', minLength: 1 },
    correlationId: { type: 'string', minLength: 1 },
    causationId: { type: 'string', minLength: 1 },
    traceId: { type: 'string', minLength: 1 },
    principal: runtimePrincipalJsonSchema,
    payload: jsonValueJsonSchema,
    payloadHash: { type: 'string', pattern: '^sha256:[a-f0-9]{64}$' },
    priority: { type: 'integer', minimum: 0, maximum: 100 },
    availableAt: { type: 'string', format: 'date-time' },
    expiresAt: { type: 'string', format: 'date-time' },
    publishedAt: { type: 'string', format: 'date-time' },
    producerId: { type: 'string', minLength: 1 },
    producerRevision: { type: 'string', minLength: 1 },
    metadata: { type: 'object', additionalProperties: jsonValueJsonSchema },
  },
  additionalProperties: false,
};

export const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope = {
  messageId: 'message.command.start.001',
  messageType: 'runtime.command.start',
  schemaVersion: '1.0.0',
  topic: 'hypha.runtime.commands',
  partitionKey: 'session.example',
  userId: 'user.example',
  sessionId: 'session.example',
  runId: 'run.example',
  payload: { command: 'start' },
  payloadHash: 'sha256:582c03b4698ededda2e642883166bab4dcdae2b6028eecd855b826f1c9982f9c',
  publishedAt: '2026-07-18T02:00:00.000Z',
  producerId: 'runtime.example',
};

export const runtimeMessageEnvelopeDefinition = defineSpecSchema<RuntimeMessageEnvelope>({
  id: 'RuntimeMessageEnvelope',
  zod: runtimeMessageEnvelopeSchema,
  jsonSchema: runtimeMessageEnvelopeJsonSchema,
  example: runtimeMessageEnvelopeExample,
});

export const runtimeMessageContractDefinitions = [runtimeMessageEnvelopeDefinition] as const;
export const runtimeMessageContractJsonSchemas = exportSpecJsonSchemas(
  runtimeMessageContractDefinitions
);

export function validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope {
  return runtimeMessageEnvelopeDefinition.parse(input);
}

export function validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput {
  return runtimeMessageEnvelopeInputSchema.parse(input);
}
