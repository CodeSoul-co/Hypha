export interface ToolSpec {
  id: string;
  version: string;
  description: string;
  inputSchema: unknown;
  outputSchema?: unknown;
  sideEffectLevel: 'none' | 'read' | 'write' | 'external_effect' | 'irreversible';
  permissionScope?: string[];
}

export interface ToolRunner {
  run(toolId: string, input: unknown, context: unknown): Promise<unknown>;
}
