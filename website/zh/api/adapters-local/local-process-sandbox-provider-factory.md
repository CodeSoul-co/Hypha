# `@codesoul-co/hypha-adapters-local` / `local-process-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessSandboxProviderFactory` | 类 | <code>new LocalProcessSandboxProviderFactory(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands. |
| `LOCAL_PROCESS_SANDBOX_PROVIDER_ID` | 常量 | <code>const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process"</code> | 由 `local-process-sandbox-provider-factory` 模块导出的 LOCAL PROCESS SANDBOX PROVIDER ID 常量。 |
| `LocalProcessSandboxProviderFactoryOptions` | 类型 | <code>type LocalProcessSandboxProviderFactoryOptions = Omit&lt;LocalProcessExecutionProviderOptions, 'id'&gt; &amp; { providerId?: string; createWorkspaceRoot?: boolean; }</code> | Local Process Sandbox Provider Factory Options 的公共类型别名。 |

## `LocalProcessSandboxProviderFactory` 公开成员

Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;SandboxProvider&gt;</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerType` | 属性 | <code>providerType: "local_process"</code> | provider Type 字段。 |
