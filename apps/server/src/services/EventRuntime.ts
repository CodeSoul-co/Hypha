import path from 'path';
import {
  ArtifactStoreToolPort,
  FileArtifactStore,
  FileToolContractSnapshotStore,
  FileToolObservationStore,
  FileToolRuntimeStore,
  LocalFilesystemExecutionArtifactStore,
  SQLiteEventStore,
} from '@hypha/adapters-local';
import {
  ArtifactSessionCommandPayloadStore,
  createFrameworkEvent,
  hashCanonicalJson,
  InMemoryEventSchemaRegistry,
  InMemoryTelemetryRecorder,
  FrameworkError,
  RuntimeCancellationService,
  registerRuntimeOrchestrationEventSchemas,
  recoveryFailureFingerprint,
  stableRecoveryHash,
  type FrameworkEvent,
  type FrameworkEventType,
  type EventStore,
  type EventSchemaRegistry,
  type TraceRecorder,
  type RecoveryFailure,
  type RecoveryKnowledge,
  type RecoveryKnowledgePort,
  type NormalizedRuntimeError,
  type RuntimeCancelResult,
  type RuntimeJsonValue,
  type ListSessionCommandsRequest,
  type SessionCommandHandlerResult,
  type SessionCommandRecord,
  type SessionQueueScope,
  type SpecRef,
} from '@hypha/core';
import {
  DurableEventStoreBridge,
  runRecoverySupervisor,
  type RecoveryParticipant,
} from '@hypha/harness';
import {
  compileWorkflowToFSM,
  validateDomainPackSpec,
  type DomainPackSpec,
  type WorkflowSpec,
} from '@hypha/domain';
import {
  createInitialSnapshot,
  evaluateGuardExpression,
  fsmProcessSpecSchema,
  validateFSMProcessSpec,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';
import {
  createDefaultInferenceBackendRegistry,
  hashContent,
  HttpLocalInferenceDriver,
  HyphaInferencePipeline,
  InferenceManager,
  InMemoryKvCacheProvider,
  InMemoryPrefixCacheProvider,
  ReasoningOrchestrator,
  classifyInferenceFailure,
  type AgentPromptRef,
  type AgentPromptResolution,
  type AgentPromptSpec,
  type InferenceCachePolicy,
  type InferenceProvider,
  type InferenceRequest,
  type InferenceResponse,
  type LocalInferenceDriver,
  type KvCacheRef,
  type KvCacheScope,
  type KvCacheWriteMode,
  type PrefixCacheRef,
  type ReasoningRequest,
  type ReasoningOptions,
  type ReasoningStrategy,
  type ReasoningStrategyDescriptor,
} from '@hypha/inference';
import { classifyMemoryFailure } from '@hypha/memory';
import type { ReActAgentRuntime, ReActAgentSpec } from '@hypha/kernel';
import type { LoadedSkillContext, SkillRef } from '@hypha/skills';
import type { ModelCacheControl, ModelProvider, ModelToolDescriptor } from '@hypha/models';
import {
  GovernedToolRunner,
  hashToolContract,
  InMemoryToolResultCache,
  RedisToolResultCache,
  ToolRegistry,
  type ToolContractSnapshot,
  type ToolContractSnapshotStore,
  type ToolCallResult,
  type ToolAuthorityConstraint,
  type ToolExecutionScope,
  type ToolPrincipal,
  type ToolRunner,
  type ToolSpec,
  type ToolInvocationRecord,
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
import { inferenceConfig, storageConfig, toolResultCacheConfig } from '../config';
import { getRedisClient } from './database';
import type { ChatOptions, ChatResponse, LLMMessage, StreamChunk } from '../core/llm/types';
import { getSkillManager } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { generateId, now } from '../utils/helpers';
import { logger } from '../utils/logger';
import { createRuntimeBackbone, type RuntimeBackbone } from '../runtime/RuntimeBackbone';
import { RuntimeBackboneLifecycle } from '../runtime/RuntimeBackboneLifecycle';
import type { RuntimeComposition } from '../runtime/RuntimeCompositionRoot';
import { createServerRuntimeComposition } from '../runtime/ServerRuntimeComposition';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandPayloads,
} from '../runtime/ServerSessionCommandRuntime';
import { OrchestrationEventStore } from '../runtime/OrchestrationEventStore';
import {
  RuntimeTransitionDispatcher,
  type RuntimeTransitionCommand,
} from '../runtime/RuntimeTransitionDispatcher';
import { resolveRuntimeToolAuthority } from '../runtime/RuntimeToolAuthority';
import {
  projectRuntimeRunContext,
  projectRuntimeRunContexts,
  runtimeRunContextMetadata,
  type RuntimeRunContext,
} from '../runtime/RuntimeRunContextProjection';
import {
  projectWorkflowExecution,
  workflowExecutionIdFromEvent,
  type WorkflowExecutionProjection,
} from '../runtime/WorkflowExecutionProjection';

export class HumanReviewRequiredError extends Error {
  readonly code = 'HUMAN_REVIEW_REQUIRED';

  constructor(
    readonly runId: string,
    readonly approval: Record<string, unknown>
  ) {
    super(`Run ${runId} is waiting for human review.`);
    this.name = 'HumanReviewRequiredError';
  }
}

export function isHumanReviewRequiredError(error: unknown): error is HumanReviewRequiredError {
  return error instanceof HumanReviewRequiredError;
}

export interface EventRunHandle {
  runId: string;
  sessionId: string;
  runtimeSessionId: string;
}

type RuntimeAgentSpecInput = Partial<ReActAgentSpec> & {
  metadata?: Record<string, unknown>;
};

type ResolvedRuntimeAgentSpec = ReActAgentSpec & {
  promptResolution?: AgentPromptResolution;
  activeSkills?: LoadedSkillContext[];
};

export interface SkillHumanReviewTask {
  taskId: string;
  runId: string;
  skillId: string;
  skillVersion: string;
  skillRevision: string;
  contentHash?: string;
  userId: string;
  agentId: string;
  domainId: string;
  requestedAt: string;
  expiresAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  decidedBy?: string;
  decidedAt?: string;
}

export interface OwnedRunScope {
  runId: string;
  userId: string;
  sessionId: string;
  clientSessionId: string;
  domainPackId: string;
}

type SkillResolvingManager = {
  resolveSkills?: (input: {
    agentSkillRefs: SkillRef[];
    inputText?: string;
    allowedSkills?: string[];
    requiredSkills?: string[];
    availableToolRefs?: string[];
    metadata?: Record<string, unknown>;
  }) => Promise<LoadedSkillContext[]>;
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

type StartRunCommandPayload = Omit<StartRunInput, 'userId' | 'sessionId'>;

interface RuntimeSessionCommandPayloads extends ServerSessionCommandPayloads {
  start_run: StartRunCommandPayload;
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
  toolPrincipal?: ToolPrincipal;
  toolPrincipalHasAllPermissions?: boolean;
  toolAuthorityConstraints?: readonly ToolAuthorityConstraint[];
  metadata?: Record<string, unknown>;
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

class PipelineChatInferenceProvider implements InferenceProvider {
  readonly id = 'server-inference-backend';

  constructor(
    private readonly pipeline: HyphaInferencePipeline,
    private readonly backendId: string,
    private readonly driver?: LocalInferenceDriver,
    private readonly autoStart = false
  ) {}

  async infer(
    request: InferenceRequest<LLMInferenceInput>
  ): Promise<InferenceResponse<ChatResponse>> {
    await this.ensureLocalEngine();
    const response = await this.pipeline.infer(this.toPipelineRequest(request));
    const chat = backendResponseToChatResponse(response, request.modelAlias, this.backendId);
    return {
      ...response,
      output: chat,
    };
  }

  async *stream(
    request: InferenceRequest<LLMInferenceInput>
  ): AsyncIterable<InferenceResponse<StreamChunk>> {
    await this.ensureLocalEngine();
    let index = 0;
    let lastUsage: InferenceResponse['usage'];
    for await (const response of this.pipeline.stream(this.toPipelineRequest(request))) {
      index += 1;
      lastUsage = response.usage ?? lastUsage;
      const content =
        typeof response.output === 'string' ? response.output : String(response.output);
      if (!content) continue;
      yield {
        ...response,
        id: `${response.id}:chunk:${index}`,
        output: { type: 'content', content, usage: chatUsageFromInference(response.usage) },
      };
    }
    yield {
      id: `${request.runId}:${request.stepId}:done`,
      output: { type: 'done', usage: chatUsageFromInference(lastUsage) },
      usage: lastUsage,
      metadata: { backendId: this.backendId },
    };
  }

  private toPipelineRequest(
    request: InferenceRequest<LLMInferenceInput>
  ): InferenceRequest<Record<string, unknown>> {
    const reasoningInstruction = stringValue(request.metadata?.reasoningInstruction);
    const systemPrompt = [request.input.options?.systemPrompt, reasoningInstruction]
      .filter(Boolean)
      .join('\n\n');
    return {
      ...request,
      backendId: request.backendId ?? this.backendId,
      input: {
        instructions: systemPrompt || undefined,
        messages: request.input.messages,
      },
      options: {
        temperature: request.input.options?.temperature,
        maxTokens: request.input.options?.maxTokens,
        topP: request.input.options?.topP,
        topK: request.input.options?.topK,
        stop: request.input.options?.stopSequences,
        responseFormat: 'text',
      },
      tools: request.input.options?.tools?.map((tool) => ({
        id: tool.name,
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema as Record<string, unknown>,
      })),
    };
  }

  private async ensureLocalEngine(): Promise<void> {
    if (!this.driver || !this.autoStart) return;
    if (this.driver.status().state !== 'ready') await this.driver.start();
  }
}

function createRuntimeInferenceProvider(trace: ServingCacheTraceSink): InferenceProvider {
  const config = inferenceConfig();
  if (config.runtimeProvider !== 'backend') {
    return new ServerLLMInferenceProvider({ trace });
  }
  const backendId = config.local.enabled ? config.local.engine : config.defaultBackend;
  const backends = createDefaultInferenceBackendRegistry({
    defaultBackendId: backendId,
    ollama: config.backends.ollama,
    sglang: config.backends.sglang,
    vllm: config.backends.vllm,
    llamaCpp: config.backends.llamaCpp,
    openaiApi: config.backends.openaiApi,
  });
  let driver: LocalInferenceDriver | undefined;
  if (config.local.enabled) {
    driver = new HttpLocalInferenceDriver({
      id: config.local.engine,
      kind: config.local.engine,
      mode: config.local.mode,
      baseUrl: config.backends[config.local.engine].baseUrl,
      endpoint: config.backends[config.local.engine].endpoint,
      model: config.local.model,
      host: config.local.host,
      port: config.local.port,
      command: config.local.command,
      args: config.local.args,
      cwd: config.local.cwd,
      startupTimeoutMs: config.local.startupTimeoutMs,
      healthPollMs: config.local.healthPollMs,
      requestTimeoutMs: config.backends[config.local.engine].timeoutMs,
    });
    backends.register(driver.backend(), { default: true });
  }
  const pipeline = new HyphaInferencePipeline({
    id: 'server-hypha-inference-pipeline',
    defaultBackendId: backendId,
    backends,
    reusePolicy: config.plasmod.reusePolicy,
  });
  return new PipelineChatInferenceProvider(pipeline, backendId, driver, config.local.autoStart);
}

function backendResponseToChatResponse(
  response: InferenceResponse,
  model: string,
  backendId: string
): ChatResponse {
  const toolCalls = extractBackendToolCalls(response.raw);
  const content =
    typeof response.output === 'string' ? response.output : String(response.output ?? '');
  const usage = response.usage
    ? {
        inputTokens: response.usage.inputTokens ?? 0,
        outputTokens: response.usage.outputTokens ?? 0,
        totalTokens:
          response.usage.totalTokens ??
          (response.usage.inputTokens ?? 0) + (response.usage.outputTokens ?? 0),
      }
    : undefined;
  return {
    id: response.id,
    model,
    provider: backendId as ChatResponse['provider'],
    content,
    role: 'assistant',
    finishReason: toolCalls?.length ? 'tool_use' : 'stop',
    usage,
    toolCalls,
    raw: response.raw,
  };
}

function chatUsageFromInference(
  usage: InferenceResponse['usage']
): ChatResponse['usage'] | undefined {
  if (!usage) return undefined;
  return {
    inputTokens: usage.inputTokens ?? 0,
    outputTokens: usage.outputTokens ?? 0,
    totalTokens: usage.totalTokens ?? (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0),
  };
}

function extractBackendToolCalls(raw: unknown): ChatResponse['toolCalls'] {
  const record = asRecord(raw);
  const choices = Array.isArray(record?.choices) ? record.choices : [];
  const choice = asRecord(choices[0]);
  const message = asRecord(choice?.message) ?? asRecord(record?.message);
  const toolCalls = Array.isArray(message?.tool_calls)
    ? message.tool_calls
    : Array.isArray(message?.toolCalls)
      ? message.toolCalls
      : [];
  return toolCalls.map((value, index) => {
    const toolCall = asRecord(value) ?? {};
    const fn = asRecord(toolCall.function) ?? {};
    return {
      id: stringValue(toolCall.id) ?? `tool-call-${index + 1}`,
      name: stringValue(fn.name) ?? stringValue(toolCall.name) ?? `tool-${index + 1}`,
      input: parseToolArguments(fn.arguments ?? toolCall.arguments),
    };
  });
}

function parseToolArguments(value: unknown): unknown {
  if (typeof value !== 'string') return value ?? {};
  try {
    return JSON.parse(value);
  } catch {
    return { value };
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
  private readonly legacyEvents: SQLiteEventStore;
  private readonly events: EventStore & TraceRecorder;
  private readonly knownSessions = new Set<string>();
  private readonly inference: InferenceManager;
  private readonly inferenceProviderId: string;
  private readonly reasoning: ReasoningOrchestrator;
  private readonly defaultDomainPack = createDefaultDomainPack();
  private readonly defaultFsm = compileWorkflowToFSM(this.defaultDomainPack);
  private readonly toolRegistry = new ToolRegistry();
  private readonly toolTelemetry = new InMemoryTelemetryRecorder();
  private readonly toolRunner: GovernedToolRunner;
  private readonly toolSnapshotStore: ToolContractSnapshotStore;
  private readonly runToolSnapshots = new Map<string, Promise<string>>();
  private readonly transitionDispatcher = new RuntimeTransitionDispatcher();
  private readonly runtimeWorkerId = `server.runtime:${process.pid}`;
  private canonicalLifecycle?: RuntimeBackboneLifecycle;
  private canonicalComposition?: Readonly<RuntimeComposition>;
  private canonicalEvents?: DurableEventStoreBridge;
  private cancellationService?: RuntimeCancellationService;
  private recoveryKnowledge?: RecoveryKnowledgePort;
  private canonicalRuntimeFilename?: string;
  private sessionCommandInitialization?: Promise<void>;
  private sessionCommandArtifacts?: LocalFilesystemExecutionArtifactStore;
  private sessionCommands?: ServerSessionCommandRuntime<RuntimeSessionCommandPayloads>;

  constructor() {
    const sqliteStorage = storageConfig().relational.sqlite;
    const eventDbPath =
      process.env.HYPHA_RUNTIME_EVENT_DB ?? resolveRuntimePath(sqliteStorage.eventDbPath);
    this.legacyEvents = new SQLiteEventStore({
      filename: eventDbPath,
      mode: sqliteStorage.sqliteMode,
    });
    this.events = new OrchestrationEventStore({
      legacy: this.legacyEvents,
      canonical: () => this.canonicalEventStore(),
    });
    const toolRuntimeStore = new FileToolRuntimeStore({
      filename: process.env.HYPHA_TOOL_RUNTIME_STORE ?? `${eventDbPath}.tool-runtime.json`,
    });
    this.toolSnapshotStore = new FileToolContractSnapshotStore(
      process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT ?? `${eventDbPath}.tool-snapshots`
    );
    const artifactPort = new ArtifactStoreToolPort(
      new FileArtifactStore({
        rootPath: process.env.HYPHA_TOOL_ARTIFACT_ROOT ?? `${eventDbPath}.tool-artifacts`,
      })
    );
    const observationPort = new FileToolObservationStore(
      process.env.HYPHA_TOOL_OBSERVATION_ROOT ?? `${eventDbPath}.tool-observations`
    );
    const toolCacheConfig = toolResultCacheConfig();
    const redis = getRedisClient();
    const toolResultCache =
      toolCacheConfig.store === 'memory'
        ? new InMemoryToolResultCache({
            maxEntries: toolCacheConfig.maxEntries,
            maxEntryBytes: toolCacheConfig.maxEntryBytes,
          })
        : toolCacheConfig.store === 'redis' && redis
          ? new RedisToolResultCache({
              client: {
                get: (key) => redis.get(key),
                set: (key, value, mode, durationMilliseconds) =>
                  mode && durationMilliseconds !== undefined
                    ? redis.set(key, value, mode, durationMilliseconds)
                    : redis.set(key, value),
                del: (...keys) => redis.del(...keys),
              },
              namespace: toolCacheConfig.namespace,
              maxEntryBytes: toolCacheConfig.maxEntryBytes,
              defaultTtlMs: toolCacheConfig.redisDefaultTtlMs,
            })
          : undefined;
    this.toolRunner = new GovernedToolRunner(this.toolRegistry, this.events, undefined, {
      approvalStore: toolRuntimeStore,
      invocationStore: toolRuntimeStore,
      artifactPort,
      snapshotStore: this.toolSnapshotStore,
      observationPort,
      telemetry: this.toolTelemetry,
      resultCache: toolResultCache,
      resultCacheFailureMode: toolCacheConfig.failureMode,
      resultCacheTimeoutMs: toolCacheConfig.operationTimeoutMs,
      resultCacheMaxEntryBytes: toolCacheConfig.maxEntryBytes,
    });
    this.inference = new InferenceManager({
      prefixCache: new InMemoryPrefixCacheProvider(),
      kvCache: new InMemoryKvCacheProvider(),
      onRecoveryFailure: (failure) => this.recordBypassedCacheFailure(failure),
    });
    const inferenceProvider = createRuntimeInferenceProvider((event) =>
      this.recordServingCacheEvent(event)
    );
    this.inferenceProviderId = inferenceProvider.id;
    this.inference.register(inferenceProvider);
    this.reasoning = new ReasoningOrchestrator({
      id: 'server-inference-router',
      infer: (request) => this.inference.infer(this.inferenceProviderId, request),
      stream: (request) => this.inference.stream(this.inferenceProviderId, request),
    });
  }

  async initializeCanonicalRuntime(
    options: { filename?: string; schemaRegistry?: EventSchemaRegistry } = {}
  ): Promise<RuntimeBackbone> {
    if (!this.canonicalLifecycle) {
      const sqliteStorage = storageConfig().relational.sqlite;
      const legacyEventDbPath =
        process.env.HYPHA_RUNTIME_EVENT_DB ?? resolveRuntimePath(sqliteStorage.eventDbPath);
      const filename =
        options.filename ??
        process.env.HYPHA_CANONICAL_RUNTIME_DB ??
        `${legacyEventDbPath}.canonical.sqlite`;
      this.canonicalRuntimeFilename = filename;
      const schemaRegistry = options.schemaRegistry ?? new InMemoryEventSchemaRegistry();
      this.canonicalLifecycle = new RuntimeBackboneLifecycle(async () => {
        await registerRuntimeOrchestrationEventSchemas(schemaRegistry);
        return createRuntimeBackbone({ filename, schemaRegistry });
      });
    }
    const backbone = await this.canonicalLifecycle.initialize();
    if (!this.canonicalComposition) {
      this.canonicalComposition = createServerRuntimeComposition({
        backbone,
        compatibilityEvents: this.events,
        inference: this.reasoning,
        toolRunner: this.toolRunner,
        fsmSpec: this.defaultFsm,
        executeState: (input) => this.transitionDispatcher.executeState(input),
        nextId: (namespace) => `${namespace}:${generateId()}`,
      });
    }
    await this.initializeSessionCommands(
      this.canonicalRuntimeFilename ?? options.filename ?? 'runtime.canonical.sqlite'
    );
    return backbone;
  }

  canonicalRuntime(): RuntimeBackbone {
    if (!this.canonicalLifecycle) {
      throw new Error('Canonical Runtime backbone is not initialized');
    }
    return this.canonicalLifecycle.get();
  }

  canonicalRuntimeComposition(): Readonly<RuntimeComposition> {
    this.canonicalRuntime();
    if (!this.canonicalComposition) {
      throw new Error('Canonical Runtime composition is not initialized');
    }
    return this.canonicalComposition;
  }

  async restoreRunContexts(): Promise<number> {
    const contexts = projectRuntimeRunContexts(await this.canonicalEventStore().list());
    for (const context of contexts) {
      this.knownSessions.add(context.sessionId);
    }
    return contexts.length;
  }

  isCanonicalRuntimeInitialized(): boolean {
    return this.canonicalLifecycle?.isInitialized() ?? false;
  }

  async startSessionCommandScheduler(): Promise<void> {
    if (!this.isCanonicalRuntimeInitialized()) await this.initializeCanonicalRuntime();
    const commands = this.requireSessionCommands();
    if (!commands.isRunning()) commands.start();
  }

  isSessionCommandSchedulerRunning(): boolean {
    return this.sessionCommands?.isRunning() ?? false;
  }

  async enqueueStartRun(
    input: StartRunInput,
    idempotencyKey: string
  ): Promise<SessionCommandRecord> {
    if (!this.isCanonicalRuntimeInitialized()) await this.initializeCanonicalRuntime();
    const normalizedKey = idempotencyKey.trim();
    if (!normalizedKey) invalidRuntimeInput('idempotencyKey must be non-empty');
    const digest = hashCanonicalJson({
      commandType: 'start_run',
      userId: input.userId,
      sessionId: input.sessionId,
      idempotencyKey: normalizedKey,
    }).slice('sha256:'.length);
    const { userId, sessionId, ...payload } = input;
    return this.requireSessionCommands().enqueue({
      id: `session-command:${digest}`,
      commandType: 'start_run',
      idempotencyKey: normalizedKey,
      userId,
      sessionId,
      targetRunId: `run:${digest}`,
      payload,
    });
  }

  async listSessionCommands(
    scope: SessionQueueScope,
    options: Omit<ListSessionCommandsRequest, 'scope'> = {}
  ): Promise<SessionCommandRecord[]> {
    if (!this.isCanonicalRuntimeInitialized()) await this.initializeCanonicalRuntime();
    return this.canonicalRuntime().sessionQueue.list({ scope, ...options });
  }

  async drainSessionCommands(scope: SessionQueueScope): Promise<void> {
    if (!this.isSessionCommandSchedulerRunning()) {
      throw new FrameworkError({
        code: 'RUNTIME_SESSION_QUEUE_CONFLICT',
        message: 'Session Command Scheduler must be running before awaiting drain',
      });
    }
    await this.canonicalRuntime().sessionQueue.drain(scope);
  }

  async close(): Promise<void> {
    await this.sessionCommandInitialization?.catch(() => undefined);
    const failures: unknown[] = [];
    try {
      await this.sessionCommands?.close();
    } catch (error) {
      failures.push(error);
    }
    try {
      await this.sessionCommandArtifacts?.close();
    } catch (error) {
      failures.push(error);
    }
    try {
      await this.canonicalLifecycle?.close();
    } catch (error) {
      failures.push(error);
    }
    this.sessionCommands = undefined;
    this.sessionCommandArtifacts = undefined;
    this.sessionCommandInitialization = undefined;
    this.canonicalComposition = undefined;
    this.canonicalEvents = undefined;
    this.cancellationService = undefined;
    if (failures.length > 0) throw failures[0];
  }

  private async initializeSessionCommands(filename: string): Promise<void> {
    if (this.sessionCommands) return;
    const pending = this.sessionCommandInitialization ?? this.openSessionCommands(filename);
    this.sessionCommandInitialization = pending;
    try {
      await pending;
    } catch (error) {
      if (this.sessionCommandInitialization === pending) {
        this.sessionCommandInitialization = undefined;
      }
      throw error;
    }
  }

  private async openSessionCommands(filename: string): Promise<void> {
    const artifacts = new LocalFilesystemExecutionArtifactStore({
      rootPath:
        process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT ??
        `${path.resolve(filename)}.session-command-artifacts`,
    });
    try {
      const health = await artifacts.health();
      if (health.status !== 'healthy') {
        throw new Error(
          `Session Command Artifact Store is ${health.status}${health.message ? `: ${health.message}` : ''}`
        );
      }
      const commands = new ServerSessionCommandRuntime<RuntimeSessionCommandPayloads>({
        queue: this.canonicalRuntime().sessionQueue,
        payloads: new ArtifactSessionCommandPayloadStore({ artifacts }),
        workerId: `${this.runtimeWorkerId}:session-commands`,
        leaseMs: 30_000,
        definitions: {
          start_run: {
            decode: decodeStartRunCommandPayload,
            handle: ({ command, payload }) => this.handleStartRunCommand(command, payload),
          },
        },
        classifyFailure: classifySessionCommandFailure,
        onError: (error) => logger.error('Session Command Scheduler polling failed', error),
      });
      this.sessionCommandArtifacts = artifacts;
      this.sessionCommands = commands;
    } catch (error) {
      await artifacts.close().catch(() => undefined);
      throw error;
    }
  }

  private requireSessionCommands(): ServerSessionCommandRuntime<RuntimeSessionCommandPayloads> {
    if (!this.sessionCommands) throw new Error('Session Command Runtime is not initialized');
    return this.sessionCommands;
  }

  private async handleStartRunCommand(
    command: Readonly<SessionCommandRecord>,
    payload: StartRunCommandPayload
  ): Promise<SessionCommandHandlerResult> {
    if (!command.targetRunId) invalidRuntimeInput('start_run command requires targetRunId');
    const run = await this.startRunWithId(
      { ...payload, userId: command.userId, sessionId: command.sessionId },
      command.targetRunId
    );
    return { disposition: 'applied', resultRunId: run.runId };
  }

  private canonicalEventStore(): DurableEventStoreBridge {
    if (!this.canonicalEvents) {
      this.canonicalEvents = new DurableEventStoreBridge({
        events: this.canonicalRuntime().events,
      });
    }
    return this.canonicalEvents;
  }

  listReasoningStrategies(): ReasoningStrategyDescriptor[] {
    return this.reasoning.registry.list();
  }

  registerReasoningStrategy(strategy: ReasoningStrategy, replace = false): void {
    this.reasoning.registry.register(strategy, { replace });
  }

  unregisterReasoningStrategy(id: string): boolean {
    return this.reasoning.registry.unregister(id);
  }

  async listAgentPrompts(): Promise<AgentPromptSpec[]> {
    const manager = getPromptManager();
    await manager.ensureInitialized();
    return manager.listAgentPrompts();
  }

  async registerAgentPrompt(spec: AgentPromptSpec): Promise<void> {
    const manager = getPromptManager();
    await manager.ensureInitialized();
    manager.registerAgentPrompt(spec);
  }

  async unregisterAgentPrompt(id: string, version?: string): Promise<boolean> {
    const manager = getPromptManager();
    await manager.ensureInitialized();
    return manager.unregisterAgentPrompt(id, version);
  }

  async startRun(input: StartRunInput): Promise<EventRunHandle> {
    return this.startRunWithId(input, generateId());
  }

  private async startRunWithId(input: StartRunInput, runId: string): Promise<EventRunHandle> {
    if (!this.isCanonicalRuntimeInitialized()) await this.initializeCanonicalRuntime();
    const domainPack = input.domainPack ?? this.defaultDomainPack;
    const fsm = input.fsm ?? this.defaultFsm;
    const runtimeSessionId = this.runtimeSessionId(input.userId, input.sessionId);
    await this.ensureSession(input.userId, input.sessionId, domainPack, input.metadata);

    const timestamp = new Date().toISOString();
    const workflowRef = input.workflowRef ?? {
      id: fsm.id,
      version: fsm.version,
    };
    const snapshot = createInitialSnapshot(fsm, runId, timestamp);
    const context: RuntimeRunContext = {
      runId,
      userId: input.userId,
      sessionId: runtimeSessionId,
      clientSessionId: input.sessionId,
      domainPackId: domainPack.id,
      fsm,
      snapshot,
    };

    const existingEvents = await this.canonicalEventStore().list({ runId });
    const existingContext = projectRuntimeRunContext(existingEvents, runId);
    if (existingContext) {
      if (
        existingContext.userId !== input.userId ||
        existingContext.clientSessionId !== input.sessionId ||
        existingContext.sessionId !== runtimeSessionId
      ) {
        throw new FrameworkError({
          code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
          message: `Run id is already bound to another Session scope: ${runId}`,
        });
      }
    } else {
      await this.canonicalRuntimeComposition().runManager.createRun({
        id: runId,
        sessionId: runtimeSessionId,
        userId: input.userId,
        domainPackRef: { id: domainPack.id, version: domainPack.version },
        workflowRef,
        agentRef: input.agentId ? { id: input.agentId } : undefined,
        input: input.input,
        metadata: {
          ...input.metadata,
          ...runtimeRunContextMetadata(context),
        },
        timestamp,
      });
    }
    if (!existingEvents.some((event) => event.type === 'run.started')) {
      await this.append(runId, 'run.started', { runId, input: input.input }, timestamp, {
        eventId: `${runId}:started`,
      });
    }
    if (!existingEvents.some((event) => event.type === 'fsm.state.entered')) {
      await this.append(
        runId,
        'fsm.state.entered',
        { stateId: snapshot.currentState, snapshot },
        timestamp,
        { eventId: `${runId}:initial-state`, fsmState: snapshot.currentState }
      );
    }
    return { runId, sessionId: input.sessionId, runtimeSessionId };
  }

  async transition(
    runId: string,
    to: string,
    payload: Record<string, unknown> = {}
  ): Promise<void> {
    const context = await this.requireRun(runId);
    if (context.snapshot.currentState === to) return;
    const from = context.snapshot.currentState;
    const command = this.createTransitionCommand(context, to, payload);
    await this.append(
      runId,
      'fsm.transition.requested',
      { commandId: command.id, from, to, ...payload },
      undefined,
      { fsmState: from }
    );
    try {
      const result = await this.transitionDispatcher.dispatch(command, () =>
        this.canonicalRuntimeComposition().fsmDriver.run({
          scope: {
            userId: context.userId,
            sessionId: context.sessionId,
            runId,
          },
          process: context.fsm,
          ownerId: this.runtimeWorkerId,
          maxSteps: 1,
          leaseTtlMs: 30_000,
          stateClaimTtlMs: 30_000,
        })
      );
      if (result.steps !== 1 || result.projection.currentState !== to) {
        throw new FrameworkError({
          code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
          message: `Canonical FSM transition was not executed: ${runId} ${from} -> ${to}`,
          context: { runId, from, to, disposition: result.disposition },
        });
      }
    } catch (error) {
      if (error instanceof FrameworkError && error.code === 'FSM_HUMAN_REVIEW_REQUIRED') {
        await this.append(runId, 'human.review.requested', {
          commandId: command.id,
          from,
          to,
          reason: error.message,
        });
      }
      await this.append(runId, 'fsm.transition.rejected', {
        commandId: command.id,
        from,
        to,
        reason: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  private createTransitionCommand(
    context: RuntimeRunContext,
    to: string,
    payload: Record<string, unknown>
  ): RuntimeTransitionCommand {
    const target = context.fsm.states.find((state) => state.id === to);
    const reason = stringValue(payload.reason);
    const failure: NormalizedRuntimeError | undefined =
      target?.kind === 'failed'
        ? {
            code: 'RUNTIME_INTERNAL_ERROR',
            message: reason ?? `Runtime entered failed State: ${to}`,
            retryable: false,
            stateId: context.snapshot.currentState,
          }
        : undefined;
    const output = failure ? undefined : toRuntimeJsonValue(payload.output);
    return {
      id: `runtime-transition:${context.runId}:${generateId()}`,
      runId: context.runId,
      userId: context.userId,
      from: context.snapshot.currentState,
      to,
      snapshot: context.snapshot,
      stepId: String(payload.stepId ?? to),
      guardContext: {
        input: payload,
        variables: payload,
        metadata: {
          clientSessionId: context.clientSessionId,
          runtimeSessionId: context.sessionId,
        },
      },
      ...(reason === undefined ? {} : { reason }),
      ...(output === undefined ? {} : { output }),
      ...(failure === undefined ? {} : { failure }),
    };
  }

  async inferChat(input: ChatInferenceInput): Promise<ChatResponse> {
    const resolved = this.resolveChatModel(input.modelAlias || input.options?.model);
    const runContext = await this.requireRun(input.runId);
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

    const inferenceRequest: ReasoningRequest<LLMInferenceInput> = {
      runId: input.runId,
      stepId: input.stepId,
      sessionId: runContext.clientSessionId,
      modelAlias: resolved.model,
      cachePolicy: input.cachePolicy,
      cacheScope: { userId: runContext.userId },
      input: {
        messages: input.messages,
        options: {
          ...input.options,
          model: input.options?.model ?? resolved.model,
        },
      },
      reasoning: {
        ...(input.reasoning ?? { method: 'direct' as const }),
        trace: async (event) => {
          await this.append(
            input.runId,
            'reasoning.decision.recorded',
            { strategyEvent: event },
            undefined,
            { stepId: input.stepId }
          );
        },
      },
      metadata: {
        ...input.metadata,
        userId: runContext.userId,
        sessionId: runContext.clientSessionId,
        runtimeSessionId: runContext.sessionId,
        provider: resolved.provider,
        domainPackId: runContext.domainPackId,
      },
    };

    try {
      const response = await this.executeRecoveredOperation({
        runId: input.runId,
        stepId: input.stepId,
        caseId: `${input.runId}:${input.stepId}:inference`,
        participant: {
          id: 'inference-primary',
          module: 'inference',
          execute: async () => {
            const output = await this.reasoning.infer(inferenceRequest);
            return {
              output,
              evidence: {
                observedAt: new Date().toISOString(),
                operationKey: `inference:${this.inferenceProviderId}:${resolved.model}:${input.stepId}`,
                dependencyKey: `inference-provider:${this.inferenceProviderId}`,
                state: 'completed',
                inputHash: stableRecoveryHash(inferenceRequest),
                outputHash: stableRecoveryHash(output.output),
                providerRevision: resolved.provider,
              },
            };
          },
          classify: (error) =>
            classifyInferenceFailure(error, {
              id: `${input.runId}:${input.stepId}:inference:failure`,
              operation: 'infer',
              request: inferenceRequest,
              providerId: this.inferenceProviderId,
              providerRevision: resolved.provider,
              occurredAt: new Date().toISOString(),
            }),
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
  ): Promise<ResolvedRuntimeAgentSpec> {
    const spec = input.agentSpec ?? {};
    const id = spec.id ?? input.agentId ?? 'agent.default';
    const name = spec.name ?? input.agentId ?? 'Default Runtime Agent';
    const explicitInstructions = mergeSystemPrompts(
      spec.systemInstructions,
      input.options?.systemPrompt
    );
    const promptRefs = this.resolveAgentPromptRefs(spec);
    const promptResolution = explicitInstructions
      ? undefined
      : await this.resolveAgentPromptInstructions({
          agentId: id,
          agentName: name,
          userId,
          sessionId,
          promptRefs,
        });
    const baseSystemInstructions =
      explicitInstructions ??
      promptResolution?.instructions ??
      `You are ${name}. Be helpful, harmless, and honest.`;
    const run = await this.requireOwnedRunScope(input.runId, userId);
    const skillManager = getSkillManager() as unknown as SkillResolvingManager;
    const workflowState = asRecord(asRecord(spec.metadata)?.workflowState);
    const activeSkills =
      spec.skillRefs?.length && skillManager.resolveSkills
        ? await skillManager.resolveSkills({
            agentSkillRefs: spec.skillRefs,
            inputText: [...input.messages].reverse().find((message) => message.role === 'user')
              ?.content,
            allowedSkills: stringArray(workflowState?.allowedSkills),
            requiredSkills: stringArray(workflowState?.requiredSkills),
            availableToolRefs:
              spec.toolRefs ?? input.options?.tools?.map((tool) => tool.name) ?? [],
            metadata: spec.metadata,
          })
        : [];
    const reviewTasks = await this.requireSkillReviewApprovals({
      run,
      agentId: id,
      skills: activeSkills,
    });
    if (reviewTasks.length > 0) {
      const approval = {
        taskKind: 'skill_activation',
        tasks: reviewTasks,
        stepId: input.stepId,
        agentId: id,
      };
      await this.waitForHumanReview(input.runId, approval);
      throw new HumanReviewRequiredError(input.runId, approval);
    }
    const skillInstructions = activeSkills.map(
      (skill) =>
        `<skill id="${skill.id}" version="${skill.version}">\n${skill.instructions ?? ''}\n${skill.references
          .map((reference) => reference.content)
          .filter(Boolean)
          .join('\n')}\n</skill>`
    );
    const systemInstructions = mergeSystemPrompts(baseSystemInstructions, ...skillInstructions);

    return {
      ...spec,
      id,
      version: spec.version ?? '0.0.0',
      name,
      promptRefs,
      modelAlias:
        spec.modelAlias ??
        input.modelAlias ??
        input.options?.model ??
        this.resolveChatModel().model,
      systemInstructions,
      promptResolution,
      activeSkills,
      toolRefs: spec.toolRefs ?? input.options?.tools?.map((tool) => tool.name),
    };
  }

  private resolveAgentPromptRefs(spec: RuntimeAgentSpecInput): AgentPromptRef[] {
    if (spec.promptRefs?.length) return spec.promptRefs;
    const legacyTemplateId = stringValue(asRecord(spec.metadata)?.promptTemplateId);
    return [{ id: legacyTemplateId ?? 'default-agent', required: true, priority: 0 }];
  }

  private async resolveAgentPromptInstructions(input: {
    agentId: string;
    agentName: string;
    userId: string;
    sessionId: string;
    promptRefs: AgentPromptRef[];
  }): Promise<AgentPromptResolution | undefined> {
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
      return promptManager.resolveAgentPrompts(input.promptRefs, variables);
    } catch (error) {
      logger.warn('Agent prompt template resolution failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return undefined;
  }

  async runReActChat(
    input: ChatInferenceInput & {
      agentId?: string;
      userId?: string;
      sessionId?: string;
    }
  ): Promise<ChatResponse> {
    const runContext = await this.requireRun(input.runId);
    const userId = input.userId ?? runContext.userId;
    const sessionId = input.sessionId ?? runContext.clientSessionId;
    const agent = await this.resolveChatAgent(input, userId, sessionId);
    const toolPrincipal = input.toolPrincipal ?? runtimeUserPrincipal(userId);
    const toolAuthorityConstraints = [
      ...(input.toolAuthorityConstraints ?? []),
      ...(agent.toolRefs?.length
        ? [
            {
              policyRef: `agent:${agent.id}@${agent.version}`,
              allowedToolIds: agent.toolRefs,
            },
          ]
        : []),
    ];
    const toolExecutionScope = executionScopeFromConstraints(
      toolAuthorityConstraints,
      runContext.snapshot.currentState
    );
    const chatOptions = withSystemPrompt(input.options, agent.systemInstructions);
    let chatResponse: ChatResponse | undefined;
    const selectToolAction = (toolCall: NonNullable<ChatResponse['toolCalls']>[number]) => ({
      type: 'tool' as const,
      toolCallId: toolCall.id,
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
        if (observation.source === 'tool') {
          return {
            type: 'model',
            reason: 'continue-after-tool-observation',
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
          metadata: request.metadata,
        });
        return {
          id: response.id,
          output: response,
          usage: response.usage,
          raw: response.raw,
        };
      },
    };
    const runner = this.canonicalRuntimeComposition().scopedReActRunners.create(reactRuntime, {
      inference: reactInference,
      toolRunner: this.createReActToolRunner({
        runId: input.runId,
        userId,
        sessionId,
        principal: toolPrincipal,
        principalHasAllPermissions: input.toolPrincipalHasAllPermissions,
        authorityConstraints: toolAuthorityConstraints,
      }),
      maxIterations: Math.max(
        4,
        agent.reasoning?.maxSteps ?? 0,
        (chatOptions?.tools?.length ?? 0) + 2
      ),
      continueAfterTool: true,
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
      toolPrincipal,
      toolExecutionScope,
      metadata: {
        prompt: agent.promptResolution
          ? {
              refs: agent.promptRefs,
              blocks: agent.promptResolution.blocks,
              missing: agent.promptResolution.missing,
            }
          : asRecord(input.agentSpec?.metadata)?.prompt,
      },
    });
    if (result.status === 'human_review_required') {
      const approval = {
        finalAction: safeSerialize(result.finalAction),
        stepId: input.stepId,
        agentId: agent.id,
        chatCheckpoint: safeSerialize({
          stepId: input.stepId,
          modelAlias: input.modelAlias,
          messages: input.messages,
          options: input.options,
          reasoning: input.reasoning,
          cachePolicy: input.cachePolicy,
          agentSpec: input.agentSpec,
          toolPrincipal,
          toolPrincipalHasAllPermissions: input.toolPrincipalHasAllPermissions === true,
          toolAuthorityConstraints,
          userId,
          sessionId,
        }),
      };
      await this.advanceToHumanReview(input.runId);
      await this.waitForHumanReview(input.runId, approval);
      throw new HumanReviewRequiredError(input.runId, approval);
    }
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
    try {
      const response = await this.runReActChat(input);
      if (response.content) yield { type: 'content', content: response.content };
      yield {
        type: 'done',
        finishReason: response.finishReason,
        usage: response.usage,
      };
    } catch (error) {
      if (isHumanReviewRequiredError(error)) {
        yield {
          type: 'waiting_human',
          runId: error.runId,
          approval: error.approval,
        };
        return;
      }
      throw error;
    }
  }

  private async *legacyStreamChat(input: ChatInferenceInput): AsyncGenerator<StreamChunk> {
    const resolved = this.resolveChatModel(input.modelAlias || input.options?.model);
    const runContext = await this.requireRun(input.runId);
    const agent = await this.resolveChatAgent(input, runContext.userId, runContext.clientSessionId);
    const chatOptions = withSystemPrompt(input.options, agent.systemInstructions);
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

    const inferenceRequest: InferenceRequest<LLMInferenceInput> = {
      runId: input.runId,
      stepId: input.stepId,
      sessionId: runContext.clientSessionId,
      modelAlias: resolved.model,
      cachePolicy: input.cachePolicy,
      cacheScope: { userId: runContext.userId },
      input: {
        messages: input.messages,
        options: {
          ...chatOptions,
          model: input.options?.model ?? resolved.model,
        },
      },
      metadata: {
        ...input.metadata,
        prompt: agent.promptResolution
          ? {
              refs: agent.promptRefs,
              blocks: agent.promptResolution.blocks,
              missing: agent.promptResolution.missing,
            }
          : asRecord(input.agentSpec?.metadata)?.prompt,
        stream: true,
        userId: runContext.userId,
        sessionId: runContext.clientSessionId,
        runtimeSessionId: runContext.sessionId,
        provider: resolved.provider,
        domainPackId: runContext.domainPackId,
      },
    };
    const reasoning: ReasoningOptions = {
      ...(input.reasoning ?? { method: 'direct' as const }),
      trace: async (event) => {
        await this.append(
          input.runId,
          'reasoning.decision.recorded',
          { strategyEvent: event, stream: true },
          undefined,
          { stepId: input.stepId }
        );
      },
    };
    let completed = false;
    try {
      if (
        reasoning.method === 'tot' ||
        reasoning.method === 'got' ||
        reasoning.method === 'self_consistency'
      ) {
        const response = await this.reasoning.infer({ ...inferenceRequest, reasoning });
        const chat = response.output as ChatResponse;
        if (chat.content) yield { type: 'content', content: chat.content };
        yield { type: 'done', usage: chat.usage };
        await this.append(
          input.runId,
          'model.call.completed',
          { model: chat.model, provider: chat.provider, usage: chat.usage, stream: true },
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
            reasoning: response.metadata?.reasoning,
          },
          undefined,
          { stepId: input.stepId }
        );
        return;
      }

      for await (const response of this.reasoning.stream({
        ...inferenceRequest,
        reasoning,
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
    invocationId?: string;
    principal?: ToolPrincipal;
    principalHasAllPermissions?: boolean;
    authorityConstraints?: readonly ToolAuthorityConstraint[];
    executionScope?: ToolExecutionScope;
  }): Promise<ToolCallResult<TOutput>> {
    const invocationId = input.invocationId ?? `tool-invocation:${generateId()}`;
    const toolId = this.registerManagedTool(input.toolId, input.toolSpec);
    const run = await this.requireRun(input.runId);
    if (run.userId !== input.userId) {
      throw new Error(`Runtime Run ${input.runId} does not belong to user ${input.userId}.`);
    }
    const head = await this.canonicalRuntime().events.getStreamHead({
      userId: run.userId,
      runId: input.runId,
    });
    if (!head) throw new Error(`Runtime Event stream not found: ${input.runId}`);
    const spec = this.toolRegistry.getSpec(toolId);
    if (!spec) throw new Error(`Registered Tool contract not found: ${toolId}`);
    const principal = input.principal ?? runtimeUserPrincipal(input.userId);
    const principalUserId =
      principal.userId ?? (principal.type === 'user' ? principal.id : undefined);
    if (principalUserId && principalUserId !== run.userId) {
      throw new Error(`Tool principal does not belong to Runtime Run ${input.runId}.`);
    }
    const authority = resolveRuntimeToolAuthority({
      runId: input.runId,
      runRevision: head.runRevision,
      requestedToolId: toolId,
      principal,
      principalHasAllPermissions: input.principalHasAllPermissions,
      requiredPermissionScopes: spec.governance.requiredPermissionScopes,
      constraints: [
        ...(input.authorityConstraints ?? []),
        ...authorityConstraintsFromExecutionScope(input.executionScope),
      ],
      fsmState: input.executionScope?.fsmState ?? run.snapshot.currentState,
    });
    const contractSnapshotRef = await this.ensureRunToolSnapshot(
      input.runId,
      authority.policyRevision
    );
    const result = await this.toolRunner.run({
      toolId,
      input: input.params,
      context: {
        runId: input.runId,
        stepId: input.stepId,
        invocationId,
        userId: input.userId,
        sessionId: this.runtimeSessionId(input.userId, input.sessionId),
        contractSnapshotRef,
        principal: authority.principal,
        executionScope: authority.executionScope,
      },
    });
    return result as ToolCallResult<TOutput>;
  }

  async getToolInvocation(invocationId: string): Promise<ToolInvocationRecord | null> {
    return this.toolRunner.getInvocation(invocationId);
  }

  async recoverToolInvocations(): Promise<ToolCallResult[]> {
    const interrupted = await this.toolRunner.listInvocations({
      statuses: [
        'created',
        'validating',
        'policy_checked',
        'approved',
        'queued',
        'running',
        'cancelling',
      ],
    });
    for (const invocation of interrupted) {
      try {
        this.registerManagedTool(invocation.toolId);
      } catch {
        // The runner records a deterministic TOOL_NOT_FOUND result during recovery.
      }
    }
    return this.toolRunner.recoverPendingInvocations();
  }

  async cancelToolInvocation(invocationId: string, reason?: string): Promise<ToolCallResult> {
    return this.toolRunner.cancelInvocation(invocationId, reason);
  }

  async approveToolInvocation(invocationId: string, approvedBy: string): Promise<ToolCallResult> {
    const invocation = await this.toolRunner.getInvocation(invocationId);
    if (invocation) this.registerManagedTool(invocation.toolId);
    const result = await this.toolRunner.approveAndResume(invocationId, approvedBy);
    if (invocation && result.status === 'completed') {
      await this.resumeApprovedRun(invocation, result);
    }
    return result;
  }

  async rejectToolInvocation(invocationId: string): Promise<ToolCallResult> {
    const invocation = await this.toolRunner.getInvocation(invocationId);
    const result = await this.toolRunner.rejectInvocation(invocationId);
    const runId = invocation?.scope?.runId ?? invocation?.request.context.runId;
    const run = runId ? await this.findRun(runId) : null;
    if (runId && run && !run.fsm.terminalStates.includes(run.snapshot.currentState)) {
      await this.failRun(runId, toolResultErrorMessage(result, 'Tool approval rejected.'));
    }
    return result;
  }

  private async completeApprovedToolRun(
    invocation: ToolInvocationRecord,
    result: ToolCallResult
  ): Promise<void> {
    const runId = invocation.scope?.runId ?? invocation.request.context.runId;
    const run = await this.findRun(runId);
    if (!run || run.fsm.terminalStates.includes(run.snapshot.currentState)) return;

    if (run.snapshot.currentState === 'HumanReview') {
      await this.transition(runId, 'ObservationRecorded', {
        tool: invocation.toolId,
        invocationId: invocation.id,
      });
      await this.transition(runId, 'Verifying', { invocationId: invocation.id });
      await this.transition(runId, 'MemorySync', { invocationId: invocation.id });
    }
    await this.completeRun(runId, {
      tool: invocation.toolId,
      invocationId: invocation.id,
      output: result.output,
    });
  }

  private async resumeApprovedRun(
    invocation: ToolInvocationRecord,
    result: ToolCallResult
  ): Promise<void> {
    const runId = invocation.scope?.runId ?? invocation.request.context.runId;
    await this.restoreRunContext(runId);
    const checkpoint = await this.latestChatCheckpoint(runId);
    if (!checkpoint) {
      await this.completeApprovedToolRun(invocation, result);
      return;
    }
    const run = await this.requireRun(runId);
    if (run.snapshot.currentState === 'HumanReview') {
      await this.transition(runId, 'ObservationRecorded', {
        tool: invocation.toolId,
        invocationId: invocation.id,
      });
    }
    const messages = Array.isArray(checkpoint.messages)
      ? (checkpoint.messages as LLMMessage[])
      : [];
    const toolCallId = invocation.request.context.invocationId;
    const resumedMessages: LLMMessage[] = [
      ...messages,
      {
        role: 'assistant',
        content: JSON.stringify({
          type: 'tool_call',
          id: toolCallId,
          tool: invocation.toolId,
          input: invocation.request.input,
        }),
      },
      {
        role: 'assistant',
        content: JSON.stringify({
          type: 'tool_result',
          toolCallId,
          tool: invocation.toolId,
          invocationId: invocation.id,
          status: result.status,
          output: result.output,
          artifactRefs: result.artifactRefs,
          observationRefs: result.observationRefs,
        }),
      },
    ];
    try {
      const response = await this.runReActChat({
        runId,
        stepId: `${stringValue(checkpoint.stepId) ?? 'reason'}:resume:${invocation.id}`,
        modelAlias: stringValue(checkpoint.modelAlias) ?? this.resolveChatModel().model,
        messages: resumedMessages,
        options: asRecord(checkpoint.options) as ChatOptions | undefined,
        reasoning: asRecord(checkpoint.reasoning) as ReasoningOptions | undefined,
        cachePolicy: asRecord(checkpoint.cachePolicy) as InferenceCachePolicy | undefined,
        agentSpec: asRecord(checkpoint.agentSpec) as RuntimeAgentSpecInput | undefined,
        toolPrincipal: asRecord(checkpoint.toolPrincipal) as ToolPrincipal | undefined,
        toolPrincipalHasAllPermissions: checkpoint.toolPrincipalHasAllPermissions === true,
        toolAuthorityConstraints: Array.isArray(checkpoint.toolAuthorityConstraints)
          ? (checkpoint.toolAuthorityConstraints as ToolAuthorityConstraint[])
          : undefined,
        userId: stringValue(checkpoint.userId) ?? run.userId,
        sessionId: stringValue(checkpoint.sessionId) ?? run.clientSessionId,
      });
      if ((await this.requireRun(runId)).snapshot.currentState === 'ObservationRecorded') {
        await this.transition(runId, 'Verifying', { invocationId: invocation.id });
        await this.transition(runId, 'MemorySync', { invocationId: invocation.id });
      }
      await this.completeRun(runId, {
        messageId: response.id,
        content: response.content,
        usage: response.usage,
        resumedFromInvocationId: invocation.id,
      });
    } catch (error) {
      if (isHumanReviewRequiredError(error)) return;
      await this.failRun(runId, error);
      throw error;
    }
  }

  private async latestChatCheckpoint(runId: string): Promise<Record<string, unknown> | undefined> {
    const events = await this.canonicalRuntimeComposition().runManager.listEvents(runId);
    for (const event of [...events].reverse()) {
      if (event.type !== 'run.waiting_human') continue;
      const checkpoint = asRecord(asRecord(event.payload)?.chatCheckpoint);
      if (checkpoint) return checkpoint;
    }
    return undefined;
  }

  private async advanceToHumanReview(
    runId: string,
    reason: 'tool-human-review' | 'skill-human-review' = 'tool-human-review'
  ): Promise<void> {
    const run = await this.requireRun(runId);
    if (reason === 'skill-human-review') {
      try {
        await this.transition(runId, 'HumanReview', { reason });
      } catch (error) {
        logger.warn(
          'Custom FSM has no direct Skill HumanReview transition; Run wait remains durable',
          {
            runId,
            error: error instanceof Error ? error.message : String(error),
          }
        );
      }
      return;
    }
    const ordered = ['Reasoning', 'ActionSelected', 'PolicyChecked', 'Acting'];
    const index = ordered.indexOf(run.snapshot.currentState);
    if (index >= 0) {
      for (const state of ordered.slice(index + 1)) await this.transition(runId, state);
    }
    if ((await this.requireRun(runId)).snapshot.currentState !== 'HumanReview') {
      await this.transition(runId, 'HumanReview', { reason });
    }
  }

  private async restoreRunContext(runId: string): Promise<void> {
    await this.requireRun(runId);
  }

  async runGovernedTool<TOutput>(input: {
    runId: string;
    stepId: string;
    userId: string;
    sessionId: string;
    toolId: string;
    toolSpec?: Partial<ToolSpec>;
    params: unknown;
    principal?: ToolPrincipal;
    principalHasAllPermissions?: boolean;
    authorityConstraints?: readonly ToolAuthorityConstraint[];
    executionScope?: ToolExecutionScope;
  }): Promise<TOutput> {
    const result = await this.runGovernedToolResult(input);
    if (result.status !== 'completed') {
      throw new Error(
        typeof result.error === 'string' ? result.error : `Tool failed: ${input.toolId}`
      );
    }
    return result.output as TOutput;
  }

  private registerManagedTool(toolId: string, override?: Partial<ToolSpec>): string {
    const resolved = getToolManager().resolveGovernedTool(toolId);
    if (!resolved) {
      throw new FrameworkError({
        code: 'TOOL_NOT_FOUND',
        message: `Tool not found: ${toolId}`,
      });
    }
    const spec: ToolSpec = {
      ...resolved.spec,
      ...override,
      id: resolved.spec.id,
      version: override?.version ?? resolved.spec.version,
      description: override?.description ?? resolved.spec.description,
      inputSchema: override?.inputSchema ?? resolved.spec.inputSchema,
      sideEffectLevel: override?.sideEffectLevel ?? resolved.spec.sideEffectLevel,
    };
    this.toolRegistry.registerAdapter(spec, resolved.adapter, { replace: true });
    return spec.id;
  }

  private ensureRunToolSnapshot(runId: string, policyRevision: string): Promise<string> {
    const cacheKey = `${runId}\u0000${policyRevision}`;
    const active = this.runToolSnapshots.get(cacheKey);
    if (active) return active;
    const snapshot = this.createRunToolSnapshot(runId, policyRevision).catch((error) => {
      this.runToolSnapshots.delete(cacheKey);
      throw error;
    });
    this.runToolSnapshots.set(cacheKey, snapshot);
    return snapshot;
  }

  private async createRunToolSnapshot(runId: string, policyRevision: string): Promise<string> {
    const snapshotId = `tool-snapshot:${runId}:${policyRevision.replace(/^sha256:/, '')}`;
    const persisted = await this.toolSnapshotStore.get(snapshotId);
    if (persisted) return persisted.id;

    const manager = getToolManager();
    for (const definition of manager.listTools(true)) {
      const candidateId = definition.name;
      if (this.toolRegistry.getSpec(candidateId)) continue;
      try {
        this.registerManagedTool(candidateId);
      } catch {
        // Tools unavailable at Run start are intentionally absent from this immutable snapshot.
      }
    }

    const toolContracts = this.toolRegistry.list().map((spec) => ({
      toolId: spec.id,
      toolVersion: spec.version,
      toolRevision: spec.revision,
      inputSchemaHash: spec.input.schemaHash,
      outputSchemaHash: spec.output?.schemaHash,
      sourceCapabilityHash: spec.sourceRef?.capabilityHash,
      sideEffectLevel: spec.sideEffectLevel,
      adapterRef: spec.sourceRef?.adapterId ?? `${spec.source}:${spec.id}`,
    }));
    const createdAt = new Date().toISOString();
    const body = {
      runId,
      createdAt,
      toolContracts,
      catalogRevision: hashToolContract(
        toolContracts.map((contract) => [contract.toolId, contract.toolRevision])
      ),
      policyRevision,
    };
    const snapshot: ToolContractSnapshot = {
      id: snapshotId,
      ...body,
      snapshotHash: hashToolContract(body),
    };
    await this.toolSnapshotStore.save(snapshot);
    await this.events.record(
      createFrameworkEvent({
        id: `${snapshotId}:created`,
        type: 'tool.contract.snapshot.created',
        runId,
        payload: {
          snapshotId,
          snapshotHash: snapshot.snapshotHash,
          catalogRevision: snapshot.catalogRevision,
          policyRevision: snapshot.policyRevision,
          toolCount: snapshot.toolContracts.length,
        },
      })
    );
    return snapshot.id;
  }

  private createReActToolRunner(input: {
    runId: string;
    userId: string;
    sessionId: string;
    principal: ToolPrincipal;
    principalHasAllPermissions?: boolean;
    authorityConstraints: readonly ToolAuthorityConstraint[];
  }): ToolRunner {
    return {
      run: async (request) => {
        const toolManager = getToolManager();
        const descriptor = toolManager.describeTool(request.toolId);
        const params = normalizeToolInput(request.input);
        try {
          const result = await this.runGovernedToolResult({
            runId: input.runId,
            stepId: request.context.stepId,
            userId: input.userId,
            sessionId: input.sessionId,
            toolId: descriptor?.id ?? request.toolId,
            params,
            invocationId: request.context.invocationId,
            principal: request.context.principal ?? input.principal,
            principalHasAllPermissions: input.principalHasAllPermissions,
            authorityConstraints: input.authorityConstraints,
            executionScope: request.context.executionScope,
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
    degrade?: () => Promise<TValue>;
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
      const value = await this.executeRecoveredOperation({
        runId: input.runId,
        stepId: input.stepId,
        caseId: `${input.runId}:${input.stepId}:memory-read:${input.target}`,
        participant: {
          id: `memory-read:${input.target}`,
          module: 'memory',
          execute: async () => ({
            output: await input.reader(),
            evidence: {
              observedAt: new Date().toISOString(),
              operationKey: `memory.read:${input.target}`,
              state: 'completed',
            },
          }),
          classify: (error) =>
            classifyMemoryFailure(error, {
              id: `${input.runId}:${input.stepId}:memory-read:failure`,
              operation: 'read',
              scope: { runId: input.runId },
              occurredAt: new Date().toISOString(),
              providerId: input.target,
            }),
          degrade: input.degrade
            ? async () => ({
                output: await input.degrade!(),
                evidence: {
                  observedAt: new Date().toISOString(),
                  operationKey: `memory.read:${input.target}`,
                  state: 'degraded',
                },
              })
            : undefined,
        },
      });
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
    reconcile?: () => Promise<TValue>;
    sideEffectState?: 'not_started' | 'committed' | 'unknown';
    idempotencyKey?: string;
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
      const value = await this.executeRecoveredOperation({
        runId: input.runId,
        stepId: input.stepId,
        caseId: `${input.runId}:${input.stepId}:memory-write:${input.target}`,
        participant: {
          id: `memory-write:${input.target}`,
          module: 'memory',
          execute: async () => ({
            output: await input.writer(),
            evidence: {
              observedAt: new Date().toISOString(),
              operationKey: `memory.write:${input.target}`,
              state: 'committed',
              receiptStatus: 'completed',
              idempotencyKey: input.idempotencyKey,
            },
          }),
          classify: (error) =>
            classifyMemoryFailure(error, {
              id: `${input.runId}:${input.stepId}:memory-write:failure`,
              operation: 'write',
              scope: { runId: input.runId },
              occurredAt: new Date().toISOString(),
              providerId: input.target,
              idempotencyKey: input.idempotencyKey,
              sideEffectState: input.sideEffectState,
            }),
          reconcile: input.reconcile
            ? async () => ({
                output: await input.reconcile!(),
                evidence: {
                  observedAt: new Date().toISOString(),
                  operationKey: `memory.write:${input.target}`,
                  state: 'reconciled',
                  receiptStatus: 'completed',
                  idempotencyKey: input.idempotencyKey,
                },
              })
            : undefined,
        },
      });
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

  private async executeRecoveredOperation<TValue>(input: {
    runId: string;
    stepId: string;
    caseId: string;
    participant: RecoveryParticipant<TValue>;
  }): Promise<TValue> {
    const context = await this.requireRun(input.runId);
    const recoveryFsm = this.canonicalRuntimeComposition().recoveryFSMs.create({
      process: context.fsm,
      runId: input.runId,
      options: {
        onTransition: async (transition) => {
          await this.append(
            input.runId,
            'fsm.state.exited',
            { stateId: transition.from, phase: 'recovery' },
            transition.acceptedAt,
            { stepId: input.stepId, fsmState: transition.from }
          );
          await this.append(
            input.runId,
            'fsm.transition.accepted',
            {
              from: transition.from,
              to: transition.to,
              phase: 'recovery',
              ...transition.metadata,
              snapshot: transition.snapshot,
            },
            transition.acceptedAt,
            { stepId: input.stepId, fsmState: transition.to }
          );
        },
        onStateEntered: async (entered) => {
          await this.append(
            input.runId,
            'fsm.state.entered',
            {
              stateId: entered.stateId,
              fromState: entered.fromState,
              phase: 'recovery',
              snapshot: entered.snapshot,
            },
            entered.enteredAt,
            { stepId: input.stepId, fsmState: entered.stateId }
          );
        },
      },
      snapshot: context.snapshot,
    });
    const result = await runRecoverySupervisor({
      fsm: recoveryFsm,
      caseId: input.caseId,
      userId: context.userId,
      participants: [input.participant],
      knowledge: this.recoveryKnowledge,
      sessionId: context.sessionId,
      domainPackId: context.domainPackId,
      stepId: input.stepId,
      metadata: {
        userId: context.userId,
        clientSessionId: context.clientSessionId,
        domainPackId: context.domainPackId,
      },
      trace: {
        record: async (event) => {
          await this.append(input.runId, event.type, event.payload, event.timestamp, {
            stepId: event.stepId ?? input.stepId,
            fsmState: event.fsmState,
          });
        },
      },
      scheduler: {
        wait: async (delayMs) => waitForRecoveryDelay(delayMs),
      },
      maxInlineDelayMs: 1_000,
    });
    if (result.status === 'succeeded' || result.status === 'degraded') {
      return result.outputs[input.participant.id] as TValue;
    }
    throw new FrameworkError({
      code:
        result.status === 'suspended'
          ? 'RECOVERY_SUSPENDED'
          : result.status === 'quarantined'
            ? 'RECOVERY_QUARANTINED'
            : result.status === 'cancelled'
              ? 'RECOVERY_CANCELLED'
              : 'RECOVERY_FAILED',
      message: `Recovery case ${input.caseId} ended with ${result.status}.`,
      context: {
        caseId: input.caseId,
        status: result.status,
        failureCode: result.failure?.code,
        cycles: result.snapshot?.cycles,
      },
      cause: result.error,
    });
  }

  private async recordBypassedCacheFailure(failure: RecoveryFailure): Promise<void> {
    if (failure.module !== 'cache') return;
    const runId = stringValue(failure.metadata?.runId);
    if (!runId) return;
    const context = await this.findRun(runId);
    if (!context) return;
    const stepId = stringValue(failure.metadata?.stepId);
    const fingerprint = recoveryFailureFingerprint(failure);
    const knowledge: RecoveryKnowledge = {
      key: {
        fingerprint,
        participantId: 'inference-cache',
        scope: {
          userId: context.userId,
          sessionId: context.sessionId,
          domainPackId: context.domainPackId,
        },
        policyRevision: failure.evidence.policyRevision,
        specRevision: failure.evidence.specRevision,
        providerRevision: failure.evidence.providerRevision,
      },
      strategy: 'degrade',
      outcome: 'degraded',
      evidenceHash: stableRecoveryHash(failure.evidence),
      learnedAt: failure.occurredAt,
      validation: {
        status: 'verified',
        proof: { cacheBypassed: true, primaryInferencePreserved: true },
      },
    };
    await this.recoveryKnowledge?.put(knowledge);
    await this.append(
      runId,
      'recovery.case.opened',
      {
        caseId: failure.id,
        rootFingerprint: fingerprint,
        failure,
      },
      failure.occurredAt,
      { stepId }
    );
    await this.append(
      runId,
      'recovery.case.resolved',
      {
        caseId: failure.id,
        rootFingerprint: fingerprint,
        status: 'degraded',
        strategy: 'degrade',
        knowledge,
      },
      failure.occurredAt,
      { stepId }
    );
  }

  private async recordServingCacheEvent(event: ServingCacheEvent): Promise<void> {
    if (!event.runId || !(await this.findRun(event.runId))) return;
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
    const context = await this.requireRun(runId);
    if (context.fsm.terminalStates.includes(context.snapshot.currentState)) return;
    await this.transition(runId, inferCompletedState(context.fsm), {
      reason: 'completed',
      output,
    });
  }

  async failRun(runId: string, error: unknown): Promise<void> {
    const context = await this.requireRun(runId);
    if (context.fsm.terminalStates.includes(context.snapshot.currentState)) return;
    const message = error instanceof Error ? error.message : String(error);
    await this.transition(runId, inferFailedState(context.fsm), { reason: message });
  }

  async projectWorkflowExecution(executionId: string): Promise<WorkflowExecutionProjection | null> {
    if (!this.isCanonicalRuntimeInitialized()) await this.initializeCanonicalRuntime();
    const directEvents = await this.events.list({ runId: executionId });
    const direct = projectWorkflowExecution(directEvents, executionId);
    if (direct) return direct;

    const lookupTypes: FrameworkEventType[] = [
      'workflow.stage.started',
      'workflow.stage.completed',
      'workflow.stage.failed',
      'run.completed',
    ];
    const lookupEvents = (
      await Promise.all(lookupTypes.map((type) => this.events.list({ type })))
    ).flat();
    const matched = lookupEvents.find(
      (event) => workflowExecutionIdFromEvent(event) === executionId
    );
    if (!matched) return null;
    return projectWorkflowExecution(await this.events.list({ runId: matched.runId }), executionId);
  }

  async projectOwnedWorkflowExecution(
    executionId: string,
    userId: string
  ): Promise<WorkflowExecutionProjection | null> {
    const execution = await this.projectWorkflowExecution(executionId);
    return execution?.userId === userId ? execution : null;
  }

  async cancelOwnedWorkflowExecution(input: {
    executionId: string;
    userId: string;
    reason?: string;
    idempotencyKey?: string;
  }): Promise<RuntimeCancelResult | null> {
    const execution = await this.projectOwnedWorkflowExecution(input.executionId, input.userId);
    if (!execution) return null;
    const context = await this.requireRun(execution.runId);
    const commandId = input.idempotencyKey ?? `workflow-cancel:${execution.runId}`;
    const priorRequest = (await this.events.list({ runId: execution.runId })).find(
      (event) =>
        event.type === 'run.cancel.requested' &&
        stringValue(asRecord(event.payload)?.commandId) === commandId
    );
    const requestedAt =
      stringValue(asRecord(priorRequest?.payload)?.requestedAt) ?? new Date().toISOString();
    return this.runtimeCancellationService().cancel({
      commandId,
      scope: {
        userId: input.userId,
        sessionId: context.sessionId,
        runId: execution.runId,
      },
      principal: {
        principalId: input.userId,
        type: 'user',
        userId: input.userId,
        permissionScopes: ['runtime.run.cancel'],
      },
      ownerId: 'server.workflow-cancellation',
      leaseTtlMs: 30_000,
      reason: input.reason?.trim() || 'Workflow execution cancelled by owner.',
      policy: {
        propagation: 'all_descendants',
        cancelRunningActivities: true,
      },
      requestedAt,
      idempotencyKey: input.idempotencyKey ?? commandId,
    });
  }

  private async requireSkillReviewApprovals(input: {
    run: OwnedRunScope;
    agentId: string;
    skills: LoadedSkillContext[];
  }): Promise<SkillHumanReviewTask[]> {
    const requiringReview = input.skills.filter(
      (skill) => skill.policyDecision.requiresHumanReview === true
    );
    if (requiringReview.length === 0) return [];
    const events = await this.listEvents(input.run.runId);
    const existing = projectSkillHumanReviewTasks(events);
    const pending: SkillHumanReviewTask[] = [];
    for (const skill of requiringReview) {
      const contentHash = skillContentHash(skill);
      const revision = `${skill.version}:${contentHash}`;
      const exact = existing.find(
        (task) =>
          task.skillId === skill.id &&
          task.skillVersion === skill.version &&
          task.skillRevision === revision &&
          task.contentHash === contentHash &&
          task.userId === input.run.userId &&
          task.agentId === input.agentId &&
          task.domainId === input.run.domainPackId &&
          task.status === 'approved' &&
          Date.parse(task.expiresAt) > Date.now()
      );
      if (exact) continue;
      const priorPending = existing.find(
        (task) =>
          task.skillId === skill.id &&
          task.skillRevision === revision &&
          task.userId === input.run.userId &&
          task.agentId === input.agentId &&
          task.domainId === input.run.domainPackId &&
          task.status === 'pending' &&
          Date.parse(task.expiresAt) > Date.now()
      );
      if (priorPending) {
        pending.push(priorPending);
        continue;
      }
      const requestedAt = new Date().toISOString();
      const task: SkillHumanReviewTask = {
        taskId: `skill-review:${input.run.runId}:${skill.id}:${contentHash.slice(0, 16)}`,
        runId: input.run.runId,
        skillId: skill.id,
        skillVersion: skill.version,
        skillRevision: revision,
        contentHash,
        userId: input.run.userId,
        agentId: input.agentId,
        domainId: input.run.domainPackId,
        requestedAt,
        expiresAt: new Date(Date.parse(requestedAt) + 24 * 60 * 60 * 1_000).toISOString(),
        status: 'pending',
      };
      await this.append(input.run.runId, 'human.review.requested', {
        ...task,
        taskKind: 'skill_activation',
        policyId: skill.policyDecision.policyId,
        reason: skill.policyDecision.reason,
      });
      pending.push(task);
    }
    if (pending.length > 0) {
      await this.advanceToHumanReview(input.run.runId, 'skill-human-review');
    }
    return pending;
  }

  async listSkillHumanReviews(runId: string, userId: string): Promise<SkillHumanReviewTask[]> {
    await this.requireOwnedRunScope(runId, userId);
    return projectSkillHumanReviewTasks(await this.listEvents(runId));
  }

  async decideSkillHumanReview(input: {
    runId: string;
    taskId: string;
    decision: 'approved' | 'rejected';
    decidedBy: string;
    reason?: string;
  }): Promise<SkillHumanReviewTask> {
    const run = await this.requireRun(input.runId);
    const tasks = projectSkillHumanReviewTasks(await this.listEvents(input.runId));
    const task = tasks.find((candidate) => candidate.taskId === input.taskId);
    if (!task || task.status !== 'pending') {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: 'Skill human-review task is missing or already resolved.',
        context: { runId: input.runId, taskId: input.taskId },
      });
    }
    const decidedAt = new Date().toISOString();
    if (Date.parse(task.expiresAt) <= Date.parse(decidedAt)) {
      await this.append(input.runId, 'human.review.expired', {
        ...task,
        taskKind: 'skill_activation',
        decidedAt,
      });
      await this.append(input.runId, 'human.review.resolved', {
        taskId: task.taskId,
        taskKind: 'skill_activation',
        decision: 'expired',
      });
      return { ...task, status: 'expired', decidedAt };
    }
    const eventType =
      input.decision === 'approved' ? 'human.review.approved' : 'human.review.rejected';
    await this.append(input.runId, eventType, {
      ...task,
      taskKind: 'skill_activation',
      decision: input.decision,
      decidedBy: input.decidedBy,
      decidedAt,
      reason: input.reason,
    });
    await this.append(input.runId, 'human.review.resolved', {
      taskId: task.taskId,
      taskKind: 'skill_activation',
      decision: input.decision,
      decidedBy: input.decidedBy,
      decidedAt,
    });
    if (input.decision === 'rejected') {
      await this.failRun(input.runId, input.reason ?? `Skill ${task.skillId} was rejected.`);
    } else {
      await this.append(input.runId, 'run.resume.requested', {
        taskId: task.taskId,
        taskKind: 'skill_activation',
        requestedBy: input.decidedBy,
      });
      if (run.snapshot.currentState === 'HumanReview') {
        try {
          await this.transition(input.runId, 'Reasoning', {
            taskId: task.taskId,
            reason: 'skill-review-approved',
          });
        } catch (error) {
          logger.warn('Skill review approval could not transition the custom FSM to Reasoning', {
            runId: input.runId,
            taskId: task.taskId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
      await this.append(input.runId, 'run.resumed', {
        taskId: task.taskId,
        taskKind: 'skill_activation',
        resumedBy: input.decidedBy,
      });
    }
    return {
      ...task,
      status: input.decision,
      decidedBy: input.decidedBy,
      decidedAt,
    };
  }

  async requireOwnedRunScope(runId: string, userId: string): Promise<OwnedRunScope> {
    const run = await this.findRun(runId);
    if (!run || run.userId !== userId) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_NOT_FOUND',
        message: 'Runtime run was not found for the authenticated principal.',
        context: { runId },
      });
    }
    return {
      runId: run.runId,
      userId: run.userId,
      sessionId: run.sessionId,
      clientSessionId: run.clientSessionId,
      domainPackId: run.domainPackId,
    };
  }

  async waitForHumanReview(runId: string, payload: Record<string, unknown> = {}): Promise<void> {
    await this.append(runId, 'run.waiting_human', {
      ...payload,
      waitId: stringValue(payload.waitId) ?? `human-review:${runId}`,
    });
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
      id: input.runId,
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
        if (await this.isRunCancelled(input.runId)) {
          execution.status = 'cancelled';
          execution.completedAt = now();
          return execution;
        }
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

      if (await this.isRunCancelled(input.runId)) {
        execution.status = 'cancelled';
        execution.completedAt = now();
        return execution;
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
    return this.canonicalRuntimeComposition().runManager.projectRun(runId);
  }

  async projectOwnedRun(runId: string, userId: string) {
    const run = await this.canonicalRuntimeComposition().runManager.projectRun(runId);
    return run?.userId === userId ? run : null;
  }

  projectReplay(runId: string) {
    return this.canonicalRuntimeComposition().runManager.projectReplay(runId);
  }

  projectAudit(runId: string) {
    return this.canonicalRuntimeComposition().runManager.projectAudit(runId);
  }

  projectRegression(runId: string) {
    return this.canonicalRuntimeComposition().runManager.projectRegression(runId);
  }

  listEvents(runId: string): Promise<FrameworkEvent[]> {
    return this.canonicalRuntimeComposition().runManager.listEvents(runId);
  }

  private async ensureSession(
    userId: string,
    clientSessionId: string,
    domainPack: DomainPackSpec,
    metadata: Record<string, unknown> = {}
  ): Promise<void> {
    const runtimeSessionId = this.runtimeSessionId(userId, clientSessionId);
    if (this.knownSessions.has(runtimeSessionId)) return;
    await this.canonicalRuntimeComposition().runManager.createSession({
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
    options: { eventId?: string; stepId?: string; fsmState?: string } = {}
  ): Promise<void> {
    const context = await this.requireRun(runId);
    await this.canonicalRuntimeComposition().runManager.appendRunEvent({
      id: options.eventId ?? `${runId}:${type}:${generateId()}`,
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

  private async findRun(runId: string): Promise<RuntimeRunContext | null> {
    const events = await this.canonicalEventStore().list({ runId });
    return projectRuntimeRunContext(events, runId);
  }

  private async requireRun(runId: string): Promise<RuntimeRunContext> {
    const context = await this.findRun(runId);
    if (!context) {
      throw new Error(`Runtime run not found: ${runId}`);
    }
    return context;
  }

  private async isRunCancelled(runId: string): Promise<boolean> {
    return (
      (await this.canonicalRuntimeComposition().runManager.projectRun(runId))?.status ===
      'cancelled'
    );
  }

  private runtimeCancellationService(): RuntimeCancellationService {
    if (this.cancellationService) return this.cancellationService;
    const runtime = this.canonicalRuntime();
    this.cancellationService = new RuntimeCancellationService({
      events: runtime.events,
      projections: runtime.projections,
      projectionStore: runtime.projectionStore,
      runLeases: runtime.runLeases,
      activities: {
        cancel: async (request) => {
          const invocation = await this.toolRunner.getInvocation(request.activityId);
          if (!invocation) {
            return { targetType: 'activity', targetId: request.activityId, status: 'not_found' };
          }
          const result = await this.toolRunner.cancelInvocation(request.activityId, request.reason);
          return {
            targetType: 'activity',
            targetId: request.activityId,
            status: result.status === 'cancelled' ? 'cancelled' : 'already_terminal',
          };
        },
      },
      children: {
        listChildren: async () => [],
        cancel: async (request) => ({
          targetType: 'child_run',
          targetId: request.childRunId,
          status: 'not_found',
        }),
      },
      nextId: (namespace) => `${namespace}:${generateId()}`,
    });
    return this.cancellationService;
  }

  private runtimeSessionId(userId: string, clientSessionId: string): string {
    return `user:${userId}:session:${clientSessionId}`;
  }
}

function skillContentHash(skill: LoadedSkillContext): string {
  const install = asRecord(asRecord(skill.provenance)?.install);
  const installedHash = stringValue(install?.contentHash);
  if (installedHash && /^[a-f0-9]{64}$/u.test(installedHash)) return installedHash;
  return hashContent(
    JSON.stringify({
      id: skill.id,
      version: skill.version,
      instructions: skill.instructions,
      references: skill.references.map((reference) => ({
        path: reference.path,
        content: reference.content,
      })),
      provenance: skill.provenance,
    })
  );
}

export function projectSkillHumanReviewTasks(events: FrameworkEvent[]): SkillHumanReviewTask[] {
  const tasks = new Map<string, SkillHumanReviewTask>();
  for (const event of events) {
    const payload = asRecord(event.payload);
    if (stringValue(payload?.taskKind) !== 'skill_activation') continue;
    const taskId = stringValue(payload?.taskId);
    if (!taskId) continue;
    if (event.type === 'human.review.requested') {
      const task = parseSkillHumanReviewTask(payload);
      if (task) tasks.set(taskId, task);
      continue;
    }
    const current = tasks.get(taskId);
    if (!current) continue;
    if (event.type === 'human.review.approved' || event.type === 'human.review.rejected') {
      tasks.set(taskId, {
        ...current,
        status: event.type === 'human.review.approved' ? 'approved' : 'rejected',
        decidedBy: stringValue(payload?.decidedBy),
        decidedAt: stringValue(payload?.decidedAt) ?? event.timestamp,
      });
    } else if (event.type === 'human.review.expired') {
      tasks.set(taskId, {
        ...current,
        status: 'expired',
        decidedAt: stringValue(payload?.decidedAt) ?? event.timestamp,
      });
    }
  }
  return Array.from(tasks.values());
}

function parseSkillHumanReviewTask(
  payload: Record<string, unknown> | undefined
): SkillHumanReviewTask | null {
  if (!payload) return null;
  const required = {
    taskId: stringValue(payload.taskId),
    runId: stringValue(payload.runId),
    skillId: stringValue(payload.skillId),
    skillVersion: stringValue(payload.skillVersion),
    skillRevision: stringValue(payload.skillRevision),
    userId: stringValue(payload.userId),
    agentId: stringValue(payload.agentId),
    domainId: stringValue(payload.domainId),
    requestedAt: stringValue(payload.requestedAt),
    expiresAt: stringValue(payload.expiresAt),
  };
  if (Object.values(required).some((value) => !value)) return null;
  return {
    taskId: required.taskId!,
    runId: required.runId!,
    skillId: required.skillId!,
    skillVersion: required.skillVersion!,
    skillRevision: required.skillRevision!,
    contentHash: stringValue(payload.contentHash),
    userId: required.userId!,
    agentId: required.agentId!,
    domainId: required.domainId!,
    requestedAt: required.requestedAt!,
    expiresAt: required.expiresAt!,
    status: 'pending',
  };
}

function stringArray(input: unknown): string[] | undefined {
  if (!Array.isArray(input)) return undefined;
  return input.filter((value): value is string => typeof value === 'string' && value.length > 0);
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
    ...[
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
      'Acting',
      'ObservationRecorded',
      'Verifying',
    ].map((from) => ({ from, to: 'HumanReview', description: `${from} requires human review` })),
    ...states
      .filter((state) => state !== 'Completed' && state !== 'Failed')
      .map((from) => ({ from, to: 'Failed', description: `${from} failed` })),
    {
      from: 'HumanReview',
      to: 'ObservationRecorded',
      description: 'Approved Tool execution produced an observation',
    },
    {
      from: 'HumanReview',
      to: 'Reasoning',
      description: 'Approved Skill context resumes Agent reasoning',
    }
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
  const transitionKeys = new Set<string>();
  const appendTransition = (transition: WorkflowSpec['transitions'][number]): void => {
    const key = `${transition.from}\u0000${transition.to}\u0000${transition.guard ?? ''}`;
    if (transitionKeys.has(key)) return;
    transitionKeys.add(key);
    transitions.push(transition);
  };
  for (const stage of workflow.stages) {
    const next = stage.next === 'end' || !stage.next ? 'Completed' : stage.next;
    appendTransition({ from: stage.id, to: next, description: `${stage.id} next` });
    for (const branch of stage.branches ?? []) {
      appendTransition({
        from: stage.id,
        to: branch.then === 'end' ? 'Completed' : branch.then,
        description: `${stage.id} branch:${branch.condition}`,
      });
      if (branch.else) {
        appendTransition({
          from: stage.id,
          to: branch.else === 'end' ? 'Completed' : branch.else,
          description: `${stage.id} else:${branch.condition}`,
        });
      }
    }
    appendTransition({ from: stage.id, to: 'Failed', description: `${stage.id} failed` });
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

function toolResultErrorMessage(result: ToolCallResult, fallback: string): string {
  if (typeof result.error === 'string') return result.error;
  return result.error?.message ?? fallback;
}

function normalizeToolInput(input: unknown): Record<string, unknown> {
  if (input && typeof input === 'object' && !Array.isArray(input)) {
    return input as Record<string, unknown>;
  }
  return input === undefined ? {} : { value: input };
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

function waitForRecoveryDelay(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, delayMs)));
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

function toRuntimeJsonValue(input: unknown): RuntimeJsonValue | undefined {
  if (input === undefined) return undefined;
  try {
    const encoded = JSON.stringify(input);
    if (encoded === undefined) throw new TypeError('Value is not JSON serializable');
    return JSON.parse(encoded) as RuntimeJsonValue;
  } catch (error) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: 'Runtime transition output must be JSON serializable.',
      context: { reason: error instanceof Error ? error.message : String(error) },
    });
  }
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

function runtimeUserPrincipal(userId: string): ToolPrincipal {
  return {
    id: userId,
    principalId: userId,
    type: 'user',
    userId,
    permissionScopes: [],
  };
}

function executionScopeFromConstraints(
  constraints: readonly ToolAuthorityConstraint[],
  fsmState: string
): ToolExecutionScope {
  const allowedSets = constraints
    .map((constraint) => constraint.allowedToolIds)
    .filter((toolIds): toolIds is readonly string[] => toolIds !== undefined)
    .map((toolIds) => Array.from(new Set(toolIds)).sort());
  const allowedToolIds = allowedSets.reduce<string[] | undefined>(
    (intersection, toolIds) =>
      intersection === undefined
        ? [...toolIds]
        : intersection.filter((toolId) => toolIds.includes(toolId)),
    undefined
  );
  const policyRefs = Array.from(
    new Set(constraints.map((constraint) => constraint.policyRef))
  ).sort();
  return {
    ...(allowedToolIds === undefined ? {} : { allowedToolIds }),
    ...(policyRefs.length === 0 ? {} : { policyRefs }),
    fsmState,
  };
}

function authorityConstraintsFromExecutionScope(
  scope: ToolExecutionScope | undefined
): ToolAuthorityConstraint[] {
  if (!scope) return [];
  return [
    {
      policyRef: `execution-scope:${hashToolContract({
        allowedToolIds: scope.allowedToolIds,
        policyRefs: scope.policyRefs,
        fsmState: scope.fsmState,
      })}`,
      allowedToolIds: scope.allowedToolIds,
    },
  ];
}

function inferToolSideEffect(
  name: string,
  params: unknown
): 'none' | 'read' | 'write' | 'external_effect' | 'irreversible' {
  if (name === 'filesystem' && params && typeof params === 'object') {
    const operation = (params as Record<string, unknown>).operation;
    if (operation === 'write' || operation === 'execute') return 'write';
    if (operation === 'delete') return 'irreversible';
    return 'read';
  }
  return 'read';
}

function decodeStartRunCommandPayload(payload: unknown): StartRunCommandPayload {
  const record = asRecord(payload);
  if (!record) invalidRuntimeInput('start_run payload must be an object');
  const allowed = new Set(['input', 'agentId', 'workflowRef', 'domainPack', 'fsm', 'metadata']);
  const unexpected = Object.keys(record).find((key) => !allowed.has(key));
  if (unexpected) invalidRuntimeInput(`start_run payload contains an unknown field: ${unexpected}`);

  const decoded: StartRunCommandPayload = {};
  if ('input' in record) decoded.input = record.input;
  if ('agentId' in record) {
    const agentId = stringValue(record.agentId);
    if (!agentId) invalidRuntimeInput('start_run agentId must be a non-empty string');
    decoded.agentId = agentId;
  }
  if ('workflowRef' in record)
    decoded.workflowRef = decodeSpecRef(record.workflowRef, 'workflowRef');
  if ('domainPack' in record) decoded.domainPack = validateDomainPackSpec(record.domainPack);
  if ('fsm' in record) {
    const fsm = fsmProcessSpecSchema.parse(record.fsm);
    validateFSMProcessSpec(fsm);
    decoded.fsm = fsm;
  }
  if ('metadata' in record) {
    const metadata = asRecord(record.metadata);
    if (!metadata) invalidRuntimeInput('start_run metadata must be an object');
    decoded.metadata = metadata;
  }
  return decoded;
}

function decodeSpecRef(value: unknown, label: string): SpecRef {
  const record = asRecord(value);
  const id = stringValue(record?.id);
  if (!record || !id) invalidRuntimeInput(`${label}.id must be a non-empty string`);
  const version = record.version === undefined ? undefined : stringValue(record.version);
  const revision = record.revision === undefined ? undefined : stringValue(record.revision);
  if (record.version !== undefined && !version) {
    invalidRuntimeInput(`${label}.version must be a non-empty string`);
  }
  if (record.revision !== undefined && !revision) {
    invalidRuntimeInput(`${label}.revision must be a non-empty string`);
  }
  return {
    id,
    ...(version === undefined ? {} : { version }),
    ...(revision === undefined ? {} : { revision }),
  };
}

function classifySessionCommandFailure(
  error: unknown,
  command: Readonly<SessionCommandRecord>
): SessionCommandHandlerResult {
  const normalized = asRecord(asRecord(error)?.normalizedError);
  const frameworkCode = error instanceof FrameworkError ? error.code : undefined;
  const normalizedCode = stringValue(normalized?.code);
  const rejectionCode = (frameworkCode ?? normalizedCode ?? 'session_command_unexpected_error')
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/gu, '_');
  if (normalized?.retryable === true) {
    const delayMs = Math.min(30_000, 1_000 * 2 ** Math.max(0, command.attempts - 1));
    return {
      disposition: 'retry',
      availableAt: new Date(Date.now() + delayMs).toISOString(),
    };
  }
  return { disposition: 'failed', rejectionCode, deadLetter: true };
}

function invalidRuntimeInput(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

let service: EventRuntimeService | null = null;

export function getEventRuntime(): EventRuntimeService {
  if (!service) {
    service = new EventRuntimeService();
  }
  return service;
}
