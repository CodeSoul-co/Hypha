import { FrameworkError, hashCanonicalJson, type FrameworkEvent } from '@hypha/core';

export type HumanTaskStatus =
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'cancelled';

export interface HumanTask {
  taskId: string;
  taskKind: string;
  runId: string;
  subjectType: string;
  subjectId: string;
  subjectRevision: string;
  subjectHash: string;
  principalId: string;
  agentId?: string;
  tenantId?: string;
  domainId?: string;
  requestedAt: string;
  expiresAt: string;
  status: HumanTaskStatus;
  revision: number;
  decidedBy?: string;
  decidedAt?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export function projectHumanTasks(events: readonly FrameworkEvent[]): HumanTask[] {
  const tasks = new Map<string, HumanTask>();
  for (const event of events) {
    const payload = record(event.payload);
    const taskId = text(payload?.taskId);
    if (!taskId) continue;
    if (event.type === 'human.review.requested') {
      const task = parseRequestedTask(payload);
      if (!task || tasks.has(task.taskId)) continue;
      tasks.set(task.taskId, task);
      continue;
    }
    const current = tasks.get(taskId);
    if (!current) continue;
    const nextStatus = statusFromEvent(event.type);
    if (!nextStatus) continue;
    const expectedRevision = integer(payload?.expectedRevision);
    if (expectedRevision !== undefined && expectedRevision !== current.revision) continue;
    tasks.set(taskId, {
      ...current,
      status: nextStatus,
      revision: current.revision + 1,
      decidedBy: text(payload?.decidedBy),
      decidedAt: text(payload?.decidedAt) ?? event.timestamp,
      reason: text(payload?.reason) ?? current.reason,
    });
  }
  return Array.from(tasks.values());
}

export function assertHumanTaskCAS(
  task: HumanTask | undefined,
  expectedRevision: number,
  now: string
): HumanTask {
  if (!task) {
    throw humanTaskError('HUMAN_TASK_NOT_FOUND', 'Human task was not found.');
  }
  if (task.revision !== expectedRevision) {
    throw humanTaskError('HUMAN_TASK_REVISION_CONFLICT', 'Human task revision conflict.', {
      taskId: task.taskId,
      expectedRevision,
      actualRevision: task.revision,
    });
  }
  if (task.status !== 'requested') {
    throw humanTaskError('HUMAN_TASK_ALREADY_RESOLVED', 'Human task is already resolved.', {
      taskId: task.taskId,
      status: task.status,
    });
  }
  if (Date.parse(task.expiresAt) <= Date.parse(now)) {
    throw humanTaskError('HUMAN_TASK_EXPIRED', 'Human task has expired.', {
      taskId: task.taskId,
    });
  }
  return task;
}

export function humanTaskResolutionEventId(input: {
  runId: string;
  taskId: string;
  expectedRevision: number;
}): string {
  const subject = hashCanonicalJson({ runId: input.runId, taskId: input.taskId }).slice(
    'sha256:'.length
  );
  return `${input.runId}:human-review:${subject}:revision:${input.expectedRevision + 1}`;
}

function parseRequestedTask(payload: Record<string, unknown> | undefined): HumanTask | null {
  if (!payload) return null;
  const required = {
    taskId: text(payload.taskId),
    taskKind: text(payload.taskKind),
    runId: text(payload.runId),
    subjectType: text(payload.subjectType),
    subjectId: text(payload.subjectId),
    subjectRevision: text(payload.subjectRevision),
    subjectHash: text(payload.subjectHash),
    principalId: text(payload.principalId),
    requestedAt: text(payload.requestedAt),
    expiresAt: text(payload.expiresAt),
  };
  if (
    Object.values(required).some((value) => !value) ||
    !/^[a-f0-9]{64}$/u.test(required.subjectHash!)
  ) {
    return null;
  }
  return {
    taskId: required.taskId!,
    taskKind: required.taskKind!,
    runId: required.runId!,
    subjectType: required.subjectType!,
    subjectId: required.subjectId!,
    subjectRevision: required.subjectRevision!,
    subjectHash: required.subjectHash!,
    principalId: required.principalId!,
    agentId: text(payload.agentId),
    tenantId: text(payload.tenantId),
    domainId: text(payload.domainId),
    requestedAt: required.requestedAt!,
    expiresAt: required.expiresAt!,
    status: 'requested',
    revision: 1,
    reason: text(payload.reason),
    metadata: record(payload.metadata),
  };
}

function statusFromEvent(type: FrameworkEvent['type']): HumanTaskStatus | undefined {
  if (type === 'human.review.approved') return 'approved';
  if (type === 'human.review.rejected') return 'rejected';
  if (type === 'human.review.expired') return 'expired';
  if (type === 'human.review.cancelled') return 'cancelled';
  return undefined;
}

function humanTaskError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, context });
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function integer(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : undefined;
}
