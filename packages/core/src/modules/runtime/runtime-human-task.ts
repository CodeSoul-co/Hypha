import type { FrameworkEvent } from '../../events';
import { FrameworkError } from '../../errors';
import type {
  RuntimeHumanTask,
  RuntimeHumanTaskDecisionCommand,
  RuntimeHumanTaskKind,
  RuntimeHumanTaskStatus,
} from '../../contracts/runtime-human-task';
import { validateRuntimeHumanTask } from '../../contracts/runtime-human-task-schemas';
import { hashCanonicalJson } from './canonical-json';

export function projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[] {
  const tasks = new Map<string, RuntimeHumanTask>();
  for (const event of events) {
    const payload = record(event.payload);
    const taskId = text(payload?.taskId);
    if (!taskId) continue;
    if (event.type === 'human.review.requested') {
      const task = parseRequestedTask(event, payload);
      if (task && !tasks.has(task.taskId)) tasks.set(task.taskId, task);
      continue;
    }
    const current = tasks.get(taskId);
    if (!current) continue;
    const status = statusFromEvent(event.type);
    if (!status) continue;
    const expectedRevision = positiveInteger(payload?.expectedRevision) ?? current.revision;
    if (expectedRevision !== current.revision) continue;
    tasks.set(
      taskId,
      validateRuntimeHumanTask({
        ...current,
        status,
        revision: current.revision + 1,
        ...(text(payload?.decidedBy) === undefined ? {} : { decidedBy: text(payload?.decidedBy) }),
        decidedAt: text(payload?.decidedAt) ?? event.timestamp,
        ...(text(payload?.reason) === undefined ? {} : { reason: text(payload?.reason) }),
      })
    );
  }
  return [...tasks.values()];
}

export function assertRuntimeHumanTaskDecision<TTask extends RuntimeHumanTask>(
  task: TTask | undefined,
  command: Pick<
    RuntimeHumanTaskDecisionCommand,
    'expectedRevision' | 'expectedSubjectHash' | 'principal' | 'decidedAt'
  >
): TTask {
  if (!task) humanTaskError('HUMAN_TASK_NOT_FOUND', 'Human task was not found.');
  if (task.revision !== command.expectedRevision) {
    humanTaskError('HUMAN_TASK_REVISION_CONFLICT', 'Human task revision conflict.', {
      taskId: task.taskId,
      expectedRevision: command.expectedRevision,
      actualRevision: task.revision,
    });
  }
  if (task.status !== 'pending') {
    humanTaskError('HUMAN_TASK_ALREADY_RESOLVED', 'Human task is already resolved.', {
      taskId: task.taskId,
      status: task.status,
    });
  }
  if (task.subjectHash !== command.expectedSubjectHash) {
    humanTaskError('HUMAN_TASK_SUBJECT_MISMATCH', 'Human task subject hash changed.', {
      taskId: task.taskId,
      expectedSubjectHash: command.expectedSubjectHash,
      actualSubjectHash: task.subjectHash,
    });
  }
  if (task.expiresAt !== undefined && Date.parse(task.expiresAt) <= Date.parse(command.decidedAt)) {
    humanTaskError('HUMAN_TASK_EXPIRED', 'Human task has expired.', {
      taskId: task.taskId,
      expiresAt: task.expiresAt,
    });
  }
  if (
    !task.allowedDecisionScopes.some((scope) => command.principal.permissionScopes.includes(scope))
  ) {
    humanTaskError('HUMAN_TASK_SCOPE_DENIED', 'Principal cannot decide this human task.', {
      taskId: task.taskId,
      principalId: command.principal.principalId,
      allowedDecisionScopes: task.allowedDecisionScopes,
    });
  }
  return task;
}

export function assertRuntimeHumanTaskResume<TTask extends RuntimeHumanTask>(
  task: TTask | undefined,
  expected: {
    taskId: string;
    kind: RuntimeHumanTaskKind;
    subjectRef: string;
    subjectHash: string;
    revision: number;
    requestedBy: string;
    resumedAt: string;
    checkpointRef?: string;
    policyRef?: string;
    providerRevision?: string;
  }
): TTask {
  if (!task) humanTaskError('HUMAN_TASK_NOT_FOUND', 'Human task was not found.');
  const matches =
    task.taskId === expected.taskId &&
    task.status === 'approved' &&
    task.kind === expected.kind &&
    task.subjectRef === expected.subjectRef &&
    task.subjectHash === expected.subjectHash &&
    task.revision === expected.revision &&
    task.requestedBy === expected.requestedBy &&
    task.checkpointRef === expected.checkpointRef &&
    task.policyRef === expected.policyRef &&
    task.providerRevision === expected.providerRevision;
  if (!matches) {
    humanTaskError(
      'HUMAN_TASK_RESUME_REVALIDATION_FAILED',
      'Human task resume evidence changed after approval.',
      {
        taskId: expected.taskId,
        expectedRevision: expected.revision,
        actualRevision: task.revision,
      }
    );
  }
  if (
    task.expiresAt !== undefined &&
    Date.parse(task.expiresAt) <= Date.parse(expected.resumedAt)
  ) {
    humanTaskError('HUMAN_TASK_EXPIRED', 'Human task approval expired before resume.', {
      taskId: task.taskId,
      expiresAt: task.expiresAt,
    });
  }
  return task;
}

export function runtimeHumanTaskResolutionEventId(input: {
  runId: string;
  taskId: string;
  expectedRevision: number;
}): string {
  const subject = hashCanonicalJson({ runId: input.runId, taskId: input.taskId }).slice(
    'sha256:'.length
  );
  return `${input.runId}:human-task:${subject}:revision:${input.expectedRevision + 1}`;
}

export function runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind | undefined {
  switch (value) {
    case 'tool':
    case 'tool_approval':
      return 'tool';
    case 'skill':
    case 'skill_activation':
      return 'skill';
    case 'prompt':
    case 'agent_prompt':
      return 'prompt';
    case 'memory':
      return 'memory';
    case 'execution':
      return 'execution';
    case 'mcp':
      return 'mcp';
    case 'policy':
    case 'effective_capability_snapshot':
      return 'policy';
    default:
      return undefined;
  }
}

function parseRequestedTask(
  event: FrameworkEvent,
  payload: Record<string, unknown> | undefined
): RuntimeHumanTask | null {
  if (!payload) return null;
  const kind = runtimeHumanTaskKind(text(payload.kind) ?? text(payload.taskKind) ?? '');
  const rawHash = text(payload.subjectHash);
  const subjectHash =
    rawHash && /^sha256:[a-f0-9]{64}$/u.test(rawHash)
      ? rawHash
      : rawHash && /^[a-f0-9]{64}$/u.test(rawHash)
        ? `sha256:${rawHash}`
        : undefined;
  const metadata = record(payload.metadata);
  const stateAttempt =
    positiveInteger(payload.stateAttempt) ?? positiveInteger(record(event.metadata)?.stateAttempt);
  const subjectRef = text(payload.subjectRef) ?? legacySubjectRef(payload);
  const task = {
    taskId: text(payload.taskId),
    runId: text(payload.runId) ?? event.runId,
    stateId: text(payload.stateId) ?? event.fsmState,
    stateAttempt,
    kind,
    subjectRef,
    subjectHash,
    status: 'pending' as const,
    requestedBy: text(payload.requestedBy) ?? text(payload.principalId) ?? event.userId,
    allowedDecisionScopes: stringArray(payload.allowedDecisionScopes) ?? [
      'runtime.human-task.decide',
    ],
    requestedAt: text(payload.requestedAt) ?? event.timestamp,
    expiresAt: text(payload.expiresAt),
    revision: positiveInteger(payload.revision) ?? 1,
    checkpointRef: text(payload.checkpointRef),
    policyRef: text(payload.policyRef),
    providerRevision: text(payload.providerRevision),
    reason: text(payload.reason),
    metadata,
  };
  if (
    !task.taskId ||
    !task.runId ||
    !task.stateId ||
    !task.stateAttempt ||
    !task.kind ||
    !task.subjectRef ||
    !task.subjectHash ||
    !task.requestedBy
  ) {
    return null;
  }
  return validateRuntimeHumanTask(withoutUndefined(task));
}

function legacySubjectRef(payload: Record<string, unknown>): string | undefined {
  const type = text(payload.subjectType);
  const id = text(payload.subjectId);
  const revision = text(payload.subjectRevision);
  return type && id ? `${type}:${id}${revision ? `@${revision}` : ''}` : undefined;
}

function statusFromEvent(type: FrameworkEvent['type']): RuntimeHumanTaskStatus | undefined {
  if (type === 'human.review.approved') return 'approved';
  if (type === 'human.review.rejected') return 'rejected';
  if (type === 'human.review.expired') return 'expired';
  if (type === 'human.review.cancelled') return 'cancelled';
  return undefined;
}

function humanTaskError(code: string, message: string, context?: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function positiveInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : undefined;
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => typeof entry === 'string' && entry.length > 0)
    ? [...value]
    : undefined;
}

function withoutUndefined<T extends Record<string, unknown>>(value: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).filter(([, candidate]) => candidate !== undefined)
  );
}
