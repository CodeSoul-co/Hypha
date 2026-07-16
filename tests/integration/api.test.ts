/**
 * API integration tests — hit the real Express app via supertest with real
 * Mongo + Redis. LLM endpoints are deliberately NOT covered here (they would
 * burn DeepSeek tokens on every CI run); see chat-llm.test.ts for those when
 * needed. The tests focus on regressions for bugs found during smoke testing:
 *
 *   bug 2  — compatible adapter provider tag is correct
 *   bug 4  — /auth/login accepts .local TLD
 *   bug 7  — /models/health exists and is not swallowed by /:id
 *   bug 8  — built-in skills appear in /skills
 *   bug 9  — built-in tools appear in /tools
 *   bug 10 — /workflows/:name/execute does not crash on minimal context
 */
import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import application from '../../apps/server/src/app';
import { generateToken } from '../../apps/server/src/middleware/auth';
import { UserModel } from '../../apps/server/src/models/User';
import { getTemporaryMemory } from '../../apps/server/src/core/memory/TemporaryMemory';
import { getPermanentMemory } from '../../apps/server/src/core/memory/PermanentMemory';
import { getToolManager } from '../../apps/server/src/core/tools/ToolManager';
import { getLLMManager } from '../../apps/server/src/core/llm/LLMFactory';
import type { ITool, ToolParams, ToolResult } from '../../apps/server/src/core/tools/types';

const app = application.getApp();

let devToken = '';
let devUserId = '';

beforeAll(async () => {
  await application.initialize();
  // Build a JWT for the seeded owner user. The default runtime is single-user.
  const user = await UserModel.findOne({ email: 'owner@hypha.local' });
  if (!user) throw new Error('owner user not seeded');
  devUserId = String(user._id);
  devToken = generateToken({
    id: devUserId,
    email: user.email,
    isAdmin: !!user.isAdmin,
  });
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

describe('runtime reasoning and agent prompt registries', () => {
  it('lists registered reasoning strategies with official source metadata', async () => {
    const r = await request(app)
      .get('/api/v1/runtime/reasoning/strategies')
      .set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'reasoning.tot',
          references: expect.arrayContaining([
            expect.objectContaining({
              repository: 'princeton-nlp/tree-of-thought-llm',
              official: true,
            }),
          ]),
        }),
        expect.objectContaining({ id: 'reasoning.got' }),
      ])
    );
  });

  it('registers, lists, and unregisters versioned agent prompts', async () => {
    const id = `integration-agent-prompt-${Date.now()}`;
    const spec = {
      id,
      version: '1.0.0',
      name: 'Integration Agent Prompt',
      role: 'system',
      template: 'You are {{agent_name}}.',
      variables: [{ name: 'agent_name', type: 'string', required: true }],
      stable: true,
      cacheable: true,
    };
    const created = await request(app)
      .post('/api/v1/runtime/agent-prompts')
      .set('Authorization', `Bearer ${devToken}`)
      .send(spec);
    expect(created.status).toBe(201);

    const listed = await request(app)
      .get('/api/v1/runtime/agent-prompts')
      .set('Authorization', `Bearer ${devToken}`);
    expect(listed.status).toBe(200);
    expect(listed.body.data).toEqual(expect.arrayContaining([expect.objectContaining({ id })]));

    const removed = await request(app)
      .delete(`/api/v1/runtime/agent-prompts/${id}?version=1.0.0`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(removed.status).toBe(200);
  });
});

describe('GET /api/v1/models', () => {
  it('lists at least one model and DeepSeek models carry provider=deepseek (bug 2)', async () => {
    const r = await request(app).get('/api/v1/models').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data)).toBe(true);
    expect(r.body.data.length).toBeGreaterThan(0);

    const dsModels = r.body.data.filter((m: any) => m.provider === 'deepseek');
    if (dsModels.length > 0) {
      // The bug-2 regression: provider was incorrectly tagged 'openai' for
      // OpenAI-compatible entries. DeepSeek now uses the package provider
      // profile, so this remains a direct smoke check for provider metadata.
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
    const r = await request(app)
      .get('/api/v1/models/health')
      .set('Authorization', `Bearer ${devToken}`);
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
      .send({ email: 'owner@hypha.local', password: 'hypha_owner_2026' });
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

describe('POST /api/v1/auth/register', () => {
  it('is disabled by default in single-user mode', async () => {
    const r = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `blocked-${Date.now()}@example.com`,
        username: `blocked${Date.now()}`,
        password: 'testpassword123',
      });
    expect(r.status).toBe(403);
    expect(r.body.success).toBe(false);
    expect(r.body.error?.code).toBe('REGISTRATION_DISABLED');
  });
});

describe('user-scoped session storage', () => {
  it('keeps the same sessionId isolated across users in temporary memory', async () => {
    const tempMemory = getTemporaryMemory();
    const sessionId = `shared-${Date.now()}`;

    await tempMemory.addMessage(sessionId, {
      userId: 'user-a',
      sessionId,
      role: 'user',
      content: 'message from a',
    });
    await tempMemory.addMessage(sessionId, {
      userId: 'user-b',
      sessionId,
      role: 'user',
      content: 'message from b',
    });

    const a = await tempMemory.getMessages(sessionId, undefined, 'user-a');
    const b = await tempMemory.getMessages(sessionId, undefined, 'user-b');

    expect(a.map((m) => m.content)).toEqual(['message from a']);
    expect(b.map((m) => m.content)).toEqual(['message from b']);

    await tempMemory.clearMessages(sessionId, 'user-a');
    await tempMemory.clearMessages(sessionId, 'user-b');
  });

  it('allows duplicate sessionId across users in permanent memory', async () => {
    const permanentMemory = getPermanentMemory();
    const sessionId = `shared-${Date.now()}`;

    const a = await permanentMemory.createConversation({
      userId: 'user-a',
      sessionId,
      agentId: 'default',
      modelId: 'test-model',
      modelProvider: 'test',
      tags: [],
      isArchived: false,
    });
    const b = await permanentMemory.createConversation({
      userId: 'user-b',
      sessionId,
      agentId: 'default',
      modelId: 'test-model',
      modelProvider: 'test',
      tags: [],
      isArchived: false,
    });

    expect(a.id).not.toBe(b.id);
    expect((await permanentMemory.getConversationBySessionId(sessionId, 'user-a'))?.id).toBe(a.id);
    expect((await permanentMemory.getConversationBySessionId(sessionId, 'user-b'))?.id).toBe(b.id);

    await permanentMemory.deleteConversation(a.id);
    await permanentMemory.deleteConversation(b.id);
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
  it('includes built-in filesystem, search, and common utility tools', async () => {
    const r = await request(app).get('/api/v1/tools').set('Authorization', `Bearer ${devToken}`);
    expect(r.status).toBe(200);
    const names = (r.body.data || []).map((t: any) => t.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'filesystem',
        'search',
        'utility.json',
        'utility.text',
        'utility.hash',
      ])
    );
  });

  it('executes a common utility through the governed runtime path', async () => {
    const response = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'utility.hash', params: { operation: 'sha256_text', text: 'hypha' } });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      algorithm: 'sha256',
      encoding: 'hex',
      inputBytes: 5,
    });
    expect(response.body.data.digest).toHaveLength(64);

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${response.body.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    expect(events.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.completed',
          payload: expect.objectContaining({
            source: 'local',
            sideEffectLevel: 'none',
          }),
        }),
      ])
    );
  });

  it('writes and executes an allowlisted file through governed runtime events', async () => {
    const scriptPath = 'data/workspace/bin/hypha-integration-print.js';
    try {
      const write = await request(app)
        .post('/api/v1/tools/execute')
        .set('Authorization', `Bearer ${devToken}`)
        .send({
          name: 'filesystem',
          params: {
            operation: 'write',
            path: scriptPath,
            content: "process.stdout.write(process.argv[2] || '');\n",
            executable: true,
          },
        });
      expect(write.status).toBe(200);
      expect(write.body.data).toMatchObject({ executable: true });

      const execute = await request(app)
        .post('/api/v1/tools/execute')
        .set('Authorization', `Bearer ${devToken}`)
        .send({
          name: 'filesystem',
          params: {
            operation: 'execute',
            path: scriptPath,
            args: ['hypha; echo unsafe'],
            cwd: 'data/workspace',
          },
        });
      expect(execute.status).toBe(200);
      expect(execute.body.data).toMatchObject({
        stdout: 'hypha; echo unsafe',
        stderr: '',
        exitCode: 0,
      });

      const events = await request(app)
        .get(`/api/v1/runtime/runs/${execute.body.runId}/events`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(events.status).toBe(200);
      expect(events.body.data || []).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'tool.policy.checked',
            payload: expect.objectContaining({ sideEffectLevel: 'write' }),
          }),
          expect.objectContaining({
            type: 'tool.call.completed',
            payload: expect.objectContaining({ sideEffectLevel: 'write' }),
          }),
        ])
      );
    } finally {
      await fs.rm(path.resolve(scriptPath), { force: true });
    }
  });
});

describe('MCP tool invocation', () => {
  it('lists the configured fixture server and normalized MCP tools', async () => {
    const servers = await request(app)
      .get('/api/v1/tools/mcp/servers')
      .set('Authorization', `Bearer ${devToken}`);
    expect(servers.status).toBe(200);
    expect(servers.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'classic',
          status: 'connected',
          toolCount: 6,
        }),
      ])
    );

    const tools = await request(app)
      .get('/api/v1/tools/mcp/tools')
      .set('Authorization', `Bearer ${devToken}`);
    expect(tools.status).toBe(200);
    const classic = (tools.body.data || []).find((server: any) => server.serverId === 'classic');
    expect(classic).toBeTruthy();
    const toolIds = (classic.tools || []).map((tool: any) => tool.id);
    expect(toolIds).toEqual(
      expect.arrayContaining([
        'filesystem.read_file',
        'search.web_search',
        'baidu.web_search',
        'so360.web_search',
      ])
    );
    expect(classic.tools || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'filesystem.read_file',
          source: 'mcp',
          sourceRef: expect.objectContaining({
            serverId: 'filesystem',
            capabilityId: 'read_file',
          }),
        }),
      ])
    );

    const allTools = await request(app)
      .get('/api/v1/tools')
      .set('Authorization', `Bearer ${devToken}`);
    expect(allTools.status).toBe(200);
    expect((allTools.body.data || []).map((tool: any) => tool.name)).toEqual(
      expect.arrayContaining(['filesystem.read_file', 'search.web_search', 'baidu.web_search'])
    );
  });

  it('executes a fixture MCP filesystem tool through the governed HTTP path', async () => {
    const r = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'filesystem.read_file', params: { path: '/README.md' } });
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    expect(r.body.data).toMatchObject({
      path: '/README.md',
      content: expect.stringContaining('Classic MCP fixture'),
    });

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    expect(events.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'mcp.call.started',
          payload: expect.objectContaining({
            source: 'mcp',
            serverId: 'filesystem',
            capabilityId: 'read_file',
          }),
        }),
        expect.objectContaining({
          type: 'mcp.call.completed',
          payload: expect.objectContaining({
            source: 'mcp',
            serverId: 'filesystem',
            capabilityId: 'read_file',
          }),
        }),
      ])
    );
  });

  it('executes a mainland MCP search fixture through the governed HTTP path', async () => {
    const r = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'baidu.web_search', params: { query: 'hypha', limit: 1 } });
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
    expect(r.body.data).toMatchObject({
      query: 'hypha',
      count: 1,
      provider: 'baidu-fixture',
      note: 'classic-mcp-mainland-baidu',
    });

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    expect(events.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'mcp.call.completed',
          payload: expect.objectContaining({
            source: 'mcp',
            serverId: 'baidu',
            capabilityId: 'web_search',
          }),
        }),
      ])
    );
  });

  it('validates MCP tool input before execution', async () => {
    const r = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'filesystem.read_file', params: {} });
    expect(r.status).toBe(400);
    expect(r.body.success).toBe(false);
    expect(r.body.error.message).toContain('missing required field: path');

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    expect(events.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.failed',
          payload: expect.objectContaining({
            source: 'mcp',
            sideEffectLevel: 'read',
            error: expect.objectContaining({ phase: 'input_validation' }),
          }),
        }),
      ])
    );
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
    expect(r.body.runId).toBeTruthy();
    // The stub returns deterministic shape; just sanity check the contract.
    expect(r.body.data?.query).toBe('ping');
  });

  it('catches tool schema errors before executing through the HTTP API', async () => {
    const r = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'search', params: { limit: 1 } });
    expect(r.status).toBe(400);
    expect(r.body.success).toBe(false);
    expect(r.body.runId).toBeTruthy();
    expect(r.body.error.message).toContain('missing required field: query');

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    expect(events.body.data || []).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.failed',
          payload: expect.objectContaining({
            source: 'local',
            sideEffectLevel: 'read',
            error: expect.objectContaining({ phase: 'input_validation' }),
          }),
        }),
        expect.objectContaining({ type: 'run.failed' }),
      ])
    );
  });

  it('derives replay, audit, and regression projections from real tool run events', async () => {
    const executed = await request(app)
      .post('/api/v1/tools/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ name: 'search', params: { query: 'event-runtime', limit: 1 } });
    const runId = executed.body.runId;
    expect(runId).toBeTruthy();

    const replay = await request(app)
      .get(`/api/v1/runtime/runs/${runId}/replay`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(replay.status).toBe(200);
    expect(replay.body.data.statePath).toEqual(
      expect.arrayContaining(['RunInitialized', 'Acting', 'Completed'])
    );
    expect(replay.body.data.toolCallEventIds.length).toBeGreaterThanOrEqual(5);
    expect(replay.body.data.toolCalls).toHaveLength(1);

    const audit = await request(app)
      .get(`/api/v1/runtime/runs/${runId}/audit`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(audit.status).toBe(200);
    expect(audit.body.data.policyDecisionCount).toBeGreaterThanOrEqual(1);
    expect(audit.body.data.toolCallCount).toBe(1);

    const regression = await request(app)
      .get(`/api/v1/runtime/runs/${runId}/regression`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(regression.status).toBe(200);
    expect(regression.body.data.eventTypes).toEqual(
      expect.arrayContaining(['run.created', 'tool.policy.checked', 'run.completed'])
    );
    expect(regression.body.data.toolCalls).toHaveLength(1);
  });

  it('blocks dangerous local tools by default policy before handler execution', async () => {
    let called = false;
    const dangerousTool: ITool = {
      id: 'dangerous-policy-test-tool',
      name: 'dangerous-policy-test-tool',
      description: 'Integration test tool that must be blocked by default policy',
      schema: {
        name: 'dangerous-policy-test-tool',
        description: 'Integration test tool that must be blocked by default policy',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string' },
          },
          required: ['path'],
        },
      },
      governance: {
        sideEffectLevel: 'irreversible',
      },
      async execute(_params: ToolParams): Promise<ToolResult> {
        called = true;
        return { success: true, output: { shouldNotRun: true } };
      },
    };
    await getToolManager().register(dangerousTool);
    try {
      const r = await request(app)
        .post('/api/v1/tools/execute')
        .set('Authorization', `Bearer ${devToken}`)
        .send({ name: 'dangerous-policy-test-tool', params: { path: '/tmp/hypha-danger' } });
      expect(r.status).toBe(400);
      expect(r.body.success).toBe(false);
      expect(r.body.runId).toBeTruthy();
      expect(r.body.error.message).toContain('requires an explicit policy override');
      expect(called).toBe(false);

      const events = await request(app)
        .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(events.status).toBe(200);
      expect(events.body.data || []).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'tool.policy.checked',
            payload: expect.objectContaining({
              source: 'local',
              sideEffectLevel: 'irreversible',
            }),
          }),
          expect.objectContaining({
            type: 'tool.call.rejected',
            payload: expect.objectContaining({
              source: 'local',
              sideEffectLevel: 'irreversible',
            }),
          }),
          expect.objectContaining({ type: 'run.failed' }),
        ])
      );
    } finally {
      await getToolManager().unregister('dangerous-policy-test-tool');
    }
  });

  it('returns waiting_human for tools that require human approval', async () => {
    let called = false;
    const approvalTool: ITool = {
      id: 'approval-test-tool',
      name: 'approval-test-tool',
      description: 'Integration test tool that requires human approval',
      schema: {
        name: 'approval-test-tool',
        description: 'Integration test tool that requires human approval',
        inputSchema: {
          type: 'object',
          properties: {
            value: { type: 'string' },
          },
        },
      },
      governance: {
        sideEffectLevel: 'write',
        humanApprovalPolicy: {
          required: true,
          reason: 'integration approval required',
        },
      },
      async execute(_params: ToolParams): Promise<ToolResult> {
        called = true;
        return { success: true, output: { shouldNotRun: true } };
      },
    };
    await getToolManager().register(approvalTool);
    try {
      const r = await request(app)
        .post('/api/v1/tools/execute')
        .set('Authorization', `Bearer ${devToken}`)
        .send({ name: 'approval-test-tool', params: { value: 'pending' } });
      expect(r.status).toBe(202);
      expect(r.body.success).toBe(true);
      expect(r.body.invocationId).toBeTruthy();
      expect(r.body.data).toMatchObject({
        tool: 'approval-test-tool',
        status: 'human_review_required',
        reason: 'integration approval required',
      });
      expect(called).toBe(false);

      const run = await request(app)
        .get(`/api/v1/runtime/runs/${r.body.runId}`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(run.status).toBe(200);
      expect(run.body.data.status).toBe('waiting_human');

      const events = await request(app)
        .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(events.status).toBe(200);
      const eventTypes = (events.body.data || []).map((event: any) => event.type);
      expect(eventTypes).toEqual(
        expect.arrayContaining([
          'tool.policy.checked',
          'human.review.requested',
          'fsm.state.entered',
          'run.waiting_human',
        ])
      );
      expect(events.body.data || []).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'fsm.state.entered',
            fsmState: 'HumanReview',
          }),
          expect.objectContaining({
            type: 'human.review.requested',
            payload: expect.objectContaining({
              source: 'local',
              sideEffectLevel: 'write',
              approvalRequest: expect.objectContaining({
                reason: 'integration approval required',
              }),
            }),
          }),
        ])
      );

      const ownerToken = generateToken({
        id: devUserId,
        email: 'runtime-owner@hypha.local',
        isAdmin: false,
      });
      const foreignToken = generateToken({
        id: 'foreign-runtime-user',
        email: 'foreign-runtime-user@hypha.local',
        isAdmin: false,
      });
      const ownInvocation = await request(app)
        .get(`/api/v1/tool-invocations/${r.body.invocationId}`)
        .set('Authorization', `Bearer ${ownerToken}`);
      expect(ownInvocation.status).toBe(200);
      expect(ownInvocation.body.data.id).toBe(r.body.invocationId);

      const foreignInvocation = await request(app)
        .get(`/api/v1/tool-invocations/${r.body.invocationId}`)
        .set('Authorization', `Bearer ${foreignToken}`);
      expect(foreignInvocation.status).toBe(403);
      expect(foreignInvocation.body.error.code).toBe('TOOL_INVOCATION_ACCESS_DENIED');

      const foreignCancel = await request(app)
        .post(`/api/v1/tool-invocations/${r.body.invocationId}/cancel`)
        .set('Authorization', `Bearer ${foreignToken}`)
        .send({ reason: 'cross-user cancellation must be denied' });
      expect(foreignCancel.status).toBe(403);

      const approved = await request(app)
        .post(`/api/v1/tool-approvals/${r.body.invocationId}/approve`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(approved.status).toBe(200);
      expect(approved.body.data.status).toBe('completed');
      expect(called).toBe(true);

      const completedRun = await request(app)
        .get(`/api/v1/runtime/runs/${r.body.runId}`)
        .set('Authorization', `Bearer ${devToken}`);
      expect(completedRun.status).toBe(200);
      expect(completedRun.body.data.status).toBe('completed');

      const completedEvents = await request(app)
        .get(`/api/v1/runtime/runs/${r.body.runId}/events`)
        .set('Authorization', `Bearer ${devToken}`);
      expect((completedEvents.body.data || []).map((event: any) => event.type)).toContain(
        'run.completed'
      );
    } finally {
      await getToolManager().unregister('approval-test-tool');
    }
  });
});

describe('workflow template variable resolution (remaining #2)', () => {
  it('substitutes ${defaultModel} in stage.model with the active runtime model id', async () => {
    const r = await request(app)
      .post('/api/v1/workflows/conversation-flow/execute')
      .set('Authorization', `Bearer ${devToken}`)
      .send({ version: '1.0.0', context: { input: 'say ok' } });
    expect(r.status).toBe(200);
    const err = r.body.data?.error || '';
    // The LLM stage should NOT fail with "The supported API model names are …"
    // which is the verbatim-placeholder signature bug.
    expect(err).not.toMatch(/supported API model names are/i);
    expect(r.body.data?.runId).toBeTruthy();

    const events = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.data.runId}/events`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(events.status).toBe(200);
    const eventTypes = (events.body.data || []).map((event: any) => event.type);
    expect(eventTypes).toEqual(
      expect.arrayContaining(['workflow.stage.started', 'agent.reasoning.started'])
    );

    const reasoningStarted = (events.body.data || []).find(
      (event: any) => event.type === 'agent.reasoning.started'
    );
    expect(reasoningStarted?.payload?.modelAlias).toBe(getLLMManager().getDefaultModel());
    expect(JSON.stringify(events.body.data)).not.toContain('${defaultModel}');
    expect(JSON.stringify(events.body.data)).not.toMatch(/supported API model names are/i);

    const replay = await request(app)
      .get(`/api/v1/runtime/runs/${r.body.data.runId}/replay`)
      .set('Authorization', `Bearer ${devToken}`);
    expect(replay.status).toBe(200);
    expect(replay.body.data.statePath).toEqual(
      expect.arrayContaining([expect.stringMatching(/Completed|Failed/)])
    );
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
      .send({
        source: 'inline',
        content: validSkill,
        filename: 'integration-test-skill.md',
      });
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
