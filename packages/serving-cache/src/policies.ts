import type { CacheMode, CachePolicy } from './types';

export const defaultCachePolicy: CachePolicy = {
  enabled: false,
  mode: 'readwrite',
  ttlMs: 1000 * 60 * 60 * 24,
  respectNoCache: true,
  failureMode: 'bypass',
  scopeRequirement: 'user',
  operationTimeoutMs: 250,
  singleflight: true,
  maxEntryBytes: 1024 * 1024,
  circuitBreaker: {
    failureThreshold: 3,
    resetTimeoutMs: 30000,
  },
};

export function normalizeCachePolicy(policy: Partial<CachePolicy> = {}): CachePolicy {
  const normalized: CachePolicy = {
    ...defaultCachePolicy,
    ...policy,
    circuitBreaker: {
      ...defaultCachePolicy.circuitBreaker!,
      ...(policy.circuitBreaker ?? {}),
    },
  };
  if (normalized.mode === 'off') {
    return { ...normalized, enabled: false };
  }
  return normalized;
}

export function cacheModeAllowsRead(mode: CacheMode): boolean {
  return mode === 'read' || mode === 'readwrite';
}

export function cacheModeAllowsWrite(mode: CacheMode): boolean {
  return mode === 'write' || mode === 'readwrite';
}
