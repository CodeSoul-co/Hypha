import { createFrameworkEvent, harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';
import {
  createSQLiteStorageProfile,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';
import {
  analyzeFSMTopology,
  createInitialSnapshot,
  fsmProcessSpecDefinition,
} from '@codesoul-co/hypha-fsm';
import { InferenceManager } from '@codesoul-co/hypha-inference';
import {
  MockModelProvider,
  ModelRegistry,
  modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';
import { memorySpecDefinition } from '@codesoul-co/hypha-memory';
import { ToolRegistry, toolSpecDefinition } from '@codesoul-co/hypha-tools';
import { SkillRegistry, skillSpecDefinition } from '@codesoul-co/hypha-skills';
import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';
import { domainPackSpecDefinition } from '@codesoul-co/hypha-domain';
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';
import { InMemoryTraceRecorder, SessionProjector } from '@codesoul-co/hypha-harness';
import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';
import { MemoryCacheStore, ServingCacheManager } from '@codesoul-co/hypha-serving-cache';
import { assertStatePath } from '@codesoul-co/hypha-testing';
import { buildReleaseAgent } from './agent';

async function tourPackages() {
  const coreSpec = harnessedAgentSystemSpecDefinition.parse(
    harnessedAgentSystemSpecDefinition.example
  );

  const sqlite = createSQLiteStorageProfile({
    id: 'storage.example',
    role: 'source_of_truth',
    uri: 'file:./var/example.sqlite',
    database: './var/example.sqlite',
  });
  const topology = storageTopologySpecDefinition.parse({
    ...storageTopologySpecDefinition.example,
    providers: [sqlite],
  });

  const process = fsmProcessSpecDefinition.parse(fsmProcessSpecDefinition.example);
  const topologyAnalysis = analyzeFSMTopology(process);
  const initialSnapshot = createInitialSnapshot(process, 'run-tour');

  const inference = new InferenceManager();
  inference.register({
    id: 'echo',
    infer: async (request) => ({ id: 'response-1', output: request.input }),
  });
  const inferenceResponse = await inference.infer('echo', {
    runId: 'run-tour',
    stepId: 'step-inference',
    modelAlias: 'echo',
    input: 'provider-neutral inference',
  });

  const models = new ModelRegistry();
  models.register(new MockModelProvider('mock-tour'));
  const routing = modelRoutingSpecDefinition.parse(modelRoutingSpecDefinition.example);

  const memory = memorySpecDefinition.parse(memorySpecDefinition.example);
  const tool = toolSpecDefinition.parse(toolSpecDefinition.example);
  const tools = new ToolRegistry();
  tools.register(tool, async (input) => ({ input, source: 'package-tour' }));

  const skill = skillSpecDefinition.parse(skillSpecDefinition.example);
  const skills = new SkillRegistry();
  skills.register(skill);

  const mcp = mcpIntegrationSpecDefinition.parse(mcpIntegrationSpecDefinition.example);
  const domain = domainPackSpecDefinition.parse(domainPackSpecDefinition.example);
  const kernelAgent = reactAgentSpecDefinition.parse(reactAgentSpecDefinition.example);

  const event = createFrameworkEvent({
    id: 'event-tour-1',
    type: 'run.created',
    userId: 'owner',
    sessionId: 'session-tour',
    runId: 'run-tour',
    payload: { agentSystemId: coreSpec.id },
  });
  const traces = new InMemoryTraceRecorder();
  await traces.record(event);
  const sessions = new SessionProjector().project(await traces.list());

  const localProfiles = createLocalStorageProfiles({
    eventDbFilename: './var/events.sqlite',
    structuredDbFilename: './var/structured.sqlite',
    vectorFilename: './var/vectors.json',
    artifactRootPath: './var/artifacts',
  });

  const cache = new ServingCacheManager({ store: new MemoryCacheStore() });
  const cacheKey = cache.keyFor({
    provider: 'mock-tour',
    model: 'mock',
    messages: [{ role: 'user', content: 'cache this' }],
  });
  await cache.set(
    cacheKey,
    { content: 'cached result' },
    { provider: 'mock-tour', model: 'mock', cacheType: 'exact' }
  );

  const packageFixturePassed = assertStatePath(
    { id: 'fixture-tour', version: '1.0.0', events: [event], statePath: ['Created'] },
    ['Created']
  );
  const releaseAgent = await buildReleaseAgent();

  return {
    packages: 15,
    core: coreSpec.id,
    storage: topology.providers.map((provider: { engine?: string }) => provider.engine),
    fsm: {
      initialState: initialSnapshot.currentState,
      reachableStates: topologyAnalysis.reachableStates.length,
    },
    inference: inferenceResponse.output,
    models: {
      providers: models.list().map((provider: { id?: string }) => provider.id),
      aliases: routing.aliases.length,
    },
    memory: memory.id,
    tools: tools.getSpec(tool.id)?.id,
    skills: skills.list().map((entry) => entry.id),
    mcp: mcp.servers.map((server) => server.id),
    domain: domain.id,
    kernel: kernelAgent.id,
    harness: sessions.map((session: { id?: string }) => session.id),
    localAdapters: localProfiles.map((profile: { engine?: string }) => profile.engine),
    servingCache: Boolean(await cache.get(cacheKey)),
    testing: packageFixturePassed,
    composedAgent: releaseAgent.agent.id,
  };
}

tourPackages()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
