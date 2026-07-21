import { createFrameworkEvent, type FrameworkEventType } from '@hypha/core';
import {
  projectWorkflowExecution,
  workflowExecutionIdFromEvent,
} from './WorkflowExecutionProjection';

function event(id: string, type: FrameworkEventType, payload: unknown, timestamp: string) {
  return createFrameworkEvent({
    id,
    type,
    runId: 'run-1',
    sessionId: 'user:user-1:session:session-1',
    userId: 'user-1',
    payload,
    timestamp,
  });
}

const created = createFrameworkEvent({
  id: 'run-1:created',
  type: 'run.created',
  runId: 'run-1',
  sessionId: 'user:user-1:session:session-1',
  userId: 'user-1',
  timestamp: '2026-07-21T01:00:00.000Z',
  payload: {
    id: 'run-1',
    userId: 'user-1',
    workflowRef: { id: 'workflow.demo', version: '1.2.0' },
    input: { message: 'run it' },
  },
  metadata: { surface: 'http.workflows.execute', userId: 'user-1' },
});

describe('WorkflowExecutionProjection', () => {
  it('rebuilds a legacy execution id and stage results from durable events', () => {
    const events = [
      created,
      event('started', 'run.started', {}, '2026-07-21T01:00:01.000Z'),
      event(
        'stage-started',
        'workflow.stage.started',
        { executionId: 'execution-legacy', stageId: 'prepare' },
        '2026-07-21T01:00:02.000Z'
      ),
      event(
        'stage-completed',
        'workflow.stage.completed',
        {
          executionId: 'execution-legacy',
          stageId: 'prepare',
          result: { stageId: 'prepare', success: true, output: { ready: true }, duration: 12 },
        },
        '2026-07-21T01:00:03.000Z'
      ),
      event(
        'completed',
        'run.completed',
        { output: { executionId: 'execution-legacy', status: 'completed' } },
        '2026-07-21T01:00:04.000Z'
      ),
    ];

    expect(projectWorkflowExecution(events.reverse(), 'execution-legacy')).toMatchObject({
      runId: 'run-1',
      executionId: 'execution-legacy',
      userId: 'user-1',
      status: 'completed',
      workflowName: 'workflow.demo',
      workflowVersion: '1.2.0',
      currentStage: 'prepare',
    });
    expect(
      projectWorkflowExecution(events, 'execution-legacy')?.stageResults.get('prepare')
    ).toMatchObject({ success: true, output: { ready: true }, duration: 12 });
    expect(workflowExecutionIdFromEvent(events[1])).toBe('execution-legacy');
  });

  it('accepts runId as the canonical execution alias and projects cancellation', () => {
    const projection = projectWorkflowExecution(
      [
        created,
        event('started', 'run.started', {}, '2026-07-21T01:00:01.000Z'),
        event('cancelled', 'run.cancelled', { reason: 'operator' }, '2026-07-21T01:00:02.000Z'),
      ],
      'run-1'
    );

    expect(projection).toMatchObject({
      runId: 'run-1',
      executionId: 'run-1',
      status: 'cancelled',
    });
  });

  it('does not expose non-workflow Runs or unrelated execution ids', () => {
    expect(projectWorkflowExecution([created], 'another-execution')).toBeNull();
    expect(
      projectWorkflowExecution(
        [
          createFrameworkEvent({
            ...created,
            id: 'chat-created',
            metadata: { surface: 'http.chat' },
          }),
        ],
        'run-1'
      )
    ).toBeNull();
  });
});
