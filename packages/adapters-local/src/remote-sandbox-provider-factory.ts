import type { SandboxProvider, SandboxProviderFactory } from '@codesoul-co/core';
import {
  RemoteSandboxHttpTransport,
  type RemoteSandboxHttpTransportOptions,
} from './remote-sandbox-http-transport';
import {
  RemoteSandboxProviderAdapter,
  type RemoteSandboxTransport,
} from './remote-sandbox-provider-adapter';

export const REMOTE_SANDBOX_PROVIDER_ID = 'provider.remote-sandbox';

export interface RemoteSandboxProviderFactoryOptions extends Omit<
  RemoteSandboxHttpTransportOptions,
  'baseUrl'
> {
  baseUrl: string;
  providerId?: string;
  transport?: RemoteSandboxTransport;
}

/**
 * Explicit composition boundary for a remote Sandbox deployment. Credentials
 * remain late-bound through the transport credentialProvider so rotation does
 * not require rebuilding the registry or retaining a token in the Factory.
 */
export class RemoteSandboxProviderFactory implements SandboxProviderFactory {
  readonly providerType = 'remote_sandbox' as const;
  readonly providerId: string;

  constructor(private readonly options: RemoteSandboxProviderFactoryOptions) {
    if (options.transport && options.fetch) {
      throw new TypeError('Remote Sandbox factory cannot configure both transport and fetch.');
    }
    this.providerId = options.providerId ?? REMOTE_SANDBOX_PROVIDER_ID;
  }

  create(): SandboxProvider {
    const {
      providerId: _providerId,
      transport: configuredTransport,
      ...transportOptions
    } = this.options;
    const transport = configuredTransport ?? new RemoteSandboxHttpTransport(transportOptions);
    return new RemoteSandboxProviderAdapter({ id: this.providerId, transport });
  }
}
