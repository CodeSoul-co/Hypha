# `@codesoul-co/hypha-memory` / `context-artifacts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryContextArtifactStore` | 类 | <code>new InMemoryContextArtifactStore(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | In Memory Context Artifact Store 的运行时实现；公开构造函数与成员见下表。 |
| `ProviderBackedContextArtifactStore` | 类 | <code>new ProviderBackedContextArtifactStore(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Provider Backed Context Artifact Store 的运行时实现；公开构造函数与成员见下表。 |
| `contextArtifactContentHash` | 函数 | <code>contextArtifactContentHash(content: string): string</code> | context Artifact Content Hash 的公开运行时操作。 |
| `validateContextArtifactReference` | 函数 | <code>validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void</code> | 校验 Context Artifact Reference。 |
| `ContextArtifactReadExpectation` | 接口 | <code>interface ContextArtifactReadExpectation</code> | Context Artifact Read Expectation 的字段契约；完整字段见下表。 |
| `ContextArtifactRecord` | 接口 | <code>interface ContextArtifactRecord</code> | Context Artifact Record 的字段契约；完整字段见下表。 |
| `ContextArtifactRef` | 接口 | <code>interface ContextArtifactRef</code> | Context Artifact Ref 的字段契约；完整字段见下表。 |
| `ContextArtifactStore` | 接口 | <code>interface ContextArtifactStore</code> | Context Artifact Store 的字段契约；完整字段见下表。 |
| `ContextArtifactWriteRequest` | 接口 | <code>interface ContextArtifactWriteRequest</code> | Context Artifact Write Request 的字段契约；完整字段见下表。 |
| `ProviderBackedContextArtifactStoreOptions` | 接口 | <code>interface ProviderBackedContextArtifactStoreOptions</code> | Provider Backed Context Artifact Store Options 的字段契约；完整字段见下表。 |
| `InMemoryContextArtifactBacking` | 类型 | <code>type InMemoryContextArtifactBacking = Map&lt;string, ContextArtifactRecord&gt;</code> | In Memory Context Artifact Backing 的公共类型别名。 |

## `InMemoryContextArtifactStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `durability` | 属性 | <code>durability: "ephemeral"</code> | durability 字段。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | put 的公开运行时操作。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | read 的公开运行时操作。 |

## `ProviderBackedContextArtifactStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `durability` | 属性 | <code>durability: "ephemeral" &#124; "durable"</code> | durability 字段。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | put 的公开运行时操作。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | read 的公开运行时操作。 |

## `ContextArtifactReadExpectation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |

## `ContextArtifactRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `reference` | 属性 | <code>reference: ContextArtifactRef</code> | reference 字段。 |

## `ContextArtifactRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `contentType` | 属性 | <code>contentType: "text/plain; charset=utf-8"</code> | content Type 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `sourceItemId` | 属性 | <code>sourceItemId: string</code> | source Item Id 字段。 |

## `ContextArtifactStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `durability` | 属性 | <code>durability: "ephemeral" &#124; "durable"</code> | durability 字段。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | put 的公开运行时操作。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | read 的公开运行时操作。 |

## `ContextArtifactWriteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sourceItemId` | 属性 | <code>sourceItemId: string</code> | source Item Id 字段。 |

## `ProviderBackedContextArtifactStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `durability` | 属性 | <code>durability: "ephemeral" &#124; "durable"</code> | durability 字段。 |
| `provider` | 属性 | <code>provider: ArtifactStoreProvider</code> | provider 字段。 |
