import { z } from 'zod';
import type { CacheBlock, WorkCachePolicy, WorkCacheScope } from './types';

const nonEmptyString = z.string().min(1);
export const workCacheJsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number(),
    z.string(),
    z.array(workCacheJsonValueSchema),
    z.record(z.string(), workCacheJsonValueSchema),
  ])
);

export const workCacheScopeSchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString.optional(),
    workspaceId: nonEmptyString.optional(),
    sessionId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    domainPackId: nonEmptyString.optional(),
  })
  .strict();

export const cacheBlockSchema = z
  .object({
    schemaVersion: z.literal('1.0').optional(),
    keyVersion: z.literal('1').optional(),
    id: nonEmptyString,
    treeType: z.enum([
      'PlanTree',
      'ComputationTree',
      'ToolTree',
      'ObservationTree',
      'VerificationTree',
      'MemoryTree',
      'RecoveryTree',
      'PromptPrefixTree',
    ]),
    nodeType: z.enum([
      'plan',
      'computation',
      'tool',
      'observation',
      'verification',
      'memory',
      'recovery',
      'prompt_prefix',
    ]),
    cacheKey: nonEmptyString,
    value: workCacheJsonValueSchema,
    createdAt: z.number().int().nonnegative(),
    updatedAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().nonnegative().optional(),
    sourceEventId: nonEmptyString,
    sourceEventType: nonEmptyString,
    scope: workCacheScopeSchema.optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
    provenance: z.record(z.string(), workCacheJsonValueSchema).optional(),
    validity: z
      .object({
        status: z.enum(['valid', 'invalid', 'unknown']),
        proof: z.record(z.string(), workCacheJsonValueSchema).optional(),
        sourceHashes: z.record(z.string(), z.string()).optional(),
        provenanceHash: nonEmptyString.optional(),
        expiresAt: z.number().int().nonnegative().optional(),
      })
      .strict(),
    utility: z
      .object({
        score: z.number().finite(),
        reuseCount: z.number().nonnegative().optional(),
        recomputeCost: z.number().nonnegative().optional(),
        staleRisk: z.number().nonnegative().optional(),
        futureDemand: z.number().nonnegative().optional(),
        downstreamFanout: z.number().nonnegative().optional(),
        validationCost: z.number().nonnegative().optional(),
      })
      .strict(),
    metadata: z.record(z.string(), workCacheJsonValueSchema).optional(),
    tags: z.array(nonEmptyString).optional(),
  })
  .strict();

export const workCachePolicySchema = z
  .object({
    enabled: z.boolean(),
    store: z.enum(['off', 'memory', 'sqlite', 'redis']),
    failureMode: z.enum(['bypass', 'strict']),
    scopeRequirement: z.enum(['none', 'user', 'session']),
    operationTimeoutMs: z.number().int().positive(),
    maxBlockBytes: z.number().int().positive(),
    promptBudgetTokens: z.number().int().positive(),
    unknownEventPolicy: z.enum(['ignore', 'reject']),
    allowExtensionEvents: z.boolean(),
    trees: z.record(
      z.string(),
      z
        .object({
          enabled: z.boolean(),
          ttlMs: z.number().int().positive().optional(),
          maxEntries: z.number().int().positive().optional(),
        })
        .strict()
    ),
  })
  .strict();

export const workCacheJsonSchemas = {
  WorkCacheScope: {
    type: 'object',
    properties: Object.fromEntries(
      ['tenantId', 'userId', 'workspaceId', 'sessionId', 'agentId', 'domainPackId'].map((key) => [
        key,
        { type: 'string', minLength: 1 },
      ])
    ),
    additionalProperties: false,
  },
  CacheBlock: {
    type: 'object',
    required: [
      'id',
      'treeType',
      'nodeType',
      'cacheKey',
      'value',
      'createdAt',
      'updatedAt',
      'sourceEventId',
      'sourceEventType',
      'validity',
      'utility',
    ],
    properties: {
      schemaVersion: { const: '1.0' },
      keyVersion: { const: '1' },
      id: { type: 'string', minLength: 1 },
      treeType: {
        enum: [
          'PlanTree',
          'ComputationTree',
          'ToolTree',
          'ObservationTree',
          'VerificationTree',
          'MemoryTree',
          'RecoveryTree',
          'PromptPrefixTree',
        ],
      },
      nodeType: {
        enum: [
          'plan',
          'computation',
          'tool',
          'observation',
          'verification',
          'memory',
          'recovery',
          'prompt_prefix',
        ],
      },
      cacheKey: { type: 'string', minLength: 1 },
      value: {},
      createdAt: { type: 'integer', minimum: 0 },
      updatedAt: { type: 'integer', minimum: 0 },
      expiresAt: { type: 'integer', minimum: 0 },
      sourceEventId: { type: 'string', minLength: 1 },
      sourceEventType: { type: 'string', minLength: 1 },
      scope: { $ref: '#/$defs/WorkCacheScope' },
      validity: { type: 'object' },
      utility: { type: 'object' },
      metadata: { type: 'object' },
      tags: { type: 'array', items: { type: 'string', minLength: 1 } },
    },
    additionalProperties: false,
  },
  WorkCachePolicy: {
    type: 'object',
    required: [
      'enabled',
      'store',
      'failureMode',
      'scopeRequirement',
      'operationTimeoutMs',
      'maxBlockBytes',
      'promptBudgetTokens',
      'unknownEventPolicy',
      'allowExtensionEvents',
      'trees',
    ],
    properties: {
      enabled: { type: 'boolean' },
      store: { enum: ['off', 'memory', 'sqlite', 'redis'] },
      failureMode: { enum: ['bypass', 'strict'] },
      scopeRequirement: { enum: ['none', 'user', 'session'] },
      operationTimeoutMs: { type: 'integer', minimum: 1 },
      maxBlockBytes: { type: 'integer', minimum: 1 },
      promptBudgetTokens: { type: 'integer', minimum: 1 },
      unknownEventPolicy: { enum: ['ignore', 'reject'] },
      allowExtensionEvents: { type: 'boolean' },
      trees: { type: 'object' },
    },
    additionalProperties: false,
  },
} as const;

export function validateCacheBlock<T = unknown>(input: unknown): CacheBlock<T> {
  return cacheBlockSchema.parse(input) as CacheBlock<T>;
}

export function validateWorkCacheScope(input: unknown): WorkCacheScope {
  return workCacheScopeSchema.parse(input) as WorkCacheScope;
}

export function validateWorkCachePolicy(input: unknown): WorkCachePolicy {
  return workCachePolicySchema.parse(input) as WorkCachePolicy;
}
