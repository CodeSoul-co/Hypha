# `@codesoul-co/hypha-core` / `modules/runtime/event-schema-registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/event-schema-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)
- 导出数: **6**

## 模块用法

用于声明并运行时校验契约。Event schema registry 模块公开 1 类、5 接口。

### 从包入口导入

```ts
import {
  InMemoryEventSchemaRegistry,
} from '@codesoul-co/hypha-core';

import type {
  EventSchemaDefinition,
  EventSchemaRegistry,
  EventUpcaster,
  EventValidationIssue,
  EventValidationResult,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryEventSchemaRegistry` | 类 | <code>new InMemoryEventSchemaRegistry(): InMemoryEventSchemaRegistry</code> | In Memory Event Schema Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EventSchemaDefinition` | 接口 | <code>interface EventSchemaDefinition</code> | Event Schema Definition 接口，共包含 6 个公开字段或方法。 |
| `EventSchemaRegistry` | 接口 | <code>interface EventSchemaRegistry</code> | Event Schema Registry 接口，共包含 4 个公开字段或方法。 |
| `EventUpcaster` | 接口 | <code>interface EventUpcaster</code> | Event Upcaster 接口，共包含 5 个公开字段或方法。 |
| `EventValidationIssue` | 接口 | <code>interface EventValidationIssue</code> | Event Validation Issue 接口，共包含 3 个公开字段或方法。 |
| `EventValidationResult` | 接口 | <code>interface EventValidationResult</code> | Event Validation Result 接口，共包含 5 个公开字段或方法。 |

## `InMemoryEventSchemaRegistry`

In Memory Event Schema Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryEventSchemaRegistry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export declare class InMemoryEventSchemaRegistry implements EventSchemaRegistry {
    constructor();
    register(definition: EventSchemaDefinition): Promise<void>;
    registerUpcaster(upcaster: EventUpcaster): Promise<void>;
    validate(event: EventCreateInput): Promise<EventValidationResult>;
    upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise<PersistedFrameworkEvent>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryEventSchemaRegistry</code> | 创建该类的实例。 |
| `register` | 方法 | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerUpcaster` | 方法 | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upcast` | 方法 | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validate` | 方法 | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventSchemaDefinition`

Event Schema Definition 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventSchemaDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export interface EventSchemaDefinition {
    eventType: string;
    version: string;
    schema: JsonSchema;
    schemaHash: string;
    sensitivePaths?: string[];
    upcasterRefs?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schema` | 属性 | <code>schema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaHash` | 属性 | <code>schemaHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitivePaths` | 属性 | <code>sensitivePaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `upcasterRefs` | 属性 | <code>upcasterRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventSchemaRegistry`

Event Schema Registry 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventSchemaRegistry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export interface EventSchemaRegistry {
    register(definition: EventSchemaDefinition): Promise<void>;
    registerUpcaster(upcaster: EventUpcaster): Promise<void>;
    validate(event: EventCreateInput): Promise<EventValidationResult>;
    upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise<PersistedFrameworkEvent>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `register` | 方法 | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerUpcaster` | 方法 | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upcast` | 方法 | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `validate` | 方法 | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventUpcaster`

Event Upcaster 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventUpcaster } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export interface EventUpcaster {
    ref: string;
    eventType: string;
    fromVersion: string;
    toVersion: string;
    upcast(payload: unknown): unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromVersion` | 属性 | <code>fromVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toVersion` | 属性 | <code>toVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `upcast` | 方法 | <code>upcast(payload: unknown): unknown</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventValidationIssue`

Event Validation Issue 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventValidationIssue } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export interface EventValidationIssue {
    path: string;
    code: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventValidationResult`

Event Validation Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventValidationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### 声明

```text
export interface EventValidationResult {
    valid: boolean;
    eventType: string;
    version: string;
    schemaHash?: string;
    issues: EventValidationIssue[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventType` | 属性 | <code>eventType: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issues` | 属性 | <code>issues: EventValidationIssue[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaHash` | 属性 | <code>schemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `valid` | 属性 | <code>valid: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
