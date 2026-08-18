# `@codesoul-co/hypha-mcp` / `oauth`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/oauth.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)
- Exports: **8**

## Using this module

Use the Oauth module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 functions, 5 interfaces.

### Import from the package entrypoint

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

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MCPOAuth21Client` | class | <code>new MCPOAuth21Client(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | MCPO Auth21 Client class with 7 public constructor or member entries; its exact declarations are listed below. |
| `mcpProtectedResourceMetadataUrlFromChallenge` | function | <code>mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string &#124; null &#124; undefined): string &#124; undefined</code> | Extracts RFC 9728 metadata discovery from an MCP Bearer challenge. |
| `redactMCPOAuthSecrets` | function | <code>redactMCPOAuthSecrets&lt;T&gt;(value: T): T</code> | Redact MCPO Auth Secrets function with 1 public call signature; parameters and return types are listed below. |
| `MCPAuthorizationServerMetadata` | interface | <code>interface MCPAuthorizationServerMetadata</code> | MCP Authorization Server Metadata interface with 5 public fields or methods. |
| `MCPOAuth21ClientOptions` | interface | <code>interface MCPOAuth21ClientOptions</code> | MCPO Auth21 Client Options interface with 10 public fields or methods. |
| `MCPOAuthAuthorizationRequest` | interface | <code>interface MCPOAuthAuthorizationRequest</code> | MCPO Auth Authorization Request interface with 3 public fields or methods. |
| `MCPOAuthTokenSet` | interface | <code>interface MCPOAuthTokenSet</code> | MCPO Auth Token Set interface with 6 public fields or methods. |
| `MCPProtectedResourceMetadata` | interface | <code>interface MCPProtectedResourceMetadata</code> | MCP Protected Resource Metadata interface with 3 public fields or methods. |

## `MCPOAuth21Client`

MCPO Auth21 Client class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MCPOAuth21Client } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorizationHeader` | method | <code>authorizationHeader(minimumValidityMs?: number): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `clear` | method | <code>clear(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MCPOAuth21ClientOptions): MCPOAuth21Client</code> | Creates an instance of this class. |
| `createAuthorizationRequest` | method | <code>createAuthorizationRequest(state?: string): Promise&lt;MCPOAuthAuthorizationRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `discover` | method | <code>discover(): Promise&lt;{ protectedResource: MCPProtectedResourceMetadata; authorizationServer: MCPAuthorizationServerMetadata; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `exchangeAuthorizationCode` | method | <code>exchangeAuthorizationCode(input: { code: string; codeVerifier: string; state: string; expectedState: string; }): Promise&lt;MCPOAuthTokenSet&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `refresh` | method | <code>refresh(): Promise&lt;MCPOAuthTokenSet&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `mcpProtectedResourceMetadataUrlFromChallenge`

Extracts RFC 9728 metadata discovery from an MCP Bearer challenge.

- Kind: function
- Import: `import { mcpProtectedResourceMetadataUrlFromChallenge } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

```text
export declare function mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string | null | undefined): string | undefined;
```

### Call signature

```text
mcpProtectedResourceMetadataUrlFromChallenge(wwwAuthenticate: string | null | undefined): string | undefined
```

Extracts RFC 9728 metadata discovery from an MCP Bearer challenge.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `wwwAuthenticate` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `redactMCPOAuthSecrets`

Redact MCPO Auth Secrets function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { redactMCPOAuthSecrets } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

```text
export declare function redactMCPOAuthSecrets<T>(value: T): T;
```

### Call signature

```text
redactMCPOAuthSecrets<T>(value: T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.

## `MCPAuthorizationServerMetadata`

MCP Authorization Server Metadata interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MCPAuthorizationServerMetadata } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

```text
export interface MCPAuthorizationServerMetadata {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    code_challenge_methods_supported: string[];
    grant_types_supported?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorization_endpoint` | property | <code>authorization_endpoint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code_challenge_methods_supported` | property | <code>code_challenge_methods_supported: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `grant_types_supported` | property | <code>grant_types_supported?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issuer` | property | <code>issuer: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `token_endpoint` | property | <code>token_endpoint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPOAuth21ClientOptions`

MCPO Auth21 Client Options interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MCPOAuth21ClientOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureLoopbackForAcceptance` | property | <code>allowInsecureLoopbackForAcceptance?: boolean</code> | Intended only for an in-process acceptance server. Production callers must leave this disabled so OAuth metadata and token traffic require TLS. |
| `authorizationServer` | property | <code>authorizationServer?: string</code> | Selects one server advertised by RFC 9728 metadata; defaults to the first. |
| `clientId` | property | <code>clientId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `metadataUrl` | property | <code>metadataUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `randomBytes` | method | <code>randomBytes?(size: number): Uint8Array</code> | Public method; parameters and return type are shown in the signature. |
| `redirectUri` | property | <code>redirectUri: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resource` | property | <code>resource: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPOAuthAuthorizationRequest`

MCPO Auth Authorization Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPOAuthAuthorizationRequest } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

```text
export interface MCPOAuthAuthorizationRequest {
    url: string;
    state: string;
    codeVerifier: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `codeVerifier` | property | <code>codeVerifier: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPOAuthTokenSet`

MCPO Auth Token Set interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPOAuthTokenSet } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessToken` | property | <code>accessToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshToken` | property | <code>refreshToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resource` | property | <code>resource: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenType` | property | <code>tokenType: "Bearer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPProtectedResourceMetadata`

MCP Protected Resource Metadata interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPProtectedResourceMetadata } from '@codesoul-co/hypha-mcp';`
- Source module: [`oauth`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts)

### Declaration

```text
export interface MCPProtectedResourceMetadata {
    resource: string;
    authorization_servers: string[];
    bearer_methods_supported?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorization_servers` | property | <code>authorization_servers: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bearer_methods_supported` | property | <code>bearer_methods_supported?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resource` | property | <code>resource: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
