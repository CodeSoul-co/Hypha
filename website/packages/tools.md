# `@codesoul-co/hypha-tools`

`hypha-tools` separates a typed Tool contract from its implementation and wraps execution with authorization, validation, timeout, cancellation, idempotency, caching, approval, receipts and trace evidence.

```bash
npm install @codesoul-co/hypha-tools@1.0.1
```

## Main surfaces

| Export | Use |
| --- | --- |
| `ToolSpec` / `toolSpecDefinition` | Versioned input/output and governance contract |
| `ToolRegistry` | Register specs and local handlers |
| `ToolRunner` | Governed execution interface used by Kernel/Harness |
| `GovernedToolRunner` | Policy, approval and durable invocation path |
| `ToolAuthorizer` | Decide whether a principal may execute a Tool |
| `ToolInvocationStore` | Persist invocation status and receipts |
| `ToolAdapterFactoryRegistry` | Construct HTTP, MCP, plugin or local adapters |
| `ExecutionToolAdapter` | Route command/sandbox work through execution contracts |

## Register a typed Tool

```ts
import {
  ToolRegistry,
  toolSpecDefinition,
} from '@codesoul-co/hypha-tools';

const spec = toolSpecDefinition.parse({
  ...toolSpecDefinition.example,
  id: 'tool.lookup',
  version: '1.0.0',
  name: 'lookup',
  sideEffectLevel: 'read',
});

const tools = new ToolRegistry();
tools.register(spec, async (input) => ({
  input,
  source: 'local-index',
}));
```

The registry example is suitable for deterministic local use. In production, execute through the governed runner so validation and evidence cannot be bypassed.

## Governed execution path

```text
resolve Tool id/version
  → validate principal and scope
  → validate input schema
  → policy / human approval
  → idempotency and cache check
  → adapter execution with deadline/cancellation
  → validate/bound output
  → receipt, artifacts, Event and trace
```

`sideEffectLevel` is an input to governance, not a substitute for policy. File writes, commands, network requests and external writes need explicit scope and adapter restrictions.

## Adapters and common Tools

The package includes local-function, HTTP, MCP, plugin and execution adapter contracts plus controlled text/JSON/hash/time helpers. Application composition supplies credentials and concrete ports. Host paths and secret values must never come directly from model-generated input.

## Idempotency and uncertain outcomes

Assign a stable operation/invocation identity before executing an effect. If the worker crashes after dispatch, reconcile the durable invocation/receipt instead of blindly repeating the call. Late results, cancellation and approval decisions have explicit terminal states.

## Tests

Assert schema rejection, denied access, approval, timeout, cancellation, output limits, duplicate idempotency keys and receipt reconciliation. A mock handler returning its input is not sufficient unless the test also verifies the governed boundary.

Use [`hypha-mcp`](./mcp) for MCP discovery/connection and [`hypha-harness`](./harness) for runtime evidence.

