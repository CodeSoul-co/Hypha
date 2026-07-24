import {
  createFrameworkEvent,
  FrameworkError,
  hashCanonicalJson,
  InMemoryEventStore,
  type EventStore,
  type FrameworkEvent,
  type SpecRef,
} from '@hypha/core';
import {
  defaultReActFSMProcessSpec,
  FSMRuntime,
  validateFSMSnapshot,
  type FSMProcessSpec,
  type FSMSnapshot,
  type FSMStateEnteredRecord,
  type StateTransition,
} from '@hypha/fsm';
import type { InferenceProvider } from '@hypha/inference';
import {
  BasicReActAgentRuntime,
  DefaultContextBuilder,
  DefaultVerifier,
  ReasoningContextBuilder,
  ReActRunner,
  SkillContextBuilder,
  type BuiltAgentContext,
  type ContextBuildInput,
  type ContextBuilder,
  type AgenticReasoner,
  type ReActAgentRuntime,
  type ReActContinuationCheckpoint,
  type ReActContinuationCheckpointStore,
  type ReActExecutionBudget,
  type ReActRunControl,
  type ReActRunResult,
  type ReActStep,
  type ReasoningConfig,
  type SkillContextBuilderOptions,
  type ThinkingPlanner,
  type Verifier,
} from '@hypha/kernel';
import {
  type SkillPolicy,
  type SkillRegistry,
  SkillContextLoader,
  SkillSelector,
} from '@hypha/skills';
import type { ToolExecutionScope, ToolRunner } from '@hypha/tools';
import { randomUUID } from 'node:crypto';

export interface RuntimeSession {
  id: string;
  userId: string;
  domainPackRef?: SpecRef;
  sessionProfileRef?: SpecRef;
  metadata: Record<string, unknown>;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeRun {
  id: string;
  sessionId: string;
  userId: string;
  domainPackRef?: SpecRef;
  workflowRef?: SpecRef;
  agentRef?: SpecRef;
  status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  input?: unknown;
  output?: unknown;
}

export interface CreateSessionInput {
  id: string;
  userId: string;
  domainPackRef?: SpecRef;
  sessionProfileRef?: SpecRef;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}

export interface CreateRunInput {
  id: string;
  sessionId: string;
  userId: string;
  domainPackRef?: SpecRef;
  workflowRef?: SpecRef;
  agentRef?: SpecRef;
  input?: unknown;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}

export interface AppendRunEventInput<TPayload = unknown> {
  id: string;
  type: FrameworkEvent['type'];
  runId: string;
  sessionId: string;
  userId: string;
  payload: TPayload;
  stepId?: string;
  fsmState?: string;
  agentId?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface ReplayProjection {
  runId: string;
  events: FrameworkEvent[];
  statePath: string[];
  toolCallEventIds: string[];
  policyDecisionEventIds: string[];
  memoryEventIds: string[];
  reasoningEventIds: string[];
  skillEventIds: string[];
  modelCalls: FrameworkEvent[];
  toolCalls: FrameworkEvent[];
  memoryReads: FrameworkEvent[];
  memoryWrites: FrameworkEvent[];
  reasoningEvents: FrameworkEvent[];
  skillEvents: FrameworkEvent[];
  policyDecisions: FrameworkEvent[];
  finalOutput?: unknown;
}

export interface AuditProjection {
  runId: string;
  eventCount: number;
  policyDecisionCount: number;
  memoryWriteCount: number;
  reasoningDecisionCount: number;
  skillActivationCount: number;
  toolCallCount: number;
  missingRunIds: string[];
}

export interface RegressionProjection {
  runId: string;
  eventTypes: string[];
  statePath: string[];
  toolCalls: Array<{ toolId?: unknown; status: string }>;
  memoryWriteCount: number;
  reasoningDecisionCount: number;
  skillActivationCount: number;
  finalOutput?: unknown;
}

export interface RunExecutionContext {
  runId: string;
  sessionId: string;
  userId: string;
  agentId?: string;
}

export interface RunManagerOptions {
  runtime?: EventFirstRuntime;
}

export interface HarnessedReActFSMRunnerOptions {
  inference: InferenceProvider;
  toolRunner?: ToolRunner;
  runManager?: RunManager;
  fsmSpec?: FSMProcessSpec;
  contextBuilder?: ContextBuilder;
  skillRegistry?: SkillRegistry;
  skillSelector?: SkillSelector;
  skillContextLoader?: SkillContextLoader;
  skillPolicy?: SkillPolicy;
  allowedSkills?: SkillContextBuilderOptions['allowedSkills'];
  requiredSkills?: SkillContextBuilderOptions['requiredSkills'];
  thinkingPlanner?: ThinkingPlanner;
  agenticReasoner?: AgenticReasoner;
  reasoningConfig?: ReasoningConfig;
  verifier?: Verifier;
  reactRuntime?: ReActAgentRuntime;
  maxIterations?: number;
  executionBudget?: Partial<ReActExecutionBudget>;
  reactCheckpointStore?: ReActContinuationCheckpointStore;
  continueAfterTool?: boolean;
  resolveToolExecutionScope?: (input: {
    fsmState: string;
    context: BuiltAgentContext;
    toolId: string;
  }) => ToolExecutionScope | undefined;
  now?: () => string;
}

export interface HarnessedReActFSMRunInput<TInput = unknown> extends ContextBuildInput<TInput> {
  sessionId: string;
  userId: string;
  domainPackRef?: SpecRef;
  workflowRef?: SpecRef;
  createSession?: boolean;
  resumeFromCheckpoint?: boolean;
}

export interface HarnessedReActFSMRunResult {
  run: RuntimeRun;
  react: ReActRunResult;
  fsmSnapshot: ReturnType<FSMRuntime['getSnapshot']>;
  events: FrameworkEvent[];
}

export class EventFirstRuntime {
  constructor(private readonly events: EventStore = new InMemoryEventStore()) {}

  async createSession(input: CreateSessionInput): Promise<RuntimeSession> {
    const timestamp = input.timestamp ?? new Date().toISOString();
    const session: RuntimeSession = {
      id: input.id,
      userId: input.userId,
      domainPackRef: input.domainPackRef,
      sessionProfileRef: input.sessionProfileRef,
      metadata: input.metadata ?? {},
      status: 'active',
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await this.events.append(
      createFrameworkEvent({
        id: `${input.userId}:${input.id}:created`,
        type: 'session.created',
        runId: 'session-bootstrap',
        sessionId: input.id,
        timestamp,
        payload: session,
        metadata: { userId: input.userId },
      })
    );
    return session;
  }

  async createRun(input: CreateRunInput): Promise<RuntimeRun> {
    const timestamp = input.timestamp ?? new Date().toISOString();
    const run: RuntimeRun = {
      id: input.id,
      sessionId: input.sessionId,
      userId: input.userId,
      ...(input.domainPackRef === undefined ? {} : { domainPackRef: input.domainPackRef }),
      ...(input.workflowRef === undefined ? {} : { workflowRef: input.workflowRef }),
      ...(input.agentRef === undefined ? {} : { agentRef: input.agentRef }),
      status: 'queued',
      createdAt: timestamp,
      updatedAt: timestamp,
      ...(input.input === undefined ? {} : { input: input.input }),
    };
    await this.events.append(
      createFrameworkEvent({
        id: `${input.id}:created`,
        type: 'run.created',
        runId: input.id,
        sessionId: input.sessionId,
        timestamp,
        payload: { ...run, runId: input.id },
        metadata: { ...input.metadata, userId: input.userId },
      })
    );
    return run;
  }

  async appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent> {
    if (!input.runId || !input.sessionId) {
      throw new FrameworkError({
        code: 'EVENT_REQUIRES_RUN_AND_SESSION',
        message: 'Run events must include runId and sessionId',
      });
    }
    const event = createFrameworkEvent({
      id: input.id,
      type: input.type,
      runId: input.runId,
      sessionId: input.sessionId,
      stepId: input.stepId,
      agentId: input.agentId,
      fsmState: input.fsmState,
      timestamp: input.timestamp,
      payload: input.payload,
      metadata: { ...input.metadata, userId: input.userId },
    });
    await this.events.append(event);
    return event;
  }

  async projectSession(sessionId: string): Promise<RuntimeSession | null> {
    const events = await this.events.list({ sessionId });
    return projectSession(events);
  }

  async projectRun(runId: string): Promise<RuntimeRun | null> {
    const events = await this.events.list({ runId });
    return projectRun(events);
  }

  async projectReplay(runId: string): Promise<ReplayProjection> {
    return projectReplay(await this.events.list({ runId }));
  }

  async projectAudit(runId: string): Promise<AuditProjection> {
    return projectAudit(await this.events.list({ runId }));
  }

  async projectRegression(runId: string): Promise<RegressionProjection> {
    const replay = await this.projectReplay(runId);
    return {
      runId,
      eventTypes: replay.events.map((event) => event.type),
      statePath: replay.statePath,
      toolCalls: replay.toolCalls.map((event) => ({
        toolId: (event.payload as Record<string, unknown>).toolId,
        status: event.type,
      })),
      memoryWriteCount: replay.memoryWrites.length,
      reasoningDecisionCount: replay.reasoningEvents.filter(
        (event) => event.type === 'reasoning.decision.recorded'
      ).length,
      skillActivationCount: replay.skillEvents.filter((event) => event.type === 'skill.completed')
        .length,
      finalOutput: replay.finalOutput,
    };
  }

  async listEvents(runId: string): Promise<FrameworkEvent[]> {
    return this.events.list({ runId });
  }
}

export class RunManager {
  private readonly runtime: EventFirstRuntime;

  constructor(options: RunManagerOptions = {}) {
    this.runtime = options.runtime ?? new EventFirstRuntime();
  }

  eventRuntime(): EventFirstRuntime {
    return this.runtime;
  }

  async createSession(input: CreateSessionInput): Promise<RuntimeSession> {
    return this.runtime.createSession(input);
  }

  async createRun(input: CreateRunInput): Promise<RuntimeRun> {
    return this.runtime.createRun(input);
  }

  async appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent(input);
  }

  async startRun(run: RuntimeRun, timestamp?: string): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(run.id, 'run.started'),
      type: 'run.started',
      runId: run.id,
      sessionId: run.sessionId,
      userId: run.userId,
      timestamp,
      payload: { runId: run.id, input: run.input },
      metadata: { agentRef: run.agentRef, workflowRef: run.workflowRef },
    });
  }

  async recordTransitionAccepted(
    context: RunExecutionContext,
    transition: StateTransition
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'fsm.transition.accepted'),
      type: 'fsm.transition.accepted',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      stepId: transition.metadata?.stepId as string | undefined,
      agentId: context.agentId,
      fsmState: transition.to,
      timestamp: transition.acceptedAt,
      payload: {
        processId: transition.processId,
        from: transition.from,
        to: transition.to,
        transition: transition.transition,
        snapshot: transition.snapshot,
      },
      metadata: transition.metadata,
    });
  }

  async recordStateEntered(
    context: RunExecutionContext,
    record: FSMStateEnteredRecord
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, `fsm.state.entered.${record.stateId}`),
      type: 'fsm.state.entered',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      fsmState: record.stateId,
      timestamp: record.enteredAt,
      payload: {
        processId: record.processId,
        stateId: record.stateId,
        fromState: record.fromState,
        snapshot: record.snapshot,
      },
      metadata: record.metadata,
    });
  }

  async recordContextBuildStarted(context: RunExecutionContext): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'context.build.started'),
      type: 'context.build.started',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload: { runId: context.runId },
    });
  }

  async recordContextBuildCompleted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'context.build.completed'),
      type: 'context.build.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordSkillSelected(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'skill.selected'),
      type: 'skill.selected',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordSkillLoaded(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'skill.loaded'),
      type: 'skill.loaded',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordSkillCompleted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'skill.completed'),
      type: 'skill.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordThinkingStarted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'thinking.started'),
      type: 'thinking.started',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordThinkingCompleted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'thinking.completed'),
      type: 'thinking.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordAgentDeliberationStarted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'agent.deliberation.started'),
      type: 'agent.deliberation.started',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordAgentDeliberationCompleted(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'agent.deliberation.completed'),
      type: 'agent.deliberation.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordReasoningDecision(
    context: RunExecutionContext,
    payload: Record<string, unknown>
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'reasoning.decision.recorded'),
      type: 'reasoning.decision.recorded',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      payload,
    });
  }

  async recordReactStep(context: RunExecutionContext, step: ReActStep): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, `react.step.${step.phase}`),
      type: 'react.step.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      stepId: step.id,
      agentId: context.agentId,
      payload: { step },
    });
  }

  async recordReactContinuationCheckpoint(
    context: RunExecutionContext,
    checkpoint: ReActContinuationCheckpoint
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'react.continuation.checkpointed'),
      type: 'react.continuation.checkpointed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      stepId: checkpoint.stepId,
      agentId: context.agentId,
      timestamp: checkpoint.updatedAt,
      payload: reactCheckpointReceipt(checkpoint),
    });
  }

  async recordReactContinuationResumed(
    context: RunExecutionContext,
    checkpoint: ReActContinuationCheckpoint,
    resumedAt: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'react.continuation.resumed'),
      type: 'react.continuation.resumed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      stepId: checkpoint.stepId,
      agentId: context.agentId,
      timestamp: resumedAt,
      payload: {
        stepId: checkpoint.stepId,
        scopeHash: checkpoint.scopeHash,
        checkpointStepSequence: checkpoint.stepSequence,
        checkpointHash: hashCanonicalJson(checkpoint),
        resumedAt,
      },
    });
  }

  async recordReactContinuationSuspended(
    context: RunExecutionContext,
    result: ReActRunResult
  ): Promise<FrameworkEvent> {
    if (result.status !== 'suspended' || !result.checkpoint || !result.suspension) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: 'ReAct suspension receipt requires a suspended result and checkpoint',
      });
    }
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'react.continuation.suspended'),
      type: 'react.continuation.suspended',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      stepId: result.checkpoint.stepId,
      agentId: context.agentId,
      timestamp: result.checkpoint.updatedAt,
      payload: {
        stepId: result.checkpoint.stepId,
        scopeHash: result.checkpoint.scopeHash,
        stepSequence: result.checkpoint.stepSequence,
        reason: result.suspension.reason,
        retryable: result.suspension.retryable,
        requiresHumanReview: result.suspension.requiresHumanReview,
        checkpointHash: hashCanonicalJson(result.checkpoint),
      },
    });
  }

  async completeRun(
    context: RunExecutionContext,
    output: unknown,
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'run.completed'),
      type: 'run.completed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: { terminalState: 'Completed', output },
    });
  }

  async waitForHumanReview(
    context: RunExecutionContext,
    payload: Record<string, unknown> = {},
    timestamp?: string
  ): Promise<FrameworkEvent> {
    await this.recordHumanReviewRequested(context, payload, timestamp);
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'run.waiting_human'),
      type: 'run.waiting_human',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: {
        ...payload,
        waitId: nonEmptyString(payload.waitId) ?? `human-review:${context.runId}`,
      },
    });
  }

  async recordHumanReviewRequested(
    context: RunExecutionContext,
    payload: Record<string, unknown> = {},
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'human.review.requested'),
      type: 'human.review.requested',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload,
    });
  }

  async recordHumanReviewApproved(
    context: RunExecutionContext,
    payload: Record<string, unknown> = {},
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'human.review.approved'),
      type: 'human.review.approved',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: { ...payload, decision: 'approved' },
    });
  }

  async recordHumanReviewRejected(
    context: RunExecutionContext,
    payload: Record<string, unknown> = {},
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'human.review.rejected'),
      type: 'human.review.rejected',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: { ...payload, decision: 'rejected' },
    });
  }

  async recordContextCompacted(
    context: RunExecutionContext,
    payload: Record<string, unknown> = {},
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'context.compacted'),
      type: 'context.compacted',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload,
    });
  }

  async cancelRun(
    context: RunExecutionContext,
    reason?: string,
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'run.cancelled'),
      type: 'run.cancelled',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: { terminalState: 'Cancelled', reason },
    });
  }

  async failRun(
    context: RunExecutionContext,
    error: unknown,
    timestamp?: string
  ): Promise<FrameworkEvent> {
    return this.runtime.appendRunEvent({
      id: this.nextEventId(context.runId, 'run.failed'),
      type: 'run.failed',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      agentId: context.agentId,
      timestamp,
      payload: {
        terminalState: 'Failed',
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }

  async listEvents(runId: string): Promise<FrameworkEvent[]> {
    return this.runtime.listEvents(runId);
  }

  async projectRun(runId: string): Promise<RuntimeRun | null> {
    return this.runtime.projectRun(runId);
  }

  async projectSession(sessionId: string): Promise<RuntimeSession | null> {
    return this.runtime.projectSession(sessionId);
  }

  async projectReplay(runId: string): Promise<ReplayProjection> {
    return this.runtime.projectReplay(runId);
  }

  async projectAudit(runId: string): Promise<AuditProjection> {
    return this.runtime.projectAudit(runId);
  }

  async projectRegression(runId: string): Promise<RegressionProjection> {
    return this.runtime.projectRegression(runId);
  }

  private nextEventId(runId: string, label: string): string {
    return `${runId}:${label}:${randomUUID()}`;
  }
}

export class HarnessedReActFSMRunner {
  private readonly runManager: RunManager;
  private readonly fsmSpec: FSMProcessSpec;
  private readonly contextBuilder: ContextBuilder;
  private readonly verifier: Verifier;
  private readonly toolRunner?: ToolRunner;
  private readonly reactRuntime?: ReActAgentRuntime;
  private readonly maxIterations?: number;
  private readonly now: () => string;

  constructor(private readonly options: HarnessedReActFSMRunnerOptions) {
    this.runManager = options.runManager ?? new RunManager();
    this.fsmSpec = options.fsmSpec ?? defaultReActFSMProcessSpec;
    let baseContextBuilder = options.contextBuilder ?? new DefaultContextBuilder();
    if (options.skillRegistry) {
      baseContextBuilder = new SkillContextBuilder({
        baseBuilder: baseContextBuilder,
        registry: options.skillRegistry,
        selector: options.skillSelector,
        contextLoader: options.skillContextLoader,
        policy: options.skillPolicy,
        allowedSkills: options.allowedSkills,
        requiredSkills: options.requiredSkills,
        now: options.now,
      });
    }
    this.contextBuilder =
      options.thinkingPlanner || options.agenticReasoner || options.reasoningConfig
        ? new ReasoningContextBuilder({
            baseBuilder: baseContextBuilder,
            planner: options.thinkingPlanner,
            reasoner: options.agenticReasoner,
            config: options.reasoningConfig,
            now: options.now,
          })
        : baseContextBuilder;
    this.verifier = options.verifier ?? new DefaultVerifier();
    this.toolRunner = options.toolRunner;
    this.reactRuntime = options.reactRuntime;
    this.maxIterations = options.maxIterations;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async run(input: HarnessedReActFSMRunInput): Promise<HarnessedReActFSMRunResult> {
    const runContext: RunExecutionContext = {
      runId: input.runId,
      sessionId: input.sessionId,
      userId: input.userId,
      agentId: input.agent.id,
    };

    if (input.resumeFromCheckpoint && !this.options.reactCheckpointStore) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: 'resumeFromCheckpoint requires reactCheckpointStore',
      });
    }

    if (!input.resumeFromCheckpoint && input.createSession !== false) {
      await this.runManager.createSession({
        id: input.sessionId,
        userId: input.userId,
        domainPackRef: input.domainPackRef,
        metadata: input.metadata,
        timestamp: this.now(),
      });
    }

    const run = input.resumeFromCheckpoint
      ? await this.requireResumableRun(input)
      : await this.runManager.createRun({
          id: input.runId,
          sessionId: input.sessionId,
          userId: input.userId,
          domainPackRef: input.domainPackRef,
          workflowRef: input.workflowRef,
          agentRef: { id: input.agent.id, version: input.agent.version },
          input: input.input,
          timestamp: this.now(),
        });
    if (!input.resumeFromCheckpoint) await this.runManager.startRun(run, this.now());

    const fsmOptions = {
      now: this.now,
      onTransition: async (transition: StateTransition) => {
        await this.runManager.recordTransitionAccepted(runContext, transition);
      },
      onStateEntered: async (record: FSMStateEnteredRecord) => {
        await this.runManager.recordStateEntered(runContext, record);
      },
    };
    const resumedSnapshot = input.resumeFromCheckpoint
      ? await this.latestFSMSnapshot(input.runId)
      : undefined;
    const fsm = new FSMRuntime(this.fsmSpec, input.runId, fsmOptions, resumedSnapshot);
    try {
      if (!input.resumeFromCheckpoint) {
        await fsm.start({ phase: 'idle' });
        await this.transitionIfNeeded(fsm, 'RunInitialized', { phase: 'run_initialized' });
      }

      await this.runManager.recordContextBuildStarted(runContext);
      const context = await this.contextBuilder.build(input);
      await this.runManager.recordContextBuildCompleted(runContext, {
        messageCount: context.messages.length,
        memoryScope: context.memoryScope,
        memoryContextCount: context.memoryContext?.length ?? 0,
        contextBudget: context.contextBudget,
        contextProvenance: context.contextProvenance,
        reasoningConfig: context.reasoningConfig,
        thinkingPlanId: context.thinkingPlan?.id,
        reasoningDecisionId: context.reasoningDecision?.id,
        activeSkillIds: context.activeSkills?.map((skill) => skill.id) ?? [],
        rejectedSkills: context.rejectedSkills ?? [],
      });
      await this.recordSkillEvents(runContext, context);
      await this.recordReasoningEvents(runContext, context);
      if (!input.resumeFromCheckpoint) {
        await this.transitionIfNeeded(fsm, 'ContextBuilt', { phase: 'context_built' });
      }

      const reactRuntime =
        this.reactRuntime ?? new BasicReActAgentRuntime({ verifier: this.verifier });
      const reactRunner = new ReActRunner(reactRuntime, {
        inference: this.options.inference,
        toolRunner: this.toolRunner,
        maxIterations: this.maxIterations,
        executionBudget: this.options.executionBudget,
        checkpointStore: this.options.reactCheckpointStore,
        continueAfterTool: this.options.continueAfterTool,
        resolveToolExecutionScope: (reactContext, action) =>
          this.options.resolveToolExecutionScope?.({
            fsmState: fsm.getSnapshot().currentState,
            context: reactContext as BuiltAgentContext,
            toolId: action.target ?? '',
          }) ?? reactContext.toolExecutionScope,
        onStep: async (step) => {
          await this.runManager.recordReactStep(runContext, step);
          const state = stateForReActStep(step);
          if (state) {
            await this.transitionIfNeeded(fsm, state, {
              phase: step.phase,
              stepId: step.id,
            });
          }
        },
        onCheckpoint: async (checkpoint) => {
          await this.runManager.recordReactContinuationCheckpoint(runContext, checkpoint);
        },
        onResume: async (checkpoint) => {
          await this.runManager.recordReactContinuationResumed(runContext, checkpoint, this.now());
        },
      });

      const control: ReActRunControl = input.resumeFromCheckpoint
        ? { resumeFromCheckpointStore: true }
        : {};
      const react = await reactRunner.run(context, control);
      if (react.status === 'completed') {
        await this.transitionIfNeeded(fsm, 'Completed', { phase: 'complete' });
        await this.runManager.completeRun(runContext, react.output, this.now());
      } else if (react.status === 'human_review_required') {
        await this.transitionIfNeeded(fsm, 'HumanReview', { phase: 'human_review' });
        await this.runManager.waitForHumanReview(
          runContext,
          { finalAction: react.finalAction },
          this.now()
        );
      } else if (react.status === 'suspended') {
        await this.runManager.recordReactContinuationSuspended(runContext, react);
        if (react.suspension?.requiresHumanReview) {
          await this.transitionIfNeeded(fsm, 'HumanReview', {
            phase: 'human_review',
            reason: react.suspension.reason,
          });
          await this.runManager.waitForHumanReview(
            runContext,
            {
              reason: react.suspension.reason,
              ...(react.checkpoint === undefined
                ? {}
                : { checkpointRef: reactCheckpointRef(react.checkpoint) }),
            },
            this.now()
          );
        }
      } else if (react.status === 'cancelled') {
        await this.transitionIfNeeded(fsm, 'Cancelled', { phase: 'cancel' });
        await this.runManager.cancelRun(runContext, 'ReAct execution was cancelled.', this.now());
      } else {
        await this.transitionIfNeeded(fsm, 'Failed', { phase: 'fail' });
        await this.runManager.failRun(runContext, react.error, this.now());
      }

      return {
        run: (await this.runManager.projectRun(input.runId)) ?? run,
        react,
        fsmSnapshot: fsm.getSnapshot(),
        events: await this.runManager.listEvents(input.runId),
      };
    } catch (error) {
      await this.transitionToFailedIfPossible(fsm, error);
      await this.runManager.failRun(runContext, error, this.now());
      const react: ReActRunResult = {
        runId: input.runId,
        status: 'failed',
        steps: [],
        error,
      };
      return {
        run: (await this.runManager.projectRun(input.runId)) ?? run,
        react,
        fsmSnapshot: fsm.getSnapshot(),
        events: await this.runManager.listEvents(input.runId),
      };
    }
  }

  private async requireResumableRun(input: HarnessedReActFSMRunInput): Promise<RuntimeRun> {
    const run = await this.runManager.projectRun(input.runId);
    if (!run || run.sessionId !== input.sessionId || run.userId !== input.userId) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_NOT_FOUND',
        message: 'ReAct continuation Run was not found in the requested scope',
      });
    }
    if (run.status !== 'running') {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_CONFLICT',
        message: `ReAct continuation requires a running Run; current status is ${run.status}`,
      });
    }
    return run;
  }

  private async latestFSMSnapshot(runId: string): Promise<ReturnType<FSMRuntime['getSnapshot']>> {
    const events = await this.runManager.listEvents(runId);
    for (const event of [...events].reverse()) {
      if (event.type !== 'fsm.state.entered') continue;
      const payload = event.payload as Record<string, unknown>;
      const snapshot = payload.snapshot;
      if (isFSMSnapshotCandidate(snapshot)) {
        const candidate = structuredClone(snapshot) as FSMSnapshot;
        validateFSMSnapshot(this.fsmSpec, candidate, runId);
        return candidate;
      }
    }
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: `ReAct continuation has no FSM snapshot: ${runId}`,
    });
  }

  private async transitionIfNeeded(
    fsm: FSMRuntime,
    to: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    if (fsm.getSnapshot().currentState === to) return;
    await fsm.transition(to, { metadata });
  }

  private async transitionToFailedIfPossible(fsm: FSMRuntime, error: unknown): Promise<void> {
    if (fsm.getSnapshot().status !== 'running') return;
    try {
      await this.transitionIfNeeded(fsm, 'Failed', {
        phase: 'fail',
        error: error instanceof Error ? error.message : String(error),
      });
    } catch {
      // A failed transition should not prevent the run.failed fact from being recorded.
    }
  }

  private async recordReasoningEvents(
    context: RunExecutionContext,
    builtContext: BuiltAgentContext
  ): Promise<void> {
    if (builtContext.thinkingPlan) {
      await this.runManager.recordThinkingStarted(context, {
        config: builtContext.reasoningConfig,
        plannerRef: builtContext.reasoningConfig?.plannerRef,
      });
      await this.runManager.recordThinkingCompleted(context, {
        thinkingPlan: builtContext.thinkingPlan,
      });
    }
    if (builtContext.reasoningDecision) {
      await this.runManager.recordAgentDeliberationStarted(context, {
        config: builtContext.reasoningConfig,
        reasonerRef: builtContext.reasoningConfig?.reasonerRef,
        thinkingPlanId: builtContext.thinkingPlan?.id,
      });
      await this.runManager.recordAgentDeliberationCompleted(context, {
        decisionId: builtContext.reasoningDecision.id,
        mode: builtContext.reasoningDecision.mode,
        recommendedPhase: builtContext.reasoningDecision.recommendedPhase,
      });
      await this.runManager.recordReasoningDecision(context, {
        reasoningDecision: builtContext.reasoningDecision,
      });
    }
  }

  private async recordSkillEvents(
    context: RunExecutionContext,
    builtContext: BuiltAgentContext
  ): Promise<void> {
    for (const skill of builtContext.activeSkills ?? []) {
      await this.runManager.recordSkillSelected(context, {
        skillId: skill.id,
        version: skill.version,
        activation: skill.activation,
        policyDecision: {
          allowed: skill.policyDecision.allowed,
          requiresHumanReview: skill.policyDecision.requiresHumanReview,
          policyId: skill.policyDecision.policyId,
          reason: skill.policyDecision.reason,
        },
      });
      await this.runManager.recordSkillLoaded(context, {
        skillId: skill.id,
        version: skill.version,
        loadedInstructions: Boolean(skill.instructions),
        loadedReferences: skill.references.map((reference) => ({
          path: reference.path,
          type: reference.type,
          loaded: Boolean(reference.content),
          truncated: reference.truncated,
        })),
      });
      await this.runManager.recordSkillCompleted(context, {
        skillId: skill.id,
        version: skill.version,
        allowedTools: skill.allowedTools,
      });
    }
  }
}

function isFSMSnapshotCandidate(value: unknown): value is FSMSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const candidate = value as Partial<FSMSnapshot>;
  return (
    typeof candidate.processId === 'string' &&
    typeof candidate.runId === 'string' &&
    typeof candidate.currentState === 'string' &&
    Array.isArray(candidate.statePath) &&
    candidate.statePath.every((state) => typeof state === 'string') &&
    (candidate.status === 'running' ||
      candidate.status === 'completed' ||
      candidate.status === 'failed' ||
      candidate.status === 'cancelled') &&
    typeof candidate.updatedAt === 'string'
  );
}

function stateForReActStep(step: ReActStep): string | null {
  switch (step.phase) {
    case 'reason':
      return 'Reasoning';
    case 'select_action':
      return 'ActionSelected';
    case 'policy_check':
      return 'PolicyChecked';
    case 'act':
      return 'Acting';
    case 'observe_result':
      return 'ObservationRecorded';
    case 'verify':
      return 'Verifying';
    case 'complete':
      return 'Completed';
    case 'fail':
      return 'Failed';
    case 'human_review':
      return 'HumanReview';
    case 'memory_sync':
      return 'MemorySync';
    case 'suspend':
    case 'cancel':
    case 'observe':
      return null;
  }
}

function reactCheckpointReceipt(checkpoint: ReActContinuationCheckpoint): Record<string, unknown> {
  return {
    checkpointVersion: checkpoint.version,
    stepId: checkpoint.stepId,
    scopeHash: checkpoint.scopeHash,
    stepSequence: checkpoint.stepSequence,
    nextPhase: checkpoint.nextPhase,
    iterations: checkpoint.iterations,
    modelCalls: checkpoint.modelCalls,
    toolCalls: checkpoint.toolCalls,
    totalTokens: checkpoint.totalTokens,
    consecutiveNoProgress: checkpoint.consecutiveNoProgress,
    checkpointHash: hashCanonicalJson(checkpoint),
    updatedAt: checkpoint.updatedAt,
  };
}

function reactCheckpointRef(checkpoint: ReActContinuationCheckpoint): string {
  return `react-checkpoint://${encodeURIComponent(checkpoint.runId)}/${encodeURIComponent(
    checkpoint.stepId
  )}/${checkpoint.stepSequence}`;
}

export function projectSession(events: FrameworkEvent[]): RuntimeSession | null {
  const created = events.find((event) => event.type === 'session.created');
  if (!created) return null;
  const session = created.payload as RuntimeSession;
  const closed = events.find((event) => event.type === 'session.closed');
  const last = events[events.length - 1] ?? created;
  return {
    ...session,
    status: closed ? 'closed' : session.status,
    updatedAt: last.timestamp,
  };
}

export function projectRun(events: FrameworkEvent[]): RuntimeRun | null {
  const created = events.find((event) => event.type === 'run.created');
  if (!created) return null;
  const run = created.payload as RuntimeRun;
  const last = events[events.length - 1] ?? created;
  const terminal = [...events]
    .reverse()
    .find((event) => ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type));
  const waitingHuman = [...events].reverse().find((event) => event.type === 'run.waiting_human');
  return {
    ...run,
    status: terminal
      ? statusFromRunEvent(terminal.type)
      : waitingHuman
        ? 'waiting_human'
        : statusFromEvents(events, run.status),
    updatedAt: last.timestamp,
    completedAt: terminal?.timestamp,
    output: terminal ? (terminal.payload as Record<string, unknown>).output : run.output,
  };
}

export function projectReplay(events: FrameworkEvent[]): ReplayProjection {
  const runId = events.find((event) => event.runId)?.runId ?? '';
  const terminal = [...events]
    .reverse()
    .find((event) => ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type));
  return {
    runId,
    events,
    statePath: events
      .filter((event) => event.type === 'fsm.state.entered')
      .map((event) => String((event.payload as Record<string, unknown>).stateId)),
    toolCallEventIds: events
      .filter((event) => event.type.startsWith('tool.'))
      .map((event) => event.id),
    policyDecisionEventIds: events
      .filter((event) => event.type === 'tool.policy.checked')
      .map((event) => event.id),
    memoryEventIds: events
      .filter((event) => event.type.startsWith('memory.'))
      .map((event) => event.id),
    reasoningEventIds: events
      .filter((event) => isReasoningEventType(event.type))
      .map((event) => event.id),
    skillEventIds: events.filter((event) => isSkillEventType(event.type)).map((event) => event.id),
    modelCalls: events.filter((event) => event.type.startsWith('model.call.')),
    toolCalls: events.filter((event) =>
      ['tool.call.completed', 'tool.call.failed', 'tool.call.rejected'].includes(event.type)
    ),
    memoryReads: events.filter((event) => event.type.startsWith('memory.read.')),
    memoryWrites: events.filter((event) => event.type.startsWith('memory.write.')),
    reasoningEvents: events.filter((event) => isReasoningEventType(event.type)),
    skillEvents: events.filter((event) => isSkillEventType(event.type)),
    policyDecisions: events.filter((event) => event.type.includes('policy')),
    finalOutput: terminal ? (terminal.payload as Record<string, unknown>).output : undefined,
  };
}

export function projectAudit(events: FrameworkEvent[]): AuditProjection {
  const runId = events.find((event) => event.runId)?.runId ?? '';
  return {
    runId,
    eventCount: events.length,
    policyDecisionCount: events.filter((event) => event.type.includes('policy')).length,
    memoryWriteCount: events.filter((event) => event.type === 'memory.write.committed').length,
    reasoningDecisionCount: events.filter((event) => event.type === 'reasoning.decision.recorded')
      .length,
    skillActivationCount: events.filter((event) => event.type === 'skill.completed').length,
    toolCallCount: events.filter((event) => event.type === 'tool.call.completed').length,
    missingRunIds: events.filter((event) => !event.runId).map((event) => event.id),
  };
}

function isReasoningEventType(type: FrameworkEvent['type']): boolean {
  return (
    type === 'thinking.started' ||
    type === 'thinking.completed' ||
    type === 'agent.deliberation.started' ||
    type === 'agent.deliberation.completed' ||
    type === 'reasoning.decision.recorded'
  );
}

function isSkillEventType(type: FrameworkEvent['type']): boolean {
  return (
    type === 'skill.selected' ||
    type === 'skill.loaded' ||
    type === 'skill.executed' ||
    type === 'skill.completed' ||
    type === 'skill.failed'
  );
}

function statusFromEvents(
  events: FrameworkEvent[],
  fallback: RuntimeRun['status']
): RuntimeRun['status'] {
  if (events.some((event) => event.type === 'run.started')) return 'running';
  return fallback;
}

function statusFromRunEvent(type: FrameworkEvent['type']): RuntimeRun['status'] {
  if (type === 'run.failed') return 'failed';
  if (type === 'run.cancelled') return 'cancelled';
  return 'completed';
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}
