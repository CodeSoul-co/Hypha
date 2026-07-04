import { generateId, now } from '../../utils/helpers';
import type { WorkflowDefinition, WorkflowExecutionContext } from './types';

export type WorkflowContextInput = Partial<WorkflowExecutionContext> & {
  input?: unknown;
  message?: unknown;
};

export function normalizeWorkflowExecutionContext(
  workflow: WorkflowDefinition,
  context: WorkflowContextInput,
  userId: string
): WorkflowExecutionContext {
  const messages = normalizeWorkflowMessages(context);
  return {
    userId,
    sessionId: context.sessionId || generateId(),
    conversationId: context.conversationId,
    messages,
    variables: {
      ...(workflow.variables ?? {}),
      ...(context.variables ?? {}),
    },
    metadata: context.metadata ?? {},
  };
}

function normalizeWorkflowMessages(
  context: WorkflowContextInput
): WorkflowExecutionContext['messages'] {
  if (Array.isArray(context.messages) && context.messages.length > 0) {
    return context.messages;
  }

  const nestedMessages = extractNestedWorkflowMessages(context.input);
  if (nestedMessages.length > 0) {
    return nestedMessages;
  }

  const content = extractWorkflowUserMessage(context);
  if (!content) return [];
  return [
    {
      id: generateId(),
      role: 'user',
      content,
      timestamp: now(),
    },
  ];
}

function extractWorkflowUserMessage(context: WorkflowContextInput): string | null {
  if (typeof context.message === 'string' && context.message.trim()) {
    return context.message;
  }
  if (typeof context.input === 'string' && context.input.trim()) {
    return context.input;
  }
  if (context.input && typeof context.input === 'object' && !Array.isArray(context.input)) {
    const record = context.input as Record<string, unknown>;
    for (const key of ['message', 'content', 'prompt', 'query', 'text']) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }
    return JSON.stringify(record);
  }
  return null;
}

function extractNestedWorkflowMessages(input: unknown): WorkflowExecutionContext['messages'] {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return [];
  const nestedMessages = (input as Record<string, unknown>).messages;
  return Array.isArray(nestedMessages) ? nestedMessages : [];
}
