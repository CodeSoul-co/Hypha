# `@codesoul-co/hypha-memory` / `memory-runtime-factory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-runtime-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryManagementProviderRegistry` | class | <code>new MemoryManagementProviderRegistry(): MemoryManagementProviderRegistry</code> | Runtime implementation for Memory Management Provider Registry; see its public constructor and members below. |
| `MemoryRuntimeFactory` | class | <code>new MemoryRuntimeFactory(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Strict composition root for all Memory consumers. |
| `memoryRuntimeConfigSchema` | constant | <code>const memoryRuntimeConfigSchema: ZodType&lt;MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig&gt;</code> | Runtime schema for memory Runtime Config. |
| `memoryRuntimeProfileSchema` | constant | <code>const memoryRuntimeProfileSchema: ZodType&lt;MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile&gt;</code> | Runtime schema for memory Runtime Profile. |
| `validateMemoryRuntimeConfig` | function | <code>validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig</code> | Validates Memory Runtime Config at this module boundary. |
| `MemoryManagementProviderFactory` | interface | <code>interface MemoryManagementProviderFactory</code> | Field contract for Memory Management Provider Factory; see all contract members below. |
| `MemoryManagementProviderFactoryContext` | interface | <code>interface MemoryManagementProviderFactoryContext</code> | Field contract for Memory Management Provider Factory Context; see all contract members below. |
| `MemoryManagementProviderInstallation` | interface | <code>interface MemoryManagementProviderInstallation</code> | Field contract for Memory Management Provider Installation; see all contract members below. |
| `MemoryRuntime` | interface | <code>interface MemoryRuntime</code> | Field contract for Memory Runtime; see all contract members below. |
| `MemoryRuntimeCompositionReceipt` | interface | <code>interface MemoryRuntimeCompositionReceipt</code> | Field contract for Memory Runtime Composition Receipt; see all contract members below. |
| `MemoryRuntimeConfig` | interface | <code>interface MemoryRuntimeConfig</code> | Field contract for Memory Runtime Config; see all contract members below. |
| `MemoryRuntimeFactoryOptions` | interface | <code>interface MemoryRuntimeFactoryOptions</code> | Field contract for Memory Runtime Factory Options; see all contract members below. |
| `MemoryRuntimeProfile` | interface | <code>interface MemoryRuntimeProfile</code> | Field contract for Memory Runtime Profile; see all contract members below. |
| `MemoryRuntimeSearchCacheOptions` | type | <code>type MemoryRuntimeSearchCacheOptions = Omit&lt;CachedMemoryManagementProviderOptions, 'provider' &#124; 'providerRevision' &#124; 'requiredScopeFields' &#124; 'cacheAuthorization' &#124; 'requireCacheAuthorization'&gt;</code> | Public type alias for Memory Runtime Search Cache Options. |

## `MemoryManagementProviderRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MemoryManagementProviderRegistry</code> | Creates an instance of this class. |
| `register` | method | <code>register(factory: MemoryManagementProviderFactory): MemoryManagementProviderRegistry</code> | Registers register at this module boundary. |
| `resolve` | method | <code>resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory</code> | Resolves resolve at this module boundary. |

## `MemoryRuntimeFactory` public members

Strict composition root for all Memory consumers.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | Creates create at this module boundary. |

## `MemoryManagementProviderFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(context: MemoryManagementProviderFactoryContext): Promise&lt;MemoryManagementProvider &#124; MemoryManagementProviderInstallation&gt;</code> | Creates create at this module boundary. |
| `id` | property | <code>id: string</code> | Public id property. |
| `supports` | method | <code>supports(spec: MemoryManagementProviderSpec): boolean</code> | Public runtime operation for supports. |

## `MemoryManagementProviderFactoryContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public profile property. |
| `references` | property | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | Public references property. |
| `spec` | property | <code>spec: MemoryManagementProviderSpec</code> | Public spec property. |

## `MemoryManagementProviderInstallation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public provider property. |
| `reconciliationStore` | property | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | Public reconciliation Store property. |
| `resources` | property | <code>resources: unknown</code> | Public resources property. |

## `MemoryRuntime` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public capabilities property. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `compositionReceipt` | property | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | Public composition Receipt property. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public profile property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public provider property. |
| `providerSpec` | property | <code>providerSpec: MemoryManagementProviderSpec</code> | Public provider Spec property. |
| `resources` | property | <code>resources: unknown</code> | Public resources property. |
| `service` | property | <code>service: MemoryApplicationService</code> | Public service property. |
| `telemetry` | property | <code>telemetry: MemoryProviderTelemetry</code> | Public telemetry property. |

## `MemoryRuntimeCompositionReceipt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfileId` | property | <code>activeProfileId: string</code> | Public active Profile Id property. |
| `configHash` | property | <code>configHash: string</code> | Public config Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerSpecId` | property | <code>providerSpecId: string</code> | Public provider Spec Id property. |
| `resolvedDependencyRefs` | property | <code>resolvedDependencyRefs: string[]</code> | Public resolved Dependency Refs property. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public runtime Id property. |
| `serviceContract` | property | <code>serviceContract: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | Public service Contract property. |
| `serviceInstanceId` | property | <code>serviceInstanceId: string</code> | Public service Instance Id property. |

## `MemoryRuntimeConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfile` | property | <code>activeProfile: string</code> | Public active Profile property. |
| `profiles` | property | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | Public profiles property. |

## `MemoryRuntimeFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: DefaultMemoryActivityPortOptions</code> | Public activities property. |
| `contextBuilder` | property | <code>contextBuilder: MemoryContextBuilder</code> | Public context Builder property. |
| `contextGateway` | property | <code>contextGateway: ContextInjectionGateway</code> | Public context Gateway property. |
| `eventContext` | method | <code>eventContext(request: MemoryRuntimeRequestContext): MemoryEventContext</code> | Public runtime operation for event Context. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `operationalMetrics` | property | <code>operationalMetrics: MemoryOperationalMetrics</code> | Public operational Metrics property. |
| `projectionInvalidation` | property | <code>projectionInvalidation: MemoryProjectionInvalidationPort</code> | Public projection Invalidation property. |
| `providerCostEstimator` | method | <code>providerCostEstimator(operation: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperation, request: unknown): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperationEstimate</code> | Public runtime operation for provider Cost Estimator. |
| `reconciliationStore` | property | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | Public reconciliation Store property. |
| `registry` | property | <code>registry: MemoryManagementProviderRegistry</code> | Public registry property. |
| `searchCache` | property | <code>searchCache: MemoryRuntimeSearchCacheOptions</code> | Public search Cache property. |
| `telemetry` | property | <code>telemetry: MemoryProviderTelemetry</code> | Public telemetry property. |

## `MemoryRuntimeProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `management` | property | <code>management: MemoryManagementProviderSpec</code> | Public management property. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public profile property. |
