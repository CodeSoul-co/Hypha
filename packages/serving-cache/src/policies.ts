import type { CacheMode, CachePolicy } from './types';

export const defaultCachePolicy: CachePolicy = {
  enabled: false,
  mode: 'readwrite',
  ttlMs: 1000 * 60 * 60 * 24,
  cacheErrors: false,
  cacheStreaming: false,
  respectNoCache: true,
};

export function normalizeCachePolicy(policy: Partial<CachePolicy> = {}): CachePolicy {
  const normalized: CachePolicy = {
    ...defaultCachePolicy,
    ...policy,
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
