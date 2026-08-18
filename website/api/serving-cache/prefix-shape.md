# `@codesoul-co/hypha-serving-cache` / `prefix-shape`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/prefix-shape.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PrefixCacheShapeTracker` | class | <code>new PrefixCacheShapeTracker(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Runtime implementation for Prefix Cache Shape Tracker; see its public constructor and members below. |
| `PrefixCacheShapeInput` | interface | <code>interface PrefixCacheShapeInput</code> | Field contract for Prefix Cache Shape Input; see all contract members below. |

## `PrefixCacheShapeTracker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Creates an instance of this class. |
| `observe` | method | <code>observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation</code> | Public runtime operation for observe. |

## `PrefixCacheShapeInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `model` | property | <code>model: string</code> | Public model property. |
| `prefixMetadata` | property | <code>prefixMetadata: PromptPrefixMetadata</code> | Public prefix Metadata property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `scope` | property | <code>scope: CacheScope</code> | Public scope property. |
