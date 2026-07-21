import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getEventRuntime } from '../services/EventRuntime';
import runtimeRoutes from './runtime.routes';

jest.mock('../services/EventRuntime', () => ({
  getEventRuntime: jest.fn(),
}));

describe('runtime run authorization', () => {
  const ownerId = 'runtime-owner';
  const run = { id: 'run-owned', userId: ownerId, sessionId: 'session-1', status: 'running' };
  const runtime = {
    projectOwnedRun: jest.fn(),
    listEvents: jest.fn(),
    projectReplay: jest.fn(),
    projectAudit: jest.fn(),
    projectRegression: jest.fn(),
  };
  const app = express();
  app.use(express.json());
  app.use('/runtime', runtimeRoutes);

  const ownerToken = generateToken({
    id: ownerId,
    email: 'runtime-owner@hypha.local',
    isAdmin: false,
  });
  const foreignToken = generateToken({
    id: 'runtime-foreign',
    email: 'runtime-foreign@hypha.local',
    isAdmin: false,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getEventRuntime as jest.Mock).mockReturnValue(runtime);
    runtime.projectOwnedRun.mockImplementation(async (_runId: string, userId: string) =>
      userId === ownerId ? run : null
    );
    runtime.listEvents.mockResolvedValue([{ id: 'event-1' }]);
    runtime.projectReplay.mockResolvedValue({ runId: run.id });
    runtime.projectAudit.mockResolvedValue({ runId: run.id });
    runtime.projectRegression.mockResolvedValue({ runId: run.id });
  });

  it('returns an owned run and its events', async () => {
    await request(app)
      .get(`/runtime/runs/${run.id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    const events = await request(app)
      .get(`/runtime/runs/${run.id}/events`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(events.body.data).toEqual([{ id: 'event-1' }]);
    expect(runtime.projectOwnedRun).toHaveBeenCalledWith(run.id, ownerId);
  });

  it.each(['', '/events', '/replay', '/audit', '/regression'])(
    'hides a foreign run at /runs/:runId%s',
    async (suffix) => {
      const response = await request(app)
        .get(`/runtime/runs/${run.id}${suffix}`)
        .set('Authorization', `Bearer ${foreignToken}`)
        .expect(404);

      expect(response.body.error.code).toBe('RUN_NOT_FOUND');
    }
  );
});
