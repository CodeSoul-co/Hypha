# `@codesoul-co/hypha-skills` / `remote-registry`

- 包索引: [`@codesoul-co/hypha-skills`](/zh/api/skills)
- 源码: [`packages/skills/src/remote-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)
- 导出数: **9**

## 模块用法

用于注册并解析版本化能力或实现。Remote registry 模块公开 1 类、8 接口。

### 从包入口导入

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

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HttpsSkillRegistryClient` | 类 | <code>new HttpsSkillRegistryClient(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | HTTPS registry client that verifies publisher identity and transparency inclusion. |
| `HttpsSkillRegistryClientOptions` | 接口 | <code>interface HttpsSkillRegistryClientOptions</code> | Https Skill Registry Client Options 接口，共包含 13 个公开字段或方法。 |
| `SignedSkillRegistryEntry` | 接口 | <code>interface SignedSkillRegistryEntry</code> | Signed Skill Registry Entry 接口，共包含 3 个公开字段或方法。 |
| `SkillDependencyLock` | 接口 | <code>interface SkillDependencyLock</code> | Skill Dependency Lock 接口，共包含 3 个公开字段或方法。 |
| `SkillRegistryPage` | 接口 | <code>interface SkillRegistryPage</code> | Skill Registry Page 接口，共包含 3 个公开字段或方法。 |
| `SkillSbomRef` | 接口 | <code>interface SkillSbomRef</code> | Skill Sbom Ref 接口，共包含 3 个公开字段或方法。 |
| `SkillSupplyChainManifest` | 接口 | <code>interface SkillSupplyChainManifest</code> | Skill Supply Chain Manifest 接口，共包含 11 个公开字段或方法。 |
| `SkillTransparencyProof` | 接口 | <code>interface SkillTransparencyProof</code> | Skill Transparency Proof 接口，共包含 5 个公开字段或方法。 |
| `VerifiedSkillBundle` | 接口 | <code>interface VerifiedSkillBundle</code> | Verified Skill Bundle 接口，共包含 2 个公开字段或方法。 |

## `HttpsSkillRegistryClient`

HTTPS registry client that verifies publisher identity and transparency inclusion.

- 种类: 类
- 导入: `import { HttpsSkillRegistryClient } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: HttpsSkillRegistryClientOptions): HttpsSkillRegistryClient</code> | 创建该类的实例。 |
| `download` | 方法 | <code>download(entryInput: SignedSkillRegistryEntry): Promise&lt;VerifiedSkillBundle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(input?: { cursor?: string; limit?: number; }): Promise&lt;SkillRegistryPage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(skillId: string, version: string): Promise&lt;SignedSkillRegistryEntry&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verifyOfflineBundle` | 方法 | <code>verifyOfflineBundle(bundle: VerifiedSkillBundle): VerifiedSkillBundle</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HttpsSkillRegistryClientOptions`

Https Skill Registry Client Options 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HttpsSkillRegistryClientOptions } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactOrigins` | 属性 | <code>artifactOrigins?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorization` | 方法 | <code>authorization?(): string &#124; Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBundleBytes` | 属性 | <code>maxBundleBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMetadataBytes` | 属性 | <code>maxMetadataBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publisherKeys` | 属性 | <code>publisherKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sleep` | 方法 | <code>sleep?(ms: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transparencyLogKeys` | 属性 | <code>transparencyLogKeys: Readonly&lt;Record&lt;string, string&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SignedSkillRegistryEntry`

Signed Skill Registry Entry 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SignedSkillRegistryEntry } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface SignedSkillRegistryEntry {
    manifest: SkillSupplyChainManifest;
    publisherSignature: string;
    transparency: SkillTransparencyProof;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manifest` | 属性 | <code>manifest: SkillSupplyChainManifest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publisherSignature` | 属性 | <code>publisherSignature: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transparency` | 属性 | <code>transparency: SkillTransparencyProof</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillDependencyLock`

Skill Dependency Lock 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillDependencyLock } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface SkillDependencyLock {
    id: string;
    version: string;
    contentSha256: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentSha256` | 属性 | <code>contentSha256: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillRegistryPage`

Skill Registry Page 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillRegistryPage } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface SkillRegistryPage {
    entries: SignedSkillRegistryEntry[];
    nextCursor?: string;
    revision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: SignedSkillRegistryEntry[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSbomRef`

Skill Sbom Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSbomRef } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface SkillSbomRef {
    format: 'cyclonedx-json' | 'spdx-json';
    sha256: string;
    url?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `format` | 属性 | <code>format: "cyclonedx-json" &#124; "spdx-json"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sha256` | 属性 | <code>sha256: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSupplyChainManifest`

Skill Supply Chain Manifest 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSupplyChainManifest } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentSha256` | 属性 | <code>contentSha256: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencies` | 属性 | <code>dependencies: SkillDependencyLock[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `downloadUrl` | 属性 | <code>downloadUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publisherId` | 属性 | <code>publisherId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sbom` | 属性 | <code>sbom: SkillSbomRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillId` | 属性 | <code>skillId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantIds` | 属性 | <code>tenantIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillTransparencyProof`

Skill Transparency Proof 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillTransparencyProof } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface SkillTransparencyProof {
    logId: string;
    logIndex: number;
    entryHash: string;
    checkpointHash: string;
    signature: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entryHash` | 属性 | <code>entryHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logId` | 属性 | <code>logId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logIndex` | 属性 | <code>logIndex: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signature` | 属性 | <code>signature: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VerifiedSkillBundle`

Verified Skill Bundle 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VerifiedSkillBundle } from '@codesoul-co/hypha-skills';`
- 源码模块: [`remote-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts)

### 声明

```text
export interface VerifiedSkillBundle {
    entry: SignedSkillRegistryEntry;
    content: Uint8Array;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entry` | 属性 | <code>entry: SignedSkillRegistryEntry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
