import type { RiskLevel, SideEffectLevel } from '../specs';

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
