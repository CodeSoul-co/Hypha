import crypto from 'crypto';
import type { SignedSkillRegistryEntry } from '@hypha/skills';
import { SkillManager, type ServerRemoteSkillRegistryClient } from './SkillManager';

describe('SkillManager signed remote registry composition', () => {
  it('loads a verified root and its exact locked dependency into the Server registry', async () => {
    const dependency = skillMarkdown('common.http', '2.1.0', 'Shared HTTP rules.');
    const root = skillMarkdown('cloud.search', '1.0.0', 'Search safely.');
    const entries = new Map([
      ['common.http@2.1.0', registryEntry('common.http', '2.1.0', dependency)],
      [
        'cloud.search@1.0.0',
        registryEntry('cloud.search', '1.0.0', root, [
          {
            id: 'common.http',
            version: '2.1.0',
            contentSha256: sha256(dependency),
          },
        ]),
      ],
    ]);
    const client = fakeClient(
      entries,
      new Map([
        ['common.http@2.1.0', dependency],
        ['cloud.search@1.0.0', root],
      ])
    );
    const manager = new SkillManager({
      dirs: [],
      remoteRegistry: {
        client,
        refs: [{ id: 'cloud.search', version: '1.0.0', required: true }],
      },
    });

    await manager.initialize();

    expect(manager.readiness()).toEqual({
      enabled: true,
      required: true,
      status: 'ready',
      configuredRefs: 1,
      loadedSkills: 2,
      failures: [],
    });

    expect(manager.getSkill('common.http')?.spec).toMatchObject({
      version: '2.1.0',
      trustLevel: 'trusted',
      provenance: {
        source: 'signed-remote-registry',
        publisherId: 'publisher.test',
      },
    });
    expect(manager.getSkill('cloud.search')?.body).toBe('Search safely.');
    await expect(
      manager.resolveSkills({
        agentSkillRefs: [{ id: 'cloud.search', version: '1.0.0' }],
        requiredSkills: ['cloud.search'],
        availableToolRefs: [],
      })
    ).resolves.toEqual([
      expect.objectContaining({
        id: 'cloud.search',
        instructions: 'Search safely.',
        trustLevel: 'trusted',
      }),
    ]);
  });

  it('fails startup atomically when a required dependency lock does not match', async () => {
    const dependency = skillMarkdown('common.http', '2.1.0', 'Shared HTTP rules.');
    const root = skillMarkdown('cloud.search', '1.0.0', 'Search safely.');
    const entries = new Map([
      ['common.http@2.1.0', registryEntry('common.http', '2.1.0', dependency)],
      [
        'cloud.search@1.0.0',
        registryEntry('cloud.search', '1.0.0', root, [
          { id: 'common.http', version: '2.1.0', contentSha256: 'f'.repeat(64) },
        ]),
      ],
    ]);
    const manager = new SkillManager({
      dirs: [],
      remoteRegistry: {
        client: fakeClient(
          entries,
          new Map([
            ['common.http@2.1.0', dependency],
            ['cloud.search@1.0.0', root],
          ])
        ),
        refs: [{ id: 'cloud.search', version: '1.0.0', required: true }],
      },
    });

    await expect(manager.initialize()).rejects.toThrow('dependency lock mismatch');
    expect(manager.readiness()).toMatchObject({
      enabled: true,
      required: true,
      status: 'failed',
      loadedSkills: 0,
      failures: [
        expect.objectContaining({
          skillId: 'cloud.search',
          version: '1.0.0',
          error: expect.stringContaining('dependency lock mismatch'),
        }),
      ],
    });
    expect(manager.getSkill('common.http')).toBeNull();
    expect(manager.getSkill('cloud.search')).toBeNull();
  });

  it('rejects unverified external asset paths instead of treating them as local files', async () => {
    const content = [
      '---',
      'id: cloud.search',
      'version: 1.0.0',
      'description: Cloud search',
      'references:',
      '  - path: references/policy.md',
      '    loadPolicy: on_activation',
      '---',
      'Search safely.',
    ].join('\n');
    const entry = registryEntry('cloud.search', '1.0.0', content);
    const manager = new SkillManager({
      dirs: [],
      remoteRegistry: {
        client: fakeClient(
          new Map([['cloud.search@1.0.0', entry]]),
          new Map([['cloud.search@1.0.0', content]])
        ),
        refs: [{ id: 'cloud.search', version: '1.0.0', required: true }],
      },
    });

    await expect(manager.initialize()).rejects.toThrow('outside the verified single-file bundle');
    expect(manager.getSkill('cloud.search')).toBeNull();
  });

  it('reports an optional remote registry failure as degraded instead of hiding it', async () => {
    const manager = new SkillManager({
      dirs: [],
      remoteRegistry: {
        client: fakeClient(new Map(), new Map()),
        refs: [{ id: 'optional.skill', version: '1.0.0', required: false }],
      },
    });

    await expect(manager.initialize()).resolves.toBeUndefined();
    expect(manager.readiness()).toEqual({
      enabled: true,
      required: false,
      status: 'degraded',
      configuredRefs: 1,
      loadedSkills: 0,
      failures: [
        {
          skillId: 'optional.skill',
          version: '1.0.0',
          error: 'Missing fixture optional.skill@1.0.0',
        },
      ],
    });
  });
});

function skillMarkdown(id: string, version: string, instructions: string): string {
  return [
    '---',
    `id: ${id}`,
    `version: ${version}`,
    `description: ${id} description`,
    'activationPolicy:',
    '  mode: always',
    '---',
    instructions,
  ].join('\n');
}

function registryEntry(
  id: string,
  version: string,
  content: string,
  dependencies: SignedSkillRegistryEntry['manifest']['dependencies'] = []
): SignedSkillRegistryEntry {
  return {
    manifest: {
      skillId: id,
      version,
      revision: `${id}:${version}:revision`,
      contentSha256: sha256(content),
      downloadUrl: `https://registry.example.test/artifacts/${id}/${version}.md`,
      publisherId: 'publisher.test',
      issuedAt: '2026-08-01T00:00:00.000Z',
      dependencies,
      sbom: { format: 'cyclonedx-json', sha256: 'a'.repeat(64) },
    },
    publisherSignature: 'verified-by-client',
    transparency: {
      logId: 'log.test',
      logIndex: 1,
      entryHash: 'b'.repeat(64),
      checkpointHash: 'c'.repeat(64),
      signature: 'verified-by-client',
    },
  };
}

function fakeClient(
  entries: Map<string, SignedSkillRegistryEntry>,
  content: Map<string, string>
): ServerRemoteSkillRegistryClient {
  return {
    async resolve(id, version) {
      const entry = entries.get(`${id}@${version}`);
      if (!entry) throw new Error(`Missing fixture ${id}@${version}`);
      return structuredClone(entry);
    },
    async download(entry) {
      const key = `${entry.manifest.skillId}@${entry.manifest.version}`;
      const value = content.get(key);
      if (value === undefined) throw new Error(`Missing bundle ${key}`);
      return { entry: structuredClone(entry), content: new TextEncoder().encode(value) };
    },
  };
}

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}
