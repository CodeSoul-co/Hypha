# `@codesoul-co/hypha-memory` / `managed-credentials`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/managed-credentials.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RenewableCredentialManager` | 类 | <code>new RenewableCredentialManager(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Renewable Credential Manager 的运行时实现；公开构造函数与成员见下表。 |
| `staticCredentialProvider` | 函数 | <code>staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider</code> | static Credential Provider 的公开运行时操作。 |
| `ManagedCredentialLease` | 接口 | <code>interface ManagedCredentialLease</code> | Managed Credential Lease 的字段契约；完整字段见下表。 |
| `RenewableCredentialManagerOptions` | 接口 | <code>interface RenewableCredentialManagerOptions</code> | Renewable Credential Manager Options 的字段契约；完整字段见下表。 |
| `RenewableCredentialProvider` | 接口 | <code>interface RenewableCredentialProvider</code> | Renewable Credential Provider 的字段契约；完整字段见下表。 |

## `RenewableCredentialManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(signal?: AbortSignal): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | 读取 get。 |
| `invalidate` | 方法 | <code>invalidate(): void</code> | invalidate 的公开运行时操作。 |

## `ManagedCredentialLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `token` | 属性 | <code>token: string</code> | token 字段。 |
| `tokenType` | 属性 | <code>tokenType: "api_token" &#124; "oauth_bearer"</code> | token Type 字段。 |

## `RenewableCredentialManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `provider` | 属性 | <code>provider: RenewableCredentialProvider</code> | provider 字段。 |
| `refreshSkewMs` | 属性 | <code>refreshSkewMs: number</code> | refresh Skew Ms 字段。 |

## `RenewableCredentialProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | acquire 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `revoke` | 方法 | <code>revoke(lease: ManagedCredentialLease, signal?: AbortSignal): Promise&lt;void&gt;</code> | revoke 的公开运行时操作。 |
