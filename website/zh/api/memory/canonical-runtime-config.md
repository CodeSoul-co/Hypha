# `@codesoul-co/hypha-memory` / `canonical-runtime-config`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/canonical-runtime-config.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CanonicalMemoryRuntimeLoader` | 类 | <code>new CanonicalMemoryRuntimeLoader(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Canonical Memory Runtime Loader 的运行时实现；公开构造函数与成员见下表。 |
| `canonicalMemoryRuntimeConfigExample` | 常量 | <code>const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig</code> | canonical Memory Runtime Config 的有效示例值。 |
| `canonicalMemoryRuntimeConfigJsonSchema` | 常量 | <code>const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema</code> | canonical Memory Runtime Config 的 JSON Schema。 |
| `canonicalMemoryRuntimeConfigSchema` | 常量 | <code>const canonicalMemoryRuntimeConfigSchema: ZodType&lt;CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig&gt;</code> | canonical Memory Runtime Config 的运行时 Schema。 |
| `CanonicalMemoryRuntimeConfig` | 接口 | <code>interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig</code> | Canonical Memory Runtime Config 的字段契约；完整字段见下表。 |
| `LoadedCanonicalMemoryRuntimeConfig` | 接口 | <code>interface LoadedCanonicalMemoryRuntimeConfig</code> | Loaded Canonical Memory Runtime Config 的字段契约；完整字段见下表。 |
| `MemoryRuntimeReferenceResolver` | 接口 | <code>interface MemoryRuntimeReferenceResolver</code> | Memory Runtime Reference Resolver 的字段契约；完整字段见下表。 |

## `CanonicalMemoryRuntimeLoader` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(factory: MemoryRuntimeFactory, input: unknown): Promise&lt;MemoryRuntime&gt;</code> | 创建 create。 |
| `load` | 方法 | <code>load(input: unknown): Promise&lt;LoadedCanonicalMemoryRuntimeConfig&gt;</code> | 加载 load。 |

## `CanonicalMemoryRuntimeConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfile` | 属性 | <code>activeProfile: string</code> | active Profile 字段。 |
| `profiles` | 属性 | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | profiles 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |

## `LoadedCanonicalMemoryRuntimeConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: MemoryRuntimeConfig</code> | config 字段。 |
| `references` | 属性 | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | references 字段。 |

## `MemoryRuntimeReferenceResolver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(reference: string, kind: "connection" &#124; "secret" &#124; "environment" &#124; "dependency"): Promise&lt;unknown&gt;</code> | 解析 resolve。 |
