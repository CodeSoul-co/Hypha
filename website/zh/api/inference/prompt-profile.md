# `@codesoul-co/hypha-inference` / `prompt-profile`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/prompt-profile.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)
- 导出数: **15**

## 模块用法

用于使用该功能边界的公共契约与操作。Prompt profile 模块公开 1 类、3 常量、9 接口、2 类型。

### 从包入口导入

```ts
import {
  PromptProfileRegistry,
  PROMPT_PROFILE_SOURCES,
  PROMPT_PROFILE_STATUSES,
  promptProfileInputSchema,
} from '@codesoul-co/hypha-inference';

import type {
  PromptProfile,
  PromptProfileArtifactPort,
  PromptProfileInput,
  PromptProfileLayer,
  PromptProfilePrincipal,
  PromptProfileRef,
  PromptProfileRegistryOptions,
  PromptProfileResolution,
} from '@codesoul-co/hypha-inference';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { promptProfileInputSchema } from '@codesoul-co/hypha-inference';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = promptProfileInputSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PromptProfileRegistry` | 类 | <code>new PromptProfileRegistry(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref. |
| `PROMPT_PROFILE_SOURCES` | 常量 | <code>const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"]</code> | 由 `prompt-profile` 模块导出的 PROMPT PROFILE SOURCES 常量。 |
| `PROMPT_PROFILE_STATUSES` | 常量 | <code>const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"]</code> | 由 `prompt-profile` 模块导出的 PROMPT PROFILE STATUSES 常量。 |
| `promptProfileInputSchema` | 常量 | <code>const promptProfileInputSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; layers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["system", "developer", "domain", "skill", "mcp", "user"]&gt;; content: z.ZodString; priority: z.ZodOptional&lt;z.ZodNumber&gt;; trustLevel: z.ZodOptional&lt;z.ZodEnum&lt;["trusted", "reviewed", "untrusted"...</code> | Prompt Profile Input 的运行时 Schema。 |
| `PromptProfile` | 接口 | <code>interface PromptProfile extends PromptProfileInput</code> | Prompt Profile 接口，共包含 31 个公开字段或方法。 |
| `PromptProfileArtifactPort` | 接口 | <code>interface PromptProfileArtifactPort</code> | Prompt Profile Artifact Port 接口，共包含 1 个公开字段或方法。 |
| `PromptProfileInput` | 接口 | <code>interface PromptProfileInput</code> | Prompt Profile Input 接口，共包含 19 个公开字段或方法。 |
| `PromptProfileLayer` | 接口 | <code>interface PromptProfileLayer</code> | Prompt Profile Layer 接口，共包含 7 个公开字段或方法。 |
| `PromptProfilePrincipal` | 接口 | <code>interface PromptProfilePrincipal</code> | Prompt Profile Principal 接口，共包含 7 个公开字段或方法。 |
| `PromptProfileRef` | 接口 | <code>interface PromptProfileRef</code> | Prompt Profile Ref 接口，共包含 3 个公开字段或方法。 |
| `PromptProfileRegistryOptions` | 接口 | <code>interface PromptProfileRegistryOptions</code> | Prompt Profile Registry Options 接口，共包含 3 个公开字段或方法。 |
| `PromptProfileResolution` | 接口 | <code>interface PromptProfileResolution</code> | Prompt Profile Resolution 接口，共包含 6 个公开字段或方法。 |
| `PromptProfileTraceSink` | 接口 | <code>interface PromptProfileTraceSink</code> | Prompt Profile Trace Sink 接口，共包含 1 个公开字段或方法。 |
| `PromptProfileSource` | 类型 | <code>type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number]</code> | Prompt Profile Source 公共类型别名；完整类型表达式见声明。 |
| `PromptProfileStatus` | 类型 | <code>type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number]</code> | Prompt Profile Status 公共类型别名；完整类型表达式见声明。 |

## `PromptProfileRegistry`

Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref.

- 种类: 类
- 导入: `import { PromptProfileRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export declare class PromptProfileRegistry {
    constructor(options?: PromptProfileRegistryOptions);
    create(input: PromptProfileInput): PromptProfile;
    restore(input: PromptProfile): PromptProfile;
    submitForReview(ref: Required<PromptProfileRef>, input: {
            expectedLifecycleRevision: number;
            reviewedBy: string;
        }): PromptProfile;
    activate(ref: Required<PromptProfileRef>, input: {
            expectedLifecycleRevision: number;
            activatedBy: string;
        }): PromptProfile;
    deprecate(ref: Required<PromptProfileRef>, input: {
            expectedLifecycleRevision: number;
            deprecatedBy: string;
        }): PromptProfile;
    get(ref: PromptProfileRef): PromptProfile | null;
    list(id?: string, version?: string): PromptProfile[];
    clear(): void;
    resolve(ref: PromptProfileRef, context: {
            variables: Record<string, unknown>;
            principal: PromptProfilePrincipal;
            maxInlineBytes?: number;
            policyRevision?: string;
            dependencySnapshotHash?: string;
        }): Promise<PromptProfileResolution>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; activatedBy: string; }): PromptProfile</code> | 公开方法；参数与返回类型以签名列为准。 |
| `clear` | 方法 | <code>clear(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: PromptProfileInput): PromptProfile</code> | 公开方法；参数与返回类型以签名列为准。 |
| `deprecate` | 方法 | <code>deprecate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; deprecatedBy: string; }): PromptProfile</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(ref: PromptProfileRef): PromptProfile &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(id?: string, version?: string): PromptProfile[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(ref: PromptProfileRef, context: { variables: Record&lt;string, unknown&gt;; principal: PromptProfilePrincipal; maxInlineBytes?: number; policyRevision?: string; dependencySnapshotHash?: string; }): Promise&lt;PromptProfileResolution&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `restore` | 方法 | <code>restore(input: PromptProfile): PromptProfile</code> | 公开方法；参数与返回类型以签名列为准。 |
| `submitForReview` | 方法 | <code>submitForReview(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; reviewedBy: string; }): PromptProfile</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PROMPT_PROFILE_SOURCES`

由 `prompt-profile` 模块导出的 PROMPT PROFILE SOURCES 常量。

- 种类: 常量
- 导入: `import { PROMPT_PROFILE_SOURCES } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export declare const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"];
```

## `PROMPT_PROFILE_STATUSES`

由 `prompt-profile` 模块导出的 PROMPT PROFILE STATUSES 常量。

- 种类: 常量
- 导入: `import { PROMPT_PROFILE_STATUSES } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export declare const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"];
```

## `promptProfileInputSchema`

Prompt Profile Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { promptProfileInputSchema } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const promptProfileInputSchema: (typeof import('@codesoul-co/hypha-inference'))['promptProfileInputSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `PromptProfile`

Prompt Profile 接口，共包含 31 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfile } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfile extends PromptProfileInput {
    revision: number;
    lifecycleRevision: number;
    status: PromptProfileStatus;
    contentHash: string;
    createdAt: string;
    updatedAt: string;
    reviewedBy?: string;
    reviewedAt?: string;
    activatedBy?: string;
    activatedAt?: string;
    deprecatedBy?: string;
    deprecatedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activatedAt` | 属性 | <code>activatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activatedBy` | 属性 | <code>activatedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentIds` | 属性 | <code>agentIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshotHash` | 属性 | <code>dependencySnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deprecatedAt` | 属性 | <code>deprecatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deprecatedBy` | 属性 | <code>deprecatedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainIds` | 属性 | <code>domainIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `layers` | 属性 | <code>layers: PromptProfileLayer[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lifecycleRevision` | 属性 | <code>lifecycleRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reviewedAt` | 属性 | <code>reviewedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reviewedBy` | 属性 | <code>reviewedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "draft" &#124; "active" &#124; "in_review" &#124; "deprecated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variableNames` | 属性 | <code>variableNames?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileArtifactPort`

Prompt Profile Artifact Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileArtifactPort } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileArtifactPort {
    store(input: {
        profile: Pick<PromptProfile, 'id' | 'version' | 'revision' | 'contentHash'>;
        bytes: Uint8Array;
        contentHash: string;
        mediaType: 'application/json';
        metadata: Record<string, unknown>;
    }): Promise<{
        artifactRef: string;
        contentHash: string;
        sizeBytes: number;
    }>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(input: { profile: Pick&lt;PromptProfile, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;; bytes: Uint8Array; contentHash: string; mediaType: "application/json"; metadata: Record&lt;string, unknown&gt;; }): Promise&lt;{ artifactRef: string; contentHash: string; sizeBytes: number; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PromptProfileInput`

Prompt Profile Input 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileInput {
    id: string;
    version: string;
    name: string;
    description?: string;
    layers: PromptProfileLayer[];
    variableNames?: string[];
    scope?: 'global' | 'tenant' | 'owner' | 'user' | 'agent' | 'domain' | 'session' | 'run';
    tenantId?: string;
    ownerId?: string;
    userId?: string;
    sessionId?: string;
    runId?: string;
    agentIds?: string[];
    domainIds?: string[];
    policyRevision?: string;
    dependencySnapshotHash?: string;
    approvalExpiresAt?: string;
    maxInlineBytes?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentIds` | 属性 | <code>agentIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshotHash` | 属性 | <code>dependencySnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainIds` | 属性 | <code>domainIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `layers` | 属性 | <code>layers: PromptProfileLayer[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variableNames` | 属性 | <code>variableNames?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileLayer`

Prompt Profile Layer 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileLayer } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileLayer {
    id: string;
    source: PromptProfileSource;
    content: string;
    priority?: number;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    provenance?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "skill" &#124; "domain" &#124; "mcp" &#124; "system" &#124; "user" &#124; "developer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfilePrincipal`

Prompt Profile Principal 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfilePrincipal } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfilePrincipal {
    principalId: string;
    tenantId?: string;
    userId?: string;
    agentId?: string;
    domainId?: string;
    sessionId?: string;
    runId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileRef`

Prompt Profile Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileRef } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileRef {
    id: string;
    version?: string;
    revision?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileRegistryOptions`

Prompt Profile Registry Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileRegistryOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileRegistryOptions {
    now?: () => string;
    artifacts?: PromptProfileArtifactPort;
    trace?: PromptProfileTraceSink;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts?: PromptProfileArtifactPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `trace` | 属性 | <code>trace?: PromptProfileTraceSink</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileResolution`

Prompt Profile Resolution 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileResolution } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileResolution {
    profileRef: Required<PromptProfileRef>;
    profileHash: string;
    messages: PromptMessage[];
    sizeBytes: number;
    cacheHit: boolean;
    artifactRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheHit` | 属性 | <code>cacheHit: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: PromptMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: Required&lt;PromptProfileRef&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptProfileTraceSink`

Prompt Profile Trace Sink 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptProfileTraceSink } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export interface PromptProfileTraceSink {
    record(event: {
        type: 'prompt.profile.resolved' | 'prompt.profile.cache_hit' | 'prompt.profile.externalized';
        profileId: string;
        version: string;
        revision: number;
        contentHash: string;
        principalScopeHash: string;
        sizeBytes: number;
        timestamp: string;
    }): Promise<void> | void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: { type: "prompt.profile.resolved" &#124; "prompt.profile.cache_hit" &#124; "prompt.profile.externalized"; profileId: string; version: string; revision: number; contentHash: string; principalScopeHash: string; sizeBytes: number; timestamp: string; }): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PromptProfileSource`

Prompt Profile Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PromptProfileSource } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number];
```

## `PromptProfileStatus`

Prompt Profile Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PromptProfileStatus } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### 声明

```text
export type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number];
```
