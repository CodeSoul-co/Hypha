# `@codesoul-co/hypha-serving-cache` / `policies`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/policies.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultCachePolicy` | 常量 | <code>const defaultCachePolicy: CachePolicy</code> | 由 `policies` 模块导出的 default Cache Policy 常量。 |
| `cacheModeAllowsRead` | 函数 | <code>cacheModeAllowsRead(mode: CacheMode): boolean</code> | cache Mode Allows Read 的公开运行时操作。 |
| `cacheModeAllowsWrite` | 函数 | <code>cacheModeAllowsWrite(mode: CacheMode): boolean</code> | cache Mode Allows Write 的公开运行时操作。 |
| `normalizeCachePolicy` | 函数 | <code>normalizeCachePolicy(policy?: Partial&lt;CachePolicy&gt;): CachePolicy</code> | 规范化 Cache Policy。 |
