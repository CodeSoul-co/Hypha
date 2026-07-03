import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import { GovernedToolRunner, ToolRegistry } from '@hypha/tools';
import {
  MockMCPGateway,
  classicMCPIntegrationSpec,
  createClassicMCPMockGateway,
  mcpIntegrationSpecDefinition,
  mcpSpecJsonSchemas,
  normalizeMCPToolSpec,
  registerMCPGatewayTools,
  validateMCPIntegrationSpec,
} from './index';

describe('@hypha/mcp normalization', () => {
  it('filters and normalizes MCP capabilities before tool use', async () => {
    const gateway = new MockMCPGateway([
      {
        id: 'capability',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'search',
        type: 'tool',
        sideEffectLevel: 'read',
      },
    ]);

    const discovered = await gateway.discover({
      id: 'mcp',
      version: '0.0.0',
      servers: [{ id: 'local', mode: 'local' }],
      allowedCapabilities: ['search'],
    });

    expect(await gateway.normalize(discovered[0])).toMatchObject({
      normalizedSpecId: 'local:tool:search',
    });
    expect(normalizeMCPToolSpec(discovered[0])).toMatchObject({
      id: 'local.search',
      source: 'mcp',
      sourceRef: { serverId: 'local', capabilityId: 'search' },
      sideEffectLevel: 'read',
    });
  });

  it('exports MCPIntegrationSpec schema and minimal example', () => {
    expect(validateMCPIntegrationSpec(mcpIntegrationSpecDefinition.example).id).toBe('mcp.default');
    expect(mcpSpecJsonSchemas.MCPIntegrationSpec.required).toContain('servers');
  });

  it('registers discovered MCP tools into the governed ToolRunner path', async () => {
    const gateway = new MockMCPGateway([
      {
        id: 'capability',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'search',
        type: 'tool',
        inputSchema: {
          type: 'object',
          required: ['query'],
          properties: { query: { type: 'string' } },
        },
        sideEffectLevel: 'read',
        capabilityHash: 'hash_search',
      },
    ]);
    gateway.registerToolHandler('local', 'search', async (request) => ({
      query: request.input,
      source: 'mock-mcp',
    }));
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    await expect(
      registerMCPGatewayTools({
        integration: {
          id: 'mcp.local',
          version: '0.0.0',
          servers: [{ id: 'local', mode: 'local' }],
          allowedCapabilities: ['search'],
        },
        gateway,
        registry,
        trace,
        traceContext: {
          runId: 'run_mcp_gateway',
          stepId: 'mcp.discover',
          sessionId: 'session_mcp',
        },
      })
    ).resolves.toMatchObject({
      registeredTools: [
        expect.objectContaining({
          id: 'local.search',
          source: 'mcp',
          sourceRef: { serverId: 'local', capabilityId: 'search' },
        }),
      ],
    });

    const runner = new GovernedToolRunner(registry, trace);
    await expect(
      runner.run({
        toolId: 'local.search',
        input: { query: 'hypha' },
        context: {
          runId: 'run_mcp_gateway',
          stepId: 'tool.search',
          sessionId: 'session_mcp',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        source: 'mock-mcp',
      },
    });

    await expect(trace.list({ runId: 'run_mcp_gateway' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.capability.discovered' }),
        expect.objectContaining({ type: 'mcp.tool.normalized' }),
        expect.objectContaining({
          type: 'tool.call.started',
          payload: expect.objectContaining({
            source: 'mcp',
            sourceRef: { serverId: 'local', capabilityId: 'search' },
          }),
        }),
        expect.objectContaining({ type: 'mcp.call.started' }),
        expect.objectContaining({ type: 'mcp.call.completed' }),
      ])
    );
  });

  it('blocks dangerous MCP tools before calling the gateway handler', async () => {
    let called = false;
    const gateway = new MockMCPGateway([
      {
        id: 'dangerous',
        version: '0.0.0',
        serverId: 'local',
        capabilityId: 'delete',
        type: 'tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'irreversible',
      },
    ]);
    gateway.registerToolHandler('local', 'delete', async () => {
      called = true;
      return { deleted: true };
    });
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    await registerMCPGatewayTools({
      integration: {
        id: 'mcp.local',
        version: '0.0.0',
        servers: [{ id: 'local', mode: 'local' }],
      },
      gateway,
      registry,
      trace,
      traceContext: {
        runId: 'run_mcp_dangerous',
        stepId: 'mcp.discover',
      },
    });

    const runner = new GovernedToolRunner(registry, trace);
    await expect(
      runner.run({
        toolId: 'local.delete',
        input: { path: '/tmp/example' },
        context: { runId: 'run_mcp_dangerous', stepId: 'tool.delete' },
      })
    ).resolves.toMatchObject({
      status: 'denied',
    });
    expect(called).toBe(false);

    const events = await trace.list({ runId: 'run_mcp_dangerous' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.rejected',
          payload: expect.objectContaining({
            source: 'mcp',
            sideEffectLevel: 'irreversible',
          }),
        }),
      ])
    );
    expect(events).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'mcp.call.started' })])
    );
  });

  it('executes classic predefined MCP examples through the governed runner', async () => {
    const gateway = createClassicMCPMockGateway({
      files: {
        '/guide.md': 'Classic filesystem fixture content.',
      },
      fetchResponses: {
        'https://example.com/api': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          json: { ok: true },
        },
      },
      now: '2026-07-03T00:00:00.000Z',
      searchResults: {
        hypha: [
          {
            title: 'Hypha test result',
            url: 'https://example.com/hypha',
            snippet: 'Deterministic MCP search result.',
          },
        ],
      },
    });
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();

    const registration = await registerMCPGatewayTools({
      integration: classicMCPIntegrationSpec,
      gateway,
      registry,
      trace,
      traceContext: {
        runId: 'run_mcp_classic',
        stepId: 'mcp.discover',
        sessionId: 'session_mcp_classic',
      },
    });

    expect(registration.registeredTools.map((tool) => tool.id).sort()).toEqual([
      'fetch.fetch',
      'filesystem.read_file',
      'search.web_search',
      'time.now',
    ]);

    const runner = new GovernedToolRunner(registry, trace);
    await expect(
      runner.run({
        toolId: 'filesystem.read_file',
        input: { path: '/guide.md' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.filesystem',
          sessionId: 'session_mcp_classic',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        path: '/guide.md',
        content: 'Classic filesystem fixture content.',
      },
    });
    await expect(
      runner.run({
        toolId: 'fetch.fetch',
        input: { url: 'https://example.com/api' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.fetch',
          sessionId: 'session_mcp_classic',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        status: 200,
        json: { ok: true },
      },
    });
    await expect(
      runner.run({
        toolId: 'time.now',
        input: { timezone: 'UTC' },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.time',
          sessionId: 'session_mcp_classic',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        now: '2026-07-03T00:00:00.000Z',
        timezone: 'UTC',
      },
    });
    await expect(
      runner.run({
        toolId: 'search.web_search',
        input: { query: 'hypha', limit: 1 },
        context: {
          runId: 'run_mcp_classic',
          stepId: 'tool.search',
          sessionId: 'session_mcp_classic',
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        query: 'hypha',
        count: 1,
      },
    });

    const events = await trace.list({ runId: 'run_mcp_classic' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.capability.discovered' }),
        expect.objectContaining({ type: 'mcp.tool.normalized' }),
        expect.objectContaining({
          type: 'tool.policy.checked',
          payload: expect.objectContaining({
            source: 'mcp',
            sideEffectLevel: 'read',
          }),
        }),
        expect.objectContaining({ type: 'mcp.call.completed' }),
      ])
    );
    expect(events.filter((event) => event.type === 'mcp.call.completed')).toHaveLength(4);
  });
});
