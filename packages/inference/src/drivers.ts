import { spawn, type ChildProcess } from 'child_process';
import {
  OllamaInferenceBackend,
  SGLangInferenceBackend,
  VLLMInferenceBackend,
  type HttpInferenceBackendConfig,
} from './backends';
import type { InferenceBackend, InferenceBackendRequest, InferenceBackendResponse } from './types';

export type LocalInferenceEngineKind = 'ollama' | 'sglang' | 'vllm';
export type LocalInferenceDriverMode = 'connect' | 'managed';
export type LocalInferenceDriverState =
  | 'idle'
  | 'starting'
  | 'ready'
  | 'stopping'
  | 'stopped'
  | 'failed';

export interface LocalInferenceProcessSpec {
  command: string;
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
}

export interface LocalInferenceProcessHandle {
  readonly pid?: number;
  readonly exited: Promise<{ code: number | null; signal: NodeJS.Signals | null }>;
  stop(graceMs?: number): Promise<void>;
}

export interface LocalInferenceProcessSupervisor {
  start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle>;
}

export interface LocalInferenceDriverConfig {
  id?: string;
  kind: LocalInferenceEngineKind;
  mode?: LocalInferenceDriverMode;
  baseUrl?: string;
  endpoint?: string;
  model?: string;
  host?: string;
  port?: number;
  command?: string;
  args?: string[];
  cwd?: string;
  env?: Record<string, string>;
  startupTimeoutMs?: number;
  healthPollMs?: number;
  requestTimeoutMs?: number;
  apiKey?: string;
  apiKeyEnv?: string;
}

export interface LocalInferenceDriverStatus {
  id: string;
  kind: LocalInferenceEngineKind;
  mode: LocalInferenceDriverMode;
  state: LocalInferenceDriverState;
  baseUrl: string;
  model?: string;
  pid?: number;
  healthy: boolean;
  error?: string;
}

export interface LocalInferenceDriver {
  readonly id: string;
  readonly kind: LocalInferenceEngineKind;
  start(model?: string): Promise<LocalInferenceDriverStatus>;
  load(model: string): Promise<LocalInferenceDriverStatus>;
  unload(model?: string): Promise<LocalInferenceDriverStatus>;
  stop(): Promise<LocalInferenceDriverStatus>;
  health(): Promise<boolean>;
  status(): LocalInferenceDriverStatus;
  backend(): InferenceBackend;
}

export class NodeLocalInferenceProcessSupervisor implements LocalInferenceProcessSupervisor {
  async start(spec: LocalInferenceProcessSpec): Promise<LocalInferenceProcessHandle> {
    const child = spawn(spec.command, spec.args, {
      cwd: spec.cwd,
      env: { ...process.env, ...spec.env },
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    await waitForSpawn(child, spec.command);
    child.stdout?.resume();
    child.stderr?.resume();
    return new NodeLocalInferenceProcessHandle(child);
  }
}

class NodeLocalInferenceProcessHandle implements LocalInferenceProcessHandle {
  readonly exited: Promise<{ code: number | null; signal: NodeJS.Signals | null }>;

  constructor(private readonly child: ChildProcess) {
    this.exited = new Promise((resolve) => {
      child.once('exit', (code, signal) => resolve({ code, signal }));
    });
  }

  get pid(): number | undefined {
    return this.child.pid;
  }

  async stop(graceMs = 5000): Promise<void> {
    if (this.child.exitCode !== null || this.child.killed) return;
    this.child.kill('SIGTERM');
    const exited = await Promise.race([
      this.exited.then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), graceMs)),
    ]);
    if (!exited && this.child.exitCode === null) {
      this.child.kill('SIGKILL');
      await this.exited;
    }
  }
}

export class HttpLocalInferenceDriver implements LocalInferenceDriver {
  readonly id: string;
  readonly kind: LocalInferenceEngineKind;
  private readonly mode: LocalInferenceDriverMode;
  private readonly baseUrl: string;
  private readonly supervisor: LocalInferenceProcessSupervisor;
  private stateValue: LocalInferenceDriverState = 'idle';
  private activeModel?: string;
  private processHandle?: LocalInferenceProcessHandle;
  private lastError?: string;

  constructor(
    private readonly config: LocalInferenceDriverConfig,
    supervisor: LocalInferenceProcessSupervisor = new NodeLocalInferenceProcessSupervisor()
  ) {
    this.kind = config.kind;
    this.id = config.id ?? `local-${config.kind}`;
    this.mode = config.mode ?? 'connect';
    this.baseUrl = config.baseUrl ?? defaultBaseUrl(config.kind, config.host, config.port);
    this.activeModel = config.model;
    this.supervisor = supervisor;
  }

  async start(model = this.activeModel): Promise<LocalInferenceDriverStatus> {
    if (this.stateValue === 'ready' && (await this.health())) return this.status();
    this.stateValue = 'starting';
    this.lastError = undefined;
    this.activeModel = model;
    try {
      if (this.mode === 'managed' && !this.processHandle) {
        const spec = processSpec(this.config, model);
        this.processHandle = await this.supervisor.start(spec);
        void this.processHandle.exited.then(({ code, signal }) => {
          if (this.stateValue !== 'stopping' && this.stateValue !== 'stopped') {
            this.stateValue = 'failed';
            this.lastError = `Local inference process exited: code=${String(code)} signal=${String(signal)}`;
          }
        });
      }
      await this.waitUntilHealthy();
      if (model) await this.load(model);
      this.stateValue = 'ready';
      return this.status();
    } catch (error) {
      this.stateValue = 'failed';
      this.lastError = error instanceof Error ? error.message : String(error);
      await this.processHandle?.stop().catch(() => undefined);
      this.processHandle = undefined;
      throw error;
    }
  }

  async load(model: string): Promise<LocalInferenceDriverStatus> {
    this.activeModel = model;
    if (this.kind === 'ollama') {
      await postJson(`${this.baseUrl}/api/pull`, { name: model, stream: false }, this.config);
    }
    if (!(await this.health())) {
      throw new Error(`Local inference engine is not healthy: ${this.id}`);
    }
    this.stateValue = 'ready';
    return this.status();
  }

  async unload(model = this.activeModel): Promise<LocalInferenceDriverStatus> {
    if (this.kind === 'ollama' && model && (await this.health())) {
      await postJson(
        `${this.baseUrl}/api/generate`,
        { model, prompt: '', stream: false, keep_alive: 0 },
        this.config
      );
    }
    this.activeModel = undefined;
    return this.status();
  }

  async stop(): Promise<LocalInferenceDriverStatus> {
    this.stateValue = 'stopping';
    await this.processHandle?.stop();
    this.processHandle = undefined;
    this.stateValue = 'stopped';
    return this.status();
  }

  async health(): Promise<boolean> {
    const path = this.kind === 'ollama' ? '/api/tags' : '/health';
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: authorizationHeaders(this.config),
        signal: AbortSignal.timeout(Math.min(this.config.requestTimeoutMs ?? 60000, 5000)),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  status(): LocalInferenceDriverStatus {
    return {
      id: this.id,
      kind: this.kind,
      mode: this.mode,
      state: this.stateValue,
      baseUrl: this.baseUrl,
      model: this.activeModel,
      pid: this.processHandle?.pid,
      healthy: this.stateValue === 'ready',
      error: this.lastError,
    };
  }

  backend(): InferenceBackend {
    const backendConfig: Partial<HttpInferenceBackendConfig> = {
      id: this.id,
      baseUrl: this.baseUrl,
      endpoint: this.config.endpoint ?? defaultEndpoint(this.kind),
      apiKey: this.config.apiKey,
      apiKeyEnv: this.config.apiKeyEnv,
      timeoutMs: this.config.requestTimeoutMs,
    };
    const backend =
      this.kind === 'ollama'
        ? new OllamaInferenceBackend(backendConfig)
        : this.kind === 'sglang'
          ? new SGLangInferenceBackend(backendConfig)
          : new VLLMInferenceBackend(backendConfig);
    return new ModelBoundInferenceBackend(backend, () => this.activeModel);
  }

  private async waitUntilHealthy(): Promise<void> {
    const timeoutMs = this.config.startupTimeoutMs ?? 120000;
    const pollMs = this.config.healthPollMs ?? 500;
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.health()) return;
      await new Promise((resolve) => setTimeout(resolve, pollMs));
    }
    throw new Error(
      `Local inference engine did not become healthy within ${timeoutMs}ms: ${this.id}`
    );
  }
}

export class LocalInferenceDriverRegistry {
  private readonly drivers = new Map<string, LocalInferenceDriver>();

  register(driver: LocalInferenceDriver): void {
    if (this.drivers.has(driver.id))
      throw new Error(`Local inference driver already exists: ${driver.id}`);
    this.drivers.set(driver.id, driver);
  }

  get(id: string): LocalInferenceDriver | null {
    return this.drivers.get(id) ?? null;
  }

  require(id: string): LocalInferenceDriver {
    const driver = this.get(id);
    if (!driver) throw new Error(`Local inference driver not found: ${id}`);
    return driver;
  }

  list(): LocalInferenceDriver[] {
    return Array.from(this.drivers.values());
  }

  async stopAll(): Promise<void> {
    await Promise.all(this.list().map((driver) => driver.stop()));
  }
}

class ModelBoundInferenceBackend implements InferenceBackend {
  readonly id: string;
  readonly kind: InferenceBackend['kind'];

  constructor(
    private readonly inner: InferenceBackend,
    private readonly model: () => string | undefined
  ) {
    this.id = inner.id;
    this.kind = inner.kind;
  }

  capabilities(): ReturnType<InferenceBackend['capabilities']> {
    return this.inner.capabilities();
  }

  infer(request: InferenceBackendRequest): Promise<InferenceBackendResponse> {
    return this.inner.infer(this.bind(request));
  }

  stream(request: InferenceBackendRequest): AsyncIterable<InferenceBackendResponse> {
    if (!this.inner.stream)
      throw new Error(`Inference backend does not support streaming: ${this.id}`);
    return this.inner.stream(this.bind(request));
  }

  private bind(request: InferenceBackendRequest): InferenceBackendRequest {
    const model = this.model();
    return model
      ? { ...request, metadata: { ...request.metadata, providerModel: model } }
      : request;
  }
}

function processSpec(
  config: LocalInferenceDriverConfig,
  model?: string
): LocalInferenceProcessSpec {
  const host = config.host ?? hostFromBaseUrl(config.baseUrl) ?? '127.0.0.1';
  const port = config.port ?? defaultPort(config.kind);
  if (config.command) {
    return {
      command: config.command,
      args: config.args ?? [],
      cwd: config.cwd,
      env: config.env,
    };
  }
  if (config.kind === 'ollama') {
    return { command: 'ollama', args: ['serve'], cwd: config.cwd, env: config.env };
  }
  if (!model) throw new Error(`Managed ${config.kind} driver requires a model.`);
  if (config.kind === 'sglang') {
    return {
      command: 'python',
      args: [
        '-m',
        'sglang.launch_server',
        '--model-path',
        model,
        '--host',
        host,
        '--port',
        String(port),
      ],
      cwd: config.cwd,
      env: config.env,
    };
  }
  return {
    command: 'vllm',
    args: ['serve', model, '--host', host, '--port', String(port)],
    cwd: config.cwd,
    env: config.env,
  };
}

function defaultBaseUrl(kind: LocalInferenceEngineKind, host = '127.0.0.1', port?: number): string {
  return `http://${host}:${port ?? defaultPort(kind)}`;
}

function defaultPort(kind: LocalInferenceEngineKind): number {
  if (kind === 'ollama') return 11434;
  if (kind === 'sglang') return 30000;
  return 8000;
}

function defaultEndpoint(kind: LocalInferenceEngineKind): string {
  if (kind === 'ollama') return '/api/chat';
  if (kind === 'sglang') return '/generate';
  return '/v1/chat/completions';
}

function hostFromBaseUrl(baseUrl: string | undefined): string | undefined {
  if (!baseUrl) return undefined;
  try {
    return new URL(baseUrl).hostname;
  } catch {
    return undefined;
  }
}

function authorizationHeaders(config: LocalInferenceDriverConfig): Record<string, string> {
  const apiKey = config.apiKey ?? (config.apiKeyEnv ? process.env[config.apiKeyEnv] : undefined);
  return apiKey ? { authorization: `Bearer ${apiKey}` } : {};
}

async function postJson(
  url: string,
  body: unknown,
  config: LocalInferenceDriverConfig
): Promise<unknown> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...authorizationHeaders(config) },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(config.requestTimeoutMs ?? 120000),
  });
  if (!response.ok) {
    throw new Error(`Local inference engine returned HTTP ${response.status}: ${url}`);
  }
  return response.json();
}

function waitForSpawn(child: ChildProcess, command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const onSpawn = () => {
      child.off('error', onError);
      resolve();
    };
    const onError = (error: Error) => {
      child.off('spawn', onSpawn);
      reject(new Error(`Failed to start local inference command ${command}: ${error.message}`));
    };
    child.once('spawn', onSpawn);
    child.once('error', onError);
  });
}
