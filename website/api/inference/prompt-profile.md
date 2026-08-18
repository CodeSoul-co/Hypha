# `@codesoul-co/hypha-inference` / `prompt-profile`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/prompt-profile.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)
- Exports: **15**

## Using this module

Use the Prompt profile module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 constants, 9 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { promptProfileInputSchema } from '@codesoul-co/hypha-inference';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = promptProfileInputSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PromptProfileRegistry` | class | <code>new PromptProfileRegistry(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref. |
| `PROMPT_PROFILE_SOURCES` | constant | <code>const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"]</code> | PROMPT PROFILE SOURCES constant exported by the `prompt-profile` module. |
| `PROMPT_PROFILE_STATUSES` | constant | <code>const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"]</code> | PROMPT PROFILE STATUSES constant exported by the `prompt-profile` module. |
| `promptProfileInputSchema` | constant | <code>const promptProfileInputSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; layers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["system", "developer", "domain", "skill", "mcp", "user"]&gt;; content: z.ZodString; priority: z.ZodOptional&lt;z.ZodNumber&gt;; trustLevel: z.ZodOptional&lt;z.ZodEnum&lt;["trusted", "reviewed", "untrusted"...</code> | Runtime schema for Prompt Profile Input. |
| `PromptProfile` | interface | <code>interface PromptProfile extends PromptProfileInput</code> | Prompt Profile interface with 31 public fields or methods. |
| `PromptProfileArtifactPort` | interface | <code>interface PromptProfileArtifactPort</code> | Prompt Profile Artifact Port interface with 1 public fields or methods. |
| `PromptProfileInput` | interface | <code>interface PromptProfileInput</code> | Prompt Profile Input interface with 19 public fields or methods. |
| `PromptProfileLayer` | interface | <code>interface PromptProfileLayer</code> | Prompt Profile Layer interface with 7 public fields or methods. |
| `PromptProfilePrincipal` | interface | <code>interface PromptProfilePrincipal</code> | Prompt Profile Principal interface with 7 public fields or methods. |
| `PromptProfileRef` | interface | <code>interface PromptProfileRef</code> | Prompt Profile Ref interface with 3 public fields or methods. |
| `PromptProfileRegistryOptions` | interface | <code>interface PromptProfileRegistryOptions</code> | Prompt Profile Registry Options interface with 3 public fields or methods. |
| `PromptProfileResolution` | interface | <code>interface PromptProfileResolution</code> | Prompt Profile Resolution interface with 6 public fields or methods. |
| `PromptProfileTraceSink` | interface | <code>interface PromptProfileTraceSink</code> | Prompt Profile Trace Sink interface with 1 public fields or methods. |
| `PromptProfileSource` | type | <code>type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number]</code> | Public type alias for Prompt Profile Source; the declaration contains its complete type expression. |
| `PromptProfileStatus` | type | <code>type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number]</code> | Public type alias for Prompt Profile Status; the declaration contains its complete type expression. |

## `PromptProfileRegistry`

Immutable Prompt Profile revisions plus a CAS-protected publication lifecycle. Active revisions are never overwritten, so a Run can safely keep an exact ref.

- Kind: class
- Import: `import { PromptProfileRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; activatedBy: string; }): PromptProfile</code> | Public method; parameters and return type are shown in the signature. |
| `clear` | method | <code>clear(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: PromptProfileRegistryOptions): PromptProfileRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: PromptProfileInput): PromptProfile</code> | Public method; parameters and return type are shown in the signature. |
| `deprecate` | method | <code>deprecate(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; deprecatedBy: string; }): PromptProfile</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(ref: PromptProfileRef): PromptProfile &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(id?: string, version?: string): PromptProfile[]</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(ref: PromptProfileRef, context: { variables: Record&lt;string, unknown&gt;; principal: PromptProfilePrincipal; maxInlineBytes?: number; policyRevision?: string; dependencySnapshotHash?: string; }): Promise&lt;PromptProfileResolution&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `restore` | method | <code>restore(input: PromptProfile): PromptProfile</code> | Public method; parameters and return type are shown in the signature. |
| `submitForReview` | method | <code>submitForReview(ref: Required&lt;PromptProfileRef&gt;, input: { expectedLifecycleRevision: number; reviewedBy: string; }): PromptProfile</code> | Public method; parameters and return type are shown in the signature. |

## `PROMPT_PROFILE_SOURCES`

PROMPT PROFILE SOURCES constant exported by the `prompt-profile` module.

- Kind: constant
- Import: `import { PROMPT_PROFILE_SOURCES } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export declare const PROMPT_PROFILE_SOURCES: readonly ["system", "developer", "domain", "skill", "mcp", "user"];
```

## `PROMPT_PROFILE_STATUSES`

PROMPT PROFILE STATUSES constant exported by the `prompt-profile` module.

- Kind: constant
- Import: `import { PROMPT_PROFILE_STATUSES } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export declare const PROMPT_PROFILE_STATUSES: readonly ["draft", "in_review", "active", "deprecated"];
```

## `promptProfileInputSchema`

Runtime schema for Prompt Profile Input.

- Kind: constant
- Import: `import { promptProfileInputSchema } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const promptProfileInputSchema: (typeof import('@codesoul-co/hypha-inference'))['promptProfileInputSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `PromptProfile`

Prompt Profile interface with 31 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfile } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activatedAt` | property | <code>activatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activatedBy` | property | <code>activatedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentIds` | property | <code>agentIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvalExpiresAt` | property | <code>approvalExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshotHash` | property | <code>dependencySnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deprecatedAt` | property | <code>deprecatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deprecatedBy` | property | <code>deprecatedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainIds` | property | <code>domainIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `layers` | property | <code>layers: PromptProfileLayer[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lifecycleRevision` | property | <code>lifecycleRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInlineBytes` | property | <code>maxInlineBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reviewedAt` | property | <code>reviewedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reviewedBy` | property | <code>reviewedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "draft" &#124; "active" &#124; "in_review" &#124; "deprecated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variableNames` | property | <code>variableNames?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileArtifactPort`

Prompt Profile Artifact Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileArtifactPort } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(input: { profile: Pick&lt;PromptProfile, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;; bytes: Uint8Array; contentHash: string; mediaType: "application/json"; metadata: Record&lt;string, unknown&gt;; }): Promise&lt;{ artifactRef: string; contentHash: string; sizeBytes: number; }&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PromptProfileInput`

Prompt Profile Input interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileInput } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentIds` | property | <code>agentIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvalExpiresAt` | property | <code>approvalExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshotHash` | property | <code>dependencySnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainIds` | property | <code>domainIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `layers` | property | <code>layers: PromptProfileLayer[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInlineBytes` | property | <code>maxInlineBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: "domain" &#124; "session" &#124; "run" &#124; "agent" &#124; "user" &#124; "tenant" &#124; "owner" &#124; "global"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variableNames` | property | <code>variableNames?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileLayer`

Prompt Profile Layer interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileLayer } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "skill" &#124; "domain" &#124; "mcp" &#124; "system" &#124; "user" &#124; "developer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfilePrincipal`

Prompt Profile Principal interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfilePrincipal } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileRef`

Prompt Profile Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileRef } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export interface PromptProfileRef {
    id: string;
    version?: string;
    revision?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileRegistryOptions`

Prompt Profile Registry Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileRegistryOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export interface PromptProfileRegistryOptions {
    now?: () => string;
    artifacts?: PromptProfileArtifactPort;
    trace?: PromptProfileTraceSink;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts?: PromptProfileArtifactPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `trace` | property | <code>trace?: PromptProfileTraceSink</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileResolution`

Prompt Profile Resolution interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileResolution } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheHit` | property | <code>cacheHit: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: PromptMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: Required&lt;PromptProfileRef&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptProfileTraceSink`

Prompt Profile Trace Sink interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PromptProfileTraceSink } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: { type: "prompt.profile.resolved" &#124; "prompt.profile.cache_hit" &#124; "prompt.profile.externalized"; profileId: string; version: string; revision: number; contentHash: string; principalScopeHash: string; sizeBytes: number; timestamp: string; }): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |

## `PromptProfileSource`

Public type alias for Prompt Profile Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PromptProfileSource } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export type PromptProfileSource = (typeof PROMPT_PROFILE_SOURCES)[number];
```

## `PromptProfileStatus`

Public type alias for Prompt Profile Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PromptProfileStatus } from '@codesoul-co/hypha-inference';`
- Source module: [`prompt-profile`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts)

### Declaration

```text
export type PromptProfileStatus = (typeof PROMPT_PROFILE_STATUSES)[number];
```
