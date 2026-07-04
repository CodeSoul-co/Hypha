import { z, type ZodType } from 'zod';
import {
  createFrameworkEvent,
  auditPolicySpecSchema,
  defineSpecSchema,
  denyExternalEffectsPolicyEngine,
  exportSpecJsonSchemas,
  FrameworkError,
  humanReviewPolicySpecSchema,
  jsonSchemaSchema,
  retryPolicySpecSchema,
  sideEffectLevelSchema,
  timeoutPolicySpecSchema,
  type AuditPolicySpec,
  type HumanReviewPolicySpec,
  type JsonSchema,
  type PolicyEngine,
  type RetryPolicySpec,
  type SideEffectLevel,
  type TimeoutPolicySpec,
  type TraceRecorder,
  type VersionedSpec,
} from '@hypha/core';

class ToolTimeoutError extends Error {
  readonly code = 'TOOL_TIMEOUT';

  constructor(timeoutMs: number) {
    super(`Tool execution timed out after ${timeoutMs}ms.`);
    this.name = 'ToolTimeoutError';
  }
}

export interface ToolSpec {
  id: string;
  version: string;
  name?: string;
  description: string;
  inputSchema: JsonSchema;
  outputSchema?: JsonSchema;
  sideEffectLevel: SideEffectLevel;
  permissionScope?: string[];
  preconditions?: string[];
  postconditions?: string[];
  timeoutPolicy?: TimeoutPolicySpec;
  retryPolicy?: RetryPolicySpec;
  auditPolicy?: AuditPolicySpec;
  humanApprovalPolicy?: HumanReviewPolicySpec;
  source?: 'local' | 'mcp' | 'http' | 'plugin';
  sourceRef?: {
    serverId?: string;
    capabilityId?: string;
  };
}

export interface ToolCallContext {
  runId: string;
  stepId: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface ToolCallRequest<TInput = unknown> {
  toolId: string;
  input: TInput;
  context: ToolCallContext;
}

export interface ToolCallResult<TOutput = unknown> {
  toolId: string;
  output?: TOutput;
  error?: unknown;
  status: 'completed' | 'failed' | 'denied' | 'human_review_required';
}

export type ToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput,
  context: ToolCallContext
) => Promise<TOutput>;

export interface ToolRunner {
  run(request: ToolCallRequest): Promise<ToolCallResult>;
}

export type MockToolHandler = (
  request: ToolCallRequest
) => Promise<ToolCallResult> | ToolCallResult;

export class MockToolRunner implements ToolRunner {
  private readonly handlers = new Map<string, MockToolHandler>();
  private readonly results = new Map<string, ToolCallResult>();

  constructor(private readonly defaultOutput: unknown = { ok: true }) {}

  registerHandler(toolId: string, handler: MockToolHandler): void {
    this.handlers.set(toolId, handler);
  }

  registerResult(toolId: string, result: ToolCallResult): void {
    this.results.set(toolId, result);
  }

  async run(request: ToolCallRequest): Promise<ToolCallResult> {
    const handler = this.handlers.get(request.toolId);
    if (handler) return handler(request);
    const result = this.results.get(request.toolId);
    if (result) return result;
    return {
      toolId: request.toolId,
      status: 'completed',
      output: {
        toolId: request.toolId,
        input: request.input,
        output: this.defaultOutput,
      },
    };
  }
}

export class ToolRegistry {
  private readonly specs = new Map<string, ToolSpec>();
  private readonly handlers = new Map<string, ToolHandler>();

  register(spec: ToolSpec, handler: ToolHandler): void {
    const parsed = validateToolSpec(spec);
    this.specs.set(parsed.id, parsed);
    this.handlers.set(parsed.id, handler);
  }

  getSpec(toolId: string): ToolSpec | null {
    return this.specs.get(toolId) ?? null;
  }

  getHandler(toolId: string): ToolHandler | null {
    return this.handlers.get(toolId) ?? null;
  }

  list(): ToolSpec[] {
    return Array.from(this.specs.values());
  }
}

export class GovernedToolRunner implements ToolRunner {
  constructor(
    private readonly registry: ToolRegistry,
    private readonly trace: TraceRecorder,
    private readonly policy: PolicyEngine = denyExternalEffectsPolicyEngine
  ) {}

  async run(request: ToolCallRequest): Promise<ToolCallResult> {
    const spec = this.registry.getSpec(request.toolId);
    const handler = this.registry.getHandler(request.toolId);
    if (!spec || !handler) {
      throw new FrameworkError({
        code: 'TOOL_NOT_FOUND',
        message: `Tool not found: ${request.toolId}`,
        context: { toolId: request.toolId },
      });
    }
    const basePayload = toolTracePayload(request.toolId, spec);

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:requested`,
        type: 'tool.call.requested',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { ...basePayload, input: request.input },
      })
    );

    const validation = validateToolInput(spec.inputSchema, request.input);
    const validationError = validation.error;
    if (validationError) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:failed:validation`,
          type: 'tool.call.failed',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: {
            ...basePayload,
            error: validationError,
            issues: validation.issues,
            phase: 'input_validation',
          },
        })
      );
      return { toolId: request.toolId, status: 'failed', error: validationError };
    }

    const decision = await this.policy.evaluate({
      runId: request.context.runId,
      stepId: request.context.stepId,
      userId: request.context.userId,
      capabilityId: request.toolId,
      sideEffectLevel: spec.sideEffectLevel,
      input: request.input,
      metadata: {
        ...request.context.metadata,
        source: spec.source ?? 'local',
        sourceRef: spec.sourceRef,
        permissionScope: spec.permissionScope,
      },
    });

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:policy`,
        type: 'tool.policy.checked',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { ...basePayload, decision },
      })
    );

    if (!decision.allowed) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:rejected`,
          type: 'tool.call.rejected',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: { ...basePayload, decision },
        })
      );
      return { toolId: request.toolId, status: 'denied', error: decision.reason };
    }

    if (decision.requiresHumanReview || spec.humanApprovalPolicy?.required) {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:human-review`,
          type: 'human.review.requested',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: {
            ...basePayload,
            reason: decision.reason ?? spec.humanApprovalPolicy?.reason,
          },
        })
      );
      return {
        toolId: request.toolId,
        status: 'human_review_required',
        error: decision.reason ?? spec.humanApprovalPolicy?.reason,
      };
    }

    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:approved`,
        type: 'tool.call.approved',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: { ...basePayload, decision },
      })
    );
    await this.trace.record(
      createFrameworkEvent({
        id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:started`,
        type: 'tool.call.started',
        runId: request.context.runId,
        stepId: request.context.stepId,
        sessionId: request.context.sessionId,
        payload: basePayload,
      })
    );
    if (spec.source === 'mcp') {
      await this.trace.record(
        createFrameworkEvent({
          id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-started`,
          type: 'mcp.call.started',
          runId: request.context.runId,
          stepId: request.context.stepId,
          sessionId: request.context.sessionId,
          payload: {
            ...basePayload,
            serverId: spec.sourceRef?.serverId,
            capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
          },
        })
      );
    }

    const maxAttempts = Math.max(1, spec.retryPolicy?.maxAttempts ?? 1);
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const output = await executeWithTimeout(
          handler(request.input, request.context),
          spec.timeoutPolicy?.timeoutMs
        );
        if (spec.source === 'mcp') {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-completed`,
              type: 'mcp.call.completed',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                ...basePayload,
                input: request.input,
                serverId: spec.sourceRef?.serverId,
                capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
                output,
                attempts: attempt,
              },
            })
          );
        }
        const outputValidation = spec.outputSchema
          ? validateToolInput(spec.outputSchema, output)
          : undefined;
        if (outputValidation && !outputValidation.valid) {
          const outputValidationError =
            outputValidation.error ?? 'Tool output failed schema validation.';
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:failed:output-validation`,
              type: 'tool.call.failed',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                ...basePayload,
                error: outputValidationError,
                issues: outputValidation.issues,
                attempts: attempt,
                phase: 'output_validation',
              },
            })
          );
          return { toolId: request.toolId, status: 'failed', error: outputValidationError };
        }
        await this.trace.record(
          createFrameworkEvent({
            id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:completed`,
            type: 'tool.call.completed',
            runId: request.context.runId,
            stepId: request.context.stepId,
            sessionId: request.context.sessionId,
            payload: { ...basePayload, input: request.input, output, attempts: attempt },
          })
        );
        return { toolId: request.toolId, status: 'completed', output };
      } catch (error) {
        const timedOut = error instanceof ToolTimeoutError;
        const message = error instanceof Error ? error.message : String(error);
        if (timedOut) {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:timeout:${attempt}`,
              type: 'tool.call.timeout',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: { ...basePayload, attempt, timeoutMs: spec.timeoutPolicy?.timeoutMs },
            })
          );
          if (spec.timeoutPolicy?.onTimeout === 'human_review') {
            await this.trace.record(
              createFrameworkEvent({
                id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:timeout-human-review:${attempt}`,
                type: 'human.review.requested',
                runId: request.context.runId,
                stepId: request.context.stepId,
                sessionId: request.context.sessionId,
                payload: { ...basePayload, reason: message, attempt },
              })
            );
            return { toolId: request.toolId, status: 'human_review_required', error: message };
          }
        }

        if (attempt < maxAttempts && shouldRetry(error, spec, timedOut)) {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:retrying:${attempt}`,
              type: 'tool.call.retrying',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                ...basePayload,
                attempt,
                nextAttempt: attempt + 1,
                error: message,
              },
            })
          );
          await sleep(spec.retryPolicy?.backoffMs ?? 0);
          continue;
        }

        if (spec.source === 'mcp') {
          await this.trace.record(
            createFrameworkEvent({
              id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:mcp-failed`,
              type: 'mcp.call.failed',
              runId: request.context.runId,
              stepId: request.context.stepId,
              sessionId: request.context.sessionId,
              payload: {
                ...basePayload,
                serverId: spec.sourceRef?.serverId,
                capabilityId: spec.sourceRef?.capabilityId ?? request.toolId,
                error: message,
                attempts: attempt,
              },
            })
          );
        }
        await this.trace.record(
          createFrameworkEvent({
            id: `${request.context.runId}:${request.context.stepId}:${request.toolId}:failed`,
            type: 'tool.call.failed',
            runId: request.context.runId,
            stepId: request.context.stepId,
            sessionId: request.context.sessionId,
            payload: { ...basePayload, error: message, attempts: attempt },
          })
        );
        return { toolId: request.toolId, status: 'failed', error: message };
      }
    }

    return {
      toolId: request.toolId,
      status: 'failed',
      error: 'Tool failed without a terminal result.',
    };
  }
}

export interface ToolProfileSpec extends VersionedSpec {
  tools: ToolSpec[];
}

export const toolSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  name: z.string().optional(),
  description: z.string().min(1),
  inputSchema: jsonSchemaSchema,
  outputSchema: jsonSchemaSchema.optional(),
  sideEffectLevel: sideEffectLevelSchema,
  permissionScope: z.array(z.string()).optional(),
  preconditions: z.array(z.string()).optional(),
  postconditions: z.array(z.string()).optional(),
  timeoutPolicy: timeoutPolicySpecSchema.optional(),
  retryPolicy: retryPolicySpecSchema.optional(),
  auditPolicy: auditPolicySpecSchema.optional(),
  humanApprovalPolicy: humanReviewPolicySpecSchema.optional(),
  source: z.enum(['local', 'mcp', 'http', 'plugin']).optional(),
  sourceRef: z
    .object({
      serverId: z.string().optional(),
      capabilityId: z.string().optional(),
    })
    .optional(),
}) satisfies ZodType<ToolSpec>;

export const toolSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'description', 'inputSchema', 'sideEffectLevel'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    inputSchema: { type: 'object' },
    outputSchema: { type: 'object' },
    sideEffectLevel: {
      enum: ['none', 'read', 'write', 'external_effect', 'irreversible'],
    },
    permissionScope: { type: 'array', items: { type: 'string' } },
    preconditions: { type: 'array', items: { type: 'string' } },
    postconditions: { type: 'array', items: { type: 'string' } },
    timeoutPolicy: { type: 'object' },
    retryPolicy: { type: 'object' },
    auditPolicy: { type: 'object' },
    humanApprovalPolicy: { type: 'object' },
    source: { enum: ['local', 'mcp', 'http', 'plugin'] },
    sourceRef: { type: 'object' },
  },
  additionalProperties: false,
};

export const toolSpecExample: ToolSpec = {
  id: 'tool.search',
  version: '0.0.0',
  name: 'Search',
  description: 'Search local or external indexes through a governed tool call.',
  inputSchema: {
    type: 'object',
    required: ['query'],
    properties: {
      query: { type: 'string' },
    },
  },
  sideEffectLevel: 'read',
  timeoutPolicy: { timeoutMs: 5000, onTimeout: 'fail' },
  retryPolicy: { maxAttempts: 2 },
  auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
  source: 'local',
};

export const toolSpecDefinition = defineSpecSchema<ToolSpec>({
  id: 'ToolSpec',
  zod: toolSpecSchema,
  jsonSchema: toolSpecJsonSchema,
  example: toolSpecExample,
});

export const toolSpecDefinitions = [toolSpecDefinition] as const;
export const toolSpecJsonSchemas = exportSpecJsonSchemas(toolSpecDefinitions);

export function validateToolSpec(input: unknown): ToolSpec {
  return toolSpecDefinition.parse(input);
}

export interface ToolSchemaValidationIssue {
  path: string;
  message: string;
}

export interface ToolSchemaValidationResult {
  valid: boolean;
  error?: string;
  issues: ToolSchemaValidationIssue[];
}

export function validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult {
  const issues: ToolSchemaValidationIssue[] = [];
  validateSchemaValue(schema, input, '$', issues);
  return {
    valid: issues.length === 0,
    error: issues.length
      ? issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')
      : undefined,
    issues,
  };
}

async function executeWithTimeout<T>(work: Promise<T>, timeoutMs?: number): Promise<T> {
  if (!timeoutMs || timeoutMs <= 0) {
    return work;
  }
  return Promise.race([
    work,
    new Promise<T>((_resolve, reject) => {
      setTimeout(() => reject(new ToolTimeoutError(timeoutMs)), timeoutMs);
    }),
  ]);
}

function shouldRetry(error: unknown, spec: ToolSpec, timedOut: boolean): boolean {
  if (timedOut) {
    return spec.timeoutPolicy?.onTimeout === 'retry';
  }
  if (!spec.retryPolicy) {
    return false;
  }
  const retryableCodes = spec.retryPolicy.retryableCodes;
  if (!retryableCodes?.length) {
    return true;
  }
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code)
      : undefined;
  return !!code && retryableCodes.includes(code);
}

function sleep(ms: number): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toolTracePayload(toolId: string, spec: ToolSpec): Record<string, unknown> {
  return {
    toolId,
    source: spec.source ?? 'local',
    sourceRef: spec.sourceRef,
    sideEffectLevel: spec.sideEffectLevel,
    permissionScope: spec.permissionScope,
  };
}

function validateSchemaValue(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const allOf = schemaArrayKeyword(schema, 'allOf');
  if (allOf) {
    for (const nested of allOf) {
      validateSchemaValue(nested, value, path, issues);
    }
  }

  const anyOf = schemaArrayKeyword(schema, 'anyOf');
  if (anyOf && !anyOf.some((nested) => schemaMatches(nested, value))) {
    issues.push({ path, message: 'must match at least one anyOf schema' });
  }

  const oneOf = schemaArrayKeyword(schema, 'oneOf');
  if (oneOf) {
    const matches = oneOf.filter((nested) => schemaMatches(nested, value)).length;
    if (matches !== 1) {
      issues.push({ path, message: 'must match exactly one oneOf schema' });
    }
  }

  if (schema.enum && !schema.enum.some((candidate) => deepEqual(candidate, value))) {
    issues.push({ path, message: 'must be one of the declared enum values' });
    return;
  }

  const allowedTypes = schemaTypes(schema);
  if (allowedTypes.length > 0 && !allowedTypes.some((type) => typeMatches(type, value))) {
    issues.push({ path, message: `must be ${allowedTypes.join(' or ')}` });
    return;
  }

  if (allowedTypes.includes('object') || shouldValidateObject(schema, value)) {
    validateObjectSchema(schema, value, path, issues);
  }
  if (allowedTypes.includes('array') || shouldValidateArray(schema, value)) {
    validateArraySchema(schema, value, path, issues);
  }
  if (typeof value === 'string') {
    validateStringSchema(schema, value, path, issues);
  }
  if (typeof value === 'number') {
    validateNumberSchema(schema, value, path, issues);
  }
}

function validateObjectSchema(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    issues.push({ path, message: 'must be an object' });
    return;
  }
  const record = value as Record<string, unknown>;
  const properties = schema.properties ?? {};
  for (const field of schema.required ?? []) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      issues.push({ path, message: `missing required field: ${field}` });
    }
  }
  for (const [field, nested] of Object.entries(properties)) {
    if (Object.prototype.hasOwnProperty.call(record, field)) {
      validateSchemaValue(nested, record[field], `${path}.${field}`, issues);
    }
  }
  const extraKeys = Object.keys(record).filter((field) => !(field in properties));
  if (schema.additionalProperties === false) {
    for (const field of extraKeys) {
      issues.push({ path: `${path}.${field}`, message: 'additional property is not allowed' });
    }
  } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    for (const field of extraKeys) {
      validateSchemaValue(schema.additionalProperties, record[field], `${path}.${field}`, issues);
    }
  }
}

function validateArraySchema(
  schema: JsonSchema,
  value: unknown,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  if (!Array.isArray(value)) {
    issues.push({ path, message: 'must be an array' });
    return;
  }
  if (schema.items) {
    value.forEach((item, index) => {
      validateSchemaValue(schema.items as JsonSchema, item, `${path}[${index}]`, issues);
    });
  }
  const minItems = numberKeyword(schema, 'minItems');
  if (minItems !== undefined && value.length < minItems) {
    issues.push({ path, message: `must contain at least ${minItems} items` });
  }
  const maxItems = numberKeyword(schema, 'maxItems');
  if (maxItems !== undefined && value.length > maxItems) {
    issues.push({ path, message: `must contain at most ${maxItems} items` });
  }
}

function validateStringSchema(
  schema: JsonSchema,
  value: string,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const minLength = numberKeyword(schema, 'minLength');
  if (minLength !== undefined && value.length < minLength) {
    issues.push({ path, message: `must contain at least ${minLength} characters` });
  }
  const maxLength = numberKeyword(schema, 'maxLength');
  if (maxLength !== undefined && value.length > maxLength) {
    issues.push({ path, message: `must contain at most ${maxLength} characters` });
  }
  const pattern = stringKeyword(schema, 'pattern');
  if (pattern && !new RegExp(pattern).test(value)) {
    issues.push({ path, message: `must match pattern ${pattern}` });
  }
}

function validateNumberSchema(
  schema: JsonSchema,
  value: number,
  path: string,
  issues: ToolSchemaValidationIssue[]
): void {
  const minimum = numberKeyword(schema, 'minimum');
  if (minimum !== undefined && value < minimum) {
    issues.push({ path, message: `must be greater than or equal to ${minimum}` });
  }
  const maximum = numberKeyword(schema, 'maximum');
  if (maximum !== undefined && value > maximum) {
    issues.push({ path, message: `must be less than or equal to ${maximum}` });
  }
}

function schemaMatches(schema: JsonSchema, value: unknown): boolean {
  const issues: ToolSchemaValidationIssue[] = [];
  validateSchemaValue(schema, value, '$', issues);
  return issues.length === 0;
}

function schemaArrayKeyword(schema: JsonSchema, key: string): JsonSchema[] | undefined {
  const value = schema[key];
  return Array.isArray(value) ? value.filter(isJsonSchema) : undefined;
}

function schemaTypes(schema: JsonSchema): string[] {
  const type = schema.type;
  if (Array.isArray(type))
    return type.filter((value): value is string => typeof value === 'string');
  return typeof type === 'string' ? [type] : [];
}

function typeMatches(type: string, value: unknown): boolean {
  switch (type) {
    case 'object':
      return !!value && typeof value === 'object' && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'integer':
      return Number.isInteger(value);
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'string':
      return typeof value === 'string';
    case 'boolean':
      return typeof value === 'boolean';
    case 'null':
      return value === null;
    default:
      return true;
  }
}

function shouldValidateObject(schema: JsonSchema, value: unknown): boolean {
  return (
    !!schema.properties ||
    !!schema.required?.length ||
    (!!value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      schema.additionalProperties !== undefined)
  );
}

function shouldValidateArray(schema: JsonSchema, value: unknown): boolean {
  return (
    Array.isArray(value) &&
    (!!schema.items || schema.minItems !== undefined || schema.maxItems !== undefined)
  );
}

function numberKeyword(schema: JsonSchema, key: string): number | undefined {
  const value = schema[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function stringKeyword(schema: JsonSchema, key: string): string | undefined {
  const value = schema[key];
  return typeof value === 'string' ? value : undefined;
}

function isJsonSchema(value: unknown): value is JsonSchema {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function deepEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
}
