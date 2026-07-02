export type FrameworkIdPrefix =
  | 'workspace'
  | 'session'
  | 'run'
  | 'step'
  | 'event'
  | 'agent'
  | 'skill'
  | 'tool'
  | 'memory'
  | 'artifact';

export interface FrameworkId {
  prefix: FrameworkIdPrefix;
  value: string;
}

export function formatFrameworkId(id: FrameworkId): string {
  return `${id.prefix}_${id.value}`;
}
