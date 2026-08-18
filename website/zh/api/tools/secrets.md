# `@codesoul-co/hypha-tools` / `secrets`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/secrets.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CredentialLease` | 接口 | <code>interface CredentialLease</code> | Credential Lease 的字段契约；完整字段见下表。 |
| `SecretProvider` | 接口 | <code>interface SecretProvider</code> | Secret Provider 的字段契约；完整字段见下表。 |
| `SecretResolutionContext` | 接口 | <code>interface SecretResolutionContext</code> | Secret Resolution Context 的字段契约；完整字段见下表。 |
| `SecretResolver` | 接口 | <code>interface SecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |
| `ToolSecretResolver` | 接口 | <code>interface ToolSecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |

## `CredentialLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `read` | 方法 | <code>read(): string</code> | read 的公开运行时操作。 |
| `release` | 方法 | <code>release(): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(): Promise&lt;CredentialLease&gt;</code> | renew 的公开运行时操作。 |
| `renewable` | 属性 | <code>renewable: boolean</code> | renewable 字段。 |

## `SecretProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `scheme` | 属性 | <code>scheme: string</code> | scheme 字段。 |

## `SecretResolutionContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `minimumValidityMs` | 属性 | <code>minimumValidityMs: number</code> | minimum Validity Ms 字段。 |
| `purpose` | 属性 | <code>purpose: "tool" &#124; "other" &#124; "mcp_authorization" &#124; "mcp_headers"</code> | purpose 字段。 |

## `SecretResolver` 契约字段

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `resolve` | 方法 | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | 解析 resolve。 |

## `ToolSecretResolver` 契约字段

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `resolve` | 方法 | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | 解析 resolve。 |
