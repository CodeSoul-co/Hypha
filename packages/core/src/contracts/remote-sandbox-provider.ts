import type {
  CommandExecutionResult,
  CommandOutputChunk,
  ExecutionReceipt,
} from './command-execution';
import type { ExecutionPrincipal } from './execution';
import type { SandboxProvider } from './sandbox-provider';
import type { SandboxProviderCapabilities } from './sandbox';

export interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities {
  remoteExecution: true;
}

export interface RemoteOutputStreamRequest {
  operationId: string;
  executionId: string;
  principal: ExecutionPrincipal;
  fromSequence?: number;
  maxChunks?: number;
  follow?: boolean;
  correlationId?: string;
  causationId?: string;
}

export interface RemoteExecutionReconciliationRequest {
  operationId: string;
  executionId: string;
  sandboxId: string;
  principal: ExecutionPrincipal;
  providerExecutionRef?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
}

export type RemoteExecutionReconciliationState =
  | 'not_found'
  | 'accepted'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'unknown';

export interface RemoteExecutionReconciliationResult {
  executionId: string;
  sandboxId: string;
  state: RemoteExecutionReconciliationState;
  providerExecutionRef?: string;
  observedAt: string;
  result?: CommandExecutionResult;
  receipt?: ExecutionReceipt;
  metadata?: Record<string, unknown>;
}

export interface RemoteArtifactUploadRequest {
  operationId: string;
  sandboxId: string;
  principal: ExecutionPrincipal;
  expectedSandboxRevision: number;
  artifactRef: string;
  sizeBytes: number;
  contentHash: string;
  mediaType?: string;
  idempotencyKey: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export interface RemoteArtifactDownloadRequest {
  operationId: string;
  sandboxId: string;
  principal: ExecutionPrincipal;
  artifactRef: string;
  maxBytes: number;
  expectedContentHash?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export interface RemoteArtifactChunk {
  transferId: string;
  artifactRef: string;
  sequence: number;
  offsetBytes: number;
  encoding: 'base64';
  content: string;
  byteLength: number;
  contentHash: string;
  final: boolean;
}

export interface RemoteArtifactChunkSequenceExpectation {
  transferId: string;
  artifactRef: string;
  sizeBytes: number;
}

export interface RemoteArtifactTransferReceipt {
  id: string;
  providerId: string;
  sandboxId: string;
  artifactRef: string;
  direction: 'upload' | 'download';
  status: 'accepted' | 'completed' | 'rejected' | 'unknown';
  sizeBytes: number;
  contentHash?: string;
  providerTransferRef?: string;
  issuedAt: string;
  receiptHash: string;
  metadata?: Record<string, unknown>;
}

export interface RemoteSandboxProvider extends SandboxProvider {
  capabilities(): Promise<RemoteSandboxProviderCapabilities>;
  reconcileExecution(
    request: RemoteExecutionReconciliationRequest
  ): Promise<RemoteExecutionReconciliationResult>;
  streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
  uploadArtifact(
    request: RemoteArtifactUploadRequest,
    chunks: AsyncIterable<RemoteArtifactChunk>
  ): Promise<RemoteArtifactTransferReceipt>;
  downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<RemoteArtifactChunk>;
}
