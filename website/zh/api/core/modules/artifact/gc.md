# `@codesoul-co/hypha-core` / `modules/artifact/gc`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultArtifactGarbageCollector` | 类 | <code>new DefaultArtifactGarbageCollector(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Default Artifact Garbage Collector 的运行时实现；公开构造函数与成员见下表。 |
| `validateArtifactGarbageCollectionRequest` | 函数 | <code>validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest</code> | 校验 Artifact Garbage Collection Request。 |

## `DefaultArtifactGarbageCollector` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | collect 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | 创建该类的实例。 |
