import type { RiskLevel, SideEffectLevel } from '../specs';
import type { CommandExecutionRequest } from './command-execution';
import type { WorkspaceOperationRequest } from './execution-activities';
import type { ExecutionEnvironmentSpec } from './sandbox';
import type { WorkspaceSpec } from './workspace';

export const EXECUTION_TOOL_OPERATIONS = [
  'file_read',
  'file_write',
  'command',
  'sandbox',
  'artifact',
] as const;

export const EXECUTION_SANDBOX_LEVELS = ['local', 'container', 'remote_isolated'] as const;

export type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number];
export type ExecutionToolSideEffectLevel = Exclude<SideEffectLevel, 'none'>;
export type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number];

export interface ExecutionToolBinding {
  toolId: string;
  operation: ExecutionToolOperation;
  executionProfileRef: string;
  requiredScopes: string[];
  sideEffectLevel: ExecutionToolSideEffectLevel;
  humanReviewPolicyRef?: string;
}

export interface ExecutionRiskAssessment {
  id: string;
  level: RiskLevel;
  reasons: string[];
  matchedRules?: string[];
  requiresApproval: boolean;
  recommendedSandboxLevel?: ExecutionSandboxLevel;
  evaluatedAt: string;
}

export interface ExecutionRiskEvaluationInput {
  assessmentId: string;
  binding: ExecutionToolBinding;
  request: CommandExecutionRequest | WorkspaceOperationRequest;
  environment: ExecutionEnvironmentSpec;
  workspace: WorkspaceSpec;
  evaluatedAt: string;
}

export interface ExecutionRiskEvaluator {
  evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment;
}
