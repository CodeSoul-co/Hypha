import type { ExecutionPrincipal, NormalizedExecutionError } from './execution';
import type { FileMutation } from './workspace';
import type { SpecRef } from '../specs';

export interface CommandExecutionRequest {
  executionId?: string;
  operationId: string;
  principal: ExecutionPrincipal;
  tenantId?: string;
  userId: string;
  workspaceId: string;
  sessionId?: string;
  runId: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  sandboxId?: string;
  environmentRef: SpecRef;
  executable: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
  secretRefs?: string[];
  shell?: boolean;
  stdin?: string | Uint8Array;
  timeoutMs?: number;
  idleTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  captureArtifacts?: boolean;
  captureFileMutations?: boolean;
  snapshotBefore?: boolean;
  snapshotAfter?: boolean;
  snapshotOnFailure?: boolean;
  networkAuthorizationRef?: string;
  idempotencyKey?: string;
  expectedWorkspaceSnapshotHash?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export type CommandExecutionStatus =
  | 'queued'
  | 'starting'
  | 'running'
  | 'cancelling'
  | 'cancelled'
  | 'completed'
  | 'failed'
  | 'timed_out'
  | 'oom_killed'
  | 'resource_exceeded'
  | 'quarantined';

export interface ExecutionResourceUsage {
  cpuTimeMs?: number;
  peakMemoryBytes?: number;
  readBytes?: number;
  writtenBytes?: number;
  networkBytesSent?: number;
  networkBytesReceived?: number;
  processCountPeak?: number;
  outputBytes?: number;
}

export interface ExecutionReceipt {
  id: string;
  providerId: string;
  executionId: string;
  providerExecutionRef?: string;
  status: 'accepted' | 'completed' | 'rejected' | 'unknown';
  issuedAt: string;
  receiptHash: string;
  metadata?: Record<string, unknown>;
}

export interface CommandExecutionResult {
  executionId: string;
  revision: number;
  sandboxId: string;
  status: CommandExecutionStatus;
  exitCode: number | null;
  signal?: string;
  stdout?: string;
  stderr?: string;
  /** SHA-256 content hash of the bounded inline stdout value. */
  stdoutContentHash?: string;
  /** SHA-256 content hash of the bounded inline stderr value. */
  stderrContentHash?: string;
  stdoutTruncated?: boolean;
  stderrTruncated?: boolean;
  stdoutArtifactRef?: string;
  stderrArtifactRef?: string;
  changedFiles: FileMutation[];
  generatedArtifactRefs: string[];
  snapshotBeforeRef?: string;
  snapshotAfterRef?: string;
  resourceUsage?: ExecutionResourceUsage;
  externalReceipt?: ExecutionReceipt;
  startedAt: string;
  completedAt?: string;
  latencyMs?: number;
  error?: NormalizedExecutionError;
  metadata?: Record<string, unknown>;
}

export interface CommandOutputChunk {
  executionId: string;
  sequence: number;
  stream: 'stdout' | 'stderr';
  encoding: 'utf8' | 'base64';
  content: string;
  byteLength: number;
  contentHash: string;
  emittedAt: string;
  truncated?: boolean;
}

export interface ExecutionCancelRequest {
  operationId: string;
  executionId: string;
  principal: ExecutionPrincipal;
  expectedRevision: number;
  reason?: string;
  gracePeriodMs?: number;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
}
