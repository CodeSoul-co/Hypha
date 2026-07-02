export interface DomainPackSpec {
  id: string;
  version: string;
  name: string;
  description?: string;
  taskSchemas?: TaskSchemaSpec[];
  workflows?: WorkflowSpec[];
  defaultWorkflow?: string;
  defaultSkills?: string[];
  allowedSkills?: string[];
  policies?: string[];
}

export interface TaskSchemaSpec {
  id: string;
  version: string;
  taskType: string;
  inputSchema: unknown;
  outputContractRef?: string;
}

export interface WorkflowSpec {
  id: string;
  version: string;
  initialState: string;
  terminalStates: string[];
  states: unknown[];
  transitions: unknown[];
}
