export interface ReActAgentSpec {
  id: string;
  version: string;
  name: string;
  modelAlias: string;
  systemInstructions?: string;
  skillRefs?: string[];
  toolRefs?: string[];
  memoryProfileRef?: string;
  policyRefs?: string[];
}

export type ReActPhase = 'observe' | 'reason' | 'act' | 'observe-result' | 'verify';

export interface ReActStep {
  id: string;
  phase: ReActPhase;
  input?: unknown;
  output?: unknown;
}
