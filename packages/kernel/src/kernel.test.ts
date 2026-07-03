import { describe, expect, it } from 'vitest';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import type { ToolRunner } from '@hypha/tools';
import {
  createReActStep,
  kernelSpecJsonSchemas,
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

  it('exports Stage1 ReActAgentSpec schema and minimal example', () => {
    expect(validateReActAgentSpec(reactAgentSpecDefinition.example).id).toBe('agent.default');
    expect(kernelSpecJsonSchemas.ReActAgentSpec.required).toContain('modelAlias');
  });
});
