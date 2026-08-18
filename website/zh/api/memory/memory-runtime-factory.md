# `@codesoul-co/hypha-memory` / `memory-runtime-factory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-runtime-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)
- 导出数: **14**

## 模块用法

用于执行该边界的运行时行为。Memory runtime factory 模块公开 2 类、2 常量、1 函数、8 接口、1 类型。

### 从包入口导入

```ts
import {
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  memoryRuntimeConfigSchema,
  memoryRuntimeProfileSchema,
  validateMemoryRuntimeConfig,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryManagementProviderFactory,
  MemoryManagementProviderFactoryContext,
  MemoryManagementProviderInstallation,
  MemoryRuntime,
  MemoryRuntimeCompositionReceipt,
  MemoryRuntimeConfig,
  MemoryRuntimeFactoryOptions,
  MemoryRuntimeProfile,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryManagementProviderRegistry` | 类 | <code>new MemoryManagementProviderRegistry(): MemoryManagementProviderRegistry</code> | Memory Management Provider Registry 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryRuntimeFactory` | 类 | <code>new MemoryRuntimeFactory(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Strict composition root for all Memory consumers. |
| `memoryRuntimeConfigSchema` | 常量 | <code>const memoryRuntimeConfigSchema: ZodType&lt;MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig&gt;</code> | Memory Runtime Config 的运行时 Schema。 |
| `memoryRuntimeProfileSchema` | 常量 | <code>const memoryRuntimeProfileSchema: ZodType&lt;MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile&gt;</code> | Memory Runtime Profile 的运行时 Schema。 |
| `validateMemoryRuntimeConfig` | 函数 | <code>validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig</code> | Validate Memory Runtime Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryManagementProviderFactory` | 接口 | <code>interface MemoryManagementProviderFactory</code> | Memory Management Provider Factory 接口，共包含 3 个公开字段或方法。 |
| `MemoryManagementProviderFactoryContext` | 接口 | <code>interface MemoryManagementProviderFactoryContext</code> | Memory Management Provider Factory Context 接口，共包含 3 个公开字段或方法。 |
| `MemoryManagementProviderInstallation` | 接口 | <code>interface MemoryManagementProviderInstallation</code> | Memory Management Provider Installation 接口，共包含 4 个公开字段或方法。 |
| `MemoryRuntime` | 接口 | <code>interface MemoryRuntime</code> | Memory Runtime 接口，共包含 10 个公开字段或方法。 |
| `MemoryRuntimeCompositionReceipt` | 接口 | <code>interface MemoryRuntimeCompositionReceipt</code> | Memory Runtime Composition Receipt 接口，共包含 10 个公开字段或方法。 |
| `MemoryRuntimeConfig` | 接口 | <code>interface MemoryRuntimeConfig</code> | Memory Runtime Config 接口，共包含 2 个公开字段或方法。 |
| `MemoryRuntimeFactoryOptions` | 接口 | <code>interface MemoryRuntimeFactoryOptions</code> | Memory Runtime Factory Options 接口，共包含 12 个公开字段或方法。 |
| `MemoryRuntimeProfile` | 接口 | <code>interface MemoryRuntimeProfile</code> | Memory Runtime Profile 接口，共包含 2 个公开字段或方法。 |
| `MemoryRuntimeSearchCacheOptions` | 类型 | <code>type MemoryRuntimeSearchCacheOptions = Omit&lt;CachedMemoryManagementProviderOptions, 'provider' &#124; 'providerRevision' &#124; 'requiredScopeFields' &#124; 'cacheAuthorization' &#124; 'requireCacheAuthorization'&gt;</code> | Memory Runtime Search Cache Options 公共类型别名；完整类型表达式见声明。 |

## `MemoryManagementProviderRegistry`

Memory Management Provider Registry 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryManagementProviderRegistry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export declare class MemoryManagementProviderRegistry {
    register(factory: MemoryManagementProviderFactory): this;
    resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MemoryManagementProviderRegistry</code> | 创建该类的实例。 |
| `register` | 方法 | <code>register(factory: MemoryManagementProviderFactory): MemoryManagementProviderRegistry</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRuntimeFactory`

Strict composition root for all Memory consumers.

- 种类: 类
- 导入: `import { MemoryRuntimeFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export declare class MemoryRuntimeFactory {
    constructor(options: MemoryRuntimeFactoryOptions);
    create(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntime>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `memoryRuntimeConfigSchema`

Memory Runtime Config 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRuntimeConfigSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export declare const memoryRuntimeConfigSchema: ZodType<MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig>;
```

## `memoryRuntimeProfileSchema`

Memory Runtime Profile 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryRuntimeProfileSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export declare const memoryRuntimeProfileSchema: ZodType<MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile>;
```

## `validateMemoryRuntimeConfig`

Validate Memory Runtime Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export declare function validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig;
```

### 调用签名

```text
validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryRuntimeConfig`
- 说明: 返回值契约由上述类型定义。

## `MemoryManagementProviderFactory`

Memory Management Provider Factory 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryManagementProviderFactory {
    readonly id: string;
    supports(spec: MemoryManagementProviderSpec): boolean;
    create(context: MemoryManagementProviderFactoryContext): Promise<MemoryManagementProvider | MemoryManagementProviderInstallation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(context: MemoryManagementProviderFactoryContext): Promise&lt;MemoryManagementProvider &#124; MemoryManagementProviderInstallation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supports` | 方法 | <code>supports(spec: MemoryManagementProviderSpec): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryManagementProviderFactoryContext`

Memory Management Provider Factory Context 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementProviderFactoryContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryManagementProviderFactoryContext {
    profile: MemoryProfileSpec;
    spec: MemoryManagementProviderSpec;
    references?: ReadonlyMap<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `references` | 属性 | <code>references?: ReadonlyMap&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: MemoryManagementProviderSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagementProviderInstallation`

Memory Management Provider Installation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementProviderInstallation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryManagementProviderInstallation {
    provider: MemoryManagementProvider;
    reconciliationStore?: MemoryLifecycleTaskStore;
    resources?: unknown;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>resources?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntime`

Memory Runtime 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntime } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryRuntime {
    service: MemoryApplicationService;
    provider: MemoryManagementProvider;
    profile: MemoryProfileSpec;
    providerSpec: MemoryManagementProviderSpec;
    profileHash: string;
    capabilities: MemoryManagementCapabilities;
    compositionReceipt: MemoryRuntimeCompositionReceipt;
    resources?: unknown;
    close(): Promise<void>;
    telemetry?: MemoryProviderTelemetry;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compositionReceipt` | 属性 | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerSpec` | 属性 | <code>providerSpec: MemoryManagementProviderSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>resources?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `service` | 属性 | <code>service: MemoryApplicationService</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `telemetry` | 属性 | <code>telemetry?: MemoryProviderTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeCompositionReceipt`

Memory Runtime Composition Receipt 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeCompositionReceipt } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryRuntimeCompositionReceipt {
    runtimeId: string;
    serviceInstanceId: string;
    serviceContract: '@codesoul-co/hypha-memory.MemoryApplicationService';
    activeProfileId: string;
    providerId: string;
    providerSpecId: string;
    configHash: string;
    profileHash: string;
    resolvedDependencyRefs: string[];
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfileId` | 属性 | <code>activeProfileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `configHash` | 属性 | <code>configHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerSpecId` | 属性 | <code>providerSpecId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedDependencyRefs` | 属性 | <code>resolvedDependencyRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serviceContract` | 属性 | <code>serviceContract: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serviceInstanceId` | 属性 | <code>serviceInstanceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeConfig`

Memory Runtime Config 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryRuntimeConfig {
    activeProfile: string;
    profiles: Record<string, MemoryRuntimeProfile>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfile` | 属性 | <code>activeProfile: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profiles` | 属性 | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeFactoryOptions`

Memory Runtime Factory Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeFactoryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryRuntimeFactoryOptions {
    registry: MemoryManagementProviderRegistry;
    activities: DefaultMemoryActivityPortOptions;
    eventContext: (request: MemoryRuntimeRequestContext) => MemoryEventContext;
    contextBuilder?: MemoryContextBuilder;
    contextGateway?: ContextInjectionGateway;
    reconciliationStore?: MemoryLifecycleTaskStore;
    telemetry?: MemoryProviderTelemetry;
    operationalMetrics?: MemoryOperationalMetrics;
    providerCostEstimator?: MemoryProviderCostEstimator;
    searchCache?: MemoryRuntimeSearchCacheOptions;
    projectionInvalidation?: MemoryProjectionInvalidationPort;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: DefaultMemoryActivityPortOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBuilder` | 属性 | <code>contextBuilder?: MemoryContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextGateway` | 属性 | <code>contextGateway?: ContextInjectionGateway</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventContext` | 方法 | <code>eventContext(request: MemoryRuntimeRequestContext): MemoryEventContext</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationalMetrics` | 属性 | <code>operationalMetrics?: MemoryOperationalMetrics</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionInvalidation` | 属性 | <code>projectionInvalidation?: MemoryProjectionInvalidationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCostEstimator` | 方法 | <code>providerCostEstimator?(operation: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperation, request: unknown): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperationEstimate</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `registry` | 属性 | <code>registry: MemoryManagementProviderRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `searchCache` | 属性 | <code>searchCache?: MemoryRuntimeSearchCacheOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `telemetry` | 属性 | <code>telemetry?: MemoryProviderTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeProfile`

Memory Runtime Profile 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeProfile } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export interface MemoryRuntimeProfile {
    profile: MemoryProfileSpec;
    management: MemoryManagementProviderSpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `management` | 属性 | <code>management: MemoryManagementProviderSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeSearchCacheOptions`

Memory Runtime Search Cache Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryRuntimeSearchCacheOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### 声明

```text
export type MemoryRuntimeSearchCacheOptions = Omit<CachedMemoryManagementProviderOptions, 'provider' | 'providerRevision' | 'requiredScopeFields' | 'cacheAuthorization' | 'requireCacheAuthorization'>;
```
