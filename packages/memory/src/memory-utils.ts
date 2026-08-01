import { createHash } from 'crypto';
import type { ManagedMemoryScope, NormalizedMemoryError } from './contracts';

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'undefined';
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, item]) => item !== undefined)
    .sort(([left], [right]) => left.localeCompare(right));
  return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`).join(',')}}`;
}

export function sha256(value: unknown): string {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`;
}

export function hashMemoryScope(scope: ManagedMemoryScope): string {
  return sha256(scope);
}

export function hashMemoryContent(content: unknown): string {
  return sha256(content);
}

export function normalizeMemoryError(
  error: unknown,
  fallbackCode: NormalizedMemoryError['code'] = 'MEMORY_INTERNAL_ERROR'
): NormalizedMemoryError {
  if (isNormalizedMemoryError(error)) return error;
  return {
    code: fallbackCode,
    message: error instanceof Error ? error.message : String(error),
    retryable: fallbackCode.includes('UNAVAILABLE') || fallbackCode.includes('TIMEOUT'),
  };
}

export function memoryError(
  code: NormalizedMemoryError['code'],
  message: string,
  retryable = false,
  details?: Record<string, unknown>
): NormalizedMemoryError {
  return { code, message, retryable, details };
}

export function isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError {
  return Boolean(
    value &&
    typeof value === 'object' &&
    typeof (value as NormalizedMemoryError).code === 'string' &&
    typeof (value as NormalizedMemoryError).message === 'string' &&
    typeof (value as NormalizedMemoryError).retryable === 'boolean'
  );
}
