import { describe, expect, it } from 'vitest';
import {
  HttpToolAdapter,
  LocalFunctionToolAdapter,
  MCPToolAdapter,
  MockToolAdapter,
  PluginToolAdapter,
  type ToolAdapter,
  type ToolCallContext,
} from './index';

const context: ToolCallContext = {
  runId: 'run-adapter-contract',
  stepId: 'adapter-contract',
  invocationId: 'invocation-adapter-contract',
  principal: { id: 'test', type: 'service', permissionScopes: ['*'] },
};

function adapters(): Array<{ name: string; adapter: ToolAdapter }> {
  const handler = async (input: unknown) => ({ adapter: 'function', input });
  return [
    { name: 'local', adapter: new LocalFunctionToolAdapter('local', handler) },
    { name: 'plugin', adapter: new PluginToolAdapter('plugin', handler) },
    { name: 'mock', adapter: new MockToolAdapter('mock', handler) },
    {
      name: 'http',
      adapter: new HttpToolAdapter('http', {
        endpoint: 'https://tool.test/execute',
        fetch: async () =>
          new Response(JSON.stringify({ adapter: 'http' }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
          }),
      }),
    },
    {
      name: 'mcp',
      adapter: new MCPToolAdapter('mcp', 'server', 'echo', {
        async invoke(request) {
          return { adapter: 'mcp', input: request.input };
        },
        async health() {
          return { status: 'healthy', checkedAt: '2026-07-16T00:00:00.000Z' };
        },
        async cancel() {},
      }),
    },
  ];
}

describe('@hypha/tools ToolAdapter contract', () => {
  for (const { name, adapter } of adapters()) {
    it(`${name} exposes executable capabilities, health, and a normalized envelope`, async () => {
      await expect(adapter.capabilities()).resolves.toMatchObject({
        execute: true,
        health: true,
        cancel: expect.any(Boolean),
        close: expect.any(Boolean),
      });
      await expect(adapter.health()).resolves.toMatchObject({
        status: expect.stringMatching(/healthy|degraded|unhealthy|unknown/),
        checkedAt: expect.any(String),
      });
      await expect(
        adapter.execute({ toolId: `tool.${name}`, input: { value: name }, context })
      ).resolves.toMatchObject({ output: expect.anything() });
      if ((await adapter.capabilities()).cancel) {
        await expect(
          adapter.cancel?.({
            toolId: `tool.${name}`,
            invocationId: context.invocationId!,
            reason: 'contract-test',
          })
        ).resolves.toBeUndefined();
      }
      if ((await adapter.capabilities()).close) {
        await expect(adapter.close?.()).resolves.toBeUndefined();
      }
    });
  }

  it('normalizes HTTP provider failures at the adapter boundary', async () => {
    const adapter = new HttpToolAdapter('http-failure', {
      endpoint: 'https://tool.test/execute',
      fetch: async () => new Response('unavailable', { status: 503 }),
    });
    await expect(
      adapter.execute({ toolId: 'tool.http', input: {}, context })
    ).rejects.toMatchObject({ code: 'TOOL_HTTP_ERROR' });
  });
});
