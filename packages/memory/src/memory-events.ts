import type { FrameworkEventType } from '@hypha/core';
import type { NormalizedMemoryError } from './contracts';
import { sha256 } from './memory-utils';

export type MemoryEventType = Extract<FrameworkEventType, `memory.${string}` | `context.${string}`>;

export interface MemoryEventPayloadBase {
  operationId: string;
  profileId?: string;
  profileRevision?: string;
  providerId?: string;
  scopeHash: string;
  memoryId?: string;
  memoryVersionId?: string;
  itemCount?: number;
  latencyMs?: number;
  status?: string;
  error?: NormalizedMemoryError;
  metadata?: Record<string, unknown>;
}

export interface MemoryEventContext {
  runId: string;
  sessionId?: string;
  workspaceId?: string;
  stepId?: string;
  agentId?: string;
}

export interface MemoryEventPublisher {
  publish(
    type: MemoryEventType,
    payload: MemoryEventPayloadBase,
    context: MemoryEventContext
  ): Promise<string>;
}

export function sanitizeMemoryEventPayload(
  payload: MemoryEventPayloadBase
): MemoryEventPayloadBase {
  return sanitizeValue(payload, 0) as MemoryEventPayloadBase;
}

export function memoryEventIdempotencyKey(
  type: MemoryEventType,
  payload: MemoryEventPayloadBase
): string {
  return sha256({
    type,
    operationId: payload.operationId,
    scopeHash: payload.scopeHash,
    memoryId: payload.memoryId,
    memoryVersionId: payload.memoryVersionId,
    status: payload.status,
  });
}

const sensitiveKeys = new Set([
  'content',
  'canonicalText',
  'embedding',
  'vector',
  'apiKey',
  'token',
  'password',
  'connectionString',
  'databaseUrl',
]);

function sanitizeValue(value: unknown, depth: number): unknown {
  if (depth > 8) return '[depth-limited]';
  if (Array.isArray(value)) {
    return value.slice(0, 100).map((item) => sanitizeValue(item, depth + 1));
  }
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !sensitiveKeys.has(key))
      .map(([key, item]) => [key, sanitizeValue(item, depth + 1)])
  );
}
