import type { ToolSpec } from '@hypha/tools';

// Tool types
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties?: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean | Record<string, any>;
    [key: string]: any;
  };
  outputSchema?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface ToolParams {
  [key: string]: any;
}

export interface ToolResult {
  success: boolean;
  output?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export type ToolGovernanceSpec = Partial<
  Pick<
    ToolSpec,
    | 'outputSchema'
    | 'sideEffectLevel'
    | 'permissionScope'
    | 'preconditions'
    | 'postconditions'
    | 'timeoutPolicy'
    | 'retryPolicy'
    | 'auditPolicy'
    | 'humanApprovalPolicy'
  >
>;

// Tool interface
export interface ITool {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly schema: ToolDefinition;
  readonly governance?: ToolGovernanceSpec;

  execute(params: ToolParams): Promise<ToolResult>;

  // Lifecycle
  onLoad?(): Promise<void>;
  onUnload?(): Promise<void>;
}

// Base tool class
export abstract class BaseTool implements ITool {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly schema: ToolDefinition;

  async execute(params: ToolParams): Promise<ToolResult> {
    try {
      const result = await this.run(params);
      return { success: true, output: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        metadata:
          error && typeof error === 'object' && 'code' in error
            ? { errorCode: String((error as { code: unknown }).code) }
            : undefined,
      };
    }
  }

  protected abstract run(params: ToolParams): Promise<any>;

  async onLoad?(): Promise<void>;
  async onUnload?(): Promise<void>;
}

// MCP types
export interface MCPServerConfig {
  id: string;
  name: string;
  mode: 'local' | 'remote' | 'fixture';
  command?: string;
  args?: string[];
  endpoint?: string;
  credentialRef?: string;
  autoStart?: boolean;
  autoConnect?: boolean;
  required?: boolean;
  reconnectPolicy?: {
    maxAttempts: number;
    backoffMs?: number;
    maxBackoffMs?: number;
    jitterRatio?: number;
    maxElapsedMs?: number;
  };
}

export interface MCPCapabilities {
  name: string;
  description: string;
  inputSchema?: any;
}

// MCP Tool interface
export interface IMCPTool extends ITool {
  readonly protocol: 'mcp';
  readonly serverId: string;
  readonly capabilities: MCPCapabilities[];
}

// MCP message types
export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: any;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface MCPNotification {
  jsonrpc: '2.0';
  method: string;
  params?: any;
}

// MCP server types
export interface MCPClient {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  tools: ToolDefinition[];

  connect(): Promise<void>;
  disconnect(): Promise<void>;
  invoke(name: string, args: any): Promise<ToolResult>;
  listTools(): Promise<ToolDefinition[]>;
  healthCheck(): Promise<boolean>;
}

// Tool Manager types
export interface ToolRegistration {
  tool: ITool;
  enabled: boolean;
  metadata?: Record<string, any>;
}

export interface ToolManagerConfig {
  configPath: string;
  mcpServers: MCPServerConfig[];
}
