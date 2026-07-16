# RFC 0003: Domain Runtime Bindings

## Status

Proposed implementation contract.

## Motivation

DomainPack workflows need a stable bridge into the durable runtime without owning runtime
execution. A workflow declaration must identify the runtime, message bus, session queue,
activity ports, and policies that apply to a run. Those dependencies must be pinned before
execution so restart, replay, evaluation, and regression do not silently resolve newer specs.

## Ownership Boundary

`@hypha/domain` owns:

- versioned runtime, message bus, and session queue profile declarations;
- workflow and state references to those profiles;
- activity port bindings and contract hashes;
- validation of internal DomainPack references;
- compilation into `FSMProcessSpec`, state bindings, and a dependency snapshot.

`@hypha/domain` does not own:

- FSM execution or ReAct loop control;
- event stores, inboxes, outboxes, queues, leases, or recovery workers;
- message transport clients;
- model, tool, memory, or execution activity implementations;
- business-specific DomainPack instances.

Those capabilities remain in the runtime and their owning framework packages.

## Contracts

`RuntimeProfileSpec` selects default timeout and retry behavior and references message bus,
session queue, concurrency, resource, and recovery policies.

`RuntimeMessageBusProfileSpec` declares at-least-once delivery requirements and references a
transport adapter. It contains no provider SDK configuration.

`RuntimeSessionQueueProfileSpec` declares FIFO ordering, serial or bounded concurrency, lease
duration, and fairness behavior.

`RuntimeActivityBindingSpec` binds a workflow state to a versioned activity port operation and
requires a contract hash. A binding describes an execution dependency; it does not execute the
activity.

## Compilation

`compileWorkflowForRuntime(domainPack, options)` returns:

- a compiled `FSMProcessSpec`;
- normalized state bindings;
- pinned DomainPack, Workflow, Runtime, Bus, and Queue refs;
- activity contract snapshots;
- all runtime policy refs;
- a deterministic dependency snapshot hash;
- a deterministic process hash.

`compileWorkflowToFSM()` remains available for compatibility. `WorkflowCompiler.compileRuntime()`
is the injectable class entrypoint for the pinned compilation result.

## Determinism

Hashes use SHA-256 over canonical JSON with sorted object keys. Array order remains significant
because workflow state, transition, and activity ordering are semantic. Undefined fields are not
included in canonical input.

The runtime must persist the compiled process and dependency snapshot with the run. Recovery and
replay use the persisted values rather than recompiling against the latest DomainPack.

## Compatibility

All new DomainPack and Workflow fields are optional. Existing workflows continue to compile. If
a runtime profile is selected, its internal refs and versions must resolve inside the same
DomainPack. Invalid references fail validation before a run can be created.

## Validation

Contract tests cover profile schemas, reference failures, queue invariants, state binding
projection, dependency pinning, and deterministic process hashes.
