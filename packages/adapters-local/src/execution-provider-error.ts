import type { NormalizedExecutionError } from '@hypha/core';

export class ExecutionProviderError extends Error {
  constructor(readonly normalizedError: NormalizedExecutionError) {
    super(normalizedError.message);
    this.name = 'ExecutionProviderError';
  }
}

export function executionProviderError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): ExecutionProviderError {
  return new ExecutionProviderError({
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  });
}
