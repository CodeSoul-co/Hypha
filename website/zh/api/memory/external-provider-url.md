# `@codesoul-co/hypha-memory` / `external-provider-url`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/external-provider-url.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `isLoopbackHostname` | 函数 | <code>isLoopbackHostname(hostname: string): boolean</code> | 判断 Loopback Hostname。 |
| `normalizeExternalProviderBaseUrl` | 函数 | <code>normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string</code> | Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination. |
| `ExternalProviderBaseUrlOptions` | 接口 | <code>interface ExternalProviderBaseUrlOptions</code> | External Provider Base Url Options 的字段契约；完整字段见下表。 |

## `ExternalProviderBaseUrlOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests: boolean</code> | allow Insecure For Tests 字段。 |
| `allowLoopbackHttp` | 属性 | <code>allowLoopbackHttp: boolean</code> | allow Loopback Http 字段。 |
| `providerName` | 属性 | <code>providerName: string</code> | provider Name 字段。 |
