import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getEventRuntime } from '../services/EventRuntime';
import workflowRoutes from './workflow.routes';

jest.mock('../core/workflow/WorkflowEngine', () => ({
  getWorkflowEngine: jest.fn(),
}));
jest.mock('../services/EventRuntime', () => ({
  getEventRuntime: jest.fn(),
}));

describe('workflow execution authorization', () => {
  const ownerId = 'workflow-owner';
  const execution = {
    executionId: 'execution-1',
    runId: 'run-1',
    userId: ownerId,
    workflowName: 'workflow-1',
    workflowVersion: '1.0.0',
    status: 'running',
    stageResults: new Map(),
    startedAt: new Date('2026-07-21T00:00:00.000Z'),
  };
  const runtime = {
    projectOwnedWorkflowExecution: jest.fn(),
    requireOwnedRunScope: jest.fn(),
    enqueueCancelRun: jest.fn(),
  };
  const app = express();
  app.use(express.json());
  app.use('/workflows', workflowRoutes);
  const ownerToken = generateToken({
    id: ownerId,
    email: 'workflow-owner@hypha.local',
    isAdmin: false,
  });
  const foreignToken = generateToken({
    id: 'workflow-foreign',
    email: 'workflow-foreign@hypha.local',
    isAdmin: false,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getEventRuntime as jest.Mock).mockReturnValue(runtime);
    runtime.projectOwnedWorkflowExecution.mockImplementation(
      async (_executionId: string, userId: string) => (userId === ownerId ? execution : null)
    );
    runtime.requireOwnedRunScope.mockResolvedValue({
      runId: execution.runId,
      userId: ownerId,
      sessionId: 'runtime-session-1',
      clientSessionId: 'workflow-session-1',
    });
    runtime.enqueueCancelRun.mockResolvedValue({
      id: 'session-command-cancel-1',
      enqueueSequence: 3,
      status: 'queued',
    });
  });

  it('allows the owner to read and cancel an execution', async () => {
    await request(app)
      .get(`/workflows/executions/${execution.executionId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    await request(app)
      .post(`/workflows/executions/${execution.executionId}/cancel`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .set('Idempotency-Key', 'workflow-cancel-request-1')
      .send({ reason: 'Stop workflow' })
      .expect(202);

    expect(runtime.projectOwnedWorkflowExecution).toHaveBeenCalledWith(
      execution.executionId,
      ownerId
    );
    expect(runtime.requireOwnedRunScope).toHaveBeenCalledWith(execution.runId, ownerId);
    expect(runtime.enqueueCancelRun).toHaveBeenCalledWith(
      {
        userId: ownerId,
        sessionId: 'workflow-session-1',
        runId: execution.runId,
        reason: 'Stop workflow',
      },
      'workflow-cancel-request-1'
    );
  });

  it('hides a foreign execution and denies cancellation', async () => {
    await request(app)
      .get(`/workflows/executions/${execution.executionId}`)
      .set('Authorization', `Bearer ${foreignToken}`)
      .expect(404);
    await request(app)
      .post(`/workflows/executions/${execution.executionId}/cancel`)
      .set('Authorization', `Bearer ${foreignToken}`)
      .expect(404);

    expect(runtime.enqueueCancelRun).not.toHaveBeenCalled();
  });

  it('rejects an empty cancellation reason before enqueueing', async () => {
    const response = await request(app)
      .post(`/workflows/executions/${execution.executionId}/cancel`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ reason: '   ' })
      .expect(400);

    expect(response.body.error.code).toBe('INVALID_SESSION_COMMAND');
    expect(runtime.enqueueCancelRun).not.toHaveBeenCalled();
  });
});
