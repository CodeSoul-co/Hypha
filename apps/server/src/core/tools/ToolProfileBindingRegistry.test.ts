import { ToolProfileBindingRegistry } from './ToolProfileBindingRegistry';

describe('ToolProfileBindingRegistry', () => {
  it('rejects duplicate executable bindings and supports identity-safe unregister', () => {
    const registry = new ToolProfileBindingRegistry();
    const unregister = registry.registerPlugin('trusted.plugin', async () => 'ok');

    expect(() => registry.registerPlugin('trusted.plugin', async () => 'other')).toThrow(
      expect.objectContaining({ code: 'TOOL_PROFILE_BINDING_DUPLICATE' })
    );
    unregister();
    expect(() => registry.registerPlugin('trusted.plugin', async () => 'replacement')).not.toThrow();
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
      })
    ).rejects.toMatchObject({ code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE' });
  });
});
