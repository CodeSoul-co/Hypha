import type { RiskLevel } from '../specs';
import type { ResourceLimitSpec, SandboxMountSpec } from './sandbox';
import type { ExecutionToolOperation, ExecutionToolSideEffectLevel } from './execution-governance';

export const EXECUTION_HUMAN_TASK_SUBJECT_VERSION = '1.0.0' as const;

export interface ExecutionHumanTaskActivityIdentity {
  activityId: string;
  operationId: string;
  runId: string;
  stateAttemptId: string;
  workspaceId: string;
  fencingToken: number;
  deadlineAt?: string;
}

export interface ExecutionHumanTaskToolIdentity {
  toolId: string;
  toolRevision?: string;
  operation: ExecutionToolOperation;
  executionProfileRef: string;
  sideEffectLevel: ExecutionToolSideEffectLevel;
  humanReviewPolicyRef: string;
}

export interface ExecutionHumanTaskCommandSnapshot {
  executable: string;
  args: string[];
  cwd?: string;
  shell: boolean;
  environmentVariableNames: string[];
  secretRefs: string[];
  networkAuthorizationRef?: string;
  expectedWorkspaceSnapshotHash?: string;
  timeoutMs?: number;
  idleTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
}

export interface ExecutionHumanTaskNetworkSnapshot {
  mode: 'disabled' | 'restricted' | 'enabled' | 'task_authorized';
  allowedDomains: string[];
  allowedCidrs: string[];
  allowedPorts: number[];
  allowedProtocols: Array<'tcp' | 'udp' | 'http' | 'https' | 'dns'>;
  proxyRef?: string;
  authorizationRef?: string;
}

export interface ExecutionHumanTaskEnvironmentSnapshot {
  id: string;
  version: string;
  revision: string;
  provider: 'mock' | 'local_process' | 'docker' | 'remote_sandbox' | 'custom';
  providerRef?: string;
  providerId: string;
  providerRevision: string;
  imageDigest?: string;
  mounts: SandboxMountSpec[];
  network: ExecutionHumanTaskNetworkSnapshot;
  resources: ResourceLimitSpec;
}

export interface ExecutionHumanTaskRiskSnapshot {
  assessmentId: string;
  level: RiskLevel;
  reasons: string[];
  matchedRules: string[];
  policyDecisionRef: string;
}

export interface ExecutionHumanTaskExpectedEffects {
  workspaceWrite: boolean;
  networkAccess: boolean;
  secretAccess: boolean;
  artifactCapture: boolean;
}

/**
 * Versioned, redacted subject approved by a Runtime HumanTask before command dispatch.
 * Environment values, stdin, Secret values, and arbitrary request metadata are intentionally absent.
 */
export interface ExecutionHumanTaskSubject {
  id: string;
  version: typeof EXECUTION_HUMAN_TASK_SUBJECT_VERSION;
  kind: 'execution';
  capturedAt: string;
  principalId: string;
  inputHash: string;
  activity: ExecutionHumanTaskActivityIdentity;
  tool: ExecutionHumanTaskToolIdentity;
  command: ExecutionHumanTaskCommandSnapshot;
  environment: ExecutionHumanTaskEnvironmentSnapshot;
  risk: ExecutionHumanTaskRiskSnapshot;
  expectedEffects: ExecutionHumanTaskExpectedEffects;
}

export interface ExecutionHumanTaskSubjectEnvelope {
  subjectRef: string;
  subjectHash: string;
  subject: ExecutionHumanTaskSubject;
}
