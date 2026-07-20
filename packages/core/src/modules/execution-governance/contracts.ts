import { z, type ZodType } from 'zod';
import type {
  ExecutionRiskAssessment,
  ExecutionSandboxLevel,
  ExecutionToolBinding,
  ExecutionToolOperation,
  ExecutionToolSideEffectLevel,
} from '../../contracts/execution-governance';
import { riskLevelSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';

const nonEmptyString = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });

export const executionToolOperationSchema = z.enum([
  'file_read',
  'file_write',
  'command',
  'sandbox',
  'artifact',
]) satisfies ZodType<ExecutionToolOperation>;

export const executionToolSideEffectLevelSchema = z.enum([
  'read',
  'write',
  'external_effect',
  'irreversible',
]) satisfies ZodType<ExecutionToolSideEffectLevel>;

export const executionSandboxLevelSchema = z.enum([
  'local',
  'container',
  'remote_isolated',
]) satisfies ZodType<ExecutionSandboxLevel>;

export const executionToolBindingSchema = z
  .object({
    toolId: nonEmptyString,
    operation: executionToolOperationSchema,
    executionProfileRef: nonEmptyString,
    requiredScopes: z.array(nonEmptyString).min(1),
    sideEffectLevel: executionToolSideEffectLevelSchema,
    humanReviewPolicyRef: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (new Set(value.requiredScopes).size !== value.requiredScopes.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['requiredScopes'],
        message: 'must not contain duplicate permission scopes',
      });
    }
  }) satisfies ZodType<ExecutionToolBinding>;

export const executionRiskAssessmentSchema = z
  .object({
    id: nonEmptyString,
    level: riskLevelSchema,
    reasons: z.array(nonEmptyString).min(1),
    matchedRules: z.array(nonEmptyString).min(1).optional(),
    requiresApproval: z.boolean(),
    recommendedSandboxLevel: executionSandboxLevelSchema.optional(),
    evaluatedAt: timestampSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (new Set(value.reasons).size !== value.reasons.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reasons'],
        message: 'must not contain duplicate risk reasons',
      });
    }
    if (value.matchedRules && new Set(value.matchedRules).size !== value.matchedRules.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['matchedRules'],
        message: 'must not contain duplicate matched rules',
      });
    }
    if ((value.level === 'high' || value.level === 'critical') && !value.requiresApproval) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['requiresApproval'],
        message: 'must be true for high or critical Execution risk',
      });
    }
  }) satisfies ZodType<ExecutionRiskAssessment>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };

export const executionToolBindingJsonSchema: JsonSchema = {
  type: 'object',
  required: ['toolId', 'operation', 'executionProfileRef', 'requiredScopes', 'sideEffectLevel'],
  properties: {
    toolId: nonEmptyStringJsonSchema,
    operation: {
      enum: ['file_read', 'file_write', 'command', 'sandbox', 'artifact'],
    },
    executionProfileRef: nonEmptyStringJsonSchema,
    requiredScopes: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      minItems: 1,
      uniqueItems: true,
    },
    sideEffectLevel: {
      enum: ['read', 'write', 'external_effect', 'irreversible'],
    },
    humanReviewPolicyRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionRiskAssessmentJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'level', 'reasons', 'requiresApproval', 'evaluatedAt'],
  properties: {
    id: nonEmptyStringJsonSchema,
    level: { enum: ['low', 'medium', 'high', 'critical'] },
    reasons: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      minItems: 1,
      uniqueItems: true,
    },
    matchedRules: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      minItems: 1,
      uniqueItems: true,
    },
    requiresApproval: { type: 'boolean' },
    recommendedSandboxLevel: { enum: ['local', 'container', 'remote_isolated'] },
    evaluatedAt: { type: 'string', format: 'date-time' },
  },
  allOf: [
    {
      if: {
        properties: { level: { enum: ['high', 'critical'] } },
        required: ['level'],
      },
      then: {
        properties: { requiresApproval: { const: true } },
        required: ['requiresApproval'],
      },
    },
  ],
  additionalProperties: false,
};

export const executionGovernanceJsonSchemas: Record<string, JsonSchema> = {
  ExecutionToolBinding: executionToolBindingJsonSchema,
  ExecutionRiskAssessment: executionRiskAssessmentJsonSchema,
};

export const executionToolBindingExample: ExecutionToolBinding = {
  toolId: 'execution.command.run',
  operation: 'command',
  executionProfileRef: 'execution-profile:container-safe:v1',
  requiredScopes: ['execution:command:run', 'workspace:read', 'workspace:write'],
  sideEffectLevel: 'external_effect',
  humanReviewPolicyRef: 'human-review:execution-high-risk:v1',
};

export const executionRiskAssessmentExample: ExecutionRiskAssessment = {
  id: 'execution-risk:operation.example',
  level: 'high',
  reasons: ['shell_execution', 'network_access'],
  matchedRules: ['execution-risk.shell', 'execution-risk.network'],
  requiresApproval: true,
  recommendedSandboxLevel: 'container',
  evaluatedAt: '2026-07-20T12:00:00.000Z',
};

export function validateExecutionToolBinding(input: unknown): ExecutionToolBinding {
  return executionToolBindingSchema.parse(input);
}

export function validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment {
  return executionRiskAssessmentSchema.parse(input);
}
