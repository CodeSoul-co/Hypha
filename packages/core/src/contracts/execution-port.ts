import type { ExecutionActivityRequest, ExecutionActivityResult } from './execution-activities';
import type { ExecutionRiskAssessment, ExecutionToolBinding } from './execution-governance';

export interface ExecutionAuthorizationEvidence {
  id: string;
  invocationId: string;
  activityId: string;
  runId: string;
  toolId: string;
  toolRevision?: string;
  contractSnapshotRef?: string;
  principalId: string;
  inputHash: string;
  policyDecisionRef: string;
  riskAssessmentId: string;
  approvalRef?: string;
  authorizedAt: string;
  expiresAt?: string;
}

export interface ExecutionDispatchRequest {
  activity: ExecutionActivityRequest;
  binding: ExecutionToolBinding;
  riskAssessment: ExecutionRiskAssessment;
  authorization: ExecutionAuthorizationEvidence;
}

export interface ExecutionAuthorizationVerificationResult {
  valid: boolean;
  verificationRef: string;
  verifiedAt: string;
  expiresAt?: string;
  reason?: string;
}

export interface ExecutionAuthorizationVerifier {
  verify(
    request: ExecutionDispatchRequest,
    abortSignal: AbortSignal
  ): Promise<ExecutionAuthorizationVerificationResult>;
}

export interface ExecutionOperationDispatcher {
  dispatch(
    request: ExecutionActivityRequest,
    abortSignal: AbortSignal
  ): Promise<ExecutionActivityResult>;
}

export interface ExecutionPort {
  execute(
    request: ExecutionDispatchRequest,
    abortSignal: AbortSignal
  ): Promise<ExecutionActivityResult>;
}
