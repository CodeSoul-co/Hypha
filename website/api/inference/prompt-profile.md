# `@codesoul-co/hypha-inference` / `prompt-profile`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/prompt-profile.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)
- Exports: **15**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PromptProfileRegistry` | class | <code>new PromptProfileRegistry(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref. |
| `PROMPT_PROFILE_SOURCES` | constant | <code>const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"]</code> | PROMPT PROFILE SOURCES constant exported by the `prompt-profile` module. |
| `PROMPT_PROFILE_STATUSES` | constant | <code>const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"]</code> | PROMPT PROFILE STATUSES constant exported by the `prompt-profile` module. |
| `promptProfileInputSchema` | constant | <code>const promptProfileInputSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; layers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["system", "developer", "domain", "skill", "mcp", "user"]&gt;; content: z.ZodString; priority: z.ZodOptional&lt;z.ZodNumber&gt;; trustLevel: z.ZodOptional&lt;z.ZodEnum&lt;["trusted", "reviewed", "untrusted"...</code> | Runtime schema for prompt Profile Input. |
| `PromptProfile` | interface | <code>interface PromptProfile extends PromptProfileInput</code> | Field contract for Prompt Profile; see all contract members below. |
| `PromptProfileArtifactPort` | interface | <code>interface PromptProfileArtifactPort</code> | Field contract for Prompt Profile Artifact Port; see all contract members below. |
| `PromptProfileInput` | interface | <code>interface PromptProfileInput</code> | Field contract for Prompt Profile Input; see all contract members below. |
| `PromptProfileLayer` | interface | <code>interface PromptProfileLayer</code> | Field contract for Prompt Profile Layer; see all contract members below. |
| `PromptProfilePrincipal` | interface | <code>interface PromptProfilePrincipal</code> | Field contract for Prompt Profile Principal; see all contract members below. |
| `PromptProfileRef` | interface | <code>interface PromptProfileRef</code> | Field contract for Prompt Profile Ref; see all contract members below. |
| `PromptProfileRegistryOptions` | interface | <code>interface PromptProfileRegistryOptions</code> | Field contract for Prompt Profile Registry Options; see all contract members below. |
| `PromptProfileResolution` | interface | <code>interface PromptProfileResolution</code> | Field contract for Prompt Profile Resolution; see all contract members below. |
| `PromptProfileTraceSink` | interface | <code>interface PromptProfileTraceSink</code> | Field contract for Prompt Profile Trace Sink; see all contract members below. |
| `PromptProfileSource` | type | <code>type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number]</code> | Public type alias for Prompt Profile Source. |
| `PromptProfileStatus` | type | <code>type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number]</code> | Public type alias for Prompt Profile Status. |

## `PromptProfileRegistry` public members

Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; activatedBy: string; }): PromptProfile</code> | Public runtime operation for activate. |
| `clear` | method | <code>clear(): void</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: PromptProfileInput): PromptProfile</code> | Creates create at this module boundary. |
| `deprecate` | method | <code>deprecate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; deprecatedBy: string; }): PromptProfile</code> | Public runtime operation for deprecate. |
| `get` | method | <code>get(ref: PromptProfileRef): PromptProfile &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(id?: string, version?: string): PromptProfile[]</code> | Lists list at this module boundary. |
| `resolve` | method | <code>resolve(ref: PromptProfileRef, context: { variables: Record&lt;string, unknown&gt;; principal: PromptProfilePrincipal; maxInlineBytes?: number; policyRevision?: string; dependencySnapshotHash?: string; }): Promise&lt;PromptProfileResolution&gt;</code> | Resolves resolve at this module boundary. |
| `restore` | method | <code>restore(input: PromptProfile): PromptProfile</code> | Public runtime operation for restore. |
| `submitForReview` | method | <code>submitForReview(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; reviewedBy: string; }): PromptProfile</code> | Public runtime operation for submit For Review. |

## `PromptProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activatedAt` | property | <code>activatedAt: string</code> | Public activated At property. |
| `activatedBy` | property | <code>activatedBy: string</code> | Public activated By property. |
| `agentIds` | property | <code>agentIds: string[]</code> | Public agent Ids property. |
| `approvalExpiresAt` | property | <code>approvalExpiresAt: string</code> | Public approval Expires At property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `dependencySnapshotHash` | property | <code>dependencySnapshotHash: string</code> | Public dependency Snapshot Hash property. |
| `deprecatedAt` | property | <code>deprecatedAt: string</code> | Public deprecated At property. |
| `deprecatedBy` | property | <code>deprecatedBy: string</code> | Public deprecated By property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `domainIds` | property | <code>domainIds: string[]</code> | Public domain Ids property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `layers` | property | <code>layers: PromptProfileLayer[]</code> | Public layers property. |
| `lifecycleRevision` | property | <code>lifecycleRevision: number</code> | Public lifecycle Revision property. |
| `maxInlineBytes` | property | <code>maxInlineBytes: number</code> | Public max Inline Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `reviewedAt` | property | <code>reviewedAt: string</code> | Public reviewed At property. |
| `reviewedBy` | property | <code>reviewedBy: string</code> | Public reviewed By property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scope` | property | <code>scope: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | Public scope property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: "draft" &#124; "active" &#124; "in_review" &#124; "deprecated"</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `variableNames` | property | <code>variableNames: string[]</code> | Public variable Names property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PromptProfileArtifactPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(input: { profile: Pick&lt;PromptProfile, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;; bytes: Uint8Array; contentHash: string; mediaType: "application/json"; metadata: Record&lt;string, unknown&gt;; }): Promise&lt;{ artifactRef: string; contentHash: string; sizeBytes: number; }&gt;</code> | Public runtime operation for store. |

## `PromptProfileInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentIds` | property | <code>agentIds: string[]</code> | Public agent Ids property. |
| `approvalExpiresAt` | property | <code>approvalExpiresAt: string</code> | Public approval Expires At property. |
| `dependencySnapshotHash` | property | <code>dependencySnapshotHash: string</code> | Public dependency Snapshot Hash property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `domainIds` | property | <code>domainIds: string[]</code> | Public domain Ids property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `layers` | property | <code>layers: PromptProfileLayer[]</code> | Public layers property. |
| `maxInlineBytes` | property | <code>maxInlineBytes: number</code> | Public max Inline Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scope` | property | <code>scope: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | Public scope property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `variableNames` | property | <code>variableNames: string[]</code> | Public variable Names property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PromptProfileLayer` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `source` | property | <code>source: "skill" &#124; "domain" &#124; "mcp" &#124; "system" &#124; "user" &#124; "developer"</code> | Public source property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |

## `PromptProfilePrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `PromptProfileRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PromptProfileRegistryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: PromptProfileArtifactPort</code> | Public artifacts property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `trace` | property | <code>trace: PromptProfileTraceSink</code> | Public trace property. |

## `PromptProfileResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `cacheHit` | property | <code>cacheHit: boolean</code> | Public cache Hit property. |
| `messages` | property | <code>messages: PromptMessage[]</code> | Public messages property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `profileRef` | property | <code>profileRef: Required&lt;PromptProfileRef&gt;</code> | Public profile Ref property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `PromptProfileTraceSink` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: { type: "prompt.profile.resolved" &#124; "prompt.profile.cache_hit" &#124; "prompt.profile.externalized"; profileId: string; version: string; revision: number; contentHash: string; principalScopeHash: string; sizeBytes: number; timestamp: string; }): Promise&lt;void&gt; &#124; void</code> | Records record at this module boundary. |
