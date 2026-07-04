import { z, type ZodType } from 'zod';
import type {
  DeploymentSpec,
  EvaluationSpec,
  HumanReviewPolicySpec,
  JsonSchema,
  OutputContractSpec,
  PolicySpec,
  RegressionSpec,
  RetryPolicySpec,
  RiskLevel,
  SpecMetadata,
  SpecRef,
  TimeoutPolicySpec,
  VersionedSpec,
} from '@hypha/core';
import {
  defineSpecSchema,
  deploymentSpecSchema,
  evaluationSpecSchema,
  exportSpecJsonSchemas,
  humanReviewPolicySpecSchema,
  jsonSchemaSchema,
  outputContractSpecSchema,
  policySpecSchema,
  regressionSpecSchema,
  riskLevelSchema,
  retryPolicySpecSchema,
  specMetadataSchema,
  specRefSchema,
  timeoutPolicySpecSchema,
  versionedSpecSchema,
} from '@hypha/core';
import type { FSMProcessSpec, FSMStateSpec, FSMTransitionSpec } from '@hypha/fsm';
import { mcpIntegrationSpecSchema, type MCPIntegrationSpec } from '@hypha/mcp';
import { memorySpecSchema, type MemorySpec } from '@hypha/memory';
import type { SkillRef } from '@hypha/skills';
import { toolSpecSchema, type ToolSpec } from '@hypha/tools';

export interface DomainPackSpec extends VersionedSpec, SpecMetadata {
  name: string;
  taskSchemas: TaskSchemaSpec[];
  outputContracts?: OutputContractSpec[];
  sessionProfiles?: SessionProfileSpec[];
  workflows: WorkflowSpec[];
  defaultWorkflow?: string;
  allowedSkills?: SkillRef[];
  defaultSkills?: SkillRef[];
  tools?: ToolSpec[];
  mcpProfiles?: MCPIntegrationSpec[];
  memoryProfiles?: MemorySpec[];
  reasoningProfiles?: ReasoningSpec[];
  defaultReasoningProfile?: string;
  policies?: PolicySpec[];
  evaluationProfiles?: EvaluationSpec[];
  regressionCases?: RegressionSpec[];
  deploymentProfile?: DeploymentSpec;
  metadata?: Record<string, unknown>;
}

export interface SessionProfileSpec extends VersionedSpec, SpecMetadata {
  metadataSchema?: JsonSchema;
  defaultMetadata?: Record<string, unknown>;
  defaultMemoryProfileRef?: string;
  defaultReasoningProfileRef?: string;
  defaultToolProfileRef?: string;
  defaultMCPProfileRef?: string;
  defaultSkillPolicyRef?: string;
  defaultPolicyRefs?: string[];
}

export interface DomainSessionInitialization {
  domainPackRef: SpecRef;
  sessionProfileRef?: SpecRef;
  metadata: Record<string, unknown>;
  memoryProfileRef?: string;
  reasoningProfileRef?: string;
  toolProfileRef?: string;
  mcpProfileRef?: string;
  skillPolicyRef?: string;
  policyRefs?: string[];
}

export type DomainThinkingMode = 'none' | 'summary' | 'structured';
export type DomainAgenticReasoningMode = 'react' | 'fsm_react' | 'tot' | 'critique';
export type DomainReasoningPersistence = 'summary_only' | 'events_only';

export interface ReasoningSpec extends VersionedSpec, SpecMetadata {
  thinkingMode: DomainThinkingMode;
  agenticMode: DomainAgenticReasoningMode;
  maxSteps?: number;
  persist?: DomainReasoningPersistence;
  plannerRef?: string;
  reasonerRef?: string;
  metadataSchema?: JsonSchema;
  metadata?: Record<string, unknown>;
}

export interface TaskSchemaSpec extends VersionedSpec, SpecMetadata {
  taskType: string;
  inputSchema: JsonSchema;
  constraintsSchema?: JsonSchema;
  acceptanceCriteriaSchema?: JsonSchema;
  outputContractRef: string;
  riskProfile?: RiskProfileSpec;
  defaultWorkflowRef?: string;
  defaultSkillRefs?: SkillRef[];
}

export interface RiskProfileSpec {
  defaultRiskLevel: RiskLevel;
  escalationPolicyRef?: string;
}

export interface TaskInstance<TInput = unknown, TConstraints = unknown> {
  id: string;
  domainId: string;
  taskSchemaId: string;
  input: TInput;
  constraints?: TConstraints;
  acceptanceCriteria?: unknown;
  riskLevel?: RiskLevel;
  metadata?: Record<string, unknown>;
}

export interface WorkflowSpec extends VersionedSpec, SpecMetadata {
  initialState: string;
  terminalStates: string[];
  states: WorkflowStateSpec[];
  transitions: WorkflowTransitionSpec[];
}

export interface WorkflowStateSpec extends SpecMetadata {
  id: string;
  goal: string;
  inputContract?: JsonSchema;
  outputContract?: JsonSchema;
  allowedTools?: string[];
  allowedSkills?: string[];
  allowedMCPProfiles?: string[];
  memoryPolicyRef?: string;
  reasoningProfileRef?: string;
  policyRefs?: string[];
  evaluationRefs?: string[];
  humanReviewRef?: string;
  humanReviewPolicy?: HumanReviewPolicySpec;
  timeoutMs?: number;
  timeoutPolicy?: TimeoutPolicySpec;
  retryPolicyRef?: string;
  retryPolicy?: RetryPolicySpec;
}

export interface WorkflowTransitionSpec {
  from: string;
  to: string;
  guard?: string;
  description?: string;
}

export interface WorkflowCompileOptions {
  workflowId?: string;
  fsmProcessId?: string;
  agentRef?: SpecRef;
}

export interface DomainSessionInitOptions {
  profileId?: string;
  metadata?: Record<string, unknown>;
}

export function initializeDomainSession(
  domainPack: DomainPackSpec,
  options: DomainSessionInitOptions = {}
): DomainSessionInitialization {
  const profile = selectSessionProfile(domainPack, options.profileId);
  return {
    domainPackRef: { id: domainPack.id, version: domainPack.version },
    sessionProfileRef: profile ? { id: profile.id, version: profile.version } : undefined,
    metadata: {
      ...(profile?.defaultMetadata ?? {}),
      ...(options.metadata ?? {}),
    },
    memoryProfileRef: profile?.defaultMemoryProfileRef,
    reasoningProfileRef: profile?.defaultReasoningProfileRef,
    toolProfileRef: profile?.defaultToolProfileRef,
    mcpProfileRef: profile?.defaultMCPProfileRef,
    skillPolicyRef: profile?.defaultSkillPolicyRef,
    policyRefs: profile?.defaultPolicyRefs,
  };
}

export function compileWorkflowToFSM(
  domainPack: DomainPackSpec,
  options: WorkflowCompileOptions = {}
): FSMProcessSpec {
  const workflow = selectWorkflow(domainPack, options.workflowId);
  const states: FSMStateSpec[] = workflow.states.map((state) => ({
    id: state.id,
    name: state.name,
    description: state.description ?? state.goal,
    kind: workflow.terminalStates.includes(state.id) ? inferTerminalKind(state.id) : 'domain',
    timeoutPolicy:
      state.timeoutPolicy ??
      (state.timeoutMs ? { timeoutMs: state.timeoutMs, onTimeout: 'fail' } : undefined),
    retryPolicy: state.retryPolicy,
    humanReviewPolicy: state.humanReviewPolicy,
    policyRefs: state.policyRefs,
    traceEvents: [`workflow.state.${state.id}`],
  }));
  const transitions: FSMTransitionSpec[] = workflow.transitions.map((transition) => ({
    from: transition.from,
    to: transition.to,
    guard: transition.guard,
    description: transition.description,
    traceEvent: `workflow.transition.${transition.from}.${transition.to}`,
  }));

  return {
    id: options.fsmProcessId ?? `${domainPack.id}.${workflow.id}.fsm`,
    version: workflow.version,
    name: `${domainPack.name} ${workflow.name ?? workflow.id} FSM`,
    description: workflow.description,
    initialState: workflow.initialState,
    states,
    transitions,
    terminalStates: workflow.terminalStates,
    tags: ['compiled-from-domain-pack', domainPack.id],
  };
}

function selectWorkflow(domainPack: DomainPackSpec, workflowId?: string): WorkflowSpec {
  const selectedId = workflowId ?? domainPack.defaultWorkflow;
  const workflow = selectedId
    ? domainPack.workflows.find((candidate) => candidate.id === selectedId)
    : domainPack.workflows[0];
  if (!workflow) {
    throw new Error(`Workflow not found in domain pack: ${selectedId ?? '<first>'}`);
  }
  return workflow;
}

function selectSessionProfile(
  domainPack: DomainPackSpec,
  profileId?: string
): SessionProfileSpec | undefined {
  if (!profileId) return domainPack.sessionProfiles?.[0];
  const profile = domainPack.sessionProfiles?.find((candidate) => candidate.id === profileId);
  if (!profile) {
    throw new Error(`SessionProfile not found in domain pack: ${profileId}`);
  }
  return profile;
}

function inferTerminalKind(stateId: string): FSMStateSpec['kind'] {
  const lower = stateId.toLowerCase();
  if (lower.includes('fail')) return 'failed';
  if (lower.includes('cancel')) return 'cancelled';
  return 'completed';
}

export const riskProfileSpecSchema = z.object({
  defaultRiskLevel: riskLevelSchema,
  escalationPolicyRef: z.string().optional(),
});

export const domainThinkingModeSchema = z.enum(['none', 'summary', 'structured']);
export const domainAgenticReasoningModeSchema = z.enum(['react', 'fsm_react', 'tot', 'critique']);
export const domainReasoningPersistenceSchema = z.enum(['summary_only', 'events_only']);
export const reasoningSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  thinkingMode: domainThinkingModeSchema,
  agenticMode: domainAgenticReasoningModeSchema,
  maxSteps: z.number().int().positive().optional(),
  persist: domainReasoningPersistenceSchema.optional(),
  plannerRef: z.string().optional(),
  reasonerRef: z.string().optional(),
  metadataSchema: jsonSchemaSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ReasoningSpec>;

export const sessionProfileSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  metadataSchema: jsonSchemaSchema.optional(),
  defaultMetadata: z.record(z.unknown()).optional(),
  defaultMemoryProfileRef: z.string().optional(),
  defaultReasoningProfileRef: z.string().optional(),
  defaultToolProfileRef: z.string().optional(),
  defaultMCPProfileRef: z.string().optional(),
  defaultSkillPolicyRef: z.string().optional(),
  defaultPolicyRefs: z.array(z.string()).optional(),
}) satisfies ZodType<SessionProfileSpec>;

export const taskSchemaSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  taskType: z.string().min(1),
  inputSchema: jsonSchemaSchema,
  constraintsSchema: jsonSchemaSchema.optional(),
  acceptanceCriteriaSchema: jsonSchemaSchema.optional(),
  outputContractRef: z.string().min(1),
  riskProfile: riskProfileSpecSchema.optional(),
  defaultWorkflowRef: z.string().optional(),
  defaultSkillRefs: z.array(specRefSchema).optional(),
}) satisfies ZodType<TaskSchemaSpec>;

export const workflowStateSpecSchema = specMetadataSchema.extend({
  id: z.string().min(1),
  goal: z.string().min(1),
  inputContract: jsonSchemaSchema.optional(),
  outputContract: jsonSchemaSchema.optional(),
  allowedTools: z.array(z.string()).optional(),
  allowedSkills: z.array(z.string()).optional(),
  allowedMCPProfiles: z.array(z.string()).optional(),
  memoryPolicyRef: z.string().optional(),
  reasoningProfileRef: z.string().optional(),
  policyRefs: z.array(z.string()).optional(),
  evaluationRefs: z.array(z.string()).optional(),
  humanReviewRef: z.string().optional(),
  humanReviewPolicy: humanReviewPolicySpecSchema.optional(),
  timeoutMs: z.number().int().positive().optional(),
  timeoutPolicy: timeoutPolicySpecSchema.optional(),
  retryPolicyRef: z.string().optional(),
  retryPolicy: retryPolicySpecSchema.optional(),
});

export const workflowTransitionSpecSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  guard: z.string().optional(),
  description: z.string().optional(),
});

export const workflowSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  initialState: z.string().min(1),
  terminalStates: z.array(z.string().min(1)).min(1),
  states: z.array(workflowStateSpecSchema).min(1),
  transitions: z.array(workflowTransitionSpecSchema),
}) satisfies ZodType<WorkflowSpec>;

export const domainPackSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  name: z.string().min(1),
  taskSchemas: z.array(taskSchemaSpecSchema),
  outputContracts: z.array(outputContractSpecSchema).optional(),
  sessionProfiles: z.array(sessionProfileSpecSchema).optional(),
  workflows: z.array(workflowSpecSchema).min(1),
  defaultWorkflow: z.string().optional(),
  allowedSkills: z.array(specRefSchema).optional(),
  defaultSkills: z.array(specRefSchema).optional(),
  tools: z.array(toolSpecSchema).optional(),
  mcpProfiles: z.array(mcpIntegrationSpecSchema).optional(),
  memoryProfiles: z.array(memorySpecSchema).optional(),
  reasoningProfiles: z.array(reasoningSpecSchema).optional(),
  defaultReasoningProfile: z.string().optional(),
  policies: z.array(policySpecSchema).optional(),
  evaluationProfiles: z.array(evaluationSpecSchema).optional(),
  regressionCases: z.array(regressionSpecSchema).optional(),
  deploymentProfile: deploymentSpecSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<DomainPackSpec>;

export const workflowSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'initialState', 'terminalStates', 'states', 'transitions'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    initialState: { type: 'string' },
    terminalStates: { type: 'array', items: { type: 'string' } },
    states: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'goal'],
        properties: {
          id: { type: 'string' },
          goal: { type: 'string' },
          allowedTools: { type: 'array', items: { type: 'string' } },
          allowedSkills: { type: 'array', items: { type: 'string' } },
          reasoningProfileRef: { type: 'string' },
          policyRefs: { type: 'array', items: { type: 'string' } },
          humanReviewPolicy: { type: 'object' },
          timeoutPolicy: { type: 'object' },
          retryPolicy: { type: 'object' },
        },
      },
    },
    transitions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['from', 'to'],
        properties: {
          from: { type: 'string' },
          to: { type: 'string' },
          guard: { type: 'string' },
        },
      },
    },
  },
  additionalProperties: false,
};

export const reasoningSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'thinkingMode', 'agenticMode'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    thinkingMode: { enum: ['none', 'summary', 'structured'] },
    agenticMode: { enum: ['react', 'fsm_react', 'tot', 'critique'] },
    maxSteps: { type: 'integer', minimum: 1 },
    persist: { enum: ['summary_only', 'events_only'] },
    plannerRef: { type: 'string' },
    reasonerRef: { type: 'string' },
    metadataSchema: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const domainPackSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'name', 'taskSchemas', 'workflows'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    taskSchemas: { type: 'array', items: { type: 'object' } },
    outputContracts: { type: 'array', items: { type: 'object' } },
    sessionProfiles: { type: 'array', items: { type: 'object' } },
    workflows: { type: 'array', items: workflowSpecJsonSchema },
    defaultWorkflow: { type: 'string' },
    allowedSkills: { type: 'array', items: { type: 'object' } },
    defaultSkills: { type: 'array', items: { type: 'object' } },
    tools: { type: 'array', items: { type: 'object' } },
    mcpProfiles: { type: 'array', items: { type: 'object' } },
    memoryProfiles: { type: 'array', items: { type: 'object' } },
    reasoningProfiles: { type: 'array', items: reasoningSpecJsonSchema },
    defaultReasoningProfile: { type: 'string' },
    policies: { type: 'array', items: { type: 'object' } },
    evaluationProfiles: { type: 'array', items: { type: 'object' } },
    regressionCases: { type: 'array', items: { type: 'object' } },
    deploymentProfile: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const workflowSpecExample: WorkflowSpec = {
  id: 'workflow.default',
  version: '0.0.0',
  name: 'Default Workflow',
  initialState: 'Intake',
  terminalStates: ['Completed', 'Failed'],
  states: [
    { id: 'Intake', goal: 'Normalize task input.' },
    {
      id: 'Reasoning',
      goal: 'Reason and select the next action.',
      timeoutPolicy: { timeoutMs: 30000, onTimeout: 'fail' },
      retryPolicy: { maxAttempts: 2 },
    },
    { id: 'Completed', goal: 'Return final output.' },
    { id: 'Failed', goal: 'Record failure.' },
  ],
  transitions: [
    { from: 'Intake', to: 'Reasoning', guard: 'input.ready == true' },
    { from: 'Reasoning', to: 'Completed' },
    { from: 'Reasoning', to: 'Failed' },
  ],
};

export const reasoningSpecExample: ReasoningSpec = {
  id: 'reasoning.default',
  version: '0.0.0',
  name: 'Default Structured Reasoning',
  thinkingMode: 'structured',
  agenticMode: 'fsm_react',
  maxSteps: 4,
  persist: 'summary_only',
};

export const domainPackSpecExample: DomainPackSpec = {
  id: 'domain.default',
  version: '0.0.0',
  name: 'Default Domain Pack',
  taskSchemas: [
    {
      id: 'task.default',
      version: '0.0.0',
      taskType: 'default',
      inputSchema: { type: 'object' },
      outputContractRef: 'output.default',
      defaultWorkflowRef: 'workflow.default',
    },
  ],
  outputContracts: [
    {
      id: 'output.default',
      version: '0.0.0',
      schema: { type: 'object' },
    },
  ],
  sessionProfiles: [
    {
      id: 'session.default',
      version: '0.0.0',
      defaultMetadata: { mode: 'single-user' },
      defaultReasoningProfileRef: reasoningSpecExample.id,
    },
  ],
  workflows: [workflowSpecExample],
  defaultWorkflow: workflowSpecExample.id,
  reasoningProfiles: [reasoningSpecExample],
  defaultReasoningProfile: reasoningSpecExample.id,
  evaluationProfiles: [
    {
      id: 'eval.output-schema',
      version: '0.0.0',
      type: 'schema',
      deterministic: true,
    },
  ],
  regressionCases: [
    {
      id: 'regression.event-contract',
      version: '0.0.0',
      fixtureRefs: [{ id: 'fixture.default', version: '0.0.0' }],
      requiredChecks: ['event_types', 'state_path', 'output_contract'],
    },
  ],
  deploymentProfile: {
    id: 'deployment.local',
    version: '0.0.0',
    mode: 'local',
    runtimeMode: 'single-user',
  },
};

export const workflowSpecDefinition = defineSpecSchema<WorkflowSpec>({
  id: 'WorkflowSpec',
  zod: workflowSpecSchema,
  jsonSchema: workflowSpecJsonSchema,
  example: workflowSpecExample,
});

export const reasoningSpecDefinition = defineSpecSchema<ReasoningSpec>({
  id: 'ReasoningSpec',
  zod: reasoningSpecSchema,
  jsonSchema: reasoningSpecJsonSchema,
  example: reasoningSpecExample,
});

export const domainPackSpecDefinition = defineSpecSchema<DomainPackSpec>({
  id: 'DomainPackSpec',
  zod: domainPackSpecSchema,
  jsonSchema: domainPackSpecJsonSchema,
  example: domainPackSpecExample,
});

export const domainSpecDefinitions = [
  workflowSpecDefinition,
  reasoningSpecDefinition,
  domainPackSpecDefinition,
] as const;
export const domainSpecJsonSchemas = exportSpecJsonSchemas(domainSpecDefinitions);

export function validateWorkflowSpec(input: unknown): WorkflowSpec {
  return workflowSpecDefinition.parse(input);
}

export function validateDomainPackSpec(input: unknown): DomainPackSpec {
  const domainPack = domainPackSpecDefinition.parse(input);
  if (
    domainPack.defaultWorkflow &&
    !domainPack.workflows.some((workflow) => workflow.id === domainPack.defaultWorkflow)
  ) {
    throw new Error(`Default workflow not found in domain pack: ${domainPack.defaultWorkflow}`);
  }
  if (
    domainPack.defaultReasoningProfile &&
    !domainPack.reasoningProfiles?.some(
      (profile) => profile.id === domainPack.defaultReasoningProfile
    )
  ) {
    throw new Error(
      `Default reasoning profile not found in domain pack: ${domainPack.defaultReasoningProfile}`
    );
  }
  return domainPack;
}
