import type { ContextSpec, SpecMetadata, SpecRef, VersionedSpec } from '@hypha/core';
import type { InferenceRequest, InferenceResponse } from '@hypha/inference';
import type { MemoryScope } from '@hypha/memory';
import type { ModelMessage } from '@hypha/models';
import type { SkillRef } from '@hypha/skills';

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
