import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '@hypha/core';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import type { ContextBuilder } from '@hypha/kernel';
import { MockToolRunner } from '@hypha/tools';
import { REACT_FSM_STATE_PATH } from '@hypha/fsm';
import {
  EventFirstRuntime,
  HarnessedReActFSMRunner,
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
        expect.objectContaining({ type: 'fsm.state.entered', fsmState: 'HumanReview' }),
      ])
    );
    await expect(runManager.projectRun('run_stage4_human')).resolves.toMatchObject({
      status: 'waiting_human',
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
