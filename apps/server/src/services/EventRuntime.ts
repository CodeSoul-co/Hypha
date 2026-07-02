import path from 'path';
import { SQLiteEventStore } from '@hypha/adapters-local';
import type { FrameworkEvent, FrameworkEventType, SpecRef } from '@hypha/core';
import { EventFirstRuntime } from '@hypha/harness';
import { compileWorkflowToFSM, type DomainPackSpec, type WorkflowSpec } from '@hypha/domain';
import {
  applyTransition,
  createInitialSnapshot,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';
import {
  InferenceManager,
  InMemoryKvCacheProvider,
  InMemoryPrefixCacheProvider,
  ReasoningOrchestrator,
  type InferenceProvider,
  type InferenceRequest,
  type InferenceResponse,
  type ReasoningOptions,
} from '@hypha/inference';
import { GovernedToolRunner, ToolRegistry, type ToolSpec } from '@hypha/tools';
import type { WorkflowDefinition, WorkflowExecution } from '../core/workflow/types';
import { getLLMManager } from '../core/llm/LLMFactory';
import type { ChatOptions, ChatResponse, LLMMessage } from '../core/llm/types';
import { generateId } from '../utils/helpers';

interface RuntimeRunContext {
  runId: string;
  userId: string;
  sessionId: string;
  clientSessionId: string;
  fsm: FSMProcessSpec;
  snapshot: FSMSnapshot;
}

export interface EventRunHandle {
  runId: string;
  sessionId: string;
  runtimeSessionId: string;
}

export interface StartRunInput {
  userId: string;
  sessionId: string;
  input?: unknown;
  agentId?: string;
  workflowRef?: SpecRef;
  domainPack?: DomainPackSpec;
  fsm?: FSMProcessSpec;
  metadata?: Record<string, unknown>;
}

export interface ChatInferenceInput {
  runId: string;
  stepId: string;
  modelAlias: string;
  messages: LLMMessage[];
  options?: ChatOptions;
  reasoning?: ReasoningOptions;
}

interface LLMInferenceInput {
  messages: LLMMessage[];
  options?: ChatOptions;
}

class ServerLLMInferenceProvider implements InferenceProvider {
  readonly id = 'server-llm';

  async infer(request: InferenceRequest<LLMInferenceInput>): Promise<InferenceResponse<ChatResponse>> {
    const systemPrompt = [
      request.resolvedPrefixContent,
      request.input.options?.systemPrompt,
    ].filter(Boolean).join('\n\n') || undefined;
    const response = await getLLMManager().chat(request.input.messages, {
      ...request.input.options,
      systemPrompt,
      model: request.input.options?.model ?? request.modelAlias,
    });
    return {
      id: response.id,
      output: response,
      usage: response.usage,
      raw: response.raw,
    };
  }
}

class EventRuntimeService {
  private readonly events: SQLiteEventStore;
  private readonly runtime: EventFirstRuntime;
  private readonly runs = new Map<string, RuntimeRunContext>();
  private readonly knownSessions = new Set<string>();
  private readonly inference: InferenceManager;
  private readonly reasoning: ReasoningOrchestrator;
  private readonly defaultDomainPack = createDefaultDomainPack();
  private readonly defaultFsm = compileWorkflowToFSM(this.defaultDomainPack);

  constructor() {
    const eventDbPath = process.env.HYPHA_RUNTIME_EVENT_DB
      ?? path.resolve(process.cwd(), 'data/hypha-runtime-events.sqlite');
    this.events = new SQLiteEventStore({ filename: eventDbPath });
    this.runtime = new EventFirstRuntime(this.events);
    this.inference = new InferenceManager({
      prefixCache: new InMemoryPrefixCacheProvider(),
      kvCache: new InMemoryKvCacheProvider(),
    });
    this.inference.register(new ServerLLMInferenceProvider());
    this.reasoning = new ReasoningOrchestrator({
      id: 'server-inference-router',
      infer: (request) => this.inference.infer('server-llm', request),
    });
  }

  async startRun(input: StartRunInput): Promise<EventRunHandle> {
    const domainPack = input.domainPack ?? this.defaultDomainPack;
    const fsm = input.fsm ?? this.defaultFsm;
    const runtimeSessionId = this.runtimeSessionId(input.userId, input.sessionId);
    await this.ensureSession(input.userId, input.sessionId, domainPack, input.metadata);

    const runId = generateId();
    const timestamp = new Date().toISOString();
    const workflowRef = input.workflowRef ?? {
      id: fsm.id,
      version: fsm.version,
    };
    const snapshot = createInitialSnapshot(fsm, runId, timestamp);

    await this.runtime.createRun({
      id: runId,
      sessionId: runtimeSessionId,
      userId: input.userId,
      domainPackRef: { id: domainPack.id, version: domainPack.version },
      workflowRef,
      agentRef: input.agentId ? { id: input.agentId } : undefined,
      input: input.input,
      timestamp,
    });
    this.runs.set(runId, {
      runId,
      userId: input.userId,
      sessionId: runtimeSessionId,
      clientSessionId: input.sessionId,
      fsm,
      snapshot,
    });
    await this.append(runId, 'run.started', { input: input.input }, timestamp);
    await this.append(runId, 'fsm.state.entered', { stateId: snapshot.currentState }, timestamp, {
      fsmState: snapshot.currentState,
    });
    return { runId, sessionId: input.sessionId, runtimeSessionId };
  }

  async transition(runId: string, to: string, payload: Record<string, unknown> = {}): Promise<void> {
    const context = this.requireRun(runId);
    if (context.snapshot.currentState === to) return;
    const from = context.snapshot.currentState;
    await this.append(runId, 'fsm.transition.requested', { from, to, ...payload }, undefined, {
      fsmState: from,
    });
    try {
      const next = applyTransition(context.fsm, context.snapshot, to);
      await this.append(runId, 'fsm.state.exited', { stateId: from }, undefined, {
        fsmState: from,
      });
      await this.append(runId, 'fsm.transition.accepted', { from, to, ...payload }, undefined, {
        fsmState: to,
      });
      await this.append(runId, 'fsm.state.entered', { stateId: to }, undefined, {
        fsmState: to,
      });
      context.snapshot = next;
      this.runs.set(runId, context);
    } catch (error) {
      await this.append(runId, 'fsm.transition.rejected', {
        from,
        to,
        reason: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async inferChat(input: ChatInferenceInput): Promise<ChatResponse> {
    await this.append(input.runId, 'inference.requested', {
      stepId: input.stepId,
      modelAlias: input.modelAlias,
      reasoning: input.reasoning?.method ?? 'direct',
    }, undefined, { stepId: input.stepId });
    await this.append(input.runId, 'model.call.started', {
      modelAlias: input.modelAlias,
    }, undefined, { stepId: input.stepId });

    try {
      const response = await this.reasoning.infer({
        runId: input.runId,
        stepId: input.stepId,
        modelAlias: input.modelAlias,
        input: {
          messages: input.messages,
          options: input.options,
        },
        reasoning: input.reasoning,
      });
      const chat = response.output as ChatResponse;
      await this.append(input.runId, 'model.call.completed', {
        model: chat.model,
        provider: chat.provider,
        usage: chat.usage,
      }, undefined, { stepId: input.stepId });
      await this.append(input.runId, 'inference.completed', {
        responseId: chat.id,
        usage: response.usage,
        cache: response.cache,
      }, undefined, { stepId: input.stepId });
      return chat;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.append(input.runId, 'model.call.failed', { error: message }, undefined, {
        stepId: input.stepId,
      });
      await this.append(input.runId, 'inference.failed', { error: message }, undefined, {
        stepId: input.stepId,
      });
      throw error;
    }
  }

  async runGovernedTool<TOutput>(input: {
    runId: string;
    stepId: string;
    userId: string;
    sessionId: string;
    toolId: string;
    toolSpec?: Partial<ToolSpec>;
    params: unknown;
    handler: () => Promise<TOutput>;
  }): Promise<TOutput> {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: input.toolId,
        version: input.toolSpec?.version ?? '0.0.0',
        name: input.toolSpec?.name ?? input.toolId,
        description: input.toolSpec?.description ?? `Tool ${input.toolId}`,
        inputSchema: input.toolSpec?.inputSchema ?? { type: 'object' },
        outputSchema: input.toolSpec?.outputSchema,
        sideEffectLevel: input.toolSpec?.sideEffectLevel ?? 'read',
        permissionScope: input.toolSpec?.permissionScope,
        source: input.toolSpec?.source ?? 'local',
      },
      async () => input.handler()
    );
    const runner = new GovernedToolRunner(registry, this.events);
    const result = await runner.run({
      toolId: input.toolId,
      input: input.params,
      context: {
        runId: input.runId,
        stepId: input.stepId,
        userId: input.userId,
        sessionId: this.runtimeSessionId(input.userId, input.sessionId),
      },
    });
    if (result.status !== 'completed') {
      throw new Error(typeof result.error === 'string' ? result.error : `Tool failed: ${input.toolId}`);
    }
    return result.output as TOutput;
  }

  async record(runId: string, type: FrameworkEventType, payload: unknown, stepId?: string): Promise<void> {
    await this.append(runId, type, payload, undefined, { stepId });
  }

  async completeRun(runId: string, output?: unknown): Promise<void> {
    const context = this.requireRun(runId);
    if (!context.fsm.terminalStates.includes(context.snapshot.currentState)) {
      await this.transition(runId, inferCompletedState(context.fsm), { reason: 'completed' });
    }
    await this.append(runId, 'run.completed', { output });
  }

  async failRun(runId: string, error: unknown): Promise<void> {
    const context = this.requireRun(runId);
    const message = error instanceof Error ? error.message : String(error);
    if (!context.fsm.terminalStates.includes(context.snapshot.currentState)) {
      await this.transition(runId, inferFailedState(context.fsm), { reason: message });
    }
    await this.append(runId, 'run.failed', { error: message });
  }

  createRuntimeSpecFromWorkflow(workflow: WorkflowDefinition): {
    domainPack: DomainPackSpec;
    fsm: FSMProcessSpec;
  } {
    const workflowSpec = workflowDefinitionToWorkflowSpec(workflow);
    const domainPack: DomainPackSpec = {
      id: `app.workflow.${workflow.name}`,
      version: workflow.version,
      name: workflow.name,
      taskSchemas: [],
      workflows: [workflowSpec],
      defaultWorkflow: workflowSpec.id,
    };
    return { domainPack, fsm: compileWorkflowToFSM(domainPack) };
  }

  async recordWorkflowExecution(runId: string, execution: WorkflowExecution): Promise<void> {
    const stageIds = Array.from(execution.stageResults.keys());
    for (const stageId of stageIds.slice(1)) {
      await this.transition(runId, stageId, { source: 'workflow.execution' });
    }
    for (const [stageId, result] of execution.stageResults.entries()) {
      await this.record(runId, result.success ? 'agent.reasoning.completed' : 'inference.failed', {
        stageId,
        result,
      }, stageId);
    }
    if (execution.status === 'completed') {
      await this.completeRun(runId, { executionId: execution.id, status: execution.status });
    } else if (execution.status === 'failed') {
      await this.failRun(runId, execution.error ?? 'Workflow failed');
    }
  }

  projectRun(runId: string) {
    return this.runtime.projectRun(runId);
  }

  projectReplay(runId: string) {
    return this.runtime.projectReplay(runId);
  }

  projectAudit(runId: string) {
    return this.runtime.projectAudit(runId);
  }

  projectRegression(runId: string) {
    return this.runtime.projectRegression(runId);
  }

  listEvents(runId: string): Promise<FrameworkEvent[]> {
    return this.runtime.listEvents(runId);
  }

  private async ensureSession(
    userId: string,
    clientSessionId: string,
    domainPack: DomainPackSpec,
    metadata: Record<string, unknown> = {}
  ): Promise<void> {
    const runtimeSessionId = this.runtimeSessionId(userId, clientSessionId);
    if (this.knownSessions.has(runtimeSessionId)) return;
    await this.runtime.createSession({
      id: runtimeSessionId,
      userId,
      domainPackRef: { id: domainPack.id, version: domainPack.version },
      metadata: {
        clientSessionId,
        ...metadata,
      },
    });
    this.knownSessions.add(runtimeSessionId);
  }

  private async append(
    runId: string,
    type: FrameworkEventType,
    payload: unknown,
    timestamp?: string,
    options: { stepId?: string; fsmState?: string } = {}
  ): Promise<void> {
    const context = this.requireRun(runId);
    await this.runtime.appendRunEvent({
      id: `${runId}:${type}:${generateId()}`,
      type,
      runId,
      sessionId: context.sessionId,
      userId: context.userId,
      payload,
      stepId: options.stepId,
      fsmState: options.fsmState,
      timestamp,
      metadata: {
        userId: context.userId,
        clientSessionId: context.clientSessionId,
        ...(options.stepId ? { stepId: options.stepId } : {}),
        ...(options.fsmState ? { fsmState: options.fsmState } : {}),
      },
    });
  }

  private requireRun(runId: string): RuntimeRunContext {
    const context = this.runs.get(runId);
    if (!context) {
      throw new Error(`Runtime run not found: ${runId}`);
    }
    return context;
  }

  private runtimeSessionId(userId: string, clientSessionId: string): string {
    return `user:${userId}:session:${clientSessionId}`;
  }
}

function createDefaultDomainPack(): DomainPackSpec {
  const states = [
    'RunInitialized',
    'ContextBuilt',
    'Reasoning',
    'ActionSelected',
    'PolicyChecked',
    'Acting',
    'ObservationRecorded',
    'Verifying',
    'MemorySync',
    'Completed',
    'Failed',
  ];
  const transitions = states.slice(0, -2).map((from, index) => ({
    from,
    to: states[index + 1],
    description: `${from} to ${states[index + 1]}`,
  }));
  transitions.push(
    ...states
      .filter((state) => state !== 'Completed' && state !== 'Failed')
      .map((from) => ({ from, to: 'Failed', description: `${from} failed` }))
  );
  return {
    id: 'hypha.default',
    version: '1.0.0',
    name: 'hypha Default Runtime',
    taskSchemas: [],
    workflows: [
      {
        id: 'react-fsm-runtime',
        version: '1.0.0',
        initialState: 'RunInitialized',
        terminalStates: ['Completed', 'Failed'],
        states: states.map((id) => ({ id, goal: id })),
        transitions,
      },
    ],
    defaultWorkflow: 'react-fsm-runtime',
  };
}

function workflowDefinitionToWorkflowSpec(workflow: WorkflowDefinition): WorkflowSpec {
  const states = [
    ...workflow.stages.map((stage) => ({
      id: stage.id,
      goal: stage.description ?? stage.name ?? stage.type,
      allowedTools: stage.tools,
      allowedSkills: stage.skills,
    })),
    { id: 'Completed', goal: 'Workflow completed' },
    { id: 'Failed', goal: 'Workflow failed' },
  ];
  const transitions: WorkflowSpec['transitions'] = [];
  for (const stage of workflow.stages) {
    const next = stage.next === 'end' || !stage.next ? 'Completed' : stage.next;
    transitions.push({ from: stage.id, to: next, description: `${stage.id} next` });
    for (const branch of stage.branches ?? []) {
      transitions.push({
        from: stage.id,
        to: branch.then === 'end' ? 'Completed' : branch.then,
        guard: branch.condition,
      });
      if (branch.else) {
        transitions.push({
          from: stage.id,
          to: branch.else === 'end' ? 'Completed' : branch.else,
          guard: `else:${branch.condition}`,
        });
      }
    }
    transitions.push({ from: stage.id, to: 'Failed', description: `${stage.id} failed` });
  }
  return {
    id: workflow.name,
    version: workflow.version,
    initialState: workflow.stages[0]?.id ?? 'Completed',
    terminalStates: ['Completed', 'Failed'],
    states,
    transitions,
  };
}

function inferCompletedState(fsm: FSMProcessSpec): string {
  return fsm.terminalStates.find((state) => state.toLowerCase().includes('complete'))
    ?? fsm.terminalStates[0];
}

function inferFailedState(fsm: FSMProcessSpec): string {
  return fsm.terminalStates.find((state) => state.toLowerCase().includes('fail'))
    ?? fsm.terminalStates[0];
}

let service: EventRuntimeService | null = null;

export function getEventRuntime(): EventRuntimeService {
  if (!service) {
    service = new EventRuntimeService();
  }
  return service;
}
