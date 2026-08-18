# `@codesoul-co/hypha-tools` / `common-tool-ports`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/common-tool-ports.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)
- Exports: **14**

## Using this module

Use the Common tool ports module for defining or implementing provider-neutral ports. It exports 9 constants, 1 function, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  artifactUtilityToolSpec,
  commandUtilityToolSpec,
  commonPortToolSpecs,
  fileUtilityToolSpec,
  hashReferenceUtilityToolSpec,
  httpFetchUtilityToolSpec,
  mcpResourceUtilityToolSpec,
  memoryUtilityToolSpec,
} from '@codesoul-co/hypha-tools';

import type {
  CommonToolBinding,
  CommonToolPort,
  CommonToolPortRequest,
  CommonToolPorts,
} from '@codesoul-co/hypha-tools';

// The complete export list is documented below.
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 9 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactUtilityToolSpec` | constant | <code>const artifactUtilityToolSpec: ToolSpec</code> | Artifact Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `commandUtilityToolSpec` | constant | <code>const commandUtilityToolSpec: ToolSpec</code> | Command Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `commonPortToolSpecs` | constant | <code>const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | Common Port Tool Specs constant exported by the `common-tool-ports` module. |
| `fileUtilityToolSpec` | constant | <code>const fileUtilityToolSpec: ToolSpec</code> | File Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `hashReferenceUtilityToolSpec` | constant | <code>const hashReferenceUtilityToolSpec: ToolSpec</code> | Hash Reference Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `httpFetchUtilityToolSpec` | constant | <code>const httpFetchUtilityToolSpec: ToolSpec</code> | Http Fetch Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `mcpResourceUtilityToolSpec` | constant | <code>const mcpResourceUtilityToolSpec: ToolSpec</code> | MCP Resource Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `memoryUtilityToolSpec` | constant | <code>const memoryUtilityToolSpec: ToolSpec</code> | Memory Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `searchUtilityToolSpec` | constant | <code>const searchUtilityToolSpec: ToolSpec</code> | Search Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `createPortBackedCommonToolBindings` | function | <code>createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]</code> | Create Port Backed Common Tool Bindings function with 1 public call signature; parameters and return types are listed below. |
| `CommonToolBinding` | interface | <code>interface CommonToolBinding</code> | Common Tool Binding interface with 2 public fields or methods. |
| `CommonToolPort` | interface | <code>interface CommonToolPort</code> | Common Tool Port interface with 1 public fields or methods. |
| `CommonToolPortRequest` | interface | <code>interface CommonToolPortRequest</code> | Common Tool Port Request interface with 3 public fields or methods. |
| `CommonToolPorts` | interface | <code>interface CommonToolPorts</code> | Common Tool Ports interface with 8 public fields or methods. |

## `artifactUtilityToolSpec`

Artifact Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { artifactUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const artifactUtilityToolSpec: ToolSpec;
```

## `commandUtilityToolSpec`

Command Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { commandUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const commandUtilityToolSpec: ToolSpec;
```

## `commonPortToolSpecs`

Common Port Tool Specs constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { commonPortToolSpecs } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec];
```

## `fileUtilityToolSpec`

File Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { fileUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const fileUtilityToolSpec: ToolSpec;
```

## `hashReferenceUtilityToolSpec`

Hash Reference Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { hashReferenceUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const hashReferenceUtilityToolSpec: ToolSpec;
```

## `httpFetchUtilityToolSpec`

Http Fetch Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { httpFetchUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const httpFetchUtilityToolSpec: ToolSpec;
```

## `mcpResourceUtilityToolSpec`

MCP Resource Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { mcpResourceUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const mcpResourceUtilityToolSpec: ToolSpec;
```

## `memoryUtilityToolSpec`

Memory Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { memoryUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const memoryUtilityToolSpec: ToolSpec;
```

## `searchUtilityToolSpec`

Search Utility Tool Spec constant exported by the `common-tool-ports` module.

- Kind: constant
- Import: `import { searchUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare const searchUtilityToolSpec: ToolSpec;
```

## `createPortBackedCommonToolBindings`

Create Port Backed Common Tool Bindings function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createPortBackedCommonToolBindings } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export declare function createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[];
```

### Call signature

```text
createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ports` | <code>CommonToolPorts</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CommonToolBinding[]`
- Description: The return contract is defined by the type shown above.

## `CommonToolBinding`

Common Tool Binding interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { CommonToolBinding } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export interface CommonToolBinding {
    spec: ToolSpec;
    adapter: ToolAdapter;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommonToolPort`

Common Tool Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { CommonToolPort } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export interface CommonToolPort {
    execute(request: CommonToolPortRequest): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: CommonToolPortRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `CommonToolPortRequest`

Common Tool Port Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CommonToolPortRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export interface CommonToolPortRequest {
    operation: string;
    input: Record<string, unknown>;
    context: ToolCallContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommonToolPorts`

Common Tool Ports interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { CommonToolPorts } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### Declaration

```text
export interface CommonToolPorts {
    files: CommonToolPort;
    artifacts: CommonToolPort;
    httpFetch: CommonToolPort;
    search: CommonToolPort;
    memory: CommonToolPort;
    command: CommonToolPort;
    mcpResource: CommonToolPort;
    hashReference: CommonToolPort;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `files` | property | <code>files: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hashReference` | property | <code>hashReference: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `httpFetch` | property | <code>httpFetch: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpResource` | property | <code>mcpResource: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memory` | property | <code>memory: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | property | <code>search: CommonToolPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
