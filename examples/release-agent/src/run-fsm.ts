import { buildReleaseAgent } from './agent';

const baseUrl = process.env.HYPHA_BASE_URL ?? 'http://127.0.0.1:3000/api/v1';
const email = requiredEnv('HYPHA_OWNER_EMAIL');
const password = requiredEnv('HYPHA_OWNER_PASSWORD');

interface SessionCommand {
  id: string;
  status: string;
  targetRunId?: string;
  resultRunId?: string;
  rejectionCode?: string;
}

interface FSMView {
  runId: string;
  processId: string;
  processVersion: string;
  runRevision: number;
  currentState?: string;
  allowedTransitions: Array<{ to: string; guard?: string }>;
}

async function main(): Promise<void> {
  const { domainPack, compiled, customFsm } = await buildReleaseAgent();
  const login = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const sessionId = `release-fsm-${Date.now()}`;
  const command = await request<SessionCommand>(
    `/runtime/sessions/${encodeURIComponent(sessionId)}/commands/start-run`,
    {
      method: 'POST',
      headers: {
        ...authorization(login.token),
        'Idempotency-Key': `release-fsm:${sessionId}`,
      },
      body: JSON.stringify({
        input: { releaseCandidate: '1.0.0' },
        workflowRef: {
          id: compiled.bindings.workflow.id,
          version: compiled.bindings.workflow.version,
        },
        domainPack,
        fsm: customFsm,
        metadata: { source: 'npm-custom-fsm-example' },
      }),
    }
  );
  const applied = await waitForCommand(sessionId, command.id, login.token);
  const runId = applied.resultRunId ?? applied.targetRunId;
  if (!runId) throw new Error('Applied start_run command did not expose a Run id');

  const initial = await request<FSMView>(`/runtime/runs/${encodeURIComponent(runId)}/fsm`, {
    headers: authorization(login.token),
  });
  const targetState = initial.allowedTransitions.find(
    (transition) => transition.to === 'Completed'
  );
  if (!targetState) throw new Error('Compiled workflow does not allow Research -> Completed');
  const transitioned = await request<{ view: FSMView }>(
    `/runtime/runs/${encodeURIComponent(runId)}/fsm/transitions`,
    {
      method: 'POST',
      headers: {
        ...authorization(login.token),
        'Idempotency-Key': `release-fsm:${runId}:complete`,
      },
      body: JSON.stringify({
        processId: initial.processId,
        processVersion: initial.processVersion,
        expectedState: initial.currentState,
        expectedRunRevision: initial.runRevision,
        targetState: targetState.to,
        reason: 'Release example completed its declared workflow.',
      }),
    }
  );
  process.stdout.write(`${JSON.stringify({ initial, final: transitioned.view }, null, 2)}\n`);
}

async function waitForCommand(
  sessionId: string,
  commandId: string,
  token: string
): Promise<SessionCommand> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const commands = await request<SessionCommand[]>(
      `/runtime/sessions/${encodeURIComponent(sessionId)}/commands`,
      { headers: authorization(token) }
    );
    const command = commands.find((candidate) => candidate.id === commandId);
    if (command && ['applied', 'reused'].includes(command.status)) return command;
    if (command && ['rejected', 'failed', 'dead_letter'].includes(command.status)) {
      throw new Error(`start_run ${command.status}: ${command.rejectionCode ?? 'unknown'}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Timed out waiting for the durable start_run command');
}

function authorization(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(route: string, init: RequestInit = {}): Promise<T> {
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

void main();
