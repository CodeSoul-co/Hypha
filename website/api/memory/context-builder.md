# `@codesoul-co/hypha-memory` / `context-builder`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-builder.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CalibratedCharacterTokenEstimator` | class | <code>new CalibratedCharacterTokenEstimator(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Runtime implementation for Calibrated Character Token Estimator; see its public constructor and members below. |
| `DefaultContextInjectionGateway` | class | <code>new DefaultContextInjectionGateway(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Runtime implementation for Default Context Injection Gateway; see its public constructor and members below. |
| `DefaultMemoryContextBuilder` | class | <code>new DefaultMemoryContextBuilder(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Runtime implementation for Default Memory Context Builder; see its public constructor and members below. |
| `MetadataContextItemPolicyEvaluator` | class | <code>new MetadataContextItemPolicyEvaluator(): MetadataContextItemPolicyEvaluator</code> | Runtime implementation for Metadata Context Item Policy Evaluator; see its public constructor and members below. |

## `CalibratedCharacterTokenEstimator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Creates an instance of this class. |
| `estimate` | method | <code>estimate(text: string): number</code> | Public runtime operation for estimate. |
| `id` | property | <code>id: "tokenizer.calibrated-character-v1"</code> | Public id property. |

## `DefaultContextInjectionGateway` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildEnvelope` | method | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | Builds Envelope at this module boundary. |
| `constructor` | constructor | <code>(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Creates an instance of this class. |

## `DefaultMemoryContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public runtime operation for explain. |

## `MetadataContextItemPolicyEvaluator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MetadataContextItemPolicyEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;{ allowed: boolean; reason?: string; }&gt;</code> | Evaluates evaluate at this module boundary. |
