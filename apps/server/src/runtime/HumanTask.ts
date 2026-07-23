import {
  projectRuntimeHumanTasks,
  runtimeHumanTaskResolutionEventId,
  type FrameworkEvent,
  type RuntimeHumanTask,
} from '@hypha/core';

export interface HumanTask extends RuntimeHumanTask {
  taskKind: string;
  subjectType: string;
  subjectId: string;
  subjectRevision: string;
  principalId: string;
  agentId?: string;
  tenantId?: string;
  domainId?: string;
}

export function projectHumanTasks(events: readonly FrameworkEvent[]): HumanTask[] {
  const requestedPayloads = new Map<string, Record<string, unknown>>();
  for (const event of events) {
    if (event.type !== 'human.review.requested') continue;
    const payload = record(event.payload);
    const taskId = text(payload?.taskId);
    if (taskId && payload && !requestedPayloads.has(taskId)) {
      requestedPayloads.set(taskId, payload);
    }
  }
  return projectRuntimeHumanTasks(events).map((task) => {
    const payload = requestedPayloads.get(task.taskId);
    const legacy = parseSubjectRef(task.subjectRef);
    return {
      ...task,
      taskKind: text(payload?.taskKind) ?? task.kind,
      subjectType: text(payload?.subjectType) ?? legacy.type,
      subjectId: text(payload?.subjectId) ?? legacy.id,
      subjectRevision: text(payload?.subjectRevision) ?? legacy.revision,
      principalId: text(payload?.principalId) ?? task.requestedBy,
      ...(text(payload?.agentId) === undefined ? {} : { agentId: text(payload?.agentId) }),
      ...(text(payload?.tenantId) === undefined ? {} : { tenantId: text(payload?.tenantId) }),
      ...(text(payload?.domainId) === undefined ? {} : { domainId: text(payload?.domainId) }),
    };
  });
}

export const humanTaskResolutionEventId = runtimeHumanTaskResolutionEventId;

function parseSubjectRef(subjectRef: string): {
  type: string;
  id: string;
  revision: string;
} {
  const separator = subjectRef.indexOf(':');
  const type = separator > 0 ? subjectRef.slice(0, separator) : 'unknown';
  const qualified = separator > 0 ? subjectRef.slice(separator + 1) : subjectRef;
  const revisionSeparator = qualified.lastIndexOf('@');
  return revisionSeparator > 0
    ? {
        type,
        id: qualified.slice(0, revisionSeparator),
        revision: qualified.slice(revisionSeparator + 1),
      }
    : { type, id: qualified, revision: 'unknown' };
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}
