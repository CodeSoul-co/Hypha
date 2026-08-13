import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { getEventRuntime, type StartRunInput } from '../services/EventRuntime';
import { HTTP_STATUS } from '../constants';
import { agentPromptSpecSchema } from '@codesoul-co/hypha-inference';
import {
  sessionCommandStatusSchema,
  type SessionCommandRecord,
  type SessionCommandStatus,
} from '@codesoul-co/hypha-core';
import { z } from 'zod';
import { getServerRuntimeReadiness } from '../services/ServerRuntimeReadiness';

const router = Router();

router.use(authMiddleware(true));

const startReActRunSchema = z
  .object({
    stepId: z.string().trim().min(1).max(256).optional(),
    modelAlias: z.string().trim().min(1).max(256).optional(),
    messages: z
      .array(
        z
          .object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string().max(1_000_000),
            name: z.string().trim().min(1).max(256).optional(),
          })
          .strict()
      )
      .min(1)
      .max(10_000),
    systemPrompt: z.string().max(1_000_000).optional(),
    agentSpec: z.record(z.unknown()).optional(),
    budget: z
      .object({
        iterations: z.number().int().positive().optional(),
        modelCalls: z.number().int().positive().optional(),
        toolCalls: z.number().int().nonnegative().optional(),
        totalTokens: z.number().int().positive().optional(),
      })
      .strict()
      .optional(),
    deadlineAt: z.string().datetime({ offset: true }).optional(),
  })
  .strict();

const startRunCommandBodySchema = z
  .object({
    input: z.unknown().optional(),
    agentId: z.string().trim().min(1).optional(),
    workflowRef: z
      .object({
        id: z.string().trim().min(1),
        version: z.string().trim().min(1).optional(),
        revision: z.string().trim().min(1).optional(),
      })
      .strict()
      .optional(),
    domainPack: z.unknown().optional(),
    fsm: z.unknown().optional(),
    react: startReActRunSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

const sessionCommandListQuerySchema = z
  .object({
    status: z.string().trim().min(1).optional(),
    fromSequence: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().min(1).max(1000).optional(),
  })
  .strict();

const humanTaskDecisionSchema = z
  .object({
    decision: z.enum(['approved', 'rejected']),
    expectedRevision: z.number().int().positive(),
    expectedSubjectHash: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
    reason: z.string().trim().min(1).max(16_384).optional(),
  })
  .strict();

const manualFSMTransitionSchema = z
  .object({
    processId: z.string().trim().min(1).max(512),
    processVersion: z.string().trim().min(1).max(128),
    expectedState: z.string().trim().min(1).max(512),
    expectedRunRevision: z.number().int().nonnegative(),
    targetState: z.string().trim().min(1).max(512),
    reason: z.string().trim().min(1).max(16_384),
    guardContext: z
      .object({
        input: z.unknown().optional(),
        variables: z.record(z.unknown()).optional(),
        metadata: z.record(z.unknown()).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

router.post(
  '/sessions/:sessionId/commands/start-run',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = authenticatedUserId(req);
    if (!userId) return unauthorized(res);
    const readiness = getServerRuntimeReadiness();
    if (!readiness.ready) {
      return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
        success: false,
        error: {
          code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
          message: readiness.message,
          details: { state: readiness.state },
        },
      });
    }
    const sessionId = req.params.sessionId.trim();
    const idempotencyKey = req.get('Idempotency-Key')?.trim();
    if (!sessionId || !idempotencyKey || idempotencyKey.length > 256) {
      return invalidSessionCommand(
        res,
        'A non-empty sessionId and 1 to 256 character Idempotency-Key are required'
      );
    }
    const parsed = startRunCommandBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return invalidSessionCommand(
        res,
        'start_run command body is invalid',
        parsed.error.flatten()
      );
    }
    const command = await getEventRuntime().enqueueStartRun(
      {
        ...(parsed.data as Omit<StartRunInput, 'userId' | 'sessionId'>),
        userId,
        sessionId,
      },
      idempotencyKey
    );
    return res
      .status(HTTP_STATUS.ACCEPTED)
      .json({ success: true, data: publicSessionCommand(command) });
  })
);

router.get(
  '/sessions/:sessionId/commands',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = authenticatedUserId(req);
    if (!userId) return unauthorized(res);
    const sessionId = req.params.sessionId.trim();
    if (!sessionId) return invalidSessionCommand(res, 'sessionId must be non-empty');
    const parsed = sessionCommandListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return invalidSessionCommand(res, 'Session Command query is invalid', parsed.error.flatten());
    }
    const statuses = parseSessionCommandStatuses(parsed.data.status);
    if (statuses === null) {
      return invalidSessionCommand(res, 'status contains an unsupported Session Command status');
    }
    const commands = await getEventRuntime().listSessionCommands(
      { userId, sessionId },
      {
        ...(statuses === undefined ? {} : { statuses }),
        ...(parsed.data.fromSequence === undefined
          ? {}
          : { fromSequence: parsed.data.fromSequence }),
        ...(parsed.data.limit === undefined ? {} : { limit: parsed.data.limit }),
      }
    );
    return res.json({ success: true, data: commands.map(publicSessionCommand) });
  })
);

router.get('/reasoning/strategies', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: getEventRuntime().listReasoningStrategies(),
  });
});

router.get(
  '/agent-prompts',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await getEventRuntime().listAgentPrompts() });
  })
);

router.post(
  '/agent-prompts',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = agentPromptSpecSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_AGENT_PROMPT',
          message: 'Agent prompt spec is invalid',
          details: parsed.error.flatten(),
        },
      });
    }
    const stored = await getEventRuntime().registerAgentPrompt(parsed.data);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: stored });
  })
);

router.put(
  '/agent-prompts/:id/:version',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = agentPromptSpecSchema.safeParse({
      ...req.body,
      id: req.params.id,
      version: req.params.version,
    });
    const expectedRevision = Number(req.header('if-match'));
    if (!parsed.success || !Number.isInteger(expectedRevision) || expectedRevision < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_AGENT_PROMPT_UPDATE',
          message: 'A valid prompt and numeric If-Match revision are required.',
        },
      });
    }
    const stored = await getEventRuntime().registerAgentPrompt(parsed.data, { expectedRevision });
    res.json({ success: true, data: stored });
  })
);

router.delete(
  '/agent-prompts/:id',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const version = typeof req.query.version === 'string' ? req.query.version : undefined;
    const removed = await getEventRuntime().unregisterAgentPrompt(req.params.id, version);
    if (!removed) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'AGENT_PROMPT_NOT_FOUND', message: 'Agent prompt not found' },
      });
    }
    res.json({ success: true, data: { id: req.params.id, version } });
  })
);

router.get(
  '/runs/:runId',
  asyncHandler(async (req: Request, res: Response) => {
    const run = await requireRunAccess(req, res);
    if (!run) return;
    res.json({ success: true, data: run });
  })
);

router.get(
  '/runs/:runId/events',
  asyncHandler(async (req: Request, res: Response) => {
    if (!(await requireRunAccess(req, res))) return;
    const events = await getEventRuntime().listEvents(req.params.runId);
    res.json({ success: true, data: events });
  })
);

router.get(
  '/runs/:runId/fsm',
  asyncHandler(async (req: Request, res: Response) => {
    const run = await requireRunAccess(req, res);
    if (!run) return;
    const requesterUserId = authenticatedUserId(req);
    if (!requesterUserId) return unauthorized(res);
    if (requesterUserId !== run.userId) return ownerOnly(res);
    const view = await getEventRuntime().inspectOwnedFSM(req.params.runId, requesterUserId);
    res.json({ success: true, data: view });
  })
);

router.post(
  '/runs/:runId/fsm/transitions',
  asyncHandler(async (req: Request, res: Response) => {
    const run = await requireRunAccess(req, res);
    if (!run) return;
    const principalId = authenticatedUserId(req);
    if (!principalId) return unauthorized(res);
    if (principalId !== run.userId) return ownerOnly(res);
    const idempotencyKey = req.get('Idempotency-Key')?.trim();
    if (!idempotencyKey || idempotencyKey.length > 256) {
      return invalidSessionCommand(
        res,
        'A 1 to 256 character Idempotency-Key is required for a manual FSM transition'
      );
    }
    const parsed = manualFSMTransitionSchema.safeParse(req.body);
    if (!parsed.success) {
      return invalidSessionCommand(
        res,
        'Manual FSM transition body is invalid',
        parsed.error.flatten()
      );
    }
    const result = await getEventRuntime().transitionOwnedFSM({
      runId: req.params.runId,
      ownerUserId: run.userId,
      principalId,
      ...parsed.data,
      idempotencyKey,
    });
    res.json({ success: true, data: result });
  })
);

router.get(
  '/runs/:runId/human-tasks',
  asyncHandler(async (req: Request, res: Response) => {
    const run = await requireRunAccess(req, res);
    if (!run) return;
    const tasks = await getEventRuntime().listOwnedRuntimeHumanTasks(req.params.runId, run.userId);
    res.json({ success: true, data: tasks });
  })
);

router.post(
  '/runs/:runId/human-tasks/:taskId/decision',
  asyncHandler(async (req: Request, res: Response) => {
    const run = await requireRunAccess(req, res);
    if (!run) return;
    const principalId = authenticatedUserId(req);
    if (!principalId) return unauthorized(res);
    const idempotencyKey = req.get('Idempotency-Key')?.trim();
    if (!idempotencyKey || idempotencyKey.length > 256) {
      return invalidSessionCommand(
        res,
        'A 1 to 256 character Idempotency-Key is required for a HumanTask decision'
      );
    }
    const parsed = humanTaskDecisionSchema.safeParse(req.body);
    if (!parsed.success) {
      return invalidSessionCommand(
        res,
        'HumanTask decision body is invalid',
        parsed.error.flatten()
      );
    }
    const taskId = req.params.taskId.trim();
    if (!taskId || taskId.length > 512) {
      return invalidSessionCommand(res, 'taskId must contain 1 to 512 characters');
    }
    const task = await getEventRuntime().decideOwnedRuntimeHumanTask({
      runId: req.params.runId,
      ownerUserId: run.userId,
      principalId,
      taskId,
      expectedRevision: parsed.data.expectedRevision,
      expectedSubjectHash: parsed.data.expectedSubjectHash,
      decision: parsed.data.decision,
      ...(parsed.data.reason === undefined ? {} : { reason: parsed.data.reason }),
      idempotencyKey,
    });
    res.json({ success: true, data: task });
  })
);

router.get(
  '/runs/:runId/replay',
  asyncHandler(async (req: Request, res: Response) => {
    if (!(await requireRunAccess(req, res))) return;
    const replay = await getEventRuntime().projectReplay(req.params.runId);
    res.json({ success: true, data: replay });
  })
);

router.get(
  '/runs/:runId/audit',
  asyncHandler(async (req: Request, res: Response) => {
    if (!(await requireRunAccess(req, res))) return;
    const audit = await getEventRuntime().projectAudit(req.params.runId);
    res.json({ success: true, data: audit });
  })
);

router.get(
  '/runs/:runId/regression',
  asyncHandler(async (req: Request, res: Response) => {
    if (!(await requireRunAccess(req, res))) return;
    const regression = await getEventRuntime().projectRegression(req.params.runId);
    res.json({ success: true, data: regression });
  })
);

async function requireRunAccess(req: Request, res: Response) {
  const run = await getEventRuntime().projectRun(req.params.runId);
  if (!run) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'RUN_NOT_FOUND', message: 'Run not found' },
    });
    return undefined;
  }

  const requesterUserId = req.user?.userId ?? req.apiKey?.userId;
  if (!req.user?.isAdmin && (!requesterUserId || requesterUserId !== run.userId)) {
    res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      error: {
        code: 'RUNTIME_RUN_ACCESS_DENIED',
        message: 'Runtime Run belongs to another user',
      },
    });
    return undefined;
  }

  return run;
}

function authenticatedUserId(req: Request): string | undefined {
  return req.user?.userId ?? req.apiKey?.userId;
}

function unauthorized(res: Response): Response {
  return res.status(HTTP_STATUS.UNAUTHORIZED).json({
    success: false,
    error: { code: 'UNAUTHORIZED', message: 'User ID required' },
  });
}

function ownerOnly(res: Response): Response {
  return res.status(HTTP_STATUS.FORBIDDEN).json({
    success: false,
    error: {
      code: 'RUNTIME_RUN_ACCESS_DENIED',
      message: 'Only the Run owner can control its FSM',
    },
  });
}

function invalidSessionCommand(res: Response, message: string, details?: unknown): Response {
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    error: {
      code: 'INVALID_SESSION_COMMAND',
      message,
      ...(details === undefined ? {} : { details }),
    },
  });
}

function parseSessionCommandStatuses(value?: string): SessionCommandStatus[] | undefined | null {
  if (value === undefined) return undefined;
  const parsed = z
    .array(sessionCommandStatusSchema)
    .min(1)
    .safeParse(value.split(',').map((status) => status.trim()));
  return parsed.success ? parsed.data : null;
}

function publicSessionCommand(command: SessionCommandRecord) {
  const {
    payloadRef: _payloadRef,
    payloadHash: _payloadHash,
    claimedBy: _claimedBy,
    claimToken: _claimToken,
    leaseExpiresAt: _leaseExpiresAt,
    leaseEpoch: _leaseEpoch,
    ...publicRecord
  } = command;
  return publicRecord;
}

export default router;
