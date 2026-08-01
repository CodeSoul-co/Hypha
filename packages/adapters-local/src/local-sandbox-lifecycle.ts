import type { SandboxCreateRequest } from '@hypha/core';
import {
  InMemorySandboxLifecycle,
  type InMemorySandboxLifecycleOptions,
} from './in-memory-sandbox-lifecycle';
import { shortExecutionHash } from './execution-provider-values';

export interface LocalSandboxLifecycleOptions {
  providerId: string;
  workspaceRoot: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
}

/** Local Process identity wrapper around the provider-neutral lifecycle state. */
export class LocalSandboxLifecycle extends InMemorySandboxLifecycle {
  constructor(options: LocalSandboxLifecycleOptions) {
    super({
      providerId: options.providerId,
      providerName: 'Local Process',
      sandboxId:
        options.sandboxId ??
        ((request) => `sandbox.local.${shortExecutionHash(request.operationId)}`),
      providerSandboxRef: () => `local:${shortExecutionHash(options.workspaceRoot)}`,
      ...(options.now ? { now: options.now } : {}),
    } satisfies InMemorySandboxLifecycleOptions);
  }
}
