import { z } from 'zod';
import type { ManagedMemoryScope } from './contracts';
import type { PaginationRequest } from './operations';
import { hashMemoryScope, memoryError, sha256, stableStringify } from './memory-utils';

export interface ProviderPaginationBudget {
  maxPages: number;
  maxItems: number;
  maxBytes: number;
  maxDurationMs: number;
  maxCalls: number;
}

interface ProviderCursorEnvelope {
  version: 1;
  providerId: string;
  scopeHash: string;
  providerCursor: string;
  startedAt: string;
  pages: number;
  items: number;
  bytes: number;
  calls: number;
  seen: string[];
}

const cursorSchema = z
  .object({
    version: z.literal(1),
    providerId: z.string().min(1),
    scopeHash: z.string().min(1),
    providerCursor: z.string().min(1),
    startedAt: z.string().datetime(),
    pages: z.number().int().nonnegative(),
    items: z.number().int().nonnegative(),
    bytes: z.number().int().nonnegative(),
    calls: z.number().int().nonnegative(),
    seen: z.array(z.string().min(1)).max(100),
  })
  .strict();

const cursorPrefix = 'hypha-provider-cursor:v1:';
const defaultBudget: ProviderPaginationBudget = {
  maxPages: 100,
  maxItems: 10_000,
  maxBytes: 10 * 1024 * 1024,
  maxDurationMs: 60_000,
  maxCalls: 100,
};

export interface ProviderPageContext {
  providerCursor?: string;
  envelope?: ProviderCursorEnvelope;
  budget: ProviderPaginationBudget;
  startedAt: string;
  nowMs: number;
}

export function beginProviderPage(
  providerId: string,
  scope: ManagedMemoryScope,
  pagination: PaginationRequest | undefined,
  nowMs = Date.now()
): ProviderPageContext {
  const budget = {
    maxPages: pagination?.maxPages ?? defaultBudget.maxPages,
    maxItems: pagination?.maxItems ?? defaultBudget.maxItems,
    maxBytes: pagination?.maxBytes ?? defaultBudget.maxBytes,
    maxDurationMs: pagination?.maxDurationMs ?? defaultBudget.maxDurationMs,
    maxCalls: pagination?.maxCalls ?? defaultBudget.maxCalls,
  };
  if (!pagination?.cursor) {
    return { budget, startedAt: new Date(nowMs).toISOString(), nowMs };
  }
  const envelope = decodeProviderCursor(pagination.cursor);
  if (envelope.providerId !== providerId || envelope.scopeHash !== hashMemoryScope(scope)) {
    throw memoryError(
      'MEMORY_SCOPE_DENIED',
      'Provider cursor does not belong to this provider and Memory scope.'
    );
  }
  assertBudget(envelope, budget, nowMs, true);
  return {
    providerCursor: envelope.providerCursor,
    envelope,
    budget,
    startedAt: envelope.startedAt,
    nowMs,
  };
}

export function finishProviderPage(
  context: ProviderPageContext,
  providerId: string,
  scope: ManagedMemoryScope,
  records: unknown[],
  nextProviderCursor?: string,
  nowMs = Date.now()
): { nextCursor?: string; hasMore: boolean } {
  const previous = context.envelope;
  const seen = previous?.seen ?? [];
  if (
    nextProviderCursor &&
    (nextProviderCursor === context.providerCursor ||
      seen.includes(cursorFingerprint(nextProviderCursor)))
  ) {
    throw memoryError(
      'MEMORY_PROVIDER_UNAVAILABLE',
      'Provider returned a repeated pagination cursor.',
      false,
      { paginationLoop: true }
    );
  }
  const envelope: ProviderCursorEnvelope = {
    version: 1,
    providerId,
    scopeHash: hashMemoryScope(scope),
    providerCursor: nextProviderCursor ?? context.providerCursor ?? 'completed',
    startedAt: context.startedAt,
    pages: (previous?.pages ?? 0) + 1,
    items: (previous?.items ?? 0) + records.length,
    bytes: (previous?.bytes ?? 0) + new TextEncoder().encode(stableStringify(records)).byteLength,
    calls: (previous?.calls ?? 0) + 1,
    seen: context.providerCursor
      ? [...seen, cursorFingerprint(context.providerCursor)].slice(-100)
      : seen,
  };
  assertBudget(envelope, context.budget, nowMs, false);
  return {
    nextCursor: nextProviderCursor ? encodeProviderCursor(envelope) : undefined,
    hasMore: Boolean(nextProviderCursor),
  };
}

export function encodeProviderCursor(envelope: ProviderCursorEnvelope): string {
  return cursorPrefix + encodeURIComponent(stableStringify(envelope));
}

function decodeProviderCursor(cursor: string): ProviderCursorEnvelope {
  if (!cursor.startsWith(cursorPrefix)) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Unrecognized or unprotected provider cursor.');
  }
  try {
    return cursorSchema.parse(JSON.parse(decodeURIComponent(cursor.slice(cursorPrefix.length))));
  } catch {
    throw memoryError('MEMORY_INVALID_INPUT', 'Provider cursor is malformed.');
  }
}

function cursorFingerprint(cursor: string): string {
  return sha256(cursor);
}

function assertBudget(
  envelope: Pick<ProviderCursorEnvelope, 'startedAt' | 'pages' | 'items' | 'bytes' | 'calls'>,
  budget: ProviderPaginationBudget,
  nowMs: number,
  beforeCall: boolean
): void {
  const elapsed = nowMs - Date.parse(envelope.startedAt);
  const exhausted =
    envelope.pages >= budget.maxPages ||
    envelope.items >= budget.maxItems ||
    envelope.bytes >= budget.maxBytes ||
    envelope.calls >= budget.maxCalls ||
    elapsed >= budget.maxDurationMs;
  if (exhausted && beforeCall) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Provider pagination budget is exhausted.');
  }
  const exceeded =
    envelope.pages > budget.maxPages ||
    envelope.items > budget.maxItems ||
    envelope.bytes > budget.maxBytes ||
    envelope.calls > budget.maxCalls ||
    elapsed > budget.maxDurationMs;
  if (exceeded) {
    throw memoryError(
      'MEMORY_PROVIDER_UNAVAILABLE',
      'Provider pagination exceeded its budget.',
      false,
      {
        paginationBudgetExceeded: true,
      }
    );
  }
}
