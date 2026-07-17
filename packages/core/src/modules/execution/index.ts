import { z, type ZodType } from 'zod';
import type { ExecutionPrincipal, NormalizedExecutionError } from '../../contracts/execution';
import type { JsonSchema } from '../../specs';

export * from './recovery';

export const executionErrorCodes = [
  'EXECUTION_INVALID_REQUEST',
  'EXECUTION_PERMISSION_DENIED',
  'EXECUTION_POLICY_DENIED',
  'EXECUTION_APPROVAL_REQUIRED',
  'EXECUTION_WORKSPACE_NOT_FOUND',
  'EXECUTION_PATH_ESCAPE',
  'EXECUTION_PATH_DENIED',
  'EXECUTION_QUOTA_EXCEEDED',
  'EXECUTION_ENVIRONMENT_UNAVAILABLE',
  'EXECUTION_SANDBOX_CREATE_FAILED',
  'EXECUTION_SANDBOX_START_FAILED',
  'EXECUTION_IMAGE_UNTRUSTED',
  'EXECUTION_NETWORK_DENIED',
  'EXECUTION_SECRET_DENIED',
  'EXECUTION_PROCESS_START_FAILED',
  'EXECUTION_TIMEOUT',
  'EXECUTION_IDLE_TIMEOUT',
  'EXECUTION_CANCELLED',
  'EXECUTION_OOM_KILLED',
  'EXECUTION_RESOURCE_EXCEEDED',
  'EXECUTION_OUTPUT_LIMIT',
  'EXECUTION_RESULT_UNKNOWN',
  'EXECUTION_REVISION_CONFLICT',
  'EXECUTION_LEASE_HELD',
  'EXECUTION_LEASE_LOST',
  'EXECUTION_IDEMPOTENCY_CONFLICT',
  'EXECUTION_CLEANUP_FAILED',
  'EXECUTION_INTERNAL_ERROR',
] as const;

export const executionPrincipalSchema = z.object({
  principalId: z.string().min(1),
  type: z.enum(['user', 'agent', 'service', 'system']),
  tenantId: z.string().min(1).optional(),
  userId: z.string().min(1).optional(),
  agentId: z.string().min(1).optional(),
  roles: z.array(z.string().min(1)).optional(),
  permissionScopes: z.array(z.string().min(1)),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ExecutionPrincipal>;

export const normalizedExecutionErrorSchema = z.object({
  code: z.enum(executionErrorCodes),
  message: z.string().min(1),
  retryable: z.boolean(),
  providerCode: z.union([z.string(), z.number()]).optional(),
  details: z.record(z.unknown()).optional(),
  causeRef: z.string().min(1).optional(),
}) satisfies ZodType<NormalizedExecutionError>;

export const executionPrincipalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['principalId', 'type', 'permissionScopes'],
  properties: {
    principalId: { type: 'string', minLength: 1 },
    type: { enum: ['user', 'agent', 'service', 'system'] },
    tenantId: { type: 'string', minLength: 1 },
    userId: { type: 'string', minLength: 1 },
    agentId: { type: 'string', minLength: 1 },
    roles: { type: 'array', items: { type: 'string', minLength: 1 } },
    permissionScopes: { type: 'array', items: { type: 'string', minLength: 1 } },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const normalizedExecutionErrorJsonSchema: JsonSchema = {
  type: 'object',
  required: ['code', 'message', 'retryable'],
  properties: {
    code: { enum: [...executionErrorCodes] },
    message: { type: 'string', minLength: 1 },
    retryable: { type: 'boolean' },
    providerCode: { oneOf: [{ type: 'string' }, { type: 'number' }] },
    details: { type: 'object' },
    causeRef: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};
