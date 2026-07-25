import type { CommandExecutionRequest } from './command-execution';
import type { NormalizedExecutionError } from './execution';
import type {
  WorkspaceDeleteRequest,
  WorkspaceDiffRequest,
  WorkspaceListRequest,
  WorkspacePatchRequest,
  WorkspacePathRequest,
  WorkspaceReadRequest,
  WorkspaceRestoreRequest,
  WorkspaceSnapshotRequest,
  WorkspaceWriteRequest,
} from './workspace';

export const EXECUTION_ACTIVITY_STATUSES = [
  'completed',
  'failed',
  'timeout',
  'cancelled',
  'unknown',
] as const;

export type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number];

export type WorkspaceOperationRequest =
  | WorkspacePathRequest
  | WorkspaceListRequest
  | WorkspaceReadRequest
  | WorkspaceWriteRequest
  | WorkspaceDeleteRequest
  | WorkspaceSnapshotRequest
  | WorkspaceRestoreRequest
  | WorkspaceDiffRequest
  | WorkspacePatchRequest;

export interface ExecutionActivityRequest {
  activityId: string;
  operationId: string;
  runId: string;
  stateAttemptId: string;
  workspaceId: string;
  request: CommandExecutionRequest | WorkspaceOperationRequest;
  fencingToken: number;
  deadlineAt?: string;
  idempotencyKey?: string;
}

export interface ExecutionActivityResult {
  activityId: string;
  status: ExecutionActivityStatus;
  executionId?: string;
  artifactRefs?: string[];
  snapshotRef?: string;
  eventIds: string[];
  error?: NormalizedExecutionError;
}
