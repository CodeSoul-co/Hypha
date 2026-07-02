import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  sideEffectLevelSchema,
  specMetadataSchema,
  versionedSpecSchema,
  type JsonSchema,
  type SideEffectLevel,
  type SpecMetadata,
  type VersionedSpec,
} from '@hypha/core';
import type { ToolSpec } from '@hypha/tools';

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

export interface MCPGateway {
  discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
  normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
}

export class MockMCPGateway implements MCPGateway {
  constructor(private readonly capabilities: MCPCapabilityDescriptor[] = []) {}

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

export const mcpCapabilityDescriptorSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
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
