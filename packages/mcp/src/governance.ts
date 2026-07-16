import { createHash } from 'crypto';
import type { SideEffectLevel } from '@hypha/core';
import type { MCPCapabilityDescriptor } from './index';

export type MCPDriftStatus = 'added' | 'unchanged' | 'changed' | 'removed';
export type MCPDriftPolicy = 'quarantine' | 'accept';

export interface MCPDriftRecord {
  capabilityKey: string;
  serverId: string;
  capabilityId: string;
  status: MCPDriftStatus;
  previousHash?: string;
  currentHash?: string;
}

export interface MCPCapabilityBaselineStore {
  load(integrationId: string): Promise<MCPCapabilityDescriptor[]>;
  save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void>;
}

export class InMemoryMCPCapabilityBaselineStore implements MCPCapabilityBaselineStore {
  private readonly baselines = new Map<string, MCPCapabilityDescriptor[]>();

  async load(integrationId: string): Promise<MCPCapabilityDescriptor[]> {
    return clone(this.baselines.get(integrationId) ?? []);
  }

  async save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void> {
    this.baselines.set(integrationId, clone(capabilities));
  }
}

export interface MCPDriftEvaluation {
  current: MCPCapabilityDescriptor[];
  acceptedBaseline: MCPCapabilityDescriptor[];
  records: MCPDriftRecord[];
  quarantinedKeys: Set<string>;
}

export function capabilityKey(
  capability: Pick<MCPCapabilityDescriptor, 'serverId' | 'capabilityId'>
): string {
  return `${capability.serverId}/${capability.capabilityId}`;
}

export function capabilityHash(capability: MCPCapabilityDescriptor): string {
  const contract = {
    kind: capability.type,
    serverId: capability.serverId,
    capabilityId: capability.capabilityId,
    remoteName: capability.name ?? capability.capabilityId,
    description: capability.description ?? null,
    version: capability.version,
    inputSchema: capability.inputSchema ?? null,
    outputSchema: capability.outputSchema ?? null,
    sideEffectLevel: capability.sideEffectLevel ?? null,
    permissionScope: [...(capability.permissionScope ?? [])].sort(),
    annotations: capability.annotations ?? null,
    protocolVersion: capability.protocolVersion ?? null,
    serverIdentity: capability.serverIdentity ?? null,
  };
  return `sha256:${createHash('sha256').update(stableStringify(contract)).digest('hex')}`;
}

export function attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor {
  return {
    ...clone(capability),
    capabilityHash: capabilityHash(capability),
    trustLevel: capability.trustLevel ?? 'untrusted',
    declarationSource: capability.declarationSource ?? 'server',
  };
}

export function governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel {
  const declared = capability.sideEffectLevel;
  const trustedDeclaration =
    capability.declarationSource !== 'server' ||
    capability.trustLevel === 'trusted' ||
    capability.trustLevel === 'reviewed';
  if (trustedDeclaration && declared) return declared;
  return declared === 'write' || declared === 'irreversible' ? declared : 'external_effect';
}

export function evaluateCapabilityDrift(
  discovered: MCPCapabilityDescriptor[],
  baseline: MCPCapabilityDescriptor[],
  policy: MCPDriftPolicy = 'quarantine'
): MCPDriftEvaluation {
  const current = discovered.map(attestCapability);
  const previousByKey = new Map(
    baseline.map((item) => [capabilityKey(item), attestCapability(item)])
  );
  const currentByKey = new Map(current.map((item) => [capabilityKey(item), item]));
  const acceptedByKey = new Map(previousByKey);
  const records: MCPDriftRecord[] = [];
  const quarantinedKeys = new Set<string>();

  for (const item of current) {
    const key = capabilityKey(item);
    const previous = previousByKey.get(key);
    const status: MCPDriftStatus = !previous
      ? 'added'
      : previous.capabilityHash === item.capabilityHash
        ? 'unchanged'
        : 'changed';
    records.push({
      capabilityKey: key,
      serverId: item.serverId,
      capabilityId: item.capabilityId,
      status,
      previousHash: previous?.capabilityHash,
      currentHash: item.capabilityHash,
    });
    if (status === 'changed' && policy === 'quarantine') {
      quarantinedKeys.add(key);
    } else {
      acceptedByKey.set(key, item);
    }
  }

  for (const previous of previousByKey.values()) {
    const key = capabilityKey(previous);
    if (currentByKey.has(key)) continue;
    records.push({
      capabilityKey: key,
      serverId: previous.serverId,
      capabilityId: previous.capabilityId,
      status: 'removed',
      previousHash: previous.capabilityHash,
    });
  }

  return {
    current,
    acceptedBaseline: Array.from(acceptedByKey.values()),
    records,
    quarantinedKeys,
  };
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
