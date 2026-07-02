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
import type {
  StageResult,
  WorkflowDefinition,
  WorkflowExecution,
  WorkflowExecutionContext,
  WorkflowStage,
} from '../core/workflow/types';
import { getLLMManager } from '../core/llm/LLMFactory';
import type { ChatOptions, ChatResponse, LLMMessage, StreamChunk } from '../core/llm/types';
import { getSkillManager } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { generateId, now } from '../utils/helpers';

const UNRESOLVED_CONDITION_OPERAND = Symbol('unresolved workflow condition operand');

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

  async *stream(request: InferenceRequest<LLMInferenceInput>): AsyncIterable<InferenceResponse<StreamChunk>> {
    const systemPrompt = [
      request.resolvedPrefixContent,
      request.input.options?.systemPrompt,
    ].filter(Boolean).join('\n\n') || undefined;
    let index = 0;
    for await (const chunk of getLLMManager().streamChat(request.input.messages, {
      ...request.input.options,
      systemPrompt,
      model: request.input.options?.model ?? request.modelAlias,
    })) {
      index += 1;
      yield {
        id: `${request.runId}:${request.stepId}:stream:${index}`,
        output: chunk,
        usage: chunk.usage,
        raw: chunk,
      };
    }
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
    const resolved = this.resolveChatModel(input.modelAlias || input.options?.model);
    await this.append(input.runId, 'inference.requested', {
      stepId: input.stepId,
      modelAlias: resolved.model,
      reasoning: input.reasoning?.method ?? 'direct',
    }, undefined, { stepId: input.stepId });
    await this.append(input.runId, 'model.call.started', {
      modelAlias: resolved.model,
    }, undefined, { stepId: input.stepId });

    try {
      const response = await this.reasoning.infer({
        runId: input.runId,
        stepId: input.stepId,
        modelAlias: resolved.model,
        input: {
          messages: input.messages,
          options: {
            ...input.options,
            model: input.options?.model ?? resolved.model,
          },
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

  async *streamChat(input: ChatInferenceInput): AsyncGenerator<StreamChunk> {
    const resolved = this.resolveChatModel(input.modelAlias || input.options?.model);
    await this.append(input.runId, 'inference.requested', {
      stepId: input.stepId,
      modelAlias: resolved.model,
      stream: true,
    }, undefined, { stepId: input.stepId });
    await this.append(input.runId, 'model.call.started', {
      modelAlias: resolved.model,
      stream: true,
    }, undefined, { stepId: input.stepId });

    let completed = false;
    try {
      for await (const response of this.inference.stream('server-llm', {
        runId: input.runId,
        stepId: input.stepId,
        modelAlias: resolved.model,
        input: {
          messages: input.messages,
          options: {
            ...input.options,
            model: input.options?.model ?? resolved.model,
          },
        },
        metadata: { stream: true },
      })) {
        const chunk = response.output as StreamChunk;
        if (chunk.type === 'error') {
          const message = chunk.error || 'LLM stream error';
          await this.append(input.runId, 'model.call.failed', { error: message, stream: true }, undefined, {
            stepId: input.stepId,
          });
          await this.append(input.runId, 'inference.failed', { error: message, stream: true }, undefined, {
            stepId: input.stepId,
          });
          yield chunk;
          return;
        }
        if (chunk.type === 'done') {
          completed = true;
          await this.append(input.runId, 'model.call.completed', {
            model: resolved.model,
            provider: resolved.provider,
            usage: chunk.usage,
            stream: true,
          }, undefined, { stepId: input.stepId });
          await this.append(input.runId, 'inference.completed', {
            stream: true,
            usage: response.usage,
            cache: response.cache,
          }, undefined, { stepId: input.stepId });
        }
        yield chunk;
      }

      if (!completed) {
        await this.append(input.runId, 'model.call.completed', {
          model: resolved.model,
          provider: resolved.provider,
          stream: true,
          endedWithoutDone: true,
        }, undefined, { stepId: input.stepId });
        await this.append(input.runId, 'inference.completed', {
          stream: true,
          endedWithoutDone: true,
        }, undefined, { stepId: input.stepId });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.append(input.runId, 'model.call.failed', { error: message, stream: true }, undefined, {
        stepId: input.stepId,
      });
      await this.append(input.runId, 'inference.failed', { error: message, stream: true }, undefined, {
        stepId: input.stepId,
      });
      throw error;
    }
  }

  resolveChatModel(modelAlias?: string): { model: string; provider: string } {
    const llmManager = getLLMManager();
    const model = modelAlias || llmManager.getDefaultModel();
    return {
      model,
      provider: llmManager.getProviderFromModel(model),
    };
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
        sourceRef: input.toolSpec?.sourceRef,
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

  async recordMemoryRead<TValue>(input: {
    runId: string;
    stepId: string;
    target: string;
    details?: Record<string, unknown>;
    reader: () => Promise<TValue>;
  }): Promise<TValue> {
    await this.record(input.runId, 'memory.read.requested', {
      target: input.target,
      ...input.details,
    }, input.stepId);
    try {
      const value = await input.reader();
      await this.record(input.runId, 'memory.read.completed', {
        target: input.target,
        ...input.details,
        resultSummary: summarizeValue(value),
      }, input.stepId);
      return value;
    } catch (error) {
      await this.record(input.runId, 'memory.read.failed', {
        target: input.target,
        ...input.details,
        error: error instanceof Error ? error.message : String(error),
      }, input.stepId);
      throw error;
    }
  }

  async recordMemoryWrite<TValue>(input: {
    runId: string;
    stepId: string;
    target: string;
    details?: Record<string, unknown>;
    writer: () => Promise<TValue>;
  }): Promise<TValue> {
    await this.record(input.runId, 'memory.write.requested', {
      target: input.target,
      ...input.details,
    }, input.stepId);
    await this.record(input.runId, 'memory.write.validated', {
      target: input.target,
      policy: 'default-allow-local-memory',
      ...input.details,
    }, input.stepId);
    try {
      const value = await input.writer();
      await this.record(input.runId, 'memory.write.committed', {
        target: input.target,
        ...input.details,
        resultSummary: summarizeValue(value),
      }, input.stepId);
      return value;
    } catch (error) {
      await this.record(input.runId, 'memory.write.rejected', {
        target: input.target,
        ...input.details,
        error: error instanceof Error ? error.message : String(error),
      }, input.stepId);
      throw error;
    }
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

  async executeWorkflow(input: {
    runId: string;
    userId: string;
    workflow: WorkflowDefinition;
    context: Partial<WorkflowExecutionContext> & { input?: unknown };
  }): Promise<WorkflowExecution> {
    const workflow = input.workflow;
    const execution: WorkflowExecution = {
      id: generateId(),
      workflowName: workflow.name,
      workflowVersion: workflow.version,
      status: 'running',
      context: this.normalizeWorkflowContext(workflow, input.context, input.userId),
      stageResults: new Map(),
      startedAt: now(),
    };
    let currentStageId: string | undefined = workflow.stages[0]?.id;
    const visitedStages = new Set<string>();

    try {
      for (
        let transitions = 0;
        currentStageId && currentStageId !== 'end' && execution.status === 'running';
        transitions += 1
      ) {
        if (transitions > workflow.stages.length) {
          throw new Error(`Workflow exceeded declared stage count: ${workflow.name}`);
        }
        if (visitedStages.has(currentStageId)) {
          throw new Error(`Circular dependency detected in workflow: ${currentStageId}`);
        }
        visitedStages.add(currentStageId);

        const stage = workflow.stages.find((candidate) => candidate.id === currentStageId);
        if (!stage) {
          throw new Error(`Stage not found: ${currentStageId}`);
        }

        execution.currentStage = stage.id;
        const startedAt = Date.now();
        await this.record(input.runId, 'workflow.stage.started', {
          executionId: execution.id,
          stageId: stage.id,
          stageType: stage.type,
        }, stage.id);

        try {
          const result = await this.executeWorkflowStage(input.runId, workflow, stage, execution);
          const stageResult: StageResult = {
            stageId: stage.id,
            success: result.success,
            output: safeSerialize(result.output),
            error: result.error,
            duration: Date.now() - startedAt,
            metadata: safeSerialize(result.metadata),
          };
          execution.stageResults.set(stage.id, stageResult);

          await this.record(input.runId, result.success ? 'workflow.stage.completed' : 'workflow.stage.failed', {
            executionId: execution.id,
            stageId: stage.id,
            result: stageResult,
          }, stage.id);

          if (!result.success && stage.onError === 'stop') {
            throw new Error(stageResult.error || 'Stage failed');
          }

          const nextStageId = this.nextWorkflowStage(stage, result.nextStage, result.success);
          if (!result.success && nextStageId === 'Failed') {
            throw new Error(stageResult.error || 'Stage failed');
          }
          if (!nextStageId || nextStageId === 'end') {
            currentStageId = undefined;
          } else {
            const target = nextStageId === 'Completed' || nextStageId === 'Failed'
              ? nextStageId
              : nextStageId;
            await this.transition(input.runId, target, {
              executionId: execution.id,
              fromStage: stage.id,
            });
            currentStageId = workflow.stages.some((candidate) => candidate.id === target)
              ? target
              : undefined;
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          if (!execution.stageResults.has(stage.id)) {
            const stageResult: StageResult = {
              stageId: stage.id,
              success: false,
              error: message,
              duration: Date.now() - startedAt,
            };
            execution.stageResults.set(stage.id, stageResult);
            await this.record(input.runId, 'workflow.stage.failed', {
              executionId: execution.id,
              stageId: stage.id,
              result: stageResult,
            }, stage.id);
          }
          throw error;
        }
      }

      execution.status = 'completed';
      execution.completedAt = now();
      await this.completeRun(input.runId, { executionId: execution.id, status: execution.status });
      return execution;
    } catch (error) {
      execution.status = 'failed';
      execution.error = error instanceof Error ? error.message : String(error);
      execution.completedAt = now();
      await this.failRun(input.runId, execution.error);
      return execution;
    }
  }

  private async executeWorkflowStage(
    runId: string,
    workflow: WorkflowDefinition,
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{
    success: boolean;
    output?: unknown;
    error?: string;
    nextStage?: string;
    metadata?: Record<string, unknown>;
  }> {
    const resolvedStage = this.resolveWorkflowStage(stage, execution.context.variables);
    switch (resolvedStage.type) {
      case 'preprocessor':
      case 'postprocessor':
        return this.executeWorkflowSkillStage(runId, resolvedStage, execution);
      case 'llm':
        return this.executeWorkflowLLMStage(runId, workflow, resolvedStage, execution);
      case 'tool-call':
        return this.executeWorkflowToolStage(runId, resolvedStage, execution);
      case 'conditional':
        return this.executeWorkflowConditionalStage(runId, resolvedStage, execution);
      case 'end':
        return { success: true, output: null, nextStage: 'end' };
      default:
        return { success: false, error: `Unknown stage type: ${resolvedStage.type}` };
    }
  }

  private async executeWorkflowSkillStage(
    runId: string,
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: unknown; error?: string; nextStage?: string }> {
    if (!stage.skills?.length) {
      return { success: true, nextStage: stage.next };
    }
    const skillManager = getSkillManager();
    const currentMessage = execution.context.messages[execution.context.messages.length - 1] || {
      id: generateId(),
      role: 'user',
      content: '',
      timestamp: now(),
    };
    for (const skillId of stage.skills) {
      const skill = skillManager.getSkill(skillId);
      await this.record(runId, 'skill.selected', { skillId, stageId: stage.id }, stage.id);
      if (!skill) {
        await this.record(runId, 'skill.failed', {
          skillId,
          stageId: stage.id,
          error: 'Skill not found',
        }, stage.id);
        return { success: false, error: `Skill not found: ${skillId}` };
      }

      await this.record(runId, 'skill.executed', { skillId, stageId: stage.id }, stage.id);
      const result = await skill.run({
        userId: execution.context.userId,
        sessionId: execution.context.sessionId,
        conversationId: execution.context.conversationId,
        messages: execution.context.messages,
        currentMessage,
        variables: execution.context.variables,
        metadata: execution.context.metadata,
      });
      if (!result.success) {
        await this.record(runId, 'skill.failed', {
          skillId,
          stageId: stage.id,
          error: result.error,
        }, stage.id);
        return { success: false, error: result.error };
      }
      execution.context.variables = {
        ...execution.context.variables,
        ...(result.variables ?? {}),
      };
      if (result.modifiedContent) {
        currentMessage.content = result.modifiedContent;
      }
      await this.record(runId, 'skill.completed', {
        skillId,
        stageId: stage.id,
        variableKeys: Object.keys(result.variables ?? {}),
      }, stage.id);
      if (!result.shouldContinue) break;
    }
    return { success: true, nextStage: stage.next };
  }

  private async executeWorkflowLLMStage(
    runId: string,
    workflow: WorkflowDefinition,
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: unknown; error?: string; nextStage?: string; metadata?: Record<string, unknown> }> {
    const llm = getLLMManager();
    const messages: LLMMessage[] = execution.context.messages.map((message) => ({
      role: message.role as LLMMessage['role'],
      content: String(message.content ?? ''),
    }));
    const variables = {
      defaultProvider: llm.getDefaultProvider(),
      defaultModel: llm.getDefaultModel(),
      ...workflow.variables,
      ...execution.context.variables,
    };
    const modelAlias = stage.model
      ? String(this.resolveWorkflowVariables(stage.model, variables))
      : llm.getDefaultModel();
    const systemPrompt = stage.prompt
      ? String(this.resolveWorkflowVariables(stage.prompt, variables))
      : undefined;

    try {
      await this.record(runId, 'agent.reasoning.started', {
        stageId: stage.id,
        modelAlias,
      }, stage.id);
      const response = await this.inferChat({
        runId,
        stepId: stage.id,
        modelAlias,
        messages,
        options: {
          model: modelAlias,
          systemPrompt,
        },
      });
      execution.context.messages.push({
        id: generateId(),
        role: 'assistant',
        content: response.content,
        timestamp: now(),
      });
      await this.record(runId, 'agent.reasoning.completed', {
        stageId: stage.id,
        responseId: response.id,
        finishReason: response.finishReason,
      }, stage.id);
      await this.record(runId, 'agent.action.selected', {
        stageId: stage.id,
        finishReason: response.finishReason,
        toolCalls: response.toolCalls,
      }, stage.id);
      return {
        success: true,
        output: response.content,
        nextStage: stage.next,
        metadata: { usage: response.usage, model: response.model, provider: response.provider },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async executeWorkflowToolStage(
    runId: string,
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: unknown; error?: string; nextStage?: string }> {
    if (!stage.tools?.length) {
      return { success: true, nextStage: stage.next };
    }
    const toolManager = getToolManager();
    const outputs: Record<string, unknown> = {};
    for (const toolName of stage.tools) {
      const descriptor = toolManager.describeTool(toolName);
      const params = this.resolveWorkflowVariables(
        execution.context.variables.toolParams || {},
        execution.context.variables
      );
      try {
        const output = await this.runGovernedTool({
          runId,
          stepId: stage.id,
          userId: execution.context.userId,
          sessionId: execution.context.sessionId,
          toolId: descriptor?.id ?? toolName,
          params,
          toolSpec: {
            name: descriptor?.name ?? toolName,
            description: descriptor?.description ?? `Workflow tool ${toolName}`,
            inputSchema: descriptor?.inputSchema ?? { type: 'object' },
            sideEffectLevel: inferToolSideEffect(toolName, params),
            source: descriptor?.source ?? 'local',
            sourceRef: descriptor?.source === 'mcp'
              ? { serverId: descriptor.serverId, capabilityId: descriptor.capabilityId }
              : undefined,
          },
          handler: async () => {
            const result = await toolManager.executeTool(toolName, params as Record<string, unknown>);
            if (!result.success) {
              throw new Error(result.error || `Tool failed: ${toolName}`);
            }
            return result.output;
          },
        });
        outputs[toolName] = output;
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    }
    execution.context.variables.toolResults = {
      ...execution.context.variables.toolResults,
      ...outputs,
    };
    return { success: true, output: outputs, nextStage: stage.next };
  }

  private async executeWorkflowConditionalStage(
    runId: string,
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: unknown; error?: string; nextStage?: string }> {
    if (!stage.condition || !stage.branches) {
      return { success: true, nextStage: stage.next };
    }
    const conditionMet = this.evaluateWorkflowCondition(stage.condition, execution.context.variables);
    const branch = stage.branches.find((candidate) =>
      (candidate.condition === 'true' && conditionMet)
      || (candidate.condition === 'false' && !conditionMet)
    ) || stage.branches.find((candidate) => candidate.condition === 'default');
    await this.record(runId, 'workflow.condition.evaluated', {
      stageId: stage.id,
      condition: stage.condition,
      conditionMet,
      nextStage: branch?.then ?? stage.next,
    }, stage.id);
    return { success: true, output: { conditionMet }, nextStage: branch?.then ?? stage.next };
  }

  private normalizeWorkflowContext(
    workflow: WorkflowDefinition,
    context: Partial<WorkflowExecutionContext> & { input?: unknown },
    userId: string
  ): WorkflowExecutionContext {
    const normalized: WorkflowExecutionContext = {
      userId,
      sessionId: context.sessionId || generateId(),
      conversationId: context.conversationId,
      messages: Array.isArray(context.messages) ? context.messages : [],
      variables: {
        ...(workflow.variables ?? {}),
        ...(context.variables ?? {}),
      },
      metadata: context.metadata ?? {},
    };
    if (typeof context.input === 'string' && normalized.messages.length === 0) {
      normalized.messages.push({
        id: generateId(),
        role: 'user',
        content: context.input,
        timestamp: now(),
      });
    }
    return normalized;
  }

  private nextWorkflowStage(
    stage: WorkflowStage,
    resultNextStage: string | undefined,
    success: boolean
  ): string | undefined {
    if (!success) {
      if (stage.onError && stage.onError !== 'stop' && stage.onError !== 'continue') {
        return stage.onError;
      }
      if (stage.onError === 'continue') return stage.next;
      return 'Failed';
    }
    const next = resultNextStage || stage.next;
    if (!next || next === 'end') return 'Completed';
    return next;
  }

  private resolveWorkflowStage(stage: WorkflowStage, variables: Record<string, unknown>): WorkflowStage {
    const llm = getLLMManager();
    const mergedVars: Record<string, unknown> = {
      defaultProvider: llm.getDefaultProvider(),
      defaultModel: llm.getDefaultModel(),
      ...variables,
    };
    return {
      ...stage,
      model: stage.model ? String(this.resolveWorkflowVariables(stage.model, mergedVars)) : stage.model,
      prompt: stage.prompt ? String(this.resolveWorkflowVariables(stage.prompt, mergedVars)) : stage.prompt,
      condition: stage.condition
        ? String(this.resolveWorkflowVariables(stage.condition, mergedVars))
        : stage.condition,
      tools: stage.tools?.map((tool) => String(this.resolveWorkflowVariables(tool, mergedVars))),
      skills: stage.skills?.map((skill) => String(this.resolveWorkflowVariables(skill, mergedVars))),
      branches: stage.branches?.map((branch) => ({
        ...branch,
        condition: String(this.resolveWorkflowVariables(branch.condition, mergedVars)),
        then: String(this.resolveWorkflowVariables(branch.then, mergedVars)),
        else: branch.else ? String(this.resolveWorkflowVariables(branch.else, mergedVars)) : undefined,
      })),
    };
  }

  private resolveWorkflowVariables(template: unknown, variables: Record<string, unknown>): unknown {
    if (typeof template === 'string') {
      const lookupVar = (name: string) => {
        if (/^[A-Z][A-Z0-9_]*$/.test(name) && process.env[name] !== undefined) {
          return process.env[name] as string;
        }
        return variables[name] !== undefined ? String(variables[name]) : undefined;
      };
      let result = template.replace(/\$\{env\.([A-Za-z_][A-Za-z0-9_]*)\}/g, (match, name) => {
        return process.env[name] !== undefined ? (process.env[name] as string) : match;
      });
      result = result.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (match, name) => {
        return lookupVar(name) ?? match;
      });
      result = result.replace(/(?<![A-Za-z0-9_])\$([A-Z][A-Z0-9_]*)\b/g, (match, name) => {
        return lookupVar(name) ?? match;
      });
      for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
      }
      return result;
    }
    if (Array.isArray(template)) {
      return template.map((item) => this.resolveWorkflowVariables(item, variables));
    }
    if (template && typeof template === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(template)) {
        result[key] = this.resolveWorkflowVariables(value, variables);
      }
      return result;
    }
    return template;
  }

  private evaluateWorkflowCondition(condition: string, variables: Record<string, unknown>): boolean {
    const expression = condition.trim();
    if (!expression) return false;
    if (expression === 'true') return true;
    if (expression === 'false') return false;

    const comparison = expression.match(/^(.+?)\s*(===|!==|==|!=)\s*(.+)$/);
    if (comparison) {
      const [, leftExpression, operator, rightExpression] = comparison;
      const left = this.resolveConditionOperand(leftExpression, variables);
      const right = this.resolveConditionOperand(rightExpression, variables);
      if (left === UNRESOLVED_CONDITION_OPERAND || right === UNRESOLVED_CONDITION_OPERAND) {
        return false;
      }
      switch (operator) {
        case '===':
          return left === right;
        case '!==':
          return left !== right;
        case '==':
          return String(left) === String(right);
        case '!=':
          return String(left) !== String(right);
        default:
          return false;
      }
    }

    const value = this.resolveConditionOperand(expression, variables);
    return value === UNRESOLVED_CONDITION_OPERAND ? false : Boolean(value);
  }

  private resolveConditionOperand(expression: string, variables: Record<string, unknown>): unknown {
    const value = expression.trim();
    if (/^\$\{[^}]+\}$/.test(value)) return undefined;
    if (value.startsWith('$')) return variables[value.slice(1)];
    if (/^{{[^}]+}}$/.test(value)) return variables[value.slice(2, -2)];
    if (/^(['"]).*\1$/.test(value)) return value.slice(1, -1);
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;
    const numeric = Number(value);
    if (!Number.isNaN(numeric) && value !== '') return numeric;
    if (Object.prototype.hasOwnProperty.call(variables, value)) return variables[value];
    return UNRESOLVED_CONDITION_OPERAND;
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

function summarizeValue(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) return { type: 'array', count: value.length };
  if (value && typeof value === 'object') {
    return { type: 'object', keys: Object.keys(value as Record<string, unknown>) };
  }
  return { type: typeof value };
}

function safeSerialize<T>(value: T): T | undefined {
  if (value === undefined || value === null) return value as T;
  try {
    return JSON.parse(JSON.stringify(value)) as T;
  } catch {
    try {
      return String(value) as T;
    } catch {
      return undefined;
    }
  }
}

function inferToolSideEffect(
  name: string,
  params: unknown
): 'none' | 'read' | 'write' | 'external_effect' | 'irreversible' {
  if (name === 'filesystem' && params && typeof params === 'object') {
    const operation = (params as Record<string, unknown>).operation;
    if (operation === 'write') return 'write';
    if (operation === 'delete') return 'irreversible';
    return 'read';
  }
  return 'read';
}

let service: EventRuntimeService | null = null;

export function getEventRuntime(): EventRuntimeService {
  if (!service) {
    service = new EventRuntimeService();
  }
  return service;
}
