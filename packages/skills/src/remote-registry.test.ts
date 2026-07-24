import {
  createHash,
  generateKeyPairSync,
  sign,
  type KeyObject,
} from 'crypto';
import { describe, expect, it } from 'vitest';
import {
  HttpsSkillRegistryClient,
  type SignedSkillRegistryEntry,
  type SkillSupplyChainManifest,
} from './remote-registry';

function canonicalJson(value: unknown): string {
  const sort = (candidate: unknown): unknown => {
    if (Array.isArray(candidate)) return candidate.map(sort);
    if (!candidate || typeof candidate !== 'object') return candidate;
    return Object.keys(candidate as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        const item = (candidate as Record<string, unknown>)[key];
        if (item !== undefined) result[key] = sort(item);
        return result;
      }, {});
  };
  return JSON.stringify(sort(value));
}

function sha256(value: Uint8Array | string): string {
  return createHash('sha256').update(value).digest('hex');
}

function signature(value: unknown, key: KeyObject): string {
  return sign(null, Buffer.from(canonicalJson(value), 'utf8'), key).toString('base64');
}

function fixture() {
  const publisher = generateKeyPairSync('ed25519');
  const log = generateKeyPairSync('ed25519');
  const content = new TextEncoder().encode('---\nid: cloud.search\nversion: 1.0.0\n---\nSearch safely.');
  const manifest: SkillSupplyChainManifest = {
    skillId: 'cloud.search',
    version: '1.0.0',
    contentSha256: sha256(content),
    downloadUrl: 'https://registry.example.com/artifacts/cloud.search/1.0.0.md',
    publisherId: 'publisher-a',
    issuedAt: '2026-07-24T00:00:00.000Z',
    expiresAt: '2026-08-24T00:00:00.000Z',
    tenantIds: ['tenant-a'],
    dependencies: [
      {
        id: 'common.http',
        version: '2.1.0',
        contentSha256: 'a'.repeat(64),
      },
    ],
    sbom: {
      format: 'cyclonedx-json',
      sha256: 'b'.repeat(64),
      url: 'https://registry.example.com/sbom/cloud.search/1.0.0.json',
    },
  };
  const publisherSignature = signature(manifest, publisher.privateKey);
  const entryHash = sha256(
    canonicalJson({
      manifest,
      publisherSignature,
    })
  );
  const proof = {
    logId: 'log-a',
    logIndex: 42,
    entryHash,
    checkpointHash: 'c'.repeat(64),
  };
  const entry: SignedSkillRegistryEntry = {
    manifest,
    publisherSignature,
    transparency: {
      ...proof,
      signature: signature(proof, log.privateKey),
    },
  };
  return {
    content,
    entry,
    publisherPublicKey: publisher.publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    logPublicKey: log.publicKey.export({ type: 'spki', format: 'pem' }).toString(),
  };
}

describe('HttpsSkillRegistryClient', () => {
  it('verifies publisher, transparency, tenant, dependency lock, SBOM, and bundle hash', async () => {
    const data = fixture();
    const authorizations: Array<string | null> = [];
    let credential = 'Bearer registry-token-1';
    const client = new HttpsSkillRegistryClient({
      endpoint: 'https://registry.example.com/',
      tenantId: 'tenant-a',
      publisherKeys: { 'publisher-a': data.publisherPublicKey },
      transparencyLogKeys: { 'log-a': data.logPublicKey },
      authorization: () => credential,
      now: () => Date.parse('2026-07-24T01:00:00.000Z'),
      fetch: async (input, init) => {
        const request = new Request(input, init);
        authorizations.push(request.headers.get('authorization'));
        if (request.url.includes('/v1/skills/')) return Response.json(data.entry);
        return new Response(data.content, {
          headers: { 'content-type': 'text/markdown' },
        });
      },
    });

    credential = 'Bearer registry-token-2';
    const entry = await client.resolve('cloud.search', '1.0.0');
    const bundle = await client.download(entry);
    expect(new TextDecoder().decode(bundle.content)).toContain('Search safely.');
    expect(entry.manifest.dependencies).toEqual([
      expect.objectContaining({ id: 'common.http', version: '2.1.0' }),
    ]);
    expect(entry.manifest.sbom).toMatchObject({ format: 'cyclonedx-json' });
    expect(authorizations).toEqual([
      'Bearer registry-token-2',
      'Bearer registry-token-2',
    ]);
    expect(client.verifyOfflineBundle(bundle)).toEqual(bundle);
  });

  it('fails closed for tampering, tenant mismatch, and non-HTTPS registries', async () => {
    const data = fixture();
    expect(
      () =>
        new HttpsSkillRegistryClient({
          endpoint: 'http://registry.example.com',
          publisherKeys: {},
          transparencyLogKeys: {},
        })
    ).toThrow(expect.objectContaining({ code: 'SKILL_REGISTRY_ENDPOINT_INVALID' }));

    const tenantClient = new HttpsSkillRegistryClient({
      endpoint: 'https://registry.example.com',
      tenantId: 'tenant-b',
      publisherKeys: { 'publisher-a': data.publisherPublicKey },
      transparencyLogKeys: { 'log-a': data.logPublicKey },
      now: () => Date.parse('2026-07-24T01:00:00.000Z'),
      fetch: async () => Response.json(data.entry),
    });
    await expect(tenantClient.resolve('cloud.search', '1.0.0')).rejects.toMatchObject({
      code: 'SKILL_REGISTRY_TENANT_DENIED',
    });

    const tampered = {
      ...data.entry,
      manifest: { ...data.entry.manifest, contentSha256: 'f'.repeat(64) },
    };
    const tamperClient = new HttpsSkillRegistryClient({
      endpoint: 'https://registry.example.com',
      tenantId: 'tenant-a',
      publisherKeys: { 'publisher-a': data.publisherPublicKey },
      transparencyLogKeys: { 'log-a': data.logPublicKey },
      now: () => Date.parse('2026-07-24T01:00:00.000Z'),
      fetch: async () => Response.json(tampered),
    });
    await expect(tamperClient.resolve('cloud.search', '1.0.0')).rejects.toMatchObject({
      code: 'SKILL_REGISTRY_PUBLISHER_SIGNATURE_INVALID',
    });
  });
});
