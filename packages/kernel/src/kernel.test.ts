import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import { InMemoryStructuredStore, InMemoryVectorIndexProvider } from '@hypha/adapters-local';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import { HybridMemoryProvider, MemoryManager, type EmbeddingProvider } from '@hypha/memory';
import { SkillRegistry } from '@hypha/skills';
import {
  MockToolRunner,
  type ToolCallRequest,
  type ToolCallResult,
  type ToolRunner,
} from '@hypha/tools';
import {
  BasicReActAgentRuntime,
  createEpisodicMemorySync,
  createReActStep,
  DefaultContextBuilder,
  InMemoryReActContinuationCheckpointStore,
  kernelSpecJsonSchemas,
  MemoryContextBuilder,
  ReasoningContextBuilder,
  ReActAgentRunner,
  reActContinuationCheckpointJsonSchema,
  reActContinuationScopeHash,
  reActExecutionBudgetJsonSchema,
  ReActRunner,
  reactAgentSpecDefinition,
  REACT_PHASE_ORDER,
  SkillContextBuilder,
  ToolRunnerActivityAdapter,
  validateReActAgentSpec,
  validateReActContinuationCheckpoint,
  validateReActExecutionBudget,
  validateReasoningConfig,
  type ReActContinuationCheckpoint,
  type ReActAgentRuntime,
  type ReActAgentSpec,
} from './index';

describe('@hypha/kernel ReAct contracts', () => {
  it('binds Runtime ToolActivity requests to the governed ToolRunner port', async () => {
    const runner = new MockToolRunner();
    runner.registerResult('tool.activity', {
      toolId: 'tool.activity',
      status: 'completed',
      output: { ok: true },
      artifactRefs: ['artifact:activity'],
    });
    const activity = new ToolRunnerActivityAdapter(runner);
    await expect(
      activity.execute({
        operationId: 'operation-1',
        invocationId: 'invocation-1',
        runId: 'run-activity',
        stateAttemptId: 'state-attempt-1',
        toolRef: { id: 'tool.activity', version: '1.0.0' },
        input: {},
        principal: { id: 'agent-1', type: 'agent', permissionScopes: ['activity.read'] },
      })
    ).resolves.toMatchObject({
      invocationId: 'invocation-1',
      status: 'completed',
      artifactRefs: ['artifact:activity'],
    });
  });

  it('preserves reconciliation conflicts for Runtime recovery decisions', async () => {
    const activity = new ToolRunnerActivityAdapter({
      async run(request) {
        return {
          toolId: request.toolId,
          invocationId: request.context.invocationId,
          status: 'conflict',
          error: {
            code: 'TOOL_CONCURRENCY_CONFLICT',
            message: 'External commit state is unknown.',
            retryable: false,
            phase: 'execution',
          },
        };
      },
    });

    await expect(
      activity.execute({
        operationId: 'operation-conflict',
        invocationId: 'invocation-conflict',
        runId: 'run-conflict',
        stateAttemptId: 'state-attempt-conflict',
        toolRef: { id: 'tool.external', version: '1.0.0' },
        input: {},
        principal: { id: 'agent-1', type: 'agent', permissionScopes: ['external.write'] },
      })
    ).resolves.toMatchObject({
      invocationId: 'invocation-conflict',
      status: 'conflict',
      error: { code: 'TOOL_CONCURRENCY_CONFLICT' },
    });
  });
  it('keeps skills attached to agents and exposes explicit ReAct phases', () => {
    const agent: ReActAgentSpec = {
      id: 'agent',
      version: '0.0.0',
      name: 'Agent',
      modelAlias: 'default-reasoning',
      skillRefs: [{ id: 'review' }],
    };

    expect(agent.skillRefs?.[0]).toEqual({ id: 'review' });
    expect(REACT_PHASE_ORDER).toContain('policy_check');
    expect(createReActStep('step_1', 'reason')).toMatchObject({ phase: 'reason' });
  });

  it('passes agent system instructions into inference requests', async () => {
    const runtime = new BasicReActAgentRuntime();
    const request = await runtime.reason({
      runId: 'run_prompt',
      stepId: 'reason',
      agent: {
        id: 'agent.prompt',
        version: '0.0.0',
        name: 'Prompted Agent',
        modelAlias: 'default-reasoning',
        systemInstructions: 'Use the configured agent instructions.',
      },
      messages: [{ role: 'user', content: 'hello' }],
    });

    expect(request.input).toMatchObject({
      instructions: 'Use the configured agent instructions.',
      messages: [{ role: 'user', content: 'hello' }],
    });
  });

  it('runs an executable ReAct loop through model inference to completion', async () => {
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        return { id: `${request.runId}:${request.stepId}:response`, output: 'final answer' };
      },
    };
    const runtime: ReActAgentRuntime = {
      async reason(context) {
        return {
          runId: context.runId,
          stepId: context.stepId,
          modelAlias: context.agent.modelAlias,
          input: context.messages,
        };
      },
      async selectAction(response) {
        return { type: 'finish', input: response.output };
      },
      async verify() {
        return { type: 'finish' };
      },
    };
    const runner = new ReActRunner(runtime, { inference: provider });

    const result = await runner.run({
      runId: 'run_1',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user', content: 'hello' }],
    });

    expect(result).toMatchObject({
      status: 'completed',
      output: 'final answer',
    });
    expect(result.steps.map((step) => step.phase)).toEqual([
      'observe',
      'reason',
      'select_action',
      'verify',
      'memory_sync',
      'complete',
    ]);
  });

  it('executes a tool action and verifies the observation', async () => {
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(): Promise<InferenceResponse> {
        return { id: 'response_1', output: 'need tool' };
      },
    };
    let capturedRequest: ToolCallRequest | undefined;
    const toolRunner: ToolRunner = {
      async run(request) {
        capturedRequest = request;
        return {
          toolId: 'tool.search',
          invocationId: request.context.invocationId,
          status: 'completed',
          output: { result: 'hypha' },
        };
      },
    };
    const runtime: ReActAgentRuntime = {
      async reason(context) {
        return {
          runId: context.runId,
          stepId: context.stepId,
          modelAlias: context.agent.modelAlias,
          input: context.messages,
        };
      },
      async selectAction() {
        return {
          type: 'tool',
          target: 'tool.search',
          toolCallId: 'call_search_1',
          input: { query: 'hypha' },
        };
      },
      async verify(_context, observation) {
        return { type: 'finish', input: observation.value };
      },
    };
    const runner = new ReActRunner(runtime, { inference: provider, toolRunner });

    const result = await runner.run({
      runId: 'run_2',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user', content: 'search' }],
      memoryScope: { userId: 'owner', sessionId: 'session_1' },
      toolExecutionScope: {
        allowedToolIds: ['tool.search'],
        policyRefs: ['policy.search'],
        fsmState: 'Acting',
      },
      toolPrincipal: {
        id: 'owner',
        type: 'user',
        permissionScopes: ['search:read'],
      },
    });

    expect(result.status).toBe('completed');
    expect(capturedRequest).toMatchObject({
      toolId: 'tool.search',
      context: {
        invocationId: 'run_2:react:tool:tool.search:1',
        userId: 'owner',
        sessionId: 'session_1',
        agentId: reactAgentSpecDefinition.example.id,
        fsmState: 'Acting',
        executionScope: {
          allowedToolIds: ['tool.search'],
          policyRefs: ['policy.search'],
          fsmState: 'Acting',
        },
        principal: {
          id: 'owner',
          type: 'user',
          permissionScopes: ['search:read'],
        },
      },
    });
    expect(result.steps.map((step) => step.phase)).toEqual(
      expect.arrayContaining(['policy_check', 'act', 'observe_result', 'verify', 'memory_sync'])
    );
    expect(result.output).toEqual({ result: 'hypha' });
  });

  it('feeds tool observations back into a new model turn when multi-turn ReAct is enabled', async () => {
    const inferenceInputs: unknown[] = [];
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(request): Promise<InferenceResponse> {
        inferenceInputs.push(request.input);
        return inferenceInputs.length === 1
          ? {
              id: 'response_tool',
              output: { action: 'tool', toolId: 'tool.search', input: { query: 'hypha' } },
            }
          : { id: 'response_final', output: { action: 'finish', output: 'grounded answer' } };
      },
    };
    const toolRunner: ToolRunner = {
      async run() {
        return { toolId: 'tool.search', status: 'completed', output: { result: 'evidence' } };
      },
    };
    const runtime = new BasicReActAgentRuntime({
      verifier: {
        async verify(_context, observation) {
          return observation.source === 'tool'
            ? { type: 'model', reason: 'continue-after-observation' }
            : { type: 'finish', input: observation.value };
        },
      },
    });
    const context = {
      runId: 'run_multiturn',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user' as const, content: 'search and answer' }],
    };
    const runner = new ReActRunner(runtime, {
      inference: provider,
      toolRunner,
      continueAfterTool: true,
      maxIterations: 3,
    });

    await expect(runner.run(context)).resolves.toMatchObject({
      status: 'completed',
      output: 'grounded answer',
    });
    expect(inferenceInputs).toHaveLength(2);
    expect(context.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: 'assistant',
          content: expect.stringContaining('tool_call'),
        }),
        expect.objectContaining({ role: 'tool', content: '{"result":"evidence"}' }),
      ])
    );
  });

  it('continues multiple Tool calls across serialized worker checkpoints without duplicate ids', async () => {
    const inferenceInputs: unknown[] = [];
    const invocationIds: string[] = [];
    const checkpoints: ReActContinuationCheckpoint[] = [];
    const provider: InferenceProvider = {
      id: 'long-horizon-provider',
      async infer(request): Promise<InferenceResponse> {
        inferenceInputs.push(request.input);
        const messages =
          request.input &&
          typeof request.input === 'object' &&
          Array.isArray((request.input as { messages?: unknown }).messages)
            ? (request.input as { messages: unknown[] }).messages
            : [];
        const observedTools = messages.filter(
          (message) =>
            Boolean(message) &&
            typeof message === 'object' &&
            (message as { role?: unknown }).role === 'tool'
        ).length;
        return observedTools < 3
          ? {
              id: `response-tool-${observedTools + 1}`,
              output: {
                action: 'tool',
                toolId: 'tool.long-work',
                toolCallId: 'model-reused-call-id',
                input: { part: observedTools + 1 },
              },
              usage: { totalTokens: 10 },
            }
          : {
              id: 'response-final',
              output: { action: 'finish', output: 'all parts completed' },
              usage: { totalTokens: 5 },
            };
      },
    };
    const toolRunner: ToolRunner = {
      async run(request) {
        invocationIds.push(request.context.invocationId ?? '');
        return {
          toolId: request.toolId,
          invocationId: request.context.invocationId,
          status: 'completed',
          output: { completed: request.input },
        };
      },
    };
    const runtime = new BasicReActAgentRuntime({
      verifier: {
        async verify(_context, observation) {
          return observation.source === 'tool'
            ? { type: 'model', reason: 'continue-long-work' }
            : { type: 'finish', input: observation.value };
        },
      },
    });
    const executionBudget = {
      maxIterations: 6,
      maxModelCalls: 7,
      maxToolCalls: 6,
      maxTotalTokens: 100,
      maxConsecutiveNoProgress: 3,
      quantumIterations: 1,
    };
    const checkpointStore = new InMemoryReActContinuationCheckpointStore();
    const context = () => ({
      runId: 'run_long_horizon',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user' as const, content: 'complete three parts' }],
    });
    const createRunner = () =>
      new ReActRunner(runtime, {
        inference: provider,
        toolRunner,
        continueAfterTool: true,
        executionBudget,
        checkpointStore,
        now: () => '2026-07-23T10:00:00.000Z',
        onCheckpoint: (checkpoint) => {
          checkpoints.push(checkpoint);
        },
      });

    const first = await createRunner().run(context());
    expect(first.error).toBeUndefined();
    expect(first).toMatchObject({
      status: 'suspended',
      suspension: { reason: 'quantum_exhausted', requiresHumanReview: false },
      checkpoint: {
        nextPhase: 'act',
        iterations: 1,
        modelCalls: 2,
        toolCalls: 1,
        totalTokens: 20,
        pendingAction: { type: 'tool', target: 'tool.long-work', input: { part: 2 } },
      },
    });

    const second = await createRunner().run(context(), { resumeFromCheckpointStore: true });
    expect(second).toMatchObject({
      status: 'suspended',
      suspension: { reason: 'quantum_exhausted' },
      checkpoint: {
        nextPhase: 'act',
        iterations: 2,
        modelCalls: 3,
        toolCalls: 2,
        pendingAction: { input: { part: 3 } },
      },
    });

    const third = await createRunner().run(context(), { resumeFromCheckpointStore: true });
    expect(third).toMatchObject({
      status: 'completed',
      output: 'all parts completed',
    });
    expect(invocationIds).toEqual([
      'run_long_horizon:react:tool:tool.long-work:1',
      'run_long_horizon:react:tool:tool.long-work:2',
      'run_long_horizon:react:tool:tool.long-work:3',
    ]);
    expect(new Set(invocationIds).size).toBe(3);
    expect(inferenceInputs).toHaveLength(4);
    expect(checkpoints.at(-1)).toMatchObject({
      iterations: 3,
      toolCalls: 3,
      nextPhase: 'reason',
    });
    await expect(
      checkpointStore.get('run_long_horizon', 'react', reActContinuationScopeHash(context()))
    ).resolves.toBeNull();
  });

  it('reuses the prepared Tool invocation after a worker crash without repeating the side effect', async () => {
    const checkpointStore = new InMemoryReActContinuationCheckpointStore();
    const durableReceipts = new Map<string, ToolCallResult>();
    let toolAttempts = 0;
    let sideEffects = 0;
    let failWorkerAfterTool = true;
    const context = () => ({
      runId: 'run_crash_safe_tool',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user' as const, content: 'perform one durable operation' }],
    });
    const provider: InferenceProvider = {
      id: 'crash-safe-provider',
      async infer(request) {
        const messages =
          request.input &&
          typeof request.input === 'object' &&
          Array.isArray((request.input as { messages?: unknown }).messages)
            ? (request.input as { messages: unknown[] }).messages
            : [];
        return messages.some(
          (message) =>
            Boolean(message) &&
            typeof message === 'object' &&
            (message as { role?: unknown }).role === 'tool'
        )
          ? { id: 'finish-after-recovery', output: { action: 'finish', output: 'done' } }
          : {
              id: 'prepare-side-effect',
              output: {
                action: 'tool',
                toolId: 'tool.side-effect',
                input: { operation: 'write-once' },
              },
            };
      },
    };
    const toolRunner: ToolRunner = {
      async run(request) {
        toolAttempts += 1;
        const invocationId = request.context.invocationId;
        if (!invocationId) throw new Error('Expected prepared Tool invocation id.');
        const prior = durableReceipts.get(invocationId);
        if (prior) return structuredClone(prior);
        sideEffects += 1;
        const result: ToolCallResult = {
          toolId: request.toolId,
          invocationId,
          status: 'completed',
          output: { writeCount: sideEffects },
        };
        durableReceipts.set(invocationId, result);
        return structuredClone(result);
      },
    };
    const runtime = new BasicReActAgentRuntime({
      verifier: {
        async verify(_context, observation) {
          return observation.source === 'tool'
            ? { type: 'model', reason: 'continue-after-write' }
            : { type: 'finish', input: observation.value };
        },
      },
    });
    const createRunner = () =>
      new ReActRunner(runtime, {
        inference: provider,
        toolRunner,
        checkpointStore,
        continueAfterTool: true,
        executionBudget: {
          maxIterations: 3,
          maxModelCalls: 4,
          maxToolCalls: 3,
          maxConsecutiveNoProgress: 2,
          quantumIterations: 3,
        },
        now: () => '2026-07-23T10:00:00.000Z',
        onStep(step) {
          if (failWorkerAfterTool && step.phase === 'act') {
            failWorkerAfterTool = false;
            throw new Error('simulated worker crash after Tool receipt');
          }
        },
      });

    await expect(createRunner().run(context())).resolves.toMatchObject({
      status: 'failed',
      error: expect.objectContaining({
        message: 'simulated worker crash after Tool receipt',
      }),
    });
    const prepared = await checkpointStore.get(
      'run_crash_safe_tool',
      'react',
      reActContinuationScopeHash(context())
    );
    expect(prepared).toMatchObject({
      nextPhase: 'act',
      toolCalls: 0,
      toolInvocationSequence: 1,
      pendingToolInvocationId: 'run_crash_safe_tool:react:tool:tool.side-effect:1',
      pendingAction: { type: 'tool', target: 'tool.side-effect' },
    });

    await expect(
      createRunner().run(context(), { resumeFromCheckpointStore: true })
    ).resolves.toMatchObject({
      status: 'completed',
      output: 'done',
    });
    expect(toolAttempts).toBe(2);
    expect(sideEffects).toBe(1);
    expect([...durableReceipts]).toHaveLength(1);
  });

  it('resumes a prepared Tool decision without repeating the completed Model call', async () => {
    const checkpointStore = new InMemoryReActContinuationCheckpointStore();
    let modelCalls = 0;
    let toolCalls = 0;
    let failAfterPreparingAction = true;
    const context = () => ({
      runId: 'run_crash_after_model',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user' as const, content: 'prepare and execute' }],
    });
    const runner = () =>
      new ReActRunner(
        new BasicReActAgentRuntime({
          verifier: {
            async verify(_context, observation) {
              return observation.source === 'tool'
                ? { type: 'model', reason: 'continue-after-prepared-tool' }
                : { type: 'finish', input: observation.value };
            },
          },
        }),
        {
          inference: {
            id: 'model-receipt-provider',
            async infer(request) {
              modelCalls += 1;
              const messages = (request.input as { messages?: Array<{ role?: string }> }).messages;
              return messages?.some((message) => message.role === 'tool')
                ? { id: 'model-final', output: { action: 'finish', output: 'complete' } }
                : {
                    id: 'model-tool',
                    output: {
                      action: 'tool',
                      toolId: 'tool.prepared',
                      toolCallId: 'untrusted-model-call-id',
                      input: { part: 1 },
                    },
                  };
            },
          },
          toolRunner: {
            async run(request) {
              toolCalls += 1;
              return {
                toolId: request.toolId,
                invocationId: request.context.invocationId,
                status: 'completed',
                output: { ok: true },
              };
            },
          },
          checkpointStore,
          continueAfterTool: true,
          onCheckpoint(checkpoint) {
            if (failAfterPreparingAction && checkpoint.nextPhase === 'act') {
              failAfterPreparingAction = false;
              throw new Error('simulated crash after durable Model decision');
            }
          },
        }
      );

    await expect(runner().run(context())).resolves.toMatchObject({
      status: 'failed',
      error: expect.objectContaining({
        message: 'simulated crash after durable Model decision',
      }),
    });
    expect(modelCalls).toBe(1);
    expect(toolCalls).toBe(0);

    await expect(
      runner().run(context(), { resumeFromCheckpointStore: true })
    ).resolves.toMatchObject({
      status: 'completed',
      output: 'complete',
    });
    expect(modelCalls).toBe(2);
    expect(toolCalls).toBe(1);
  });

  it('suspends repeated Action/Observation fingerprints instead of looping forever', async () => {
    let toolCalls = 0;
    const runner = new ReActRunner(
      new BasicReActAgentRuntime({
        verifier: {
          async verify() {
            return { type: 'model', reason: 'try-again' };
          },
        },
      }),
      {
        inference: {
          id: 'non-progress-provider',
          async infer() {
            return {
              id: 'same-response',
              output: { action: 'tool', toolId: 'tool.same', input: { query: 'same' } },
            };
          },
        },
        toolRunner: {
          async run() {
            toolCalls += 1;
            return { toolId: 'tool.same', status: 'completed', output: { result: 'same' } };
          },
        },
        continueAfterTool: true,
        executionBudget: {
          maxIterations: 20,
          maxModelCalls: 21,
          maxToolCalls: 20,
          maxConsecutiveNoProgress: 2,
          quantumIterations: 20,
        },
        now: () => '2026-07-23T10:00:00.000Z',
      }
    );

    await expect(
      runner.run({
        runId: 'run_non_progress',
        stepId: 'react',
        agent: reactAgentSpecDefinition.example,
        messages: [{ role: 'user', content: 'do not loop' }],
      })
    ).resolves.toMatchObject({
      status: 'suspended',
      suspension: {
        reason: 'non_progress',
        retryable: false,
        requiresHumanReview: true,
      },
      checkpoint: {
        iterations: 3,
        toolCalls: 3,
        consecutiveNoProgress: 2,
      },
    });
    expect(toolCalls).toBe(3);
  });

  it('validates long-horizon budgets and checkpoints across Zod and JSON Schema', async () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const budget = validateReActExecutionBudget({
      maxIterations: 12,
      maxModelCalls: 13,
      maxToolCalls: 12,
      maxTotalTokens: 20_000,
      maxConsecutiveNoProgress: 3,
      quantumIterations: 2,
      deadlineAt: '2026-07-24T00:00:00.000Z',
    });
    const checkpoint = validateReActContinuationCheckpoint({
      version: '1.0.0',
      runId: 'run.contract',
      stepId: 'react',
      scopeHash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      agentRef: { id: 'agent.default', version: '0.0.0' },
      nextPhase: 'reason',
      messages: [{ role: 'user', content: 'continue' }],
      iterations: 2,
      modelCalls: 3,
      toolCalls: 2,
      totalTokens: 100,
      toolInvocationSequence: 2,
      stepSequence: 17,
      consecutiveNoProgress: 0,
      createdAt: '2026-07-23T10:00:00.000Z',
      updatedAt: '2026-07-23T10:01:00.000Z',
    });

    expect(ajv.validate(reActExecutionBudgetJsonSchema, budget)).toBe(true);
    expect(ajv.validate(reActContinuationCheckpointJsonSchema, checkpoint)).toBe(true);
    expect(validateReActExecutionBudget({ ...budget, quantumIterations: 13 })).toMatchObject({
      maxIterations: 12,
      quantumIterations: 13,
    });
    expect(() =>
      validateReActContinuationCheckpoint({
        ...checkpoint,
        nextPhase: 'act',
        pendingAction: undefined,
      })
    ).toThrow();
    expect(() =>
      validateReActContinuationCheckpoint({ ...checkpoint, untrustedField: true })
    ).toThrow();
    const boundedStore = new InMemoryReActContinuationCheckpointStore({
      maxCheckpointBytes: 128,
    });
    await expect(boundedStore.put(checkpoint, 'checkpoint:oversized')).rejects.toMatchObject({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
    });
  });

  it('cancels before the next Provider call', async () => {
    const controller = new AbortController();
    controller.abort();
    let modelCalls = 0;
    const runner = new ReActRunner(new BasicReActAgentRuntime(), {
      inference: {
        id: 'must-not-run',
        async infer() {
          modelCalls += 1;
          return { id: 'unexpected', output: 'unexpected' };
        },
      },
    });

    await expect(
      runner.run(
        {
          runId: 'run_cancelled',
          stepId: 'react',
          agent: reactAgentSpecDefinition.example,
          messages: [{ role: 'user', content: 'cancel' }],
        },
        { abortSignal: controller.signal }
      )
    ).resolves.toMatchObject({ status: 'cancelled' });
    expect(modelCalls).toBe(0);
  });

  it('stops the ReAct loop when a tool action requires human review', async () => {
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(): Promise<InferenceResponse> {
        return { id: 'response_2', output: 'needs approval' };
      },
    };
    const toolRunner: ToolRunner = {
      async run() {
        return {
          toolId: 'tool.search',
          status: 'human_review_required',
          error: 'approval required',
        };
      },
    };
    const runtime: ReActAgentRuntime = {
      async reason(context) {
        return {
          runId: context.runId,
          stepId: context.stepId,
          modelAlias: context.agent.modelAlias,
          input: context.messages,
        };
      },
      async selectAction() {
        return {
          type: 'tool',
          target: 'tool.search',
          toolCallId: 'call_search_1',
          input: { query: 'hypha' },
        };
      },
      async verify() {
        throw new Error('verify must not run after tool human review');
      },
    };
    const runner = new ReActRunner(runtime, { inference: provider, toolRunner });

    const result = await runner.run({
      runId: 'run_3',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user', content: 'search' }],
      memoryScope: { userId: 'owner', sessionId: 'session_1' },
    });

    expect(result).toMatchObject({
      status: 'human_review_required',
      finalAction: {
        type: 'human_review',
        target: 'tool.search',
      },
    });
    expect(result.steps.map((step) => step.phase)).toEqual(
      expect.arrayContaining(['policy_check', 'act', 'observe_result', 'human_review'])
    );
    expect(result.steps.map((step) => step.phase)).not.toContain('verify');
  });

  it('runs the default ReActAgentRunner with context builder, verifier, and mock tool runner', async () => {
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(request: InferenceRequest): Promise<InferenceResponse> {
        return {
          id: `${request.runId}:${request.stepId}:response`,
          output: {
            action: 'tool',
            toolId: 'tool.mock',
            input: { value: 'from-model' },
          },
        };
      },
    };
    const toolRunner = new MockToolRunner();
    toolRunner.registerResult('tool.mock', {
      toolId: 'tool.mock',
      status: 'completed',
      output: { value: 'from-tool' },
    });
    const runner = new ReActAgentRunner({
      inference: provider,
      toolRunner,
      contextBuilder: new DefaultContextBuilder(),
    });

    const result = await runner.run({
      runId: 'run_agent_runner',
      stepId: 'react',
      sessionId: 'session_agent_runner',
      userId: 'owner',
      agent: reactAgentSpecDefinition.example,
      input: 'use the mock tool',
    });

    expect(result).toMatchObject({
      status: 'completed',
      output: { value: 'from-tool' },
    });
    expect(result.steps.map((step) => step.phase)).toEqual([
      'observe',
      'reason',
      'select_action',
      'policy_check',
      'act',
      'observe_result',
      'verify',
      'memory_sync',
      'complete',
    ]);
  });

  it('loads active skill context only after selection and workflow-state allow rules', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.review',
      version: '0.0.0',
      name: 'Review Skill',
      description: 'Review task outputs',
      activationPolicy: { mode: 'keyword', patterns: ['review'] },
      instructions: 'Check correctness and cite concrete evidence.',
      allowedTools: ['tool.search'],
      trustLevel: 'reviewed',
    });
    registry.register({
      id: 'skill.blocked',
      version: '0.0.0',
      description: 'Blocked skill',
      activationPolicy: { mode: 'always' },
      instructions: 'Should not load.',
      trustLevel: 'reviewed',
    });

    const builder = new SkillContextBuilder({
      baseBuilder: new DefaultContextBuilder(),
      registry,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const context = await builder.build({
      runId: 'run_skill_context',
      stepId: 'react',
      sessionId: 'session_skill_context',
      userId: 'owner',
      agent: {
        ...reactAgentSpecDefinition.example,
        skillRefs: [{ id: 'skill.review' }, { id: 'skill.blocked' }],
        toolRefs: ['tool.search'],
      },
      input: 'please review this answer',
      metadata: {
        workflowState: {
          allowedSkills: ['skill.review'],
        },
      },
    });

    expect(context.activeSkills).toEqual([
      expect.objectContaining({
        id: 'skill.review',
        instructions: 'Check correctness and cite concrete evidence.',
        allowedTools: ['tool.search'],
      }),
    ]);
    expect(context.rejectedSkills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          skillId: 'skill.blocked',
          reason: 'Skill is not allowed by the current scope.',
        }),
      ])
    );
    expect(context.messages[0]).toMatchObject({
      role: 'system',
      content: expect.stringContaining('[skill:skill.review version=0.0.0]'),
    });
    expect(context.contextProvenance).toEqual(
      expect.arrayContaining([expect.objectContaining({ source: 'skill', id: 'skill.review' })])
    );
  });

  it('passes active skills into the model request context', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.context',
      version: '0.0.0',
      description: 'Context procedure',
      activationPolicy: { mode: 'always' },
      instructions: 'Add concise context before answering.',
      trustLevel: 'reviewed',
    });
    let capturedRequest: InferenceRequest | undefined;
    const runner = new ReActAgentRunner({
      skillRegistry: registry,
      inference: {
        id: 'capture-inference',
        async infer(request) {
          capturedRequest = request;
          return { id: 'skill-response', output: 'ok' };
        },
      },
    });

    await runner.run({
      runId: 'run_skill_agent',
      stepId: 'react',
      sessionId: 'session_skill_agent',
      userId: 'owner',
      agent: {
        ...reactAgentSpecDefinition.example,
        skillRefs: [{ id: 'skill.context' }],
      },
      input: 'answer with context',
    });

    expect(capturedRequest?.input).toMatchObject({
      context: {
        activeSkills: [
          expect.objectContaining({
            id: 'skill.context',
            instructions: 'Add concise context before answering.',
          }),
        ],
      },
    });
  });

  it('loads workflow-state required skills even without activation keyword matches', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.required',
      version: '0.0.0',
      description: 'Required workflow skill',
      activationPolicy: { mode: 'keyword', patterns: ['never-match'] },
      instructions: 'Must run for this workflow state.',
      trustLevel: 'reviewed',
    });

    const builder = new SkillContextBuilder({
      baseBuilder: new DefaultContextBuilder(),
      registry,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const context = await builder.build({
      runId: 'run_required_skill_context',
      stepId: 'react',
      sessionId: 'session_required_skill_context',
      userId: 'owner',
      agent: {
        ...reactAgentSpecDefinition.example,
        skillRefs: [{ id: 'skill.required' }],
      },
      input: 'plain request',
      metadata: {
        workflowState: {
          allowedSkills: ['skill.required'],
          requiredSkills: ['skill.required'],
        },
      },
    });

    expect(context.activeSkills).toEqual([
      expect.objectContaining({
        id: 'skill.required',
        activation: expect.objectContaining({
          reason: 'Skill is required by the current scope.',
        }),
      }),
    ]);
  });

  it('fails context build when required skills are missing or policy-denied', async () => {
    const registry = new SkillRegistry();
    registry.register({
      id: 'skill.denied',
      version: '0.0.0',
      description: 'Denied workflow skill',
      activationPolicy: { mode: 'always' },
      trustLevel: 'untrusted',
    });

    const builder = new SkillContextBuilder({
      baseBuilder: new DefaultContextBuilder(),
      registry,
      now: () => '2026-07-04T00:00:00.000Z',
    });

    await expect(
      builder.build({
        runId: 'run_missing_required_skill',
        stepId: 'react',
        sessionId: 'session_missing_required_skill',
        userId: 'owner',
        agent: {
          ...reactAgentSpecDefinition.example,
          skillRefs: [],
        },
        input: 'plain request',
        metadata: {
          workflowState: {
            requiredSkills: ['skill.required'],
          },
        },
      })
    ).rejects.toThrow(
      /Required skills failed to load: skill.required \(Required skill is not attached to the agent\.\)/
    );

    await expect(
      builder.build({
        runId: 'run_denied_required_skill',
        stepId: 'react',
        sessionId: 'session_denied_required_skill',
        userId: 'owner',
        agent: {
          ...reactAgentSpecDefinition.example,
          skillRefs: [{ id: 'skill.denied' }],
        },
        input: 'plain request',
        metadata: {
          workflowState: {
            requiredSkills: ['skill.denied'],
          },
        },
      })
    ).rejects.toThrow(/Required skills failed to load: skill.denied \(Skill skill.denied/);
  });

  it('builds structured thinking and agentic decisions before inference', async () => {
    const builder = new ReasoningContextBuilder({
      baseBuilder: new DefaultContextBuilder(),
      config: {
        thinkingMode: 'structured',
        agenticMode: 'fsm_react',
        maxSteps: 3,
        persist: 'summary_only',
      },
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const context = await builder.build({
      runId: 'run_reasoning_context',
      stepId: 'react',
      sessionId: 'session_reasoning',
      userId: 'owner',
      agent: {
        ...reactAgentSpecDefinition.example,
        toolRefs: ['tool.search'],
      },
      input: 'Plan a safe answer.',
    });

    expect(context.thinkingPlan).toMatchObject({
      mode: 'structured',
      intent: 'Plan a safe answer.',
      plan: expect.arrayContaining([
        expect.stringContaining('Interpret the task'),
        expect.stringContaining('Select the next ReAct phase'),
      ]),
    });
    expect(context.reasoningDecision).toMatchObject({
      mode: 'fsm_react',
      recommendedPhase: 'select_action',
      actionType: 'tool',
      toolCandidates: ['tool.search'],
    });
    expect(context.metadata?.reasoning).toMatchObject({
      config: expect.objectContaining({ persist: 'summary_only' }),
      thinkingPlan: expect.objectContaining({ id: 'run_reasoning_context:thinking:react' }),
      reasoningDecision: expect.objectContaining({ id: 'run_reasoning_context:reasoning:react' }),
    });
  });

  it('passes reasoning summaries into the model request context', async () => {
    let capturedRequest: InferenceRequest | undefined;
    const runner = new ReActAgentRunner({
      reasoningConfig: {
        thinkingMode: 'summary',
        agenticMode: 'critique',
        maxSteps: 2,
        persist: 'summary_only',
      },
      inference: {
        id: 'capture-inference',
        async infer(request) {
          capturedRequest = request;
          return { id: 'reasoning-response', output: 'ok' };
        },
      },
    });

    await runner.run({
      runId: 'run_reasoning_agent',
      stepId: 'react',
      sessionId: 'session_reasoning_agent',
      userId: 'owner',
      agent: reactAgentSpecDefinition.example,
      input: 'Use structured reasoning.',
    });

    expect(capturedRequest?.input).toMatchObject({
      context: {
        reasoningConfig: expect.objectContaining({
          thinkingMode: 'summary',
          agenticMode: 'critique',
        }),
        thinkingPlan: expect.objectContaining({ mode: 'summary' }),
        reasoningDecision: expect.objectContaining({ mode: 'critique' }),
      },
    });
  });

  it('builds model context from semantic memory with budget and provenance', async () => {
    const embeddings: EmbeddingProvider = {
      embed: async () => [[1, 0]],
    };
    const manager = new MemoryManager(
      new HybridMemoryProvider({
        structured: new InMemoryStructuredStore(),
        vector: new InMemoryVectorIndexProvider(),
        embeddings,
      })
    );
    await manager.write(
      { userId: 'owner', sessionId: 'session_memory', runId: 'run_seed' },
      {
        id: 'semantic_hypha',
        type: 'semantic',
        value: 'Hypha uses event-first runtime memory.',
        provenance: { eventId: 'event_seed' },
        createdAt: '2026-07-04T00:00:00.000Z',
      },
      { requireProvenance: true, allowLongTerm: true }
    );

    const builder = new MemoryContextBuilder({
      memory: manager,
      embeddings,
      budget: { maxMemoryItems: 1, maxMemoryChars: 200, maxTotalChars: 1000 },
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const context = await builder.build({
      runId: 'run_context',
      stepId: 'react',
      sessionId: 'session_memory',
      userId: 'owner',
      agent: reactAgentSpecDefinition.example,
      input: 'What does Hypha use for runtime memory?',
    });

    expect(context.messages[0]).toMatchObject({
      role: 'system',
      content: expect.stringContaining('Hypha uses event-first runtime memory.'),
    });
    expect(context.memoryContext).toEqual([
      expect.objectContaining({ id: 'semantic_hypha', type: 'semantic' }),
    ]);
    expect(context.contextProvenance).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: 'memory',
          id: 'semantic_hypha',
          provenance: { eventId: 'event_seed' },
        }),
      ])
    );
    expect(context.metadata).toMatchObject({
      memoryContextCount: 1,
      contextBudget: expect.objectContaining({ maxMemoryItems: 1 }),
    });

    let capturedRequest: InferenceRequest | undefined;
    const runner = new ReActAgentRunner({
      contextBuilder: builder,
      inference: {
        id: 'capture-inference',
        async infer(request) {
          capturedRequest = request;
          return { id: 'response_context', output: 'ok' };
        },
      },
    });
    await runner.run({
      runId: 'run_context_agent',
      stepId: 'react',
      sessionId: 'session_memory',
      userId: 'owner',
      agent: reactAgentSpecDefinition.example,
      input: 'What does Hypha use for runtime memory?',
    });

    expect(capturedRequest?.input).toMatchObject({
      messages: [
        expect.objectContaining({
          role: 'system',
          content: expect.stringContaining('Hypha uses event-first runtime memory.'),
        }),
        expect.objectContaining({ role: 'user' }),
      ],
    });
  });

  it('restricts memory context retrieval to configured memory types', async () => {
    const embeddings: EmbeddingProvider = {
      embed: async () => [[1, 0]],
    };
    const manager = new MemoryManager(
      new HybridMemoryProvider({
        structured: new InMemoryStructuredStore(),
        vector: new InMemoryVectorIndexProvider(),
        embeddings,
      })
    );
    const scope = { userId: 'owner', sessionId: 'session_memory_types' };

    for (const record of [
      { id: 'semantic_allowed', type: 'semantic' as const, value: 'semantic memory allowed' },
      { id: 'procedural_allowed', type: 'procedural' as const, value: 'procedural memory allowed' },
      {
        id: 'episodic_denied',
        type: 'episodic' as const,
        value: 'episodic memory must not appear',
      },
    ]) {
      await manager.write(
        scope,
        {
          ...record,
          provenance: { eventId: `event_${record.id}` },
          createdAt: '2026-07-04T00:00:00.000Z',
        },
        { requireProvenance: true, allowLongTerm: true }
      );
    }

    const builder = new MemoryContextBuilder({
      memory: manager,
      embeddings,
      memoryTypes: ['semantic', 'procedural'],
      budget: { maxMemoryItems: 3, maxMemoryChars: 400, maxTotalChars: 1000 },
      now: () => '2026-07-04T00:00:00.000Z',
    });

    const context = await builder.build({
      runId: 'run_context_types',
      stepId: 'react',
      sessionId: 'session_memory_types',
      userId: 'owner',
      agent: reactAgentSpecDefinition.example,
      input: 'Which memory is allowed?',
    });

    expect(context.memoryContext?.map((item) => item.id).sort()).toEqual([
      'procedural_allowed',
      'semantic_allowed',
    ]);
    expect(context.messages[0].content).toContain('semantic memory allowed');
    expect(context.messages[0].content).toContain('procedural memory allowed');
    expect(context.messages[0].content).not.toContain('episodic memory must not appear');
  });

  it('syncs ReAct observations into episodic memory through MemoryManager', async () => {
    const manager = new MemoryManager(
      new HybridMemoryProvider({
        structured: new InMemoryStructuredStore(),
        vector: new InMemoryVectorIndexProvider(),
        embeddings: { embed: async () => [[1, 0]] },
      })
    );
    const provider: InferenceProvider = {
      id: 'test-provider',
      async infer(): Promise<InferenceResponse> {
        return { id: 'response_memory_sync', output: 'episodic answer' };
      },
    };
    const runtime: ReActAgentRuntime = {
      async reason(context) {
        return {
          runId: context.runId,
          stepId: context.stepId,
          modelAlias: context.agent.modelAlias,
          input: context.messages,
        };
      },
      async selectAction(response) {
        return { type: 'finish', input: response.output };
      },
      async verify(_context, observation) {
        return { type: 'finish', input: observation.value };
      },
    };
    const runner = new ReActRunner(runtime, {
      inference: provider,
      syncMemory: createEpisodicMemorySync({
        memory: manager,
        now: () => '2026-07-04T00:00:00.000Z',
      }),
    });

    const memorySyncContext = () => ({
      runId: 'run_memory_sync',
      stepId: 'react',
      agent: reactAgentSpecDefinition.example,
      messages: [{ role: 'user' as const, content: 'remember this' }],
      memoryScope: { userId: 'owner', sessionId: 'session_memory_sync' },
    });
    await expect(runner.run(memorySyncContext())).resolves.toMatchObject({ status: 'completed' });
    await expect(runner.run(memorySyncContext())).resolves.toMatchObject({ status: 'completed' });

    await expect(
      manager.read(
        { userId: 'owner', sessionId: 'session_memory_sync', runId: 'run_memory_sync' },
        { type: 'episodic' }
      )
    ).resolves.toEqual([
      expect.objectContaining({
        id: expect.stringMatching(/^episodic:run_memory_sync:[a-f0-9]{64}$/u),
        type: 'episodic',
        provenance: expect.objectContaining({
          runId: 'run_memory_sync',
          memorySyncId: expect.stringMatching(/^[a-f0-9]{64}$/u),
        }),
      }),
    ]);
  });

  it('exports Stage1 ReActAgentSpec schema and minimal example', () => {
    expect(validateReActAgentSpec(reactAgentSpecDefinition.example).id).toBe('agent.default');
    expect(kernelSpecJsonSchemas.ReActAgentSpec.required).toContain('modelAlias');
    expect(
      validateReasoningConfig({ thinkingMode: 'structured', agenticMode: 'tot' })
    ).toMatchObject({
      thinkingMode: 'structured',
      agenticMode: 'tot',
    });
    expect(kernelSpecJsonSchemas.ReasoningConfig.properties).toMatchObject({
      thinkingMode: { enum: ['none', 'summary', 'structured'] },
      agenticMode: { enum: ['react', 'fsm_react', 'tot', 'critique'] },
    });
  });
});
