import {
  LocalFunctionToolAdapter,
  type ToolAdapter,
  type ToolCallContext,
  type ToolRegistry,
} from '@hypha/tools';
import { normalizeMCPToolSpec } from '@hypha/mcp';
import { ToolManager } from './ToolManager';
import type { MCPClient, ToolDefinition } from './types';
import type { ITool } from './types';
import { ToolProfileBindingRegistry } from './ToolProfileBindingRegistry';

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
    await expect(
      load([{ ...profile, id: 'plugin.required', required: true }])
    ).rejects.toMatchObject({ code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE' });
  });

  it('fails readiness for required MCP auto-connect and supervises optional failures', async () => {
    const requiredManager = new ToolManager();
    const requiredConnection = (
      requiredManager as unknown as {
        connectionManager: {
          connect(serverId: string): Promise<unknown>;
        };
      }
    ).connectionManager;
    jest
      .spyOn(requiredConnection, 'connect')
      .mockRejectedValue(new Error('required server unavailable'));

    await expect(
      requiredManager.registerMCPServer({
        id: 'required-remote',
        name: 'Required remote',
        mode: 'remote',
        endpoint: 'https://example.com/mcp',
        autoConnect: true,
        required: true,
      })
    ).rejects.toMatchObject({
      code: 'MCP_REQUIRED_SERVER_UNAVAILABLE',
      serverId: 'required-remote',
    });
    expect(requiredManager.mcpServerReadiness()).toMatchObject({
      'required-remote': {
        status: 'failed',
        required: true,
        error: 'required server unavailable',
      },
    });

    const optionalManager = new ToolManager();
    const optionalConnection = (
      optionalManager as unknown as {
        connectionManager: {
          connect(serverId: string): Promise<unknown>;
          reconnect(serverId: string): Promise<unknown>;
        };
      }
    ).connectionManager;
    jest
      .spyOn(optionalConnection, 'connect')
      .mockRejectedValue(new Error('optional server unavailable'));
    const reconnect = jest
      .spyOn(optionalConnection, 'reconnect')
      .mockRejectedValue(new Error('reconnect budget exhausted'));

    await expect(
      optionalManager.registerMCPServer({
        id: 'optional-remote',
        name: 'Optional remote',
        mode: 'remote',
        endpoint: 'https://example.com/mcp',
        autoConnect: true,
        required: false,
      })
    ).resolves.toBeUndefined();
    await Promise.resolve();
    await Promise.resolve();

    expect(reconnect).toHaveBeenCalledTimes(1);
    expect(optionalManager.mcpServerReadiness()).toMatchObject({
      'optional-remote': {
        status: 'degraded',
        required: false,
        error: 'reconnect budget exhausted',
        reconnecting: false,
      },
    });
  });

  it('rejects caller-asserted Run ids for MCP Resource and Prompt access', async () => {
    const manager = new ToolManager();
    await expect(
      manager.readMCPResource('server-a', 'docs://one', 'run-forged')
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_SCOPE_DENIED' });
    await expect(
      manager.renderMCPPrompt('server-a', 'prompt-a', {}, 'run-forged')
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_SCOPE_DENIED' });
  });

  it('rejects an MCP Resource result when approval changes while awaiting the server', async () => {
    const manager = new ToolManager();
    const snapshots = new Map<string, any>();
    const capability = {
      id: 'resource-revision',
      serverId: 'server-a',
      kind: 'resource',
      remoteName: 'docs://one',
      protocolVersion: '2025-11-25',
      capabilityVersion: '1.0.0',
      capabilityHash: 'sha256:resource-one',
      descriptorHash: 'sha256:descriptor-one',
      descriptor: {
        serverIdentity: { name: 'server-a', version: '1.0.0' },
      },
      driftState: 'approved',
      approvalExpiresAt: new Date(Date.now() + 60_000).toISOString(),
    };
    const internals = manager as unknown as {
      mcpCatalogs: Map<
        string,
        {
          getCapability(): Promise<typeof capability>;
        }
      >;
      mcpSnapshotStore: {
        get(id: string): Promise<any>;
        save(snapshot: any): Promise<void>;
      };
      connectionManager: {
        readResource(request: unknown): Promise<unknown>;
      };
    };
    internals.mcpCatalogs.set('server-a', {
      getCapability: async () => capability,
    });
    internals.mcpSnapshotStore = {
      get: async (id) => snapshots.get(id) ?? null,
      save: async (snapshot) => {
        snapshots.set(snapshot.id, structuredClone(snapshot));
      },
    };
    jest.spyOn(internals.connectionManager, 'readResource').mockImplementation(async () => {
      capability.driftState = 'quarantined';
      return { contents: [{ uri: 'docs://one', text: 'late result' }] };
    });

    await expect(
      manager.readMCPResource('server-a', 'docs://one', {
        runId: 'run-owned',
        principalId: 'owner-one',
        userId: 'owner-one',
        permissionScopes: ['mcp.resource.read'],
        deadlineAt: new Date(Date.now() + 30_000).toISOString(),
      })
    ).rejects.toMatchObject({ code: 'MCP_CAPABILITY_QUARANTINED' });
  });

  it('resolves trusted plugin and execution bindings and owns their lifecycle', async () => {
    const bindings = new ToolProfileBindingRegistry();
    const lifecycle: string[] = [];
    bindings.registerPlugin('plugin.text', async (input) => ({ input, source: 'plugin' }));
    bindings.registerExecutionAdapter('execution.default', async ({ profile }) => {
      const adapter: ToolAdapter = {
        id: `execution:${profile.id}`,
        source: 'execution',
        capabilities: async () => ({
          execute: true,
          cancel: true,
          health: true,
          close: true,
        }),
        execute: async ({ input }) => ({
          kind: 'tool_execution_envelope',
          output: { input, source: 'execution' },
        }),
        cancel: async ({ invocationId }) => {
          lifecycle.push(`cancel:${invocationId}`);
        },
        health: async () => ({
          status: 'healthy',
          checkedAt: new Date(0).toISOString(),
        }),
        close: async () => {
          lifecycle.push('close:execution');
        },
      };
      return adapter;
    });
    const manager = new ToolManager(bindings);
    await manager.register({
      id: 'utility.text',
      name: 'utility.text',
      description: 'Built-in fallback',
      schema: {
        name: 'utility.text',
        description: 'Built-in fallback',
        inputSchema: { type: 'object' },
      },
      execute: async () => ({ success: true, output: { source: 'built-in' } }),
    });
    const load = (
      manager as unknown as {
        loadAdapterProfiles(profiles: Array<Record<string, unknown>>): Promise<void>;
      }
    ).loadAdapterProfiles.bind(manager);

    await load([
      {
        id: 'plugin.text',
        kind: 'plugin',
        toolSpecRef: { id: 'utility.text', version: '1.0.0' },
        binding: { pluginId: 'plugin.text' },
      },
      {
        id: 'local.command',
        kind: 'execution',
        toolSpecRef: { id: 'common.command', version: '1.0.0' },
        binding: { executionPortRef: 'execution.default' },
        requiredCapabilities: ['execute', 'cancel', 'health', 'close'],
      },
    ]);

    const context: ToolCallContext = {
      runId: 'run-profile',
      stepId: 'step-profile',
      invocationId: 'invocation-profile',
    };
    await expect(
      manager
        .resolveGovernedTool('utility.text')!
        .adapter.execute({ toolId: 'utility.text', input: { value: 'text' }, context })
    ).resolves.toMatchObject({ output: { source: 'plugin' } });
    const execution = manager.resolveGovernedTool('common.command')!.adapter;
    await expect(
      execution.execute({ toolId: 'common.command', input: { operation: 'status' }, context })
    ).resolves.toMatchObject({ output: { source: 'execution' } });
    await execution.cancel?.({ toolId: 'common.command', invocationId: 'cancel-me' });
    expect(manager.profileReadiness()).toEqual({
      'plugin.text': { status: 'ready', required: true },
      'local.command': { status: 'ready', required: true },
    });
    expect(manager.listTools().filter((tool) => tool.name === 'utility.text')).toHaveLength(1);

    await manager.destroy();
    expect(lifecycle).toEqual(['cancel:cancel-me', 'close:execution']);
  });

  it('starts, invokes, checks, cancels, and releases a pinned MCP profile connection', async () => {
    const calls: string[] = [];
    const tool: ToolDefinition = {
      name: 'resources.read',
      description: 'Read resource',
      inputSchema: { type: 'object', properties: {} },
    };
    const client: MCPClient = {
      id: 'cloud',
      name: 'Cloud',
      status: 'disconnected',
      tools: [tool],
      connect: async function () {
        calls.push('connect');
        this.status = 'connected';
      },
      disconnect: async function () {
        calls.push('disconnect');
        this.status = 'disconnected';
      },
      invoke: async (name, input) => {
        calls.push(`invoke:${name}`);
        return { success: true, output: input };
      },
      listTools: async () => [tool],
      healthCheck: async () => {
        calls.push('health');
        return true;
      },
    };
    const manager = new ToolManager(new ToolProfileBindingRegistry());
    const internals = manager as unknown as {
      mcpClients: Map<string, MCPClient>;
      mcpServerModes: Map<string, 'local' | 'remote' | 'fixture'>;
      mcpConnectionProfiles: Map<string, string>;
      loadAdapterProfiles(profiles: Array<Record<string, unknown>>): Promise<void>;
    };
    internals.mcpClients.set('cloud', client);
    internals.mcpServerModes.set('cloud', 'fixture');
    internals.mcpConnectionProfiles.set('mcp.cloud', 'cloud');

    await internals.loadAdapterProfiles([
      {
        id: 'cloud.mcp',
        kind: 'mcp_streamable_http',
        endpoint: 'https://mcp.example.com/mcp',
        toolSpecRef: { id: 'common.mcp_resource', version: '1.0.0' },
        binding: {
          mcpConnectionProfileRef: 'mcp.cloud',
          mcpServerId: 'cloud',
          mcpCapabilityId: 'resources.read',
        },
        requiredCapabilities: ['execute', 'cancel', 'health', 'close'],
      },
    ]);
    const adapter = manager.resolveGovernedTool('common.mcp_resource')!.adapter;
    await expect(
      adapter.execute({
        toolId: 'common.mcp_resource',
        input: { uri: 'docs://one' },
        context: {
          runId: 'run-mcp',
          stepId: 'step-mcp',
          invocationId: 'invoke-mcp',
        },
      })
    ).resolves.toMatchObject({ output: { uri: 'docs://one' } });
    await expect(adapter.health()).resolves.toMatchObject({ status: 'healthy' });
    await adapter.cancel?.({ toolId: 'common.mcp_resource', invocationId: 'invoke-mcp' });
    await manager.destroy();

    expect(calls).toEqual([
      'connect',
      'health',
      'invoke:resources.read',
      'health',
      'disconnect',
      'disconnect',
    ]);
  });
});
