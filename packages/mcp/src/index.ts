import type { JsonSchema, SideEffectLevel, SpecMetadata, VersionedSpec } from '@hypha/core';
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
  };
}
