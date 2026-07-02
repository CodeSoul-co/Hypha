import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, apiKeyMiddleware } from '../middleware/auth';
import { getTemporaryMemory } from '../core/memory/TemporaryMemory';
import { getPermanentMemory } from '../core/memory/PermanentMemory';
import { getLLMManager } from '../core/llm/LLMFactory';
import { getSkillManager } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { getTokenService } from '../services/TokenService';
import { generateSessionId, generateMessageId, now } from '../utils/helpers';
import { logger } from '../utils/logger';
import { TempMessage, LLMMessage } from '../core/llm/types';

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
  userId: string,
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
  sessionId?: string,
): void {
  logger.warn(
    `[SSE Error] ${errorCode}: ${errorMessage} | sessionId: ${sessionId || 'none'}`,
  );
  res.write(
    `data: ${JSON.stringify({ type: 'error', error: errorMessage, code: errorCode })}\n\n`,
  );
  res.end();
}

// ============================================================
// POST /chat - Send message (non-streaming)
// ============================================================
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, message, model, provider, agentId } = req.body;
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

    try {
      const messageId = generateMessageId();
      const startTime = Date.now();
      const llmManager = getLLMManager();
      const tempMemory = getTemporaryMemory();
      const permanentMemory = getPermanentMemory();

      logger.debug(`[Chat] Request started`, {
        sessionId: session,
        messagePreview:
          trimmedMessage.substring(0, 50) +
          (trimmedMessage.length > 50 ? '...' : ''),
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
      await tempMemory.addMessage(session, userMsg);
      logger.debug(`[Chat] Redis: addMessage done`, {
        durationMs: Date.now() - t1,
        sessionId: session,
      });

      // Get conversation history
      const t2 = Date.now();
      const history = await tempMemory.getMessages(session, undefined, userId);
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

      // Call LLM
      const t3 = Date.now();
      const response = await llmManager.chat(llmMessages, {
        model,
        tools: tools.length > 0 ? tools : undefined,
      });
      logger.debug(`[Chat] LLM call done`, {
        durationMs: Date.now() - t3,
        model: response.model,
        provider: response.provider,
        responsePreview:
          response.content.substring(0, 50) +
          (response.content.length > 50 ? '...' : ''),
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

      await tempMemory.addMessage(session, assistantMsg);

      // Save to permanent memory (if conversation exists)
      const t4 = Date.now();
      const conversation = await permanentMemory.getConversationBySessionId(
        session,
        userId,
      );
      if (conversation) {
        await Promise.all([
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
        ]);
      }
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
            completionTokens: response.usage.outputTokens,
            totalTokens: response.usage.totalTokens,
            endpoint: '/chat',
            requestType: 'chat',
            responseTimeMs: totalDuration,
          })
          .catch((err) => logger.error('Failed to record token usage:', err));
      }

      res.json({
        success: true,
        data: {
          sessionId: session,
          messageId: response.id,
          content: response.content,
          model: response.model,
          provider: response.provider,
          finishReason: response.finishReason,
          usage: response.usage,
          toolCalls: response.toolCalls,
        },
      });
    } finally {
      lock.release();
    }
  }),
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
  const { sessionId, message, model, provider } = req.body;
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
      `[SSE] Empty/whitespace message rejected | userId: ${userId} | sessionId: ${sessionId || 'new'}`,
    );
    sendSSEError(
      res,
      'INVALID_MESSAGE',
      'Message is required and cannot be empty or whitespace only',
      sessionId,
    );
    return;
  }

  const session = sessionId || generateSessionId();

  // Bug 2 Fix: Acquire session lock to prevent race conditions
  const lock = acquireSessionLock(session, userId);
  await lock.wait(); // Wait for any previous request on this session to finish

  const llmManager = getLLMManager();
  const tempMemory = getTemporaryMemory();
  const startTime = Date.now();

  logger.debug(`[SSE] Stream request started`, {
    sessionId: session,
    messagePreview:
      trimmedMessage.substring(0, 50) +
      (trimmedMessage.length > 50 ? '...' : ''),
    model: model || 'default',
  });

  try {
    // Get conversation history
    const t1 = Date.now();
    const history = await tempMemory.getMessages(session, undefined, userId);
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
    // Resolve effective model/provider up front so we record real values in
    // token_usages even when the client omitted them. Done outside the chunk
    // loop because StreamChunk doesn't carry model/provider.
    const resolvedModel = model || llmManager.getDefaultModel();
    const resolvedProvider =
      provider || llmManager.getProviderFromModel(resolvedModel);

    // Stream response
    for await (const chunk of llmManager.streamChat(llmMessages, { model })) {
      if (chunk.type === 'content' && chunk.content) {
        fullContent += chunk.content;
        res.write(
          `data: ${JSON.stringify({ type: 'content', content: chunk.content })}\n\n`,
        );
      } else if (chunk.type === 'done') {
        // Save to temporary memory
        await Promise.all([
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
        ]);

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
              completionTokens: chunk.usage.outputTokens,
              totalTokens: chunk.usage.totalTokens,
              endpoint: '/chat/stream',
              requestType: 'stream',
              responseTimeMs: Date.now() - startTime,
            })
            .catch((err) =>
              logger.error('Failed to record stream token usage:', err),
            );
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
          })}\n\n`,
        );

        logger.debug(`[SSE] Stream completed`, {
          totalDurationMs: Date.now() - startTime,
          sessionId: session,
          contentLength: fullContent.length,
          tokens: chunk.usage?.totalTokens || 0,
        });
      } else if (chunk.type === 'error') {
        // Bug 1 Fix: LLM error also sent as SSE
        res.write(
          `data: ${JSON.stringify({ type: 'error', error: chunk.error, code: 'LLM_ERROR' })}\n\n`,
        );
      }
    }
  } catch (error) {
    logger.error('[SSE] Stream error:', error);
    // Bug 1 Fix: All errors sent as SSE, not thrown
    res.write(
      `data: ${JSON.stringify({
        type: 'error',
        error:
          error instanceof Error ? error.message : 'Stream processing failed',
        code: 'INTERNAL_ERROR',
      })}\n\n`,
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
      userId,
    );

    res.json({
      success: true,
      data: messages,
    });
  }),
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
  }),
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
    const conversation = await permanentMemory.getConversationBySessionId(
      sessionId,
      userId,
    );
    if (conversation) {
      await permanentMemory.deleteConversation(conversation.id);
    }

    res.json({
      success: true,
      message: 'Session deleted',
    });
  }),
);

export default router;
