# `@codesoul-co/hypha-inference` / `plasmod`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/plasmod.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryPlasmodHotLayer` | 类 | <code>new InMemoryPlasmodHotLayer(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | In Memory Plasmod Hot Layer 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryPlasmodHotLayerOptions` | 接口 | <code>interface InMemoryPlasmodHotLayerOptions</code> | In Memory Plasmod Hot Layer Options 的字段契约；完整字段见下表。 |

## `InMemoryPlasmodHotLayer` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | 创建该类的实例。 |
| `getCacheMetadata` | 方法 | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | 读取 Cache Metadata。 |
| `getSessionState` | 方法 | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | 读取 Session State。 |
| `invalidateSegment` | 方法 | <code>invalidateSegment(segmentId: string, _reason: string): Promise&lt;void&gt;</code> | invalidate Segment 的公开运行时操作。 |
| `prepare` | 方法 | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | prepare 的公开运行时操作。 |
| `snapshot` | 方法 | <code>snapshot(): { prefixRegistrySize: number; cacheMetadataSize: number; sessionStateSize: number; invalidationGraphSize: number; segmentAliasSize: number; reuseKeySize: number; }</code> | snapshot 的公开运行时操作。 |

## `InMemoryPlasmodHotLayerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxAliases` | 属性 | <code>maxAliases: number</code> | max Aliases 字段。 |
| `maxDependenciesPerSegment` | 属性 | <code>maxDependenciesPerSegment: number</code> | max Dependencies Per Segment 字段。 |
| `maxReuseKeys` | 属性 | <code>maxReuseKeys: number</code> | max Reuse Keys 字段。 |
| `maxSegments` | 属性 | <code>maxSegments: number</code> | max Segments 字段。 |
| `maxSessionStates` | 属性 | <code>maxSessionStates: number</code> | max Session States 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
