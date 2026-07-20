import { z, type ZodType } from 'zod';
import type { CacheEntry, CachePolicy, CacheScope, CachedModelResponseProjection } from './types';

const nonEmptyString = z.string().min(1);
export const servingCacheJsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number(),
    z.string(),
    z.array(servingCacheJsonValueSchema),
    z.record(z.string(), servingCacheJsonValueSchema),
  ])
);

export const cacheScopeSchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString.optional(),
    projectId: nonEmptyString.optional(),
    sessionId: nonEmptyString.optional(),
    domainPackId: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<CacheScope>;

export const cachedModelResponseProjectionSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    providerId: nonEmptyString.optional(),
    model: nonEmptyString.optional(),
    content: z.string(),
    toolCalls: z
      .array(
        z
          .object({
            id: nonEmptyString,
            toolId: nonEmptyString,
            arguments: servingCacheJsonValueSchema,
          })
          .strict()
      )
      .optional(),
    usage: z
      .object({
        inputTokens: z.number().nonnegative().optional(),
        outputTokens: z.number().nonnegative().optional(),
        totalTokens: z.number().nonnegative().optional(),
        cacheHitTokens: z.number().nonnegative().optional(),
        cacheMissTokens: z.number().nonnegative().optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const cachePolicySchema = z
  .object({
    enabled: z.boolean(),
    mode: z.enum(['off', 'read', 'write', 'readwrite']),
    ttlMs: z.number().positive().optional(),
    respectNoCache: z.boolean().optional(),
    failureMode: z.enum(['bypass', 'strict']).optional(),
    scopeRequirement: z.enum(['none', 'user', 'session']).optional(),
    operationTimeoutMs: z.number().int().positive().optional(),
    singleflight: z.boolean().optional(),
    maxEntryBytes: z.number().int().positive().optional(),
    circuitBreaker: z
      .object({
        failureThreshold: z.number().int().positive(),
        resetTimeoutMs: z.number().int().positive(),
      })
      .strict()
      .optional(),
  })
  .strict() satisfies ZodType<CachePolicy>;

export const cacheEntrySchema = z
  .object({
    schemaVersion: z.literal('1.0').optional(),
    keyVersion: z.literal('1').optional(),
    key: nonEmptyString,
    value: servingCacheJsonValueSchema,
    createdAt: z.number().int().nonnegative(),
    expiresAt: z.number().int().nonnegative().optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
    metadata: z
      .object({
        provider: nonEmptyString,
        model: nonEmptyString,
        cacheType: z.enum(['exact', 'prefix-metadata', 'semantic']),
        promptHash: nonEmptyString.optional(),
        toolSchemaHash: nonEmptyString.optional(),
        requestHash: nonEmptyString.optional(),
        hitCount: z.number().int().nonnegative().optional(),
        tags: z.array(nonEmptyString).optional(),
        scope: cacheScopeSchema.optional(),
        projectionType: nonEmptyString.optional(),
        classification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
        prefixMetadata: z.unknown().optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const servingCacheJsonSchemas = {
  CacheScope: {
    type: 'object',
    properties: Object.fromEntries(
      ['tenantId', 'userId', 'projectId', 'sessionId', 'domainPackId'].map((key) => [
        key,
        { type: 'string', minLength: 1 },
      ])
    ),
    additionalProperties: false,
  },
  CachedModelResponseProjection: {
    type: 'object',
    required: ['schemaVersion', 'content'],
    properties: {
      schemaVersion: { const: '1.0' },
      providerId: { type: 'string', minLength: 1 },
      model: { type: 'string', minLength: 1 },
      content: {},
      toolCalls: { type: 'array' },
      usage: { type: 'object' },
    },
    additionalProperties: false,
  },
  CacheEntry: {
    type: 'object',
    required: ['key', 'value', 'createdAt'],
    properties: {
      schemaVersion: { const: '1.0' },
      keyVersion: { const: '1' },
      key: { type: 'string', minLength: 1 },
      value: {},
      createdAt: { type: 'integer', minimum: 0 },
      expiresAt: { type: 'integer', minimum: 0 },
      sizeBytes: { type: 'integer', minimum: 0 },
      metadata: { type: 'object' },
    },
    additionalProperties: false,
  },
  CachePolicy: {
    type: 'object',
    required: ['enabled', 'mode'],
    properties: {
      enabled: { type: 'boolean' },
      mode: { enum: ['off', 'read', 'write', 'readwrite'] },
      ttlMs: { type: 'number', exclusiveMinimum: 0 },
      respectNoCache: { type: 'boolean' },
      failureMode: { enum: ['bypass', 'strict'] },
      scopeRequirement: { enum: ['none', 'user', 'session'] },
      operationTimeoutMs: { type: 'integer', minimum: 1 },
      singleflight: { type: 'boolean' },
      maxEntryBytes: { type: 'integer', minimum: 1 },
      circuitBreaker: { type: 'object' },
    },
    additionalProperties: false,
  },
} as const;

export function validateCacheEntry<T = unknown>(input: unknown): CacheEntry<T> {
  return cacheEntrySchema.parse(input) as CacheEntry<T>;
}

export function validateCachePolicy(input: unknown): CachePolicy {
  return cachePolicySchema.parse(input);
}

export function validateCachedModelResponseProjection(
  input: unknown
): CachedModelResponseProjection {
  return cachedModelResponseProjectionSchema.parse(input) as CachedModelResponseProjection;
}

export function validateServingCacheJsonValue(input: unknown): unknown {
  return servingCacheJsonValueSchema.parse(input);
}
