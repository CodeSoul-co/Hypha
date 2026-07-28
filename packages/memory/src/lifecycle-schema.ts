import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas, type JsonSchema } from '@hypha/core';
import type {
  MemoryExtractionProfileSpec,
  MemoryExtractionSourceRef,
  MemoryMaintenancePolicySpec,
} from './lifecycle-contracts';
import { memoryContractSpecRefJsonSchema, memoryContractSpecRefSchema } from './profile-contract';
import { managedMemoryTypeSchema } from './record-contract';

export const memoryExtractionSourceTypeSchema = z.enum([
  'conversation',
  'truth',
  'episodic_record',
  'runtime_event',
  'tool_observation',
  'artifact',
  'structured_record',
  'custom',
]);

export const memoryExtractionSourceRefSchema: ZodType<MemoryExtractionSourceRef> = z
  .object({
    type: memoryExtractionSourceTypeSchema,
    sourceId: z.string().min(1),
    sourceVersion: z.string().optional(),
    sourceHash: z.string().optional(),
    sessionId: z.string().optional(),
    runId: z.string().optional(),
    messageIds: z.array(z.string()).optional(),
    eventIds: z.array(z.string()).optional(),
    artifactRefs: z.array(z.string()).optional(),
    observedAt: z.string().optional(),
    validFrom: z.string().optional(),
    validTo: z.string().optional(),
    authority: z
      .enum(['unverified', 'user_asserted', 'system_observed', 'verified', 'authoritative'])
      .optional(),
    trustScore: z.number().min(0).max(1).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

const extractionStageSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(['normalize', 'classify', 'extract', 'validate', 'enrich', 'custom']),
    handlerRef: memoryContractSpecRefSchema,
    optional: z.boolean().optional(),
    timeoutMs: z.number().int().positive().optional(),
    retryPolicy: z.record(z.unknown()).optional(),
  })
  .strict();

export const memoryExtractionProfileSpecSchema: ZodType<MemoryExtractionProfileSpec> = z
  .object({
    id: z.string().min(1),
    version: z.string().min(1),
    revision: z.string().optional(),
    acceptedSourceTypes: z.array(memoryExtractionSourceTypeSchema).min(1),
    outputMemoryTypes: z.array(managedMemoryTypeSchema).min(1),
    extractor: z.union([
      z
        .object({
          type: z.literal('deterministic'),
          extractorRef: memoryContractSpecRefSchema,
        })
        .strict(),
      z
        .object({
          type: z.literal('model'),
          modelProfileRef: memoryContractSpecRefSchema,
          promptTemplateRef: memoryContractSpecRefSchema,
        })
        .strict(),
      z
        .object({
          type: z.literal('provider'),
          providerRef: memoryContractSpecRefSchema,
        })
        .strict(),
      z
        .object({
          type: z.literal('hybrid'),
          stages: z.array(extractionStageSchema).min(1),
        })
        .strict(),
    ]),
    conversation: z
      .object({
        maxMessagesPerWindow: z.number().int().positive(),
        overlapMessages: z.number().int().min(0).optional(),
        includeSystemMessages: z.boolean().optional(),
        includeToolMessages: z.boolean().optional(),
        extractionTrigger: z.enum(['each_turn', 'window', 'run_end', 'session_idle', 'manual']),
      })
      .strict()
      .optional(),
    episodic: z
      .object({
        boundary: z.enum(['run', 'workflow_state', 'task', 'time_window', 'custom']),
        includeFailedEpisodes: z.boolean().optional(),
        includeIntermediateObservations: z.boolean().optional(),
      })
      .strict()
      .optional(),
    truth: z
      .object({
        minimumAuthority: z.enum([
          'user_confirmed',
          'human_reviewed',
          'system_of_record',
          'policy_defined',
        ]),
        requireEvidence: z.boolean().optional(),
        preserveValidityInterval: z.boolean().optional(),
      })
      .strict()
      .optional(),
    candidateValidation: z
      .object({
        minConfidence: z.number().min(0).max(1),
        requireCanonicalText: z.boolean(),
        requireEvidence: z.boolean(),
        maxCandidatesPerJob: z.number().int().positive().optional(),
        rejectInstructionLikeContent: z.boolean().optional(),
      })
      .strict(),
    sensitiveDataPolicyRef: memoryContractSpecRefSchema.optional(),
    writePolicyRef: memoryContractSpecRefSchema,
    maintenancePolicyRef: memoryContractSpecRefSchema,
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const memoryMaintenancePolicySpecSchema: ZodType<MemoryMaintenancePolicySpec> = z
  .object({
    id: z.string().min(1),
    version: z.string().min(1),
    revision: z.string().optional(),
    preWriteRetrieval: z
      .object({
        enabled: z.boolean(),
        exactKeyLookup: z.boolean(),
        semanticLookup: z.boolean().optional(),
        maxCandidates: z.number().int().positive(),
        semanticThreshold: z.number().min(0).max(1).optional(),
        includeSuperseded: z.boolean().optional(),
        includeInvalidated: z.boolean().optional(),
      })
      .strict(),
    duplicateResolution: z.enum([
      'reuse_existing',
      'increase_support',
      'create_version',
      'require_review',
    ]),
    updateResolution: z.enum(['patch_current', 'create_version', 'supersede', 'require_review']),
    conflictResolution: z.enum([
      'keep_both_marked',
      'prefer_authoritative',
      'prefer_verified',
      'prefer_latest',
      'invalidate_old',
      'require_review',
    ]),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec = {
  id: 'memory.extraction.default',
  version: '1.0.0',
  revision: 'extraction-default-v1',
  acceptedSourceTypes: ['conversation', 'truth', 'episodic_record', 'runtime_event'],
  outputMemoryTypes: ['semantic', 'episodic'],
  extractor: {
    type: 'deterministic',
    extractorRef: { id: 'memory.extractor.deterministic', version: '1.0.0' },
  },
  candidateValidation: {
    minConfidence: 0.6,
    requireCanonicalText: true,
    requireEvidence: true,
    rejectInstructionLikeContent: true,
  },
  writePolicyRef: { id: 'memory.write.default', version: '1.0.0' },
  maintenancePolicyRef: { id: 'memory.maintenance.default', version: '1.0.0' },
};

export const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec = {
  id: 'memory.maintenance.default',
  version: '1.0.0',
  revision: 'maintenance-default-v1',
  preWriteRetrieval: {
    enabled: true,
    exactKeyLookup: true,
    semanticLookup: false,
    maxCandidates: 25,
  },
  duplicateResolution: 'reuse_existing',
  updateResolution: 'create_version',
  conflictResolution: 'prefer_latest',
};

const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const unitIntervalJsonSchema: JsonSchema = { type: 'number', minimum: 0, maximum: 1 };

const extractionStageJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'type', 'handlerRef'],
  properties: {
    id: { type: 'string', minLength: 1 },
    type: {
      type: 'string',
      enum: ['normalize', 'classify', 'extract', 'validate', 'enrich', 'custom'],
    },
    handlerRef: memoryContractSpecRefJsonSchema,
    optional: { type: 'boolean' },
    timeoutMs: positiveIntegerJsonSchema,
    retryPolicy: { type: 'object', additionalProperties: true },
  },
  additionalProperties: false,
};

const extractionStrategyJsonSchema: JsonSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['type', 'extractorRef'],
      properties: {
        type: { type: 'string', enum: ['deterministic'] },
        extractorRef: memoryContractSpecRefJsonSchema,
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'modelProfileRef', 'promptTemplateRef'],
      properties: {
        type: { type: 'string', enum: ['model'] },
        modelProfileRef: memoryContractSpecRefJsonSchema,
        promptTemplateRef: memoryContractSpecRefJsonSchema,
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'providerRef'],
      properties: {
        type: { type: 'string', enum: ['provider'] },
        providerRef: memoryContractSpecRefJsonSchema,
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['type', 'stages'],
      properties: {
        type: { type: 'string', enum: ['hybrid'] },
        stages: { type: 'array', items: extractionStageJsonSchema, minItems: 1 },
      },
      additionalProperties: false,
    },
  ],
};

const extractionConversationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['maxMessagesPerWindow', 'extractionTrigger'],
  properties: {
    maxMessagesPerWindow: positiveIntegerJsonSchema,
    overlapMessages: { type: 'integer', minimum: 0 },
    includeSystemMessages: { type: 'boolean' },
    includeToolMessages: { type: 'boolean' },
    extractionTrigger: {
      type: 'string',
      enum: ['each_turn', 'window', 'run_end', 'session_idle', 'manual'],
    },
  },
  additionalProperties: false,
};

const extractionEpisodicJsonSchema: JsonSchema = {
  type: 'object',
  required: ['boundary'],
  properties: {
    boundary: {
      type: 'string',
      enum: ['run', 'workflow_state', 'task', 'time_window', 'custom'],
    },
    includeFailedEpisodes: { type: 'boolean' },
    includeIntermediateObservations: { type: 'boolean' },
  },
  additionalProperties: false,
};

const extractionTruthJsonSchema: JsonSchema = {
  type: 'object',
  required: ['minimumAuthority'],
  properties: {
    minimumAuthority: {
      type: 'string',
      enum: ['user_confirmed', 'human_reviewed', 'system_of_record', 'policy_defined'],
    },
    requireEvidence: { type: 'boolean' },
    preserveValidityInterval: { type: 'boolean' },
  },
  additionalProperties: false,
};

const candidateValidationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['minConfidence', 'requireCanonicalText', 'requireEvidence'],
  properties: {
    minConfidence: unitIntervalJsonSchema,
    requireCanonicalText: { type: 'boolean' },
    requireEvidence: { type: 'boolean' },
    maxCandidatesPerJob: positiveIntegerJsonSchema,
    rejectInstructionLikeContent: { type: 'boolean' },
  },
  additionalProperties: false,
};

const preWriteRetrievalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['enabled', 'exactKeyLookup', 'maxCandidates'],
  properties: {
    enabled: { type: 'boolean' },
    exactKeyLookup: { type: 'boolean' },
    semanticLookup: { type: 'boolean' },
    maxCandidates: positiveIntegerJsonSchema,
    semanticThreshold: unitIntervalJsonSchema,
    includeSuperseded: { type: 'boolean' },
    includeInvalidated: { type: 'boolean' },
  },
  additionalProperties: false,
};

const memoryExtractionSourceTypeJsonSchema: JsonSchema = {
  type: 'string',
  enum: [
    'conversation',
    'truth',
    'episodic_record',
    'runtime_event',
    'tool_observation',
    'artifact',
    'structured_record',
    'custom',
  ],
};
const managedMemoryTypeJsonSchema: JsonSchema = {
  type: 'string',
  enum: [
    'working',
    'episodic',
    'semantic',
    'procedural',
    'preference',
    'artifact',
    'governance',
    'reflection',
    'custom',
  ],
};

export const memoryExtractionProfileSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'acceptedSourceTypes',
    'outputMemoryTypes',
    'extractor',
    'candidateValidation',
    'writePolicyRef',
    'maintenancePolicyRef',
  ],
  properties: {
    id: { type: 'string', minLength: 1 },
    version: { type: 'string', minLength: 1 },
    revision: { type: 'string' },
    acceptedSourceTypes: {
      type: 'array',
      items: memoryExtractionSourceTypeJsonSchema,
      minItems: 1,
    },
    outputMemoryTypes: { type: 'array', items: managedMemoryTypeJsonSchema, minItems: 1 },
    extractor: extractionStrategyJsonSchema,
    conversation: extractionConversationJsonSchema,
    episodic: extractionEpisodicJsonSchema,
    truth: extractionTruthJsonSchema,
    candidateValidation: candidateValidationJsonSchema,
    sensitiveDataPolicyRef: memoryContractSpecRefJsonSchema,
    writePolicyRef: memoryContractSpecRefJsonSchema,
    maintenancePolicyRef: memoryContractSpecRefJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const memoryMaintenancePolicySpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'preWriteRetrieval',
    'duplicateResolution',
    'updateResolution',
    'conflictResolution',
  ],
  properties: {
    id: { type: 'string', minLength: 1 },
    version: { type: 'string', minLength: 1 },
    revision: { type: 'string' },
    preWriteRetrieval: preWriteRetrievalJsonSchema,
    duplicateResolution: {
      type: 'string',
      enum: ['reuse_existing', 'increase_support', 'create_version', 'require_review'],
    },
    updateResolution: {
      type: 'string',
      enum: ['patch_current', 'create_version', 'supersede', 'require_review'],
    },
    conflictResolution: {
      type: 'string',
      enum: [
        'keep_both_marked',
        'prefer_authoritative',
        'prefer_verified',
        'prefer_latest',
        'invalidate_old',
        'require_review',
      ],
    },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const memoryExtractionProfileSpecDefinition = defineSpecSchema<MemoryExtractionProfileSpec>({
  id: 'MemoryExtractionProfileSpec',
  zod: memoryExtractionProfileSpecSchema,
  jsonSchema: memoryExtractionProfileSpecJsonSchema,
  example: memoryExtractionProfileSpecExample,
});

export const memoryMaintenancePolicySpecDefinition = defineSpecSchema<MemoryMaintenancePolicySpec>({
  id: 'MemoryMaintenancePolicySpec',
  zod: memoryMaintenancePolicySpecSchema,
  jsonSchema: memoryMaintenancePolicySpecJsonSchema,
  example: memoryMaintenancePolicySpecExample,
});

export const memoryLifecycleSpecDefinitions = [
  memoryExtractionProfileSpecDefinition,
  memoryMaintenancePolicySpecDefinition,
] as const;

export const memoryLifecycleJsonSchemas = exportSpecJsonSchemas(memoryLifecycleSpecDefinitions);

export function validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec {
  return memoryExtractionProfileSpecDefinition.parse(input);
}

export function validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec {
  return memoryMaintenancePolicySpecDefinition.parse(input);
}
