# `@codesoul-co/hypha-tools` / `tool-families`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/tool-families.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `governedToolFamilySpecs` | 常量 | <code>const governedToolFamilySpecs: readonly ToolSpec[]</code> | 由 `tool-families` 模块导出的 governed Tool Family Specs 常量。 |
| `createGovernedToolFamilyBindings` | 函数 | <code>createGovernedToolFamilyBindings(ports: Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;): GovernedToolFamilyBinding[]</code> | 创建 Governed Tool Family Bindings。 |
| `GovernedToolFamilyBinding` | 接口 | <code>interface GovernedToolFamilyBinding</code> | Governed Tool Family Binding 的字段契约；完整字段见下表。 |
| `GovernedToolFamilyPort` | 接口 | <code>interface GovernedToolFamilyPort</code> | Governed Tool Family Port 的字段契约；完整字段见下表。 |

## `GovernedToolFamilyBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | adapter 字段。 |
| `spec` | 属性 | <code>spec: ToolSpec</code> | spec 字段。 |

## `GovernedToolFamilyPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(input: { toolId: string; input: Record&lt;string, unknown&gt;; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |
