import { describe, expect, it, vi } from 'vitest';
import {
  normalizeS3ArtifactClientConfig,
  S3ArtifactConfigurationError,
  S3ArtifactCredentialError,
} from './s3-artifact-store-config';

describe('S3 Artifact client configuration', () => {
  it('uses the AWS SDK region default without enabling a custom endpoint', () => {
    expect(normalizeS3ArtifactClientConfig({})).toEqual({
      region: 'us-east-1',
      forcePathStyle: false,
    });
  });

  it('accepts an exact allow-listed HTTPS endpoint and canonicalizes it to an origin', () => {
    expect(
      normalizeS3ArtifactClientConfig({
        region: 'eu-west-1',
        endpoint: 'https://objects.example.test:9443/',
        allowedEndpointHosts: ['objects.example.test'],
        forcePathStyle: true,
      })
    ).toEqual({
      region: 'eu-west-1',
      endpoint: 'https://objects.example.test:9443',
      forcePathStyle: true,
    });
  });

  it.each([
    {
      name: 'a host that was not explicitly allowed',
      input: {
        endpoint: 'https://unexpected.example.test',
        allowedEndpointHosts: ['objects.example.test'],
      },
    },
    {
      name: 'a wildcard host allow-list',
      input: {
        endpoint: 'https://objects.example.test',
        allowedEndpointHosts: ['*.example.test'],
      },
    },
    {
      name: 'credentials embedded in the URL',
      input: {
        endpoint: 'https://access:secret@objects.example.test',
        allowedEndpointHosts: ['objects.example.test'],
      },
    },
    {
      name: 'a path below the endpoint origin',
      input: {
        endpoint: 'https://objects.example.test/sensitive',
        allowedEndpointHosts: ['objects.example.test'],
      },
    },
    {
      name: 'a query on the endpoint',
      input: {
        endpoint: 'https://objects.example.test?redirect=internal',
        allowedEndpointHosts: ['objects.example.test'],
      },
    },
    {
      name: 'a non-HTTP protocol',
      input: {
        endpoint: 'file:///var/run/secrets',
        allowedEndpointHosts: ['objects.example.test'],
      },
    },
  ])('rejects $name', ({ input }) => {
    expect(() => normalizeS3ArtifactClientConfig(input)).toThrow(S3ArtifactConfigurationError);
  });

  it('requires separate explicit exceptions for local plaintext MinIO', () => {
    const input = {
      endpoint: 'http://127.0.0.1:9000',
      allowedEndpointHosts: ['127.0.0.1'],
    };

    expect(() => normalizeS3ArtifactClientConfig(input)).toThrow(
      'Plaintext S3 endpoints are disabled.'
    );
    expect(() => normalizeS3ArtifactClientConfig({ ...input, allowInsecureHttp: true })).toThrow(
      'Private-network S3 endpoints are disabled.'
    );
    expect(
      normalizeS3ArtifactClientConfig({
        ...input,
        allowInsecureHttp: true,
        allowPrivateNetwork: true,
        forcePathStyle: true,
      })
    ).toMatchObject({
      endpoint: 'http://127.0.0.1:9000',
      forcePathStyle: true,
    });
  });

  it.each([
    'https://localhost:9000',
    'https://minio.internal:9000',
    'https://10.0.0.8:9000',
    'https://169.254.169.254',
    'https://[::1]:9000',
    'https://[fd00::1]:9000',
  ])('blocks private or local endpoint %s by default', (endpoint) => {
    const hostname = new URL(endpoint).hostname.replace(/^\[|\]$/gu, '');
    expect(() =>
      normalizeS3ArtifactClientConfig({
        endpoint,
        allowedEndpointHosts: [hostname],
      })
    ).toThrow('Private-network S3 endpoints are disabled.');
  });

  it('rejects endpoint policy exceptions when no custom endpoint exists', () => {
    expect(() => normalizeS3ArtifactClientConfig({ allowPrivateNetwork: true })).toThrow(
      'Endpoint network exceptions require an explicit custom endpoint.'
    );
    expect(() =>
      normalizeS3ArtifactClientConfig({ allowedEndpointHosts: ['objects.example.test'] })
    ).toThrow('Endpoint host allow-list requires an explicit custom endpoint.');
  });

  it('resolves and validates rotating credentials on every provider call', async () => {
    const credentialProvider = vi
      .fn()
      .mockResolvedValueOnce({
        accessKeyId: 'first-access-key',
        secretAccessKey: 'first-secret-key',
        sessionToken: 'first-session-token',
        expiration: new Date(Date.now() + 60_000),
      })
      .mockResolvedValueOnce({
        accessKeyId: 'second-access-key',
        secretAccessKey: 'second-secret-key',
        sessionToken: 'second-session-token',
        expiration: new Date(Date.now() + 120_000),
      });
    const config = normalizeS3ArtifactClientConfig({ credentialProvider });

    await expect(config.credentialProvider?.()).resolves.toMatchObject({
      accessKeyId: 'first-access-key',
      sessionToken: 'first-session-token',
    });
    await expect(config.credentialProvider?.()).resolves.toMatchObject({
      accessKeyId: 'second-access-key',
      sessionToken: 'second-session-token',
    });
    expect(credentialProvider).toHaveBeenCalledTimes(2);
  });

  it.each([
    undefined,
    {},
    { accessKeyId: '', secretAccessKey: 'secret' },
    { accessKeyId: 'access', secretAccessKey: '' },
    { accessKeyId: 'access', secretAccessKey: 'secret', expiration: 'tomorrow' },
    {
      accessKeyId: 'access',
      secretAccessKey: 'secret',
      expiration: new Date(Date.now() - 1),
    },
  ])(
    'rejects malformed or expired credentials without returning provider values',
    async (value) => {
      const config = normalizeS3ArtifactClientConfig({
        credentialProvider: () => value,
      });

      await expect(config.credentialProvider?.()).rejects.toBeInstanceOf(S3ArtifactCredentialError);
    }
  );

  it('does not leak a credential provider error message', async () => {
    const config = normalizeS3ArtifactClientConfig({
      credentialProvider: () => {
        throw new Error('secret-access-key-value');
      },
    });

    await expect(config.credentialProvider?.()).rejects.toMatchObject({
      code: 'S3_ARTIFACT_CREDENTIAL_INVALID',
      message: 'S3 credential provider failed.',
    });
    await expect(config.credentialProvider?.()).rejects.not.toThrow('secret-access-key-value');
  });
});
