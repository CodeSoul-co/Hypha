import type { SpecRef, SideEffectLevel } from '../specs';
import type { CommandExecutionStatus, ExecutionResourceUsage } from './command-execution';

/** Exact Execution-owned validity input consumed by Cache integrations. */
export interface ExecutionCacheValidityInput {
  executable: string;
  argsHash: string;
  sourceTreeHash: string;
  workspaceSnapshotHash?: string;
  environmentHash: string;
  imageDigest?: string;
  dependencyLockHash?: string;
  networkPolicyHash: string;
  secretVersionSetHash?: string;
  commandPolicyRevision?: string;
}

/** Resolved environment facts used to prove that a cache key is stable. */
export interface ExecutionEnvironmentFingerprint {
  environmentRef: SpecRef;
  environmentRevision: string;
  providerId: string;
  imageDigest?: string;
  platform?: string;
  executableVersions?: Record<string, string>;
  dependencyLockHash?: string;
  resourcePolicyHash: string;
  networkPolicyHash: string;
  mountPolicyHash: string;
  secretVersionSetHash?: string;
  fingerprintHash: string;
}

export type ExecutionEnvironmentFingerprintResolution =
  | {
      status: 'resolved';
      fingerprint: ExecutionEnvironmentFingerprint;
    }
  | {
      status: 'unavailable';
      reason: string;
    };

/**
 * Canonical, bounded material for a Command fingerprint. Raw environment values,
 * Secret values, stdin, and command output are deliberately excluded.
 */
export interface ExecutionCommandFingerprintInput {
  executable: string;
  argsHash: string;
  cwd?: string;
  relevantEnvHash: string;
  sourceTreeHash: string;
  environmentHash: string;
  networkPolicyHash: string;
  secretVersionSetHash?: string;
  idempotencyKey: string;
}

export interface ExecutionCacheArtifactReference {
  artifactRef: string;
  contentHash: string;
}

/** Bounded result fields allowed in a Cache entry. */
export interface ExecutionCacheResultMetadata {
  executionId: string;
  status: CommandExecutionStatus;
  exitCode: number | null;
  signal?: string;
  resourceUsage?: ExecutionResourceUsage;
  providerReceiptHash?: string;
  startedAt: string;
  completedAt?: string;
  latencyMs?: number;
}

/**
 * Execution's projection for a generic CacheEntry value. It contains metadata,
 * references, and hashes only; Artifact bytes and stdout/stderr are out of scope.
 */
export interface ExecutionCacheEntryProjection {
  commandHash: string;
  validityHash: string;
  validity: ExecutionCacheValidityInput;
  resultMetadata: ExecutionCacheResultMetadata;
  artifacts: ExecutionCacheArtifactReference[];
}

export type ExecutionCacheReuseBlockReason =
  | 'environment_fingerprint_unavailable'
  | 'external_side_effect'
  | 'irreversible_side_effect';

export interface ExecutionCacheReuseAssessmentInput {
  sideEffectLevel: SideEffectLevel;
  environmentFingerprintStatus: ExecutionEnvironmentFingerprintResolution['status'];
}

export type ExecutionCacheReuseAssessment =
  | { reusable: true }
  | { reusable: false; reason: ExecutionCacheReuseBlockReason };

/** Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string. */
export interface ExecutionFingerprintHasher {
  readonly algorithm: 'sha256';
  hashUtf8(canonicalValue: string): Promise<string>;
}
