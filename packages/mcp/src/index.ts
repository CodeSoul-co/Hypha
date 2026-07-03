import { z, type ZodType } from 'zod';
import {
  createFrameworkEvent,
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  sideEffectLevelSchema,
  specMetadataSchema,
  versionedSpecSchema,
  type JsonSchema,
  type SideEffectLevel,
  type SpecMetadata,
  type TraceRecorder,
  type VersionedSpec,
} from '@hypha/core';
import type { ToolCallContext, ToolRegistry, ToolSpec } from '@hypha/tools';

export interface MCPIntegrationSpec {
  id: string;
  version: string;
  servers: MCPServerSpec[];
  allowedCapabilities?: string[];
  deniedCapabilities?: string[];
  trustPolicy?: string;
  importPolicy?: string;
  resourcePolicy?: string;
  toolPolicy?: string;
  promptPolicy?: string;
  versionPinning?: boolean;
  capabilityHashing?: boolean;
}

export interface MCPServerSpec {
  id: string;
  mode: 'local' | 'remote';
  version?: string;
  endpoint?: string;
  command?: string;
  args?: string[];
}

export interface MCPCapabilityDescriptor extends VersionedSpec, SpecMetadata {
  serverId: string;
  capabilityId: string;
  type: 'tool' | 'resource' | 'prompt';
  inputSchema?: JsonSchema;
  outputSchema?: JsonSchema;
  sideEffectLevel?: SideEffectLevel;
  permissionScope?: string[];
  capabilityHash?: string;
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}

export interface NormalizedMCPCapability {
  serverId: string;
  capabilityId: string;
  type: 'tool' | 'resource' | 'prompt';
  normalizedSpecId: string;
  capabilityHash?: string;
  sideEffectLevel?: SideEffectLevel;
}

export interface MCPToolCallRequest<TInput = unknown> {
  serverId: string;
  capabilityId: string;
  input: TInput;
  context: ToolCallContext;
}

export type MCPToolHandler<TInput = unknown, TOutput = unknown> = (
  request: MCPToolCallRequest<TInput>
) => Promise<TOutput> | TOutput;

export interface MCPGateway {
  discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
  normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
  callTool?(request: MCPToolCallRequest): Promise<unknown>;
}

export class MockMCPGateway implements MCPGateway {
  private readonly handlers = new Map<string, MCPToolHandler>();

  constructor(private readonly capabilities: MCPCapabilityDescriptor[] = []) {}

  registerToolHandler(serverId: string, capabilityId: string, handler: MCPToolHandler): void {
    this.handlers.set(this.toolKey(serverId, capabilityId), handler);
  }

  async discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]> {
    const allowed = new Set(integration.allowedCapabilities ?? []);
    const denied = new Set(integration.deniedCapabilities ?? []);
    return this.capabilities.filter((capability) => {
      if (!integration.servers.some((server) => server.id === capability.serverId)) return false;
      if (denied.has(capability.capabilityId)) return false;
      if (allowed.size > 0 && !allowed.has(capability.capabilityId)) return false;
      return true;
    });
  }

  async normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability> {
    return {
      serverId: capability.serverId,
      capabilityId: capability.capabilityId,
      type: capability.type,
      normalizedSpecId: `${capability.serverId}:${capability.type}:${capability.capabilityId}`,
      capabilityHash: capability.capabilityHash,
      sideEffectLevel: capability.sideEffectLevel,
    };
  }

  async callTool(request: MCPToolCallRequest): Promise<unknown> {
    const handler = this.handlers.get(this.toolKey(request.serverId, request.capabilityId));
    if (handler) {
      return handler(request);
    }
    return {
      serverId: request.serverId,
      capabilityId: request.capabilityId,
      input: request.input,
      ok: true,
    };
  }

  private toolKey(serverId: string, capabilityId: string): string {
    return `${serverId}:${capabilityId}`;
  }
}

export interface ClassicMCPFetchResponse {
  status?: number;
  headers?: Record<string, string>;
  body?: string;
  json?: unknown;
}

export interface ClassicMCPSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ClassicMCPMockGatewayOptions {
  files?: Record<string, string>;
  fetchResponses?: Record<string, ClassicMCPFetchResponse>;
  now?: string;
  searchResults?: Record<string, ClassicMCPSearchResult[]>;
}

export const classicMCPIntegrationSpec: MCPIntegrationSpec = {
  id: 'mcp.classic.local',
  version: '0.0.0',
  servers: [
    { id: 'filesystem', mode: 'local', command: 'mcp-server-filesystem', args: ['./data/mcp'] },
    { id: 'fetch', mode: 'local', command: 'mcp-server-fetch' },
    { id: 'time', mode: 'local', command: 'mcp-server-time' },
    { id: 'search', mode: 'remote', endpoint: 'https://example.invalid/mcp/search' },
  ],
  allowedCapabilities: ['read_file', 'fetch', 'now', 'web_search'],
  trustPolicy: 'trusted local test fixture',
  importPolicy: 'tools-only',
  toolPolicy: 'read-only capabilities may execute without human review',
  versionPinning: true,
  capabilityHashing: true,
};

export const classicMCPCapabilityDescriptors: MCPCapabilityDescriptor[] = [
  {
    id: 'mcp.classic.filesystem.read_file',
    version: '0.0.0',
    name: 'filesystem.read_file',
    description: 'Read a file from a sandboxed MCP filesystem server.',
    serverId: 'filesystem',
    capabilityId: 'read_file',
    type: 'tool',
    inputSchema: {
      type: 'object',
      required: ['path'],
      additionalProperties: false,
      properties: {
        path: { type: 'string' },
      },
    },
    outputSchema: {
      type: 'object',
      required: ['path', 'content'],
      properties: {
        path: { type: 'string' },
        content: { type: 'string' },
        bytes: { type: 'number' },
      },
    },
    sideEffectLevel: 'read',
    permissionScope: ['filesystem.read'],
    capabilityHash: 'sha256:classic-filesystem-read-file',
    trustLevel: 'reviewed',
  },
  {
    id: 'mcp.classic.fetch.fetch',
    version: '0.0.0',
    name: 'fetch.fetch',
    description: 'Fetch a URL through an MCP network reader.',
    serverId: 'fetch',
    capabilityId: 'fetch',
    type: 'tool',
    inputSchema: {
      type: 'object',
      required: ['url'],
      additionalProperties: false,
      properties: {
        url: { type: 'string' },
      },
    },
    outputSchema: {
      type: 'object',
      required: ['url', 'status'],
      properties: {
        url: { type: 'string' },
        status: { type: 'number' },
        headers: { type: 'object' },
        body: { type: 'string' },
        json: {},
      },
    },
    sideEffectLevel: 'read',
    permissionScope: ['network.read'],
    capabilityHash: 'sha256:classic-fetch-fetch',
    trustLevel: 'reviewed',
  },
  {
    id: 'mcp.classic.time.now',
    version: '0.0.0',
    name: 'time.now',
    description: 'Return the current time from an MCP time server.',
    serverId: 'time',
    capabilityId: 'now',
    type: 'tool',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        timezone: { type: 'string' },
      },
    },
    outputSchema: {
      type: 'object',
      required: ['now', 'timezone'],
      properties: {
        now: { type: 'string' },
        timezone: { type: 'string' },
      },
    },
    sideEffectLevel: 'read',
    permissionScope: ['time.read'],
    capabilityHash: 'sha256:classic-time-now',
    trustLevel: 'reviewed',
  },
  {
    id: 'mcp.classic.search.web_search',
    version: '0.0.0',
    name: 'search.web_search',
    description: 'Run a web-search query through an MCP search server.',
    serverId: 'search',
    capabilityId: 'web_search',
    type: 'tool',
    inputSchema: {
      type: 'object',
      required: ['query'],
      additionalProperties: false,
      properties: {
        query: { type: 'string' },
        limit: { type: 'integer', minimum: 1, maximum: 10 },
      },
    },
    outputSchema: {
      type: 'object',
      required: ['query', 'items'],
      properties: {
        query: { type: 'string' },
        count: { type: 'number' },
        provider: { type: 'string' },
        note: { type: 'string' },
        items: { type: 'array', items: { type: 'object' } },
      },
    },
    sideEffectLevel: 'read',
    permissionScope: ['web.search'],
    capabilityHash: 'sha256:classic-search-web-search',
    trustLevel: 'reviewed',
  },
];

export function createClassicMCPMockGateway(
  options: ClassicMCPMockGatewayOptions = {}
): MockMCPGateway {
  const gateway = new MockMCPGateway(classicMCPCapabilityDescriptors.map(cloneCapability));
  const files: Record<string, string> = {
    '/README.md': '# Hypha\n\nClassic MCP filesystem fixture.\n',
    ...(options.files ?? {}),
  };
  const fetchResponses = options.fetchResponses ?? {};
  const searchResults = options.searchResults ?? {};

  gateway.registerToolHandler('filesystem', 'read_file', ({ input }) => {
    const path = stringField(input, 'path');
    if (!(path in files)) {
      throw new Error(`MCP fixture file not found: ${path}`);
    }
    const content = files[path];
    return {
      path,
      content,
      bytes: Buffer.byteLength(content, 'utf-8'),
    };
  });

  gateway.registerToolHandler('fetch', 'fetch', ({ input }) => {
    const url = stringField(input, 'url');
    validateHttpUrl(url);
    const response = fetchResponses[url] ?? {
      status: 200,
      headers: { 'content-type': 'text/plain' },
      body: `Mock MCP fetch response for ${url}`,
    };
    return {
      url,
      status: response.status ?? 200,
      headers: response.headers ?? {},
      ...(response.body !== undefined ? { body: response.body } : {}),
      ...(response.json !== undefined ? { json: response.json } : {}),
    };
  });

  gateway.registerToolHandler('time', 'now', ({ input }) => {
    const timezone =
      input && typeof input === 'object' && 'timezone' in input
        ? String((input as Record<string, unknown>).timezone)
        : 'UTC';
    return {
      now: options.now ?? new Date().toISOString(),
      timezone,
    };
  });

  gateway.registerToolHandler('search', 'web_search', ({ input }) => {
    const query = stringField(input, 'query');
    const limit =
      input &&
      typeof input === 'object' &&
      typeof (input as Record<string, unknown>).limit === 'number'
        ? Math.min(Math.trunc((input as Record<string, number>).limit), 10)
        : 3;
    const items =
      searchResults[query] ??
      Array.from({ length: Math.min(limit, 3) }, (_value, index) => ({
        title: `MCP fixture result ${index + 1} for ${query}`,
        url: `https://example.com/mcp-search?q=${encodeURIComponent(query)}&i=${index + 1}`,
        snippet: 'Deterministic MCP web-search fixture.',
      }));
    return {
      query,
      count: Math.min(items.length, limit),
      provider: 'fixture',
      note: 'classic-mcp-mock',
      items: items.slice(0, limit),
    };
  });

  return gateway;
}

export interface MCPGatewayToolRegistrationContext {
  runId: string;
  stepId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface MCPGatewayToolRegistrationOptions {
  integration: MCPIntegrationSpec;
  gateway: MCPGateway;
  registry: ToolRegistry;
  trace?: TraceRecorder;
  traceContext?: MCPGatewayToolRegistrationContext;
}

export interface MCPGatewayToolRegistrationResult {
  discoveredCapabilities: MCPCapabilityDescriptor[];
  normalizedCapabilities: NormalizedMCPCapability[];
  registeredTools: ToolSpec[];
}

export async function registerMCPGatewayTools(
  options: MCPGatewayToolRegistrationOptions
): Promise<MCPGatewayToolRegistrationResult> {
  const discoveredCapabilities = await options.gateway.discover(options.integration);
  const normalizedCapabilities: NormalizedMCPCapability[] = [];
  const registeredTools: ToolSpec[] = [];

  for (const capability of discoveredCapabilities) {
    await recordMCPGatewayTrace(options, 'mcp.capability.discovered', {
      integrationId: options.integration.id,
      serverId: capability.serverId,
      capabilityId: capability.capabilityId,
      capabilityType: capability.type,
      capabilityHash: capability.capabilityHash,
      sideEffectLevel: capability.sideEffectLevel,
      trustLevel: capability.trustLevel,
    });
    const normalized = await options.gateway.normalize(capability);
    normalizedCapabilities.push(normalized);

    if (capability.type !== 'tool') {
      continue;
    }

    const toolSpec = normalizeMCPToolSpec(capability);
    options.registry.register(toolSpec, async (input, context) => {
      if (!options.gateway.callTool) {
        throw new Error(
          `MCP gateway does not support tool calls: ${capability.serverId}.${capability.capabilityId}`
        );
      }
      return options.gateway.callTool({
        serverId: capability.serverId,
        capabilityId: capability.capabilityId,
        input,
        context,
      });
    });
    registeredTools.push(toolSpec);

    await recordMCPGatewayTrace(options, 'mcp.tool.normalized', {
      integrationId: options.integration.id,
      serverId: capability.serverId,
      capabilityId: capability.capabilityId,
      normalizedSpecId: normalized.normalizedSpecId,
      toolSpecId: toolSpec.id,
      capabilityHash: normalized.capabilityHash,
      sideEffectLevel: toolSpec.sideEffectLevel,
      source: 'mcp',
      sourceRef: toolSpec.sourceRef,
    });
  }

  return {
    discoveredCapabilities,
    normalizedCapabilities,
    registeredTools,
  };
}

export function normalizeMCPToolSpec(capability: MCPCapabilityDescriptor): ToolSpec {
  return {
    id: `${capability.serverId}.${capability.capabilityId}`,
    version: capability.version,
    name: capability.name,
    description: capability.description ?? `MCP capability ${capability.capabilityId}`,
    inputSchema: capability.inputSchema ?? { type: 'object' },
    outputSchema: capability.outputSchema,
    sideEffectLevel: capability.sideEffectLevel ?? 'read',
    permissionScope: capability.permissionScope,
    source: 'mcp',
    sourceRef: {
      serverId: capability.serverId,
      capabilityId: capability.capabilityId,
    },
  };
}

export const mcpServerSpecSchema = z.object({
  id: z.string().min(1),
  mode: z.enum(['local', 'remote']),
  version: z.string().optional(),
  endpoint: z.string().optional(),
  command: z.string().optional(),
  args: z.array(z.string()).optional(),
});

export const mcpIntegrationSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  servers: z.array(mcpServerSpecSchema).min(1),
  allowedCapabilities: z.array(z.string()).optional(),
  deniedCapabilities: z.array(z.string()).optional(),
  trustPolicy: z.string().optional(),
  importPolicy: z.string().optional(),
  resourcePolicy: z.string().optional(),
  toolPolicy: z.string().optional(),
  promptPolicy: z.string().optional(),
  versionPinning: z.boolean().optional(),
  capabilityHashing: z.boolean().optional(),
}) satisfies ZodType<MCPIntegrationSpec>;

export const mcpCapabilityDescriptorSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  serverId: z.string().min(1),
  capabilityId: z.string().min(1),
  type: z.enum(['tool', 'resource', 'prompt']),
  inputSchema: jsonSchemaSchema.optional(),
  outputSchema: jsonSchemaSchema.optional(),
  sideEffectLevel: sideEffectLevelSchema.optional(),
  permissionScope: z.array(z.string()).optional(),
  capabilityHash: z.string().optional(),
  trustLevel: z.enum(['trusted', 'reviewed', 'untrusted']).optional(),
});

export const mcpIntegrationSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'servers'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    servers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'mode'],
        properties: {
          id: { type: 'string' },
          mode: { enum: ['local', 'remote'] },
          version: { type: 'string' },
          endpoint: { type: 'string' },
          command: { type: 'string' },
          args: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    allowedCapabilities: { type: 'array', items: { type: 'string' } },
    deniedCapabilities: { type: 'array', items: { type: 'string' } },
    trustPolicy: { type: 'string' },
    importPolicy: { type: 'string' },
    resourcePolicy: { type: 'string' },
    toolPolicy: { type: 'string' },
    promptPolicy: { type: 'string' },
    versionPinning: { type: 'boolean' },
    capabilityHashing: { type: 'boolean' },
  },
  additionalProperties: false,
};

export const mcpIntegrationSpecExample: MCPIntegrationSpec = {
  id: 'mcp.default',
  version: '0.0.0',
  servers: [
    {
      id: 'local-tools',
      mode: 'local',
      command: 'node',
      args: ['server.js'],
    },
  ],
  allowedCapabilities: ['search'],
  versionPinning: true,
  capabilityHashing: true,
};

export const mcpIntegrationSpecDefinition = defineSpecSchema<MCPIntegrationSpec>({
  id: 'MCPIntegrationSpec',
  zod: mcpIntegrationSpecSchema,
  jsonSchema: mcpIntegrationSpecJsonSchema,
  example: mcpIntegrationSpecExample,
});

export const mcpSpecDefinitions = [mcpIntegrationSpecDefinition] as const;
export const mcpSpecJsonSchemas = exportSpecJsonSchemas(mcpSpecDefinitions);

export function validateMCPIntegrationSpec(input: unknown): MCPIntegrationSpec {
  return mcpIntegrationSpecDefinition.parse(input);
}

function cloneCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor {
  return JSON.parse(JSON.stringify(capability)) as MCPCapabilityDescriptor;
}

function stringField(input: unknown, field: string): string {
  if (!input || typeof input !== 'object') {
    throw new Error(`MCP fixture input must be an object with field: ${field}`);
  }
  const value = (input as Record<string, unknown>)[field];
  if (typeof value !== 'string' || !value) {
    throw new Error(`MCP fixture field must be a non-empty string: ${field}`);
  }
  return value;
}

function validateHttpUrl(url: string): void {
  const parsed = new URL(url);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`MCP fixture URL must be http or https: ${url}`);
  }
}

async function recordMCPGatewayTrace(
  options: MCPGatewayToolRegistrationOptions,
  type: 'mcp.capability.discovered' | 'mcp.tool.normalized',
  payload: Record<string, unknown>
): Promise<void> {
  if (!options.trace || !options.traceContext) {
    return;
  }
  const context = options.traceContext;
  await options.trace.record(
    createFrameworkEvent({
      id: [
        context.runId,
        context.stepId ?? 'mcp',
        type,
        String(payload.integrationId ?? options.integration.id),
        String(payload.serverId ?? 'server'),
        String(payload.capabilityId ?? 'capability'),
      ].join(':'),
      type,
      runId: context.runId,
      stepId: context.stepId,
      sessionId: context.sessionId,
      payload,
      metadata: {
        ...context.metadata,
        source: 'mcp',
      },
    })
  );
}
