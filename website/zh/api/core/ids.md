# `@codesoul-co/hypha-core` / `ids`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/ids.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `formatFrameworkId` | 函数 | <code>formatFrameworkId(id: FrameworkId): string</code> | format Framework Id 的公开运行时操作。 |
| `FrameworkId` | 接口 | <code>interface FrameworkId</code> | Framework Id 的字段契约；完整字段见下表。 |
| `FrameworkIdPrefix` | 类型 | <code>type FrameworkIdPrefix = 'workspace' &#124; 'session' &#124; 'run' &#124; 'step' &#124; 'event' &#124; 'agent' &#124; 'skill' &#124; 'tool' &#124; 'memory' &#124; 'model' &#124; 'domain' &#124; 'workflow' &#124; 'policy' &#124; 'artifact'</code> | Framework Id Prefix 的公共类型别名。 |

## `FrameworkId` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `prefix` | 属性 | <code>prefix: FrameworkIdPrefix</code> | prefix 字段。 |
| `value` | 属性 | <code>value: string</code> | value 字段。 |
