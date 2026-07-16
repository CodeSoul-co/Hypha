# Tool and MCP Capability Matrix

| Area                    | Public surface                                                                                          | Runtime guarantee                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Adapters                | `LocalFunctionToolAdapter`, `PluginToolAdapter`, `MockToolAdapter`, `HttpToolAdapter`, `MCPToolAdapter` | Provider and transport details stay behind one `ToolAdapter` contract.                                           |
| Governance              | `ToolSpec`, `GovernedToolContractSpec`, `GovernedToolRunner`                                            | Input/output validation, permissions, policy, approval, audit, timeout, retry, and cancellation run on one path. |
| Invocation reliability  | `ToolInvocationStore`, `ToolApprovalStore`, recovery and reconciliation ports                           | Idempotency is scope-aware; approval is revision-checked; unknown side-effect commit state becomes `conflict`.   |
| Output and observations | Artifact and observation ports                                                                          | Oversized output can become an artifact; observation records retain hashes and provenance.                       |
| Result reuse            | `ToolResultCache` and cache-validity records                                                            | Reuse is revision-, policy-, scope-, and validity-aware and is restricted to permitted side-effect levels.       |
| MCP transport           | stdio and Streamable HTTP connection sessions                                                           | Initialization, pagination, cancellation, health, reconnect, and cleanup stay in the MCP boundary.               |
| MCP catalog             | Capability catalog, trust and drift records, schema cache                                               | Capability revisions are canonicalized; drift can require approval or quarantine.                                |
| Stable Runs             | Tool contract snapshot store                                                                            | Active and replayed Runs resolve the immutable contract snapshot selected at Run start.                          |
| Domain and FSM          | `ToolProfileSpec` and workflow state bindings                                                           | Only selected profile/state Tools are loaded; state denies take precedence over all allow sources.               |
| Server API              | Tool execution, Invocation, Approval, MCP server/capability/drift routes                                | HTTP commands delegate to the governed runner and event-first runtime.                                           |
| Observability           | Tool/MCP events, telemetry, audit payloads                                                              | Events carry governed hashes, references, attempts, decisions, and redacted values according to audit policy.    |

Contract exports include TypeScript types, Zod validators, JSON Schema, examples, and definitions
for governed Tools, Invocations, approvals, snapshots, events, MCP integrations, connections,
capabilities, drift records, and normalized errors.
