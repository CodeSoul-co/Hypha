export interface MCPIntegrationSpec {
  id: string;
  version: string;
  servers: MCPServerSpec[];
  allowedCapabilities?: string[];
  deniedCapabilities?: string[];
}

export interface MCPServerSpec {
  id: string;
  mode: 'local' | 'remote';
  endpoint?: string;
  command?: string;
  args?: string[];
}

export interface NormalizedMCPCapability {
  serverId: string;
  capabilityId: string;
  type: 'tool' | 'resource' | 'prompt';
  normalizedSpecId: string;
}
