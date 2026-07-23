import { LocalFunctionToolAdapter, type ToolRegistry } from '@hypha/tools';
import { normalizeMCPToolSpec } from '@hypha/mcp';
import { ToolManager } from './ToolManager';
import type { MCPClient, ToolDefinition } from './types';
import type { ITool } from './types';

function managedClient(tool: ToolDefinition): MCPClient {
  return {
    id: 'remote-a',
    name: 'Remote A',
    status: 'connected',
    tools: [tool],
    connect: async () => undefined,
    disconnect: async () => undefined,
    invoke: async () => ({ success: true, output: 'bypass' }),
    listTools: async () => [tool],
    healthCheck: async () => true,
  };
}

describe('ToolManager MCP governance boundary', () => {
  it('does not expose a managed SDK-discovered tool until its approved revision is imported', () => {
    const manager = new ToolManager();
    const discovered: ToolDefinition = {
      name: 'search',
      description: 'Remote search',
      inputSchema: { type: 'object', properties: {} },
    };
    const client = managedClient(discovered);
    const internals = manager as unknown as {
      mcpClients: Map<string, MCPClient>;
      mcpServerModes: Map<string, 'local' | 'remote' | 'fixture'>;
      approvedMCPRegistry: ToolRegistry;
    };
    internals.mcpClients.set(client.id, client);
    internals.mcpServerModes.set(client.id, 'remote');

    expect(manager.listTools().map((tool) => tool.name)).not.toContain('search');
    expect(manager.describeTool('search')).toBeNull();
    expect(manager.resolveGovernedTool('search')).toBeNull();

    const approved = normalizeMCPToolSpec({
      id: 'remote-a.search',
      version: '1.0.0',
      serverId: 'remote-a',
      capabilityId: 'search',
      capabilityHash: 'sha256:approved',
      type: 'tool',
      name: 'remote-a.search',
      description: 'Remote search',
      inputSchema: { type: 'object', properties: {} },
      sideEffectLevel: 'read',
      trustLevel: 'reviewed',
    });
    internals.approvedMCPRegistry.registerAdapter(
      approved,
      new LocalFunctionToolAdapter('approved-test', async () => 'approved')
    );

    expect(manager.listTools().map((tool) => tool.name)).toContain(approved.id);
    expect(manager.describeTool('search')?.id).toBe(approved.id);
    expect(manager.resolveGovernedTool('search')?.spec.sourceRef?.capabilityHash).toBe(
      'sha256:approved'
    );
  });

  it('registers atomically, rejects duplicates, and quarantines cleanup failures', async () => {
    const manager = new ToolManager();
    const failingLoad: ITool = {
      id: 'load-fails',
      name: 'load-fails',
      description: 'fails',
      schema: { name: 'load-fails', description: 'fails', inputSchema: { type: 'object' } },
      execute: async () => ({ success: true }),
      onLoad: async () => {
        throw new Error('load failed');
      },
    };
    await expect(manager.register(failingLoad)).rejects.toThrow('load failed');
    expect(manager.getTool(failingLoad.id)).toBeNull();

    const cleanupFails: ITool = {
      ...failingLoad,
      id: 'cleanup-fails',
      name: 'cleanup-fails',
      onLoad: async () => undefined,
      onUnload: async () => {
        throw new Error('cleanup failed');
      },
    };
    await manager.register(cleanupFails);
    await expect(manager.register(cleanupFails)).rejects.toMatchObject({
      code: 'TOOL_ALREADY_REGISTERED',
    });
    await expect(manager.unregister(cleanupFails.id)).rejects.toMatchObject({
      code: 'TOOL_CLEANUP_QUARANTINED',
    });
    expect(manager.getTool(cleanupFails.id)).toBe(cleanupFails);
    expect(manager.listTools(true).map((tool) => tool.name)).not.toContain(cleanupFails.name);
  });

  it('marks optional profile binding failures degraded and fails required profiles', async () => {
    const manager = new ToolManager();
    const load = (
      manager as unknown as {
        loadAdapterProfiles(profiles: Array<Record<string, unknown>>): Promise<void>;
      }
    ).loadAdapterProfiles.bind(manager);
    const profile = {
      id: 'plugin.missing',
      kind: 'plugin',
      toolSpecRef: { id: 'utility.text', version: '1.0.0' },
      binding: { pluginId: 'missing' },
    };
    await expect(load([{ ...profile, required: false }])).resolves.toBeUndefined();
    expect(manager.profileReadiness()).toMatchObject({
      'plugin.missing': { status: 'degraded', required: false },
    });
    await expect(load([{ ...profile, id: 'plugin.required', required: true }])).rejects.toMatchObject(
      { code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE' }
    );
  });

  it('rejects caller-asserted Run ids for MCP Resource and Prompt access', async () => {
    const manager = new ToolManager();
    await expect(manager.readMCPResource('server-a', 'docs://one', 'run-forged')).rejects.toMatchObject(
      { code: 'MCP_CAPABILITY_SCOPE_DENIED' }
    );
    await expect(
      manager.renderMCPPrompt('server-a', 'prompt-a', {}, 'run-forged')
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_SCOPE_DENIED' });
  });
});
