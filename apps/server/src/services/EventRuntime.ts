import path from 'path';
import { SQLiteEventStore } from '@hypha/adapters-local';
import {
  FrameworkError,
  type FrameworkEvent,
  type FrameworkEventType,
  type SpecRef,
} from '@hypha/core';
import { EventFirstRuntime } from '@hypha/harness';
import {
  compileWorkflowToFSM,
  validateDomainPackSpec,
  type DomainPackSpec,
  type WorkflowSpec,
} from '@hypha/domain';
import {
  applyTransitionWithRuntimePolicy,
  createInitialSnapshot,
  evaluateGuardExpression,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';
import {
  hashContent,
  InferenceManager,
  InMemoryKvCacheProvider,
  InMemoryPrefixCacheProvider,
  ReasoningOrchestrator,
  type InferenceCachePolicy,
  type InferenceProvider,
  type InferenceRequest,
  type InferenceResponse,
  type KvCacheRef,
  type KvCacheScope,
  type KvCacheWriteMode,
  type PrefixCacheRef,
  type ReasoningOptions,
} from '@hypha/inference';
import { ReActRunner, type ReActAgentRuntime, type ReActAgentSpec } from '@hypha/kernel';
import type { ModelCacheControl, ModelProvider, ModelToolDescriptor } from '@hypha/models';
import {
  GovernedToolRunner,
  ToolRegistry,
  type ToolCallResult,
  type ToolRunner,
  type ToolSpec,
} from '@hypha/tools';
import type {
  StageResult,
  WorkflowDefinition,
  WorkflowExecution,
  WorkflowExecutionContext,
  WorkflowStage,
} from '../core/workflow/types';
import {
  normalizeWorkflowExecutionContext,
  type WorkflowContextInput,
} from '../core/workflow/context';
import {
  createLLMManagerModelProvider,
  getLLMManager,
  modelResponseToChatResponse,
  modelStreamEventToStreamChunk,
} from '../core/llm/LLMFactory';
import { getPromptManager } from '../core/prompts/PromptManager';
import {
  servingCacheResponseMetadata,
  type ServingCacheEvent,
  type ServingCacheTraceSink,
} from '@hypha/serving-cache';
import { storageConfig } from '../config';
import type { ChatOptions, ChatResponse, LLMMessage, StreamChunk } from '../core/llm/types';
import { getSkillManager } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { generateId, now } from '../utils/helpers';
import { logger } from '../utils/logger';

interface RuntimeRunContext {
  runId: string;
  userId: string;
  sessionId: string;
  clientSessionId: string;
  domainPackId: string;
  fsm: FSMProcessSpec;
  snapshot: FSMSnapshot;
}

export interface EventRunHandle {
  runId: string;
  sessionId: string;
  runtimeSessionId: string;
}

type RuntimeAgentSpecInput = Partial<ReActAgentSpec> & {
  metadata?: Record<string, unknown>;
};

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
  cachePolicy?: InferenceCachePolicy;
  agentSpec?: RuntimeAgentSpecInput;
}

interface ChatCachePolicyBuildInput {
  userId: string;
  sessionId: string;
  runId: string;
  modelAlias: string;
  provider: string;
  cache?: unknown;
}

interface LLMInferenceInput {
  messages: LLMMessage[];
  options?: ChatOptions;
}

class ServerLLMInferenceProvider implements InferenceProvider {
  readonly id = 'server-llm';
  private readonly modelProvider: ModelProvider;

  constructor(options: { modelProvider?: ModelProvider; trace?: ServingCacheTraceSink } = {}) {
    this.modelProvider =
      options.modelProvider ??
      createLLMManagerModelProvider(getLLMManager(), {
        servingCacheTrace: options.trace,
      });
  }

  async infer(
    request: InferenceRequest<LLMInferenceInput>
  ): Promise<InferenceResponse<ChatResponse>> {
    const systemPrompt =
      [request.resolvedPrefixContent, request.input.options?.systemPrompt]
        .filter(Boolean)
        .join('\n\n') || undefined;
    const modelResponse = await this.modelProvider.generate({
      runId: request.runId,
      stepId: request.stepId,
      modelAlias: request.input.options?.model ?? request.modelAlias,
      instructions: systemPrompt,
      input: request.input.messages,
      tools: request.input.options?.tools?.map(legacyToolToModelTool),
      temperature: request.input.options?.temperature,
      maxTokens: request.input.options?.maxTokens,
      cache: modelCacheControlFromInferenceRequest(request),
      metadata: request.metadata,
    });
    const response = modelResponseToChatResponse(modelResponse, {
      model: request.input.options?.model ?? request.modelAlias,
      provider: getLLMManager().getProviderFromModel(
        request.input.options?.model ?? request.modelAlias
      ),
    });
    const servingCache = servingCacheResponseMetadata(modelResponse);
    return {
      id: response.id,
      output: response,
      usage: response.usage,
      cache: servingCache ? { servingCache } : undefined,
      metadata: servingCache ? { servingCache } : undefined,
      nextKvCacheValue: extractNextKvCacheValue(modelResponse.raw),
      raw: modelResponse.raw,
    };
  }

  async *stream(
    request: InferenceRequest<LLMInferenceInput>
  ): AsyncIterable<InferenceResponse<StreamChunk>> {
    const systemPrompt =
      [request.resolvedPrefixContent, request.input.options?.systemPrompt]
        .filter(Boolean)
        .join('\n\n') || undefined;
    let index = 0;
    if (!this.modelProvider.stream) {
      throw new Error(`Model provider does not support streaming: ${this.modelProvider.id}`);
    }
    for await (const event of this.modelProvider.stream({
      runId: request.runId,
      stepId: request.stepId,
      modelAlias: request.input.options?.model ?? request.modelAlias,
      instructions: systemPrompt,
      input: request.input.messages,
      tools: request.input.options?.tools?.map(legacyToolToModelTool),
      temperature: request.input.options?.temperature,
      maxTokens: request.input.options?.maxTokens,
      cache: modelCacheControlFromInferenceRequest(request),
      metadata: request.metadata,
    })) {
      index += 1;
      const chunk = modelStreamEventToStreamChunk(event);
      yield {
        id: `${request.runId}:${request.stepId}:stream:${index}`,
        output: chunk,
        usage: chunk.usage,
        nextKvCacheValue: extractNextKvCacheValue(event),
        raw: event,
      };
    }
  }
}

function modelCacheControlFromInferenceRequest(
  request: InferenceRequest<LLMInferenceInput>
): ModelCacheControl | undefined {
  if (!request.resolvedPrefixContent && !request.resolvedKvCacheValue && !request.kvCache) {
    return undefined;
  }
  return {
    prefixContent: request.resolvedPrefixContent,
    kvCacheValue: request.resolvedKvCacheValue,
    kvCacheRef: request.kvCache,
    metadata: request.metadata,
  };
}

function extractNextKvCacheValue(raw: unknown): unknown | undefined {
  const record = asRecord(raw);
  if (!record) return undefined;
  if ('kvCache' in record) return record.kvCache;
  if ('kv_cache' in record) return record.kv_cache;
  const cache = asRecord(record.cache);
  if (!cache) return undefined;
  if ('kvCache' in cache) return cache.kvCache;
  if ('kv_cache' in cache) return cache.kv_cache;
  return undefined;
}

function legacyToolToModelTool(
  tool: NonNullable<ChatOptions['tools']>[number]
): ModelToolDescriptor {
  return {
    id: tool.name,
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  };
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
    const sqliteStorage = storageConfig().relational.sqlite;
    const eventDbPath =
      process.env.HYPHA_RUNTIME_EVENT_DB ?? resolveRuntimePath(sqliteStorage.eventDbPath);
    this.events = new SQLiteEventStore({
      filename: eventDbPath,
      mode: sqliteStorage.sqliteMode,
    });
    this.runtime = new EventFirstRuntime(this.events);
    this.inference = new InferenceManager({
      prefixCache: new InMemoryPrefixCacheProvider(),
      kvCache: new InMemoryKvCacheProvider(),
    });
    this.inference.register(
      new ServerLLMInferenceProvider({
        trace: (event) => this.recordServingCacheEvent(event),
      })
    );
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
      domainPackId: domainPack.id,
      fsm,
      snapshot,
    });
    await this.append(runId, 'run.started', { input: input.input }, timestamp);
    await this.append(runId, 'fsm.state.entered', { stateId: snapshot.currentState }, timestamp, {
      fsmState: snapshot.currentState,
    });
    return { runId, sessionId: input.sessionId, runtimeSessionId };
  }

  async transition(
    runId: string,
    to: string,
    payload: Record<string, unknown> = {}
  ): Promise<void> {
    const context = this.requireRun(runId);
    if (context.snapshot.currentState === to) return;
    const from = context.snapshot.currentState;
    await this.append(runId, 'fsm.transition.requested', { from, to, ...payload }, undefined, {
      fsmState: from,
    });
    try {
      const next = await applyTransitionWithRuntimePolicy(context.fsm, context.snapshot, to, {
        userId: context.userId,
        stepId: String(payload.stepId ?? to),
        guardContext: {
          input: payload,
          variables: payload,
          metadata: {
            clientSessionId: context.clientSessionId,
            runtimeSessionId: context.sessionId,
          },
        },
      });
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
      if (error instanceof FrameworkError && error.code === 'FSM_HUMAN_REVIEW_REQUIRED') {
        await this.append(runId, 'human.review.requested', {
          from,
          to,
          reason: error.message,
        });
      }
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
    const runContext = this.runs.get(input.runId);
    await this.append(
      input.runId,
      'inference.requested',
      {
        stepId: input.stepId,
        modelAlias: resolved.model,
        reasoning: input.reasoning?.method ?? 'direct',
      },
      undefined,
      { stepId: input.stepId }
    );
    await this.append(
      input.runId,
      'model.call.started',
      {
        modelAlias: resolved.model,
      },
      undefined,
      { stepId: input.stepId }
    );

    try {
      const response = await this.reasoning.infer({
        runId: input.runId,
        stepId: input.stepId,
        sessionId: runContext?.clientSessionId,
        modelAlias: resolved.model,
        cachePolicy: input.cachePolicy,
        input: {
          messages: input.messages,
          options: {
            ...input.options,
            model: input.options?.model ?? resolved.model,
          },
        },
        reasoning: input.reasoning,
        metadata: {
          userId: runContext?.userId,
          sessionId: runContext?.clientSessionId,
          runtimeSessionId: runContext?.sessionId,
          provider: resolved.provider,
          domainPackId: runContext?.domainPackId,
        },
      });
      const chat = response.output as ChatResponse;
      await this.append(
        input.runId,
        'model.call.completed',
        {
          model: chat.model,
          provider: chat.provider,
          usage: chat.usage,
        },
        undefined,
        { stepId: input.stepId }
      );
      await this.append(
        input.runId,
        'inference.completed',
        {
          responseId: chat.id,
          usage: response.usage,
          cache: response.cache,
        },
        undefined,
        { stepId: input.stepId }
      );
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

  private async resolveChatAgent(
    input: ChatInferenceInput & {
      agentId?: string;
    },
    userId: string,
    sessionId: string
  ): Promise<ReActAgentSpec> {
    const spec = input.agentSpec ?? {};
    const id = spec.id ?? input.agentId ?? 'agent.default';
    const name = spec.name ?? input.agentId ?? 'Default Runtime Agent';
    const explicitInstructions = mergeSystemPrompts(
      spec.systemInstructions,
      input.options?.systemPrompt
    );
    const systemInstructions =
      explicitInstructions ??
      (await this.renderAgentSystemInstructions({
        agentId: id,
        agentName: name,
        userId,
        sessionId,
        templateId: stringValue(asRecord(spec.metadata)?.promptTemplateId),
      }));

    return {
      ...spec,
      id,
      version: spec.version ?? '0.0.0',
      name,
      modelAlias:
        spec.modelAlias ??
        input.modelAlias ??
        input.options?.model ??
        this.resolveChatModel().model,
      systemInstructions,
      toolRefs: spec.toolRefs ?? input.options?.tools?.map((tool) => tool.name),
    };
  }

  private async renderAgentSystemInstructions(input: {
    agentId: string;
    agentName: string;
    userId: string;
    sessionId: string;
    templateId?: string;
  }): Promise<string | undefined> {
    const templateIds = input.templateId ? [input.templateId, 'default-agent'] : ['default-agent'];
    const variables = {
      agent_id: input.agentId,
      agent_name: input.agentName,
      user_id: input.userId,
      user_name: input.userId,
      session_id: input.sessionId,
      current_date: new Date().toISOString(),
    };

    try {
      const promptManager = getPromptManager();
      await promptManager.ensureInitialized();
      for (const templateId of templateIds) {
        const rendered = promptManager.renderWithValidation(templateId, variables, 'system');
        if (rendered.success) return rendered.result;
        logger.warn('Agent prompt template render failed', {
          templateId,
          errors: rendered.errors,
        });
      }
    } catch (error) {
      logger.warn('Agent prompt template resolution failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return `You are ${input.agentName}. Be helpful, harmless, and honest.`;
  }

  async runReActChat(
    input: ChatInferenceInput & {
      agentId?: string;
      userId?: string;
      sessionId?: string;
    }
  ): Promise<ChatResponse> {
    const runContext = this.runs.get(input.runId);
    const userId = input.userId ?? runContext?.userId ?? 'single-user';
    const sessionId = input.sessionId ?? runContext?.clientSessionId ?? input.runId;
    const agent = await this.resolveChatAgent(input, userId, sessionId);
    const chatOptions = withSystemPrompt(input.options, agent.systemInstructions);
    let chatResponse: ChatResponse | undefined;
    let nextToolCallIndex = 0;
    const toolObservations: Array<Record<string, unknown>> = [];

    const selectToolAction = (toolCall: NonNullable<ChatResponse['toolCalls']>[number]) => ({
      type: 'tool' as const,
      target: toolCall.name,
      input: toolCall.input,
      reason: `model-tool-call:${toolCall.id}`,
    });

    const reactRuntime: ReActAgentRuntime = {
      async reason(context) {
        return {
          runId: context.runId,
          stepId: context.stepId,
          agentId: context.agent.id,
          modelAlias: context.agent.modelAlias,
          input: {
            messages: context.messages as LLMMessage[],
            options: chatOptions,
          },
          cachePolicy: input.cachePolicy,
          metadata: {
            surface: 'event-runtime.react-chat',
          },
        };
      },
      async selectAction(response) {
        if (isChatResponse(response.output)) {
          chatResponse = response.output;
          const toolCall = chatResponse.toolCalls?.[0];
          if (toolCall) {
            return selectToolAction(toolCall);
          }
        }
        return {
          type: 'finish',
          input: response.output,
          reason: 'chat-response-ready',
        };
      },
      async verify(_context, observation) {
        if (chatResponse && observation.source === 'tool') {
          const toolCall = chatResponse.toolCalls?.[nextToolCallIndex];
          toolObservations.push({
            toolCallId: toolCall?.id,
            toolName: toolCall?.name,
            status: observation.provenance?.status,
            output: safeSerialize(observation.value),
          });
          nextToolCallIndex += 1;
          const nextToolCall = chatResponse.toolCalls?.[nextToolCallIndex];
          if (nextToolCall) {
            return selectToolAction(nextToolCall);
          }
          return {
            type: 'finish',
            input: attachToolObservations(chatResponse, toolObservations),
            reason: 'all-tool-calls-observed',
          };
        }
        return {
          type: 'finish',
          input: observation.value,
          reason: 'chat-response-verified',
        };
      },
    };
    const reactInference: InferenceProvider = {
      id: 'event-runtime-react-chat',
      infer: async (request): Promise<InferenceResponse<ChatResponse>> => {
        const requestInput = request.input as LLMInferenceInput;
        const response = await this.inferChat({
          runId: request.runId,
          stepId: request.stepId,
          modelAlias: request.modelAlias,
          messages: requestInput.messages,
          options: requestInput.options,
          reasoning: input.reasoning,
          cachePolicy: request.cachePolicy ?? input.cachePolicy,
        });
        return {
          id: response.id,
          output: response,
          usage: response.usage,
          raw: response.raw,
        };
      },
    };
    const runner = new ReActRunner(reactRuntime, {
      inference: reactInference,
      toolRunner: this.createReActToolRunner(input.runId, userId, sessionId),
      maxIterations: Math.max(4, (chatOptions?.tools?.length ?? 0) + 2),
      onStep: async (step) => {
        await this.record(
          input.runId,
          'react.step.completed',
          {
            stepId: step.id,
            phase: step.phase,
            input: safeSerialize(step.input),
            output: safeSerialize(step.output),
          },
          step.phase
        );
      },
    });
    const result = await runner.run({
      runId: input.runId,
      stepId: input.stepId,
      agent,
      messages: input.messages,
      memoryScope: { userId, sessionId },
    });
    if (result.status !== 'completed') {
      throw new Error(
        result.error instanceof Error ? result.error.message : `ReAct chat failed: ${result.status}`
      );
    }
    if (!isChatResponse(result.output)) {
      throw new Error('ReAct chat completed without a ChatResponse output.');
    }
    return result.output;
  }

  async *streamChat(input: ChatInferenceInput): AsyncGenerator<StreamChunk> {
    const resolved = this.resolveChatModel(input.modelAlias || input.options?.model);
    const runContext = this.runs.get(input.runId);
    const systemPrompt =
      input.options?.systemPrompt ??
      (await this.renderAgentSystemInstructions({
        agentId: input.agentSpec?.id ?? 'agent.default',
        agentName: input.agentSpec?.name ?? 'Default Runtime Agent',
        userId: runContext?.userId ?? 'single-user',
        sessionId: runContext?.clientSessionId ?? input.runId,
        templateId: stringValue(asRecord(input.agentSpec?.metadata)?.promptTemplateId),
      }));
    const chatOptions = withSystemPrompt(input.options, systemPrompt);
    await this.append(
      input.runId,
      'inference.requested',
      {
        stepId: input.stepId,
        modelAlias: resolved.model,
        stream: true,
      },
      undefined,
      { stepId: input.stepId }
    );
    await this.append(
      input.runId,
      'model.call.started',
      {
        modelAlias: resolved.model,
        stream: true,
      },
      undefined,
      { stepId: input.stepId }
    );

    let completed = false;
    try {
      for await (const response of this.inference.stream('server-llm', {
        runId: input.runId,
        stepId: input.stepId,
        sessionId: runContext?.clientSessionId,
        modelAlias: resolved.model,
        cachePolicy: input.cachePolicy,
        input: {
          messages: input.messages,
          options: {
            ...chatOptions,
            model: input.options?.model ?? resolved.model,
          },
        },
        metadata: {
          stream: true,
          userId: runContext?.userId,
          sessionId: runContext?.clientSessionId,
          runtimeSessionId: runContext?.sessionId,
          provider: resolved.provider,
          domainPackId: runContext?.domainPackId,
        },
      })) {
        const chunk = response.output as StreamChunk;
        if (chunk.type === 'error') {
          const message = chunk.error || 'LLM stream error';
          await this.append(
            input.runId,
            'model.call.failed',
            { error: message, stream: true },
            undefined,
            {
              stepId: input.stepId,
            }
          );
          await this.append(
            input.runId,
            'inference.failed',
            { error: message, stream: true },
            undefined,
            {
              stepId: input.stepId,
            }
          );
          yield chunk;
          return;
        }
        if (chunk.type === 'done') {
          completed = true;
          await this.append(
            input.runId,
            'model.call.completed',
            {
              model: resolved.model,
              provider: resolved.provider,
              usage: chunk.usage,
              stream: true,
            },
            undefined,
            { stepId: input.stepId }
          );
          await this.append(
            input.runId,
            'inference.completed',
            {
              stream: true,
              usage: response.usage,
              cache: response.cache,
            },
            undefined,
            { stepId: input.stepId }
          );
        }
        yield chunk;
      }

      if (!completed) {
        await this.append(
          input.runId,
          'model.call.completed',
          {
            model: resolved.model,
            provider: resolved.provider,
            stream: true,
            endedWithoutDone: true,
          },
          undefined,
          { stepId: input.stepId }
        );
        await this.append(
          input.runId,
          'inference.completed',
          {
            stream: true,
            endedWithoutDone: true,
          },
          undefined,
          { stepId: input.stepId }
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.append(
        input.runId,
        'model.call.failed',
        { error: message, stream: true },
        undefined,
        {
          stepId: input.stepId,
        }
      );
      await this.append(
        input.runId,
        'inference.failed',
        { error: message, stream: true },
        undefined,
        {
          stepId: input.stepId,
        }
      );
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

  resolveChatCachePolicy(input: ChatCachePolicyBuildInput): InferenceCachePolicy | undefined {
    return buildChatInferenceCachePolicy(input);
  }

  async runGovernedToolResult<TOutput>(input: {
    runId: string;
    stepId: string;
    userId: string;
    sessionId: string;
    toolId: string;
    toolSpec?: Partial<ToolSpec>;
    params: unknown;
    handler: () => Promise<TOutput>;
  }): Promise<ToolCallResult<TOutput>> {
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
        preconditions: input.toolSpec?.preconditions,
        postconditions: input.toolSpec?.postconditions,
        timeoutPolicy: input.toolSpec?.timeoutPolicy,
        retryPolicy: input.toolSpec?.retryPolicy,
        auditPolicy: input.toolSpec?.auditPolicy,
        humanApprovalPolicy: input.toolSpec?.humanApprovalPolicy,
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
    return result as ToolCallResult<TOutput>;
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
    const result = await this.runGovernedToolResult(input);
    if (result.status !== 'completed') {
      throw new Error(
        typeof result.error === 'string' ? result.error : `Tool failed: ${input.toolId}`
      );
    }
    return result.output as TOutput;
  }

  private createReActToolRunner(runId: string, userId: string, sessionId: string): ToolRunner {
    return {
      run: async (request) => {
        const toolManager = getToolManager();
        const descriptor = toolManager.describeTool(request.toolId);
        const params = normalizeToolInput(request.input);
        try {
          const result = await this.runGovernedToolResult({
            runId,
            stepId: request.context.stepId,
            userId,
            sessionId,
            toolId: descriptor?.id ?? request.toolId,
            params,
            toolSpec: {
              name: descriptor?.name ?? request.toolId,
              description: descriptor?.description ?? `ReAct tool ${request.toolId}`,
              inputSchema: descriptor?.inputSchema ?? { type: 'object' },
              outputSchema: descriptor?.outputSchema,
              sideEffectLevel:
                descriptor?.source === 'mcp' ||
                (descriptor?.sideEffectLevel && descriptor.sideEffectLevel !== 'read')
                  ? descriptor.sideEffectLevel
                  : inferToolSideEffect(request.toolId, params),
              permissionScope: descriptor?.permissionScope,
              preconditions: descriptor?.preconditions,
              postconditions: descriptor?.postconditions,
              timeoutPolicy: descriptor?.timeoutPolicy,
              retryPolicy: descriptor?.retryPolicy,
              auditPolicy: descriptor?.auditPolicy,
              humanApprovalPolicy: descriptor?.humanApprovalPolicy,
              source: descriptor?.source ?? 'local',
              sourceRef:
                descriptor?.source === 'mcp'
                  ? { serverId: descriptor.serverId, capabilityId: descriptor.capabilityId }
                  : undefined,
            },
            handler: async () => {
              const result = await toolManager.executeTool(request.toolId, params);
              if (!result.success) {
                throw new Error(result.error || `Tool failed: ${request.toolId}`);
              }
              return result.output;
            },
          });
          return {
            toolId: request.toolId,
            status: result.status,
            output: result.output,
            error: result.error,
          };
        } catch (error) {
          return {
            toolId: request.toolId,
            status: 'failed',
            error: error instanceof Error ? error.message : String(error),
          };
        }
      },
    };
  }

  async recordMemoryRead<TValue>(input: {
    runId: string;
    stepId: string;
    target: string;
    details?: Record<string, unknown>;
    reader: () => Promise<TValue>;
  }): Promise<TValue> {
    await this.record(
      input.runId,
      'memory.read.requested',
      {
        target: input.target,
        ...input.details,
      },
      input.stepId
    );
    try {
      const value = await input.reader();
      await this.record(
        input.runId,
        'memory.read.completed',
        {
          target: input.target,
          ...input.details,
          resultSummary: summarizeValue(value),
        },
        input.stepId
      );
      return value;
    } catch (error) {
      await this.record(
        input.runId,
        'memory.read.failed',
        {
          target: input.target,
          ...input.details,
          error: error instanceof Error ? error.message : String(error),
        },
        input.stepId
      );
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
    await this.record(
      input.runId,
      'memory.write.requested',
      {
        target: input.target,
        ...input.details,
      },
      input.stepId
    );
    await this.record(
      input.runId,
      'memory.write.validated',
      {
        target: input.target,
        policy: 'default-allow-local-memory',
        ...input.details,
      },
      input.stepId
    );
    try {
      const value = await input.writer();
      await this.record(
        input.runId,
        'memory.write.committed',
        {
          target: input.target,
          ...input.details,
          resultSummary: summarizeValue(value),
        },
        input.stepId
      );
      return value;
    } catch (error) {
      await this.record(
        input.runId,
        'memory.write.rejected',
        {
          target: input.target,
          ...input.details,
          error: error instanceof Error ? error.message : String(error),
        },
        input.stepId
      );
      throw error;
    }
  }

  private async recordServingCacheEvent(event: ServingCacheEvent): Promise<void> {
    if (!event.runId || !this.runs.has(event.runId)) return;
    const { type, runId, stepId, ...payload } = event;
    await this.append(runId, type, payload, undefined, { stepId });
  }

  async record(
    runId: string,
    type: FrameworkEventType,
    payload: unknown,
    stepId?: string
  ): Promise<void> {
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

  async waitForHumanReview(runId: string, payload: Record<string, unknown> = {}): Promise<void> {
    await this.append(runId, 'run.waiting_human', payload);
  }

  createRuntimeSpecFromWorkflow(workflow: WorkflowDefinition): {
    domainPack: DomainPackSpec;
    fsm: FSMProcessSpec;
  } {
    const workflowSpec = workflowDefinitionToWorkflowSpec(workflow);
    const skillIds = uniqueStageRefs(workflow.stages.flatMap((stage) => stage.skills ?? []));
    const toolIds = uniqueStageRefs(workflow.stages.flatMap((stage) => stage.tools ?? []));
    const domainPack = validateDomainPackSpec({
      id: `app.workflow.${workflow.name}`,
      version: workflow.version,
      name: workflow.name,
      taskSchemas: [
        {
          id: `task.${workflow.name}`,
          version: workflow.version,
          taskType: workflow.name,
          inputSchema: { type: 'object', additionalProperties: true },
          outputContractRef: `output.${workflow.name}`,
          defaultWorkflowRef: workflowSpec.id,
        },
      ],
      outputContracts: [
        {
          id: `output.${workflow.name}`,
          version: workflow.version,
          schema: { type: 'object', additionalProperties: true },
        },
      ],
      workflows: [workflowSpec],
      defaultWorkflow: workflowSpec.id,
      allowedSkills: skillIds.map((id) => ({ id })),
      tools: toolIds.map((id): ToolSpec => createWorkflowToolSpec(id, workflow.version)),
    });
    return { domainPack, fsm: compileWorkflowToFSM(domainPack) };
  }

  async executeWorkflow(input: {
    runId: string;
    userId: string;
    workflow: WorkflowDefinition;
    context: WorkflowContextInput;
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
        await this.record(
          input.runId,
          'workflow.stage.started',
          {
            executionId: execution.id,
            stageId: stage.id,
            stageType: stage.type,
          },
          stage.id
        );

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

          await this.record(
            input.runId,
            result.success ? 'workflow.stage.completed' : 'workflow.stage.failed',
            {
              executionId: execution.id,
              stageId: stage.id,
              result: stageResult,
            },
            stage.id
          );

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
            const target =
              nextStageId === 'Completed' || nextStageId === 'Failed' ? nextStageId : nextStageId;
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
            await this.record(
              input.runId,
              'workflow.stage.failed',
              {
                executionId: execution.id,
                stageId: stage.id,
                result: stageResult,
              },
              stage.id
            );
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
        await this.record(
          runId,
          'skill.failed',
          {
            skillId,
            stageId: stage.id,
            error: 'Skill not found',
          },
          stage.id
        );
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
        await this.record(
          runId,
          'skill.failed',
          {
            skillId,
            stageId: stage.id,
            error: result.error,
          },
          stage.id
        );
        return { success: false, error: result.error };
      }
      execution.context.variables = {
        ...execution.context.variables,
        ...(result.variables ?? {}),
      };
      if (result.modifiedContent) {
        currentMessage.content = result.modifiedContent;
      }
      await this.record(
        runId,
        'skill.completed',
        {
          skillId,
          stageId: stage.id,
          variableKeys: Object.keys(result.variables ?? {}),
        },
        stage.id
      );
      if (!result.shouldContinue) break;
    }
    return { success: true, nextStage: stage.next };
  }

  private async executeWorkflowLLMStage(
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
      await this.record(
        runId,
        'agent.reasoning.started',
        {
          stageId: stage.id,
          modelAlias,
        },
        stage.id
      );
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
      await this.record(
        runId,
        'agent.reasoning.completed',
        {
          stageId: stage.id,
          responseId: response.id,
          finishReason: response.finishReason,
        },
        stage.id
      );
      await this.record(
        runId,
        'agent.action.selected',
        {
          stageId: stage.id,
          finishReason: response.finishReason,
          toolCalls: response.toolCalls,
        },
        stage.id
      );
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
            outputSchema: descriptor?.outputSchema,
            sideEffectLevel:
              descriptor?.source === 'mcp' ||
              (descriptor?.sideEffectLevel && descriptor.sideEffectLevel !== 'read')
                ? descriptor.sideEffectLevel
                : inferToolSideEffect(toolName, params),
            permissionScope: descriptor?.permissionScope,
            preconditions: descriptor?.preconditions,
            postconditions: descriptor?.postconditions,
            timeoutPolicy: descriptor?.timeoutPolicy,
            retryPolicy: descriptor?.retryPolicy,
            auditPolicy: descriptor?.auditPolicy,
            humanApprovalPolicy: descriptor?.humanApprovalPolicy,
            source: descriptor?.source ?? 'local',
            sourceRef:
              descriptor?.source === 'mcp'
                ? { serverId: descriptor.serverId, capabilityId: descriptor.capabilityId }
                : undefined,
          },
          handler: async () => {
            const result = await toolManager.executeTool(
              toolName,
              params as Record<string, unknown>
            );
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
    const guard = normalizeWorkflowGuardCondition(stage.condition);
    const conditionMet = evaluateGuardExpression(guard, {
      variables: execution.context.variables,
      metadata: execution.context.metadata,
      input: {
        userId: execution.context.userId,
        sessionId: execution.context.sessionId,
        conversationId: execution.context.conversationId,
        messages: execution.context.messages,
      },
    });
    const branch =
      stage.branches.find(
        (candidate) =>
          (candidate.condition === 'true' && conditionMet) ||
          (candidate.condition === 'false' && !conditionMet)
      ) || stage.branches.find((candidate) => candidate.condition === 'default');
    await this.record(
      runId,
      'workflow.condition.evaluated',
      {
        stageId: stage.id,
        condition: stage.condition,
        guard,
        conditionMet,
        nextStage: branch?.then ?? stage.next,
      },
      stage.id
    );
    return { success: true, output: { conditionMet }, nextStage: branch?.then ?? stage.next };
  }

  private normalizeWorkflowContext(
    workflow: WorkflowDefinition,
    context: WorkflowContextInput,
    userId: string
  ): WorkflowExecutionContext {
    return normalizeWorkflowExecutionContext(workflow, context, userId);
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

  private resolveWorkflowStage(
    stage: WorkflowStage,
    variables: Record<string, unknown>
  ): WorkflowStage {
    const llm = getLLMManager();
    const mergedVars: Record<string, unknown> = {
      defaultProvider: llm.getDefaultProvider(),
      defaultModel: llm.getDefaultModel(),
      ...variables,
    };
    return {
      ...stage,
      model: stage.model
        ? String(this.resolveWorkflowVariables(stage.model, mergedVars))
        : stage.model,
      prompt: stage.prompt
        ? String(this.resolveWorkflowVariables(stage.prompt, mergedVars))
        : stage.prompt,
      condition: stage.condition
        ? String(this.resolveWorkflowVariables(stage.condition, mergedVars))
        : stage.condition,
      tools: stage.tools?.map((tool) => String(this.resolveWorkflowVariables(tool, mergedVars))),
      skills: stage.skills?.map((skill) =>
        String(this.resolveWorkflowVariables(skill, mergedVars))
      ),
      branches: stage.branches?.map((branch) => ({
        ...branch,
        condition: String(this.resolveWorkflowVariables(branch.condition, mergedVars)),
        then: String(this.resolveWorkflowVariables(branch.then, mergedVars)),
        else: branch.else
          ? String(this.resolveWorkflowVariables(branch.else, mergedVars))
          : undefined,
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
  const happyPathStates = [
    'RunInitialized',
    'ContextBuilt',
    'Reasoning',
    'ActionSelected',
    'PolicyChecked',
    'Acting',
    'ObservationRecorded',
    'Verifying',
    'MemorySync',
  ];
  const states = [...happyPathStates, 'HumanReview', 'Completed', 'Failed'];
  const transitions = happyPathStates.map((from, index) => ({
    from,
    to: index === happyPathStates.length - 1 ? 'Completed' : happyPathStates[index + 1],
    description: `${from} next`,
  }));
  transitions.push(
    ...['ActionSelected', 'PolicyChecked', 'Acting', 'ObservationRecorded', 'Verifying'].map(
      (from) => ({ from, to: 'HumanReview', description: `${from} requires human review` })
    ),
    ...states
      .filter((state) => state !== 'Completed' && state !== 'Failed')
      .map((from) => ({ from, to: 'Failed', description: `${from} failed` }))
  );
  return validateDomainPackSpec({
    id: 'hypha.default',
    version: '1.0.0',
    name: 'hypha Default Runtime',
    taskSchemas: [
      {
        id: 'task.runtime',
        version: '1.0.0',
        taskType: 'runtime',
        inputSchema: { type: 'object', additionalProperties: true },
        outputContractRef: 'output.runtime',
        defaultWorkflowRef: 'react-fsm-runtime',
      },
    ],
    outputContracts: [
      {
        id: 'output.runtime',
        version: '1.0.0',
        schema: { type: 'object', additionalProperties: true },
      },
    ],
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
  });
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
        description: `${stage.id} branch:${branch.condition}`,
      });
      if (branch.else) {
        transitions.push({
          from: stage.id,
          to: branch.else === 'end' ? 'Completed' : branch.else,
          description: `${stage.id} else:${branch.condition}`,
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

function uniqueStageRefs(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter((value) => value.length > 0))
  );
}

function createWorkflowToolSpec(id: string, version: string): ToolSpec {
  return {
    id,
    version,
    description: `Workflow tool ${id}.`,
    inputSchema: { type: 'object', additionalProperties: true },
    sideEffectLevel: 'read',
    source: 'local',
  };
}

function inferCompletedState(fsm: FSMProcessSpec): string {
  return (
    fsm.terminalStates.find((state) => state.toLowerCase().includes('complete')) ??
    fsm.terminalStates[0]
  );
}

function inferFailedState(fsm: FSMProcessSpec): string {
  return (
    fsm.terminalStates.find((state) => state.toLowerCase().includes('fail')) ??
    fsm.terminalStates[0]
  );
}

function resolveRuntimePath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

function summarizeValue(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) return { type: 'array', count: value.length };
  if (value && typeof value === 'object') {
    return { type: 'object', keys: Object.keys(value as Record<string, unknown>) };
  }
  return { type: typeof value };
}

function normalizeToolInput(input: unknown): Record<string, unknown> {
  if (input && typeof input === 'object' && !Array.isArray(input)) {
    return input as Record<string, unknown>;
  }
  return input === undefined ? {} : { value: input };
}

function attachToolObservations(
  response: ChatResponse,
  toolObservations: Array<Record<string, unknown>>
): ChatResponse {
  if (!toolObservations.length) return response;
  return {
    ...response,
    raw: {
      ...(asRecord(response.raw) ?? {}),
      hyphaToolObservations: toolObservations,
    },
  };
}

function normalizeWorkflowGuardCondition(condition: string): string {
  return condition
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, pathValue: string) =>
      normalizeWorkflowGuardPath(pathValue)
    )
    .replace(/\$([A-Za-z_][\w.]*)/g, (_match, pathValue: string) =>
      normalizeWorkflowGuardPath(pathValue)
    );
}

function normalizeWorkflowGuardPath(pathValue: string): string {
  const trimmed = pathValue.trim();
  if (/^(variables|metadata|input)\./.test(trimmed)) return trimmed;
  return `variables.${trimmed}`;
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

function isChatResponse(value: unknown): value is ChatResponse {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'id' in value &&
    'content' in value &&
    'finishReason' in value
  );
}

function buildChatInferenceCachePolicy(
  input: ChatCachePolicyBuildInput
): InferenceCachePolicy | undefined {
  const config =
    input.cache === true ? { kvCache: true, writeKvCache: true } : asRecord(input.cache);
  if (!config) return undefined;
  const prefix = parsePrefixCacheRef(config.prefix);
  const kvCache = parseKvCacheRef(config.kvCache, input, 'default');
  const writeKvCache = parseKvCacheWritePolicy(config.writeKvCache, input, kvCache);
  if (!prefix && !kvCache && !writeKvCache) return undefined;
  return {
    prefix,
    kvCache,
    writeKvCache,
  };
}

function parsePrefixCacheRef(input: unknown): PrefixCacheRef | undefined {
  const record = asRecord(input);
  if (!record) return undefined;
  const id = stringValue(record.id);
  const version = stringValue(record.version);
  const contentHash = stringValue(record.contentHash);
  if (!id || !version || !contentHash) return undefined;
  return {
    id,
    version,
    contentHash,
    tokenCount: numberValue(record.tokenCount),
    metadata: asRecord(record.metadata),
  };
}

function parseKvCacheWritePolicy(
  input: unknown,
  defaults: ChatCachePolicyBuildInput,
  readRef: KvCacheRef | undefined
): InferenceCachePolicy['writeKvCache'] {
  if (!input) return undefined;
  if (input === true) {
    return { ref: readRef ?? createDefaultKvCacheRef(defaults, 'default') };
  }
  const record = asRecord(input);
  if (!record) return undefined;
  const nestedRef = parseKvCacheRef(record.ref, defaults, 'write');
  const inlineRef = parseKvCacheRef(record, defaults, 'write');
  const ref = nestedRef ?? inlineRef ?? readRef ?? createDefaultKvCacheRef(defaults, 'default');
  return {
    ref,
    mode: parseKvCacheWriteMode(record.mode),
    ...('value' in record ? { value: record.value } : {}),
  };
}

function parseKvCacheRef(
  input: unknown,
  defaults: ChatCachePolicyBuildInput,
  fallbackId: string
): KvCacheRef | undefined {
  if (!input) return undefined;
  if (input === true) return createDefaultKvCacheRef(defaults, fallbackId);
  const record = asRecord(input);
  if (!record) return undefined;
  const scope = parseKvCacheScope(record.scope);
  const rawId = stringValue(record.id) ?? fallbackId;
  return {
    id: scopedKvCacheId(defaults, scope, rawId),
    provider: defaults.provider,
    modelAlias: defaults.modelAlias,
    scope,
    expiresAt: parseExpiresAt(record),
    metadata: {
      ...asRecord(record.metadata),
      declaredId: rawId,
      userScoped: true,
    },
  };
}

function createDefaultKvCacheRef(defaults: ChatCachePolicyBuildInput, id: string): KvCacheRef {
  const scope: KvCacheScope = 'session';
  return {
    id: scopedKvCacheId(defaults, scope, id),
    provider: defaults.provider,
    modelAlias: defaults.modelAlias,
    scope,
    metadata: {
      declaredId: id,
      userScoped: true,
    },
  };
}

function scopedKvCacheId(
  defaults: ChatCachePolicyBuildInput,
  scope: KvCacheScope,
  declaredId: string
): string {
  const scopeKey =
    scope === 'run' ? defaults.runId : scope === 'session' ? defaults.sessionId : 'workspace';
  return `chatkv_${hashContent(
    [defaults.userId, scope, scopeKey, defaults.provider, defaults.modelAlias, declaredId].join(':')
  ).slice(0, 32)}`;
}

function parseKvCacheScope(input: unknown): KvCacheScope {
  return input === 'run' || input === 'workspace' ? input : 'session';
}

function parseKvCacheWriteMode(input: unknown): KvCacheWriteMode | undefined {
  if (input === 'write_if_missing' || input === 'refresh' || input === 'write_through') {
    return input;
  }
  return undefined;
}

function parseExpiresAt(record: Record<string, unknown>): string | undefined {
  const expiresAt = stringValue(record.expiresAt);
  if (expiresAt) return expiresAt;
  const ttlMs = numberValue(record.ttlMs);
  return ttlMs && ttlMs > 0 ? new Date(Date.now() + ttlMs).toISOString() : undefined;
}

function stringValue(input: unknown): string | undefined {
  return typeof input === 'string' && input.trim() ? input.trim() : undefined;
}

function mergeSystemPrompts(...prompts: Array<string | undefined>): string | undefined {
  const parts: string[] = [];
  const seen = new Set<string>();
  for (const prompt of prompts) {
    const normalized = stringValue(prompt);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    parts.push(normalized);
  }
  return parts.length > 0 ? parts.join('\n\n') : undefined;
}

function withSystemPrompt(
  options: ChatOptions | undefined,
  systemPrompt: string | undefined
): ChatOptions | undefined {
  const resolved = mergeSystemPrompts(systemPrompt);
  if (!resolved) return options;
  if (options?.systemPrompt === resolved) return options;
  return {
    ...options,
    systemPrompt: resolved,
  };
}

function numberValue(input: unknown): number | undefined {
  return typeof input === 'number' && Number.isFinite(input) ? input : undefined;
}

function asRecord(input: unknown): Record<string, unknown> | undefined {
  return input && typeof input === 'object' && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : undefined;
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
