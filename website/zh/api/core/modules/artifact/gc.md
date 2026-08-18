# `@codesoul-co/hypha-core` / `modules/artifact/gc`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Gc 模块公开 1 类、1 函数。

### 从包入口导入

```ts
import {
  DefaultArtifactGarbageCollector,
  validateArtifactGarbageCollectionRequest,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactGarbageCollector` | 类 | <code>new DefaultArtifactGarbageCollector(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Default Artifact Garbage Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `validateArtifactGarbageCollectionRequest` | 函数 | <code>validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest</code> | Validate Artifact Garbage Collection Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `DefaultArtifactGarbageCollector`

Default Artifact Garbage Collector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)

### 声明

```text
export declare class DefaultArtifactGarbageCollector implements ArtifactGarbageCollector {
    constructor(options: DefaultArtifactGarbageCollectorOptions);
    collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | 创建该类的实例。 |

## `validateArtifactGarbageCollectionRequest`

Validate Artifact Garbage Collection Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactGarbageCollectionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)

### 声明

```text
export declare function validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest;
```

### 调用签名

```text
validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>ArtifactGarbageCollectionRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactGarbageCollectionRequest`
- 说明: 返回值契约由上述类型定义。
