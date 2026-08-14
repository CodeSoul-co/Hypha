# Product & Runtime: Domain, Local, Cache & Testing

These packages turn framework contracts into an application composition and prove that it remains deterministic.

## `hypha-domain`

A Domain Pack owns Task schemas, Workflows, Session defaults, capability allow-lists, Memory/reasoning profiles, policies and evaluation fixtures.

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const compiled = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});
```

Apply `compiled.agentPatch` to your base Agent spec. The compiled Harness FSM protects ReAct execution; the selected Workflow remains the source for an optional application-owned FSM.

## `hypha-adapters-local`

Create development profiles for Event/structured SQLite, vectors and filesystem artifacts.

```ts
import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';

const profiles = createLocalStorageProfiles({
  eventDbFilename: './var/events.sqlite',
  structuredDbFilename: './var/structured.sqlite',
  vectorFilename: './var/vectors.json',
  artifactRootPath: './var/artifacts',
});
```

Use this for local-first development and deterministic tests. Production can replace providers while retaining Storage/Memory contracts.

## `hypha-serving-cache`

The serving cache stores bounded, scoped response projections.

```ts
import {
  MemoryCacheStore,
  ServingCacheManager,
} from '@codesoul-co/hypha-serving-cache';

const cache = new ServingCacheManager({ store: new MemoryCacheStore() });
const key = cache.keyFor({
  provider: 'primary', model: 'reasoning-v1',
  messages: [{ role: 'user', content: 'Explain Events.' }],
});
await cache.set(key, { content: '...' }, {
  provider: 'primary', model: 'reasoning-v1', cacheType: 'exact',
});
```

Scope keys by the policy requirement used in your deployment. Cache entries accelerate serving; Run/Event evidence remains authoritative.

## `hypha-testing`

Testing helpers assert replay fixtures and state paths.

```ts
import { assertStatePath } from '@codesoul-co/hypha-testing';

expect(assertStatePath({
  id: 'fixture-review',
  version: '1.0.0',
  events: [],
  statePath: ['Draft', 'Review', 'Approved'],
}, ['Draft', 'Review', 'Approved'])).toBe(true);
```

Use deterministic model/tool adapters, then assert real output, transitions, Events and receipts. A release test should prove it fails when the protected behavior regresses.
