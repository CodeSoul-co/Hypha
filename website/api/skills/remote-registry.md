# `@codesoul-co/hypha-skills` / `remote-registry`

- Package index: [`@codesoul-co/hypha-skills`](/api/skills)
- Package guide: [learning and composition guide](/packages/skills)
- Source: [`packages/skills/src/remote-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HttpsSkillRegistryClient` | class | <code>new HttpsSkillRegistryClient(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | HTTPS registry client that verifies publisher identity and transparency inclusion. |
| `HttpsSkillRegistryClientOptions` | interface | <code>interface HttpsSkillRegistryClientOptions</code> | Field contract for Https Skill Registry Client Options; see all contract members below. |
| `SignedSkillRegistryEntry` | interface | <code>interface SignedSkillRegistryEntry</code> | Field contract for Signed Skill Registry Entry; see all contract members below. |
| `SkillDependencyLock` | interface | <code>interface SkillDependencyLock</code> | Field contract for Skill Dependency Lock; see all contract members below. |
| `SkillRegistryPage` | interface | <code>interface SkillRegistryPage</code> | Field contract for Skill Registry Page; see all contract members below. |
| `SkillSbomRef` | interface | <code>interface SkillSbomRef</code> | Field contract for Skill Sbom Ref; see all contract members below. |
| `SkillSupplyChainManifest` | interface | <code>interface SkillSupplyChainManifest</code> | Field contract for Skill Supply Chain Manifest; see all contract members below. |
| `SkillTransparencyProof` | interface | <code>interface SkillTransparencyProof</code> | Field contract for Skill Transparency Proof; see all contract members below. |
| `VerifiedSkillBundle` | interface | <code>interface VerifiedSkillBundle</code> | Field contract for Verified Skill Bundle; see all contract members below. |

## `HttpsSkillRegistryClient` public members

HTTPS registry client that verifies publisher identity and transparency inclusion.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | Creates an instance of this class. |
| `download` | method | <code>download(entryInput: SignedSkillRegistryEntry): Promise&lt;VerifiedSkillBundle&gt;</code> | Public runtime operation for download. |
| `list` | method | <code>list(input?: { cursor?: string; limit?: number; }): Promise&lt;SkillRegistryPage&gt;</code> | Lists list at this module boundary. |
| `resolve` | method | <code>resolve(skillId: string, version: string): Promise&lt;SignedSkillRegistryEntry&gt;</code> | Resolves resolve at this module boundary. |
| `verifyOfflineBundle` | method | <code>verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle</code> | Public runtime operation for verify Offline Bundle. |

## `HttpsSkillRegistryClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactOrigins` | property | <code>artifactOrigins: string[]</code> | Public artifact Origins property. |
| `authorization` | method | <code>authorization(): string &#124; Promise&lt;string&gt;</code> | Public runtime operation for authorization. |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `fetch` | method | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public runtime operation for fetch. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `maxBundleBytes` | property | <code>maxBundleBytes: number</code> | Public max Bundle Bytes property. |
| `maxMetadataBytes` | property | <code>maxMetadataBytes: number</code> | Public max Metadata Bytes property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `publisherKeys` | property | <code>publisherKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | Public publisher Keys property. |
| `sleep` | method | <code>sleep(ms: number): Promise&lt;void&gt;</code> | Public runtime operation for sleep. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `transparencyLogKeys` | property | <code>transparencyLogKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | Public transparency Log Keys property. |

## `SignedSkillRegistryEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manifest` | property | <code>manifest: SkillSupplyChainManifest</code> | Public manifest property. |
| `publisherSignature` | property | <code>publisherSignature: string</code> | Public publisher Signature property. |
| `transparency` | property | <code>transparency: SkillTransparencyProof</code> | Public transparency property. |

## `SkillDependencyLock` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentSha256` | property | <code>contentSha256: string</code> | Public content Sha256 property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `SkillRegistryPage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: SignedSkillRegistryEntry[]</code> | Public entries property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |

## `SkillSbomRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `format` | property | <code>format: "cyclonedx-json" &#124; "spdx-json"</code> | Public format property. |
| `sha256` | property | <code>sha256: string</code> | Public sha256 property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `SkillSupplyChainManifest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentSha256` | property | <code>contentSha256: string</code> | Public content Sha256 property. |
| `dependencies` | property | <code>dependencies: SkillDependencyLock[]</code> | Public dependencies property. |
| `downloadUrl` | property | <code>downloadUrl: string</code> | Public download Url property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public issued At property. |
| `publisherId` | property | <code>publisherId: string</code> | Public publisher Id property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `sbom` | property | <code>sbom: SkillSbomRef</code> | Public sbom property. |
| `skillId` | property | <code>skillId: string</code> | Public skill Id property. |
| `tenantIds` | property | <code>tenantIds: string[]</code> | Public tenant Ids property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `SkillTransparencyProof` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public checkpoint Hash property. |
| `entryHash` | property | <code>entryHash: string</code> | Public entry Hash property. |
| `logId` | property | <code>logId: string</code> | Public log Id property. |
| `logIndex` | property | <code>logIndex: number</code> | Public log Index property. |
| `signature` | property | <code>signature: string</code> | Public signature property. |

## `VerifiedSkillBundle` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | Public content property. |
| `entry` | property | <code>entry: SignedSkillRegistryEntry</code> | Public entry property. |
