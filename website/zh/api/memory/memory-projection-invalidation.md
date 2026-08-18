# `@codesoul-co/hypha-memory` / `memory-projection-invalidation`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-projection-invalidation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryMutationGenerationStore` | 类 | <code>new InMemoryMemoryMutationGenerationStore(): InMemoryMemoryMutationGenerationStore</code> | In Memory Memory Mutation Generation Store 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryProjectionInvalidationCoordinator` | 类 | <code>new MemoryProjectionInvalidationCoordinator(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Memory Projection Invalidation Coordinator 的运行时实现；公开构造函数与成员见下表。 |
| `MemorySearchCacheInvalidationTarget` | 类 | <code>new MemorySearchCacheInvalidationTarget(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Memory Search Cache Invalidation Target 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryMutationGenerationStore` | 接口 | <code>interface MemoryMutationGenerationStore</code> | Memory Mutation Generation Store 的字段契约；完整字段见下表。 |
| `MemoryProjectionInvalidationPort` | 接口 | <code>interface MemoryProjectionInvalidationPort</code> | Memory Projection Invalidation Port 的字段契约；完整字段见下表。 |
| `MemoryProjectionInvalidationReceipt` | 接口 | <code>interface MemoryProjectionInvalidationReceipt</code> | Memory Projection Invalidation Receipt 的字段契约；完整字段见下表。 |
| `MemoryProjectionInvalidationRequest` | 接口 | <code>interface MemoryProjectionInvalidationRequest</code> | Memory Projection Invalidation Request 的字段契约；完整字段见下表。 |
| `MemoryProjectionInvalidationTarget` | 接口 | <code>interface MemoryProjectionInvalidationTarget</code> | Memory Projection Invalidation Target 的字段契约；完整字段见下表。 |
| `MemoryProjectionInvalidationReason` | 类型 | <code>type MemoryProjectionInvalidationReason = 'updated' &#124; 'deleted'</code> | Memory Projection Invalidation Reason 的公共类型别名。 |

## `InMemoryMemoryMutationGenerationStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `advance` | 方法 | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | advance 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryMutationGenerationStore</code> | 创建该类的实例。 |
| `current` | 方法 | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | current 的公开运行时操作。 |

## `MemoryProjectionInvalidationCoordinator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | invalidate 的公开运行时操作。 |

## `MemorySearchCacheInvalidationTarget` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |

## `MemoryMutationGenerationStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `advance` | 方法 | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | advance 的公开运行时操作。 |
| `current` | 方法 | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | current 的公开运行时操作。 |

## `MemoryProjectionInvalidationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidate` | 方法 | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | invalidate 的公开运行时操作。 |

## `MemoryProjectionInvalidationReceipt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | mutation Generation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reason` | 属性 | <code>reason: MemoryProjectionInvalidationReason</code> | reason 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `targets` | 属性 | <code>targets: { id: string; invalidatedEntries: number; }[]</code> | targets 字段。 |

## `MemoryProjectionInvalidationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryIds` | 属性 | <code>memoryIds: string[]</code> | memory Ids 字段。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds: string[]</code> | memory Version Ids 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reason` | 属性 | <code>reason: MemoryProjectionInvalidationReason</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryProjectionInvalidationTarget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string, mutationGeneration: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
