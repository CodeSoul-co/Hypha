export type FsmTerminalStatus = 'completed' | 'failed' | 'cancelled';

export interface FSMStateSpec {
  id: string;
  description?: string;
  timeoutMs?: number;
}

export interface FSMTransitionSpec {
  from: string;
  to: string;
  guard?: string;
}

export interface FSMProcessSpec {
  id: string;
  version: string;
  initialState: string;
  states: FSMStateSpec[];
  transitions: FSMTransitionSpec[];
  terminalStates: string[];
}
