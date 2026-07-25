import { randomUUID } from 'crypto';
import request from 'supertest';
import application from '../../apps/server/src/app';
import { generateToken } from '../../apps/server/src/middleware/auth';
import { UserModel } from '../../apps/server/src/models/User';

const app = application.getApp();
let token = '';
let userId = '';

beforeAll(async () => {
  await application.initialize();
  const user = await UserModel.findOne({ email: 'owner@hypha.local' });
  if (!user) throw new Error('owner user not seeded');
  userId = String(user._id);
  token = generateToken({ id: userId, email: user.email, isAdmin: true });
});

afterAll(async () => {
  await application.stop();
});

describe('Memory administration API', () => {
  it('requires an administrator and exposes real Provider telemetry/SLO health', async () => {
    const denied = await request(app).get('/api/v1/memory/admin/health');
    expect(denied.status).toBe(401);

    const result = await request(app)
      .get('/api/v1/memory/admin/health')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.data).toMatchObject({
      receipt: { activeProfileId: 'native-default' },
      provider: { id: 'memory.provider.native-default', status: expect.any(String) },
      telemetry: {
        operations: { total: expect.any(Number) },
        latencyMs: { p95: expect.anything() },
        cost: { measuredUnits: expect.any(Number), complete: true },
        slo: { status: expect.stringMatching(/^(met|breached|insufficient_data)$/) },
      },
    });
  });

  it('validates the repository profile through the canonical schema', async () => {
    const result = await request(app)
      .post('/api/v1/memory/admin/profile/validate')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(result.status).toBe(200);
    expect(result.body.data).toMatchObject({
      valid: true,
      activeProfile: 'native-default',
      provider: {
        id: 'memory.provider.native-default',
        type: 'native',
        installed: true,
      },
      issues: [],
    });
  });

  it('plans and reconciles live legacy/canonical inventories without writing', async () => {
    const migrationId = `admin-${randomUUID()}`;
    const plan = await request(app)
      .get(`/api/v1/memory/admin/migrations/${migrationId}/plan`)
      .query({ userId })
      .set('Authorization', `Bearer ${token}`);
    expect(plan.status).toBe(200);
    expect(plan.body.data).toMatchObject({
      migrationId,
      inventory: {
        legacyRecords: expect.any(Number),
        canonicalRecords: expect.any(Number),
        missingCanonicalKeys: expect.any(Array),
        unexpectedCanonicalKeys: expect.any(Array),
        digestMismatchKeys: expect.any(Array),
      },
      checkpoint: null,
    });

    const reconciled = await request(app)
      .post(`/api/v1/memory/admin/migrations/${migrationId}/reconcile`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId });
    expect(reconciled.status).toBe(200);
    expect(reconciled.body.data.inventory).toEqual(plan.body.data.inventory);
  });

  it('returns redacted DLQ inspection records', async () => {
    const result = await request(app)
      .get('/api/v1/memory/admin/dlq')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.data)).toBe(true);
    for (const item of result.body.data) {
      expect(item).toEqual(
        expect.objectContaining({
          taskId: expect.any(String),
          payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/),
        })
      );
      expect(item).not.toHaveProperty('payload');
      expect(item.error).not.toHaveProperty('message');
    }
  });
});
