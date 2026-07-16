import type { ReasoningStrategyDescriptor, ReasoningStrategyReference } from './reasoning-registry';

const COT_PAPER: ReasoningStrategyReference = {
  kind: 'paper',
  title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
  url: 'https://arxiv.org/abs/2201.11903',
  official: true,
  usage: 'referenced',
};

const SELF_CONSISTENCY_PAPER: ReasoningStrategyReference = {
  kind: 'paper',
  title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models',
  url: 'https://arxiv.org/abs/2203.11171',
  official: true,
  usage: 'referenced',
};

const TOT_REPOSITORY: ReasoningStrategyReference = {
  kind: 'repository',
  title: 'Tree of Thoughts official implementation',
  url: 'https://github.com/princeton-nlp/tree-of-thought-llm',
  repository: 'princeton-nlp/tree-of-thought-llm',
  revision: '8050e67d0e3a0fddc424d7fa5801538722a4c4cc',
  license: 'MIT',
  official: true,
  usage: 'adapted',
  notes:
    'Hypha adapts deliberate branch generation, evaluation, and beam selection to provider-neutral TypeScript contracts.',
};

const TOT_PAPER: ReasoningStrategyReference = {
  kind: 'paper',
  title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models',
  url: 'https://arxiv.org/abs/2305.10601',
  official: true,
  usage: 'referenced',
};

const GOT_REPOSITORY: ReasoningStrategyReference = {
  kind: 'repository',
  title: 'Graph of Thoughts official implementation',
  url: 'https://github.com/spcl/graph-of-thoughts',
  repository: 'spcl/graph-of-thoughts',
  revision: '3d9d9dbd8937d47a4441f681b8b40e3c5b054f16',
  license: 'Custom repository license',
  official: true,
  usage: 'referenced',
  notes:
    'Hypha independently implements graph expansion and merge operations; repository code is referenced, not copied.',
};

const GOT_PAPER: ReasoningStrategyReference = {
  kind: 'paper',
  title: 'Graph of Thoughts: Solving Elaborate Problems with Large Language Models',
  url: 'https://arxiv.org/abs/2308.09687',
  official: true,
  usage: 'referenced',
};

export const REACT_OFFICIAL_REFERENCES: ReasoningStrategyReference[] = [
  {
    kind: 'repository',
    title: 'ReAct official implementation',
    url: 'https://github.com/ysymyth/ReAct',
    repository: 'ysymyth/ReAct',
    revision: '6bdb3a1fd38b8188fc7ba4102969fe483df8fdc9',
    license: 'MIT',
    official: true,
    usage: 'adapted',
    notes:
      'Hypha adapts the Reason-Act-Observe loop to its FSM, policy, tool, event, and harness contracts.',
  },
  {
    kind: 'paper',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    url: 'https://arxiv.org/abs/2210.03629',
    official: true,
    usage: 'referenced',
  },
];

export const BUILT_IN_REASONING_STRATEGY_DESCRIPTORS: ReasoningStrategyDescriptor[] = [
  {
    id: 'reasoning.direct',
    version: '1.0.0',
    method: 'direct',
    name: 'Direct inference',
    description: 'Single provider call baseline without deliberate search.',
    aliases: ['direct'],
    references: [],
    capabilities: {
      branching: false,
      graph: false,
      aggregation: false,
      streaming: true,
      toolLoop: false,
    },
  },
  {
    id: 'reasoning.cot',
    version: '1.0.0',
    method: 'cot',
    name: 'Chain of Thought',
    description: 'Prompt-guided sequential reasoning with a concise verifiable summary.',
    aliases: ['cot'],
    references: [COT_PAPER],
    capabilities: {
      branching: false,
      graph: false,
      aggregation: false,
      streaming: true,
      toolLoop: false,
    },
  },
  {
    id: 'reasoning.tot',
    version: '1.0.0',
    method: 'tot',
    name: 'Tree of Thoughts',
    description: 'Deliberate tree search over generated and evaluated thought candidates.',
    aliases: ['tot'],
    references: [TOT_REPOSITORY, TOT_PAPER],
    capabilities: {
      branching: true,
      graph: true,
      aggregation: true,
      streaming: false,
      toolLoop: false,
    },
  },
  {
    id: 'reasoning.got',
    version: '1.0.0',
    method: 'got',
    name: 'Graph of Thoughts',
    description: 'Graph reasoning with candidate expansion and merge transformations.',
    aliases: ['got'],
    references: [GOT_REPOSITORY, GOT_PAPER],
    capabilities: {
      branching: true,
      graph: true,
      aggregation: true,
      streaming: false,
      toolLoop: false,
    },
  },
  {
    id: 'reasoning.self-consistency',
    version: '1.0.0',
    method: 'self_consistency',
    name: 'Self Consistency',
    description: 'Samples independent reasoning paths and selects the most consistent answer.',
    aliases: ['self_consistency', 'self-consistency'],
    references: [COT_PAPER, SELF_CONSISTENCY_PAPER],
    capabilities: {
      branching: true,
      graph: false,
      aggregation: true,
      streaming: false,
      toolLoop: false,
    },
  },
];

export function builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor {
  const descriptor = BUILT_IN_REASONING_STRATEGY_DESCRIPTORS.find((item) => item.id === id);
  if (!descriptor) throw new Error(`Unknown built-in reasoning strategy: ${id}`);
  return descriptor;
}
