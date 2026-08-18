# `@codesoul-co/hypha-memory` / `memory-runtime-factory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-runtime-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryManagementProviderRegistry` | 类 | <code>new MemoryManagementProviderRegistry(): MemoryManagementProviderRegistry</code> | Memory Management Provider Registry 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryRuntimeFactory` | 类 | <code>new MemoryRuntimeFactory(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Strict composition root for all Memory consumers. |
| `memoryRuntimeConfigSchema` | 常量 | <code>const memoryRuntimeConfigSchema: ZodType&lt;MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig&gt;</code> | memory Runtime Config 的运行时 Schema。 |
| `memoryRuntimeProfileSchema` | 常量 | <code>const memoryRuntimeProfileSchema: ZodType&lt;MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile&gt;</code> | memory Runtime Profile 的运行时 Schema。 |
| `validateMemoryRuntimeConfig` | 函数 | <code>validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig</code> | 校验 Memory Runtime Config。 |
| `MemoryManagementProviderFactory` | 接口 | <code>interface MemoryManagementProviderFactory</code> | Memory Management Provider Factory 的字段契约；完整字段见下表。 |
| `MemoryManagementProviderFactoryContext` | 接口 | <code>interface MemoryManagementProviderFactoryContext</code> | Memory Management Provider Factory Context 的字段契约；完整字段见下表。 |
| `MemoryManagementProviderInstallation` | 接口 | <code>interface MemoryManagementProviderInstallation</code> | Memory Management Provider Installation 的字段契约；完整字段见下表。 |
| `MemoryRuntime` | 接口 | <code>interface MemoryRuntime</code> | Memory Runtime 的字段契约；完整字段见下表。 |
| `MemoryRuntimeCompositionReceipt` | 接口 | <code>interface MemoryRuntimeCompositionReceipt</code> | Memory Runtime Composition Receipt 的字段契约；完整字段见下表。 |
| `MemoryRuntimeConfig` | 接口 | <code>interface MemoryRuntimeConfig</code> | Memory Runtime Config 的字段契约；完整字段见下表。 |
| `MemoryRuntimeFactoryOptions` | 接口 | <code>interface MemoryRuntimeFactoryOptions</code> | Memory Runtime Factory Options 的字段契约；完整字段见下表。 |
| `MemoryRuntimeProfile` | 接口 | <code>interface MemoryRuntimeProfile</code> | Memory Runtime Profile 的字段契约；完整字段见下表。 |
| `MemoryRuntimeSearchCacheOptions` | 类型 | <code>type MemoryRuntimeSearchCacheOptions = Omit&lt;CachedMemoryManagementProviderOptions, 'provider' &#124; 'providerRevision' &#124; 'requiredScopeFields' &#124; 'cacheAuthorization' &#124; 'requireCacheAuthorization'&gt;</code> | Memory Runtime Search Cache Options 的公共类型别名。 |

## `MemoryManagementProviderRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MemoryManagementProviderRegistry</code> | 创建该类的实例。 |
| `register` | 方法 | <code>register(factory: MemoryManagementProviderFactory): MemoryManagementProviderRegistry</code> | 注册 register。 |
| `resolve` | 方法 | <code>resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory</code> | 解析 resolve。 |

## `MemoryRuntimeFactory` 公开成员

Strict composition root for all Memory consumers.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | 创建 create。 |

## `MemoryManagementProviderFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(context: MemoryManagementProviderFactoryContext): Promise&lt;MemoryManagementProvider &#124; MemoryManagementProviderInstallation&gt;</code> | 创建 create。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `supports` | 方法 | <code>supports(spec: MemoryManagementProviderSpec): boolean</code> | supports 的公开运行时操作。 |

## `MemoryManagementProviderFactoryContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | profile 字段。 |
| `references` | 属性 | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | references 字段。 |
| `spec` | 属性 | <code>spec: MemoryManagementProviderSpec</code> | spec 字段。 |

## `MemoryManagementProviderInstallation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | provider 字段。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | reconciliation Store 字段。 |
| `resources` | 属性 | <code>resources: unknown</code> | resources 字段。 |

## `MemoryRuntime` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | capabilities 字段。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `compositionReceipt` | 属性 | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | composition Receipt 字段。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | profile 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | provider 字段。 |
| `providerSpec` | 属性 | <code>providerSpec: MemoryManagementProviderSpec</code> | provider Spec 字段。 |
| `resources` | 属性 | <code>resources: unknown</code> | resources 字段。 |
| `service` | 属性 | <code>service: MemoryApplicationService</code> | service 字段。 |
| `telemetry` | 属性 | <code>telemetry: MemoryProviderTelemetry</code> | telemetry 字段。 |

## `MemoryRuntimeCompositionReceipt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfileId` | 属性 | <code>activeProfileId: string</code> | active Profile Id 字段。 |
| `configHash` | 属性 | <code>configHash: string</code> | config Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerSpecId` | 属性 | <code>providerSpecId: string</code> | provider Spec Id 字段。 |
| `resolvedDependencyRefs` | 属性 | <code>resolvedDependencyRefs: string[]</code> | resolved Dependency Refs 字段。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | runtime Id 字段。 |
| `serviceContract` | 属性 | <code>serviceContract: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | service Contract 字段。 |
| `serviceInstanceId` | 属性 | <code>serviceInstanceId: string</code> | service Instance Id 字段。 |

## `MemoryRuntimeConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfile` | 属性 | <code>activeProfile: string</code> | active Profile 字段。 |
| `profiles` | 属性 | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | profiles 字段。 |

## `MemoryRuntimeFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: DefaultMemoryActivityPortOptions</code> | activities 字段。 |
| `contextBuilder` | 属性 | <code>contextBuilder: MemoryContextBuilder</code> | context Builder 字段。 |
| `contextGateway` | 属性 | <code>contextGateway: ContextInjectionGateway</code> | context Gateway 字段。 |
| `eventContext` | 方法 | <code>eventContext(request: MemoryRuntimeRequestContext): MemoryEventContext</code> | event Context 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `operationalMetrics` | 属性 | <code>operationalMetrics: MemoryOperationalMetrics</code> | operational Metrics 字段。 |
| `projectionInvalidation` | 属性 | <code>projectionInvalidation: MemoryProjectionInvalidationPort</code> | projection Invalidation 字段。 |
| `providerCostEstimator` | 方法 | <code>providerCostEstimator(operation: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperation, request: unknown): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperationEstimate</code> | provider Cost Estimator 的公开运行时操作。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | reconciliation Store 字段。 |
| `registry` | 属性 | <code>registry: MemoryManagementProviderRegistry</code> | registry 字段。 |
| `searchCache` | 属性 | <code>searchCache: MemoryRuntimeSearchCacheOptions</code> | search Cache 字段。 |
| `telemetry` | 属性 | <code>telemetry: MemoryProviderTelemetry</code> | telemetry 字段。 |

## `MemoryRuntimeProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `management` | 属性 | <code>management: MemoryManagementProviderSpec</code> | management 字段。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | profile 字段。 |
