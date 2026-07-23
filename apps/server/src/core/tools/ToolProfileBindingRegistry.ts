import type {
  ToolAdapter,
  ToolAdapterFactoryInput,
  ToolHandler,
} from '@hypha/tools';

export type ExecutionToolAdapterFactory = (
  input: ToolAdapterFactoryInput
) => Promise<ToolAdapter>;

/**
 * Trusted composition boundary for declarative Tool profiles.
 *
 * Configuration can select an opaque binding id, but executable handlers and
 * factories can only enter the process through this registry.
 */
export class ToolProfileBindingRegistry {
  private readonly plugins = new Map<string, ToolHandler>();
  private readonly executionFactories = new Map<string, ExecutionToolAdapterFactory>();

  registerPlugin(id: string, handler: ToolHandler): () => void {
    this.assertAvailable(this.plugins, id, 'plugin');
    this.plugins.set(id, handler);
    return () => {
      if (this.plugins.get(id) === handler) this.plugins.delete(id);
    };
  }

  registerExecutionAdapter(id: string, factory: ExecutionToolAdapterFactory): () => void {
    this.assertAvailable(this.executionFactories, id, 'execution adapter');
    this.executionFactories.set(id, factory);
    return () => {
      if (this.executionFactories.get(id) === factory) this.executionFactories.delete(id);
    };
  }

  pluginHandlers(): Readonly<Record<string, ToolHandler>> {
    return Object.freeze(Object.fromEntries(this.plugins));
  }

  async createExecutionAdapter(input: ToolAdapterFactoryInput): Promise<ToolAdapter> {
    const ref = input.profile.binding?.executionPortRef;
    const factory = ref ? this.executionFactories.get(ref) : undefined;
    if (!ref || !factory) {
      throw Object.assign(
        new Error(`No trusted execution adapter is registered for ${ref ?? 'an empty reference'}.`),
        {
          code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE',
          profileId: input.profile.id,
          binding: 'execution port',
          executionPortRef: ref,
        }
      );
    }
    return factory(input);
  }

  private assertAvailable<T>(registry: Map<string, T>, id: string, kind: string): void {
    if (!id.trim()) throw new Error(`${kind} binding id must not be empty.`);
    if (registry.has(id)) {
      throw Object.assign(new Error(`${kind} binding is already registered: ${id}`), {
        code: 'TOOL_PROFILE_BINDING_DUPLICATE',
        bindingId: id,
      });
    }
  }
}

const defaultToolProfileBindings = new ToolProfileBindingRegistry();

export function getToolProfileBindingRegistry(): ToolProfileBindingRegistry {
  return defaultToolProfileBindings;
}
