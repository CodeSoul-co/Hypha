// Workflow types
export interface WorkflowDefinition {
  name: string;
  version: string;
  description?: string;
  stages: WorkflowStage[];
  variables?: Record<string, any>;
}

export type WorkflowStageType =
  | 'preprocessor'
  | 'llm'
  | 'postprocessor'
  | 'conditional'
  | 'tool-call'
  | 'end';

export interface WorkflowStage {
  id: string;
  type: WorkflowStageType;
  name?: string;
  description?: string;
  skills?: string[]; // Skill IDs to execute
  model?: string;
  modelProvider?: string;
  prompt?: string;
  tools?: string[]; // Tool names to use
  condition?: string; // For conditional stages
  branches?: WorkflowBranch[];
  next?: string | 'end'; // Next stage ID or 'end'
  onError?: 'stop' | 'continue' | string; // Error handling strategy
}

export interface WorkflowBranch {
  condition: string;
  then: string | 'end'; // Next stage ID
  else?: string | 'end'; // Optional else branch
}

// Workflow execution
export interface WorkflowExecution {
  id: string;
  workflowName: string;
  workflowVersion: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  currentStage?: string;
  context: WorkflowExecutionContext;
  stageResults: Map<string, StageResult>;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface WorkflowExecutionContext {
  userId: string;
  sessionId: string;
  conversationId?: string;
  messages: any[];
  variables: Record<string, any>;
  metadata: Record<string, any>;
}

export interface StageResult {
  stageId: string;
  success: boolean;
  output?: any;
  error?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

// Workflow engine interface
export interface IWorkflowEngine {
  loadWorkflow(workflow: WorkflowDefinition): void;
  unloadWorkflow(name: string, version?: string): void;
  getWorkflow(name: string, version?: string): WorkflowDefinition | null;
  listWorkflows(): WorkflowDefinition[];
  execute(workflowName: string, context: WorkflowExecutionContext, version?: string): Promise<WorkflowExecution>;
  cancel(executionId: string): Promise<void>;
}

// Workflow scheduler
export interface ScheduledWorkflow {
  id: string;
  workflowName: string;
  workflowVersion?: string;
  cron: string;
  enabled: boolean;
  context?: Partial<WorkflowExecutionContext>;
  lastRun?: Date;
  nextRun?: Date;
}
