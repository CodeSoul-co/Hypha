import {
  createRuntimeHelperSdk,
  createRuntimeIoHelperSdk,
  DefaultRuntimeActivityHelper,
  FrameworkError,
  RuntimeEventActivityLifecycleCommitPort,
  runLeaseAuthorizationSchema,
  validateRuntimePrincipal,
  validateRuntimeRun,
  validateRuntimeScope,
  type RuntimeActivityDispatchPort,
  type RuntimeActivityHelper,
  type RuntimeClockHelper,
  type RuntimeDeterminismStore,
  type RuntimeEventCommitPort,
  type RuntimeEventHelper,
  type RuntimeIdHelper,
  type RuntimePrincipal,
  type RuntimeResourceCoordinator,
  type RuntimeResourceHelper,
  type RuntimeRun,
  type RuntimeScope,
  type RuntimeTransitionHelper,
  type RuntimeWaitHelper,
  type RunLeaseAuthorization,
} from '@hypha/core';
import {
  validateFSMProcessSpec,
  validateFSMSnapshot,
  type FSMProcessSpec,
  type FSMSnapshot,
  type FSMStateSpec,
} from '@hypha/fsm';

export interface RuntimeExecutionContext {
  readonly scope: Readonly<RuntimeScope>;
  readonly principal: Readonly<RuntimePrincipal>;
  readonly run: Readonly<RuntimeRun>;
  readonly snapshot: Readonly<FSMSnapshot>;
  readonly process: Readonly<FSMProcessSpec>;
  readonly state: Readonly<FSMStateSpec>;
  readonly attempt: number;
  readonly fencingToken: number;
  readonly abortSignal: AbortSignal;
  readonly events: RuntimeEventHelper;
  readonly activities: RuntimeActivityHelper;
  readonly transitions: RuntimeTransitionHelper;
  readonly waits: RuntimeWaitHelper;
  readonly resources: RuntimeResourceHelper;
  readonly clock: RuntimeClockHelper;
  readonly ids: RuntimeIdHelper;
}

export interface CreateRuntimeExecutionContextOptions {
  scope: RuntimeScope;
  principal: RuntimePrincipal;
  run: RuntimeRun;
  snapshot: FSMSnapshot;
  process: FSMProcessSpec;
  attempt: number;
  runLease: RunLeaseAuthorization;
  abortSignal: AbortSignal;
  determinismStore: RuntimeDeterminismStore;
  eventCommitPort: RuntimeEventCommitPort;
  activityDispatchPort: RuntimeActivityDispatchPort;
  resourceCoordinator: RuntimeResourceCoordinator;
  causationId?: string;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export function createRuntimeExecutionContext(
  options: CreateRuntimeExecutionContextOptions
): RuntimeExecutionContext {
  const scope = validateRuntimeScope(options.scope);
  const principal = validateRuntimePrincipal(options.principal);
  const run = validateRuntimeRun(options.run);
  const runLease = runLeaseAuthorizationSchema.parse(options.runLease);
  validateFSMProcessSpec(options.process);
  validateFSMSnapshot(options.process, options.snapshot, run.id);
  assertExecutionIdentity({ ...options, scope, principal, run, runLease });

  const state = options.process.states.find(
    (candidate) => candidate.id === options.snapshot.currentState
  );
  if (!state) {
    throw new FrameworkError({
      code: 'RUNTIME_STATE_NOT_FOUND',
      message: `FSM state is not part of the process: ${options.snapshot.currentState}`,
    });
  }
  const execution = {
    scope,
    stateId: state.id,
    stateAttempt: options.attempt,
    fencingToken: runLease.guard.fencingToken,
    correlationId: run.correlationId,
    ...(options.causationId === undefined ? {} : { causationId: options.causationId }),
  };
  const helpers = createRuntimeHelperSdk({
    scope: {
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      runId: scope.runId,
      stateId: state.id,
      stateAttempt: options.attempt,
    },
    determinismStore: options.determinismStore,
    now: options.now,
    nextId: options.nextId,
  });
  const io = createRuntimeIoHelperSdk({
    event: {
      execution,
      ids: helpers.ids,
      clock: helpers.clock,
      port: options.eventCommitPort,
    },
    resource: {
      runLease,
      coordinator: options.resourceCoordinator,
      ids: helpers.ids,
      clock: helpers.clock,
      stateId: state.id,
    },
  });
  const activities = new DefaultRuntimeActivityHelper({
    execution,
    ids: helpers.ids,
    clock: helpers.clock,
    dispatch: options.activityDispatchPort,
    lifecycle: new RuntimeEventActivityLifecycleCommitPort(options.eventCommitPort),
    abortSignal: options.abortSignal,
  });

  return Object.freeze({
    scope: immutable(scope),
    principal: immutable(principal),
    run: immutable(run),
    snapshot: immutable(options.snapshot),
    process: immutable(options.process),
    state: immutable(state),
    attempt: options.attempt,
    fencingToken: runLease.guard.fencingToken,
    abortSignal: options.abortSignal,
    events: io.events,
    activities,
    transitions: helpers.transitions,
    waits: helpers.waits,
    resources: io.resources,
    clock: helpers.clock,
    ids: helpers.ids,
  });
}

function assertExecutionIdentity(
  options: CreateRuntimeExecutionContextOptions & {
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    run: RuntimeRun;
  }
): void {
  const { scope, principal, run, runLease, snapshot, attempt } = options;
  if (!Number.isInteger(attempt) || attempt < 1) invalid('State attempt must be positive');
  if (run.status !== 'running') invalid('Runtime execution context requires a running Run');
  if (
    run.tenantId !== scope.tenantId ||
    run.userId !== scope.userId ||
    run.workspaceId !== scope.workspaceId ||
    run.sessionId !== scope.sessionId ||
    run.id !== scope.runId
  ) {
    mismatch('Runtime scope does not match the Run identity');
  }
  if (run.rootAgentRef && run.rootAgentRef.id !== scope.agentId) {
    mismatch('Runtime scope agent does not match the Run root agent');
  }
  if (run.currentState !== undefined && run.currentState !== snapshot.currentState) {
    mismatch('Run current state does not match the FSM snapshot');
  }
  if (
    runLease.scope.tenantId !== scope.tenantId ||
    runLease.scope.userId !== scope.userId ||
    runLease.scope.runId !== scope.runId
  ) {
    fencing('Run Lease does not authorize this Runtime scope');
  }
  if (!Number.isInteger(runLease.guard.fencingToken) || runLease.guard.fencingToken < 1) {
    fencing('Run Lease fencing token must be positive');
  }
  if (principal.tenantId !== undefined && principal.tenantId !== scope.tenantId) {
    mismatch('Runtime principal tenant does not match the execution scope');
  }
  if (principal.userId !== undefined && principal.userId !== scope.userId) {
    mismatch('Runtime principal user does not match the execution scope');
  }
  if (principal.agentId !== undefined && principal.agentId !== scope.agentId) {
    mismatch('Runtime principal agent does not match the execution scope');
  }
}

function immutable<T>(value: T): T {
  return deepFreeze(structuredClone(value));
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function mismatch(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_PROCESS_MISMATCH', message });
}

function fencing(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_FENCING_REJECTED', message });
}
