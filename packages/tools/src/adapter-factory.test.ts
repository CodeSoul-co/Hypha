import { describe, expect, it, vi } from 'vitest';
import {
  LocalFunctionToolAdapter,
  ToolAdapterFactoryRegistry,
  type ToolAdapterFactory,
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
    const registry = new ToolAdapterFactoryRegistry({
      resolveToolSpec: async () => spec,
      secretResolver: { resolve },
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
    expect(resolve).toHaveBeenCalledWith('env:HYPHA_ECHO_TOKEN');
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
});
