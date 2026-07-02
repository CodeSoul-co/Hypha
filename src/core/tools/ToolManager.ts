import { ITool, ToolDefinition, ToolParams, ToolResult, ToolRegistration, MCPServerConfig, MCPClient } from './types';
import { BaseTool } from './types';
import FilesystemTool from './builtins/FilesystemTool';
import SearchTool from './builtins/SearchTool';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../../utils/logger';
import { getConfig } from '../../config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import axios from 'axios';

// Built-in tool constructors — registered in initialize(), then enabled/disabled
// based on configs/tools.yaml.
const BUILTIN_TOOL_CTORS: Array<new () => ITool> = [
  FilesystemTool,
  SearchTool,
];

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

      this.client = new Client({
        name: 'hypha',
        version: '1.0.0',
      }, {
        capabilities: {
          tools: {},
        },
      });

      await this.client.connect(transport);
      this.status = 'connected';

      // List available tools
      await this.listTools();

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
      const response = await this.client.listTools();
      this.tools = response.tools.map((tool: any) => ({
        name: tool.name,
        description: tool.description || '',
        inputSchema: tool.inputSchema || { type: 'object' },
      }));
      return this.tools;
    } catch (error) {
      logger.error(`Failed to list tools from ${this.name}:`, error);
      return [];
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.listTools();
      return true;
    } catch {
      return false;
    }
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
      // Verify connection by listing tools
      await this.listTools();
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
      const headers: Record<string, string> = {};
      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      const response = await axios.get(`${this.baseUrl}/tools`, {
        headers,
        timeout: 10000,
      });

      this.tools = response.data.tools || [];
      return this.tools;
    } catch (error) {
      logger.error(`Failed to list tools from remote MCP ${this.name}:`, error);
      return [];
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.listTools();
      return true;
    } catch {
      return false;
    }
  }
}

export class ToolManager {
  private tools: Map<string, ToolRegistration> = new Map();
  private mcpClients: Map<string, MCPClient> = new Map();

  async initialize(): Promise<void> {
    const config = getConfig();

    // 1. Register built-in tool implementations.
    for (const Ctor of BUILTIN_TOOL_CTORS) {
      try {
        await this.register(new Ctor());
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
      const parsed = yaml.load(fs.readFileSync(abs, 'utf-8')) as
        | { tools?: Array<{ id: string; enabled?: boolean }> }
        | null;
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
        list.push(...client.tools);
      }
    }

    return list;
  }

  async executeTool(name: string, params: ToolParams): Promise<ToolResult> {
    // First check local tools
    const localTool = this.getToolByName(name);
    if (localTool) {
      return localTool.execute(params);
    }

    // Then check MCP tools
    for (const client of this.mcpClients.values()) {
      if (client.status === 'connected') {
        const tool = client.tools.find(t => t.name === name);
        if (tool) {
          return client.callTool(name, params);
        }
      }
    }

    return { success: false, error: `Tool not found: ${name}` };
  }

  async registerMCPServer(config: MCPServerConfig): Promise<void> {
    const client = config.mode === 'local'
      ? new LocalMCPClient(config)
      : new RemoteMCPClient(config);

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

  listMCPClients(): Array<{ id: string; name: string; status: string; toolCount: number }> {
    return Array.from(this.mcpClients.values()).map(client => ({
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
