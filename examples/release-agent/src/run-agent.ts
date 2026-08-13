import fs from 'node:fs/promises';
import path from 'node:path';
import { buildReleaseAgent } from './agent';

const baseUrl = process.env.HYPHA_BASE_URL ?? 'http://127.0.0.1:3000/api/v1';
const email = requiredEnv('HYPHA_OWNER_EMAIL');
const password = requiredEnv('HYPHA_OWNER_PASSWORD');
const question = process.argv.slice(2).join(' ') || 'What is Hypha?';
const projectRoot = process.cwd();

async function main(): Promise<void> {
  const { domainPack, compiled, agent } = await buildReleaseAgent(projectRoot);
  const login = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const token = login.token;

  const prompt = JSON.parse(
    await fs.readFile(path.join(projectRoot, 'agent', 'prompt.json'), 'utf8')
  ) as Record<string, unknown>;
  const skill = await fs.readFile(path.join(projectRoot, 'agent', 'skill.md'), 'utf8');
  await request('/runtime/agent-prompts', {
    method: 'POST',
    headers: authorization(token),
    body: JSON.stringify(prompt),
  });
  await request('/skills/install', {
    method: 'POST',
    headers: authorization(token),
    body: JSON.stringify({ source: 'inline', content: skill, activate: true }),
  });

  const sessionId = `release-example-${Date.now()}`;
  const command = await request<{ id: string; status: string }>(
    `/runtime/sessions/${encodeURIComponent(sessionId)}/commands/start-run`,
    {
      method: 'POST',
      headers: {
        ...authorization(token),
        'Idempotency-Key': `release-example:${sessionId}`,
      },
      body: JSON.stringify({
        input: { question },
        agentId: agent.id,
        workflowRef: {
          id: compiled.bindings.workflow.id,
          version: compiled.bindings.workflow.version,
        },
        domainPack,
        react: {
          modelAlias: agent.modelAlias,
          agentSpec: agent,
          messages: [{ role: 'user', content: question }],
          budget: { iterations: 8, modelCalls: 8, toolCalls: 4, totalTokens: 50000 },
        },
        metadata: {
          source: 'npm-release-example',
          domainPackRef: compiled.bindings.domainPackRef,
        },
      }),
    }
  );

  process.stdout.write(`${JSON.stringify({ sessionId, command }, null, 2)}\n`);
}

void main();

function authorization(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

async function request<T = unknown>(route: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${route}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  const payload = (await response.json()) as {
    success: boolean;
    data?: T;
    error?: { code: string; message: string };
  };
  if (!response.ok || !payload.success || payload.data === undefined) {
    throw new Error(
      `${payload.error?.code ?? response.status}: ${payload.error?.message ?? 'request failed'}`
    );
  }
  return payload.data;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}
