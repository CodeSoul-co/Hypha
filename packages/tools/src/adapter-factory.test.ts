import { describe, expect, it, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  LocalFunctionToolAdapter,
  ToolAdapterFactoryRegistry,
  loadToolAdapterProfiles,
  registerConcreteToolAdapterFactories,
  resolveCommonToolSpec,
  type ToolAdapterFactory,
  type ToolCallContext,
  type ToolSpec,
} from './index';

const spec: ToolSpec = {
  id: 'tool.echo',
  version: '1.0.0',
  revision: 'sha256:one',
  description: 'Echo input.',
  inputSchema: { type: 'object' },
  sideEffectLevel: 'read',
};

describe('ToolAdapterFactoryRegistry', () => {
  it('resolves a pinned ToolSpec and a credential only inside the factory', async () => {
    const resolve = vi.fn(async () => 'secret-value');
    const acquire = vi.fn(async () => ({
      renewable: false,
      read: () => 'secret-value',
    }));
    const registry = new ToolAdapterFactoryRegistry({
      resolveToolSpec: async () => spec,
      secretResolver: { resolve, acquire },
    });
    const factory: ToolAdapterFactory = {
      kind: 'http',
      create: async ({ resolveCredential }) => {
        expect(await resolveCredential()).toBe('secret-value');
        return new LocalFunctionToolAdapter('http:test', async (input) => input);
      },
    };
    registry.register(factory);

    const created = await registry.create({
      id: 'profile.echo',
      kind: 'http',
      toolSpecRef: { id: spec.id, version: spec.version, revision: spec.revision },
      endpoint: 'https://tools.example.test/echo',
      credentialRef: 'env:HYPHA_ECHO_TOKEN',
      requiredCapabilities: ['execute', 'health'],
    });

    expect(created.toolSpec).toBe(spec);
    expect(acquire).toHaveBeenCalledWith('env:HYPHA_ECHO_TOKEN', { purpose: 'tool' });
    expect(resolve).not.toHaveBeenCalled();
  });

  it('resolves a fresh credential lease for every HTTP invocation', async () => {
    const credentials = ['first-token', 'renewed-token'];
    const acquire = vi.fn(async () => {
      const value = credentials.shift();
      return value
        ? {
            renewable: true,
            read: () => value,
            renew: async () => ({
              renewable: false,
              read: () => 'unused-renewal',
            }),
          }
        : null;
    });
    const requests: Array<Record<string, string>> = [];
    const registry = new ToolAdapterFactoryRegistry({
      resolveToolSpec: async () => spec,
      secretResolver: {
        acquire,
        resolve: async () => null,
      },
    });
    registerConcreteToolAdapterFactories(registry, {
      fetch: vi.fn(async (_url, init) => {
        requests.push(Object.fromEntries(new Headers(init?.headers).entries()));
        return new Response(JSON.stringify({ ok: true }));
      }),
    });
    const created = await registry.create({
      id: 'profile.renewable-http',
      kind: 'http',
      toolSpecRef: { id: spec.id, revision: spec.revision },
      endpoint: 'https://tools.example.test/renewable',
      credentialRef: 'vault:secret/data/hypha',
    });

    await created.adapter.execute({
      toolId: spec.id,
      input: {},
      context: { runId: 'run-one', stepId: 'step-one' },
    });
    await created.adapter.execute({
      toolId: spec.id,
      input: {},
      context: { runId: 'run-two', stepId: 'step-two' },
    });

    expect(requests.map((headers) => headers.authorization)).toEqual([
      'Bearer first-token',
      'Bearer renewed-token',
    ]);
    expect(acquire).toHaveBeenCalledTimes(2);
  });

  it('rejects an unpinned resolution and a missing capability', async () => {
    const registry = new ToolAdapterFactoryRegistry({ resolveToolSpec: async () => spec });
    registry.register({
      kind: 'local_function',
      create: async () => new LocalFunctionToolAdapter('local:test', async (input) => input),
    });

    await expect(
      registry.create({
        id: 'profile.bad-revision',
        kind: 'local_function',
        toolSpecRef: { id: spec.id, revision: 'sha256:different' },
      })
    ).rejects.toMatchObject({ code: 'TOOL_SPEC_PIN_MISMATCH' });

    await expect(
      registry.create({
        id: 'profile.needs-cancel',
        kind: 'local_function',
        toolSpecRef: { id: spec.id },
        requiredCapabilities: ['cancel'],
      })
    ).rejects.toMatchObject({ code: 'TOOL_ADAPTER_CAPABILITY_MISSING' });
  });

  it('registers the six concrete profile kinds and rejects executable config fields', async () => {
    const registry = new ToolAdapterFactoryRegistry({ resolveToolSpec: async () => spec });
    registerConcreteToolAdapterFactories(registry, {
      localFunctions: { [spec.id]: async (input) => input },
      plugins: { trusted: async () => ({ plugin: true }) },
      mcpPort: {
        invoke: async ({ input }) => input,
        health: async () => ({ status: 'healthy', checkedAt: new Date(0).toISOString() }),
      },
      createExecutionAdapter: async () =>
        new LocalFunctionToolAdapter('execution:test', async (input) => input),
      fetch: vi.fn(async () => new Response(JSON.stringify({ ok: true }))),
    });

    const base = { toolSpecRef: { id: spec.id, version: spec.version } };
    const profiles = [
      { ...base, id: 'local', kind: 'local_function' as const },
      { ...base, id: 'http', kind: 'http' as const, endpoint: 'https://tools.test/echo' },
      {
        ...base,
        id: 'plugin',
        kind: 'plugin' as const,
        binding: { pluginId: 'trusted' },
      },
      {
        ...base,
        id: 'stdio',
        kind: 'mcp_stdio' as const,
        binding: {
          mcpServerId: 'mcp-a',
          mcpCapabilityId: 'echo',
          mcpConnectionProfileRef: 'mcp.test',
        },
      },
      {
        ...base,
        id: 'streamable',
        kind: 'mcp_streamable_http' as const,
        endpoint: 'https://mcp.test/rpc',
        binding: {
          mcpServerId: 'mcp-a',
          mcpCapabilityId: 'echo',
          mcpConnectionProfileRef: 'mcp.test',
        },
      },
      {
        ...base,
        id: 'execution',
        kind: 'execution' as const,
        binding: { executionPortRef: 'execution.test' },
      },
    ];
    for (const profile of profiles) {
      await expect(registry.create(profile)).resolves.toMatchObject({
        profile: { id: profile.id, required: true },
      });
    }

    await expect(
      registry.create({
        ...base,
        id: 'unsafe',
        kind: 'local_function',
        factory: () => undefined,
      } as never)
    ).rejects.toMatchObject({ code: 'TOOL_ADAPTER_PROFILE_INVALID' });
  });

  it('loads the shipped profile document and runs startup, invoke, cancel, health, and close', async () => {
    const document = yaml.load(
      fs.readFileSync(
        path.resolve(process.cwd(), 'configs/tool-adapter-profiles.example.yaml'),
        'utf8'
      )
    );
    const cancelled: string[] = [];
    const closed: string[] = [];
    const fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ provider: 'http' }), {
          headers: { 'content-type': 'application/json' },
        })
    );
    const registry = new ToolAdapterFactoryRegistry({
      resolveToolSpec: async (reference) => resolveCommonToolSpec(reference.id),
      secretResolver: {
        acquire: async () => ({ renewable: false, read: () => 'secret' }),
        resolve: async () => 'secret',
      },
    });
    registerConcreteToolAdapterFactories(registry, {
      localFunctions: {
        'utility.text': async (input) => ({ provider: 'local', input }),
      },
      plugins: {
        'trusted.hash': async (input) => ({ provider: 'plugin', input }),
      },
      fetch,
      createExecutionAdapter: async ({ profile }) => ({
        id: `execution:${profile.id}`,
        source: 'execution',
        capabilities: async () => ({
          execute: true,
          cancel: true,
          health: true,
          close: true,
        }),
        execute: async ({ input }) => ({
          kind: 'tool_execution_envelope',
          output: { provider: 'execution', input },
        }),
        cancel: async ({ invocationId }) => {
          cancelled.push(invocationId);
        },
        health: async () => ({ status: 'healthy', checkedAt: new Date(0).toISOString() }),
        close: async () => {
          closed.push(profile.id);
        },
      }),
      prepareMCPConnection: async ({ profile }) => ({
        port: {
          invoke: async ({ input }) => ({ provider: 'mcp', input }),
          cancel: async (requestId) => {
            cancelled.push(requestId);
          },
          health: async () => ({ status: 'healthy', checkedAt: new Date(0).toISOString() }),
        },
        close: async () => {
          closed.push(profile.id);
        },
      }),
    });

    const loaded = await loadToolAdapterProfiles(document, registry);
    expect(loaded.list()).toHaveLength(5);
    expect(loaded.list().every((entry) => entry.status === 'ready')).toBe(true);
    const context: ToolCallContext = {
      runId: 'run-profile',
      stepId: 'invoke',
      invocationId: 'invocation-profile',
    };
    for (const entry of loaded.list()) {
      const adapter = entry.adapter!;
      await expect(
        adapter.execute({ toolId: entry.toolSpec!.id, input: { value: entry.profile.id }, context })
      ).resolves.toMatchObject({ kind: 'tool_execution_envelope' });
      if ((await adapter.capabilities()).cancel) {
        await adapter.cancel?.({
          toolId: entry.toolSpec!.id,
          invocationId: `cancel:${entry.profile.id}`,
        });
      }
    }
    expect(await loaded.health()).toEqual({
      'local.text-normalize': expect.objectContaining({ status: 'healthy' }),
      'local.command': expect.objectContaining({ status: 'healthy' }),
      'cloud.search': expect.objectContaining({ status: 'healthy' }),
      'plugin.hash': expect.objectContaining({ status: 'healthy' }),
      'cloud.mcp': expect.objectContaining({ status: 'healthy' }),
    });
    await loaded.close();
    expect(closed.sort()).toEqual(['cloud.mcp', 'local.command']);
    expect(cancelled).toEqual(expect.arrayContaining(['cancel:local.command', 'cancel:cloud.mcp']));
    expect(fetch).toHaveBeenCalledOnce();
  });
});
