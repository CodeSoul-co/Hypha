# `@codesoul-co/hypha-tools` / `secrets`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/secrets.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)
- 导出数: **5**

## 模块用法

用于传递受控 Secret 引用与解析契约。Secrets 模块公开 5 接口。

### 从包入口导入

```ts
import type {
  CredentialLease,
  SecretProvider,
  SecretResolutionContext,
  SecretResolver,
  ToolSecretResolver,
} from '@codesoul-co/hypha-tools';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CredentialLease` | 接口 | <code>interface CredentialLease</code> | Credential Lease 接口，共包含 5 个公开字段或方法。 |
| `SecretProvider` | 接口 | <code>interface SecretProvider</code> | Secret Provider 接口，共包含 2 个公开字段或方法。 |
| `SecretResolutionContext` | 接口 | <code>interface SecretResolutionContext</code> | Secret Resolution Context 接口，共包含 2 个公开字段或方法。 |
| `SecretResolver` | 接口 | <code>interface SecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |
| `ToolSecretResolver` | 接口 | <code>interface ToolSecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |

## `CredentialLease`

Credential Lease 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CredentialLease } from '@codesoul-co/hypha-tools';`
- 源码模块: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### 声明

```text
export interface CredentialLease {
    readonly expiresAt?: string;
    readonly renewable: boolean;
    read(): string;
    renew?(): Promise<CredentialLease>;
    release?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>readonly expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `read` | 方法 | <code>read(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew?(): Promise&lt;CredentialLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renewable` | 属性 | <code>readonly renewable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SecretProvider`

Secret Provider 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SecretProvider } from '@codesoul-co/hypha-tools';`
- 源码模块: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### 声明

```text
export interface SecretProvider {
    readonly scheme: string;
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scheme` | 属性 | <code>readonly scheme: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SecretResolutionContext`

Secret Resolution Context 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SecretResolutionContext } from '@codesoul-co/hypha-tools';`
- 源码模块: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### 声明

```text
export interface SecretResolutionContext {
    purpose?: 'tool' | 'mcp_authorization' | 'mcp_headers' | 'other';
    minimumValidityMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `minimumValidityMs` | 属性 | <code>minimumValidityMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `purpose` | 属性 | <code>purpose?: "tool" &#124; "other" &#124; "mcp_authorization" &#124; "mcp_headers"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SecretResolver`

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

- 种类: 接口
- 导入: `import type { SecretResolver } from '@codesoul-co/hypha-tools';`
- 源码模块: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### 声明

```text
export interface SecretResolver {
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
    resolve(reference: string, context?: SecretResolutionContext): Promise<string | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolSecretResolver`

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

- 种类: 接口
- 导入: `import type { ToolSecretResolver } from '@codesoul-co/hypha-tools';`
- 源码模块: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### 声明

```text
export interface SecretResolver {
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
    resolve(reference: string, context?: SecretResolutionContext): Promise<string | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
