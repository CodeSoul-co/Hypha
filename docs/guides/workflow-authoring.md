# Workflow Authoring

Business Workflows belong in an independent Agent project. Hypha owns the reusable DomainPack
schema, validation, binding, compilation, and Runtime contracts. A product must not add its
customer-specific Workflow, prompts, pages, or database models to this repository.

## Authoring Flow

1. Declare and validate a versioned `DomainPackSpec`.
2. Select a task, Workflow, Session profile, and explicit Agent reference.
3. Compile with `compileDomainPackToHarnessedSystem`.
4. Persist the returned `workflowRef`, `processHash`, and dependency snapshot with the Run's
   immutable Process Spec.
5. Execute state work through Runtime Activity Ports and propose transitions to FSM.

```ts
import { compileDomainPackToHarnessedSystem, validateDomainPackSpec } from '@hypha/domain';

const compiled = compileDomainPackToHarnessedSystem(validateDomainPackSpec(domainPack), {
  agentRef: { id: 'agent.worker', version: '1.0.0' },
  workflowId: 'workflow.review',
});

compiled.workflowRef;
compiled.compilerVersion;
compiled.processHash;
compiled.dependencySnapshot.dependencyHash;
compiled.fsmProcess;
```

## State Rules

Each state has one stable `id` and a clear goal. Input/output contracts, allowed Tool and Skill
refs, Policy refs, timeout, retry, Human review, Memory, MCP, and evaluation bindings must be
declared rather than discovered from mutable process state.

Transitions must be deterministic. Guards may read persisted input, variables, and metadata, but
must not call providers, read wall-clock time directly, generate random ids, or perform side
effects. Provider output becomes a persisted Activity result before a transition depends on it.

Terminal states must be explicit and reachable. Do not let ReAct select an arbitrary Workflow
state; ReAct operates inside a state and returns an action or transition proposal for FSM to
validate.

## Versioning

Changing Workflow structure or a selected dependency requires a new version or revision and a new
compiled Process hash. A running Run continues to use its original Process and dependency hashes.
New code must not silently reinterpret an existing Run with current DomainPack definitions.

Use stable `SpecRef` values. Avoid unversioned external aliases in compiled dependencies. The
compiler sorts normalized refs before hashing, so equivalent dependency sets produce the same
`dependencyHash`.
