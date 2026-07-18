import type { SandboxProviderFactory } from '@hypha/core';
import {
  DockerExecutionProvider,
  type DockerExecutionProviderOptions,
} from './docker-execution-provider';
import {
  LocalProcessExecutionProvider,
  type LocalProcessExecutionProviderOptions,
} from './local-process-execution-provider';

export function createLocalProcessExecutionProviderFactory(
  options: LocalProcessExecutionProviderOptions
): SandboxProviderFactory {
  const providerId = options.id ?? 'provider.local-process';
  return {
    providerType: 'local_process',
    providerId,
    create: () => new LocalProcessExecutionProvider({ ...options, id: providerId }),
  };
}

export function createDockerExecutionProviderFactory(
  options: DockerExecutionProviderOptions
): SandboxProviderFactory {
  const providerId = options.id ?? 'provider.docker';
  return {
    providerType: 'docker',
    providerId,
    create: () => new DockerExecutionProvider({ ...options, id: providerId }),
  };
}
