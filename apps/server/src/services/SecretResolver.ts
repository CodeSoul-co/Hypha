export interface SecretResolver {
  resolve(reference: string): Promise<string | null>;
}

/** Resolves opaque secret references at the last responsible moment. */
export class EnvironmentSecretResolver implements SecretResolver {
  async resolve(reference: string): Promise<string | null> {
    const match = /^env:([A-Z_][A-Z0-9_]*)$/.exec(reference);
    if (!match) {
      throw Object.assign(new Error('Unsupported secret reference.'), {
        code: 'SECRET_REFERENCE_INVALID',
        reference,
      });
    }
    const value = process.env[match[1]];
    return value && value.length > 0 ? value : null;
  }

  async resolveAuthorization(reference: string): Promise<string> {
    const value = await this.resolve(reference);
    if (!value) {
      throw Object.assign(new Error('Secret reference could not be resolved.'), {
        code: 'SECRET_NOT_FOUND',
        reference,
      });
    }
    return /^[A-Za-z][A-Za-z0-9_-]*\s+/.test(value) ? value : `Bearer ${value}`;
  }
}
