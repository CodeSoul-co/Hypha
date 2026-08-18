# `@codesoul-co/hypha-skills` / `remote-registry`

- Package index: [`@codesoul-co/hypha-skills`](/api/skills)
- Source: [`packages/skills/src/remote-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)
- Exports: **9**

## Using this module

Use the Remote registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 8 interfaces.

### Import from the package entrypoint

```ts
import {
  HttpsSkillRegistryClient,
} from '@codesoul-co/hypha-skills';

import type {
  HttpsSkillRegistryClientOptions,
  SignedSkillRegistryEntry,
  SkillDependencyLock,
  SkillRegistryPage,
  SkillSbomRef,
  SkillSupplyChainManifest,
  SkillTransparencyProof,
  VerifiedSkillBundle,
} from '@codesoul-co/hypha-skills';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HttpsSkillRegistryClient` | class | <code>new HttpsSkillRegistryClient(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | HTTPS registry client that verifies publisher identity and transparency inclusion. |
| `HttpsSkillRegistryClientOptions` | interface | <code>interface HttpsSkillRegistryClientOptions</code> | Https Skill Registry Client Options interface with 13 public fields or methods. |
| `SignedSkillRegistryEntry` | interface | <code>interface SignedSkillRegistryEntry</code> | Signed Skill Registry Entry interface with 3 public fields or methods. |
| `SkillDependencyLock` | interface | <code>interface SkillDependencyLock</code> | Skill Dependency Lock interface with 3 public fields or methods. |
| `SkillRegistryPage` | interface | <code>interface SkillRegistryPage</code> | Skill Registry Page interface with 3 public fields or methods. |
| `SkillSbomRef` | interface | <code>interface SkillSbomRef</code> | Skill Sbom Ref interface with 3 public fields or methods. |
| `SkillSupplyChainManifest` | interface | <code>interface SkillSupplyChainManifest</code> | Skill Supply Chain Manifest interface with 11 public fields or methods. |
| `SkillTransparencyProof` | interface | <code>interface SkillTransparencyProof</code> | Skill Transparency Proof interface with 5 public fields or methods. |
| `VerifiedSkillBundle` | interface | <code>interface VerifiedSkillBundle</code> | Verified Skill Bundle interface with 2 public fields or methods. |

## `HttpsSkillRegistryClient`

HTTPS registry client that verifies publisher identity and transparency inclusion.

- Kind: class
- Import: `import { HttpsSkillRegistryClient } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export declare class HttpsSkillRegistryClient {
    constructor(options: HttpsSkillRegistryClientOptions);
    resolve(skillId: string, version: string): Promise<SignedSkillRegistryEntry>;
    list(input?: {
            cursor?: string;
            limit?: number;
        }): Promise<SkillRegistryPage>;
    download(entryInput: SignedSkillRegistryEntry): Promise<VerifiedSkillBundle>;
    verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | Creates an instance of this class. |
| `download` | method | <code>download(entryInput: SignedSkillRegistryEntry): Promise&lt;VerifiedSkillBundle&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(input?: { cursor?: string; limit?: number; }): Promise&lt;SkillRegistryPage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(skillId: string, version: string): Promise&lt;SignedSkillRegistryEntry&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verifyOfflineBundle` | method | <code>verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle</code> | Public method; parameters and return type are shown in the signature. |

## `HttpsSkillRegistryClientOptions`

Https Skill Registry Client Options interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { HttpsSkillRegistryClientOptions } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface HttpsSkillRegistryClientOptions {
    endpoint: string;
    publisherKeys: Readonly<Record<string, string>>;
    transparencyLogKeys: Readonly<Record<string, string>>;
    tenantId?: string;
    authorization?: () => string | Promise<string>;
    artifactOrigins?: string[];
    maxMetadataBytes?: number;
    maxBundleBytes?: number;
    timeoutMs?: number;
    maxAttempts?: number;
    fetch?: typeof fetch;
    now?: () => number;
    sleep?: (ms: number) => Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactOrigins` | property | <code>artifactOrigins?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorization` | method | <code>authorization?(): string &#124; Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `endpoint` | property | <code>endpoint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBundleBytes` | property | <code>maxBundleBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMetadataBytes` | property | <code>maxMetadataBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `publisherKeys` | property | <code>publisherKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sleep` | method | <code>sleep?(ms: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transparencyLogKeys` | property | <code>transparencyLogKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SignedSkillRegistryEntry`

Signed Skill Registry Entry interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SignedSkillRegistryEntry } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SignedSkillRegistryEntry {
    manifest: SkillSupplyChainManifest;
    publisherSignature: string;
    transparency: SkillTransparencyProof;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manifest` | property | <code>manifest: SkillSupplyChainManifest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publisherSignature` | property | <code>publisherSignature: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transparency` | property | <code>transparency: SkillTransparencyProof</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillDependencyLock`

Skill Dependency Lock interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SkillDependencyLock } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SkillDependencyLock {
    id: string;
    version: string;
    contentSha256: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentSha256` | property | <code>contentSha256: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillRegistryPage`

Skill Registry Page interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SkillRegistryPage } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SkillRegistryPage {
    entries: SignedSkillRegistryEntry[];
    nextCursor?: string;
    revision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: SignedSkillRegistryEntry[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSbomRef`

Skill Sbom Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SkillSbomRef } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SkillSbomRef {
    format: 'cyclonedx-json' | 'spdx-json';
    sha256: string;
    url?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `format` | property | <code>format: "cyclonedx-json" &#124; "spdx-json"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sha256` | property | <code>sha256: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSupplyChainManifest`

Skill Supply Chain Manifest interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { SkillSupplyChainManifest } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SkillSupplyChainManifest {
    skillId: string;
    version: string;
    revision?: string;
    contentSha256: string;
    downloadUrl: string;
    publisherId: string;
    issuedAt: string;
    expiresAt?: string;
    tenantIds?: string[];
    dependencies: SkillDependencyLock[];
    sbom: SkillSbomRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentSha256` | property | <code>contentSha256: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencies` | property | <code>dependencies: SkillDependencyLock[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `downloadUrl` | property | <code>downloadUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publisherId` | property | <code>publisherId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sbom` | property | <code>sbom: SkillSbomRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillId` | property | <code>skillId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantIds` | property | <code>tenantIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillTransparencyProof`

Skill Transparency Proof interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SkillTransparencyProof } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface SkillTransparencyProof {
    logId: string;
    logIndex: number;
    entryHash: string;
    checkpointHash: string;
    signature: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entryHash` | property | <code>entryHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logId` | property | <code>logId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logIndex` | property | <code>logIndex: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signature` | property | <code>signature: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VerifiedSkillBundle`

Verified Skill Bundle interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { VerifiedSkillBundle } from '@codesoul-co/hypha-skills';`
- Source module: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### Declaration

```text
export interface VerifiedSkillBundle {
    entry: SignedSkillRegistryEntry;
    content: Uint8Array;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entry` | property | <code>entry: SignedSkillRegistryEntry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
