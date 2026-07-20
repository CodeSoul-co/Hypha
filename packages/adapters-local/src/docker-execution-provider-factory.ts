import type { SandboxProviderFactory } from '@hypha/core';
import {
  DockerExecutionProvider,
  type DockerExecutionProviderOptions,
} from './docker-execution-provider';

/** Composition-root entry point for registering the Docker adapter in core DI. */
export class DockerExecutionProviderFactory implements SandboxProviderFactory {
  readonly providerType = 'docker' as const;
  readonly providerId: string;
  private readonly options: DockerExecutionProviderOptions;

  constructor(options: DockerExecutionProviderOptions) {
    this.providerId = options.id ?? 'provider.docker';
    this.options = { ...options, id: this.providerId };
  }

  create(): DockerExecutionProvider {
    return new DockerExecutionProvider(this.options);
  }
}
