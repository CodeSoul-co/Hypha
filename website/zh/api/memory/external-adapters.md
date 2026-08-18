# `@codesoul-co/hypha-memory` / `external-adapters`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/external-adapters.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)
- 导出数: **19**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。External adapters 模块公开 4 类、2 常量、2 函数、9 接口、2 类型。

### 从包入口导入

```ts
import {
  ExternalMemoryManagementAdapter,
  InMemoryExternalMemoryMappingStore,
  Mem0MemoryManagementAdapter,
  MemoryBankMemoryManagementAdapter,
  externalMemoryMappingSchema,
  unsupportedMemoryManagementCapabilities,
  negotiateMemoryManagementCapabilities,
  resolveExternalMemoryMappingStore,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalMemoryAdapterOptions,
  ExternalMemoryClient,
  ExternalMemoryMapping,
  ExternalMemoryMappingBinding,
  ExternalMemoryMappingStore,
  ExternalProviderStateChange,
  Mem0MemoryManagementAdapterOptions,
  MemoryBankMemoryManagementAdapterOptions,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExternalMemoryManagementAdapter` | 类 | <code>new ExternalMemoryManagementAdapter(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | External Memory Management Adapter 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryExternalMemoryMappingStore` | 类 | <code>new InMemoryExternalMemoryMappingStore(): InMemoryExternalMemoryMappingStore</code> | In Memory External Memory Mapping Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `Mem0MemoryManagementAdapter` | 类 | <code>new Mem0MemoryManagementAdapter(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Mem0 Memory Management Adapter 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryBankMemoryManagementAdapter` | 类 | <code>new MemoryBankMemoryManagementAdapter(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Memory Bank Memory Management Adapter 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `externalMemoryMappingSchema` | 常量 | <code>const externalMemoryMappingSchema: ZodType&lt;ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping&gt;</code> | External Memory Mapping 的运行时 Schema。 |
| `unsupportedMemoryManagementCapabilities` | 常量 | <code>const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities</code> | 由 `external-adapters` 模块导出的 Unsupported Memory Management Capabilities 常量。 |
| `negotiateMemoryManagementCapabilities` | 函数 | <code>negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities</code> | Negotiate Memory Management Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveExternalMemoryMappingStore` | 函数 | <code>resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore &#124; undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore</code> | Resolve External Memory Mapping Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ExternalMemoryAdapterOptions` | 接口 | <code>interface ExternalMemoryAdapterOptions</code> | External Memory Adapter Options 接口，共包含 11 个公开字段或方法。 |
| `ExternalMemoryClient` | 接口 | <code>interface ExternalMemoryClient</code> | External Memory Client 接口，共包含 10 个公开字段或方法。 |
| `ExternalMemoryMapping` | 接口 | <code>interface ExternalMemoryMapping</code> | External Memory Mapping 接口，共包含 8 个公开字段或方法。 |
| `ExternalMemoryMappingBinding` | 接口 | <code>interface ExternalMemoryMappingBinding</code> | External Memory Mapping Binding 接口，共包含 4 个公开字段或方法。 |
| `ExternalMemoryMappingStore` | 接口 | <code>interface ExternalMemoryMappingStore</code> | External Memory Mapping Store 接口，共包含 5 个公开字段或方法。 |
| `ExternalProviderStateChange` | 接口 | <code>interface ExternalProviderStateChange</code> | External Provider State Change 接口，共包含 4 个公开字段或方法。 |
| `Mem0MemoryManagementAdapterOptions` | 接口 | <code>interface Mem0MemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Mem0 Memory Management Adapter Options 接口，共包含 12 个公开字段或方法。 |
| `MemoryBankMemoryManagementAdapterOptions` | 接口 | <code>interface MemoryBankMemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Memory Bank Memory Management Adapter Options 接口，共包含 12 个公开字段或方法。 |
| `MemoryBankPolicySpec` | 接口 | <code>interface MemoryBankPolicySpec</code> | Memory Bank Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `ExternalMemoryMappingRuntimeProfile` | 类型 | <code>type ExternalMemoryMappingRuntimeProfile = 'production' &#124; 'test' &#124; 'ephemeral'</code> | External Memory Mapping Runtime Profile 公共类型别名；完整类型表达式见声明。 |
| `ExternalMemoryMappingStoreDurability` | 类型 | <code>type ExternalMemoryMappingStoreDurability = 'ephemeral' &#124; 'durable'</code> | External Memory Mapping Store Durability 公共类型别名；完整类型表达式见声明。 |

## `ExternalMemoryManagementAdapter`

External Memory Management Adapter 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ExternalMemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare class ExternalMemoryManagementAdapter implements MemoryManagementProvider {
    readonly id: string;
    constructor(options: ExternalMemoryAdapterOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryExternalMemoryMappingStore`

In Memory External Memory Mapping Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare class InMemoryExternalMemoryMappingStore implements ExternalMemoryMappingStore {
    readonly durability: "ephemeral";
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryExternalMemoryMappingStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `Mem0MemoryManagementAdapter`

Mem0 Memory Management Adapter 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { Mem0MemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare class Mem0MemoryManagementAdapter extends ExternalMemoryManagementAdapter {
    readonly deployment: 'managed' | 'self_hosted';
    constructor(options: Mem0MemoryManagementAdapterOptions);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `deployment` | 属性 | <code>readonly deployment: "self_hosted" &#124; "managed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryBankMemoryManagementAdapter`

Memory Bank Memory Management Adapter 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryBankMemoryManagementAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare class MemoryBankMemoryManagementAdapter extends ExternalMemoryManagementAdapter {
    readonly policy: MemoryBankPolicySpec;
    constructor(options: MemoryBankMemoryManagementAdapterOptions);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>readonly policy: MemoryBankPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `externalMemoryMappingSchema`

External Memory Mapping 的运行时 Schema。

- 种类: 常量
- 导入: `import { externalMemoryMappingSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare const externalMemoryMappingSchema: ZodType<ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping>;
```

## `unsupportedMemoryManagementCapabilities`

由 `external-adapters` 模块导出的 Unsupported Memory Management Capabilities 常量。

- 种类: 常量
- 导入: `import { unsupportedMemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities;
```

## `negotiateMemoryManagementCapabilities`

Negotiate Memory Management Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { negotiateMemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare function negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities;
```

### 调用签名

```text
negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementCapabilities`
- 说明: 返回值契约由上述类型定义。

## `resolveExternalMemoryMappingStore`

Resolve External Memory Mapping Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export declare function resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore | undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore;
```

### 调用签名

```text
resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore | undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `store` | <code>ExternalMemoryMappingStore</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `profile` | <code>ExternalMemoryMappingRuntimeProfile</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExternalMemoryMappingStore`
- 说明: 返回值契约由上述类型定义。

## `ExternalMemoryAdapterOptions`

External Memory Adapter Options 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalMemoryAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalMemoryAdapterOptions {
    id: string;
    client: ExternalMemoryClient;
    fallback?: MemoryManagementProvider;
    fallbackPolicy?: MemoryFallbackPolicySpec;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    timeoutMs?: number;
    retryAttempts?: number;
    circuitBreaker?: {
        failureThreshold: number;
        resetAfterMs: number;
    };
    now?: () => Date;
    onStateChange?: (event: ExternalProviderStateChange) => void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallback` | 属性 | <code>fallback?: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStateChange` | 方法 | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retryAttempts` | 属性 | <code>retryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalMemoryClient`

External Memory Client 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalMemoryClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalMemoryClient {
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExternalMemoryMapping`

External Memory Mapping 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalMemoryMapping } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalMemoryMapping {
    memoryId: string;
    providerId: string;
    externalId: string;
    externalVersion?: string;
    binding: ExternalMemoryMappingBinding;
    lastSyncedAt: string;
    syncState: 'synced' | 'pending' | 'failed' | 'deleted';
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding: ExternalMemoryMappingBinding</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalId` | 属性 | <code>externalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalVersion` | 属性 | <code>externalVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSyncedAt` | 属性 | <code>lastSyncedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `syncState` | 属性 | <code>syncState: "failed" &#124; "deleted" &#124; "pending" &#124; "synced"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalMemoryMappingBinding`

External Memory Mapping Binding 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalMemoryMappingBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalMemoryMappingBinding {
    scopeHash: string;
    profileRef?: MemoryContractSpecRef;
    recordRevision: number;
    provenance: MemoryProvenance;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profileRef` | 属性 | <code>profileRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: MemoryProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordRevision` | 属性 | <code>recordRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalMemoryMappingStore`

External Memory Mapping Store 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalMemoryMappingStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalMemoryMappingStore {
    readonly durability: ExternalMemoryMappingStoreDurability;
    get(providerId: string, memoryId: string): Promise<ExternalMemoryMapping | null>;
    getByExternalId(providerId: string, externalId: string): Promise<ExternalMemoryMapping | null>;
    set(mapping: ExternalMemoryMapping): Promise<void>;
    list(providerId: string): Promise<ExternalMemoryMapping[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `durability` | 属性 | <code>readonly durability: ExternalMemoryMappingStoreDurability</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExternalProviderStateChange`

External Provider State Change 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderStateChange } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface ExternalProviderStateChange {
    type: 'degraded' | 'recovered' | 'circuit_opened' | 'quarantined';
    providerId: string;
    occurredAt: string;
    error?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "degraded" &#124; "quarantined" &#124; "recovered" &#124; "circuit_opened"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `Mem0MemoryManagementAdapterOptions`

Mem0 Memory Management Adapter Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0MemoryManagementAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface Mem0MemoryManagementAdapterOptions extends Omit<ExternalMemoryAdapterOptions, 'id'> {
    id?: string;
    deployment?: 'managed' | 'self_hosted';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deployment` | 属性 | <code>deployment?: "self_hosted" &#124; "managed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallback` | 属性 | <code>fallback?: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStateChange` | 方法 | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retryAttempts` | 属性 | <code>retryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryBankMemoryManagementAdapterOptions`

Memory Bank Memory Management Adapter Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryBankMemoryManagementAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface MemoryBankMemoryManagementAdapterOptions extends Omit<ExternalMemoryAdapterOptions, 'id'> {
    id?: string;
    policy: MemoryBankPolicySpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker?: { failureThreshold: number; resetAfterMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallback` | 属性 | <code>fallback?: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStateChange` | 方法 | <code>onStateChange?(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy: MemoryBankPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAttempts` | 属性 | <code>retryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryBankPolicySpec`

Memory Bank Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryBankPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export interface MemoryBankPolicySpec {
    extractionProfileRef?: import('./contracts').MemoryContractSpecRef;
    importanceThreshold?: number;
    reinforcementFactor?: number;
    decayFunction?: 'exponential' | 'linear' | 'custom';
    decayHalfLifeSeconds?: number;
    consolidationThreshold?: number;
    consolidationMinItems?: number;
    preserveOriginals?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consolidationMinItems` | 属性 | <code>consolidationMinItems?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consolidationThreshold` | 属性 | <code>consolidationThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decayFunction` | 属性 | <code>decayFunction?: "custom" &#124; "exponential" &#124; "linear"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decayHalfLifeSeconds` | 属性 | <code>decayHalfLifeSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importanceThreshold` | 属性 | <code>importanceThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveOriginals` | 属性 | <code>preserveOriginals?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reinforcementFactor` | 属性 | <code>reinforcementFactor?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalMemoryMappingRuntimeProfile`

External Memory Mapping Runtime Profile 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExternalMemoryMappingRuntimeProfile } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export type ExternalMemoryMappingRuntimeProfile = 'production' | 'test' | 'ephemeral';
```

## `ExternalMemoryMappingStoreDurability`

External Memory Mapping Store Durability 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExternalMemoryMappingStoreDurability } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-adapters`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)

### 声明

```text
export type ExternalMemoryMappingStoreDurability = 'ephemeral' | 'durable';
```
