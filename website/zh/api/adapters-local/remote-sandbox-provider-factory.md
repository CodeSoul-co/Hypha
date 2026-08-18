# `@codesoul-co/hypha-adapters-local` / `remote-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/remote-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteSandboxProviderFactory` | 类 | <code>new RemoteSandboxProviderFactory(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory. |
| `REMOTE_SANDBOX_PROVIDER_ID` | 常量 | <code>const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox"</code> | 由 `remote-sandbox-provider-factory` 模块导出的 REMOTE SANDBOX PROVIDER ID 常量。 |
| `RemoteSandboxProviderFactoryOptions` | 接口 | <code>interface RemoteSandboxProviderFactoryOptions extends Omit&lt;RemoteSandboxHttpTransportOptions, 'baseUrl'&gt;</code> | Remote Sandbox Provider Factory Options 的字段契约；完整字段见下表。 |

## `RemoteSandboxProviderFactory` 公开成员

Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): SandboxProvider</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerType` | 属性 | <code>providerType: "remote_sandbox"</code> | provider Type 字段。 |

## `RemoteSandboxProviderFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `credentialProvider` | 方法 | <code>credentialProvider(): Promise&lt;RemoteSandboxHttpCredential&gt;</code> | credential Provider 的公开运行时操作。 |
| `fetch` | 方法 | <code>fetch(url: string, request: RemoteSandboxHttpRequest): Promise&lt;RemoteSandboxHttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `maxCredentialTtlMs` | 属性 | <code>maxCredentialTtlMs: number</code> | max Credential Ttl Ms 字段。 |
| `maxNdjsonLineCharacters` | 属性 | <code>maxNdjsonLineCharacters: number</code> | max Ndjson Line Characters 字段。 |
| `minCredentialRemainingMs` | 属性 | <code>minCredentialRemainingMs: number</code> | min Credential Remaining Ms 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs: number</code> | request Timeout Ms 字段。 |
| `transport` | 属性 | <code>transport: RemoteSandboxTransport</code> | transport 字段。 |
