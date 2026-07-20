import { z, type ZodType } from 'zod';
import type {
  ExecutionAuthorizationEvidence,
  ExecutionAuthorizationVerificationResult,
  ExecutionDispatchRequest,
} from '../../contracts/execution-port';
import type { JsonSchema } from '../../specs';
import {
  executionActivityRequestExample,
  executionActivityRequestJsonSchema,
  executionActivityRequestSchema,
} from '../execution-activities';
import {
  executionRiskAssessmentExample,
  executionRiskAssessmentJsonSchema,
  executionRiskAssessmentSchema,
  executionToolBindingExample,
  executionToolBindingJsonSchema,
  executionToolBindingSchema,
} from '../execution-governance/contracts';

const nonEmptyString = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const toolInputHashSchema = z.string().regex(/^[a-f0-9]{64}$/u, {
  message: 'must be a lowercase SHA-256 digest without a prefix',
});

export const executionAuthorizationEvidenceSchema = z
  .object({
    id: nonEmptyString,
    invocationId: nonEmptyString,
    activityId: nonEmptyString,
    runId: nonEmptyString,
    toolId: nonEmptyString,
    toolRevision: nonEmptyString.optional(),
    contractSnapshotRef: nonEmptyString.optional(),
    principalId: nonEmptyString,
    inputHash: toolInputHashSchema,
    policyDecisionRef: nonEmptyString,
    riskAssessmentId: nonEmptyString,
    approvalRef: nonEmptyString.optional(),
    authorizedAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.expiresAt && Date.parse(value.expiresAt) <= Date.parse(value.authorizedAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'must be later than authorizedAt',
      });
    }
  }) satisfies ZodType<ExecutionAuthorizationEvidence>;

export const executionDispatchRequestSchema = z
  .object({
    activity: executionActivityRequestSchema,
    binding: executionToolBindingSchema,
    riskAssessment: executionRiskAssessmentSchema,
    authorization: executionAuthorizationEvidenceSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.authorization.activityId !== value.activity.activityId) {
      mismatch(context, ['authorization', 'activityId'], 'activityId');
    }
    if (value.authorization.runId !== value.activity.runId) {
      mismatch(context, ['authorization', 'runId'], 'runId');
    }
    if (value.authorization.toolId !== value.binding.toolId) {
      mismatch(context, ['authorization', 'toolId'], 'Tool binding');
    }
    if (value.authorization.riskAssessmentId !== value.riskAssessment.id) {
      mismatch(context, ['authorization', 'riskAssessmentId'], 'risk assessment');
    }
    if (value.authorization.principalId !== value.activity.request.principal.principalId) {
      mismatch(context, ['authorization', 'principalId'], 'Execution principal');
    }
    if (value.riskAssessment.requiresApproval && !value.authorization.approvalRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['authorization', 'approvalRef'],
        message: 'is required when the Execution risk assessment requires approval',
      });
    }
    const scopes = new Set(value.activity.request.principal.permissionScopes);
    const missingScopes = value.binding.requiredScopes.filter((scope) => !scopes.has(scope));
    if (missingScopes.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['binding', 'requiredScopes'],
        message: `Execution principal is missing required scopes: ${missingScopes.join(', ')}`,
      });
    }
  }) satisfies ZodType<ExecutionDispatchRequest>;

export const executionAuthorizationVerificationResultSchema = z
  .object({
    valid: z.boolean(),
    verificationRef: nonEmptyString,
    verifiedAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    reason: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (!value.valid && !value.reason) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reason'],
        message: 'is required when authorization evidence is invalid',
      });
    }
    if (value.valid && value.reason) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reason'],
        message: 'must not be present when authorization evidence is valid',
      });
    }
    if (value.expiresAt && Date.parse(value.expiresAt) <= Date.parse(value.verifiedAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'must be later than verifiedAt',
      });
    }
  }) satisfies ZodType<ExecutionAuthorizationVerificationResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const executionAuthorizationEvidenceJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'invocationId',
    'activityId',
    'runId',
    'toolId',
    'principalId',
    'inputHash',
    'policyDecisionRef',
    'riskAssessmentId',
    'authorizedAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    invocationId: nonEmptyStringJsonSchema,
    activityId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    toolId: nonEmptyStringJsonSchema,
    toolRevision: nonEmptyStringJsonSchema,
    contractSnapshotRef: nonEmptyStringJsonSchema,
    principalId: nonEmptyStringJsonSchema,
    inputHash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
    policyDecisionRef: nonEmptyStringJsonSchema,
    riskAssessmentId: nonEmptyStringJsonSchema,
    approvalRef: nonEmptyStringJsonSchema,
    authorizedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const executionDispatchRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activity', 'binding', 'riskAssessment', 'authorization'],
  properties: {
    activity: executionActivityRequestJsonSchema,
    binding: executionToolBindingJsonSchema,
    riskAssessment: executionRiskAssessmentJsonSchema,
    authorization: executionAuthorizationEvidenceJsonSchema,
  },
  additionalProperties: false,
};

export const executionAuthorizationVerificationResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['valid', 'verificationRef', 'verifiedAt'],
  properties: {
    valid: { type: 'boolean' },
    verificationRef: nonEmptyStringJsonSchema,
    verifiedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    reason: nonEmptyStringJsonSchema,
  },
  allOf: [
    {
      if: { properties: { valid: { const: false } }, required: ['valid'] },
      then: { properties: { reason: nonEmptyStringJsonSchema }, required: ['reason'] },
      else: { not: { properties: { reason: {} }, required: ['reason'] } },
    },
  ],
  additionalProperties: false,
};

export const executionPortJsonSchemas: Record<string, JsonSchema> = {
  ExecutionAuthorizationEvidence: executionAuthorizationEvidenceJsonSchema,
  ExecutionDispatchRequest: executionDispatchRequestJsonSchema,
  ExecutionAuthorizationVerificationResult: executionAuthorizationVerificationResultJsonSchema,
};

export const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence = {
  id: 'execution-authorization:invocation.example',
  invocationId: 'tool-invocation.example',
  activityId: executionActivityRequestExample.activityId,
  runId: executionActivityRequestExample.runId,
  toolId: executionToolBindingExample.toolId,
  toolRevision: 'tool-revision.example',
  contractSnapshotRef: 'tool-contract-snapshot:run.example',
  principalId: executionActivityRequestExample.request.principal.principalId,
  inputHash: 'a'.repeat(64),
  policyDecisionRef: 'policy-decision:tool-invocation.example',
  riskAssessmentId: executionRiskAssessmentExample.id,
  approvalRef: 'tool-approval:tool-invocation.example',
  authorizedAt: '2026-07-20T12:00:01.000Z',
  expiresAt: '2026-07-20T12:05:01.000Z',
};

export const executionDispatchRequestExample: ExecutionDispatchRequest = {
  activity: executionActivityRequestExample,
  binding: {
    ...executionToolBindingExample,
    requiredScopes: ['execution:command:run'],
  },
  riskAssessment: executionRiskAssessmentExample,
  authorization: executionAuthorizationEvidenceExample,
};

export const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult =
  {
    valid: true,
    verificationRef: 'execution-authorization-verification:invocation.example',
    verifiedAt: '2026-07-20T12:00:02.000Z',
    expiresAt: executionAuthorizationEvidenceExample.expiresAt,
  };

export function validateExecutionAuthorizationEvidence(
  input: unknown
): ExecutionAuthorizationEvidence {
  return executionAuthorizationEvidenceSchema.parse(input);
}

export function validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest {
  return executionDispatchRequestSchema.parse(input);
}

export function validateExecutionAuthorizationVerificationResult(
  input: unknown
): ExecutionAuthorizationVerificationResult {
  return executionAuthorizationVerificationResultSchema.parse(input);
}

function mismatch(context: z.RefinementCtx, path: Array<string | number>, expected: string): void {
  context.addIssue({
    code: z.ZodIssueCode.custom,
    path,
    message: `must match the ${expected}`,
  });
}
