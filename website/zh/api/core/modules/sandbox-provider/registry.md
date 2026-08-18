# `@codesoul-co/hypha-core` / `modules/sandbox-provider/registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/sandbox-provider/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SandboxProviderRegistry` | 类 | <code>new SandboxProviderRegistry(): SandboxProviderRegistry</code> | Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core. |
| `SandboxProviderRegistration` | 接口 | <code>interface SandboxProviderRegistration</code> | Sandbox Provider Registration 的字段契约；完整字段见下表。 |

## `SandboxProviderRegistry` 公开成员

Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SandboxProviderRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(selection: SandboxProviderSelection): Promise&lt;SandboxProvider&gt;</code> | 创建 create。 |
| `list` | 方法 | <code>list(providerType?: SandboxProviderType): SandboxProviderRegistration[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(factory: SandboxProviderFactory): void</code> | 注册 register。 |
| `resolve` | 方法 | <code>resolve(selection: SandboxProviderSelection): SandboxProviderFactory</code> | 解析 resolve。 |
| `unregister` | 方法 | <code>unregister(providerType: SandboxProviderType, providerId: string): boolean</code> | unregister 的公开运行时操作。 |

## `SandboxProviderRegistration` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerType` | 属性 | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | provider Type 字段。 |
