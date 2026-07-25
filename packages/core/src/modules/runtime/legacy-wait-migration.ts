import type { FrameworkEvent, PersistedFrameworkEvent } from '../../events';
import { hashCanonicalJson } from './canonical-json';

export const LEGACY_HUMAN_WAIT_MIGRATION_VERSION = '1.0.0';

export interface LegacyHumanWaitMigrationEntry {
  eventId: string;
  runId: string;
  status: 'current' | 'migrated' | 'quarantined';
  waitId?: string;
  pendingActionRef?: string;
  reason?: string;
}

export interface LegacyHumanWaitMigrationReport {
  formatVersion: typeof LEGACY_HUMAN_WAIT_MIGRATION_VERSION;
  scannedEvents: number;
  waitingEvents: number;
  migratedEvents: number;
  currentEvents: number;
  quarantinedEvents: number;
  quarantinedRunIds: string[];
  entries: LegacyHumanWaitMigrationEntry[];
}

export interface LegacyHumanWaitMigrationResult<TEvent extends FrameworkEvent> {
  events: TEvent[];
  report: LegacyHumanWaitMigrationReport;
}

export function migrateLegacyHumanWaitEvents<TEvent extends FrameworkEvent>(
  events: readonly TEvent[]
): LegacyHumanWaitMigrationResult<TEvent> {
  const evidenceByRun = new Map<string, string>();
  const entries: LegacyHumanWaitMigrationEntry[] = [];
  const migrated = events.map((event) => {
    const evidence = humanActionRef(event);
    if (evidence) evidenceByRun.set(event.runId, evidence);
    if (event.type !== 'run.waiting_human') return structuredClone(event);

    const result = migrateLegacyHumanWaitEvent(event, evidenceByRun.get(event.runId));
    entries.push(result.entry);
    return result.event;
  });
  const quarantinedRunIds = Array.from(
    new Set(entries.filter((entry) => entry.status === 'quarantined').map((entry) => entry.runId))
  ).sort();

  return {
    events: migrated,
    report: {
      formatVersion: LEGACY_HUMAN_WAIT_MIGRATION_VERSION,
      scannedEvents: events.length,
      waitingEvents: entries.length,
      migratedEvents: entries.filter((entry) => entry.status === 'migrated').length,
      currentEvents: entries.filter((entry) => entry.status === 'current').length,
      quarantinedEvents: entries.filter((entry) => entry.status === 'quarantined').length,
      quarantinedRunIds,
      entries,
    },
  };
}

export function migrateLegacyHumanWaitEvent<TEvent extends FrameworkEvent>(
  event: TEvent,
  priorPendingActionRef?: string
): { event: TEvent; entry: LegacyHumanWaitMigrationEntry } {
  if (event.type !== 'run.waiting_human') {
    throw new Error('Legacy Human Wait migration only accepts run.waiting_human Events');
  }
  const payload = record(event.payload);
  const wait = record(payload.wait);
  const waitId = stringValue(payload.waitId) ?? `legacy-human-wait:${event.id}`;
  const pendingActionRef =
    stringValue(wait.pendingActionRef) ?? humanActionRef(event) ?? priorPendingActionRef;
  const reason =
    stringValue(wait.reason) ??
    stringValue(payload.reason) ??
    'Legacy human review requires an operator decision';

  if (stringValue(wait.type) === 'human' && stringValue(payload.waitId) && pendingActionRef) {
    return {
      event: structuredClone(event),
      entry: {
        eventId: event.id,
        runId: event.runId,
        status: 'current',
        waitId,
        pendingActionRef,
      },
    };
  }
  if (!pendingActionRef) {
    return {
      event: structuredClone(event),
      entry: {
        eventId: event.id,
        runId: event.runId,
        status: 'quarantined',
        reason: 'Legacy Human Wait has no stable Tool, Task, Request, or invocation evidence',
      },
    };
  }

  const migratedPayload = {
    ...payload,
    waitId,
    wait: {
      ...wait,
      type: 'human',
      reason,
      pendingActionRef,
    },
  };
  const migrated = {
    ...structuredClone(event),
    payload: migratedPayload,
    ...('payloadHash' in event ? { payloadHash: hashCanonicalJson(migratedPayload) } : {}),
  } as TEvent;
  return {
    event: migrated,
    entry: {
      eventId: event.id,
      runId: event.runId,
      status: 'migrated',
      waitId,
      pendingActionRef,
    },
  };
}

function humanActionRef(event: FrameworkEvent): string | undefined {
  const payload = record(event.payload);
  const wait = record(payload.wait);
  const finalAction = record(payload.finalAction);
  const task = Array.isArray(payload.tasks) ? record(payload.tasks[0]) : {};
  const direct =
    stringValue(wait.pendingActionRef) ??
    stringValue(payload.pendingActionRef) ??
    stringValue(payload.invocationId) ??
    stringValue(payload.taskId) ??
    stringValue(payload.requestId) ??
    stringValue(finalAction.invocationId) ??
    stringValue(finalAction.toolCallId) ??
    stringValue(task.taskId);
  if (direct) return direct;
  const toolId =
    stringValue(payload.toolId) ??
    stringValue(payload.requestedToolId) ??
    stringValue(payload.tool) ??
    stringValue(finalAction.toolId) ??
    stringValue(finalAction.tool);
  return toolId ? `tool:${toolId}` : undefined;
}

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export type MigratableRuntimeEvent = FrameworkEvent | PersistedFrameworkEvent;
