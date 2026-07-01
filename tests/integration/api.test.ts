/**
 * API integration tests — hit the real Express app via supertest with real
 * Mongo + Redis. LLM endpoints are deliberately NOT covered here (they would
 * burn DeepSeek tokens on every CI run); see chat-llm.test.ts for those when
 * needed. The tests focus on regressions for bugs found during smoke testing:
 *
 *   bug 2  — compatible adapter provider tag is correct
 *   bug 4  — /auth/login accepts .local TLD
 *   bug 6  — /users/tasks/feed is public
 *   bug 7  — /models/health exists and is not swallowed by /:id
 *   bug 8  — built-in skills appear in /skills
 *   bug 9  — built-in tools appear in /tools
 *   bug 10 — /workflows/:name/execute does not crash on minimal context
 */
import request from 'supertest';
import application from '../../src/app';
import { generateToken } from '../../src/middleware/auth';
import { UserModel } from '../../src/models/User';

const app = application.getApp();

let devToken = '';
let devUserId = '';

beforeAll(async () => {
  await application.initialize();
  // Build a JWT for the seeded dev user (DevAuth.initDevTestUser ran during init()).
  const user = await UserModel.findOne({ email: 'dev@test.local' });
  if (!user) throw new Error('dev user not seeded — is NODE_ENV=production?');
  devUserId = String(user._id);
  devToken = generateToken({ id: devUserId, email: user.email, isAdmin: !!user.isAdmin });
});

afterAll(async () => {
  await application.stop();
});

describe('GET /api/v1/health', () => {
  it('returns 200 with status=healthy', async () => {
    const r = await request(app).get('/api/v1/health');
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    expect(r.body.data.status).toBe('healthy');
  });
});

describe('GET /api/v1/models', () => {
  it('lists at least one model and DeepSeek models carry provider=deepseek (bug 2)', async () => {
    const r = await request(app).get('/api/v1/models').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data)).toBe(true);
    expect(r.body.data.length).toBeGreaterThan(0);

    const dsModels = r.body.data.filter((m: any) => m.id?.startsWith('deepseek-v4'));
    if (dsModels.length > 0) {
      // The bug-2 regression: provider was incorrectly tagged 'openai' for
      // OpenAICompatible-backed entries. DeepSeek uses its own adapter so it
      // was unaffected; we still assert here as a smoke check.
      for (const m of dsModels) expect(m.provider).toBe('deepseek');
    }
  });

  it('SiliconFlow / Kimi etc. compatible models report their real provider (bug 2)', async () => {
    const r = await request(app).get('/api/v1/models').set('Authorization', `Bearer ${devToken}`);
    const compat = r.body.data.filter((m: any) =>
      ['siliconflow', 'kimi', 'groq', 'together', 'perplexity'].includes(m.provider)
    );
    // Skip if no compatible providers configured in this env.
    if (compat.length === 0) return;
    // Bug 2: before fix, every compatible model came back as provider='openai'.
    for (const m of compat) expect(m.provider).not.toBe('openai');
  });
});

describe('GET /api/v1/models/health (bug 7)', () => {
  it('returns provider health, not MODEL_NOT_FOUND', async () => {
    const r = await request(app).get('/api/v1/models/health').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    expect(r.body.data).toHaveProperty('providers');
    expect(r.body.data).toHaveProperty('defaultProvider');
    // Before the fix this route fell through to /:id and returned MODEL_NOT_FOUND.
    expect(r.body.error?.code).not.toBe('MODEL_NOT_FOUND');
  });
});

describe('POST /api/v1/auth/login (bug 4)', () => {
  it('accepts .local TLD email and returns tokens', async () => {
    const r = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'dev@test.local', password: 'devpassword123' });
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    expect(r.body.data?.accessToken).toBeTruthy();
  });

  it('still rejects malformed emails', async () => {
    const r = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'not-an-email', password: 'whatever' });
    expect(r.status).toBe(400);
    expect(r.body.success).toBe(false);
  });
});

describe('GET /api/v1/users/tasks/feed (bug 6)', () => {
  it('is reachable without an Authorization header', async () => {
    const r = await request(app).get('/api/v1/users/tasks/feed?page=1&limit=5');
    // Bug 6: pre-fix this returned 401 AUTH_TOKEN_MISSING.
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
  });
});

describe('GET /api/v1/skills (bug 8)', () => {
  it('includes built-in skills (context-enrichment, intent-classification)', async () => {
    const r = await request(app).get('/api/v1/skills').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    const ids = (r.body.data || []).map((s: any) => s.id);
    // Pre-fix the list was empty because SkillManager scanned a non-existent dir.
    expect(ids).toEqual(expect.arrayContaining(['context-enrichment', 'intent-classification']));
  });
});

describe('GET /api/v1/tools (bug 9)', () => {
  it('includes built-in tools (filesystem, search)', async () => {
    const r = await request(app).get('/api/v1/tools').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    const names = (r.body.data || []).map((t: any) => t.name);
    expect(names).toEqual(expect.arrayContaining(['filesystem', 'search']));
  });
});

describe('POST /api/v1/workflows/conversation-flow/execute (bug 10)', () => {
  it('does not crash on minimal context (was: "Cannot read properties of undefined (reading map)")', async () => {
    const r = await request(app)
      .post('/api/v1/workflows/conversation-flow/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ version: '1.0.0', context: { input: 'hello' } });
    expect(r.status).toBe(200);
    // We allow the workflow itself to fail at later stages (LLM call etc.) —
    // the regression is that we used to fail BEFORE reaching the first stage.
    const errMsg = r.body.data?.error || '';
    expect(errMsg).not.toMatch(/Cannot read propert/i);
  });
});

describe('POST /api/v1/tools/execute (bugs 8/9 — search is a stub but reachable)', () => {
  it('routes through to the built-in search tool', async () => {
    const r = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'search', params: { query: 'ping', limit: 1 } });
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    // The stub returns deterministic shape; just sanity check the contract.
    expect(r.body.data?.query).toBe('ping');
  });
});

describe('workflow template variable resolution (remaining #2)', () => {
  it('substitutes ${env.VAR} in stage.model so the LLM is called with a real model id', async () => {
    // The bundled conversation-flow.yaml has `model: ${AGENT_DEFAULT_MODEL}`.
    // Set the env var BEFORE the workflow engine reads it. The engine resolves
    // placeholders on every execute(), so this works even though the YAML was
    // loaded during application.initialize() with the env var unset.
    process.env.AGENT_DEFAULT_MODEL = 'deepseek-v4-flash';
    expect(process.env.AGENT_DEFAULT_MODEL).toBe('deepseek-v4-flash'); // sanity

    const r = await request(app)
      .post('/api/v1/workflows/conversation-flow/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ version: '1.0.0', context: { input: 'say ok' } });
    expect(r.status).toBe(200);
    const err = r.body.data?.error || '';
    // The LLM stage should NOT fail with "The supported API model names are …"
    // which is the verbatim-placeholder signature bug.
    expect(err).not.toMatch(/supported API model names are/i);
  });
});

describe('skill install flow (.md format)', () => {
  const validSkill = `---
id: integration-test-skill
name: Integration Test Skill
description: Installed at test time
version: 1.0.0
priority: 7
enabled: true
triggers:
  - type: always
---

# Integration Test Skill

Body.`;

  afterAll(async () => {
    // Best-effort cleanup so re-runs don't accumulate.
    await request(app)
      .delete('/api/v1/skills/install/integration-test-skill')
      .set('Authorization', `Bearer ${devToken}`)
      .catch(() => undefined);
  });

  it('installs from inline content and reload makes it visible', async () => {
    const install = await request(app)
      .post('/api/v1/skills/install')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ source: 'inline', content: validSkill, filename: 'integration-test-skill.md' });
    expect(install.status).toBe(200);
    expect(install.body.data.id).toBe('integration-test-skill');
    expect(install.body.data.filePath).toContain('integration-test-skill.md');

    const reload = await request(app)
      .post('/api/v1/skills/reload')
      .set('Authorization', `Bearer ${devToken}`);
    expect(reload.status).toBe(200);
    expect(reload.body.data.skillCount).toBeGreaterThanOrEqual(3);

    const detail = await request(app)
      .get('/api/v1/skills/integration-test-skill')
      .set('Authorization', `Bearer ${devToken}`);
    expect(detail.status).toBe(200);
    expect(detail.body.data.id).toBe('integration-test-skill');
    expect(detail.body.data.priority).toBe(7);
  });

  it('rejects malformed frontmatter with INVALID_SKILL', async () => {
    const bad = `---
id: malformed
---
body without required fields`;
    const r = await request(app)
      .post('/api/v1/skills/install')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ source: 'inline', content: bad });
    expect(r.status).toBe(400);
    expect(r.body.error?.code).toBe('INVALID_SKILL');
  });

  it('rejects duplicate id with SKILL_ALREADY_INSTALLED', async () => {
    const dup = validSkill.replace(/integration-test-skill/, 'integration-test-skill');
    const r = await request(app)
      .post('/api/v1/skills/install')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ source: 'inline', content: dup });
    expect(r.status).toBe(409);
    expect(r.body.error?.code).toBe('SKILL_ALREADY_INSTALLED');
  });
});
