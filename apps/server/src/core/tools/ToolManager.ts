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
import { createUtilityTools } from './builtins/UtilityTools';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../../utils/logger';
import { EnvironmentSecretResolver } from '../../services/SecretResolver';
import { InMemoryTelemetryRecorder } from '@hypha/core';
import { filesystemToolConfig, getConfig, storageConfig } from '../../config';
import {
  FileMCPCapabilityCatalogStore,
  FileToolContractSnapshotStore,
  LocalWorkspaceRuntime,
} from '@hypha/adapters-local';
import {
  classicMCPCapabilityDescriptors,
  createClassicMCPMockGateway,
  normalizeMCPToolSpec,
  MCPConnectionManager,
  SDKMCPConnectionSessionFactory,
  MCPCapabilityCatalog,
  RedisMCPCapabilityCatalogStore,
  RedisToolContractSnapshotStore,
  type MCPCapabilityCatalogStore,
  type MCPCapabilityRecord,
  type MCPCapabilityDescriptor,
  type MCPGateway,
} from '@hypha/mcp';
import {
  LocalFunctionToolAdapter,
  MCPToolAdapter,
  ToolRegistry,
  type ToolAdapter,
  type ToolSpec as HyphaToolSpec,
  type ToolContractSnapshotStore,
} from '@hypha/tools';
import { getRedisClient } from '../../services/database';

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

function resolveConfiguredPath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

class ManagedMCPClient implements MCPClient {
  status: MCPClient['status'] = 'disconnected';
  tools: ToolDefinition[] = [];

  constructor(
    readonly id: string,
    readonly name: string,
    private readonly manager: MCPConnectionManager
  ) {}

  async connect(): Promise<void> {
    this.status = 'connecting';
    try {
      await this.manager.connect(this.id);
      await this.refreshTools();
      this.status = 'connected';
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.manager.disconnect(this.id, 'server-tool-manager');
    this.status = 'disconnected';
    this.tools = [];
  }

  async invoke(name: string, args: any): Promise<ToolResult> {
    void name;
    void args;
    return {
      success: false,
      error: 'Managed MCP tools must be invoked through the approved capability registry.',
    };
  }

  async listTools(): Promise<ToolDefinition[]> {
    if (this.status !== 'connected') return [];
    return this.refreshTools();
  }

  async healthCheck(): Promise<boolean> {
    const status = await this.manager.status(this.id);
    return status.health.status === 'healthy';
  }

  private async refreshTools(): Promise<ToolDefinition[]> {
    const descriptors = await this.manager.discover({
      id: `server.${this.id}`,
      version: '1.0.0',
      servers: [{ id: this.id, mode: 'remote' }],
    });
    this.tools = descriptors
      .filter((descriptor) => descriptor.type === 'tool')
      .map((descriptor) => ({
        name: descriptor.capabilityId,
        description: descriptor.description ?? '',
        inputSchema: {
          ...(descriptor.inputSchema as Record<string, any>),
          type: 'object',
        },
        outputSchema: descriptor.outputSchema as Record<string, any> | undefined,
        metadata: {
          sourceRef: {
            serverId: descriptor.serverId,
            capabilityId: descriptor.capabilityId,
          },
          sideEffectLevel: descriptor.sideEffectLevel,
          permissionScope: descriptor.permissionScope,
          trustLevel: descriptor.trustLevel,
          version: descriptor.version,
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

  async invoke(name: string, args: any): Promise<ToolResult> {
    if (this.status !== 'connected') {
      return { success: false, error: 'Fixture MCP client not connected' };
    }
    const capability = this.resolveCapability(name);
    if (!capability) {
      return { success: false, error: `MCP fixture tool not found: ${name}` };
    }
    try {
      const output = await this.gateway.call({
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
  private readonly secretResolver = new EnvironmentSecretResolver();
  private readonly mcpTelemetry = new InMemoryTelemetryRecorder();
  private readonly connectionManager = new MCPConnectionManager({
    sessionFactory: new SDKMCPConnectionSessionFactory({
      resolveAuthorizationRef: (ref) => this.secretResolver.resolveAuthorization(ref),
    }),
    telemetry: this.mcpTelemetry,
  });
  private readonly mcpCatalogs = new Map<string, MCPCapabilityCatalog>();
  private readonly mcpServerModes = new Map<string, MCPServerConfig['mode']>();
  private readonly approvedMCPRegistry = new ToolRegistry();
  private mcpCatalogStore: MCPCapabilityCatalogStore = new FileMCPCapabilityCatalogStore(
    process.env.HYPHA_MCP_CATALOG_STORE ??
      path.resolve(process.cwd(), 'data/runtime/mcp-capability-catalog.json')
  );
  private mcpSnapshotStore: ToolContractSnapshotStore = new FileToolContractSnapshotStore(
    process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT ??
      `${resolveConfiguredPath(storageConfig().relational.sqlite.eventDbPath)}.tool-snapshots`
  );

  async initialize(): Promise<void> {
    const config = getConfig();

    if (process.env.NODE_ENV === 'production') {
      const redis = getRedisClient();
      if (!redis) {
        throw new Error('Production MCP governance requires the shared Redis store.');
      }
      this.mcpCatalogStore = new RedisMCPCapabilityCatalogStore(redis);
      this.mcpSnapshotStore = new RedisToolContractSnapshotStore(redis);
    }

    // 1. Register built-in tool implementations.
    const filesystemConfig = filesystemToolConfig();
    const workspaceRuntime = new LocalWorkspaceRuntime(filesystemConfig);
    await workspaceRuntime.initialize();
    const builtinTools: ITool[] = [
      new FilesystemTool(workspaceRuntime, filesystemConfig),
      new SearchTool(),
      ...createUtilityTools(),
    ];
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
    this.mcpServerModes.clear();
    for (const spec of this.approvedMCPRegistry.list()) {
      this.approvedMCPRegistry.unregister(spec.id);
    }
    await this.connectionManager.closeAll();

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

    for (const spec of this.approvedMCPRegistry.list()) {
      const client = spec.sourceRef?.serverId
        ? this.mcpClients.get(spec.sourceRef.serverId)
        : undefined;
      if (client?.status === 'connected') list.push(this.toolSpecToDefinition(spec));
    }

    // Fixture servers are deterministic test-only gateways and do not have a catalog.
    for (const client of this.fixtureMCPClients()) {
      if (client.status !== 'connected') continue;
      list.push(
        ...client.tools.map((tool) => this.toolSpecToDefinition(this.normalizeMCPTool(client, tool)))
      );
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

    const approved = this.findApprovedMCPTool(name);
    if (approved) {
      const normalized = approved.spec;
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

    const mcpTool = this.findFixtureMCPToolByName(name);
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

  resolveGovernedTool(nameOrId: string): { spec: HyphaToolSpec; adapter: ToolAdapter } | null {
    const localTool = this.getTool(nameOrId) ?? this.getToolByName(nameOrId);
    if (localTool) {
      const governance = localTool.governance;
      const spec: HyphaToolSpec = {
        id: localTool.id,
        version: '0.0.0',
        name: localTool.name,
        description: localTool.description,
        inputSchema: localTool.schema.inputSchema,
        outputSchema: governance?.outputSchema ?? localTool.schema.outputSchema,
        sideEffectLevel: governance?.sideEffectLevel ?? 'read',
        permissionScope: governance?.permissionScope,
        preconditions: governance?.preconditions,
        postconditions: governance?.postconditions,
        timeoutPolicy: governance?.timeoutPolicy,
        retryPolicy: governance?.retryPolicy,
        auditPolicy: governance?.auditPolicy,
        humanApprovalPolicy: governance?.humanApprovalPolicy,
        source: 'local',
      };
      return {
        spec,
        adapter: new LocalFunctionToolAdapter(`server-local:${localTool.id}`, async (input) => {
          const result = await localTool.execute(input as ToolParams);
          if (!result.success) {
            const error = new Error(result.error ?? `Tool failed: ${localTool.id}`);
            const code = result.metadata?.errorCode;
            if (typeof code === 'string') Object.assign(error, { code });
            throw error;
          }
          return result.output;
        }),
      };
    }

    const approved = this.findApprovedMCPTool(nameOrId);
    if (approved) return approved;

    const mcpTool = this.findFixtureMCPToolByName(nameOrId);
    if (mcpTool) {
      const serverId = mcpTool.spec.sourceRef?.serverId ?? mcpTool.client.id;
      const capabilityId = mcpTool.spec.sourceRef?.capabilityId ?? mcpTool.tool.name;
      return {
        spec: mcpTool.spec,
        adapter: new MCPToolAdapter(`server-mcp:${serverId}`, serverId, capabilityId, {
          invoke: async ({ input }) => {
            const result = await mcpTool.client.invoke(mcpTool.tool.name, input);
            if (!result.success) {
              throw new Error(result.error ?? `MCP Tool failed: ${mcpTool.spec.id}`);
            }
            return result.output;
          },
          health: async () => ({
            status: (await mcpTool.client.healthCheck()) ? 'healthy' : 'unhealthy',
            checkedAt: new Date().toISOString(),
          }),
        }),
      };
    }

    return null;
  }

  async registerMCPServer(config: MCPServerConfig): Promise<void> {
    this.mcpServerModes.set(config.id, config.mode);
    if (config.mode !== 'fixture') {
      this.connectionManager.register({
        id: config.id,
        displayName: config.name,
        mode: config.mode,
        transport:
          config.mode === 'local'
            ? {
                type: 'stdio',
                command: config.command ?? '',
                args: config.args,
                envAllowList: ['PATH'],
                stderrMode: 'capture',
              }
            : {
                type: 'streamable_http',
                endpoint: config.endpoint ?? '',
                authorizationRef: config.credentialRef,
                sessionMode: 'protocol_default',
              },
        singleStart: true,
        initializationTimeoutMs: 10_000,
        requestTimeoutMs: 30_000,
        shutdownTimeoutMs: 5_000,
        reconnectPolicy: { maxAttempts: 3, backoffMs: 250 },
        egressPolicy:
          config.mode === 'remote' ? { requireTls: true, denyPrivateNetworks: true } : undefined,
        requestGuardPolicy: {
          maxConcurrentRequests: 8,
          rateLimit: { maxRequests: 120, windowMs: 60_000 },
          circuitBreaker: { failureThreshold: 5, resetAfterMs: 30_000 },
        },
      });
      const catalog = new MCPCapabilityCatalog({
        integration: {
          id: `server.${config.id}`,
          version: '1.0.0',
          servers: [{ id: config.id, mode: config.mode }],
        },
        gateway: this.connectionManager,
        trustPolicy: {
          defaultTrustLevel: 'restricted',
          requireApprovalForNewCapability: true,
          requireApprovalForSchemaChange: true,
          allowServerDeclaredSideEffectHints: false,
          pinServerIdentity: true,
          pinProtocolVersion: true,
          pinCapabilityHashes: true,
        },
        driftPolicy: {
          onDescriptionChange: 'snapshot_next_run',
          onSchemaChange: 'require_approval',
          onRemoval: 'allow_existing_run',
          onServerIdentityChange: 'quarantine',
          notifyRuntime: true,
          invalidateSchemaCache: true,
        },
        store: this.mcpCatalogStore,
        snapshotStore: this.mcpSnapshotStore,
        telemetry: this.mcpTelemetry,
      });
      catalog.bindConnectionManager(this.connectionManager);
      this.mcpCatalogs.set(config.id, catalog);
    }
    const client =
      config.mode === 'fixture'
        ? new FixtureMCPClient(config)
        : new ManagedMCPClient(config.id, config.name, this.connectionManager);

    this.mcpClients.set(config.id, client);

    if (config.autoStart || config.autoConnect) {
      try {
        await client.connect();
        await this.mcpCatalogs.get(config.id)?.refresh(config.id, 'server-auto-connect');
        await this.syncApprovedMCPTools(config.id);
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
      this.removeApprovedMCPTools(serverId);
    }
  }

  async connectMCPServer(serverId: string): Promise<void> {
    const client = this.mcpClients.get(serverId);
    if (!client) throw new Error(`MCP server not found: ${serverId}`);
    await client.connect();
    await this.mcpCatalogs.get(serverId)?.refresh(serverId, 'server-connect-command');
    await this.syncApprovedMCPTools(serverId);
  }

  async listMCPCapabilities(): Promise<MCPCapabilityRecord[]> {
    const records = await Promise.all(
      Array.from(this.mcpCatalogs.values()).map((catalog) =>
        catalog.list({ loadDescriptors: false })
      )
    );
    return records.flat();
  }

  async listMCPContextCapabilities(
    serverId: string,
    kind: 'resource' | 'prompt'
  ): Promise<MCPCapabilityRecord[]> {
    const catalog = this.mcpCatalogs.get(serverId);
    if (!catalog) throw new Error(`MCP server not found: ${serverId}`);
    return catalog.list({
      serverId,
      kind,
      states: ['approved'],
      loadDescriptors: true,
    });
  }

  async readMCPResource(serverId: string, uri: string, runId: string): Promise<unknown> {
    await this.requireApprovedMCPContextCapability(serverId, uri, 'resource');
    return this.connectionManager.readResource({
      serverId,
      uri,
      context: {
        runId,
        stepId: `mcp:resource:${serverId}`,
        invocationId: `mcp-resource:${serverId}:${Date.now()}`,
      },
    });
  }

  async renderMCPPrompt(
    serverId: string,
    name: string,
    args: Record<string, string>,
    runId: string
  ): Promise<unknown> {
    await this.requireApprovedMCPContextCapability(serverId, name, 'prompt');
    return this.connectionManager.getPrompt({
      serverId,
      name,
      arguments: args,
      context: {
        runId,
        stepId: `mcp:prompt:${serverId}`,
        invocationId: `mcp-prompt:${serverId}:${Date.now()}`,
      },
    });
  }

  private async requireApprovedMCPContextCapability(
    serverId: string,
    capabilityId: string,
    kind: 'resource' | 'prompt'
  ): Promise<void> {
    const catalog = this.mcpCatalogs.get(serverId);
    if (!catalog) throw new Error(`MCP server not found: ${serverId}`);
    const capability = await catalog.getCapability({ serverId, capabilityId, kind });
    const approvalExpired =
      capability?.approvalExpiresAt !== undefined &&
      Date.parse(capability.approvalExpiresAt) <= Date.now();
    if (!capability || capability.driftState !== 'approved' || approvalExpired) {
      throw Object.assign(new Error(`MCP ${kind} is unavailable or awaiting approval.`), {
        code: 'MCP_CAPABILITY_QUARANTINED',
      });
    }
  }

  async listMCPDrifts(): Promise<MCPCapabilityRecord[]> {
    return (await this.listMCPCapabilities()).filter(
      (record) =>
        record.driftState === 'changed' ||
        record.driftState === 'quarantined' ||
        record.driftState === 'removed'
    );
  }

  async approveMCPCapability(request: {
    serverId: string;
    capabilityId: string;
    capabilityHash?: string;
    approvedBy: string;
    restrictions?: string[];
    expiresAt?: string;
  }): Promise<void> {
    const catalog = this.mcpCatalogs.get(request.serverId);
    if (!catalog) throw new Error(`MCP server not found: ${request.serverId}`);
    await catalog.approveRevision(request);
    await this.syncApprovedMCPTools(request.serverId);
  }

  async quarantineMCPCapability(request: {
    serverId: string;
    capabilityId: string;
    capabilityHash?: string;
    reason: string;
  }): Promise<void> {
    const catalog = this.mcpCatalogs.get(request.serverId);
    if (!catalog) throw new Error(`MCP server not found: ${request.serverId}`);
    await catalog.quarantine(request);
    await this.syncApprovedMCPTools(request.serverId);
  }

  hasMCPServer(serverId: string): boolean {
    return this.mcpClients.has(serverId);
  }

  async getMCPServerStatus(serverId: string): Promise<{
    id: string;
    name: string;
    status: MCPClient['status'];
    healthy: boolean;
    toolCount: number;
  } | null> {
    const client = this.mcpClients.get(serverId);
    if (!client) return null;
    return {
      id: client.id,
      name: client.name,
      status: client.status,
      healthy: await client.healthCheck(),
      toolCount: this.mcpToolCount(serverId, client),
    };
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
        tools:
          this.mcpServerModes.get(client.id) === 'fixture'
            ? client.tools.map((tool) => this.normalizeMCPTool(client, tool))
            : this.approvedMCPRegistry
                .list()
                .filter((spec) => spec.sourceRef?.serverId === client.id),
      }));
  }

  listMCPClients(): Array<{ id: string; name: string; status: string; toolCount: number }> {
    return Array.from(this.mcpClients.values()).map((client) => ({
      id: client.id,
      name: client.name,
      status: client.status,
      toolCount: this.mcpToolCount(client.id, client),
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

  private findApprovedMCPTool(
    name: string
  ): { spec: HyphaToolSpec; adapter: ToolAdapter } | null {
    for (const spec of this.approvedMCPRegistry.list()) {
      const candidateNames = new Set(
        [spec.id, spec.name, spec.sourceRef?.capabilityId].filter(
          (value): value is string => typeof value === 'string' && value.length > 0
        )
      );
      if (!candidateNames.has(name)) continue;
      const resolved = this.approvedMCPRegistry.resolve({
        id: spec.id,
        version: spec.version,
        revision: spec.revision,
      });
      if (resolved) return resolved;
    }
    return null;
  }

  private findFixtureMCPToolByName(name: string): MCPToolResolution | null {
    for (const client of this.fixtureMCPClients()) {
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

  private fixtureMCPClients(): MCPClient[] {
    return Array.from(this.mcpClients.values()).filter(
      (client) => this.mcpServerModes.get(client.id) === 'fixture'
    );
  }

  private removeApprovedMCPTools(serverId: string): void {
    for (const spec of this.approvedMCPRegistry.list()) {
      if (spec.sourceRef?.serverId === serverId) this.approvedMCPRegistry.unregister(spec.id);
    }
  }

  private async syncApprovedMCPTools(serverId: string): Promise<void> {
    const catalog = this.mcpCatalogs.get(serverId);
    if (!catalog) return;
    this.removeApprovedMCPTools(serverId);
    const approved = await catalog.list({
      serverId,
      kind: 'tool',
      states: ['approved'],
      loadDescriptors: true,
    });
    if (approved.length === 0) return;
    await catalog.importTools(
      this.approvedMCPRegistry,
      approved.map((record) => ({
        serverId: record.serverId,
        capabilityId: record.remoteName,
        capabilityHash: record.capabilityHash,
        kind: 'tool' as const,
      }))
    );
  }

  private mcpToolCount(serverId: string, client: MCPClient): number {
    if (this.mcpServerModes.get(serverId) === 'fixture') return client.tools.length;
    return this.approvedMCPRegistry
      .list()
      .filter((spec) => spec.sourceRef?.serverId === serverId).length;
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
      name: spec.source === 'mcp' ? spec.id : (spec.name ?? spec.id),
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
