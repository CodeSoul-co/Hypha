import {
  analyzeFSMTopology,
  createInitialSnapshot,
  fsmProcessSpecDefinition,
} from '@codesoul-co/hypha-fsm';

/** Parse a process, inspect its graph and create the first immutable view. */
export function runFsmExample() {
  const process = fsmProcessSpecDefinition.parse(fsmProcessSpecDefinition.example);
  const analysis = analyzeFSMTopology(process);
  const snapshot = createInitialSnapshot(process, 'run-tour');

  return {
    processId: process.id,
    initialState: snapshot.currentState,
    reachableStates: analysis.reachableStates,
    unreachableStates: analysis.unreachableStates,
    terminalStates: process.terminalStates,
  };
}
