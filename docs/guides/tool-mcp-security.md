# Tool and MCP Security Guide

## Trust Decisions

Keep these decisions independent: server identity trust, capability trust, principal permission,
side-effect policy, and human approval. A trusted server does not make every capability safe. MCP
annotations and read hints remain untrusted unless an administrator or Domain policy accepts them.

## Secrets and Sensitive Data

- Store credentials outside ToolSpec and DomainPack; pass only `authorizationRef` or another secret
  reference to an adapter factory.
- Never include authorization headers, raw secrets, sensitive input paths, or large output in events.
- Configure `sensitivePaths`, `redactedPaths`, and audit inclusion rules before production use.
- Artifact storage and Invocation stores require deployment-appropriate access control and retention.

## Side Effects

Declare `none`, `read`, `write`, `external_effect`, or `irreversible` from an approved source. Write
and irreversible capabilities require explicit policy and may require approval. Retry only when the
contract is idempotent or an external receipt reconciler proves the prior attempt was not committed.

## MCP Drift

Pin server identity, protocol versions, and capability hashes where possible. Schema or identity
drift should quarantine or require approval. Active Runs continue with their immutable snapshot;
new Runs may select only approved revisions.

## Operations

Monitor Tool denial, timeout, retry, late-result, approval, idempotency, MCP reconnect, connection
failure, capability drift, and quarantine metrics. Treat `conflict` as an operator reconciliation
state, not a retryable error.
