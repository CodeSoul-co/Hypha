import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '@hypha/core';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import type { ContextBuilder } from '@hypha/kernel';
import { SkillRegistry } from '@hypha/skills';
import { GovernedToolRunner, MockToolRunner, ToolRegistry } from '@hypha/tools';
import { REACT_FSM_STATE_PATH } from '@hypha/fsm';
import {
  EventFirstRuntime,
  HarnessedReActFSMRunner,
  InMemoryMessageBus,
  InMemoryTraceRecorder,
  RunManager,
  SessionProjector,
  UserScopedSessionQueue,
} from './index';

describe('@hypha/harness contracts', () => {
  it('keeps session views derived from events', async () => {
    const trace = new InMemoryTraceRecorder();
    await trace.record(
      createFrameworkEvent({
        id: 'event_1',
        type: 'run.started',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { userId: 'owner' },
      })
    );

    const sessions = new SessionProjector().project(await trace.list());
    expect(sessions).toEqual([
      expect.objectContaining({ id: 'session_1', userId: 'owner', runIds: ['run_1'] }),
    ]);
  });

  it('queues same-session work per user while allowing shared session ids', () => {
    const queue = new UserScopedSessionQueue();
    queue.enqueue({ id: 'a1', userId: 'user-a', sessionId: 'same', payload: {} });
    queue.enqueue({ id: 'a2', userId: 'user-a', sessionId: 'same', payload: {} });
    queue.enqueue({ id: 'b1', userId: 'user-b', sessionId: 'same', payload: {} });

    expect(queue.dequeue('user-a', 'same')?.id).toBe('a1');
    expect(queue.dequeue('user-b', 'same')?.id).toBe('b1');
    expect(queue.dequeue('user-a', 'same')?.id).toBe('a2');
  });

  it('routes runtime messages by user, session, recipient, and FSM state', async () => {
    const trace = new InMemoryTraceRecorder();
    const bus = new InMemoryMessageBus({
      trace,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const recipient = { kind: 'agent' as const, id: 'agent.default' };

    await bus.publish({
      id: 'msg_a',
      type: 'workflow.input',
      userId: 'user-a',
      sessionId: 'shared',
      runId: 'run_a',
      fsmState: 'Reasoning',
      from: { kind: 'workflow', id: 'workflow.default' },
      to: recipient,
      payload: { text: 'hello a' },
    });
    await bus.publish({
      id: 'msg_b',
      type: 'workflow.input',
      userId: 'user-b',
      sessionId: 'shared',
      runId: 'run_b',
      fsmState: 'Reasoning',
      from: { kind: 'workflow', id: 'workflow.default' },
      to: recipient,
      payload: { text: 'hello b' },
    });

    const delivered = await bus.pull({
      userId: 'user-a',
      sessionId: 'shared',
      runId: 'run_a',
      fsmState: 'Reasoning',
      to: recipient,
    });
    expect(delivered).toMatchObject({
      id: 'msg_a',
      status: 'delivered',
      runId: 'run_a',
      fsmState: 'Reasoning',
    });
    await bus.acknowledge({
      id: 'msg_a',
      userId: 'user-a',
      sessionId: 'shared',
      runId: 'run_a',
      handledBy: recipient,
    });

    expect(
      await bus.pull({
        userId: 'user-a',
        sessionId: 'shared',
        runId: 'run_a',
        fsmState: 'Reasoning',
        to: recipient,
      })
    ).toBeNull();
    await expect(
      bus.pull({
        userId: 'user-b',
        sessionId: 'shared',
        runId: 'run_b',
        fsmState: 'Reasoning',
        to: recipient,
      })
    ).resolves.toMatchObject({ id: 'msg_b' });

    expect((await trace.list({ runId: 'run_a' })).map((event) => event.type)).toEqual([
      'message.enqueued',
      'message.delivered',
      'message.acknowledged',
    ]);
  });

  it('dead-letters expired messages without blocking the recipient queue', async () => {
    const trace = new InMemoryTraceRecorder();
    const bus = new InMemoryMessageBus({
      trace,
      now: () => '2026-07-04T00:00:10.000Z',
    });
    const recipient = { kind: 'agent' as const, id: 'agent.default' };
    const common = {
      userId: 'owner',
      sessionId: 'session_messages',
      runId: 'run_messages',
      from: { kind: 'workflow' as const, id: 'workflow.default' },
      to: recipient,
    };

    await bus.publish({
      ...common,
      id: 'msg_expired',
      type: 'workflow.input',
      expiresAt: '2026-07-04T00:00:00.000Z',
      payload: { text: 'old' },
    });
    await bus.publish({
      ...common,
      id: 'msg_fresh',
      type: 'workflow.input',
      payload: { text: 'fresh' },
    });

    await expect(
      bus.pull({
        userId: 'owner',
        sessionId: 'session_messages',
        runId: 'run_messages',
        to: recipient,
      })
    ).resolves.toMatchObject({ id: 'msg_fresh', status: 'delivered' });
    await expect(bus.list({ status: 'dead_lettered' })).resolves.toEqual([
      expect.objectContaining({ id: 'msg_expired' }),
    ]);
    expect((await trace.list({ runId: 'run_messages' })).map((event) => event.type)).toEqual([
      'message.enqueued',
      'message.enqueued',
      'message.dead_lettered',
      'message.delivered',
    ]);
  });

  it('requeues transient message failures with backoff and dead-letters poison messages', async () => {
    const trace = new InMemoryTraceRecorder();
    let currentTime = '2026-07-04T00:00:00.000Z';
    const bus = new InMemoryMessageBus({
      trace,
      now: () => currentTime,
      maxDeliveryAttempts: 2,
      initialRetryDelayMs: 100,
    });
    const recipient = { kind: 'agent' as const, id: 'agent.default' };
    await bus.publish({
      id: 'msg_poison',
      type: 'workflow.input',
      userId: 'owner',
      sessionId: 'session_retry',
      runId: 'run_retry',
      from: { kind: 'workflow', id: 'workflow.default' },
      to: recipient,
      payload: { text: 'retry me' },
    });

    const first = await bus.pull({
      userId: 'owner',
      sessionId: 'session_retry',
      runId: 'run_retry',
      to: recipient,
    });
    expect(first?.attemptCount).toBe(1);
    await bus.fail({
      id: 'msg_poison',
      userId: 'owner',
      sessionId: 'session_retry',
      runId: 'run_retry',
      retry: true,
      reason: 'transient_handler_failure',
    });

    await expect(
      bus.pull({
        userId: 'owner',
        sessionId: 'session_retry',
        runId: 'run_retry',
        to: recipient,
      })
    ).resolves.toBeNull();
    currentTime = '2026-07-04T00:00:00.100Z';
    const second = await bus.pull({
      userId: 'owner',
      sessionId: 'session_retry',
      runId: 'run_retry',
      to: recipient,
    });
    expect(second?.attemptCount).toBe(2);
    await bus.fail({
      id: 'msg_poison',
      userId: 'owner',
      sessionId: 'session_retry',
      runId: 'run_retry',
      retry: true,
      reason: 'same_handler_failure',
    });

    await expect(bus.list({ status: 'dead_lettered' })).resolves.toEqual([
      expect.objectContaining({ id: 'msg_poison', attemptCount: 2 }),
    ]);
    expect((await trace.list({ runId: 'run_retry' })).map((event) => event.type)).toEqual([
      'message.enqueued',
      'message.delivered',
      'message.retrying',
      'message.delivered',
      'message.dead_lettered',
    ]);
  });

  it('removes queued messages from delivery indexes when they are failed directly', async () => {
    const bus = new InMemoryMessageBus({
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const recipient = { kind: 'agent' as const, id: 'agent.default' };
    const common = {
      userId: 'owner',
      sessionId: 'session_direct_fail',
      runId: 'run_direct_fail',
      from: { kind: 'workflow' as const, id: 'workflow.default' },
      to: recipient,
      type: 'workflow.input',
    };

    await bus.publish({ ...common, id: 'msg_failed_queued', payload: { text: 'old' } });
    await bus.publish({ ...common, id: 'msg_after_fail', payload: { text: 'next' } });
    await bus.fail({
      id: 'msg_failed_queued',
      userId: 'owner',
      sessionId: 'session_direct_fail',
      runId: 'run_direct_fail',
      reason: 'cancelled_before_delivery',
    });

    await expect(
      bus.pull({
        userId: 'owner',
        sessionId: 'session_direct_fail',
        runId: 'run_direct_fail',
        to: recipient,
      })
    ).resolves.toMatchObject({ id: 'msg_after_fail', status: 'delivered' });
    await expect(bus.list({ status: 'failed' })).resolves.toEqual([
      expect.objectContaining({ id: 'msg_failed_queued' }),
    ]);
  });

  it('keeps terminal message transitions idempotent in the event stream', async () => {
    const trace = new InMemoryTraceRecorder();
    const bus = new InMemoryMessageBus({
      trace,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const recipient = { kind: 'agent' as const, id: 'agent.default' };
    await bus.publish({
      id: 'msg_terminal',
      type: 'workflow.input',
      userId: 'owner',
      sessionId: 'session_terminal',
      runId: 'run_terminal',
      from: { kind: 'workflow', id: 'workflow.default' },
      to: recipient,
      payload: { text: 'terminal' },
    });

    await bus.acknowledge({
      id: 'msg_terminal',
      userId: 'owner',
      sessionId: 'session_terminal',
      runId: 'run_terminal',
      handledBy: recipient,
    });
    await bus.fail({
      id: 'msg_terminal',
      userId: 'owner',
      sessionId: 'session_terminal',
      runId: 'run_terminal',
      reason: 'late_failure',
    });
    await bus.acknowledge({
      id: 'msg_terminal',
      userId: 'owner',
      sessionId: 'session_terminal',
      runId: 'run_terminal',
      handledBy: recipient,
    });

    await expect(bus.list({ runId: 'run_terminal' })).resolves.toEqual([
      expect.objectContaining({ id: 'msg_terminal', status: 'acknowledged' }),
    ]);
    expect((await trace.list({ runId: 'run_terminal' })).map((event) => event.type)).toEqual([
      'message.enqueued',
      'message.acknowledged',
    ]);
  });

  it('derives session, run, replay, audit, and regression state from events', async () => {
    const runtime = new EventFirstRuntime();
    await runtime.createSession({
      id: 'session_1',
      userId: 'owner',
      domainPackRef: { id: 'minimal', version: '0.0.0' },
    });
    await runtime.createRun({
      id: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      workflowRef: { id: 'workflow', version: '0.0.0' },
    });
    await runtime.appendRunEvent({
      id: 'state_1',
      type: 'fsm.state.entered',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { stateId: 'Reasoning' },
    });
    await runtime.appendRunEvent({
      id: 'model_1',
      type: 'model.call.completed',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { model: 'mock', response: 'ok' },
    });
    await runtime.appendRunEvent({
      id: 'done_1',
      type: 'run.completed',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { output: 'ok' },
    });

    await expect(runtime.projectSession('session_1')).resolves.toMatchObject({
      id: 'session_1',
      domainPackRef: { id: 'minimal' },
    });
    await expect(runtime.projectRun('run_1')).resolves.toMatchObject({
      status: 'completed',
      output: 'ok',
    });
    await expect(runtime.projectReplay('run_1')).resolves.toMatchObject({
      statePath: ['Reasoning'],
      modelCalls: [expect.objectContaining({ id: 'model_1' })],
      finalOutput: 'ok',
    });
    await expect(runtime.projectAudit('run_1')).resolves.toMatchObject({
      eventCount: 4,
    });
    await expect(runtime.projectRegression('run_1')).resolves.toMatchObject({
      eventTypes: ['run.created', 'fsm.state.entered', 'model.call.completed', 'run.completed'],
      finalOutput: 'ok',
    });
  });

  it('persists canonical Run identity and caller recovery metadata on run.created', async () => {
    const runtime = new EventFirstRuntime();
    await runtime.createRun({
      id: 'run_canonical',
      sessionId: 'session_canonical',
      userId: 'owner',
      metadata: { runtimeRunContext: { snapshot: 'persisted' } },
    });

    await expect(runtime.listEvents('run_canonical')).resolves.toEqual([
      expect.objectContaining({
        type: 'run.created',
        payload: expect.objectContaining({ id: 'run_canonical', runId: 'run_canonical' }),
        metadata: {
          runtimeRunContext: { snapshot: 'persisted' },
          userId: 'owner',
        },
      }),
    ]);
  });

  it('emits lifecycle payloads that satisfy canonical orchestration schemas', async () => {
    const runtime = new EventFirstRuntime();
    const runs = new RunManager({ runtime });
    const run = await runs.createRun({
      id: 'run_lifecycle_schema',
      sessionId: 'session_lifecycle_schema',
      userId: 'owner',
    });
    const context = {
      runId: run.id,
      sessionId: run.sessionId,
      userId: run.userId,
    };

    await runs.startRun(run);
    await runs.waitForHumanReview(context);
    await runs.completeRun(context, 'ok');
    await runs.failRun(context, 'failed');
    await runs.cancelRun(context, 'cancelled');

    const events = await runs.listEvents(run.id);
    expect(events.find((event) => event.type === 'run.started')?.payload).toMatchObject({
      runId: run.id,
    });
    expect(events.find((event) => event.type === 'run.waiting_human')?.payload).toMatchObject({
      waitId: `human-review:${run.id}`,
    });
    expect(events.find((event) => event.type === 'run.completed')?.payload).toMatchObject({
      terminalState: 'Completed',
    });
    expect(events.find((event) => event.type === 'run.failed')?.payload).toMatchObject({
      terminalState: 'Failed',
    });
    expect(events.find((event) => event.type === 'run.cancelled')?.payload).toMatchObject({
      terminalState: 'Cancelled',
    });
  });

  it('runs the minimal ReAct + FSM runtime closure with trace events for each state', async () => {
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: {
            action: 'tool',
            toolId: 'tool.mock',
            input: { query: 'hypha' },
          },
        };
      },
    };
    const toolRunner = new MockToolRunner();
    toolRunner.registerResult('tool.mock', {
      toolId: 'tool.mock',
      status: 'completed',
      output: { answer: 'ok' },
    });
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      toolRunner,
      runManager,
      now: () => '2026-07-03T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_stage4_minimal',
      stepId: 'react',
      sessionId: 'session_stage4',
      userId: 'owner',
      agent: {
        id: 'agent.stage4',
        version: '0.0.0',
        name: 'Stage Runtime Agent',
        modelAlias: 'default-chat',
        toolRefs: ['tool.mock'],
      },
      input: 'use tool',
    });

    expect(result.react).toMatchObject({
      status: 'completed',
      output: { answer: 'ok' },
    });
    expect(result.fsmSnapshot).toMatchObject({
      currentState: 'Completed',
      status: 'completed',
      statePath: [...REACT_FSM_STATE_PATH],
    });
    expect(
      result.events
        .filter((event) => event.type === 'fsm.state.entered')
        .map((event) => (event.payload as Record<string, unknown>).stateId)
    ).toEqual([...REACT_FSM_STATE_PATH]);
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'context.build.started' }),
        expect.objectContaining({ type: 'context.build.completed' }),
        expect.objectContaining({ type: 'react.step.completed' }),
        expect.objectContaining({ type: 'run.completed' }),
      ])
    );

    await expect(runManager.projectRun('run_stage4_minimal')).resolves.toMatchObject({
      status: 'completed',
      output: { answer: 'ok' },
    });
    await expect(runManager.projectReplay('run_stage4_minimal')).resolves.toMatchObject({
      statePath: [...REACT_FSM_STATE_PATH],
      finalOutput: { answer: 'ok' },
    });
    await expect(runManager.projectAudit('run_stage4_minimal')).resolves.toMatchObject({
      runId: 'run_stage4_minimal',
    });
    await expect(runManager.projectRegression('run_stage4_minimal')).resolves.toMatchObject({
      statePath: [...REACT_FSM_STATE_PATH],
    });
  });

  it('records thinking and agentic deliberation before ReAct execution when reasoning is enabled', async () => {
    let capturedRequest: InferenceRequest | undefined;
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        capturedRequest = request;
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: 'reasoned output',
        };
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      runManager,
      reasoningConfig: {
        thinkingMode: 'structured',
        agenticMode: 'fsm_react',
        maxSteps: 3,
        persist: 'summary_only',
      },
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_reasoning_harness',
      stepId: 'react',
      sessionId: 'session_reasoning_harness',
      userId: 'owner',
      agent: {
        id: 'agent.reasoning',
        version: '0.0.0',
        name: 'Reasoning Agent',
        modelAlias: 'default-chat',
      },
      input: 'think first, then act',
    });

    expect(result.react.status).toBe('completed');
    expect(capturedRequest?.input).toMatchObject({
      context: {
        thinkingPlan: expect.objectContaining({ intent: 'think first, then act' }),
        reasoningDecision: expect.objectContaining({ mode: 'fsm_react' }),
      },
    });
    expect(result.events.map((event) => event.type)).toEqual(
      expect.arrayContaining([
        'thinking.started',
        'thinking.completed',
        'agent.deliberation.started',
        'agent.deliberation.completed',
        'reasoning.decision.recorded',
        'react.step.completed',
      ])
    );
    await expect(runManager.projectReplay('run_reasoning_harness')).resolves.toMatchObject({
      reasoningEventIds: expect.arrayContaining([
        expect.stringContaining('thinking.started'),
        expect.stringContaining('reasoning.decision.recorded'),
      ]),
      reasoningEvents: [
        expect.objectContaining({ type: 'thinking.started' }),
        expect.objectContaining({ type: 'thinking.completed' }),
        expect.objectContaining({ type: 'agent.deliberation.started' }),
        expect.objectContaining({ type: 'agent.deliberation.completed' }),
        expect.objectContaining({ type: 'reasoning.decision.recorded' }),
      ],
    });
    await expect(runManager.projectAudit('run_reasoning_harness')).resolves.toMatchObject({
      reasoningDecisionCount: 1,
    });
    await expect(runManager.projectRegression('run_reasoning_harness')).resolves.toMatchObject({
      reasoningDecisionCount: 1,
    });
  });

  it('records skill activation events before ReAct execution when skills are enabled', async () => {
    let capturedRequest: InferenceRequest | undefined;
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.context',
      version: '0.0.0',
      description: 'Context procedure',
      activationPolicy: { mode: 'keyword', patterns: ['never-match'] },
      instructions: 'Use this skill to add concise procedural context.',
      allowedTools: ['tool.mock'],
      trustLevel: 'reviewed',
    });
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        capturedRequest = request;
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: 'skill output',
        };
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      runManager,
      skillRegistry: registry,
      allowedSkills: ['skill.context'],
      requiredSkills: ['skill.context'],
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_skill_harness',
      stepId: 'react',
      sessionId: 'session_skill_harness',
      userId: 'owner',
      agent: {
        id: 'agent.skill',
        version: '0.0.0',
        name: 'Skill Agent',
        modelAlias: 'default-chat',
        skillRefs: [{ id: 'skill.context' }],
        toolRefs: ['tool.mock'],
      },
      input: 'activate skill',
    });

    expect(result.react.status).toBe('completed');
    expect(capturedRequest?.input).toMatchObject({
      context: {
        activeSkills: [
          expect.objectContaining({
            id: 'skill.context',
            allowedTools: ['tool.mock'],
            activation: expect.objectContaining({
              reason: 'Skill is required by the current scope.',
            }),
          }),
        ],
      },
    });
    expect(result.events.map((event) => event.type)).toEqual(
      expect.arrayContaining(['skill.selected', 'skill.loaded', 'skill.completed'])
    );
    await expect(runManager.projectReplay('run_skill_harness')).resolves.toMatchObject({
      skillEventIds: expect.arrayContaining([
        expect.stringContaining('skill.selected'),
        expect.stringContaining('skill.completed'),
      ]),
      skillEvents: [
        expect.objectContaining({ type: 'skill.selected' }),
        expect.objectContaining({ type: 'skill.loaded' }),
        expect.objectContaining({ type: 'skill.completed' }),
      ],
    });
    await expect(runManager.projectAudit('run_skill_harness')).resolves.toMatchObject({
      skillActivationCount: 1,
    });
    await expect(runManager.projectRegression('run_skill_harness')).resolves.toMatchObject({
      skillActivationCount: 1,
    });
  });

  it('keeps skill-selected tool use behind GovernedToolRunner policy', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.external-tool',
      version: '0.0.0',
      description: 'Procedure that may use an external tool',
      activationPolicy: { mode: 'always' },
      instructions: 'Use tool.danger only if policy allows it.',
      allowedTools: ['tool.danger'],
      requiredTools: ['tool.danger'],
      trustLevel: 'reviewed',
    });
    const toolRegistry = new ToolRegistry();
    toolRegistry.register(
      {
        id: 'tool.danger',
        version: '0.0.0',
        description: 'External effect test tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'external_effect',
      },
      async () => ({ ok: true })
    );
    const toolTrace = new InMemoryTraceRecorder();
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        expect(request.input).toMatchObject({
          context: {
            activeSkills: [expect.objectContaining({ id: 'skill.external-tool' })],
          },
        });
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: {
            action: 'tool',
            toolId: 'tool.danger',
            input: { ok: true },
          },
        };
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      runManager,
      skillRegistry: registry,
      toolRunner: new GovernedToolRunner(toolRegistry, toolTrace),
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_skill_tool_policy',
      stepId: 'react',
      sessionId: 'session_skill_tool_policy',
      userId: 'owner',
      agent: {
        id: 'agent.skill-tool-policy',
        version: '0.0.0',
        name: 'Skill Tool Policy Agent',
        modelAlias: 'default-chat',
        skillRefs: [{ id: 'skill.external-tool' }],
        toolRefs: ['tool.danger'],
      },
      input: 'use dangerous tool',
    });

    expect(result.react).toMatchObject({
      status: 'completed',
      output: {
        toolId: 'tool.danger',
        status: 'denied',
        error: expect.objectContaining({
          code: 'TOOL_POLICY_DENIED',
          message: expect.stringContaining('requires an explicit policy override'),
        }),
      },
    });
    expect(result.events.map((event) => event.type)).toEqual(
      expect.arrayContaining(['skill.completed', 'react.step.completed'])
    );
    expect((await toolTrace.list()).map((event) => event.type)).toEqual(
      expect.arrayContaining(['tool.call.requested', 'tool.policy.checked', 'tool.call.rejected'])
    );
  });

  it('enforces the FSM-resolved tool execution scope before dispatch', async () => {
    let handlerCalls = 0;
    const toolRegistry = new ToolRegistry();
    toolRegistry.register(
      {
        id: 'tool.scoped',
        version: '0.0.0',
        description: 'Scope enforcement test tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'none',
      },
      async () => {
        handlerCalls += 1;
        return { ok: true };
      }
    );
    const toolTrace = new InMemoryTraceRecorder();
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request): Promise<InferenceResponse> {
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: {
            action: 'tool',
            toolId: 'tool.scoped',
            toolCallId: 'call_scoped_1',
            input: {},
          },
        };
      },
    };
    const runner = new HarnessedReActFSMRunner({
      inference,
      toolRunner: new GovernedToolRunner(toolRegistry, toolTrace),
      resolveToolExecutionScope: ({ fsmState }) => ({
        allowedToolIds: ['tool.other'],
        policyRefs: ['policy.scope'],
        fsmState,
      }),
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_scoped_tool',
      stepId: 'react',
      sessionId: 'session_scoped_tool',
      userId: 'owner',
      agent: {
        id: 'agent.scoped-tool',
        version: '0.0.0',
        name: 'Scoped Tool Agent',
        modelAlias: 'default-chat',
        toolRefs: ['tool.scoped'],
      },
      input: 'use scoped tool',
    });

    expect(handlerCalls).toBe(0);
    expect(result.react).toMatchObject({
      status: 'completed',
      output: {
        toolId: 'tool.scoped',
        invocationId: 'call_scoped_1',
        status: 'denied',
        error: { code: 'TOOL_NOT_ALLOWED_IN_SCOPE' },
      },
    });
    expect(await toolTrace.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.rejected',
          payload: expect.objectContaining({
            error: expect.objectContaining({ code: 'TOOL_NOT_ALLOWED_IN_SCOPE' }),
          }),
        }),
      ])
    );
  });

  it('fails closed when a tool action has no configured ToolRunner', async () => {
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request): Promise<InferenceResponse> {
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: { action: 'tool', toolId: 'tool.missing', input: {} },
        };
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      runManager,
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_missing_tool_runner',
      stepId: 'react',
      sessionId: 'session_missing_tool_runner',
      userId: 'owner',
      agent: {
        id: 'agent.missing-tool-runner',
        version: '0.0.0',
        name: 'Missing Tool Runner Agent',
        modelAlias: 'default-chat',
        toolRefs: ['tool.missing'],
      },
      input: 'use missing tool',
    });

    expect(result.react).toMatchObject({
      status: 'failed',
      error: expect.objectContaining({
        message: expect.stringContaining('cannot execute without toolRunner'),
      }),
    });
    expect(result.run.status).toBe('failed');
    expect(result.fsmSnapshot.currentState).toBe('Failed');
    await expect(runManager.projectRun('run_missing_tool_runner')).resolves.toMatchObject({
      status: 'failed',
    });
  });
  it('projects human-review runs from events instead of leaving them running', async () => {
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: {
            action: 'human_review',
            reason: 'approval required',
          },
        };
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      runManager,
      now: () => '2026-07-03T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_stage4_human',
      stepId: 'react',
      sessionId: 'session_stage4',
      userId: 'owner',
      agent: {
        id: 'agent.stage4',
        version: '0.0.0',
        name: 'Human Review Agent',
        modelAlias: 'default-chat',
      },
      input: 'needs approval',
    });

    expect(result.react.status).toBe('human_review_required');
    expect(result.fsmSnapshot.currentState).toBe('HumanReview');
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'run.waiting_human' }),
        expect.objectContaining({ type: 'human.review.requested' }),
        expect.objectContaining({ type: 'fsm.state.entered', fsmState: 'HumanReview' }),
      ])
    );
    await expect(runManager.projectRun('run_stage4_human')).resolves.toMatchObject({
      status: 'waiting_human',
    });

    await runManager.appendRunEvent({
      id: 'run_stage4_human:run.resumed:1',
      type: 'run.resumed',
      runId: 'run_stage4_human',
      sessionId: 'session_stage4',
      userId: 'owner',
      agentId: 'agent.stage4',
      timestamp: '2026-07-03T00:01:00.000Z',
      payload: {
        waitId: 'human-review:run_stage4_human',
        resolution: 'approved',
      },
    });
    await expect(runManager.projectRun('run_stage4_human')).resolves.toMatchObject({
      status: 'running',
    });
  });

  it('records human-review decisions, context compaction, and cancellation as events', async () => {
    const runManager = new RunManager();
    await runManager.createRun({
      id: 'run_operational_events',
      sessionId: 'session_operational_events',
      userId: 'owner',
      timestamp: '2026-07-03T00:00:00.000Z',
    });
    const context = {
      runId: 'run_operational_events',
      sessionId: 'session_operational_events',
      userId: 'owner',
      agentId: 'agent.operational',
    };

    await runManager.recordContextCompacted(context, {
      previousTokenCount: 2048,
      nextTokenCount: 512,
    });
    await runManager.recordHumanReviewApproved(context, { reviewerId: 'owner' });
    await runManager.recordHumanReviewRejected(context, { reviewerId: 'owner' });
    await runManager.cancelRun(context, 'operator stopped run');

    await expect(runManager.projectRun('run_operational_events')).resolves.toMatchObject({
      status: 'cancelled',
    });
    await expect(runManager.projectReplay('run_operational_events')).resolves.toMatchObject({
      events: expect.arrayContaining([
        expect.objectContaining({ type: 'context.compacted' }),
        expect.objectContaining({ type: 'human.review.approved' }),
        expect.objectContaining({ type: 'human.review.rejected' }),
        expect.objectContaining({ type: 'run.cancelled' }),
      ]),
    });
  });

  it('records failed FSM state and run.failed when context building throws', async () => {
    const inference: InferenceProvider = {
      id: 'mock-inference',
      async infer(): Promise<InferenceResponse> {
        throw new Error('inference should not run');
      },
    };
    const contextBuilder: ContextBuilder = {
      async build() {
        throw new Error('context failed');
      },
    };
    const runManager = new RunManager();
    const runner = new HarnessedReActFSMRunner({
      inference,
      contextBuilder,
      runManager,
      now: () => '2026-07-03T00:00:00.000Z',
    });

    const result = await runner.run({
      runId: 'run_stage4_failed',
      stepId: 'react',
      sessionId: 'session_stage4',
      userId: 'owner',
      agent: {
        id: 'agent.stage4',
        version: '0.0.0',
        name: 'Failing Agent',
        modelAlias: 'default-chat',
      },
      input: 'fail context',
    });

    expect(result.react.status).toBe('failed');
    expect(result.fsmSnapshot.currentState).toBe('Failed');
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'fsm.state.entered', fsmState: 'Failed' }),
        expect.objectContaining({ type: 'run.failed' }),
      ])
    );
    await expect(runManager.projectRun('run_stage4_failed')).resolves.toMatchObject({
      status: 'failed',
    });
  });
});
