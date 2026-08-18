import { runCacheTestingExample } from './cache-testing';
import { runCapabilitiesExample } from './capabilities';
import { runCoreStorageExample } from './core-storage';
import { runDomainKernelMemoryExample } from './domain-kernel-memory';
import { runEventsHarnessAdaptersExample } from './events-harness-adapters';
import { runFsmExample } from './fsm';
import { runInferenceModelsExample } from './inference-models';

export const featureExamples = {
  'core-storage': runCoreStorageExample,
  fsm: runFsmExample,
  'inference-models': runInferenceModelsExample,
  capabilities: runCapabilitiesExample,
  'domain-kernel-memory': runDomainKernelMemoryExample,
  'events-harness-adapters': runEventsHarnessAdaptersExample,
  'cache-testing': runCacheTestingExample,
};

export type FeatureExampleName = keyof typeof featureExamples;

export async function runFeatureExample(name: FeatureExampleName): Promise<unknown> {
  return featureExamples[name]();
}

export async function runAllFeatureExamples() {
  return {
    'core-storage': await runCoreStorageExample(),
    fsm: await runFsmExample(),
    'inference-models': await runInferenceModelsExample(),
    capabilities: await runCapabilitiesExample(),
    'domain-kernel-memory': await runDomainKernelMemoryExample(),
    'events-harness-adapters': await runEventsHarnessAdaptersExample(),
    'cache-testing': await runCacheTestingExample(),
  };
}
