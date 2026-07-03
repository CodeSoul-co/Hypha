import { z, type ZodType } from 'zod';
import type { ContextSpec, JsonSchema, SpecMetadata, SpecRef, VersionedSpec } from '@hypha/core';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  specMetadataSchema,
  specRefSchema,
  versionedSpecSchema,
} from '@hypha/core';
import type { InferenceProvider, InferenceRequest, InferenceResponse } from '@hypha/inference';
import type { MemoryScope } from '@hypha/memory';
import type { ModelMessage } from '@hypha/models';
import { skillRefSchema, type SkillRef } from '@hypha/skills';
import type { ToolRunner } from '@hypha/tools';

export interface ReActAgentSpec extends VersionedSpec, SpecMetadata {
  name: string;
  modelAlias: string;
  systemInstructions?: string;
  skillRefs?: SkillRef[];
  toolRefs?: string[];
  memoryProfileRef?: string;
  policyRefs?: string[];
  contextSpecRef?: SpecRef;
}

export type ReActPhase =
  | 'observe'
  | 'reason'
  | 'select_action'
  | 'policy_check'
  | 'act'
  | 'observe_result'
  | 'verify'
  | 'memory_sync'
  | 'complete'
  | 'fail'
  | 'human_review';

export interface ReActStep {
  id: string;
  phase: ReActPhase;
  input?: unknown;
  output?: unknown;
  traceEventId?: string;
}

export interface ReActRunContext {
  runId: string;
  stepId: string;
  agent: ReActAgentSpec;
  messages: ModelMessage[];
  memoryScope?: MemoryScope;
  contextSpec?: ContextSpec;
  metadata?: Record<string, unknown>;
}

export interface ReActAction {
  type: 'tool' | 'model' | 'finish' | 'human_review';
  target?: string;
  input?: unknown;
  reason?: string;
}

export interface ReActObservation<TValue = unknown> {
  source: 'model' | 'tool' | 'memory' | 'human' | 'system';
  value: TValue;
  provenance?: Record<string, unknown>;
}

export interface ReActAgentRuntime {
  reason(context: ReActRunContext): Promise<InferenceRequest>;
  selectAction(response: InferenceResponse): Promise<ReActAction>;
  verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}

export interface ReActRunnerOptions {
  inference: InferenceProvider;
  toolRunner?: ToolRunner;
  maxIterations?: number;
  onStep?: (step: ReActStep) => Promise<void> | void;
  syncMemory?: (context: ReActRunContext, observation: ReActObservation) => Promise<void>;
}

export interface ReActRunResult {
  runId: string;
  status: 'completed' | 'failed' | 'human_review_required';
  steps: ReActStep[];
  output?: unknown;
  finalAction?: ReActAction;
  error?: unknown;
}

export const REACT_PHASE_ORDER: ReActPhase[] = [
  'observe',
  'reason',
  'select_action',
  'policy_check',
  'act',
  'observe_result',
  'verify',
  'memory_sync',
];

export function createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep {
  return { id, phase, input };
}

export class ReActRunner {
  private readonly maxIterations: number;

  constructor(
    private readonly runtime: ReActAgentRuntime,
    private readonly options: ReActRunnerOptions
  ) {
    this.maxIterations = Math.max(1, options.maxIterations ?? 4);
  }

  async run(context: ReActRunContext): Promise<ReActRunResult> {
    const steps: ReActStep[] = [];
    const pushStep = async (phase: ReActPhase, input?: unknown, output?: unknown): Promise<ReActStep> => {
      const step = createReActStep(`${context.stepId}:${steps.length + 1}:${phase}`, phase, input);
      step.output = output;
      steps.push(step);
      await this.options.onStep?.(step);
      return step;
    };

    try {
      await pushStep('observe', { messageCount: context.messages.length });
      const inferenceRequest = await this.runtime.reason(context);
      await pushStep('reason', { modelAlias: inferenceRequest.modelAlias }, inferenceRequest);

      const response = await this.options.inference.infer(inferenceRequest);
      let action = await this.runtime.selectAction(response);
      await pushStep('select_action', response, action);

      for (let iteration = 0; iteration < this.maxIterations; iteration += 1) {
        if (action.type === 'human_review') {
          await pushStep('human_review', action);
          return {
            runId: context.runId,
            status: 'human_review_required',
            steps,
            finalAction: action,
          };
        }

        if (action.type === 'finish' || action.type === 'model') {
          const observation: ReActObservation = {
            source: action.type === 'model' ? 'model' : 'system',
            value: action.input ?? response.output,
          };
          const verifiedAction = await this.runtime.verify(context, observation);
          await pushStep('verify', observation, verifiedAction);
          if (verifiedAction.type === 'human_review') {
            await pushStep('human_review', verifiedAction);
            return {
              runId: context.runId,
              status: 'human_review_required',
              steps,
              finalAction: verifiedAction,
            };
          }
          if (verifiedAction.type !== 'finish' && verifiedAction.type !== 'model') {
            action = verifiedAction;
            continue;
          }
          await this.options.syncMemory?.(context, observation);
          await pushStep('memory_sync', { source: observation.source });
          const output = verifiedAction.input ?? observation.value;
          await pushStep('complete', verifiedAction, output);
          return {
            runId: context.runId,
            status: 'completed',
            steps,
            output,
            finalAction: verifiedAction,
          };
        }

        await pushStep('policy_check', action);
        const observation = await this.executeAction(context, action);
        await pushStep('act', action, observation);
        await pushStep('observe_result', action, observation);

        action = await this.runtime.verify(context, observation);
        await pushStep('verify', observation, action);
        await this.options.syncMemory?.(context, observation);
        await pushStep('memory_sync', { source: observation.source });
      }

      throw new Error(`ReAct runner exceeded max iterations: ${this.maxIterations}`);
    } catch (error) {
      await pushStep('fail', undefined, error instanceof Error ? error.message : String(error));
      return {
        runId: context.runId,
        status: 'failed',
        steps,
        error,
      };
    }
  }

  private async executeAction(
    context: ReActRunContext,
    action: ReActAction
  ): Promise<ReActObservation> {
    if (action.type !== 'tool') {
      return { source: 'system', value: action };
    }
    if (!this.options.toolRunner || !action.target) {
      throw new Error(`Tool action cannot execute without toolRunner and target: ${action.target ?? '<missing>'}`);
    }
    const result = await this.options.toolRunner.run({
      toolId: action.target,
      input: action.input ?? {},
      context: {
        runId: context.runId,
        stepId: `${context.stepId}:tool:${action.target}`,
        userId: context.memoryScope?.userId,
        sessionId: context.memoryScope?.sessionId,
        metadata: context.metadata,
      },
    });
    if (result.status !== 'completed') {
      return {
        source: result.status === 'human_review_required' ? 'human' : 'tool',
        value: result,
        provenance: { toolId: action.target, status: result.status },
      };
    }
    return {
      source: 'tool',
      value: result.output,
      provenance: { toolId: action.target, status: result.status },
    };
  }
}

export const reactPhaseSchema = z.enum([
  'observe',
  'reason',
  'select_action',
  'policy_check',
  'act',
  'observe_result',
  'verify',
  'memory_sync',
  'complete',
  'fail',
  'human_review',
]);

export const reactAgentSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    name: z.string().min(1),
    modelAlias: z.string().min(1),
    systemInstructions: z.string().optional(),
    skillRefs: z.array(skillRefSchema).optional(),
    toolRefs: z.array(z.string()).optional(),
    memoryProfileRef: z.string().optional(),
    policyRefs: z.array(z.string()).optional(),
    contextSpecRef: specRefSchema.optional(),
  }) satisfies ZodType<ReActAgentSpec>;

export const reactAgentSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'name', 'modelAlias'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    modelAlias: { type: 'string' },
    systemInstructions: { type: 'string' },
    skillRefs: { type: 'array', items: { type: 'object' } },
    toolRefs: { type: 'array', items: { type: 'string' } },
    memoryProfileRef: { type: 'string' },
    policyRefs: { type: 'array', items: { type: 'string' } },
    contextSpecRef: { type: 'object' },
  },
  additionalProperties: false,
};

export const reactAgentSpecExample: ReActAgentSpec = {
  id: 'agent.default',
  version: '0.0.0',
  name: 'Default ReAct Agent',
  modelAlias: 'default-chat',
  systemInstructions: 'Follow the declared workflow and use tools only after policy checks.',
  skillRefs: [{ id: 'skill.context-enrichment' }],
  toolRefs: ['tool.search'],
  memoryProfileRef: 'memory.default',
  policyRefs: ['policy.default'],
};

export const reactAgentSpecDefinition = defineSpecSchema<ReActAgentSpec>({
  id: 'ReActAgentSpec',
  zod: reactAgentSpecSchema,
  jsonSchema: reactAgentSpecJsonSchema,
  example: reactAgentSpecExample,
});

export const kernelSpecDefinitions = [reactAgentSpecDefinition] as const;
export const kernelSpecJsonSchemas = exportSpecJsonSchemas(kernelSpecDefinitions);

export function validateReActAgentSpec(input: unknown): ReActAgentSpec {
  return reactAgentSpecDefinition.parse(input);
}
