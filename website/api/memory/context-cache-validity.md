# `@codesoul-co/hypha-memory` / `context-cache-validity`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-cache-validity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryContextEnvelopeCacheStore` | class | <code>new InMemoryContextEnvelopeCacheStore(): InMemoryContextEnvelopeCacheStore</code> | Runtime implementation for In Memory Context Envelope Cache Store; see its public constructor and members below. |
| `VersionValidContextCache` | class | <code>new VersionValidContextCache(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Runtime implementation for Version Valid Context Cache; see its public constructor and members below. |
| `createContextCacheValidityHash` | function | <code>createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string</code> | Creates Context Cache Validity Hash at this module boundary. |
| `ContextCacheVersionSnapshot` | interface | <code>interface ContextCacheVersionSnapshot</code> | Field contract for Context Cache Version Snapshot; see all contract members below. |
| `ContextEnvelopeCacheStore` | interface | <code>interface ContextEnvelopeCacheStore</code> | Field contract for Context Envelope Cache Store; see all contract members below. |
| `VersionValidContextCacheOptions` | interface | <code>interface VersionValidContextCacheOptions</code> | Field contract for Version Valid Context Cache Options; see all contract members below. |
| `VersionValidContextCacheRecord` | interface | <code>interface VersionValidContextCacheRecord</code> | Field contract for Version Valid Context Cache Record; see all contract members below. |

## `InMemoryContextEnvelopeCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryContextEnvelopeCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `VersionValidContextCache` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Creates an instance of this class. |
| `get` | method | <code>get(key: string, current: ContextCacheVersionSnapshot): Promise&lt;ContextEnvelope &#124; null&gt;</code> | Gets get at this module boundary. |
| `id` | property | <code>id: string</code> | Public id property. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ContextCacheVersionSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactHashes` | property | <code>artifactHashes: Record&lt;string, string&gt;</code> | Public artifact Hashes property. |
| `contextProfileRevision` | property | <code>contextProfileRevision: string</code> | Public context Profile Revision property. |
| `memoryProfileRevision` | property | <code>memoryProfileRevision: string</code> | Public memory Profile Revision property. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public mutation Generation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `selectedMemoryVersionIds` | property | <code>selectedMemoryVersionIds: string[]</code> | Public selected Memory Version Ids property. |
| `sourceHashes` | property | <code>sourceHashes: Record&lt;string, string&gt;</code> | Public source Hashes property. |

## `ContextEnvelopeCacheStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `VersionValidContextCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStore` | property | <code>artifactStore: ContextArtifactStore</code> | Public artifact Store property. |
| `generations` | property | <code>generations: MemoryMutationGenerationStore</code> | Public generations property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `projectionId` | property | <code>projectionId: string</code> | Public projection Id property. |
| `store` | property | <code>store: ContextEnvelopeCacheStore</code> | Public store property. |

## `VersionValidContextCacheRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public envelope property. |
| `envelopeHash` | property | <code>envelopeHash: string</code> | Public envelope Hash property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `snapshot` | property | <code>snapshot: ContextCacheVersionSnapshot</code> | Public snapshot property. |
| `validityHash` | property | <code>validityHash: string</code> | Public validity Hash property. |
