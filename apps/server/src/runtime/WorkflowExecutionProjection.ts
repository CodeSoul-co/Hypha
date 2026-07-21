import type { FrameworkEvent } from '@hypha/core';
import type { StageResult, WorkflowExecution } from '../core/workflow/types';

export interface WorkflowExecutionProjection {
  runId: string;
  executionId: string;
  userId: string;
  status: WorkflowExecution['status'];
  workflowName: string;
  workflowVersion: string;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  currentStage?: string;
  stageResults: Map<string, StageResult>;
}

export function projectWorkflowExecution(
  events: FrameworkEvent[],
  requestedExecutionId: string
): WorkflowExecutionProjection | null {
  const ordered = [...events].sort(compareEvents);
  const created = ordered.find((event) => event.type === 'run.created');
  if (!created) return null;

  const createdPayload = record(created.payload);
  const workflowEvents = ordered.filter((event) => event.type.startsWith('workflow.stage.'));
  const surface = stringValue(created.metadata?.surface);
  if (
    workflowEvents.length === 0 &&
    surface !== 'http.workflows.execute' &&
    surface !== 'workflow-engine.execute'
  ) {
    return null;
  }

  const terminal = [...ordered]
    .reverse()
    .find((event) => ['run.completed', 'run.failed', 'run.cancelled'].includes(event.type));
  const executionId =
    workflowEvents.map(eventExecutionId).find(Boolean) ??
    stringValue(record(record(terminal?.payload)?.output)?.executionId) ??
    created.runId;
  if (requestedExecutionId !== created.runId && requestedExecutionId !== executionId) return null;

  const workflowRef = record(createdPayload?.workflowRef);
  const input = record(createdPayload?.input);
  const workflowName = stringValue(workflowRef?.id) ?? stringValue(input?.workflowName);
  const workflowVersion = stringValue(workflowRef?.version) ?? stringValue(input?.version);
  const userId =
    stringValue(createdPayload?.userId) ??
    stringValue(created.userId) ??
    stringValue(created.metadata?.userId);
  if (!workflowName || !workflowVersion || !userId) return null;

  const stageResults = new Map<string, StageResult>();
  for (const event of workflowEvents) {
    if (event.type !== 'workflow.stage.completed' && event.type !== 'workflow.stage.failed')
      continue;
    const payload = record(event.payload);
    const stageId = stringValue(payload?.stageId);
    const result = record(payload?.result);
    if (!stageId || !result) continue;
    stageResults.set(stageId, {
      stageId,
      success: result.success === true,
      ...(result.output === undefined ? {} : { output: result.output }),
      ...(typeof result.error === 'string' ? { error: result.error } : {}),
      ...(typeof result.duration === 'number' ? { duration: result.duration } : {}),
      ...(record(result.metadata) === undefined ? {} : { metadata: record(result.metadata) }),
    });
  }

  const latestStage = [...workflowEvents]
    .reverse()
    .find((event) => event.type === 'workflow.stage.started');
  const started =
    workflowEvents.find((event) => event.type === 'workflow.stage.started') ??
    ordered.find((event) => event.type === 'run.started') ??
    created;
  const terminalPayload = record(terminal?.payload);

  return {
    runId: created.runId,
    executionId,
    userId,
    status: executionStatus(ordered, terminal),
    workflowName,
    workflowVersion,
    startedAt: new Date(started.timestamp),
    ...(terminal === undefined ? {} : { completedAt: new Date(terminal.timestamp) }),
    ...(typeof terminalPayload?.error === 'string' ? { error: terminalPayload.error } : {}),
    ...(stringValue(record(latestStage?.payload)?.stageId) === undefined
      ? {}
      : { currentStage: stringValue(record(latestStage?.payload)?.stageId) }),
    stageResults,
  };
}

export function workflowExecutionIdFromEvent(event: FrameworkEvent): string | undefined {
  return eventExecutionId(event) ?? stringValue(record(record(event.payload)?.output)?.executionId);
}

function executionStatus(
  events: FrameworkEvent[],
  terminal: FrameworkEvent | undefined
): WorkflowExecution['status'] {
  if (terminal?.type === 'run.completed') return 'completed';
  if (terminal?.type === 'run.failed') return 'failed';
  if (terminal?.type === 'run.cancelled') return 'cancelled';
  return events.some((event) => event.type === 'run.started') ? 'running' : 'pending';
}

function eventExecutionId(event: FrameworkEvent): string | undefined {
  return stringValue(record(event.payload)?.executionId);
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function compareEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  const timestamp = left.timestamp.localeCompare(right.timestamp);
  if (timestamp !== 0) return timestamp;
  const sequence =
    (left.globalSequence ?? left.sequence ?? 0) - (right.globalSequence ?? right.sequence ?? 0);
  return sequence || left.id.localeCompare(right.id);
}
