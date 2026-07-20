import type { RuntimeOrchestrationProjection } from './runtime-projection';
import type { RuntimeScope } from './runtime';

export const RUNTIME_REPLAY_DIVERGENCE_KINDS = [
  'workflow_revision',
  'process_hash',
  'dependency_snapshot',
  'projection_version',
  'snapshot_checksum',
] as const;

export type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number];

export interface RuntimeReplayDivergence {
  kind: RuntimeReplayDivergenceKind;
  expected: string;
  actual: string;
  message: string;
}

export interface RuntimeReplayRequest {
  scope: RuntimeScope;
  checkpointId?: string;
  expectedWorkflowRevision: string;
  expectedProcessHash: string;
  expectedDependencySnapshotRef: string;
  toSequence?: number;
  requestedAt: string;
}

export interface RuntimeReplayResult {
  sourceRunId: string;
  mode: 'deterministic';
  checkpointId: string;
  baseEventSequence: number;
  targetEventSequence: number;
  replayedEventCount: number;
  appliedEventCount: number;
  eventIds: string[];
  workflowRevision: string;
  processHash: string;
  dependencySnapshotRef: string;
  projectionVersion: string;
  finalSnapshot: RuntimeOrchestrationProjection;
  finalSnapshotChecksum: string;
  divergences: RuntimeReplayDivergence[];
  completedAt: string;
}

export interface RuntimeReplayVerificationRequest {
  replay: RuntimeReplayRequest;
  expectedSnapshotChecksum: string;
}

export interface RuntimeReplayVerificationResult {
  replay: RuntimeReplayResult;
  matches: boolean;
  divergences: RuntimeReplayDivergence[];
}

export interface RuntimeReplayServiceContract {
  replay(request: RuntimeReplayRequest): Promise<RuntimeReplayResult>;
  verify(request: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult>;
}
