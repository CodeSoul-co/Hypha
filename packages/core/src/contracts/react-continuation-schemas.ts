import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  CONTINUE_REACT_COMMAND_PAYLOAD_VERSION,
  REACT_QUANTUM_DESCRIPTOR_VERSION,
  type ContinueReActCommandPayloadV1,
  type ReActQuantumDescriptor,
} from './react-continuation';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const specRefSchema = z
  .object({
    id: nonEmptyStringSchema,
    version: nonEmptyStringSchema.optional(),
    revision: nonEmptyStringSchema.optional(),
  })
  .strict();

export const continueReActCommandPayloadV1Schema = z
  .object({
    version: z.literal(CONTINUE_REACT_COMMAND_PAYLOAD_VERSION),
    runId: nonEmptyStringSchema,
    sessionId: nonEmptyStringSchema,
    userId: nonEmptyStringSchema,
    stepId: nonEmptyStringSchema,
    checkpointRef: nonEmptyStringSchema,
    checkpointHash: hashSchema,
    checkpointSequence: z.number().int().min(0),
    scopeHash: hashSchema,
    agentRef: specRefSchema,
    domainPackRef: specRefSchema,
    workflowRef: specRefSchema.optional(),
    promptSnapshotRef: nonEmptyStringSchema,
    promptSnapshotHash: hashSchema,
    capabilitySnapshotRef: nonEmptyStringSchema,
    capabilitySnapshotHash: hashSchema,
    memoryContextRef: nonEmptyStringSchema.optional(),
    workspaceRef: nonEmptyStringSchema.optional(),
    executionRef: nonEmptyStringSchema.optional(),
    pendingOperationReceipts: z.array(nonEmptyStringSchema).optional(),
    globalBudget: z
      .object({
        iterations: z.number().int().positive(),
        modelCalls: z.number().int().positive(),
        toolCalls: z.number().int().min(0),
        totalTokens: z.number().int().positive(),
      })
      .strict(),
    deadlineAt: timestampSchema.optional(),
    cancellationRevision: z.number().int().min(0),
    createdAt: timestampSchema,
  })
  .strict() satisfies ZodType<ContinueReActCommandPayloadV1>;

const reActQuantumDescriptorBaseShape = {
  version: z.literal(REACT_QUANTUM_DESCRIPTOR_VERSION),
  runId: nonEmptyStringSchema,
  sessionId: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  stepId: nonEmptyStringSchema,
  scopeHash: hashSchema,
  agentRef: specRefSchema,
  domainPackRef: specRefSchema,
  workflowRef: specRefSchema.optional(),
  promptSnapshotRef: nonEmptyStringSchema,
  promptSnapshotHash: hashSchema,
  capabilitySnapshotRef: nonEmptyStringSchema,
  capabilitySnapshotHash: hashSchema,
  memoryContextRef: nonEmptyStringSchema.optional(),
  workspaceRef: nonEmptyStringSchema.optional(),
  executionRef: nonEmptyStringSchema.optional(),
  pendingOperationReceipts: z.array(nonEmptyStringSchema).optional(),
  globalBudget: continueReActCommandPayloadV1Schema.shape.globalBudget,
  deadlineAt: timestampSchema.optional(),
  cancellationRevision: z.number().int().min(0),
  createdAt: timestampSchema,
};

export const reActQuantumDescriptorSchema = z.discriminatedUnion('trigger', [
  z
    .object({
      ...reActQuantumDescriptorBaseShape,
      trigger: z.literal('initial'),
    })
    .strict(),
  z
    .object({
      ...reActQuantumDescriptorBaseShape,
      trigger: z.literal('continuation'),
      commandId: nonEmptyStringSchema,
      commandPayloadHash: hashSchema,
      claimToken: nonEmptyStringSchema,
      leaseEpoch: z.number().int().positive(),
      checkpointRef: nonEmptyStringSchema,
      checkpointHash: hashSchema,
      checkpointSequence: z.number().int().min(0),
    })
    .strict(),
]) satisfies ZodType<ReActQuantumDescriptor>;

const stringProperty: JsonSchema = { type: 'string', minLength: 1 };
const hashProperty: JsonSchema = { type: 'string', pattern: '^sha256:[a-f0-9]{64}$' };
const timestampProperty: JsonSchema = { type: 'string', format: 'date-time' };
const specRefProperty: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: stringProperty,
    version: stringProperty,
    revision: stringProperty,
  },
  additionalProperties: false,
};

export const continueReActCommandPayloadV1JsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'version',
    'runId',
    'sessionId',
    'userId',
    'stepId',
    'checkpointRef',
    'checkpointHash',
    'checkpointSequence',
    'scopeHash',
    'agentRef',
    'domainPackRef',
    'promptSnapshotRef',
    'promptSnapshotHash',
    'capabilitySnapshotRef',
    'capabilitySnapshotHash',
    'globalBudget',
    'cancellationRevision',
    'createdAt',
  ],
  properties: {
    version: { const: CONTINUE_REACT_COMMAND_PAYLOAD_VERSION },
    runId: stringProperty,
    sessionId: stringProperty,
    userId: stringProperty,
    stepId: stringProperty,
    checkpointRef: stringProperty,
    checkpointHash: hashProperty,
    checkpointSequence: { type: 'integer', minimum: 0 },
    scopeHash: hashProperty,
    agentRef: specRefProperty,
    domainPackRef: specRefProperty,
    workflowRef: specRefProperty,
    promptSnapshotRef: stringProperty,
    promptSnapshotHash: hashProperty,
    capabilitySnapshotRef: stringProperty,
    capabilitySnapshotHash: hashProperty,
    memoryContextRef: stringProperty,
    workspaceRef: stringProperty,
    executionRef: stringProperty,
    pendingOperationReceipts: { type: 'array', items: stringProperty },
    globalBudget: {
      type: 'object',
      required: ['iterations', 'modelCalls', 'toolCalls', 'totalTokens'],
      properties: {
        iterations: { type: 'integer', minimum: 1 },
        modelCalls: { type: 'integer', minimum: 1 },
        toolCalls: { type: 'integer', minimum: 0 },
        totalTokens: { type: 'integer', minimum: 1 },
      },
      additionalProperties: false,
    },
    deadlineAt: timestampProperty,
    cancellationRevision: { type: 'integer', minimum: 0 },
    createdAt: timestampProperty,
  },
  additionalProperties: false,
};

export const reActQuantumDescriptorJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'version',
    'trigger',
    'runId',
    'sessionId',
    'userId',
    'stepId',
    'scopeHash',
    'agentRef',
    'domainPackRef',
    'promptSnapshotRef',
    'promptSnapshotHash',
    'capabilitySnapshotRef',
    'capabilitySnapshotHash',
    'globalBudget',
    'cancellationRevision',
    'createdAt',
  ],
  properties: {
    version: { const: REACT_QUANTUM_DESCRIPTOR_VERSION },
    trigger: { type: 'string', enum: ['initial', 'continuation'] },
    runId: stringProperty,
    sessionId: stringProperty,
    userId: stringProperty,
    stepId: stringProperty,
    scopeHash: hashProperty,
    agentRef: specRefProperty,
    domainPackRef: specRefProperty,
    workflowRef: specRefProperty,
    promptSnapshotRef: stringProperty,
    promptSnapshotHash: hashProperty,
    capabilitySnapshotRef: stringProperty,
    capabilitySnapshotHash: hashProperty,
    memoryContextRef: stringProperty,
    workspaceRef: stringProperty,
    executionRef: stringProperty,
    pendingOperationReceipts: { type: 'array', items: stringProperty },
    globalBudget: {
      type: 'object',
      required: ['iterations', 'modelCalls', 'toolCalls', 'totalTokens'],
      properties: {
        iterations: { type: 'integer', minimum: 1 },
        modelCalls: { type: 'integer', minimum: 1 },
        toolCalls: { type: 'integer', minimum: 0 },
        totalTokens: { type: 'integer', minimum: 1 },
      },
      additionalProperties: false,
    },
    deadlineAt: timestampProperty,
    cancellationRevision: { type: 'integer', minimum: 0 },
    createdAt: timestampProperty,
    commandId: stringProperty,
    commandPayloadHash: hashProperty,
    claimToken: stringProperty,
    leaseEpoch: { type: 'integer', minimum: 1 },
    checkpointRef: stringProperty,
    checkpointHash: hashProperty,
    checkpointSequence: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
  oneOf: [
    {
      properties: { trigger: { const: 'initial' } },
      required: ['trigger'],
      not: {
        anyOf: [
          { required: ['commandId'] },
          { required: ['checkpointRef'] },
          { required: ['claimToken'] },
        ],
      },
    },
    {
      properties: { trigger: { const: 'continuation' } },
      required: [
        'trigger',
        'commandId',
        'commandPayloadHash',
        'claimToken',
        'leaseEpoch',
        'checkpointRef',
        'checkpointHash',
        'checkpointSequence',
      ],
    },
  ],
};

export const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1 = {
  version: '1.0.0',
  runId: 'run.example',
  sessionId: 'session.example',
  userId: 'user.example',
  stepId: 'react',
  checkpointRef: 'react-checkpoint:run.example:react:4',
  checkpointHash: `sha256:${'1'.repeat(64)}`,
  checkpointSequence: 4,
  scopeHash: `sha256:${'2'.repeat(64)}`,
  agentRef: { id: 'agent.example', version: '1.0.0' },
  domainPackRef: { id: 'domain.example', version: '1.0.0' },
  promptSnapshotRef: 'prompt-snapshot:example',
  promptSnapshotHash: `sha256:${'3'.repeat(64)}`,
  capabilitySnapshotRef: 'capability-snapshot:example',
  capabilitySnapshotHash: `sha256:${'4'.repeat(64)}`,
  globalBudget: {
    iterations: 20,
    modelCalls: 20,
    toolCalls: 10,
    totalTokens: 100_000,
  },
  cancellationRevision: 0,
  createdAt: '2026-07-24T04:00:00.000Z',
};

export const reActQuantumDescriptorExample: ReActQuantumDescriptor = {
  version: '1.0.0',
  trigger: 'continuation',
  runId: continueReActCommandPayloadV1Example.runId,
  sessionId: continueReActCommandPayloadV1Example.sessionId,
  userId: continueReActCommandPayloadV1Example.userId,
  stepId: continueReActCommandPayloadV1Example.stepId,
  scopeHash: continueReActCommandPayloadV1Example.scopeHash,
  agentRef: continueReActCommandPayloadV1Example.agentRef,
  domainPackRef: continueReActCommandPayloadV1Example.domainPackRef,
  promptSnapshotRef: continueReActCommandPayloadV1Example.promptSnapshotRef,
  promptSnapshotHash: continueReActCommandPayloadV1Example.promptSnapshotHash,
  capabilitySnapshotRef: continueReActCommandPayloadV1Example.capabilitySnapshotRef,
  capabilitySnapshotHash: continueReActCommandPayloadV1Example.capabilitySnapshotHash,
  globalBudget: continueReActCommandPayloadV1Example.globalBudget,
  cancellationRevision: continueReActCommandPayloadV1Example.cancellationRevision,
  createdAt: continueReActCommandPayloadV1Example.createdAt,
  commandId: 'command.continue.example',
  commandPayloadHash: `sha256:${'5'.repeat(64)}`,
  claimToken: `sha256:${'6'.repeat(64)}`,
  leaseEpoch: 1,
  checkpointRef: continueReActCommandPayloadV1Example.checkpointRef,
  checkpointHash: continueReActCommandPayloadV1Example.checkpointHash,
  checkpointSequence: continueReActCommandPayloadV1Example.checkpointSequence,
};

export const continueReActCommandPayloadDefinition =
  defineSpecSchema<ContinueReActCommandPayloadV1>({
    id: 'ContinueReActCommandPayloadV1',
    zod: continueReActCommandPayloadV1Schema,
    jsonSchema: continueReActCommandPayloadV1JsonSchema,
    example: continueReActCommandPayloadV1Example,
  });

export const reActQuantumDescriptorDefinition = defineSpecSchema<ReActQuantumDescriptor>({
  id: 'ReActQuantumDescriptor',
  zod: reActQuantumDescriptorSchema,
  jsonSchema: reActQuantumDescriptorJsonSchema,
  example: reActQuantumDescriptorExample,
});

export const reActContinuationContractDefinitions = [
  continueReActCommandPayloadDefinition,
  reActQuantumDescriptorDefinition,
] as const;

export const reActContinuationContractJsonSchemas = exportSpecJsonSchemas(
  reActContinuationContractDefinitions
);

export function validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1 {
  return continueReActCommandPayloadDefinition.parse(input);
}

export function validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor {
  return reActQuantumDescriptorDefinition.parse(input);
}
