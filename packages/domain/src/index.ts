import type {
  DeploymentSpec,
  EvaluationSpec,
  JsonSchema,
  OutputContractSpec,
  PolicySpec,
  RegressionSpec,
  RiskLevel,
  SpecMetadata,
  SpecRef,
  VersionedSpec,
} from '@hypha/core';
import type { FSMProcessSpec, FSMStateSpec, FSMTransitionSpec } from '@hypha/fsm';
import type { MCPIntegrationSpec } from '@hypha/mcp';
import type { MemorySpec } from '@hypha/memory';
import type { SkillRef } from '@hypha/skills';
import type { ToolSpec } from '@hypha/tools';

export interface DomainPackSpec extends VersionedSpec, SpecMetadata {
  name: string;
  taskSchemas: TaskSchemaSpec[];
  outputContracts?: OutputContractSpec[];
  workflows: WorkflowSpec[];
  defaultWorkflow?: string;
  allowedSkills?: SkillRef[];
  defaultSkills?: SkillRef[];
  tools?: ToolSpec[];
  mcpProfiles?: MCPIntegrationSpec[];
  memoryProfiles?: MemorySpec[];
  policies?: PolicySpec[];
  evaluationProfiles?: EvaluationSpec[];
  regressionCases?: RegressionSpec[];
  deploymentProfile?: DeploymentSpec;
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
  policyRefs?: string[];
  evaluationRefs?: string[];
  humanReviewRef?: string;
  timeoutMs?: number;
  retryPolicyRef?: string;
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
    timeoutPolicy: state.timeoutMs ? { timeoutMs: state.timeoutMs, onTimeout: 'fail' } : undefined,
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

function inferTerminalKind(stateId: string): FSMStateSpec['kind'] {
  const lower = stateId.toLowerCase();
  if (lower.includes('fail')) return 'failed';
  if (lower.includes('cancel')) return 'cancelled';
  return 'completed';
}
