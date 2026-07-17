import { z, type ZodType } from 'zod';
import { defineSpecSchema, type JsonSchema } from '@hypha/core';
import { memoryContractSpecRefSchema } from './profile-contract';
import { managedMemoryScopeSchema, memoryPrincipalSchema } from './record-contract';
import type {
  ContextBuildRequest,
  ContextEnvelope,
  ContextItem,
  ContextProfileSpec,
  ContextSourceSpec,
} from './context-contracts';

const metadataSchema = z.record(z.unknown());
const contextSourceTypeSchema = z.enum([
  'system',
  'workflow_state',
  'messages',
  'working_memory',
  'long_term_memory',
  'tool_observation',
  'artifact',
  'human_review',
  'custom',
]);

export const contextSourceSpecSchema: ZodType<ContextSourceSpec> = z.object({
  id: z.string().min(1),
  type: contextSourceTypeSchema,
  ref: memoryContractSpecRefSchema.optional(),
  required: z.boolean().optional(),
  priority: z.number(),
  maxItems: z.number().int().positive().optional(),
  maxTokens: z.number().int().positive().optional(),
  filters: metadataSchema.optional(),
});

export const contextProfileSpecSchema: ZodType<ContextProfileSpec> = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  revision: z.string().min(1).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  sources: z.array(contextSourceSpecSchema).min(1),
  maxItems: z.number().int().positive().optional(),
  maxCharacters: z.number().int().positive().optional(),
  maxTokens: z.number().int().positive(),
  reservedOutputTokens: z.number().int().min(0).optional(),
  reservedSystemTokens: z.number().int().min(0).optional(),
  deduplication: z.enum(['none', 'id', 'hash', 'semantic']),
  semanticDedupThreshold: z.number().min(0).max(1).optional(),
  ranking: z.object({
    method: z.enum(['priority', 'score_fusion', 'reranker', 'custom']),
    recencyWeight: z.number().min(0).optional(),
    relevanceWeight: z.number().min(0).optional(),
    importanceWeight: z.number().min(0).optional(),
    confidenceWeight: z.number().min(0).optional(),
    provenanceWeight: z.number().min(0).optional(),
    sourceWeights: z.record(z.number()).optional(),
    rerankerProviderRef: memoryContractSpecRefSchema.optional(),
  }),
  truncation: z.object({
    method: z.enum(['drop_lowest', 'truncate_items', 'summarize', 'hybrid']),
    preserveRequiredSources: z.boolean(),
    preserveLatestMessages: z.number().int().min(0).optional(),
    minItemTokens: z.number().int().positive().optional(),
    truncationMarker: z.string().optional(),
  }),
  conflictPolicy: z.enum(['include_marked', 'prefer_latest', 'prefer_verified']).optional(),
  includeProvenance: z.boolean(),
  includeScores: z.boolean().optional(),
  instructionBoundary: z.enum(['strict', 'tagged', 'quoted']),
  untrustedContentPolicy: z.enum(['escape', 'tag', 'reject']),
  compactionPolicy: z
    .object({
      enabled: z.boolean(),
      triggerRatio: z.number().min(0).max(1),
      summaryProviderRef: memoryContractSpecRefSchema.optional(),
      preserveLastMessages: z.number().int().min(0).optional(),
      persistSummaryAsMemory: z.boolean().optional(),
      summaryMemoryType: z
        .enum([
          'working',
          'episodic',
          'semantic',
          'procedural',
          'preference',
          'artifact',
          'governance',
          'reflection',
          'custom',
        ])
        .optional(),
    })
    .optional(),
  metadata: metadataSchema.optional(),
});

export const contextItemSchema = z
  .object({
    id: z.string().min(1),
    sourceType: contextSourceTypeSchema,
    sourceId: z.string().optional(),
    content: z.unknown(),
    text: z.string(),
    tokenEstimate: z.number().int().min(0),
    priority: z.number(),
    score: z.number().optional(),
    required: z.boolean().optional(),
    untrusted: z.boolean().optional(),
    provenance: metadataSchema.optional(),
    conflictGroupId: z.string().optional(),
    metadata: metadataSchema.optional(),
  })
  .refine((item) => Object.prototype.hasOwnProperty.call(item, 'content'), {
    message: 'Context item content is required.',
    path: ['content'],
  });

export const contextBuildRequestSchema: ZodType<ContextBuildRequest> = z.object({
  operationId: z.string().min(1),
  principal: memoryPrincipalSchema,
  scope: managedMemoryScopeSchema,
  runId: z.string().min(1),
  stepId: z.string().optional(),
  stateId: z.string().optional(),
  profileRef: memoryContractSpecRefSchema,
  modelContextWindowTokens: z.number().int().positive(),
  reservedSystemTokens: z.number().int().min(0),
  reservedInstructionTokens: z.number().int().min(0),
  reservedOutputTokens: z.number().int().min(0),
  runtimeStateRef: z.string().optional(),
  messageCursor: z.string().optional(),
  explicitSourceRefs: z.array(z.string()).optional(),
  query: z.string().optional(),
  previousContextHash: z.string().optional(),
  metadata: metadataSchema.optional(),
});

export const contextProfileSpecExample: ContextProfileSpec = {
  id: 'context.default',
  version: '1.0.0',
  revision: 'context-default-v1',
  sources: [
    { id: 'system', type: 'system', required: true, priority: 100, maxTokens: 1000 },
    { id: 'messages', type: 'messages', required: true, priority: 80, maxTokens: 4000 },
    { id: 'memory', type: 'long_term_memory', priority: 60, maxTokens: 3000 },
  ],
  maxItems: 100,
  maxTokens: 8000,
  deduplication: 'hash',
  ranking: { method: 'score_fusion', relevanceWeight: 1, provenanceWeight: 0.2 },
  truncation: { method: 'hybrid', preserveRequiredSources: true, minItemTokens: 16 },
  includeProvenance: true,
  includeScores: true,
  instructionBoundary: 'strict',
  untrustedContentPolicy: 'tag',
};

export const contextProfileSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'sources',
    'maxTokens',
    'deduplication',
    'ranking',
    'truncation',
    'includeProvenance',
    'instructionBoundary',
    'untrustedContentPolicy',
  ],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    revision: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    sources: { type: 'array', items: { type: 'object' } },
    maxItems: { type: 'number' },
    maxCharacters: { type: 'number' },
    maxTokens: { type: 'number' },
    reservedOutputTokens: { type: 'number' },
    reservedSystemTokens: { type: 'number' },
    deduplication: { enum: ['none', 'id', 'hash', 'semantic'] },
    semanticDedupThreshold: { type: 'number' },
    ranking: { type: 'object' },
    truncation: { type: 'object' },
    conflictPolicy: { type: 'string' },
    includeProvenance: { type: 'boolean' },
    includeScores: { type: 'boolean' },
    instructionBoundary: { enum: ['strict', 'tagged', 'quoted'] },
    untrustedContentPolicy: { enum: ['escape', 'tag', 'reject'] },
    compactionPolicy: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const contextProfileSpecDefinition = defineSpecSchema<ContextProfileSpec>({
  id: 'ContextProfileSpec',
  zod: contextProfileSpecSchema,
  jsonSchema: contextProfileSpecJsonSchema,
  example: contextProfileSpecExample,
});

export function validateContextProfileSpec(input: unknown): ContextProfileSpec {
  return contextProfileSpecDefinition.parse(input);
}

export function validateContextItem(input: unknown): ContextItem {
  return contextItemSchema.parse(input) as ContextItem;
}

export const contextSourceBudgetSchema = z.object({
  sourceId: z.string().min(1),
  minTokens: z.number().int().min(0).optional(),
  targetTokens: z.number().int().min(0).optional(),
  maxTokens: z.number().int().min(0),
  required: z.boolean(),
  overflowPolicy: z.enum(['drop', 'truncate', 'summarize', 'spill_to_artifact', 'fail']),
});

export const contextBudgetPlanSchema = z.object({
  totalAvailableTokens: z.number().int().positive(),
  fixedTokens: z.number().int().min(0),
  dynamicTokens: z.number().int().min(0),
  sourceBudgets: z.array(contextSourceBudgetSchema),
  tokenizerRef: memoryContractSpecRefSchema,
  safetyMarginTokens: z.number().int().min(0),
});

export const promptSegmentSchema = z.object({
  id: z.string().min(1),
  role: z.enum(['system', 'developer', 'user', 'assistant', 'tool', 'data']),
  text: z.string(),
  tokenCount: z.number().int().min(0),
  trustLevel: z.enum(['trusted_instruction', 'trusted_data', 'untrusted_data']),
  sourceRefs: z.array(z.string()),
  required: z.boolean().optional(),
});

export const contextProvenanceLabelSchema = z.object({
  sourceType: contextSourceTypeSchema,
  sourceId: z.string().min(1),
  memoryId: z.string().optional(),
  memoryVersionId: z.string().optional(),
  authority: z
    .enum(['unverified', 'user_asserted', 'system_observed', 'verified', 'authoritative'])
    .optional(),
  observedAt: z.string().optional(),
  citationLabel: z.string().min(1),
});

export const contextTruncationRecordSchema = z.object({
  itemId: z.string().min(1),
  originalTokens: z.number().int().min(0),
  retainedTokens: z.number().int().min(0),
  method: z.enum(['drop', 'truncate', 'summarize']),
  reason: z.string().min(1),
});

export const contextConflictSchema = z.object({
  conflictGroupId: z.string().min(1),
  itemIds: z.array(z.string()).min(2),
  resolution: z.string().optional(),
});

export const contextEnvelopeSchema: ZodType<ContextEnvelope> = z
  .object({
    id: z.string().min(1),
    runId: z.string().min(1),
    stepId: z.string().optional(),
    contextHash: z.string().min(1),
    profileRevision: z.string().min(1),
    budgetPlan: contextBudgetPlanSchema,
    systemSegments: z.array(promptSegmentSchema),
    instructionSegments: z.array(promptSegmentSchema),
    dataSegments: z.array(promptSegmentSchema),
    includedSourceRefs: z.array(z.string()),
    omittedSourceRefs: z.array(z.string()),
    truncationRecords: z.array(contextTruncationRecordSchema),
    provenanceIndex: z.record(contextProvenanceLabelSchema),
    conflicts: z.array(contextConflictSchema),
    totalTokens: z.number().int().min(0),
    createdAt: z.string().min(1),
  })
  .superRefine((envelope, context) => {
    if (envelope.systemSegments.some((segment) => segment.role !== 'system')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['systemSegments'],
        message: 'System segments must use the system role.',
      });
    }
    if (envelope.dataSegments.some((segment) => segment.role !== 'data')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dataSegments'],
        message: 'Memory and other contextual data must use the data role.',
      });
    }
    if (envelope.totalTokens > envelope.budgetPlan.totalAvailableTokens) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['totalTokens'],
        message: 'Context envelope exceeds its token budget.',
      });
    }
  });

export function validateContextEnvelope(input: unknown): ContextEnvelope {
  return contextEnvelopeSchema.parse(input);
}
