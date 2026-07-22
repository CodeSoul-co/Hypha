import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getEventRuntime } from '../services/EventRuntime';
import runtimeRoutes from './runtime.routes';

jest.mock('../services/EventRuntime', () => ({
  getEventRuntime: jest.fn(),
}));

describe('runtime authorization', () => {
  const ownerId = 'runtime-owner';
  const run = { id: 'run-owned', userId: ownerId, sessionId: 'session-1', status: 'running' };
  const runtime = {
    projectOwnedRun: jest.fn(),
    listEvents: jest.fn(),
    projectReplay: jest.fn(),
    projectAudit: jest.fn(),
    projectRegression: jest.fn(),
    listSkillHumanReviews: jest.fn(),
    decideSkillHumanReview: jest.fn(),
    enqueueStartRun: jest.fn(),
    listSessionCommands: jest.fn(),
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
    runtime.listSkillHumanReviews.mockResolvedValue([{ taskId: 'skill-review-1' }]);
    runtime.decideSkillHumanReview.mockResolvedValue({
      taskId: 'skill-review-1',
      status: 'approved',
    });
    runtime.enqueueStartRun.mockResolvedValue({
      id: 'session-command-1',
      commandType: 'start_run',
      idempotencyKey: 'request-1',
      userId: ownerId,
      sessionId: 'session-1',
      targetRunId: 'run-1',
      enqueueSequence: 4,
      priority: 50,
      attempts: 0,
      maxAttempts: 5,
      payloadRef: 'artifact://session-command-1',
      payloadHash: `sha256:${'a'.repeat(64)}`,
      claimedBy: 'runtime-worker',
      leaseExpiresAt: '2026-07-22T08:01:00.000Z',
      status: 'queued',
      createdAt: '2026-07-22T08:00:00.000Z',
      availableAt: '2026-07-22T08:00:00.000Z',
    });
    runtime.listSessionCommands.mockResolvedValue([]);
  });

  it('accepts a durable start_run command in the authenticated Session scope', async () => {
    const response = await request(app)
      .post('/runtime/sessions/session-1/commands/start-run')
      .set('Authorization', `Bearer ${ownerToken}`)
      .set('Idempotency-Key', ' request-1 ')
      .send({ input: { task: 'test' }, agentId: 'agent-1' })
      .expect(202);

    expect(runtime.enqueueStartRun).toHaveBeenCalledWith(
      {
        input: { task: 'test' },
        agentId: 'agent-1',
        userId: ownerId,
        sessionId: 'session-1',
      },
      'request-1'
    );
    expect(response.body.data).toMatchObject({
      id: 'session-command-1',
      enqueueSequence: 4,
      status: 'queued',
    });
    expect(response.body.data).not.toHaveProperty('payloadRef');
    expect(response.body.data).not.toHaveProperty('payloadHash');
    expect(response.body.data).not.toHaveProperty('claimedBy');
    expect(response.body.data).not.toHaveProperty('leaseExpiresAt');
  });

  it('rejects a start_run command without an idempotency key or with ownership fields', async () => {
    await request(app)
      .post('/runtime/sessions/session-1/commands/start-run')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ input: { task: 'test' } })
      .expect(400);

    const response = await request(app)
      .post('/runtime/sessions/session-1/commands/start-run')
      .set('Authorization', `Bearer ${ownerToken}`)
      .set('Idempotency-Key', 'request-1')
      .send({ input: { task: 'test' }, userId: 'runtime-foreign' })
      .expect(400);

    expect(response.body.error.code).toBe('INVALID_SESSION_COMMAND');
    expect(runtime.enqueueStartRun).not.toHaveBeenCalled();
  });

  it('lists commands only in the authenticated Session scope with validated pagination', async () => {
    await request(app)
      .get('/runtime/sessions/session-1/commands')
      .query({ status: 'queued,failed', fromSequence: '4', limit: '25' })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(runtime.listSessionCommands).toHaveBeenCalledWith(
      { userId: ownerId, sessionId: 'session-1' },
      { statuses: ['queued', 'failed'], fromSequence: 4, limit: 25 }
    );
  });

  it('rejects unsupported command query values before reading the queue', async () => {
    const response = await request(app)
      .get('/runtime/sessions/session-1/commands')
      .query({ status: 'unknown', limit: '1001' })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(400);

    expect(response.body.error.code).toBe('INVALID_SESSION_COMMAND');
    expect(runtime.listSessionCommands).not.toHaveBeenCalled();
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
});
