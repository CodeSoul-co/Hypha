import { FrameworkError, type FrameworkEvent } from '@hypha/core';
import {
  validateFSMProcessSpec,
  validateFSMSnapshot,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';

export const RUNTIME_RUN_CONTEXT_METADATA_KEY = 'runtimeRunContext';

export interface RuntimeRunContext {
  runId: string;
  userId: string;
  sessionId: string;
  clientSessionId: string;
  domainPackId: string;
  fsm: FSMProcessSpec;
  snapshot: FSMSnapshot;
}

export function runtimeRunContextMetadata(context: RuntimeRunContext): Record<string, unknown> {
  return {
    [RUNTIME_RUN_CONTEXT_METADATA_KEY]: JSON.parse(JSON.stringify(context)) as RuntimeRunContext,
  };
}

/** Rebuilds the disposable Server cache exclusively from persisted Events. */
export function projectRuntimeRunContexts(events: FrameworkEvent[]): RuntimeRunContext[] {
  const ordered = [...events].sort(compareEvents);
  const latestSnapshots = new Map<string, FSMSnapshot>();
  for (const event of ordered) {
    if (!isSnapshotEvent(event.type)) continue;
    const snapshot = record(event.payload)?.snapshot;
    if (snapshot !== undefined) latestSnapshots.set(event.runId, snapshot as FSMSnapshot);
  }
  const contexts: RuntimeRunContext[] = [];

  for (const created of ordered.filter((event) => event.type === 'run.created')) {
    const persisted = created.metadata?.[RUNTIME_RUN_CONTEXT_METADATA_KEY];
    if (persisted === undefined) continue;

    const context = parseContext(persisted, created);
    context.snapshot = latestSnapshots.get(context.runId) ?? context.snapshot;
    validateFSMSnapshot(context.fsm, context.snapshot, context.runId);
    contexts.push(structuredClone(context));
  }

  return contexts;
}

export function projectRuntimeRunContext(
  events: FrameworkEvent[],
  runId: string
): RuntimeRunContext | null {
  return projectRuntimeRunContexts(events).find((context) => context.runId === runId) ?? null;
}

function parseContext(value: unknown, created: FrameworkEvent): RuntimeRunContext {
  const candidate = record(value);
  const fsm = candidate?.fsm as FSMProcessSpec | undefined;
  const snapshot = candidate?.snapshot as FSMSnapshot | undefined;
  const context: RuntimeRunContext = {
    runId: requiredString(candidate?.runId, 'runId', created.id),
    userId: requiredString(candidate?.userId, 'userId', created.id),
    sessionId: requiredString(candidate?.sessionId, 'sessionId', created.id),
    clientSessionId: requiredString(candidate?.clientSessionId, 'clientSessionId', created.id),
    domainPackId: requiredString(candidate?.domainPackId, 'domainPackId', created.id),
    fsm: requiredObject(fsm, 'fsm', created.id),
    snapshot: requiredObject(snapshot, 'snapshot', created.id),
  };
  if (context.runId !== created.runId || context.sessionId !== created.sessionId) {
    invalidContext(created.id, 'Run context ownership does not match run.created');
  }
  validateFSMProcessSpec(context.fsm);
  validateFSMSnapshot(context.fsm, context.snapshot, context.runId);
  return context;
}

function isSnapshotEvent(type: FrameworkEvent['type']): boolean {
  return type === 'fsm.transition.accepted' || type === 'fsm.state.entered';
}

function requiredString(value: unknown, field: string, eventId: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  return invalidContext(eventId, `Run context ${field} must be a non-empty string`);
}

function requiredObject<T extends object>(value: T | undefined, field: string, eventId: string): T {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  return invalidContext(eventId, `Run context ${field} must be an object`);
}

function invalidContext(eventId: string, message: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_INVALID_INPUT',
    message,
    context: { eventId },
  });
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function compareEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  const timestamp = left.timestamp.localeCompare(right.timestamp);
  if (timestamp !== 0) return timestamp;
  const sequence =
    (left.globalSequence ?? left.sequence ?? 0) - (right.globalSequence ?? right.sequence ?? 0);
  return sequence || left.id.localeCompare(right.id);
}
