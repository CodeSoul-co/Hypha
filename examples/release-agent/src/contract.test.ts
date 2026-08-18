import assert from 'node:assert/strict';
import { buildReleaseAgent } from './agent';
import { runAllFeatureExamples } from './features';

async function main(): Promise<void> {
  const first = await buildReleaseAgent();
  const second = await buildReleaseAgent();

  assert.deepEqual(first.compiled.fsmProcess, second.compiled.fsmProcess);
  assert.deepEqual(first.customFsm, second.customFsm);
  assert.deepEqual(first.compiled.harnessedSystem, second.compiled.harnessedSystem);
  assert.equal(first.compiled.fsmProcess.id, 'fsm.react.runtime.default');
  assert.equal(first.customFsm.id, 'workflow.research');
  assert.equal(first.customFsm.initialState, 'Research');
  assert.deepEqual(first.customFsm.terminalStates, ['Completed', 'Failed']);
  assert.equal(first.compiled.bindings.outputContract?.id, 'output.research');
  assert.equal(first.agent.memoryProfileRef, 'memory.release');
  assert.equal(
    (first.agent.metadata as Record<string, unknown> | undefined)?.reasoningProfileRef,
    'reasoning.release'
  );
  assert.deepEqual(
    first.compiled.bindings.evaluations.map((evaluation) => evaluation.id),
    ['eval.research-output']
  );
  assert.deepEqual(first.agent.toolRefs, ['search']);
  assert.deepEqual(first.agent.skillRefs, [{ id: 'skill.release-research', version: '1.0.0' }]);

  const features = await runAllFeatureExamples();
  assert.equal(features['core-storage'].storageEngines[0], 'sqlite');
  assert.equal(features.fsm.initialState, 'Idle');
  assert.equal(features['inference-models'].inferenceOutput, 'provider-neutral inference');
  assert.equal(features.capabilities.toolId, 'tool.search');
  assert.equal(features['domain-kernel-memory'].memoryProfileId, 'memory.default');
  assert.deepEqual(features['events-harness-adapters'].sessionIds, ['session-tour']);
  assert.equal(features['cache-testing'].cacheHit, true);
  assert.equal(features['cache-testing'].statePathMatches, true);

  process.stdout.write('Release Agent contract is deterministic and valid.\n');
}

void main();
