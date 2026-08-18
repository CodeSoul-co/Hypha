# `@codesoul-co/hypha-core` / `modules/runtime/canonical-json`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/canonical-json.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalizeJson` | 函数 | <code>canonicalizeJson(value: unknown): string</code> | 判断能否 onicalize Json。 |
| `hashCanonicalJson` | 函数 | <code>hashCanonicalJson(value: unknown): string</code> | 判断是否存在 h Canonical Json。 |
| `CanonicalJsonValue` | 类型 | <code>type CanonicalJsonValue = null &#124; boolean &#124; number &#124; string &#124; CanonicalJsonValue[] &#124; { [key: string]: CanonicalJsonValue; }</code> | Canonical Json Value 的公共类型别名。 |
