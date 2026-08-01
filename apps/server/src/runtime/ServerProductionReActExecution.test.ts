import { InMemorySessionQueue, type ReActQuantumDescriptor } from '@hypha/core';
import { InMemoryExecutionArtifactStore } from '@hypha/adapters-local';
import type { InferenceProvider } from '@hypha/inference';
import {
  InMemoryReActContinuationCheckpointStore,
  ReActRunner,
  reActContinuationScopeHash,
  type ReActAgentRuntime,
  type ReActRunResult,
} from '@hypha/kernel';
import type { ToolRunner } from '@hypha/tools';
import type {
  CanonicalReActRunFacts,
  PreparedCanonicalReActExecution,
} from '../services/EventRuntime';
import { ServerProductionReActExecution } from './ServerProductionReActExecution';
import { createServerProductionSessionCommands } from './ServerProductionSessionCommands';

describe('Server production ReAct execution', () => {
  it('runs bounded real ReAct quanta through the durable continuation command', async () => {
    const queue = new InMemorySessionQueue();
    const artifacts = new InMemoryExecutionArtifactStore();
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    let inferenceCall = 0;
    const syncMemory = jest.fn(async () => undefined);
    let runStatus: CanonicalReActRunFacts['status'] = 'running';
    const outcomes: ReActRunResult[] = [];
    const inference: InferenceProvider = {
      id: 'inference.production-react-test',
      infer: async () => {
        inferenceCall += 1;
        return {
          id: `response.${inferenceCall}`,
          output:
            inferenceCall < 3
              ? {
                  type: 'tool',
                  toolCallId: `call.${inferenceCall}`,
                  target: 'tool.echo',
                  input: `value:${inferenceCall}`,
                }
              : { type: 'finish', input: 'done' },
          usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2 },
        };
      },
    };
    const toolRunner: ToolRunner = {
      run: async (request) => ({
        toolId: request.toolId,
        invocationId: request.context.invocationId,
        status: 'completed',
        output: request.input,
      }),
    };
    const reactRuntime: ReActAgentRuntime = {
      reason: async (context) => ({
        runId: context.runId,
        stepId: context.stepId,
        modelAlias: context.agent.modelAlias,
        input: context.messages,
      }),
      selectAction: async (response) => response.output as never,
      verify: async (_context, observation) =>
        observation.source === 'tool'
          ? { type: 'model', reason: 'continue-after-tool' }
          : { type: 'finish', input: observation.value },
    };
    const prepared: PreparedCanonicalReActExecution = {
      context: {
        runId: 'run.placeholder',
        stepId: 'react',
        agent: {
          id: 'agent.production',
          version: '1.0.0',
          name: 'Production Agent',
          modelAlias: 'model.production',
        },
        messages: [{ role: 'user', content: 'complete two tool calls' }],
        memoryScope: { userId: 'user.1', sessionId: 'session.1' },
        toolPrincipal: {
          id: 'user.1',
          principalId: 'user.1',
          type: 'user',
          userId: 'user.1',
          permissionScopes: [],
        },
      },
      domainPackRef: { id: 'domain.production', version: '1.0.0' },
      workflowRef: { id: 'workflow.production', version: '1.0.0' },
      promptSnapshotRef: 'prompt.production',
      promptSnapshotHash: `sha256:${'1'.repeat(64)}`,
      capabilitySnapshotRef: 'capability.production',
      capabilitySnapshotHash: `sha256:${'2'.repeat(64)}`,
    };
    const facts = (descriptor: Readonly<ReActQuantumDescriptor>): CanonicalReActRunFacts => ({
      runId: descriptor.runId,
      sessionId: descriptor.sessionId,
      userId: descriptor.userId,
      status: runStatus,
      cancellationRevision: 0,
      agentRef: descriptor.agentRef,
      domainPackRef: descriptor.domainPackRef,
      workflowRef: descriptor.workflowRef,
    });
    const execution = new ServerProductionReActExecution({
      artifacts,
      checkpoints,
      inference,
      toolRunner,
      reactRuntime,
      scopedRunners: {
        create: (runtime, options) => new ReActRunner(runtime, options),
      },
      source: {
        prepare: async (_input, runId) => ({
          ...prepared,
          context: { ...prepared.context, runId },
        }),
        recordContextPrepared: async () => undefined,
        readRunFacts: async (descriptor) => facts(descriptor),
        recordStep: async () => undefined,
        recordCheckpoint: async () => undefined,
        recordResume: async () => undefined,
        syncMemory,
        recordOutcome: async (_runId, result) => {
          outcomes.push(structuredClone(result));
          if (result.status === 'completed') runStatus = 'completed';
        },
      },
      limits: {
        quantumIterations: 1,
        maxIterations: 4,
        maxModelCalls: 4,
        maxToolCalls: 4,
        maxTotalTokens: 100,
      },
    });
    const commands = await createServerProductionSessionCommands({
      queue,
      artifacts,
      workerId: 'worker.production-react',
      leaseMs: 30_000,
      pollIntervalMs: 10,
      errorBackoffMs: 10,
      renewalIntervalMs: 10_000,
      maxHandlerDurationMs: 60_000,
      shutdownDrainMs: 1_000,
      startRun: async (_input, runId) => ({ runId }),
      react: execution,
    });

    try {
      expect(commands.supportedCommandTypes()).toEqual(['start_run', 'continue_react']);
      const start = await commands.enqueueStartRun(
        {
          userId: 'user.1',
          sessionId: 'session.1',
          react: {
            messages: [{ role: 'user', content: 'complete two tool calls' }],
            agentSpec: prepared.context.agent,
            budget: { iterations: 4, modelCalls: 4, toolCalls: 4, totalTokens: 100 },
          },
        },
        'request.production-react'
      );
      await expect(commands.processNext()).resolves.toMatchObject({
        commandId: start.id,
        disposition: 'applied',
      });
      if (outcomes.at(-1)?.status === 'failed') {
        throw outcomes.at(-1)?.error;
      }
      expect(outcomes.at(-1)?.status).toBe('suspended');
      const resolvedScopeHash = reActContinuationScopeHash({
        ...prepared.context,
        runId: start.targetRunId!,
      });
      const suspendedCheckpoint = await checkpoints.get(
        start.targetRunId!,
        'react',
        resolvedScopeHash
      );
      expect(suspendedCheckpoint).not.toBeNull();
      await expect(
        execution.buildContinuationPayload(suspendedCheckpoint!, '2026-08-01T12:00:00.000Z')
      ).resolves.toMatchObject({
        runId: start.targetRunId,
        sessionId: 'session.1',
        userId: 'user.1',
        checkpointSequence: suspendedCheckpoint!.stepSequence,
        checkpointHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
        globalBudget: { iterations: 4, modelCalls: 4, toolCalls: 4, totalTokens: 100 },
        createdAt: '2026-08-01T12:00:00.000Z',
      });
      expect(
        (await commands.listSessionCommands({ userId: 'user.1', sessionId: 'session.1' })).map(
          (command) => command.commandType
        )
      ).toEqual(['start_run', 'continue_react']);

      await expect(commands.processNext()).resolves.toMatchObject({
        commandType: 'continue_react',
        disposition: 'applied',
      });
      expect(outcomes.at(-1)?.status).toBe('completed');
      expect(runStatus).toBe('completed');
      expect(inferenceCall).toBe(3);
      expect(syncMemory).toHaveBeenCalledTimes(3);
      await expect(
        checkpoints.get(start.targetRunId!, 'react', resolvedScopeHash)
      ).resolves.toBeNull();
    } finally {
      await commands.close();
    }
  });
});
