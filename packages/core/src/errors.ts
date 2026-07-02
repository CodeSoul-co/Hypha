export interface FrameworkErrorInit {
  code: string;
  message: string;
  context?: Record<string, unknown>;
  cause?: unknown;
}

export class FrameworkError extends Error {
  readonly code: string;
  readonly context?: Record<string, unknown>;
  override readonly cause?: unknown;

  constructor(init: FrameworkErrorInit) {
    super(init.message);
    this.name = 'FrameworkError';
    this.code = init.code;
    this.context = init.context;
    this.cause = init.cause;
  }
}
