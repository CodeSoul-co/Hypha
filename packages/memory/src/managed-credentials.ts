import { memoryError } from './memory-utils';

export interface ManagedCredentialLease {
  token: string;
  tokenType: 'api_token' | 'oauth_bearer';
  expiresAt?: string;
}

export interface RenewableCredentialProvider {
  acquire(signal?: AbortSignal): Promise<ManagedCredentialLease>;
  revoke?(lease: ManagedCredentialLease, signal?: AbortSignal): Promise<void>;
  close?(): Promise<void>;
}

export interface RenewableCredentialManagerOptions {
  provider: RenewableCredentialProvider;
  refreshSkewMs?: number;
  now?: () => Date;
}

export class RenewableCredentialManager {
  private current?: ManagedCredentialLease;
  private refresh?: Promise<ManagedCredentialLease>;
  private closed = false;
  private readonly refreshSkewMs: number;
  private readonly now: () => Date;

  constructor(private readonly options: RenewableCredentialManagerOptions) {
    this.refreshSkewMs = options.refreshSkewMs ?? 60_000;
    this.now = options.now ?? (() => new Date());
  }

  async get(signal?: AbortSignal): Promise<ManagedCredentialLease> {
    if (this.closed) {
      throw memoryError('MEMORY_PERMISSION_DENIED', 'Managed credential provider is closed.');
    }
    if (this.current && this.isFresh(this.current)) return { ...this.current };
    if (!this.refresh) {
      this.refresh = this.options.provider
        .acquire(signal)
        .then((lease) => {
          if (!lease.token.trim()) {
            throw memoryError(
              'MEMORY_PERMISSION_DENIED',
              'Credential provider returned an empty token.'
            );
          }
          if (lease.expiresAt && Date.parse(lease.expiresAt) <= this.now().getTime()) {
            throw memoryError(
              'MEMORY_PERMISSION_DENIED',
              'Credential provider returned an expired token.'
            );
          }
          this.current = { ...lease };
          return { ...lease };
        })
        .finally(() => {
          this.refresh = undefined;
        });
    }
    return { ...(await this.refresh) };
  }

  invalidate(): void {
    this.current = undefined;
  }

  async close(signal?: AbortSignal): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    const lease = this.current;
    this.current = undefined;
    if (lease) await this.options.provider.revoke?.({ ...lease }, signal);
    await this.options.provider.close?.();
  }

  private isFresh(lease: ManagedCredentialLease): boolean {
    return (
      !lease.expiresAt || Date.parse(lease.expiresAt) - this.now().getTime() > this.refreshSkewMs
    );
  }
}

export function staticCredentialProvider(
  token: string,
  tokenType: ManagedCredentialLease['tokenType']
): RenewableCredentialProvider {
  if (!token.trim()) {
    throw memoryError(
      'MEMORY_PERMISSION_DENIED',
      'Managed provider requires an injected credential.'
    );
  }
  return {
    acquire: async () => ({ token, tokenType }),
  };
}
