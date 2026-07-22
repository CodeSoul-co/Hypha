import { z, type ZodType } from 'zod';
import type { JsonSchema } from '@hypha/core';
import type { MemoryServerMigrationAcceptance } from './memory-server-migration-contract';
import { memoryContractSpecRefJsonSchema, memoryContractSpecRefSchema } from './profile-contract';
import { managedMemoryScopeSchema, normalizedMemoryErrorSchema } from './record-contract';

export const memoryServerMigrationAcceptanceSchema: ZodType<MemoryServerMigrationAcceptance> = z
  .object({
    contractRef: memoryContractSpecRefSchema,
    issues: z.tuple([z.literal('P0-1'), z.literal('P0-2'), z.literal('P0-3')]),
    canonicalService: z.literal('@hypha/memory.MemoryApplicationService'),
    requiredConsumers: z.tuple([
      z.literal('chat'),
      z.literal('memory-routes'),
      z.literal('tool'),
      z.literal('workflow'),
      z.literal('harness'),
    ]),
    prohibitedRuntimeDependencies: z.tuple([
      z.literal('TemporaryMemory'),
      z.literal('PermanentMemory'),
    ]),
    sharedFixture: z
      .object({
        scope: managedMemoryScopeSchema,
        observedAt: z.string().datetime(),
        canonicalServiceInstanceId: z.string().min(1),
        migration: z
          .object({
            revision: z.string().min(1),
            phase: z.literal('planned'),
            deadlineAt: z.string().datetime(),
          })
          .strict(),
        failure: z
          .object({
            operation: z.literal('get'),
            providerId: z.string().min(1),
            expectedError: normalizedMemoryErrorSchema,
          })
          .strict(),
      })
      .strict(),
    redisWorkingMemory: z
      .object({
        trimMode: z.literal('MAXLEN'),
        trimArgumentSemantics: z.literal('target_max_length'),
        newestReadCommand: z.literal('XREVRANGE'),
        cleanupCommand: z.literal('SCAN'),
        prohibitedCommands: z.tuple([
          z.literal('XTRIM MAXLEN with deletion count'),
          z.literal('XRANGE + -'),
          z.literal('KEYS'),
        ]),
        retentionCases: z.array(
          z
            .object({
              beforeAppend: z.number().int().nonnegative(),
              maxMessages: z.number().int().nonnegative(),
              expectedAfterAppend: z.number().int().nonnegative(),
            })
            .strict()
        ),
      })
      .strict(),
    permanentMemory: z
      .object({
        emptyResultCause: z.literal('not_found_only'),
        providerFailureResult: z.literal('normalized_error'),
        requiredFailureDisposition: z.literal('retry_reconcile_or_quarantine'),
      })
      .strict(),
  })
  .strict();

const nonEmptyString: JsonSchema = { type: 'string', minLength: 1 };
const strictObject = (required: string[], properties: Record<string, JsonSchema>): JsonSchema => ({
  type: 'object',
  required,
  properties,
  additionalProperties: false,
});

export const memoryServerMigrationAcceptanceJsonSchema: JsonSchema = strictObject(
  [
    'contractRef',
    'issues',
    'canonicalService',
    'requiredConsumers',
    'prohibitedRuntimeDependencies',
    'sharedFixture',
    'redisWorkingMemory',
    'permanentMemory',
  ],
  {
    contractRef: memoryContractSpecRefJsonSchema,
    issues: { type: 'array', items: { enum: ['P0-1', 'P0-2', 'P0-3'] }, minItems: 3 },
    canonicalService: { enum: ['@hypha/memory.MemoryApplicationService'] },
    requiredConsumers: {
      type: 'array',
      items: { enum: ['chat', 'memory-routes', 'tool', 'workflow', 'harness'] },
      minItems: 5,
    },
    prohibitedRuntimeDependencies: {
      type: 'array',
      items: { enum: ['TemporaryMemory', 'PermanentMemory'] },
      minItems: 2,
    },
    sharedFixture: strictObject(
      ['scope', 'observedAt', 'canonicalServiceInstanceId', 'migration', 'failure'],
      {
        scope: strictObject(['userId'], {
          tenantId: nonEmptyString,
          userId: nonEmptyString,
          workspaceId: nonEmptyString,
          projectId: nonEmptyString,
          sessionId: nonEmptyString,
          runId: nonEmptyString,
          agentId: nonEmptyString,
          domainPackId: nonEmptyString,
        }),
        observedAt: { type: 'string', format: 'date-time' },
        canonicalServiceInstanceId: nonEmptyString,
        migration: strictObject(['revision', 'phase', 'deadlineAt'], {
          revision: nonEmptyString,
          phase: { enum: ['planned'] },
          deadlineAt: { type: 'string', format: 'date-time' },
        }),
        failure: strictObject(['operation', 'providerId', 'expectedError'], {
          operation: { enum: ['get'] },
          providerId: nonEmptyString,
          expectedError: strictObject(['code', 'message', 'retryable'], {
            code: { type: 'string' },
            message: nonEmptyString,
            retryable: { type: 'boolean' },
            providerCode: { type: 'string' },
            details: { type: 'object', additionalProperties: true },
            causeRef: { type: 'string' },
          }),
        }),
      }
    ),
    redisWorkingMemory: strictObject(
      [
        'trimMode',
        'trimArgumentSemantics',
        'newestReadCommand',
        'cleanupCommand',
        'prohibitedCommands',
        'retentionCases',
      ],
      {
        trimMode: { enum: ['MAXLEN'] },
        trimArgumentSemantics: { enum: ['target_max_length'] },
        newestReadCommand: { enum: ['XREVRANGE'] },
        cleanupCommand: { enum: ['SCAN'] },
        prohibitedCommands: { type: 'array', items: { type: 'string' }, minItems: 3 },
        retentionCases: {
          type: 'array',
          items: strictObject(['beforeAppend', 'maxMessages', 'expectedAfterAppend'], {
            beforeAppend: { type: 'integer', minimum: 0 },
            maxMessages: { type: 'integer', minimum: 0 },
            expectedAfterAppend: { type: 'integer', minimum: 0 },
          }),
        },
      }
    ),
    permanentMemory: strictObject(
      ['emptyResultCause', 'providerFailureResult', 'requiredFailureDisposition'],
      {
        emptyResultCause: { enum: ['not_found_only'] },
        providerFailureResult: { enum: ['normalized_error'] },
        requiredFailureDisposition: { enum: ['retry_reconcile_or_quarantine'] },
      }
    ),
  }
);

export function validateMemoryServerMigrationAcceptance(
  input: unknown
): MemoryServerMigrationAcceptance {
  return memoryServerMigrationAcceptanceSchema.parse(input);
}
