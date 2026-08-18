# `@codesoul-co/hypha-mcp` / `oauth`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/oauth.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MCPOAuth21Client` | class | <code>new MCPOAuth21Client(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | Runtime implementation for MCPO Auth21 Client; see its public constructor and members below. |
| `mcpProtectedResourceMetadataUrlFromChallenge` | function | <code>mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string &#124; null &#124; undefined): string &#124; undefined</code> | Extracts RFC 9728 metadata discovery from an MCP Bearer challenge. |
| `redactMCPOAuthSecrets` | function | <code>redactMCPOAuthSecrets&lt;T&gt;(value: T): T</code> | Public runtime operation for redact MCPO Auth Secrets. |
| `MCPAuthorizationServerMetadata` | interface | <code>interface MCPAuthorizationServerMetadata</code> | Field contract for MCP Authorization Server Metadata; see all contract members below. |
| `MCPOAuth21ClientOptions` | interface | <code>interface MCPOAuth21ClientOptions</code> | Field contract for MCPO Auth21 Client Options; see all contract members below. |
| `MCPOAuthAuthorizationRequest` | interface | <code>interface MCPOAuthAuthorizationRequest</code> | Field contract for MCPO Auth Authorization Request; see all contract members below. |
| `MCPOAuthTokenSet` | interface | <code>interface MCPOAuthTokenSet</code> | Field contract for MCPO Auth Token Set; see all contract members below. |
| `MCPProtectedResourceMetadata` | interface | <code>interface MCPProtectedResourceMetadata</code> | Field contract for MCP Protected Resource Metadata; see all contract members below. |

## `MCPOAuth21Client` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorizationHeader` | method | <code>authorizationHeader(minimumValidityMs?: number): Promise&lt;string&gt;</code> | Public runtime operation for authorization Header. |
| `clear` | method | <code>clear(): void</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | Creates an instance of this class. |
| `createAuthorizationRequest` | method | <code>createAuthorizationRequest(state?: string): Promise&lt;MCPOAuthAuthorizationRequest&gt;</code> | Creates Authorization Request at this module boundary. |
| `discover` | method | <code>discover(): Promise&lt;{ protectedResource: MCPProtectedResourceMetadata; authorizationServer: MCPAuthorizationServerMetadata; }&gt;</code> | Public runtime operation for discover. |
| `exchangeAuthorizationCode` | method | <code>exchangeAuthorizationCode(input: { code: string; codeVerifier: string; state: string; expectedState: string; }): Promise&lt;MCPOAuthTokenSet&gt;</code> | Public runtime operation for exchange Authorization Code. |
| `refresh` | method | <code>refresh(): Promise&lt;MCPOAuthTokenSet&gt;</code> | Public runtime operation for refresh. |

## `MCPAuthorizationServerMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorization_endpoint` | property | <code>authorization_endpoint: string</code> | Public authorization endpoint property. |
| `code_challenge_methods_supported` | property | <code>code_challenge_methods_supported: string[]</code> | Public code challenge methods supported property. |
| `grant_types_supported` | property | <code>grant_types_supported: string[]</code> | Public grant types supported property. |
| `issuer` | property | <code>issuer: string</code> | Public issuer property. |
| `token_endpoint` | property | <code>token_endpoint: string</code> | Public token endpoint property. |

## `MCPOAuth21ClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureLoopbackForAcceptance` | property | <code>allowInsecureLoopbackForAcceptance: boolean</code> | Intended only for an in-process acceptance server. Production callers must leave this disabled so OAuth metadata and token traffic require TLS. |
| `authorizationServer` | property | <code>authorizationServer: string</code> | Selects one server advertised by RFC 9728 metadata; defaults to the first. |
| `clientId` | property | <code>clientId: string</code> | Public client Id property. |
| `fetch` | method | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public runtime operation for fetch. |
| `metadataUrl` | property | <code>metadataUrl: string</code> | Public metadata Url property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `randomBytes` | method | <code>randomBytes(size: number): Uint8Array</code> | Public runtime operation for random Bytes. |
| `redirectUri` | property | <code>redirectUri: string</code> | Public redirect Uri property. |
| `resource` | property | <code>resource: string</code> | Public resource property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `MCPOAuthAuthorizationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `codeVerifier` | property | <code>codeVerifier: string</code> | Public code Verifier property. |
| `state` | property | <code>state: string</code> | Public state property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `MCPOAuthTokenSet` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessToken` | property | <code>accessToken: string</code> | Public access Token property. |
| `expiresAt` | property | <code>expiresAt: number</code> | Public expires At property. |
| `refreshToken` | property | <code>refreshToken: string</code> | Public refresh Token property. |
| `resource` | property | <code>resource: string</code> | Public resource property. |
| `scope` | property | <code>scope: string</code> | Public scope property. |
| `tokenType` | property | <code>tokenType: "Bearer"</code> | Public token Type property. |

## `MCPProtectedResourceMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorization_servers` | property | <code>authorization_servers: string[]</code> | Public authorization servers property. |
| `bearer_methods_supported` | property | <code>bearer_methods_supported: string[]</code> | Public bearer methods supported property. |
| `resource` | property | <code>resource: string</code> | Public resource property. |
