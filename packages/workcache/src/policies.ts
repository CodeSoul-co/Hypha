import type { CacheTreeType, PartialWorkCachePolicy, WorkCachePolicy } from './types';
import { validateWorkCachePolicy } from './schemas';

export const WORKCACHE_TREE_TYPES: CacheTreeType[] = [
  'PlanTree',
  'ComputationTree',
  'ToolTree',
  'ObservationTree',
  'VerificationTree',
  'MemoryTree',
  'RecoveryTree',
  'PromptPrefixTree',
];

export const defaultWorkCachePolicy: WorkCachePolicy = {
  enabled: false,
  store: 'off',
  failureMode: 'bypass',
  scopeRequirement: 'user',
  operationTimeoutMs: 500,
  maxBlockBytes: 2 * 1024 * 1024,
  promptBudgetTokens: 4096,
  unknownEventPolicy: 'ignore',
  allowExtensionEvents: false,
  trees: {
    PlanTree: { enabled: true, ttlMs: 1000 * 60 * 60 * 24, maxEntries: 1000 },
    ComputationTree: { enabled: true, ttlMs: 1000 * 60 * 60 * 6, maxEntries: 1000 },
    ToolTree: { enabled: true, ttlMs: 1000 * 60 * 60, maxEntries: 1000 },
    ObservationTree: { enabled: true, ttlMs: 1000 * 60 * 60, maxEntries: 1000 },
    VerificationTree: { enabled: true, ttlMs: 1000 * 60 * 60, maxEntries: 1000 },
    MemoryTree: { enabled: true, ttlMs: 1000 * 60 * 60 * 24, maxEntries: 1000 },
    RecoveryTree: { enabled: true, ttlMs: 1000 * 60 * 60 * 6, maxEntries: 1000 },
    PromptPrefixTree: { enabled: true, ttlMs: 1000 * 60 * 60 * 24, maxEntries: 1000 },
  },
};

export function normalizeWorkCachePolicy(policy: PartialWorkCachePolicy = {}): WorkCachePolicy {
  const enabled = policy.enabled ?? (policy.store !== undefined && policy.store !== 'off');
  return validateWorkCachePolicy({
    ...defaultWorkCachePolicy,
    ...policy,
    enabled,
    store: policy.store ?? defaultWorkCachePolicy.store,
    failureMode: policy.failureMode ?? defaultWorkCachePolicy.failureMode,
    scopeRequirement: policy.scopeRequirement ?? defaultWorkCachePolicy.scopeRequirement,
    operationTimeoutMs: policy.operationTimeoutMs ?? defaultWorkCachePolicy.operationTimeoutMs,
    maxBlockBytes: policy.maxBlockBytes ?? defaultWorkCachePolicy.maxBlockBytes,
    promptBudgetTokens: policy.promptBudgetTokens ?? defaultWorkCachePolicy.promptBudgetTokens,
    unknownEventPolicy: policy.unknownEventPolicy ?? defaultWorkCachePolicy.unknownEventPolicy,
    allowExtensionEvents:
      policy.allowExtensionEvents ?? defaultWorkCachePolicy.allowExtensionEvents,
    trees: WORKCACHE_TREE_TYPES.reduce(
      (acc, treeType) => {
        acc[treeType] = {
          ...defaultWorkCachePolicy.trees[treeType],
          ...(policy.trees?.[treeType] ?? {}),
        };
        return acc;
      },
      {} as WorkCachePolicy['trees']
    ),
  });
}
