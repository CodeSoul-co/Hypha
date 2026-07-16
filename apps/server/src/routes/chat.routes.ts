import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, apiKeyMiddleware } from '../middleware/auth';
import { getTemporaryMemory } from '../core/memory/TemporaryMemory';
import { getPermanentMemory } from '../core/memory/PermanentMemory';
import { getSkillManager } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { getTokenService } from '../services/TokenService';
import { getEventRuntime } from '../services/EventRuntime';
import { generateSessionId, generateMessageId, now } from '../utils/helpers';
import { logger } from '../utils/logger';
import { TempMessage, LLMMessage } from '../core/llm/types';
import {
  agentPromptRefSchema,
  type AgentPromptRef,
  type ReasoningMethod,
  type ReasoningOptions,
} from '@hypha/inference';

const router = Router();

// Apply authentication to all chat routes
router.use(apiKeyMiddleware);
router.use(authMiddleware(false));

// ============================================================
// User-scoped session concurrency lock.
// Requests for the same user's session are queued; different users can reuse
// the same sessionId without blocking or sharing state.
// ============================================================
const sessionLocks = new Map<string, Promise<void>>();

function acquireSessionLock(
  sessionId: string,
  userId: string
): { release: () => void; wait: () => Promise<void> } {
  const lockKey = `${userId}:${sessionId}`;
  let currentLock = sessionLocks.get(lockKey);

  if (!currentLock) {
    currentLock = Promise.resolve();
    sessionLocks.set(lockKey, currentLock);
  }

  // Create a new promise that waits for current and becomes the new lock
  let releaseLock: () => void;
  const newLock = new Promise<void>((resolve) => {
    releaseLock = resolve;
  });

  sessionLocks.set(lockKey, newLock);

  return {
    release: () => {
      releaseLock!();
      if (sessionLocks.get(lockKey) === newLock) {
        sessionLocks.delete(lockKey);
      }
    },
    wait: async () => {
      await currentLock!;
    },
  };
}

// ============================================================
// Helper: Send SSE error (Bug 1 Fix)
// Ensures errors are always sent in SSE format, never as HTTP error
// ============================================================
function sendSSEError(
  res: Response,
  errorCode: string,
  errorMessage: string,
  sessionId?: string
): void {
  logger.warn(`[SSE Error] ${errorCode}: ${errorMessage} | sessionId: ${sessionId || 'none'}`);
  res.write(`data: ${JSON.stringify({ type: 'error', error: errorMessage, code: errorCode })}\n\n`);
  res.end();
}

// ============================================================
// POST /chat - Send message (non-streaming)
// ============================================================
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, message, model, provider, agentId, promptRefs, cache, reasoning } = req.body;
    const userId = req.user?.userId || req.apiKey?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    // Bug 3 Fix: Trim message and check for empty/whitespace-only
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';
    if (!trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_MESSAGE',
          message: 'Message is required and cannot be empty',
        },
      });
    }

    const session = sessionId || generateSessionId();
    const lock = acquireSessionLock(session, userId);
    await lock.wait();
    const runtime = getEventRuntime();
    let runId: string | undefined;

    try {
      const runtimeRun = await runtime.startRun({
        userId,
        sessionId: session,
        agentId,
        input: {
          message: trimmedMessage,
          model,
          provider,
          agentId,
          cacheEnabled: Boolean(cache),
        },
        metadata: { surface: 'http.chat', cacheEnabled: Boolean(cache) },
      });
      runId = runtimeRun.runId;
      const messageId = generateMessageId();
      const startTime = Date.now();
      const tempMemory = getTemporaryMemory();
      const permanentMemory = getPermanentMemory();
      const resolvedChatModel = runtime.resolveChatModel(model);

      logger.debug(`[Chat] Request started`, {
        sessionId: session,
        messagePreview: trimmedMessage.substring(0, 50) + (trimmedMessage.length > 50 ? '...' : ''),
        model: model || 'default',
        provider,
      });

      // Create user message
      const userMsg: Omit<TempMessage, 'id' | 'timestamp'> = {
        userId,
        sessionId: session,
        role: 'user',
        content: trimmedMessage,
        modelId: model,
        modelProvider: provider,
      };

      // Save to temporary memory
      const t1 = Date.now();
      await runtime.recordMemoryWrite({
        runId,
        stepId: 'memory:user',
        target: 'temporary',
        details: { role: 'user', messageId },
        writer: () => tempMemory.addMessage(session, userMsg),
      });
      logger.debug(`[Chat] Redis: addMessage done`, {
        durationMs: Date.now() - t1,
        sessionId: session,
      });

      // Get conversation history
      const t2 = Date.now();
      const history = await runtime.recordMemoryRead({
        runId,
        stepId: 'memory:read',
        target: 'temporary',
        details: { sessionId: session },
        reader: () => tempMemory.getMessages(session, undefined, userId),
      });
      await runtime.transition(runId, 'ContextBuilt', {
        messageCount: history.length,
      });
      await runtime.record(
        runId,
        'context.build.completed',
        {
          source: 'temporary-memory',
          messageCount: history.length,
        },
        'context'
      );
      logger.debug(`[Chat] Redis: getMessages done`, {
        durationMs: Date.now() - t2,
        sessionId: session,
        historyCount: history.length,
      });

      // Convert to LLM format
      const llmMessages: LLMMessage[] = history.map((msg) => ({
        role: msg.role as LLMMessage['role'],
        content: msg.content,
      }));

      // Execute skills (preprocessing)
      const skillManager = getSkillManager();
      let contextVariables: Record<string, unknown> = {};

      if (skillManager) {
        const currentMessage = {
          id: messageId,
          role: 'user' as const,
          content: trimmedMessage,
          timestamp: now(),
        };

        const skillContext = {
          userId,
          sessionId: session,
          messages: history,
          currentMessage,
          variables: contextVariables,
          metadata: { modelId: model, modelProvider: provider, agentId },
        };

        const processedContext = await skillManager.executeSkills(skillContext);
        contextVariables = processedContext.variables || {};
        await runtime.record(
          runId,
          'skill.selected',
          {
            agentId,
            variableKeys: Object.keys(contextVariables),
          },
          'skills'
        );

        // Update the last message if modified
        if (processedContext.currentMessage.content !== trimmedMessage) {
          llmMessages[llmMessages.length - 1] = {
            role: 'user',
            content: processedContext.currentMessage.content,
          };
        }
      }

      // Get available tools
      const toolManager = getToolManager();
      const tools = toolManager?.listTools() || [];
      const cachePolicy = runtime.resolveChatCachePolicy({
        userId,
        sessionId: session,
        runId,
        modelAlias: resolvedChatModel.model,
        provider: resolvedChatModel.provider,
        cache,
      });

      // Call LLM
      const t3 = Date.now();
      await runtime.transition(runId, 'Reasoning');
      await runtime.record(
        runId,
        'agent.reasoning.started',
        {
          modelAlias: resolvedChatModel.model,
        },
        'reason'
      );
      const response = await runtime.runReActChat({
        runId,
        stepId: 'reason',
        agentId,
        agentSpec: parseAgentPromptRefs(promptRefs)
          ? { promptRefs: parseAgentPromptRefs(promptRefs) }
          : undefined,
        userId,
        sessionId: session,
        modelAlias: resolvedChatModel.model,
        messages: llmMessages,
        options: {
          model,
          tools: tools.length > 0 ? tools : undefined,
        },
        cachePolicy,
        reasoning: parseReasoningOptions(reasoning),
      });
      await runtime.record(
        runId,
        'agent.reasoning.completed',
        {
          responseId: response.id,
          finishReason: response.finishReason,
        },
        'reason'
      );
      await runtime.transition(runId, 'ActionSelected', {
        finishReason: response.finishReason,
        toolCallCount: response.toolCalls?.length ?? 0,
      });
      await runtime.record(
        runId,
        'agent.action.selected',
        {
          finishReason: response.finishReason,
          toolCalls: response.toolCalls,
        },
        'action'
      );
      await runtime.transition(runId, 'PolicyChecked');
      await runtime.transition(runId, 'Acting');
      logger.debug(`[Chat] LLM call done`, {
        durationMs: Date.now() - t3,
        model: response.model,
        provider: response.provider,
        responsePreview:
          response.content.substring(0, 50) + (response.content.length > 50 ? '...' : ''),
        usage: response.usage,
      });

      // Save assistant response to temporary memory
      const assistantMsg: Omit<TempMessage, 'id' | 'timestamp'> = {
        userId,
        sessionId: session,
        role: 'assistant',
        content: response.content,
        modelId: response.model,
        modelProvider: response.provider,
      };

      await runtime.recordMemoryWrite({
        runId,
        stepId: 'memory:assistant',
        target: 'temporary',
        details: { role: 'assistant', responseId: response.id },
        writer: () => tempMemory.addMessage(session, assistantMsg),
      });
      await runtime.transition(runId, 'ObservationRecorded', {
        responseId: response.id,
      });
      await runtime.transition(runId, 'Verifying');

      // Save to permanent memory (if conversation exists)
      const t4 = Date.now();
      const conversation = await runtime.recordMemoryRead({
        runId,
        stepId: 'memory:permanent',
        target: 'permanent',
        details: {
          sessionId: session,
          operation: 'getConversationBySessionId',
        },
        reader: () => permanentMemory.getConversationBySessionId(session, userId),
      });
      if (conversation) {
        await runtime.recordMemoryWrite({
          runId,
          stepId: 'memory:permanent',
          target: 'permanent',
          details: { conversationId: conversation.id },
          writer: () =>
            Promise.all([
              permanentMemory.addMessage(conversation.id, {
                role: 'user',
                content: trimmedMessage,
                modelId: model,
                modelProvider: provider,
              }),
              permanentMemory.addMessage(conversation.id, {
                role: 'assistant',
                content: response.content,
                modelId: response.model,
                modelProvider: response.provider,
              }),
            ]),
        });
      }
      await runtime.transition(runId, 'MemorySync');
      logger.debug(`[Chat] MongoDB save done`, {
        durationMs: Date.now() - t4,
        sessionId: session,
        conversationId: conversation?.id || 'none',
      });

      // Record token usage
      const endTime = Date.now();
      const totalDuration = endTime - startTime;
      logger.debug(`[Chat] Request completed`, {
        totalDurationMs: totalDuration,
        sessionId: session,
        tokens: response.usage?.totalTokens || 0,
      });

      if (response.usage && response.usage.totalTokens > 0) {
        const tokenService = getTokenService();
        await tokenService
          .recordUsage({
            userId,
            sessionId: session,
            conversationId: conversation?.id?.toString(),
            modelId: response.model,
            modelProvider: response.provider,
            promptTokens: response.usage.inputTokens,
            cacheHitTokens: response.usage.cacheHitTokens,
            cacheMissTokens: response.usage.cacheMissTokens,
            completionTokens: response.usage.outputTokens,
            totalTokens: response.usage.totalTokens,
            endpoint: '/chat',
            requestType: 'chat',
            responseTimeMs: totalDuration,
          })
          .catch((err) => logger.error('Failed to record token usage:', err));
      }
      await runtime.completeRun(runId, {
        messageId: response.id,
        content: response.content,
        usage: response.usage,
      });

      res.json({
        success: true,
        data: {
          sessionId: session,
          runId,
          messageId: response.id,
          content: response.content,
          model: response.model,
          provider: response.provider,
          finishReason: response.finishReason,
          usage: response.usage,
          toolCalls: response.toolCalls,
        },
      });
    } catch (error) {
      if (runId) {
        await runtime
          .failRun(runId, error)
          .catch((err) => logger.error('Failed to record event runtime run failure:', err));
      }
      throw error;
    } finally {
      lock.release();
    }
  })
);

// ============================================================
// POST /chat/stream - Stream message (SSE)
// ============================================================
// Bug 1 Fix: NO asyncHandler wrapper - we must set SSE headers FIRST
// before any validation, so errors can be sent as SSE data
// Bug 2 Fix: Session-level locking prevents race conditions
// Bug 3 Fix: Empty/whitespace message returns SSE error
// ============================================================
router.post('/stream', async (req: Request, res: Response) => {
  const { sessionId, message, model, provider, agentId, promptRefs, cache, reasoning } = req.body;
  const userId = req.user?.userId || req.apiKey?.userId;

  // Bug 3 Fix: Must set SSE headers BEFORE any validation
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Auth check
  if (!userId) {
    sendSSEError(res, 'UNAUTHORIZED', 'User ID required', sessionId);
    return;
  }

  // Bug 3 Fix: Trim and validate message - send SSE error, not HTTP 400
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';
  if (!trimmedMessage) {
    logger.warn(
      `[SSE] Empty/whitespace message rejected | userId: ${userId} | sessionId: ${sessionId || 'new'}`
    );
    sendSSEError(
      res,
      'INVALID_MESSAGE',
      'Message is required and cannot be empty or whitespace only',
      sessionId
    );
    return;
  }

  const session = sessionId || generateSessionId();

  // Bug 2 Fix: Acquire session lock to prevent race conditions
  const lock = acquireSessionLock(session, userId);
  await lock.wait(); // Wait for any previous request on this session to finish

  const tempMemory = getTemporaryMemory();
  const startTime = Date.now();
  const runtime = getEventRuntime();
  let runId: string | undefined;
  let completed = false;
  let streamActionEntered = false;

  logger.debug(`[SSE] Stream request started`, {
    sessionId: session,
    messagePreview: trimmedMessage.substring(0, 50) + (trimmedMessage.length > 50 ? '...' : ''),
    model: model || 'default',
  });

  try {
    const runtimeRun = await runtime.startRun({
      userId,
      sessionId: session,
      input: {
        message: trimmedMessage,
        model,
        provider,
        stream: true,
        cacheEnabled: Boolean(cache),
      },
      metadata: { surface: 'http.chat.stream', cacheEnabled: Boolean(cache) },
    });
    runId = runtimeRun.runId;
    // Get conversation history
    const t1 = Date.now();
    const history = await runtime.recordMemoryRead({
      runId,
      stepId: 'memory:read',
      target: 'temporary',
      details: { sessionId: session, stream: true },
      reader: () => tempMemory.getMessages(session, undefined, userId),
    });
    await runtime.transition(runId, 'ContextBuilt', {
      messageCount: history.length,
    });
    await runtime.record(
      runId,
      'context.build.completed',
      {
        source: 'temporary-memory',
        messageCount: history.length,
      },
      'context'
    );
    logger.debug(`[SSE] Redis: getMessages done`, {
      durationMs: Date.now() - t1,
      historyCount: history.length,
    });

    const llmMessages: LLMMessage[] = [
      ...history.map((msg) => ({
        role: msg.role as LLMMessage['role'],
        content: msg.content,
      })),
      { role: 'user', content: trimmedMessage },
    ];

    let fullContent = '';
    const resolvedChatModel = runtime.resolveChatModel(model);
    const resolvedModel = resolvedChatModel.model;
    const resolvedProvider = provider || resolvedChatModel.provider;
    const cachePolicy = runtime.resolveChatCachePolicy({
      userId,
      sessionId: session,
      runId,
      modelAlias: resolvedModel,
      provider: resolvedChatModel.provider,
      cache,
    });
    await runtime.transition(runId, 'Reasoning');
    await runtime.record(
      runId,
      'agent.reasoning.started',
      {
        modelAlias: resolvedModel,
        stream: true,
      },
      'reason'
    );

    for await (const chunk of runtime.streamChat({
      runId,
      stepId: 'reason',
      modelAlias: resolvedModel,
      agentSpec: {
        id: typeof agentId === 'string' ? agentId : undefined,
        promptRefs: parseAgentPromptRefs(promptRefs),
      },
      messages: llmMessages,
      options: { model },
      cachePolicy,
      reasoning: parseReasoningOptions(reasoning),
    })) {
      if (chunk.type === 'content' && chunk.content) {
        fullContent += chunk.content;
        if (!streamActionEntered) {
          await runtime.transition(runId, 'ActionSelected', { stream: true });
          await runtime.record(
            runId,
            'agent.action.selected',
            {
              type: 'stream-content',
            },
            'action'
          );
          await runtime.transition(runId, 'PolicyChecked');
          await runtime.transition(runId, 'Acting');
          streamActionEntered = true;
        }
        res.write(`data: ${JSON.stringify({ type: 'content', content: chunk.content })}\n\n`);
      } else if (chunk.type === 'done' && !completed) {
        completed = true;
        if (!streamActionEntered) {
          await runtime.transition(runId, 'ActionSelected', {
            stream: true,
            emptyContent: true,
          });
          await runtime.record(
            runId,
            'agent.action.selected',
            {
              type: 'stream-completion',
              emptyContent: fullContent.length === 0,
            },
            'action'
          );
          await runtime.transition(runId, 'PolicyChecked');
          await runtime.transition(runId, 'Acting');
          streamActionEntered = true;
        }
        // Save to temporary memory
        await runtime.recordMemoryWrite({
          runId,
          stepId: 'memory:stream',
          target: 'temporary',
          details: { roles: ['user', 'assistant'], stream: true },
          writer: () =>
            Promise.all([
              tempMemory.addMessage(session, {
                userId,
                sessionId: session,
                role: 'user',
                content: trimmedMessage,
              }),
              tempMemory.addMessage(session, {
                userId,
                sessionId: session,
                role: 'assistant',
                content: fullContent,
                modelId: resolvedModel,
                modelProvider: resolvedProvider,
              }),
            ]),
        });
        await runtime.transition(runId, 'ObservationRecorded', {
          stream: true,
        });
        await runtime.transition(runId, 'Verifying');
        await runtime.transition(runId, 'MemorySync');

        // Record token usage for stream
        if (chunk.usage && chunk.usage.totalTokens > 0) {
          const tokenService = getTokenService();
          tokenService
            .recordUsage({
              userId,
              sessionId: session,
              modelId: resolvedModel,
              modelProvider: resolvedProvider,
              promptTokens: chunk.usage.inputTokens,
              cacheHitTokens: chunk.usage.cacheHitTokens,
              cacheMissTokens: chunk.usage.cacheMissTokens,
              completionTokens: chunk.usage.outputTokens,
              totalTokens: chunk.usage.totalTokens,
              endpoint: '/chat/stream',
              requestType: 'stream',
              responseTimeMs: Date.now() - startTime,
            })
            .catch((err) => logger.error('Failed to record stream token usage:', err));
        }

        // Send usage stats with done event
        res.write(
          `data: ${JSON.stringify({
            type: 'done',
            content: fullContent,
            sessionId: session,
            // Include the resolved model so SSE clients (e.g. the `hypha`
            // CLI) can label the response without having to re-resolve.
            model: resolvedModel,
            provider: resolvedProvider,
            usage: chunk.usage,
            runId,
          })}\n\n`
        );
        await runtime.completeRun(runId, {
          content: fullContent,
          usage: chunk.usage,
        });

        logger.debug(`[SSE] Stream completed`, {
          totalDurationMs: Date.now() - startTime,
          sessionId: session,
          contentLength: fullContent.length,
          tokens: chunk.usage?.totalTokens || 0,
        });
      } else if (chunk.type === 'error') {
        // Bug 1 Fix: LLM error also sent as SSE
        completed = true;
        if (runId) {
          await runtime.failRun(runId, chunk.error ?? 'LLM stream error');
        }
        res.write(
          `data: ${JSON.stringify({ type: 'error', error: chunk.error, code: 'LLM_ERROR' })}\n\n`
        );
      }
    }
  } catch (error) {
    logger.error('[SSE] Stream error:', error);
    if (runId) {
      await runtime
        .failRun(runId, error)
        .catch((err) => logger.error('Failed to record event runtime stream failure:', err));
    }
    // Bug 1 Fix: All errors sent as SSE, not thrown
    res.write(
      `data: ${JSON.stringify({
        type: 'error',
        error: error instanceof Error ? error.message : 'Stream processing failed',
        code: 'INTERNAL_ERROR',
      })}\n\n`
    );
  } finally {
    // Bug 2 Fix: Always release lock
    lock.release();
  }

  res.end();
});

// Get chat history
router.get(
  '/:sessionId',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { limit } = req.query;
    const userId = req.user?.userId || req.apiKey?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    const messages = await tempMemory.getMessages(
      sessionId,
      limit ? parseInt(limit as string) : undefined,
      userId
    );

    res.json({
      success: true,
      data: messages,
    });
  })
);

// Clear chat (temporary memory)
router.post(
  '/:sessionId/clear',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const userId = req.user?.userId || req.apiKey?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    await tempMemory.clearMessages(sessionId, userId);

    res.json({
      success: true,
      message: 'Chat cleared',
    });
  })
);

// Delete session
router.delete(
  '/:sessionId',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const userId = req.user?.userId || req.apiKey?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    const permanentMemory = getPermanentMemory();

    // Clear temporary memory
    await tempMemory.clearMessages(sessionId, userId);

    // Delete from permanent memory
    const conversation = await permanentMemory.getConversationBySessionId(sessionId, userId);
    if (conversation) {
      await permanentMemory.deleteConversation(conversation.id);
    }

    res.json({
      success: true,
      message: 'Session deleted',
    });
  })
);

export default router;

function parseReasoningOptions(input: unknown): ReasoningOptions | undefined {
  if (typeof input === 'string') {
    return isReasoningMethod(input) ? { method: input } : undefined;
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const record = input as Record<string, unknown>;
  if (!isReasoningMethod(record.method)) return undefined;
  const budget = asNumberRecord(record.budget);
  return {
    method: record.method,
    strategyRef: typeof record.strategyRef === 'string' ? record.strategyRef : undefined,
    branches: positiveNumber(record.branches),
    maxDepth: positiveNumber(record.maxDepth),
    beamWidth: positiveNumber(record.beamWidth),
    maxNodes: positiveNumber(record.maxNodes),
    revealReasoning:
      typeof record.revealReasoning === 'boolean' ? record.revealReasoning : undefined,
    aggregation:
      record.aggregation === 'first' ||
      record.aggregation === 'majority_vote' ||
      record.aggregation === 'score' ||
      record.aggregation === 'llm_judge'
        ? record.aggregation
        : undefined,
    evaluatorRef: typeof record.evaluatorRef === 'string' ? record.evaluatorRef : undefined,
    strategyVersion:
      typeof record.strategyVersion === 'string' ? record.strategyVersion : undefined,
    budget: budget
      ? {
          maxModelCalls: positiveNumber(budget.maxModelCalls),
          maxNodes: positiveNumber(budget.maxNodes),
          timeoutMs: positiveNumber(budget.timeoutMs),
        }
      : undefined,
  };
}

function parseAgentPromptRefs(input: unknown): AgentPromptRef[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const refs = input.flatMap((item) => {
    const parsed = agentPromptRefSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
  return refs.length ? refs : undefined;
}

function isReasoningMethod(value: unknown): value is ReasoningMethod {
  return (
    value === 'direct' ||
    value === 'cot' ||
    value === 'tot' ||
    value === 'got' ||
    value === 'self_consistency'
  );
}

function positiveNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

function asNumberRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}
