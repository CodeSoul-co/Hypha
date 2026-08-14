# 产品与运行时：Domain、Local、Cache 与 Testing

这些包把 Framework 契约组合成应用，并证明组合仍然可确定性回放。

## `hypha-domain`

Domain Pack 拥有 Task Schema、Workflow、Session 默认值、能力 Allow-list、Memory/Reasoning Profile、Policy 与 Evaluation Fixture。

```ts
import {
  compileDomainPackToHarnessedSystem, loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const compiled = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.research', version: '1.0.0' },
  taskSchemaId: 'task.research', workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});
```

把 `compiled.agentPatch` 应用到基础 Agent Spec。编译后的 Harness FSM 保护 ReAct 执行；被选中的 Workflow 则可用于独立的应用 FSM。

## `hypha-adapters-local`

为 Event/Structured SQLite、Vector 与 Filesystem Artifact 创建本地开发 Profile。

```ts
import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';
const profiles = createLocalStorageProfiles({
  eventDbFilename: './var/events.sqlite',
  structuredDbFilename: './var/structured.sqlite',
  vectorFilename: './var/vectors.json',
  artifactRootPath: './var/artifacts',
});
```

适用于 Local-first 开发与确定性测试。生产环境可替换 Provider，同时保留 Storage/Memory 契约。

## `hypha-serving-cache`

Serving Cache 保存有界、有 Scope 的响应投影。

```ts
import { MemoryCacheStore, ServingCacheManager } from '@codesoul-co/hypha-serving-cache';
const cache = new ServingCacheManager({ store: new MemoryCacheStore() });
const key = cache.keyFor({
  provider: 'primary', model: 'reasoning-v1',
  messages: [{ role: 'user', content: 'Explain Events.' }],
});
await cache.set(key, { content: '...' }, {
  provider: 'primary', model: 'reasoning-v1', cacheType: 'exact',
});
```

Key 必须满足部署的 Policy Scope 要求。Cache 用于加速 Serving，Run/Event 证据仍是事实来源。

## `hypha-testing`

Testing 提供 Replay Fixture 与 State Path 断言。

```ts
import { assertStatePath } from '@codesoul-co/hypha-testing';
expect(assertStatePath({
  id: 'fixture-review', version: '1.0.0', events: [],
  statePath: ['Draft', 'Review', 'Approved'],
}, ['Draft', 'Review', 'Approved'])).toBe(true);
```

使用确定性 Model/Tool Adapter，并断言真实 Output、Transition、Event 与 Receipt。Release Test 应证明受保护行为回退时确实会失败。
