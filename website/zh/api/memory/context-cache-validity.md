# `@codesoul-co/hypha-memory` / `context-cache-validity`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-cache-validity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryContextEnvelopeCacheStore` | 类 | <code>new InMemoryContextEnvelopeCacheStore(): InMemoryContextEnvelopeCacheStore</code> | In Memory Context Envelope Cache Store 的运行时实现；公开构造函数与成员见下表。 |
| `VersionValidContextCache` | 类 | <code>new VersionValidContextCache(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Version Valid Context Cache 的运行时实现；公开构造函数与成员见下表。 |
| `createContextCacheValidityHash` | 函数 | <code>createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string</code> | 创建 Context Cache Validity Hash。 |
| `ContextCacheVersionSnapshot` | 接口 | <code>interface ContextCacheVersionSnapshot</code> | Context Cache Version Snapshot 的字段契约；完整字段见下表。 |
| `ContextEnvelopeCacheStore` | 接口 | <code>interface ContextEnvelopeCacheStore</code> | Context Envelope Cache Store 的字段契约；完整字段见下表。 |
| `VersionValidContextCacheOptions` | 接口 | <code>interface VersionValidContextCacheOptions</code> | Version Valid Context Cache Options 的字段契约；完整字段见下表。 |
| `VersionValidContextCacheRecord` | 接口 | <code>interface VersionValidContextCacheRecord</code> | Version Valid Context Cache Record 的字段契约；完整字段见下表。 |

## `InMemoryContextEnvelopeCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryContextEnvelopeCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `VersionValidContextCache` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(key: string, current: ContextCacheVersionSnapshot): Promise&lt;ContextEnvelope &#124; null&gt;</code> | 读取 get。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise&lt;void&gt;</code> | 写入 set。 |

## `ContextCacheVersionSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactHashes` | 属性 | <code>artifactHashes: Record&lt;string, string&gt;</code> | artifact Hashes 字段。 |
| `contextProfileRevision` | 属性 | <code>contextProfileRevision: string</code> | context Profile Revision 字段。 |
| `memoryProfileRevision` | 属性 | <code>memoryProfileRevision: string</code> | memory Profile Revision 字段。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | mutation Generation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `selectedMemoryVersionIds` | 属性 | <code>selectedMemoryVersionIds: string[]</code> | selected Memory Version Ids 字段。 |
| `sourceHashes` | 属性 | <code>sourceHashes: Record&lt;string, string&gt;</code> | source Hashes 字段。 |

## `ContextEnvelopeCacheStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `VersionValidContextCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStore` | 属性 | <code>artifactStore: ContextArtifactStore</code> | artifact Store 字段。 |
| `generations` | 属性 | <code>generations: MemoryMutationGenerationStore</code> | generations 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projectionId` | 属性 | <code>projectionId: string</code> | projection Id 字段。 |
| `store` | 属性 | <code>store: ContextEnvelopeCacheStore</code> | store 字段。 |

## `VersionValidContextCacheRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | envelope 字段。 |
| `envelopeHash` | 属性 | <code>envelopeHash: string</code> | envelope Hash 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `snapshot` | 属性 | <code>snapshot: ContextCacheVersionSnapshot</code> | snapshot 字段。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | validity Hash 字段。 |
