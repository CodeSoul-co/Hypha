import { InferenceManager } from '@codesoul-co/hypha-inference';
import {
  MockModelProvider,
  ModelRegistry,
  modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';

/** Register provider-neutral inference and model-routing implementations. */
export async function runInferenceModelsExample() {
  const inference = new InferenceManager();
  inference.register({
    id: 'echo',
    infer: async (request) => ({ id: 'response-1', output: request.input }),
  });
  const response = await inference.infer('echo', {
    runId: 'run-tour',
    stepId: 'step-inference',
    modelAlias: 'echo',
    input: 'provider-neutral inference',
  });

  const models = new ModelRegistry();
  models.register(new MockModelProvider('mock-tour'));
  const routing = modelRoutingSpecDefinition.parse(modelRoutingSpecDefinition.example);

  return {
    inferenceOutput: response.output,
    modelProviders: models.list().map((provider) => provider.id),
    modelAliases: routing.aliases.map((alias) => alias.alias),
  };
}
