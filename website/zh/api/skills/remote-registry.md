# `@codesoul-co/hypha-skills` / `remote-registry`

- 包索引: [`@codesoul-co/hypha-skills`](/zh/api/skills)
- 模块指南: [学习与组合说明](/zh/packages/skills)
- 源码: [`packages/skills/src/remote-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HttpsSkillRegistryClient` | 类 | <code>new HttpsSkillRegistryClient(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | HTTPS registry client that verifies publisher identity and transparency inclusion. |
| `HttpsSkillRegistryClientOptions` | 接口 | <code>interface HttpsSkillRegistryClientOptions</code> | Https Skill Registry Client Options 的字段契约；完整字段见下表。 |
| `SignedSkillRegistryEntry` | 接口 | <code>interface SignedSkillRegistryEntry</code> | Signed Skill Registry Entry 的字段契约；完整字段见下表。 |
| `SkillDependencyLock` | 接口 | <code>interface SkillDependencyLock</code> | Skill Dependency Lock 的字段契约；完整字段见下表。 |
| `SkillRegistryPage` | 接口 | <code>interface SkillRegistryPage</code> | Skill Registry Page 的字段契约；完整字段见下表。 |
| `SkillSbomRef` | 接口 | <code>interface SkillSbomRef</code> | Skill Sbom Ref 的字段契约；完整字段见下表。 |
| `SkillSupplyChainManifest` | 接口 | <code>interface SkillSupplyChainManifest</code> | Skill Supply Chain Manifest 的字段契约；完整字段见下表。 |
| `SkillTransparencyProof` | 接口 | <code>interface SkillTransparencyProof</code> | Skill Transparency Proof 的字段契约；完整字段见下表。 |
| `VerifiedSkillBundle` | 接口 | <code>interface VerifiedSkillBundle</code> | Verified Skill Bundle 的字段契约；完整字段见下表。 |

## `HttpsSkillRegistryClient` 公开成员

HTTPS registry client that verifies publisher identity and transparency inclusion.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | 创建该类的实例。 |
| `download` | 方法 | <code>download(entryInput: SignedSkillRegistryEntry): Promise&lt;VerifiedSkillBundle&gt;</code> | download 的公开运行时操作。 |
| `list` | 方法 | <code>list(input?: { cursor?: string; limit?: number; }): Promise&lt;SkillRegistryPage&gt;</code> | 列出 list。 |
| `resolve` | 方法 | <code>resolve(skillId: string, version: string): Promise&lt;SignedSkillRegistryEntry&gt;</code> | 解析 resolve。 |
| `verifyOfflineBundle` | 方法 | <code>verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle</code> | verify Offline Bundle 的公开运行时操作。 |

## `HttpsSkillRegistryClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactOrigins` | 属性 | <code>artifactOrigins: string[]</code> | artifact Origins 字段。 |
| `authorization` | 方法 | <code>authorization(): string &#124; Promise&lt;string&gt;</code> | authorization 的公开运行时操作。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `fetch` | 方法 | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | fetch 的公开运行时操作。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `maxBundleBytes` | 属性 | <code>maxBundleBytes: number</code> | max Bundle Bytes 字段。 |
| `maxMetadataBytes` | 属性 | <code>maxMetadataBytes: number</code> | max Metadata Bytes 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `publisherKeys` | 属性 | <code>publisherKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | publisher Keys 字段。 |
| `sleep` | 方法 | <code>sleep(ms: number): Promise&lt;void&gt;</code> | sleep 的公开运行时操作。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `transparencyLogKeys` | 属性 | <code>transparencyLogKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | transparency Log Keys 字段。 |

## `SignedSkillRegistryEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manifest` | 属性 | <code>manifest: SkillSupplyChainManifest</code> | manifest 字段。 |
| `publisherSignature` | 属性 | <code>publisherSignature: string</code> | publisher Signature 字段。 |
| `transparency` | 属性 | <code>transparency: SkillTransparencyProof</code> | transparency 字段。 |

## `SkillDependencyLock` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentSha256` | 属性 | <code>contentSha256: string</code> | content Sha256 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `SkillRegistryPage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: SignedSkillRegistryEntry[]</code> | entries 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |

## `SkillSbomRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `format` | 属性 | <code>format: "cyclonedx-json" &#124; "spdx-json"</code> | format 字段。 |
| `sha256` | 属性 | <code>sha256: string</code> | sha256 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `SkillSupplyChainManifest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentSha256` | 属性 | <code>contentSha256: string</code> | content Sha256 字段。 |
| `dependencies` | 属性 | <code>dependencies: SkillDependencyLock[]</code> | dependencies 字段。 |
| `downloadUrl` | 属性 | <code>downloadUrl: string</code> | download Url 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | issued At 字段。 |
| `publisherId` | 属性 | <code>publisherId: string</code> | publisher Id 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `sbom` | 属性 | <code>sbom: SkillSbomRef</code> | sbom 字段。 |
| `skillId` | 属性 | <code>skillId: string</code> | skill Id 字段。 |
| `tenantIds` | 属性 | <code>tenantIds: string[]</code> | tenant Ids 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `SkillTransparencyProof` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | checkpoint Hash 字段。 |
| `entryHash` | 属性 | <code>entryHash: string</code> | entry Hash 字段。 |
| `logId` | 属性 | <code>logId: string</code> | log Id 字段。 |
| `logIndex` | 属性 | <code>logIndex: number</code> | log Index 字段。 |
| `signature` | 属性 | <code>signature: string</code> | signature 字段。 |

## `VerifiedSkillBundle` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | content 字段。 |
| `entry` | 属性 | <code>entry: SignedSkillRegistryEntry</code> | entry 字段。 |
