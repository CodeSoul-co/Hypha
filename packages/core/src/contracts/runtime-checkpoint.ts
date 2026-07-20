import type { RuntimeJsonValue } from './runtime-helpers';
import type { RuntimeOrchestrationProjection } from './runtime-projection';
import type { RuntimeScope } from './runtime';

export const RUNTIME_CHECKPOINT_REASONS = [
  'state_boundary',
  'human_wait',
  'signal_wait',
  'timer_wait',
  'manual',
  'failure',
] as const;
export const RUNTIME_CHECKPOINT_MODES = [
  'none',
  'state_boundary',
  'every_n_events',
  'wait_boundary',
  'custom',
] as const;
export const RUNTIME_CHECKPOINT_COMPRESSIONS = ['none', 'gzip', 'zstd'] as const;
export const RUNTIME_CHECKPOINT_DISPOSITIONS = ['applied', 'reused', 'lease_unavailable'] as const;

export type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number];
export type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number];
export type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number];
export type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number];

export interface RuntimeCheckpointPolicySpec {
  mode: RuntimeCheckpointMode;
  everyNEvents?: number;
  retainLast?: number;
  persistWorkspaceSnapshot?: boolean;
  persistContextRefs?: boolean;
  compression?: RuntimeCheckpointCompression;
}

export interface RuntimeCheckpointRecord {
  id: string;
  scope: RuntimeScope;
  sequence: number;
  workflowRevision: string;
  processHash: string;
  currentState: string;
  variablesHash: string;
  projectionVersion: string;
  projectionSnapshot: RuntimeOrchestrationProjection;
  dependencySnapshotRef: string;
  toolContractSnapshotRef?: string;
  workspaceSnapshotRef?: string;
  contextSnapshotRefs?: string[];
  pendingWaitRef?: string;
  lastEventSequence: number;
  reason: RuntimeCheckpointReason;
  requestHash: string;
  checksum: string;
  createdAt: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeCheckpointCreateCommand {
  checkpointId: string;
  scope: RuntimeScope;
  ownerId: string;
  leaseTtlMs: number;
  workflowRevision: string;
  processHash: string;
  variablesHash: string;
  dependencySnapshotRef: string;
  toolContractSnapshotRef?: string;
  workspaceSnapshotRef?: string;
  contextSnapshotRefs?: string[];
  reason: RuntimeCheckpointReason;
  createdAt: string;
  idempotencyKey?: string;
  metadata?: Record<string, RuntimeJsonValue>;
}

export interface RuntimeCheckpointCreateResult {
  checkpointId: string;
  disposition: RuntimeCheckpointDisposition;
  eventIds: string[];
  record?: RuntimeCheckpointRecord;
}

export interface RuntimeCheckpointLoadRequest {
  scope: RuntimeScope;
  checkpointId?: string;
  checkedAt: string;
}

export interface RuntimeCheckpointLoadResult {
  record: RuntimeCheckpointRecord;
  currentHeadSequence: number;
  deltaFromSequence: number;
  deltaEventCount: number;
}

export interface RuntimeCheckpointPutResult {
  record: RuntimeCheckpointRecord;
  reused: boolean;
}

export interface RuntimeCheckpointStore {
  put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
  get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
  latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
  list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
}
