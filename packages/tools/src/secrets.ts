export interface CredentialLease {
  readonly expiresAt?: string;
  readonly renewable: boolean;
  read(): string;
  renew?(): Promise<CredentialLease>;
  release?(): Promise<void>;
}

export interface SecretResolutionContext {
  purpose?: 'tool' | 'mcp_authorization' | 'mcp_headers' | 'other';
  minimumValidityMs?: number;
}

export interface SecretProvider {
  readonly scheme: string;
  acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
}

/**
 * Provider-neutral boundary for resolving opaque references at the last
 * responsible moment. Implementations must never persist or log lease values.
 */
export interface SecretResolver {
  acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
  resolve(reference: string, context?: SecretResolutionContext): Promise<string | null>;
}
