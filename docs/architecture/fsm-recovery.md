# FSM Anomaly Recovery

Hypha models recovery as explicit FSM behavior. A failed provider call does not authorize an
unbounded retry loop, and a caught exception does not automatically mean the run should enter
`Failed`. Runtime code first normalizes the anomaly, evaluates a bounded recovery policy, records
the decision, and then performs an allowed FSM transition.

## Recovery States

The default ReAct process and every compiled Domain workflow include the same recovery envelope:

```text
normal state
  ├─ retry | reconcile | fallback | degrade | wait -> Recovering -> original state
  ├─ committed side effect -> Compensating -> HumanReview | Quarantined | Failed
  ├─ unknown commit without reconciliation -> Quarantined -> HumanReview | Failed | Cancelled
  └─ corrected input or authority required -> HumanReview -> work state | Failed | Cancelled
```

`Recovering` is an explicit scheduling boundary. Delayed work suspends by default; a deployment may
inject a scheduler and bounded `maxInlineDelayMs` when an in-process delay is appropriate.
`Compensating` never guesses how to undo a side effect. The caller must provide an idempotent
compensation function. `Quarantined` preserves evidence when the external commit state or an
invariant is uncertain. `Failed` and `Cancelled` remain terminal.

## Shared Recovery Supervisor

`runFSMRecoveryLoop()` governs one operation. `runRecoverySupervisor()` coordinates multiple
`RecoveryParticipant` records, such as Memory -> Inference -> Tool -> Execution -> Storage, through
one FSM recovery case. Each participant declares its module, dependencies, execute/classify
functions, and only the recovery handlers it can safely perform: `reconcile`, `fallback`, `degrade`,
or `compensate`.

The supervisor retains completed outputs and never reruns a completed upstream participant. A
failure fingerprint identifies the operation, root dependency, input, and policy/spec/provider
revisions. Progress is accepted only when stable evidence changes: provider state, durable receipt,
revision, output hash, checksum, fencing token, or another explicit marker. Repeating the same
fingerprint and evidence consumes the no-progress budget instead of resetting the loop.

`RecoveryConvergencePolicy` independently bounds total cycles, unchanged-evidence cycles, repeats
of the same strategy, and elapsed time. Defaults are eight cycles, two no-progress cycles, two
same-strategy attempts, and five minutes. After no progress the supervisor chooses only an
available fallback/degradation path or the configured review/quarantine/failure escalation.

## Anomaly Contract

`FSMAnomaly` separates four questions that must not be collapsed into an exception message:

| Field             | Meaning                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`          | Framework surface that observed the anomaly: FSM, inference, tool, memory, execution, MCP, workspace, storage, message bus, cache, policy, domain, or unknown.        |
| `category`        | Stable recovery class such as validation, rate limit, timeout, transient dependency, concurrency conflict, resource exhaustion, invariant violation, or cancellation. |
| `retryable`       | Explicit provider or adapter evidence that another attempt is meaningful. Policy can still deny a retry.                                                              |
| `sideEffectState` | `none`, `not_started`, `committed`, or `unknown`. Unknown external commit state always takes precedence over retryability.                                            |

`classifyFSMAnomaly()` recognizes common error codes and HTTP statuses. Adapters should supply a
more precise category, `retryAfterMs`, `circuitKey`, and side-effect evidence whenever those facts
are available.

## Module Failure Matrix

| Module or capability                   | Typical anomalies                                                                                               | Preferred FSM response                                                                                                | Required evidence and constraints                                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Specs, DomainPack compiler, FSM guards | Missing refs, invalid schema, duplicate states/transitions, rejected guard, unsafe pattern                      | Correct input or configuration; `HumanReview` or `Failed`; invariant mismatch may be `Quarantined`                    | Do not retry deterministic validation failures. Persist the rejected spec/version and guard context without secrets.                       |
| Persisted FSM state                    | Process/run mismatch, path/current-state mismatch, invalid status or timestamp, corrupt recovery snapshot       | Reject resume and quarantine the persisted record                                                                     | Resume only after `validateFSMSnapshot()` succeeds. Never reconstruct state from mutable Session fields.                                   |
| Inference/model provider               | 429, timeout, 5xx, malformed normalized output, authentication failure, cancellation                            | Retry transient calls under the provider circuit; use only a contract-compatible fallback; review credentials         | Honor retry-after and total deadline. Cache read/write failure is reported separately and bypassed when primary inference stays correct.   |
| Tool runner                            | Input/output schema failure, policy denial, approval expiry, timeout, handler failure, late result              | Correct input, request review, retry read-only/idempotent work, or quarantine unknown writes                          | All attempts remain Invocation records. A timed-out write is not retried until receipt reconciliation proves it safe.                      |
| MCP                                    | Connection loss, capability removal, schema drift, identity/protocol change, remote error                       | Reconnect under budget, keep immutable Run snapshot, require approval for drift, quarantine identity changes          | Catalog revision, capability hash, server identity, and external receipt are recovery evidence.                                            |
| Memory                                 | Scope violation, write-policy denial, optimistic conflict, provider outage, corrupt record                      | Review scope/policy, retry safe reads or proven-not-started writes, reconcile ambiguous writes, quarantine corruption | Preserve scope/provenance plus record/provider revision and idempotency key. A bounded empty read is an explicit degradation, not success. |
| Storage and event log                  | Lease/fencing loss, revision/CAS conflict, disk full, unavailable backend, ambiguous commit, corrupt append     | Refresh revision for pre-commit conflicts, reconcile unknown commits, compensate known commits, quarantine corruption | Event append idempotency key, expected/observed revision, transaction/lease id, fencing token, checksum, and receipt determine safety.     |
| Workspace, sandbox, command execution  | Path escape, denied network/secret access, startup failure, timeout, cancellation, unknown remote process state | Deny invalid authority, retry proven-not-started work, reconcile provider receipts, use compatible fallback, clean up | Never bypass Workspace/Sandbox policy. Record command identity, revision, lease/fencing evidence, terminal receipt, and cleanup result.    |
| Message bus                            | Duplicate delivery, expiry, poison message, out-of-order handoff, unavailable consumer                          | Idempotent acknowledge, requeue with bounded backoff, then dead-letter; compensate only committed downstream effects  | Correlation/causation ids and message id are mandatory. Exhausted/expired messages must not block the recipient queue.                     |
| Cache                                  | Miss, stale entry, corrupt value, revision mismatch, invalidation race, backend outage, overload                | Bypass optional caches, invalidate stale knowledge, rebuild asynchronously; never replace source-of-truth evidence    | Recovery hints match failure fingerprint plus participant and policy/spec/provider revisions; every hit is revalidated.                    |
| Skills                                 | Missing required skill, untrusted package, denied tool scope, oversized context, load failure                   | Fail before inference or request review; retry only transient storage reads                                           | Skill instructions cannot replace Workflow/FSM authority or bypass ToolRunner. Preserve package version and policy decision.               |
| Replay, evaluation, regression         | Missing lifecycle pair, event mismatch, output schema failure, incomplete fixture                               | Fail the check and report trace diff; do not call live model/tool/memory writers                                      | These paths are deterministic views over recorded events and contracts.                                                                    |
| Concurrency and cancellation           | Session queue race, duplicate run, lease/fencing loss, abort during wait or activity                            | Serialize per user/session where required, stop stale work, cancel explicitly, quarantine uncertain side effects      | Cancellation is terminal for the current attempt and must propagate through scheduler, provider, tool, and command signals.                |

## Decision Order

The planner applies safety rules before retry convenience:

1. Cancellation enters `Cancelled`.
2. Unknown external commit state uses `reconcile` when a receipt lookup exists; otherwise it enters
   `Quarantined`.
3. A committed effect with an available compensation enters `Compensating`.
4. Invariant violations enter `Quarantined`.
5. Validation, policy, authentication, and authorization anomalies enter `HumanReview`.
6. An explicitly non-retryable failure may use only a declared compatible `fallback` or bounded
   `degrade` handler; otherwise it fails.
7. An open circuit returns `wait` and `nextEligibleAt`.
8. Per-state, total-attempt, no-progress, same-strategy, cycle, and elapsed-time budgets are checked.
9. Retryable categories use exponential backoff with deterministic bounded jitter.
10. Repeated dependency failure opens the circuit; a successful probe closes it.

The FSM policy defaults to three attempts per state, eight recovery decisions per run, and five
minutes total elapsed time. The supervisor applies its separate convergence limits described above.
These values are defaults, not service-level promises. Domain or deployment specs may supply
stricter FSM values through `FSMRecoveryPolicySpec`; runtime composition may supply a stricter
`RecoveryConvergencePolicy`.

## Event-First Integration

`FSMSnapshot.recovery` contains attempts, circuit state, the last anomaly id, and the last action.
`FSMRuntime.onRecoveryDecision` is the trace boundary for persisting the decision beside the normal
`onTransition` and `onStateEntered` callbacks. A durable runtime should record at least:

- anomaly id, source, category, code, and side-effect state;
- selected action, attempt counters, delay, circuit key/status, and decision reason;
- case fingerprint, participant dependency, evidence-before/evidence-after hashes, and no-progress
  counters;
- transition into `Recovering`, `Compensating`, `Quarantined`, review, failure, or cancellation;
- scheduler acknowledgement and resumed attempt identity;
- compensation request/result or external receipt reconciliation;
- successful circuit close.

The shared supervisor emits `recovery.case.opened`, `recovery.strategy.selected`,
`recovery.attempt.started`, `recovery.attempt.completed`, `recovery.progress.detected`,
`recovery.case.resolved`, or `recovery.case.escalated`. Runtime projections and recovery caches
consume these facts; they do not infer success from mutable Session fields.

Do not store secrets, full credentials, or unrestricted provider payloads in recovery metadata.

## Recovery Knowledge and Cache Cooperation

`RecoveryKnowledgePort` is an optional acceleration boundary. A key contains the failure
fingerprint, participant id, and policy/spec/provider revisions. A value records the selected
strategy, outcome, evidence hash, timestamp/expiry, and whether the outcome was verified or
negative. The supervisor rejects and invalidates expired or revision-mismatched entries, and it
uses only verified hints for handlers that the current participant actually declares.

WorkCache implements this port with revision-safe recovery nodes. It can learn that a particular
fallback or degradation previously worked, but it cannot mark a recovery case complete, override
FSM policy, or replace receipts/events. Inference cache failures are isolated: prefix/KV cache
reads and writes may be bypassed while the primary model call continues, and the degradation is
recorded as a recovery case.

## Runtime API

```ts
import { FSMRuntime, defaultReActFSMProcessSpec } from '@hypha/fsm';
import { classifyMemoryFailure } from '@hypha/memory';
import { runRecoverySupervisor } from '@hypha/harness';
import { stableRecoveryHash } from '@hypha/core';

const fsm = new FSMRuntime(defaultReActFSMProcessSpec, runId, {
  onRecoveryDecision: recordRecoveryDecision,
  onTransition: recordTransition,
  onStateEntered: recordState,
});
await fsm.start({ phase: 'recovery_example' });

const result = await runRecoverySupervisor({
  fsm,
  caseId: `${runId}:context`,
  participants: [
    {
      id: 'memory-context',
      module: 'memory',
      execute: async () => {
        const output = await memory.read(scope, query);
        return {
          output,
          evidence: {
            observedAt: new Date().toISOString(),
            operationKey: 'memory.read:context',
            state: 'completed',
            outputHash: stableRecoveryHash(output),
          },
        };
      },
      classify: (error, context) =>
        classifyMemoryFailure(error, {
          id: `${context.caseId}:${context.cycle}`,
          operation: 'read',
          scope,
          providerId: 'memory-primary',
        }),
      degrade: async () => ({
        output: [],
        evidence: {
          observedAt: new Date().toISOString(),
          operationKey: 'memory.read:context',
          state: 'degraded',
        },
      }),
    },
  ],
});
```

Without an injected scheduler, delayed work returns `status: "suspended"`. Persist the FSM and
recovery case snapshot, then resume through the same FSM after the scheduling event. This keeps
waits, restarts, multi-process execution, and cross-module dependencies visible rather than hiding
them in an in-memory loop.
