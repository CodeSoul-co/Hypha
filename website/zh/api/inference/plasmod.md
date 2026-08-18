# `@codesoul-co/hypha-inference` / `plasmod`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/plasmod.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Plasmod 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  InMemoryPlasmodHotLayer,
} from '@codesoul-co/hypha-inference';

import type {
  InMemoryPlasmodHotLayerOptions,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryPlasmodHotLayer` | 类 | <code>new InMemoryPlasmodHotLayer(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | In Memory Plasmod Hot Layer 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryPlasmodHotLayerOptions` | 接口 | <code>interface InMemoryPlasmodHotLayerOptions</code> | In Memory Plasmod Hot Layer Options 接口，共包含 6 个公开字段或方法。 |

## `InMemoryPlasmodHotLayer`

In Memory Plasmod Hot Layer 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryPlasmodHotLayer } from '@codesoul-co/hypha-inference';`
- 源码模块: [`plasmod`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)

### 声明

```text
export declare class InMemoryPlasmodHotLayer implements PlasmodHotLayer {
    constructor(nowOrOptions?: (() => Date) | InMemoryPlasmodHotLayerOptions);
    prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult>;
    invalidateSegment(segmentId: string, _reason: string): Promise<void>;
    getSessionState(stateId: string): PlasmodSessionState | null;
    getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null;
    snapshot(): {
            prefixRegistrySize: number;
            cacheMetadataSize: number;
            sessionStateSize: number;
            invalidationGraphSize: number;
            segmentAliasSize: number;
            reuseKeySize: number;
        };
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | 创建该类的实例。 |
| `getCacheMetadata` | 方法 | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getSessionState` | 方法 | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateSegment` | 方法 | <code>invalidateSegment(segmentId: string, _reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `prepare` | 方法 | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `snapshot` | 方法 | <code>snapshot(): { prefixRegistrySize: number; cacheMetadataSize: number; sessionStateSize: number; invalidationGraphSize: number; segmentAliasSize: number; reuseKeySize: number; }</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryPlasmodHotLayerOptions`

In Memory Plasmod Hot Layer Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryPlasmodHotLayerOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`plasmod`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)

### 声明

```text
export interface InMemoryPlasmodHotLayerOptions {
    now?: () => Date;
    maxSegments?: number;
    maxSessionStates?: number;
    maxAliases?: number;
    maxReuseKeys?: number;
    maxDependenciesPerSegment?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxAliases` | 属性 | <code>maxAliases?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDependenciesPerSegment` | 属性 | <code>maxDependenciesPerSegment?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxReuseKeys` | 属性 | <code>maxReuseKeys?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSegments` | 属性 | <code>maxSegments?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSessionStates` | 属性 | <code>maxSessionStates?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
