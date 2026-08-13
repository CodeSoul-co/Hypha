import type { SandboxCreateRequest } from '@codesoul-co/core';
import {
  InMemorySandboxLifecycle,
  type InMemorySandboxLifecycleOptions,
} from './in-memory-sandbox-lifecycle';
import { shortExecutionHash } from './execution-provider-values';

export interface DockerSandboxLifecycleOptions {
  providerId: string;
  engineScopeId: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
}

/** Docker identity wrapper; container ownership remains with the execution coordinator. */
export class DockerSandboxLifecycle extends InMemorySandboxLifecycle {
  constructor(options: DockerSandboxLifecycleOptions) {
    super({
      providerId: options.providerId,
      providerName: 'Docker',
      sandboxId:
        options.sandboxId ??
        ((request) => `sandbox.docker.${shortExecutionHash(request.operationId)}`),
      providerSandboxRef: (_request, sandboxId) =>
        `docker:${shortExecutionHash(options.engineScopeId)}:${shortExecutionHash(sandboxId)}`,
      imageDigest: (request) => request.environment.image?.digest,
      ...(options.now ? { now: options.now } : {}),
    } satisfies InMemorySandboxLifecycleOptions);
  }
}
