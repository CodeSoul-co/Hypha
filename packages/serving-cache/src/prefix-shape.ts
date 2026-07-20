import { stableJson } from './key';
import type {
  CacheScope,
  PrefixCacheChangeReason,
  PrefixCacheShapeObservation,
  PromptPrefixMetadata,
} from './types';

export interface PrefixCacheShapeInput {
  provider: string;
  model: string;
  scope?: CacheScope;
  prefixMetadata: PromptPrefixMetadata;
}

interface PrefixCacheShapeSnapshot {
  prefixHash: string;
  toolSchemaHash?: string;
  domainPackHash?: string;
  dynamicSuffixHash?: string;
}

export class PrefixCacheShapeTracker {
  private readonly snapshots = new Map<string, PrefixCacheShapeSnapshot>();

  constructor(private readonly maxSnapshots = 5000) {}

  observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation {
    const key = trackerKey(input);
    const previous = this.snapshots.get(key);
    const current: PrefixCacheShapeSnapshot = {
      prefixHash: input.prefixMetadata.prefixHash,
      toolSchemaHash: input.prefixMetadata.toolSchemaHash,
      domainPackHash: input.prefixMetadata.domainPackHash,
      dynamicSuffixHash: input.prefixMetadata.dynamicSuffixHash,
    };
    this.snapshots.delete(key);
    this.snapshots.set(key, current);
    while (this.snapshots.size > this.maxSnapshots) {
      const oldest = this.snapshots.keys().next().value as string | undefined;
      if (!oldest) break;
      this.snapshots.delete(oldest);
    }

    const stablePrefixChanged = !previous || previous.prefixHash !== current.prefixHash;
    const dynamicSuffixChanged =
      Boolean(previous) && previous?.dynamicSuffixHash !== current.dynamicSuffixHash;
    const changedReasons = changeReasons(previous, current);

    return {
      provider: input.provider,
      model: input.model,
      scope: input.scope,
      prefixHash: current.prefixHash,
      previousPrefixHash: previous?.prefixHash,
      toolSchemaHash: current.toolSchemaHash,
      previousToolSchemaHash: previous?.toolSchemaHash,
      domainPackHash: current.domainPackHash,
      previousDomainPackHash: previous?.domainPackHash,
      dynamicSuffixHash: current.dynamicSuffixHash,
      previousDynamicSuffixHash: previous?.dynamicSuffixHash,
      requestHash: input.prefixMetadata.requestHash,
      prefixTokenEstimate: input.prefixMetadata.prefixTokenEstimate,
      blockCount: input.prefixMetadata.blocks.length,
      stablePrefixChanged,
      dynamicSuffixChanged,
      changedReasons,
    };
  }
}

function changeReasons(
  previous: PrefixCacheShapeSnapshot | undefined,
  current: PrefixCacheShapeSnapshot
): PrefixCacheChangeReason[] {
  if (!previous) return ['first_request'];
  const reasons: PrefixCacheChangeReason[] = [];
  if (previous.toolSchemaHash !== current.toolSchemaHash) reasons.push('tool_schema_changed');
  if (previous.domainPackHash !== current.domainPackHash) reasons.push('domain_pack_changed');
  if (previous.prefixHash !== current.prefixHash) reasons.push('prefix_changed');
  if (previous.dynamicSuffixHash !== current.dynamicSuffixHash) {
    reasons.push('dynamic_suffix_changed');
  }
  return reasons.length ? reasons : ['unchanged'];
}

function trackerKey(input: PrefixCacheShapeInput): string {
  return stableJson({
    provider: input.provider,
    model: input.model,
    scope: input.scope,
  });
}
