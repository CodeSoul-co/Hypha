# Intelligence: Models & Inference

Model packages normalize provider behavior. Application and Kernel code should address aliases or backend IDs, not provider SDK types.

## `hypha-models`

Register implementations behind a stable provider interface and validate routing independently.

```ts
import {
  MockModelProvider,
  ModelRegistry,
  modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';

const models = new ModelRegistry();
models.register(new MockModelProvider('deterministic-test'));

const routing = modelRoutingSpecDefinition.parse(
  modelRoutingSpecDefinition.example,
);
const provider = models.get('deterministic-test');
if (!provider) throw new Error('Model provider is not registered');
```

Use `MockModelProvider` for deterministic contract tests. Register a concrete provider only in trusted server composition and address it through a versioned alias such as `reasoning.primary`.

## `hypha-inference`

InferenceManager normalizes requests before they reach a backend. It is the integration point for prompt evidence and prefix/KV cache coordination.

```ts
import { InferenceManager } from '@codesoul-co/hypha-inference';

const inference = new InferenceManager();
inference.register({
  id: 'primary',
  infer: async (request) => ({
    id: `response-${request.stepId}`,
    output: request.input,
  }),
});

const response = await inference.infer('primary', {
  runId: 'run-1',
  stepId: 'step-think',
  modelAlias: 'reasoning.primary',
  input: 'Summarize the evidence.',
});
```

## Production binding

1. Validate routing aliases during deployment.
2. Register provider adapters at startup.
3. Pass normalized requests from Kernel through InferenceManager.
4. Record request/response evidence through Harness, subject to redaction limits.
5. Treat cache hits as projections; they never replace Run Events.

Provider API keys belong in environment/secret resolution. Never place them in Domain Packs, prompts, Events or public configuration examples.
