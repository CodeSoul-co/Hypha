export interface RunRecord<TInput = unknown, TOutput = unknown> {
  id: string;
  sessionId?: string;
  agentSystemId: string;
  status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
  input: TInput;
  output?: TOutput;
  createdAt: string;
  completedAt?: string;
}

export interface TraceRecorder {
  record(event: unknown): Promise<void>;
}
