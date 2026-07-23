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
    listHumanReviews: jest.fn(),
    decideHumanReview: jest.fn(),
    listSkillHumanReviews: jest.fn(),
    decideSkillHumanReview: jest.fn(),
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
  const adminToken = generateToken({
    id: 'runtime-admin',
    email: 'runtime-admin@hypha.local',
    isAdmin: true,
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
    runtime.listHumanReviews.mockResolvedValue([{ taskId: 'human-review-1', revision: 1 }]);
    runtime.decideHumanReview.mockResolvedValue({
      taskId: 'human-review-1',
      status: 'approved',
      revision: 2,
    });
    runtime.listSkillHumanReviews.mockResolvedValue([{ taskId: 'skill-review-1' }]);
    runtime.decideSkillHumanReview.mockResolvedValue({
      taskId: 'skill-review-1',
      status: 'approved',
    });
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

  it('lists Skill reviews only through the owned Run boundary', async () => {
    const response = await request(app)
      .get(`/runtime/runs/${run.id}/human-reviews/skills`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    expect(response.body.data).toEqual([{ taskId: 'skill-review-1' }]);
    expect(runtime.listSkillHumanReviews).toHaveBeenCalledWith(run.id, ownerId);

    await request(app)
      .get(`/runtime/runs/${run.id}/human-reviews/skills`)
      .set('Authorization', `Bearer ${foreignToken}`)
      .expect(404);
  });

  it('allows only an admin reviewer to resolve a Skill task', async () => {
    await request(app)
      .post(`/runtime/runs/${run.id}/human-reviews/skills/skill-review-1/decision`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ decision: 'approved' })
      .expect(403);

    await request(app)
      .post(`/runtime/runs/${run.id}/human-reviews/skills/skill-review-1/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'approved' })
      .expect(200);
    expect(runtime.decideSkillHumanReview).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: run.id,
        taskId: 'skill-review-1',
        decision: 'approved',
        decidedBy: 'runtime-admin',
      })
    );
  });

  it('requires an admin and an expected revision for Generic HumanTask CAS', async () => {
    const listed = await request(app)
      .get(`/runtime/runs/${run.id}/human-reviews`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
    expect(listed.body.data).toEqual([{ taskId: 'human-review-1', revision: 1 }]);

    await request(app)
      .post(`/runtime/runs/${run.id}/human-reviews/human-review-1/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'approved' })
      .expect(400);
    await request(app)
      .post(`/runtime/runs/${run.id}/human-reviews/human-review-1/decision`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ decision: 'approved', expectedRevision: 1 })
      .expect(403);
    await request(app)
      .post(`/runtime/runs/${run.id}/human-reviews/human-review-1/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ decision: 'approved', expectedRevision: 1 })
      .expect(200);

    expect(runtime.decideHumanReview).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: run.id,
        taskId: 'human-review-1',
        expectedRevision: 1,
        decision: 'approved',
        decidedBy: 'runtime-admin',
      })
    );
  });
});
