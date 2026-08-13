import type { SandboxProvider, SandboxProviderFactory } from '@codesoul-co/hypha-core';
import { DockerCliTransport, type DockerCommandTransport } from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';
import { DockerExecIo } from './docker-exec-io';
import { DockerExecutionCoordinator } from './docker-execution-coordinator';
import {
  LocalDockerExecutionOutputCollector,
  type DockerExecutionArtifactStreamPort,
} from './docker-execution-output-collector';
import {
  DockerExecutionPolicyResolver,
  type DockerExecutionPolicyResolverOptions,
} from './docker-execution-policy';
import { DockerStatsResourceAccounting } from './docker-resource-accounting';
import { DockerSandboxProvider } from './docker-sandbox-provider';

const HEALTH_TIMEOUT_MS = 10_000;
const HEALTH_OUTPUT_LIMIT_BYTES = 256 * 1024;

export const DOCKER_SANDBOX_PROVIDER_ID = 'provider.docker';

export interface DockerSandboxProviderFactoryOptions {
  engineScopeId: string;
  policy: DockerExecutionPolicyResolverOptions;
  outputArtifacts: DockerExecutionArtifactStreamPort;
  providerId?: string;
  dockerPath?: string;
  transport?: DockerCommandTransport;
}

/**
 * Composition adapter for the accepted Docker Provider. Registration remains
 * explicit: callers add this factory to the Core SandboxProviderRegistry.
 */
export class DockerSandboxProviderFactory implements SandboxProviderFactory {
  readonly providerType = 'docker' as const;
  readonly providerId: string;

  constructor(private readonly options: DockerSandboxProviderFactoryOptions) {
    if (options.transport && options.dockerPath) {
      throw new TypeError('Docker factory cannot configure both transport and dockerPath.');
    }
    this.providerId = options.providerId ?? DOCKER_SANDBOX_PROVIDER_ID;
  }

  create(): SandboxProvider {
    const transport =
      this.options.transport ??
      new DockerCliTransport({
        ...(this.options.dockerPath ? { dockerPath: this.options.dockerPath } : {}),
      });
    const engine = new DockerEngineCliClient(transport);
    return new DockerSandboxProvider({
      id: this.providerId,
      engineScopeId: this.options.engineScopeId,
      policy: new DockerExecutionPolicyResolver(this.options.policy),
      coordinator: new DockerExecutionCoordinator(
        engine,
        new DockerExecIo(transport),
        new DockerStatsResourceAccounting(transport),
        new LocalDockerExecutionOutputCollector({
          workspaceRoot: this.options.policy.workspaceRoot,
          outputArtifacts: this.options.outputArtifacts,
        })
      ),
      assertAvailable: () => assertDockerAvailable(transport),
      factoryRegistered: true,
    });
  }
}

async function assertDockerAvailable(transport: DockerCommandTransport): Promise<void> {
  const result = await transport.run({
    args: ['version', '--format', '{{.Server.Version}}'],
    timeoutMs: HEALTH_TIMEOUT_MS,
    maxStdoutBytes: HEALTH_OUTPUT_LIMIT_BYTES,
    maxStderrBytes: HEALTH_OUTPUT_LIMIT_BYTES,
    maxCombinedOutputBytes: HEALTH_OUTPUT_LIMIT_BYTES * 2,
    signal: new AbortController().signal,
  });
  if (result.outcome !== 'exited' || result.exitCode !== 0 || !result.stdout.trim()) {
    throw new Error('Docker daemon is unavailable.');
  }
}
