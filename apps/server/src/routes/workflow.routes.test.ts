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
    cancelOwnedWorkflowExecution: jest.fn(),
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
    runtime.cancelOwnedWorkflowExecution.mockImplementation(
      async ({ userId }: { userId: string }) =>
        userId === ownerId
          ? { disposition: 'applied', projection: { runStatus: 'cancelled' } }
          : null
    );
  });

  it('allows the owner to read and cancel an execution', async () => {
    await request(app)
      .get(`/workflows/executions/${execution.executionId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    await request(app)
      .post(`/workflows/executions/${execution.executionId}/cancel`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(runtime.projectOwnedWorkflowExecution).toHaveBeenCalledWith(
      execution.executionId,
      ownerId
    );
    expect(runtime.cancelOwnedWorkflowExecution).toHaveBeenCalledWith(
      expect.objectContaining({ executionId: execution.executionId, userId: ownerId })
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

    expect(runtime.cancelOwnedWorkflowExecution).toHaveBeenCalledWith(
      expect.objectContaining({
        executionId: execution.executionId,
        userId: 'workflow-foreign',
      })
    );
  });
});
