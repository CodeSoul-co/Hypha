import type { ManagedMemoryScope } from './contracts';
import { hashMemoryScope, memoryError, sha256 } from './memory-utils';

export interface MemoryProviderQuotaPolicy {
  providerId: string;
  windowMs: number;
  maxOperations: number;
  maxCostUnits?: number;
  maxStoredBytes?: number;
}
export interface MemoryProviderUsage {
  providerId: string;
  windowStartedAt: string;
  operations: number;
  costUnits: number;
  storedBytes?: number;
}
export interface MemoryProviderQuotaDecision {
  allowed: boolean;
  reason?: 'operation_quota' | 'cost_quota' | 'storage_quota';
  remainingOperations: number;
  remainingCostUnits?: number;
}
export class InMemoryMemoryProviderQuota {
  private readonly usage = new Map<string, MemoryProviderUsage>();
  constructor(
    private readonly policies: MemoryProviderQuotaPolicy[],
    private readonly now: () => Date = () => new Date()
  ) {}
  check(
    providerId: string,
    requestedCostUnits = 0,
    requestedBytes = 0
  ): MemoryProviderQuotaDecision {
    const policy = this.requirePolicy(providerId);
    const usage = this.current(policy);
    const remainingOperations = Math.max(0, policy.maxOperations - usage.operations);
    const remainingCostUnits =
      policy.maxCostUnits === undefined
        ? undefined
        : Math.max(0, policy.maxCostUnits - usage.costUnits);
    if (remainingOperations < 1) {
      return { allowed: false, reason: 'operation_quota', remainingOperations, remainingCostUnits };
    }
    if (remainingCostUnits !== undefined && requestedCostUnits > remainingCostUnits) {
      return { allowed: false, reason: 'cost_quota', remainingOperations, remainingCostUnits };
    }
    if (
      policy.maxStoredBytes !== undefined &&
      (usage.storedBytes ?? 0) + requestedBytes > policy.maxStoredBytes
    ) {
      return { allowed: false, reason: 'storage_quota', remainingOperations, remainingCostUnits };
    }
    return { allowed: true, remainingOperations, remainingCostUnits };
  }
  record(providerId: string, costUnits = 0, storedBytesDelta = 0): MemoryProviderUsage {
    const policy = this.requirePolicy(providerId);
    const decision = this.check(providerId, costUnits, Math.max(0, storedBytesDelta));
    if (!decision.allowed) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        'Memory provider quota rejected the operation.',
        false,
        { reason: decision.reason }
      );
    }
    const usage = this.current(policy);
    usage.operations += 1;
    usage.costUnits += costUnits;
    usage.storedBytes = Math.max(0, (usage.storedBytes ?? 0) + storedBytesDelta);
    this.usage.set(providerId, usage);
    return structuredClone(usage);
  }
  snapshot(providerId: string): MemoryProviderUsage {
    return structuredClone(this.current(this.requirePolicy(providerId)));
  }
  private current(policy: MemoryProviderQuotaPolicy): MemoryProviderUsage {
    const existing = this.usage.get(policy.providerId);
    const now = this.now();
    if (
      existing &&
      now.getTime() - new Date(existing.windowStartedAt).getTime() < policy.windowMs
    ) {
      return existing;
    }
    const value = {
      providerId: policy.providerId,
      windowStartedAt: now.toISOString(),
      operations: 0,
      costUnits: 0,
      storedBytes: existing?.storedBytes ?? 0,
    };
    this.usage.set(policy.providerId, value);
    return value;
  }
  private requirePolicy(providerId: string): MemoryProviderQuotaPolicy {
    const policy = this.policies.find((item) => item.providerId === providerId);
    if (!policy)
      throw memoryError('MEMORY_INVALID_INPUT', 'Provider quota policy is not installed.');
    return policy;
  }
}

export interface MemoryDeletionEvidence {
  schemaVersion: '1.0';
  receiptId: string;
  operationId: string;
  providerId: string;
  scopeHash: string;
  requestedMemoryIds: string[];
  deletedMemoryIds: string[];
  pendingMemoryIds: string[];
  mode: 'soft' | 'hard' | 'compliance';
  completedAt: string;
  providerReceiptRef?: string;
  proofHash: string;
}
export function createMemoryDeletionEvidence(input: {
  operationId: string;
  providerId: string;
  scope: ManagedMemoryScope;
  requestedMemoryIds: string[];
  deletedMemoryIds: string[];
  mode: MemoryDeletionEvidence['mode'];
  completedAt?: string;
  providerReceiptRef?: string;
}): MemoryDeletionEvidence {
  const completedAt = input.completedAt ?? new Date().toISOString();
  const requestedMemoryIds = [...new Set(input.requestedMemoryIds)].sort();
  const deletedMemoryIds = [...new Set(input.deletedMemoryIds)].sort();
  const pendingMemoryIds = requestedMemoryIds.filter((id) => !deletedMemoryIds.includes(id));
  const body = {
    schemaVersion: '1.0' as const,
    operationId: input.operationId,
    providerId: input.providerId,
    scopeHash: hashMemoryScope(input.scope),
    requestedMemoryIds,
    deletedMemoryIds,
    pendingMemoryIds,
    mode: input.mode,
    completedAt,
    providerReceiptRef: input.providerReceiptRef,
  };
  const proofHash = sha256(body);
  return { ...body, receiptId: 'memory:deletion:' + proofHash.slice(7, 31), proofHash };
}
export function verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean {
  const { receiptId: _receiptId, proofHash, ...body } = evidence;
  return (
    sha256(body) === proofHash &&
    evidence.requestedMemoryIds.every(
      (id) => evidence.deletedMemoryIds.includes(id) || evidence.pendingMemoryIds.includes(id)
    )
  );
}

export interface MemoryProviderBackupRestoreCapabilities {
  exportRecords: boolean;
  importRecords: boolean;
  exportVersions: boolean;
  preserveStableIds: boolean;
  preserveScopeHashes: boolean;
  pointInTimeRestore: boolean;
  providerReceiptExport: boolean;
}
