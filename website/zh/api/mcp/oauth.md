# `@codesoul-co/hypha-mcp` / `oauth`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/oauth.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MCPOAuth21Client` | 类 | <code>new MCPOAuth21Client(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | MCPO Auth21 Client 的运行时实现；公开构造函数与成员见下表。 |
| `mcpProtectedResourceMetadataUrlFromChallenge` | 函数 | <code>mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string &#124; null &#124; undefined): string &#124; undefined</code> | Extracts RFC 9728 metadata discovery from an MCP Bearer challenge. |
| `redactMCPOAuthSecrets` | 函数 | <code>redactMCPOAuthSecrets&lt;T&gt;(value: T): T</code> | redact MCPO Auth Secrets 的公开运行时操作。 |
| `MCPAuthorizationServerMetadata` | 接口 | <code>interface MCPAuthorizationServerMetadata</code> | MCP Authorization Server Metadata 的字段契约；完整字段见下表。 |
| `MCPOAuth21ClientOptions` | 接口 | <code>interface MCPOAuth21ClientOptions</code> | MCPO Auth21 Client Options 的字段契约；完整字段见下表。 |
| `MCPOAuthAuthorizationRequest` | 接口 | <code>interface MCPOAuthAuthorizationRequest</code> | MCPO Auth Authorization Request 的字段契约；完整字段见下表。 |
| `MCPOAuthTokenSet` | 接口 | <code>interface MCPOAuthTokenSet</code> | MCPO Auth Token Set 的字段契约；完整字段见下表。 |
| `MCPProtectedResourceMetadata` | 接口 | <code>interface MCPProtectedResourceMetadata</code> | MCP Protected Resource Metadata 的字段契约；完整字段见下表。 |

## `MCPOAuth21Client` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorizationHeader` | 方法 | <code>authorizationHeader(minimumValidityMs?: number): Promise&lt;string&gt;</code> | authorization Header 的公开运行时操作。 |
| `clear` | 方法 | <code>clear(): void</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | 创建该类的实例。 |
| `createAuthorizationRequest` | 方法 | <code>createAuthorizationRequest(state?: string): Promise&lt;MCPOAuthAuthorizationRequest&gt;</code> | 创建 Authorization Request。 |
| `discover` | 方法 | <code>discover(): Promise&lt;{ protectedResource: MCPProtectedResourceMetadata; authorizationServer: MCPAuthorizationServerMetadata; }&gt;</code> | discover 的公开运行时操作。 |
| `exchangeAuthorizationCode` | 方法 | <code>exchangeAuthorizationCode(input: { code: string; codeVerifier: string; state: string; expectedState: string; }): Promise&lt;MCPOAuthTokenSet&gt;</code> | exchange Authorization Code 的公开运行时操作。 |
| `refresh` | 方法 | <code>refresh(): Promise&lt;MCPOAuthTokenSet&gt;</code> | refresh 的公开运行时操作。 |

## `MCPAuthorizationServerMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorization_endpoint` | 属性 | <code>authorization_endpoint: string</code> | authorization endpoint 字段。 |
| `code_challenge_methods_supported` | 属性 | <code>code_challenge_methods_supported: string[]</code> | code challenge methods supported 字段。 |
| `grant_types_supported` | 属性 | <code>grant_types_supported: string[]</code> | grant types supported 字段。 |
| `issuer` | 属性 | <code>issuer: string</code> | issuer 字段。 |
| `token_endpoint` | 属性 | <code>token_endpoint: string</code> | token endpoint 字段。 |

## `MCPOAuth21ClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureLoopbackForAcceptance` | 属性 | <code>allowInsecureLoopbackForAcceptance: boolean</code> | Intended only for an in-process acceptance server. Production callers must leave this disabled so OAuth metadata and token traffic require TLS. |
| `authorizationServer` | 属性 | <code>authorizationServer: string</code> | Selects one server advertised by RFC 9728 metadata; defaults to the first. |
| `clientId` | 属性 | <code>clientId: string</code> | client Id 字段。 |
| `fetch` | 方法 | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | fetch 的公开运行时操作。 |
| `metadataUrl` | 属性 | <code>metadataUrl: string</code> | metadata Url 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `randomBytes` | 方法 | <code>randomBytes(size: number): Uint8Array</code> | random Bytes 的公开运行时操作。 |
| `redirectUri` | 属性 | <code>redirectUri: string</code> | redirect Uri 字段。 |
| `resource` | 属性 | <code>resource: string</code> | resource 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `MCPOAuthAuthorizationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `codeVerifier` | 属性 | <code>codeVerifier: string</code> | code Verifier 字段。 |
| `state` | 属性 | <code>state: string</code> | state 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `MCPOAuthTokenSet` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | 属性 | <code>accessToken: string</code> | access Token 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: number</code> | expires At 字段。 |
| `refreshToken` | 属性 | <code>refreshToken: string</code> | refresh Token 字段。 |
| `resource` | 属性 | <code>resource: string</code> | resource 字段。 |
| `scope` | 属性 | <code>scope: string</code> | scope 字段。 |
| `tokenType` | 属性 | <code>tokenType: "Bearer"</code> | token Type 字段。 |

## `MCPProtectedResourceMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorization_servers` | 属性 | <code>authorization_servers: string[]</code> | authorization servers 字段。 |
| `bearer_methods_supported` | 属性 | <code>bearer_methods_supported: string[]</code> | bearer methods supported 字段。 |
| `resource` | 属性 | <code>resource: string</code> | resource 字段。 |
