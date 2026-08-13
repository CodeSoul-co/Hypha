import {
  ExecutionToolAdapter,
  type ExecutionToolAdapterOptions,
  type ExecutionToolDispatchFactory,
  type ExecutionToolRuntimePort,
  type ToolAdapter,
  type ToolAdapterFactoryInput,
  type ToolHandler,
} from '@codesoul-co/tools';

export type ExecutionToolAdapterFactory = (input: ToolAdapterFactoryInput) => Promise<ToolAdapter>;

/**
 * Trusted composition boundary for declarative Tool profiles.
 *
 * Configuration can select an opaque binding id, but executable handlers and
 * factories can only enter the process through this registry.
 */
export class ToolProfileBindingRegistry {
  private readonly plugins = new Map<string, { revision: string; handler: ToolHandler }>();
  private readonly executionFactories = new Map<string, ExecutionToolAdapterFactory>();

  registerPlugin(id: string, handler: ToolHandler, revision = '1'): () => void {
    this.assertAvailable(this.plugins, id, 'plugin');
    if (!revision.trim()) throw new Error('plugin revision must not be empty.');
    const entry = { revision, handler };
    this.plugins.set(id, entry);
    return () => {
      if (this.plugins.get(id) === entry) this.plugins.delete(id);
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
    return Object.freeze(
      Object.fromEntries(Array.from(this.plugins, ([id, entry]) => [id, entry.handler]))
    );
  }

  pluginRevisions(): Readonly<Record<string, string>> {
    return Object.freeze(
      Object.fromEntries(Array.from(this.plugins, ([id, entry]) => [id, entry.revision]))
    );
  }

  hasPlugin(id: string): boolean {
    return this.plugins.has(id);
  }

  hasExecutionAdapter(id: string): boolean {
    return this.executionFactories.has(id);
  }

  registerPublishedExecutionPort<TInput>(
    id: string,
    publication: {
      port: ExecutionToolRuntimePort;
      createDispatch: ExecutionToolDispatchFactory<TInput>;
      options: ExecutionToolAdapterOptions;
    }
  ): () => void {
    return this.registerExecutionAdapter(id, async ({ profile, toolSpec }) => {
      if (profile.binding?.executionPortRef !== id) {
        throw Object.assign(new Error(`Execution profile is not bound to published port ${id}.`), {
          code: 'TOOL_ADAPTER_BINDING_UNAVAILABLE',
          profileId: profile.id,
          executionPortRef: profile.binding?.executionPortRef,
        });
      }
      return new ExecutionToolAdapter<TInput>(
        toolSpec.id,
        publication.port,
        publication.createDispatch,
        publication.options
      );
    });
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

export function registerBuiltinToolProfileBindings(
  registry: ToolProfileBindingRegistry = defaultToolProfileBindings
): void {
  if (registry.hasPlugin('trusted.hash')) return;
  registry.registerPlugin(
    'trusted.hash',
    async (input) => {
      const crypto = await import('node:crypto');
      const value =
        typeof input === 'string'
          ? input
          : JSON.stringify(input, Object.keys((input as object | null) ?? {}).sort());
      return {
        algorithm: 'sha256',
        digest: crypto.createHash('sha256').update(value).digest('hex'),
      };
    },
    '1.0.0'
  );
}
