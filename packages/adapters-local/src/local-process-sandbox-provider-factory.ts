import fs from 'node:fs/promises';
import type { SandboxProvider, SandboxProviderFactory } from '@codesoul-co/hypha-core';
import {
  LocalProcessExecutionProvider,
  type LocalProcessExecutionProviderOptions,
} from './local-process-execution-provider';

export const LOCAL_PROCESS_SANDBOX_PROVIDER_ID = 'provider.local-process';

export type LocalProcessSandboxProviderFactoryOptions = Omit<
  LocalProcessExecutionProviderOptions,
  'id'
> & {
  providerId?: string;
  createWorkspaceRoot?: boolean;
};

/**
 * Composition adapter for the trusted-development Local Process Provider.
 *
 * Registration is explicit. The optional root creation is limited to the
 * configured Workspace boundary; the Provider still resolves and validates
 * the real path and executable identities before running commands.
 */
export class LocalProcessSandboxProviderFactory implements SandboxProviderFactory {
  readonly providerType = 'local_process' as const;
  readonly providerId: string;

  constructor(private readonly options: LocalProcessSandboxProviderFactoryOptions) {
    this.providerId = options.providerId ?? LOCAL_PROCESS_SANDBOX_PROVIDER_ID;
  }

  async create(): Promise<SandboxProvider> {
    const {
      providerId: _providerId,
      createWorkspaceRoot = false,
      ...providerOptions
    } = this.options;
    if (createWorkspaceRoot) {
      await fs.mkdir(providerOptions.workspaceRoot, { recursive: true });
    }
    return new LocalProcessExecutionProvider({
      ...providerOptions,
      id: this.providerId,
    });
  }
}
