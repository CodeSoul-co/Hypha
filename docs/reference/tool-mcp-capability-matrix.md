# Tool and MCP Capability Matrix

| Area | Implemented surface | Primary evidence |
| --- | --- | --- |
| Adapters | Local, Plugin, Mock, HTTP, MCP under one contract | `adapter-contract.test.ts` |
| Governance | Schema, permission, policy, approval/resume, timeout, retry, cancel | `tools.test.ts` |
| Reliability | Idempotency, CAS decisions, receipt reconciliation, restart recovery | Tool and local-store tests |
| Output | Output validation, truncation/artifactization, audit redaction | Tool and adapter tests |
| Cache/Memory | Revision-aware read cache and provenance observation port | `tools.test.ts` |
| MCP transport | stdio and Streamable HTTP, negotiation, pagination, cancel, reconnect, cleanup | `mcp.test.ts` |
| MCP catalog | Trust, canonical hash, schema cache, drift, quarantine, approval, lazy load | `mcp.test.ts` |
| Stable Runs | Immutable Tool contract snapshot and replay references | MCP, Harness, Server tests |
| Domain/Runtime | Tool profiles, state bindings, Tool Activity, human-review wait/resume | Domain, Kernel, Harness tests |
| Server | Tool, Invocation, Approval, MCP status/capability/drift commands | Integration tests |
| Generic media | OCR and video-source contracts; providers stay in business projects | Tool and LexPlan tests |
| Observability | Tool/MCP metrics and structured events with hashes/references | Tool/MCP tests |

Contract exports include TypeScript, Zod, JSON Schema, examples, and definitions for governed Tool,
Invocation, Approval, Tool snapshot/event payload, governed MCP integration, connection/capability
records, and normalized MCP errors.
