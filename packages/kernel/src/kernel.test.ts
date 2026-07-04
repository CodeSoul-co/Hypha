import { describe, expect, it } from 'vitest';
import { InMemoryStructuredStore, InMemoryVectorIndexProvider } from '@hypha/adapters-local';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import { HybridMemoryProvider, MemoryManager, type EmbeddingProvider } from '@hypha/memory';
import { MockToolRunner, type ToolRunner } from '@hypha/tools';
import {
  createEpisodicMemorySync,
  createReActStep,
  DefaultContextBuilder,
  kernelSpecJsonSchemas,
  MemoryContextBuilder,
  ReActAgentRunner,
  ReActRunner,
  reactAgentSpecDefinition,
  REACT_PHASE_ORDER,
  validateReActAgentSpec,
  type ReActAgentRuntime,
  type ReActAgentSpec,
} from './index';

describe('@hypha/kernel ReAct contracts', () => {
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
    const toolRunner: ToolRunner = {
      async run() {
        return { toolId: 'tool.search', status: 'completed', output: { result: 'hypha' } };
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
        return { type: 'tool', target: 'tool.search', input: { query: 'hypha' } };
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
    });

    expect(result.status).toBe('completed');
    expect(result.steps.map((step) => step.phase)).toEqual(
      expect.arrayContaining(['policy_check', 'act', 'observe_result', 'verify', 'memory_sync'])
    );
    expect(result.output).toEqual({ result: 'hypha' });
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
        return { type: 'tool', target: 'tool.search', input: { query: 'hypha' } };
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
      { id: 'episodic_denied', type: 'episodic' as const, value: 'episodic memory must not appear' },
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

    await expect(
      runner.run({
        runId: 'run_memory_sync',
        stepId: 'react',
        agent: reactAgentSpecDefinition.example,
        messages: [{ role: 'user', content: 'remember this' }],
        memoryScope: { userId: 'owner', sessionId: 'session_memory_sync' },
      })
    ).resolves.toMatchObject({ status: 'completed' });

    await expect(
      manager.read(
        { userId: 'owner', sessionId: 'session_memory_sync', runId: 'run_memory_sync' },
        { type: 'episodic' }
      )
    ).resolves.toEqual([
      expect.objectContaining({
        id: 'episodic:run_memory_sync:1',
        type: 'episodic',
        provenance: expect.objectContaining({ runId: 'run_memory_sync' }),
      }),
    ]);
  });

  it('exports Stage1 ReActAgentSpec schema and minimal example', () => {
    expect(validateReActAgentSpec(reactAgentSpecDefinition.example).id).toBe('agent.default');
    expect(kernelSpecJsonSchemas.ReActAgentSpec.required).toContain('modelAlias');
  });
});
