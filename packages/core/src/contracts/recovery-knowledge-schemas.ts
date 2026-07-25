import { z, type ZodType } from 'zod';
import type { JsonSchema } from '../specs';
import {
  RECOVERY_STRATEGIES,
  type RecoveryKnowledge,
  type RecoveryKnowledgeKey,
  type RecoveryKnowledgeScope,
} from './recovery';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });

export const recoveryKnowledgeScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    workspaceId: nonEmptyStringSchema.optional(),
    sessionId: nonEmptyStringSchema.optional(),
    agentId: nonEmptyStringSchema.optional(),
    domainPackId: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RecoveryKnowledgeScope>;

export const recoveryKnowledgeKeySchema = z
  .object({
    fingerprint: nonEmptyStringSchema,
    participantId: nonEmptyStringSchema,
    scope: recoveryKnowledgeScopeSchema.optional(),
    policyRevision: nonEmptyStringSchema.optional(),
    specRevision: nonEmptyStringSchema.optional(),
    providerRevision: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RecoveryKnowledgeKey>;

export const scopedRecoveryKnowledgeKeySchema = recoveryKnowledgeKeySchema.extend({
  scope: recoveryKnowledgeScopeSchema,
});

export const recoveryKnowledgeSchema = z
  .object({
    key: recoveryKnowledgeKeySchema,
    strategy: z.enum(RECOVERY_STRATEGIES),
    outcome: z.enum(['recovered', 'degraded', 'compensated', 'failed']),
    evidenceHash: nonEmptyStringSchema,
    learnedAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    validation: z
      .object({
        status: z.enum(['verified', 'negative']),
        sourceEventId: nonEmptyStringSchema.optional(),
        proof: z.record(z.unknown()).optional(),
      })
      .strict(),
  })
  .strict() satisfies ZodType<RecoveryKnowledge>;

export const scopedRecoveryKnowledgeSchema = recoveryKnowledgeSchema.extend({
  key: scopedRecoveryKnowledgeKeySchema,
});

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };

export const recoveryKnowledgeScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    domainPackId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const recoveryKnowledgeKeyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['fingerprint', 'participantId'],
  properties: {
    fingerprint: nonEmptyStringJsonSchema,
    participantId: nonEmptyStringJsonSchema,
    scope: recoveryKnowledgeScopeJsonSchema,
    policyRevision: nonEmptyStringJsonSchema,
    specRevision: nonEmptyStringJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema = {
  ...recoveryKnowledgeKeyJsonSchema,
  required: ['fingerprint', 'participantId', 'scope'],
};

export const recoveryKnowledgeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['key', 'strategy', 'outcome', 'evidenceHash', 'learnedAt', 'validation'],
  properties: {
    key: recoveryKnowledgeKeyJsonSchema,
    strategy: { type: 'string', enum: [...RECOVERY_STRATEGIES] },
    outcome: { type: 'string', enum: ['recovered', 'degraded', 'compensated', 'failed'] },
    evidenceHash: nonEmptyStringJsonSchema,
    learnedAt: { type: 'string', format: 'date-time' },
    expiresAt: { type: 'string', format: 'date-time' },
    validation: {
      type: 'object',
      required: ['status'],
      properties: {
        status: { type: 'string', enum: ['verified', 'negative'] },
        sourceEventId: nonEmptyStringJsonSchema,
        proof: { type: 'object', additionalProperties: true },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const scopedRecoveryKnowledgeJsonSchema: JsonSchema = {
  ...recoveryKnowledgeJsonSchema,
  properties: {
    ...recoveryKnowledgeJsonSchema.properties,
    key: scopedRecoveryKnowledgeKeyJsonSchema,
  },
};

export function parseRecoveryKnowledge(input: unknown): RecoveryKnowledge {
  return recoveryKnowledgeSchema.parse(input);
}

export function parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge & {
  key: RecoveryKnowledgeKey & { scope: RecoveryKnowledgeScope };
} {
  return scopedRecoveryKnowledgeSchema.parse(input);
}
