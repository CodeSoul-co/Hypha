import type { ArtifactKind, ArtifactRecord, ArtifactStatus } from './artifact';
import type { ArtifactFinalizeRequest, ArtifactFromWorkspaceRequest } from './artifact-manager';
import type { CommandExecutionResult, CommandExecutionStatus } from './command-execution';
import type { ExecutionPrincipal } from './execution';
import type { SpecRef } from '../specs';

export type ExecutionOutputTerminalStatus = Exclude<
  CommandExecutionStatus,
  'queued' | 'starting' | 'running' | 'cancelling'
>;

/** Framework-level rules for collecting files produced by an Execution. */
export interface ExecutionOutputCollectionPolicy {
  includePatterns?: string[];
  excludePatterns?: string[];
  maxArtifacts?: number;
  maxTotalBytes?: number;
  classifyByExtension?: boolean;
  finalizeOnSuccess?: boolean;
}

export type ExecutionOutputSkipReason =
  | 'not_included'
  | 'excluded'
  | 'unsupported_mutation'
  | 'missing_integrity_evidence'
  | 'artifact_limit'
  | 'byte_limit';

/** A bounded, content-addressed file that may be handed to Artifact collection. */
export interface ExecutionOutputCollectionItem {
  relativePath: string;
  contentHash: string;
  sizeBytes: number;
  kind: ArtifactKind;
  mimeType?: string;
  existingArtifactRef?: string;
}

/** Deterministic output of policy evaluation; creating Artifact records is a later side effect. */
export interface ExecutionOutputCollectionPlan {
  executionId: string;
  status: ExecutionOutputTerminalStatus;
  items: ExecutionOutputCollectionItem[];
  existingArtifactRefs: string[];
  totalBytes: number;
  finalize: boolean;
  skipped: Record<ExecutionOutputSkipReason, number>;
}

export interface ExecutionOutputPlanner {
  plan(
    result: CommandExecutionResult,
    policy: ExecutionOutputCollectionPolicy
  ): ExecutionOutputCollectionPlan;
}

/** Identity and Artifact policy context supplied by the Execution composition root. */
export interface ExecutionOutputCollectionContext {
  operationId: string;
  principal: ExecutionPrincipal;
  profileRef: SpecRef;
  userId: string;
  tenantId?: string;
  workspaceId: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  idempotencyKeyPrefix?: string;
}

/** Minimal Artifact Manager port required by output collection. */
export interface ExecutionOutputArtifactManager {
  createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord>;
  finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
}

export interface CollectedExecutionOutput {
  relativePath: string;
  artifactRef: string;
  versionId: string;
  contentHash: string;
  sizeBytes: number;
  status: ArtifactStatus;
}

export interface ExecutionOutputCollectionResult {
  executionId: string;
  collected: CollectedExecutionOutput[];
  existingArtifactRefs: string[];
  artifactRefs: string[];
  finalizedArtifactRefs: string[];
}

export interface ExecutionOutputCollector {
  collect(
    plan: ExecutionOutputCollectionPlan,
    context: ExecutionOutputCollectionContext
  ): Promise<ExecutionOutputCollectionResult>;
}
