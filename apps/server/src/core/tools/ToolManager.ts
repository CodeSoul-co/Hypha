import {
  ITool,
  ToolDefinition,
  ToolParams,
  ToolResult,
  ToolRegistration,
  MCPServerConfig,
  MCPClient,
} from './types';
import { BaseTool } from './types';
import FilesystemTool from './builtins/FilesystemTool';
import SearchTool from './builtins/SearchTool';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../../utils/logger';
import { filesystemToolConfig, getConfig } from '../../config';
import {
  classicMCPCapabilityDescriptors,
  createClassicMCPMockGateway,
  normalizeMCPToolSpec,
  type MCPCapabilityDescriptor,
  type MCPGateway,
} from '@hypha/mcp';
import type { ToolSpec as HyphaToolSpec } from '@hypha/tools';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import axios from 'axios';

type MCPToolResolution = {
  client: MCPClient;
  tool: ToolDefinition;
  spec: HyphaToolSpec;
};

type MCPToolMetadata = {
  sourceRef?: {
    serverId?: string;
    capabilityId?: string;
  };
  sideEffectLevel?: HyphaToolSpec['sideEffectLevel'];
  permissionScope?: string[];
  trustLevel?: MCPCapabilityDescriptor['trustLevel'];
  version?: string;
};

// Local MCP Client implementation
class LocalMCPClient implements MCPClient {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error' = 'disconnected';
  tools: ToolDefinition[] = [];

  private client: Client | null = null;
  private config: MCPServerConfig;
  private childProcess: any = null;

  constructor(config: MCPServerConfig) {
    this.id = config.id;
    this.name = config.name;
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.status === 'connected') return;

    this.status = 'connecting';
    logger.info(`Connecting to MCP server: ${this.name}`);

    try {
      if (!this.config.command || !this.config.args) {
        throw new Error('MCP server command and args are required');
      }

      const transport = new StdioClientTransport({
        command: this.config.command,
        args: this.config.args,
      });

      this.client = new Client(
        {
          name: 'hypha',
          version: '1.0.0',
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );

      await this.client.connect(transport);
      this.status = 'connected';

      // List available tools
      await this.refreshTools();

      logger.info(`MCP server connected: ${this.name}`, { toolCount: this.tools.length });
    } catch (error: any) {
      this.status = 'error';
      logger.error(`Failed to connect to MCP server ${this.name}:`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
    this.status = 'disconnected';
    this.tools = [];
    logger.info(`MCP server disconnected: ${this.name}`);
  }

  async callTool(name: string, args: any): Promise<ToolResult> {
    if (!this.client || this.status !== 'connected') {
      return { success: false, error: 'MCP client not connected' };
    }

    try {
      const result = await this.client.callTool({
        name,
        arguments: args,
      });

      return { success: true, output: result };
    } catch (error: any) {
      logger.error(`MCP tool call failed: ${name}`, error);
      return { success: false, error: error.message };
    }
  }

  async listTools(): Promise<ToolDefinition[]> {
    if (!this.client || this.status !== 'connected') {
      return [];
    }

    try {
      return await this.refreshTools();
    } catch (error) {
      logger.error(`Failed to list tools from ${this.name}:`, error);
      return [];
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.refreshTools();
      return true;
    } catch {
      return false;
    }
  }

  private async refreshTools(): Promise<ToolDefinition[]> {
    if (!this.client || this.status !== 'connected') {
      throw new Error('MCP client not connected');
    }
    const response = await this.client.listTools();
    this.tools = response.tools.map((tool: any) => ({
      name: String(tool.name),
      description: tool.description || '',
      inputSchema: tool.inputSchema || { type: 'object' },
      outputSchema: tool.outputSchema,
      metadata: {
        sourceRef: {
          serverId: this.id,
          capabilityId: String(tool.name),
        },
        sideEffectLevel: 'read',
      },
    }));
    return this.tools;
  }
}

// Remote MCP Client implementation
class RemoteMCPClient implements MCPClient {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error' = 'disconnected';
  tools: ToolDefinition[] = [];

  private config: MCPServerConfig;
  private baseUrl: string;
  private authToken?: string;

  constructor(config: MCPServerConfig) {
    this.id = config.id;
    this.name = config.name;
    this.config = config;
    this.baseUrl = config.endpoint || '';
    this.authToken = config.authToken;
  }

  async connect(): Promise<void> {
    if (this.status === 'connected') return;

    this.status = 'connecting';
    logger.info(`Connecting to remote MCP server: ${this.name}`);

    try {
      if (!this.baseUrl) {
        throw new Error('Remote MCP endpoint is required');
      }
      // Verify connection by listing tools
      await this.fetchTools();
      this.status = 'connected';
      logger.info(`Remote MCP server connected: ${this.name}`);
    } catch (error: any) {
      this.status = 'error';
      logger.error(`Failed to connect to remote MCP server ${this.name}:`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.status = 'disconnected';
    this.tools = [];
    logger.info(`Remote MCP server disconnected: ${this.name}`);
  }

  async callTool(name: string, args: any): Promise<ToolResult> {
    if (this.status !== 'connected') {
      return { success: false, error: 'Remote MCP client not connected' };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      const response = await axios.post(
        `${this.baseUrl}/tools/call`,
        { name, arguments: args },
        { headers, timeout: 30000 }
      );

      return { success: true, output: response.data };
    } catch (error: any) {
      logger.error(`Remote MCP tool call failed: ${name}`, error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  async listTools(): Promise<ToolDefinition[]> {
    try {
      return await this.fetchTools();
    } catch (error) {
      logger.error(`Failed to list tools from remote MCP ${this.name}:`, error);
      return [];
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.fetchTools();
      return true;
    } catch {
      return false;
    }
  }

  private async fetchTools(): Promise<ToolDefinition[]> {
    if (!this.baseUrl) {
      throw new Error('Remote MCP endpoint is required');
    }
    const headers: Record<string, string> = {};
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const response = await axios.get(`${this.baseUrl}/tools`, {
      headers,
      timeout: 10000,
    });

    const remoteTools = Array.isArray(response.data?.tools) ? response.data.tools : [];
    this.tools = remoteTools.map((tool: any) => ({
      name: String(tool.name),
      description: tool.description || '',
      inputSchema: tool.inputSchema || { type: 'object' },
      outputSchema: tool.outputSchema,
      metadata: {
        sourceRef: {
          serverId: this.id,
          capabilityId: String(tool.name),
        },
        sideEffectLevel: tool.sideEffectLevel || 'read',
        permissionScope: tool.permissionScope,
      },
    }));
    return this.tools;
  }
}

// Deterministic in-process MCP client for local verification and tests.
class FixtureMCPClient implements MCPClient {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error' = 'disconnected';
  tools: ToolDefinition[] = [];

  private readonly gateway: MCPGateway;
  private readonly capabilities: MCPCapabilityDescriptor[];
  private readonly capabilityByName = new Map<string, MCPCapabilityDescriptor>();

  constructor(config: MCPServerConfig) {
    this.id = config.id;
    this.name = config.name;
    this.gateway = createClassicMCPMockGateway({
      files: {
        '/README.md': '# Hypha\n\nClassic MCP fixture exposed by the API server.\n',
        '/runtime/status.json': JSON.stringify(
          {
            service: 'hypha',
            fixture: 'classic-mcp',
            ok: true,
          },
          null,
          2
        ),
      },
      fetchResponses: {
        'https://example.com/hypha.json': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          json: { service: 'hypha', source: 'classic-mcp-fixture' },
        },
      },
      searchResults: {
        hypha: [
          {
            title: 'Hypha runtime',
            url: 'https://example.com/hypha/runtime',
            snippet: 'Deterministic MCP fixture result for the Hypha runtime.',
          },
        ],
      },
    });
    this.capabilities = classicMCPCapabilityDescriptors.map((capability) =>
      JSON.parse(JSON.stringify(capability))
    );
    for (const capability of this.capabilities) {
      this.indexCapability(capability);
    }
  }

  async connect(): Promise<void> {
    if (this.status === 'connected') return;
    this.status = 'connecting';
    try {
      this.status = 'connected';
      await this.refreshTools();
      logger.info(`Fixture MCP server connected: ${this.name}`, { toolCount: this.tools.length });
    } catch (error) {
      this.status = 'error';
      logger.error(`Failed to connect fixture MCP server ${this.name}:`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.status = 'disconnected';
    this.tools = [];
    logger.info(`Fixture MCP server disconnected: ${this.name}`);
  }

  async callTool(name: string, args: any): Promise<ToolResult> {
    if (this.status !== 'connected') {
      return { success: false, error: 'Fixture MCP client not connected' };
    }
    const capability = this.resolveCapability(name);
    if (!capability) {
      return { success: false, error: `MCP fixture tool not found: ${name}` };
    }
    if (!this.gateway.callTool) {
      return { success: false, error: 'Fixture MCP gateway does not support tool calls' };
    }
    try {
      const output = await this.gateway.callTool({
        serverId: capability.serverId,
        capabilityId: capability.capabilityId,
        input: args,
        context: {
          runId: `fixture:${this.id}`,
          stepId: `mcp:${capability.serverId}.${capability.capabilityId}`,
          metadata: {
            source: 'server-fixture',
            gatewayId: this.id,
          },
        },
      });
      return { success: true, output };
    } catch (error) {
      logger.error(`Fixture MCP tool call failed: ${name}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async listTools(): Promise<ToolDefinition[]> {
    if (this.status !== 'connected') {
      return [];
    }
    return this.refreshTools();
  }

  async healthCheck(): Promise<boolean> {
    return this.status === 'connected';
  }

  private refreshTools(): ToolDefinition[] {
    this.tools = this.capabilities.map((capability) => {
      const spec = normalizeMCPToolSpec(capability);
      return {
        name: spec.id,
        description: spec.description,
        inputSchema: this.asObjectInputSchema(spec.inputSchema),
        outputSchema: spec.outputSchema as Record<string, any> | undefined,
        metadata: {
          sourceRef: spec.sourceRef,
          sideEffectLevel: spec.sideEffectLevel,
          permissionScope: spec.permissionScope,
          trustLevel: capability.trustLevel,
          version: capability.version,
        } satisfies MCPToolMetadata,
      };
    });
    return this.tools;
  }

  private resolveCapability(name: string): MCPCapabilityDescriptor | null {
    return this.capabilityByName.get(name) ?? null;
  }

  private indexCapability(capability: MCPCapabilityDescriptor): void {
    const spec = normalizeMCPToolSpec(capability);
    const keys = [spec.id, spec.name, capability.name, capability.capabilityId].filter(
      (value): value is string => typeof value === 'string' && value.length > 0
    );
    for (const key of keys) {
      if (!this.capabilityByName.has(key)) {
        this.capabilityByName.set(key, capability);
      }
    }
  }

  private asObjectInputSchema(schema: HyphaToolSpec['inputSchema']): ToolDefinition['inputSchema'] {
    return {
      ...(schema as Record<string, any>),
      type: 'object',
      properties: schema.properties as Record<string, any> | undefined,
      required: schema.required,
    };
  }
}

export class ToolManager {
  private tools: Map<string, ToolRegistration> = new Map();
  private mcpClients: Map<string, MCPClient> = new Map();

  async initialize(): Promise<void> {
    const config = getConfig();

    // 1. Register built-in tool implementations.
    const builtinTools: ITool[] = [new FilesystemTool(filesystemToolConfig()), new SearchTool()];
    for (const tool of builtinTools) {
      try {
        await this.register(tool);
      } catch (err) {
        logger.error('Failed to register built-in tool:', err);
      }
    }

    // 2. Apply configs/tools.yaml — toggles `enabled` per tool id. Tools listed
    //    in yaml without a built-in implementation are warned and skipped.
    await this.loadToolsFromConfig(config.tools.configPath);

    // 3. Initialize local/remote MCP servers (unchanged).
    if (config.tools.mcpServers) {
      for (const serverConfig of config.tools.mcpServers) {
        await this.registerMCPServer(serverConfig);
      }
    }

    logger.info('ToolManager initialized', {
      toolCount: this.tools.size,
      mcpServerCount: this.mcpClients.size,
    });
  }

  private async loadToolsFromConfig(configPath: string): Promise<void> {
    try {
      const abs = path.resolve(process.cwd(), configPath);
      if (!fs.existsSync(abs)) {
        logger.warn(`Tools config not found: ${abs}`);
        return;
      }
      const parsed = yaml.load(fs.readFileSync(abs, 'utf-8')) as {
        tools?: Array<{ id: string; enabled?: boolean }>;
      } | null;
      if (!parsed?.tools) return;

      for (const entry of parsed.tools) {
        if (!entry.id) continue;
        const reg = this.tools.get(entry.id);
        if (!reg) {
          logger.warn(`Tool in config has no built-in implementation: ${entry.id}`);
          continue;
        }
        if (typeof entry.enabled === 'boolean') reg.enabled = entry.enabled;
      }
    } catch (err) {
      logger.error('Failed to load tools from config:', err);
    }
  }

  async destroy(): Promise<void> {
    // Disconnect all MCP clients
    for (const [id, client] of this.mcpClients) {
      await client.disconnect();
    }
    this.mcpClients.clear();

    // Call unload on all tools
    for (const [id, registration] of this.tools) {
      if (registration.tool.onUnload) {
        try {
          await registration.tool.onUnload();
        } catch (error) {
          logger.error(`Error unloading tool ${id}:`, error);
        }
      }
    }
    this.tools.clear();

    logger.info('ToolManager destroyed');
  }

  async register(tool: ITool): Promise<void> {
    this.tools.set(tool.id, { tool, enabled: true });

    if (tool.onLoad) {
      await tool.onLoad();
    }

    logger.info(`Tool registered: ${tool.id}`);
  }

  async unregister(toolId: string): Promise<boolean> {
    const registration = this.tools.get(toolId);
    if (!registration) return false;

    if (registration.tool.onUnload) {
      await registration.tool.onUnload();
    }

    this.tools.delete(toolId);
    logger.info(`Tool unregistered: ${toolId}`);
    return true;
  }

  getTool(toolId: string): ITool | null {
    return this.tools.get(toolId)?.tool || null;
  }

  getToolByName(name: string): ITool | null {
    for (const registration of this.tools.values()) {
      if (registration.tool.name === name) {
        return registration.tool;
      }
    }
    return null;
  }

  listTools(enabledOnly: boolean = false): ToolDefinition[] {
    const list: ToolDefinition[] = [];

    for (const registration of this.tools.values()) {
      if (!enabledOnly || registration.enabled) {
        list.push(registration.tool.schema);
      }
    }

    // Also include MCP tools
    for (const client of this.mcpClients.values()) {
      if (client.status === 'connected') {
        list.push(
          ...client.tools.map((tool) =>
            this.toolSpecToDefinition(this.normalizeMCPTool(client, tool))
          )
        );
      }
    }

    return list;
  }

  describeTool(name: string): {
    id: string;
    name: string;
    description: string;
    inputSchema: ToolDefinition['inputSchema'];
    outputSchema?: HyphaToolSpec['outputSchema'];
    source: 'local' | 'mcp';
    sideEffectLevel: HyphaToolSpec['sideEffectLevel'];
    permissionScope?: HyphaToolSpec['permissionScope'];
    preconditions?: HyphaToolSpec['preconditions'];
    postconditions?: HyphaToolSpec['postconditions'];
    timeoutPolicy?: HyphaToolSpec['timeoutPolicy'];
    retryPolicy?: HyphaToolSpec['retryPolicy'];
    auditPolicy?: HyphaToolSpec['auditPolicy'];
    humanApprovalPolicy?: HyphaToolSpec['humanApprovalPolicy'];
    serverId?: string;
    capabilityId?: string;
  } | null {
    const localTool = this.getToolByName(name);
    if (localTool) {
      const governance = localTool.governance;
      return {
        id: localTool.id,
        name: localTool.name,
        description: localTool.description,
        inputSchema: localTool.schema.inputSchema,
        outputSchema: governance?.outputSchema,
        source: 'local',
        sideEffectLevel: governance?.sideEffectLevel ?? 'read',
        permissionScope: governance?.permissionScope,
        preconditions: governance?.preconditions,
        postconditions: governance?.postconditions,
        timeoutPolicy: governance?.timeoutPolicy,
        retryPolicy: governance?.retryPolicy,
        auditPolicy: governance?.auditPolicy,
        humanApprovalPolicy: governance?.humanApprovalPolicy,
      };
    }

    const mcpTool = this.findMCPToolByName(name);
    if (mcpTool) {
      const normalized = mcpTool.spec;
      return {
        id: normalized.id,
        name: normalized.id,
        description: normalized.description,
        inputSchema: this.asObjectInputSchema(normalized.inputSchema),
        outputSchema: normalized.outputSchema,
        source: 'mcp',
        sideEffectLevel: normalized.sideEffectLevel,
        permissionScope: normalized.permissionScope,
        serverId: normalized.sourceRef?.serverId,
        capabilityId: normalized.sourceRef?.capabilityId,
      };
    }

    return null;
  }

  async executeTool(name: string, params: ToolParams): Promise<ToolResult> {
    // First check local tools
    const localTool = this.getToolByName(name);
    if (localTool) {
      return localTool.execute(params);
    }

    // Then check MCP tools
    const mcpTool = this.findMCPToolByName(name);
    if (mcpTool) {
      return mcpTool.client.callTool(mcpTool.tool.name, params);
    }

    return { success: false, error: `Tool not found: ${name}` };
  }

  async registerMCPServer(config: MCPServerConfig): Promise<void> {
    const client =
      config.mode === 'local'
        ? new LocalMCPClient(config)
        : config.mode === 'remote'
          ? new RemoteMCPClient(config)
          : new FixtureMCPClient(config);

    this.mcpClients.set(config.id, client);

    if (config.autoStart || config.autoConnect) {
      try {
        await client.connect();
      } catch (error) {
        logger.error(`Failed to auto-connect MCP server ${config.id}:`, error);
      }
    }

    logger.info(`MCP server registered: ${config.id} (${config.mode})`);
  }

  async disconnectMCPServer(serverId: string): Promise<void> {
    const client = this.mcpClients.get(serverId);
    if (client) {
      await client.disconnect();
    }
  }

  getMCPClient(serverId: string): MCPClient | null {
    return this.mcpClients.get(serverId) || null;
  }

  listNormalizedMCPTools(): Array<{
    serverId: string;
    serverName: string;
    tools: HyphaToolSpec[];
  }> {
    return Array.from(this.mcpClients.values())
      .filter((client) => client.status === 'connected')
      .map((client) => ({
        serverId: client.id,
        serverName: client.name,
        tools: client.tools.map((tool) => this.normalizeMCPTool(client, tool)),
      }));
  }

  listMCPClients(): Array<{ id: string; name: string; status: string; toolCount: number }> {
    return Array.from(this.mcpClients.values()).map((client) => ({
      id: client.id,
      name: client.name,
      status: client.status,
      toolCount: client.tools.length,
    }));
  }

  async healthCheck(): Promise<Record<string, boolean>> {
    const health: Record<string, boolean> = {};

    for (const [id, client] of this.mcpClients) {
      health[id] = await client.healthCheck();
    }

    return health;
  }

  private normalizeMCPTool(client: MCPClient, tool: ToolDefinition): HyphaToolSpec {
    return normalizeMCPToolSpec(this.toMCPCapabilityDescriptor(client, tool));
  }

  private findMCPToolByName(name: string): MCPToolResolution | null {
    for (const client of this.mcpClients.values()) {
      if (client.status !== 'connected') continue;
      for (const tool of client.tools) {
        const spec = this.normalizeMCPTool(client, tool);
        const candidateNames = new Set([tool.name, spec.id, spec.name].filter(Boolean));
        if (candidateNames.has(name)) {
          return { client, tool, spec };
        }
      }
    }
    return null;
  }

  private toMCPCapabilityDescriptor(
    client: MCPClient,
    tool: ToolDefinition
  ): MCPCapabilityDescriptor {
    const metadata = (tool.metadata ?? {}) as MCPToolMetadata;
    const sourceRef = metadata.sourceRef ?? {};
    const serverId = sourceRef.serverId ?? client.id;
    const capabilityId = sourceRef.capabilityId ?? tool.name;
    const publicName = `${serverId}.${capabilityId}`;
    return {
      id: publicName,
      version: metadata.version ?? '0.0.0',
      serverId,
      capabilityId,
      type: 'tool',
      name: publicName,
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
      sideEffectLevel: metadata.sideEffectLevel ?? 'read',
      permissionScope: metadata.permissionScope,
      trustLevel: metadata.trustLevel ?? 'reviewed',
    };
  }

  private toolSpecToDefinition(spec: HyphaToolSpec): ToolDefinition {
    return {
      name: spec.source === 'mcp' ? spec.id : spec.name ?? spec.id,
      description: spec.description,
      inputSchema: this.asObjectInputSchema(spec.inputSchema),
      outputSchema: spec.outputSchema as Record<string, any> | undefined,
      metadata: {
        source: spec.source,
        sourceRef: spec.sourceRef,
        sideEffectLevel: spec.sideEffectLevel,
        permissionScope: spec.permissionScope,
      },
    };
  }

  private asObjectInputSchema(schema: HyphaToolSpec['inputSchema']): ToolDefinition['inputSchema'] {
    return {
      ...(schema as Record<string, any>),
      type: 'object',
      properties: schema.properties as Record<string, any> | undefined,
      required: schema.required,
    };
  }
}

// Singleton instance
let toolManagerInstance: ToolManager | null = null;

export function getToolManager(): ToolManager {
  if (!toolManagerInstance) {
    toolManagerInstance = new ToolManager();
  }
  return toolManagerInstance;
}

export async function initializeToolManager(): Promise<ToolManager> {
  const manager = getToolManager();
  await manager.initialize();
  return manager;
}

export async function destroyToolManager(): Promise<void> {
  if (toolManagerInstance) {
    await toolManagerInstance.destroy();
    toolManagerInstance = null;
  }
}

export default ToolManager;
