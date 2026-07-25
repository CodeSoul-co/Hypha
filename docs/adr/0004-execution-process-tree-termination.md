# ADR 0004: Execution Process-Tree Termination

## Status

Accepted

## Context

Terminating only the command's direct child can leave grandchildren, daemons, open files, sockets,
and resource consumption behind. Node timeout or abort behavior alone does not provide the same
guarantee across Unix, Windows, containers, and remote providers. Cleanup and terminal execution
state are therefore inseparable from the provider's termination scope.

## Decision

1. Every non-mock executable provider establishes a termination scope before the command is
   considered started: a Unix process group, Windows Job Object, container, or remote-provider
   execution scope.
2. Normal completion, cancellation, timeout, sandbox termination, provider failure, and runtime
   shutdown all reconcile that scope. Cancellation first requests graceful termination, then uses a
   bounded forced-termination phase.
3. A terminal command result is not published until the provider has either confirmed descendant
   termination and cleanup or recorded an explicit unresolved recovery state with provider receipt
   evidence.
4. Shell execution remains disabled by default. Executable and argument arrays do not replace the
   process-tree requirement.
5. Providers that cannot guarantee descendant termination report `processTreeKill: false` and are
   rejected whenever runtime-derived requirements include process-tree kill.
6. Terminate and cleanup operations are idempotent, fenced against stale workers, and safe to retry
   during recovery.

## Consequences

- Local implementations need platform-specific supervision rather than a direct-child `kill()`
  call.
- Container adapters stop the container, wait for a bounded grace period, force-kill it when
  needed, and remove all execution-owned resources.
- Remote adapters retain queryable execution identifiers and receipts so cancellation can be
  reconciled after client or network failure.
- Cleanup latency is part of the execution timeout and observability model.
