# `@codesoul-co/hypha-memory` / `external-provider-operations`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/external-provider-operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryExternalProviderOperationStore` | 类 | <code>new InMemoryExternalProviderOperationStore(): InMemoryExternalProviderOperationStore</code> | In Memory External Provider Operation Store 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredExternalProviderOperationStore` | 类 | <code>new StructuredExternalProviderOperationStore(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Structured External Provider Operation Store 的运行时实现；公开构造函数与成员见下表。 |
| `externalProviderOperationSchema` | 常量 | <code>const externalProviderOperationSchema: ZodType&lt;ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation&gt;</code> | external Provider Operation 的运行时 Schema。 |
| `createExternalProviderOperation` | 函数 | <code>createExternalProviderOperation(input: Omit&lt;ExternalProviderOperation, "id" &#124; "scopeHash" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt"&gt; &amp; { now?: string; }): ExternalProviderOperation</code> | 创建 External Provider Operation。 |
| `externalProviderOperationId` | 函数 | <code>externalProviderOperationId(providerId: string, operationId: string): string</code> | external Provider Operation Id 的公开运行时操作。 |
| `fingerprintExternalOperationFailure` | 函数 | <code>fingerprintExternalOperationFailure(error: NormalizedMemoryError): string</code> | fingerprint External Operation Failure 的公开运行时操作。 |
| `resolveExternalProviderOperationStore` | 函数 | <code>resolveExternalProviderOperationStore(store: ExternalProviderOperationStore &#124; undefined, profile: "production" &#124; "test" &#124; "ephemeral"): ExternalProviderOperationStore</code> | 解析 External Provider Operation Store。 |
| `ExternalProviderOperation` | 接口 | <code>interface ExternalProviderOperation</code> | External Provider Operation 的字段契约；完整字段见下表。 |
| `ExternalProviderOperationStore` | 接口 | <code>interface ExternalProviderOperationStore</code> | External Provider Operation Store 的字段契约；完整字段见下表。 |
| `ExternalProviderOperationState` | 类型 | <code>type ExternalProviderOperationState = 'pending' &#124; 'running' &#124; 'reconcile_required' &#124; 'succeeded' &#124; 'failed' &#124; 'cancelled' &#124; 'dead_letter'</code> | External Provider Operation State 的公共类型别名。 |

## `InMemoryExternalProviderOperationStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | claim 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryExternalProviderOperationStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "ephemeral"</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 读取 get。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 列出 Recoverable。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 写入 set。 |

## `StructuredExternalProviderOperationStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | claim 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "durable"</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 读取 get。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 列出 Recoverable。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 写入 set。 |

## `ExternalProviderOperation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `cancellationRequestedAt` | 属性 | <code>cancellationRequestedAt: string</code> | cancellation Requested At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `externalOperationId` | 属性 | <code>externalOperationId: string</code> | external Operation Id 字段。 |
| `failure` | 属性 | <code>failure: NormalizedMemoryError</code> | failure 字段。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | failure Fingerprint 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: "mem0_event" &#124; "vertex_lro" &#124; "hindsight_operation" &#124; "unknown_write"</code> | kind 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `nextAttemptAt` | 属性 | <code>nextAttemptAt: string</code> | next Attempt At 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: { principalId: string; userId?: string; }</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `state` | 属性 | <code>state: ExternalProviderOperationState</code> | state 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `ExternalProviderOperationStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | claim 的公开运行时操作。 |
| `durability` | 属性 | <code>durability: "ephemeral" &#124; "durable"</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 读取 get。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 列出 Recoverable。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 写入 set。 |
