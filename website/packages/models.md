# `@codesoul-co/hypha-models`

`hypha-models` normalizes chat/model providers and resolves stable aliases to concrete provider/model targets. It supplies OpenAI-compatible adapters, deterministic mocks, routing specs and normalized provider errors.

```bash
npm install @codesoul-co/hypha-models@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `ModelProvider` | Provider-neutral request/response interface |
| `ModelRegistry` | Register and retrieve provider implementations |
| `ModelAliasRegistry` | Resolve versioned aliases to provider/model targets |
| `ModelRouter` | Route normalized requests through aliases |
| `MockModelProvider` | Deterministic tests without network calls |
| `OpenAICompatibleModelProvider` | Bind an OpenAI-compatible HTTP endpoint |
| `modelRoutingSpecDefinition` | Validate deploy-time routing configuration |

## Register a deterministic provider

```ts
import {
  MockModelProvider,
  ModelRegistry,
  modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';

const providers = new ModelRegistry();
providers.register(new MockModelProvider('mock-test'));

const routing = modelRoutingSpecDefinition.parse({
  ...modelRoutingSpecDefinition.example,
  id: 'models.release',
  version: '1.0.0',
});

const provider = providers.get('mock-test');
if (!provider) throw new Error('Provider was not registered');
```

Use the mock in unit, replay and regression tests. Assertions should cover normalized messages, tool calls, usage and error mapping rather than only checking that a method returned.

## Bind an OpenAI-compatible endpoint

Construct concrete providers only in trusted server startup code. Supply the API key from environment/secret resolution, not from an Agent or Domain Pack.

```ts
import {
  OpenAICompatibleModelProvider,
} from '@codesoul-co/hypha-models';

const provider = new OpenAICompatibleModelProvider({
  id: 'provider.primary',
  type: 'openai-compatible',
  baseUrl: process.env.MODEL_BASE_URL!,
  apiKey: process.env.MODEL_API_KEY!,
  providerModelByAlias: {
    'reasoning.primary': 'configured-at-deployment',
  },
});
```

Validate the exact constructor options against your v1.0.1 TypeScript types; endpoint-specific headers and transport can also be injected through the exported transport contracts.

## Routing rules

- Agent specs reference an alias such as `reasoning.primary`.
- Deployment configuration maps that alias to a provider and model.
- Capabilities and fallback choices are validated before accepting traffic.
- Provider failures are normalized with `normalizeModelProviderError`.
- Model responses are evidence inputs; Harness Events remain authoritative.

Use [`hypha-inference`](./inference) when you also need prompt compilation, backend registration or prefix/KV cache coordination.
