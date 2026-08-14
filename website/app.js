const packages = [
  {
    number: '01',
    slug: 'core',
    group: 'contracts',
    title: 'Core',
    purpose:
      'Shared versioned specs, framework events, policy primitives, and provider-neutral runtime contracts.',
    apis: [
      'harnessedAgentSystemSpecDefinition',
      'createFrameworkEvent',
      'PolicyEngine',
      'InMemoryEventStore',
    ],
    code: `import {
  harnessedAgentSystemSpecDefinition,
  createFrameworkEvent,
} from '@codesoul-co/hypha-core';

const systemSpec = harnessedAgentSystemSpecDefinition.parse(
  harnessedAgentSystemSpecDefinition.example,
);
const event = createFrameworkEvent({
  id: 'event-42',
  type: 'run.created',
  userId: 'owner', sessionId: 'session-42', runId: 'run-42',
  payload: { systemSpecId: systemSpec.id },
});`,
  },
  {
    number: '02',
    slug: 'storage',
    group: 'contracts',
    title: 'Storage',
    purpose:
      'Declare portable storage topologies and resolve secret-backed connections without leaking credentials.',
    apis: [
      'createSQLiteStorageProfile',
      'createMongoStorageProfile',
      'resolveStorageConnection',
      'redactStorageConnection',
    ],
    code: `import {
  createSQLiteStorageProfile,
  resolveStorageConnection,
  redactStorageConnection,
} from '@codesoul-co/hypha-storage';

const profile = createSQLiteStorageProfile({
  id: 'storage.local',
  role: 'source_of_truth',
  uri: 'file:./var/hypha.db',
  database: './var/hypha.db',
});
const connection = resolveStorageConnection(profile, process.env);
console.log(redactStorageConnection(connection));`,
  },
  {
    number: '03',
    slug: 'fsm',
    group: 'execution',
    title: 'FSM',
    purpose:
      'Validate application-defined state graphs, analyze topology, and apply guarded, revision-aware transitions.',
    apis: ['FSMRuntime', 'analyzeFSMTopology', 'createInitialSnapshot', 'applyTransition'],
    code: `import {
  analyzeFSMTopology,
  createInitialSnapshot,
  applyTransition,
} from '@codesoul-co/hypha-fsm';

const process = {
  id: 'workflow.review', version: '1.0.0', initialState: 'Draft',
  states: [
    { id: 'Draft', kind: 'task' },
    { id: 'Approved', kind: 'completed', terminal: true },
  ],
  transitions: [{ from: 'Draft', to: 'Approved', event: 'approve' }],
};
console.log(analyzeFSMTopology(process));
const next = applyTransition(process, createInitialSnapshot(process), 'Approved');`,
  },
  {
    number: '04',
    slug: 'inference',
    group: 'intelligence',
    title: 'Inference',
    purpose:
      'Route normalized inference requests through registered backends with prompt and prefix/KV cache coordination.',
    apis: [
      'InferenceManager',
      'InferenceBackendRegistry',
      'InMemoryPrefixCacheProvider',
      'PromptRegistry',
    ],
    code: `import {
  InferenceBackendRegistry,
  InferenceManager,
} from '@codesoul-co/hypha-inference';

const backends = new InferenceBackendRegistry();
const inference = new InferenceManager();
inference.register({
  id: 'primary',
  infer: async request => ({ id: 'response-1', output: request.input }),
});
const response = await inference.infer('primary', {
  runId: 'run-42', stepId: 'step-1',
  modelAlias: 'reasoning.primary', input: 'evidence',
});`,
  },
  {
    number: '05',
    slug: 'models',
    group: 'intelligence',
    title: 'Models',
    purpose:
      'Register provider-neutral model adapters and validate aliases, capabilities, requests, and routing policy.',
    apis: [
      'ModelRegistry',
      'MockModelProvider',
      'OpenAICompatibleModelProvider',
      'validateModelRoutingSpec',
    ],
    code: `import {
  ModelRegistry,
  MockModelProvider,
} from '@codesoul-co/hypha-models';

const models = new ModelRegistry();
models.register(new MockModelProvider('test'));
const response = await models.get('test').generate({
  runId: 'run-42', stepId: 'step-1', modelAlias: 'mock-1',
  input: 'Explain the event.',
});`,
  },
  {
    number: '06',
    slug: 'memory',
    group: 'context',
    title: 'Memory',
    purpose:
      'Coordinate scoped, policy-governed structured, vector, artifact, episodic, and semantic memory operations.',
    apis: ['MemoryManager', 'HybridMemoryProvider', 'memorySpecDefinition', 'validateMemorySpec'],
    code: `import {
  memorySpecDefinition,
  validateMemorySpec,
} from '@codesoul-co/hypha-memory';

const spec = validateMemorySpec({
  ...memorySpecDefinition.example,
  id: 'memory.research',
  version: '1.0.0',
});

// Bind a concrete MemoryProvider in trusted application composition,
// then construct MemoryManager with policy and trace hooks.`,
  },
  {
    number: '07',
    slug: 'tools',
    group: 'effects',
    title: 'Tools',
    purpose:
      'Register typed tool contracts and execute adapters only through policy, trace, timeout, and receipt boundaries.',
    apis: ['ToolRegistry', 'GovernedToolRunner', 'LocalFunctionToolAdapter', 'validateToolSpec'],
    code: `import {
  ToolRegistry,
  LocalFunctionToolAdapter,
  validateToolSpec,
} from '@codesoul-co/hypha-tools';

const tools = new ToolRegistry();
const spec = validateToolSpec({
  id: 'tool.lookup', version: '1.0.0', name: 'lookup',
  description: 'Read a public record', sideEffectLevel: 'read',
  inputSchema: { type: 'object', properties: { id: { type: 'string' } } },
});
tools.register(spec, async ({ id }) => ({ id }));`,
  },
  {
    number: '08',
    slug: 'skills',
    group: 'context',
    title: 'Skills',
    purpose:
      'Select, resolve, authorize, and progressively load versioned instruction assets into the Agent context.',
    apis: ['SkillRegistry', 'SkillSelector', 'SkillResolver', 'LocalSkillLoader'],
    code: `import {
  SkillRegistry,
  SkillSelector,
  validateSkillSpec,
} from '@codesoul-co/hypha-skills';

const registry = new SkillRegistry();
registry.register(validateSkillSpec({
  id: 'skill.citations', version: '1.0.0',
  name: 'Citation discipline', description: 'Attach evidence.',
  activationPolicy: { mode: 'keyword', patterns: ['source', 'citation'] },
  trustLevel: 'reviewed',
}));
console.log(registry.list());`,
  },
  {
    number: '09',
    slug: 'mcp',
    group: 'effects',
    title: 'MCP',
    purpose:
      'Normalize MCP tools, resources, and prompts behind the same governed capability path as local tools.',
    apis: [
      'MCPConnectionManager',
      'MockMCPGateway',
      'registerMCPGatewayTools',
      'validateMCPIntegrationSpec',
    ],
    code: `import {
  MockMCPGateway,
  registerMCPGatewayTools,
  validateMCPIntegrationSpec,
} from '@codesoul-co/hypha-mcp';

const integration = validateMCPIntegrationSpec({
  id: 'mcp.docs', version: '1.0.0',
  servers: [{ id: 'docs', mode: 'local', command: 'docs-mcp' }],
  allowedCapabilities: ['search'],
});
const gateway = new MockMCPGateway();
// registerMCPGatewayTools(...) exposes normalized tools to ToolRegistry.`,
  },
  {
    number: '10',
    slug: 'domain',
    group: 'product',
    title: 'Domain',
    purpose:
      'Load and validate product-owned DomainPacks, then compile workflow, Agent patch, profiles, and bindings.',
    apis: [
      'loadDomainPackFile',
      'compileDomainPackToHarnessedSystem',
      'applyDomainAgentPatch',
      'validateDomainPack',
    ],
    code: `import {
  loadDomainPackFile,
  compileDomainPackToHarnessedSystem,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const system = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
});
console.log(system.fsmProcess, system.bindings);`,
  },
  {
    number: '11',
    slug: 'kernel',
    group: 'execution',
    title: 'Kernel',
    purpose:
      'Run the provider-neutral ReAct loop while delegating capabilities and durable control to explicit ports.',
    apis: ['ReActRunner', 'ReActAgentRunner', 'BasicReActAgentRuntime', 'reactAgentSpecDefinition'],
    code: `import {
  BasicReActAgentRuntime,
  ReActAgentRunner,
} from '@codesoul-co/hypha-kernel';

const runtime = new BasicReActAgentRuntime({
  infer: request => inference.infer(request),
  invokeTool: request => governedTools.invoke(request),
  loadContext: request => memory.read(request),
});
const runner = new ReActAgentRunner({ runtime });
const result = await runner.run({ agent, task, maxSteps: 12 });`,
  },
  {
    number: '12',
    slug: 'harness',
    group: 'execution',
    title: 'Harness',
    purpose:
      'Make execution durable with events, session projection, queues, FSM orchestration, traces, receipts, and replay hooks.',
    apis: [
      'EventFirstRuntime',
      'HarnessedReActFSMRunner',
      'SessionProjector',
      'InMemoryTraceRecorder',
    ],
    code: `import {
  EventFirstRuntime,
  InMemoryTraceRecorder,
  SessionProjector,
} from '@codesoul-co/hypha-harness';

const traces = new InMemoryTraceRecorder();
const projector = new SessionProjector();
const runtime = new EventFirstRuntime(eventStore);

// Submit commands through runtime boundaries; rebuild views from Events
// instead of mutating Session state as the source of truth.`,
  },
  {
    number: '13',
    slug: 'adapters-local',
    group: 'adapters',
    title: 'Local Adapters',
    purpose:
      'Provide a local-first SQLite and filesystem persistence backbone for runs, events, traces, memory, and artifacts.',
    apis: [
      'createLocalStorageBackbone',
      'createLocalStorageProfiles',
      'SQLiteEventStore',
      'FileSystemArtifactStore',
    ],
    code: `import {
  createLocalStorageBackbone,
  createLocalStorageProfiles,
} from '@codesoul-co/hypha-adapters-local';

const profiles = createLocalStorageProfiles({
  eventDbFilename: './var/events.sqlite',
  structuredDbFilename: './var/structured.sqlite',
  vectorFilename: './var/vectors.json',
  artifactRootPath: './var/artifacts',
});
const storage = createLocalStorageBackbone({ rootPath: './var' });

// Pass storage.eventStore, traceStore, memory providers, and artifact
// store into the Harness composition root.`,
  },
  {
    number: '14',
    slug: 'serving-cache',
    group: 'performance',
    title: 'Serving Cache',
    purpose:
      'Reuse normalized model responses through bounded memory, SQLite, or Redis stores without becoming authoritative state.',
    apis: ['ServingCacheManager', 'MemoryCacheStore', 'CachedLLMProvider', 'SQLiteCacheStore'],
    code: `import {
  MemoryCacheStore,
  ServingCacheManager,
} from '@codesoul-co/hypha-serving-cache';

const cache = new ServingCacheManager({
  store: new MemoryCacheStore(),
  policy: { enabled: true, ttlMs: 60_000, scopeRequirement: 'user' },
});

// Wrap an LLM provider with CachedLLMProvider. Cache misses always fall
// through to the provider; durable Events remain authoritative.`,
  },
  {
    number: '15',
    slug: 'testing',
    group: 'evidence',
    title: 'Testing',
    purpose:
      'Replay event histories, evaluate outputs, assert state paths, and run deterministic regression cases.',
    apis: ['ReplayEngine', 'DeterministicEvaluator', 'RegressionRunner', 'assertStatePath'],
    code: `import {
  ReplayEngine,
  DeterministicEvaluator,
  assertStatePath,
} from '@codesoul-co/hypha-testing';

const replay = new ReplayEngine({ eventStore, projector });
const rebuilt = await replay.replay({ runId: 'run-42' });
assertStatePath(rebuilt, ['Created', 'Running', 'Completed']);

const evaluator = new DeterministicEvaluator();
const score = await evaluator.evaluate(fixture, rebuilt.output);`,
  },
];

const systemSteps = [
  [
    '01',
    'Declare product intent',
    'Own the DomainPack, Prompt, Skill, task/output schemas, workflow topology, policy, and regression fixtures in the application.',
    '@codesoul-co/hypha-domain',
  ],
  [
    '02',
    'Establish durable identity',
    'Create user, Session, Run, invocation, and workspace scopes before any model or tool call can occur.',
    '@codesoul-co/hypha-core + harness',
  ],
  [
    '03',
    'Bind local persistence',
    'Select storage profiles and construct the local SQLite/filesystem backbone or production adapters.',
    '@codesoul-co/hypha-storage + adapters-local',
  ],
  [
    '04',
    'Register intelligence',
    'Bind model aliases and inference backends; add serving cache only as a replaceable optimization.',
    '@codesoul-co/hypha-models + inference + serving-cache',
  ],
  [
    '05',
    'Load context deliberately',
    'Resolve allowed skills and scoped memory through policy-aware managers, not direct provider access.',
    '@codesoul-co/hypha-skills + memory',
  ],
  [
    '06',
    'Govern every effect',
    'Register local and MCP capabilities in the Tool Registry and execute them through policy, timeout, trace, and receipt hooks.',
    '@codesoul-co/hypha-tools + mcp',
  ],
  [
    '07',
    'Execute and advance',
    'Let Kernel ReAct propose work while Harness FSM validates transitions and appends the evidence chain.',
    '@codesoul-co/hypha-kernel + fsm + harness',
  ],
  [
    '08',
    'Prove the result',
    'Replay Events, evaluate outputs, and run regression cases before promoting a new release or provider configuration.',
    '@codesoul-co/hypha-testing',
  ],
];

const examples = [
  [
    '01',
    'Contract-only validation',
    'Parse each package definition at application startup. Fail deployment before a malformed topology, capability, or storage profile reaches a Run.',
    '#packages',
  ],
  [
    '02',
    'Custom FSM workflow',
    'Define product-owned nodes and transitions, run topology analysis, then advance state through expected revision and idempotency checks.',
    '#fsm-control',
  ],
  [
    '03',
    'All-package tour',
    'The release-agent package tour imports every public 1.0.0 package and exercises its representative contract or runtime boundary.',
    'https://github.com/CodeSoul-co/Hypha/blob/main/examples/release-agent/src/package-tour.ts',
  ],
  [
    '04',
    'Complete release agent',
    'Compile a DomainPack, register Prompt and Skill revisions, start a durable ReAct Run, inspect events, and issue an owner FSM transition.',
    'https://github.com/CodeSoul-co/Hypha/tree/main/examples/release-agent',
  ],
];

const productionChecks = [
  [
    'A',
    'Pin revisions',
    'Pin package versions, DomainPack, Prompt, Skill, model alias, policy, and workflow hashes for every deployment.',
  ],
  [
    'B',
    'Protect scopes',
    'Enforce userId, Session, Run, invocation, and workspace boundaries on reads, writes, retries, and cancellation.',
  ],
  [
    'C',
    'Keep effects on-path',
    'Route Tool, MCP, memory, file, and external writes through policy, trace, timeout, receipt, and harness hooks.',
  ],
  [
    'D',
    'Rebuild from Events',
    'Treat Session as a projected context view. Test that Run state and audit output can be reconstructed from Events.',
  ],
  [
    'E',
    'Exercise failure',
    'Inject denial, timeout, cancellation, stale revision, duplicate idempotency key, adapter failure, and recovery scenarios.',
  ],
  [
    'F',
    'Gate every change',
    'Run typecheck, build, unit, package contract, integration, cache on/off, replay, evaluation, and regression checks.',
  ],
];

const compositionCode = `import { compileDomainPackToHarnessedSystem } from '@codesoul-co/hypha-domain';
import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';
import { ModelRegistry } from '@codesoul-co/hypha-models';
import { InferenceManager } from '@codesoul-co/hypha-inference';
import { ToolRegistry } from '@codesoul-co/hypha-tools';
import { SkillRegistry } from '@codesoul-co/hypha-skills';
import { MemoryManager } from '@codesoul-co/hypha-memory';
import { HarnessedReActFSMRunner } from '@codesoul-co/hypha-harness';
import { RegressionRunner } from '@codesoul-co/hypha-testing';

// 1. Compile the application-owned product contract.
const system = compileDomainPackToHarnessedSystem(domainPack, selection);

// 2. Construct trusted adapters and registries.
const storage = createLocalStorageBackbone({ rootPath: './var' });
const models = new ModelRegistry();
models.register(modelProvider);
const inference = new InferenceManager({ prefixCache, kvCache });
inference.register(inferenceProvider);
const tools = new ToolRegistry();
tools.register(searchSpec, searchAdapter);

// 3. Put context and effects behind policy + evidence hooks.
const memory = new MemoryManager({ provider: memoryProvider, policy, traces });
const skills = new SkillRegistry();
skills.register(citationSkill);

// 4. Run ReAct inside the durable FSM Harness.
const runner = new HarnessedReActFSMRunner({
  reactRunner, eventStore: storage.eventStore, trace: traces,
});
const result = await runner.run({
  system, sessionId, userId, input,
  bindings: { inference, memory, skills, tools, policy },
});

// 5. Replay and regress before promotion.
await new RegressionRunner({ eventStore: storage.eventStore }).run(fixtures);`;

function appendText(element, text) {
  element.append(document.createTextNode(text));
}

function packageCard(item) {
  const article = document.createElement('article');
  article.className = 'package-card';
  article.dataset.search = [item.slug, item.group, item.title, item.purpose, ...item.apis]
    .join(' ')
    .toLowerCase();

  const top = document.createElement('div');
  top.className = 'package-top';
  const number = document.createElement('span');
  number.className = 'package-number';
  number.textContent = item.number;
  const group = document.createElement('span');
  group.className = 'package-group';
  group.textContent = item.group;
  top.append(number, group);

  const title = document.createElement('h3');
  title.textContent = item.title;
  const name = document.createElement('code');
  name.className = 'package-name';
  name.textContent = `@codesoul-co/hypha-${item.slug}@1.0.0`;
  const purpose = document.createElement('p');
  purpose.className = 'package-purpose';
  purpose.textContent = item.purpose;
  const apiList = document.createElement('ul');
  apiList.className = 'api-list';
  item.apis.forEach((api) => {
    const entry = document.createElement('li');
    entry.textContent = api;
    apiList.append(entry);
  });
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Usage example';
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = item.code;
  pre.append(code);
  details.append(summary, pre);
  article.append(top, title, name, purpose, apiList, details);
  return article;
}

const packageGrid = document.querySelector('#package-grid');
packages.forEach((item) => packageGrid.append(packageCard(item)));

const search = document.querySelector('#package-search');
const count = document.querySelector('#package-count');
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  packageGrid.querySelectorAll('.package-card').forEach((card) => {
    card.hidden = query !== '' && !card.dataset.search.includes(query);
    if (!card.hidden) visible += 1;
  });
  count.textContent = `${visible} / ${packages.length} shown`;
});

const systemStepsElement = document.querySelector('#system-steps');
systemSteps.forEach(([number, title, description, packageName]) => {
  const row = document.createElement('article');
  row.className = 'system-step';
  const index = document.createElement('span');
  index.textContent = number;
  const heading = document.createElement('h3');
  heading.textContent = title;
  const copy = document.createElement('p');
  copy.textContent = description;
  const code = document.createElement('code');
  code.textContent = packageName;
  row.append(index, heading, copy, code);
  systemStepsElement.append(row);
});

const exampleGrid = document.querySelector('#example-grid');
examples.forEach(([number, title, description, href]) => {
  const card = document.createElement('article');
  card.className = 'example-card';
  const index = document.createElement('span');
  index.textContent = number;
  const heading = document.createElement('h3');
  heading.textContent = title;
  const copy = document.createElement('p');
  copy.textContent = description;
  const link = document.createElement('a');
  link.href = href;
  link.textContent = 'Open example →';
  if (href.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noreferrer';
  }
  card.append(index, heading, copy, link);
  exampleGrid.append(card);
});

const checklist = document.querySelector('#production-checklist');
productionChecks.forEach(([letter, title, description]) => {
  const item = document.createElement('article');
  item.className = 'check-item';
  const badge = document.createElement('span');
  badge.textContent = letter;
  const heading = document.createElement('h3');
  heading.textContent = title;
  const copy = document.createElement('p');
  copy.textContent = description;
  item.append(badge, heading, copy);
  checklist.append(item);
});

document.querySelector('#composition-code').textContent = compositionCode;

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code').textContent;
    await navigator.clipboard.writeText(code);
    button.textContent = 'Copied';
    window.setTimeout(() => {
      button.textContent = 'Copy';
    }, 1400);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
