import { z, type ZodType } from 'zod';
import type {
  AuditPolicySpec,
  ContextSpec,
  ContextSourceSpec,
  DeploymentSpec,
  EvaluationSpec,
  HarnessedAgentSystemSpec,
  HumanReviewPolicySpec,
  JsonSchema,
  OutputContractSpec,
  PolicyRuleSpec,
  PolicySpec,
  RegressionSpec,
  ReplaySpec,
  RetryPolicySpec,
  SpecMetadata,
  SpecRef,
  TimeoutPolicySpec,
  TraceSpec,
  VersionedSpec,
} from './specs';

export interface SpecSchemaDefinition<TSpec> {
  id: string;
  zod: ZodType<TSpec>;
  jsonSchema: JsonSchema;
  example: TSpec;
  parse(input: unknown): TSpec;
}

export function defineSpecSchema<TSpec>(definition: {
  id: string;
  zod: ZodType<TSpec>;
  jsonSchema: JsonSchema;
  example: TSpec;
}): SpecSchemaDefinition<TSpec> {
  return {
    ...definition,
    parse(input: unknown): TSpec {
      return definition.zod.parse(input);
    },
  };
}

export function exportSpecJsonSchemas(
  definitions: readonly SpecSchemaDefinition<unknown>[]
): Record<string, JsonSchema> {
  return Object.fromEntries(
    definitions.map((definition) => [definition.id, definition.jsonSchema])
  );
}

export const versionedSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
}) satisfies ZodType<VersionedSpec>;

export const specRefSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1).optional(),
}) satisfies ZodType<SpecRef>;

export const specMetadataSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  owner: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
}) satisfies ZodType<SpecMetadata>;

export const jsonSchemaSchema: ZodType<JsonSchema> = z.lazy(() =>
  z
    .object({
      type: z.string().optional(),
      properties: z.record(jsonSchemaSchema).optional(),
      required: z.array(z.string()).optional(),
      items: jsonSchemaSchema.optional(),
      enum: z.array(z.unknown()).optional(),
      additionalProperties: z.union([z.boolean(), jsonSchemaSchema]).optional(),
    })
    .catchall(z.unknown())
);

export const sideEffectLevelSchema = z.enum([
  'none',
  'read',
  'write',
  'external_effect',
  'irreversible',
]);

export const riskLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);

export const timeoutPolicySpecSchema = z.object({
  timeoutMs: z.number().int().positive(),
  onTimeout: z.enum(['fail', 'retry', 'human_review']).optional(),
}) satisfies ZodType<TimeoutPolicySpec>;

export const retryPolicySpecSchema = z.object({
  maxAttempts: z.number().int().positive(),
  backoffMs: z.number().int().nonnegative().optional(),
  retryableCodes: z.array(z.string()).optional(),
}) satisfies ZodType<RetryPolicySpec>;

export const auditPolicySpecSchema = z.object({
  enabled: z.boolean(),
  includeInput: z.boolean().optional(),
  includeOutput: z.boolean().optional(),
  redactPaths: z.array(z.string()).optional(),
}) satisfies ZodType<AuditPolicySpec>;

export const humanReviewPolicySpecSchema = z.object({
  required: z.boolean(),
  reason: z.string().optional(),
  approverRole: z.string().optional(),
  timeoutPolicy: timeoutPolicySpecSchema.optional(),
}) satisfies ZodType<HumanReviewPolicySpec>;

export const policyRuleSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    effect: z.enum(['allow', 'deny', 'require_human_review']),
    expression: z.string().optional(),
    sideEffectLevels: z.array(sideEffectLevelSchema).optional(),
    scopes: z.array(z.string()).optional(),
  }) satisfies ZodType<PolicyRuleSpec>;

export const policySpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    rules: z.array(policyRuleSpecSchema),
    defaultEffect: z.enum(['allow', 'deny']).optional(),
  }) satisfies ZodType<PolicySpec>;

export const outputContractSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    schema: jsonSchemaSchema,
  }) satisfies ZodType<OutputContractSpec>;

export const contextSourceSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    type: z.enum(['memory', 'artifact', 'skill', 'domain', 'mcp', 'user_input', 'system']),
    provenanceRequired: z.boolean().optional(),
    trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
  }) satisfies ZodType<ContextSourceSpec>;

export const contextSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    sources: z.array(contextSourceSpecSchema),
    tokenBudget: z.number().int().positive().optional(),
    provenancePolicy: z.enum(['required', 'best_effort', 'none']).optional(),
    instructionBoundaryPolicy: z.enum(['strict', 'tagged', 'none']).optional(),
  }) satisfies ZodType<ContextSpec>;

export const traceSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    eventTypes: z.array(z.string().min(1)),
    retentionPolicy: z.string().optional(),
    redactionPolicy: z.string().optional(),
  }) satisfies ZodType<TraceSpec>;

export const evaluationSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    type: z.enum([
      'schema',
      'output_contract',
      'tool_trace',
      'policy',
      'process',
      'cost',
      'latency',
      'regression',
      'human',
    ]),
    rubric: jsonSchemaSchema.optional(),
    deterministic: z.boolean().optional(),
  }) satisfies ZodType<EvaluationSpec>;

export const replaySpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    captureModelIO: z.boolean().optional(),
    captureToolIO: z.boolean().optional(),
    captureMemoryReadSet: z.boolean().optional(),
    capturePolicyDecisions: z.boolean().optional(),
    snapshotPolicy: z.enum(['none', 'state_path', 'full']).optional(),
  }) satisfies ZodType<ReplaySpec>;

export const regressionSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    fixtureRefs: z.array(specRefSchema),
    requiredChecks: z.array(
      z.enum(['event_types', 'state_path', 'tool_calls', 'policy_decisions', 'output_contract'])
    ),
  }) satisfies ZodType<RegressionSpec>;

export const deploymentSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    mode: z.enum(['local', 'self_hosted', 'managed']),
    runtimeMode: z.enum(['single-user', 'multi-user']).optional(),
    configRefs: z.array(specRefSchema).optional(),
  }) satisfies ZodType<DeploymentSpec>;

export const harnessedAgentSystemSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    agentRef: specRefSchema,
    fsmProcessRef: specRefSchema,
    traceRef: specRefSchema,
    policyRefs: z.array(specRefSchema).optional(),
    memoryRefs: z.array(specRefSchema).optional(),
    toolRefs: z.array(specRefSchema).optional(),
    skillRefs: z.array(specRefSchema).optional(),
    modelProfileRef: specRefSchema.optional(),
    evaluationRefs: z.array(specRefSchema).optional(),
    replayRef: specRefSchema.optional(),
    regressionRef: specRefSchema.optional(),
    deploymentRef: specRefSchema.optional(),
  }) satisfies ZodType<HarnessedAgentSystemSpec>;

const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
  },
  additionalProperties: false,
};

const metadataJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    owner: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

function versionedJsonSchema(
  required: string[],
  properties: Record<string, JsonSchema>
): JsonSchema {
  return {
    type: 'object',
    required: ['id', 'version', ...required],
    properties: {
      id: { type: 'string' },
      version: { type: 'string' },
      ...metadataJsonSchema.properties,
      ...properties,
    },
    additionalProperties: false,
  };
}

export const traceSpecJsonSchema = versionedJsonSchema(['eventTypes'], {
  eventTypes: { type: 'array', items: { type: 'string' } },
  retentionPolicy: { type: 'string' },
  redactionPolicy: { type: 'string' },
});

export const harnessedAgentSystemSpecJsonSchema = versionedJsonSchema(
  ['agentRef', 'fsmProcessRef', 'traceRef'],
  {
    agentRef: specRefJsonSchema,
    fsmProcessRef: specRefJsonSchema,
    traceRef: specRefJsonSchema,
    policyRefs: { type: 'array', items: specRefJsonSchema },
    memoryRefs: { type: 'array', items: specRefJsonSchema },
    toolRefs: { type: 'array', items: specRefJsonSchema },
    skillRefs: { type: 'array', items: specRefJsonSchema },
    modelProfileRef: specRefJsonSchema,
    evaluationRefs: { type: 'array', items: specRefJsonSchema },
    replayRef: specRefJsonSchema,
    regressionRef: specRefJsonSchema,
    deploymentRef: specRefJsonSchema,
  }
);

export const traceSpecExample: TraceSpec = {
  id: 'trace.default',
  version: '0.0.0',
  name: 'Default Runtime Trace',
  eventTypes: ['run.started', 'fsm.state.entered', 'model.call.completed', 'run.completed'],
  retentionPolicy: 'local-dev',
};

export const harnessedAgentSystemSpecExample: HarnessedAgentSystemSpec = {
  id: 'system.default',
  version: '0.0.0',
  name: 'Default Hypha Agent System',
  agentRef: { id: 'agent.default', version: '0.0.0' },
  fsmProcessRef: { id: 'fsm.react.default', version: '0.0.0' },
  traceRef: { id: 'trace.default', version: '0.0.0' },
  policyRefs: [{ id: 'policy.default' }],
};

export const traceSpecDefinition = defineSpecSchema<TraceSpec>({
  id: 'TraceSpec',
  zod: traceSpecSchema,
  jsonSchema: traceSpecJsonSchema,
  example: traceSpecExample,
});

export const harnessedAgentSystemSpecDefinition =
  defineSpecSchema<HarnessedAgentSystemSpec>({
    id: 'HarnessedAgentSystemSpec',
    zod: harnessedAgentSystemSpecSchema,
    jsonSchema: harnessedAgentSystemSpecJsonSchema,
    example: harnessedAgentSystemSpecExample,
  });

export const coreSpecDefinitions = [
  traceSpecDefinition,
  harnessedAgentSystemSpecDefinition,
] as const;

export const coreSpecJsonSchemas = exportSpecJsonSchemas(coreSpecDefinitions);

export function validateTraceSpec(input: unknown): TraceSpec {
  return traceSpecDefinition.parse(input);
}

export function validateHarnessedAgentSystemSpec(input: unknown): HarnessedAgentSystemSpec {
  return harnessedAgentSystemSpecDefinition.parse(input);
}
