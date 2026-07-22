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
    canonicalConsumption: z
      .object({
        serviceRegistration: z.literal('single'),
        minimumProfileSwitchCases: z.literal(2),
        compositionReceiptRequired: z.literal(true),
        allowedLegacyAdapterResponsibilities: z.tuple([
          z.literal('delegate'),
          z.literal('scope_mapping'),
          z.literal('error_mapping'),
        ]),
        prohibitedLegacyAdapterResponsibilities: z.tuple([
          z.literal('business_rules'),
          z.literal('provider_selection'),
          z.literal('independent_persistence'),
        ]),
      })
      .strict(),
    migration: z
      .object({
        phases: z.tuple([
          z.literal('planned'),
          z.literal('shadow_read'),
          z.literal('bounded_dual_write'),
          z.literal('verify'),
          z.literal('cutover'),
          z.literal('retire'),
          z.literal('rollback'),
        ]),
        dualWriteRequirements: z.tuple([
          z.literal('deadlineAt'),
          z.literal('revision'),
          z.literal('idempotencyKey'),
          z.literal('checkpointRef'),
        ]),
        requiredEventFields: z.tuple([
          z.literal('migrationRevision'),
          z.literal('activePath'),
          z.literal('shadowResult'),
          z.literal('reason'),
        ]),
        retirementConditions: z.tuple([
          z.literal('legacyReadTraffic'),
          z.literal('legacyWriteTraffic'),
          z.literal('reconciliationPassed'),
          z.literal('rollbackWindowClosed'),
          z.literal('legacyImports'),
          z.literal('legacyRegistrations'),
        ]),
      })
      .strict(),
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
        trimPrecision: z.literal('exact'),
        maxZeroBehavior: z.literal('clear'),
        newestReadCommand: z.literal('XREVRANGE'),
        emptyLatestResult: z.literal('null'),
        cleanupCommand: z.literal('SCAN'),
        scanBudgetRequired: z.literal(true),
        requiredBoundaryCases: z.tuple([
          z.literal('max_zero'),
          z.literal('empty_to_one'),
          z.literal('at_max'),
          z.literal('max_plus_one'),
          z.literal('large_batch'),
          z.literal('concurrent'),
          z.literal('scope_isolation'),
          z.literal('restart_latest'),
          z.literal('empty_latest'),
          z.literal('scan_multi_page'),
          z.literal('repeated_cursor'),
        ]),
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
    'canonicalConsumption',
    'migration',
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
    canonicalConsumption: strictObject(
      [
        'serviceRegistration',
        'minimumProfileSwitchCases',
        'compositionReceiptRequired',
        'allowedLegacyAdapterResponsibilities',
        'prohibitedLegacyAdapterResponsibilities',
      ],
      {
        serviceRegistration: { enum: ['single'] },
        minimumProfileSwitchCases: { type: 'integer', minimum: 2 },
        compositionReceiptRequired: { enum: [true] },
        allowedLegacyAdapterResponsibilities: {
          type: 'array',
          items: { enum: ['delegate', 'scope_mapping', 'error_mapping'] },
          minItems: 3,
        },
        prohibitedLegacyAdapterResponsibilities: {
          type: 'array',
          items: { enum: ['business_rules', 'provider_selection', 'independent_persistence'] },
          minItems: 3,
        },
      }
    ),
    migration: strictObject(
      ['phases', 'dualWriteRequirements', 'requiredEventFields', 'retirementConditions'],
      {
        phases: {
          type: 'array',
          items: {
            enum: [
              'planned',
              'shadow_read',
              'bounded_dual_write',
              'verify',
              'cutover',
              'retire',
              'rollback',
            ],
          },
          minItems: 7,
        },
        dualWriteRequirements: { type: 'array', items: { type: 'string' }, minItems: 4 },
        requiredEventFields: { type: 'array', items: { type: 'string' }, minItems: 4 },
        retirementConditions: { type: 'array', items: { type: 'string' }, minItems: 6 },
      }
    ),
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
        'trimPrecision',
        'maxZeroBehavior',
        'newestReadCommand',
        'emptyLatestResult',
        'cleanupCommand',
        'scanBudgetRequired',
        'requiredBoundaryCases',
        'prohibitedCommands',
        'retentionCases',
      ],
      {
        trimMode: { enum: ['MAXLEN'] },
        trimArgumentSemantics: { enum: ['target_max_length'] },
        trimPrecision: { enum: ['exact'] },
        maxZeroBehavior: { enum: ['clear'] },
        newestReadCommand: { enum: ['XREVRANGE'] },
        emptyLatestResult: { enum: ['null'] },
        cleanupCommand: { enum: ['SCAN'] },
        scanBudgetRequired: { enum: [true] },
        requiredBoundaryCases: { type: 'array', items: { type: 'string' }, minItems: 11 },
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
