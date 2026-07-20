import type { ArtifactKind } from './artifact';
import type { CommandExecutionResult, CommandExecutionStatus } from './command-execution';

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
