import fs from 'fs/promises';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { z, type ZodType } from 'zod';
import type {
  ContextSpec,
  DeploymentSpec,
  EvaluationSpec,
  HarnessedAgentSystemSpec,
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
  contextSpecSchema,
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
  skillPolicies?: SkillPolicyBinding[];
  tools?: ToolSpec[];
  mcpProfiles?: MCPIntegrationSpec[];
  memoryProfiles?: MemorySpec[];
  contextProfiles?: ContextSpec[];
  reasoningProfiles?: ReasoningSpec[];
  defaultReasoningProfile?: string;
  businessRules?: BusinessRuleSpec[];
  policies?: PolicySpec[];
  evaluationProfiles?: EvaluationSpec[];
  regressionCases?: RegressionSpec[];
  deploymentProfile?: DeploymentSpec;
  metadata?: Record<string, unknown>;
}

export interface SkillPolicyBinding extends VersionedSpec, SpecMetadata {
  skillRef: SkillRef;
  policyRefs?: string[];
  allowedTools?: string[];
  requiredTools?: string[];
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
  metadata?: Record<string, unknown>;
}

export interface DomainPackRegistryEntry {
  spec: DomainPackSpec;
  source?: string;
}

export interface LocalDomainPackLoaderOptions {
  directories: string[];
  recursive?: boolean;
  extensions?: string[];
}

export interface DomainCompileOptions {
  systemId?: string;
  systemVersion?: string;
  agentRef: SpecRef;
  agentSkillRefs?: SkillRef[];
  agentToolRefs?: string[];
  taskSchemaId?: string;
  workflowId?: string;
  sessionProfileId?: string;
  memoryProfileId?: string;
  mcpProfileId?: string;
  contextProfileId?: string;
  reasoningProfileId?: string;
  policyRefs?: string[];
  evaluationRefs?: string[];
  traceRef?: SpecRef;
  modelProfileRef?: SpecRef;
  replayRef?: SpecRef;
  regressionRef?: SpecRef;
  deploymentRef?: SpecRef;
  metadata?: Record<string, unknown>;
}

export interface DomainAgentPatch {
  skillRefs: SkillRef[];
  toolRefs: string[];
  memoryProfileRef?: string;
  mcpProfileRef?: string;
  contextSpecRef?: SpecRef;
  reasoningProfileRef?: string;
  policyRefs?: string[];
  metadata: Record<string, unknown>;
}

export interface DomainAgentPatchTarget {
  [key: string]: unknown;
  id?: string;
  version?: string;
  name?: string;
  modelAlias?: string;
  systemInstructions?: string;
  skillRefs?: SkillRef[];
  toolRefs?: string[];
  memoryProfileRef?: string;
  contextSpecRef?: SpecRef;
  policyRefs?: string[];
  metadata?: Record<string, unknown>;
}

export interface WorkflowStateBinding {
  stateId: string;
  allowedTools: string[];
  allowedSkills: string[];
  allowedMCPProfiles: string[];
  memoryPolicyRef?: string;
  reasoningProfileRef?: string;
  policyRefs: string[];
  evaluationRefs: string[];
}

export interface DomainBindingResolution {
  domainPackRef: SpecRef;
  taskSchema?: TaskSchemaSpec;
  outputContract?: OutputContractSpec;
  sessionProfile?: SessionProfileSpec;
  workflow: WorkflowSpec;
  memoryProfile?: MemorySpec;
  mcpProfile?: MCPIntegrationSpec;
  contextProfile?: ContextSpec;
  reasoningProfile?: ReasoningSpec;
  policies: PolicySpec[];
  evaluations: EvaluationSpec[];
  regressionCases: RegressionSpec[];
  businessRules: BusinessRuleSpec[];
  tools: ToolSpec[];
  allowedSkills: SkillRef[];
  defaultSkills: SkillRef[];
  skillPolicies: SkillPolicyBinding[];
  workflowStates: WorkflowStateBinding[];
}

export interface DomainCompilationResult {
  domainPack: DomainPackSpec;
  bindings: DomainBindingResolution;
  fsmProcess: FSMProcessSpec;
  harnessedSystem: HarnessedAgentSystemSpec;
  agentPatch: DomainAgentPatch;
  sessionInitialization: DomainSessionInitialization;
}

export type DomainPackOverlay = Partial<
  Omit<DomainPackSpec, 'id' | 'version' | 'name' | 'taskSchemas' | 'workflows'>
> & {
  id?: string;
  version?: string;
  name?: string;
  taskSchemas?: TaskSchemaSpec[];
  workflows?: WorkflowSpec[];
};

export interface SessionProfileSpec extends VersionedSpec, SpecMetadata {
  metadataSchema?: JsonSchema;
  defaultMetadata?: Record<string, unknown>;
  defaultMemoryProfileRef?: string;
  defaultContextProfileRef?: string;
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
  contextProfileRef?: string;
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

export type BusinessRuleScope =
  | 'domain'
  | 'task'
  | 'workflow'
  | 'state'
  | 'tool'
  | 'memory'
  | 'output';
export type BusinessRuleEffect = 'constraint' | 'precondition' | 'postcondition' | 'guidance';

export interface BusinessRuleSpec extends VersionedSpec, SpecMetadata {
  scope: BusinessRuleScope;
  effect: BusinessRuleEffect;
  expression?: string;
  inputSchema?: JsonSchema;
  outputContractRef?: string;
  policyRefs?: string[];
  evaluationRefs?: string[];
  severity?: RiskLevel;
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
    contextProfileRef: profile?.defaultContextProfileRef,
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

export class DomainPackRegistry {
  private readonly entries = new Map<string, DomainPackRegistryEntry>();
  private readonly latestById = new Map<string, string>();

  register(spec: DomainPackSpec, source?: string): DomainPackSpec {
    const parsed = validateDomainPackSpec(spec);
    const key = this.key(parsed.id, parsed.version);
    this.entries.set(key, { spec: parsed, source });
    this.latestById.set(parsed.id, key);
    return parsed;
  }

  registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[] {
    return entries.map((entry) => this.register(entry.spec, entry.source));
  }

  resolve(id: string, version?: string): DomainPackRegistryEntry | undefined {
    if (version) return this.entries.get(this.key(id, version));
    const latestKey = this.latestById.get(id);
    return latestKey ? this.entries.get(latestKey) : undefined;
  }

  get(id: string, version?: string): DomainPackSpec | null {
    return this.resolve(id, version)?.spec ?? null;
  }

  list(): DomainPackRegistryEntry[] {
    return Array.from(this.entries.values()).sort((left, right) =>
      `${left.spec.id}@${left.spec.version}`.localeCompare(`${right.spec.id}@${right.spec.version}`)
    );
  }

  private key(id: string, version: string): string {
    return `${id}@${version}`;
  }
}

export class LocalDomainPackLoader {
  constructor(private readonly options: LocalDomainPackLoaderOptions) {}

  async load(): Promise<DomainPackRegistryEntry[]> {
    const files = await this.listFiles();
    const loaded: DomainPackRegistryEntry[] = [];
    for (const file of files) {
      loaded.push({
        spec: await loadDomainPackFile(file),
        source: file,
      });
    }
    return loaded;
  }

  async loadInto(registry: DomainPackRegistry): Promise<DomainPackSpec[]> {
    return registry.registerMany(await this.load());
  }

  private async listFiles(): Promise<string[]> {
    const files: string[] = [];
    for (const directory of this.options.directories) {
      files.push(
        ...(await listLocalDomainPackFiles(
          directory,
          this.options.recursive ?? true,
          this.options.extensions ?? DEFAULT_DOMAIN_PACK_EXTENSIONS
        ))
      );
    }
    return Array.from(new Set(files)).sort();
  }
}

export class DomainCompiler {
  compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult {
    return compileDomainPackToHarnessedSystem(domainPack, options);
  }
}

export async function loadDomainPackFile(filePath: string): Promise<DomainPackSpec> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return parseDomainPackDocument(raw, filePath);
}

export function parseDomainPackDocument(raw: string, filePath = '<inline>'): DomainPackSpec {
  const ext = path.extname(filePath).toLowerCase();
  const parsed = ext === '.json' ? JSON.parse(raw) : parseYaml(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`DomainPack document must be an object: ${filePath}`);
  }
  return validateDomainPackSpec(parsed);
}

export async function listLocalDomainPackFiles(
  directory: string,
  recursive = true,
  extensions: string[] = DEFAULT_DOMAIN_PACK_EXTENSIONS
): Promise<string[]> {
  const root = path.resolve(directory);
  const files: string[] = [];

  async function visit(current: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw error;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (recursive) await visit(fullPath);
        continue;
      }
      if (entry.isFile() && extensions.some((extension) => entry.name.endsWith(extension))) {
        files.push(fullPath);
      }
    }
  }

  await visit(root);
  return files.sort();
}

export function extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec {
  return validateDomainPackSpec({
    ...base,
    ...overlay,
    id: overlay.id ?? base.id,
    version: overlay.version ?? base.version,
    name: overlay.name ?? base.name,
    taskSchemas: upsertById(base.taskSchemas, overlay.taskSchemas) ?? base.taskSchemas,
    outputContracts: upsertById(base.outputContracts, overlay.outputContracts),
    sessionProfiles: upsertById(base.sessionProfiles, overlay.sessionProfiles),
    workflows: upsertById(base.workflows, overlay.workflows) ?? base.workflows,
    allowedSkills: upsertById(base.allowedSkills, overlay.allowedSkills),
    defaultSkills: upsertById(base.defaultSkills, overlay.defaultSkills),
    skillPolicies: upsertById(base.skillPolicies, overlay.skillPolicies),
    tools: upsertById(base.tools, overlay.tools),
    mcpProfiles: upsertById(base.mcpProfiles, overlay.mcpProfiles),
    memoryProfiles: upsertById(base.memoryProfiles, overlay.memoryProfiles),
    contextProfiles: upsertById(base.contextProfiles, overlay.contextProfiles),
    reasoningProfiles: upsertById(base.reasoningProfiles, overlay.reasoningProfiles),
    businessRules: upsertById(base.businessRules, overlay.businessRules),
    policies: upsertById(base.policies, overlay.policies),
    evaluationProfiles: upsertById(base.evaluationProfiles, overlay.evaluationProfiles),
    regressionCases: upsertById(base.regressionCases, overlay.regressionCases),
    deploymentProfile: overlay.deploymentProfile ?? base.deploymentProfile,
    metadata: {
      ...(base.metadata ?? {}),
      ...(overlay.metadata ?? {}),
    },
  });
}

export function compileDomainPackToHarnessedSystem(
  input: DomainPackSpec,
  options: DomainCompileOptions
): DomainCompilationResult {
  const domainPack = validateDomainPackSpec(input);
  const taskSchema = selectTaskSchema(domainPack, options.taskSchemaId);
  const workflow = selectWorkflow(
    domainPack,
    options.workflowId ?? taskSchema?.defaultWorkflowRef ?? domainPack.defaultWorkflow
  );
  const sessionInitialization = initializeDomainSession(domainPack, {
    profileId: options.sessionProfileId,
    metadata: options.metadata,
  });
  const outputContract = selectOutputContract(domainPack, taskSchema?.outputContractRef);
  const memoryProfile = selectProfileById(
    domainPack.memoryProfiles,
    options.memoryProfileId ?? sessionInitialization.memoryProfileRef,
    'Memory profile'
  );
  const mcpProfile = selectProfileById(
    domainPack.mcpProfiles,
    options.mcpProfileId ?? sessionInitialization.mcpProfileRef,
    'MCP profile'
  );
  const contextProfile = selectProfileById(
    domainPack.contextProfiles,
    options.contextProfileId ?? sessionInitialization.contextProfileRef,
    'Context profile'
  );
  const reasoningProfile = selectProfileById(
    domainPack.reasoningProfiles,
    options.reasoningProfileId ??
      sessionInitialization.reasoningProfileRef ??
      domainPack.defaultReasoningProfile,
    'Reasoning profile'
  );
  const workflowStateBindings = workflow.states.map((state) => resolveWorkflowStateBinding(state));
  const selectedSkillRefs = mergeSkillRefs(
    options.agentSkillRefs,
    domainPack.defaultSkills,
    taskSchema?.defaultSkillRefs
  );
  assertSkillsAllowed(selectedSkillRefs, domainPack.allowedSkills, 'Agent skill');
  const selectedToolIds = mergeStrings(
    options.agentToolRefs,
    domainPack.tools?.map((tool) => tool.id),
    workflowStateBindings.flatMap((state) => state.allowedTools)
  );
  const policyIds = mergeStrings(
    options.policyRefs,
    sessionInitialization.policyRefs,
    domainPack.policies?.map((policy) => policy.id),
    workflowStateBindings.flatMap((state) => state.policyRefs)
  );
  const evaluationIds = mergeStrings(
    options.evaluationRefs,
    domainPack.evaluationProfiles?.map((evaluation) => evaluation.id),
    workflowStateBindings.flatMap((state) => state.evaluationRefs)
  );
  const fsmProcess = compileWorkflowToFSM(domainPack, {
    workflowId: workflow.id,
    fsmProcessId: `${domainPack.id}.${workflow.id}.fsm`,
    agentRef: options.agentRef,
  });
  const harnessedSystem: HarnessedAgentSystemSpec = {
    id: options.systemId ?? `${domainPack.id}.${workflow.id}.system`,
    version: options.systemVersion ?? domainPack.version,
    name: `${domainPack.name} ${workflow.name ?? workflow.id} System`,
    description: domainPack.description,
    agentRef: options.agentRef,
    fsmProcessRef: toSpecRef(fsmProcess),
    traceRef: options.traceRef ?? {
      id: `${domainPack.id}.trace`,
      version: domainPack.version,
    },
    policyRefs: idsToRefs(policyIds, domainPack.policies),
    memoryRefs: memoryProfile ? [toSpecRef(memoryProfile)] : undefined,
    toolRefs: idsToRefs(selectedToolIds, domainPack.tools),
    skillRefs: selectedSkillRefs.length ? selectedSkillRefs : undefined,
    modelProfileRef: options.modelProfileRef,
    evaluationRefs: idsToRefs(evaluationIds, domainPack.evaluationProfiles),
    replayRef: options.replayRef,
    regressionRef: options.regressionRef ?? toOptionalSpecRef(domainPack.regressionCases?.[0]),
    deploymentRef: options.deploymentRef ?? toOptionalSpecRef(domainPack.deploymentProfile),
    tags: mergeStrings(domainPack.tags, ['compiled-from-domain-pack', domainPack.id]),
  };
  const agentPatch: DomainAgentPatch = {
    skillRefs: selectedSkillRefs,
    toolRefs: selectedToolIds,
    memoryProfileRef: memoryProfile?.id,
    mcpProfileRef: mcpProfile?.id,
    contextSpecRef: toOptionalSpecRef(contextProfile),
    reasoningProfileRef: reasoningProfile?.id,
    policyRefs: policyIds.length ? policyIds : undefined,
    metadata: {
      ...(options.metadata ?? {}),
      domainPackRef: toSpecRef(domainPack),
      workflowRef: toSpecRef(workflow),
      taskSchemaRef: toOptionalSpecRef(taskSchema),
      outputContractRef: toOptionalSpecRef(outputContract),
      mcpProfileRef: toOptionalSpecRef(mcpProfile),
      reasoningProfileRef: toOptionalSpecRef(reasoningProfile),
      workflowStateBindings,
    },
  };

  return {
    domainPack,
    bindings: {
      domainPackRef: toSpecRef(domainPack),
      taskSchema,
      outputContract,
      sessionProfile: selectSessionProfile(domainPack, options.sessionProfileId),
      workflow,
      memoryProfile,
      mcpProfile,
      contextProfile,
      reasoningProfile,
      policies: selectSpecsByIds(domainPack.policies, policyIds),
      evaluations: selectSpecsByIds(domainPack.evaluationProfiles, evaluationIds),
      regressionCases: domainPack.regressionCases ?? [],
      businessRules: domainPack.businessRules ?? [],
      tools: selectSpecsByIds(domainPack.tools, selectedToolIds),
      allowedSkills: domainPack.allowedSkills ?? selectedSkillRefs,
      defaultSkills: selectedSkillRefs,
      skillPolicies: domainPack.skillPolicies ?? [],
      workflowStates: workflowStateBindings,
    },
    fsmProcess,
    harnessedSystem,
    agentPatch,
    sessionInitialization,
  };
}

export function applyDomainAgentPatch<TAgent extends DomainAgentPatchTarget>(
  agent: TAgent,
  patch: DomainAgentPatch
): TAgent {
  const policyRefs = mergeStrings(agent.policyRefs, patch.policyRefs);
  return {
    ...agent,
    skillRefs: mergeSkillRefs(agent.skillRefs, patch.skillRefs),
    toolRefs: mergeStrings(agent.toolRefs, patch.toolRefs),
    memoryProfileRef: patch.memoryProfileRef ?? agent.memoryProfileRef,
    contextSpecRef: patch.contextSpecRef ?? agent.contextSpecRef,
    policyRefs: policyRefs.length ? policyRefs : undefined,
    metadata: {
      ...(agent.metadata ?? {}),
      ...patch.metadata,
      mcpProfileRef: patch.mcpProfileRef,
      reasoningProfileRef: patch.reasoningProfileRef,
    },
  };
}

const DEFAULT_DOMAIN_PACK_EXTENSIONS = ['.domain.json', '.domain.yaml', '.domain.yml'];

function selectTaskSchema(
  domainPack: DomainPackSpec,
  taskSchemaId?: string
): TaskSchemaSpec | undefined {
  if (!taskSchemaId) return domainPack.taskSchemas[0];
  const taskSchema = domainPack.taskSchemas.find((candidate) => candidate.id === taskSchemaId);
  if (!taskSchema) {
    throw new Error(`TaskSchema not found in domain pack: ${taskSchemaId}`);
  }
  return taskSchema;
}

function selectOutputContract(
  domainPack: DomainPackSpec,
  outputContractRef?: string
): OutputContractSpec | undefined {
  if (!outputContractRef) return undefined;
  const contract = domainPack.outputContracts?.find(
    (candidate) => candidate.id === outputContractRef
  );
  if (!contract) {
    throw new Error(`OutputContract not found in domain pack: ${outputContractRef}`);
  }
  return contract;
}

function selectProfileById<TSpec extends VersionedSpec>(
  specs: TSpec[] | undefined,
  id: string | undefined,
  label: string
): TSpec | undefined {
  if (!id) return specs?.[0];
  const spec = specs?.find((candidate) => candidate.id === id);
  if (!spec) {
    throw new Error(`${label} not found in domain pack: ${id}`);
  }
  return spec;
}

function resolveWorkflowStateBinding(state: WorkflowStateSpec): WorkflowStateBinding {
  return {
    stateId: state.id,
    allowedTools: state.allowedTools ?? [],
    allowedSkills: state.allowedSkills ?? [],
    allowedMCPProfiles: state.allowedMCPProfiles ?? [],
    memoryPolicyRef: state.memoryPolicyRef,
    reasoningProfileRef: state.reasoningProfileRef,
    policyRefs: state.policyRefs ?? [],
    evaluationRefs: state.evaluationRefs ?? [],
  };
}

function upsertById<TSpec extends { id: string }>(
  base: TSpec[] | undefined,
  overlay: TSpec[] | undefined
): TSpec[] | undefined {
  if (!base && !overlay) return undefined;
  const merged = new Map<string, TSpec>();
  for (const item of base ?? []) {
    merged.set(item.id, item);
  }
  for (const item of overlay ?? []) {
    merged.set(item.id, item);
  }
  return Array.from(merged.values());
}

function mergeSkillRefs(...groups: Array<SkillRef[] | undefined>): SkillRef[] {
  const merged = new Map<string, SkillRef>();
  for (const group of groups) {
    for (const ref of group ?? []) {
      merged.set(ref.id, ref);
    }
  }
  return Array.from(merged.values());
}

function mergeStrings(...groups: Array<string[] | undefined>): string[] {
  const merged = new Set<string>();
  for (const group of groups) {
    for (const value of group ?? []) {
      merged.add(value);
    }
  }
  return Array.from(merged.values());
}

function assertSkillsAllowed(
  refs: SkillRef[],
  allowedSkills: SkillRef[] | undefined,
  label: string
): void {
  if (!allowedSkills?.length) return;
  const allowed = new Set(allowedSkills.map((skill) => skill.id));
  for (const ref of refs) {
    if (!allowed.has(ref.id)) {
      throw new Error(`${label} is not allowed in domain pack: ${ref.id}`);
    }
  }
}

function selectSpecsByIds<TSpec extends VersionedSpec>(
  specs: TSpec[] | undefined,
  ids: string[]
): TSpec[] {
  if (!specs?.length || !ids.length) return [];
  const requested = new Set(ids);
  return specs.filter((spec) => requested.has(spec.id));
}

function idsToRefs<TSpec extends VersionedSpec>(
  ids: string[],
  specs: TSpec[] | undefined
): SpecRef[] | undefined {
  if (!ids.length) return undefined;
  return ids.map((id) => {
    const spec = specs?.find((candidate) => candidate.id === id);
    return spec ? toSpecRef(spec) : { id };
  });
}

function toSpecRef(spec: VersionedSpec): SpecRef {
  return { id: spec.id, version: spec.version };
}

function toOptionalSpecRef(spec: VersionedSpec | undefined): SpecRef | undefined {
  return spec ? toSpecRef(spec) : undefined;
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
export const businessRuleScopeSchema = z.enum([
  'domain',
  'task',
  'workflow',
  'state',
  'tool',
  'memory',
  'output',
]);
export const businessRuleEffectSchema = z.enum([
  'constraint',
  'precondition',
  'postcondition',
  'guidance',
]);
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

export const businessRuleSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  scope: businessRuleScopeSchema,
  effect: businessRuleEffectSchema,
  expression: z.string().optional(),
  inputSchema: jsonSchemaSchema.optional(),
  outputContractRef: z.string().optional(),
  policyRefs: z.array(z.string()).optional(),
  evaluationRefs: z.array(z.string()).optional(),
  severity: riskLevelSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<BusinessRuleSpec>;

export const sessionProfileSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  metadataSchema: jsonSchemaSchema.optional(),
  defaultMetadata: z.record(z.unknown()).optional(),
  defaultMemoryProfileRef: z.string().optional(),
  defaultContextProfileRef: z.string().optional(),
  defaultReasoningProfileRef: z.string().optional(),
  defaultToolProfileRef: z.string().optional(),
  defaultMCPProfileRef: z.string().optional(),
  defaultSkillPolicyRef: z.string().optional(),
  defaultPolicyRefs: z.array(z.string()).optional(),
}) satisfies ZodType<SessionProfileSpec>;

export const skillPolicyBindingSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  skillRef: specRefSchema,
  policyRefs: z.array(z.string()).optional(),
  allowedTools: z.array(z.string()).optional(),
  requiredTools: z.array(z.string()).optional(),
  trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<SkillPolicyBinding>;

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
  skillPolicies: z.array(skillPolicyBindingSchema).optional(),
  tools: z.array(toolSpecSchema).optional(),
  mcpProfiles: z.array(mcpIntegrationSpecSchema).optional(),
  memoryProfiles: z.array(memorySpecSchema).optional(),
  contextProfiles: z.array(contextSpecSchema).optional(),
  reasoningProfiles: z.array(reasoningSpecSchema).optional(),
  defaultReasoningProfile: z.string().optional(),
  businessRules: z.array(businessRuleSpecSchema).optional(),
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

export const businessRuleSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'scope', 'effect'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    scope: { enum: ['domain', 'task', 'workflow', 'state', 'tool', 'memory', 'output'] },
    effect: { enum: ['constraint', 'precondition', 'postcondition', 'guidance'] },
    expression: { type: 'string' },
    inputSchema: { type: 'object' },
    outputContractRef: { type: 'string' },
    policyRefs: { type: 'array', items: { type: 'string' } },
    evaluationRefs: { type: 'array', items: { type: 'string' } },
    severity: { enum: ['low', 'medium', 'high', 'critical'] },
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
    skillPolicies: { type: 'array', items: { type: 'object' } },
    tools: { type: 'array', items: { type: 'object' } },
    mcpProfiles: { type: 'array', items: { type: 'object' } },
    memoryProfiles: { type: 'array', items: { type: 'object' } },
    contextProfiles: { type: 'array', items: { type: 'object' } },
    reasoningProfiles: { type: 'array', items: reasoningSpecJsonSchema },
    defaultReasoningProfile: { type: 'string' },
    businessRules: { type: 'array', items: businessRuleSpecJsonSchema },
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
    { id: 'Intake', goal: 'Normalize task input.', policyRefs: ['policy.default'] },
    {
      id: 'Reasoning',
      goal: 'Reason and select the next action.',
      allowedTools: ['tool.search'],
      allowedSkills: ['skill.context-enrichment'],
      allowedMCPProfiles: ['mcp.default'],
      reasoningProfileRef: 'reasoning.default',
      policyRefs: ['policy.default'],
      evaluationRefs: ['eval.output-schema'],
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

export const businessRuleSpecExample: BusinessRuleSpec = {
  id: 'rule.output-contract',
  version: '0.0.0',
  name: 'Output Contract Rule',
  scope: 'output',
  effect: 'postcondition',
  outputContractRef: 'output.default',
  policyRefs: ['policy.default'],
  evaluationRefs: ['eval.output-schema'],
  severity: 'low',
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
      defaultMemoryProfileRef: 'memory.default',
      defaultContextProfileRef: 'context.default',
      defaultMCPProfileRef: 'mcp.default',
      defaultReasoningProfileRef: reasoningSpecExample.id,
      defaultPolicyRefs: ['policy.default'],
    },
  ],
  workflows: [workflowSpecExample],
  defaultWorkflow: workflowSpecExample.id,
  allowedSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
  defaultSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
  skillPolicies: [
    {
      id: 'skill-policy.context-enrichment',
      version: '0.0.0',
      skillRef: { id: 'skill.context-enrichment', version: '0.0.0' },
      policyRefs: ['policy.default'],
      allowedTools: ['tool.search'],
      trustLevel: 'reviewed',
    },
  ],
  tools: [
    {
      id: 'tool.search',
      version: '0.0.0',
      description: 'Search local or network-readable references.',
      inputSchema: {
        type: 'object',
        required: ['query'],
        properties: {
          query: { type: 'string' },
        },
        additionalProperties: false,
      },
      sideEffectLevel: 'read',
      source: 'local',
    },
  ],
  mcpProfiles: [
    {
      id: 'mcp.default',
      version: '0.0.0',
      servers: [{ id: 'classic', mode: 'local', command: 'mcp-server-classic' }],
      allowedCapabilities: ['web_search', 'fetch', 'read_file'],
      trustPolicy: 'read-only reviewed capabilities',
      importPolicy: 'tools-only',
      toolPolicy: 'read-only',
      versionPinning: true,
      capabilityHashing: true,
    },
  ],
  memoryProfiles: [
    {
      id: 'memory.default',
      version: '0.0.0',
      providers: [
        { id: 'structured', type: 'structured', providerRef: 'storage.sqlite.local' },
        { id: 'vector', type: 'vector', providerRef: 'vector.local' },
      ],
      memoryTypes: ['working', 'episodic', 'semantic'],
      structuredStoreRef: 'storage.sqlite.local',
      vectorIndexRef: 'vector.local',
      provenancePolicy: 'required',
      retrievalPolicy: { defaultTopK: 5, requireScope: true },
      writePolicyConfig: { allowLongTerm: false, requireProvenance: true },
    },
  ],
  contextProfiles: [
    {
      id: 'context.default',
      version: '0.0.0',
      sources: [
        { id: 'context.source.user', version: '0.0.0', type: 'user_input' },
        {
          id: 'context.source.memory',
          version: '0.0.0',
          type: 'memory',
          provenanceRequired: true,
          trustLevel: 'reviewed',
        },
        {
          id: 'context.source.skill',
          version: '0.0.0',
          type: 'skill',
          provenanceRequired: true,
          trustLevel: 'reviewed',
        },
      ],
      tokenBudget: 8000,
      provenancePolicy: 'required',
      instructionBoundaryPolicy: 'tagged',
    },
  ],
  reasoningProfiles: [reasoningSpecExample],
  defaultReasoningProfile: reasoningSpecExample.id,
  businessRules: [businessRuleSpecExample],
  policies: [
    {
      id: 'policy.default',
      version: '0.0.0',
      defaultEffect: 'deny',
      rules: [
        {
          id: 'policy.rule.read',
          version: '0.0.0',
          effect: 'allow',
          sideEffectLevels: ['none', 'read'],
        },
      ],
    },
  ],
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

export const businessRuleSpecDefinition = defineSpecSchema<BusinessRuleSpec>({
  id: 'BusinessRuleSpec',
  zod: businessRuleSpecSchema,
  jsonSchema: businessRuleSpecJsonSchema,
  example: businessRuleSpecExample,
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
  businessRuleSpecDefinition,
  domainPackSpecDefinition,
] as const;
export const domainSpecJsonSchemas = exportSpecJsonSchemas(domainSpecDefinitions);

export function validateWorkflowSpec(input: unknown): WorkflowSpec {
  return workflowSpecDefinition.parse(input);
}

export function validateDomainPackSpec(input: unknown): DomainPackSpec {
  const domainPack = domainPackSpecDefinition.parse(input);
  validateDomainReferences(domainPack);
  validateDomainSkillBindings(domainPack);
  return domainPack;
}

function validateDomainReferences(domainPack: DomainPackSpec): void {
  const workflowIds = idSet(domainPack.workflows);
  const outputContractIds = idSet(domainPack.outputContracts);
  const memoryProfileIds = idSet(domainPack.memoryProfiles);
  const mcpProfileIds = idSet(domainPack.mcpProfiles);
  const contextProfileIds = idSet(domainPack.contextProfiles);
  const reasoningProfileIds = idSet(domainPack.reasoningProfiles);
  const policyIds = idSet(domainPack.policies);
  const evaluationIds = idSet(domainPack.evaluationProfiles);
  const skillPolicyIds = idSet(domainPack.skillPolicies);
  const toolIds = idSet(domainPack.tools);

  assertKnownId(domainPack.defaultWorkflow, workflowIds, 'Default workflow', domainPack.id);
  assertKnownId(
    domainPack.defaultReasoningProfile,
    reasoningProfileIds,
    'Default reasoning profile',
    domainPack.id
  );

  for (const task of domainPack.taskSchemas) {
    assertKnownId(task.outputContractRef, outputContractIds, 'Task output contract', task.id);
    assertKnownId(task.defaultWorkflowRef, workflowIds, 'Task default workflow', task.id);
  }

  for (const sessionProfile of domainPack.sessionProfiles ?? []) {
    assertKnownId(
      sessionProfile.defaultMemoryProfileRef,
      memoryProfileIds,
      'Session default memory profile',
      sessionProfile.id
    );
    assertKnownId(
      sessionProfile.defaultContextProfileRef,
      contextProfileIds,
      'Session default context profile',
      sessionProfile.id
    );
    assertKnownId(
      sessionProfile.defaultMCPProfileRef,
      mcpProfileIds,
      'Session default MCP profile',
      sessionProfile.id
    );
    assertKnownId(
      sessionProfile.defaultReasoningProfileRef,
      reasoningProfileIds,
      'Session default reasoning profile',
      sessionProfile.id
    );
    assertKnownId(
      sessionProfile.defaultSkillPolicyRef,
      skillPolicyIds,
      'Session default skill policy',
      sessionProfile.id
    );
    for (const policyRef of sessionProfile.defaultPolicyRefs ?? []) {
      assertKnownId(policyRef, policyIds, 'Session default policy', sessionProfile.id);
    }
  }

  for (const workflow of domainPack.workflows) {
    validateWorkflowReferences(workflow, {
      toolIds,
      mcpProfileIds,
      reasoningProfileIds,
      policyIds,
      evaluationIds,
    });
  }

  for (const rule of domainPack.businessRules ?? []) {
    assertKnownId(
      rule.outputContractRef,
      outputContractIds,
      'Business rule output contract',
      rule.id
    );
    for (const policyRef of rule.policyRefs ?? []) {
      assertKnownId(policyRef, policyIds, 'Business rule policy', rule.id);
    }
    for (const evaluationRef of rule.evaluationRefs ?? []) {
      assertKnownId(evaluationRef, evaluationIds, 'Business rule evaluation', rule.id);
    }
  }

  for (const skillPolicy of domainPack.skillPolicies ?? []) {
    const allowedSkillIds = idSet(domainPack.allowedSkills);
    if (allowedSkillIds.size) {
      assertKnownId(skillPolicy.skillRef.id, allowedSkillIds, 'Skill policy skill', skillPolicy.id);
    }
    for (const policyRef of skillPolicy.policyRefs ?? []) {
      assertKnownId(policyRef, policyIds, 'Skill policy policy', skillPolicy.id);
    }
    for (const toolRef of [
      ...(skillPolicy.allowedTools ?? []),
      ...(skillPolicy.requiredTools ?? []),
    ]) {
      assertKnownId(toolRef, toolIds, 'Skill policy tool', skillPolicy.id);
    }
  }
}

function validateWorkflowReferences(
  workflow: WorkflowSpec,
  refs: {
    toolIds: Set<string>;
    mcpProfileIds: Set<string>;
    reasoningProfileIds: Set<string>;
    policyIds: Set<string>;
    evaluationIds: Set<string>;
  }
): void {
  const stateIds = idSet(workflow.states);
  assertKnownId(workflow.initialState, stateIds, 'Workflow initial state', workflow.id);
  for (const terminalState of workflow.terminalStates) {
    assertKnownId(terminalState, stateIds, 'Workflow terminal state', workflow.id);
  }
  for (const transition of workflow.transitions) {
    assertKnownId(transition.from, stateIds, 'Workflow transition from state', workflow.id);
    assertKnownId(transition.to, stateIds, 'Workflow transition to state', workflow.id);
  }
  for (const state of workflow.states) {
    for (const toolRef of state.allowedTools ?? []) {
      assertKnownId(toolRef, refs.toolIds, 'Workflow state tool', state.id);
    }
    for (const mcpProfileRef of state.allowedMCPProfiles ?? []) {
      assertKnownId(mcpProfileRef, refs.mcpProfileIds, 'Workflow state MCP profile', state.id);
    }
    assertKnownId(
      state.reasoningProfileRef,
      refs.reasoningProfileIds,
      'Workflow state reasoning profile',
      state.id
    );
    for (const policyRef of state.policyRefs ?? []) {
      assertKnownId(policyRef, refs.policyIds, 'Workflow state policy', state.id);
    }
    for (const evaluationRef of state.evaluationRefs ?? []) {
      assertKnownId(evaluationRef, refs.evaluationIds, 'Workflow state evaluation', state.id);
    }
  }
}

function validateDomainSkillBindings(domainPack: DomainPackSpec): void {
  if (!domainPack.allowedSkills?.length) return;
  const allowed = new Set(domainPack.allowedSkills.map((skill) => skill.id));
  for (const skill of domainPack.defaultSkills ?? []) {
    if (!allowed.has(skill.id)) {
      throw new Error(`Default skill is not allowed in domain pack: ${skill.id}`);
    }
  }
  for (const task of domainPack.taskSchemas) {
    for (const skill of task.defaultSkillRefs ?? []) {
      if (!allowed.has(skill.id)) {
        throw new Error(`Task default skill is not allowed in domain pack: ${skill.id}`);
      }
    }
  }
  for (const workflow of domainPack.workflows) {
    for (const state of workflow.states) {
      for (const skillId of state.allowedSkills ?? []) {
        if (!allowed.has(skillId)) {
          throw new Error(`Workflow state ${state.id} allows unknown skill: ${skillId}`);
        }
      }
    }
  }
  for (const skillPolicy of domainPack.skillPolicies ?? []) {
    if (!allowed.has(skillPolicy.skillRef.id)) {
      throw new Error(`Skill policy references unknown skill: ${skillPolicy.skillRef.id}`);
    }
  }
}

function idSet(items: Array<{ id: string }> | undefined): Set<string> {
  return new Set((items ?? []).map((item) => item.id));
}

function assertKnownId(
  id: string | undefined,
  allowed: Set<string>,
  label: string,
  owner: string
): void {
  if (!id) return;
  if (!allowed.has(id)) {
    throw new Error(`${label} not found for ${owner}: ${id}`);
  }
}
