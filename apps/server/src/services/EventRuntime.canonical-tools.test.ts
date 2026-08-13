import fs from 'fs';
import os from 'os';
import path from 'path';
import { InMemoryEventStore } from '@codesoul-co/core';
import { destroyToolManager, getToolManager } from '../core/tools/ToolManager';
import type { ITool } from '../core/tools/types';
import { destroyEventRuntime, initializeEventRuntime } from './EventRuntime';

function canonicalTool(description: string, property: string): ITool {
  return {
    id: 'test.canonical-tool',
    name: 'test.canonical-tool',
    description,
    schema: {
      name: 'test.canonical-tool',
      description,
      inputSchema: {
        type: 'object',
        properties: { [property]: { type: 'string' } },
        additionalProperties: false,
      },
    },
    execute: async (params) => ({ success: true, output: params }),
  };
}

describe('EventRuntime canonical Tool reasoning', () => {
  afterEach(async () => {
    destroyEventRuntime();
    await destroyToolManager();
  });

  it('binds inference schemas and invocations to the immutable Run snapshot', async () => {
    const manager = getToolManager();
    await manager.register(canonicalTool('Original contract', 'value'));
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-canonical-tools-'));
    const runtime = initializeEventRuntime({
      events: new InMemoryEventStore(),
      eventDbPath: path.join(root, 'events.sqlite'),
    });
    const started = await runtime.startRun({
      userId: 'user.canonical-tools',
      sessionId: 'session.canonical-tools',
      react: {
        messages: [{ role: 'user', content: 'Use the configured tool.' }],
        agentSpec: {
          id: 'agent.canonical-tools',
          version: '1.0.0',
          name: 'Canonical Tool Agent',
          modelAlias: 'model.test',
          systemInstructions: 'Use only configured tools.',
          toolRefs: ['test.canonical-tool'],
        },
      },
    });
    const prepared = await runtime.prepareCanonicalReActExecution(
      {
        userId: 'user.canonical-tools',
        sessionId: 'session.canonical-tools',
        react: {
          messages: [{ role: 'user', content: 'Use the configured tool.' }],
          agentSpec: {
            id: 'agent.canonical-tools',
            version: '1.0.0',
            name: 'Canonical Tool Agent',
            modelAlias: 'model.test',
            systemInstructions: 'Use only configured tools.',
            toolRefs: ['test.canonical-tool'],
          },
        },
      },
      started.runId
    );
    expect(prepared).not.toBeNull();

    const adapters = runtime.canonicalExecutionAdapters();
    const first = await adapters.reactRuntime.reason(prepared!.context);
    expect(first.tools).toEqual([
      expect.objectContaining({
        id: 'test.canonical-tool',
        name: 'test.canonical-tool',
        description: 'Original contract',
        inputSchema: expect.objectContaining({
          properties: { value: { type: 'string' } },
        }),
      }),
    ]);

    await manager.unregister('test.canonical-tool');
    await manager.register(canonicalTool('Changed live contract', 'changed'));
    const replayed = await adapters.reactRuntime.reason(prepared!.context);
    expect(replayed.tools).toEqual(first.tools);

    await expect(
      adapters.reactRuntime.reason({
        ...prepared!.context,
        agent: { ...prepared!.context.agent, toolRefs: ['test.unknown'] },
      })
    ).rejects.toMatchObject({ code: 'TOOL_CAPABILITY_SCOPE_DENIED' });

    await expect(
      adapters.toolRunner.run({
        toolId: 'test.canonical-tool',
        input: { value: 'bounded' },
        context: {
          runId: started.runId,
          stepId: 'react:tool:1',
          userId: 'user.canonical-tools',
          sessionId: 'session.canonical-tools',
          agentId: 'agent.canonical-tools',
          principal: prepared!.context.toolPrincipal,
        },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { value: 'bounded' } });
  });
});
