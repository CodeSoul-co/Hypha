import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getWorkflowEngine } from '../core/workflow/WorkflowEngine';
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
    id: 'execution-1',
    workflowName: 'workflow-1',
    workflowVersion: '1.0.0',
    status: 'running',
    context: { userId: ownerId },
    stageResults: new Map(),
    startedAt: new Date('2026-07-21T00:00:00.000Z'),
  };
  const engine = {
    getExecution: jest.fn(),
    cancel: jest.fn(),
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
    (getWorkflowEngine as jest.Mock).mockReturnValue(engine);
    engine.getExecution.mockReturnValue(execution);
    engine.cancel.mockResolvedValue(undefined);
  });

  it('allows the owner to read and cancel an execution', async () => {
    await request(app)
      .get(`/workflows/executions/${execution.id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    await request(app)
      .post(`/workflows/executions/${execution.id}/cancel`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(engine.cancel).toHaveBeenCalledWith(execution.id);
  });

  it('hides a foreign execution and denies cancellation', async () => {
    await request(app)
      .get(`/workflows/executions/${execution.id}`)
      .set('Authorization', `Bearer ${foreignToken}`)
      .expect(404);
    await request(app)
      .post(`/workflows/executions/${execution.id}/cancel`)
      .set('Authorization', `Bearer ${foreignToken}`)
      .expect(404);

    expect(engine.cancel).not.toHaveBeenCalled();
  });
});
