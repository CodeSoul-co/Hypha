# ADR 0005: Provider-Enforced Execution Network Policy

## Status

Accepted

## Context

Domain-name checks inside executed code cannot prevent direct IP access, redirects, alternate DNS
answers, DNS rebinding, private-network access, or cloud metadata access. Network authority must be
enforced independently of the workload and must be revocable when an execution ends.

## Decision

1. Execution network access is disabled by default. `restricted`, `enabled`, and
   `task_authorized` are explicit policy modes; they are not inferred from a command or Tool name.
2. Disabled and restricted policies are enforced by the Sandbox Provider, network namespace,
   firewall, or governed egress proxy. Application-only URL validation is insufficient.
3. Restricted access evaluates protocol, destination domain, resolved IP or CIDR, port, private
   network, metadata endpoint, DNS policy, connection count, and byte limits. DNS may be resolved
   and pinned to prevent rebinding.
4. Task authorization is bound to execution, principal, policy hash, destination scope, and a
   bounded expiry. Authorization is revoked during termination and cleanup.
5. Events record bounded authorization decisions, policy hashes, destination classes, expiry, and
   revocation evidence. They do not record credentials, authorization headers, or secret query
   values.
6. A provider that cannot enforce the selected mode reports `networkIsolation: false`. Capability
   negotiation rejects it before any side effect when network isolation is required.

## Consequences

- Local process execution cannot claim restricted or disabled networking without an external
  enforcement mechanism.
- Container and remote adapters require provider-specific network policy tests, including DNS
  rebinding, redirects, private ranges, metadata endpoints, IPv4 and IPv6, and cleanup.
- Cache fingerprints include the effective network-policy hash, and cache reuse cannot broaden the
  original execution's network authority.
