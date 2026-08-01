import type { ServerRuntimeExecutionReadiness } from '../runtime/ServerCanonicalRuntime';

export type ServerRuntimeReadinessProvider = () => Readonly<ServerRuntimeExecutionReadiness>;

let provider: ServerRuntimeReadinessProvider | undefined;

export function bindServerRuntimeReadiness(source: ServerRuntimeReadinessProvider): void {
  provider = source;
}

export function clearServerRuntimeReadiness(): void {
  provider = undefined;
}

export function getServerRuntimeReadiness(): Readonly<ServerRuntimeExecutionReadiness> {
  return (
    provider?.() ?? {
      ready: false,
      state: 'not_initialized',
      message: 'Canonical Runtime readiness is not registered',
    }
  );
}
