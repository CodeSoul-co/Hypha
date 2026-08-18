# `@codesoul-co/hypha-mcp` / `oauth`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/oauth.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)
- 导出数: **8**

## 模块用法

用于使用该功能边界的公共契约与操作。Oauth 模块公开 1 类、2 函数、5 接口。

### 从包入口导入

```ts
import {
  MCPOAuth21Client,
  mcpProtectedResourceMetadataUrlFromChallenge,
  redactMCPOAuthSecrets,
} from '@codesoul-co/hypha-mcp';

import type {
  MCPAuthorizationServerMetadata,
  MCPOAuth21ClientOptions,
  MCPOAuthAuthorizationRequest,
  MCPOAuthTokenSet,
  MCPProtectedResourceMetadata,
} from '@codesoul-co/hypha-mcp';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MCPOAuth21Client` | 类 | <code>new MCPOAuth21Client(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | MCPO Auth21 Client 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `mcpProtectedResourceMetadataUrlFromChallenge` | 函数 | <code>mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string &#124; null &#124; undefined): string &#124; undefined</code> | Extracts RFC 9728 metadata discovery from an MCP Bearer challenge. |
| `redactMCPOAuthSecrets` | 函数 | <code>redactMCPOAuthSecrets&lt;T&gt;(value: T): T</code> | Redact MCPO Auth Secrets 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MCPAuthorizationServerMetadata` | 接口 | <code>interface MCPAuthorizationServerMetadata</code> | MCP Authorization Server Metadata 接口，共包含 5 个公开字段或方法。 |
| `MCPOAuth21ClientOptions` | 接口 | <code>interface MCPOAuth21ClientOptions</code> | MCPO Auth21 Client Options 接口，共包含 10 个公开字段或方法。 |
| `MCPOAuthAuthorizationRequest` | 接口 | <code>interface MCPOAuthAuthorizationRequest</code> | MCPO Auth Authorization Request 接口，共包含 3 个公开字段或方法。 |
| `MCPOAuthTokenSet` | 接口 | <code>interface MCPOAuthTokenSet</code> | MCPO Auth Token Set 接口，共包含 6 个公开字段或方法。 |
| `MCPProtectedResourceMetadata` | 接口 | <code>interface MCPProtectedResourceMetadata</code> | MCP Protected Resource Metadata 接口，共包含 3 个公开字段或方法。 |

## `MCPOAuth21Client`

MCPO Auth21 Client 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MCPOAuth21Client } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export declare class MCPOAuth21Client {
    constructor(options: MCPOAuth21ClientOptions);
    discover(): Promise<{
            protectedResource: MCPProtectedResourceMetadata;
            authorizationServer: MCPAuthorizationServerMetadata;
        }>;
    createAuthorizationRequest(state?: string): Promise<MCPOAuthAuthorizationRequest>;
    exchangeAuthorizationCode(input: {
            code: string;
            codeVerifier: string;
            state: string;
            expectedState: string;
        }): Promise<MCPOAuthTokenSet>;
    refresh(): Promise<MCPOAuthTokenSet>;
    authorizationHeader(minimumValidityMs?: number): Promise<string>;
    clear(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorizationHeader` | 方法 | <code>authorizationHeader(minimumValidityMs?: number): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `clear` | 方法 | <code>clear(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | 创建该类的实例。 |
| `createAuthorizationRequest` | 方法 | <code>createAuthorizationRequest(state?: string): Promise&lt;MCPOAuthAuthorizationRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `discover` | 方法 | <code>discover(): Promise&lt;{ protectedResource: MCPProtectedResourceMetadata; authorizationServer: MCPAuthorizationServerMetadata; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `exchangeAuthorizationCode` | 方法 | <code>exchangeAuthorizationCode(input: { code: string; codeVerifier: string; state: string; expectedState: string; }): Promise&lt;MCPOAuthTokenSet&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `refresh` | 方法 | <code>refresh(): Promise&lt;MCPOAuthTokenSet&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `mcpProtectedResourceMetadataUrlFromChallenge`

Extracts RFC 9728 metadata discovery from an MCP Bearer challenge.

- 种类: 函数
- 导入: `import { mcpProtectedResourceMetadataUrlFromChallenge } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export declare function mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string | null | undefined): string | undefined;
```

### 调用签名

```text
mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string | null | undefined): string | undefined
```

Extracts RFC 9728 metadata discovery from an MCP Bearer challenge.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `wwwAuthenticate` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `redactMCPOAuthSecrets`

Redact MCPO Auth Secrets 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { redactMCPOAuthSecrets } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export declare function redactMCPOAuthSecrets<T>(value: T): T;
```

### 调用签名

```text
redactMCPOAuthSecrets<T>(value: T): T
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>T</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `T`
- 说明: 返回值契约由上述类型定义。

## `MCPAuthorizationServerMetadata`

MCP Authorization Server Metadata 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPAuthorizationServerMetadata } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export interface MCPAuthorizationServerMetadata {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    code_challenge_methods_supported: string[];
    grant_types_supported?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorization_endpoint` | 属性 | <code>authorization_endpoint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code_challenge_methods_supported` | 属性 | <code>code_challenge_methods_supported: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `grant_types_supported` | 属性 | <code>grant_types_supported?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issuer` | 属性 | <code>issuer: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `token_endpoint` | 属性 | <code>token_endpoint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPOAuth21ClientOptions`

MCPO Auth21 Client Options 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPOAuth21ClientOptions } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export interface MCPOAuth21ClientOptions {
    resource: string;
    clientId: string;
    redirectUri: string;
    fetch?: typeof fetch;
    metadataUrl?: string;
    /** Selects one server advertised by RFC 9728 metadata; defaults to the first. */
    authorizationServer?: string;
    timeoutMs?: number;
    now?: () => number;
    randomBytes?: (size: number) => Uint8Array;
    /**
     * Intended only for an in-process acceptance server. Production callers
     * must leave this disabled so OAuth metadata and token traffic require TLS.
     */
    allowInsecureLoopbackForAcceptance?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureLoopbackForAcceptance` | 属性 | <code>allowInsecureLoopbackForAcceptance?: boolean</code> | Intended only for an in-process acceptance server. Production callers must leave this disabled so OAuth metadata and token traffic require TLS. |
| `authorizationServer` | 属性 | <code>authorizationServer?: string</code> | Selects one server advertised by RFC 9728 metadata; defaults to the first. |
| `clientId` | 属性 | <code>clientId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `metadataUrl` | 属性 | <code>metadataUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `randomBytes` | 方法 | <code>randomBytes?(size: number): Uint8Array</code> | 公开方法；参数与返回类型以签名列为准。 |
| `redirectUri` | 属性 | <code>redirectUri: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resource` | 属性 | <code>resource: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPOAuthAuthorizationRequest`

MCPO Auth Authorization Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPOAuthAuthorizationRequest } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export interface MCPOAuthAuthorizationRequest {
    url: string;
    state: string;
    codeVerifier: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `codeVerifier` | 属性 | <code>codeVerifier: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPOAuthTokenSet`

MCPO Auth Token Set 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPOAuthTokenSet } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export interface MCPOAuthTokenSet {
    accessToken: string;
    refreshToken?: string;
    tokenType: 'Bearer';
    expiresAt: number;
    scope?: string;
    resource: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | 属性 | <code>accessToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshToken` | 属性 | <code>refreshToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resource` | 属性 | <code>resource: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenType` | 属性 | <code>tokenType: "Bearer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPProtectedResourceMetadata`

MCP Protected Resource Metadata 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPProtectedResourceMetadata } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### 声明

```text
export interface MCPProtectedResourceMetadata {
    resource: string;
    authorization_servers: string[];
    bearer_methods_supported?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorization_servers` | 属性 | <code>authorization_servers: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bearer_methods_supported` | 属性 | <code>bearer_methods_supported?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resource` | 属性 | <code>resource: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
