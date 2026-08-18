# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-descriptor-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。Runtime activity descriptor store 模块公开 1 类、3 接口。

### 从包入口导入

```ts
import {
  ArtifactRuntimeActivityDescriptorStore,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactRuntimeActivityDescriptorStoreOptions,
  RuntimeActivityDescriptorReference,
  RuntimeActivityDescriptorStore,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactRuntimeActivityDescriptorStore` | 类 | <code>new ArtifactRuntimeActivityDescriptorStore(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Persists immutable Activity descriptors outside HumanTask Events. |
| `ArtifactRuntimeActivityDescriptorStoreOptions` | 接口 | <code>interface ArtifactRuntimeActivityDescriptorStoreOptions</code> | Artifact Runtime Activity Descriptor Store Options 接口，共包含 2 个公开字段或方法。 |
| `RuntimeActivityDescriptorReference` | 接口 | <code>interface RuntimeActivityDescriptorReference</code> | Runtime Activity Descriptor Reference 接口，共包含 2 个公开字段或方法。 |
| `RuntimeActivityDescriptorStore` | 接口 | <code>interface RuntimeActivityDescriptorStore</code> | Runtime Activity Descriptor Store 接口，共包含 2 个公开字段或方法。 |

## `ArtifactRuntimeActivityDescriptorStore`

Persists immutable Activity descriptors outside HumanTask Events.

- 种类: 类
- 导入: `import { ArtifactRuntimeActivityDescriptorStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### 声明

```text
export declare class ArtifactRuntimeActivityDescriptorStore implements RuntimeActivityDescriptorStore {
    constructor(options: ArtifactRuntimeActivityDescriptorStoreOptions);
    put(input: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference>;
    get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactRuntimeActivityDescriptorStoreOptions`

Artifact Runtime Activity Descriptor Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRuntimeActivityDescriptorStoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### 声明

```text
export interface ArtifactRuntimeActivityDescriptorStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxDescriptorBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDescriptorBytes` | 属性 | <code>maxDescriptorBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityDescriptorReference`

Runtime Activity Descriptor Reference 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityDescriptorReference } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### 声明

```text
export interface RuntimeActivityDescriptorReference {
    activityDescriptorRef: string;
    activityDescriptorHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityDescriptorStore`

Runtime Activity Descriptor Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityDescriptorStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### 声明

```text
export interface RuntimeActivityDescriptorStore {
    put(descriptor: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference>;
    get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(descriptor: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
