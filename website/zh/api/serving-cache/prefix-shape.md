# `@codesoul-co/hypha-serving-cache` / `prefix-shape`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/prefix-shape.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PrefixCacheShapeTracker` | 类 | <code>new PrefixCacheShapeTracker(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Prefix Cache Shape Tracker 的运行时实现；公开构造函数与成员见下表。 |
| `PrefixCacheShapeInput` | 接口 | <code>interface PrefixCacheShapeInput</code> | Prefix Cache Shape Input 的字段契约；完整字段见下表。 |

## `PrefixCacheShapeTracker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(maxSnapshots?: number): PrefixCacheShapeTracker</code> | 创建该类的实例。 |
| `observe` | 方法 | <code>observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation</code> | observe 的公开运行时操作。 |

## `PrefixCacheShapeInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `prefixMetadata` | 属性 | <code>prefixMetadata: PromptPrefixMetadata</code> | prefix Metadata 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `scope` | 属性 | <code>scope: CacheScope</code> | scope 字段。 |
