import { LocalFunctionToolAdapter, type ToolRegistry } from '@hypha/tools';
import { normalizeMCPToolSpec } from '@hypha/mcp';
import { ToolManager } from './ToolManager';
import type { MCPClient, ToolDefinition } from './types';

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
});
