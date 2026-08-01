import {
  registerBuiltinToolProfileBindings,
  ToolProfileBindingRegistry,
} from './ToolProfileBindingRegistry';

describe('ToolProfileBindingRegistry', () => {
  it('rejects duplicate executable bindings and supports identity-safe unregister', () => {
    const registry = new ToolProfileBindingRegistry();
    const unregister = registry.registerPlugin('trusted.plugin', async () => 'ok');

    expect(() => registry.registerPlugin('trusted.plugin', async () => 'other')).toThrow(
      expect.objectContaining({ code: 'TOOL_PROFILE_BINDING_DUPLICATE' })
    );
    unregister();
    expect(() =>
      registry.registerPlugin('trusted.plugin', async () => 'replacement')
    ).not.toThrow();
  });

  it('does not resolve executable factories from profile-controlled configuration', async () => {
    const registry = new ToolProfileBindingRegistry();
    await expect(
      registry.createExecutionAdapter({
        profile: {
          id: 'command',
          kind: 'execution',
          toolSpecRef: { id: 'common.command' },
          binding: { executionPortRef: 'unregistered' },
          config: { factory: 'inline-code-is-not-a-binding' },
        },
        toolSpec: {
          id: 'common.command',
          version: '1.0.0',
          description: 'Command',
          inputSchema: { type: 'object' },
          sideEffectLevel: 'irreversible',
        },
        resolveCredential: async () => null,
        acquireCredential: async () => null,
      })
    ).rejects.toMatchObject({ code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE' });
  });

  it('registers the product hash Plugin through the trusted Registry with a pinned revision', async () => {
    const registry = new ToolProfileBindingRegistry();
    registerBuiltinToolProfileBindings(registry);
    registerBuiltinToolProfileBindings(registry);

    expect(registry.pluginRevisions()).toEqual({ 'trusted.hash': '1.0.0' });
    await expect(
      registry.pluginHandlers()['trusted.hash']!(
        { value: 'hello' },
        {
          runId: 'run.test',
          stepId: 'step.test',
        }
      )
    ).resolves.toEqual({
      algorithm: 'sha256',
      digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
    });
  });

  it('creates Execution adapters only from an explicitly published runtime port', async () => {
    const registry = new ToolProfileBindingRegistry();
    registry.registerPublishedExecutionPort('execution.default', {
      port: {
        execute: jest.fn(),
        health: async () => ({ status: 'healthy', checkedAt: new Date().toISOString() }),
      },
      createDispatch: async () => {
        throw new Error('dispatch is not used during adapter construction');
      },
      options: {
        toolRevision: 'revision-1',
        providerId: 'provider.default',
        binding: {
          toolId: 'common.command',
          operation: 'command',
          executionProfileRef: 'execution.default',
          requiredScopes: ['execution:command:run'],
          sideEffectLevel: 'external_effect',
        },
      },
    });

    const adapter = await registry.createExecutionAdapter({
      profile: {
        id: 'execution.profile',
        kind: 'execution',
        toolSpecRef: { id: 'common.command', version: '1.0.0' },
        binding: { executionPortRef: 'execution.default' },
      },
      toolSpec: {
        id: 'common.command',
        version: '1.0.0',
        description: 'Published command execution Tool.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'irreversible',
      },
      resolveCredential: async () => null,
      acquireCredential: async () => null,
    });
    await expect(adapter.capabilities()).resolves.toMatchObject({
      execute: true,
      health: true,
      close: true,
    });
    expect(registry.hasExecutionAdapter('execution.default')).toBe(true);
  });
});
