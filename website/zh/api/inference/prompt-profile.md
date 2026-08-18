# `@codesoul-co/hypha-inference` / `prompt-profile`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/prompt-profile.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PromptProfileRegistry` | 类 | <code>new PromptProfileRegistry(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref. |
| `PROMPT_PROFILE_SOURCES` | 常量 | <code>const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"]</code> | 由 `prompt-profile` 模块导出的 PROMPT PROFILE SOURCES 常量。 |
| `PROMPT_PROFILE_STATUSES` | 常量 | <code>const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"]</code> | 由 `prompt-profile` 模块导出的 PROMPT PROFILE STATUSES 常量。 |
| `promptProfileInputSchema` | 常量 | <code>const promptProfileInputSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; layers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["system", "developer", "domain", "skill", "mcp", "user"]&gt;; content: z.ZodString; priority: z.ZodOptional&lt;z.ZodNumber&gt;; trustLevel: z.ZodOptional&lt;z.ZodEnum&lt;["trusted", "reviewed", "untrusted"...</code> | prompt Profile Input 的运行时 Schema。 |
| `PromptProfile` | 接口 | <code>interface PromptProfile extends PromptProfileInput</code> | Prompt Profile 的字段契约；完整字段见下表。 |
| `PromptProfileArtifactPort` | 接口 | <code>interface PromptProfileArtifactPort</code> | Prompt Profile Artifact Port 的字段契约；完整字段见下表。 |
| `PromptProfileInput` | 接口 | <code>interface PromptProfileInput</code> | Prompt Profile Input 的字段契约；完整字段见下表。 |
| `PromptProfileLayer` | 接口 | <code>interface PromptProfileLayer</code> | Prompt Profile Layer 的字段契约；完整字段见下表。 |
| `PromptProfilePrincipal` | 接口 | <code>interface PromptProfilePrincipal</code> | Prompt Profile Principal 的字段契约；完整字段见下表。 |
| `PromptProfileRef` | 接口 | <code>interface PromptProfileRef</code> | Prompt Profile Ref 的字段契约；完整字段见下表。 |
| `PromptProfileRegistryOptions` | 接口 | <code>interface PromptProfileRegistryOptions</code> | Prompt Profile Registry Options 的字段契约；完整字段见下表。 |
| `PromptProfileResolution` | 接口 | <code>interface PromptProfileResolution</code> | Prompt Profile Resolution 的字段契约；完整字段见下表。 |
| `PromptProfileTraceSink` | 接口 | <code>interface PromptProfileTraceSink</code> | Prompt Profile Trace Sink 的字段契约；完整字段见下表。 |
| `PromptProfileSource` | 类型 | <code>type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number]</code> | Prompt Profile Source 的公共类型别名。 |
| `PromptProfileStatus` | 类型 | <code>type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number]</code> | Prompt Profile Status 的公共类型别名。 |

## `PromptProfileRegistry` 公开成员

Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; activatedBy: string; }): PromptProfile</code> | activate 的公开运行时操作。 |
| `clear` | 方法 | <code>clear(): void</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: PromptProfileInput): PromptProfile</code> | 创建 create。 |
| `deprecate` | 方法 | <code>deprecate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; deprecatedBy: string; }): PromptProfile</code> | deprecate 的公开运行时操作。 |
| `get` | 方法 | <code>get(ref: PromptProfileRef): PromptProfile &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(id?: string, version?: string): PromptProfile[]</code> | 列出 list。 |
| `resolve` | 方法 | <code>resolve(ref: PromptProfileRef, context: { variables: Record&lt;string, unknown&gt;; principal: PromptProfilePrincipal; maxInlineBytes?: number; policyRevision?: string; dependencySnapshotHash?: string; }): Promise&lt;PromptProfileResolution&gt;</code> | 解析 resolve。 |
| `restore` | 方法 | <code>restore(input: PromptProfile): PromptProfile</code> | restore 的公开运行时操作。 |
| `submitForReview` | 方法 | <code>submitForReview(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; reviewedBy: string; }): PromptProfile</code> | submit For Review 的公开运行时操作。 |

## `PromptProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activatedAt` | 属性 | <code>activatedAt: string</code> | activated At 字段。 |
| `activatedBy` | 属性 | <code>activatedBy: string</code> | activated By 字段。 |
| `agentIds` | 属性 | <code>agentIds: string[]</code> | agent Ids 字段。 |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt: string</code> | approval Expires At 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `dependencySnapshotHash` | 属性 | <code>dependencySnapshotHash: string</code> | dependency Snapshot Hash 字段。 |
| `deprecatedAt` | 属性 | <code>deprecatedAt: string</code> | deprecated At 字段。 |
| `deprecatedBy` | 属性 | <code>deprecatedBy: string</code> | deprecated By 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `domainIds` | 属性 | <code>domainIds: string[]</code> | domain Ids 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `layers` | 属性 | <code>layers: PromptProfileLayer[]</code> | layers 字段。 |
| `lifecycleRevision` | 属性 | <code>lifecycleRevision: number</code> | lifecycle Revision 字段。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes: number</code> | max Inline Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `reviewedAt` | 属性 | <code>reviewedAt: string</code> | reviewed At 字段。 |
| `reviewedBy` | 属性 | <code>reviewedBy: string</code> | reviewed By 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scope` | 属性 | <code>scope: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | scope 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: "draft" &#124; "active" &#124; "in_review" &#124; "deprecated"</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `variableNames` | 属性 | <code>variableNames: string[]</code> | variable Names 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PromptProfileArtifactPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(input: { profile: Pick&lt;PromptProfile, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;; bytes: Uint8Array; contentHash: string; mediaType: "application/json"; metadata: Record&lt;string, unknown&gt;; }): Promise&lt;{ artifactRef: string; contentHash: string; sizeBytes: number; }&gt;</code> | store 的公开运行时操作。 |

## `PromptProfileInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentIds` | 属性 | <code>agentIds: string[]</code> | agent Ids 字段。 |
| `approvalExpiresAt` | 属性 | <code>approvalExpiresAt: string</code> | approval Expires At 字段。 |
| `dependencySnapshotHash` | 属性 | <code>dependencySnapshotHash: string</code> | dependency Snapshot Hash 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `domainIds` | 属性 | <code>domainIds: string[]</code> | domain Ids 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `layers` | 属性 | <code>layers: PromptProfileLayer[]</code> | layers 字段。 |
| `maxInlineBytes` | 属性 | <code>maxInlineBytes: number</code> | max Inline Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scope` | 属性 | <code>scope: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | scope 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `variableNames` | 属性 | <code>variableNames: string[]</code> | variable Names 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PromptProfileLayer` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `source` | 属性 | <code>source: "skill" &#124; "domain" &#124; "mcp" &#124; "system" &#124; "user" &#124; "developer"</code> | source 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |

## `PromptProfilePrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `PromptProfileRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PromptProfileRegistryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: PromptProfileArtifactPort</code> | artifacts 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `trace` | 属性 | <code>trace: PromptProfileTraceSink</code> | trace 字段。 |

## `PromptProfileResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `cacheHit` | 属性 | <code>cacheHit: boolean</code> | cache Hit 字段。 |
| `messages` | 属性 | <code>messages: PromptMessage[]</code> | messages 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `profileRef` | 属性 | <code>profileRef: Required&lt;PromptProfileRef&gt;</code> | profile Ref 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `PromptProfileTraceSink` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: { type: "prompt.profile.resolved" &#124; "prompt.profile.cache_hit" &#124; "prompt.profile.externalized"; profileId: string; version: string; revision: number; contentHash: string; principalScopeHash: string; sizeBytes: number; timestamp: string; }): Promise&lt;void&gt; &#124; void</code> | 记录 record。 |
