export interface SkillSpec {
  id: string;
  version: string;
  description: string;
  activationPolicy?: unknown;
  allowedTools?: string[];
  requiredTools?: string[];
  memoryAccessPolicy?: unknown;
  contextBudget?: number;
  inputSchema?: unknown;
  outputContract?: unknown;
}

export interface SkillRef {
  id: string;
  version?: string;
}
